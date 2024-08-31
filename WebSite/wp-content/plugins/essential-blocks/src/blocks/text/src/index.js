import { __ } from "@wordpress/i18n";

import {  ebConditionalRegisterBlockType  } from "@essential-blocks/controls";
import "./style.scss";
import Edit from "./edit";
import save from "./save";
import attributes from "./attributes";
import Example from "./example";
import metadata from "../block.json";
import { ReactComponent as Icon } from "./icon.svg";

ebConditionalRegisterBlockType(metadata, {
    keywords: [
        __("text", "essential-blocks"),
        __("paragraph", "essential-blocks"),
        __("paragraph column", "essential-blocks")
    ],
    icon: Icon,
    attributes,
    edit: Edit,
    save,
    example: Example
});
