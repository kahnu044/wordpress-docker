/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { PanelBody, PanelRow, ToggleControl, RangeControl, __experimentalToggleGroupControl as ToggleGroupControl, __experimentalToggleGroupControlOption as ToggleGroupControlOption } from "@wordpress/components";

/**
 * Internal dependencies
 */
import {
    WRAPPER_BG,
    WRAPPER_MARGIN,
    WRAPPER_PADDING,
    WRAPPER_BORDER_SHADOW,
    TITLE_MARGIN,
    BUTTON_MARGIN,
    BUTTON_PADDING,
    BUTTON_BORDER_SHADOW,
    CUSTOM_HEIGHT,
    SLIDES_GAP,
    CONTENTS_PADDING,
    SLIDE_BORDER_RADIUS,
    NORMAL_HOVER,
    HORIZONTAL_ALIGN,
    VERTICAL_ALIGN,
    UNIT_TYPES,
    GAP_UNIT_TYPES,
    COLORS,
} from "@essential-blocks/blocks/parallax-slider/src/constants/constants";
import {
    TITLE_TYPOGRAPHY,
    BUTTON_TYPOGRAPHY,
} from "@essential-blocks/blocks/parallax-slider/src/constants/typography-constant";

import objAttributes from "@essential-blocks/blocks/parallax-slider/src/attributes";

import {
    ResponsiveDimensionsControl,
    TypographyDropdown,
    BorderShadowControl,
    ResponsiveRangeController,
    BackgroundControl,
    ColorControl,
    useBlockDefaults,
    withBlockContext
} from "@essential-blocks/controls";

function ParallaxSlider(props) {
    const { blockDefaults, setBlockDefaults, name, deviceType, handleBlockDefault } = props;
    const {
        intensity,
        isCustomHeight,
        titleColor,
        titleBackgroundColor,
        buttonColorType,
        buttonColor,
        buttonHoverColor,
        buttonBackgroundColor,
        buttonHoverBackgroundColor,
        horizontalAlign,
        verticalAlign,
    } = blockDefaults;
    const isDefaultSet = useBlockDefaults(name, blockDefaults, setBlockDefaults, objAttributes)

    return (
        <>
            {isDefaultSet && (
                <div className="eb-panel-control">
                    <PanelBody title={__("General", "essential-blocks")}>
                        <RangeControl
                            label={__("Parallax Softness", "essential-blocks")}
                            value={intensity}
                            allowReset
                            onChange={(intensity) => handleBlockDefault({ intensity })}
                            min={0}
                            max={100}
                            __nextHasNoMarginBottom
                            __next40pxDefaultSize
                        />
                        <ToggleControl
                            label={__("Custom Height", "essential-blocks")}
                            checked={isCustomHeight}
                            onChange={() =>
                                handleBlockDefault({
                                    isCustomHeight: !isCustomHeight,
                                })
                            }
                            __nextHasNoMarginBottom
                        />

                        {isCustomHeight && (
                            <ResponsiveRangeController
                                baseLabel={__("Slider Size", "essential-blocks")}
                                controlName={CUSTOM_HEIGHT}
                                units={UNIT_TYPES}
                                min={1}
                                max={500}
                                step={1}
                            />
                        )}

                        <ResponsiveRangeController
                            baseLabel={__("Slides Gap", "essential-blocks")}
                            controlName={SLIDES_GAP}
                            units={GAP_UNIT_TYPES}
                            min={0}
                            max={200}
                            step={1}
                        />
                    </PanelBody>
                    <PanelBody title={__("Slides Style", "essential-blocks")} initialOpen={true}>
                        <ToggleGroupControl
                            label="Content Horizontal Align"

                            value={horizontalAlign}
                            onChange={(value) => handleBlockDefault({ horizontalAlign: value })}
                            isBlock
                            __next40pxDefaultSize
                            __nextHasNoMarginBottom
                        >
                            {HORIZONTAL_ALIGN.map((item, index) => (
                                <ToggleGroupControlOption
                                    key={index}
                                    value={item.value}
                                    label={item.label}
                                />
                            ))}
                        </ToggleGroupControl>

                        <ToggleGroupControl
                            label="Content Vertical Align"

                            value={verticalAlign}
                            onChange={(value) => handleBlockDefault({ verticalAlign: value })}
                            isBlock
                            __next40pxDefaultSize
                            __nextHasNoMarginBottom
                        >
                            {VERTICAL_ALIGN.map((item, index) => (
                                <ToggleGroupControlOption
                                    key={index}
                                    value={item.value}
                                    label={item.label}
                                />
                            ))}
                        </ToggleGroupControl>
                        <ResponsiveDimensionsControl
                            controlName={CONTENTS_PADDING}
                            baseLabel="Content Padding"
                        />
                        <ResponsiveRangeController
                            baseLabel={__("Slide Border Radius", "essential-blocks")}
                            controlName={SLIDE_BORDER_RADIUS}
                            units={GAP_UNIT_TYPES}
                            min={1}
                            max={50}
                            step={1}
                        />
                    </PanelBody>

                    <PanelBody title={__("Title Style", "essential-blocks")} initialOpen={false}>
                        <ColorControl
                            label={__("Color", "essential-blocks")}
                            color={titleColor}
                            onChange={(color) => handleBlockDefault({ titleColor: color })}
                        />

                        <ColorControl
                            label={__("Background Color", "essential-blocks")}
                            color={titleBackgroundColor}
                            onChange={(color) =>
                                handleBlockDefault({
                                    titleBackgroundColor: color,
                                })
                            }
                        />

                        <TypographyDropdown
                            baseLabel={__("Typography", "essential-blocks")}
                            typographyPrefixConstant={TITLE_TYPOGRAPHY}
                        />
                        <ResponsiveDimensionsControl
                            controlName={TITLE_MARGIN}
                            baseLabel="Margin"
                        />
                    </PanelBody>

                    <PanelBody title={__("Button Styles", "essential-blocks")} initialOpen={false}>
                        <ToggleGroupControl

                            value={buttonColorType}
                            onChange={(value) => handleBlockDefault({ buttonColorType: value })}
                            isBlock
__next40pxDefaultSize
__nextHasNoMarginBottom
                        >
                            {NORMAL_HOVER.map((item, index) => (
                                <ToggleGroupControlOption
                                    key={index}
                                    value={item.value}
                                    label={item.label}
                                />
                            ))}
                        </ToggleGroupControl>

                        {buttonColorType === "normal" && (
                            <>
                                <ColorControl
                                    label={__("Color", "essential-blocks")}
                                    color={buttonColor}
                                    onChange={(color) =>
                                        handleBlockDefault({
                                            buttonColor: color,
                                        })
                                    }
                                />
                                <ColorControl
                                    label={__("Background Color", "essential-blocks")}
                                    color={buttonBackgroundColor}
                                    onChange={(color) =>
                                        handleBlockDefault({
                                            buttonBackgroundColor: color,
                                        })
                                    }
                                />
                            </>
                        )}

                        {buttonColorType === "hover" && (
                            <>
                                <ColorControl
                                    label={__("Hover Color", "essential-blocks")}
                                    color={buttonHoverColor}
                                    onChange={(color) =>
                                        handleBlockDefault({
                                            buttonHoverColor: color,
                                        })
                                    }
                                />

                                <ColorControl
                                    label={__("Hover Background Color", "essential-blocks")}
                                    color={buttonHoverBackgroundColor}
                                    onChange={(color) =>
                                        handleBlockDefault({
                                            buttonHoverBackgroundColor: color,
                                        })
                                    }
                                />
                            </>
                        )}
                        <PanelRow>Button Border & Shadow</PanelRow>
                        <BorderShadowControl controlName={BUTTON_BORDER_SHADOW} />
                        <TypographyDropdown
                            baseLabel={__("Typography", "essential-blocks")}
                            typographyPrefixConstant={BUTTON_TYPOGRAPHY}
                        />
                        <ResponsiveDimensionsControl
                            controlName={BUTTON_MARGIN}
                            baseLabel="Margin"
                        />
                        <ResponsiveDimensionsControl
                            controlName={BUTTON_PADDING}
                            baseLabel="Padding"
                        />
                    </PanelBody>
                    <PanelBody title={__("Wrapper Margin & Padding", "essential-blocks")} initialOpen={false}>
                        <ResponsiveDimensionsControl
                            controlName={WRAPPER_MARGIN}
                            baseLabel="Margin"
                        />
                        <ResponsiveDimensionsControl
                            controlName={WRAPPER_PADDING}
                            baseLabel="Padding"
                        />
                    </PanelBody>
                    <PanelBody title={__("Wrapper Background", "essential-blocks")} initialOpen={false}>
                        <BackgroundControl controlName={WRAPPER_BG} noOverlay />
                    </PanelBody>
                    <PanelBody title={__("Wrapper Border & Shadow")} initialOpen={false}>
                        <BorderShadowControl controlName={WRAPPER_BORDER_SHADOW} />
                    </PanelBody>
                </div>
            )}
        </>
    );
}

export default withBlockContext(objAttributes)(ParallaxSlider);
