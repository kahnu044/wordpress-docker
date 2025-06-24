/**
 * WordPress dependencies
 */
import { useBlockProps } from "@wordpress/block-editor";

import { CONTAINER_CLASS, WRAPPER_CLASS, STRIPE_CLASS } from "./constants";
import {
    BlockProps
} from "@essential-blocks/controls";
const save = ({ attributes }) => {
    const {
        blockId,
        layout,
        wrapperAlign,
        titleTag,
        progress,
        displayProgress,
        animationDuration,
        title,
        showStripe,
        stripeAnimation,
        prefix,
        suffix,
        classHook,
        totalRange,
        valueDivider,
        valueType,
        absoluteProgress,
    } = attributes;

    const stripeClass = showStripe ? " " + STRIPE_CLASS[stripeAnimation] : "";

    return (
        <BlockProps.Save attributes={attributes}>
            <div className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`}>
                <div className={`eb-progressbar-wrapper ${blockId}`}>
                    <div
                        className={`eb-progressbar-${CONTAINER_CLASS[layout]}-container ${wrapperAlign}`}
                    >
                        {(layout === "line" || layout === "line_rainbow") && title && (
                            <attributes.titleTag className="eb-progressbar-title">
                                {title}
                            </attributes.titleTag>
                        )}

                        <div
                            className={`eb-progressbar ${WRAPPER_CLASS[layout]}${stripeClass}`}
                            data-layout={layout}
                            data-count={progress}
                            data-duration={animationDuration}
                            data-type={valueType}
                            data-absolute={absoluteProgress}
                            data-totalRange={totalRange}
                        >
                            {(layout === "circle" || layout === "circle_fill") && (
                                <>
                                    <div className="eb-progressbar-circle-pie">
                                        <div className="eb-progressbar-circle-half-left eb-progressbar-circle-half"></div>
                                        <div className="eb-progressbar-circle-half-right eb-progressbar-circle-half"></div>
                                    </div>
                                    <div className="eb-progressbar-circle-inner"></div>
                                    <div className="eb-progressbar-circle-inner-content">
                                        {title && (
                                            <attributes.titleTag className="eb-progressbar-title">
                                                {title}
                                            </attributes.titleTag>
                                        )}
                                        {displayProgress && (
                                            <span className="eb-progressbar-count-wrap">
                                                <span className="eb-progress-count-wrap">
                                                    <span className="eb-progressbar-count">
                                                        {valueType === 'absolute' ? absoluteProgress : progress}
                                                    </span>
                                                    {valueType === 'percentage' && (
                                                        <span className="postfix">%</span>
                                                    )}
                                                </span>
                                                {valueType === 'absolute' && (
                                                    <>
                                                        <span className="value-divider">{valueDivider}</span>
                                                        <span className="eb-progress-total-range-wrap">
                                                            <span className="eb-progressbar-count">
                                                                {totalRange}
                                                            </span>
                                                        </span>
                                                    </>
                                                )}
                                            </span>
                                        )}
                                    </div>
                                </>
                            )}

                            {(layout === "half_circle" || layout === "half_circle_fill") && (
                                <>
                                    <div className="eb-progressbar-circle">
                                        <div className="eb-progressbar-circle-pie">
                                            <div className="eb-progressbar-circle-half"></div>
                                        </div>
                                        <div className="eb-progressbar-circle-inner"></div>
                                    </div>
                                    <div className="eb-progressbar-circle-inner-content">
                                        <attributes.titleTag className="eb-progressbar-title">
                                            {title}
                                        </attributes.titleTag>
                                        {displayProgress && (
                                            <span className="eb-progressbar-count-wrap">
                                                <span className="eb-progress-count-wrap">
                                                    <span className="eb-progressbar-count">
                                                        {valueType === 'absolute' ? absoluteProgress : progress}
                                                    </span>
                                                    {valueType === 'percentage' && (
                                                        <span className="postfix">%</span>
                                                    )}
                                                </span>
                                                {valueType === 'absolute' && (
                                                    <>
                                                        <span className="value-divider">{valueDivider}</span>
                                                        <span className="eb-progress-total-range-wrap">
                                                            <span className="eb-progressbar-count">
                                                                {totalRange}
                                                            </span>
                                                        </span>
                                                    </>
                                                )}
                                            </span>
                                        )}
                                    </div>
                                </>
                            )}

                            {(layout === "line" || layout === "line_rainbow") && (
                                <>
                                    {displayProgress && (
                                        <span className="eb-progressbar-count-wrap">
                                            <span className="eb-progress-count-wrap">
                                                <span className="eb-progressbar-count">
                                                    {valueType === 'absolute' ? absoluteProgress : progress}
                                                </span>
                                                {valueType === 'percentage' && (
                                                    <span className="postfix">%</span>
                                                )}
                                            </span>
                                            {valueType === 'absolute' && (
                                                <>
                                                    <span className="value-divider">{valueDivider}</span>
                                                    <span className="eb-progress-total-range-wrap">
                                                        <span className="eb-progressbar-count">
                                                            {totalRange}
                                                        </span>
                                                    </span>
                                                </>
                                            )}
                                        </span>
                                    )}
                                    <span className="eb-progressbar-line-fill"></span>
                                </>
                            )}

                            {layout === "box" && (
                                <>
                                    <div className="eb-progressbar-box-inner-content">
                                        <attributes.titleTag className="eb-progressbar-title">
                                            {title}
                                        </attributes.titleTag>
                                        {displayProgress && (
                                            <span className="eb-progressbar-count-wrap">
                                                <span className="eb-progress-count-wrap">
                                                    <span className="eb-progressbar-count">
                                                        {valueType === 'absolute' ? absoluteProgress : progress}
                                                    </span>
                                                    {valueType === 'percentage' && (
                                                        <span className="postfix">%</span>
                                                    )}
                                                </span>
                                                {valueType === 'absolute' && (
                                                    <>
                                                        <span className="value-divider">{valueDivider}</span>
                                                        <span className="eb-progress-total-range-wrap">
                                                            <span className="eb-progressbar-count">
                                                                {totalRange}
                                                            </span>
                                                        </span>
                                                    </>
                                                )}
                                            </span>
                                        )}
                                    </div>
                                    <div className="eb-progressbar-box-fill"></div>
                                </>
                            )}
                        </div>
                        {(layout === "half_circle" || layout === "half_circle_fill") && (
                            <>
                                <div className="eb-progressbar-half-circle-after">
                                    <span className="eb-progressbar-prefix-label">{prefix}</span>
                                    <span className="eb-progressbar-postfix-label">{suffix}</span>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </BlockProps.Save>
    );
};

export default save;
