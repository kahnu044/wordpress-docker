/**
 WordPress dependeincies
 */
import { __ } from "@wordpress/i18n";

/**
 * Internal dependencies
 */
import Edit from "./components/edit";
import Save from "./components/save";
import example from "./example";
import metadata from "../block.json";
import attributes from "./components/attributes";
import deprecated from "./components/deprecated";
import { ebConditionalRegisterBlockType } from "@essential-blocks/controls";
import "./style.scss";
import { ReactComponent as Icon } from "./icon.svg";

ebConditionalRegisterBlockType(metadata, {
    icon: Icon,
    attributes,
    keywords: [
        __("call to action", "essential-blocks"),
        __("cta", "essential-blocks"),
        __("eb essential", "essential-blocks"),
    ],
    edit: Edit,
    save: Save,
    example: example,
    deprecated,
});
