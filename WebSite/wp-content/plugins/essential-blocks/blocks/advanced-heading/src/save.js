import { RichText } from "@wordpress/block-editor";
const { EBDisplayIcon, BlockProps } = window.EBControls;

const Save = ({ attributes }) => {
    const {
        blockId,
        preset,
        tagName: TagName,
        titleText,
        subtitleTagName,
        displaySubtitle,
        subtitleText,
        seperatorType,
        displaySeperator,
        seperatorPosition,
        separatorIcon,
        classHook,
        source,
        enableLink,
        titleLink,
        openInNewTab
    } = attributes;

    if (source == 'dynamic-title') return null;
    const linkTarget = openInNewTab ? "_blank" : undefined;

    return (
        <BlockProps.Save
            attributes={attributes}
        >
            <div
                className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`}
            >
                <div
                    className={`eb-advance-heading-wrapper ${blockId} ${preset}`}
                    data-id={blockId}
                >
                    {displaySeperator && seperatorPosition === "top" && (
                        <div className={"eb-ah-separator " + seperatorType}>
                            {seperatorType === "icon" && (
                                // <i
                                //     className={`${separatorIcon
                                //         ? separatorIcon
                                //         : "fas fa-arrow-circle-down"
                                //         }`}
                                // ></i>
                                <EBDisplayIcon icon={separatorIcon} />
                            )}
                        </div>
                    )}
                    {enableLink && titleLink.length > 0 && (
                        <TagName className="eb-ah-title">
                            <a
                                href={titleLink}
                                target={linkTarget}
                                rel={linkTarget === "_blank" ? "noopener" : undefined}
                            >
                                {titleText}
                            </a>
                        </TagName>
                    )}

                    {(!enableLink || (enableLink && titleLink.length == 0)) && (
                        <RichText.Content
                            tagName={TagName}
                            className="eb-ah-title"
                            value={titleText}
                        />
                    )}

                    {displaySubtitle && (
                        <RichText.Content
                            tagName={subtitleTagName}
                            className="eb-ah-subtitle"
                            value={subtitleText}
                        />
                    )}
                    {displaySeperator && seperatorPosition === "bottom" && (
                        <div className={"eb-ah-separator " + seperatorType}>
                            {seperatorType === "icon" && (
                                // <i
                                //     className={`${separatorIcon
                                //         ? separatorIcon
                                //         : "fas fa-arrow-circle-down"
                                //         }`}
                                // ></i>
                                <EBDisplayIcon icon={separatorIcon} />
                            )}
                        </div>
                    )}
                </div>
            </div>
        </BlockProps.Save>
    );
};

export default Save;
