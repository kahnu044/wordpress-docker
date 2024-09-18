
import {
    WRAPPER_BG,
    WRAPPER_MARGIN,
    WRAPPER_PADDING,
    WRAPPER_BORDER_SHADOW,
    PREFIX_ICON_SIZE,
    SEPARATOR_ICON_SIZE,
    BREADCRUMB_BORDER_SHADOW,
    BREADCRUMB_PADDING
} from "./constants/constants";

import {
    BREADCRUMB_TYPO,
    PREFIX_TYPO,
    SEPARATOR_TYPO
} from "./constants/typographyPrefixConstants";

/**
 * External depencencies
 */
import {
    softMinifyCssStrings,
    generateTypographyStyles,
    generateDimensionsControlStyles,
    generateBorderShadowStyles,
    generateBackgroundControlStyles,
    generateResponsiveRangeStyles,
    StyleComponent
} from "@essential-blocks/controls";

export default function Style(props) {
    const { attributes, setAttributes, name } = props;
    const {
        resOption,
        blockMeta,
        blockId,
        prefixColor,
        breadcrumbAlign,
        separatorColor,
        breadcrumbGap,
        prefixGap,
        breadcrumbColor,
        breadcrumbHvColor,
        breadcrumbCurrentColor,
        breadcrumbCurrentHvColor,
    } = attributes;

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
        styesDesktop: breadcrumbBDShadowDesktop,
        styesTab: breadcrumbBDShadowTab,
        styesMobile: breadcrumbBDShadowMobile,
        stylesHoverDesktop: breadcrumbBDShadowHoverDesktop,
        stylesHoverTab: breadcrumbBDShadowHoverTab,
        stylesHoverMobile: breadcrumbBDShadowHoverMobile,
        transitionStyle: breadcrumbBDShadowTransition,
    } = generateBorderShadowStyles({
        controlName: BREADCRUMB_BORDER_SHADOW,
        attributes,
    });

    const {
        dimensionStylesDesktop: breadcrumbPaddingDesktop,
        dimensionStylesTab: breadcrumbPaddingTab,
        dimensionStylesMobile: breadcrumbPaddingMobile,
    } = generateDimensionsControlStyles({
        controlName: BREADCRUMB_PADDING,
        styleFor: "padding",
        attributes,
    });

    const {
        typoStylesDesktop: breadcumbTypoStylesDesktop,
        typoStylesTab: breadcumbTypoStylesTab,
        typoStylesMobile: breadcumbTypoStylesMobile,
    } = generateTypographyStyles({
        attributes,
        prefixConstant: BREADCRUMB_TYPO,
    });

    const {
        typoStylesDesktop: separatorTypoStylesDesktop,
        typoStylesTab: separatorTypoStylesTab,
        typoStylesMobile: separatorTypoStylesMobile,
    } = generateTypographyStyles({
        attributes,
        prefixConstant: SEPARATOR_TYPO,
    });

    const {
        typoStylesDesktop: prefixTypoStylesDesktop,
        typoStylesTab: prefixTypoStylesTab,
        typoStylesMobile: prefixTypoStylesMobile,
    } = generateTypographyStyles({
        attributes,
        prefixConstant: PREFIX_TYPO,
    });

    const {
        rangeStylesDesktop: prefixIconSizeDesktop,
        rangeStylesTab: prefixIconSizeTab,
        rangeStylesMobile: prefixIconSizeMobile,
    } = generateResponsiveRangeStyles({
        controlName: PREFIX_ICON_SIZE,
        property: "font-size",
        attributes,
    });
    const {
        rangeStylesDesktop: separatorIconSizeDesktop,
        rangeStylesTab: separatorIconSizeTab,
        rangeStylesMobile: separatorIconSizeMobile,
    } = generateResponsiveRangeStyles({
        controlName: SEPARATOR_ICON_SIZE,
        property: "font-size",
        attributes,
    });

    // all desktop styls start
    // Desktop Wrapper
    const desktopWrapper = `
		.${blockId}.eb-breadcrumb-wrapper {
			${wrapperMarginDesktop}
			${wrapperPaddingDesktop}
			${wrapperBDShadowDesktop}
			${wrapperBackgroundStylesDesktop}
			transition:${wrapperBgTransitionStyle}, ${wrapperBDShadowTransition};

            justify-content: ${breadcrumbAlign};
            gap: ${prefixGap ? prefixGap : 10}px;
		}
        .${blockId}.eb-breadcrumb-wrapper:hover {
			${wrapperHoverBackgroundStylesDesktop}
			${wrapperBDShadowHoverDesktop}
		}
        .${blockId}.eb-breadcrumb-wrapper:before{
			${wrapperOverlayStylesDesktop}
			transition:${wrapperOvlTransitionStyle};
		}

		.${blockId}.eb-breadcrumb-wrapper:hover:before{
			${wrapperHoverOverlayStylesDesktop}
		}

        .${blockId}.eb-breadcrumb-wrapper .eb-breadcrumb {
            gap: ${breadcrumbGap}px;
        }

        .${blockId}.eb-breadcrumb-wrapper .eb-breadcrumb-item {
            ${breadcrumbPaddingDesktop}
            ${breadcrumbBDShadowDesktop}
            transition: ${breadcrumbBDShadowTransition};
        }
        .${blockId}.eb-breadcrumb-wrapper .eb-breadcrumb-item:hover {
            color: ${breadcrumbHvColor};
            ${breadcrumbBDShadowHoverDesktop}
        }
        .${blockId}.eb-breadcrumb-wrapper .eb-breadcrumb-item,
        .${blockId}.eb-breadcrumb-wrapper .eb-breadcrumb-item a {
            color: ${breadcrumbColor};
            ${breadcumbTypoStylesDesktop}
        }
        .${blockId}.eb-breadcrumb-wrapper .eb-breadcrumb-item:hover,
        .${blockId}.eb-breadcrumb-wrapper .eb-breadcrumb-item:hover a{
            color: ${breadcrumbHvColor};
            ${breadcrumbBDShadowHoverDesktop}
        }
        .${blockId}.eb-breadcrumb-wrapper .eb-breadcrumb-item.current {
            color: ${breadcrumbCurrentColor};
        }
        .${blockId}.eb-breadcrumb-wrapper .eb-breadcrumb-item.current:hover {
            color: ${breadcrumbCurrentHvColor};
        }
        .${blockId}.eb-breadcrumb-wrapper .eb-breadcrumb-separator *:not(i),
        .${blockId}.eb-breadcrumb-wrapper .eb-breadcrumb-separator {
            color: ${separatorColor};
            ${separatorTypoStylesDesktop}
        }
        .${blockId}.eb-breadcrumb-wrapper .eb-breadcrumb-separator i{
            ${separatorIconSizeDesktop}
        }
        .${blockId}.eb-breadcrumb-wrapper .prefix-wrap *:not(i){
            color: ${prefixColor};
            ${prefixTypoStylesDesktop}
        }
        .${blockId}.eb-breadcrumb-wrapper .prefix-wrap i {
            color: ${prefixColor};
            ${prefixIconSizeDesktop}
        }
	`;

    // ALL TAB Styles
    // tab Wrapper
    const tabWrapper = `
		.${blockId}.eb-breadcrumb-wrapper {
			${wrapperMarginTab}
			${wrapperPaddingTab}
			${wrapperBDShadowTab}
			${wrapperBackgroundStylesTab}
		}
        .${blockId}.eb-breadcrumb-wrapper:hover {
			${wrapperBDShadowHoverTab}
            ${wrapperHoverBackgroundStylesTab}
		}
        .${blockId}.eb-breadcrumb-wrapper:before{
			${wrapperOverlayStylesTab}
		}
		.${blockId}.eb-breadcrumb-wrapper:hover:before{
			${wrapperHoverOverlayStylesTab}
		}

        .${blockId}.eb-breadcrumb-wrapper .eb-breadcrumb-item {
            ${breadcrumbPaddingTab}
            ${breadcrumbBDShadowTab}
        }
        .${blockId}.eb-breadcrumb-wrapper .eb-breadcrumb-item:hover {
            ${breadcrumbBDShadowHoverTab}
        }
        .${blockId}.eb-breadcrumb-wrapper .eb-breadcrumb-item,
        .${blockId}.eb-breadcrumb-wrapper .eb-breadcrumb-item a {
            ${breadcumbTypoStylesTab}
        }
        .${blockId}.eb-breadcrumb-wrapper .eb-breadcrumb-item:hover,
        .${blockId}.eb-breadcrumb-wrapper .eb-breadcrumb-item:hover a{
            ${breadcrumbBDShadowHoverTab}
        }
        .${blockId}.eb-breadcrumb-wrapper .eb-breadcrumb-separator,
        .${blockId}.eb-breadcrumb-wrapper .eb-breadcrumb-separator *:not(i){
            ${separatorTypoStylesTab}
        }
        .${blockId}.eb-breadcrumb-wrapper .eb-breadcrumb-separator i{
            ${separatorIconSizeTab}
        }
        .${blockId}.eb-breadcrumb-wrapper .prefix-wrap *:not(i){
            ${prefixTypoStylesTab}
        }
        .${blockId}.eb-breadcrumb-wrapper .prefix-wrap i {
            ${prefixIconSizeTab}
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

        .${blockId}.eb-breadcrumb-wrapper:before{
			${wrapperOverlayStylesMobile}
		}
		.${blockId}.eb-breadcrumb-wrapper:hover:before{
			${wrapperHoverOverlayStylesMobile}
		}

        .${blockId}.eb-breadcrumb-wrapper .eb-breadcrumb-item {
            ${breadcrumbPaddingMobile}
            ${breadcrumbBDShadowMobile}
        }
        .${blockId}.eb-breadcrumb-wrapper .eb-breadcrumb-item:hover {
            ${breadcrumbBDShadowHoverMobile}
        }
        .${blockId}.eb-breadcrumb-wrapper .eb-breadcrumb-item,
        .${blockId}.eb-breadcrumb-wrapper .eb-breadcrumb-item a {
            ${breadcumbTypoStylesMobile}
        }
        .${blockId}.eb-breadcrumb-wrapper .eb-breadcrumb-item:hover,
        .${blockId}.eb-breadcrumb-wrapper .eb-breadcrumb-item:hover a{
            ${breadcrumbBDShadowHoverMobile}
        }
        .${blockId}.eb-breadcrumb-wrapper .eb-breadcrumb-separator,
        .${blockId}.eb-breadcrumb-wrapper .eb-breadcrumb-separator *:not(i){
            ${separatorTypoStylesMobile}
        }
        .${blockId}.eb-breadcrumb-wrapper .eb-breadcrumb-separator i{
            ${separatorIconSizeMobile}
        }
        .${blockId}.eb-breadcrumb-wrapper .prefix-wrap *:not(i){
            ${prefixTypoStylesMobile}
        }
        .${blockId}.eb-breadcrumb-wrapper .prefix-wrap i {
            ${prefixIconSizeMobile}
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
