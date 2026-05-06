/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useEffect, useState } from "@wordpress/element";
import {
    PanelBody,
    SelectControl,
    ToggleControl,
    TextControl,
    BaseControl,
    DateTimePicker,
    TabPanel,
    __experimentalToggleGroupControl as ToggleGroupControl,
    __experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from "@wordpress/components";

import {
    TypographyDropdown,
    ResponsiveDimensionsControl,
    ResponsiveRangeController,
    ColorControl,
    BorderShadowControl,
    BackgroundControl,
    AdvancedControls,
    useBlockDefaults,
    withBlockContext
} from "@essential-blocks/controls";

/**
 * Internal depencencies
 */
import {
    STYLE_PRESETS,
    ALIGN_ITEMS,
    SEPARATOR_TYPES,
    LAYOUT_TYPES,
    JUSTIFY_CONTENTS,
    FLEX_DIRECTIONS,
} from "@essential-blocks/blocks/countdown/src/constants/index";

import {
    typoPrefix_digits,
    typoPrefix_labels,
    typoPrefix_separator,
} from "@essential-blocks/blocks/countdown/src/constants/typographyPrefixConstants";

import {
    wrapperWidth,
    boxsSpaceConst,
    separatorPosTop,
    separatorPosRight,
} from "@essential-blocks/blocks/countdown/src/constants/rangeNames";

import {
    cdBoxsPaddingConst,
    cdWrapMarginConst,
    cdWrapPaddingConst,
    cdDigitsPaddingConst,
    cdLabelsPaddingConst,
} from "@essential-blocks/blocks/countdown/src/constants/dimensionsConstants";

import {
    cdBoxsBgConst,
    cdDayBoxBgConst,
    cdHourBoxBgConst,
    cdMinuteBoxBgConst,
    cdSecondBoxBgConst,
    WrpBgConst,
} from "@essential-blocks/blocks/countdown/src/constants/backgroundsConstants";

import {
    cdBoxsBdShadowConst,
    WrpBdShadowConst,
} from "@essential-blocks/blocks/countdown/src/constants/borderShadowConstants";

import SingleBoxControl from "@essential-blocks/blocks/countdown/src/singleBoxControl";

import objAttributes from "@essential-blocks/blocks/countdown/src/attributes";

function Countdown(props) {
    const { blockDefaults, setBlockDefaults, name, deviceType, handleBlockDefault } = props;

    const {
        //
        showDays,
        showHours,
        showMinutes,
        showSeconds,

        daysLabel,
        hoursLabel,
        minutesLabel,
        secondsLabel,

        flexDirection,

        showSeparator,
        separatorType,
        // sepPositionRight,
        // sepPositionTop,
        separatorColor,

        contentsAlign,

        //
        contentsDirection,

        //
        contentsJustify,

        //
        digitsColor,

        //
        labelsColor,
    } = blockDefaults;

    const isDefaultSet = useBlockDefaults(name, blockDefaults, setBlockDefaults, objAttributes)

    return (
        <>
            {isDefaultSet && (
                <div className="eb-panel-control">
                    <PanelBody title={__("Content Settings", "essential-blocks")} initialOpen={true}>
                        <ToggleControl
                            label={__("Display Days", "essential-blocks")}
                            checked={showDays}
                            onChange={() => handleBlockDefault({ showDays: !showDays })}
                            __nextHasNoMarginBottom
                        />

                        {showDays && (
                            <>
                                <TextControl
                                    label={__("Custom Label For Days", "essential-blocks")}
                                    value={daysLabel}
                                    type="text"
                                    onChange={(daysLabel) => handleBlockDefault({ daysLabel })}
                                    __next40pxDefaultSize
                                    __nextHasNoMarginBottom
                                />

                                <p
                                    style={{
                                        marginTop: "-5px",
                                    }}
                                >
                                    <i>Leave blank to hide</i>
                                </p>
                            </>
                        )}

                        <ToggleControl
                            label={__("Display Hours", "essential-blocks")}
                            checked={showHours}
                            onChange={() => handleBlockDefault({ showHours: !showHours })}
                            __nextHasNoMarginBottom
                        />

                        {showHours && (
                            <>
                                <TextControl
                                    label={__("Custom Label For Hours", "essential-blocks")}
                                    value={hoursLabel}
                                    type="text"
                                    onChange={(hoursLabel) => handleBlockDefault({ hoursLabel })}
                                    __next40pxDefaultSize
                                    __nextHasNoMarginBottom
                                />

                                <p
                                    style={{
                                        marginTop: "-5px",
                                    }}
                                >
                                    <i>Leave blank to hide</i>
                                </p>
                            </>
                        )}

                        <ToggleControl
                            label={__("Display Minutes", "essential-blocks")}
                            checked={showMinutes}
                            onChange={() =>
                                handleBlockDefault({
                                    showMinutes: !showMinutes,
                                })
                            }
                            __nextHasNoMarginBottom
                        />

                        {showMinutes && (
                            <>
                                <TextControl
                                    label={__("Custom Label For Minutes", "essential-blocks")}
                                    value={minutesLabel}
                                    type="text"
                                    onChange={(minutesLabel) => handleBlockDefault({ minutesLabel })}
                                    __next40pxDefaultSize
                                    __nextHasNoMarginBottom
                                />

                                <p
                                    style={{
                                        marginTop: "-5px",
                                    }}
                                >
                                    <i>Leave blank to hide</i>
                                </p>
                            </>
                        )}

                        <ToggleControl
                            label={__("Display Seconds", "essential-blocks")}
                            checked={showSeconds}
                            onChange={() =>
                                handleBlockDefault({
                                    showSeconds: !showSeconds,
                                })
                            }
                            __nextHasNoMarginBottom
                        />

                        {showSeconds && (
                            <>
                                <TextControl
                                    label={__("Custom Label For Seconds", "essential-blocks")}
                                    value={secondsLabel}
                                    type="text"
                                    onChange={(secondsLabel) => handleBlockDefault({ secondsLabel })}
                                    __next40pxDefaultSize
                                    __nextHasNoMarginBottom
                                />

                                <p
                                    style={{
                                        marginTop: "-5px",
                                    }}
                                >
                                    <i>Leave blank to hide</i>
                                </p>
                            </>
                        )}
                    </PanelBody>
                    {/* Styles */}
                    <PanelBody title={__("Boxes Styles", "essential-blocks")}>
                        <ToggleGroupControl
                            label="Layout"

                            value={flexDirection}
                            onChange={(value) =>
                                handleBlockDefault({
                                    flexDirection: value,
                                })
                            }
                            isBlock
                            __next40pxDefaultSize
                            __nextHasNoMarginBottom
                        >
                            {LAYOUT_TYPES.map(({ value, label }, index) => (
                                <ToggleGroupControlOption
                                    key={index}
                                    value={value}
                                    label={label}
                                />
                            ))}
                        </ToggleGroupControl>
                        <ResponsiveRangeController
                            noUnits
                            baseLabel={__("Container Max Width", "essential-blocks")}
                            controlName={wrapperWidth}
                            min={100}
                            max={2000}
                            step={1}
                        />

                        <ResponsiveRangeController
                            noUnits
                            baseLabel={__("Space Between Boxs", "essential-blocks")}
                            controlName={boxsSpaceConst}
                            min={0}
                            max={200}
                            step={1}
                        />

                        <BaseControl label={__("Contents Direction", "essential-blocks")} __nextHasNoMarginBottom>
                            <SelectControl
                                value={contentsDirection}
                                options={FLEX_DIRECTIONS}
                                onChange={(contentsDirection) => handleBlockDefault({ contentsDirection })}
                                __next40pxDefaultSize
                                __nextHasNoMarginBottom
                            />
                        </BaseControl>

                        {contentsDirection && contentsDirection.includes("row") && (
                            <>
                                <BaseControl label={__("Contents Justify Position", "essential-blocks")} __nextHasNoMarginBottom>
                                    <SelectControl
                                        value={contentsJustify}
                                        options={JUSTIFY_CONTENTS}
                                        onChange={(contentsJustify) =>
                                            handleBlockDefault({
                                                contentsJustify,
                                            })
                                        }
                                        __next40pxDefaultSize
                                        __nextHasNoMarginBottom
                                    />
                                </BaseControl>
                            </>
                        )}

                        <ToggleGroupControl
                            label={__("Contents Alignment", "essential-blocks")}

                            value={contentsAlign}
                            onChange={(value) =>
                                handleBlockDefault({
                                    contentsAlign: value,
                                })
                            }
                            isBlock
                            __next40pxDefaultSize
                            __nextHasNoMarginBottom
                        >
                            {ALIGN_ITEMS.map(({ value, label }, index) => (
                                <ToggleGroupControlOption
                                    key={index}
                                    value={value}
                                    label={label}
                                />
                            ))}
                        </ToggleGroupControl>

                        <PanelBody title={__("Background", "essential-blocks")} initialOpen={false}>
                            <BackgroundControl
                                controlName={cdBoxsBgConst}
                                noOverlay
                                noMainBgi
                            // noOverlayBgi // if U pass 'noOverlay' prop U don't need to pass 'noOverlayBgi'
                            />
                        </PanelBody>

                        <PanelBody title={__("Padding", "essential-blocks")} initialOpen={false}>
                            <ResponsiveDimensionsControl
                                controlName={cdBoxsPaddingConst}
                                baseLabel="Padding"
                            />
                        </PanelBody>

                        <PanelBody title={__("Border & Shadow")} initialOpen={false}>
                            <BorderShadowControl
                                controlName={cdBoxsBdShadowConst}
                            // noShadow
                            // noBorder
                            />
                        </PanelBody>
                    </PanelBody>
                    <PanelBody title={__("Digits", "essential-blocks")} initialOpen={false}>
                        <ColorControl
                            label={__("Color", "essential-blocks")}
                            color={digitsColor}
                            onChange={(digitsColor) => handleBlockDefault({ digitsColor })}
                        />

                        <TypographyDropdown
                            baseLabel="Typography"
                            typographyPrefixConstant={typoPrefix_digits}
                        />

                        <ResponsiveDimensionsControl
                            controlName={cdDigitsPaddingConst}
                            baseLabel="Padding"
                        />
                    </PanelBody>
                    <PanelBody title={__("Labels", "essential-blocks")} initialOpen={false}>
                        <ColorControl
                            label={__("Color", "essential-blocks")}
                            color={labelsColor}
                            onChange={(labelsColor) => handleBlockDefault({ labelsColor })}
                        />

                        <TypographyDropdown
                            baseLabel="Typography"
                            typographyPrefixConstant={typoPrefix_labels}
                        />
                        <ResponsiveDimensionsControl
                            controlName={cdLabelsPaddingConst}
                            baseLabel="Padding"
                        />
                    </PanelBody>
                    {flexDirection === "row" && (
                        <PanelBody title={__("Separator", "essential-blocks")} initialOpen={false}>
                            <ToggleControl
                                label={__("Show Separator", "essential-blocks")}
                                checked={showSeparator}
                                onChange={() =>
                                    handleBlockDefault({
                                        showSeparator: !showSeparator,
                                    })
                                }
                                __nextHasNoMarginBottom
                            />

                            {showSeparator && (
                                <>
                                    <SelectControl
                                        label={__("Separator Type", "essential-blocks")}
                                        value={separatorType}
                                        options={SEPARATOR_TYPES}
                                        onChange={(separatorType) =>
                                            handleBlockDefault({
                                                separatorType,
                                            })
                                        }
                                        __next40pxDefaultSize
                                        __nextHasNoMarginBottom
                                    />

                                    <ResponsiveRangeController
                                        baseLabel={__("Position Top", "essential-blocks")}
                                        controlName={separatorPosTop}
                                        min={0}
                                        max={900}
                                        step={1}
                                    />

                                    <ResponsiveRangeController
                                        baseLabel={__("Position Right", "essential-blocks")}
                                        controlName={separatorPosRight}
                                        min={0}
                                        max={900}
                                        step={1}
                                    />

                                    <ColorControl
                                        label={__("Color", "essential-blocks")}
                                        color={separatorColor}
                                        onChange={(separatorColor) =>
                                            handleBlockDefault({
                                                separatorColor,
                                            })
                                        }
                                    />

                                    <TypographyDropdown
                                        baseLabel="Typography"
                                        typographyPrefixConstant={typoPrefix_separator}
                                    />
                                </>
                            )}
                        </PanelBody>
                    )}
                    <PanelBody title={__("Individual Box Styling", "essential-blocks")} initialOpen={false}>
                        {showDays && (
                            <SingleBoxControl
                                heading="Days"
                                bgControlName={cdDayBoxBgConst}
                                dgColorAttrString="dayDgColor"
                                lbColorAttrString="dayLbColor"
                                bdColorAttrString="dayBdrColor"
                            />
                        )}
                        {showHours && (
                            <SingleBoxControl
                                heading="Hours"
                                bgControlName={cdHourBoxBgConst}
                                dgColorAttrString="hourDgColor"
                                lbColorAttrString="hourLbColor"
                                bdColorAttrString="hourBdrColor"
                            />
                        )}
                        {showMinutes && (
                            <SingleBoxControl
                                heading="Minutes"
                                bgControlName={cdMinuteBoxBgConst}
                                dgColorAttrString="minuteDgColor"
                                lbColorAttrString="minuteLbColor"
                                bdColorAttrString="minuteBdrColor"
                            />
                        )}
                        {showSeconds && (
                            <SingleBoxControl
                                heading="Seconds"
                                bgControlName={cdSecondBoxBgConst}
                                dgColorAttrString="secondDgColor"
                                lbColorAttrString="secondLbColor"
                                bdColorAttrString="secondBdrColor"
                            />
                        )}
                    </PanelBody>
                    {/* Advanced */}
                    <PanelBody
                        title={__("Wrapper Margin & Padding", "essential-blocks")}
                    // initialOpen={true}
                    >
                        <ResponsiveDimensionsControl
                            controlName={cdWrapMarginConst}
                            baseLabel="Margin"
                        />
                        <ResponsiveDimensionsControl
                            controlName={cdWrapPaddingConst}
                            baseLabel="Padding"
                        />
                    </PanelBody>
                    <PanelBody title={__("Wrapper Background ", "essential-blocks")} initialOpen={false}>
                        <BackgroundControl controlName={WrpBgConst} />
                    </PanelBody>
                    <PanelBody title={__("Wrapper Border & Shadow")} initialOpen={false}>
                        <BorderShadowControl
                            controlName={WrpBdShadowConst}
                        // noShadow
                        // noBorder
                        />
                    </PanelBody>
                </div>
            )}
        </>
    );
}

export default withBlockContext(objAttributes)(Countdown);
