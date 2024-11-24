import {
    BUTTON_PADDING,
    BUTTON_BACKGROUND,
    BUTTON_BORDER,
    WRAPPER_MARGIN
} from "./constants";

import { typoPrefix_text } from "./typographyContants";

import {
    softMinifyCssStrings,
    generateDimensionsControlStyles,
    StyleComponent,
    useBlockAttributes,
    EBButton
 } from "@essential-blocks/controls";

export default function Style(props) {
    const { setAttributes, name } = props;
    const attributes = useBlockAttributes();
    const {
        blockId,
    } = attributes;

    // wrapper margin
    const {
        dimensionStylesDesktop: wrapperMarginStylesDesktop,
        dimensionStylesTab: wrapperMarginStylesTab,
        dimensionStylesMobile: wrapperMarginStylesMobile,
    } = generateDimensionsControlStyles({
        controlName: WRAPPER_MARGIN,
        styleFor: "margin",
        attributes,
    });

    const desktopStyles = `
		.eb-button-wrapper.${blockId} {
			${wrapperMarginStylesDesktop}
		}
	`;

    const tabStyles = `
		.eb-button-wrapper.${blockId} {
			${wrapperMarginStylesTab}
		}
	`;

    const mobileStyles = `
		.eb-button-wrapper.${blockId} {
			${wrapperMarginStylesMobile}
		}
	`;

    const wrapperClass = 'eb-button-wrapper';
    const {btnDesktopStyle, btnTabStyle, btnMobileStyle} = EBButton.Style(
        blockId, 
        wrapperClass,
        {},
        '',
        '',
        typoPrefix_text,
        BUTTON_BACKGROUND,
        BUTTON_BORDER,
        BUTTON_PADDING
    );

    // all css styles for large screen width (desktop/laptop) in strings ⬇
    const desktopAllStyles = softMinifyCssStrings(`
			${desktopStyles}
            ${btnDesktopStyle}
		`);

    // all css styles for Tab in strings ⬇
    const tabAllStyles = softMinifyCssStrings(`
			${tabStyles}
            ${btnTabStyle}
		`);

    // all css styles for Mobile in strings ⬇
    const mobileAllStyles = softMinifyCssStrings(`
			${mobileStyles}
            ${btnMobileStyle}
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
