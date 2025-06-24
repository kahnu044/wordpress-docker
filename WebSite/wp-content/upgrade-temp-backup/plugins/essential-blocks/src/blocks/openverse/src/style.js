import {
    WRAPPER_BG,
    WRAPPER_MARGIN,
    WRAPPER_PADDING,
    WRAPPER_BORDER_SHADOW,
    IMAGE_WIDTH,
    IMAGE_HEIGHT,
    IMAGE_BORDER_SHADOW,
    ATTRIBUTION_MARGIN,
    ATTRIBUTION_PADDING,
    ATTRIBUTION_WIDTH,
} from "./constants";

import { ATTRIBUTION_TYPOGRAPHY } from "./constants/typoConstants";

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
        resOption,
        blockId,
        blockMeta,
        displayAttribution,
        attributionColor,
        attributionBGColor,
        horizontalAlign,
        verticalAlign,
        verticalAlignCap2,
        textAlign,
        stylePreset,
        attributionStyle,
        hoverEffect,
        imageAlign,
        complexStyle,
        autoFit,
        classHook,
        imageurl,
    } = attributes;

    /**
     * CSS/styling Codes Starts from Here
     */

    // Caption Typography
    const {
        typoStylesDesktop: attributionTypographyDesktop,
        typoStylesTab: attributionTypographyTab,
        typoStylesMobile: attributionTypographyMobile,
    } = generateTypographyStyles({
        attributes,
        prefixConstant: ATTRIBUTION_TYPOGRAPHY,
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
        dimensionStylesDesktop: attributionMarginDesktop,
        dimensionStylesTab: attributionMarginTab,
        dimensionStylesMobile: attributionMarginMobile,
    } = generateDimensionsControlStyles({
        controlName: ATTRIBUTION_MARGIN,
        styleFor: "margin",
        attributes,
    });

    /* Caption Padding */
    const {
        dimensionStylesDesktop: attributionPaddingDesktop,
        dimensionStylesTab: attributionPaddingTab,
        dimensionStylesMobile: attributionPaddingMobile,
    } = generateDimensionsControlStyles({
        controlName: ATTRIBUTION_PADDING,
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

    // range controller Separator Line Grid Column Margin Bottom
    const {
        rangeStylesDesktop: attributionWidthDesktop,
        rangeStylesTab: attributionWidthTab,
        rangeStylesMobile: attributionWidthMobile,
    } = generateResponsiveRangeStyles({
        controlName: ATTRIBUTION_WIDTH,
        property: "width",
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
		.eb-openverse-wrapper.${blockId}{
			${wrapperMarginDesktop}
			${wrapperPaddingDesktop}
			${wrapperBDShadowDesktop}
			${wrapperBackgroundStylesDesktop}
			transition:${wrapperBgTransitionStyle}, ${wrapperBDShadowTransitionStyle};
		}
		.eb-openverse-wrapper.${blockId}:hover {
			${wrapperBDShadowHoverDesktop}
			${wrapperHoverBackgroundStylesDesktop}
		}
	`;
    const wrapperStylesTab = `
		.eb-openverse-wrapper.${blockId}{
			${wrapperMarginTab}
			${wrapperPaddingTab}
			${wrapperBDShadowTab}
			${wrapperBackgroundStylesTab}
		}
		.eb-openverse-wrapper.${blockId}:hover {
			${wrapperBDShadowHoverTab}
			${wrapperHoverBackgroundStylesTab}
		}
	`;
    const wrapperStylesMobile = `
		.eb-openverse-wrapper.${blockId}{
			${wrapperMarginMobile}
			${wrapperPaddingMobile}
			${wrapperBDShadowMobile}
			${wrapperBackgroundStylesMobile}
		}
		.eb-openverse-wrapper.${blockId}:hover {
			${wrapperBDShadowHoverMobile}
			${wrapperHoverBackgroundStylesMobile}
		}
	`;

    const imageStylesDesktop = `
		.eb-openverse-wrapper.${blockId} .image-wrapper{
			width${imageWidthDesktop || ": auto"};
			height${imageHeightDesktop || ": auto"};
			${!complexStyle ? imageBDShadowDesktop : ""}
			transition: transform 0.5s, ${imageBDShadowTransitionStyle};
			margin: ${imageAlign};
		}

		.eb-openverse-wrapper.${blockId} .image-wrapper img{
			transition: transform 0.5s, ${imageBDShadowTransitionStyle};
			${autoFit ? "object-fit: cover;" : ""}
		}

		.eb-openverse-wrapper.${blockId} .image-attribution{
			color: ${attributionColor};
			text-align: ${textAlign};
			${attributionMarginDesktop}
			${attributionPaddingDesktop}
			${attributionTypographyDesktop}
			${attributionWidthDesktop}
		}

		.eb-openverse-wrapper.${blockId} .image-wrapper:hover {
			${!complexStyle ? imageBDShadowHoverDesktop : ""}
		}
		${!displayAttribution
            ? ` .eb-openverse-wrapper.${blockId} .image-attribution {display:none;} `
            : ""
        }
	`;

    const imageStylesTab = `
		.eb-openverse-wrapper.${blockId} .image-wrapper{
			width${imageWidthTab || ": auto"};
			height${imageHeightTab || ": auto"};
		}
		.eb-openverse-wrapper.${blockId} .image-wrapper:hover {
			${!complexStyle ? imageBDShadowHoverTab : ""}
		}
		.eb-openverse-wrapper.${blockId} .image-attribution {
			${attributionMarginTab}
			${attributionPaddingTab}
			${attributionTypographyTab}
			${attributionWidthTab}
		}
	`;

    const imageStylesMobile = `
		.eb-openverse-wrapper.${blockId} .image-wrapper img{
			${!complexStyle ? imageBDShadowMobile : ""}
		}
		.eb-openverse-wrapper.${blockId} .image-wrapper:hover {
			${!complexStyle ? imageBDShadowHoverMobile : ""}
		}
		.eb-openverse-wrapper.${blockId} .image-wrapper .image-attribution {
			${attributionMarginMobile}
			${attributionPaddingMobile}
			${attributionTypographyMobile}
			${attributionWidthMobile}
		}
		.eb-openverse-wrapper.${blockId} .image-wrapper{
			width${imageWidthMobile || ": auto"};
			height${imageHeightMobile || ": auto"};
		}
	`;

    // all css styles for large screen width (desktop/laptop) in strings ⬇
    const desktopAllStyles = softMinifyCssStrings(`
		${wrapperStylesDesktop}
		${imageStylesDesktop}
	`);

    // all css styles for Tab in strings ⬇
    const tabAllStyles = softMinifyCssStrings(`
		${wrapperStylesTab}
		${imageStylesTab}
	`);

    // all css styles for Mobile in strings ⬇
    const mobileAllStyles = softMinifyCssStrings(`
		${wrapperStylesMobile}
		${imageStylesMobile}
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
