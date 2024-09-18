import { __ } from "@wordpress/i18n";
import { Dashicon } from "@wordpress/components";

// the consts defined here should be unique from one another
export const WRAPPER_MARGIN = "wrpMargin";
export const WRAPPER_PADDING = "wrpPadding";
export const WRAPPER_BORDER_SHADOW = "wrpBorderShadow";
export const WRAPPER_BG = "wrpBG";
export const GALLERY_COLUMNS = 'galleryColumns';
export const GALLERY_COLUMN_GAP = 'galleryColumnsGap';
export const GALLERY_COLUMN_SPACE = 'galleryColumnsSpace';
export const LARGE_IMAGE_HEIGHT = 'largeImgHeight';
export const LARGE_IMAGE_WIDTH = 'largeImgWidth';
export const LARGE_IMAGE_BORDER = 'largeImgBorder';
export const GALLERY_ICON_SIZE = 'galleryIconSize';
export const FEATURE_IMG_MARGIN = 'featureImgMargin';
export const THUMBNAILS_IMAGE_BORDER = 'thumbnailsBorderShadow';
export const ACTIVE_THUMBNAILS_IMAGE_BORDER = 'activeThumbnailsBorderShadow';


// old
export const META_ALIGNMENT = 'metaAlign';
export const METAGAP = 'metaGap';
export const META_DISPLAY = [
    { label: "Inline", value: "inline" },
    { label: "Stacked", value: "stacked" },
];
export const TEXT_ALIGN = [
    { label: __(<Dashicon icon={"editor-alignleft"} />), value: "flex-start" },
    { label: __(<Dashicon icon={"editor-aligncenter"} />), value: "center" },
    { label: __(<Dashicon icon={"editor-alignright"} />), value: "flex-end" },
];
export const UNIT_TYPES = [
    { label: "px", value: "px" },
    { label: "%", value: "%" },
    { label: "em", value: "em" },
];
export const GALLERY_POSITON = [
    { label: __("Left", "essential-blocks"), value: "left" },
    { label: __("Top", "essential-blocks"), value: "top" },
    { label: __("Right", "essential-blocks"), value: "right" },
    { label: __("Bottom", "essential-blocks"), value: "bottom" },
];

export const FEATURE_ALIGNMENT = [
    { label: __(<Dashicon icon={"editor-alignleft"} />), value: "flex-start" },
    { label: __(<Dashicon icon={"editor-aligncenter"} />), value: "center" },
    { label: __(<Dashicon icon={"editor-alignright"} />), value: "flex-end" },
];