/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
    PanelRow,
    SelectControl,
    ToggleControl,
    Button,
    ButtonGroup,
    RangeControl,
    TextControl,
    TextareaControl,
    __experimentalDivider as Divider,
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
    BUTTON2_MARGIN,
    BUTTON2_PADDING,
    BUTTON2_BORDER_SHADOW,
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
    TAGS_TYPE,
} from "./constants/constants";

import objAttributes from "./attributes";

import { TITLE_TYPOGRAPHY, SUBTITLE_TYPOGRAPHY, BUTTON_TYPOGRAPHY, BUTTON2_TYPOGRAPHY } from "./constants/typography-constant";

import {
    handleTitle,
    handleSubtitle,
    handleShowButton,
    handleButtonText,
    handleButtonURL,
    handleOpenNewTab,
    handleShowSecondButton,
    handleSecondButtonText,
    handleSecondButtonURL,
    handleSecondButtonOpenNewTab,
} from "./helpers";

import {
    ResponsiveDimensionsControl,
    TypographyDropdown,
    BorderShadowControl,
    ResponsiveRangeController,
    ColorControl,
    stripHtmlTags,
    faArrowIcons,
    EBIconPicker,
    InspectorPanel
 } from "@essential-blocks/controls";

function Inspector(props) {
    const { attributes, setAttributes, slider } = props;
    const {
        resOption,
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
        secondButtonColorType,
        secondButtonColor,
        secondButtonHoverColor,
        secondButtonBGColor,
        secondButtonHoverBGColor,
        overlayColor,
        arrowColorType,
        arrowColor,
        arrowHoverColor,
        dotsColor,
        dotsActiveColor,
        textAlign,
        verticalAlign,
        arrowPrevIcon,
        arrowNextIcon,
        titleTag,
        contentTag
    } = attributes;

    return (
        <>
        <InspectorPanel 
                advancedControlProps={{
                    marginPrefix: WRAPPER_MARGIN,
                    paddingPrefix: WRAPPER_PADDING,
                    borderPrefix: WRAPPER_BORDER_SHADOW,
                    backgroundPrefix: WRAPPER_BG,
                }}>
                <InspectorPanel.General>

                <InspectorPanel.PanelBody title={__("General", "essential-blocks")}>
                    <SelectControl
                        label={__("Slider Type", "essential-blocks")}
                        value={sliderType}
                        options={SLIDER_TYPE}
                        onChange={(value) =>
                            setAttributes({
                                sliderType: value,
                            })
                        }
                    />

                    <ToggleControl
                        label={__("Show Arrows", "essential-blocks")}
                        checked={arrows}
                        onChange={() => {
                            setAttributes({
                                arrows: !arrows,
                            });
                        }}
                    />
                    <ToggleControl
                        label={__("Adaptive Height", "essential-blocks")}
                        checked={adaptiveHeight}
                        onChange={() => {
                            setAttributes({
                                adaptiveHeight: !adaptiveHeight,
                            });
                        }}
                    />

                    <ToggleControl
                        label={__("Autoplay", "essential-blocks")}
                        checked={autoplay}
                        onChange={() => {
                            autoplay ? slider.current.slickPlay() : slider.current.slickPause();
                            setAttributes({
                                autoplay: !autoplay,
                            });
                        }}
                    />

                    <ToggleControl
                        label={__("Dots", "essential-blocks")}
                        checked={dots}
                        onChange={() => setAttributes({ dots: !dots })}
                    />

                    <ToggleControl
                        label={__("Fade", "essential-blocks")}
                        checked={fade}
                        onChange={() => setAttributes({ fade: !fade })}
                    />

                    <ToggleControl
                        label={__("Infinite", "essential-blocks")}
                        checked={infinite}
                        onChange={() =>
                            setAttributes({
                                infinite: !infinite,
                            })
                        }
                    />

                    <ToggleControl
                        label={__("Vertical Slide", "essential-blocks")}
                        checked={vertical}
                        onChange={() =>
                            setAttributes({
                                vertical: !vertical,
                            })
                        }
                    />

                    <ToggleControl
                        label={__("Pause on Hover", "essential-blocks")}
                        checked={pauseOnHover}
                        onChange={() =>
                            setAttributes({
                                pauseOnHover: !pauseOnHover,
                            })
                        }
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
                            onChange={(autoplaySpeed) =>
                                setAttributes({
                                    autoplaySpeed,
                                })
                            }
                            min={0}
                            max={8000}
                        />
                    )}

                    <RangeControl
                        label={__("Animation Speed", "essential-blocks")}
                        value={speed}
                        onChange={(speed) => setAttributes({ speed })}
                        min={0}
                        max={3000}
                    />

                    {arrows && (
                        <>
                            <EBIconPicker
                                value={arrowPrevIcon}
                                onChange={(arrowPrevIcon) =>
                                    setAttributes({
                                        arrowPrevIcon,
                                    })
                                }
                                title={__("Arrow Prev Icon", "essential-blocks")}
                                icons={{ fontAwesome: faArrowIcons }}
                                disableDashicon={true}
                            />
                            <EBIconPicker
                                value={arrowNextIcon}
                                onChange={(arrowNextIcon) =>
                                    setAttributes({
                                        arrowNextIcon,
                                    })
                                }
                                title={__("Arrow Next Icon", "essential-blocks")}
                                icons={{ fontAwesome: faArrowIcons }}
                                disableDashicon={true}
                            />
                        </>
                    )}
                </InspectorPanel.PanelBody>

                <InspectorPanel.PanelBody title={__("Slides", "essential-blocks")}>
                    {sliderType === "content" && (
                        <>
                            <SelectControl
                                label={__("Content Styles", "essential-blocks")}
                                value={sliderContentType}
                                options={SLIDER_CONTENT_TYPE}
                                onChange={(value) =>
                                    setAttributes({
                                        sliderContentType: value,
                                    })
                                }
                            />

                            <SelectControl
                                label={__("Title Tag", "essential-blocks")}
                                value={titleTag}
                                options={TAGS_TYPE}
                                onChange={(titleTag) => {
                                    setAttributes({
                                        titleTag
                                    });
                                }}
                            />
                            <SelectControl
                                label={__("Content Tag", "essential-blocks")}
                                value={contentTag}
                                options={TAGS_TYPE}
                                onChange={(contentTag) => {
                                    setAttributes({
                                        contentTag,
                                    });
                                }}
                            />

                            <Divider />
                        </>
                    )}
                    {images.map((item, index) => {
                        return (
                            <InspectorPanel.PanelBody
                                title={
                                    item.title && item.title.length > 0
                                        ? stripHtmlTags(item.title)
                                        : "Slider " + (index + 1)
                                }
                                initialOpen={false}
                                onToggle={() =>
                                    setAttributes({
                                        initialSlide: index,
                                    })
                                }
                                className="eb-slider-item-single-panel"
                                key={index}
                            >
                                {sliderType === "content" && (
                                    <>
                                        <TextControl
                                            label={__("Title Text", "essential-blocks")}
                                            value={item.title}
                                            onChange={(text) =>
                                                handleTitle(text, index, images, setAttributes)
                                            }
                                        />
                                        <TextareaControl
                                            label={__("Subtitle", "essential-blocks")}
                                            value={item.subtitle}
                                            onChange={(text) =>
                                                handleSubtitle(text, index, images, setAttributes)
                                            }
                                        />
                                        <ToggleControl
                                            label={__("Show Button", "essential-blocks")}
                                            checked={item.showButton}
                                            onChange={() =>
                                                handleShowButton(
                                                    !item.showButton,
                                                    index,
                                                    images,
                                                    setAttributes
                                                )
                                            }
                                        />
                                        {item.showButton && (
                                            <>
                                                <TextControl
                                                    label={__("Button Text", "essential-blocks")}
                                                    value={item.buttonText}
                                                    onChange={(text) =>
                                                        handleButtonText(
                                                            text,
                                                            index,
                                                            images,
                                                            setAttributes
                                                        )
                                                    }
                                                />
                                                <TextControl
                                                    label={__("Button URL", "essential-blocks")}
                                                    value={item.buttonUrl}
                                                    onChange={(text) =>
                                                        handleButtonURL(
                                                            text,
                                                            index,
                                                            images,
                                                            setAttributes
                                                        )
                                                    }
                                                />
                                                {item.buttonUrl &&
                                                    item.buttonUrl.length > 0 &&
                                                    !item.isValidUrl && (
                                                        <span className="error">
                                                            URL is not valid
                                                        </span>
                                                    )}
                                                <ToggleControl
                                                    label={__(
                                                        "Open in New Tab",
                                                        "essential-blocks"
                                                    )}
                                                    checked={item.openNewTab}
                                                    onChange={() =>
                                                        handleOpenNewTab(
                                                            !item.openNewTab,
                                                            index,
                                                            images,
                                                            setAttributes
                                                        )
                                                    }
                                                />

                                                <ToggleControl
                                                    label={__(
                                                        "Add Second Button",
                                                        "essential-blocks"
                                                    )}
                                                    checked={
                                                        item.showSecondButton
                                                    }
                                                    onChange={() =>
                                                        handleShowSecondButton(
                                                            !item.showSecondButton,
                                                            index,
                                                            images,
                                                            setAttributes
                                                        )
                                                    }
                                                />

                                                {item.showSecondButton && (
                                                    <>
                                                        <TextControl
                                                            label={__(
                                                                "Second Button Text",
                                                                "essential-blocks"
                                                            )}
                                                            value={
                                                                item.secondButtonText
                                                            }
                                                            onChange={(
                                                                text
                                                            ) =>
                                                                handleSecondButtonText(
                                                                    text,
                                                                    index,
                                                                    images,
                                                                    setAttributes
                                                                )
                                                            }
                                                        />
                                                        <TextControl
                                                            label={__(
                                                                "Second Button URL",
                                                                "essential-blocks"
                                                            )}
                                                            value={
                                                                item.secondButtonUrl
                                                            }
                                                            onChange={(
                                                                text
                                                            ) =>
                                                                handleSecondButtonURL(
                                                                    text,
                                                                    index,
                                                                    images,
                                                                    setAttributes
                                                                )
                                                            }
                                                        />
                                                        {item.secondButtonUrl &&
                                                            item
                                                                .secondButtonUrl
                                                                .length >
                                                            0 &&
                                                            !item.isValidUrl && (
                                                                <span className="error">
                                                                    URL
                                                                    is
                                                                    not
                                                                    valid
                                                                </span>
                                                            )}
                                                        <ToggleControl
                                                            label={__(
                                                                "Open in New Tab",
                                                                "essential-blocks"
                                                            )}
                                                            checked={
                                                                item.secondButtonOpenNewTab
                                                            }
                                                            onChange={() =>
                                                                handleSecondButtonOpenNewTab(
                                                                    !item.secondButtonOpenNewTab,
                                                                    index,
                                                                    images,
                                                                    setAttributes
                                                                )
                                                            }
                                                        />
                                                    </>
                                                )}
                                            </>
                                        )}
                                    </>
                                )}
                                {sliderType === "image" && (
                                    <>
                                        <TextControl
                                            label={__("URL", "essential-blocks")}
                                            value={item.buttonUrl}
                                            onChange={(text) =>
                                                handleButtonURL(text, index, images, setAttributes)
                                            }
                                        />
                                        {item.buttonUrl &&
                                            item.buttonUrl.length > 0 &&
                                            !item.isValidUrl && (
                                                <span className="error">URL is not valid</span>
                                            )}
                                        <ToggleControl
                                            label={__("Open in New Tab", "essential-blocks")}
                                            checked={item.openNewTab}
                                            onChange={() =>
                                                handleOpenNewTab(
                                                    !item.openNewTab,
                                                    index,
                                                    images,
                                                    setAttributes
                                                )
                                            }
                                        />
                                    </>
                                )}
                            </InspectorPanel.PanelBody>
                        );
                    })}
                </InspectorPanel.PanelBody>
                </InspectorPanel.General>
                <InspectorPanel.Style>
                    <InspectorPanel.PanelBody title={__("Settings", "essential-blocks")} initialOpen={true}>
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
                            attributeName={'overlayColor'}
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
                                            setAttributes({
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
                                                    setAttributes({
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
                    </InspectorPanel.PanelBody>

                    {sliderType === "content" && (
                        <>
                            <InspectorPanel.PanelBody title={__("Title", "essential-blocks")} initialOpen={false}>
                                <ColorControl
                                    label={__("Color", "essential-blocks")}
                                    color={titleColor}
                                    attributeName={'titleColor'}
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

                            <InspectorPanel.PanelBody title={__("Subtitle", "essential-blocks")} initialOpen={false}>
                                <ColorControl
                                    label={__("Color", "essential-blocks")}
                                    color={subtitleColor}
                                    attributeName={'subtitleColor'}
                                />

                                <TypographyDropdown
                                    baseLabel={__("Typography", "essential-blocks")}
                                    typographyPrefixConstant={SUBTITLE_TYPOGRAPHY}
                                />
                                <ResponsiveDimensionsControl
                                    controlName={SUBTITLE_MARGIN}
                                    baseLabel="Margin"
                                />
                            </InspectorPanel.PanelBody>

                            <InspectorPanel.PanelBody title={__("Button", "essential-blocks")} initialOpen={false}>
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
                                            color={buttonBGColor}
                                            attributeName={'buttonBGColor'}
                                        />
                                    </>
                                )}

                                {buttonColorType === "hover" && (
                                    <>
                                        <ColorControl
                                            label={__("Color", "essential-blocks")}
                                            color={buttonHoverColor}
                                            attributeName={'buttonHoverColor'}
                                        />
                                        <ColorControl
                                            label={__("Background Color", "essential-blocks")}
                                            color={buttonHoverBGColor}
                                            attributeName={'buttonHoverBGColor'}
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

                                <InspectorPanel.PanelBody
                                    title={__(
                                        "Second Button",
                                        "essential-blocks"
                                    )}
                                    initialOpen={false}
                                >
                                    <ButtonGroup className="eb-inspector-btn-group">
                                        {NORMAL_HOVER.map(
                                            (item, index) => (
                                                <Button
                                                    key={index}
                                                    isPrimary={
                                                        secondButtonColorType ===
                                                        item.value
                                                    }
                                                    isSecondary={
                                                        secondButtonColorType !==
                                                        item.value
                                                    }
                                                    onClick={() =>
                                                        setAttributes(
                                                            {
                                                                secondButtonColorType:
                                                                    item.value,
                                                            }
                                                        )
                                                    }
                                                >
                                                    {item.label}
                                                </Button>
                                            )
                                        )}
                                    </ButtonGroup>


                                    {secondButtonColorType === "normal" && (
                                        <>
                                            <ColorControl
                                                label={__("Color", "essential-blocks")}
                                                color={secondButtonColor}
                                                attributeName={'secondButtonColor'}
                                            />
                                            <ColorControl
                                                label={__("Background Color", "essential-blocks")}
                                                color={secondButtonBGColor}
                                                attributeName={'secondButtonBGColor'}
                                            />
                                        </>
                                    )}

                                    {secondButtonColorType === "hover" && (
                                        <>
                                            <ColorControl
                                                label={__("Color", "essential-blocks")}
                                                color={secondButtonHoverColor}
                                                attributeName={'secondButtonHoverColor'}
                                            />
                                            <ColorControl
                                                label={__("Background Color", "essential-blocks")}
                                                color={secondButtonHoverBGColor}
                                                attributeName={'secondButtonHoverBGColor'}
                                            />
                                        </>
                                    )}
                                    <PanelRow>
                                        Button Border & Shadow
                                    </PanelRow>
                                    <BorderShadowControl
                                        controlName={
                                            BUTTON2_BORDER_SHADOW
                                        }
                                    // noShadow
                                    // noBorder
                                    />
                                    <TypographyDropdown
                                        baseLabel={__(
                                            "Typography",
                                            "essential-blocks"
                                        )}
                                        typographyPrefixConstant={
                                            BUTTON2_TYPOGRAPHY
                                        }
                                    />
                                    <ResponsiveDimensionsControl
                                        controlName={
                                            BUTTON2_MARGIN
                                        }
                                        baseLabel="Margin"
                                    />
                                    <ResponsiveDimensionsControl
                                        controlName={
                                            BUTTON2_PADDING
                                        }
                                        baseLabel="Padding"
                                    />
                                </InspectorPanel.PanelBody>
                            </InspectorPanel.PanelBody>
                        </>
                    )}

                    {arrows && (
                        <InspectorPanel.PanelBody title={__("Arrow", "essential-blocks")} initialOpen={false}>
                            <ButtonGroup className="eb-inspector-btn-group">
                                {NORMAL_HOVER.map((item, index) => (
                                    <Button
                                        key={index}
                                        isPrimary={arrowColorType === item.value}
                                        isSecondary={arrowColorType !== item.value}
                                        onClick={() =>
                                            setAttributes({
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
                                    label={__("Color", "essential-blocks")}
                                    color={arrowColor}
                                    attributeName={'arrowColor'}
                                />
                            )}

                            {arrowColorType === "hover" && (
                                <ColorControl
                                    label={__("Hover Color", "essential-blocks")}
                                    color={arrowHoverColor}
                                    attributeName={'arrowHoverColor'}
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
                        </InspectorPanel.PanelBody>
                    )}

                    {dots && (
                            <InspectorPanel.PanelBody title={__("Dot", "essential-blocks")} initialOpen={false}>
                                <ColorControl
                                    label={__("Color", "essential-blocks")}
                                    color={dotsColor}
                                    attributeName={'dotsColor'}
                                />
                                <ColorControl
                                    label={__("Active Color", "essential-blocks")}
                                    color={dotsActiveColor}
                                    attributeName={'dotsActiveColor'}
                                />

                                <ResponsiveRangeController
                                    baseLabel={__(
                                        "Dots Size",
                                        "essential-blocks"
                                    )}
                                    controlName={DOTS_SIZE}
                                    units={FONT_UNIT_TYPES}
                                    min={1}
                                    max={50}
                                    step={1}
                                />
                                <ResponsiveRangeController
                                    baseLabel={__(
                                        "Dots Gap",
                                        "essential-blocks"
                                    )}
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
                            </InspectorPanel.PanelBody>
                    )}
                </InspectorPanel.Style>
            </InspectorPanel>
        </>
        
    );
}

export default Inspector;
