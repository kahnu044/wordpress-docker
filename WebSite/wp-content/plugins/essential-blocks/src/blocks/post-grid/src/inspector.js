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
} from "@wordpress/components";
import { withSelect } from "@wordpress/data";
import { applyFilters } from "@wordpress/hooks";

/**
 * External Dependencies
 */
import Select2 from "react-select";

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
    TITLE_MARGIN,
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
} from "./constants/constants";
import {
    EBPG_TITLE_TYPOGRAPHY,
    EBPG_CONTENT_TYPOGRAPHY,
    EBPG_READMORE_TYPOGRAPHY,
    EBPG_META_TYPOGRAPHY,
    EBPG_LOAD_MORE_TYPOGRAPHY,
    FILTER_ITEM_TYPOGRAPHY,
} from "./constants/typographyPrefixConstants";

import objAttributes from "./attributes";

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
    ButtonGroupControl
 } from "@essential-blocks/controls";

function Inspector(props) {
    const { attributes, setAttributes, taxonomyData, setQueryResults } = props;
    const { terms, taxonomies } = taxonomyData;
    const {
        resOption,
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
    } = attributes;

    const [metaOptions, setMetaOptions] = useState([]);
    const [defaultFilterOptions, setDefaultFilterOptions] = useState('');

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
                setMetaOptions(resp);
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

    const ucFirst = (string) => string.charAt(0).toUpperCase() + string.slice(1);

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

    useEffect(()=>{
        setAttributes({selectedTaxonomyItems: '[{"value":"all","label":"All"}]'})
    },[selectedTaxonomy])

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
                                    attrname={"thumbnailSize"}
                                    setAttributes={setAttributes}
                                />
                            </>
                        )}

                        {(preset === "style-4" || preset === "style-5" || preset === "pro-style-6") && (
                            <BaseControl
                                label={__("Content Vertical Alignment", "essential-blocks")}
                                id="essential-blocks"
                            >
                                <ButtonGroup id="essential-blocks">
                                    {VERTICAL_POSITION.map((item, index) => (
                                        <Button
                                            key={index}
                                            // isLarge
                                            isPrimary={styleVerticalAlignment === item.value}
                                            isSecondary={styleVerticalAlignment !== item.value}
                                            onClick={() =>
                                                setAttributes({
                                                    styleVerticalAlignment: item.value,
                                                })
                                            }
                                        >
                                            {item.label}
                                        </Button>
                                    ))}
                                </ButtonGroup>
                            </BaseControl>
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
                        />

                        {showTitle && (
                            <>
                                <SelectControl
                                    label={__("Title Tag", "essential-blocks")}
                                    value={titleTag}
                                    options={TITLE_TAGS}
                                    onChange={(value) => {
                                        setAttributes({
                                            titleTag: value,
                                        });
                                    }}
                                />

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
                                            <BaseControl label={__("Icon Postion", "essential-blocks")}>
                                                <ButtonGroup id="eb-button-group-alignment">
                                                    {ICON_POSITION.map((item, index) => (
                                                        <Button
                                                            key={index}
                                                            isPrimary={iconPosition === item.value}
                                                            isSecondary={iconPosition !== item.value}
                                                            onClick={() =>
                                                                setAttributes({
                                                                    iconPosition: item.value,
                                                                })
                                                            }
                                                        >
                                                            {item.label}
                                                        </Button>
                                                    ))}
                                                </ButtonGroup>
                                            </BaseControl>
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
                    </InspectorPanel.PanelBody>

                    <InspectorPanel.PanelBody
                        title={__("Sortable Content", "essential-blocks-pro")}
                        initialOpen={false}
                    >
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
                                />
                            )}
                        <SortControl
                            items={enableContents}
                            labelKey=""
                            onSortEnd={enableContents => setAttributes({ enableContents })}
                            hasSettings={false}
                            hasAddButton={false}
                            hasDelete={false}
                        ></SortControl>
                    </InspectorPanel.PanelBody>

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
                                        <SelectControl
                                            label={__(
                                                "Default Selected Filter",
                                                "essential-blocks"
                                            )}
                                            value={defaultFilter}
                                            options={defaultFilterOptions}
                                            onChange={(selected) =>
                                                setAttributes({ defaultFilter: selected })
                                            }
                                        />
                                        <div className="eb-control-item-wrapper">
                                            <PanelRow>Select Taxonomy</PanelRow>
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
                            <ButtonGroup className="eb-inspector-btn-group">
                                {NORMAL_HOVER.map((item, index) => (
                                    <Button
                                        key={index}
                                        // isLarge
                                        isPrimary={titleColorStyle === item.value}
                                        isSecondary={titleColorStyle !== item.value}
                                        onClick={() =>
                                            setAttributes({
                                                titleColorStyle: item.value,
                                            })
                                        }
                                    >
                                        {item.label}
                                    </Button>
                                ))}
                            </ButtonGroup>

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
                            <BaseControl
                                label={__("Alignment", "essential-blocks")}
                                id="essential-blocks"
                            >
                                <ButtonGroup id="essential-blocks">
                                    {TEXT_ALIGN.map((item, index) => (
                                        <Button
                                            key={index}
                                            // isLarge
                                            isPrimary={titleTextAlign === item.value}
                                            isSecondary={titleTextAlign !== item.value}
                                            onClick={() =>
                                                setAttributes({
                                                    titleTextAlign: item.value,
                                                })
                                            }
                                        >
                                            {item.label}
                                        </Button>
                                    )
                                    )}
                                </ButtonGroup>
                            </BaseControl>

                            <TypographyDropdown
                                baseLabel={__("Typography", "essential-blocks")}
                                typographyPrefixConstant={EBPG_TITLE_TYPOGRAPHY}
                            />
                            <ResponsiveDimensionsControl
                                controlName={TITLE_MARGIN}
                                baseLabel="Margin"
                            />
                        </InspectorPanel.PanelBody>
                    )}

                    {showContent && (
                        <InspectorPanel.PanelBody title={__("Excerpt", "essential-blocks")} initialOpen={false}>
                            <ColorControl
                                label={__("Color", "essential-blocks")}
                                color={contentColor}
                                attributeName={'contentColor'}
                            />
                            <BaseControl
                                label={__("Alignment", "essential-blocks")}
                                id="essential-blocks"
                            >
                                <ButtonGroup id="essential-blocks">
                                    {TEXT_ALIGN.map((item, index) => (
                                        <Button
                                            key={index}
                                            // isLarge
                                            isPrimary={contentTextAlign === item.value}
                                            isSecondary={contentTextAlign !== item.value}
                                            onClick={() =>
                                                setAttributes({
                                                    contentTextAlign: item.value,
                                                })
                                            }
                                        >
                                            {item.label}
                                        </Button>
                                    ))}
                                </ButtonGroup>
                            </BaseControl>
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
                            <ButtonGroup className="eb-inspector-btn-group">
                                {NORMAL_HOVER.map((item, index) => (
                                    <Button
                                        key={index}
                                        // isLarge
                                        isPrimary={readmoreColorType === item.value}
                                        isSecondary={readmoreColorType !== item.value}
                                        onClick={() =>
                                            setAttributes({
                                                readmoreColorType: item.value,
                                            })
                                        }
                                    >
                                        {item.label}
                                    </Button>
                                ))}
                            </ButtonGroup>

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

                            <BaseControl
                                label={__(
                                    "Alignment",
                                    "essential-blocks"
                                )}
                                id="essential-blocks"
                            >
                                <ButtonGroup id="essential-blocks">
                                    {TEXT_ALIGN.map(
                                        (item, index) => (
                                            <Button
                                                key={index}
                                                // isLarge
                                                isPrimary={
                                                    readmoreTextAlign ===
                                                    item.value
                                                }
                                                isSecondary={
                                                    readmoreTextAlign !==
                                                    item.value
                                                }
                                                onClick={() =>
                                                    setAttributes(
                                                        {
                                                            readmoreTextAlign:
                                                                item.value,
                                                        }
                                                    )
                                                }
                                            >
                                                {item.label}
                                            </Button>
                                        )
                                    )}
                                </ButtonGroup>
                            </BaseControl>
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

                            <ButtonGroup className="eb-inspector-btn-group">
                                {NORMAL_HOVER.map((item, index) => (
                                    <Button
                                        key={index}
                                        // isLarge
                                        isPrimary={metaColorType === item.value}
                                        isSecondary={metaColorType !== item.value}
                                        onClick={() =>
                                            setAttributes({
                                                metaColorType: item.value,
                                            })
                                        }
                                    >
                                        {item.label}
                                    </Button>
                                ))}
                            </ButtonGroup>

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
                                    <ButtonGroup
                                        id="essential-blocks"
                                        className="eb-inspector-btn-group"
                                    >
                                        {NORMAL_HOVER.map((item, index) => (
                                            <Button
                                                key={index}
                                                isLarge
                                                isPrimary={loadMoreColorType === item.value}
                                                isSecondary={loadMoreColorType !== item.value}
                                                onClick={() =>
                                                    setAttributes({
                                                        loadMoreColorType: item.value,
                                                    })
                                                }
                                            >
                                                {item.label}
                                            </Button>
                                        ))}
                                    </ButtonGroup>
                                )}

                                {/* If load More type "Pagination" */}
                                {loadMoreOptions.loadMoreType === "2" && (
                                    <BaseControl
                                        label={__("", "essential-blocks")}
                                        id="eb-advance-heading-alignment"
                                    >
                                        <ButtonGroup id="eb-advance-heading-alignment">
                                            {NORMAL_HOVER_ACTIVE.map((item, index) => (
                                                <Button
                                                    key={index}
                                                    isLarge
                                                    isPrimary={loadMoreColorType === item.value}
                                                    isSecondary={loadMoreColorType !== item.value}
                                                    onClick={() =>
                                                        setAttributes({
                                                            loadMoreColorType: item.value,
                                                        })
                                                    }
                                                >
                                                    {item.label}
                                                </Button>
                                            ))}
                                        </ButtonGroup>
                                    </BaseControl>
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
                            <InspectorPanel.PanelBody>
                                <ButtonGroup className="eb-inspector-btn-group">
                                    {NORMAL_HOVER.map((item, index) => (
                                        <Button
                                            key={index}
                                            // isLarge
                                            isPrimary={filterColorStyle === item.value}
                                            isSecondary={filterColorStyle !== item.value}
                                            onClick={() =>
                                                setAttributes({
                                                    filterColorStyle: item.value,
                                                })
                                            }
                                        >
                                            {item.label}
                                        </Button>
                                    ))}
                                </ButtonGroup>
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
                            </InspectorPanel.PanelBody>
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
        const postTypes = select("core").getPostTypes();

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
