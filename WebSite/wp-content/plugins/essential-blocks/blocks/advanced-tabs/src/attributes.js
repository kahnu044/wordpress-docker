import * as typoPrefixs from "./constants/typographyPrefixConstants";

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
} from "./constants/dimensionsConstants";

import {
    prefixTitleMinWidth,
    prefixIconSize,
    prefixIconGap,
    prefixCaretSize,
} from "./constants/rangeNames";

const {
    generateDimensionsAttributes,
    generateTypographyAttributes,
    generateBackgroundAttributes,
    generateBorderShadowAttributes,
    generateResponsiveRangeAttributes,
} = EBControls;

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
    tabTitles: {
        type: "array",
        default: [],
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

    //
    textColor: {
        type: "string",
        default: "#555555",
    },
    iconColor: {
        type: "string",
        default: "#555555",
    },
    hvTextColor: {
        type: "string",
    },
    hvIconColor: {
        type: "string",
    },
    actTextColor: {
        type: "string",
        default: "#ffffff",
    },
    actIconColor: {
        type: "string",
        default: "#ffffff",
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

    //
    showCaret: {
        type: "boolean",
        default: true,
    },
    caretColor: {
        type: "string",
        default: "#7967ff",
    },

    //
    // typography Control attributes
    ...generateTypographyAttributes(Object.values(typoPrefixs)),

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

    //
    // Background Control Attributes
    ...generateBackgroundAttributes(prefixWrapBg, {
        // defaultFillColor: "#7967ff",
        // isBgDefaultGradient: true,
        // noOverlay: true,
        // noMainBgi: true,
        defaultBgGradient: "linear-gradient(45deg,#7967ff,#c277f2)",
        // noOverlayBgi: true, // if 'noOverlay : true' is given then there's no need to give 'noOverlayBgi : true'
    }),
    ...generateBackgroundAttributes(prefixTitleBg, {
        defaultFillColor: "#EEEDF0",
        // isBgDefaultGradient: true,
        noOverlay: true,
        // noMainBgi: true,
        defaultBgGradient: "linear-gradient(45deg,#7967ff,#c277f2)",
        // noOverlayBgi: true, // if 'noOverlay : true' is given then there's no need to give 'noOverlayBgi : true'
    }),
    ...generateBackgroundAttributes(prefixActTitleBg, {
        defaultFillColor: "#7967ff",
        // isBgDefaultGradient: true,
        noOverlay: true,
        // noMainBgi: true,
        defaultBgGradient: "linear-gradient(45deg,#7967ff,#c277f2)",
        // noOverlayBgi: true, // if 'noOverlay : true' is given then there's no need to give 'noOverlayBgi : true'
    }),
    ...generateBackgroundAttributes(prefixContentBg, {
        // defaultFillColor: "#888",
        // isBgDefaultGradient: true,
        noOverlay: true,
        // noMainBgi: true,
        defaultBgGradient: "linear-gradient(45deg,#7967ff,#c277f2)",
        // noOverlayBgi: true, // if 'noOverlay : true' is given then there's no need to give 'noOverlayBgi : true'
    }),
    ...generateBackgroundAttributes(prefixTtlWrpBg, {
        // defaultFillColor: "#f5f5f5",
        // isBgDefaultGradient: true,
        noOverlay: true,
        // noMainBgi: true,
        defaultBgGradient: "linear-gradient(45deg,#7967ff,#c277f2)",
        // noOverlayBgi: true, // if 'noOverlay : true' is given then there's no need to give 'noOverlayBgi : true'
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

    //
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
};

export default attributes;
