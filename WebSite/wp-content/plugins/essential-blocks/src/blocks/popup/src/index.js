/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";

import "./style.scss";

/**
 * Internal dependencies
 */
import Edit from "./edit";
import Save from "./save";
import example from "./example";
import metadata from "../block.json";
import attributes from "./attributes";
import { ReactComponent as Icon } from "./icon.svg";
import deprecated from "./deprecated";
import {  ebConditionalRegisterBlockType  } from "@essential-blocks/controls";

ebConditionalRegisterBlockType(metadata, {
	icon: Icon,
	attributes,
	keywords: [
		__("popup", "essential-blocks"),
		__("modal", "essential-blocks"),
		__("eb essential", "essential-blocks"),
	],
	edit: Edit,
	save: Save,
	example: example,
	deprecated,
});
