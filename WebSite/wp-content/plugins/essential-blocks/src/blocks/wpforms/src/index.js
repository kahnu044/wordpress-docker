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
import "./style.scss";

const { name } = metadata;
import { ebConditionalRegisterBlockType } from "@essential-blocks/controls";
import { ReactComponent as Icon } from "./icon.svg";

ebConditionalRegisterBlockType(
    { name, ...metadata },
    {
        icon: Icon,
        attributes,
        keywords: [
            __("WPForms", "essential-blocks"),
            __("EB WPForms", "essential-blocks"),
            __("Form", "essential-blocks"),
        ],
        edit: Edit,
        save: () => null,
        example: {
            attributes: {
                cover: `${EssentialBlocksLocalize?.image_url}/block-preview/wpforms.jpeg`,
            },
        },
    }
);
