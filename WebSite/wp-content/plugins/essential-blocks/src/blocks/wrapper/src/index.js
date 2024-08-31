import { __ } from "@wordpress/i18n";
import "./style.scss";
import Edit from "./edit";
import save from "./save";
import attributes from "./attributes";
import deprecated from "./deprecated";
import metadata from "../block.json";
import { ebConditionalRegisterBlockType } from "@essential-blocks/controls";
import { ReactComponent as Icon } from "./icon.svg";

ebConditionalRegisterBlockType(metadata, {
    keywords: [
        __("wrapper", "essential-blocks"),
        __("eb essential", "essential-blocks"),
        __("container", "essential-blocks"),
    ],
    icon: Icon,
    attributes,
    edit: Edit,
    save,
    deprecated,
    example: {}
});
