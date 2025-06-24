import { wrapMarginConst, wrapPaddingConst, WrpBdShadowConst, WrpBgConst } from "./constants";

import {
    generateDimensionsAttributes,
    generateTypographyAttributes,
    generateBackgroundAttributes,
    generateBorderShadowAttributes,
    generateResponsiveRangeAttributes,
} from "@essential-blocks/controls";

import { typoPrefix_title, typoPrefix_desc } from "./constants/typographyConstants";

const attributes = {
    // responsive control attributes ⬇
    resOption: {
        type: "string",
        default: "Desktop",
    },
    // uniqueIdNumber attribute for making unique className
    uniqueIdNumber: {
        type: "number",
    },
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
    searchAddress: {
        type: "string",
        default: "New York, NY, USA",
    },
    latitude: {
        type: "string",
        default: "40.7127753",
    },
    longitude: {
        type: "string",
        default: "-74.0059728",
    },
    mapType: {
        type: "string",
        default: "roadmap",
    },
    mapZoom: {
        type: "string",
        default: "13",
    },
    mapHeight: {
        type: "string",
        default: "400",
    },
    marker: {
        type: "array",
        default: [],
    },
    titleColor: {
        type: "string",
        default: "var(--eb-global-heading-color)",
    },
    titleHoverColor: {
        type: "string",
        default: "var(--eb-global-link-color)",
    },
    descColor: {
        type: "string",
        default: "var(--eb-global-text-color)",
    },
    descHoverColor: {
        type: "string",
    },
    imageSize: {
        type: "number",
        default: 32,
    },
    googlemMapStyle: {
        type: "string",
        default: "standard",
    },
    googleMapStyle: {
        type: "string",
        default: "standard",
    },
    snazzyMapStyle: {
        type: "string",
        default: "default",
    },
    themeSource: {
        type: "string",
        default: "google_theme",
    },
    // dimensions Control related Attributes start
    ...generateDimensionsAttributes(wrapMarginConst),
    ...generateDimensionsAttributes(wrapPaddingConst),
    ...generateBackgroundAttributes(WrpBgConst),
    ...generateBorderShadowAttributes(WrpBdShadowConst),
    // typography attributes ⬇
    ...generateTypographyAttributes(typoPrefix_title, {
        fontSize: 14,
    }),
    ...generateTypographyAttributes(typoPrefix_desc, {
        fontSize: 13,
    }),

    cover: {
        type: "string",
        default: "",
    },
};

export default attributes;
