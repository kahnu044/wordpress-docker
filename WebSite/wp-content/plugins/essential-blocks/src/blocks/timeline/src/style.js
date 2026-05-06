/**
 * WordPress dependencies
 */
import {
    WRAPPER_MARGIN,
    WRAPPER_PADDING,
    WRAPPER_BORDER_SHADOW,
    WRAPPER_BG,
    COLUMN_PADDING,
    COLUMN_BORDER_SHADOW,
    THUMBNAIL_IMAGE_SIZE,
    THUMBNAIL_BORDER_RADIUS,
    THUMBNAIL_MARGIN,
    TITLE_MARGIN,
    CONTENT_MARGIN,
    READMORE_MARGIN,
    READMORE_PADDING,
    ICON_META_SPACE,
    META_GAP,
    TIMELINE_ICON_SIZE,
    ICON_CONTENT_GAP,
    BTN_BORDER_RADIUS,
    BTN_BORDER_SHADOW,
    ITEM_ICON_SIZE,
    BULLET_SIZE,
    BULLET_BORDER_SHADOW,
    CARD_GAP,
    LINE_CARD_GAP,
    SUBHEADING_BORDER_SHADOW,
    LABEL_GAP,
    LABEL_BORDER_SHADOW,
    LABEL_BOTTOM_SPACE,
    ITEM_ICON_PADDING,
    MEDIA_BORDER_SHADOW,
    TIMELINE_IMAGE_WIDTH,
    TIMELINE_IMAGE_HEIGHT,
    TIMELINE_IMAGE_BORDER,
    TIMELINE_IMAGE_PADDING,
    TIMELINE_IMAGE_MARGIN,
    TIMELINE_IMAGE_RADIUS,
    TIMELINE_ICON_WIDTH
} from "./constants/constants";
import {
    EBCT_TITLE_TYPOGRAPHY,
    EBCT_CONTENT_TYPOGRAPHY,
    EBCT_READMORE_TYPOGRAPHY,
    EBCT_META_TYPOGRAPHY,
    EBCT_SUBHEADING_TYPOGRAPHY,
    LABEL_TYPOGRAPHY,
    ITEM_ICON_TYPOGRAPHY
} from "./constants/typographyPrefixConstants";

import {
    softMinifyCssStrings,
    generateTypographyStyles,
    generateDimensionsControlStyles,
    generateBorderShadowStyles,
    generateResponsiveRangeStyles,
    generateBackgroundControlStyles,
    StyleComponent,
    ImageComponent,
} from "@essential-blocks/controls";

export default function Style(props) {
    const { attributes, setAttributes, name } = props;
    const {
        blockId,
        blockMeta,
        resOption,
        layout,
        enableMeta,
        columnTextAlign,
        titleColor,
        contentColor,
        readmoreColor,
        readmoreBGColor,
        readmoreHoverColor,
        readmoreBGHoverColor,
        connectorColor,
        timelineIconColor,
        timelineIconBgColor,
        dateColor,
        SubheadingColor,
        itemIconColor,
        progressLineColor,
        iconSizeRange,
        TABiconSizeRange,
        MOBiconSizeRange,
        enableLabels,
        timelineLabels,
        columnBackgroundColor,
        connectorWidth,
        timelineIconCompleteColor,
        bulletColor,
        bulletCompleteColor,
        SubheadingBGColor,
        bulletCompleteBorderColor,
        lineCardGapRange,
        TABlineCardGapRange,
        MOBlineCardGapRange,
        lineCardGapUnit,
        TABlineCardGapUnit,
        MOBlineCardGapUnit,
        itemIconBgColor,
        itemIconSizeRange,
        TABitemIconSizeRange,
        MOBitemIconSizeRange,
        metaGapRange,
        TABmetaGapRange,
        MOBmetaGapRange,
    } = attributes;

    // Typography
    const {
        typoStylesDesktop: titleTypoStylesDesktop,
        typoStylesTab: titleTypoStylesTab,
        typoStylesMobile: titleTypoStylesMobile,
    } = generateTypographyStyles({
        attributes,
        prefixConstant: EBCT_TITLE_TYPOGRAPHY,
        defaultFontSize: 18,
    });

    const {
        typoStylesDesktop: contentTypoStylesDesktop,
        typoStylesTab: contentTypoStylesTab,
        typoStylesMobile: contentTypoStylesMobile,
    } = generateTypographyStyles({
        attributes,
        prefixConstant: EBCT_CONTENT_TYPOGRAPHY,
        defaultFontSize: 14,
    });

    const {
        typoStylesDesktop: readmoreTypoStylesDesktop,
        typoStylesTab: readmoreTypoStylesTab,
        typoStylesMobile: readmoreTypoStylesMobile,
    } = generateTypographyStyles({
        attributes,
        prefixConstant: EBCT_READMORE_TYPOGRAPHY,
        defaultFontSize: 13,
    });

    const {
        typoStylesDesktop: metaTypoStylesDesktop,
        typoStylesTab: metaTypoStylesTab,
        typoStylesMobile: metaTypoStylesMobile,
    } = generateTypographyStyles({
        attributes,
        prefixConstant: EBCT_META_TYPOGRAPHY,
        defaultFontSize: 13,
    });

    const {
        typoStylesDesktop: subheadingTypoStylesDesktop,
        typoStylesTab: subheadingTypoStylesTab,
        typoStylesMobile: subheadingTypoStylesMobile,
    } = generateTypographyStyles({
        attributes,
        prefixConstant: EBCT_SUBHEADING_TYPOGRAPHY,
        defaultFontSize: 16,
    });

    const {
        typoStylesDesktop: labelTypoStylesDesktop,
        typoStylesTab: labelTypoStylesTab,
        typoStylesMobile: labelTypoStylesMobile,
    } = generateTypographyStyles({
        attributes,
        prefixConstant: LABEL_TYPOGRAPHY,
        defaultFontSize: 12,
    });

    // Responsive Range Controllers
    const {
        rangeStylesDesktop: iconContentGapDesktop,
        rangeStylesTab: iconContentGapTab,
        rangeStylesMobile: iconContentGapMobile,
    } = generateResponsiveRangeStyles({
        controlName: ICON_CONTENT_GAP,
        property: "gap",
        attributes,
    });

    const {
        rangeStylesDesktop: thumbnailSizeDesktop,
        rangeStylesTab: thumbnailSizeTab,
        rangeStylesMobile: thumbnailSizeMobile,
    } = generateResponsiveRangeStyles({
        controlName: THUMBNAIL_IMAGE_SIZE,
        property: "width",
        attributes,
    });

    const {
        rangeStylesDesktop: iconSizeDesktop,
        rangeStylesTab: iconSizeTab,
        rangeStylesMobile: iconSizeMobile,
    } = generateResponsiveRangeStyles({
        controlName: TIMELINE_ICON_SIZE,
        property: "font-size",
        attributes,
    });
    const {
        rangeStylesDesktop: iconHeightDesktop,
        rangeStylesTab: iconHeightTab,
        rangeStylesMobile: iconHeightMobile,
    } = generateResponsiveRangeStyles({
        controlName: TIMELINE_ICON_WIDTH,
        property: "height",
        attributes,
    });
    const {
        rangeStylesDesktop: iconWidthDesktop,
        rangeStylesTab: iconWidthTab,
        rangeStylesMobile: iconWidthMobile,
    } = generateResponsiveRangeStyles({
        controlName: TIMELINE_ICON_WIDTH,
        property: "width",
        attributes,
    });

    // Icon & Meta Spacing Controls
    const {
        rangeStylesDesktop: iconMetaSpaceDesktop,
        rangeStylesTab: iconMetaSpaceTab,
        rangeStylesMobile: iconMetaSpaceMobile,
    } = generateResponsiveRangeStyles({
        controlName: ICON_META_SPACE,
        property: "margin-bottom",
        attributes,
    });

    const {
        rangeStylesDesktop: metaGapRightDesktop,
        rangeStylesTab: metaGapRightTab,
        rangeStylesMobile: metaGapRightMobile,
    } = generateResponsiveRangeStyles({
        controlName: META_GAP,
        property: "padding-right",
        attributes,
    });
    const {
        rangeStylesDesktop: metaGapLeftDesktop,
        rangeStylesTab: metaGapLeftTab,
        rangeStylesMobile: metaGapLeftMobile,
    } = generateResponsiveRangeStyles({
        controlName: META_GAP,
        property: "padding-left",
        attributes,
    });

    const {
        rangeStylesDesktop: cardGapDesktop,
        rangeStylesTab: cardGapTab,
        rangeStylesMobile: cardGapMobile,
    } = generateResponsiveRangeStyles({
        controlName: CARD_GAP,
        property: "margin-bottom",
        attributes,
    });

    // Dimensions
    const {
        dimensionStylesDesktop: wrapperMarginDesktop,
        dimensionStylesTab: wrapperMarginTab,
        dimensionStylesMobile: wrapperMarginMobile,
    } = generateDimensionsControlStyles({
        controlName: WRAPPER_MARGIN,
        styleFor: "margin",
        attributes,
    });

    const {
        dimensionStylesDesktop: wrapperPaddingDesktop,
        dimensionStylesTab: wrapperPaddingTab,
        dimensionStylesMobile: wrapperPaddingMobile,
    } = generateDimensionsControlStyles({
        controlName: WRAPPER_PADDING,
        styleFor: "padding",
        attributes,
    });

    const {
        dimensionStylesDesktop: columnPaddingDesktop,
        dimensionStylesTab: columnPaddingTab,
        dimensionStylesMobile: columnPaddingMobile,
    } = generateDimensionsControlStyles({
        controlName: COLUMN_PADDING,
        styleFor: "padding",
        attributes,
    });

    const {
        dimensionStylesDesktop: titleMarginDesktop,
        dimensionStylesTab: titleMarginTab,
        dimensionStylesMobile: titleMarginMobile,
    } = generateDimensionsControlStyles({
        controlName: TITLE_MARGIN,
        styleFor: "margin",
        attributes,
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
        dimensionStylesDesktop: readmoreMarginDesktop,
        dimensionStylesTab: readmoreMarginTab,
        dimensionStylesMobile: readmoreMarginMobile,
    } = generateDimensionsControlStyles({
        controlName: READMORE_MARGIN,
        styleFor: "margin",
        attributes,
    });

    const {
        dimensionStylesDesktop: readmorePaddingDesktop,
        dimensionStylesTab: readmorePaddingTab,
        dimensionStylesMobile: readmorePaddingMobile,
    } = generateDimensionsControlStyles({
        controlName: READMORE_PADDING,
        styleFor: "padding",
        attributes,
    });

    const {
        dimensionStylesDesktop: thumbnailMarginDesktop,
        dimensionStylesTab: thumbnailMarginTab,
        dimensionStylesMobile: thumbnailMarginMobile,
    } = generateDimensionsControlStyles({
        controlName: THUMBNAIL_MARGIN,
        styleFor: "margin",
        attributes,
    });

    const {
        dimensionStylesDesktop: thumbnailBorderRadiusDesktop,
        dimensionStylesTab: thumbnailBorderRadiusTab,
        dimensionStylesMobile: thumbnailBorderRadiusMobile,
    } = generateDimensionsControlStyles({
        controlName: THUMBNAIL_BORDER_RADIUS,
        styleFor: "border-radius",
        attributes,
    });

    const {
        dimensionStylesDesktop: btnBorderRadiusDesktop,
        dimensionStylesTab: btnBorderRadiusTab,
        dimensionStylesMobile: btnBorderRadiusMobile,
    } = generateDimensionsControlStyles({
        controlName: BTN_BORDER_RADIUS,
        styleFor: "border-radius",
        attributes,
    });

    // Border Shadow
    const {
        styesDesktop: wrapperBDShadowDesktop,
        styesTab: wrapperBDShadowTab,
        styesMobile: wrapperBDShadowMobile,
        stylesHoverDesktop: wrapperBDShadowHoverDesktop,
        stylesHoverTab: wrapperBDShadowHoverTab,
        stylesHoverMobile: wrapperBDShadowHoverMobile,
        transitionStyle: wrapperBDShadowTransition,
    } = generateBorderShadowStyles({
        controlName: WRAPPER_BORDER_SHADOW,
        attributes,
    });

    const {
        styesDesktop: columnBDShadowDesktop,
        styesTab: columnBDShadowTab,
        styesMobile: columnBDShadowMobile,
    } = generateBorderShadowStyles({
        controlName: COLUMN_BORDER_SHADOW,
        attributes,
    });

    const {
        styesDesktop: btnBDShadowDesktop,
        styesTab: btnBDShadowTab,
        styesMobile: btnBDShadowMobile,
    } = generateBorderShadowStyles({
        controlName: BTN_BORDER_SHADOW,
        attributes,
    });

    const {
        styesDesktop: bulletBDShadowDesktop,
        styesTab: bulletBDShadowTab,
        styesMobile: bulletBDShadowMobile,
    } = generateBorderShadowStyles({
        controlName: BULLET_BORDER_SHADOW,
        attributes,
    });

    // Background
    const {
        backgroundStylesDesktop: wrapperBackgroundStylesDesktop,
        hoverBackgroundStylesDesktop: wrapperHoverBackgroundStylesDesktop,
        backgroundStylesTab: wrapperBackgroundStylesTab,
        hoverBackgroundStylesTab: wrapperHoverBackgroundStylesTab,
        backgroundStylesMobile: wrapperBackgroundStylesMobile,
        hoverBackgroundStylesMobile: wrapperHoverBackgroundStylesMobile,
        overlayStylesDesktop: wrapperOverlayStylesDesktop,
        hoverOverlayStylesDesktop: wrapperHoverOverlayStylesDesktop,
        overlayStylesTab: wrapperOverlayStylesTab,
        hoverOverlayStylesTab: wrapperHoverOverlayStylesTab,
        overlayStylesMobile: wrapperOverlayStylesMobile,
        hoverOverlayStylesMobile: wrapperHoverOverlayStylesMobile,
        bgTransitionStyle: wrapperBgTransitionStyle,
        ovlTransitionStyle: wrapperOvlTransitionStyle,
    } = generateBackgroundControlStyles({
        attributes,
        controlName: WRAPPER_BG,
    });

    const {
        rangeStylesDesktop: itemIconSizeDesktop,
        rangeStylesTab: itemIconSizeTab,
        rangeStylesMobile: itemIconSizeMobile,
    } = generateResponsiveRangeStyles({
        controlName: ITEM_ICON_SIZE,
        property: "font-size",
        attributes,
    });

    const {
        rangeStylesDesktop: bulletSizeDesktop,
        rangeStylesTab: bulletSizeTab,
        rangeStylesMobile: bulletSizeMobile,
    } = generateResponsiveRangeStyles({
        controlName: BULLET_SIZE,
        property: "width",
        attributes,
    });

    const {
        rangeStylesDesktop: lineCardGapDesktop,
        rangeStylesTab: lineCardGapTab,
        rangeStylesMobile: lineCardGapMobile,
    } = generateResponsiveRangeStyles({
        controlName: LINE_CARD_GAP,
        property: "margin-left",
        attributes,
    });

    const {
        styesDesktop: subheadingBDShadowDesktop,
        styesTab: subheadingBDShadowTab,
        styesMobile: subheadingBDShadowMobile,
    } = generateBorderShadowStyles({
        controlName: SUBHEADING_BORDER_SHADOW,
        attributes,
    });

    const {
        rangeStylesDesktop: labelGapDesktop,
        rangeStylesTab: labelGapTab,
        rangeStylesMobile: labelGapMobile,
    } = generateResponsiveRangeStyles({
        controlName: LABEL_GAP,
        property: "gap",
        attributes,
    });

    const {
        styesDesktop: labelBDShadowDesktop,
        styesTab: labelBDShadowTab,
        styesMobile: labelBDShadowMobile,
    } = generateBorderShadowStyles({
        controlName: LABEL_BORDER_SHADOW,
        attributes,
    });
    const {
        rangeStylesDesktop: labelBottomSpaceDesktop,
        rangeStylesTab: labelBottomSpaceTab,
        rangeStylesMobile: labelBottomSpaceMobile,
    } = generateResponsiveRangeStyles({
        controlName: LABEL_BOTTOM_SPACE,
        property: "margin-bottom",
        attributes,
    });

    const {
        typoStylesDesktop: itemIconTypoStylesDesktop,
        typoStylesTab: itemIconTypoStylesTab,
        typoStylesMobile: itemIconTypoStylesMobile,
    } = generateTypographyStyles({
        attributes,
        prefixConstant: ITEM_ICON_TYPOGRAPHY,
    });

    const {
        styesDesktop: mediaBDShadowDesktop,
        styesTab: mediaBDShadowTab,
        styesMobile: mediaBDShadowMobile,
    } = generateBorderShadowStyles({
        controlName: MEDIA_BORDER_SHADOW,
        attributes,
    });

    const {
        dimensionStylesDesktop: itemIconPaddingDesktop,
        dimensionStylesTab: itemIconPaddingTab,
        dimensionStylesMobile: itemIconPaddingMobile,
    } = generateDimensionsControlStyles({
        controlName: ITEM_ICON_PADDING,
        styleFor: "padding",
        attributes,
    });


    // Generate label styles
    const generateLabelStyles = () => {
        if (!enableLabels || !timelineLabels || timelineLabels.length === 0) {
            return "";
        }

        return timelineLabels
            .map(
                (label) => `
			.eb-timeline-wrapper.${blockId} .eb-timeline-label[data-label-id="${label.id}"]:hover {
				color: ${label.hoverColor} !important;
				background-color: ${label.hoverBackgroundColor} !important;
			}
		`,
            )
            .join("");
    };

    // ImageComponent styles for timeline images
    const {
        imgDesktopStyle: timelineImageDesktopStyle,
        imgTabStyle: timelineImageTabStyle,
        imgMobileStyle: timelineImageMobileStyle,
    } = ImageComponent.Style({
        blockId: blockId,
        wrapperClass: "eb-timeline-wrapper",
        attrPrefix: "timelineImage",
        hasFilter: false,
        width: TIMELINE_IMAGE_WIDTH,
        height: TIMELINE_IMAGE_HEIGHT,
        border: TIMELINE_IMAGE_BORDER,
        padding: TIMELINE_IMAGE_PADDING,
        margin: TIMELINE_IMAGE_MARGIN,
        radius: TIMELINE_IMAGE_RADIUS,
    });


    // Desktop Styles
    const desktopStyles = `
		.eb-timeline-wrapper.${blockId} {
			${wrapperMarginDesktop}
			${wrapperPaddingDesktop}
			${wrapperBDShadowDesktop}
			${wrapperBackgroundStylesDesktop}
			transition:${wrapperBgTransitionStyle}, ${wrapperBDShadowTransition};
		}
		.eb-timeline-wrapper.${blockId}:hover {
			${wrapperBDShadowHoverDesktop}
			${wrapperHoverBackgroundStylesDesktop}
		}
		.eb-timeline-wrapper.${blockId}:before{
			${wrapperOverlayStylesDesktop}
			transition:${wrapperOvlTransitionStyle};
		}

		.eb-timeline-wrapper.${blockId}:hover:before{
			${wrapperHoverOverlayStylesDesktop}
		}

        .eb-timeline-wrapper.${blockId} .eb-timeline-item {
			${cardGapDesktop}
		}

        .eb-timeline-wrapper.${blockId}.left-layout .eb-timeline-item .eb-timeline-item-content {
            ${lineCardGapDesktop}
            flex: 0 0 calc(${enableMeta ? "75%" : "100%"} - ${lineCardGapRange}${lineCardGapUnit});
        }

        .eb-timeline-wrapper.${blockId}.right-layout .eb-timeline-item .eb-timeline-item-content {
            margin-right: ${lineCardGapRange}${lineCardGapUnit};
            flex: 0 0 calc(${enableMeta ? "75%" : "100%"} - ${lineCardGapRange}${lineCardGapUnit});
        }

        .eb-timeline-wrapper.${blockId}.alternating-layout .eb-timeline-item:nth-child(odd) .eb-timeline-item-content {
            margin-left: ${lineCardGapRange}${lineCardGapUnit};
            flex: 0 0 calc(50% - ${lineCardGapRange}${lineCardGapUnit});
        }
        .eb-timeline-wrapper.${blockId}.alternating-layout .eb-timeline-item:nth-child(even) .eb-timeline-item-content {
            margin-right: ${lineCardGapRange}${lineCardGapUnit};
            flex: 0 0 calc(50% - ${lineCardGapRange}${lineCardGapUnit});
        }

		.eb-timeline-wrapper.${blockId} .eb-timeline-item-content .eb-timeline-content{
            background-color: ${columnBackgroundColor};
			${columnPaddingDesktop}
			${columnBDShadowDesktop}
            text-align: ${columnTextAlign};
		}

		.eb-timeline-wrapper.${blockId} .eb-timeline-title {
			${titleTypoStylesDesktop}
			${titleMarginDesktop}
			color: ${titleColor};
		}

		.eb-timeline-wrapper.${blockId} .eb-timeline-excerpt {
			${contentTypoStylesDesktop}
			${contentMarginDesktop}
			color: ${contentColor};
		}
		.eb-timeline-wrapper.${blockId} .eb-timeline-read-more {
			${readmoreTypoStylesDesktop}
			${readmoreMarginDesktop}
			${readmorePaddingDesktop}
			${btnBorderRadiusDesktop}
			${btnBDShadowDesktop}
			color: ${readmoreColor};
			background-color: ${readmoreBGColor};
		}
		.eb-timeline-wrapper.${blockId} .eb-timeline-read-more:hover {
			color: ${readmoreHoverColor};
			background-color: ${readmoreBGHoverColor};
		}

        .eb-timeline-wrapper.${blockId} .eb-timeline-icon {
            background-color: ${itemIconBgColor};
            ${thumbnailMarginDesktop}
            ${itemIconPaddingDesktop}
            ${mediaBDShadowDesktop}
        }

        .eb-timeline-wrapper.${blockId} .eb-timeline-icon i,
        .eb-timeline-wrapper.${blockId} .eb-timeline-icon span{
			${itemIconSizeDesktop}
            color: ${itemIconColor};
		}

        .eb-timeline-wrapper.${blockId} .eb-timeline-icon svg {
            width: ${itemIconSizeRange}px;
            height: ${itemIconSizeRange}px;
        }

		.eb-timeline-wrapper.${blockId} .eb-timeline-image {
			${thumbnailSizeDesktop}
			${thumbnailMarginDesktop}
			${mediaBDShadowDesktop}
		}

		${timelineImageDesktopStyle}
		.eb-timeline-wrapper.${blockId}::before {
			background-color: ${connectorColor};
			width: ${connectorWidth}px;
		}

        .eb-timeline-wrapper.${blockId}.eb-timeline-line-style-three::before {
            border-color: ${connectorColor};
            border-width: ${connectorWidth}px;
        }

        .eb-timeline-wrapper.${blockId} .eb-timeline-progress-fill {
            background-color: ${progressLineColor};
        }

        .eb-timeline-wrapper.${blockId}.eb-timeline-line-style-one .eb-timeline-svg-zigzag path:not(.eb-timeline-animated-path) {
            stroke: ${connectorColor};
        }

        .eb-timeline-wrapper.${blockId}.eb-timeline-line-style-two .eb-timeline-progress-line .eb-timeline-progress-fill::after{
            background: ${progressLineColor};
        }

        .eb-timeline-wrapper.${blockId}.eb-timeline-line-style-four::before {
            border-color: ${connectorColor};
            width: 0;
            border-left-width: ${connectorWidth}px;
        }
        .eb-timeline-wrapper.${blockId}.eb-timeline-line-style-four .eb-timeline-progress-line {
            width: ${connectorWidth}px;
        }
        .eb-timeline-wrapper.${blockId}.eb-timeline-line-style-four .eb-timeline-progress-line .eb-timeline-progress-fill {
            border-color: ${progressLineColor};
            border-left-width: ${connectorWidth}px;
        }

        .eb-timeline-wrapper.${blockId}.eb-timeline-line-style-four .eb-timeline-dot .eb-timeline-dot-inner span.eb-timeline-dot-icon {
            ${iconWidthDesktop}
            ${iconHeightDesktop}
            ${itemIconTypoStylesDesktop}
        }
        .eb-timeline-wrapper.${blockId}.eb-timeline-line-style-four .eb-timeline-dot .eb-timeline-dot-inner .eb-timeline-dot-icon {
            ${iconWidthDesktop}
            ${iconHeightDesktop}
            ${iconSizeDesktop}
        }

		.eb-timeline-wrapper.${blockId} .eb-timeline-labels {
			${labelGapDesktop}
            ${labelBottomSpaceDesktop}
		}

		.eb-timeline-wrapper.${blockId} .eb-timeline-label {
			${labelTypoStylesDesktop}
			${labelBDShadowDesktop}
		}

	`;

    // Tab Styles
    const tabStyles = `
		.eb-timeline-wrapper.${blockId} {
			${wrapperMarginTab}
			${wrapperPaddingTab}
			${wrapperBDShadowTab}
			${wrapperBackgroundStylesTab}
		}
		.eb-timeline-wrapper.${blockId}:hover {
			${wrapperBDShadowHoverTab}
			${wrapperHoverBackgroundStylesTab}
		}
		.eb-timeline-wrapper.${blockId}:before{
			${wrapperOverlayStylesTab}
		}
		.eb-timeline-wrapper.${blockId}:hover:before{
			${wrapperHoverOverlayStylesTab}
		}
        .eb-timeline-wrapper.${blockId} .eb-timeline-item {
			${cardGapTab}
		}

        .eb-timeline-wrapper.${blockId}.eb-timeline-line-style-four .eb-timeline-dot .eb-timeline-dot-inner span.eb-timeline-dot-icon {
            ${iconWidthTab}
            ${iconHeightTab}
            ${itemIconTypoStylesTab}
        }
        .eb-timeline-wrapper.${blockId}.eb-timeline-line-style-four .eb-timeline-dot .eb-timeline-dot-inner .eb-timeline-dot-icon {
            ${iconWidthTab}
            ${iconHeightTab}
            ${iconSizeTab}
        }

        .eb-timeline-wrapper.${blockId}.left-layout .eb-timeline-item .eb-timeline-item-content {
            ${lineCardGapTab}
            flex: 0 0 calc(${enableMeta ? "75%" : "100%"} - ${TABlineCardGapRange}${TABlineCardGapUnit});
        }

        .eb-timeline-wrapper.${blockId}.right-layout .eb-timeline-item .eb-timeline-item-content {
            margin-right: ${TABlineCardGapRange}${TABlineCardGapUnit};
            flex: 0 0 calc(${enableMeta ? "75%" : "100%"} - ${TABlineCardGapRange}${TABlineCardGapUnit});
        }

        .eb-timeline-wrapper.${blockId}.alternating-layout .eb-timeline-item:nth-child(odd) .eb-timeline-item-content {
            margin-left: ${TABlineCardGapRange}${TABlineCardGapUnit};
            flex: 0 0 calc(50% - ${TABlineCardGapRange}${TABlineCardGapUnit});
        }
        .eb-timeline-wrapper.${blockId}.alternating-layout .eb-timeline-item:nth-child(even) .eb-timeline-item-content {
            margin-right: ${TABlineCardGapRange}${TABlineCardGapUnit};
            flex: 0 0 calc(50% - ${TABlineCardGapRange}${TABlineCardGapUnit});
        }

		.eb-timeline-wrapper.${blockId} .eb-timeline-item-content .eb-timeline-content{
			${columnPaddingTab}
			${columnBDShadowTab}
		}

		.eb-timeline-wrapper.${blockId} .eb-timeline-title {
			${titleTypoStylesTab}
			${titleMarginTab}
		}
		.eb-timeline-wrapper.${blockId} .eb-timeline-excerpt {
			${contentTypoStylesTab}
			${contentMarginTab}
		}
		.eb-timeline-wrapper.${blockId} .eb-timeline-read-more {
			${readmoreTypoStylesTab}
			${readmoreMarginTab}
			${readmorePaddingTab}
			${btnBorderRadiusTab}
			${btnBDShadowTab}
		}

        .eb-timeline-wrapper.${blockId} .eb-timeline-icon {
            ${itemIconPaddingTab}
            ${mediaBDShadowTab}
            ${thumbnailMarginTab}
        }
        .eb-timeline-wrapper.${blockId} .eb-timeline-icon i,
        .eb-timeline-wrapper.${blockId} .eb-timeline-icon span{
			${itemIconSizeTab}
		}

        .eb-timeline-wrapper.${blockId} .eb-timeline-icon svg {
            width: ${TABitemIconSizeRange}px;
            height: ${TABitemIconSizeRange}px;
        }

		.eb-timeline-wrapper.${blockId} .eb-timeline-image {
			${thumbnailSizeTab}
			${thumbnailMarginTab}
			${mediaBDShadowTab}
		}

		${timelineImageTabStyle}

		.eb-timeline-wrapper.${blockId} .eb-timeline-labels {
			${labelGapTab}
            ${labelBottomSpaceTab}
		}

		.eb-timeline-wrapper.${blockId} .eb-timeline-label {
			${labelTypoStylesTab}
			${labelBDShadowTab}
		}

	`;

    // Mobile Styles
    const mobileStyles = `
		.eb-timeline-wrapper.${blockId} {
			${wrapperMarginMobile}
			${wrapperPaddingMobile}
			${wrapperBDShadowMobile}
			${wrapperBackgroundStylesMobile}
		}
		.eb-timeline-wrapper.${blockId}:hover {
			${wrapperBDShadowHoverMobile}
			${wrapperHoverBackgroundStylesMobile}
		}
		.eb-timeline-wrapper.${blockId}:before{
			${wrapperOverlayStylesMobile}
		}
		.eb-timeline-wrapper.${blockId}:hover:before{
			${wrapperHoverOverlayStylesMobile}
		}
        .eb-timeline-wrapper.${blockId} .eb-timeline-item {
			${cardGapMobile}
		}

        .eb-timeline-wrapper.${blockId}.eb-timeline-line-style-four .eb-timeline-dot .eb-timeline-dot-inner span.eb-timeline-dot-icon {
            ${iconWidthMobile}
            ${iconHeightMobile}
            ${itemIconTypoStylesMobile}
        }

        .eb-timeline-wrapper.${blockId}.eb-timeline-line-style-four .eb-timeline-dot .eb-timeline-dot-inner .eb-timeline-dot-icon {
            ${iconWidthMobile}
            ${iconHeightMobile}
            ${iconSizeMobile}
        }

        .eb-timeline-wrapper.${blockId}.left-layout .eb-timeline-item .eb-timeline-item-content {
            ${lineCardGapMobile}
            width: calc(100% - ${MOBlineCardGapRange}${MOBlineCardGapUnit});
        }

        .eb-timeline-wrapper.${blockId}.right-layout .eb-timeline-item .eb-timeline-item-content {
            margin-right: ${MOBlineCardGapRange}${MOBlineCardGapUnit};
            width: calc(100% - ${MOBlineCardGapRange}${MOBlineCardGapUnit});
        }

        .eb-timeline-wrapper.${blockId}.alternating-layout .eb-timeline-item:nth-child(odd) .eb-timeline-item-content,
        .eb-timeline-wrapper.${blockId}.alternating-layout .eb-timeline-item:nth-child(even) .eb-timeline-item-content {
            margin-left: ${MOBlineCardGapRange}${MOBlineCardGapUnit};
            margin-right: 0;
        }

        .eb-timeline-wrapper.${blockId} .eb-timeline-item >.eb-timeline-date-section {
            display: none;
        }

        .eb-timeline-wrapper.${blockId} .eb-timeline-item-content .eb-timeline-date-section {
            display: flex;
            min-height: auto;
            margin-bottom: 20px;
        }
		.eb-timeline-wrapper.${blockId} .eb-timeline-item-content .eb-timeline-content{
			${columnPaddingMobile}
			${columnBDShadowMobile}
		}
		.eb-timeline-wrapper.${blockId} .eb-timeline-title {
			${titleTypoStylesMobile}
			${titleMarginMobile}
		}
		.eb-timeline-wrapper.${blockId} .eb-timeline-excerpt {
			${contentTypoStylesMobile}
			${contentMarginMobile}
		}
		.eb-timeline-wrapper.${blockId} .eb-timeline-read-more {
			${readmoreTypoStylesMobile}
			${readmoreMarginMobile}
			${readmorePaddingMobile}
			${btnBorderRadiusMobile}
			${btnBDShadowMobile}
		}
        .eb-timeline-wrapper.${blockId} .eb-timeline-icon {
            ${itemIconPaddingMobile}
            ${mediaBDShadowMobile}
            ${thumbnailMarginMobile}
        }
        .eb-timeline-wrapper.${blockId} .eb-timeline-icon i,
        .eb-timeline-wrapper.${blockId} .eb-timeline-icon span{
			${itemIconSizeMobile}
		}

        .eb-timeline-wrapper.${blockId} .eb-timeline-icon svg {
            width: ${MOBitemIconSizeRange}px;
            height: ${MOBitemIconSizeRange}px;
        }

		.eb-timeline-wrapper.${blockId} .eb-timeline-image {
			${thumbnailSizeMobile}
			${thumbnailMarginMobile}
			${mediaBDShadowMobile}
		}

		${timelineImageMobileStyle}

		.eb-timeline-wrapper.${blockId} .eb-timeline-labels {
			${labelGapMobile}
            ${labelBottomSpaceMobile}
		}

		.eb-timeline-wrapper.${blockId} .eb-timeline-label {
			${labelTypoStylesMobile}
			${labelBDShadowMobile}
		}

	`;

    const iconDesktopStyles = `
        .eb-timeline-wrapper.${blockId} .eb-timeline-dot {
			${bulletSizeDesktop}
			height: ${attributes.bulletSizeRange || 40}px;
			background-color: ${bulletColor};
			${bulletBDShadowDesktop}
		}
		.eb-timeline-wrapper.${blockId} .eb-timeline-dot.completed {
			background-color: ${bulletCompleteColor};
            border-color: ${bulletCompleteBorderColor};
		}

        .eb-timeline-wrapper.${blockId} .eb-timeline-dot .eb-timeline-dot-inner .eb-timeline-dot-icon {
			${iconSizeDesktop}
			color: ${timelineIconColor};
			background-color: ${timelineIconBgColor};
            ${bulletBDShadowDesktop}
		}
		.eb-timeline-wrapper.${blockId} .eb-timeline-dot.completed .eb-timeline-dot-inner .eb-timeline-dot-icon {
			color: ${timelineIconCompleteColor};
		}

        .eb-timeline-wrapper.${blockId} .eb-timeline-dot .eb-timeline-dot-inner .eb-timeline-dot-icon svg,
        .eb-timeline-wrapper.${blockId} .eb-timeline-dot .eb-timeline-dot-inner svg.eb-timeline-dot-icon {
            width: ${iconSizeRange}px;
        }

    `;

    const iconTabStyles = `
        .eb-timeline-wrapper.${blockId} .eb-timeline-dot .eb-timeline-dot-inner .eb-timeline-dot-icon {
			${iconSizeTab}
            ${bulletBDShadowTab}
		}
		.eb-timeline-wrapper.${blockId} .eb-timeline-dot {
			${bulletSizeTab}
			height: ${attributes.TABbulletSizeRange || attributes.bulletSizeRange || 40}px;
			${bulletBDShadowTab}
		}

        .eb-timeline-wrapper.${blockId} .eb-timeline-dot .eb-timeline-dot-inner .eb-timeline-dot-icon svg,
        .eb-timeline-wrapper.${blockId} .eb-timeline-dot .eb-timeline-dot-inner svg.eb-timeline-dot-icon {
            width: ${TABiconSizeRange}px;
        }

    `;

    const iconMobileStyles = `
        .eb-timeline-wrapper.${blockId} .eb-timeline-dot .eb-timeline-dot-inner .eb-timeline-dot-icon {
			${iconSizeMobile}
            ${bulletBDShadowMobile}
		}
		.eb-timeline-wrapper.${blockId} .eb-timeline-dot {
			${bulletSizeMobile}
			height: ${attributes.MOBbulletSizeRange || attributes.bulletSizeRange || 40}px;
			${bulletBDShadowMobile}
		}

        .eb-timeline-wrapper.${blockId} .eb-timeline-dot .eb-timeline-dot-inner .eb-timeline-dot-icon svg,
        .eb-timeline-wrapper.${blockId} .eb-timeline-dot .eb-timeline-dot-inner svg.eb-timeline-dot-icon {
            width: ${MOBiconSizeRange}px;
        }
    `;

    const metaDesktopStyles = `
        .eb-timeline-wrapper.${blockId}.left-layout .eb-timeline-item .eb-timeline-date-section {
            ${metaGapRightDesktop}
            flex: 0 0 calc(25% - ${metaGapRange}px);
        }
        .eb-timeline-wrapper.${blockId}.right-layout .eb-timeline-item .eb-timeline-date-section {
            ${metaGapLeftDesktop}
            flex: 0 0 calc(25% - ${metaGapRange}px);
        }
        .eb-timeline-wrapper.${blockId}.alternating-layout .eb-timeline-item:nth-child(odd) .eb-timeline-date-section {
            ${metaGapRightDesktop}
            flex: 0 0 calc(50% - ${metaGapRange}px);
        }
        .eb-timeline-wrapper.${blockId}.alternating-layout .eb-timeline-item:nth-child(even) .eb-timeline-date-section {
            ${metaGapLeftDesktop}
            flex: 0 0 calc(50% - ${metaGapRange}px);
        }
		.eb-timeline-wrapper.${blockId} .eb-timeline-item .eb-timeline-date-section .eb-timeline-date {
			${metaTypoStylesDesktop}
			${iconMetaSpaceDesktop}
			color: ${dateColor};
		}
		.eb-timeline-wrapper.${blockId} .eb-timeline-item .eb-timeline-date-section .eb-timeline-subheading {
			${subheadingTypoStylesDesktop}
			color: ${SubheadingColor};
			background-color: ${SubheadingBGColor};
			${subheadingBDShadowDesktop}
		}
    `;

    const metaTabStyles = `
        .eb-timeline-wrapper.${blockId}.left-layout .eb-timeline-item .eb-timeline-date-section {
            ${metaGapRightTab}
            flex: 0 0 calc(25% - ${TABmetaGapRange}px);
        }
        .eb-timeline-wrapper.${blockId}.right-layout .eb-timeline-item .eb-timeline-date-section {
            ${metaGapLeftTab}
            flex: 0 0 calc(25% - ${TABmetaGapRange}px);
        }
        .eb-timeline-wrapper.${blockId}.alternating-layout .eb-timeline-item:nth-child(odd) .eb-timeline-date-section {
            ${metaGapRightTab}
            flex: 0 0 calc(50% - ${TABmetaGapRange}px);
        }
        .eb-timeline-wrapper.${blockId}.alternating-layout .eb-timeline-item:nth-child(even) .eb-timeline-date-section {
            ${metaGapLeftTab}
            flex: 0 0 calc(50% - ${TABmetaGapRange}px);
        }
        .eb-timeline-wrapper.${blockId} .eb-timeline-item .eb-timeline-date-section .eb-timeline-date {
			${metaTypoStylesTab}
			${iconMetaSpaceTab}
		}
		.eb-timeline-wrapper.${blockId} .eb-timeline-item .eb-timeline-date-section .eb-timeline-subheading {
			${subheadingTypoStylesTab}
            ${subheadingBDShadowTab}
		}
    `;
    const metaMobileStyles = `
        .eb-timeline-wrapper.${blockId} .eb-timeline-item .eb-timeline-date-section .eb-timeline-date {
			${metaTypoStylesMobile}
			${iconMetaSpaceMobile}
		}
		.eb-timeline-wrapper.${blockId} .eb-timeline-item .eb-timeline-date-section .eb-timeline-subheading {
			${subheadingTypoStylesMobile}
            ${subheadingBDShadowMobile}
		}
    `;

    // all css styles for large screen width (desktop/laptop) in strings ⬇
    const desktopAllStyles = softMinifyCssStrings(`
			${desktopStyles}
            ${iconDesktopStyles}
			${metaDesktopStyles}
	`);

    // all css styles for Tab in strings ⬇
    const tabAllStyles = softMinifyCssStrings(`
			${tabStyles}
            ${iconTabStyles}
			${metaTabStyles}
	`);

    // all css styles for Mobile in strings ⬇
    const mobileAllStyles = softMinifyCssStrings(`
			${mobileStyles}
            ${iconMobileStyles}
			${metaMobileStyles}
	`);

    return (
        <StyleComponent
            attributes={attributes}
            setAttributes={setAttributes}
            desktopAllStyles={desktopAllStyles}
            tabAllStyles={tabAllStyles}
            mobileAllStyles={mobileAllStyles}
            blockName={name}
        />
    );
}
