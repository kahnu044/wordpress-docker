
import {
    WRAPPER_BG,
    WRAPPER_MARGIN,
    WRAPPER_PADDING,
    WRAPPER_BORDER_SHADOW,
    TAXONOMIES_BORDER_SHADOW,
    TAXONOMIES_GAP,
    TAXONOMIES_MARGIN,
    TAXONOMIES_PADDING,
    PREFIX_ICON_SIZE,
    SUFFIX_ICON_SIZE
} from "./constants/constants";
import {
    TAXONOMIES_TYPOGRAPHY,
    PREFIX_TYPO,
    SUFFIX_TYPO
} from "./constants/typographyPrefixConstants";

/**
 * External depencencies
 */
import {
    softMinifyCssStrings,
    generateTypographyStyles,
    generateResponsiveRangeStyles,
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
        iconAlign,
        taxonomiesBgColor,
        taxonomiesTextColor,
        taxonomiesHoverBgColor,
        taxonomiesHoverTextColor,
        align,
        prefixColor,
        suffixColor,
        displayStyle,
        separatorColor
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
        styesDesktop: taxonomiesBDShadowDesktop,
        styesTab: taxonomiesBDShadowTab,
        styesMobile: taxonomiesBDShadowMobile,
        stylesHoverDesktop: taxonomiesBDShadowHoverDesktop,
        stylesHoverTab: taxonomiesBDShadowHoverTab,
        stylesHoverMobile: taxonomiesBDShadowHoverMobile,
        transitionStyle: taxonomiesBDShadowTransition,
    } = generateBorderShadowStyles({
        controlName: TAXONOMIES_BORDER_SHADOW,
        attributes,
    });

    // icon size
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

    const {
        rangeStylesDesktop: taxonomiesGapDesktop,
        rangeStylesTab: taxonomiesGapTab,
        rangeStylesMobile: taxonomiesGapMobile,
    } = generateResponsiveRangeStyles({
        controlName: TAXONOMIES_GAP,
        property: "gap",
        attributes,
    });

    const {
        rangeStylesDesktop: taxonomiesItemGapDesktop,
        rangeStylesTab: taxonomiesItemGapTab,
        rangeStylesMobile: taxonomiesItemGapMobile,
    } = generateResponsiveRangeStyles({
        controlName: TAXONOMIES_GAP,
        property: "margin-bottom",
        attributes,
    });

    const {
        dimensionStylesDesktop: taxonomiesMarginDesktop,
        dimensionStylesTab: taxonomiesMarginTab,
        dimensionStylesMobile: taxonomiesMarginMobile,
    } = generateDimensionsControlStyles({
        controlName: TAXONOMIES_MARGIN,
        styleFor: "margin",
        attributes,
    });

    const {
        dimensionStylesDesktop: taxonomiesPaddingDesktop,
        dimensionStylesTab: taxonomiesPaddingTab,
        dimensionStylesMobile: taxonomiesPaddingMobile,
    } = generateDimensionsControlStyles({
        controlName: TAXONOMIES_PADDING,
        styleFor: "padding",
        attributes,
    });

    // CSS/styling Codes Starts from Here

    const {
        typoStylesDesktop: taxonomiesTypoStylesDesktop,
        typoStylesTab: taxonomiesTypoStylesTab,
        typoStylesMobile: taxonomiesTypoStylesMobile,
    } = generateTypographyStyles({
        attributes,
        prefixConstant: TAXONOMIES_TYPOGRAPHY,
        defaultFontSize: 16,
    });

    const {
        typoStylesDesktop: prefixTypoStylesDesktop,
        typoStylesTab: prefixTypoStylesTab,
        typoStylesMobile: prefixTypoStylesMobile,
    } = generateTypographyStyles({
        attributes,
        prefixConstant: PREFIX_TYPO,
        defaultFontSize: 16,
    });
    const {
        typoStylesDesktop: suffixTypoStylesDesktop,
        typoStylesTab: suffixTypoStylesTab,
        typoStylesMobile: suffixTypoStylesMobile,
    } = generateTypographyStyles({
        attributes,
        prefixConstant: SUFFIX_TYPO,
        defaultFontSize: 16,
    });

    let wrapAlign =
        align === 'flex-start' ? 'left' :
            align === 'flex-end' ? 'right' :
                align === 'center' ? 'center' : '';

    // all desktop styls start
    // Desktop Wrapper
    const desktopWrapper = `
		.${blockId}.eb-taxonomies-wrapper {
            text-align: ${iconAlign};
			${wrapperMarginDesktop}
			${wrapperPaddingDesktop}
			${wrapperBDShadowDesktop}
			${wrapperBackgroundStylesDesktop}
			transition:${wrapperBgTransitionStyle}, ${wrapperBDShadowTransition};

            ${displayStyle == 'display-block' ? `
            text-align: ${wrapAlign};
            ` : `
            justify-content: ${align};
            ${taxonomiesGapDesktop}
            `
        }
        }
        ${displayStyle == 'display-block' ? `
            .${blockId}.eb-taxonomies-wrapper > div:not(:last-child){
                ${taxonomiesItemGapDesktop}
            }
        `: ''
        }

		.${blockId}.eb-taxonomies-wrapper:hover {
			${wrapperHoverBackgroundStylesDesktop}
			${wrapperBDShadowHoverDesktop}
		}
	`;

    const desktopTaxonomies = `
        .${blockId}.eb-taxonomies-wrapper .eb-tax-wrap{
            ${taxonomiesGapDesktop}
            justify-content: ${align};
        }
        .${blockId}.eb-taxonomies-wrapper .eb-tax-item a{
            color: ${taxonomiesTextColor};
            background-color: ${taxonomiesBgColor};
            ${taxonomiesPaddingDesktop}
            ${taxonomiesMarginDesktop}
            ${taxonomiesBDShadowDesktop}
            transition: ${taxonomiesBDShadowTransition};
            ${taxonomiesTypoStylesDesktop}

        }
        .${blockId}.eb-taxonomies-wrapper .eb-tax-item a:hover{
            color: ${taxonomiesHoverTextColor};
            background-color: ${taxonomiesHoverBgColor};
            ${taxonomiesBDShadowHoverDesktop}
        }

        .${blockId}.eb-taxonomies-wrapper .prefix-wrap *:not(i){
            color: ${prefixColor};
            ${prefixTypoStylesDesktop}
        }

        .${blockId}.eb-taxonomies-wrapper .prefix-wrap i {
            color: ${prefixColor};
            ${prefixIconSizeDesktop}
        }

        .${blockId}.eb-taxonomies-wrapper .suffix-wrap *:not(i){
            color: ${suffixColor};
            ${suffixTypoStylesDesktop}
        }

        .${blockId}.eb-taxonomies-wrapper .suffix-wrap i {
            color: ${suffixColor};
            ${suffixIconSizeDesktop}
        }
        .${blockId}.eb-taxonomies-wrapper .eb-tax-separator{
            color: ${separatorColor};
        }
    `;

    // ALL TAB Styles
    // tab Wrapper
    const tabWrapper = `
		.${blockId}.eb-taxonomies-wrapper{
			${wrapperMarginTab}
			${wrapperPaddingTab}
			${wrapperBDShadowTab}
			${wrapperBackgroundStylesTab}

            ${displayStyle == 'display-block' ? `` : `
                ${taxonomiesGapTab}
                `
        }
        }
        ${displayStyle == 'display-block' ? `
            .${blockId}.eb-taxonomies-wrapper > div:not(:last-child){
                ${taxonomiesItemGapTab}
            }
        `: ''
        }

		.${blockId}.eb-taxonomies-wrapper:hover {
			${wrapperHoverBackgroundStylesTab}
			${wrapperBDShadowHoverTab}
		}
	`;

    const tabTaxonomies = `
        .${blockId}.eb-taxonomies-wrapper .eb-tax-wrap{
            ${taxonomiesGapTab}
        }
        .${blockId}.eb-taxonomies-wrapper .eb-tax-item a{
            ${taxonomiesTypoStylesTab}
            ${taxonomiesPaddingTab}
            ${taxonomiesMarginTab}
            ${taxonomiesBDShadowTab}
        }
        .${blockId}.eb-taxonomies-wrapper .eb-tax-item a:hover{
            ${taxonomiesBDShadowHoverTab}
        }
        .${blockId}.eb-taxonomies-wrapper .prefix-wrap *:not(i){
            ${prefixTypoStylesTab}
        }
        .${blockId}.eb-taxonomies-wrapper .prefix-wrap i {
            ${prefixIconSizeTab}
        }
        .${blockId}.eb-taxonomies-wrapper .suffix-wrap *:not(i){
            ${suffixTypoStylesTab}
        }
        .${blockId}.eb-taxonomies-wrapper .suffix-wrap i {
            ${suffixIconSizeTab}
        }
    `;

    // ALL MOBILE Styles
    // mobile Wrapper
    const mobileWrapper = `
		.${blockId}.eb-taxonomies-wrapper {
			${wrapperMarginMobile}
			${wrapperPaddingMobile}
			${wrapperBDShadowMobile}
			${wrapperBackgroundStylesMobile}
            ${displayStyle == 'display-block' ? `` : `
                ${taxonomiesGapMobile}
                `
        }
        }
        ${displayStyle == 'display-block' ? `
            .${blockId}.eb-taxonomies-wrapper > div:not(:last-child){
                ${taxonomiesItemGapMobile}
            }
        `: ''
        }
		.${blockId}.eb-taxonomies-wrapper:hover {
			${wrapperHoverBackgroundStylesMobile}
			${wrapperBDShadowHoverMobile}
		}
	`;

    const mobileTaxonomies = `
        .${blockId}.eb-taxonomies-wrapper .eb-tax-wrap{
            ${taxonomiesGapMobile}
        }
        .${blockId}.eb-taxonomies-wrapper .eb-tax-item a{
            ${taxonomiesTypoStylesMobile}
            ${taxonomiesPaddingMobile}
            ${taxonomiesMarginMobile}
            ${taxonomiesBDShadowMobile}
        }
        .${blockId}.eb-taxonomies-wrapper .eb-tax-item a:hover{
            ${taxonomiesBDShadowHoverMobile}
        }
        .${blockId}.eb-taxonomies-wrapper .prefix-wrap *:not(i){
            ${prefixTypoStylesMobile}
        }
        .${blockId}.eb-taxonomies-wrapper .prefix-wrap i {
            ${prefixIconSizeMobile}
        }
        .${blockId}.eb-taxonomies-wrapper .suffix-wrap *:not(i){
            ${suffixTypoStylesMobile}
        }
        .${blockId}.eb-taxonomies-wrapper .suffix-wrap i {
            ${suffixIconSizeMobile}
        }
    `;

    // all css styles for large screen width (desktop/laptop) in strings ⬇
    // all desktop
    const desktopAllStyles = softMinifyCssStrings(`
		${desktopWrapper}
        ${desktopTaxonomies}
	`);

    // all css styles for Tab in strings ⬇
    const tabAllStyles = softMinifyCssStrings(`
		${tabWrapper}
        ${tabTaxonomies}
	`);

    // all css styles for Mobile in strings ⬇
    const mobileAllStyles = softMinifyCssStrings(`
		${mobileWrapper}
        ${mobileTaxonomies}
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
