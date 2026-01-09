import MultistepFormIconPro from "./icons/multistep.svg";
/**
 * Generate validate rules
 * @param {*} obj
 * @returns
 */
export const getValidationRules = (obj) => {
    let result = {};

    if (obj?.attributes && obj?.attributes?.validationRules) {
        const key = Object.keys(obj.attributes.validationRules)[0];
        result[key] = obj.attributes.validationRules[key];
    }

    if (obj?.innerBlocks && obj?.innerBlocks.length > 0) {
        for (const innerBlock of obj.innerBlocks) {
            const innerBlockRules = getValidationRules(innerBlock);
            if (
                typeof innerBlockRules === "object" &&
                Object.keys(innerBlockRules).length > 0
            ) {
                result = {
                    ...result,
                    ...innerBlockRules,
                };
            }
        }
    }

    //Remove recaptcha field
    if (result["g-recaptcha-response"]) {
        delete result["g-recaptcha-response"];
    }

    return result;
};

/**
 * get Form Fields
 * @param {*} obj
 * @returns
 */
export const getFormFields = (obj) => {
    let result = {};

    if (obj?.attributes && obj?.attributes?.fieldName) {
        result[obj.attributes.fieldName] = {
            type: getType(obj.name), //type of the filed
            label: obj?.attributes?.labelText || obj?.attributes?.fieldName, //label of the field
            ...(obj?.attributes?.options && {
                options: obj.attributes.options,
            }), //label of the field
        };
    }

    if (obj?.innerBlocks && obj?.innerBlocks.length > 0) {
        for (const innerBlock of obj.innerBlocks) {
            const innerBlockRules = getFormFields(innerBlock);
            if (
                typeof innerBlockRules === "object" &&
                Object.keys(innerBlockRules).length > 0
            ) {
                result = {
                    ...result,
                    ...innerBlockRules,
                };
            }
        }
    }

    //Remove recaptcha field
    if (result["g-recaptcha-response"]) {
        delete result["g-recaptcha-response"];
    }

    return result;
};

const getType = (blockName) => {
    switch (blockName) {
        case "essential-blocks/form-text-field":
            return "text";
            break;
        case "essential-blocks/form-textarea-field":
            return "textarea";
            break;
        case "essential-blocks/form-email-field":
            return "email";
            break;
        case "essential-blocks/form-number-field":
            return "number";
            break;
        case "essential-blocks/form-select-field":
            return "select";
            break;
        case "essential-blocks/form-checkbox-field":
            return "checkbox";
            break;
        case "essential-blocks/form-radio-field":
            return "radio";
            break;
        case "essential-blocks/pro-form-datetime-picker":
            return "datetime";
            break;
        case "essential-blocks/pro-form-recaptcha":
            return "recaptcha";
            break;
        case "essential-blocks/pro-form-country-field":
            return "country";
            break;
        case "essential-blocks/pro-form-phone-field":
            return "phone";
            break;
        default:
            return "input";
    }
};

export const emailFields = (formFields, fieldType) =>
    Object.entries(formFields)
        .filter(([key, value]) => value.type === fieldType)
        .map(([key, value]) => ({
            label: value.label,
            value: key,
        }));

export const contactForm1 = {
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
};

export const contactForm2 = {
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
};

export const subscriptionForm1 = {
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
};

export const subscriptionForm2 = {
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
};

export const rsvpForm = {
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
};

export const blankForm = {
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
};

export const ProBadge = () => (
    <svg width="37" height="16" viewBox="0 0 37 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <mask id="path-1-inside-1_6511_2857" fill="white">
            <path d="M0 8C0 5.00923 0 3.51384 0.643078 2.4C1.06437 1.67031 1.67031 1.06437 2.4 0.643078C3.51384 0 5.00923 0 8 0H37.8V16H7.99999C5.00923 16 3.51384 16 2.4 15.3569C1.67031 14.9356 1.06437 14.3297 0.643078 13.6C0 12.4862 0 10.9908 0 8Z" />
        </mask>
        <path d="M0 8C0 5.00923 0 3.51384 0.643078 2.4C1.06437 1.67031 1.67031 1.06437 2.4 0.643078C3.51384 0 5.00923 0 8 0H37.8V16H7.99999C5.00923 16 3.51384 16 2.4 15.3569C1.67031 14.9356 1.06437 14.3297 0.643078 13.6C0 12.4862 0 10.9908 0 8Z" fill="#FFF4E0" />
        <path d="M-0.8 4.8C-0.8 1.70721 1.70721 -0.8 4.8 -0.8H37.8V0.8H4.8C2.59086 0.8 0.8 2.59086 0.8 4.8H-0.8ZM37.8 16.8H4.8C1.70721 16.8 -0.8 14.2928 -0.8 11.2L0.8 11.2C0.8 13.4091 2.59086 15.2 4.8 15.2H37.8V16.8ZM4.8 16.8C1.70721 16.8 -0.8 14.2928 -0.8 11.2V4.8C-0.8 1.70721 1.70721 -0.8 4.8 -0.8V0.8C2.59086 0.8 0.8 2.59086 0.8 4.8V11.2C0.8 13.4091 2.59086 15.2 4.8 15.2V16.8ZM37.8 0V16V0Z" fill="#FFD99F" mask="url(#path-1-inside-1_6511_2857)" />
        <g clip-path="url(#clip0_6511_2857)">
            <path d="M12.8549 10.7998H5.94292C5.58566 10.7998 5.29492 11.069 5.29492 11.3998C5.29492 11.7306 5.58566 11.9998 5.94292 11.9998H12.8549C13.2122 11.9998 13.5029 11.7306 13.5029 11.3998C13.5029 11.069 13.2122 10.7998 12.8549 10.7998Z" fill="#FF9900" />
            <path d="M13.934 4.8001C13.4576 4.8001 13.07 5.15891 13.07 5.6001C13.07 5.89651 13.2472 6.15289 13.5068 6.29129C13.007 7.38729 12.2272 8.05969 11.4984 7.99889C10.688 7.9377 10.027 7.05049 9.66242 5.56609C10.1298 5.45649 10.478 5.06649 10.478 4.6001C10.478 4.0485 9.99376 3.6001 9.39803 3.6001C8.8023 3.6001 8.31803 4.0485 8.31803 4.6001C8.31803 5.0665 8.66622 5.4565 9.13364 5.56609C8.76903 7.05049 8.10806 7.9377 7.29764 7.99889C6.57189 8.05969 5.78865 7.38729 5.28928 6.29129C5.5489 6.15289 5.72603 5.89649 5.72603 5.6001C5.72603 5.15891 5.33851 4.8001 4.86203 4.8001C4.38556 4.8001 3.99805 5.15891 3.99805 5.6001C3.99805 6.01051 4.335 6.3457 4.76527 6.39129L5.59731 10.4001H13.1988L14.0308 6.39129C14.4611 6.3457 14.798 6.01051 14.798 5.6001C14.798 5.15891 14.4105 4.8001 13.934 4.8001Z" fill="url(#paint0_linear_6511_2857)" />
        </g>
        <path d="M18.1436 10.5V4.9H20.2156C20.6636 4.9 21.0343 4.97467 21.3276 5.124C21.6209 5.27333 21.8396 5.47867 21.9836 5.74C22.1276 6.00133 22.1996 6.29467 22.1996 6.62C22.1996 6.92933 22.1303 7.21467 21.9916 7.476C21.8529 7.732 21.6369 7.94 21.3436 8.1C21.0503 8.25467 20.6743 8.332 20.2156 8.332H19.1676V10.5H18.1436ZM19.1676 7.5H20.1516C20.5089 7.5 20.7649 7.42267 20.9196 7.268C21.0796 7.108 21.1596 6.892 21.1596 6.62C21.1596 6.34267 21.0796 6.12667 20.9196 5.972C20.7649 5.812 20.5089 5.732 20.1516 5.732H19.1676V7.5ZM23.003 10.5V4.9H25.059C25.507 4.9 25.875 4.97733 26.163 5.132C26.4563 5.28133 26.675 5.48667 26.819 5.748C26.963 6.004 27.035 6.28933 27.035 6.604C27.035 6.94533 26.9443 7.25733 26.763 7.54C26.587 7.82267 26.3097 8.028 25.931 8.156L27.091 10.5H25.915L24.875 8.292H24.027V10.5H23.003ZM24.027 7.54H24.995C25.3363 7.54 25.587 7.45733 25.747 7.292C25.907 7.12667 25.987 6.908 25.987 6.636C25.987 6.36933 25.907 6.156 25.747 5.996C25.5923 5.836 25.339 5.756 24.987 5.756H24.027V7.54ZM30.6114 10.596C30.0514 10.596 29.5607 10.4733 29.1394 10.228C28.7234 9.98267 28.3954 9.644 28.1554 9.212C27.9207 8.77467 27.8034 8.27067 27.8034 7.7C27.8034 7.12933 27.9207 6.628 28.1554 6.196C28.3954 5.75867 28.7234 5.41733 29.1394 5.172C29.5607 4.92667 30.0514 4.804 30.6114 4.804C31.166 4.804 31.654 4.92667 32.0754 5.172C32.4967 5.41733 32.8247 5.75867 33.0594 6.196C33.294 6.628 33.4114 7.12933 33.4114 7.7C33.4114 8.27067 33.294 8.77467 33.0594 9.212C32.8247 9.644 32.4967 9.98267 32.0754 10.228C31.654 10.4733 31.166 10.596 30.6114 10.596ZM30.6114 9.676C31.1447 9.676 31.5687 9.5 31.8834 9.148C32.2034 8.796 32.3634 8.31333 32.3634 7.7C32.3634 7.08667 32.2034 6.604 31.8834 6.252C31.5687 5.9 31.1447 5.724 30.6114 5.724C30.078 5.724 29.6514 5.9 29.3314 6.252C29.0114 6.604 28.8514 7.08667 28.8514 7.7C28.8514 8.31333 29.0114 8.796 29.3314 9.148C29.6514 9.5 30.078 9.676 30.6114 9.676Z" fill="#2A3256" />
        <defs>
            <linearGradient id="paint0_linear_6511_2857" x1="9.39805" y1="3.6001" x2="9.39805" y2="10.4001" gradientUnits="userSpaceOnUse">
                <stop stop-color="#FFC045" />
                <stop offset="1" stop-color="#FF9900" />
            </linearGradient>
            <clipPath id="clip0_6511_2857">
                <rect width="12.8" height="12.8" fill="white" transform="translate(3.19922 1.6001)" />
            </clipPath>
        </defs>
    </svg>
);

export const FormProTypeContent = ({ setIspro }) => {

    return (
        <div
            className="eb-form-editor-formtype-item eb-form-editor-formtype-item-pro"
            onClick={() => setIspro(true)}
        >
            <div className="eb-form-editor-formtype-icon">
                <img
                    src={MultistepFormIconPro}
                    alt={"Multi Step form icon"}
                />

                <ProBadge />
            </div>
            <span>Multi Step Form</span>
        </div>
    )
}
