/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
    PanelBody,
    SelectControl,
    ToggleControl,
    Button,
    RangeControl,
    BaseControl,
    ButtonGroup,
    TabPanel,
} from "@wordpress/components";
/**
 * Internal dependencies
 */
import {
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
    BorderShadowControl,
    BackgroundControl,
    useBlockDefaults,
    withBlockContext
} from "@essential-blocks/controls";

import objAttributes from "@essential-blocks/blocks/team-member/src/attributes";

import {
    typoPrefix_descs,
    typoPrefix_name,
    typoPrefix_job,
} from "@essential-blocks/blocks/team-member/src/constants/typographyPrefixConstants";

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
} from "@essential-blocks/blocks/team-member/src/constants/rangeNames";

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
} from "@essential-blocks/blocks/team-member/src/constants/dimensionsConstants";

import {
    WrpBgConst,
    imgTopBgPrefix,
    socialWrpBg,
} from "@essential-blocks/blocks/team-member/src/constants/backgroundsConstants";

import {
    WrpBdShadowConst,
    prefixSocialBdShadow,
    prefixImgBd,
    ovlBdPrefix,
} from "@essential-blocks/blocks/team-member/src/constants/borderShadowConstants";

import {
    sizeUnitTypes,
    IconsHzAligns,
    // CONTENTS_ALIGNMENTS
    STYLE_PRESETS,
    separatorTypes,
    ContentsVerticalAligns,
    HOVER_EFFECT,
} from "@essential-blocks/blocks/team-member/src/constants";

function TeamMember(props) {
    const { blockDefaults, setBlockDefaults, name, deviceType, handleBlockDefault } = props;



    const {
        imageUrl,
        imageId,
        isImgHeightAuto,
        showDescs,
        descsColor,
        jobColor,
        nameColor,
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
    } = blockDefaults;
    const isDefaultSet = useBlockDefaults(name, blockDefaults, setBlockDefaults, objAttributes)

    return (
        <>
            {isDefaultSet && (
                <div className="eb-panel-control">
                    <PanelBody
                        title={__("Social Profiles", "essential-blocks")}
                        initialOpen={true}
                    >
                        <>
                            <ToggleControl
                                label={__(
                                    "Enable Social Profiles",
                                    "essential-blocks"
                                )}
                                checked={showSocials}
                                onChange={() =>
                                    handleBlockDefault({
                                        showSocials: !showSocials,
                                    })
                                }
                            />
                        </>
                    </PanelBody>
                    <PanelBody
                        title={__("Separators", "essential-blocks")}
                        initialOpen={false}
                    >
                        <ToggleControl
                            label={__(
                                "Enable Content Separator",
                                "essential-blocks"
                            )}
                            checked={showCSeparator}
                            onChange={() =>
                                handleBlockDefault({
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
                                    handleBlockDefault({
                                        showSSeparator: !showSSeparator,
                                    })
                                }
                            />
                        )}
                    </PanelBody>
                    <PanelBody
                        title={__("Container width", "essential-blocks")}
                        initialOpen={false}
                    >
                        <ResponsiveRangeController
                            baseLabel={__("Max Width", "essential-blocks")}
                            controlName={wrapperWidth}
                            min={100}
                            max={2000}
                            step={1}
                        />
                    </PanelBody>
                    <PanelBody
                        title={__("Alignments", "essential-blocks")}
                        initialOpen={false}
                    >
                        <BaseControl
                            id="eb-team-image-alignments"
                            label={__(
                                "Avatar Horizontal Alignments",
                                "essential-blocks"
                            )}
                        >
                            <ButtonGroup className="eb-btngrp-align">
                                <Button
                                    icon={() => (
                                        <LeftAlignIcon
                                            color={
                                                imageAlign === "left" &&
                                                "#6c40f7"
                                            }
                                        />
                                    )}
                                    onClick={() =>
                                        handleBlockDefault({
                                            imageAlign: "left",
                                        })
                                    }
                                />
                                <Button
                                    icon={() => (
                                        <CenterAlignIcon
                                            color={
                                                imageAlign === "center" &&
                                                "#6c40f7"
                                            }
                                        />
                                    )}
                                    onClick={() =>
                                        handleBlockDefault({
                                            imageAlign: "center",
                                        })
                                    }
                                />
                                <Button
                                    icon={() => (
                                        <RightAlignIcon
                                            color={
                                                imageAlign === "right" &&
                                                "#6c40f7"
                                            }
                                        />
                                    )}
                                    onClick={() =>
                                        handleBlockDefault({
                                            imageAlign: "right",
                                        })
                                    }
                                />
                            </ButtonGroup>
                        </BaseControl>

                        <BaseControl
                            id="eb-team-contents-alignments"
                            label="Contents Horizontal Alignments"
                        >
                            <ButtonGroup className="eb-btngrp-align">
                                <Button
                                    icon={() => (
                                        <LeftAlignIcon
                                            color={
                                                contentsAlign === "left" &&
                                                "#6c40f7"
                                            }
                                        />
                                    )}
                                    onClick={() =>
                                        handleBlockDefault({
                                            contentsAlign: "left",
                                        })
                                    }
                                />
                                <Button
                                    icon={() => (
                                        <CenterAlignIcon
                                            color={
                                                contentsAlign === "center" &&
                                                "#6c40f7"
                                            }
                                        />
                                    )}
                                    onClick={() =>
                                        handleBlockDefault({
                                            contentsAlign: "center",
                                        })
                                    }
                                />
                                <Button
                                    icon={() => (
                                        <RightAlignIcon
                                            color={
                                                contentsAlign === "right" &&
                                                "#6c40f7"
                                            }
                                        />
                                    )}
                                    onClick={() =>
                                        handleBlockDefault({
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
                                            handleBlockDefault({ iconsJustify })
                                        }
                                    />
                                </BaseControl>
                            </>
                        )}

                        {showCSeparator && (
                            <BaseControl
                                id="eb-team-contents-alignments"
                                label={__(
                                    "Content Separator Alignment",
                                    "essential-blocks"
                                )}
                            >
                                <ButtonGroup className="eb-btngrp-align">
                                    <Button
                                        icon={() => (
                                            <LeftAlignIcon
                                                color={
                                                    cSepAlign === "left" &&
                                                    "#6c40f7"
                                                }
                                            />
                                        )}
                                        onClick={() =>
                                            handleBlockDefault({
                                                cSepAlign: "left",
                                            })
                                        }
                                    />
                                    <Button
                                        icon={() => (
                                            <CenterAlignIcon
                                                color={
                                                    cSepAlign === "center" &&
                                                    "#6c40f7"
                                                }
                                            />
                                        )}
                                        onClick={() =>
                                            handleBlockDefault({
                                                cSepAlign: "center",
                                            })
                                        }
                                    />
                                    <Button
                                        icon={() => (
                                            <RightAlignIcon
                                                color={
                                                    cSepAlign === "right" &&
                                                    "#6c40f7"
                                                }
                                            />
                                        )}
                                        onClick={() =>
                                            handleBlockDefault({
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
                                                    sSepAlign === "left" &&
                                                    "#6c40f7"
                                                }
                                            />
                                        )}
                                        onClick={() =>
                                            handleBlockDefault({
                                                sSepAlign: "left",
                                            })
                                        }
                                    />
                                    <Button
                                        icon={() => (
                                            <CenterAlignIcon
                                                color={
                                                    sSepAlign === "center" &&
                                                    "#6c40f7"
                                                }
                                            />
                                        )}
                                        onClick={() =>
                                            handleBlockDefault({
                                                sSepAlign: "center",
                                            })
                                        }
                                    />
                                    <Button
                                        icon={() => (
                                            <RightAlignIcon
                                                color={
                                                    sSepAlign === "right" &&
                                                    "#6c40f7"
                                                }
                                            />
                                        )}
                                        onClick={() =>
                                            handleBlockDefault({
                                                sSepAlign: "right",
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
                        {imageUrl && (
                            <>
                                <ResponsiveRangeController
                                    baseLabel={__(
                                        "Image Width",
                                        "essential-blocks"
                                    )}
                                    controlName={imageWidth}
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
                                        handleBlockDefault({
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
                                />
                                <ToggleControl
                                    label={__(
                                        "Enable Background before Image",
                                        "essential-blocks"
                                    )}
                                    checked={imgBeforeEl}
                                    onChange={() =>
                                        handleBlockDefault({
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
                                            baseLabel={__(
                                                "Height",
                                                "essential-blocks"
                                            )}
                                            controlName={imgTopBgHeight}
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
                            label={__("Color", "essential-blocks")}
                            color={nameColor}
                            onChange={(nameColor) =>
                                handleBlockDefault({ nameColor })
                            }
                        />
                        <TypographyDropdown
                            baseLabel="Typography"
                            typographyPrefixConstant={typoPrefix_name}
                        />
                        <ResponsiveDimensionsControl
                            controlName={tmbNamePaddingConst}
                            baseLabel="Padding"
                        />
                    </PanelBody>
                    <PanelBody
                        title={__("Job Title", "essential-blocks")}
                        initialOpen={false}
                    >
                        <ColorControl
                            label={__("Color", "essential-blocks")}
                            color={jobColor}
                            onChange={(jobColor) =>
                                handleBlockDefault({ jobColor })
                            }
                        />
                        <TypographyDropdown
                            baseLabel="Typography"
                            typographyPrefixConstant={typoPrefix_job}
                        />
                        <ResponsiveDimensionsControl
                            controlName={tmbJobPaddingConst}
                            baseLabel="Padding"
                        />
                    </PanelBody>
                    <PanelBody
                        title={__("Description", "essential-blocks")}
                        initialOpen={false}
                    >
                        <ToggleControl
                            label={__("Enable Description", "essential-blocks")}
                            checked={showDescs}
                            onChange={() =>
                                handleBlockDefault({ showDescs: !showDescs })
                            }
                        />
                        {showDescs && (
                            <>
                                <ColorControl
                                    label={__("Color", "essential-blocks")}
                                    color={descsColor}
                                    onChange={(descsColor) =>
                                        handleBlockDefault({ descsColor })
                                    }
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
                    </PanelBody>
                    {showSocials && (
                        <PanelBody
                            title={__("Social Icons", "essential-blocks")}
                            initialOpen={false}
                        >
                            <ColorControl
                                label={__("Hover Color", "essential-blocks")}
                                color={hvIcnColor}
                                onChange={(hvIcnColor) =>
                                    handleBlockDefault({ hvIcnColor })
                                }
                            />
                            <ColorControl
                                label={__(
                                    "Hover Background",
                                    "essential-blocks"
                                )}
                                color={hvIcnBgc}
                                onChange={(hvIcnBgc) =>
                                    handleBlockDefault({ hvIcnBgc })
                                }
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
                                    N.B. 'Rows Gap' is used when you have
                                    multiple rows of social profiles. Normally
                                    in case of only one row, it's not needed
                                </i>
                            </label>
                            <ToggleControl
                                label={__("Icons Devider", "essential-blocks")}
                                checked={isIconsDevider}
                                onChange={() =>
                                    handleBlockDefault({
                                        isIconsDevider: !isIconsDevider,
                                    })
                                }
                            />
                            {isIconsDevider && (
                                <>
                                    <ColorControl
                                        label={__("Color", "essential-blocks")}
                                        color={icnsDevideColor}
                                        onChange={(icnsDevideColor) =>
                                            handleBlockDefault({
                                                icnsDevideColor,
                                            })
                                        }
                                    />
                                    <RangeControl
                                        label={__("Width", "essential-blocks")}
                                        value={icnSepW}
                                        onChange={(icnSepW) =>
                                            handleBlockDefault({ icnSepW })
                                        }
                                        step={1}
                                        min={1}
                                        max={50}
                                    />
                                    <RangeControl
                                        label={__("Height", "essential-blocks")}
                                        value={icnSepH}
                                        onChange={(icnSepH) =>
                                            handleBlockDefault({ icnSepH })
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
                                        controlName={sclDeviderPosRight}
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
                                onChange={(icnEffect) => {
                                    handleBlockDefault({ icnEffect });
                                }}
                            />
                            <PanelBody
                                title={__("Icons Border", "essential-blocks")}
                                initialOpen={false}
                            >
                                <BorderShadowControl
                                    controlName={prefixSocialBdShadow}
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
                                    controlName={iconsWrapMargin}
                                    baseLabel="Margin"
                                />

                                <ResponsiveDimensionsControl
                                    controlName={iconsWrapPadding}
                                    baseLabel="Padding"
                                />
                            </PanelBody>
                        </PanelBody>
                    )}
                    {showCSeparator && (
                        <PanelBody
                            title={__("Content Separator", "essential-blocks")}
                            initialOpen={false}
                        >
                            <ColorControl
                                label={__("Color", "essential-blocks")}
                                color={cSepColor}
                                onChange={(cSepColor) =>
                                    handleBlockDefault({ cSepColor })
                                }
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
                            <BaseControl
                                label={__("Separator Type", "essential-blocks")}
                            >
                                <SelectControl
                                    value={cSepType}
                                    options={separatorTypes}
                                    onChange={(cSepType) => {
                                        handleBlockDefault({ cSepType });
                                    }}
                                />
                            </BaseControl>
                        </PanelBody>
                    )}
                    {showSocials && showSSeparator && (
                        <PanelBody
                            title={__("Social Separator", "essential-blocks")}
                            initialOpen={false}
                        >
                            <ColorControl
                                label={__("Color", "essential-blocks")}
                                color={sSepColor}
                                onChange={(sSepColor) =>
                                    handleBlockDefault({ sSepColor })
                                }
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
                            <BaseControl
                                label={__("Separator Type", "essential-blocks")}
                            >
                                <SelectControl
                                    value={sSepType}
                                    options={separatorTypes}
                                    onChange={(sSepType) => {
                                        handleBlockDefault({ sSepType });
                                    }}
                                />
                            </BaseControl>
                        </PanelBody>
                    )}
                    <PanelBody
                        title={__("Wrapper Margin & Padding")}
                        initialOpen={false}
                    >
                        <ResponsiveDimensionsControl
                            controlName={tmbWrapMarginConst}
                            baseLabel="Margin"
                        />
                        <ResponsiveDimensionsControl
                            controlName={tmbWrapPaddingConst}
                            baseLabel="Padding"
                        />
                    </PanelBody>
                    <PanelBody
                        title={__("Wrapper Background ", "essential-blocks")}
                        initialOpen={false}
                    >
                        <BackgroundControl
                            controlName={WrpBgConst}
                        />
                    </PanelBody>
                    <PanelBody
                        title={__("Wrapper Border & Shadow")}
                        initialOpen={false}
                    >
                        <BorderShadowControl
                            controlName={WrpBdShadowConst}
                        />
                    </PanelBody>
                </div>
            )}
        </>
    );
}

export default withBlockContext(objAttributes)(TeamMember);
