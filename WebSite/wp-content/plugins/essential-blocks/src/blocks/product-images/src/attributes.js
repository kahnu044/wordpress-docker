import {
    WRAPPER_MARGIN,
    WRAPPER_PADDING,
    WRAPPER_BORDER_SHADOW,
    WRAPPER_BG,
    META_ALIGNMENT,
    GALLERY_COLUMNS,
    GALLERY_COLUMN_GAP,
    GALLERY_COLUMN_SPACE,
    GALLERY_ICON_SIZE,
    //
    LARGE_IMAGE_HEIGHT,
    LARGE_IMAGE_WIDTH,
    LARGE_IMAGE_BORDER,
    FEATURE_IMG_MARGIN,
    THUMBNAILS_IMAGE_BORDER,
    ACTIVE_THUMBNAILS_IMAGE_BORDER
} from "./constants/constants";

import {
    generateDimensionsAttributes,
    generateTypographyAttributes,
    generateBackgroundAttributes,
    generateBorderShadowAttributes,
    generateResponsiveAlignAttributes,
    generateResponsiveRangeAttributes
} from "@essential-blocks/controls";

import * as typographyObjs from "./constants/typographyPrefixConstants";

const attributes = {
    resOption: {
        type: "string",
        default: "Desktop",
    },

    // blockId attribute for making unique className and other uniqueness
    blockId: {
        type: "string",
    },
    blockRoot: {
        type: "string",
        default: "essential_block",
    },
    blockMeta: {
        type: "object",
    },
    galleryPosition: {
        type: "string",
        default: "bottom",
    },
    largeImgScale: {
        type: 'string',
        default: "cover"
    },
    useAdaptiveHeight: {
        type: "boolean",
        default: false,
    },
    galleryArrowColor: {
        type: "string",
    },
    galleryArrowHoverColor: {
        type: "string",
    },
    galleryArrowBackgroundColor: {
        type: "string",
    },
    galleryArrowBackgroundHoverColor: {
        type: "string",
    },
    type: {
        type: "string",
        default: "post",
    },
    featureImgAlignment: {
        type: 'string',
        default: 'center',
    },
    disableNavArrow: {
        type: "boolean",
        default: false,
    },
    ...generateResponsiveRangeAttributes(GALLERY_COLUMNS, {
        defaultRange: 4,
        noUnits: true,
        defaultUnit: ""
    }),
    ...generateResponsiveRangeAttributes(GALLERY_COLUMN_GAP, {defaultRange: 10}),
    ...generateResponsiveRangeAttributes(GALLERY_COLUMN_SPACE),
    ...generateResponsiveRangeAttributes(GALLERY_ICON_SIZE),
    // typography attributes ⬇
    ...generateTypographyAttributes(Object.values(typographyObjs)),

    // margin padding attributes ⬇
    ...generateDimensionsAttributes(WRAPPER_MARGIN),
    ...generateDimensionsAttributes(WRAPPER_PADDING),
    ...generateDimensionsAttributes(FEATURE_IMG_MARGIN),

    // border shadow attributes ⬇
    ...generateBorderShadowAttributes(WRAPPER_BORDER_SHADOW, {
        // noShadow: true,
        // noBorder: true,
    }),
    ...generateBorderShadowAttributes(LARGE_IMAGE_BORDER),
    ...generateBorderShadowAttributes(THUMBNAILS_IMAGE_BORDER),
    ...generateBorderShadowAttributes(ACTIVE_THUMBNAILS_IMAGE_BORDER),
    // background attributes ⬇
    ...generateBackgroundAttributes(WRAPPER_BG, {
        noOverlay: true,
    }),
    ...generateResponsiveAlignAttributes(META_ALIGNMENT, {
        defaultAlign: "flex-start",
        defaultTabAlign: "flex-start",
        defaultMobileAlign: "flext-start",
    }),
    ...generateResponsiveRangeAttributes(LARGE_IMAGE_HEIGHT, {
        defaultRange: 410,
        defaultUnit: 'px'
    }),
    ...generateResponsiveRangeAttributes(LARGE_IMAGE_WIDTH),
};

export default attributes;
