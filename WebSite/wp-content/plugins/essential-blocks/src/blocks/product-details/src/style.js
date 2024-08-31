
import {
    WRAPPER_BG,
    WRAPPER_MARGIN,
    WRAPPER_PADDING,
    WRAPPER_BORDER_SHADOW,
    tabTitlePadding,
    tabTitleMargin,
    tabTitleBdShadow,
    tabContentMargin,
    tabContentPadding,
    tabContentBdShadow
} from "./constants/constants";
import {
    typoTabTitle,
    typoTabContent
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
    StyleComponent
} from "@essential-blocks/controls";

export default function Style(props) {
    const { attributes, setAttributes, name } = props;
    const {
        resOption,
        blockMeta,
        blockId,
        tabTitleColor,
        tabTitleBGColor,
        tabTitleHvColor,
        tabTitleHvBGColor,
        tabTitleActiveColor,
        tabTitleActiveBGColor,
        tabTitleActiveHvColor,
        tabTitleActiveHvBGColor,
        tabContentColor,
        showDescriptionTab,
        showAdditionalTab,
        showReviewsTab,
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
        styesDesktop: tabTitleBDShadowDesktop,
        styesTab: tabTitleBDShadowTab,
        styesMobile: tabTitleBDShadowMobile,
        stylesHoverDesktop: tabTitleBDShadowHoverDesktop,
        stylesHoverTab: tabTitleBDShadowHoverTab,
        stylesHoverMobile: tabTitleBDShadowHoverMobile,
        transitionStyle: tabTitleBDShadowTransition,
    } = generateBorderShadowStyles({
        controlName: tabTitleBdShadow,
        attributes,
    });

    const {
        styesDesktop: tabContentBDShadowDesktop,
        styesTab: tabContentBDShadowTab,
        styesMobile: tabContentBDShadowMobile,
        stylesHoverDesktop: tabContentBDShadowHoverDesktop,
        stylesHoverTab: tabContentBDShadowHoverTab,
        stylesHoverMobile: tabContentBDShadowHoverMobile,
        transitionStyle: tabContentBDShadowTransition,
    } = generateBorderShadowStyles({
        controlName: tabContentBdShadow,
        attributes,
    });

    const {
        typoStylesDesktop: tabTitleTypoStylesDesktop,
        typoStylesTab: tabTitleTypoStylesTab,
        typoStylesMobile: tabTitleTypoStylesMobile,
    } = generateTypographyStyles({
        attributes,
        prefixConstant: typoTabTitle,
        defaultFontSize: 16,
    });
    const {
        typoStylesDesktop: tabContentTypoStylesDesktop,
        typoStylesTab: tabContentTypoStylesTab,
        typoStylesMobile: tabContentTypoStylesMobile,
    } = generateTypographyStyles({
        attributes,
        prefixConstant: typoTabContent,
        defaultFontSize: 16,
    });

    const {
        dimensionStylesDesktop: tabTitlePaddingDesktop,
        dimensionStylesTab: tabTitlePaddingTab,
        dimensionStylesMobile: tabTitlePaddingMobile,
    } = generateDimensionsControlStyles({
        controlName: tabTitlePadding,
        styleFor: "padding",
        attributes,
    });
    const {
        dimensionStylesDesktop: tabTitleMarginDesktop,
        dimensionStylesTab: tabTitleMarginTab,
        dimensionStylesMobile: tabTitleMarginMobile,
    } = generateDimensionsControlStyles({
        controlName: tabTitleMargin,
        styleFor: "margin",
        attributes,
    });
    const {
        dimensionStylesDesktop: tabContentPaddingDesktop,
        dimensionStylesTab: tabContentPaddingTab,
        dimensionStylesMobile: tabContentPaddingMobile,
    } = generateDimensionsControlStyles({
        controlName: tabContentPadding,
        styleFor: "padding",
        attributes,
    });
    const {
        dimensionStylesDesktop: tabContentMarginDesktop,
        dimensionStylesTab: tabContentMarginTab,
        dimensionStylesMobile: tabContentMarginMobile,
    } = generateDimensionsControlStyles({
        controlName: tabContentMargin,
        styleFor: "margin",
        attributes,
    });

    // all desktop styls start
    // Desktop Wrapper
    const desktopWrapper = `
		.${blockId}.eb-product-details-wrapper {
			${wrapperMarginDesktop}
			${wrapperPaddingDesktop}
			${wrapperBDShadowDesktop}
			${wrapperBackgroundStylesDesktop}
			transition:${wrapperBgTransitionStyle}, ${wrapperBDShadowTransition};
		}
        .${blockId}.eb-product-details-wrapper:hover {
			${wrapperHoverBackgroundStylesDesktop}
			${wrapperBDShadowHoverDesktop}
		}
        .${blockId}.eb-product-details-wrapper:before{
			${wrapperOverlayStylesDesktop}
			transition:${wrapperOvlTransitionStyle};
		}
		.${blockId}.eb-product-details-wrapper:hover:before{
			${wrapperHoverOverlayStylesDesktop}
		}
        html body.woocommerce .${blockId}.eb-product-details-wrapper .woocommerce-tabs ul.tabs li,
        .${blockId}.eb-product-details-wrapper .woocommerce-tabs ul.tabs li {
            ${tabTitleBGColor ? `background-color: ${tabTitleBGColor};` : ""}
            ${tabTitlePaddingDesktop}
            ${tabTitleMarginDesktop}
            ${tabTitleBDShadowDesktop}
		}
        html body.woocommerce .${blockId}.eb-product-details-wrapper .woocommerce-tabs ul.tabs li:hover,
        .${blockId}.eb-product-details-wrapper .woocommerce-tabs ul.tabs li:hover {
            ${tabTitleHvBGColor ? `background-color: ${tabTitleHvBGColor};` : ""}
            ${tabTitleBDShadowHoverDesktop}
		}
        html body.woocommerce .${blockId}.eb-product-details-wrapper .woocommerce-tabs ul.tabs li a,
        .${blockId}.eb-product-details-wrapper .woocommerce-tabs ul.tabs li a {
			${tabTitleTypoStylesDesktop}
            ${tabTitleColor ? `color: ${tabTitleColor};` : ""}
		}
        html body.woocommerce .${blockId}.eb-product-details-wrapper .woocommerce-tabs ul.tabs li:hover a,
        .${blockId}.eb-product-details-wrapper .woocommerce-tabs ul.tabs li:hover a {
            ${tabTitleHvColor ? `color: ${tabTitleHvColor};` : ""}
		}
        html body.woocommerce .${blockId}.eb-product-details-wrapper .woocommerce-tabs ul.tabs li.active,
        .${blockId}.eb-product-details-wrapper .woocommerce-tabs ul.tabs li.active{
            ${tabTitleActiveBGColor ? `background-color: ${tabTitleActiveBGColor};` : ""}
		}
        html body.woocommerce .${blockId}.eb-product-details-wrapper .woocommerce-tabs ul.tabs li.active:hover a,
        .${blockId}.eb-product-details-wrapper .woocommerce-tabs ul.tabs li.active:hover a {
            ${tabTitleActiveHvBGColor ? `background-color: ${tabTitleActiveHvBGColor};` : ""}
		}
        html body.woocommerce .${blockId}.eb-product-details-wrapper .woocommerce-tabs ul.tabs li.active a,
        .${blockId}.eb-product-details-wrapper .woocommerce-tabs ul.tabs li.active a {
            ${tabTitleActiveColor ? `color: ${tabTitleActiveColor};` : ""}
		}
        html body.woocommerce .${blockId}.eb-product-details-wrapper .woocommerce-tabs ul.tabs li.active:hover a,
        .${blockId}.eb-product-details-wrapper .woocommerce-tabs ul.tabs li.active:hover a {
            ${tabTitleActiveHvColor ? `color: ${tabTitleActiveHvColor};` : ""}
		}
        html body.woocommerce .${blockId}.eb-product-details-wrapper .woocommerce-tabs .panel,
        .${blockId}.eb-product-details-wrapper .woocommerce-tabs .panel {
            ${tabContentColor ? `color: ${tabContentColor};` : ""}
            ${tabContentTypoStylesDesktop}
            ${tabContentMarginDesktop}
            ${tabContentPaddingDesktop}
            ${tabContentBDShadowDesktop}
		}
        html body.woocommerce .${blockId}.eb-product-details-wrapper .woocommerce-tabs .panel:hover,
        .${blockId}.eb-product-details-wrapper .woocommerce-tabs .panel:hover {
            ${tabContentBDShadowHoverDesktop}
		}

        .${blockId}.eb-product-details-wrapper .eb-wc-tabs-editor .description_tab{
            display: ${showDescriptionTab ? `inline-block` : "none"};
        }
        .${blockId}.eb-product-details-wrapper .eb-wc-tabs-editor .additional_information_tab{
            display: ${showAdditionalTab ? `inline-block` : "none"};
        }
        .${blockId}.eb-product-details-wrapper .eb-wc-tabs-editor .reviews_tab {
            display: ${showReviewsTab ? `inline-block` : "none"};
        }

	`;

    // ALL TAB Styles
    // tab Wrapper
    const tabWrapper = `
		.${blockId}.eb-product-details-wrapper {
			${wrapperMarginTab}
			${wrapperPaddingTab}
			${wrapperBDShadowTab}
			${wrapperBackgroundStylesTab}
		}
        .${blockId}.eb-product-details-wrapper:hover {
			${wrapperBDShadowHoverTab}
            ${wrapperHoverBackgroundStylesTab}
		}
        .${blockId}.eb-product-details-wrapper:before{
			${wrapperOverlayStylesTab}
		}
		.${blockId}.eb-product-details-wrapper:hover:before{
			${wrapperHoverOverlayStylesTab}
		}

        html body.woocommerce .${blockId}.eb-product-details-wrapper .woocommerce-tabs ul.tabs li,
        .${blockId}.eb-product-details-wrapper .woocommerce-tabs ul.tabs li {
            ${tabTitlePaddingTab}
            ${tabTitleMarginTab}
            ${tabTitleBDShadowTab}
		}
        html body.woocommerce .${blockId}.eb-product-details-wrapper .woocommerce-tabs ul.tabs li:hover,
        .${blockId}.eb-product-details-wrapper .woocommerce-tabs ul.tabs li:hover {
            ${tabTitleBDShadowHoverTab}
		}
        html body.woocommerce .${blockId}.eb-product-details-wrapper .woocommerce-tabs ul.tabs li a,
        .${blockId}.eb-product-details-wrapper .woocommerce-tabs ul.tabs li a {
			${tabTitleTypoStylesTab}
		}
        html body.woocommerce .${blockId}.eb-product-details-wrapper .woocommerce-tabs .panel,
        .${blockId}.eb-product-details-wrapper .woocommerce-tabs .panel {
            ${tabContentTypoStylesTab}
            ${tabContentMarginTab}
            ${tabContentPaddingTab}
            ${tabContentBDShadowTab}
		}
        html body.woocommerce .${blockId}.eb-product-details-wrapper .woocommerce-tabs .panel:hover,
        .${blockId}.eb-product-details-wrapper .woocommerce-tabs .panel:hover {
            ${tabContentBDShadowHoverTab}
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

        .${blockId}.eb-product-details-wrapper:before{
			${wrapperOverlayStylesMobile}
		}
		.${blockId}.eb-product-details-wrapper:hover:before{
			${wrapperHoverOverlayStylesMobile}
		}

        html body.woocommerce .${blockId}.eb-product-details-wrapper .woocommerce-tabs ul.tabs li,
        .${blockId}.eb-product-details-wrapper .woocommerce-tabs ul.tabs li {
            ${tabTitlePaddingMobile}
            ${tabTitleMarginMobile}
            ${tabTitleBDShadowMobile}
		}
        html body.woocommerce .${blockId}.eb-product-details-wrapper .woocommerce-tabs ul.tabs li:hover,
        .${blockId}.eb-product-details-wrapper .woocommerce-tabs ul.tabs li:hover {
            ${tabTitleBDShadowHoverMobile}
		}
        html body.woocommerce .${blockId}.eb-product-details-wrapper .woocommerce-tabs ul.tabs li a,
        .${blockId}.eb-product-details-wrapper .woocommerce-tabs ul.tabs li a {
			${tabTitleTypoStylesMobile}
		}
        html body.woocommerce .${blockId}.eb-product-details-wrapper .woocommerce-tabs .panel,
        .${blockId}.eb-product-details-wrapper .woocommerce-tabs .panel {
            ${tabContentTypoStylesMobile}
            ${tabContentMarginMobile}
            ${tabContentPaddingMobile}
            ${tabContentBDShadowMobile}
		}
        html body.woocommerce .${blockId}.eb-product-details-wrapper .woocommerce-tabs .panel:hover,
        .${blockId}.eb-product-details-wrapper .woocommerce-tabs .panel:hover {
            ${tabContentBDShadowHoverMobile}
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
