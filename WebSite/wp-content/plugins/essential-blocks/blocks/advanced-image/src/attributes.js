import {
	WRAPPER_BG,
	WRAPPER_MARGIN,
	WRAPPER_PADDING,
	WRAPPER_BORDER_SHADOW,
	IMAGE_WIDTH,
	IMAGE_HEIGHT,
	IMAGE_BORDER_SHADOW,
	CAPTION_MARGIN,
	CAPTION_PADDING,
	CAPTION_WIDTH,
} from "./constants";
import * as CAPTION_TYPOGRAPHY from "./typoConstants";

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
	image: {
		type: "object",
		default: {
			id: "",
			url: "",
			alt: "",
		},
	},
	imageCaption: {
		type: "string",
	},
	selectedImgIndex: {
		type: "number",
	},
	displayCaption: {
		type: "boolean",
		default: false,
	},
	captionColor: {
		type: "string",
		default: "#ffffff",
	},
	captionBGColor: {
		type: "string",
		default: "rgba(174 98 209 / 0.7)",
	},
	horizontalAlign: {
		type: "string",
		default: "center",
	},
	verticalAlign: {
		type: "string",
		default: "bottom",
	},
	verticalAlignCap2: {
		type: "string",
		default: "bottom",
	},
	imageAlign: {
		type: "string",
		default: "0 auto",
	},
	textAlign: {
		type: "string",
		default: "center",
	},
	hoverEffect: {
		type: "string",
		default: "no-effect",
	},
	stylePreset: {
		type: "string",
		default: "rounded",
	},
	complexStyle: {
		type: "boolean",
		default: false,
	},
	captionStyle: {
		type: "string",
		default: "caption-style-1",
	},
	autoFit: {
		type: "boolean",
		default: true,
	},
	enableLink: {
		type: "boolean",
		default: false,
	},
	imageLink: {
		type: "string",
		default: "",
	},
	openInNewTab: {
		type: "boolean",
		default: false,
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
		top: 15,
		bottom: 15,
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
		defaultBdrColor: "#AE62D1",
		bdrDefaults: {
			top: 0,
			bottom: 0,
			right: 0,
			left: 0,
		},
		rdsDefaults: {
			top: 15,
			bottom: 15,
			right: 15,
			left: 15,
		},
		// noShadow: true,
		// noBorder: true,
	}),

	// background attributes ⬇
	...generateBackgroundAttributes(WRAPPER_BG, {
		defaultBgGradient: "linear-gradient(45deg,#ffffff,#ffffff)",
		noOverlay: true,
	}),

	// range controller Separator Line Grid Column
	...generateResponsiveRangeAttributes(IMAGE_WIDTH, {
		// defaultRange: 300,
	}),
	// range controller Separator Image Gap
	...generateResponsiveRangeAttributes(IMAGE_HEIGHT, {
		// defaultRange: 300,
	}),
	// range controller Separator Caption Width
	...generateResponsiveRangeAttributes(CAPTION_WIDTH),
};

export default attributes;
