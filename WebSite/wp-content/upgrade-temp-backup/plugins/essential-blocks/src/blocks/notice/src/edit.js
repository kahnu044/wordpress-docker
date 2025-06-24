/**
 * WordPress dependencies
 */
import { RichText } from "@wordpress/block-editor";
import { memo } from "@wordpress/element";
/**
 * Internal depenencies
 */
import Inspector from "./inspector";
import Style from "./style";
import defaultAttributes from "./attributes";
import {
    BlockProps,
    withBlockContext
} from "@essential-blocks/controls";

const Edit = (props) => {
    const {
        attributes,
        setAttributes,
        isSelected,
    } = props;
    const {
        blockId,
        blockMeta,
        resOption,
        title,
        text,
        classHook,
    } = attributes;

    // you must declare this variable
    const enhancedProps = {
        ...props,
        blockPrefix: 'eb-notice',
        style: <Style {...props} />
    };

    return (
        <>
            {isSelected && <Inspector {...props} />}
            <BlockProps.Edit {...enhancedProps}>
                <div
                    className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`}
                >
                    <div
                        className={`eb-notice-wrapper ${blockId}`}
                        data-id={blockId}
                    >
                        <div className="eb-notice-title-wrapper">
                            <RichText
                                className="eb-notice-title"
                                value={title}
                                onChange={(newTitle) =>
                                    setAttributes({ title: newTitle })
                                }
                                placeholder="Add Title..."
                            />
                        </div>
                        <span className="eb-notice-dismiss" />
                        <div>
                            <RichText
                                className="eb-notice-text"
                                value={text}
                                onChange={(newText) =>
                                    setAttributes({ text: newText })
                                }
                                placeholder="Add Text..."
                            />
                        </div>
                    </div>
                </div>
            </BlockProps.Edit>
        </>
    );
}
export default memo(withBlockContext(defaultAttributes)(Edit))
