/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useEffect } from "@wordpress/element";
import { MediaUpload } from "@wordpress/block-editor";
import {
    SelectControl,
    ToggleControl,
    Button,
    RangeControl,
    BaseControl,
    ButtonGroup,
    TextControl,
} from "@wordpress/components";
import { applyFilters } from "@wordpress/hooks";

/**
 * Internal dependencies
 */

import {
    LeftAlignIcon,
    RightAlignIcon,
    CenterAlignIcon,
    TypographyDropdown,
    ResponsiveDimensionsControl,
    ResponsiveRangeController,
    ImageAvatar,
    ColorControl,
    GradientColorControl,
    BorderShadowControl,
    BackgroundControl,
    DynamicInputControl,
    SortControl,
    EBIconPicker,
    InspectorPanel
} from "@essential-blocks/controls";

import objAttributes from "./attributes";

import { typoPrefix_descs, typoPrefix_name, typoPrefix_job } from "./constants/typographyPrefixConstants";

import {
    wrapperWidth,
    imageWidth,
    imageHeight,
    rangeIconSize,
    rangeIconPadding,
    rangeIconDistance,
    rangeIconRowGap,
    imgTopBgHeight,
    cSepWPrefix,
    sSepWPrefix,
    cSepHPrefix,
    sSepHPrefix,
    sclDeviderPosRight,
    p9LGap,
} from "./constants/rangeNames";

import {
    tmbWrapMarginConst,
    tmbWrapPaddingConst,
    tmbDescsPaddingConst,
    tmbNamePaddingConst,
    tmbJobPaddingConst,
    iconsWrapPadding,
    iconsWrapMargin,
    imageMarginConst,
    imagePaddingConst,
    contentsPad,
    contentsMargin,
} from "./constants/dimensionsConstants";

import { WrpBgConst, imgTopBgPrefix, socialWrpBg } from "./constants/backgroundsConstants";

import { WrpBdShadowConst, prefixSocialBdShadow, prefixImgBd, ovlBdPrefix } from "./constants/borderShadowConstants";

import {
    sizeUnitTypes,
    IconsHzAligns,
    separatorTypes,
    ContentsVerticalAligns,
    HOVER_EFFECT,
    HOVER_ALIGN
} from "./constants";

function Inspector({ attributes, setAttributes }) {
    const {
        resOption,
        blockId,
        // blockRoot,
        // blockMeta,

        //
        imageUrl,
        imageNewUrl,

        //
        imageId,
        imageAlt,
        isImgHeightAuto,
        showDescs,
        descsColor,
        jobColor,
        nameColor,
        name,
        jobTitle,
        description,
        showSocials,
        socialDetails,
        iconsJustify,
        iconsVAlign,
        contentsAlign,
        imageAlign,
        cSepAlign,
        sSepAlign,
        preset,
        imgBeforeEl,
        showCSeparator,
        showSSeparator,
        cSepType,
        sSepType,
        cSepColor,
        sSepColor,
        isIconsDevider,
        icnsDevideColor,
        icnSepW,
        icnSepH,
        hvIcnColor,
        hvIcnBgc,
        conVtAlign,
        isConBgGradient,
        conBgGradient,
        conBgColor,
        imgCnVtAlign,
        isP9reverse,
        icnEffect,
        avatarURL,
        newWindow,
        showLinkNewTab,
        hoverPreset,
        showDesignation,
        showSocialTitle,
        isContentOverlay,
        socialInImage
    } = attributes;

    const resRequiredProps = {
        setAttributes,
        resOption,
        attributes,
        objAttributes,
    };

    useEffect(() => {
        if (preset === 'preset3') {
            if (isContentOverlay) {
                setAttributes({
                    socialInImage: false,
                    nameColor: '#fff',
                    jobColor: '#fff',
                    descsColor: '#fff',
                })
            } else {
                setAttributes({
                    socialInImage: true,
                    nameColor: '#4b4b4b',
                    jobColor: '#4b4b4b',
                    descsColor: '#9f9f9f',
                })
            }

        }

    }, [isContentOverlay, preset]);

    const onSocialProfileAdd = () => {
        const socialDetails = [
            ...attributes.socialDetails,
            {
                title: "Facebook",
                icon: "fab fa-facebook-f",
                color: "#fff",
                bgColor: "#A0A8BD",
                link: "",
                linkOpenNewTab: false,
                isExpanded: false,
            },
        ];

        setAttributes({ socialDetails });
    };

    const getSocialDetailsComponents = () => {
        const onProfileChange = (key, value, position) => {
            const newSocialDetail = { ...attributes.socialDetails[position] };
            const newSocialDetails = [...attributes.socialDetails];
            newSocialDetails[position] = newSocialDetail;

            if (Array.isArray(key)) {
                key.map((item, index) => {
                    newSocialDetails[position][item] = value[index];
                });
            } else {
                newSocialDetails[position][key] = value;
            }

            setAttributes({ socialDetails: newSocialDetails });
        };

        return attributes.socialDetails.map((each, i) => (
            <div key={i}>
                <EBIconPicker
                    title={__("Social Media", "essential-blocks")}
                    value={each.icon || null}
                    onChange={(value) => onProfileChange('icon', value, i)}
                />
                <TextControl
                    label={__("Title", "essential-blocks")}
                    value={each.title}
                    onChange={(value) => onProfileChange('title', value, i)}
                />
                <ColorControl
                    label={__("Icon Color", "essential-blocks")}
                    color={each.color}
                    onChange={(value) => onProfileChange('color', value, i)}
                />
                <ColorControl
                    label={__("Icon Background", "essential-blocks")}
                    color={each.bgColor}
                    onChange={(value) => onProfileChange('bgColor', value, i)}
                />
                <TextControl
                    label={__("URL", "essential-blocks")}
                    value={each.link}
                    onChange={(value) => onProfileChange('link', value, i)}
                    help={__(
                        "Use https or http",
                        "essential-blocks"
                    )}
                />
                {showLinkNewTab && (
                    <ToggleControl
                        label={__("Open in New Tab", "essential-blocks")}
                        checked={each.linkOpenNewTab}
                        onChange={(value) => onProfileChange('linkOpenNewTab', value, i)}
                    />
                )}
            </div>
        ))
    }

    return (
        <InspectorPanel advancedControlProps={{
            marginPrefix: tmbWrapMarginConst,
            paddingPrefix: tmbWrapPaddingConst,
            backgroundPrefix: WrpBgConst,
            borderPrefix: WrpBdShadowConst,
            hasMargin: true
        }}>
            <InspectorPanel.General>
                <>
                    <InspectorPanel.PanelBody
                        title={__("Presets", "essential-blocks")}
                        initialOpen={true}
                    >
                        {preset === "preset5" && (
                            <>
                                <ToggleControl
                                    label={__("Reverse Layout", "essential-blocks")}
                                    checked={isP9reverse}
                                    onChange={() =>
                                        setAttributes({
                                            isP9reverse: !isP9reverse,
                                        })
                                    }
                                />

                                <ResponsiveRangeController
                                    baseLabel={__("Gap", "essential-blocks")}
                                    controlName={p9LGap}
                                    min={0}
                                    max={100}
                                    step={1}
                                />
                            </>
                        )}

                        {preset === "new-preset3" && (
                            <SelectControl
                                label={__("Hover Alignment", "essential-blocks")}
                                value={hoverPreset}
                                options={HOVER_ALIGN}
                                onChange={(hoverPreset) => setAttributes({ hoverPreset })}
                            />
                        )}

                        {preset === "preset3" && (
                            <ToggleControl
                                label={__(
                                    "Content Overlay",
                                    "essential-blocks"
                                )}
                                checked={isContentOverlay}
                                onChange={() =>
                                    setAttributes({
                                        isContentOverlay: !isContentOverlay,
                                    })
                                }
                            />
                        )}

                        <ToggleControl
                            label={__(
                                "Enable Designation",
                                "essential-blocks"
                            )}
                            checked={showDesignation}
                            onChange={() =>
                                setAttributes({
                                    showDesignation: !showDesignation,
                                })
                            }
                        />
                        <ToggleControl
                            label={__(
                                "Enable Description",
                                "essential-blocks"
                            )}
                            checked={showDescs}
                            onChange={() =>
                                setAttributes({
                                    showDescs: !showDescs,
                                })
                            }
                        />
                        <ToggleControl
                            label={__(
                                "Enable Social Profiles",
                                "essential-blocks"
                            )}
                            checked={showSocials}
                            onChange={() =>
                                setAttributes({
                                    showSocials: !showSocials,
                                })
                            }
                        />
                    </InspectorPanel.PanelBody>

                    <InspectorPanel.PanelBody
                        title={__("Content", "essential-blocks")}
                        initialOpen={false}
                    >
                        {!imageNewUrl && (
                            <MediaUpload
                                onSelect={({ id, url, alt }) =>
                                    setAttributes({
                                        imageNewUrl: url,
                                        imageId: id,
                                        imageAlt: alt,
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

                        {imageNewUrl && (
                            <>
                                <ImageAvatar
                                    imageUrl={imageNewUrl}
                                    onDeleteImage={() =>
                                        setAttributes({
                                            imageNewUrl: null,
                                        })
                                    }
                                />
                                <DynamicInputControl
                                    label={__(
                                        "URL",
                                        "essential-blocks"
                                    )}
                                    attrName="avatarURL"
                                    inputValue={avatarURL}
                                    setAttributes={
                                        setAttributes
                                    }
                                    onChange={(newURL) =>
                                        setAttributes({
                                            avatarURL: newURL,
                                        })
                                    }
                                />
                                <DynamicInputControl
                                    label={__(
                                        "Title",
                                        "essential-blocks"
                                    )}
                                    attrName="name"
                                    inputValue={name}
                                    setAttributes={
                                        setAttributes
                                    }
                                    onChange={(newName) =>
                                        setAttributes({
                                            name: newName,
                                        })
                                    }
                                />
                                <DynamicInputControl
                                    label={__(
                                        "Designation",
                                        "essential-blocks"
                                    )}
                                    attrName="jobTitle"
                                    inputValue={jobTitle}
                                    setAttributes={
                                        setAttributes
                                    }
                                    onChange={(newJobTitle) =>
                                        setAttributes({
                                            jobTitle: newJobTitle,
                                        })
                                    }
                                />
                                <DynamicInputControl
                                    label={__(
                                        "Description",
                                        "essential-blocks"
                                    )}
                                    attrName="description"
                                    inputValue={description}
                                    setAttributes={
                                        setAttributes
                                    }
                                    onChange={(newDescription) =>
                                        setAttributes({
                                            description: newDescription,
                                        })
                                    }
                                    isTextarea={true}
                                />
                                {avatarURL && (
                                    <ToggleControl
                                        label={__("Open in New Tab", "essential-blocks")}
                                        checked={newWindow}
                                        onChange={() =>
                                            setAttributes({
                                                newWindow: !newWindow,
                                            })
                                        }
                                    />
                                )}
                            </>
                        )}
                    </InspectorPanel.PanelBody>

                    <InspectorPanel.PanelBody
                        title={__(
                            "Social Profiles",
                            "essential-blocks"
                        )}
                    // initialOpen={false}
                    >
                        <>

                            {showSocials && (
                                <>
                                    <ToggleControl
                                        label={__("Show link in new tab", "essential-blocks")}
                                        checked={showLinkNewTab}
                                        onChange={() =>
                                            setAttributes({
                                                showLinkNewTab: !showLinkNewTab,
                                                socialDetails: [...socialDetails]
                                            })
                                        }
                                    />

                                    <SortControl
                                        items={attributes.socialDetails}
                                        labelKey={'title'}
                                        onSortEnd={socialDetails => setAttributes({ socialDetails })}
                                        onDeleteItem={index => {
                                            setAttributes({ socialDetails: attributes.socialDetails.filter((each, i) => i !== index) })
                                        }}
                                        hasSettings={true}
                                        settingsComponents={getSocialDetailsComponents()}
                                        hasAddButton={true}
                                        onAddItem={onSocialProfileAdd}
                                        addButtonText={__(
                                            "Add Social Profile",
                                            "essential-blocks"
                                        )}
                                    />
                                </>
                            )}
                        </>
                    </InspectorPanel.PanelBody>

                    <InspectorPanel.PanelBody
                        title={__(
                            "Separators",
                            "essential-blocks"
                        )}
                    // initialOpen={false}
                    >
                        <ToggleControl
                            label={__("Enable Content Separator", "essential-blocks")}
                            checked={showCSeparator}
                            onChange={() =>
                                setAttributes({
                                    showCSeparator: !showCSeparator,
                                })
                            }
                        />

                        {showSocials && "preset3" !== preset && (
                            <ToggleControl
                                label={__("Enable Social Separator", "essential-blocks")}
                                checked={showSSeparator}
                                onChange={() =>
                                    setAttributes({
                                        showSSeparator: !showSSeparator,
                                    })
                                }
                            />
                        )}
                    </InspectorPanel.PanelBody>
                </>
            </InspectorPanel.General>
            <InspectorPanel.Style>
                <>
                    <InspectorPanel.PanelBody
                        title={__(
                            "Container width",
                            "essential-blocks"
                        )}
                        initialOpen={true}
                    >
                        <ResponsiveRangeController
                            baseLabel={__("Max Width", "essential-blocks")}
                            controlName={wrapperWidth}
                            min={100}
                            max={2000}
                            step={1}
                        />
                    </InspectorPanel.PanelBody>

                    {/preset[2,3,4,8,9]|new-preset1|new-preset2|new-preset3/i.test(
                        preset || ""
                    ) && (
                            <InspectorPanel.PanelBody
                                title={__(
                                    "Overlay Contents",
                                    "essential-blocks"
                                )}
                            // initialOpen={false}
                            >
                                {/preset[3,4,]|new-preset1|new-preset2|new-preset3/i.test(
                                    preset || ""
                                ) && (
                                        <>
                                            <ResponsiveDimensionsControl
                                                controlName={
                                                    contentsMargin
                                                }
                                                baseLabel="margin"
                                            />

                                            <ResponsiveDimensionsControl
                                                controlName={
                                                    contentsPad
                                                }
                                                baseLabel="Padding"
                                            />

                                            {preset === "preset4" &&
                                                preset ===
                                                "new-preset1" && (
                                                    <>
                                                        <BaseControl
                                                            id="eb-team-content-vertical-alignments"
                                                            label="Vertical alignments"
                                                        >
                                                            <ButtonGroup id="eb-team-content-vertical-alignments">
                                                                {ContentsVerticalAligns.map(
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
                                                                                conVtAlign !==
                                                                                value
                                                                            }
                                                                            isPrimary={
                                                                                conVtAlign ===
                                                                                value
                                                                            }
                                                                            onClick={() =>
                                                                                setAttributes(
                                                                                    {
                                                                                        conVtAlign: value,
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

                                            <BorderShadowControl
                                                controlName={
                                                    ovlBdPrefix
                                                }
                                                // noShadow
                                                noBdrHover
                                            // noBorder
                                            // noShdowHover
                                            />
                                        </>
                                    )}
                                <BaseControl
                                    label={__(
                                        "Background",
                                        "essential-blocks"
                                    )}
                                ></BaseControl>
                                <ToggleControl
                                    label={__(
                                        "Use Background Gradient",
                                        "essential-blocks"
                                    )}
                                    checked={isConBgGradient}
                                    onChange={() =>
                                        setAttributes({
                                            isConBgGradient: !isConBgGradient,
                                        })
                                    }
                                />

                                {isConBgGradient ? (
                                    <GradientColorControl
                                        gradientColor={
                                            conBgGradient
                                        }
                                        onChange={(conBgGradient) =>
                                            setAttributes({
                                                conBgGradient,
                                            })
                                        }
                                    />
                                ) : (
                                    <ColorControl
                                        label={__(
                                            "Color",
                                            "essential-blocks"
                                        )}
                                        color={conBgColor}
                                        attributeName={'conBgColor'}
                                    />
                                )}

                                {applyFilters(
                                    "eb_team_member_preset8_shadow",
                                    "",
                                    attributes,
                                    setAttributes,
                                    resRequiredProps
                                )}

                                <style>
                                    {`${preset === "preset2"
                                        ? `

					div.${blockId}.eb-team-wrapper div.contents{
						top: 50%;
					}

				`
                                        : ""
                                        }


												${preset === "preset3"
                                            ? `
				div.${blockId}.eb-team-wrapper ul.socials {
					opacity: 1;
				}
														`
                                            : ""
                                        }


												${preset === "preset4"
                                            ? `
				div.${blockId}.eb-team-wrapper div.contents {
					opacity: 1;
				}
														`
                                            : ""
                                        }

												`}
                                </style>
                            </InspectorPanel.PanelBody>
                        )}
                    <InspectorPanel.PanelBody
                        title={__(
                            "Alignments",
                            "essential-blocks"
                        )}
                    >
                        {preset === "preset5" ? (
                            <BaseControl
                                id="eb-team-avatar-vertical-alignments"
                                label="Avatar/Content Vertical Alignment"
                            >
                                <SelectControl
                                    // label={__("Icons Horizontal Alignment", "essential-blocks")}
                                    value={imgCnVtAlign}
                                    options={ContentsVerticalAligns}
                                    onChange={(imgCnVtAlign) =>
                                        setAttributes({
                                            imgCnVtAlign,
                                        })
                                    }
                                />
                            </BaseControl>
                        ) : (
                            <BaseControl
                                id="eb-team-image-alignments"
                                label="Avatar Horizontal Alignments"
                            >
                                <ButtonGroup className="eb-btngrp-align">
                                    <Button
                                        icon={() => (
                                            <LeftAlignIcon
                                                color={
                                                    imageAlign ===
                                                    "left" &&
                                                    "#6c40f7"
                                                }
                                            />
                                        )}
                                        onClick={() =>
                                            setAttributes({
                                                imageAlign: "left",
                                            })
                                        }
                                    />
                                    <Button
                                        icon={() => (
                                            <CenterAlignIcon
                                                color={
                                                    imageAlign ===
                                                    "center" &&
                                                    "#6c40f7"
                                                }
                                            />
                                        )}
                                        onClick={() =>
                                            setAttributes({
                                                imageAlign: "center",
                                            })
                                        }
                                    />
                                    <Button
                                        icon={() => (
                                            <RightAlignIcon
                                                color={
                                                    imageAlign ===
                                                    "right" &&
                                                    "#6c40f7"
                                                }
                                            />
                                        )}
                                        onClick={() =>
                                            setAttributes({
                                                imageAlign: "right",
                                            })
                                        }
                                    />
                                </ButtonGroup>
                            </BaseControl>
                        )}

                        <BaseControl
                            id="eb-team-contents-alignments"
                            label="Contents Horizontal Alignments"
                        >
                            <ButtonGroup className="eb-btngrp-align">
                                <Button
                                    icon={() => (
                                        <LeftAlignIcon
                                            color={
                                                contentsAlign ===
                                                "left" &&
                                                "#6c40f7"
                                            }
                                        />
                                    )}
                                    onClick={() =>
                                        setAttributes({
                                            contentsAlign: "left",
                                        })
                                    }
                                />
                                <Button
                                    icon={() => (
                                        <CenterAlignIcon
                                            color={
                                                contentsAlign ===
                                                "center" &&
                                                "#6c40f7"
                                            }
                                        />
                                    )}
                                    onClick={() =>
                                        setAttributes({
                                            contentsAlign: "center",
                                        })
                                    }
                                />
                                <Button
                                    icon={() => (
                                        <RightAlignIcon
                                            color={
                                                contentsAlign ===
                                                "right" &&
                                                "#6c40f7"
                                            }
                                        />
                                    )}
                                    onClick={() =>
                                        setAttributes({
                                            contentsAlign: "right",
                                        })
                                    }
                                />
                            </ButtonGroup>
                        </BaseControl>

                        {showSocials && (
                            <>
                                <BaseControl
                                    id="eb-team-icons-alignments"
                                    label="Social Icons Horizontal Alignments"
                                >
                                    <SelectControl
                                        // label={__("Icons Horizontal Alignment", "essential-blocks")}
                                        value={iconsJustify}
                                        options={IconsHzAligns}
                                        onChange={(iconsJustify) =>
                                            setAttributes({
                                                iconsJustify,
                                            })
                                        }
                                    />
                                </BaseControl>

                                {preset === "preset3" && (
                                    <BaseControl
                                        id="eb-team-icons-alignments"
                                        label="Social Icons Vertical Alignments"
                                    >
                                        <SelectControl
                                            // label={__("Icons Horizontal Alignment", "essential-blocks")}
                                            value={iconsVAlign}
                                            options={ContentsVerticalAligns}
                                            onChange={(iconsVAlign) =>
                                                setAttributes({
                                                    iconsVAlign,
                                                })
                                            }
                                        />
                                    </BaseControl>
                                )}
                            </>
                        )}

                        {showCSeparator && (
                            <BaseControl
                                id="eb-team-contents-alignments"
                                label="Content Separator Alignment"
                            >
                                <ButtonGroup className="eb-btngrp-align">
                                    <Button
                                        icon={() => (
                                            <LeftAlignIcon
                                                color={
                                                    cSepAlign ===
                                                    "left" &&
                                                    "#6c40f7"
                                                }
                                            />
                                        )}
                                        onClick={() =>
                                            setAttributes({
                                                cSepAlign: "left",
                                            })
                                        }
                                    />
                                    <Button
                                        icon={() => (
                                            <CenterAlignIcon
                                                color={
                                                    cSepAlign ===
                                                    "center" &&
                                                    "#6c40f7"
                                                }
                                            />
                                        )}
                                        onClick={() =>
                                            setAttributes({
                                                cSepAlign: "center",
                                            })
                                        }
                                    />
                                    <Button
                                        icon={() => (
                                            <RightAlignIcon
                                                color={
                                                    cSepAlign ===
                                                    "right" &&
                                                    "#6c40f7"
                                                }
                                            />
                                        )}
                                        onClick={() =>
                                            setAttributes({
                                                cSepAlign: "right",
                                            })
                                        }
                                    />
                                </ButtonGroup>
                            </BaseControl>
                        )}

                        {showSocials && showSSeparator && (
                            <BaseControl
                                id="eb-team-contents-alignments"
                                label="Social Separator Alignment"
                            >
                                <ButtonGroup className="eb-btngrp-align">
                                    <Button
                                        icon={() => (
                                            <LeftAlignIcon
                                                color={
                                                    sSepAlign ===
                                                    "left" &&
                                                    "#6c40f7"
                                                }
                                            />
                                        )}
                                        onClick={() =>
                                            setAttributes({
                                                sSepAlign: "left",
                                            })
                                        }
                                    />
                                    <Button
                                        icon={() => (
                                            <CenterAlignIcon
                                                color={
                                                    sSepAlign ===
                                                    "center" &&
                                                    "#6c40f7"
                                                }
                                            />
                                        )}
                                        onClick={() =>
                                            setAttributes({
                                                sSepAlign: "center",
                                            })
                                        }
                                    />
                                    <Button
                                        icon={() => (
                                            <RightAlignIcon
                                                color={
                                                    sSepAlign ===
                                                    "right" &&
                                                    "#6c40f7"
                                                }
                                            />
                                        )}
                                        onClick={() =>
                                            setAttributes({
                                                sSepAlign: "right",
                                            })
                                        }
                                    />
                                </ButtonGroup>
                            </BaseControl>
                        )}
                    </InspectorPanel.PanelBody>
                    <InspectorPanel.PanelBody title={__("Avatar", "essential-blocks")} initialOpen={false}>
                        {!imageNewUrl && (
                            <MediaUpload
                                onSelect={({ id, url }) =>
                                    setAttributes({
                                        imageNewUrl: url,
                                        imageId: id,
                                        imageAlt: alt,
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
                        {imageNewUrl && (
                            <>
                                <ResponsiveRangeController
                                    baseLabel={__("Image Width", "essential-blocks")}
                                    controlName={imageWidth}
                                    units={sizeUnitTypes}
                                    max={2000}
                                />
                                <ToggleControl
                                    label={__("Auto Image Height", "essential-blocks")}
                                    checked={isImgHeightAuto}
                                    onChange={() =>
                                        setAttributes({
                                            isImgHeightAuto: !isImgHeightAuto,
                                        })
                                    }
                                />

                                {!isImgHeightAuto && (
                                    <ResponsiveRangeController
                                        baseLabel={__("Image Height", "essential-blocks")}
                                        controlName={imageHeight}
                                        units={sizeUnitTypes}
                                        max={2000}
                                    />
                                )}

                                <ResponsiveDimensionsControl
                                    controlName={imageMarginConst}
                                    baseLabel="Margin"
                                />

                                <ResponsiveDimensionsControl
                                    controlName={imagePaddingConst}
                                    baseLabel="Padding"
                                />

                                <BorderShadowControl
                                    controlName={prefixImgBd}
                                // noShadow
                                // noBorder
                                />

                                <ToggleControl
                                    label={__("Enable Background before Image", "essential-blocks")}
                                    checked={imgBeforeEl}
                                    onChange={() =>
                                        setAttributes({
                                            imgBeforeEl: !imgBeforeEl,
                                        })
                                    }
                                />

                                {imgBeforeEl && (
                                    <>
                                        <BackgroundControl
                                            noOverlay
                                            noMainBgi
                                            controlName={imgTopBgPrefix}
                                        />

                                        <ResponsiveRangeController
                                            noUnits
                                            baseLabel={__("Height", "essential-blocks")}
                                            controlName={imgTopBgHeight}
                                            min={0}
                                            max={300}
                                            step={1}
                                        />
                                    </>
                                )}
                            </>
                        )}
                    </InspectorPanel.PanelBody>

                    <InspectorPanel.PanelBody
                        title={__("Name", "essential-blocks")}
                        initialOpen={false}
                    >
                        <ColorControl
                            label={__("Color", "essential-blocks")}
                            color={nameColor}
                            attributeName={'nameColor'}
                        />
                        <TypographyDropdown
                            baseLabel="Typography"
                            typographyPrefixConstant={typoPrefix_name}
                        />

                        <ResponsiveDimensionsControl
                            controlName={tmbNamePaddingConst}
                            baseLabel="Padding"
                        />
                    </InspectorPanel.PanelBody>
                    <InspectorPanel.PanelBody title={__("Job Title", "essential-blocks")} initialOpen={false}>
                        <ColorControl
                            label={__("Color", "essential-blocks")}
                            color={jobColor}
                            attributeName={'jobColor'}
                        />
                        <TypographyDropdown
                            baseLabel="Typography"
                            typographyPrefixConstant={typoPrefix_job}
                        />

                        <ResponsiveDimensionsControl
                            controlName={tmbJobPaddingConst}
                            baseLabel="Padding"
                        />
                    </InspectorPanel.PanelBody>
                    <InspectorPanel.PanelBody
                        title={__(
                            "Description",
                            "essential-blocks"
                        )}
                        initialOpen={false}
                    >


                        {showDescs && (
                            <>
                                <ColorControl
                                    label={__("Color", "essential-blocks")}
                                    color={descsColor}
                                    attributeName={'descsColor'}
                                />

                                <TypographyDropdown
                                    baseLabel="Typography"
                                    typographyPrefixConstant={typoPrefix_descs}
                                />

                                <ResponsiveDimensionsControl
                                    controlName={tmbDescsPaddingConst}
                                    baseLabel="Padding"
                                />
                            </>
                        )}
                    </InspectorPanel.PanelBody>
                    {showSocials && (
                        <InspectorPanel.PanelBody title={__("Social Icons", "essential-blocks")} initialOpen={false}>
                            <ColorControl
                                label={__("Hover Color", "essential-blocks")}
                                color={hvIcnColor}
                                attributeName={'hvIcnColor'}
                            />

                            <ColorControl
                                label={__("Hover Background", "essential-blocks")}
                                color={hvIcnBgc}
                                attributeName={'hvIcnBgc'}
                            />

                            <ResponsiveRangeController
                                noUnits
                                baseLabel={__("Size", "essential-blocks")}
                                controlName={rangeIconSize}
                                min={5}
                                max={300}
                                step={1}
                            />

                            <ResponsiveRangeController
                                noUnits
                                baseLabel={__("Padding", "essential-blocks")}
                                controlName={rangeIconPadding}
                                min={0}
                                max={6}
                                step={0.1}
                            />

                            <ResponsiveRangeController
                                noUnits
                                baseLabel={__("Spacing", "essential-blocks")}
                                controlName={rangeIconDistance}
                                min={0}
                                max={100}
                                step={1}
                            />

                            <ResponsiveRangeController
                                noUnits
                                baseLabel={__("Rows Gap", "essential-blocks")}
                                controlName={rangeIconRowGap}
                                min={0}
                                max={100}
                                step={1}
                            />

                            <label
                                style={{
                                    display: "block",
                                    margin: "-20px 0 20px",
                                }}
                            >
                                <i>
                                    N.B. 'Rows Gap' is used when you have multiple rows of social
                                    profiles. Normally in case of only one row, it's not needed
                                </i>
                            </label>

                            <ToggleControl
                                label={__("Icons Devider", "essential-blocks")}
                                checked={isIconsDevider}
                                onChange={() =>
                                    setAttributes({
                                        isIconsDevider: !isIconsDevider,
                                    })
                                }
                            />

                            {isIconsDevider && (
                                <>
                                    <ColorControl
                                        label={__("Color", "essential-blocks")}
                                        color={icnsDevideColor}
                                        attributeName={'icnsDevideColor'}
                                    />

                                    <RangeControl
                                        label={__("Width", "essential-blocks")}
                                        value={icnSepW}
                                        onChange={(icnSepW) =>
                                            setAttributes({
                                                icnSepW,
                                            })
                                        }
                                        step={1}
                                        min={1}
                                        max={50}
                                    />

                                    <RangeControl
                                        label={__("Height", "essential-blocks")}
                                        value={icnSepH}
                                        onChange={(icnSepH) =>
                                            setAttributes({
                                                icnSepH,
                                            })
                                        }
                                        step={1}
                                        min={1}
                                        max={300}
                                    />

                                    <ResponsiveRangeController
                                        baseLabel={__("Position From Right", "essential-blocks")}
                                        controlName={sclDeviderPosRight}
                                        min={0}
                                        max={80}
                                        step={1}
                                    />
                                </>
                            )}

                            <SelectControl
                                label={__("Icon Hover Effect", "essential-blocks")}
                                value={icnEffect}
                                options={HOVER_EFFECT}
                                // onChange={(preset) => setAttributes({ preset })}
                                onChange={(icnEffect) => {
                                    setAttributes({
                                        icnEffect,
                                    });
                                }}
                            />

                            <InspectorPanel.PanelBody
                                title={__("Icons Border", "essential-blocks")}
                                initialOpen={false}
                            >
                                <BorderShadowControl
                                    controlName={prefixSocialBdShadow}
                                    noShadow
                                // noBorder
                                />
                            </InspectorPanel.PanelBody>

                            <InspectorPanel.PanelBody
                                title={__("Container Background ", "essential-blocks")}
                                initialOpen={false}
                            >
                                <BackgroundControl
                                    controlName={socialWrpBg}
                                    noMainBgi
                                    noOverlay
                                />
                            </InspectorPanel.PanelBody>
                            <InspectorPanel.PanelBody
                                title={__("Container Margin Padding ", "essential-blocks")}
                                initialOpen={false}
                            >
                                <ResponsiveDimensionsControl
                                    controlName={iconsWrapMargin}
                                    baseLabel="Margin"
                                />

                                <ResponsiveDimensionsControl
                                    controlName={iconsWrapPadding}
                                    baseLabel="Padding"
                                />
                            </InspectorPanel.PanelBody>
                        </InspectorPanel.PanelBody>
                    )}
                    {showCSeparator && (
                        <InspectorPanel.PanelBody
                            title={__("Content Separator", "essential-blocks")}
                            initialOpen={false}
                        >
                            <ColorControl
                                label={__("Color", "essential-blocks")}
                                color={cSepColor}
                                attributeName={'cSepColor'}
                            />

                            <ResponsiveRangeController
                                baseLabel={__("Width", "essential-blocks")}
                                controlName={cSepWPrefix}
                                min={0}
                                max={800}
                                step={1}
                            />

                            <ResponsiveRangeController
                                baseLabel={__("Height", "essential-blocks")}
                                controlName={cSepHPrefix}
                                min={0}
                                max={20}
                                step={1}
                            />

                            <BaseControl label={__("Separator Type", "essential-blocks")}>
                                <SelectControl
                                    // label={__("Design Preset", "essential-blocks")}
                                    value={cSepType}
                                    options={separatorTypes}
                                    // onChange={(preset) => setAttributes({ preset })}
                                    onChange={(cSepType) => {
                                        setAttributes({
                                            cSepType,
                                        });
                                    }}
                                />
                            </BaseControl>
                        </InspectorPanel.PanelBody>
                    )}
                    {showSocials && showSSeparator && (
                        <InspectorPanel.PanelBody
                            title={__("Social Separator", "essential-blocks")}
                            initialOpen={false}
                        >
                            <ColorControl
                                label={__("Color", "essential-blocks")}
                                color={sSepColor}
                                attributeName={'sSepColor'}
                            />

                            <ResponsiveRangeController
                                baseLabel={__("Width", "essential-blocks")}
                                controlName={sSepWPrefix}
                                min={0}
                                max={800}
                                step={1}
                            />

                            <ResponsiveRangeController
                                baseLabel={__("Height", "essential-blocks")}
                                controlName={sSepHPrefix}
                                min={0}
                                max={20}
                                step={1}
                            />

                            <BaseControl label={__("Separator Type", "essential-blocks")}>
                                <SelectControl
                                    // label={__("Design Preset", "essential-blocks")}
                                    value={sSepType}
                                    options={separatorTypes}
                                    // onChange={(preset) => setAttributes({ preset })}
                                    onChange={(sSepType) => {
                                        setAttributes({
                                            sSepType,
                                        });
                                    }}
                                />
                            </BaseControl>
                        </InspectorPanel.PanelBody>
                    )}
                </>
            </InspectorPanel.Style>

        </InspectorPanel>
    );
}
export default Inspector;
