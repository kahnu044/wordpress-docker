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
    __experimentalDivider as Divider,
} from "@wordpress/components";

/**
 * Internal dependencies
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
    DISPLAY_TYPES,
    btnWidth,
    quantityWidth,
    ALIGNMENT,
} from "@essential-blocks/blocks/add-to-cart/src/constants/constants";

import {
    btnTypo,
    quantityTypo,
    variableLabelTypo,
    variableFieldTypo,
    groupedNameTypo,
    regularPriceTypo,
    salePriceTypo,
} from "@essential-blocks/blocks/add-to-cart/src/constants/typographyPrefixConstants";

import objAttributes from "@essential-blocks/blocks/add-to-cart/src/attributes";

import {
    ResponsiveDimensionsControl,
    ResponsiveRangeController,
    TypographyDropdown,
    ColorControl,
    BackgroundControl,
    BorderShadowControl,
    DynamicInputControl,
    useBlockDefaults,
    withBlockContext
} from "@essential-blocks/controls";

function AddToCart(props) {
    const { blockDefaults, setBlockDefaults, name, handleBlockDefault } = props;

    const {
        showQuantity,
        cartBtnText,
        displayType,
        priceType,
        alignment,
        quantityColor,
        quantityBGColor,
        quantityActiveColor,
        quantityActiveBGColor,
        quantityActiveBorderColor,
        btnColor,
        btnBGColor,
        btnDisableColor,
        btnDisableBGColor,
        hoverBtnBGColor,
        hoverBtnColor,
        variableLabelColor,
        variableFieldColor,
        variableFieldBgColor,
        regularPriceColor,
        salePriceColor,
        buttonSwitcher,
        quantitySwitcher,
    } = blockDefaults;

    const isDefaultSet = useBlockDefaults(name, blockDefaults, setBlockDefaults, objAttributes)

    return (
        <>
            {isDefaultSet && (
                <div className="eb-panel-control">
                    <PanelBody
                        title={__("General", "essential-blocks")}
                        initialOpen={true}
                    >
                        <DynamicInputControl
                            label={__("Button Text", "essential-blocks")}
                            attrName="cartBtnText"
                            inputValue={cartBtnText}
                            setAttributes={handleBlockDefault}
                            onChange={(cartBtnText) =>
                                handleBlockDefault({ cartBtnText })
                            }
                        />
                        <ToggleControl
                            label={__("Show Quantity", "essential-blocks")}
                            checked={showQuantity}
                            onChange={() =>
                                handleBlockDefault({
                                    showQuantity: !showQuantity,
                                })
                            }
                        />
                        {showQuantity && (
                            <SelectControl
                                label={__("Display Type", "essential-blocks")}
                                value={displayType}
                                options={DISPLAY_TYPES}
                                onChange={(displayType) =>
                                    handleBlockDefault({ displayType })
                                }
                            />
                        )}
                        <BaseControl label={__("Alignment", "essential-blocks")}>
                            <ButtonGroup>
                                {ALIGNMENT.map((item, index) => (
                                    <Button
                                        key={index}
                                        isPrimary={alignment === item.value}
                                        isSecondary={alignment !== item.value}
                                        onClick={() =>
                                            handleBlockDefault({
                                                alignment: item.value,
                                            })
                                        }
                                    >
                                        {item.label}
                                    </Button>
                                ))}
                            </ButtonGroup>
                        </BaseControl>
                        <SelectControl
                            label={__("Price Type", "essential-blocks")}
                            value={priceType}
                            options={PRICE_TYPES}
                            onChange={(priceType) =>
                                handleBlockDefault({ priceType })
                            }
                        />
                    </PanelBody>

                    <PanelBody
                        title={__("Button Styles", "essential-blocks")}
                        initialOpen={false}
                    >
                        <BaseControl label={__("Button State", "essential-blocks")}>
                            <ButtonGroup>
                                <Button
                                    isPrimary={buttonSwitcher === "normal"}
                                    isSecondary={buttonSwitcher !== "normal"}
                                    onClick={() =>
                                        handleBlockDefault({
                                            buttonSwitcher: "normal",
                                        })
                                    }
                                >
                                    {__("Normal", "essential-blocks")}
                                </Button>
                                <Button
                                    isPrimary={buttonSwitcher === "hover"}
                                    isSecondary={buttonSwitcher !== "hover"}
                                    onClick={() =>
                                        handleBlockDefault({
                                            buttonSwitcher: "hover",
                                        })
                                    }
                                >
                                    {__("Hover", "essential-blocks")}
                                </Button>
                                <Button
                                    isPrimary={buttonSwitcher === "disabled"}
                                    isSecondary={buttonSwitcher !== "disabled"}
                                    onClick={() =>
                                        handleBlockDefault({
                                            buttonSwitcher: "disabled",
                                        })
                                    }
                                >
                                    {__("Disabled", "essential-blocks")}
                                </Button>
                            </ButtonGroup>
                        </BaseControl>
                        <TypographyDropdown
                            baseLabel={__("Typography", "essential-blocks")}
                            typographyPrefixConstant={btnTypo}
                        />
                        {buttonSwitcher === "normal" && (
                            <>
                                <ColorControl
                                    label={__("Text Color", "essential-blocks")}
                                    color={btnColor}
                                    attributeName={'btnColor'}
                                />
                                <ColorControl
                                    label={__("Background Color", "essential-blocks")}
                                    color={btnBGColor}
                                    attributeName={'btnBGColor'}
                                />
                            </>
                        )}
                        {buttonSwitcher === "hover" && (
                            <>
                                <ColorControl
                                    label={__("Hover Text Color", "essential-blocks")}
                                    color={hoverBtnColor}
                                    attributeName={'hoverBtnColor'}
                                />
                                <ColorControl
                                    label={__("Hover Background Color", "essential-blocks")}
                                    color={hoverBtnBGColor}
                                    attributeName={'hoverBtnBGColor'}
                                />
                            </>
                        )}
                        {buttonSwitcher === "disabled" && (
                            <>
                                <ColorControl
                                    label={__("Disabled Text Color", "essential-blocks")}
                                    color={btnDisableColor}
                                    attributeName={'btnDisableColor'}
                                />
                                <ColorControl
                                    label={__("Disabled Background Color", "essential-blocks")}
                                    color={btnDisableBGColor}
                                    attributeName={'btnDisableBGColor'}
                                />
                            </>
                        )}
                        <ResponsiveRangeController
                            baseLabel={__("Button Width", "essential-blocks")}
                            controlName={btnWidth}
                            min={0}
                            max={1000}
                            step={1}
                            units={[
                                { label: "px", value: "px" },
                                { label: "%", value: "%" },
                                { label: "em", value: "em" },
                            ]}
                            allowReset={true}
                        />
                        <ResponsiveDimensionsControl
                            controlName={BUTTON_PADDING}
                            baseLabel={__("Padding", "essential-blocks")}
                        />
                        <PanelBody
                            title={__("Border & Shadow", "essential-blocks")}
                            initialOpen={false}
                        >
                            <BorderShadowControl
                                controlName={BUTTON_BORDER}
                            />
                        </PanelBody>
                    </PanelBody>

                    {showQuantity && (
                        <PanelBody
                            title={__("Quantity Styles", "essential-blocks")}
                            initialOpen={false}
                        >
                            <BaseControl label={__("Quantity State", "essential-blocks")}>
                                <ButtonGroup>
                                    <Button
                                        isPrimary={quantitySwitcher === "normal"}
                                        isSecondary={quantitySwitcher !== "normal"}
                                        onClick={() =>
                                            handleBlockDefault({
                                                quantitySwitcher: "normal",
                                            })
                                        }
                                    >
                                        {__("Normal", "essential-blocks")}
                                    </Button>
                                    <Button
                                        isPrimary={quantitySwitcher === "active"}
                                        isSecondary={quantitySwitcher !== "active"}
                                        onClick={() =>
                                            handleBlockDefault({
                                                quantitySwitcher: "active",
                                            })
                                        }
                                    >
                                        {__("Active", "essential-blocks")}
                                    </Button>
                                </ButtonGroup>
                            </BaseControl>
                            <TypographyDropdown
                                baseLabel={__("Typography", "essential-blocks")}
                                typographyPrefixConstant={quantityTypo}
                            />
                            {quantitySwitcher === "normal" && (
                                <>
                                    <ColorControl
                                        label={__("Text Color", "essential-blocks")}
                                        color={quantityColor}
                                        attributeName={'quantityColor'}
                                    />
                                    <ColorControl
                                        label={__("Background Color", "essential-blocks")}
                                        color={quantityBGColor}
                                        attributeName={'quantityBGColor'}
                                    />
                                </>
                            )}
                            {quantitySwitcher === "active" && (
                                <>
                                    <ColorControl
                                        label={__("Active Text Color", "essential-blocks")}
                                        color={quantityActiveColor}
                                        attributeName={'quantityActiveColor'}
                                    />
                                    <ColorControl
                                        label={__("Active Background Color", "essential-blocks")}
                                        color={quantityActiveBGColor}
                                        attributeName={'quantityActiveBGColor'}
                                    />
                                    <ColorControl
                                        label={__("Active Border Color", "essential-blocks")}
                                        color={quantityActiveBorderColor}
                                        attributeName={'quantityActiveBorderColor'}
                                    />
                                </>
                            )}
                            <ResponsiveRangeController
                                baseLabel={__("Quantity Width", "essential-blocks")}
                                controlName={quantityWidth}
                                min={0}
                                max={1000}
                                step={1}
                                units={[
                                    { label: "px", value: "px" },
                                    { label: "%", value: "%" },
                                    { label: "em", value: "em" },
                                ]}
                                allowReset={true}
                            />
                            <ResponsiveDimensionsControl
                                controlName={QUANTITY_PADDING}
                                baseLabel={__("Padding", "essential-blocks")}
                            />
                            <PanelBody
                                title={__("Border & Shadow", "essential-blocks")}
                                initialOpen={false}
                            >
                                <BorderShadowControl
                                    controlName={QUANTITY_BORDER}
                                />
                            </PanelBody>
                        </PanelBody>
                    )}

                    <PanelBody
                        title={__("Variable Product Styles", "essential-blocks")}
                        initialOpen={false}
                    >
                        <TypographyDropdown
                            baseLabel={__("Label Typography", "essential-blocks")}
                            typographyPrefixConstant={variableLabelTypo}
                        />
                        <ColorControl
                            label={__("Label Color", "essential-blocks")}
                            color={variableLabelColor}
                            attributeName={'variableLabelColor'}
                        />
                        <Divider />
                        <TypographyDropdown
                            baseLabel={__("Field Typography", "essential-blocks")}
                            typographyPrefixConstant={variableFieldTypo}
                        />
                        <ColorControl
                            label={__("Field Text Color", "essential-blocks")}
                            color={variableFieldColor}
                            attributeName={'variableFieldColor'}
                        />
                        <ColorControl
                            label={__("Field Background Color", "essential-blocks")}
                            color={variableFieldBgColor}
                            attributeName={'variableFieldBgColor'}
                        />
                        <ResponsiveDimensionsControl
                            controlName={VARIABLE_FIELD_PADDING}
                            baseLabel={__("Field Padding", "essential-blocks")}
                        />
                        <PanelBody
                            title={__("Field Border & Shadow", "essential-blocks")}
                            initialOpen={false}
                        >
                            <BorderShadowControl
                                controlName={VARIABLE_FIELD_BORDER}
                            />
                        </PanelBody>
                    </PanelBody>

                    <PanelBody
                        title={__("Price Styles", "essential-blocks")}
                        initialOpen={false}
                    >
                        <TypographyDropdown
                            baseLabel={__("Regular Price Typography", "essential-blocks")}
                            typographyPrefixConstant={regularPriceTypo}
                        />
                        <ColorControl
                            label={__("Regular Price Color", "essential-blocks")}
                            color={regularPriceColor}
                            attributeName={'regularPriceColor'}
                        />
                        <Divider />
                        <TypographyDropdown
                            baseLabel={__("Sale Price Typography", "essential-blocks")}
                            typographyPrefixConstant={salePriceTypo}
                        />
                        <ColorControl
                            label={__("Sale Price Color", "essential-blocks")}
                            color={salePriceColor}
                            attributeName={'salePriceColor'}
                        />
                        <Divider />
                        <TypographyDropdown
                            baseLabel={__("Grouped Name Typography", "essential-blocks")}
                            typographyPrefixConstant={groupedNameTypo}
                        />
                    </PanelBody>

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
                            noOverlay={true}
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

export default withBlockContext(objAttributes)(AddToCart);
