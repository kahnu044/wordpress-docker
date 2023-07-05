import * as typoPrefixs from "./constants/typographyPrefixConstants";

import {
	prefixWrapBg,
	prefixActNavBg,
	prefixContentBg,
	prefixTtlWrpBg,
} from "./constants/backgroundsConstants";

import {
	prefixWrapBdShadow,
	prefixNavBdShadow,
	prefixActNavBdShadow,
	prefixContentBdShadow,
	prefixDropdownItemBdShadow,
	prefixNavDropdownBdShadow,
	prefixHamburgerItemBdShadow,
} from "./constants/borderShadowConstants";

import {
	prefixWrapperMargin,
	prefixWrapperPadding,
	prefixNavPadding,
	prefixNavMargin,
	prefixNavDropdownPadding,
	prefixNavDropdownMargin,
	prefixDropdownItemPadding,
	prefixTtlWrpMargin,
	prefixTtlWrpPadding,
	prefixNavHamburgerPadding,
	prefixHamburgerItemPadding,
	prefixHamburgerBtnPadding,
} from "./constants/dimensionsConstants";

import {
	prefixTitleMinWidth,
	prefixIconSize,
	prefixIconGap,
	prefixCaretSize,
	prefixDropdownWidth,
	prefixHamburerBtnSize,
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

	//
	layout: {
		type: "string",
		default: "is-horizontal",
	},

	preset: {
		type: "string",
		default: "preset-1",
	},
	verticalPreset: {
		type: "string",
		default: "vertical-preset-1",
	},

	navAlign: {
		type: "string",
		default: "items-justified-left",
	},

	dropdownOpenOnClick: {
		type: "boolean",
		default: false,
	},
	showDropdownIcon: {
		type: "boolean",
		default: true,
	},

	navBtnType: {
		type: "boolean",
		default: true,
	},

	//
	navTextColor: {
		type: "string",
		default: "#6A72A5",
	},
	hvNavTextColor: {
		type: "string",
		default: "#2673FF",
	},
	actNavTextColor: {
		type: "string",
		default: "#2673FF",
	},
	actHvNavTextColor: {
		type: "string",
		default: "#2673FF",
	},
	navBgColor: {
		type: "string",
		default: "#ffffff",
	},
	hvNavBgColor: {
		type: "string",
		default: "#2673FF",
	},
	actNavBgColor: {
		type: "string",
		default: "#2673FF",
	},
	actHvNavBgColor: {
		type: "string",
		default: "#2673FF",
	},
	iconColor: {
		type: "string",
		default: "#555555",
	},

	hvIconColor: {
		type: "string",
	},

	actIconColor: {
		type: "string",
		default: "#ffffff",
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

	navDropdownTextColor: {
		type: "string",
		default: "#6A72A5",
	},
	hvNavDropdownTextColor: {
		type: "string",
		default: "#2673FF",
	},
	actNavDropdownTextColor: {
		type: "string",
		default: "#2673FF",
	},
	actHvNavDropdownTextColor: {
		type: "string",
		default: "#2673FF",
	},

	navDropdownBgColor: {
		type: "string",
		default: "#ffffff",
	},
	hvNavDropdownBgColor: {
		type: "string",
		default: "#555555",
	},
	actNavDropdownBgColor: {
		type: "string",
		default: "#555555",
	},
	actHvNavDropdownBgColor: {
		type: "string",
		default: "#555555",
	},

	// Dropdown Menu
	dropdownItemBgColor: {
		type: "string",
		default: "#ffffff",
	},

	hvDropdownItemBgColor: {
		type: "string",
		default: "#ffffff",
	},
	actDropdownItemBgColor: {
		type: "string",
		default: "#ffffff",
	},
	actHvDropdownItemBgColor: {
		type: "string",
		default: "#ffffff",
	},
	actColorTransition: {
		type: "number",
	},

	//
	navDividerColor: {
		type: "string",
		default: "#d9d9d9",
	},
	verticalNavDividerColor: {
		type: "string",
		default: "#d9d9d9",
	},
	navDropdownDividerColor: {
		type: "string",
		default: "#d9d9d9",
	},

	// Hamburger Menu
	navHamburgerBgColor: {
		type: "string",
		default: "#2673FF",
	},
	navHamburgerTextColor: {
		type: "string",
		default: "#ffffff",
	},
	hvNavHamburgerTextColor: {
		type: "string",
		default: "#ffffff",
	},

	hamburgerItemBgColor: {
		type: "string",
		default: "#0059FC",
	},
	hvHamburgerItemBgColor: {
		type: "string",
		default: "#0059FC",
	},
	actNavHamburgerTextColor: {
		type: "string",
		default: "#ffffff",
	},
	actHamburgerItemBgColor: {
		type: "string",
		default: "#ffffff",
	},
	actHvNavHamburgerTextColor: {
		type: "string",
		default: "#ffffff",
	},
	actHvHamburgerItemBgColor: {
		type: "string",
		default: "#ffffff",
	},
	hamburgerCloseIconColor: {
		type: "string",
		default: "#ffffff",
	},

	navHamburgerBtnColor: {
		type: "string",
		default: "#2673FF",
	},

	//
	flexWrap: {
		type: "boolean",
		default: false,
	},
	hamburgerMenu: {
		type: "string",
		default: "mobile",
	},

	navVerticalAlign: {
		type: "string",
		default: "items-justified-left",
	},
	//
	showCaret: {
		type: "boolean",
		default: true,
	},
	caretColor: {
		type: "string",
		default: "#6A72A5",
	},
	hvCaretColor: {
		type: "string",
		default: "#2673FF",
	},

	hamburgerCloseIconAlign: {
		type: "string",
		default: "close-icon-right",
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
		defaultRange: 15,
		noUnits: true,
		// defaultUnit: "%", // if 'noUnits: true' is also passed here then 'defaultUnit' won't work, also it doesn't make sense to pass a defaultUnit when No units given
	}),
	...generateResponsiveRangeAttributes(prefixDropdownWidth, {
		defaultRange: 200,
		noUnits: true,
		// defaultUnit: "%", // if 'noUnits: true' is also passed here then 'defaultUnit' won't work, also it doesn't make sense to pass a defaultUnit when No units given
	}),

	...generateResponsiveRangeAttributes(prefixHamburerBtnSize, {
		defaultRange: 30,
		noUnits: true,
		// defaultUnit: "%", // if 'noUnits: true' is also passed here then 'defaultUnit' won't work, also it doesn't make sense to pass a defaultUnit when No units given
	}),

	//
	// Background Control Attributes
	...generateBackgroundAttributes(prefixWrapBg, {
		defaultFillColor: "#ffffff",
		// isBgDefaultGradient: true,
		// noOverlay: true,
		// noMainBgi: true,
		defaultBgGradient: "linear-gradient(45deg,#ffffff,#ffffff)",
		// noOverlayBgi: true, // if 'noOverlay : true' is given then there's no need to give 'noOverlayBgi : true'
	}),

	...generateBackgroundAttributes(prefixActNavBg, {
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
		bdrDefaults: {
			top: 0,
			bottom: 0,
			right: 0,
			left: 0,
		},
		rdsDefaults: {
			top: 5,
			bottom: 5,
			right: 5,
			left: 5,
		},
		// noShadow: true,
		// noBorder: true,
	}),
	...generateBorderShadowAttributes(prefixNavDropdownBdShadow, {
		rdsDefaults: {
			top: 5,
			bottom: 5,
			right: 5,
			left: 5,
		},
	}),
	...generateBorderShadowAttributes(prefixDropdownItemBdShadow, {
		rdsDefaults: {
			top: 3,
			bottom: 3,
			right: 3,
			left: 3,
		},
	}),
	...generateBorderShadowAttributes(prefixNavBdShadow, {
		rdsDefaults: {
			top: 3,
			bottom: 3,
			right: 3,
			left: 3,
		},
	}),
	...generateBorderShadowAttributes(prefixActNavBdShadow),
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
	...generateBorderShadowAttributes(prefixHamburgerItemBdShadow),

	//
	// dimensions Control related Attributes
	...generateDimensionsAttributes(prefixWrapperMargin, {
		// top: 20,
		// bottom: 20,
		// isLinked: false,
	}),
	...generateDimensionsAttributes(prefixWrapperPadding),
	...generateDimensionsAttributes(prefixNavPadding, {
		top: 20,
		bottom: 20,
		left: 10,
		right: 10,
		// isLinked: false,
	}),
	...generateDimensionsAttributes(prefixNavMargin),
	...generateDimensionsAttributes(prefixNavDropdownMargin),
	...generateDimensionsAttributes(prefixDropdownItemPadding, {
		top: 10,
		bottom: 10,
		left: 10,
		right: 10,
		isLinked: false,
	}),
	...generateDimensionsAttributes(prefixNavDropdownPadding, {
		top: 5,
		bottom: 5,
		left: 5,
		right: 5,
		isLinked: false,
	}),
	...generateDimensionsAttributes(prefixTtlWrpMargin),
	...generateDimensionsAttributes(prefixTtlWrpPadding),
	...generateDimensionsAttributes(prefixNavHamburgerPadding, {
		top: 5,
		bottom: 5,
		left: 5,
		right: 5,
		isLinked: false,
	}),
	...generateDimensionsAttributes(prefixHamburgerItemPadding, {
		top: 5,
		bottom: 5,
		left: 5,
		right: 5,
		isLinked: false,
	}),

	...generateDimensionsAttributes(prefixHamburgerBtnPadding, {
		top: 10,
		bottom: 10,
		left: 10,
		right: 10,
		isLinked: false,
	}),
};

export default attributes;
