/**
 * WordPress dependeincies
 */
import { __ } from "@wordpress/i18n";

/**
 * Internal dependencies
 */
import Save from "./components/save";
import Edit from "./components/edit";
import deprecated from "./components/deprecated";
import example from "./example";
import metadata from "../block.json";
import attributes from "./components/attributes";
import { ebConditionalRegisterBlockType } from "@essential-blocks/controls";

import { ReactComponent as Icon } from "./icon.svg";

/**
 * Import styles
 */
import "./style.scss";

ebConditionalRegisterBlockType(metadata, {
    icon: Icon,
    attributes,
    keywords: [
        __("button", "essential-blocks"),
        __("eb essential", "essential-blocks"),
        __("link", "essential-blocks"),
    ],
    edit: Edit,
    save: Save,
    example: example,
    deprecated,
});
