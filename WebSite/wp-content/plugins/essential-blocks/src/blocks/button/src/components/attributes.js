import { __ } from "@wordpress/i18n";

import {
    WRAPPER_MARGIN,
} from "./constants";

import {
    generateDimensionsAttributes,
    EBButton
 } from "@essential-blocks/controls";

const attributes = {
    // the following 4 attributes is must required for responsive options and asset generation for frontend
    // responsive control attributes ⬇
    resOption: {
        type: "string",
        default: "Desktop",
    },
    // blockId attribute for making unique className and other uniqueness ⬇
    blockId: {
        type: "string",
    },
    blockRoot: {
        type: "string",
        default: "essential_block",
    },
    // blockMeta is for keeping all the styles ⬇
    blockMeta: {
        type: "object",
    },
    type: {
        type: "string",
        default: "default",
    },
    ...EBButton?.addAttributes(),
    ...generateDimensionsAttributes(WRAPPER_MARGIN, {
        top: 28,
        right: 0,
        bottom: 28,
        left: 0,
        isLinked: false,
    }),
};

export default attributes;
