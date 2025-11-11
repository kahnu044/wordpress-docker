import {
    WRAPPER_MARGIN,
    WRAPPER_PADDING,
    WRAPPER_BORDER_SHADOW,
    WRAPPER_BG,
    META_ALIGNMENT,
    METAGAP,
    AUTHOR_PICTURE_BORDER,
    AUTHOR_PICTURE_SIZE,
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
    authorIcon: {
        type: "string",
        default: 'far fa-circle-user',
    },
    dateIcon: {
        type: "string",
        default: 'far fa-calendar-days',
    },
    skuIcon: {
        type: "string",
        default: 'fas fa-barcode',
    },
    showMetaIcon: {
        type: 'boolean',
        default: true,
    },
    metaIconColor: {
        type: "string",
        default: ""
    },
    metaIconSize: {
        type: "number",
        default: 20,
    },
    hasLoopBuilderDefaults: {
        type: "boolean",
        default: false,
    },
    showAuthorPicture: {
        type: "boolean",
        default: false,
    },
    authorPictureLink: {
        type: "boolean",
        default: true,
    },
    authorPictureBorderRadius: {
        type: "number",
        default: 50,
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

    // author picture border attributes ⬇
    ...generateBorderShadowAttributes(AUTHOR_PICTURE_BORDER, {
        noShadow: true,
    }),

    // author picture size attributes ⬇
    ...generateResponsiveRangeAttributes(AUTHOR_PICTURE_SIZE, {
        defaultRange: 40,
    }),
};

export default attributes;
