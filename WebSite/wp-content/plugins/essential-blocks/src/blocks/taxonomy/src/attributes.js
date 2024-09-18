import {
    WRAPPER_BG,
    WRAPPER_MARGIN,
    WRAPPER_PADDING,
    WRAPPER_BORDER_SHADOW,
    TAXONOMIES_BORDER_SHADOW,
    TAXONOMIES_GAP,
    TAXONOMIES_MARGIN,
    TAXONOMIES_PADDING,
    PREFIX_ICON_SIZE,
    SUFFIX_ICON_SIZE,
} from "./constants/constants";

import {
    generateDimensionsAttributes,
    generateTypographyAttributes,
    generateBackgroundAttributes,
    generateBorderShadowAttributes,
    generateResponsiveRangeAttributes,
} from "@essential-blocks/controls";

import * as typographyObjs from "./constants/typographyPrefixConstants";

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

    prefixType: {
        type: "string",
        default: 'none'
    },
    prefixIcon: {
        type: "string",
        default: 'fas fa-list'
    },
    prefixText: {
        type: "string",
        default: 'Prefix Text'
    },
    prefixColor: {
        type: "string",
        default: '',
    },
    suffixType: {
        type: "string",
        default: 'none'
    },
    suffixIcon: {
        type: "string",
        default: 'fas fa-list'
    },
    suffixText: {
        type: "string",
        default: 'Suffix Text'
    },
    suffixColor: {
        type: "string",
        default: '',
    },
    currentPostType: {
        type: "string",
        // default: "page",
    },
    taxonomiesQuery: {
        type: "object",
        default: { per_page: -1, }
    },
    taxonomyLimit: {
        type: "number",
        default: 1
    },
    source: {
        type: "string",
        default: 'current-post',
    },
    displayAsDropdown: {
        type: "boolean",
        default: false
    },
    showHierarchy: {
        type: "boolean",
        default: false
    },
    showPostCounts: {
        type: "boolean",
        default: false
    },
    showEmpty: {
        type: "boolean",
        default: false
    },
    showSeparator: {
        type: "boolean",
        default: false
    },
    separator: {
        type: "string",
        default: "|",
    },
    selectedTaxonomy: {
        type: "string",
    },
    selectedTaxonomyItems: {
        type: "string",
        default: '[{"value":"all","label":"All"}]',
    },

    taxonomiesStyle: {
        type: "string",
        default: 'normal',
    },
    taxonomiesBgColor: {
        type: "string",
        default: "var(--eb-global-button-background-color)",
    },
    taxonomiesTextColor: {
        type: "string",
        default: "var(--eb-global-button-text-color)",
    },
    taxonomiesHoverBgColor: {
        type: "string",
        default: "var(--eb-global-primary-color)",
    },
    taxonomiesHoverTextColor: {
        type: "string",
        default: "var(--eb-global-button-text-color)",
    },
    displayStyle: {
        type: "string",
        default: "display-inline",
    },
    align: {
        type: "string",
        default: "flex-start",
    },

    // typography attributes ⬇
    ...generateTypographyAttributes(Object.values(typographyObjs)),

    // margin padding attributes ⬇
    ...generateDimensionsAttributes(WRAPPER_MARGIN),
    ...generateDimensionsAttributes(WRAPPER_PADDING),
    ...generateDimensionsAttributes(TAXONOMIES_MARGIN),
    ...generateDimensionsAttributes(TAXONOMIES_PADDING, {
        top: 2,
        bottom: 2,
        left: 4,
        right: 4,
        isLinked: false,
    }),

    // border shadow attributes ⬇
    ...generateBorderShadowAttributes(WRAPPER_BORDER_SHADOW, {
        bdrDefaults: {
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
        },
        // noShadow: true,
        // noBorder: true,
    }),
    ...generateBorderShadowAttributes(TAXONOMIES_BORDER_SHADOW, {
        rdsDefaults: {
            top: 3,
            right: 3,
            bottom: 3,
            left: 3,
        },
    }
    ),

    // background attributes ⬇
    ...generateBackgroundAttributes(WRAPPER_BG, {
        defaultBgGradient: "linear-gradient(45deg,#ffffff,#ffffff)",
    }),
    // range controller Separator Icon Size
    ...generateResponsiveRangeAttributes(TAXONOMIES_GAP, {
        defaultRange: 5,
    }),
    ...generateResponsiveRangeAttributes(PREFIX_ICON_SIZE, {
        defaultRange: 30,
    }),
    ...generateResponsiveRangeAttributes(SUFFIX_ICON_SIZE, {
        defaultRange: 30,
    }),
};

export default attributes;
