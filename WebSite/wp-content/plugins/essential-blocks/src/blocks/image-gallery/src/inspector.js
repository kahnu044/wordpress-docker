/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
    SelectControl,
    ToggleControl,
    Button,
    ButtonGroup,
    BaseControl,
    TextControl,
    PanelRow,
    RangeControl,
    __experimentalDivider as Divider,
} from "@wordpress/components";
import { useState, useEffect } from "@wordpress/element";
import { select } from "@wordpress/data";

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
    CAPTION_TYPOGRAPHY,
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
    FILTER_BORDER_SHADOW,
    LOADMORE_PADDING,
    LOADMORE_BORDER,
} from "./constants";

import { FILTER_TYPOGRAPHY, LOADMORE_TYPOGRAPHY } from "./typoConstants";

import { handleCustomURL, handleOpenNewTab } from "./helpers";

import {
    ResponsiveDimensionsControl,
    TypographyDropdown,
    BorderShadowControl,
    ResponsiveRangeController,
    ColorControl,
    EbImageSizeSelector,
    DynamicInputControl,
    SortControl,
    InspectorPanel
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
        images,
        enableIsotope,
        enableLoadMore,
        loadmoreBtnText,
        loadmoreColor,
        loadmoreHvColor,
        loadmoreBGColor,
        loadmoreHvBGColor,
        enableInfiniteScroll,
        imagesPerPageCount
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
        let options = [{
            label: filterAllTitle,
            value: '*'
        }]

        if (filterItems.length > 0) {
            options = [
                ...options,
                ...filterItems
            ]
        }
        if (!defaultFilter) {
            setAttributes({ defaultFilter: '*' })
        }
        setDefaultFilterOptions([...options])

    }, [filterItems, enableFilterAll])

    useEffect(() => {
        { enableFilter === true ? setAttributes({ enableIsotope: false }) : null }
    }, [enableFilter])

    useEffect(() => {
        { enableIsotope === false ? setAttributes({ enableLoadMore: false }) : null }
    }, [enableIsotope])

    /**
     * Change Preset Styles
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
        images && typeof imageSize !== 'undefined' && onImageChange(images);
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
                />
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
                        <SelectControl
                            label={__(
                                "Layouts",
                                "essential-blocks"
                            )}
                            value={layouts}
                            options={LAYOUTS}
                            onChange={(layouts) =>
                                setAttributes({ layouts })
                            }
                        />

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
                            />
                        )}

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
                        />

                        <EbImageSizeSelector
                            attrName={"imageSize"}
                            label={__("Image Size", "essential-blocks")} //Optional
                        />

                        {displayCaption && styleNumber === "0" && (
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
                            />
                        )}

                        <ResponsiveRangeController
                            baseLabel={__(
                                "Columns",
                                "essential-blocks"
                            )}
                            controlName={GRID_COLUMNS}
                            units={[]}
                            min={1}
                            max={8}
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
                                "Disable Light Box",
                                "essential-blocks"
                            )}
                            checked={disableLightBox}
                            onChange={() =>
                                setAttributes({
                                    disableLightBox: !disableLightBox,
                                })
                            }
                        />
                        {disableLightBox && (
                            <ToggleControl
                                label={__(
                                    "Add custom link?",
                                    "essential-blocks"
                                )}
                                checked={addCustomLink}
                                onChange={() =>
                                    setAttributes({
                                        addCustomLink: !addCustomLink,
                                    })
                                }
                            />
                        )}

                        {!enableFilter && (
                            <>
                                <ToggleControl
                                    label={__(
                                        "Enable Isotope",
                                        "essential-blocks"
                                    )}
                                    checked={enableIsotope}
                                    onChange={() =>
                                        setAttributes({
                                            enableIsotope: !enableIsotope,
                                        })
                                    }
                                />
                            </>
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
                        />

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
                        {sources.map((item, index) => {
                            return (
                                <InspectorPanel.PanelBody
                                    title={
                                        "Image " + (index + 1)
                                    }
                                    initialOpen={false}
                                    onToggle={() =>
                                        setAttributes({
                                            initialSlide: index,
                                        })
                                    }
                                    className="eb-img-gallery-item-single-panel"
                                    key={index}
                                >
                                    {enableFilter && (
                                        <Select2
                                            name="select-gallery-item"
                                            value={item.filter
                                                ? JSON.parse(item.filter) : ""
                                            }
                                            onChange={(selected) =>
                                                handleSelect2Filter(
                                                    selected,
                                                    index
                                                )
                                            }
                                            options={
                                                filterItems
                                            }
                                            isMulti="true"
                                            Placeholder="Select Filter"
                                        />
                                    )}
                                    {disableLightBox &&
                                        addCustomLink && (
                                            <>
                                                <TextControl
                                                    label={__(
                                                        "URL",
                                                        "essential-blocks"
                                                    )}
                                                    value={
                                                        item.customLink
                                                    }
                                                    onChange={(
                                                        text
                                                    ) =>
                                                        handleCustomURL(
                                                            text,
                                                            item.id,
                                                            sources,
                                                            setAttributes
                                                        )
                                                    }
                                                />
                                                {item.url &&
                                                    item.url
                                                        .length >
                                                    0 &&
                                                    !item.isValidUrl && (
                                                        <span className="error">
                                                            URL
                                                            is
                                                            not
                                                            valid
                                                        </span>
                                                    )}
                                                <ToggleControl
                                                    label={__(
                                                        "Open in New Tab",
                                                        "essential-blocks"
                                                    )}
                                                    checked={
                                                        item.openNewTab
                                                    }
                                                    onChange={() =>
                                                        handleOpenNewTab(
                                                            !item.openNewTab,
                                                            item.id,
                                                            sources,
                                                            setAttributes
                                                        )
                                                    }
                                                />
                                            </>
                                        )}

                                    <Divider />
                                    <PanelRow>
                                        {__(
                                            "Image",
                                            "essential-blocks"
                                        )}
                                    </PanelRow>
                                    <img src={item.url} />
                                </InspectorPanel.PanelBody>
                            );
                        })}
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
                                "Enable Loadmore",
                                "essential-blocks"
                            )}
                            checked={enableLoadMore}
                            onChange={(enableLoadMore) =>
                                handleLoadMore(enableLoadMore)
                            }
                        />

                        {enableLoadMore && (
                            <>
                                <DynamicInputControl
                                    label={__("Button Text", "essential-blocks")}
                                    attrName="loadmoreBtnText"
                                    inputValue={loadmoreBtnText}
                                    setAttributes={setAttributes}
                                    onChange={(text) => setAttributes({ loadmoreBtnText: text })}
                                />
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
                                    <BaseControl
                                        label={__(
                                            "Alignment",
                                            "essential-blocks"
                                        )}
                                    >
                                        <ButtonGroup>
                                            {FLEX_ALIGN.map(
                                                (
                                                    item,
                                                    index
                                                ) => (
                                                    <Button
                                                        key={
                                                            index
                                                        }
                                                        isPrimary={
                                                            imageAlignment ===
                                                            item.value
                                                        }
                                                        isSecondary={
                                                            imageAlignment !==
                                                            item.value
                                                        }
                                                        onClick={() =>
                                                            setAttributes(
                                                                {
                                                                    imageAlignment:
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

                                <BaseControl
                                    label={__(
                                        "Image Size",
                                        "essential-blocks"
                                    )}
                                >
                                    <ButtonGroup>
                                        {IMAGE_SIZE_TYPE.map(
                                            (item, index) => (
                                                <Button
                                                    key={index}
                                                    isPrimary={
                                                        imageSizeType ===
                                                        item.value
                                                    }
                                                    isSecondary={
                                                        imageSizeType !==
                                                        item.value
                                                    }
                                                    onClick={() =>
                                                        setAttributes(
                                                            {
                                                                imageSizeType:
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
                                            max={500}
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
                                                max={500}
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

                    {styleNumber === "2" && (
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

                            {displayCaption && (
                                <>
                                    <BaseControl
                                        label={__(
                                            "Text Align",
                                            "essential-blocks"
                                        )}
                                    >
                                        <ButtonGroup>
                                            {TEXT_ALIGN.map(
                                                (
                                                    item,
                                                    index
                                                ) => (
                                                    <Button
                                                        key={
                                                            index
                                                        }
                                                        isPrimary={
                                                            textAlign ===
                                                            item.value
                                                        }
                                                        isSecondary={
                                                            textAlign !==
                                                            item.value
                                                        }
                                                        onClick={() =>
                                                            setAttributes(
                                                                {
                                                                    textAlign:
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

                                    <BaseControl
                                        label={__(
                                            "Horizontal Align",
                                            "essential-blocks"
                                        )}
                                    >
                                        <ButtonGroup>
                                            {HORIZONTAL_ALIGN.map(
                                                (
                                                    item,
                                                    index
                                                ) => (
                                                    <Button
                                                        key={
                                                            index
                                                        }
                                                        isPrimary={
                                                            horizontalAlign ===
                                                            item.value
                                                        }
                                                        isSecondary={
                                                            horizontalAlign !==
                                                            item.value
                                                        }
                                                        onClick={() =>
                                                            setAttributes(
                                                                {
                                                                    horizontalAlign:
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

                                    <BaseControl
                                        label={__(
                                            "Vertical Align",
                                            "essential-blocks"
                                        )}
                                    >
                                        <ButtonGroup>
                                            {VERTICAL_ALIGN.map(
                                                (
                                                    item,
                                                    index
                                                ) => (
                                                    <Button
                                                        key={
                                                            index
                                                        }
                                                        isPrimary={
                                                            verticalAlign ===
                                                            item.value
                                                        }
                                                        isSecondary={
                                                            verticalAlign !==
                                                            item.value
                                                        }
                                                        onClick={() =>
                                                            setAttributes(
                                                                {
                                                                    verticalAlign:
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

                                    <ResponsiveDimensionsControl
                                        controlName={
                                            CAPTION_MARGIN
                                        }
                                        baseLabel={__("Margin", "essential-blocks")}
                                    />

                                    <ResponsiveDimensionsControl
                                        controlName={
                                            CAPTION_PADDING
                                        }
                                        baseLabel={__("Padding", "essential-blocks")}
                                    />
                                </>
                            )}
                        </InspectorPanel.PanelBody>
                    )}

                    {enableFilter && (
                        <InspectorPanel.PanelBody
                            title={__(
                                "Filter",
                                "essential-blocks"
                            )}
                            initialOpen={false}
                        >
                            <ResponsiveDimensionsControl
                                controlName={FILTER_MARGIN}
                                baseLabel={__("Margin", "essential-blocks")}
                            />
                            <ResponsiveDimensionsControl
                                controlName={FILTER_PADDING}
                                baseLabel={__("Padding", "essential-blocks")}
                            />
                            <TypographyDropdown
                                baseLabel={__(
                                    "Typography",
                                    "essential-blocks"
                                )}
                                typographyPrefixConstant={
                                    FILTER_TYPOGRAPHY
                                }
                            />
                            <BaseControl>
                                <ButtonGroup>
                                    {NORMAL_HOVER.map(
                                        (item, index) => (
                                            <Button
                                                key={index}
                                                isPrimary={
                                                    filterColorType ===
                                                    item.value
                                                }
                                                isSecondary={
                                                    filterColorType !==
                                                    item.value
                                                }
                                                onClick={() =>
                                                    setAttributes(
                                                        {
                                                            filterColorType:
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
                            </BaseControl>

                            <PanelRow>
                                Button Border & Shadow
                            </PanelRow>
                            <BorderShadowControl
                                controlName={
                                    FILTER_BORDER_SHADOW
                                }
                            // noShadow
                            // noBorder
                            />
                        </InspectorPanel.PanelBody>
                    )}

                    {(enableFilter || enableIsotope) && enableLoadMore && (
                        <InspectorPanel.PanelBody
                            title={__("Load More Button", "essential-blocks")}
                            initialOpen={false}
                        >
                            <>
                                <TypographyDropdown
                                    baseLabel={__(
                                        "Typography",
                                        "essential-blocks"
                                    )}
                                    typographyPrefixConstant={
                                        LOADMORE_TYPOGRAPHY
                                    }
                                />
                                <ColorControl
                                    label={__(
                                        "Text Color",
                                        "essential-blocks"
                                    )}
                                    color={loadmoreColor}
                                    attributeName={'loadmoreColor'}
                                />
                                <ColorControl
                                    label={__(
                                        "Text Hover Color",
                                        "essential-blocks"
                                    )}
                                    color={loadmoreHvColor}
                                    attributeName={'loadmoreHvColor'}
                                />
                                <ColorControl
                                    label={__(
                                        "Background Color",
                                        "essential-blocks"
                                    )}
                                    color={loadmoreBGColor}
                                    attributeName={'loadmoreBGColor'}
                                />
                                <ColorControl
                                    label={__(
                                        "Background Hover Color",
                                        "essential-blocks"
                                    )}
                                    color={loadmoreHvBGColor}
                                    attributeName={'loadmoreHvBGColor'}
                                />
                                <ResponsiveDimensionsControl
                                    controlName={LOADMORE_PADDING}
                                    baseLabel={__(
                                        "Padding",
                                        "essential-blocks"
                                    )}
                                />
                                <InspectorPanel.PanelBody
                                    title={__("Border", "essential-blocks")}
                                    initialOpen={false}
                                >
                                    <BorderShadowControl
                                        controlName={LOADMORE_BORDER}
                                    />
                                </InspectorPanel.PanelBody>
                            </>
                        </InspectorPanel.PanelBody>
                    )}
                </>
            </InspectorPanel.Style>
        </InspectorPanel>
    );
}

export default Inspector;
