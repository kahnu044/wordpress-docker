/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
    PanelRow,
    ToggleControl,
    Button,
    ButtonGroup,
    RangeControl,
    TextControl,
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
} from "./constants/constants";
import { TITLE_TYPOGRAPHY, BUTTON_TYPOGRAPHY } from "./constants/typography-constant";

import {
    ResponsiveDimensionsControl,
    TypographyDropdown,
    BorderShadowControl,
    ResponsiveRangeController,
    ColorControl,
    InspectorPanel
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
                        />
                        <ToggleControl
                            label={__("Custom Height", "essential-blocks")}
                            checked={isCustomHeight}
                            onChange={() =>
                                setAttributes({
                                    isCustomHeight: !isCustomHeight,
                                })
                            }
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
                                <TextControl
                                    label={__("Title Text", "essential-blocks")}
                                    value={slide.title}
                                    onChange={(title) => handleTextChange("title", title, index)}
                                />

                                <TextControl
                                    label={__("Button Text", "essential-blocks")}
                                    value={slide.btnText}
                                    onChange={(btnText) => handleTextChange("btnText", btnText, index)}
                                />

                                <TextControl
                                    label={__("Button Link", "essential-blocks")}
                                    value={slide.link}
                                    onChange={(link) => handleTextChange("link", link, index)}
                                    onBlur={(val) => validUrl('link', val.target.value, index)}
                                />

                                <ToggleControl
                                    label={__("Open in New Tab", "essential-blocks")}
                                    checked={slide.openNewTab}
                                    onChange={() =>
                                        handleTextChange("openNewTab", !slide.openNewTab, index)
                                    }
                                />
                            </InspectorPanel.PanelBody>
                        ))}
                    </InspectorPanel.PanelBody>
                </InspectorPanel.General>
                <InspectorPanel.Style>
                    <InspectorPanel.PanelBody title={__("Slides Style", "essential-blocks")} initialOpen={true}>
                        <PanelRow>Content Horizontal Align</PanelRow>
                        <ButtonGroup>
                            {HORIZONTAL_ALIGN.map((item, index) => (
                                <Button
                                    key={index}
                                    isPrimary={horizontalAlign === item.value}
                                    isSecondary={horizontalAlign !== item.value}
                                    onClick={() =>
                                        setAttributes({
                                            horizontalAlign: item.value,
                                        })
                                    }
                                >
                                    {item.label}
                                </Button>
                            ))}
                        </ButtonGroup>

                        <PanelRow>Content Vertical Align</PanelRow>
                        <ButtonGroup className="eb-margin-bottom-20">
                            {VERTICAL_ALIGN.map((item, index) => (
                                <Button
                                    key={index}
                                    isPrimary={verticalAlign === item.value}
                                    isSecondary={verticalAlign !== item.value}
                                    onClick={() =>
                                        setAttributes({
                                            verticalAlign: item.value,
                                        })
                                    }
                                >
                                    {item.label}
                                </Button>
                            ))}
                        </ButtonGroup>

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
                        <ButtonGroup className="eb-inspector-btn-group">
                            {NORMAL_HOVER.map((item, index) => (
                                <Button
                                    key={index}
                                    isPrimary={buttonColorType === item.value}
                                    isSecondary={buttonColorType !== item.value}
                                    onClick={() =>
                                        setAttributes({
                                            buttonColorType: item.value,
                                        })
                                    }
                                >
                                    {item.label}
                                </Button>
                            ))}
                        </ButtonGroup>

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
