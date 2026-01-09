/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";

/**
 * Internal dependencies
 */
import Edit from "./edit";
import Save from "./save";
import attributes from "./attributes";
import example from "./example";
import metadata from "../block.json";
import "./style.scss";
import { ReactComponent as Icon } from "./icon.svg";
import { ebConditionalRegisterBlockType } from "@essential-blocks/controls";

ebConditionalRegisterBlockType(metadata, {
    icon: Icon,
    attributes,
    keywords: [
        __("image hotspot", "essential-blocks"),
        __("interactive image", "essential-blocks"),
        __("hotspot", "essential-blocks"),
        __("tooltip", "essential-blocks"),
        __("image markers", "essential-blocks"),
        __("eb essential", "essential-blocks"),
    ],
    edit: Edit,
    save: Save,
    example: example,
});
