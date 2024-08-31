/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { PanelBody, ToggleControl, Button, ButtonGroup, BaseControl, PanelRow } from "@wordpress/components";

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
    GRID_COLUMNS,
    IMAGE_GAP,
    IMAGE_BORDER_SHADOW,
    CAPTION_MARGIN,
    CAPTION_PADDING,
    CAPTION_TYPOGRAPHY,
    CAPTION_WIDTH,
    TEXT_ALIGN,
    HORIZONTAL_ALIGN,
    VERTICAL_ALIGN,
    UNIT_TYPES,
    IMAGE_UNIT_TYPES,
    IMAGE_WIDTH,
    IMAGE_HEIGHT,
    IMAGE_MAX_WIDTH,
    IMAGE_MAX_HEIGHT,
    IMAGE_SIZE_TYPE,
    FLEX_ALIGN,
    FILTER_PADDING,
    FILTER_MARGIN,
    NORMAL_HOVER,
    FILTER_BORDER_SHADOW,
} from "@essential-blocks/blocks/image-gallery/src/constants";

import { FILTER_TYPOGRAPHY } from "@essential-blocks/blocks/image-gallery/src/typoConstants";

import objAttributes from "@essential-blocks/blocks/image-gallery/src/attributes";

function ImageGallery(props) {
    const { blockDefaults, setBlockDefaults, name, deviceType, handleBlockDefault } = props;



    const {
        layouts,
        displayCaption,
        captionOnHover,
        captionColor,
        overlayColor,
        captionBGColor,
        horizontalAlign,
        verticalAlign,
        textAlign,
        styleNumber,
        disableLightBox,
        imageSizeType,
        imageAlignment,
        enableFilter,
        filterColorType,
        filterColor,
        filterHoverColor,
        filterBGColor,
        filterHoverBGColor,
        filterActColor,
        filterActBGColor,
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

                        {displayCaption && styleNumber === "0" && (
                            <ToggleControl
                                label={__("Display Caption on Hover", "essential-blocks")}
                                checked={captionOnHover}
                                onChange={() =>
                                    handleBlockDefault({
                                        captionOnHover: !captionOnHover,
                                    })
                                }
                            />
                        )}

                        <ResponsiveRangeController
                            baseLabel={__("Columns", "essential-blocks")}
                            controlName={GRID_COLUMNS}
                            units={[]}
                            min={1}
                            max={8}
                            step={1}
                        />

                        <ResponsiveRangeController
                            baseLabel={__("Image Gap (px)", "essential-blocks")}
                            controlName={IMAGE_GAP}
                            units={[]}
                            min={0}
                            max={100}
                            step={1}
                        />

                        <ToggleControl
                            label={__("Disable Light Box", "essential-blocks")}
                            checked={disableLightBox}
                            onChange={() =>
                                handleBlockDefault({
                                    disableLightBox: !disableLightBox,
                                })
                            }
                        />
                    </PanelBody>
                    <PanelBody title={__("Filter", "essential-blocks")} initialOpen={false}>
                        <ToggleControl
                            label={__("Enable Filter", "essential-blocks")}
                            checked={enableFilter}
                            onChange={() =>
                                handleBlockDefault({
                                    enableFilter: !enableFilter,
                                })
                            }
                        />
                    </PanelBody>
                    {/* Styles */}
                    <PanelBody title={__("Image Styles", "essential-blocks")} initialOpen={false}>
                        {layouts === "grid" && (
                            <>
                                {!enableFilter && (
                                    <BaseControl label={__("Alignment", "essential-blocks")}>
                                        <ButtonGroup>
                                            {FLEX_ALIGN.map((item, index) => (
                                                <Button
                                                    key={index}
                                                    isPrimary={imageAlignment === item.value}
                                                    isSecondary={imageAlignment !== item.value}
                                                    onClick={() =>
                                                        handleBlockDefault({
                                                            imageAlignment: item.value,
                                                        })
                                                    }
                                                >
                                                    {item.label}
                                                </Button>
                                            ))}
                                        </ButtonGroup>
                                    </BaseControl>
                                )}

                                <BaseControl label={__("Image Size", "essential-blocks")}>
                                    <ButtonGroup>
                                        {IMAGE_SIZE_TYPE.map((item, index) => (
                                            <Button
                                                key={index}
                                                isPrimary={imageSizeType === item.value}
                                                isSecondary={imageSizeType !== item.value}
                                                onClick={() =>
                                                    handleBlockDefault({
                                                        imageSizeType: item.value,
                                                    })
                                                }
                                            >
                                                {item.label}
                                            </Button>
                                        ))}
                                    </ButtonGroup>
                                </BaseControl>

                                {imageSizeType === "fixed" && (
                                    <>
                                        <ResponsiveRangeController
                                            baseLabel={__("Image Height", "essential-blocks")}
                                            controlName={IMAGE_HEIGHT}
                                            units={IMAGE_UNIT_TYPES}
                                            min={0}
                                            max={500}
                                            step={1}
                                        />
                                        <ResponsiveRangeController
                                            baseLabel={__("Image Width", "essential-blocks")}
                                            controlName={IMAGE_WIDTH}
                                            units={IMAGE_UNIT_TYPES}
                                            min={0}
                                            max={500}
                                            step={1}
                                        />
                                    </>
                                )}

                                {imageSizeType === "adaptive" && (
                                    <>
                                        <ResponsiveRangeController
                                            baseLabel={__("Image Max Height", "essential-blocks")}
                                            controlName={IMAGE_MAX_HEIGHT}
                                            units={IMAGE_UNIT_TYPES}
                                            min={0}
                                            max={500}
                                            step={1}
                                        />
                                        <ResponsiveRangeController
                                            baseLabel={__("Image Max Width", "essential-blocks")}
                                            controlName={IMAGE_MAX_WIDTH}
                                            units={IMAGE_UNIT_TYPES}
                                            min={0}
                                            max={500}
                                            step={1}
                                        />
                                    </>
                                )}
                            </>
                        )}

                        <PanelBody title={__("Border", "essential-blocks")} initialOpen={true}>
                            <BorderShadowControl
                                controlName={IMAGE_BORDER_SHADOW}
                                noShadow
                            // noBorder
                            />
                        </PanelBody>
                    </PanelBody>

                    {styleNumber === "2" && (
                        <PanelBody title={__("Overlay Styles", "essential-blocks")} initialOpen={false}>
                            <ColorControl
                                label={__("Overlay Color", "essential-blocks")}
                                color={overlayColor}
                                onChange={(color) => handleBlockDefault({ overlayColor: color })}
                            />
                        </PanelBody>
                    )}
                    {displayCaption && (
                        <PanelBody title={__("Caption Styles", "essential-blocks")}>
                            <ColorControl
                                label={__("Text Color", "essential-blocks")}
                                color={captionColor}
                                onChange={(newColor) =>
                                    handleBlockDefault({
                                        captionColor: newColor,
                                    })
                                }
                            />

                            <ColorControl
                                label={__("Background Color", "essential-blocks")}
                                color={captionBGColor}
                                onChange={(backgroundColor) =>
                                    handleBlockDefault({
                                        captionBGColor: backgroundColor,
                                    })
                                }
                            />

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
                                    </BaseControl>

                                    <BaseControl label={__("Horizontal Align", "essential-blocks")}>
                                        <ButtonGroup>
                                            {HORIZONTAL_ALIGN.map((item, index) => (
                                                <Button
                                                    key={index}
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
                                    </BaseControl>

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

                    {enableFilter && (
                        <PanelBody title={__("Filter", "essential-blocks")} initialOpen={false}>
                            <ResponsiveDimensionsControl
                                controlName={FILTER_MARGIN}
                                baseLabel="Margin"
                            />
                            <ResponsiveDimensionsControl
                                controlName={FILTER_PADDING}
                                baseLabel="Padding"
                            />
                            <TypographyDropdown
                                baseLabel={__("Typography", "essential-blocks")}
                                typographyPrefixConstant={FILTER_TYPOGRAPHY}
                            />
                            <BaseControl>
                                <ButtonGroup>
                                    {NORMAL_HOVER.map((item, index) => (
                                        <Button
                                            key={index}
                                            isPrimary={filterColorType === item.value}
                                            isSecondary={filterColorType !== item.value}
                                            onClick={() =>
                                                handleBlockDefault({
                                                    filterColorType: item.value,
                                                })
                                            }
                                        >
                                            {item.label}
                                        </Button>
                                    ))}
                                </ButtonGroup>

                                {filterColorType === "normal" && (
                                    <>
                                        <ColorControl
                                            label={__("Color", "essential-blocks")}
                                            color={filterColor}
                                            onChange={(newColor) =>
                                                handleBlockDefault({
                                                    filterColor: newColor,
                                                })
                                            }
                                        />
                                        <ColorControl
                                            label={__("Background Color", "essential-blocks")}
                                            color={filterBGColor}
                                            onChange={(newColor) =>
                                                handleBlockDefault({
                                                    filterBGColor: newColor,
                                                })
                                            }
                                        />
                                    </>
                                )}

                                {filterColorType === "hover" && (
                                    <>
                                        <ColorControl
                                            label={__("Color", "essential-blocks")}
                                            color={filterHoverColor}
                                            onChange={(newColor) =>
                                                handleBlockDefault({
                                                    filterHoverColor: newColor,
                                                })
                                            }
                                        />
                                        <ColorControl
                                            label={__("Background Color", "essential-blocks")}
                                            color={filterHoverBGColor}
                                            onChange={(newColor) =>
                                                handleBlockDefault({
                                                    filterHoverBGColor: newColor,
                                                })
                                            }
                                        />
                                    </>
                                )}

                                {filterColorType === "active" && (
                                    <>
                                        <ColorControl
                                            label={__("Color", "essential-blocks")}
                                            color={filterActColor}
                                            onChange={(newColor) =>
                                                handleBlockDefault({
                                                    filterActColor: newColor,
                                                })
                                            }
                                        />
                                        <ColorControl
                                            label={__("Background Color", "essential-blocks")}
                                            color={filterActBGColor}
                                            onChange={(newColor) =>
                                                handleBlockDefault({
                                                    filterActBGColor: newColor,
                                                })
                                            }
                                        />
                                    </>
                                )}
                            </BaseControl>

                            <PanelRow>Button Border & Shadow</PanelRow>
                            <BorderShadowControl
                                controlName={FILTER_BORDER_SHADOW}
                            // noShadow
                            // noBorder
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

export default withBlockContext(objAttributes)(ImageGallery);
