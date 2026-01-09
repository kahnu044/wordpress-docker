/*
 * WordPress Dependencies
 */
import { __ } from "@wordpress/i18n";
import {
    ToggleControl,
    Button,
    ButtonGroup,
    BaseControl,
    __experimentalDivider as Divider,
    SelectControl,
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
                    <BaseControl
                        label={__(
                            "Container Width",
                            "essential-blocks"
                        )}
                    >
                        <ButtonGroup>
                            {CONTAINER_WIDTH.map((item, index) => (
                                <Button
                                    key={index}
                                    isPrimary={containerWidth === item.value}
                                    isSecondary={containerWidth !== item.value}
                                    onClick={() => {
                                        setAttributes({
                                            containerWidth: item.value,
                                        });
                                        handleContainerWidth(item.value);
                                    }}
                                >
                                    {item.label}
                                </Button>
                            ))}
                        </ButtonGroup>
                    </BaseControl>

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

                    <BaseControl
                        label={__(
                            "Content Width",
                            "essential-blocks"
                        )}
                    >
                        <ButtonGroup id="eb-button-group-alignment">
                            {CONTENT_WIDTH_OPTIONS.map(
                                (item, index) => (
                                    <Button
                                        key={index}
                                        isPrimary={
                                            contentWidth ===
                                            item.value
                                        }
                                        isSecondary={
                                            contentWidth !==
                                            item.value
                                        }
                                        onClick={() =>
                                            setAttributes({
                                                contentWidth:
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
