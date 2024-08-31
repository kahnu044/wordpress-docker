import { __ } from "@wordpress/i18n";

import Edit from "./edit";
import save from "./save";
import example from "./example";
import attributes from "./attributes";
import deprecated from "./deprecated";
import metadata from "../block.json";
import { ebConditionalRegisterBlockType } from "@essential-blocks/controls";
import { ReactComponent as Icon } from "./icon.svg";

ebConditionalRegisterBlockType(metadata, {
    keywords: [
        __("image compare", "essential-blocks"),
        __("comparison", "essential-blocks"),
        __("compare", "essential-blocks"),
    ],
    attributes,
    icon: Icon,
    edit: Edit,
    save,
    example,
    deprecated,
});
