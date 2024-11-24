import {
    BUTTON_ONE_BACKGROUND,
    BUTTON_TWO_BACKGROUND,
    BUTTON_ONE_BORDER_SHADOW,
    BUTTON_TWO_BORDER_SHADOW,
    WRAPPER_MARGIN,
    BUTTONS_PADDING,
    BUTTONS_WIDTH,
    BUTTONS_GAP,
    BUTTONS_CONNECTOR_SIZE,
    BUTTONS_CONNECTOR_ICON_SIZE,
    BUTTON_ONE_KEYS,
    BUTTON_TWO_KEYS
} from "./constants/constants";
import {
    BUTTONS_TYPOGRAPHY,
    BUTTONS_CONNECTOR_TYPOGRAPHY,
} from "./constants/typographyPrefixConstants";

import {
    softMinifyCssStrings,
    generateTypographyStyles,
    generateDimensionsControlStyles,
    generateBorderShadowStyles,
    generateResponsiveRangeStyles,
    useBlockAttributes,
    StyleComponent,
    EBButton
 } from "@essential-blocks/controls";

export default function Style(props) {
    const {  setAttributes, name } = props;

    const attributes = useBlockAttributes();

    const {
        blockId,
        contentPosition,
        innerButtonColor,
        innerButtonTextColor,
        connectorType,
        buttonTextAlign,
        buttonsWidthType,
    } = attributes;

    //
    // CSS/styling Codes Starts from Here
    const {
        typoStylesDesktop: buttonsTypoStylesDesktop,
        typoStylesTab: buttonsTypoStylesTab,
        typoStylesMobile: buttonsTypoStylesMobile,
    } = generateTypographyStyles({
        attributes,
        prefixConstant: BUTTONS_TYPOGRAPHY,
    });

    const {
        typoStylesDesktop: connectorTypoStylesDesktop,
        typoStylesTab: connectorTypoStylesTab,
        typoStylesMobile: connectorTypoStylesMobile,
    } = generateTypographyStyles({
        attributes,
        prefixConstant: BUTTONS_CONNECTOR_TYPOGRAPHY,
    });

    const {
        dimensionStylesDesktop: wrapperMarginStylesDesktop,
        dimensionStylesTab: wrapperMarginStylesTab,
        dimensionStylesMobile: wrapperMarginStylesMobile,
    } = generateDimensionsControlStyles({
        controlName: WRAPPER_MARGIN,
        styleFor: "margin",
        attributes,
    });

    const {
        dimensionStylesDesktop: buttonsPaddingStylesDesktop,
        dimensionStylesTab: buttonsPaddingStylesTab,
        dimensionStylesMobile: buttonsPaddingStylesMobile,
    } = generateDimensionsControlStyles({
        controlName: BUTTONS_PADDING,
        styleFor: "padding",
        attributes,
    });

    // responsive range controller
    const {
        rangeStylesDesktop: buttonWidthStyleDesktop,
        rangeStylesTab: buttonWidthStyleTab,
        rangeStylesMobile: buttonWidthStyleMobile,
    } = generateResponsiveRangeStyles({
        controlName: BUTTONS_WIDTH,
        property: "width",
        attributes,
    });

    const {
        rangeStylesDesktop: buttonGapDesktop,
        rangeStylesTab: buttonGapTab,
        rangeStylesMobile: buttonGapMobile,
    } = generateResponsiveRangeStyles({
        controlName: BUTTONS_GAP,
        property: "margin",
        attributes,
    });

    const {
        rangeStylesDesktop: buttonConnectorHeightDesktop,
        rangeStylesTab: buttonConnectorHeightTab,
        rangeStylesMobile: buttonConnectorHeightMobile,
    } = generateResponsiveRangeStyles({
        controlName: BUTTONS_CONNECTOR_SIZE,
        property: "height",
        attributes,
    });

    const {
        rangeStylesDesktop: buttonConnectorWidthDesktop,
        rangeStylesTab: buttonConnectorWidthTab,
        rangeStylesMobile: buttonConnectorWidthMobile,
    } = generateResponsiveRangeStyles({
        controlName: BUTTONS_CONNECTOR_SIZE,
        property: "width",
        attributes,
    });

    const {
        rangeStylesDesktop: buttonConnectorLineHeightDesktop,
        rangeStylesTab: buttonConnectorLineHeightTab,
        rangeStylesMobile: buttonConnectorLineHeightMobile,
    } = generateResponsiveRangeStyles({
        controlName: BUTTONS_CONNECTOR_SIZE,
        property: "line-height",
        attributes,
    });

    const {
        rangeStylesDesktop: buttonConnectorIconSizeDesktop,
        rangeStylesTab: buttonConnectorIconSizeTab,
        rangeStylesMobile: buttonConnectorIconSizeMobile,
    } = generateResponsiveRangeStyles({
        controlName: BUTTONS_CONNECTOR_ICON_SIZE,
        property: "font-size",
        attributes,
    });

    // wrapper styles css in strings ⬇
    const wrapperStylesDesktop = `
		.eb-button-group-wrapper.${blockId}{
			display: flex;
			flex-direction: row;
			align-items: ${contentPosition};
			justify-content: ${contentPosition};
			position: relative;
			${wrapperMarginStylesDesktop}
		}
	`;
    const wrapperStylesTab = `
		.eb-button-group-wrapper.${blockId}{
			${wrapperMarginStylesTab}

		}
	`;
    const wrapperStylesMobile = `
		.eb-button-group-wrapper.${blockId}{
			${wrapperMarginStylesMobile}

		}
	`;

    // Buttons Common styles css in strings ⬇
    const buttonsCommonStyleDesktop = `
		.eb-button-group-wrapper.${blockId} .eb-button-parent,
        .eb-button-group-wrapper.${blockId} .eb-button-anchor {
			${buttonsPaddingStylesDesktop}
			${buttonsWidthType === "custom" ? buttonWidthStyleDesktop : "width: auto;"}
			${buttonGapDesktop}
			text-align: ${buttonTextAlign};
			cursor: pointer;
		}
		.eb-button-group-wrapper.${blockId} .eb-button-parent .eb-button-text,
        .eb-button-group-wrapper.${blockId} .eb-button-anchor .eb-button-text {
			${buttonsTypoStylesDesktop}
		}

		.eb-button-group-wrapper.${blockId}.preset-4 {
			width: fit-content;
			margin: ${contentPosition === "center"
            ? "0 auto;"
            : contentPosition === "flex-end"
                ? "0 0 0 auto;"
                : "auto 0;"
        }
		}
	`;

    const buttonsCommonStyleTab = `
		.eb-button-group-wrapper.${blockId} .eb-button-parent,
        .eb-button-group-wrapper.${blockId} .eb-button-anchor {
			${buttonsPaddingStylesTab}
			${buttonsWidthType === "custom" ? buttonWidthStyleTab : "width: auto;"}
			${buttonGapTab}
		}
		.eb-button-group-wrapper.${blockId} .eb-button-parent .eb-button-text,
        .eb-button-group-wrapper.${blockId} .eb-button-anchor .eb-button-text {
			${buttonsTypoStylesTab}
		}
	`;

    const buttonsCommonStyleMobile = `
		.eb-button-group-wrapper.${blockId} .eb-button-parent,
        .eb-button-group-wrapper.${blockId} .eb-button-anchor {
			${buttonsPaddingStylesMobile}
			${buttonsWidthType === "custom" ? buttonWidthStyleMobile : "width: auto;"}
			${buttonGapMobile}
		}
		.eb-button-group-wrapper.${blockId} .eb-button-parent .eb-button-text,
        .eb-button-group-wrapper.${blockId} .eb-button-anchor .eb-button-text {
			${buttonsTypoStylesMobile}
		}
	`;
    
    // Connector styles css in strings ⬇
    const connectorStylesDesktop = `
		.eb-button-group-wrapper.${blockId} .eb-button-group__midldeInner span {
			${connectorType === "text"
            ? connectorTypoStylesDesktop
            : buttonConnectorIconSizeDesktop
        }
			${buttonConnectorHeightDesktop}
			${buttonConnectorWidthDesktop}
			${buttonConnectorLineHeightDesktop}
			background: ${innerButtonColor};
			color: ${innerButtonTextColor};
		}
	`;

    const connectorStylesTab = `
		.eb-button-group-wrapper.${blockId} .eb-button-group__midldeInner span {
			${connectorType === "text"
            ? connectorTypoStylesTab
            : buttonConnectorIconSizeTab
        }
			${buttonConnectorHeightTab}
			${buttonConnectorWidthTab}
			${buttonConnectorLineHeightTab}
		}
	`;

    const connectorStylesMobile = `
		.eb-button-group-wrapper.${blockId} .eb-button-group__midldeInner span {
			${connectorType === "text"
            ? connectorTypoStylesMobile
            : buttonConnectorIconSizeMobile
        }
			${buttonConnectorHeightMobile}
			${buttonConnectorWidthMobile}
			${buttonConnectorLineHeightMobile}
		}
	`;

    const wrapperClass = 'eb-button-group-wrapper';
    const {btnDesktopStyle: btnOneDesktopStyle, btnTabStyle: btnOneTabStyle, btnMobileStyle: btnOneMobileStyle } = EBButton.Style(
        blockId, 
        wrapperClass,
        BUTTON_ONE_KEYS,
        'btn1',
        'eb-button-one',
        '',
        BUTTON_ONE_BACKGROUND,
        BUTTON_ONE_BORDER_SHADOW,
        ''
    );

    const {btnDesktopStyle: btnTwoDesktopStyle, btnTabStyle: btnTwoTabStyle, btnMobileStyle: btnTwoMobileStyle } = EBButton.Style(
        blockId, 
        wrapperClass,
        BUTTON_TWO_KEYS,
        'btn2',
        'eb-button-two',
        '',
        BUTTON_TWO_BACKGROUND,
        BUTTON_TWO_BORDER_SHADOW,
        ''
    );

    // all css styles for large screen width (desktop/laptop) in strings ⬇
    const desktopAllStyles = softMinifyCssStrings(`
        ${wrapperStylesDesktop}
        ${buttonsCommonStyleDesktop}
        ${connectorStylesDesktop}
        ${btnOneDesktopStyle}
        ${btnTwoDesktopStyle}
    `);

    // all css styles for Tab in strings ⬇
    const tabAllStyles = softMinifyCssStrings(`
			${wrapperStylesTab}
			${buttonsCommonStyleTab}
			${connectorStylesTab}
            ${btnOneTabStyle}
            ${btnTwoTabStyle}
		`);

    // all css styles for Mobile in strings ⬇
    const mobileAllStyles = softMinifyCssStrings(`
			${wrapperStylesMobile}
			${buttonsCommonStyleMobile}
			${connectorStylesMobile}
            ${btnOneMobileStyle}
            ${btnTwoMobileStyle}
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
