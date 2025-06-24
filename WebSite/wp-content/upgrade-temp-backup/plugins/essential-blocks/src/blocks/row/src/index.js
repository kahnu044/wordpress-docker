/**
 * WordPress dependeincies
 */
import { __ } from "@wordpress/i18n";
import { registerBlockType } from "@wordpress/blocks";

/**
 * Internal dependencies
 */
import Edit from "./edit";
import Save from "./save";
import metadata from "../block.json";
import "./style.scss";
import attributes from "./attributes";
import deprecated from "./deprecated";
import example from "./example";
import {  ebConditionalRegisterBlockType  } from "@essential-blocks/controls";
import { ReactComponent as Icon } from "./icon.svg";

ebConditionalRegisterBlockType(metadata, {
	icon: Icon,
	attributes,
	keywords: [__("EB row", "essential-blocks"), __("row", "essential-blocks")],
	edit: Edit,
	save: Save,
	deprecated,
	example: example,
});
