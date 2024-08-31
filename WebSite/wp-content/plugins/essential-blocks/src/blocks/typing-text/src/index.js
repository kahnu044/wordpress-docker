/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";

/**
 * Internal dependencies
 */
import Edit from "./edit";
import Save from "./save";
import example from "./example";
import metadata from "../block.json";
import attributes from "./attributes";
import deprecated from "./deprecated";
import "./style.scss";
import {  ebConditionalRegisterBlockType  } from "@essential-blocks/controls";
import { ReactComponent as Icon } from "./icon.svg";

ebConditionalRegisterBlockType(metadata, {
	icon: Icon,
	keywords: [
		__("Typing Text", "essential-blocks"),
		__("animated Text", "essential-blocks"),
		__("eb typing", "essential-blocks"),
	],
	attributes,
	edit: Edit,
	save: Save,
	example,
	deprecated,
});
