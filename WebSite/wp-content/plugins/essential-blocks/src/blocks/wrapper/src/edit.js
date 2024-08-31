/*
 * WordPress Dependencies
 */
import { __ } from "@wordpress/i18n";
import { useEffect, useRef, memo } from "@wordpress/element";
import {
    InnerBlocks,
    BlockControls,
    AlignmentToolbar,
} from "@wordpress/block-editor";
import { select } from "@wordpress/data";

/*
 * Internal  Dependencies
 */
import Style from "./style";
import Inspector from "./inspector";
import { SHAPE_DIVIDER_TOP, SHAPE_DIVIDER_BOTTOM } from "./constants";
import {
    BlockProps, ShapeDividerContent, withBlockContext
} from "@essential-blocks/controls";
import defaultAttributes from './attributes';

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
        wrapperAlign,
        isWrapperWidth,
        classHook,
        wrpShapeTopInvert,
        wrpShapeBottomInvert,
    } = attributes;

    // you must declare this variable
    const enhancedProps = {
        ...props,
        blockPrefix: 'eb-wrapper',
        style: <Style {...props} />
    };

    const isMount = useRef(null);
    useEffect(() => {
        // set isMount value
        isMount.current = true;
        return () => {
            isMount.current = false;
        };
    }, []);

    useEffect(() => {
        if (!isMount.current) {
            setAttributes({ wrpShapeTopInvert: false });
            setAttributes({ wrpShapeTopInvert: false });
        }
        isMount.current = false;
    }, [
        attributes[`${SHAPE_DIVIDER_TOP}Type`],
        attributes[`${SHAPE_DIVIDER_BOTTOM}Type`],
    ]);

    const alignmentClass =
        wrapperAlign === "center"
            ? "eb-wrapper-align-center"
            : wrapperAlign === "right"
                ? "eb-wrapper-align-right"
                : "";

    return (
        <>
            {isSelected && <Inspector {...props} />}
            <BlockControls>
                <AlignmentToolbar
                    value={wrapperAlign}
                    onChange={(wrapperAlign) => setAttributes({ wrapperAlign })}
                />
            </BlockControls>
            <BlockProps.Edit {...enhancedProps}>
                <div
                    className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`}
                >
                    <div
                        className={`eb-wrapper-outer ${blockId}${isWrapperWidth ? ` ${alignmentClass}` : ""
                            }`}
                    >
                        {attributes[`${SHAPE_DIVIDER_TOP}Type`] != "" && (
                            <ShapeDividerContent
                                position="top"
                                style={attributes[`${SHAPE_DIVIDER_TOP}Type`]}
                                negative={wrpShapeTopInvert}
                            />
                        )}
                        {attributes[`${SHAPE_DIVIDER_BOTTOM}Type`] != "" && (
                            <ShapeDividerContent
                                position="bottom"
                                style={
                                    attributes[`${SHAPE_DIVIDER_BOTTOM}Type`]
                                }
                                negative={wrpShapeBottomInvert}
                            />
                        )}
                        <div className="eb-wrapper-inner">
                            <div
                                className={`eb-wrapper-inner-blocks${!isWrapperWidth ? ` ${alignmentClass}` : ""
                                    }`}
                            >
                                <InnerBlocks
                                    renderAppender={
                                        select(
                                            "core/block-editor"
                                        ).getBlockOrder(clientId).length > 0
                                            ? undefined
                                            : InnerBlocks.ButtonBlockAppender
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </BlockProps.Edit>
        </>
    );
}
export default memo(withBlockContext(defaultAttributes)(Edit))
