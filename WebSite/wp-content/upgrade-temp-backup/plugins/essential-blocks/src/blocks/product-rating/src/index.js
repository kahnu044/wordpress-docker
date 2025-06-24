import { __ } from "@wordpress/i18n";

import { ebConditionalRegisterBlockType } from "@essential-blocks/controls";
import "./style.scss";
import Edit from "./edit";
import attributes from "./attributes";
import Example from "./example";
import metadata from "../block.json";
import { ReactComponent as Icon } from "./icon.svg";

ebConditionalRegisterBlockType(metadata, {
    keywords: [
        __("WooCommerce Product", "essential-blocks"),
        __("WooCommerce Product Rating", "essential-blocks"),
        __("Product Rating", "essential-blocks"),
        __("Rating", "essential-blocks"),
        __("eb rating", "essential-blocks"),
    ],
    icon: Icon,
    attributes,
    edit: Edit,
    save: () => null,
    example: Example
});
