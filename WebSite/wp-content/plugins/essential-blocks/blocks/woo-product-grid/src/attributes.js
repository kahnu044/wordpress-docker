import * as typoPrefixs from "./constants/typographyConstants";
import {
	RATING_ICON_SIZE,
	BTN_BORDER_SHADOW,
	SALE_BADGE_BORDER,
	WRAPPER_MARGIN,
	WRAPPER_PADDING,
	WRAPPER_BG,
	WRAPPER_BORDER_SHADOW,
	CONTENT_PADDING,
	IMAGE_PADDING,
	PRODUCTS_BORDER_SHADOW,
	GRID_SPACING,
	TITLE_MARGIN,
	PRICE_MARGIN,
	RATING_MARGIN,
	BUTTON_MARGIN,
	DESC_MARGIN,
	COLUMNS,
	IMG_GAP,
	IMG_WIDTH,
	IMG_HEIGHT,
	IMAGE_BORDER_SHADOW,
	LOADMORE_PADDING,
	LOADMORE_MARGIN,
	LOADMORE_BORDER_SHADOW,
} from "./constants";

const {
	generateTypographyAttributes,
	generateResponsiveRangeAttributes,
	generateDimensionsAttributes,
	generateBackgroundAttributes,
	generateBorderShadowAttributes,
} = window.EBControls;

const attributes = {
	// responsive control attributes ⬇
	resOption: {
		type: "string",
		default: "Desktop",
	},
	// uniqueIdNumber attribute for making unique className
	uniqueIdNumber: {
		type: "number",
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
	queryData: {
		type: "object",
	},
	queryResults: {
		type: "array",
	},
	layout: {
		type: "string",
		default: "grid",
	},
	gridPreset: {
		type: "string",
		default: "grid-preset-1",
	},
	gridColumns: {
		type: "string",
		default: "4",
	},
	showRating: {
		type: "boolean",
		default: true,
	},
	showPrice: {
		type: "boolean",
		default: true,
	},
	showSaleBadge: {
		type: "boolean",
		default: true,
	},
	listPreset: {
		type: "string",
		default: "list-preset-1",
	},
	titleColor: {
		type: "string",
	},
	titleHoverColor: {
		type: "string",
	},
	priceColor: {
		type: "string",
	},
	salePriceColor: {
		type: "string",
	},
	ratingColor: {
		type: "string",
	},
	saleBadgeAlign: {
		type: "string",
		default: "align-left",
	},
	saleText: {
		type: "string",
		default: "Sale",
	},
	saleTextColor: {
		type: "string",
	},
	saleTextBackgroundColor: {
		type: "string",
	},
	contentAlignment: {
		type: "string",
		default: "center",
	},
	contentBackgroundColor: {
		type: "string",
	},
	imageBackgroundColor: {
		type: "string",
	},
	btnColor: {
		type: "string",
	},
	btnHoverColor: {
		type: "string",
	},
	btnBackgroundColor: {
		type: "string",
	},
	btnBackgroundHoverColor: {
		type: "string",
	},
	descColor: {
		type: "string",
	},
	autoHeight: {
		type: "boolean",
		default: false,
	},
	backgroundOverlayColor: {
		type: "string",
	},
	isCustomCartBtn: {
		type: "boolean",
		default: false,
	},
	simpleCartText: {
		type: "string",
		default: "Buy Now",
	},
	variableCartText: {
		type: "string",
		default: "Select options",
	},
	groupedCartText: {
		type: "string",
		default: "View products",
	},
	externalCartText: {
		type: "string",
		default: "Buy now",
	},
	defaultCartText: {
		type: "string",
		default: "Read more",
	},
	imageOverlayColor: {
		type: "string",
		default: "rgb(0 0 0 / 25%)",
	},
	productDescLength: {
		type: "string",
		default: "5",
	},
	loadMoreOptions: {
		type: "object",
	},
	loadMoreColorType: {
		type: "string",
		default: "normal",
	},
	loadMoreColor: {
		type: "string",
		default: "#333333",
	},
	loadMoreBgColor: {
		type: "string",
		default: "#e3e3e3",
	},
	loadMoreHoverColor: {
		type: "string",
		default: "#ffffff",
	},
	loadMoreHoverBgColor: {
		type: "string",
		default: "#d18df1",
	},
	loadMoreActiveColor: {
		type: "string",
		default: "#ffffff",
	},
	loadMoreActiveBgColor: {
		type: "string",
		default: "#d18df1",
	},
	...generateTypographyAttributes(Object.values(typoPrefixs)),
	...generateResponsiveRangeAttributes(RATING_ICON_SIZE),
	...generateResponsiveRangeAttributes(IMG_GAP, { defaultRange: 10 }),
	...generateResponsiveRangeAttributes(IMG_WIDTH),
	...generateResponsiveRangeAttributes(IMG_HEIGHT, { defaultRange: 200 }),
	...generateResponsiveRangeAttributes(GRID_SPACING, {
		defaultRange: 15,
	}),
	...generateResponsiveRangeAttributes(COLUMNS, {
		defaultRange: 4,
	}),
	...generateBorderShadowAttributes(BTN_BORDER_SHADOW),
	...generateBorderShadowAttributes(SALE_BADGE_BORDER, {
		noShadow: true,
		noBdrHover: true,
	}),
	// border shadow attributes ⬇
	...generateBorderShadowAttributes(WRAPPER_BORDER_SHADOW, {
		bdrDefaults: {
			top: 0,
			bottom: 0,
			right: 0,
			left: 0,
		},
	}),
	...generateBorderShadowAttributes(PRODUCTS_BORDER_SHADOW),
	...generateBorderShadowAttributes(IMAGE_BORDER_SHADOW),
	// background attributes ⬇
	...generateBackgroundAttributes(WRAPPER_BG, {
		defaultBgGradient: "linear-gradient(45deg,#ffffff,#ffffff)",
	}),
	// margin padding attributes ⬇
	...generateDimensionsAttributes(WRAPPER_MARGIN),
	...generateDimensionsAttributes(WRAPPER_PADDING),
	...generateDimensionsAttributes(CONTENT_PADDING),
	...generateDimensionsAttributes(IMAGE_PADDING),
	...generateDimensionsAttributes(TITLE_MARGIN),
	...generateDimensionsAttributes(RATING_MARGIN),
	...generateDimensionsAttributes(PRICE_MARGIN),
	...generateDimensionsAttributes(BUTTON_MARGIN),
	...generateDimensionsAttributes(DESC_MARGIN),
	TABcolumnsRange: {
		type: "number",
		default: 3,
	},
	TABgridSpaceRange: {
		type: "number",
		default: 10,
	},
	MOBcolumnsRange: { type: "number", default: 1 },
	MOBgridSpaceRange: { type: "number", default: 0 },
	...generateDimensionsAttributes(LOADMORE_PADDING, {
		top: 5,
		bottom: 5,
		right: 10,
		left: 10,
		isLinked: false,
	}),
	...generateDimensionsAttributes(LOADMORE_MARGIN, {
		top: 10,
		bottom: 10,
		right: 5,
		left: 5,
		isLinked: false,
	}),
	// border shadow attributes ⬇
	...generateBorderShadowAttributes(LOADMORE_BORDER_SHADOW, {
		noShadow: true,
		defaultBdrColor: "#c3c3c3",
		defaultBdrStyle: "solid",
		bdrDefaults: {
			top: 1,
			right: 1,
			bottom: 1,
			left: 1,
		},
		rdsDefaults: {
			top: 4,
			right: 4,
			bottom: 4,
			left: 4,
		},
		// noBorder: true,
	}),
};

export default attributes;
