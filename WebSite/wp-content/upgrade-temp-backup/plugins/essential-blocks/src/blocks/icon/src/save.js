import {
EBDisplayIcon, BlockProps
} from "@essential-blocks/controls";
const Save = ({ attributes }) => {
    const { blockId, icon, iconView, iconShape, classHook } = attributes;
    const viewClass = iconView !== "default" ? " eb-icon-view-" + iconView : "";
    const shapeClass =
        iconView !== "default" ? " eb-icon-shape-" + iconShape : "";

    return (
        <BlockProps.Save attributes={attributes}>
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
        </BlockProps.Save>
    );
};

export default Save;
