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
    CAPTION_WIDTH,
    IMAGE_WIDTH,
    IMAGE_HEIGHT,
    IMAGE_MAX_WIDTH,
    IMAGE_MAX_HEIGHT,
    FILTER_PADDING,
    FILTER_MARGIN,
    FILTER_BORDER_SHADOW,
    LOADMORE_PADDING,
    LOADMORE_BORDER,
    LOADMORE_KEYS,
    DESCRIPTION_MARGIN,
    DESCRIPTION_PADDING,
    ICON_BORDER_SHADOW,
    CONTENT_PADDING,
    CONTENT_MARGIN,
    CONTENT_BORDER_SHADOW,
    OVERLAY_PADDING,
    FILTER_WRAPPER_BORDER_SHADOW
} from "./constants";

import { FILTER_TYPOGRAPHY, CAPTION_TYPOGRAPHY, LOADMORE_TYPOGRAPHY, DESCRIPTION_TYPOGRAPHY, NOT_FOUND_TYPOGRAPHY } from "./typoConstants";

import {
    softMinifyCssStrings,
    generateTypographyStyles,
    generateDimensionsControlStyles,
    generateBorderShadowStyles,
    generateResponsiveRangeStyles,
    generateBackgroundControlStyles,
    useBlockAttributes,
    StyleComponent,
    EBButton
} from "@essential-blocks/controls";

export default function Style(props) {
    const {
        setAttributes,
        name
    } = props;

    const attributes = useBlockAttributes();

    const {
        blockId,
        captionColor,
        captionBGColor,
        descriptionColor,
        descriptionBGColor,
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
        TABimageGapRange,
        MOBimageGapRange,
        loadmoreBGColor,
        loadmoreHvBGColor,
        enableFilter,
        iconColor,
        iconHoverColor,
        iconBGColor,
        iconHoverBGColor,
        iconWidth,
        iconSize,
        imgBorderShadowRds_Top,
        imgBorderShadowRds_Bottom,
        imgBorderShadowRds_Left,
        imgBorderShadowRds_Right,
        imgBorderShadowRds_Unit,
        TABimgBorderShadowRds_Top,
        TABimgBorderShadowRds_Bottom,
        TABimgBorderShadowRds_Left,
        TABimgBorderShadowRds_Right,
        TABimgBorderShadowRds_Unit,
        MOBimgBorderShadowRds_Top,
        MOBimgBorderShadowRds_Bottom,
        MOBimgBorderShadowRds_Left,
        MOBimgBorderShadowRds_Right,
        MOBimgBorderShadowRds_Unit,
        contentAlign,
        presets,
        maskColor,
        filterWrapperBGColor,
        notFoundColor,
        contentBGColor,
        version
    } = attributes;

    /**
     * CSS/styling Codes Starts from Here
     */

    // Caption Typography
    const {
        typoStylesDesktop: notFoundTypographyDesktop,
        typoStylesTab: notFoundTypographyTab,
        typoStylesMobile: notFoundTypographyMobile,
    } = generateTypographyStyles({
        attributes,
        prefixConstant: NOT_FOUND_TYPOGRAPHY,
        defaultFontSize: 14,
    });
    const {
        typoStylesDesktop: captionTypographyDesktop,
        typoStylesTab: captionTypographyTab,
        typoStylesMobile: captionTypographyMobile,
    } = generateTypographyStyles({
        attributes,
        prefixConstant: CAPTION_TYPOGRAPHY,
        defaultFontSize: 13,
    });
    const {
        typoStylesDesktop: descTypoDesktop,
        typoStylesTab: descTypoTab,
        typoStylesMobile: descTypoMobile,
    } = generateTypographyStyles({
        attributes,
        prefixConstant: DESCRIPTION_TYPOGRAPHY,
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

    const {
        dimensionStylesDesktop: descMarginDesktop,
        dimensionStylesTab: descMarginTab,
        dimensionStylesMobile: descMarginMobile,
    } = generateDimensionsControlStyles({
        controlName: DESCRIPTION_MARGIN,
        styleFor: "margin",
        attributes,
    });

    /* Caption Padding */
    const {
        dimensionStylesDesktop: descPaddingDesktop,
        dimensionStylesTab: descPaddingTab,
        dimensionStylesMobile: descPaddingMobile,
    } = generateDimensionsControlStyles({
        controlName: DESCRIPTION_PADDING,
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
    const {
        styesDesktop: iconBDShadowDesktop,
        styesTab: iconBDShadowTab,
        styesMobile: iconBDShadowMobile,
        stylesHoverDesktop: iconBDShadowHoverDesktop,
        stylesHoverTab: iconBDShadowHoverTab,
        stylesHoverMobile: iconBDShadowHoverMobile,
        transitionStyle: iconBDShadowTransitionStyle,
    } = generateBorderShadowStyles({
        controlName: ICON_BORDER_SHADOW,
        attributes,
    });

    const {
        styesDesktop: contentBDShadowDesktop,
        styesTab: contentBDShadowTab,
        styesMobile: contentBDShadowMobile,
        stylesHoverDesktop: contentBDShadowHoverDesktop,
        stylesHoverTab: contentBDShadowHoverTab,
        stylesHoverMobile: contentBDShadowHoverMobile,
        transitionStyle: contentBDShadowTransitionStyle,
    } = generateBorderShadowStyles({
        controlName: CONTENT_BORDER_SHADOW,
        attributes,
        noShadow: true,
        // noBorder: true,
    });

    const {
        styesDesktop: filterWrapBDShadowDesktop,
        styesTab: filterWrapBDShadowTab,
        styesMobile: filterWrapBDShadowMobile,
        stylesHoverDesktop: filterWrapBDShadowHoverDesktop,
        stylesHoverTab: filterWrapBDShadowHoverTab,
        stylesHoverMobile: filterWrapBDShadowHoverMobile,
        transitionStyle: filterWrapBDShadowTransitionStyle,
    } = generateBorderShadowStyles({
        controlName: FILTER_WRAPPER_BORDER_SHADOW,
        attributes,
        noShadow: true,
        // noBorder: true,
    });

    const {
        dimensionStylesDesktop: contentMarginDesktop,
        dimensionStylesTab: contentMarginTab,
        dimensionStylesMobile: contentMarginMobile,
    } = generateDimensionsControlStyles({
        controlName: CONTENT_MARGIN,
        styleFor: "margin",
        attributes,
    });

    const {
        dimensionStylesDesktop: contentPaddingDesktop,
        dimensionStylesTab: contentPaddingTab,
        dimensionStylesMobile: contentPaddingMobile,
    } = generateDimensionsControlStyles({
        controlName: CONTENT_PADDING,
        styleFor: "padding",
        attributes,
    });

    const {
        dimensionStylesDesktop: overlayPaddingDesktop,
        dimensionStylesTab: overlayPaddingTab,
        dimensionStylesMobile: overlayPaddingMobile,
    } = generateDimensionsControlStyles({
        controlName: OVERLAY_PADDING,
        styleFor: "padding",
        attributes,
    });

    const calcWidth = (column, gap) => {
        const item = gap / column
        return `calc((100% / ${column}) - ${(item * (column - 1))}px)`
    }

    // wrapper styles css in strings ⬇
    const wrapperStylesDesktop = `
		.eb-gallery-img-wrapper.${blockId}{
			${wrapperMarginDesktop}
			${wrapperPaddingDesktop}
			${wrapperBDShadowDesktop}
			${wrapperBackgroundStylesDesktop}
			transition:${wrapperBgTransitionStyle}, ${wrapperBDShadowTransitionStyle};
		}
        .eb-gallery-img-wrapper.${blockId}.no-isotope{
            ${imageGapStyleDesktop}
        }
		.eb-gallery-img-wrapper.${blockId}:hover {
			${wrapperBDShadowHoverDesktop}
			${wrapperHoverBackgroundStylesDesktop}
		}
		.eb-gallery-img-wrapper.${blockId}.grid{
			display: flex;
			flex-wrap: wrap;
			justify-content: ${imageAlignment};
            min-width: 1px;
		}
		.eb-gallery-img-wrapper.${blockId}.grid .eb-gallery-img-content {
			width: ${calcWidth(gridColumnsDesktop, imageMasonryGapStyleDesktop)};
            box-sizing: border-box;
            min-width: 1px;
		}
		.eb-gallery-img-wrapper.${blockId}.masonry .eb-gallery-img-content{
			margin-bottom: ${imageMasonryGapStyleDesktop}px;
		}
	`;
    const wrapperStylesTab = `
		.eb-gallery-img-wrapper.${blockId}{
			${wrapperMarginTab}
			${wrapperPaddingTab}
			${wrapperBDShadowTab}
			${wrapperBackgroundStylesTab}
		}
        .eb-gallery-img-wrapper.${blockId}.no-isotope{
            ${imageGapStyleTab}
        }
		.eb-gallery-img-wrapper.${blockId}:hover {
			${wrapperBDShadowHoverTab}
			${wrapperHoverBackgroundStylesTab}
		}
		.eb-gallery-img-wrapper.${blockId}.grid .eb-gallery-img-content {
			width: ${calcWidth(gridColumnsTab || gridColumnsDesktop, imageMasonryGapStyleTab || imageMasonryGapStyleDesktop)};
		}
		.eb-gallery-img-wrapper.${blockId}.masonry .eb-gallery-img-content{
			margin-bottom: ${imageMasonryGapStyleTab}px;
		}
	`;
    const wrapperStylesMobile = `
		.eb-gallery-img-wrapper.${blockId}{
			${wrapperMarginMobile}
			${wrapperPaddingMobile}
			${wrapperBDShadowMobile}
			${wrapperBackgroundStylesMobile}
		}
        .eb-gallery-img-wrapper.${blockId}.no-isotope{
            ${imageGapStyleMobile}
        }
		.eb-gallery-img-wrapper.${blockId}:hover {
			${wrapperBDShadowHoverMobile}
			${wrapperHoverBackgroundStylesMobile}
		}
		.eb-gallery-img-wrapper.${blockId}.grid .eb-gallery-img-content {
			width: ${calcWidth(gridColumnsMobile || gridColumnsDesktop, imageMasonryGapStyleMobile || imageMasonryGapStyleDesktop)};
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
		.eb-gallery-img-wrapper.${blockId}:not(.pro-preset-5) .eb-gallery-img-content img {
			${imageBDShadowDesktop}
			transition:${imageBDShadowTransitionStyle};
		}
		.eb-gallery-img-wrapper.${blockId}:not(.pro-preset-5) .eb-gallery-img-content:hover img {
			${imageBDShadowHoverDesktop}
		}
        .eb-gallery-img-wrapper.${blockId}.pro-preset-5 .eb-gallery-img-content .eb-gallery-link-wrapper {
			${imageBDShadowDesktop}
			transition:${imageBDShadowTransitionStyle};
		}
		.eb-gallery-img-wrapper.${blockId}.pro-preset-5 .eb-gallery-img-content:hover .eb-gallery-link-wrapper {
			${imageBDShadowHoverDesktop}
		}
		.eb-gallery-img-wrapper.${blockId} .eb-gallery-img-content .eb-gallery-img-caption {
			color: ${captionColor};
			background-color: ${captionBGColor};
			${captionMarginDesktop}
			${captionPaddingDesktop}
			${captionTypographyDesktop}
            ${presets == 'default' ? `text-align: ${textAlign}; ${captionWidthDesktop}` : ''}
		}
		.eb-gallery-img-wrapper.${blockId}.caption-style-2 .eb-gallery-link-wrapper:after {
			background-color: ${overlayColor};
		}

        .eb-gallery-img-wrapper.${blockId} .eb-gallery-img-content .eb-img-gallery-content {
            background: ${contentBGColor};
            ${presets == 'default' && version !== undefined ?
            `${captionWidthDesktop}` :
            `text-align: ${contentAlign};
            ${contentMarginDesktop}
			${contentPaddingDesktop}
            ${contentBDShadowDesktop}
            transition: ${contentBDShadowTransitionStyle};`}

		}
        .eb-gallery-img-wrapper.${blockId} .eb-gallery-img-content .eb-img-gallery-content:hover {
            ${contentBDShadowHoverDesktop}
		}

        .eb-gallery-img-wrapper.${blockId}.enable-isotope .grid-sizer,
        .eb-gallery-img-wrapper.${blockId}.enable-isotope .eb-gallery-img-content {
			margin: calc(${imageGapRange}px / 2);
            width: calc(100% / ${gridColumnsDesktop} - ${imageMasonryGapStyleDesktop}px);
		}
        .eb-gallery-img-wrapper.${blockId}.enable-isotope .eb-gallery-img-content.wide {
			margin: calc(${imageGapRange}px / 2);
            width: calc(100% *2/ ${gridColumnsDesktop} - ${imageMasonryGapStyleDesktop}px);
		}

        .eb-gallery-img-wrapper.${blockId} .eb-gallery-img-content .eb-gallery-img-description {
			color: ${descriptionColor};
			background-color: ${descriptionBGColor};
			${descMarginDesktop}
			${descPaddingDesktop}
			${descTypoDesktop}

            ${presets == 'default' && version !== undefined ? `text-align: ${textAlign};` : ''}
		}
        .eb-gallery-img-wrapper.${blockId} .eb-gallery-img-content .eb-img-gallery-action {
			color: ${iconColor};
			background-color: ${iconBGColor};
			font-size: ${iconSize}px;
			width: ${iconWidth}px;
			height: ${iconWidth}px;
			line-height: ${iconWidth}px;
			${iconBDShadowDesktop}
			transition: ${iconBDShadowTransitionStyle};
		}

        .eb-gallery-img-wrapper.${blockId} .eb-gallery-img-content .eb-img-gallery-action:hover {
			color: ${iconHoverColor};
			background-color: ${iconHoverBGColor};
			${iconBDShadowHoverDesktop}
		}

        .eb-gallery-img-wrapper.${blockId} .eb-gallery-link-wrapper:before,
        .eb-gallery-img-wrapper.${blockId}.preset-3 .eb-gallery-link-wrapper .eb-img-gallery-overlay {
			background-color: ${overlayColor};
		}
        .eb-gallery-img-wrapper.${blockId} .eb-gallery-link-wrapper .eb-img-gallery-overlay {
			${overlayPaddingDesktop};
		}
        .eb-gallery-img-wrapper.${blockId}.pro-preset-4 .eb-gallery-link-wrapper::before {
			background: linear-gradient(to bottom, transparent 0, ${overlayColor} 100%);
            border-radius: ${imgBorderShadowRds_Top}${imgBorderShadowRds_Unit} ${imgBorderShadowRds_Left}${imgBorderShadowRds_Unit} ${imgBorderShadowRds_Bottom}${imgBorderShadowRds_Unit} ${imgBorderShadowRds_Right}${imgBorderShadowRds_Unit};
		}
        .eb-gallery-img-wrapper.${blockId}.preset-3 .eb-gallery-link-wrapper .eb-img-gallery-overlay,
        .eb-gallery-img-wrapper.${blockId}.preset-3 .eb-gallery-link-wrapper .eb-gallery-img-container {
            border-radius: ${imgBorderShadowRds_Top}${imgBorderShadowRds_Unit} ${imgBorderShadowRds_Left}${imgBorderShadowRds_Unit} ${imgBorderShadowRds_Bottom}${imgBorderShadowRds_Unit} ${imgBorderShadowRds_Right}${imgBorderShadowRds_Unit};
		}

        .eb-gallery-img-wrapper.${blockId}.preset-3 .eb-gallery-link-wrapper .eb-img-gallery-actions {
            border-radius: ${imgBorderShadowRds_Top}${imgBorderShadowRds_Unit} 0;
            background: ${maskColor};
        }
        .eb-gallery-img-wrapper.${blockId}.preset-3 .eb-gallery-link-wrapper .eb-img-gallery-actions::before {
            top: calc(-${imgBorderShadowRds_Top}px * 2);
            height: calc(${imgBorderShadowRds_Top}px * 2);
            width: ${imgBorderShadowRds_Top}px;
            border-bottom-right-radius: ${imgBorderShadowRds_Top}px;
            box-shadow: 0px ${imgBorderShadowRds_Top}px 0 0 ${maskColor};
        }
        .eb-gallery-img-wrapper.${blockId}.preset-3 .eb-gallery-link-wrapper .eb-img-gallery-actions::after {
            bottom: 0;
            left: calc(-${imgBorderShadowRds_Top}px * 2);
            width: calc(${imgBorderShadowRds_Top}px * 2);
            height: ${imgBorderShadowRds_Top}px;
            border-bottom-right-radius: ${imgBorderShadowRds_Top}px;
            box-shadow: ${imgBorderShadowRds_Top}px 0px 0 0 ${maskColor};
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
            ${presets == 'default' && version === undefined ? `${textAlign}; ${captionWidthTab}` : ''}
		}
        .eb-gallery-img-wrapper.${blockId} .eb-gallery-img-content .eb-img-gallery-content {
            ${contentMarginTab}
			${contentPaddingTab}
            ${contentBDShadowTab}
		}
        .eb-gallery-img-wrapper.${blockId} .eb-gallery-img-content .eb-img-gallery-content:hover {
            ${contentBDShadowHoverTab}
		}
        .eb-gallery-img-wrapper.${blockId}.enable-isotope .grid-sizer,
        .eb-gallery-img-wrapper.${blockId}.enable-isotope .eb-gallery-img-content {
            margin: calc(${TABimageGapRange}px / 2);
            width: calc(100% / ${gridColumnsTab} - ${imageMasonryGapStyleTab}px);
		}
        .eb-gallery-img-wrapper.${blockId}.enable-isotope .eb-gallery-img-content.wide {
			margin: calc(${TABimageGapRange}px / 2);
            width: calc(100% *2/ ${gridColumnsTab} - ${imageMasonryGapStyleTab}px);
		}
        .eb-gallery-img-wrapper.${blockId} .eb-gallery-img-content .eb-gallery-img-description {
			${descMarginTab}
			${descPaddingTab}
			${descTypoTab}
		}
        .eb-gallery-img-wrapper.${blockId} .eb-gallery-img-content .eb-img-gallery-action {
			${iconBDShadowTab}
		}
        .eb-gallery-img-wrapper.${blockId} .eb-gallery-img-content .eb-img-gallery-action:hover {
			${iconBDShadowHoverTab}
		}
        .eb-gallery-img-wrapper.${blockId} .eb-gallery-link-wrapper .eb-img-gallery-overlay {
			${overlayPaddingTab};
		}
        .eb-gallery-img-wrapper.${blockId}.pro-preset-4 .eb-gallery-link-wrapper::before {
            border-radius: ${TABimgBorderShadowRds_Top}${TABimgBorderShadowRds_Unit} ${TABimgBorderShadowRds_Left}${TABimgBorderShadowRds_Unit} ${TABimgBorderShadowRds_Bottom}${TABimgBorderShadowRds_Unit} ${TABimgBorderShadowRds_Right}${TABimgBorderShadowRds_Unit};
		}
        .eb-gallery-img-wrapper.${blockId}.preset-3 .eb-gallery-link-wrapper .eb-img-gallery-overlay,
        .eb-gallery-img-wrapper.${blockId}.preset-3 .eb-gallery-link-wrapper .eb-gallery-img-container {
            border-radius: ${TABimgBorderShadowRds_Top}${TABimgBorderShadowRds_Unit} ${TABimgBorderShadowRds_Left}${TABimgBorderShadowRds_Unit} ${TABimgBorderShadowRds_Bottom}${TABimgBorderShadowRds_Unit} ${TABimgBorderShadowRds_Right}${TABimgBorderShadowRds_Unit};
		}

        .eb-gallery-img-wrapper.${blockId}.preset-3 .eb-gallery-link-wrapper .eb-img-gallery-actions {
            border-radius: ${TABimgBorderShadowRds_Top}${TABimgBorderShadowRds_Unit} 0;
        }
        .eb-gallery-img-wrapper.${blockId}.preset-3 .eb-gallery-link-wrapper .eb-img-gallery-actions::before {
            top: calc(-${TABimgBorderShadowRds_Top}px * 2);
            height: calc(${TABimgBorderShadowRds_Top}px * 2);
            width: ${TABimgBorderShadowRds_Top}px;
            border-bottom-right-radius: ${TABimgBorderShadowRds_Top}px;
            box-shadow: 0px ${TABimgBorderShadowRds_Top}px 0 0 ${maskColor};
        }
        .eb-gallery-img-wrapper.${blockId}.preset-3 .eb-gallery-link-wrapper .eb-img-gallery-actions::after {
            bottom: 0;
            left: calc(-${TABimgBorderShadowRds_Top}px * 2);
            width: calc(${TABimgBorderShadowRds_Top}px * 2);
            height: ${TABimgBorderShadowRds_Top}px;
            border-bottom-right-radius: ${TABimgBorderShadowRds_Top}px;
            box-shadow: ${TABimgBorderShadowRds_Top}px 0px 0 0 ${maskColor};
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
            ${presets == 'default' && version === undefined ? `${textAlign}; ${captionWidthMobile}` : ''}
		}

        .eb-gallery-img-wrapper.${blockId} .eb-gallery-img-content .eb-img-gallery-content {
            ${contentMarginMobile}
			${contentPaddingMobile}
            ${contentBDShadowMobile}
		}
        .eb-gallery-img-wrapper.${blockId} .eb-gallery-img-content .eb-img-gallery-content:hover {
            ${contentBDShadowHoverMobile}
		}
        .eb-gallery-img-wrapper.${blockId}.enable-isotope .grid-sizer,
        .eb-gallery-img-wrapper.${blockId}.enable-isotope .eb-gallery-img-content {
            margin: calc(${MOBimageGapRange}px / 2);
            width: calc(100% / ${gridColumnsMobile} - ${imageMasonryGapStyleMobile}px);
		}
        .eb-gallery-img-wrapper.${blockId}.enable-isotope .eb-gallery-img-content.wide {
			margin: calc(${TABimageGapRange}px / 2);
            width: calc(100% *2/ ${gridColumnsTab} - ${imageMasonryGapStyleTab}px);
		}
        .eb-gallery-img-wrapper.${blockId} .eb-gallery-img-content .eb-gallery-img-description {
			${descMarginMobile}
			${descPaddingMobile}
			${descTypoMobile}
		}
        .eb-gallery-img-wrapper.${blockId} .eb-gallery-img-content .eb-img-gallery-action {
			${iconBDShadowMobile}
		}
        .eb-gallery-img-wrapper.${blockId} .eb-gallery-img-content .eb-img-gallery-action:hover {
			${iconBDShadowHoverMobile}
		}
        .eb-gallery-img-wrapper.${blockId} .eb-gallery-link-wrapper .eb-img-gallery-overlay {
			${overlayPaddingMobile};
		}
        .eb-gallery-img-wrapper.${blockId}.pro-preset-4 .eb-gallery-link-wrapper::before {
            border-radius: ${MOBimgBorderShadowRds_Top}${MOBimgBorderShadowRds_Unit} ${MOBimgBorderShadowRds_Left}${MOBimgBorderShadowRds_Unit} ${MOBimgBorderShadowRds_Bottom}${MOBimgBorderShadowRds_Unit} ${MOBimgBorderShadowRds_Right}${MOBimgBorderShadowRds_Unit};
		}
        .eb-gallery-img-wrapper.${blockId}.preset-3 .eb-gallery-link-wrapper .eb-img-gallery-overlay,
        .eb-gallery-img-wrapper.${blockId}.preset-3 .eb-gallery-link-wrapper .eb-gallery-img-container {
            border-radius: ${MOBimgBorderShadowRds_Top}${MOBimgBorderShadowRds_Unit} ${MOBimgBorderShadowRds_Left}${MOBimgBorderShadowRds_Unit} ${MOBimgBorderShadowRds_Bottom}${MOBimgBorderShadowRds_Unit} ${MOBimgBorderShadowRds_Right}${MOBimgBorderShadowRds_Unit};
		}

        .eb-gallery-img-wrapper.${blockId}.preset-3 .eb-gallery-link-wrapper .eb-img-gallery-actions {
            border-radius: ${MOBimgBorderShadowRds_Top}${MOBimgBorderShadowRds_Unit} 0;
        }
        .eb-gallery-img-wrapper.${blockId}.preset-3 .eb-gallery-link-wrapper .eb-img-gallery-actions::before {
            top: calc(-${MOBimgBorderShadowRds_Top}px * 2);
            height: calc(${MOBimgBorderShadowRds_Top}px * 2);
            width: ${MOBimgBorderShadowRds_Top}px;
            border-bottom-right-radius: ${MOBimgBorderShadowRds_Top}px;
            box-shadow: 0px ${MOBimgBorderShadowRds_Top}px 0 0 ${maskColor};
        }
        .eb-gallery-img-wrapper.${blockId}.preset-3 .eb-gallery-link-wrapper .eb-img-gallery-actions::after {
            bottom: 0;
            left: calc(-${MOBimgBorderShadowRds_Top}px * 2);
            width: calc(${MOBimgBorderShadowRds_Top}px * 2);
            height: ${MOBimgBorderShadowRds_Top}px;
            border-bottom-right-radius: ${MOBimgBorderShadowRds_Top}px;
            box-shadow: ${MOBimgBorderShadowRds_Top}px 0px 0 0 ${maskColor};
        }
	`;

    const filterStylesDesktop = `
		.eb-parent-${blockId} .eb-img-gallery-filter-wrapper {
			${filterWrapBDShadowDesktop}
			transition:${filterWrapBDShadowTransitionStyle};
			background-color: ${filterWrapperBGColor};
		}
		.eb-parent-${blockId} .eb-img-gallery-filter-wrapper:hover {
			${filterWrapBDShadowHoverDesktop}
		}
        .eb-parent-${blockId} .eb-img-gallery-filter-wrapper.preset-4 .is-checked:after {
            background-color: ${filterActColor};
        }
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
            ${filterBDShadowHoverDesktop}
		}
		.eb-gallery-img-wrapper.${blockId}.eb-filterable-img-gallery .eb-gallery-img-content {
			margin: calc(${imageGapRange}px / 2);
            width: calc(99.99% / ${gridColumnsDesktop} - ${imageMasonryGapStyleDesktop}px);
		}
	`;

    const filterStylesTab = `
        .eb-parent-${blockId} .eb-img-gallery-filter-wrapper {
			${filterWrapBDShadowTab}
		}
        .eb-parent-${blockId} .eb-img-gallery-filter-wrapper:hover {
			${filterWrapBDShadowHoverTab}
		}
		.eb-parent-${blockId} .eb-img-gallery-filter-item {
			${filterMarginTab}
			${filterPaddingTab}
			${filterTypographyTab}
			${filterBDShadowTab}
		}
		.eb-parent-${blockId} .eb-img-gallery-filter-item:hover {
			${filterBDShadowHoverTab}
		}
        .eb-gallery-img-wrapper.${blockId}.eb-filterable-img-gallery .eb-gallery-img-content {
			margin: calc(${TABimageGapRange ? TABimageGapRange : imageGapRange}px / 2);
            width: calc(95% / ${gridColumnsTab} - ${imageMasonryGapStyleTab ? imageMasonryGapStyleTab : imageMasonryGapStyleDesktop}px);
		}
	`;

    const filterStylesMobile = `
        .eb-parent-${blockId} .eb-img-gallery-filter-wrapper {
			${filterWrapBDShadowMobile}
		}
        .eb-parent-${blockId} .eb-img-gallery-filter-wrapper:hover {
			${filterWrapBDShadowHoverMobile}
		}
		.eb-parent-${blockId} .eb-img-gallery-filter-item {
			${filterMarginMobile}
			${filterPaddingMobile}
			${filterTypographyMobile}
			${filterBDShadowMobile}
		}
		.eb-parent-${blockId} .eb-img-gallery-filter-item:hover {
			${filterBDShadowHoverMobile}
		}
        .eb-gallery-img-wrapper.${blockId}.eb-filterable-img-gallery .eb-gallery-img-content {
			margin: calc(${MOBimageGapRange ? MOBimageGapRange : imageGapRange}px / 2);
            width: calc(99.99% / ${gridColumnsMobile ? gridColumnsMobile : gridColumnsDesktop} - ${imageMasonryGapStyleMobile ? imageMasonryGapStyleMobile : imageMasonryGapStyleDesktop}px);
		}
	`;

    const loadmoreStylesDesktop = `
		.eb-parent-${blockId} .eb-img-gallery-loadmore {
			background-color: ${loadmoreBGColor};
		}
		.eb-parent-${blockId} .eb-img-gallery-loadmore:hover {
			background-color: ${loadmoreHvBGColor};
		}
	`;

    const notFoundStyleDesktop = `
        .eb-parent-${blockId} #eb-img-gallery-not-found {
			${notFoundTypographyDesktop}
			color: ${notFoundColor};
		}
    `;
    const notFoundStyleTab = `
        .eb-parent-${blockId} #eb-img-gallery-not-found {
			${notFoundTypographyTab}
		}
    `;
    const notFoundStyleMobile = `
        .eb-parent-${blockId} #eb-img-gallery-not-found {
			${notFoundTypographyMobile}
		}
    `;

    const wrapperClass = 'eb-parent';
    const { btnDesktopStyle: btnLoadmoreDesktopStyle, btnTabStyle: btnLoadmoreTabStyle, btnMobileStyle: btnLoadmoreMobileStyle } = EBButton.Style(
        blockId,
        wrapperClass,
        LOADMORE_KEYS,
        '',
        'eb-img-gallery-loadmore',
        LOADMORE_TYPOGRAPHY,
        '',
        LOADMORE_BORDER,
        LOADMORE_PADDING
    );

    // all css styles for large screen width (desktop/laptop) in strings ⬇
    const desktopAllStyles = softMinifyCssStrings(`
		${wrapperStylesDesktop}
		${imageStylesDesktop}
		${filterStylesDesktop}
		${loadmoreStylesDesktop}
		${btnLoadmoreDesktopStyle}
		${notFoundStyleDesktop}
	`);

    // all css styles for Tab in strings ⬇
    const tabAllStyles = softMinifyCssStrings(`
		${wrapperStylesTab}
		${imageStylesTab}
		${filterStylesTab}
		${btnLoadmoreTabStyle}
		${notFoundStyleTab}
	`);

    // all css styles for Mobile in strings ⬇
    const mobileAllStyles = softMinifyCssStrings(`
		${wrapperStylesMobile}
		${imageStylesMobile}
		${filterStylesMobile}
		${btnLoadmoreMobileStyle}
		${notFoundStyleMobile}
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
                    @media (max-width: 1024px) {
                        .eb-gallery-img-wrapper.eb-filterable-img-gallery.masonry {
                            // display: block;
                        }
                        .eb-gallery-img-wrapper.eb-filterable-img-gallery.masonry .eb-gallery-img-content {
                            // break-inside: avoid;
                            // display: initial;
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
