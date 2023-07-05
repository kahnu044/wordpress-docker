/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";

/**
 * Internal dependencies
 */
import Edit from "./edit";
import example from "./example";
import metadata from "../block.json";
import attributes from "./attributes";
import { FluentFormIcon } from "./icon";

import "./style.scss";

const { name } = metadata;
const { ebConditionalRegisterBlockType } = EBControls;

ebConditionalRegisterBlockType(
	{ name, ...metadata },
	{
		icon: FluentFormIcon,
		attributes,
		keywords: [
			__("WPForms", "essential-blocks"),
			__("EB WPForms", "essential-blocks"),
			__("Form", "essential-blocks"),
		],
		edit: Edit,
		save: () => null,
		example,
	}
);
