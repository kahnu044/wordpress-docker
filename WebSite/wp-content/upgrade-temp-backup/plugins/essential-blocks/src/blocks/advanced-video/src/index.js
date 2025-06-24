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
        __("Video", "essential-blocks"),
        __("Advanced Video", "essential-blocks"),
        __("Video block", "essential-blocks"),
        __("Advanced", "essential-blocks"),
    ],
    icon: Icon,
    attributes,
    edit: Edit,
    save,
    deprecated,
    example: Example,
});
