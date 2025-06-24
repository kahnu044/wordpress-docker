/**
 * WordPress dependeincies
 */
import { __ } from "@wordpress/i18n";

/**
 * Internal dependencies
 */
import Edit from "./edit";
import Save from "./save";
import "./style.scss";
import metadata from "../block.json";
import attributes from "./attributes";
import deprecated from "./deprecated";
import { ebConditionalRegisterBlockType } from "@essential-blocks/controls";
import { ReactComponent as Icon } from "./icon.svg";

ebConditionalRegisterBlockType(metadata, {
    icon: Icon,
    attributes,
    keywords: [
        __("NFT", "essential-blocks"),
        __("NFT Gallery", "essential-blocks"),
        __("NFT Collection ", "essential-blocks"),
    ],
    edit: Edit,
    save: Save,
    deprecated,
    example: {
        attributes: {
            cover: `${EssentialBlocksLocalize?.image_url}/block-preview/nft-gallery.jpeg`,
        },
    },
});
