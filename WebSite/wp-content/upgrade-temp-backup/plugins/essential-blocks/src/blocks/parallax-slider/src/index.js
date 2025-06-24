import { __ } from "@wordpress/i18n";

import "./style.scss";

import Edit from "./edit";
import save from "./save";
import attributes from "./attributes";
import { ReactComponent as Icon } from "./icon.svg";
import Example from "./example";
import deprecated from "./deprecated";
import metadata from "../block.json";
import {  ebConditionalRegisterBlockType  } from "@essential-blocks/controls";

ebConditionalRegisterBlockType(metadata, {
	icon: Icon,
	attributes,
	edit: Edit,
	save,
	keywords: [
		__("Parallax", "essential-blocks"),
		__("Slider", "essential-blocks"),
		__("eb Parallax Slider", "essential-blocks"),
	],
	example: Example,
	deprecated,
});
