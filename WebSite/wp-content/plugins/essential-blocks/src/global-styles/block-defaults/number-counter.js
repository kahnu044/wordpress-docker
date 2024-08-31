/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
    PanelBody,
    ToggleControl,
    BaseControl,
    Button,
    ButtonGroup,
    __experimentalDivider as Divider,
} from "@wordpress/components";
import { MediaUpload } from "@wordpress/block-editor";
import {
    ColorControl,
    ResponsiveDimensionsControl,
    ResponsiveRangeController,
    TypographyDropdown,
    BackgroundControl,
    BorderShadowControl,
    GradientColorControl,
    ImageAvatar,
    EBIconPicker,
    useBlockDefaults,
    withBlockContext
} from "@essential-blocks/controls";
/**
 * Internal depencencies
 */
import {
    MEDIA_TYPES,
    ICON_IMAGE_BG_TYPES,
    MEDIA_ALIGNMENTS_ON_FLEX_COLUMN,
    MEDIA_ALIGNMENTS_ON_FLEX_ROW,
    CONTENTS_ALIGNMENTS_ON_FLEX_ROW,
    sizeUnitTypes,
    imgHeightUnits,
    LAYOUT_TYPES,
    // HEADER_TAGS,
    CONTENTS_ALIGNMENTS,
    // HOVER_EFFECT,
} from "@essential-blocks/blocks/number-counter/src/constants";

import {
    typoPrefix_numPrefix,
    typoPrefix_numSuffix,
    typoPrefix_number,
    typoPrefix_title,
} from "@essential-blocks/blocks/number-counter/src/constants/typographyPrefixConstants";

import {
    wrapperMargin,
    wrapperPadding,
    mediaBgPadding,
    mediaBgMargin,
    mediaBgRadius,
} from "@essential-blocks/blocks/number-counter/src/constants/dimensionsConstants";
import { WrapBg } from "@essential-blocks/blocks/number-counter/src/constants/backgroundsConstants";
import { wrpBdShadow } from "@essential-blocks/blocks/number-counter/src/constants/borderShadowConstants";
import {
    rgNumTitle,
    rgNumPrefix,
    rgNumSuffix,
    mediaIconSize,
    mediaImageWidth,
    mediaImageHeight,
    mediaContentGap,
} from "@essential-blocks/blocks/number-counter/src/constants/rangeNames";

import objAttributes from "@essential-blocks/blocks/number-counter/src/attributes";

function NumberCounter(props) {
    const { blockDefaults, setBlockDefaults, name, deviceType, handleBlockDefault } = props;
    const {
        // counter color attributes ⬇
        titleColor,
        numberColor,
        numPrefixColor,
        numSuffixColor,
        rootFlexDirection,
        contentAlignment,
        mediaAlignSelf,
        contentsAlignSelf,
        media,
        selectedIcon,
        iconColor,
        useIconBg,
        iconBgType,
        iconBgColor,
        iconBgGradient,
        imageUrl,
        imageId,
        isMediaImgHeightAuto,
    } = blockDefaults;
    const isDefaultSet = useBlockDefaults(name, blockDefaults, setBlockDefaults, objAttributes)

    return (
        <>
            {isDefaultSet && (
                <div className="eb-panel-control">
                    <PanelBody initialOpen={true} title={__("Media Options", "essential-blocks")}>
                        <ButtonGroup id="eb-infobox-image-icon">
                            {MEDIA_TYPES.map((value, index) => (
                                <Button
                                    key={index}
                                    isSecondary={media !== value}
                                    isPrimary={media === value}
                                    onClick={() => handleBlockDefault({ media: value })}
                                >
                                    {value}
                                </Button>
                            ))}
                        </ButtonGroup>
                    </PanelBody>

                    {media !== "none" && (
                        <>
                            <PanelBody initialOpen={false}>
                                <ResponsiveRangeController
                                    baseLabel={__("Media & content spacing", "Infobox")}
                                    controlName={mediaContentGap}
                                    min={0}
                                    max={500}
                                    step={1}
                                    noUnits
                                />
                            </PanelBody>
                        </>
                    )}

                    {/* Styles */}
                    {media !== "none" && (
                        <PanelBody title={__("Media", "essential-blocks")}>
                            {media === "icon" && (
                                <>
                                    <EBIconPicker
                                        value={selectedIcon}
                                        onChange={(icon) =>
                                            handleBlockDefault({
                                                selectedIcon: icon,
                                            })
                                        }
                                        title={__("Select Icon", "essential-blocks")}
                                    />
                                    {selectedIcon && (
                                        <ResponsiveRangeController
                                            baseLabel={__("Icon Size", "essential-blocks")}
                                            controlName={mediaIconSize}
                                            min={8}
                                            max={200}
                                            step={1}
                                        />
                                    )}

                                    <ColorControl
                                        label={__("Color", "essential-blocks")}
                                        color={iconColor}
                                        onChange={(iconColor) => handleBlockDefault({ iconColor })}
                                    />

                                    <ResponsiveDimensionsControl
                                        controlName={mediaBgPadding}
                                        baseLabel="Padding"
                                    />

                                    <ToggleControl
                                        label={__("Use Background", "essential-blocks")}
                                        checked={useIconBg}
                                        onChange={() =>
                                            handleBlockDefault({
                                                useIconBg: !useIconBg,
                                            })
                                        }
                                    />

                                    {useIconBg && (
                                        <>
                                            <BaseControl label={__("Background Type", "essential-blocks")}>
                                                <ButtonGroup id="eb-infobox-infobox-background">
                                                    {ICON_IMAGE_BG_TYPES.map(({ value, label }, index) => (
                                                        <Button
                                                            key={index}
                                                            isPrimary={iconBgType === value}
                                                            isSecondary={iconBgType !== value}
                                                            onClick={() =>
                                                                handleBlockDefault({
                                                                    iconBgType: value,
                                                                })
                                                            }
                                                        >
                                                            {label}
                                                        </Button>
                                                    ))}
                                                </ButtonGroup>
                                            </BaseControl>

                                            {iconBgType === "fill" && (
                                                <ColorControl
                                                    label={__("Background Color", "essential-blocks")}
                                                    color={iconBgColor}
                                                    onChange={(iconBgColor) =>
                                                        handleBlockDefault({
                                                            iconBgColor,
                                                        })
                                                    }
                                                />
                                            )}

                                            {iconBgType === "gradient" && (
                                                <PanelBody
                                                    title={__("Gradient", "essential-blocks")}
                                                // initialOpen={false}
                                                >
                                                    <GradientColorControl
                                                        gradientColor={iconBgGradient}
                                                        onChange={(iconBgGradient) =>
                                                            handleBlockDefault({
                                                                iconBgGradient,
                                                            })
                                                        }
                                                    />
                                                </PanelBody>
                                            )}
                                        </>
                                    )}
                                </>
                            )}

                            {media === "image" && !imageUrl && (
                                <MediaUpload
                                    onSelect={({ id, url }) =>
                                        handleBlockDefault({
                                            imageUrl: url,
                                            imageId: id,
                                        })
                                    }
                                    type="image"
                                    value={imageId}
                                    render={({ open }) => {
                                        return (
                                            <Button
                                                className="eb-background-control-inspector-panel-img-btn components-button"
                                                label={__("Upload Image", "essential-blocks")}
                                                icon="format-image"
                                                onClick={open}
                                            />
                                        );
                                    }}
                                />
                            )}

                            {media === "image" && imageUrl && (
                                <>
                                    <ImageAvatar
                                        imageUrl={imageUrl}
                                        onDeleteImage={() =>
                                            handleBlockDefault({
                                                imageUrl: null,
                                            })
                                        }
                                    />
                                    <ResponsiveRangeController
                                        baseLabel={__("Image Width", "essential-blocks")}
                                        controlName={mediaImageWidth}
                                        units={sizeUnitTypes}
                                        min={0}
                                        max={500}
                                        step={1}
                                    />
                                    <ToggleControl
                                        label={__("Auto Image Height", "essential-blocks")}
                                        checked={isMediaImgHeightAuto}
                                        onChange={() =>
                                            handleBlockDefault({
                                                isMediaImgHeightAuto: !isMediaImgHeightAuto,
                                            })
                                        }
                                    />

                                    {!isMediaImgHeightAuto && (
                                        <>
                                            <ResponsiveRangeController
                                                baseLabel={__("Image Height", "essential-blocks")}
                                                controlName={mediaImageHeight}
                                               
                                                units={imgHeightUnits}
                                                min={0}
                                                max={500}
                                                step={1}
                                            />
                                        </>
                                    )}
                                </>
                            )}

                            <Divider />

                            <ResponsiveDimensionsControl
                                forBorderRadius
                                controlName={mediaBgRadius}
                                baseLabel="Border Radius"
                            />

                            <ResponsiveDimensionsControl
                                controlName={mediaBgMargin}
                                baseLabel="Margin"
                            />
                        </PanelBody>
                    )}

                    <PanelBody title={__("Alignments", "essential-blocks")}>
                        {media !== "none" && (
                            <>
                                {(rootFlexDirection === "row" || rootFlexDirection === "row-reverse") && (
                                    <>
                                        <BaseControl id="eb-infobox-alignments" label="Media Vertical alignments">
                                            <ButtonGroup id="eb-infobox-alignments">
                                                {MEDIA_ALIGNMENTS_ON_FLEX_ROW.map(({ value, label }, index) => (
                                                    <Button
                                                        key={index}
                                                        isSecondary={mediaAlignSelf !== value}
                                                        isPrimary={mediaAlignSelf === value}
                                                        onClick={() =>
                                                            handleBlockDefault({
                                                                mediaAlignSelf: value,
                                                            })
                                                        }
                                                    >
                                                        {label}
                                                    </Button>
                                                ))}
                                            </ButtonGroup>
                                        </BaseControl>

                                        <BaseControl id="eb-infobox-alignments" label="Content Vertical alignments">
                                            <ButtonGroup id="eb-infobox-alignments">
                                                {CONTENTS_ALIGNMENTS_ON_FLEX_ROW.map(({ value, label }, index) => (
                                                    <Button
                                                        key={index}
                                                        isSecondary={contentsAlignSelf !== value}
                                                        isPrimary={contentsAlignSelf === value}
                                                        onClick={() =>
                                                            handleBlockDefault({
                                                                contentsAlignSelf: value,
                                                            })
                                                        }
                                                    >
                                                        {label}
                                                    </Button>
                                                ))}
                                            </ButtonGroup>
                                        </BaseControl>
                                    </>
                                )}

                                {(rootFlexDirection === "column" || rootFlexDirection === "column-reverse") && (
                                    <BaseControl id="eb-infobox-alignments" label="Media alignments">
                                        <ButtonGroup id="eb-infobox-alignments">
                                            {MEDIA_ALIGNMENTS_ON_FLEX_COLUMN.map(({ value, label }, index) => (
                                                <Button
                                                    key={index}
                                                    isSecondary={mediaAlignSelf !== value}
                                                    isPrimary={mediaAlignSelf === value}
                                                    onClick={() =>
                                                        handleBlockDefault({
                                                            mediaAlignSelf: value,
                                                        })
                                                    }
                                                >
                                                    {label}
                                                </Button>
                                            ))}
                                        </ButtonGroup>
                                    </BaseControl>
                                )}
                            </>
                        )}

                        <BaseControl id="eb-infobox-alignments" label="Contents alignments">
                            <ButtonGroup id="eb-infobox-alignments">
                                {CONTENTS_ALIGNMENTS.map(({ value, label }, index) => (
                                    <Button
                                        key={index}
                                        isSecondary={contentAlignment !== value}
                                        isPrimary={contentAlignment === value}
                                        onClick={() =>
                                            handleBlockDefault({
                                                contentAlignment: value,
                                            })
                                        }
                                    >
                                        {label}
                                    </Button>
                                ))}
                            </ButtonGroup>
                        </BaseControl>
                    </PanelBody>

                    <PanelBody title={__("Number", "essential-blocks")} initialOpen={false}>
                        <TypographyDropdown
                            baseLabel="Typography"
                            typographyPrefixConstant={typoPrefix_number}
                        />

                        <ColorControl
                            label={__("Color", "essential-blocks")}
                            color={numberColor}
                            onChange={(numberColor) => handleBlockDefault({ numberColor })}
                        />
                    </PanelBody>

                    <PanelBody title={__("Title", "essential-blocks")} initialOpen={false}>
                        <TypographyDropdown
                            baseLabel="Typography"
                            typographyPrefixConstant={typoPrefix_title}
                        />

                        <ColorControl
                            label={__("Color", "essential-blocks")}
                            color={titleColor}
                            onChange={(titleColor) => handleBlockDefault({ titleColor })}
                        />
                    </PanelBody>

                    <PanelBody title={__("Number prefix", "essential-blocks")} initialOpen={false}>
                        <TypographyDropdown
                            baseLabel="Typography"
                            typographyPrefixConstant={typoPrefix_numPrefix}
                        />

                        <ColorControl
                            label={__("Color", "essential-blocks")}
                            color={numPrefixColor}
                            onChange={(numPrefixColor) => handleBlockDefault({ numPrefixColor })}
                        />
                    </PanelBody>

                    <PanelBody title={__("Number Suffix", "essential-blocks")} initialOpen={false}>
                        <TypographyDropdown
                            baseLabel="Typography"
                            typographyPrefixConstant={typoPrefix_numSuffix}
                        />

                        <ColorControl
                            label={__("Color", "essential-blocks")}
                            color={numSuffixColor}
                            onChange={(numSuffixColor) => handleBlockDefault({ numSuffixColor })}
                        />
                    </PanelBody>

                    <PanelBody title={__("Spacing", "essential-blocks")} initialOpen={false}>
                        <ResponsiveRangeController
                            baseLabel={__("Number & Title", "Number-counter")}
                            controlName={rgNumTitle}
                            max={100}
                        />
                        <ResponsiveRangeController
                            baseLabel={__("Number & Prefix", "Number-counter")}
                            controlName={rgNumPrefix}
                            max={100}
                        />
                        <ResponsiveRangeController
                            baseLabel={__("Number & Suffix", "Number-counter")}
                            controlName={rgNumSuffix}
                            max={100}
                        />
                    </PanelBody>

                    {/* Advanced */}
                    <PanelBody title={__("Wrapper Margin Padding", "essential-blocks")} initialOpen={false}>
                        <ResponsiveDimensionsControl
                            controlName={wrapperMargin}
                            baseLabel="Margin"
                        />
                        <ResponsiveDimensionsControl
                            controlName={wrapperPadding}
                            baseLabel="Padding"
                        />
                    </PanelBody>

                    <PanelBody title={__(" WrapperBackground", "essential-blocks")} initialOpen={false}>
                        <BackgroundControl controlName={WrapBg} />
                    </PanelBody>

                    <PanelBody title={__("Wrapper Border & Shadow")} initialOpen={false}>
                        <BorderShadowControl controlName={wrpBdShadow} />
                    </PanelBody>
                </div>
            )}
        </>
    );
}

export default withBlockContext(objAttributes)(NumberCounter);
