import { RichText } from "@wordpress/block-editor";
import {
    EBDisplayIcon,
    BlockProps,
    sanitizeURL
} from "@essential-blocks/controls";

const Save = ({ attributes }) => {
    const {
        blockId,
        preset,
        effects,
        tagName: TagName,
        titleText,
        title2Text,
        title3Text,
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

    // Return null for dynamic content - will be handled by PHP render callback
    if (source == 'dynamic-title') return null;
    const linkTarget = openInNewTab ? "_blank" : undefined;

    const Content = () => {
        return (
            <>
                <RichText.Content
                    tagName={'span'}
                    className="first-title"
                    value={titleText}
                />
                {title2Text && (
                    <>
                        &nbsp;
                        <RichText.Content
                            tagName={'span'}
                            className="second-title"
                            value={title2Text}
                        />
                    </>
                )}

                {title3Text && (
                    <>
                        &nbsp;
                        <RichText.Content
                            tagName={'span'}
                            className="third-title"
                            value={title3Text}
                        />
                    </>
                )}
            </>
        )
    }

    return (
        <BlockProps.Save
            attributes={attributes}
        >
            <div
                className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`}
            >
                <div
                    className={`eb-advance-heading-wrapper ${blockId} ${preset} ${effects}`}
                    data-id={blockId}
                >
                    {displaySeperator && seperatorPosition === "top" && (
                        <div className={"eb-ah-separator " + seperatorType}>
                            {seperatorType === "icon" && (
                                <EBDisplayIcon icon={separatorIcon} />
                            )}
                        </div>
                    )}
                    <TagName className="eb-ah-title">
                        {enableLink && titleLink.length > 0 ? (
                            <a
                                href={sanitizeURL(titleLink)}
                                target={linkTarget}
                                rel={linkTarget === "_blank" ? "noopener" : undefined}
                            >
                                <Content />
                            </a>
                        ) : (
                            <Content />
                        )}
                    </TagName>



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
