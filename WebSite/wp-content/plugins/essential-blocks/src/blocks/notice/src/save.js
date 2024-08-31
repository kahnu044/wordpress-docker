import { RichText, useBlockProps } from "@wordpress/block-editor";
import {
BlockProps
} from "@essential-blocks/controls";
const save = ({ attributes }) => {
    const {
        blockId,
        showAfterDismiss,
        title,
        text,
        classHook,
    } = attributes;

    return (
        <BlockProps.Save attributes={attributes}>
            <div className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`}>
                <div
                    className={`eb-notice-wrapper ${blockId}`}
                    data-id={blockId}
                    data-show-again={showAfterDismiss}
                >
                    <div className="eb-notice-title-wrapper">
                        <RichText.Content
                            tagName="div"
                            className="eb-notice-title"
                            value={title}
                        />
                    </div>
                    <span className="eb-notice-dismiss" style={{ cursor: "pointer" }} />
                    <div>
                        <RichText.Content
                            tagName="div"
                            className="eb-notice-text"
                            value={text}
                        />
                    </div>
                </div>
            </div>
        </BlockProps.Save>
    );
};

export default save;
