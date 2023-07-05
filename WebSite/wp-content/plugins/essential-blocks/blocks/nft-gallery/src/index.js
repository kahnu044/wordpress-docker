/**
 * WordPress dependeincies
 */
import { __ } from "@wordpress/i18n";
import { registerBlockType } from "@wordpress/blocks";

/**
 * Internal dependencies
 */
import Edit from "./edit";
import Save from "./save";
import { NFTGalleryIcon } from "./icon";

import "./style.scss";
import metadata from "../block.json";
import attributes from "./attributes";
const { ebConditionalRegisterBlockType } = EBControls;

ebConditionalRegisterBlockType(metadata, {
    icon: NFTGalleryIcon,
    attributes,
    keywords: [
        __("NFT", "essential-blocks"),
        __("NFT Gallery", "essential-blocks"),
        __("NFT Collection ", "essential-blocks"),
    ],
    edit: Edit,
    save: Save,
    example: {}
});
