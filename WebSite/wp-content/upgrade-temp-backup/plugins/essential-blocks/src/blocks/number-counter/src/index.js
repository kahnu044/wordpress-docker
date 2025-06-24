/**
 * WordPress dependeincies
 */
import { __ } from "@wordpress/i18n";
/**
 * Internal dependencies
 */
import Edit from "./edit";
import save from "./save";
import metadata from "../block.json";
import attributes from "./attributes";
import deprecated from "./deprecated";
import example from "./example";
import {  ebConditionalRegisterBlockType  } from "@essential-blocks/controls";
import { ReactComponent as Icon } from "./icon.svg";

ebConditionalRegisterBlockType(metadata, {
	icon: Icon,
	keywords: [
		__("EB number counter", "essential-blocks"),
		__("counter", "essential-blocks"),
		__("counter up", "essential-blocks"),
	],
	attributes,
	edit: Edit,
	save,
	example: example,
	deprecated,
});
