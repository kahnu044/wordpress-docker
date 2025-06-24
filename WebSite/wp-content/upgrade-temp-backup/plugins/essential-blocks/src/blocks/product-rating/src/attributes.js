import {
    WRAPPER_BG,
    WRAPPER_MARGIN,
    WRAPPER_PADDING,
    WRAPPER_BORDER_SHADOW,
    RATING_SIZE,
    RATING_GAP,
    COUNT_GAP
} from "./constants/constants";

import {
    generateDimensionsAttributes,
    generateTypographyAttributes,
    generateBackgroundAttributes,
    generateBorderShadowAttributes,
    generateResponsiveRangeAttributes,
} from "@essential-blocks/controls";

import { typoRating } from "./constants/typographyPrefixConstants";

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
    showReviewCount: {
        type: "boolean",
        default: true,
    },
    showEmptyRating: {
        type: "boolean",
        default: false,
    },
    editLink: {
        type: "boolean",
        default: false,
    },
    ratingColor: {
        type: "string",
        default: "#E7E8E8",
    },
    ratedRatingColor: {
        type: "string",
        default: "#FDBC32",
    },
    ratingTextColor: {
        type: "string",
        default: "var(--eb-global-text-color)",
    },
    ratingURL: {
        type: "string",
        default: "#reviews",
    },
    singluarCaption: {
        type: "string",
        default: " Customer Rating",
    },
    pluralCaption: {
        type: "string",
        default: " Customer Ratings",
    },
    emptyCaption: {
        type: "string",
        default: " No Customer Ratings",
    },
    beforeCaption: {
        type: "string",
        default: "(",
    },
    afterCaption: {
        type: "string",
        default: ")",
    },
    displayType: {
        type: "string",
        default: "row",
    },
    alignment: {
        type: "string",
        default: "flex-start",
    },
    starsType: {
        type: "string",
        default: "all",
    },
    starsVariation: {
        type: "string",
        default: "far fa-star",
    },

    // typography attributes
    ...generateTypographyAttributes(typoRating, {
        fontSize: 16,
    }),
    // margin padding attributes ⬇
    ...generateDimensionsAttributes(WRAPPER_MARGIN),
    ...generateDimensionsAttributes(WRAPPER_PADDING),

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

    // background attributes ⬇
    ...generateBackgroundAttributes(WRAPPER_BG, {
        defaultBgGradient: "linear-gradient(45deg,#ffffff,#ffffff)",
    }),

    ...generateResponsiveRangeAttributes(RATING_SIZE, {
        defaultRange: 18,
    }),
    ...generateResponsiveRangeAttributes(RATING_GAP, {
        defaultRange: 3,
    }),
    ...generateResponsiveRangeAttributes(COUNT_GAP, {
        defaultRange: 5,
    }),
};

export default attributes;
