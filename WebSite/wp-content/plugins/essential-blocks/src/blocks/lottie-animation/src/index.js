import { __ } from "@wordpress/i18n";

import { ebConditionalRegisterBlockType } from "@essential-blocks/controls";
import "./style.scss";
import Edit from "./edit";
import Save from "./save";
import attributes from "./attributes";
import Example from "./example";
import metadata from "../block.json";
import deprecated from "./deprecated";
import { ReactComponent as Icon } from "./icon.svg";

ebConditionalRegisterBlockType(metadata, {
    keywords: [
        __("lottie animation", "essential-blocks"),
        __("lottie", "essential-blocks"),
        __("animation", "essential-blocks"),
        __("eb lottie animation", "essential-blocks"),
    ],
    icon: Icon,
    attributes,
    edit: Edit,
    save: Save,
    example: Example,
    deprecated
});
