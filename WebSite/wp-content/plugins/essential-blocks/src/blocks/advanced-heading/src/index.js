import { __ } from "@wordpress/i18n";
import { ebConditionalRegisterBlockType } from "@essential-blocks/controls";
import "./style.scss";
import Edit from "./edit";
import save from "./save";
import attributes from "./attributes";
import deprecated from "./deprecated";
import Example from "./example";
import metadata from "../block.json";
import { ReactComponent as Icon } from "./icon.svg";

ebConditionalRegisterBlockType(metadata, {
    keywords: [
        __("heading", "essential-blocks"),
        __("Advanced Heading", "essential-blocks"),
        __("heading block", "essential-blocks"),
        __("heading box", "essential-blocks"),
        __("dynamic title", "essential-blocks"),
    ],
    icon: Icon,
    attributes,
    edit: Edit,
    save,
    example: Example,
    deprecated
});
