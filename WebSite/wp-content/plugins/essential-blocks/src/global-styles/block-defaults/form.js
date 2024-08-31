/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useEffect, useState, useRef } from "@wordpress/element";
import { select, useSelect } from "@wordpress/data";
import {
    PanelBody,
    SelectControl,
    ToggleControl,
    Button,
    RangeControl,
    BaseControl,
    ButtonGroup,
    TabPanel,
    TextControl,
    TextareaControl,
    PanelRow,
    __experimentalDivider as Divider,
} from "@wordpress/components";

import {
    BackgroundControl,
    BorderShadowControl,
    ColorControl,
    ResponsiveRangeController,
    ResponsiveDimensionsControl,
    TypographyDropdown,
    ProSelectControl,
    EBIconPicker,
    useBlockDefaults,
    withBlockContext
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
} from "@essential-blocks/blocks/form/src/constants";

import {
    LABEL_TYPOGRAPHY,
    BTN_TEXT,
    FIELDS_TEXT,
    SUCCESS_TYPO,
    ERROR_TYPO,
    RADIO_TEXT,
    CHECKBOX_TEXT,
    FIELDS_TEXT_VALIDATION,
} from "@essential-blocks/blocks/form/src/constants/typographyPrefixConstants";

import objAttributes from "@essential-blocks/blocks/form/src/attributes";

function Form(props) {
    const { blockDefaults, setBlockDefaults, name, deviceType, handleBlockDefault } = props;


    const [formSettings, setFormSettings] = useState({});


    const {
        blockId,
        resOption,
        formId,
        formTitle,
        formType,
        template,
        integrations,
        mailBody,
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
    } = blockDefaults;
    const isDefaultSet = useBlockDefaults(name, blockDefaults, setBlockDefaults, objAttributes)

    return (
        <>
            {isDefaultSet && (
                <div className="eb-panel-control">
                    <>
                        <PanelBody
                            title={__(
                                "General",
                                "essential-blocks"
                            )}
                            initialOpen={true}
                        >
                            <TextControl
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
                                    handleBlockDefault({
                                        formTitle: value,
                                    })
                                }
                            />
                            <ToggleControl
                                label={__(
                                    "Show Field Labels?",
                                    "essential-blocks"
                                )}
                                checked={showLabel}
                                onChange={() =>
                                    handleBlockDefault({
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
                                    handleBlockDefault({
                                        showInputIcon: !showInputIcon,
                                    })
                                }
                            />

                            {/* {applyFilters(
                                "eb_form_block_control_after_form_type",
                                "",
                                attributes,
                                handleBlockDefault
                            )} */}
                        </PanelBody>
                        <PanelBody
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
                                    handleBlockDefault({
                                        notificationType: selected,
                                    })
                                }
                            />
                            {/* <DynamicInputControl
                                            label="Email To"
                                           attrName="mailTo"
                                            inputValue={mailTo}
                                            handleBlockDefault={handleBlockDefault}
                                            onChange={(text) => handleBlockDefault({ mailTo: text })}
                                            help={__("Use , to seperate emails", "essential-blocks")}
                                        />
                                        <DynamicInputControl
                                            label="Email Cc"
                                           attrName="mailCc"
                                            inputValue={mailCc}
                                            handleBlockDefault={handleBlockDefault}
                                            onChange={(text) => handleBlockDefault({ mailCc: text })}
                                            help={__("Use , to seperate emails", "essential-blocks")}
                                        />
                                        <DynamicInputControl
                                            label="Email Bcc"
                                           attrName="mailBcc"
                                            inputValue={mailBcc}
                                            handleBlockDefault={handleBlockDefault}
                                            onChange={(text) => handleBlockDefault({ mailBcc: text })}
                                            help={__("Use , to seperate emails", "essential-blocks")}
                                        />
                                        <DynamicInputControl
                                            label="Email Subject"
                                           attrName="mailSubject"
                                            inputValue={mailSubject}
                                            handleBlockDefault={handleBlockDefault}
                                            onChange={(text) => handleBlockDefault({ mailSubject: text })}
                                        />
                                        <TextareaControl
                                            label="Email Body"
                                            help="Write your email body here"
                                            value={mailBody}
                                            rows={5}
                                            onChange={(text) => handleBlockDefault({ mailBody: text })}
                                        /> */}
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
                                onChange={(text) =>
                                    setFormSettings({
                                        ...formSettings,
                                        mailTo: text,
                                    })
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

                            {/* <TextareaControl
                                            label="Email Body"
                                            help="Write your email body here"
                                            value={mailBody}
                                            rows={5}
                                            onChange={(text) =>
                                                handleBlockDefault({
                                                    mailBody: text,
                                                })
                                            }
                                        /> */}
                        </PanelBody>
                        <PanelBody
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
                                    handleBlockDefault({
                                        confirmationType: selected,
                                    })
                                }
                            />
                            {/* {applyFilters(
                                "eb_form_block_control_after_confirmation_type",
                                "",
                                attributes,
                                handleBlockDefault
                            )} */}

                            {confirmationType === "message" && (
                                <>
                                    <TextareaControl
                                        label="Success Message"
                                        // help="Write your email body here"
                                        value={successMessage}
                                        rows={3}
                                        onChange={(text) =>
                                            handleBlockDefault({
                                                successMessage: text,
                                            })
                                        }
                                    />
                                    <TextareaControl
                                        label="Default Error Message"
                                        // help="Write your email body here"
                                        value={errorMessage}
                                        rows={3}
                                        onChange={(text) =>
                                            handleBlockDefault({
                                                errorMessage: text,
                                            })
                                        }
                                    />
                                </>
                            )}
                            <TextareaControl
                                label="Validation Error Message"
                                // help="Write your email body here"
                                value={validationErrorMessage}
                                rows={3}
                                onChange={(text) =>
                                    handleBlockDefault({
                                        validationErrorMessage: text,
                                    })
                                }
                            />
                        </PanelBody>

                        <PanelBody
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

                                <TextControl
                                    label={__(
                                        "Text",
                                        "essential-blocks"
                                    )}
                                    value={buttonText}
                                    onChange={(buttonText) =>
                                        handleBlockDefault({
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
                                        handleBlockDefault({
                                            btnAddIcon: !btnAddIcon,
                                        })
                                    }
                                />
                                {btnAddIcon && (
                                    <>
                                        <EBIconPicker
                                            value={icon}
                                            onChange={(icon) =>
                                                handleBlockDefault({
                                                    icon
                                                })
                                            }
                                        />
                                    </>
                                )}
                            </>
                        </PanelBody>
                    </>

                    <>
                        <PanelBody
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
                                                    handleBlockDefault({
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
                                                            handleBlockDefault(
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
                        </PanelBody>
                        {showLabel && (
                            <PanelBody
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
                                        handleBlockDefault({
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
                                        handleBlockDefault({
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
                                                        handleBlockDefault(
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
                            </PanelBody>
                        )}
                        {showInputIcon && (
                            <>
                                <PanelBody
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
                                            handleBlockDefault({
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
                                </PanelBody>
                            </>
                        )}

                        <PanelBody
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
                                        handleBlockDefault({
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
                                        handleBlockDefault({
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
                                        handleBlockDefault({
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
                                                        handleBlockDefault(
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

                                <PanelBody
                                    title={__(
                                        "Border",
                                        "essential-blocks"
                                    )}
                                    initialOpen={false}
                                >
                                    <BorderShadowControl
                                        controlName={FIELDS_BORDER}
                                    />
                                </PanelBody>
                            </>
                        </PanelBody>
                        <PanelBody
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
                                        handleBlockDefault({
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
                                        handleBlockDefault({
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
                                        handleBlockDefault({
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
                                                    handleBlockDefault({
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
                                                handleBlockDefault({
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
                                                handleBlockDefault({
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
                        </PanelBody>
                        <PanelBody
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
                                        handleBlockDefault({
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
                                        handleBlockDefault({
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
                                        handleBlockDefault({
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
                                                    handleBlockDefault({
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
                                                handleBlockDefault({
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
                                                handleBlockDefault({
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
                        </PanelBody>
                        <PanelBody
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
                                        handleBlockDefault({
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
                                        handleBlockDefault({
                                            dateBgColor,
                                        })
                                    }
                                />
                            </>
                        </PanelBody>
                        <PanelBody
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
                                                    handleBlockDefault({
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
                                                            handleBlockDefault(
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
                                                    handleBlockDefault({
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
                                                    handleBlockDefault({
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
                                                handleBlockDefault({
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
                                                handleBlockDefault({
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
                                                handleBlockDefault({
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
                                                handleBlockDefault({
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

                                <PanelBody
                                    title={__(
                                        "Border",
                                        "essential-blocks"
                                    )}
                                    initialOpen={false}
                                >
                                    <BorderShadowControl
                                        controlName={BTN_BORDER}
                                    />
                                </PanelBody>
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
                                                            handleBlockDefault(
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
                        </PanelBody>
                        <PanelBody
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
                                    handleBlockDefault({
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
                                    handleBlockDefault({
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
                                                    handleBlockDefault({
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
                        </PanelBody>
                        <PanelBody
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
                                                    handleBlockDefault({
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
                                            handleBlockDefault({
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
                                            handleBlockDefault({
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
                                            handleBlockDefault({
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

                                    <PanelBody
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
                                    </PanelBody>
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
                                            handleBlockDefault({
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
                                            handleBlockDefault({
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
                        </PanelBody>
                    </>
                    {/* Advance */}
                    <PanelBody
                        title={__(
                            "Wrapper Margin & Padding",
                            "essential-blocks"
                        )}
                        initialOpen={false}
                    >
                        <ResponsiveDimensionsControl
                            controlName={WRAPPER_MARGIN}
                            baseLabel="Margin"
                        />
                        <ResponsiveDimensionsControl
                            controlName={WRAPPER_PADDING}
                            baseLabel="Padding"
                        />
                    </PanelBody>
                    <PanelBody
                        title={__("Wrapper Background ", "essential-blocks")}
                        initialOpen={false}
                    >
                        <BackgroundControl
                            controlName={WRAPPER_BG}
                        />
                    </PanelBody>
                    <PanelBody
                        title={__("Wrapper Border & Shadow")}
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

export default withBlockContext(objAttributes)(Form);
