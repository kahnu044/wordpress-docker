/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
    ToggleControl,
    BaseControl,
    SelectControl,
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
    BUTTON_BORDER,
    BUTTON_PADDING,
    QUANTITY_BORDER,
    QUANTITY_PADDING,
    VARIABLE_FIELD_BORDER,
    VARIABLE_FIELD_PADDING,
    PRICE_TYPES,
    PRODUCT_TYPES,
    DISPLAY_TYPES,
    sizeUnitTypes,
    btnWidth,
    quantityWidth
} from "./constants/constants";
import {
    btnTypo,
    quantityTypo,
    variableLabelTypo,
    variableFieldTypo,
    groupedNameTypo,
    regularPriceTypo,
    salePriceTypo,
} from "./constants/typographyPrefixConstants";
import {
    ResponsiveDimensionsControl,
    ResponsiveRangeController,
    TypographyDropdown,
    ColorControl,
    InspectorPanel,
    DynamicInputControl,
    BorderShadowControl
} from "@essential-blocks/controls";

function Inspector(props) {
    const { attributes, setAttributes } = props;
    const {
        showQuantity,
        cartBtnText,
        quantityColor,
        quantityBGColor,
        quantityActiveColor,
        quantityActiveBGColor,
        btnColor,
        btnBGColor,
        btnDisableColor,
        btnDisableBGColor,
        hoverBtnBGColor,
        hoverBtnColor,
        variableLabelColor,
        variableFieldColor,
        variableFieldBgColor,
        groupedNameColor,
        priceType,
        regularPriceColor,
        salePriceColor,
        productType,
        displayType,
        buttonSwitcher,
        quantitySwitcher,
        quantityActiveBorderColor
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
                        label={__(
                            "Choose Product Type (Only for Preview)",
                            "essential-blocks"
                        )}
                        value={productType}
                        options={PRODUCT_TYPES}
                        onChange={(type) => {
                            setAttributes({
                                productType: type,
                            });
                        }}
                        help={__(
                            "Note: This option is only to see how different types of products would look in your Single Product page.",
                            "essential-blocks"
                        )}
                        __next40pxDefaultSize
                        __nextHasNoMarginBottom
                    />
                    <ToggleControl
                        label={__("Show Quantity")}
                        checked={showQuantity}
                        onChange={() => {
                            setAttributes({
                                showQuantity: !showQuantity,
                            });
                        }}
                        __nextHasNoMarginBottom
                    />
                    {showQuantity && (
                        <SelectControl
                            label={__(
                                "Display Type",
                                "essential-blocks"
                            )}
                            value={displayType}
                            options={DISPLAY_TYPES}
                            onChange={(type) => {
                                setAttributes({
                                    displayType: type,
                                });
                            }}
                            __next40pxDefaultSize
                            __nextHasNoMarginBottom
                        />
                    )}
                    <DynamicInputControl
                        label={__("Button Text", "essential-blocks")}
                        attrName="cartBtnText"
                        inputValue={cartBtnText}
                        setAttributes={setAttributes}
                        onChange={(text) => setAttributes({ cartBtnText: text })}
                    />
                </InspectorPanel.PanelBody>
            </InspectorPanel.General>
            <InspectorPanel.Style>
                <InspectorPanel.PanelBody
                    title={__("Styles", "essential-blocks")}
                    initialOpen={true}
                >
                    <>
                        <InspectorPanel.PanelBody
                            title={__("Grouped Product", "essential-blocks")}
                            initialOpen={true}
                        >
                            <InspectorPanel.PanelBody
                                title={__("Product Label", "essential-blocks")}
                                initialOpen={true}
                            >
                                <TypographyDropdown
                                    baseLabel={__(
                                        "Typography",
                                        "essential-blocks"
                                    )}
                                    typographyPrefixConstant={
                                        groupedNameTypo
                                    }
                                />
                                <ColorControl
                                    label={__(
                                        "Color",
                                        "essential-blocks"
                                    )}
                                    color={groupedNameColor}
                                    attributeName={'groupedNameColor'}
                                />
                            </InspectorPanel.PanelBody>

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
                                    <TypographyDropdown
                                        baseLabel={__(
                                            "Typography",
                                            "essential-blocks"
                                        )}
                                        typographyPrefixConstant={
                                            regularPriceTypo
                                        }
                                    />
                                    <ColorControl
                                        label={__("Color", "essential-blocks")}
                                        color={regularPriceColor}
                                        attributeName={'regularPriceColor'}
                                    />
                                </>
                            )}
                            {priceType === 'sale' && (
                                <>
                                    <TypographyDropdown
                                        baseLabel={__(
                                            "Typography",
                                            "essential-blocks"
                                        )}
                                        typographyPrefixConstant={
                                            salePriceTypo
                                        }
                                    />
                                    <ColorControl
                                        label={__("Color", "essential-blocks")}
                                        color={salePriceColor}
                                        attributeName={'salePriceColor'}
                                    />
                                </>
                            )}

                        </InspectorPanel.PanelBody>
                        <InspectorPanel.PanelBody
                            title={__("Variable Product", "essential-blocks")}
                            initialOpen={true}
                        >
                            <InspectorPanel.PanelBody
                                title={__("Label", "essential-blocks")}
                                initialOpen={true}
                            >
                                <TypographyDropdown
                                    baseLabel={__(
                                        "Typography",
                                        "essential-blocks"
                                    )}
                                    typographyPrefixConstant={
                                        variableLabelTypo
                                    }
                                />

                                <ColorControl
                                    label={__(
                                        "Color",
                                        "essential-blocks"
                                    )}
                                    color={variableLabelColor}
                                    attributeName={'variableLabelColor'}
                                />
                            </InspectorPanel.PanelBody>

                            <InspectorPanel.PanelBody
                                title={__("Variable Product", "essential-blocks")}
                                initialOpen={true}
                            >
                                <TypographyDropdown
                                    baseLabel={__(
                                        "Typography",
                                        "essential-blocks"
                                    )}
                                    typographyPrefixConstant={
                                        variableFieldTypo
                                    }
                                />
                                <ColorControl
                                    label={__(
                                        "Color",
                                        "essential-blocks"
                                    )}
                                    color={variableFieldColor}
                                    attributeName={'variableFieldColor'}
                                />
                                <ColorControl
                                    label={__(
                                        "Background",
                                        "essential-blocks"
                                    )}
                                    color={variableFieldBgColor}
                                    attributeName={'variableFieldBgColor'}
                                />
                                <ResponsiveDimensionsControl
                                    controlName={VARIABLE_FIELD_PADDING}
                                    baseLabel={__(
                                        "Padding",
                                        "essential-blocks"
                                    )}
                                />
                            </InspectorPanel.PanelBody>

                            <BaseControl __nextHasNoMarginBottom>
                                <h3 className="eb-control-title">
                                    {__(
                                        "Border",
                                        "essential-blocks"
                                    )}
                                </h3>
                            </BaseControl>
                            <BorderShadowControl
                                controlName={VARIABLE_FIELD_BORDER}
                            />
                        </InspectorPanel.PanelBody>
                    </>
                </InspectorPanel.PanelBody>
                <InspectorPanel.PanelBody
                    title={__("Quantity", "essential-blocks")}
                    initialOpen={false}
                >
                    <ResponsiveRangeController
                        baseLabel={__(
                            "Width",
                            "essential-blocks"
                        )}
                        controlName={quantityWidth}
                        units={
                            sizeUnitTypes
                        }
                        min={0}
                        max={500}
                        step={1}
                    />

                    <TypographyDropdown
                        baseLabel={__(
                            "Typography",
                            "essential-blocks"
                        )}
                        typographyPrefixConstant={
                            quantityTypo
                        }
                    />

                    <ToggleGroupControl

                        value={quantitySwitcher}
                        onChange={(value) =>
                            setAttributes({
                                quantitySwitcher: value
                            })
                        }
                        isBlock
__next40pxDefaultSize
__nextHasNoMarginBottom
                    >
                        {[
                            {
                                label: __(
                                    "Normal",
                                    "essential-blocks"
                                ),
                                value: "normal",
                            },
                            {
                                label: __(
                                    "Active",
                                    "essential-blocks"
                                ),
                                value: "active",
                            },
                        ].map(
                            (
                                { value, label },
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

                    {quantitySwitcher == 'normal' && (
                        <>
                            <ColorControl
                                label={__(
                                    "Color",
                                    "essential-blocks"
                                )}
                                color={quantityColor}
                                attributeName={'quantityColor'}
                            />
                            <ColorControl
                                label={__(
                                    "Background Color",
                                    "essential-blocks"
                                )}
                                color={quantityBGColor}
                                attributeName={'quantityBGColor'}
                            />
                        </>
                    )}
                    {quantitySwitcher == 'active' && (
                        <>
                            <ColorControl
                                label={__(
                                    "Color",
                                    "essential-blocks"
                                )}
                                color={quantityActiveColor}
                                attributeName={'quantityActiveColor'}
                            />
                            <ColorControl
                                label={__(
                                    "Background Color",
                                    "essential-blocks"
                                )}
                                color={quantityActiveBGColor}
                                attributeName={'quantityActiveBGColor'}
                            />
                            <ColorControl
                                label={__(
                                    "Border Color",
                                    "essential-blocks"
                                )}
                                color={quantityActiveBorderColor}
                                attributeName={'quantityActiveBorderColor'}
                            />
                        </>
                    )}

                    <ResponsiveDimensionsControl
                        controlName={QUANTITY_PADDING}
                        baseLabel={__(
                            "Padding",
                            "essential-blocks"
                        )}
                    />
                    <BaseControl __nextHasNoMarginBottom>
                        <h3 className="eb-control-title">
                            {__(
                                "Border",
                                "essential-blocks"
                            )}
                        </h3>
                    </BaseControl>
                    <BorderShadowControl
                        controlName={QUANTITY_BORDER}
                    />
                </InspectorPanel.PanelBody>
                <InspectorPanel.PanelBody
                    title={__("Add to Cart Button", "essential-blocks")}
                    initialOpen={false}
                >
                    <ResponsiveRangeController
                        baseLabel={__(
                            "Width",
                            "essential-blocks"
                        )}
                        controlName={btnWidth}
                        units={
                            sizeUnitTypes
                        }
                        min={0}
                        max={500}
                        step={1}
                    />
                    <TypographyDropdown
                        baseLabel={__(
                            "Typography",
                            "essential-blocks"
                        )}
                        typographyPrefixConstant={
                            btnTypo
                        }
                    />

                    <ToggleGroupControl

                        value={buttonSwitcher}
                        onChange={(value) =>
                            setAttributes({
                                buttonSwitcher: value
                            })
                        }
                        isBlock
__next40pxDefaultSize
__nextHasNoMarginBottom
                    >
                        {[
                            {
                                label: __(
                                    "Normal",
                                    "essential-blocks"
                                ),
                                value: "normal",
                            },
                            {
                                label: __(
                                    "Hover",
                                    "essential-blocks"
                                ),
                                value: "hover",
                            },
                            {
                                label: __(
                                    "Disable",
                                    "essential-blocks"
                                ),
                                value: "disable",
                            },
                        ].map(
                            (
                                { value, label },
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

                    {buttonSwitcher === "normal" && (
                        <>
                            <ColorControl
                                label={__(
                                    "Color",
                                    "essential-blocks"
                                )}
                                color={btnColor}
                                attributeName={'btnColor'}
                            />
                            <ColorControl
                                label={__(
                                    "Background Color",
                                    "essential-blocks"
                                )}
                                color={btnBGColor}
                                attributeName={'btnBGColor'}
                            />
                        </>
                    )}
                    {buttonSwitcher === "hover" && (
                        <>
                            <ColorControl
                                label={__(
                                    "Hover Color",
                                    "essential-blocks"
                                )}
                                color={hoverBtnColor}
                                attributeName={'hoverBtnColor'}
                            />
                            <ColorControl
                                label={__(
                                    "Background Hover Color",
                                    "essential-blocks"
                                )}
                                color={hoverBtnBGColor}
                                attributeName={'hoverBtnBGColor'}
                            />
                        </>
                    )}
                    {buttonSwitcher === "disable" && (
                        <>
                            <ColorControl
                                label={__(
                                    "Color",
                                    "essential-blocks"
                                )}
                                color={btnDisableColor}
                                attributeName={'btnDisableColor'}
                            />
                            <ColorControl
                                label={__(
                                    "Background Color",
                                    "essential-blocks"
                                )}
                                color={btnDisableBGColor}
                                attributeName={'btnDisableBGColor'}
                            />
                        </>
                    )}

                    <ResponsiveDimensionsControl
                        controlName={BUTTON_PADDING}
                        baseLabel={__(
                            "Padding",
                            "essential-blocks"
                        )}
                    />
                    <BaseControl __nextHasNoMarginBottom>
                        <h3 className="eb-control-title">
                            {__(
                                "Border",
                                "essential-blocks"
                            )}
                        </h3>
                    </BaseControl>
                    <BorderShadowControl
                        controlName={BUTTON_BORDER}
                    />
                </InspectorPanel.PanelBody>
            </InspectorPanel.Style>
        </InspectorPanel >
    );
}

export default Inspector;
