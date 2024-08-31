/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { MediaUpload } from "@wordpress/block-editor";
import { useState } from "@wordpress/element";
import {
    SelectControl,
    ToggleControl,
    Button,
    RangeControl,
    BaseControl,
    ButtonGroup,
    TextControl,
    PanelRow
} from "@wordpress/components";

/**
 * Internal dependencies
 */
import { addTab, deleteTab } from "./helpers";
import {
    BackgroundControl,
    BorderShadowControl,
    ColorControl,
    ResponsiveRangeController,
    ResponsiveDimensionsControl,
    TypographyDropdown,
    InspectorPanel,
    SortControl,
    ImageAvatar,
    EBIconPicker
} from "@essential-blocks/controls";

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
        <>
            <InspectorPanel advancedControlProps={{
                marginPrefix: prefixWrapperMargin,
                paddingPrefix: prefixWrapperPadding,
                backgroundPrefix: prefixWrapBg,
                borderPrefix: prefixWrapBdShadow,
                hasMargin: true
            }}>
                <InspectorPanel.General>
                    <InspectorPanel.PanelBody
                        title={__(
                            "Tabs List",
                            "essential-blocks"
                        )}
                        initialOpen={true}
                    >
                        <SortControl
                            items={attributes.tabTitles}
                            labelKey={'text'}
                            onSortEnd={tabTitles => setAttributes({ tabTitles })}
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
                    </InspectorPanel.PanelBody>
                    <InspectorPanel.PanelBody
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
                    </InspectorPanel.PanelBody>
                </InspectorPanel.General>
                <InspectorPanel.Style>
                    <InspectorPanel.PanelBody
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
                        />

                        <ResponsiveRangeController
                            baseLabel={__(
                                "Title Min Width",
                                "essential-blocks"
                            )}
                            controlName={prefixTitleMinWidth}
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
                            min={0}
                            max={200}
                            step={1}
                            noUnits
                        />

                        <ResponsiveDimensionsControl
                            controlName={prefixTitlePadding}
                            baseLabel={__("Padding", "essential-blocks")}
                        />

                        <ResponsiveDimensionsControl
                            controlName={prefixTitleMargin}
                            baseLabel={__("Margin", "essential-blocks")}
                        />

                        <InspectorPanel.PanelBody
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
                        </InspectorPanel.PanelBody>

                        <InspectorPanel.PanelBody
                            title={__(
                                "Background",
                                "essential-blocks"
                            )}
                            initialOpen={false}
                        >
                            <BackgroundControl
                                controlName={prefixTitleBg}
                                noOverlay
                            // noMainBgi
                            // noOverlayBgi // if U pass 'noOverlay' prop U don't need to pass 'noOverlayBgi'
                            />
                        </InspectorPanel.PanelBody>

                        <InspectorPanel.PanelBody
                            title={__("Border & Shadow")}
                            initialOpen={false}
                        >
                            <BorderShadowControl
                                controlName={
                                    prefixTitleBdShadow
                                }
                            // noShadow
                            // noBorder
                            />
                        </InspectorPanel.PanelBody>

                        <InspectorPanel.PanelBody
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
                        </InspectorPanel.PanelBody>

                        <InspectorPanel.PanelBody
                            title={__(
                                "Active Background",
                                "essential-blocks"
                            )}
                            initialOpen={false}
                        >
                            <BackgroundControl
                                controlName={prefixActTitleBg}
                                noOverlay
                            // noMainBgi
                            // noOverlayBgi // if U pass 'noOverlay' prop U don't need to pass 'noOverlayBgi'
                            />
                        </InspectorPanel.PanelBody>

                        <InspectorPanel.PanelBody
                            title={__("Active Border & Shadow", "essential-blocks")}
                            initialOpen={false}
                        >
                            <BorderShadowControl
                                controlName={
                                    prefixActTitleBdShadow
                                }
                            // noShadow
                            // noBorder
                            />
                        </InspectorPanel.PanelBody>
                    </InspectorPanel.PanelBody>

                    <InspectorPanel.PanelBody
                        title={__(
                            "Tab Titles' Wrapper",
                            "essential-blocks"
                        )}
                        initialOpen={false}
                    >
                        <InspectorPanel.PanelBody
                            title={__(
                                "Margin Padding",
                                "essential-blocks"
                            )}
                        >
                            <ResponsiveDimensionsControl
                                controlName={prefixTtlWrpMargin}
                                baseLabel={__("Margin", "essential-blocks")}
                            />
                            <ResponsiveDimensionsControl
                                controlName={
                                    prefixTtlWrpPadding
                                }
                                baseLabel={__("Padding", "essential-blocks")}
                            />
                        </InspectorPanel.PanelBody>

                        <InspectorPanel.PanelBody
                            title={__(
                                "Background",
                                "essential-blocks"
                            )}
                            initialOpen={false}
                        >
                            <BackgroundControl
                                controlName={prefixTtlWrpBg}
                                noOverlay
                            />
                        </InspectorPanel.PanelBody>

                        <InspectorPanel.PanelBody
                            title={__("Border & Shadow", "essential-blocks")}
                            initialOpen={false}
                        >
                            <BorderShadowControl
                                controlName={
                                    prefixTtlWrpBdShadow
                                }
                            />
                        </InspectorPanel.PanelBody>
                    </InspectorPanel.PanelBody>

                    <InspectorPanel.PanelBody
                        title={__("Content", "essential-blocks")}
                        initialOpen={false}
                    >
                        <InspectorPanel.PanelBody
                            title={__(
                                "Margin Padding",
                                "essential-blocks"
                            )}
                        >
                            <ResponsiveDimensionsControl
                                controlName={
                                    prefixContentMargin
                                }
                                baseLabel={__("Margin", "essential-blocks")}
                            />
                            <ResponsiveDimensionsControl
                                controlName={
                                    prefixContentPadding
                                }
                                baseLabel={__("Padding", "essential-blocks")}
                            />
                        </InspectorPanel.PanelBody>

                        <InspectorPanel.PanelBody
                            title={__(
                                "Background",
                                "essential-blocks"
                            )}
                            initialOpen={false}
                        >
                            <BackgroundControl
                                controlName={prefixContentBg}
                                noOverlay
                            />
                        </InspectorPanel.PanelBody>

                        <InspectorPanel.PanelBody
                            title={__("Border & Shadow", "essential-blocks")}
                            initialOpen={false}
                        >
                            <BorderShadowControl
                                controlName={
                                    prefixContentBdShadow
                                }
                            />
                        </InspectorPanel.PanelBody>
                    </InspectorPanel.PanelBody>

                    <InspectorPanel.PanelBody
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
                    </InspectorPanel.PanelBody>
                </InspectorPanel.Style>
            </InspectorPanel>
        </>
    );
}
export default Inspector;
