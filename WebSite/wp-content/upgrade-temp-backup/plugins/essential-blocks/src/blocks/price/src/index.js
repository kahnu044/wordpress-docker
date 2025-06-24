import { __ } from "@wordpress/i18n";

import "./style.scss";
import Edit from "./edit";
import save from "./save";
import { ReactComponent as Icon } from "./icon.svg";
import attributes from "./attributes";
import deprecated from "./deprecated";
import Example from "./example";
import metadata from "../block.json";
import {  ebConditionalRegisterBlockType  } from "@essential-blocks/controls";

ebConditionalRegisterBlockType(metadata, {
    keywords: [
        __("Price", "essential-blocks"),
        __("eb price", "essential-blocks"),
    ],
    icon: Icon,
    attributes,
    edit: Edit,
    save,
    deprecated,
    example: Example,
});
