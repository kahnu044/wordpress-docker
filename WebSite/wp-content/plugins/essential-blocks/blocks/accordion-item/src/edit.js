/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { InnerBlocks, MediaUpload, } from "@wordpress/block-editor";
import { Button } from "@wordpress/components";
import { useEffect, useRef } from "@wordpress/element";
import { select } from "@wordpress/data";
import Inspector from "./inspector";
import Style from "./style";
const { EBDisplayIcon, getIconClass, DynamicInputValueHandler, getBlockParentClientId, BlockProps } = window.EBControls;

export default function Edit(props) {
    const { attributes, setAttributes, isSelected, clientId } = props;
    const {
        blockId,
        title,
        clickable,
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
        titleSuffixType,
        titleSuffixText,
        titleSuffixIcon,
        titleSuffixImgUrl,
        titleSuffixImgId,
    } = attributes;

    const enhancedProps = {
        ...props,
        rootClass: `eb-guten-block-main-parent-wrapper eb-accordion-item`,
        blockPrefix: 'eb-accordion-item',
        style: <Style {...props} />
    };

    const accordionTitle = useRef(null);
    const handleSlidingOfAccordion = () => {
        let contentWrapper = accordionTitle.current.nextElementSibling;
        let tabIcon = accordionTitle.current.getAttribute("data-tab-icon");
        let expandedIcon = accordionTitle.current.getAttribute("data-expanded-icon");
        let iconWrapper = accordionTitle.current.children[0].children[0];

        if (contentWrapper.style.display === "block") {
            contentWrapper.style.display = "none";

            if (iconWrapper.tagName === 'I') {
                iconWrapper.removeAttribute("class");
                tabIcon = getIconClass(tabIcon).split(" ");
                for (let i = 0;i < tabIcon.length;i++) {
                    iconWrapper.classList.add(tabIcon[i]);
                }
                iconWrapper.classList.add("eb-accordion-icon");
            }

        } else {
            contentWrapper.style.display = "block";
            contentWrapper.style.opacity = "1";
            if (iconWrapper.tagName === 'I') {
                iconWrapper.removeAttribute("class");
                expandedIcon = getIconClass(expandedIcon).split(" ");
                for (let i = 0;i < expandedIcon.length;i++) {
                    iconWrapper.classList.add(expandedIcon[i]);
                }
                iconWrapper.classList.add("eb-accordion-icon");
            }

        }

    };

    return (
        <>
            {isSelected && <Inspector {...props} />}
            <BlockProps.Edit {...enhancedProps}>
                <div
                    className={`${blockId} eb-accordion-wrapper for_edit_page`}
                    data-clickable={clickable}
                >
                    <div
                        className={`eb-accordion-title-wrapper eb-accordion-title-wrapper-${parentBlockId}`}
                        onClick={handleSlidingOfAccordion}
                        ref={accordionTitle}
                        data-tab-icon={inheritedTabIcon}
                        data-expanded-icon={inheritedExpandedIcon}
                    >
                        {inheritedDisplayIcon && (
                            <span className={`eb-accordion-icon-wrapper eb-accordion-icon-wrapper-${parentBlockId}`}>
                                <EBDisplayIcon icon={inheritedTabIcon} className="eb-accordion-icon" />
                            </span>
                        )}

                        <div className={`eb-accordion-title-content-wrap title-content-${parentBlockId}`}>
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
}
