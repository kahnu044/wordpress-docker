import {
    sanitizeURL, BlockProps, EBButton, EBDisplayIcon
} from "@essential-blocks/controls";
import { applyFilters } from "@wordpress/hooks";

import {
    LOADMORE_KEYS
} from "./constants";
import { NotFoundImg, gridGapCal } from './helpers';

const Save = ({ attributes }) => {
    const {
        blockId,
        layouts,
        sources,
        displayCaption,
        captionOnHover,
        styleNumber,
        overlayStyle,
        horizontalAlign,
        verticalAlign,
        disableLightBox,
        classHook,
        filterItems,
        enableFilter,
        enableFilterAll,
        filterAllTitle,
        addCustomLink,
        defaultFilter,
        enableIsotope,
        enableLoadMore,
        loadmoreBtnText,
        imagesPerPageCount,
        enableInfiniteScroll,
        presets,
        displayDescription,
        lightboxIcon,
        linkIcon,
        enableSearch,
        unevenWidth,
        columnsRange,
        notFoundText,
        version,
        showBlockContent,
        disableIsotope
    } = attributes;

    if (!showBlockContent) {
        return
    }

    if (sources.length === 0) return null;

    let lightBoxHtml = {
        rel: "noopener",
    };
    if (!disableLightBox) {
        lightBoxHtml = {
            ...lightBoxHtml,
            ["data-fslightbox"]: "gallery",
            ["data-type"]: "image",
        };
    }

    let buttonData = {
        imagesPerPage: imagesPerPageCount,
        loadmore: enableLoadMore,
        infiniteScroll: enableInfiniteScroll,
    }

    const wideClass = (index) => {
        const isWide = columnsRange === 3
            ? (index + 1) % 4 === 0 || (index + 1) % 7 === 0
            : index % 3 === 0;

        return isWide ? "wide" : "";
    }

    return (
        <BlockProps.Save attributes={attributes}>
            <div className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`}>
                {enableFilter && !enableSearch && (
                    <ul
                        className={`eb-img-gallery-filter-wrapper filter-wrapper-${blockId} ${presets}`}
                        data-id={blockId}
                    >
                        {enableFilterAll && (
                            <li
                                className="eb-img-gallery-filter-item"
                                data-filter={"*"}
                                data-id={blockId}
                            >
                                {filterAllTitle !== "" ? filterAllTitle : __("All", "essential-blocks")}
                            </li>
                        )}
                        {filterItems.map(({ value, label }, index) => {
                            return (
                                <li
                                    key={index}
                                    className="eb-img-gallery-filter-item"
                                    data-filter={`.eb-filter-img-${value}`}
                                    data-id={blockId}
                                >
                                    {label}
                                </li>
                            );
                        })}
                    </ul>
                )}

                {enableFilter && enableSearch && (
                    applyFilters(
                        "eb_filterable_gallery_pro_search_html",
                        "",
                        attributes,
                    )
                )}
                <div
                    className={`eb-gallery-img-wrapper ${blockId} ${presets} ${version} ${layouts} ${layouts === 'masonry' & unevenWidth === true ? 'masonry-uneven' : null} ${disableIsotope ? 'no-isotope' : 'enable-isotope'} ${enableFilter ? "eb-filterable-img-gallery" : ""} ${enableLoadMore ? 'show-loadmore' : ''} ${presets === "default" ? `${overlayStyle} caption-style-${styleNumber} ${captionOnHover ? "caption-on-hover" : ""}` : ""} `}
                    data-id={blockId}
                    data-default-filter={defaultFilter}
                    data-searchFilter={enableFilter && enableSearch ? true : false}
                >
                    {layouts == 'masonry' && (
                        <div class="grid-sizer"></div>
                    )}
                    {sources.map((source, index) => {
                        let filters;

                        if (
                            source.hasOwnProperty("filter") &&
                            source?.filter?.length > 0
                        ) {
                            filters = JSON.parse(source.filter);

                            filters = filters.map((filter) => filter.value);

                            filters = filters.toString();

                            filters = filters.replaceAll(
                                ",",
                                " eb-filter-img-"
                            );
                        } else {
                            filters = "";
                        }

                        let innerHtml = (
                            <span className="eb-gallery-link-wrapper">
                                <img
                                    className="eb-gallery-img"
                                    src={source.url}
                                    image-index={index}
                                    alt={source.alt}
                                />
                                {displayCaption &&
                                    source.caption &&
                                    source.caption.length > 0 && (
                                        <>
                                            <span className={`eb-gallery-img-caption ${horizontalAlign} ${verticalAlign}`} dangerouslySetInnerHTML={{ __html: source.caption }}></span>
                                        </>
                                    )}
                            </span>
                        );
                        let innerHtmlV2 = (
                            <span className="eb-gallery-link-wrapper">
                                <img
                                    className="eb-gallery-img"
                                    src={source.url}
                                    image-index={index}
                                    alt={source.alt}
                                />

                                <span className={`eb-img-gallery-content ${horizontalAlign} ${verticalAlign}`}>
                                    {displayCaption &&
                                        source.caption &&
                                        source.caption.length > 0 && (
                                            <>
                                                <span className={`eb-gallery-img-caption`} dangerouslySetInnerHTML={{ __html: source.caption }}></span>
                                            </>
                                        )}
                                    {displayDescription &&
                                        source.content &&
                                        source.content.length >
                                        0 && (
                                            <>
                                                <span className={`eb-gallery-img-description`} dangerouslySetInnerHTML={{ __html: source.content }}></span>
                                            </>
                                        )}
                                </span>
                            </span>
                        );

                        index = index + 1;

                        const isGap = gridGapCal(index, columnsRange, sources);

                        return (
                            <>
                                {presets == 'default' && (
                                    <>
                                        {version === undefined && (
                                            <>
                                                {!addCustomLink && (
                                                    <a
                                                        key={index}
                                                        href={
                                                            !disableLightBox
                                                                ? source.url
                                                                : "javascript:void(0)"
                                                        }
                                                        {...lightBoxHtml}
                                                        className={`eb-gallery-img-content ${layouts == 'masonry' && unevenWidth ? wideClass(index) ? "wide" : "" : ''} eb-filter-img-${filters}`}

                                                    >
                                                        {innerHtml}
                                                    </a>
                                                )}
                                                {addCustomLink && (
                                                    <a
                                                        key={index}
                                                        href={
                                                            !disableLightBox
                                                                ? source.url
                                                                : addCustomLink &&
                                                                    source.customLink &&
                                                                    source.isValidUrl
                                                                    ? sanitizeURL(source.customLink)
                                                                    : "#"
                                                        }
                                                        {...lightBoxHtml}
                                                        target={
                                                            disableLightBox &&
                                                                addCustomLink &&
                                                                source.openNewTab
                                                                ? "_blank"
                                                                : "_self"
                                                        }
                                                        className={`eb-gallery-img-content ${layouts == 'masonry' && unevenWidth ? wideClass(index) ? "wide" : "" : ''} eb-filter-img-${filters}`}
                                                    >
                                                        {innerHtml}
                                                    </a>
                                                )}
                                            </>
                                        )}
                                        {version !== undefined && (
                                            <>
                                                {!addCustomLink && (
                                                    <a
                                                        key={index}
                                                        href={
                                                            !disableLightBox
                                                                ? source.url
                                                                : "javascript:void(0)"
                                                        }
                                                        {...lightBoxHtml}
                                                        className={`eb-gallery-img-content ${layouts == 'masonry' && unevenWidth ? wideClass(index) ? "wide" : "" : ''} eb-filter-img-${filters}`}

                                                    >
                                                        {innerHtmlV2}
                                                    </a>
                                                )}
                                                {addCustomLink && (
                                                    <a
                                                        key={index}
                                                        href={
                                                            !disableLightBox
                                                                ? source.url
                                                                : addCustomLink &&
                                                                    source.customLink &&
                                                                    source.isValidUrl
                                                                    ? sanitizeURL(source.customLink)
                                                                    : "#"
                                                        }
                                                        {...lightBoxHtml}
                                                        target={
                                                            disableLightBox &&
                                                                addCustomLink &&
                                                                source.openNewTab
                                                                ? "_blank"
                                                                : "_self"
                                                        }
                                                        className={`eb-gallery-img-content ${layouts == 'masonry' && unevenWidth ? wideClass(index) ? "wide" : "" : ''} eb-filter-img-${filters}`}
                                                    >
                                                        {innerHtmlV2}
                                                    </a>
                                                )}
                                            </>
                                        )}
                                    </>
                                )}
                                {presets !== 'default' && presets !== 'pro-preset-5' && presets !== 'pro-preset-6' && (
                                    <div
                                        key={index}
                                        data-type="image"
                                        className={`eb-gallery-img-content ${layouts == 'masonry' && unevenWidth ? wideClass(index) ? "wide" : "" : ''} eb-filter-img-${filters}`}
                                    >
                                        <div className={`eb-gallery-link-wrapper`}>
                                            {presets == 'preset-3' && (
                                                <div className="eb-gallery-img-container">
                                                    <img
                                                        className="eb-gallery-img"
                                                        src={source.url}
                                                        image-index={index}
                                                        alt={source.alt}
                                                    />

                                                    {(!disableLightBox || addCustomLink) && (
                                                        <div className="eb-img-gallery-actions">
                                                            {!disableLightBox && (
                                                                <a href={source.url} data-fslightbox="gallery" className="eb-img-gallery-action">
                                                                    <EBDisplayIcon icon={lightboxIcon} />
                                                                </a>
                                                            )}

                                                            {addCustomLink && (
                                                                <a href={source.customLink &&
                                                                    source.isValidUrl
                                                                    ? sanitizeURL(source.customLink)
                                                                    : "#"
                                                                } target={source.openNewTab
                                                                    ? "_blank"
                                                                    : "_self"
                                                                } rel="noopener" className="eb-img-gallery-action">
                                                                    <EBDisplayIcon icon={linkIcon} />
                                                                </a>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            )}

                                            {presets !== 'preset-3' && (
                                                <img
                                                    className="eb-gallery-img"
                                                    src={source.url}
                                                    image-index={index}
                                                    alt={source.alt}
                                                />
                                            )}
                                            <div className="eb-img-gallery-overlay">
                                                {presets !== 'preset-3' && (!disableLightBox || addCustomLink) && (
                                                    <div className="eb-img-gallery-actions">
                                                        {!disableLightBox && (
                                                            <a href={source.url} data-fslightbox="gallery" className="eb-img-gallery-action">
                                                                <EBDisplayIcon icon={lightboxIcon} />
                                                            </a>
                                                        )}

                                                        {addCustomLink && (
                                                            <a href={source.customLink &&
                                                                source.isValidUrl
                                                                ? sanitizeURL(source.customLink)
                                                                : "#"
                                                            } target={source.openNewTab
                                                                ? "_blank"
                                                                : "_self"
                                                            } rel="noopener" className="eb-img-gallery-action">
                                                                <EBDisplayIcon icon={linkIcon} />
                                                            </a>
                                                        )}
                                                    </div>
                                                )}

                                                {((displayCaption && source.caption) || (displayDescription && source.content)) && (
                                                    <div className="eb-img-gallery-content">
                                                        {displayCaption &&
                                                            source.caption &&
                                                            source.caption.length >
                                                            0 && (
                                                                <>
                                                                    <div className={`eb-gallery-img-caption`} dangerouslySetInnerHTML={{ __html: source.caption }}></div>
                                                                </>
                                                            )}
                                                        {displayDescription &&
                                                            source.content &&
                                                            source.content.length >
                                                            0 && (
                                                                <>
                                                                    <div className={`eb-gallery-img-description`} dangerouslySetInnerHTML={{ __html: source.content }}></div>
                                                                </>
                                                            )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {applyFilters(
                                    "eb_filterable_gallery_pro_presets_markup",
                                    "",
                                    attributes,
                                    source, index, filters, isGap
                                )}
                            </>
                        );
                    })}
                </div>

                {applyFilters(
                    "eb_filterable_gallery_pro_presets_popup",
                    "",
                    attributes,
                )}

                {enableFilter && notFoundText !== '' && (
                    <div id="eb-img-gallery-not-found">
                        <NotFoundImg />

                        <p>
                            {notFoundText}
                        </p>
                    </div>
                )}

                {enableLoadMore && (
                    <>
                        <EBButton.Content
                            attributes={attributes}
                            type="button"
                            btnWrapperClassName='eb-img-gallery-loadmore-container'
                            className={`eb-img-gallery-loadmore ${enableInfiniteScroll ? 'loadmore-disable' : ''}`}
                            buttonAttrProps={LOADMORE_KEYS}
                            buttonData={buttonData}
                            disable={false}
                            loadingIcon={enableInfiniteScroll ? true : false}
                        />
                    </>
                )}
            </div>
        </BlockProps.Save>
    );
};

export default Save;
