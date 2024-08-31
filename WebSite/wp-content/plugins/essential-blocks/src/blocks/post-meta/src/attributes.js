import {
    WRAPPER_MARGIN,
    WRAPPER_PADDING,
    WRAPPER_BORDER_SHADOW,
    WRAPPER_BG,
    META_ALIGNMENT,
    METAGAP,
} from "./constants/constants";

import {
    generateDimensionsAttributes,
    generateTypographyAttributes,
    generateBackgroundAttributes,
    generateBorderShadowAttributes,
    generateResponsiveAlignAttributes,
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
    metaLabelColor: {
        type: "string",
        default: ""
    },
    metaValueColor: {
        type: "string",
        default: ""
    },
    metaDisplay: {
        type: "string",
        default: "inline",
    },
    showAuthor: {
        type: 'boolean',
        default: true,
    },
    showProductSku: {
        type: 'boolean',
        default: true,
    },
    authorLabel: {
        type: "string",
        default: "Author: ",
    },
    showDate: {
        type: 'boolean',
        default: true,
    },
    dateLabel: {
        type: "string",
        default: "Published Date: ",
    },
    productSkuLabel: {
        type: "string",
        default: "SKU: ",
    },
    contentLists: {
        type: "array",
        default: ["author", "date", "product_sku"],
    },
    enableContents: {
        type: "array",
        default: ["author", "date", "product_sku"],
    },
    type: {
        type: "string",
        default: null
    },
    // typography attributes ⬇
    ...generateTypographyAttributes(Object.values(typographyObjs)),

    // margin padding attributes ⬇
    ...generateDimensionsAttributes(WRAPPER_MARGIN),
    ...generateDimensionsAttributes(WRAPPER_PADDING),

    // border shadow attributes ⬇
    ...generateBorderShadowAttributes(WRAPPER_BORDER_SHADOW, {
        // noShadow: true,
        // noBorder: true,
    }),

    // background attributes ⬇
    ...generateBackgroundAttributes(WRAPPER_BG, {
        noOverlay: true,
    }),
    ...generateResponsiveAlignAttributes(META_ALIGNMENT, {
        defaultAlign: "flex-start",
        defaultTabAlign: "flex-start",
        defaultMobileAlign: "flext-start",
    }),
    ...generateResponsiveRangeAttributes(METAGAP, {
        defaultRange: 10,
    }),
};

export default attributes;
