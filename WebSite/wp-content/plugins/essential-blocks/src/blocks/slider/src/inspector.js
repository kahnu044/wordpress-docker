/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
    PanelRow,
    SelectControl,
    ToggleControl,
    RangeControl,
    TextControl,
    __experimentalDivider as Divider,
    __experimentalToggleGroupControl as ToggleGroupControl,
    __experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from "@wordpress/components";
import { applyFilters } from "@wordpress/hooks";

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
    SLIDER_BORDER_SHADOW,
    IMAGE_WIDTH,
    SLIDER_STYLE
} from "./constants/constants";

import {
    TITLE_TYPOGRAPHY,
    SUBTITLE_TYPOGRAPHY,
    BUTTON_TYPOGRAPHY,
    BUTTON2_TYPOGRAPHY,
} from "./constants/typography-constant";

import { handleImageData, handleImage } from "./helpers";

import {
    ResponsiveDimensionsControl,
    TypographyDropdown,
    BorderShadowControl,
    ResponsiveRangeController,
    ColorControl,
    faArrowIcons,
    dashiconsArrows,
    EBIconPicker,
    InspectorPanel,
    isValidHtml,
    SortControl,
    sanitizeIconValue,
    ImageComponent,
    EBTextControl,
    ProSelectControl
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
        contentTag,
        showLightbox,
        enableLazyLoad,
        version,
        sliderStyle,
        slidesGapRange
    } = attributes;

    // Add this function to get the settings components for each slide
    const getSliderItemsComponents = () => {
        return images.map((each, i) => (
            <div key={i}>
                <PanelRow>{__("Image", "essential-blocks")}</PanelRow>
                <ImageComponent.GeneralTab
                    onSelect={(value) =>
                        handleImage(value, i, images, setAttributes)
                    }
                    value={
                        !each.url || each.url.startsWith("data:image/")
                            ? each.id
                            : each.url
                    }
                    hasTag={false}
                    hasCaption={false}
                    hasStyle={false}
                    hasLink={false}
                    showInPanel={false}
                />

                {sliderType === "content" && (
                    <>
                        <EBTextControl
                            label={__("Title", "essential-blocks")}
                            value={each.title}
                            onChange={(value) =>
                                handleImageData(
                                    "title",
                                    value,
                                    each.id,
                                    images,
                                    setAttributes,
                                )
                            }
                            enableAi={true}
                        />

                        {!isValidHtml(each.title) && (
                            <PanelRow className="eb-instruction-row">
                                <div className="eb-instruction">
                                    <strong>Note:</strong> Invalid HTML Tag.
                                </div>
                            </PanelRow>
                        )}

                        <EBTextControl
                            label={__("Subtitle", "essential-blocks")}
                            value={each.subtitle}
                            onChange={(value) =>
                                handleImageData(
                                    "subtitle",
                                    value,
                                    each.id,
                                    images,
                                    setAttributes,
                                )
                            }
                            enableAi={true}
                        />

                        {!isValidHtml(each.subtitle) && (
                            <PanelRow className="eb-instruction-row">
                                <div className="eb-instruction">
                                    <strong>Note:</strong> Invalid HTML Tag.
                                </div>
                            </PanelRow>
                        )}

                        <ToggleControl
                            label={__("Show Button", "essential-blocks")}
                            checked={each.showButton}
                            onChange={() =>
                                handleImageData(
                                    "showButton",
                                    !each.showButton,
                                    each.id,
                                    images,
                                    setAttributes,
                                )
                            }
                            __nextHasNoMarginBottom
                        />

                        {each.showButton && (
                            <>
                                <EBTextControl
                                    label={__(
                                        "Button Text",
                                        "essential-blocks",
                                    )}
                                    value={each.buttonText}
                                    onChange={(value) =>
                                        handleImageData(
                                            "buttonText",
                                            value,
                                            each.id,
                                            images,
                                            setAttributes,
                                        )
                                    }
                                    enableAi={true}
                                />

                                {!isValidHtml(each.buttonText) && (
                                    <PanelRow className="eb-instruction-row">
                                        <div className="eb-instruction">
                                            <strong>Note:</strong> Invalid HTML
                                            Tag.
                                        </div>
                                    </PanelRow>
                                )}

                                <EBTextControl
                                    label={__("Button URL", "essential-blocks")}
                                    fieldType="url"
                                    value={each.buttonUrl}
                                    onChange={(value) =>
                                        handleImageData(
                                            "buttonUrl",
                                            value,
                                            each.id,
                                            images,
                                            setAttributes,
                                        )
                                    }
                                    placeholder="https://example.com"
                                    help={__(
                                        "Enter a valid URL.",
                                        "essential-blocks",
                                    )}
                                    showValidation={true}
                                    enableSecurity={true}
                                />

                                {each.buttonUrl &&
                                    each.buttonUrl.length > 0 &&
                                    !each.isValidUrl && (
                                        <span className="error">
                                            {__(
                                                "URL is not valid",
                                                "essential-blocks",
                                            )}
                                        </span>
                                    )}

                                <ToggleControl
                                    label={__(
                                        "Open in New Tab",
                                        "essential-blocks",
                                    )}
                                    checked={each.openNewTab}
                                    onChange={() =>
                                        handleImageData(
                                            "openNewTab",
                                            !each.openNewTab,
                                            each.id,
                                            images,
                                            setAttributes,
                                        )
                                    }
                                    __nextHasNoMarginBottom
                                />

                                <ToggleControl
                                    label={__(
                                        "Add Second Button",
                                        "essential-blocks",
                                    )}
                                    checked={each.showSecondButton}
                                    onChange={(value) =>
                                        handleImageData(
                                            "showSecondButton",
                                            value,
                                            each.id,
                                            images,
                                            setAttributes,
                                        )
                                    }
                                    __nextHasNoMarginBottom
                                />

                                {each.showSecondButton && (
                                    <>
                                        <TextControl
                                            label={__(
                                                "Second Button Text",
                                                "essential-blocks",
                                            )}
                                            value={each.secondButtonText}
                                            onChange={(value) =>
                                                handleImageData(
                                                    "secondButtonText",
                                                    value,
                                                    each.id,
                                                    images,
                                                    setAttributes,
                                                )
                                            }
                                            __next40pxDefaultSize
                                            __nextHasNoMarginBottom
                                        />

                                        {!isValidHtml(
                                            each.secondButtonText,
                                        ) && (
                                                <PanelRow className="eb-instruction-row">
                                                    <div className="eb-instruction">
                                                        <strong>Note:</strong>{" "}
                                                        Invalid HTML Tag.
                                                    </div>
                                                </PanelRow>
                                            )}

                                        <EBTextControl
                                            label={__(
                                                "Second Button URL",
                                                "essential-blocks",
                                            )}
                                            fieldType="url"
                                            value={each.secondButtonUrl}
                                            onChange={(value) =>
                                                handleImageData(
                                                    "secondButtonUrl",
                                                    value,
                                                    each.id,
                                                    images,
                                                    setAttributes,
                                                )
                                            }
                                            placeholder="https://example.com"
                                            help={__(
                                                "Enter a valid URL.",
                                                "essential-blocks",
                                            )}
                                            showValidation={true}
                                            enableSecurity={true}
                                        />

                                        {each.secondButtonUrl &&
                                            each.secondButtonUrl.length > 0 &&
                                            !each.isValidUrl && (
                                                <span className="error">
                                                    {__(
                                                        "URL is not valid",
                                                        "essential-blocks",
                                                    )}
                                                </span>
                                            )}

                                        <ToggleControl
                                            label={__(
                                                "Open in New Tab",
                                                "essential-blocks",
                                            )}
                                            checked={
                                                each.secondButtonOpenNewTab
                                            }
                                            onChange={() =>
                                                handleImageData(
                                                    "secondButtonOpenNewTab",
                                                    !each.secondButtonOpenNewTab,
                                                    each.id,
                                                    images,
                                                    setAttributes,
                                                )
                                            }
                                            __nextHasNoMarginBottom
                                        />
                                    </>
                                )}
                            </>
                        )}

                        {sliderContentType === "content-1" && (
                            <>
                                <ToggleControl
                                    label={__(
                                        "Enable Content Link",
                                        "essential-blocks",
                                    )}
                                    checked={each.enableContentLink}
                                    onChange={() =>
                                        handleImageData(
                                            "enableContentLink",
                                            !each.enableContentLink,
                                            each.id,
                                            images,
                                            setAttributes,
                                        )
                                    }
                                    __nextHasNoMarginBottom
                                />

                                {each.enableContentLink && (
                                    <>
                                        <EBTextControl
                                            label={__(
                                                "Content Link",
                                                "essential-blocks",
                                            )}
                                            fieldType="url"
                                            value={each.contentLink}
                                            onChange={(value) =>
                                                handleImageData(
                                                    "contentLink",
                                                    value,
                                                    each.id,
                                                    images,
                                                    setAttributes,
                                                )
                                            }
                                            placeholder="https://example.com"
                                            help={__(
                                                "Enter a valid URL.",
                                                "essential-blocks",
                                            )}
                                            showValidation={true}
                                            enableSecurity={true}
                                        />

                                        {each.contentLink &&
                                            each.contentLink.length > 0 &&
                                            !each.isContentUrlValid && (
                                                <span className="error">
                                                    {__(
                                                        "URL is not valid",
                                                        "essential-blocks",
                                                    )}
                                                </span>
                                            )}

                                        <ToggleControl
                                            label={__(
                                                "Open in New Tab",
                                                "essential-blocks",
                                            )}
                                            checked={each.contentOpenNewTab}
                                            onChange={() =>
                                                handleImageData(
                                                    "contentOpenNewTab",
                                                    !each.contentOpenNewTab,
                                                    each.id,
                                                    images,
                                                    setAttributes,
                                                )
                                            }
                                            __nextHasNoMarginBottom
                                        />
                                    </>
                                )}
                            </>
                        )}
                    </>
                )}

                {sliderType === "image" && (
                    <>
                        <EBTextControl
                            label={__("URL", "essential-blocks")}
                            fieldType="url"
                            value={each.buttonUrl}
                            onChange={(value) =>
                                handleImageData(
                                    "buttonUrl",
                                    value,
                                    each.id,
                                    images,
                                    setAttributes,
                                )
                            }
                            placeholder="https://example.com"
                            help={__("Enter a valid URL.", "essential-blocks")}
                            showValidation={true}
                            enableSecurity={true}
                        />

                        {each.buttonUrl &&
                            each.buttonUrl.length > 0 &&
                            !each.isValidUrl && (
                                <span className="error">
                                    {__("URL is not valid", "essential-blocks")}
                                </span>
                            )}

                        <ToggleControl
                            label={__("Open in New Tab", "essential-blocks")}
                            checked={each.openNewTab}
                            onChange={() =>
                                handleImageData(
                                    "openNewTab",
                                    !each.openNewTab,
                                    each.id,
                                    images,
                                    setAttributes,
                                )
                            }
                            __nextHasNoMarginBottom
                        />
                    </>
                )}
            </div>
        ));
    };

    return (
        <>
            <InspectorPanel
                advancedControlProps={{
                    marginPrefix: WRAPPER_MARGIN,
                    paddingPrefix: WRAPPER_PADDING,
                    borderPrefix: WRAPPER_BORDER_SHADOW,
                    backgroundPrefix: WRAPPER_BG,
                }}
            >
                <InspectorPanel.General>
                    <InspectorPanel.PanelBody
                        title={__("General", "essential-blocks")}
                        initialOpen={true}
                    >
                        <ProSelectControl
                            label={__("Slider Type", "essential-blocks")}
                            value={sliderStyle}
                            options={SLIDER_STYLE}
                            onChange={(value) =>
                                setAttributes({
                                    sliderStyle: value,
                                    speed: value === 'default-slider' ? speed : .5,
                                    enableLazyLoad: value === 'default-slider' ? enableLazyLoad : false,
                                    slidesGapRange: value === 'default-slider' ? slidesGapRange : 20,
                                })
                            }
                        />

                        <SelectControl
                            label={__("Slider Content Type", "essential-blocks")}
                            value={sliderType}
                            options={SLIDER_TYPE}
                            onChange={(value) =>
                                setAttributes({
                                    sliderType: value,
                                })
                            }
                            __next40pxDefaultSize
                            __nextHasNoMarginBottom
                        />

                        {sliderStyle === 'default-slider' && (
                            <>
                                <ToggleControl
                                    label={__("Show Arrows", "essential-blocks")}
                                    checked={arrows}
                                    onChange={() => {
                                        setAttributes({
                                            arrows: !arrows,
                                        });
                                    }}
                                    __nextHasNoMarginBottom
                                />
                                <ToggleControl
                                    label={__("Adaptive Height", "essential-blocks")}
                                    checked={adaptiveHeight}
                                    onChange={() => {
                                        setAttributes({
                                            adaptiveHeight: !adaptiveHeight,
                                        });
                                    }}
                                    __nextHasNoMarginBottom
                                />

                                <ToggleControl
                                    label={__("Autoplay", "essential-blocks")}
                                    checked={autoplay}
                                    onChange={() => {
                                        autoplay
                                            ? slider.current.slickPlay()
                                            : slider.current.slickPause();
                                        setAttributes({
                                            autoplay: !autoplay,
                                        });
                                    }}
                                    __nextHasNoMarginBottom
                                />

                                <ToggleControl
                                    label={__("Dots", "essential-blocks")}
                                    checked={dots}
                                    onChange={() => setAttributes({ dots: !dots })}
                                    __nextHasNoMarginBottom
                                />

                                {!vertical && (
                                    <ToggleControl
                                        label={__("Fade", "essential-blocks")}
                                        checked={fade}
                                        onChange={() => setAttributes({ fade: !fade })}
                                        __nextHasNoMarginBottom
                                    />
                                )}

                                <ToggleControl
                                    label={__("Infinite", "essential-blocks")}
                                    checked={infinite}
                                    onChange={() =>
                                        setAttributes({
                                            infinite: !infinite,
                                        })
                                    }
                                    __nextHasNoMarginBottom
                                />

                                <ToggleControl
                                    label={__("Vertical Slide", "essential-blocks")}
                                    checked={vertical}
                                    onChange={() =>
                                        setAttributes({
                                            vertical: !vertical,
                                        })
                                    }
                                    __nextHasNoMarginBottom
                                />

                                {vertical && (
                                    <PanelRow>
                                        <em>
                                            {__(
                                                "Fade will disable if enable Vertical Slide",
                                                "essential-blocks",
                                            )}
                                        </em>
                                    </PanelRow>
                                )}

                                <ToggleControl
                                    label={__("Pause on Hover", "essential-blocks")}
                                    checked={pauseOnHover}
                                    onChange={() =>
                                        setAttributes({
                                            pauseOnHover: !pauseOnHover,
                                        })
                                    }
                                    __nextHasNoMarginBottom
                                />

                                <ToggleControl
                                    label={__(
                                        "Enable Lazy Loading",
                                        "essential-blocks",
                                    )}
                                    checked={enableLazyLoad}
                                    onChange={() => {
                                        setAttributes({
                                            enableLazyLoad: !enableLazyLoad,
                                        });
                                    }}
                                    __nextHasNoMarginBottom
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

                            </>
                        )}


                        {applyFilters("eb_slider_pro_marquee_controls", "", attributes, setAttributes)}

                        {sliderStyle === 'default-slider' && isCustomHeight && (
                            <ResponsiveRangeController
                                baseLabel={__(
                                    "Image Height",
                                    "essential-blocks",
                                )}
                                controlName={CUSTOM_HEIGHT}
                                units={HEIGHT_UNIT_TYPES}
                                min={1}
                                max={1200}
                                step={1}
                            />
                        )}

                        {sliderStyle === 'default-slider' && !fade && (
                            <ResponsiveRangeController
                                baseLabel={__(
                                    "Slides to Show",
                                    "essential-blocks",
                                )}
                                controlName={SLIDE_TO_SHOW}
                                units={[]}
                                min={1}
                                max={8}
                                step={1}
                            />
                        )}

                        {sliderStyle === 'default-slider' && autoplay && (
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
                                __nextHasNoMarginBottom
                                __next40pxDefaultSize
                            />
                        )}

                        <RangeControl
                            label={__("Animation Speed", "essential-blocks")}
                            value={speed}
                            onChange={(speed) => setAttributes({ speed })}
                            min={0}
                            step={sliderStyle === 'default-slider' ? 1 : .1}
                            max={sliderStyle === 'default-slider' ? 3000 : 1}
                            __nextHasNoMarginBottom
                            __next40pxDefaultSize
                        />

                        {sliderStyle === 'default-slider' && arrows && (
                            <>
                                <EBIconPicker
                                    value={arrowPrevIcon}
                                    onChange={(iconValue) =>
                                        setAttributes({
                                            arrowPrevIcon:
                                                sanitizeIconValue(iconValue),
                                        })
                                    }
                                    title={__(
                                        "Arrow Prev Icon",
                                        "essential-blocks",
                                    )}
                                    icons={{
                                        fontAwesome: faArrowIcons,
                                        dashIcon: dashiconsArrows,
                                    }}
                                />
                                <EBIconPicker
                                    value={arrowNextIcon}
                                    onChange={(iconValue) =>
                                        setAttributes({
                                            arrowNextIcon:
                                                sanitizeIconValue(iconValue),
                                        })
                                    }
                                    title={__(
                                        "Arrow Next Icon",
                                        "essential-blocks",
                                    )}
                                    icons={{
                                        fontAwesome: faArrowIcons,
                                        dashIcon: dashiconsArrows,
                                    }}
                                />
                            </>
                        )}

                        {sliderStyle === 'default-slider' && (!version || version !== 'v2') && (
                            <>
                                <Divider />

                                <ToggleControl
                                    label={__(
                                        "Show Lightbox",
                                        "essential-blocks",
                                    )}
                                    checked={showLightbox}
                                    onChange={() => {
                                        setAttributes({
                                            showLightbox: !showLightbox,
                                        });
                                    }}
                                    __nextHasNoMarginBottom
                                />
                            </>
                        )}
                    </InspectorPanel.PanelBody>

                    <InspectorPanel.PanelBody
                        title={__("Slides", "essential-blocks")}
                        initialOpen={true}
                    >
                        {sliderType === "content" && (
                            <>
                                <SelectControl
                                    label={__(
                                        "Content Styles",
                                        "essential-blocks",
                                    )}
                                    value={sliderContentType}
                                    options={SLIDER_CONTENT_TYPE}
                                    onChange={(value) =>
                                        setAttributes({
                                            sliderContentType: value,
                                            showLightbox: value === 'content-1' ? false : showLightbox,
                                        })
                                    }
                                    __next40pxDefaultSize
                                    __nextHasNoMarginBottom
                                />

                                <SelectControl
                                    label={__("Title Tag", "essential-blocks")}
                                    value={titleTag}
                                    options={TAGS_TYPE}
                                    onChange={(titleTag) => {
                                        setAttributes({
                                            titleTag,
                                        });
                                    }}
                                    __next40pxDefaultSize
                                    __nextHasNoMarginBottom
                                />
                                <SelectControl
                                    label={__(
                                        "Content Tag",
                                        "essential-blocks",
                                    )}
                                    value={contentTag}
                                    options={TAGS_TYPE}
                                    onChange={(contentTag) => {
                                        setAttributes({
                                            contentTag,
                                        });
                                    }}
                                    __next40pxDefaultSize
                                    __nextHasNoMarginBottom
                                />

                                <Divider />
                            </>
                        )}
                        <SortControl
                            items={attributes.images}
                            onSortEnd={(newImages) =>
                                setAttributes({ images: newImages })
                            }
                            onDeleteItem={(index) => {
                                setAttributes({
                                    images: images.filter(
                                        (_, i) => i !== index,
                                    ),
                                });
                            }}
                            hasSettings={true}
                            settingsComponents={getSliderItemsComponents()}
                            labelKey={"title"}
                            preserveLabels={true}
                            hasAddButton={false}
                        />
                    </InspectorPanel.PanelBody>
                </InspectorPanel.General>
                <InspectorPanel.Style>
                    <InspectorPanel.PanelBody
                        title={__("Settings", "essential-blocks")}
                        initialOpen={true}
                    >
                        <ResponsiveRangeController
                            baseLabel={__("Slides Gap", "essential-blocks")}
                            controlName={SLIDES_GAP}
                            units={[]}
                            min={0}
                            max={100}
                            step={1}
                        />

                        {sliderType === "content" &&
                            sliderContentType === "content-1" && (
                                <ColorControl
                                    label={__(
                                        "Overlay Color",
                                        "essential-blocks",
                                    )}
                                    color={overlayColor}
                                    attributeName={"overlayColor"}
                                />
                            )}
                        {sliderType === "content" && (
                            <>
                                <ToggleGroupControl
                                    label="Text Align"

                                    value={textAlign}
                                    onChange={(value) =>
                                        setAttributes({
                                            textAlign: value,
                                        })
                                    }
                                    isBlock
                                    __next40pxDefaultSize
                                    __nextHasNoMarginBottom
                                >
                                    {TEXT_ALIGN.map((item, index) => (
                                        <ToggleGroupControlOption
                                            key={index}
                                            value={item.value}
                                            label={item.label}
                                        />
                                    ))}
                                </ToggleGroupControl>

                                {sliderContentType != "content-2" && (
                                    <>
                                        <ToggleGroupControl
                                            label="Vertical Align"

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
                                            {VERTICAL_ALIGN.map(
                                                (item, index) => (
                                                    <ToggleGroupControlOption
                                                        key={index}
                                                        value={item.value}
                                                        label={item.label}
                                                    />
                                                ),
                                            )}
                                        </ToggleGroupControl>
                                    </>
                                )}
                            </>
                        )}

                        <Divider />
                        <BorderShadowControl
                            controlName={SLIDER_BORDER_SHADOW}
                            noBdrHover
                            noShadow
                        />
                    </InspectorPanel.PanelBody>

                    {sliderType === "content" && (
                        <>
                            <InspectorPanel.PanelBody
                                title={__("Title", "essential-blocks")}
                                initialOpen={false}
                            >
                                <ColorControl
                                    label={__("Color", "essential-blocks")}
                                    color={titleColor}
                                    attributeName={"titleColor"}
                                />

                                <TypographyDropdown
                                    baseLabel={__(
                                        "Typography",
                                        "essential-blocks",
                                    )}
                                    typographyPrefixConstant={TITLE_TYPOGRAPHY}
                                />
                                <ResponsiveDimensionsControl
                                    controlName={TITLE_MARGIN}
                                    baseLabel="Margin"
                                />
                            </InspectorPanel.PanelBody>

                            <InspectorPanel.PanelBody
                                title={__("Subtitle", "essential-blocks")}
                                initialOpen={false}
                            >
                                <ColorControl
                                    label={__("Color", "essential-blocks")}
                                    color={subtitleColor}
                                    attributeName={"subtitleColor"}
                                />

                                <TypographyDropdown
                                    baseLabel={__(
                                        "Typography",
                                        "essential-blocks",
                                    )}
                                    typographyPrefixConstant={
                                        SUBTITLE_TYPOGRAPHY
                                    }
                                />
                                <ResponsiveDimensionsControl
                                    controlName={SUBTITLE_MARGIN}
                                    baseLabel="Margin"
                                />
                            </InspectorPanel.PanelBody>

                            <InspectorPanel.PanelBody
                                title={__("Button", "essential-blocks")}
                                initialOpen={false}
                            >
                                <ToggleGroupControl
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
                                            label={__(
                                                "Color",
                                                "essential-blocks",
                                            )}
                                            color={buttonColor}
                                            attributeName={"buttonColor"}
                                        />
                                        <ColorControl
                                            label={__(
                                                "Background Color",
                                                "essential-blocks",
                                            )}
                                            color={buttonBGColor}
                                            attributeName={"buttonBGColor"}
                                        />
                                    </>
                                )}

                                {buttonColorType === "hover" && (
                                    <>
                                        <ColorControl
                                            label={__(
                                                "Color",
                                                "essential-blocks",
                                            )}
                                            color={buttonHoverColor}
                                            attributeName={"buttonHoverColor"}
                                        />
                                        <ColorControl
                                            label={__(
                                                "Background Color",
                                                "essential-blocks",
                                            )}
                                            color={buttonHoverBGColor}
                                            attributeName={"buttonHoverBGColor"}
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
                                    baseLabel={__(
                                        "Typography",
                                        "essential-blocks",
                                    )}
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
                                        "essential-blocks",
                                    )}
                                    initialOpen={false}
                                >
                                    <ToggleGroupControl
                                        className="eb-inspector-btn-group newtogglegroupcontrol"
                                        value={secondButtonColorType}
                                        onChange={(value) =>
                                            setAttributes({
                                                secondButtonColorType: value,
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

                                    {secondButtonColorType === "normal" && (
                                        <>
                                            <ColorControl
                                                label={__(
                                                    "Color",
                                                    "essential-blocks",
                                                )}
                                                color={secondButtonColor}
                                                attributeName={
                                                    "secondButtonColor"
                                                }
                                            />
                                            <ColorControl
                                                label={__(
                                                    "Background Color",
                                                    "essential-blocks",
                                                )}
                                                color={secondButtonBGColor}
                                                attributeName={
                                                    "secondButtonBGColor"
                                                }
                                            />
                                        </>
                                    )}

                                    {secondButtonColorType === "hover" && (
                                        <>
                                            <ColorControl
                                                label={__(
                                                    "Color",
                                                    "essential-blocks",
                                                )}
                                                color={secondButtonHoverColor}
                                                attributeName={
                                                    "secondButtonHoverColor"
                                                }
                                            />
                                            <ColorControl
                                                label={__(
                                                    "Background Color",
                                                    "essential-blocks",
                                                )}
                                                color={secondButtonHoverBGColor}
                                                attributeName={
                                                    "secondButtonHoverBGColor"
                                                }
                                            />
                                        </>
                                    )}
                                    <PanelRow>Button Border & Shadow</PanelRow>
                                    <BorderShadowControl
                                        controlName={BUTTON2_BORDER_SHADOW}
                                    // noShadow
                                    // noBorder
                                    />
                                    <TypographyDropdown
                                        baseLabel={__(
                                            "Typography",
                                            "essential-blocks",
                                        )}
                                        typographyPrefixConstant={
                                            BUTTON2_TYPOGRAPHY
                                        }
                                    />
                                    <ResponsiveDimensionsControl
                                        controlName={BUTTON2_MARGIN}
                                        baseLabel="Margin"
                                    />
                                    <ResponsiveDimensionsControl
                                        controlName={BUTTON2_PADDING}
                                        baseLabel="Padding"
                                    />
                                </InspectorPanel.PanelBody>
                            </InspectorPanel.PanelBody>
                        </>
                    )}

                    {sliderStyle === 'default-slider' && arrows && (
                        <InspectorPanel.PanelBody
                            title={__("Arrow", "essential-blocks")}
                            initialOpen={false}
                        >
                            <ToggleGroupControl
                                className="eb-inspector-btn-group newtogglegroupcontrol"
                                value={arrowColorType}
                                onChange={(value) =>
                                    setAttributes({
                                        arrowColorType: value,
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

                            {arrowColorType === "normal" && (
                                <ColorControl
                                    label={__("Color", "essential-blocks")}
                                    color={arrowColor}
                                    attributeName={"arrowColor"}
                                />
                            )}

                            {arrowColorType === "hover" && (
                                <ColorControl
                                    label={__(
                                        "Hover Color",
                                        "essential-blocks",
                                    )}
                                    color={arrowHoverColor}
                                    attributeName={"arrowHoverColor"}
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
                                baseLabel={__(
                                    "Arrow Position",
                                    "essential-blocks",
                                )}
                                controlName={ARROW_POSITION}
                                units={UNIT_TYPES}
                                min={-50}
                                max={100}
                                step={1}
                            />
                        </InspectorPanel.PanelBody>
                    )}

                    {sliderStyle === 'default-slider' && dots && (
                        <InspectorPanel.PanelBody
                            title={__("Dot", "essential-blocks")}
                            initialOpen={false}
                        >
                            <ColorControl
                                label={__("Color", "essential-blocks")}
                                color={dotsColor}
                                attributeName={"dotsColor"}
                            />
                            <ColorControl
                                label={__("Active Color", "essential-blocks")}
                                color={dotsActiveColor}
                                attributeName={"dotsActiveColor"}
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
                                baseLabel={__(
                                    "Dots Position",
                                    "essential-blocks",
                                )}
                                controlName={DOTS_POSITION}
                                units={UNIT_TYPES}
                                min={-50}
                                max={100}
                                step={1}
                            />
                        </InspectorPanel.PanelBody>
                    )}
                </InspectorPanel.Style>
            </InspectorPanel >
        </>
    );
}

export default Inspector;
