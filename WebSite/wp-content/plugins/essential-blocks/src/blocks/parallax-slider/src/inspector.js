/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
    PanelRow,
    ToggleControl,
    RangeControl,
    TextControl,
    __experimentalToggleGroupControl as ToggleGroupControl,
    __experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from "@wordpress/components";
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
    HEADER_TAGS
} from "./constants/constants";
import { TITLE_TYPOGRAPHY, BUTTON_TYPOGRAPHY } from "./constants/typography-constant";

import {
    ResponsiveDimensionsControl,
    TypographyDropdown,
    BorderShadowControl,
    ResponsiveRangeController,
    ColorControl,
    InspectorPanel,
    EBTextControl
} from "@essential-blocks/controls";

const Inspector = ({ attributes, setAttributes }) => {
    const {
        resOption,
        sliderData,
        current,
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
        slideTitleTag
    } = attributes;

    const validUrl = (type, value, index) => {
        let updatedData = [...sliderData];
        if ('link' === type) {
            value = value.toLowerCase().replace('javascript:', '');
        }
        updatedData[index][type] = value;

        setAttributes({ sliderData: updatedData });
    }

    const handleTextChange = (type, value, index) => {
        let updatedData = [...sliderData];
        updatedData[index][type] = value;

        setAttributes({ sliderData: updatedData });
    };

    const handlePanelClick = (index) => {
        let updatedIndex = index !== current ? index : 1;
        setAttributes({ current: updatedIndex });
    };

    return (
        <>
            <InspectorPanel advancedControlProps={{
                marginPrefix: WRAPPER_MARGIN,
                paddingPrefix: WRAPPER_PADDING,
                backgroundPrefix: WRAPPER_BG,
                borderPrefix: WRAPPER_BORDER_SHADOW,
                hasMargin: true,
            }}>
                <InspectorPanel.General>
                    <InspectorPanel.PanelBody title={__("General", "essential-blocks")}>
                        <RangeControl
                            label={__("Parallax Softness", "essential-blocks")}
                            value={intensity}
                            allowReset
                            onChange={(intensity) => setAttributes({ intensity })}
                            min={0}
                            max={100}
                            __nextHasNoMarginBottom
                            __next40pxDefaultSize
                        />
                        <ToggleControl
                            label={__("Custom Height", "essential-blocks")}
                            checked={isCustomHeight}
                            onChange={() =>
                                setAttributes({
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
                        <ToggleGroupControl
                            label={__(
                                "Slide Title Tag",
                                "essential-blocks"
                            )}

                            value={slideTitleTag}
                            onChange={(value) =>
                                setAttributes({
                                    slideTitleTag: value,
                                })
                            }
                            isBlock
                            __next40pxDefaultSize
                            __nextHasNoMarginBottom
                        >
                            {HEADER_TAGS.map(
                                (header, index) => (
                                    <ToggleGroupControlOption
                                        key={index}
                                        value={header.value}
                                        label={header.label}
                                    />
                                )
                            )}
                        </ToggleGroupControl>
                    </InspectorPanel.PanelBody>

                    <InspectorPanel.PanelBody title={__("Slides", "essential-blocks")} initialOpen={false}>
                        {sliderData.map((slide, index) => (
                            <InspectorPanel.PanelBody
                                key={index}
                                title={
                                    slide.title && slide.title.length > 0
                                        ? slide.title
                                        : "Slide " + (index + 1) + " Settings"
                                }
                                initialOpen={false}
                                onToggle={() => handlePanelClick(index)}
                                className="eb-slider-item-single-panel"
                            >
                                <EBTextControl
                                    label={__("Title Text", "essential-blocks")}
                                    value={slide.title}
                                    onChange={(title) => handleTextChange("title", title, index)}
                                />

                                <EBTextControl
                                    label={__("Button Text", "essential-blocks")}
                                    value={slide.btnText}
                                    onChange={(btnText) => handleTextChange("btnText", btnText, index)}
                                />

                                <EBTextControl
                                    label={__("Button Link", "essential-blocks")}
                                    fieldType="url"
                                    value={slide.link}
                                    onChange={(link) => handleTextChange("link", link, index)}
                                    placeholder="https://example.com"
                                    help={__(
                                        "Enter a valid URL.",
                                        "essential-blocks"
                                    )}
                                    showValidation={true}
                                    enableSecurity={true}
                                />

                                <ToggleControl
                                    label={__("Open in New Tab", "essential-blocks")}
                                    checked={slide.openNewTab}
                                    onChange={() =>
                                        handleTextChange("openNewTab", !slide.openNewTab, index)
                                    }
                                    __nextHasNoMarginBottom
                                />
                            </InspectorPanel.PanelBody>
                        ))}
                    </InspectorPanel.PanelBody>
                </InspectorPanel.General>
                <InspectorPanel.Style>
                    <InspectorPanel.PanelBody title={__("Slides Style", "essential-blocks")} initialOpen={true}>
                        <ToggleGroupControl
                            label="Content Horizontal Align"

                            value={horizontalAlign}
                            onChange={(value) =>
                                setAttributes({
                                    horizontalAlign: value,
                                })
                            }
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
                            className="eb-margin-bottom-20 newtogglegroupcontrol"
                            value={verticalAlign}
                            onChange={(value) =>
                                setAttributes({
                                    verticalAlign: value,
                                })
                            }
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
                    </InspectorPanel.PanelBody>

                    <InspectorPanel.PanelBody title={__("Title Style", "essential-blocks")} initialOpen={false}>
                        <ColorControl
                            label={__("Color", "essential-blocks")}
                            color={titleColor}
                            attributeName={'titleColor'}
                        />
                        <ColorControl
                            label={__("Background Color", "essential-blocks")}
                            color={titleBackgroundColor}
                            attributeName={'titleBackgroundColor'}
                        />

                        <TypographyDropdown
                            baseLabel={__("Typography", "essential-blocks")}
                            typographyPrefixConstant={TITLE_TYPOGRAPHY}
                        />
                        <ResponsiveDimensionsControl
                            controlName={TITLE_MARGIN}
                            baseLabel="Margin"
                        />
                    </InspectorPanel.PanelBody>

                    <InspectorPanel.PanelBody title={__("Button Styles", "essential-blocks")} initialOpen={false}>
                        <ToggleGroupControl
                            label={__("Button Color Type", "essential-blocks")}
                            className="eb-inspector-btn-group newtogglegroupcontrol"
                            value={buttonColorType}
                            onChange={(value) =>
                                setAttributes({
                                    buttonColorType: value,
                                })
                            }
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
                                    attributeName={'buttonColor'}
                                />
                                <ColorControl
                                    label={__("Background Color", "essential-blocks")}
                                    color={buttonBackgroundColor}
                                    attributeName={'buttonBackgroundColor'}
                                />
                            </>
                        )}

                        {buttonColorType === "hover" && (
                            <>
                                <ColorControl
                                    label={__("Hover Color", "essential-blocks")}
                                    color={buttonHoverColor}
                                    attributeName={'buttonHoverColor'}
                                />
                                <ColorControl
                                    label={__("Hover Background Color", "essential-blocks")}
                                    color={buttonHoverBackgroundColor}
                                    attributeName={'buttonHoverBackgroundColor'}
                                />
                            </>
                        )}
                        <PanelRow>Button Border & Shadow</PanelRow>
                        <BorderShadowControl
                            controlName={BUTTON_BORDER_SHADOW}
                        // noShadow
                        // noBorder
                        />
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
                    </InspectorPanel.PanelBody>
                </InspectorPanel.Style>
            </InspectorPanel>
        </>
    );
};

export default Inspector;
