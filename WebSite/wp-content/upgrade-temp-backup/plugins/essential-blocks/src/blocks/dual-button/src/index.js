/**
 * WordPress dependeincies
 */
import { __ } from "@wordpress/i18n";

/**
 * Internal dependencies
 */
import Save from "./save";
import Edit from "./edit";
import attributes from "./attributes";
import metadata from "../block.json";
import Example from "./example";
import deprecated from "./deprecated";
import "./style.scss";
import {  ebConditionalRegisterBlockType  } from "@essential-blocks/controls";
import { ReactComponent as Icon } from "./icon.svg";

ebConditionalRegisterBlockType(metadata, {
	keywords: [
		__("buttons", "essential-blocks"),
		__("grouped button", "essential-blocks"),
		__("Button Group", "essential-blocks"),
		__("dual", "essential-blocks"),
	],
	attributes,
	icon: Icon,
	edit: Edit,
	save: Save,
	example: Example,
	deprecated,
});
