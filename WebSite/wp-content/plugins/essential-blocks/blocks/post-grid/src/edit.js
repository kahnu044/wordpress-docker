/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useEffect, useState } from "@wordpress/element";
import { useBlockProps } from "@wordpress/block-editor";
import { select } from "@wordpress/data";
import { doAction, applyFilters } from "@wordpress/hooks";
import { dateI18n, format, __experimentalGetSettings } from "@wordpress/date";

/**
 * Externnal depencencies
 */
import parse from "html-react-parser";

/**
 * Internal depencencies
 */
import classnames from "classnames";

import Inspector from "./inspector";
import Style from "./style";

const {
    duplicateBlockIdFix,
    ebJsonStringCheck,
    CustomQuery,
} = window.EBControls;

export default function Edit(props) {
    const {
        attributes,
        setAttributes,
        className,
        clientId,
        isSelected,
    } = props;
    const {
        blockId,
        blockMeta,
        // responsive control attribute ⬇
        resOption,
        preset,
        queryData,
        queryResults,
        loadMoreOptions,
        showThumbnail,
        thumbnailSize,
        showTitle,
        titleLength,
        titleTag,
        showContent,
        contentLength,
        expansionIndicator,
        showReadMore,
        readmoreText,
        showMeta,
        headerMeta,
        footerMeta,
        authorPrefix,
        datePrefix,
        showTaxonomyFilter,
        selectedTaxonomy,
        selectedTaxonomyItems,
        classHook,
    } = attributes;

    const dateFormat = __experimentalGetSettings().formats.date;

    // this useEffect is for creating a unique id for each block's unique className by a random unique number
    useEffect(() => {
        const BLOCK_PREFIX = "eb-post-grid";
        duplicateBlockIdFix({
            BLOCK_PREFIX,
            blockId,
            setAttributes,
            select,
            clientId,
        });
    }, []);

    const blockProps = useBlockProps({
        className: classnames(className),
    });

    const paginationLinks = (options, perPage) => {
        const totalPages = Math.floor(options.totalPosts / perPage);
        let html = "";
        html += `<button class="ebpg-pagination-item-previous">${options.prevTxt}</button>`;
        for (let i = 1; i <= totalPages; i++) {
            if (i === 1) {
                html += `<button class="ebpg-pagination-item active">${i}</button>`;
            } else if (i <= 3) {
                html += `<button class="ebpg-pagination-item">${i}</button>`;
            } else if (i === totalPages) {
                html +=
                    '<button class="ebpg-pagination-item-separator">...</button>';
                html += `<button class="ebpg-pagination-item">${i}</button>`;
            } else {
                html += "";
            }
        }
        html += `<button class="ebpg-pagination-item-next">${options.nextTxt}</button>`;
        return html;
    };

    const thumbnailImageUrl = (media) => {
        if (!thumbnailSize) {
            return media.source_url;
        } else if (media?.media_details?.sizes) {
            const sizes = media.media_details.sizes;
            if (sizes[thumbnailSize] && sizes[thumbnailSize].source_url) {
                return sizes[thumbnailSize].source_url;
            } else {
                return media.source_url;
            }
        }
    };

    const ebReadingTime = (text) => {
        if (!text) {
            return 0;
        }
        const wpm = 200;
        text = text.replace(/(<([^>]+)>)/gi, "");
        const words = text.trim().split(/\s+/).length;
        const time = Math.ceil(words / wpm);
        return time;
    };

    //Filter by Category
    // const [categoryList, setCategoryList] = useState({ all: "All" });
    // useEffect(() => {
    //     if (typeof queryResults === "object" && queryResults.length > 0) {
    //         const catArray = { ...categoryList };
    //         queryResults.map((post, index) => {
    //             post._embedded && post._embedded["wp:term"] &&
    //                 post._embedded["wp:term"].length > 0 &&
    //                 post._embedded["wp:term"].map((item) => {
    //                     if (item[0]?.taxonomy === "category") {
    //                         catArray[item[0].slug] = item[0].name;
    //                     }
    //                 });
    //         });
    //         setCategoryList(catArray);
    //     }
    // }, [queryResults]);

    return (
        <>
            {isSelected && <Inspector {...props} />}
            <CustomQuery
                isEdit={true}
                attributes={attributes}
                setAttributes={setAttributes}
            />

            <div {...blockProps}>
                <Style {...props} />

                <div
                    className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`}
                >
                    <div
                        className={`eb-post-grid-wrapper ${blockId} ${preset}`}
                        data-id={blockId}
                    >
                        {showTaxonomyFilter && (
                            <div className="eb-post-grid-category-filter">
                                <ul className="ebpg-category-filter-list">
                                    {JSON.parse(selectedTaxonomyItems).length >
                                        0 &&
                                        JSON.parse(
                                            selectedTaxonomyItems
                                        ).map((catItem, catIndex) => (
                                            <li
                                                className={`ebpg-category-filter-list-item ${catItem.value === "all"
                                                    ? "active"
                                                    : ""
                                                    }`}
                                            >
                                                {catItem.label}
                                            </li>
                                        ))}
                                </ul>
                            </div>
                        )}

                        {queryResults && typeof queryResults === "object" &&
                            queryResults.length > 0 &&
                            queryResults.map((post, index) => {
                                // console.log("queryResults", queryResults)
                                //Generate Featured Image
                                const {
                                    featuredImageInfo: {
                                        url: imageSourceUrl,
                                        alt: featuredImageAlt,
                                    } = {},
                                } = post;
                                const featuredImage = showThumbnail && (
                                    <img
                                        key={index}
                                        src={imageSourceUrl}
                                        alt={featuredImageAlt}
                                    />
                                );

                                //Generate Title
                                const title = post?.title?.rendered;
                                const titleWithLimitWords =
                                    titleLength >= 0
                                        ? title
                                            .trim()
                                            .split(" ", titleLength)
                                            .join(" ")
                                        : title;
                                const titleHTML = `
								<${titleTag} class="ebpg-entry-title">
									<a class="ebpg-grid-post-link" href="javascript:void(0)" title="">
										${titleWithLimitWords}
									</a>
								</${titleTag}>
							`;

                                //Generate Excerpt & Read More
                                let excerpt = post?.excerpt?.rendered;
                                const excerptElement = document.createElement(
                                    "div"
                                );
                                excerptElement.innerHTML = excerpt
                                    ? excerpt
                                    : "";
                                excerpt =
                                    excerptElement.textContent ||
                                    excerptElement.innerText ||
                                    "";
                                const excerptWithLimitWords =
                                    contentLength >= 0
                                        ? excerpt
                                            .trim()
                                            .split(" ", contentLength)
                                            .join(" ")
                                        : excerpt;

                                const avatarUrl = (author) => {
                                    if (author.avatar_urls && author.avatar_urls[96]) {
                                        return author.avatar_urls[96];
                                    }
                                    else {
                                        return "http://1.gravatar.com/avatar/467ceabf70aaa0e555b7dd11c9729241?s=96&d=mm&r=g";
                                    }
                                }
                                const avatar = post?._embedded?.author ? (
                                    <div className="ebpg-author-avatar">
                                        <a href={post._embedded.author[0].link}>
                                            <img
                                                alt={
                                                    post._embedded.author[0].name
                                                        ? post._embedded.author[0].name
                                                        : post._embedded.author[0].slug
                                                }
                                                src={avatarUrl(post._embedded.author[0])}
                                            />
                                        </a>
                                    </div>
                                ) : "";
                                const date = (
                                    <span className="ebpg-posted-on">
                                        {datePrefix + " "}
                                        <time
                                            dateTime={format(
                                                "c",
                                                post.date_gmt
                                            )}
                                        >
                                            {dateI18n(
                                                dateFormat,
                                                post.date_gmt
                                            )}
                                        </time>
                                    </span>
                                );
                                const author = post?._embedded?.author ? (
                                    <span className="ebpg-posted-by">
                                        {authorPrefix + " "}
                                        <a
                                            href={post._embedded.author[0].link}
                                            title={
                                                post._embedded.author[0].name
                                                    ? post._embedded.author[0]
                                                        .name
                                                    : post._embedded.author[0]
                                                        .slug
                                            }
                                            rel="author"
                                        >
                                            {post._embedded.author[0].name
                                                ? post._embedded.author[0].name
                                                : post._embedded.author[0].slug}
                                        </a>
                                    </span>
                                ) : (
                                    ""
                                );

                                const postTermsVal = {};
                                post._embedded && post._embedded["wp:term"] &&
                                    post._embedded["wp:term"].length > 0 &&
                                    post._embedded["wp:term"].map((item) => {
                                        let termObj = {};
                                        let termName = "";
                                        item.length > 0 &&
                                            item.map((term) => {
                                                termName = term.taxonomy;
                                                termObj[term.slug] = {
                                                    name: term.name,
                                                    id: term.id,
                                                    link: term.link,
                                                    slug: term.slug,
                                                };
                                            });
                                        postTermsVal[termName] = termObj;
                                    });

                                const postTermsHtml = {};
                                if (Object.keys(postTermsVal).length > 0) {
                                    Object.keys(postTermsVal).map((term) => {
                                        let termClass = term;
                                        if (term === "category") {
                                            termClass = "categories";
                                        } else if (term === "post_tag") {
                                            termClass = "tags";
                                        }
                                        let markup = `<div className="ebpg-meta ebpg-${termClass}-meta">`;
                                        Object.keys(postTermsVal[term]).length >
                                            0 &&
                                            Object.keys(postTermsVal[term]).map(
                                                (item, index) => {
                                                    markup += `
											<a
												key=${index}
												href=${postTermsVal[term][item].link}
												title=${postTermsVal[term][item].name}
											>
												${postTermsVal[term][item].name}
											</a>
										`;
                                                }
                                            );
                                        markup += `</div>`;
                                        postTermsHtml[term] = markup;
                                    });
                                }

                                const categories = postTermsVal.category ? (
                                    <div className="ebpg-meta ebpg-categories-meta">
                                        {Object.keys(postTermsVal.category).map(
                                            (item, index) => (
                                                <a
                                                    key={index}
                                                    href={
                                                        postTermsVal.category[
                                                            item
                                                        ].link
                                                    }
                                                    title={
                                                        postTermsVal.category[
                                                            item
                                                        ].name
                                                    }
                                                >
                                                    {
                                                        postTermsVal.category[
                                                            item
                                                        ].name
                                                    }
                                                </a>
                                            )
                                        )}
                                    </div>
                                ) : (
                                    ""
                                );

                                const tags = postTermsVal.post_tag ? (
                                    <div className="ebpg-meta ebpg-tags-meta">
                                        {Object.keys(postTermsVal.post_tag).map(
                                            (item) => (
                                                <a
                                                    href={
                                                        postTermsVal.post_tag[
                                                            item
                                                        ].link
                                                    }
                                                    title={
                                                        postTermsVal.post_tag[
                                                            item
                                                        ].name
                                                    }
                                                >
                                                    {
                                                        postTermsVal.post_tag[
                                                            item
                                                        ].name
                                                    }
                                                </a>
                                            )
                                        )}
                                    </div>
                                ) : (
                                    ""
                                );

                                const calcTime = ebReadingTime(
                                    post?.content?.rendered
                                );
                                const readtime = (
                                    <span className="ebpg-read-time">
                                        <i className={"fas fa-clock"}></i>
                                        {`${calcTime} ${calcTime > 1 ? "minutes" : "minute"
                                            } read`}
                                    </span>
                                );

                                const metaObject = {
                                    date,
                                    author,
                                    categories,
                                    tags,
                                    readtime,
                                };

                                const headerMetaItems = ebJsonStringCheck(headerMeta) ?
                                    JSON.parse(headerMeta).map((item) => item.value) :
                                    [];

                                const headerMetaHtml = showMeta ? (
                                    <div className="ebpg-entry-meta ebpg-header-meta">
                                        {headerMetaItems.includes("avatar") && avatar}
                                        <div className="ebpg-entry-meta-items">
                                            {headerMetaItems.map((item) => {
                                                if (metaObject.hasOwnProperty(item )) {
                                                    return metaObject[item];
                                                }
                                                else if ( postTermsHtml.hasOwnProperty( item ) ) {
                                                    return parse( postTermsHtml[item] );
                                                }
                                                else {
                                                    if (item ==='avatar') {
                                                        return
                                                    }
                                                    return applyFilters('essential_blocks_post_grid_dynamic_fields_markup', '', item)
                                                }
                                            })}
                                        </div>
                                    </div>
                                ) : (
                                    ""
                                );

                                const footerMetaItems = ebJsonStringCheck(
                                    footerMeta
                                )
                                    ? JSON.parse(footerMeta).map(
                                        (item) => item.value
                                    )
                                    : [];
                                const footerMetaHtml = showMeta ? (
                                    <div className="ebpg-entry-meta ebpg-footer-meta">
                                        {footerMetaItems.includes("avatar") && avatar}
                                        <div className="ebpg-entry-meta-items">
                                            {footerMetaItems.map((item) => {
                                                if (metaObject.hasOwnProperty(item)) {
                                                    return metaObject[item];
                                                }
                                                else if ( postTermsHtml.hasOwnProperty(item)) {
                                                    return parse(postTermsHtml[item]);
                                                }
                                                else {
                                                    if (item ==='avatar') {
                                                        return
                                                    }
                                                    return applyFilters('essential_blocks_post_grid_dynamic_fields_markup', '', item)
                                                }
                                            })}
                                        </div>
                                    </div>
                                ) : (
                                    ""
                                );

                                return (
                                    <article
                                        className="ebpg-grid-post ebpg-post-grid-column"
                                        data-id={post.id}
                                    >
                                        <div className="ebpg-grid-post-holder">
                                            {preset === "style-5" && (
                                                <a
                                                    className="ebpg-post-link-wrapper"
                                                    href="javascript:void(0)"
                                                ></a>
                                            )}
                                            <div className="ebpg-entry-media">
                                                {showThumbnail && (
                                                    <div className="ebpg-entry-thumbnail">
                                                        {preset !==
                                                            "style-5" && (
                                                                <a
                                                                    className="ebpg-post-link-wrapper"
                                                                    href="javascript:void(0)"
                                                                ></a>
                                                            )}
                                                        {post._embedded && post._embedded[
                                                            "wp:featuredmedia"
                                                        ] &&
                                                            post._embedded[
                                                                "wp:featuredmedia"
                                                            ].length > 0 && (
                                                                <img
                                                                    src={thumbnailImageUrl(
                                                                        post
                                                                            ._embedded[
                                                                        "wp:featuredmedia"
                                                                        ][0]
                                                                    )}
                                                                    alt={
                                                                        post?.title?.alt_text
                                                                    }
                                                                />
                                                            )}
                                                        {post._embedded && !post._embedded[
                                                            "wp:featuredmedia"
                                                        ] && (
                                                                <img
                                                                    src="https://via.placeholder.com/250x250.png"
                                                                    alt="No Thumbnail Available"
                                                                />
                                                            )}
                                                    </div>
                                                )}
                                            </div>

                                            <div className="ebpg-entry-wrapper">
                                                {showTitle && (
                                                    <header
                                                        className="ebpg-entry-header"
                                                        dangerouslySetInnerHTML={{
                                                            __html: titleHTML,
                                                        }}
                                                    ></header>
                                                )}

                                                {/* Header Meta */}
                                                {showMeta && headerMetaHtml}

                                                <div className="ebpg-entry-content">
                                                    {showContent && (
                                                        <div className="ebpg-grid-post-excerpt">
                                                            <p>
                                                                {
                                                                    excerptWithLimitWords
                                                                }
                                                                {__(
                                                                    expansionIndicator
                                                                )}
                                                            </p>
                                                        </div>
                                                    )}
                                                    {showReadMore && (
                                                        <div className="ebpg-readmore-btn">
                                                            <a href={post.link}>
                                                                {__(
                                                                    readmoreText
                                                                )}
                                                            </a>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Footer Meta */}
                                                {showMeta && footerMetaHtml}
                                            </div>
                                        </div>
                                    </article>
                                );
                            })}
                        {typeof queryResults != "undefined" &&
                            queryResults.length < 1 && <p>No Posts Found</p>}

                        {/* Pagination */}
                        {typeof queryResults != "undefined" &&
                            queryResults.length > 0 &&
                            typeof loadMoreOptions != "undefined" &&
                            loadMoreOptions.enableMorePosts && (
                                <div
                                    className={`ebpg-pagination ${loadMoreOptions.loadMoreType === "3"
                                        ? "prev-next-btn"
                                        : ""
                                        }`}
                                >
                                    {loadMoreOptions.loadMoreType === "1" && (
                                        <button className="btn ebpg-pagination-button">
                                            {loadMoreOptions.loadMoreButtonTxt}
                                        </button>
                                    )}
                                    {(loadMoreOptions.loadMoreType === "2" ||
                                        loadMoreOptions.loadMoreType ===
                                        "3") && (
                                            <div
                                                className="btn ebpg-pagination-page"
                                                dangerouslySetInnerHTML={{
                                                    __html: paginationLinks(
                                                        loadMoreOptions,
                                                        queryData.per_page
                                                    ),
                                                }}
                                            ></div>
                                        )}
                                </div>
                            )}
                    </div>
                </div>
            </div>
        </>
    );
}
