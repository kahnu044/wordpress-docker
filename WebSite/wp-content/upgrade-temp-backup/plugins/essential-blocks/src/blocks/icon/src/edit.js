/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { memo } from "@wordpress/element";
/**
 * Internal depencencies
 */
import Style from "./style";
import Inspector from "./inspector";
import defaultAttributes from './attributes';

/**
 * External depencencies
 */
import {
    BlockProps,
    EBDisplayIcon,
    withBlockContext
} from "@essential-blocks/controls";

const Edit = (props) => {
    const {
        attributes,
        setAttributes,
        isSelected,
    } = props;
    const {
        resOption,
        blockId,
        icon,
        iconView,
        iconShape,
        classHook,
    } = attributes;

    // you must declare this variable
    const enhancedProps = {
        ...props,
        blockPrefix: 'eb-icon',
        style: <Style {...props} />
    };

    const viewClass = iconView !== "default" ? " eb-icon-view-" + iconView : "";
    const shapeClass =
        iconView !== "default" ? " eb-icon-shape-" + iconShape : "";

    return (
        <>
            {isSelected && (
                <>
                    <Inspector
                        attributes={attributes}
                        setAttributes={setAttributes}
                    />
                </>
            )}

            <BlockProps.Edit {...enhancedProps}>
                <div
                    className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`}
                >
                    <div
                        className={`eb-icon-wrapper ${blockId}${` eb-icon-view-${iconView}`}${shapeClass}`}
                        data-id={blockId}
                    >
                        <div className="eb-icon-container">
                            <EBDisplayIcon icon={icon} />
                        </div>
                    </div>
                </div>
            </BlockProps.Edit>
        </>
    );
}
export default memo(withBlockContext(defaultAttributes)(Edit))
