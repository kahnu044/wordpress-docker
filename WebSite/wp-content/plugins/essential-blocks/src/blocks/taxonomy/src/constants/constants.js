import { __ } from "@wordpress/i18n";
import { Dashicon } from "@wordpress/components";

// the consts defined here should be unique from one another
export const WRAPPER_BG = "wrprBg";
export const WRAPPER_MARGIN = "wrpMargin";
export const WRAPPER_PADDING = "wrpPadding";
export const WRAPPER_BORDER_SHADOW = "wrpBorderShadow";

export const TAXONOMIES_MARGIN = "filterMargin";
export const TAXONOMIES_PADDING = "filterItmPadding";
export const TAXONOMIES_BORDER_SHADOW = "filterItmBdrShdw";
export const TAXONOMIES_GAP = "itemGap";

export const PREFIX_ICON_SIZE = "prefixIcon";
export const SUFFIX_ICON_SIZE = "suffixIcon";

// range control
export const ICON_SIZE = "iconSize";

export const UNIT_TYPES = [
    { label: "px", value: "px" },
    { label: "em", value: "em" },
    { label: "%", value: "%" },
];

export const ALIGNMENT = [
    { label: __(<Dashicon icon={"editor-alignleft"} />), value: "flex-start" },
    { label: __(<Dashicon icon={"editor-aligncenter"} />), value: "center" },
    { label: __(<Dashicon icon={"editor-alignright"} />), value: "flex-end" },
];

export const PREFIX_TYPES = [
    { label: __("icon", "essential-blocks"), value: "icon" },
    { label: __("Text", "essential-blocks"), value: "text" },
    { label: __("none", "essential-blocks"), value: "none" },
];
export const DISPLAY_STYLE = [
    { label: __("Inline", "essential-blocks"), value: "display-inline" },
    { label: __("Block", "essential-blocks"), value: "display-block" },
];
export const NORMAL_HOVER = [
    { label: "Normal", value: "normal" },
    { label: "Hover", value: "hover" },
];
export const SOURCES = [
    { label: "Current Post", value: "current-post" },
    { label: "All ", value: "all-taxonomies" },
];
