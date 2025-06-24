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
import deprecated from "./depricated";
import metadata from "../block.json";
import "./style.scss";
import { ebConditionalRegisterBlockType } from "@essential-blocks/controls";
import { ReactComponent as Icon } from "./icon.svg";

ebConditionalRegisterBlockType(metadata, {
    keywords: [
        __("Menu", "essential-blocks"),
        __("Navigation", "essential-blocks"),
        __("EB Navigation", "essential-blocks"),
        __("EB Advanced Navigation", "essential-blocks"),
        __("Advanced Navigation Block", "essential-blocks"),
        __("Advanced Navigation", "essential-blocks"),
    ],
    icon: Icon,
    attributes,
    edit: Edit,
    save: Save,
    example: {},
    deprecated
});
