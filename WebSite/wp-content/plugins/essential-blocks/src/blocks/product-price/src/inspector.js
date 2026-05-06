/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
    BaseControl,
    SelectControl,
    ToggleControl,
    RangeControl,
    __experimentalDivider as Divider,
    __experimentalToggleGroupControl as ToggleGroupControl,
    __experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from "@wordpress/components";

/**
 * Internal depencencies
 */
import {
    WRAPPER_BG,
    WRAPPER_MARGIN,
    WRAPPER_PADDING,
    WRAPPER_BORDER_SHADOW,
    ALIGNMENT,
    PREFIX_TYPES,
    PREFIX_ICON_SIZE,
    SUFFIX_ICON_SIZE,
    PRICE_TYPES,
    CURRENCY_ALIGN
} from "./constants/constants";
import {
    typoPrefix_original_price,
    typoPrefix_saleprice,
    PREFIX_TYPO,
    SUFFIX_TYPO,
} from "./constants/typographyPrefixConstants";
import {
    ResponsiveRangeController,
    TypographyDropdown,
    DynamicInputControl,
    ColorControl,
    InspectorPanel,
    EBIconPicker
} from "@essential-blocks/controls";

import objAttributes from "./attributes";

function Inspector(props) {
    const { attributes, setAttributes } = props;
    const {
        resOption,
        pricePlacement,
        priceAlignment,
        priceTextColor,
        priceTextBGColor,
        salePriceTextColor,
        salePriceTextBGColor,
        prefixType,
        prefixIcon,
        prefixText,
        prefixColor,
        prefixBGColor,
        suffixType,
        suffixIcon,
        suffixText,
        suffixColor,
        suffixBGColor,
        showPrefix,
        showSuffix,
        currencyColor,
        currencySize,
        priceType,
        regularPriceCurrencyColor,
        salePriceCurrencyColor,
        regularPriceCurrencySize,
        salePriceCurrencySize,
        currencyAlign
    } = attributes;

    return (
        <InspectorPanel advancedControlProps={{
            marginPrefix: WRAPPER_MARGIN,
            paddingPrefix: WRAPPER_PADDING,
            backgroundPrefix: WRAPPER_BG,
            borderPrefix: WRAPPER_BORDER_SHADOW,
            hasMargin: true
        }}>
            <InspectorPanel.General>
                <InspectorPanel.PanelBody title={__("Settings", "essential-blocks")} initialOpen={true}>
                    <SelectControl
                        label={__("Sale Price Position", "essential-blocks")}
                        value={pricePlacement}
                        options={[
                            {
                                label: "After Regular Price",
                                value: "left",
                            },
                            {
                                label: "Before Regular Price",
                                value: "right",
                            },

                        ]}
                        onChange={(pricePlacement) => {
                            setAttributes({
                                pricePlacement,
                            });
                        }}
                        __next40pxDefaultSize
                        __nextHasNoMarginBottom
                    />

                    <InspectorPanel.PanelBody title={__("Prefix & Suffix", "essential-blocks")} initialOpen={true}>
                        <ToggleControl
                            label={__("Show Prefix", "essential-blocks")}
                            checked={showPrefix}
                            onChange={() => setAttributes({ showPrefix: !showPrefix })}
                            __nextHasNoMarginBottom
                        />
                        {showPrefix === true && (
                            <>
                                <ToggleGroupControl
                                    label={__("Prefix Type", "essential-blocks")}

                                    value={prefixType}
                                    onChange={(value) =>
                                        setAttributes({
                                            prefixType: value,
                                        })
                                    }
                                    isBlock
                                    __next40pxDefaultSize
                                    __nextHasNoMarginBottom
                                >
                                    {PREFIX_TYPES.map(
                                        (
                                            { label, value },
                                            index
                                        ) => (
                                            <ToggleGroupControlOption
                                                key={index}
                                                value={value}
                                                label={label}
                                            />
                                        )
                                    )}
                                </ToggleGroupControl>

                                {prefixType === "icon" && (
                                    <EBIconPicker
                                        value={prefixIcon}
                                        attributeName={'prefixIcon'}
                                    />
                                )}
                                {prefixType === "text" && (
                                    <>
                                        <DynamicInputControl
                                            label="Prefix Text"
                                            attrName="prefixText"
                                            inputValue={prefixText}
                                            setAttributes={setAttributes}
                                            onChange={(text) =>
                                                setAttributes({
                                                    prefixText: text,
                                                })
                                            }
                                        />
                                    </>
                                )}
                            </>
                        )}

                        <ToggleControl
                            label={__("Show Suffix", "essential-blocks")}
                            checked={showSuffix}
                            onChange={() => setAttributes({ showSuffix: !showSuffix })}
                            __nextHasNoMarginBottom
                        />

                        {showSuffix === true && (
                            <>
                                <ToggleGroupControl
                                    label={__("Sufix Type", "essential-blocks")}

                                    value={suffixType}
                                    onChange={(value) =>
                                        setAttributes({
                                            suffixType: value,
                                        })
                                    }
                                    isBlock
                                    __next40pxDefaultSize
                                    __nextHasNoMarginBottom
                                >
                                    {PREFIX_TYPES.map(
                                        (
                                            { label, value },
                                            index
                                        ) => (
                                            <ToggleGroupControlOption
                                                key={index}
                                                value={value}
                                                label={label}
                                            />
                                        )
                                    )}
                                </ToggleGroupControl>

                                {suffixType === "icon" && (
                                    <EBIconPicker
                                        value={suffixIcon}
                                        attributeName={'suffixIcon'}
                                    />
                                )}
                                {suffixType === "text" && (
                                    <>
                                        <DynamicInputControl
                                            label="Suffix Text"
                                            attrName="suffixText"
                                            inputValue={suffixText}
                                            setAttributes={setAttributes}
                                            onChange={(text) =>
                                                setAttributes({
                                                    suffixText: text,
                                                })
                                            }
                                        />
                                    </>
                                )}
                            </>
                        )}

                    </InspectorPanel.PanelBody>
                </InspectorPanel.PanelBody>
            </InspectorPanel.General>
            <InspectorPanel.Style>
                <InspectorPanel.PanelBody
                    title={__("Styles", "essential-blocks")}
                    initialOpen={true}
                >
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
                            {__("Regular Price", "essential-blocks")}
                        </h3>
                    </BaseControl>
                    <ColorControl
                        label={__("Color", "essential-blocks")}
                        color={priceTextColor}
                        attributeName={'priceTextColor'}
                    />
                    <ColorControl
                        label={__("Background Color", "essential-blocks")}
                        color={priceTextBGColor}
                        attributeName={'priceTextBGColor'}
                    />
                    <TypographyDropdown
                        baseLabel={__("Typography", "essential-blocks")}
                        typographyPrefixConstant={typoPrefix_original_price}
                    />

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
                    <ColorControl
                        label={__("Background Color", "essential-blocks")}
                        color={salePriceTextBGColor}
                        attributeName={'salePriceTextBGColor'}
                    />
                    <TypographyDropdown
                        baseLabel={__("Typography", "essential-blocks")}
                        typographyPrefixConstant={typoPrefix_saleprice}
                    />

                    <BaseControl __nextHasNoMarginBottom>
                        <h3 className="eb-control-title">
                            {__("Currency Sign", "essential-blocks")}
                        </h3>
                    </BaseControl>
                    <ColorControl
                        label={__("Color", "essential-blocks")}
                        color={currencyColor}
                        attributeName={'currencyColor'}
                    />
                    <RangeControl
                        label={__(
                            "Size",
                            "essential-blocks"
                        )}
                        value={currencySize}
                        onChange={(currencySize) =>
                            setAttributes({
                                currencySize,
                            })
                        }
                        min={1}
                        max={1000}
                        step={1}
                        allowReset={true}
                        __nextHasNoMarginBottom
                        __next40pxDefaultSize
                    />

                    <ToggleGroupControl

                        value={priceType}
                        onChange={(value) =>
                            setAttributes({
                                priceType: value,
                            })
                        }
                        isBlock
__next40pxDefaultSize
__nextHasNoMarginBottom
                    >
                        {PRICE_TYPES.map(
                            (
                                { label, value },
                                index
                            ) => (
                                <ToggleGroupControlOption
                                    key={index}
                                    value={value}
                                    label={label}
                                />
                            )
                        )}
                    </ToggleGroupControl>
                    {priceType === 'regular' && (
                        <>
                            <ColorControl
                                label={__("Color", "essential-blocks")}
                                color={regularPriceCurrencyColor}
                                attributeName={'regularPriceCurrencyColor'}
                            />
                            <RangeControl
                                label={__(
                                    "Size",
                                    "essential-blocks"
                                )}
                                value={regularPriceCurrencySize}
                                onChange={(regularPriceCurrencySize) =>
                                    setAttributes({
                                        regularPriceCurrencySize,
                                    })
                                }
                                min={1}
                                max={1000}
                                step={1}
                                allowReset={true}
                                __nextHasNoMarginBottom
                                __next40pxDefaultSize
                            />
                        </>
                    )}
                    {priceType === 'sale' && (
                        <>
                            <ColorControl
                                label={__("Color", "essential-blocks")}
                                color={salePriceCurrencyColor}
                                attributeName={'salePriceCurrencyColor'}
                            />
                            <RangeControl
                                label={__(
                                    "Size",
                                    "essential-blocks"
                                )}
                                value={salePriceCurrencySize}
                                onChange={(salePriceCurrencySize) =>
                                    setAttributes({
                                        salePriceCurrencySize,
                                    })
                                }
                                min={1}
                                max={1000}
                                step={1}
                                allowReset={true}
                                __nextHasNoMarginBottom
                                __next40pxDefaultSize
                            />
                        </>
                    )}

                    <SelectControl
                        label={__("Alignment", "essential-blocks")}
                        value={currencyAlign}
                        options={CURRENCY_ALIGN}
                        onChange={(currencyAlign) => setAttributes({ currencyAlign })}
                        __next40pxDefaultSize
                        __nextHasNoMarginBottom
                    />

                    <Divider />

                    {showPrefix === true && (
                        <InspectorPanel.PanelBody title={__("Prefix")} initialOpen={true}>
                            <ColorControl
                                label={__(
                                    "Color",
                                    "essential-blocks"
                                )}
                                color={prefixColor}
                                attributeName={'prefixColor'}
                            />
                            <ColorControl
                                label={__(
                                    "Background Color",
                                    "essential-blocks"
                                )}
                                color={prefixBGColor}
                                attributeName={'prefixBGColor'}
                            />
                            {prefixType === "icon" &&
                                prefixIcon && (
                                    <ResponsiveRangeController
                                        baseLabel={__(
                                            "Icon Size",
                                            "essential-blocks"
                                        )}
                                        controlName={
                                            PREFIX_ICON_SIZE
                                        }
                                        min={8}
                                        max={200}
                                        step={1}
                                    />
                                )
                            }

                            {prefixType === "text" && (
                                <TypographyDropdown
                                    baseLabel="Typography"
                                    typographyPrefixConstant={
                                        PREFIX_TYPO
                                    }
                                />
                            )}
                        </InspectorPanel.PanelBody>
                    )}

                    {showSuffix === true && (
                        <InspectorPanel.PanelBody title={__("Suffix")} initialOpen={true}>
                            <ColorControl
                                label={__(
                                    "Color",
                                    "essential-blocks"
                                )}
                                color={suffixColor}
                                attributeName={'suffixColor'}
                            />
                            <ColorControl
                                label={__(
                                    "Background Color",
                                    "essential-blocks"
                                )}
                                color={suffixBGColor}
                                attributeName={'suffixBGColor'}
                            />
                            {suffixType === "icon" &&
                                suffixIcon && (
                                    <ResponsiveRangeController
                                        baseLabel={__(
                                            "Icon Size",
                                            "essential-blocks"
                                        )}
                                        controlName={
                                            SUFFIX_ICON_SIZE
                                        }
                                        min={8}
                                        max={200}
                                        step={1}
                                    />
                                )
                            }

                            {suffixType === "text" && (
                                <TypographyDropdown
                                    baseLabel="Typography"
                                    typographyPrefixConstant={
                                        SUFFIX_TYPO
                                    }
                                />
                            )}
                        </InspectorPanel.PanelBody>
                    )}
                </InspectorPanel.PanelBody>
            </InspectorPanel.Style>
        </InspectorPanel>
    );
}

export default Inspector;
