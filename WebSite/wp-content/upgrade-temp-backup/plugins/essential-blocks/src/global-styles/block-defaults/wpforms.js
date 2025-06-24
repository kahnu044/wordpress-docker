/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
    PanelBody,
    ToggleControl,
    SelectControl,
    BaseControl,
    ButtonGroup,
    Button,
    __experimentalDivider as Divider,
} from "@wordpress/components";
/**
 * Internal dependencies
 */
import {
    LABEL_SPACING,
    INPUT_TEXTAREA_INDENT,
    INPUT_WIDTH,
    INPUT_HEIGHT,
    TEXTAREA_WIDTH,
    TEXTAREA_HEIGHT,
    INPUT_TEXTAREA_PADDING,
    INPUT_TEXTAREA_SPACING,
    SUBMIT_BUTTON_WIDTH,
    INPUT_TEXTAREA_BORDER,
    BTN_WIDTH_STYLE,
    SUBMIT_BUTTON_POSITION,
    SUBMIT_BUTTON_PADDING,
    SUBMIT_BUTTON_MARGIN,
    SUBMIT_BUTTON_BORDER,
    SUCCESS_BORDER,
    ERROR_PADDING,
    ERROR_MARGIN,
    CHECKBOX_SIZE,
    CHECKBOX_BORDER,
    CHECKBOX_RADIUS,
    RADIO_RADIUS,
    FORM_ALIGNMENT,
    FORM_MAX_WIDTH,
    FORM_BORDER,
    FORM_PADDING,
    FORM_MARGIN,
} from "@essential-blocks/blocks/wpforms/src/constants";

import {
    typoPrefix_label,
    typoPrefix_input,
    typoPrefix_submit_btn,
    typoPrefix_success,
    typoPrefix_error,
} from "@essential-blocks/blocks/wpforms/src/constants/typographyPrefixConstants";

import objAttributes from "@essential-blocks/blocks/wpforms/src/attributes";

import {
    ColorControl,
    ResponsiveRangeController,
    ResponsiveDimensionsControl,
    BorderShadowControl,
    TypographyDropdown,
    useBlockDefaults,
    withBlockContext
} from "@essential-blocks/controls";

function Wpforms(props) {
    const { blockDefaults, setBlockDefaults, name, deviceType, handleBlockDefault } = props;



    const {
        resOption,
        showLabels,
        showPlaceholder,
        showErrorMessage,
        labelColor,
        inputHoverType,
        inputBackgroundColor,
        inputTextColor,
        inputFocusBackgroundColor,
        placeHolderColor,
        btnWidthType,
        btnAlignment,
        btnHoverType,
        btnBackgroundColor,
        btnColor,
        btnBackgroundHoverColor,
        btnHoverColor,
        successBackgroundColor,
        successColor,
        errorColor,
        customCheckboxStyle,
        checkboxSwitcher,
        checkboxColor,
        checkboxBorderColor,
        checkboxCheckedColor,
        formBackgroundColor,
        formAlignment,
    } = blockDefaults;
    const isDefaultSet = useBlockDefaults(name, blockDefaults, setBlockDefaults, objAttributes)

    return (
        <>
            {isDefaultSet && (
                <div className="eb-panel-control">
                    <PanelBody title={__("WPForms", "essential-blocks")}>
                        <ToggleControl
                            label={__("Show Labels", "essential-blocks")}
                            checked={showLabels}
                            onChange={(showLabels) =>
                                handleBlockDefault({ showLabels })
                            }
                        />
                        <ToggleControl
                            label={__("Show Placeholder", "essential-blocks")}
                            checked={showPlaceholder}
                            onChange={(showPlaceholder) =>
                                handleBlockDefault({ showPlaceholder })
                            }
                        />
                        <ToggleControl
                            label={__("Show Error Message", "essential-blocks")}
                            checked={showErrorMessage}
                            onChange={(showErrorMessage) =>
                                handleBlockDefault({ showErrorMessage })
                            }
                        />
                        <BaseControl
                            label={__("Alignment", "essential-blocks")}
                            id="eb-button-group-alignment"
                        >
                            <ButtonGroup id="eb-button-group-alignment">
                                {FORM_ALIGNMENT.map((item, index) => (
                                    <Button
                                        key={index}
                                        isPrimary={formAlignment === item.value}
                                        isSecondary={
                                            formAlignment !== item.value
                                        }
                                        onClick={() =>
                                            handleBlockDefault({
                                                formAlignment: item.value,
                                            })
                                        }
                                    >
                                        {item.label}
                                    </Button>
                                ))}
                            </ButtonGroup>
                        </BaseControl>
                        <ResponsiveRangeController
                            baseLabel={__("Form Max Width", "essential-blocks")}
                            controlName={FORM_MAX_WIDTH}
                            min={0}
                            max={1500}
                            step={1}
                        />
                    </PanelBody>
                    <PanelBody
                        title={__("Labels Style", "essential-blocks")}
                        initialOpen={false}
                    >
                        <>
                            <ResponsiveDimensionsControl
                                controlName={LABEL_SPACING}
                                baseLabel={__("Margin", "essential-blocks")}
                            />
                            <ColorControl
                                label={__("Color", "essential-blocks")}
                                color={labelColor}
                                onChange={(labelColor) =>
                                    handleBlockDefault({ labelColor })
                                }
                            />
                            <TypographyDropdown
                                baseLabel={__("Typography", "essential-blocks")}
                                typographyPrefixConstant={typoPrefix_label}
                            />
                        </>
                    </PanelBody>
                    <PanelBody
                        title={__("Input & Textarea Style", "essential-blocks")}
                        initialOpen={false}
                    >
                        <>
                            <BaseControl>
                                <ButtonGroup>
                                    {[
                                        {
                                            label: __(
                                                "NORMAL",
                                                "essential-blocks"
                                            ),
                                            value: "normal",
                                        },
                                        {
                                            label: __(
                                                "FOCUS",
                                                "essential-blocks"
                                            ),
                                            value: "focus",
                                        },
                                    ].map(({ value, label }, index) => (
                                        <Button
                                            key={index}
                                            isPrimary={inputHoverType === value}
                                            isSecondary={
                                                inputHoverType !== value
                                            }
                                            onClick={() =>
                                                handleBlockDefault({
                                                    inputHoverType: value,
                                                })
                                            }
                                        >
                                            {label}
                                        </Button>
                                    ))}
                                </ButtonGroup>
                            </BaseControl>
                            {inputHoverType === "normal" && (
                                <>
                                    <ColorControl
                                        label={__(
                                            "Background Color",
                                            "essential-blocks"
                                        )}
                                        color={inputBackgroundColor}
                                        onChange={(inputBackgroundColor) =>
                                            handleBlockDefault({
                                                inputBackgroundColor,
                                            })
                                        }
                                    />
                                    <ColorControl
                                        label={__("Color", "essential-blocks")}
                                        color={inputTextColor}
                                        onChange={(inputTextColor) =>
                                            handleBlockDefault({
                                                inputTextColor,
                                            })
                                        }
                                    />
                                </>
                            )}
                            {inputHoverType === "focus" && (
                                <>
                                    <ColorControl
                                        label={__(
                                            "Background Color",
                                            "essential-blocks"
                                        )}
                                        color={inputFocusBackgroundColor}
                                        onChange={(inputFocusBackgroundColor) =>
                                            handleBlockDefault({
                                                inputFocusBackgroundColor,
                                            })
                                        }
                                    />
                                </>
                            )}
                            <TypographyDropdown
                                baseLabel={__("Typography", "essential-blocks")}
                                typographyPrefixConstant={typoPrefix_input}
                            />
                            <Divider />
                            <ResponsiveRangeController
                                baseLabel={__(
                                    "Text Indent",
                                    "essential-blocks"
                                )}
                                controlName={INPUT_TEXTAREA_INDENT}
                                min={0}
                                max={60}
                                step={1}
                            />
                            <ResponsiveRangeController
                                baseLabel={__(
                                    "Input Width",
                                    "essential-blocks"
                                )}
                                controlName={INPUT_WIDTH}
                                min={0}
                                max={1200}
                                step={1}
                            />
                            <ResponsiveRangeController
                                baseLabel={__(
                                    "Input Height",
                                    "essential-blocks"
                                )}
                                controlName={INPUT_HEIGHT}
                                min={0}
                                max={200}
                                step={1}
                            />
                            <ResponsiveRangeController
                                baseLabel={__(
                                    "Textarea Width",
                                    "essential-blocks"
                                )}
                                controlName={TEXTAREA_WIDTH}
                                min={0}
                                max={1200}
                                step={1}
                            />
                            <ResponsiveRangeController
                                baseLabel={__(
                                    "Textarea Height",
                                    "essential-blocks"
                                )}
                                controlName={TEXTAREA_HEIGHT}
                                min={0}
                                max={400}
                                step={1}
                            />
                            <Divider />
                            <ResponsiveDimensionsControl
                                controlName={INPUT_TEXTAREA_PADDING}
                                baseLabel={__("Padding", "essential-blocks")}
                            />
                            <ResponsiveRangeController
                                baseLabel={__("Spacing", "essential-blocks")}
                                controlName={INPUT_TEXTAREA_SPACING}
                                min={0}
                                max={100}
                                step={1}
                            />
                        </>
                        <BaseControl>
                            <h3 className="eb-control-title">
                                {__("Border & Shadow", "essential-blocks")}
                            </h3>
                        </BaseControl>
                        <BorderShadowControl
                            controlName={INPUT_TEXTAREA_BORDER}
                        />
                    </PanelBody>
                    <PanelBody
                        title={__("Placeholder Style", "essential-blocks")}
                        initialOpen={false}
                    >
                        <>
                            <ColorControl
                                label={__("Color", "essential-blocks")}
                                color={placeHolderColor}
                                onChange={(placeHolderColor) =>
                                    handleBlockDefault({ placeHolderColor })
                                }
                            />
                        </>
                    </PanelBody>
                    <PanelBody
                        title={__("Radio & Checkbox Style", "essential-blocks")}
                        initialOpen={false}
                    >
                        <ToggleControl
                            label={__("Custom Style", "essential-blocks")}
                            checked={customCheckboxStyle}
                            onChange={(customCheckboxStyle) =>
                                handleBlockDefault({ customCheckboxStyle })
                            }
                        />
                        {customCheckboxStyle && (
                            <>
                                <ResponsiveRangeController
                                    baseLabel={__("Size", "essential-blocks")}
                                    controlName={CHECKBOX_SIZE}
                                    min={0}
                                    max={80}
                                    step={1}
                                />
                                <BaseControl>
                                    <ButtonGroup>
                                        {[
                                            {
                                                label: __(
                                                    "NORMAL",
                                                    "essential-blocks"
                                                ),
                                                value: "normal",
                                            },
                                            {
                                                label: __(
                                                    "CHECKED",
                                                    "essential-blocks"
                                                ),
                                                value: "checked",
                                            },
                                        ].map(({ value, label }, index) => (
                                            <Button
                                                key={index}
                                                isPrimary={
                                                    btnHoverType === value
                                                }
                                                isSecondary={
                                                    btnHoverType !== value
                                                }
                                                onClick={() =>
                                                    handleBlockDefault({
                                                        checkboxSwitcher: value,
                                                    })
                                                }
                                            >
                                                {label}
                                            </Button>
                                        ))}
                                    </ButtonGroup>
                                </BaseControl>
                                {checkboxSwitcher === "normal" && (
                                    <>
                                        <ColorControl
                                            label={__(
                                                "Color",
                                                "essential-blocks"
                                            )}
                                            color={checkboxColor}
                                            onChange={(checkboxColor) =>
                                                handleBlockDefault({
                                                    checkboxColor,
                                                })
                                            }
                                        />
                                        <ResponsiveRangeController
                                            baseLabel={__(
                                                "Border Width",
                                                "essential-blocks"
                                            )}
                                            controlName={CHECKBOX_BORDER}
                                            min={0}
                                            max={15}
                                            step={1}
                                            noUnits={true}
                                        />
                                        <ColorControl
                                            label={__(
                                                "Border Color",
                                                "essential-blocks"
                                            )}
                                            color={checkboxBorderColor}
                                            onChange={(checkboxBorderColor) =>
                                                handleBlockDefault({
                                                    checkboxBorderColor,
                                                })
                                            }
                                        />
                                        <BaseControl>
                                            <h3 className="eb-control-title">
                                                {__(
                                                    "Checkbox",
                                                    "essential-blocks"
                                                )}
                                            </h3>
                                        </BaseControl>
                                        <ResponsiveDimensionsControl
                                            controlName={CHECKBOX_RADIUS}
                                            baseLabel={__(
                                                "Border Radius",
                                                "essential-blocks"
                                            )}
                                        />

                                        <BaseControl>
                                            <h3 className="eb-control-title">
                                                {__(
                                                    "Radio Buttons",
                                                    "essential-blocks"
                                                )}
                                            </h3>
                                        </BaseControl>
                                        <ResponsiveDimensionsControl
                                            controlName={RADIO_RADIUS}
                                            baseLabel={__(
                                                "Border Radius",
                                                "essential-blocks"
                                            )}
                                        />
                                    </>
                                )}
                                {checkboxSwitcher === "checked" && (
                                    <ColorControl
                                        label={__("Color", "essential-blocks")}
                                        color={checkboxCheckedColor}
                                        onChange={(checkboxCheckedColor) =>
                                            handleBlockDefault({
                                                checkboxCheckedColor,
                                            })
                                        }
                                    />
                                )}
                            </>
                        )}
                    </PanelBody>
                    <PanelBody
                        title={__("Submit", "essential-blocks")}
                        initialOpen={false}
                    >
                        <>
                            {btnWidthType === "custom" && (
                                <BaseControl
                                    label={__("Alignment", "essential-blocks")}
                                    id="eb-button-group-alignment"
                                >
                                    <ButtonGroup id="eb-button-group-alignment">
                                        {SUBMIT_BUTTON_POSITION.map(
                                            (item, index) => (
                                                <Button
                                                    key={index}
                                                    isPrimary={
                                                        btnAlignment ===
                                                        item.value
                                                    }
                                                    isSecondary={
                                                        btnAlignment !==
                                                        item.value
                                                    }
                                                    onClick={() =>
                                                        handleBlockDefault({
                                                            btnAlignment:
                                                                item.value,
                                                        })
                                                    }
                                                >
                                                    {item.label}
                                                </Button>
                                            )
                                        )}
                                    </ButtonGroup>
                                </BaseControl>
                            )}
                            <SelectControl
                                label={__("Width", "essential-blocks")}
                                value={btnWidthType}
                                options={BTN_WIDTH_STYLE}
                                onChange={(newBtnWidthType) =>
                                    handleBlockDefault({
                                        btnWidthType: newBtnWidthType,
                                    })
                                }
                            />
                            {btnWidthType === "custom" && (
                                <ResponsiveRangeController
                                    baseLabel={__("Width", "essential-blocks")}
                                    controlName={SUBMIT_BUTTON_WIDTH}
                                    min={0}
                                    max={1200}
                                    step={1}
                                />
                            )}
                            <TypographyDropdown
                                baseLabel={__("Typography", "essential-blocks")}
                                typographyPrefixConstant={typoPrefix_submit_btn}
                            />
                            <BaseControl>
                                <ButtonGroup>
                                    {[
                                        {
                                            label: __(
                                                "NORMAL",
                                                "essential-blocks"
                                            ),
                                            value: "normal",
                                        },
                                        {
                                            label: __(
                                                "HOVER",
                                                "essential-blocks"
                                            ),
                                            value: "hover",
                                        },
                                    ].map(({ value, label }, index) => (
                                        <Button
                                            key={index}
                                            isPrimary={btnHoverType === value}
                                            isSecondary={btnHoverType !== value}
                                            onClick={() =>
                                                handleBlockDefault({
                                                    btnHoverType: value,
                                                })
                                            }
                                        >
                                            {label}
                                        </Button>
                                    ))}
                                </ButtonGroup>
                            </BaseControl>
                            {btnHoverType === "normal" && (
                                <>
                                    <ColorControl
                                        label={__(
                                            "Background Color",
                                            "essential-blocks"
                                        )}
                                        color={btnBackgroundColor}
                                        onChange={(btnBackgroundColor) =>
                                            handleBlockDefault({
                                                btnBackgroundColor,
                                            })
                                        }
                                    />
                                    <ColorControl
                                        label={__("Color", "essential-blocks")}
                                        color={btnColor}
                                        onChange={(btnColor) =>
                                            handleBlockDefault({ btnColor })
                                        }
                                    />
                                </>
                            )}
                            {btnHoverType === "hover" && (
                                <>
                                    <ColorControl
                                        label={__(
                                            "Background Color",
                                            "essential-blocks"
                                        )}
                                        color={btnBackgroundHoverColor}
                                        onChange={(btnBackgroundHoverColor) =>
                                            handleBlockDefault({
                                                btnBackgroundHoverColor,
                                            })
                                        }
                                    />
                                    <ColorControl
                                        label={__("Color", "essential-blocks")}
                                        color={btnHoverColor}
                                        onChange={(btnHoverColor) =>
                                            handleBlockDefault({
                                                btnHoverColor,
                                            })
                                        }
                                    />
                                </>
                            )}
                            <Divider />
                            <ResponsiveDimensionsControl
                                controlName={SUBMIT_BUTTON_PADDING}
                                baseLabel={__("Padding", "essential-blocks")}
                            />
                            <ResponsiveDimensionsControl
                                controlName={SUBMIT_BUTTON_MARGIN}
                                baseLabel={__("Margin", "essential-blocks")}
                            />
                            <BaseControl>
                                <h3 className="eb-control-title">
                                    {__("Border & Shadow", "essential-blocks")}
                                </h3>
                            </BaseControl>
                            <BorderShadowControl
                                controlName={SUBMIT_BUTTON_BORDER}
                            />
                        </>
                    </PanelBody>
                    <PanelBody
                        title={__("Success Message Style", "essential-blocks")}
                        initialOpen={false}
                    >
                        <ColorControl
                            label={__("Background Color", "essential-blocks")}
                            color={successBackgroundColor}
                            onChange={(successBackgroundColor) =>
                                handleBlockDefault({ successBackgroundColor })
                            }
                        />
                        <ColorControl
                            label={__("Color", "essential-blocks")}
                            color={successColor}
                            onChange={(successColor) =>
                                handleBlockDefault({ successColor })
                            }
                        />
                        <TypographyDropdown
                            baseLabel={__("Typography", "essential-blocks")}
                            typographyPrefixConstant={typoPrefix_success}
                        />
                        <BorderShadowControl
                            controlName={SUCCESS_BORDER}
                            noShadow={true}
                        />
                    </PanelBody>
                    {showErrorMessage && (
                        <PanelBody
                            title={__("Error Message", "essential-blocks")}
                            initialOpen={false}
                        >
                            <ColorControl
                                label={__("Color", "essential-blocks")}
                                color={errorColor}
                                onChange={(errorColor) =>
                                    handleBlockDefault({ errorColor })
                                }
                            />
                            <TypographyDropdown
                                baseLabel={__("Typography", "essential-blocks")}
                                typographyPrefixConstant={typoPrefix_error}
                            />
                            <ResponsiveDimensionsControl
                                controlName={ERROR_PADDING}
                                baseLabel={__("Padding", "essential-blocks")}
                            />
                            <ResponsiveDimensionsControl
                                controlName={ERROR_MARGIN}
                                baseLabel={__("Margin", "essential-blocks")}
                            />
                        </PanelBody>
                    )}
                    <PanelBody
                        title={__(
                            "Wrapper Background Color",
                            "essential-blocks"
                        )}
                        initialOpen={false}
                    >
                        <ColorControl
                            label={__("Background Color", "essential-blocks")}
                            color={formBackgroundColor}
                            onChange={(formBackgroundColor) =>
                                handleBlockDefault({ formBackgroundColor })
                            }
                        />
                    </PanelBody>
                    <PanelBody
                        title={__(
                            "Wrapper Margin & Padding",
                            "essential-blocks"
                        )}
                        initialOpen={false}
                    >
                        <>
                            <ResponsiveDimensionsControl
                                controlName={FORM_PADDING}
                                baseLabel={__("Padding", "essential-blocks")}
                            />
                            <ResponsiveDimensionsControl
                                controlName={FORM_MARGIN}
                                baseLabel={__("Margin", "essential-blocks")}
                            />
                        </>
                    </PanelBody>
                    <PanelBody
                        title={__("Wrapper Border", "essential-blocks")}
                        initialOpen={false}
                    >
                        <BorderShadowControl
                            controlName={FORM_BORDER}
                        />
                    </PanelBody>
                </div>
            )}
        </>
    );
}
export default withBlockContext(objAttributes)(Wpforms);
