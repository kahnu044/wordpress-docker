/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { InspectorControls, PanelColorSettings } from "@wordpress/block-editor";
import {
    PanelBody,
    SelectControl,
    ToggleControl,
    Button,
    ButtonGroup,
    BaseControl,
    TabPanel,
    TextControl,
    PanelRow,
    __experimentalDivider as Divider,
} from "@wordpress/components";
import { useState, useEffect } from "@wordpress/element";
import { select } from "@wordpress/data";

/**
 * Internal depencencies
 */

import objAttributes from "./attributes";

import SortableFilterItems from "./sortable-filteritems";

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
} from "./constants";

import { FILTER_TYPOGRAPHY } from "./typoConstants";

const {
    ResponsiveDimensionsControl,
    TypographyDropdown,
    BorderShadowControl,
    ResponsiveRangeController,
    BackgroundControl,
    ColorControl,
    AdvancedControls,
    EbImageSizeSelector,
} = window.EBControls;

function Inspector(props) {
    const { attributes, setAttributes } = props;
    const {
        resOption,
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
        filterColorType,
        filterColor,
        filterHoverColor,
        filterBGColor,
        filterHoverBGColor,
        filterActColor,
        filterActBGColor,
    } = attributes;

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

    const resRequiredProps = {
        setAttributes,
        resOption,
        attributes,
        objAttributes,
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

    const handleFilter = (text, id) => {
        let updatedSources = sources.map((item, index) => {
            if (id === index) {
                const newTime = { ...item };
                newTime.filter = text;
                return newTime;
            }
            return item;
        });

        setAttributes({ sources: updatedSources });
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
                            title: "Style",
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
                                    <PanelBody
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
                                            resRequiredProps={resRequiredProps}
                                            label={"Image Size"} //Optional
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
                                            resRequiredProps={resRequiredProps}
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
                                            resRequiredProps={resRequiredProps}
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
                                    </PanelBody>

                                    <PanelBody
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
                                                <Divider />
                                                <PanelRow>
                                                    {__(
                                                        "Filter Items",
                                                        "essential-blocks"
                                                    )}
                                                </PanelRow>
                                                <SortableFilterItems
                                                    filterItems={
                                                        attributes.filterItems
                                                    }
                                                    setAttributes={
                                                        setAttributes
                                                    }
                                                />
                                                <Button
                                                    className="eb-pricebox-feature-button"
                                                    label={__(
                                                        "Add Filter",
                                                        "essential-blocks"
                                                    )}
                                                    icon="plus-alt"
                                                    onClick={onFilterAdd}
                                                >
                                                    <span className="eb-pricebox-add-button-label">
                                                        {__(
                                                            "Add Filter",
                                                            "essential-blocks"
                                                        )}
                                                    </span>
                                                </Button>
                                            </>
                                        )}
                                    </PanelBody>

                                    {enableFilter && (
                                        <PanelBody
                                            title={__(
                                                "Gallery Items",
                                                "essential-blocks"
                                            )}
                                            initialOpen={false}
                                        >
                                            {sources.map((item, index) => {
                                                return (
                                                    <PanelBody
                                                        title={
                                                            "Image " +
                                                            (index + 1)
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
                                                        <Select2
                                                            name="select-gallery-item"
                                                            value={
                                                                item.hasOwnProperty(
                                                                    "filter"
                                                                ) &&
                                                                item.filter
                                                                    .length > 0
                                                                    ? JSON.parse(
                                                                          item.filter
                                                                      )
                                                                    : ""
                                                            }
                                                            onChange={(
                                                                selected
                                                            ) =>
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

                                                        <Divider />
                                                        <PanelRow>
                                                            {__(
                                                                "Image",
                                                                "essential-blocks"
                                                            )}
                                                        </PanelRow>
                                                        <img src={item.url} />
                                                    </PanelBody>
                                                );
                                            })}
                                        </PanelBody>
                                    )}
                                </>
                            )}

                            {tab.name === "styles" && (
                                <>
                                    <PanelBody
                                        title={__(
                                            "Image Settings",
                                            "essential-blocks"
                                        )}
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
                                                            resRequiredProps={
                                                                resRequiredProps
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
                                                            resRequiredProps={
                                                                resRequiredProps
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
                                                            resRequiredProps={
                                                                resRequiredProps
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
                                                            resRequiredProps={
                                                                resRequiredProps
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

                                        <PanelBody
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
                                                resRequiredProps={
                                                    resRequiredProps
                                                }
                                                noShadow
                                                // noBorder
                                            />
                                        </PanelBody>
                                    </PanelBody>

                                    {styleNumber === "2" && (
                                        <PanelBody
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
                                                onChange={(color) =>
                                                    setAttributes({
                                                        overlayColor: color,
                                                    })
                                                }
                                            />
                                        </PanelBody>
                                    )}
                                    {displayCaption && (
                                        <PanelBody
                                            title={__(
                                                "Caption Styles",
                                                "essential-blocks"
                                            )}
                                        >
                                            <PanelColorSettings
                                                title={__(
                                                    "Color Controls",
                                                    "essential-blocks"
                                                )}
                                                className={"eb-subpanel"}
                                                initialOpen={true}
                                                disableAlpha={false}
                                                colorSettings={[
                                                    {
                                                        value: captionColor,
                                                        onChange: (newColor) =>
                                                            setAttributes({
                                                                captionColor: newColor,
                                                            }),
                                                        label: __(
                                                            "Text Color",
                                                            "essential-blocks"
                                                        ),
                                                    },
                                                ]}
                                            />

                                            <ColorControl
                                                label={__(
                                                    "Background Color",
                                                    "essential-blocks"
                                                )}
                                                color={captionBGColor}
                                                onChange={(backgroundColor) =>
                                                    setAttributes({
                                                        captionBGColor: backgroundColor,
                                                    })
                                                }
                                            />

                                            <TypographyDropdown
                                                baseLabel={__(
                                                    "Typography",
                                                    "essential-blocks"
                                                )}
                                                typographyPrefixConstant={
                                                    CAPTION_TYPOGRAPHY
                                                }
                                                resRequiredProps={
                                                    resRequiredProps
                                                }
                                            />

                                            <ResponsiveRangeController
                                                baseLabel={__(
                                                    "Width",
                                                    "essential-blocks"
                                                )}
                                                controlName={CAPTION_WIDTH}
                                                resRequiredProps={
                                                    resRequiredProps
                                                }
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
                                                        resRequiredProps={
                                                            resRequiredProps
                                                        }
                                                        controlName={
                                                            CAPTION_MARGIN
                                                        }
                                                        baseLabel="Margin"
                                                    />

                                                    <ResponsiveDimensionsControl
                                                        resRequiredProps={
                                                            resRequiredProps
                                                        }
                                                        controlName={
                                                            CAPTION_PADDING
                                                        }
                                                        baseLabel="Padding"
                                                    />
                                                </>
                                            )}
                                        </PanelBody>
                                    )}

                                    {enableFilter && (
                                        <PanelBody
                                            title={__(
                                                "Filter",
                                                "essential-blocks"
                                            )}
                                            initialOpen={false}
                                        >
                                            <ResponsiveDimensionsControl
                                                resRequiredProps={
                                                    resRequiredProps
                                                }
                                                controlName={FILTER_MARGIN}
                                                baseLabel="Margin"
                                            />
                                            <ResponsiveDimensionsControl
                                                resRequiredProps={
                                                    resRequiredProps
                                                }
                                                controlName={FILTER_PADDING}
                                                baseLabel="Padding"
                                            />
                                            <TypographyDropdown
                                                baseLabel={__(
                                                    "Typography",
                                                    "essential-blocks"
                                                )}
                                                typographyPrefixConstant={
                                                    FILTER_TYPOGRAPHY
                                                }
                                                resRequiredProps={
                                                    resRequiredProps
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
                                                                value: filterColor,
                                                                onChange: (
                                                                    newColor
                                                                ) =>
                                                                    setAttributes(
                                                                        {
                                                                            filterColor: newColor,
                                                                        }
                                                                    ),
                                                                label: __(
                                                                    "Color",
                                                                    "essential-blocks"
                                                                ),
                                                            },
                                                            {
                                                                value: filterBGColor,
                                                                onChange: (
                                                                    newColor
                                                                ) =>
                                                                    setAttributes(
                                                                        {
                                                                            filterBGColor: newColor,
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

                                                {filterColorType ===
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
                                                                value: filterHoverColor,
                                                                onChange: (
                                                                    newColor
                                                                ) =>
                                                                    setAttributes(
                                                                        {
                                                                            filterHoverColor: newColor,
                                                                        }
                                                                    ),
                                                                label: __(
                                                                    "Color",
                                                                    "essential-blocks"
                                                                ),
                                                            },
                                                            {
                                                                value: filterHoverBGColor,
                                                                onChange: (
                                                                    newColor
                                                                ) =>
                                                                    setAttributes(
                                                                        {
                                                                            filterHoverBGColor: newColor,
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

                                                {filterColorType ===
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
                                                                value: filterActColor,
                                                                onChange: (
                                                                    newColor
                                                                ) =>
                                                                    setAttributes(
                                                                        {
                                                                            filterActColor: newColor,
                                                                        }
                                                                    ),
                                                                label: __(
                                                                    "Color",
                                                                    "essential-blocks"
                                                                ),
                                                            },
                                                            {
                                                                value: filterActBGColor,
                                                                onChange: (
                                                                    newColor
                                                                ) =>
                                                                    setAttributes(
                                                                        {
                                                                            filterActBGColor: newColor,
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
                                            </BaseControl>

                                            <PanelRow>
                                                Button Border & Shadow
                                            </PanelRow>
                                            <BorderShadowControl
                                                controlName={
                                                    FILTER_BORDER_SHADOW
                                                }
                                                resRequiredProps={
                                                    resRequiredProps
                                                }
                                                // noShadow
                                                // noBorder
                                            />
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

export default Inspector;
