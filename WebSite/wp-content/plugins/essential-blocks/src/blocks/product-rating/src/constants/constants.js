import { __ } from "@wordpress/i18n";
import { Dashicon } from "@wordpress/components";

// the consts defined here should be unique from one another
export const WRAPPER_BG = "wrprBg";
export const WRAPPER_MARGIN = "wrpMargin";
export const WRAPPER_PADDING = "wrpPadding";
export const WRAPPER_BORDER_SHADOW = "wrpBorderShadow";

export const RATING_SIZE = "ratingIcon";
export const RATING_GAP = "ratingGap";
export const COUNT_GAP = "countGap";

export const STAR_TYPES = [
    { label: __("All", "essential-blocks"), value: "all" },
    { label: __("Rated", "essential-blocks"), value: "rated" },
];
export const DISPLAY_TYPES = [
    { label: __("Inline", "essential-blocks"), value: "row" },
    { label: __("Block", "essential-blocks"), value: "column" },
    { label: __("Block Reverse", "essential-blocks"), value: "column-reverse" },
    { label: __("Inline Reverse", "essential-blocks"), value: "row-reverse" },
];
export const STARS_VARIATION = [
    { label: __("Styles 1", "essential-blocks"), value: "far fa-star" },
    { label: __("Styles 2", "essential-blocks"), value: "far fa-star-half" },
    { label: __("Styles 3", "essential-blocks"), value: "far fa-star-half-stroke" },
    { label: __("Styles 4", "essential-blocks"), value: "fas fa-star" },
    { label: __("Styles 5", "essential-blocks"), value: "fas fa-star-half" },
];

export const ALIGNMENT = [
    { label: __(<Dashicon icon={"editor-alignleft"} />), value: "flex-start" },
    { label: __(<Dashicon icon={"editor-aligncenter"} />), value: "center" },
    { label: __(<Dashicon icon={"editor-alignright"} />), value: "flex-end" },
];
