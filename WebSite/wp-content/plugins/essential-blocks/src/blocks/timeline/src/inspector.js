/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useEffect, useRef } from "@wordpress/element";
import TinyMCEEditor from "./components/TinyMCEEditor";
import {
    PanelRow,
    SelectControl,
    ToggleControl,
    BaseControl,
    RangeControl,
    __experimentalDivider as Divider,
    __experimentalToggleGroupControl as ToggleGroupControl,
    __experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from "@wordpress/components";

/**
 * Internal depencencies
 */
import {
    WRAPPER_MARGIN,
    WRAPPER_PADDING,
    WRAPPER_BORDER_SHADOW,
    WRAPPER_BG,
    COLUMN_PADDING,
    COLUMN_BORDER_SHADOW,
    THUMBNAIL_IMAGE_SIZE,
    THUMBNAIL_MARGIN,
    TITLE_MARGIN,
    CONTENT_MARGIN,
    READMORE_MARGIN,
    READMORE_PADDING,
    ICON_META_SPACE,
    META_GAP,
    UNIT_TYPES,
    TIMELINE_LAYOUT_POSITIONS,
    TIMELINE_LINE_STYLES,
    TEXT_ALIGN,
    TITLE_TAGS,
    MEDIA_TYPES,
    TIMELINE_ICON_SIZE,
    BTN_BORDER_RADIUS,
    ITEM_ICON_IMAGE_SIZE,
    BTN_BORDER_SHADOW,
    TIMELINE_LAYOUTS,
    CONTENT_SOURCE,
    DEFAULT_TIMELINE_DATA,
    ITEM_ICON_SIZE,
    BULLET_SIZE,
    BULLET_BORDER_SHADOW,
    CARD_GAP,
    TIMELINE_VERTICAL_PRESETS,
    LINE_CARD_GAP,
    SUBHEADING_BORDER_SHADOW,
    DEFAULT_TIMELINE_LABELS,
    LABEL_GAP,
    LABEL_BORDER_SHADOW,
    LABEL_BOTTOM_SPACE,
    ITEM_ICON_PADDING,
    MEDIA_BORDER_SHADOW,
    TIMELINE_ICON_WIDTH
} from "./constants/constants";
import {
    EBCT_TITLE_TYPOGRAPHY,
    EBCT_CONTENT_TYPOGRAPHY,
    EBCT_READMORE_TYPOGRAPHY,
    EBCT_META_TYPOGRAPHY,
    EBCT_SUBHEADING_TYPOGRAPHY,
    LABEL_TYPOGRAPHY,
    ITEM_ICON_TYPOGRAPHY
} from "./constants/typographyPrefixConstants";

import {
    ColorControl,
    ResponsiveDimensionsControl,
    TypographyDropdown,
    BorderShadowControl,
    ResponsiveRangeController,
    EBIconPicker,
    SortControl,
    InspectorPanel,
    EBTextControl,
    ButtonGroupControl,
    ImageComponent
} from "@essential-blocks/controls";

import Select2 from "react-select";

function Inspector(props) {
    const { attributes, setAttributes } = props;
    const {
        blockId,
        resOption,
        timelineLineStyle,
        layout,
        layoutPosition,
        contentSource,
        timelineLayout,
        columnTextAlign,
        showTitle,
        titleColor,
        titleTag,
        showContent,
        contentColor,
        readmoreColor,
        readmoreBGColor,
        readmoreHoverColor,
        readmoreBGHoverColor,
        timelines,
        enableMeta,
        showDate,
        showSubheading,
        timelineIcon,
        connectorColor,
        timelineIconColor,
        timelineIconBgColor,
        timelineIconBorderColor,
        timelineIconBorderHvColor,
        dateColor,
        SubheadingColor,
        progressLineColor,
        enableLabels,
        timelineLabels,
        columnBackgroundColor,
        connectorWidth,
        timelineIconCompleteColor,
        timelineIconBGCompleteColor,
        itemIconColor,
        timelineCompleteIcon,
        bulletColor,
        bulletCompleteColor,
        bulletCompleteBorderColor,
        timelineVerticalPreset,
        SubheadingBGColor,
        itemIconBgColor,
    } = attributes;

    // Label management functions
    const onLabelAdd = () => {
        const newLabel = {
            value: timelineLabels.length + 1,
            label: `Label ${timelineLabels.length + 1}`,
            textColor: "#000",
            backgroundColor: "#F9F9F9",
            borderColor: "#D7D7D7",
        };
        setAttributes({
            timelineLabels: [...timelineLabels, newLabel],
        });
    };

    const onLabelChange = (key, value, index) => {
        const newLabels = [...timelineLabels];
        newLabels[index][key] = value;
        setAttributes({ timelineLabels: newLabels });
    };

    const onLabelDelete = (index) => {
        const newLabels = timelineLabels.filter((_, i) => i !== index);
        setAttributes({ timelineLabels: newLabels });
    };

    const onLabelSort = (newLabels) => {
        setAttributes({
            timelineLabels: newLabels,
        });
    };

    // Track previous enableLabels state
    const prevEnableLabelsRef = useRef(enableLabels);

    // timelines
    useEffect(() => {
        if (timelines.length > 0) return;

        const defaultTimelines = DEFAULT_TIMELINE_DATA;

        setAttributes({ timelines: defaultTimelines });
    }, []);

    // Initialize labels only when enableLabels is first turned on AND labels array is empty
    useEffect(() => {
        const prevEnableLabels = prevEnableLabelsRef.current;

        // Only initialize defaults when:
        // 1. Labels are being enabled (false -> true)
        // 2. AND the labels array is empty (meaning it's the first time, not a re-enable)
        // This ensures each new block gets fresh default labels when labels are first enabled,
        // but preserves customized labels when toggling labels off and on again
        if (enableLabels && !prevEnableLabels && timelineLabels.length === 0) {
            // Create a deep copy to avoid reference sharing between blocks
            const defaultTimelineLabels = DEFAULT_TIMELINE_LABELS.map(label => ({ ...label }));
            setAttributes({ timelineLabels: defaultTimelineLabels });
        }

        // Update the ref for next render
        prevEnableLabelsRef.current = enableLabels;
    }, [enableLabels]);

    const onTimelineAdd = () => {
        const timelines = [
            ...attributes.timelines,
            {
                itemMediaType: "none",
                TimelineImage: "",
                TimelineImageId: "",
                icon: "fas fa-check",
                title: "New Timeline Item",
                content: "Add your timeline content here",
                richContent: "<p>Add your timeline content here</p>",
                iconColor: "",
                iconBackgroundColor: "",
                showReadMore: false,
                readmoreText: "Read More",
                link: "",
                linkOpenNewTab: "false",
                date: "Date",
                subheading: "Subheading",
                timelineImage: "",
                timelineImageId: "",
                timelineImageAlt: "",
                timelineImageTitle: "",
            },
        ];

        setAttributes({ timelines });
    };

    const getTimelinesComponents = () => {
        const onTimelineChange = (key, value, position) => {
            setAttributes((prevAttributes) => {
                const newTimelines = { ...prevAttributes.timelines[position] };
                const newTimelinesList = [...prevAttributes.timelines];
                newTimelinesList[position] = newTimelines;

                if (Array.isArray(key)) {
                    key.map((item, index) => {
                        newTimelinesList[position][item] = value[index];
                    });
                } else {
                    newTimelinesList[position][key] = value;
                }

                return { timelines: newTimelinesList };
            });
        };

        return attributes.timelines.map((each, i) => (
            <div key={i}>
                {enableMeta && (
                    <>
                        {showDate && (
                            <EBTextControl
                                label={__("Meta Date", "essential-blocks")}
                                value={each.date}
                                onChange={(value) =>
                                    onTimelineChange("date", value, i)
                                }
                            />
                        )}

                        {showSubheading && (
                            <EBTextControl
                                label={__(
                                    "Meta Subheading",
                                    "essential-blocks",
                                )}
                                value={each.subheading}
                                onChange={(value) =>
                                    onTimelineChange("subheading", value, i)
                                }
                            />
                        )}

                        <Divider />
                    </>
                )}

                {/* Individual Media Type Selection */}
                <ToggleGroupControl
                    label={__("Media Type", "essential-blocks")}

                    value={each.itemMediaType || "none"}
                    onChange={(value) =>
                        onTimelineChange("itemMediaType", value, i)
                    }
                    isBlock
                    __next40pxDefaultSize
                    __nextHasNoMarginBottom
                >
                    {MEDIA_TYPES.map(({ label, value }) => (
                        <ToggleGroupControlOption
                            key={value}
                            value={value}
                            label={label}
                        />
                    ))}
                </ToggleGroupControl>

                {each.itemMediaType !== "none" && (
                    <>
                        {each.itemMediaType === "icon" && (
                            <EBIconPicker
                                value={each.icon}
                                onChange={(value) =>
                                    onTimelineChange("icon", value, i)
                                }
                                title={__("Select Icon", "essential-blocks")}
                            />
                        )}

                        {each.itemMediaType === "image" && (
                            <ImageComponent.GeneralTab
                                onSelect={({ id, url, alt, title }) => {
                                    onTimelineChange(
                                        [
                                            "timelineImageId",
                                            "timelineImage",
                                            "timelineImageAlt",
                                            "timelineImageTitle",
                                        ],
                                        [id, url, alt, title],
                                        i,
                                    );
                                }}
                                value={each.timelineImage}
                                hasTag={false}
                                hasCaption={false}
                                hasStyle={false}
                                hasLink={false}
                                showInPanel={false}
                            />
                        )}
                    </>
                )}

                {showTitle && (
                    <EBTextControl
                        label={__("Title", "essential-blocks")}
                        value={each.title}
                        onChange={(value) =>
                            onTimelineChange("title", value, i)
                        }
                    />
                )}

                {showContent && (
                    <>
                        <BaseControl
                            label={__(
                                "Rich Content Editor",
                                "essential-blocks",
                            )}
                            className="eb-timeline-tinymce-editor"
                            __nextHasNoMarginBottom
                        >
                            <TinyMCEEditor
                                clientId={`timeline-tinymce-${blockId}-${i}`}
                                value={each.richContent}
                                onChange={(value) =>
                                    onTimelineChange("richContent", value, i)
                                }
                                placeholder={__(
                                    "Enter rich content here...",
                                    "essential-blocks",
                                )}
                            />
                        </BaseControl>
                    </>
                )}

                <ToggleControl
                    label={__("Show Read More", "essential-blocks")}
                    checked={each.showReadMore}
                    onChange={() => {
                        onTimelineChange("showReadMore", !each.showReadMore, i);
                    }}
                    __nextHasNoMarginBottom
                />

                {each.showReadMore && (
                    <>
                        <EBTextControl
                            label={__("Button Text", "essential-blocks")}
                            value={each.readmoreText}
                            onChange={(value) =>
                                onTimelineChange("readmoreText", value, i)
                            }
                        />
                        <EBTextControl
                            label={__("Link", "essential-blocks")}
                            fieldType="url"
                            value={each.link}
                            onChange={(value) =>
                                onTimelineChange("link", value, i)
                            }
                            placeholder="https://example.com"
                            help={__("Enter a valid URL.", "essential-blocks")}
                            showValidation={true}
                            enableSecurity={true}
                        />
                        <ToggleControl
                            label={__("Open in New Tab", "essential-blocks")}
                            checked={
                                each.linkOpenNewTab == "false" ? false : true
                            }
                            onChange={(value) =>
                                onTimelineChange(
                                    "linkOpenNewTab",
                                    value.toString(),
                                    i,
                                )
                            }
                            __nextHasNoMarginBottom
                        />
                    </>
                )}

                {enableLabels && timelineLabels.length > 0 && (
                    <>
                        <Divider />
                        <div className="eb-control-item-wrapper">
                            <PanelRow>
                                {__("Select Labels", "essential-blocks")}
                            </PanelRow>
                            <Select2
                                name="select-timeline-labels"
                                value={
                                    each.selectedLabels &&
                                        each.selectedLabels.length > 0
                                        ? timelineLabels.filter((label) =>
                                            each.selectedLabels.includes(
                                                label.value,
                                            ),
                                        )
                                        : ""
                                }
                                onChange={(selected) => {
                                    const newLabels = selected.map(
                                        (option) => option.value,
                                    );
                                    onTimelineChange(
                                        "selectedLabels",
                                        newLabels,
                                        i,
                                    );
                                }}
                                options={timelineLabels}
                                isMulti="true"
                            />
                        </div>
                    </>
                )}
            </div>
        ));
    };

    const changeTimelineLineStyle = (selected) => {
        setAttributes({ timelineLineStyle: selected });

        switch (selected) {
            case "one":
                setAttributes({
                    connectorWidth: 1,
                    connectorColor: "#DCDCDC",
                    progressLineColor: "#323232",
                    timelineIconBgColor: "#fff",
                    timelineIconColor: "#DCDCDC",
                    timelineIconCompleteColor: "#323232",
                });
                break;
            case "two":
                setAttributes({
                    connectorWidth: 1,
                    connectorColor: "#E6E6E6",
                    progressLineColor: "linear-gradient(180deg, rgba(241, 241, 241, 0.073) 0%, rgb(4, 3, 3) 100%)",

                    bulletColor: "#fff",
                    bulletCompleteBorderColor: '',
                    bulletCompleteColor: "#fff",
                    timelineIconBgColor: "",
                    timelineIconColor: "#D7D7D7",
                    timelineIconCompleteColor: "#000000",

                    // icon size
                    bulletSizeRange: 20,
                    iconSizeRange: 20,
                    bulletBorderShadowBdr_Bottom: "0",
                    bulletBorderShadowBdr_Left: "0",
                    bulletBorderShadowBdr_Right: "0",
                    bulletBorderShadowBdr_Top: "0",
                    bulletBorderShadowBdr_Unit: "px",
                    bulletBorderShadowBdr_isLinked: true,
                    bulletBorderShadowborderColor: "",
                    bulletBorderShadowborderStyle: "none",

                });
                break;
            case "three":
                setAttributes({
                    timelineCompleteIcon: "fas fa-check",
                    connectorWidth: 1,
                    connectorColor: "#000000",
                    progressLineColor: "#000000",
                    bulletColor: "#fff",
                    bulletCompleteBorderColor: '',
                    bulletCompleteColor: "#fff",
                    timelineIconBgColor: "",
                    timelineIconColor: "#000000",
                    timelineIconCompleteColor: "#000000",

                    // icon size
                    bulletSizeRange: 20,
                    iconSizeRange: 14,
                    bulletBorderShadowBdr_Bottom: "1",
                    bulletBorderShadowBdr_Left: "1",
                    bulletBorderShadowBdr_Right: "1",
                    bulletBorderShadowBdr_Top: "1",
                    bulletBorderShadowBdr_Unit: "px",
                    bulletBorderShadowBdr_isLinked: true,
                    bulletBorderShadowborderColor: "#000000",
                    bulletBorderShadowborderStyle: "solid",

                });
                break;
            case "four":
                setAttributes({
                    connectorWidth: 1,
                    connectorColor: "#DCDCDC",
                    progressLineColor: "#323232",

                    bulletColor: "#fff",
                    bulletCompleteBorderColor: "#000",
                    bulletCompleteColor: "#fff",
                    timelineIconBgColor: "#E5E5E5",
                    timelineIconColor: "#000000",
                    timelineIconCompleteColor: "#000000",

                    // icon size
                    bulletSizeRange: 40,
                    timelineIconWidthRange: 30,
                    iconSizeRange: 16,
                    itemIconTypoFontSize: 16,
                    bulletBorderShadowBdr_Bottom: "1",
                    bulletBorderShadowBdr_Left: "1",
                    bulletBorderShadowBdr_Right: "1",
                    bulletBorderShadowBdr_Top: "1",
                    bulletBorderShadowBdr_Unit: "px",
                    bulletBorderShadowBdr_isLinked: true,
                    bulletBorderShadowborderColor: "#DCDCDC",
                    bulletBorderShadowborderStyle: "dashed",

                    bulletBorderShadowHRds_Top: "50",
                    bulletBorderShadowHRds_Bottom: "50",
                    bulletBorderShadowBdr_Left: "50",
                    bulletBorderShadowBdr_Right: "50",
                    bulletBorderShadowHRds_Unit: "%",
                    bulletBorderShadowHRds_isLinked: true,
                });
                break;
            case "five":
                setAttributes({
                    // connectorWidth: 1,
                    // connectorColor: "#DCDCDC",
                    // progressLineColor: "#323232",

                    // bulletColor: "#fff",
                    // bulletCompleteBorderColor: "#000",
                    // bulletCompleteColor: "#fff",
                    // timelineIconBgColor: "#E5E5E5",
                    // timelineIconColor: "#000000",
                    // timelineIconCompleteColor: "#000000",

                    // // icon size
                    // bulletSizeRange: 40,
                    // iconSizeRange: 30,
                    // itemIconTypoFontSize: 16,
                    // bulletBorderShadowBdr_Bottom: "1",
                    // bulletBorderShadowBdr_Left: "1",
                    // bulletBorderShadowBdr_Right: "1",
                    // bulletBorderShadowBdr_Top: "1",
                    // bulletBorderShadowBdr_Unit: "px",
                    // bulletBorderShadowBdr_isLinked: true,
                    // bulletBorderShadowborderColor: "#DCDCDC",
                    // bulletBorderShadowborderStyle: "dashed",

                    // bulletBorderShadowHRds_Top: "50",
                    // bulletBorderShadowHRds_Bottom: "50",
                    // bulletBorderShadowBdr_Left: "50",
                    // bulletBorderShadowBdr_Right: "50",
                    // bulletBorderShadowHRds_Unit: "%",
                    // bulletBorderShadowHRds_isLinked: true,
                });
                break;
            default:
                break;
        }
    };

    const changeVerticalPreset = (selected) => {
        setAttributes({ timelineVerticalPreset: selected });
        switch (selected) {
            case "preset-1":
                setAttributes({
                    timelineLayout: "left-layout",
                    timelineLineStyle: "one",
                });
                break;
            case "preset-2":
                setAttributes({
                    timelineLayout: "left-layout",
                    timelineLineStyle: "five",

                    columnBackgroundColor: '#F8F8F8',
                    columnBorderShadowborderColor: "#E8E8E8",
                    columnBorderShadowborderStyle: "solid",
                    columnBorderShadowBdr_Bottom: "1",
                    columnBorderShadowBdr_Left: "1",
                    columnBorderShadowBdr_Right: "1",
                    columnBorderShadowBdr_Top: "1",
                    columnBorderShadowBdr_Unit: "px",
                    columnBorderShadowBdr_isLinked: true,

                    columnBorderShadowHRds_Top: "8",
                    columnBorderShadowHRds_Bottom: "8",
                    columnBorderShadowHRds_Left: "8",
                    columnBorderShadowHRds_Right: "8",
                    columnBorderShadowHRds_Unit: "px",
                    columnBorderShadowHRds_isLinked: true,

                    columnPaddingBottom: "30",
                    columnPaddingLeft: "30",
                    columnPaddingRight: "30",
                    columnPaddingTop: "30",
                    columnPaddingUnit: "px",
                    columnPaddingisLinked: false,

                });
                break;
            default:
                break;
        }
    };

    return (
        <InspectorPanel
            advancedControlProps={{
                marginPrefix: WRAPPER_MARGIN,
                paddingPrefix: WRAPPER_PADDING,
                backgroundPrefix: WRAPPER_BG,
                borderPrefix: WRAPPER_BORDER_SHADOW,
                hasMargin: true,
            }}
        >
            <InspectorPanel.General>
                <>
                    <InspectorPanel.PanelBody
                        title={__("Timeline Settings", "essential-blocks")}
                        initialOpen={true}
                    >
                        {/* <SelectControl
                            label={__("Content Source", "essential-blocks-pro")}
                            value={contentSource}
                            options={CONTENT_SOURCE}
                            onChange={(contentSource) =>
                                setAttributes({ contentSource })
                            }
                            __next40pxDefaultSize
                            __nextHasNoMarginBottom
                        /> */}
                        {/* <SelectControl
                            label={__("Layout", "essential-blocks")}
                            value={layout}
                            options={TIMELINE_LAYOUTS}
                            onChange={(layout) => setAttributes({ layout })}
                            __next40pxDefaultSize
                            __nextHasNoMarginBottom
                        /> */}

                        {/* {layout === "vertical" && (
                            <SelectControl
                                label={__("Preset", "essential-blocks")}
                                value={timelineVerticalPreset}
                                options={TIMELINE_VERTICAL_PRESETS}
                                onChange={(timelineVerticalPreset) =>
                                    changeVerticalPreset(timelineVerticalPreset)
                                }
                                __next40pxDefaultSize
                                __nextHasNoMarginBottom
                            />

                        )} */}

                        <ButtonGroupControl
                            label={__("Position", "essential-blocks")}
                            options={TIMELINE_LAYOUT_POSITIONS}
                            attrName={'timelineLayout'}
                            currentValue={timelineLayout}
                        />

                        <SelectControl
                            label={__(
                                "Timeline Line Style",
                                "essential-blocks",
                            )}
                            value={timelineLineStyle}
                            options={TIMELINE_LINE_STYLES}
                            onChange={(selected) => changeTimelineLineStyle(selected)}
                            __next40pxDefaultSize
                            __nextHasNoMarginBottom
                        />

                        <Divider />

                        <ToggleControl
                            label={__("Show Title", "essential-blocks")}
                            checked={showTitle}
                            onChange={() => {
                                setAttributes({
                                    showTitle: !showTitle,
                                });
                            }}
                            __nextHasNoMarginBottom
                        />

                        {showTitle && (
                            <>
                                <BaseControl label={__("Title Tag", "essential-blocks")}
                                    className="eb-advance-heading-alignment eb-html-tag-buttongroup"
                                    __nextHasNoMarginBottom
                                >
                                    <ButtonGroupControl
                                        options={TITLE_TAGS}
                                        attrName={'titleTag'}
                                        currentValue={titleTag}
                                    />
                                </BaseControl>
                            </>
                        )}
                        <ToggleControl
                            label={__("Show Excerpt", "essential-blocks")}
                            checked={showContent}
                            onChange={() => {
                                setAttributes({
                                    showContent: !showContent,
                                });
                            }}
                            __nextHasNoMarginBottom
                        />
                        <PanelRow>{__("Meta", "essential-blocks")}</PanelRow>
                        <ToggleControl
                            label={__("Enable Meta", "essential-blocks")}
                            checked={enableMeta}
                            onChange={() => {
                                setAttributes({
                                    enableMeta: !enableMeta,
                                });
                            }}
                            __nextHasNoMarginBottom
                        />
                        {enableMeta && (
                            <>
                                <ToggleControl
                                    label={__("Show Date", "essential-blocks")}
                                    checked={showDate}
                                    onChange={() => {
                                        setAttributes({
                                            showDate: !showDate,
                                        });
                                    }}
                                    __nextHasNoMarginBottom
                                />
                                <ToggleControl
                                    label={__(
                                        "Show Subheading",
                                        "essential-blocks",
                                    )}
                                    checked={showSubheading}
                                    onChange={() => {
                                        setAttributes({
                                            showSubheading: !showSubheading,
                                        });
                                    }}
                                    __nextHasNoMarginBottom
                                />
                                <Divider />
                            </>
                        )}

                        <ToggleControl
                            label={__("Enable Labels", "essential-blocks")}
                            checked={enableLabels}
                            onChange={() => {
                                setAttributes({
                                    enableLabels: !enableLabels,
                                });
                            }}
                            help={__(
                                "Add custom labels to timeline items",
                                "essential-blocks",
                            )}
                            __nextHasNoMarginBottom
                        />

                        <Divider />

                        {(timelineLineStyle !== "three" && timelineLineStyle !== "four") && (
                            <EBIconPicker
                                value={timelineIcon}
                                attributeName={"timelineIcon"}
                                title={__("Timeline Icon", "essential-blocks")}
                            />
                        )}

                        {(timelineLineStyle === "three" || timelineLineStyle === "four") && (
                            <EBIconPicker
                                value={timelineCompleteIcon}
                                attributeName={"timelineCompleteIcon"}
                                title={__("Timeline Complete Icon", "essential-blocks")}
                            />
                        )}

                    </InspectorPanel.PanelBody>

                    <InspectorPanel.PanelBody
                        title={__("Custom Content", "essential-blocks")}
                        initialOpen={false}
                    >
                        <SortControl
                            items={timelines}
                            labelKey={"title"}
                            onSortEnd={(timelines) =>
                                setAttributes({ timelines })
                            }
                            onDeleteItem={(index) => {
                                setAttributes({
                                    timelines: timelines.filter(
                                        (_, i) => i !== index,
                                    ),
                                });
                            }}
                            hasSettings={true}
                            settingsComponents={getTimelinesComponents()}
                            hasAddButton={true}
                            onAddItem={onTimelineAdd}
                            addButtonText={__(
                                "Add New Timeline",
                                "essential-blocks",
                            )}
                        />
                    </InspectorPanel.PanelBody>

                    {enableLabels && (
                        <InspectorPanel.PanelBody
                            title={__("Labels", "essential-blocks")}
                            initialOpen={false}
                        >
                            <p>
                                {__(
                                    "Create custom labels that can be assigned to timeline items.",
                                    "essential-blocks",
                                )}
                            </p>

                            <SortControl
                                items={timelineLabels}
                                labelKey="label"
                                onSortEnd={onLabelSort}
                                hasDelete={true}
                                onDeleteItem={onLabelDelete}
                                hasSettings={true}
                                settingsComponents={timelineLabels.map(
                                    (label, index) => (
                                        <div key={label.id}>
                                            <EBTextControl
                                                label={__(
                                                    "Label",
                                                    "essential-blocks",
                                                )}
                                                value={label.label}
                                                onChange={(value) =>
                                                    onLabelChange(
                                                        "label",
                                                        value,
                                                        index,
                                                    )
                                                }
                                            />
                                            <ColorControl
                                                label={__(
                                                    "Text Color",
                                                    "essential-blocks",
                                                )}
                                                color={label.textColor}
                                                onChange={(value) =>
                                                    onLabelChange(
                                                        "textColor",
                                                        value,
                                                        index,
                                                    )
                                                }
                                            />
                                            <ColorControl
                                                label={__(
                                                    "Background Color",
                                                    "essential-blocks",
                                                )}
                                                color={label.backgroundColor}
                                                onChange={(value) =>
                                                    onLabelChange(
                                                        "backgroundColor",
                                                        value,
                                                        index,
                                                    )
                                                }
                                            />
                                            <ColorControl
                                                label={__(
                                                    "Border Color",
                                                    "essential-blocks",
                                                )}
                                                color={label.borderColor}
                                                onChange={(value) =>
                                                    onLabelChange(
                                                        "borderColor",
                                                        value,
                                                        index,
                                                    )
                                                }
                                            />
                                        </div>
                                    ),
                                )}
                                hasAddButton={true}
                                onAddItem={onLabelAdd}
                                addButtonText={__(
                                    "Add New Label",
                                    "essential-blocks",
                                )}
                                labelPrefix={__("Label #", "essential-blocks")}
                            />
                        </InspectorPanel.PanelBody>
                    )}
                </>
            </InspectorPanel.General>

            <InspectorPanel.Style>
                <>
                    <InspectorPanel.PanelBody
                        title={__("Timeline", "essential-blocks")}
                        initialOpen={true}
                    >
                        <RangeControl
                            label={__(
                                "Connector Width",
                                "essential-blocks",
                            )}
                            value={connectorWidth}
                            onChange={(value) =>
                                setAttributes({
                                    connectorWidth: value,
                                })
                            }
                            min={1}
                            max={(timelineLineStyle === "one" || timelineLineStyle === "four") ? 4 : 20}
                            step={1}
                            allowReset
                            resetFallbackValue={1}
                            __nextHasNoMarginBottom
                            __next40pxDefaultSize
                        />

                        <ColorControl
                            label={__("Connector Color", "essential-blocks")}
                            color={connectorColor}
                            attributeName={"connectorColor"}
                        />

                        <ColorControl
                            label={__(
                                "Progress Line Color",
                                "essential-blocks",
                            )}
                            color={progressLineColor}
                            attributeName={"progressLineColor"}
                            isGradient={true}
                        />

                    </InspectorPanel.PanelBody>

                    <InspectorPanel.PanelBody
                        title={__("Bullets", "essential-blocks")}
                        initialOpen={false}
                    >
                        {timelineLineStyle !== 'one' && (
                            <>

                                <ResponsiveRangeController
                                    baseLabel={__(
                                        "Bullet Size",
                                        "essential-blocks",
                                    )}
                                    controlName={BULLET_SIZE}
                                    min={1}
                                    max={100}
                                    step={1}
                                    noUnits
                                />
                                <ColorControl
                                    label={__("Bullet Color", "essential-blocks")}
                                    color={bulletColor}
                                    attributeName={"bulletColor"}
                                />
                                <BaseControl __nextHasNoMarginBottom>
                                    <h3 className="eb-control-title">
                                        {__("Bullet Border", "essential-blocks")}
                                    </h3>
                                </BaseControl>
                                <BorderShadowControl
                                    controlName={BULLET_BORDER_SHADOW}
                                    noShadow
                                    noBdrHover
                                />
                                <Divider />
                                <BaseControl __nextHasNoMarginBottom>
                                    <h3 className="eb-control-title">
                                        {__("Icon", "essential-blocks")}
                                    </h3>
                                </BaseControl>
                                {timelineLineStyle === 'four' && (
                                    <>
                                        <TypographyDropdown
                                            baseLabel={__(
                                                "Typography",
                                                "essential-blocks",
                                            )}
                                            typographyPrefixConstant={ITEM_ICON_TYPOGRAPHY}
                                        />
                                        <ResponsiveRangeController
                                            baseLabel={__(
                                                "Icon Width",
                                                "essential-blocks",
                                            )}
                                            controlName={TIMELINE_ICON_WIDTH}
                                            min={1}
                                            max={200}
                                            step={1}
                                            noUnits
                                        />
                                    </>
                                )}

                                <ResponsiveRangeController
                                    baseLabel={__(
                                        "Icon Size",
                                        "essential-blocks",
                                    )}
                                    controlName={TIMELINE_ICON_SIZE}
                                    min={1}
                                    max={200}
                                    step={1}
                                    noUnits
                                />
                            </>
                        )}

                        <ColorControl
                            label={__(
                                "Background",
                                "essential-blocks",
                            )}
                            color={timelineIconBgColor}
                            attributeName={"timelineIconBgColor"}
                        />

                        <ColorControl
                            label={__(
                                "Color",
                                "essential-blocks",
                            )}
                            color={timelineIconColor}
                            attributeName={"timelineIconColor"}
                        />

                        <Divider />
                        <BaseControl __nextHasNoMarginBottom>
                            <h3 className="eb-control-title">
                                {__("Complete State", "essential-blocks")}
                            </h3>
                        </BaseControl>

                        {timelineLineStyle !== 'one' && (
                            <>
                                <ColorControl
                                    label={__(
                                        "Bullet Background",
                                        "essential-blocks",
                                    )}
                                    color={bulletCompleteColor}
                                    attributeName={"bulletCompleteColor"}
                                />
                                <ColorControl
                                    label={__(
                                        "Bullet Border",
                                        "essential-blocks",
                                    )}
                                    color={bulletCompleteBorderColor}
                                    attributeName={"bulletCompleteBorderColor"}
                                />
                                {/* <ColorControl
                                    label={__(
                                        "Icon Background",
                                        "essential-blocks",
                                    )}
                                    color={timelineIconBGCompleteColor}
                                    attributeName={"timelineIconBGCompleteColor"}
                                /> */}
                            </>
                        )}

                        <ColorControl
                            label={__(
                                "Icon Color",
                                "essential-blocks",
                            )}
                            color={timelineIconCompleteColor}
                            attributeName={"timelineIconCompleteColor"}
                        />
                    </InspectorPanel.PanelBody>

                    {enableMeta && (
                        <InspectorPanel.PanelBody
                            title={__("Meta", "essential-blocks")}
                            initialOpen={false}
                        >
                            <ResponsiveRangeController
                                baseLabel={__(
                                    "Label & Meta Gap",
                                    "essential-blocks",
                                )}
                                controlName={META_GAP}
                                min={0}
                                max={100}
                                step={1}
                                noUnits
                            />
                            <ResponsiveRangeController
                                baseLabel={__("Meta Space", "essential-blocks")}
                                controlName={ICON_META_SPACE}
                                min={0}
                                max={100}
                                step={1}
                                noUnits
                            />

                            {showDate && (
                                <>
                                    <TypographyDropdown
                                        baseLabel={__(
                                            "Date Typography",
                                            "essential-blocks",
                                        )}
                                        typographyPrefixConstant={
                                            EBCT_META_TYPOGRAPHY
                                        }
                                    />

                                    <ColorControl
                                        label={__("Date Color", "essential-blocks")}
                                        color={dateColor}
                                        attributeName={"dateColor"}
                                    />
                                </>
                            )}

                            {showSubheading && (
                                <>
                                    <BaseControl __nextHasNoMarginBottom>
                                        <h3 className="eb-control-title">
                                            {__("Subheading", "essential-blocks")}
                                        </h3>
                                    </BaseControl>
                                    <TypographyDropdown
                                        baseLabel={__(
                                            "Subheading Typography",
                                            "essential-blocks",
                                        )}
                                        typographyPrefixConstant={
                                            EBCT_SUBHEADING_TYPOGRAPHY
                                        }
                                    />

                                    <ColorControl
                                        label={__(
                                            "Background",
                                            "essential-blocks",
                                        )}
                                        color={SubheadingBGColor}
                                        attributeName={"SubheadingBGColor"}
                                    />

                                    <ColorControl
                                        label={__(
                                            "Color",
                                            "essential-blocks",
                                        )}
                                        color={SubheadingColor}
                                        attributeName={"SubheadingColor"}
                                    />


                                    <BaseControl __nextHasNoMarginBottom>
                                        <h3 className="eb-control-title">
                                            {__("Border", "essential-blocks")}
                                        </h3>
                                    </BaseControl>
                                    <BorderShadowControl
                                        controlName={SUBHEADING_BORDER_SHADOW}
                                        noShadow
                                        noBdrHover
                                    />
                                </>
                            )}
                        </InspectorPanel.PanelBody>
                    )}


                    <InspectorPanel.PanelBody
                        title={__("Labels", "essential-blocks")}
                        initialOpen={false}
                    >
                        <TypographyDropdown
                            baseLabel={__("Typography", "essential-blocks")}
                            typographyPrefixConstant={LABEL_TYPOGRAPHY}
                        />
                        <ResponsiveRangeController
                            baseLabel={__("Labels Gap", "essential-blocks")}
                            controlName={LABEL_GAP}
                            min={0}
                            max={500}
                            step={1}
                            units={UNIT_TYPES}
                        />
                        <ResponsiveRangeController
                            baseLabel={__("Bottom Space", "essential-blocks")}
                            controlName={LABEL_BOTTOM_SPACE}
                            min={0}
                            max={300}
                            step={1}
                            units={UNIT_TYPES}
                        />
                        <BaseControl __nextHasNoMarginBottom>
                            <h3 className="eb-control-title">
                                {__("Border & Shadow", "essential-blocks")}
                            </h3>
                        </BaseControl>
                        <BorderShadowControl
                            controlName={LABEL_BORDER_SHADOW}
                            noShadow
                            noBdrHover
                        />
                    </InspectorPanel.PanelBody>

                    <InspectorPanel.PanelBody
                        title={__("Card", "essential-blocks")}
                        initialOpen={false}
                    >
                        <ResponsiveRangeController
                            baseLabel={__("Card Gap", "essential-blocks")}
                            controlName={CARD_GAP}
                            min={0}
                            max={500}
                            step={1}
                            units={UNIT_TYPES}
                        />
                        <ResponsiveRangeController
                            baseLabel={__("Line & Card Gap", "essential-blocks")}
                            controlName={LINE_CARD_GAP}
                            min={0}
                            max={500}
                            step={1}
                        />
                        <ButtonGroupControl
                            label={__("Alignment", "essential-blocks")}
                            options={TEXT_ALIGN}
                            attrName={'columnTextAlign'}
                            currentValue={columnTextAlign}
                        />

                        <ResponsiveDimensionsControl
                            controlName={COLUMN_PADDING}
                            baseLabel={__("Padding", "essential-blocks")}
                        />

                        <ColorControl
                            label={__("Background Color", "essential-blocks")}
                            color={columnBackgroundColor}
                            attributeName={"columnBackgroundColor"}
                        />

                        <BorderShadowControl
                            controlName={COLUMN_BORDER_SHADOW}
                            noBdrHover
                            noShdowHover
                        />

                        {showTitle && (
                            <>
                                <Divider />
                                <BaseControl __nextHasNoMarginBottom>
                                    <h3 className="eb-control-title">
                                        {__("Title", "essential-blocks")}
                                    </h3>
                                </BaseControl>
                                <TypographyDropdown
                                    baseLabel={__("Typography", "essential-blocks")}
                                    typographyPrefixConstant={EBCT_TITLE_TYPOGRAPHY}
                                />

                                <ColorControl
                                    label={__("Color", "essential-blocks")}
                                    color={titleColor}
                                    attributeName={"titleColor"}
                                />

                                <ResponsiveDimensionsControl
                                    controlName={TITLE_MARGIN}
                                    baseLabel={__("Margin", "essential-blocks")}
                                />
                            </>
                        )}

                        {showContent && (
                            <>
                                <Divider />
                                <BaseControl __nextHasNoMarginBottom>
                                    <h3 className="eb-control-title">
                                        {__("Excerpt", "essential-blocks")}
                                    </h3>
                                </BaseControl>
                                <TypographyDropdown
                                    baseLabel={__("Typography", "essential-blocks")}
                                    typographyPrefixConstant={
                                        EBCT_CONTENT_TYPOGRAPHY
                                    }
                                />

                                <ColorControl
                                    label={__("Color", "essential-blocks")}
                                    color={contentColor}
                                    attributeName={"contentColor"}
                                />

                                <ResponsiveDimensionsControl
                                    controlName={CONTENT_MARGIN}
                                    baseLabel={__("Margin", "essential-blocks")}
                                />
                            </>
                        )}

                        <InspectorPanel.PanelBody
                            title={__("Icon & Thumbnail", "essential-blocks")}
                            initialOpen={false}
                        >
                            <ResponsiveRangeController
                                baseLabel={__("Icon Size", "essential-blocks")}
                                controlName={ITEM_ICON_SIZE}
                                min={1}
                                max={200}
                                step={1}
                                noUnits
                            />
                            <ColorControl
                                label={__("Icon Color", "essential-blocks")}
                                color={itemIconColor}
                                attributeName={"itemIconColor"}
                            />
                            <ColorControl
                                label={__(
                                    "Background Color",
                                    "essential-blocks",
                                )}
                                color={itemIconBgColor}
                                attributeName={"itemIconBgColor"}
                            />
                            <ResponsiveDimensionsControl
                                controlName={ITEM_ICON_PADDING}
                                baseLabel={__("Padding", "essential-blocks")}
                            />

                            <Divider />
                            <BaseControl __nextHasNoMarginBottom>
                                <h3 className="eb-control-title">
                                    {__("Thumbnail", "essential-blocks")}
                                </h3>
                            </BaseControl>

                            <ResponsiveRangeController
                                baseLabel={__("Size (%)", "essential-blocks")}
                                controlName={THUMBNAIL_IMAGE_SIZE}
                                min={1}
                                max={100}
                                step={1}
                                noUnits
                            />

                            {/* <ResponsiveDimensionsControl
                                controlName={THUMBNAIL_BORDER_RADIUS}
                                baseLabel={__(
                                    "Border Radius",
                                    "essential-blocks",
                                )}
                            /> */}

                            <Divider />

                            <ResponsiveDimensionsControl
                                controlName={THUMBNAIL_MARGIN}
                                baseLabel={__("Margin", "essential-blocks")}
                            />
                            <BorderShadowControl
                                controlName={MEDIA_BORDER_SHADOW}
                                noBdrHover
                            />
                        </InspectorPanel.PanelBody>

                        <InspectorPanel.PanelBody
                            title={__("Read More Button", "essential-blocks")}
                            initialOpen={false}
                        >
                            <TypographyDropdown
                                baseLabel={__("Typography", "essential-blocks")}
                                typographyPrefixConstant={
                                    EBCT_READMORE_TYPOGRAPHY
                                }
                            />

                            <ColorControl
                                label={__("Color", "essential-blocks")}
                                color={readmoreColor}
                                attributeName={"readmoreColor"}
                            />

                            <ColorControl
                                label={__(
                                    "Background Color",
                                    "essential-blocks",
                                )}
                                color={readmoreBGColor}
                                attributeName={"readmoreBGColor"}
                            />

                            <ColorControl
                                label={__("Hover Color", "essential-blocks")}
                                color={readmoreHoverColor}
                                attributeName={"readmoreHoverColor"}
                            />

                            <ColorControl
                                label={__(
                                    "Hover Background Color",
                                    "essential-blocks",
                                )}
                                color={readmoreBGHoverColor}
                                attributeName={"readmoreBGHoverColor"}
                            />

                            <ResponsiveDimensionsControl
                                controlName={READMORE_MARGIN}
                                baseLabel={__("Margin", "essential-blocks")}
                            />

                            <ResponsiveDimensionsControl
                                controlName={READMORE_PADDING}
                                baseLabel={__("Padding", "essential-blocks")}
                            />

                            <ResponsiveDimensionsControl
                                controlName={BTN_BORDER_RADIUS}
                                baseLabel={__(
                                    "Border Radius",
                                    "essential-blocks",
                                )}
                            />

                            <BorderShadowControl
                                controlName={BTN_BORDER_SHADOW}
                                noBorderRadius={true}
                            />
                        </InspectorPanel.PanelBody>

                    </InspectorPanel.PanelBody>
                </>
            </InspectorPanel.Style>
        </InspectorPanel>
    );
}

export default Inspector;
