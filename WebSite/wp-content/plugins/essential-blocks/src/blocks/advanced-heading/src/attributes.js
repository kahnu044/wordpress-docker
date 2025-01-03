import {
    WRAPPER_BG,
    WRAPPER_MARGIN,
    WRAPPER_PADDING,
    WRAPPER_BORDER_SHADOW,
    TITLE_MARGIN,
    TITLE1_PADDING,
    TITLE1_BORDER_SHADOW,
    TITLE2_PADDING,
    TITLE2_BORDER_SHADOW,
    TITLE3_PADDING,
    TITLE3_BORDER_SHADOW,
    SUBTITLE_MARGIN,
    SEPARATOR_MARGIN,
    SEPARATOR_LINE_SIZE,
    SEPARATOR_ICON_SIZE,
    SEPARATOR_WIDTH,
    ALIGNMENT
} from "./constants/constants";

import {
    generateDimensionsAttributes,
    generateTypographyAttributes,
    generateBackgroundAttributes,
    generateBorderShadowAttributes,
    generateResponsiveRangeAttributes,
    generateResponsiveAlignAttributes
} from "@essential-blocks/controls";

import { TITLE_TYPOGRAPHY, SUBTITLE_TYPOGRAPHY, TITLE2_TYPOGRAPHY, TITLE3_TYPOGRAPHY } from "./constants/typographyPrefixConstants";

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

    preset: {
        type: "string",
        default: "button-1",
    },
    effects: {
        type: "string",
    },
    marqueeSpeed: {
        type: "number",
        default: 10
    },
    marqueePauseOnHover: {
        type: "boolean",
        default: true
    },
    tagName: {
        type: "string",
        default: "h2",
    },
    titleText: {
        type: "string",
        default: "Essential Blocks Advanced Heading",
    },
    title2Text: {
        type: "string",
    },
    title3Text: {
        type: "string",
    },
    subtitleTagName: {
        type: "string",
        default: "p",
    },
    subtitleText: {
        type: "string",
        default: "Essential Blocks Advance Subtitle",
    },
    titleColor: {
        type: "string",
        default: "var(--eb-global-heading-color)",
    },
    titleHoverColor: {
        type: "string",
    },
    titleBgColor: {
        type: "string",
    },
    titleHoverBgColor: {
        type: "string",
    },
    title2Color: {
        type: "string",
        default: "var(--eb-global-heading-color)",
    },
    title2HoverColor: {
        type: "string",
    },
    title2BgColor: {
        type: "string",
    },
    title2HoverBgColor: {
        type: "string",
    },
    title3Color: {
        type: "string",
        default: "var(--eb-global-heading-color)",
    },
    title3HoverColor: {
        type: "string",
    },
    title3BgColor: {
        type: "string",
    },
    title3HoverBgColor: {
        type: "string",
    },
    subtitleColor: {
        type: "string",
        default: "var(--eb-global-text-color)",
    },
    subtitleHoverColor: {
        type: "string",
    },
    separatorColor: {
        type: "string",
        default: "var(--eb-global-primary-color)",
    },
    separatorHoverColor: {
        type: "string",
    },
    displaySubtitle: {
        type: "boolean",
        default: false,
    },
    displaySeperator: {
        type: "boolean",
        default: false,
    },
    seperatorPosition: {
        type: "string",
        default: "bottom",
    },
    seperatorType: {
        type: "string",
        default: "line",
    },
    seperatorStyle: {
        type: "string",
        default: "solid",
    },
    separatorIcon: {
        type: "string",
        default: "fas fa-arrow-circle-down"
    },
    source: {
        type: "string",
        default: "custom"
    },
    enableLink: {
        type: "boolean",
        default: false,
    },
    titleLink: {
        type: "string",
        default: "",
    },
    openInNewTab: {
        type: "boolean",
        default: false,
    },

    currentPostId: {
        type: "number",
        default: 0
    },
    currentPostType: {
        type: "string",
    },
    version: {
        type: 'string',
        default: '1'
    },

    // typography attributes ⬇
    ...generateTypographyAttributes(TITLE_TYPOGRAPHY),
    ...generateTypographyAttributes(TITLE2_TYPOGRAPHY),
    ...generateTypographyAttributes(TITLE3_TYPOGRAPHY),
    ...generateTypographyAttributes(SUBTITLE_TYPOGRAPHY),

    // Responsive Alignment attributes ⬇
    ...generateResponsiveAlignAttributes(ALIGNMENT, {
        defaultAlign: "left",
    }),

    // margin padding attributes ⬇
    ...generateDimensionsAttributes(WRAPPER_MARGIN),
    ...generateDimensionsAttributes(WRAPPER_PADDING),
    ...generateDimensionsAttributes(TITLE_MARGIN, {
        top: 0,
        bottom: 15,
        right: 0,
        left: 0,
        isLinked: false,
    }),
    ...generateDimensionsAttributes(TITLE1_PADDING),
    ...generateDimensionsAttributes(TITLE2_PADDING),
    ...generateDimensionsAttributes(TITLE3_PADDING),
    ...generateDimensionsAttributes(SUBTITLE_MARGIN, {
        top: 0,
        bottom: 20,
        right: 0,
        left: 0,
        isLinked: false,
    }),
    ...generateDimensionsAttributes(SEPARATOR_MARGIN, {
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        isLinked: false,
    }),
    ...generateBorderShadowAttributes(TITLE1_BORDER_SHADOW),
    ...generateBorderShadowAttributes(TITLE2_BORDER_SHADOW),
    ...generateBorderShadowAttributes(TITLE3_BORDER_SHADOW),

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

    // range controller Separator Line Border Size
    ...generateResponsiveRangeAttributes(SEPARATOR_LINE_SIZE, {
        defaultRange: 4,
    }),
    // range controller Separator Icon Size
    ...generateResponsiveRangeAttributes(SEPARATOR_ICON_SIZE, {
        defaultRange: 30,
    }),
    // range controller Separator Line Width
    ...generateResponsiveRangeAttributes(SEPARATOR_WIDTH, {
        defaultRange: 100,
    }),
};

export default attributes;
