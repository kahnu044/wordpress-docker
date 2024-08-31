import { __ } from "@wordpress/i18n";
import { Dashicon } from "@wordpress/components";

// the consts defined here should be unique from one another
export const WRAPPER_BG = "wrprBg";
export const WRAPPER_MARGIN = "wrpMargin";
export const WRAPPER_PADDING = "wrpPadding";
export const WRAPPER_BORDER_SHADOW = "wrpBorderShadow";

export const BUTTON_BORDER = "btnBorderShadow";
export const BUTTON_PADDING = "btnPadding";

export const QUANTITY_BORDER = "quantityBorderShadow";
export const QUANTITY_PADDING = "quantityPadding";

export const VARIABLE_FIELD_BORDER = "variableBorderShadow";
export const VARIABLE_FIELD_PADDING = "variablePadding";

export const ALIGNMENT = [
    { label: __(<Dashicon icon={"editor-alignleft"} />), value: "flex-start" },
    { label: __(<Dashicon icon={"editor-aligncenter"} />), value: "center" },
    { label: __(<Dashicon icon={"editor-alignright"} />), value: "flex-end" },
];

export const PRICE_TYPES = [
    { label: __("Regular Price", "essential-blocks"), value: "regular" },
    { label: __("Sale Price", "essential-blocks"), value: "sale" },
];

export const PRODUCT_TYPES = [
    { label: __("Simple Product", "essential-blocks"), value: "simple" },
    { label: __("Grouped Product", "essential-blocks"), value: "grouped" },
    { label: __("External/Affiliate Product", "essential-blocks"), value: "external" },
    { label: __("Variable Product", "essential-blocks"), value: "variable" },
];
