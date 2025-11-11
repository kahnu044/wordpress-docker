/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useEffect, memo } from "@wordpress/element";
import { select, withSelect } from "@wordpress/data";
import { compose } from "@wordpress/compose";
import { useEntityProp } from "@wordpress/core-data";
import { dateI18n } from "@wordpress/date";

/**
 * Internal depencencies
 */
import Inspector from "./inspector";
import Style from "./style";
import defaultAttributes from './attributes'
import {
    BlockProps,
    withBlockContext,
    EBDisplayIcon
} from "@essential-blocks/controls";

function Edit(props) {
    const { attributes, setAttributes, isSelected, selectPostType, context } = props;
    const {
        blockId,
        type,
        enableContents,
        authorLabel,
        dateLabel,
        productSkuLabel,
        metaDisplay,
        classHook,
        authorIcon,
        dateIcon,
        skuIcon,
        showMetaIcon,
        showAuthor,
        showAuthorPicture,
        authorPictureLink
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

    const postType = select("core/editor").getCurrentPostType();
    const isContentEnabled = (contentName) => enableContents.includes(contentName);

    // Effect to handle Loop Builder specific default settings (only on first entry)
    useEffect(() => {
        if (isInLoopBuilder && !attributes.hasLoopBuilderDefaults) {
            // Set default values for loop builder context only once
            setAttributes({
                showAuthor: false,
                showMetaIcon: false,
                dateLabel: "",
                hasLoopBuilderDefaults: true
            });
        }
    }, [isInLoopBuilder]);

    // Use loop context values when in Loop Builder, otherwise use current post
    const currentPostId = select("core/editor")?.getCurrentPostId();
    const effectivePostType = isInLoopBuilder ? (loopPostType || 'post') : postType;
    const effectivePostId = isInLoopBuilder ? (loopPostId || 0) : currentPostId;



    // Fetch author data
    const [authorId] = useEntityProp(
        "postType",
        effectivePostType,
        "author",
        effectivePostId,
    );

    const [authorData] = useEntityProp(
        "root",
        "user",
        "name",
        authorId,
    );

    // Fetch author avatar URL
    const [authorAvatarUrls] = useEntityProp(
        "root",
        "user",
        "avatar_urls",
        authorId,
    );

    // Fetch post date
    const [postDate] = useEntityProp(
        "postType",
        effectivePostType,
        "date",
        effectivePostId,
    );



    useEffect(() => {

        if (postType === "templately_library") {
            let type = 'post';
            const templateType = select('core/editor').getEditedPostAttribute('templately_type');
            if (templateType) {
                if (['product_archive', 'product_single'].includes(templateType)) {
                    type = 'product'
                }
                if (['course_archive', 'course_single'].includes(templateType)) {
                    type = 'sfwd-courses'
                }
            }
            setAttributes({ type: type })
        } else if (postType === 'wp_template') {
            const slugArray = select('core/editor').getEditedPostAttribute('slug').split('-');
            let type = 'post';
            if (slugArray.length > 1) {
                type = slugArray[1];
            }
            if (slugArray.length === 1 && slugArray[0] === 'page') {
                type = 'page';
            }
            setAttributes({ type: type })
        } else {
            setAttributes({ type: selectPostType })
        }

        if (type !== null && type !== 'product') {
            let list = [...enableContents];
            const index = list.indexOf('product_sku');
            if (index !== -1) {
                list.splice(index, 1);
            }
            setAttributes({ enableContents: list })
        }

    }, [])

    // Effect to handle Loop Builder context initialization
    useEffect(() => {
        if (isInLoopBuilder && !attributes.hasLoopBuilderDefaults) {
            // Set Loop Builder defaults when first entering loop context
            setAttributes({
                showAuthor: false,
                showMetaIcon: false,
                authorLabel: "",
                dateLabel: "",
                showAuthorPicture: true, // Enable author picture by default in Loop Builder
                hasLoopBuilderDefaults: true,
            });
        }
    }, [isInLoopBuilder, attributes.hasLoopBuilderDefaults]);

    // you must declare this variable
    const enhancedProps = {
        ...props,
        blockPrefix: 'eb-post-meta',
        style: <Style {...props} isContentEnabled={isContentEnabled} />
    };



    // Format post date for display using WordPress date format
    const getFormattedPostDate = () => {
        if (postDate) {
            // Use WordPress date format settings
            const dateFormat = select("core").getEntityRecord("root", "site")?.date_format || "F j, Y";
            return dateI18n(dateFormat, postDate);
        }
        // Fallback to current date with WordPress format
        const dateFormat = select("core").getEntityRecord("root", "site")?.date_format || "F j, Y";
        return dateI18n(dateFormat, new Date());
    }

    // Get author name for display
    const getAuthorName = () => {
        if (authorData) {
            return authorData;
        }
        return __("Author", "essential-blocks");
    }

    // Get author avatar URL for display
    const getAuthorAvatarUrl = () => {
        if (authorAvatarUrls && authorAvatarUrls['96']) {
            return authorAvatarUrls['96'];
        }

        // Fallback to default avatar (same as PHP backend)
        return `https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y&s=96`;
    }

    // Get author URL for linking
    const getAuthorUrl = () => {
        if (authorId) {
            // In the editor, we'll use a placeholder URL
            return `#author-${authorId}`;
        }
        return '#';
    }

    // Check if author should be shown (handles loop builder initial state)
    const shouldShowAuthor = () => {
        if (isInLoopBuilder && !attributes.hasLoopBuilderDefaults) {
            // In loop builder but defaults not set yet - don't show author
            return false;
        }
        return showAuthor;
    }

    // Check if meta icons should be shown (handles loop builder initial state)
    const shouldShowMetaIcon = () => {
        if (isInLoopBuilder && !attributes.hasLoopBuilderDefaults) {
            // In loop builder but defaults not set yet - don't show icons
            return false;
        }
        return showMetaIcon;
    }

    // Get effective date label (handles loop builder initial state)
    const getEffectiveDateLabel = () => {
        if (isInLoopBuilder && !attributes.hasLoopBuilderDefaults) {
            // In loop builder but defaults not set yet - no label
            return "";
        }
        return dateLabel;
    }


    // Function to render individual meta items based on type
    const renderMetaItem = (contentType) => {
        switch (contentType) {
            case 'author':
                if (!isContentEnabled("author") || !shouldShowAuthor()) return null;

                if (metaDisplay === "stacked") {
                    // For stacked layout, return the author content part only
                    return (
                        <div key="author" className="eb-author-info">
                            {shouldShowMetaIcon() && authorIcon && (
                                <EBDisplayIcon icon={authorIcon} className={`eb-post-metadata-icon`} />
                            )}
                            <span className="eb-post-metadata-label">{authorLabel} </span>
                            <span className="eb-post-metadata-value">{getAuthorName()}</span>
                        </div>
                    );
                } else {
                    // For inline layout, return complete author item with picture
                    return (
                        <div key="author" className="eb-post-metadata-item eb-post-metadata-author eb-author-inline-layout">
                            {shouldShowMetaIcon() && authorIcon && (
                                <EBDisplayIcon icon={authorIcon} className={`eb-post-metadata-icon`} />
                            )}
                            {showAuthorPicture && (
                                <div className="eb-author-picture">
                                    {authorPictureLink ? (
                                        <a href={getAuthorUrl()}>
                                            <img
                                                src={getAuthorAvatarUrl()}
                                                alt={getAuthorName()}
                                                className="eb-author-avatar"
                                            />
                                        </a>
                                    ) : (
                                        <img
                                            src={getAuthorAvatarUrl()}
                                            alt={getAuthorName()}
                                            className="eb-author-avatar"
                                        />
                                    )}
                                </div>
                            )}
                            <span className="eb-post-metadata-label">{authorLabel} </span>
                            <span className="eb-post-metadata-value">{getAuthorName()}</span>
                        </div>
                    );
                }

            case 'date':
                if (!isContentEnabled("date")) return null;

                if (metaDisplay === "stacked") {
                    // For stacked layout, return the date content part only
                    return (
                        <div key="date" className="eb-date-info">
                            {shouldShowMetaIcon() && dateIcon && (
                                <EBDisplayIcon icon={dateIcon} className={`eb-post-metadata-icon`} />
                            )}
                            <span className="eb-post-metadata-label">{getEffectiveDateLabel()} </span>
                            <span className="eb-post-metadata-value">{getFormattedPostDate()}</span>
                        </div>
                    );
                } else {
                    // For inline layout, return complete date item
                    return (
                        <div key="date" className="eb-post-metadata-item eb-post-metadata-date">
                            {shouldShowMetaIcon() && dateIcon && (
                                <EBDisplayIcon icon={dateIcon} className={`eb-post-metadata-icon`} />
                            )}
                            <span className="eb-post-metadata-label">{getEffectiveDateLabel()} </span>
                            <span className="eb-post-metadata-value">{getFormattedPostDate()}</span>
                        </div>
                    );
                }

            case 'product_sku':
                if (!isContentEnabled("product_sku") || type !== 'product') return null;

                return (
                    <div key="product_sku" className="eb-post-metadata-item eb-post-metadata-product_sku">
                        {showMetaIcon == true && skuIcon && (
                            <EBDisplayIcon icon={skuIcon} className={`eb-post-metadata-icon`} />
                        )}
                        <span className="eb-post-metadata-label">{productSkuLabel} </span>
                        <span className="eb-post-metadata-value">{__("Product SKU", "essential-blocks")}</span>
                    </div>
                );

            default:
                return null;
        }
    };

    // Check if we have author and date for stacked layout
    const hasAuthorForStacked = isContentEnabled("author") && shouldShowAuthor();
    const hasDateForStacked = isContentEnabled("date");
    const shouldShowStackedLayout = metaDisplay === "stacked" && (hasAuthorForStacked || hasDateForStacked);

    return (
        <>
            {isSelected && <Inspector {...props} />}
            <BlockProps.Edit {...enhancedProps}>
                <div className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`}>
                    <div className={`eb-post-meta-wrapper ${blockId}`} data-id={blockId}>
                        <div className={`eb-post-metadata eb-post-meta-${metaDisplay}`}>
                            {shouldShowStackedLayout ? (
                                // Stacked layout: Picture on left, author name and date stacked on right
                                <div className="eb-post-metadata-item eb-post-metadata-author eb-author-stacked-layout">
                                    {hasAuthorForStacked && showAuthorPicture && (
                                        <div className="eb-author-picture">
                                            {authorPictureLink ? (
                                                <a href={getAuthorUrl()}>
                                                    <img
                                                        src={getAuthorAvatarUrl()}
                                                        alt={getAuthorName()}
                                                        className="eb-author-avatar"
                                                    />
                                                </a>
                                            ) : (
                                                <img
                                                    src={getAuthorAvatarUrl()}
                                                    alt={getAuthorName()}
                                                    className="eb-author-avatar"
                                                />
                                            )}
                                        </div>
                                    )}
                                    <div className="eb-author-meta-content">
                                        {enableContents.map(contentType => renderMetaItem(contentType)).filter(Boolean)}
                                    </div>
                                </div>
                            ) : (
                                // Inline layout: Render items in sorted order
                                enableContents.map(contentType => renderMetaItem(contentType)).filter(Boolean)
                            )}
                        </div>
                    </div>
                </div>
            </BlockProps.Edit>
        </>
    );
}

export default memo(
    compose([
        withSelect((select) => {
            const selectPostType = select("core/editor") ? select("core/editor").getCurrentPostType() : "";
            return {
                selectPostType: selectPostType,
            };
        }),
        withBlockContext(defaultAttributes)
    ])(Edit)
)
