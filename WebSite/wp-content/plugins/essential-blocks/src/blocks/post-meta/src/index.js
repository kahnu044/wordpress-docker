import { __ } from "@wordpress/i18n";

import "./style.scss";
import Edit from "./edit";
import attributes from "./attributes";
import metadata from "../block.json";
import { ebConditionalRegisterBlockType } from "@essential-blocks/controls";
import { ReactComponent as Icon } from "./icon.svg";

ebConditionalRegisterBlockType(metadata, {
    keywords: [
        __("meta", "essential-blocks"),
        __("post meta", "essential-blocks"),
        __("product meta", "essential-blocks"),
    ],
    icon: Icon,
    attributes,
    edit: Edit,
    save: () => null,
    example: {
        attributes: {
            cover: `${EssentialBlocksLocalize?.image_url}/block-preview/post-grid.jpeg`,
        },
    },
});
