import { __ } from "@wordpress/i18n";
import {
    DirectionRowIcon,
    DirectionColumnIcon,
    DirectionRowReverseIcon,
    DirectionColumnReverseIcon,
    JustifyFlexStartIcon,
    JustifyCenterIcon,
    JustifyFlexEndIcon,
    JustifySpaceBetweenIcon,
    JustifySpaceAroundIcon,
    JustifySpaceEvenlyIcon,
    AlignFlexStartIcon,
    AlignCenterIcon,
    AlignFlexEndIcon,
    AlignStretchIcon,
    NoWrapIcon,
    WrapIcon,
} from "../helpers/align-icons";

import {
    preset1Icon,
    preset2Icon,
    preset3Icon,
    preset4Icon,
    preset5Icon,
    preset6Icon,
    preset7Icon,
    preset8Icon,
    preset9Icon,
    preset10Icon,
    preset11Icon,
    preset12Icon,
} from "../helpers/preset-icons";

// Wrapper
export const WRAPPER_BACKGROUND = "wrpBackground";
export const WRAPPER_BORDER = "wrpBrdShd";
export const WRAPPER_MARGIN = "wrpMargin";
export const WRAPPER_PADDING = "wrpPadding";

export const FLEX_DIRECTION_CONTROL = "flexDirection";
export const JUSTIFY_CONTENT_CONTROL = "justifyContent";
export const ALIGN_ITEM_CONTROL = "alignItems";
export const FLEX_WRAP_CONTROL = "flexWrap";

// Responsive Range Control Prefixes
export const CONTAINER_CUSTOM_WIDTH = "containerCustomWidth";
export const CONTENT_WIDTH = "contentWidth";
export const CONTENT_HEIGHT = "contentHeight";
export const FLEX_GAP = "flexGap";
export const FLEX_ROW_GAP = "flexRowGap";
export const FLEX_COLUMN_GAP = "flexColumnGap";

// Flex Direction Options
export const FLEX_DIRECTIONS = [
    { label: __(<DirectionRowIcon />), value: "row" },
    { label: __(<DirectionColumnIcon />), value: "column" },
    { label: __(<DirectionRowReverseIcon />), value: "row-reverse" },
    { label: __(<DirectionColumnReverseIcon />), value: "column-reverse" },
];

// Justify Content Options (for row direction - horizontal)
export const JUSTIFY_CONTENTS_ROW = [
    { label: __(<JustifyFlexStartIcon />), value: "flex-start" },
    { label: __(<JustifyCenterIcon />), value: "center" },
    { label: __(<JustifyFlexEndIcon />), value: "flex-end" },
    { label: __(<JustifySpaceBetweenIcon />), value: "space-between" },
    { label: __(<JustifySpaceAroundIcon />), value: "space-around" },
    { label: __(<JustifySpaceEvenlyIcon />), value: "space-evenly" },
];

// Justify Content Options (for column direction - vertical)
export const JUSTIFY_CONTENTS_COLUMN = [
    { label: __(<AlignFlexStartIcon />), value: "flex-start" },
    { label: __(<AlignCenterIcon />), value: "center" },
    { label: __(<AlignFlexEndIcon />), value: "flex-end" },
    { label: __(<JustifySpaceBetweenIcon />), value: "space-between" },
    { label: __(<JustifySpaceAroundIcon />), value: "space-around" },
    { label: __(<JustifySpaceEvenlyIcon />), value: "space-evenly" },
];

// Align Items Options (for row direction - vertical)
export const ALIGN_ITEMS_ROW = [
    { label: __(<AlignFlexStartIcon />), value: "flex-start" },
    { label: __(<AlignCenterIcon />), value: "center" },
    { label: __(<AlignFlexEndIcon />), value: "flex-end" },
    { label: __(<AlignStretchIcon />), value: "stretch" },
];

// Align Items Options (for column direction - horizontal)
export const ALIGN_ITEMS_COLUMN = [
    { label: __(<JustifyFlexStartIcon />), value: "flex-start" },
    { label: __(<JustifyCenterIcon />), value: "center" },
    { label: __(<JustifyFlexEndIcon />), value: "flex-end" },
    { label: __(<AlignStretchIcon />), value: "stretch" },
];

// Helper functions to get the correct icon set based on flex direction
export const getJustifyContentsOptions = (flexDirection) => {
    const isColumn = flexDirection === "column" || flexDirection === "column-reverse";
    return isColumn ? JUSTIFY_CONTENTS_COLUMN : JUSTIFY_CONTENTS_ROW;
};

export const getAlignItemsOptions = (flexDirection) => {
    const isColumn = flexDirection === "column" || flexDirection === "column-reverse";
    return isColumn ? ALIGN_ITEMS_COLUMN : ALIGN_ITEMS_ROW;
};

// Default exports for backward compatibility
export const JUSTIFY_CONTENTS = JUSTIFY_CONTENTS_ROW;
export const ALIGN_ITEMS = ALIGN_ITEMS_ROW;

// Flex Wrap Options
export const FLEX_WRAPS = [
    { label: __(<NoWrapIcon />), value: "nowrap" },
    { label: __(<WrapIcon />), value: "wrap" },
];

// Container Alignment Options
export const CONTENT_WIDTH_OPTIONS = [
    { label: __("Boxed", "essential-blocks"), value: "boxed" },
    { label: __("Full Width", "essential-blocks"), value: "full" },
];

export const CONTAINER_WIDTH = [
    { label: __("Full", "essential-blocks"), value: "full" },
    { label: __("Wide", "essential-blocks"), value: "wide" },
    { label: __("None", "essential-blocks"), value: undefined },
    { label: __("Custom", "essential-blocks"), value: "custom" },
];

export const HTML_TAGS = [
    { label: "div", value: "div" },
    { label: "section", value: "section" },
    { label: "article", value: "article" },
    { label: "main", value: "main" },
    { label: "aside", value: "aside" },
    { label: "header", value: "header" },
    { label: "footer", value: "footer" },
];

export const OVERFLOW = [
    { label: "Visible", value: "visible" },
    { label: "Hidden", value: "hidden" },
    { label: "Auto", value: "auto" },
];

// Unit Types for Gap
export const UNIT_TYPES = [
    { label: "px", value: "px" },
    { label: "em", value: "em" },
    // { label: "rem", value: "rem" },
    { label: "%", value: "%" },
];

export const LAYOUT_PRESETS = [
    { icon: preset1Icon, label: __("Direction Column", "essential-blocks"), value: "preset1" },
    { icon: preset2Icon, label: __("Direction Row", "essential-blocks"), value: "preset2" },
    { icon: preset3Icon, label: __("Two Columns", "essential-blocks"), value: "preset3" },
    { icon: preset4Icon, label: __("Sidebar Left", "essential-blocks"), value: "preset4" },
    { icon: preset5Icon, label: __("Four Columns", "essential-blocks"), value: "preset5" },
    { icon: preset6Icon, label: __("Three Columns", "essential-blocks"), value: "preset6" },
    { icon: preset7Icon, label: __("Grid 2x2", "essential-blocks"), value: "preset7" },
    { icon: preset8Icon, label: __("Header Content", "essential-blocks"), value: "preset8" },
    { icon: preset9Icon, label: __("Sidebar Right", "essential-blocks"), value: "preset9" },
    { icon: preset10Icon, label: __("Grid 3x2", "essential-blocks"), value: "preset10" },
    { icon: preset11Icon, label: __("Mixed Grid", "essential-blocks"), value: "preset11" },
    { icon: preset12Icon, label: __("Asymmetric Grid", "essential-blocks"), value: "preset12" },
];
