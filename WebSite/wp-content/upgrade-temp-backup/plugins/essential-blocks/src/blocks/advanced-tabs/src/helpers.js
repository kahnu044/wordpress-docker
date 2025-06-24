/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { select, dispatch, useDispatch } from "@wordpress/data";
import { createBlock } from "@wordpress/blocks";
const { times, omit } = lodash;

//
export const getBlocksMethods = () => {
    const { getBlock, getBlocks } = select("core/block-editor");
    const {
        moveBlockToPosition,
        updateBlockAttributes,
        insertBlock,
        replaceInnerBlocks,
    } = dispatch("core/block-editor");

    return {
        getBlock,
        getBlocks,
        moveBlockToPosition,
        updateBlockAttributes,
        insertBlock,
        replaceInnerBlocks,
    };
};

//
export const resetTabsOrder = (clientId, setAttributes, tabTitles) => {
    const {
        updateBlockAttributes,
        replaceInnerBlocks,
        selectBlock,
        replaceBlock
    } = dispatch("core/block-editor");

    const innerBlocks = select("core/block-editor").getBlocks(clientId);
    const titleOrder = []

    const newTabTitles = tabTitles.map((item, index) => {
        titleOrder[index] = item.id
        return ({
            ...item,
            id: `${index + 1}`,
        })
    });

    innerBlocks.sort((a, b) => {
        const a_tabId = a?.attributes?.tabId
        const b_tabId = b?.attributes?.tabId
        if (a_tabId && b_tabId) {
            return titleOrder.indexOf(a_tabId) - titleOrder.indexOf(b_tabId)
        }
    });
    innerBlocks.map((item, index) => {
        item.key = index + 10
    })

    //setAttributes updated tabTitles after id change
    setAttributes({
        tabTitles: newTabTitles,
    });

    //replace innerBlocks with sorted innerBlocks
    replaceInnerBlocks(clientId, innerBlocks)

    //update innerBlocks attribute 'tabId' after replace innerBlocks
    times(innerBlocks.length, (n) => {
        updateBlockAttributes(innerBlocks[n].clientId, {
            tabId: `${n + 1}`,
        });
    });
};

//
export const addTab = ({
    clientId,
    tabChildCount,
    setAttributes,
    tabTitles,
    blockId,
    handleTabTitleClick,
}) => {
    const {
        replaceInnerBlocks,
        selectBlock
    } = dispatch("core/block-editor");
    // const thisBlock = getBlock(clientId);
    const innerBlocks = [...select("core/block-editor").getBlocks(clientId)];
    const maxId = tabTitles.reduce(
        (acc, curr) => Math.max(parseInt(acc), parseInt(curr.id)),
        0
    );
    const tabId = `${maxId + 1}`;

    const newBlock = createBlock("essential-blocks/tab", {
        tabId,
        tabParentId: `${blockId}`,
    });

    innerBlocks.splice(innerBlocks.length, 0, newBlock);
    replaceInnerBlocks(clientId, innerBlocks)
        .then(() => {
            setAttributes({
                tabTitles: [
                    ...tabTitles,
                    {
                        text: `Tab Title ${parseInt(innerBlocks.length)}`,
                        id: tabId,
                        media: "icon",
                        icon: "fas fa-home",
                    },
                ],
                tabChildCount: tabChildCount + 1,
            });
            handleTabTitleClick(tabId);
        });
};

export const deleteTab = (clientId, setAttributes, tabTitles, index) => {
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

    const titles = tabTitles.filter((each, i) => i !== index);

    setAttributes({
        tabTitles: titles,
        tabChildCount: titles ? titles.length : 0
    });
};
