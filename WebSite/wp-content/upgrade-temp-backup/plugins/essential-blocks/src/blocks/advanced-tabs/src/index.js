/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";

/**
 * Internal dependencies
 */
import { ReactComponent as Icon } from "./icon.svg";
import Edit from "./edit";
import Save from "./save";
import attributes from "./attributes";
import deprecated from "./deprecated";
import metadata from "../block.json";
import "./style.scss";

import example from "./example";

import {  ebConditionalRegisterBlockType  } from "@essential-blocks/controls";

ebConditionalRegisterBlockType(metadata, {
	keywords: [
		__("EB Advanced Tabs", "essential-blocks"),
		__("Advanced Tabs Block", "essential-blocks"),
		__("Advanced Tabs", "essential-blocks"),
	],
	icon: Icon,
	attributes,
	edit: Edit,
	save: Save,
	example: example,
	deprecated,
});
