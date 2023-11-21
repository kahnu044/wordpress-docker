

/**
 * Internal depencencies
 */
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
    CAPTION_TYPOGRAPHY,
    CAPTION_WIDTH,
    IMAGE_WIDTH,
    IMAGE_HEIGHT,
    IMAGE_MAX_WIDTH,
    IMAGE_MAX_HEIGHT,
    FILTER_PADDING,
    FILTER_MARGIN,
    FILTER_BORDER_SHADOW,
} from "./constants";

import { FILTER_TYPOGRAPHY } from "./typoConstants";

// import { useState } from "react";

const {
    softMinifyCssStrings,
    generateTypographyStyles,
    generateDimensionsControlStyles,
    generateBorderShadowStyles,
    generateResponsiveRangeStyles,
    generateBackgroundControlStyles,
    StyleComponent
} = window.EBControls;

export default function Style(props) {
    const {
        attributes,
        setAttributes,
        name
    } = props;

    const {
        blockId,
        captionColor,
        captionBGColor,
        overlayColor,
        textAlign,
        imageSizeType,
        imageAlignment,
        filterColor,
        filterHoverColor,
        filterBGColor,
        filterHoverBGColor,
        filterActColor,
        filterActBGColor,
        imageGapRange,
    } = attributes;

    /**
     * CSS/styling Codes Starts from Here
     */

    // Caption Typography
    const {
        typoStylesDesktop: captionTypographyDesktop,
        typoStylesTab: captionTypographyTab,
        typoStylesMobile: captionTypographyMobile,
    } = generateTypographyStyles({
        attributes,
        prefixConstant: CAPTION_TYPOGRAPHY,
        defaultFontSize: 13,
    });

    /* Wrapper Margin */
    const {
        dimensionStylesDesktop: wrapperMarginDesktop,
        dimensionStylesTab: wrapperMarginTab,
        dimensionStylesMobile: wrapperMarginMobile,
    } = generateDimensionsControlStyles({
        controlName: WRAPPER_MARGIN,
        styleFor: "margin",
        attributes,
    });

    /* Wrapper Padding */
    const {
        dimensionStylesDesktop: wrapperPaddingDesktop,
        dimensionStylesTab: wrapperPaddingTab,
        dimensionStylesMobile: wrapperPaddingMobile,
    } = generateDimensionsControlStyles({
        controlName: WRAPPER_PADDING,
        styleFor: "padding",
        attributes,
    });

    /* Caption Margin */
    const {
        dimensionStylesDesktop: captionMarginDesktop,
        dimensionStylesTab: captionMarginTab,
        dimensionStylesMobile: captionMarginMobile,
    } = generateDimensionsControlStyles({
        controlName: CAPTION_MARGIN,
        styleFor: "margin",
        attributes,
    });

    /* Caption Padding */
    const {
        dimensionStylesDesktop: captionPaddingDesktop,
        dimensionStylesTab: captionPaddingTab,
        dimensionStylesMobile: captionPaddingMobile,
    } = generateDimensionsControlStyles({
        controlName: CAPTION_PADDING,
        styleFor: "padding",
        attributes,
    });

    // range controller Separator Line Grid Column
    const {
        rangeStylesDesktop: gridColumnsDesktop,
        rangeStylesTab: gridColumnsTab,
        rangeStylesMobile: gridColumnsMobile,
    } = generateResponsiveRangeStyles({
        controlName: GRID_COLUMNS,
        property: null,
        noUnits: true,
        attributes,
    });

    // range controller Separator Line Grid Column Margin Bottom
    const {
        rangeStylesDesktop: captionWidthDesktop,
        rangeStylesTab: captionWidthTab,
        rangeStylesMobile: captionWidthMobile,
    } = generateResponsiveRangeStyles({
        controlName: CAPTION_WIDTH,
        property: "width",
        attributes,
    });

    // range controller Separator Image Gap
    const {
        rangeStylesDesktop: imageGapStyleDesktop,
        rangeStylesTab: imageGapStyleTab,
        rangeStylesMobile: imageGapStyleMobile,
    } = generateResponsiveRangeStyles({
        controlName: IMAGE_GAP,
        property: "gap",
        attributes,
    });

    // range controller Separator Image Gap
    const {
        rangeStylesDesktop: imageMasonryGapStyleDesktop,
        rangeStylesTab: imageMasonryGapStyleTab,
        rangeStylesMobile: imageMasonryGapStyleMobile,
    } = generateResponsiveRangeStyles({
        controlName: IMAGE_GAP,
        property: null,
        noUnits: true,
        attributes,
    });

    // range controller Image Height Width
    const {
        rangeStylesDesktop: imageHeightDesktop,
        rangeStylesTab: imageHeightTab,
        rangeStylesMobile: imageHeightMobile,
    } = generateResponsiveRangeStyles({
        controlName: IMAGE_HEIGHT,
        property: "height",
        attributes,
    });

    const {
        rangeStylesDesktop: imageWidthDesktop,
        rangeStylesTab: imageWidthTab,
        rangeStylesMobile: imageWidthMobile,
    } = generateResponsiveRangeStyles({
        controlName: IMAGE_WIDTH,
        property: "width",
        attributes,
    });

    const {
        rangeStylesDesktop: imageMaxHeightDesktop,
        rangeStylesTab: imageMaxHeightTab,
        rangeStylesMobile: imageMaxHeightMobile,
    } = generateResponsiveRangeStyles({
        controlName: IMAGE_MAX_HEIGHT,
        property: "max-height",
        attributes,
    });

    const {
        rangeStylesDesktop: imageMaxWidthDesktop,
        rangeStylesTab: imageMaxWidthTab,
        rangeStylesMobile: imageMaxWidthMobile,
    } = generateResponsiveRangeStyles({
        controlName: IMAGE_MAX_WIDTH,
        property: "max-width",
        attributes,
    });

    //Generate Background
    const {
        backgroundStylesDesktop: wrapperBackgroundStylesDesktop,
        hoverBackgroundStylesDesktop: wrapperHoverBackgroundStylesDesktop,
        backgroundStylesTab: wrapperBackgroundStylesTab,
        hoverBackgroundStylesTab: wrapperHoverBackgroundStylesTab,
        backgroundStylesMobile: wrapperBackgroundStylesMobile,
        hoverBackgroundStylesMobile: wrapperHoverBackgroundStylesMobile,
        bgTransitionStyle: wrapperBgTransitionStyle,
    } = generateBackgroundControlStyles({
        attributes,
        controlName: WRAPPER_BG,
        noOverlay: true,
    });

    // generateBorderShadowStyles for Wrapper ⬇
    const {
        styesDesktop: wrapperBDShadowDesktop,
        styesTab: wrapperBDShadowTab,
        styesMobile: wrapperBDShadowMobile,
        stylesHoverDesktop: wrapperBDShadowHoverDesktop,
        stylesHoverTab: wrapperBDShadowHoverTab,
        stylesHoverMobile: wrapperBDShadowHoverMobile,
        transitionStyle: wrapperBDShadowTransitionStyle,
    } = generateBorderShadowStyles({
        controlName: WRAPPER_BORDER_SHADOW,
        attributes,
        // noShadow: true,
        // noBorder: true,
    });

    // generateBorderShadowStyles for Images ⬇
    const {
        styesDesktop: imageBDShadowDesktop,
        styesTab: imageBDShadowTab,
        styesMobile: imageBDShadowMobile,
        stylesHoverDesktop: imageBDShadowHoverDesktop,
        stylesHoverTab: imageBDShadowHoverTab,
        stylesHoverMobile: imageBDShadowHoverMobile,
        transitionStyle: imageBDShadowTransitionStyle,
    } = generateBorderShadowStyles({
        controlName: IMAGE_BORDER_SHADOW,
        attributes,
        noShadow: true,
        // noBorder: true,
    });

    // filter
    const {
        dimensionStylesDesktop: filterMarginDesktop,
        dimensionStylesTab: filterMarginTab,
        dimensionStylesMobile: filterMarginMobile,
    } = generateDimensionsControlStyles({
        controlName: FILTER_MARGIN,
        styleFor: "margin",
        attributes,
    });

    /* Button Padding */
    const {
        dimensionStylesDesktop: filterPaddingDesktop,
        dimensionStylesTab: filterPaddingTab,
        dimensionStylesMobile: filterPaddingMobile,
    } = generateDimensionsControlStyles({
        controlName: FILTER_PADDING,
        styleFor: "padding",
        attributes,
    });

    const {
        typoStylesDesktop: filterTypographyDesktop,
        typoStylesTab: filterTypographyTab,
        typoStylesMobile: filterTypographyMobile,
    } = generateTypographyStyles({
        attributes,
        prefixConstant: FILTER_TYPOGRAPHY,
        defaultFontSize: 13,
    });

    const {
        styesDesktop: filterBDShadowDesktop,
        styesTab: filterBDShadowTab,
        styesMobile: filterBDShadowMobile,
        stylesHoverDesktop: filterBDShadowHoverDesktop,
        stylesHoverTab: filterBDShadowHoverTab,
        stylesHoverMobile: filterBDShadowHoverMobile,
        transitionStyle: filterBDShadowTransitionStyle,
    } = generateBorderShadowStyles({
        controlName: FILTER_BORDER_SHADOW,
        attributes,
        // noShadow: true,
        // noBorder: true,
    });

    // wrapper styles css in strings ⬇
    const wrapperStylesDesktop = `
		.eb-gallery-img-wrapper.${blockId}{
			${imageGapStyleDesktop}
			${wrapperMarginDesktop}
			${wrapperPaddingDesktop}
			${wrapperBDShadowDesktop}
			${wrapperBackgroundStylesDesktop}
			transition:${wrapperBgTransitionStyle}, ${wrapperBDShadowTransitionStyle};
		}
		.eb-gallery-img-wrapper.${blockId}:hover {
			${wrapperBDShadowHoverDesktop}
			${wrapperHoverBackgroundStylesDesktop}
		}
		.eb-gallery-img-wrapper.${blockId}.grid{
			display: flex;
			flex-wrap: wrap;
			justify-content: ${imageAlignment};
		}
		.eb-gallery-img-wrapper.${blockId}.grid .eb-gallery-img-content {
			width: calc((99.5% / ${gridColumnsDesktop}) - ${imageMasonryGapStyleDesktop}px);
		}
		.eb-gallery-img-wrapper.${blockId}.masonry{
			columns: ${gridColumnsDesktop};
		}
		.eb-gallery-img-wrapper.${blockId}.masonry .eb-gallery-img-content{
			margin-bottom: ${imageMasonryGapStyleDesktop}px;
		}
	`;
    const wrapperStylesTab = `
		.eb-gallery-img-wrapper.${blockId}{
			${imageGapStyleTab}
			${wrapperMarginTab}
			${wrapperPaddingTab}
			${wrapperBDShadowTab}
			${wrapperBackgroundStylesTab}
		}
		.eb-gallery-img-wrapper.${blockId}:hover {
			${wrapperBDShadowHoverTab}
			${wrapperHoverBackgroundStylesTab}
		}
		.eb-gallery-img-wrapper.${blockId}.grid .eb-gallery-img-content {
			width: calc((100% / ${gridColumnsTab || gridColumnsDesktop}) - ${imageMasonryGapStyleTab || imageMasonryGapStyleDesktop
        }px);
		}
		.eb-gallery-img-wrapper.${blockId}.masonry{
			columns: ${gridColumnsTab};
		}
		.eb-gallery-img-wrapper.${blockId}.masonry .eb-gallery-img-content{
			margin-bottom: ${imageMasonryGapStyleTab}px;
		}
	`;
    const wrapperStylesMobile = `
		.eb-gallery-img-wrapper.${blockId}{
			${imageGapStyleMobile}
			${wrapperMarginMobile}
			${wrapperPaddingMobile}
			${wrapperBDShadowMobile}
			${wrapperBackgroundStylesMobile}
		}
		.eb-gallery-img-wrapper.${blockId}:hover {
			${wrapperBDShadowHoverMobile}
			${wrapperHoverBackgroundStylesMobile}
		}
		.eb-gallery-img-wrapper.${blockId}.grid .eb-gallery-img-content {
			width: calc((100% / ${gridColumnsMobile || gridColumnsDesktop}) - ${imageMasonryGapStyleMobile || imageMasonryGapStyleDesktop
        }px);
		}
		.eb-gallery-img-wrapper.${blockId}.masonry{
			columns: ${gridColumnsMobile};
		}
		.eb-gallery-img-wrapper.${blockId}.masonry .eb-gallery-img-content{
			margin-bottom: ${imageMasonryGapStyleMobile}px;
		}
	`;

    const imageStylesDesktop = `
		.eb-gallery-img-wrapper.${blockId}.grid .eb-gallery-img-content img {
			${imageSizeType === "fixed"
            ? `
				${imageHeightDesktop}
				${imageWidthDesktop}
			`
            : `
				${imageMaxHeightDesktop}
				${imageMaxWidthDesktop}
			`
        }
		}
		.eb-gallery-img-wrapper.${blockId} .eb-gallery-img-content img {
			${imageBDShadowDesktop}
			transition:${imageBDShadowTransitionStyle};
		}
		.eb-gallery-img-wrapper.${blockId} .eb-gallery-img-content:hover img {
			${imageBDShadowHoverDesktop}
		}
		.eb-gallery-img-wrapper.${blockId} .eb-gallery-img-content .eb-gallery-img-caption {
			color: ${captionColor};
			background-color: ${captionBGColor};
			text-align: ${textAlign};
			${captionMarginDesktop}
			${captionPaddingDesktop}
			${captionTypographyDesktop}
			${captionWidthDesktop}
		}
		.eb-gallery-img-wrapper.${blockId}.caption-style-2 .eb-gallery-link-wrapper:after {
			background-color: ${overlayColor};
		}
	`;

    const imageStylesTab = `
		.eb-gallery-img-wrapper.${blockId}.grid .eb-gallery-img-content img {
			${imageSizeType === "fixed"
            ? `
				${imageHeightTab}
				${imageWidthTab}
			`
            : `
				${imageMaxHeightTab}
				${imageMaxWidthTab}
			`
        }
		}
		.eb-gallery-img-wrapper.${blockId} .eb-gallery-img-content img {
			${imageBDShadowTab}
		}
		.eb-gallery-img-wrapper.${blockId} .eb-gallery-img-content:hover img {
			${imageBDShadowHoverTab}
		}
		.eb-gallery-img-wrapper.${blockId} .eb-gallery-img-content .eb-gallery-img-caption {
			${captionMarginTab}
			${captionPaddingTab}
			${captionTypographyTab}
			${captionWidthTab}
		}
	`;

    const imageStylesMobile = `
		.eb-gallery-img-wrapper.${blockId}.grid .eb-gallery-img-content img {
			${imageSizeType === "fixed"
            ? `
				${imageHeightMobile}
				${imageWidthMobile}
			`
            : `
				${imageMaxHeightMobile}
				${imageMaxWidthMobile}
			`
        }
		}
		.eb-gallery-img-wrapper.${blockId} .eb-gallery-img-content img {
			${imageBDShadowMobile}
		}
		.eb-gallery-img-wrapper.${blockId} .eb-gallery-img-content:hover img {
			${imageBDShadowHoverMobile}
		}
		.eb-gallery-img-wrapper.${blockId} .eb-gallery-img-content .eb-gallery-img-caption {
			${captionMarginMobile}
			${captionPaddingMobile}
			${captionTypographyMobile}
			${captionWidthMobile}
		}
	`;

    const filterStylesDesktop = `
		.eb-parent-${blockId} .eb-img-gallery-filter-item {
			${filterMarginDesktop}
			${filterPaddingDesktop}
			${filterTypographyDesktop}
			${filterBDShadowDesktop}
			transition:${filterBDShadowTransitionStyle};
			color: ${filterColor};
			background-color: ${filterBGColor};
		}

		.eb-parent-${blockId} .eb-img-gallery-filter-item:hover {
			${filterBDShadowHoverDesktop}
			color: ${filterHoverColor};
			background-color: ${filterHoverBGColor};
		}

		.eb-parent-${blockId} .eb-img-gallery-filter-item.is-checked {
			color: ${filterActColor};
			background-color: ${filterActBGColor};
		}

		.eb-gallery-img-wrapper.${blockId}.eb-filterable-img-gallery .eb-gallery-img-content {
			margin: calc(${imageGapRange}px / 2);
		}

		.eb-gallery-img-wrapper.${blockId}.eb-filterable-img-gallery.masonry .eb-gallery-img-content {
			width: calc((100% / ${gridColumnsDesktop}) - ${imageMasonryGapStyleDesktop}px) ;
		}

	`;

    const filterStylesTab = `
		.eb-parent-${blockId} .eb-img-gallery-filter-item {
			${filterMarginTab}
			${filterPaddingTab}
			${filterTypographyTab}
			${filterBDShadowTab}
		}

		.eb-parent-${blockId} .eb-img-gallery-filter-item:hover {
			${filterBDShadowHoverTab}
		}

		.eb-gallery-img-wrapper.${blockId}.eb-filterable-img-gallery.masonry .eb-gallery-img-content {
			width: calc((100% / ${gridColumnsTab}) - ${imageMasonryGapStyleTab
            ? imageMasonryGapStyleTab
            : imageMasonryGapStyleDesktop
        }px);
		}

	`;

    const filterStylesMobile = `
		.eb-parent-${blockId} .eb-img-gallery-filter-item {
			${filterMarginMobile}
			${filterPaddingMobile}
			${filterTypographyMobile}
			${filterBDShadowMobile}
		}

		.eb-parent-${blockId} .eb-img-gallery-filter-item:hover {
			${filterBDShadowHoverMobile}
		}

		.eb-gallery-img-wrapper.${blockId}.eb-filterable-img-gallery.masonry .eb-gallery-img-content {
			width: calc((100% / ${gridColumnsMobile}) - ${imageMasonryGapStyleMobile
            ? imageMasonryGapStyleMobile
            : imageMasonryGapStyleDesktop
        }px);
		}

	`;

    // all css styles for large screen width (desktop/laptop) in strings ⬇
    const desktopAllStyles = softMinifyCssStrings(`
		${wrapperStylesDesktop}
		${imageStylesDesktop}
		${filterStylesDesktop}
	`);

    // all css styles for Tab in strings ⬇
    const tabAllStyles = softMinifyCssStrings(`
		${wrapperStylesTab}
		${imageStylesTab}
		${filterStylesTab}
	`);

    // all css styles for Mobile in strings ⬇
    const mobileAllStyles = softMinifyCssStrings(`
		${wrapperStylesMobile}
		${imageStylesMobile}
		${filterStylesMobile}
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

            <style>
                {`
                    @media all and (max-width: 1024px) {
                        .eb-gallery-img-wrapper.eb-filterable-img-gallery.masonry {
                            display: block;
                        }
                        .eb-gallery-img-wrapper.eb-filterable-img-gallery.masonry .eb-gallery-img-content {
                            break-inside: avoid;
                            display: initial;
                        }
                        .eb-gallery-img-wrapper.eb-filterable-img-gallery.masonry .eb-gallery-img-content img {
                            display: block;
                            height: auto;
                            max-width: 100%;
                            box-sizing: border-box;
                        }
                    }
                `}
            </style>
        </>
    )
}
