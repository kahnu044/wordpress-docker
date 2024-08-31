import { RichText } from "@wordpress/block-editor";
import {
    BlockProps
} from "@essential-blocks/controls";

const Save = ({ attributes }) => {
    const {
        blockId,
        tagName,
        text,
        classHook,
        source
    } = attributes;

    if (source !== 'custom') return null;

    return (
        <BlockProps.Save
            attributes={attributes}
        >
            <div
                className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`}
            >
                <div
                    className={`eb-text-wrapper ${blockId}`}
                    data-id={blockId}
                >
                    <RichText.Content
                        tagName={tagName}
                        className="eb-text"
                        value={text}
                    />
                </div>
            </div>
        </BlockProps.Save>
    );
};

export default Save;
