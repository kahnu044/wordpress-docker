import * as prefixObjs from "./constants/typographyPrefixConstants";
import {
	wrapperMargin,
	wrapperPadding,

	//
	mediaBgPadding,
	mediaBgMargin,
	mediaBgRadius,
} from "./constants/dimensionsConstants";
import { WrapBg } from "./constants/backgroundsConstants";
import { wrpBdShadow } from "./constants/borderShadowConstants";

import {
	rgNumTitle,
	rgNumPrefix,
	rgNumSuffix,

	//
	mediaIconSize,
	mediaImageWidth,
	mediaImageHeight,
	mediaContentGap,
} from "./constants/rangeNames";

// import {
// 	generateDimensionsAttributes,
// 	generateTypographyAttributes,
// 	generateBackgroundAttributes,
// 	generateBorderShadowAttributes,
// 	generateResponsiveRangeAttributes,
// } from "../../../util/helpers";

const {
	generateDimensionsAttributes,
	generateTypographyAttributes,
	generateBackgroundAttributes,
	generateBorderShadowAttributes,
	generateResponsiveRangeAttributes,
} = window.EBControls;

export default {
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

	// counter settings attributes ⬇
	startValue: {
		type: "string",
		default: "0",
	},
	target: {
		type: "string",
		default: "50000",
	},
	duration: {
		type: "string",
		default: "1000",
	},
	counterTitle: {
		type: "string",
		default: "Active Users",
	},
	counterPrefix: {
		type: "string",
		default: "",
	},
	counterSuffix: {
		type: "string",
		default: "+",
	},
	isShowSeparator: {
		type: "boolean",
		default: true,
	},
	separator: {
		type: "string",
		default: ",",
	},
	separastorSelectLabel: {
		type: "string",
		default: "Default",
	},
	wrapperFlexDirection: {
		type: "string",
		default: "column",
	},
	layoutLabel: {
		type: "string",
	},

	// color attributes ⬇
	titleColor: {
		type: "string",
		// default: "#566162",
	},
	numberColor: {
		type: "string",
		// default: "#3074ff",
	},
	numPrefixColor: {
		type: "string",
		// default: "#3074ff",
	},
	numSuffixColor: {
		type: "string",
		// default: "#3074ff",
	},

	//
	//
	//
	// this attribute is for selecting the desired design preset from the layout design presets options ⬇

	layoutPreset: {
		type: "string",
		default: "preset1",
	},

	// .eb-counter-wrapper flex-direction
	rootFlexDirection: {
		type: "string",
		default: "column",
	},

	// .icon-img-wrapper align-self property
	mediaAlignSelf: {
		type: "string",
		default: "center",
	},

	//
	contentsAlignSelf: {
		type: "string",
	},

	// .counter-contents-wrapper text-alignment
	contentAlignment: {
		type: "string",
		default: "center",
	},

	//
	media: {
		type: "string",
		default: "none",
		// default: "icon",
	},

	//
	selectedIcon: {
		type: "string",
		// source: "attribute",
		// selector: ".eb-infobox-icon-data-selector",
		// attribute: "data-icon",
		default: "far fa-gem",
	},

	//
	iconColor: {
		type: "string",
	},

	//
	useIconBg: {
		type: "boolean",
		default: true,
	},

	//
	iconBgType: {
		type: "string",
		default: "gradient",
	},

	//
	iconBgColor: {
		type: "string",
	},

	//
	iconBgGradient: {
		type: "string",
		default: "linear-gradient(45deg,#ffc2de,#ff46a1)",
	},

	//
	//
	imageUrl: {
		type: "string",
	},

	imageId: {
		type: "string",
	},

	isMediaImgHeightAuto: {
		type: "boolean",
		default: true,
	},

	// typography attributes ⬇
	...generateTypographyAttributes(Object.values(prefixObjs)),

	// margin padding attributes ⬇
	...generateDimensionsAttributes(wrapperMargin),
	...generateDimensionsAttributes(mediaBgPadding, {
		top: 20,
		bottom: 20,
		right: 20,
		left: 20,
	}),
	...generateDimensionsAttributes(mediaBgRadius, {
		top: 20,
		bottom: 20,
		isLinked: false,
	}),
	...generateDimensionsAttributes(mediaBgMargin, {
		top: 15,
		isLinked: false,
	}),
	...generateDimensionsAttributes(wrapperPadding, {
		top: 30,
		bottom: 30,
		right: 10,
		left: 10,
		isLinked: false,
	}),
	// Background attributes ⬇
	...generateBackgroundAttributes(WrapBg, {
		isBgDefaultGradient: true,
		defaultBgGradient: "linear-gradient(45deg,#7967ff,#c277f2)",
	}),
	// border & shadow attributes ⬇
	...generateBorderShadowAttributes(wrpBdShadow),

	// Responsive Range Controller attributes ⬇
	...generateResponsiveRangeAttributes(rgNumTitle, {
		defaultRange: 20,
	}),
	...generateResponsiveRangeAttributes(rgNumPrefix),
	...generateResponsiveRangeAttributes(rgNumSuffix),
	...generateResponsiveRangeAttributes(mediaIconSize, {
		defaultRange: 50,
	}),
	...generateResponsiveRangeAttributes(mediaImageWidth, {
		defaultRange: 300,
	}),
	...generateResponsiveRangeAttributes(mediaImageHeight),
	...generateResponsiveRangeAttributes(mediaContentGap, {
		defaultRange: 20,
		noUnits: true,
	}),
};
