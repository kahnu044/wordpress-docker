import InfoboxContainer from "./components/infobox-save";
import {
    BlockProps
} from "@essential-blocks/controls";
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
        showMedia,
        enableTitle,
        addBtnIcon,
        btnIconPosition,
        btnIcon
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
        showMedia,
        enableTitle,
        addBtnIcon,
        btnIconPosition,
        btnIcon
    };

    return (
        <BlockProps.Save attributes={attributes}>
            <InfoboxContainer requiredProps={requiredProps} attributes={attributes} />
        </BlockProps.Save>
    );
}
