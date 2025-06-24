import { __ } from "@wordpress/i18n";

import "./style.scss";
import Edit from "./edit";
import { ReactComponent as Icon } from "./icon.svg";
import attributes from "./attributes";
import metadata from "../block.json";
import {  ebConditionalRegisterBlockType  } from "@essential-blocks/controls";

ebConditionalRegisterBlockType(metadata, {
    keywords: [
        __("posts", "essential-blocks"),
        __("post carousel", "essential-blocks"),
        __("posts block", "essential-blocks"),
        __("carousel", "essential-blocks"),
        __("slider", "essential-blocks"),
        __("post slider", "essential-blocks"),
    ],
    icon: Icon,
    attributes,
    edit: Edit,
    save: () => null,
    example: {
        attributes: {
            cover: `${EssentialBlocksLocalize?.image_url}/block-preview/post-carousel.jpeg`,
        },
    },
});
