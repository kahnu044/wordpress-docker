/*
 * WordPress Dependencies
 */
import { __ } from "@wordpress/i18n";
import {
    ToggleControl,
    BaseControl,
    __experimentalDivider as Divider,
    SelectControl,
    __experimentalToggleGroupControl as ToggleGroupControl,
    __experimentalToggleGroupControlOption as ToggleGroupControlOption,
    TextControl
} from "@wordpress/components";


/*
 * Internal Dependencies
 */
import {
    CONTAINER_CUSTOM_WIDTH,
    FLEX_DIRECTIONS,
    FLEX_WRAPS,
    FLEX_ROW_GAP,
    FLEX_COLUMN_GAP,
    WRAPPER_BACKGROUND,
    WRAPPER_BORDER,
    WRAPPER_MARGIN,
    WRAPPER_PADDING,
    FLEX_DIRECTION_CONTROL,
    JUSTIFY_CONTENT_CONTROL,
    ALIGN_ITEM_CONTROL,
    FLEX_WRAP_CONTROL,
    UNIT_TYPES,
    HTML_TAGS,
    OVERFLOW,
    CONTENT_WIDTH_OPTIONS,
    CONTAINER_WIDTH,
    CONTENT_WIDTH,
    CONTENT_HEIGHT,
    INHERIT_THEME_OPTIONS,
    getJustifyContentsOptions,
    getAlignItemsOptions,
} from "./constants";

import {
    InspectorPanel,
    ResponsiveAlignControl,
    ResponsiveRangeController,
    withBlockContext,
} from "@essential-blocks/controls";

const Inspector = ({ attributes, setAttributes }) => {
    const {
        resOption,
        containerWidth,
        isContainerCustomWidth,
        contentWidth,
        inheritTheme,
        adminWidthVar,
        frontMaxWidthVar,
        frontWidthVar,
        htmlTag,
        overflow,
        flexDirection,
        TABflexDirection,
        MOBflexDirection,
    } = attributes;

    // Get current flex direction based on responsive mode
    const getCurrentFlexDirection = () => {
        if (resOption === "Mobile" && MOBflexDirection) {
            return MOBflexDirection;
        }
        if (resOption === "Tablet" && TABflexDirection) {
            return TABflexDirection;
        }
        return flexDirection || "row";
    };

    const currentFlexDirection = getCurrentFlexDirection();

    // Get dynamic icon sets based on flex direction
    const justifyContentsOptions = getJustifyContentsOptions(currentFlexDirection);
    const alignItemsOptions = getAlignItemsOptions(currentFlexDirection);

    const handleContainerWidth = (value) => {
        if (value === "custom") {
            setAttributes({
                align: undefined,
                isContainerCustomWidth: true,
                containerWidth: "custom",
            });
        } else {
            setAttributes({
                align: value,
                isContainerCustomWidth: false,
                containerWidth: value,
            });
        }
    };

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
                <InspectorPanel.PanelBody
                    title={__(
                        "Container",
                        "essential-blocks"
                    )}
                    initialOpen={true}
                >
                    <ToggleGroupControl
                        label={__(
                            "Container Width",
                            "essential-blocks"
                        )}

                        value={containerWidth}
                        onChange={(value) => {
                            setAttributes({
                                containerWidth: value,
                            });
                            handleContainerWidth(value);
                        }}
                        isBlock
                        __next40pxDefaultSize
                        __nextHasNoMarginBottom
                    >
                        {CONTAINER_WIDTH.map((item, index) => (
                            <ToggleGroupControlOption
                                key={index}
                                value={item.value}
                                label={item.label}
                            />
                        ))}
                    </ToggleGroupControl>

                    {isContainerCustomWidth && (
                        <ResponsiveRangeController
                            baseLabel={__(
                                "Container Width",
                                "essential-blocks"
                            )}
                            controlName={CONTAINER_CUSTOM_WIDTH}
                            units={[
                                { label: "px", value: "px" },
                                { label: "%", value: "%" },
                                { label: "vw", value: "vw" },
                            ]}
                            min={1}
                            max={1500}
                            step={1}
                        />
                    )}

                    <ToggleGroupControl
                        label={__(
                            "Content Width",
                            "essential-blocks"
                        )}

                        value={contentWidth}
                        onChange={(value) =>
                            setAttributes({
                                contentWidth: value,
                            })
                        }
                        isBlock
                        __next40pxDefaultSize
                        __nextHasNoMarginBottom
                    >
                        {CONTENT_WIDTH_OPTIONS.map(
                            (item, index) => (
                                <ToggleGroupControlOption
                                    key={index}
                                    value={item.value}
                                    label={item.label}
                                />
                            )
                        )}
                    </ToggleGroupControl>

                    {contentWidth === "boxed" && (
                        <>
                            <ResponsiveRangeController
                                baseLabel={__(
                                    "Content Width",
                                    "essential-blocks"
                                )}
                                controlName={CONTENT_WIDTH}
                                units={[
                                    { label: "px", value: "px" },
                                    { label: "%", value: "%" },
                                    { label: "vw", value: "vw" },
                                ]}
                                min={1}
                                max={1500}
                                step={1}
                            />
                        </>
                    )}

                    {contentWidth === "variable" && (
                        <>
                            <SelectControl
                                label={__(
                                    "Inherit from",
                                    "essential-blocks"
                                )}
                                value={inheritTheme}
                                options={INHERIT_THEME_OPTIONS}
                                onChange={(value) =>
                                    setAttributes({
                                        inheritTheme: value,
                                    })
                                }
                            />
                            {inheritTheme === "" && (
                                <>
                                    <TextControl
                                        label={__(
                                            "Admin Container width",
                                            "essential-blocks"
                                        )}
                                        value={adminWidthVar}
                                        help={__(
                                            "If your theme uses css variables for container width, you can place here css names of these variables",
                                            "essential-blocks"
                                        )}
                                        onChange={(value) =>
                                            setAttributes({
                                                adminWidthVar: value,
                                            })
                                        }
                                    />
                                    <TextControl
                                        label={__(
                                            "Frontend Container Max width",
                                            "essential-blocks"
                                        )}
                                        value={frontMaxWidthVar}
                                        onChange={(value) =>
                                            setAttributes({
                                                frontMaxWidthVar: value,
                                            })
                                        }
                                    />
                                    <TextControl
                                        label={__(
                                            "Frontend Container width",
                                            "essential-blocks"
                                        )}
                                        value={frontWidthVar}
                                        help={__(
                                            "Optional",
                                            "essential-blocks"
                                        )}
                                        onChange={(value) =>
                                            setAttributes({
                                                frontWidthVar: value,
                                            })
                                        }
                                    />
                                </>
                            )}
                        </>
                    )}

                    <ResponsiveRangeController
                        baseLabel={__(
                            "Min Height",
                            "essential-blocks"
                        )}
                        controlName={CONTENT_HEIGHT}
                        units={[
                            { label: "px", value: "px" },
                            { label: "vh", value: "vh" },
                            { label: "em", value: "em" },
                        ]}
                        min={1}
                        max={1000}
                        step={1}
                    />

                    <Divider />
                    <SelectControl
                        label={__(
                            "HTML Tag",
                            "essential-blocks"
                        )}
                        value={htmlTag}
                        options={HTML_TAGS}
                        onChange={(newHtmlTag) =>
                            setAttributes({
                                htmlTag: newHtmlTag,
                            })
                        }
                        __next40pxDefaultSize
                        __nextHasNoMarginBottom
                    />

                    {/* overflow */}
                    <SelectControl
                        label={__(
                            "Overflow",
                            "essential-blocks"
                        )}
                        value={overflow}
                        options={OVERFLOW}
                        onChange={(newOverflow) =>
                            setAttributes({
                                overflow: newOverflow,
                            })
                        }
                        __next40pxDefaultSize
                        __nextHasNoMarginBottom
                    />

                </InspectorPanel.PanelBody>

                <InspectorPanel.PanelBody
                    title={__(
                        "Layouts",
                        "essential-blocks"
                    )}
                    initialOpen={true}
                >
                    <ResponsiveAlignControl
                        className="flex-container-control"
                        baseLabel={__(
                            "Flex Direction",
                            "essential-blocks"
                        )}
                        controlName={FLEX_DIRECTION_CONTROL}
                        options={FLEX_DIRECTIONS}
                        resOption={resOption}
                    />

                    <ResponsiveAlignControl
                        className={`flex-container-control`}
                        baseLabel={__(
                            "Justify Content",
                            "essential-blocks"
                        )}
                        controlName={JUSTIFY_CONTENT_CONTROL}
                        options={justifyContentsOptions}
                        resOption={resOption}
                    />

                    <ResponsiveAlignControl
                        className="flex-container-control"
                        baseLabel={__(
                            "Align Items",
                            "essential-blocks"
                        )}
                        controlName={ALIGN_ITEM_CONTROL}
                        options={alignItemsOptions}
                        resOption={resOption}
                    />

                    <ResponsiveAlignControl
                        className="flex-container-control"
                        baseLabel={__(
                            "Flex Wrap",
                            "essential-blocks"
                        )}
                        controlName={FLEX_WRAP_CONTROL}
                        options={FLEX_WRAPS}
                        resOption={resOption}
                    />

                    <p className="eb-flex-container-note">
                        {__(
                            "Note: Items within the container can stay in a single line (No Wrap) or break into multiple lines (Wrap).",
                            "essential-blocks"
                        )}
                    </p>

                    <Divider />
                    <ResponsiveRangeController
                        baseLabel={__(
                            "Column Gap",
                            "essential-blocks"
                        )}
                        controlName={FLEX_COLUMN_GAP}
                        units={UNIT_TYPES}
                        min={0}
                        max={500}
                        step={1}
                    />
                    <ResponsiveRangeController
                        baseLabel={__(
                            "Row Gap",
                            "essential-blocks"
                        )}
                        controlName={FLEX_ROW_GAP}
                        units={UNIT_TYPES}
                        min={0}
                        max={500}
                        step={1}
                    />
                </InspectorPanel.PanelBody>
            </InspectorPanel.General>
        </InspectorPanel >
    );
};

export default Inspector;
