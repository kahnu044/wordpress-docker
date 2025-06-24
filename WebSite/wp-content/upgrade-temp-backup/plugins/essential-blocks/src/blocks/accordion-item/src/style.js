/**
 * Internal dependencies
 */

import {
    softMinifyCssStrings,
    StyleComponent,
} from "@essential-blocks/controls";

export default function Style(props) {
    const { attributes, setAttributes, name } = props;
    const { blockId, parentBlockId, accordionLists, itemId } = attributes;

    const foundItem = accordionLists?.find((item) => item.id == itemId);

    // CSS/styling Codes Starts from Here

    // all css styles for large screen width (desktop/laptop) in strings ⬇
    const desktopAllStyles = softMinifyCssStrings(`
        ${
            foundItem?.accordionColor
                ? `.${parentBlockId}.eb-accordion-container .${blockId}.eb-accordion-wrapper .eb-accordion-title-wrapper-${parentBlockId},
                .${parentBlockId}.eb-accordion-container .${blockId}.eb-accordion-wrapper .eb-accordion-content .title-content-${parentBlockId} {
            background: ${foundItem?.accordionColor};
        }`
            : ""
        }
        ${
            foundItem?.titleColor
                ? `.${parentBlockId}.eb-accordion-container .${blockId}.eb-accordion-wrapper .eb-accordion-title-wrapper-${parentBlockId} .eb-accordion-title,
                .${parentBlockId}.eb-accordion-container .${blockId}.eb-accordion-wrapper .eb-accordion-content .eb-accordion-title {
            color: ${foundItem?.titleColor};
        }`
            : ""
        }
        ${
            foundItem?.iconColor
                ? `.${parentBlockId}.eb-accordion-container .${blockId}.eb-accordion-wrapper .eb-accordion-title-wrapper-${parentBlockId} .eb-accordion-icon {
            color: ${foundItem?.iconColor};
        }`
            : ""
        }
        .${parentBlockId}.eb-accordion-container .${blockId}.eb-accordion-wrapper .eb-accordion-title-wrapper-${parentBlockId} .eb-accordion-title-prefix-text,
        .${parentBlockId}.eb-accordion-container .${blockId}.eb-accordion-wrapper .eb-accordion-title-wrapper-${parentBlockId} .eb-accordion-title-prefix-icon,
        .${parentBlockId}.eb-accordion-container .${blockId}.eb-accordion-wrapper .eb-accordion-content .eb-accordion-title-prefix-text,
        .${parentBlockId}.eb-accordion-container .${blockId}.eb-accordion-wrapper .eb-accordion-content .eb-accordion-title-prefix-icon {
            color: ${foundItem?.titlePrefixColor};
            background: ${foundItem?.titlePrefixBGColor}
        }
        .${parentBlockId}.eb-accordion-container .${blockId}.eb-accordion-wrapper .eb-accordion-title-wrapper-${parentBlockId} .eb-accordion-title-suffix-text,
        .${parentBlockId}.eb-accordion-container .${blockId}.eb-accordion-wrapper .eb-accordion-title-wrapper-${parentBlockId} .eb-accordion-title-suffix-icon,
        .${parentBlockId}.eb-accordion-container .${blockId}.eb-accordion-wrapper .eb-accordion-content .eb-accordion-title-suffix-text,
        .${parentBlockId}.eb-accordion-container .${blockId}.eb-accordion-wrapper .eb-accordion-content .eb-accordion-title-suffix-icon {
            color: ${foundItem?.titleSuffixIconColor};
            background: ${foundItem?.titleSuffixBGColor};
        }

	`);

    // all css styles for Tab in strings ⬇
    const tabAllStyles = softMinifyCssStrings(``);

    // all css styles for Mobile in strings ⬇
    const mobileAllStyles = softMinifyCssStrings(``);

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
