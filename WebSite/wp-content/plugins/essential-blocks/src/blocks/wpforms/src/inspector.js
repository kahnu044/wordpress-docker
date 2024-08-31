/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
    ToggleControl,
    SelectControl,
    BaseControl,
    ButtonGroup,
    Button,
    __experimentalDivider as Divider,
} from "@wordpress/components";

import objAttributes from "./attributes";

import {
    ColorControl,
    ResponsiveRangeController,
    ResponsiveDimensionsControl,
    BorderShadowControl,
    TypographyDropdown,
    InspectorPanel
} from "@essential-blocks/controls";

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
} from "./constants";
import {
    typoPrefix_label,
    typoPrefix_input,
    typoPrefix_submit_btn,
    typoPrefix_success,
    typoPrefix_error,
} from "./constants/typographyPrefixConstants";

const Inspector = ({ attributes, setAttributes }) => {
    const {
        resOption,
        // new
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
    } = attributes;

    return (
        <InspectorPanel advancedControlProps={{
            marginPrefix: FORM_MARGIN,
            paddingPrefix: FORM_PADDING,
            borderPrefix: FORM_BORDER,
            hasMargin: true,
            hasBackground: false,
        }}>
            <InspectorPanel.General>
                <>
                    <InspectorPanel.PanelBody
                        title={__(
                            "WPForms",
                            "essential-blocks"
                        )}
                        initialOpen={true}
                    >
                        <ToggleControl
                            label={__(
                                "Show Labels",
                                "essential-blocks"
                            )}
                            checked={showLabels}
                            onChange={(showLabels) =>
                                setAttributes({ showLabels })
                            }
                        />
                        <ToggleControl
                            label={__(
                                "Show Placeholder",
                                "essential-blocks"
                            )}
                            checked={showPlaceholder}
                            onChange={(showPlaceholder) =>
                                setAttributes({
                                    showPlaceholder,
                                })
                            }
                        />
                        <ToggleControl
                            label={__(
                                "Show Error Message",
                                "essential-blocks"
                            )}
                            checked={showErrorMessage}
                            onChange={(showErrorMessage) =>
                                setAttributes({
                                    showErrorMessage,
                                })
                            }
                        />
                    </InspectorPanel.PanelBody>
                </>
            </InspectorPanel.General>
            <InspectorPanel.Style>
                <>
                    <InspectorPanel.PanelBody
                        title={__("Labels", "essential-blocks")}
                        initialOpen={true}
                    >
                        <>
                            <ResponsiveDimensionsControl
                                controlName={LABEL_SPACING}
                                baseLabel={__(
                                    "Margin",
                                    "essential-blocks"
                                )}
                            />
                            <ColorControl
                                label={__(
                                    "Color",
                                    "essential-blocks"
                                )}
                                color={labelColor}
                                attributeName={'labelColor'}
                            />
                            <TypographyDropdown
                                baseLabel={__(
                                    "Typography",
                                    "essential-blocks"
                                )}
                                typographyPrefixConstant={
                                    typoPrefix_label
                                }
                            />
                        </>
                    </InspectorPanel.PanelBody>
                    <InspectorPanel.PanelBody
                        title={__(
                            "Input & Textarea",
                            "essential-blocks"
                        )}
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
                                    ].map(
                                        (
                                            { value, label },
                                            index
                                        ) => (
                                            <Button
                                                key={index}
                                                isPrimary={
                                                    inputHoverType ===
                                                    value
                                                }
                                                isSecondary={
                                                    inputHoverType !==
                                                    value
                                                }
                                                onClick={() =>
                                                    setAttributes(
                                                        {
                                                            inputHoverType: value,
                                                        }
                                                    )
                                                }
                                            >
                                                {label}
                                            </Button>
                                        )
                                    )}
                                </ButtonGroup>
                            </BaseControl>
                            {inputHoverType === "normal" && (
                                <>
                                    <ColorControl
                                        label={__(
                                            "Background Color",
                                            "essential-blocks"
                                        )}
                                        color={
                                            inputBackgroundColor
                                        }
                                        attributeName={'inputBackgroundColor'}
                                    />
                                    <ColorControl
                                        label={__(
                                            "Color",
                                            "essential-blocks"
                                        )}
                                        color={inputTextColor}
                                        attributeName={'inputTextColor'}
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
                                        color={
                                            inputFocusBackgroundColor
                                        }
                                        attributeName={'inputFocusBackgroundColor'}
                                    />
                                </>
                            )}
                            <TypographyDropdown
                                baseLabel={__(
                                    "Typography",
                                    "essential-blocks"
                                )}
                                typographyPrefixConstant={
                                    typoPrefix_input
                                }
                            />
                            <Divider />
                            <ResponsiveRangeController
                                baseLabel={__(
                                    "Text Indent",
                                    "essential-blocks"
                                )}
                                controlName={
                                    INPUT_TEXTAREA_INDENT
                                }
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
                                controlName={
                                    INPUT_TEXTAREA_PADDING
                                }
                                baseLabel={__(
                                    "Padding",
                                    "essential-blocks"
                                )}
                            />
                            <ResponsiveRangeController
                                baseLabel={__(
                                    "Spacing",
                                    "essential-blocks"
                                )}
                                controlName={
                                    INPUT_TEXTAREA_SPACING
                                }
                                min={0}
                                max={100}
                                step={1}
                            />
                        </>
                        <BaseControl>
                            <h3 className="eb-control-title">
                                {__(
                                    "Border & Shadow",
                                    "essential-blocks"
                                )}
                            </h3>
                        </BaseControl>
                        <BorderShadowControl
                            controlName={INPUT_TEXTAREA_BORDER}
                        />
                    </InspectorPanel.PanelBody>
                    <InspectorPanel.PanelBody
                        title={__(
                            "Placeholder",
                            "essential-blocks"
                        )}
                        initialOpen={false}
                    >
                        <>
                            <ColorControl
                                label={__(
                                    "Color",
                                    "essential-blocks"
                                )}
                                color={placeHolderColor}
                                attributeName={'placeHolderColor'}
                            />
                        </>
                    </InspectorPanel.PanelBody>
                    <InspectorPanel.PanelBody
                        title={__(
                            "Radio & Checkbox",
                            "essential-blocks"
                        )}
                        initialOpen={false}
                    >
                        <ToggleControl
                            label={__(
                                "Custom Style",
                                "essential-blocks"
                            )}
                            checked={customCheckboxStyle}
                            onChange={(customCheckboxStyle) =>
                                setAttributes({
                                    customCheckboxStyle,
                                })
                            }
                        />
                        {customCheckboxStyle && (
                            <>
                                <ResponsiveRangeController
                                    baseLabel={__(
                                        "Size",
                                        "essential-blocks"
                                    )}
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
                                                value:
                                                    "checked",
                                            },
                                        ].map(
                                            (
                                                {
                                                    value,
                                                    label,
                                                },
                                                index
                                            ) => (
                                                <Button
                                                    key={index}
                                                    isPrimary={
                                                        btnHoverType ===
                                                        value
                                                    }
                                                    isSecondary={
                                                        btnHoverType !==
                                                        value
                                                    }
                                                    onClick={() =>
                                                        setAttributes(
                                                            {
                                                                checkboxSwitcher: value,
                                                            }
                                                        )
                                                    }
                                                >
                                                    {label}
                                                </Button>
                                            )
                                        )}
                                    </ButtonGroup>
                                </BaseControl>
                                {checkboxSwitcher ===
                                    "normal" && (
                                        <>
                                            <ColorControl
                                                label={__(
                                                    "Color",
                                                    "essential-blocks"
                                                )}
                                                color={
                                                    checkboxColor
                                                }
                                                attributeName={'checkboxColor'}
                                            />
                                            <ResponsiveRangeController
                                                baseLabel={__(
                                                    "Border Width",
                                                    "essential-blocks"
                                                )}
                                                controlName={
                                                    CHECKBOX_BORDER
                                                }
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
                                                color={
                                                    checkboxBorderColor
                                                }
                                                attributeName={'checkboxBorderColor'}
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
                                                controlName={
                                                    CHECKBOX_RADIUS
                                                }
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
                                                controlName={
                                                    RADIO_RADIUS
                                                }
                                                baseLabel={__(
                                                    "Border Radius",
                                                    "essential-blocks"
                                                )}
                                            />
                                        </>
                                    )}
                                {checkboxSwitcher ===
                                    "checked" && (
                                        <ColorControl
                                            label={__(
                                                "Color",
                                                "essential-blocks"
                                            )}
                                            color={
                                                checkboxCheckedColor
                                            }
                                            attributeName={'checkboxCheckedColor'}
                                        />
                                    )}
                            </>
                        )}
                    </InspectorPanel.PanelBody>
                    <InspectorPanel.PanelBody
                        title={__("Submit", "essential-blocks")}
                        initialOpen={false}
                    >
                        <>
                            {btnWidthType === "custom" && (
                                <BaseControl
                                    label={__(
                                        "Alignment",
                                        "essential-blocks"
                                    )}
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
                                                        setAttributes(
                                                            {
                                                                btnAlignment:
                                                                    item.value,
                                                            }
                                                        )
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
                                label={__(
                                    "Width",
                                    "essential-blocks"
                                )}
                                value={btnWidthType}
                                options={BTN_WIDTH_STYLE}
                                onChange={(newBtnWidthType) =>
                                    setAttributes({
                                        btnWidthType: newBtnWidthType,
                                    })
                                }
                            />
                            {btnWidthType === "custom" && (
                                <ResponsiveRangeController
                                    baseLabel={__(
                                        "Width",
                                        "essential-blocks"
                                    )}
                                    controlName={
                                        SUBMIT_BUTTON_WIDTH
                                    }
                                    min={0}
                                    max={1200}
                                    step={1}
                                />
                            )}
                            <TypographyDropdown
                                baseLabel={__(
                                    "Typography",
                                    "essential-blocks"
                                )}
                                typographyPrefixConstant={
                                    typoPrefix_submit_btn
                                }
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
                                    ].map(
                                        (
                                            { value, label },
                                            index
                                        ) => (
                                            <Button
                                                key={index}
                                                isPrimary={
                                                    btnHoverType ===
                                                    value
                                                }
                                                isSecondary={
                                                    btnHoverType !==
                                                    value
                                                }
                                                onClick={() =>
                                                    setAttributes(
                                                        {
                                                            btnHoverType: value,
                                                        }
                                                    )
                                                }
                                            >
                                                {label}
                                            </Button>
                                        )
                                    )}
                                </ButtonGroup>
                            </BaseControl>
                            {btnHoverType === "normal" && (
                                <>
                                    <ColorControl
                                        label={__(
                                            "Background Color",
                                            "essential-blocks"
                                        )}
                                        color={
                                            btnBackgroundColor
                                        }
                                        attributeName={'btnBackgroundColor'}
                                    />
                                    <ColorControl
                                        label={__(
                                            "Color",
                                            "essential-blocks"
                                        )}
                                        color={btnColor}
                                        attributeName={'btnColor'}
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
                                        color={
                                            btnBackgroundHoverColor
                                        }
                                        attributeName={'btnBackgroundHoverColor'}
                                    />
                                    <ColorControl
                                        label={__(
                                            "Color",
                                            "essential-blocks"
                                        )}
                                        color={btnHoverColor}
                                        attributeName={'btnHoverColor'}
                                    />
                                </>
                            )}
                            <Divider />
                            <ResponsiveDimensionsControl
                                controlName={
                                    SUBMIT_BUTTON_PADDING
                                }
                                baseLabel={__(
                                    "Padding",
                                    "essential-blocks"
                                )}
                            />
                            <ResponsiveDimensionsControl
                                controlName={
                                    SUBMIT_BUTTON_MARGIN
                                }
                                baseLabel={__(
                                    "Margin",
                                    "essential-blocks"
                                )}
                            />
                            <BaseControl>
                                <h3 className="eb-control-title">
                                    {__(
                                        "Border & Shadow",
                                        "essential-blocks"
                                    )}
                                </h3>
                            </BaseControl>
                            <BorderShadowControl
                                controlName={
                                    SUBMIT_BUTTON_BORDER
                                }
                            />
                        </>
                    </InspectorPanel.PanelBody>
                    <InspectorPanel.PanelBody
                        title={__(
                            "Success Message",
                            "essential-blocks"
                        )}
                        initialOpen={false}
                    >
                        <ColorControl
                            label={__(
                                "Background Color",
                                "essential-blocks"
                            )}
                            color={successBackgroundColor}
                            attributeName={'successBackgroundColor'}
                        />
                        <ColorControl
                            label={__(
                                "Color",
                                "essential-blocks"
                            )}
                            color={successColor}
                            attributeName={'successColor'}
                        />
                        <TypographyDropdown
                            baseLabel={__(
                                "Typography",
                                "essential-blocks"
                            )}
                            typographyPrefixConstant={
                                typoPrefix_success
                            }
                        />
                        <BorderShadowControl
                            controlName={SUCCESS_BORDER}
                            noShadow={true}
                        />
                    </InspectorPanel.PanelBody>
                    {showErrorMessage && (
                        <InspectorPanel.PanelBody
                            title={__(
                                "Error Message",
                                "essential-blocks"
                            )}
                            initialOpen={false}
                        >
                            <ColorControl
                                label={__(
                                    "Color",
                                    "essential-blocks"
                                )}
                                color={errorColor}
                                attributeName={'errorColor'}
                            />
                            <TypographyDropdown
                                baseLabel={__(
                                    "Typography",
                                    "essential-blocks"
                                )}
                                typographyPrefixConstant={
                                    typoPrefix_error
                                }
                            />
                            <ResponsiveDimensionsControl
                                controlName={ERROR_PADDING}
                                baseLabel={__(
                                    "Padding",
                                    "essential-blocks"
                                )}
                            />
                            <ResponsiveDimensionsControl
                                controlName={ERROR_MARGIN}
                                baseLabel={__(
                                    "Margin",
                                    "essential-blocks"
                                )}
                            />
                        </InspectorPanel.PanelBody>
                    )}
                </>
            </InspectorPanel.Style>
            <InspectorPanel.Advanced>
                <>
                    <InspectorPanel.PanelBody initialOpen={true}>
                        <>
                            <ColorControl
                                label={__(
                                    "Background Color",
                                    "essential-blocks"
                                )}
                                color={formBackgroundColor}
                                attributeName={'formBackgroundColor'}
                            />
                            <BaseControl
                                label={__(
                                    "Alignment",
                                    "essential-blocks"
                                )}
                                id="eb-button-group-alignment"
                            >
                                <ButtonGroup id="eb-button-group-alignment">
                                    {FORM_ALIGNMENT.map(
                                        (item, index) => (
                                            <Button
                                                key={index}
                                                isPrimary={
                                                    formAlignment ===
                                                    item.value
                                                }
                                                isSecondary={
                                                    formAlignment !==
                                                    item.value
                                                }
                                                onClick={() =>
                                                    setAttributes(
                                                        {
                                                            formAlignment:
                                                                item.value,
                                                        }
                                                    )
                                                }
                                            >
                                                {item.label}
                                            </Button>
                                        )
                                    )}
                                </ButtonGroup>
                            </BaseControl>
                            <ResponsiveRangeController
                                baseLabel={__(
                                    "Form Max Width",
                                    "essential-blocks"
                                )}
                                controlName={FORM_MAX_WIDTH}
                                min={0}
                                max={1500}
                                step={1}
                            />
                        </>
                    </InspectorPanel.PanelBody>
                </>
            </InspectorPanel.Advanced>
        </InspectorPanel>
    );
};

export default Inspector;
