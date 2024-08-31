/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
    PanelBody,
    SelectControl,
    ToggleControl,
    BaseControl,
    Button,
    ButtonGroup,
    __experimentalDivider as Divider,
} from "@wordpress/components";

/**
 * Internal dependencies
 */
import {
    ResponsiveDimensionsControl,
    ResponsiveRangeController,
    ColorControl,
    BorderShadowControl,
    BackgroundControl,
    TypographyDropdown,
    useBlockDefaults,
    withBlockContext
} from "@essential-blocks/controls";
import { TITLE_TYPOGRAPHY } from "@essential-blocks/blocks/social-share/src/constants/typographyPrefixConstants";
import objAttributes from "@essential-blocks/blocks/social-share/src/attributes";
import {
    rangeIconSize,
    rangeIconMargin,
    rangeIconDistance,
    rangeIconRowGap,
    rangeIconHeight,
    rangeIconWidth,
    rangeFloatingWidth,
    rangeFloatingHeight,
} from "@essential-blocks/blocks/social-share/src/constants/rangeNames";

import {
    iconsPadding,
    tmbWrapMarginConst,
    tmbWrapPaddingConst,
} from "@essential-blocks/blocks/social-share/src/constants/dimensionsConstants";

import { WrpBgConst } from "@essential-blocks/blocks/social-share/src/constants/backgroundsConstants";

import {
    WrpBdShadowConst,
    prefixSocialBdShadow,
} from "@essential-blocks/blocks/social-share/src/constants/borderShadowConstants";

import {
    IconsHzAligns,
    HOVER_EFFECT,
    ICON_SHAPE,
} from "@essential-blocks/blocks/social-share/src/constants";

function SocialShare(props) {
    const { blockDefaults, setBlockDefaults, name, deviceType, handleBlockDefault } = props;

    const {
        resOption,
        socialDetails,
        iconsJustify,
        hvIcnColor,
        hvIcnBgc,
        icnEffect,
        iconShape,
        showTitle,
        isFloating,
    } = blockDefaults;
    const isDefaultSet = useBlockDefaults(name, blockDefaults, setBlockDefaults, objAttributes)

    const onShapeChange = (value) => {
        switch (value) {
            case "rounded":
                handleBlockDefault({
                    iconShape: value,
                    sclBdSd_Rds_Bottom: "10",
                    sclBdSd_Rds_Left: "10",
                    sclBdSd_Rds_Right: "10",
                    sclBdSd_Rds_Top: "10",
                    sclBdSd_Rds_Unit: "px",
                    sclBdSd_Rds_isLinked: true,
                });
                break;

            case "circular":
                handleBlockDefault({
                    iconShape: value,
                    sclBdSd_Rds_Bottom: "50",
                    sclBdSd_Rds_Left: "50",
                    sclBdSd_Rds_Right: "50",
                    sclBdSd_Rds_Top: "50",
                    sclBdSd_Rds_Unit: "%",
                    sclBdSd_Rds_isLinked: true,
                });
                break;

            case "square":
                handleBlockDefault({
                    iconShape: value,
                    sclBdSd_Rds_Bottom: undefined,
                    sclBdSd_Rds_Left: undefined,
                    sclBdSd_Rds_Right: undefined,
                    sclBdSd_Rds_Top: undefined,
                    sclBdSd_Rds_Unit: "px",
                    sclBdSd_Rds_isLinked: true,
                });
                break;
            default:
                break;
        }
    };

    return (
        <>
            {isDefaultSet && (
                <div className="eb-panel-control">
                    <PanelBody
                        title={__("Share Buttons", "essential-blocks")}
                        initialOpen={true}
                    >
                        <>
                            <ToggleControl
                                label={__("Show Title", "essential-blocks")}
                                checked={showTitle}
                                onChange={() =>
                                    handleBlockDefault({
                                        showTitle: !showTitle,
                                    })
                                }
                            />
                            <ToggleControl
                                label={__("Floating", "essential-blocks")}
                                checked={isFloating}
                                onChange={() =>
                                    handleBlockDefault({
                                        isFloating: !isFloating,
                                    })
                                }
                            />
                            <Divider />
                        </>
                    </PanelBody>
                    <PanelBody
                        title={__("Icons Styles", "essential-blocks")}
                        initialOpen={false}
                    >
                        <BaseControl
                            label={__("Icon Shape", "essential-blocks")}
                        >
                            <ButtonGroup>
                                {ICON_SHAPE.map((item, index) => (
                                    <Button
                                        key={index}
                                        isSecondary={iconShape !== item.value}
                                        isPrimary={iconShape === item.value}
                                        onClick={() =>
                                            onShapeChange(item.value)
                                        }
                                    >
                                        {item.label}
                                    </Button>
                                ))}
                            </ButtonGroup>
                        </BaseControl>

                        <BaseControl
                            id="eb-team-icons-alignments"
                            label="Social Icons Horizontal Alignments"
                        >
                            <SelectControl
                                value={iconsJustify}
                                options={IconsHzAligns}
                                onChange={(iconsJustify) =>
                                    handleBlockDefault({ iconsJustify })
                                }
                            />
                        </BaseControl>
                        {showTitle && (
                            <TypographyDropdown
                                baseLabel={__("Typography", "essential-blocks")}
                                typographyPrefixConstant={TITLE_TYPOGRAPHY}
                            />
                        )}
                        <ResponsiveRangeController
                            noUnits
                            baseLabel={__("Size", "essential-blocks")}
                            controlName={rangeIconSize}
                            min={5}
                            max={300}
                            step={1}
                        />
                        {iconShape === "circular" && (
                            <>
                                <ResponsiveRangeController
                                    noUnits
                                    baseLabel={__("Height", "essential-blocks")}
                                    controlName={rangeIconHeight}
                                    min={0}
                                    max={800}
                                    step={1}
                                />
                                <ResponsiveRangeController
                                    noUnits
                                    baseLabel={__("Width", "essential-blocks")}
                                    controlName={rangeIconWidth}
                                    min={0}
                                    max={800}
                                    step={1}
                                />
                            </>
                        )}
                        {isFloating && (
                            <>
                                <ResponsiveRangeController
                                    noUnits
                                    baseLabel={__(
                                        "Floating Width",
                                        "essential-blocks"
                                    )}
                                    controlName={rangeFloatingWidth}
                                    min={0}
                                    max={800}
                                    step={1}
                                />
                                <ResponsiveRangeController
                                    noUnits
                                    baseLabel={__(
                                        "Floating Height",
                                        "essential-blocks"
                                    )}
                                    controlName={rangeFloatingHeight}
                                    min={0}
                                    max={2000}
                                    step={1}
                                />
                            </>
                        )}
                        <ResponsiveRangeController
                            noUnits
                            baseLabel={__("Margin", "essential-blocks")}
                            controlName={rangeIconMargin}
                            min={0}
                            max={250}
                            step={1}
                        />
                        {iconShape !== "circular" && (
                            <ResponsiveDimensionsControl
                                controlName={iconsPadding}
                                baseLabel="Padding"
                            />
                        )}
                        {!isFloating && (
                            <>
                                <ResponsiveRangeController
                                    noUnits
                                    baseLabel={__(
                                        "Spacing",
                                        "essential-blocks"
                                    )}
                                    controlName={rangeIconDistance}
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
                                        multiple rows of social profiles.
                                        Normally in case of only one row, it's
                                        not needed
                                    </i>
                                </label>
                            </>
                        )}
                        <ColorControl
                            label={__("Hover Color", "essential-blocks")}
                            color={hvIcnColor}
                            onChange={(hvIcnColor) =>
                                handleBlockDefault({ hvIcnColor })
                            }
                        />
                        <ColorControl
                            label={__("Hover Background", "essential-blocks")}
                            color={hvIcnBgc}
                            onChange={(hvIcnBgc) =>
                                handleBlockDefault({ hvIcnBgc })
                            }
                        />
                        <SelectControl
                            label={__("Icon Hover Effect", "essential-blocks")}
                            value={icnEffect}
                            options={HOVER_EFFECT}
                            onChange={(icnEffect) => {
                                handleBlockDefault({ icnEffect });
                            }}
                        />
                    </PanelBody>
                    <PanelBody
                        title={__("Icons Border & Box-Shadow")}
                        initialOpen={false}
                    >
                        <BorderShadowControl
                            controlName={prefixSocialBdShadow}
                        />
                    </PanelBody>
                    <PanelBody
                        title={__("Margin & Padding")}
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
                        title={__("Background ", "essential-blocks")}
                        initialOpen={false}
                    >
                        <BackgroundControl
                            controlName={WrpBgConst}
                        />
                    </PanelBody>
                    <PanelBody
                        title={__("Border & Shadow")}
                        initialOpen={false}
                    >
                        <BorderShadowControl
                            controlName={WrpBdShadowConst}
                        // noShadow
                        // noBorder
                        />
                    </PanelBody>
                </div>
            )}
        </>
    );
}

export default withBlockContext(objAttributes)(SocialShare);
