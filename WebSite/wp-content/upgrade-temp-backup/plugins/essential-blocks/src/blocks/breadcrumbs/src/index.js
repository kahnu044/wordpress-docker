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
        __("Breadcrumb", "essential-blocks"),
        __("EB Breadcrumb", "essential-blocks"),
        __("Product Breadcrumb", "essential-blocks"),
        __("breadcrumb", "essential-blocks"),
        __("eb breadcrumb", "essential-blocks"),
    ],
    icon: Icon,
    attributes,
    edit: Edit,
    save: () => null,
    example: Example
});
