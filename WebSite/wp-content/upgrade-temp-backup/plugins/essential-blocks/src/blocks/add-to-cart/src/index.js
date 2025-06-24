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
        __("WooCommerce Add To Cart", "essential-blocks"),
        __("Product Add To Cart", "essential-blocks"),
        __("add to cart", "essential-blocks"),
        __("eb add to cart", "essential-blocks"),
    ],
    icon: Icon,
    attributes,
    edit: Edit,
    save: () => null,
    example: Example
});
