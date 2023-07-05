import {
	WRAPPER_BG,
	WRAPPER_MARGIN,
	WRAPPER_PADDING,
	WRAPPER_BORDER_SHADOW,
	GRID_COLUMNS,
	IMAGE_GAP,
	IMAGE_BORDER_SHADOW,
	CAPTION_MARGIN,
	CAPTION_PADDING,
	CAPTION_WIDTH,
	IMAGE_WIDTH,
	IMAGE_HEIGHT,
	IMAGE_MAX_WIDTH,
	IMAGE_MAX_HEIGHT,
	FILTER_PADDING,
	FILTER_MARGIN,
	FILTER_BORDER_SHADOW,
} from "./constants";
import * as CAPTION_TYPOGRAPHY from "./typoConstants";
import { __ } from "@wordpress/i18n";

const {
	generateDimensionsAttributes,
	generateTypographyAttributes,
	generateBackgroundAttributes,
	generateBorderShadowAttributes,
	generateResponsiveRangeAttributes,
} = window.EBControls;

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

	images: {
		type: "array",
		default: [],
	},
	sources: {
		type: "array",
		default: [],
	},
	imageSize: {
		type: "string",
	},
	selectedImgIndex: {
		type: "number",
	},
	layouts: {
		type: "string",
		default: "grid",
	},
	displayCaption: {
		type: "boolean",
		default: false,
	},
	captionOnHover: {
		type: "boolean",
		default: false,
	},
	newImage: {
		type: "string",
	},
	captionColor: {
		type: "string",
		default: "#ffffff",
	},
	captionBGColor: {
		type: "string",
		default: "rgba(195 195 195 / 0.7)",
	},
	overlayColor: {
		type: "string",
		default: "rgba(0 0 0 / 0.7)",
	},
	horizontalAlign: {
		type: "string",
		default: "center",
	},
	verticalAlign: {
		type: "string",
		default: "bottom",
	},
	textAlign: {
		type: "string",
		default: "center",
	},
	styleNumber: {
		type: "string",
		default: "0",
	},
	overlayStyle: {
		type: "string",
		default: "overlay-bottom",
	},
	disableLightBox: {
		type: "boolean",
		default: false,
	},
	imageSizeType: {
		type: "string",
		default: "fixed",
	},
	imageAlignment: {
		type: "string",
		default: "flex-start",
	},

	enableFilter: {
		type: "boolean",
		default: false,
	},
	filterItems: {
		type: "array",
		default: [
			{
				value: "filter-item-1",
				label: __("Filter Item 1", "essential-blocks"),
			},
		],
	},
	enableFilterAll: {
		type: "boolean",
		default: true,
	},
	filterAllTitle: {
		type: "string",
		default: "All",
	},
	filterColorType: {
		type: "string",
		default: "normal",
	},
	filterColor: {
		type: "string",
		default: "#555555",
	},
	filterActColor: {
		type: "string",
		default: "#ffffff",
	},
	filterHoverColor: {
		type: "string",
		default: "#ffffff",
	},
	filterBGColor: {
		type: "string",
		default: "#EEEDF0",
	},
	filterActBGColor: {
		type: "string",
		default: "#7967ff",
	},
	filterHoverBGColor: {
		type: "string",
		default: "#333333",
	},
	select2Options: {
		type: "string",
		default: "",
	},

	// typography attributes ⬇
	...generateTypographyAttributes(Object.values(CAPTION_TYPOGRAPHY)),

	// margin padding attributes ⬇
	...generateDimensionsAttributes(WRAPPER_MARGIN),
	...generateDimensionsAttributes(WRAPPER_PADDING),
	...generateDimensionsAttributes(CAPTION_MARGIN, {
		top: 0,
		bottom: 0,
		right: 0,
		left: 0,
		isLinked: false,
	}),
	...generateDimensionsAttributes(CAPTION_PADDING, {
		top: 5,
		bottom: 5,
		right: 10,
		left: 10,
		isLinked: false,
	}),

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
	...generateBorderShadowAttributes(IMAGE_BORDER_SHADOW, {
		bdrDefaults: {
			top: 0,
			bottom: 0,
			right: 0,
			left: 0,
		},
		noShadow: true,
		// noBorder: true,
	}),

	// background attributes ⬇
	...generateBackgroundAttributes(WRAPPER_BG, {
		defaultBgGradient: "linear-gradient(45deg,#ffffff,#ffffff)",
		noOverlay: true,
	}),

	// range controller Separator Line Grid Column
	...generateResponsiveRangeAttributes(GRID_COLUMNS, {
		defaultRange: 3,
	}),
	// range controller Separator Image Gap
	...generateResponsiveRangeAttributes(IMAGE_GAP, {
		defaultRange: 10,
	}),
	// range controller Separator Caption Width
	...generateResponsiveRangeAttributes(CAPTION_WIDTH),

	//Image Controls
	...generateResponsiveRangeAttributes(IMAGE_HEIGHT, {
		defaultRange: 300,
	}),
	...generateResponsiveRangeAttributes(IMAGE_WIDTH, {
		defaultRange: 100,
		defaultUnit: "%",
	}),
	...generateResponsiveRangeAttributes(IMAGE_MAX_HEIGHT),
	...generateResponsiveRangeAttributes(IMAGE_MAX_WIDTH, {
		defaultRange: 100,
		defaultUnit: "%",
	}),

	...generateDimensionsAttributes(FILTER_MARGIN, {
		top: 0,
		bottom: 0,
		right: 5,
		left: 5,
		isLinked: false,
	}),
	...generateDimensionsAttributes(FILTER_PADDING, {
		top: 5,
		bottom: 5,
		right: 10,
		left: 10,
		isLinked: false,
	}),
	// border shadow attributes ⬇
	...generateBorderShadowAttributes(FILTER_BORDER_SHADOW, {
		bdrDefaults: {
			top: 0,
			bottom: 0,
			right: 0,
			left: 0,
		},
		// noShadow: true,
		// noBorder: true,
	}),
};

export default attributes;
