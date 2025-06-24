import { __ } from "@wordpress/i18n";
import { registerBlockType } from "@wordpress/blocks";

import "./style.scss";
import Edit from "./edit";
import Save from "./save";
import attributes from "./attributes";
import { ReactComponent as Icon } from "./icon.svg";
import Example from "./example";
import deprecated from "./deprecated";

import metadata from "../block.json";
import {  ebConditionalRegisterBlockType  } from "@essential-blocks/controls";

ebConditionalRegisterBlockType(metadata, {
	keywords: [
		__("slider", "essential-blocks"),
		__("carousel", "essential-blocks"),
		__("images", "essential-blocks"),
	],
	icon: Icon,
	example: Example,
	attributes,
	edit: Edit,
	save: Save,
	deprecated,
});
