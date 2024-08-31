/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useEffect, useState, useRef } from "@wordpress/element";
import { select } from "@wordpress/data";
import { applyFilters } from "@wordpress/hooks";
import {
    PanelBody,
    ToggleControl,
    Button,
    RangeControl,
    BaseControl,
    ButtonGroup,
    TextControl,
    __experimentalDivider as Divider,
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
    ProSelectControl,
    DynamicInputControl,
    EBIconPicker,
    InspectorPanel
 } from "@essential-blocks/controls";

import {
    WRAPPER_BG,
    WRAPPER_MARGIN,
    WRAPPER_PADDING,
    WRAPPER_BORDER_SHADOW,
    FORM_TYPE,
    NOTIFICATION_TYPE,
    INTEGRATIONS,
    CONFIRMATION_TYPE,
    NORMAL_HOVER,
    NORMAL_CHECKED,
    ROWS_GAP,
    BTN_PADDING,
    LABEL_MARGIN,
    BTN_BORDER,
    FIELDS_BORDER,
    FIELDS_PADDING,
    SUCCESS_PADDING,
    SUCCESS_BORDER,
    ERROR_PADDING,
    ERROR_BORDER,
    RADIO_SIZE,
    RADIO_SPACING,
    CHECKBOX_SIZE,
    CHECKBOX_SPACING,
    BUTTON_WIDTH,
    CONTENTS_ALIGNMENTS,
    FIXED_WIDTH,
    ICON_POSITION,
    ICON_SIZE,
    ICON_SPACE,
    MESSAGE_TYPE,
    TEMPLATES,
    SUBSCRIPTION_TEMPLATES,
    FORM_WIDTH,
    FORM_CUSTOM_WIDTH,
    BUTTON_STYLE,
    VERTICAL_ALIGN,
    BTN_VERTICAL_POSITION,
    BTN_HORIZONTAL_POSITION,
    INLINE_FORM_WIDTH,
    INPUT_ICON_SIZE,
    BTN_TOP_SPECING,
    FORM_STYLES,
    INPUT_WIDTH,
    SIZE_UNIT_TYPES,
} from "./constants";

import {
    LABEL_TYPOGRAPHY,
    BTN_TEXT,
    FIELDS_TEXT,
    SUCCESS_TYPO,
    ERROR_TYPO,
    RADIO_TEXT,
    CHECKBOX_TEXT,
    FIELDS_TEXT_VALIDATION,
} from "./constants/typographyPrefixConstants";

import { contactForm1, contactForm2, subscriptionForm1, subscriptionForm2, rsvpForm, blankForm } from "./helpers";

function Inspector(props) {
    const {
        attributes,
        setAttributes,
        formSettings,
        setFormSettings,
    } = props;

    const {
        resOption,
        formTitle,
        formType,
        template,
        integrations,
        notificationType,
        confirmationType,
        successMessage,
        errorMessage,
        validationErrorMessage,
        labelColor,
        buttonType,
        btnColor,
        btnHvColor,
        btnBgColor,
        btnBgHvColor,
        formWidth,
        formAlign,
        fieldsColor,
        fieldsPlaceholderColor,
        fieldsBgColor,
        messageType,
        messageAlign,
        successColor,
        successBgColor,
        errorColor,
        errorBgColor,
        radioType,
        radioColor,
        radioBgColor,
        radioBrColor,
        radioBrCheckedColor,
        radioBorder,
        checkboxType,
        checkboxColor,
        checkboxBgColor,
        checkboxBrColor,
        checkboxBrCheckedColor,
        checkboxBorder,
        dateBgColor,
        dateSelectedColor,
        fieldsValidationBorderColor,
        fieldsValidationColor,
        requiredColor,
        buttonAlign,
        buttonText,
        buttonWidth,
        btnAddIcon,
        icon,
        iconPosition,
        labelAlign,
        validationAlign,
        fieldAlign,
        formLayout,
        btnVerticalAlign,
        showInputIcon,
        showLabel,
        inputIconColor,
        formStyle,
    } = attributes;

    const [formTemplates, setFormTemplates] = useState([]);
    const formTypeRef = useRef(formType);

    useEffect(() => {
        if (formType === "contact_form") {
            setFormTemplates(TEMPLATES);
        } else if (formType === "subscription_form") {
            setFormTemplates(SUBSCRIPTION_TEMPLATES);
        }
    }, []);

    useEffect(() => {
        if (formTypeRef.current === formType) {
            return;
        }
        formTypeRef.current = formType;

        if (formType === "contact_form") {
            setFormTemplates(TEMPLATES);
            setAttributes({ template: "contact_form_1" });
        } else if (formType === "subscription_form") {
            setFormTemplates(SUBSCRIPTION_TEMPLATES);
            setAttributes({ template: "subscription_form_1" });
        }
    }, [formType]);


    const formTypeAttr = (formType, template) => {
        let formAttr;

        if (formType === "contact_form") {
            if (template === "contact_form_1") {
                formAttr = contactForm1;
            } else if (template === "contact_form_2") {
                formAttr = contactForm2;
            }

        } else if (formType === "subscription_form") {
            if (template === "subscription_form_1") {
                formAttr = subscriptionForm1;
            } else if (template === "subscription_form_2") {
                formAttr = subscriptionForm2;
            }

        } else if (formType === "rsvp_form") {
            formAttr = rsvpForm;
        } else if (formType === "blank") {
            formAttr = blankForm;
        }

        return formAttr;
    }

    const changeFormType = (selected) => {
        setAttributes({ formType: selected });

        setAttributes(formTypeAttr(formType, template));
    };
    const changeFormTemplate = (selected) => {
        setAttributes({ template: selected });

        setAttributes(formTypeAttr(formType, template));
    };

    const changeFormStyle = (selected) => {
        setAttributes({ formStyle: selected });

        if (formStyle === "form-style-modern") {
            setAttributes({
                inputIconSizeRange: "20",
                fieldsBorderHBdr_Bottom: "1",
                fieldsBorderHBdr_Left: "1",
                fieldsBorderHBdr_Right: "1",
                fieldsBorderHBdr_Top: "1",
                fieldsBorderHBdr_Unit: "px",
                fieldsBorderHborderColor: "#000",
                fieldsBorderHborderStyle: "solid",

                fieldsPaddingisLinked: false,
                fieldsPaddingUnit: "px",
                fieldsPaddingTop: "25",
                fieldsPaddingBottom: "15",
                fieldsPaddingLeft: "15",
                fieldsPaddingRight: "15",
            });

            if (
                formType === "subscription_form" &&
                template === "subscription_form_1"
            ) {
                setAttributes({
                    inputIconSizeRange: "15",
                    fieldsPaddingLeft: "20",
                    fieldsPaddingRight: "220",
                    fieldsPaddingTop: "25",
                    fieldsPaddingBottom: "25",
                    fieldsPaddingisLinked: false,
                });
            }
        } else if (formStyle === "form-style-classic") {
            setAttributes({
                inputIconSizeRange: "15",
                fieldsBorderHBdr_Bottom: "1",
                fieldsBorderHBdr_Left: "1",
                fieldsBorderHBdr_Right: "1",
                fieldsBorderHBdr_Top: "1",
                fieldsBorderHBdr_Unit: "px",
                fieldsBorderHborderColor: "",
                fieldsBorderHborderStyle: "none",
            });

            if (
                formType === "subscription_form" &&
                template === "subscription_form_1"
            ) {
                setAttributes({
                    fieldsPaddingLeft: "20",
                    fieldsPaddingRight: "220",
                    fieldsPaddingTop: "25",
                    fieldsPaddingBottom: "25",
                    fieldsPaddingisLinked: false,
                });
            } else {
                setAttributes({
                    fieldsPaddingisLinked: true,
                    fieldsPaddingUnit: "px",
                    fieldsPaddingTop: "15",
                    fieldsPaddingBottom: "15",
                    fieldsPaddingLeft: "15",
                    fieldsPaddingRight: "15",
                });
            }
        }

    };

    const handleIntegrationChange = (selected) => {
        if (selected && selected.length > 0) {
            setAttributes({
                integrations: {
                    [selected]: true,
                },
            });
        } else {
            setAttributes({
                integrations: {},
            });
        }
    };
    const handleFormStyle = (selected) => {
        setAttributes({ formLayout: selected });

        switch (selected) {
            case "inline":
                setAttributes({
                    buttonAlign: "right",
                });
                break;
            case "block":
                setAttributes({
                    buttonAlign: "left",
                });
                break;
            default:
                return false;
        }
    };

    return (
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
                        {/* <TextControl
                            label={__(
                                "Form Title",
                                "essential-blocks"
                            )}
                            value={formTitle}
                            type="string"
                            help={__(
                                "Use Title to recognize in Form Response",
                                "essential-blocks"
                            )}
                            onChange={(value) =>
                                setAttributes({
                                    formTitle: value,
                                })
                            }
                        /> */}
                        <DynamicInputControl
                            label={__(
                                "Form Title",
                                "essential-blocks"
                            )}
                            help={__(
                                "Use Title to recognize in Form Response",
                                "essential-blocks"
                            )}
                            attrName="formTitle"
                            inputValue={formTitle}
                            setAttributes={setAttributes}
                            onChange={(value) =>
                                setAttributes({
                                    formTitle: value,
                                })
                            }
                        />
                        <ProSelectControl
                            label={__(
                                "Form Type",
                                "essential-blocks"
                            )}
                            value={formType}
                            options={FORM_TYPE}
                            onChange={(selected) =>
                                changeFormType(selected)
                            }
                        />
                        {['contact_form', 'subscription_form'].includes(formType) && (
                            <ProSelectControl
                                label={__(
                                    "Template",
                                    "essential-blocks"
                                )}
                                value={template}
                                options={formTemplates}
                                onChange={(selected) =>
                                    changeFormTemplate(selected)
                                }
                            />
                        )}
                        {"Desktop" === resOption && (
                            <>
                                <ProSelectControl
                                    label={__(
                                        "Form Styles",
                                        "essential-blocks"
                                    )}
                                    value={formStyle}
                                    options={FORM_STYLES}
                                    onChange={(selected) =>
                                        changeFormStyle(
                                            selected
                                        )
                                    }
                                />
                            </>
                        )}

                        <ToggleControl
                            label={__(
                                "Show Field Labels?",
                                "essential-blocks"
                            )}
                            checked={showLabel}
                            onChange={() =>
                                setAttributes({
                                    showLabel: !showLabel,
                                })
                            }
                        />
                        <ToggleControl
                            label={__(
                                "Show Field Icons?",
                                "essential-blocks"
                            )}
                            checked={showInputIcon}
                            onChange={() =>
                                setAttributes({
                                    showInputIcon: !showInputIcon,
                                })
                            }
                        />

                        <ProSelectControl
                            label={__(
                                "Integrations",
                                "essential-blocks"
                            )}
                            value={Object.keys(integrations)[0]}
                            options={INTEGRATIONS}
                            onChange={(selected) =>
                                handleIntegrationChange(
                                    selected
                                )
                            }
                        />

                        {applyFilters(
                            "eb_form_block_control_after_form_type",
                            "",
                            attributes,
                            setAttributes
                        )}
                    </InspectorPanel.PanelBody>
                    <InspectorPanel.PanelBody
                        title={__(
                            "Form Settings",
                            "essential-blocks"
                        )}
                        initialOpen={true}
                    >
                        <ProSelectControl
                            label={__(
                                "Notification Type",
                                "essential-blocks"
                            )}
                            value={notificationType}
                            options={NOTIFICATION_TYPE}
                            onChange={(selected) =>
                                setAttributes({
                                    notificationType: selected,
                                })
                            }
                        />
                        <TextControl
                            label={__(
                                "Email To",
                                "essential-blocks"
                            )}
                            value={formSettings.mailTo}
                            placeholder={
                                select("core")?.getSite()
                                    ?.email ||
                                __(
                                    "Default is to Admin Email",
                                    "essential-blocks"
                                )
                            }
                            onChange={(text) => {
                                setFormSettings({
                                    ...formSettings,
                                    mailTo: text,
                                })
                            }
                            }
                            help={__(
                                "Use commas to separate emails",
                                "essential-blocks"
                            )}
                        />
                        <TextControl
                            label={__(
                                "Email Cc (Optional)",
                                "essential-blocks"
                            )}
                            placeholder={__(
                                "Recipient Email Address",
                                "essential-blocks"
                            )}
                            value={formSettings.mailCc}
                            onChange={(text) =>
                                setFormSettings({
                                    ...formSettings,
                                    mailCc: text,
                                })
                            }
                            help={__(
                                "Use commas to separate emails",
                                "essential-blocks"
                            )}
                        />
                        <TextControl
                            label={__(
                                "Email Bcc (Optional)",
                                "essential-blocks"
                            )}
                            value={formSettings.mailBcc}
                            placeholder={__(
                                "Recipient Email Address",
                                "essential-blocks"
                            )}
                            onChange={(text) =>
                                setFormSettings({
                                    ...formSettings,
                                    mailBcc: text,
                                })
                            }
                            help={__(
                                "Use commas to separate emails",
                                "essential-blocks"
                            )}
                        />
                        <TextControl
                            label={__(
                                "Email Subject",
                                "essential-blocks"
                            )}
                            attrName="mailSubject"
                            value={formSettings.mailSubject}
                            placeholder={
                                "New Form Submission [" +
                                select("core")?.getSite()?.url +
                                "]"
                            }
                            onChange={(text) =>
                                setFormSettings({
                                    ...formSettings,
                                    mailSubject: text,
                                })
                            }
                        />
                    </InspectorPanel.PanelBody>
                    <InspectorPanel.PanelBody
                        title={__(
                            "Confirmation Settings",
                            "essential-blocks"
                        )}
                        initialOpen={true}
                    >
                        <ProSelectControl
                            label={__(
                                "Confirmation Type",
                                "essential-blocks"
                            )}
                            value={confirmationType}
                            options={CONFIRMATION_TYPE}
                            onChange={(selected) =>
                                setAttributes({
                                    confirmationType: selected,
                                })
                            }
                        />
                        {applyFilters(
                            "eb_form_block_control_after_confirmation_type",
                            "",
                            attributes,
                            setAttributes
                        )}

                        {confirmationType === "message" && (
                            <>
                                <DynamicInputControl
                                    label={__("Success Message", "essential-blocks")}
                                    attrName="successMessage"
                                    inputValue={successMessage}
                                    setAttributes={setAttributes}
                                    onChange={(text) =>
                                        setAttributes({
                                            successMessage: text,
                                        })
                                    }
                                    isTextarea={true}
                                />
                                <DynamicInputControl
                                    label={__("Default Error Message", "essential-blocks")}
                                    attrName="errorMessage"
                                    inputValue={errorMessage}
                                    setAttributes={setAttributes}
                                    onChange={(text) =>
                                        setAttributes({
                                            errorMessage: text,
                                        })
                                    }
                                    isTextarea={true}
                                />
                                {/* <TextareaControl
                                    label="Default Error Message"
                                    // help="Write your email body here"
                                    value={errorMessage}
                                    rows={3}
                                    onChange={(text) =>
                                        setAttributes({
                                            errorMessage: text,
                                        })
                                    }
                                /> */}
                            </>
                        )}
                        <DynamicInputControl
                            label={__("Validation Error Message", "essential-blocks")}
                            attrName="validationErrorMessage"
                            inputValue={validationErrorMessage}
                            setAttributes={setAttributes}
                            onChange={(text) =>
                                setAttributes({
                                    validationErrorMessage: text,
                                })
                            }
                            isTextarea={true}
                        />
                        {/* <TextareaControl
                            label="Validation Error Message"
                            // help="Write your email body here"
                            value={validationErrorMessage}
                            rows={3}
                            onChange={(text) =>
                                setAttributes({
                                    validationErrorMessage: text,
                                })
                            }
                        /> */}
                    </InspectorPanel.PanelBody>
                    <InspectorPanel.PanelBody
                        title={__("Button", "essential-blocks")}
                        initialOpen={false}
                    >
                        <>
                            <ProSelectControl
                                label={__(
                                    "Button Type",
                                    "essential-blocks"
                                )}
                                value={formLayout}
                                options={BUTTON_STYLE}
                                onChange={(selected) =>
                                    handleFormStyle(selected)
                                }
                            />

                            {formLayout == "inline" && (
                                <>
                                    <ResponsiveRangeController
                                        baseLabel={__(
                                            "Fields Width (%)",
                                            "essential-blocks"
                                        )}
                                        controlName={
                                            INLINE_FORM_WIDTH
                                        }
                                        min={1}
                                        max={100}
                                        step={1}
                                        noUnits
                                    />
                                </>
                            )}

                            {/* <TextControl
                                label={__(
                                    "Text",
                                    "essential-blocks"
                                )}
                                value={buttonText}
                                onChange={(buttonText) =>
                                    setAttributes({
                                        buttonText,
                                    })
                                }
                            /> */}
                            <DynamicInputControl
                                label={__(
                                    "Text",
                                    "essential-blocks"
                                )}
                                attrName="buttonText"
                                inputValue={buttonText}
                                setAttributes={setAttributes}
                                onChange={(buttonText) =>
                                    setAttributes({
                                        buttonText,
                                    })
                                }
                            />
                            <ToggleControl
                                label={__(
                                    "Add icon",
                                    "essential-blocks"
                                )}
                                checked={btnAddIcon}
                                onChange={() =>
                                    setAttributes({
                                        btnAddIcon: !btnAddIcon,
                                    })
                                }
                            />
                            {btnAddIcon && (
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
                        </>
                    </InspectorPanel.PanelBody>
                </InspectorPanel.General>
                <InspectorPanel.Style>
                    <InspectorPanel.PanelBody
                        title={__("Form", "essential-blocks")}
                        initialOpen={true}
                    >
                        <ResponsiveRangeController
                            baseLabel={__(
                                "Fields Gap (PX)",
                                "essential-blocks"
                            )}
                            controlName={ROWS_GAP}
                            min={0}
                            max={100}
                            step={1}
                            noUnits
                        />
                        <BaseControl
                            label={__(
                                "Width",
                                "essential-blocks"
                            )}
                        >
                            <ButtonGroup id="eb-button-group-alignment">
                                {FORM_WIDTH.map(
                                    (item, index) => (
                                        <Button
                                            key={index}
                                            isPrimary={
                                                formWidth ===
                                                item.value
                                            }
                                            isSecondary={
                                                formWidth !==
                                                item.value
                                            }
                                            onClick={() =>
                                                setAttributes({
                                                    formWidth:
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

                        {formWidth === "fixed" && (
                            <>
                                <ResponsiveRangeController
                                    baseLabel={__(
                                        "Fixed Width",
                                        "essential-blocks"
                                    )}
                                    controlName={
                                        FORM_CUSTOM_WIDTH
                                    }
                                    min={200}
                                    max={2000}
                                    step={10}
                                />

                                <BaseControl
                                    label={__(
                                        "Alignment",
                                        "essential-blocks"
                                    )}
                                >
                                    <ButtonGroup id="eb-button-group-alignment">
                                        {CONTENTS_ALIGNMENTS.map(
                                            (item, index) => (
                                                <Button
                                                    key={index}
                                                    isPrimary={
                                                        formAlign ===
                                                        item.value
                                                    }
                                                    isSecondary={
                                                        formAlign !==
                                                        item.value
                                                    }
                                                    onClick={() =>
                                                        setAttributes(
                                                            {
                                                                formAlign:
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
                            </>
                        )}
                    </InspectorPanel.PanelBody>
                    {showLabel && (
                        <InspectorPanel.PanelBody
                            title={__(
                                "Labels",
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
                                    LABEL_TYPOGRAPHY
                                }
                            />
                            <ColorControl
                                label={__(
                                    "Color",
                                    "essential-blocks"
                                )}
                                color={labelColor}
                                onChange={(labelColor) =>
                                    setAttributes({
                                        labelColor,
                                    })
                                }
                            />
                            <ColorControl
                                label={__(
                                    "Requied Color",
                                    "essential-blocks"
                                )}
                                color={requiredColor}
                                onChange={(requiredColor) =>
                                    setAttributes({
                                        requiredColor,
                                    })
                                }
                            />
                            <BaseControl
                                label={__(
                                    "Alignment",
                                    "essential-blocks"
                                )}
                            >
                                <ButtonGroup id="eb-button-group-alignment">
                                    {CONTENTS_ALIGNMENTS.map(
                                        (item, index) => (
                                            <Button
                                                key={index}
                                                isPrimary={
                                                    labelAlign ===
                                                    item.value
                                                }
                                                isSecondary={
                                                    labelAlign !==
                                                    item.value
                                                }
                                                onClick={() =>
                                                    setAttributes(
                                                        {
                                                            labelAlign:
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
                            <ResponsiveDimensionsControl
                                controlName={LABEL_MARGIN}
                                baseLabel={__(
                                    "Margin",
                                    "essential-blocks"
                                )}
                            />
                        </InspectorPanel.PanelBody>
                    )}
                    {showInputIcon && (
                        <>
                            <InspectorPanel.PanelBody
                                title={__(
                                    "Fields Icon",
                                    "essential-blocks"
                                )}
                                initialOpen={false}
                            >
                                <ColorControl
                                    label={__(
                                        "Color",
                                        "essential-blocks"
                                    )}
                                    color={inputIconColor}
                                    onChange={(
                                        inputIconColor
                                    ) =>
                                        setAttributes({
                                            inputIconColor,
                                        })
                                    }
                                />
                                <ResponsiveRangeController
                                    baseLabel={__(
                                        "Size (PX)",
                                        "essential-blocks"
                                    )}
                                    controlName={
                                        INPUT_ICON_SIZE
                                    }
                                    min={1}
                                    max={100}
                                    step={1}
                                    noUnits
                                />
                            </InspectorPanel.PanelBody>
                        </>
                    )}

                    <InspectorPanel.PanelBody
                        title={__(
                            "Input Fields",
                            "essential-blocks"
                        )}
                        initialOpen={false}
                    >
                        <>
                            <TypographyDropdown
                                baseLabel={__(
                                    "Typography",
                                    "essential-blocks"
                                )}
                                typographyPrefixConstant={
                                    FIELDS_TEXT
                                }
                            />

                            <ColorControl
                                label={__(
                                    "Color",
                                    "essential-blocks"
                                )}
                                color={fieldsColor}
                                onChange={(fieldsColor) =>
                                    setAttributes({
                                        fieldsColor,
                                    })
                                }
                            />
                            <ColorControl
                                label={__(
                                    "Placeholder Color",
                                    "essential-blocks"
                                )}
                                color={fieldsPlaceholderColor}
                                onChange={(
                                    fieldsPlaceholderColor
                                ) =>
                                    setAttributes({
                                        fieldsPlaceholderColor,
                                    })
                                }
                            />
                            <ColorControl
                                label={__(
                                    "Background",
                                    "essential-blocks"
                                )}
                                color={fieldsBgColor}
                                onChange={(fieldsBgColor) =>
                                    setAttributes({
                                        fieldsBgColor,
                                    })
                                }
                            />

                            <ResponsiveRangeController
                                baseLabel={__(
                                    "Width (%)",
                                    "essential-blocks"
                                )}
                                controlName={INPUT_WIDTH}
                                min={1}
                                max={100}
                                step={1}
                                units={SIZE_UNIT_TYPES}
                            />

                            <BaseControl
                                label={__(
                                    "Alignment",
                                    "essential-blocks"
                                )}
                            >
                                <ButtonGroup id="eb-button-group-alignment">
                                    {CONTENTS_ALIGNMENTS.map(
                                        (item, index) => (
                                            <Button
                                                key={index}
                                                isPrimary={
                                                    fieldAlign ===
                                                    item.value
                                                }
                                                isSecondary={
                                                    fieldAlign !==
                                                    item.value
                                                }
                                                onClick={() =>
                                                    setAttributes(
                                                        {
                                                            fieldAlign:
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
                            <ResponsiveDimensionsControl
                                controlName={FIELDS_PADDING}
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
                                    controlName={FIELDS_BORDER}
                                />
                            </InspectorPanel.PanelBody>
                        </>
                    </InspectorPanel.PanelBody>
                    <InspectorPanel.PanelBody
                        title={__(
                            "Checkbox Fields",
                            "essential-blocks"
                        )}
                        initialOpen={false}
                    >
                        <>
                            <TypographyDropdown
                                baseLabel={__(
                                    "Typography",
                                    "essential-blocks"
                                )}
                                typographyPrefixConstant={
                                    CHECKBOX_TEXT
                                }
                            />

                            <ColorControl
                                label={__(
                                    "Color",
                                    "essential-blocks"
                                )}
                                color={checkboxColor}
                                onChange={(checkboxColor) =>
                                    setAttributes({
                                        checkboxColor,
                                    })
                                }
                            />
                            <ColorControl
                                label={__(
                                    "Background",
                                    "essential-blocks"
                                )}
                                color={checkboxBgColor}
                                onChange={(checkboxBgColor) =>
                                    setAttributes({
                                        checkboxBgColor,
                                    })
                                }
                            />
                            <ResponsiveRangeController
                                baseLabel={__(
                                    "Size (PX)",
                                    "essential-blocks"
                                )}
                                controlName={CHECKBOX_SIZE}
                                min={1}
                                max={100}
                                step={1}
                                noUnits
                            />
                            <RangeControl
                                label={__(
                                    "Border Width",
                                    "essential-blocks"
                                )}
                                value={checkboxBorder}
                                onChange={(checkboxBorder) =>
                                    setAttributes({
                                        checkboxBorder,
                                    })
                                }
                                min={1}
                                max={5}
                                step={1}
                                allowReset={true}
                            />

                            <ButtonGroup className="eb-inspector-btn-group">
                                {NORMAL_CHECKED.map(
                                    (item, index) => (
                                        <Button
                                            key={index}
                                            isPrimary={
                                                checkboxType ===
                                                item.value
                                            }
                                            isSecondary={
                                                checkboxType !==
                                                item.value
                                            }
                                            onClick={() =>
                                                setAttributes({
                                                    checkboxType:
                                                        item.value,
                                                })
                                            }
                                        >
                                            {item.label}
                                        </Button>
                                    )
                                )}
                            </ButtonGroup>

                            {checkboxType === "normal" && (
                                <>
                                    <ColorControl
                                        label={__(
                                            "Border Color",
                                            "essential-blocks"
                                        )}
                                        color={checkboxBrColor}
                                        onChange={(
                                            checkboxBrColor
                                        ) =>
                                            setAttributes({
                                                checkboxBrColor,
                                            })
                                        }
                                    />
                                </>
                            )}
                            {checkboxType === "checked" && (
                                <>
                                    <ColorControl
                                        label={__(
                                            "Border Color",
                                            "essential-blocks"
                                        )}
                                        color={
                                            checkboxBrCheckedColor
                                        }
                                        onChange={(
                                            checkboxBrCheckedColor
                                        ) =>
                                            setAttributes({
                                                checkboxBrCheckedColor,
                                            })
                                        }
                                    />
                                </>
                            )}

                            <ResponsiveRangeController
                                baseLabel={__(
                                    "Spacing (PX)",
                                    "essential-blocks"
                                )}
                                controlName={CHECKBOX_SPACING}
                                min={1}
                                max={100}
                                step={1}
                                noUnits
                            />
                        </>
                    </InspectorPanel.PanelBody>
                    <InspectorPanel.PanelBody
                        title={__(
                            "Radio Fields",
                            "essential-blocks"
                        )}
                        initialOpen={false}
                    >
                        <>
                            <TypographyDropdown
                                baseLabel={__(
                                    "Typography",
                                    "essential-blocks"
                                )}
                                typographyPrefixConstant={
                                    RADIO_TEXT
                                }
                            />

                            <ColorControl
                                label={__(
                                    "Color",
                                    "essential-blocks"
                                )}
                                color={radioColor}
                                onChange={(radioColor) =>
                                    setAttributes({
                                        radioColor,
                                    })
                                }
                            />
                            <ColorControl
                                label={__(
                                    "Background",
                                    "essential-blocks"
                                )}
                                color={radioBgColor}
                                onChange={(radioBgColor) =>
                                    setAttributes({
                                        radioBgColor,
                                    })
                                }
                            />
                            <ResponsiveRangeController
                                baseLabel={__(
                                    "Size (PX)",
                                    "essential-blocks"
                                )}
                                controlName={RADIO_SIZE}
                                min={1}
                                max={100}
                                step={1}
                                noUnits
                            />
                            <RangeControl
                                label={__(
                                    "Border Width",
                                    "essential-blocks"
                                )}
                                value={radioBorder}
                                onChange={(radioBorder) =>
                                    setAttributes({
                                        radioBorder,
                                    })
                                }
                                min={1}
                                max={5}
                                step={1}
                                allowReset={true}
                            />

                            <ButtonGroup className="eb-inspector-btn-group">
                                {NORMAL_CHECKED.map(
                                    (item, index) => (
                                        <Button
                                            key={index}
                                            isPrimary={
                                                radioType ===
                                                item.value
                                            }
                                            isSecondary={
                                                radioType !==
                                                item.value
                                            }
                                            onClick={() =>
                                                setAttributes({
                                                    radioType:
                                                        item.value,
                                                })
                                            }
                                        >
                                            {item.label}
                                        </Button>
                                    )
                                )}
                            </ButtonGroup>

                            {radioType === "normal" && (
                                <>
                                    <ColorControl
                                        label={__(
                                            "Border Color",
                                            "essential-blocks"
                                        )}
                                        color={radioBrColor}
                                        onChange={(
                                            radioBrColor
                                        ) =>
                                            setAttributes({
                                                radioBrColor,
                                            })
                                        }
                                    />
                                </>
                            )}
                            {radioType === "checked" && (
                                <>
                                    <ColorControl
                                        label={__(
                                            "Border Color",
                                            "essential-blocks"
                                        )}
                                        color={
                                            radioBrCheckedColor
                                        }
                                        onChange={(
                                            radioBrCheckedColor
                                        ) =>
                                            setAttributes({
                                                radioBrCheckedColor,
                                            })
                                        }
                                    />
                                </>
                            )}

                            <ResponsiveRangeController
                                baseLabel={__(
                                    "Spacing (PX)",
                                    "essential-blocks"
                                )}
                                controlName={RADIO_SPACING}
                                min={1}
                                max={100}
                                step={1}
                                noUnits
                            />
                        </>
                    </InspectorPanel.PanelBody>
                    <InspectorPanel.PanelBody
                        title={__(
                            "Date Fields",
                            "essential-blocks"
                        )}
                        initialOpen={false}
                    >
                        <>
                            <ColorControl
                                label={__(
                                    "Selected Color",
                                    "essential-blocks"
                                )}
                                color={dateSelectedColor}
                                onChange={(dateSelectedColor) =>
                                    setAttributes({
                                        dateSelectedColor,
                                    })
                                }
                            />
                            <ColorControl
                                label={__(
                                    "Selected Background",
                                    "essential-blocks"
                                )}
                                color={dateBgColor}
                                onChange={(dateBgColor) =>
                                    setAttributes({
                                        dateBgColor,
                                    })
                                }
                            />
                        </>
                    </InspectorPanel.PanelBody>
                    <InspectorPanel.PanelBody
                        title={__("Button", "essential-blocks")}
                        initialOpen={false}
                    >
                        <BaseControl
                            label={__(
                                "Alignment",
                                "essential-blocks"
                            )}
                        >
                            <ButtonGroup id="eb-button-group-alignment">
                                {CONTENTS_ALIGNMENTS.map(
                                    (item, index) => (
                                        <Button
                                            key={index}
                                            isPrimary={
                                                buttonAlign ===
                                                item.value
                                            }
                                            isSecondary={
                                                buttonAlign !==
                                                item.value
                                            }
                                            onClick={() =>
                                                setAttributes({
                                                    buttonAlign:
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
                        {formLayout == "inline" && (
                            <>
                                <BaseControl
                                    label={__(
                                        "Vertical Align",
                                        "essential-blocks"
                                    )}
                                >
                                    <ButtonGroup>
                                        {VERTICAL_ALIGN.map(
                                            (item) => (
                                                <Button
                                                    // isLarge
                                                    isPrimary={
                                                        btnVerticalAlign ===
                                                        item.value
                                                    }
                                                    isSecondary={
                                                        btnVerticalAlign !==
                                                        item.value
                                                    }
                                                    onClick={() =>
                                                        setAttributes(
                                                            {
                                                                btnVerticalAlign:
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

                                <Divider />

                                <ResponsiveRangeController
                                    baseLabel={__(
                                        "Vertical Position",
                                        "essential-blocks"
                                    )}
                                    controlName={
                                        BTN_VERTICAL_POSITION
                                    }
                                    min={-500}
                                    max={500}
                                    step={1}
                                />
                                <ResponsiveRangeController
                                    baseLabel={__(
                                        "Horizontal Position",
                                        "essential-blocks"
                                    )}
                                    controlName={
                                        BTN_HORIZONTAL_POSITION
                                    }
                                    min={0}
                                    max={500}
                                    step={1}
                                />
                            </>
                        )}
                        <BaseControl
                            label={__(
                                "Width",
                                "essential-blocks"
                            )}
                        >
                            <ButtonGroup id="eb-button-group-alignment">
                                {BUTTON_WIDTH.map(
                                    (item, index) => (
                                        <Button
                                            key={index}
                                            isPrimary={
                                                buttonWidth ===
                                                item.value
                                            }
                                            isSecondary={
                                                buttonWidth !==
                                                item.value
                                            }
                                            onClick={() =>
                                                setAttributes({
                                                    buttonWidth:
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
                        {buttonWidth === "fixed" && (
                            <ResponsiveRangeController
                                baseLabel={__(
                                    "Fixed Width",
                                    "essential-blocks"
                                )}
                                controlName={FIXED_WIDTH}
                                min={100}
                                max={900}
                                step={1}
                            />
                        )}

                        <>
                            <TypographyDropdown
                                baseLabel={__(
                                    "Typography",
                                    "essential-blocks"
                                )}
                                typographyPrefixConstant={
                                    BTN_TEXT
                                }
                            />
                            <ButtonGroup className="eb-inspector-btn-group">
                                {NORMAL_HOVER.map(
                                    (item, index) => (
                                        <Button
                                            key={index}
                                            isPrimary={
                                                buttonType ===
                                                item.value
                                            }
                                            isSecondary={
                                                buttonType !==
                                                item.value
                                            }
                                            onClick={() =>
                                                setAttributes({
                                                    buttonType:
                                                        item.value,
                                                })
                                            }
                                        >
                                            {item.label}
                                        </Button>
                                    )
                                )}
                            </ButtonGroup>

                            {buttonType === "normal" && (
                                <>
                                    <ColorControl
                                        label={__(
                                            "Color",
                                            "essential-blocks"
                                        )}
                                        color={btnColor}
                                        onChange={(btnColor) =>
                                            setAttributes({
                                                btnColor,
                                            })
                                        }
                                    />
                                    <ColorControl
                                        label={__(
                                            "Background",
                                            "essential-blocks"
                                        )}
                                        color={btnBgColor}
                                        onChange={(
                                            btnBgColor
                                        ) =>
                                            setAttributes({
                                                btnBgColor,
                                            })
                                        }
                                    />
                                </>
                            )}

                            {buttonType === "hover" && (
                                <>
                                    <ColorControl
                                        label={__(
                                            "Color",
                                            "essential-blocks"
                                        )}
                                        color={btnHvColor}
                                        onChange={(
                                            btnHvColor
                                        ) =>
                                            setAttributes({
                                                btnHvColor,
                                            })
                                        }
                                    />
                                    <ColorControl
                                        label={__(
                                            "Background",
                                            "essential-blocks"
                                        )}
                                        color={btnBgHvColor}
                                        onChange={(
                                            btnBgHvColor
                                        ) =>
                                            setAttributes({
                                                btnBgHvColor,
                                            })
                                        }
                                    />
                                </>
                            )}

                            <ResponsiveDimensionsControl
                                controlName={BTN_PADDING}
                                baseLabel={__(
                                    "Padding",
                                    "essential-blocks"
                                )}
                            />

                            {formLayout == "block" && (
                                <ResponsiveRangeController
                                    baseLabel={__(
                                        "Margin Top (PX)",
                                        "essential-blocks"
                                    )}
                                    controlName={
                                        BTN_TOP_SPECING
                                    }
                                    min={0}
                                    max={500}
                                    step={1}
                                    noUnits
                                />
                            )}

                            <InspectorPanel.PanelBody
                                title={__(
                                    "Border",
                                    "essential-blocks"
                                )}
                                initialOpen={false}
                            >
                                <BorderShadowControl
                                    controlName={BTN_BORDER}
                                />
                            </InspectorPanel.PanelBody>
                        </>

                        {btnAddIcon && (
                            <>
                                <Divider />
                                <BaseControl
                                    label={__(
                                        "Icon Postion",
                                        "essential-blocks"
                                    )}
                                >
                                    <ButtonGroup id="eb-button-group-alignment">
                                        {ICON_POSITION.map(
                                            (item, index) => (
                                                <Button
                                                    key={index}
                                                    isPrimary={
                                                        iconPosition ===
                                                        item.value
                                                    }
                                                    isSecondary={
                                                        iconPosition !==
                                                        item.value
                                                    }
                                                    onClick={() =>
                                                        setAttributes(
                                                            {
                                                                iconPosition:
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
                                        "Size",
                                        "essential-blocks"
                                    )}
                                    controlName={ICON_SIZE}
                                    noUnits={true}
                                />
                                <ResponsiveRangeController
                                    baseLabel={__(
                                        "Gap",
                                        "essential-blocks"
                                    )}
                                    controlName={ICON_SPACE}
                                    noUnits={true}
                                />
                            </>
                        )}
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
                                FIELDS_TEXT_VALIDATION
                            }
                        />

                        <ColorControl
                            label={__(
                                "Color",
                                "essential-blocks"
                            )}
                            color={fieldsValidationColor}
                            onChange={(fieldsValidationColor) =>
                                setAttributes({
                                    fieldsValidationColor,
                                })
                            }
                        />
                        <ColorControl
                            label={__(
                                "Fields Border Color",
                                "essential-blocks"
                            )}
                            color={fieldsValidationBorderColor}
                            onChange={(
                                fieldsValidationBorderColor
                            ) =>
                                setAttributes({
                                    fieldsValidationBorderColor,
                                })
                            }
                        />
                        <BaseControl
                            label={__(
                                "Alignment",
                                "essential-blocks"
                            )}
                        >
                            <ButtonGroup id="eb-button-group-alignment">
                                {CONTENTS_ALIGNMENTS.map(
                                    (item, index) => (
                                        <Button
                                            key={index}
                                            isPrimary={
                                                validationAlign ===
                                                item.value
                                            }
                                            isSecondary={
                                                validationAlign !==
                                                item.value
                                            }
                                            onClick={() =>
                                                setAttributes({
                                                    validationAlign:
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
                    </InspectorPanel.PanelBody>
                    <InspectorPanel.PanelBody
                        title={__(
                            "Message",
                            "essential-blocks"
                        )}
                        initialOpen={false}
                    >
                        <BaseControl
                            label={__(
                                "Alignment",
                                "essential-blocks"
                            )}
                        >
                            <ButtonGroup id="eb-button-group-alignment">
                                {CONTENTS_ALIGNMENTS.map(
                                    (item, index) => (
                                        <Button
                                            key={index}
                                            isPrimary={
                                                messageAlign ===
                                                item.value
                                            }
                                            isSecondary={
                                                messageAlign !==
                                                item.value
                                            }
                                            onClick={() =>
                                                setAttributes({
                                                    messageAlign:
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
                        <ButtonGroup className="eb-inspector-btn-group">
                            {MESSAGE_TYPE.map((item, index) => (
                                <Button
                                    key={index}
                                    isPrimary={
                                        messageType ===
                                        item.value
                                    }
                                    isSecondary={
                                        messageType !==
                                        item.value
                                    }
                                    onClick={() =>
                                        setAttributes({
                                            messageType:
                                                item.value,
                                        })
                                    }
                                >
                                    {item.label}
                                </Button>
                            ))}
                        </ButtonGroup>
                        {messageType == "success" && (
                            <>
                                <TypographyDropdown
                                    baseLabel={__(
                                        "Typography",
                                        "essential-blocks"
                                    )}
                                    typographyPrefixConstant={
                                        SUCCESS_TYPO
                                    }
                                />

                                <ColorControl
                                    label={__(
                                        "Color",
                                        "essential-blocks"
                                    )}
                                    color={successColor}
                                    onChange={(successColor) =>
                                        setAttributes({
                                            successColor,
                                        })
                                    }
                                />
                                <ColorControl
                                    label={__(
                                        "Background",
                                        "essential-blocks"
                                    )}
                                    color={successBgColor}
                                    onChange={(
                                        successBgColor
                                    ) =>
                                        setAttributes({
                                            successBgColor,
                                        })
                                    }
                                />
                                <ResponsiveDimensionsControl
                                    controlName={
                                        SUCCESS_PADDING
                                    }
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
                                        controlName={
                                            SUCCESS_BORDER
                                        }
                                    />
                                </InspectorPanel.PanelBody>
                            </>
                        )}

                        {messageType == "error" && (
                            <>
                                <TypographyDropdown
                                    baseLabel={__(
                                        "Typography",
                                        "essential-blocks"
                                    )}
                                    typographyPrefixConstant={
                                        ERROR_TYPO
                                    }
                                />

                                <ColorControl
                                    label={__(
                                        "Color",
                                        "essential-blocks"
                                    )}
                                    color={errorColor}
                                    onChange={(errorColor) =>
                                        setAttributes({
                                            errorColor,
                                        })
                                    }
                                />
                                <ColorControl
                                    label={__(
                                        "Background",
                                        "essential-blocks"
                                    )}
                                    color={errorBgColor}
                                    onChange={(errorBgColor) =>
                                        setAttributes({
                                            errorBgColor,
                                        })
                                    }
                                />

                                <ResponsiveDimensionsControl
                                    controlName={ERROR_PADDING}
                                    baseLabel={__(
                                        "Padding",
                                        "essential-blocks"
                                    )}
                                />

                                <PanelBody
                                    title={__(
                                        "Border",
                                        "essential-blocks"
                                    )}
                                    initialOpen={false}
                                >
                                    <BorderShadowControl
                                        controlName={
                                            ERROR_BORDER
                                        }
                                    />
                                </PanelBody>
                            </>
                        )}
                    </InspectorPanel.PanelBody>
                </InspectorPanel.Style>
            </InspectorPanel>
    );
}
export default Inspector;
