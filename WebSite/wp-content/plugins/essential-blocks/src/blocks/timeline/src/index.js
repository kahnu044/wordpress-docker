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
import metadata from "../block.json";
import "./style.scss";
import { ebConditionalRegisterBlockType } from "@essential-blocks/controls";
import { ReactComponent as Icon } from "./icon.svg";
import Example from "./example";

ebConditionalRegisterBlockType(metadata, {
    icon: Icon,
    attributes,
    keywords: [
        __("Timeline", "essential-blocks"),
        __("timeline block", "essential-blocks"),
        __("eb timeline", "essential-blocks"),
        __("EB Timeline", "essential-blocks"),
        __("history", "essential-blocks"),
        __("process", "essential-blocks"),
        __("steps", "essential-blocks"),
    ],
    edit: Edit,
    save: Save,
    example: Example,
});
