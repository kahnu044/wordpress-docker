/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";

/*
 * Internal dependencies
 */
import Edit from "./edit";
import Save from "./save";
import attributes from "./attributes";
import "./style.scss";
import metadata from "../block.json";
import deprecated from "./deprecated";
import { ebConditionalRegisterBlockType } from "@essential-blocks/controls";
import { ReactComponent as Icon } from "./icon.svg";

ebConditionalRegisterBlockType(metadata, {
    icon: Icon,
    category: "essential-blocks",
    attributes,
    keywords: [
        __("eb google map", "essential-blocks"),
        __("essential", "essential-blocks"),
        __("map", "essential-blocks"),
    ],
    edit: Edit,
    save: Save,
    example: {
        attributes: {
            cover: `${EssentialBlocksLocalize?.image_url}/block-preview/google-map.jpeg`,
        },
    },
    deprecated,
});
