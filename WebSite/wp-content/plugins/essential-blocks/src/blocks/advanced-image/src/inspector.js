/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
    PanelBody,
    SelectControl,
    ToggleControl,
    Button,
    ButtonGroup,
    BaseControl,
    PanelRow,
} from "@wordpress/components";

/**
 * Internal depencencies
 */

import objAttributes from "./attributes";

import {
    WRAPPER_BG,
    WRAPPER_MARGIN,
    WRAPPER_PADDING,
    WRAPPER_BORDER_SHADOW,
    IMAGE_WIDTH,
    IMAGE_HEIGHT,
    SIZE_UNIT_TYPES,
    IMAGE_BORDER_SHADOW,
    CAPTION_MARGIN,
    CAPTION_PADDING,
    CAPTION_WIDTH,
    STYLES,
    TEXT_ALIGN,
    HORIZONTAL_ALIGN,
    VERTICAL_ALIGN,
    UNIT_TYPES,
    CAPTION_STYLES,
    VERTICAL_ALIGN_CAP_2,
    HOVER_EFFECT,
    FIT_STYLES,
    TEXT_ALIGNMENT,
    IMAGE_ALIGN,
    IMAGE_ALIGNMENT,
    SOURCE
} from "./constants";

import { CAPTION_TYPOGRAPHY } from "./constants/typoConstants";

import {
    ResponsiveDimensionsControl,
    TypographyDropdown,
    BorderShadowControl,
    ResponsiveRangeController,
    ColorControl,
    EbImageSizeSelector,
    DynamicInputControl,
    ResponsiveAlignControl,
    InspectorPanel, ButtonGroupControl,
} from '@essential-blocks/controls'

function Inspector(props) {
    const { attributes, setAttributes } = props;
    const {
        resOption,
        displayCaption,
        captionColor,
        captionBGColor,
        horizontalAlign,
        verticalAlign,
        verticalAlignCap2,
        stylePreset,
        enableLink,
        openInNewTab,
        imageLink,
        captionStyle,
        hoverEffect,
        complexStyle,
        autoFit,
        imageSize,
        fitStyles,
        autoHeight,
        imgSource
    } = attributes;

    const changImgSource = (selected) => {
        switch (selected) {
            case "site-logo":
                setAttributes({
                    imgSource: selected,
                    displayCaption: false,
                    enableLink: true,
                    widthRange: 120,
                    widthUnit: "px",
                    imgBorderShadowborderStyle: "none",
                    imgBorderShadowRds_Bottom: "0",
                    imgBorderShadowRds_Left: "0",
                    imgBorderShadowRds_Right: "0",
                    imgBorderShadowRds_Top: "0",
                    hoverEffect: 'no-effect',
                });
                break;
            case "featured-img":
                setAttributes({
                    imgSource: selected,
                    displayCaption: false,
                    enableLink: true,
                    widthRange: '',
                    imgBorderShadowborderStyle: "solid",
                    imgBorderShadowRds_Bottom: "15",
                    imgBorderShadowRds_Left: "15",
                    imgBorderShadowRds_Right: "15",
                    imgBorderShadowRds_Top: "15",
                    hoverEffect: 'no-effect',
                });
                break;
            case "custom":
                setAttributes({
                    imgSource: selected,
                    displayCaption: true,
                    enableLink: false,
                    widthRange: '',
                    imgBorderShadowborderStyle: "solid",
                    imgBorderShadowRds_Bottom: "15",
                    imgBorderShadowRds_Left: "15",
                    imgBorderShadowRds_Right: "15",
                    imgBorderShadowRds_Top: "15",
                    hoverEffect: 'zoom-in',
                });
                break;
            default:
                return false;
        }
    };

    const changeStyle = (selected) => {
        setAttributes({ stylePreset: selected });
        const complexLayouts = ["octagon", "rhombus", "triangle"];
        if (complexLayouts.includes(selected)) {
            setAttributes({
                complexStyle: true,
            });
        } else {
            setAttributes({
                complexStyle: false,
            });
        }

        //
        switch (selected) {
            case "rounded":
                setAttributes({
                    imgBorderShadowRds_Bottom: "15",
                    imgBorderShadowRds_Top: "15",
                    imgBorderShadowRds_Left: "15",
                    imgBorderShadowRds_Right: "15",
                    imgBorderShadowRds_Unit: "px",
                });
                break;
            case "square":
                setAttributes({
                    imgBorderShadowRds_Bottom: "0",
                    imgBorderShadowRds_Top: "0",
                    imgBorderShadowRds_Left: "0",
                    imgBorderShadowRds_Right: "0",
                    imgBorderShadowRds_Unit: "px",
                });
                break;
            case "circle":
                setAttributes({
                    imgBorderShadowRds_Bottom: "50",
                    imgBorderShadowRds_Top: "50",
                    imgBorderShadowRds_Left: "50",
                    imgBorderShadowRds_Right: "50",
                    imgBorderShadowRds_Unit: "%",
                });
                break;
            default:
                return false;
        }
    };

    const changCaptionStyle = (selected) => {
        switch (selected) {
            case "caption-style-1":
                setAttributes({
                    captionStyle: selected,
                    captionColor: "#ffffff",
                });
                break;
            case "caption-style-2":
                setAttributes({
                    captionStyle: selected,
                    captionColor: "#000000",
                });
                break;
            default:
                setAttributes({
                    captionStyle: selected,
                });
        }
    };

    return (
        <InspectorPanel advancedControlProps={{
            marginPrefix: WRAPPER_MARGIN,
            paddingPrefix: WRAPPER_PADDING,
            backgroundPrefix: WRAPPER_BG,
            borderPrefix: WRAPPER_BORDER_SHADOW,
            hasMargin: true
        }}>
            <InspectorPanel.General>
                <PanelBody title={__("General", "essential-blocks")} initialOpen={true}>
                    <SelectControl
                        label={__("Source", "essential-blocks")}
                        value={imgSource}
                        options={SOURCE}
                        onChange={(imgSource) => changImgSource(imgSource)}
                    />
                    {imgSource !== 'site-logo' && (
                        <SelectControl
                            label={__("Styles", "essential-blocks")}
                            description={__("Border won't work", "essential-blocks")}
                            value={stylePreset}
                            options={STYLES}
                            onChange={(stylePreset) => changeStyle(stylePreset)}
                        />
                    )}

                    {stylePreset === "circle" && (
                        <PanelRow>
                            <em>
                                Please use equal "Height" &#38; "Width" for perfect Circle shape.
                            </em>
                        </PanelRow>
                    )}

                    {imgSource === 'custom' && (
                        <ToggleControl
                            label={__("Display Caption", "essential-blocks")}
                            checked={displayCaption}
                            onChange={() =>
                                setAttributes({
                                    displayCaption: !displayCaption,
                                })
                            }
                        />
                    )}

                    {displayCaption && (
                        <SelectControl
                            label={__("Caption Styles", "essential-blocks")}
                            value={captionStyle}
                            options={CAPTION_STYLES}
                            onChange={(captionStyle) => changCaptionStyle(captionStyle)}
                        />
                    )}

                    {imgSource !== 'site-logo' && (
                        <EbImageSizeSelector
                            attrName={"imageSize"}
                            label={"Image Size"} //Optional
                        />
                    )}

                    <ResponsiveRangeController
                        baseLabel={__("Width", "essential-blocks")}
                        controlName={IMAGE_WIDTH}
                        defaultAttributes={objAttributes}
                        min={1}
                        max={2000}
                        step={1}
                        units={SIZE_UNIT_TYPES}
                    />

                    <ToggleControl
                        label={__(
                            "Auto Height",
                            "essential-blocks"
                        )}
                        checked={autoHeight}
                        onChange={(autoHeight) =>
                            setAttributes({ autoHeight })
                        }
                    />
                    {!autoHeight && (
                        <ResponsiveRangeController
                            baseLabel={__(
                                "Height",
                                "essential-blocks"
                            )}
                            controlName={IMAGE_HEIGHT}
                            defaultAttributes={objAttributes}
                            min={0}
                            max={1000}
                            step={1}
                            units={SIZE_UNIT_TYPES}
                        />
                    )}

                    <ToggleControl
                        label={__("Auto Fit Image?", "essential-blocks")}
                        checked={autoFit}
                        onChange={(autoFit) => setAttributes({ autoFit })}
                    />

                    {imgSource !== 'site-logo' && autoFit && (
                        <SelectControl
                            label={__("Image Fit Options", "essential-blocks")}
                            value={fitStyles}
                            options={FIT_STYLES}
                            onChange={(fitStyles) => setAttributes({ fitStyles })}
                        />
                    )}

                    <ToggleControl
                        label={__("Enable Link?", "essential-blocks")}
                        checked={enableLink}
                        onChange={(enableLink) => setAttributes({ enableLink })}
                    />

                    {imgSource === 'custom' && enableLink && (
                        <>
                            <DynamicInputControl
                                label={__(
                                    "Link",
                                    "essential-blocks"
                                )}
                                attrName="imageLink"
                                inputValue={imageLink}
                                setAttributes={
                                    setAttributes
                                }
                                onChange={(link) =>
                                    setAttributes({
                                        imageLink: link,
                                    })
                                }
                            />
                        </>
                    )}
                    {enableLink && (
                        <ToggleControl
                            label={__("Open in New Tab", "essential-blocks")}
                            checked={openInNewTab}
                            onChange={(openInNewTab) =>
                                setAttributes({
                                    openInNewTab,
                                })
                            }
                        />
                    )}

                    <SelectControl
                        label={__("Hover Effect", "essential-blocks")}
                        value={hoverEffect}
                        options={HOVER_EFFECT}
                        onChange={(hoverEffect) => setAttributes({ hoverEffect })}
                    />
                </PanelBody>
            </InspectorPanel.General>
            <InspectorPanel.Style>
                <PanelBody title={__("Image Settings", "essential-blocks")}>
                    <ResponsiveAlignControl
                        baseLabel={__("Image Align", "essential-blocks")}
                        controlName={IMAGE_ALIGNMENT}
                        options={IMAGE_ALIGN}
                        resOption={resOption}
                    />

                    {!complexStyle && (
                        <>
                            <BaseControl>
                                <h3 className="eb-control-title">
                                    {__("Border", "essential-blocks")}
                                </h3>
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

                {displayCaption && (
                    <PanelBody title={__("Caption Styles", "essential-blocks")}>
                        <ColorControl
                            label={__("Text Color", "essential-blocks")}
                            color={captionColor}
                            attributeName={'captionColor'}
                        />

                        {displayCaption && captionStyle != "caption-style-2" && (
                            <ColorControl
                                label={__("Background Color", "essential-blocks")}
                                color={captionBGColor}
                                attributeName={'captionBGColor'}
                                isGradient={true}
                            />
                        )}

                        <TypographyDropdown
                            baseLabel={__("Typography", "essential-blocks")}
                            typographyPrefixConstant={CAPTION_TYPOGRAPHY}
                        />

                        <ResponsiveRangeController
                            baseLabel={__("Width", "essential-blocks")}
                            controlName={CAPTION_WIDTH}
                            defaultAttributes={objAttributes}
                            units={UNIT_TYPES}
                            min={0}
                            max={300}
                            step={1}
                        />

                        {displayCaption && (
                            <>
                                <ResponsiveAlignControl
                                    baseLabel={__("Text Align", "essential-blocks")}
                                    controlName={TEXT_ALIGNMENT}
                                    options={TEXT_ALIGN}
                                    resOption={resOption}
                                />

                                {captionStyle === "caption-style-1" && (
                                    <>
                                        <ButtonGroupControl
                                            label={__("Horizontal Align", "essential-blocks")}
                                            controlName={'horizontalAlign'}
                                            options={HORIZONTAL_ALIGN}
                                            currentValue={horizontalAlign}
                                        />

                                        <ButtonGroupControl
                                            label={__("Vertical Align", "essential-blocks")}
                                            controlName={'verticalAlign'}
                                            options={VERTICAL_ALIGN}
                                            currentValue={verticalAlign}
                                        />
                                    </>
                                )}

                                {captionStyle === "caption-style-2" && (
                                    <ButtonGroupControl
                                        label={__("Vertical Align", "essential-blocks")}
                                        controlName={'verticalAlignCap2'}
                                        options={VERTICAL_ALIGN_CAP_2}
                                        currentValue={verticalAlignCap2}
                                    />
                                )}

                                <ResponsiveDimensionsControl
                                    controlName={CAPTION_MARGIN}
                                    baseLabel="Margin"
                                />

                                <ResponsiveDimensionsControl
                                    controlName={CAPTION_PADDING}
                                    baseLabel="Padding"
                                />
                            </>
                        )}
                    </PanelBody>
                )}
            </InspectorPanel.Style>
        </InspectorPanel>
    );
}

export default Inspector;
