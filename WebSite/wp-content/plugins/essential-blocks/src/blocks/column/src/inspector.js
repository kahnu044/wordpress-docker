/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
    SelectControl,
    RangeControl,
    BaseControl,
} from "@wordpress/components";
import { useEffect } from "@wordpress/element";
import { select, dispatch } from "@wordpress/data";

/**
 * Internal dependencies
 */

import objAttributes from "./attributes";

import {
    WithResponsiveOptions,
    ResponsiveSelectController,
    ResponsiveRangeController,
    InspectorPanel
} from "@essential-blocks/controls";

import { COLUMNS_ALIGN, ROW_OVERFLOWS } from "./constants";

import {
    wrapperWidth,
    columnOrderPrefix,
} from "./constants/rangeNames";

import {
    cWrapMarginConst,
    cWrapPaddingConst,
} from "./constants/dimensionsNames";

import { WrpBgConst } from "./constants/backgroundsConstants";
import { WrpBdShadowConst } from "./constants/borderShadowConstants";
import { rowOverflowPrefix } from "./constants/selectControlPrefixs";

function Inspector(props) {
    const {
        attributes,
        setAttributes,
        clientId,
        initColWidth,
        initNextColWidth,
        initPrevColWidth,
        nextBlockClientId,
        prevBlockClientId,
        setInitColWidth,
        setInitNextColWidth,
        setInitPrevColWidth,
    } = props;
    const {
        resOption,
        blockId,
        [`${wrapperWidth}Range`]: desktopRange,
        [`TAB${wrapperWidth}Range`]: TABrange,
        [`MOB${wrapperWidth}Range`]: MOBrange,
        colAli,
    } = attributes;

    useEffect(() => {
        const nearestRow = select("core/block-editor").getBlock(
            select("core/block-editor").getBlockParents(clientId).slice(-1)[0]
        );

        const allSiblingsCol = nearestRow.innerBlocks;

        const totalWidth = allSiblingsCol.reduce(
            (total, curr) => {
                return {
                    attributes: {
                        cw_Range: total.attributes.cw_Range + curr.attributes.cw_Range,
                    },
                };
            },
            { attributes: { cw_Range: 0 } }
        ).attributes.cw_Range;

        if (totalWidth !== 100) {
            const widestCol = {
                ...allSiblingsCol.reduce(
                    (total, curr) => {
                        if (total.attributes.cw_Range < curr.attributes.cw_Range) {
                            return curr;
                        } else {
                            return total;
                        }
                    },
                    { attributes: { cw_Range: 0 } }
                ),
            };

            const widestColClientId = widestCol.clientId;
            const updatedWidth =
                Math.round((widestCol.attributes.cw_Range + 100 - totalWidth) * 100) /
                100;

            if (widestColClientId === clientId) {
                setAttributes({
                    cw_Range: updatedWidth,
                });
                setInitColWidth(updatedWidth);
            } else {
                dispatch("core/block-editor").updateBlockAttributes(widestColClientId, {
                    cw_Range: updatedWidth,
                });
                if (widestColClientId === nextBlockClientId) {
                    setInitNextColWidth(updatedWidth);
                } else if (widestColClientId === prevBlockClientId) {
                    setInitPrevColWidth(updatedWidth);
                }
            }
        }
        //

        return () => {
            const InnerBlocksCount = select("core/block-editor").getBlock(clientId)?.innerBlocks.length;
            if (InnerBlocksCount > 0) return false;
        };
    }, []);

    return (
        <InspectorPanel advancedControlProps={{
            marginPrefix: cWrapMarginConst,
            paddingPrefix: cWrapPaddingConst,
            backgroundPrefix: WrpBgConst,
            borderPrefix: WrpBdShadowConst,
            hasMargin: true
        }}>
            <InspectorPanel.General>
                <InspectorPanel.PanelBody title={__("General", "essential-blocks")} initialOpen={true}>
                    <div
                        className={`responsiveRangeControllerWrapper rrcwrap-${blockId}`}
                    >
                        <>
                            {resOption == "Desktop" && (
                                <>
                                    <WithResponsiveOptions
                                        noUnits={true}
                                        label={__("Column Width (%)", "essential-blocks")}
                                        controlName={wrapperWidth}
                                    >
                                        <RangeControl
                                            value={desktopRange}
                                            onChange={(value) => {
                                                const diff = value - initColWidth;
                                                const newNextColWidth =
                                                    initNextColWidth - diff;
                                                const newPrevColWidth =
                                                    initPrevColWidth - diff;

                                                if (
                                                    nextBlockClientId &&
                                                    (value < attributes.cw_Range ||
                                                        newNextColWidth > 3)
                                                ) {
                                                    dispatch(
                                                        "core/block-editor"
                                                    ).updateBlockAttributes(nextBlockClientId, {
                                                        cw_Range: newNextColWidth,
                                                    });

                                                    setAttributes({
                                                        [`${wrapperWidth}Range`]: value,
                                                    });
                                                } else if (
                                                    !nextBlockClientId &&
                                                    prevBlockClientId &&
                                                    (value < attributes.cw_Range ||
                                                        newPrevColWidth > 3)
                                                ) {
                                                    dispatch(
                                                        "core/block-editor"
                                                    ).updateBlockAttributes(prevBlockClientId, {
                                                        cw_Range: newPrevColWidth,
                                                    });

                                                    setAttributes({
                                                        [`${wrapperWidth}Range`]: value,
                                                    });
                                                }
                                            }}
                                            step={0.1}
                                            min={1}
                                            max={100}
                                        />
                                    </WithResponsiveOptions>
                                </>
                            )}
                            {resOption == "Tablet" && (
                                <WithResponsiveOptions
                                    noUnits={true}
                                    label={__("Column Width (%)","essential-blocks")}
                                    controlName={wrapperWidth}
                                >
                                    <RangeControl
                                        value={TABrange}
                                        onChange={(TABrange) =>
                                            setAttributes({
                                                [`TAB${wrapperWidth}Range`]: TABrange,
                                            })
                                        }
                                        step={0.1}
                                        min={1}
                                        max={100}
                                    />
                                </WithResponsiveOptions>
                            )}
                            {resOption == "Mobile" && (
                                <WithResponsiveOptions
                                    noUnits={true}
                                    label={__("Column Width (%)","essential-blocks")}
                                    controlName={wrapperWidth}
                                >
                                    <RangeControl
                                        value={MOBrange}
                                        onChange={(MOBrange) =>
                                            setAttributes({
                                                [`MOB${wrapperWidth}Range`]: MOBrange,
                                            })
                                        }
                                        step={0.1}
                                        min={1}
                                        max={100}
                                    />
                                </WithResponsiveOptions>
                            )}
                        </>
                    </div>

                    <BaseControl
                        label={__("Vertical Align", "essential-blocks")}
                    >
                        <SelectControl
                            // label={__("Design Preset", "essential-blocks")}
                            value={colAli}
                            options={COLUMNS_ALIGN}
                            // onChange={(preset) => setAttributes({ preset })}
                            onChange={(colAli) => {
                                setAttributes({ colAli });
                            }}
                        />
                    </BaseControl>

                    <ResponsiveRangeController
                        noUnits
                        baseLabel={__("Column Order", "essential-blocks")}
                        controlName={columnOrderPrefix}
                        min={0}
                        max={6}
                        step={1}
                    />
                    {/* <PanelRow>{'Please Select "Custom Order" from "Row Block Controls -> Columns Order" to make this work'}  </PanelRow> */}

                    <ResponsiveSelectController
                        baseLabel={__("Overflow","essential-blocks")}
                        controlName={rowOverflowPrefix}
                        options={ROW_OVERFLOWS}
                        resOption={resOption}
                    />
                </InspectorPanel.PanelBody>
            </InspectorPanel.General>
        </InspectorPanel>
    );
}

export default Inspector;
