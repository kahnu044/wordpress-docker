import { __ } from "@wordpress/i18n";

import "./style.scss";
import Edit from "./edit";
import save from "./save";
import deprecated from "./deprecated";
import attributes from "./attributes";
import Example from "./example";
import metadata from "../block.json";
import { ebConditionalRegisterBlockType } from "@essential-blocks/controls";
import { ReactComponent as Icon } from "./icon.svg";

ebConditionalRegisterBlockType(metadata, {
    keywords: [
        __("Icon", "essential-blocks"),
        __("eb icon", "essential-blocks"),
    ],
    icon: Icon,
    attributes,
    edit: Edit,
    save,
    example: Example,
    deprecated
});
