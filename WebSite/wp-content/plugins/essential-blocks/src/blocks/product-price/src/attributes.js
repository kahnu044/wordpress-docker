import {
    WRAPPER_BG,
    WRAPPER_MARGIN,
    WRAPPER_PADDING,
    WRAPPER_BORDER_SHADOW,
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

import {
    typoPrefix_original_price,
    typoPrefix_saleprice,
    PREFIX_TYPO,
    SUFFIX_TYPO
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

    pricePlacement: {
        type: "string",
        default: "left",
    },
    priceAlignment: {
        type: "string",
        default: "flex-start",
    },
    priceType: {
        type: "string",
        default: 'regular',
    },
    currencyColor: {
        type: "string",
    },
    regularPriceCurrencyColor: {
        type: "string",
    },
    salePriceCurrencyColor: {
        type: "string",
    },
    currencySize: {
        type: "number",
        default: 25,
    },
    regularPriceCurrencySize: {
        type: "number",
    },
    salePriceCurrencySize: {
        type: "number",
    },
    priceTextColor: {
        type: "string",
    },
    priceTextBGColor: {
        type: "string",
    },
    salePriceTextColor: {
        type: "string",
    },
    salePriceTextBGColor: {
        type: "string",
    },
    showPrefix: {
        type: "boolean",
        default: false,
    },
    showSuffix: {
        type: "boolean",
        default: false,
    },
    prefixType: {
        type: "string",
        default: 'text'
    },
    prefixIcon: {
        type: "string",
        default: 'far fa-check-circle'
    },
    prefixText: {
        type: "string",
        default: 'Limited Time Offer'
    },
    prefixColor: {
        type: "string",
        default: "var(--eb-global-text-color)",
    },
    prefixBGColor: {
        type: "string",
    },
    suffixType: {
        type: "string",
        default: 'text'
    },
    suffixIcon: {
        type: "string",
        default: 'far fa-check-circle'
    },
    suffixText: {
        type: "string",
        default: 'Sales Ongoing '
    },
    suffixColor: {
        type: "string",
        default: "var(--eb-global-text-color)",
    },
    suffixBGColor: {
        type: "string",
    },
    currencyAlign: {
        type: "string",
        default: "baseline",
    },

    // typography attributes
    ...generateTypographyAttributes(typoPrefix_original_price, {
        fontSize: 25,
    }),
    ...generateTypographyAttributes(typoPrefix_saleprice, {
        fontSize: 25,
    }),
    ...generateTypographyAttributes(PREFIX_TYPO, {
        fontSize: 16,
    }),
    ...generateTypographyAttributes(SUFFIX_TYPO, {
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
    ...generateResponsiveRangeAttributes(SUFFIX_ICON_SIZE, {
        defaultRange: 20,
    }),
};

export default attributes;
