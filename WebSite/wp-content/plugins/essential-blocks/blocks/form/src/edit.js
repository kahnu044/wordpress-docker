/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
    useBlockProps,
    RichText,
    InnerBlocks,
    store as blockEditorStore,
} from "@wordpress/block-editor";
import { Button, Snackbar } from '@wordpress/components';
import { useEffect, useState, useRef, useCallback } from "@wordpress/element";
import {
    select,
    useSelect,
    dispatch,
    useDispatch,
    subscribe,
} from "@wordpress/data";
import { doAction, applyFilters } from "@wordpress/hooks";
import { createBlocksFromInnerBlocksTemplate } from "@wordpress/blocks";
import { times } from "lodash";

/**
 * Internal dependencies
 */
import { getValidationRules, getFormFields } from "./helpers";
const {
    duplicateBlockIdFix,
    fetchFormBlockData,
    saveFormBlockData,
} = EBControls;

import classnames from "classnames";

import {
    CONTACT_FORM_TEMPLATE_1,
    CONTACT_FORM_TEMPLATE_2,
} from "./templates/contact-form";

import {
    SUBSCRIPTION_FORM_TEMPLATE_1,
    SUBSCRIPTION_FORM_TEMPLATE_2,
} from "./templates/subscription-form";

import { RSVP_FORM_TEMPLATE } from "./templates/rsvp-form";

import Inspector from "./inspector";

import ContactFormIcon from "./icons/contact.svg";
import SubscriptionFormIcon from "./icons/subscription.svg";
import RSVPFormIcon from "./icons/rsvp.svg";
import BlankIcon from "./icons/blank.svg";

import Style from "./style";

export default function Edit(props) {
    const {
        attributes,
        setAttributes,
        className,
        clientId,
        isSelected,
    } = props;
    const {
        resOption,
        blockMeta,
        cover,
        blockId,
        classHook,
        formId,
        notificationType,
        formTitle,
        formType,
        template,
        integrations,
        buttonText,
        btnAddIcon,
        icon,
        iconPosition,
        formLayout,
        showLabel,
        showInputIcon,
        inlineFormWidthRange,
        btnVerticalPositionRange,
        btnHorizontalPositionRange,
        successMessage,
        errorMessage,
        validationErrorMessage,
        formStyle,
    } = attributes;

    const [formSettings, setFormSettings] = useState({});
    const { replaceInnerBlocks } = useDispatch(blockEditorStore);

    const showLabelRef = useRef(showLabel);
    const showIconRef = useRef(showInputIcon);
    const formStyleRef = useRef(formStyle);

    const formTypeRef = useRef(formType);
    const templateRef = useRef(template);

    const allowedBlocks = applyFilters("eb-form-block-allowed-blocks", [
        "essential-blocks/form-text-field",
        "essential-blocks/form-textarea-field",
        "essential-blocks/form-email-field",
        "essential-blocks/form-number-field",
        "essential-blocks/form-select-field",
        "essential-blocks/form-checkbox-field",
        "essential-blocks/form-radio-field",
        "essential-blocks/advanced-heading",
        "essential-blocks/advanced-image",
        "essential-blocks/row",
        "core/image",
        "core/heading",
        "core/paragraph",
    ]);

    useEffect(() => {
        // this is for creating a unique blockId for each block's unique className
        const BLOCK_PREFIX = "eb-form";
        duplicateBlockIdFix({
            BLOCK_PREFIX,
            blockId,
            setAttributes,
            select,
            clientId,
        });

        //Generate Custom Form ID
        let uniqueId = clientId.substr(clientId.length - 6);
        if (blockId && blockId.startsWith(BLOCK_PREFIX)) {
            uniqueId = blockId.replace(BLOCK_PREFIX + "-", "");
        }

        if (!formId || formId.length === 0) {
            setAttributes({ formId: `ebf-${uniqueId}` });
        }

        //Get formdata from Database
        const fetchData = async () => {
            return await fetchFormBlockData(blockId, "form_options");
        };

        fetchData().then((res) => {
            const response = res?.form_options;
            if (!response || (typeof response === "object" && Object.keys(response).length === 0)) {
                setFormSettings({
                    mailTo: "",
                    mailCc: "",
                    mailBcc: "",
                    mailSubject: "",
                });
            } else {
                setFormSettings(response);
                if (response.notification) {
                    setAttributes({ notificationType: response.notification })
                }
            }
        });
    }, []);

    const updateRecursiveAttributes = (blocks, attributes) => {
        if (typeof blocks !== "object" || typeof attributes !== "object") {
            return [];
        }

        // let parentId = false;
        if (blocks.length > 0 && Object.keys(attributes).length > 0) {
            for (const block of blocks) {
                if (block.attributes && typeof block.attributes === "object") {
                    block.attributes = {
                        ...block.attributes,
                        ...attributes,
                    };
                }
                if (block.innerBlocks) {
                    updateRecursiveAttributes(block.innerBlocks, attributes);
                }
            }
        }
    };

    //useEffect for Update innerblocks attribute values
    useEffect(() => {
        if (
            showLabel !== showLabelRef.current ||
            showInputIcon !== showIconRef.current ||
            formStyle !== formStyleRef.current
        ) {
            showLabelRef.current = showLabel;
            showIconRef.current = showInputIcon;
            formStyleRef.current = formStyle;

            const formInnerBlocks = select("core/block-editor").getBlock(
                clientId
            ).innerBlocks;
            updateRecursiveAttributes(formInnerBlocks, {
                showLabel: showLabel,
                isIcon: showInputIcon,
                formStyle: formStyle,
            });

            //Replace Innerblocks with updated attributes
            replaceInnerBlocks(clientId, formInnerBlocks);
        }
    }, [showLabel, showInputIcon, formStyle]);

    // On change formStyle
    useEffect(() => {
        if ("Desktop" !== resOption) {
            return;
        }
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

            const formWrapper = document.querySelector(`.${blockId}`);
            if (formWrapper) {
                const inputs = formWrapper.getElementsByClassName("eb-field-input");

                for (let input of inputs) {
                    if (input.value) {
                        input.nextSibling?.classList.add("active");
                    }

                    input.addEventListener("focus", function (e) {
                        if (!input.nextSibling?.classList.contains("active")) {
                            input.nextSibling?.classList.add("active");
                        }
                    });

                    // Remove the class when the input loses focus
                    input.addEventListener("blur", function () {
                        if (!input.value) {
                            input.nextSibling?.classList.remove("active");
                        }
                    });
                }
            }
        } else {
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
    }, [formStyle]);

    //On change "formType", change Template
    useEffect(() => {
        if (
            formTypeRef.current === formType &&
            templateRef.current === template
        ) {
            return;
        }
        formTypeRef.current = formType;
        templateRef.current = template;

        if (formType === "contact_form") {
            if (!formTitle) {
                setAttributes({ formTitle: "Contact Form" });
            }
            if (template === "contact_form_1") {
                replaceInnerBlocks(
                    clientId,
                    createBlocksFromInnerBlocksTemplate(CONTACT_FORM_TEMPLATE_1)
                );

                setAttributes({
                    formStyle: "form-style-classic",
                    formLayout: "block",
                    inlineFormWidthRange: 80,
                    rowsGapRange: "15",

                    showLabel: true,
                    labelColor: "#1D2939",
                    requiredColor: "#D92D20",

                    showInputIcon: true,
                    inputIconColor: "#CBCBCB",

                    fieldAlign: "left",
                    fields_FontFamily: "Poppins",
                    fields_FontSize: 14,
                    fields_FontStyle: "normal",
                    fields_FontTransform: "uppercase",
                    fields_FontWeight: "400",
                    fields_LetterSpacingUnit: "px",
                    fields_LineHeightUnit: "em",
                    fields_SizeUnit: "px",

                    fieldsBorderRds_Top: "4",
                    fieldsBorderRds_Left: "4",
                    fieldsBorderRds_Bottom: "4",
                    fieldsBorderRds_Right: "4",
                    fieldsBorderRds_isLinked: true,

                    fieldsBorderBdr_Top: "1",
                    fieldsBorderBdr_Left: "1",
                    fieldsBorderBdr_Bottom: "1",
                    fieldsBorderBdr_Right: "1",
                    fieldsBorderBdr_isLinked: false,
                    fieldsPaddingLeft: "15",
                    fieldsPaddingRight: "15",
                    fieldsPaddingTop: "15",
                    fieldsPaddingBottom: "15",
                    fieldsPaddingisLinked: false,

                    buttonText: "Submit",
                    btnColor: "#fff",
                    btnBgColor: "#475467",
                    btnText_FontFamily: "",
                    btnText_FontSize: 16,
                    btnText_FontWeight: "400",
                    btnText_LetterSpacingUnit: "px",
                    btnText_LineHeightUnit: "em",
                    btnText_SizeUnit: "px",
                    btnText_TextTransform: "capitalize",
                    buttonWidth: "full",
                    btnHorizontalPositionRange: "",
                    btnVerticalPositionRange: "",
                    btnAddIcon: false,
                    btnBorderRds_Bottom: "4",
                    btnBorderRds_Left: "4",
                    btnBorderRds_Right: "4",
                    btnBorderRds_Top: "4",
                    btnBorderBdr_Bottom: "0",
                    btnBorderBdr_Left: "0",
                    btnBorderBdr_Right: "0",
                    btnBorderBdr_Top: "0",
                    btnTopSpecingRange: "20",

                    wrpPaddingisLinked: true,
                    wrpPaddingUnit: "px",
                    wrpPaddingTop: "0",
                    wrpPaddingBottom: "0",
                    wrpPaddingLeft: "0",
                    wrpPaddingRight: "0",

                    wrpBorderShadowRds_Bottom: "0",
                    wrpBorderShadowRds_Left: "0",
                    wrpBorderShadowRds_Right: "0",
                    wrpBorderShadowRds_Top: "0",
                    wrpBorderShadowRds_Unit: "px",
                    wrpBorderShadowRds_isLinked: true,

                    wrpBorderShadowblur: 0,
                    wrpBorderShadowvOffset: 0,
                    wrpBorderShadowhOffset: 0,
                    wrpBorderShadowshadowColor: "rgba(111, 159, 140, 0.00)",

                    wrprBgbackgroundColor: "#FFFFFF",
                    wrprBgbackgroundType: "classic",
                });
            } else if (template === "contact_form_2") {
                replaceInnerBlocks(
                    clientId,
                    createBlocksFromInnerBlocksTemplate(CONTACT_FORM_TEMPLATE_2)
                );

                setAttributes({
                    formLayout: "block",
                    formStyle: "form-style-modern",
                    inlineFormWidthRange: 100,
                    rowsGapRange: "15",

                    showLabel: true,
                    labelColor: "#C2C6C8",
                    requiredColor: "#6E6C6C",

                    fieldAlign: "left",
                    fieldsBorderRds_Bottom: "0",
                    fieldsBorderRds_Left: "0",
                    fieldsBorderRds_Right: "0",
                    fieldsBorderRds_Top: "0",
                    fieldsBorderRds_Unit: "px",

                    buttonText: "Send",
                    btnText_FontFamily: "Manrope",
                    btnText_FontSize: 18,
                    btnText_FontWeight: "500",
                    btnText_LetterSpacingUnit: "px",
                    btnText_LineHeightUnit: "em",
                    btnText_SizeUnit: "px",
                    btnText_TextTransform: "capitalize",
                    buttonWidth: "full",
                    btnAddIcon: false,
                    iconSize: "12px",
                    btnBorderRds_Bottom: "0",
                    btnBorderRds_Left: "0",
                    btnBorderRds_Right: "0",
                    btnBorderRds_Top: "0",
                    btnBorderRds_Unit: "px",
                    btnTopSpecingRange: "20",

                    wrpPaddingisLinked: false,
                    wrpPaddingUnit: "px",
                    wrpPaddingTop: "30",
                    wrpPaddingBottom: "30",
                    wrpPaddingLeft: "0",
                    wrpPaddingRight: "0",

                    wrpBorderShadowRds_Bottom: "0",
                    wrpBorderShadowRds_Left: "0",
                    wrpBorderShadowRds_Right: "0",
                    wrpBorderShadowRds_Top: "0",
                    wrpBorderShadowRds_Unit: "px",
                    wrpBorderShadowRds_isLinked: true,

                    wrpBorderShadowblur: 0,
                    wrpBorderShadowvOffset: 0,
                    wrpBorderShadowhOffset: 0,
                    wrpBorderShadowshadowColor: "rgba(111, 159, 140, 0.09)",

                    wrprBgbackgroundColor: "#fff",
                    wrprBgbackgroundType: "classic",
                });
            }
        } else if (formType === "subscription_form") {
            if (!formTitle) {
                setAttributes({ formTitle: "Subscription Form" });
            }
            if (template === "subscription_form_1") {
                replaceInnerBlocks(
                    clientId,
                    createBlocksFromInnerBlocksTemplate(
                        SUBSCRIPTION_FORM_TEMPLATE_1
                    )
                );

                setAttributes({
                    formStyle: "form-style-classic",
                    formLayout: "inline",
                    inlineFormWidthRange: 100,
                    showInputIcon: false,

                    showLabel: false,
                    fieldAlign: "left",
                    requiredColor: "#D92D20",

                    fieldsBgColor: "#fff",
                    fieldsColor: "#787878",
                    fields_FontFamily: "Manrope",
                    fields_FontSize: 18,
                    fields_FontStyle: "normal",
                    fields_FontWeight: "400",
                    fields_LineHeight: 1.2,
                    fields_LineHeightUnit: "em",

                    fieldsPaddingLeft: "20",
                    fieldsPaddingRight: "220",
                    fieldsPaddingTop: "25",
                    fieldsPaddingBottom: "25",
                    fieldsPaddingisLinked: false,

                    fieldsBorderBdr_Top: "1",
                    fieldsBorderBdr_Left: "1",
                    fieldsBorderBdr_Bottom: "1",
                    fieldsBorderBdr_Right: "1",
                    fieldsBorderBdr_isLinked: false,

                    fieldsBorderRds_Top: "4",
                    fieldsBorderRds_Left: "4",
                    fieldsBorderRds_Bottom: "4",
                    fieldsBorderRds_Right: "4",
                    fieldsBorderRds_isLinked: true,

                    buttonText: "Subscribe",
                    btnColor: "#fff",
                    btnBgColor: "#475467",
                    btnText_FontFamily: "Manrope",
                    btnText_FontSize: 18,
                    btnText_FontWeight: "500",
                    btnText_LetterSpacingUnit: "px",
                    btnText_LineHeightUnit: "em",
                    btnText_SizeUnit: "px",
                    btnText_TextTransform: "capitalize",

                    btnBorderRds_Top: "4",
                    btnBorderRds_Left: "4",
                    btnBorderRds_Bottom: "4",
                    btnBorderRds_Right: "4",
                    btnBorderRds_isLinked: true,

                    buttonWidth: "fixed",
                    btnWidthRange: "200",
                    btnHorizontalPositionRange: 210,
                    btnVerticalPositionRange: 10,
                    btnAddIcon: false,
                    iconSize: "12px",
                    btnTopSpecingRange: "",
                    rowsGapRange: "30",

                    wrpPaddingisLinked: false,
                    wrpPaddingUnit: "%",
                    wrpPaddingTop: "10",
                    wrpPaddingBottom: "10",
                    wrpPaddingLeft: "15",
                    wrpPaddingRight: "15",

                    wrpBorderShadowRds_Bottom: "0",
                    wrpBorderShadowRds_Left: "0",
                    wrpBorderShadowRds_Right: "0",
                    wrpBorderShadowRds_Top: "0",
                    wrpBorderShadowRds_Unit: "px",
                    wrpBorderShadowRds_isLinked: true,

                    wrpBorderShadowblur: 0,
                    wrpBorderShadowvOffset: 0,
                    wrpBorderShadowhOffset: 0,
                    wrpBorderShadowshadowColor: "rgba(111, 159, 140, 0.09)",

                    wrprBgbackgroundColor: "#eaeaea",
                    wrprBgbackgroundType: "classic",
                });
            } else if (template === "subscription_form_2") {
                replaceInnerBlocks(
                    clientId,
                    createBlocksFromInnerBlocksTemplate(
                        SUBSCRIPTION_FORM_TEMPLATE_2
                    )
                );

                setAttributes({
                    formStyle: "form-style-classic",
                    formLayout: "block",
                    inlineFormWidthRange: 80,

                    showLabel: false,
                    requiredColor: "#D92D20",

                    fieldAlign: "center",
                    fields_FontFamily: "Poppins",
                    fields_FontSize: 20,
                    fields_FontStyle: "normal",
                    fields_FontWeight: "400",
                    fields_LetterSpacingUnit: "px",
                    fields_LineHeightUnit: "em",
                    fields_SizeUnit: "px",

                    fieldsBorderRds_Top: "4",
                    fieldsBorderRds_Left: "4",
                    fieldsBorderRds_Bottom: "4",
                    fieldsBorderRds_Right: "4",
                    fieldsBorderRds_isLinked: true,

                    buttonText: "Subscribe",
                    btnText_FontFamily: "Poppins",
                    btnText_FontSize: 24,
                    btnText_FontWeight: "500",
                    btnText_LetterSpacingUnit: "px",
                    btnText_LineHeightUnit: "em",
                    btnText_SizeUnit: "px",
                    btnText_TextTransform: "uppercase",
                    buttonWidth: "full",
                    btnHorizontalPositionRange: "",
                    btnVerticalPositionRange: "",
                    btnAddIcon: false,
                    btnTopSpecingRange: "25",

                    wrpPaddingisLinked: false,
                    wrpPaddingUnit: "%",
                    wrpPaddingTop: "10",
                    wrpPaddingBottom: "10",
                    wrpPaddingLeft: "20",
                    wrpPaddingRight: "20",

                    wrpBorderShadowRds_Bottom: "15",
                    wrpBorderShadowRds_Left: "15",
                    wrpBorderShadowRds_Right: "15",
                    wrpBorderShadowRds_Top: "15",
                    wrpBorderShadowRds_Unit: "px",
                    wrpBorderShadowRds_isLinked: true,

                    wrpBorderShadowblur: 45,
                    wrpBorderShadowvOffset: 0,
                    wrpBorderShadowhOffset: 0,
                    wrpBorderShadowshadowColor: "rgba(111, 159, 140, 0.09)",

                    wrprBgbackgroundColor: "#FFFFFF",
                    wrprBgbackgroundType: "classic",
                });
            }
        } else if (formType === "rsvp_form") {
            if (!formTitle) {
                setAttributes({ formTitle: "RSVP Form" });
            }
            replaceInnerBlocks(
                clientId,
                createBlocksFromInnerBlocksTemplate(RSVP_FORM_TEMPLATE)
            );

            setAttributes({
                formStyle: "form-style-classic",
                showInputIcon: false,
                formLayout: "block",
                inlineFormWidthRange: 80,
                rowsGapRange: "15",

                showLabel: false,
                requiredColor: "#D92D20",

                fieldAlign: "left",
                fields_FontFamily: "Poppins",
                fields_FontSize: 20,
                fields_FontStyle: "normal",
                fields_FontTransform: "uppercase",
                fields_FontWeight: "400",
                fields_LetterSpacingUnit: "px",
                fields_LineHeightUnit: "em",
                fields_SizeUnit: "px",
                fieldsBorderRds_Top: "0",
                fieldsBorderRds_Left: "0",
                fieldsBorderRds_Bottom: "0",
                fieldsBorderRds_Right: "0",
                fieldsBorderRds_isLinked: true,
                fieldsBorderBdr_Top: "0",
                fieldsBorderBdr_Left: "0",
                fieldsBorderBdr_Bottom: "1",
                fieldsBorderBdr_Right: "0",
                fieldsBorderBdr_isLinked: false,
                fieldsPaddingLeft: "0",
                fieldsPaddingRight: "0",
                fieldsPaddingisLinked: false,

                buttonText: "Send RSVP",
                btnColor: "#475467",
                btnBgColor: "#fff",
                btnText_FontFamily: "Poppins",
                btnText_FontSize: 18,
                btnText_FontWeight: "500",
                btnText_LetterSpacingUnit: "px",
                btnText_LineHeightUnit: "em",
                btnText_SizeUnit: "px",
                btnText_TextTransform: "uppercase",
                buttonWidth: "full",
                btnHorizontalPositionRange: "",
                btnVerticalPositionRange: "",
                btnAddIcon: false,
                btnBorderRds_Bottom: "0",
                btnBorderRds_Left: "0",
                btnBorderRds_Right: "0",
                btnBorderRds_Top: "0",
                btnBorderBdr_Bottom: "1",
                btnBorderBdr_Left: "1",
                btnBorderBdr_Right: "1",
                btnBorderBdr_Top: "1",
                btnTopSpecingRange: "40",

                wrpPaddingisLinked: false,
                wrpPaddingUnit: "%",
                wrpPaddingTop: "10",
                wrpPaddingBottom: "10",
                wrpPaddingLeft: "20",
                wrpPaddingRight: "20",

                wrpBorderShadowRds_Bottom: "15",
                wrpBorderShadowRds_Left: "15",
                wrpBorderShadowRds_Right: "15",
                wrpBorderShadowRds_Top: "15",
                wrpBorderShadowRds_Unit: "px",
                wrpBorderShadowRds_isLinked: true,

                wrpBorderShadowblur: 45,
                wrpBorderShadowvOffset: 0,
                wrpBorderShadowhOffset: 0,
                wrpBorderShadowshadowColor: "rgba(111, 159, 140, 0.09)",

                wrprBgbackgroundColor: "#FFFFFF",
                wrprBgbackgroundType: "classic",
            });
        } else if (formType === "blank") {
            if (!formTitle) {
                setAttributes({ formTitle: "New Form" });
            }
            replaceInnerBlocks(
                clientId,
                createBlocksFromInnerBlocksTemplate([["core/paragraph"]])
            );

            setAttributes({
                formStyle: "form-style-classic",
                showInputIcon: false,
                formLayout: "block",
                inlineFormWidthRange: 80,
                rowsGapRange: "15",

                showLabel: true,
                labelColor: "#1D2939",
                requiredColor: "#D92D20",

                fieldAlign: "left",
                fields_FontFamily: "Poppins",
                fields_FontSize: 14,
                fields_FontStyle: "normal",
                fields_FontTransform: "uppercase",
                fields_FontWeight: "400",
                fields_LetterSpacingUnit: "px",
                fields_LineHeightUnit: "em",
                fields_SizeUnit: "px",
                fieldsBorderRds_Top: "4",
                fieldsBorderRds_Left: "4",
                fieldsBorderRds_Bottom: "4",
                fieldsBorderRds_Right: "4",
                fieldsBorderRds_isLinked: true,
                fieldsBorderBdr_Top: "1",
                fieldsBorderBdr_Left: "1",
                fieldsBorderBdr_Bottom: "1",
                fieldsBorderBdr_Right: "1",
                fieldsBorderBdr_isLinked: false,
                fieldsPaddingLeft: "15",
                fieldsPaddingRight: "15",
                fieldsPaddingTop: "15",
                fieldsPaddingBottom: "15",
                fieldsPaddingisLinked: false,

                buttonText: "Submit",
                btnColor: "#fff",
                btnBgColor: "#475467",
                btnText_FontFamily: "",
                btnText_FontSize: 16,
                btnText_FontWeight: "400",
                btnText_LetterSpacingUnit: "px",
                btnText_LineHeightUnit: "em",
                btnText_SizeUnit: "px",
                btnText_TextTransform: "capitalize",
                buttonWidth: "full",
                btnHorizontalPositionRange: "",
                btnVerticalPositionRange: "",
                btnAddIcon: false,
                btnBorderRds_Bottom: "4",
                btnBorderRds_Left: "4",
                btnBorderRds_Right: "4",
                btnBorderRds_Top: "4",
                btnBorderBdr_Bottom: "0",
                btnBorderBdr_Left: "0",
                btnBorderBdr_Right: "0",
                btnBorderBdr_Top: "0",
                btnTopSpecingRange: "20",

                wrpPaddingisLinked: true,
                wrpPaddingUnit: "px",
                wrpPaddingTop: "0",
                wrpPaddingBottom: "0",
                wrpPaddingLeft: "0",
                wrpPaddingRight: "0",

                wrpBorderShadowRds_Bottom: "0",
                wrpBorderShadowRds_Left: "0",
                wrpBorderShadowRds_Right: "0",
                wrpBorderShadowRds_Top: "0",
                wrpBorderShadowRds_Unit: "px",
                wrpBorderShadowRds_isLinked: true,

                wrpBorderShadowblur: 0,
                wrpBorderShadowvOffset: 0,
                wrpBorderShadowhOffset: 0,
                wrpBorderShadowshadowColor: "rgba(111, 159, 140, 0.00)",

                wrprBgbackgroundColor: "#FFFFFF",
                wrprBgbackgroundType: "classic",
            });
        }
    }, [formType, template]);

    //set "isEditedPostPublishable" true when formSettings is changed
    useEffect(() => {
        const isEditedPostPublishable = select(
            "core/editor"
        ).isEditedPostPublishable();

        if (
            typeof isEditedPostPublishable !== "undefined" &&
            isEditedPostPublishable === false
        ) {
            dispatch("core/editor").editPost({ isPublishable: true });
        }
    }, [formSettings]);

    const blockProps = useBlockProps({
        className: classnames(className, `eb-guten-block-main-parent-wrapper`),
    });

    /**
     * Memorize function for hanlde endless render
     */
    const formSettingsSave = useCallback(() => {
        const isSavingPost = select("core/editor").isSavingPost();
        const isAutosavingPost = select("core/editor").isAutosavingPost();

        /**
         * Action
         */
        if (isSavingPost && !isAutosavingPost) {
            if (typeof formSettings === "object" && Object.keys(formSettings).length > 0) {
                const rules = getValidationRules(
                    select("core/block-editor").getBlock(clientId)
                );

                const fields = getFormFields(
                    select("core/block-editor").getBlock(clientId)
                );
                const otherSettings = {
                    validationRules: { ...rules },
                    messages: {
                        success: successMessage,
                        error: errorMessage,
                        validationError: validationErrorMessage,
                    }
                };
                if (Object.keys(integrations).length > 0) {
                    otherSettings.integrations = integrations;
                }
                const updatedFormSettings = {
                    ...formSettings,
                    notification: notificationType,
                };

                const save = saveFormBlockData(
                    blockId,
                    formTitle || 'Form ID: ' + blockId,
                    fields,
                    updatedFormSettings,
                    otherSettings
                );
                //Display snackbar disable for now, will add later after fix multi render
                // save.then((res) => {
                //     //Show notice
                //     dispatch("core/notices").createNotice(
                //         res?.success ? "success" : "error",
                //         res.data || '',
                //         {
                //             type: "snackbar",
                //             isDismissible: true,
                //         }
                //     );
                // })

                unsubscribe();
            }
        }
    }, [
        blockId,
        formTitle,
        notificationType,
        formSettings,
        successMessage,
        errorMessage,
        validationErrorMessage,
        integrations
    ])

    // subscribe
    let unsubscribe = subscribe(formSettingsSave);

    return cover.length ? (
        <div>
            <img src={cover} alt="data table" style={{ maxWidth: "100%" }} />
        </div>
    ) : (
        <>
            {isSelected && (
                <Inspector
                    clientId={clientId}
                    attributes={attributes}
                    setAttributes={setAttributes}
                    formSettings={formSettings}
                    setFormSettings={setFormSettings}
                />
            )}
            <div {...blockProps}>
                <Style {...props} />
                {EssentialBlocksLocalize?.unfilter_capability && EssentialBlocksLocalize.unfilter_capability === 'false' && (
                    <div style={{ marginLeft: '0', marginRight: '0' }} className="notice notice-error">
                        <p>You don't have permission to add/edit the Form Block. Any changes you make won't work in the frontend properly.</p>
                    </div>
                )}
                <div
                    className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`}
                >
                    <div id={blockId} className={`${blockId} eb-form-wrapper`}>
                        {!formType && (
                            <>
                                <div className="eb-form-editor-formtype-select">
                                    <h2>Please Select a Form Type</h2>
                                    <div
                                        className="eb-form-editor-formtype-item"
                                        onClick={() =>
                                            setAttributes({
                                                formType: "contact_form",
                                            })
                                        }
                                    >
                                        <div className="eb-form-editor-formtype-icon">
                                            <img
                                                src={ContactFormIcon}
                                                alt={"conact form icon"}
                                            />
                                        </div>
                                        <span>Contact Form</span>
                                    </div>
                                    <div
                                        className="eb-form-editor-formtype-item"
                                        onClick={() =>
                                            setAttributes({
                                                formType: "subscription_form",
                                            })
                                        }
                                    >
                                        <div className="eb-form-editor-formtype-icon">
                                            <img
                                                src={SubscriptionFormIcon}
                                                alt={"subscription form icon"}
                                            />
                                        </div>
                                        <span>Subscription Form</span>
                                    </div>
                                    <div
                                        className="eb-form-editor-formtype-item"
                                        onClick={() =>
                                            setAttributes({
                                                formType: "rsvp_form",
                                            })
                                        }
                                    >
                                        <div className="eb-form-editor-formtype-icon">
                                            <img
                                                src={RSVPFormIcon}
                                                alt={"rsvp form icon"}
                                            />
                                        </div>
                                        <span>RSVP Form</span>
                                    </div>
                                    <div
                                        className="eb-form-editor-formtype-item"
                                        onClick={() =>
                                            setAttributes({ formType: "blank" })
                                        }
                                    >
                                        <div className="eb-form-editor-formtype-icon">
                                            <img
                                                src={BlankIcon}
                                                alt={"blank form icon"}
                                            />
                                        </div>
                                        <span>Blank</span>
                                    </div>
                                </div>
                            </>
                        )}
                        {formType && formType.length > 0 && (
                            <>
                                <form
                                    id={formId}
                                    className={`eb-form form-layout-${formLayout} ${formStyle}`}
                                    action=""
                                >
                                    <div className={"eb-form-fields"}>
                                        <InnerBlocks
                                            template={[]}
                                            renderAppender={
                                                InnerBlocks.DefaultBlockAppender
                                            }
                                            allowedBlocks={allowedBlocks}
                                        />
                                    </div>
                                    <div className={"eb-form-submit"}>
                                        <button
                                            data-id={blockId}
                                            type="button"
                                            className="btn btn-primary eb-form-submit-button"
                                        >
                                            {btnAddIcon &&
                                                iconPosition === "left" ? (
                                                <i
                                                    className={`${icon} eb-button-icon`}
                                                ></i>
                                            ) : (
                                                ""
                                            )}
                                            {buttonText}
                                            {btnAddIcon &&
                                                iconPosition === "right" ? (
                                                <i
                                                    className={`${icon} eb-button-icon`}
                                                ></i>
                                            ) : (
                                                ""
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
