/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
    Button,
    ButtonGroup,
    BaseControl,
    SelectControl,
    TextControl,
    ToggleControl,
    __experimentalDivider as Divider,
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
                        />
                        <TextControl
                            label={__("Price Period (per)")}
                            value={pricePeriod}
                            onChange={(pricePeriod) => setAttributes({ pricePeriod })}
                        />
                        <ToggleControl
                            label={__("On Sale?")}
                            checked={showOnSale}
                            onChange={() => {
                                setAttributes({
                                    showOnSale: !showOnSale,
                                });
                            }}
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
                                />
                                <TextControl
                                    label={__("Sale Price Period (per)")}
                                    value={salePricePeriod}
                                    onChange={(salePricePeriod) =>
                                        setAttributes({
                                            salePricePeriod,
                                        })
                                    }
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
                        />
                    </InspectorPanel.PanelBody>
                </InspectorPanel.General>
                <InspectorPanel.Style>
                    <InspectorPanel.PanelBody title={__("Styles", "essential-blocks")} initialOpen={true}>
                        <BaseControl>
                            <h3 className="eb-control-title">{__("Alignment", "essential-blocks")}</h3>
                            <ButtonGroup>
                                {ALIGNMENT.map((item, index) => (
                                    <Button
                                        key={index}
                                        isPrimary={priceAlignment === item.value}
                                        isSecondary={priceAlignment !== item.value}
                                        onClick={() =>
                                            setAttributes({
                                                priceAlignment: item.value,
                                            })
                                        }
                                    >
                                        {item.label}
                                    </Button>
                                ))}
                            </ButtonGroup>
                        </BaseControl>
                        <Divider />
                        <BaseControl>
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
                        <BaseControl>
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
                                <BaseControl>
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
                                <BaseControl>
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
