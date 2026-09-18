import { InnerBlocks } from "@wordpress/block-editor";
import { applyFilters } from "@wordpress/hooks";
import {
    BlockProps
} from "@essential-blocks/controls";
const save = ({ attributes }) => {
    const {
        blockId,
        classHook,
    } = attributes;

    return (
        <BlockProps.Save attributes={attributes}>
            <div className={`eb-parent-wrapper eb-parent-${blockId} ${classHook || ''}`}>
                <div className={`eb-row-root-container ${blockId}`} data-id={blockId}>
                    {applyFilters("eb_row_pro_video_bg_save", "", attributes)}
                    <div className={`eb-row-wrapper`}>
                        <div className="eb-row-inner">
                            <InnerBlocks.Content />
                        </div>
                    </div>
                </div>
            </div>
        </BlockProps.Save>
    );
};

export default save;
