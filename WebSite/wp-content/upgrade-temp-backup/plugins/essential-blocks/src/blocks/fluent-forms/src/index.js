/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";

/**
 * Internal dependencies
 */
import Edit from "./edit";
import metadata from "../block.json";
import attributes from "./attributes";
import { ReactComponent as Icon } from "./icon.svg";

const { name } = metadata;
import {  ebConditionalRegisterBlockType  } from "@essential-blocks/controls";

ebConditionalRegisterBlockType(
    { name, ...metadata },
    {
        icon: Icon,
        attributes,
        keywords: [
            __("Fluent Form", "essential-blocks"),
            __("EB Fluent Form", "essential-blocks"),
            __("Form", "essential-blocks"),
        ],
        edit: Edit,
        save: () => null,
        example: {
            attributes: {
                cover: `${EssentialBlocksLocalize?.image_url}/block-preview/fluent-forms.jpeg`,
            },
        },
    }
);
