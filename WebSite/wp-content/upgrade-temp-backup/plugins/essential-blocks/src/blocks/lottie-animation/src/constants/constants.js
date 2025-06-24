import { __ } from "@wordpress/i18n";
import { Dashicon } from "@wordpress/components";

// the consts defined here should be unique from one another
export const WRAPPER_BG = "wrprBg";
export const WRAPPER_MARGIN = "wrpMargin";
export const WRAPPER_PADDING = "wrpPadding";
export const WRAPPER_BORDER_SHADOW = "wrpBorderShadow";

export const lottieWidth = "lottieWidth";
export const lottieHeight = "lottieHeight";

export const ALIGNMENT = [
    { label: __(<Dashicon icon={"editor-alignleft"} />), value: "flex-start" },
    { label: __(<Dashicon icon={"editor-aligncenter"} />), value: "center" },
    { label: __(<Dashicon icon={"editor-alignright"} />), value: "flex-end" },
];

export const PLAY_ON = [
    { label: __("Autoplay", "essential-blocks"), value: "none" },
    { label: __("Hover", "essential-blocks"), value: "hover" },
    { label: __("Click", "essential-blocks"), value: "click" },
    { label: __("Scroll", "essential-blocks"), value: "scroll" },
    { label: __("Viewport", "essential-blocks"), value: "viewport" },
];
export const SOURCE = [
    { label: __("Library", "essential-blocks"), value: "library" },
    { label: __("URL", "essential-blocks"), value: "url" },
];
export const CAPTION_TYPES = [
    { label: __("File Title", "essential-blocks"), value: "file-title" },
    { label: __("File Caption", "essential-blocks"), value: "file-caption" },
    { label: __("Custom Caption", "essential-blocks"), value: "custom-caption" },
];

export const sizeUnitTypes = [
    { label: "px", value: "px" },
    { label: "%", value: "%" },
    { label: "em", value: "em" },
];
