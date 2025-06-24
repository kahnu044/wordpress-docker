/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useEffect, useState } from "@wordpress/element";
import {
    PanelBody,
    ToggleControl,
    Button,
    ButtonGroup,
    BaseControl,
    TextControl,
    PanelRow,
    SelectControl,
} from "@wordpress/components";

/**
 * External depencencies
 */

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
    CAPTION_MARGIN,
    CAPTION_PADDING,
    CAPTION_WIDTH,
    TEXT_ALIGN,
    HORIZONTAL_ALIGN,
    VERTICAL_ALIGN,
    UNIT_TYPES,
    VERTICAL_ALIGN_CAP_2,
    HOVER_EFFECT,
} from "@essential-blocks/blocks/advanced-image/src/constants";

import { CAPTION_TYPOGRAPHY } from "@essential-blocks/blocks/advanced-image/src/constants/typoConstants";

import objAttributes from "@essential-blocks/blocks/advanced-image/src/attributes";

function AdvancedImage(props) {
    const { blockDefaults, setBlockDefaults, name, deviceType, handleBlockDefault } = props;

    const {
        displayCaption,
        captionColor,
        captionBGColor,
        horizontalAlign,
        verticalAlign,
        verticalAlignCap2,
        textAlign,
        stylePreset,
        enableLink,
        openInNewTab,
        imageLink,
        captionStyle,
        complexStyle,
        autoFit,
        hoverEffect,
    } = blockDefaults;

    const isDefaultSet = useBlockDefaults(name, blockDefaults, setBlockDefaults, objAttributes)

    return (
        <>
            {isDefaultSet && (
                <div className="eb-panel-control">
                    <PanelBody title={__("General", "essential-blocks")} initialOpen={true}>
                        <ToggleControl
                            label={__("Display Caption", "essential-blocks")}
                            checked={displayCaption}
                            onChange={() =>
                                handleBlockDefault({
                                    displayCaption: !displayCaption,
                                })
                            }
                        />

                        {/* {displayCaption && (
							<SelectControl
								label={__("Caption Styles", "essential-blocks")}
								value={captionStyle}
								options={CAPTION_STYLES}
								onChange={(captionStyle) => changCaptionStyle(captionStyle)}
							/>
						)} */}

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
                        />

                        <ToggleControl
                            label={__("Enable Link?", "essential-blocks")}
                            checked={enableLink}
                            onChange={(enableLink) => handleBlockDefault({ enableLink })}
                        />

                        {enableLink && (
                            <TextControl
                                label={__("Link", "essential-blocks")}
                                value={imageLink}
                                onChange={(link) => handleBlockDefault({ imageLink: link })}
                            />
                        )}
                        {enableLink && (
                            <ToggleControl
                                label={__("Open in New Tab", "essential-blocks")}
                                checked={openInNewTab}
                                onChange={(openInNewTab) => handleBlockDefault({ openInNewTab })}
                            />
                        )}

                        <SelectControl
                            label={__("Hover Effect", "essential-blocks")}
                            value={hoverEffect}
                            options={HOVER_EFFECT}
                            onChange={(hoverEffect) => handleBlockDefault({ hoverEffect })}
                        />
                    </PanelBody>
                    <PanelBody title={__("Image Styles", "essential-blocks")} initialOpen={false}>
                        {!complexStyle && (
                            <>
                                <BaseControl>
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
                    {displayCaption && (
                        <PanelBody title={__("Caption Styles", "essential-blocks")} initialOpen={false}>
                            <ColorControl
                                label={__("Text Color", "essential-blocks")}
                                color={captionColor}
                                onChange={(newColor) =>
                                    handleBlockDefault({
                                        captionColor: newColor,
                                    })
                                }
                            />

                            {displayCaption && captionStyle != "caption-style-2" && (
                                <ColorControl
                                    label={__("Background Color", "essential-blocks")}
                                    color={captionBGColor}
                                    onChange={(backgroundColor) =>
                                        handleBlockDefault({
                                            captionBGColor: backgroundColor,
                                        })
                                    }
                                />
                            )}

                            <TypographyDropdown
                                baseLabel={__("Typography", "essential-blocks")}
                                typographyPrefixConstant={CAPTION_TYPOGRAPHY}
                                
                            />

                            <ResponsiveRangeController
                                baseLabel={__("Width", "essential-blocks")}
                                controlName={CAPTION_WIDTH}
                                
                                units={UNIT_TYPES}
                                min={0}
                                max={300}
                                step={1}
                            />

                            {displayCaption && (
                                <>
                                    <BaseControl label={__("Text Align", "essential-blocks")}>
                                        <ButtonGroup>
                                            {TEXT_ALIGN.map((item) => (
                                                <Button
                                                    // isLarge
                                                    isPrimary={textAlign === item.value}
                                                    isSecondary={textAlign !== item.value}
                                                    onClick={() =>
                                                        handleBlockDefault({
                                                            textAlign: item.value,
                                                        })
                                                    }
                                                >
                                                    {item.label}
                                                </Button>
                                            ))}
                                        </ButtonGroup>
                                    </BaseControl>

                                    {captionStyle === "caption-style-1" && (
                                        <>
                                            <BaseControl label={__("Horizontal Align", "essential-blocks")}>
                                                <ButtonGroup>
                                                    {HORIZONTAL_ALIGN.map((item) => (
                                                        <Button
                                                            // isLarge
                                                            isPrimary={horizontalAlign === item.value}
                                                            isSecondary={horizontalAlign !== item.value}
                                                            onClick={() =>
                                                                handleBlockDefault({
                                                                    horizontalAlign: item.value,
                                                                })
                                                            }
                                                        >
                                                            {item.label}
                                                        </Button>
                                                    ))}
                                                </ButtonGroup>
                                            </BaseControl>

                                            <BaseControl label={__("Vertical Align", "essential-blocks")}>
                                                <ButtonGroup>
                                                    {VERTICAL_ALIGN.map((item) => (
                                                        <Button
                                                            // isLarge
                                                            isPrimary={verticalAlign === item.value}
                                                            isSecondary={verticalAlign !== item.value}
                                                            onClick={() =>
                                                                handleBlockDefault({
                                                                    verticalAlign: item.value,
                                                                })
                                                            }
                                                        >
                                                            {item.label}
                                                        </Button>
                                                    ))}
                                                </ButtonGroup>
                                            </BaseControl>
                                        </>
                                    )}

                                    {captionStyle === "caption-style-2" && (
                                        <BaseControl label={__("Vertical Align", "essential-blocks")}>
                                            <ButtonGroup>
                                                {VERTICAL_ALIGN_CAP_2.map((item) => (
                                                    <Button
                                                        // isLarge
                                                        isPrimary={verticalAlignCap2 === item.value}
                                                        isSecondary={verticalAlignCap2 !== item.value}
                                                        onClick={() =>
                                                            handleBlockDefault({
                                                                verticalAlignCap2: item.value,
                                                            })
                                                        }
                                                    >
                                                        {item.label}
                                                    </Button>
                                                ))}
                                            </ButtonGroup>
                                        </BaseControl>
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
                    {/* Advanced */}
                    <PanelBody title={__("Wrapper Margin & Padding")} initialOpen={false}>
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
                        <BackgroundControl controlName={WRAPPER_BG}  noOverlay />
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

export default withBlockContext(objAttributes)(AdvancedImage);
