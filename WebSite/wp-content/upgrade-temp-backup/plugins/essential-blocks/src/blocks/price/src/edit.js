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
import defaultAttributes from "./attributes"

/**
 * External depencencies
 */
import {
    BlockProps,
    withBlockContext
} from "@essential-blocks/controls";

const Edit = (props) => {
    const {
        attributes,
        setAttributes,
        className,
        clientId,
        isSelected,
        name
    } = props;
    const {
        blockId,
        mainPrice,
        showOnSale,
        salePrice,
        priceCurrency,
        currencyPlacement,
        pricePeriod,
        periodSeparator,
        salePricePeriod,
        salePeriodSeparator,
        priceView,
        classHook,
    } = attributes;

    // you must declare this variable
    const enhancedProps = {
        ...props,
        blockPrefix: 'eb-price',
        style: <Style {...props} />
    };

    const wrapperClasses =
        priceView === "inline"
            ? "eb-price-view-inline"
            : "eb-price-view-stacked";

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
                        className={`eb-price-wrapper ${blockId} ${wrapperClasses}`}
                        data-id={blockId}
                    >
                        <div className="eb-price-container">
                            {showOnSale && (
                                <>
                                    <h3 className="eb-sale-price-wrapper">
                                        <span
                                            className="eb-sale-price"
                                            data-sale-price={salePrice}
                                        >
                                            {currencyPlacement === "left" && (
                                                <span className="eb-price-currency">
                                                    {priceCurrency}
                                                </span>
                                            )}
                                            {salePrice}
                                            {currencyPlacement === "right" && (
                                                <span className="eb-price-currency">
                                                    {priceCurrency}
                                                </span>
                                            )}
                                        </span>
                                        <span className="eb-sale-price-period">
                                            {salePeriodSeparator}
                                            {salePricePeriod}
                                        </span>
                                    </h3>{" "}
                                </>
                            )}
                            <h3
                                className={`eb-original-price-wrapper${showOnSale === true
                                    ? " eb-line-through"
                                    : ""
                                    }`}
                            >
                                <span className="eb-original-price">
                                    {currencyPlacement === "left" && (
                                        <span className="eb-price-currency">
                                            {priceCurrency}
                                        </span>
                                    )}
                                    {mainPrice}
                                    {currencyPlacement === "right" && (
                                        <span className="eb-price-currency">
                                            {priceCurrency}
                                        </span>
                                    )}
                                </span>
                                <span className="eb-price-period">
                                    {periodSeparator}
                                    {pricePeriod}
                                </span>
                            </h3>
                        </div>
                    </div>
                </div>
            </BlockProps.Edit>
        </>
    );
}

export default memo(withBlockContext(defaultAttributes)(Edit))
