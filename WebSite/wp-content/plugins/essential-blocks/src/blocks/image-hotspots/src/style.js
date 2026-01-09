/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { applyFilters } from "@wordpress/hooks";

/**
 * Internal dependencies
 */
import {
    WRAPPER_MARGIN,
    WRAPPER_PADDING,
    HOTSPOT_PADDING,
    TOOLTIP_PADDING,
    WRAPPER_BG,
    WRAPPER_BORDER_SHADOW,
    TOOLTIP_BORDER_SHADOW,
    TOOLTIP_TITLE_TYPOGRAPHY,
    TOOLTIP_CONTENT_TYPOGRAPHY,
    HOTSPOT_TEXT_TYPOGRAPHY,
    HOTSPOT_SIZE_RANGE,
    TOOLTIP_WIDTH_RANGE,
    HOTSPOT_ICON_SIZE,
    HOTSPOT_NUMBER_SIZE,
    HOTSPOT_DOT_WIDTH,
    HOTSPOT_DOT_HEIGHT,
    TOOLTIP_OFFSET,
    HOTSPOT_BORDER_SHADOW,
    TOOLTIP_ARROW_SIZE,
    IMAGE_WIDTH,
    HOTSPOT_ICON_WIDTH,
} from "./constants";

import {
    softMinifyCssStrings,
    generateTypographyStyles,
    generateDimensionsControlStyles,
    generateBorderShadowStyles,
    generateResponsiveRangeStyles,
    generateBackgroundControlStyles,
    StyleComponent,
    ImageComponent
} from "@essential-blocks/controls";

export default function Style(props) {
    const {
        attributes,
        setAttributes,
        name
    } = props;

    const {
        blockId,
        globalMarkerColor,
        globalMarkerBgColor,
        globalTooltipBgColor,
        globalTooltipTitleColor,
        globalTooltipContentColor,
        globalTooltipAlignment,
        globalTooltipContentGap,
        globalTooltipIconSize,
        globalTooltipIconColor,
    } = attributes;

    // Wrapper styles
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

    // Hotspot styles
    const {
        rangeStylesDesktop: hotspotSizeDesktop,
        rangeStylesTab: hotspotSizeTab,
        rangeStylesMobile: hotspotSizeMobile,
    } = generateResponsiveRangeStyles({
        controlName: HOTSPOT_SIZE_RANGE,
        property: "width",
        attributes,
    });

    // Tooltip styles
    const {
        rangeStylesDesktop: tooltipWidthDesktop,
        rangeStylesTab: tooltipWidthTab,
        rangeStylesMobile: tooltipWidthMobile,
    } = generateResponsiveRangeStyles({
        controlName: TOOLTIP_WIDTH_RANGE,
        property: "max-width",
        attributes,
    });



    const {
        dimensionStylesDesktop: tooltipPaddingDesktop,
        dimensionStylesTab: tooltipPaddingTab,
        dimensionStylesMobile: tooltipPaddingMobile,
    } = generateDimensionsControlStyles({
        controlName: TOOLTIP_PADDING,
        styleFor: "padding",
        attributes,
    });

    // Background styles
    const {
        backgroundStylesDesktop: wrapperBackgroundDesktop,
        backgroundStylesTab: wrapperBackgroundTab,
        backgroundStylesMobile: wrapperBackgroundMobile,
    } = generateBackgroundControlStyles({
        attributes,
        controlName: WRAPPER_BG,
    });

    // Border shadow styles
    const {
        styesDesktop: wrapperBorderShadowDesktop,
        styesTab: wrapperBorderShadowTab,
        styesMobile: wrapperBorderShadowMobile,
    } = generateBorderShadowStyles({
        controlName: WRAPPER_BORDER_SHADOW,
        attributes,
    });

    // Typography styles
    const {
        typoStylesDesktop: tooltipTitleTypoDesktop,
        typoStylesTab: tooltipTitleTypoTab,
        typoStylesMobile: tooltipTitleTypoMobile,
    } = generateTypographyStyles({
        attributes,
        prefixConstant: TOOLTIP_TITLE_TYPOGRAPHY,
    });

    const {
        typoStylesDesktop: tooltipContentTypoDesktop,
        typoStylesTab: tooltipContentTypoTab,
        typoStylesMobile: tooltipContentTypoMobile,
    } = generateTypographyStyles({
        attributes,
        prefixConstant: TOOLTIP_CONTENT_TYPOGRAPHY,
    });

    const {
        typoStylesDesktop: hotspotTextTypoDesktop,
        typoStylesTab: hotspotTextTypoTab,
        typoStylesMobile: hotspotTextTypoMobile,
    } = generateTypographyStyles({
        attributes,
        prefixConstant: HOTSPOT_TEXT_TYPOGRAPHY,
    });



    const {
        dimensionStylesDesktop: hotspotPaddingDesktop,
        dimensionStylesTab: hotspotPaddingTab,
        dimensionStylesMobile: hotspotPaddingMobile,
    } = generateDimensionsControlStyles({
        controlName: HOTSPOT_PADDING,
        styleFor: "padding",
        attributes,
    });
    const {
        rangeStylesDesktop: hotspotIconSizeDesktop,
        rangeStylesTab: hotspotIconSizeTab,
        rangeStylesMobile: hotspotIconSizeMobile,
    } = generateResponsiveRangeStyles({
        controlName: HOTSPOT_ICON_SIZE,
        property: "font-size",
        attributes,
    });

    const {
        rangeStylesDesktop: hotspotNumberSizeDesktop,
        rangeStylesTab: hotspotNumberSizeTab,
        rangeStylesMobile: hotspotNumberSizeMobile,
    } = generateResponsiveRangeStyles({
        controlName: HOTSPOT_NUMBER_SIZE,
        property: "font-size",
        attributes,
    });

    const {
        rangeStylesDesktop: hotspotNumberWidthDesktop,
        rangeStylesTab: hotspotNumberWidthTab,
        rangeStylesMobile: hotspotNumberWidthMobile,
    } = generateResponsiveRangeStyles({
        controlName: HOTSPOT_NUMBER_SIZE,
        property: "width",
        attributes,
    });
    const {
        rangeStylesDesktop: hotspotNumberHeightDesktop,
        rangeStylesTab: hotspotNumberHeightTab,
        rangeStylesMobile: hotspotNumberHeightMobile,
    } = generateResponsiveRangeStyles({
        controlName: HOTSPOT_NUMBER_SIZE,
        property: "height",
        attributes,
    });

    const {
        rangeStylesDesktop: hotspotDotWidthDesktop,
        rangeStylesTab: hotspotDotWidthTab,
        rangeStylesMobile: hotspotDotWidthMobile,
    } = generateResponsiveRangeStyles({
        controlName: HOTSPOT_DOT_WIDTH,
        property: "width",
        attributes,
    });

    const {
        rangeStylesDesktop: hotspotDotHeightDesktop,
        rangeStylesTab: hotspotDotHeightTab,
        rangeStylesMobile: hotspotDotHeightMobile,
    } = generateResponsiveRangeStyles({
        controlName: HOTSPOT_DOT_HEIGHT,
        property: "height",
        attributes,
    });

    const {
        rangeStylesDesktop: tooltipOffsetDesktop,
        rangeStylesTab: tooltipOffsetTab,
        rangeStylesMobile: tooltipOffsetMobile,
    } = generateResponsiveRangeStyles({
        controlName: TOOLTIP_OFFSET,
        property: "--eb-tooltip-offset",
        attributes,
    });

    const {
        dimensionStylesDesktop: tooltipBorderRadiusDesktop,
        dimensionStylesTab: tooltipBorderRadiusTab,
        dimensionStylesMobile: tooltipBorderRadiusMobile,
    } = generateDimensionsControlStyles({
        controlName: TOOLTIP_BORDER_SHADOW,
        styleFor: "border-radius",
        attributes,
    });

    const {
        styesDesktop: hotspotBorderShadowDesktop,
        styesTab: hotspotBorderShadowTab,
        styesMobile: hotspotBorderShadowMobile,
        stylesHoverDesktop: hotspotBorderShadowHoverDesktop,
        stylesHoverTab: hotspotBorderShadowHoverTab,
        stylesHoverMobile: hotspotBorderShadowHoverMobile,
        transitionStyle: hotspotBorderShadowTransition,
    } = generateBorderShadowStyles({
        controlName: HOTSPOT_BORDER_SHADOW,
        attributes,
    });

    const {
        rangeStylesDesktop: tooltipArrowSizeDesktop,
        rangeStylesTab: tooltipArrowSizeTab,
        rangeStylesMobile: tooltipArrowSizeMobile,
    } = generateResponsiveRangeStyles({
        controlName: TOOLTIP_ARROW_SIZE,
        property: "border-width",
        attributes,
    });

    const {
        rangeStylesDesktop: hotspotIconWidthDesktop,
        rangeStylesTab: hotspotIconWidthTab,
        rangeStylesMobile: hotspotIconWidthMobile,
    } = generateResponsiveRangeStyles({
        controlName: HOTSPOT_ICON_WIDTH,
        property: "width",
        attributes,
    });
    const {
        rangeStylesDesktop: hotspotIconHeightDesktop,
        rangeStylesTab: hotspotIconHeightTab,
        rangeStylesMobile: hotspotIconHeightMobile,
    } = generateResponsiveRangeStyles({
        controlName: HOTSPOT_ICON_WIDTH,
        property: "height",
        attributes,
    });

    // Desktop styles
    const desktopStyles = `
        .eb-image-hotspots-wrapper.${blockId} {
            ${wrapperMarginDesktop}
            ${wrapperPaddingDesktop}
            ${wrapperBackgroundDesktop}
            ${wrapperBorderShadowDesktop}
        }
        // .eb-image-hotspots-wrapper.${blockId} .eb-hotspot-marker {
        //     ${hotspotSizeDesktop}
        //     height: ${hotspotSizeDesktop.replace('width:', '').trim()};
        // }

        .eb-image-hotspots-wrapper.${blockId} .eb-hotspot-marker .eb-hotspot-marker-inner {
            background-color: ${globalMarkerBgColor};
            color: ${globalMarkerColor};
            ${hotspotBorderShadowDesktop}
            ${hotspotPaddingDesktop}
            transition: ${hotspotBorderShadowTransition};
        }
        .eb-image-hotspots-wrapper.${blockId} .eb-hotspot-marker .eb-hotspot-marker-inner:hover {
            ${hotspotBorderShadowHoverDesktop}
        }

        .eb-image-hotspots-wrapper.${blockId} .eb-hotspot-marker.eb-hotspot-icon .eb-hotspot-marker-inner {
            ${hotspotIconWidthDesktop}
            ${hotspotIconHeightDesktop}
        }
        .eb-image-hotspots-wrapper.${blockId} .eb-hotspot-marker .eb-hotspot-marker-inner > i,
        .eb-image-hotspots-wrapper.${blockId} .eb-hotspot-marker .eb-hotspot-marker-inner > span.dashicon {
            ${hotspotIconSizeDesktop}
        }

        .eb-image-hotspots-wrapper.${blockId} .eb-hotspot-marker .eb-hotspot-marker-inner > span.eb-hotspot-text {
            ${hotspotTextTypoDesktop}
        }

        .eb-image-hotspots-wrapper.${blockId} .eb-hotspot-marker .eb-hotspot-marker-inner > span.eb-hotspot-number {
            ${hotspotNumberSizeDesktop}
            ${hotspotNumberWidthDesktop}
            ${hotspotNumberHeightDesktop}
        }

        .eb-image-hotspots-wrapper.${blockId} .eb-hotspot-marker .eb-hotspot-marker-inner .eb-hotspot-dot {
            ${hotspotDotWidthDesktop}
            ${hotspotDotHeightDesktop}
            border-radius: 50%;
        }

        .eb-image-hotspots-wrapper.${blockId} .eb-hotspot-tooltip {
            ${tooltipOffsetDesktop}
        }

        .eb-image-hotspots-wrapper.${blockId} .eb-hotspot-tooltip .eb-tooltip-inner {
            ${tooltipWidthDesktop}
            ${tooltipPaddingDesktop}
            ${tooltipBorderRadiusDesktop}
            background-color: ${globalTooltipBgColor};
            text-align: ${globalTooltipAlignment};
            gap: ${globalTooltipContentGap}px;
        }

        .eb-image-hotspots-wrapper.${blockId} .eb-hotspot-tooltip .eb-tooltip-arrow {
            --tooltip-arrow-color: ${globalTooltipBgColor};
            ${tooltipArrowSizeDesktop}
        }
        .eb-image-hotspots-wrapper.${blockId} .eb-hotspot-tooltip .eb-tooltip-media i,
        .eb-image-hotspots-wrapper.${blockId} .eb-hotspot-tooltip .eb-tooltip-media span.dashicon {
            font-size: ${globalTooltipIconSize}px;
            color: ${globalTooltipIconColor};
        }
        .eb-image-hotspots-wrapper.${blockId} .eb-hotspot-tooltip .eb-tooltip-title {
            ${tooltipTitleTypoDesktop}
            color: ${globalTooltipTitleColor};
        }
        .eb-image-hotspots-wrapper.${blockId} .eb-hotspot-tooltip .eb-tooltip-content {
            ${tooltipContentTypoDesktop}
            color: ${globalTooltipContentColor};
        }

        /* Editor tooltip visibility */
        .eb-image-hotspots-wrapper.${blockId} .eb-hotspot-marker:hover .eb-hotspot-tooltip.eb-tooltip-trigger-hover,
        .eb-image-hotspots-wrapper.${blockId} .eb-hotspot-marker.active .eb-hotspot-tooltip.eb-tooltip-trigger-click {
            opacity: 1 !important;
            visibility: visible !important;
        }

        /* Always visible tooltips */
        .eb-image-hotspots-wrapper.${blockId} .eb-hotspot-tooltip.always-visible,
        .eb-image-hotspots-wrapper.${blockId} .eb-hotspot-tooltip.always-visible .eb-tooltip-inner,
        .eb-image-hotspots-wrapper.${blockId}[data-always-visible-tooltip="true"] .eb-hotspot-tooltip {
            opacity: 1 !important;
            visibility: visible !important;
        }
    `;

    // Tablet styles
    const tabStyles = `
        .eb-image-hotspots-wrapper.${blockId} {
            ${wrapperMarginTab}
            ${wrapperPaddingTab}
            ${wrapperBackgroundTab}
            ${wrapperBorderShadowTab}
        }

        .eb-image-hotspots-wrapper.${blockId} .eb-hotspot-marker {
            ${hotspotSizeTab}
            height: ${hotspotSizeTab.replace('width:', '').trim()};
        }

        .eb-image-hotspots-wrapper.${blockId} .eb-hotspot-marker .eb-hotspot-marker-inner {
            ${hotspotBorderShadowTab}
            ${hotspotPaddingTab}
        }
        .eb-image-hotspots-wrapper.${blockId} .eb-hotspot-marker .eb-hotspot-marker-inner:hover {
            ${hotspotBorderShadowHoverTab}
        }

        .eb-image-hotspots-wrapper.${blockId} .eb-hotspot-marker.eb-hotspot-icon .eb-hotspot-marker-inner {
            ${hotspotIconWidthTab}
            ${hotspotIconHeightTab}
        }

        .eb-image-hotspots-wrapper.${blockId} .eb-hotspot-marker .eb-hotspot-marker-inner > i,
        .eb-image-hotspots-wrapper.${blockId} .eb-hotspot-marker .eb-hotspot-marker-inner > span.dashicon {
            ${hotspotIconSizeTab}
        }

        .eb-image-hotspots-wrapper.${blockId} .eb-hotspot-marker .eb-hotspot-marker-inner > span.eb-hotspot-text {
            ${hotspotTextTypoTab}
        }

        .eb-image-hotspots-wrapper.${blockId} .eb-hotspot-marker .eb-hotspot-marker-inner > span.eb-hotspot-number {
            ${hotspotNumberSizeTab}
            ${hotspotNumberWidthTab}
            ${hotspotNumberHeightTab}
        }

        .eb-image-hotspots-wrapper.${blockId} .eb-hotspot-marker .eb-hotspot-marker-inner .eb-hotspot-dot {
            ${hotspotDotWidthTab}
            ${hotspotDotHeightTab}
            border-radius: 50%;
            background-color: ${globalMarkerColor};
        }

        .eb-image-hotspots-wrapper.${blockId} .eb-hotspot-tooltip {
            ${tooltipWidthTab}
            ${tooltipPaddingTab}
            ${tooltipBorderRadiusTab}
            ${tooltipOffsetTab}
        }
        .eb-image-hotspots-wrapper.${blockId} .eb-hotspot-tooltip .eb-tooltip-arrow {
            ${tooltipArrowSizeTab}
        }
        .eb-image-hotspots-wrapper.${blockId} .eb-hotspot-tooltip .eb-tooltip-title {
            ${tooltipTitleTypoTab}
        }
        .eb-image-hotspots-wrapper.${blockId} .eb-hotspot-tooltip .eb-tooltip-content {
            ${tooltipContentTypoTab}
        }
    `;

    // Mobile styles
    const mobileStyles = `
        .eb-image-hotspots-wrapper.${blockId} {
            ${wrapperMarginMobile}
            ${wrapperPaddingMobile}
            ${wrapperBackgroundMobile}
            ${wrapperBorderShadowMobile}
        }

        .eb-image-hotspots-wrapper.${blockId} .eb-hotspot-marker {
            ${hotspotSizeMobile}
            height: ${hotspotSizeMobile.replace('width:', '').trim()};
        }

        .eb-image-hotspots-wrapper.${blockId} .eb-hotspot-marker .eb-hotspot-marker-inner {
            ${hotspotBorderShadowMobile}
            ${hotspotPaddingMobile}
        }
        .eb-image-hotspots-wrapper.${blockId} .eb-hotspot-marker .eb-hotspot-marker-inner:hover {
            ${hotspotBorderShadowHoverMobile}
        }

        .eb-image-hotspots-wrapper.${blockId} .eb-hotspot-marker.eb-hotspot-icon .eb-hotspot-marker-inner {
            ${hotspotIconWidthMobile}
            ${hotspotIconHeightMobile}
        }

        .eb-image-hotspots-wrapper.${blockId} .eb-hotspot-marker .eb-hotspot-marker-inner > i,
        .eb-image-hotspots-wrapper.${blockId} .eb-hotspot-marker .eb-hotspot-marker-inner > span.dashicon {
            ${hotspotIconSizeMobile}
        }

        .eb-image-hotspots-wrapper.${blockId} .eb-hotspot-marker .eb-hotspot-marker-inner > span.eb-hotspot-text {
            ${hotspotTextTypoMobile}
        }

        .eb-image-hotspots-wrapper.${blockId} .eb-hotspot-marker .eb-hotspot-marker-inner > span.eb-hotspot-number {
            ${hotspotNumberSizeMobile}
            ${hotspotNumberWidthMobile}
            ${hotspotNumberHeightMobile}
        }

        .eb-image-hotspots-wrapper.${blockId} .eb-hotspot-marker .eb-hotspot-marker-inner .eb-hotspot-dot {
            ${hotspotDotWidthMobile}
            ${hotspotDotHeightMobile}
            border-radius: 50%;
        }

        .eb-image-hotspots-wrapper.${blockId} .eb-hotspot-tooltip {
            ${tooltipWidthMobile}
            ${tooltipPaddingMobile}
            ${tooltipBorderRadiusMobile}
            ${tooltipOffsetMobile}
        }
        .eb-image-hotspots-wrapper.${blockId} .eb-hotspot-tooltip .eb-tooltip-arrow {
            ${tooltipArrowSizeMobile}
        }
        .eb-image-hotspots-wrapper.${blockId} .eb-hotspot-tooltip .eb-tooltip-title {
            ${tooltipTitleTypoMobile}
        }
        .eb-image-hotspots-wrapper.${blockId} .eb-hotspot-tooltip .eb-tooltip-content {
            ${tooltipContentTypoMobile}
        }
    `;

    const wrapperClass = "eb-image-hotspots-wrapper";
    // Image styles from ImageComponent
    const {
        imgDesktopStyle: imgDesktopStyle,
        imgTabStyle: imgTabStyle,
        imgMobileStyle: imgMobileStyle,
    } = ImageComponent.Style({
        blockId: blockId,
        wrapperClass: wrapperClass,
        hasFilter: false,
        width: IMAGE_WIDTH,
        useImageAlign: true
        // height: IMAGE_HEIGHT_RANGE,
        // border: IMAGE_BORDER_SHADOW,
        // padding: IMAGE_PADDING,
        // margin: IMAGE_MARGIN,
    });


    // All styles
    const desktopAllStyles = softMinifyCssStrings(`
        ${desktopStyles}
        ${imgDesktopStyle}
    `);
    const tabAllStyles = softMinifyCssStrings(`
        ${tabStyles}
        ${imgTabStyle}
    `);
    const mobileAllStyles = softMinifyCssStrings(`
        ${mobileStyles}
        ${imgMobileStyle}
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
