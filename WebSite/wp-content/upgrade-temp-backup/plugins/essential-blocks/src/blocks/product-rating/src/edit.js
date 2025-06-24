/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { memo } from "@wordpress/element";

/**
 * Internal depencencies
 */

import Inspector from "./inspector";
import Style from "./style";
import defaultAttributes from './attributes'

/**
 * External depencencies
 */
import {
    BlockProps,
    withBlockContext,
} from "@essential-blocks/controls";

function Edit(props) {
    const {
        attributes,
        setAttributes,
        isSelected,
    } = props;
    const {
        blockId,
        classHook,
        starsVariation,
        emptyCaption
    } = attributes;


    // you must declare this variable
    const enhancedProps = {
        ...props,
        blockPrefix: 'eb-product-rating',
        style: <Style {...props} />
    };

    return (
        <>
            {isSelected && (
                <Inspector
                    attributes={attributes}
                    setAttributes={setAttributes}
                />
            )}

            <BlockProps.Edit {...enhancedProps}>
                <div className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`} >
                    <div className={`eb-product-rating-wrapper ${blockId}`} data-id={blockId}>
                        <div className="eb-woo-product-rating-wrapper">
                            <span class="eb-woo-product-rating"><i class={starsVariation}></i></span>
                            <span class="eb-woo-product-rating"><i class={starsVariation}></i></span>
                            <span class="eb-woo-product-rating"><i class={starsVariation}></i></span>
                            <span class="eb-woo-product-rating"><i class={starsVariation}></i></span>
                            <span class="eb-woo-product-rating"><i class={starsVariation}></i></span>
                        </div>
                        <span className="eb-product-rating-count">{emptyCaption}</span>
                    </div>
                </div>
            </BlockProps.Edit >
        </>
    );
}
export default memo(withBlockContext(defaultAttributes)(Edit))
