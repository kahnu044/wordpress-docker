import { useEffect } from "@wordpress/element";
import {
    WRAPPER_BG,
    WRAPPER_MARGIN,
    WRAPPER_PADDING,
    WRAPPER_BORDER_SHADOW,
    IMAGE_WIDTH,
    IMAGE_HEIGHT,
    IMAGE_BORDER_SHADOW,
    IMAGE_ALIGNMENT,
} from "./constants";

/**
 * External depencencies
 */
import {
    softMinifyCssStrings,
    generateDimensionsControlStyles,
    generateBorderShadowStyles,
    generateResponsiveRangeStyles,
    generateBackgroundControlStyles,
    generateResponsiveAlignStyles,
    StyleComponent,
    ImageComponent,
} from "@essential-blocks/controls";

export default function Style(props) {
    const { attributes, setAttributes, name } = props;
    const {
        blockId,
        image,
        complexStyle,
        autoFit,
        fitStyles,
        autoHeight,
        imgSource
    } = attributes;

    // Get only urls for Lightbox
    let urls = image.url;
    // image size
    useEffect(() => {
        if (urls && imageWidthDesktop.length == 0) {
            setAttributes({
                widthRange: image.width,
                widthUnit: "px",
                heightRange: image.height,
                heightUnit: "px",
            });
        }
    }, [urls]);

    /**
     * CSS/styling Codes Starts from Here
     */

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

    // range controller Separator Line Width
    const {
        rangeStylesDesktop: imageWidthDesktop,
        rangeStylesTab: imageWidthTab,
        rangeStylesMobile: imageWidthMobile,
    } = generateResponsiveRangeStyles({
        controlName: IMAGE_WIDTH,
        property: "",
        attributes,
    });

    const {
        alignStylesDesktop: imageAlignDesktop,
        alignStylesTab: imageAlignTab,
        alignStylesMobile: imageAlignMobile,
    } = generateResponsiveAlignStyles({
        controlName: IMAGE_ALIGNMENT,
        property: "margin",
        attributes,
    });

    // range controller Separator Line Width
    const {
        rangeStylesDesktop: imageHeightDesktop,
        rangeStylesTab: imageHeightTab,
        rangeStylesMobile: imageHeightMobile,
    } = generateResponsiveRangeStyles({
        controlName: IMAGE_HEIGHT,
        property: "",
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
        // noShadow: true,
        // noBorder: true,
    });

    // wrapper styles css in strings ⬇
    const wrapperStylesDesktop = `
		.eb-advanced-image-wrapper.${blockId}{
			${wrapperMarginDesktop}
			${wrapperPaddingDesktop}
			${wrapperBDShadowDesktop}
			${wrapperBackgroundStylesDesktop}
			transition:${wrapperBgTransitionStyle}, ${wrapperBDShadowTransitionStyle};
		}
		.eb-advanced-image-wrapper.${blockId}:hover {
			${wrapperBDShadowHoverDesktop}
			${wrapperHoverBackgroundStylesDesktop}
		}
	`;
    const wrapperStylesTab = `
		.eb-advanced-image-wrapper.${blockId}{
			${wrapperMarginTab}
			${wrapperPaddingTab}
			${wrapperBDShadowTab}
			${wrapperBackgroundStylesTab}
		}
		.eb-advanced-image-wrapper.${blockId}:hover {
			${wrapperBDShadowHoverTab}
			${wrapperHoverBackgroundStylesTab}
		}
	`;
    const wrapperStylesMobile = `
		.eb-advanced-image-wrapper.${blockId}{
			${wrapperMarginMobile}
			${wrapperPaddingMobile}
			${wrapperBDShadowMobile}
			${wrapperBackgroundStylesMobile}
		}
		.eb-advanced-image-wrapper.${blockId}:hover {
			${wrapperBDShadowHoverMobile}
			${wrapperHoverBackgroundStylesMobile}
		}
	`;

    const imageStylesDesktop = `
		.eb-advanced-image-wrapper.${blockId} .eb-image-wrapper{
			${imageAlignDesktop}
		}
            ${
                imgSource !== "custom"
                    ? `
                .eb-advanced-image-wrapper.${blockId} .image-wrapper {
			width${imageWidthDesktop};
			${autoHeight ? `height: auto;` : `height${imageHeightDesktop}`};
			transition: transform 0.5s, ${imageBDShadowTransitionStyle};
			${imageAlignDesktop}
		}
            .eb-advanced-image-wrapper.${blockId} .image-wrapper,
            .eb-advanced-image-wrapper.${blockId} .image-wrapper img {
                ${!complexStyle ? imageBDShadowDesktop : ""}
            }
		.eb-advanced-image-wrapper.${blockId} .image-wrapper img{
			transition: transform 0.5s, ${imageBDShadowTransitionStyle};
			${autoFit ? `object-fit: ${fitStyles};` : ""}
            ${imageWidthDesktop ? "width: 100%" : ""}
		}
                `
                    : ``
            }
	`;

    const imageStylesTab = `
		.eb-advanced-image-wrapper.${blockId} .eb-image-wrapper{
			${imageAlignTab}
		}
            ${
                imgSource !== "custom"
                    ? `
                .eb-advanced-image-wrapper.${blockId} .image-wrapper {
			width${imageWidthTab};
			${autoHeight ? `height: auto;` : `height${imageHeightTab}`};
			transition: transform 0.5s, ${imageBDShadowTransitionStyle};
			${imageAlignTab}		}
            .eb-advanced-image-wrapper.${blockId} .image-wrapper,
            .eb-advanced-image-wrapper.${blockId} .image-wrapper img {
                ${!complexStyle ? imageBDShadowTab : ""}
            }
		.eb-advanced-image-wrapper.${blockId} .image-wrapper img{
			transition: transform 0.5s, ${imageBDShadowTransitionStyle};
			${autoFit ? `object-fit: ${fitStyles};` : ""}
            ${imageWidthTab ? "width: 100%" : ""}
		}
                `
                    : ``
            }
	`;

    const imageStylesMobile = `
        .eb-advanced-image-wrapper.${blockId} .eb-image-wrapper{
			${imageAlignMobile}
		}
            ${
                imgSource !== "custom"
                    ? `
                .eb-advanced-image-wrapper.${blockId} .image-wrapper {
			width${imageWidthMobile};
			${autoHeight ? `height: auto;` : `height${imageHeightTab}`};
			transition: transform 0.5s, ${imageBDShadowTransitionStyle};
			${imageAlignMobile}		}
            .eb-advanced-image-wrapper.${blockId} .image-wrapper,
            .eb-advanced-image-wrapper.${blockId} .image-wrapper img {
                ${!complexStyle ? imageBDShadowMobile : ""}
            }
		.eb-advanced-image-wrapper.${blockId} .image-wrapper img{
			transition: transform 0.5s, ${imageBDShadowTransitionStyle};
			${autoFit ? `object-fit: ${fitStyles};` : ""}
            ${imageWidthMobile? "width: 100%" : ""}
		}
                `
                    : ``
            }
	`;
    const wrapperClass = "eb-advanced-image-wrapper";
    const {
        imgDesktopStyle: imgDesktopStyle,
        imgTabStyle: imgTabStyle,
        imgMobileStyle: imgMobileStyle,
    } = ImageComponent.Style({
        blockId: blockId, // blockId
        wrapperClass: wrapperClass, // block's wrapper class
        width: IMAGE_WIDTH, // width
        height: IMAGE_HEIGHT, // height
        border: IMAGE_BORDER_SHADOW, // border
        hasFilter: false,
    });

    // all css styles for large screen width (desktop/laptop) in strings ⬇
    const desktopAllStyles = softMinifyCssStrings(`
		${wrapperStylesDesktop}
		${imageStylesDesktop}
        ${imgDesktopStyle}
	`);

    // all css styles for Tab in strings ⬇
    const tabAllStyles = softMinifyCssStrings(`
		${wrapperStylesTab}
		${imageStylesTab}
        ${imgTabStyle}
	`);

    // all css styles for Mobile in strings ⬇
    const mobileAllStyles = softMinifyCssStrings(`
		${wrapperStylesMobile}
		${imageStylesMobile}
        ${imgMobileStyle}
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
