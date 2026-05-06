/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useEffect, useState, useRef } from "@wordpress/element";
import {
    PanelRow,
    SelectControl,
    ToggleControl,
    TextControl,
    Button,
    ButtonGroup,
    BaseControl,
    RangeControl,
    __experimentalDivider as Divider,
    __experimentalToggleGroupControl as ToggleGroupControl,
    __experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from "@wordpress/components";
import { withSelect } from "@wordpress/data";
import { applyFilters } from "@wordpress/hooks";
import { MediaUpload } from "@wordpress/block-editor";

/**
 * External Dependencies
 */
import Select2 from "react-select";
import AsyncSelect from "react-select/async";

/**
 * Internal depencencies
 */
import {
    WRAPPER_MARGIN,
    WRAPPER_PADDING,
    WRAPPER_BORDER_SHADOW,
    WRAPPER_BG,
    COLUMNS,
    COLUMN_GAP,
    COLUMN_PADDING,
    COLUMN_BG,
    COLUMN_BORDER_SHADOW,
    THUMBNAIL_IMAGE_SIZE,
    THUMBNAIL_BORDER_RADIUS,
    THUMBNAIL_MARGIN,
    TITLE_PADDING,
    TITLE_MARGIN,
    TITLE_BORDER_SHADOW,
    CONTENT_MARGIN,
    READMORE_MARGIN,
    READMORE_PADDING,
    READMORE_BORDER_SHADOW,
    HEADER_META_MARGIN,
    FOOTER_META_MARGIN,
    HEADER_META_SPACE,
    FOOTER_META_SPACE,
    AVATAR_BORDER_RADIUS,
    COLUMN_MEDIA_WIDTH,
    UNIT_TYPES,
    HEIGHT_UNIT_TYPES,
    NORMAL_HOVER,
    NORMAL_HOVER_ACTIVE,
    PRESETS,
    TEXT_ALIGN,
    TITLE_TAGS,
    CONTENT_POSITION,
    VERTICAL_POSITION,
    LOADMORE_PADDING,
    LOADMORE_MARGIN,
    LOADMORE_BORDER_SHADOW,
    FILTER_MARGIN,
    FILTER_ITEM_PADDING,
    FILTER_ITEM_BORDER_SHADOW,
    FILTER_ITEM_GAP,
    ICON_POSITION,
    ICON_SIZE,
    ICON_SPACE,
    POST_MIN_HEIGHT,
    POST_WIDTH,
    LIST_POST_WIDTH,
    FEATURED_TITLE_PADDING,
    FEATURED_TITLE_MARGIN,
    FEATURED_TITLE_BORDER,
    FEATURED_EXCERPT_PADDING,
    FEATURED_EXCERPT_MARGIN,
    FEATURED_EXCERPT_BORDER,
    FEATURED_META_PADDING,
    FEATURED_META_MARGIN,
    FEATURED_META_BORDER,
    FEATURED_POST_BORDER,
    FEATURED_POST_PADDING,
    HORIZONTAL_CONTENT_POSITION,
    VERTICAL_CONTENT_POSITION,
    FEATURED_AVATAR_RADIUS
} from "./constants/constants";
import {
    EBPG_TITLE_TYPOGRAPHY,
    EBPG_CONTENT_TYPOGRAPHY,
    EBPG_READMORE_TYPOGRAPHY,
    EBPG_META_TYPOGRAPHY,
    EBPG_LOAD_MORE_TYPOGRAPHY,
    FILTER_ITEM_TYPOGRAPHY,
    FEATURED_TITLE_TYPO,
    FEATURED_EXCERPT_TYPO,
    FEATURED_META_TYPO,
    FEATURED_READMORE_TYPO,
} from "./constants/typographyPrefixConstants";

import {
    ColorControl,
    ResponsiveDimensionsControl,
    TypographyDropdown,
    BorderShadowControl,
    ResponsiveRangeController,
    BackgroundControl,
    CustomQuery,
    MorePosts,
    EbImageSizeSelector,
    DynamicInputControl,
    EBIconPicker,
    SortControl,
    InspectorPanel,
    ButtonGroupControl,
    ImageAvatar,
    getPostsBySearchString,
} from "@essential-blocks/controls";
import { use } from "react";

function Inspector(props) {
    const { attributes, setAttributes, taxonomyData, setQueryResults } = props;
    const { terms, taxonomies } = taxonomyData;
    const {
        preset,
        queryData,
        postTerms,
        loadMoreOptions,
        showThumbnail,
        thumbnailOverlayColor,
        thumbnailOverlayHoverColor,
        showTitle,
        titleColor,
        titleHoverColor,
        titleColorStyle,
        titleLength,
        titleTextAlign,
        titleTag,
        showContent,
        contentColor,
        contentTextAlign,
        contentLength,
        expansionIndicator,
        showReadMore,
        readmoreText,
        readmoreColor,
        readmoreBGColor,
        readmoreTextAlign,
        readmoreHoverColor,
        readmoreBGHoverColor,
        readmoreColorType,
        showMeta,
        headerMeta,
        footerMeta,
        authorPrefix,
        datePrefix,
        headerMetaTextAlign,
        footerMetaTextAlign,
        metaColorType,
        authorMetaColor,
        authorMetaHoverColor,
        commonMetaColor,
        commonMetaHoverColor,
        commonMetaBgColor,
        commonMetaBgHoverColor,
        categoryMetaColor,
        categoryMetaHoverColor,
        categoryMetaBgColor,
        categoryMetaBgHoverColor,
        tagMetaColor,
        tagMetaHoverColor,
        tagMetaBgColor,
        tagMetaBgHoverColor,
        dateMetaColor,
        styleVerticalAlignment,
        loadMoreColorType,
        loadMoreColor,
        loadMoreBgColor,
        loadMoreHoverColor,
        loadMoreHoverBgColor,
        loadMoreActiveColor,
        loadMoreActiveBgColor,
        ReadTimeMetaColor,
        dynamicMetaColor,
        dynamicMetaBgColor,
        showTaxonomyFilter,
        selectedTaxonomy,
        selectedTaxonomyItems,
        filterColorStyle,
        filterBgColor,
        filterTextColor,
        filterActiveBgColor,
        filterActiveTextColor,
        filterHoverBgColor,
        filterHoverTextColor,
        addIcon,
        icon,
        iconPosition,
        enableContents,
        enableThumbnailSort,
        defaultFilter,
        showFallbackImg,
        fallbackImgUrl,
        fallbackImgId,
        fallbackImgAlt,
        showFeaturedPost,
        featuredPostId,
        showFeaturedPostTitle,
        showFeaturedPostContent,
        showFeaturedPostMeta,
        showFeaturedHeaderMeta,
        showFeaturedFooterMeta,
        featuredMetaItems,
        featuredExcerptLength,
        featuredTitleColor,
        featuredTitleHoverColor,
        featuredExcerptColor,
        featuredExcerptHoverColor,
        featuredMetaColor,
        featuredMetaHoverColor,
        featuredPostBorderRadius,
        featuredPostBottomSpacing,
        featuredPostHorizontalAlign,
        featuredPostVerticalAlign,
        featuredMetaBGColor,
        featuredMetaBGHoverColor,
        featuredOverlayColor,
        showSearch,
        featuredPostMetaStatus,
        featuredPostAuthorMetaColor,
        featuredPostAuthorMetaHoverColor,
        featuredPostCommonMetaColor,
        featuredPostCommonMetaBgColor,
        featuredPostCategoryMetaColor,
        featuredPostCategoryMetaBgColor,
        featuredPostTagMetaColor,
        featuredPostTagMetaBgColor,
        featuredPostReadTimeMetaColor,
        featuredPostDynamicMetaColor,
        featuredPostDynamicMetaBgColor,
        featuredPostDateMetaColor,
        featuredPostCommonMetaHoverColor,
        featuredPostCommonMetaHoverBgColor,
        featuredPostCategoryMetaHoverColor,
        featuredPostCategoryMetaHoverBgColor,
        featuredPostTagMetaHoverColor,
        featuredPostTagMetaHoverBgColor,
    } = attributes;

    const [metaOptions, setMetaOptions] = useState([]);
    const [featuredPostOptions, setFeaturedPostOptions] = useState([]);

    /**
     * Prepare Post Terms
     */
    useEffect(() => {
        const meta = [
            { value: "date", label: "Published Date" },
            { value: "author", label: "Author Name" },
            { value: "avatar", label: "Author Avatar" },
            { value: "readtime", label: "Read Time" },
        ];

        if (postTerms && Object.keys(postTerms).length > 0) {
            Object.keys(postTerms).map((term) => {
                meta.push(postTerms[term]);
            });
        }

        //Meta option Filter
        const updatedMeta = applyFilters("essential_blocks_post_grid_meta", meta, queryData?.source);

        //Set Meta Options
        if (updatedMeta.then) {
            updatedMeta.then((resp) => {
                const modifiedArray = resp.map(item => ({
                    ...item,
                    options: item.options.map(option => {
                        if (typeof option.label === "object") {
                            const prefix = EssentialBlocksProLocalize?.eb_dynamic_tags
                                ? `${EssentialBlocksProLocalize.eb_dynamic_tags}/`
                                : "";
                            return {
                                ...option.label,
                                value: `${prefix}${option.label.value}/settings=[]`
                            };
                        }
                        return { ...option };
                    })
                }));
                setMetaOptions(modifiedArray);
            });
        } else {
            setMetaOptions(updatedMeta);
        }
    }, [postTerms]);

    /**
     * Update HeaderMeta, FooterMeta on change postTerms
     */
    const prevSource = useRef(queryData?.source);
    const prevterms = useRef(postTerms);
    const selectedTaxonomyRef = useRef(selectedTaxonomy);


    useEffect(() => {
        if (!queryData || !queryData.source) {
            return;
        }

        if (queryData.source != prevSource.current) {
            const terms =
                prevterms.current && typeof prevterms.current === "object" ? Object.keys(prevterms.current) : [];

            let headerMetaVal = headerMeta.length > 0 ? JSON.parse(headerMeta) : [];
            headerMetaVal = headerMetaVal.length > 0 && headerMetaVal.filter((item) => !terms.includes(item.value));

            let footerMetaVal = footerMeta.length > 0 ? JSON.parse(footerMeta) : [];
            footerMetaVal = footerMetaVal.length > 0 && footerMetaVal.filter((item) => !terms.includes(item.value));

            setAttributes({
                headerMeta: JSON.stringify(headerMetaVal),
                footerMeta: JSON.stringify(footerMetaVal),
            });
            prevSource.current = queryData.source;
        }
    }, [queryData?.source]);

    const makeEnableContent = (showItem, itemName) => {
        let newEnableContents = [...enableContents];
        if (showItem == true) {
            if (!newEnableContents.includes(itemName)) {
                if (itemName == "meta") {
                    headerMeta.length > 0 ? newEnableContents.push("headerMeta") : null;
                    footerMeta.length > 0 ? newEnableContents.push("footerMeta") : null;
                } else {
                    newEnableContents.push(itemName);
                }
            }
        } else {
            if (newEnableContents.includes(itemName)) {
                newEnableContents = newEnableContents.filter((item) => item !== itemName);
            }
        }
        setAttributes({
            enableContents: newEnableContents,
        });
    };

    useEffect(() => {
        // pro preset
        applyFilters("eb_post_grid_preset_change", preset, attributes, setAttributes);

        switch (preset) {
            case "style-1":
                setAttributes({
                    featuredPostBorderRadius: 0,
                });
                break;
            case "style-2":
                setAttributes({
                    featuredPostBorderRadius: 5,
                });
            case "style-3":
                setAttributes({
                    featuredPostBorderRadius: 5,
                });
                break;
            case "style-4":
                setAttributes({
                    featuredPostBorderRadius: 0,
                });
                break;
            case "style-5":
                setAttributes({
                    featuredPostBorderRadius: 0,
                });
                break;

        }
    }, [preset]);

    useEffect(() => {
        if (!enableThumbnailSort && enableContents.includes("thumbnail")) {
            setAttributes({
                enableContents: enableContents.filter((item) => item !== "thumbnail"),
            });
        } else {
            if (!enableContents.includes("thumbnail")) {
                setAttributes({
                    enableContents: ["thumbnail", ...enableContents],
                });
            }
        }
    }, [enableThumbnailSort]);

    useEffect(() => {
        if (selectedTaxonomyRef.current !== selectedTaxonomy) {
            selectedTaxonomyRef.current = selectedTaxonomy
            setAttributes({ selectedTaxonomyItems: '[{"value":"all","label":"All"}]' })
        }
    }, [selectedTaxonomy])

    // Function to load featured posts by search
    const loadFeaturedPosts = (value) => {
        if (!value || value.length < 2) {
            return featuredPostOptions;
        }

        return getPostsBySearchString(value, queryData).then((postData) => {
            let postDataForOptions = [];
            postData.length > 0 &&
                postData.forEach((item) => {
                    let filterPostData = {};
                    Object.keys(item).forEach((key) => {
                        if (key === "title") {
                            filterPostData.label = item[key];
                        }
                        if (key === "id") {
                            filterPostData.value = item[key];
                        }
                    });
                    postDataForOptions.push(filterPostData);
                });
            return postDataForOptions;
        });
    };

    return (
        <>
            <InspectorPanel advancedControlProps={{
                marginPrefix: WRAPPER_MARGIN,
                paddingPrefix: WRAPPER_PADDING,
                borderPrefix: WRAPPER_BORDER_SHADOW,
                backgroundPrefix: WRAPPER_BG,
            }}>
                <InspectorPanel.General>
                    <CustomQuery attributes={attributes} setAttributes={setAttributes} setQueryResults={setQueryResults} />
                    <InspectorPanel.PanelBody title={__("Layout Style", "essential-blocks")} initialOpen={false}>
                        <ToggleControl
                            label={__("Show Featured Post?")}
                            checked={showFeaturedPost}
                            onChange={() => {
                                setAttributes({
                                    showFeaturedPost: !showFeaturedPost,
                                    showSearch: !showFeaturedPost && showSearch ? false : showSearch,
                                });
                            }}
                        />
                        <ResponsiveRangeController
                            baseLabel={__("Columns", "essential-blocks")}
                            controlName={COLUMNS}
                            units={[]}
                            min={1}
                            max={6}
                            step={1}
                        />

                        <ResponsiveRangeController
                            baseLabel={__("Column Gap", "essential-blocks")}
                            controlName={COLUMN_GAP}
                            units={UNIT_TYPES}
                            min={1}
                            max={100}
                            step={0}
                        />

                        {["style-5", "pro-style-6"].includes(preset) === false && (
                            <ToggleControl
                                label={__("Show Thumbnail?")}
                                checked={showThumbnail}
                                onChange={() => {
                                    setAttributes({
                                        showThumbnail: !showThumbnail,
                                    });

                                    makeEnableContent(!showThumbnail, "thumbnail");
                                }}
                                __nextHasNoMarginBottom
                            />
                        )}

                        {showThumbnail && (
                            <>
                                <ResponsiveRangeController
                                    baseLabel={__("Thumbnail Height", "essential-blocks")}
                                    controlName={THUMBNAIL_IMAGE_SIZE}
                                    units={HEIGHT_UNIT_TYPES}
                                    min={1}
                                    max={500}
                                    step={1}
                                />
                                {preset === "style-4" && (
                                    <ResponsiveRangeController
                                        baseLabel={__("Thumbnail Width", "essential-blocks")}
                                        controlName={COLUMN_MEDIA_WIDTH}
                                        units={[
                                            {
                                                label: "%",
                                                value: "%",
                                            },
                                        ]}
                                        min={0}
                                        max={100}
                                        step={1}
                                    />
                                )}

                                <EbImageSizeSelector
                                    attrName={"thumbnailSize"}
                                    setAttributes={setAttributes}
                                />

                                <ToggleControl
                                    label={__("Show Fallback Image?")}
                                    checked={showFallbackImg}
                                    onChange={() => {
                                        setAttributes({
                                            showFallbackImg: !showFallbackImg,
                                        });
                                    }}
                                    __nextHasNoMarginBottom
                                />

                                {showFallbackImg && !fallbackImgUrl && (
                                    <MediaUpload
                                        onSelect={({
                                            id,
                                            url,
                                            alt,
                                        }) =>
                                            setAttributes({
                                                fallbackImgUrl: url,
                                                fallbackImgId: id,
                                                fallbackImgAlt: alt,
                                            })
                                        }
                                        type="image"
                                        value={fallbackImgId}
                                        render={({
                                            open,
                                        }) => {
                                            return (
                                                <Button
                                                    className="eb-background-control-inspector-panel-img-btn components-button"
                                                    label={__(
                                                        "Upload Image",
                                                        "essential-blocks"
                                                    )}
                                                    icon="format-image"
                                                    onClick={
                                                        open
                                                    }
                                                />
                                            );
                                        }}
                                    />
                                )}

                                {showFallbackImg && fallbackImgUrl && (
                                    <ImageAvatar
                                        imageUrl={fallbackImgUrl}
                                        onDeleteImage={() =>
                                            setAttributes({
                                                fallbackImgUrl: null,
                                            })
                                        }
                                    />
                                )}
                            </>
                        )}

                        {(preset === "style-4" || preset === "style-5" || preset === "pro-style-6") && (
                            <ToggleGroupControl
                                label={__("Content Vertical Alignment", "essential-blocks")}
                                value={styleVerticalAlignment}
                                onChange={(value) => setAttributes({ styleVerticalAlignment: value })}
                                isBlock
                                __next40pxDefaultSize
                                __nextHasNoMarginBottom
                            >
                                {VERTICAL_POSITION.map((item, index) => (
                                    <ToggleGroupControlOption key={index} value={item.value} label={item.label} />
                                ))}
                            </ToggleGroupControl>
                        )}

                        <ToggleControl
                            label={__("Show Title?")}
                            checked={showTitle}
                            onChange={() => {
                                setAttributes({
                                    showTitle: !showTitle,
                                });
                                makeEnableContent(!showTitle, "title");
                            }}
                            __nextHasNoMarginBottom
                        />

                        {showTitle && (
                            <>
                                <ToggleGroupControl
                                    label={__("Title Tag", "essential-blocks")}
                                    value={titleTag}
                                    onChange={(value) => setAttributes({ titleTag: value })}
                                    isBlock
                                    __next40pxDefaultSize
                                    __nextHasNoMarginBottom
                                >
                                    {TITLE_TAGS.map((item, key) => (
                                        <ToggleGroupControlOption key={key} value={item.value} label={item.label} />
                                    ))}
                                </ToggleGroupControl>

                                <RangeControl
                                    label="Title Words"
                                    value={titleLength}
                                    onChange={(value) =>
                                        setAttributes({
                                            titleLength: value,
                                        })
                                    }
                                    min={-1}
                                    max={100}
                                    allowReset={true}
                                    __nextHasNoMarginBottom
                                    __next40pxDefaultSize
                                />
                            </>
                        )}

                        <ToggleControl
                            label={__("Show Excerpt?")}
                            checked={showContent}
                            onChange={() => {
                                setAttributes({
                                    showContent: !showContent,
                                });
                                makeEnableContent(!showContent, "excerpt");
                            }}
                            __nextHasNoMarginBottom
                        />

                        {showContent && (
                            <>
                                <RangeControl
                                    label="Excerpt Words"
                                    value={contentLength}
                                    onChange={(value) =>
                                        setAttributes({
                                            contentLength: value,
                                        })
                                    }
                                    min={-1}
                                    max={100}
                                    allowReset={true}
                                    __nextHasNoMarginBottom
                                    __next40pxDefaultSize
                                />

                                <TextControl
                                    label="Expansion Indicator"
                                    type={"text"}
                                    value={expansionIndicator}
                                    onChange={(text) =>
                                        setAttributes({
                                            expansionIndicator: text,
                                        })
                                    }
                                    __next40pxDefaultSize
                                    __nextHasNoMarginBottom
                                />
                            </>
                        )}

                        <ToggleControl
                            label={__("Show Read More Button?")}
                            checked={showReadMore}
                            onChange={() => {
                                setAttributes({
                                    showReadMore: !showReadMore,
                                });
                            }}
                            __nextHasNoMarginBottom
                        />

                        {showReadMore && (
                            <>
                                <DynamicInputControl
                                    label={__(
                                        "Button Text",
                                        "essential-blocks"
                                    )}
                                    attrName="readmoreText"
                                    inputValue={readmoreText}
                                    setAttributes={
                                        setAttributes
                                    }
                                    onChange={(text) =>
                                        setAttributes({
                                            readmoreText: text,
                                        })
                                    }
                                    enableAi={true}
                                />
                                <InspectorPanel.PanelBody title={__("Icon", "essential-blocks")} initialOpen={false}>
                                    <ToggleControl
                                        label={__("Add icon", "essential-blocks")}
                                        checked={addIcon}
                                        onChange={() =>
                                            setAttributes({
                                                addIcon: !addIcon,
                                            })
                                        }
                                        __nextHasNoMarginBottom
                                    />
                                    {addIcon && (
                                        <>
                                            <EBIconPicker
                                                value={icon}
                                                onChange={(icon) =>
                                                    setAttributes({
                                                        icon,
                                                    })
                                                }
                                            />
                                            <ToggleGroupControl
                                                label={__("Icon Postion", "essential-blocks")}
                                                value={iconPosition}
                                                onChange={(value) => setAttributes({ iconPosition: value })}
                                                isBlock
                                                __next40pxDefaultSize
                                                __nextHasNoMarginBottom
                                            >
                                                {ICON_POSITION.map((item, index) => (
                                                    <ToggleGroupControlOption key={index} value={item.value} label={item.label} />
                                                ))}
                                            </ToggleGroupControl>
                                            <ResponsiveRangeController
                                                baseLabel={__("Size", "essential-blocks")}
                                                controlName={ICON_SIZE}
                                                noUnits={true}
                                            />
                                            <ResponsiveRangeController
                                                baseLabel={__("Gap", "essential-blocks")}
                                                controlName={ICON_SPACE}
                                                noUnits={true}
                                            />
                                        </>
                                    )}
                                </InspectorPanel.PanelBody>
                            </>
                        )}

                        <ToggleControl
                            label={__("Show Meta?")}
                            checked={showMeta}
                            onChange={() => {
                                setAttributes({
                                    showMeta: !showMeta,
                                });
                                makeEnableContent(!showMeta, "meta");
                            }}
                            __nextHasNoMarginBottom
                        />

                        {showMeta && (
                            <>
                                <div className="eb-control-item-wrapper">
                                    <PanelRow>Header Meta</PanelRow>
                                    <Select2
                                        name="select-header-meta"
                                        value={headerMeta.length > 0 ? JSON.parse(headerMeta) : ""}
                                        onChange={(selected) =>
                                            setAttributes({
                                                headerMeta: JSON.stringify(selected),
                                            })
                                        }
                                        options={metaOptions}
                                        isMulti="true"
                                    />
                                </div>

                                <div className="eb-control-item-wrapper">
                                    <PanelRow>Footer Meta</PanelRow>
                                    <Select2
                                        name="select-footer-meta"
                                        value={footerMeta.length > 0 ? JSON.parse(footerMeta) : ""}
                                        onChange={(selected) =>
                                            setAttributes({
                                                footerMeta: JSON.stringify(selected),
                                            })
                                        }
                                        options={metaOptions}
                                        isMulti="true"
                                    />
                                </div>
                                <DynamicInputControl
                                    label={__(
                                        "Author Prefix",
                                        "essential-blocks"
                                    )}
                                    help={__(
                                        "Example: by John Doe",
                                        "essential-blocks"
                                    )}
                                    attrName="authorPrefix"
                                    inputValue={authorPrefix}
                                    setAttributes={
                                        setAttributes
                                    }
                                    onChange={(text) =>
                                        setAttributes({
                                            authorPrefix: text,
                                        })
                                    }
                                />
                                <DynamicInputControl
                                    label={__(
                                        "Published Date Prefix",
                                        "essential-blocks"
                                    )}
                                    help={__(
                                        "Example: on 01/01/2023",
                                        "essential-blocks"
                                    )}
                                    attrName="datePrefix"
                                    inputValue={datePrefix}
                                    setAttributes={
                                        setAttributes
                                    }
                                    onChange={(text) =>
                                        setAttributes({
                                            datePrefix: text,
                                        })
                                    }
                                />
                            </>
                        )}

                        <PanelRow className="separator">Sortable Content</PanelRow>
                        {(preset == "style-1" || preset == "style-2" || preset == "style-3") &&
                            showThumbnail && (
                                <ToggleControl
                                    label={__("Thumbnail Sorting")}
                                    checked={enableThumbnailSort}
                                    onChange={() => {
                                        setAttributes({
                                            enableThumbnailSort: !enableThumbnailSort,
                                        });
                                    }}
                                    __nextHasNoMarginBottom
                                />
                            )
                        }
                        <SortControl
                            items={enableContents}
                            labelKey=""
                            onSortEnd={enableContents => setAttributes({ enableContents })}
                            hasSettings={false}
                            hasAddButton={false}
                            hasDelete={false}
                        ></SortControl>
                    </InspectorPanel.PanelBody>

                    {showFeaturedPost && (
                        <InspectorPanel.PanelBody title={__("Featured Post", "essential-blocks")} initialOpen={false}>
                            <div className="eb-control-item-wrapper ">
                                <PanelRow>{__("Select Featured Post", "essential-blocks")}</PanelRow>
                                <AsyncSelect
                                    cacheOptions
                                    value={
                                        featuredPostId && featuredPostId.length > 0
                                            ? JSON.parse(featuredPostId)
                                            : ""
                                    }
                                    defaultOptions={featuredPostOptions}
                                    placeholder={`Search for ${queryData?.source ? queryData.source : "Posts"}`}
                                    loadOptions={loadFeaturedPosts}
                                    onChange={(selected) =>
                                        setAttributes({
                                            featuredPostId: JSON.stringify(selected),
                                        })
                                    }
                                    menuPortalTarget={document.body}
                                    menuPosition="fixed"
                                    styles={{
                                        menuPortal: (base) => ({
                                            ...base,
                                            zIndex: 9999
                                        }),
                                    }}
                                />
                            </div>

                            <EbImageSizeSelector
                                attrName={"thumbnailSize"}
                                setAttributes={setAttributes}
                            />

                            <ResponsiveRangeController
                                baseLabel={__("Post Height", "essential-blocks")}
                                controlName={POST_MIN_HEIGHT}
                                noUnits
                                min={0}
                                max={1000}
                                step={1}
                            />
                            {preset === "style-4" && (
                                <>
                                    <ResponsiveRangeController
                                        baseLabel={__("Featured Post Width", "essential-blocks")}
                                        controlName={POST_WIDTH}
                                        units={UNIT_TYPES}
                                        min={0}
                                        max={1000}
                                        step={1}
                                    />
                                    <ResponsiveRangeController
                                        baseLabel={__("List Post Width", "essential-blocks")}
                                        controlName={LIST_POST_WIDTH}
                                        units={UNIT_TYPES}
                                        min={0}
                                        max={1000}
                                        step={1}
                                    />
                                </>
                            )}

                            <ToggleControl
                                label={__("Show Title", "essential-blocks")}
                                checked={showFeaturedPostTitle}
                                onChange={() => {
                                    setAttributes({
                                        showFeaturedPostTitle: !showFeaturedPostTitle,
                                    });
                                }}
                            />
                            <ToggleControl
                                label={__("Show Excerpt", "essential-blocks")}
                                checked={showFeaturedPostContent}
                                onChange={() => {
                                    setAttributes({
                                        showFeaturedPostContent: !showFeaturedPostContent,
                                    });
                                }}
                            />
                            {showFeaturedPostContent && (
                                <RangeControl
                                    label={__("Excerpt Words", "essential-blocks")}
                                    value={featuredExcerptLength}
                                    onChange={(value) =>
                                        setAttributes({
                                            featuredExcerptLength: value,
                                        })
                                    }
                                    min={1}
                                    max={1000}
                                    allowReset={true}
                                    resetFallbackValue={10}
                                />
                            )}

                            <ToggleControl
                                label={__("Show Meta", "essential-blocks")}
                                checked={showFeaturedPostMeta}
                                onChange={() => {
                                    setAttributes({
                                        showFeaturedPostMeta: !showFeaturedPostMeta,
                                    });
                                }}
                            />
                            {showFeaturedPostMeta && (
                                <>
                                    <Divider />
                                    <ToggleControl
                                        label={__("Show Header Meta", "essential-blocks")}
                                        checked={showFeaturedHeaderMeta}
                                        onChange={() =>
                                            setAttributes({
                                                showFeaturedHeaderMeta: !showFeaturedHeaderMeta,
                                            })
                                        }
                                    />
                                    {showFeaturedHeaderMeta && headerMeta && headerMeta.length > 0 && (
                                        <>
                                            {JSON.parse(headerMeta).map((item, index) => {
                                                const metaItemsObj = featuredMetaItems ? JSON.parse(featuredMetaItems) : {};
                                                const isChecked = metaItemsObj[item.value] !== undefined ? metaItemsObj[item.value] : true;
                                                return (
                                                    <ToggleControl
                                                        key={index}
                                                        label={__(item.label, "essential-blocks")}
                                                        checked={isChecked}
                                                        onChange={() => {
                                                            const updatedItems = { ...metaItemsObj, [item.value]: !isChecked };
                                                            setAttributes({
                                                                featuredMetaItems: JSON.stringify(updatedItems),
                                                            });
                                                        }}
                                                    />
                                                );
                                            })}
                                        </>
                                    )}
                                    <Divider />
                                    <ToggleControl
                                        label={__("Show Footer Meta", "essential-blocks")}
                                        checked={showFeaturedFooterMeta}
                                        onChange={() =>
                                            setAttributes({
                                                showFeaturedFooterMeta: !showFeaturedFooterMeta,
                                            })
                                        }
                                    />
                                    {showFeaturedFooterMeta && footerMeta && footerMeta.length > 0 && (
                                        <>
                                            {JSON.parse(footerMeta).map((item, index) => {
                                                const metaItemsObj = featuredMetaItems ? JSON.parse(featuredMetaItems) : {};
                                                const isChecked = metaItemsObj[item.value] !== undefined ? metaItemsObj[item.value] : true;
                                                return (
                                                    <ToggleControl
                                                        key={index}
                                                        label={__(item.label, "essential-blocks")}
                                                        checked={isChecked}
                                                        onChange={() => {
                                                            const updatedItems = { ...metaItemsObj, [item.value]: !isChecked };
                                                            setAttributes({
                                                                featuredMetaItems: JSON.stringify(updatedItems),
                                                            });
                                                        }}
                                                    />
                                                );
                                            })}
                                        </>
                                    )}
                                </>
                            )}
                        </InspectorPanel.PanelBody>
                    )}

                    <MorePosts
                        loadMoreOptions={loadMoreOptions}
                        queryData={queryData}
                        setAttributes={setAttributes}
                        initialOpen={false}
                    />
                    <InspectorPanel.PanelBody title={__("Filter By Taxonomy", "essential-blocks")} initialOpen={false}>
                        <ToggleControl
                            label={__("Show Filter By Taxonomy?")}
                            checked={showTaxonomyFilter}
                            onChange={() => {
                                setAttributes({
                                    showTaxonomyFilter: !showTaxonomyFilter,
                                });
                            }}
                            __nextHasNoMarginBottom
                        />
                        {showTaxonomyFilter && (
                            <>
                                <div className="eb-control-item-wrapper">
                                    <PanelRow>Select Taxonomy Type</PanelRow>
                                    <Select2
                                        name="select-header-meta"
                                        value={
                                            selectedTaxonomy && selectedTaxonomy.length > 0
                                                ? JSON.parse(selectedTaxonomy)
                                                : ""
                                        }
                                        onChange={(selected) =>
                                            setAttributes({
                                                selectedTaxonomy: JSON.stringify(selected),
                                            })
                                        }
                                        options={taxonomies}
                                    />
                                </div>
                                {selectedTaxonomy && selectedTaxonomy.length > 0 && (
                                    <>
                                        <div className="eb-control-item-wrapper">
                                            <PanelRow>Select Taxonomy 2</PanelRow>
                                            <Select2
                                                name="select-header-meta"
                                                value={
                                                    selectedTaxonomyItems &&
                                                        selectedTaxonomyItems.length > 0
                                                        ? JSON.parse(selectedTaxonomyItems)
                                                        : ""
                                                }
                                                onChange={(selected) =>
                                                    setAttributes({
                                                        selectedTaxonomyItems: JSON.stringify(selected),
                                                    })
                                                }
                                                options={terms}
                                                isMulti="true"
                                            />
                                        </div>
                                    </>
                                )}
                            </>
                        )}
                    </InspectorPanel.PanelBody>
                    {applyFilters(
                        "eb_post_grid_pro_general_tab",
                        "",
                        attributes,
                        setAttributes,
                    )}
                </InspectorPanel.General>
                <InspectorPanel.Style>
                    {showFeaturedPost && (
                        <InspectorPanel.PanelBody title={__("Featured Post", "essential-blocks")} initialOpen={false}>
                            <ColorControl
                                label={__("Overlay Color", "essential-blocks")}
                                color={featuredOverlayColor}
                                attributeName={'featuredOverlayColor'}
                                isGradient={true}
                            />
                            <RangeControl
                                label={__("Border Radius", "essential-blocks")}
                                value={featuredPostBorderRadius}
                                onChange={(value) =>
                                    setAttributes({
                                        featuredPostBorderRadius: value,
                                    })
                                }
                                min={0}
                                max={100}
                                step={1}
                            />
                            <BorderShadowControl
                                controlName={FEATURED_POST_BORDER}
                                noBorder
                            />
                            <ResponsiveDimensionsControl
                                controlName={FEATURED_POST_PADDING}
                                baseLabel="Content Padding"
                            />
                            <RangeControl
                                label={__("Bottom Spacing", "essential-blocks")}
                                value={featuredPostBottomSpacing}
                                onChange={(value) =>
                                    setAttributes({
                                        featuredPostBottomSpacing: value,
                                    })
                                }
                                min={0}
                                max={1000}
                                step={1}
                            />
                            <ButtonGroupControl
                                label={__("Horizontal Align", "essential-blocks")}
                                options={HORIZONTAL_CONTENT_POSITION}
                                currentValue={featuredPostHorizontalAlign}
                                attrName="featuredPostHorizontalAlign"
                                onChange={(featuredPostHorizontalAlign) => setAttributes({ featuredPostHorizontalAlign })}
                            />

                            {/* not display Vertical Align for preset 7, 8 */}

                            {!(preset === "pro-style-7" || preset === "pro-style-8") && (
                                <>
                                    <ButtonGroupControl
                                        label={__("Vertical Align", "essential-blocks")}
                                        options={VERTICAL_CONTENT_POSITION}
                                        currentValue={featuredPostVerticalAlign}
                                        attrName="featuredPostVerticalAlign"
                                        onChange={(featuredPostVerticalAlign) => setAttributes({ featuredPostVerticalAlign })}
                                    />
                                </>
                            )}

                            <BaseControl>
                                <h3 className="eb-control-title">
                                    {__("Title Style", "essential-blocks")}
                                </h3>
                            </BaseControl>
                            <TypographyDropdown
                                baseLabel={__("Typography", "essential-blocks")}
                                typographyPrefixConstant={FEATURED_TITLE_TYPO}
                            />
                            <ColorControl
                                label={__("Title Color", "essential-blocks")}
                                color={featuredTitleColor}
                                attributeName={'featuredTitleColor'}
                            />
                            <ColorControl
                                label={__("Title Hover Color", "essential-blocks")}
                                color={featuredTitleHoverColor}
                                attributeName={'featuredTitleHoverColor'}
                            />
                            <ResponsiveDimensionsControl
                                controlName={FEATURED_TITLE_PADDING}
                                baseLabel="Title Padding"
                            />
                            <Divider />
                            <BaseControl>
                                <h3 className="eb-control-title">
                                    {__("Excerpt Style", "essential-blocks")}
                                </h3>
                            </BaseControl>
                            <TypographyDropdown
                                baseLabel={__("Typography", "essential-blocks")}
                                typographyPrefixConstant={FEATURED_EXCERPT_TYPO}
                            />
                            <ColorControl
                                label={__("Color", "essential-blocks")}
                                color={featuredExcerptColor}
                                attributeName={'featuredExcerptColor'}
                            />
                            <ColorControl
                                label={__("Hover Color", "essential-blocks")}
                                color={featuredExcerptHoverColor}
                                attributeName={'featuredExcerptHoverColor'}
                            />
                            <ResponsiveDimensionsControl
                                controlName={FEATURED_EXCERPT_PADDING}
                                baseLabel="Excerpt Padding"
                            />
                            <Divider />
                            <BaseControl>
                                <h3 className="eb-control-title">
                                    {__("Meta Style", "essential-blocks")}
                                </h3>
                            </BaseControl>
                            <TypographyDropdown
                                baseLabel={__("Typography", "essential-blocks")}
                                typographyPrefixConstant={FEATURED_META_TYPO}
                            />
                            <ButtonGroupControl
                                options={NORMAL_HOVER}
                                currentValue={featuredPostMetaStatus}
                                attrName="featuredPostMetaStatus"
                                onChange={(featuredPostMetaStatus) => setAttributes({ featuredPostMetaStatus })}
                            />
                            {featuredPostMetaStatus === "normal" && (
                                <>
                                    <ColorControl
                                        label={__("Author Color", "essential-blocks")}
                                        color={featuredPostAuthorMetaColor}
                                        attributeName={'featuredPostAuthorMetaColor'}
                                    />
                                    <ColorControl
                                        label={__("Date Color", "essential-blocks")}
                                        color={featuredPostDateMetaColor}
                                        attributeName={'featuredPostDateMetaColor'}
                                    />
                                    <ColorControl
                                        label={__("Common Meta Color", "essential-blocks")}
                                        color={featuredPostCommonMetaColor}
                                        attributeName={'featuredPostCommonMetaColor'}
                                    />
                                    <ColorControl
                                        label={__("Common Meta BG Color", "essential-blocks")}
                                        color={featuredPostCommonMetaBgColor}
                                        attributeName={'featuredPostCommonMetaBgColor'}
                                    />
                                    <ColorControl
                                        label={__("Category Color", "essential-blocks")}
                                        color={featuredPostCategoryMetaColor}
                                        attributeName={'featuredPostCategoryMetaColor'}
                                    />
                                    <ColorControl
                                        label={__("Category BG Color", "essential-blocks")}
                                        color={featuredPostCategoryMetaBgColor}
                                        attributeName={'featuredPostCategoryMetaBgColor'}
                                    />
                                    <ColorControl
                                        label={__("Tag Color", "essential-blocks")}
                                        color={featuredPostTagMetaColor}
                                        attributeName={'featuredPostTagMetaColor'}
                                    />
                                    <ColorControl
                                        label={__("Tag BG Color", "essential-blocks")}
                                        color={featuredPostTagMetaBgColor}
                                        attributeName={'featuredPostTagMetaBgColor'}
                                    />
                                    <ColorControl
                                        label={__("Read Time Color", "essential-blocks")}
                                        color={featuredPostReadTimeMetaColor}
                                        attributeName={'featuredPostReadTimeMetaColor'}
                                    />
                                    <ColorControl
                                        label={__("Dynamic Data Color", "essential-blocks")}
                                        color={featuredPostDynamicMetaColor}
                                        attributeName={'featuredPostDynamicMetaColor'}
                                    />
                                    <ColorControl
                                        label={__("Dynamic Data BG Color", "essential-blocks")}
                                        color={featuredPostDynamicMetaBgColor}
                                        attributeName={'featuredPostDynamicMetaBgColor'}
                                    />
                                </>
                            )}

                            {featuredPostMetaStatus === "hover" && (
                                <>
                                    <ColorControl
                                        label={__("Author Color", "essential-blocks")}
                                        color={featuredPostAuthorMetaHoverColor}
                                        attributeName={'featuredPostAuthorMetaHoverColor'}
                                    />

                                    <ColorControl
                                        label={__("Common Meta Color", "essential-blocks")}
                                        color={featuredPostCommonMetaHoverColor}
                                        attributeName={'featuredPostCommonMetaHoverColor'}
                                    />
                                    <ColorControl
                                        label={__("Common Meta BG Color", "essential-blocks")}
                                        color={featuredPostCommonMetaHoverBgColor}
                                        attributeName={'featuredPostCommonMetaHoverBgColor'}
                                    />
                                    <ColorControl
                                        label={__("Category Color", "essential-blocks")}
                                        color={featuredPostCategoryMetaHoverColor}
                                        attributeName={'featuredPostCategoryMetaHoverColor'}
                                    />
                                    <ColorControl
                                        label={__("Category BG Color", "essential-blocks")}
                                        color={featuredPostCategoryMetaHoverBgColor}
                                        attributeName={'featuredPostCategoryMetaHoverBgColor'}
                                    />
                                    <ColorControl
                                        label={__("Tag Color", "essential-blocks")}
                                        color={featuredPostTagMetaHoverColor}
                                        attributeName={'featuredPostTagMetaHoverColor'}
                                    />
                                    <ColorControl
                                        label={__("Tag BG Color", "essential-blocks")}
                                        color={featuredPostTagMetaHoverBgColor}
                                        attributeName={'featuredPostTagMetaHoverBgColor'}
                                    />
                                </>
                            )}
                            <Divider />
                            <ResponsiveDimensionsControl
                                controlName={FEATURED_META_PADDING}
                                baseLabel="Meta Padding"
                            />
                            <ResponsiveDimensionsControl
                                controlName={FEATURED_AVATAR_RADIUS}
                                baseLabel="Avatar Radius"
                            />
                            <BaseControl
                                label={__("Category Border & Shadow", "essential-blocks")}
                            ></BaseControl>
                            <BorderShadowControl
                                controlName={FEATURED_META_BORDER}
                            />
                        </InspectorPanel.PanelBody>
                    )}

                    <InspectorPanel.PanelBody title={__("Columns", "essential-blocks")} initialOpen={false}>
                        <ResponsiveDimensionsControl
                            controlName={COLUMN_PADDING}
                            baseLabel="Padding"
                        />
                        <InspectorPanel.PanelBody title={__("Background", "essential-blocks")} initialOpen={false}>
                            <BackgroundControl
                                controlName={COLUMN_BG}
                                noOverlay
                            />
                        </InspectorPanel.PanelBody>
                        <InspectorPanel.PanelBody title={__("Border & Shadow")} initialOpen={false}>
                            <BorderShadowControl
                                controlName={COLUMN_BORDER_SHADOW}
                            // noShadow
                            // noBorder
                            />
                        </InspectorPanel.PanelBody>
                    </InspectorPanel.PanelBody>

                    {showThumbnail && (
                        <InspectorPanel.PanelBody title={__("Thumbnail", "essential-blocks")} initialOpen={false}>
                            <ResponsiveDimensionsControl
                                controlName={THUMBNAIL_BORDER_RADIUS}
                                baseLabel="Border Radius"
                            />
                            <ResponsiveDimensionsControl
                                controlName={THUMBNAIL_MARGIN}
                                baseLabel="Margin"
                            />
                            <ColorControl
                                label={__("Overlay Color", "essential-blocks")}
                                color={thumbnailOverlayColor}
                                attributeName={'thumbnailOverlayColor'}
                            />
                            <ColorControl
                                label={__("Overlay Hover Color", "essential-blocks")}
                                color={thumbnailOverlayHoverColor}
                                attributeName={'thumbnailOverlayHoverColor'}
                            />
                        </InspectorPanel.PanelBody>
                    )}

                    {showTitle && (
                        <InspectorPanel.PanelBody title={__("Title", "essential-blocks")} initialOpen={false}>
                            <TypographyDropdown
                                baseLabel={__("Typography", "essential-blocks")}
                                typographyPrefixConstant={EBPG_TITLE_TYPOGRAPHY}
                            />
                            <ToggleGroupControl
                                label={__("Alignment", "essential-blocks")}
                                value={titleTextAlign}
                                onChange={(value) => setAttributes({ titleTextAlign: value })}
                                isBlock
                                __next40pxDefaultSize
                                __nextHasNoMarginBottom
                            >
                                {TEXT_ALIGN.map((item, index) => (
                                    <ToggleGroupControlOption key={index} value={item.value} label={item.label} />
                                ))}
                            </ToggleGroupControl>

                            <ToggleGroupControl
                                label=""
                                hideLabelFromVision
                                value={titleColorStyle}
                                onChange={(value) => setAttributes({ titleColorStyle: value })}
                                isBlock
                                __next40pxDefaultSize
                                __nextHasNoMarginBottom
                            >
                                {NORMAL_HOVER.map((item, index) => (
                                    <ToggleGroupControlOption key={index} value={item.value} label={item.label} />
                                ))}
                            </ToggleGroupControl>

                            {titleColorStyle === "normal" && (
                                <ColorControl
                                    label={__("Color", "essential-blocks")}
                                    color={titleColor}
                                    attributeName={'titleColor'}
                                />
                            )}

                            {titleColorStyle === "hover" && (
                                <ColorControl
                                    label={__("Color", "essential-blocks")}
                                    color={titleHoverColor}
                                    attributeName={'titleHoverColor'}
                                />
                            )}

                            <ResponsiveDimensionsControl
                                controlName={TITLE_PADDING}
                                baseLabel="Padding"
                            />

                            <ResponsiveDimensionsControl
                                controlName={TITLE_MARGIN}
                                baseLabel="Margin"
                            />

                            <InspectorPanel.PanelBody title={__("Border & Shadow")} initialOpen={false}>
                                <BorderShadowControl
                                    controlName={TITLE_BORDER_SHADOW}
                                // noShadow
                                // noBorder
                                />
                            </InspectorPanel.PanelBody>
                        </InspectorPanel.PanelBody>
                    )}

                    {showContent && (
                        <InspectorPanel.PanelBody title={__("Excerpt", "essential-blocks")} initialOpen={false}>
                            <ColorControl
                                label={__("Color", "essential-blocks")}
                                color={contentColor}
                                attributeName={'contentColor'}
                            />
                            <ToggleGroupControl
                                label={__("Alignment", "essential-blocks")}
                                value={contentTextAlign}
                                onChange={(value) => setAttributes({ contentTextAlign: value })}
                                isBlock
                                __next40pxDefaultSize
                                __nextHasNoMarginBottom
                            >
                                {TEXT_ALIGN.map((item, index) => (
                                    <ToggleGroupControlOption key={index} value={item.value} label={item.label} />
                                ))}
                            </ToggleGroupControl>
                            <TypographyDropdown
                                baseLabel={__("Typography", "essential-blocks")}
                                typographyPrefixConstant={EBPG_CONTENT_TYPOGRAPHY}
                            />
                            <ResponsiveDimensionsControl
                                controlName={CONTENT_MARGIN}
                                baseLabel="Margin"
                            />
                        </InspectorPanel.PanelBody>
                    )}

                    {showReadMore && (
                        <InspectorPanel.PanelBody
                            title={__("Read More Button", "essential-blocks")}
                            initialOpen={false}
                        >
                            <ToggleGroupControl
                                label=""
                                hideLabelFromVision
                                value={readmoreColorType}
                                onChange={(value) => setAttributes({ readmoreColorType: value })}
                                isBlock
                                __next40pxDefaultSize
                                __nextHasNoMarginBottom
                            >
                                {NORMAL_HOVER.map((item, index) => (
                                    <ToggleGroupControlOption key={index} value={item.value} label={item.label} />
                                ))}
                            </ToggleGroupControl>

                            {readmoreColorType === "normal" && (
                                <>
                                    <ColorControl
                                        label={__("Color", "essential-blocks")}
                                        color={readmoreColor}
                                        attributeName={'readmoreColor'}
                                    />
                                    <ColorControl
                                        label={__("Background Color", "essential-blocks")}
                                        color={readmoreBGColor}
                                        attributeName={'readmoreBGColor'}
                                    />
                                </>
                            )}

                            {readmoreColorType === "hover" && (
                                <>
                                    <ColorControl
                                        label={__("Color", "essential-blocks")}
                                        color={readmoreHoverColor}
                                        attributeName={'readmoreHoverColor'}
                                    />
                                    <ColorControl
                                        label={__("Background Color", "essential-blocks")}
                                        color={readmoreBGHoverColor}
                                        attributeName={'readmoreBGHoverColor'}
                                    />
                                </>
                            )}

                            <ToggleGroupControl
                                label={__("Alignment", "essential-blocks")}
                                value={readmoreTextAlign}
                                onChange={(value) => setAttributes({ readmoreTextAlign: value })}
                                isBlock
                                __next40pxDefaultSize
                                __nextHasNoMarginBottom
                            >
                                {TEXT_ALIGN.map((item, index) => (
                                    <ToggleGroupControlOption key={index} value={item.value} label={item.label} />
                                ))}
                            </ToggleGroupControl>
                            <TypographyDropdown
                                baseLabel={__("Typography", "essential-blocks")}
                                typographyPrefixConstant={EBPG_READMORE_TYPOGRAPHY}
                            />
                            <ResponsiveDimensionsControl
                                controlName={READMORE_MARGIN}
                                baseLabel="Margin"
                            />
                            <ResponsiveDimensionsControl
                                controlName={READMORE_PADDING}
                                baseLabel="Padding"
                            />
                            <InspectorPanel.PanelBody title={__("Border & Shadow")} initialOpen={false}>
                                <BorderShadowControl
                                    controlName={READMORE_BORDER_SHADOW}
                                    noShadow
                                // noBorder
                                />
                            </InspectorPanel.PanelBody>
                        </InspectorPanel.PanelBody>
                    )}

                    {showMeta && (
                        <InspectorPanel.PanelBody title={__("Meta Styles", "essential-blocks")} initialOpen={false}>
                            <ButtonGroupControl
                                label={__("Header Meta Alignment", "essential-blocks")}
                                attrName={'headerMetaTextAlign'}
                                options={CONTENT_POSITION}
                                currentValue={headerMetaTextAlign}
                            />
                            <ResponsiveRangeController
                                baseLabel={__("Header Meta Gap", "essential-blocks")}
                                controlName={HEADER_META_SPACE}
                                units={UNIT_TYPES}
                                min={1}
                                max={100}
                                step={1}
                            />
                            <ResponsiveDimensionsControl
                                controlName={HEADER_META_MARGIN}
                                baseLabel="Header Meta Margin"
                            />
                            <ButtonGroupControl
                                label={__("Footer Meta Alignment", "essential-blocks")}
                                options={CONTENT_POSITION}
                                currentValue={footerMetaTextAlign}
                                attrName={'footerMetaTextAlign'}
                            />
                            <ResponsiveRangeController
                                baseLabel={__("Footer Meta Gap", "essential-blocks")}
                                controlName={FOOTER_META_SPACE}
                                units={UNIT_TYPES}
                                min={1}
                                max={100}
                                step={1}
                            />
                            <ResponsiveDimensionsControl
                                controlName={FOOTER_META_MARGIN}
                                baseLabel="Footer Meta Margin"
                            />

                            <ToggleGroupControl
                                label=""
                                hideLabelFromVision
                                value={metaColorType}
                                onChange={(value) => setAttributes({ metaColorType: value })}
                                isBlock
                                __next40pxDefaultSize
                                __nextHasNoMarginBottom
                            >
                                {NORMAL_HOVER.map((item, index) => (
                                    <ToggleGroupControlOption key={index} value={item.value} label={item.label} />
                                ))}
                            </ToggleGroupControl>

                            {metaColorType === "normal" && (
                                <>
                                    <ColorControl
                                        label={__(
                                            "Author Color",
                                            "essential-blocks"
                                        )}
                                        color={authorMetaColor}
                                        attributeName={'authorMetaColor'}
                                    />
                                    <ColorControl
                                        label={__(
                                            "Date Color",
                                            "essential-blocks"
                                        )}
                                        color={dateMetaColor}
                                        attributeName={'dateMetaColor'}
                                    />
                                    <ColorControl
                                        label={__(
                                            "Common Meta Color",
                                            "essential-blocks"
                                        )}
                                        color={commonMetaColor}
                                        attributeName={'commonMetaColor'}
                                    />
                                    <ColorControl
                                        label={__(
                                            "Common Meta BG Color",
                                            "essential-blocks"
                                        )}
                                        color={
                                            commonMetaBgColor
                                        }
                                        attributeName={'commonMetaBgColor'}
                                    />
                                    <ColorControl
                                        label={__(
                                            "Category Color",
                                            "essential-blocks"
                                        )}
                                        color={
                                            categoryMetaColor
                                        }
                                        attributeName={'categoryMetaColor'}
                                    />
                                    <ColorControl
                                        label={__(
                                            "Category BG Color",
                                            "essential-blocks"
                                        )}
                                        color={
                                            categoryMetaBgColor
                                        }
                                        attributeName={'categoryMetaBgColor'}
                                    />
                                    <ColorControl
                                        label={__(
                                            "Tag Color",
                                            "essential-blocks"
                                        )}
                                        color={tagMetaColor}
                                        attributeName={'tagMetaColor'}
                                    />
                                    <ColorControl
                                        label={__(
                                            "Tag BG Color",
                                            "essential-blocks"
                                        )}
                                        color={tagMetaBgColor}
                                        attributeName={'tagMetaBgColor'}
                                    />
                                    <ColorControl
                                        label={__(
                                            "Read Time Color",
                                            "essential-blocks"
                                        )}
                                        color={
                                            ReadTimeMetaColor
                                        }
                                        attributeName={'ReadTimeMetaColor'}
                                    />
                                    <ColorControl
                                        label={__(
                                            "Dynamic Data Color",
                                            "essential-blocks"
                                        )}
                                        color={dynamicMetaColor}
                                        attributeName={'dynamicMetaColor'}
                                    />
                                    <ColorControl
                                        label={__(
                                            "Dynamic Data BG Color",
                                            "essential-blocks"
                                        )}
                                        color={
                                            dynamicMetaBgColor
                                        }
                                        attributeName={'dynamicMetaBgColor'}
                                    />
                                </>
                            )}

                            {metaColorType === "hover" && (
                                <>
                                    <ColorControl
                                        label={__(
                                            "Author Color",
                                            "essential-blocks"
                                        )}
                                        color={
                                            authorMetaHoverColor
                                        }
                                        attributeName={'authorMetaHoverColor'}
                                    />

                                    <ColorControl
                                        label={__(
                                            "Common Meta Color",
                                            "essential-blocks"
                                        )}
                                        color={
                                            commonMetaHoverColor
                                        }
                                        attributeName={'commonMetaHoverColor'}
                                    />
                                    <ColorControl
                                        label={__(
                                            "Common Meta BG Color",
                                            "essential-blocks"
                                        )}
                                        color={
                                            commonMetaBgHoverColor
                                        }
                                        attributeName={'commonMetaBgHoverColor'}
                                    />
                                    <ColorControl
                                        label={__(
                                            "Category Color",
                                            "essential-blocks"
                                        )}
                                        color={
                                            categoryMetaHoverColor
                                        }
                                        attributeName={'categoryMetaHoverColor'}
                                    />
                                    <ColorControl
                                        label={__(
                                            "Category BG Color",
                                            "essential-blocks"
                                        )}
                                        color={
                                            categoryMetaBgHoverColor
                                        }
                                        attributeName={'categoryMetaBgHoverColor'}
                                    />
                                    <ColorControl
                                        label={__(
                                            "Tag Color",
                                            "essential-blocks"
                                        )}
                                        color={
                                            tagMetaHoverColor
                                        }
                                        attributeName={'tagMetaHoverColor'}
                                    />
                                    <ColorControl
                                        label={__(
                                            "Tag BG Color",
                                            "essential-blocks"
                                        )}
                                        color={
                                            tagMetaBgHoverColor
                                        }
                                        attributeName={'tagMetaBgHoverColor'}
                                    />
                                </>
                            )}

                            <TypographyDropdown
                                baseLabel={__("Meta Typography", "essential-blocks")}
                                typographyPrefixConstant={EBPG_META_TYPOGRAPHY}
                            />

                            <ResponsiveDimensionsControl
                                controlName={AVATAR_BORDER_RADIUS}
                                baseLabel="Avatar Radius"
                            />
                        </InspectorPanel.PanelBody>
                    )}

                    {loadMoreOptions?.enableMorePosts && (
                        <>
                            <InspectorPanel.PanelBody title={__("Load More Styles", "essential-blocks")} initialOpen={false}>
                                {/* If load More type "Load More Button" */}
                                {loadMoreOptions.loadMoreType === "1" && (
                                    <ToggleGroupControl
                                        label=""
                                        hideLabelFromVision
                                        value={loadMoreColorType}
                                        onChange={(value) => setAttributes({ loadMoreColorType: value })}
                                        isBlock
                                        __next40pxDefaultSize
                                        __nextHasNoMarginBottom
                                    >
                                        {NORMAL_HOVER.map((item, index) => (
                                            <ToggleGroupControlOption key={index} value={item.value} label={item.label} />
                                        ))}
                                    </ToggleGroupControl>
                                )}

                                {/* If load More type "Pagination" */}
                                {loadMoreOptions.loadMoreType === "2" && (
                                    <ToggleGroupControl
                                        label=""
                                        hideLabelFromVision
                                        value={loadMoreColorType}
                                        onChange={(value) => setAttributes({ loadMoreColorType: value })}
                                        isBlock
                                        __next40pxDefaultSize
                                        __nextHasNoMarginBottom
                                    >
                                        {NORMAL_HOVER_ACTIVE.map((item, index) => (
                                            <ToggleGroupControlOption key={index} value={item.value} label={item.label} />
                                        ))}
                                    </ToggleGroupControl>
                                )}

                                {loadMoreColorType === "normal" && (
                                    <>
                                        <ColorControl
                                            label={__("Color", "essential-blocks")}
                                            color={loadMoreColor}
                                            attributeName={'loadMoreColor'}
                                        />
                                        <ColorControl
                                            label={__(
                                                "Background Color",
                                                "essential-blocks"
                                            )}
                                            color={
                                                loadMoreBgColor
                                            }
                                            attributeName={'loadMoreBgColor'}
                                        />
                                    </>
                                )}
                                {loadMoreColorType ===
                                    "hover" && (
                                        <>
                                            <ColorControl
                                                label={__(
                                                    "Color",
                                                    "essential-blocks"
                                                )}
                                                color={
                                                    loadMoreHoverColor
                                                }
                                                attributeName={'loadMoreHoverColor'}
                                            />
                                            <ColorControl
                                                label={__(
                                                    "Background Color",
                                                    "essential-blocks"
                                                )}
                                                color={
                                                    loadMoreHoverBgColor
                                                }
                                                attributeName={'loadMoreHoverBgColor'}
                                            />
                                        </>
                                    )}
                                {loadMoreColorType ===
                                    "active" && (
                                        <>
                                            <ColorControl
                                                label={__(
                                                    "Color",
                                                    "essential-blocks"
                                                )}
                                                color={
                                                    loadMoreActiveColor
                                                }
                                                attributeName={'loadMoreActiveColor'}
                                            />
                                            <ColorControl
                                                label={__(
                                                    "Background Color",
                                                    "essential-blocks"
                                                )}
                                                color={
                                                    loadMoreHoverBgColor
                                                }
                                                attributeName={'loadMoreHoverBgColor'}
                                            />
                                        </>
                                    )}

                                <TypographyDropdown
                                    baseLabel={__("Typography", "essential-blocks")}
                                    typographyPrefixConstant={EBPG_LOAD_MORE_TYPOGRAPHY}
                                />

                                <InspectorPanel.PanelBody>
                                    <ResponsiveDimensionsControl
                                        controlName={LOADMORE_MARGIN}
                                        baseLabel="Margin"
                                    />
                                    <ResponsiveDimensionsControl
                                        controlName={LOADMORE_PADDING}
                                        baseLabel="Padding"
                                    />
                                </InspectorPanel.PanelBody>
                                <InspectorPanel.PanelBody title={__("Border & Shadow")} initialOpen={false}>
                                    <BorderShadowControl
                                        controlName={LOADMORE_BORDER_SHADOW}
                                        noShadow
                                    // noBorder
                                    />
                                </InspectorPanel.PanelBody>
                            </InspectorPanel.PanelBody>
                        </>
                    )}

                    {showTaxonomyFilter && (
                        <InspectorPanel.PanelBody title={__("Taxonomy Filter Style")} initialOpen={false}>
                            <ToggleGroupControl
                                label=""
                                hideLabelFromVision
                                value={filterColorStyle}
                                onChange={(value) => setAttributes({ filterColorStyle: value })}
                                isBlock
                                __next40pxDefaultSize
                                __nextHasNoMarginBottom
                            >
                                {NORMAL_HOVER.map((item, index) => (
                                    <ToggleGroupControlOption key={index} value={item.value} label={item.label} />
                                ))}
                            </ToggleGroupControl>
                            {filterColorStyle ===
                                "normal" && (
                                    <>
                                        <ColorControl
                                            label={__(
                                                "Background Color",
                                                "essential-blocks"
                                            )}
                                            color={
                                                filterBgColor
                                            }
                                            attributeName={'filterBgColor'}
                                        />
                                        <ColorControl
                                            label={__(
                                                "Text Color",
                                                "essential-blocks"
                                            )}
                                            color={
                                                filterTextColor
                                            }
                                            attributeName={'filterTextColor'}
                                        />
                                        <ColorControl
                                            label={__(
                                                "Active Background Color",
                                                "essential-blocks"
                                            )}
                                            color={
                                                filterActiveBgColor
                                            }
                                            attributeName={'filterActiveBgColor'}
                                        />
                                        <ColorControl
                                            label={__(
                                                "Active Text Color",
                                                "essential-blocks"
                                            )}
                                            color={
                                                filterActiveTextColor
                                            }
                                            attributeName={'filterActiveTextColor'}
                                        />
                                    </>
                                )}
                            {filterColorStyle ===
                                "hover" && (
                                    <>
                                        <ColorControl
                                            label={__(
                                                "Hover Background Color",
                                                "essential-blocks"
                                            )}
                                            color={
                                                filterHoverBgColor
                                            }
                                            attributeName={'filterHoverBgColor'}
                                        />
                                        <ColorControl
                                            label={__(
                                                "Hover Text Color",
                                                "essential-blocks"
                                            )}
                                            color={
                                                filterHoverTextColor
                                            }
                                            attributeName={'filterHoverTextColor'}
                                        />
                                    </>
                                )}
                            <ResponsiveRangeController
                                baseLabel={__("Items Gap", "essential-blocks")}
                                controlName={FILTER_ITEM_GAP}
                                units={UNIT_TYPES}
                                min={1}
                                max={100}
                                step={1}
                            />
                            <TypographyDropdown
                                baseLabel={__("Items Typography", "essential-blocks")}
                                typographyPrefixConstant={FILTER_ITEM_TYPOGRAPHY}
                            />
                            <ResponsiveDimensionsControl
                                controlName={FILTER_MARGIN}
                                baseLabel="Filter Wrapper Margin"
                            />
                            <ResponsiveDimensionsControl
                                controlName={FILTER_ITEM_PADDING}
                                baseLabel="Items Padding"
                            />
                            <InspectorPanel.PanelBody title={__("Items Border")} initialOpen={false}>
                                <BorderShadowControl
                                    controlName={FILTER_ITEM_BORDER_SHADOW}
                                // noShadow
                                // noBorder
                                />
                            </InspectorPanel.PanelBody>
                        </InspectorPanel.PanelBody>
                    )}
                    {applyFilters(
                        "eb_post_grid_pro_style_tab",
                        "",
                        attributes,
                        setAttributes
                    )}
                </InspectorPanel.Style>
            </InspectorPanel>
        </>
    );
}

export default withSelect((select, ownProps) => {
    const {
        queryData,
        selectedTaxonomy,
        showTaxonomyFilter
    } = ownProps.attributes;

    if (showTaxonomyFilter) {
        //Get Taxonomies by post type
        const postTypes = select("core").getPostTypes({ per_page: -1 });

        //Get Terms
        const selectedTax = selectedTaxonomy ? JSON.parse(selectedTaxonomy).value : "category";
        const terms = select("core").getEntityRecords("taxonomy", selectedTax, {
            per_page: -1,
        });
        const termArr = [
            {
                label: "All",
                value: "all",
            },
        ];
        if (terms && typeof terms === "object" && terms.length > 0) {
            terms.map((term, index) => {
                termArr.push({
                    label: term.name,
                    value: term.slug,
                });
            });
        }

        return {
            taxonomyData: {
                taxonomies: taxonomyFilter(postTypes, queryData),
                terms: termArr,
            },
        };
    }
    else {
        return {
            taxonomyData: {
                taxonomies: [],
                terms: [],
            },
        };
    }

})(Inspector);

//Function for filter taxonomies
const taxonomyFilter = (postTypes, queryData) => {
    const capitalize = (word) => {
        return word[0].toUpperCase() + word.slice(1).toLowerCase();
    };

    const defaultValue = [{ label: "Category", value: "category" }];

    if (!postTypes || postTypes.length === 0 || postTypes === null) {
        return defaultValue;
    }

    const postType = queryData && queryData.source ? queryData.source : "post";

    if (typeof postTypes === "object" || postTypes.length > 0) {
        const filteredValues = [];
        postTypes.map((item, index) => {
            if (
                item.slug === postType &&
                item.taxonomies &&
                typeof item.taxonomies === "object" &&
                item.taxonomies.length > 0
            ) {
                item.taxonomies.map((taxonomy) => {
                    filteredValues.push({
                        label: capitalize(taxonomy.replace(/[^a-zA-Z ]/g, " ")),
                        value: taxonomy,
                    });
                });
            }
        });
        return filteredValues;
    }

    return defaultValue;
};
