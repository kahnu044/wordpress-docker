/**
 * WordPress dependencies
 */
import { InnerBlocks } from "@wordpress/block-editor";
import { BlockProps } from "@essential-blocks/controls";
import attributes from "./attributes";

const deprecated = [
    {
        attributes: { ...attributes },
        supports: {
            anchor: true,
        },
        save: ({ attributes }) => {
            const {
                blockId,
                classHook,
                htmlTag,
            } = attributes;

            return (
                <BlockProps.Save attributes={attributes} rootClass="eb-flex-container-block" htmlTag={htmlTag}>
                    <div className={`eb-parent-wrapper eb-parent-flex-container eb-parent-${blockId} ${classHook}`} >
                        <div className={`eb-flex-container ${blockId}`}>
                            <InnerBlocks.Content />
                        </div>
                    </div>
                </BlockProps.Save>
            );
        },
    },
];

export default deprecated;
