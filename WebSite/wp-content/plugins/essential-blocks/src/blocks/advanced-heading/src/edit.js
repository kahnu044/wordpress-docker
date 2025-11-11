/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useEffect, memo } from "@wordpress/element";
import { BlockControls, AlignmentToolbar } from "@wordpress/block-editor";
import { useEntityProp } from "@wordpress/core-data";

/**
 * Internal depencencies
 */
import Inspector from "./inspector";

/**
 * External depencencies
 */
import {
    DynamicInputValueHandler,
    EBDisplayIcon,
    BlockProps,
    withBlockContext,
} from "@essential-blocks/controls";

import Style from "./style";
import defaultAttributes from "./attributes";

function Edit(props) {
    const { attributes, setAttributes, isSelected, context } = props;
    const {
        blockId,
        preset,
        effects,
        align,
        tagName,
        titleText,
        title2Text,
        title3Text,
        subtitleTagName,
        subtitleText,
        displaySubtitle,
        displaySeperator,
        seperatorPosition,
        seperatorType,
        separatorIcon,
        classHook,
        source,
        currentPostId,
        currentPostType,
        version,
        titleLength,
    } = attributes;

    // you must declare this variable
    const enhancedProps = {
        ...props,
        blockPrefix: "eb-advance-heading",
        style: <Style {...props} />,
    };

    useEffect(() => {
        if (source == undefined) {
            setAttributes({ source: "custom" });
        }
        setAttributes({ version: "2" });
    }, []);

    // Get post data from Loop Builder context
    const loopPostId = context?.["essential-blocks/postId"];
    const loopPostType = context?.["essential-blocks/postType"];

    // Check if block is inside Loop Builder context
    // We need to check multiple conditions because context might be available at different times
    const isInLoopBuilder = Boolean(
        context &&
            context.hasOwnProperty("essential-blocks/postId") &&
            context.hasOwnProperty("essential-blocks/postType"),
    );

    // Use loop context values when in Loop Builder, otherwise use current values
    const effectivePostType = isInLoopBuilder
        ? loopPostType || currentPostType
        : currentPostType;
    const effectivePostId = isInLoopBuilder
        ? loopPostId || currentPostId
        : currentPostId;

    const [rawTitle = "", setTitle] = useEntityProp(
        "postType",
        effectivePostType,
        "title",
        effectivePostId,
    );

    // Handle regular WordPress context (when not in Loop Builder)
    useEffect(() => {
        if (
            !isInLoopBuilder &&
            context?.postId &&
            !currentPostId &&
            !currentPostType
        ) {
            setAttributes({
                currentPostId: context.postId,
                currentPostType: context.postType,
            });
        }
    }, [
        source,
        isInLoopBuilder,
        context?.postId,
        context?.postType,
        currentPostId,
        currentPostType,
    ]);

    // Effect to handle Loop Builder context initialization
    useEffect(() => {
        if (isInLoopBuilder) {
            // Set source to dynamic-title and update context values
            setAttributes({
                source: "dynamic-title",
                currentPostId: loopPostId || 0,
                currentPostType: loopPostType || "post",
            });
        }
    }, [isInLoopBuilder, loopPostId, loopPostType]);

    const editorType = eb_conditional_localize?.editor_type || false;
    let TagName = tagName;

    // Helper to limit title by word count when inside Loop Builder
    const limitWords = (text, maxWords) => {
        if (!text || !maxWords || maxWords <= 0) return text || "";
        const words = String(text).split(/\s+/).filter(Boolean);
        if (words.length <= maxWords) return words.join(" ");
        return words.slice(0, maxWords).join(" ") + "…";
    };

    const displayedRawTitle = isInLoopBuilder
        ? limitWords(rawTitle, titleLength)
        : rawTitle;

    return (
        <>
            {isSelected && (
                <>
                    <BlockControls>
                        <AlignmentToolbar
                            value={align}
                            onChange={(align) => setAttributes({ align })}
                            controls={["left", "center", "right"]}
                        />
                    </BlockControls>
                    <Inspector
                        attributes={attributes}
                        setAttributes={setAttributes}
                        context={context}
                    />
                </>
            )}

            <BlockProps.Edit {...enhancedProps}>
                <div
                    className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`}
                >
                    {source === "dynamic-title" && currentPostId === 0 && (
                        <>
                            {editorType === "edit-site" && (
                                <TagName className="eb-ah-title">
                                    Dynamic Title
                                </TagName>
                            )}
                            {editorType !== "edit-site" && (
                                <div className="eb-loading">
                                    <img
                                        src={`${EssentialBlocksLocalize?.image_url}/ajax-loader.gif`}
                                        alt="Loading..."
                                    />
                                </div>
                            )}
                        </>
                    )}

                    {((source === "dynamic-title" && currentPostId !== 0) ||
                        source === "custom") && (
                        <>
                            <div
                                className={`eb-advance-heading-wrapper ${blockId} ${preset} ${effects}`}
                                data-id={blockId}
                            >
                                {displaySeperator &&
                                    seperatorPosition === "top" && (
                                        <div
                                            className={
                                                "eb-ah-separator " +
                                                seperatorType
                                            }
                                        >
                                            {seperatorType === "icon" && (
                                                <EBDisplayIcon
                                                    icon={separatorIcon}
                                                />
                                            )}
                                        </div>
                                    )}

                                {source === "dynamic-title" && (
                                    <>
                                        {currentPostId > 0 && (
                                            <TagName className={`eb-ah-title`}>
                                                <DynamicInputValueHandler
                                                    value={displayedRawTitle}
                                                    tagName={"span"}
                                                    className="first-title"
                                                    allowedFormats={[
                                                        "core/bold",
                                                        "core/italic",
                                                        "core/link",
                                                        "core/strikethrough",
                                                        "core/underline",
                                                        "core/text-color",
                                                    ]}
                                                    onChange={
                                                        isInLoopBuilder
                                                            ? () => {}
                                                            : setTitle
                                                    }
                                                    readOnly={isInLoopBuilder}
                                                />
                                            </TagName>
                                        )}

                                        {/* for FSE */}
                                        {typeof currentPostId == "string" && (
                                            <TagName>
                                                {displayedRawTitle
                                                    ? displayedRawTitle
                                                    : __("Title")}
                                            </TagName>
                                        )}
                                    </>
                                )}

                                {source === "custom" && (
                                    <TagName className={`eb-ah-title`}>
                                        <DynamicInputValueHandler
                                            value={titleText}
                                            tagName={"span"}
                                            className="first-title"
                                            allowedFormats={[
                                                "core/bold",
                                                "core/italic",
                                                "core/link",
                                                "core/strikethrough",
                                                "core/underline",
                                                "core/text-color",
                                            ]}
                                            onChange={(newTitleText) => {
                                                setAttributes({
                                                    titleText: newTitleText,
                                                });
                                            }}
                                            readOnly={true}
                                        />
                                        {title2Text && (
                                            <>
                                                <DynamicInputValueHandler
                                                    value={title2Text}
                                                    tagName={"span"}
                                                    className="second-title"
                                                    allowedFormats={[
                                                        "core/bold",
                                                        "core/italic",
                                                        "core/link",
                                                        "core/strikethrough",
                                                        "core/underline",
                                                        "core/text-color",
                                                    ]}
                                                    onChange={(title2Text) =>
                                                        setAttributes({
                                                            title2Text,
                                                        })
                                                    }
                                                    readOnly={true}
                                                />
                                            </>
                                        )}
                                        {title2Text && (
                                            <>
                                                <DynamicInputValueHandler
                                                    value={title3Text}
                                                    tagName={"span"}
                                                    className="third-title"
                                                    allowedFormats={[
                                                        "core/bold",
                                                        "core/italic",
                                                        "core/link",
                                                        "core/strikethrough",
                                                        "core/underline",
                                                        "core/text-color",
                                                    ]}
                                                    onChange={(title3Text) =>
                                                        setAttributes({
                                                            title3Text,
                                                        })
                                                    }
                                                    readOnly={true}
                                                />
                                            </>
                                        )}
                                    </TagName>
                                )}

                                {source === "custom" && displaySubtitle && (
                                    <DynamicInputValueHandler
                                        tagName={subtitleTagName}
                                        className="eb-ah-subtitle"
                                        value={subtitleText}
                                        allowedFormats={[
                                            "core/bold",
                                            "core/italic",
                                            "core/link",
                                            "core/strikethrough",
                                            "core/underline",
                                            "core/text-color",
                                        ]}
                                        onChange={(subtitleText) =>
                                            setAttributes({ subtitleText })
                                        }
                                        readOnly={true}
                                    />
                                )}
                                {displaySeperator &&
                                    seperatorPosition === "bottom" && (
                                        <div
                                            className={
                                                "eb-ah-separator " +
                                                seperatorType
                                            }
                                        >
                                            {seperatorType === "icon" && (
                                                // <i
                                                //     className={`${separatorIcon
                                                //         ? separatorIcon
                                                //         : "fas fa-arrow-circle-down"
                                                //         }`}
                                                // ></i>
                                                <EBDisplayIcon
                                                    icon={separatorIcon}
                                                />
                                            )}
                                        </div>
                                    )}
                            </div>
                        </>
                    )}
                </div>
            </BlockProps.Edit>
        </>
    );
}
export default memo(withBlockContext(defaultAttributes)(Edit));
