/*
 * WordPress dependencies
 */
import { RichText, useBlockProps } from "@wordpress/block-editor";

/*
 * Internal dependencies
 */
import List from "./list";

export default function save({ attributes }) {
    const {
        blockId,
        displayTitle,
        title,
        collapsible,
        initialCollapse,
        visibleHeaders,
        headers,
        isSmooth,
        scrollToTop,
        isSticky,
        hideOnMobile,
        topOffset,
        scrollTarget,
        stickyPosition = "left",
        enableCopyLink,
        deleteHeaderList,
        classHook,
    } = attributes;

    return (
        <div {...useBlockProps.save()}>
            {headers.length !== 0 ? (
                <div
                    className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`}
                >
                    <div
                        className={`${blockId} eb-toc-container${
                            isSticky ? ` eb-toc-sticky-${stickyPosition}` : ""
                        } ${
                            collapsible
                                ? "eb-toc-collapsible"
                                : "eb-toc-not-collapsible"
                        } ${
                            initialCollapse
                                ? "eb-toc-initially-collapsed"
                                : "eb-toc-initially-not-collapsed"
                        } ${
                            isSticky
                                ? "eb-toc-is-sticky"
                                : "eb-toc-is-not-sticky"
                        } ${
                            scrollToTop
                                ? "eb-toc-scrollToTop"
                                : "eb-toc-not-scrollToTop"
                        }    `}
                        data-scroll-top={scrollToTop}
                        data-collapsible={collapsible}
                        data-hide-mobile={hideOnMobile}
                        data-sticky={isSticky}
                        data-scroll-target={scrollTarget}
                        data-copy-link={enableCopyLink}
                    >
                        <div className="eb-toc-header">
                            {isSticky && (
                                <span
                                    className={`eb-toc-close${
                                        isSticky
                                            ? ` eb-toc-sticky-${stickyPosition}`
                                            : ""
                                    }`}
                                ></span>
                            )}

                            {displayTitle && (
                                <RichText.Content
                                    tagName="div"
                                    className="eb-toc-title"
                                    value={title}
                                />
                            )}
                        </div>
                        <div
                            className={`eb-toc-wrapper ${
                                collapsible && initialCollapse && !isSticky
                                    ? "hide-content"
                                    : ""
                            }  `}
                            data-headers={JSON.stringify(headers)}
                            data-visible={JSON.stringify(visibleHeaders)}
                            data-delete-headers={JSON.stringify(
                                deleteHeaderList
                            )}
                            data-smooth={isSmooth}
                            data-top-offset={topOffset ? topOffset : ""}
                        >
                            <List attributes={attributes} />
                        </div>
                        {isSticky && (
                            <button
                                className={`eb-toc-button${
                                    isSticky
                                        ? ` eb-toc-button-${stickyPosition}`
                                        : ""
                                }`}
                            >
                                {displayTitle && (
                                    <RichText.Content
                                        tagName=""
                                        className=""
                                        value={title}
                                    />
                                )}
                            </button>
                        )}
                    </div>
                </div>
            ) : (
                <div></div>
            )}
        </div>
    );
}
