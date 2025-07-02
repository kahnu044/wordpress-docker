import { RichText } from "@wordpress/block-editor";
import {
    sanitizeURL,
    BlockProps,
    ImageComponent,
} from "@essential-blocks/controls";

const save = ({ attributes }) => {
    const {
        blockId,
        image,
        imageCaption,
        horizontalAlign,
        verticalAlign,
        verticalAlignCap2,
        stylePreset,
        captionStyle,
        hoverEffect,
        openInNewTab,
        imageLink,
        enableLink,
        classHook,
        imgSource,
    } = attributes;

    if (imgSource !== "custom") {
        return null;
    }

    return (
        <BlockProps.Save attributes={attributes}>
            <div
                className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`}
            >
                <figure
                    className={`eb-advanced-image-wrapper ${blockId} ${hoverEffect}`}
                    data-id={blockId}
                >
                    <ImageComponent.Content
                        attributes={attributes}
                    />
                </figure>
            </div>
        </BlockProps.Save>
    );
};

export default save;
