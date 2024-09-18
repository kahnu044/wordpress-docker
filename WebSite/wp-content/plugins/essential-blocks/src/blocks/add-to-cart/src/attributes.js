import {
    WRAPPER_BG,
    WRAPPER_MARGIN,
    WRAPPER_PADDING,
    WRAPPER_BORDER_SHADOW,

    BUTTON_BORDER,
    BUTTON_PADDING,
    QUANTITY_BORDER,
    QUANTITY_PADDING,
    VARIABLE_FIELD_BORDER,
    VARIABLE_FIELD_PADDING,
} from "./constants/constants";

import {
    generateDimensionsAttributes,
    generateTypographyAttributes,
    generateBackgroundAttributes,
    generateBorderShadowAttributes,
    generateResponsiveRangeAttributes,
} from "@essential-blocks/controls";

import {
    btnTypo, quantityTypo, variableLabelTypo, variableFieldTypo,
    groupedNameTypo,
    regularPriceTypo,
    salePriceTypo,
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
    productType: {
        type: "string",
        default: "simple",
    },
    showQuantity: {
        type: "boolean",
        default: true,
    },

    alignment: {
        type: "string",
        default: "flex-start",
    },

    cartBtnText: {
        type: "string",
        default: "Add to cart",
    },
    quantityColor: {
        type: "string",
        default: "var(--eb-global-text-color)",
    },
    quantityBGColor: {
        type: "string",
    },
    btnColor: {
        type: "string",
        default: "var(--eb-global-button-text-color)",
    },
    btnBGColor: {
        type: "string",
        default: "var(--eb-global-button-background-color)",
    },
    hoverBtnBGColor: {
        type: "string",
        default: "var(--eb-global-button-background-color)",
    },
    hoverBtnColor: {
        type: "string",
        default: "var(--eb-global-button-text-color)",
    },

    variableLabelColor: {
        type: "string",
    },
    variableFieldColor: {
        type: "string",
    },
    variableFieldBgColor: {
        type: "string",
    },
    priceType: {
        type: "string",
        default: "regular"
    },
    regularPriceColor: {
        type: "string",
    },

    // typography attributes
    ...generateTypographyAttributes(btnTypo),
    ...generateTypographyAttributes(quantityTypo),
    ...generateTypographyAttributes(variableLabelTypo),
    ...generateTypographyAttributes(variableFieldTypo),
    ...generateTypographyAttributes(groupedNameTypo),
    ...generateTypographyAttributes(salePriceTypo),
    ...generateTypographyAttributes(regularPriceTypo),

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
    ...generateBackgroundAttributes(WRAPPER_BG),

    ...generateBorderShadowAttributes(BUTTON_BORDER, {
        rdsDefaults: {
            top: 5,
            bottom: 5,
            right: 5,
            left: 5,
        },
    }),
    ...generateDimensionsAttributes(BUTTON_PADDING, {
        top: 10,
        bottom: 10,
        right: 15,
        left: 15,
        isLinked: false,
    }),
    ...generateBorderShadowAttributes(QUANTITY_BORDER, {
        defaultBdrColor: "#000",
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
    }),
    ...generateDimensionsAttributes(QUANTITY_PADDING, {
        top: 12,
        bottom: 12,
        right: 15,
        left: 15,
        isLinked: false,
    }),
    ...generateBorderShadowAttributes(VARIABLE_FIELD_BORDER, {
        rdsDefaults: {
            top: 5,
            bottom: 5,
            right: 5,
            left: 5,
        },
    }),
    ...generateDimensionsAttributes(VARIABLE_FIELD_PADDING, {
        top: 10,
        bottom: 10,
        right: 30,
        left: 15,
        isLinked: false,
    }),

};

export default attributes;
