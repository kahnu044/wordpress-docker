import { __ } from "@wordpress/i18n";

import "./style.scss";

import Edit from "./edit";
import Save from "./save";
import attributes from "./attributes";
import metadata from "../block.json";
import Example from "./example";
import Deprecated from "./deprecated";
import {  ebConditionalRegisterBlockType  } from "@essential-blocks/controls";
import { ReactComponent as Icon } from "./icon.svg";

ebConditionalRegisterBlockType(metadata, {
    icon: Icon,
    attributes,
    keywords: [
        __("testimonial", "essential-blocks"),
        __("about", "essential-blocks"),
        __("eb quote", "essential-blocks"),
    ],
    edit: Edit,
    save: Save,
    example: Example,
    deprecated: Deprecated,
});
