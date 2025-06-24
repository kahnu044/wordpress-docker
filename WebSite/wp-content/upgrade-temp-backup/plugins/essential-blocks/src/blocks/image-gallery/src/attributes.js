import {
    WRAPPER_BG,
    WRAPPER_MARGIN,
    WRAPPER_PADDING,
    WRAPPER_BORDER_SHADOW,
    GRID_COLUMNS,
    IMAGE_GAP,
    IMAGE_BORDER_SHADOW,
    CAPTION_MARGIN,
    CAPTION_PADDING,
    CAPTION_WIDTH,
    IMAGE_WIDTH,
    IMAGE_HEIGHT,
    IMAGE_MAX_WIDTH,
    IMAGE_MAX_HEIGHT,
    FILTER_PADDING,
    FILTER_MARGIN,
    FILTER_BORDER_SHADOW,
    LOADMORE_KEYS,
    LOADMORE_PADDING,
    LOADMORE_BORDER,
    DESCRIPTION_MARGIN,
    DESCRIPTION_PADDING,
    ICON_BORDER_SHADOW,
    CONTENT_PADDING,
    CONTENT_MARGIN,
    CONTENT_BORDER_SHADOW,
    OVERLAY_PADDING,
    FILTER_WRAPPER_BORDER_SHADOW,
} from "./constants";
import { FILTER_TYPOGRAPHY, LOADMORE_TYPOGRAPHY, CAPTION_TYPOGRAPHY, DESCRIPTION_TYPOGRAPHY, NOT_FOUND_TYPOGRAPHY } from "./typoConstants";
import { __ } from "@wordpress/i18n";

import {
    generateDimensionsAttributes,
    generateTypographyAttributes,
    generateBackgroundAttributes,
    generateBorderShadowAttributes,
    generateResponsiveRangeAttributes,
    EBButton
} from "@essential-blocks/controls";

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
    sources: {
        type: "array",
        default: [],
    },
    imageSize: {
        type: "string",
    },
    selectedImgIndex: {
        type: "number",
    },
    layouts: {
        type: "string",
        default: "grid",
    },
    displayCaption: {
        type: "boolean",
        default: false,
    },
    displayDescription: {
        type: "boolean",
        default: false,
    },
    captionOnHover: {
        type: "boolean",
        default: false,
    },
    newImage: {
        type: "string",
    },
    captionColor: {
        type: "string",
        default: "var(--eb-global-button-text-color)",
    },
    captionBGColor: {
        type: "string",
        default: "var(--eb-global-secondary-color)",
    },
    overlayColor: {
        type: "string",
        default: "rgba(0 0 0 / 0.7)",
    },
    horizontalAlign: {
        type: "string",
        default: "center",
    },
    verticalAlign: {
        type: "string",
        default: "bottom",
    },
    textAlign: {
        type: "string",
        default: "center",
    },
    styleNumber: {
        type: "string",
        default: "0",
    },
    overlayStyle: {
        type: "string",
        default: "overlay-bottom",
    },
    disableLightBox: {
        type: "boolean",
        default: false,
    },
    addCustomLink: {
        type: "boolean",
        default: false,
    },
    imageSizeType: {
        type: "string",
        default: "fixed",
    },
    imageAlignment: {
        type: "string",
        default: "flex-start",
    },

    enableFilter: {
        type: "boolean",
        default: false,
    },
    filterItems: {
        type: "array",
        default: [
            {
                value: "filter-item-1",
                label: __("Filter Item 1", "essential-blocks"),
            },
        ],
    },
    enableFilterAll: {
        type: "boolean",
        default: true,
    },
    filterAllTitle: {
        type: "string",
        default: "All",
    },
    defaultFilter: {
        type: "string"
    },
    filterColorType: {
        type: "string",
        default: "normal",
    },
    filterColor: {
        type: "string",
        default: "var(--eb-global-text-color)",
    },
    filterActColor: {
        type: "string",
        default: "var(--eb-global-button-text-color)",
    },
    filterHoverColor: {
        type: "string",
        default: "var(--eb-global-button-text-color)",
    },
    filterBGColor: {
        type: "string",
        default: "var(--eb-global-tertiary-color)",
    },
    filterActBGColor: {
        type: "string",
        default: "var(--eb-global-primary-color)",
    },
    filterHoverBGColor: {
        type: "string",
        default: "var(--eb-global-primary-color)",
    },
    select2Options: {
        type: "string",
        default: "",
    },
    enableIsotope: {
        type: "boolean",
        default: false,
    },
    disableIsotope: {
        type: "boolean",
        default: false,
    },
    enableLoadMore: {
        type: "boolean",
        default: false,
    },

    // cant delete it as we migrate it to imagesPerPage attribute
    imagesPerPage: {
        type: "number",
        default: 1,
    },
    imagesPerPageCount: {
        type: "number",
        default: 3,
    },

    enableInfiniteScroll: {
        type: "boolean",
        default: false,
    },

    presets: {
        type: "string",
        default: 'default',
    },
    lightboxIcon: {
        type: "string",
        default: 'fas fa-plus',
    },
    linkIcon: {
        type: "string",
        default: 'fas fa-link',
    },
    imageClickable: {
        type: "boolean",
        default: true,
    },
    descriptionColor: {
        type: "string",
        default: "var(--eb-global-button-text-color)",
    },
    descriptionBGColor: {
        type: "string",
    },
    iconType: {
        type: "string",
        default: "normal",
    },
    iconColor: {
        type: "string",
        default: "#444F62",
    },
    iconHoverColor: {
        type: "string",
        default: "#2673FF",
    },
    iconBGColor: {
        type: "string",
        default: "#ffffff",
    },
    iconHoverBGColor: {
        type: "string",
        default: "",
    },
    iconWidth: {
        type: "number",
        default: 40,
    },
    iconSize: {
        type: "number",
        default: 16,
    },
    contentAlign: {
        type: "string",
        default: 'center',
    },
    contentBGColor: {
        type: "string",
        default: 'var(--eb-global-secondary-color)',
    },
    maskColor: {
        type: "string",
        default: '#fff',
    },
    filterWrapperBGColor: {
        type: "string",
    },
    enableSearch: {
        type: "boolean",
        default: false,
    },
    unevenWidth: {
        type: "boolean",
        default: false,
    },

    notFoundColor: {
        type: "string",
        default: "var(--eb-global-text-color)",
    },
    notFoundText: {
        type: "string",
        default: "Image Not Found! Try Again"
    },
    version: {
        type: "string",
    },
    enableEmptyGrid: {
        type: "boolean",
        default: true,
    },
    cover: {
        type: "string",
        default: "",
    },

    // typography attributes ⬇
    ...generateTypographyAttributes(NOT_FOUND_TYPOGRAPHY, {
        fontSize: 14,
    }),
    ...generateTypographyAttributes(FILTER_TYPOGRAPHY, {
        fontSize: 13,
    }),
    ...generateTypographyAttributes(LOADMORE_TYPOGRAPHY, {
        fontSize: 16,
    }),
    ...generateTypographyAttributes(CAPTION_TYPOGRAPHY, {
        fontSize: 13,
    }),
    ...generateTypographyAttributes(DESCRIPTION_TYPOGRAPHY, {
        fontSize: 13,
    }),

    // margin padding attributes ⬇
    ...generateDimensionsAttributes(WRAPPER_MARGIN),
    ...generateDimensionsAttributes(WRAPPER_PADDING),
    ...generateDimensionsAttributes(CAPTION_MARGIN, {
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        isLinked: false,
    }),
    ...generateDimensionsAttributes(CAPTION_PADDING, {
        top: 5,
        bottom: 5,
        right: 10,
        left: 10,
        isLinked: false,
    }),
    ...generateDimensionsAttributes(DESCRIPTION_MARGIN, {
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        isLinked: false,
    }),
    ...generateDimensionsAttributes(DESCRIPTION_PADDING, {
        top: 5,
        bottom: 5,
        right: 10,
        left: 10,
        isLinked: false,
    }),

    // border shadow attributes ⬇
    ...generateBorderShadowAttributes(WRAPPER_BORDER_SHADOW, {
        bdrDefaults: {
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
        },
        // noShadow: true,
        // noBorder: true,
    }),
    ...generateBorderShadowAttributes(IMAGE_BORDER_SHADOW, {
        bdrDefaults: {
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
        },
        noShadow: true,
        // noBorder: true,
    }),

    // background attributes ⬇
    ...generateBackgroundAttributes(WRAPPER_BG, {
        defaultBgGradient: "linear-gradient(45deg,#ffffff,#ffffff)",
        noOverlay: true,
    }),

    // range controller Separator Line Grid Column
    ...generateResponsiveRangeAttributes(GRID_COLUMNS, {
        defaultRange: 3,
        defaultRangeTAB: 2,
        defaultRangeMOB: 1,
    }),
    // range controller Separator Image Gap
    ...generateResponsiveRangeAttributes(IMAGE_GAP, {
        defaultRange: 10,
        defaultRangeTAB: 10,
        defaultRangeMOB: 10,
    }),
    // range controller Separator Caption Width
    ...generateResponsiveRangeAttributes(CAPTION_WIDTH),

    //Image Controls
    ...generateResponsiveRangeAttributes(IMAGE_HEIGHT, {
        defaultRange: 300,
    }),
    ...generateResponsiveRangeAttributes(IMAGE_WIDTH, {
        defaultRange: 100,
        defaultUnit: "%",
    }),
    ...generateResponsiveRangeAttributes(IMAGE_MAX_HEIGHT),
    ...generateResponsiveRangeAttributes(IMAGE_MAX_WIDTH, {
        defaultRange: 100,
        defaultUnit: "%",
    }),

    ...generateDimensionsAttributes(FILTER_MARGIN, {
        top: 0,
        bottom: 0,
        right: 5,
        left: 5,
        isLinked: false,
    }),
    ...generateDimensionsAttributes(FILTER_PADDING, {
        top: 5,
        bottom: 5,
        right: 10,
        left: 10,
        isLinked: false,
    }),
    // border shadow attributes ⬇
    ...generateBorderShadowAttributes(FILTER_WRAPPER_BORDER_SHADOW),
    ...generateBorderShadowAttributes(FILTER_BORDER_SHADOW, {
        bdrDefaults: {
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
        },
        // noShadow: true,
        // noBorder: true,
    }),

    ...generateDimensionsAttributes(OVERLAY_PADDING),
    ...generateDimensionsAttributes(CONTENT_MARGIN),
    ...generateDimensionsAttributes(CONTENT_PADDING),
    // border shadow attributes ⬇
    ...generateBorderShadowAttributes(CONTENT_BORDER_SHADOW),

    ...generateBorderShadowAttributes(ICON_BORDER_SHADOW),
    ...EBButton?.addAttributes(
        LOADMORE_KEYS,
        '',
        true,
        {
            key: LOADMORE_TYPOGRAPHY,
            default: {
                fontSize: 16
            }
        },
        true,
        '',
        true,
        {
            key: LOADMORE_BORDER,
            default: {
                bdrDefaults: {
                    top: 0,
                    bottom: 0,
                    right: 0,
                    left: 0,
                },
                rdsDefaults: {
                    top: 0,
                    bottom: 0,
                    right: 0,
                    left: 0,
                    isLinked: false,
                },
                // noShadow: true,
                // noBorder: true,
            }
        },
        true,
        {
            key: LOADMORE_PADDING,
            default: {
                top: 14,
                bottom: 14,
                right: 14,
                left: 14,
                isLinked: true,
            }
        }
    ),
};

export default attributes;
