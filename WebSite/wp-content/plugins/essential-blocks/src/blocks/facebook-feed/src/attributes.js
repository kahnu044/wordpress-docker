/**
 * Internal dependencies
 */
import {
    NUMBER_OF_COLUMNS,
    ITEM_GAP,
    IMAGE_BORDER,
    LOAD_MORE_BORDER,
    PAGINATION_BORDER,
    WRAPPER_MARGIN,
    WRAPPER_PADDING,
    WRAPPER_BG,
    WRAPPER_BORDER,
} from './constants';
import {
    typoPrefix_message,
    typoPrefix_meta,
    typoPrefix_header,
    typoPrefix_loadMore,
    typoPrefix_pagination,
} from './constants/typographyPrefixConstants';

/**
 * External dependencies
 */
import {
    generateTypographyAttributes,
    generateResponsiveRangeAttributes,
    generateDimensionsAttributes,
    generateBorderShadowAttributes,
    generateBackgroundAttributes,
} from '@essential-blocks/controls';

const attributes = {
    // --- 4 core attributes (mandatory for responsive + asset generation) ---
    resOption: {
        type: 'string',
        default: 'Desktop',
    },
    blockId: {
        type: 'string',
    },
    blockRoot: {
        type: 'string',
        default: 'essential_block',
    },
    blockMeta: {
        type: 'object',
    },

    // --- Preview image (block inserter) ---
    cover: {
        type: 'string',
        default: '',
    },
    preview: {
        type: 'boolean',
        default: false,
    },

    // --- Source ---
    token: {
        type: 'string',
        default: '',
    },
    pageId: {
        type: 'string',
        default: '',
    },
    sortBy: {
        type: 'string',
        default: 'most_recent',
    },
    numberOfPosts: {
        type: 'number',
        default: 12,
    },
    // Cache TTL (minutes) — how long Graph API responses stay in the
    // transient cache before re-querying. Used as the base value of the
    // `essential_blocks/facebook_feed/cache_ttl` filter in PHP. Default
    // matches the historical hardcoded 15-minute TTL.
    cacheTtl: {
        type: 'number',
        default: 15,
    },
    // NOTE: the fetched feed is deliberately NOT an attribute. It used to be
    // persisted as `thumbs`, which baked the whole Graph response (~13 KB per
    // block) into post_content even though the server render re-fetches it
    // and never reads the saved copy. It now lives in edit.js component state.

    // --- Layout (Free: grid | list. Pro adds: masonry | carousel) ---
    layout: {
        type: 'string',
        default: 'grid',
    },

    // --- Content display toggles ---
    showProfileImage: {
        type: 'boolean',
        default: true,
    },
    showPageName: {
        type: 'boolean',
        default: true,
    },
    showTimestamp: {
        type: 'boolean',
        default: true,
    },
    showMessage: {
        type: 'boolean',
        default: true,
    },
    messageLimit: {
        type: 'number',
        default: 10,
    },
    showReactions: {
        type: 'boolean',
        default: true,
    },
    showComments: {
        type: 'boolean',
        default: false,
    },
    showShares: {
        type: 'boolean',
        default: true,
    },

    // --- Behavior ---
    enablePagination: {
        type: 'boolean',
        default: false,
    },
    paginationType: {
        type: 'string',
        default: 'ajax',
    },
    postsPerPage: {
        type: 'number',
        default: 6,
    },
    loadMoreText: {
        type: 'string',
        default: 'Load More',
    },
    enableLink: {
        type: 'boolean',
        default: true,
    },
    openInNewTab: {
        type: 'boolean',
        default: true,
    },

    // --- Colors ---
    headerColor: {
        type: 'string',
        default: 'var(--eb-global-heading-color)',
    },
    messageColor: {
        type: 'string',
        default: 'var(--eb-global-text-color)',
    },
    metaColor: {
        type: 'string',
        default: 'var(--eb-global-tertiary-color)',
    },
    // Color of the divider line above the actions row (.eb-fb-feed__actions
    // border-top). Defaults to the SCSS value so the control reflects the
    // rendered color out of the box.
    actionsBorderColor: {
        type: 'string',
        default: '#e4e6eb',
    },
    cardBgColor: {
        type: 'string',
        default: '#ffffff',
    },

    // --- Load More button colors (normal + hover) ---
    loadMoreState: {
        type: 'string',
        default: 'normal',
    },
    loadMoreColor: {
        type: 'string',
        default: '#ffffff',
    },
    loadMoreBgColor: {
        type: 'string',
        default: 'var(--eb-global-primary-color, #1877F2)',
    },
    loadMoreHoverColor: {
        type: 'string',
        default: '#ffffff',
    },
    loadMoreHoverBgColor: {
        type: 'string',
        default: '#0d6efd',
    },

    // --- Pagination chip colors (normal + hover + active page) ---
    paginationState: {
        type: 'string',
        default: 'normal',
    },
    paginationColor: {
        type: 'string',
        default: 'var(--eb-global-text-color, #4a463f)',
    },
    paginationBgColor: {
        type: 'string',
        default: 'var(--eb-global-background-color, #f5f6fa)',
    },
    paginationHoverColor: {
        type: 'string',
        default: '#ffffff',
    },
    paginationHoverBgColor: {
        type: 'string',
        default: 'var(--eb-global-primary-color, #1877F2)',
    },
    paginationActiveColor: {
        type: 'string',
        default: '#ffffff',
    },
    paginationActiveBgColor: {
        type: 'string',
        default: 'var(--eb-global-primary-color, #1877F2)',
    },

    // --- Typography ---
    ...generateTypographyAttributes(typoPrefix_header, { fontSize: 15 }),
    ...generateTypographyAttributes(typoPrefix_message, { fontSize: 14 }),
    ...generateTypographyAttributes(typoPrefix_meta, { fontSize: 12 }),
    ...generateTypographyAttributes(typoPrefix_loadMore, { fontSize: 14 }),
    ...generateTypographyAttributes(typoPrefix_pagination, { fontSize: 13 }),

    // --- Layout dimensions ---
    ...generateResponsiveRangeAttributes(NUMBER_OF_COLUMNS, {
        defaultRange: 3,
        defaultRangeTAB: 2,
        defaultRangeMOB: 1,
        noUnits: true,
    }),
    // Single-number gap (px) shared by grid / list / masonry. Applied as
    // half-gap padding on each `.eb-fb-feed__col`, which Isotope reads via
    // the item's box dimensions so all three layouts stay in sync.
    ...generateResponsiveRangeAttributes(ITEM_GAP, {
        defaultRange: 20,
        defaultRangeTAB: 16,
        defaultRangeMOB: 12,
        noUnits: true,
    }),
    ...generateDimensionsAttributes(WRAPPER_PADDING),
    ...generateDimensionsAttributes(WRAPPER_MARGIN, {
        top: 28,
        bottom: 28,
        isLinked: false,
    }),

    // --- Wrapper background + border (Advanced tab; mirrors advanced-heading) ---
    ...generateBackgroundAttributes(WRAPPER_BG, {
        defaultFillColor: 'transparent',
    }),
    ...generateBorderShadowAttributes(WRAPPER_BORDER, {
        bdrDefaults: { top: 0, bottom: 0, right: 0, left: 0 },
    }),

    // --- Border & shadow (post card) ---
    ...generateBorderShadowAttributes(IMAGE_BORDER, {
        defaultBdrStyle: 'solid',
        defaultBdrColor: '#e4e6eb',
        bdrDefaults: { top: 1, bottom: 1, right: 1, left: 1, isLinked: true },
        rdsDefaults: { top: 12, bottom: 12, right: 12, left: 12, isLinked: true },
    }),

    // --- Border & shadow (Load More button) ---
    ...generateBorderShadowAttributes(LOAD_MORE_BORDER, {
        rdsDefaults: {
            top: 6,
            bottom: 6,
            right: 6,
            left: 6,
            isLinked: true
        },
    }),

    // --- Border & shadow (Pagination chips) ---
    ...generateBorderShadowAttributes(PAGINATION_BORDER, {
        rdsDefaults: {
            top: 4,
            bottom: 4,
            right: 4,
            left: 4,
            isLinked: true
        },
    }),
};

export default attributes;
