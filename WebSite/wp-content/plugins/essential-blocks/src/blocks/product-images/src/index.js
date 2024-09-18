import { __ } from "@wordpress/i18n";

import "./style.scss";
import Edit from "./edit";
import attributes from "./attributes";
import metadata from "../block.json";
import { ebConditionalRegisterBlockType } from "@essential-blocks/controls";
import { ReactComponent as Icon } from "./icon.svg";

ebConditionalRegisterBlockType(metadata, {
    keywords: [
        __("product image gallery", "essential-blocks"),
        __("product image", "essential-blocks"),
        __("product image slider", "essential-blocks"),
        __("product variation image", "essential-blocks"),
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
