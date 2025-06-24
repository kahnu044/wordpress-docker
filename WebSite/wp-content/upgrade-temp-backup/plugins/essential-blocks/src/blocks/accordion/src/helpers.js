/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { select, dispatch } from "@wordpress/data";
const { times } = lodash;


export const deleteAccordion = (clientId, setAttributes, accordionLists, index) => {
    const {
        removeBlock,
        updateBlockAttributes,
        selectBlock
    } = dispatch("core/block-editor");

    const innerBlocks = select("core/block-editor").getBlocks(clientId);
    const deleteItemClientId = innerBlocks[index]?.clientId || false;

    const updatedInnerBlocks = innerBlocks.filter((each, i) => i !== index)
    times(updatedInnerBlocks.length, (n) => {
        updateBlockAttributes(updatedInnerBlocks[n].clientId);
    });

    //Update Innerblock Attribute for unlocak and then remove
    if (deleteItemClientId) {
        updateBlockAttributes(deleteItemClientId, {
            lock: { move: false, remove: false }
        });
        removeBlock(deleteItemClientId)
        selectBlock(clientId)
    }

    const accordion = accordionLists.filter((each, i) => i !== index);

    setAttributes({
        accordionLists: accordion,
        accordionChildCount: accordion ? accordion.length : 0
    });
};