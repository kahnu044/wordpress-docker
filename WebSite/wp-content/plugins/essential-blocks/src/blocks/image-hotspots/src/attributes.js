import {
    WRAPPER_MARGIN,
    WRAPPER_PADDING,
    HOTSPOT_PADDING,
    TOOLTIP_PADDING,
    WRAPPER_BG,
    HOTSPOT_BG,
    TOOLTIP_BG,
    WRAPPER_BORDER_SHADOW,
    HOTSPOT_BORDER_SHADOW,
    TOOLTIP_BORDER_SHADOW,
    TOOLTIP_TITLE_TYPOGRAPHY,
    TOOLTIP_CONTENT_TYPOGRAPHY,
    HOTSPOT_TEXT_TYPOGRAPHY,
    HOTSPOT_SIZE_RANGE,
    TOOLTIP_WIDTH_RANGE,
    IMAGE_ALIGNMENT,
    HOTSPOT_ICON_SIZE,
    HOTSPOT_NUMBER_SIZE,
    HOTSPOT_DOT_WIDTH,
    HOTSPOT_DOT_HEIGHT,
    TOOLTIP_OFFSET,
    TOOLTIP_ARROW_SIZE,
    IMAGE_WIDTH,
    HOTSPOT_ICON_WIDTH,
} from "./constants";


import {
    generateDimensionsAttributes,
    generateTypographyAttributes,
    generateBackgroundAttributes,
    generateBorderShadowAttributes,
    generateResponsiveRangeAttributes,
    ImageComponent,
} from "@essential-blocks/controls";

const attributes = {
    // Essential attributes for responsive options and asset generation
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
    classHook: {
        type: "string",
    },

    // Image attributes from ImageComponent
    ...ImageComponent.addAttributes({
        hasBorder: true,
        // border: {
        //     key: IMAGE_BORDER_SHADOW,
        // },
        hasPadding: true,
        // padding: {
        //     key: IMAGE_PADDING,
        // },
        hasMargin: true,
        // margin: {
        //     key: IMAGE_MARGIN,
        // },
        hasWidth: true,
        width: {
            key: IMAGE_WIDTH,
            default: {
                defaultRange: 100,
                defaultUnit: "%",
            },
        },
        hasHeight: true,
        // height: {
        //     key: IMAGE_HEIGHT_RANGE,
        // },
        hasRadius: true,
        useImageAlign: true,
        imageAlign: {
            key: IMAGE_ALIGNMENT,
            default: {
                defaultAlign: "center",
                defaultTabAlign: "center",
                defaultMobileAlign: "center",
            },
        },

    }),

    // Override imageUrl with default value
    imageUrl: {
        type: "string",
        default: `${EssentialBlocksLocalize?.image_url}/image-placeholder.jpg`,
    },

    // Hotspots array
    hotspots: {
        type: "array",
        default: [],
    },

    // Global hotspot settings
    globalHotspotSize: {
        type: "string",
        default: "medium",
    },
    globalAnimation: {
        type: "string",
        default: "none",
    },

    globalTooltipTrigger: {
        type: "string",
        default: "hover",
    },
    globalTooltipPosition: {
        type: "string",
        default: "top",
    },
    globalTooltipAnimation: {
        type: "string",
        default: "none",
    },
    tooltipShowArrow: {
        type: "boolean",
        default: true,
    },
    alwaysVisibleTooltip: {
        type: "boolean",
        default: false,
    },
    globalTooltipAlignment: {
        type: "string",
        default: "center",
    },
    globalTooltipContentGap: {
        type: "number",
        default: 10,
    },
    globalTooltipIconSize: {
        type: "number",
        default: 30,
    },
    animationDuration: {
        type: "number",
        default: 1,
    },
    animationDelay: {
        type: "number",
        default: 0,
    },

    // Colors
    globalMarkerColor: {
        type: "string",
        default: "#ffffff",
    },
    globalMarkerBgColor: {
        type: "string",
        default: "#007cba",
    },
    glowColor: {
        type: "string",
        default: "#007cba",
    },
    globalTooltipBgColor: {
        type: "string",
        default: "#333333",
    },
    globalTooltipTitleColor: {
        type: "string",
        default: "#ffffff",
    },
    globalTooltipContentColor: {
        type: "string",
        default: "#ffffff",
    },
    globalTooltipIconColor: {
        type: "string",
        default: "#ffffff",
    },

    // Responsive range attributes
    ...generateResponsiveRangeAttributes(HOTSPOT_SIZE_RANGE, {
        defaultRange: 40,
        defaultUnit: "px",
    }),
    ...generateResponsiveRangeAttributes(TOOLTIP_WIDTH_RANGE, {
        defaultRange: 200,
        defaultUnit: "px",
    }),

    // Dimensions attributes
    ...generateDimensionsAttributes(WRAPPER_MARGIN),
    ...generateDimensionsAttributes(WRAPPER_PADDING),
    // ...generateDimensionsAttributes(HOTSPOT_MARGIN),
    ...generateDimensionsAttributes(HOTSPOT_PADDING, {
        top: 10,
        bottom: 10,
        right: 10,
        left: 10,
        isLinked: true,
    }),
    ...generateDimensionsAttributes(TOOLTIP_PADDING, {
        top: 10,
        bottom: 10,
        right: 10,
        left: 10,
        isLinked: true,
    }),

    // Background attributes
    ...generateBackgroundAttributes(WRAPPER_BG),
    ...generateBackgroundAttributes(HOTSPOT_BG),
    ...generateBackgroundAttributes(TOOLTIP_BG),

    // Border shadow attributes
    ...generateBorderShadowAttributes(WRAPPER_BORDER_SHADOW),
    ...generateBorderShadowAttributes(HOTSPOT_BORDER_SHADOW, {
        rdsDefaults: {
            top: 5,
            bottom: 5,
            right: 5,
            left: 5,
        },
    }),
    ...generateDimensionsAttributes(TOOLTIP_BORDER_SHADOW, {
        top: 4,
        bottom: 4,
        right: 4,
        left: 4,
        isLinked: true,
    }),

    // Typography attributes
    ...generateTypographyAttributes(TOOLTIP_TITLE_TYPOGRAPHY, {
        fontSize: 18,
    }),
    ...generateTypographyAttributes(TOOLTIP_CONTENT_TYPOGRAPHY, {
        fontSize: 14,
    }),
    ...generateResponsiveRangeAttributes(HOTSPOT_ICON_SIZE, {
        defaultRange: 20,
        defaultUnit: "px",
    }),
    ...generateResponsiveRangeAttributes(HOTSPOT_NUMBER_SIZE, {
        defaultRange: 16,
        defaultUnit: "px",
    }),
    ...generateResponsiveRangeAttributes(HOTSPOT_DOT_WIDTH, {
        defaultRange: 20,
        defaultUnit: "px",
    }),
    ...generateResponsiveRangeAttributes(HOTSPOT_DOT_HEIGHT, {
        defaultRange: 20,
        defaultUnit: "px",
    }),

    // Typography attributes for hotspot text
    ...generateTypographyAttributes(HOTSPOT_TEXT_TYPOGRAPHY, {
        fontSize: 14,
    }),

    // Tooltip offset attributes
    ...generateResponsiveRangeAttributes(TOOLTIP_OFFSET, {
        defaultRange: 10,
        defaultUnit: "px",
    }),
    ...generateResponsiveRangeAttributes(TOOLTIP_ARROW_SIZE, {
        defaultRange: 8,
        defaultUnit: "px",
    }),
    ...generateResponsiveRangeAttributes(HOTSPOT_ICON_WIDTH, {
        defaultRange: 40,
        defaultUnit: "px",
    }),
};

export default attributes;
