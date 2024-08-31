/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
    PanelBody,
    PanelRow,
    SelectControl,
    ToggleControl,
    Button,
    ButtonGroup,
    TabPanel,
    RangeControl,
    TextControl,
    TextareaControl,
} from "@wordpress/components";

/*
 * Internal depencencies
 */
import {
    WRAPPER_BG,
    WRAPPER_MARGIN,
    WRAPPER_PADDING,
    WRAPPER_BORDER_SHADOW,
    TITLE_MARGIN,
    SUBTITLE_MARGIN,
    BUTTON_MARGIN,
    BUTTON_PADDING,
    BUTTON_BORDER_SHADOW,
    DOTS_GAP,
    ARROW_POSITION,
    DOTS_POSITION,
    ARROW_SIZE,
    DOTS_SIZE,
    SLIDES_GAP,
    SLIDE_TO_SHOW,
    CUSTOM_HEIGHT,
    NORMAL_HOVER,
    SLIDER_CONTENT_TYPE,
    SLIDER_TYPE,
    UNIT_TYPES,
    HEIGHT_UNIT_TYPES,
    FONT_UNIT_TYPES,
    COLORS,
    TEXT_ALIGN,
    VERTICAL_ALIGN,
} from "@essential-blocks/blocks/slider/src/constants/constants";

import objAttributes from "@essential-blocks/blocks/slider/src/attributes";

import {
    TITLE_TYPOGRAPHY,
    SUBTITLE_TYPOGRAPHY,
    BUTTON_TYPOGRAPHY,
} from "@essential-blocks/blocks/slider/src/constants/typography-constant";

import {
    ResponsiveDimensionsControl,
    TypographyDropdown,
    BorderShadowControl,
    ResponsiveRangeController,
    BackgroundControl,
    ColorControl,
    AdvancedControls,
    useBlockDefaults,
    withBlockContext
} from "@essential-blocks/controls";

function Slider(props) {
    const { blockDefaults, setBlockDefaults, name, deviceType, handleBlockDefault } = props;
    const {
        sliderType,
        sliderContentType,
        images,
        arrows,
        adaptiveHeight,
        autoplay,
        autoplaySpeed,
        dots,
        fade,
        infinite,
        vertical,
        pauseOnHover,
        isCustomHeight,
        speed,
        titleColor,
        subtitleColor,
        buttonColorType,
        buttonColor,
        buttonHoverColor,
        buttonBGColor,
        buttonHoverBGColor,
        overlayColor,
        arrowColorType,
        arrowColor,
        arrowHoverColor,
        dotsColor,
        dotsActiveColor,
        textAlign,
        verticalAlign,
    } = blockDefaults;
    const isDefaultSet = useBlockDefaults(name, blockDefaults, setBlockDefaults, objAttributes)

    return (
        <>
            {isDefaultSet && (
                <div className="eb-panel-control">
                    <PanelBody title={__("General", "essential-blocks")}>
                        <SelectControl
                            label={__("Slider Type", "essential-blocks")}
                            value={sliderType}
                            options={SLIDER_TYPE}
                            onChange={(value) => handleBlockDefault({ sliderType: value })}
                        />

                        <ToggleControl
                            label={__("Show Arrows", "essential-blocks")}
                            checked={arrows}
                            onChange={() => {
                                handleBlockDefault({ arrows: !arrows });
                            }}
                        />
                        <ToggleControl
                            label={__("Adaptive Height", "essential-blocks")}
                            checked={adaptiveHeight}
                            onChange={() => {
                                handleBlockDefault({
                                    adaptiveHeight: !adaptiveHeight,
                                });
                            }}
                        />

                        <ToggleControl
                            label={__("Autoplay", "essential-blocks")}
                            checked={autoplay}
                            onChange={() => {
                                autoplay ? slider.current.slickPlay() : slider.current.slickPause();
                                handleBlockDefault({ autoplay: !autoplay });
                            }}
                        />

                        <ToggleControl
                            label={__("Dots", "essential-blocks")}
                            checked={dots}
                            onChange={() => handleBlockDefault({ dots: !dots })}
                        />

                        <ToggleControl
                            label={__("Fade", "essential-blocks")}
                            checked={fade}
                            onChange={() => handleBlockDefault({ fade: !fade })}
                        />

                        <ToggleControl
                            label={__("Infinite", "essential-blocks")}
                            checked={infinite}
                            onChange={() => handleBlockDefault({ infinite: !infinite })}
                        />

                        <ToggleControl
                            label={__("Vertical Slide", "essential-blocks")}
                            checked={vertical}
                            onChange={() => handleBlockDefault({ vertical: !vertical })}
                        />

                        <ToggleControl
                            label={__("Pause on Hover", "essential-blocks")}
                            checked={pauseOnHover}
                            onChange={() =>
                                handleBlockDefault({
                                    pauseOnHover: !pauseOnHover,
                                })
                            }
                        />

                        <ToggleControl
                            label={__("Custom Height", "essential-blocks")}
                            checked={isCustomHeight}
                            onChange={() =>
                                handleBlockDefault({
                                    isCustomHeight: !isCustomHeight,
                                })
                            }
                        />

                        {isCustomHeight && (
                            <ResponsiveRangeController
                                baseLabel={__("Image Height", "essential-blocks")}
                                controlName={CUSTOM_HEIGHT}
                                units={HEIGHT_UNIT_TYPES}
                                min={1}
                                max={1200}
                                step={1}
                            />
                        )}

                        {!fade && (
                            <ResponsiveRangeController
                                baseLabel={__("Slides to Show", "essential-blocks")}
                                controlName={SLIDE_TO_SHOW}
                                units={[]}
                                min={1}
                                max={8}
                                step={1}
                            />
                        )}

                        {autoplay && (
                            <RangeControl
                                label={__("Autoplay Speed", "essential-blocks")}
                                value={autoplaySpeed}
                                onChange={(autoplaySpeed) => handleBlockDefault({ autoplaySpeed })}
                                min={0}
                                max={8000}
                            />
                        )}

                        <RangeControl
                            label={__("Animation Speed", "essential-blocks")}
                            value={speed}
                            onChange={(speed) => handleBlockDefault({ speed })}
                            min={0}
                            max={3000}
                        />
                    </PanelBody>
                    <PanelBody title={__("Settings", "essential-blocks")} initialOpen={false}>
                        <ResponsiveRangeController
                            baseLabel={__("Slides Gap", "essential-blocks")}
                            controlName={SLIDES_GAP}
                            units={[]}
                            min={0}
                            max={100}
                            step={1}
                        />

                        {sliderType === "content" && sliderContentType === "content-1" && (
                            <ColorControl
                                label={__("Overlay Color", "essential-blocks")}
                                color={overlayColor}
                                onChange={(color) =>
                                    handleBlockDefault({
                                        overlayColor: color,
                                    })
                                }
                            />
                        )}
                        {sliderType === "content" && (
                            <>
                                <PanelRow>Text Align</PanelRow>
                                <ButtonGroup>
                                    {TEXT_ALIGN.map((item, index) => (
                                        <Button
                                            key={index}
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

                                {sliderContentType != "content-2" && (
                                    <>
                                        <PanelRow>Vertical Align</PanelRow>
                                        <ButtonGroup>
                                            {VERTICAL_ALIGN.map((item, index) => (
                                                <Button
                                                    key={index}
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
                                    </>
                                )}
                            </>
                        )}
                    </PanelBody>

                    {sliderType === "content" && (
                        <>
                            <PanelBody title={__("Title Style", "essential-blocks")} initialOpen={false}>
                                <ColorControl
                                    label={__("Color", "essential-blocks")}
                                    color={titleColor}
                                    onChange={(color) =>
                                        handleBlockDefault({
                                            titleColor: color,
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

                            <PanelBody title={__("Subtitle Style", "essential-blocks")} initialOpen={false}>
                                <ColorControl
                                    label={__("Color", "essential-blocks")}
                                    color={subtitleColor}
                                    onChange={(color) =>
                                        handleBlockDefault({
                                            subtitleColor: color,
                                        })
                                    }
                                />
                                <TypographyDropdown
                                    baseLabel={__("Typography", "essential-blocks")}
                                    typographyPrefixConstant={SUBTITLE_TYPOGRAPHY}
                                />
                                <ResponsiveDimensionsControl
                                    controlName={SUBTITLE_MARGIN}
                                    baseLabel="Margin"
                                />
                            </PanelBody>

                            <PanelBody title={__("Button Style", "essential-blocks")} initialOpen={false}>
                                <ButtonGroup className="eb-inspector-btn-group">
                                    {NORMAL_HOVER.map((item, index) => (
                                        <Button
                                            key={index}
                                            isPrimary={buttonColorType === item.value}
                                            isSecondary={buttonColorType !== item.value}
                                            onClick={() =>
                                                handleBlockDefault({
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
                                            onChange={(newColor) =>
                                                handleBlockDefault({
                                                    buttonColor: newColor,
                                                })
                                            }
                                        />
                                        <ColorControl
                                            label={__("Background Color", "essential-blocks")}
                                            color={buttonBGColor}
                                            onChange={(newColor) =>
                                                handleBlockDefault({
                                                    buttonBGColor: newColor,
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
                                            onChange={(newColor) =>
                                                handleBlockDefault({
                                                    buttonHoverColor: newColor,
                                                })
                                            }
                                        />
                                        <ColorControl
                                            label={__("Background Color", "essential-blocks")}
                                            color={buttonHoverBGColor}
                                            onChange={(newColor) =>
                                                handleBlockDefault({
                                                    buttonHoverBGColor: newColor,
                                                })
                                            }
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
                            </PanelBody>
                        </>
                    )}

                    {arrows && (
                        <PanelBody title={__("Arrow Style", "essential-blocks")} initialOpen={false}>
                            <ButtonGroup className="eb-inspector-btn-group">
                                {NORMAL_HOVER.map((item, index) => (
                                    <Button
                                        key={index}
                                        isPrimary={arrowColorType === item.value}
                                        isSecondary={arrowColorType !== item.value}
                                        onClick={() =>
                                            handleBlockDefault({
                                                arrowColorType: item.value,
                                            })
                                        }
                                    >
                                        {item.label}
                                    </Button>
                                ))}
                            </ButtonGroup>

                            {arrowColorType === "normal" && (
                                <ColorControl
                                    label={__("Arrow Color", "essential-blocks")}
                                    color={arrowColor}
                                    onChange={(newColor) =>
                                        handleBlockDefault({
                                            arrowColor: newColor,
                                        })
                                    }
                                />
                            )}

                            {arrowColorType === "hover" && (
                                <ColorControl
                                    label={__("Hover Color", "essential-blocks")}
                                    color={arrowHoverColor}
                                    onChange={(newColor) =>
                                        handleBlockDefault({
                                            arrowHoverColor: newColor,
                                        })
                                    }
                                />
                            )}

                            <ResponsiveRangeController
                                baseLabel={__("Arrow Size", "essential-blocks")}
                                controlName={ARROW_SIZE}
                                units={FONT_UNIT_TYPES}
                                min={1}
                                max={50}
                                step={1}
                            />

                            <ResponsiveRangeController
                                baseLabel={__("Arrow Position", "essential-blocks")}
                                controlName={ARROW_POSITION}
                                units={UNIT_TYPES}
                                min={-50}
                                max={100}
                                step={1}
                            />
                        </PanelBody>
                    )}

                    {dots && (
                        <PanelBody title={__("Dot Style", "essential-blocks")} initialOpen={false}>
                            <ColorControl
                                label={__("Color", "essential-blocks")}
                                color={dotsColor}
                                onChange={(color) => handleBlockDefault({ dotsColor: color })}
                            />
                            <ColorControl
                                label={__("Active Color", "essential-blocks")}
                                color={dotsActiveColor}
                                onChange={(color) =>
                                    handleBlockDefault({
                                        dotsActiveColor: color,
                                    })
                                }
                            />

                            <ResponsiveRangeController
                                baseLabel={__("Dots Size", "essential-blocks")}
                                controlName={DOTS_SIZE}
                                units={FONT_UNIT_TYPES}
                                min={1}
                                max={50}
                                step={1}
                            />
                            <ResponsiveRangeController
                                baseLabel={__("Dots Gap", "essential-blocks")}
                                controlName={DOTS_GAP}
                                units={UNIT_TYPES}
                                min={0}
                                max={50}
                                step={1}
                            />
                            <ResponsiveRangeController
                                baseLabel={__("Dots Position", "essential-blocks")}
                                controlName={DOTS_POSITION}
                                units={UNIT_TYPES}
                                min={-50}
                                max={100}
                                step={1}
                            />
                        </PanelBody>
                    )}
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

export default withBlockContext(objAttributes)(Slider);
