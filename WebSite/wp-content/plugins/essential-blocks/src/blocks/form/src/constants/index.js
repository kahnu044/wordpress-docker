import { __ } from "@wordpress/i18n";
import { Dashicon } from "@wordpress/components";

export const WRAPPER_BG = "wrprBg";
export const WRAPPER_MARGIN = "wrpMargin";
export const WRAPPER_PADDING = "wrpPadding";
export const WRAPPER_BORDER_SHADOW = "wrpBorderShadow";
export const ROWS_GAP = "rowsGap";
export const LABEL_MARGIN = "labelMargin";
export const BTN_PADDING = "btnPadding";
export const BTN_BORDER = "btnBorder";
export const BTN_TOP_SPECING = "btnTopSpecing";
export const INPUT_WIDTH = "inputWidth";
export const FIELDS_BORDER = "fieldsBorder";
export const FIELDS_PADDING = "fieldsPadding";
export const SUCCESS_BORDER = "messageBorder";
export const SUCCESS_PADDING = "messagePadding";
export const ERROR_BORDER = "errorBorder";
export const ERROR_PADDING = "errorPadding";

export const RADIO_SIZE = "radioSize";
export const RADIO_SPACING = "radioSpacing";
export const CHECKBOX_SIZE = "checkboxSize";
export const CHECKBOX_SPACING = "checkboxSpacing";
export const FIXED_WIDTH = "btnWidth";
export const ICON_SIZE = "iconSize";
export const ICON_SPACE = "iconGap";
export const FORM_CUSTOM_WIDTH = "formWidth";

export const INLINE_FORM_WIDTH = "inlineFormWidth";
export const BTN_VERTICAL_POSITION = "btnVerticalPosition";
export const BTN_HORIZONTAL_POSITION = "btnHorizontalPosition";
export const INPUT_ICON_SIZE = "inputIconSize";

export const FORM_TYPE = [
    { label: __("Contact Form", "essential-blocks"), value: "contact_form" },
    { label: __("Subscription Form", "essential-blocks"), value: "subscription_form" },
    { label: __("RSVP Form", "essential-blocks"), value: "rsvp_form" },
    { label: __("Blank", "essential-blocks"), value: "blank" },
    { label: __("Multi Step Form", "essential-blocks"), value: "multistep_form", isPro: true },
    // { label: __("Event Booking Form (Pro)"), value: "event", isPro: true },
    // { label: __("Survey Form (Pro)"), value: "survey", isPro: true },
];

export const TEMPLATES = [
    { label: __("Contact Form (Basic)", "essential-blocks"), value: "contact_form_1" },
    { label: __("Contact From Modern", "essential-blocks"), value: "contact_form_2" },
];

export const SUBSCRIPTION_TEMPLATES = [
    { label: __("Subscription Form 1", "essential-blocks"), value: "subscription_form_1" },
    { label: __("Subscription From 2", "essential-blocks"), value: "subscription_form_2" },
];

export const INTEGRATIONS = [
    { label: __("None", "essential-blocks"), value: "" },
    { label: __("MailChimp (Pro)", "essential-blocks"), value: "mailchimp", isPro: true },
];

export const NOTIFICATION_TYPE = [
    { label: __("Send Email", "essential-blocks"), value: "email" },
    {
        label: __("Send Email & Save Response (Pro)", "essential-blocks"),
        value: "emailsave",
        isPro: true,
    },
    {
        label: __("Only Save Response (Pro)", "essential-blocks"),
        value: "save",
        isPro: true,
    },
];

export const CONFIRMATION_TYPE = [
    { label: __("Message in the Same Page", "essential-blocks"), value: "message" },
    // { label: __("Popup (Pro)"), value: "popup", isPro: true },
    {
        label: __("Redirect (Pro)", "essential-blocks"),
        value: "redirect",
        isPro: true,
    },
];

export const CONTENTS_ALIGNMENTS = [
    { label: __("Left", "essential-blocks"), value: "left" },
    { label: __("Center", "essential-blocks"), value: "center" },
    { label: __("Right", "essential-blocks"), value: "right" },
];

export const SIZE_UNIT_TYPES = [
    { label: __("px", "essential-blocks"), value: "px" },
    { label: __("%", "essential-blocks"), value: "%" },
    { label: __("em", "essential-blocks"), value: "em" },
];

export const NORMAL_HOVER = [
    { label: __("Normal", "essential-blocks"), value: "normal" },
    { label: __("Hover", "essential-blocks"), value: "hover" },
];
export const NORMAL_CHECKED = [
    { label: __("Normal", "essential-blocks"), value: "normal" },
    { label: __("Checked", "essential-blocks"), value: "checked" },
];

export const FORM_WIDTH = [
    { label: __("Full", "essential-blocks"), value: "full" },
    { label: __("Fixed", "essential-blocks"), value: "fixed" },
];
export const BUTTON_WIDTH = [
    { label: __("Auto", "essential-blocks"), value: "auto" },
    { label: __("Full", "essential-blocks"), value: "full" },
    { label: __("Fixed", "essential-blocks"), value: "fixed" },
];
export const ICON_POSITION = [
    { label: __(<Dashicon icon={"editor-alignleft"} />), value: "left" },
    { label: __(<Dashicon icon={"editor-alignright"} />), value: "right" },
];
export const MESSAGE_TYPE = [
    { label: __("Success", "essential-blocks"), value: "success" },
    { label: __("Error", "essential-blocks"), value: "error" },
];
export const BUTTON_STYLE = [
    { label: __("Block", "essential-blocks"), value: "block" },
    { label: __("Inline with Input Field", "essential-blocks"), value: "inline" },
];

export const VERTICAL_ALIGN = [
    { label: __("Top", "essential-blocks"), value: "flex-start" },
    { label: __("Middle", "essential-blocks"), value: "center" },
    { label: __("Bottom", "essential-blocks"), value: "flex-end" },
];

export const FORM_STYLES = [
    { label: __("Classic", "essential-blocks"), value: "form-style-classic" },
    { label: __("Modern", "essential-blocks"), value: "form-style-modern" },
];
