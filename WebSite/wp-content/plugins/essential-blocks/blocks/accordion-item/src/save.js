import { InnerBlocks, RichText } from "@wordpress/block-editor";
const { getIconClass, EBDisplayIcon } = window.EBControls;
const save = ({ attributes }) => {
    const {
        title,
        clickable,
        blockId,
        inheritedTagName,
        inheritedDisplayIcon,
        inheritedTabIcon,

        titlePrefixType,
        titlePrefixText,
        titlePrefixIcon,
        titlePrefixImgUrl,
        titlePrefixImgAlt,

        titleSuffixType,
        titleSuffixText,
        titleSuffixIcon,
        titleSuffixImgUrl,
        titleSuffixImgAlt,
    } = attributes;

    return (
        <>
            <div
                className={`${blockId} eb-accordion-wrapper`}
                data-clickable={clickable}
            >
                <div className={`eb-accordion-title-wrapper`} tabIndex={0}>
                    {inheritedDisplayIcon && (
                        <span className="eb-accordion-icon-wrapper">
                            <span
                                className={`${getIconClass(inheritedTabIcon)} eb-accordion-icon`}
                            ></span>
                        </span>
                    )}

                    <div className="eb-accordion-title-content-wrap">
                        {titlePrefixType !== 'none' && (
                            <>
                                {titlePrefixType === 'text' && titlePrefixText && (
                                    <RichText.Content
                                        className={"eb-accordion-title-prefix-text"}
                                        tagName="span"
                                        value={titlePrefixText}
                                    />
                                )}

                                {titlePrefixType === 'icon' && titlePrefixIcon && (
                                    <EBDisplayIcon icon={titlePrefixIcon} className={`eb-accordion-title-prefix-icon`} />
                                )}

                                {titlePrefixType === "image" && titlePrefixImgUrl ? (
                                    <img
                                        className="eb-accordion-title-prefix-img"
                                        src={titlePrefixImgUrl}
                                        alt={titlePrefixImgAlt}
                                    />
                                ) : null}
                            </>
                        )}
                        <RichText.Content
                            className={"eb-accordion-title"}
                            tagName={inheritedTagName}
                            value={title}
                        />

                        {titleSuffixType !== 'none' && (
                            <>
                                {titleSuffixType === 'text' && titleSuffixText && (
                                    <RichText.Content
                                        className={"eb-accordion-title-suffix-text"}
                                        tagName="span"
                                        value={titleSuffixText}
                                    />
                                )}

                                {titleSuffixType === 'icon' && titleSuffixIcon && (
                                    <EBDisplayIcon icon={titleSuffixIcon} className={`eb-accordion-title-suffix-icon`} />
                                )}

                                {titleSuffixType === "image" && titleSuffixImgUrl ? (
                                    <img
                                        className="eb-accordion-title-suffix-img"
                                        src={titleSuffixImgUrl}
                                        alt={titleSuffixImgAlt}
                                    />
                                ) : null}
                            </>
                        )}
                    </div>
                </div>
                <div className="eb-accordion-content-wrapper">
                    <div className="eb-accordion-content">
                        <InnerBlocks.Content />
                    </div>
                </div>
            </div>
        </>
    );
};

export default save;
