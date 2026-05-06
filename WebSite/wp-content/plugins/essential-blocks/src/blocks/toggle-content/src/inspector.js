/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
    RadioControl,
    RangeControl,
    SelectControl,
    ToggleControl,
    __experimentalDivider as Divider,
} from "@wordpress/components";

/**
 * Internal dependencies
 */
import {
    SWITCH_STYLES,
    SWITCH_SIZE,
    SEPERATOR_TYPE,
    BORDER_STYLES,
    INITIAL_CONTENT,
    EFFECT_STYLE,
} from "./constants";

import { rangeButtonWidth, rangeButtonHeight, rangeHeadingSpace } from "./constants/rangeNames";

import { WrpBgConst } from "./constants/backgroundsConstants";

import { WrpBdShadowConst } from "./constants/borderShadowConstants";

import {
    UnitControl,
    GradientColorControl,
    ColorControl,
    ResetControl,
    TypographyDropdown,
    ResponsiveRangeController,
    InspectorPanel,
    ButtonGroupControl,
    LiquidGlassEffectControl,
    ProSelectControl
} from "@essential-blocks/controls";

import objAttributes from "./attributes";

import {
    typoPrefix_tgl,
} from "./constants/typographyPrefixConstants";

import { tglWrapMarginConst, tglWrapPaddingConst } from "./constants/dimensionsConstants";
import { applyFilters } from "@wordpress/hooks";

const Inspector = ({ attributes, setAttributes }) => {
    const {
        resOption,

        //
        initialContent,
        switchStyle,
        switchSize,
        buttonHeight,
        buttonWidth,
        seperatorType,
        activeColor,
        activeBg,
        primaryLabelColor,
        secondaryLabelColor,
        labelSpace,
        labelSpaceUnit,
        backgroundType,
        backgroundColor,
        backgroundGradient,
        controllerType,
        controllerColor,
        controllerGradient,
        borderStyle,
        borderWidth,
        borderColor,
        borderRadius,
        shadowColor,
        hOffset,
        vOffset,
        blur,
        spread,
        inset,
        contentStyles,
        controllerColorSecondary,
        backgroundColorSecondary,
        switchLiquidGlass,
        effectStyle,
    } = attributes;

    const handleEffectStyleChange = (selected) => {
        setAttributes({ effectStyle: selected });

        applyFilters("eb_toggle_content_pro_effect_change_style", selected, attributes, setAttributes);
    }

    return (
        <InspectorPanel advancedControlProps={{
            marginPrefix: tglWrapMarginConst,
            paddingPrefix: tglWrapPaddingConst,
            backgroundPrefix: WrpBgConst,
            borderPrefix: WrpBdShadowConst,
            hasMargin: true
        }}>
            <InspectorPanel.General>
                <InspectorPanel.PanelBody initialOpen={true}>
                    <ProSelectControl
                        label={__("Effect Style", "essential-blocks")}
                        value={effectStyle}
                        onChange={(effectStyle) => { handleEffectStyleChange(effectStyle) }}
                        options={EFFECT_STYLE}
                    />
                    <RadioControl
                        label={__("Initial Content", "essential-blocks")}
                        selected={initialContent}
                        onChange={(initialContent) => setAttributes({ initialContent })}
                        options={INITIAL_CONTENT}
                    />

                    {effectStyle === 'default' && (
                        <>
                            <SelectControl
                                label={__("Switch Type", "essential-blocks")}
                                value={switchStyle}
                                onChange={(switchStyle) => setAttributes({ switchStyle })}
                                options={SWITCH_STYLES}
                                __next40pxDefaultSize
                                __nextHasNoMarginBottom
                            />

                            {(switchStyle === "rounded" || switchStyle === "reactangle") && (
                                <SelectControl
                                    label={__("Switch Size", "essential-blocks")}
                                    value={switchSize}
                                    options={SWITCH_SIZE}
                                    onChange={(switchSize) => setAttributes({ switchSize })}
                                    __next40pxDefaultSize
                                    __nextHasNoMarginBottom
                                />
                            )}

                            {switchStyle === "toggle" && (
                                <>
                                    <ResponsiveRangeController
                                        noUnits
                                        baseLabel={__("Button Height", "essential-blocks")}
                                        controlName={rangeButtonHeight}
                                        min={10}
                                        max={200}
                                        step={1}
                                    />

                                    <ResponsiveRangeController
                                        baseLabel={__("Button Width", "essential-blocks")}
                                        controlName={rangeButtonWidth}
                                        min={10}
                                        max={100}
                                        step={1}
                                    />
                                </>
                            )}

                            {switchStyle === "text" && (
                                <SelectControl
                                    label={__("Sepetator Type", "essential-blocks")}
                                    value={seperatorType}
                                    options={SEPERATOR_TYPE}
                                    onChange={(seperatorType) => setAttributes({ seperatorType })}
                                    __next40pxDefaultSize
                                    __nextHasNoMarginBottom
                                />
                            )}

                            {switchStyle === "rounded" && (
                                <ToggleControl
                                    label={__("Switch Liquid Glass Effect", "essential-blocks")}
                                    checked={switchLiquidGlass.enable}
                                    onChange={() => {
                                        setAttributes({
                                            switchLiquidGlass: {
                                                ...switchLiquidGlass,
                                                enable: !switchLiquidGlass.enable
                                            }
                                        });
                                    }}
                                    __nextHasNoMarginBottom
                                />
                            )}
                        </>
                    )}

                    <Divider />
                    <ResponsiveRangeController
                        baseLabel={__("Heading Space", "essential-blocks")}
                        controlName={rangeHeadingSpace}
                        min={10}
                        max={100}
                        step={1}
                    />

                    {(switchStyle === "rectangle" || switchStyle === "rounded") && (
                        <>
                            <UnitControl
                                selectedUnit={labelSpaceUnit}
                                unitTypes={[
                                    { label: "px", value: "px" },
                                    { label: "%", value: "%" },
                                ]}
                                onClick={(labelSpaceUnit) => setAttributes({ labelSpaceUnit })}
                            />

                            <RangeControl
                                label={__("Label Space", "essential-blocks")}
                                value={labelSpace}
                                onChange={(labelSpace) => setAttributes({ labelSpace })}
                                __nextHasNoMarginBottom
                                __next40pxDefaultSize
                            />
                        </>
                    )}

                    <TypographyDropdown
                        baseLabel="Typography"
                        typographyPrefixConstant={typoPrefix_tgl}
                    />
                </InspectorPanel.PanelBody>
            </InspectorPanel.General>
            <InspectorPanel.Style>
                <>
                    {effectStyle !== 'default' && (
                        applyFilters(
                            "eb_toggle_content_pro_effect_style_tab",
                            "",
                            attributes,
                            setAttributes,
                        )
                    )}
                    <InspectorPanel.PanelBody
                        title={__(
                            `${switchStyle === "text" ? "Colors" : "Label Colors"}`,
                            "essential-blocks"
                        )}
                        initialOpen={true}
                    >
                        <ColorControl
                            label={__("Primary Text", "essential-blocks")}
                            color={primaryLabelColor}
                            attributeName={'primaryLabelColor'}
                        />
                        <ColorControl
                            label={__("Secondary Text", "essential-blocks")}
                            color={secondaryLabelColor}
                            attributeName={'secondaryLabelColor'}
                        />
                        <ColorControl
                            label={__("Active Text Color", "essential-blocks")}
                            color={activeColor}
                            attributeName={'activeColor'}
                        />
                        {switchStyle === "text" && (
                            <>
                                <ColorControl
                                    label={__("Background", "essential-blocks")}
                                    color={backgroundColor}
                                    attributeName={'backgroundColor'}
                                />
                                <ColorControl
                                    label={__("Active Background", "essential-blocks")}
                                    color={activeBg}
                                    attributeName={'activeBg'}
                                />
                            </>
                        )}
                    </InspectorPanel.PanelBody>

                    {effectStyle === 'default' && (
                        <>


                            {switchStyle !== "text" && (
                                <InspectorPanel.PanelBody
                                    title={__("Switcher Controller", "essential-blocks")}
                                    initialOpen={false}
                                >
                                    <ButtonGroupControl
                                        label={__("Styles", "essential-blocks")}
                                        attrName={'contentStyles'}
                                        options={INITIAL_CONTENT}
                                        currentValue={contentStyles}
                                    />

                                    {contentStyles === 'primary' && (
                                        <>
                                            <ColorControl
                                                label={__("Switch Background Color", "essential-blocks")}
                                                color={backgroundColor}
                                                attributeName={'backgroundColor'}
                                                isGradient={true}
                                            />
                                            <ColorControl
                                                label={__("Controller Background Color", "essential-blocks")}
                                                color={controllerColor}
                                                attributeName={'controllerColor'}
                                                isGradient={true}
                                            />
                                        </>
                                    )}
                                    {contentStyles === 'secondary' && (
                                        <>
                                            <ColorControl
                                                label={__("Switch Background Color", "essential-blocks")}
                                                color={backgroundColorSecondary}
                                                attributeName={'backgroundColorSecondary'}
                                                isGradient={true}
                                            />
                                            <ColorControl
                                                label={__("Controller Background Color", "essential-blocks")}
                                                color={controllerColorSecondary}
                                                attributeName={'controllerColorSecondary'}
                                                isGradient={true}
                                            />
                                        </>
                                    )}
                                </InspectorPanel.PanelBody>
                            )}

                            <InspectorPanel.PanelBody title={__("Border", "essential-blocks")} initialOpen={false}>
                                <SelectControl
                                    label={__("Border Style", "essential-blocks")}
                                    value={borderStyle}
                                    options={BORDER_STYLES}
                                    onChange={(borderStyle) => setAttributes({ borderStyle })}
                                    __next40pxDefaultSize
                                    __nextHasNoMarginBottom
                                />

                                <ColorControl
                                    label={__("Border Color", "essential-blocks")}
                                    color={borderColor}
                                    attributeName={'borderColor'}
                                />

                                <RangeControl
                                    label={__("Border Width", "essential-blocks")}
                                    value={borderWidth}
                                    onChange={(borderWidth) => setAttributes({ borderWidth })}
                                    min={0}
                                    max={17}
                                    __nextHasNoMarginBottom
                                    __next40pxDefaultSize
                                />

                                {switchStyle === "text" && (
                                    <RangeControl
                                        label={__("Border Radius", "essential-blocks")}
                                        value={borderRadius}
                                        onChange={(borderRadius) => setAttributes({ borderRadius })}
                                        min={0}
                                        max={100}
                                        __nextHasNoMarginBottom
                                        __next40pxDefaultSize
                                    />
                                )}
                            </InspectorPanel.PanelBody>

                            {switchStyle !== "text" && (
                                <InspectorPanel.PanelBody title={__("Shadow", "essential-blocks")} initialOpen={false}>
                                    <ColorControl
                                        label={__("Shadow Color", "essential-blocks")}
                                        color={shadowColor}
                                        attributeName={'shadowColor'}
                                    />

                                    <ResetControl onReset={() => setAttributes({ hOffset: undefined })}>
                                        <RangeControl
                                            label={__("Horizontal Offset", "essential-blocks")}
                                            value={hOffset}
                                            onChange={(hOffset) => setAttributes({ hOffset })}
                                            min={0}
                                            max={10}
                                            __nextHasNoMarginBottom
                                            __next40pxDefaultSize
                                        />
                                    </ResetControl>

                                    <ResetControl onReset={() => setAttributes({ vOffset: undefined })}>
                                        <RangeControl
                                            label={__("Vertical Offset", "essential-blocks")}
                                            value={vOffset}
                                            onChange={(vOffset) => setAttributes({ vOffset })}
                                            min={0}
                                            max={10}
                                            __nextHasNoMarginBottom
                                            __next40pxDefaultSize
                                        />
                                    </ResetControl>

                                    <ResetControl onReset={() => setAttributes({ blur: undefined })}>
                                        <RangeControl
                                            label={__("Blur", "essential-blocks")}
                                            value={blur}
                                            onChange={(blur) => setAttributes({ blur })}
                                            min={0}
                                            max={10}
                                            __nextHasNoMarginBottom
                                            __next40pxDefaultSize
                                        />
                                    </ResetControl>

                                    <ResetControl onReset={() => setAttributes({ spread: undefined })}>
                                        <RangeControl
                                            label={__(" Spread", "essential-blocks")}
                                            value={spread}
                                            onChange={(spread) => setAttributes({ spread })}
                                            min={0}
                                            max={10}
                                            __nextHasNoMarginBottom
                                            __next40pxDefaultSize
                                        />
                                    </ResetControl>

                                    <ToggleControl
                                        label={__("Inset", "essential-blocks")}
                                        checked={inset}
                                        onChange={() => setAttributes({ inset: !inset })}
                                        __nextHasNoMarginBottom
                                    />
                                </InspectorPanel.PanelBody>
                            )}
                        </>
                    )}
                </>
                {effectStyle === 'default' && switchLiquidGlass.enable && switchStyle !== "text" && (
                    <InspectorPanel.PanelBody
                        title={__("Switch Liquid Glass", "essential-blocks")}
                        initialOpen={false}
                    >
                        <LiquidGlassEffectControl attributeName="switchLiquidGlass" shadowAttributeName="switchLiquidGlassShadowEffectBorder" />
                    </InspectorPanel.PanelBody>
                )}
            </InspectorPanel.Style>
        </InspectorPanel>
    );
};

export default Inspector;
