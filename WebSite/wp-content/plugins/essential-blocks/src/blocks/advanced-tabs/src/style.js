
import { useState } from "@wordpress/element";

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

import {
    prefixTitleMinWidth,
    prefixIconSize,
    prefixIconGap,
    prefixSubtitleSpacing,
    prefixCaretSize,
} from "./constants/rangeNames";

import {
    softMinifyCssStrings,
    generateBackgroundControlStyles,
    generateDimensionsControlStyles,
    generateTypographyStyles,
    generateBorderShadowStyles,
    generateResponsiveRangeStyles,
    StyleComponent
} from "@essential-blocks/controls";

export default function Style(props) {
    const { attributes, setAttributes, name, isClickTab } = props;
    const {
        resOption,
        blockMeta,
        blockId,
        layout,
        mediaPositon,
        mediaAlign,
        iconColor,
        hvIconColor,
        textColor,
        hvTextColor,
        actIconColor,
        actHvIconColor,
        actTextColor,
        actHvTextColor,
        colorTransition,
        actColorTransition,
        showCaret,
        caretColor,
        carZ_Range,
        TABcarZ_Range = carZ_Range,
        MOBcarZ_Range = TABcarZ_Range || carZ_Range,
        isFillTitle,
        enableResponsiveLayout,
        verticalToHorizontal,
        subtitleColor,
        hvSubtitleColor,
        actSubtitleColor,
        actHvSubtitleColor,
        iconBgColor,
        iconhvBgColor,
        actIconBgColor,
        actHvIconBgColor,
        titleAlign,
        addCaretIcon,
        caretIcon,
    } = attributes;

    //
    // styles related to generateTypographyStyles start ⬇
    const {
        typoStylesDesktop: titleTypoStylesDesktop,
        typoStylesTab: titleTypoStylesTab,
        typoStylesMobile: titleTypoStylesMobile,
    } = generateTypographyStyles({
        attributes,
        prefixConstant: typoPrefixTabTitle,
    });

    const {
        typoStylesDesktop: subtitleTypoStylesDesktop,
        typoStylesTab: subtitleTypoStylesTab,
        typoStylesMobile: subtitleTypoStylesMobile,
    } = generateTypographyStyles({
        attributes,
        prefixConstant: typoPrefixTabSubtitle,
    });
    // styles related to generateTypographyStyles end

    // styles related to generateResponsiveRangeStyles start ⬇
    const {
        rangeStylesDesktop: titleMinWidthDesktop,
        rangeStylesTab: titleMinWidthTab,
        rangeStylesMobile: titleMinWidthMobile,
    } = generateResponsiveRangeStyles({
        controlName: prefixTitleMinWidth,
        property: "min-width",
        attributes,
    });

    const {
        rangeStylesDesktop: iconSizeDesktop,
        rangeStylesTab: iconSizeTab,
        rangeStylesMobile: iconSizeMobile,
    } = generateResponsiveRangeStyles({
        controlName: prefixIconSize,
        property: "font-size",
        attributes,
        customUnit: "px",
    });

    const {
        rangeStylesDesktop: iconWidthDesktop,
        rangeStylesTab: iconWidthTab,
        rangeStylesMobile: iconWidthMobile,
    } = generateResponsiveRangeStyles({
        controlName: prefixIconSize,
        property: "width",
        attributes,
        customUnit: "px",
    });

    const {
        rangeStylesDesktop: iconHeightDesktop,
        rangeStylesTab: iconHeightTab,
        rangeStylesMobile: iconHeightMobile,
    } = generateResponsiveRangeStyles({
        controlName: prefixIconSize,
        property: "height",
        attributes,
        customUnit: "px",
    });

    const {
        rangeStylesDesktop: imageWidthDesktop,
        rangeStylesTab: imageWidthTab,
        rangeStylesMobile: imageWidthMobile,
    } = generateResponsiveRangeStyles({
        controlName: prefixIconSize,
        property: "width",
        attributes,
        customUnit: "px",
    });

    const {
        rangeStylesDesktop: iconGapDesktop,
        rangeStylesTab: iconGapTab,
        rangeStylesMobile: iconGapMobile,
    } = generateResponsiveRangeStyles({
        controlName: prefixIconGap,
        property: "gap",
        attributes,
        customUnit: "px",
    });

    const {
        rangeStylesDesktop: subtitleSpacingDesktop,
        rangeStylesTab: subtitleSpacingTab,
        rangeStylesMobile: subtitleSpacingMobile,
    } = generateResponsiveRangeStyles({
        controlName: prefixSubtitleSpacing,
        property: "margin-top",
        attributes,
        customUnit: "px",
    });

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
        controlName: prefixWrapBg,
    });

    const {
        backgroundStylesDesktop: ttlBackgroundStylesDesktop,
        hoverBackgroundStylesDesktop: ttlHoverBackgroundStylesDesktop,
        backgroundStylesTab: ttlBackgroundStylesTab,
        hoverBackgroundStylesTab: ttlHoverBackgroundStylesTab,
        backgroundStylesMobile: ttlBackgroundStylesMobile,
        hoverBackgroundStylesMobile: ttlHoverBackgroundStylesMobile,
        bgTransitionStyle: ttlBgTransitionStyle,
    } = generateBackgroundControlStyles({
        attributes,
        controlName: prefixTitleBg,
        noOverlay: true,
    });

    const {
        backgroundStylesDesktop: actTlBackgroundStylesDesktop,
        hoverBackgroundStylesDesktop: actTlHoverBackgroundStylesDesktop,
        backgroundStylesTab: actTlBackgroundStylesTab,
        hoverBackgroundStylesTab: actTlHoverBackgroundStylesTab,
        backgroundStylesMobile: actTlBackgroundStylesMobile,
        hoverBackgroundStylesMobile: actTlHoverBackgroundStylesMobile,
        bgTransitionStyle: actTlBgTransitionStyle,
    } = generateBackgroundControlStyles({
        attributes,
        controlName: prefixActTitleBg,
        noOverlay: true,
    });

    const {
        backgroundStylesDesktop: contentBackgroundStylesDesktop,
        hoverBackgroundStylesDesktop: contentHoverBackgroundStylesDesktop,
        backgroundStylesTab: contentBackgroundStylesTab,
        hoverBackgroundStylesTab: contentHoverBackgroundStylesTab,
        backgroundStylesMobile: contentBackgroundStylesMobile,
        hoverBackgroundStylesMobile: contentHoverBackgroundStylesMobile,
        bgTransitionStyle: contentBgTransitionStyle,
    } = generateBackgroundControlStyles({
        attributes,
        controlName: prefixContentBg,
        noOverlay: true,
    });

    const {
        backgroundStylesDesktop: titleWrapBackgroundStylesDesktop,
        hoverBackgroundStylesDesktop: titleWrapHoverBackgroundStylesDesktop,
        backgroundStylesTab: titleWrapBackgroundStylesTab,
        hoverBackgroundStylesTab: titleWrapHoverBackgroundStylesTab,
        backgroundStylesMobile: titleWrapBackgroundStylesMobile,
        hoverBackgroundStylesMobile: titleWrapHoverBackgroundStylesMobile,
        bgTransitionStyle: titleWrapBgTransitionStyle,
    } = generateBackgroundControlStyles({
        attributes,
        controlName: prefixTtlWrpBg,
        noOverlay: true,
    });

    // styles related to generateBackgroundControlStyles end

    // styles related to generateDimensionsControlStyles start ⬇
    const {
        dimensionStylesDesktop: wrpMarginDesktop,
        dimensionStylesTab: wrpMarginTab,
        dimensionStylesMobile: wrpMarginMobile,
    } = generateDimensionsControlStyles({
        attributes,
        controlName: prefixWrapperMargin,
        styleFor: "margin",
    });

    const {
        dimensionStylesDesktop: wrpPaddingDesktop,
        dimensionStylesTab: wrpPaddingTab,
        dimensionStylesMobile: wrpPaddingMobile,
    } = generateDimensionsControlStyles({
        attributes,
        controlName: prefixWrapperPadding,
        styleFor: "padding",
    });

    const {
        dimensionStylesDesktop: titleMarginDesktop,
        dimensionStylesTab: titleMarginTab,
        dimensionStylesMobile: titleMarginMobile,
    } = generateDimensionsControlStyles({
        attributes,
        controlName: prefixTitleMargin,
        styleFor: "margin",
    });

    const {
        dimensionStylesDesktop: titlePaddingDesktop,
        dimensionStylesTab: titlePaddingTab,
        dimensionStylesMobile: titlePaddingMobile,
    } = generateDimensionsControlStyles({
        attributes,
        controlName: prefixTitlePadding,
        styleFor: "padding",
    });

    const {
        dimensionStylesDesktop: contentMarginDesktop,
        dimensionStylesTab: contentMarginTab,
        dimensionStylesMobile: contentMarginMobile,
    } = generateDimensionsControlStyles({
        attributes,
        controlName: prefixContentMargin,
        styleFor: "margin",
    });

    const {
        dimensionStylesDesktop: contentPaddingDesktop,
        dimensionStylesTab: contentPaddingTab,
        dimensionStylesMobile: contentPaddingMobile,
    } = generateDimensionsControlStyles({
        attributes,
        controlName: prefixContentPadding,
        styleFor: "padding",
    });

    const {
        dimensionStylesDesktop: titleWrapMarginDesktop,
        dimensionStylesTab: titleWrapMarginTab,
        dimensionStylesMobile: titleWrapMarginMobile,
    } = generateDimensionsControlStyles({
        attributes,
        controlName: prefixTtlWrpMargin,
        styleFor: "margin",
    });

    const {
        dimensionStylesDesktop: titleWrapPaddingDesktop,
        dimensionStylesTab: titleWrapPaddingTab,
        dimensionStylesMobile: titleWrapPaddingMobile,
    } = generateDimensionsControlStyles({
        attributes,
        controlName: prefixTtlWrpPadding,
        styleFor: "padding",
    });
    // styles related to generateDimensionsControlStyles end

    // styles related to generateBorderShadowStyles start ⬇
    const {
        styesDesktop: wrpBdShdStyesDesktop,
        styesTab: wrpBdShdStyesTab,
        styesMobile: wrpBdShdStyesMobile,
        stylesHoverDesktop: wrpBdShdStylesHoverDesktop,
        stylesHoverTab: wrpBdShdStylesHoverTab,
        stylesHoverMobile: wrpBdShdStylesHoverMobile,
        transitionStyle: wrpBdShdTransitionStyle,
    } = generateBorderShadowStyles({
        controlName: prefixWrapBdShadow,
        attributes,
        // noShadow: true,
        // noBorder: true,
    });

    const {
        styesDesktop: ttlBdShdStyesDesktop,
        styesTab: ttlBdShdStyesTab,
        styesMobile: ttlBdShdStyesMobile,
        stylesHoverDesktop: ttlBdShdStylesHoverDesktop,
        stylesHoverTab: ttlBdShdStylesHoverTab,
        stylesHoverMobile: ttlBdShdStylesHoverMobile,
        transitionStyle: ttlBdShdTransitionStyle,
    } = generateBorderShadowStyles({
        controlName: prefixTitleBdShadow,
        attributes,
        // noShadow: true,
        // noBorder: true,
    });

    const {
        styesDesktop: actTlBdShdStyesDesktop,
        styesTab: actTlBdShdStyesTab,
        styesMobile: actTlBdShdStyesMobile,
        stylesHoverDesktop: actTlBdShdStylesHoverDesktop,
        stylesHoverTab: actTlBdShdStylesHoverTab,
        stylesHoverMobile: actTlBdShdStylesHoverMobile,
        transitionStyle: actTlBdShdTransitionStyle,
    } = generateBorderShadowStyles({
        controlName: prefixActTitleBdShadow,
        attributes,
        // noShadow: true,
        // noBorder: true,
    });

    const {
        styesDesktop: contentBdShdStyesDesktop,
        styesTab: contentBdShdStyesTab,
        styesMobile: contentBdShdStyesMobile,
        stylesHoverDesktop: contentBdShdStylesHoverDesktop,
        stylesHoverTab: contentBdShdStylesHoverTab,
        stylesHoverMobile: contentBdShdStylesHoverMobile,
        transitionStyle: contentBdShdTransitionStyle,
    } = generateBorderShadowStyles({
        controlName: prefixContentBdShadow,
        attributes,
        // noShadow: true,
        // noBorder: true,
    });

    const {
        styesDesktop: titleWrapBdShdStyesDesktop,
        styesTab: titleWrapBdShdStyesTab,
        styesMobile: titleWrapBdShdStyesMobile,
        stylesHoverDesktop: titleWrapBdShdStylesHoverDesktop,
        stylesHoverTab: titleWrapBdShdStylesHoverTab,
        stylesHoverMobile: titleWrapBdShdStylesHoverMobile,
        transitionStyle: titleWrapBdShdTransitionStyle,
    } = generateBorderShadowStyles({
        controlName: prefixTtlWrpBdShadow,
        attributes,
        // noShadow: true,
        // noBorder: true,
    });

    const {
        styesDesktop: iconBdShdStyesDesktop,
        styesTab: iconBdShdStyesTab,
        styesMobile: iconBdShdStyesMobile,
        stylesHoverDesktop: iconBdShdStylesHoverDesktop,
        stylesHoverTab: iconBdShdStylesHoverTab,
        stylesHoverMobile: iconBdShdStylesHoverMobile,
        transitionStyle: iconBdShdTransitionStyle,
    } = generateBorderShadowStyles({
        controlName: prefixIconBdShadow,
        attributes,
        // noShadow: true,
        // noBorder: true,
    });

    // icon padding
    const {
        dimensionStylesDesktop: iconPaddingDesktop,
        dimensionStylesTab: iconPaddingTab,
        dimensionStylesMobile: iconPaddingMobile,
    } = generateDimensionsControlStyles({
        attributes,
        controlName: prefixIconPadding,
        styleFor: "padding",
    });

    const {
        rangeStylesDesktop: caretSizeDesktop,
        rangeStylesTab: caretSizeTab,
        rangeStylesMobile: caretSizeMobile,
    } = generateResponsiveRangeStyles({
        attributes,
        controlName: prefixCaretSize,
        property: "font-size",
        customUnit: "px",
    });


    // transition:all 0.5s, ${contentBgTransitionStyle}, ${contentBdShdTransitionStyle};
    // styles related to generateBorderShadowStyles end

    // all common (editor&frontEnd) css styles for large screen width (desktop/laptop) in strings ⬇
    const desktopAllStylesCommon = softMinifyCssStrings(`

		.${blockId}.eb-advanced-tabs-wrapper > *{
			position:relative;
		}

		.${blockId}.eb-advanced-tabs-wrapper{
			display:flex;
			flex-direction:${layout === "horizontal" ? "column" : "row"};
			${wrpMarginDesktop}
			${wrpPaddingDesktop}
			${wrpBackgroundStylesDesktop}
			${wrpBdShdStyesDesktop}
			transition: all .5s, ${wrpBgTransitionStyle}, ${wrpBdShdTransitionStyle};
		}

		.${blockId}.eb-advanced-tabs-wrapper:hover{
			${wrpHoverBackgroundStylesDesktop}
			${wrpBdShdStylesHoverDesktop}
		}

		.${blockId}.eb-advanced-tabs-wrapper:before{
			${wrpOverlayStylesDesktop}
			transition: all .5s, ${wrpOvlTransitionStyle};
		}

		.${blockId}.eb-advanced-tabs-wrapper:hover:before{
			${wrpHoverOverlayStylesDesktop}
		}

		.${blockId}.eb-advanced-tabs-wrapper .eb-tabs-nav ul.tabTitles[data-tabs-ul-id="${blockId}"]{
			display: flex;
			list-style-type: none;
			flex-wrap:wrap;
			margin: 0;
			padding: 0;
			flex-direction:${layout === "horizontal" ? "row" : "column"};
			${titleWrapMarginDesktop}
			${titleWrapPaddingDesktop}
			${titleWrapBdShdStyesDesktop}
			${titleWrapBackgroundStylesDesktop}

			transition: ${titleWrapBdShdTransitionStyle}, ${titleWrapBgTransitionStyle};
		}

		.${blockId}.eb-advanced-tabs-wrapper .eb-tabs-nav ul.tabTitles[data-tabs-ul-id="${blockId}"]:hover{
			${titleWrapHoverBackgroundStylesDesktop}
			${titleWrapBdShdStylesHoverDesktop}
		}

		.${blockId}.eb-advanced-tabs-wrapper .eb-tabs-nav ul.tabTitles[data-tabs-ul-id="${blockId}"] li{
			display: flex;
			justify-content: ${titleAlign};
			align-items: center;
			cursor:pointer;
			text-align: center;
			position:relative;
			${isFillTitle ? `flex: 1;` : ""}
			${mediaPositon === "inline"
            ? mediaAlign === "left"
                ? "flex-direction: row;"
                : "flex-direction: row-reverse;"
            : "flex-direction: column;"}
			${titleMarginDesktop}
			${titlePaddingDesktop}
			${titleMinWidthDesktop}
			${iconGapDesktop}
			${ttlBackgroundStylesDesktop}
			${ttlBdShdStyesDesktop}
			transition: all .5s, ${ttlBgTransitionStyle}, ${ttlBdShdTransitionStyle};
		}

		.${blockId}.eb-advanced-tabs-wrapper .eb-tabs-nav ul.tabTitles[data-tabs-ul-id="${blockId}"] li:hover{
			${ttlHoverBackgroundStylesDesktop}
			${ttlBdShdStylesHoverDesktop}
		}

        .${blockId}.eb-advanced-tabs-wrapper .eb-tabs-nav ul.tabTitles[data-tabs-ul-id="${blockId}"] li .tab-title-wrap {
            ${mediaPositon === "inline" ? `text-align: left;` : "text-align: center;"}
        }

		.${blockId}.eb-advanced-tabs-wrapper .eb-tabs-nav ul.tabTitles[data-tabs-ul-id="${blockId}"] li .tabIcon {
			display:flex;
			justify-content:center;
			align-items:center;
			// ${iconWidthDesktop}
			// ${iconHeightDesktop}
			${iconSizeDesktop}
			${iconColor ? `color:${iconColor};` : ""}
			${colorTransition ? `transition:color ${colorTransition}s;` : ""}
            ${iconBgColor ? `background-color:${iconBgColor};` : ""}
			${iconBdShdStyesDesktop}
			${iconPaddingDesktop}
		}

        .${blockId}.eb-advanced-tabs-wrapper .eb-tabs-nav ul.tabTitles[data-tabs-ul-id="${blockId}"] li:hover .tabIcon {
            ${iconhvBgColor ? `background-color:${iconhvBgColor};` : ""}
			${iconBdShdStylesHoverDesktop}
        }

        .${blockId}.eb-advanced-tabs-wrapper .eb-tabs-nav ul.tabTitles[data-tabs-ul-id="${blockId}"] li.active .tabIcon {
            ${actIconBgColor ? `background-color:${actIconBgColor};` : ""}
        }
        .${blockId}.eb-advanced-tabs-wrapper .eb-tabs-nav ul.tabTitles[data-tabs-ul-id="${blockId}"] li.active:hover .tabIcon {
            ${actHvIconBgColor ? `background-color:${actHvIconBgColor};` : ""}
        }

		.${blockId}.eb-advanced-tabs-wrapper .eb-tabs-nav ul.tabTitles[data-tabs-ul-id="${blockId}"] li:hover span{
			${hvIconColor ? `color:${hvIconColor};` : ""}
		}

		.${blockId}.eb-advanced-tabs-wrapper .eb-tabs-nav ul.tabTitles[data-tabs-ul-id="${blockId}"] li img{
			height:auto;
			${imageWidthDesktop}
		}

		.${blockId}.eb-advanced-tabs-wrapper .eb-tabs-nav ul.tabTitles[data-tabs-ul-id="${blockId}"] li .tab-title-text{
			margin: 0;
			padding: 0;
			${textColor ? `color:${textColor};` : ""}
			${titleTypoStylesDesktop}
			${colorTransition ? `transition:color ${colorTransition}s;` : ""}
		}

		.${blockId}.eb-advanced-tabs-wrapper .eb-tabs-nav ul.tabTitles[data-tabs-ul-id="${blockId}"] li:hover .tab-title-text{
			${hvTextColor ? `color:${hvTextColor};` : ""}
		}

        .${blockId}.eb-advanced-tabs-wrapper .eb-tabs-nav ul.tabTitles[data-tabs-ul-id="${blockId}"] li .tab-subtitle-text{
            display: block;
            margin: 0;
            padding: 0;
            ${subtitleColor ? `color:${subtitleColor};` : ""}
            ${subtitleTypoStylesDesktop}
            ${subtitleSpacingDesktop}
            ${colorTransition ? `transition:color ${colorTransition}s;` : ""}
        }

        .${blockId}.eb-advanced-tabs-wrapper .eb-tabs-nav ul.tabTitles[data-tabs-ul-id="${blockId}"] li:hover .tab-subtitle-text{
            ${hvSubtitleColor ? `color:${hvSubtitleColor};` : ""}
        }
        .${blockId}.eb-advanced-tabs-wrapper .eb-tabs-nav ul.tabTitles[data-tabs-ul-id=${blockId}] li.active{
			${actTlBdShdStyesDesktop}
			${actTlBackgroundStylesDesktop}
			transition:${actTlBdShdTransitionStyle}, ${actTlBgTransitionStyle};
		}

		.${blockId}.eb-advanced-tabs-wrapper .eb-tabs-nav ul.tabTitles[data-tabs-ul-id=${blockId}] li.active:hover{
			${actTlBdShdStylesHoverDesktop}
			${actTlHoverBackgroundStylesDesktop}
		}

	${showCaret
            ? `
		.${blockId}.eb-advanced-tabs-wrapper .eb-tabs-nav ul.tabTitles[data-tabs-ul-id="${blockId}"] li.active:after{
			content: "";
			position: absolute;
			width: 0px;
			height: 0px;
			z-index: 1;
			border: ${carZ_Range}px solid transparent;
			${layout === "horizontal"
                ? `
					bottom: -${carZ_Range}px;
					border-top-color: ${caretColor} !important;
					border-bottom: 0px !important;
					left: 50%;
					border-top-style: solid;
					transform: translateX(-50%);
				`
                : `
					right: -${carZ_Range}px;
					border-left-color: ${caretColor} !important;
					border-right: 0px !important;
					top: 50%;
					border-left-style: solid;
					transform: translateY(-50%);
				`
            }

		}

        ${addCaretIcon && caretIcon
                ? `
                .${blockId}.eb-advanced-tabs-wrapper .eb-tabs-nav ul.tabTitles[data-tabs-ul-id="${blockId}"] li.active:after{
					content: none;
				}
				.${blockId}.eb-advanced-tabs-wrapper .eb-tabs-nav ul.tabTitles[data-tabs-ul-id="${blockId}"] li .tab-caret-icon {
                    display: none;
					${caretSizeDesktop}
					${caretColor ? `color:${caretColor};` : ""}
                    ${layout === "horizontal" ? `` : `margin-left: auto;`}
				}
                .${blockId}.eb-advanced-tabs-wrapper .eb-tabs-nav ul.tabTitles[data-tabs-ul-id="${blockId}"] li.active .tab-caret-icon {
                    display: flex;
                }
                `
                : ""

            }

		`
            : ""
        }


		.${blockId}.eb-advanced-tabs-wrapper .eb-tabs-nav ul.tabTitles[data-tabs-ul-id=${blockId}] li.active span,
		.${blockId}.eb-advanced-tabs-wrapper .eb-tabs-nav ul.tabTitles[data-tabs-ul-id=${blockId}] li.active i {
			${actIconColor ? `color:${actIconColor};` : ""}
			${actColorTransition ? `transition:color ${actColorTransition}s;` : ""}
		}

		.${blockId}.eb-advanced-tabs-wrapper .eb-tabs-nav ul.tabTitles[data-tabs-ul-id=${blockId}] li.active:hover span,
		.${blockId}.eb-advanced-tabs-wrapper .eb-tabs-nav ul.tabTitles[data-tabs-ul-id=${blockId}] li.active:hover i {
			${actHvIconColor ? `color:${actHvIconColor};` : ""}
		}

		.${blockId}.eb-advanced-tabs-wrapper .eb-tabs-nav ul.tabTitles[data-tabs-ul-id=${blockId}] li.active .tab-title-text{
			${actTextColor ? `color:${actTextColor};` : ""}
			${actColorTransition ? `transition:color ${actColorTransition}s;` : ""}
		}

		.${blockId}.eb-advanced-tabs-wrapper .eb-tabs-nav ul.tabTitles[data-tabs-ul-id=${blockId}] li.active:hover .tab-title-text{
			${actHvTextColor ? `color:${actHvTextColor};` : ""}
		}
        .${blockId}.eb-advanced-tabs-wrapper .eb-tabs-nav ul.tabTitles[data-tabs-ul-id=${blockId}] li.active .tab-subtitle-text{
            ${actSubtitleColor ? `color:${actSubtitleColor};` : ""}
            ${actColorTransition ? `transition:color ${actColorTransition}s;` : ""}
        }

        .${blockId}.eb-advanced-tabs-wrapper .eb-tabs-nav ul.tabTitles[data-tabs-ul-id=${blockId}] li.active:hover .tab-subtitle-text{
            ${actHvSubtitleColor ? `color:${actHvSubtitleColor};` : ""}
        }

		.${blockId}.eb-advanced-tabs-wrapper .eb-tabs-contents{
			flex:1;
		}

		.${blockId}.eb-advanced-tabs-wrapper .eb-tabs-contents .eb-tab-wrapper[data-tab-parent-id="${blockId}"]{
			${contentMarginDesktop}
			${contentPaddingDesktop}
			${contentBackgroundStylesDesktop}
			${contentBdShdStyesDesktop}

		}

		.${blockId}.eb-advanced-tabs-wrapper .eb-tabs-contents .eb-tab-wrapper[data-tab-parent-id="${blockId}"]:hover{
			${contentHoverBackgroundStylesDesktop}
			${contentBdShdStylesHoverDesktop}
		}

	`);

    // all common (editor&frontEnd) css styles for Tab in strings ⬇
    const tabAllStylesCommon = (`
		.${blockId}.eb-advanced-tabs-wrapper{
            ${(layout === "vertical" && enableResponsiveLayout && verticalToHorizontal === 'tab') && "flex-direction: column;"}
			${wrpMarginTab}
			${wrpPaddingTab}
			${wrpBackgroundStylesTab}
			${wrpBdShdStyesTab}
		}

		.${blockId}.eb-advanced-tabs-wrapper:hover{
			${wrpHoverBackgroundStylesTab}
			${wrpBdShdStylesHoverTab}
		}

		.${blockId}.eb-advanced-tabs-wrapper:before{
			${wrpOverlayStylesTab}
		}

		.${blockId}.eb-advanced-tabs-wrapper:hover:before{
			${wrpHoverOverlayStylesTab}
		}

		.${blockId}.eb-advanced-tabs-wrapper .eb-tabs-nav ul.tabTitles[data-tabs-ul-id="${blockId}"]{
            ${(layout === "vertical" && enableResponsiveLayout && verticalToHorizontal === 'tab') && "flex-direction: row;"}
			${titleWrapMarginTab}
			${titleWrapPaddingTab}
			${titleWrapBdShdStyesTab}
			${titleWrapBackgroundStylesTab}

		}

		.${blockId}.eb-advanced-tabs-wrapper .eb-tabs-nav ul.tabTitles[data-tabs-ul-id="${blockId}"]:hover{
			${titleWrapHoverBackgroundStylesTab}
			${titleWrapBdShdStylesHoverTab}
		}

		.${blockId}.eb-advanced-tabs-wrapper .eb-tabs-nav ul.tabTitles[data-tabs-ul-id="${blockId}"] li{
			${titleMarginTab}
			${titlePaddingTab}
			${titleMinWidthTab}
			${iconGapTab}
			${ttlBackgroundStylesTab}
			${ttlBdShdStyesTab}
		}

		.${blockId}.eb-advanced-tabs-wrapper .eb-tabs-nav ul.tabTitles[data-tabs-ul-id="${blockId}"] li:hover{
			${ttlHoverBackgroundStylesTab}
			${ttlBdShdStylesHoverTab}
		}

		.${blockId}.eb-advanced-tabs-wrapper ul.tabTitles[data-tabs-ul-id=${blockId}] li.active{
			${actTlBdShdStyesTab}
			${actTlBackgroundStylesTab}
		}

		.${blockId}.eb-advanced-tabs-wrapper ul.tabTitles[data-tabs-ul-id=${blockId}] li.active:hover{
			${actTlBdShdStylesHoverTab}
			${actTlHoverBackgroundStylesTab}
		}

		${showCaret
            ? `
			.${blockId}.eb-advanced-tabs-wrapper .eb-tabs-nav ul.tabTitles[data-tabs-ul-id="${blockId}"] li.active:after{
				border: ${TABcarZ_Range}px solid transparent;
				${layout === "horizontal"
                ? `
						bottom: -${TABcarZ_Range}px;
					`
                : (layout === "vertical" && enableResponsiveLayout && verticalToHorizontal === 'tab') ?
                    `
                        bottom: -${TABcarZ_Range}px;
                        border-top-color: ${caretColor} !important;
                        border-left-color: transparent !important;
                        border-right: ${MOBcarZ_Range}px solid transparent !important;
                        border-bottom: 0px !important;
                        left: 50%;
                        border-top-style: solid;
                        transform: translateX(-50%);
                        right: 0;
                        top: auto;
                    `
                    : `right: -${TABcarZ_Range}px;`
            }

			}

            .${blockId}.eb-advanced-tabs-wrapper .eb-tabs-nav ul.tabTitles[data-tabs-ul-id="${blockId}"] li .tab-caret-icon {
                ${caretSizeTab}
            }

			`
            : ""
        }

		.${blockId}.eb-advanced-tabs-wrapper .eb-tabs-nav ul.tabTitles[data-tabs-ul-id="${blockId}"] li .tabIcon {
			${iconSizeTab}
			// ${iconWidthTab}
			// ${iconHeightTab}
			${iconBdShdStyesTab}
			${iconPaddingTab}
		}

		.${blockId}.eb-advanced-tabs-wrapper .eb-tabs-nav ul.tabTitles[data-tabs-ul-id="${blockId}"] li img{
			${imageWidthTab}
		}

		.${blockId}.eb-advanced-tabs-wrapper .eb-tabs-nav ul.tabTitles[data-tabs-ul-id="${blockId}"] li .tab-title-text{
			${titleTypoStylesTab}
		}
        .${blockId}.eb-advanced-tabs-wrapper .eb-tabs-nav ul.tabTitles[data-tabs-ul-id="${blockId}"] li .tab-subtitle-text{
            ${subtitleTypoStylesTab}
            ${subtitleSpacingTab}
        }

		.${blockId}.eb-advanced-tabs-wrapper .eb-tabs-contents .eb-tab-wrapper[data-tab-parent-id="${blockId}"]{
			${contentMarginTab}
			${contentPaddingTab}
			${contentBackgroundStylesTab}
			${contentBdShdStyesTab}
		}

		.${blockId}.eb-advanced-tabs-wrapper .eb-tabs-contents .eb-tab-wrapper[data-tab-parent-id="${blockId}"]:hover{
			${contentHoverBackgroundStylesTab}
			${contentBdShdStylesHoverTab}
		}

	`);

    // all common (editor&frontEnd) css styles for Mobile in strings ⬇
    const mobileAllStylesCommon = (`
		.${blockId}.eb-advanced-tabs-wrapper{
            ${(layout === "vertical" && enableResponsiveLayout && verticalToHorizontal === 'mobile') && "flex-direction: column;"}
			${wrpMarginMobile}
			${wrpPaddingMobile}
			${wrpBackgroundStylesMobile}
			${wrpBdShdStyesMobile}
		}

		.${blockId}.eb-advanced-tabs-wrapper:hover{
			${wrpHoverBackgroundStylesMobile}
			${wrpBdShdStylesHoverMobile}
		}

		.${blockId}.eb-advanced-tabs-wrapper:before{
			${wrpOverlayStylesMobile}
		}

		.${blockId}.eb-advanced-tabs-wrapper:hover:before{
			${wrpHoverOverlayStylesMobile}
		}

		.${blockId}.eb-advanced-tabs-wrapper .eb-tabs-nav ul.tabTitles[data-tabs-ul-id="${blockId}"]{
            ${(layout === "vertical" && enableResponsiveLayout && verticalToHorizontal === 'mobile') && "flex-direction: row;"}
			${titleWrapMarginMobile}
			${titleWrapPaddingMobile}
			${titleWrapBdShdStyesMobile}
			${titleWrapBackgroundStylesMobile}
		}

		.${blockId}.eb-advanced-tabs-wrapper .eb-tabs-nav ul.tabTitles[data-tabs-ul-id="${blockId}"]:hover{
			${titleWrapHoverBackgroundStylesMobile}
			${titleWrapBdShdStylesHoverMobile}
		}

		.${blockId}.eb-advanced-tabs-wrapper .eb-tabs-nav ul.tabTitles[data-tabs-ul-id="${blockId}"] li{
			${titleMarginMobile}
			${titlePaddingMobile}
			${titleMinWidthMobile}
			${iconGapMobile}
			${ttlBackgroundStylesMobile}
			${ttlBdShdStyesMobile}
		}

		.${blockId}.eb-advanced-tabs-wrapper .eb-tabs-nav ul.tabTitles[data-tabs-ul-id="${blockId}"] li:hover{
			${ttlHoverBackgroundStylesMobile}
			${ttlBdShdStylesHoverMobile}
		}

		.${blockId}.eb-advanced-tabs-wrapper ul.tabTitles[data-tabs-ul-id=${blockId}] li.active{
			${actTlBdShdStyesMobile}
			${actTlBackgroundStylesMobile}
		}

		.${blockId}.eb-advanced-tabs-wrapper ul.tabTitles[data-tabs-ul-id=${blockId}] li.active:hover{
			${actTlBdShdStylesHoverMobile}
			${actTlHoverBackgroundStylesMobile}
		}

		${showCaret && MOBcarZ_Range
            ? `
			.${blockId}.eb-advanced-tabs-wrapper .eb-tabs-nav ul.tabTitles[data-tabs-ul-id="${blockId}"] li.active:after{
				border: ${MOBcarZ_Range}px solid transparent;
				${layout === "horizontal"
                ? `
						bottom: -${MOBcarZ_Range}px;
					`
                : (layout === "vertical" && enableResponsiveLayout && verticalToHorizontal === 'mobile') ?
                    `
                        bottom: -${MOBcarZ_Range}px;
                        border-top-color: ${caretColor} !important;
                        border-left-color: transparent !important;
                        border-right: ${MOBcarZ_Range}px solid transparent !important;
                        border-bottom: 0px !important;
                        left: 50%;
                        border-top-style: solid;
                        transform: translateX(-50%);
                        right: 0;
                        top: auto;
                    `
                    : `right: -${TABcarZ_Range}px;`
            }

			}

            .${blockId}.eb-advanced-tabs-wrapper .eb-tabs-nav ul.tabTitles[data-tabs-ul-id="${blockId}"] li .tab-caret-icon {
                ${caretSizeMobile}
            }

			`
            : ""
        }

		.${blockId}.eb-advanced-tabs-wrapper .eb-tabs-nav ul.tabTitles[data-tabs-ul-id="${blockId}"] li .tabIcon {
			${iconSizeMobile}
			// ${iconWidthMobile}
			// ${iconHeightMobile}
            ${iconBdShdStyesMobile}
			${iconPaddingMobile}
		}

		.${blockId}.eb-advanced-tabs-wrapper .eb-tabs-nav ul.tabTitles[data-tabs-ul-id="${blockId}"] li img{
			${imageWidthMobile}
		}

		.${blockId}.eb-advanced-tabs-wrapper .eb-tabs-nav ul.tabTitles[data-tabs-ul-id="${blockId}"] li .tab-title-text{
			${titleTypoStylesMobile}
		}
        .${blockId}.eb-advanced-tabs-wrapper .eb-tabs-nav ul.tabTitles[data-tabs-ul-id="${blockId}"] li .tab-subtitle-text{
            ${subtitleTypoStylesMobile}
            ${subtitleSpacingMobile}
        }

		.${blockId}.eb-advanced-tabs-wrapper .eb-tabs-contents .eb-tab-wrapper[data-tab-parent-id="${blockId}"]{
			${contentMarginMobile}
			${contentPaddingMobile}
			${contentBackgroundStylesMobile}
			${contentBdShdStyesMobile}
		}

		.${blockId}.eb-advanced-tabs-wrapper .eb-tabs-contents .eb-tab-wrapper[data-tab-parent-id="${blockId}"]:hover{
			${contentHoverBackgroundStylesMobile}
			${contentBdShdStylesHoverMobile}
		}

	`);

    //
    const desktopAllStylesEditor = softMinifyCssStrings(`
		${desktopAllStylesCommon}

		.eb-tabs-contents .eb-tab-wrapper > .eb-tab-inner > .block-editor-inner-blocks > .block-editor-block-list__layout > .wp-block,
		.eb-tabs-contents > .block-editor-inner-blocks > .block-editor-block-list__layout > .wp-block > .eb-tab-editor-wrap,
		.eb-tabs-contents > .block-editor-inner-blocks > .block-editor-block-list__layout > .wp-block,
		.eb-tabs-contents > .block-editor-inner-blocks > .block-editor-block-list__layout,
		.eb-tabs-contents > .block-editor-inner-blocks
		{
			margin: 0;
			padding: 0;
		}

		.eb-tabs-contents .block-editor-inner-blocks .eb-tab-wrapper .eb-tab-inner .block-editor-button-block-appender{
			height: 100px;
		}

	`);

    const tabAllStylesEditor = softMinifyCssStrings(`
		${tabAllStylesCommon}

	`);

    const mobileAllStylesEditor = softMinifyCssStrings(`
		${mobileAllStylesCommon}

	`);

    // all css styles for large screen width (desktop/laptop) in strings ⬇
    const desktopAllStyles = softMinifyCssStrings(`
		${desktopAllStylesCommon}

	`);

    // all css styles for Tab in strings ⬇
    const tabAllStyles = softMinifyCssStrings(`
		${tabAllStylesCommon}

	`);

    // all css styles for Mobile in strings ⬇
    const mobileAllStyles = softMinifyCssStrings(`
		${mobileAllStylesCommon}

	`);

    return (
        <>
            <style>
                {!isClickTab &&
                    `
                    a.info-click-link{
                        pointer-events: none;
                    }
                `}
            </style>
            <StyleComponent
                attributes={attributes}
                setAttributes={setAttributes}
                desktopAllStyles={desktopAllStyles}
                tabAllStyles={tabAllStyles}
                mobileAllStyles={mobileAllStyles}
                editorDesktopStyles={desktopAllStylesEditor}
                editorTabStyles={tabAllStylesEditor}
                editorMobileStyles={mobileAllStylesEditor}
                blockName={name}
            />
        </>
    );
}

