/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
    PanelBody,
    SelectControl,
    ToggleControl,
    BaseControl,
    ButtonGroup,
    Button,
    RangeControl,
} from "@wordpress/components";

/**
 * Internal dependencies
 */
import {
    WRAPPER_BG,
    WRAPPER_MARGIN,
    WRAPPER_PADDING,
    WRAPPER_BORDER_SHADOW,
    PREFIX_ICON_SIZE,
    SUFFIX_ICON_SIZE,
} from "@essential-blocks/blocks/product-price/src/constants/constants";

import {
    typoPrefix_original_price,
    typoPrefix_saleprice,
    PREFIX_TYPO,
    SUFFIX_TYPO,
} from "@essential-blocks/blocks/product-price/src/constants/typographyPrefixConstants";

import objAttributes from "@essential-blocks/blocks/product-price/src/attributes";

import {
    ResponsiveDimensionsControl,
    ResponsiveRangeController,
    TypographyDropdown,
    DynamicInputControl,
    ColorControl,
    BackgroundControl,
    BorderShadowControl,
    EBIconPicker,
    useBlockDefaults,
    withBlockContext
} from "@essential-blocks/controls";

const PRICE_PLACEMENT_OPTIONS = [
    { label: __("After Regular Price", "essential-blocks"), value: "left" },
    { label: __("Before Regular Price", "essential-blocks"), value: "right" },
];

const ALIGNMENT_OPTIONS = [
    { label: __("Left", "essential-blocks"), value: "flex-start" },
    { label: __("Center", "essential-blocks"), value: "center" },
    { label: __("Right", "essential-blocks"), value: "flex-end" },
];

const PREFIX_TYPES = [
    { label: __("Text", "essential-blocks"), value: "text" },
    { label: __("Icon", "essential-blocks"), value: "icon" },
];

const PRICE_TYPES = [
    { label: __("Regular", "essential-blocks"), value: "regular" },
    { label: __("Sale", "essential-blocks"), value: "sale" },
];

const CURRENCY_ALIGN = [
    { label: __("Top", "essential-blocks"), value: "flex-start" },
    { label: __("Center", "essential-blocks"), value: "center" },
    { label: __("Bottom", "essential-blocks"), value: "flex-end" },
];

function ProductPrice(props) {
    const { blockDefaults, setBlockDefaults, name, deviceType, handleBlockDefault } = props;

    const {
        pricePlacement,
        priceAlignment,
        priceType,
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
        regularPriceCurrencyColor,
        salePriceCurrencyColor,
        regularPriceCurrencySize,
        salePriceCurrencySize,
        currencyAlign,
    } = blockDefaults;

    const isDefaultSet = useBlockDefaults(name, blockDefaults, setBlockDefaults, objAttributes)

    return (
        <>
            {isDefaultSet && (
                <div className="eb-panel-control">
                    <PanelBody
                        title={__("Settings", "essential-blocks")}
                        initialOpen={true}
                    >
                        <SelectControl
                            label={__("Sale Price Position", "essential-blocks")}
                            value={pricePlacement}
                            options={PRICE_PLACEMENT_OPTIONS}
                            onChange={(pricePlacement) =>
                                handleBlockDefault({ pricePlacement })
                            }
                        />
                        <BaseControl label={__("Price Alignment", "essential-blocks")}>
                            <ButtonGroup>
                                {ALIGNMENT_OPTIONS.map((item, index) => (
                                    <Button
                                        key={index}
                                        isPrimary={priceAlignment === item.value}
                                        isSecondary={priceAlignment !== item.value}
                                        onClick={() =>
                                            handleBlockDefault({
                                                priceAlignment: item.value,
                                            })
                                        }
                                    >
                                        {item.label}
                                    </Button>
                                ))}
                            </ButtonGroup>
                        </BaseControl>
                        <ToggleControl
                            label={__("Show Prefix", "essential-blocks")}
                            checked={showPrefix}
                            onChange={(showPrefix) =>
                                handleBlockDefault({ showPrefix })
                            }
                        />
                        {showPrefix && (
                            <>
                                <SelectControl
                                    label={__("Prefix Type", "essential-blocks")}
                                    value={prefixType}
                                    options={PREFIX_TYPES}
                                    onChange={(prefixType) =>
                                        handleBlockDefault({ prefixType })
                                    }
                                />
                                {prefixType === "text" && (
                                    <DynamicInputControl
                                        label={__("Prefix Text", "essential-blocks")}
                                        attrName="prefixText"
                                        inputValue={prefixText}
                                        setAttributes={handleBlockDefault}
                                        onChange={(prefixText) =>
                                            handleBlockDefault({ prefixText })
                                        }
                                    />
                                )}
                                {prefixType === "icon" && (
                                    <EBIconPicker
                                        value={prefixIcon}
                                        onChange={(prefixIcon) =>
                                            handleBlockDefault({ prefixIcon })
                                        }
                                        title={__("Select Prefix Icon", "essential-blocks")}
                                    />
                                )}
                            </>
                        )}
                        <ToggleControl
                            label={__("Show Suffix", "essential-blocks")}
                            checked={showSuffix}
                            onChange={(showSuffix) =>
                                handleBlockDefault({ showSuffix })
                            }
                        />
                        {showSuffix && (
                            <>
                                <SelectControl
                                    label={__("Suffix Type", "essential-blocks")}
                                    value={suffixType}
                                    options={PREFIX_TYPES}
                                    onChange={(suffixType) =>
                                        handleBlockDefault({ suffixType })
                                    }
                                />
                                {suffixType === "text" && (
                                    <DynamicInputControl
                                        label={__("Suffix Text", "essential-blocks")}
                                        attrName="suffixText"
                                        inputValue={suffixText}
                                        setAttributes={handleBlockDefault}
                                        onChange={(suffixText) =>
                                            handleBlockDefault({ suffixText })
                                        }
                                    />
                                )}
                                {suffixType === "icon" && (
                                    <EBIconPicker
                                        value={suffixIcon}
                                        onChange={(suffixIcon) =>
                                            handleBlockDefault({ suffixIcon })
                                        }
                                        title={__("Select Suffix Icon", "essential-blocks")}
                                    />
                                )}
                            </>
                        )}
                    </PanelBody>
                    <PanelBody
                        title={__("Price Styles", "essential-blocks")}
                        initialOpen={false}
                    >
                        <TypographyDropdown
                            baseLabel={__("Regular Price Typography", "essential-blocks")}
                            typographyPrefixConstant={typoPrefix_original_price}
                        />
                        <ColorControl
                            label={__("Regular Price Color", "essential-blocks")}
                            color={priceTextColor}
                            onChange={(priceTextColor) =>
                                handleBlockDefault({ priceTextColor })
                            }
                        />
                        <ColorControl
                            label={__("Regular Price Background", "essential-blocks")}
                            color={priceTextBGColor}
                            onChange={(priceTextBGColor) =>
                                handleBlockDefault({ priceTextBGColor })
                            }
                        />
                        <TypographyDropdown
                            baseLabel={__("Sale Price Typography", "essential-blocks")}
                            typographyPrefixConstant={typoPrefix_saleprice}
                        />
                        <ColorControl
                            label={__("Sale Price Color", "essential-blocks")}
                            color={salePriceTextColor}
                            onChange={(salePriceTextColor) =>
                                handleBlockDefault({ salePriceTextColor })
                            }
                        />
                        <ColorControl
                            label={__("Sale Price Background", "essential-blocks")}
                            color={salePriceTextBGColor}
                            onChange={(salePriceTextBGColor) =>
                                handleBlockDefault({ salePriceTextBGColor })
                            }
                        />
                    </PanelBody>
                    <PanelBody
                        title={__("Currency Styles", "essential-blocks")}
                        initialOpen={false}
                    >
                        <BaseControl label={__("Currency Alignment", "essential-blocks")}>
                            <ButtonGroup>
                                {CURRENCY_ALIGN.map((item, index) => (
                                    <Button
                                        key={index}
                                        isPrimary={currencyAlign === item.value}
                                        isSecondary={currencyAlign !== item.value}
                                        onClick={() =>
                                            handleBlockDefault({
                                                currencyAlign: item.value,
                                            })
                                        }
                                    >
                                        {item.label}
                                    </Button>
                                ))}
                            </ButtonGroup>
                        </BaseControl>
                        <BaseControl>
                            <ButtonGroup>
                                {PRICE_TYPES.map(({ label, value }, index) => (
                                    <Button
                                        key={index}
                                        isSecondary={priceType !== value}
                                        isPrimary={priceType === value}
                                        onClick={() =>
                                            handleBlockDefault({
                                                priceType: value,
                                            })
                                        }
                                    >
                                        {label}
                                    </Button>
                                ))}
                            </ButtonGroup>
                        </BaseControl>
                        {priceType === 'regular' && (
                            <>
                                <ColorControl
                                    label={__("Regular Currency Color", "essential-blocks")}
                                    color={regularPriceCurrencyColor}
                                    onChange={(regularPriceCurrencyColor) =>
                                        handleBlockDefault({ regularPriceCurrencyColor })
                                    }
                                />
                                <RangeControl
                                    label={__("Regular Currency Size", "essential-blocks")}
                                    value={regularPriceCurrencySize}
                                    onChange={(regularPriceCurrencySize) =>
                                        handleBlockDefault({ regularPriceCurrencySize })
                                    }
                                    min={1}
                                    max={1000}
                                    step={1}
                                    allowReset={true}
                                />
                            </>
                        )}
                        {priceType === 'sale' && (
                            <>
                                <ColorControl
                                    label={__("Sale Currency Color", "essential-blocks")}
                                    color={salePriceCurrencyColor}
                                    onChange={(salePriceCurrencyColor) =>
                                        handleBlockDefault({ salePriceCurrencyColor })
                                    }
                                />
                                <RangeControl
                                    label={__("Sale Currency Size", "essential-blocks")}
                                    value={salePriceCurrencySize}
                                    onChange={(salePriceCurrencySize) =>
                                        handleBlockDefault({ salePriceCurrencySize })
                                    }
                                    min={1}
                                    max={1000}
                                    step={1}
                                    allowReset={true}
                                />
                            </>
                        )}
                    </PanelBody>
                    {showPrefix && (
                        <PanelBody
                            title={__("Prefix Styles", "essential-blocks")}
                            initialOpen={false}
                        >
                            <ColorControl
                                label={__("Prefix Color", "essential-blocks")}
                                color={prefixColor}
                                onChange={(prefixColor) =>
                                    handleBlockDefault({ prefixColor })
                                }
                            />
                            <ColorControl
                                label={__("Prefix Background", "essential-blocks")}
                                color={prefixBGColor}
                                onChange={(prefixBGColor) =>
                                    handleBlockDefault({ prefixBGColor })
                                }
                            />
                            {prefixType === "text" && (
                                <TypographyDropdown
                                    baseLabel={__("Typography", "essential-blocks")}
                                    typographyPrefixConstant={PREFIX_TYPO}
                                />
                            )}
                            {prefixType === "icon" && (
                                <ResponsiveRangeController
                                    baseLabel={__("Icon Size", "essential-blocks")}
                                    controlName={PREFIX_ICON_SIZE}
                                    min={8}
                                    max={200}
                                    step={1}
                                />
                            )}
                        </PanelBody>
                    )}
                    {showSuffix && (
                        <PanelBody
                            title={__("Suffix Styles", "essential-blocks")}
                            initialOpen={false}
                        >
                            <ColorControl
                                label={__("Suffix Color", "essential-blocks")}
                                color={suffixColor}
                                onChange={(suffixColor) =>
                                    handleBlockDefault({ suffixColor })
                                }
                            />
                            <ColorControl
                                label={__("Suffix Background", "essential-blocks")}
                                color={suffixBGColor}
                                onChange={(suffixBGColor) =>
                                    handleBlockDefault({ suffixBGColor })
                                }
                            />
                            {suffixType === "text" && (
                                <TypographyDropdown
                                    baseLabel={__("Typography", "essential-blocks")}
                                    typographyPrefixConstant={SUFFIX_TYPO}
                                />
                            )}
                            {suffixType === "icon" && (
                                <ResponsiveRangeController
                                    baseLabel={__("Icon Size", "essential-blocks")}
                                    controlName={SUFFIX_ICON_SIZE}
                                    min={8}
                                    max={200}
                                    step={1}
                                />
                            )}
                        </PanelBody>
                    )}
                    <PanelBody
                        title={__("Margin & Padding", "essential-blocks")}
                        initialOpen={false}
                    >
                        <ResponsiveDimensionsControl
                            controlName={WRAPPER_MARGIN}
                            baseLabel={__("Margin", "essential-blocks")}
                        />
                        <ResponsiveDimensionsControl
                            controlName={WRAPPER_PADDING}
                            baseLabel={__("Padding", "essential-blocks")}
                        />
                    </PanelBody>
                    <PanelBody
                        title={__("Background", "essential-blocks")}
                        initialOpen={false}
                    >
                        <BackgroundControl
                            controlName={WRAPPER_BG}
                        />
                    </PanelBody>
                    <PanelBody
                        title={__("Border & Shadow", "essential-blocks")}
                        initialOpen={false}
                    >
                        <BorderShadowControl
                            controlName={WRAPPER_BORDER_SHADOW}
                        />
                    </PanelBody>
                </div>
            )}
        </>
    );
}

export default withBlockContext(objAttributes)(ProductPrice);
