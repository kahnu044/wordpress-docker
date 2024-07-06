import { useBlockProps } from "@wordpress/block-editor";
const { sanitizeURL } = window.EBControls;
import InfoboxContainer from "./components/infobox-save";
const { BlockProps } = window.EBControls;
export default function save({ attributes }) {
    const {
        blockId,
        selectedIcon,
        infoboxIcon,
        number = 0,
        media,
        imageUrl,
        imageAlt,
        enableSubTitle,
        enableDescription,
        infoboxLink,
        linkNewTab,
        enableButton,
        isInfoClick,
        buttonText,
        title,
        subTitle,
        description,
        titleTag,
        subTitleTag,
        btnEffect,
        classHook,
    } = attributes;

    const requiredProps = {
        selectedIcon,
        infoboxIcon,
        blockId,
        number,
        media,
        imageUrl,
        imageAlt,
        enableSubTitle,
        enableDescription,
        infoboxLink,
        linkNewTab,
        enableButton,
        isInfoClick,
        buttonText,
        title,
        subTitle,
        description,
        titleTag,
        subTitleTag,
        btnEffect,
        classHook,
    };

    return (
        <BlockProps.Save attributes={attributes}>
            {isInfoClick ? (
                <a
                    href={infoboxLink == undefined ? '' : sanitizeURL(infoboxLink)}
                    target={linkNewTab ? "_blank" : "_self"}
                    rel="noopener noreferrer"
                    className="info-click-link info-wrap-link"
                >
                    <InfoboxContainer requiredProps={requiredProps} />
                </a>
            ) : (
                <InfoboxContainer requiredProps={requiredProps} />
            )}
        </BlockProps.Save>
    );
}
