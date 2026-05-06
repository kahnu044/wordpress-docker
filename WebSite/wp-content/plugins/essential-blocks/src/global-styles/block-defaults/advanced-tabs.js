/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useState } from "@wordpress/element";
import {
    PanelBody,
    SelectControl,
    ToggleControl,
    RangeControl,
    BaseControl,
    TabPanel,
    __experimentalToggleGroupControl as ToggleGroupControl,
    __experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from "@wordpress/components";

import {
    BackgroundControl,
    BorderShadowControl,
    ColorControl,
    ResponsiveRangeController,
    ResponsiveDimensionsControl,
    TypographyDropdown,
    useBlockDefaults,
    withBlockContext
} from "@essential-blocks/controls";

import {
    prefixWrapBg,
    prefixTitleBg,
    prefixActTitleBg,
    prefixContentBg,
    prefixTtlWrpBg,
} from "@essential-blocks/blocks/advanced-tabs/src/constants/backgroundsConstants";

import {
    prefixWrapBdShadow,
    prefixTitleBdShadow,
    prefixActTitleBdShadow,
    prefixContentBdShadow,
    prefixTtlWrpBdShadow,
} from "@essential-blocks/blocks/advanced-tabs/src/constants/borderShadowConstants";

import {
    prefixWrapperMargin,
    prefixWrapperPadding,
    prefixTitlePadding,
    prefixTitleMargin,
    prefixContentMargin,
    prefixContentPadding,
    prefixTtlWrpMargin,
    prefixTtlWrpPadding,
} from "@essential-blocks/blocks/advanced-tabs/src/constants/dimensionsConstants";

import {
    prefixTitleMinWidth,
    prefixIconSize,
    prefixIconGap,
    prefixCaretSize,
} from "@essential-blocks/blocks/advanced-tabs/src/constants/rangeNames";

import objAttributes from "@essential-blocks/blocks/advanced-tabs/src/attributes";

import {
    //
    typoPrefixTabTitle,
} from "@essential-blocks/blocks/advanced-tabs/src/constants/typographyPrefixConstants";

function AdvancedTabs(props) {
    const { blockDefaults, setBlockDefaults, name, deviceType, handleBlockDefault } = props;

    const {
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
    } = blockDefaults;

    const contentAttributes = ['tabTitles']
    const isDefaultSet = useBlockDefaults(name, blockDefaults, setBlockDefaults, objAttributes, contentAttributes)

    const [colorSwitcher, setColorSwitcher] = useState("normal");
    const [activeColorSwitcher, setActiveColorSwitcher] = useState("normal");

    return (
        <>
            {isDefaultSet && (
                <div className="eb-panel-control">
                    <PanelBody
                        title={__("Tabs Settings", "essential-blocks")}
                    // initialOpen={false}
                    >
                        <SelectControl
                            label={__("Tabs Layout", "essential-blocks")}
                            value={layout}
                            options={[
                                {
                                    label: __("Horizontal", "essential-blocks"),
                                    value: "horizontal",
                                },
                                {
                                    label: __("Vertical", "essential-blocks"),
                                    value: "vertical",
                                },
                            ]}
                            onChange={(layout) => handleBlockDefault({ layout: layout })}
                            __next40pxDefaultSize
                            __nextHasNoMarginBottom
                        />

                        {layout === "horizontal" && (
                            <>
                                <ToggleControl
                                    label={__("Fill Titles' Wrapper", "essential-blocks")}
                                    checked={isFillTitle}
                                    onChange={() =>
                                        handleBlockDefault({
                                            isFillTitle: !isFillTitle,
                                        })
                                    }
                                    __nextHasNoMarginBottom
                                />
                            </>
                        )}

                        <ToggleControl
                            label={__("Enable Icon", "essential-blocks")}
                            checked={isMediaOn}
                            onChange={() => handleBlockDefault({ isMediaOn: !isMediaOn })}
                            __nextHasNoMarginBottom
                        />
                        {isMediaOn && (
                            <>
                                <SelectControl
                                    label={__("Icon Layout", "essential-blocks")}
                                    value={mediaPositon}
                                    options={[
                                        {
                                            label: __("Stacked", "essential-blocks"),
                                            value: "stacked",
                                        },
                                        {
                                            label: __("Inline", "essential-blocks"),
                                            value: "inline",
                                        },
                                    ]}
                                    onChange={(mediaPositon) => handleBlockDefault({ mediaPositon })}
                                    __next40pxDefaultSize
                                    __nextHasNoMarginBottom
                                />
                                {mediaPositon === "inline" && (
                                    <>
                                        <ToggleGroupControl
                                            label={__("Icon Position", "essential-blocks")}

                                            value={mediaAlign}
                                            onChange={(value) =>
                                                handleBlockDefault({
                                                    mediaAlign: value,
                                                })
                                            }
                                            isBlock
                                            __next40pxDefaultSize
                                            __nextHasNoMarginBottom
                                        >
                                            <ToggleGroupControlOption
                                                value="left"
                                                label={__("Left", "essential-blocks")}
                                            />
                                            <ToggleGroupControlOption
                                                value="right"
                                                label={__("Right", "essential-blocks")}
                                            />
                                        </ToggleGroupControl>

                                        <label style={{ display: "block" }}>
                                            <i>Set icon position before/after the tab title.</i>
                                        </label>
                                    </>
                                )}
                            </>
                        )}
                    </PanelBody>
                    <PanelBody title={__("Tab Title Style", "essential-blocks")} initialOpen={false}>
                        <TypographyDropdown
                            baseLabel="Typography"
                            typographyPrefixConstant={typoPrefixTabTitle}
                        />

                        <ResponsiveRangeController
                            baseLabel={__("Title Min Width", "essential-blocks")}
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
                            baseLabel={__("Icon Size", "essential-blocks")}
                            controlName={prefixIconSize}
                            min={0}
                            max={200}
                            step={1}
                            noUnits
                        />

                        <ResponsiveRangeController
                            baseLabel={__("Icon Gap", "essential-blocks")}
                            controlName={prefixIconGap}
                            min={0}
                            max={200}
                            step={1}
                            noUnits
                        />

                        <ResponsiveDimensionsControl
                            controlName={prefixTitlePadding}
                            baseLabel="Padding"
                        />

                        <ResponsiveDimensionsControl
                            controlName={prefixTitleMargin}
                            baseLabel="Margin"
                        />

                        <PanelBody title={__("Colors", "essential-blocks")} initialOpen={false}>
                            <ToggleGroupControl
                                label={__("Color State", "essential-blocks")}

                                value={colorSwitcher}
                                onChange={(value) => setColorSwitcher(value)}
                                isBlock
                                __next40pxDefaultSize
                                __nextHasNoMarginBottom
                            >
                                <ToggleGroupControlOption
                                    value="normal"
                                    label={__("Normal", "essential-blocks")}
                                />
                                <ToggleGroupControlOption
                                    value="hover"
                                    label={__("Hover", "essential-blocks")}
                                />
                            </ToggleGroupControl>

                            {colorSwitcher === "normal" && (
                                <>
                                    <ColorControl
                                        label={__("Text", "essential-blocks")}
                                        defaultColor={objAttributes.textColor.default}
                                        color={textColor}
                                        onChange={(textColor) => handleBlockDefault({ textColor })}
                                    />

                                    <ColorControl
                                        label={__("Icon", "essential-blocks")}
                                        defaultColor={objAttributes.iconColor.default}
                                        color={iconColor}
                                        onChange={(iconColor) => handleBlockDefault({ iconColor })}
                                    />
                                </>
                            )}

                            {colorSwitcher === "hover" && (
                                <>
                                    <ColorControl
                                        label={__("Text", "essential-blocks")}
                                        defaultColor={objAttributes.hvTextColor.default}
                                        color={hvTextColor}
                                        onChange={(hvTextColor) => handleBlockDefault({ hvTextColor })}
                                    />

                                    <ColorControl
                                        label={__("Icon", "essential-blocks")}
                                        defaultColor={objAttributes.hvIconColor.default}
                                        color={hvIconColor}
                                        onChange={(hvIconColor) => handleBlockDefault({ hvIconColor })}
                                    />

                                    <RangeControl
                                        value={colorTransition}
                                        onChange={(colorTransition) =>
                                            handleBlockDefault({
                                                colorTransition,
                                            })
                                        }
                                        step={0.1}
                                        min={0}
                                        max={5}
                                        __nextHasNoMarginBottom
                                        __next40pxDefaultSize
                                    />
                                </>
                            )}
                        </PanelBody>

                        <PanelBody title={__("Background", "essential-blocks")} initialOpen={false}>
                            <BackgroundControl
                                controlName={prefixTitleBg}
                                noOverlay
                            // noMainBgi
                            // noOverlayBgi // if U pass 'noOverlay' prop U don't need to pass 'noOverlayBgi'
                            />
                        </PanelBody>

                        <PanelBody title={__("Border & Shadow")} initialOpen={false}>
                            <BorderShadowControl
                                controlName={prefixTitleBdShadow}
                            // noShadow
                            // noBorder
                            />
                        </PanelBody>

                        <PanelBody title={__("Active Colors", "essential-blocks")} initialOpen={false}>
                            <ToggleGroupControl
                                label={__("Active Color State", "essential-blocks")}

                                value={activeColorSwitcher}
                                onChange={(value) => setActiveColorSwitcher(value)}
                                isBlock
                                __next40pxDefaultSize
                                __nextHasNoMarginBottom
                            >
                                <ToggleGroupControlOption
                                    value="normal"
                                    label={__("Normal", "essential-blocks")}
                                />
                                <ToggleGroupControlOption
                                    value="hover"
                                    label={__("Hover", "essential-blocks")}
                                />
                            </ToggleGroupControl>

                            {activeColorSwitcher === "normal" && (
                                <>
                                    <ColorControl
                                        label={__("Text", "essential-blocks")}
                                        defaultColor={objAttributes.actTextColor.default}
                                        color={actTextColor}
                                        onChange={(actTextColor) => handleBlockDefault({ actTextColor })}
                                    />

                                    <ColorControl
                                        label={__("Icon", "essential-blocks")}
                                        defaultColor={objAttributes.actIconColor.default}
                                        color={actIconColor}
                                        onChange={(actIconColor) => handleBlockDefault({ actIconColor })}
                                    />
                                </>
                            )}

                            {activeColorSwitcher === "hover" && (
                                <>
                                    <ColorControl
                                        label={__("Text", "essential-blocks")}
                                        defaultColor={objAttributes.actHvTextColor.default}
                                        color={actHvTextColor}
                                        onChange={(actHvTextColor) =>
                                            handleBlockDefault({
                                                actHvTextColor,
                                            })
                                        }
                                    />

                                    <ColorControl
                                        label={__("Icon", "essential-blocks")}
                                        defaultColor={objAttributes.actHvIconColor.default}
                                        color={actHvIconColor}
                                        onChange={(actHvIconColor) =>
                                            handleBlockDefault({
                                                actHvIconColor,
                                            })
                                        }
                                    />

                                    <BaseControl label={__("Transition", "essential-blocks")} __nextHasNoMarginBottom>
                                        <RangeControl
                                            value={actColorTransition}
                                            onChange={(actColorTransition) =>
                                                handleBlockDefault({
                                                    actColorTransition,
                                                })
                                            }
                                            step={0.1}
                                            min={0}
                                            max={5}
                                            __nextHasNoMarginBottom
                                            __next40pxDefaultSize
                                        />
                                    </BaseControl>
                                </>
                            )}
                        </PanelBody>

                        <PanelBody title={__("Active Background", "essential-blocks")} initialOpen={false}>
                            <BackgroundControl
                                controlName={prefixActTitleBg}
                                noOverlay
                            // noMainBgi
                            // noOverlayBgi // if U pass 'noOverlay' prop U don't need to pass 'noOverlayBgi'
                            />
                        </PanelBody>

                        <PanelBody title={__("Active Border & Shadow")} initialOpen={false}>
                            <BorderShadowControl
                                controlName={prefixActTitleBdShadow}
                            // noShadow
                            // noBorder
                            />
                        </PanelBody>
                    </PanelBody>
                    <PanelBody title={__("Tab Titles' Wrapper Style", "essential-blocks")} initialOpen={false}>
                        <PanelBody title={__("Margin Padding", "essential-blocks")}>
                            <ResponsiveDimensionsControl
                                controlName={prefixTtlWrpMargin}
                                baseLabel="Margin"
                            />
                            <ResponsiveDimensionsControl
                                controlName={prefixTtlWrpPadding}
                                baseLabel="Padding"
                            />
                        </PanelBody>

                        <PanelBody title={__("Background", "essential-blocks")} initialOpen={false}>
                            <BackgroundControl
                                controlName={prefixTtlWrpBg}
                                noOverlay
                            // noMainBgi
                            // noOverlayBgi // if U pass 'noOverlay' prop U don't need to pass 'noOverlayBgi'
                            />
                        </PanelBody>

                        <PanelBody title={__("Border & Shadow")} initialOpen={false}>
                            <BorderShadowControl
                                controlName={prefixTtlWrpBdShadow}
                            // noShadow
                            // noBorder
                            />
                        </PanelBody>
                    </PanelBody>
                    <PanelBody title={__("Content Style")} initialOpen={false}>
                        <PanelBody title={__("Margin Padding", "essential-blocks")}>
                            <ResponsiveDimensionsControl
                                controlName={prefixContentMargin}
                                baseLabel="Margin"
                            />
                            <ResponsiveDimensionsControl
                                controlName={prefixContentPadding}
                                baseLabel="Padding"
                            />
                        </PanelBody>

                        <PanelBody title={__("Background", "essential-blocks")} initialOpen={false}>
                            <BackgroundControl
                                controlName={prefixContentBg}
                                noOverlay
                            // noMainBgi
                            // noOverlayBgi // if U pass 'noOverlay' prop U don't need to pass 'noOverlayBgi'
                            />
                        </PanelBody>

                        <PanelBody title={__("Border & Shadow")} initialOpen={false}>
                            <BorderShadowControl
                                controlName={prefixContentBdShadow}
                            // noShadow
                            // noBorder
                            />
                        </PanelBody>
                    </PanelBody>
                    <PanelBody title={__("Caret Style", "essential-blocks")} initialOpen={false}>
                        <ToggleControl
                            label={__("Show Caret on Active Tab", "essential-blocks")}
                            checked={showCaret}
                            onChange={() => handleBlockDefault({ showCaret: !showCaret })}
                            __nextHasNoMarginBottom
                        />

                        {showCaret && (
                            <>
                                <ResponsiveRangeController
                                    baseLabel={__("Caret Size", "essential-blocks")}
                                    controlName={prefixCaretSize}
                                    min={0}
                                    max={100}
                                    step={1}
                                    noUnits
                                />

                                <ColorControl
                                    label={__("Caret Color", "essential-blocks")}
                                    defaultColor={objAttributes.caretColor.default}
                                    color={caretColor}
                                    onChange={(caretColor) => handleBlockDefault({ caretColor })}
                                />
                            </>
                        )}
                    </PanelBody>
                    <PanelBody title={__("Wrapper Margin & Padding", "essential-blocks")} initialOpen={false}>
                        <ResponsiveDimensionsControl
                            controlName={prefixWrapperMargin}
                            baseLabel="Margin"
                        />
                        <ResponsiveDimensionsControl
                            controlName={prefixWrapperPadding}
                            baseLabel="Padding"
                        />
                    </PanelBody>

                    <PanelBody title={__("Wrapper Background", "essential-blocks")} initialOpen={false}>
                        <BackgroundControl
                            controlName={prefixWrapBg}
                        // noOverlay
                        // noMainBgi
                        // noOverlayBgi // if U pass 'noOverlay' prop U don't need to pass 'noOverlayBgi'
                        />
                    </PanelBody>

                    <PanelBody title={__("Wrapper Border & Shadow")} initialOpen={false}>
                        <BorderShadowControl
                            controlName={prefixWrapBdShadow}
                        // noShadow
                        // noBorder
                        />
                    </PanelBody>
                </div>
            )}
        </>
    );
}

export default withBlockContext(objAttributes)(AdvancedTabs);
