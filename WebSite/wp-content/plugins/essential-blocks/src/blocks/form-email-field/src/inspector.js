/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
    ToggleControl,
    TextControl,
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
    InspectorPanel
 } from "@essential-blocks/controls";

import {
    WRAPPER_BG,
    WRAPPER_MARGIN,
    WRAPPER_PADDING,
    WRAPPER_BORDER_SHADOW,
    LABEL_MARGIN,
    FIELD_BORDER,
    FIELD_PADDING,
    ICON_SIZE,
} from "./constants";

import {
    LABEL_TYPOGRAPHY,
    FIELD_TEXT,
    FIELD_TEXT_VALIDATION,
} from "./constants/typographyPrefixConstants";

function Inspector(props) {
    const { attributes, setAttributes } = props;

    const {
        resOption,
        showLabel,
        labelText,
        fieldName,
        defaultValue,
        placeholderText,
        isRequired,
        validationMessage,
        emailValidationMessage,
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
    } = attributes;

    return (
        <>
            <InspectorPanel advancedControlProps={{
                marginPrefix: WRAPPER_MARGIN,
                paddingPrefix: WRAPPER_PADDING,
                backgroundPrefix: WRAPPER_BG,
                borderPrefix: WRAPPER_BORDER_SHADOW,
                hasMargin: true,
            }}>
                <InspectorPanel.General>
                    <InspectorPanel.PanelBody
                        title={__(
                            "General",
                            "essential-blocks"
                        )}
                        initialOpen={true}
                    >
                        <ToggleControl
                            label={__(
                                "Show Label?",
                                "essential-blocks"
                            )}
                            checked={showLabel}
                            onChange={() =>
                                setAttributes({
                                    showLabel: !showLabel,
                                })
                            }
                        />

                        {showLabel && (
                            <DynamicInputControl
                                label={__(
                                    "Label Text",
                                    "essential-blocks"
                                )}
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

                        <DynamicInputControl
                            label={__(
                                "Placeholder Text",
                                "essential-blocks"
                            )}
                            attrName="placeholderText"
                            inputValue={placeholderText}
                            setAttributes={setAttributes}
                            onChange={(text) =>
                                setAttributes({
                                    placeholderText: text,
                                })
                            }
                        />
                        <ToggleControl
                            label={__(
                                "Required?",
                                "essential-blocks"
                            )}
                            checked={isRequired}
                            onChange={() =>
                                setAttributes({
                                    isRequired: !isRequired,
                                })
                            }
                        />
                        <ToggleControl
                            label={__(
                                "Icon?",
                                "essential-blocks"
                            )}
                            checked={isIcon}
                            onChange={() =>
                                setAttributes({
                                    isIcon: !isIcon,
                                })
                            }
                        />

                        {isIcon && (
                            <>
                                <EBIconPicker
                                    value={icon}
                                    onChange={(icon) =>
                                        setAttributes({
                                            icon,
                                        })
                                    }
                                />
                            </>
                        )}
                    </InspectorPanel.PanelBody>
                    <InspectorPanel.PanelBody
                        title={__(
                            "Advanced Settings",
                            "essential-blocks"
                        )}
                        initialOpen={true}
                    >
                        <TextControl
                            label={__(
                                "Default Value",
                                "essential-blocks"
                            )}
                            value={defaultValue}
                            onChange={(text) =>
                                setAttributes({
                                    defaultValue: text,
                                })
                            }
                            help={__("Leave empty if no default value.", "essential-blocks")}
                        />
                        <TextControl
                            label={__(
                                "Field Custom Name Attribute",
                                "essential-blocks"
                            )}
                            value={fieldName}
                            onChange={(text) =>
                                setAttributes({
                                    fieldName: text,
                                })
                            }
                            help={__("This is for the name attributes which is used to submit form data, Name must be unique.", "essential-blocks")}
                        />

                        {isRequired && (
                            <TextControl
                                label={__(
                                    "Custom Validation Message",
                                    "essential-blocks"
                                )}
                                value={validationMessage}
                                onChange={(text) =>
                                    setAttributes({
                                        validationMessage: text,
                                    })
                                }
                            />
                        )}
                        <TextControl
                            label={__(
                                "Invalid Email Validation Message",
                                "essential-blocks"
                            )}
                            value={emailValidationMessage}
                            onChange={(text) =>
                                setAttributes({
                                    emailValidationMessage: text,
                                })
                            }
                        />
                    </InspectorPanel.PanelBody>
                </InspectorPanel.General>
                <InspectorPanel.Style>
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
                                LABEL_TYPOGRAPHY
                            }
                        />
                        <ColorControl
                            label={__(
                                "Color",
                                "essential-blocks"
                            )}
                            color={labelColor}
                            attributeName={'labelColor'}
                        />
                        <ColorControl
                            label={__(
                                "Requied Color",
                                "essential-blocks"
                            )}
                            color={requiredColor}
                            attributeName={'requiredColor'}
                        />
                        <ResponsiveDimensionsControl
                            controlName={LABEL_MARGIN}
                            baseLabel={__(
                                "Margin",
                                "essential-blocks"
                            )}
                        />
                    </InspectorPanel.PanelBody>
                    <InspectorPanel.PanelBody
                        title={__("Field", "essential-blocks")}
                        initialOpen={false}
                    >
                        <>
                            <TypographyDropdown
                                baseLabel={__(
                                    "Typography",
                                    "essential-blocks"
                                )}
                                typographyPrefixConstant={
                                    FIELD_TEXT
                                }
                            />

                            <ColorControl
                                label={__(
                                    "Color",
                                    "essential-blocks"
                                )}
                                color={fieldColor}
                                attributeName={'fieldColor'}
                            />
                            <ColorControl
                                label={__(
                                    "Placeholder Color",
                                    "essential-blocks"
                                )}
                                color={fieldPlaceholderColor}
                                attributeName={'fieldPlaceholderColor'}
                            />
                            <ColorControl
                                label={__(
                                    "Background",
                                    "essential-blocks"
                                )}
                                color={fieldBgColor}
                                atrributeName={'fieldBgColor'}
                            />
                            <ResponsiveDimensionsControl
                                controlName={FIELD_PADDING}
                                baseLabel={__(
                                    "Padding",
                                    "essential-blocks"
                                )}
                            />

                            <InspectorPanel.PanelBody
                                title={__(
                                    "Border",
                                    "essential-blocks"
                                )}
                                initialOpen={false}
                            >
                                <BorderShadowControl
                                    controlName={FIELD_BORDER}
                                />
                            </InspectorPanel.PanelBody>

                            <InspectorPanel.PanelBody
                                title={__(
                                    "Validation",
                                    "essential-blocks"
                                )}
                                initialOpen={false}
                            >
                                <TypographyDropdown
                                    baseLabel={__(
                                        "Typography",
                                        "essential-blocks"
                                    )}
                                    typographyPrefixConstant={
                                        FIELD_TEXT_VALIDATION
                                    }
                                />

                                <ColorControl
                                    label={__(
                                        "Color",
                                        "essential-blocks"
                                    )}
                                    color={fieldValidationColor}
                                    attributeName={'fieldValidationColor'}
                                />
                                <ColorControl
                                    label={__(
                                        "Fields Border Color",
                                        "essential-blocks"
                                    )}
                                    color={
                                        fieldValidationBorderColor
                                    }
                                    attributeName={'fieldValidationBorderColor'}
                                />
                            </InspectorPanel.PanelBody>
                        </>
                    </InspectorPanel.PanelBody>
                    {isIcon && (
                        <>
                            <InspectorPanel.PanelBody
                                title={__(
                                    "Icon",
                                    "essential-blocks"
                                )}
                                initialOpen={false}
                            >
                                <ColorControl
                                    label={__(
                                        "Color",
                                        "essential-blocks"
                                    )}
                                    color={iconColor}
                                    attributeName={'iconColor'}
                                />
                                <ResponsiveRangeController
                                    baseLabel={__(
                                        "Size (PX)",
                                        "essential-blocks"
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
