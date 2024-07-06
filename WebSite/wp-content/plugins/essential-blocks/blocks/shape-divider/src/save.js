/**
 * WordPress dependencies
 */
import { SHAPE_DIVIDER } from "./constants";
const { ShapeDividerContent, BlockProps } = window.EBControls;

const save = ({ attributes }) => {
    const {
        blockId,
        shapeDividerPosition,
        shapeDividerInvert,
        classHook,
    } = attributes;

    return (
        <BlockProps.Save attributes={attributes}>
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
        </BlockProps.Save>
    );
};

export default save;
