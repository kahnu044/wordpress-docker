import {
    WRAPPER_BG,
    WRAPPER_MARGIN,
    WRAPPER_PADDING,
    WRAPPER_BORDER_SHADOW,
    PREFIX_ICON_SIZE,
    SEPARATOR_ICON_SIZE,
    BREADCRUMB_BORDER_SHADOW,
    BREADCRUMB_PADDING
} from "./constants/constants";

import {
    generateDimensionsAttributes,
    generateTypographyAttributes,
    generateBackgroundAttributes,
    generateBorderShadowAttributes,
    generateResponsiveRangeAttributes,
} from "@essential-blocks/controls";

import {
    PREFIX_TYPO,
    BREADCRUMB_TYPO,
    SEPARATOR_TYPO,
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
    breadcrumbAlign: {
        type: "string",
        default: "flex-start",
    },
    breadcrumbType: {
        type: "string",
        default: 'normal',
    },
    breadcrumbColor: {
        type: "string",
        default: "var(--eb-global-text-color)",
    },
    breadcrumbHvColor: {
        type: "string",
        default: "var(--eb-global-link-color)",
    },
    breadcrumbCurrentColor: {
        type: "string",
        default: "var(--eb-global-heading-color)",
    },
    breadcrumbCurrentHvColor: {
        type: "string",
        default: "var(--eb-global-link-color)",
    },
    showPrefix: {
        type: "boolean",
        default: false,
    },
    prefixType: {
        type: "string",
        default: 'text'
    },
    prefixIcon: {
        type: "string",
        default: 'fas fa-house-chimney-window'
    },
    prefixText: {
        type: "string",
        default: 'Browse:'
    },
    prefixColor: {
        type: "string",
        default: "var(--eb-global-text-color)",
    },
    showHomePage: {
        type: "boolean",
        default: true,
    },
    homePageLabel: {
        type: "string",
        default: "Home",
    },
    separatorType: {
        type: "string",
        default: "text",
    },
    separatorIcon: {
        type: "string",
        default: 'fas fa-angle-right'
    },
    separatorText: {
        type: "string",
        default: '/'
    },
    separatorColor: {
        type: "string",
        default: "var(--eb-global-text-color)",
    },
    breadcrumbGap: {
        type: "number",
        default: 6,
    },
    prefixGap: {
        type: "number",
        default: 10,
    },

    // typography attributes
    ...generateTypographyAttributes(PREFIX_TYPO, {
        fontSize: 16,
    }),
    ...generateTypographyAttributes(BREADCRUMB_TYPO, {
        fontSize: 16,
    }),
    ...generateTypographyAttributes(SEPARATOR_TYPO, {
        fontSize: 16,
    }),

    // margin padding attributes ⬇
    ...generateDimensionsAttributes(WRAPPER_MARGIN),
    ...generateDimensionsAttributes(WRAPPER_PADDING),

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

    // background attributes ⬇
    ...generateBackgroundAttributes(WRAPPER_BG, {
        defaultBgGradient: "linear-gradient(45deg,#ffffff,#ffffff)",
    }),

    ...generateResponsiveRangeAttributes(PREFIX_ICON_SIZE, {
        defaultRange: 20,
    }),
    ...generateResponsiveRangeAttributes(SEPARATOR_ICON_SIZE, {
        defaultRange: 14,
    }),

    ...generateBorderShadowAttributes(BREADCRUMB_BORDER_SHADOW),
    ...generateDimensionsAttributes(BREADCRUMB_PADDING),
};

export default attributes;
