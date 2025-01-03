/**
 * WordPress dependencies
 */

import {
    typoPrefix_title,
    typoPrefix_content,
    titlePrefixText,
    titleSuffixText,
} from "./constants/typographyPrefixConstants";

import {
    rangeIconSize,
    accGapRange,
    titlePrefixIconSize,
    titlePrefixImgWidth,
    titlePrefixGap,
    titleSuffixIconSize,
    titleSuffixImgWidth,
    titleSuffixGap,
    imageWidth,
    imageHeight,
    horizontalHeight,
} from "./constants/rangeNames";

import {
    wrapMarginConst,
    wrapPaddingConst,
    iconMarginConst,
    iconPaddingConst,
    tabMarginConst,
    tabPaddingConst,
    conMarginConst,
    conPaddingConst,
    imgContainerPadding,
    imgContainerMargin,
    accordionMargin,
    accordionPadding,
    titlePrefixPadding,
    titleSuffixPadding,
    titlePrefixMargin,
    titleSuffixMargin,
} from "./constants/dimensionsConstants";

import {
    WrpBgConst,
    iconBgConst,
    tabBgConst,
    conBgConst,
    accordionBackground,
    accordionExpandedBackground,
    titlePrefixBG,
    titleSuffixBG,
} from "./constants/backgroundsConstants";

import {
    WrpBdShadowConst,
    iconBdShadowConst,
    tabBdShadowConst,
    conBdShadowConst,
    accordionBorder,
    accordionExpandedBorder,
    titlePrefixBorder,
    titleSuffixBorder,
} from "./constants/borderShadowConstants";

import {
    softMinifyCssStrings,
    generateBackgroundControlStyles,
    generateDimensionsControlStyles,
    generateTypographyStyles,
    generateBorderShadowStyles,
    generateResponsiveRangeStyles,
    StyleComponent,
} from "@essential-blocks/controls";

export default function Style(props) {
    const { attributes, setAttributes, name } = props;
    const {
        blockId,
        displayIcon,
        titleColor = "#fff",
        contentColor = "#555",
        contentAlign = "left",
        iconColor,
        iconPosition,
        titleAlignment,
        hoverTitleColor,
        activeBgColor,
        activeTitleColor,
        activeIconColor,
        icnZ_Range,
        TABicnZ_Range,
        MOBicnZ_Range,
        titlePrefixColor,
        titleSuffixColor,
        imageContainerWidth,
        transitionDuration,
    } = attributes;

    // styles related to generateTypographyStyles start ⬇
    const {
        typoStylesDesktop: titleTypoStylesDesktop,
        typoStylesTab: titleTypoStylesTab,
        typoStylesMobile: titleTypoStylesMobile,
    } = generateTypographyStyles({
        attributes,
        prefixConstant: typoPrefix_title,
    });

    const {
        typoStylesDesktop: contentTypoStylesDesktop,
        typoStylesTab: contentTypoStylesTab,
        typoStylesMobile: contentTypoStylesMobile,
    } = generateTypographyStyles({
        attributes,
        prefixConstant: typoPrefix_content,
        defaultFontSize: 14,
    });
    const {
        typoStylesDesktop: titlePrefixTextTypoDesktop,
        typoStylesTab: titlePrefixTextTypoTab,
        typoStylesMobile: titlePrefixTextTypoMobile,
    } = generateTypographyStyles({
        attributes,
        prefixConstant: titlePrefixText,
        defaultFontSize: 14,
    });
    const {
        typoStylesDesktop: titleSuffixTextTypoDesktop,
        typoStylesTab: titleSuffixTextTypoTab,
        typoStylesMobile: titleSuffixTextTypoMobile,
    } = generateTypographyStyles({
        attributes,
        prefixConstant: titleSuffixText,
        defaultFontSize: 14,
    });

    // styles related to generateTypographyStyles end

    // styles related to generateBackgroundControlStyles start ⬇

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
        controlName: WrpBgConst,
        // noOverlay: true,
        // noMainBgi: true,
        // noOverlayBgi: true, // if 'noOverlay : true' is given then there's no need to give 'noOverlayBgi : true'
    });

    const {
        backgroundStylesDesktop: iconBackgroundStylesDesktop,
        hoverBackgroundStylesDesktop: iconHoverBackgroundStylesDesktop,
        bgTransitionStyle: iconBgTransitionStyle,
    } = generateBackgroundControlStyles({
        attributes,
        controlName: iconBgConst,
        noOverlay: true,
        noMainBgi: true,
        // noOverlayBgi: true, // if 'noOverlay : true' is given then there's no need to give 'noOverlayBgi : true'
    });

    const {
        backgroundStylesDesktop: tabBackgroundStylesDesktop,
        hoverBackgroundStylesDesktop: tabHoverBackgroundStylesDesktop,
        bgTransitionStyle: tabBgTransitionStyle,
    } = generateBackgroundControlStyles({
        attributes,
        controlName: tabBgConst,
        noOverlay: true,
        noMainBgi: true,
        // noOverlayBgi: true, // if 'noOverlay : true' is given then there's no need to give 'noOverlayBgi : true'
    });

    const {
        backgroundStylesDesktop: conBackgroundStylesDesktop,
        hoverBackgroundStylesDesktop: conHoverBackgroundStylesDesktop,
        bgTransitionStyle: conBgTransitionStyle,
    } = generateBackgroundControlStyles({
        attributes,
        controlName: conBgConst,
        noOverlay: true,
        noMainBgi: true,
        // noOverlayBgi: true, // if 'noOverlay : true' is given then there's no need to give 'noOverlayBgi : true'
    });

    // styles related to generateBackgroundControlStyles end

    // styles related to generateDimensionsControlStyles start ⬇
    const {
        dimensionStylesDesktop: wrpMarginDesktop,
        dimensionStylesTab: wrpMarginTab,
        dimensionStylesMobile: wrpMarginMobile,
    } = generateDimensionsControlStyles({
        attributes,
        controlName: wrapMarginConst,
        styleFor: "margin",
    });

    const {
        dimensionStylesDesktop: wrpPaddingDesktop,
        dimensionStylesTab: wrpPaddingTab,
        dimensionStylesMobile: wrpPaddingMobile,
    } = generateDimensionsControlStyles({
        attributes,
        controlName: wrapPaddingConst,
        styleFor: "padding",
    });

    const {
        dimensionStylesDesktop: iconMarginDesktop,
        dimensionStylesTab: iconMarginTab,
        dimensionStylesMobile: iconMarginMobile,
    } = generateDimensionsControlStyles({
        attributes,
        controlName: iconMarginConst,
        styleFor: "margin",
    });

    const {
        dimensionStylesDesktop: iconPaddingDesktop,
        dimensionStylesTab: iconPaddingTab,
        dimensionStylesMobile: iconPaddingMobile,
    } = generateDimensionsControlStyles({
        attributes,
        controlName: iconPaddingConst,
        styleFor: "padding",
    });

    const {
        dimensionStylesDesktop: tabMarginDesktop,
        dimensionStylesTab: tabMarginTab,
        dimensionStylesMobile: tabMarginMobile,
    } = generateDimensionsControlStyles({
        attributes,
        controlName: tabMarginConst,
        styleFor: "margin",
    });

    const {
        dimensionStylesDesktop: tabPaddingDesktop,
        dimensionStylesTab: tabPaddingTab,
        dimensionStylesMobile: tabPaddingMobile,
    } = generateDimensionsControlStyles({
        attributes,
        controlName: tabPaddingConst,
        styleFor: "padding",
    });

    const {
        dimensionStylesDesktop: conMarginDesktop,
        dimensionStylesTab: conMarginTab,
        dimensionStylesMobile: conMarginMobile,
    } = generateDimensionsControlStyles({
        attributes,
        controlName: conMarginConst,
        styleFor: "margin",
    });

    const {
        dimensionStylesDesktop: conPaddingDesktop,
        dimensionStylesTab: conPaddingTab,
        dimensionStylesMobile: conPaddingMobile,
    } = generateDimensionsControlStyles({
        attributes,
        controlName: conPaddingConst,
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
        controlName: WrpBdShadowConst,
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
        controlName: iconBdShadowConst,
        attributes,
        // noShadow: true,
        // noBorder: true,
    });

    const {
        styesDesktop: tabBdShdStyesDesktop,
        styesTab: tabBdShdStyesTab,
        styesMobile: tabBdShdStyesMobile,
        stylesHoverDesktop: tabBdShdStylesHoverDesktop,
        stylesHoverTab: tabBdShdStylesHoverTab,
        stylesHoverMobile: tabBdShdStylesHoverMobile,
        transitionStyle: tabBdShdTransitionStyle,
    } = generateBorderShadowStyles({
        controlName: tabBdShadowConst,
        attributes,
        // noShadow: true,
        // noBorder: true,
    });

    const {
        styesDesktop: conBdShdStyesDesktop,
        styesTab: conBdShdStyesTab,
        styesMobile: conBdShdStyesMobile,
        stylesHoverDesktop: conBdShdStylesHoverDesktop,
        stylesHoverTab: conBdShdStylesHoverTab,
        stylesHoverMobile: conBdShdStylesHoverMobile,
        transitionStyle: conBdShdTransitionStyle,
    } = generateBorderShadowStyles({
        controlName: conBdShadowConst,
        attributes,
        // noShadow: true,
        // noBorder: true,
    });
    // styles related to generateBorderShadowStyles end

    const {
        rangeStylesDesktop: iconSizeDesktop,
        rangeStylesTab: iconSizeTab,
        rangeStylesMobile: iconSizeMobile,
    } = generateResponsiveRangeStyles({
        controlName: rangeIconSize,
        customUnit: "px",
        property: "font-size",
        attributes,
    });

    const {
        rangeStylesDesktop: accGapDesktop,
        rangeStylesTab: accGapTab,
        rangeStylesMobile: accGapMobile,
    } = generateResponsiveRangeStyles({
        controlName: accGapRange,
        customUnit: "px",
        property: "margin-top",
        attributes,
    });

    const {
        rangeStylesDesktop: accHorizontalGapDesktop,
        rangeStylesTab: accHorizontalGapTab,
        rangeStylesMobile: accHorizontalGapMobile,
    } = generateResponsiveRangeStyles({
        controlName: accGapRange,
        customUnit: "px",
        property: "margin-left",
        attributes,
    });

    const {
        rangeStylesDesktop: titlePrefixIconWidthDesktop,
        rangeStylesTab: titlePrefixIconWidthTab,
        rangeStylesMobile: titlePrefixIconWidthMobile,
    } = generateResponsiveRangeStyles({
        controlName: titlePrefixIconSize,
        customUnit: "px",
        property: "width",
        attributes,
    });
    const {
        rangeStylesDesktop: titlePrefixIconHeightDesktop,
        rangeStylesTab: titlePrefixIconHeightTab,
        rangeStylesMobile: titlePrefixIconHeightMobile,
    } = generateResponsiveRangeStyles({
        controlName: titlePrefixIconSize,
        customUnit: "px",
        property: "height",
        attributes,
    });
    const {
        rangeStylesDesktop: titlePrefixIconSizeDesktop,
        rangeStylesTab: titlePrefixIconSizeTab,
        rangeStylesMobile: titlePrefixIconSizeMobile,
    } = generateResponsiveRangeStyles({
        controlName: titlePrefixIconSize,
        customUnit: "px",
        property: "font-size",
        attributes,
    });
    const {
        rangeStylesDesktop: titlePrefixImgWidthDesktop,
        rangeStylesTab: titlePrefixImgWidthTab,
        rangeStylesMobile: titlePrefixImgWidthMobile,
    } = generateResponsiveRangeStyles({
        controlName: titlePrefixImgWidth,
        customUnit: "px",
        property: "width",
        attributes,
    });
    const {
        rangeStylesDesktop: titlePrefixGapDesktop,
        rangeStylesTab: titlePrefixGapTab,
        rangeStylesMobile: titlePrefixGapMobile,
    } = generateResponsiveRangeStyles({
        controlName: titlePrefixGap,
        customUnit: "px",
        property: "gap",
        attributes,
    });

    const {
        rangeStylesDesktop: titleSuffixIconWidthDesktop,
        rangeStylesTab: titleSuffixIconWidthTab,
        rangeStylesMobile: titleSuffixIconWidthMobile,
    } = generateResponsiveRangeStyles({
        controlName: titleSuffixIconSize,
        customUnit: "px",
        property: "width",
        attributes,
    });
    const {
        rangeStylesDesktop: titleSuffixIconHeightDesktop,
        rangeStylesTab: titleSuffixIconHeightTab,
        rangeStylesMobile: titleSuffixIconHeightMobile,
    } = generateResponsiveRangeStyles({
        controlName: titleSuffixIconSize,
        customUnit: "px",
        property: "height",
        attributes,
    });
    const {
        rangeStylesDesktop: titleSuffixIconSizeDesktop,
        rangeStylesTab: titleSuffixIconSizeTab,
        rangeStylesMobile: titleSuffixIconSizeMobile,
    } = generateResponsiveRangeStyles({
        controlName: titleSuffixIconSize,
        customUnit: "px",
        property: "font-size",
        attributes,
    });
    const {
        rangeStylesDesktop: titleSuffixImgWidthDesktop,
        rangeStylesTab: titleSuffixImgWidthTab,
        rangeStylesMobile: titleSuffixImgWidthMobile,
    } = generateResponsiveRangeStyles({
        controlName: titleSuffixImgWidth,
        customUnit: "px",
        property: "width",
        attributes,
    });
    // styles related to generateResponsiveRangeStyles end

    // image container
    const {
        dimensionStylesDesktop: imgContainerPaddingDesktop,
        dimensionStylesTab: imgContainerPaddingTab,
        dimensionStylesMobile: imgContainerPaddingMobile,
    } = generateDimensionsControlStyles({
        attributes,
        controlName: imgContainerPadding,
        styleFor: "padding",
    });
    const {
        dimensionStylesDesktop: imgContainerMarginDesktop,
        dimensionStylesTab: imgContainerMarginTab,
        dimensionStylesMobile: imgContainerMarginMobile,
    } = generateDimensionsControlStyles({
        attributes,
        controlName: imgContainerMargin,
        styleFor: "margin",
    });

    const {
        rangeStylesDesktop: imageWidthDesktop,
        rangeStylesTab: imageWidthTab,
        rangeStylesMobile: imageWidthMobile,
    } = generateResponsiveRangeStyles({
        controlName: imageWidth,
        property: "width",
        attributes,
    });

    const {
        rangeStylesDesktop: imageHeightDesktop,
        rangeStylesTab: imageHeightTab,
        rangeStylesMobile: imageHeightMobile,
    } = generateResponsiveRangeStyles({
        controlName: imageHeight,
        property: "height",
        attributes,
    });

    const {
        dimensionStylesDesktop: accordionMarginDesktop,
        dimensionStylesTab: accordionMarginTab,
        dimensionStylesMobile: accordionMarginMobile,
    } = generateDimensionsControlStyles({
        attributes,
        controlName: accordionMargin,
        styleFor: "margin",
    });

    const {
        dimensionStylesDesktop: accordionPaddingDesktop,
        dimensionStylesTab: accordionPaddingTab,
        dimensionStylesMobile: accordionPaddingMobile,
    } = generateDimensionsControlStyles({
        attributes,
        controlName: accordionPadding,
        styleFor: "padding",
    });

    const {
        backgroundStylesDesktop: accordionBackgroundStylesDesktop,
        hoverBackgroundStylesDesktop: accordionHoverBackgroundStylesDesktop,
        bgTransitionStyle: accordionBgTransitionStyle,
    } = generateBackgroundControlStyles({
        attributes,
        controlName: accordionBackground,
        noOverlay: true,
        noMainBgi: true,
        // noOverlayBgi: true, // if 'noOverlay : true' is given then there's no need to give 'noOverlayBgi : true'
    });

    const {
        backgroundStylesDesktop: accordionExpandedBackgroundStylesDesktop,
        hoverBackgroundStylesDesktop:
            accordionExpandedHoverBackgroundStylesDesktop,
        bgTransitionStyle: accordionExpandedBgTransitionStyle,
    } = generateBackgroundControlStyles({
        attributes,
        controlName: accordionExpandedBackground,
        noOverlay: true,
        noMainBgi: true,
        // noOverlayBgi: true, // if 'noOverlay : true' is given then there's no need to give 'noOverlayBgi : true'
    });

    const {
        styesDesktop: accordionBdShdStyesDesktop,
        styesTab: accordionBdShdStyesTab,
        styesMobile: accordionBdShdStyesMobile,
        stylesHoverDesktop: accordionBdShdStylesHoverDesktop,
        stylesHoverTab: accordionBdShdStylesHoverTab,
        stylesHoverMobile: accordionBdShdStylesHoverMobile,
        transitionStyle: accordionBdShdTransitionStyle,
    } = generateBorderShadowStyles({
        controlName: accordionBorder,
        attributes,
        // noShadow: true,
        // noBorder: true,
    });

    const {
        styesDesktop: accordionExpandedBdShdStyesDesktop,
        styesTab: accordionExpandedBdShdStyesTab,
        styesMobile: accordionExpandedBdShdStyesMobile,
        stylesHoverDesktop: accordionExpandedBdShdStylesHoverDesktop,
        stylesHoverTab: accordionExpandedBdShdStylesHoverTab,
        stylesHoverMobile: accordionExpandedBdShdStylesHoverMobile,
        transitionStyle: accordionExpandedBdShdTransitionStyle,
    } = generateBorderShadowStyles({
        controlName: accordionExpandedBorder,
        attributes,
        // noShadow: true,
        // noBorder: true,
    });

    const {
        rangeStylesDesktop: horizontalHeightDesktop,
        rangeStylesTab: horizontalHeightTab,
        rangeStylesMobile: horizontalHeightMobile,
    } = generateResponsiveRangeStyles({
        controlName: horizontalHeight,
        property: "",
        attributes,
    });

    const {
        backgroundStylesDesktop: titlePrefixBGStylesDesktop,
        hoverBackgroundStylesDesktop: titlePrefixBGHoverStylesDesktop,
        bgTransitionStyle: titlePrefixBgStyleTransition,
    } = generateBackgroundControlStyles({
        attributes,
        controlName: titlePrefixBG,
        noOverlay: true,
        noMainBgi: true,
    });

    const {
        backgroundStylesDesktop: titleSuffixBGStylesDesktop,
        hoverBackgroundStylesDesktop: titleSuffixBGHoverStylesDesktop,
        bgTransitionStyle: titleSuffixBgStyleTransition,
    } = generateBackgroundControlStyles({
        attributes,
        controlName: titleSuffixBG,
        noOverlay: true,
        noMainBgi: true,
    });

    const {
        dimensionStylesDesktop: titlePrefixPaddingDesktop,
        dimensionStylesTab: titlePrefixPaddingTab,
        dimensionStylesMobile: titlePrefixPaddingMobile,
    } = generateDimensionsControlStyles({
        attributes,
        controlName: titlePrefixPadding,
        styleFor: "padding",
    });

    const {
        dimensionStylesDesktop: titlePrefixMarginDesktop,
        dimensionStylesTab: titlePrefixMarginTab,
        dimensionStylesMobile: titlePrefixMarginMobile,
    } = generateDimensionsControlStyles({
        attributes,
        controlName: titlePrefixMargin,
        styleFor: "margin",
    });

    const {
        dimensionStylesDesktop: titleSuffixPaddingDesktop,
        dimensionStylesTab: titleSuffixPaddingTab,
        dimensionStylesMobile: titleSuffixPaddingMobile,
    } = generateDimensionsControlStyles({
        attributes,
        controlName: titleSuffixPadding,
        styleFor: "padding",
    });

    const {
        dimensionStylesDesktop: titleSuffixMarginDesktop,
        dimensionStylesTab: titleSuffixMarginTab,
        dimensionStylesMobile: titleSuffixMarginMobile,
    } = generateDimensionsControlStyles({
        attributes,
        controlName: titleSuffixMargin,
        styleFor: "margin",
    });

    const {
        styesDesktop: titlePrefixBdShdStyesDesktop,
        styesTab: titlePrefixBdShdStyesTab,
        styesMobile: titlePrefixBdShdStyesMobile,
        stylesHoverDesktop: titlePrefixBdShdStylesHoverDesktop,
        stylesHoverTab: titlePrefixBdShdStylesHoverTab,
        stylesHoverMobile: titlePrefixBdShdStylesHoverMobile,
        transitionStyle: titlePrefixBdShdTransitionStyle,
    } = generateBorderShadowStyles({
        controlName: titlePrefixBorder,
        attributes,
        // noShadow: true,
        // noBorder: true,
    });

    const {
        styesDesktop: titleSuffixBdShdStyesDesktop,
        styesTab: titleSuffixBdShdStyesTab,
        styesMobile: titleSuffixBdShdStyesMobile,
        stylesHoverDesktop: titleSuffixBdShdStylesHoverDesktop,
        stylesHoverTab: titleSuffixBdShdStylesHoverTab,
        stylesHoverMobile: titleSuffixBdShdStylesHoverMobile,
        transitionStyle: titleSuffixBdShdTransitionStyle,
    } = generateBorderShadowStyles({
        controlName: titleSuffixBorder,
        attributes,
        // noShadow: true,
        // noBorder: true,
    });

    const wrapperStylesDesktop = `

	.eb-accordion-item.is-selected .eb-accordion-content-wrapper-${blockId} {
		height:auto;
		opacity: 0;
		overflow: visible;
	}

	.eb-accordion-container.eb_accdn_loaded .eb-accordion-wrapper:not(.for_edit_page) .eb-accordion-content-wrapper-${blockId}{
		visibility:visible;
		position:static;
	}

	.eb-accordion-container .eb-accordion-wrapper:not(.for_edit_page) .eb-accordion-content-wrapper-${blockId}{
		visibility:hidden;
		position:absolute;
	}

	.${blockId}.eb-accordion-container .eb-accordion-inner{
		position:relative;
	}

	.${blockId}.eb-accordion-container .eb-accordion-wrapper h1,
	.${blockId}.eb-accordion-container .eb-accordion-wrapper h2,
	.${blockId}.eb-accordion-container .eb-accordion-wrapper h3,
	.${blockId}.eb-accordion-container .eb-accordion-wrapper h4,
	.${blockId}.eb-accordion-container .eb-accordion-wrapper h5,
	.${blockId}.eb-accordion-container .eb-accordion-wrapper h6,
	.${blockId}.eb-accordion-container .eb-accordion-wrapper p{
		margin:0;
		padding:0;
	}


	.${blockId}.eb-accordion-container:not(.eb-accordion-type-horizontal) > .eb-accordion-inner > .eb-accordion-wrapper + .eb-accordion-wrapper, 
    .${blockId}.eb-accordion-container:not(.eb-accordion-type-horizontal) .eb-accordion-item {
		${accGapDesktop}
	}

    .${blockId}.eb-accordion-container.eb-accordion-type-horizontal > .eb-accordion-inner  > .eb-accordion-wrapper + .eb-accordion-wrapper, 
    .${blockId}.eb-accordion-container.eb-accordion-type-horizontal .eb-accordion-item {
        ${accHorizontalGapDesktop}
    }

	.${blockId}.eb-accordion-container{
		${wrpMarginDesktop}
		${wrpPaddingDesktop}
		${wrpBackgroundStylesDesktop}
		${wrpBdShdStyesDesktop}
		transition:${wrpBgTransitionStyle}, ${wrpBdShdTransitionStyle};
		overflow:hidden;
	}

	.${blockId}.eb-accordion-container:hover{
		${wrpHoverBackgroundStylesDesktop}
		${wrpBdShdStylesHoverDesktop}
	}

	.${blockId}.eb-accordion-container:before{
		${wrpOverlayStylesDesktop}
		transition:${wrpOvlTransitionStyle};
	}

	.${blockId}.eb-accordion-container:hover:before{
		${wrpHoverOverlayStylesDesktop}
	}


${
    displayIcon
        ? `
		.${blockId}.eb-accordion-container .eb-accordion-icon-wrapper-${blockId}{
			display: flex;
			justify-content: center;
			align-items: center;
			${iconMarginDesktop}
			${iconPaddingDesktop}
			${iconBackgroundStylesDesktop}
			${iconBdShdStyesDesktop}
			transition:${iconBgTransitionStyle}, ${iconBdShdTransitionStyle};
		}


		.${blockId}.eb-accordion-container .eb-accordion-icon-wrapper-${blockId}:hover{
			${iconHoverBackgroundStylesDesktop}
			${iconBdShdStylesHoverDesktop}
		}

		.${blockId}.eb-accordion-container .eb-accordion-icon-wrapper-${blockId} .eb-accordion-icon{
			text-align:center;
			color: ${iconColor};
			${iconSizeDesktop}
			${icnZ_Range ? `width:${icnZ_Range}px;` : ""}
			${icnZ_Range ? `height:${icnZ_Range}px;` : ""}
		}

		`
        : ""
}

	.${blockId}.eb-accordion-container .eb-accordion-title-wrapper-${blockId}
    {
		cursor: pointer;
		display: flex;
		align-items: center;
		flex-direction: ${
            iconPosition === "right" && displayIcon ? "row-reverse" : "row"
        };
		${tabBackgroundStylesDesktop}
		${tabMarginDesktop}
		${tabPaddingDesktop}
		${tabBdShdStyesDesktop}
		transition:${tabBgTransitionStyle}, ${tabBdShdTransitionStyle};
	}

    .${blockId}.eb-accordion-container .eb-accordion-content .title-content-${blockId} {
		${tabBackgroundStylesDesktop}
		${tabMarginDesktop}
		${tabPaddingDesktop}
		${tabBdShdStyesDesktop}
		transition:${tabBgTransitionStyle}, ${tabBdShdTransitionStyle};
    }

	.${blockId}.eb-accordion-container .eb-accordion-title-wrapper-${blockId}:hover{
		${tabHoverBackgroundStylesDesktop}
		${tabBdShdStylesHoverDesktop}
	}
	.${blockId}.eb-accordion-container .title-content-${blockId}{
		justify-content:${titleAlignment || "left"};
		flex:1;
        ${titlePrefixGapDesktop}
	}
	.${blockId}.eb-accordion-container .title-content-${blockId} .eb-accordion-title{
        color:${titleColor};
		${titleTypoStylesDesktop}
    }
    .${blockId}.eb-accordion-container .title-content-${blockId} .eb-accordion-title-prefix-text {
		color:${titlePrefixColor};
        ${titlePrefixBGStylesDesktop}
		${titlePrefixTextTypoDesktop}
        ${titlePrefixMarginDesktop}
        ${titlePrefixPaddingDesktop}
        ${titlePrefixBdShdStyesDesktop}
        transition: ${titlePrefixBgStyleTransition}, ${titlePrefixBdShdTransitionStyle};
	}

    .${blockId}.eb-accordion-container .title-content-${blockId} .eb-accordion-title-prefix-icon {
		color:${titlePrefixColor};
        ${titlePrefixBGStylesDesktop}
		${titlePrefixIconWidthDesktop}
		${titlePrefixIconHeightDesktop}
		${titlePrefixIconSizeDesktop}
        ${titlePrefixMarginDesktop}
        ${titlePrefixPaddingDesktop}
        ${titlePrefixBdShdStyesDesktop}
        transition: ${titlePrefixBgStyleTransition}, ${titlePrefixBdShdTransitionStyle};
	}
    
    .${blockId}.eb-accordion-container .eb-accordion-title-wrapper:hover .title-content-${blockId} .eb-accordion-title-prefix-text,
    .${blockId}.eb-accordion-container .eb-accordion-title-wrapper:hover .title-content-${blockId} .eb-accordion-title-prefix-icon {
        ${titlePrefixBGHoverStylesDesktop}
        ${titlePrefixBdShdStylesHoverDesktop}
    }

    .${blockId}.eb-accordion-container .title-content-${blockId} .eb-accordion-title-prefix-img{
		${titlePrefixImgWidthDesktop}
	}
    .${blockId}.eb-accordion-container .title-content-${blockId} .eb-accordion-title-suffix-text {
		color:${titleSuffixColor};
        ${titleSuffixBGStylesDesktop}
		${titleSuffixTextTypoDesktop}
        ${titleSuffixPaddingDesktop}
        ${titleSuffixMarginDesktop}
        ${titleSuffixBdShdStyesDesktop}
        transition: ${titleSuffixBgStyleTransition}, ${titleSuffixBdShdTransitionStyle};
	}
    .${blockId}.eb-accordion-container .title-content-${blockId} .eb-accordion-title-suffix-icon {
		color:${titleSuffixColor};
        ${titleSuffixBGStylesDesktop}
		${titleSuffixIconWidthDesktop}
		${titleSuffixIconHeightDesktop}
		${titleSuffixIconSizeDesktop}
        ${titleSuffixPaddingDesktop}
        ${titleSuffixMarginDesktop}
        ${titleSuffixBdShdStyesDesktop}
        transition: ${titleSuffixBgStyleTransition}, ${titleSuffixBdShdTransitionStyle};
	}

    .${blockId}.eb-accordion-container .eb-accordion-title-wrapper:hover .title-content-${blockId} .eb-accordion-title-suffix-text,
    .${blockId}.eb-accordion-container .eb-accordion-title-wrapper:hover .title-content-${blockId} .eb-accordion-title-suffix-icon {
        ${titleSuffixBGHoverStylesDesktop}
        ${titleSuffixBdShdStylesHoverDesktop}
    }

    .${blockId}.eb-accordion-container .title-content-${blockId} .eb-accordion-title-suffix-img{
		${titleSuffixImgWidthDesktop}
	}

    ${
        activeIconColor
            ? `
            .${blockId}.eb-accordion-container .eb-accordion-wrapper:not(.eb-accordion-hidden,.for_edit_page) .eb-accordion-title-wrapper-${blockId} .eb-accordion-icon {
		${activeIconColor ? `color: ${activeIconColor} !important;` : ""}
	}
        `
            : ""
    }


${
    activeTitleColor
        ? `
	.${blockId}.eb-accordion-container .eb-accordion-wrapper:not(.eb-accordion-hidden,.for_edit_page) .eb-accordion-title-wrapper-${blockId} .eb-accordion-title {
		${activeTitleColor ? `color: ${activeTitleColor} !important;` : ""}
	}
	`
        : ""
}

${
    activeBgColor
        ? `
	.${blockId}.eb-accordion-container .eb-accordion-wrapper:not(.eb-accordion-hidden,.for_edit_page) .eb-accordion-title-wrapper-${blockId} {
		${activeBgColor ? `background: ${activeBgColor} !important;` : ""}
	}
	`
        : ""
}

	${
        hoverTitleColor
            ? `
			.${blockId}.eb-accordion-container .eb-accordion-title-wrapper:hover .title-content-${blockId} .eb-accordion-title{
				color:${hoverTitleColor};
			}
			`
            : ""
    }

	.${blockId}.eb-accordion-container .eb-accordion-content-wrapper-${blockId} > .eb-accordion-content {
		color:${contentColor};
		text-align:${contentAlign};
		${conBackgroundStylesDesktop}
		${contentTypoStylesDesktop}
		${conMarginDesktop}
		${conPaddingDesktop}
		${conBdShdStyesDesktop}
		transition:${conBdShdTransitionStyle}, ${conBgTransitionStyle};
	}

	.${blockId}.eb-accordion-container .eb-accordion-content-wrapper-${blockId}:hover > .eb-accordion-content{
		${conHoverBackgroundStylesDesktop}
		${conBdShdStylesHoverDesktop}
	}

	`;

    const wrapperStylesTab = `

	.${blockId}.eb-accordion-container:not(.eb-accordion-type-horizontal) > .eb-accordion-inner >  .eb-accordion-wrapper + .eb-accordion-wrapper, 
    .${blockId}.eb-accordion-container:not(.eb-accordion-type-horizontal) .eb-accordion-item {
		${accGapTab}
	}

     .${blockId}.eb-accordion-container.eb-accordion-type-horizontal > .eb-accordion-inner > .eb-accordion-wrapper + .eb-accordion-wrapper, 
     .${blockId}.eb-accordion-container.eb-accordion-type-horizontal .eb-accordion-item  {
        ${accHorizontalGapTab}
    }


	.${blockId}.eb-accordion-container{
		${wrpMarginTab}
		${wrpPaddingTab}
		${wrpBackgroundStylesTab}
		${wrpBdShdStyesTab}
	}

	.${blockId}.eb-accordion-container:hover{
		${wrpHoverBackgroundStylesTab}
		${wrpBdShdStylesHoverTab}
	}

	.${blockId}.eb-accordion-container:before{
		${wrpOverlayStylesTab}
	}

	.${blockId}.eb-accordion-container:hover:before{
		${wrpHoverOverlayStylesTab}
	}



${
    displayIcon
        ? `
		.${blockId}.eb-accordion-container .eb-accordion-icon-wrapper-${blockId}{
			${iconMarginTab}
			${iconPaddingTab}
			${iconBdShdStyesTab}
		}


		.${blockId}.eb-accordion-container .eb-accordion-icon-wrapper-${blockId}:hover{
			${iconBdShdStylesHoverTab}
		}

		.${blockId}.eb-accordion-container .eb-accordion-icon-wrapper-${blockId} .eb-accordion-icon{
			${iconSizeTab}
			${TABicnZ_Range ? `width:${TABicnZ_Range}px;` : ""}
			${TABicnZ_Range ? `height:${TABicnZ_Range}px;` : ""}
		}

		`
        : ""
}



	.${blockId}.eb-accordion-container .eb-accordion-title-wrapper-${blockId} {
		${tabMarginTab}
		${tabPaddingTab}
		${tabBdShdStyesTab}
	}


	.${blockId}.eb-accordion-container .eb-accordion-title-wrapper-${blockId}:hover{
		${tabBdShdStylesHoverTab}
	}

	.${blockId}.eb-accordion-container .title-content-${blockId} .eb-accordion-title{
		${titleTypoStylesTab}
	}


.${blockId}.eb-accordion-container .title-content-${blockId} .eb-accordion-title-prefix-text{
		${titlePrefixTextTypoTab}
        ${titlePrefixMarginTab}
        ${titlePrefixPaddingTab}
        ${titlePrefixBdShdStyesTab}
	}
    .${blockId}.eb-accordion-container .title-content-${blockId} .eb-accordion-title-prefix-icon{
		${titlePrefixIconWidthTab}
		${titlePrefixIconHeightTab}
		${titlePrefixIconSizeTab}
        ${titlePrefixMarginTab}
        ${titlePrefixPaddingTab}
        ${titlePrefixBdShdStyesTab}
	}

    .${blockId}.eb-accordion-container .eb-accordion-title-wrapper:hover .title-content-${blockId} .eb-accordion-title-prefix-text,
    .${blockId}.eb-accordion-container .eb-accordion-title-wrapper:hover .title-content-${blockId} .eb-accordion-title-prefix-icon {
        ${titlePrefixBdShdStylesHoverTab}
    }

    .${blockId}.eb-accordion-container .title-content-${blockId} .eb-accordion-title-prefix-img{
		${titlePrefixImgWidthTab}
	}
    .${blockId}.eb-accordion-container .title-content-${blockId} .eb-accordion-title-suffix-text{
		${titleSuffixTextTypoTab}
        ${titleSuffixPaddingTab}
        ${titleSuffixMarginTab}
        ${titleSuffixBdShdStyesTab}
	}
    .${blockId}.eb-accordion-container .title-content-${blockId} .eb-accordion-title-suffix-icon{
		${titleSuffixIconWidthTab}
		${titleSuffixIconHeightTab}
		${titleSuffixIconSizeTab}
        ${titleSuffixPaddingTab}
        ${titleSuffixMarginTab}
        ${titleSuffixBdShdStyesTab}
	}

    .${blockId}.eb-accordion-container .eb-accordion-title-wrapper:hover .title-content-${blockId} .eb-accordion-title-suffix-text,
    .${blockId}.eb-accordion-container .eb-accordion-title-wrapper:hover .title-content-${blockId} .eb-accordion-title-suffix-icon {
        ${titleSuffixBdShdStylesHoverTab}
    }

    .${blockId}.eb-accordion-container .title-content-${blockId} .eb-accordion-title-suffix-img{
		${titleSuffixImgWidthTab}
	}

	.${blockId}.eb-accordion-container .eb-accordion-content-wrapper-${blockId} > .eb-accordion-content{
		${contentTypoStylesTab}
		${conMarginTab}
		${conPaddingTab}
		${conBdShdStyesTab}
	}

	.${blockId}.eb-accordion-container .eb-accordion-content-wrapper-${blockId}:hover > .eb-accordion-content{
		${conBdShdStylesHoverTab}
	}
	`;

    const wrapperStylesMobile = `

	.${blockId}.eb-accordion-container:not(.eb-accordion-type-horizontal) > .eb-accordion-inner >  .eb-accordion-wrapper + .eb-accordion-wrapper, 
    .${blockId}.eb-accordion-container:not(.eb-accordion-type-horizontal) .eb-accordion-item {
		${accGapMobile}
	}

     .${blockId}.eb-accordion-container.eb-accordion-type-horizontal  > .eb-accordion-inner >  .eb-accordion-wrapper + .eb-accordion-wrapper, 
     .${blockId}.eb-accordion-container.eb-accordion-type-horizontal .eb-accordion-item {
        ${accHorizontalGapMobile}
    }

	.${blockId}.eb-accordion-container{
		${wrpMarginMobile}
		${wrpPaddingMobile}
		${wrpBackgroundStylesMobile}
		${wrpBdShdStyesMobile}
	}

	.${blockId}.eb-accordion-container:hover{
		${wrpHoverBackgroundStylesMobile}
		${wrpBdShdStylesHoverMobile}
	}

	.${blockId}.eb-accordion-container:before{
		${wrpOverlayStylesMobile}
	}

	.${blockId}.eb-accordion-container:hover:before{
		${wrpHoverOverlayStylesMobile}
	}



	${
        displayIcon
            ? `
			.${blockId}.eb-accordion-container .eb-accordion-icon-wrapper-${blockId}{
				${iconMarginMobile}
				${iconPaddingMobile}
				${iconBdShdStyesMobile}
			}

			.${blockId}.eb-accordion-container .eb-accordion-icon-wrapper-${blockId}:hover{
				${iconBdShdStylesHoverMobile}
			}

			.${blockId}.eb-accordion-container .eb-accordion-icon-wrapper-${blockId} .eb-accordion-icon{
				${iconSizeMobile}
				${MOBicnZ_Range ? `width:${MOBicnZ_Range}px;` : ""}
				${MOBicnZ_Range ? `height:${MOBicnZ_Range}px;` : ""}
			}
			`
            : ""
    }


	.${blockId}.eb-accordion-container .eb-accordion-title-wrapper-${blockId} {
		${tabMarginMobile}
		${tabPaddingMobile}
		${tabBdShdStyesMobile}
	}


	.${blockId}.eb-accordion-container .eb-accordion-title-wrapper-${blockId}:hover{
		${tabBdShdStylesHoverMobile}
	}

	.${blockId}.eb-accordion-container .title-content-${blockId} .eb-accordion-title{
		${titleTypoStylesMobile}
	}

	.${blockId}.eb-accordion-container .eb-accordion-content-wrapper-${blockId} > .eb-accordion-content{
		${contentTypoStylesMobile}
		${conMarginMobile}
		${conPaddingMobile}
		${conBdShdStyesMobile}
	}

	.${blockId}.eb-accordion-container .eb-accordion-content-wrapper-${blockId}:hover > .eb-accordion-content{
		${conBdShdStylesHoverMobile}
	}

    .${blockId}.eb-accordion-container .title-content-${blockId} .eb-accordion-title-prefix-text{
		${titlePrefixTextTypoMobile}
        ${titlePrefixMarginMobile}
        ${titlePrefixPaddingMobile}
        ${titlePrefixBdShdStyesMobile}
	}
    .${blockId}.eb-accordion-container .title-content-${blockId} .eb-accordion-title-prefix-icon{
		${titlePrefixIconWidthMobile}
		${titlePrefixIconHeightMobile}
		${titlePrefixIconSizeMobile}
        ${titlePrefixMarginMobile}
        ${titlePrefixPaddingMobile}
        ${titlePrefixBdShdStyesMobile}
	}
    
    .${blockId}.eb-accordion-container .eb-accordion-title-wrapper:hover .title-content-${blockId} .eb-accordion-title-prefix-text,
    .${blockId}.eb-accordion-container .eb-accordion-title-wrapper:hover .title-content-${blockId} .eb-accordion-title-prefix-icon {
        ${titlePrefixBdShdStylesHoverMobile}
    }
    
    .${blockId}.eb-accordion-container .title-content-${blockId} .eb-accordion-title-prefix-img{
		${titlePrefixImgWidthMobile}
	}
    .${blockId}.eb-accordion-container .title-content-${blockId} .eb-accordion-title-suffix-text{
		${titleSuffixTextTypoMobile}
        ${titleSuffixPaddingMobile}
        ${titleSuffixMarginMobile}
        ${titleSuffixBdShdStyesMobile}
	}
    .${blockId}.eb-accordion-container .title-content-${blockId} .eb-accordion-title-suffix-icon{
		${titleSuffixIconWidthMobile}
		${titleSuffixIconHeightMobile}
		${titleSuffixIconSizeMobile}
        ${titleSuffixPaddingMobile}
        ${titleSuffixMarginMobile}
        ${titleSuffixBdShdStyesMobile}
	}
    
    .${blockId}.eb-accordion-container .eb-accordion-title-wrapper:hover .title-content-${blockId} .eb-accordion-title-suffix-text,
    .${blockId}.eb-accordion-container .eb-accordion-title-wrapper:hover .title-content-${blockId} .eb-accordion-title-suffix-icon {
        ${titleSuffixBdShdStylesHoverMobile}
    }

    .${blockId}.eb-accordion-container .title-content-${blockId} .eb-accordion-title-suffix-img{
		${titleSuffixImgWidthMobile}
	}
	`;

    const imageContainerStylesDesktop = `
	    .${blockId}.eb-accordion-container.eb-accordion-type-image .eb-accordion-image-container {
            width: ${imageContainerWidth}%;
            ${imgContainerMarginDesktop}
            ${imgContainerPaddingDesktop}
        }
        
        .${blockId}.eb-accordion-container.eb-accordion-type-image .eb-accordion-inner {
            width: ${100 - imageContainerWidth}%;
        }

        .${blockId}.eb-accordion-container.eb-accordion-type-image .eb-accordion-image-container img,
        .${blockId}.eb-accordion-container.eb-accordion-type-image .eb-accordion-image-wrapper-mobile img {
            ${imageWidthDesktop}
            ${imageHeightDesktop}
        }
    `;

    const imageContainerStylesTab = `
        .${blockId}.eb-accordion-container.eb-accordion-type-image .eb-accordion-content .eb-accordion-image-wrapper-mobile {
            ${imgContainerPaddingTab}
            ${imgContainerMarginTab}
        }
        
        .${blockId}.eb-accordion-container.eb-accordion-type-image .eb-accordion-image-container img,
        .${blockId}.eb-accordion-container.eb-accordion-type-image .eb-accordion-image-wrapper-mobile img {
            ${imageWidthTab}
            ${imageHeightTab}
        }
    `;

    const imageContainerStylesMobile = `
         .${blockId}.eb-accordion-container.eb-accordion-type-image .eb-accordion-content .eb-accordion-image-wrapper-mobile {
            ${imgContainerPaddingMobile}
            ${imgContainerMarginMobile}
        }

        .${blockId}.eb-accordion-container.eb-accordion-type-image .eb-accordion-image-container img,
        .${blockId}.eb-accordion-container.eb-accordion-type-image .eb-accordion-image-wrapper-mobile img {
            ${imageWidthMobile}
            ${imageHeightMobile}
        }
    `;

    const singleAccordionStylesDesktop = `
        .${blockId}.eb-accordion-container > .eb-accordion-inner > .eb-accordion-wrapper,
        .${blockId}.eb-accordion-container .eb-accordion-wrapper-${blockId}.eb-accordion-wrapper {
            ${accordionMarginDesktop}
            ${accordionPaddingDesktop}
            ${accordionBdShdStyesDesktop}
            ${accordionBackgroundStylesDesktop}
            transition: ${accordionBgTransitionStyle}, ${accordionBdShdTransitionStyle};
        }

        .${blockId}.eb-accordion-container > .eb-accordion-inner > .eb-accordion-wrapper:hover,
        .${blockId}.eb-accordion-container .eb-accordion-wrapper-${blockId}.eb-accordion-wrapper:hover {
            ${accordionHoverBackgroundStylesDesktop}
            ${accordionBdShdStylesHoverDesktop}
        }
        .${blockId}.eb-accordion-container > .eb-accordion-inner > .eb-accordion-wrapper:not(.eb-accordion-hidden),
        .${blockId}.eb-accordion-container .eb-accordion-wrapper-${blockId}.eb-accordion-wrapper:not(.eb-accordion-hidden) {
            ${accordionExpandedBackgroundStylesDesktop}
            ${accordionExpandedBdShdStyesDesktop}
            transition: ${accordionExpandedBgTransitionStyle}, ${accordionExpandedBdShdTransitionStyle};
        }
        .${blockId}.eb-accordion-container > .eb-accordion-inner > .eb-accordion-wrapper:hover:not(.eb-accordion-hidden),
        .${blockId}.eb-accordion-container .eb-accordion-wrapper-${blockId}.eb-accordion-wrapper:hover:not(.eb-accordion-hidden) {
            ${accordionExpandedHoverBackgroundStylesDesktop}
            ${accordionExpandedBdShdStylesHoverDesktop}
        }
    `;

    const singleAccordionStylesTab = `
        .${blockId}.eb-accordion-container > .eb-accordion-inner > .eb-accordion-wrapper,
        .${blockId}.eb-accordion-container .eb-accordion-wrapper-${blockId}.eb-accordion-wrapper {
            ${accordionMarginTab}
            ${accordionPaddingTab}
            ${accordionBdShdStyesTab}
        }
        .${blockId}.eb-accordion-container > .eb-accordion-inner > .eb-accordion-wrapper:hover,
        .${blockId}.eb-accordion-container .eb-accordion-wrapper-${blockId}.eb-accordion-wrapper:hover {
            ${accordionBdShdStylesHoverTab}
        }
        .${blockId}.eb-accordion-container > .eb-accordion-inner > .eb-accordion-wrapper:not(.eb-accordion-hidden),
        .${blockId}.eb-accordion-container .eb-accordion-wrapper-${blockId}.eb-accordion-wrapper:not(.eb-accordion-hidden) {
            ${accordionExpandedBdShdStyesTab}
        }
        .${blockId}.eb-accordion-container > .eb-accordion-inner > .eb-accordion-wrapper:hover:not(.eb-accordion-hidden),
        .${blockId}.eb-accordion-container .eb-accordion-wrapper-${blockId}.eb-accordion-wrapper:not(.eb-accordion-hidden) {
            ${accordionExpandedBdShdStylesHoverTab}
        }
    `;

    const singleAccordionStylesMobile = `
        .${blockId}.eb-accordion-container > .eb-accordion-inner > .eb-accordion-wrapper,
        .${blockId}.eb-accordion-container .eb-accordion-wrapper-${blockId}.eb-accordion-wrapper {
            ${accordionMarginMobile}
            ${accordionPaddingMobile}
            ${accordionBdShdStyesMobile}
        }
        .${blockId}.eb-accordion-container > .eb-accordion-inner > .eb-accordion-wrapper:hover,
        .${blockId}.eb-accordion-container .eb-accordion-wrapper-${blockId}.eb-accordion-wrapper:hover {
            ${accordionBdShdStylesHoverMobile}
        }
        .${blockId}.eb-accordion-container > .eb-accordion-inner > .eb-accordion-wrapper:not(.eb-accordion-hidden),
        .${blockId}.eb-accordion-container .eb-accordion-wrapper-${blockId}.eb-accordion-wrapper:not(.eb-accordion-hidden) {
            ${accordionExpandedBdShdStyesMobile}
        }
        .${blockId}.eb-accordion-container > .eb-accordion-inner > .eb-accordion-wrapper:hover:not(.eb-accordion-hidden),
        .${blockId}.eb-accordion-container .eb-accordion-wrapper-${blockId}.eb-accordion-wrapper:hover:not(.eb-accordion-hidden) {
            ${accordionExpandedBdShdStylesHoverMobile}
        }
    `;

    const horizontalAccordionStylesDesktop = `
        .${blockId}.eb-accordion-container.eb-accordion-type-horizontal .eb-accordion-inner,
        .${blockId}.eb-accordion-container.eb-accordion-type-horizontal .block-editor-block-list__layout {
            min-height: ${horizontalHeightDesktop.replace(/[:;]/g, "")};
            max-height: ${horizontalHeightDesktop.replace(/[:;]/g, "")};
        }
        
        .${blockId}.eb-accordion-container.eb-accordion-type-horizontal .eb-accordion-inner .eb-accordion-wrapper:not(.for_edit_page) {
            transition: all ${Number(transitionDuration) * 1000}ms ease;
        }
    `;

    const horizontalAccordionStylesTab = `
        .${blockId}.eb-accordion-container.eb-accordion-type-horizontal .eb-accordion-inner,
        .${blockId}.eb-accordion-container.eb-accordion-type-horizontal .block-editor-block-list__layout {
            min-height: ${horizontalHeightTab.replace(/[:;]/g, "")}
            max-height: ${horizontalHeightTab.replace(/[:;]/g, "")}
        }
    `;

    const horizontalAccordionStylesMobile = `
        .${blockId}.eb-accordion-container.eb-accordion-type-horizontal .eb-accordion-inner,
        .${blockId}.eb-accordion-container.eb-accordion-type-horizontal .block-editor-block-list__layout {
            min-height: ${horizontalHeightMobile.replace(/[:;]/g, "")}
            max-height: ${horizontalHeightMobile.replace(/[:;]/g, "")}
        }
    `;

    // all css styles for large screen width (desktop/laptop) in strings ⬇
    const desktopAllStyles = softMinifyCssStrings(`
		${wrapperStylesDesktop}
        ${imageContainerStylesDesktop}
        ${singleAccordionStylesDesktop}
        ${horizontalAccordionStylesDesktop}
	`);

    // all css styles for Tab in strings ⬇
    const tabAllStyles = softMinifyCssStrings(`
		${wrapperStylesTab}
        ${imageContainerStylesTab}
        ${singleAccordionStylesTab}
        ${horizontalAccordionStylesTab}
	`);

    // all css styles for Mobile in strings ⬇
    const mobileAllStyles = softMinifyCssStrings(`
		${wrapperStylesMobile}
        ${imageContainerStylesMobile}
        ${singleAccordionStylesMobile}
        ${horizontalAccordionStylesMobile}
	`);

    return (
        <>
            <StyleComponent
                attributes={attributes}
                setAttributes={setAttributes}
                desktopAllStyles={desktopAllStyles}
                tabAllStyles={tabAllStyles}
                mobileAllStyles={mobileAllStyles}
                blockName={name}
            />
        </>
    );
}
