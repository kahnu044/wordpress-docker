/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { InnerBlocks, MediaUpload } from "@wordpress/block-editor";
import { Button } from "@wordpress/components";
import { useRef, memo, useEffect } from "@wordpress/element";
import Style from "./style";
import defaultAttributes from "./attributes";
import {
    EBDisplayIcon,
    getIconClass,
    DynamicInputValueHandler,
    BlockProps,
    withBlockContext,
    getBlockParentClientId
} from "@essential-blocks/controls";
import { select, dispatch } from "@wordpress/data";

const Edit = (props) => {
    const { attributes, setAttributes, context, clientId } = props;
    const {
        blockId,
        parentBlockId,
        inheritedTagName,
        inheritedDisplayIcon,
        inheritedTabIcon,
        inheritedExpandedIcon,
        accordionLists,
        itemId,
        accordionType,
        inheritedAccordionType,
    } = attributes;

    const enhancedProps = {
        ...props,
        rootClass: `eb-guten-block-main-parent-wrapper eb-accordion-item`,
        blockPrefix: "eb-accordion-item",
        style: <Style {...props} />,
    };

    const accordionTitle = useRef(null);

    const { selectBlock } = dispatch("core/block-editor");

    const handleSlidingOfAccordion = () => {
        const parentBlockClientId = getBlockParentClientId(clientId, "essential-blocks/accordion");

        // Find the block with matching clientId
        const parentBlock = parentBlockClientId ? select('core/block-editor').getBlock(parentBlockClientId) : null;

        let title = accordionTitle.current.querySelector(".eb-accordion-title");
        let prefixText = accordionTitle.current.querySelector(
            ".eb-accordion-title-prefix-text",
        );
        let suffixText = accordionTitle.current.querySelector(
            ".eb-accordion-title-suffix-text",
        );
        if (title) {
            title.setAttribute("contenteditable", false);
        }
        if (prefixText) {
            prefixText.setAttribute("contenteditable", false);
        }
        if (suffixText) {
            suffixText.setAttribute("contenteditable", false);
        }
        let contentWrapper = accordionTitle.current.nextElementSibling;
        let tabIcon = accordionTitle.current.getAttribute("data-tab-icon");
        let expandedIcon =
            accordionTitle.current.getAttribute("data-expanded-icon");
        let iconWrapper = accordionTitle.current.children[0].children[0];
        let accordionItem = accordionTitle.current.closest(
            ".eb-accordion-wrapper",
        );
        let allAccordionItems = accordionTitle.current
            .closest(".eb-accordion-inner")
            .querySelectorAll(".eb-accordion-wrapper");
        accordionItem.classList.toggle("eb-accordion-hidden");

        if (accordionType === "horizontal") {
            allAccordionItems.forEach((element) => {
                element.classList.remove("editor-expanded");
            });
            accordionItem.classList.toggle("editor-expanded");
        }

        if (contentWrapper.style.display === "block") {
            contentWrapper.style.display = "none";
            contentWrapper.style.opacity = "0";
            if (iconWrapper.tagName === "I" || iconWrapper.tagName === "SPAN") {
                iconWrapper.removeAttribute("class");
                tabIcon = getIconClass(tabIcon).split(" ");
                for (let i = 0; i < tabIcon.length; i++) {
                    iconWrapper.classList.add(tabIcon[i]);
                }
                iconWrapper.classList.add("eb-accordion-icon");
            }
        } else {
            contentWrapper.style.display = "block";
            contentWrapper.style.opacity = "1";
            if (iconWrapper.tagName === "I" || iconWrapper.tagName === "SPAN") {
                iconWrapper.removeAttribute("class");
                expandedIcon = getIconClass(expandedIcon).split(" ");
                for (let i = 0; i < expandedIcon.length; i++) {
                    iconWrapper.classList.add(expandedIcon[i]);
                }
                iconWrapper.classList.add("eb-accordion-icon");
            }
        }

        if (parentBlock) {
            // Set the active accordion index in the parent block
            dispatch("essential-blocks").setBlockData(parentBlockId, {
                tabName: "general",
                panelName: "general-individual accordion item",
            });

            dispatch("core/block-editor").updateBlockAttributes(
                parentBlock.clientId,
                {
                    activeAccordionIndex: itemId,
                },
            );

            selectBlock(parentBlock.clientId);
        }
    };

    useEffect(() => {
        const foundItemArray = context["eb/accordionLists"]?.filter((item) => item.id == itemId) ||[];
        setAttributes({
            parentBlockId: context["eb/accordionParentBlockId"],
            inheritedAccordionType:
                context["eb/accordionInheritedAccordionType"],
            inheritedDisplayIcon: context["eb/accordionInheritedDisplayIcon"],
            inheritedTabIcon: context["eb/accordionInheritedTabIcon"],
            inheritedExpandedIcon: context["eb/accordionInheritedExpandedIcon"],
            inheritedTagName: context["eb/accordionInheritedTagName"],
            faqSchema: context["eb/accordionFaqSchema"],
            accordionLists: foundItemArray,
            accordionType: context["eb/accordionType"],
        });
    }, [
        context["eb/accordionParentBlockId"],
        context["eb/accordionInheritedAccordionType"],
        context["eb/accordionInheritedDisplayIcon"],
        context["eb/accordionInheritedTabIcon"],
        context["eb/accordionInheritedExpandedIcon"],
        context["eb/accordionInheritedTagName"],
        context["eb/accordionFaqSchema"],
        context["eb/accordionLists"],
        context["eb/accordionType"],
    ]);

    const foundItem = accordionLists?.find((item) => item.id == itemId);

    return (
        <>
            <BlockProps.Edit {...enhancedProps}>
                <div
                    className={`${blockId} eb-accordion-wrapper-${parentBlockId} eb-accordion-wrapper for_edit_page eb-accordion-hidden`}
                    data-clickable={foundItem?.clickable}
                >
                    <div
                        className={`eb-accordion-title-wrapper eb-accordion-title-wrapper-${parentBlockId}${
                            inheritedAccordionType == "horizontal"
                                ? " eb-accordion-horizontal-enable"
                                : ""
                        }`}
                        onClick={handleSlidingOfAccordion}
                        ref={accordionTitle}
                        data-tab-icon={inheritedTabIcon}
                        data-expanded-icon={inheritedExpandedIcon}
                        {...(accordionType === "image" && foundItem?.imageUrl
                            ? { "data-image-url": foundItem?.imageUrl }
                            : {})}
                        {...(accordionType === "image" && foundItem?.imageAlt
                            ? { "data-image-alt": foundItem?.imageAlt }
                            : {})}
                    >
                        {inheritedDisplayIcon && (
                            <span
                                className={`eb-accordion-icon-wrapper eb-accordion-icon-wrapper-${parentBlockId}`}
                            >
                                <EBDisplayIcon
                                    icon={inheritedTabIcon}
                                    className="eb-accordion-icon"
                                />
                            </span>
                        )}

                        <div
                            className={`eb-accordion-title-content-wrap title-content-${parentBlockId}`}
                        >
                            {foundItem?.titlePrefixType !== "none" && (
                                <>
                                    {foundItem?.titlePrefixType === "text" &&
                                        foundItem?.titlePrefixText && (
                                            <DynamicInputValueHandler
                                                value={
                                                    foundItem?.titlePrefixText
                                                }
                                                tagName="span"
                                                className="eb-accordion-title-prefix-text"
                                                onChange={(text) =>
                                                    foundItem?.titlePrefixText
                                                }
                                                readOnly={true}
                                            />
                                        )}

                                    {foundItem?.titlePrefixType === "icon" &&
                                        foundItem?.titlePrefixIcon && (
                                            <EBDisplayIcon
                                                icon={
                                                    foundItem?.titlePrefixIcon
                                                }
                                                className={`eb-accordion-title-prefix-icon`}
                                            />
                                        )}

                                    {foundItem?.titlePrefixType === "image" ? (
                                        <MediaUpload
                                            onSelect={({ id, url, alt }) =>
                                                setAttributes({
                                                    titlePrefixImgUrl: url,
                                                    titlePrefixImgId: id,
                                                    titlePrefixImgAlt: alt,
                                                })
                                            }
                                            type="image"
                                            value={foundItem?.titlePrefixImgId}
                                            render={({ open }) => {
                                                if (
                                                    !foundItem?.titlePrefixImgUrl
                                                ) {
                                                    return (
                                                        <Button
                                                            className="eb-accordion-img-btn components-button"
                                                            label={__(
                                                                "Upload Image",
                                                                "essential-blocks",
                                                            )}
                                                            icon="format-image"
                                                            onClick={open}
                                                        />
                                                    );
                                                } else {
                                                    return (
                                                        <img
                                                            className="eb-accordion-title-prefix-img"
                                                            src={
                                                                foundItem?.titlePrefixImgUrl
                                                            }
                                                        />
                                                    );
                                                }
                                            }}
                                        />
                                    ) : null}
                                </>
                            )}
                            <DynamicInputValueHandler
                                value={foundItem?.title}
                                tagName={inheritedTagName}
                                className="eb-accordion-title"
                                allowedFormats={[
                                    "core/bold",
                                    "core/italic",
                                    "core/link",
                                    "core/strikethrough",
                                    "core/underline",
                                    "core/text-color",
                                ]}
                                onChange={() => {
                                    null;
                                }}
                                readOnly={true}
                            />

                            {foundItem?.titleSuffixType !== "none" && (
                                <>
                                    {foundItem?.titleSuffixType === "text" &&
                                        foundItem?.titleSuffixText && (
                                            <DynamicInputValueHandler
                                                value={
                                                    foundItem?.titleSuffixText
                                                }
                                                tagName="span"
                                                className="eb-accordion-title-suffix-text"
                                                onChange={(text) => text}
                                                readOnly={true}
                                            />
                                        )}

                                    {foundItem?.titleSuffixType === "icon" &&
                                        foundItem?.titleSuffixIcon && (
                                            <EBDisplayIcon
                                                icon={
                                                    foundItem?.titleSuffixIcon
                                                }
                                                className={`eb-accordion-title-suffix-icon`}
                                            />
                                        )}

                                    {foundItem?.titleSuffixType === "image" ? (
                                        <MediaUpload
                                            onSelect={({ id, url, alt }) =>
                                                setAttributes({
                                                    titleSuffixImgUrl: url,
                                                    titleSuffixImgId: id,
                                                    titleSuffixImgAlt: alt,
                                                })
                                            }
                                            type="image"
                                            value={foundItem?.titleSuffixImgId}
                                            render={({ open }) => {
                                                if (
                                                    !foundItem?.titleSuffixImgUrl
                                                ) {
                                                    return (
                                                        <Button
                                                            className="eb-accordion-img-btn components-button"
                                                            label={__(
                                                                "Upload Image",
                                                                "essential-blocks",
                                                            )}
                                                            icon="format-image"
                                                            onClick={open}
                                                        />
                                                    );
                                                } else {
                                                    return (
                                                        <img
                                                            className="eb-accordion-title-suffix-img"
                                                            src={
                                                                foundItem?.titleSuffixImgUrl
                                                            }
                                                        />
                                                    );
                                                }
                                            }}
                                        />
                                    ) : null}
                                </>
                            )}
                        </div>
                    </div>
                    <div
                        className={`eb-accordion-content-wrapper eb-accordion-content-wrapper-${parentBlockId}`}
                        style={{ display: "none" }}
                    >
                        <div className="eb-accordion-content">
                            <InnerBlocks templateLock={false} />
                        </div>
                    </div>
                </div>
            </BlockProps.Edit>
        </>
    );
};

export default memo(withBlockContext(defaultAttributes)(Edit));
