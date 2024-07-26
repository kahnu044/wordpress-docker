/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
    MediaUpload,
    MediaPlaceholder,
    BlockControls,
    useBlockProps,
} from "@wordpress/block-editor";
import {
    ToolbarGroup,
    ToolbarItem,
    ToolbarButton,
    Button,
} from "@wordpress/components";
import { Fragment, useEffect, useState, useRef } from "@wordpress/element";
/**
 * Internal depencencies
 */
import classnames from "classnames";

import Inspector from "./inspector";
import Style from "./style";

const {
    BlockProps
} = window.EBControls;

export default function Edit(props) {
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
        images,
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
        loadmoreBtnText,
        enableLoadMore,
        enableInfiniteScroll
    } = attributes;

    // you must declare this variable
    const enhancedProps = {
        ...props,
        blockPrefix: 'eb-image-gallery',
        style: <Style {...props} />
    };

    const blockProps = useBlockProps({
        className: classnames(className, `eb-guten-block-main-parent-wrapper`),
    });


    //Set Image Sources on Change Image/Size
    useEffect(() => {
        const currentSources = [];
        images.map((image) => {
            let item = {};
            if (image.sizes && imageSize && imageSize.length > 0) {
                item.url = image.sizes[imageSize]
                    ? image.sizes[imageSize].url
                    : image.url;
            } else {
                item.url = image.url;
            }
            item.caption = image.caption;
            item.id = image.id;
            item.alt = image.alt;
            item.customLink = image.customLink ? image.customLink : "";
            item.openNewTab = image.openNewTab ? image.openNewTab : false;
            item.isValidUrl = image.isValidUrl ? image.isValidUrl : true;
            sources.length > 0 &&
                sources.map((source) => {
                    if (source.filter && source.id === image.id) {
                        item.filter = source.filter;
                    }
                });
            currentSources.push(item);
        });

        setAttributes({ sources: currentSources });
    }, [images, imageSize]);

    // Get only urls for Lightbox
    let urls = [];
    images.map((image) => urls.push(image.url));

    // handle deprecation
    useEffect(() => {
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
    }, []);

    // isotopeEA filter
    const isotopeEA = useRef();
    // store the filter keyword in a state
    const [filterKey, setFilterKey] = useState("*");

    // initialize an Isotope object with configs
    useEffect(() => {
        if (isotopeEA.current && typeof isotopeEA.current === "object" && Object.keys(isotopeEA.current).length === 0) {
            return;
        }

        if (enableFilter) {
            const imageGallery = document.querySelector(`.${blockId}`);
            if (imageGallery) {
                imagesLoaded(imageGallery, function () {
                    if (layouts == "grid") {
                        isotopeEA.current = new Isotope(`.${blockId}`, {
                            itemSelector: ".eb-gallery-img-content",
                            percentPosition: true,
                        });
                    } else {
                        isotopeEA.current = new Isotope(`.${blockId}`, {
                            itemSelector: ".eb-gallery-img-content",
                            percentPosition: true,
                            masonry: {
                                columnWidth: ".eb-gallery-img-content",
                            },
                        });
                    }

                    // cleanup
                    if (resOption === "Desktop") {
                        return () => isotopeEA.current.destroy();
                    }
                });
            }
        }
        if (enableIsotope) {
            const imageGallery = document.querySelector(`.${blockId}`);
            if (imageGallery) {
                imagesLoaded(imageGallery, function () {
                    if (layouts == "grid") {
                        isotopeEA.current = new Isotope(`.${blockId}`, {
                            itemSelector: ".eb-gallery-img-content",
                            percentPosition: true,
                        });
                    } else {
                        isotopeEA.current = new Isotope(`.${blockId}`, {
                            itemSelector: ".eb-gallery-img-content",
                            percentPosition: true,
                            masonry: {
                                columnWidth: ".eb-gallery-img-content",
                            },
                        });
                    }

                    // cleanup
                    if (resOption === "Desktop") {
                        return () => isotopeEA.current.destroy();
                    }
                });
            }
        } else {
            const imageGallery = document.querySelector(`.${blockId}`);
            if (imageGallery) {
                isotopeEA.current = new Isotope(`.${blockId}`);
                isotopeEA.current.destroy();
            }
        }

    }, [
        enableIsotope,
        enableFilter,
        layouts,
        images,
        imageSize,
        enableFilterAll,
        filterItems,
        sources,
        columnsRange,
        imageGapRange,
        imageHeightRange, ,
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
    ]);

    // handling filter key change
    useEffect(() => {
        if (
            isotopeEA.current &&
            typeof isotopeEA.current === "object" &&
            Object.keys(isotopeEA.current).length === 0
        ) {
            return;
        }

        if (enableFilter) {
            const imageGallery = document.querySelector(`.${blockId}`);
            if (imageGallery) {
                imagesLoaded(imageGallery, function () {
                    filterKey === "*"
                        ? isotopeEA.current.arrange({ filter: `*` })
                        : isotopeEA.current.arrange({
                            filter: `.${filterKey}`,
                        });
                });
            }
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

    return (
        <>
            {isSelected && images.length > 0 && (
                <Inspector
                    attributes={attributes}
                    setAttributes={setAttributes}
                />
            )}
            <>
                {urls.length === 0 && (
                    <MediaPlaceholder
                        onSelect={(images) => setAttributes({ images })}
                        accept="image/*"
                        allowedTypes={["image"]}
                        multiple
                        labels={{
                            title: "Images",
                            instructions:
                                "Drag media files, upload or select files from your library.",
                        }}
                    />
                )}
            </>
            <BlockProps.Edit {...enhancedProps}>

                {urls.length > 0 && (
                    <Fragment>
                        <BlockControls>
                            <ToolbarGroup>
                                <ToolbarItem>
                                    {() => (
                                        <MediaUpload
                                            value={images.map((img) => img.id)}
                                            onSelect={(...images) => {
                                                const newImages = images[0]
                                                const mergedArray = new Map(images.map(item => [item.id, item]));
                                                newImages.forEach(item => {
                                                    const correspondingItem = mergedArray.get(item.id);
                                                    if (correspondingItem) {
                                                        Object.assign(item, correspondingItem);
                                                    }
                                                });
                                                setAttributes({ images: newImages })
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
                            ref={isotopeEA}
                        >
                            {enableFilter && (
                                <ul className={`eb-img-gallery-filter-wrapper`}>
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

                            <div
                                className={`eb-gallery-img-wrapper ${blockId} ${layouts} ${overlayStyle} caption-style-${styleNumber} ${captionOnHover ? "caption-on-hover" : ""
                                    } ${enableFilter
                                        ? "eb-filterable-img-gallery"
                                        : ""
                                    } ${enableIsotope ? 'enable-isotope' : 'no-isotope'} ${enableLoadMore ? 'show-loadmore' : ''}`}
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
                                            className={`eb-gallery-img-content eb-filter-img-${filters}`}
                                        >
                                            <span className="eb-gallery-link-wrapper">
                                                <img
                                                    className="eb-gallery-img"
                                                    src={source.url}
                                                    image-index={index}
                                                />
                                                {displayCaption &&
                                                    source.caption &&
                                                    source.caption.length >
                                                    0 && (
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

                            {enableLoadMore && (
                                <button
                                    {...(enableInfiniteScroll ? { disabled: true } : {})}
                                    className={`eb-img-gallery-loadmore ${enableInfiniteScroll ? 'loadmore-disable' : ''}`}>
                                    {enableInfiniteScroll && (
                                        <img src={`${EssentialBlocksLocalize.eb_plugins_url}/assets/images/loading.svg`} />
                                    )}
                                    {loadmoreBtnText}
                                </button>
                            )}

                        </div>

                        <MediaUpload
                            onSelect={(newImage) => {
                                let updatedImages = [...images, ...newImage];
                                let newSources = [];

                                updatedImages.map((image) => {
                                    let item = {};
                                    item.url = image.url;
                                    item.caption = image.caption;
                                    item.id = image.id;

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
                                    images: updatedImages,
                                    sources: newSources,
                                });
                            }}
                            accept="image/*"
                            allowedTypes={["image"]}
                            multiple
                            value={newImage}
                            render={({ open }) =>
                                !newImage && (
                                    <Button
                                        className="eb-gallery-upload-button"
                                        label={__(
                                            "Add Image",
                                            "essential-blocks"
                                        )}
                                        icon="plus-alt"
                                        onClick={open}
                                    >
                                        Add More Images
                                    </Button>
                                )
                            }
                        />
                    </Fragment>
                )}
            </BlockProps.Edit>
        </>
    );
}
