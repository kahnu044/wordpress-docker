
import {
    WRAPPER_BG,
    WRAPPER_MARGIN,
    WRAPPER_PADDING,
    WRAPPER_BORDER_SHADOW,
    COLUMNCOUNT,
    COLUMNGAP,
    COLUMNWIDTH,
    COLUMNRULEWIDTH,
} from "./constants/constants";
import {
    TEXT_TYPOGRAPHY
} from "./constants/typographyPrefixConstants";

/**
 * External depencencies
 */
import {
    softMinifyCssStrings,
    generateTypographyStyles,
    generateDimensionsControlStyles,
    generateBorderShadowStyles,
    generateResponsiveRangeStyles,
    generateBackgroundControlStyles,
    StyleComponent
} from "@essential-blocks/controls";

export default function Style(props) {
    const { attributes, setAttributes, name } = props;
    const {
        blockId,
        align,
        color,
        hoverColor,
        columnRuleColor,
        columnRuleStyle
    } = attributes;

    // CSS/styling Codes Starts from Here
    const {
        typoStylesDesktop: textTypographyDesktop,
        typoStylesTab: textTypographyTab,
        typoStylesMobile: textTypographyMobile,
    } = generateTypographyStyles({
        attributes,
        prefixConstant: TEXT_TYPOGRAPHY,
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

    // responsive range controller Column
    const {
        rangeStylesDesktop: columnCountDesktop,
        rangeStylesTab: columnCountTab,
        rangeStylesMobile: columnCountMobile,
    } = generateResponsiveRangeStyles({
        controlName: COLUMNCOUNT,
        property: "column-count",
        attributes,
        noUnits: true
    });

    const {
        rangeStylesDesktop: columnRuleWidthDesktop,
        rangeStylesTab: columnRuleWidthTab,
        rangeStylesMobile: columnRuleWidthMobile,
    } = generateResponsiveRangeStyles({
        controlName: COLUMNRULEWIDTH,
        property: "column-rule-width",
        attributes
    });

    const {
        rangeStylesDesktop: columnWidthDesktop,
        rangeStylesTab: columnWidthTab,
        rangeStylesMobile: columnWidthMobile,
    } = generateResponsiveRangeStyles({
        controlName: COLUMNWIDTH,
        property: "column-width",
        attributes
    });

    const {
        rangeStylesDesktop: columnGapDesktop,
        rangeStylesTab: columnGapTab,
        rangeStylesMobile: columnGapMobile,
    } = generateResponsiveRangeStyles({
        controlName: COLUMNGAP,
        property: "column-gap",
        attributes
    });

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

    //Generate Background
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

    // wrapper styles css in strings ⬇
    const wrapperStylesDesktop = `
		.eb-text-wrapper.${blockId}{
			position: relative;
			text-align: ${align};
			${wrapperMarginDesktop}
			${wrapperPaddingDesktop}
			${wrapperBDShadowDesktop}
			${wrapperBackgroundStylesDesktop}
			transition:${wrapperBgTransitionStyle}, ${wrapperBDShadowTransition};
		}

		.eb-text-wrapper.${blockId}:hover {
			${wrapperBDShadowHoverDesktop}
			${wrapperHoverBackgroundStylesDesktop}
		}

		.eb-text-wrapper.${blockId}:before{
			${wrapperOverlayStylesDesktop}
			transition:${wrapperOvlTransitionStyle};
		}

		.eb-text-wrapper.${blockId}:hover:before{
			${wrapperHoverOverlayStylesDesktop}
		}
	`;
    const wrapperStylesTab = `
		.eb-text-wrapper.${blockId}{
			${wrapperMarginTab}
			${wrapperPaddingTab}
			${wrapperBDShadowTab}
			${wrapperBackgroundStylesTab}
		}
		.eb-text-wrapper.${blockId}:hover {
			${wrapperBDShadowHoverTab}
			${wrapperHoverBackgroundStylesTab}
		}

		.eb-text-wrapper.${blockId}:before{
			${wrapperOverlayStylesTab}
		}

		.eb-text-wrapper.${blockId}:hover:before{
			${wrapperHoverOverlayStylesTab}
		}
	`;
    const wrapperStylesMobile = `
		.eb-text-wrapper.${blockId}{
			${wrapperMarginMobile}
			${wrapperPaddingMobile}
			${wrapperBDShadowMobile}
			${wrapperBackgroundStylesMobile}
		}
		.eb-text-wrapper.${blockId}:hover {
			${wrapperBDShadowHoverMobile}
			${wrapperHoverBackgroundStylesMobile}
		}

		.eb-text-wrapper.${blockId}:before{
			${wrapperOverlayStylesMobile}
		}

		.eb-text-wrapper.${blockId}:hover:before{
			${wrapperHoverOverlayStylesMobile}
		}
	`;

    // Text styles css in strings ⬇
    const textStylesDesktop = `
		.eb-text-wrapper.${blockId} .eb-text {
			text-align: ${align};
			color: ${color};
			column-rule-color: ${columnRuleColor};
			column-rule-style: ${columnRuleStyle};
			${textTypographyDesktop}
			${columnCountDesktop}
			${columnGapDesktop}
			${columnWidthDesktop}
			${columnRuleWidthDesktop}
		}
		.eb-text-wrapper.${blockId}:hover .eb-text{
			color: ${hoverColor};
		}
	`;

    const textStylesTab = `
		.eb-text-wrapper.${blockId} .eb-text {
			${textTypographyTab}
			${columnCountTab}
			${columnGapTab}
			${columnWidthTab}
			${columnRuleWidthTab}
		}
	`;

    const textStylesMobile = `
		.eb-text-wrapper.${blockId} .eb-text {
			${textTypographyMobile}
			${columnCountMobile}
			${columnGapMobile}
			${columnWidthMobile}
			${columnRuleWidthMobile}
		}
	`;

    // all css styles for large screen width (desktop/laptop) in strings ⬇
    const desktopAllStyles = softMinifyCssStrings(`
			${wrapperStylesDesktop}
			${textStylesDesktop}
		`);

    // all css styles for Tab in strings ⬇
    const tabAllStyles = softMinifyCssStrings(`
			${wrapperStylesTab}
			${textStylesTab}
		`);

    // all css styles for Mobile in strings ⬇
    const mobileAllStyles = softMinifyCssStrings(`
			${wrapperStylesMobile}
			${textStylesMobile}
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
