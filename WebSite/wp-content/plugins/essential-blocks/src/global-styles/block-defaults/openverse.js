/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { PanelBody, ToggleControl, BaseControl, PanelRow, __experimentalToggleGroupControl as ToggleGroupControl, __experimentalToggleGroupControlOption as ToggleGroupControlOption } from "@wordpress/components";

/**
 * External depencencies
 */

import {
    ColorControl,
    ResponsiveDimensionsControl,
    TypographyDropdown,
    BorderShadowControl,
    ResponsiveRangeController,
    BackgroundControl,
    useBlockDefaults,
    withBlockContext
} from "@essential-blocks/controls";

/**
 * Internal depencencies
 */
import {
    WRAPPER_BG,
    WRAPPER_MARGIN,
    WRAPPER_PADDING,
    WRAPPER_BORDER_SHADOW,
    IMAGE_WIDTH,
    IMAGE_HEIGHT,
    SIZE_UNIT_TYPES,
    IMAGE_BORDER_SHADOW,
    ATTRIBUTION_MARGIN,
    ATTRIBUTION_PADDING,
    ATTRIBUTION_WIDTH,
    STYLES,
    TEXT_ALIGN,
    HORIZONTAL_ALIGN,
    UNIT_TYPES,
} from "@essential-blocks/blocks/openverse/src/constants";

import { ATTRIBUTION_TYPOGRAPHY } from "@essential-blocks/blocks/openverse/src/constants/typoConstants";

import objAttributes from "@essential-blocks/blocks/openverse/src/attributes";

function Openverse(props) {
    const { blockDefaults, setBlockDefaults, name, deviceType, handleBlockDefault } = props;
    const { displayAttribution, attributionColor, textAlign, stylePreset, complexStyle, autoFit } = blockDefaults;
    const isDefaultSet = useBlockDefaults(name, blockDefaults, setBlockDefaults, objAttributes)

    return (
        <>
            {isDefaultSet && (
                <div className="eb-panel-control">
                    <PanelBody title={__("General", "essential-blocks")} initialOpen={true}>
                        {stylePreset === "circle" && (
                            <PanelRow>
                                <em>Please use equal "Height" &#38; "Width" for perfect Circle shape.</em>
                            </PanelRow>
                        )}

                        <ResponsiveRangeController
                            baseLabel={__("Width", "essential-blocks")}
                            controlName={IMAGE_WIDTH}
                            min={1}
                            max={1000}
                            step={1}
                            units={SIZE_UNIT_TYPES}
                        />

                        <ResponsiveRangeController
                            baseLabel={__("Height", "essential-blocks")}
                            controlName={IMAGE_HEIGHT}
                            min={0}
                            max={1000}
                            step={1}
                            units={SIZE_UNIT_TYPES}
                        />

                        <ToggleControl
                            label={__("Auto Fit Image?", "essential-blocks")}
                            checked={autoFit}
                            onChange={(autoFit) => handleBlockDefault({ autoFit })}
                            __nextHasNoMarginBottom
                        />

                        <ToggleControl
                            label={__("Display Attribution", "essential-blocks")}
                            checked={displayAttribution}
                            onChange={() => checkAttribution(!displayAttribution)}
                            __nextHasNoMarginBottom
                        />
                    </PanelBody>

                    <PanelBody title={__("Image Settings", "essential-blocks")} initialOpen={false}>
                        {!complexStyle && (
                            <>
                                <BaseControl __nextHasNoMarginBottom>
                                    <h3 className="eb-control-title">{__("Border", "essential-blocks")}</h3>
                                </BaseControl>
                                <BorderShadowControl
                                    controlName={IMAGE_BORDER_SHADOW}
                                // noShadow
                                // noBorder
                                />
                            </>
                        )}
                        {complexStyle && (
                            <PanelRow>
                                <em>Border Style doesn't support for "{stylePreset} style".</em>
                            </PanelRow>
                        )}
                    </PanelBody>

                    {displayAttribution && (
                        <PanelBody title={__("Caption Styles", "essential-blocks")} initialOpen={false}>
                            <ColorControl
                                label={__("Color Controls", "essential-blocks")}
                                color={attributionColor}
                                onChange={(newColor) =>
                                    handleBlockDefault({
                                        attributionColor: newColor,
                                    })
                                }
                            />

                            <TypographyDropdown
                                baseLabel={__("Typography", "essential-blocks")}
                                typographyPrefixConstant={ATTRIBUTION_TYPOGRAPHY}
                            />

                            <ResponsiveRangeController
                                baseLabel={__("Width", "essential-blocks")}
                                controlName={ATTRIBUTION_WIDTH}
                                units={UNIT_TYPES}
                                min={0}
                                max={300}
                                step={1}
                            />

                            {displayAttribution && (
                                <>
                                    <ToggleGroupControl
                                        label={__("Text Align", "essential-blocks")}

                                        value={textAlign}
                                        onChange={(value) => handleBlockDefault({ textAlign: value })}
                                        isBlock
                                        __next40pxDefaultSize
                                        __nextHasNoMarginBottom
                                    >
                                        {TEXT_ALIGN.map((item) => (
                                            <ToggleGroupControlOption
                                                value={item.value}
                                                label={item.label}
                                            />
                                        ))}
                                    </ToggleGroupControl>

                                    <ResponsiveDimensionsControl
                                        controlName={ATTRIBUTION_MARGIN}
                                        baseLabel="Margin"
                                    />

                                    <ResponsiveDimensionsControl
                                        controlName={ATTRIBUTION_PADDING}
                                        baseLabel="Padding"
                                    />
                                </>
                            )}
                        </PanelBody>
                    )}

                    {/* Advanced */}
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
                        <BorderShadowControl
                            controlName={WRAPPER_BORDER_SHADOW}
                        // noShadow
                        // noBorder
                        />
                    </PanelBody>
                </div>
            )}
        </>
    );
}

export default withBlockContext(objAttributes)(Openverse);
