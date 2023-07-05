/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
	useBlockProps,
	BlockControls,
	AlignmentToolbar,
} from "@wordpress/block-editor";
import { useEffect } from "@wordpress/element";
import { select } from "@wordpress/data";

/**
 * External depencencies
 */
import classnames from "classnames";

/**
 * Internal dependencies
 */

import Inspector from "./inspector";

import {
	connectorWidth,
	titleSpace,
	iconSize,
	listSpace,
	rowSpace,
	iconBackgroundSize,
	iconPadding,
	iconSpace,
	iconBackgroundType,
	iconBorder,
	wrapperMargin,
	wrapperPadding,
	boxPadding,
	boxBackgroundType,
	boxBorder,
	wrapperBackgroundType,
	wrapperBorder,
} from "./constants";

import {
	typoPrefix_title,
	typoPrefix_content,
} from "./constants/typographyPrefixConstants";

const {
	softMinifyCssStrings,
	duplicateBlockIdFix,
	generateDimensionsControlStyles,
	generateBackgroundControlStyles,
	generateBorderShadowStyles,
	generateTypographyStyles,
	generateResponsiveRangeStyles,
} = window.EBControls;

const edit = (props) => {
	const { attributes, isSelected, className, setAttributes, clientId } = props;
	const {
		blockId,
		blockMeta,
		// responsive control attribute ⬇
		resOption,
		featureListAlign,
		features,
		iconPosition,
		iconShape,
		shapeView,
		titleTag,
		titleTextColor = "#4F6592",
		titleTextHoverColor,
		descTextColor = "#5F77A7",
		iconGlobalColor = "#ffffff",
		showContentVertical,
		showConnector,
		connectorStyle,
		connectorType,
		connectorColor,
		classHook,
		useInlineDesign,
	} = attributes;

	const featureListAlignClass =
		featureListAlign === "center"
			? " eb-feature-list-center"
			: featureListAlign === "right"
			? " eb-feature-list-right"
			: " eb-feature-list-left";

	// title bottom space
	const {
		rangeStylesDesktop: titleBottomMarginDesktop,
		rangeStylesTab: titleBottomMarginTab,
		rangeStylesMobile: titleBottomMarginMobile,
	} = generateResponsiveRangeStyles({
		controlName: titleSpace,
		property: "margin-bottom",
		attributes,
		customUnit: "px",
	});

	//Connector Width
	const {
		rangeStylesDesktop: connectorWidthDesktop,
		rangeStylesTab: connectorWidthTab,
		rangeStylesMobile: connectorWidthMobile,
	} = generateResponsiveRangeStyles({
		controlName: connectorWidth,
		property: "border-width",
		attributes,
		customUnit: "px",
	});

	// icon font-size
	const {
		rangeStylesDesktop: iconFontSizeDesktop,
		rangeStylesTab: iconFontSizeTab,
		rangeStylesMobile: iconFontSizeMobile,
	} = generateResponsiveRangeStyles({
		controlName: iconSize,
		property: "font-size",
		attributes,
		customUnit: "px",
	});

	// list space between
	const {
		rangeStylesDesktop: listSpaceDesktop,
		rangeStylesTab: listSpaceTab,
		rangeStylesMobile: listSpaceMobile,
	} = generateResponsiveRangeStyles({
		controlName: listSpace,
		property: "padding-bottom",
		attributes,
		customUnit: "px",
	});

	// list space between
	const {
		rangeStylesDesktop: rowSpaceDesktop,
		rangeStylesTab: rowSpaceTab,
		rangeStylesMobile: rowSpaceMobile,
	} = generateResponsiveRangeStyles({
		controlName: rowSpace,
		property: "padding-bottom",
		attributes,
		customUnit: "px",
	});

	// icon area size
	const {
		rangeStylesDesktop: iconAreaSizeDesktop,
		rangeStylesTab: iconAreaSizeTab,
		rangeStylesMobile: iconAreaSizeMobile,
	} = generateResponsiveRangeStyles({
		controlName: iconBackgroundSize,
		property: "",
		attributes,
		customUnit: "px",
	});

	// icon padding
	const {
		dimensionStylesDesktop: iconPaddingDesktop,
		dimensionStylesTab: iconPaddingTab,
		dimensionStylesMobile: iconPaddingMobile,
	} = generateDimensionsControlStyles({
		controlName: iconPadding,
		styleFor: "padding",
		attributes,
	});

	// icon space
	const {
		rangeStylesDesktop: iconAreaSpaceDesktop,
		rangeStylesTab: iconAreaSpaceTab,
		rangeStylesMobile: iconAreaSpaceMobile,
	} = generateResponsiveRangeStyles({
		controlName: iconSpace,
		property: "",
		attributes,
		customUnit: "px",
	});

	// title typography
	const {
		typoStylesDesktop: titleTypoStylesDesktop,
		typoStylesTab: titleTypoStylesTab,
		typoStylesMobile: titleTypoStylesMobile,
	} = generateTypographyStyles({
		attributes,
		prefixConstant: typoPrefix_title,
		defaultFontSize: 18,
	});

	// content typography
	const {
		typoStylesDesktop: contentTypoStylesDesktop,
		typoStylesTab: contentTypoStylesTab,
		typoStylesMobile: contentTypoStylesMobile,
	} = generateTypographyStyles({
		attributes,
		prefixConstant: typoPrefix_content,
		defaultFontSize: 14,
	});

	// icon background
	const {
		backgroundStylesDesktop: iconBackgroundStylesDesktop,
		hoverBackgroundStylesDesktop: iconHoverBackgroundStylesDesktop,
		bgTransitionStyle: iconBgTransitionStyle,
	} = generateBackgroundControlStyles({
		attributes,
		controlName: iconBackgroundType,
		noOverlay: true,
		noMainBgi: true,
	});

	// icon area border
	const {
		styesDesktop: iconBorderStyesDesktop,
		styesTab: iconBorderStyesTab,
		styesMobile: iconBorderStyesMobile,
		stylesHoverDesktop: iconBorderStylesHoverDesktop,
		stylesHoverTab: iconBorderStylesHoverTab,
		stylesHoverMobile: iconBorderStylesHoverMobile,
		transitionStyle: iconBorderTransitionStyle,
	} = generateBorderShadowStyles({
		controlName: iconBorder,
		attributes,
	});

	// wrapper margin
	const {
		dimensionStylesDesktop: wrapperMarginDesktop,
		dimensionStylesTab: wrapperMarginTab,
		dimensionStylesMobile: wrapperMarginMobile,
	} = generateDimensionsControlStyles({
		controlName: wrapperMargin,
		styleFor: "margin",
		attributes,
	});

	// wrapper margin
	const {
		dimensionStylesDesktop: wrapperPaddingDesktop,
		dimensionStylesTab: wrapperPaddingTab,
		dimensionStylesMobile: wrapperPaddingMobile,
	} = generateDimensionsControlStyles({
		controlName: wrapperPadding,
		styleFor: "padding",
		attributes,
	});

	// content box padding
	const {
		dimensionStylesDesktop: boxPaddingDesktop,
		dimensionStylesTab: boxPaddingTab,
		dimensionStylesMobile: boxPaddingMobile,
	} = generateDimensionsControlStyles({
		controlName: boxPadding,
		styleFor: "padding",
		attributes,
	});

	// box background
	const {
		backgroundStylesDesktop: boxBackgroundStylesDesktop,
		hoverBackgroundStylesDesktop: boxHoverBackgroundStylesDesktop,
		bgTransitionStyle: boxBgTransitionStyle,
	} = generateBackgroundControlStyles({
		attributes,
		controlName: boxBackgroundType,
		noOverlay: true,
		noMainBgi: true,
	});

	// box area border
	const {
		styesDesktop: boxBorderStyesDesktop,
		styesTab: boxBorderStyesTab,
		styesMobile: boxBorderStyesMobile,
		stylesHoverDesktop: boxBorderStylesHoverDesktop,
		stylesHoverTab: boxBorderStylesHoverTab,
		stylesHoverMobile: boxBorderStylesHoverMobile,
		transitionStyle: boxBorderTransitionStyle,
	} = generateBorderShadowStyles({
		controlName: boxBorder,
		attributes,
	});

	// wrapper background
	const {
		backgroundStylesDesktop: wrpBackgroundStylesDesktop,
		hoverBackgroundStylesDesktop: wrpHoverBackgroundStylesDesktop,
		backgroundStylesTab: wrpBackgroundStylesTab,
		hoverBackgroundStylesTab: wrpHoverBackgroundStylesTab,
		backgroundStylesMobile: wrpBackgroundStylesMobile,
		hoverBackgroundStylesMobile: wrpHoverBackgroundStylesMobile,
		overlayStylesDesktop: wrpOverlayStylesDesktop,
		hoverOverlayStylesDesktop: wrpHoverOverlayStylesDesktop,
		overlayStylesTab: wrpOverlayStylesTab,
		hoverOverlayStylesTab: wrpHoverOverlayStylesTab,
		overlayStylesMobile: wrpOverlayStylesMobile,
		hoverOverlayStylesMobile: wrpHoverOverlayStylesMobile,
		bgTransitionStyle: wrpBgTransitionStyle,
		ovlTransitionStyle: wrpOvlTransitionStyle,
	} = generateBackgroundControlStyles({
		attributes,
		controlName: wrapperBackgroundType,
	});

	// wrapper area border
	const {
		styesDesktop: wrapperBorderStyesDesktop,
		styesTab: wrapperBorderStyesTab,
		styesMobile: wrapperBorderStyesMobile,
		stylesHoverDesktop: wrapperBorderStylesHoverDesktop,
		stylesHoverTab: wrapperBorderStylesHoverTab,
		stylesHoverMobile: wrapperBorderStylesHoverMobile,
		transitionStyle: wrapperBorderTransitionStyle,
	} = generateBorderShadowStyles({
		controlName: wrapperBorder,
		attributes,
	});

	const connector1position = (iconSize, paddingLeft, PaddingRight) => {
		iconSize = parseInt(iconSize.replace(/\D/g, ""));
		paddingLeft = paddingLeft ? parseInt(paddingLeft) : 0;
		PaddingRight = PaddingRight ? parseInt(PaddingRight) : 0;
		let position = 0;
		if (iconSize > paddingLeft + PaddingRight) {
			position = iconSize / 2;
		} else {
			position = (paddingLeft + PaddingRight) / 2;
		}
		return position;
	};

	const desktopStyles = `
		 .${blockId}.eb-feature-list-wrapper {
			 ${wrapperMarginDesktop}
			 ${wrapperPaddingDesktop}
			 ${wrpBackgroundStylesDesktop}
			 ${wrapperBorderStyesDesktop}
			 transition: all 0.3s, ${wrpBgTransitionStyle}, ${wrapperBorderTransitionStyle};
		 }

		 .${blockId}.eb-feature-list-wrapper:hover {
			${wrpHoverBackgroundStylesDesktop}
			${wrapperBorderStylesHoverDesktop}
		 }

		 .${blockId}.eb-feature-list-wrapper:before {
			${wrpOverlayStylesDesktop}
			transition: all 0.3s, ${wrpOvlTransitionStyle};
		 }

		 .${blockId}.eb-feature-list-wrapper:before:hover {
			${wrpHoverOverlayStylesDesktop}
		 }

		 ${
				showContentVertical
					? `
		 .${blockId}.eb-feature-list-wrapper .eb-feature-list-items .eb-feature-list-item {
			 align-items: center;
		 }
		 `
					: ""
			}

		 .${blockId}.eb-feature-list-wrapper .eb-feature-list-items .eb-feature-list-item .eb-feature-list-title {
			 ${titleBottomMarginDesktop}
		 }

		 .${blockId}.eb-feature-list-wrapper .eb-feature-list-items .eb-feature-list-icon-box .eb-feature-list-icon {
			 ${
					iconShape !== "none"
						? `
				 height: ${iconAreaSizeDesktop.replace(/\D/g, "")}px;
				 width:${iconAreaSizeDesktop.replace(/\D/g, "")}px;
				 `
						: ""
				}
			 ${iconFontSizeDesktop}
			 ${iconPaddingDesktop}
			 color: ${iconGlobalColor};
		 }

		 .${blockId}.eb-feature-list-wrapper .eb-feature-list-items .eb-feature-list-icon-box .eb-feature-list-icon img {
			 height: ${iconFontSizeDesktop.replace(/\D/g, "")}px;
			 width: ${iconFontSizeDesktop.replace(/\D/g, "")}px;
		 }

		 .${blockId}.eb-feature-list-wrapper .eb-feature-list-items .eb-feature-list-items .eb-feature-list-icon svg {
			 color: ${iconGlobalColor};
		 }

		 ${
				!useInlineDesign
					? `.${blockId}.eb-feature-list-wrapper .eb-feature-list-items .eb-feature-list-item:not(:last-child) {
			padding-bottom: calc(${listSpaceDesktop.replace(/\D/g, "") / 2}px);
		}

		.${blockId}.eb-feature-list-wrapper .eb-feature-list-items .eb-feature-list-item:not(:first-child) {
			padding-top: calc(${listSpaceDesktop.replace(/\D/g, "") / 2}px);
		}`
					: ""
			}

		 .${blockId}.eb-feature-list-wrapper.-icon-position-left .eb-feature-list-items .eb-feature-list-content-box, .${blockId}.eb-feature-list-wrapper.-icon-position-right .eb-feature-list-items .eb-feature-list-content-box, .${blockId}.eb-feature-list-wrapper.-icon-position-top .eb-feature-list-items .eb-feature-list-content-box {
			${boxPaddingDesktop}
			${boxBackgroundStylesDesktop}
			${boxBorderStyesDesktop}
			 margin: ${iconAreaSpaceDesktop.replace(/\D/g, "")}px;
			 transition: all 0.3s, ${boxBgTransitionStyle}, ${boxBorderTransitionStyle};
		 }

		 .${blockId}.eb-feature-list-wrapper.-icon-position-left .eb-feature-list-items .eb-feature-list-content-box:hover, .${blockId}.eb-feature-list-wrapper.-icon-position-right .eb-feature-list-items .eb-feature-list-content-box:hover, .${blockId}.eb-feature-list-wrapper.-icon-position-top .eb-feature-list-items .eb-feature-list-content-box:hover {
			${boxHoverBackgroundStylesDesktop}
			${boxBorderStylesHoverDesktop}
		 }

		 .${blockId}.eb-feature-list-wrapper.-mobile-icon-position-left .eb-feature-list-items .eb-feature-list-content-box {
			 margin: 0 0 0 ${iconAreaSpaceDesktop.replace(/\D/g, "")}px !important;
		 }

		 .${blockId}.eb-feature-list-wrapper.-mobile-icon-position-right .eb-feature-list-items .eb-feature-list-content-box {
			 margin: 0 ${iconAreaSpaceDesktop.replace(/\D/g, "")}px 0 0 !important;
		 }

		 .${blockId}.eb-feature-list-wrapper .eb-feature-list-items .eb-feature-list-content-box .eb-feature-list-title,
		 .${blockId}.eb-feature-list-wrapper .eb-feature-list-items .eb-feature-list-content-box .eb-feature-list-title > a,
		 .${blockId}.eb-feature-list-wrapper .eb-feature-list-items .eb-feature-list-content-box .eb-feature-list-title:visited {
			 color: ${titleTextColor};
		 }
		 ${
				titleTextHoverColor
					? ` .${blockId}.eb-feature-list-wrapper .eb-feature-list-items .eb-feature-list-content-box .eb-feature-list-title:hover,
		 .${blockId}.eb-feature-list-wrapper .eb-feature-list-items .eb-feature-list-content-box .eb-feature-list-title:hover > a {
				color: ${titleTextHoverColor};
		 }`
					: ""
			}


		 .${blockId}.eb-feature-list-wrapper .eb-feature-list-items .eb-feature-list-content-box .eb-feature-list-title, .${blockId}.eb-feature-list-wrapper .eb-feature-list-items .eb-feature-list-content-box .eb-feature-list-title a {
			 ${titleTypoStylesDesktop}
		 }

		 .${blockId}.eb-feature-list-wrapper .eb-feature-list-items .eb-feature-list-content-box .eb-feature-list-content {
			 color: ${descTextColor};
			 ${contentTypoStylesDesktop}
		 }

		 .${blockId}.eb-feature-list-wrapper .eb-feature-list-items .eb-feature-list-icon-box .eb-feature-list-icon-inner {
			 ${iconBackgroundStylesDesktop}
			 ${shapeView === "framed" ? iconBorderStyesDesktop : ""}
			 transition: ${(iconBgTransitionStyle, iconBorderTransitionStyle)};
		 }

		 .${blockId}.eb-feature-list-wrapper:hover .eb-feature-list-items .eb-feature-list-icon-box .eb-feature-list-icon-inner {
			 ${iconHoverBackgroundStylesDesktop}
			 ${shapeView === "framed" ? iconBorderStylesHoverDesktop : ""}
		 }
		 .${blockId}.eb-feature-list-wrapper.connector-style-1 .eb-feature-list-items .eb-feature-list-item .eb-feature-list-icon-box:before {
			border-left: ${connectorType + " " + connectorColor};
			${connectorWidthDesktop}
			top: ${parseInt(attributes.iconPaddingTop) * 2}px;
			height: calc(100% + ${parseInt(attributes.listSpaceRange)}px);
		 }

		 .${blockId}.eb-feature-list-wrapper.connector-style-2 .eb-feature-list-items .eb-feature-list-item:before {
			border-left: ${connectorType + " " + connectorColor};
			${connectorWidthDesktop}
		 }
		 .${blockId}.eb-feature-list-wrapper.connector-style-2 .eb-feature-list-items .eb-feature-list-icon-box:before {
			border-top: ${connectorType + " " + connectorColor};
			${connectorWidthDesktop}
		 }

		 ${
				useInlineDesign
					? `

		 	.${blockId}.eb-feature-list-wrapper .eb-inline-feature-list {
				display: inline-flex;
				flex-wrap: wrap;
			}

			.${blockId}.eb-feature-list-wrapper .eb-inline-feature-list li .eb-feature-list-title {
				margin: 0 !important;
			}


			.${blockId}.eb-feature-list-wrapper .eb-inline-feature-list li {
				padding-right: ${listSpaceDesktop.replace(/\D/g, "")}px;
				padding-bottom: ${rowSpaceDesktop.replace(/\D/g, "")}px;
			}
		 `
					: ""
			}
	`;

	const tabStyles = `
		 .${blockId}.eb-feature-list-wrapper {
			 ${wrapperMarginTab}
			 ${wrapperPaddingTab}
			 ${wrpBackgroundStylesTab}
			 ${wrapperBorderStyesTab}
		 }

		 .${blockId}.eb-feature-list-wrapper:hover {
			${wrpHoverBackgroundStylesTab}
			${wrapperBorderStylesHoverTab}
		 }

		 .${blockId}.eb-feature-list-wrapper:before {
			${wrpOverlayStylesTab}
		 }

		 .${blockId}.eb-feature-list-wrapper:before:hover {
			${wrpHoverOverlayStylesTab}
		 }

		 .${blockId}.eb-feature-list-wrapper .eb-feature-list-items .eb-feature-list-item .eb-feature-list-title {
			 ${titleBottomMarginTab}
		 }

		 .${blockId}.eb-feature-list-wrapper .eb-feature-list-items .eb-feature-list-icon-box .eb-feature-list-icon {
			 ${
					iconShape !== "none"
						? `
				 height: ${iconAreaSizeTab.replace(/\D/g, "")}px;
				 width:${iconAreaSizeTab.replace(/\D/g, "")}px;
				 `
						: ""
				}
			 ${iconFontSizeTab}
			 ${iconPaddingTab}
		 }

		 .${blockId}.eb-feature-list-wrapper .eb-feature-list-items .eb-feature-list-icon-box .eb-feature-list-icon img {
			 height: ${iconFontSizeTab.replace(/\D/g, "")}px;
			 width: ${iconFontSizeTab.replace(/\D/g, "")}px;
		 }

		 ${
				!useInlineDesign
					? `.${blockId}.eb-feature-list-wrapper .eb-feature-list-items .eb-feature-list-item:not(:last-child) {
			padding-bottom: calc(${listSpaceTab.replace(/\D/g, "") / 2}px);
		}

		.${blockId}.eb-feature-list-wrapper .eb-feature-list-items .eb-feature-list-item:not(:first-child) {
			padding-top: calc(${listSpaceTab.replace(/\D/g, "") / 2}px);
		}`
					: ""
			}

		 .${blockId}.eb-feature-list-wrapper.-icon-position-left .eb-feature-list-items .eb-feature-list-content-box, .${blockId}.eb-feature-list-wrapper.-icon-position-right .eb-feature-list-items .eb-feature-list-content-box, .${blockId}.eb-feature-list-wrapper.-icon-position-top .eb-feature-list-items .eb-feature-list-content-box{
			${boxPaddingTab}
			${boxBorderStyesTab}
			 margin: ${iconAreaSpaceTab.replace(/\D/g, "")}px;
		 }

		 .${blockId}.eb-feature-list-wrapper.-icon-position-left .eb-feature-list-items .eb-feature-list-content-box:hover, .${blockId}.eb-feature-list-wrapper.-icon-position-right .eb-feature-list-items .eb-feature-list-content-box:hover, .${blockId}.eb-feature-list-wrapper.-icon-position-top .eb-feature-list-items .eb-feature-list-content-box:hover{
			${boxBorderStylesHoverTab}
		 }

		 .${blockId}.eb-feature-list-wrapper.-mobile-icon-position-left .eb-feature-list-items .eb-feature-list-content-box {
			 margin: 0 0 0 ${iconAreaSpaceTab.replace(/\D/g, "")}px !important;
		 }

		 .${blockId}.eb-feature-list-wrapper.-mobile-icon-position-right .eb-feature-list-items .eb-feature-list-content-box {
			 margin: 0 ${iconAreaSpaceTab.replace(/\D/g, "")}px 0 0 !important;
		 }

		 .${blockId}.eb-feature-list-wrapper .eb-feature-list-items .eb-feature-list-content-box .eb-feature-list-title, .${blockId}.eb-feature-list-wrapper .eb-feature-list-items .eb-feature-list-content-box .eb-feature-list-title a {
			 ${titleTypoStylesTab}
		 }

		 .${blockId}.eb-feature-list-wrapper .eb-feature-list-items .eb-feature-list-content-box .eb-feature-list-content {
			 ${contentTypoStylesTab}
		 }

		 .${blockId}.eb-feature-list-wrapper .eb-feature-list-items .eb-feature-list-icon-box .eb-feature-list-icon-inner {
			 ${shapeView === "framed" ? iconBorderStyesTab : ""}
		 }

		 .${blockId}.eb-feature-list-wrapper:hover .eb-feature-list-items .eb-feature-list-icon-box .eb-feature-list-icon-inner {
			 ${shapeView === "framed" ? iconBorderStylesHoverTab : ""}
		 }
		 .${blockId}.eb-feature-list-wrapper.connector-style-1 .eb-feature-list-items .eb-feature-list-item .eb-feature-list-icon-box:before {
			${connectorWidthTab}
			height: calc(100% + ${parseInt(
				attributes.TABlistSpaceRange
					? attributes.TABlistSpaceRange
					: attributes.listSpaceRange
			)}px);
		 }
		 .${blockId}.eb-feature-list-wrapper.connector-style-2 .eb-feature-list-items .eb-feature-list-item:before {
			${connectorWidthTab}
		 }
		 .${blockId}.eb-feature-list-wrapper.connector-style-2 .eb-feature-list-items .eb-feature-list-icon-box:before {
			${connectorWidthTab}
		 }

		 ${
				useInlineDesign
					? `
		.${blockId}.eb-feature-list-wrapper .eb-inline-feature-list li {
			padding-right: ${listSpaceTab.replace(/\D/g, "")}px;
			padding-bottom: ${rowSpaceTab.replace(/\D/g, "")}px;
		}
	 `
					: ""
			}
	  `;

	const mobileStyles = `
		 .${blockId}.eb-feature-list-wrapper {
			 ${wrapperMarginMobile}
			 ${wrapperPaddingMobile}
			 ${wrpBackgroundStylesMobile}
			 ${wrapperBorderStyesMobile}
		 }

		 .${blockId}.eb-feature-list-wrapper:hover {
			${wrpHoverBackgroundStylesMobile}
			${wrapperBorderStylesHoverMobile}
		}

		.${blockId}.eb-feature-list-wrapper:before {
			${wrpOverlayStylesMobile}
		 }

		 .${blockId}.eb-feature-list-wrapper:before:hover {
			${wrpHoverOverlayStylesMobile}
		 }

		 .${blockId}.eb-feature-list-wrapper .eb-feature-list-items .eb-feature-list-item .eb-feature-list-title {
			 ${titleBottomMarginMobile}
		 }

		 .${blockId}.eb-feature-list-wrapper .eb-feature-list-items .eb-feature-list-icon-box .eb-feature-list-icon {
			 ${
					iconShape !== "none"
						? `
				 height: ${iconAreaSizeMobile.replace(/\D/g, "")}px;
				 width:${iconAreaSizeMobile.replace(/\D/g, "")}px;
				 `
						: ""
				}
			 ${iconFontSizeMobile}
			 ${iconPaddingMobile}
		 }

		 .${blockId}.eb-feature-list-wrapper .eb-feature-list-items .eb-feature-list-icon-box .eb-feature-list-icon img {
			 height: ${iconFontSizeMobile.replace(/\D/g, "")}px;
			 width: ${iconFontSizeMobile.replace(/\D/g, "")}px;
		 }

		 ${
				!useInlineDesign
					? `.${blockId}.eb-feature-list-wrapper .eb-feature-list-items .eb-feature-list-item:not(:last-child) {
			padding-bottom: calc(${listSpaceMobile.replace(/\D/g, "") / 2}px);
		}

		.${blockId}.eb-feature-list-wrapper .eb-feature-list-items .eb-feature-list-item:not(:first-child) {
			padding-top: calc(${listSpaceMobile.replace(/\D/g, "") / 2}px);
		}`
					: ""
			}

		 .${blockId}.eb-feature-list-wrapper.-icon-position-left .eb-feature-list-items .eb-feature-list-content-box, .${blockId}.eb-feature-list-wrapper.-icon-position-right .eb-feature-list-items .eb-feature-list-content-box, .${blockId}.eb-feature-list-wrapper.-icon-position-top .eb-feature-list-items .eb-feature-list-content-box {
			${boxPaddingMobile}
			${boxBorderStyesMobile}
			 margin: ${iconAreaSpaceMobile.replace(/\D/g, "")}px;
		 }

		 .${blockId}.eb-feature-list-wrapper.-icon-position-left .eb-feature-list-items .eb-feature-list-content-box:hover, .${blockId}.eb-feature-list-wrapper.-icon-position-right .eb-feature-list-items .eb-feature-list-content-box:hover, .${blockId}.eb-feature-list-wrapper.-icon-position-top .eb-feature-list-items .eb-feature-list-content-box:hover{
			${boxBorderStylesHoverMobile}
		 }

		 .${blockId}.eb-feature-list-wrapper.-mobile-icon-position-left .eb-feature-list-items .eb-feature-list-content-box {
			 margin: 0 0 0 ${iconAreaSpaceMobile.replace(/\D/g, "")}px !important;
		 }

		 .${blockId}.eb-feature-list-wrapper.-mobile-icon-position-right .eb-feature-list-items .eb-feature-list-content-box {
			 margin: 0 ${iconAreaSpaceMobile.replace(/\D/g, "")}px 0 0 !important;
		 }

		 .${blockId}.eb-feature-list-wrapper .eb-feature-list-items .eb-feature-list-content-box .eb-feature-list-title, .${blockId}.eb-feature-list-wrapper .eb-feature-list-items .eb-feature-list-content-box .eb-feature-list-title a {
			 ${titleTypoStylesMobile}
		 }

		 .${blockId}.eb-feature-list-wrapper .eb-feature-list-items .eb-feature-list-content-box .eb-feature-list-content {
			 ${contentTypoStylesMobile}
		 }

		 .${blockId}.eb-feature-list-wrapper .eb-feature-list-items .eb-feature-list-icon-box .eb-feature-list-icon-inner {
			 ${shapeView === "framed" ? iconBorderStyesMobile : ""}
		 }

		 .${blockId}.eb-feature-list-wrapper:hover .eb-feature-list-items .eb-feature-list-icon-box .eb-feature-list-icon-inner {
			 ${shapeView === "framed" ? iconBorderStylesHoverMobile : ""}
		 }
		 .${blockId}.eb-feature-list-wrapper.connector-style-1 .eb-feature-list-items .eb-feature-list-item .eb-feature-list-icon-box:before {
			${connectorWidthMobile}
			height: calc(100% + ${parseInt(
				attributes.MOBlistSpaceRange
					? attributes.MOBlistSpaceRange
					: attributes.listSpaceRange
			)}px);
		 }
		 .${blockId}.eb-feature-list-wrapper.connector-style-2 .eb-feature-list-items .eb-feature-list-item:before {
			${connectorWidthMobile}
		 }
		 .${blockId}.eb-feature-list-wrapper.connector-style-2 .eb-feature-list-items .eb-feature-list-icon-box:before {
			${connectorWidthMobile}
		 }
		 ${
				useInlineDesign
					? `
	.${blockId}.eb-feature-list-wrapper .eb-inline-feature-list li {
		padding-right: ${listSpaceMobile.replace(/\D/g, "")}px;
		padding-bottom: ${rowSpaceMobile.replace(/\D/g, "")}px;
	}
 `
					: ""
			}
	 `;

	// all css styles for large screen width (desktop/laptop) in strings ⬇
	const desktopAllStyles = softMinifyCssStrings(`
		   ${desktopStyles}
	   `);

	// all css styles for Tab in strings ⬇
	const tabAllStyles = softMinifyCssStrings(`
		   ${tabStyles}
	   `);

	// all css styles for Mobile in strings ⬇
	const mobileAllStyles = softMinifyCssStrings(`
		   ${mobileStyles}
	   `);

	// Set All Style in "blockMeta" Attribute
	useEffect(() => {
		const styleObject = {
			desktop: desktopAllStyles,
			tab: tabAllStyles,
			mobile: mobileAllStyles,
		};
		if (JSON.stringify(blockMeta) != JSON.stringify(styleObject)) {
			setAttributes({ blockMeta: styleObject });
		}
	}, [attributes]);

	useEffect(() => {
		// this useEffect is for creating an unique id for each block's unique className by a random unique number
		const BLOCK_PREFIX = "eb-feature-list";
		duplicateBlockIdFix({
			BLOCK_PREFIX,
			blockId,
			setAttributes,
			select,
			clientId,
		});

		// // this useEffect is for mimmiking css when responsive options clicked from wordpress's 'preview' button
		// mimmikCssForPreviewBtnClick({
		// 	domObj: document,
		// 	select,
		// });
	}, []);

	const blockProps = useBlockProps({
		className: classnames(className, `eb-guten-block-main-parent-wrapper`),
	});

	const featureListWrapperClass =
		iconShape !== "none" ? ` ${iconShape} ${shapeView}` : " none";
	const inlineDesignClass = useInlineDesign ? " eb-inline-feature-list" : "";

	useEffect(() => {
		if (features.length > 0) return;

		const defaultFeatures = [
			{
				iconType: "icon",
				icon: "fas fa-check",
				title: "Feature Item 1",
				content:
					"Lorem ipsum dolor sit amet, consectetur adipisi cing elit, sed do eiusmod tempor incididunt ut abore et dolore magna",
				iconColor: "",
				link: "",
				linkOpenNewTab: "false",
				iconBackgroundColor: "",
			},
			{
				iconType: "icon",
				icon: "fas fa-times",
				title: "Feature Item 2",
				content:
					"Lorem ipsum dolor sit amet, consectetur adipisi cing elit, sed do eiusmod tempor incididunt ut abore et dolore magna",
				iconColor: "",
				link: "",
				linkOpenNewTab: "false",
				iconBackgroundColor: "",
			},
			{
				iconType: "icon",
				icon: "fas fa-anchor",
				title: "Feature Item 3",
				content:
					"Lorem ipsum dolor sit amet, consectetur adipisi cing elit, sed do eiusmod tempor incididunt ut abore et dolore magna",
				iconColor: "",
				link: "",
				linkOpenNewTab: "false",
				iconBackgroundColor: "",
			},
		];

		setAttributes({ features: defaultFeatures });
	}, []);

	let iconStyle = {};

	return (
		<>
			{isSelected && (
				<Inspector attributes={attributes} setAttributes={setAttributes} />
			)}
			<div {...blockProps}>
				<style>
					{`
			${desktopAllStyles}

			/* mimmikcssStart */

			${resOption === "Tablet" ? tabAllStyles : " "}
			${resOption === "Mobile" ? tabAllStyles + mobileAllStyles : " "}

			/* mimmikcssEnd */

			@media all and (max-width: 1024px) {

				/* tabcssStart */
				${softMinifyCssStrings(tabAllStyles)}
				/* tabcssEnd */

			}

			@media all and (max-width: 767px) {

				/* mobcssStart */
				${softMinifyCssStrings(mobileAllStyles)}
				/* mobcssEnd */

			}
			`}
				</style>
				<div className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`}>
					<div
						className={`${blockId} eb-feature-list-wrapper -icon-position-${iconPosition} -tablet-icon-position-${iconPosition} -mobile-icon-position-${iconPosition}${featureListAlignClass} ${
							!useInlineDesign && showConnector
								? "connector-" + connectorStyle
								: ""
						}`}
					>
						<ul
							className={`eb-feature-list-items${featureListWrapperClass}${inlineDesignClass}`}
						>
							{features.map(
								(
									{
										title,
										iconType,
										featureImage,
										featureImageId,
										featureImageAlt,
										featureImageTitle,
										icon,
										iconColor,
										iconBackgroundColor,
										content,
										link,
										linkOpenNewTab,
									},
									index
								) => {
									{
										iconStyle = {
											color: iconColor,
											backgroundColor: iconBackgroundColor,
										};
									}
									return (
										<li
											key={index}
											className="eb-feature-list-item"
											data-new-tab={
												linkOpenNewTab ? linkOpenNewTab.toString() : "false"
											}
											data-icon-type={iconType}
											data-image={featureImage}
											data-image-id={featureImageId}
											data-alt={featureImageAlt}
											data-title={featureImageTitle}
											data-icon={icon}
											data-icon-color={iconColor}
											data-icon-background-color={iconBackgroundColor}
											data-link={link}
										>
											{iconType !== "none" && (
												<div className="eb-feature-list-icon-box">
													<div className="eb-feature-list-icon-inner">
														<span
															className="eb-feature-list-icon"
															style={iconStyle}
														>
															{iconType === "icon" && (
																<i aria-hidden="true" className={icon}></i>
															)}
															{iconType === "image" && (
																<img
																	className="eb-feature-list-img"
																	src={featureImage}
																	alt={
																		featureImageAlt
																			? featureImageAlt
																			: featureImageTitle
																	}
																/>
															)}
														</span>
													</div>
												</div>
											)}

											<div className="eb-feature-list-content-box">
												{link ? (
													<attributes.titleTag className="eb-feature-list-title">
														<a href={link}>{title}</a>
													</attributes.titleTag>
												) : (
													<attributes.titleTag className="eb-feature-list-title">
														{title}
													</attributes.titleTag>
												)}
												{!useInlineDesign && (
													<p className="eb-feature-list-content">{content}</p>
												)}
											</div>
										</li>
									);
								}
							)}
						</ul>
					</div>
				</div>
			</div>
		</>
	);
};

export default edit;
