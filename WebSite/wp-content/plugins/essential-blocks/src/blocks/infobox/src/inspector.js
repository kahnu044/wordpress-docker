/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useEffect } from "@wordpress/element";
import { MediaUpload } from "@wordpress/block-editor";
import {
    SelectControl,
    ToggleControl,
    TextControl,
    Button,
    BaseControl,
    ButtonGroup,
    __experimentalDivider as Divider,
} from "@wordpress/components";

import { infoWrapBg, infoBtnBg } from "./constants/backgroundsConstants";
import { wrpBdShadow, btnBdShd } from "./constants/borderShadowConstants";

import objAttributes from "./attributes";

import {
    BackgroundControl,
    BorderShadowControl,
    GradientColorControl,
    ColorControl,
    ImageAvatar,
    ResponsiveRangeController,
    ResponsiveDimensionsControl,
    TypographyDropdown,
    DynamicInputControl,
    EBIconPicker,
    InspectorPanel
} from "@essential-blocks/controls";

import {
    typoPrefix_title,
    typoPrefix_content,
    typoPrefix_number,
    typoPrefix_subTitle,
    typoPrefix_buttonText,
} from "./constants/typographyPrefixConstants";

import {
    mediaIconSize,
    mediaImageWidth,
    mediaImageHeight,
    mediaContentGap,
} from "./constants/rangeNames";

import {
    mediaBackground,
    mediaBgMargin,
    mediaBgRadius,
    buttonPadding,
    subTitlePadding,
    contentPadding,
    titlePadding,
    wrapperMargin,
    wrapperPadding,
} from "./constants/dimensionsConstants";

import {
    LAYOUT_TYPES,
    MEDIA_TYPES,
    ICON_IMAGE_BG_TYPES,
    sizeUnitTypes,
    HEADER_TAGS,
    CONTENTS_ALIGNMENTS,
    MEDIA_ALIGNMENTS_ON_FLEX_COLUMN,
    MEDIA_ALIGNMENTS_ON_FLEX_ROW,
    HOVER_EFFECT,
    imgHeightUnits,
} from "./constants";

function Inspector(props) {
    const { attributes, setAttributes } = props;

    const {
        blockId,
        resOption,
        layoutPreset,
        media,
        enableSubTitle,
        number,
        imageUrl,
        imageAlt,
        infoboxIcon,
        flexDirection,
        enableDescription,
        useNumIconBg,
        numIconColor,
        numIconBgType,
        numIconBgColor,
        numIconBgGradient,
        imageId,
        isMediaImgHeightAuto,
        titleTag,
        subTitleTag,
        enableButton,
        isInfoClick,
        buttonText,
        infoboxLink,
        buttonTextColor,
        buttonHvrTextColor,
        titleColor,
        subTitleColor,
        descriptionColor,
        mediaAlignment,
        contentsAlignment,
        btnAlignment,
        btnEffect,
        linkNewTab,
    } = attributes;

    useEffect(() => {
        switch (layoutPreset) {
            case "preset1":
                setAttributes({
                    flexDirection: "column",
                    contentAlignment: "center",
                    mediaAlignSelf: "center",
                });
                break;

            case "preset2":
                setAttributes({
                    flexDirection: "column-reverse",
                    contentAlignment: "center",
                    mediaAlignSelf: "center",
                });
                break;

            case "preset3":
                setAttributes({
                    flexDirection: "row",
                    contentAlignment: "left",
                    mediaAlignSelf: "flex-start",
                });
                break;

            case "preset4":
                setAttributes({
                    flexDirection: "row-reverse",
                    contentAlignment: "right",
                    mediaAlignSelf: "flex-start",
                });
                break;
        }
    }, [layoutPreset]);

    return (
        <InspectorPanel advancedControlProps={{
            marginPrefix: wrapperMargin,
            paddingPrefix: wrapperPadding,
            backgroundPrefix: infoWrapBg,
            borderPrefix: wrpBdShadow,
            hasMargin: true
        }}>
            <InspectorPanel.General>
                <>
                    <InspectorPanel.PanelBody
                        title={__(
                            "Infobox Settings",
                            "essential-blocks"
                        )}
                        initialOpen={true}
                    >
                        <SelectControl
                            label={__(
                                "Layout Preset ",
                                "essential-blocks"
                            )}
                            value={layoutPreset}
                            options={LAYOUT_TYPES}
                            onChange={(layoutPreset) =>
                                setAttributes({ layoutPreset })
                            }
                        />

                        <ToggleControl
                            label={__(
                                "Clickable Infobox",
                                "essential-blocks"
                            )}
                            checked={isInfoClick}
                            onChange={() =>
                                setAttributes({
                                    isInfoClick: !isInfoClick,
                                })
                            }
                        />

                        {isInfoClick && (
                            <>
                                <TextControl
                                    // id={`info-link-input-${blockId}`}
                                    label={__(
                                        "URL (use https:// at the beginning)",
                                        "essential-blocks"
                                    )}
                                    placeholder="https://your-link.com"
                                    value={infoboxLink}
                                    onChange={(infoboxLink) =>
                                        setAttributes({
                                            infoboxLink,
                                        })
                                    }
                                />
                                <ToggleControl
                                    label={__(
                                        "Open in New Tab",
                                        "essential-blocks"
                                    )}
                                    checked={linkNewTab}
                                    onChange={() =>
                                        setAttributes({
                                            linkNewTab: !linkNewTab,
                                        })
                                    }
                                />
                            </>
                        )}

                        {!isInfoClick && (
                            <ToggleControl
                                label={__(
                                    "Show button",
                                    "essential-blocks"
                                )}
                                checked={enableButton}
                                onChange={() =>
                                    setAttributes({
                                        enableButton: !enableButton,
                                    })
                                }
                            />
                        )}
                    </InspectorPanel.PanelBody>

                    <InspectorPanel.PanelBody
                        title={__(
                            "Alignments",
                            "essential-blocks"
                        )}
                    >
                        {media !== "none" && (
                            <>
                                {(flexDirection === "row" ||
                                    flexDirection ===
                                    "row-reverse") && (
                                        <BaseControl
                                            id="eb-infobox-alignments"
                                            label={__("Media alignments", "essential-blocks")}
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
                                                                mediaAlignment !==
                                                                value
                                                            }
                                                            isPrimary={
                                                                mediaAlignment ===
                                                                value
                                                            }
                                                            onClick={() =>
                                                                setAttributes(
                                                                    {
                                                                        mediaAlignment: value,
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

                                {(flexDirection === "column" ||
                                    flexDirection ===
                                    "column-reverse") && (
                                        <BaseControl
                                            id="eb-infobox-alignments"
                                            label={__("Media alignments", "essential-blocks")}
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
                                                                mediaAlignment !==
                                                                value
                                                            }
                                                            isPrimary={
                                                                mediaAlignment ===
                                                                value
                                                            }
                                                            onClick={() =>
                                                                setAttributes(
                                                                    {
                                                                        mediaAlignment: value,
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
                            label={__("Contents alignments", "essential-blocks")}
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
                                                contentsAlignment !==
                                                value
                                            }
                                            isPrimary={
                                                contentsAlignment ===
                                                value
                                            }
                                            onClick={() =>
                                                setAttributes({
                                                    contentsAlignment: value,
                                                })
                                            }
                                        >
                                            {label}
                                        </Button>
                                    )
                                )}
                            </ButtonGroup>
                        </BaseControl>

                        {enableButton && !isInfoClick && (
                            <BaseControl
                                id="eb-infobox-alignments"
                                label={__("Button alignments", "essential-blocks")}
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
                                                    btnAlignment !==
                                                    value
                                                }
                                                isPrimary={
                                                    btnAlignment ===
                                                    value
                                                }
                                                onClick={() =>
                                                    setAttributes(
                                                        {
                                                            btnAlignment: value,
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
                    </InspectorPanel.PanelBody>

                    {enableButton && !isInfoClick && (
                        <InspectorPanel.PanelBody
                            title={__(
                                "Button",
                                "essential-blocks"
                            )}
                            initialOpen={false}
                        >
                            <DynamicInputControl
                                label={__("Button Text", "essential-blocks")}
                                attrName="buttonText"
                                inputValue={buttonText}
                                setAttributes={setAttributes}
                                onChange={(text) =>
                                    setAttributes({
                                        buttonText: text,
                                    })
                                }
                            />

                            <DynamicInputControl
                                label={__("Button Link", "essential-blocks")}
                                placeholder="https://your-site.com"
                                attrName="infoboxLink"
                                inputValue={infoboxLink}
                                setAttributes={setAttributes}
                                onChange={(text) =>
                                    setAttributes({
                                        infoboxLink: text,
                                    })
                                }
                                help={__("Link URL (use https:// at the beginning)", "essential-blocks")}
                            />

                            <ToggleControl
                                label={__(
                                    "Open in New Tab",
                                    "essential-blocks"
                                )}
                                checked={linkNewTab}
                                onChange={() =>
                                    setAttributes({
                                        linkNewTab: !linkNewTab,
                                    })
                                }
                            />
                        </InspectorPanel.PanelBody>
                    )}
                </>
            </InspectorPanel.General>
            <InspectorPanel.Style>
                <>
                    <InspectorPanel.PanelBody
                        title={__("Media", "essential-blocks")}
                        initialOpen={true}
                    >
                        <BaseControl id="eb-infobox-image-icon">
                            <ButtonGroup id="eb-infobox-image-icon">
                                {MEDIA_TYPES.map(
                                    (
                                        { label, value },
                                        index
                                    ) => (
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
                                            {label}
                                        </Button>
                                    )
                                )}
                            </ButtonGroup>
                        </BaseControl>

                        {media !== "none" && (
                            <>
                                {media === "icon" && (
                                    <EBIconPicker
                                        value={infoboxIcon}
                                        attributeName={'infoboxIcon'}
                                    />
                                )}

                                {media === "icon" &&
                                    infoboxIcon && (
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

                                {media === "number" && (
                                    <>
                                        <DynamicInputControl
                                            label={__(
                                                "Text",
                                                "essential-blocks"
                                            )}
                                            attrName="number"
                                            inputValue={number || ''}
                                            setAttributes={setAttributes}
                                            onChange={(text) =>
                                                setAttributes({
                                                    number: text,
                                                })
                                            }
                                        />

                                        <TypographyDropdown
                                            baseLabel={__("Text Typography", "essential-blocks")}
                                            typographyPrefixConstant={
                                                typoPrefix_number
                                            }
                                        />
                                    </>
                                )}

                                {(media === "number" ||
                                    media === "icon") && (
                                        <>
                                            <ColorControl
                                                label={__(
                                                    "Color",
                                                    "essential-blocks"
                                                )}
                                                color={numIconColor}
                                                attributeName={'numIconColor'}
                                            />

                                            <ResponsiveDimensionsControl
                                                controlName={
                                                    mediaBackground
                                                }
                                                baseLabel={__("Padding", "essential-blocks")}
                                            />

                                            <ToggleControl
                                                label={__(
                                                    "Use Background",
                                                    "essential-blocks"
                                                )}
                                                checked={
                                                    useNumIconBg
                                                }
                                                onChange={() =>
                                                    setAttributes({
                                                        useNumIconBg: !useNumIconBg,
                                                    })
                                                }
                                            />

                                            {useNumIconBg && (
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
                                                                            numIconBgType ===
                                                                            value
                                                                        }
                                                                        isSecondary={
                                                                            numIconBgType !==
                                                                            value
                                                                        }
                                                                        onClick={() =>
                                                                            setAttributes(
                                                                                {
                                                                                    numIconBgType: value,
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

                                                    {numIconBgType ===
                                                        "fill" && (
                                                            <ColorControl
                                                                label={__(
                                                                    "Background Color",
                                                                    "essential-blocks"
                                                                )}
                                                                color={
                                                                    numIconBgColor
                                                                }
                                                                attributeName={'numIconBgColor'}
                                                            />
                                                        )}

                                                    {numIconBgType ===
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
                                                                        numIconBgGradient
                                                                    }
                                                                    onChange={(
                                                                        numIconBgGradient
                                                                    ) =>
                                                                        setAttributes(
                                                                            {
                                                                                numIconBgGradient,
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

                                {media === "image" &&
                                    !imageUrl && (
                                        <MediaUpload
                                            onSelect={({
                                                id,
                                                url,
                                                alt,
                                            }) =>
                                                setAttributes({
                                                    imageUrl: url,
                                                    imageId: id,
                                                    imageAlt: alt,
                                                })
                                            }
                                            type="image"
                                            value={imageId}
                                            render={({
                                                open,
                                            }) => {
                                                return (
                                                    <Button
                                                        className="eb-background-control-inspector-panel-img-btn components-button"
                                                        label={__(
                                                            "Upload Image",
                                                            "essential-blocks"
                                                        )}
                                                        icon="format-image"
                                                        onClick={
                                                            open
                                                        }
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
                                            units={
                                                sizeUnitTypes
                                            }
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

                                {media !== "none" && (
                                    <>
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
                                    </>
                                )}

                                <ResponsiveDimensionsControl
                                    forBorderRadius
                                    controlName={mediaBgRadius}
                                    baseLabel={__("Border Radius", "essential-blocks")}
                                />

                                <ResponsiveDimensionsControl
                                    controlName={mediaBgMargin}
                                    baseLabel={__("Margin", "essential-blocks")}
                                />
                            </>
                        )}
                    </InspectorPanel.PanelBody>

                    <InspectorPanel.PanelBody
                        title={__("Title", "essential-blocks")}
                        initialOpen={false}
                    >
                        <BaseControl
                            label={__(
                                "Title Tag",
                                "essential-blocks"
                            )}
                        >
                            <ButtonGroup className="infobox-button-group">
                                {HEADER_TAGS.map(
                                    (header, index) => (
                                        <Button
                                            key={index}
                                            isSecondary={
                                                titleTag !==
                                                header
                                            }
                                            isPrimary={
                                                titleTag ===
                                                header
                                            }
                                            onClick={() =>
                                                setAttributes({
                                                    titleTag: header,
                                                })
                                            }
                                        >
                                            {header.toUpperCase()}
                                        </Button>
                                    )
                                )}
                            </ButtonGroup>
                        </BaseControl>

                        <TypographyDropdown
                            baseLabel={__("Typography", "essential-blocks")}
                            typographyPrefixConstant={
                                typoPrefix_title
                            }
                        />

                        <ResponsiveDimensionsControl
                            controlName={titlePadding}
                            baseLabel={__("Title Padding", "essential-blocks")}
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
                            "Subtitle",
                            "essential-blocks"
                        )}
                        initialOpen={false}
                    >
                        <ToggleControl
                            label={__(
                                "Enable",
                                "essential-blocks"
                            )}
                            checked={enableSubTitle}
                            onChange={() =>
                                setAttributes({
                                    enableSubTitle: !enableSubTitle,
                                })
                            }
                        />

                        {enableSubTitle && (
                            <>
                                <BaseControl
                                    label={__(
                                        "Subtitle Tag",
                                        "essential-blocks"
                                    )}
                                >
                                    <ButtonGroup className="infobox-button-group">
                                        {HEADER_TAGS.map(
                                            (header, index) => (
                                                <Button
                                                    key={index}
                                                    isSecondary={
                                                        subTitleTag !==
                                                        header
                                                    }
                                                    isPrimary={
                                                        subTitleTag ===
                                                        header
                                                    }
                                                    onClick={() =>
                                                        setAttributes(
                                                            {
                                                                subTitleTag: header,
                                                            }
                                                        )
                                                    }
                                                >
                                                    {header.toUpperCase()}
                                                </Button>
                                            )
                                        )}
                                    </ButtonGroup>
                                </BaseControl>

                                <TypographyDropdown
                                    baseLabel={__("Typography", "essential-blocks")}
                                    typographyPrefixConstant={
                                        typoPrefix_subTitle
                                    }
                                />

                                <ResponsiveDimensionsControl
                                    controlName={
                                        subTitlePadding
                                    }
                                    baseLabel={__("Subtitle Padding", "essential-blocks")}
                                />

                                <ColorControl
                                    label={__(
                                        "Color",
                                        "essential-blocks"
                                    )}
                                    color={subTitleColor}
                                    attributeName={'subTitleColor'}
                                />
                            </>
                        )}
                    </InspectorPanel.PanelBody>

                    <InspectorPanel.PanelBody
                        title={__(
                            "Content",
                            "essential-blocks"
                        )}
                        initialOpen={false}
                    >
                        <ToggleControl
                            label={__(
                                "Show content",
                                "essential-blocks"
                            )}
                            checked={enableDescription}
                            onChange={() =>
                                setAttributes({
                                    enableDescription: !enableDescription,
                                })
                            }
                        />

                        {enableDescription && (
                            <>
                                <TypographyDropdown
                                    baseLabel={__("Typography", "essential-blocks")}
                                    typographyPrefixConstant={
                                        typoPrefix_content
                                    }
                                />

                                <ResponsiveDimensionsControl
                                    controlName={contentPadding}
                                    baseLabel={__("Content Padding", "essential-blocks")}
                                />

                                <ColorControl
                                    label={__(
                                        "Color",
                                        "essential-blocks"
                                    )}
                                    color={descriptionColor}
                                    attributeName={'descriptionColor'}
                                />
                            </>
                        )}
                    </InspectorPanel.PanelBody>

                    {enableButton && !isInfoClick && (
                        <InspectorPanel.PanelBody
                            title={__(
                                "Button",
                                "essential-blocks"
                            )}
                            initialOpen={false}
                        >
                            <TypographyDropdown
                                baseLabel={__("Typography", "essential-blocks")}
                                typographyPrefixConstant={
                                    typoPrefix_buttonText
                                }
                            />

                            <ResponsiveDimensionsControl
                                controlName={buttonPadding}
                                baseLabel={__("Button Padding", "essential-blocks")}
                            />

                            <ColorControl
                                label={__(
                                    "Text color",
                                    "essential-blocks"
                                )}
                                color={buttonTextColor}
                                attributeName={'buttonTextColor'}
                            />

                            <ColorControl
                                label={__(
                                    "Hover text color",
                                    "essential-blocks"
                                )}
                                color={buttonHvrTextColor}
                                attributeName={'buttonHvrTextColor'}
                            />

                            <InspectorPanel.PanelBody
                                title={__(
                                    "Background",
                                    "essential-blocks"
                                )}
                                initialOpen={false}
                            >
                                <BackgroundControl
                                    controlName={infoBtnBg}
                                    forButton
                                // noOverlay
                                // noMainBgi
                                // noOverlayBgi // if U pass 'noOverlay' prop U don't need to pass 'noOverlayBgi'
                                />
                            </InspectorPanel.PanelBody>

                            <InspectorPanel.PanelBody
                                title={__("Border & Shadow", "essential-blocks")}
                                initialOpen={false}
                            >
                                <BorderShadowControl
                                    controlName={btnBdShd}
                                // noShadow
                                // noBorder
                                />
                            </InspectorPanel.PanelBody>
                            <InspectorPanel.PanelBody
                                title={__(
                                    "More Effects",
                                    "essential-blocks"
                                )}
                                initialOpen={false}
                            >
                                <SelectControl
                                    label={__(
                                        "Button Hover Effect",
                                        "essential-blocks"
                                    )}
                                    value={btnEffect}
                                    options={HOVER_EFFECT}
                                    onChange={(btnEffect) => {
                                        setAttributes({
                                            btnEffect,
                                        });
                                    }}
                                />
                            </InspectorPanel.PanelBody>
                        </InspectorPanel.PanelBody>
                    )}
                </>
            </InspectorPanel.Style>
        </InspectorPanel>
    );
}
export default Inspector;
