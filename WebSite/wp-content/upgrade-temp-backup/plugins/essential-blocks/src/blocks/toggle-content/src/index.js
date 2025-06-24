/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";

/**
 * Internal dependencies
 */
import Edit from "./edit";
import Save from "./save";
import deprecated from "./deprecated";
import example from "./example";
import metadata from "../block.json";
import attributes from "./attributes";
import "./style.scss";
import { ebConditionalRegisterBlockType } from "@essential-blocks/controls";
import { ReactComponent as Icon } from "./icon.svg";

ebConditionalRegisterBlockType(metadata, {
    icon: Icon,
    attributes,
    edit: Edit,
    save: Save,
    keywords: [
        __("Toggle", "essential-blocks"),
        __("eb Toggle Content", "essential-blocks"),
    ],
    example,
    deprecated,
});
