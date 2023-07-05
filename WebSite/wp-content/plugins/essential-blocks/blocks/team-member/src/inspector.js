/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useEffect } from "@wordpress/element";
import { InspectorControls, MediaUpload } from "@wordpress/block-editor";
import {
    PanelBody,
    SelectControl,
    ToggleControl,
    Button,
    RangeControl,
    BaseControl,
    ButtonGroup,
    TabPanel,
    TextControl,
} from "@wordpress/components";
import { select } from "@wordpress/data";
import { applyFilters } from "@wordpress/hooks";

/**
 * Internal dependencies
 */

const {
    // TypographyIcon,
    // UserIcon,
    LeftAlignIcon,
    RightAlignIcon,
    CenterAlignIcon,
    TypographyDropdown,
    ResponsiveDimensionsControl,
    ResponsiveRangeController,
    ImageAvatar,
    ColorControl,
    // ResetControl,
    GradientColorControl,
    BorderShadowControl,
    BackgroundControl,
    DealSocialProfiles,
    faIcons: IconList,
    AdvancedControls,
} = window.EBControls;

import objAttributes from "./attributes";

import {
    typoPrefix_descs,
    typoPrefix_name,
    typoPrefix_job,
} from "./constants/typographyPrefixConstants";

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

import {
    WrpBgConst,
    imgTopBgPrefix,
    socialWrpBg,
} from "./constants/backgroundsConstants";

import {
    WrpBdShadowConst,
    prefixSocialBdShadow,
    prefixImgBd,
    ovlBdPrefix,
} from "./constants/borderShadowConstants";

import {
    sizeUnitTypes,
    IconsHzAligns,
    // CONTENTS_ALIGNMENTS
    STYLE_PRESETS,
    separatorTypes,
    ContentsVerticalAligns,
    HOVER_EFFECT,
} from "./constants";

const defaultPresetAttrsObj = {
    // test: undefined,
    socialInImage: false,
    WrpBg_backgroundColor: undefined,
    cSepColor: undefined,
    dscP_Left: undefined,
    dscP_Right: undefined,
    hov_imgBgP_gradientColor: undefined,
    icnSepH: 30,
    icnSp_Range: 20,
    icnWp_Bottom: undefined,
    icnWp_Left: undefined,
    icnWp_Right: undefined,
    icnWp_Top: undefined,
    icnWp_isLinked: true,
    imgBd_Bdr_Bottom: "1",
    imgBd_Bdr_Left: "1",
    imgBd_Bdr_Right: "1",
    imgBd_Bdr_Top: "1",
    imgBd_Rds_Bottom: undefined,
    imgBd_Rds_Left: undefined,
    imgBd_Rds_Right: undefined,
    imgBd_Rds_Top: undefined,
    imgBd_Rds_Unit: "px",
    imgBd_borderColor: "undefined",
    imgBd_borderStyle: "none",
    imgBeforeEl: false,
    imgBgP_gradientColor: "linear-gradient(45deg,#7967ff,#c277f2)",
    imgMrg_Top: undefined,
    imgMrg_isLinked: true,
    isIconsDevider: false,
    jobP_Bottom: undefined,
    jobP_isLinked: true,
    sSepColor: undefined,
    showCSeparator: false,
    showSSeparator: false,
    wrpBdSd_blur: undefined,
    wrpBdSd_hOffset: undefined,
    wrpBdSd_shadowColor: undefined,
    wrpBdSd_spread: undefined,
    wrpBdSd_vOffset: undefined,
    wrpMrg_isLinked: true,
    wrpPad_isLinked: true,
    imgH_Range: 200,
    imgW_Range: 200,
    nameP_Bottom: "15",
    nameP_Top: "20",
    showDescs: true,
    wrpBdSd_Rds_Unit: "px",
    imgW_Unit: "px",
    wrpBdSd_Rds_Bottom: undefined,
    wrpBdSd_Rds_Left: undefined,
    wrpBdSd_Rds_Right: undefined,
    wrpBdSd_Rds_Top: undefined,
    wrpMrg_Bottom: undefined,
    wrpW_Range: 100,
    wrpW_Unit: "%",
    hov_sclWBg_backgroundColor: undefined,
    icnWp_Bottom: undefined,
    icnWp_Left: undefined,
    icnWp_Right: undefined,
    icnWp_Top: 10,
    icnWp_isLinked: false,
    sclWBg_backgroundColor: undefined,
    iconsVAlign: "center",
    isImgHeightAuto: false,
    conBgGradient: "linear-gradient(45deg, #7967ff, rgba(194,119,242,0.8))",
    wrpBdSd_borderStyle: "none",
};

function Inspector({ attributes, setAttributes }) {
    const {
        resOption,
        blockId,
        // blockRoot,
        // blockMeta,

        //
        imageUrl,

        //
        imageId,
        imageAlt,

        //
        isImgHeightAuto,

        //
        showDescs,

        //
        descsColor,
        jobColor,
        nameColor,

        // social profiles
        showSocials,
        socialDetails,

        //
        iconsJustify,
        iconsVAlign,

        //
        contentsAlign,
        imageAlign,
        cSepAlign,
        sSepAlign,

        //
        preset,
        imgBeforeEl,
        showCSeparator,
        showSSeparator,
        cSepType,
        sSepType,
        cSepColor,
        sSepColor,

        //
        isIconsDevider,
        icnsDevideColor,
        icnSepW,
        icnSepH,

        //
        hvIcnColor,
        hvIcnBgc,

        //
        conVtAlign,
        isConBgGradient,
        conBgGradient,
        conBgColor,

        //
        imgCnVtAlign,
        isP9reverse,

        //
        icnEffect,

        avatarURL,
        newWindow,
        showLinkNewTab,
    } = attributes;

    //
    useEffect(() => {
        const newSclDtails = socialDetails.map((item) => ({
            ...item,
            isExpanded: false,
        }));
        setAttributes({ socialDetails: newSclDtails });
    }, []);

    const resRequiredProps = {
        setAttributes,
        resOption,
        attributes,
        objAttributes,
    };

    const handlePresetChange = (preset) => {
        applyFilters(
            "eb_team_member_preset_change",
            preset,
            attributes,
            setAttributes,
            defaultPresetAttrsObj
        );

        switch (preset) {
            case "default":
                setAttributes({
                    ...defaultPresetAttrsObj,
                });
                break;

            case "preset4":
                setAttributes({
                    ...defaultPresetAttrsObj,

                    conBgGradient:
                        "linear-gradient(45deg, #7967ff 0% , rgba(194,119,242,0.8) 100%)",
                    imgW_Unit: "%",
                    isImgHeightAuto: true,
                    wrpW_Range: 400,
                    wrpW_Unit: "px",
                });
                break;

            case "preset3":
                setAttributes({
                    ...defaultPresetAttrsObj,
                    socialInImage: true,

                    hov_sclWBg_backgroundColor: "rgba(0,0,0,0.5)",
                    icnWp_Bottom: "50",
                    icnWp_Left: "50",
                    icnWp_Right: "50",
                    icnWp_Top: "50",
                    iconsVAlign: "flex-end",
                    imgW_Unit: "%",
                    wrpW_Range: 400,
                    wrpW_Unit: "px",
                    isImgHeightAuto: true,
                    sclWBg_backgroundColor: "rgba(0,0,0,0.5)",
                    socialInImage: true,
                });
                break;

            case "preset1":
                setAttributes({
                    ...defaultPresetAttrsObj,
                    WrpBg_backgroundColor: "rgba(255,255,255,1)",
                    cSepColor: "rgba(132,175,255,1)",
                    dscP_Left: "20",
                    dscP_Right: "20",
                    hov_imgBgP_gradientColor:
                        "linear-gradient(45deg, rgba(0,0,0,0.8) 0% , rgba(0,0,0,0.4) 100%)",
                    icnSepH: 38,
                    icnSp_Range: 50,
                    icnWp_Bottom: "20",
                    icnWp_Left: "40",
                    icnWp_Right: "40",
                    icnWp_Top: "20",
                    icnWp_isLinked: false,
                    imgBd_Bdr_Bottom: "5",
                    imgBd_Bdr_Left: "5",
                    imgBd_Bdr_Right: "5",
                    imgBd_Bdr_Top: "5",
                    imgBd_Rds_Bottom: "50",
                    imgBd_Rds_Left: "50",
                    imgBd_Rds_Right: "50",
                    imgBd_Rds_Top: "50",
                    imgBd_Rds_Unit: "%",
                    imgBd_borderColor: "rgba(255,255,255,1)",
                    imgBd_borderStyle: "solid",
                    imgBeforeEl: true,
                    imgBgP_gradientColor:
                        "linear-gradient(45deg, rgba(120,102,255,0.49) 0% , rgba(195,120,242,0.52) 100%)",
                    imgMrg_Top: "-100",
                    imgMrg_isLinked: false,
                    isIconsDevider: true,
                    jobP_Bottom: "15",
                    jobP_isLinked: false,
                    sSepColor: "rgba(202,202,202,1)",
                    showCSeparator: true,
                    showSSeparator: true,
                    wrpBdSd_blur: 20,
                    wrpBdSd_hOffset: 0,
                    wrpBdSd_shadowColor: "rgba(0,0,0,0.3)",
                    wrpBdSd_spread: 0,
                    wrpBdSd_vOffset: 5,
                    wrpMrg_isLinked: false,
                    wrpPad_isLinked: false,
                });
                break;

            case "preset2":
                setAttributes({
                    ...defaultPresetAttrsObj,

                    icnWp_Bottom: "45",
                    icnWp_isLinked: false,
                    imgBd_Rds_Bottom: "50",
                    imgBd_Rds_Left: "50",
                    imgBd_Rds_Right: "50",
                    imgBd_Rds_Top: "50",
                    imgBd_Rds_Unit: "%",
                    isImgHeightAuto: true,
                    imgW_Range: 100,
                    imgW_Unit: "%",
                    jobP_Bottom: "15",
                    jobP_isLinked: false,
                    nameP_Bottom: "10",
                    nameP_Top: "10",
                    showDescs: false,
                    wrpBdSd_Rds_Bottom: "50",
                    wrpBdSd_Rds_Left: "50",
                    wrpBdSd_Rds_Right: "50",
                    wrpBdSd_Rds_Top: "50",
                    wrpBdSd_Rds_Unit: "%",
                    wrpMrg_Bottom: "80",
                    wrpMrg_isLinked: false,
                    wrpW_Range: 400,
                    wrpW_Unit: "px",
                });
                break;

            case "preset5":
                setAttributes({
                    ...defaultPresetAttrsObj,
                });
                break;

            case "preset6":
                setAttributes({
                    ...defaultPresetAttrsObj,
                });
                break;
        }

        setAttributes({ preset });
    };

    return (
        <InspectorControls key="controls">
            <div className="eb-panel-control">
                <TabPanel
                    className="eb-parent-tab-panel"
                    activeClass="active-tab"
                    // onSelect={onSelect}
                    tabs={[
                        {
                            name: "general",
                            title: "General",
                            className: "eb-tab general",
                        },
                        {
                            name: "styles",
                            title: "Style",
                            className: "eb-tab styles",
                        },
                        {
                            name: "advance",
                            title: "Advanced",
                            className: "eb-tab advance",
                        },
                    ]}
                >
                    {(tab) => (
                        <div className={"eb-tab-controls" + tab.name}>
                            {tab.name === "general" && (
                                <>
                                    <PanelBody
                                        title={__(
                                            "Presets",
                                            "essential-blocks"
                                        )}
                                    // initialOpen={false}
                                    >
                                        <BaseControl
                                            label={__(
                                                "Design Preset",
                                                "essential-blocks"
                                            )}
                                        >
                                            <SelectControl
                                                // label={__("Design Preset", "essential-blocks")}
                                                value={preset}
                                                options={STYLE_PRESETS}
                                                // onChange={(preset) => setAttributes({ preset })}
                                                onChange={handlePresetChange}
                                            />
                                        </BaseControl>

                                        {preset === "preset5" && (
                                            <>
                                                <ToggleControl
                                                    label={__(
                                                        "Reverse Layout",
                                                        "essential-blocks"
                                                    )}
                                                    checked={isP9reverse}
                                                    onChange={() =>
                                                        setAttributes({
                                                            isP9reverse: !isP9reverse,
                                                        })
                                                    }
                                                />

                                                <ResponsiveRangeController
                                                    // noUnits
                                                    baseLabel={__(
                                                        "Gap",
                                                        "essential-blocks"
                                                    )}
                                                    controlName={p9LGap}
                                                    resRequiredProps={
                                                        resRequiredProps
                                                    }
                                                    min={0}
                                                    max={100}
                                                    step={1}
                                                />
                                            </>
                                        )}
                                    </PanelBody>

                                    <PanelBody
                                        title={__("Avatar", "essential-blocks")}
                                    // initialOpen={false}
                                    >
                                        {!imageUrl && (
                                            <MediaUpload
                                                onSelect={({ id, url, alt }) =>
                                                    setAttributes({
                                                        imageUrl: url,
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

                                        {imageUrl && (
                                            <>
                                                <ImageAvatar
                                                    imageUrl={imageUrl}
                                                    onDeleteImage={() =>
                                                        setAttributes({
                                                            imageUrl: null,
                                                        })
                                                    }
                                                />

                                                <TextControl
                                                    label={__(
                                                        "URL",
                                                        "essential-blocks"
                                                    )}
                                                    value={avatarURL}
                                                    onChange={(newURL) =>
                                                        setAttributes({
                                                            avatarURL: newURL,
                                                        })
                                                    }
                                                />
                                                {avatarURL && (
                                                    <ToggleControl
                                                        label={__(
                                                            "Open in New Tab",
                                                            "essential-blocks"
                                                        )}
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
                                    </PanelBody>

                                    <PanelBody
                                        title={__(
                                            "Social Profiles",
                                            "essential-blocks"
                                        )}
                                    // initialOpen={false}
                                    >
                                        <>
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
                                            {showSocials && (
                                                <>
                                                    <ToggleControl
                                                        label={__(
                                                            "Show link in new tab",
                                                            "essential-blocks"
                                                        )}
                                                        checked={showLinkNewTab}
                                                        onChange={() =>
                                                            setAttributes({
                                                                showLinkNewTab: !showLinkNewTab,
                                                            })
                                                        }
                                                    />
                                                    <DealSocialProfiles
                                                        profiles={socialDetails}
                                                        onProfileAdd={(
                                                            socialDetails
                                                        ) =>
                                                            setAttributes({
                                                                socialDetails,
                                                            })
                                                        }
                                                        iconList={IconList}
                                                    />
                                                </>
                                            )}
                                        </>
                                    </PanelBody>

                                    <PanelBody
                                        title={__(
                                            "Separators",
                                            "essential-blocks"
                                        )}
                                    // initialOpen={false}
                                    >
                                        <ToggleControl
                                            label={__(
                                                "Enable Content Separator",
                                                "essential-blocks"
                                            )}
                                            checked={showCSeparator}
                                            onChange={() =>
                                                setAttributes({
                                                    showCSeparator: !showCSeparator,
                                                })
                                            }
                                        />

                                        {showSocials && "preset3" !== preset && (
                                            <ToggleControl
                                                label={__(
                                                    "Enable Social Separator",
                                                    "essential-blocks"
                                                )}
                                                checked={showSSeparator}
                                                onChange={() =>
                                                    setAttributes({
                                                        showSSeparator: !showSSeparator,
                                                    })
                                                }
                                            />
                                        )}
                                    </PanelBody>
                                </>
                            )}
                            {tab.name === "styles" && (
                                <>
                                    <PanelBody
                                        title={__(
                                            "Container width",
                                            "essential-blocks"
                                        )}
                                    // initialOpen={false}
                                    >
                                        <ResponsiveRangeController
                                            // noUnits
                                            baseLabel={__(
                                                "Max Width",
                                                "essential-blocks"
                                            )}
                                            controlName={wrapperWidth}
                                            resRequiredProps={resRequiredProps}
                                            min={100}
                                            max={2000}
                                            step={1}
                                        />
                                    </PanelBody>

                                    {/preset[2,3,4]|pro-preset7/i.test(
                                        preset || ""
                                    ) && (
                                            <PanelBody
                                                title={__(
                                                    "Overlay Contents",
                                                    "essential-blocks"
                                                )}
                                            // initialOpen={false}
                                            >
                                                {/preset[3,4]|pro-preset7/i.test(
                                                    preset || ""
                                                ) && (
                                                        <>
                                                            <ResponsiveDimensionsControl
                                                                resRequiredProps={
                                                                    resRequiredProps
                                                                }
                                                                controlName={
                                                                    contentsMargin
                                                                }
                                                                baseLabel="margin"
                                                            />

                                                            <ResponsiveDimensionsControl
                                                                resRequiredProps={
                                                                    resRequiredProps
                                                                }
                                                                controlName={
                                                                    contentsPad
                                                                }
                                                                baseLabel="Padding"
                                                            />

                                                            {preset === "preset4" &&
                                                                preset ===
                                                                "pro-preset7" && (
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
                                                                resRequiredProps={
                                                                    resRequiredProps
                                                                }
                                                                noShadow
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
                                                        onChange={(conBgColor) =>
                                                            setAttributes({
                                                                conBgColor,
                                                            })
                                                        }
                                                    />
                                                )}

                                                {applyFilters(
                                                    "eb_team_member_preset8_shadow",
                                                    '',
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
                                            </PanelBody>
                                        )}
                                    <PanelBody
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
                                                    options={
                                                        ContentsVerticalAligns
                                                    }
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
                                                                imageAlign:
                                                                    "left",
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
                                                                imageAlign:
                                                                    "center",
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
                                                                imageAlign:
                                                                    "right",
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
                                                            contentsAlign:
                                                                "left",
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
                                                            contentsAlign:
                                                                "center",
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
                                                            contentsAlign:
                                                                "right",
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
                                                        onChange={(
                                                            iconsJustify
                                                        ) =>
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
                                                            options={
                                                                ContentsVerticalAligns
                                                            }
                                                            onChange={(
                                                                iconsVAlign
                                                            ) =>
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
                                                                cSepAlign:
                                                                    "left",
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
                                                                cSepAlign:
                                                                    "center",
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
                                                                cSepAlign:
                                                                    "right",
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
                                                                sSepAlign:
                                                                    "left",
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
                                                                sSepAlign:
                                                                    "center",
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
                                                                sSepAlign:
                                                                    "right",
                                                            })
                                                        }
                                                    />
                                                </ButtonGroup>
                                            </BaseControl>
                                        )}
                                    </PanelBody>
                                    <PanelBody
                                        title={__("Avatar", "essential-blocks")}
                                        initialOpen={false}
                                    >
                                        {!imageUrl && (
                                            <MediaUpload
                                                onSelect={({ id, url }) =>
                                                    setAttributes({
                                                        imageUrl: url,
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
                                        {imageUrl && (
                                            <>
                                                <ResponsiveRangeController
                                                    baseLabel={__(
                                                        "Image Width",
                                                        "essential-blocks"
                                                    )}
                                                    controlName={imageWidth}
                                                    resRequiredProps={
                                                        resRequiredProps
                                                    }
                                                    units={sizeUnitTypes}
                                                    max={2000}
                                                />
                                                <ToggleControl
                                                    label={__(
                                                        "Auto Image Height",
                                                        "essential-blocks"
                                                    )}
                                                    checked={isImgHeightAuto}
                                                    onChange={() =>
                                                        setAttributes({
                                                            isImgHeightAuto: !isImgHeightAuto,
                                                        })
                                                    }
                                                />

                                                {!isImgHeightAuto && (
                                                    <ResponsiveRangeController
                                                        baseLabel={__(
                                                            "Image Height",
                                                            "essential-blocks"
                                                        )}
                                                        controlName={
                                                            imageHeight
                                                        }
                                                        resRequiredProps={
                                                            resRequiredProps
                                                        }
                                                        units={sizeUnitTypes}
                                                        max={2000}
                                                    />
                                                )}

                                                <ResponsiveDimensionsControl
                                                    resRequiredProps={
                                                        resRequiredProps
                                                    }
                                                    controlName={
                                                        imageMarginConst
                                                    }
                                                    baseLabel="Margin"
                                                />

                                                <ResponsiveDimensionsControl
                                                    resRequiredProps={
                                                        resRequiredProps
                                                    }
                                                    controlName={
                                                        imagePaddingConst
                                                    }
                                                    baseLabel="Padding"
                                                />

                                                <BorderShadowControl
                                                    controlName={prefixImgBd}
                                                    resRequiredProps={
                                                        resRequiredProps
                                                    }
                                                // noShadow
                                                // noBorder
                                                />

                                                <ToggleControl
                                                    label={__(
                                                        "Enable Background before Image",
                                                        "essential-blocks"
                                                    )}
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
                                                            controlName={
                                                                imgTopBgPrefix
                                                            }
                                                            resRequiredProps={
                                                                resRequiredProps
                                                            }
                                                        />

                                                        <ResponsiveRangeController
                                                            noUnits
                                                            baseLabel={__(
                                                                "Height",
                                                                "essential-blocks"
                                                            )}
                                                            controlName={
                                                                imgTopBgHeight
                                                            }
                                                            resRequiredProps={
                                                                resRequiredProps
                                                            }
                                                            min={0}
                                                            max={300}
                                                            step={1}
                                                        />
                                                    </>
                                                )}
                                            </>
                                        )}
                                    </PanelBody>
                                    <PanelBody
                                        title={__("Name", "essential-blocks")}
                                        initialOpen={false}
                                    >
                                        <ColorControl
                                            label={__(
                                                "Color",
                                                "essential-blocks"
                                            )}
                                            color={nameColor}
                                            onChange={(nameColor) =>
                                                setAttributes({ nameColor })
                                            }
                                        />
                                        <TypographyDropdown
                                            baseLabel="Typography"
                                            typographyPrefixConstant={
                                                typoPrefix_name
                                            }
                                            resRequiredProps={resRequiredProps}
                                        />

                                        <ResponsiveDimensionsControl
                                            resRequiredProps={resRequiredProps}
                                            controlName={tmbNamePaddingConst}
                                            baseLabel="Padding"
                                        />
                                    </PanelBody>
                                    <PanelBody
                                        title={__(
                                            "Job Title",
                                            "essential-blocks"
                                        )}
                                        initialOpen={false}
                                    >
                                        <ColorControl
                                            label={__(
                                                "Color",
                                                "essential-blocks"
                                            )}
                                            color={jobColor}
                                            onChange={(jobColor) =>
                                                setAttributes({ jobColor })
                                            }
                                        />
                                        <TypographyDropdown
                                            baseLabel="Typography"
                                            typographyPrefixConstant={
                                                typoPrefix_job
                                            }
                                            resRequiredProps={resRequiredProps}
                                        />

                                        <ResponsiveDimensionsControl
                                            resRequiredProps={resRequiredProps}
                                            controlName={tmbJobPaddingConst}
                                            baseLabel="Padding"
                                        />
                                    </PanelBody>
                                    <PanelBody
                                        title={__(
                                            "Description",
                                            "essential-blocks"
                                        )}
                                        initialOpen={false}
                                    >
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

                                        {showDescs && (
                                            <>
                                                <ColorControl
                                                    label={__(
                                                        "Color",
                                                        "essential-blocks"
                                                    )}
                                                    color={descsColor}
                                                    onChange={(descsColor) =>
                                                        setAttributes({
                                                            descsColor,
                                                        })
                                                    }
                                                />

                                                <TypographyDropdown
                                                    baseLabel="Typography"
                                                    typographyPrefixConstant={
                                                        typoPrefix_descs
                                                    }
                                                    resRequiredProps={
                                                        resRequiredProps
                                                    }
                                                />

                                                <ResponsiveDimensionsControl
                                                    resRequiredProps={
                                                        resRequiredProps
                                                    }
                                                    controlName={
                                                        tmbDescsPaddingConst
                                                    }
                                                    baseLabel="Padding"
                                                />
                                            </>
                                        )}
                                    </PanelBody>
                                    {showSocials && (
                                        <PanelBody
                                            title={__(
                                                "Social Icons",
                                                "essential-blocks"
                                            )}
                                            initialOpen={false}
                                        >
                                            <ColorControl
                                                label={__(
                                                    "Hover Color",
                                                    "essential-blocks"
                                                )}
                                                color={hvIcnColor}
                                                onChange={(hvIcnColor) =>
                                                    setAttributes({
                                                        hvIcnColor,
                                                    })
                                                }
                                            />

                                            <ColorControl
                                                label={__(
                                                    "Hover Background",
                                                    "essential-blocks"
                                                )}
                                                color={hvIcnBgc}
                                                onChange={(hvIcnBgc) =>
                                                    setAttributes({ hvIcnBgc })
                                                }
                                            />

                                            <ResponsiveRangeController
                                                noUnits
                                                baseLabel={__(
                                                    "Size",
                                                    "essential-blocks"
                                                )}
                                                controlName={rangeIconSize}
                                                resRequiredProps={
                                                    resRequiredProps
                                                }
                                                min={5}
                                                max={300}
                                                step={1}
                                            />

                                            <ResponsiveRangeController
                                                noUnits
                                                baseLabel={__(
                                                    "Padding",
                                                    "essential-blocks"
                                                )}
                                                controlName={rangeIconPadding}
                                                resRequiredProps={
                                                    resRequiredProps
                                                }
                                                min={0}
                                                max={6}
                                                step={0.1}
                                            />

                                            <ResponsiveRangeController
                                                noUnits
                                                baseLabel={__(
                                                    "Spacing",
                                                    "essential-blocks"
                                                )}
                                                controlName={rangeIconDistance}
                                                resRequiredProps={
                                                    resRequiredProps
                                                }
                                                min={0}
                                                max={100}
                                                step={1}
                                            />

                                            <ResponsiveRangeController
                                                noUnits
                                                baseLabel={__(
                                                    "Rows Gap",
                                                    "essential-blocks"
                                                )}
                                                controlName={rangeIconRowGap}
                                                resRequiredProps={
                                                    resRequiredProps
                                                }
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
                                                    N.B. 'Rows Gap' is used when
                                                    you have multiple rows of
                                                    social profiles. Normally in
                                                    case of only one row, it's
                                                    not needed
                                                </i>
                                            </label>

                                            <ToggleControl
                                                label={__(
                                                    "Icons Devider",
                                                    "essential-blocks"
                                                )}
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
                                                        label={__(
                                                            "Color",
                                                            "essential-blocks"
                                                        )}
                                                        color={icnsDevideColor}
                                                        onChange={(
                                                            icnsDevideColor
                                                        ) =>
                                                            setAttributes({
                                                                icnsDevideColor,
                                                            })
                                                        }
                                                    />

                                                    <RangeControl
                                                        label={__(
                                                            "Width",
                                                            "essential-blocks"
                                                        )}
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
                                                        label={__(
                                                            "Height",
                                                            "essential-blocks"
                                                        )}
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
                                                        baseLabel={__(
                                                            "Position From Right",
                                                            "essential-blocks"
                                                        )}
                                                        controlName={
                                                            sclDeviderPosRight
                                                        }
                                                        resRequiredProps={
                                                            resRequiredProps
                                                        }
                                                        min={0}
                                                        max={80}
                                                        step={1}
                                                    />
                                                </>
                                            )}

                                            <SelectControl
                                                label={__(
                                                    "Icon Hover Effect",
                                                    "essential-blocks"
                                                )}
                                                value={icnEffect}
                                                options={HOVER_EFFECT}
                                                // onChange={(preset) => setAttributes({ preset })}
                                                onChange={(icnEffect) => {
                                                    setAttributes({
                                                        icnEffect,
                                                    });
                                                }}
                                            />

                                            <PanelBody
                                                title={__(
                                                    "Icons Border",
                                                    "essential-blocks"
                                                )}
                                                initialOpen={false}
                                            >
                                                <BorderShadowControl
                                                    controlName={
                                                        prefixSocialBdShadow
                                                    }
                                                    resRequiredProps={
                                                        resRequiredProps
                                                    }
                                                    noShadow
                                                // noBorder
                                                />
                                            </PanelBody>

                                            <PanelBody
                                                title={__(
                                                    "Container Background ",
                                                    "essential-blocks"
                                                )}
                                                initialOpen={false}
                                            >
                                                <BackgroundControl
                                                    controlName={socialWrpBg}
                                                    resRequiredProps={
                                                        resRequiredProps
                                                    }
                                                    noMainBgi
                                                    noOverlay
                                                />
                                            </PanelBody>
                                            <PanelBody
                                                title={__(
                                                    "Container Margin Padding ",
                                                    "essential-blocks"
                                                )}
                                                initialOpen={false}
                                            >
                                                <ResponsiveDimensionsControl
                                                    resRequiredProps={
                                                        resRequiredProps
                                                    }
                                                    controlName={
                                                        iconsWrapMargin
                                                    }
                                                    baseLabel="Margin"
                                                />

                                                <ResponsiveDimensionsControl
                                                    resRequiredProps={
                                                        resRequiredProps
                                                    }
                                                    controlName={
                                                        iconsWrapPadding
                                                    }
                                                    baseLabel="Padding"
                                                />
                                            </PanelBody>
                                        </PanelBody>
                                    )}
                                    {showCSeparator && (
                                        <PanelBody
                                            title={__(
                                                "Content Separator",
                                                "essential-blocks"
                                            )}
                                            initialOpen={false}
                                        >
                                            <ColorControl
                                                label={__(
                                                    "Color",
                                                    "essential-blocks"
                                                )}
                                                color={cSepColor}
                                                onChange={(cSepColor) =>
                                                    setAttributes({ cSepColor })
                                                }
                                            />

                                            <ResponsiveRangeController
                                                baseLabel={__(
                                                    "Width",
                                                    "essential-blocks"
                                                )}
                                                controlName={cSepWPrefix}
                                                resRequiredProps={
                                                    resRequiredProps
                                                }
                                                min={0}
                                                max={800}
                                                step={1}
                                            />

                                            <ResponsiveRangeController
                                                baseLabel={__(
                                                    "Height",
                                                    "essential-blocks"
                                                )}
                                                controlName={cSepHPrefix}
                                                resRequiredProps={
                                                    resRequiredProps
                                                }
                                                min={0}
                                                max={20}
                                                step={1}
                                            />

                                            <BaseControl
                                                label={__(
                                                    "Separator Type",
                                                    "essential-blocks"
                                                )}
                                            >
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
                                        </PanelBody>
                                    )}
                                    {showSocials && showSSeparator && (
                                        <PanelBody
                                            title={__(
                                                "Social Separator",
                                                "essential-blocks"
                                            )}
                                            initialOpen={false}
                                        >
                                            <ColorControl
                                                label={__(
                                                    "Color",
                                                    "essential-blocks"
                                                )}
                                                color={sSepColor}
                                                onChange={(sSepColor) =>
                                                    setAttributes({ sSepColor })
                                                }
                                            />

                                            <ResponsiveRangeController
                                                baseLabel={__(
                                                    "Width",
                                                    "essential-blocks"
                                                )}
                                                controlName={sSepWPrefix}
                                                resRequiredProps={
                                                    resRequiredProps
                                                }
                                                min={0}
                                                max={800}
                                                step={1}
                                            />

                                            <ResponsiveRangeController
                                                baseLabel={__(
                                                    "Height",
                                                    "essential-blocks"
                                                )}
                                                controlName={sSepHPrefix}
                                                resRequiredProps={
                                                    resRequiredProps
                                                }
                                                min={0}
                                                max={20}
                                                step={1}
                                            />

                                            <BaseControl
                                                label={__(
                                                    "Separator Type",
                                                    "essential-blocks"
                                                )}
                                            >
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
                                        </PanelBody>
                                    )}
                                </>
                            )}
                            {tab.name === "advance" && (
                                <>
                                    <PanelBody
                                        title={__("Margin & Padding")}
                                    // initialOpen={true}
                                    >
                                        <ResponsiveDimensionsControl
                                            resRequiredProps={resRequiredProps}
                                            controlName={tmbWrapMarginConst}
                                            baseLabel="Margin"
                                        />
                                        <ResponsiveDimensionsControl
                                            resRequiredProps={resRequiredProps}
                                            controlName={tmbWrapPaddingConst}
                                            baseLabel="Padding"
                                        />
                                    </PanelBody>

                                    <PanelBody
                                        title={__(
                                            "Background ",
                                            "essential-blocks"
                                        )}
                                        initialOpen={false}
                                    >
                                        <BackgroundControl
                                            controlName={WrpBgConst}
                                            resRequiredProps={resRequiredProps}
                                        />
                                    </PanelBody>

                                    <PanelBody
                                        title={__("Border & Shadow")}
                                        initialOpen={false}
                                    >
                                        <BorderShadowControl
                                            controlName={WrpBdShadowConst}
                                            resRequiredProps={resRequiredProps}
                                        // noShadow
                                        // noBorder
                                        />
                                    </PanelBody>

                                    <AdvancedControls
                                        attributes={attributes}
                                        setAttributes={setAttributes}
                                    />
                                </>
                            )}
                        </div>
                    )}
                </TabPanel>
            </div>
        </InspectorControls>
    );
}
export default Inspector;
