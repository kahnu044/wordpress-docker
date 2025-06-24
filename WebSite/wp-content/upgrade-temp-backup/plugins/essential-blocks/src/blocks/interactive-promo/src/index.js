/**
 * WordPress dependeincies
 */
import { __ } from "@wordpress/i18n";

/**
 * Internal dependencies
 */
import Edit from "./edit";
import Save from "./save";
import example from "./example";
import attributes from "./attributes";
import deprecated from "./deprecated";
import metadata from "../block.json";
import { ebConditionalRegisterBlockType } from "@essential-blocks/controls";
import { ReactComponent as Icon } from "./icon.svg";

ebConditionalRegisterBlockType(metadata, {
    icon: Icon,
    attributes,
    keywords: [
        __("promo", "essential-blocks"),
        __("message", "essential-blocks"),
        __("eb essential", "essential-blocks"),
        __("interactive", "essential-blocks"),
    ],
    edit: Edit,
    save: Save,
    example,
    deprecated,
});
