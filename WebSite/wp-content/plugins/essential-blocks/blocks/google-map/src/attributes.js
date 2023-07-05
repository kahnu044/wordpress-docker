import {
    wrapMarginConst,
    wrapPaddingConst,
    WrpBdShadowConst,
    WrpBgConst,
} from "./constants";

const {
    generateDimensionsAttributes,
    generateTypographyAttributes,
    generateBackgroundAttributes,
    generateBorderShadowAttributes,
    generateResponsiveRangeAttributes,
} = window.EBControls;

import * as typoPrefixs from "./constants/typographyConstants";

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
    },
    titleHoverColor: {
        type: "string",
    },
    descColor: {
        type: "string",
    },
    descHoverColor: {
        type: "string",
    },
    imageSize: {
        type: "number",
        default: 32,
    },
    // dimensions Control related Attributes start

    ...generateDimensionsAttributes(wrapMarginConst),
    ...generateDimensionsAttributes(wrapPaddingConst),
    ...generateBackgroundAttributes(WrpBgConst),
    ...generateBorderShadowAttributes(WrpBdShadowConst),
    // typography attributes ⬇
    ...generateTypographyAttributes(Object.values(typoPrefixs)),
};

export default attributes;
