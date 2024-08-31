/**
 * WordPress dependencies
 */
import { useEffect, useState, memo } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { applyFilters } from "@wordpress/hooks";

import {
    WoocommerceQuery,
    BlockProps,
    BrowseTemplate,
    withBlockContext
 } from "@essential-blocks/controls";

/**
 * Internal dependencies
 */
import Style from "./style";
import Inspector from "./inspector";
import { ReactComponent as Icon } from "./icon.svg";
import { Templates } from './templates/templates';
import defaultAttributes from "./attributes";

const Edit = (props) => {
    const { attributes, setAttributes, className, clientId, isSelected } = props;
    const {
        blockId,
        queryData,
        layout,
        gridPreset,
        listPreset,
        saleBadgeAlign,
        saleText,
        showRating,
        showPrice,
        showSaleBadge,
        isCustomCartBtn,
        simpleCartText,
        variableCartText,
        groupedCartText,
        externalCartText,
        defaultCartText,
        productDescLength,
        loadMoreOptions,
        classHook,
        cover,
        ratingStyle,
        enableContents,
        showBlockContent
    } = attributes;

    const [queryResults, setQueryResults] = useState(false);
    const [didMount, setDidMount] = useState(false);

    const is_woocommerce_active = EssentialBlocksLocalize?.get_plugins["woocommerce/woocommerce.php"]?.active;
    const isContentEnabled = (contentName) => enableContents.includes(contentName);
    // you must declare this variable
    const enhancedProps = {
        ...props,
        blockPrefix: 'eb-woo-product',
        style: <Style {...props} isContentEnabled={isContentEnabled} />
    };
    // this useEffect is for creating an unique id for each block's unique className by a random unique number
    useEffect(() => {
        setTimeout(() => {
            setDidMount(true)
        }, 1500)
    }, []);

    const customCartButtonText = (productType) => {
        switch (productType) {
            case "external":
                return externalCartText;
            case "grouped":
                return groupedCartText;
            case "simple":
                return simpleCartText;
            case "variable":
                return variableCartText;
            default:
                return defaultCartText;
        }
    };

    const ratingHtml = (rating) => {
        let html = "";
        for (let i = 1;i <= 5;i++) {
            if (i <= rating) {
                html += `<span class="eb-woo-product-rating filled"><i class="fas fa-star"></i></span>`;
            } else {
                html += `<span class="eb-woo-product-rating"><i class="far fa-star"></i></span>`;
            }
        }
        return html;
    };

    const paginationLinks = (options, perPage) => {
        const totalPages = Math.floor(options.totalPosts / perPage);
        let html = "";
        html += `<button class="ebpg-pagination-item-previous">${options.prevTxt}</button>`;
        for (let i = 1;i <= totalPages;i++) {
            if (i === 1) {
                html += `<button class="ebpg-pagination-item active">${i}</button>`;
            } else if (i <= 3) {
                html += `<button class="ebpg-pagination-item">${i}</button>`;
            } else if (i === totalPages) {
                html += '<button class="ebpg-pagination-item-separator">...</button>';
                html += `<button class="ebpg-pagination-item">${i}</button>`;
            } else {
                html += "";
            }
        }
        html += `<button class="ebpg-pagination-item-next">${options.nextTxt}</button>`;
        return html;
    };

    const presetClass = "grid" === layout ? gridPreset : listPreset;


    return cover.length ? (
        <div>
            <img src={cover} alt="woo product grid" style={{ maxWidth: "100%" }} />
        </div>
    ) : (
        <>
            {isSelected && showBlockContent && <Inspector attributes={attributes} setAttributes={setAttributes} setQueryResults={setQueryResults} />}

            {showBlockContent && didMount === false && (
                <>
                    {queryResults === false && (
                        <div className="eb-loading">
                            <img src={`${EssentialBlocksLocalize?.image_url}/ajax-loader.gif`} alt="Loading..." />
                        </div>
                    )}
                    <WoocommerceQuery
                        isEdit={true}
                        title={"Product Query"}
                        initialOpen={false}
                        queryData={queryData}
                        setQueryResults={setQueryResults}
                        setAttributes={setAttributes}
                    />
                </>
            )}

            <BlockProps.Edit {...enhancedProps}>
                {!is_woocommerce_active && (
                    <div>
                        <strong>WooCommerce</strong> is not installed/activated on your site. Please install and
                        activate{" "}
                        <a
                            href={
                                EssentialBlocksLocalize.eb_admin_url +
                                `plugin-install.php?s=woocommerce&tab=search&type=term`
                            }
                            target="_blank"
                        >
                            WooCommerce
                        </a>{" "}
                        first.
                    </div>
                )}
                {is_woocommerce_active && (
                    <>
                        <Style {...props} isContentEnabled={isContentEnabled} />
                        <BrowseTemplate
                            {...props}
                            Icon={Icon}
                            title={"Woo Product Grid"}
                            description={"Choose a template for the Woo Product Grid or start blank."}
                            patterns={Templates}
                        />

                        {showBlockContent && (
                            <>
                                <div
                                    className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`}
                                >
                                    {queryResults !== false && (
                                        <div
                                            className={`eb-woo-products-wrapper ${blockId}`}
                                            data-id={blockId}
                                        >
                                            {applyFilters(
                                                "eb_woo_product_grid_pro_taxonomy_filter_html",
                                                "",
                                                attributes,
                                                setAttributes
                                            )}
                                            <div
                                                className={`eb-woo-products-gallery ${presetClass}`}
                                            >
                                                {typeof queryResults === "object" &&
                                                    queryResults.length > 0 &&
                                                    queryResults.map((item, index) => (
                                                        <>
                                                            <div
                                                                className="eb-woo-products-col"
                                                                key={index}
                                                            >
                                                                <div className="eb-woo-product">
                                                                    <div className="eb-woo-product-image-wrapper">
                                                                        <div className="eb-woo-product-image">
                                                                            {item.image ? (
                                                                                <a href="#">
                                                                                    <img
                                                                                        src={
                                                                                            item
                                                                                                .image[
                                                                                            "large"
                                                                                            ]
                                                                                        }
                                                                                    />
                                                                                </a>
                                                                            ) : (
                                                                                <a href="#">
                                                                                    <img
                                                                                        src={
                                                                                            EssentialBlocksLocalize?.placeholder_image
                                                                                        }
                                                                                        alt="No preview available"
                                                                                    />
                                                                                </a>
                                                                            )}
                                                                            {showSaleBadge &&
                                                                                item.sale && (
                                                                                    <span
                                                                                        className={`eb-woo-product-ribbon ${saleBadgeAlign}`}
                                                                                    >
                                                                                        {
                                                                                            saleText
                                                                                        }
                                                                                    </span>
                                                                                )}
                                                                        </div>
                                                                        {layout ===
                                                                            "grid" && (
                                                                                <div className="eb-woo-product-overlay">
                                                                                    <div className="eb-woo-product-button-list">
                                                                                        <a className="eb-woo-product-button button">
                                                                                            {isCustomCartBtn
                                                                                                ? customCartButtonText(
                                                                                                    item.type
                                                                                                )
                                                                                                : item.add_to_cart_text}
                                                                                        </a>
                                                                                    </div>
                                                                                </div>
                                                                            )}
                                                                    </div>
                                                                    {layout === "grid" && (
                                                                        <div
                                                                            className="eb-woo-product-content-wrapper"
                                                                            data-rating={Math.round(
                                                                                item.rating_average
                                                                            )}
                                                                        >
                                                                            <div className="eb-woo-product-content">
                                                                                {showRating &&
                                                                                    item.rating_average &&
                                                                                    "star" ===
                                                                                    ratingStyle && (
                                                                                        <div
                                                                                            className="eb-woo-product-rating-wrapper"
                                                                                            dangerouslySetInnerHTML={{
                                                                                                __html: ratingHtml(
                                                                                                    parseInt(
                                                                                                        item.rating_average
                                                                                                    )
                                                                                                ),
                                                                                            }}
                                                                                        ></div>
                                                                                    )}
                                                                                {showRating &&
                                                                                    item.rating_average &&
                                                                                    "number" ===
                                                                                    ratingStyle && (
                                                                                        <div className="eb-woo-product-rating-wrapper">
                                                                                            <span class="eb-woo-product-rating filled">
                                                                                                <i class="fas fa-star"></i>{" "}
                                                                                                {
                                                                                                    item.rating_average
                                                                                                }
                                                                                            </span>
                                                                                        </div>
                                                                                    )}
                                                                                <h3
                                                                                    className="eb-woo-product-title"
                                                                                    dangerouslySetInnerHTML={{
                                                                                        __html:
                                                                                            item.title,
                                                                                    }}
                                                                                ></h3>
                                                                                {showPrice && (
                                                                                    <p
                                                                                        className="eb-woo-product-price"
                                                                                        dangerouslySetInnerHTML={{
                                                                                            __html:
                                                                                                item.price_html,
                                                                                        }}
                                                                                    ></p>
                                                                                )}
                                                                                {applyFilters(
                                                                                    "eb_woo_product_grid_pro_sold_count_html",
                                                                                    "",
                                                                                    attributes,
                                                                                    setAttributes,
                                                                                    item
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    )}

                                                                    {layout === "list" && (
                                                                        <div
                                                                            className="eb-woo-product-content-wrapper"
                                                                            data-rating={Math.round(
                                                                                item.rating_average
                                                                            )}
                                                                        >
                                                                            <div className="eb-woo-product-content">
                                                                                <h3
                                                                                    className="eb-woo-product-title"
                                                                                    dangerouslySetInnerHTML={{
                                                                                        __html:
                                                                                            item.title,
                                                                                    }}
                                                                                ></h3>
                                                                                {showPrice && (
                                                                                    <p
                                                                                        className="eb-woo-product-price"
                                                                                        dangerouslySetInnerHTML={{
                                                                                            __html:
                                                                                                item.price_html,
                                                                                        }}
                                                                                    ></p>
                                                                                )}
                                                                                {showRating &&
                                                                                    item.rating_average &&
                                                                                    "star" ===
                                                                                    ratingStyle && (
                                                                                        <div
                                                                                            className="eb-woo-product-rating-wrapper"
                                                                                            dangerouslySetInnerHTML={{
                                                                                                __html: ratingHtml(
                                                                                                    parseInt(
                                                                                                        item.rating_average
                                                                                                    )
                                                                                                ),
                                                                                            }}
                                                                                        ></div>
                                                                                    )}
                                                                                {showRating &&
                                                                                    item.rating_average &&
                                                                                    "number" ===
                                                                                    ratingStyle && (
                                                                                        <div className="eb-woo-product-rating-wrapper">
                                                                                            <span class="eb-woo-product-rating filled">
                                                                                                <i class="fas fa-star"></i>{" "}
                                                                                                {
                                                                                                    item.rating_average
                                                                                                }
                                                                                            </span>
                                                                                        </div>
                                                                                    )}
                                                                                {applyFilters(
                                                                                    "eb_woo_product_grid_pro_sold_count_html",
                                                                                    "",
                                                                                    attributes,
                                                                                    setAttributes,
                                                                                    item
                                                                                )}
                                                                                <p className="eb-woo-product-details">
                                                                                    {/* {item.excerpt.substring(0, 65)} */}
                                                                                    {item.excerpt
                                                                                        .split(
                                                                                            " "
                                                                                        )
                                                                                        .slice(
                                                                                            0,
                                                                                            Math.abs(
                                                                                                parseInt(
                                                                                                    productDescLength
                                                                                                )
                                                                                            )
                                                                                        )
                                                                                        .join(
                                                                                            " "
                                                                                        )}
                                                                                </p>
                                                                                <div className="eb-woo-product-button-list">
                                                                                    <a className="eb-woo-product-button button">
                                                                                        {isCustomCartBtn
                                                                                            ? customCartButtonText(
                                                                                                item.type
                                                                                            )
                                                                                            : item.add_to_cart_text}
                                                                                    </a>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </>
                                                    ))}
                                                {typeof queryResults === "object" && queryResults.length <= 0 && (
                                                    <>
                                                        <p>{__("No product found", "essential-blocks")}</p>
                                                    </>
                                                )}
                                            </div>
                                            {/* Pagination */}
                                            {typeof queryResults != "undefined" &&
                                                queryResults.length > 0 &&
                                                typeof loadMoreOptions != "undefined" &&
                                                loadMoreOptions.enableMorePosts && (
                                                    <div
                                                        className={`ebpg-pagination ${loadMoreOptions.loadMoreType ===
                                                            "3"
                                                            ? "prev-next-btn"
                                                            : ""
                                                            }`}
                                                    >
                                                        {loadMoreOptions.loadMoreType ===
                                                            "1" && (
                                                                <button className="btn ebpg-pagination-button">
                                                                    {
                                                                        loadMoreOptions.loadMoreButtonTxt
                                                                    }
                                                                </button>
                                                            )}
                                                        {(loadMoreOptions.loadMoreType ===
                                                            "2" ||
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
                                    )}

                                </div>
                            </>
                        )}
                    </>
                )}
            </BlockProps.Edit>
        </>
    );
}

export default memo(withBlockContext(defaultAttributes)(Edit))