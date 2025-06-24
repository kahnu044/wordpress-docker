
import {
    WRAPPER_BG,
    WRAPPER_MARGIN,
    WRAPPER_PADDING,
    WRAPPER_BORDER_SHADOW,

    lottieWidth,
    lottieHeight,
} from "./constants/constants";

import { TITLE_TYPOGRAPHY } from "./constants/typographyPrefixConstants";

/**
 * External depencencies
 */
import {
    softMinifyCssStrings,
    generateDimensionsControlStyles,
    generateBorderShadowStyles,
    generateBackgroundControlStyles,
    generateResponsiveRangeStyles,
    generateTypographyStyles,
    StyleComponent
} from "@essential-blocks/controls";

export default function Style(props) {
    const { attributes, setAttributes, name } = props;
    const {
        resOption,
        blockMeta,
        blockId,
        alignment,
        titleColor,
        titleBGColor,
    } = attributes;

    const {
        typoStylesDesktop: titleTypographyDesktop,
        typoStylesTab: titleTypographyTab,
        typoStylesMobile: titleTypographyMobile,
    } = generateTypographyStyles({
        attributes,
        prefixConstant: TITLE_TYPOGRAPHY,
    });

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
        rangeStylesDesktop: lottieWidthDesktop,
        rangeStylesTab: lottieWidthTab,
        rangeStylesMobile: lottieWidthMobile,
    } = generateResponsiveRangeStyles({
        controlName: lottieWidth,
        customUnit: "px",
        property: "width",
        attributes,
    });
    const {
        rangeStylesDesktop: lottieHeightDesktop,
        rangeStylesTab: lottieHeightTab,
        rangeStylesMobile: lottieHeightMobile,
    } = generateResponsiveRangeStyles({
        controlName: lottieHeight,
        customUnit: "px",
        property: "height",
        attributes,
    });

    // all desktop styls start
    // Desktop Wrapper
    const desktopWrapper = `
		.${blockId}.eb-lottie-animation-wrapper {
			${wrapperMarginDesktop}
			${wrapperPaddingDesktop}
			${wrapperBDShadowDesktop}
			${wrapperBackgroundStylesDesktop}
			transition:${wrapperBgTransitionStyle}, ${wrapperBDShadowTransition};
            align-items: ${alignment};
		}
        .${blockId}.eb-lottie-animation-wrapper:hover {
			${wrapperHoverBackgroundStylesDesktop}
			${wrapperBDShadowHoverDesktop}
		}
        .${blockId}.eb-lottie-animation-wrapper:before{
			${wrapperOverlayStylesDesktop}
			transition:${wrapperOvlTransitionStyle};
		}
		.${blockId}.eb-lottie-animation-wrapper:hover:before{
			${wrapperHoverOverlayStylesDesktop}
		}
		.${blockId}.eb-lottie-animation-wrapper .eb-lottie-animation{
            ${lottieWidthDesktop ? lottieWidthDesktop : `width: 100%;`}
			${lottieHeightDesktop ? lottieHeightDesktop : `height: 100%;`}
		}
        .${blockId}.eb-lottie-animation-wrapper .eb-lottie-animation canvas {
            ${lottieWidthDesktop ? lottieWidthDesktop : `width: 100%;`}
			${lottieHeightDesktop ? lottieHeightDesktop : `height: 100%;`}
		}
		.${blockId}.eb-lottie-animation-wrapper .eb-lottie-animation-title{
			${titleTypographyDesktop}
			color: ${titleColor};
			background: ${titleBGColor};
            text-align: ${alignment};
		}
	`;

    // ALL TAB Styles
    // tab Wrapper
    const tabWrapper = `
		.${blockId}.eb-lottie-animation-wrapper {
			${wrapperMarginTab}
			${wrapperPaddingTab}
			${wrapperBDShadowTab}
			${wrapperBackgroundStylesTab}
		}
        .${blockId}.eb-lottie-animation-wrapper:hover {
			${wrapperBDShadowHoverTab}
            ${wrapperHoverBackgroundStylesTab}
		}
        .${blockId}.eb-lottie-animation-wrapper:before{
			${wrapperOverlayStylesTab}
		}
		.${blockId}.eb-lottie-animation-wrapper:hover:before{
			${wrapperHoverOverlayStylesTab}
		}

        .${blockId}.eb-lottie-animation-wrapper .eb-lottie-animation {
			${lottieHeightTab ? lottieHeightTab : `height: 100%;`}
            ${lottieWidthTab ? lottieWidthTab : `width: 100%;`}
		}
        .${blockId}.eb-lottie-animation-wrapper .eb-lottie-animation canvas {
            ${lottieWidthTab ? lottieWidthTab : `width: 100%;`}
            ${lottieHeightTab ? lottieHeightTab : `height: 100%;`}
		}

        .${blockId}.eb-lottie-animation-wrapper .eb-lottie-animation-title{
			${titleTypographyTab}
		}

	`;

    // ALL MOBILE Styles
    // mobile Wrapper
    const mobileWrapper = `
		.${blockId}.eb-icon-wrapper {
			${wrapperMarginMobile}
			${wrapperPaddingMobile}
			${wrapperBDShadowMobile}
			${wrapperBackgroundStylesMobile}
		}
		.${blockId}.eb-icon-wrapper:hover {
			${wrapperHoverBackgroundStylesMobile}
			${wrapperBDShadowHoverMobile}
		}
        .${blockId}.eb-lottie-animation-wrapper:before{
			${wrapperOverlayStylesMobile}
		}
		.${blockId}.eb-lottie-animation-wrapper:hover:before{
			${wrapperHoverOverlayStylesMobile}
		}
        .${blockId}.eb-lottie-animation-wrapper .eb-lottie-animation {
            ${lottieWidthMobile ? lottieWidthMobile : `width: 100%;`}
			${lottieHeightMobile ? lottieHeightMobile : `height: 100%;`}
		}
        .${blockId}.eb-lottie-animation-wrapper .eb-lottie-animation canvas{
            ${lottieWidthMobile ? lottieWidthMobile : `width: 100%;`}
			${lottieHeightMobile ? lottieHeightMobile : `height: 100%;`}
		}
        .${blockId}.eb-lottie-animation-wrapper .eb-lottie-animation-title{
			${titleTypographyMobile}
		}

	`;

    // all css styles for large screen width (desktop/laptop) in strings ⬇
    // all desktop
    const desktopAllStyles = softMinifyCssStrings(`
		${desktopWrapper}
	`);

    // all css styles for Tab in strings ⬇
    const tabAllStyles = softMinifyCssStrings(`
		${tabWrapper}
	`);

    // all css styles for Mobile in strings ⬇
    const mobileAllStyles = softMinifyCssStrings(`
		${mobileWrapper}
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
