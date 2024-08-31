/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
    SelectControl,
    BaseControl,
} from "@wordpress/components";

/**
 * Internal dependencies
 */
import {
    CONTENT_WIDTH_OPTIONS,
    ROW_HEIGHTS,
    ROW_OVERFLOWS,
    COLUMNS_ALIGN,
    COLUMNS_ORDER,
} from "./constants";

//
import {
    ResponsiveRangeController,
    ResponsiveSelectController,
    InspectorPanel
} from "@essential-blocks/controls";

import {
    rWrapMarginConst,
    rWrapPaddingConst,
} from "./constants/dimensionsNames";

import {
    rMinHConst,
    rMaxWConst,
    rColsGapConst,
    rColsNumber,
} from "./constants/rangeNames";

import { WrpBgConst } from "./constants/backgroundsConstants";
import { WrpBdShadowConst } from "./constants/borderShadowConstants";
import { rowOverflowPrefix, columnsOrderPrefix } from "./constants/selectControlPrefixs";

function Inspector(props) {
    const { attributes, setAttributes } = props;
    const {
        resOption,
        rowWidthName,
        rowHeightName,
        rowOverFlow,
        rowAli,
    } = attributes;

    return (
        <InspectorPanel
            hideTabs={['styles']}
            advancedControlProps={{
                marginPrefix: rWrapMarginConst,
                paddingPrefix: rWrapPaddingConst,
                backgroundPrefix: WrpBgConst,
                borderPrefix: WrpBdShadowConst,
                hasMargin: true
            }
            }
        >
            <InspectorPanel.General>
                <InspectorPanel.PanelBody title={__("Row settings", "essential-blocks")} initialOpen={true}>
                    <BaseControl label={__("Layout", "essential-blocks")}>
                        <SelectControl
                            value={rowWidthName}
                            options={CONTENT_WIDTH_OPTIONS}
                            onChange={(rowWidthName) =>
                                setAttributes({ rowWidthName })
                            }
                        />
                    </BaseControl>
                    {rowWidthName === "boxed" && (
                        <ResponsiveRangeController
                            noUnits
                            baseLabel={__("Max Width (px)", "essential-blocks")}
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
                            value={rowHeightName}
                            options={ROW_HEIGHTS}
                            onChange={(rowHeightName) =>
                                setAttributes({ rowHeightName })
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
                            baseLabel={__("Minimum height", "essential-blocks")}
                            controlName={rMinHConst}
                            min={0}
                            max={1500}
                            step={1}
                        />
                    )}
                    <BaseControl
                        label={__("Columns Vertical Align", "essential-blocks")}
                    >
                        <SelectControl
                            // label={__("Design Preset", "essential-blocks")}
                            value={rowAli}
                            options={COLUMNS_ALIGN}
                            onChange={(rowAli) => {
                                setAttributes({ rowAli });
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
                </InspectorPanel.PanelBody>
            </InspectorPanel.General>
        </InspectorPanel >
    );
}

export default Inspector;
