
import {
    WRAPPER_BG,
    WRAPPER_MARGIN,
    WRAPPER_PADDING,
    WRAPPER_BORDER_SHADOW,
    RATING_SIZE,
    RATING_GAP,
    COUNT_GAP,
} from "./constants/constants";
import {
    typoRating,
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
        ratingTextColor,
        ratingColor,
        displayType,
        alignment,
        ratedRatingColor
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
        typoStylesDesktop: ratingTypoStylesDesktop,
        typoStylesTab: ratingTypoStylesTab,
        typoStylesMobile: ratingTypoStylesMobile,
    } = generateTypographyStyles({
        attributes,
        prefixConstant: typoRating,
    });

    const {
        rangeStylesDesktop: ratingSizeDesktop,
        rangeStylesTab: ratingSizeTab,
        rangeStylesMobile: ratingSizeMobile,
    } = generateResponsiveRangeStyles({
        controlName: RATING_SIZE,
        property: "font-size",
        attributes,
    });
    const {
        rangeStylesDesktop: ratingGapDesktop,
        rangeStylesTab: ratingGapTab,
        rangeStylesMobile: ratingGapMobile,
    } = generateResponsiveRangeStyles({
        controlName: RATING_GAP,
        property: "gap",
        attributes,
    });
    const {
        rangeStylesDesktop: countGapDesktop,
        rangeStylesTab: countGapTab,
        rangeStylesMobile: countGapMobile,
    } = generateResponsiveRangeStyles({
        controlName: COUNT_GAP,
        property: "gap",
        attributes,
    });

    // all desktop styls start
    // Desktop Wrapper
    const desktopWrapper = `
		.${blockId}.eb-product-rating-wrapper {
			${wrapperMarginDesktop}
			${wrapperPaddingDesktop}
			${wrapperBDShadowDesktop}
			${wrapperBackgroundStylesDesktop}
			transition:${wrapperBgTransitionStyle}, ${wrapperBDShadowTransition};
			${countGapDesktop}
            flex-direction: ${displayType};
            ${(displayType === 'column' || displayType === 'column-reverse') ? `align-items: ${alignment};` : `justify-content: ${alignment};`}
		}
        .${blockId}.eb-product-rating-wrapper:hover {
			${wrapperHoverBackgroundStylesDesktop}
			${wrapperBDShadowHoverDesktop}
		}
        .${blockId}.eb-product-rating-wrapper:before{
			${wrapperOverlayStylesDesktop}
			transition:${wrapperOvlTransitionStyle};
		}

		.${blockId}.eb-product-rating-wrapper:hover:before{
			${wrapperHoverOverlayStylesDesktop}
		}

        .${blockId}.eb-product-rating-wrapper .eb-woo-product-rating-wrapper{
			${ratingGapDesktop}
		}
        .${blockId}.eb-product-rating-wrapper .eb-woo-product-rating {
            ${ratingColor ? `color: ${ratingColor};` : ""}
            ${ratingSizeDesktop}
        }
        .${blockId}.eb-product-rating-wrapper .eb-woo-product-rating.filled {
            ${ratedRatingColor ? `color: ${ratedRatingColor};` : `color: ${ratingColor};`}
        }
        .${blockId}.eb-product-rating-wrapper .eb-product-rating-count{
            ${ratingTextColor ? `color: ${ratingTextColor};` : ""}
            ${ratingTypoStylesDesktop}
        }

	`;

    // ALL TAB Styles
    // tab Wrapper
    const tabWrapper = `
		.${blockId}.eb-product-rating-wrapper {
			${wrapperMarginTab}
			${wrapperPaddingTab}
			${wrapperBDShadowTab}
			${wrapperBackgroundStylesTab}
		}
        .${blockId}.eb-product-rating-wrapper:hover {
			${wrapperBDShadowHoverTab}
            ${wrapperHoverBackgroundStylesTab}
		}
        .${blockId}.eb-product-rating-wrapper:before{
			${wrapperOverlayStylesTab}
		}
		.${blockId}.eb-product-rating-wrapper:hover:before{
			${wrapperHoverOverlayStylesTab}
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

        .${blockId}.eb-product-rating-wrapper:before{
			${wrapperOverlayStylesMobile}
		}
		.${blockId}.eb-product-rating-wrapper:hover:before{
			${wrapperHoverOverlayStylesMobile}
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
