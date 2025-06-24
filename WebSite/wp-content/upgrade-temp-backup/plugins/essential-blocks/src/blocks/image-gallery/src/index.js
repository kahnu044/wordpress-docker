/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";

/**
 * Internal dependencies
 */
import Save from "./save";
import Edit from "./edit";
import Attributes from "./attributes";
import deprecated from "./deprecated";
import "./style.scss";
import metadata from "../block.json";
import { ebConditionalRegisterBlockType } from "@essential-blocks/controls";
import { ReactComponent as Icon } from "./icon.svg";

ebConditionalRegisterBlockType(metadata, {
    icon: Icon,
    attributes: Attributes,
    keywords: [
        __("images", "essential-blocks"),
        __("filter", "essential-blocks"),
        __("photos", "essential-blocks"),
        __("eb image gallery", "essential-blocks"),
        __("filterable gallery", "essential-blocks"),
    ],
    edit: Edit,
    save: Save,
    deprecated,
    example: {
        attributes: {
            cover: `${EssentialBlocksLocalize?.image_url}/block-preview/image-gallery.jpg`,
        },
    },
});
