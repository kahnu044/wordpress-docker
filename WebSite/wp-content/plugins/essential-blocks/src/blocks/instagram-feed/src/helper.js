/**
 * Instagram Feed — editor helpers.
 *
 * Mirrors `src/blocks/facebook-feed/src/helper.js`. Holds the deduped editor
 * fetches plus a non-mutating sort, so edit.js stays focused on render/state.
 */

export const DUMMY_TOKEN = 'dummy_token_for_editor_preview';

/**
 * Media fields requested by the editor preview. Kept in lock-step with the
 * `$url` field list in InstagramFeed::render_callback() so the editor and the
 * frontend agree on shape.
 */
export const MEDIA_FIELDS =
    'id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,username';

/**
 * API `limit`. Matches the value used by InstagramFeed::render_callback() so
 * the editor preview and the frontend see the same window of media.
 */
export const MEDIA_LIMIT = 500;

/**
 * ---------------------------------------------------------------------------
 * Shared editor fetches (module-level, so every Instagram Feed block on the
 * page shares one request instead of firing its own).
 * ---------------------------------------------------------------------------
 *
 * A page with N feed blocks previously issued N token AJAX calls plus N
 * identical graph.instagram.com calls on editor load — each pulling up to 500
 * media items. These caches collapse that to one request per unique payload
 * for the lifetime of the editor session.
 */

/** In-flight/resolved token request, shared by every block instance. */
let tokenRequest = null;

/**
 * Backoff before each *retry* of the token request. Index 0 is the wait before
 * attempt 2, so this is a budget of 3 attempts / ~3.2s — for the whole editor
 * session, regardless of how many feed blocks are on the page.
 */
const TOKEN_RETRY_DELAYS = [700, 2500];

/** Resolved media responses keyed by `token|limit`. */
const mediaCache = new Map();

/**
 * Resolve the Instagram access token via the shared AJAX bridge.
 *
 * Resolves to an empty string when the token is not configured, the user is
 * unauthorised, or the request fails — callers treat that as "show the
 * connect prompt".
 *
 * Outcomes are split two ways:
 *
 * - *Deterministic* — the body parsed. Whether or not it carries a token that
 *   is the real answer, so it resolves immediately and stays cached for the
 *   session. Never retried.
 * - *Transient* — an unparseable body (usually a PHP notice polluting the
 *   response with WP_DEBUG on, not a genuinely absent token) or a network
 *   error. The shared promise is deliberately left PENDING and the request is
 *   retried on TOKEN_RETRY_DELAYS; only once that budget is spent does it
 *   clear itself and resolve ''.
 *
 * Holding the promise open through the retries is what lets already-mounted
 * blocks recover. Every block resolves the token through this one promise from
 * a mount-only effect, so a block that has already mounted has no way to ask
 * again — resolving '' on the first blip would pin it on the connect prompt
 * until the editor is reloaded, even when the very next attempt would have
 * succeeded. Retrying in here reuses each block's existing `.then()` as the
 * delivery channel and keeps the request deduplicated: a block mounted
 * mid-retry joins the pending promise instead of firing its own.
 *
 * @return {Promise<string>} Access token, or '' when unavailable.
 */
export function fetchInstagramToken() {
    if (tokenRequest) {
        return tokenRequest;
    }

    tokenRequest = new Promise((resolve) => {
        const attempt = (index) => {
            // One settle per attempt. The trailing .catch() below also sees
            // throws raised inside the .then() before it, so without this
            // guard a throw landing after retryOrGiveUp() already ran would
            // schedule a second, parallel retry chain — two in-flight
            // requests, which is exactly what the dedup here exists to avoid.
            let settled = false;

            const retryOrGiveUp = () => {
                if (settled) {
                    return;
                }
                settled = true;

                if (index < TOKEN_RETRY_DELAYS.length) {
                    setTimeout(
                        () => attempt(index + 1),
                        TOKEN_RETRY_DELAYS[index]
                    );
                    return;
                }

                // Budget spent. Drop the shared promise BEFORE resolving so a
                // later-mounted block still starts a clean attempt. Mirrors
                // mediaCache.delete() below.
                tokenRequest = null;
                resolve('');
            };

            try {
                const data = new FormData();
                data.append('action', 'get_instagram_access_token');
                data.append('admin_nonce', EssentialBlocksLocalize.admin_nonce);

                fetch(EssentialBlocksLocalize.ajax_url, {
                    method: 'POST',
                    body: data,
                })
                    .then((res) => res.text())
                    .then((raw) => {
                        let response;
                        try {
                            response = JSON.parse(raw);
                        } catch (e) {
                            // Transient — retry rather than answer.
                            retryOrGiveUp();
                            return;
                        }
                        // Parsed: deterministic, cached for the session.
                        settled = true;
                        resolve(
                            response?.success && response?.data
                                ? response.data
                                : ''
                        );
                    })
                    .catch(retryOrGiveUp);
            } catch (e) {
                // Attempts 2+ run inside a setTimeout, where the outer
                // .catch() below can no longer see a synchronous throw (e.g.
                // EssentialBlocksLocalize unexpectedly missing). Left
                // unhandled that would leave this promise pending forever and
                // every block stuck on the spinner.
                retryOrGiveUp();
            }
        };

        attempt(0);
    }).catch(() => {
        // Defensive: if the executor itself throws before any attempt can
        // schedule, don't leave a rejected promise cached for the session —
        // null it out and resolve empty so the caller's .then() still fires
        // and setLoading(false) runs instead of hanging forever.
        tokenRequest = null;
        return '';
    });

    return tokenRequest;
}

/**
 * Fetch media from the Instagram API, deduped across blocks by `token|limit`.
 *
 * Resolves to `{ media, error, code }` rather than rejecting so callers have a
 * single success path. The cached promise is dropped on failure so a later
 * block (or an attribute change) can retry instead of pinning the error for
 * the whole editor session.
 *
 * @param {string} token Instagram access token.
 * @param {number} limit API `limit` parameter.
 * @return {Promise<{media: Array, error: string, code: number}>} Feed payload.
 */
export function fetchInstagramMedia(token, limit) {
    const key = `${token}|${limit}`;
    if (mediaCache.has(key)) {
        return mediaCache.get(key);
    }

    const url =
        `https://graph.instagram.com/me/media` +
        `?fields=${MEDIA_FIELDS}` +
        `&limit=${limit}` +
        `&access_token=${encodeURIComponent(token)}`;

    const request = fetch(url)
        .then((res) => res.json())
        .then((json) => {
            if (json?.error) {
                mediaCache.delete(key);
                return {
                    media: [],
                    error: json.error.message || 'Instagram API error',
                    code: json.error.code || 0,
                };
            }
            const media = json?.data || [];
            return {
                media,
                error: '',
                // Preserves the pre-existing convention: an empty feed is
                // surfaced as code 500 so the editor shows the "no media"
                // branch rather than an empty grid.
                code: media.length > 0 ? 200 : 500,
            };
        })
        .catch((err) => {
            mediaCache.delete(key);
            return {
                media: [],
                error: err.message || 'Network error',
                code: 0,
            };
        });

    mediaCache.set(key, request);
    return request;
}

/**
 * Newest-first / oldest-first sort.
 *
 * Returns a NEW array. The previous implementation called `thumbs.sort()`
 * directly on the attribute array during render, mutating block state in
 * place — which both violates React's immutability contract and reordered the
 * shared array other blocks were reading.
 *
 * @param {Array}  posts  Media items carrying a `timestamp`.
 * @param {string} sortBy 'least_recent' for oldest-first, newest-first
 *                        otherwise.
 * @return {Array} Sorted copy.
 */
export function sortByTimestamp(posts, sortBy) {
    if (!Array.isArray(posts)) {
        return [];
    }
    return [...posts].sort((a, b) => {
        const da = new Date(a.timestamp).getTime();
        const db = new Date(b.timestamp).getTime();
        return sortBy === 'least_recent' ? da - db : db - da;
    });
}
