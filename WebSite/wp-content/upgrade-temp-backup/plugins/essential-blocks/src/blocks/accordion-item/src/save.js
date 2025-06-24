
import { InnerBlocks, RichText, useBlockProps } from "@wordpress/block-editor";
import {
    getIconClass,
    EBDisplayIcon,
} from "@essential-blocks/controls";
const save = ({ attributes }) => {
    const {
        itemId,
        blockId,
        inheritedTagName,
        inheritedDisplayIcon,
        inheritedTabIcon,
        parentBlockId,
        accordionLists,
        inheritedAccordionType
    } = attributes;

    const blockProps = useBlockProps.save({
        className: `${blockId} eb-accordion-wrapper`,
    });

    const foundItem = accordionLists?.find(item => item.id == itemId);
    
    return (
        <div {...blockProps} data-clickable={foundItem?.clickable}>
            <div 
                className={`eb-accordion-title-wrapper eb-accordion-title-wrapper-${parentBlockId}${inheritedAccordionType == "horizontal" ? " eb-accordion-horizontal-enable" : ""}`}
                tabIndex={0}
                {...(inheritedAccordionType === 'image' && foundItem?.imageUrl ? {"data-image-url": foundItem?.imageUrl} : {})}
                {...(inheritedAccordionType === 'image' && foundItem?.imageAlt ? {"data-image-alt": foundItem?.imageAlt} : {})}
            >
                {inheritedDisplayIcon && (
                    <span className={`eb-accordion-icon-wrapper eb-accordion-icon-wrapper-${parentBlockId}`}>
                        <span
                            className={`${getIconClass(inheritedTabIcon)} eb-accordion-icon`}
                        ></span>
                    </span>
                )}

                <div className={`eb-accordion-title-content-wrap title-content-${parentBlockId}`}>
                    {foundItem?.titlePrefixType !== 'none' && (
                        <>
                            {foundItem?.titlePrefixType === 'text' && foundItem?.titlePrefixText && (
                                <RichText.Content
                                    className={"eb-accordion-title-prefix-text"}
                                    tagName="span"
                                    value={foundItem?.titlePrefixText}
                                />
                            )}

                            {foundItem?.titlePrefixType === 'icon' && foundItem?.titlePrefixIcon && (
                                <EBDisplayIcon icon={foundItem?.titlePrefixIcon} className={`eb-accordion-title-prefix-icon`} />
                            )}

                            {foundItem?.titlePrefixType === "image" && foundItem?.titlePrefixImgUrl ? (
                                <img
                                    className="eb-accordion-title-prefix-img"
                                    src={foundItem?.titlePrefixImgUrl}
                                    alt={foundItem?.titlePrefixImgAlt}
                                />
                            ) : null}
                        </>
                    )}
                    <RichText.Content
                        className={"eb-accordion-title"}
                        tagName={inheritedTagName}
                        value={foundItem?.title}
                    />

                    {foundItem?.titleSuffixType !== 'none' && (
                        <>
                            {foundItem?.titleSuffixType === 'text' && foundItem?.titleSuffixText && (
                                <RichText.Content
                                    className={"eb-accordion-title-suffix-text"}
                                    tagName="span"
                                    value={foundItem?.titleSuffixText}
                                />
                            )}

                            {foundItem?.titleSuffixType === 'icon' && foundItem?.titleSuffixIcon && (
                                <EBDisplayIcon icon={foundItem?.titleSuffixIcon} className={`eb-accordion-title-suffix-icon`} />
                            )}

                            {foundItem?.titleSuffixType === "image" && foundItem?.titleSuffixImgUrl ? (
                                <img
                                    className="eb-accordion-title-suffix-img"
                                    src={foundItem?.titleSuffixImgUrl}
                                    alt={foundItem?.titleSuffixImgAlt}
                                />
                            ) : null}
                        </>
                    )}
                </div>
            </div>
            <div className={`eb-accordion-content-wrapper eb-accordion-content-wrapper-${parentBlockId}`}>
                <div className="eb-accordion-content">
                    <InnerBlocks.Content />
                    {inheritedAccordionType === 'image' && foundItem?.imageUrl && (
                        <div className="eb-accordion-image-wrapper-mobile">
                            <img src={foundItem?.imageUrl || ""} alt={foundItem?.imageAlt || ""} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default save;
