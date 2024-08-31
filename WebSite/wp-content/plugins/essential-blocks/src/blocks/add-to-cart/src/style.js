
import {
    WRAPPER_BG,
    WRAPPER_MARGIN,
    WRAPPER_PADDING,
    WRAPPER_BORDER_SHADOW,

    BUTTON_BORDER,
    BUTTON_PADDING,
    QUANTITY_BORDER,
    QUANTITY_PADDING,
    VARIABLE_FIELD_BORDER,
    VARIABLE_FIELD_PADDING,
} from "./constants/constants";
import {
    btnTypo,
    quantityTypo,
    variableLabelTypo,
    variableFieldTypo,
    groupedNameTypo,
    regularPriceTypo,
    salePriceTypo
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

        quantityColor,
        quantityBGColor,
        btnColor,
        btnBGColor,
        hoverBtnBGColor,
        hoverBtnColor,

        variableLabelColor,
        variableFieldColor,
        variableFieldBgColor,
        groupedNameColor,
        regularPriceColor,
        salePriceColor
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
        styesDesktop: btnShadowStyesDesktop,
        styesTab: btnShadowStyesTab,
        styesMobile: btnShadowStyesMobile,
        stylesHoverDesktop: btnShadowStylesHoverDesktop,
        stylesHoverTab: btnShadowStylesHoverTab,
        stylesHoverMobile: btnShadowStylesHoverMobile,
        transitionStyle: btnShadowTransitionStyle,
    } = generateBorderShadowStyles({
        controlName: BUTTON_BORDER,
        attributes,
    });
    const {
        dimensionStylesDesktop: buttonPaddingDesktop,
        dimensionStylesTab: buttonPaddingTab,
        dimensionStylesMobile: buttonPaddingMobile,
    } = generateDimensionsControlStyles({
        controlName: BUTTON_PADDING,
        styleFor: "padding",
        attributes,
    });
    const {
        typoStylesDesktop: btnTypoStylesDesktop,
        typoStylesTab: btnTypoStylesTab,
        typoStylesMobile: btnTypoStylesMobile,
    } = generateTypographyStyles({
        attributes,
        prefixConstant: btnTypo,
    });

    const {
        styesDesktop: quantityShadowStyesDesktop,
        styesTab: quantityShadowStyesTab,
        styesMobile: quantityShadowStyesMobile,
        stylesHoverDesktop: quantityShadowStylesHoverDesktop,
        stylesHoverTab: quantityShadowStylesHoverTab,
        stylesHoverMobile: quantityShadowStylesHoverMobile,
        transitionStyle: quantityShadowTransitionStyle,
    } = generateBorderShadowStyles({
        controlName: QUANTITY_BORDER,
        attributes,
    });
    const {
        dimensionStylesDesktop: quantityPaddingDesktop,
        dimensionStylesTab: quantityPaddingTab,
        dimensionStylesMobile: quantityPaddingMobile,
    } = generateDimensionsControlStyles({
        controlName: QUANTITY_PADDING,
        styleFor: "padding",
        attributes,
    });
    const {
        typoStylesDesktop: quantityTypoStylesDesktop,
        typoStylesTab: quantityTypoStylesTab,
        typoStylesMobile: quantityTypoStylesMobile,
    } = generateTypographyStyles({
        attributes,
        prefixConstant: quantityTypo,
    });

    const {
        typoStylesDesktop: variableLabelTypoStylesDesktop,
        typoStylesTab: variableLabelTypoStylesTab,
        typoStylesMobile: variableLabelTypoStylesMobile,
    } = generateTypographyStyles({
        attributes,
        prefixConstant: variableLabelTypo,
    });
    const {
        typoStylesDesktop: variableFieldStylesDesktop,
        typoStylesTab: variableFieldStylesTab,
        typoStylesMobile: variableFieldStylesMobile,
    } = generateTypographyStyles({
        attributes,
        prefixConstant: variableFieldTypo,
    });
    const {
        typoStylesDesktop: groupedNameTypoStylesDesktop,
        typoStylesTab: groupedNameTypoStylesTab,
        typoStylesMobile: groupedNameTypoStylesMobile,
    } = generateTypographyStyles({
        attributes,
        prefixConstant: groupedNameTypo,
    });
    const {
        typoStylesDesktop: regularPriceTypoStylesDesktop,
        typoStylesTab: regularPriceTypoStylesTab,
        typoStylesMobile: regularPriceTypoStylesMobile,
    } = generateTypographyStyles({
        attributes,
        prefixConstant: regularPriceTypo,
    });
    const {
        typoStylesDesktop: salePriceTypoStylesDesktop,
        typoStylesTab: salePriceTypoStylesTab,
        typoStylesMobile: salePriceTypoStylesMobile,
    } = generateTypographyStyles({
        attributes,
        prefixConstant: salePriceTypo,
    });

    const {
        dimensionStylesDesktop: variableFieldPaddingDesktop,
        dimensionStylesTab: variableFieldPaddingTab,
        dimensionStylesMobile: variableFieldPaddingMobile,
    } = generateDimensionsControlStyles({
        controlName: VARIABLE_FIELD_PADDING,
        styleFor: "padding",
        attributes,
    });
    const {
        styesDesktop: variableFieldShadowStyesDesktop,
        styesTab: variableFieldShadowStyesTab,
        styesMobile: variableFieldShadowStyesMobile,
        stylesHoverDesktop: variableFieldShadowStylesHoverDesktop,
        stylesHoverTab: variableFieldShadowStylesHoverTab,
        stylesHoverMobile: variableFieldShadowStylesHoverMobile,
        transitionStyle: variableFieldShadowTransitionStyle,
    } = generateBorderShadowStyles({
        controlName: VARIABLE_FIELD_BORDER,
        attributes,
    });

    // all desktop styls start
    // Desktop Wrapper
    const desktopWrapper = `
		.${blockId}.eb-add-to-cart-wrapper {
			${wrapperMarginDesktop}
			${wrapperPaddingDesktop}
			${wrapperBDShadowDesktop}
			${wrapperBackgroundStylesDesktop}
			transition:${wrapperBgTransitionStyle}, ${wrapperBDShadowTransition};
		}
        .${blockId}.eb-add-to-cart-wrapper:hover {
			${wrapperHoverBackgroundStylesDesktop}
			${wrapperBDShadowHoverDesktop}
		}
        .${blockId}.eb-add-to-cart-wrapper:before{
			${wrapperOverlayStylesDesktop}
			transition:${wrapperOvlTransitionStyle};
		}

		.${blockId}.eb-add-to-cart-wrapper:hover:before{
			${wrapperHoverOverlayStylesDesktop}
		}

        .${blockId}.eb-add-to-cart-wrapper .quantity .qty,
        .${blockId}.eb-add-to-cart-wrapper .eb-quantity input{
			${quantityTypoStylesDesktop}
            color: ${quantityColor};
            background-color: ${quantityBGColor};
            ${quantityPaddingDesktop}
            ${quantityShadowStyesDesktop}
            transition: ${quantityShadowTransitionStyle};
		}

        .${blockId}.eb-add-to-cart-wrapper .quantity .qty:hover,
        .${blockId}.eb-add-to-cart-wrapper .eb-quantity input:hover{
			${quantityShadowStylesHoverDesktop}
		}
        .${blockId}.eb-add-to-cart-wrapper .single_add_to_cart_button,
        .${blockId}.eb-add-to-cart-wrapper .eb-cart-btn{
			${btnTypoStylesDesktop}
            color: ${btnColor};
            background-color: ${btnBGColor};
            ${buttonPaddingDesktop}
            ${btnShadowStyesDesktop}
            transition: ${btnShadowTransitionStyle};
		}
        .${blockId}.eb-add-to-cart-wrapper .single_add_to_cart_button:hover,
        .${blockId}.eb-add-to-cart-wrapper .eb-cart-btn:hover {
            color: ${hoverBtnColor};
            background-color: ${hoverBtnBGColor};
            ${btnShadowStylesHoverDesktop}
		}


        .${blockId}.eb-add-to-cart-wrapper table.variations th.label {
            ${variableLabelTypoStylesDesktop}
            color: ${variableLabelColor};
		}
        .${blockId}.eb-add-to-cart-wrapper table.variations td select {
            ${variableFieldStylesDesktop}
            color: ${variableFieldColor};
            background-color: ${variableFieldBgColor};
            ${variableFieldPaddingDesktop}
            ${variableFieldShadowStyesDesktop}
            transition: ${variableFieldShadowTransitionStyle};
		}
        .${blockId}.eb-add-to-cart-wrapper table.variations td select:hover {
            ${variableFieldShadowStylesHoverDesktop}
		}

        .${blockId}.eb-add-to-cart-wrapper table.group_table label a {
            ${groupedNameTypoStylesDesktop}
            color: ${groupedNameColor};
		}

        .${blockId}.eb-add-to-cart-wrapper table.group_table td > .amount,
        .${blockId}.eb-add-to-cart-wrapper table.group_table td > del {
            ${regularPriceTypoStylesDesktop}
            color: ${regularPriceColor};
		}
        .${blockId}.eb-add-to-cart-wrapper table.group_table td ins {
            ${salePriceTypoStylesDesktop}
            color: ${salePriceColor};
		}
	`;

    // ALL TAB Styles
    // tab Wrapper
    const tabWrapper = `
		.${blockId}.eb-add-to-cart-wrapper {
			${wrapperMarginTab}
			${wrapperPaddingTab}
			${wrapperBDShadowTab}
			${wrapperBackgroundStylesTab}
		}
        .${blockId}.eb-add-to-cart-wrapper:hover {
			${wrapperBDShadowHoverTab}
            ${wrapperHoverBackgroundStylesTab}
		}
        .${blockId}.eb-add-to-cart-wrapper:before{
			${wrapperOverlayStylesTab}
		}
		.${blockId}.eb-add-to-cart-wrapper:hover:before{
			${wrapperHoverOverlayStylesTab}
		}

        .${blockId}.eb-add-to-cart-wrapper .quantity .qty,
        .${blockId}.eb-add-to-cart-wrapper .eb-quantity input{
			${quantityTypoStylesTab}
            ${quantityPaddingTab}
            ${quantityShadowStyesTab}
		}
        .${blockId}.eb-add-to-cart-wrapper .quantity .qty:hover,
        .${blockId}.eb-add-to-cart-wrapper .eb-quantity input:hover{
			${quantityShadowStylesHoverTab}
		}
        .${blockId}.eb-add-to-cart-wrapper .single_add_to_cart_button,
        .${blockId}.eb-add-to-cart-wrapper .eb-cart-btn{
			${btnTypoStylesTab}
            ${buttonPaddingTab}
            ${btnShadowStyesTab}
		}

        .${blockId}.eb-add-to-cart-wrapper .single_add_to_cart_button:hover,
        .${blockId}.eb-add-to-cart-wrapper .eb-cart-btn:hover {
            ${btnShadowStylesHoverTab}
		}

        .${blockId}.eb-add-to-cart-wrapper table.variations th.label {
            ${variableLabelTypoStylesTab}
		}
        .${blockId}.eb-add-to-cart-wrapper table.variations td select {
            ${variableFieldStylesTab}
            ${variableFieldPaddingTab}
            ${variableFieldShadowStyesTab}
		}
        .${blockId}.eb-add-to-cart-wrapper table.variations td select:hover {
            ${variableFieldShadowStylesHoverTab}
		}

        .${blockId}.eb-add-to-cart-wrapper table.group_table label a {
            ${groupedNameTypoStylesTab}
		}

        .${blockId}.eb-add-to-cart-wrapper table.group_table td > .amount,
        .${blockId}.eb-add-to-cart-wrapper table.group_table td > del {
            ${regularPriceTypoStylesTab}
		}
        .${blockId}.eb-add-to-cart-wrapper table.group_table td ins {
            ${salePriceTypoStylesTab}
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

        .${blockId}.eb-add-to-cart-wrapper:before{
			${wrapperOverlayStylesMobile}
		}
		.${blockId}.eb-add-to-cart-wrapper:hover:before{
			${wrapperHoverOverlayStylesMobile}
		}

        .${blockId}.eb-add-to-cart-wrapper .quantity .qty,
        .${blockId}.eb-add-to-cart-wrapper .eb-quantity input{
			${quantityTypoStylesMobile}
            ${quantityPaddingMobile}
            ${quantityShadowStyesMobile}
		}
        .${blockId}.eb-add-to-cart-wrapper .quantity .qty:hover,
        .${blockId}.eb-add-to-cart-wrapper .eb-quantity input:hover{
			${quantityShadowStylesHoverMobile}
		}
        .${blockId}.eb-add-to-cart-wrapper .single_add_to_cart_button,
        .${blockId}.eb-add-to-cart-wrapper .eb-cart-btn{
			${btnTypoStylesMobile}
            ${buttonPaddingMobile}
            ${btnShadowStyesMobile}
		}
        .${blockId}.eb-add-to-cart-wrapper .single_add_to_cart_button:hover,
        .${blockId}.eb-add-to-cart-wrapper .eb-cart-btn:hover {
            ${btnShadowStylesHoverMobile}
		}

        .${blockId}.eb-add-to-cart-wrapper table.variations th.label {
            ${variableLabelTypoStylesMobile}
		}
        .${blockId}.eb-add-to-cart-wrapper table.variations td select {
            ${variableFieldStylesMobile}
            ${variableFieldPaddingMobile}
            ${variableFieldShadowStyesMobile}
		}
        .${blockId}.eb-add-to-cart-wrapper table.variations td select:hover {
            ${variableFieldShadowStylesHoverMobile}
		}

        .${blockId}.eb-add-to-cart-wrapper table.group_table label a {
            ${groupedNameTypoStylesMobile}
		}

        .${blockId}.eb-add-to-cart-wrapper table.group_table td > .amount,
        .${blockId}.eb-add-to-cart-wrapper table.group_table td > del {
            ${regularPriceTypoStylesMobile}
		}
        .${blockId}.eb-add-to-cart-wrapper table.group_table td ins {
            ${salePriceTypoStylesMobile}
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
