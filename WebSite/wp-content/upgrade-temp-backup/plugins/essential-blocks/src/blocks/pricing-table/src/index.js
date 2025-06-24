/**
 * WordPress dependeincies
 */
import { __ } from "@wordpress/i18n";
import { registerBlockType } from "@wordpress/blocks";

/**
 * Internal dependencies
 */
import Save from "./save";
import Edit from "./edit";
import { ReactComponent as Icon } from "./icon.svg";
import example from "./example";
import attributes from "./attributes";
import deprecated from "./deprecated";
import "./style.scss";
import metadata from "../block.json";
import {  ebConditionalRegisterBlockType  } from "@essential-blocks/controls";

ebConditionalRegisterBlockType(metadata, {
    icon: Icon,
    attributes,
    keywords: [
        __("eb price", "essential-blocks"),
        __("table", "essential-blocks"),
        __("eb price table", "essential-blocks"),
    ],
    edit: Edit,
    save: Save,
    example,
    deprecated,
});
