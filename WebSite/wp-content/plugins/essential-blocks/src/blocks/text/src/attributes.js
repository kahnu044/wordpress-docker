import {
    WRAPPER_BG,
    WRAPPER_MARGIN,
    WRAPPER_PADDING,
    WRAPPER_BORDER_SHADOW,
    COLUMNCOUNT,
    COLUMNGAP,
    COLUMNWIDTH,
    COLUMNRULEWIDTH
} from "./constants/constants";

import {
    generateDimensionsAttributes,
    generateTypographyAttributes,
    generateBackgroundAttributes,
    generateBorderShadowAttributes,
    generateResponsiveRangeAttributes
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
    tagName: {
        type: "string",
        default: "p",
    },
    text: {
        type: "string",
    },
    color: {
        type: "string",
        default: "var(--eb-global-text-color)",
    },
    hoverColor: {
        type: "string",
    },
    align: {
        type: "string",
        default: "left",
    },
    source: {
        type: "string",
        default: "custom"
    },
    columnRuleColor: {
        type: "string",
        default: "var(--eb-global-text-color)"
    },
    columnRuleStyle: {
        type: "string",
        default: "default"
    },

    // typography attributes ⬇
    ...generateTypographyAttributes(Object.values(typographyObjs)),

    // margin padding attributes ⬇
    ...generateDimensionsAttributes(WRAPPER_MARGIN, {
        top: 0,
        bottom: 15,
        right: 0,
        left: 0,
        isLinked: false,
    }),
    ...generateDimensionsAttributes(WRAPPER_PADDING),
    //Range Control
    ...generateResponsiveRangeAttributes(COLUMNCOUNT, {
        defaultRange: 1,
    }),
    ...generateResponsiveRangeAttributes(COLUMNGAP, {
        defaultRange: 15,
    }),
    ...generateResponsiveRangeAttributes(COLUMNWIDTH),
    ...generateResponsiveRangeAttributes(COLUMNRULEWIDTH),

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
    })
};

export default attributes;
