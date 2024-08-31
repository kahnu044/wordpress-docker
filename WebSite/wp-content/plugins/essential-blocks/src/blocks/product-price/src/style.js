
import {
    WRAPPER_BG,
    WRAPPER_MARGIN,
    WRAPPER_PADDING,
    WRAPPER_BORDER_SHADOW,
    PREFIX_ICON_SIZE,
    SUFFIX_ICON_SIZE
} from "./constants/constants";

import {
    typoPrefix_original_price,
    typoPrefix_saleprice,
    PREFIX_TYPO,
    SUFFIX_TYPO
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
        priceTextColor,
        priceTextBGColor,
        priceAlignment,
        salePriceTextColor,
        salePriceTextBGColor,
        prefixColor,
        prefixBGColor,
        suffixColor,
        suffixBGColor,
        currencyColor,
        currencySize,
        regularPriceCurrencyColor,
        salePriceCurrencyColor,
        regularPriceCurrencySize,
        salePriceCurrencySize,
        currencyAlign
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
        typoStylesDesktop: orginalPriceTypoStylesDesktop,
        typoStylesTab: orginalPriceTypoStylesTab,
        typoStylesMobile: orginalPriceTypoStylesMobile,
    } = generateTypographyStyles({
        attributes,
        prefixConstant: typoPrefix_original_price,
    });

    const {
        typoStylesDesktop: salePriceTypoStylesDesktop,
        typoStylesTab: salePriceTypoStylesTab,
        typoStylesMobile: salePriceTypoStylesMobile,
    } = generateTypographyStyles({
        attributes,
        prefixConstant: typoPrefix_saleprice,
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
        typoStylesDesktop: suffixTypoStylesDesktop,
        typoStylesTab: suffixTypoStylesTab,
        typoStylesMobile: suffixTypoStylesMobile,
    } = generateTypographyStyles({
        attributes,
        prefixConstant: SUFFIX_TYPO,
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
        rangeStylesDesktop: suffixIconSizeDesktop,
        rangeStylesTab: suffixIconSizeTab,
        rangeStylesMobile: suffixIconSizeMobile,
    } = generateResponsiveRangeStyles({
        controlName: SUFFIX_ICON_SIZE,
        property: "font-size",
        attributes,
    });

    // all desktop styls start
    // Desktop Wrapper
    const desktopWrapper = `
		.${blockId}.eb-product-price-wrapper {
			${wrapperMarginDesktop}
			${wrapperPaddingDesktop}
			${wrapperBDShadowDesktop}
			${wrapperBackgroundStylesDesktop}
			transition:${wrapperBgTransitionStyle}, ${wrapperBDShadowTransition};

            justify-content: ${priceAlignment};
		}
        .${blockId}.eb-product-price-wrapper:hover {
			${wrapperHoverBackgroundStylesDesktop}
			${wrapperBDShadowHoverDesktop}
		}
        .${blockId}.eb-product-price-wrapper:before{
			${wrapperOverlayStylesDesktop}
			transition:${wrapperOvlTransitionStyle};
		}

		.${blockId}.eb-product-price-wrapper:hover:before{
			${wrapperHoverOverlayStylesDesktop}
		}

        .${blockId}.eb-product-price-wrapper .eb-woo-product-price .woocommerce-Price-currencySymbol,
        .${blockId}.eb-product-price-wrapper .eb-woo-product-price .eb-product-price-currency {
            vertical-align: ${currencyAlign};
        }

        .${blockId}.eb-product-price-wrapper .eb-woo-product-price > .eb-product-price-regular,
        .${blockId}.eb-product-price-wrapper .eb-woo-product-price > .amount,
        .${blockId}.eb-product-price-wrapper .eb-woo-product-price > del{
            ${priceTextColor ? `color: ${priceTextColor};` : ""}
            ${priceTextBGColor ? `background-color: ${priceTextBGColor};` : ""}
            ${orginalPriceTypoStylesDesktop}
        }

        .${blockId}.eb-product-price-wrapper .eb-woo-product-price > .eb-product-price-regular .eb-product-price-currency,
        .${blockId}.eb-product-price-wrapper .eb-woo-product-price > del .woocommerce-Price-currencySymbol,
        .${blockId}.eb-product-price-wrapper .eb-woo-product-price > .amount > .woocommerce-Price-currencySymbol{
            ${regularPriceCurrencyColor ? `color: ${regularPriceCurrencyColor};` : `color: ${currencyColor};`}
            ${regularPriceCurrencySize ? `font-size: ${regularPriceCurrencySize}px;` : `font-size: ${currencySize}px;`}
        }

        .${blockId}.eb-product-price-wrapper .eb-woo-product-price ins,
        .${blockId}.eb-product-price-wrapper .eb-woo-product-price .eb-product-price-sale {
            ${salePriceTextColor ? `color: ${salePriceTextColor};` : ""}
            ${salePriceTextBGColor ? `background-color: ${salePriceTextBGColor};` : ""}
            ${salePriceTypoStylesDesktop}
        }

        .${blockId}.eb-product-price-wrapper .eb-woo-product-price ins .woocommerce-Price-currencySymbol,
        .${blockId}.eb-product-price-wrapper .eb-woo-product-price .eb-product-price-sale .eb-product-price-currency {
            ${salePriceCurrencyColor ? `color: ${salePriceCurrencyColor};` : `color: ${currencyColor};`}
            ${salePriceCurrencySize ? `font-size: ${salePriceCurrencySize}px;` : `font-size: ${currencySize}px;`}
        }

        .${blockId}.eb-product-price-wrapper .prefix-wrap *:not(i){
            color: ${prefixColor};
            background-color: ${prefixBGColor};
            ${prefixTypoStylesDesktop}
        }

        .${blockId}.eb-product-price-wrapper .prefix-wrap i {
            color: ${prefixColor};
            background-color: ${prefixBGColor};
            ${prefixIconSizeDesktop}
        }

        .${blockId}.eb-product-price-wrapper .suffix-wrap *:not(i){
            color: ${suffixColor};
            background-color: ${suffixBGColor};
            ${suffixTypoStylesDesktop}
        }

        .${blockId}.eb-product-price-wrapper .suffix-wrap i {
            color: ${suffixColor};
            background-color: ${suffixBGColor};
            ${suffixIconSizeDesktop}
        }

	`;

    // ALL TAB Styles
    // tab Wrapper
    const tabWrapper = `
		.${blockId}.eb-product-price-wrapper {
			${wrapperMarginTab}
			${wrapperPaddingTab}
			${wrapperBDShadowTab}
			${wrapperBackgroundStylesTab}
		}
        .${blockId}.eb-product-price-wrapper:hover {
			${wrapperBDShadowHoverTab}
            ${wrapperHoverBackgroundStylesTab}
		}
        .${blockId}.eb-product-price-wrapper:before{
			${wrapperOverlayStylesTab}
		}
		.${blockId}.eb-product-price-wrapper:hover:before{
			${wrapperHoverOverlayStylesTab}
		}

        .${blockId}.eb-product-price-wrapper .eb-woo-product-price > .eb-product-price-regular,
        .${blockId}.eb-product-price-wrapper .eb-woo-product-price > .amount,
        .${blockId}.eb-product-price-wrapper .eb-woo-product-price > del{
            ${orginalPriceTypoStylesTab}
        }

        .${blockId}.eb-product-price-wrapper .eb-woo-product-price ins,
        .${blockId}.eb-product-price-wrapper .eb-woo-product-price .eb-product-price-sale {
            ${salePriceTypoStylesTab}
        }

        .${blockId}.eb-product-price-wrapper .prefix-wrap *:not(i){
            ${prefixTypoStylesTab}
        }

        .${blockId}.eb-product-price-wrapper .prefix-wrap i {
            ${prefixIconSizeTab}
        }

        .${blockId}.eb-product-price-wrapper .suffix-wrap *:not(i){
            ${suffixTypoStylesTab}
        }

        .${blockId}.eb-product-price-wrapper .suffix-wrap i {
            ${suffixIconSizeTab}
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

        .${blockId}.eb-product-price-wrapper:before{
			${wrapperOverlayStylesMobile}
		}
		.${blockId}.eb-product-price-wrapper:hover:before{
			${wrapperHoverOverlayStylesMobile}
		}

        .${blockId}.eb-product-price-wrapper .eb-woo-product-price > .eb-product-price-regular,
        .${blockId}.eb-product-price-wrapper .eb-woo-product-price > .amount,
        .${blockId}.eb-product-price-wrapper .eb-woo-product-price > del{
            ${orginalPriceTypoStylesMobile}
        }

        .${blockId}.eb-product-price-wrapper .eb-woo-product-price ins,
        .${blockId}.eb-product-price-wrapper .eb-woo-product-price .eb-product-price-sale {
            ${salePriceTypoStylesMobile}
        }
        .${blockId}.eb-product-price-wrapper .prefix-wrap *:not(i){
            ${prefixTypoStylesMobile}
        }
        .${blockId}.eb-product-price-wrapper .prefix-wrap i {
            ${prefixIconSizeMobile}
        }
        .${blockId}.eb-product-price-wrapper .suffix-wrap *:not(i){
            ${suffixTypoStylesMobile}
        }
        .${blockId}.eb-product-price-wrapper .suffix-wrap i {
            ${suffixIconSizeMobile}
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
