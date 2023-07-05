import {
	WRAPPER_MARGIN,
	WRAPPER_PADDING,
	WRAPPER_BORDER_SHADOW,
	WRAPPER_BG,
	COLUMNS,
	COLUMN_GAP,
	COLUMN_PADDING,
	COLUMN_BG,
	COLUMN_BORDER_SHADOW,
	THUMBNAIL_IMAGE_SIZE,
	THUMBNAIL_BORDER_RADIUS,
	THUMBNAIL_MARGIN,
	TITLE_MARGIN,
	CONTENT_MARGIN,
	READMORE_MARGIN,
	READMORE_PADDING,
    READMORE_BORDER_SHADOW,
	HEADER_META_MARGIN,
	FOOTER_META_MARGIN,
	HEADER_META_SPACE,
	FOOTER_META_SPACE,
	AVATAR_BORDER_RADIUS,
	COLUMN_MEDIA_WIDTH,
	LOADMORE_PADDING,
	LOADMORE_MARGIN,
	LOADMORE_BORDER_SHADOW,
	FILTER_MARGIN,
	FILTER_ITEM_PADDING,
	FILTER_ITEM_BORDER_SHADOW,
	FILTER_ITEM_GAP,
} from "./constants/constants";

// import {
// 	generateDimensionsAttributes,
// 	generateTypographyAttributes,
// 	generateBackgroundAttributes,
// 	generateBorderShadowAttributes,
// 	generateResponsiveRangeAttributes
// } from "../../../util/helpers";

const {
	generateDimensionsAttributes,
	generateTypographyAttributes,
	generateBackgroundAttributes,
	generateBorderShadowAttributes,
	generateResponsiveRangeAttributes
} = window.EBControls;

import * as typographyObjs from "./constants/typographyPrefixConstants";

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

	queryData: {
		type: "object"
	},
	queryResults: {
		type: "array"
	},
	postTerms: {
		type: "object",
		default: {}
	},

	preset: {
		type: "string",
		default: "style-1"
	},
	showThumbnail: {
		type: "boolean",
		default: true
	},
	thumbnailOverlayColor: {
		type: "string",
		default: 'rgba(0 0 0 / 0)'
	},
	thumbnailOverlayHoverColor: {
		type: "string",
		default: 'rgba(0 0 0 / 0.5)'
	},
	thumbnailSize: {
		type: "string"
	},
	styleVerticalAlignment: {
		type: "string",
		default: "flex-start"
	},
	showTitle: {
		type: "boolean",
		default: true
	},
	titleColor: {
		type: "string",
		default: "#333333"
	},
	titleHoverColor: {
		type: "string",
		default: "#333333"
	},
	titleColorStyle: {
		type: "string",
		default: "normal"
	},
	titleLength: {
		type: "number",
	},
	titleTextAlign: {
		type: "string",
		default: "left"
	},
	titleTag: {
		type: "string",
		default: "h2"
	},
	showContent: {
		type: "boolean",
		default: true
	},
	contentColor: {
		type: "string",
		default: "#333333"
	},
	contentTextAlign: {
		type: "string",
		default: "left"
	},
	contentLength: {
		type: "number",
		default: 20
	},
	expansionIndicator: {
		type: "string",
		default: "..."
	},
	showReadMore: {
		type: "boolean",
		default: false
	},
	readmoreText: {
		type: "string",
		default: "Read More"
	},
	readmoreColor: {
		type: "string",
		default: "#3d8fd4"
	},
	readmoreBGColor: {
		type: "string",
	},
	readmoreTextAlign: {
		type: "string",
		default: "left"
	},
	readmoreHoverColor: {
		type: "string",
		default: "#333333"
	},
	readmoreBGHoverColor: {
		type: "string",
	},
	readmoreColorType: {
		type: "string",
		default: "normal"
	},
	showMeta: {
		type: "boolean",
		default: true
	},
	headerMeta: {
		type: "string",
		default: '[{"value":"category","label":"Categories"}]'
	},
	footerMeta: {
		type: "string",
		default: '[{"value":"avatar","label":"Author Avatar"},{"value":"author","label":"Author Name"},{"value":"date","label":"Published Date"}]'
	},
    authorPrefix: {
        type: "string",
        default: "by"
    },
    datePrefix: {
        type: "string",
        default: "on"
    },
	headerMetaTextAlign: {
		type: "string",
		default: "left"
	},
	footerMetaTextAlign: {
		type: "string",
		default: "left"
	},
	authorMetaColor: {
		type: "string",
		default: "#3d8fd4"
	},
	authorMetaHoverColor: {
		type: "string",
		default: "#549edc"
	},
	metaColorType: {
		type: "string",
		default: "normal"
	},
	commonMetaColor: {
		type: "string",
		default: "#ffffff"
	},
	commonMetaHoverColor: {
		type: "string",
		default: "#ffffff"
	},
	commonMetaBgColor: {
		type: "string",
		default: "#c668f2"
	},
	commonMetaBgHoverColor: {
		type: "string",
		default: "#ac61d0"
	},
	categoryMetaColor: {
		type: "string",
		default: "#ffffff"
	},
	categoryMetaHoverColor: {
		type: "string",
		default: "#ffffff"
	},
	categoryMetaBgColor: {
		type: "string",
		default: "#d18df1"
	},
	categoryMetaBgHoverColor: {
		type: "string",
		default: "#ac61d0"
	},
	tagMetaColor: {
		type: "string",
		default: "#ffffff"
	},
	tagMetaHoverColor: {
		type: "string",
		default: "#ffffff"
	},
	tagMetaBgColor: {
		type: "string",
		default: "#3f6ddc"
	},
	tagMetaBgHoverColor: {
		type: "string",
		default: "#2d59c3"
	},
	dateMetaColor: {
		type: "string",
		default: "#9e9e9e"
	},

	//Load More Attributes
	loadMoreOptions: {
		type: "object"
	},
	loadMoreColorType: {
		type: "string",
		default: "normal"
	},
	loadMoreColor: {
		type: "string",
		default: "#333333"
	},
	loadMoreBgColor: {
		type: "string",
		default: "#e3e3e3"
	},
	loadMoreHoverColor: {
		type: "string",
		default: "#ffffff"
	},
	loadMoreHoverBgColor: {
		type: "string",
		default: "#d18df1"
	},
	loadMoreActiveColor: {
		type: "string",
		default: "#ffffff"
	},
	loadMoreActiveBgColor: {
		type: "string",
		default: "#d18df1"
	},
	ReadTimeMetaColor: {
		type: "string",
		default: "#333333"
	},
	dynamicMetaColor: {
		type: "string",
		default: "#9e9e9e"
	},
	dynamicMetaBgColor: {
		type: "string",
	},

	//filter
	showTaxonomyFilter: {
		type: "boolean",
		default: false
	},
	selectedTaxonomy: {
		type: "string",
	},
	selectedTaxonomyItems: {
		type: "string",
		default: '[{"value":"all","label":"All"}]'
	},
	filterColorStyle: {
		type: "stroing",
		default: "normal"
	},
	filterBgColor: {
		type: "string",
		default: "#ffffff"
	},
	filterTextColor: {
		type: "string",
		default: "#b469d7"
	},
	filterActiveBgColor: {
		type: "string",
		default: "#d18df1"
	},
	filterActiveTextColor: {
		type: "string",
		default: "#ffffff"
	},
	filterHoverBgColor: {
		type: "string",
		default: "#d18df1"
	},
	filterHoverTextColor: {
		type: "string",
		default: "#ffffff"
	},

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
		defaultBdrColor: '#c3c3c3',
		defaultBdrStyle: 'solid',
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
	...generateBorderShadowAttributes(READMORE_BORDER_SHADOW, {
		noShadow: true,
		defaultBdrColor: '#F445FF',
		defaultBdrStyle: 'none',
		bdrDefaults: {
			top: 1,
			right: 1,
			bottom: 1,
			left: 1,
		},
		rdsDefaults: {
			top: 0,
			right: 0,
			bottom: 0,
			left: 0,
		},
		// noBorder: true,
	}),

	// typography attributes ⬇
	...generateTypographyAttributes(Object.values(typographyObjs)),

	// margin padding attributes ⬇
	...generateDimensionsAttributes(WRAPPER_MARGIN),
	...generateDimensionsAttributes(WRAPPER_PADDING),
	...generateDimensionsAttributes(COLUMN_PADDING),
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
	...generateDimensionsAttributes(READMORE_MARGIN, {
		top: 0,
		bottom: 10,
		right: 0,
		left: 0,
		isLinked: false,
	}),
	...generateDimensionsAttributes(READMORE_PADDING, {
		top: 0,
		bottom: 0,
		right: 0,
		left: 0,
		isLinked: false,
	}),
	...generateDimensionsAttributes(HEADER_META_MARGIN, {
		top: 0,
		bottom: 10,
		right: 0,
		left: 0,
		isLinked: false,
	}),
	...generateDimensionsAttributes(FOOTER_META_MARGIN, {
		top: 0,
		bottom: 10,
		right: 0,
		left: 0,
		isLinked: false,
	}),
	...generateDimensionsAttributes(THUMBNAIL_MARGIN, {
		top: 0,
		bottom: 10,
		right: 0,
		left: 0,
		isLinked: false,
	}),
	...generateDimensionsAttributes(FILTER_MARGIN, {
		top: 0,
		bottom: 20,
		right: 0,
		left: 0,
		isLinked: false,
	}),
	...generateDimensionsAttributes(FILTER_ITEM_PADDING, {
		top: 10,
		bottom: 10,
		right: 20,
		left: 20,
		isLinked: false,
	}),
	...generateDimensionsAttributes(THUMBNAIL_BORDER_RADIUS),
	...generateDimensionsAttributes(AVATAR_BORDER_RADIUS, {
		top: 50,
		bottom: 50,
		right: 50,
		left: 50,
		isLinked: true,
	}),

	// border shadow attributes ⬇
	...generateBorderShadowAttributes(WRAPPER_BORDER_SHADOW, {
		// noShadow: true,
		// noBorder: true,
	}),
	...generateBorderShadowAttributes(COLUMN_BORDER_SHADOW, {
		// noShadow: true,
		// noBorder: true,
	}),
	...generateBorderShadowAttributes(FILTER_ITEM_BORDER_SHADOW, {
		// noShadow: true,
		// noBorder: true,
	}),

	// background attributes ⬇
	...generateBackgroundAttributes(WRAPPER_BG, {
		noOverlay: true,
	}),
	...generateBackgroundAttributes(COLUMN_BG),

	// range controller
	...generateResponsiveRangeAttributes(COLUMNS, {
		defaultRange: 3,
	}),
	...generateResponsiveRangeAttributes(COLUMN_GAP, {
		defaultRange: 10,
	}),
	...generateResponsiveRangeAttributes(HEADER_META_SPACE, {
		defaultRange: 10,
	}),
	...generateResponsiveRangeAttributes(FOOTER_META_SPACE, {
		defaultRange: 10,
	}),
	...generateResponsiveRangeAttributes(THUMBNAIL_IMAGE_SIZE, {
		defaultRange: 250
	}),
	...generateResponsiveRangeAttributes(COLUMN_MEDIA_WIDTH, {
		defaultRange: 40,
		defaultUnit: "%"
	}),
	...generateResponsiveRangeAttributes(FILTER_ITEM_GAP, {
		defaultRange: 10,
	}),
};

export default attributes;
