/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
    ToggleControl,
    SelectControl,
    TextControl,
    RangeControl,
    BaseControl,
    __experimentalDivider as Divider,
} from "@wordpress/components";

import objAttributes from "./attributes";

import {
    ColorControl,
    ResponsiveRangeController,
    ResponsiveDimensionsControl,
    TypographyDropdown,
    GradientColorControl,
    InspectorPanel,
    DynamicInputControl,
 } from "@essential-blocks/controls";

import {
    LAYOUT,
    PX_PERCENTAGE,
    PROGRESSBAR_WIDTH,
    PROGRESSBAR_HEIGHT,
    PROGRESSBAR_SIZE,
    STROKE_WIDTH,
    BOX_WIDTH,
    BOX_HEIGHT,
    WRAPPER_MARGIN,
    TITLE_SPACE,
} from "./constants";
import {
    typoPrefix_title,
    typoPrefix_counter,
    typoPrefix_prefix,
} from "./constants/typographyConstants";

const Inspector = ({ attributes, setAttributes }) => {
    const {
        resOption,
        layout,
        title,
        titleTag,
        progress,
        displayProgress,
        animationDuration,
        titleColor,
        counterColor,
        progressColor,
        isProgressGradient,
        progressGradient,
        showInline,
        backgroundColor,
        showStripe,
        stripeAnimation,
        strokeColor,
        prefix,
        suffix,
        prefixColor,
    } = attributes;

    return (
        <>
            <InspectorPanel advancedControlProps={{
                marginPrefix: WRAPPER_MARGIN,
                hasPadding: false,
                hasBorder: false,
                hasBackground: false,
            }}>
                <InspectorPanel.General>
                    <InspectorPanel.PanelBody
                        title={__("Layout", "essential-blocks")}
                        initialOpen={true}
                    >
                        <SelectControl
                            label={__(
                                "Layout",
                                "essential-blocks"
                            )}
                            value={layout}
                            options={LAYOUT}
                            onChange={(newLayout) =>
                                setAttributes({
                                    layout: newLayout,
                                })
                            }
                        />
                        {(layout === "line" ||
                            layout === "line_rainbow") && (
                            <ToggleControl
                                label={__(
                                    "Show Inline",
                                    "essential-blocks"
                                )}
                                checked={showInline}
                                onChange={() => {
                                    setAttributes({
                                        showInline: !showInline,
                                    });
                                }}
                            />
                        )}
                        <Divider />
                        <DynamicInputControl
                            label={__(
                                "Title",
                                "essential-blocks"
                            )}
                            attrName="title"
                            inputValue={title}
                            setAttributes={setAttributes}
                            onChange={(newTitle) =>
                                setAttributes({
                                    title: newTitle,
                                })
                            }
                        />
                        <SelectControl
                            label={__(
                                "Title HTML Tag",
                                "essential-blocks"
                            )}
                            value={titleTag}
                            options={[
                                { label: "H1", value: "h1" },
                                { label: "H2", value: "h2" },
                                { label: "H3", value: "h3" },
                                { label: "H4", value: "h4" },
                                { label: "H5", value: "h5" },
                                { label: "H6", value: "h6" },
                                { label: "div", value: "div" },
                                {
                                    label: "span",
                                    value: "span",
                                },
                                { label: "p", value: "p" },
                            ]}
                            onChange={(newTitleTag) =>
                                setAttributes({
                                    titleTag: newTitleTag,
                                })
                            }
                        />
                        <Divider />
                        <RangeControl
                            label={__(
                                "Counter Value",
                                "essential-blocks"
                            )}
                            value={progress}
                            onChange={(progress) =>
                                setAttributes({ progress })
                            }
                            step={1}
                            min={0}
                            max={100}
                        />
                        <ToggleControl
                            label={__(
                                "Show Counter?",
                                "progress-bar"
                            )}
                            checked={displayProgress}
                            onChange={() => {
                                setAttributes({
                                    displayProgress: !displayProgress,
                                });
                            }}
                        />
                        {(layout === "line" ||
                            layout === "line_rainbow") && (
                            <>
                                <Divider />
                                <ToggleControl
                                    label={__(
                                        "Show Stripe",
                                        "essential-blocks"
                                    )}
                                    checked={showStripe}
                                    onChange={() => {
                                        setAttributes({
                                            showStripe: !showStripe,
                                        });
                                    }}
                                />
                                {showStripe && (
                                    <SelectControl
                                        label={__(
                                            "Stripe Animation",
                                            "essential-blocks"
                                        )}
                                        value={stripeAnimation}
                                        options={[
                                            {
                                                label:
                                                    "Left To Right",
                                                value: "normal",
                                            },
                                            {
                                                label:
                                                    "Right To Left",
                                                value:
                                                    "reverse",
                                            },
                                            {
                                                label:
                                                    "Disabled",
                                                value: "none",
                                            },
                                        ]}
                                        onChange={(
                                            stripeAnimation
                                        ) =>
                                            setAttributes({
                                                stripeAnimation,
                                            })
                                        }
                                    />
                                )}
                            </>
                        )}

                        {(layout === "half_circle" ||
                            layout === "half_circle_fill") && (
                            <>
                                <Divider />
                                <TextControl
                                    label={__(
                                        "Prefix",
                                        "essential-blocks"
                                    )}
                                    value={prefix}
                                    onChange={(newPrefix) =>
                                        setAttributes({
                                            prefix: newPrefix,
                                        })
                                    }
                                />
                                <TextControl
                                    label={__(
                                        "Suffix",
                                        "essential-blocks"
                                    )}
                                    value={suffix}
                                    onChange={(newSuffix) =>
                                        setAttributes({
                                            suffix: newSuffix,
                                        })
                                    }
                                />
                            </>
                        )}
                    </InspectorPanel.PanelBody>
                    <InspectorPanel.PanelBody
                        title={__(
                            "Settings",
                            "essential-blocks"
                        )}
                        initialOpen={false}
                    >
                        {(layout === "line" ||
                            layout === "line_rainbow") && (
                            <>
                                <ResponsiveRangeController
                                    baseLabel={__(
                                        "Width",
                                        "essential-blocks"
                                    )}
                                    controlName={
                                        PROGRESSBAR_WIDTH
                                    }
                                    units={PX_PERCENTAGE}
                                    min={100}
                                    max={1000}
                                    step={1}
                                />
                                <ResponsiveRangeController
                                    baseLabel={__(
                                        "Height",
                                        "essential-blocks"
                                    )}
                                    controlName={
                                        PROGRESSBAR_HEIGHT
                                    }
                                    min={0}
                                    max={100}
                                    step={1}
                                    noUnits
                                />
                            </>
                        )}
                        {(layout === "circle" ||
                            layout === "circle_fill" ||
                            layout === "half_circle" ||
                            layout === "half_circle_fill") && (
                            <>
                                <ResponsiveRangeController
                                    baseLabel={__(
                                        "Size",
                                        "essential-blocks"
                                    )}
                                    controlName={
                                        PROGRESSBAR_SIZE
                                    }
                                    min={50}
                                    max={500}
                                    step={1}
                                    noUnits
                                />
                                <ResponsiveRangeController
                                    baseLabel={__(
                                        "Stroke Width",
                                        "essential-blocks"
                                    )}
                                    controlName={STROKE_WIDTH}
                                    min={0}
                                    max={100}
                                    step={1}
                                    noUnits
                                />
                            </>
                        )}
                        {layout === "box" && (
                            <>
                                <ResponsiveRangeController
                                    baseLabel={__(
                                        "Width",
                                        "essential-blocks"
                                    )}
                                    controlName={BOX_WIDTH}
                                    min={100}
                                    max={500}
                                    step={1}
                                    noUnits
                                />
                                <ResponsiveRangeController
                                    baseLabel={__(
                                        "Height",
                                        "essential-blocks"
                                    )}
                                    controlName={BOX_HEIGHT}
                                    min={100}
                                    max={500}
                                    step={1}
                                    noUnits
                                />

                                <ResponsiveRangeController
                                    baseLabel={__(
                                        "Stroke Width",
                                        "essential-blocks"
                                    )}
                                    controlName={STROKE_WIDTH}
                                    min={0}
                                    max={100}
                                    step={1}
                                    noUnits
                                />
                            </>
                        )}
                        <RangeControl
                            label={__(
                                "Animation Duration",
                                "essential-blocks"
                            )}
                            value={animationDuration}
                            onChange={(newAnimationDuration) =>
                                setAttributes({
                                    animationDuration: newAnimationDuration,
                                })
                            }
                            step={100}
                            min={1000}
                            max={10000}
                        />
                    </InspectorPanel.PanelBody>
                </InspectorPanel.General>
                <InspectorPanel.Style>
                    <InspectorPanel.PanelBody
                        title={__(
                            "General",
                            "essential-blocks"
                        )}
                        initialOpen={true}
                    >
                        {(layout === "line" ||
                            layout === "line_rainbow") && (
                            <>
                                <ColorControl
                                    label={__(
                                        "Background Color",
                                        "essential-blocks"
                                    )}
                                    color={strokeColor}
                                    attributeName={'strokeColor'}
                                />
                                {layout !== "line_rainbow" && (
                                    <>
                                        <BaseControl>
                                            <h3 className="eb-control-title">
                                                {__(
                                                    "Fill Color",
                                                    "essential-blocks"
                                                )}
                                            </h3>
                                        </BaseControl>
                                        <ToggleControl
                                            label={__(
                                                "Show Fill Gradient",
                                                "essential-blocks"
                                            )}
                                            checked={
                                                isProgressGradient
                                            }
                                            onChange={() => {
                                                setAttributes({
                                                    isProgressGradient: !isProgressGradient,
                                                });
                                            }}
                                        />
                                        {isProgressGradient || (
                                            <ColorControl
                                                label={__(
                                                    "Color",
                                                    "essential-blocks"
                                                )}
                                                color={
                                                    progressColor
                                                }
                                                attributeName={'progressColor'}
                                            />
                                        )}
                                        {isProgressGradient && (
                                            <GradientColorControl
                                                label={__(
                                                    "Gradient Color",
                                                    "essential-blocks"
                                                )}
                                                gradientColor={
                                                    progressGradient
                                                }
                                                onChange={(
                                                    progressGradient
                                                ) =>
                                                    setAttributes(
                                                        {
                                                            progressGradient,
                                                        }
                                                    )
                                                }
                                            />
                                        )}
                                    </>
                                )}
                            </>
                        )}
                        {(layout === "circle" ||
                            layout === "circle_fill" ||
                            layout === "half_circle" ||
                            layout === "half_circle_fill") && (
                            <>
                                <ColorControl
                                    label={__(
                                        "Background Color",
                                        "essential-blocks"
                                    )}
                                    color={backgroundColor}
                                    attributeName={'backgroundColor'}
                                />
                                <ColorControl
                                    label={__(
                                        "Fill Color",
                                        "essential-blocks"
                                    )}
                                    color={progressColor}
                                    attributeName={'progressColor'}
                                />

                                <ColorControl
                                    label={__(
                                        "Stroke Color",
                                        "essential-blocks"
                                    )}
                                    color={strokeColor}
                                    attributeName={'strokeColor'}
                                />
                            </>
                        )}
                        {layout === "box" && (
                            <>
                                <ColorControl
                                    label={__(
                                        "Background Color",
                                        "essential-blocks"
                                    )}
                                    color={backgroundColor}
                                    attributeName={'backgroundColor'}
                                />
                                <BaseControl>
                                    <h3 className="eb-control-title">
                                        {__(
                                            "Fill Color",
                                            "essential-blocks"
                                        )}
                                    </h3>
                                </BaseControl>
                                <ToggleControl
                                    label={__(
                                        "Show Fill Gradient",
                                        "essential-blocks"
                                    )}
                                    checked={isProgressGradient}
                                    onChange={() => {
                                        setAttributes({
                                            isProgressGradient: !isProgressGradient,
                                        });
                                    }}
                                />
                                {isProgressGradient || (
                                    <ColorControl
                                        label={__(
                                            "Color",
                                            "essential-blocks"
                                        )}
                                        color={progressColor}
                                        attributeName={'progressColor'}
                                    />
                                )}
                                {isProgressGradient && (
                                    <GradientColorControl
                                        label={__(
                                            "Gradient Color",
                                            "essential-blocks"
                                        )}
                                        gradientColor={
                                            progressGradient
                                        }
                                        onChange={(
                                            progressGradient
                                        ) =>
                                            setAttributes({
                                                progressGradient,
                                            })
                                        }
                                    />
                                )}
                                <ColorControl
                                    label={__(
                                        "Stroke Color",
                                        "essential-blocks"
                                    )}
                                    color={strokeColor}
                                    attributeName={'strokeColor'}
                                />
                            </>
                        )}
                    </InspectorPanel.PanelBody>

                    <InspectorPanel.PanelBody
                        title={__("Title", "essential-blocks")}
                        initialOpen={false}
                    >
                        <TypographyDropdown
                            baseLabel={__(
                                "Typography",
                                "essential-blocks"
                            )}
                            typographyPrefixConstant={
                                typoPrefix_title
                            }
                        />
                        <ColorControl
                            label={__(
                                "Color",
                                "essential-blocks"
                            )}
                            color={titleColor}
                            attributeName={'titleColor'}
                        />
                        <ResponsiveDimensionsControl
                            controlName={TITLE_SPACE}
                            baseLabel={__(
                                "Space",
                                "essential-blocks"
                            )}
                        />
                    </InspectorPanel.PanelBody>
                    <InspectorPanel.PanelBody
                        title={__(
                            "Counter",
                            "essential-blocks"
                        )}
                        initialOpen={false}
                    >
                        <TypographyDropdown
                            baseLabel={__(
                                "Typography",
                                "essential-blocks"
                            )}
                            typographyPrefixConstant={
                                typoPrefix_counter
                            }
                        />
                        <ColorControl
                            label={__(
                                "Color",
                                "essential-blocks"
                            )}
                            color={counterColor}
                            attributeName={'counterColor'}
                        />
                    </InspectorPanel.PanelBody>
                    {(layout === "half_circle" ||
                        layout === "half_circle_fill") && (
                        <>
                            <InspectorPanel.PanelBody
                                title={__(
                                    "Prefix & Suffix",
                                    "progress-bar"
                                )}
                                initialOpen={false}
                            >
                                <TypographyDropdown
                                    baseLabel={__(
                                        "Typography",
                                        "essential-blocks"
                                    )}
                                    typographyPrefixConstant={
                                        typoPrefix_prefix
                                    }
                                />
                                <ColorControl
                                    label={__(
                                        "Color",
                                        "essential-blocks"
                                    )}
                                    color={prefixColor}
                                    attributeName={'prefixColor'}
                                />
                            </InspectorPanel.PanelBody>
                        </>
                    )}
                </InspectorPanel.Style>
            </InspectorPanel>
        </>
        
    );
};

export default Inspector;
