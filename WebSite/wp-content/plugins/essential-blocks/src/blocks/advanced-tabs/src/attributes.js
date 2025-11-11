import { typoPrefixTabTitle, typoPrefixTabSubtitle } from "./constants/typographyPrefixConstants";

import {
    prefixWrapBg,
    prefixTitleBg,
    prefixActTitleBg,
    prefixContentBg,
    prefixTtlWrpBg,
} from "./constants/backgroundsConstants";

import {
    prefixWrapBdShadow,
    prefixTitleBdShadow,
    prefixActTitleBdShadow,
    prefixContentBdShadow,
    prefixTtlWrpBdShadow,
    prefixIconBdShadow,
} from "./constants/borderShadowConstants";

import {
    prefixWrapperMargin,
    prefixWrapperPadding,
    prefixTitlePadding,
    prefixTitleMargin,
    prefixContentMargin,
    prefixContentPadding,
    prefixTtlWrpMargin,
    prefixTtlWrpPadding,
    prefixIconPadding,
} from "./constants/dimensionsConstants";

import { prefixTitleMinWidth, prefixIconSize, prefixIconGap, prefixCaretSize, prefixSubtitleSpacing } from "./constants/rangeNames";

import {
    generateDimensionsAttributes,
    generateTypographyAttributes,
    generateBackgroundAttributes,
    generateBorderShadowAttributes,
    generateResponsiveRangeAttributes,
} from "@essential-blocks/controls";

const attributes = {
    // the following 4 attributes is must required for responsive options and asset generation for frontend
    // responsive control attributes ⬇
    resOption: {
        type: "string",
        default: "Desktop",
    },

    // blockId attribute for making unique className and other uniqueness ⬇
    blockId: {
        type: "string",
    },
    blockRoot: {
        type: "string",
        default: "essential_block",
    },

    // blockMeta is for keeping all the styles ⬇
    blockMeta: {
        type: "object",
    },

    align: {
        type: "string",
        default: "wide",
    },

    //
    layout: {
        type: "string",
        default: "horizontal",
    },
    tagName: {
        type: "string",
        default: "h6",
    },
    mediaPositon: {
        type: "string",
        default: "inline",
    },

    mediaAlign: {
        type: "string",
        default: "left",
    },

    //

    oldTabTitles: {
        type: 'array',
        source: 'query',
        selector: '.tabTitles li',
        query: {
            text: {
                type: 'string',
                source: 'html',
                selector: '.tab-title-text',
            },

        }
    },
    tabTitles: {
        type: "array",
        default: [
            {
                text: "Tab Title 1",
                id: "1",
                media: "icon",
                icon: "fas fa-home",
                image: "",
                isExpanded: true,
                isDefault: true,
                customId: "",
                enableSubtitle: false,
                subtitle: "",
            },
            {
                text: "Tab Title 2",
                id: "2",
                media: "icon",
                icon: "fas fa-home",
                image: "",
                isExpanded: false,
                isDefault: false,
                customId: "",
                enableSubtitle: false,
                subtitle: "",
            },
            {
                text: "Tab Title 3",
                id: "3",
                media: "icon",
                icon: "fas fa-home",
                image: "",
                isExpanded: false,
                isDefault: false,
                customId: "",
                enableSubtitle: false,
                subtitle: "",
            },
        ],
    },

    //
    tabChildCount: {
        type: "number",
        default: 3,
    },

    //
    isMediaOn: {
        type: "boolean",
        default: true,
    },
    isFillTitle: {
        type: "boolean",
        default: true,
    },
    isMinHeightAsTitle: {
        type: "boolean",
        default: true,
    },
    enableResponsiveLayout: {
        type: "boolean",
        default: false,
    },
    verticalToHorizontal: {
        type: "string",
        default: 'mobile',
    },

    //
    textColor: {
        type: "string",
        default: "var(--eb-global-heading-color)",
    },
    iconColor: {
        type: "string",
        default: "var(--eb-global-heading-color)",
    },
    hvTextColor: {
        type: "string",
    },
    hvIconColor: {
        type: "string",
    },
    actTextColor: {
        type: "string",
        default: "var(--eb-global-background-color)",
    },
    actIconColor: {
        type: "string",
        default: "var(--eb-global-background-color)",
    },
    actHvTextColor: {
        type: "string",
    },
    actHvIconColor: {
        type: "string",
    },
    colorTransition: {
        type: "number",
    },
    actColorTransition: {
        type: "number",
    },

    // Subtitle colors
    subtitleColor: {
        type: "string",
        default: "var(--eb-global-text-color)",
    },
    hvSubtitleColor: {
        type: "string",
    },
    actSubtitleColor: {
        type: "string",
        default: "var(--eb-global-background-color)",
    },
    actHvSubtitleColor: {
        type: "string",
    },

    //
    showCaret: {
        type: "boolean",
        default: true,
    },
    caretColor: {
        type: "string",
        default: "var(--eb-global-primary-color)",
    },
    closeAllTabs: {
        type: 'boolean',
        default: false,
    },

    // Icon background colors
    titleAlign: {
        type: "string",
        default: "center",
    },
    iconBgColor: {
        type: "string",
    },
    iconhvBgColor: {
        type: "string",
    },
    actIconBgColor: {
        type: "string",
    },
    actHvIconBgColor: {
        type: "string",
    },
    addCaretIcon: {
        type: "boolean",
        default: false,
    },
    caretIcon: {
        type: "string",
        default: "fas fa-angle-down",
    },

    // typography Control attributes
    ...generateTypographyAttributes(typoPrefixTabTitle, {
        fontSize: 16
    }),
    ...generateTypographyAttributes(typoPrefixTabSubtitle, {
        fontSize: 12
    }),

    // Responsive Range Control Attributes
    ...generateResponsiveRangeAttributes(prefixTitleMinWidth, {
        // defaultRange: 46,
        // defaultUnit: "%", // if 'noUnits: true' is also passed here then 'defaultUnit' won't work, also it doesn't make sense to pass a defaultUnit when No units given
        // noUnits: true,
    }),
    ...generateResponsiveRangeAttributes(prefixIconSize, {
        defaultRange: 18,
        noUnits: true,
        // defaultUnit: "%", // if 'noUnits: true' is also passed here then 'defaultUnit' won't work, also it doesn't make sense to pass a defaultUnit when No units given
    }),
    ...generateResponsiveRangeAttributes(prefixIconGap, {
        defaultRange: 10,
        noUnits: true,
        // defaultUnit: "%", // if 'noUnits: true' is also passed here then 'defaultUnit' won't work, also it doesn't make sense to pass a defaultUnit when No units given
    }),
    ...generateResponsiveRangeAttributes(prefixCaretSize, {
        defaultRange: 8,
        noUnits: true,
        // defaultUnit: "%", // if 'noUnits: true' is also passed here then 'defaultUnit' won't work, also it doesn't make sense to pass a defaultUnit when No units given
    }),
    ...generateResponsiveRangeAttributes(prefixSubtitleSpacing, {
        defaultRange: 5,
        noUnits: true,
    }),

    //
    // Background Control Attributes
    ...generateBackgroundAttributes(prefixWrapBg),
    ...generateBackgroundAttributes(prefixTitleBg, {
        defaultFillColor: "var(--eb-global-background-color)",
        noOverlay: true,
        defaultBgGradient: "var(--eb-gradient-background-color)",
    }),
    ...generateBackgroundAttributes(prefixActTitleBg, {
        defaultFillColor: "var(--eb-global-primary-color)",
        noOverlay: true,
        defaultBgGradient: "var(--eb-gradient-background-color)",
    }),
    ...generateBackgroundAttributes(prefixContentBg, {
        noOverlay: true,
    }),
    ...generateBackgroundAttributes(prefixTtlWrpBg, {
        noOverlay: true,
    }),

    //
    // BorderShadow Control Attributes
    ...generateBorderShadowAttributes(prefixWrapBdShadow, {
        // bdrDefaults: {
        // 	top: 0,
        // 	bottom: 0,
        // 	right: 0,
        // 	left: 0,
        // },
        // rdsDefaults: {
        // 	top: 10,
        // 	bottom: 10,
        // 	right: 10,
        // 	left: 10,
        // },
        // noShadow: true,
        // noBorder: true,
    }),
    ...generateBorderShadowAttributes(prefixTitleBdShadow),
    ...generateBorderShadowAttributes(prefixActTitleBdShadow),
    ...generateBorderShadowAttributes(prefixContentBdShadow, {
        bdrDefaults: {
            top: 1,
            bottom: 1,
            right: 1,
            left: 1,
        },
        defaultBdrColor: "#EEEDF0",
        defaultBdrStyle: "solid",
    }),
    ...generateBorderShadowAttributes(prefixTtlWrpBdShadow),
    ...generateBorderShadowAttributes(prefixIconBdShadow),

    // dimensions Control related Attributes
    ...generateDimensionsAttributes(prefixWrapperMargin, {
        // top: 20,
        // bottom: 20,
        // isLinked: false,
    }),
    ...generateDimensionsAttributes(prefixWrapperPadding),
    ...generateDimensionsAttributes(prefixTitlePadding, {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10,
        // isLinked: false,
    }),
    ...generateDimensionsAttributes(prefixTitleMargin),
    ...generateDimensionsAttributes(prefixContentMargin),
    ...generateDimensionsAttributes(prefixContentPadding, {
        top: 10,
        bottom: 10,
        left: 15,
        right: 15,
        isLinked: false,
    }),
    ...generateDimensionsAttributes(prefixTtlWrpMargin),
    ...generateDimensionsAttributes(prefixTtlWrpPadding),
    ...generateDimensionsAttributes(prefixIconPadding),
};

export default attributes;
