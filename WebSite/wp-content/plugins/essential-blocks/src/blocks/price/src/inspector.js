/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
    BaseControl,
    SelectControl,
    TextControl,
    ToggleControl,
    __experimentalDivider as Divider,
    __experimentalToggleGroupControl as ToggleGroupControl,
    __experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from "@wordpress/components";

/**
 * Internal depencencies
 */
import {
    typoPrefix_original_price,
    typoPrefix_pricing_period,
    typoPrefix_saleprice,
    typoPrefix_sale_pricing_period,
} from "./constants/typographyPrefixConstants";
import {
    WRAPPER_BG,
    WRAPPER_MARGIN,
    WRAPPER_PADDING,
    WRAPPER_BORDER_SHADOW,
    ALIGNMENT,
    PRICE_VIEW,
} from "./constants";

import {
    TypographyDropdown,
    ColorControl,
    InspectorPanel,
 } from "@essential-blocks/controls";

import objAttributes from "./attributes";

function Inspector(props) {
    const { attributes, setAttributes } = props;
    const {
        resOption,
        mainPrice,
        showOnSale,
        salePrice,
        priceCurrency,
        currencyPlacement,
        pricePeriod,
        priceAlignment,
        priceTextColor,
        salePriceTextColor,
        pricingPeriodTextColor,
        salePricePeriod,
        priceView,
        salePricingPeriodTextColor,
    } = attributes;

    return (
        <>
            <InspectorPanel advancedControlProps={{
                marginPrefix: WRAPPER_MARGIN,
                paddingPrefix: WRAPPER_PADDING,
                borderPrefix: WRAPPER_BORDER_SHADOW,
                backgroundPrefix: WRAPPER_BG,
            }}>
                <InspectorPanel.General>
                    <InspectorPanel.PanelBody title={__("Settings", "essential-blocks")} initialOpen={true}>
                        <TextControl
                            label={__("Price", "essential-blocks")}
                            value={mainPrice}
                            onChange={(newPrice) =>
                                setAttributes({
                                    mainPrice: newPrice,
                                })
                            }
                            __next40pxDefaultSize
                            __nextHasNoMarginBottom
                        />
                        <TextControl
                            label={__("Price Period (per)")}
                            value={pricePeriod}
                            onChange={(pricePeriod) => setAttributes({ pricePeriod })}
                            __next40pxDefaultSize
                            __nextHasNoMarginBottom
                        />
                        <ToggleControl
                            label={__("On Sale?")}
                            checked={showOnSale}
                            onChange={() => {
                                setAttributes({
                                    showOnSale: !showOnSale,
                                });
                            }}
                            __nextHasNoMarginBottom
                        />
                        {showOnSale && (
                            <>
                                <TextControl
                                    label={__("Sale Price", "essential-blocks")}
                                    value={salePrice}
                                    onChange={(newsalePrice) =>
                                        setAttributes({
                                            salePrice: newsalePrice,
                                        })
                                    }
                                    __next40pxDefaultSize
                                    __nextHasNoMarginBottom
                                />
                                <TextControl
                                    label={__("Sale Price Period (per)")}
                                    value={salePricePeriod}
                                    onChange={(salePricePeriod) =>
                                        setAttributes({
                                            salePricePeriod,
                                        })
                                    }
                                    __next40pxDefaultSize
                                    __nextHasNoMarginBottom
                                />
                                <Divider />
                            </>
                        )}
                        <TextControl
                            label={__("Price Currency", "essential-blocks")}
                            value={priceCurrency}
                            onChange={(newPriceCurrency) =>
                                setAttributes({
                                    priceCurrency: newPriceCurrency,
                                })
                            }
                            __next40pxDefaultSize
                            __nextHasNoMarginBottom
                        />
                        <SelectControl
                            label={__("Currency Placement", "essential-blocks")}
                            value={currencyPlacement}
                            options={[
                                {
                                    label: "Left",
                                    value: "left",
                                },
                                {
                                    label: "Right",
                                    value: "right",
                                },
                            ]}
                            onChange={(currencyPlacement) => {
                                setAttributes({
                                    currencyPlacement,
                                });
                            }}
                            __next40pxDefaultSize
                            __nextHasNoMarginBottom
                        />
                        <Divider />
                        <SelectControl
                            label={__("Price View", "essential-blocks")}
                            value={priceView}
                            options={PRICE_VIEW}
                            onChange={(newPriceView) =>
                                setAttributes({
                                    priceView: newPriceView,
                                })
                            }
                            __next40pxDefaultSize
                            __nextHasNoMarginBottom
                        />
                    </InspectorPanel.PanelBody>
                </InspectorPanel.General>
                <InspectorPanel.Style>
                    <InspectorPanel.PanelBody title={__("Styles", "essential-blocks")} initialOpen={true}>
                        <ToggleGroupControl
                            label={__("Alignment", "essential-blocks")}
                            className="eb-control-title newtogglegroupcontrol"
                            value={priceAlignment}
                            onChange={(value) =>
                                setAttributes({
                                    priceAlignment: value,
                                })
                            }
                            isBlock
                            __next40pxDefaultSize
                            __nextHasNoMarginBottom
                        >
                            {ALIGNMENT.map((item, index) => (
                                <ToggleGroupControlOption
                                    key={index}
                                    value={item.value}
                                    label={item.label}
                                />
                            ))}
                        </ToggleGroupControl>
                        <Divider />
                        <BaseControl __nextHasNoMarginBottom>
                            <h3 className="eb-control-title">
                                {__("Original Price", "essential-blocks")}
                            </h3>
                        </BaseControl>
                        <ColorControl
                            label={__("Color", "essential-blocks")}
                            color={priceTextColor}
                            attributeName={'priceTextColor'}
                        />
                        <TypographyDropdown
                            baseLabel={__("Typography", "essential-blocks")}
                            typographyPrefixConstant={typoPrefix_original_price}
                        />
                        <Divider />
                        <BaseControl __nextHasNoMarginBottom>
                            <h3 className="eb-control-title">
                                {__("Pricing Period", "essential-blocks")}
                            </h3>
                        </BaseControl>
                        <ColorControl
                            label={__("Color", "essential-blocks")}
                            color={pricingPeriodTextColor}
                            attributeName={'pricingPeriodTextColor'}
                        />
                        <TypographyDropdown
                            baseLabel={__("Typography", "essential-blocks")}
                            typographyPrefixConstant={typoPrefix_pricing_period}
                        />
                        {showOnSale && (
                            <>
                                <Divider />
                                <BaseControl __nextHasNoMarginBottom>
                                    <h3 className="eb-control-title">
                                        {__("Sale Price", "essential-blocks")}
                                    </h3>
                                </BaseControl>
                                <ColorControl
                                    label={__("Color", "essential-blocks")}
                                    color={salePriceTextColor}
                                    attributeName={'salePriceTextColor'}
                                />
                                <TypographyDropdown
                                    baseLabel={__("Typography", "essential-blocks")}
                                    typographyPrefixConstant={typoPrefix_saleprice}
                                />
                                <Divider />
                                <BaseControl __nextHasNoMarginBottom>
                                    <h3 className="eb-control-title">
                                        {__("Sale Pricing Period", "essential-blocks")}
                                    </h3>
                                </BaseControl>
                                <ColorControl
                                    label={__("Color", "essential-blocks")}
                                    color={salePricingPeriodTextColor}
                                    attributeName={'salePricingPeriodTextColor'}
                                />
                                <TypographyDropdown
                                    baseLabel={__("Typography", "essential-blocks")}
                                    typographyPrefixConstant={typoPrefix_sale_pricing_period}
                                />
                            </>
                        )}
                    </InspectorPanel.PanelBody>
                </InspectorPanel.Style>
            </InspectorPanel>
        </>
    );
}

export default Inspector;
