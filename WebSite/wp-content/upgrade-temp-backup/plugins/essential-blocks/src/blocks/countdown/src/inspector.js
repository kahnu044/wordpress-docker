/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
    SelectControl,
    ToggleControl,
    TextControl,
    Button,
    BaseControl,
    ButtonGroup,
    DateTimePicker,
} from "@wordpress/components";
import { applyFilters } from "@wordpress/hooks";

/**
 * Internal dependencies
 */

import SingleBoxControl from "./singleBoxControl";

import {
    TypographyDropdown,
    ResponsiveDimensionsControl,
    ResponsiveRangeController,
    ColorControl,
    BorderShadowControl,
    BackgroundControl,
    InspectorPanel
} from "@essential-blocks/controls";

import objAttributes from "./attributes";

import { typoPrefix_digits, typoPrefix_labels, typoPrefix_separator } from "./constants/typographyPrefixConstants";

import { wrapperWidth, boxsSpaceConst, separatorPosTop, separatorPosRight } from "./constants/rangeNames";

import {
    cdBoxsPaddingConst,
    cdWrapMarginConst,
    cdWrapPaddingConst,
    cdDigitsPaddingConst,
    cdLabelsPaddingConst,
} from "./constants/dimensionsConstants";

import {
    cdBoxsBgConst,
    cdDayBoxBgConst,
    cdHourBoxBgConst,
    cdMinuteBoxBgConst,
    cdSecondBoxBgConst,
    WrpBgConst,
} from "./constants/backgroundsConstants";

import { cdBoxsBdShadowConst, WrpBdShadowConst } from "./constants/borderShadowConstants";

import {
    ALIGN_ITEMS,
    SEPARATOR_TYPES,
    LAYOUT_TYPES,
    JUSTIFY_CONTENTS,
    FLEX_DIRECTIONS,
} from "./constants";
import { useEffect } from "react";

function Inspector({ attributes, setAttributes }) {
    const {
        resOption,

        //  deadline Date timestamp
        endTimeStamp,

        //
        showDays,
        showHours,
        showMinutes,
        showSeconds,

        //
        daysLabel,
        hoursLabel,
        minutesLabel,
        secondsLabel,

        //
        preset,

        //
        flexDirection,

        //
        showSeparator,
        separatorType,
        // sepPositionRight,
        // sepPositionTop,
        separatorColor,

        //
        contentsAlign,

        //
        contentsDirection,

        //
        contentsJustify,

        //
        digitsColor,

        //
        labelsColor,

        // evergreen timer
        isEvergreenTimer,
        evergreenTimerHours,
        evergreenTimerMinutes,
        recurringCountdown,
        restartTime,
        recurringCountdownEnd,
        dayDgColor
    } = attributes;

    const resRequiredProps = {
        setAttributes,
        resOption,
        attributes,
        objAttributes,
    };

    useEffect(() => {
        if (recurringCountdownEnd) {
            return;
        }
        let recurringDefaultDate = new Date();
        recurringDefaultDate.setDate(recurringDefaultDate.getDate() + 7);

        setAttributes({
            recurringCountdownEnd: recurringDefaultDate.getTime(),
        });
    }, []);

    const handleDateChange = (newDate) => {
        const endTimeStamp = new Date(newDate).getTime();
        setAttributes({ endTimeStamp });
    };

    const handleRecurringEndDateChange = (newDate) => {
        const recurringCountdownEnd = new Date(newDate).getTime();
        setAttributes({ recurringCountdownEnd });
    };

    return (
        <InspectorPanel advancedControlProps={{
            marginPrefix: cdWrapMarginConst,
            paddingPrefix: cdWrapPaddingConst,
            backgroundPrefix: WrpBgConst,
            borderPrefix: WrpBdShadowConst,
            hasMargin: true
        }}>
            <InspectorPanel.General>
                <>
                    <InspectorPanel.PanelBody
                        title={__("Countdown Settings", "essential-blocks")}
                        initialOpen={true}
                    >
                        <ToggleControl
                            label={__("Evergreen Timer?", "essential-blocks")}
                            checked={isEvergreenTimer}
                            onChange={() =>
                                setAttributes({
                                    isEvergreenTimer: !isEvergreenTimer,
                                })
                            }
                        />
                        {!isEvergreenTimer && (
                            <>
                                <style>{`.customDatePickerStyle .components-datetime__timezone{display:none;}`}</style>
                                <BaseControl
                                    label={__("Countdown Due Date", "essential-blocks")}
                                    className="customDatePickerStyle"
                                >
                                    <DateTimePicker
                                        currentDate={endTimeStamp ? new Date(endTimeStamp) : new Date()}
                                        onChange={(newDate) => handleDateChange(newDate)}
                                        is12Hour={true}
                                    />
                                </BaseControl>
                            </>
                        )}
                        {isEvergreenTimer && (
                            <>
                                <TextControl
                                    label={__("Hours", "essential-blocks")}
                                    value={evergreenTimerHours}
                                    type="number"
                                    onChange={(evergreenTimerHours) =>
                                        setAttributes({
                                            evergreenTimerHours,
                                        })
                                    }
                                />
                                <TextControl
                                    label={__("Minutes", "essential-blocks")}
                                    value={evergreenTimerMinutes}
                                    type="text"
                                    onChange={(evergreenTimerMinutes) =>
                                        setAttributes({
                                            evergreenTimerMinutes,
                                        })
                                    }
                                />
                                <ToggleControl
                                    label={__("Recurring Countdown", "essential-blocks")}
                                    checked={recurringCountdown}
                                    onChange={() =>
                                        setAttributes({
                                            recurringCountdown: !recurringCountdown,
                                        })
                                    }
                                    help={__(
                                        "Specify how much time it will take to restart the countdown. If you set 0, the countdown will restart immediately.",
                                        "essential-blocks"
                                    )}
                                />
                                {recurringCountdown && (
                                    <>
                                        <TextControl
                                            label={__("Restart After(In Hours)", "essential-blocks")}
                                            value={restartTime}
                                            type="text"
                                            onChange={(restartTime) =>
                                                setAttributes({
                                                    restartTime,
                                                })
                                            }
                                        />
                                        <style>{`.customDatePickerStyle .components-datetime__timezone{display:none;}`}</style>
                                        <BaseControl
                                            label={__(
                                                "Recurring Countdown End Date",
                                                "essential-blocks"
                                            )}
                                            className="customDatePickerStyle"
                                        >
                                            <DateTimePicker
                                                currentDate={
                                                    recurringCountdownEnd
                                                        ? new Date(recurringCountdownEnd)
                                                        : recurringDefaultDate
                                                }
                                                onChange={(newDate) =>
                                                    handleRecurringEndDateChange(newDate)
                                                }
                                                is12Hour={true}
                                            />
                                        </BaseControl>
                                    </>
                                )}
                            </>
                        )}
                    </InspectorPanel.PanelBody>

                    <InspectorPanel.PanelBody title={__("Content Settings", "essential-blocks")} initialOpen={false}>
                        <ToggleControl
                            label={__("Display Days", "essential-blocks")}
                            checked={showDays}
                            onChange={() =>
                                setAttributes({
                                    showDays: !showDays,
                                })
                            }
                        />

                        {showDays && (
                            <>
                                <TextControl
                                    label={__("Custom Label For Days", "essential-blocks")}
                                    value={daysLabel}
                                    type="text"
                                    onChange={(daysLabel) =>
                                        setAttributes({
                                            daysLabel,
                                        })
                                    }
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
                            onChange={() =>
                                setAttributes({
                                    showHours: !showHours,
                                })
                            }
                        />

                        {showHours && (
                            <>
                                <TextControl
                                    label={__("Custom Label For Hours", "essential-blocks")}
                                    value={hoursLabel}
                                    type="text"
                                    onChange={(hoursLabel) =>
                                        setAttributes({
                                            hoursLabel,
                                        })
                                    }
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
                                setAttributes({
                                    showMinutes: !showMinutes,
                                })
                            }
                        />

                        {showMinutes && (
                            <>
                                <TextControl
                                    label={__("Custom Label For Minutes", "essential-blocks")}
                                    value={minutesLabel}
                                    type="text"
                                    onChange={(minutesLabel) =>
                                        setAttributes({
                                            minutesLabel,
                                        })
                                    }
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
                                setAttributes({
                                    showSeconds: !showSeconds,
                                })
                            }
                        />

                        {showSeconds && (
                            <>
                                <TextControl
                                    label={__("Custom Label For Seconds", "essential-blocks")}
                                    value={secondsLabel}
                                    type="text"
                                    onChange={(secondsLabel) =>
                                        setAttributes({
                                            secondsLabel,
                                        })
                                    }
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
                    </InspectorPanel.PanelBody>
                </>
            </InspectorPanel.General>
            <InspectorPanel.Style>
                <>
                    <InspectorPanel.PanelBody title={__("Boxes Styles", "essential-blocks")} initialOpen={true}>
                        <BaseControl label={__("Layout", "essential-blocks")}>
                            <ButtonGroup>
                                {LAYOUT_TYPES.map(({ value, label }, index) => (
                                    <Button
                                        key={index}
                                        isSecondary={flexDirection !== value}
                                        isPrimary={flexDirection === value}
                                        onClick={() =>
                                            setAttributes({
                                                flexDirection: value,
                                            })
                                        }
                                    >
                                        {label}
                                    </Button>
                                ))}
                            </ButtonGroup>
                        </BaseControl>

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

                        <BaseControl label={__("Contents Direction", "essential-blocks")}>
                            <SelectControl
                                value={contentsDirection}
                                options={FLEX_DIRECTIONS}
                                onChange={(contentsDirection) =>
                                    setAttributes({
                                        contentsDirection,
                                    })
                                }
                            />
                        </BaseControl>

                        {contentsDirection.includes("row") && (
                            <>
                                <BaseControl
                                    label={__("Contents Justify Position", "essential-blocks")}
                                >
                                    <SelectControl
                                        value={contentsJustify}
                                        options={JUSTIFY_CONTENTS}
                                        onChange={(contentsJustify) =>
                                            setAttributes({
                                                contentsJustify,
                                            })
                                        }
                                    />
                                </BaseControl>
                            </>
                        )}

                        <BaseControl label={__("Contents Alignment", "essential-blocks")}>
                            <ButtonGroup>
                                {ALIGN_ITEMS.map(({ value, label }, index) => (
                                    <Button
                                        key={index}
                                        isSecondary={contentsAlign !== value}
                                        isPrimary={contentsAlign === value}
                                        onClick={() =>
                                            setAttributes({
                                                contentsAlign: value,
                                            })
                                        }
                                    >
                                        {label}
                                    </Button>
                                ))}
                            </ButtonGroup>
                        </BaseControl>

                        <InspectorPanel.PanelBody title={__("Background", "essential-blocks")} initialOpen={false}>
                            <BackgroundControl
                                controlName={cdBoxsBgConst}
                                noOverlay
                                noMainBgi
                            // noOverlayBgi // if U pass 'noOverlay' prop U don't need to pass 'noOverlayBgi'
                            />
                        </InspectorPanel.PanelBody>

                        <InspectorPanel.PanelBody title={__("Padding", "essential-blocks")} initialOpen={false}>
                            <ResponsiveDimensionsControl
                                controlName={cdBoxsPaddingConst}
                                baseLabel="Padding"
                            />
                        </InspectorPanel.PanelBody>
                        <InspectorPanel.PanelBody title={__("Border & Shadow")} initialOpen={false}>
                            <BorderShadowControl
                                controlName={cdBoxsBdShadowConst}
                            // noShadow
                            // noBorder
                            />
                        </InspectorPanel.PanelBody>
                    </InspectorPanel.PanelBody>

                    <InspectorPanel.PanelBody title={__("Digits", "essential-blocks")} initialOpen={false}>
                        <ColorControl
                            label={__("Color", "essential-blocks")}
                            color={digitsColor}
                            attributeName={'digitsColor'}
                        />

                        <TypographyDropdown
                            baseLabel="Typography"
                            typographyPrefixConstant={typoPrefix_digits}
                        />

                        <ResponsiveDimensionsControl
                            controlName={cdDigitsPaddingConst}
                            baseLabel="Padding"
                        />
                    </InspectorPanel.PanelBody>

                    <InspectorPanel.PanelBody title={__("Labels", "essential-blocks")} initialOpen={false}>
                        <ColorControl
                            label={__("Color", "essential-blocks")}
                            color={labelsColor}
                            attributeName={'labelsColor'}
                        />

                        {applyFilters(
                            "eb_countdown_label_bg",
                            '',
                            attributes,
                            setAttributes
                        )}

                        <TypographyDropdown
                            baseLabel="Typography"
                            typographyPrefixConstant={typoPrefix_labels}
                        />
                        <ResponsiveDimensionsControl
                            controlName={cdLabelsPaddingConst}
                            baseLabel="Padding"
                        />
                    </InspectorPanel.PanelBody>

                    {flexDirection === "row" && (
                        <InspectorPanel.PanelBody title={__("Separator", "essential-blocks")} initialOpen={false}>
                            <ToggleControl
                                label={__("Show Separator", "essential-blocks")}
                                checked={showSeparator}
                                onChange={() =>
                                    setAttributes({
                                        showSeparator: !showSeparator,
                                    })
                                }
                            />

                            {showSeparator && (
                                <>
                                    <SelectControl
                                        label={__("Separator Type", "essential-blocks")}
                                        value={separatorType}
                                        options={SEPARATOR_TYPES}
                                        onChange={(separatorType) =>
                                            setAttributes({
                                                separatorType,
                                            })
                                        }
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
                                        attributeName={'separatorColor'}
                                    />

                                    <TypographyDropdown
                                        baseLabel="Typography"
                                        typographyPrefixConstant={typoPrefix_separator}
                                    />
                                </>
                            )}
                        </InspectorPanel.PanelBody>
                    )}

                    <InspectorPanel.PanelBody
                        title={__("Individual Box Styling", "essential-blocks")}
                        initialOpen={false}
                    >
                        {showDays && (
                            <SingleBoxControl
                                resRequiredProps={resRequiredProps}
                                heading="Days"
                                bgControlName={cdDayBoxBgConst}
                                dayDgColor="dayDgColor"
                                dayLbColor="dayLbColor"
                                dayBdrColor="dayBdrColor"
                            />
                        )}
                        {showHours && (
                            <SingleBoxControl
                                resRequiredProps={resRequiredProps}
                                heading="Hours"
                                bgControlName={cdHourBoxBgConst}
                                dgColorAttrString="hourDgColor"
                                lbColorAttrString="hourLbColor"
                                bdColorAttrString="hourBdrColor"
                            />
                        )}
                        {showMinutes && (
                            <SingleBoxControl
                                resRequiredProps={resRequiredProps}
                                heading="Minutes"
                                bgControlName={cdMinuteBoxBgConst}
                                dgColorAttrString="minuteDgColor"
                                lbColorAttrString="minuteLbColor"
                                bdColorAttrString="minuteBdrColor"
                            />
                        )}
                        {showSeconds && (
                            <SingleBoxControl
                                resRequiredProps={resRequiredProps}
                                heading="Seconds"
                                bgControlName={cdSecondBoxBgConst}
                                dgColorAttrString="secondDgColor"
                                lbColorAttrString="secondLbColor"
                                bdColorAttrString="secondBdrColor"
                            />
                        )}
                    </InspectorPanel.PanelBody>
                </>
            </InspectorPanel.Style>
        </InspectorPanel>
    );
}
export default Inspector;
