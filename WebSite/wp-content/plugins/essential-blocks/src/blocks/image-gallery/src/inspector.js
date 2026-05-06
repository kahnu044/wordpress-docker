/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
    SelectControl,
    ToggleControl,
    TextControl,
    PanelRow,
    RangeControl,
    __experimentalDivider as Divider,
    __experimentalToggleGroupControl as ToggleGroupControl,
    __experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from "@wordpress/components";
import { useState, useEffect } from "@wordpress/element";
import { select } from "@wordpress/data";
import { applyFilters } from "@wordpress/hooks";

/**
 * External Dependencies
 */
import Select2 from "react-select";

import {
    WRAPPER_BG,
    WRAPPER_MARGIN,
    WRAPPER_PADDING,
    WRAPPER_BORDER_SHADOW,
    GRID_COLUMNS,
    IMAGE_GAP,
    IMAGE_BORDER_SHADOW,
    CAPTION_MARGIN,
    CAPTION_PADDING,
    CAPTION_WIDTH,
    LAYOUTS,
    STYLES,
    OVERLAY_STYLES,
    TEXT_ALIGN,
    HORIZONTAL_ALIGN,
    VERTICAL_ALIGN,
    UNIT_TYPES,
    IMAGE_UNIT_TYPES,
    IMAGE_WIDTH,
    IMAGE_HEIGHT,
    IMAGE_MAX_WIDTH,
    IMAGE_MAX_HEIGHT,
    IMAGE_SIZE_TYPE,
    FLEX_ALIGN,
    FILTER_PADDING,
    FILTER_MARGIN,
    NORMAL_HOVER,
    NORMAL_HOVER_ACTIVE,
    FILTER_BORDER_SHADOW,
    LOADMORE_PADDING,
    LOADMORE_BORDER,
    LOADMORE_KEYS,
    PRESETS,
    DESCRIPTION_PADDING,
    DESCRIPTION_MARGIN,
    ICON_BORDER_SHADOW,
    CONTENT_ALIGN,
    CONTENT_PADDING,
    CONTENT_MARGIN,
    CONTENT_BORDER_SHADOW,
    OVERLAY_PADDING,
    FILTER_WRAPPER_BORDER_SHADOW,
} from "./constants";

import { FILTER_TYPOGRAPHY, LOADMORE_TYPOGRAPHY, CAPTION_TYPOGRAPHY, DESCRIPTION_TYPOGRAPHY, NOT_FOUND_TYPOGRAPHY } from "./typoConstants";

import { handleCustomURL, handleOpenNewTab, handleImageData, handleImage } from "./helpers";

import {
    ResponsiveDimensionsControl,
    TypographyDropdown,
    BorderShadowControl,
    ResponsiveRangeController,
    ColorControl,
    EbImageSizeSelector,
    SortControl,
    InspectorPanel,
    ImageAvatar,
    EBButton,
    EBIconPicker,
    ProSelectControl,
    ImageComponent
} from "@essential-blocks/controls";

function Inspector(props) {
    const { attributes, setAttributes, onImageChange } = props;
    const {
        layouts,
        displayCaption,
        captionOnHover,
        captionColor,
        overlayColor,
        captionBGColor,
        horizontalAlign,
        verticalAlign,
        textAlign,
        styleNumber,
        overlayStyle,
        disableLightBox,
        imageSizeType,
        imageSize,
        imageAlignment,
        enableFilter,
        enableFilterAll,
        filterAllTitle,
        sources,
        filterItems,
        defaultFilter,
        filterColorType,
        filterColor,
        filterHoverColor,
        filterBGColor,
        filterHoverBGColor,
        filterActColor,
        filterActBGColor,
        addCustomLink,
        enableIsotope,
        enableLoadMore,
        loadmoreBtnText,
        enableInfiniteScroll,
        imagesPerPageCount,
        displayDescription,
        presets,
        lightboxIcon,
        linkIcon,
        descriptionColor,
        descriptionBGColor,
        iconType,
        iconColor,
        iconHoverColor,
        iconBGColor,
        iconHoverBGColor,
        iconWidth,
        iconSize,
        contentAlign,
        contentBGColor,
        maskColor,
        enableSearch,
        filterWrapperBGColor,
        unevenWidth,
        notFoundColor,
        notFoundText,
        version,
        columnsRange,
        disableIsotope
    } = attributes;

    const [defaultFilterOptions, setDefaultFilterOptions] = useState("");

    /**
     * Get All Image Sizes
     */
    const [imageAllSizes, setImageAllSizes] = useState([]);
    useEffect(() => {
        const sizes = select("core/block-editor").getSettings().imageSizes;
        if (typeof sizes === "object" && sizes.length > 0) {
            let updatedSize = [
                {
                    label: "Default",
                    value: "",
                },
            ];
            sizes.map((item, index) => {
                updatedSize.push({
                    label: item.name,
                    value: item.slug,
                });
            });
            setImageAllSizes(updatedSize);
        }

    }, []);

    useEffect(() => {
        if (!enableFilter) {
            return
        }
        let options = [];

        if (enableFilterAll) {
            options.push({
                label: filterAllTitle,
                value: '*'
            });
        }

        if (filterItems.length > 0) {
            options = [
                ...options,
                ...filterItems
            ]
        }

        setDefaultFilterOptions([...options])

    }, [filterItems, enableFilter, enableFilterAll])

    useEffect(() => {
        (defaultFilter === undefined && defaultFilterOptions.length > 0) ? setAttributes({ defaultFilter: defaultFilterOptions[0].value }) : null;
        (!enableFilterAll && defaultFilter === '*' && defaultFilterOptions.length > 0) ? setAttributes({ defaultFilter: defaultFilterOptions[0].value }) : null;
    }, [defaultFilter, defaultFilterOptions])

    useEffect(() => {
        { enableFilter === true ? setAttributes({ enableIsotope: false }) : null }
    }, [enableFilter])

    useEffect(() => {
        { enableIsotope === false ? setAttributes({ enableLoadMore: false }) : null }
    }, [enableIsotope])

    useEffect(() => {
        if (columnsRange <= 2) {
            setAttributes({ enableEmptyGrid: false });
        }

    }, [columnsRange]);

    /**
     * Change Styles
     */
    const changeStyle = (selected) => {
        setAttributes({ styleNumber: selected });
        switch (selected) {
            case "0":
                setAttributes({});
                break;
            case "1":
                setAttributes({});
                break;
            case "2":
                setAttributes({
                    displayCaption: true,
                });
                break;
            default:
                return false;
        }
    };

    /**
    * Change Presets
    */
    const changePreset = (selected) => {
        setAttributes({ presets: selected });
        // pro preset
        applyFilters("eb_image_gallery_preset_change", selected, attributes, setAttributes);

        switch (selected) {
            case "default":
                setAttributes({
                    disableIsotope: false,
                    displayCaption: false,
                    displayDescription: false,
                    disableLightBox: false,
                    addCustomLink: false,
                    enableFilter: false,
                    enableSearch: false,
                    layouts: 'grid',
                    unevenWidth: false,
                    columnsRange: 3,
                    TABcolumnsRange: 2,
                    align: undefined,

                    imageGapRange: 10,
                    imgBorderShadowRds_Bottom: "0",
                    imgBorderShadowRds_Left: "0",
                    imgBorderShadowRds_Right: "0",
                    imgBorderShadowRds_Top: "0",
                    imgBorderShadowRds_Unit: "px",
                    imgBorderShadowRds_isLinked: true,

                    contentBGColor: 'var(--eb-global-secondary-color)',
                    captionColor: 'var(--eb-global-button-text-color)',
                    captionBGColor: 'var(--eb-global-secondary-color)',
                    captionTypoFontSize: 13,
                    captionPaddingBottom: "5",
                    captionPaddingLeft: "10",
                    captionPaddingRight: "10",
                    captionPaddingTop: "5",
                    captionPaddingUnit: "px",
                    captionPaddingisLinked: false,
                    descriptionColor: 'var(--eb-global-button-text-color)',
                    descTypoFontSize: 13,
                    descPaddingBottom: "5",
                    descPaddingLeft: "10",
                    descPaddingRight: "10",
                    descPaddingTop: "5",
                    descPaddingUnit: "px",
                    descPaddingisLinked: false,

                    filterWrapperBGColor: '',
                    filterWrapBSRds_Bottom: "0",
                    filterWrapBSRds_Left: "0",
                    filterWrapBSRds_Right: "0",
                    filterWrapBSRds_Top: "0",
                    filterWrapBSRds_Unit: "px",
                    filterWrapBSRds_isLinked: true,
                    filterWrapBSborderStyle: "none",

                    filterColor: 'var(--eb-global-text-color)',
                    filterBGColor: 'var(--eb-global-tertiary-color)',
                    filterHoverColor: 'var(--eb-global-button-text-color)',
                    filterHoverBGColor: 'var(--eb-global-primary-color)',
                    filterActColor: 'var(--eb-global-button-text-color)',
                    filterActBGColor: 'var(--eb-global-primary-color)',
                    filterTypoFontSize: 16,
                    filterTypoTextTransform: "uppercase",
                    filterPaddingBottom: "05",
                    filterPaddingLeft: "10",
                    filterPaddingRight: "10",
                    filterPaddingTop: "05",
                    filterPaddingUnit: "px",
                    filterPaddingisLinked: false,
                    filterMarginBottom: "0",
                    filterMarginLeft: "5",
                    filterMarginRight: "5",
                    filterMarginTop: "0",
                    filterMarginUnit: "px",
                    filterMarginisLinked: false,
                    filterBorderShadowRds_Bottom: "0",
                    filterBorderShadowRds_Left: "0",
                    filterBorderShadowRds_Right: "0",
                    filterBorderShadowRds_Top: "0",
                    filterBorderShadowRds_Unit: "px",
                    filterBorderShadowRds_isLinked: true,
                    filterBorderShadowborderStyle: "none",
                    filterBorderShadowHborderStyle: "none",
                });
                break;
            case "preset-2":
                setAttributes({
                    disableIsotope: false,
                    displayCaption: true,
                    displayDescription: true,
                    disableLightBox: false,
                    addCustomLink: true,
                    enableFilter: true,
                    enableSearch: false,
                    layouts: 'grid',
                    unevenWidth: false,
                    columnsRange: 3,
                    TABcolumnsRange: 2,
                    align: undefined,

                    imageGapRange: 25,
                    imgBorderShadowRds_Bottom: "0",
                    imgBorderShadowRds_Left: "0",
                    imgBorderShadowRds_Right: "0",
                    imgBorderShadowRds_Top: "0",
                    imgBorderShadowRds_Unit: "px",
                    imgBorderShadowRds_isLinked: true,

                    overlayColor: '#525A66',
                    overlayPaddingBottom: "0",
                    overlayPaddingLeft: "0",
                    overlayPaddingRight: "0",
                    overlayPaddingTop: "0",
                    overlayPaddingUnit: "px",
                    overlayPaddingisLinked: true,

                    contentBGColor: '',
                    contentAlign: 'left',
                    contentPaddingBottom: "0",
                    contentPaddingLeft: "0",
                    contentPaddingRight: "0",
                    contentPaddingTop: "0",
                    contentPaddingUnit: "px",
                    contentPaddingisLinked: true,
                    contentMarginBottom: "0",
                    contentMarginLeft: "0",
                    contentMarginRight: "0",
                    contentMarginTop: "0",
                    contentMarginUnit: "px",
                    contentMarginisLinked: true,
                    contentBorderShadowRds_Bottom: "0",
                    contentBorderShadowRds_Left: "0",
                    contentBorderShadowRds_Right: "0",
                    contentBorderShadowRds_Top: "0",
                    contentBorderShadowRds_Unit: "px",
                    contentBorderShadowRds_isLinked: true,
                    contentBorderShadowborderStyle: "none",

                    captionColor: '#ffffff',
                    captionBGColor: '',
                    descriptionColor: '#ffffff',
                    descriptionBGColor: '',
                    captionTypoFontSize: 20,
                    descTypoFontSize: 14,
                    captionPaddingBottom: "0",
                    captionPaddingLeft: "0",
                    captionPaddingRight: "0",
                    captionPaddingTop: "0",
                    captionPaddingUnit: "px",
                    captionPaddingisLinked: false,
                    descPaddingBottom: "0",
                    descPaddingLeft: "0",
                    descPaddingRight: "0",
                    descPaddingTop: "10",
                    descPaddingUnit: "px",
                    descPaddingisLinked: false,

                    iconColor: '#000000',
                    iconHoverColor: '#2673FF',
                    iconBGColor: '#ffffff',
                    iconHoverBGColor: '',
                    iconWidth: 40,
                    iconSize: 16,
                    iconBorderShadowRds_Bottom: "0",
                    iconBorderShadowRds_Left: "0",
                    iconBorderShadowRds_Right: "0",
                    iconBorderShadowRds_Top: "0",
                    iconBorderShadowRds_Unit: "px",
                    iconBorderShadowRds_isLinked: true,
                    iconBorderShadowborderStyle: "none",

                    filterWrapperBGColor: '',
                    filterWrapBSRds_Bottom: "0",
                    filterWrapBSRds_Left: "0",
                    filterWrapBSRds_Right: "0",
                    filterWrapBSRds_Top: "0",
                    filterWrapBSRds_Unit: "px",
                    filterWrapBSRds_isLinked: true,
                    filterWrapBSborderStyle: "none",

                    filterColor: '#444F62',
                    filterBGColor: '',
                    filterHoverColor: '#444F62',
                    filterHoverBGColor: '',
                    filterActColor: '#FFFFFF',
                    filterActBGColor: '#000000',
                    filterTypoFontSize: 16,
                    filterTypoTextTransform: "capitalize",
                    filterPaddingBottom: "05",
                    filterPaddingLeft: "20",
                    filterPaddingRight: "20",
                    filterPaddingTop: "05",
                    filterPaddingUnit: "px",
                    filterPaddingisLinked: false,
                    filterMarginBottom: "0",
                    filterMarginLeft: "10",
                    filterMarginRight: "10",
                    filterMarginTop: "0",
                    filterMarginUnit: "px",
                    filterMarginisLinked: false,
                    filterBorderShadowRds_Bottom: "4",
                    filterBorderShadowRds_Left: "4",
                    filterBorderShadowRds_Right: "4",
                    filterBorderShadowRds_Top: "4",
                    filterBorderShadowRds_Unit: "px",
                    filterBorderShadowRds_isLinked: true,
                    filterBorderShadowBdr_Bottom: "1",
                    filterBorderShadowBdr_Left: "1",
                    filterBorderShadowBdr_Right: "1",
                    filterBorderShadowBdr_Top: "1",
                    filterBorderShadowBdr_Unit: "px",
                    filterBorderShadowBdr_isLinked: true,
                    filterBorderShadowborderColor: "#A9A9A9",
                    filterBorderShadowborderStyle: "dashed",

                    filterBorderShadowHborderColor: "rgba(4,4,4,1)",
                    filterBorderShadowHborderStyle: "dashed",
                });
                break;
            case "preset-3":
                setAttributes({
                    disableIsotope: false,
                    displayCaption: true,
                    displayDescription: true,
                    disableLightBox: false,
                    addCustomLink: true,
                    enableFilter: true,
                    enableSearch: false,
                    layouts: 'grid',
                    unevenWidth: false,
                    columnsRange: 3,
                    TABcolumnsRange: 2,
                    align: undefined,

                    imageGapRange: 25,
                    imgBorderShadowRds_Bottom: "8",
                    imgBorderShadowRds_Left: "8",
                    imgBorderShadowRds_Right: "8",
                    imgBorderShadowRds_Top: "8",
                    imgBorderShadowRds_Unit: "px",
                    imgBorderShadowRds_isLinked: true,

                    maskColor: '#fff',

                    overlayColor: '#525A66',
                    overlayPaddingBottom: "24",
                    overlayPaddingLeft: "24",
                    overlayPaddingRight: "24",
                    overlayPaddingTop: "24",
                    overlayPaddingUnit: "px",
                    overlayPaddingisLinked: true,

                    contentBGColor: '',
                    contentAlign: 'left',
                    contentPaddingBottom: "0",
                    contentPaddingLeft: "0",
                    contentPaddingRight: "0",
                    contentPaddingTop: "0",
                    contentPaddingUnit: "px",
                    contentPaddingisLinked: true,
                    contentMarginBottom: "0",
                    contentMarginLeft: "0",
                    contentMarginRight: "0",
                    contentMarginTop: "0",
                    contentMarginUnit: "px",
                    contentMarginisLinked: true,
                    contentBorderShadowRds_Bottom: "0",
                    contentBorderShadowRds_Left: "0",
                    contentBorderShadowRds_Right: "0",
                    contentBorderShadowRds_Top: "0",
                    contentBorderShadowRds_Unit: "px",
                    contentBorderShadowRds_isLinked: true,
                    contentBorderShadowborderStyle: "none",

                    captionColor: '#ffffff',
                    captionBGColor: '',
                    descriptionColor: '#ffffff',
                    descriptionBGColor: '',
                    captionTypoFontSize: 18,
                    descTypoFontSize: 14,
                    captionPaddingBottom: "0",
                    captionPaddingLeft: "0",
                    captionPaddingRight: "0",
                    captionPaddingTop: "0",
                    captionPaddingUnit: "px",
                    captionPaddingisLinked: false,
                    descPaddingBottom: "0",
                    descPaddingLeft: "0",
                    descPaddingRight: "0",
                    descPaddingTop: "10",
                    descPaddingUnit: "px",
                    descPaddingisLinked: false,

                    iconColor: '#ffffff',
                    iconHoverColor: '#2673FF',
                    iconBGColor: '#525A66',
                    iconHoverBGColor: '',
                    iconWidth: 40,
                    iconSize: 16,
                    iconBorderShadowRds_Bottom: "8",
                    iconBorderShadowRds_Left: "8",
                    iconBorderShadowRds_Right: "8",
                    iconBorderShadowRds_Top: "8",
                    iconBorderShadowRds_Unit: "px",
                    iconBorderShadowRds_isLinked: true,
                    iconBorderShadowborderStyle: "none",

                    filterWrapperBGColor: '',
                    filterWrapBSRds_Bottom: "0",
                    filterWrapBSRds_Left: "0",
                    filterWrapBSRds_Right: "0",
                    filterWrapBSRds_Top: "0",
                    filterWrapBSRds_Unit: "px",
                    filterWrapBSRds_isLinked: true,
                    filterWrapBSborderStyle: "none",

                    filterColor: '#444F62',
                    filterBGColor: '',
                    filterHoverColor: '#444F62',
                    filterHoverBGColor: '',
                    filterActColor: '#FFFFFF',
                    filterActBGColor: '#606977',
                    filterTypoFontSize: 16,
                    filterTypoTextTransform: "capitalize",
                    filterPaddingBottom: "05",
                    filterPaddingLeft: "20",
                    filterPaddingRight: "20",
                    filterPaddingTop: "05",
                    filterPaddingUnit: "px",
                    filterPaddingisLinked: false,
                    filterMarginBottom: "0",
                    filterMarginLeft: "10",
                    filterMarginRight: "10",
                    filterMarginTop: "0",
                    filterMarginUnit: "px",
                    filterMarginisLinked: false,
                    filterBorderShadowRds_Bottom: "20",
                    filterBorderShadowRds_Left: "20",
                    filterBorderShadowRds_Right: "20",
                    filterBorderShadowRds_Top: "20",
                    filterBorderShadowRds_Unit: "px",
                    filterBorderShadowRds_isLinked: true,
                    filterBorderShadowBdr_Bottom: "1",
                    filterBorderShadowBdr_Left: "1",
                    filterBorderShadowBdr_Right: "1",
                    filterBorderShadowBdr_Top: "1",
                    filterBorderShadowBdr_Unit: "px",
                    filterBorderShadowBdr_isLinked: true,
                    filterBorderShadowborderColor: "#A9A9A9",
                    filterBorderShadowborderStyle: "solid",

                    filterBorderShadowHborderColor: "#606977",
                    filterBorderShadowHborderStyle: "solid",
                });
                break;
            case "preset-4":
                setAttributes({
                    disableIsotope: false,
                    displayCaption: true,
                    displayDescription: true,
                    disableLightBox: false,
                    addCustomLink: true,
                    enableFilter: true,
                    enableSearch: false,
                    layouts: 'grid',
                    unevenWidth: false,
                    columnsRange: 3,
                    TABcolumnsRange: 2,
                    align: undefined,

                    imageGapRange: 25,
                    imgBorderShadowRds_Bottom: "8",
                    imgBorderShadowRds_Left: "8",
                    imgBorderShadowRds_Right: "8",
                    imgBorderShadowRds_Top: "8",
                    imgBorderShadowRds_Unit: "px",
                    imgBorderShadowRds_isLinked: true,

                    overlayColor: '',
                    overlayPaddingBottom: "24",
                    overlayPaddingLeft: "24",
                    overlayPaddingRight: "24",
                    overlayPaddingTop: "24",
                    overlayPaddingUnit: "px",
                    overlayPaddingisLinked: true,

                    contentBGColor: '#fff',
                    contentAlign: 'left',
                    contentPaddingBottom: "16",
                    contentPaddingLeft: "16",
                    contentPaddingRight: "16",
                    contentPaddingTop: "16",
                    contentPaddingUnit: "px",
                    contentPaddingisLinked: true,
                    contentMarginBottom: "0",
                    contentMarginLeft: "0",
                    contentMarginRight: "0",
                    contentMarginTop: "0",
                    contentMarginUnit: "px",
                    contentMarginisLinked: true,
                    contentBorderShadowRds_Bottom: "8",
                    contentBorderShadowRds_Left: "8",
                    contentBorderShadowRds_Right: "8",
                    contentBorderShadowRds_Top: "8",
                    contentBorderShadowRds_Unit: "px",
                    contentBorderShadowRds_isLinked: true,
                    contentBorderShadowBdr_Bottom: "1",
                    contentBorderShadowBdr_Left: "1",
                    contentBorderShadowBdr_Right: "1",
                    contentBorderShadowBdr_Top: "1",
                    contentBorderShadowBdr_Unit: "px",
                    contentBorderShadowBdr_isLinked: true,
                    contentBorderShadowborderColor: "#DAE0EE",
                    contentBorderShadowborderStyle: "solid",

                    captionColor: '#2D323A',
                    captionBGColor: '',
                    descriptionColor: '#7F8794',
                    descriptionBGColor: '',
                    captionTypoFontSize: 20,
                    descTypoFontSize: 14,
                    captionPaddingBottom: "0",
                    captionPaddingLeft: "0",
                    captionPaddingRight: "0",
                    captionPaddingTop: "0",
                    captionPaddingUnit: "px",
                    captionPaddingisLinked: false,
                    descPaddingBottom: "0",
                    descPaddingLeft: "0",
                    descPaddingRight: "0",
                    descPaddingTop: "10",
                    descPaddingUnit: "px",
                    descPaddingisLinked: false,

                    iconColor: '#444F62',
                    iconHoverColor: '#2673FF',
                    iconBGColor: '#ffffff',
                    iconHoverBGColor: '',
                    iconWidth: 40,
                    iconSize: 16,
                    iconBorderShadowRds_Bottom: "8",
                    iconBorderShadowRds_Left: "8",
                    iconBorderShadowRds_Right: "8",
                    iconBorderShadowRds_Top: "8",
                    iconBorderShadowRds_Unit: "px",
                    iconBorderShadowRds_isLinked: true,
                    iconBorderShadowBdr_Bottom: "1",
                    iconBorderShadowBdr_Left: "1",
                    iconBorderShadowBdr_Right: "1",
                    iconBorderShadowBdr_Top: "1",
                    iconBorderShadowBdr_Unit: "px",
                    iconBorderShadowBdr_isLinked: true,
                    iconBorderShadowborderColor: "#DAE0EE",
                    iconBorderShadowborderStyle: "solid",

                    filterWrapperBGColor: '#EFF2F9',
                    filterWrapBSRds_Bottom: "8",
                    filterWrapBSRds_Left: "8",
                    filterWrapBSRds_Right: "8",
                    filterWrapBSRds_Top: "8",
                    filterWrapBSRds_Unit: "px",
                    filterWrapBSRds_isLinked: true,
                    filterWrapBSBdr_Bottom: "5",
                    filterWrapBSBdr_Left: "5",
                    filterWrapBSBdr_Right: "5",
                    filterWrapBSBdr_Top: "5",
                    filterWrapBSBdr_Unit: "px",
                    filterWrapBSBdr_isLinked: true,
                    filterWrapBSborderColor: "#EFF2F9",
                    filterWrapBSborderStyle: "solid",

                    filterColor: '#444F62',
                    filterBGColor: '',
                    filterHoverColor: '#2D323A',
                    filterHoverBGColor: '',
                    filterActColor: '#2D323A',
                    filterActBGColor: '',
                    filterTypoFontSize: 16,
                    filterTypoTextTransform: "capitalize",
                    filterPaddingBottom: "15",
                    filterPaddingLeft: "22",
                    filterPaddingRight: "22",
                    filterPaddingTop: "15",
                    filterPaddingUnit: "px",
                    filterPaddingisLinked: false,
                    filterMarginBottom: "0",
                    filterMarginLeft: "0",
                    filterMarginRight: "0",
                    filterMarginTop: "0",
                    filterMarginUnit: "px",
                    filterMarginisLinked: false,
                    filterBorderShadowRds_Bottom: "0",
                    filterBorderShadowRds_Left: "0",
                    filterBorderShadowRds_Right: "0",
                    filterBorderShadowRds_Top: "0",
                    filterBorderShadowRds_Unit: "px",
                    filterBorderShadowRds_isLinked: true,
                    filterBorderShadowborderStyle: "none",
                    filterBorderShadowHborderStyle: "none",
                });
                break;
            default:
                return false;
        }
    };

    // add filter item
    const onFilterAdd = () => {
        const count = attributes.filterItems.length + 1;
        const filterItems = [
            ...attributes.filterItems,
            {
                value: `filter-item-${count}`,
                label: `Filter Item ${count}`,
            },
        ];

        setAttributes({ filterItems: filterItems });
    };

    const handleSelect2Filter = (options, id) => {
        let newOptions = JSON.stringify(options);

        let updatedSources = sources.map((item, index) => {
            if (id === index) {
                const newItime = { ...item };
                newItime.filter = newOptions;
                return newItime;
            }
            return item;
        });

        setAttributes({ sources: updatedSources });
    };

    const handleLoadMore = (enableLoadMore) => {
        let attr = {
            enableLoadMore: enableLoadMore,
        }
        if (!enableFilter && !enableIsotope) {
            attr = { ...attr, enableIsotope: true }
        }
        setAttributes(attr);
    };

    useEffect(() => {
        enableInfiniteScroll ? setAttributes({ loadmoreBtnText: 'Loading ...', }) : setAttributes({ loadmoreBtnText: 'Load More', });
    }, [enableInfiniteScroll])

    useEffect(() => {
        if (sources.length > 0) {
            sources && typeof imageSize !== 'undefined' && onImageChange(sources);
        }
    }, [imageSize]);

    const getFilterItemsComponents = () => {
        const onFeatureChange = (key, value, position) => {
            let filterItems = [...attributes.filterItems];

            filterItems[position][key] = value;

            //sort
            let newValue = value.toLowerCase();
            newValue = newValue.replaceAll(" ", "-");
            newValue = newValue.replaceAll(",-", " eb-filter-img-");
            newValue = newValue.replaceAll(",", "comma");
            newValue = newValue.replaceAll("&", "and");
            newValue = newValue.replaceAll("+", "plus");
            newValue = newValue.replaceAll("amp;", "");
            newValue = newValue.replaceAll("/", "slash");
            newValue = newValue.replaceAll("'", "apostrophe");
            newValue = newValue.replaceAll('"', "apostrophe");
            newValue = newValue.replaceAll(".", "-");
            newValue = newValue.replaceAll("~", "tilde");
            newValue = newValue.replaceAll("!", "exclamation");
            newValue = newValue.replaceAll("@", "at");
            newValue = newValue.replaceAll("#", "hash");
            newValue = newValue.replaceAll("(", "parenthesis");
            newValue = newValue.replaceAll(")", "parenthesis");
            newValue = newValue.replaceAll("=", "equal");
            newValue = newValue.replaceAll(";", "semicolon");
            newValue = newValue.replaceAll(":", "colon");
            newValue = newValue.replaceAll("<", "lessthan");
            newValue = newValue.replaceAll(">", "greaterthan");
            newValue = newValue.replaceAll("|", "pipe");
            newValue = newValue.replaceAll("\\", "backslash");
            newValue = newValue.replaceAll("^", "caret");
            newValue = newValue.replaceAll("*", "asterisk");
            newValue = newValue.replaceAll("$", "dollar");
            newValue = newValue.replaceAll("`", "backtick");
            newValue = newValue.replaceAll("[", "bracket");
            newValue = newValue.replaceAll("]", "bracket");
            newValue = newValue.replaceAll("{", "curlybracket");
            newValue = newValue.replaceAll("}", "curlybracket");
            newValue = newValue.replaceAll("?", "questionmark");

            filterItems[position]["value"] = newValue;

            setAttributes({ filterItems });
        };

        return attributes.filterItems.map((each, i) => (
            <div key={i}>
                <TextControl
                    label={__("Text", "essential-blocks")}
                    value={each.label}
                    onChange={(value) => onFeatureChange("label", value, i)}
                    __next40pxDefaultSize
                    __nextHasNoMarginBottom
                />
            </div>
        ))
    }
    const getGalleryItemsComponents = () => {
        return attributes.sources.map((each, i) => (
            <div key={i}>
                <PanelRow>
                    {__("Image", "essential-blocks")}
                </PanelRow>
                <ImageComponent.GeneralTab
                    onSelect={(value) => handleImage(value, i, sources, setAttributes)}
                    value={(!each.url || each.url.startsWith('data:image/')) ? each.id : each.url}
                    hasTag={false}
                    hasCaption={false}
                    hasStyle={false}
                    hasLink={false}
                    showInPanel={false}
                />

                {enableFilter && (
                    <>
                        <PanelRow>
                            {__("Filter", "essential-blocks")}
                        </PanelRow>
                        <Select2
                            name="select-gallery-item"
                            value={each.filter
                                ? JSON.parse(each.filter) : ""
                            }
                            onChange={(selected) =>
                                handleSelect2Filter(
                                    selected,
                                    i
                                )
                            }
                            options={
                                filterItems
                            }
                            isMulti="true"
                            Placeholder="Select Filter"
                        />
                    </>

                )}

                <Divider />

                {displayCaption && (
                    <TextControl
                        label={__("Caption", "essential-blocks")}
                        value={each.caption}
                        onChange={(value) =>
                            handleImageData(
                                'caption',
                                value,
                                each.id,
                                sources,
                                setAttributes
                            )}
                        __next40pxDefaultSize
                        __nextHasNoMarginBottom
                    />
                )}

                {displayDescription && (
                    <TextControl
                        label={__("Description", "essential-blocks")}
                        value={each.content}
                        onChange={(value) =>
                            handleImageData(
                                'content',
                                value,
                                each.id,
                                sources,
                                setAttributes
                            )
                        }
                        __next40pxDefaultSize
                        __nextHasNoMarginBottom
                    />
                )}

                {((presets == 'default' && disableLightBox && addCustomLink) || (presets !== 'default' && addCustomLink)) && (
                    <>
                        <TextControl
                            label={__(
                                "URL",
                                "essential-blocks"
                            )}
                            value={
                                each.customLink
                            }
                            onChange={(
                                text
                            ) =>
                                handleCustomURL(
                                    text,
                                    each.id,
                                    sources,
                                    setAttributes
                                )
                            }
                            __next40pxDefaultSize
                            __nextHasNoMarginBottom
                        />
                        {each.url &&
                            each.url
                                .length >
                            0 &&
                            !each.isValidUrl && (
                                <span className="error"> URL is not valid </span>
                            )}
                        <ToggleControl
                            label={__(
                                "Open in New Tab",
                                "essential-blocks"
                            )}
                            checked={
                                each.openNewTab
                            }
                            onChange={() =>
                                handleOpenNewTab(
                                    !each.openNewTab,
                                    each.id,
                                    sources,
                                    setAttributes
                                )
                            }
                            __nextHasNoMarginBottom
                        />
                    </>
                )}
            </div>
        ))
    }
    return (
        <InspectorPanel advancedControlProps={{
            marginPrefix: WRAPPER_MARGIN,
            paddingPrefix: WRAPPER_PADDING,
            backgroundPrefix: WRAPPER_BG,
            borderPrefix: WRAPPER_BORDER_SHADOW,
            hasMargin: true
        }}>
            <InspectorPanel.General>
                <>
                    <InspectorPanel.PanelBody
                        title={__(
                            "General",
                            "essential-blocks"
                        )}
                        initialOpen={true}
                    >
                        {(presets !== 'pro-preset-5' && presets !== 'pro-preset-6') && (
                            <>
                                <SelectControl
                                    label={__(
                                        "Layouts",
                                        "essential-blocks"
                                    )}
                                    value={layouts}
                                    options={LAYOUTS}
                                    onChange={(layouts) =>
                                        setAttributes({
                                            layouts,
                                            disableIsotope: layouts === 'masonry' ? false : disableIsotope,
                                        })
                                    }
                                    __next40pxDefaultSize
                                    __nextHasNoMarginBottom
                                />
                                {layouts == 'masonry' && (
                                    <ToggleControl
                                        label={__(
                                            "Uneven Width",
                                            "essential-blocks"
                                        )}
                                        checked={unevenWidth}
                                        onChange={() =>
                                            setAttributes({
                                                unevenWidth: !unevenWidth,
                                            })
                                        }
                                        __nextHasNoMarginBottom
                                    />
                                )}
                            </>
                        )}


                        <ProSelectControl
                            label={__("Presets", "essential-blocks")}
                            value={presets}
                            options={applyFilters("eb_post_grid_preset", PRESETS)}
                            onChange={(presets) =>
                                changePreset(presets)
                            }
                        />

                        {presets === 'default' && (
                            <>
                                <SelectControl
                                    label={__(
                                        "Styles",
                                        "essential-blocks"
                                    )}
                                    value={styleNumber}
                                    options={STYLES}
                                    onChange={(styleNumber) =>
                                        changeStyle(styleNumber)
                                    }
                                    __next40pxDefaultSize
                                    __nextHasNoMarginBottom
                                />

                                {styleNumber === "2" && (
                                    <SelectControl
                                        label={__(
                                            "Overlay Styles",
                                            "essential-blocks"
                                        )}
                                        value={overlayStyle}
                                        options={OVERLAY_STYLES}
                                        onChange={(overlayStyle) =>
                                            setAttributes({
                                                overlayStyle,
                                            })
                                        }
                                        __next40pxDefaultSize
                                        __nextHasNoMarginBottom
                                    />
                                )}
                            </>
                        )}

                        <EbImageSizeSelector
                            attrName={"imageSize"}
                            label={__("Image Size", "essential-blocks")} //Optional
                        />

                        <ResponsiveRangeController
                            baseLabel={__(
                                "Columns",
                                "essential-blocks"
                            )}
                            controlName={GRID_COLUMNS}
                            units={[]}
                            min={1}
                            max={presets === 'pro-preset-5' ? 5 : 8}
                            step={1}
                        />

                        <ResponsiveRangeController
                            baseLabel={__(
                                "Image Gap (px)",
                                "essential-blocks"
                            )}
                            controlName={IMAGE_GAP}
                            units={[]}
                            min={0}
                            max={100}
                            step={1}
                        />

                        <ToggleControl
                            label={__(
                                "Display Caption",
                                "essential-blocks"
                            )}
                            checked={displayCaption}
                            onChange={() =>
                                setAttributes({
                                    displayCaption: !displayCaption,
                                })
                            }
                            __nextHasNoMarginBottom
                        />

                        <ToggleControl
                            label={__(
                                "Display Description",
                                "essential-blocks"
                            )}
                            checked={displayDescription}
                            onChange={() =>
                                setAttributes({
                                    displayDescription: !displayDescription,
                                })
                            }
                            __nextHasNoMarginBottom
                        />
                        {presets == 'default' && displayCaption && styleNumber === "0" && (
                            <ToggleControl
                                label={__(
                                    "Display Caption on Hover",
                                    "essential-blocks"
                                )}
                                checked={captionOnHover}
                                onChange={() =>
                                    setAttributes({
                                        captionOnHover: !captionOnHover,
                                    })
                                }
                                __nextHasNoMarginBottom
                            />
                        )}

                        {presets !== 'pro-preset-5' && presets !== 'pro-preset-6' && (
                            <>
                                <ToggleControl
                                    label={__(
                                        "Disable Light Box",
                                        "essential-blocks"
                                    )}
                                    checked={disableLightBox}
                                    onChange={() =>
                                        setAttributes({
                                            disableLightBox: !disableLightBox,
                                        })
                                    }
                                    __nextHasNoMarginBottom
                                />
                                {presets !== 'default' && !disableLightBox && (
                                    <EBIconPicker
                                        title={__(
                                            "Lightbox Icon",
                                            "essential-blocks"
                                        )}
                                        value={lightboxIcon}
                                        attributeName={'lightboxIcon'}
                                    />
                                )}

                            </>
                        )}


                        {(presets === 'default' && disableLightBox) || presets !== 'default' && (
                            <>
                                <ToggleControl
                                    label={__("Add custom link?", "essential-blocks")}
                                    checked={addCustomLink}
                                    onChange={() => setAttributes({ addCustomLink: !addCustomLink })}
                                    __nextHasNoMarginBottom
                                />
                                {presets !== 'default' && addCustomLink && (
                                    <EBIconPicker
                                        title={__("Link Icon", "essential-blocks")}
                                        value={linkIcon}
                                        attributeName={'linkIcon'}
                                    />
                                )}
                            </>
                        )}

                        {presets === 'default' && layouts === 'grid' && (
                            <ToggleControl
                                label={__(
                                    "Disable Isotope",
                                    "essential-blocks"
                                )}
                                checked={disableIsotope}
                                onChange={() =>
                                    setAttributes({
                                        disableIsotope: !disableIsotope,
                                    })
                                }
                                help={__("Some of the functions will not work if you disable Isotope, such as load more, filter, and search.", "essential-blocks")}
                                __nextHasNoMarginBottom
                            />
                        )}

                        {applyFilters(
                            "eb_filterable_gallery_pro_settings_tab",
                            "",
                            attributes,
                            setAttributes,
                        )}
                    </InspectorPanel.PanelBody>

                    <InspectorPanel.PanelBody
                        title={__("Filter", "essential-blocks")}
                        initialOpen={false}
                    >
                        <ToggleControl
                            label={__(
                                "Enable Filter",
                                "essential-blocks"
                            )}
                            checked={enableFilter}
                            onChange={() =>
                                setAttributes({
                                    enableFilter: !enableFilter,
                                })
                            }
                            __nextHasNoMarginBottom
                        />

                        {applyFilters(
                            "eb_filterable_gallery_pro_general_tab",
                            "",
                            attributes,
                            setAttributes,
                        )}

                        {enableFilter && (
                            <ToggleControl
                                label={__(
                                    'Enable "All"',
                                    "essential-blocks"
                                )}
                                checked={enableFilterAll}
                                onChange={() =>
                                    setAttributes({
                                        enableFilterAll: !enableFilterAll,
                                    })
                                }
                                __nextHasNoMarginBottom
                            />
                        )}

                        {enableFilter && enableFilterAll && (
                            <TextControl
                                label={__(
                                    '"ALL" Text',
                                    "essential-blocks"
                                )}
                                value={filterAllTitle}
                                onChange={(newtitle) =>
                                    setAttributes({
                                        filterAllTitle: newtitle,
                                    })
                                }
                                __next40pxDefaultSize
                                __nextHasNoMarginBottom
                            />

                        )}

                        {enableFilter && (
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
                                    __next40pxDefaultSize
                                    __nextHasNoMarginBottom
                                />
                                <TextControl
                                    label={__(
                                        "Not Found Content",
                                        "essential-blocks"
                                    )}
                                    value={notFoundText}
                                    onChange={(notFoundText) =>
                                        setAttributes({
                                            notFoundText,
                                        })
                                    }
                                    __next40pxDefaultSize
                                    __nextHasNoMarginBottom
                                />

                                <Divider />
                                <PanelRow>
                                    {__(
                                        "Filter Items",
                                        "essential-blocks"
                                    )}
                                </PanelRow>
                                <SortControl
                                    items={attributes.filterItems}
                                    labelKey={'label'}
                                    onSortEnd={filterItems => setAttributes({ filterItems })}
                                    onDeleteItem={index => {
                                        setAttributes({ filterItems: attributes.filterItems.filter((each, i) => i !== index) })
                                    }}
                                    hasSettings={true}
                                    settingsComponents={getFilterItemsComponents()}
                                    hasAddButton={true}
                                    onAddItem={onFilterAdd}
                                    addButtonText={__("Add Filter", "essential-blocks")}
                                ></SortControl>
                            </>
                        )}
                    </InspectorPanel.PanelBody>

                    <InspectorPanel.PanelBody
                        title={__(
                            "Gallery Items",
                            "essential-blocks"
                        )}
                        initialOpen={false}
                    >
                        <SortControl
                            items={attributes.sources}
                            // labelKey={'label'}
                            onSortEnd={sources => {
                                // Create a map of id to its index in array1
                                let sourcesMap = sources.reduce((map, obj, index) => {
                                    map[obj.id] = index;
                                    return map;
                                }, {});

                                // Sort array2 based on the order in array1
                                sources.sort((a, b) => sourcesMap[a.id] - sourcesMap[b.id]);

                                setAttributes({ sources })
                            }}
                            onDeleteItem={index => {
                                setAttributes({
                                    sources: attributes.sources.filter((each, i) => i !== index),
                                })
                            }}
                            hasSettings={true}
                            settingsComponents={getGalleryItemsComponents()}
                            preserveLabels={true}
                            hasAddButton={false}
                        ></SortControl>

                    </InspectorPanel.PanelBody>

                    <InspectorPanel.PanelBody
                        title={__(
                            "Load More Button",
                            "essential-blocks"
                        )}
                        initialOpen={false}
                    >
                        <ToggleControl
                            label={__(
                                "Enable Load More Button",
                                "essential-blocks"
                            )}
                            checked={enableLoadMore}
                            onChange={(enableLoadMore) =>
                                handleLoadMore(enableLoadMore)
                            }
                            __nextHasNoMarginBottom
                        />

                        {enableLoadMore && (
                            <>
                                {/* <ToggleControl
                                    label={__(
                                        "Infinite Scroll",
                                        "essential-blocks"
                                    )}
                                    checked={enableInfiniteScroll}
                                    onChange={() =>
                                        setAttributes({
                                            enableInfiniteScroll: !enableInfiniteScroll,
                                        })
                                    }
                                    __nextHasNoMarginBottom
                                /> */}
                                {/* <DynamicInputControl
                                    label={__("Button Text", "essential-blocks")}
                                    attrName="loadmoreBtnText"
                                    inputValue={loadmoreBtnText}
                                    setAttributes={setAttributes}
                                    onChange={(text) => setAttributes({ loadmoreBtnText: text })}
                                /> */}
                                <RangeControl
                                    label={__(
                                        "Images Per Page",
                                        "essential-blocks"
                                    )}
                                    value={imagesPerPageCount}
                                    onChange={(imagesPerPageCount) =>
                                        setAttributes({
                                            imagesPerPageCount,
                                        })
                                    }
                                    min={1}
                                    max={sources?.length - 1}
                                    allowReset={true}
                                    __nextHasNoMarginBottom
                                    __next40pxDefaultSize
                                />
                                <EBButton.GeneralTab
                                    label={__("Button", "essential-blocks")}
                                    type='button'
                                    buttonAttrProps={LOADMORE_KEYS}
                                    hasIcon={false}
                                    hasAlignment={false}
                                    hasWidth={false}
                                />
                            </>
                        )}


                    </InspectorPanel.PanelBody>
                </>
            </InspectorPanel.General>
            <InspectorPanel.Style>
                <>
                    <InspectorPanel.PanelBody
                        title={__(
                            "Image Settings",
                            "essential-blocks"
                        )}
                        initialOpen={true}
                    >
                        {layouts === "grid" && (
                            <>
                                {!enableFilter && (
                                    <ToggleGroupControl
                                        label={__("Alignment", "essential-blocks")}
                                        value={imageAlignment}
                                        onChange={(value) => setAttributes({ imageAlignment: value })}
                                        isBlock
                                        __next40pxDefaultSize
                                        __nextHasNoMarginBottom
                                    >
                                        {FLEX_ALIGN.map((item, index) => (
                                            <ToggleGroupControlOption key={index} value={item.value} label={item.label} />
                                        ))}
                                    </ToggleGroupControl>
                                )}

                                <ToggleGroupControl
                                    label={__("Image Size", "essential-blocks")}
                                    value={imageSizeType}
                                    onChange={(value) => setAttributes({ imageSizeType: value })}
                                    isBlock
                                    __next40pxDefaultSize
                                    __nextHasNoMarginBottom
                                >
                                    {IMAGE_SIZE_TYPE.map((item, index) => (
                                        <ToggleGroupControlOption key={index} value={item.value} label={item.label} />
                                    ))}
                                </ToggleGroupControl>

                                {imageSizeType === "fixed" && (
                                    <>
                                        <ResponsiveRangeController
                                            baseLabel={__(
                                                "Image Height",
                                                "essential-blocks"
                                            )}
                                            controlName={
                                                IMAGE_HEIGHT
                                            }
                                            units={
                                                IMAGE_UNIT_TYPES
                                            }
                                            min={0}
                                            max={1000}
                                            step={1}
                                        />
                                        <ResponsiveRangeController
                                            baseLabel={__(
                                                "Image Width",
                                                "essential-blocks"
                                            )}
                                            controlName={
                                                IMAGE_WIDTH
                                            }
                                            units={
                                                IMAGE_UNIT_TYPES
                                            }
                                            min={0}
                                            max={500}
                                            step={1}
                                        />
                                    </>
                                )}

                                {imageSizeType ===
                                    "adaptive" && (
                                        <>
                                            <ResponsiveRangeController
                                                baseLabel={__(
                                                    "Image Max Height",
                                                    "essential-blocks"
                                                )}
                                                controlName={
                                                    IMAGE_MAX_HEIGHT
                                                }
                                                units={
                                                    IMAGE_UNIT_TYPES
                                                }
                                                min={0}
                                                max={1000}
                                                step={1}
                                            />
                                            <ResponsiveRangeController
                                                baseLabel={__(
                                                    "Image Max Width",
                                                    "essential-blocks"
                                                )}
                                                controlName={
                                                    IMAGE_MAX_WIDTH
                                                }
                                                units={
                                                    IMAGE_UNIT_TYPES
                                                }
                                                min={0}
                                                max={500}
                                                step={1}
                                            />
                                        </>
                                    )}
                            </>
                        )}

                        <InspectorPanel.PanelBody
                            title={__(
                                "Border",
                                "essential-blocks"
                            )}
                            initialOpen={true}
                        >
                            <BorderShadowControl
                                controlName={
                                    IMAGE_BORDER_SHADOW
                                }
                                noShadow
                            // noBorder
                            />
                        </InspectorPanel.PanelBody>
                    </InspectorPanel.PanelBody>

                    {presets == 'default' && styleNumber === "2" && (
                        <InspectorPanel.PanelBody
                            title={__(
                                "Overlay Styles",
                                "essential-blocks"
                            )}
                        >
                            <ColorControl
                                label={__(
                                    "Overlay Color",
                                    "essential-blocks"
                                )}
                                color={overlayColor}
                                attributeName={'overlayColor'}
                            />
                        </InspectorPanel.PanelBody>
                    )}

                    {(presets !== 'default' && presets !== 'pro-preset-5' && presets !== 'pro-preset-6') && (
                        <InspectorPanel.PanelBody
                            title={__(
                                "Action Styles",
                                "essential-blocks"
                            )}
                            initialOpen={false}
                        >
                            {presets == 'preset-3' && (
                                <ColorControl
                                    label={__(
                                        "Mask Color",
                                        "essential-blocks"
                                    )}
                                    color={maskColor}
                                    attributeName={'maskColor'}
                                />
                            )}

                            <ToggleGroupControl
                                label=""
                                hideLabelFromVision
                                value={iconType}
                                onChange={(value) => setAttributes({ iconType: value })}
                                isBlock
                                __next40pxDefaultSize
                                __nextHasNoMarginBottom
                            >
                                {NORMAL_HOVER.map((item, index) => (
                                    <ToggleGroupControlOption key={index} value={item.value} label={item.label} />
                                ))}
                            </ToggleGroupControl>

                                {iconType === "normal" && (
                                    <>
                                        <ColorControl
                                            label={__(
                                                "Color",
                                                "essential-blocks"
                                            )}
                                            color={iconColor}
                                            attributeName={'iconColor'}
                                        />

                                        <ColorControl
                                            label={__(
                                                "Background Color",
                                                "essential-blocks"
                                            )}
                                            color={
                                                iconBGColor
                                            }
                                            attributeName={'iconBGColor'}
                                        />
                                    </>
                                )}

                                {iconType === "hover" && (
                                    <>
                                        <ColorControl
                                            label={__(
                                                "Color",
                                                "essential-blocks"
                                            )}
                                            color={
                                                iconHoverColor
                                            }
                                            attributeName={'iconHoverColor'}
                                        />

                                        <ColorControl
                                            label={__(
                                                "Background Color",
                                                "essential-blocks"
                                            )}
                                            color={
                                                iconHoverBGColor
                                            }
                                            attributeName={'iconHoverBGColor'}
                                        />
                                    </>
                                )}

                            <RangeControl
                                label={__(
                                    "Icon Width",
                                    "essential-blocks"
                                )}
                                value={iconWidth}
                                onChange={(iconWidth) =>
                                    setAttributes({
                                        iconWidth,
                                    })
                                }
                                min={10}
                                max={200}
                                allowReset={true}
                                __nextHasNoMarginBottom
                                __next40pxDefaultSize
                            />
                            <RangeControl
                                label={__(
                                    "Icon Size",
                                    "essential-blocks"
                                )}
                                value={iconSize}
                                onChange={(iconSize) =>
                                    setAttributes({
                                        iconSize,
                                    })
                                }
                                min={5}
                                max={100}
                                allowReset={true}
                                __nextHasNoMarginBottom
                                __next40pxDefaultSize
                            />

                            <InspectorPanel.PanelBody
                                title={__(
                                    "Border",
                                    "essential-blocks"
                                )}
                                initialOpen={false}
                            >
                                <BorderShadowControl
                                    controlName={
                                        ICON_BORDER_SHADOW
                                    }
                                />
                            </InspectorPanel.PanelBody>
                        </InspectorPanel.PanelBody>
                    )}

                    {(displayCaption || displayDescription) && presets !== 'pro-preset-5' && (
                        <InspectorPanel.PanelBody
                            title={__(
                                "Content Styles",
                                "essential-blocks"
                            )}
                            initialOpen={false}
                        >
                            {applyFilters(
                                "eb_filterable_gallery_pro_style_tab_content",
                                "",
                                attributes,
                                setAttributes,
                            )}
                            {version !== undefined && presets !== 'pro-preset-6' && (
                                <ColorControl
                                    label={__(
                                        "Background Color",
                                        "essential-blocks"
                                    )}
                                    color={contentBGColor}
                                    attributeName={'contentBGColor'}
                                />
                            )}

                            {presets == 'default' && version !== undefined && (
                                <>
                                    <ResponsiveRangeController
                                        baseLabel={__(
                                            "Width",
                                            "essential-blocks"
                                        )}
                                        controlName={CAPTION_WIDTH}
                                        units={UNIT_TYPES}
                                        min={0}
                                        max={300}
                                        step={1}
                                    />

                                    <ToggleGroupControl
                                        label={__("Text Align", "essential-blocks")}
                                        value={textAlign}
                                        onChange={(value) => setAttributes({ textAlign: value })}
                                        isBlock
                                        __next40pxDefaultSize
                                        __nextHasNoMarginBottom
                                    >
                                        {TEXT_ALIGN.map((item, index) => (
                                            <ToggleGroupControlOption key={index} value={item.value} label={item.label} />
                                        ))}
                                    </ToggleGroupControl>

                                    <ToggleGroupControl
                                        label={__("Horizontal Align", "essential-blocks")}
                                        value={horizontalAlign}
                                        onChange={(value) => setAttributes({ horizontalAlign: value })}
                                        isBlock
                                        __next40pxDefaultSize
                                        __nextHasNoMarginBottom
                                    >
                                        {HORIZONTAL_ALIGN.map((item, index) => (
                                            <ToggleGroupControlOption key={index} value={item.value} label={item.label} />
                                        ))}
                                    </ToggleGroupControl>

                                    <ToggleGroupControl
                                        label={__("Vertical Align", "essential-blocks")}
                                        value={verticalAlign}
                                        onChange={(value) => setAttributes({ verticalAlign: value })}
                                        isBlock
                                        __next40pxDefaultSize
                                        __nextHasNoMarginBottom
                                    >
                                        {VERTICAL_ALIGN.map((item, index) => (
                                            <ToggleGroupControlOption key={index} value={item.value} label={item.label} />
                                        ))}
                                    </ToggleGroupControl>
                                </>
                            )}

                            {presets !== 'default' && presets !== 'pro-preset-6' && (
                                <>

                                    <ToggleGroupControl
                                        label={__("Alignment", "essential-blocks")}
                                        value={contentAlign}
                                        onChange={(value) => setAttributes({ contentAlign: value })}
                                        isBlock
                                        __next40pxDefaultSize
                                        __nextHasNoMarginBottom
                                    >
                                        {HORIZONTAL_ALIGN.map((item, index) => (
                                            <ToggleGroupControlOption key={index} value={item.value} label={item.label} />
                                        ))}
                                    </ToggleGroupControl>
                                    <ResponsiveDimensionsControl
                                        controlName={CONTENT_PADDING}
                                        baseLabel={__("Padding", "essential-blocks")}
                                    />
                                    <ResponsiveDimensionsControl
                                        controlName={CONTENT_MARGIN}
                                        baseLabel={__("Margin", "essential-blocks")}
                                    />

                                    <InspectorPanel.PanelBody
                                        title={__(
                                            "Border",
                                            "essential-blocks"
                                        )}
                                        initialOpen={false}
                                    >
                                        <BorderShadowControl
                                            controlName={CONTENT_BORDER_SHADOW}
                                        />
                                    </InspectorPanel.PanelBody>

                                    <InspectorPanel.PanelBody
                                        title={__(
                                            "Overalay Styles",
                                            "essential-blocks"
                                        )}
                                        initialOpen={false}
                                    >
                                        <ColorControl
                                            label={__(
                                                "Overlay Color",
                                                "essential-blocks"
                                            )}
                                            color={overlayColor}
                                            attributeName={'overlayColor'}
                                        />
                                        <ResponsiveDimensionsControl
                                            controlName={OVERLAY_PADDING}
                                            baseLabel={__("Padding", "essential-blocks")}
                                        />

                                    </InspectorPanel.PanelBody>
                                </>
                            )}

                            {displayCaption && (
                                <InspectorPanel.PanelBody
                                    title={__(
                                        "Caption Styles",
                                        "essential-blocks"
                                    )}
                                >
                                    <ColorControl
                                        label={__(
                                            "Text Color",
                                            "essential-blocks"
                                        )}
                                        color={captionColor}
                                        attributeName={'captionColor'}
                                    />

                                    <ColorControl
                                        label={__(
                                            "Background Color",
                                            "essential-blocks"
                                        )}
                                        color={captionBGColor}
                                        attributeName={'captionBGColor'}
                                    />

                                    <TypographyDropdown
                                        baseLabel={__(
                                            "Typography",
                                            "essential-blocks"
                                        )}
                                        typographyPrefixConstant={
                                            CAPTION_TYPOGRAPHY
                                        }
                                    />


                                    <ResponsiveDimensionsControl
                                        controlName={
                                            CAPTION_PADDING
                                        }
                                        baseLabel={__("Padding", "essential-blocks")}
                                    />
                                    <ResponsiveDimensionsControl
                                        controlName={
                                            CAPTION_MARGIN
                                        }
                                        baseLabel={__("Margin", "essential-blocks")}
                                    />
                                </InspectorPanel.PanelBody>
                            )}

                            {displayDescription && (
                                <InspectorPanel.PanelBody
                                    title={__(
                                        "Description Styles",
                                        "essential-blocks"
                                    )}
                                >
                                    <TypographyDropdown
                                        baseLabel={__(
                                            "Typography",
                                            "essential-blocks"
                                        )}
                                        typographyPrefixConstant={DESCRIPTION_TYPOGRAPHY}
                                    />
                                    <ColorControl
                                        label={__(
                                            "Text Color",
                                            "essential-blocks"
                                        )}
                                        color={descriptionColor}
                                        attributeName={'descriptionColor'}
                                    />
                                    <ColorControl
                                        label={__(
                                            "Background Color",
                                            "essential-blocks"
                                        )}
                                        color={descriptionBGColor}
                                        attributeName={'descriptionBGColor'}
                                    />
                                    <ResponsiveDimensionsControl
                                        controlName={DESCRIPTION_PADDING}
                                        baseLabel={__("Padding", "essential-blocks")}
                                    />
                                    <ResponsiveDimensionsControl
                                        controlName={DESCRIPTION_MARGIN}
                                        baseLabel={__("Margin", "essential-blocks")}
                                    />
                                </InspectorPanel.PanelBody>
                            )}

                        </InspectorPanel.PanelBody>
                    )}

                    {enableFilter && !enableSearch && (
                        <InspectorPanel.PanelBody
                            title={__(
                                "Filter",
                                "essential-blocks"
                            )}
                            initialOpen={false}
                        >
                            <ColorControl
                                label={__(
                                    "Background Color",
                                    "essential-blocks"
                                )}
                                color={filterWrapperBGColor}
                                attributeName={'filterWrapperBGColor'}
                            />
                            <PanelRow>
                                Border & Shadow
                            </PanelRow>
                            <BorderShadowControl
                                controlName={
                                    FILTER_WRAPPER_BORDER_SHADOW
                                }
                            // noShadow
                            // noBorder
                            />

                            <InspectorPanel.PanelBody
                                title={__(
                                    "Filter Item",
                                    "essential-blocks"
                                )}
                                initialOpen={false}
                            >
                                <TypographyDropdown
                                    baseLabel={__(
                                        "Typography",
                                        "essential-blocks"
                                    )}
                                    typographyPrefixConstant={
                                        FILTER_TYPOGRAPHY
                                    }
                                />
                                <ToggleGroupControl
                                    label=""
                                    hideLabelFromVision
                                    value={filterColorType}
                                    onChange={(value) => setAttributes({ filterColorType: value })}
                                    isBlock
                                    __next40pxDefaultSize
                                    __nextHasNoMarginBottom
                                >
                                    {NORMAL_HOVER_ACTIVE.map((item, index) => (
                                        <ToggleGroupControlOption key={index} value={item.value} label={item.label} />
                                    ))}
                                </ToggleGroupControl>

                                    {filterColorType ===
                                        "normal" && (
                                            <>
                                                <ColorControl
                                                    label={__(
                                                        "Color",
                                                        "essential-blocks"
                                                    )}
                                                    color={filterColor}
                                                    attributeName={'filterColor'}
                                                />

                                                <ColorControl
                                                    label={__(
                                                        "Background Color",
                                                        "essential-blocks"
                                                    )}
                                                    color={
                                                        filterBGColor
                                                    }
                                                    attributeName={'filterBGColor'}
                                                />
                                            </>
                                        )}

                                    {filterColorType ===
                                        "hover" && (
                                            <>
                                                <ColorControl
                                                    label={__(
                                                        "Color",
                                                        "essential-blocks"
                                                    )}
                                                    color={
                                                        filterHoverColor
                                                    }
                                                    attributeName={'filterHoverColor'}
                                                />

                                                <ColorControl
                                                    label={__(
                                                        "Background Color",
                                                        "essential-blocks"
                                                    )}
                                                    color={
                                                        filterHoverBGColor
                                                    }
                                                    attributeName={'filterHoverBGColor'}
                                                />
                                            </>
                                        )}

                                    {filterColorType ===
                                        "active" && (
                                            <>
                                                <ColorControl
                                                    label={__(
                                                        "Color",
                                                        "essential-blocks"
                                                    )}
                                                    color={
                                                        filterActColor
                                                    }
                                                    attributeName={'filterActColor'}
                                                />
                                                <ColorControl
                                                    label={__(
                                                        "Background Color",
                                                        "essential-blocks"
                                                    )}
                                                    color={
                                                        filterActBGColor
                                                    }
                                                    attributeName={'filterActBGColor'}
                                                />
                                            </>
                                        )}
                                <ResponsiveDimensionsControl
                                    controlName={FILTER_PADDING}
                                    baseLabel={__("Padding", "essential-blocks")}
                                />
                                <ResponsiveDimensionsControl
                                    controlName={FILTER_MARGIN}
                                    baseLabel={__("Margin", "essential-blocks")}
                                />

                                <PanelRow>
                                    Border & Shadow
                                </PanelRow>
                                <BorderShadowControl
                                    controlName={
                                        FILTER_BORDER_SHADOW
                                    }
                                // noShadow
                                // noBorder
                                />
                            </InspectorPanel.PanelBody>

                        </InspectorPanel.PanelBody>
                    )}

                    {applyFilters(
                        "eb_filterable_gallery_pro_style_tab",
                        "",
                        attributes,
                        setAttributes,
                    )}

                    {(enableFilter || enableIsotope) && enableLoadMore && (
                        <EBButton.StyleTab
                            label={__("Load More Button", "essential-blocks")}
                            buttonAttrProps={LOADMORE_KEYS}
                            hasTypography={true}
                            typography={LOADMORE_TYPOGRAPHY}
                            border={LOADMORE_BORDER}
                            hasPadding={true}
                            padding={LOADMORE_PADDING}
                            hasHoverEffect={false}
                        />
                    )}

                    {enableFilter && notFoundText !== '' && (
                        <InspectorPanel.PanelBody
                            title={__(
                                "Not Found Styles",
                                "essential-blocks"
                            )}
                            initialOpen={false}
                        >
                            <ColorControl
                                label={__(
                                    "Color",
                                    "essential-blocks"
                                )}
                                color={notFoundColor}
                                attributeName={'notFoundColor'}
                            />

                            <TypographyDropdown
                                baseLabel={__(
                                    "Typography",
                                    "essential-blocks"
                                )}
                                typographyPrefixConstant={
                                    NOT_FOUND_TYPOGRAPHY
                                }
                            />
                        </InspectorPanel.PanelBody>
                    )}
                </>
            </InspectorPanel.Style>
        </InspectorPanel>
    );
}

export default Inspector;
