import {
    WRAPPER_BG,
    WRAPPER_MARGIN,
    WRAPPER_PADDING,
    WRAPPER_BORDER_SHADOW,
    tabTitlePadding,
    tabTitleMargin,
    tabTitleBdShadow,
    tabContentMargin,
    tabContentPadding,
    tabContentBdShadow
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
    align: {
        type: "string",
        default: 'wide',
    },
    showDescriptionTab: {
        type: "boolean",
        default: true,
    },
    showAdditionalTab: {
        type: "boolean",
        default: true,
    },
    showReviewsTab: {
        type: "boolean",
        default: true,
    },
    tabTitleType: {
        type: "string",
        default: 'normal',
    },
    tabTitleColor: {
        type: "string",
        default: "var(--eb-global-heading-color)",
    },
    tabTitleBGColor: {
        type: "string",
    },
    tabTitleHvColor: {
        type: "string",
        default: "var(--eb-global-heading-color)",
    },
    tabTitleHvBGColor: {
        type: "string",
    },
    tabTitleActiveColor: {
        type: "string",
        default: "var(--eb-global-heading-color)",
    },
    tabTitleActiveBGColor: {
        type: "string",
    },
    tabTitleActiveHvColor: {
        type: "string",
        default: "var(--eb-global-heading-color)",
    },
    tabTitleActiveHvBGColor: {
        type: "string",
    },
    tabContentColor: {
        type: "string",
        default: "var(--eb-global-text-color)",
    },
    // typography attributes
    ...generateTypographyAttributes(Object.values(typographyObjs)),
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

    ...generateDimensionsAttributes(tabTitlePadding),
    ...generateDimensionsAttributes(tabTitleMargin),
    ...generateBorderShadowAttributes(tabTitleBdShadow),

    ...generateDimensionsAttributes(tabContentMargin),
    ...generateDimensionsAttributes(tabContentPadding),
    ...generateBorderShadowAttributes(tabContentBdShadow),

};

export default attributes;
