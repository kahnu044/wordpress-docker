/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useEffect } from "@wordpress/element";
import {
    SelectControl,
    ToggleControl,
    BaseControl,
    Button,
    ButtonGroup,
    TextControl,
    __experimentalDivider as Divider,
} from "@wordpress/components";

import { TITLE_TYPOGRAPHY } from "./constants/typographyPrefixConstants";

/**
 * Internal dependencies
 */

import {
    ResponsiveDimensionsControl,
    ResponsiveRangeController,
    ColorControl,
    BorderShadowControl,
    TypographyDropdown,
    SortControl,
    EBIconPicker,
    InspectorPanel
} from "@essential-blocks/controls";

import {
    rangeIconSize,
    rangeIconMargin,
    rangeIconDistance,
    rangeIconRowGap,
    rangeIconHeight,
    rangeIconWidth,
    rangeFloatingWidth,
    rangeFloatingHeight,
} from "./constants/rangeNames";

import {
    iconsPadding,
    tmbWrapMarginConst,
    tmbWrapPaddingConst,
} from "./constants/dimensionsConstants";

import { WrpBgConst } from "./constants/backgroundsConstants";

import {
    WrpBdShadowConst,
    prefixSocialBdShadow,
} from "./constants/borderShadowConstants";

import { IconsHzAligns, HOVER_EFFECT, ICON_SHAPE } from "./constants";

function Inspector({ attributes, setAttributes }) {
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
    } = attributes;

    //
    useEffect(() => {
        const newSclDtails = socialDetails.map((item) => ({
            ...item,
            isExpanded: false,
        }));
        setAttributes({ socialDetails: newSclDtails });
    }, []);

    useEffect(() => {
        onShapeChange(iconShape);
    }, []);

    const onShapeChange = (value) => {
        switch (value) {
            case "rounded":
                setAttributes({
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
                setAttributes({
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
                setAttributes({
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
                    label={__("Text", "essential-blocks")}
                    className="social-share-name-input"
                    value={each.iconText || ""}
                    onChange={(value) => onProfileChange('iconText', value, i)}
                />
                <ColorControl
                    label={__("Icon Color", "essential-blocks")}
                    color={each.color || ""}
                    onChange={(value) => onProfileChange('color', value, i)}
                />
                <ColorControl
                    label={__("Icon Background Color", "essential-blocks")}
                    color={each.backgroundColor}
                    onChange={(value) => onProfileChange('backgroundColor', value, i)}
                />
                <ColorControl
                    label={__("Separator Color", "essential-blocks")}
                    color={each.separatorColor}
                    onChange={(value) => onProfileChange('separatorColor', value, i)}
                />
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
                <InspectorPanel.PanelBody
                    title={__(
                        "Share Buttons",
                        "essential-blocks"
                    )}
                    initialOpen={true}
                >
                    <>
                        <ToggleControl
                            label={__(
                                "Show Title",
                                "essential-blocks"
                            )}
                            checked={showTitle}
                            onChange={() =>
                                setAttributes({
                                    showTitle: !showTitle,
                                })
                            }
                        />
                        <ToggleControl
                            label={__(
                                "Floating",
                                "essential-blocks"
                            )}
                            checked={isFloating}
                            onChange={() =>
                                setAttributes({
                                    isFloating: !isFloating,
                                })
                            }
                        />
                        <Divider />
                        <SortControl
                            items={attributes.socialDetails}
                            labelKey={'iconText'}
                            onSortEnd={socialDetails => setAttributes({ socialDetails })}
                            onDeleteItem={index => {
                                setAttributes({ socialDetails: attributes.socialDetails.filter((each, i) => i !== index) })
                            }}
                            hasSettings={true}
                            settingsComponents={getSocialDetailsComponents()}
                            hasAddButton={false}
                        />
                    </>
                </InspectorPanel.PanelBody>
            </InspectorPanel.General>
            <InspectorPanel.Style>
                <>
                    <InspectorPanel.PanelBody
                        title={__(
                            "Icons Styles",
                            "essential-blocks"
                        )}
                        initialOpen={true}
                    >
                        <BaseControl
                            label={__(
                                "Icon Shape",
                                "essential-blocks"
                            )}
                        >
                            <ButtonGroup>
                                {ICON_SHAPE.map(
                                    (item, index) => (
                                        <Button
                                            key={index}
                                            isSecondary={
                                                iconShape !==
                                                item.value
                                            }
                                            isPrimary={
                                                iconShape ===
                                                item.value
                                            }
                                            onClick={() =>
                                                onShapeChange(
                                                    item.value
                                                )
                                            }
                                        >
                                            {item.label}
                                        </Button>
                                    )
                                )}
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
                                    setAttributes({
                                        iconsJustify,
                                    })
                                }
                            />
                        </BaseControl>

                        {showTitle && (
                            <TypographyDropdown
                                baseLabel={__(
                                    "Typography",
                                    "essential-blocks"
                                )}
                                typographyPrefixConstant={
                                    TITLE_TYPOGRAPHY
                                }
                            />
                        )}

                        <ResponsiveRangeController
                            noUnits
                            baseLabel={__(
                                "Size",
                                "essential-blocks"
                            )}
                            controlName={rangeIconSize}
                            min={5}
                            max={300}
                            step={1}
                        />

                        {iconShape === "circular" && (
                            <>
                                <ResponsiveRangeController
                                    noUnits
                                    baseLabel={__(
                                        "Height",
                                        "essential-blocks"
                                    )}
                                    controlName={
                                        rangeIconHeight
                                    }
                                    min={0}
                                    max={800}
                                    step={1}
                                />
                                <ResponsiveRangeController
                                    noUnits
                                    baseLabel={__(
                                        "Width",
                                        "essential-blocks"
                                    )}
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
                                    controlName={
                                        rangeFloatingWidth
                                    }
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
                                    controlName={
                                        rangeFloatingHeight
                                    }
                                    min={0}
                                    max={2000}
                                    step={1}
                                />
                            </>
                        )}

                        <ResponsiveRangeController
                            noUnits
                            baseLabel={__(
                                "Margin",
                                "essential-blocks"
                            )}
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
                                    controlName={
                                        rangeIconDistance
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
                                    controlName={
                                        rangeIconRowGap
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
                                        N.B. 'Rows Gap' is used
                                        when you have multiple
                                        rows of social profiles.
                                        Normally in case of only
                                        one row, it's not needed
                                    </i>
                                </label>
                            </>
                        )}

                        <ColorControl
                            label={__(
                                "Hover Color",
                                "essential-blocks"
                            )}
                            color={hvIcnColor}
                            attributeName={'hvIcnColor'}
                        />

                        <ColorControl
                            label={__(
                                "Hover Background",
                                "essential-blocks"
                            )}
                            color={hvIcnBgc}
                            attributeName={'hvIcnBgc'}
                        />

                        <SelectControl
                            label={__(
                                "Icon Hover Effect",
                                "essential-blocks"
                            )}
                            value={icnEffect}
                            options={HOVER_EFFECT}
                            onChange={(icnEffect) => {
                                setAttributes({ icnEffect });
                            }}
                        />
                    </InspectorPanel.PanelBody>

                    <InspectorPanel.PanelBody
                        title={__("Icons Border & Box-Shadow")}
                        initialOpen={false}
                    >
                        <BorderShadowControl
                            controlName={prefixSocialBdShadow}
                        />
                    </InspectorPanel.PanelBody>
                </>
            </InspectorPanel.Style>
        </InspectorPanel>
    );
}
export default Inspector;
