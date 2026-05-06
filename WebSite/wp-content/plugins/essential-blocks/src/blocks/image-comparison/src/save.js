import {
BlockProps
} from "@essential-blocks/controls";
const Save = ({ attributes }) => {
    const {
        blockId,
        leftImageURL,
        rightImageURL,
        hover,
        verticalMode,
        showLabels,
        beforeLabel,
        afterLabel,
        position,
        lineWidth,
        lineColor,
        contentPosition,
        horizontalLabelPosition,
        verticalLabelPosition,
        noHandle,
        classHook,
    } = attributes;

    const alignmentClass =
        contentPosition === "center"
            ? " eb-image-comparison-align-center"
            : contentPosition === "right"
                ? " eb-image-comparison-align-right"
                : "";
    let labelPostionClass = verticalMode
        ? ` eb-label-vertical-${verticalLabelPosition}`
        : ` eb-label-horizontal-${horizontalLabelPosition}`;

    return (
        <>
            <BlockProps.Save attributes={attributes}>
                <div className={`eb-parent-wrapper eb-parent-${blockId} ${classHook || ''}`}>
                    <div
                        className={`eb-image-comparison-wrapper ${blockId}${alignmentClass}${labelPostionClass}`}
                        data-left-image={leftImageURL}
                        data-right-image={rightImageURL}
                        data-vertical-mode={verticalMode}
                        data-hover={hover}
                        data-show-label={showLabels}
                        data-slider-position={position}
                        data-line-width={lineWidth}
                        data-line-color={lineColor}
                        data-handle={noHandle}
                    >
                        {leftImageURL && rightImageURL && (
                            <>
                                <div data-testid="container">
                                    <img
                                        alt="Left Image"
                                        src={leftImageURL}
                                        data-testid="left-image"
                                    />
                                    <img
                                        alt="Right Image"
                                        src={rightImageURL}
                                        data-testid="right-image"
                                    />
                                </div>
                            </>
                        )}
                        {showLabels && beforeLabel && (
                            <span className="eb-image-comparison-label eb-image-comparison-before-label">{beforeLabel}</span>
                        )}
                        {showLabels && afterLabel && (
                            <span className="eb-image-comparison-label eb-image-comparison-after-label">{afterLabel}</span>
                        )}
                    </div>
                </div>
            </BlockProps.Save>
        </>
    );
};
export default Save;
