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
import deprecated from "./deprecated";
import metadata from "../block.json";
import "./style.scss";
import example from "./example";
import {  ebConditionalRegisterBlockType  } from "@essential-blocks/controls";
import { ReactComponent as Icon } from "./icon.svg";

ebConditionalRegisterBlockType(metadata, {
	icon: Icon,
	attributes,
	keywords: [
		__("EB infobox", "essential-blocks"),
		__("info box", "essential-blocks"),
		__("infobox block", "essential-blocks"),
	],
	edit: Edit,
	save: Save,
	example: example,
	deprecated,
});
