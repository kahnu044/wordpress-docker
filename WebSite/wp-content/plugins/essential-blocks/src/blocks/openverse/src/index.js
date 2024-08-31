import { __ } from "@wordpress/i18n";

import "./style.scss";
import Edit from "./edit";
import save from "./save";
import attributes from "./attributes";
import deprecated from "./deprecated";
import Example from "./example";
import metadata from "../block.json";
import { ebConditionalRegisterBlockType } from "@essential-blocks/controls";
const { name, category } = metadata;
import { ReactComponent as Icon } from "./icon.svg";

ebConditionalRegisterBlockType(metadata, {
    keywords: [
        __("Openverse", "essential-blocks"),
        __("Openverse block", "essential-blocks"),
        __("Openverse image", "essential-blocks"),
        __("EB Openverse block", "essential-blocks"),
        __("eb openverse block", "essential-blocks"),
        __("essential blocks", "essential-blocks"),
    ],
    icon: Icon,
    attributes,
    edit: Edit,
    save,
    deprecated,
    example: {
        attributes: {
            cover: `${EssentialBlocksLocalize?.image_url}/block-preview/openverse.jpeg`,
        },
    },
});
