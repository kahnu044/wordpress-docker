import {
    WRAPPER_MARGIN,
    WRAPPER_PADDING,
    WRAPPER_BORDER_SHADOW,
    WRAPPER_BG,
    COLUMN_PADDING,
    COLUMN_BORDER_SHADOW,
    THUMBNAIL_IMAGE_SIZE,
    THUMBNAIL_BORDER_RADIUS,
    THUMBNAIL_MARGIN,
    TITLE_MARGIN,
    CONTENT_MARGIN,
    READMORE_MARGIN,
    READMORE_PADDING,
    ICON_META_SPACE,
    META_GAP,
    TIMELINE_ICON_SIZE,
    ICON_CONTENT_GAP,
    BTN_BORDER_RADIUS,
    ITEM_ICON_IMAGE_SIZE,
    BTN_BORDER_SHADOW,
    ITEM_ICON_SIZE,
    BULLET_SIZE,
    BULLET_BORDER_SHADOW,
    CARD_GAP,
    SUBHEADING_BORDER_SHADOW,
    LABEL_GAP,
    LABEL_BORDER_SHADOW,
    LABEL_BOTTOM_SPACE,
    ICON_WIDTH,
    LINE_CARD_GAP,
    ITEM_ICON_PADDING,
    MEDIA_BORDER_SHADOW,
    TIMELINE_IMAGE_WIDTH,
    TIMELINE_IMAGE_HEIGHT,
    TIMELINE_IMAGE_BORDER,
    TIMELINE_IMAGE_PADDING,
    TIMELINE_IMAGE_MARGIN,
    TIMELINE_IMAGE_RADIUS,
    TIMELINE_ICON_WIDTH
} from "./constants/constants";

import {
    generateDimensionsAttributes,
    generateTypographyAttributes,
    generateBackgroundAttributes,
    generateBorderShadowAttributes,
    generateResponsiveRangeAttributes,
    ImageComponent,
} from "@essential-blocks/controls";

import {
    EBCT_TITLE_TYPOGRAPHY,
    EBCT_CONTENT_TYPOGRAPHY,
    EBCT_READMORE_TYPOGRAPHY,
    EBCT_META_TYPOGRAPHY,
    EBCT_SUBHEADING_TYPOGRAPHY,
    LABEL_TYPOGRAPHY,
    ITEM_ICON_TYPOGRAPHY
} from "./constants/typographyPrefixConstants";
import { TAB } from "@wordpress/keycodes";

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

    // Timeline specific attributes
    // contentSource: {
    //     type: "string",
    //     default: "custom-content",
    // },
    mediaType: {
        type: "string",
        default: "icon",
    },
    timelineIcon: {
        type: "string",
        default: "far fa-circle-dot",
    },
    timelines: {
        type: "array",
        default: [],
    },
    useInlineDesign: {
        type: "boolean",
        default: false,
    },
    timelineLayout: {
        type: "string",
        default: "left-layout",
    },
    timelineLineStyle: {
        type: "string",
        default: "one",
    },
    columnTextAlign: {
        type: "string",
        default: "left",
    },
    columnBackgroundColor: {
        type: "string",
        default: "#fff",
    },
    showTitle: {
        type: "boolean",
        default: true,
    },
    titleColor: {
        type: "string",
        default: "var(--eb-global-heading-color)",
    },
    titleColorStyle: {
        type: "string",
        default: "normal",
    },
    titleLength: {
        type: "number",
    },
    titleTextAlign: {
        type: "string",
        default: "left",
    },
    titleTag: {
        type: "string",
        default: "h2",
    },
    showContent: {
        type: "boolean",
        default: true,
    },
    contentColor: {
        type: "string",
        default: "var(--eb-global-text-color)",
    },
    columnBgColor: {
        type: "string",
        default: "#ffffff",
    },
    columnBgHvColor: {
        type: "string",
        default: "#ffffff",
    },
    contentLength: {
        type: "number",
        default: 14,
    },
    expansionIndicator: {
        type: "string",
        default: " ...",
    },
    showReadMore: {
        type: "boolean",
        default: false,
    },
    readmoreText: {
        type: "string",
        default: "Read More",
    },
    readmoreColor: {
        type: "string",
        default: "#323232",
    },
    readmoreBGColor: {
        type: "string",
    },
    readmoreHoverColor: {
        type: "string",
        default: "#323232",
    },
    readmoreBGHoverColor: {
        type: "string",
    },
    readmoreColorType: {
        type: "string",
        default: "normal",
    },
    enableMeta: {
        type: "boolean",
        default: true,
    },
    showDate: {
        type: "boolean",
        default: true,
    },
    showSubheading: {
        type: "boolean",
        default: false,
    },
    dateColor: {
        type: "string",
        default: "#000",
    },
    SubheadingColor: {
        type: "string",
        default: "#000000",
    },
    itemIconColor: {
        type: "string",
        default: "#000",
    },
    connectorColor: {
        type: "string",
        default: "#DCDCDC",
    },
    connectorWidth: {
        type: "number",
        default: 1,
    },
    timelineIconColor: {
        type: "string",
        default: "#DCDCDC",
    },
    timelineIconBgColor: {
        type: "string",
        default: "#fff",
    },
    timelineIconBorderColor: {
        type: "string",
        default: "var(--eb-global-secondary-color)",
    },
    timelineIconBorderHvColor: {
        type: "string",
        default: "var(--eb-global-tertiary-color)",
    },
    cover: {
        type: "string",
        default: "",
    },
    showBlockContent: {
        type: "boolean",
        default: true,
    },

    // Label attributes
    enableLabels: {
        type: "boolean",
        default: false,
    },
    timelineLabels: {
        type: "array",
        default: [],
    },
    progressLineColor: {
        type: "string",
        default: "#323232",
    },
    timelineIconCompleteColor: {
        type: "string",
        default: "#323232",
    },
    timelineCompleteIcon: {
        type: "string",
        default: "far fa-circle-check",
    },
    bulletColor: {
        type: "string",
        default: "var(--eb-global-tertiary-color)",
    },
    bulletCompleteColor: {
        type: "string",
        default: "var(--eb-global-heading-color)",
    },

    timelineVerticalPreset: {
        type: "string",
        default: "preset-1",
    },

    SubheadingBGColor: {
        type: "string",
        default: "#F9F9F9",
    },
    bulletCompleteBorderColor: {
        type: "string",
    },
    timelineIconBGCompleteColor: {
        type: "string",
    },
    itemIconBgColor: {
        type: "string",
        default: "#fff",
    },

    // Responsive Range Attributes
    ...generateResponsiveRangeAttributes(CARD_GAP, {
        defaultRange: 30,
        defaultUnit: "px",
    }),

    // typography attributes ⬇
    ...generateTypographyAttributes(EBCT_TITLE_TYPOGRAPHY, {
        fontSize: 24,
        fontWeight: 600,
    }),
    ...generateTypographyAttributes(EBCT_CONTENT_TYPOGRAPHY, {
        fontSize: 16,
    }),
    ...generateTypographyAttributes(EBCT_READMORE_TYPOGRAPHY, {
        fontSize: 13,
    }),
    ...generateTypographyAttributes(EBCT_META_TYPOGRAPHY, {
        fontSize: 16,
        fontWeight: 500,
    }),
    ...generateTypographyAttributes(EBCT_SUBHEADING_TYPOGRAPHY, {
        fontSize: 12,
    }),
    ...generateTypographyAttributes(LABEL_TYPOGRAPHY, {
        fontSize: 12,
    }),
    ...generateTypographyAttributes(ITEM_ICON_TYPOGRAPHY, {
        fontSize: 16,
    }),

    // margin padding attributes ⬇
    ...generateDimensionsAttributes(WRAPPER_MARGIN),
    ...generateDimensionsAttributes(WRAPPER_PADDING),
    ...generateDimensionsAttributes(COLUMN_PADDING, {
        top: 20,
        bottom: 20,
        right: 20,
        left: 20,
        isLinked: false,
    }),
    ...generateDimensionsAttributes(TITLE_MARGIN, {
        top: 0,
        bottom: 10,
        right: 0,
        left: 0,
        isLinked: false,
    }),
    ...generateDimensionsAttributes(CONTENT_MARGIN, {
        top: 0,
        bottom: 10,
        right: 0,
        left: 0,
        isLinked: false,
    }),
    ...generateDimensionsAttributes(READMORE_MARGIN),
    ...generateDimensionsAttributes(READMORE_PADDING),
    ...generateDimensionsAttributes(THUMBNAIL_MARGIN, {
        top: 0,
        bottom: 15,
        right: 0,
        left: 0,
        isLinked: false,
    }),
    ...generateDimensionsAttributes(THUMBNAIL_BORDER_RADIUS, {
        top: 5,
        bottom: 5,
        right: 5,
        left: 5,
        isLinked: true,
    }),
    ...generateDimensionsAttributes(BTN_BORDER_RADIUS),

    // border shadow attributes ⬇
    ...generateBorderShadowAttributes(WRAPPER_BORDER_SHADOW),
    ...generateBorderShadowAttributes(BTN_BORDER_SHADOW, {
        noBorderRadius: true,
    }),
    ...generateBorderShadowAttributes(COLUMN_BORDER_SHADOW),
    ...generateBorderShadowAttributes(BULLET_BORDER_SHADOW, {
        noShadow: true,
        noBdrHover: true,
        defaultBdrColor: "#aaaaaa",
        defaultBdrStyle: "solid",
        bdrDefaults: {
            top: 1,
            bottom: 1,
            right: 1,
            left: 1,
        },
        rdsDefaults: {
            top: 50,
            bottom: 50,
            right: 50,
            left: 50,
        },
    }),

    // background attributes ⬇
    ...generateBackgroundAttributes(WRAPPER_BG, {
        noOverlay: true,
    }),

    // range controller
    ...generateResponsiveRangeAttributes(ICON_META_SPACE, {
        defaultRange: 10,
    }),
    ...generateResponsiveRangeAttributes(META_GAP, {
        defaultRange: 40,
        defaultUnit: "px",
    }),
    ...generateResponsiveRangeAttributes(ICON_CONTENT_GAP, {
        defaultRange: 20,
    }),
    ...generateResponsiveRangeAttributes(THUMBNAIL_IMAGE_SIZE, {
        defaultRange: 100,
        defaultUnit: "%",
    }),
    ...generateResponsiveRangeAttributes(ITEM_ICON_IMAGE_SIZE, {
        defaultRange: 24,
    }),
    ...generateResponsiveRangeAttributes(TIMELINE_ICON_SIZE, {
        defaultRange: 20,
    }),
    ...generateResponsiveRangeAttributes(ITEM_ICON_SIZE, {
        defaultRange: 24,
    }),
    ...generateResponsiveRangeAttributes(BULLET_SIZE, {
        defaultRange: 40,
    }),

    ...generateBorderShadowAttributes(SUBHEADING_BORDER_SHADOW, {
        noShadow: true,
        noBdrHover: true,
        defaultBdrColor: "#D7D7D7",
        defaultBdrStyle: "solid",
        bdrDefaults: {
            top: 1,
            bottom: 1,
            right: 1,
            left: 1,
        },
        rdsDefaults: {
            top: 8,
            bottom: 8,
            right: 8,
            left: 8,
        },
    }),

    ...generateResponsiveRangeAttributes(LABEL_GAP, {
        defaultRange: 5,
    }),

    ...generateBorderShadowAttributes(LABEL_BORDER_SHADOW, {
        noShadow: true,
        noBdrHover: true,
        defaultBdrColor: "#E0E0E0",
        defaultBdrStyle: "solid",
        bdrDefaults: {
            top: 1,
            bottom: 1,
            right: 1,
            left: 1,
        },
        rdsDefaults: {
            top: 4,
            bottom: 4,
            right: 4,
            left: 4,
        },
    }),

    ...generateResponsiveRangeAttributes(LABEL_BOTTOM_SPACE, {
        defaultRange: 10,
    }),

    ...generateResponsiveRangeAttributes(ICON_WIDTH, {
        defaultRange: 30,
    }),

    ...generateResponsiveRangeAttributes(LINE_CARD_GAP, {
        defaultRange: 40,
        TABdefaultRange: 40,
        MOBdefaultRange: 60,
    }),

    ...generateBorderShadowAttributes(MEDIA_BORDER_SHADOW, {
        rdsDefaults: {
            top: 8,
            bottom: 8,
            right: 8,
            left: 8,
        },
    }),
    ...generateDimensionsAttributes(ITEM_ICON_PADDING, {
        top: 10,
        bottom: 20,
        right: 20,
        left: 10,
        isLinked: false,
    }),
    ...generateResponsiveRangeAttributes(TIMELINE_ICON_WIDTH, {
        defaultRange: 30,
    }),

    // ImageComponent attributes for timeline images
    ...ImageComponent.addAttributes({
        attrName: "timelineImage",
        hasBorder: true,
        border: {
            key: TIMELINE_IMAGE_BORDER,
        },
        hasPadding: true,
        padding: {
            key: TIMELINE_IMAGE_PADDING,
        },
        hasMargin: true,
        margin: {
            key: TIMELINE_IMAGE_MARGIN,
        },
        hasWidth: true,
        width: {
            key: TIMELINE_IMAGE_WIDTH,
        },
        hasHeight: true,
        height: {
            key: TIMELINE_IMAGE_HEIGHT,
        },
        hasRadius: true,
        radius: {
            key: TIMELINE_IMAGE_RADIUS,
        },
    }),

};

export default attributes;
