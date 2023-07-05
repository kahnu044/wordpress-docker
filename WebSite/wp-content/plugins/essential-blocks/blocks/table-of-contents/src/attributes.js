import * as typoPrefixs from "./constants/typographyPrefixConstants";

import {
    //
    WrpMarginConst,
    WrpPaddingConst,
    titlePaddingConst,
    contentPaddingConst,
} from "./constants/dimensionsConstants";

// import {
// 	//
// 	WrpBgConst,
// } from "./constants/backgroundsConstants";
import {
    //
    WrpBdShadowConst,
} from "./constants/borderShadowConstants";

import {
    // mediaIconSize,
    // mediaImageWidth,
    // mediaImageHeight,
    // mediaContentGap,

    //
    wrapMaxWidthPrefix,
} from "./constants/rangeNames";

// import {
// 	generateDimensionsAttributes,
// 	generateTypographyAttributes,
// 	// generateBackgroundAttributes,
// 	generateBorderShadowAttributes,
// 	generateResponsiveRangeAttributes,
// } from "../../../util/helpers";

const {
    //

    generateDimensionsAttributes,
    generateTypographyAttributes,
    // generateBackgroundAttributes,
    generateBorderShadowAttributes,
    generateResponsiveRangeAttributes,
} = window.EBControls;

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

    //
    headers: {
        type: "array",
        default: [],
    },
    visibleHeaders: {
        type: "array",
        default: Array(6).fill(true),
    },
    deleteHeaderList: {
        type: "array",
        default: [],
    },
    isMigrated: {
        type: "boolean",
        default: false,
    },
    listType: {
        type: "string",
        default: "ul",
    },
    title: {
        type: "string",
        default: "Table of Contents",
    },
    collapsible: {
        type: "boolean",
        default: false,
    },
    initialCollapse: {
        type: "boolean",
        default: false,
    },
    mainBgc: {
        type: "string",
        // default: "#ff7d50",
    },
    titleBg: {
        type: "string",
        // default: "#ff7d50",
    },
    titleColor: {
        type: "string",
        // default: "white",
    },
    contentBg: {
        type: "string",
        // default: "#fff6f3",
    },
    contentColor: {
        type: "string",
        // default: "#707070",
    },
    contentHoverColor: {
        type: "string",
    },
    contentGap: {
        type: "number",
    },
    contentGapUnit: {
        type: "string",
        default: "px",
    },
    indent: {
        type: "number",
    },
    displayTitle: {
        type: "boolean",
        default: true,
    },
    titleAlign: {
        type: "string",
        default: "left",
    },
    titleFontFamily: {
        type: "string",
    },
    titleSizeUnit: {
        type: "string",
        default: "px",
    },
    titleFontSize: {
        type: "number",
        default: 22,
    },
    titleFontWeight: {
        type: "string",
        default: "normal",
    },
    titleTextTransform: {
        type: "string",
    },
    titleTextDecoration: {
        type: "string",
    },
    titleLetterSpacing: {
        type: "number",
    },
    titleLetterSpacingUnit: {
        type: "string",
        default: "px",
    },
    titleLineHeight: {
        type: "number",
    },
    titleLineHeightUnit: {
        type: "string",
        default: "px",
    },
    contentFontFamily: {
        type: "string",
    },
    contentSizeUnit: {
        type: "string",
        default: "px",
    },
    contentFontSize: {
        type: "number",
    },
    contentFontWeight: {
        type: "string",
        default: "normal",
    },
    contentTextTransform: {
        type: "string",
    },
    contentLetterSpacing: {
        type: "number",
    },
    contentLetterSpacingUnit: {
        type: "string",
        default: "px",
    },
    contentLineHeight: {
        type: "number",
        default: 1.4,
    },
    isSmooth: {
        type: "boolean",
        default: true,
    },
    seperator: {
        type: "boolean",
        default: false,
    },
    seperatorColor: {
        type: "string",
        // default: "black",
    },
    seperatorSize: {
        type: "number",
    },
    seperatorStyle: {
        type: "string",
        default: "solid",
    },
    borderWidth: {
        type: "number",
    },
    borderColor: {
        type: "string",
        // default: "black",
    },
    borderStyle: {
        type: "string",
        default: "solid",
    },
    titlePaddingTop: {
        type: "number",
        default: 0,
    },
    titlePaddingRight: {
        type: "number",
        default: 0,
    },
    titlePaddingBottom: {
        type: "number",
        default: 0,
    },
    titlePaddingLeft: {
        type: "number",
        default: 10,
    },
    titlePaddingUnit: {
        type: "string",
        default: "px",
    },
    scrollToTop: {
        type: "boolean",
        default: false,
    },
    arrowHeight: {
        type: "number",
    },
    arrowWidth: {
        type: "number",
    },
    arrowBg: {
        type: "string",
    },
    arrowColor: {
        type: "string",
    },
    hOffset: {
        type: "number",
    },
    vOffset: {
        type: "number",
    },
    blur: {
        type: "number",
    },
    spread: {
        type: "number",
    },
    shadowColor: {
        type: "string",
        // default: "black",
    },
    contentPaddingTop: {
        type: "number",
        default: 0,
    },
    contentPaddingRight: {
        type: "number",
        default: 0,
    },
    contentPaddingBottom: {
        type: "number",
        default: 0,
    },
    contentPaddingLeft: {
        type: "number",
        default: 0,
    },
    contentPaddingUnit: {
        type: "string",
        default: "px",
    },
    listSeperatorWidth: {
        type: "number",
    },
    listSeperatorStyle: {
        type: "string",
        default: "solid",
    },
    listSeperatorColor: {
        type: "string",
    },
    hasUnderline: {
        type: "boolean",
        default: false,
    },
    topSpace: {
        type: "number",
        default: 25,
    },
    contentHeight: {
        type: "number",
    },
    contentHeightUnit: {
        type: "string",
        default: "px",
    },
    contentWidth: {
        type: "number",
        default: 300,
    },
    contentWidthUnit: {
        type: "string",
        default: "px",
    },
    isSticky: {
        type: "boolean",
        default: false,
    },
    hideOnMobile: {
        type: "boolean",
        default: false,
    },
    zIndex: {
        type: "number",
        default: 999,
    },
    contentAlign: {
        type: "string",
        default: "left",
    },
    containerWidth: {
        type: "number",
        default: 100,
    },
    topOffset: {
        type: "string",
    },
    scrollTarget: {
        type: "string",
        default: "scroll_to_toc",
    },
    stickyPosition: {
        type: "string",
        default: "left",
    },
    enableCopyLink: {
        type: "boolean",
        default: false,
    },
    // typography attributes
    ...generateTypographyAttributes(Object.values(typoPrefixs)),

    //
    ...generateResponsiveRangeAttributes(wrapMaxWidthPrefix, {
        // noUnits: true,
        defaultRange: 610,
    }),

    showListSeparator: {
        type: "boolean",
        default: false,
    },
    // //
    // ...generateBackgroundAttributes(WrpBgConst, {
    // 	defaultBgGradient: "linear-gradient(45deg,#7967ff,#c277f2)",
    // 	// noOverlayBgi: true, // if 'noOverlay : true' is given then there's no need to give 'noOverlayBgi : true'
    // }),

    //
    ...generateBorderShadowAttributes(WrpBdShadowConst, {
        // noShadow: true,
        // noBorder: true,
    }),

    //
    ...generateDimensionsAttributes(WrpMarginConst),
    ...generateDimensionsAttributes(WrpPaddingConst),
    ...generateDimensionsAttributes(titlePaddingConst, {
        left: 10,
        isLinked: false,
    }),
    ...generateDimensionsAttributes(contentPaddingConst),
};

export default attributes;
