import {
sanitizeURL, BlockProps
} from "@essential-blocks/controls";

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
                                            <span className={`eb-gallery-img-caption ${horizontalAlign} ${verticalAlign}`} dangerouslySetInnerHTML={{__html: source.caption}}></span>
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
                        <button
                            {...(enableInfiniteScroll ? { disabled: true } : {})}
                            data-images-per-page={imagesPerPageCount}
                            data-loadmore={enableLoadMore}
                            data-infinite-scroll={enableInfiniteScroll}
                            className={`eb-img-gallery-loadmore ${enableInfiniteScroll ? 'loadmore-disable' : ''}`}>
                            {enableInfiniteScroll && (
                                <img className="eb-install-loader" src={`${EssentialBlocksLocalize.eb_plugins_url}/assets/images/loading.svg`} />
                            )}
                            {loadmoreBtnText}
                        </button>
                    </>
                )}
            </div>
        </BlockProps.Save>
    );
};

export default Save;
