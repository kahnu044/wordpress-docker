/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
    MediaUpload,
    BlockControls,
} from "@wordpress/block-editor";
import {
    ToolbarGroup,
    ToolbarItem,
    ToolbarButton,
    Button,
} from "@wordpress/components";
import { useEffect, useState, useRef, memo } from "@wordpress/element";
import { applyFilters } from "@wordpress/hooks";

/**
 * Internal depencencies
 */
import Inspector from "./inspector";
import Style from "./style";
import defaultAttributes from './attributes';
import {
    LOADMORE_KEYS
} from "./constants";

import {
    BlockProps, BrowseTemplate,
    withBlockContext, EBButton, EBDisplayIcon
} from "@essential-blocks/controls";

import { NotFoundImg, gridGapCal } from './helpers';
import { UserPlaceholder } from "./icon";
import Templates from '../../../../patterns/image-gallery.json'
import { ReactComponent as Icon } from "./icon.svg";

function Edit(props) {
    const {
        attributes,
        setAttributes,
        className,
        isSelected,
    } = props;
    const {
        resOption,
        blockId,
        blockMeta,
        layouts,
        sources,
        displayCaption,
        captionOnHover,
        newImage,
        horizontalAlign,
        verticalAlign,
        styleNumber,
        overlayStyle,
        imageSize,
        classHook,
        filterItems,
        enableFilter,
        enableFilterAll,
        filterAllTitle,
        defaultFilter,
        imageGapRange,
        columnsRange,
        imageHeightRange,
        imageWidthRange,
        imageMaxHeightRange,
        imageMaxWidthRange,
        imgBorderShadowborderStyle,
        imgBorderShadowborderColor,
        imgBorderShadowBdr_Bottom,
        imgBorderShadowBdr_Left,
        imgBorderShadowBdr_Right,
        imgBorderShadowBdr_Top,
        imgBorderShadowRds_Bottom,
        imgBorderShadowRds_Left,
        imgBorderShadowRds_Right,
        imgBorderShadowRds_Top,
        enableIsotope,
        enableLoadMore,
        enableInfiniteScroll,
        presets,
        displayDescription,
        lightboxIcon,
        linkIcon,
        disableLightBox,
        addCustomLink,
        enableSearch,
        unevenWidth,
        align,
        notFoundText,
        iconType,
        version,
        showBlockContent,
        enableEmptyGrid,
        imageSizeType,
        cover,
        disableIsotope
    } = attributes;

    // you must declare this variable
    const enhancedProps = {
        ...props,
        blockPrefix: 'eb-image-gallery',
        style: <Style {...props} />
    };

    const onImageChange = newImages => {
        const currentSources = [];
        newImages = newImages || sources;

        const mergedImages = newImages.map(image => {
            const matchingSource = sources.find(src => src.id === image.id);
            if (matchingSource) {
                Object.keys(matchingSource).forEach(key => {
                    if (!(key in image)) {
                        image[key] = matchingSource[key];
                    }
                });
            }
            return image;
        });

        mergedImages.map((image) => {
            let item = {};

            item.caption = image.caption;
            item.id = image.id;
            item.alt = image.alt;
            item.content = image.content ? image.content : "";
            item.customLink = image.customLink ? image.customLink : "";
            item.openNewTab = image.openNewTab ? image.openNewTab : false;
            item.isValidUrl = image.isValidUrl ? image.isValidUrl : true;
            item.sizes = image.sizes ? image.sizes : null;
            if (image.sizes && imageSize && imageSize.length > 0) {
                item.url = image.sizes[imageSize]
                    ? image.sizes[imageSize].url
                    : image.url;
            } else {
                item.url = image.url;
            }

            sources.length > 0 &&
                sources.map((source) => {
                    if (source.id === image.id) {
                        item.filter = source.filter;
                        // item.customLink = source.customLink;
                        // item.openNewTab = source.openNewTab;
                        // item.isValidUrl = source.isValidUrl;
                    }
                });
            currentSources.push(item);
        });
        setAttributes({ sources: currentSources });
    }

    // Get only urls for Lightbox
    let urls = [];
    sources.map((image) => urls.push(image.url));

    // handle deprecation
    useEffect(() => {
        setAttributes({ enableIsotope: true })

        if (enableFilter == null) {
            setAttributes({ enableFilter: false });
        }
        if (filterItems == null) {
            setAttributes({
                filterItems: [
                    {
                        value: "filter-item-1",
                        label: __("Filter Item 1", "essential-blocks"),
                    },
                ],
            });
        }
        if (enableFilterAll == null) {
            setAttributes({ enableFilterAll: true });
        }
        if (filterAllTitle == null) {
            setAttributes({ filterAllTitle: __("All", "essential-blocks") });
        }

        if (presets === undefined) {
            setAttributes({ presets: 'default' });
        }

        if (version === undefined) {
            setAttributes({ version: 'v2' });
        }

        if (sources.length == 0) {
            const dummySources = [
                {
                    "url": UserPlaceholder,
                    "caption": "Double Exposure",
                    "content": "Create surreal, artistic effect in frames",
                    "id": 1,
                    "filter": "[{\"value\":\"filter-item-1\",\"label\":\"Filter Item 1\"}]"
                },
                {
                    "url": UserPlaceholder,
                    "caption": "Golden Hour Tone",
                    "content": "Light is soft, warm, and ideal to capture ",
                    "id": 2
                },
                {
                    "url": UserPlaceholder,
                    "caption": "Perspective Playing",
                    "content": "Alter angles, viewpoints for compositions",
                    "id": 3,
                    "filter": "[{\"value\":\"filter-item-1\",\"label\":\"Filter Item 1\"}]"
                },
                {
                    "url": UserPlaceholder,
                    "caption": "Candid Moments",
                    "content": "Instant shots of live objects' inner beauty",
                    "id": 4
                },
                {
                    "url": UserPlaceholder,
                    "caption": "Rule of Thirds",
                    "content": "Place your key elements along the lines",
                    "id": 5,
                    "filter": "[{\"value\":\"filter-item-1\",\"label\":\"Filter Item 1\"}]"
                },
                {
                    "url": UserPlaceholder,
                    "caption": "Depth of Field",
                    "content": "Range of distance in a photo to emphasize",
                    "id": 6,
                    "filter": "[{\"value\":\"filter-item-1\",\"label\":\"Filter Item 1\"}]"
                },
                {
                    "url": UserPlaceholder,
                    "caption": "Shutter Speed",
                    "content": "Length of time shutter remains open",
                    "id": 7
                },
                {
                    "url": UserPlaceholder,
                    "caption": "Retro Vibes",
                    "content": "Refer to a nostalgic style that mimics",
                    "id": 8,
                    "filter": "[{\"value\":\"filter-item-1\",\"label\":\"Filter Item 1\"}]"
                },
                {
                    "url": UserPlaceholder,
                    "caption": "Minimalist Shot",
                    "content": "Focuses on simplicity, clean compositions",
                    "id": 9
                }
            ]

            setAttributes({
                sources: dummySources,
                filterItems: [
                    {
                        value: "filter-item-1",
                        label: __("Filter Item 1", "essential-blocks"),
                    },
                ],
            });
        }

        if (lightboxIcon === undefined) {
            setAttributes({ lightboxIcon: 'fas fa-plus' });
        }
        if (linkIcon === undefined) {
            setAttributes({ linkIcon: 'fas fa-link' });
        }
        if (displayDescription === undefined) {
            setAttributes({ displayDescription: false });
        }
        if (disableIsotope === undefined) {
            setAttributes({ disableIsotope: false });
        }
        if (enableEmptyGrid === undefined) {
            setAttributes({ enableEmptyGrid: true });
        }
        if (iconType === undefined) {
            setAttributes({ iconType: 'normal' });
        }
        if (notFoundText === undefined) {
            setAttributes({ notFoundText: 'Image Not Found! Try Again' });
        }
    }, []);

    // refGalleryIsotope filter
    const refGalleryIsotope = useRef(null);
    // store the filter keyword in a state
    const [filterKey, setFilterKey] = useState("*");

    // initialize an Isotope object with configs
    useEffect(() => {
        if (refGalleryIsotope.current && typeof refGalleryIsotope.current === "object" && Object.keys(refGalleryIsotope.current).length === 0) {
            return;
        }

        const initializeIsotope = () => {
            const imageGallery = document.querySelector(`.${blockId}.enable-isotope`);
            if (!imageGallery) return;

            imagesLoaded(imageGallery, () => {
                // Destroy existing instance
                if (refGalleryIsotope.current?.destroy) {
                    refGalleryIsotope.current.destroy();
                    refGalleryIsotope.current = null;
                }

                // Define layout options
                const layoutMode = layouts === "grid" ? "fitRows" : "masonry";

                // Initialize Isotope
                refGalleryIsotope.current = new Isotope(imageGallery, {
                    itemSelector: ".eb-gallery-img-content",
                    layoutMode,
                    transitionDuration: '0.5s',
                    percentPosition: layoutMode !== "fitRows",
                    masonry: layoutMode !== "fitRows" ? { columnWidth: unevenWidth ? '.grid-sizer' : '.eb-gallery-img-content' } : null,
                });

            });
        };

        // Reinitialize Isotope on layout change
        if (!disableIsotope) {
            setTimeout(() => {
                initializeIsotope();
            }, 500)
        } else {
            if (refGalleryIsotope.current?.destroy) {
                refGalleryIsotope.current.destroy();
                refGalleryIsotope.current = null;
            }
        }


        // Cleanup on unmount
        return () => {
            if (refGalleryIsotope.current?.destroy) {
                refGalleryIsotope.current.destroy();
                refGalleryIsotope.current = null;
            }
        };

    }, [
        imageSizeType,
        align,
        enableIsotope,
        enableFilter,
        layouts,
        unevenWidth,
        enableEmptyGrid,
        imageSize,
        enableFilterAll,
        filterItems,
        sources,
        columnsRange,
        imageGapRange,
        imageHeightRange,
        imageWidthRange,
        imageMaxHeightRange,
        imageMaxWidthRange,
        imgBorderShadowborderStyle,
        imgBorderShadowborderColor,
        imgBorderShadowBdr_Bottom,
        imgBorderShadowBdr_Left,
        imgBorderShadowBdr_Right,
        imgBorderShadowBdr_Top,
        imgBorderShadowRds_Bottom,
        imgBorderShadowRds_Left,
        imgBorderShadowRds_Right,
        imgBorderShadowRds_Top,
        disableIsotope
    ]);

    // handling filter key change
    useEffect(() => {
        if (
            !refGalleryIsotope.current ||
            typeof refGalleryIsotope.current !== "object" ||
            Object.keys(refGalleryIsotope.current).length === 0
        ) {
            return;
        }

        if (!enableFilter) {
            return;
        }

        const imageGallery = document.querySelector(`.${blockId}.enable-isotope`);
        const parentWrapper = imageGallery?.closest(".eb-parent-wrapper");
        const notFoundDiv = parentWrapper?.querySelector('#eb-img-gallery-not-found');

        if (imageGallery && refGalleryIsotope.current) {
            imagesLoaded(imageGallery, () => {
                // Apply the filter
                if (refGalleryIsotope.current.arrange) {
                    refGalleryIsotope.current?.arrange({
                        filter: filterKey === '*' ? '*' : `.${filterKey}`,
                    });
                }

                // Remove previous listeners to avoid duplication
                refGalleryIsotope.current.off?.('arrangeComplete');

                // Attach the event handler once
                refGalleryIsotope.current.on?.('arrangeComplete', (filteredItems) => {
                    if (notFoundDiv) {
                        if (filteredItems.length === 0) {
                            notFoundDiv.classList.add('show');
                        } else {
                            notFoundDiv.classList.remove('show');
                        }
                    }
                });
            });
        }
    }, [enableFilter, filterKey]);

    useEffect(() => {
        if (defaultFilter && defaultFilter.length > 0) {
            setFilterKey(defaultFilter === '*' ? '*' : `eb-filter-img-${defaultFilter}`)
        }
    }, [defaultFilter])

    const handleFilterKeyChange = (event, value) => {
        setFilterKey(value);
        var buttonGroup = event.target.closest(
            ".eb-img-gallery-filter-wrapper"
        );
        buttonGroup.querySelector(".is-checked").classList.remove("is-checked");
        event.target.classList.add("is-checked");
    };

    const wideClass = (index) => {
        const isWide = columnsRange === 3
            ? (index + 1) % 4 === 0 || (index + 1) % 7 === 0
            : index % 3 === 0;

        return isWide ? "wide" : "";
    }

    return cover.length ? (
        <div>
            <img src={cover} alt="filterable gallery" style={{ maxWidth: "100%" }} />
        </div>
    ) : (
        <>
            {isSelected && showBlockContent && sources.length > 0 && (
                <Inspector
                    attributes={attributes}
                    setAttributes={setAttributes}
                    onImageChange={onImageChange}
                />
            )}
            <BlockProps.Edit {...enhancedProps}>
                <BrowseTemplate
                    {...props}
                    Icon={Icon}
                    title={"Filterable Gallery"}
                    description={"Choose a template for the Filterable Gallery or start blank."}
                    patterns={applyFilters('eb_pro_templates_image_gallery', Templates)}
                />

                {showBlockContent && (
                    <>
                        {sources.length > 0 && (
                            <>
                                <BlockControls>
                                    <ToolbarGroup>
                                        <ToolbarItem>
                                            {() => (
                                                <MediaUpload
                                                    key={blockId || props.clientId}
                                                    value={(sources || []).filter((img) => img && img.url && img.url !== UserPlaceholder && typeof img.id === "number").map((img) => img.id)}
                                                    onSelect={(selectedImages) => {
                                                        const newImages = Array.isArray(selectedImages) ? selectedImages : [selectedImages];
                                                        onImageChange(newImages);
                                                    }}
                                                    allowedTypes={["image"]}
                                                    multiple
                                                    gallery
                                                    render={({ open }) => (
                                                        <ToolbarButton
                                                            className="components-toolbar__control"
                                                            label={__(
                                                                "Edit gallery",
                                                                "essential-blocks"
                                                            )}
                                                            icon="edit"
                                                            onClick={open}
                                                        />
                                                    )}
                                                />
                                            )}
                                        </ToolbarItem>
                                    </ToolbarGroup>
                                </BlockControls>

                                <div
                                    className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`}
                                    ref={refGalleryIsotope}
                                >
                                    {enableFilter && !enableSearch && (
                                        <ul className={`eb-img-gallery-filter-wrapper ${presets}`}>
                                            {enableFilterAll && (
                                                <li
                                                    className={`eb-img-gallery-filter-item ${filterKey === '*' ? "is-checked" : ""}`}
                                                    data-filter="*"
                                                    onClick={(event) =>
                                                        handleFilterKeyChange(
                                                            event,
                                                            "*"
                                                        )
                                                    }
                                                >
                                                    {filterAllTitle !== ""
                                                        ? filterAllTitle
                                                        : __("All", "essential-blocks")}
                                                </li>
                                            )}
                                            {filterItems.map(
                                                ({ value, label }, index) => {
                                                    return (
                                                        <li
                                                            key={index}
                                                            className={`eb-img-gallery-filter-item ${filterKey === `eb-filter-img-${value}` ? "is-checked" : ""}`}
                                                            data-filter={`.eb-filter-img-${value}`}
                                                            onClick={(event) =>
                                                                handleFilterKeyChange(
                                                                    event,
                                                                    `eb-filter-img-${value}`
                                                                )
                                                            }
                                                        >
                                                            {label}
                                                        </li>
                                                    );
                                                }
                                            )}
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
                                        data-id={blockId}
                                        className={`eb-gallery-img-wrapper ${blockId} ${presets} ${version} ${layouts} ${disableIsotope ? 'no-isotope' : 'enable-isotope'} ${enableFilter ? "eb-filterable-img-gallery" : ""} ${enableLoadMore ? "show-loadmore" : ""} ${presets === "default" ? `${overlayStyle} caption-style-${styleNumber} ${captionOnHover ? "caption-on-hover" : ""}` : ""}`}
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

                                            index = index + 1;

                                            const isGap = gridGapCal(index, columnsRange, sources);

                                            return (
                                                <>
                                                    {presets == 'default' && (
                                                        <>
                                                            {version === undefined && (
                                                                <a
                                                                    key={index}
                                                                    className={`eb-gallery-img-content ${layouts == 'masonry' && unevenWidth ? wideClass(index) ? "wide" : "" : ''} eb-filter-img-${filters}`}
                                                                >
                                                                    <span className={`eb-gallery-link-wrapper`}>
                                                                        <img
                                                                            className="eb-gallery-img"
                                                                            src={source.url}
                                                                            image-index={index}
                                                                            alt={source.alt}
                                                                        />

                                                                        {displayCaption &&
                                                                            source.caption &&
                                                                            source.caption.length >
                                                                            0 && (
                                                                                <>
                                                                                    <span className={`eb-gallery-img-caption ${horizontalAlign} ${verticalAlign}`} dangerouslySetInnerHTML={{ __html: source.caption }}></span>
                                                                                </>
                                                                            )}
                                                                    </span>
                                                                </a>
                                                            )}
                                                            {version === 'v2' && (
                                                                <a
                                                                    key={index}
                                                                    className={`eb-gallery-img-content ${layouts == 'masonry' && unevenWidth ? wideClass(index) ? "wide" : "" : ''} eb-filter-img-${filters}`}
                                                                >
                                                                    <span className={`eb-gallery-link-wrapper`}>
                                                                        <img
                                                                            className="eb-gallery-img"
                                                                            src={source.url}
                                                                            image-index={index}
                                                                            alt={source.alt}
                                                                        />
                                                                        <span className={`eb-img-gallery-content ${horizontalAlign} ${verticalAlign}`}>

                                                                            {displayCaption &&
                                                                                source.caption &&
                                                                                source.caption.length >
                                                                                0 && (
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
                                                                </a>
                                                            )}
                                                        </>

                                                    )}
                                                    {presets !== 'default' && presets !== 'pro-preset-5' && presets !== 'pro-preset-6' && (
                                                        <div key={index} className={`eb-gallery-img-content ${layouts == 'masonry' && unevenWidth ? wideClass(index) : ''} eb-filter-img-${filters}`}>
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
                                                                                    <a href="" className="eb-img-gallery-action">
                                                                                        <EBDisplayIcon icon={lightboxIcon} />
                                                                                    </a>
                                                                                )}

                                                                                {addCustomLink && (
                                                                                    <a href="" className="eb-img-gallery-action">
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
                                                                                <a href="" className="eb-img-gallery-action">
                                                                                    <EBDisplayIcon icon={lightboxIcon} />
                                                                                </a>
                                                                            )}

                                                                            {addCustomLink && (
                                                                                <a href="" className="eb-img-gallery-action">
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
                                            <EBButton
                                                isSelected={isSelected}
                                                type="button"
                                                btnWrapperClassName='eb-img-gallery-loadmore-container'
                                                className={`eb-img-gallery-loadmore ${enableInfiniteScroll ? 'loadmore-disable' : ''}`}
                                                buttonAttrProps={LOADMORE_KEYS}
                                                disable={enableInfiniteScroll ? true : false}
                                                loadingIcon={enableInfiniteScroll ? true : false}
                                            />
                                        </>

                                    )}

                                </div>

                                <MediaUpload
                                    onSelect={(newImage) => {
                                        let updatedImages = [...sources, ...newImage];
                                        let newSources = [];

                                        updatedImages.map((image) => {
                                            let item = {};
                                            item.url = image.url ? image.url : "";
                                            item.caption = image.caption ? image.caption : "";
                                            item.content = image.content ? image.content : "";
                                            item.id = image.id;
                                            item.alt = image.alt ? image.alt : "";
                                            item.customLink = image.customLink ? image.customLink : "";
                                            item.openNewTab = image.openNewTab ? image.openNewTab : false;
                                            item.isValidUrl = image.isValidUrl ? image.isValidUrl : true;
                                            item.sizes = image.sizes ? image.sizes : null;

                                            sources.length > 0 &&
                                                sources.map((source) => {
                                                    if (
                                                        source.filter &&
                                                        source.id === image.id
                                                    ) {
                                                        item.filter = source.filter;
                                                    }
                                                });

                                            newSources.push(item);
                                        });

                                        setAttributes({
                                            sources: newSources,
                                        });
                                    }}
                                    accept="image/*"
                                    allowedTypes={["image"]}
                                    multiple='add'
                                    value={newImage}
                                    render={({ open }) =>
                                        !newImage && (
                                            <Button
                                                className="eb-gallery-upload-button"
                                                label={__(
                                                    "Add Image",
                                                    "essential-blocks"
                                                )}
                                                onClick={open}
                                            >
                                                <span className="addIcon">
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <g clipPath="url(#clip0_2005_6307)">
                                                            <path d="M12 5V19" stroke="#444F62" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                            <path d="M5 12H19" stroke="#444F62" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0_2005_6307">
                                                                <rect width="24" height="24" fill="white" />
                                                            </clipPath>
                                                        </defs>
                                                    </svg>
                                                </span>
                                                Add More Images
                                            </Button>
                                        )
                                    }
                                />
                            </>
                        )}
                    </>
                )}
            </BlockProps.Edit>
        </>
    );
}
export default memo(withBlockContext(defaultAttributes)(Edit))
