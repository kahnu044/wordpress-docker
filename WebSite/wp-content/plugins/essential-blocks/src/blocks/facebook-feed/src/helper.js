import { __ } from '@wordpress/i18n';
import { FilterProIcon, Crown } from './icon';

/**
 * Facebook Feed — editor helpers.
 *
 * Data/DOM helpers extracted from edit.js plus the inspector's Pro-upsell
 * card, so the component files stay focused on render/state. The only React
 * surface here is the small presentational `FacebookFeedFilterUpgradePro`
 * (JSX + @wordpress/i18n); the rest is framework-free and safe to reuse/test.
 */

export const GRAPH_VERSION = 'v19.0';
export const DUMMY_TOKEN = 'dummy_token_for_editor_preview';

/**
 * Graph fields requested by the editor preview. Kept in lock-step with the
 * `$fields` list in FacebookFeed::fetch_posts() so editor and frontend agree.
 */
export const GRAPH_FIELDS = [
    'id',
    'from{name,id}',
    'message',
    'created_time',
    'permalink_url',
    'full_picture',
    'status_type',
    'attachments{type,media_type,media,subattachments}',
    'reactions.summary(total_count)',
    'comments.summary(total_count)',
    'shares',
].join(',');

/**
 * ---------------------------------------------------------------------------
 * Shared editor fetches (module-level, so every Facebook Feed block on the
 * page shares one request instead of firing its own).
 * ---------------------------------------------------------------------------
 *
 * A page with N feed blocks previously issued N token AJAX calls (each with up
 * to 3 retries) plus N identical graph.facebook.com calls on editor load. With
 * ten blocks that is ten Graph hits for the same data — enough to trip
 * Facebook's rate limiter, and every response then drove another state update.
 * These caches collapse that to one request per unique payload for the
 * lifetime of the editor session.
 */

/** In-flight/resolved token request, shared by every block instance. */
let tokenRequest = null;

/** Resolved Graph responses keyed by `token|pageId|limit`. */
const postsCache = new Map();

/**
 * Parse a response body even when polluted by leading/trailing PHP notices:
 * fall back to the substring between the first `{` and the last `}`. With
 * WP_DEBUG on, a notice prepended to the AJAX body would otherwise turn a
 * perfectly good `{"success":true,...}` payload into a parse error and
 * collapse it into the "no token" placeholder.
 *
 * @param {string} raw Raw response body.
 * @return {Object|null} Parsed object, or null when nothing JSON-shaped.
 */
function parseLoose(raw) {
    try {
        return JSON.parse(raw);
    } catch (e) {
        const start = raw.indexOf('{');
        const end = raw.lastIndexOf('}');
        if (start !== -1 && end > start) {
            try {
                return JSON.parse(raw.slice(start, end + 1));
            } catch (err) {
                return null;
            }
        }
        return null;
    }
}

/**
 * Resolve the Page Access Token + Page ID via the shared AJAX bridge.
 *
 * Retries only the genuinely transient failures — an unparseable body
 * (corrupted output) or a network error. A well-formed response that simply
 * has no token (settings not configured, unauthorised, failed nonce) is
 * definitive and resolves immediately without retrying, so the placeholder
 * appears at once instead of after three round trips.
 *
 * Only that *deterministic* no-token answer stays cached for the session. A
 * retry-exhausted failure clears the shared promise on its way out, so the
 * next block to mount starts a clean attempt — otherwise one network blip
 * would pin every present and future block on the placeholder until reload.
 *
 * @return {Promise<{token: string, pageId: string}>} Always resolves; an
 *                                                    empty token means "not
 *                                                    configured".
 */
export function fetchFacebookToken() {
    if (tokenRequest) {
        return tokenRequest;
    }

    const MAX_ATTEMPTS = 3;
    const RETRY_DELAY = 700;

    tokenRequest = new Promise((resolve) => {
        const attempt = (n) => {
            const data = new FormData();
            data.append('action', 'get_facebook_access_token');
            data.append('admin_nonce', EssentialBlocksLocalize.admin_nonce);

            fetch(EssentialBlocksLocalize.ajax_url, {
                method: 'POST',
                body: data,
            })
                .then((res) => res.text())
                .then((raw) => {
                    const response = parseLoose(raw);

                    if (response?.success && response?.data?.token) {
                        resolve({
                            token: response.data.token,
                            pageId: response.data.pageId || '',
                        });
                        return;
                    }

                    // Parsed but no usable token → definitive, no retry.
                    if (response) {
                        resolve({ token: '', pageId: '' });
                        return;
                    }

                    if (n < MAX_ATTEMPTS) {
                        setTimeout(() => attempt(n + 1), RETRY_DELAY);
                    } else {
                        // Transient failure — drop the shared promise BEFORE
                        // resolving so a later-mounted block starts a fresh
                        // retry cycle instead of inheriting this empty result
                        // for the rest of the session. Nulling after resolve
                        // would let a synchronous consumer re-grab the stale
                        // promise. Mirrors postsCache.delete() below.
                        tokenRequest = null;
                        resolve({ token: '', pageId: '' });
                    }
                })
                .catch(() => {
                    if (n < MAX_ATTEMPTS) {
                        setTimeout(() => attempt(n + 1), RETRY_DELAY);
                    } else {
                        // Transient failure — see the note above.
                        tokenRequest = null;
                        resolve({ token: '', pageId: '' });
                    }
                });
        };

        attempt(1);
    }).catch(() => {
        // Defensive: if the executor itself throws (e.g.
        // EssentialBlocksLocalize is unexpectedly missing), don't leave a
        // rejected promise cached for the session — null it out and resolve
        // empty so the caller's .then() still fires and setLoading(false)
        // runs instead of hanging forever. Attached to the OUTER promise so
        // it also catches a synchronous throw inside the executor, which a
        // handler placed inside attempt() could never see.
        tokenRequest = null;
        return { token: '', pageId: '' };
    });

    return tokenRequest;
}

/**
 * Fetch posts from the Graph API, deduped across blocks by `token|pageId|limit`.
 *
 * Resolves to `{ posts, error }` rather than rejecting so callers have a
 * single success path. The cached promise is dropped on failure, letting a
 * later block (or an attribute change) retry instead of pinning the error
 * for the whole session.
 *
 * @param {string} token  Page Access Token.
 * @param {string} pageId Facebook Page ID.
 * @param {number} limit  Graph `limit` parameter.
 * @return {Promise<{posts: Array, error: string}>} Resolved feed payload.
 */
export function fetchFacebookPosts(token, pageId, limit) {
    // Token is part of the key (as it is in PHP's cache_key) so a rotated
    // token in Settings starts a fresh request instead of resolving the
    // stale promise for the rest of the editor session.
    const key = `${token}|${pageId}|${limit}`;
    if (postsCache.has(key)) {
        return postsCache.get(key);
    }

    const url =
        `https://graph.facebook.com/${GRAPH_VERSION}/${encodeURIComponent(
            pageId
        )}/posts` +
        `?fields=${encodeURIComponent(GRAPH_FIELDS)}` +
        `&limit=${limit}` +
        `&access_token=${encodeURIComponent(token)}`;

    const request = fetch(url)
        .then((res) => res.json())
        .then((json) => {
            if (json?.error) {
                postsCache.delete(key);
                return {
                    posts: [],
                    error: json.error.message || 'Graph API error',
                };
            }
            return { posts: json?.data || [], error: '' };
        })
        .catch((err) => {
            postsCache.delete(key);
            return { posts: [], error: err.message || 'Network error' };
        });

    postsCache.set(key, request);
    return request;
}

/**
 * Six placeholder posts shown to non-admin editors and during first paint.
 * Shape mirrors what /v19.0/{pageId}/posts returns so the same render
 * path works for real and preview data.
 */
export const DUMMY_POSTS = [
    {
        id: 'dummy_1',
        message:
            'Fresh sourdough out of the oven at 7am sharp. Come early — yesterday we sold out by 9.',
        created_time: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
        full_picture: '',
        permalink_url: '#',
        from: { id: '0', name: 'Sample Page' },
        reactions: { summary: { total_count: 142 } },
        comments: { summary: { total_count: 23 } },
        shares: { count: 12 },
    },
    {
        id: 'dummy_2',
        message:
            'Saturday market lineup confirmed: cardamom buns, focaccia, and a brand-new walnut loaf coming this weekend.',
        created_time: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
        full_picture: '',
        permalink_url: '#',
        from: { id: '0', name: 'Sample Page' },
        reactions: { summary: { total_count: 89 } },
        comments: { summary: { total_count: 11 } },
        shares: { count: 4 },
    },
    {
        id: 'dummy_3',
        message:
            'A small story about why we proof for 24 hours. Spoiler: flavour, patience, and the way the kitchen smells at dawn.',
        created_time: new Date(
            Date.now() - 3 * 24 * 3600 * 1000
        ).toISOString(),
        full_picture: '',
        permalink_url: '#',
        from: { id: '0', name: 'Sample Page' },
        reactions: { summary: { total_count: 201 } },
        comments: { summary: { total_count: 47 } },
        shares: { count: 19 },
    },
    {
        id: 'dummy_4',
        message:
            'Limited drop: olive-oil and rosemary loaf, available through April. Pre-orders open Friday at noon.',
        created_time: new Date(
            Date.now() - 5 * 24 * 3600 * 1000
        ).toISOString(),
        full_picture: '',
        permalink_url: '#',
        from: { id: '0', name: 'Sample Page' },
        reactions: { summary: { total_count: 68 } },
        comments: { summary: { total_count: 5 } },
        shares: { count: 2 },
    },
    {
        id: 'dummy_5',
        message:
            "We're hiring one apprentice baker. Early mornings, flour-dusted everything, real love for the craft.",
        created_time: new Date(
            Date.now() - 9 * 24 * 3600 * 1000
        ).toISOString(),
        full_picture: '',
        permalink_url: '#',
        from: { id: '0', name: 'Sample Page' },
        reactions: { summary: { total_count: 124 } },
        comments: { summary: { total_count: 31 } },
        shares: { count: 8 },
    },
    {
        id: 'dummy_6',
        message:
            "Mother's Day boxes are back — pre-orders only, link in our profile. Limited to 80 boxes this year.",
        created_time: new Date(
            Date.now() - 14 * 24 * 3600 * 1000
        ).toISOString(),
        full_picture: '',
        permalink_url: '#',
        from: { id: '0', name: 'Sample Page' },
        reactions: { summary: { total_count: 312 } },
        comments: { summary: { total_count: 89 } },
        shares: { count: 34 },
    },
];

const MONTHS = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
];

/**
 * Equal-height rows for grid layout — editor mirror of frontend.js's
 * `equalizeGridRows`. Isotope `fitRows` aligns items by their TOP and lets
 * each card keep its natural height, so a row of mixed-content cards ends
 * ragged. This groups visible cols by their Isotope-assigned Y coordinate,
 * sets each row's cols to the row's max height, then re-lays out so the
 * positions reflect the uniform heights.
 *
 * Operates purely on the passed `inner` element via relative DOM methods
 * (querySelectorAll / offsetHeight / style.transform) so it works the same
 * whether `inner` lives in the editor iframe document or the main document.
 *
 * Idempotent via the `changed` guard: first pass sets heights and calls
 * iso.layout() (→ layoutComplete → second pass), second pass finds heights
 * already at target → changed stays false → no further iso.layout().
 *
 * Paired with `.eb-fb-feed--grid > .eb-fb-feed__col > .eb-fb-feed__post
 * { height: 100% }` in style.scss so the card fills the equalized col.
 *
 * @param {HTMLElement} inner The `[data-layout]` Isotope container.
 * @param {Object}      iso   The Isotope instance.
 */
export function equalizeGridRows(inner, iso) {
    if (!inner || !iso) {
        return;
    }
    // Visible cols only — Isotope hides filtered-out items via display:none.
    const cols = Array.prototype.slice
        .call(inner.querySelectorAll('.eb-fb-feed__col'))
        .filter((c) => c.offsetParent !== null);

    if (cols.length === 0) {
        return;
    }

    // Clear prior heights so we measure natural sizes, then force a reflow.
    cols.forEach((c) => {
        c.style.height = '';
    });
    // eslint-disable-next-line no-unused-expressions
    inner.offsetHeight;

    // Group cols by Isotope-assigned Y (parsed from the inline transform).
    const rows = {};
    cols.forEach((col) => {
        const t = col.style.transform || '';
        const match = t.match(
            /translate(?:3d)?\(\s*-?[\d.]+px\s*,\s*(-?[\d.]+)px/
        );
        const y = match
            ? Math.round(parseFloat(match[1]))
            : Math.round(col.offsetTop);
        if (!rows[y]) {
            rows[y] = [];
        }
        rows[y].push(col);
    });

    // Set each row's cols to the row's max height; track real changes only.
    let changed = false;
    Object.keys(rows).forEach((key) => {
        const row = rows[key];
        let max = 0;
        row.forEach((c) => {
            const h = c.offsetHeight;
            if (h > max) {
                max = h;
            }
        });
        const target = max + 'px';
        row.forEach((c) => {
            if (c.style.height !== target) {
                c.style.height = target;
                changed = true;
            }
        });
    });

    // Re-entrancy guard — see frontend.js. `iso.layout()` fires
    // layoutComplete, which re-invokes this; without the flag that recurses
    // (the `changed` check never settles inside a flex container) and blows
    // the stack. The flag makes the layoutComplete we trigger a no-op.
    if (changed && iso.layout) {
        iso._ebSuppressEqualize = true;
        iso.layout();
    }
}

export function formatDate(iso) {
    if (!iso) {
        return '';
    }
    const d = new Date(iso);
    const day = String(d.getDate()).padStart(2, '0');
    return `${day} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

export function trimWords(text, limit) {
    if (!text || !limit || limit <= 0) {
        return text || '';
    }
    const words = text.split(/\s+/);
    if (words.length <= limit) {
        return text;
    }
    return words.slice(0, limit).join(' ') + '…';
}

export function sortPosts(posts, sortBy) {
    const arr = [...posts];
    arr.sort((a, b) => {
        const da = new Date(a.created_time).getTime();
        const db = new Date(b.created_time).getTime();
        return sortBy === 'least_recent' ? da - db : db - da;
    });
    return arr;
}


/**
 * Upgrade-to-Pro card for the content-filter slot. Rendered as the default
 * value of the `eb_facebook_feed_inspector_after_source` filter when Pro is
 * inactive — when Pro IS active its `contentFilters` listener replaces this
 * with the real post-type / keyword / hashtag controls. Mirrors the `eb_ie`
 * upsell pattern used by woo-product-grid + the advanced-controls panel.
 */
export const FacebookFeedFilterUpgradePro = () => (
    <div className="eb_ie">
        <FilterProIcon />
        <h3>
            <a
                target="_blank"
                rel="noreferrer"
                href="https://essential-blocks.com/demo/facebook-feed/"
            >
                {__('Content Filters', 'essential-blocks')}
                <span className="dashicons dashicons-external"></span>
            </a>
        </h3>
        <p>
            {__(
                'Filter your feed by post type, keyword, or hashtag with Essential Blocks Pro.',
                'essential-blocks'
            )}
        </p>
        <a
            className="eb_upgrade_button"
            target="_blank"
            rel="noreferrer"
            href={EssentialBlocksLocalize?.upgrade_pro_url}
        >
            <Crown />
            {__('Upgrade to PRO', 'essential-blocks')}
        </a>
    </div>
);
