import { __ } from "@wordpress/i18n";

import "./style.scss";

import Edit from "./edit";
import { ReactComponent as Icon } from "./icon.svg";
import attributes from "./attributes";
import metadata from "../block.json";
import {  ebConditionalRegisterBlockType  } from "@essential-blocks/controls";

ebConditionalRegisterBlockType(metadata, {
    icon: Icon,
    attributes,
    keywords: [
        __("WooCommerce Product", "essential-blocks"),
        __("Grid", "essential-blocks"),
        __("List", "essential-blocks"),
    ],
    edit: Edit,
    save: () => null,
    example: {
        attributes: {
            cover: `${EssentialBlocksLocalize?.image_url}/block-preview/woo-product-grid.jpg`,
        },
    },
});
