/**
 * WordPress dependencies
 *
 */
import { __ } from "@wordpress/i18n";
import {
    ToggleControl,
    BaseControl,
    ButtonGroup,
    Button,
    SelectControl,
} from "@wordpress/components";
/**
 * Internal dependencies
 *
 */
import {
    WRAPPER_WIDTH,
    WRAPPER_HEIGHT,
    WRAPPER_BACKGROUND,
    WRAPPER_BORDER,
    WRAPPER_MARGIN,
    WRAPPER_PADDING,
    SHAPE_DIVIDER_POSITIONS,
    SHAPE_DIVIDER_BOTTOM,
    SHAPE_DIVIDER_TOP,
    WRAPPER_ALIGN,
    HEIGHT_UNIT_TYPES,
    CONTENT_ALIGNMENT,
} from "./constants";

import {
    ResponsiveRangeController,
    ShapeDividerControl,
    InspectorPanel
} from "@essential-blocks/controls";

const Inspector = ({ attributes, setAttributes }) => {
    const {
        resOption,
        isWrapperWidth,
        shapeDividerPosition,
        useCustomHeight,
        contentAlign,
        align
    } = attributes;

    return (
        <InspectorPanel
            hideTabs={['styles']}
            advancedControlProps={{
                marginPrefix: WRAPPER_MARGIN,
                paddingPrefix: WRAPPER_PADDING,
                backgroundPrefix: WRAPPER_BACKGROUND,
                borderPrefix: WRAPPER_BORDER,
                hasMargin: true
            }}
        >
            <InspectorPanel.General>
                <>
                    <InspectorPanel.PanelBody
                        title={__(
                            "General",
                            "essential-blocks"
                        )}
                        initialOpen={true}
                    >
                        <BaseControl
                            label={__(
                                "Wrapper Width",
                                "essential-blocks"
                            )}
                        >
                            <ButtonGroup id="eb-button-group-alignment">
                                {WRAPPER_ALIGN.map(
                                    (item, index) => (
                                        <Button
                                            key={index}
                                            isPrimary={
                                                align ===
                                                item.value
                                            }
                                            isSecondary={
                                                align !==
                                                item.value
                                            }
                                            onClick={() =>
                                                setAttributes({
                                                    align:
                                                        item.value,
                                                })
                                            }
                                        >
                                            {item.label}
                                        </Button>
                                    )
                                )}
                            </ButtonGroup>
                        </BaseControl>

                        <ResponsiveRangeController
                            baseLabel={__(
                                "Content Width",
                                "essential-blocks"
                            )}
                            controlName={WRAPPER_WIDTH}
                            min={0}
                            max={2560}
                            step={1}
                            noUnits
                        />
                        <ToggleControl
                            label={__(
                                "Use Width In Wrapper",
                                "essential-blocks"
                            )}
                            checked={isWrapperWidth}
                            onChange={() => {
                                setAttributes({
                                    isWrapperWidth: !isWrapperWidth,
                                });
                            }}
                        />
                        <ToggleControl
                            label={__(
                                "Use Custom Height",
                                "essential-blocks"
                            )}
                            checked={useCustomHeight}
                            onChange={() => {
                                setAttributes({
                                    useCustomHeight: !useCustomHeight,
                                });
                            }}
                        />
                        {useCustomHeight && (
                            <>
                                <ResponsiveRangeController
                                    baseLabel={__(
                                        "Height",
                                        "essential-blocks"
                                    )}
                                    controlName={WRAPPER_HEIGHT}
                                    min={0}
                                    max={2560}
                                    step={1}
                                    units={HEIGHT_UNIT_TYPES}
                                />
                                <SelectControl
                                    label={__(
                                        "Content Alignment",
                                        "essential-blocks"
                                    )}
                                    value={contentAlign}
                                    options={CONTENT_ALIGNMENT}
                                    onChange={(selected) =>
                                        setAttributes({
                                            contentAlign: selected,
                                        })
                                    }
                                />
                            </>
                        )}
                    </InspectorPanel.PanelBody>
                    <InspectorPanel.PanelBody
                        title={__(
                            "Shape Divider",
                            "essential-blocks"
                        )}
                        initialOpen={true}
                    >
                        <BaseControl>
                            <ButtonGroup>
                                {SHAPE_DIVIDER_POSITIONS.map(
                                    (item, key) => (
                                        <Button
                                            key={key}
                                            // isLarge
                                            isPrimary={
                                                shapeDividerPosition ===
                                                item.value
                                            }
                                            isSecondary={
                                                shapeDividerPosition !==
                                                item.value
                                            }
                                            onClick={() =>
                                                setAttributes({
                                                    shapeDividerPosition:
                                                        item.value,
                                                })
                                            }
                                        >
                                            {item.label}
                                        </Button>
                                    )
                                )}
                            </ButtonGroup>
                        </BaseControl>
                        {shapeDividerPosition == "top" && (
                            <ShapeDividerControl
                                position="top"
                                controlName={SHAPE_DIVIDER_TOP}
                            />
                        )}
                        {shapeDividerPosition == "bottom" && (
                            <ShapeDividerControl
                                position="bottom"
                                controlName={
                                    SHAPE_DIVIDER_BOTTOM
                                }
                            />
                        )}
                    </InspectorPanel.PanelBody>
                </>
            </InspectorPanel.General>
        </InspectorPanel>
    );
};
export default Inspector;
