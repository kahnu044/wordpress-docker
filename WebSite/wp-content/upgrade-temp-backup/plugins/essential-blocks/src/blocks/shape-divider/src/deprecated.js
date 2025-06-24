/**
 * WordPress dependencies
 */
import { useBlockProps } from "@wordpress/block-editor";
import attributes from "./attributes";
import {
ShapeDividerContent
} from "@essential-blocks/controls";
import { SHAPE_DIVIDER } from "./constants";

const deprecated = [
    {
        attributes: { ...attributes },
        save: ({ attributes }) => {
            const {
                blockId,
                shapeDividerPosition,
                shapeDividerInvert,
                classHook,
            } = attributes;

            return (
                <div {...useBlockProps.save()}>
                    <div
                        className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`}
                    >
                        <div className={`eb-shape-divider-wrapper ${blockId}`}>
                            <ShapeDividerContent
                                position={shapeDividerPosition}
                                style={attributes[`${SHAPE_DIVIDER}Type`]}
                                negative={shapeDividerInvert}
                            />
                        </div>
                    </div>
                </div>
            );
        },
    },
];

export default deprecated;
