import { __ } from "@wordpress/i18n";


// Range control names
export const HOTSPOT_SIZE_RANGE = "hotspotSize";
export const IMAGE_WIDTH = "imageWidth";
export const IMAGE_HEIGHT_RANGE = "imageHeight";
export const TOOLTIP_WIDTH_RANGE = "tooltipWidth";
export const IMAGE_ALIGNMENT = "imageAlign";
export const HOTSPOT_ICON_SIZE = "hotspotIconSize";

// Dimension control names
export const WRAPPER_MARGIN = "wrapperMargin";
export const WRAPPER_PADDING = "wrapperPadding";
export const IMAGE_MARGIN = "imageMargin";
export const IMAGE_PADDING = "imagePadding";
// export const HOTSPOT_MARGIN = "hotspotMargin";
export const HOTSPOT_PADDING = "hotspotPadding";
export const TOOLTIP_PADDING = "tooltipPadding";

// Background control names
export const WRAPPER_BG = "wrapperBg";
export const HOTSPOT_BG = "hotspotBg";
export const TOOLTIP_BG = "tooltipBg";

export const HOTSPOT_ICON_WIDTH = "hotspotIconWidth";

// Border shadow control names
export const WRAPPER_BORDER_SHADOW = "wrapperBorderShadow";
export const IMAGE_BORDER_SHADOW = "imageBorderShadow";
export const HOTSPOT_BORDER_SHADOW = "hotspotBorderShadow";
export const TOOLTIP_BORDER_SHADOW = "tooltipBorderShadow";

// Typography prefixes
export const TOOLTIP_TITLE_TYPOGRAPHY = "tooltipTitleTypography";
export const TOOLTIP_CONTENT_TYPOGRAPHY = "tooltipContentTypography";
export const HOTSPOT_TEXT_TYPOGRAPHY = "hotspotTextTypography";

export const HOTSPOT_NUMBER_SIZE = "hotspotNumberSize";
export const HOTSPOT_DOT_SIZE = "hotspotDotSize";
export const HOTSPOT_DOT_WIDTH = "hotspotDotWidth";
export const HOTSPOT_DOT_HEIGHT = "hotspotDotHeight";
export const TOOLTIP_OFFSET = "tooltipOffset";
export const TOOLTIP_ARROW_SIZE = "tooltipArrowSize";

// Hotspot marker types
export const HOTSPOT_MARKER_TYPES = [
    { label: __("Icon", "essential-blocks"), value: "icon" },
    { label: __("Text", "essential-blocks"), value: "text" },
    { label: __("Number", "essential-blocks"), value: "number" },
    { label: __("Dot", "essential-blocks"), value: "dot" },
];

export const HOTSPOT_ANIMATIONS = [
    { label: __("None", "essential-blocks"), value: "none" },
    { label: __("Glow", "essential-blocks"), value: "glow", isPro: true },
    { label: __("Pulse", "essential-blocks"), value: "pulse", isPro: true },
    { label: __("Bounce", "essential-blocks"), value: "bounce", isPro: true },
    { label: __("Shake", "essential-blocks"), value: "shake", isPro: true },
    { label: __("Tada", "essential-blocks"), value: "tada", isPro: true },
    { label: __("Heartbeat", "essential-blocks"), value: "heartbeat", isPro: true },
    { label: __("Flash", "essential-blocks"), value: "flash", isPro: true },
];

export const TOOLTIP_ANIMATIONS = [
    { label: __("None", "essential-blocks"), value: "none" },
    { label: __("Slide In", "essential-blocks-pro"), value: "slideIn", isPro: true },
    { label: __("Fade In", "essential-blocks-pro"), value: "fadeIn", isPro: true },
    { label: __("Zoom In", "essential-blocks-pro"), value: "zoomIn", isPro: true },
    { label: __("Bounce In", "essential-blocks-pro"), value: "bounceIn", isPro: true },
    { label: __("Flip In", "essential-blocks-pro"), value: "flipIn", isPro: true },
];

// Tooltip positions
export const TOOLTIP_POSITIONS = [
    { label: __("Top", "essential-blocks"), value: "top" },
    { label: __("Bottom", "essential-blocks"), value: "bottom" },
    { label: __("Left", "essential-blocks"), value: "left" },
    { label: __("Right", "essential-blocks"), value: "right" },
];

// Tooltip triggers
export const TOOLTIP_TRIGGERS = [
    { label: __("Hover", "essential-blocks"), value: "hover" },
    { label: __("Click", "essential-blocks"), value: "click" },
    { label: __("Scroll", "essential-blocks"), value: "scroll", isPro: true },
    { label: __("Double Click", "essential-blocks"), value: "double-click", isPro: true },
    { label: __("Follow Cursor", "essential-blocks"), value: "follow-cursor", isPro: true },
];

// Unit types
export const SIZE_UNIT_TYPES = [
    { label: "px", value: "px" },
    { label: "%", value: "%" },
    { label: "em", value: "em" },
    { label: "rem", value: "rem" },
];

export const POSITION_UNIT_TYPES = [
    { label: "%", value: "%" },
    { label: "px", value: "px" },
];

export const CONTENT_TYPE = [
    { label: __("Content", "essential-blocks"), value: "content" },
    { label: __("Position", "essential-blocks"), value: "position" },
    { label: __("Tooltip", "essential-blocks"), value: "tooltip" },
];

export const MEDIA_TYPES = [
    { label: __("None", "essential-blocks"), value: "none" },
    { label: __("Icon", "essential-blocks"), value: "icon" },
    { label: __("Image", "essential-blocks"), value: "image" },
];

export const TOOLTIP_CONTNET_ALIGNMENT = [
    { label: __("Left", "essential-blocks"), value: "left" },
    { label: __("Center", "essential-blocks"), value: "center" },
    { label: __("Right", "essential-blocks"), value: "right" },
];

// Default hotspot
export const DEFAULT_HOTSPOT = {
    id: "",
    x: 50,
    y: 50,
    contentType: "content",
    markerType: "icon",
    icon: "fas fa-plus",
    text: "Hotspot 1",
    number: 1,
    enableTooltip: false,
    tooltipContent: "Hotspot 1 content",
    tooltipTitle: "Hotspot 1 title",
    mediaType: "none",
    tooltipContentIcon: "fas fa-plus",
    tooltipContentImage: "",
    tooltipContentImageAlt: "",
    tooltipContentImageId: "",
    link: "",
    linkNewTab: false,
    addNofollow: false,
};
