/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useState, useEffect, memo, useMemo } from "@wordpress/element";
import {
    BlockControls,
    AlignmentToolbar
} from "@wordpress/block-editor";
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
    BlockProps,
    withBlockContext
} from "@essential-blocks/controls";

import Style from "./style";
import defaultAttributes from './attributes'

function Edit(props) {
    const {
        attributes,
        setAttributes,
        isSelected,
        context
    } = props;
    const {
        blockId,
        align,
        tagName,
        text,
        classHook,
        source,
        currentPostId,
        currentPostType,
        excerptLength
    } = attributes;

    // Get post data from Loop Builder context
    const loopPostId = context?.["essential-blocks/postId"];
    const loopPostType = context?.["essential-blocks/postType"];

    // Check if block is inside Loop Builder context
    const isInLoopBuilder = Boolean(
        context &&
            // Primary check: explicit isLoopBuilder flag
            (context["essential-blocks/isLoopBuilder"] === true ||
                // Secondary check: presence of loop context values (even if null initially)
                (context.hasOwnProperty("essential-blocks/postId") &&
                    context.hasOwnProperty("essential-blocks/postType"))),
    );

    // Use loop context values when in Loop Builder, otherwise use current values
    const effectivePostType = isInLoopBuilder ? (loopPostType || currentPostType) : currentPostType;
    const effectivePostId = isInLoopBuilder ? (loopPostId || currentPostId) : currentPostId;

    // Fetch excerpt content when in loop builder context
    const [rawExcerpt = "", , { rendered: renderedExcerpt } = {}] = useEntityProp(
        "postType",
        effectivePostType,
        "excerpt",
        effectivePostId,
    );

    // Process excerpt content - strip HTML tags and get text content
    // Use useMemo to recalculate when dependencies change
    const excerptText = useMemo(() => {
        
        if (!isInLoopBuilder || source !== 'dynamic-excerpt') return '';

        let excerptText = rawExcerpt || '';

        // If no raw excerpt, try to get text from rendered excerpt
        if (!excerptText && renderedExcerpt) {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = renderedExcerpt;
            excerptText = tempDiv.textContent || tempDiv.innerText || '';
        }

        // Apply custom excerpt length (word count)
        if (excerptText && excerptLength > 0) {
            const words = excerptText.trim().split(/\s+/);
            if (words.length > excerptLength) {
                excerptText = words.slice(0, excerptLength).join(' ') + '...';
            }
        }

        return excerptText.trim();
    }, [isInLoopBuilder, source, rawExcerpt, renderedExcerpt, excerptLength]);

    // Effect to handle Loop Builder context initialization
    useEffect(() => {
        if (isInLoopBuilder) {
            // Set source to dynamic-excerpt and update context values
            setAttributes({
                source: 'dynamic-excerpt',
                currentPostId: loopPostId || 0,
                currentPostType: loopPostType || 'post'
            });
        }
    }, [isInLoopBuilder, loopPostId, loopPostType]);

    // you must declare this variable
    const enhancedProps = {
        ...props,
        blockPrefix: 'eb-text',
        style: <Style {...props} />
    };

    const TagName = tagName

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
                    <div
                        className={`eb-text-wrapper ${blockId}`}
                        data-id={blockId}
                    >
                        {source === 'custom' && (
                            <DynamicInputValueHandler
                                value={text}
                                tagName={tagName}
                                className="eb-text"
                                isSelected={true}
                                allowedFormats={[
                                    "core/bold",
                                    "core/italic",
                                    "core/link",
                                    "core/strikethrough",
                                    "core/underline",
                                    "core/text-color",
                                ]}
                                onChange={(text) =>
                                    setAttributes({ text })
                                }
                                placeholder={__('Type your text here')}
                                readOnly={true}
                            />
                        )}
                        {source && source !== 'custom' && !isInLoopBuilder && (
                            <TagName className="eb-text">Please note that placeholder data is currently displayed in the editor. The actual data from "<strong>{source}</strong>" will be displayed on the front end.</TagName>
                        )}
                        {source && source !== 'custom' && isInLoopBuilder && source === 'dynamic-excerpt' && excerptText && (
                            <TagName className="eb-text">{excerptText}</TagName>
                        )}
                    </div>
                </div>
            </BlockProps.Edit>
        </>
    );
}
export default memo(withBlockContext(defaultAttributes)(Edit))
