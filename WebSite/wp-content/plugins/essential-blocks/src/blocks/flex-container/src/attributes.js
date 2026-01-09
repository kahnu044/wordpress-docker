import {
    generateResponsiveRangeAttributes,
    generateDimensionsAttributes,
    generateBackgroundAttributes,
    generateBorderShadowAttributes,
    generateResponsiveAlignAttributes,
} from "@essential-blocks/controls";

import {
    CONTAINER_CUSTOM_WIDTH,
    CONTENT_WIDTH,
    CONTENT_HEIGHT,
    FLEX_ROW_GAP,
    FLEX_COLUMN_GAP,
    WRAPPER_BACKGROUND,
    WRAPPER_BORDER,
    WRAPPER_MARGIN,
    WRAPPER_PADDING,
    FLEX_DIRECTION_CONTROL,
    JUSTIFY_CONTENT_CONTROL,
    ALIGN_ITEM_CONTROL,
    FLEX_WRAP_CONTROL,
} from "./constants";

const attributes = {
    // responsive control attributes ⬇
    resOption: {
        type: "string",
        default: "Desktop",
    },
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

    // Container Alignment
    containerWidth: {
        type: "string",
        default: undefined,
    },
    contentWidth: {
        type: "string",
        default: "full",
    },
    containerAlign: {
        type: "string",
        default: "center",
    },
    isContainerCustomWidth: {
        type: "boolean",
        default: false,
    },
    useCustomHeight: {
        type: "boolean",
        default: false,
    },

    // Class Hook
    classHook: {
        type: "string",
    },
    htmlTag: {
        type: "string",
        default: "div",
    },
    overflow: {
        type: "string",
        default: "visible",
    },
    containerLayout: {
        type: "string",
        default: "",
    },

    // responsive range controller
    ...generateResponsiveRangeAttributes(CONTAINER_CUSTOM_WIDTH, {
        defaultUnit: "%",
    }),
    ...generateResponsiveRangeAttributes(CONTENT_WIDTH),
    ...generateResponsiveRangeAttributes(CONTENT_HEIGHT),
    ...generateResponsiveRangeAttributes(FLEX_ROW_GAP, {
        defaultRange: 10,
        defaultUnit: "px",
    }),
    ...generateResponsiveRangeAttributes(FLEX_COLUMN_GAP, {
        defaultRange: 10,
        defaultUnit: "px",
    }),

    // background control
    ...generateBackgroundAttributes(WRAPPER_BACKGROUND),

    // border shadow control
    ...generateBorderShadowAttributes(WRAPPER_BORDER),

    // dimension control
    ...generateDimensionsAttributes(WRAPPER_MARGIN),
    ...generateDimensionsAttributes(WRAPPER_PADDING, {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10,
        isLinked: true,
    }),

    // Responsive Alignment attributes ⬇
    ...generateResponsiveAlignAttributes(FLEX_DIRECTION_CONTROL, {
        defaultAlign: "row",
        defaultTabAlign: "row",
        defaultMobileAlign: "column",
    }),
    ...generateResponsiveAlignAttributes(JUSTIFY_CONTENT_CONTROL, {
        defaultAlign: "center",
        defaultTabAlign: "center",
        defaultMobileAlign: "center",
    }),
    ...generateResponsiveAlignAttributes(ALIGN_ITEM_CONTROL, {
        defaultAlign: "center",
        defaultTabAlign: "center",
        defaultMobileAlign: "stretch",
    }),
    ...generateResponsiveAlignAttributes(FLEX_WRAP_CONTROL, {
        defaultAlign: "nowrap",
        defaultTabAlign: "nowrap",
        defaultMobileAlign: "wrap",
    }),
};

export default attributes;
