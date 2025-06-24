import { __ } from "@wordpress/i18n";

import "./style.scss";
import Edit from "./edit";
import Save from "./save";
import deprecated from "./deprecated";
import { ReactComponent as Icon } from "./icon.svg";
import attributes from "./attributes";
import metadata from "../block.json";
import {  ebConditionalRegisterBlockType  } from "@essential-blocks/controls";

ebConditionalRegisterBlockType(metadata, {
    keywords: [
        __("Shape Divider", "essential-blocks"),
        __("Shape", "essential-blocks"),
        __("Divider", "essential-blocks"),
        __("EB shape divider", "essential-blocks"),
    ],
    icon: Icon,
    attributes,
    edit: Edit,
    save: Save,
    deprecated,
    example: {},
});
