/**
 * WordPress dependencies
 */
import { useBlockProps } from "@wordpress/block-editor";
import { omit } from "lodash";
import { applyFilters } from "@wordpress/hooks";

import {
    sanitizeURL, BlockProps, EBButton, EBDisplayIcon
} from "@essential-blocks/controls";

import { NotFoundImg, gridGapCal } from './helpers';

import attributes from "./attributes";
import {
    LOADMORE_KEYS
} from "./constants";

const deprecated = [
    {
        attributes: omit({ ...attributes }, ['disableIsotope']),
        supports: {
            align: ["wide", "full"],
        },
        save: ({ attributes }) => {
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
                showBlockContent
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
                            className={`eb-gallery-img-wrapper ${blockId} ${presets} ${version} ${layouts} ${layouts === 'masonry' & unevenWidth === true ? 'masonry-uneven' : null} enable-isotope ${enableFilter ? "eb-filterable-img-gallery" : ""} ${enableLoadMore ? 'show-loadmore' : ''} ${presets === "default" ? `${overlayStyle} caption-style-${styleNumber} ${captionOnHover ? "caption-on-hover" : ""}` : ""} `}
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
        },
    },
    {
        attributes: omit({
            ...attributes,
            images: {
                type: "array",
                default: [],
            },
        }, ['cover']),
        supports: {
            align: ["wide", "full"],
        },
        save: ({ attributes }) => {
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
                showBlockContent
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
                            className={`eb-gallery-img-wrapper ${blockId} ${presets} ${version} ${layouts} ${layouts === 'masonry' & unevenWidth === true ? 'masonry-uneven' : null} enable-isotope ${enableFilter ? "eb-filterable-img-gallery" : ""} ${enableLoadMore ? 'show-loadmore' : ''} ${presets === "default" ? `${overlayStyle} caption-style-${styleNumber} ${captionOnHover ? "caption-on-hover" : ""}` : ""} `}
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
        },
    },
    {
        attributes: omit({ ...attributes }, ['version', 'displayDescription', 'presets', 'lightboxIcon', 'linkIcon', 'imageClickable', 'descriptionColor', 'descriptionBGColor', 'iconType', 'iconColor', 'iconHoverColor', 'iconWidth', 'iconSize', 'contentAlign', 'contentBGColor', 'maskColor', 'filterWrapperBGColor', 'enableSearch', 'unevenWidth', 'notFoundColor', 'notFoundText', 'enableEmptyGrid']),
        supports: {
            align: ["wide", "full"],
        },
        save: ({ attributes }) => {
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
                enableInfiniteScroll
            } = attributes;

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

            return (
                <BlockProps.Save attributes={attributes}>
                    <div
                        className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`}
                    >
                        {enableFilter && (
                            <ul
                                className={`eb-img-gallery-filter-wrapper filter-wrapper-${blockId}`}
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
                        <div
                            className={`eb-gallery-img-wrapper ${blockId} ${layouts} ${overlayStyle} caption-style-${styleNumber} ${captionOnHover ? "caption-on-hover" : ""
                                } ${enableFilter ? "eb-filterable-img-gallery" : ""} ${enableIsotope ? 'enable-isotope' : 'no-isotope'} ${enableLoadMore ? 'show-loadmore' : ''}`}
                            data-id={blockId}
                            data-default-filter={defaultFilter}
                        >
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

                                if (!addCustomLink) {
                                    return (
                                        <a
                                            key={index}
                                            href={
                                                !disableLightBox
                                                    ? source.url
                                                    : "javascript:void(0)"
                                            }
                                            {...lightBoxHtml}
                                            className={`eb-gallery-img-content eb-filter-img-${filters}`}

                                        >
                                            {innerHtml}
                                        </a>
                                    );
                                }

                                if (addCustomLink) {
                                    return (
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
                                            className={`eb-gallery-img-content eb-filter-img-${filters}`}
                                        >
                                            {innerHtml}
                                        </a>
                                    );
                                }
                            })}
                        </div>

                        {enableLoadMore && (
                            <>
                                <EBButton.Content
                                    attributes={attributes}
                                    type="button"
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
        },
    },
    {
        attributes: omit({ ...attributes }, ['enableInfiniteScroll', 'imagesPerPageCount']),
        migrate(attributes) {
            const { imagesPerPage } = attributes;
            const newAttributes = { ...attributes };
            delete newAttributes.imagesPerPage;

            return {
                ...newAttributes,
                imagesPerPageCount: imagesPerPage,
            };
        },
        supports: {
            align: ["wide", "full"],
        },
        save: ({ attributes }) => {
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
                imagesPerPage,
            } = attributes;

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

            return (
                <div {...useBlockProps.save()}>
                    <div
                        className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`}
                    >
                        {enableFilter && (
                            <ul
                                className={`eb-img-gallery-filter-wrapper filter-wrapper-${blockId}`}
                                data-id={blockId}
                            >
                                {enableFilterAll && (
                                    <li
                                        className="eb-img-gallery-filter-item"
                                        data-filter={"*"}
                                        data-id={blockId}
                                    >
                                        {filterAllTitle !== "" ? filterAllTitle : "All"}
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
                        <div
                            className={`eb-gallery-img-wrapper ${blockId} ${layouts} ${overlayStyle} caption-style-${styleNumber} ${captionOnHover ? "caption-on-hover" : ""
                                } ${enableFilter ? "eb-filterable-img-gallery" : ""} ${enableIsotope ? 'enable-isotope' : 'no-isotope'} ${enableLoadMore ? 'show-loadmore' : ''}`}
                            data-id={blockId}
                            data-default-filter={defaultFilter}
                        >
                            {sources.map((source, index) => {
                                let filters;

                                if (
                                    source.hasOwnProperty("filter") &&
                                    source.filter.length > 0
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
                                                <span
                                                    className={`eb-gallery-img-caption ${horizontalAlign} ${verticalAlign}`}
                                                >
                                                    {source.caption}
                                                </span>
                                            )}
                                    </span>
                                );

                                if (!addCustomLink) {
                                    return (
                                        <a
                                            key={index}
                                            href={
                                                !disableLightBox
                                                    ? source.url
                                                    : "javascript:void(0)"
                                            }
                                            {...lightBoxHtml}
                                            className={`eb-gallery-img-content eb-filter-img-${filters}`}

                                        >
                                            {innerHtml}
                                        </a>
                                    );
                                }

                                if (addCustomLink) {
                                    return (
                                        <a
                                            key={index}
                                            href={
                                                !disableLightBox
                                                    ? source.url
                                                    : addCustomLink &&
                                                        source.customLink &&
                                                        source.isValidUrl
                                                        ? source.customLink
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
                                            className={`eb-gallery-img-content eb-filter-img-${filters}`}
                                        >
                                            {innerHtml}
                                        </a>
                                    );
                                }
                            })}
                        </div>

                        {enableLoadMore && (
                            <button data-images-per-page={imagesPerPage} data-loadmore={enableLoadMore} className="eb-img-gallery-loadmore">{loadmoreBtnText}</button>
                        )}
                    </div>
                </div>
            );
        },
    },
    {
        attributes: { ...attributes },
        supports: {
            align: ["wide", "full"],
        },
        save: ({ attributes }) => {
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
                imagesPerPage,
            } = attributes;

            if (sources.length === 0) return null;

            let lightBoxHtml = {
                id: "eb-gallery-img-content",
            };
            if (!disableLightBox) {
                lightBoxHtml = {
                    ...lightBoxHtml,
                    ["data-fslightbox"]: "gallery",
                    ["data-type"]: "image",
                };
            }

            return (
                <div {...useBlockProps.save()}>
                    <div
                        className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`}
                    >
                        {enableFilter && (
                            <ul
                                className={`eb-img-gallery-filter-wrapper filter-wrapper-${blockId}`}
                                data-id={blockId}
                            >
                                {enableFilterAll && (
                                    <li
                                        className="eb-img-gallery-filter-item"
                                        data-filter={"*"}
                                        data-id={blockId}
                                    >
                                        {filterAllTitle !== "" ? filterAllTitle : "All"}
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
                        <div
                            className={`eb-gallery-img-wrapper ${blockId} ${layouts} ${overlayStyle} caption-style-${styleNumber} ${captionOnHover ? "caption-on-hover" : ""
                                } ${enableFilter ? "eb-filterable-img-gallery" : ""} ${enableIsotope ? 'enable-isotope' : 'no-isotope'} ${enableLoadMore ? 'show-loadmore' : ''}`}
                            data-id={blockId}
                            data-default-filter={defaultFilter}
                        >
                            {sources.map((source, index) => {
                                let filters;

                                if (
                                    source.hasOwnProperty("filter") &&
                                    source.filter.length > 0
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
                                                <span
                                                    className={`eb-gallery-img-caption ${horizontalAlign} ${verticalAlign}`}
                                                >
                                                    {source.caption}
                                                </span>
                                            )}
                                    </span>
                                );

                                if (!addCustomLink) {
                                    return (
                                        <a
                                            key={index}
                                            href={
                                                !disableLightBox
                                                    ? source.url
                                                    : "javascript:void(0)"
                                            }
                                            {...lightBoxHtml}
                                            className={`eb-gallery-img-content eb-filter-img-${filters}`}
                                            rel="noopener"
                                        >
                                            {innerHtml}
                                        </a>
                                    );
                                }

                                if (addCustomLink) {
                                    return (
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
                                            className={`eb-gallery-img-content eb-filter-img-${filters}`}
                                            rel="noopener"
                                        >
                                            {innerHtml}
                                        </a>
                                    );
                                }
                            })}
                        </div>

                        {enableLoadMore && (
                            <button data-images-per-page={imagesPerPage} data-loadmore={enableLoadMore} className="eb-img-gallery-loadmore">{loadmoreBtnText}</button>
                        )}
                    </div>
                </div>
            );
        },
    },
    {
        attributes: omit({ ...attributes }, ["enableLoadmore", "loadmoreBtnText", "enableIsotope"]),
        supports: {
            align: ["wide", "full"],
        },
        save: ({ attributes }) => {
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
            } = attributes;

            if (sources.length === 0) return null;

            let lightBoxHtml = {
                id: "eb-gallery-img-content",
            };
            if (!disableLightBox) {
                lightBoxHtml = {
                    ...lightBoxHtml,
                    ["data-fslightbox"]: "gallery",
                    ["data-type"]: "image",
                };
            }

            return (
                <div {...useBlockProps.save()}>
                    <div
                        className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`}
                    >
                        {enableFilter && (
                            <ul
                                className={`eb-img-gallery-filter-wrapper filter-wrapper-${blockId}`}
                                data-id={blockId}
                            >
                                {enableFilterAll && (
                                    <li
                                        className="eb-img-gallery-filter-item"
                                        data-filter={"*"}
                                        data-id={blockId}
                                    >
                                        {filterAllTitle !== "" ? filterAllTitle : "All"}
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
                        <div
                            className={`eb-gallery-img-wrapper ${blockId} ${layouts} ${overlayStyle} caption-style-${styleNumber} ${captionOnHover ? "caption-on-hover" : ""
                                } ${enableFilter ? "eb-filterable-img-gallery" : ""}`}
                            data-id={blockId}
                            data-default-filter={defaultFilter}
                        >
                            {sources.map((source, index) => {
                                let filters;

                                if (
                                    source.hasOwnProperty("filter") &&
                                    source.filter.length > 0
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
                                                <span
                                                    className={`eb-gallery-img-caption ${horizontalAlign} ${verticalAlign}`}
                                                >
                                                    {source.caption}
                                                </span>
                                            )}
                                    </span>
                                );

                                if (!addCustomLink) {
                                    return (
                                        <a
                                            key={index}
                                            href={
                                                !disableLightBox
                                                    ? source.url
                                                    : "javascript:void(0)"
                                            }
                                            {...lightBoxHtml}
                                            className={`eb-gallery-img-content eb-filter-img-${filters}`}
                                            rel="noopener"
                                        >
                                            {innerHtml}
                                        </a>
                                    );
                                }

                                if (addCustomLink) {
                                    return (
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
                                            className={`eb-gallery-img-content eb-filter-img-${filters}`}
                                            rel="noopener"
                                        >
                                            {innerHtml}
                                        </a>
                                    );
                                }
                            })}
                        </div>
                    </div>
                </div>
            );
        },
    },
    {
        attributes: omit({ ...attributes }, ["defaultFilter"]),
        supports: {
            align: ["wide", "full"],
        },
        save: ({ attributes }) => {
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
            } = attributes;

            if (sources && sources.length === 0) return null;

            let lightBoxHtml = {
                id: "eb-gallery-img-content",
            };
            if (!disableLightBox) {
                lightBoxHtml = {
                    ...lightBoxHtml,
                    ["data-fslightbox"]: "gallery",
                    ["data-type"]: "image",
                };
            }

            return (
                <div {...useBlockProps.save()}>
                    <div
                        className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`}
                    >
                        {enableFilter && (
                            <ul
                                className={`eb-img-gallery-filter-wrapper filter-wrapper-${blockId}`}
                                data-id={blockId}
                            >
                                {enableFilterAll && (
                                    <li
                                        className="eb-img-gallery-filter-item"
                                        data-filter={"*"}
                                        data-id={blockId}
                                    >
                                        {filterAllTitle !== "" ? filterAllTitle : "All"}
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
                        <div
                            className={`eb-gallery-img-wrapper ${blockId} ${layouts} ${overlayStyle} caption-style-${styleNumber} ${captionOnHover ? "caption-on-hover" : ""
                                } ${enableFilter ? "eb-filterable-img-gallery" : ""}`}
                            data-id={blockId}
                        >
                            {sources && sources.map((source, index) => {
                                let filters;

                                if (
                                    source.hasOwnProperty("filter") &&
                                    source.filter.length > 0
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
                                                <span
                                                    className={`eb-gallery-img-caption ${horizontalAlign} ${verticalAlign}`}
                                                >
                                                    {source.caption}
                                                </span>
                                            )}
                                    </span>
                                );

                                if (!addCustomLink) {
                                    return (
                                        <a
                                            key={index}
                                            href={
                                                !disableLightBox
                                                    ? source.url
                                                    : "javascript:void(0)"
                                            }
                                            {...lightBoxHtml}
                                            className={`eb-gallery-img-content eb-filter-img-${filters}`}
                                            rel="noopener"
                                        >
                                            {innerHtml}
                                        </a>
                                    );
                                }

                                if (addCustomLink) {
                                    return (
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
                                            className={`eb-gallery-img-content eb-filter-img-${filters}`}
                                            rel="noopener"
                                        >
                                            {innerHtml}
                                        </a>
                                    );
                                }
                            })}
                        </div>
                    </div>
                </div>
            );
        },
    },
    {
        attributes: omit({ ...attributes }, ["addCustomLink"]),
        supports: {
            align: ["wide", "full"],
        },
        save: ({ attributes }) => {
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
            } = attributes;

            if (sources.length === 0) return null;

            let lightBoxHtml = {
                id: "eb-gallery-img-content",
            };
            if (!disableLightBox) {
                lightBoxHtml = {
                    ...lightBoxHtml,
                    ["data-fslightbox"]: "gallery",
                    ["data-type"]: "image",
                };
            }

            return (
                <div {...useBlockProps.save()}>
                    <div
                        className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`}
                    >
                        {enableFilter && (
                            <ul
                                className={`eb-img-gallery-filter-wrapper filter-wrapper-${blockId}`}
                                data-id={blockId}
                            >
                                {enableFilterAll && (
                                    <li
                                        className="eb-img-gallery-filter-item"
                                        data-filter="*"
                                        data-id={blockId}
                                    >
                                        {filterAllTitle !== ""
                                            ? filterAllTitle
                                            : "All"}
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
                        <div
                            className={`eb-gallery-img-wrapper ${blockId} ${layouts} ${overlayStyle} caption-style-${styleNumber} ${captionOnHover ? "caption-on-hover" : ""
                                } ${enableFilter ? "eb-filterable-img-gallery" : ""
                                }`}
                            data-id={blockId}
                        >
                            {sources.map((source, index) => {
                                let filters;

                                if (
                                    source.hasOwnProperty("filter") &&
                                    source.filter.length > 0
                                ) {
                                    filters = JSON.parse(source.filter);

                                    filters = filters.map(
                                        (filter) => filter.value
                                    );

                                    filters = filters.toString();

                                    filters = filters.replaceAll(
                                        ",",
                                        " eb-filter-img-"
                                    );
                                } else {
                                    filters = "";
                                }
                                return (
                                    <a
                                        key={index}
                                        href={
                                            !disableLightBox ? source.url : "#"
                                        }
                                        {...lightBoxHtml}
                                        className={`eb-gallery-img-content eb-filter-img-${filters}`}
                                    >
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
                                                    <span
                                                        className={`eb-gallery-img-caption ${horizontalAlign} ${verticalAlign}`}
                                                    >
                                                        {source.caption}
                                                    </span>
                                                )}
                                        </span>
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </div>
            );
        },
    },
    {
        attributes: omit({ ...attributes }, [
            "filterItems",
            "enableFilter",
            "enableFilterAll",
            "filterAllTitle",
        ]),
        supports: {
            align: ["wide", "full"],
        },
        save: ({ attributes }) => {
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
            } = attributes;

            if (sources.length === 0) return null;

            let lightBoxHtml = {
                class: "eb-gallery-img-content",
            };
            if (!disableLightBox) {
                lightBoxHtml = {
                    ...lightBoxHtml,
                    ["data-fslightbox"]: "gallery",
                    ["data-type"]: "image",
                };
            }

            return (
                <div {...useBlockProps.save()}>
                    <div
                        className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`}
                    >
                        <div
                            className={`eb-gallery-img-wrapper ${blockId} ${layouts} ${overlayStyle} caption-style-${styleNumber} ${captionOnHover ? "caption-on-hover" : ""
                                }`}
                            data-id={blockId}
                        >
                            {sources.map((source, index) => (
                                <a
                                    key={index}
                                    href={
                                        !disableLightBox
                                            ? source.url
                                            : "javascript:void(0)"
                                    }
                                    {...lightBoxHtml}
                                >
                                    <span className="eb-gallery-link-wrapper">
                                        <img
                                            className="eb-gallery-img"
                                            src={source.url}
                                            image-index={index}
                                        />
                                        {displayCaption &&
                                            source.caption &&
                                            source.caption.length > 0 && (
                                                <span
                                                    className={`eb-gallery-img-caption ${horizontalAlign} ${verticalAlign}`}
                                                >
                                                    {source.caption}
                                                </span>
                                            )}
                                    </span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            );
        },
    },
    {
        attributes: { ...attributes },
        supports: {
            align: ["wide", "full"],
        },
        save: ({ attributes }) => {
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
            } = attributes;

            if (sources.length === 0) return null;

            return (
                <div {...useBlockProps.save()}>
                    <div
                        className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`}
                    >
                        <div
                            className={`eb-gallery-img-wrapper ${blockId} ${layouts} ${overlayStyle} caption-style-${styleNumber} ${captionOnHover ? "caption-on-hover" : ""
                                }`}
                            data-id={blockId}
                        >
                            {sources.map((source, index) => (
                                <a
                                    key={index}
                                    data-fslightbox="gallery"
                                    href={
                                        !disableLightBox
                                            ? source.url
                                            : "javascript:void(0)"
                                    }
                                    className={`eb-gallery-img-content`}
                                >
                                    <span className="eb-gallery-link-wrapper">
                                        <img
                                            className="eb-gallery-img"
                                            src={source.url}
                                            image-index={index}
                                        />
                                        {displayCaption &&
                                            source.caption &&
                                            source.caption.length > 0 && (
                                                <span
                                                    className={`eb-gallery-img-caption ${horizontalAlign} ${verticalAlign}`}
                                                >
                                                    {source.caption}
                                                </span>
                                            )}
                                    </span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            );
        },
    },
    {
        attributes: { ...attributes },
        supports: {
            align: ["wide", "full"],
        },
        save: ({ attributes }) => {
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
            } = attributes;

            if (sources.length === 0) return null;

            return (
                <div {...useBlockProps.save()}>
                    <div
                        className={`eb-gallery-img-wrapper ${blockId} ${layouts} ${overlayStyle} caption-style-${styleNumber} ${captionOnHover ? "caption-on-hover" : ""
                            }`}
                        data-id={blockId}
                    >
                        {sources.map((source, index) => (
                            <a
                                key={index}
                                data-fslightbox="gallery"
                                href={
                                    !disableLightBox
                                        ? source.url
                                        : "javascript:void(0)"
                                }
                                className={`eb-gallery-img-content`}
                            >
                                <span className="eb-gallery-link-wrapper">
                                    <img
                                        className="eb-gallery-img"
                                        src={source.url}
                                        image-index={index}
                                    />
                                    {displayCaption &&
                                        source.caption &&
                                        source.caption.length > 0 && (
                                            <span
                                                className={`eb-gallery-img-caption ${horizontalAlign} ${verticalAlign}`}
                                            >
                                                {source.caption}
                                            </span>
                                        )}
                                </span>
                            </a>
                        ))}
                    </div>
                </div>
            );
        },
    },
    {
        attributes: { ...attributes },

        save: ({ attributes }) => {
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
            } = attributes;

            if (sources.length === 0) return null;

            return (
                <div
                    className={`eb-gallery-img-wrapper ${blockId} ${layouts} ${overlayStyle} caption-style-${styleNumber} ${captionOnHover ? "caption-on-hover" : ""
                        }`}
                    data-id={blockId}
                >
                    {sources.map((source, index) => (
                        <a className={`eb-gallery-img-content`}>
                            <span className="eb-gallery-link-wrapper">
                                <img
                                    className="eb-gallery-img"
                                    src={source.url}
                                    image-index={index}
                                />
                                {displayCaption &&
                                    source.caption &&
                                    source.caption.length > 0 && (
                                        <span
                                            className={`eb-gallery-img-caption ${horizontalAlign} ${verticalAlign}`}
                                        >
                                            {source.caption}
                                        </span>
                                    )}
                            </span>
                        </a>
                    ))}
                </div>
            );
        },
    },
];

export default deprecated;
