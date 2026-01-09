/*
 * WordPress Dependencies
 */
import { __ } from "@wordpress/i18n";
import { useEffect, memo } from "@wordpress/element";
import {
    InnerBlocks,
    BlockControls,
    AlignmentToolbar,
    BlockAlignmentToolbar,
} from "@wordpress/block-editor";
import { Tooltip } from "@wordpress/components";
import { select, dispatch, useSelect } from "@wordpress/data";
import { createBlock } from "@wordpress/blocks";

/*
 * Internal  Dependencies
 */
import Style from "./style";
import Inspector from "./inspector";
import {
    BlockProps, withBlockContext,
} from "@essential-blocks/controls";
import defaultAttributes from './attributes';

import { ReactComponent as Icon } from "./icon.svg";
import {
    LAYOUT_TEMPLATES
} from "./helpers/templates";
import { LAYOUT_PRESETS } from "./constants";

function Edit(props) {
    const {
        isSelected,
        attributes,
        setAttributes,
        className,
        clientId,
    } = props;
    const {
        blockId,
        classHook,
        htmlTag,
        containerLayout,
        align,
        containerWidth,
        isContainerCustomWidth,
    } = attributes;

    // you must declare this variable
    const enhancedProps = {
        ...props,
        blockPrefix: 'eb-flex-container',
        style: <Style {...props} />,
        htmlTag
    };

    // Handle layout selection
    const handleLayoutSelect = (layoutValue) => {
        const template = LAYOUT_TEMPLATES[layoutValue];

        if (!template) return;

        // Extract all template properties except 'blocks'
        const { blocks, ...templateAttributes } = template;

        // Set all template attributes in a single call
        setAttributes({
            containerLayout: layoutValue,
            ...templateAttributes,
        });

        // Create blocks from template recursively
        const createBlocksFromTemplate = (blocksTemplate, isNested = false) => {
            return blocksTemplate.map(([name, attrs, innerBlocks = []]) => {
                // For nested containers (grandchildren and deeper), use preset1 as default
                // For direct children, use the attributes from the template
                const blockAttrs = isNested && name === 'essential-blocks/flex-container'
                    ? { ...attrs, containerLayout: attrs.containerLayout || "preset1" }
                    : { ...attrs };

                return createBlock(
                    name,
                    blockAttrs,
                    innerBlocks.length > 0 ? createBlocksFromTemplate(innerBlocks, true) : []
                );
            });
        };

        // Insert the blocks
        if (blocks && blocks.length > 0) {
            const newBlocks = createBlocksFromTemplate(blocks, false);
            dispatch("core/block-editor").replaceInnerBlocks(clientId, newBlocks);
        }
    };

    // Handle align changes from toolbar and sync with container width settings
    useEffect(() => {
        if (align) {
            // When align is set from toolbar, update containerWidth and disable custom width
            setAttributes({
                containerWidth: align,
                isContainerCustomWidth: false,
            });
        } else if (!isContainerCustomWidth) {
            // When align is cleared and not in custom mode, set containerWidth to undefined
            setAttributes({
                containerWidth: undefined,
            });
        }
        // Note: When isContainerCustomWidth is true, we don't change containerWidth
        // to preserve the custom width setting
    }, [align, isContainerCustomWidth]);

    const blockOrder = useSelect(
        (select) => select("core/block-editor").getBlockOrder(clientId),
        [clientId]
    );

    return (
        <>
            {isSelected && containerLayout.length > 0 && <Inspector {...props} />}

            <BlockProps.Edit {...enhancedProps}>
                <div
                    className={`eb-parent-wrapper eb-parent-flex-container eb-parent-${blockId} ${classHook}`}
                >
                    <div className={`eb-flex-container ${blockId} editor`}>
                        {!containerLayout && (
                            <>
                                <div className="eb-flex-container-layout-select">
                                    <div className="eb-flex-container-layout-heading">
                                        <Icon />
                                        <h2>{__("Flex Container", "essential-blocks")}</h2>
                                    </div>
                                    <p>{__("Please Select a Container Layout", "essential-blocks")}</p>

                                    {LAYOUT_PRESETS.map((preset, index) => (
                                        <Tooltip key={index} text={preset.label}>
                                            <div
                                                className="eb-flex-container-layout-item"
                                                onClick={() => handleLayoutSelect(preset.value)}
                                            >
                                                <div className="eb-flex-container-layout-icon">
                                                    {preset.icon()}
                                                </div>
                                            </div>
                                        </Tooltip>
                                    ))}
                                </div>
                            </>
                        )}
                        {containerLayout && containerLayout.length > 0 && (
                            <>
                                <InnerBlocks
                                    templateLock={false}
                                    renderAppender={
                                        blockOrder.length > 0
                                            ? undefined
                                            : InnerBlocks.ButtonBlockAppender
                                    }
                                />
                            </>
                        )}
                    </div>
                </div>
            </BlockProps.Edit >
        </>
    );
}
export default memo(withBlockContext(defaultAttributes)(Edit))
