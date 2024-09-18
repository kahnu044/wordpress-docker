/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
    InnerBlocks
} from "@wordpress/block-editor";
import { useSelect } from "@wordpress/data";
import { memo, useEffect } from '@wordpress/element'
import {
    BlockProps,
    withBlockContext
} from "@essential-blocks/controls";
import defaultAttributes from "./attributes";

const Edit = (props) => {
    const { attributes, setAttributes, clientId, context } = props;
    const {
        tabId,
        tabParentId
    } = attributes;

    // you must declare this variable
    const enhancedProps = {
        ...props,
        blockPrefix: 'eb-tab',
        rootClass: `eb-guten-block-main-parent-wrapper eb-tab-editor-wrap`,
    };

    const { blocks } = useSelect((select) => ({
        blocks: select("core/block-editor").getBlockOrder(clientId)
    }), []);

    useEffect(() => {
        setAttributes({
            tabParentId : context['eb/tabParentId'],
        })
    }, [context['eb/tabParentId']])

    return (
        <BlockProps.Edit {...enhancedProps}>
            <div
                className={`eb-tab-wrapper`}
                data-tab-id={tabId}
                data-tab-parent-id={tabParentId}
            >
                <div className="eb-tab-inner">
                    <InnerBlocks
                        orientation={"vertical"}
                        templateLock={
                            // templateLock ? templateLock :
                            false
                        }
                        renderAppender={
                            blocks.length > 0
                                ? undefined
                                : InnerBlocks.ButtonBlockAppender
                        }
                    />
                </div>
            </div>
        </BlockProps.Edit>
    );
}

export default memo(withBlockContext(defaultAttributes)(Edit))
