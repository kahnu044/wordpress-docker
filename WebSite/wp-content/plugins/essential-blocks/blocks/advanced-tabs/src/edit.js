/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useBlockProps, RichText, InnerBlocks } from "@wordpress/block-editor";
import { useEffect, useState, useRef, useId } from "@wordpress/element";
import { select, dispatch, useSelect } from "@wordpress/data";

const { times } = lodash;

/**
 * Internal dependencies
 */

const {
    EBDisplayIcon,
    BlockProps
} = EBControls;

import classnames from "classnames";

import Inspector from "./inspector";

import Style from "./style";
export default function Edit(props) {
    const {
        attributes,
        setAttributes,
        className,
        clientId,
        isSelected,
        name
    } = props;
    const {
        resOption,
        blockMeta,
        blockId,
        tabChildCount,
        tabTitles,
        isMediaOn,
        layout,
        classHook,
        tagName,
        isMinHeightAsTitle,
    } = attributes;

    const tabWrapRef = useRef(null);
    const tabHeaderWrapRef = useRef(null);

    const [activeTabId, setActiveTabId] = useState(false);
    const [isClickTab, setIsClickTab] = useState(false);
    const [contentMinHeight, setContentMinHeight] = useState("auto");
    const renderId = useId()

    //Change Dom refKey on tab sorting
    //This is for force render on title Array change
    // useEffect(() => {
    //     setRenderKey(renderId);
    // }, [tabChildCount])

    const activeDefaultTabId = (
        tabTitles.find((item) => item.isDefault) || { id: "1" }
    ).id;

    const handleTabTitleClick = (id) => {
        setIsClickTab(true);

        const tabsParentEl = (tabWrapRef || { current: false }).current;

        if (!tabsParentEl) return false;

        const allTabChildWraps = tabsParentEl.querySelectorAll(
            `.eb-tab-wrapper[data-tab-parent-id="${blockId}"]`
        );

        if (allTabChildWraps.length === 0) return false;

        for (const tabWrapDiv of allTabChildWraps) {
            const tabId = tabWrapDiv.dataset.tabId;

            if (tabId === id) {
                tabWrapDiv.style.display = "block";
                tabWrapDiv.style.animation = "fadeIn 0.3s";
            } else {
                tabWrapDiv.style.display = "none";
            }
        }

        setActiveTabId(`${id}`);
    };

    const onTabTitleChange = (text, index) => {
        const newTabTitles = tabTitles.map((item, i) => {
            if (i === index) {
                item.text = text;
            }

            return item;
        });

        setAttributes({ tabTitles: newTabTitles });
    };

    useEffect(() => {
        if (tabTitles.length === 0) {
            setAttributes({
                tabTitles: [
                    {
                        text: "Tab Title 1",
                        id: "1",
                        media: "icon",
                        icon: "fas fa-home",
                        image: "",
                        isExpanded: true,
                        isDefault: true,
                        customId: "",
                    },
                    {
                        text: "Tab Title 2",
                        id: "2",
                        media: "icon",
                        icon: "fas fa-home",
                        image: "",
                        isExpanded: false,
                        isDefault: false,
                        customId: "",
                    },
                    {
                        text: "Tab Title 3",
                        id: "3",
                        media: "icon",
                        icon: "fas fa-home",
                        image: "",
                        isExpanded: false,
                        isDefault: false,
                        customId: "",
                    },
                ],
            });
        }
    }, []);

    //Inline Min Height
    useEffect(() => {
        if (layout === 'vertical' && isMinHeightAsTitle && tabHeaderWrapRef.current) {
            setContentMinHeight(tabHeaderWrapRef.current.offsetHeight + 'px');
        }
        else {
            setContentMinHeight('auto')
        }
    }, [attributes])

    const { innerBlocks } = useSelect(
        (select) => select("core/block-editor").getBlocksByClientId(clientId)[0]
    );
    const innerBlocksRef = useRef(innerBlocks)
    //
    useEffect(() => {
        const { updateBlockAttributes } = dispatch("core/block-editor");

        times(innerBlocks.length, (n) => {
            updateBlockAttributes(innerBlocks[n].clientId, {
                tabParentId: `${blockId}`,
            });
        });

        if (innerBlocks.length > innerBlocksRef.current.length) {
            innerBlocksRef.current = innerBlocks
        }
        if (innerBlocks.length < innerBlocksRef.current.length) {
            const difference = innerBlocksRef.current.filter(item1 =>
                !innerBlocks.some(item2 => item2.clientId === item1.clientId)
            );
            if (difference.length === 1) {
                const removedTabId = difference[0]?.attributes?.tabId
                const updatedTitles = tabTitles.filter((item) => item.id !== removedTabId)
                setAttributes({
                    tabTitles: updatedTitles,
                    tabChildCount: updatedTitles.length
                })
            }
            innerBlocksRef.current = innerBlocks
        }
    }, [blockId, innerBlocks]);

    const enhancedProps = {
        ...props,
        blockPrefix: 'eb-advanced-tabs',
        style: <Style {...props} isClickTab={isClickTab} />
    };

    return (
        <>
            {isSelected && (
                <Inspector
                    clientId={clientId}
                    attributes={attributes}
                    setAttributes={setAttributes}
                    handleTabTitleClick={handleTabTitleClick}
                />
            )}
            <BlockProps.Edit {...enhancedProps}>
                <div
                    className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`}
                >
                    <div
                        className={`${blockId} eb-advanced-tabs-wrapper ${layout}`}
                        ref={tabWrapRef}
                    >
                        <div className="eb-tabs-nav">
                            <ul
                                ref={tabHeaderWrapRef}
                                className="tabTitles"
                                data-tabs-ul-id={`${blockId}`}
                            >
                                {tabTitles.map((item, index) => {
                                    return (
                                        <li
                                            key={index}
                                            data-title-tab-id={item.id}
                                            onClick={(e) => {
                                                handleTabTitleClick(item.id);
                                            }}
                                            className={
                                                (activeTabId ||
                                                    activeDefaultTabId) ===
                                                    item.id
                                                    ? "active"
                                                    : "inactive"
                                            }
                                        >
                                            {isMediaOn && (
                                                <>
                                                    {item.media === "icon" &&
                                                        item.icon && (
                                                            <EBDisplayIcon icon={item.icon} />
                                                        )}
                                                    {item.media === "image" &&
                                                        item.imgUrl && (
                                                            <img
                                                                src={
                                                                    item.imgUrl
                                                                }
                                                            />
                                                        )}
                                                </>
                                            )}
                                            <RichText
                                                tagName={tagName}
                                                className="tab-title-text"
                                                placeholder="Tab Title"
                                                value={item.text}
                                                onChange={(text) =>
                                                    onTabTitleChange(
                                                        text,
                                                        index
                                                    )
                                                }
                                            />
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                        <div
                            key={renderId}
                            className={`eb-tabs-contents`}
                        >
                            {/* Min Height Style if content min height equals to Heading */}
                            <style>
                                {`
                                    .eb-tabs-contents .eb-tab-wrapper {
                                        min-height: ${contentMinHeight};
                                    }
                                `}
                            </style>
                            <InnerBlocks
                                templateLock="all"
                                template={times(tabChildCount, (n) => [
                                    "essential-blocks/tab",
                                    {
                                        tabId: `${n + 1}`,
                                        tabParentId: blockId,
                                    },
                                ])}
                                allowedBlocks={["essential-blocks/tab"]}
                            />
                        </div>
                    </div>
                </div>
            </BlockProps.Edit>
        </>
    );
}

