import {
    BlockProps
} from "@essential-blocks/controls";
const save = ({ attributes }) => {
    const {
        blockId,
        settings,
        source,
        layout,
        displayImage,
        displayTitle,
        displayButton,
        buttonText,
        gridPreset,
        listPreset,
        classHook,
    } = attributes;

    if (settings?.opensea?.apiKey.length == 0) {
        return
    }

    const dataAttributes = {
        settings,
        layout,
        displayImage,
        displayTitle,
        displayButton,
        buttonText,
        gridPreset,
        listPreset,
    };

    return (
        <BlockProps.Save attributes={attributes}>
            <div className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`}>
                <div
                    className={`eb-nft-gallery-wrapper ${blockId}`}
                    data-id={blockId}
                    data-source={source}
                    data-attributes={JSON.stringify(dataAttributes)}
                ></div>
            </div>
        </BlockProps.Save>
    );
};

export default save;
