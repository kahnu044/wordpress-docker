/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { MediaUpload } from "@wordpress/block-editor";
import {
    ToggleControl,
    TextControl,
    SelectControl,
    BaseControl,
    Button,
    ButtonGroup,
    __experimentalDivider as Divider,
} from "@wordpress/components";

import {
    ColorControl,
    ResponsiveDimensionsControl,
    ResponsiveRangeController,
    TypographyDropdown,
    GradientColorControl,
    ImageAvatar,
    EBIconPicker,
    InspectorPanel
} from "@essential-blocks/controls";

import {
    SEPARATOR_OPTIONS,
    LAYOUT_OPTIONS,
    MEDIA_TYPES,
    ICON_IMAGE_BG_TYPES,
    MEDIA_ALIGNMENTS_ON_FLEX_COLUMN,
    MEDIA_ALIGNMENTS_ON_FLEX_ROW,
    CONTENTS_ALIGNMENTS_ON_FLEX_ROW,
    sizeUnitTypes,
    imgHeightUnits,
    LAYOUT_TYPES,
    HEADER_TAGS,
    CONTENTS_ALIGNMENTS,
    // HOVER_EFFECT,
} from "./constants";

import {
    typoPrefix_numPrefix,
    typoPrefix_numSuffix,
    typoPrefix_number,
    typoPrefix_title,
} from "./constants/typographyPrefixConstants";

import {
    wrapperMargin,
    wrapperPadding,

    //
    mediaBgPadding,
    mediaBgMargin,
    mediaBgRadius,
} from "./constants/dimensionsConstants";
import { WrapBg } from "./constants/backgroundsConstants";
import { wrpBdShadow } from "./constants/borderShadowConstants";
import {
    rgNumTitle,
    rgNumPrefix,
    rgNumSuffix,

    //
    mediaIconSize,
    mediaImageWidth,
    mediaImageHeight,
    mediaContentGap,
} from "./constants/rangeNames";

const Inspector = (props) => {
    const { attributes, setAttributes } = props;
    const {
        // responsive control attributes ⬇
        resOption,

        // counter settings attributes ⬇
        startValue,
        target,
        counterPrefix,
        counterSuffix,
        duration,
        isShowSeparator,
        separastorSelectLabel,
        layoutLabel,

        // counter color attributes ⬇
        titleColor,
        numberColor,
        numPrefixColor,
        numSuffixColor,

        //
        //
        layoutPreset,

        //
        rootFlexDirection,
        contentAlignment,
        mediaAlignSelf,
        contentsAlignSelf,

        //
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
        counterTitleLevel,
        titleLevel,
    } = attributes;

    const handleSeparatorChange = (separastorSelectLabel) => {
        switch (separastorSelectLabel) {
            case "Default":
                setAttributes({ separator: "," });
                break;

            case "Dot":
                setAttributes({ separator: "." });
                break;

            case "Space":
                setAttributes({ separator: " " });
                break;
        }
        setAttributes({ separastorSelectLabel });
    };

    const handleLayoutChange = (layoutLabel) => {
        switch (layoutLabel) {
            case "Default":
                setAttributes({ wrapperFlexDirection: "column" });
                break;

            case "Reverse":
                setAttributes({ wrapperFlexDirection: "column-reverse" });
                break;
        }
        setAttributes({ layoutLabel });
    };

    const handlePresetChange = (layoutPreset) => {
        switch (layoutPreset) {
            case "preset1":
                setAttributes({
                    rootFlexDirection: "column",
                    contentAlignment: "center",
                    mediaAlignSelf: "center",
                });
                break;

            case "preset2":
                setAttributes({
                    rootFlexDirection: "column-reverse",
                    contentAlignment: "center",
                    mediaAlignSelf: "center",
                });
                break;

            case "preset3":
                setAttributes({
                    rootFlexDirection: "row",
                    contentAlignment: "left",
                    mediaAlignSelf: "flex-start",
                });
                break;

            case "preset4":
                setAttributes({
                    rootFlexDirection: "row-reverse",
                    contentAlignment: "right",
                    mediaAlignSelf: "flex-start",
                });
                break;
        }
        setAttributes({ layoutPreset });
    };

    return (
        <InspectorPanel advancedControlProps={{
            marginPrefix: wrapperMargin,
            paddingPrefix: wrapperPadding,
            backgroundPrefix: WrapBg,
            borderPrefix: wrpBdShadow,
            hasMargin: true
        }}>
            <InspectorPanel.General>
                <>
                    <InspectorPanel.PanelBody
                        initialOpen={true}
                    >
                        <BaseControl
                            id="eb-infobox-image-icon"
                            label={__(
                                "Media Options",
                                "essential-blocks"
                            )}
                        >
                            <ButtonGroup id="eb-infobox-image-icon">
                                {MEDIA_TYPES.map(
                                    (value, index) => (
                                        <Button
                                            key={index}
                                            isSecondary={
                                                media !== value
                                            }
                                            isPrimary={
                                                media === value
                                            }
                                            onClick={() =>
                                                setAttributes({
                                                    media: value,
                                                })
                                            }
                                        >
                                            {value}
                                        </Button>
                                    )
                                )}
                            </ButtonGroup>
                        </BaseControl>
                        {media === "icon" && (
                            <EBIconPicker
                                value={selectedIcon}
                                attributeName={'selectedIcon'}
                            />
                        )}
                        {media === "image" && !imageUrl && (
                            <MediaUpload
                                onSelect={({ id, url }) =>
                                    setAttributes({
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
                                            label={__(
                                                "Upload Image",
                                                "essential-blocks"
                                            )}
                                            icon="format-image"
                                            onClick={open}
                                        />
                                    );
                                }}
                            />
                        )}
                    </InspectorPanel.PanelBody>

                    {media !== "none" && (
                        <>
                            <InspectorPanel.PanelBody
                                initialOpen={true}
                            >
                                <SelectControl
                                    label={__(
                                        "Layout Preset ",
                                        "essential-blocks"
                                    )}
                                    value={layoutPreset}
                                    options={LAYOUT_TYPES}
                                    onChange={
                                        handlePresetChange
                                    }
                                />

                                <ResponsiveRangeController
                                    baseLabel={__(
                                        "Media & content spacing",
                                        "Infobox"
                                    )}
                                    controlName={
                                        mediaContentGap
                                    }
                                    min={0}
                                    max={500}
                                    step={1}
                                    noUnits
                                />
                            </InspectorPanel.PanelBody>
                        </>
                    )}

                    <InspectorPanel.PanelBody
                        title={__(
                            "Counter Settings",
                            "essential-blocks"
                        )}
                        initialOpen={true}
                    >
                        <BaseControl id="eb-counter-start-value">
                            <TextControl
                                label={__(
                                    "Starting Number",
                                    "essential-blocks"
                                )}
                                value={startValue}
                                type="number"
                                onChange={(value) =>
                                    !/[\-\.]/.test(value) &&
                                    setAttributes({
                                        startValue: value,
                                    })
                                }
                            />
                        </BaseControl>
                        <BaseControl id="eb-counter-end-value">
                            <TextControl
                                label={__(
                                    "Ending Number",
                                    "essential-blocks"
                                )}
                                value={target}
                                type="number"
                                onChange={(value) =>
                                    !/[\-\.]/.test(value) &&
                                    setAttributes({
                                        target: value,
                                    })
                                }
                            />
                        </BaseControl>
                        <BaseControl id="eb-counter-duration">
                            <TextControl
                                label={__(
                                    "Animation Duration",
                                    "essential-blocks"
                                )}
                                value={duration}
                                type="number"
                                onChange={(value) =>
                                    !/[\-\.]/.test(value) &&
                                    setAttributes({
                                        duration: value,
                                    })
                                }
                            />
                        </BaseControl>
                        <BaseControl id="eb-counter-prefix">
                            <TextControl
                                label={__(
                                    "Number Prefix",
                                    "essential-blocks"
                                )}
                                value={counterPrefix}
                                onChange={(counterPrefix) =>
                                    setAttributes({
                                        counterPrefix,
                                    })
                                }
                            />
                        </BaseControl>
                        <BaseControl id="eb-counter-suffix">
                            <TextControl
                                label={__(
                                    "Number Suffix",
                                    "essential-blocks"
                                )}
                                value={counterSuffix}
                                onChange={(counterSuffix) =>
                                    setAttributes({
                                        counterSuffix,
                                    })
                                }
                            />
                        </BaseControl>

                        <SelectControl
                            label={__(
                                "Content layouts",
                                "essential-blocks"
                            )}
                            options={LAYOUT_OPTIONS}
                            value={layoutLabel}
                            onChange={(value) =>
                                handleLayoutChange(value)
                            }
                        />

                        <ToggleControl
                            label={__(
                                "Thousand Separator",
                                "essential-blocks"
                            )}
                            checked={isShowSeparator}
                            onChange={() =>
                                setAttributes({
                                    isShowSeparator: !isShowSeparator,
                                })
                            }
                        />

                        {isShowSeparator && (
                            <SelectControl
                                label={__(
                                    "Separator",
                                    "essential-blocks"
                                )}
                                options={SEPARATOR_OPTIONS}
                                value={separastorSelectLabel}
                                onChange={(value) =>
                                    handleSeparatorChange(value)
                                }
                            />
                        )}
                    </InspectorPanel.PanelBody>
                    <InspectorPanel.PanelBody initialOpen={true}>
                        <BaseControl
                            label={__(
                                "Counter Title Level",
                                "essential-blocks"
                            )}
                            id="eb-advance-heading-alignment"
                        >
                            <ButtonGroup className="eb-advance-heading-alignment eb-html-tag-buttongroup">
                                {HEADER_TAGS.map(
                                    (item, key) => (
                                        <Button
                                            key={key}
                                            // isLarge
                                            isPrimary={
                                                counterTitleLevel ===
                                                item.value
                                            }
                                            isSecondary={
                                                counterTitleLevel !==
                                                item.value
                                            }
                                            onClick={() =>
                                                setAttributes({
                                                    counterTitleLevel:
                                                        item.value,
                                                })
                                            }
                                        >
                                            {item.label}
                                        </Button>
                                    )
                                )}
                            </ButtonGroup>
                        </BaseControl>
                        <Divider />
                        <BaseControl
                            label={__(
                                "Title Level",
                                "essential-blocks"
                            )}
                            id="eb-advance-heading-alignment"
                        >
                            <ButtonGroup className="eb-advance-heading-alignment eb-html-tag-buttongroup">
                                {HEADER_TAGS.map(
                                    (item, key) => (
                                        <Button
                                            key={key}
                                            // isLarge
                                            isPrimary={
                                                titleLevel ===
                                                item.value
                                            }
                                            isSecondary={
                                                titleLevel !==
                                                item.value
                                            }
                                            onClick={() =>
                                                setAttributes({
                                                    titleLevel:
                                                        item.value,
                                                })
                                            }
                                        >
                                            {item.label}
                                        </Button>
                                    )
                                )}
                            </ButtonGroup>
                        </BaseControl>
                    </InspectorPanel.PanelBody>
                </>
            </InspectorPanel.General>
            <InspectorPanel.Style>
                <>
                    {media !== "none" && (
                        <InspectorPanel.PanelBody
                            title={__(
                                "Media",
                                "essential-blocks"
                            )}
                            initialOpen={true}
                        >
                            {media === "icon" && (
                                <>

                                    {selectedIcon && (
                                        <ResponsiveRangeController
                                            baseLabel={__(
                                                "Icon Size",
                                                "essential-blocks"
                                            )}
                                            controlName={
                                                mediaIconSize
                                            }
                                            min={8}
                                            max={200}
                                            step={1}
                                        />
                                    )}

                                    <ColorControl
                                        label={__(
                                            "Color",
                                            "essential-blocks"
                                        )}
                                        color={iconColor}
                                        attributeName={'iconColor'}
                                    />

                                    <ResponsiveDimensionsControl
                                        controlName={
                                            mediaBgPadding
                                        }
                                        baseLabel="Padding"
                                    />

                                    <ToggleControl
                                        label={__(
                                            "Use Background",
                                            "essential-blocks"
                                        )}
                                        checked={useIconBg}
                                        onChange={() =>
                                            setAttributes({
                                                useIconBg: !useIconBg,
                                            })
                                        }
                                    />

                                    {useIconBg && (
                                        <>
                                            <BaseControl
                                                label={__(
                                                    "Background Type",
                                                    "essential-blocks"
                                                )}
                                            >
                                                <ButtonGroup id="eb-infobox-infobox-background">
                                                    {ICON_IMAGE_BG_TYPES.map(
                                                        (
                                                            {
                                                                value,
                                                                label,
                                                            },
                                                            index
                                                        ) => (
                                                            <Button
                                                                key={
                                                                    index
                                                                }
                                                                isPrimary={
                                                                    iconBgType ===
                                                                    value
                                                                }
                                                                isSecondary={
                                                                    iconBgType !==
                                                                    value
                                                                }
                                                                onClick={() =>
                                                                    setAttributes(
                                                                        {
                                                                            iconBgType: value,
                                                                        }
                                                                    )
                                                                }
                                                            >
                                                                {
                                                                    label
                                                                }
                                                            </Button>
                                                        )
                                                    )}
                                                </ButtonGroup>
                                            </BaseControl>

                                            {iconBgType ===
                                                "fill" && (
                                                    <ColorControl
                                                        label={__(
                                                            "Background Color",
                                                            "essential-blocks"
                                                        )}
                                                        color={
                                                            iconBgColor
                                                        }
                                                        attributeName={'iconBgColor'}
                                                    />
                                                )}

                                            {iconBgType ===
                                                "gradient" && (
                                                    <InspectorPanel.PanelBody
                                                        title={__(
                                                            "Gradient",
                                                            "essential-blocks"
                                                        )}
                                                    // initialOpen={false}
                                                    >
                                                        <GradientColorControl
                                                            gradientColor={
                                                                iconBgGradient
                                                            }
                                                            onChange={(
                                                                iconBgGradient
                                                            ) =>
                                                                setAttributes(
                                                                    {
                                                                        iconBgGradient,
                                                                    }
                                                                )
                                                            }
                                                        />
                                                    </InspectorPanel.PanelBody>
                                                )}
                                        </>
                                    )}
                                </>
                            )}

                            {media === "image" && imageUrl && (
                                <>
                                    <ImageAvatar
                                        imageUrl={imageUrl}
                                        onDeleteImage={() =>
                                            setAttributes({
                                                imageUrl: null,
                                            })
                                        }
                                    />
                                    <ResponsiveRangeController
                                        baseLabel={__(
                                            "Image Width",
                                            "essential-blocks"
                                        )}
                                        controlName={
                                            mediaImageWidth
                                        }
                                        units={sizeUnitTypes}
                                        min={0}
                                        max={500}
                                        step={1}
                                    />
                                    <ToggleControl
                                        label={__(
                                            "Auto Image Height",
                                            "essential-blocks"
                                        )}
                                        checked={
                                            isMediaImgHeightAuto
                                        }
                                        onChange={() =>
                                            setAttributes({
                                                isMediaImgHeightAuto: !isMediaImgHeightAuto,
                                            })
                                        }
                                    />

                                    {!isMediaImgHeightAuto && (
                                        <>
                                            <ResponsiveRangeController
                                                baseLabel={__(
                                                    "Image Height",
                                                    "essential-blocks"
                                                )}
                                                controlName={
                                                    mediaImageHeight
                                                }
                                                units={
                                                    imgHeightUnits
                                                }
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
                        </InspectorPanel.PanelBody>
                    )}

                    <InspectorPanel.PanelBody
                        title={__(
                            "Alignments",
                            "essential-blocks"
                        )}
                        initialOpen={true}
                    >
                        {media !== "none" && (
                            <>
                                {(rootFlexDirection === "row" ||
                                    rootFlexDirection ===
                                    "row-reverse") && (
                                        <>
                                            <BaseControl
                                                id="eb-infobox-alignments"
                                                label="Media Vertical alignments"
                                            >
                                                <ButtonGroup id="eb-infobox-alignments">
                                                    {MEDIA_ALIGNMENTS_ON_FLEX_ROW.map(
                                                        (
                                                            {
                                                                value,
                                                                label,
                                                            },
                                                            index
                                                        ) => (
                                                            <Button
                                                                key={
                                                                    index
                                                                }
                                                                isSecondary={
                                                                    mediaAlignSelf !==
                                                                    value
                                                                }
                                                                isPrimary={
                                                                    mediaAlignSelf ===
                                                                    value
                                                                }
                                                                onClick={() =>
                                                                    setAttributes(
                                                                        {
                                                                            mediaAlignSelf: value,
                                                                        }
                                                                    )
                                                                }
                                                            >
                                                                {
                                                                    label
                                                                }
                                                            </Button>
                                                        )
                                                    )}
                                                </ButtonGroup>
                                            </BaseControl>

                                            <BaseControl
                                                id="eb-infobox-alignments"
                                                label="Content Vertical alignments"
                                            >
                                                <ButtonGroup id="eb-infobox-alignments">
                                                    {CONTENTS_ALIGNMENTS_ON_FLEX_ROW.map(
                                                        (
                                                            {
                                                                value,
                                                                label,
                                                            },
                                                            index
                                                        ) => (
                                                            <Button
                                                                key={
                                                                    index
                                                                }
                                                                isSecondary={
                                                                    contentsAlignSelf !==
                                                                    value
                                                                }
                                                                isPrimary={
                                                                    contentsAlignSelf ===
                                                                    value
                                                                }
                                                                onClick={() =>
                                                                    setAttributes(
                                                                        {
                                                                            contentsAlignSelf: value,
                                                                        }
                                                                    )
                                                                }
                                                            >
                                                                {
                                                                    label
                                                                }
                                                            </Button>
                                                        )
                                                    )}
                                                </ButtonGroup>
                                            </BaseControl>
                                        </>
                                    )}

                                {(rootFlexDirection ===
                                    "column" ||
                                    rootFlexDirection ===
                                    "column-reverse") && (
                                        <BaseControl
                                            id="eb-infobox-alignments"
                                            label="Media alignments"
                                        >
                                            <ButtonGroup id="eb-infobox-alignments">
                                                {MEDIA_ALIGNMENTS_ON_FLEX_COLUMN.map(
                                                    (
                                                        {
                                                            value,
                                                            label,
                                                        },
                                                        index
                                                    ) => (
                                                        <Button
                                                            key={
                                                                index
                                                            }
                                                            isSecondary={
                                                                mediaAlignSelf !==
                                                                value
                                                            }
                                                            isPrimary={
                                                                mediaAlignSelf ===
                                                                value
                                                            }
                                                            onClick={() =>
                                                                setAttributes(
                                                                    {
                                                                        mediaAlignSelf: value,
                                                                    }
                                                                )
                                                            }
                                                        >
                                                            {label}
                                                        </Button>
                                                    )
                                                )}
                                            </ButtonGroup>
                                        </BaseControl>
                                    )}
                            </>
                        )}

                        <BaseControl
                            id="eb-infobox-alignments"
                            label="Contents alignments"
                        >
                            <ButtonGroup id="eb-infobox-alignments">
                                {CONTENTS_ALIGNMENTS.map(
                                    (
                                        { value, label },
                                        index
                                    ) => (
                                        <Button
                                            key={index}
                                            isSecondary={
                                                contentAlignment !==
                                                value
                                            }
                                            isPrimary={
                                                contentAlignment ===
                                                value
                                            }
                                            onClick={() =>
                                                setAttributes({
                                                    contentAlignment: value,
                                                })
                                            }
                                        >
                                            {label}
                                        </Button>
                                    )
                                )}
                            </ButtonGroup>
                        </BaseControl>
                    </InspectorPanel.PanelBody>

                    <InspectorPanel.PanelBody
                        title={__("Number", "essential-blocks")}
                        initialOpen={false}
                    >
                        <TypographyDropdown
                            baseLabel="Typography"
                            typographyPrefixConstant={
                                typoPrefix_number
                            }
                        />

                        <ColorControl
                            label={__(
                                "Color",
                                "essential-blocks"
                            )}
                            color={numberColor}
                            attributeName={'numberColor'}
                        />
                    </InspectorPanel.PanelBody>

                    <InspectorPanel.PanelBody
                        title={__("Title", "essential-blocks")}
                        initialOpen={false}
                    >
                        <TypographyDropdown
                            baseLabel="Typography"
                            typographyPrefixConstant={
                                typoPrefix_title
                            }
                        />

                        <ColorControl
                            label={__(
                                "Color",
                                "essential-blocks"
                            )}
                            color={titleColor}
                            attributeName={'titleColor'}
                        />
                    </InspectorPanel.PanelBody>

                    <InspectorPanel.PanelBody
                        title={__(
                            "Number prefix",
                            "essential-blocks"
                        )}
                        initialOpen={false}
                    >
                        <TypographyDropdown
                            baseLabel="Typography"
                            typographyPrefixConstant={
                                typoPrefix_numPrefix
                            }
                        />

                        <ColorControl
                            label={__(
                                "Color",
                                "essential-blocks"
                            )}
                            color={numPrefixColor}
                            attributeName={'numPrefixColor'}
                        />
                    </InspectorPanel.PanelBody>

                    <InspectorPanel.PanelBody
                        title={__(
                            "Number Suffix",
                            "essential-blocks"
                        )}
                        initialOpen={false}
                    >
                        <TypographyDropdown
                            baseLabel="Typography"
                            typographyPrefixConstant={
                                typoPrefix_numSuffix
                            }
                        />

                        <ColorControl
                            label={__(
                                "Color",
                                "essential-blocks"
                            )}
                            color={numSuffixColor}
                            attributeName={'numSuffixColor'}
                        />
                    </InspectorPanel.PanelBody>

                    <InspectorPanel.PanelBody
                        title={__(
                            "Spacing",
                            "essential-blocks"
                        )}
                        initialOpen={false}
                    >
                        <ResponsiveRangeController
                            baseLabel={__(
                                "Number & Title",
                                "Number-counter"
                            )}
                            controlName={rgNumTitle}
                            max={100}
                        />
                        <ResponsiveRangeController
                            baseLabel={__(
                                "Number & Prefix",
                                "Number-counter"
                            )}
                            controlName={rgNumPrefix}
                            max={100}
                        />
                        <ResponsiveRangeController
                            baseLabel={__(
                                "Number & Suffix",
                                "Number-counter"
                            )}
                            controlName={rgNumSuffix}
                            max={100}
                        />
                    </InspectorPanel.PanelBody>
                </>
            </InspectorPanel.Style>
        </InspectorPanel>
    );
};
export default Inspector;
