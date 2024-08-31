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

import { ProductTypeMarkup } from "./constants/productType";

function Edit(props) {
    const {
        attributes,
        setAttributes,
        isSelected,
    } = props;
    const {
        blockId,
        classHook,

        showQuantity,
        cartBtnText,
        productType
    } = attributes;

    // you must declare this variable
    const enhancedProps = {
        ...props,
        blockPrefix: 'eb-add-to-cart',
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
                    <div className={`eb-add-to-cart-wrapper ${blockId}`} data-id={blockId}>
                        <ProductTypeMarkup product={productType} showQuantity={showQuantity} cartBtnText={cartBtnText} />
                    </div>
                </div>
            </BlockProps.Edit >
        </>
    );
}
export default memo(withBlockContext(defaultAttributes)(Edit))
