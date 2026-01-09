/*
 * WordPress Dependencies
 *
 */
import { InnerBlocks } from "@wordpress/block-editor";

/*
 * Internal  Dependencies
 *
 */
import {
    BlockProps
} from "@essential-blocks/controls";

const save = ({ attributes }) => {
    const {
        blockId,
        classHook,
        htmlTag,
    } = attributes;

    return (
        <BlockProps.Save attributes={attributes} rootClass="eb-flex-container-block" htmlTag={htmlTag}>
            <div className={`eb-parent-wrapper eb-parent-flex-container eb-parent-${blockId} ${classHook}`} >
                <div className={`eb-flex-container ${blockId}`}>
                    <div className="eb-flex-container-inner">
                        <InnerBlocks.Content />
                    </div>
                </div>
            </div>
        </BlockProps.Save>
    );
};

export default save;
