import { __ } from "@wordpress/i18n";
import { Dashicon } from "@wordpress/components";

// the consts defined here should be unique from one another
export const WRAPPER_BG = "wrprBg";
export const WRAPPER_MARGIN = "wrpMargin";
export const WRAPPER_PADDING = "wrpPadding";
export const WRAPPER_BORDER_SHADOW = "wrpBorderShadow";

// price
export const priceCurrencyMargin = "priceCurrencyMargin";
export const salepriceCurrencyMargin = "salepriceCurrencyMargin";

export const PREFIX_ICON_SIZE = "prefixIcon";
export const SUFFIX_ICON_SIZE = "suffixIcon";

export const ALIGNMENT = [
    { label: __(<Dashicon icon={"editor-alignleft"} />), value: "flex-start" },
    { label: __(<Dashicon icon={"editor-aligncenter"} />), value: "center" },
    { label: __(<Dashicon icon={"editor-alignright"} />), value: "flex-end" },
];
export const PRICE_VIEW = [
    { label: __("Inline", "essential-blocks"), value: "inline" },
    { label: __("Stacked", "essential-blocks"), value: "stacked" },
];

export const PREFIX_TYPES = [
    { label: __("icon", "essential-blocks"), value: "icon" },
    { label: __("Text", "essential-blocks"), value: "text" },
];
export const PRICE_TYPES = [
    { label: __("Regular", "essential-blocks"), value: "regular" },
    { label: __("Sale", "essential-blocks"), value: "sale" },
];

export const CURRENCY_ALIGN = [
    { label: __("Basline", "essential-blocks"), value: "baseline" },
    { label: __("Top", "essential-blocks"), value: "top" },
    { label: __("Bottom", "essential-blocks"), value: "bottom" },
    { label: __("Middle", "essential-blocks"), value: "middle" },
    { label: __("Sub", "essential-blocks"), value: "sub" },
    { label: __("Super", "essential-blocks"), value: "super" },
    { label: __("Text Top", "essential-blocks"), value: "text-top" },
    { label: __("Text Bottom", "essential-blocks"), value: "text-bottom" },
];
