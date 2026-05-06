import {
    WRAPPER_MARGIN,
    WRAPPER_PADDING,
    WRAPPER_BORDER_SHADOW,
    WRAPPER_BG,
    COLUMNS,
    COLUMN_GAP,
    COLUMN_PADDING,
    COLUMN_BG,
    COLUMN_BORDER_SHADOW,
    THUMBNAIL_IMAGE_SIZE,
    THUMBNAIL_BORDER_RADIUS,
    THUMBNAIL_MARGIN,
    TITLE_MARGIN,
    TITLE_PADDING,
    TITLE_BORDER_SHADOW,
    CONTENT_MARGIN,
    READMORE_MARGIN,
    READMORE_PADDING,
    READMORE_BORDER_SHADOW,
    HEADER_META_MARGIN,
    FOOTER_META_MARGIN,
    HEADER_META_SPACE,
    FOOTER_META_SPACE,
    AVATAR_BORDER_RADIUS,
    COLUMN_MEDIA_WIDTH,
    LOADMORE_PADDING,
    LOADMORE_MARGIN,
    LOADMORE_BORDER_SHADOW,
    FILTER_MARGIN,
    FILTER_ITEM_PADDING,
    FILTER_ITEM_BORDER_SHADOW,
    FILTER_ITEM_GAP,
    INPUT_HEIGHT,
    INPUT_PADDING,
    INPUT_BORDER,
    ICON_WIDTH,
    SEARCH_RESULT_WIDTH,
    SEARCH_RESULT_BORDER,
    SEARCH_RESULT_PADDING,
    SEARCH_CONTENT_PADDING,
    SEARCH_CONTENT_MARGIN,
    SEARCH_CONTENT_BORDER,
    NO_SEARCH_ALIGNMENT,
    TAXONOMY_PADDING,
    TAXONOMY_BORDER,
    ICON_SIZE,
    ICON_SPACE,
    POST_MIN_HEIGHT,
    POST_WIDTH,
    LIST_POST_WIDTH,
    FEATURED_TITLE_PADDING,
    FEATURED_TITLE_MARGIN,
    FEATURED_TITLE_BORDER,
    FEATURED_EXCERPT_PADDING,
    FEATURED_EXCERPT_MARGIN,
    FEATURED_EXCERPT_BORDER,
    FEATURED_META_PADDING,
    FEATURED_META_MARGIN,
    FEATURED_META_BORDER,
    FEATURED_POST_BORDER,
    FEATURED_POST_PADDING,
    FEATURED_AVATAR_RADIUS
} from "./constants/constants";

import {
    generateDimensionsAttributes,
    generateTypographyAttributes,
    generateBackgroundAttributes,
    generateBorderShadowAttributes,
    generateResponsiveRangeAttributes,
    generateResponsiveAlignAttributes,
} from "@essential-blocks/controls";

import {
    EBPG_TITLE_TYPOGRAPHY,
    EBPG_CONTENT_TYPOGRAPHY,
    EBPG_READMORE_TYPOGRAPHY,
    EBPG_META_TYPOGRAPHY,
    EBPG_LOAD_MORE_TYPOGRAPHY,
    FILTER_ITEM_TYPOGRAPHY,
    INPUT_TYPOGRAPHY,
    CONTENT_TYPOGRAPHY,
    TITLE_TYPOGRAPHY,
    NOT_FOUND_TYPOGRAPHY,
    FEATURED_TITLE_TYPO,
    FEATURED_EXCERPT_TYPO,
    FEATURED_META_TYPO,
} from "./constants/typographyPrefixConstants";


const attributes = {
    resOption: {
        type: "string",
        default: "Desktop",
    },

    // blockId attribute for making unique className and other uniqueness
    blockId: {
        type: "string",
    },
    blockRoot: {
        type: "string",
        default: "essential_block",
    },
    blockMeta: {
        type: "object",
    },
    version: {
        type: "string",
    },
    queryData: {
        type: "object",
    },
    queryResults: {
        type: "array",
    },
    postTerms: {
        type: "object",
        default: {},
    },

    preset: {
        type: "string",
        default: "style-1",
    },
    showThumbnail: {
        type: "boolean",
        default: true,
    },
    thumbnailOverlayColor: {
        type: "string",
        default: "rgba(0 0 0 / 0)",
    },
    thumbnailOverlayHoverColor: {
        type: "string",
        default: "rgba(0 0 0 / 0.5)",
    },
    thumbnailSize: {
        type: "string",
    },
    styleVerticalAlignment: {
        type: "string",
        default: "flex-start",
    },
    showTitle: {
        type: "boolean",
        default: true,
    },
    titleColor: {
        type: "string",
        default: "var(--eb-global-heading-color)",
    },
    titleHoverColor: {
        type: "string",
        default: "var(--eb-global-link-color)",
    },
    titleColorStyle: {
        type: "string",
        default: "normal",
    },
    titleLength: {
        type: "number",
    },
    titleTextAlign: {
        type: "string",
        default: "left",
    },
    titleTag: {
        type: "string",
        default: "h2",
    },
    showContent: {
        type: "boolean",
        default: true,
    },
    contentColor: {
        type: "string",
        default: "var(--eb-global-text-color)",
    },
    contentTextAlign: {
        type: "string",
        default: "left",
    },
    contentLength: {
        type: "number",
        default: 20,
    },
    expansionIndicator: {
        type: "string",
        default: "...",
    },
    showReadMore: {
        type: "boolean",
        default: false,
    },
    readmoreText: {
        type: "string",
        default: "Read More",
    },
    readmoreColor: {
        type: "string",
        default: "var(--eb-global-tertiary-color)",
    },
    readmoreBGColor: {
        type: "string",
    },
    readmoreTextAlign: {
        type: "string",
        default: "left",
    },
    readmoreHoverColor: {
        type: "string",
        default: "var(--eb-global-secondary-color)",
    },
    readmoreBGHoverColor: {
        type: "string",
    },
    readmoreColorType: {
        type: "string",
        default: "normal",
    },
    showMeta: {
        type: "boolean",
        default: true,
    },
    headerMeta: {
        type: "string",
        default: '[{"value":"category","label":"Categories"}]',
    },
    footerMeta: {
        type: "string",
        default:
            '[{"value":"avatar","label":"Author Avatar"},{"value":"author","label":"Author Name"},{"value":"date","label":"Published Date"}]',
    },
    authorPrefix: {
        type: "string",
        default: "by",
    },
    datePrefix: {
        type: "string",
        default: "on",
    },
    headerMetaTextAlign: {
        type: "string",
        default: "flex-start",
    },
    footerMetaTextAlign: {
        type: "string",
        default: "flex-start",
    },
    authorMetaColor: {
        type: "string",
        default: "var(--eb-global-secondary-color)",
    },
    authorMetaHoverColor: {
        type: "string",
        default: "var(--eb-global-primary-color)",
    },
    metaColorType: {
        type: "string",
        default: "normal",
    },
    commonMetaColor: {
        type: "string",
        default: "var(--eb-global-text-color)",
    },
    commonMetaHoverColor: {
        type: "string",
        default: "var(--eb-global-text-color)",
    },
    commonMetaBgColor: {
        type: "string",
        default: "var(--eb-global-secondary-color)",
    },
    commonMetaBgHoverColor: {
        type: "string",
        default: "var(--eb-global-primary-color)",
    },
    categoryMetaColor: {
        type: "string",
        default: "var(--eb-global-button-text-color)",
    },
    categoryMetaHoverColor: {
        type: "string",
        default: "var(--eb-global-button-text-color)",
    },
    categoryMetaBgColor: {
        type: "string",
        default: "var(--eb-global-secondary-color)",
    },
    categoryMetaBgHoverColor: {
        type: "string",
        default: "var(--eb-global-primary-color)",
    },
    tagMetaColor: {
        type: "string",
        default: "var(--eb-global-button-text-color)",
    },
    tagMetaHoverColor: {
        type: "string",
        default: "var(--eb-global-button-text-color)",
    },
    tagMetaBgColor: {
        type: "string",
        default: "var(--eb-global-tertiary-color)",
    },
    tagMetaBgHoverColor: {
        type: "string",
        default: "var(--eb-global-secondary-color)",
    },
    dateMetaColor: {
        type: "string",
        default: "var(--eb-global-tertiary-color)",
    },

    //Load More Attributes
    loadMoreOptions: {
        type: "object",
    },
    loadMoreColorType: {
        type: "string",
        default: "normal",
    },
    loadMoreColor: {
        type: "string",
        default: "var(--eb-global-button-text-color)",
    },
    loadMoreBgColor: {
        type: "string",
        default: "var(--eb-global-button-background-color)",
    },
    loadMoreHoverColor: {
        type: "string",
        default: "var(--eb-global-button-text-color)",
    },
    loadMoreHoverBgColor: {
        type: "string",
        default: "var(--eb-global-tertiary-color)",
    },
    loadMoreActiveColor: {
        type: "string",
        default: "var(--eb-global-button-text-color)",
    },
    loadMoreActiveBgColor: {
        type: "string",
        default: "var(--eb-global-tertiary-color)",
    },
    ReadTimeMetaColor: {
        type: "string",
        default: "var(--eb-global-secondary-color)",
    },
    dynamicMetaColor: {
        type: "string",
        default: "var(--eb-global-secondary-color)",
    },
    dynamicMetaBgColor: {
        type: "string",
    },

    //filter
    showTaxonomyFilter: {
        type: "boolean",
        default: false,
    },
    selectedTaxonomy: {
        type: "string",
    },
    selectedTaxonomyItems: {
        type: "string",
        default: '[{"value":"all","label":"All"}]',
    },
    filterColorStyle: {
        type: "stroing",
        default: "normal",
    },
    filterBgColor: {
        type: "string",
        default: "var(--eb-global-background-color)",
    },
    filterTextColor: {
        type: "string",
        default: "var(--eb-global-primary-color)",
    },
    filterActiveBgColor: {
        type: "string",
        default: "var(--eb-global-primary-color)",
    },
    filterActiveTextColor: {
        type: "string",
        default: "var(--eb-global-button-text-color)",
    },
    filterHoverBgColor: {
        type: "string",
        default: "var(--eb-global-primary-color)",
    },
    filterHoverTextColor: {
        type: "string",
        default: "var(--eb-global-button-text-color)",
    },
    showSearch: {
        type: "boolean",
        default: false,
    },
    enableAjaxSearch: {
        type: "boolean",
        default: false,
    },
    searchBgColor: {
        type: "string",
    },
    btnColorType: {
        type: "string",
        default: "normal",
    },
    inputColor: {
        type: "string",
        default: "#666666",
    },
    placeholderColor: {
        type: "string",
        default: "#949494",
    },
    textHoverColor: {
        type: "string",
    },
    textFocusColor: {
        type: "string",
    },
    placeholderHoverColor: {
        type: "string",
    },
    iconColor: {
        type: "string",
        default: "#949494",
    },
    closeIconColor: {
        type: "string",
        default: "#dc4444",
    },
    loaderColor: {
        type: "string",
        default: "#444b54",
    },
    searchResultBoxColor: {
        type: "string",
        default: "#FFFFFF",
    },
    contentColorType: {
        type: "string",
        default: "normal",
    },
    contentBgColor: {
        type: "string",
        default: "#ffffff",
    },
    contentHoverBgColor: {
        type: "string",
        default: "#ffffff",
    },
    contentTitleColor: {
        type: "string",
    },
    contentTitleHoverColor: {
        type: "string",
        default: "#5959E8",
    },
    contentHoverColor: {
        type: "string",
        default: "#b2b9c6",
    },
    notFoundColor: {
        type: "string",
        default: "#000000",
    },
    taxonomyBgColor: {
        type: "string",
        default: "#ffffff",
    },
    addIcon: {
        type: "boolean",
        default: false,
    },
    icon: {
        type: "string",
        default: "fas fa-chevron-right",
    },
    iconPosition: {
        type: "string",
        default: "left",
    },
    contentLists: {
        type: "array",
        default: ["thumbnail", "title", "excerpt", "button", "meta"],
    },
    enableContents: {
        type: "array",
        default: ["thumbnail", "title", "excerpt", "headerMeta", "footerMeta"],
    },
    enableThumbnailSort: {
        type: "boolean",
        default: true,
    },
    defaultFilter: {
        type: "string"
    },
    showFallbackImg: {
        type: "boolean",
        default: false,
    },
    fallbackImgUrl: {
        type: "string",
    },
    fallbackImgId: {
        type: "string",
    },
    fallbackImgAlt: {
        type: "string",
    },
    showFeaturedPost: {
        type: "boolean",
        default: false,
    },
    featuredPostId: {
        type: "string",
        default: "",
    },
    showFeaturedPostTitle: {
        type: "boolean",
        default: true,
    },
    showFeaturedPostContent: {
        type: "boolean",
        default: false,
    },
    showFeaturedPostMeta: {
        type: "boolean",
        default: true,
    },
    showFeaturedHeaderMeta: {
        type: "boolean",
        default: true,
    },
    showFeaturedFooterMeta: {
        type: "boolean",
        default: true,
    },
    featuredMetaItems: {
        type: "string",
        default: '{}',
    },
    featuredExcerptLength: {
        type: "number",
        default: 10,
    },
    featuredTitleColor: {
        type: "string",
        default: "#fff",
    },
    featuredTitleHoverColor: {
        type: "string",
        default: "#fff",
    },
    featuredExcerptColor: {
        type: "string",
        default: "#fff",
    },
    featuredExcerptHoverColor: {
        type: "string",
    },
    featuredMetaColor: {
        type: "string",
        default: "#fff",
    },
    featuredMetaHoverColor: {
        type: "string",
        default: "#fff",
    },
    featuredPostBorderRadius: {
        type: "number",
        default: 0,
    },
    featuredPostBottomSpacing: {
        type: "number",
        default: 20,
    },
    featuredPostHorizontalAlign: {
        type: "string",
        default: "flex-start",
    },
    featuredPostVerticalAlign: {
        type: "string",
        default: "flex-end",
    },
    featuredMetaBGColor: {
        type: "string",
        default: "#FFFFFF3D",
    },
    featuredMetaBGHoverColor: {
        type: "string",
        default: "#FFFFFF3D",
    },
    featuredOverlayColor: {
        type: "string",
        default: "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.32) 39.66%, rgba(0, 0, 0, 0.8) 100%)",
    },
    featuredPostMetaStatus: {
        type: "string",
        default: "normal",
    },
    featuredPostAuthorMetaColor: {
        type: "string",
        default: "#fff",
    },
    featuredPostAuthorMetaHoverColor: {
        type: "string",
        default: "#fff",
    },
    featuredPostDateMetaColor: {
        type: "string",
        default: "#fff",
    },
    featuredPostCommonMetaColor: {
        type: "string",
        default: "#fff",
    },
    featuredPostCommonMetaBgColor: {
        type: "string",
        default: "transparent",
    },
    featuredPostCategoryMetaColor: {
        type: "string",
        default: "#fff",
    },
    featuredPostCategoryMetaBgColor: {
        type: "string",
        default: "var(--eb-global-secondary-color)",
    },
    featuredPostTagMetaColor: {
        type: "string",
        default: "#fff",
    },
    featuredPostTagMetaBgColor: {
        type: "string",
        default: "var(--eb-global-tertiary-color)",
    },
    featuredPostReadTimeMetaColor: {
        type: "string",
        default: "#fff",
    },
    featuredPostDynamicMetaColor: {
        type: "string",
        default: "#fff",
    },
    featuredPostDynamicMetaBgColor: {
        type: "string",
        default: "transparent",
    },
    featuredPostCommonMetaHoverColor: {
        type: "string",
        default: "#fff",
    },
    featuredPostCommonMetaHoverBgColor: {
        type: "string",
        default: "transparent",
    },
    featuredPostCategoryMetaHoverColor: {
        type: "string",
        default: "#fff",
    },
    featuredPostCategoryMetaHoverBgColor: {
        type: "string",
        default: "transparent",
    },
    featuredPostTagMetaHoverColor: {
        type: "string",
        default: "#fff",
    },
    featuredPostTagMetaHoverBgColor: {
        type: "string",
        default: "transparent",
    },

    ...generateDimensionsAttributes(SEARCH_CONTENT_PADDING, {
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        isLinked: true,
    }),
    ...generateDimensionsAttributes(SEARCH_CONTENT_MARGIN, {
        top: 0,
        bottom: 20,
        right: 0,
        left: 0,
        isLinked: false,
    }),
    ...generateBorderShadowAttributes(SEARCH_CONTENT_BORDER, {
        // defaultBdrColor: "#aaaaaa",
        defaultBdrStyle: "none",
        bdrDefaults: {
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
        },
        rdsDefaults: {
            top: 5,
            bottom: 5,
            right: 5,
            left: 5,
        },
        noShadow: true,
        // noBorder: true,
    }),
    ...generateResponsiveAlignAttributes(NO_SEARCH_ALIGNMENT, {
        defaultAlign: "center",
    }),
    ...generateBorderShadowAttributes(SEARCH_RESULT_BORDER, {
        // defaultBdrColor: "#aaaaaa",
        defaultBdrStyle: "none",
        bdrDefaults: {
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
        },
        rdsDefaults: {
            top: 5,
            bottom: 5,
            right: 5,
            left: 5,
        },
        noShadow: true,
        // noBorder: true,
    }),
    ...generateDimensionsAttributes(SEARCH_RESULT_PADDING, {
        top: 30,
        bottom: 30,
        right: 30,
        left: 30,
        isLinked: false,
    }),
    ...generateResponsiveRangeAttributes(SEARCH_RESULT_WIDTH, {
        defaultRange: 100,
        defaultUnit: "%",
    }),

    ...generateResponsiveRangeAttributes(INPUT_HEIGHT, {
        // defaultRange: 300,
    }),
    ...generateResponsiveRangeAttributes(ICON_WIDTH, {
        defaultRange: 30,
    }),
    ...generateDimensionsAttributes(INPUT_PADDING, {
        top: 10,
        bottom: 10,
        right: 10,
        left: 10,
        isLinked: true,
    }),

    ...generateDimensionsAttributes(TAXONOMY_PADDING, {
        top: 10,
        bottom: 10,
        right: 10,
        left: 10,
        isLinked: true,
    }),

    ...generateBorderShadowAttributes(INPUT_BORDER, {
        defaultBdrColor: "#C9D8EB",
        defaultBdrStyle: "solid",
        bdrDefaults: {
            top: 1,
            bottom: 1,
            right: 1,
            left: 1,
        },
        rdsDefaults: {
            top: 5,
            bottom: 5,
            right: 5,
            left: 5,
        },
        // noShadow: true,
        // noBorder: true,
    }),

    ...generateBorderShadowAttributes(TAXONOMY_BORDER, {
        defaultBdrColor: "#C9D8EB",
        defaultBdrStyle: "solid",
        bdrDefaults: {
            top: 1,
            bottom: 1,
            right: 1,
            left: 1,
        },
        rdsDefaults: {
            top: 5,
            bottom: 5,
            right: 5,
            left: 5,
        },
        // noShadow: true,
        // noBorder: true,
    }),

    ...generateDimensionsAttributes(LOADMORE_PADDING, {
        top: 5,
        bottom: 5,
        right: 10,
        left: 10,
        isLinked: false,
    }),
    ...generateDimensionsAttributes(LOADMORE_MARGIN, {
        top: 10,
        bottom: 10,
        right: 5,
        left: 5,
        isLinked: false,
    }),
    // border shadow attributes ⬇
    ...generateBorderShadowAttributes(LOADMORE_BORDER_SHADOW, {
        noShadow: true,
        defaultBdrColor: "#c3c3c3",
        defaultBdrStyle: "solid",
        bdrDefaults: {
            top: 1,
            right: 1,
            bottom: 1,
            left: 1,
        },
        rdsDefaults: {
            top: 4,
            right: 4,
            bottom: 4,
            left: 4,
        },
        // noBorder: true,
    }),
    ...generateBorderShadowAttributes(READMORE_BORDER_SHADOW, {
        noShadow: true,
        defaultBdrColor: "#F445FF",
        defaultBdrStyle: "none",
        bdrDefaults: {
            top: 1,
            right: 1,
            bottom: 1,
            left: 1,
        },
        rdsDefaults: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
        },
        // noBorder: true,
    }),

    // typography attributes ⬇
    ...generateTypographyAttributes(EBPG_TITLE_TYPOGRAPHY, {
        fontSize: 18,
    }),
    ...generateTypographyAttributes(EBPG_CONTENT_TYPOGRAPHY, {
        fontSize: 15,
    }),
    ...generateTypographyAttributes(EBPG_READMORE_TYPOGRAPHY, {
        fontSize: 13,
    }),
    ...generateTypographyAttributes(EBPG_META_TYPOGRAPHY, {
        fontSize: 13,
    }),
    ...generateTypographyAttributes(EBPG_LOAD_MORE_TYPOGRAPHY, {
        fontSize: 14,
    }),
    ...generateTypographyAttributes(FILTER_ITEM_TYPOGRAPHY, {
        fontSize: 16,
    }),

    // margin padding attributes ⬇
    ...generateDimensionsAttributes(WRAPPER_MARGIN),
    ...generateDimensionsAttributes(WRAPPER_PADDING),
    ...generateDimensionsAttributes(COLUMN_PADDING),
    ...generateDimensionsAttributes(TITLE_MARGIN, {
        top: 0,
        bottom: 10,
        right: 0,
        left: 0,
        isLinked: false,
    }),
    ...generateDimensionsAttributes(TITLE_PADDING),
    ...generateBorderShadowAttributes(TITLE_BORDER_SHADOW),
    ...generateDimensionsAttributes(CONTENT_MARGIN, {
        top: 0,
        bottom: 10,
        right: 0,
        left: 0,
        isLinked: false,
    }),
    ...generateDimensionsAttributes(READMORE_MARGIN, {
        top: 0,
        bottom: 10,
        right: 0,
        left: 0,
        isLinked: false,
    }),
    ...generateDimensionsAttributes(READMORE_PADDING, {
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        isLinked: false,
    }),
    ...generateDimensionsAttributes(HEADER_META_MARGIN, {
        top: 0,
        bottom: 10,
        right: 0,
        left: 0,
        isLinked: false,
    }),
    ...generateDimensionsAttributes(FOOTER_META_MARGIN, {
        top: 0,
        bottom: 10,
        right: 0,
        left: 0,
        isLinked: false,
    }),
    ...generateDimensionsAttributes(THUMBNAIL_MARGIN, {
        top: 0,
        bottom: 10,
        right: 0,
        left: 0,
        isLinked: false,
    }),
    ...generateDimensionsAttributes(FILTER_MARGIN, {
        top: 0,
        bottom: 20,
        right: 0,
        left: 0,
        isLinked: false,
    }),
    ...generateDimensionsAttributes(FILTER_ITEM_PADDING, {
        top: 10,
        bottom: 10,
        right: 20,
        left: 20,
        isLinked: false,
    }),
    ...generateDimensionsAttributes(THUMBNAIL_BORDER_RADIUS),
    ...generateDimensionsAttributes(AVATAR_BORDER_RADIUS, {
        top: 50,
        bottom: 50,
        right: 50,
        left: 50,
        isLinked: true,
    }),

    // border shadow attributes ⬇
    ...generateBorderShadowAttributes(WRAPPER_BORDER_SHADOW, {
        // noShadow: true,
        // noBorder: true,
    }),
    ...generateBorderShadowAttributes(COLUMN_BORDER_SHADOW, {
        // noShadow: true,
        // noBorder: true,
    }),
    ...generateBorderShadowAttributes(FILTER_ITEM_BORDER_SHADOW, {
        // defaultBdrColor: "var(--eb-global-tertiary-color)",
        // noShadow: true,
        // noBorder: true,
    }),

    // background attributes ⬇
    ...generateBackgroundAttributes(WRAPPER_BG, {
        noOverlay: true,
    }),
    ...generateBackgroundAttributes(COLUMN_BG),

    // range controller
    ...generateResponsiveRangeAttributes(COLUMNS, {
        defaultRange: 3,
    }),
    ...generateResponsiveRangeAttributes(COLUMN_GAP, {
        defaultRange: 10,
    }),
    ...generateResponsiveRangeAttributes(HEADER_META_SPACE, {
        defaultRange: 10,
    }),
    ...generateResponsiveRangeAttributes(FOOTER_META_SPACE, {
        defaultRange: 10,
    }),
    ...generateResponsiveRangeAttributes(THUMBNAIL_IMAGE_SIZE, {
        defaultRange: 250,
    }),
    ...generateResponsiveRangeAttributes(COLUMN_MEDIA_WIDTH, {
        defaultRange: 40,
        defaultUnit: "%",
    }),
    ...generateResponsiveRangeAttributes(FILTER_ITEM_GAP, {
        defaultRange: 10,
    }),
    cover: {
        type: "string",
        default: "",
    },
    ...generateResponsiveRangeAttributes(ICON_SIZE, {
        noUnits: true,
    }),
    ...generateResponsiveRangeAttributes(ICON_SPACE, {
        defaultRange: 8,
        noUnits: true,
    }),
    ...generateResponsiveRangeAttributes(POST_MIN_HEIGHT, {
        defaultRange: 300,
        defaultUnit: "px",
    }),
    ...generateResponsiveRangeAttributes(POST_WIDTH, {
        defaultRange: 100,
        defaultUnit: "%",
    }),
    ...generateResponsiveRangeAttributes(LIST_POST_WIDTH, {
        defaultRange: 100,
        defaultUnit: "%",
    }),

    // Featured Post Typography
    ...generateTypographyAttributes(FEATURED_TITLE_TYPO, {
        defaultFontSize: 32,
    }),
    ...generateTypographyAttributes(FEATURED_EXCERPT_TYPO, {
        defaultFontSize: 18,
    }),
    ...generateTypographyAttributes(FEATURED_META_TYPO, {
        defaultFontSize: 14,
    }),

    // Featured Post Dimensions
    ...generateDimensionsAttributes(FEATURED_POST_PADDING, {
        top: 20,
        bottom: 20,
        right: 20,
        left: 20,
        isLinked: true,
    }),
    ...generateDimensionsAttributes(FEATURED_TITLE_PADDING),
    ...generateDimensionsAttributes(FEATURED_TITLE_MARGIN),
    ...generateDimensionsAttributes(FEATURED_EXCERPT_PADDING),
    ...generateDimensionsAttributes(FEATURED_EXCERPT_MARGIN),
    ...generateDimensionsAttributes(FEATURED_META_PADDING),
    ...generateDimensionsAttributes(FEATURED_META_MARGIN),
    ...generateDimensionsAttributes(FEATURED_AVATAR_RADIUS),

    // Featured Post Border & Shadow
    ...generateBorderShadowAttributes(FEATURED_POST_BORDER),
    ...generateBorderShadowAttributes(FEATURED_TITLE_BORDER),
    ...generateBorderShadowAttributes(FEATURED_EXCERPT_BORDER),
    ...generateBorderShadowAttributes(FEATURED_META_BORDER, {
        defaultBdrColor: "#c3c3c3",
        defaultBdrStyle: "none",
        bdrDefaults: {
            top: 1,
            right: 1,
            bottom: 1,
            left: 1,
        },
        rdsDefaults: {
            top: 3,
            right: 3,
            bottom: 3,
            left: 3,
        },
    }),
};

export default attributes;
