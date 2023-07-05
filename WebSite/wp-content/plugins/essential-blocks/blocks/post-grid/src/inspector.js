/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useEffect, useState, useRef } from "@wordpress/element";
import { InspectorControls, PanelColorSettings } from "@wordpress/block-editor";
import {
    PanelBody,
    PanelRow,
    SelectControl,
    ToggleControl,
    TextControl,
    Button,
    ButtonGroup,
    BaseControl,
    TabPanel,
    RangeControl,
} from "@wordpress/components";
import { select, useSelect, withSelect } from "@wordpress/data";
import { doAction, applyFilters } from "@wordpress/hooks";

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

const {
    ColorControl,
    ResponsiveDimensionsControl,
    TypographyDropdown,
    BorderShadowControl,
    ResponsiveRangeController,
    BackgroundControl,
    CustomQuery,
    MorePosts,
    AdvancedControls,
    ebImageSizes,
    EbImageSizeSelector,
    ProSelectControl,
} = window.EBControls;

function Inspector(props) {
    const { attributes, setAttributes, taxonomyData } = props;
    const { terms, taxonomies } = taxonomyData;
    const {
        resOption,
        preset,
        queryData,
        queryResults,
        postTerms,
        loadMoreOptions,
        showThumbnail,
        thumbnailOverlayColor,
        thumbnailOverlayHoverColor,
        thumbnailSize,
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
    } = attributes;

    const [metaOptions, setMetaOptions] = useState([]);

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
        const updatedMeta = applyFilters(
            "essential_blocks_post_grid_meta",
            meta,
            queryData?.source
        );

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
                prevterms.current && typeof prevterms.current === "object"
                    ? Object.keys(prevterms.current)
                    : [];

            let headerMetaVal =
                headerMeta.length > 0 ? JSON.parse(headerMeta) : [];
            headerMetaVal =
                headerMetaVal.length > 0 &&
                headerMetaVal.filter((item) => !terms.includes(item.value));

            let footerMetaVal =
                footerMeta.length > 0 ? JSON.parse(footerMeta) : [];
            footerMetaVal =
                footerMetaVal.length > 0 &&
                footerMetaVal.filter((item) => !terms.includes(item.value));

            setAttributes({
                headerMeta: JSON.stringify(headerMetaVal),
                footerMeta: JSON.stringify(footerMetaVal),
            });
            prevSource.current = queryData.source;
        }
    }, [queryData?.source]);

    //resRequiredProps constant for Controls perameter
    const resRequiredProps = {
        setAttributes,
        resOption,
        attributes,
        objAttributes,
    };

    /**
     * Change Preset Function
     * @param {*} selected
     * @returns
     */
    const changePreset = (selected) => {
        setAttributes({ preset: selected });
        //Filter for Pro
        applyFilters(
            "eb_post_grid_preset_change",
            selected,
            attributes,
            setAttributes
        );
        switch (selected) {
            case "style-1":
                setAttributes({
                    thumbnailBDRBottom: "0",
                    thumbnailBDRLeft: "0",
                    thumbnailBDRRight: "0",
                    thumbnailBDRTop: "0",
                    thumbnailBDRUnit: "px",
                    showContent: true,
                    columnBorderShadowRds_Bottom: "0",
                    columnBorderShadowRds_Top: "0",
                    columnBorderShadowRds_Left: "0",
                    columnBorderShadowRds_Right: "0",
                    columnBorderShadowRds_Unit: "px",
                    columnBorderShadowhOffset: 0,
                    columnBorderShadowvOffset: 0,
                    columnBorderShadowblur: 0,
                    columnBorderShadowspread: 0,
                    columnBorderShadowshadowColor: "rgba(197,197,197,1)",
                    thumbnailImageSizeRange: 250,
                    columnsRange: 3,
                    columnGapRange: 10,
                    columnGapUnit: "px",
                    thumbnailImageSizeUnit: "px",
                    columnPaddingBottom: "0",
                    columnPaddingTop: "0",
                    columnPaddingRight: "0",
                    columnPaddingLeft: "0",
                    columnPaddingUnit: "px",
                    footerMetaTextAlign: "left",
                    headerMeta: '[{"value":"category","label":"Categories"}]',
                    footerMeta:
                        '[{"value":"avatar","label":"Author Avatar"},{"value":"author","label":"Author Name"},{"value":"date","label":"Published Date"}]',
                    titleColor: "#333333",
                    contentColor: "#333333",
                    titleMarginLeft: "0",
                    titleMarginRight: "0",
                    titleMarginTop: "0",
                    titleMarginBottom: "10",
                    headerMetaMarginLeft: "0",
                    headerMetaMarginRight: "0",
                    headerMetaMarginTop: "0",
                    headerMetaMarginBottom: "10",
                    footerMetaMarginLeft: "0",
                    footerMetaMarginRight: "0",
                    footerMetaMarginTop: "0",
                    footerMetaMarginBottom: "10",
                    dateMetaColor: "#9e9e9e",
                    thumbnailOverlayColor: "rgba(0 0 0 / 0)",
                    thumbnailOverlayHoverColor: "rgba(0 0 0 / 0.5)",
                    styleVerticalAlignment: "flex-start",
                    contentMarginLeft: "0",
                    thumbnailMarginBottom: "10",
                    columnPaddingisLinked: true,
                    columnBorderShadowborderStyle: "none",
                    columnBorderShadowBdr_Top: "1",
                    columnBorderShadowBdr_Left: "1",
                    columnBorderShadowBdr_Right: "1",
                    columnBorderShadowBdr_Bottom: "1",
                    columnBorderShadowBdr_isLinked: true,
                    columnBorderShadowborderColor: "#000000",
                    ReadTimeMetaColor: "#333333",
                    authorMetaColor: '#3d8fd4',
                    showReadMore: false,
                    readmoreMarginLeft: "0",
                    readmoreMarginRight: "0",
                    readmoreMarginUnit: "px",
                    readmoreColor: "#3d8fd4",
                    queryData: {
                        ...attributes.queryData,
                        per_page: "6"
                    }
                });
                break;
            case "style-2":
                setAttributes({
                    thumbnailBDRBottom: "5",
                    thumbnailBDRLeft: "5",
                    thumbnailBDRRight: "5",
                    thumbnailBDRTop: "5",
                    thumbnailBDRUnit: "px",
                    showContent: true,
                    columnBorderShadowRds_Bottom: "0",
                    columnBorderShadowRds_Top: "0",
                    columnBorderShadowRds_Left: "0",
                    columnBorderShadowRds_Right: "0",
                    columnBorderShadowRds_Unit: "px",
                    columnBorderShadowhOffset: 0,
                    columnBorderShadowvOffset: 0,
                    columnBorderShadowblur: 0,
                    columnBorderShadowspread: 0,
                    columnBorderShadowshadowColor: "rgba(197,197,197,1)",
                    thumbnailImageSizeRange: 200,
                    columnsRange: 3,
                    columnGapRange: 10,
                    columnGapUnit: "px",
                    thumbnailImageSizeUnit: "px",
                    columnPaddingBottom: "0",
                    columnPaddingTop: "0",
                    columnPaddingRight: "0",
                    columnPaddingLeft: "0",
                    columnPaddingUnit: "px",
                    footerMetaTextAlign: "left",
                    headerMeta: '[{"value":"date","label":"Published Date"}]',
                    footerMeta:
                        '[{"value":"avatar","label":"Author Avatar"},{"value":"author","label":"Author Name"}]',
                    titleColor: "#333333",
                    contentColor: "#333333",
                    titleMarginLeft: "0",
                    titleMarginRight: "0",
                    titleMarginTop: "0",
                    titleMarginBottom: "10",
                    headerMetaMarginLeft: "0",
                    headerMetaMarginRight: "0",
                    headerMetaMarginTop: "0",
                    headerMetaMarginBottom: "10",
                    footerMetaMarginLeft: "0",
                    footerMetaMarginRight: "0",
                    footerMetaMarginTop: "0",
                    footerMetaMarginBottom: "10",
                    dateMetaColor: "#9e9e9e",
                    thumbnailOverlayColor: "rgba(0 0 0 / 0)",
                    thumbnailOverlayHoverColor: "rgba(0 0 0 / 0.5)",
                    styleVerticalAlignment: "flex-start",
                    contentMarginLeft: "0",
                    thumbnailMarginBottom: "10",
                    columnPaddingisLinked: true,
                    columnBorderShadowborderStyle: "none",
                    columnBorderShadowBdr_Top: "1",
                    columnBorderShadowBdr_Left: "1",
                    columnBorderShadowBdr_Right: "1",
                    columnBorderShadowBdr_Bottom: "1",
                    columnBorderShadowBdr_isLinked: true,
                    columnBorderShadowborderColor: "#000000",
                    ReadTimeMetaColor: "#333333",
                    authorMetaColor: '#3d8fd4',
                    showReadMore: false,
                    readmoreMarginLeft: "0",
                    readmoreMarginRight: "0",
                    readmoreMarginUnit: "px",
                    readmoreColor: "#3d8fd4",
                    queryData: {
                        ...attributes.queryData,
                        per_page: "6"
                    }
                });
                break;
            case "style-3":
                setAttributes({
                    thumbnailBDRBottom: "5",
                    thumbnailBDRLeft: "5",
                    thumbnailBDRRight: "5",
                    thumbnailBDRTop: "5",
                    thumbnailBDRUnit: "px",
                    showContent: true,
                    columnBorderShadowRds_Bottom: "5",
                    columnBorderShadowRds_Top: "5",
                    columnBorderShadowRds_Left: "5",
                    columnBorderShadowRds_Right: "5",
                    columnBorderShadowRds_Unit: "px",
                    columnBorderShadowhOffset: 0,
                    columnBorderShadowvOffset: 0,
                    columnBorderShadowblur: 10,
                    columnBorderShadowspread: 0,
                    columnBorderShadowshadowColor: "rgba(197,197,197,1)",
                    thumbnailImageSizeRange: 250,
                    columnsRange: 3,
                    columnGapRange: 15,
                    columnGapUnit: "px",
                    thumbnailImageSizeUnit: "px",
                    columnPaddingBottom: "10",
                    columnPaddingTop: "10",
                    columnPaddingRight: "10",
                    columnPaddingLeft: "10",
                    columnPaddingUnit: "px",
                    footerMetaTextAlign: "center",
                    headerMeta: '[{"value":"date","label":"Published Date"}]',
                    footerMeta: '[{"value":"avatar","label":"Author Avatar"}]',
                    titleColor: "#333333",
                    contentColor: "#333333",
                    titleMarginLeft: "0",
                    titleMarginRight: "0",
                    titleMarginTop: "0",
                    titleMarginBottom: "10",
                    headerMetaMarginLeft: "0",
                    headerMetaMarginRight: "0",
                    headerMetaMarginTop: "0",
                    headerMetaMarginBottom: "10",
                    footerMetaMarginLeft: "0",
                    footerMetaMarginRight: "0",
                    footerMetaMarginTop: "0",
                    footerMetaMarginBottom: "10",
                    dateMetaColor: "#9e9e9e",
                    thumbnailOverlayColor: "rgba(0 0 0 / 0)",
                    thumbnailOverlayHoverColor: "rgba(0 0 0 / 0.5)",
                    styleVerticalAlignment: "flex-start",
                    contentMarginLeft: "0",
                    thumbnailMarginBottom: "10",
                    columnPaddingisLinked: true,
                    columnBorderShadowborderStyle: "none",
                    columnBorderShadowBdr_Top: "1",
                    columnBorderShadowBdr_Left: "1",
                    columnBorderShadowBdr_Right: "1",
                    columnBorderShadowBdr_Bottom: "1",
                    columnBorderShadowBdr_isLinked: true,
                    columnBorderShadowborderColor: "#000000",
                    ReadTimeMetaColor: "#333333",
                    authorMetaColor: '#3d8fd4',
                    showReadMore: false,
                    readmoreMarginLeft: "0",
                    readmoreMarginRight: "0",
                    readmoreMarginUnit: "px",
                    readmoreColor: "#3d8fd4",
                    queryData: {
                        ...attributes.queryData,
                        per_page: "6"
                    }
                });
                break;
            case "style-4":
                setAttributes({
                    thumbnailBDRBottom: "0",
                    thumbnailBDRLeft: "0",
                    thumbnailBDRRight: "0",
                    thumbnailBDRTop: "0",
                    thumbnailBDRUnit: "px",
                    showContent: true,
                    columnBorderShadowRds_Bottom: "0",
                    columnBorderShadowRds_Top: "0",
                    columnBorderShadowRds_Left: "0",
                    columnBorderShadowRds_Right: "0",
                    columnBorderShadowRds_Unit: "px",
                    columnBorderShadowhOffset: 0,
                    columnBorderShadowvOffset: 0,
                    columnBorderShadowblur: 0,
                    columnBorderShadowspread: 0,
                    columnBorderShadowshadowColor: "rgba(197,197,197,1)",
                    thumbnailImageSizeRange: 200,
                    columnsRange: 1,
                    columnGapRange: 0,
                    columnGapUnit: "px",
                    thumbnailImageSizeUnit: "px",
                    columnPaddingBottom: "15",
                    columnPaddingTop: "15",
                    columnPaddingRight: "0",
                    columnPaddingLeft: "0",
                    columnPaddingUnit: "px",
                    footerMetaTextAlign: "left",
                    headerMeta:
                        '[{"value":"avatar","label":"Author Avatar"},{"value":"author","label":"Author Name"}]',
                    footerMeta:
                        '[{"value":"readtime","label":"Read Time"},{"value":"date","label":"Published Date"}]',
                    titleColor: "#555",
                    contentColor: "#333333",
                    titleMarginLeft: "15",
                    titleMarginRight: "15",
                    titleMarginTop: "0",
                    titleMarginBottom: "15",
                    headerMetaMarginLeft: "15",
                    headerMetaMarginRight: "15",
                    headerMetaMarginTop: "0",
                    headerMetaMarginBottom: "15",
                    footerMetaMarginLeft: "15",
                    footerMetaMarginRight: "15",
                    footerMetaMarginTop: "0",
                    footerMetaMarginBottom: "15",
                    dateMetaColor: "#707070",
                    thumbnailOverlayColor: "rgba(0 0 0 / 0.45)",
                    thumbnailOverlayHoverColor: "rgba(0 0 0 / 0.65)",
                    styleVerticalAlignment: "flex-start",
                    contentMarginLeft: "15",
                    thumbnailMarginBottom: "0",
                    columnPaddingisLinked: false,
                    columnBorderShadowborderStyle: "solid",
                    columnBorderShadowBdr_Top: "2",
                    columnBorderShadowBdr_Left: "0",
                    columnBorderShadowBdr_Right: "0",
                    columnBorderShadowBdr_Bottom: "0",
                    columnBorderShadowBdr_isLinked: false,
                    columnBorderShadowborderColor: "#000000",
                    ReadTimeMetaColor: "#707070",
                    authorMetaColor: "#3d8fd4",
                    showReadMore: false,
                    readmoreMarginLeft: "0",
                    readmoreMarginRight: "0",
                    readmoreMarginUnit: "px",
                    readmoreColor: "#3d8fd4",
                    queryData: {
                        ...attributes.queryData,
                        per_page: "6"
                    }
                });
                break;
            case "style-5":
                setAttributes({
                    thumbnailBDRBottom: "0",
                    thumbnailBDRLeft: "0",
                    thumbnailBDRRight: "0",
                    thumbnailBDRTop: "0",
                    thumbnailBDRUnit: "px",
                    showContent: false,
                    columnBorderShadowRds_Bottom: "0",
                    columnBorderShadowRds_Top: "0",
                    columnBorderShadowRds_Left: "0",
                    columnBorderShadowRds_Right: "0",
                    columnBorderShadowRds_Unit: "px",
                    columnBorderShadowhOffset: 0,
                    columnBorderShadowvOffset: 0,
                    columnBorderShadowblur: 0,
                    columnBorderShadowspread: 0,
                    columnBorderShadowshadowColor: "rgba(197,197,197,1)",
                    thumbnailImageSizeRange: 250,
                    columnsRange: 3,
                    columnGapRange: 10,
                    columnGapUnit: "px",
                    thumbnailImageSizeUnit: "px",
                    columnPaddingBottom: "0",
                    columnPaddingTop: "0",
                    columnPaddingRight: "0",
                    columnPaddingLeft: "0",
                    columnPaddingUnit: "px",
                    footerMetaTextAlign: "left",
                    headerMeta: '[{"value":"date","label":"Published Date"}]',
                    footerMeta: "[]",
                    titleColor: "#d18df1",
                    contentColor: "#ffffff",
                    titleMarginLeft: "15",
                    titleMarginRight: "15",
                    titleMarginTop: "15",
                    titleMarginBottom: "5",
                    headerMetaMarginLeft: "15",
                    headerMetaMarginRight: "15",
                    headerMetaMarginTop: "0",
                    headerMetaMarginBottom: "15",
                    footerMetaMarginLeft: "15",
                    footerMetaMarginRight: "15",
                    footerMetaMarginTop: "0",
                    footerMetaMarginBottom: "15",
                    dateMetaColor: "#ffffff",
                    thumbnailOverlayColor: "rgba(0 0 0 / 0.45)",
                    thumbnailOverlayHoverColor: "rgba(0 0 0 / 0.65)",
                    styleVerticalAlignment: "flex-start",
                    contentMarginLeft: "15",
                    thumbnailMarginBottom: "10",
                    columnPaddingisLinked: true,
                    columnBorderShadowborderStyle: "none",
                    columnBorderShadowBdr_Top: "1",
                    columnBorderShadowBdr_Left: "1",
                    columnBorderShadowBdr_Right: "1",
                    columnBorderShadowBdr_Bottom: "1",
                    columnBorderShadowBdr_isLinked: true,
                    columnBorderShadowborderColor: "#000000",
                    ReadTimeMetaColor: "#333333",
                    authorMetaColor: '#3d8fd4',
                    showReadMore: false,
                    readmoreMarginLeft: "0",
                    readmoreMarginRight: "0",
                    readmoreMarginUnit: "px",
                    readmoreColor: "#3d8fd4",
                    queryData: {
                        ...attributes.queryData,
                        per_page: "6"
                    }
                });
                break;
            default:
                return false;
        }
    };

    return (
        <InspectorControls key="controls">
            <div className="eb-panel-control">
                <TabPanel
                    className="eb-parent-tab-panel"
                    activeClass="active-tab"
                    // onSelect={onSelect}
                    tabs={[
                        {
                            name: "general",
                            title: "General",
                            className: "eb-tab general",
                        },
                        {
                            name: "styles",
                            title: "Styles",
                            className: "eb-tab styles",
                        },
                        {
                            name: "advance",
                            title: "Advanced",
                            className: "eb-tab advance",
                        },
                    ]}
                >
                    {(tab) => (
                        <div className={"eb-tab-controls" + tab.name}>
                            {tab.name === "general" && (
                                <>
                                    <CustomQuery
                                        attributes={attributes}
                                        setAttributes={setAttributes}
                                    />

                                    <PanelBody
                                        title={__(
                                            "Layout Style",
                                            "essential-blocks"
                                        )}
                                        initialOpen={false}
                                    >
                                        <ProSelectControl
                                            label={__(
                                                "Template",
                                                "essential-blocks"
                                            )}
                                            value={preset}
                                            options={applyFilters(
                                                "eb_post_grid_preset",
                                                PRESETS
                                            )}
                                            onChange={(selected) =>
                                                changePreset(selected)
                                            }
                                        />

                                        <ResponsiveRangeController
                                            baseLabel={__(
                                                "Columns",
                                                "essential-blocks"
                                            )}
                                            controlName={COLUMNS}
                                            resRequiredProps={resRequiredProps}
                                            units={[]}
                                            min={1}
                                            max={6}
                                            step={1}
                                        />

                                        <ResponsiveRangeController
                                            baseLabel={__(
                                                "Column Gap",
                                                "essential-blocks"
                                            )}
                                            controlName={COLUMN_GAP}
                                            resRequiredProps={resRequiredProps}
                                            units={UNIT_TYPES}
                                            min={1}
                                            max={100}
                                            step={0}
                                        />

                                        {(["style-5", "pro-style-6"].includes(preset)) === false && (
                                            <ToggleControl
                                                label={__("Show Thumbnail?")}
                                                checked={showThumbnail}
                                                onChange={() => {
                                                    setAttributes({
                                                        showThumbnail: !showThumbnail,
                                                    });
                                                }}
                                            />
                                        )}


                                        {showThumbnail && (
                                            <>
                                                <ResponsiveRangeController
                                                    baseLabel={__(
                                                        "Thumbnail Height",
                                                        "essential-blocks"
                                                    )}
                                                    controlName={
                                                        THUMBNAIL_IMAGE_SIZE
                                                    }
                                                    resRequiredProps={
                                                        resRequiredProps
                                                    }
                                                    units={HEIGHT_UNIT_TYPES}
                                                    min={1}
                                                    max={500}
                                                    step={1}
                                                />
                                                {preset === "style-4" && (
                                                    <ResponsiveRangeController
                                                        baseLabel={__(
                                                            "Thumbnail Width",
                                                            "essential-blocks"
                                                        )}
                                                        controlName={
                                                            COLUMN_MEDIA_WIDTH
                                                        }
                                                        resRequiredProps={
                                                            resRequiredProps
                                                        }
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
                                                    resRequiredProps={
                                                        resRequiredProps
                                                    }
                                                    setAttributes={
                                                        setAttributes
                                                    }
                                                />
                                            </>
                                        )}

                                        {(preset === "style-4" ||
                                            preset === "style-5" ||
                                            preset === "pro-style-6") && (
                                                <BaseControl
                                                    label={__(
                                                        "Content Vertical Alignment",
                                                        "essential-blocks"
                                                    )}
                                                    id="essential-blocks"
                                                >
                                                    <ButtonGroup id="essential-blocks">
                                                        {VERTICAL_POSITION.map(
                                                            (item, index) => (
                                                                <Button
                                                                    key={index}
                                                                    // isLarge
                                                                    isPrimary={
                                                                        styleVerticalAlignment ===
                                                                        item.value
                                                                    }
                                                                    isSecondary={
                                                                        styleVerticalAlignment !==
                                                                        item.value
                                                                    }
                                                                    onClick={() =>
                                                                        setAttributes(
                                                                            {
                                                                                styleVerticalAlignment:
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
                                            )}

                                        <ToggleControl
                                            label={__("Show Title?")}
                                            checked={showTitle}
                                            onChange={() => {
                                                setAttributes({
                                                    showTitle: !showTitle,
                                                });
                                            }}
                                        />

                                        {showTitle && (
                                            <>
                                                <SelectControl
                                                    label={__(
                                                        "Title Tag",
                                                        "essential-blocks"
                                                    )}
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
                                                <TextControl
                                                    label="Button Text"
                                                    type={"text"}
                                                    value={readmoreText}
                                                    onChange={(text) =>
                                                        setAttributes({
                                                            readmoreText: text,
                                                        })
                                                    }
                                                />
                                            </>
                                        )}

                                        <ToggleControl
                                            label={__("Show Meta?")}
                                            checked={showMeta}
                                            onChange={() => {
                                                setAttributes({
                                                    showMeta: !showMeta,
                                                });
                                            }}
                                        />

                                        {showMeta && (
                                            <>
                                                <div className="eb-control-item-wrapper">
                                                    <PanelRow>
                                                        Header Meta
                                                    </PanelRow>
                                                    <Select2
                                                        name="select-header-meta"
                                                        value={
                                                            headerMeta.length >
                                                                0
                                                                ? JSON.parse(
                                                                    headerMeta
                                                                )
                                                                : ""
                                                        }
                                                        onChange={(selected) =>
                                                            setAttributes({
                                                                headerMeta: JSON.stringify(
                                                                    selected
                                                                ),
                                                            })
                                                        }
                                                        options={metaOptions}
                                                        isMulti="true"
                                                    />
                                                </div>

                                                <div className="eb-control-item-wrapper">
                                                    <PanelRow>
                                                        Footer Meta
                                                    </PanelRow>
                                                    <Select2
                                                        name="select-footer-meta"
                                                        value={
                                                            footerMeta.length >
                                                                0
                                                                ? JSON.parse(
                                                                    footerMeta
                                                                )
                                                                : ""
                                                        }
                                                        onChange={(selected) =>
                                                            setAttributes({
                                                                footerMeta: JSON.stringify(
                                                                    selected
                                                                ),
                                                            })
                                                        }
                                                        options={metaOptions}
                                                        isMulti="true"
                                                    />
                                                </div>

                                                <TextControl
                                                    label="Author Prefix"
                                                    help="Example: by John Doe"
                                                    type={"text"}
                                                    value={authorPrefix}
                                                    onChange={(text) =>
                                                        setAttributes({
                                                            authorPrefix: text,
                                                        })
                                                    }
                                                />
                                                <TextControl
                                                    label="Published Date Prefix"
                                                    help="Example: on 01/01/2023"
                                                    type={"text"}
                                                    value={datePrefix}
                                                    onChange={(text) =>
                                                        setAttributes({
                                                            datePrefix: text,
                                                        })
                                                    }
                                                />
                                            </>
                                        )}
                                    </PanelBody>

                                    <MorePosts
                                        loadMoreOptions={loadMoreOptions}
                                        queryData={queryData}
                                        setAttributes={setAttributes}
                                        initialOpen={false}
                                    />

                                    <PanelBody
                                        title={__(
                                            "Filter By Taxonomy",
                                            "essential-blocks"
                                        )}
                                        initialOpen={false}
                                    >
                                        <ToggleControl
                                            label={__(
                                                "Show Filter By Taxonomy?"
                                            )}
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
                                                    <PanelRow>
                                                        Select Taxonomy Type
                                                    </PanelRow>
                                                    <Select2
                                                        name="select-header-meta"
                                                        value={
                                                            selectedTaxonomy &&
                                                                selectedTaxonomy.length >
                                                                0
                                                                ? JSON.parse(
                                                                    selectedTaxonomy
                                                                )
                                                                : ""
                                                        }
                                                        onChange={(selected) =>
                                                            setAttributes({
                                                                selectedTaxonomy: JSON.stringify(
                                                                    selected
                                                                ),
                                                            })
                                                        }
                                                        options={taxonomies}
                                                    />
                                                </div>
                                                {selectedTaxonomy &&
                                                    selectedTaxonomy.length >
                                                    0 && (
                                                        <div className="eb-control-item-wrapper">
                                                            <PanelRow>
                                                                Select Taxonomy
                                                            </PanelRow>
                                                            <Select2
                                                                name="select-header-meta"
                                                                value={
                                                                    selectedTaxonomyItems &&
                                                                        selectedTaxonomyItems.length >
                                                                        0
                                                                        ? JSON.parse(
                                                                            selectedTaxonomyItems
                                                                        )
                                                                        : ""
                                                                }
                                                                onChange={(
                                                                    selected
                                                                ) =>
                                                                    setAttributes(
                                                                        {
                                                                            selectedTaxonomyItems: JSON.stringify(
                                                                                selected
                                                                            ),
                                                                        }
                                                                    )
                                                                }
                                                                options={terms}
                                                                isMulti="true"
                                                            />
                                                        </div>
                                                    )}
                                            </>
                                        )}
                                    </PanelBody>
                                </>
                            )}

                            {tab.name === "styles" && (
                                <>
                                    <PanelBody
                                        title={__(
                                            "Columns",
                                            "essential-blocks"
                                        )}
                                        initialOpen={false}
                                    >
                                        <ResponsiveDimensionsControl
                                            resRequiredProps={resRequiredProps}
                                            controlName={COLUMN_PADDING}
                                            baseLabel="Padding"
                                        />
                                        <PanelBody
                                            title={__(
                                                "Background",
                                                "essential-blocks"
                                            )}
                                            initialOpen={false}
                                        >
                                            <BackgroundControl
                                                controlName={COLUMN_BG}
                                                resRequiredProps={
                                                    resRequiredProps
                                                }
                                                noOverlay
                                            />
                                        </PanelBody>
                                        <PanelBody
                                            title={__("Border & Shadow")}
                                            initialOpen={false}
                                        >
                                            <BorderShadowControl
                                                controlName={
                                                    COLUMN_BORDER_SHADOW
                                                }
                                                resRequiredProps={
                                                    resRequiredProps
                                                }
                                            // noShadow
                                            // noBorder
                                            />
                                        </PanelBody>
                                    </PanelBody>

                                    {showThumbnail && (
                                        <PanelBody
                                            title={__(
                                                "Thumbnail",
                                                "essential-blocks"
                                            )}
                                            initialOpen={false}
                                        >
                                            <ResponsiveDimensionsControl
                                                resRequiredProps={
                                                    resRequiredProps
                                                }
                                                controlName={
                                                    THUMBNAIL_BORDER_RADIUS
                                                }
                                                baseLabel="Border Radius"
                                            />
                                            <ResponsiveDimensionsControl
                                                resRequiredProps={
                                                    resRequiredProps
                                                }
                                                controlName={THUMBNAIL_MARGIN}
                                                baseLabel="Margin"
                                            />
                                            <ColorControl
                                                label={__(
                                                    "Overlay Color",
                                                    "essential-blocks"
                                                )}
                                                color={thumbnailOverlayColor}
                                                onChange={(color) =>
                                                    setAttributes({
                                                        thumbnailOverlayColor: color,
                                                    })
                                                }
                                            />
                                            <ColorControl
                                                label={__(
                                                    "Overlay Hover Color",
                                                    "essential-blocks"
                                                )}
                                                color={
                                                    thumbnailOverlayHoverColor
                                                }
                                                onChange={(color) =>
                                                    setAttributes({
                                                        thumbnailOverlayHoverColor: color,
                                                    })
                                                }
                                            />
                                        </PanelBody>
                                    )}

                                    {showTitle && (
                                        <PanelBody
                                            title={__(
                                                "Title",
                                                "essential-blocks"
                                            )}
                                            initialOpen={false}
                                        >
                                            <ButtonGroup className="eb-inspector-btn-group">
                                                {NORMAL_HOVER.map(
                                                    (item, index) => (
                                                        <Button
                                                            key={index}
                                                            // isLarge
                                                            isPrimary={
                                                                titleColorStyle ===
                                                                item.value
                                                            }
                                                            isSecondary={
                                                                titleColorStyle !==
                                                                item.value
                                                            }
                                                            onClick={() =>
                                                                setAttributes({
                                                                    titleColorStyle:
                                                                        item.value,
                                                                })
                                                            }
                                                        >
                                                            {item.label}
                                                        </Button>
                                                    )
                                                )}
                                            </ButtonGroup>

                                            {titleColorStyle === "normal" && (
                                                <PanelColorSettings
                                                    className={"eb-subpanel"}
                                                    title={__(
                                                        "Normal Color",
                                                        "essential-blocks"
                                                    )}
                                                    initialOpen={true}
                                                    colorSettings={[
                                                        {
                                                            value: titleColor,
                                                            onChange: (
                                                                newColor
                                                            ) =>
                                                                setAttributes({
                                                                    titleColor: newColor,
                                                                }),
                                                            label: __(
                                                                "Color",
                                                                "essential-blocks"
                                                            ),
                                                        },
                                                    ]}
                                                />
                                            )}

                                            {titleColorStyle === "hover" && (
                                                <PanelColorSettings
                                                    className={"eb-subpanel"}
                                                    title={__(
                                                        "Hover Color",
                                                        "essential-blocks"
                                                    )}
                                                    initialOpen={true}
                                                    colorSettings={[
                                                        {
                                                            value: titleHoverColor,
                                                            onChange: (
                                                                newColor
                                                            ) =>
                                                                setAttributes({
                                                                    titleHoverColor: newColor,
                                                                }),
                                                            label: __(
                                                                "Hover Color",
                                                                "essential-blocks"
                                                            ),
                                                        },
                                                    ]}
                                                />
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
                                                                    titleTextAlign ===
                                                                    item.value
                                                                }
                                                                isSecondary={
                                                                    titleTextAlign !==
                                                                    item.value
                                                                }
                                                                onClick={() =>
                                                                    setAttributes(
                                                                        {
                                                                            titleTextAlign:
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
                                                baseLabel={__(
                                                    "Typography",
                                                    "essential-blocks"
                                                )}
                                                typographyPrefixConstant={
                                                    EBPG_TITLE_TYPOGRAPHY
                                                }
                                                resRequiredProps={
                                                    resRequiredProps
                                                }
                                            />
                                            <ResponsiveDimensionsControl
                                                resRequiredProps={
                                                    resRequiredProps
                                                }
                                                controlName={TITLE_MARGIN}
                                                baseLabel="Margin"
                                            />
                                        </PanelBody>
                                    )}

                                    {showContent && (
                                        <PanelBody
                                            title={__(
                                                "Excerpt",
                                                "essential-blocks"
                                            )}
                                            initialOpen={false}
                                        >
                                            <ColorControl
                                                label={__(
                                                    "Color",
                                                    "essential-blocks"
                                                )}
                                                color={contentColor}
                                                onChange={(color) =>
                                                    setAttributes({
                                                        contentColor: color,
                                                    })
                                                }
                                            />
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
                                                                    contentTextAlign ===
                                                                    item.value
                                                                }
                                                                isSecondary={
                                                                    contentTextAlign !==
                                                                    item.value
                                                                }
                                                                onClick={() =>
                                                                    setAttributes(
                                                                        {
                                                                            contentTextAlign:
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
                                                baseLabel={__(
                                                    "Typography",
                                                    "essential-blocks"
                                                )}
                                                typographyPrefixConstant={
                                                    EBPG_CONTENT_TYPOGRAPHY
                                                }
                                                resRequiredProps={
                                                    resRequiredProps
                                                }
                                            />
                                            <ResponsiveDimensionsControl
                                                resRequiredProps={
                                                    resRequiredProps
                                                }
                                                controlName={CONTENT_MARGIN}
                                                baseLabel="Margin"
                                            />
                                        </PanelBody>
                                    )}

                                    {showReadMore && (
                                        <PanelBody
                                            title={__(
                                                "Read More Button",
                                                "essential-blocks"
                                            )}
                                            initialOpen={false}
                                        >
                                            <ButtonGroup className="eb-inspector-btn-group">
                                                {NORMAL_HOVER.map(
                                                    (item, index) => (
                                                        <Button
                                                            key={index}
                                                            // isLarge
                                                            isPrimary={
                                                                readmoreColorType ===
                                                                item.value
                                                            }
                                                            isSecondary={
                                                                readmoreColorType !==
                                                                item.value
                                                            }
                                                            onClick={() =>
                                                                setAttributes({
                                                                    readmoreColorType:
                                                                        item.value,
                                                                })
                                                            }
                                                        >
                                                            {item.label}
                                                        </Button>
                                                    )
                                                )}
                                            </ButtonGroup>

                                            {readmoreColorType === "normal" && (
                                                <PanelColorSettings
                                                    className={"eb-subpanel"}
                                                    title={__(
                                                        "Normal Color",
                                                        "essential-blocks"
                                                    )}
                                                    initialOpen={true}
                                                    colorSettings={[
                                                        {
                                                            value: readmoreColor,
                                                            onChange: (
                                                                newColor
                                                            ) =>
                                                                setAttributes({
                                                                    readmoreColor: newColor,
                                                                }),
                                                            label: __(
                                                                "Color",
                                                                "essential-blocks"
                                                            ),
                                                        },
                                                        {
                                                            value: readmoreBGColor,
                                                            onChange: (
                                                                newColor
                                                            ) =>
                                                                setAttributes({
                                                                    readmoreBGColor: newColor,
                                                                }),
                                                            label: __(
                                                                "Background Color",
                                                                "essential-blocks"
                                                            ),
                                                        },
                                                    ]}
                                                />
                                            )}

                                            {readmoreColorType === "hover" && (
                                                <PanelColorSettings
                                                    className={"eb-subpanel"}
                                                    title={__(
                                                        "Hover Color",
                                                        "essential-blocks"
                                                    )}
                                                    initialOpen={true}
                                                    colorSettings={[
                                                        {
                                                            value: readmoreHoverColor,
                                                            onChange: (
                                                                newColor
                                                            ) =>
                                                                setAttributes({
                                                                    readmoreHoverColor: newColor,
                                                                }),
                                                            label: __(
                                                                "Hover Color",
                                                                "essential-blocks"
                                                            ),
                                                        },
                                                        {
                                                            value: readmoreBGHoverColor,
                                                            onChange: (
                                                                newColor
                                                            ) =>
                                                                setAttributes({
                                                                    readmoreBGHoverColor: newColor,
                                                                }),
                                                            label: __(
                                                                "Hover Background Color",
                                                                "essential-blocks"
                                                            ),
                                                        },
                                                    ]}
                                                />
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
                                                baseLabel={__(
                                                    "Typography",
                                                    "essential-blocks"
                                                )}
                                                typographyPrefixConstant={
                                                    EBPG_READMORE_TYPOGRAPHY
                                                }
                                                resRequiredProps={
                                                    resRequiredProps
                                                }
                                            />
                                            <ResponsiveDimensionsControl
                                                resRequiredProps={
                                                    resRequiredProps
                                                }
                                                controlName={READMORE_MARGIN}
                                                baseLabel="Margin"
                                            />
                                            <ResponsiveDimensionsControl
                                                resRequiredProps={
                                                    resRequiredProps
                                                }
                                                controlName={READMORE_PADDING}
                                                baseLabel="Padding"
                                            />
                                            <PanelBody
                                                title={__("Border & Shadow")}
                                                initialOpen={false}
                                            >
                                                <BorderShadowControl
                                                    controlName={
                                                        READMORE_BORDER_SHADOW
                                                    }
                                                    resRequiredProps={
                                                        resRequiredProps
                                                    }
                                                    noShadow
                                                // noBorder
                                                />
                                            </PanelBody>
                                        </PanelBody>
                                    )}

                                    {showMeta && (
                                        <PanelBody
                                            title={__(
                                                "Meta Styles",
                                                "essential-blocks"
                                            )}
                                            initialOpen={false}
                                        >
                                            <BaseControl
                                                label={__(
                                                    "Header Meta Alignment",
                                                    "essential-blocks"
                                                )}
                                                id="essential-blocks"
                                            >
                                                <ButtonGroup id="essential-blocks">
                                                    {CONTENT_POSITION.map(
                                                        (item, index) => (
                                                            <Button
                                                                key={index}
                                                                // isLarge
                                                                isPrimary={
                                                                    headerMetaTextAlign ===
                                                                    item.value
                                                                }
                                                                isSecondary={
                                                                    headerMetaTextAlign !==
                                                                    item.value
                                                                }
                                                                onClick={() =>
                                                                    setAttributes(
                                                                        {
                                                                            headerMetaTextAlign:
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
                                            <ResponsiveRangeController
                                                baseLabel={__(
                                                    "Header Meta Gap",
                                                    "essential-blocks"
                                                )}
                                                controlName={HEADER_META_SPACE}
                                                resRequiredProps={
                                                    resRequiredProps
                                                }
                                                units={UNIT_TYPES}
                                                min={1}
                                                max={100}
                                                step={1}
                                            />
                                            <ResponsiveDimensionsControl
                                                resRequiredProps={
                                                    resRequiredProps
                                                }
                                                controlName={HEADER_META_MARGIN}
                                                baseLabel="Header Meta Margin"
                                            />

                                            <BaseControl
                                                label={__(
                                                    "Footer Meta Alignment",
                                                    "essential-blocks"
                                                )}
                                                id="essential-blocks"
                                            >
                                                <ButtonGroup id="essential-blocks">
                                                    {CONTENT_POSITION.map(
                                                        (item, index) => (
                                                            <Button
                                                                key={index}
                                                                // isLarge
                                                                isPrimary={
                                                                    footerMetaTextAlign ===
                                                                    item.value
                                                                }
                                                                isSecondary={
                                                                    footerMetaTextAlign !==
                                                                    item.value
                                                                }
                                                                onClick={() =>
                                                                    setAttributes(
                                                                        {
                                                                            footerMetaTextAlign:
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
                                            <ResponsiveRangeController
                                                baseLabel={__(
                                                    "Footer Meta Gap",
                                                    "essential-blocks"
                                                )}
                                                controlName={FOOTER_META_SPACE}
                                                resRequiredProps={
                                                    resRequiredProps
                                                }
                                                units={UNIT_TYPES}
                                                min={1}
                                                max={100}
                                                step={1}
                                            />
                                            <ResponsiveDimensionsControl
                                                resRequiredProps={
                                                    resRequiredProps
                                                }
                                                controlName={FOOTER_META_MARGIN}
                                                baseLabel="Footer Meta Margin"
                                            />

                                            <ButtonGroup className="eb-inspector-btn-group">
                                                {NORMAL_HOVER.map(
                                                    (item, index) => (
                                                        <Button
                                                            key={index}
                                                            // isLarge
                                                            isPrimary={
                                                                metaColorType ===
                                                                item.value
                                                            }
                                                            isSecondary={
                                                                metaColorType !==
                                                                item.value
                                                            }
                                                            onClick={() =>
                                                                setAttributes({
                                                                    metaColorType:
                                                                        item.value,
                                                                })
                                                            }
                                                        >
                                                            {item.label}
                                                        </Button>
                                                    )
                                                )}
                                            </ButtonGroup>

                                            {metaColorType === "normal" && (
                                                <PanelColorSettings
                                                    className={"eb-subpanel"}
                                                    title={__(
                                                        "Normal Color",
                                                        "essential-blocks"
                                                    )}
                                                    initialOpen={true}
                                                    colorSettings={[
                                                        {
                                                            value: authorMetaColor,
                                                            onChange: (
                                                                newColor
                                                            ) =>
                                                                setAttributes({
                                                                    authorMetaColor: newColor,
                                                                }),
                                                            label: __(
                                                                "Author Color",
                                                                "essential-blocks"
                                                            ),
                                                        },
                                                        {
                                                            value: dateMetaColor,
                                                            onChange: (
                                                                newColor
                                                            ) =>
                                                                setAttributes({
                                                                    dateMetaColor: newColor,
                                                                }),
                                                            label: __(
                                                                "Date Color",
                                                                "essential-blocks"
                                                            ),
                                                        },
                                                        {
                                                            value: commonMetaColor,
                                                            onChange: (
                                                                newColor
                                                            ) =>
                                                                setAttributes({
                                                                    commonMetaColor: newColor,
                                                                }),
                                                            label: __(
                                                                "Common Meta Color",
                                                                "essential-blocks"
                                                            ),
                                                        },
                                                        {
                                                            value: commonMetaBgColor,
                                                            onChange: (
                                                                newColor
                                                            ) =>
                                                                setAttributes({
                                                                    commonMetaBgColor: newColor,
                                                                }),
                                                            label: __(
                                                                "Common Meta BG Color",
                                                                "essential-blocks"
                                                            ),
                                                        },
                                                        {
                                                            value: categoryMetaColor,
                                                            onChange: (
                                                                newColor
                                                            ) =>
                                                                setAttributes({
                                                                    categoryMetaColor: newColor,
                                                                }),
                                                            label: __(
                                                                "Category Color",
                                                                "essential-blocks"
                                                            ),
                                                        },
                                                        {
                                                            value: categoryMetaBgColor,
                                                            onChange: (
                                                                newColor
                                                            ) =>
                                                                setAttributes({
                                                                    categoryMetaBgColor: newColor,
                                                                }),
                                                            label: __(
                                                                "Category BG Color",
                                                                "essential-blocks"
                                                            ),
                                                        },
                                                        {
                                                            value: tagMetaColor,
                                                            onChange: (
                                                                newColor
                                                            ) =>
                                                                setAttributes({
                                                                    tagMetaColor: newColor,
                                                                }),
                                                            label: __(
                                                                "Tag Color",
                                                                "essential-blocks"
                                                            ),
                                                        },
                                                        {
                                                            value: tagMetaBgColor,
                                                            onChange: (
                                                                newColor
                                                            ) =>
                                                                setAttributes({
                                                                    tagMetaBgColor: newColor,
                                                                }),
                                                            label: __(
                                                                "Tag BG Color",
                                                                "essential-blocks"
                                                            ),
                                                        },
                                                        {
                                                            value: ReadTimeMetaColor,
                                                            onChange: (
                                                                newColor
                                                            ) =>
                                                                setAttributes({
                                                                    ReadTimeMetaColor: newColor,
                                                                }),
                                                            label: __(
                                                                "Read Time Color",
                                                                "essential-blocks"
                                                            ),
                                                        },
                                                        {
                                                            value: dynamicMetaColor,
                                                            onChange: (
                                                                newColor
                                                            ) =>
                                                                setAttributes({
                                                                    dynamicMetaColor: newColor,
                                                                }),
                                                            label: __(
                                                                "Dynamic Data Color",
                                                                "essential-blocks"
                                                            ),
                                                        },
                                                        {
                                                            value: dynamicMetaBgColor,
                                                            onChange: (
                                                                newColor
                                                            ) =>
                                                                setAttributes({
                                                                    dynamicMetaBgColor: newColor,
                                                                }),
                                                            label: __(
                                                                "Dynamic Data BG Color",
                                                                "essential-blocks"
                                                            ),
                                                        },
                                                    ]}
                                                />
                                            )}

                                            {metaColorType === "hover" && (
                                                <PanelColorSettings
                                                    className={"eb-subpanel"}
                                                    title={__(
                                                        "Hover Color",
                                                        "essential-blocks"
                                                    )}
                                                    initialOpen={true}
                                                    colorSettings={[
                                                        {
                                                            value: authorMetaHoverColor,
                                                            onChange: (
                                                                newColor
                                                            ) =>
                                                                setAttributes({
                                                                    authorMetaHoverColor: newColor,
                                                                }),
                                                            label: __(
                                                                "Author Hover Color",
                                                                "essential-blocks"
                                                            ),
                                                        },
                                                        {
                                                            value: commonMetaHoverColor,
                                                            onChange: (
                                                                newColor
                                                            ) =>
                                                                setAttributes({
                                                                    commonMetaHoverColor: newColor,
                                                                }),
                                                            label: __(
                                                                "Common Meta Color",
                                                                "essential-blocks"
                                                            ),
                                                        },
                                                        {
                                                            value: commonMetaBgHoverColor,
                                                            onChange: (
                                                                newColor
                                                            ) =>
                                                                setAttributes({
                                                                    commonMetaBgHoverColor: newColor,
                                                                }),
                                                            label: __(
                                                                "Common Meta BG Color",
                                                                "essential-blocks"
                                                            ),
                                                        },
                                                        {
                                                            value: categoryMetaHoverColor,
                                                            onChange: (
                                                                newColor
                                                            ) =>
                                                                setAttributes({
                                                                    categoryMetaHoverColor: newColor,
                                                                }),
                                                            label: __(
                                                                "Category Hover Color",
                                                                "essential-blocks"
                                                            ),
                                                        },
                                                        {
                                                            value: categoryMetaBgHoverColor,
                                                            onChange: (
                                                                newColor
                                                            ) =>
                                                                setAttributes({
                                                                    categoryMetaBgHoverColor: newColor,
                                                                }),
                                                            label: __(
                                                                "Category BG Hover Color",
                                                                "essential-blocks"
                                                            ),
                                                        },
                                                        {
                                                            value: tagMetaHoverColor,
                                                            onChange: (
                                                                newColor
                                                            ) =>
                                                                setAttributes({
                                                                    tagMetaHoverColor: newColor,
                                                                }),
                                                            label: __(
                                                                "Tag Hover Color",
                                                                "essential-blocks"
                                                            ),
                                                        },
                                                        {
                                                            value: tagMetaBgHoverColor,
                                                            onChange: (
                                                                newColor
                                                            ) =>
                                                                setAttributes({
                                                                    tagMetaBgHoverColor: newColor,
                                                                }),
                                                            label: __(
                                                                "Tag BG Hover Color",
                                                                "essential-blocks"
                                                            ),
                                                        },
                                                    ]}
                                                />
                                            )}

                                            <TypographyDropdown
                                                baseLabel={__(
                                                    "Meta Typography",
                                                    "essential-blocks"
                                                )}
                                                typographyPrefixConstant={
                                                    EBPG_META_TYPOGRAPHY
                                                }
                                                resRequiredProps={
                                                    resRequiredProps
                                                }
                                            />

                                            <ResponsiveDimensionsControl
                                                resRequiredProps={
                                                    resRequiredProps
                                                }
                                                controlName={
                                                    AVATAR_BORDER_RADIUS
                                                }
                                                baseLabel="Avatar Radius"
                                            />
                                        </PanelBody>
                                    )}

                                    {loadMoreOptions.enableMorePosts && (
                                        <>
                                            <PanelBody
                                                title={__("Load More Styles")}
                                                initialOpen={false}
                                            >
                                                {/* If load More type "Load More Button" */}
                                                {loadMoreOptions.loadMoreType ===
                                                    "1" && (
                                                        <ButtonGroup
                                                            id="essential-blocks"
                                                            className="eb-inspector-btn-group"
                                                        >
                                                            {NORMAL_HOVER.map(
                                                                (item, index) => (
                                                                    <Button
                                                                        key={index}
                                                                        isLarge
                                                                        isPrimary={
                                                                            loadMoreColorType ===
                                                                            item.value
                                                                        }
                                                                        isSecondary={
                                                                            loadMoreColorType !==
                                                                            item.value
                                                                        }
                                                                        onClick={() =>
                                                                            setAttributes(
                                                                                {
                                                                                    loadMoreColorType:
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
                                                    )}

                                                {/* If load More type "Pagination" */}
                                                {loadMoreOptions.loadMoreType ===
                                                    "2" && (
                                                        <BaseControl
                                                            label={__(
                                                                "",
                                                                "essential-blocks"
                                                            )}
                                                            id="eb-advance-heading-alignment"
                                                        >
                                                            <ButtonGroup id="eb-advance-heading-alignment">
                                                                {NORMAL_HOVER_ACTIVE.map(
                                                                    (
                                                                        item,
                                                                        index
                                                                    ) => (
                                                                        <Button
                                                                            key={
                                                                                index
                                                                            }
                                                                            isLarge
                                                                            isPrimary={
                                                                                loadMoreColorType ===
                                                                                item.value
                                                                            }
                                                                            isSecondary={
                                                                                loadMoreColorType !==
                                                                                item.value
                                                                            }
                                                                            onClick={() =>
                                                                                setAttributes(
                                                                                    {
                                                                                        loadMoreColorType:
                                                                                            item.value,
                                                                                    }
                                                                                )
                                                                            }
                                                                        >
                                                                            {
                                                                                item.label
                                                                            }
                                                                        </Button>
                                                                    )
                                                                )}
                                                            </ButtonGroup>
                                                        </BaseControl>
                                                    )}

                                                {loadMoreColorType ===
                                                    "normal" && (
                                                        <PanelColorSettings
                                                            className={
                                                                "eb-subpanel"
                                                            }
                                                            title={__(
                                                                "Normal Color",
                                                                "essential-blocks"
                                                            )}
                                                            initialOpen={true}
                                                            colorSettings={[
                                                                {
                                                                    value: loadMoreColor,
                                                                    onChange: (
                                                                        newColor
                                                                    ) =>
                                                                        setAttributes(
                                                                            {
                                                                                loadMoreColor: newColor,
                                                                            }
                                                                        ),
                                                                    label: __(
                                                                        "Color",
                                                                        "essential-blocks"
                                                                    ),
                                                                },
                                                                {
                                                                    value: loadMoreBgColor,
                                                                    onChange: (
                                                                        newColor
                                                                    ) =>
                                                                        setAttributes(
                                                                            {
                                                                                loadMoreBgColor: newColor,
                                                                            }
                                                                        ),
                                                                    label: __(
                                                                        "Background Color",
                                                                        "essential-blocks"
                                                                    ),
                                                                },
                                                            ]}
                                                        />
                                                    )}
                                                {loadMoreColorType ===
                                                    "hover" && (
                                                        <PanelColorSettings
                                                            className={
                                                                "eb-subpanel"
                                                            }
                                                            title={__(
                                                                "Hover Color",
                                                                "essential-blocks"
                                                            )}
                                                            initialOpen={true}
                                                            colorSettings={[
                                                                {
                                                                    value: loadMoreHoverColor,
                                                                    onChange: (
                                                                        newColor
                                                                    ) =>
                                                                        setAttributes(
                                                                            {
                                                                                loadMoreHoverColor: newColor,
                                                                            }
                                                                        ),
                                                                    label: __(
                                                                        "Color",
                                                                        "essential-blocks"
                                                                    ),
                                                                },
                                                                {
                                                                    value: loadMoreHoverBgColor,
                                                                    onChange: (
                                                                        newColor
                                                                    ) =>
                                                                        setAttributes(
                                                                            {
                                                                                loadMoreHoverBgColor: newColor,
                                                                            }
                                                                        ),
                                                                    label: __(
                                                                        "Background Color",
                                                                        "essential-blocks"
                                                                    ),
                                                                },
                                                            ]}
                                                        />
                                                    )}
                                                {loadMoreColorType ===
                                                    "active" && (
                                                        <PanelColorSettings
                                                            className={
                                                                "eb-subpanel"
                                                            }
                                                            title={__(
                                                                "Active Color",
                                                                "essential-blocks"
                                                            )}
                                                            initialOpen={true}
                                                            colorSettings={[
                                                                {
                                                                    value: loadMoreActiveColor,
                                                                    onChange: (
                                                                        newColor
                                                                    ) =>
                                                                        setAttributes(
                                                                            {
                                                                                loadMoreActiveColor: newColor,
                                                                            }
                                                                        ),
                                                                    label: __(
                                                                        "Color",
                                                                        "essential-blocks"
                                                                    ),
                                                                },
                                                                {
                                                                    value: loadMoreActiveBgColor,
                                                                    onChange: (
                                                                        newColor
                                                                    ) =>
                                                                        setAttributes(
                                                                            {
                                                                                loadMoreActiveBgColor: newColor,
                                                                            }
                                                                        ),
                                                                    label: __(
                                                                        "Background Color",
                                                                        "essential-blocks"
                                                                    ),
                                                                },
                                                            ]}
                                                        />
                                                    )}

                                                <TypographyDropdown
                                                    baseLabel={__(
                                                        "Typography",
                                                        "essential-blocks"
                                                    )}
                                                    typographyPrefixConstant={
                                                        EBPG_LOAD_MORE_TYPOGRAPHY
                                                    }
                                                    resRequiredProps={
                                                        resRequiredProps
                                                    }
                                                />

                                                <PanelBody>
                                                    <ResponsiveDimensionsControl
                                                        resRequiredProps={
                                                            resRequiredProps
                                                        }
                                                        controlName={
                                                            LOADMORE_MARGIN
                                                        }
                                                        baseLabel="Margin"
                                                    />
                                                    <ResponsiveDimensionsControl
                                                        resRequiredProps={
                                                            resRequiredProps
                                                        }
                                                        controlName={
                                                            LOADMORE_PADDING
                                                        }
                                                        baseLabel="Padding"
                                                    />
                                                </PanelBody>
                                                <PanelBody
                                                    title={__(
                                                        "Border & Shadow"
                                                    )}
                                                    initialOpen={false}
                                                >
                                                    <BorderShadowControl
                                                        controlName={
                                                            LOADMORE_BORDER_SHADOW
                                                        }
                                                        resRequiredProps={
                                                            resRequiredProps
                                                        }
                                                        noShadow
                                                    // noBorder
                                                    />
                                                </PanelBody>
                                            </PanelBody>
                                        </>
                                    )}

                                    {showTaxonomyFilter && (
                                        <PanelBody
                                            title={__("Taxonomy Filter Style")}
                                            initialOpen={false}
                                        >
                                            <PanelBody>
                                                <ButtonGroup className="eb-inspector-btn-group">
                                                    {NORMAL_HOVER.map(
                                                        (item, index) => (
                                                            <Button
                                                                key={index}
                                                                // isLarge
                                                                isPrimary={
                                                                    filterColorStyle ===
                                                                    item.value
                                                                }
                                                                isSecondary={
                                                                    filterColorStyle !==
                                                                    item.value
                                                                }
                                                                onClick={() =>
                                                                    setAttributes(
                                                                        {
                                                                            filterColorStyle:
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
                                                {filterColorStyle ===
                                                    "normal" && (
                                                        <PanelColorSettings
                                                            className={
                                                                "eb-subpanel"
                                                            }
                                                            title={__(
                                                                "Normal Color",
                                                                "essential-blocks"
                                                            )}
                                                            initialOpen={true}
                                                            colorSettings={[
                                                                {
                                                                    value: filterBgColor,
                                                                    onChange: (
                                                                        newColor
                                                                    ) =>
                                                                        setAttributes(
                                                                            {
                                                                                filterBgColor: newColor,
                                                                            }
                                                                        ),
                                                                    label: __(
                                                                        "Background Color",
                                                                        "essential-blocks"
                                                                    ),
                                                                },
                                                                {
                                                                    value: filterTextColor,
                                                                    onChange: (
                                                                        newColor
                                                                    ) =>
                                                                        setAttributes(
                                                                            {
                                                                                filterTextColor: newColor,
                                                                            }
                                                                        ),
                                                                    label: __(
                                                                        "Text Color",
                                                                        "essential-blocks"
                                                                    ),
                                                                },
                                                                {
                                                                    value: filterActiveBgColor,
                                                                    onChange: (
                                                                        newColor
                                                                    ) =>
                                                                        setAttributes(
                                                                            {
                                                                                filterActiveBgColor: newColor,
                                                                            }
                                                                        ),
                                                                    label: __(
                                                                        "Active Background Color",
                                                                        "essential-blocks"
                                                                    ),
                                                                },
                                                                {
                                                                    value: filterActiveTextColor,
                                                                    onChange: (
                                                                        newColor
                                                                    ) =>
                                                                        setAttributes(
                                                                            {
                                                                                filterActiveTextColor: newColor,
                                                                            }
                                                                        ),
                                                                    label: __(
                                                                        "Active Text Color",
                                                                        "essential-blocks"
                                                                    ),
                                                                },
                                                            ]}
                                                        />
                                                    )}
                                                {filterColorStyle ===
                                                    "hover" && (
                                                        <PanelColorSettings
                                                            className={
                                                                "eb-subpanel"
                                                            }
                                                            title={__(
                                                                "Normal Color",
                                                                "essential-blocks"
                                                            )}
                                                            initialOpen={true}
                                                            colorSettings={[
                                                                {
                                                                    value: filterHoverBgColor,
                                                                    onChange: (
                                                                        newColor
                                                                    ) =>
                                                                        setAttributes(
                                                                            {
                                                                                filterHoverBgColor: newColor,
                                                                            }
                                                                        ),
                                                                    label: __(
                                                                        "Hover Background Color",
                                                                        "essential-blocks"
                                                                    ),
                                                                },
                                                                {
                                                                    value: filterHoverTextColor,
                                                                    onChange: (
                                                                        newColor
                                                                    ) =>
                                                                        setAttributes(
                                                                            {
                                                                                filterHoverTextColor: newColor,
                                                                            }
                                                                        ),
                                                                    label: __(
                                                                        "Hover Text Color",
                                                                        "essential-blocks"
                                                                    ),
                                                                },
                                                            ]}
                                                        />
                                                    )}
                                                <ResponsiveRangeController
                                                    baseLabel={__(
                                                        "Items Gap",
                                                        "essential-blocks"
                                                    )}
                                                    controlName={
                                                        FILTER_ITEM_GAP
                                                    }
                                                    resRequiredProps={
                                                        resRequiredProps
                                                    }
                                                    units={UNIT_TYPES}
                                                    min={1}
                                                    max={100}
                                                    step={1}
                                                />
                                                <TypographyDropdown
                                                    baseLabel={__(
                                                        "Items Typography",
                                                        "essential-blocks"
                                                    )}
                                                    typographyPrefixConstant={
                                                        FILTER_ITEM_TYPOGRAPHY
                                                    }
                                                    resRequiredProps={
                                                        resRequiredProps
                                                    }
                                                />
                                                <ResponsiveDimensionsControl
                                                    resRequiredProps={
                                                        resRequiredProps
                                                    }
                                                    controlName={FILTER_MARGIN}
                                                    baseLabel="Filter Wrapper Margin"
                                                />
                                                <ResponsiveDimensionsControl
                                                    resRequiredProps={
                                                        resRequiredProps
                                                    }
                                                    controlName={
                                                        FILTER_ITEM_PADDING
                                                    }
                                                    baseLabel="Items Padding"
                                                />
                                            </PanelBody>
                                            <PanelBody
                                                title={__("Items Border")}
                                                initialOpen={false}
                                            >
                                                <BorderShadowControl
                                                    controlName={
                                                        FILTER_ITEM_BORDER_SHADOW
                                                    }
                                                    resRequiredProps={
                                                        resRequiredProps
                                                    }
                                                // noShadow
                                                // noBorder
                                                />
                                            </PanelBody>
                                        </PanelBody>
                                    )}
                                </>
                            )}

                            {tab.name === "advance" && (
                                <>
                                    <PanelBody>
                                        <ResponsiveDimensionsControl
                                            resRequiredProps={resRequiredProps}
                                            controlName={WRAPPER_MARGIN}
                                            baseLabel="Margin"
                                        />
                                        <ResponsiveDimensionsControl
                                            resRequiredProps={resRequiredProps}
                                            controlName={WRAPPER_PADDING}
                                            baseLabel="Padding"
                                        />
                                    </PanelBody>
                                    <PanelBody
                                        title={__(
                                            "Background",
                                            "essential-blocks"
                                        )}
                                        initialOpen={false}
                                    >
                                        <BackgroundControl
                                            controlName={WRAPPER_BG}
                                            resRequiredProps={resRequiredProps}
                                            noOverlay
                                        />
                                    </PanelBody>
                                    <PanelBody
                                        title={__("Border & Shadow")}
                                        initialOpen={false}
                                    >
                                        <BorderShadowControl
                                            controlName={WRAPPER_BORDER_SHADOW}
                                            resRequiredProps={resRequiredProps}
                                        // noShadow
                                        // noBorder
                                        />
                                    </PanelBody>

                                    <AdvancedControls
                                        attributes={attributes}
                                        setAttributes={setAttributes}
                                    />
                                </>
                            )}
                        </div>
                    )}
                </TabPanel>
            </div>
        </InspectorControls>
    );
}

export default withSelect((select, ownProps) => {
    const {
        queryData,
        selectedTaxonomy,
        selectedTaxonomyItems,
    } = ownProps.attributes;

    //Get Taxonomies by post type
    const postTypes = select("core").getPostTypes();

    //Get Terms
    const selectedTax = selectedTaxonomy
        ? JSON.parse(selectedTaxonomy).value
        : "category";
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
