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
import metadata from "../block.json";
import "./style.scss";

import {  ebConditionalRegisterBlockType  } from "@essential-blocks/controls";

if (eb_conditional_localize && eb_conditional_localize.editor_type !== 'edit-widgets') {
    ebConditionalRegisterBlockType(metadata, {
        keywords: [
            __("EB Form", "essential-blocks"),
            __("Form Block", "essential-blocks"),
            __("Contact Form", "essential-blocks"),
            __("Subscription Form", "essential-blocks"),
        ],
        icon: Icon,
        attributes,
        edit: Edit,
        save: Save,
        example: {
            attributes: {
                cover: `${EssentialBlocksLocalize?.image_url}/block-preview/form-block.jpeg`
            }
        }
    });
}
