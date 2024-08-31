/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useState } from "@wordpress/element";
import {
    PanelBody,
    PanelRow,
    SelectControl,
    ToggleControl,
    TextControl,
    Button,
    ButtonGroup,
    BaseControl,
    RangeControl,
} from "@wordpress/components";

/**
 * External Dependencies
 */
import Select2 from "react-select";

import {
    ColorControl,
    ResponsiveDimensionsControl,
    TypographyDropdown,
    BorderShadowControl,
    ResponsiveRangeController,
    BackgroundControl,
    CustomQuery,
    MorePosts,
    AdvancedControls,
    useBlockDefaults,
    withBlockContext
} from "@essential-blocks/controls";

/**
 * Internal depencencies
 */
import {
    WRAPPER_MARGIN,
    WRAPPER_PADDING,
    WRAPPER_BORDER_SHADOW,
    WRAPPER_BG,
    COLUMNS,
    COLUMN_GAP,
    COLUMN_PADDING,
    COLUMN_BG,
    COLUMN_BORDER_SHADOW,
    THUMBNAIL_IMAGE_SIZE,
    THUMBNAIL_BORDER_RADIUS,
    THUMBNAIL_MARGIN,
    TITLE_MARGIN,
    CONTENT_MARGIN,
    READMORE_MARGIN,
    READMORE_PADDING,
    HEADER_META_MARGIN,
    FOOTER_META_MARGIN,
    HEADER_META_SPACE,
    FOOTER_META_SPACE,
    AVATAR_BORDER_RADIUS,
    COLUMN_MEDIA_WIDTH,
    UNIT_TYPES,
    HEIGHT_UNIT_TYPES,
    NORMAL_HOVER,
    NORMAL_HOVER_ACTIVE,
    PRESETS,
    TEXT_ALIGN,
    TITLE_TAGS,
    CONTENT_POSITION,
    VERTICAL_POSITION,
    DOTS_GAP,
    ARROW_POSITION,
    DOTS_POSITION,
    ARROW_SIZE,
    DOTS_SIZE,
    SLIDES_GAP,
    SLIDE_TO_SHOW,
    CUSTOM_HEIGHT,
    FONT_UNIT_TYPES,
    COLORS,
    DOT_PRESETS,
} from "@essential-blocks/blocks/post-carousel/src/constants/constants";

import {
    EBPG_TITLE_TYPOGRAPHY,
    EBPG_CONTENT_TYPOGRAPHY,
    EBPG_READMORE_TYPOGRAPHY,
    EBPG_META_TYPOGRAPHY,
} from "@essential-blocks/blocks/post-carousel/src/constants/typographyPrefixConstants";

import objAttributes from "@essential-blocks/blocks/post-carousel/src/attributes";

function PostCarousel(props) {
    const { blockDefaults, setBlockDefaults, name, deviceType, handleBlockDefault } = props;

    const {
        resOption,
        preset,
        queryData,
        queryResults,
        postTerms,
        showThumbnail,
        thumbnailOverlayColor,
        thumbnailOverlayHoverColor,
        showTitle,
        titleColor,
        titleHoverColor,
        titleColorStyle,
        titleLength,
        titleTextAlign,
        titleTag,
        showContent,
        contentColor,
        contentTextAlign,
        contentLength,
        expansionIndicator,
        showReadMore,
        readmoreText,
        readmoreColor,
        readmoreBGColor,
        readmoreTextAlign,
        readmoreHoverColor,
        readmoreBGHoverColor,
        readmoreColorType,
        showMeta,
        headerMeta,
        footerMeta,
        headerMetaTextAlign,
        footerMetaTextAlign,
        metaColorType,
        authorMetaColor,
        authorMetaHoverColor,
        commonMetaColor,
        commonMetaHoverColor,
        commonMetaDividerColor,
        categoryMetaColor,
        categoryMetaHoverColor,
        categoryMetaDividerColor,
        tagMetaDividerColor,
        tagMetaColor,
        tagMetaHoverColor,
        tagMetaBgColor,
        tagMetaBgHoverColor,
        dateMetaColor,
        styleVerticalAlignment,
        arrowColorType,
        arrowColor,
        arrowHoverColor,
        dotsColor,
        dotsActiveColor,
        initialSlide,
        speed,
        slidesToShow,
        isCustomHeight,
        pauseOnHover,
        vertical,
        infinite,
        fade,
        dots,
        autoplaySpeed,
        autoplay,
        adaptiveHeight,
        arrows,
        dotPreset,
    } = blockDefaults;
    const isDefaultSet = useBlockDefaults(name, blockDefaults, setBlockDefaults, objAttributes)

    const [metaOptions, setMetaOptions] = useState([]);

    return (
        <>
            {isDefaultSet && (
                <div className="eb-panel-control">
                    <PanelBody title={__("Carousel", "essential-blocks")}>
                        <ToggleControl
                            label={__("Show Arrows", "essential-blocks")}
                            checked={arrows}
                            onChange={() => {
                                handleBlockDefault({ arrows: !arrows });
                            }}
                        />
                        <ToggleControl
                            label={__("Equal Height", "essential-blocks")}
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
                            onChange={() => handleBlockDefault({ autoplay: !autoplay })}
                        />

                        <ToggleControl
                            label={__("Dots", "essential-blocks")}
                            checked={dots}
                            onChange={() => handleBlockDefault({ dots: !dots })}
                        />

                        <ToggleControl
                            label={__("Infinite", "essential-blocks")}
                            checked={infinite}
                            onChange={() => handleBlockDefault({ infinite: !infinite })}
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

                        <ResponsiveRangeController
                            baseLabel={__("Slides to Show", "essential-blocks")}
                            controlName={SLIDE_TO_SHOW}
                            units={[]}
                            min={1}
                            max={8}
                            step={1}
                        />

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

                        {dots && (
                            <SelectControl
                                label={__("Dot Preset", "essential-blocks")}
                                value={dotPreset}
                                options={DOT_PRESETS}
                                onChange={(dotPreset) => handleBlockDefault({ dotPreset })}
                            />
                        )}
                    </PanelBody>

                    <PanelBody title={__("Layout", "essential-blocks")} initialOpen={false}>
                        <SelectControl
                            label={__("Template", "essential-blocks")}
                            value={preset}
                            options={PRESETS}
                            onChange={(selected) => changePreset(selected)}
                        />

                        <ToggleControl
                            label={__("Show Thumbnail?")}
                            checked={showThumbnail}
                            onChange={() => {
                                handleBlockDefault({
                                    showThumbnail: !showThumbnail,
                                });
                            }}
                        />

                        {showThumbnail && (
                            <>
                                <ResponsiveRangeController
                                    baseLabel={__("Thumbnail Height", "essential-blocks")}
                                    controlName={THUMBNAIL_IMAGE_SIZE}
                                   
                                    units={HEIGHT_UNIT_TYPES}
                                    min={1}
                                    max={500}
                                    step={1}
                                />
                                {preset === "style-3" && (
                                    <ResponsiveRangeController
                                        baseLabel={__("Thumbnail Width", "essential-blocks")}
                                        controlName={COLUMN_MEDIA_WIDTH}
                                       
                                        units={[{ label: "%", value: "%" }]}
                                        min={0}
                                        max={100}
                                        step={1}
                                    />
                                )}
                            </>
                        )}

                        {preset === "style-4" && (
                            <BaseControl
                                label={__("Content Vertical Alignment", "essential-blocks")}
                                id="essential-blocks"
                            >
                                <ButtonGroup id="essential-blocks">
                                    {VERTICAL_POSITION.map((item, index) => (
                                        <Button
                                            key={index}
                                            // isLarge
                                            isPrimary={styleVerticalAlignment === item.value}
                                            isSecondary={styleVerticalAlignment !== item.value}
                                            onClick={() =>
                                                handleBlockDefault({
                                                    styleVerticalAlignment: item.value,
                                                })
                                            }
                                        >
                                            {item.label}
                                        </Button>
                                    ))}
                                </ButtonGroup>
                            </BaseControl>
                        )}

                        <ToggleControl
                            label={__("Show Title?")}
                            checked={showTitle}
                            onChange={() => {
                                handleBlockDefault({ showTitle: !showTitle });
                            }}
                        />

                        {showTitle && (
                            <>
                                <SelectControl
                                    label={__("Title Tag", "essential-blocks")}
                                    value={titleTag}
                                    options={TITLE_TAGS}
                                    onChange={(value) => {
                                        handleBlockDefault({ titleTag: value });
                                    }}
                                />

                                <RangeControl
                                    label="Title Words"
                                    value={titleLength}
                                    onChange={(value) =>
                                        handleBlockDefault({
                                            titleLength: value,
                                        })
                                    }
                                    min={-1}
                                    max={100}
                                />
                            </>
                        )}

                        <ToggleControl
                            label={__("Show Excerpt?")}
                            checked={showContent}
                            onChange={() => {
                                handleBlockDefault({
                                    showContent: !showContent,
                                });
                            }}
                        />

                        {showContent && (
                            <>
                                <RangeControl
                                    label="Excerpt Words"
                                    value={contentLength}
                                    onChange={(value) =>
                                        handleBlockDefault({
                                            contentLength: value,
                                        })
                                    }
                                    min={-1}
                                    max={100}
                                />

                                <TextControl
                                    label="Expansion Indicator"
                                    type={"text"}
                                    value={expansionIndicator}
                                    onChange={(text) =>
                                        handleBlockDefault({
                                            expansionIndicator: text,
                                        })
                                    }
                                />
                            </>
                        )}

                        {preset != "style-4" && (
                            <ToggleControl
                                label={__("Show Read More Button?")}
                                checked={showReadMore}
                                onChange={() => {
                                    handleBlockDefault({
                                        showReadMore: !showReadMore,
                                    });
                                }}
                            />
                        )}

                        {showReadMore && (
                            <>
                                <TextControl
                                    label="Button Text"
                                    type={"text"}
                                    value={readmoreText}
                                    onChange={(text) =>
                                        handleBlockDefault({
                                            readmoreText: text,
                                        })
                                    }
                                />
                            </>
                        )}

                        <ToggleControl
                            label={__("Show Meta?")}
                            checked={showMeta}
                            onChange={() => {
                                handleBlockDefault({ showMeta: !showMeta });
                            }}
                        />

                        {showMeta && (
                            <>
                                <div className="eb-control-item-wrapper">
                                    <PanelRow>Header Meta</PanelRow>
                                    <Select2
                                        name="select-header-meta"
                                        value={headerMeta.length > 0 ? JSON.parse(headerMeta) : ""}
                                        onChange={(selected) =>
                                            handleBlockDefault({
                                                headerMeta: JSON.stringify(selected),
                                            })
                                        }
                                        options={metaOptions}
                                        isMulti="true"
                                    />
                                </div>

                                <div className="eb-control-item-wrapper">
                                    <PanelRow>Footer Meta</PanelRow>
                                    <Select2
                                        name="select-footer-meta"
                                        value={footerMeta.length > 0 ? JSON.parse(footerMeta) : ""}
                                        onChange={(selected) =>
                                            handleBlockDefault({
                                                footerMeta: JSON.stringify(selected),
                                            })
                                        }
                                        options={metaOptions}
                                        isMulti="true"
                                    />
                                </div>
                            </>
                        )}
                    </PanelBody>

                    {/* Styles */}

                    <PanelBody title={__("Carousel", "essential-blocks")} initialOpen={true}>
                        <ResponsiveRangeController
                            baseLabel={__("Slides Gap", "essential-blocks")}
                            controlName={SLIDES_GAP}
                            units={[]}
                            min={0}
                            max={100}
                            step={1}
                        />
                    </PanelBody>

                    <PanelBody title={__("Columns", "essential-blocks")} initialOpen={false}>
                        <ResponsiveDimensionsControl
                            controlName={COLUMN_PADDING}
                            baseLabel="Padding"
                        />
                        <PanelBody title={__("Background", "essential-blocks")} initialOpen={false}>
                            <BackgroundControl controlName={COLUMN_BG} noOverlay />
                        </PanelBody>
                        <PanelBody title={__("Border")} initialOpen={false}>
                            <BorderShadowControl
                                controlName={COLUMN_BORDER_SHADOW}
                                noShadow
                            // noBorder
                            />
                        </PanelBody>
                    </PanelBody>

                    {showThumbnail && (
                        <PanelBody title={__("Thumbnail", "essential-blocks")} initialOpen={false}>
                            {preset != "style-4" && (
                                <>
                                    <ResponsiveDimensionsControl
                                       
                                        controlName={THUMBNAIL_BORDER_RADIUS}
                                        baseLabel="Border Radius"
                                    />

                                    <ResponsiveDimensionsControl
                                       
                                        controlName={THUMBNAIL_MARGIN}
                                        baseLabel="Margin"
                                    />
                                </>
                            )}

                            <ColorControl
                                label={__("Overlay Color", "essential-blocks")}
                                color={thumbnailOverlayColor}
                                onChange={(color) =>
                                    handleBlockDefault({
                                        thumbnailOverlayColor: color,
                                    })
                                }
                            />
                            <ColorControl
                                label={__("Overlay Hover Color", "essential-blocks")}
                                color={thumbnailOverlayHoverColor}
                                onChange={(color) =>
                                    handleBlockDefault({
                                        thumbnailOverlayHoverColor: color,
                                    })
                                }
                            />
                        </PanelBody>
                    )}

                    {showTitle && (
                        <PanelBody title={__("Title", "essential-blocks")} initialOpen={false}>
                            <ButtonGroup className="eb-inspector-btn-group">
                                {NORMAL_HOVER.map((item, index) => (
                                    <Button
                                        key={index}
                                        // isLarge
                                        isPrimary={titleColorStyle === item.value}
                                        isSecondary={titleColorStyle !== item.value}
                                        onClick={() =>
                                            handleBlockDefault({
                                                titleColorStyle: item.value,
                                            })
                                        }
                                    >
                                        {item.label}
                                    </Button>
                                ))}
                            </ButtonGroup>

                            {titleColorStyle === "normal" && (
                                <ColorControl
                                    label={__("Color", "essential-blocks")}
                                    color={titleColor}
                                    onChange={(newColor) =>
                                        handleBlockDefault({
                                            titleColor: newColor,
                                        })
                                    }
                                />
                            )}

                            {titleColorStyle === "hover" && (
                                <ColorControl
                                    label={__("Hover Color", "essential-blocks")}
                                    color={titleHoverColor}
                                    onChange={(newColor) =>
                                        handleBlockDefault({
                                            titleHoverColor: newColor,
                                        })
                                    }
                                />
                            )}
                            <BaseControl label={__("Alignment", "essential-blocks")} id="essential-blocks">
                                <ButtonGroup id="essential-blocks">
                                    {TEXT_ALIGN.map((item, index) => (
                                        <Button
                                            key={index}
                                            // isLarge
                                            isPrimary={titleTextAlign === item.value}
                                            isSecondary={titleTextAlign !== item.value}
                                            onClick={() =>
                                                handleBlockDefault({
                                                    titleTextAlign: item.value,
                                                })
                                            }
                                        >
                                            {item.label}
                                        </Button>
                                    ))}
                                </ButtonGroup>
                            </BaseControl>
                            <TypographyDropdown
                                baseLabel={__("Typography", "essential-blocks")}
                                typographyPrefixConstant={EBPG_TITLE_TYPOGRAPHY}
                            />
                            <ResponsiveDimensionsControl
                                controlName={TITLE_MARGIN}
                                baseLabel="Margin"
                            />
                        </PanelBody>
                    )}

                    {showContent && (
                        <PanelBody title={__("Excerpt", "essential-blocks")} initialOpen={false}>
                            <ColorControl
                                label={__("Color", "essential-blocks")}
                                color={contentColor}
                                onChange={(color) => handleBlockDefault({ contentColor: color })}
                            />
                            <BaseControl label={__("Alignment", "essential-blocks")} id="essential-blocks">
                                <ButtonGroup id="essential-blocks">
                                    {TEXT_ALIGN.map((item, index) => (
                                        <Button
                                            key={index}
                                            // isLarge
                                            isPrimary={contentTextAlign === item.value}
                                            isSecondary={contentTextAlign !== item.value}
                                            onClick={() =>
                                                handleBlockDefault({
                                                    contentTextAlign: item.value,
                                                })
                                            }
                                        >
                                            {item.label}
                                        </Button>
                                    ))}
                                </ButtonGroup>
                            </BaseControl>
                            <TypographyDropdown
                                baseLabel={__("Typography", "essential-blocks")}
                                typographyPrefixConstant={EBPG_CONTENT_TYPOGRAPHY}
                            />
                            <ResponsiveDimensionsControl
                                controlName={CONTENT_MARGIN}
                                baseLabel="Margin"
                            />
                        </PanelBody>
                    )}

                    {preset != "style-4" && showReadMore && (
                        <PanelBody title={__("Read More Button", "essential-blocks")} initialOpen={false}>
                            <ButtonGroup className="eb-inspector-btn-group">
                                {NORMAL_HOVER.map((item, index) => (
                                    <Button
                                        key={index}
                                        // isLarge
                                        isPrimary={readmoreColorType === item.value}
                                        isSecondary={readmoreColorType !== item.value}
                                        onClick={() =>
                                            handleBlockDefault({
                                                readmoreColorType: item.value,
                                            })
                                        }
                                    >
                                        {item.label}
                                    </Button>
                                ))}
                            </ButtonGroup>

                            {readmoreColorType === "normal" && (
                                <>
                                    <ColorControl
                                        label={__("Color", "essential-blocks")}
                                        color={readmoreColor}
                                        onChange={(newColor) =>
                                            handleBlockDefault({
                                                readmoreColor: newColor,
                                            })
                                        }
                                    />
                                    <ColorControl
                                        label={__("Background Color", "essential-blocks")}
                                        color={readmoreBGColor}
                                        onChange={(newColor) =>
                                            handleBlockDefault({
                                                readmoreBGColor: newColor,
                                            })
                                        }
                                    />
                                </>
                            )}

                            {readmoreColorType === "hover" && (
                                <>
                                    <ColorControl
                                        label={__("Hover Color", "essential-blocks")}
                                        color={readmoreHoverColor}
                                        onChange={(newColor) =>
                                            handleBlockDefault({
                                                readmoreHoverColor: newColor,
                                            })
                                        }
                                    />
                                    <ColorControl
                                        label={__("Hover Background Color", "essential-blocks")}
                                        color={readmoreBGHoverColor}
                                        onChange={(newColor) =>
                                            handleBlockDefault({
                                                readmoreBGHoverColor: newColor,
                                            })
                                        }
                                    />
                                </>
                            )}
                            <BaseControl label={__("Alignment", "essential-blocks")} id="essential-blocks">
                                <ButtonGroup id="essential-blocks">
                                    {TEXT_ALIGN.map((item, index) => (
                                        <Button
                                            key={index}
                                            // isLarge
                                            isPrimary={readmoreTextAlign === item.value}
                                            isSecondary={readmoreTextAlign !== item.value}
                                            onClick={() =>
                                                handleBlockDefault({
                                                    readmoreTextAlign: item.value,
                                                })
                                            }
                                        >
                                            {item.label}
                                        </Button>
                                    ))}
                                </ButtonGroup>
                            </BaseControl>
                            <TypographyDropdown
                                baseLabel={__("Typography", "essential-blocks")}
                                typographyPrefixConstant={EBPG_READMORE_TYPOGRAPHY}
                            />
                            <ResponsiveDimensionsControl
                                controlName={READMORE_MARGIN}
                                baseLabel="Margin"
                            />
                            <ResponsiveDimensionsControl
                                controlName={READMORE_PADDING}
                                baseLabel="Padding"
                            />
                        </PanelBody>
                    )}

                    {showMeta && (
                        <PanelBody title={__("Meta", "essential-blocks")} initialOpen={false}>
                            <BaseControl label={__("Header Meta Alignment", "essential-blocks")} id="essential-blocks">
                                <ButtonGroup id="essential-blocks">
                                    {CONTENT_POSITION.map((item, index) => (
                                        <Button
                                            key={index}
                                            // isLarge
                                            isPrimary={headerMetaTextAlign === item.value}
                                            isSecondary={headerMetaTextAlign !== item.value}
                                            onClick={() =>
                                                handleBlockDefault({
                                                    headerMetaTextAlign: item.value,
                                                })
                                            }
                                        >
                                            {item.label}
                                        </Button>
                                    ))}
                                </ButtonGroup>
                            </BaseControl>
                            <ResponsiveRangeController
                                baseLabel={__("Header Meta Gap", "essential-blocks")}
                                controlName={HEADER_META_SPACE}
                                units={UNIT_TYPES}
                                min={1}
                                max={100}
                                step={1}
                            />
                            <ResponsiveDimensionsControl
                                controlName={HEADER_META_MARGIN}
                                baseLabel="Header Meta Margin"
                            />

                            <BaseControl label={__("Footer Meta Alignment", "essential-blocks")} id="essential-blocks">
                                <ButtonGroup id="essential-blocks">
                                    {CONTENT_POSITION.map((item, index) => (
                                        <Button
                                            key={index}
                                            // isLarge
                                            isPrimary={footerMetaTextAlign === item.value}
                                            isSecondary={footerMetaTextAlign !== item.value}
                                            onClick={() =>
                                                handleBlockDefault({
                                                    footerMetaTextAlign: item.value,
                                                })
                                            }
                                        >
                                            {item.label}
                                        </Button>
                                    ))}
                                </ButtonGroup>
                            </BaseControl>
                            <ResponsiveRangeController
                                baseLabel={__("Footer Meta Gap", "essential-blocks")}
                                controlName={FOOTER_META_SPACE}
                                units={UNIT_TYPES}
                                min={1}
                                max={100}
                                step={1}
                            />
                            <ResponsiveDimensionsControl
                                controlName={FOOTER_META_MARGIN}
                                baseLabel="Footer Meta Margin"
                            />

                            <ButtonGroup className="eb-inspector-btn-group">
                                {NORMAL_HOVER.map((item, index) => (
                                    <Button
                                        key={index}
                                        // isLarge
                                        isPrimary={metaColorType === item.value}
                                        isSecondary={metaColorType !== item.value}
                                        onClick={() =>
                                            handleBlockDefault({
                                                metaColorType: item.value,
                                            })
                                        }
                                    >
                                        {item.label}
                                    </Button>
                                ))}
                            </ButtonGroup>

                            {metaColorType === "normal" && (
                                <>
                                    <ColorControl
                                        label={__("Author Color", "essential-blocks")}
                                        color={authorMetaColor}
                                        onChange={(newColor) =>
                                            handleBlockDefault({
                                                authorMetaColor: newColor,
                                            })
                                        }
                                    />
                                    <ColorControl
                                        label={__("Date Color", "essential-blocks")}
                                        color={dateMetaColor}
                                        onChange={(newColor) =>
                                            handleBlockDefault({
                                                dateMetaColor: newColor,
                                            })
                                        }
                                    />
                                    <ColorControl
                                        label={__("Common Color", "essential-blocks")}
                                        color={commonMetaColor}
                                        onChange={(newColor) =>
                                            handleBlockDefault({
                                                commonMetaColor: newColor,
                                            })
                                        }
                                    />
                                    <ColorControl
                                        label={__("Common Divider Color", "essential-blocks")}
                                        color={commonMetaDividerColor}
                                        onChange={(newColor) =>
                                            handleBlockDefault({
                                                commonMetaDividerColor: newColor,
                                            })
                                        }
                                    />
                                    <ColorControl
                                        label={__("Category Color", "essential-blocks")}
                                        color={categoryMetaColor}
                                        onChange={(newColor) =>
                                            handleBlockDefault({
                                                categoryMetaColor: newColor,
                                            })
                                        }
                                    />
                                    <ColorControl
                                        label={__("Category Divider Color", "essential-blocks")}
                                        color={categoryMetaDividerColor}
                                        onChange={(newColor) =>
                                            handleBlockDefault({
                                                categoryMetaDividerColor: newColor,
                                            })
                                        }
                                    />
                                    <ColorControl
                                        label={__("Tag Color", "essential-blocks")}
                                        color={tagMetaColor}
                                        onChange={(newColor) =>
                                            handleBlockDefault({
                                                tagMetaColor: newColor,
                                            })
                                        }
                                    />
                                    <ColorControl
                                        label={__("Tag BG Color", "essential-blocks")}
                                        color={tagMetaBgColor}
                                        onChange={(newColor) =>
                                            handleBlockDefault({
                                                tagMetaBgColor: newColor,
                                            })
                                        }
                                    />
                                    <ColorControl
                                        label={__("Tag Divider Color", "essential-blocks")}
                                        color={tagMetaDividerColor}
                                        onChange={(newColor) =>
                                            handleBlockDefault({
                                                tagMetaDividerColor: newColor,
                                            })
                                        }
                                    />
                                </>
                            )}

                            {metaColorType === "hover" && (
                                <>
                                    <ColorControl
                                        label={__("Author Hover Color", "essential-blocks")}
                                        color={authorMetaHoverColor}
                                        onChange={(newColor) =>
                                            handleBlockDefault({
                                                authorMetaHoverColor: newColor,
                                            })
                                        }
                                    />
                                    <ColorControl
                                        label={__("Common Hover Color", "essential-blocks")}
                                        color={commonMetaHoverColor}
                                        onChange={(newColor) =>
                                            handleBlockDefault({
                                                commonMetaHoverColor: newColor,
                                            })
                                        }
                                    />
                                    <ColorControl
                                        label={__("Category Hover Color", "essential-blocks")}
                                        color={categoryMetaHoverColor}
                                        onChange={(newColor) =>
                                            handleBlockDefault({
                                                categoryMetaHoverColor: newColor,
                                            })
                                        }
                                    />
                                    <ColorControl
                                        label={__("Tag Hover Color", "essential-blocks")}
                                        color={tagMetaHoverColor}
                                        onChange={(newColor) =>
                                            handleBlockDefault({
                                                tagMetaHoverColor: newColor,
                                            })
                                        }
                                    />
                                    <ColorControl
                                        label={__("Tag BG Hover Color", "essential-blocks")}
                                        color={tagMetaBgHoverColor}
                                        onChange={(newColor) =>
                                            handleBlockDefault({
                                                tagMetaBgHoverColor: newColor,
                                            })
                                        }
                                    />
                                </>
                            )}

                            <TypographyDropdown
                                baseLabel={__("Meta Typography", "essential-blocks")}
                                typographyPrefixConstant={EBPG_META_TYPOGRAPHY}
                            />

                            <ResponsiveDimensionsControl
                                controlName={AVATAR_BORDER_RADIUS}
                                baseLabel="Avatar Border Radius"
                            />
                        </PanelBody>
                    )}

                    {arrows && (
                        <PanelBody title={__("Arrow", "essential-blocks")} initialOpen={false}>
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
                                    label={__("Color", "essential-blocks")}
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
                                    label={__("Color", "essential-blocks")}
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
                        <PanelBody title={__("Dot", "essential-blocks")} initialOpen={false}>
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
                                baseLabel={__("Dots Position (PX)", "essential-blocks")}
                                controlName={DOTS_POSITION}
                                min={-100}
                                max={100}
                                step={1}
                                noUnits
                            />
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
                    <PanelBody title={__("Background", "essential-blocks")} initialOpen={false}>
                        <BackgroundControl controlName={WRAPPER_BG} noOverlay />
                    </PanelBody>
                    <PanelBody title={__("Border & Shadow")} initialOpen={false}>
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

export default withBlockContext(objAttributes)(PostCarousel);
