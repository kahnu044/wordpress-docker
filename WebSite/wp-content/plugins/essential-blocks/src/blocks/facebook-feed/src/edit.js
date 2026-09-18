/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { memo, useEffect, useRef, useState } from '@wordpress/element';
import { applyFilters } from '@wordpress/hooks';
import { ExternalLink, Spinner } from '@wordpress/components';

/**
 * Internal dependencies
 */
import Style from './style';
import Inspector from './inspector';
import defaultAttributes from './attributes';
import {
    DUMMY_TOKEN,
    DUMMY_POSTS,
    equalizeGridRows,
    sortPosts,
    trimWords,
    formatDate,
    fetchFacebookToken,
    fetchFacebookPosts,
} from './helper';

/**
 * External dependencies
 */
import {
    BlockProps,
    editorQuerySelector,
    patchIsotopeForIframe,
    withBlockContext,
} from '@essential-blocks/controls';

function Edit(props) {
    const { attributes, setAttributes, isSelected } = props;
    const {
        blockId,
        classHook,
        cover,
        sortBy,
        numberOfPosts,
        layout,
        showProfileImage,
        showPageName,
        showTimestamp,
        showMessage,
        messageLimit,
        showReactions,
        showComments,
        showShares,
        enablePagination,
        paginationType,
        postsPerPage,
        loadMoreText,
        resOption
    } = attributes;

    // Local-only state for the numbered pagination preview. Tracks which
    // page button looks "active" in the editor; not persisted because the
    // server always renders page 1 first.
    const [previewPage, setPreviewPage] = useState(1);

    const [token, setToken] = useState('');
    // Page ID is global (Settings), not a block attribute — delivered with
    // the token by the get_facebook_access_token bridge.
    const [pageId, setPageId] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isDummy, setIsDummy] = useState(false);

    // Fetched feed — editor-preview state ONLY, deliberately not a block
    // attribute. It used to be persisted via `setAttributes({ thumbs })`,
    // which serialized the entire Graph response (~13 KB per block) into
    // post_content on every editor load. The server render never reads it —
    // FacebookFeed::render_callback() re-fetches from the Graph API — so it
    // was pure weight: it dirtied the post on mount (prompting phantom
    // "unsaved changes"), re-serialized on every keystroke, and multiplied
    // by the number of feeds on the page. Keeping it in component state
    // gives the same preview with zero bytes saved.
    const [thumbs, setThumbs] = useState([]);

    // Pro registers its layout filters (eb_facebook_feed_supported_layouts /
    // eb_facebook_feed_editor_feed) when the Pro editor bundle executes, which
    // can land AFTER this block's first render — so a block saved with a Pro
    // layout (carousel) would render once as "grid" and, with no attribute
    // change to trigger a re-render, stay stuck. Force a single re-render on
    // mount so the filter-dependent layout resolves once Pro is registered.
    const [, setDidMount] = useState(false);
    useEffect(() => {
        setDidMount(true);
    }, []);

    const enhancedProps = {
        ...props,
        blockPrefix: 'eb-facebook-feed',
        style: <Style {...props} />,
    };

    // Step 1 — resolve the token via the shared AJAX bridge.
    //
    // The request itself (including its retry policy for corrupted bodies and
    // network blips) lives in helper.js behind a module-level promise, so N
    // feed blocks on one page share ONE token call instead of N × up to 3
    // attempts. See `fetchFacebookToken`.
    useEffect(() => {
        let cancelled = false;

        fetchFacebookToken().then(({ token: t, pageId: p }) => {
            if (cancelled) {
                return;
            }
            if (!t) {
                setToken('');
                setLoading(false);
                return;
            }
            setToken(t);
            setPageId(p);
        });

        return () => {
            cancelled = true;
        };
    }, []);

    // Step 2 — once token + pageId are known, fetch (or stub) posts.
    useEffect(() => {
        if (!token) {
            return undefined;
        }

        // Editors without manage_options get dummy data.
        if (token === DUMMY_TOKEN) {
            setThumbs(DUMMY_POSTS);
            setIsDummy(true);
            setError('');
            setLoading(false);
            return undefined;
        }

        setIsDummy(false);

        if (!pageId) {
            setError('');
            setLoading(false);
            return undefined;
        }

        // Graph treats `limit` as a ceiling, so small values commonly
        // come back short (e.g. limit=3 → 2 posts). Request a buffer
        // above numberOfPosts and slice client-side; matches the PHP
        // render path so editor + frontend stay in agreement.
        const fetchLimit = Math.min(100, numberOfPosts + 5);

        let cancelled = false;
        setLoading(true);

        // Deduped across blocks by `token|pageId|limit` — identically
        // configured feeds resolve from one shared Graph request.
        fetchFacebookPosts(token, pageId, fetchLimit).then(
            ({ posts: fetched, error: fetchError }) => {
                if (cancelled) {
                    return;
                }
                setError(fetchError);
                setThumbs(fetchError ? [] : fetched);
                setLoading(false);
            }
        );

        return () => {
            cancelled = true;
        };
    }, [token, pageId, numberOfPosts]);

    // Editor preview Isotope — mirrors what frontend.js does on the live
    // page so the editor matches the rendered output (especially masonry
    // packing). Skips carousel (Pro's runtime owns that layout) and skips
    // when Isotope/imagesLoaded globals aren't present.
    const isoRef = useRef(null);
    useEffect(() => {
        if (layout === 'carousel') {
            return undefined;
        }
        if (
            typeof window === 'undefined' ||
            !window.Isotope ||
            !window.imagesLoaded
        ) {
            return undefined;
        }

        // Defer one tick so React has committed the latest cards before we
        // measure them — without this the container exists but child counts
        // can be stale right after a `thumbs` update.
        const tid = setTimeout(() => {
            const container = editorQuerySelector(
                `.${blockId} [data-layout]`
            );
            if (!container) {
                return;
            }

            // Iframe canvases use a different `HTMLElement` prototype than
            // the parent window — Isotope's default `instanceof` check skips
            // every item without this patch.
            patchIsotopeForIframe();

            window.imagesLoaded(container, () => {
                if (isoRef.current && isoRef.current.destroy) {
                    isoRef.current.destroy();
                    isoRef.current = null;
                }

                // Clear any inline `height` that a previous grid-layout
                // `equalizeGridRows` pass stamped on the cols. React reuses
                // the keyed `.eb-fb-feed__col` DOM nodes across a layout
                // switch, so without this a grid→list / grid→masonry switch
                // carries the old row-max heights (e.g. 400px) onto the new
                // layout — list items render at that fixed height, leaving a
                // huge gap between them. Cleared for every layout; grid then
                // re-applies via equalizeGridRows below.
                container
                    .querySelectorAll('.eb-fb-feed__col')
                    .forEach((col) => {
                        col.style.height = '';
                    });

                const safe = ['grid', 'list', 'masonry'].includes(layout)
                    ? layout
                    : 'grid';
                let opts;
                if (safe === 'list') {
                    opts = {
                        itemSelector: '.eb-fb-feed__col',
                        percentPosition: true,
                        layoutMode: 'vertical',
                    };
                } else if (safe === 'masonry') {
                    opts = {
                        itemSelector: '.eb-fb-feed__col',
                        percentPosition: true,
                        layoutMode: 'masonry',
                        masonry: { columnWidth: '.eb-fb-feed__col' },
                    };
                } else {
                    opts = {
                        itemSelector: '.eb-fb-feed__col',
                        percentPosition: true,
                        layoutMode: 'fitRows',
                    };
                }

                isoRef.current = new window.Isotope(container, opts);

                // Grid only — equalize row heights so mixed-content cards
                // in the same row share the tallest card's height. Mirrors
                // frontend.js. layoutComplete re-fires on every internal
                // re-arrange (the `changed` guard breaks the feedback loop);
                // the explicit call covers the first paint where
                // layoutComplete may have already fired synchronously.
                if (safe === 'grid') {
                    isoRef.current.on('layoutComplete', () => {
                        // Skip the layoutComplete our own iso.layout()
                        // triggered — re-entrancy guard against the
                        // layout→layoutComplete→layout recursion that blows
                        // the stack inside flex containers (see frontend.js).
                        if (isoRef.current._ebSuppressEqualize) {
                            isoRef.current._ebSuppressEqualize = false;
                            return;
                        }
                        equalizeGridRows(container, isoRef.current);
                    });
                    equalizeGridRows(container, isoRef.current);
                }
            });
        }, 200);

        return () => {
            clearTimeout(tid);
            if (isoRef.current && isoRef.current.destroy) {
                isoRef.current.destroy();
                isoRef.current = null;
            }
        };
        // `thumbs` drives the rendered card set; `sortBy` / `numberOfPosts`
        // reshuffle it; `layout` swaps the layoutMode; `blockId` is the
        // selector anchor; gap + column attrs change item box dimensions
        // (padding + width) so Isotope must re-measure and re-pack.
        // `enablePagination` + `postsPerPage` change the visible slice (the
        // editor caps to postsPerPage when pagination is on) so Isotope
        // needs to re-pack against the new item count.
        //
        // Content-display toggles (showProfileImage / showPageName /
        // showTimestamp / showMessage / messageLimit / showReactions /
        // showComments / showShares) all change a card's *height*. Masonry
        // and the vertical (list) layoutMode position items absolutely, so
        // without re-running Isotope after a height change, cards overlap
        // or leave huge gaps. Including these attrs in the deps array
        // forces a re-pack whenever the user flips one in the inspector.
        //
        // `attributes.align` (none / wide / full from the block toolbar)
        // changes the *container width*, which changes each card's column
        // width — Isotope caches column widths at mount, so without a
        // re-run the new width is ignored and cards overlap.
    }, [
        thumbs,
        sortBy,
        numberOfPosts,
        layout,
        blockId,
        enablePagination,
        postsPerPage,
        showProfileImage,
        showPageName,
        showTimestamp,
        showMessage,
        messageLimit,
        showReactions,
        showComments,
        showShares,
        attributes.align,
        attributes.fbItemGapRange,
        attributes.TABfbItemGapRange,
        attributes.MOBfbItemGapRange,
        attributes.fbColRange,
        attributes.TABfbColRange,
        attributes.MOBfbColRange,
        // Pro content filters change the visible post COUNT, so Isotope must
        // re-pack when one changes. These are undefined (stable) when Pro is
        // inactive — no extra re-runs. Mirrors the `eb_facebook_feed_editor_posts`
        // filter applied to the rendered `posts` above.
        attributes.filterPostType,
        attributes.filterKeyword,
        attributes.filterHashtag,
        resOption
    ]);

    // Block inserter preview.
    if (cover && cover.length) {
        return (
            <div>
                <img
                    src={cover}
                    alt={__('Facebook feed preview', 'essential-blocks')}
                    style={{ maxWidth: '100%' }}
                />
            </div>
        );
    }

    // Editor preview slice. We always cap at `numberOfPosts` so the editor
    // doesn't render more cards than the live site is configured to fetch.
    // When pagination is enabled (and the layout isn't carousel) we also
    // cap at `postsPerPage` so the preview mirrors what users see on first
    // paint of the live page — numbered pagination filters down to one
    // page via Isotope on mount, AJAX pagination only renders the first
    // page on the server. The pagination chips stay interactive in the
    // editor (for design / styling) but always render this same first slice.
    const isPaginatedPreview =
        enablePagination && layout !== 'carousel';
    const sortedPosts = sortPosts(thumbs || [], sortBy).slice(
        0,
        numberOfPosts
    );
    // Pro content filters (post type / keyword / hashtag) run server-side on
    // the live render via the `essential_blocks/facebook_feed/posts` PHP
    // filter. Mirror that in the editor preview so it's WYSIWYG — Pro hooks
    // `eb_facebook_feed_editor_posts` to narrow the array the same way. Order
    // matches PHP (sort → slice to numberOfPosts → content-filter). Gated to
    // real posts: the dummy placeholders shown to non-admin editors lack
    // `status_type` and carry fixed text, so filtering would empty the
    // preview — skip it and show the unfiltered dummies for design.
    const filteredPosts = isDummy
        ? sortedPosts
        : applyFilters(
            'eb_facebook_feed_editor_posts',
            sortedPosts,
            attributes
        );
    const posts = isPaginatedPreview
        ? filteredPosts.slice(0, Math.max(1, postsPerPage || 6))
        : filteredPosts;
    const showActions = showReactions || showComments || showShares;

    let container = null;

    if (loading) {
        container = (
            <p className="eb-fb-feed__loading">
                <Spinner />
                {__('Loading feed…', 'essential-blocks')}
            </p>
        );
    } else if (!token) {
        container = (
            <div className="eb-facebook-feed__placeholder">
                <p>
                    {__(
                        'To get started, add a Facebook Page access token in the Essential Blocks settings.',
                        'essential-blocks'
                    )}{' '}
                    <ExternalLink
                        href={`${EssentialBlocksLocalize.eb_admin_url}admin.php?page=essential-blocks&tab=options`}
                    >
                        {__('Open settings', 'essential-blocks')}
                    </ExternalLink>
                </p>
            </div>
        );
    } else if (!isDummy && !pageId) {
        container = (
            <div className="eb-facebook-feed__placeholder">
                <p>
                    {__(
                        'Add your Facebook Page ID in the Essential Blocks settings to load posts.',
                        'essential-blocks'
                    )}{' '}
                    <ExternalLink
                        href={`${EssentialBlocksLocalize.eb_admin_url}admin.php?page=essential-blocks&tab=options`}
                    >
                        {__('Open settings', 'essential-blocks')}
                    </ExternalLink>
                </p>
            </div>
        );
    } else if (error) {
        container = (
            <div className="eb-facebook-feed__placeholder">
                <p>
                    <strong>{__('Error:', 'essential-blocks')}</strong>{' '}
                    {error}
                </p>
            </div>
        );
    } else if (posts.length === 0) {
        container = (
            <div className="eb-facebook-feed__placeholder">
                <p>{__('No posts to display yet.', 'essential-blocks')}</p>
            </div>
        );
    } else {
        const supportedLayouts = applyFilters(
            'eb_facebook_feed_supported_layouts',
            ['grid', 'list', 'masonry']
        );
        const layoutSlug = supportedLayouts.includes(layout)
            ? layout
            : 'grid';
        const slideCards = posts.map((post) => {
            const pageName = post.from?.name || '';
            const avatarUrl = post.from?.id
                ? `https://graph.facebook.com/${encodeURIComponent(
                    post.from.id
                )}/picture?type=square`
                : '';
            const messageText = trimWords(
                post.message || '',
                messageLimit
            );
            const reactions = post.reactions?.summary?.total_count ?? 0;
            const comments = post.comments?.summary?.total_count ?? 0;
            const shares = post.shares?.count ?? 0;

            return (
                <div className="eb-fb-feed__col" key={post.id}>
                    <article className="eb-fb-feed__post">
                        {(showProfileImage ||
                            showPageName ||
                            showTimestamp) && (
                                <div className="eb-fb-feed__head">
                                    {showProfileImage && avatarUrl && (
                                        <img
                                            className="eb-fb-feed__avatar"
                                            src={avatarUrl}
                                            alt={pageName}
                                        />
                                    )}
                                    <div className="eb-fb-feed__head-meta">
                                        {showPageName && pageName && (
                                            <h4 className="eb-fb-feed__name">
                                                {pageName}
                                            </h4>
                                        )}
                                        {showTimestamp &&
                                            post.created_time && (
                                                <time
                                                    className="eb-fb-feed__time"
                                                    dateTime={
                                                        post.created_time
                                                    }
                                                >
                                                    {formatDate(
                                                        post.created_time
                                                    )}
                                                </time>
                                            )}
                                    </div>
                                </div>
                            )}

                        {showMessage && messageText && (
                            <p className="eb-fb-feed__message">
                                {messageText}
                            </p>
                        )}

                        {post.full_picture && (
                            <div className="eb-fb-feed__media">
                                <img
                                    src={post.full_picture}
                                    alt={messageText}
                                    loading="lazy"
                                />
                            </div>
                        )}

                        {showActions && (
                            <div className="eb-fb-feed__actions">
                                {showReactions && (
                                    <span className="eb-fb-feed__action eb-fb-feed__action--reactions">
                                        <span
                                            className="eb-fb-feed__icon"
                                            aria-hidden="true"
                                        >
                                            <i className="far fa-thumbs-up" />
                                        </span>
                                        <span className="eb-fb-feed__count">
                                            {reactions}
                                        </span>
                                    </span>
                                )}
                                {showComments && (
                                    <span className="eb-fb-feed__action eb-fb-feed__action--comments">
                                        <span
                                            className="eb-fb-feed__icon"
                                            aria-hidden="true"
                                        >
                                            <i className="far fa-comments" />
                                        </span>
                                        <span className="eb-fb-feed__count">
                                            {comments}
                                        </span>
                                    </span>
                                )}
                                {showShares && (
                                    <span className="eb-fb-feed__action eb-fb-feed__action--shares">
                                        <span
                                            className="eb-fb-feed__icon"
                                            aria-hidden="true"
                                        >
                                            <i className="fas fa-share" />
                                        </span>
                                        <span className="eb-fb-feed__count">
                                            {shares}
                                        </span>
                                    </span>
                                )}
                            </div>
                        )}
                    </article>
                </div>
            );
        });

        // Default feed container — the Isotope/flex shell free ships for
        // grid / list / masonry, and the no-Pro fallback for carousel.
        const defaultFeed = (
            <div
                // `is-isotope-ready` is normally added by frontend.js after
                // Isotope mounts; the editor doesn't load that script, so
                // set it inline here to bypass the visibility-hidden FOUC
                // guard in style.scss.
                className={`eb-fb-feed--${layoutSlug} is-isotope-ready`}
                data-layout={layout}
            >
                {slideCards}
            </div>
        );

        // Pro wraps the slide cards in react-slick for the carousel layout
        // (matching the live Slick frontend); every other layout falls
        // through to defaultFeed unchanged. Without Pro this is a no-op.
        container = applyFilters(
            'eb_facebook_feed_editor_feed',
            defaultFeed,
            slideCards,
            attributes,
            setAttributes
        );
    }

    return (
        <>
            {isSelected && (
                <Inspector
                    key="inspector"
                    attributes={attributes}
                    setAttributes={setAttributes}
                />
            )}
            <BlockProps.Edit {...enhancedProps}>
                <div
                    className={`eb-parent-wrapper eb-parent-${blockId} ${classHook || ''
                        }`}
                >
                    <div className={`eb-facebook-feed-wrapper ${blockId}`}>
                        {isDummy && !loading && (
                            <div className="eb-facebook-feed__dummy-notice">
                                <strong>
                                    {__(
                                        'Preview Mode:',
                                        'essential-blocks'
                                    )}
                                </strong>{' '}
                                {__(
                                    "You're seeing placeholder content because you don't have administrator permissions. The real Facebook feed will display on the frontend.",
                                    'essential-blocks'
                                )}
                            </div>
                        )}
                        {container}
                        { /* Preview-only Load More button — matches the
						     frontend markup so designers can style it from
						     the editor. No click handler; pagination only
						     runs on the live site. */ }
                        {enablePagination &&
                            paginationType === 'ajax' &&
                            layout !== 'carousel' && (
                                <button
                                    type="button"
                                    className="eb-fb-feed__load-more"
                                    onClick={(e) => e.preventDefault()}
                                >
                                    {loadMoreText}
                                </button>
                            )}

                        { /* Preview-only numbered pagination — mirrors
                             frontend.js's windowing so the editor preview
                             looks identical to what ships on the page.
                             Clicking changes the active button visually only
                             (no real pagination since editor renders all
                             dummy/Graph posts at once). */ }
                        {enablePagination &&
                            paginationType === 'numbered' &&
                            layout !== 'carousel' &&
                            (() => {
                                const total = Math.max(
                                    1,
                                    Math.ceil(
                                        (numberOfPosts || 0) /
                                        Math.max(1, postsPerPage || 6)
                                    )
                                );
                                if (total <= 1) {
                                    return null;
                                }
                                const active = Math.min(previewPage, total);
                                const pages = [];
                                for (let p = 1; p <= total; p++) {
                                    pages.push(p);
                                }
                                const isWindowed = (page) =>
                                    page === 1 ||
                                    page === total ||
                                    Math.abs(page - active) <= 1;
                                const visible = pages.filter(isWindowed);
                                const items = [];
                                visible.forEach((p, i) => {
                                    items.push(
                                        <a
                                            key={`p-${p}`}
                                            href="#"
                                            className={
                                                'eb-fb-feed__page-link' +
                                                (p === active
                                                    ? ' is-current'
                                                    : '')
                                            }
                                            data-page={p}
                                            aria-current={
                                                p === active
                                                    ? 'page'
                                                    : undefined
                                            }
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setPreviewPage(p);
                                            }}
                                        >
                                            {p}
                                        </a>
                                    );
                                    if (
                                        i < visible.length - 1 &&
                                        visible[i + 1] - p > 1
                                    ) {
                                        items.push(
                                            <span
                                                key={`s-${p}`}
                                                className="eb-fb-feed__page-separator"
                                                aria-hidden="true"
                                            >
                                                …
                                            </span>
                                        );
                                    }
                                });
                                return (
                                    <nav
                                        className="eb-fb-feed__pagination"
                                        aria-label={__(
                                            'Feed pagination',
                                            'essential-blocks'
                                        )}
                                    >
                                        <button
                                            type="button"
                                            className="eb-fb-feed__page-prev"
                                            disabled={active <= 1}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                if (active > 1) {
                                                    setPreviewPage(
                                                        active - 1
                                                    );
                                                }
                                            }}
                                        >
                                            ‹
                                        </button>
                                        {items}
                                        <button
                                            type="button"
                                            className="eb-fb-feed__page-next"
                                            disabled={active >= total}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                if (active < total) {
                                                    setPreviewPage(
                                                        active + 1
                                                    );
                                                }
                                            }}
                                        >
                                            ›
                                        </button>
                                    </nav>
                                );
                            })()}
                    </div>
                </div>
            </BlockProps.Edit>
        </>
    );
}

export default memo(withBlockContext(defaultAttributes)(Edit));
