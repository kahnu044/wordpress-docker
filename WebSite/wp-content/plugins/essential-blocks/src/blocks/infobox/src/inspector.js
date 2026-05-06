/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useEffect } from "@wordpress/element";
import { MediaUpload } from "@wordpress/block-editor";
import {
    SelectControl,
    ToggleControl,
    __experimentalToggleGroupControl as ToggleGroupControl,
    __experimentalToggleGroupControlOption as ToggleGroupControlOption,
    __experimentalDivider as Divider,
} from "@wordpress/components";

import { infoWrapBg, infoBtnBg } from "./constants/backgroundsConstants";
import { wrpBdShadow, btnBdShd, mediaBdShd } from "./constants/borderShadowConstants";

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
    InspectorPanel,
    EBButton,
    ImageComponent,
    EBTextControl
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
    BTN_ICON_SIZE,
    BTN_ICON_SPACE
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
    ICON_POSITION,
    SHAPE_VIEW,
    ICON_SHAPE,
    BUTTON_KEYS
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
        title,
        titleTag,
        subTitle,
        subTitleTag,
        enableButton,
        isInfoClick,
        buttonText,
        infoboxLink,
        buttonTextColor,
        buttonHvrTextColor,
        titleColor,
        subTitleColor,
        description,
        descriptionColor,
        mediaAlignment,
        contentsAlignment,
        btnAlignment,
        btnEffect,
        linkNewTab,
        showMedia,
        enableTitle,
        addBtnIcon,
        btnIcon,
        btnIconPosition,
        iconView,
        iconShape
    } = attributes;

    const changePreset = (selected) => {
        setAttributes({ layoutPreset: selected })

        switch (selected) {
            case "preset1":
                setAttributes({
                    flexDirection: "column",
                    contentAlignment: "center",
                    mediaAlignSelf: "center",
                    contentsAlignment: "center",
                    mediaAlignment: "center",
                    btnAlign: "center",
                });
                break;

            case "preset2":
                setAttributes({
                    flexDirection: "column-reverse",
                    contentAlignment: "center",
                    mediaAlignSelf: "center",
                    contentsAlignment: "center",
                    mediaAlignment: "center",
                    btnAlign: "center",
                });
                break;

            case "preset3":
                setAttributes({
                    flexDirection: "row",
                    contentAlignment: "left",
                    mediaAlignSelf: "flex-start",
                    contentsAlignment: "left",
                    mediaAlignment: "flex-start",
                    btnAlign: "flex-start",
                });
                break;

            case "preset4":
                setAttributes({
                    flexDirection: "row-reverse",
                    contentAlignment: "right",
                    mediaAlignSelf: "flex-start",
                    contentsAlignment: "right",
                    mediaAlignment: "flex-start",
                    btnAlign: "flex-end",
                });
                break;
        }
    }

    useEffect(() => {
        if (media == 'none') {
            setAttributes({
                showMedia: false,
                media: 'icon'
            });
        }
    }, [media]);

    const changeIconShape = (media, iconView, iconShape) => {
        if (media === "icon") {
            if (iconView !== 'default') {
                if (iconView == 'framed') {
                    setAttributes({
                        mediaBdShd_BorderType: "normal",
                        mediaBdShd_borderColor: "rgba(0,0,0,1)",
                        mediaBdShd_borderStyle: "solid",
                        mediaBdShd_Bdr_Bottom: "6",
                        mediaBdShd_Bdr_Left: "6",
                        mediaBdShd_Bdr_Right: "6",
                        mediaBdShd_Bdr_Top: "6",
                        mediaBdShd_Bdr_Unit: "px",
                        mediaBdShd_Bdr_isLinked: true,

                        numIconBgType: "fill",
                        numIconBgColor: "",
                        numIconColor: "var(--eb-global-primary-color)",
                    });
                } else if (iconView == 'stacked') {
                    setAttributes({
                        mediaBdShd_BorderType: "normal",
                        mediaBdShd_borderColor: "var(--eb-global-primary-color)",
                        mediaBdShd_borderStyle: "none",
                        mediaBdShd_Bdr_Bottom: "6",
                        mediaBdShd_Bdr_Left: "6",
                        mediaBdShd_Bdr_Right: "6",
                        mediaBdShd_Bdr_Top: "6",
                        mediaBdShd_Bdr_Unit: "px",
                        mediaBdShd_Bdr_isLinked: true,

                        numIconBgType: "fill",
                        numIconBgColor: "var(--eb-global-primary-color)",
                        numIconColor: "var(--eb-global-background-color)",
                    });
                }

                if (iconShape == 'circle') {
                    setAttributes({
                        mediaBgRadiusBottom: "50",
                        mediaBgRadiusLeft: "50",
                        mediaBgRadiusRight: "50",
                        mediaBgRadiusTop: "50",
                        mediaBgRadiusUnit: "%",
                        mediaBgRadiusisLinked: true,
                    });
                } else {
                    setAttributes({
                        mediaBgRadiusBottom: "0",
                        mediaBgRadiusLeft: "0",
                        mediaBgRadiusRight: "0",
                        mediaBgRadiusTop: "0",
                        mediaBgRadiusUnit: "px",
                        mediaBgRadiusisLinked: true,
                    });
                }

            } else {
                setAttributes({
                    mediaBgRadiusBottom: "20",
                    mediaBgRadiusLeft: "0",
                    mediaBgRadiusRight: "0",
                    mediaBgRadiusTop: "20",
                    mediaBgRadiusUnit: "px",
                    mediaBgRadiusisLinked: false,
                    numIconBgType: "fill",
                    numIconBgColor: "var(--eb-global-primary-color)",
                    numIconColor: "var(--eb-global-background-color)",
                });
            }
        }
    }

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
                            onChange={(layoutPreset) => changePreset(layoutPreset)}
                            __next40pxDefaultSize
                            __nextHasNoMarginBottom
                        />

                        <Divider />
                        <ToggleControl
                            label={__(
                                "Enable Title",
                                "essential-blocks"
                            )}
                            checked={enableTitle}
                            onChange={() =>
                                setAttributes({
                                    enableTitle: !enableTitle,
                                })
                            }
                            __nextHasNoMarginBottom
                        />
                        {enableTitle && (
                            <>
                                <DynamicInputControl
                                    label={__(
                                        "Title Text",
                                        "essential-blocks"
                                    )}
                                    attrName="title"
                                    inputValue={title || ''}
                                    setAttributes={setAttributes}
                                    onChange={(text) =>
                                        setAttributes({
                                            title: text,
                                        })
                                    }
                                />

                                <ToggleGroupControl
                                    label={__(
                                        "Title Tag",
                                        "essential-blocks"
                                    )}
                                    className="infobox-button-group newtogglegroupcontrol"
                                    value={titleTag}
                                    onChange={(value) =>
                                        setAttributes({
                                            titleTag: value,
                                        })
                                    }
                                    isBlock
                                    __next40pxDefaultSize
                                    __nextHasNoMarginBottom
                                >
                                    {HEADER_TAGS.map(
                                        (header, index) => (
                                            <ToggleGroupControlOption
                                                key={index}
                                                value={header}
                                                label={header.toUpperCase()}
                                            />
                                        )
                                    )}
                                </ToggleGroupControl>

                                <ToggleControl
                                    label={__(
                                        "Enable Subtitle",
                                        "essential-blocks"
                                    )}
                                    checked={enableSubTitle}
                                    onChange={() =>
                                        setAttributes({
                                            enableSubTitle: !enableSubTitle,
                                        })
                                    }
                                    __nextHasNoMarginBottom
                                />

                                {enableSubTitle && (
                                    <>
                                        <DynamicInputControl
                                            label={__(
                                                "Subtitle Text",
                                                "essential-blocks"
                                            )}
                                            attrName="subTitle"
                                            inputValue={subTitle || ''}
                                            setAttributes={setAttributes}
                                            onChange={(text) =>
                                                setAttributes({
                                                    subTitle: text,
                                                })
                                            }
                                        />
                                        <ToggleGroupControl
                                            label={__(
                                                "Subtitle Tag",
                                                "essential-blocks"
                                            )}
                                            className="infobox-button-group newtogglegroupcontrol"
                                            value={subTitleTag}
                                            onChange={(value) =>
                                                setAttributes({
                                                    subTitleTag: value,
                                                })
                                            }
                                            isBlock
                                            __next40pxDefaultSize
                                            __nextHasNoMarginBottom
                                        >
                                            {HEADER_TAGS.map(
                                                (header, index) => (
                                                    <ToggleGroupControlOption
                                                        key={index}
                                                        value={header}
                                                        label={header.toUpperCase()}
                                                    />
                                                )
                                            )}
                                        </ToggleGroupControl>
                                    </>

                                )}
                            </>
                        )}

                        <ToggleControl
                            label={__(
                                "Enable content",
                                "essential-blocks"
                            )}
                            checked={enableDescription}
                            onChange={() =>
                                setAttributes({
                                    enableDescription: !enableDescription,
                                })
                            }
                            __nextHasNoMarginBottom
                        />

                        {enableDescription && (
                            <DynamicInputControl
                                label={__(
                                    "Content",
                                    "essential-blocks"
                                )}
                                attrName="description"
                                inputValue={description || ''}
                                setAttributes={setAttributes}
                                onChange={(text) =>
                                    setAttributes({
                                        description: text,
                                    })
                                }
                                isTextarea={true}
                            />
                        )}
                        <ToggleControl
                            label={__(
                                "Enable Media",
                                "essential-blocks"
                            )}
                            checked={showMedia}
                            onChange={() =>
                                setAttributes({
                                    showMedia: !showMedia,
                                })
                            }
                            __nextHasNoMarginBottom
                        />

                        {showMedia && (
                            <>
                                <ToggleGroupControl
                                    label={__("Media Type", "essential-blocks")}

                                    value={media}
                                    onChange={(value) => {
                                        setAttributes({ media: value })
                                        changeIconShape(media, iconView, iconShape)
                                    }}
                                    isBlock
                                    __next40pxDefaultSize
                                    __nextHasNoMarginBottom
                                >
                                    {MEDIA_TYPES.map(
                                        (
                                            { label, value },
                                            index
                                        ) => (
                                            <ToggleGroupControlOption
                                                key={index}
                                                value={value}
                                                label={label}
                                            />
                                        )
                                    )}
                                </ToggleGroupControl>

                                {media === "icon" && (
                                    <>
                                        <EBIconPicker
                                            value={infoboxIcon}
                                            attributeName={'infoboxIcon'}
                                        />
                                        <SelectControl
                                            label={__("Icon View", "essential-blocks")}
                                            value={iconView}
                                            options={SHAPE_VIEW}
                                            onChange={(iconView) => {
                                                setAttributes({ iconView });
                                                changeIconShape(media, iconView, iconShape);
                                            }}
                                            __next40pxDefaultSize
                                            __nextHasNoMarginBottom
                                        />
                                        {iconView !== "default" && (
                                            <SelectControl
                                                label={__("Icon Shape", "essential-blocks")}
                                                value={iconShape}
                                                options={ICON_SHAPE}
                                                onChange={(newIconShape) => {
                                                    setAttributes({ iconShape: newIconShape });
                                                    changeIconShape(media, iconView, newIconShape);
                                                }}
                                                __next40pxDefaultSize
                                                __nextHasNoMarginBottom
                                            />
                                        )}
                                    </>

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
                                    </>
                                )}

                                {media === "image" && (
                                    //         <MediaUpload
                                    //             onSelect={({
                                    //                 id,
                                    //                 url,
                                    //                 alt,
                                    //             }) =>
                                    //                 setAttributes({
                                    //                     imageUrl: url,
                                    //                     imageId: id,
                                    //                     imageAlt: alt,
                                    //                 })
                                    //             }
                                    //             type="image"
                                    //             value={imageId}
                                    //             render={({
                                    //                 open,
                                    //             }) => {
                                    //                 return (
                                    //                     <Button
                                    //                         className="eb-background-control-inspector-panel-img-btn components-button"
                                    //                         label={__(
                                    //                             "Upload Image",
                                    //                             "essential-blocks"
                                    //                         )}
                                    //                         icon="format-image"
                                    //                         onClick={
                                    //                             open
                                    //                         }
                                    //                     />
                                    //                 );
                                    //             }}
                                    //         />
                                    //     )}

                                    // {media === "image" && imageUrl && (
                                    //     <ImageAvatar
                                    //         imageUrl={imageUrl}
                                    //         onDeleteImage={() =>
                                    //             setAttributes({
                                    //                 imageUrl: null,
                                    //             })
                                    //         }
                                    //     />

                                    <ImageComponent.GeneralTab
                                        hasStyle={false}
                                    />
                                )}
                            </>
                        )}

                        <Divider />
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
                            __nextHasNoMarginBottom
                        />

                        {isInfoClick && (
                            <>
                                <EBTextControl
                                    label={__(
                                        "Infobox Link",
                                        "essential-blocks"
                                    )}
                                    fieldType="url"
                                    value={infoboxLink || ''}
                                    onChange={(infoboxLink) =>
                                        setAttributes({
                                            infoboxLink,
                                        })
                                    }
                                    placeholder="https://your-link.com"
                                    help={__(
                                        "Enter the URL for the clickable infobox.",
                                        "essential-blocks"
                                    )}
                                    showValidation={true}
                                    enableSecurity={true}
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
                                    __nextHasNoMarginBottom
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
                                __nextHasNoMarginBottom
                            />
                        )}
                    </InspectorPanel.PanelBody>

                    {enableButton && !isInfoClick && (
                        <>
                            <EBButton.GeneralTab
                                label={__("Button", "essential-blocks")}
                                buttonAttrProps={BUTTON_KEYS}
                                hasIcon={true}
                                hasAlignment={true}
                                hasWidth={false}
                            />
                        </>
                    )}
                </>
            </InspectorPanel.General>
            <InspectorPanel.Style>
                <>
                    <InspectorPanel.PanelBody
                        title={__(
                            "Alignments",
                            "essential-blocks"
                        )}
                        initialOpen={true}
                    >
                        {showMedia && (
                            <>
                                {(flexDirection === "row" ||
                                    flexDirection ===
                                    "row-reverse") && (
                                        <ToggleGroupControl
                                            label={__("Media alignments", "essential-blocks")}

                                            value={mediaAlignment}
                                            onChange={(value) =>
                                                setAttributes({
                                                    mediaAlignment: value,
                                                })
                                            }
                                            isBlock
                                            __next40pxDefaultSize
                                            __nextHasNoMarginBottom
                                        >
                                            {MEDIA_ALIGNMENTS_ON_FLEX_ROW.map(
                                                (
                                                    {
                                                        value,
                                                        label,
                                                    },
                                                    index
                                                ) => (
                                                    <ToggleGroupControlOption
                                                        key={index}
                                                        value={value}
                                                        label={label}
                                                    />
                                                )
                                            )}
                                        </ToggleGroupControl>
                                    )}

                                {(flexDirection === "column" ||
                                    flexDirection ===
                                    "column-reverse") && (
                                        <ToggleGroupControl
                                            label={__("Media alignments", "essential-blocks")}

                                            value={mediaAlignment}
                                            onChange={(value) =>
                                                setAttributes({
                                                    mediaAlignment: value,
                                                })
                                            }
                                            isBlock
                                            __next40pxDefaultSize
                                            __nextHasNoMarginBottom
                                        >
                                            {MEDIA_ALIGNMENTS_ON_FLEX_COLUMN.map(
                                                (
                                                    {
                                                        value,
                                                        label,
                                                    },
                                                    index
                                                ) => (
                                                    <ToggleGroupControlOption
                                                        key={index}
                                                        value={value}
                                                        label={label}
                                                    />
                                                )
                                            )}
                                        </ToggleGroupControl>
                                    )}
                            </>
                        )}

                        <ToggleGroupControl
                            label={__("Contents alignments", "essential-blocks")}

                            value={contentsAlignment}
                            onChange={(value) =>
                                setAttributes({
                                    contentsAlignment: value,
                                })
                            }
                            isBlock
                            __next40pxDefaultSize
                            __nextHasNoMarginBottom
                        >
                            {CONTENTS_ALIGNMENTS.map(
                                (
                                    { value, label },
                                    index
                                ) => (
                                    <ToggleGroupControlOption
                                        key={index}
                                        value={value}
                                        label={label}
                                    />
                                )
                            )}
                        </ToggleGroupControl>

                        {/* {enableButton && !isInfoClick && (
                            <BaseControl
                                id="eb-infobox-alignments"
                                label={__("Button alignments", "essential-blocks")}
                                __nextHasNoMarginBottom
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
                        )} */}
                    </InspectorPanel.PanelBody>

                    {showMedia && (
                        <InspectorPanel.PanelBody
                            title={__("Media", "essential-blocks")}
                            initialOpen={true}
                        >
                            <>
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
                                    <TypographyDropdown
                                        baseLabel={__("Text Typography", "essential-blocks")}
                                        typographyPrefixConstant={
                                            typoPrefix_number
                                        }
                                    />
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
                                                __nextHasNoMarginBottom
                                            />

                                            {useNumIconBg && (
                                                <>
                                                    <ToggleGroupControl
                                                        label={__(
                                                            "Background Type",
                                                            "essential-blocks"
                                                        )}

                                                        value={numIconBgType}
                                                        onChange={(value) =>
                                                            setAttributes({
                                                                numIconBgType: value,
                                                            })
                                                        }
                                                        isBlock
                                                        __next40pxDefaultSize
                                                        __nextHasNoMarginBottom
                                                    >
                                                        {ICON_IMAGE_BG_TYPES.map(
                                                            (
                                                                {
                                                                    value,
                                                                    label,
                                                                },
                                                                index
                                                            ) => (
                                                                <ToggleGroupControlOption
                                                                    key={index}
                                                                    value={value}
                                                                    label={label}
                                                                />
                                                            )
                                                        )}
                                                    </ToggleGroupControl>

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


                                {/* {media === "image" && imageUrl && (
                                    <>
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
                                            __nextHasNoMarginBottom
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
                                )} */}

                                {/* <Divider /> */}

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
                                <ResponsiveDimensionsControl
                                    controlName={mediaBgMargin}
                                    baseLabel={__("Margin", "essential-blocks")}
                                />

                                <InspectorPanel.PanelBody
                                    title={__("Border & Shadow", "essential-blocks")}
                                    initialOpen={true}
                                >
                                    <BorderShadowControl
                                        controlName={mediaBdShd}
                                        noBorderRadius
                                        noBorderRadiusHover
                                    />
                                    <ResponsiveDimensionsControl
                                        forBorderRadius
                                        controlName={mediaBgRadius}
                                        baseLabel={__("Border Radius", "essential-blocks")}
                                    />
                                </InspectorPanel.PanelBody>
                            </>
                        </InspectorPanel.PanelBody>
                    )}

                    {enableTitle && (
                        <>
                            <InspectorPanel.PanelBody
                                title={__("Title", "essential-blocks")}
                                initialOpen={false}
                            >
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

                            {enableSubTitle && (
                                <InspectorPanel.PanelBody
                                    title={__(
                                        "Subtitle",
                                        "essential-blocks"
                                    )}
                                    initialOpen={false}
                                >
                                    <>
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
                                </InspectorPanel.PanelBody>
                            )}
                        </>
                    )}

                    {enableDescription && (
                        <InspectorPanel.PanelBody
                            title={__(
                                "Content",
                                "essential-blocks"
                            )}
                            initialOpen={false}
                        >
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
                        </InspectorPanel.PanelBody>
                    )}

                    {enableButton && !isInfoClick && (
                        <>
                            <EBButton.StyleTab
                                label={__("Button", "essential-blocks")}
                                buttonAttrProps={BUTTON_KEYS}
                                hasTypography={true}
                                typography={typoPrefix_buttonText}
                                hasPadding={true}
                                padding={buttonPadding}
                                background={infoBtnBg}
                                border={btnBdShd}
                                hasHoverEffect={true}
                            />
                        </>

                    )}
                    <ImageComponent.StyleTab
                        border={mediaBdShd}
                        margin={mediaBgMargin}
                        width={mediaImageWidth}
                        height={mediaImageHeight}
                        hasRadius={false}
                        hasAutoHeight={true}
                    />
                </>
            </InspectorPanel.Style>
        </InspectorPanel>
    );
}
export default Inspector;
