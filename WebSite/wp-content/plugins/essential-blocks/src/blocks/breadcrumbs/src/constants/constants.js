import { __ } from "@wordpress/i18n";
import { Dashicon } from "@wordpress/components";

// the consts defined here should be unique from one another
export const WRAPPER_BG = "wrprBg";
export const WRAPPER_MARGIN = "wrpMargin";
export const WRAPPER_PADDING = "wrpPadding";
export const WRAPPER_BORDER_SHADOW = "wrpBorderShadow";
export const BREADCRUMB_PADDING = "breadcrumbPadding";
export const BREADCRUMB_BORDER_SHADOW = "breadcrumbBorderShadow";
export const PREFIX_ICON_SIZE = "prefixIcon";
export const SEPARATOR_ICON_SIZE = "prefixIcon";

export const ALIGNMENT = [
    { label: __(<Dashicon icon={"editor-alignleft"} />), value: "flex-start" },
    { label: __(<Dashicon icon={"editor-aligncenter"} />), value: "center" },
    { label: __(<Dashicon icon={"editor-alignright"} />), value: "flex-end" },
];
export const PREFIX_TYPES = [
    { label: __("Text", "essential-blocks"), value: "text" },
    { label: __("Icon", "essential-blocks"), value: "icon" },
];
export const BREADCRUMB_TYPES = [
    { label: __("Normal", "essential-blocks"), value: "normal" },
    { label: __("Hover", "essential-blocks"), value: "hover" },
];
