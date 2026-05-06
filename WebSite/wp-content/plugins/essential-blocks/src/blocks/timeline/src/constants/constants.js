import { Dashicon } from "@wordpress/components";
import { __ } from "@wordpress/i18n";

// the consts defined here should be unique from one another
export const WRAPPER_MARGIN = "wrpMargin";
export const WRAPPER_PADDING = "wrpPadding";
export const WRAPPER_BORDER_SHADOW = "wrpBorderShadow";
export const WRAPPER_BG = "wrpBG";

export const COLUMN_PADDING = "columnPadding";
export const COLUMN_BORDER_SHADOW = "columnBorderShadow";

export const THUMBNAIL_IMAGE_SIZE = "thumbnailImageSize";
export const ITEM_ICON_IMAGE_SIZE = "itemIconSize";
export const THUMBNAIL_BORDER_RADIUS = "thumbnailBDR";
export const THUMBNAIL_MARGIN = "thumbnailMargin";
export const TITLE_MARGIN = "titleMargin";
export const CONTENT_MARGIN = "contentMargin";
export const READMORE_MARGIN = "readmoreMargin";
export const READMORE_PADDING = "readmorePadding";
export const ICON_META_SPACE = "dateMetaSpace";
export const META_GAP = "metaGap";
export const BTN_BORDER_RADIUS = "btnBDR";

export const TIMELINE_ICON_SIZE = "iconSize";
export const ICON_CONTENT_GAP = "iconContentGap";
export const BTN_BORDER_SHADOW = "btnBorder";
export const ITEM_ICON_SIZE = "itemIconSize";
export const ITEM_ICON_PADDING = "itemIconPadding";
export const MEDIA_BORDER_SHADOW = "mediaBorderShadow";
export const BULLET_SIZE = "bulletSize";
export const BULLET_BORDER_SHADOW = "bulletBorderShadow";
export const ICON_WIDTH = "iconWidth";
export const CARD_GAP = "cardGap";
export const LINE_CARD_GAP = "lineCardGap";
export const SUBHEADING_BORDER_SHADOW = "subheadingBorderShadow";
export const LABEL_GAP = "labelGap";
export const LABEL_BORDER_SHADOW = "labelBorderShadow";
export const LABEL_BOTTOM_SPACE = "labelBottomSpace";

// ImageComponent constants for timeline images
export const TIMELINE_IMAGE_WIDTH = "timelineImageWidth";
export const TIMELINE_IMAGE_HEIGHT = "timelineImageHeight";
export const TIMELINE_IMAGE_BORDER = "timelineImageBorder";
export const TIMELINE_IMAGE_PADDING = "timelineImagePadding";
export const TIMELINE_IMAGE_MARGIN = "timelineImageMargin";
export const TIMELINE_IMAGE_RADIUS = "timelineImageRadius";

export const CONTENT_SOURCE = [
    { label: __("Custom", "essential-blocks-pro"), value: "custom-content" },
    { label: __("Dynamic", "essential-blocks-pro"), value: "dynamic-content" },
];

export const UNIT_TYPES = [
    { label: "px", value: "px" },
    { label: "em", value: "em" },
    { label: "%", value: "%" },
];

export const HEIGHT_UNIT_TYPES = [
    { label: "px", value: "px" },
    { label: "em", value: "em" },
    { label: "vh", value: "vh" },
];

export const FONT_UNIT_TYPES = [
    { label: "px", value: "px" },
    { label: "em", value: "em" },
    { label: "rem", value: "rem" },
];

export const NORMAL_HOVER = [
    { label: "Normal", value: "normal" },
    { label: "Hover", value: "hover" },
];

export const TITLE_TAGS = [
    { label: "H1", value: "h1" },
    { label: "H2", value: "h2" },
    { label: "H3", value: "h3" },
    { label: "H4", value: "h4" },
    { label: "H5", value: "h5" },
    { label: "H6", value: "h6" },
    { label: "P", value: "p" },
];

export const MEDIA_TYPES = [
    { label: __("None", "essential-blocks"), value: "none" },
    { label: __("Icon", "essential-blocks"), value: "icon" },
    { label: __("Image", "essential-blocks"), value: "image" },
];

export const TEXT_ALIGN = [
    { label: __("Left", "essential-blocks"), value: "left" },
    { label: __("Center", "essential-blocks"), value: "center" },
    { label: __("Right", "essential-blocks"), value: "right" },
];

export const TIMELINE_LAYOUTS = [
    { label: __("Vertical", "essential-blocks"), value: "vertical" },
    { label: __("Horizontal", "essential-blocks"), value: "horizontal" },
];

export const TIMELINE_LAYOUT_POSITIONS = [
    { label: __(<Dashicon icon={"editor-alignleft"} />, "essential-blocks"), value: "left-layout" },
    { label: __(<Dashicon icon={"editor-alignright"} />, "essential-blocks"), value: "right-layout" },
    { label: __(<Dashicon icon={"editor-aligncenter"} />, "essential-blocks"), value: "alternating-layout" },
];

export const TIMELINE_VERTICAL_PRESETS = [
    { label: __("Preset 1", "essential-blocks"), value: "preset-1" },
    { label: __("Preset 2", "essential-blocks"), value: "preset-2" },
];

export const TIMELINE_LINE_STYLES = [
    { label: __("Style One", "essential-blocks"), value: "one" },
    { label: __("Style Two", "essential-blocks"), value: "two" },
    { label: __("Style Three", "essential-blocks"), value: "three" },
    { label: __("Style Four", "essential-blocks"), value: "four" },
    // { label: __("Style Five", "essential-blocks"), value: "five" },
];

export const PROGRESS_LINE_STYLES = [
    { label: __("Solid", "essential-blocks"), value: "solid" },
    { label: __("Dashed", "essential-blocks"), value: "dashed" },
    { label: __("Dotted", "essential-blocks"), value: "dotted" },
];

// Additional constants for new timeline structure
export const TIMELINE_ICON_BORDER_RADIUS = "timelineIconBDR";
export const TIMELINE_CONTENT_PADDING = "timelineContentPadding";
export const TIMELINE_CONTENT_MARGIN = "timelineContentMargin";
export const TIMELINE_CONTENT_BORDER_SHADOW = "timelineContentBorderShadow";
export const TIMELINE_CONTENT_BG = "timelineContentBG";
export const DATE_SECTION_MARGIN = "dateSectionMargin";
export const DATE_SECTION_PADDING = "dateSectionPadding";
export const TIMELINE_ICON_WIDTH = "timelineIconWidth";

export const DEFAULT_TIMELINE_DATA = [
    {
        itemMediaType: "none",
        icon: "fas fa-check",
        title: __("Release Note December 2025", "essential-blocks"),
        content:
            __("We started our journey with a small team of passionate developers", "essential-blocks"),
        richContent:
            "<p>Interactions, and AI agents that power your apps and business — all inside Softr! Use a visual builder to set triggers, actions, and logic, or start fast with templates and the AI Co-builder.</p><p><strong>New Release:</strong>&nbsp;1,000 bulk redirects included per project</p><p><strong>Bug Fixed:</strong>&nbsp;Build workflows, user interactions, and AI agents that power your apps and business</p><p><strong>Improvement:</strong>&nbsp;Interactions, and AI agents that power your business</p>",
        iconColor: "",
        showReadMore: false,
        readmoreText: __("Read More", "essential-blocks"),
        link: "",
        linkOpenNewTab: "false",
        iconBackgroundColor: "",
        date: "Jan 2020",
        subheading: __("V3.0.3", "essential-blocks"),
        timelineImage: "",
        timelineImageId: "",
        timelineImageAlt: "",
        timelineImageTitle: "",
    },
    {
        itemMediaType: "none",
        icon: "fas fa-users",
        title: __("Release Note December 2025", "essential-blocks"),
        content:
            __("Grew our team to 50 talented professionals across different departments", "essential-blocks"),
        richContent:
            "<p>Interactions, and AI agents that power your apps and business — all inside Softr! Use a visual builder to set triggers, actions, and logic, or start fast with templates and the AI Co-builder.</p><p><strong>New Release:</strong>&nbsp;1,000 bulk redirects included per project</p><p><strong>Bug Fixed:</strong>&nbsp;Build workflows, user interactions, and AI agents that power your apps and business</p><p><strong>Improvement:</strong>&nbsp;Interactions, and AI agents that power your business</p>",
        iconColor: "",
        showReadMore: false,
        readmoreText: __("Read More", "essential-blocks"),
        link: "",
        linkOpenNewTab: "false",
        iconBackgroundColor: "",
        date: "Jun 2021",
        subheading: __("V2.0.3", "essential-blocks"),
        timelineImage: "",
        timelineImageId: "",
        timelineImageAlt: "",
        timelineImageTitle: "",
    },
    {
        itemMediaType: "none",
        icon: "fas fa-trophy",
        title: __("Release Note December 2025", "essential-blocks"),
        content:
            __("Received the Best Innovation Award from the industry association", "essential-blocks"),
        richContent:
            "<p>Interactions, and AI agents that power your apps and business — all inside Softr! Use a visual builder to set triggers, actions, and logic, or start fast with templates and the AI Co-builder.</p><p><strong>New Release:</strong>&nbsp;1,000 bulk redirects included per project</p><p><strong>Bug Fixed:</strong>&nbsp;Build workflows, user interactions, and AI agents that power your apps and business</p><p><strong>Improvement:</strong>&nbsp;Interactions, and AI agents that power your business</p>",
        iconColor: "",
        showReadMore: false,
        readmoreText: __("Read More", "essential-blocks"),
        link: "",
        linkOpenNewTab: "false",
        iconBackgroundColor: "",
        date: "Dec 2022",
        subheading: __("V1.0.3", "essential-blocks"),
        timelineImage: "",
        timelineImageId: "",
        timelineImageAlt: "",
        timelineImageTitle: "",
    },
];

export const DEFAULT_TIMELINE_LABELS = [
    {
        value: 1,
        label: __("New Features", "essential-blocks"),
        textColor: "#000",
        backgroundColor: "#E1F2E9",
        borderColor: "#E1F2E9",
    },
    {
        value: 2,
        label: __("Improvement", "essential-blocks"),
        textColor: "#000",
        backgroundColor: "#E8EDF7",
        borderColor: "#E8EDF7",
    },
    {
        value: 3,
        label: __("Bug Fixed", "essential-blocks"),
        textColor: "#000000",
        backgroundColor: "#F9EFEF",
        borderColor: "#FCE8E8",
    },
];


