/**
 * WordPress dependeincies
 */
// const { __ } = wp.i18n;
// const { registerBlockType } = wp.blocks;

import { __ } from "@wordpress/i18n";

/**
 * Internal dependencies
 */
import Edit from "./edit";
import Save from "./save";
import { ReactComponent as Icon } from "./icon.svg";

import metadata from "../block.json";
import attributes from "./attributes";

import {  ebConditionalRegisterBlockType  } from "@essential-blocks/controls";

ebConditionalRegisterBlockType(metadata, {
	icon: Icon,
	attributes,
	edit: Edit,
	save: Save,
});
