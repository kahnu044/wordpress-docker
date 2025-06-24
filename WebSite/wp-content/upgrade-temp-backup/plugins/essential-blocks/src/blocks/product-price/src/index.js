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
        __("WooCommerce Product Price", "essential-blocks"),
        __("Product Price", "essential-blocks"),
        __("Price", "essential-blocks"),
        __("sale price", "essential-blocks"),
    ],
    icon: Icon,
    attributes,
    edit: Edit,
    save: () => null,
    example: Example
});
