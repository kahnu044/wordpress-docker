/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { SelectControl, PanelBody, BaseControl } from "@wordpress/components";

/**
 * External depencencies
 */

import {
    ResponsiveDimensionsControl,
    ResponsiveRangeController,
    // TypographyDropdown,
    BorderShadowControl,
    // ColorControl,
    BackgroundControl,
    // ResetControl,
    ResponsiveSelectController,
    useBlockDefaults,
    withBlockContext
} from "@essential-blocks/controls";

/**
 * Internal depencencies
 */

import {
    CONTENT_WIDTH_OPTIONS,
    ROW_HEIGHTS,
    ROW_OVERFLOWS,
    COLUMNS_ALIGN,
    COLUMNS_ORDER,
    // JUSTIFY_CONTENTS,
} from "@essential-blocks/blocks/row/src/constants";

import {
    rWrapMarginConst,
    rWrapPaddingConst,
} from "@essential-blocks/blocks/row/src/constants/dimensionsNames";

import {
    rMinHConst,
    rMaxWConst,
    rColsGapConst,
    rColsNumber,
    // boxsSpaceConst,
    // separatorPosTop,
    // separatorPosRight,
} from "@essential-blocks/blocks/row/src/constants/rangeNames";

import { WrpBgConst } from "@essential-blocks/blocks/row/src/constants/backgroundsConstants";
import { WrpBdShadowConst } from "@essential-blocks/blocks/row/src/constants/borderShadowConstants";
import {
    rowOverflowPrefix,
    columnsOrderPrefix,
} from "@essential-blocks/blocks/row/src/constants/selectControlPrefixs";

import objAttributes from "@essential-blocks/blocks/row/src/attributes";

function Row(props) {
    const { blockDefaults, setBlockDefaults, name, deviceType, handleBlockDefault } = props;



    const {
        resOption,
        //
        rowWidthName,
        rowHeightName,
        // rowCusWidth,
        // colGap,
        rowAli,
    } = blockDefaults;
    const isDefaultSet = useBlockDefaults(name, blockDefaults, setBlockDefaults, objAttributes)

    return (
        <>
            {isDefaultSet && (
                <div className="eb-panel-control">
                    <PanelBody title={__("Row settings", "essential-blocks")}>
                        <BaseControl label={__("Layout", "essential-blocks")}>
                            <SelectControl
                                // label={__("Design Preset", "essential-blocks")}
                                value={rowWidthName}
                                options={CONTENT_WIDTH_OPTIONS}
                                onChange={(rowWidthName) =>
                                    handleBlockDefault({ rowWidthName })
                                }
                            />
                        </BaseControl>
                        {rowWidthName === "boxed" && (
                            <ResponsiveRangeController
                                noUnits
                                baseLabel={__(
                                    "Max Width (px)",
                                    "essential-blocks"
                                )}
                                controlName={rMaxWConst}
                                min={0}
                                max={1800}
                                step={1}
                            />
                        )}

                        <ResponsiveRangeController
                            noUnits
                            baseLabel={__("Columns Number", "essential-blocks")}
                            controlName={rColsNumber}
                            min={1}
                            max={6}
                            step={1}
                        />

                        <ResponsiveRangeController
                            noUnits
                            baseLabel={__("Columns Gap", "essential-blocks")}
                            controlName={rColsGapConst}
                            min={0}
                            max={100}
                            step={1}
                        />

                        <BaseControl label={__("Height", "essential-blocks")}>
                            <SelectControl
                                // label={__("Design Preset", "essential-blocks")}
                                value={rowHeightName}
                                options={ROW_HEIGHTS}
                                onChange={(rowHeightName) =>
                                    handleBlockDefault({ rowHeightName })
                                }
                            />
                        </BaseControl>
                        {rowHeightName === "minH" && (
                            <ResponsiveRangeController
                                units={[
                                    { label: "px", value: "px" },
                                    { label: "vh", value: "vh" },
                                    { label: "vw", value: "vw" },
                                ]}
                                baseLabel={__(
                                    "Minimum height",
                                    "essential-blocks"
                                )}
                                controlName={rMinHConst}
                                min={0}
                                max={1500}
                                step={1}
                            />
                        )}
                        <BaseControl
                            label={__(
                                "Columns Vertical Align",
                                "essential-blocks"
                            )}
                        >
                            <SelectControl
                                // label={__("Design Preset", "essential-blocks")}
                                value={rowAli}
                                options={COLUMNS_ALIGN}
                                // onChange={(preset) => handleBlockDefault({ preset })}
                                onChange={(rowAli) => {
                                    handleBlockDefault({ rowAli });
                                }}
                            />
                        </BaseControl>

                        <ResponsiveSelectController
                            baseLabel={"Columns Order"}
                            controlName={columnsOrderPrefix}
                            options={COLUMNS_ORDER}
                            resOption={resOption}
                        />

                        <ResponsiveSelectController
                            baseLabel={"Overflow"}
                            controlName={rowOverflowPrefix}
                            options={ROW_OVERFLOWS}
                            resOption={resOption}
                        />
                    </PanelBody>

                    <PanelBody
                        title={__("Wrapper Margin & Padding")}
                        initialOpen={false}
                    >
                        <ResponsiveDimensionsControl
                            controlName={rWrapMarginConst}
                            baseLabel="Margin"
                            disableLeftRight
                        />
                        <ResponsiveDimensionsControl
                            controlName={rWrapPaddingConst}
                            baseLabel="Padding"
                        />
                    </PanelBody>

                    <PanelBody
                        title={__("Wrapper Background ", "essential-blocks")}
                        initialOpen={false}
                    >
                        <BackgroundControl
                            controlName={WrpBgConst}
                        />
                    </PanelBody>

                    <PanelBody
                        title={__("Wrapper Border & Shadow")}
                        initialOpen={false}
                    >
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

export default withBlockContext(objAttributes)(Row);
