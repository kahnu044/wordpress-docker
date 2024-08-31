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
import defaultAttributes from './attributes';

/**
 * External depencencies
 */
import {
    DynamicInputValueHandler,
    BlockProps,
    withBlockContext,
    EBDisplayIcon
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
        prefixType,
        prefixText,
        prefixIcon,
        suffixType,
        suffixIcon,
        suffixText,
        pricePlacement,
        showPrefix,
        showSuffix,
    } = attributes;


    // you must declare this variable
    const enhancedProps = {
        ...props,
        blockPrefix: 'eb-product-price',
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
                <div
                    className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`}
                >
                    <div
                        className={`eb-product-price-wrapper ${blockId} ${pricePlacement}`}
                        data-id={blockId}
                    >
                        {showPrefix === true && (
                            <div className="prefix-wrap">
                                {prefixType === 'text' && prefixText && (
                                    <DynamicInputValueHandler
                                        value={prefixText}
                                        tagName='span'
                                        className="eb-taxonomy-prefix-text"
                                        onChange={(prefixText) =>
                                            setAttributes({ prefixText })
                                        }
                                        readOnly={true}
                                    />
                                )}

                                {prefixType === 'icon' && prefixIcon && (
                                    <EBDisplayIcon icon={prefixIcon} className={`eb-taxonomy-prefix-icon`} />
                                )}
                            </div>
                        )}
                        <div className={`eb-woo-product-price`}>
                            <span className="eb-product-price-regular">
                                <span className="eb-product-price-currency">{EssentialBlocksLocalize.wc_currency_symbol}</span>
                                {__("80.00", "essential-blocks")}
                            </span>

                            <span className="eb-product-price-sale">
                                <span className="eb-product-price-currency">{EssentialBlocksLocalize.wc_currency_symbol}</span>
                                {__("50.00", "essential-blocks")}
                            </span>
                        </div>
                        {showSuffix === true && (
                            <div className="suffix-wrap">
                                {suffixType === 'text' && suffixText && (
                                    <DynamicInputValueHandler
                                        value={suffixText}
                                        tagName='span'
                                        className="eb-taxonomy-suffix-text"
                                        onChange={(suffixText) =>
                                            setAttributes({ suffixText })
                                        }
                                        readOnly={true}
                                    />
                                )}

                                {suffixType === 'icon' && suffixIcon && (
                                    <EBDisplayIcon icon={suffixIcon} className={`eb-taxonomy-suffix-icon`} />
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </BlockProps.Edit>
        </>
    );
}
export default memo(withBlockContext(defaultAttributes)(Edit))
