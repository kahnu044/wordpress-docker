/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { InspectorControls, MediaUpload } from "@wordpress/block-editor";
import { useState } from "@wordpress/element";
import {
    PanelBody,
    SelectControl,
    ToggleControl,
    Button,
    RangeControl,
    BaseControl,
    ButtonGroup,
    TabPanel,
    TextControl,
    PanelRow
} from "@wordpress/components";

/**
 * Internal dependencies
 */
import { addTab, resetTabsOrder, deleteTab } from "./helpers";
const {
    BackgroundControl,
    BorderShadowControl,
    ColorControl,
    ResponsiveRangeController,
    ResponsiveDimensionsControl,
    TypographyDropdown,
    AdvancedControls,
    SortControl,
    ImageAvatar,
    EBIconPicker
} = EBControls;

import {
    prefixWrapBg,
    prefixTitleBg,
    prefixActTitleBg,
    prefixContentBg,
    prefixTtlWrpBg,
} from "./constants/backgroundsConstants";

import {
    prefixWrapBdShadow,
    prefixTitleBdShadow,
    prefixActTitleBdShadow,
    prefixContentBdShadow,
    prefixTtlWrpBdShadow,
} from "./constants/borderShadowConstants";

import {
    prefixWrapperMargin,
    prefixWrapperPadding,
    prefixTitlePadding,
    prefixTitleMargin,
    prefixContentMargin,
    prefixContentPadding,
    prefixTtlWrpMargin,
    prefixTtlWrpPadding,
} from "./constants/dimensionsConstants";

import {
    prefixTitleMinWidth,
    prefixIconSize,
    prefixIconGap,
    prefixCaretSize,
} from "./constants/rangeNames";

import objAttributes from "./attributes";

import {
    //
    typoPrefixTabTitle,
} from "./constants/typographyPrefixConstants";

import { HEADING, VERTICALTOHORIZONTAL } from "./constants";

function Inspector(props) {
    const { attributes, setAttributes, clientId, handleTabTitleClick } = props;

    const {
        blockId,
        resOption,
        tabTitles,
        tabChildCount,
        isMediaOn,
        layout,
        mediaPositon,
        mediaAlign,
        textColor,
        iconColor,
        hvTextColor,
        hvIconColor,
        actTextColor,
        actIconColor,
        actHvTextColor,
        actHvIconColor,
        colorTransition,
        actColorTransition,
        showCaret,
        caretColor,
        isFillTitle,
        isMinHeightAsTitle,
        enableResponsiveLayout,
        verticalToHorizontal,
        tagName,
        closeAllTabs
    } = attributes;

    //
    const [colorSwitcher, setColorSwitcher] = useState("normal");
    const [activeColorSwitcher, setActiveColorSwitcher] = useState("normal");

    const resRequiredProps = {
        setAttributes,
        resOption,
        attributes,
        objAttributes,
    };

    const handleLayoutChange = (layout) => {
        setAttributes({ layout });
    };

    const addNewTab = () => {
        addTab({
            setAttributes,
            tabChildCount,
            clientId,
            tabTitles,
            blockId,
            handleTabTitleClick,
        });
    };

    const onDeleteTab = (index) => {
        deleteTab(clientId, setAttributes, tabTitles, index)
    }

    const onSortEnd = (tabTitles) => {
        resetTabsOrder(clientId, setAttributes, tabTitles)
    }

    const getTabsComponents = () => {
        const onTabChange = (key, value, position) => {
            const newFeature = { ...attributes.tabTitles[position] };
            const newFeatureList = [...attributes.tabTitles];
            newFeatureList[position] = newFeature;

            if (Array.isArray(key)) {
                key.map((item, index) => {
                    newFeatureList[position][item] = value[index];
                });
            } else {
                newFeatureList[position][key] = value;
            }

            setAttributes({ tabTitles: newFeatureList });
        };

        const handleDefaultActive = (id) => {
            const newTabTitles = tabTitles.map((item) => {
                if (item.id === id) {
                    item.isDefault = !item.isDefault;
                } else {
                    item.isDefault = false;
                }
                return item;
            });

            setAttributes({ tabTitles: newTabTitles });
        };

        return attributes.tabTitles.map((each, i) => (
            <div key={i}>
                <ToggleControl
                    label={__("Active Initially", "essential-blocks")}
                    checked={each.isDefault || false}
                    onChange={() => {
                        handleDefaultActive(each.id);
                    }}
                />

                <ButtonGroup>
                    {[
                        {
                            label: __("None", "essential-blocks"),
                            value: "none",
                        },
                        {
                            label: __("Icon", "essential-blocks"),
                            value: "icon",
                        },
                        {
                            label: __("Image", "essential-blocks"),
                            value: "image",
                        },
                    ].map((item, index) => (
                        <Button
                            key={index}
                            isSecondary={each.media !== item.value}
                            isPrimary={each.media === item.value}
                            onClick={() => {
                                onTabChange(
                                    "media",
                                    item.value,
                                    i
                                )
                            }}
                        >
                            {item.label}
                        </Button>
                    ))}
                </ButtonGroup>

                {each.media === "icon" && (
                    <div>
                        <label>Icon</label>
                        <EBIconPicker
                            value={each.icon}
                            onChange={(value) => onTabChange("icon", value, i)}
                            title={""}
                        />
                    </div>
                )}

                {each.media === "image" && (
                    <>
                        {!each.imgUrl && (
                            <MediaUpload
                                onSelect={({ id, url }) => {
                                    onTabChange(
                                        [
                                            "imgId",
                                            "imgUrl",
                                        ],
                                        [id, url],
                                        i
                                    );
                                }}
                                type="image"
                                value={each.imgId}
                                render={({ open }) => {
                                    return (
                                        <Button
                                            className="eb-background-control-inspector-panel-img-btn components-button"
                                            label={__(
                                                "Upload Image",
                                                "essential-blocks"
                                            )}
                                            icon="format-image"
                                            onClick={open}
                                        />
                                    );
                                }}
                            />
                        )}

                        {each.imgUrl && (
                            <ImageAvatar
                                imageUrl={each.imgUrl}
                                onDeleteImage={() => {
                                    onTabChange(
                                        [
                                            "imgId",
                                            "imgUrl",
                                        ],
                                        [null, null],
                                        i
                                    );
                                }}
                            />
                        )}
                    </>
                )}
                <TextControl
                    label={__("Custom ID", "essential-blocks")}
                    value={each.customId}
                    onChange={(value) => onTabChange("customId", value, i)}
                    help={__(
                        "Custom ID will be added as an anchor tag. For example, if you add ‘test’ as your custom ID, the link will become like the following: https://www.example.com/#test and it will open the respective tab directly.",
                        "essential-blocks"
                    )}
                />
            </div>
        ))
    }

    return (
        <InspectorControls key="controls">
            <div className="eb-panel-control">
                <TabPanel
                    className="eb-parent-tab-panel"
                    activeClass="active-tab"
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
                                            "Tabs List",
                                            "essential-blocks"
                                        )}
                                    >

                                        <SortControl
                                            items={attributes.tabTitles}
                                            labelKey={'text'}
                                            onSortEnd={tabTitles => onSortEnd(tabTitles)}
                                            onDeleteItem={index => onDeleteTab(index)}
                                            hasSettings={true}
                                            settingsComponents={getTabsComponents()}
                                            hasAddButton={true}
                                            onAddItem={addNewTab}
                                            addButtonText={__(
                                                "Add Tab",
                                                "essential-blocks"
                                            )}
                                        ></SortControl>
                                    </PanelBody>

                                    <PanelBody
                                        title={__(
                                            "Tabs Settings",
                                            "essential-blocks"
                                        )}
                                        initialOpen={false}
                                    >
                                        <BaseControl
                                            label={__(
                                                "Title Level",
                                                "essential-blocks"
                                            )}
                                            id="eb-advance-heading-alignment"
                                        >
                                            <ButtonGroup className="eb-advance-heading-alignment eb-html-tag-buttongroup">
                                                {HEADING.map((item, key) => (
                                                    <Button
                                                        key={key}
                                                        isPrimary={
                                                            tagName ===
                                                            item.value
                                                        }
                                                        isSecondary={
                                                            tagName !==
                                                            item.value
                                                        }
                                                        onClick={() =>
                                                            setAttributes({
                                                                tagName:
                                                                    item.value,
                                                            })
                                                        }
                                                    >
                                                        {item.label}
                                                    </Button>
                                                ))}
                                            </ButtonGroup>
                                        </BaseControl>
                                        <SelectControl
                                            label={__(
                                                "Tabs Layout",
                                                "essential-blocks"
                                            )}
                                            value={layout}
                                            options={[
                                                {
                                                    label: __(
                                                        "Horizontal",
                                                        "essential-blocks"
                                                    ),
                                                    value: "horizontal",
                                                },
                                                {
                                                    label: __(
                                                        "Vertical",
                                                        "essential-blocks"
                                                    ),
                                                    value: "vertical",
                                                },
                                            ]}
                                            onChange={(layout) =>
                                                handleLayoutChange(layout)
                                            }
                                        />

                                        {layout === "horizontal" && (
                                            <>
                                                <ToggleControl
                                                    label={__(
                                                        "Fill Titles' Wrapper",
                                                        "essential-blocks"
                                                    )}
                                                    checked={isFillTitle}
                                                    onChange={() =>
                                                        setAttributes({
                                                            isFillTitle: !isFillTitle,
                                                        })
                                                    }
                                                />
                                            </>
                                        )}

                                        {layout === "vertical" && (
                                            <>
                                                <ToggleControl
                                                    label={__(
                                                        "Enable Responsive Layout",
                                                        "essential-blocks"
                                                    )}
                                                    checked={enableResponsiveLayout}
                                                    onChange={() =>
                                                        setAttributes({
                                                            enableResponsiveLayout: !enableResponsiveLayout,
                                                        })
                                                    }
                                                />
                                                <PanelRow className="eb-instruction"><strong>Note:</strong> Enable this option to switch the layout from vertical to horizontal on responsive devices.</PanelRow>
                                                {enableResponsiveLayout && (
                                                    <BaseControl
                                                        label={__(
                                                            "Select Devices for Horizontal Layout",
                                                            "essential-blocks"
                                                        )}
                                                        id="eb-advance-heading-alignment"
                                                    >
                                                        <ButtonGroup className="eb-advance-heading-alignment eb-verticaltohorizontal-buttongroup">
                                                            {VERTICALTOHORIZONTAL.map((item, key) => (
                                                                <Button
                                                                    key={key}
                                                                    isPrimary={
                                                                        verticalToHorizontal ===
                                                                        item.value
                                                                    }
                                                                    isSecondary={
                                                                        verticalToHorizontal !==
                                                                        item.value
                                                                    }
                                                                    onClick={() =>
                                                                        setAttributes({
                                                                            verticalToHorizontal:
                                                                                item.value,
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
                                                    label={__(
                                                        "Minimum Height Based on Tabs Heading Panel",
                                                        "essential-blocks"
                                                    )}
                                                    checked={isMinHeightAsTitle}
                                                    onChange={() =>
                                                        setAttributes({
                                                            isMinHeightAsTitle: !isMinHeightAsTitle,
                                                        })
                                                    }
                                                />
                                                <PanelRow className="eb-instruction"><strong>Note:</strong> When enabled, the tab content will have a minimum height equal to the height of the heading panel.</PanelRow>
                                            </>
                                        )}

                                        <ToggleControl
                                            label={__(
                                                "Enable Icon",
                                                "essential-blocks"
                                            )}
                                            checked={isMediaOn}
                                            onChange={() =>
                                                setAttributes({
                                                    isMediaOn: !isMediaOn,
                                                })
                                            }
                                        />
                                        <ToggleControl
                                            label={__(
                                                "Close All Tabs Initially",
                                                "essential-blocks"
                                            )}
                                            checked={closeAllTabs}
                                            onChange={() =>
                                                setAttributes({
                                                    closeAllTabs: !closeAllTabs,
                                                })
                                            }
                                        />
                                        {isMediaOn && (
                                            <>
                                                <SelectControl
                                                    label={__(
                                                        "Icon Layout",
                                                        "essential-blocks"
                                                    )}
                                                    value={mediaPositon}
                                                    options={[
                                                        {
                                                            label: __(
                                                                "Stacked",
                                                                "essential-blocks"
                                                            ),
                                                            value: "stacked",
                                                        },
                                                        {
                                                            label: __(
                                                                "Inline",
                                                                "essential-blocks"
                                                            ),
                                                            value: "inline",
                                                        },
                                                    ]}
                                                    onChange={(mediaPositon) =>
                                                        setAttributes({
                                                            mediaPositon,
                                                        })
                                                    }
                                                />
                                                {mediaPositon === "inline" && (
                                                    <>
                                                        <ButtonGroup id="eb-advTabs-type-btgrp">
                                                            {[
                                                                {
                                                                    label: __(
                                                                        "Left",
                                                                        "essential-blocks"
                                                                    ),
                                                                    value:
                                                                        "left",
                                                                },
                                                                {
                                                                    label: __(
                                                                        "Right",
                                                                        "essential-blocks"
                                                                    ),
                                                                    value:
                                                                        "right",
                                                                },
                                                            ].map(
                                                                (
                                                                    item,
                                                                    index
                                                                ) => (
                                                                    <Button
                                                                        key={
                                                                            index
                                                                        }
                                                                        // isLarge
                                                                        isSecondary={
                                                                            mediaAlign !==
                                                                            item.value
                                                                        }
                                                                        isPrimary={
                                                                            mediaAlign ===
                                                                            item.value
                                                                        }
                                                                        onClick={() =>
                                                                            setAttributes(
                                                                                {
                                                                                    mediaAlign:
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

                                                        <label
                                                            style={{
                                                                display:
                                                                    "block",
                                                            }}
                                                        >
                                                            <i>
                                                                {__("Set icon position before / after the tab title.", "essentail-blocks")}
                                                            </i>
                                                        </label>
                                                    </>
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
                                            "Tab Title",
                                            "essential-blocks"
                                        )}
                                    // initialOpen={false}
                                    >
                                        <TypographyDropdown
                                            baseLabel={__("Typography", "essential-blocks")}
                                            typographyPrefixConstant={
                                                typoPrefixTabTitle
                                            }
                                            resRequiredProps={resRequiredProps}
                                        />

                                        <ResponsiveRangeController
                                            baseLabel={__(
                                                "Title Min Width",
                                                "essential-blocks"
                                            )}
                                            controlName={prefixTitleMinWidth}
                                            resRequiredProps={resRequiredProps}
                                            min={0}
                                            max={1000}
                                            step={1}
                                            units={[
                                                { label: "px", value: "px" },
                                                { label: "em", value: "em" },
                                                { label: "%", value: "%" },
                                            ]}
                                        />

                                        <ResponsiveRangeController
                                            baseLabel={__(
                                                "Icon Size",
                                                "essential-blocks"
                                            )}
                                            controlName={prefixIconSize}
                                            resRequiredProps={resRequiredProps}
                                            min={0}
                                            max={200}
                                            step={1}
                                            noUnits
                                        />

                                        <ResponsiveRangeController
                                            baseLabel={__(
                                                "Icon Gap",
                                                "essential-blocks"
                                            )}
                                            controlName={prefixIconGap}
                                            resRequiredProps={resRequiredProps}
                                            min={0}
                                            max={200}
                                            step={1}
                                            noUnits
                                        />

                                        <ResponsiveDimensionsControl
                                            resRequiredProps={resRequiredProps}
                                            controlName={prefixTitlePadding}
                                            baseLabel={__("Padding", "essential-blocks")}
                                        />

                                        <ResponsiveDimensionsControl
                                            resRequiredProps={resRequiredProps}
                                            controlName={prefixTitleMargin}
                                            baseLabel={__("Margin", "essential-blocks")}
                                        />

                                        <PanelBody
                                            title={__(
                                                "Colors",
                                                "essential-blocks"
                                            )}
                                            initialOpen={false}
                                        >
                                            <BaseControl>
                                                <ButtonGroup>
                                                    {[
                                                        {
                                                            label: __(
                                                                "Normal",
                                                                "essential-blocks"
                                                            ),
                                                            value: "normal",
                                                        },
                                                        {
                                                            label: __(
                                                                "Hover",
                                                                "essential-blocks"
                                                            ),
                                                            value: "hover",
                                                        },
                                                    ].map(
                                                        (
                                                            { value, label },
                                                            index
                                                        ) => (
                                                            <Button
                                                                key={index}
                                                                // isLarge
                                                                isPrimary={
                                                                    colorSwitcher ===
                                                                    value
                                                                }
                                                                isSecondary={
                                                                    colorSwitcher !==
                                                                    value
                                                                }
                                                                onClick={() =>
                                                                    setColorSwitcher(
                                                                        value
                                                                    )
                                                                }
                                                            >
                                                                {label}
                                                            </Button>
                                                        )
                                                    )}
                                                </ButtonGroup>
                                            </BaseControl>

                                            {colorSwitcher === "normal" && (
                                                <>
                                                    <ColorControl
                                                        label={__(
                                                            "Text",
                                                            "essential-blocks"
                                                        )}
                                                        defaultColor={
                                                            objAttributes
                                                                .textColor
                                                                .default
                                                        }
                                                        color={textColor}
                                                        onChange={(textColor) =>
                                                            setAttributes({
                                                                textColor,
                                                            })
                                                        }
                                                    />

                                                    <ColorControl
                                                        label={__(
                                                            "Icon",
                                                            "essential-blocks"
                                                        )}
                                                        defaultColor={
                                                            objAttributes
                                                                .iconColor
                                                                .default
                                                        }
                                                        color={iconColor}
                                                        onChange={(iconColor) =>
                                                            setAttributes({
                                                                iconColor,
                                                            })
                                                        }
                                                    />
                                                </>
                                            )}

                                            {colorSwitcher === "hover" && (
                                                <>
                                                    <ColorControl
                                                        label={__(
                                                            "Text",
                                                            "essential-blocks"
                                                        )}
                                                        defaultColor={
                                                            objAttributes
                                                                .hvTextColor
                                                                .default
                                                        }
                                                        color={hvTextColor}
                                                        onChange={(
                                                            hvTextColor
                                                        ) =>
                                                            setAttributes({
                                                                hvTextColor,
                                                            })
                                                        }
                                                    />

                                                    <ColorControl
                                                        label={__(
                                                            "Icon",
                                                            "essential-blocks"
                                                        )}
                                                        defaultColor={
                                                            objAttributes
                                                                .hvIconColor
                                                                .default
                                                        }
                                                        color={hvIconColor}
                                                        onChange={(
                                                            hvIconColor
                                                        ) =>
                                                            setAttributes({
                                                                hvIconColor,
                                                            })
                                                        }
                                                    />

                                                    <RangeControl
                                                        value={colorTransition}
                                                        onChange={(
                                                            colorTransition
                                                        ) =>
                                                            setAttributes({
                                                                colorTransition,
                                                            })
                                                        }
                                                        step={0.1}
                                                        min={0}
                                                        max={5}
                                                    />
                                                </>
                                            )}
                                        </PanelBody>

                                        <PanelBody
                                            title={__(
                                                "Background",
                                                "essential-blocks"
                                            )}
                                            initialOpen={false}
                                        >
                                            <BackgroundControl
                                                controlName={prefixTitleBg}
                                                resRequiredProps={
                                                    resRequiredProps
                                                }
                                                noOverlay
                                            // noMainBgi
                                            // noOverlayBgi // if U pass 'noOverlay' prop U don't need to pass 'noOverlayBgi'
                                            />
                                        </PanelBody>

                                        <PanelBody
                                            title={__("Border & Shadow")}
                                            initialOpen={false}
                                        >
                                            <BorderShadowControl
                                                controlName={
                                                    prefixTitleBdShadow
                                                }
                                                resRequiredProps={
                                                    resRequiredProps
                                                }
                                            // noShadow
                                            // noBorder
                                            />
                                        </PanelBody>

                                        <PanelBody
                                            title={__(
                                                "Active Colors",
                                                "essential-blocks"
                                            )}
                                            initialOpen={false}
                                        >
                                            <BaseControl>
                                                <ButtonGroup>
                                                    {[
                                                        {
                                                            label: __(
                                                                "Normal",
                                                                "essential-blocks"
                                                            ),
                                                            value: "normal",
                                                        },
                                                        {
                                                            label: __(
                                                                "Hover",
                                                                "essential-blocks"
                                                            ),
                                                            value: "hover",
                                                        },
                                                    ].map(
                                                        (
                                                            { value, label },
                                                            index
                                                        ) => (
                                                            <Button
                                                                key={index}
                                                                isPrimary={
                                                                    activeColorSwitcher ===
                                                                    value
                                                                }
                                                                isSecondary={
                                                                    activeColorSwitcher !==
                                                                    value
                                                                }
                                                                onClick={() =>
                                                                    setActiveColorSwitcher(
                                                                        value
                                                                    )
                                                                }
                                                            >
                                                                {label}
                                                            </Button>
                                                        )
                                                    )}
                                                </ButtonGroup>
                                            </BaseControl>

                                            {activeColorSwitcher ===
                                                "normal" && (
                                                    <>
                                                        <ColorControl
                                                            label={__(
                                                                "Text",
                                                                "essential-blocks"
                                                            )}
                                                            defaultColor={
                                                                objAttributes
                                                                    .actTextColor
                                                                    .default
                                                            }
                                                            color={actTextColor}
                                                            onChange={(
                                                                actTextColor
                                                            ) =>
                                                                setAttributes({
                                                                    actTextColor,
                                                                })
                                                            }
                                                        />

                                                        <ColorControl
                                                            label={__(
                                                                "Icon",
                                                                "essential-blocks"
                                                            )}
                                                            defaultColor={
                                                                objAttributes
                                                                    .actIconColor
                                                                    .default
                                                            }
                                                            color={actIconColor}
                                                            onChange={(
                                                                actIconColor
                                                            ) =>
                                                                setAttributes({
                                                                    actIconColor,
                                                                })
                                                            }
                                                        />
                                                    </>
                                                )}

                                            {activeColorSwitcher ===
                                                "hover" && (
                                                    <>
                                                        <ColorControl
                                                            label={__(
                                                                "Text",
                                                                "essential-blocks"
                                                            )}
                                                            defaultColor={
                                                                objAttributes
                                                                    .actHvTextColor
                                                                    .default
                                                            }
                                                            color={actHvTextColor}
                                                            onChange={(
                                                                actHvTextColor
                                                            ) =>
                                                                setAttributes({
                                                                    actHvTextColor,
                                                                })
                                                            }
                                                        />

                                                        <ColorControl
                                                            label={__(
                                                                "Icon",
                                                                "essential-blocks"
                                                            )}
                                                            defaultColor={
                                                                objAttributes
                                                                    .actHvIconColor
                                                                    .default
                                                            }
                                                            color={actHvIconColor}
                                                            onChange={(
                                                                actHvIconColor
                                                            ) =>
                                                                setAttributes({
                                                                    actHvIconColor,
                                                                })
                                                            }
                                                        />

                                                        <BaseControl
                                                            label={__(
                                                                "Transition",
                                                                "essential-blocks"
                                                            )}
                                                        >
                                                            <RangeControl
                                                                value={
                                                                    actColorTransition
                                                                }
                                                                onChange={(
                                                                    actColorTransition
                                                                ) =>
                                                                    setAttributes({
                                                                        actColorTransition,
                                                                    })
                                                                }
                                                                step={0.1}
                                                                min={0}
                                                                max={5}
                                                            />
                                                        </BaseControl>
                                                    </>
                                                )}
                                        </PanelBody>

                                        <PanelBody
                                            title={__(
                                                "Active Background",
                                                "essential-blocks"
                                            )}
                                            initialOpen={false}
                                        >
                                            <BackgroundControl
                                                controlName={prefixActTitleBg}
                                                resRequiredProps={
                                                    resRequiredProps
                                                }
                                                noOverlay
                                            // noMainBgi
                                            // noOverlayBgi // if U pass 'noOverlay' prop U don't need to pass 'noOverlayBgi'
                                            />
                                        </PanelBody>

                                        <PanelBody
                                            title={__("Active Border & Shadow", "essential-blocks")}
                                            initialOpen={false}
                                        >
                                            <BorderShadowControl
                                                controlName={
                                                    prefixActTitleBdShadow
                                                }
                                                resRequiredProps={
                                                    resRequiredProps
                                                }
                                            // noShadow
                                            // noBorder
                                            />
                                        </PanelBody>
                                    </PanelBody>

                                    <PanelBody
                                        title={__(
                                            "Tab Titles' Wrapper",
                                            "essential-blocks"
                                        )}
                                        initialOpen={false}
                                    >
                                        <PanelBody
                                            title={__(
                                                "Margin Padding",
                                                "essential-blocks"
                                            )}
                                        >
                                            <ResponsiveDimensionsControl
                                                resRequiredProps={
                                                    resRequiredProps
                                                }
                                                controlName={prefixTtlWrpMargin}
                                                baseLabel={__("Margin", "essential-blocks")}
                                            />
                                            <ResponsiveDimensionsControl
                                                resRequiredProps={
                                                    resRequiredProps
                                                }
                                                controlName={
                                                    prefixTtlWrpPadding
                                                }
                                                baseLabel={__("Padding", "essential-blocks")}
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
                                                controlName={prefixTtlWrpBg}
                                                resRequiredProps={
                                                    resRequiredProps
                                                }
                                                noOverlay
                                            />
                                        </PanelBody>

                                        <PanelBody
                                            title={__("Border & Shadow", "essential-blocks")}
                                            initialOpen={false}
                                        >
                                            <BorderShadowControl
                                                controlName={
                                                    prefixTtlWrpBdShadow
                                                }
                                                resRequiredProps={
                                                    resRequiredProps
                                                }
                                            />
                                        </PanelBody>
                                    </PanelBody>

                                    <PanelBody
                                        title={__("Content", "essential-blocks")}
                                        initialOpen={false}
                                    >
                                        <PanelBody
                                            title={__(
                                                "Margin Padding",
                                                "essential-blocks"
                                            )}
                                        >
                                            <ResponsiveDimensionsControl
                                                resRequiredProps={
                                                    resRequiredProps
                                                }
                                                controlName={
                                                    prefixContentMargin
                                                }
                                                baseLabel={__("Margin", "essential-blocks")}
                                            />
                                            <ResponsiveDimensionsControl
                                                resRequiredProps={
                                                    resRequiredProps
                                                }
                                                controlName={
                                                    prefixContentPadding
                                                }
                                                baseLabel={__("Padding", "essential-blocks")}
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
                                                controlName={prefixContentBg}
                                                resRequiredProps={
                                                    resRequiredProps
                                                }
                                                noOverlay
                                            />
                                        </PanelBody>

                                        <PanelBody
                                            title={__("Border & Shadow", "essential-blocks")}
                                            initialOpen={false}
                                        >
                                            <BorderShadowControl
                                                controlName={
                                                    prefixContentBdShadow
                                                }
                                                resRequiredProps={
                                                    resRequiredProps
                                                }
                                            />
                                        </PanelBody>
                                    </PanelBody>

                                    <PanelBody
                                        title={__("Caret", "essential-blocks")}
                                        initialOpen={false}
                                    >
                                        <ToggleControl
                                            label={__(
                                                "Show Caret on Active Tab",
                                                "essential-blocks"
                                            )}
                                            checked={showCaret}
                                            onChange={() =>
                                                setAttributes({
                                                    showCaret: !showCaret,
                                                })
                                            }
                                        />

                                        {showCaret && (
                                            <>
                                                <ResponsiveRangeController
                                                    baseLabel={__(
                                                        "Caret Size",
                                                        "essential-blocks"
                                                    )}
                                                    controlName={
                                                        prefixCaretSize
                                                    }
                                                    resRequiredProps={
                                                        resRequiredProps
                                                    }
                                                    min={0}
                                                    max={100}
                                                    step={1}
                                                    noUnits
                                                />

                                                <ColorControl
                                                    label={__(
                                                        "Caret Color",
                                                        "essential-blocks"
                                                    )}
                                                    defaultColor={
                                                        objAttributes.caretColor
                                                            .default
                                                    }
                                                    color={caretColor}
                                                    onChange={(caretColor) =>
                                                        setAttributes({
                                                            caretColor,
                                                        })
                                                    }
                                                />
                                            </>
                                        )}
                                    </PanelBody>
                                </>
                            )}
                            {tab.name === "advance" && (
                                <>
                                    <PanelBody
                                        title={__(
                                            "Margin Padding",
                                            "essential-blocks"
                                        )}
                                    >
                                        <ResponsiveDimensionsControl
                                            resRequiredProps={resRequiredProps}
                                            controlName={prefixWrapperMargin}
                                            baseLabel={__("Margin", "essential-blocks")}
                                        />
                                        <ResponsiveDimensionsControl
                                            resRequiredProps={resRequiredProps}
                                            controlName={prefixWrapperPadding}
                                            baseLabel={__("Padding", "essential-blocks")}
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
                                            controlName={prefixWrapBg}
                                            resRequiredProps={resRequiredProps}
                                        />
                                    </PanelBody>

                                    <PanelBody
                                        title={__("Border & Shadow", "essential-blocks")}
                                        initialOpen={false}
                                    >
                                        <BorderShadowControl
                                            controlName={prefixWrapBdShadow}
                                            resRequiredProps={resRequiredProps}
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
