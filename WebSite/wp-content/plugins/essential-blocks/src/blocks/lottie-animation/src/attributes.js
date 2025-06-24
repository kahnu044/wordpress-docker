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
    lottieWidth,
    quantityWidth,
    lottieHeight
} from "./constants/constants";

import { TITLE_TYPOGRAPHY } from "./constants/typographyPrefixConstants";

import {
    generateDimensionsAttributes,
    generateTypographyAttributes,
    generateBackgroundAttributes,
    generateBorderShadowAttributes,
    generateResponsiveRangeAttributes,
} from "@essential-blocks/controls";

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

    lottieJSON: {
        type: "object",
    },
    lottieSource: {
        type: 'string',
        default: 'library',
    },
    lottieURl: {
        type: 'string',
        default: '',
    },
    customLottieURL: {
        type: 'string',
        default: '',
    },
    validationMessage: {
        type: 'string',
    },
    loop: {
        type: "boolean",
        default: true,
    },
    loopCount: {
        type: "number",
        default: 0,
    },
    delay: {
        type: "number",
        default: 0,
    },
    speed: {
        type: "number",
        default: 1,
    },
    startSegment: {
        type: "number",
        default: 0,
    },
    endSegment: {
        type: "number",
        default: 100,
    },
    scrollBottomPoint: {
        type: "number",
        default: 0,
    },
    scrollTopPoint: {
        type: "number",
        default: 0,
    },
    alignment: {
        type: 'string',
        default: 'center',
    },
    playOn: {
        type: 'string',
        default: 'none',
    },
    reverse: {
        type: "boolean",
        default: false,
    },
    enableTitle: {
        type: "boolean",
        default: false,
    },
    captionType: {
        type: 'string',
        default: "file-caption",
    },
    lottieMediaCaption: {
        type: 'string',
    },
    lottieMediaTitle: {
        type: 'string',
    },
    lottieTitle: {
        type: 'string',
    },
    titleColor: {
        type: 'string',
        default: "var(--eb-global-heading-color)",
    },
    titleBGColor: {
        type: 'string',
    },

    version: {
        type: 'string',
    },

    ...generateTypographyAttributes(TITLE_TYPOGRAPHY),

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


    ...generateResponsiveRangeAttributes(lottieWidth, {
        defaultRange: 600,
        defaultRangeTAB: 600,
        defaultRangeMOB: 300,
    }),
    ...generateResponsiveRangeAttributes(lottieHeight, {
        defaultRange: 600,
        defaultRangeTAB: 600,
        defaultRangeMOB: 300,
        defaultIsAuto: false,
    }),
};

export default attributes;
