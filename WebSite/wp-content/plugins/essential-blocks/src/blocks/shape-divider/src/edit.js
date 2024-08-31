/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useEffect, memo } from "@wordpress/element";
/**
 * Internal depencencies
 */
import Inspector from "./inspector";
import Style from "./style";
import {
    ShapeDividerContent,
    BlockProps,
    withBlockContext
 } from "@essential-blocks/controls";
import { SHAPE_DIVIDER } from "./constants";
import defaultAttributes from "./attributes";

const Edit = (props) => {
    const {
        attributes,
        setAttributes,
        isSelected,
    } = props;
    const {
        blockId,
        blockMeta,
        // responsive control attribute ⬇
        resOption,
        shapeDividerPosition,
        shapeDividerInvert,
        shapeDividerType,
        classHook,
    } = attributes;

    // you must declare this variable
    const enhancedProps = {
        ...props,
        blockPrefix: 'eb-shape-divider',
        style: <Style {...props} />
    };

    useEffect(() => {
        setAttributes({ shapeDividerInvert: false });
    }, [shapeDividerPosition, attributes[`${SHAPE_DIVIDER}Type`]]);

    return (
        <>
            {isSelected && <Inspector {...props} />}

            <BlockProps.Edit {...enhancedProps}>

                <div
                    className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`}
                >
                    <div
                        className={`eb-shape-divider-wrapper ${blockId}`}
                        data-id={blockId}
                    >
                        <ShapeDividerContent
                            position={shapeDividerPosition}
                            style={
                                attributes[`${SHAPE_DIVIDER}Type`] != ""
                                    ? attributes[`${SHAPE_DIVIDER}Type`]
                                    : "style_1"
                            }
                            negative={shapeDividerInvert}
                        />
                    </div>
                </div>
            </BlockProps.Edit>
        </>
    );
}

export default memo(withBlockContext(defaultAttributes)(Edit))