/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
    ToggleControl,
    TextControl,
    SelectControl,
} from "@wordpress/components";

/**
 * Internal dependencies
 */
import {
    BorderShadowControl,
    ColorControl,
    ResponsiveRangeController,
    ResponsiveDimensionsControl,
    TypographyDropdown,
    EBIconPicker,
    DynamicInputControl,
    InspectorPanel,
    FormConditionalLogics,
    EBTextControl
} from "@essential-blocks/controls";

import {
    WRAPPER_MARGIN,
    WRAPPER_PADDING,
    WRAPPER_BORDER_SHADOW,
    WRAPPER_BG,
    LABEL_MARGIN,
    FIELD_BORDER,
    FIELD_PADDING,
    ICON_SIZE,
    VALIDATION_TYPE,
} from "./constants";

import {
    LABEL_TYPOGRAPHY,
    FIELD_TEXT,
    FIELD_TEXT_VALIDATION,
} from "./constants/typographyPrefixConstants";

function Inspector(props) {
    const { attributes, setAttributes, clientId } = props;
    const {
        showLabel,
        labelText,
        fieldName,
        defaultValue,
        placeholderText,
        isRequired,
        validationMessage,
        numberValidationMessage,
        labelColor,
        requiredColor,
        fieldColor,
        fieldPlaceholderColor,
        fieldBgColor,
        fieldValidationColor,
        fieldValidationBorderColor,
        isIcon,
        icon,
        iconColor,
        numberLength,
        minNumber,
        maxNumber,
        numberValidationType,
        minNumberValidationMessage,
        maxNumberValidationMessage,
        numberLengthValidationMessage,
        parentBlockId
    } = attributes;

    return (
        <>
            <InspectorPanel
                advancedControlProps={{
                    marginPrefix: WRAPPER_MARGIN,
                    paddingPrefix: WRAPPER_PADDING,
                    backgroundPrefix: WRAPPER_BG,
                    borderPrefix: WRAPPER_BORDER_SHADOW,
                    hasMargin: true,
                }}
            >
                <InspectorPanel.General>
                    <InspectorPanel.PanelBody
                        title={__("General", "essential-blocks")}
                        initialOpen={true}
                    >
                        <ToggleControl
                            label={__("Show Label?", "essential-blocks")}
                            checked={showLabel}
                            onChange={() =>
                                setAttributes({
                                    showLabel: !showLabel,
                                })
                            }
                        />

                        {showLabel && (
                            // <TextControl
                            //     label={__(
                            //         "Label Text",
                            //         "essential-blocks"
                            //     )}
                            //     value={labelText}
                            //     onChange={(text) =>
                            //         setAttributes({
                            //             labelText: text,
                            //         })
                            //     }
                            // />
                            <DynamicInputControl
                                label={__("Label Text", "essential-blocks")}
                                attrName="labelText"
                                inputValue={labelText}
                                setAttributes={setAttributes}
                                onChange={(text) =>
                                    setAttributes({
                                        labelText: text,
                                    })
                                }
                            />
                        )}
                        <EBTextControl
                            label={__("Placeholder Text", "essential-blocks")}
                            value={placeholderText}
                            onChange={(text) =>
                                setAttributes({
                                    placeholderText: text,
                                })
                            }
                            enableAi={true}
                        />
                        <TextControl
                            label={__("Min Value", "essential-blocks")}
                            value={minNumber}
                            type="number"
                            onChange={(value) =>
                                setAttributes({
                                    minNumber: parseInt(value),
                                })
                            }
                        />
                        <TextControl
                            label={__("Max Value", "essential-blocks")}
                            type="number"
                            value={maxNumber}
                            onChange={(value) =>
                                setAttributes({
                                    maxNumber: parseInt(value),
                                })
                            }
                        />
                        <ToggleControl
                            label={__("Required?", "essential-blocks")}
                            checked={isRequired}
                            onChange={() =>
                                setAttributes({
                                    isRequired: !isRequired,
                                })
                            }
                        />
                        <ToggleControl
                            label={__("Icon?", "essential-blocks")}
                            checked={isIcon}
                            onChange={() =>
                                setAttributes({
                                    isIcon: !isIcon,
                                })
                            }
                        />
                        <EBIconPicker
                            value={icon}
                            onChange={(icon) =>
                                setAttributes({
                                    icon,
                                })
                            }
                        />
                    </InspectorPanel.PanelBody>
                    <InspectorPanel.PanelBody
                        title={__("Advanced Settings", "essential-blocks")}
                        initialOpen={true}
                    >
                        <EBTextControl
                            label={__("Default Value", "essential-blocks")}
                            value={defaultValue}
                            onChange={(text) =>
                                setAttributes({
                                    defaultValue: text,
                                })
                            }
                            enableAi={false}
                            help={__(
                                "Leave empty if no default value.",
                                "essential-blocks",
                            )}
                        />
                        <EBTextControl
                            label={__(
                                "Field Custom Name Attribute",
                                "essential-blocks",
                            )}
                            value={fieldName}
                            onChange={(text) =>
                                setAttributes({
                                    fieldName: text,
                                })
                            }
                            enableAi={false}
                            help={__(
                                "This is for the name attributes which is used to submit form data, Name must be unique.",
                                "essential-blocks",
                            )}
                        />

                        {isRequired && (
                            <EBTextControl
                                label={__(
                                    "Custom Validation Message",
                                    "essential-blocks",
                                )}
                                value={validationMessage}
                                onChange={(text) =>
                                    setAttributes({
                                        validationMessage: text,
                                    })
                                }
                                enableAi={true}
                            />
                        )}
                        <EBTextControl
                            label={__(
                                "Invalid Number Validation Message",
                                "essential-blocks",
                            )}
                            value={numberValidationMessage}
                            onChange={(text) =>
                                setAttributes({
                                    numberValidationMessage: text,
                                })
                            }
                            enableAi={true}
                        />
                        <SelectControl
                            label={__("Validation type", "essential-blocks")}
                            value={numberValidationType}
                            options={VALIDATION_TYPE}
                            onChange={(value) =>
                                setAttributes({ numberValidationType: value })
                            }
                        />
                        {numberValidationType === "minmax" && (
                            <>
                                <DynamicInputControl
                                    label={__(
                                        "Min number validation Message",
                                        "essential-blocks",
                                    )}
                                    attrName="minNumberValidationMessage"
                                    inputValue={minNumberValidationMessage}
                                    setAttributes={setAttributes}
                                    onChange={(text) =>
                                        setAttributes({
                                            minNumberValidationMessage: text,
                                        })
                                    }
                                />
                                <DynamicInputControl
                                    label={__(
                                        "Max number validation Message",
                                        "essential-blocks",
                                    )}
                                    attrName="maxNumberValidationMessage"
                                    inputValue={maxNumberValidationMessage}
                                    setAttributes={setAttributes}
                                    onChange={(text) =>
                                        setAttributes({
                                            maxNumberValidationMessage: text,
                                        })
                                    }
                                />
                            </>
                        )}
                        {numberValidationType === "length" && (
                            <>
                                <EBTextControl
                                    label={__("Max Length", "essential-blocks")}
                                    type="number"
                                    value={numberLength}
                                    onChange={(value) =>
                                        setAttributes({
                                            numberLength: parseInt(value),
                                        })
                                    }
                                    enableAi={false}
                                />
                                <DynamicInputControl
                                    label={__(
                                        "Number Length validation Message",
                                        "essential-blocks",
                                    )}
                                    attrName="numberLengthValidationMessage"
                                    inputValue={numberLengthValidationMessage}
                                    setAttributes={setAttributes}
                                    onChange={(text) =>
                                        setAttributes({
                                            numberLengthValidationMessage: text,
                                        })
                                    }
                                />
                            </>
                        )}
                    </InspectorPanel.PanelBody>
                    <FormConditionalLogics clientId={clientId} parentBlockId={parentBlockId} />
                </InspectorPanel.General>
                <InspectorPanel.Style>
                    <InspectorPanel.PanelBody
                        title={__("Label", "essential-blocks")}
                        initialOpen={true}
                    >
                        <TypographyDropdown
                            baseLabel={__("Typography", "essential-blocks")}
                            typographyPrefixConstant={LABEL_TYPOGRAPHY}
                        />
                        <ColorControl
                            label={__("Color", "essential-blocks")}
                            color={labelColor}
                            attributeName={"labelColor"}
                        />
                        <ColorControl
                            label={__("Requied Color", "essential-blocks")}
                            color={requiredColor}
                            attributeName={"requiredColor"}
                        />
                        <ResponsiveDimensionsControl
                            controlName={LABEL_MARGIN}
                            baseLabel={__("Margin", "essential-blocks")}
                        />
                    </InspectorPanel.PanelBody>
                    <InspectorPanel.PanelBody
                        title={__("Field", "essential-blocks")}
                        initialOpen={false}
                    >
                        <>
                            <TypographyDropdown
                                baseLabel={__("Typography", "essential-blocks")}
                                typographyPrefixConstant={FIELD_TEXT}
                            />

                            <ColorControl
                                label={__("Color", "essential-blocks")}
                                color={fieldColor}
                                attributeName={"fieldColor"}
                            />
                            <ColorControl
                                label={__(
                                    "Placeholder Color",
                                    "essential-blocks",
                                )}
                                color={fieldPlaceholderColor}
                                attributeName={"fieldPlaceholderColor"}
                            />
                            <ColorControl
                                label={__("Background", "essential-blocks")}
                                color={fieldBgColor}
                                attributeName={"fieldBgColor"}
                            />
                            <ResponsiveDimensionsControl
                                controlName={FIELD_PADDING}
                                baseLabel={__("Padding", "essential-blocks")}
                            />

                            <InspectorPanel.PanelBody
                                title={__("Border", "essential-blocks")}
                                initialOpen={false}
                            >
                                <BorderShadowControl
                                    controlName={FIELD_BORDER}
                                />
                            </InspectorPanel.PanelBody>

                            <InspectorPanel.PanelBody
                                title={__("Validation", "essential-blocks")}
                                initialOpen={false}
                            >
                                <TypographyDropdown
                                    baseLabel={__(
                                        "Typography",
                                        "essential-blocks",
                                    )}
                                    typographyPrefixConstant={
                                        FIELD_TEXT_VALIDATION
                                    }
                                />

                                <ColorControl
                                    label={__("Color", "essential-blocks")}
                                    color={fieldValidationColor}
                                    attributeName={"fieldValidationColor"}
                                />
                                <ColorControl
                                    label={__(
                                        "Fields Border Color",
                                        "essential-blocks",
                                    )}
                                    color={fieldValidationBorderColor}
                                    attributeName={"fieldValidationBorderColor"}
                                />
                            </InspectorPanel.PanelBody>
                        </>
                    </InspectorPanel.PanelBody>
                    {isIcon && (
                        <>
                            <InspectorPanel.PanelBody
                                title={__("Icon", "essential-blocks")}
                                initialOpen={false}
                            >
                                <ColorControl
                                    label={__("Color", "essential-blocks")}
                                    color={iconColor}
                                    attributeName={"iconColor"}
                                />
                                <ResponsiveRangeController
                                    baseLabel={__(
                                        "Size (PX)",
                                        "essential-blocks",
                                    )}
                                    controlName={ICON_SIZE}
                                    min={1}
                                    max={100}
                                    step={1}
                                    noUnits
                                />
                            </InspectorPanel.PanelBody>
                        </>
                    )}
                </InspectorPanel.Style>
            </InspectorPanel>
        </>
    );
}
export default Inspector;
