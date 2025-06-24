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
        __("WooCommerce Product Details", "essential-blocks"),
        __("Product Details", "essential-blocks"),
        __("Product summary", "essential-blocks"),
        __("Product review", "essential-blocks"),
        __("Additional information", "essential-blocks"),
    ],
    icon: Icon,
    attributes,
    edit: Edit,
    save: () => null,
    example: Example
});
