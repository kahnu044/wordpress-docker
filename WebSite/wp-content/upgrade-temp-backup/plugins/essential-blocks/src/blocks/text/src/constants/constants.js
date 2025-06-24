import { __ } from "@wordpress/i18n";
import { Dashicon } from "@wordpress/components";

// the consts defined here should be unique from one another
export const WRAPPER_BG = "wrprBg";
export const WRAPPER_MARGIN = "wrpMargin";
export const WRAPPER_PADDING = "wrpPadding";
export const WRAPPER_BORDER_SHADOW = "wrpBorderShadow";
export const COLUMNCOUNT = "coumnCount";
export const COLUMNGAP = "coumnGap";
export const COLUMNWIDTH = "coumnWidth";
export const COLUMNRULEWIDTH = "coumnRuleWidth";

export const UNIT_TYPES = [
    { label: "px", value: "px" },
    { label: "em", value: "em" },
];

export const NORMAL_HOVER = [
    { label: "Normal", value: "normal" },
    { label: "Hover", value: "hover" },
];

export const PRESETS = [
    { label: __("Default", "essential-blocks"), value: "preset-0" },
    { label: __("Preset 1", "essential-blocks"), value: "preset-1" },
    { label: __("Preset 2", "essential-blocks"), value: "preset-2" },
    { label: __("Preset 3", "essential-blocks"), value: "preset-3" },
];

export const TEXT_ALIGN = [
    { label: __(<Dashicon icon={"editor-alignleft"} />), value: "left" },
    { label: __(<Dashicon icon={"editor-aligncenter"} />), value: "center" },
    { label: __(<Dashicon icon={"editor-alignright"} />), value: "right" },
    { label: __(<Dashicon icon={"menu"} />), value: "justify" }
];

export const HEADING = [
    { label: __("H1", "essential-blocks"), value: "h1" },
    { label: __("H2", "essential-blocks"), value: "h2" },
    { label: __("H3", "essential-blocks"), value: "h3" },
    { label: __("H4", "essential-blocks"), value: "h4" },
    { label: __("H5", "essential-blocks"), value: "h5" },
    { label: __("H6", "essential-blocks"), value: "h6" },
    { label: __("P", "essential-blocks"), value: "p" },
    { label: __("Span", "essential-blocks"), value: "span" },
];

export const SOURCE = [
    { label: __("Custom", "essential-blocks"), value: "custom" },
    { label: __("Dynamic Content", "essential-blocks"), value: "dynamic-content" },
    { label: __("Dynamic Excerpt", "essential-blocks"), value: "dynamic-excerpt" }
];

export const COLUMNRULESTYLE = [
    { label: __("None", "essential-blocks"), value: "none" },
    { label: __("Dashed", "essential-blocks"), value: "dashed" },
    { label: __("Dotted", "essential-blocks"), value: "dotted" },
    { label: __("Solid", "essential-blocks"), value: "solid" },
    { label: __("Double", "essential-blocks"), value: "double" },
    { label: __("Groove", "essential-blocks"), value: "groove" },
    { label: __("Ridge", "essential-blocks"), value: "ridge" },
    { label: __("Ridge", "essential-blocks"), value: "ridge" }
];
