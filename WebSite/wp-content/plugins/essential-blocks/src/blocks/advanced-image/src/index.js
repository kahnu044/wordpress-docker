import { __ } from "@wordpress/i18n";

import "./style.scss";
import Edit from "./edit";
import save from "./save";
import attributes from "./attributes";
import Example from "./example";
import deprecated from "./deprecated";
import metadata from "../block.json";
import { ebConditionalRegisterBlockType } from "@essential-blocks/controls";
import { ReactComponent as Icon } from "./icon.svg";

ebConditionalRegisterBlockType(metadata, {
    keywords: [
        __("Image", "essential-blocks"),
        __("Image block", "essential-blocks"),
        __("Advanced Image", "essential-blocks"),
        __("Single image", "essential-blocks"),
        __("Site Logo", "essential-blocks"),
        __("Featued image", "essential-blocks"),
        __("custom image", "essential-blocks"),
    ],
    icon: Icon,
    attributes,
    edit: Edit,
    save,
    example: Example,
    deprecated,
});
