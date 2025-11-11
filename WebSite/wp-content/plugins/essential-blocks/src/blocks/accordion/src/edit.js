/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
    useEffect,
    useRef,
    useCallback,
    memo,
} from "@wordpress/element";
import { InnerBlocks, MediaUpload } from "@wordpress/block-editor";
import { Button } from "@wordpress/components";
import { dispatch, useSelect } from "@wordpress/data";
import { createBlock } from "@wordpress/blocks";
import {
    BlockProps,
    withBlockContext,
    BrowseTemplate,
} from "@essential-blocks/controls";

const ALLOWED_BLOCKS = ["essential-blocks/accordion-item"];

/**
 * Internal dependencies
 */
import Inspector from "./inspector";
import { times } from "lodash";
import Style from "./style";
import defaultAttributes from "./attributes";
import AccordionIcon from "./icon";
import Templates from '../../../../patterns/accordion.json'

const Edit = (props) => {
    const { attributes, setAttributes, isSelected, clientId } = props;
    const {
        blockId,
        classHook,
        accordionType,
        displayIcon,
        tabIcon,
        expandedIcon,
        tagName,
        faqSchema,
        accordionChildCount,
        accordionLists,
        showBlockContent,
        titleOrientation,
        activeAccordionIndex,
        nextItemId,
    } = attributes;

    const enhancedProps = {
        ...props,
        blockPrefix: "eb-accordion",
        style: <Style {...props} />,
    };

    const defaultImageUrl =
        EssentialBlocksLocalize?.image_url + "/image-placeholder.jpg";

    const { innerBlocks } = useSelect(
        (select) =>
            select("core/block-editor").getBlocksByClientId(clientId)[0],
    );

    const innerBlocksRef = useRef(innerBlocks);

    const addAccordion = () => {
        const currentNextId = nextItemId || 1;

        // create a new accordion item block
        const newBlock = createBlock("essential-blocks/accordion-item", {
            itemId: currentNextId,
            title: __(`Accordion title ${currentNextId}`, "essential-blocks"),
            inheritedAccordionType: accordionType,
            inheritedTagName: tagName,
            inheritedDisplayIcon: displayIcon,
            inheritedTabIcon: tabIcon,
            inheritedExpandedIcon: expandedIcon,
            parentBlockId: blockId,
        });

        // innerBlocks.splice(innerBlocks.length, 0, newBlock);
        const updatedInnerBlocks = [...innerBlocks, newBlock];
        dispatch("core/block-editor")
            .replaceInnerBlocks(clientId, updatedInnerBlocks)
            .then(() => {
                setAttributes({
                    accordionLists: [
                        ...accordionLists,
                        {
                            id: currentNextId,
                            title: __(
                                `Accordion title ${currentNextId}`,
                                "essential-blocks",
                            ),
                            clickable: false,
                            titlePrefixType: "none",
                            titlePrefixIcon:
                                "dashicon dashicons dashicons-admin-users",
                            titlePrefixText: "Prefix",
                            titlePrefixColor: "",
                            titlePrefixBGColor: "",
                            titlePrefixImgUrl: "",
                            titlePrefixImgId: "",
                            titlePrefixImgAlt: "",
                            titleSuffixType: "none",
                            titleSuffixIcon:
                                "dashicon dashicons dashicons-admin-site",
                            titleSuffixIconColor: "",
                            titleSuffixBgColor: "",
                            titleSuffixImgUrl: "",
                            titleSuffixImgId: "",
                            titleSuffixImgAlt: "",
                            accordionColor: "",
                            titleColor: "",
                            iconColor: "",
                            imageUrl: defaultImageUrl,
                            imageId: "",
                            imageAlt: "",
                            isBlockSelected: false,
                        },
                    ],
                    accordionChildCount: (innerBlocks ? innerBlocks.length : 0) + 1,
                    nextItemId: currentNextId + 1,
                });
                setAttributes({ activeAccordionIndex: currentNextId });
            });
    };
    const { updateBlockAttributes } = dispatch("core/block-editor");

    useEffect(() => {
        if (!tabIcon) {
            setAttributes({ tabIcon: "fas fa-angle-right" });
        }
        if (!expandedIcon) {
            setAttributes({ expandedIcon: "fas fa-angle-down" });
        }

        if (accordionLists.length === 0 && innerBlocks.length === 0) {
            const defaultAccordionLists = [
                {
                    id: 1,
                    title: "Accordion title 1",
                    clickable: true,
                    titlePrefixType: "none",
                    titlePrefixIcon: "dashicon dashicons dashicons-admin-users",
                    titlePrefixText: "Prefix",
                    titlePrefixColor: "",
                    titlePrefixBGColor: "",
                    titlePrefixImgUrl: "",
                    titlePrefixImgId: "",
                    titlePrefixImgAlt: "",
                    titleSuffixType: "none",
                    titleSuffixIcon: "dashicon dashicons dashicons-admin-site",
                    titleSuffixIconColor: "",
                    titleSuffixBgColor: "",
                    titleSuffixText: "Suffix",
                    titleSuffixImgUrl: "",
                    titleSuffixImgId: "",
                    titleSuffixImgAlt: "",
                    accordionColor: "",
                    titleColor: "",
                    iconColor: "",
                    imageUrl: defaultImageUrl,
                    imageId: "",
                    imageAlt: "",
                    isBlockSelected: false,
                },
                {
                    id: 2,
                    title: "Accordion title 2",
                    clickable: false,
                    titlePrefixType: "none",
                    titlePrefixIcon: "dashicon dashicons dashicons-admin-users",
                    titlePrefixText: "Prefix",
                    titlePrefixColor: "",
                    titlePrefixBGColor: "",
                    titlePrefixImgUrl: "",
                    titlePrefixImgId: "",
                    titlePrefixImgAlt: "",
                    titleSuffixType: "none",
                    titleSuffixIcon: "dashicon dashicons dashicons-admin-site",
                    titleSuffixIconColor: "",
                    titleSuffixBgColor: "",
                    titleSuffixText: "Suffix",
                    titleSuffixImgUrl: "",
                    titleSuffixImgId: "",
                    titleSuffixImgAlt: "",
                    accordionColor: "",
                    titleColor: "",
                    iconColor: "",
                    imageUrl: defaultImageUrl,
                    imageId: "",
                    imageAlt: "",
                    isBlockSelected: false,
                },
                {
                    id: 3,
                    title: "Accordion title 3",
                    clickable: false,
                    titlePrefixType: "none",
                    titlePrefixIcon: "dashicon dashicons dashicons-admin-users",
                    titlePrefixText: "Prefix",
                    titlePrefixColor: "",
                    titlePrefixBGColor: "",
                    titlePrefixImgUrl: "",
                    titlePrefixImgId: "",
                    titlePrefixImgAlt: "",
                    titleSuffixType: "none",
                    titleSuffixIcon: "dashicon dashicons dashicons-admin-site",
                    titleSuffixIconColor: "",
                    titleSuffixBgColor: "",
                    titleSuffixText: "Suffix",
                    titleSuffixImgUrl: "",
                    titleSuffixImgId: "",
                    titleSuffixImgAlt: "",
                    accordionColor: "",
                    titleColor: "",
                    iconColor: "",
                    imageUrl: defaultImageUrl,
                    imageId: "",
                    imageAlt: "",
                    isBlockSelected: false,
                },
            ];
            setAttributes({
                accordionLists: defaultAccordionLists,
                nextItemId: 4 // Next ID after the 3 default items
            });
        }

        const isValid = accordionLists.every(obj =>
            Object.keys(obj).length === 1 && obj.hasOwnProperty('id')
        );

        if ((accordionLists.length === 0 || isValid) && innerBlocks.length > 0) {
            times(innerBlocks.length, (n) => {
                updateBlockAttributes(innerBlocks[n].clientId, {
                    itemId: n + 1,
                });
            });

            const newArray = innerBlocks.map((item, index) => ({
                id: index + 1,
                title: item.attributes.title,
                clickable: item.attributes.clickable,
                titlePrefixType: item.attributes.titlePrefixType,
                titlePrefixIcon: item.attributes.titlePrefixIcon,
                titlePrefixText: item.attributes.titlePrefixText,
                titlePrefixColor: item.attributes.titlePrefixColor,
                titlePrefixBgColor: item.attributes.titlePrefixBgColor,
                titlePrefixImgUrl: item.attributes.titlePrefixImgUrl,
                titlePrefixImgId: item.attributes.titlePrefixImgId,
                titlePrefixImgAlt: item.attributes.titlePrefixImgAlt,
                titleSuffixType: item.attributes.titleSuffixType,
                titleSuffixIcon: item.attributes.titleSuffixIcon,
                titleSuffixIconColor: item.attributes.titleSuffixIconColor,
                titleSuffixBgColor: item.attributes.titleSuffixBgColor,
                titleSuffixText: item.attributes.titleSuffixText,
                titleSuffixImgUrl: item.attributes.titleSuffixImgUrl,
                titleSuffixImgId: item.attributes.titleSuffixImgId,
                titleSuffixImgAlt: item.attributes.titleSuffixImgAlt,
                accordionColor: item.attributes.accordionColor,
                titleColor: item.attributes.titleColor,
                iconColor: item.attributes.iconColor,
                imageUrl: item.attributes.imageUrl,
                imageId: item.attributes.imageId,
                imageAlt: item.attributes.imageAlt,
                isBlockSelected: item.attributes.isSelected,
            }));

            setAttributes({
                accordionLists: newArray,
                nextItemId: innerBlocks.length + 1
            });
        }
    }, []);

    // Initialize nextItemId based on existing accordion items
    useEffect(() => {
        if (innerBlocks.length > 0 && (!nextItemId || nextItemId === 1)) {
            const maxItemId = Math.max(...innerBlocks.map(block =>
                block.attributes.itemId || 0
            ));
            if (maxItemId > 0) {
                setAttributes({ nextItemId: maxItemId + 1 });
            }
        }
    }, [innerBlocks, nextItemId]);

    const insertAccodionItem = (accordionChildCount) => {
        return times(accordionChildCount, (n) => [
            "essential-blocks/accordion-item",
            {
                itemId: n + 1,
                title: __(`Accordion title ${n + 1}`, "essential-blocks"),
                inheritedAccordionType: accordionType,
                inheritedDisplayIcon: displayIcon,
                inheritedTabIcon: "fas fa-angle-right",
                inheritedExpandedIcon: "fas fa-angle-down",
                inheritedTagName: tagName,
                faqSchema: faqSchema,
                parentBlockId: blockId,
            },
        ]);
    };

    useEffect(() => {

        if (innerBlocksRef.current.length === innerBlocks.length) {
            return;
        }

        if (
            innerBlocksRef.current == undefined ||
            innerBlocks.length > innerBlocksRef.current.length
        ) {
            innerBlocksRef.current = innerBlocks;
        }
        if (innerBlocks.length < innerBlocksRef.current.length) {
            const difference = innerBlocksRef.current.filter(
                (item1) =>
                    !innerBlocks.some(
                        (item2) => item2.clientId === item1.clientId,
                    ),
            );

            if (difference.length === 1) {
                const removedAccordionId = difference[0]?.attributes?.itemId;
                const updatedAccordions = accordionLists.filter(
                    (item) => parseInt(item.id) !== removedAccordionId,
                );
                setAttributes({
                    accordionLists: updatedAccordions,
                    accordionChildCount: updatedAccordions.length,
                });
            }
            innerBlocksRef.current = innerBlocks;
        }
    }, [innerBlocks]);

    const onAccordionChange = (key, value, position) => {
        const newAccordion = { ...attributes.accordionLists[position] };
        const newAccordionList = [...attributes.accordionLists];
        newAccordionList[position] = newAccordion;

        if (Array.isArray(key)) {
            key.map((item, index) => {
                newAccordionList[position][item] = value[index];
            });
        } else {
            newAccordionList[position][key] = value;
        }

        setAttributes({ accordionLists: newAccordionList });
    };

    const imageContainer = useCallback(
        (items, itemId) => {
            if (!items) return null;

            const item = items.find((item) => item.id === itemId);
            if (!item) return null;

            return (
                <div className="eb-accordion-image-editor">
                    {!item.imageUrl ? (
                        <>
                            <MediaUpload
                                onSelect={({ id, url, alt }) =>
                                    onAccordionChange(
                                        ["imageUrl", "imageId", "imageAlt"],
                                        [url, id, alt],
                                        items.findIndex((i) => i.id === itemId),
                                    )
                                }
                                type="image"
                                value={item.imageId}
                                render={({ open }) => (
                                    <>
                                        <img
                                            src={
                                                EssentialBlocksLocalize?.image_url +
                                                "/image-placeholder.jpg"
                                            }
                                        />
                                        <Button
                                            className="components-button eb-replace-img-button"
                                            label={__(
                                                "Replace Image",
                                                "essential-blocks",
                                            )}
                                            icon="format-image"
                                            onClick={open}
                                        />
                                    </>
                                )}
                            />
                        </>
                    ) : (
                        <>
                            <MediaUpload
                                onSelect={({ id, url, alt }) =>
                                    onAccordionChange(
                                        ["imageUrl", "imageId", "imageAlt"],
                                        [url, id, alt],
                                        items.findIndex((i) => i.id === itemId),
                                    )
                                }
                                type="image"
                                value={item.imageId}
                                render={({ open }) => (
                                    <>
                                        <img
                                            src={item.imageUrl}
                                            alt={item.imageAlt || ""}
                                        />
                                        <Button
                                            className="components-button eb-replace-img-button"
                                            label={__(
                                                "Replace Image",
                                                "essential-blocks",
                                            )}
                                            icon="format-image"
                                            onClick={open}
                                        />
                                    </>
                                )}
                            />
                        </>
                    )}
                </div>
            );
        },
        [accordionLists, activeAccordionIndex],
    );

    const selectedBlockId = useSelect((select) => {
        return select("core/block-editor").getBlockSelectionStart();
    });

    const selectedInnerBlockId = innerBlocks.find(
        (block) => block.clientId === selectedBlockId,
    );

    useEffect(() => {
        if (selectedInnerBlockId) {
            const itemId = selectedInnerBlockId?.attributes?.itemId;
            setAttributes({ activeAccordionIndex: itemId });
        }
    }, [selectedInnerBlockId]);

    const accordionTypeClass =
        accordionType === "image"
            ? " eb-accordion-type-image"
            : accordionType === "horizontal"
                ? " eb-accordion-type-horizontal"
                : "";
    const orientationClass =
        accordionType === "horizontal"
            ? titleOrientation === "bottom-top"
                ? " eb-accordion-bottom-top"
                : " eb-accordion-top-bottom"
            : "";

    return (
        <>
            {isSelected && (
                <Inspector
                    {...props}
                    addAccordion={addAccordion}

                />
            )}
            <BlockProps.Edit {...enhancedProps}>
                <BrowseTemplate
                    {...props}
                    Icon={AccordionIcon}
                    title={__("Accordion", "essential-blocks")}
                    description={__(
                        "Choose a template for the Accordion or start blank.",
                        "essential-blocks",
                    )}
                    patterns={Templates}
                    startTempateIndex={0}
                />
                {showBlockContent && (
                    <>
                        <div
                            className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`}
                        >
                            <div
                                className={`${blockId} eb-accordion-container${accordionTypeClass}${orientationClass}`}
                            >
                                <>
                                    <div className="eb-accordion-inner">
                                        <InnerBlocks
                                            template={insertAccodionItem(
                                                accordionChildCount,
                                            )}
                                            templateLock="insert"
                                            allowedBlocks={ALLOWED_BLOCKS}
                                        />
                                    </div>
                                    {accordionType === "image" && (
                                        <>
                                            <div className="eb-accordion-image-container">
                                                {imageContainer(
                                                    accordionLists,
                                                    activeAccordionIndex,
                                                )}
                                            </div>
                                        </>
                                    )}
                                </>
                            </div>
                            <Button
                                className="is-default eb-accordion-add-button"
                                label={__(
                                    "Add a New Accordion Item",
                                    "essential-blocks",
                                )}
                                icon="plus-alt2"
                                onClick={addAccordion}
                            >
                                <span className="eb-accordion-add-button-label">
                                    {__(
                                        "Add a New Accordion Item",
                                        "essential-blocks",
                                    )}
                                </span>
                            </Button>
                        </div>
                    </>
                )}
            </BlockProps.Edit>
        </>
    );
};

export default memo(withBlockContext(defaultAttributes)(Edit));
