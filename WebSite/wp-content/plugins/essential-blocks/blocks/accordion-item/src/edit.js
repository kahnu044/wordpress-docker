/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useBlockProps, InnerBlocks, RichText, MediaUpload, } from "@wordpress/block-editor";
import { Button } from "@wordpress/components";
import { useRef } from "@wordpress/element";
import { useEffect } from "@wordpress/element";
import { select } from "@wordpress/data";

import classnames from "classnames";
import Inspector from "./inspector";
import Style from "./style";




const { duplicateBlockIdFix, EBDisplayIcon, getIconClass, DynamicInputValueHandler, getBlockParentClientId } = window.EBControls;

export default function Edit(props) {
    const { attributes, setAttributes, className, isSelected, clientId } = props;
    const {
        resOption,
        blockId,
        blockMeta,
        title,
        titleColor,
        clickable,
        iconColor,
        accordionColor,
        parentBlockId,
        inheritedTagName,
        inheritedDisplayIcon,
        inheritedTabIcon,
        inheritedExpandedIcon,

        titlePrefixType,
        titlePrefixText,
        titlePrefixIcon,
        titlePrefixImgUrl,
        titlePrefixImgId,
        titlePrefixImgAlt,

        titleSuffixType,
        titleSuffixText,
        titleSuffixIcon,
        titleSuffixImgUrl,
        titleSuffixImgId,
        titleSuffixImgAlt,
    } = attributes;

    // this useEffect is for creating a unique blockId for each block's unique className
    useEffect(() => {
        const BLOCK_PREFIX = "eb-accordion-item";
        duplicateBlockIdFix({
            BLOCK_PREFIX,
            blockId,
            setAttributes,
            select,
            clientId,
        });

        // Parent Block Attr
        const parentClientId = getBlockParentClientId(clientId, "essential-blocks/accordion");
        const getParentBlock = select("core/block-editor").getBlock(parentClientId);
        const getParentBlockId = getParentBlock?.attributes?.blockId;
        const parentTitlePrefixIcon = getParentBlock?.attributes?.titlePrefixIcon;
        const parentTitleSuffixIcon = getParentBlock?.attributes?.titleSuffixIcon;

        if (getParentBlockId) {
            setAttributes({
                parentBlockId: getParentBlockId,
                // titlePrefixIcon: parentTitlePrefixIcon,
                // titleSuffixIcon: parentTitleSuffixIcon,
            });
        }

    }, []);

    const blockProps = useBlockProps({
        className: classnames(
            className,
            `eb-guten-block-main-parent-wrapper eb-accordion-item`
        ),
    });

    const accordionTitle = useRef(null);
    const handleSlidingOfAccordion = () => {
        let contentWrapper = accordionTitle.current.nextElementSibling;
        let tabIcon = accordionTitle.current.getAttribute("data-tab-icon");
        let expandedIcon = accordionTitle.current.getAttribute("data-expanded-icon");
        let iconWrapper = accordionTitle.current.children[0].children[0];

        if (contentWrapper.style.display === "block") {
            contentWrapper.style.display = "none";
            iconWrapper.removeAttribute("class");
            tabIcon = getIconClass(tabIcon).split(" ");
            for (let i = 0; i < tabIcon.length; i++) {
                iconWrapper.classList.add(tabIcon[i]);
            }
            iconWrapper.classList.add("eb-accordion-icon");
        } else {
            contentWrapper.style.display = "block";
            contentWrapper.style.opacity = "1";
            iconWrapper.removeAttribute("class");
            expandedIcon = getIconClass(expandedIcon).split(" ");
            for (let i = 0; i < expandedIcon.length; i++) {
                iconWrapper.classList.add(expandedIcon[i]);
            }
            iconWrapper.classList.add("eb-accordion-icon");
        }
    };

    return (
        <>
            {isSelected && <Inspector {...props} />}
            <div {...blockProps}>
                <Style {...props} />

                <div
                    className={`${blockId} eb-accordion-wrapper for_edit_page`}
                    data-clickable={clickable}
                >
                    <div
                        className={`eb-accordion-title-wrapper`}
                        onClick={handleSlidingOfAccordion}
                        ref={accordionTitle}
                        data-tab-icon={inheritedTabIcon}
                        data-expanded-icon={inheritedExpandedIcon}
                    >
                        {inheritedDisplayIcon && (
                            <span className="eb-accordion-icon-wrapper">
                                <EBDisplayIcon icon={inheritedTabIcon} />
                            </span>
                        )}

                        <div className="eb-accordion-title-content-wrap">
                            {titlePrefixType !== 'none' && (
                                <>
                                    {titlePrefixType === 'text' && titlePrefixText && (
                                        <DynamicInputValueHandler
                                            value={titlePrefixText}
                                            tagName='span'
                                            className="eb-accordion-title-prefix-text"
                                            onChange={(titlePrefixText) =>
                                                setAttributes({ titlePrefixText })
                                            }
                                            readOnly={true}
                                        />
                                    )}

                                    {titlePrefixType === 'icon' && titlePrefixIcon && (
                                        <EBDisplayIcon icon={titlePrefixIcon} className={`eb-accordion-title-prefix-icon`} />
                                    )}

                                    {titlePrefixType === "image" ? (
                                        <MediaUpload
                                            onSelect={({ id, url, alt }) =>
                                                setAttributes({
                                                    titlePrefixImgUrl: url,
                                                    titlePrefixImgId: id,
                                                    titlePrefixImgAlt: alt,
                                                })
                                            }
                                            type="image"
                                            value={titlePrefixImgId}
                                            render={({ open }) => {
                                                if (!titlePrefixImgUrl) {
                                                    return (
                                                        <Button
                                                            className="eb-accordion-img-btn components-button"
                                                            label={__(
                                                                "Upload Image",
                                                                "essential-blocks"
                                                            )}
                                                            icon="format-image"
                                                            onClick={open}
                                                        />
                                                    );
                                                } else {
                                                    return (
                                                        <img
                                                            className="eb-accordion-title-prefix-img"
                                                            src={titlePrefixImgUrl}
                                                        />
                                                    );
                                                }
                                            }}
                                        />
                                    ) : null}
                                </>
                            )}
                            <DynamicInputValueHandler
                                value={title}
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
                                onChange={(title) =>
                                    setAttributes({ title })
                                }
                                readOnly={true}
                            />

                            {titleSuffixType !== 'none' && (
                                <>
                                    {titleSuffixType === 'text' && titleSuffixText && (
                                        <DynamicInputValueHandler
                                            value={titleSuffixText}
                                            tagName='span'
                                            className="eb-accordion-title-suffix-text"
                                            onChange={(titleSuffixText) =>
                                                setAttributes({ titleSuffixText })
                                            }
                                            readOnly={true}
                                        />
                                    )}

                                    {titleSuffixType === 'icon' && titleSuffixIcon && (
                                        <EBDisplayIcon icon={titleSuffixIcon} className={`eb-accordion-title-suffix-icon`} />
                                    )}

                                    {titleSuffixType === "image" ? (
                                        <MediaUpload
                                            onSelect={({ id, url, alt }) =>
                                                setAttributes({
                                                    titleSuffixImgUrl: url,
                                                    titleSuffixImgId: id,
                                                    titleSuffixImgAlt: alt,
                                                })
                                            }
                                            type="image"
                                            value={titleSuffixImgId}
                                            render={({ open }) => {
                                                if (!titleSuffixImgUrl) {
                                                    return (
                                                        <Button
                                                            className="eb-accordion-img-btn components-button"
                                                            label={__(
                                                                "Upload Image",
                                                                "essential-blocks"
                                                            )}
                                                            icon="format-image"
                                                            onClick={open}
                                                        />
                                                    );
                                                } else {
                                                    return (
                                                        <img
                                                            className="eb-accordion-title-suffix-img"
                                                            src={titleSuffixImgUrl}
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
                        className="eb-accordion-content-wrapper"
                        style={{ display: "none" }}
                    >
                        <div className="eb-accordion-content">
                            <InnerBlocks templateLock={false} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
