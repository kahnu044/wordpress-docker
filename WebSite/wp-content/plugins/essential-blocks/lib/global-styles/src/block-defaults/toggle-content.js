/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useEffect, useState } from "@wordpress/element";
import { PanelColorSettings } from "@wordpress/block-editor";
import {
    PanelBody,
    RadioControl,
    RangeControl,
    SelectControl,
    ToggleControl,
    TabPanel,
} from "@wordpress/components";
/**
 * Internal dependencies
 *
 */
import {
    SWITCH_STYLES,
    SWITCH_SIZE,
    SEPERATOR_TYPE,
    BORDER_STYLES,
    INITIAL_CONTENT,
} from "../../../../blocks/toggle-content/src/constants";
import {
    rangeButtonWidth,
    rangeButtonHeight,
    rangeHeadingSpace,
} from "../../../../blocks/toggle-content/src/constants/rangeNames";

import { WrpBgConst } from "../../../../blocks/toggle-content/src/constants/backgroundsConstants";

import { WrpBdShadowConst } from "../../../../blocks/toggle-content/src/constants/borderShadowConstants";
import { typoPrefix_tgl } from "../../../../blocks/toggle-content/src/constants/typographyPrefixConstants";

import {
    tglWrapMarginConst,
    tglWrapPaddingConst,
} from "../../../../blocks/toggle-content/src/constants/dimensionsConstants";
import objAttributes from "../../../../blocks/toggle-content/src/attributes";

const {
    UnitControl,
    GradientColorControl,
    ColorControl,
    ResetControl,
    TypographyDropdown,
    ResponsiveDimensionsControl,
    ResponsiveRangeController,
    BorderShadowControl,
    BackgroundControl,
    AdvancedControls,
} = window.EBControls;

function ToggleContent(props) {
    const { blockDefaults, setBlockDefaults, name, deviceType } = props;

    const [defaultValues, setDefaultValues] = useState({});
    const [isDefaultSet, setDefaultSet] = useState(false);

    const {
        resOption,

        //
        initialContent,
        switchStyle,
        switchSize,
        buttonHeight,
        buttonWidth,
        seperatorType,
        activeColor,
        activeBg,
        primaryLabelColor,
        secondaryLabelColor,
        headingSpace,
        headingSpaceUnit,
        labelSpace,
        labelSpaceUnit,
        backgroundType,
        backgroundColor,
        backgroundGradient,
        controllerType,
        controllerColor,
        controllerGradient,
        borderStyle,
        borderWidth,
        borderColor,
        borderRadius,
        shadowColor,
        hOffset,
        vOffset,
        blur,
        spread,
        inset,
    } = defaultValues;

    /**
     * Update block defaults
     */
    useEffect(() => {
        if (blockDefaults[name]) {
            setDefaultValues({ ...blockDefaults[name] });
        } else {
            setDefaultValues({
                initialContent: "primary",
                switchStyle: "rounded",
                alignment: "center",
                switchSize: "m",
                switchSizeUnit: "px",
                seperatorType: "none",
                labelSpaceUnit: "px",
                backgroundType: "solid",
                backgroundGradient: "linear-gradient(45deg,#00F260,#0575E6)",
                controllerType: "solid",
                inset: false,
                [`${tglWrapMarginConst}Unit`]: "px",
                [`${tglWrapMarginConst}isLinked`]: true,
                [`${tglWrapPaddingConst}Unit`]: "px",
                [`${tglWrapPaddingConst}isLinked`]: true,
                [`${WrpBdShadowConst}Bdr_Unit`]: "px",
                [`${WrpBdShadowConst}Bdr_isLinked`]: true,
                [`${WrpBdShadowConst}Rds_Unit`]: "px",
                [`${WrpBdShadowConst}Rds_isLinked`]: true,
                [`${WrpBdShadowConst}BorderType`]: "normal",
                [`${WrpBdShadowConst}shadowType`]: "normal",
            });
        }
        setDefaultSet(true);
    }, []);

    /**
     * On change default value, set to block default
     */
    useEffect(() => {
        setBlockDefaults({
            [name]: defaultValues,
        });
    }, [defaultValues]);

    /**
     * handleBlockDefault
     * @param {*} obj
     */
    const handleBlockDefault = (obj) => {
        let values = { ...defaultValues };
        Object.keys(obj).map((item) => {
            values[item] = obj[item];
        });
        setDefaultValues(values);
    };

    /**
     * resRequiredProps
     */
    const resRequiredProps = {
        setAttributes: handleBlockDefault,
        resOption: deviceType,
        attributes: defaultValues,
        objAttributes,
    };

    let labelColors = [
        {
            value: primaryLabelColor,
            onChange: (primaryLabelColor) =>
                handleBlockDefault({ primaryLabelColor }),
            label: "Primary Text",
        },
        {
            value: secondaryLabelColor,
            onChange: (secondaryLabelColor) =>
                handleBlockDefault({ secondaryLabelColor }),
            label: "Secondary Text",
        },
        {
            value: activeColor,
            onChange: (activeColor) => handleBlockDefault({ activeColor }),
            label: "Active Text Color",
        },
    ];

    // Add active background color controller for text type switch
    if (switchStyle === "text") {
        labelColors = [
            ...labelColors,
            {
                value: backgroundColor,
                onChange: (backgroundColor) =>
                    handleBlockDefault({ backgroundColor }),
                label: "Background",
            },
            {
                value: activeBg,
                onChange: (activeBg) => handleBlockDefault({ activeBg }),
                label: "Active Background",
            },
        ];
    }

    return (
        <>
            {isDefaultSet && (
                <div className="eb-panel-control">
                    <PanelBody
                        title={__("General", "essential-blocks")}
                        initialOpen={true}
                    >
                        <RadioControl
                            label={__("Initial Content", "essential-blocks")}
                            selected={initialContent}
                            onChange={(initialContent) =>
                                handleBlockDefault({ initialContent })
                            }
                            options={INITIAL_CONTENT}
                        />

                        <SelectControl
                            label={__("Switch Type", "essential-blocks")}
                            value={switchStyle}
                            onChange={(switchStyle) =>
                                handleBlockDefault({ switchStyle })
                            }
                            options={SWITCH_STYLES}
                        />

                        {(switchStyle === "rounded" ||
                            switchStyle === "reactangle") && (
                            <SelectControl
                                label={__("Switch Size", "essential-blocks")}
                                value={switchSize}
                                options={SWITCH_SIZE}
                                onChange={(switchSize) =>
                                    handleBlockDefault({ switchSize })
                                }
                            />
                        )}

                        {switchStyle === "toggle" && (
                            <>
                                <ResponsiveRangeController
                                    noUnits
                                    baseLabel={__(
                                        "Button Height",
                                        "essential-blocks"
                                    )}
                                    controlName={rangeButtonHeight}
                                    resRequiredProps={resRequiredProps}
                                    min={10}
                                    max={200}
                                    step={1}
                                />

                                <ResponsiveRangeController
                                    baseLabel={__(
                                        "Button Width",
                                        "essential-blocks"
                                    )}
                                    controlName={rangeButtonWidth}
                                    resRequiredProps={resRequiredProps}
                                    min={10}
                                    max={100}
                                    step={1}
                                />
                            </>
                        )}

                        {switchStyle === "text" && (
                            <SelectControl
                                label={__("Sepetator Type", "essential-blocks")}
                                value={seperatorType}
                                options={SEPERATOR_TYPE}
                                onChange={(seperatorType) =>
                                    handleBlockDefault({ seperatorType })
                                }
                            />
                        )}

                        <ResponsiveRangeController
                            baseLabel={__("Heading Space", "essential-blocks")}
                            controlName={rangeHeadingSpace}
                            resRequiredProps={resRequiredProps}
                            min={10}
                            max={100}
                            step={1}
                        />

                        {(switchStyle === "rectangle" ||
                            switchStyle === "rounded") && (
                            <>
                                <UnitControl
                                    selectedUnit={labelSpaceUnit}
                                    unitTypes={[
                                        { label: "px", value: "px" },
                                        { label: "%", value: "%" },
                                    ]}
                                    onClick={(labelSpaceUnit) =>
                                        handleBlockDefault({ labelSpaceUnit })
                                    }
                                />

                                <RangeControl
                                    label={__(
                                        "Label Space",
                                        "essential-blocks"
                                    )}
                                    value={labelSpace}
                                    onChange={(labelSpace) =>
                                        handleBlockDefault({ labelSpace })
                                    }
                                />
                            </>
                        )}

                        <TypographyDropdown
                            baseLabel="Typography"
                            typographyPrefixConstant={typoPrefix_tgl}
                            resRequiredProps={resRequiredProps}
                        />
                    </PanelBody>
                    <PanelBody
                        title={__(
                            `${
                                switchStyle === "text"
                                    ? "Colors Style"
                                    : "Label Colors Style"
                            }`
                        )}
                        initialOpen={false}
                    >
                        <PanelColorSettings
                            initialOpen={false}
                            colorSettings={labelColors}
                        />
                    </PanelBody>

                    {switchStyle !== "text" && (
                        <PanelBody
                            title={__(
                                "Switch Background Style",
                                "essential-blocks"
                            )}
                            initialOpen={false}
                        >
                            <ToggleControl
                                label={__(
                                    "Gradient Background",
                                    "essential-blocks"
                                )}
                                checked={backgroundType === "gradient"}
                                onChange={() =>
                                    handleBlockDefault({
                                        backgroundType:
                                            backgroundType === "solid"
                                                ? "gradient"
                                                : "solid",
                                    })
                                }
                            />

                            {backgroundType === "solid" && (
                                <PanelColorSettings
                                    title={__(
                                        "Background Color",
                                        "essential-blocks"
                                    )}
                                    // initialOpen={false}
                                    colorSettings={[
                                        {
                                            value: backgroundColor,
                                            onChange: (backgroundColor) =>
                                                handleBlockDefault({
                                                    backgroundColor,
                                                }),
                                            label: "",
                                        },
                                    ]}
                                />
                            )}

                            {backgroundType === "gradient" && (
                                <PanelBody
                                    title={__(
                                        "Background Gradient",
                                        "essential-blocks"
                                    )}
                                    // initialOpen={false}
                                >
                                    <GradientColorControl
                                        gradientColor={
                                            backgroundGradient ||
                                            "linear-gradient(45deg,#eef2f3,#8e92ab)"
                                        }
                                        onChange={(backgroundGradient) =>
                                            handleBlockDefault({
                                                backgroundGradient,
                                            })
                                        }
                                    />
                                </PanelBody>
                            )}
                        </PanelBody>
                    )}

                    {switchStyle !== "text" && (
                        <PanelBody
                            title={__(
                                "Controller Background",
                                "essential-blocks"
                            )}
                            initialOpen={false}
                        >
                            <ToggleControl
                                label={__(
                                    "Gradient Controller",
                                    "essential-blocks"
                                )}
                                checked={controllerType === "gradient"}
                                onChange={() =>
                                    handleBlockDefault({
                                        controllerType:
                                            controllerType === "solid"
                                                ? "gradient"
                                                : "solid",
                                    })
                                }
                            />

                            {controllerType === "solid" && (
                                <PanelColorSettings
                                    title={__(
                                        "Controller Color",
                                        "essential-blocks"
                                    )}
                                    // initialOpen={false}
                                    colorSettings={[
                                        {
                                            value: controllerColor,
                                            onChange: (controllerColor) =>
                                                handleBlockDefault({
                                                    controllerColor,
                                                }),
                                            label: "",
                                        },
                                    ]}
                                />
                            )}

                            {controllerType === "gradient" && (
                                <PanelBody
                                    title={__(
                                        "Controller Gradient",
                                        "essential-blocks"
                                    )}
                                    // initialOpen={false}
                                >
                                    <GradientColorControl
                                        gradientColor={
                                            controllerGradient ||
                                            "linear-gradient(45deg,#eef2f3,#8e92ab)"
                                        }
                                        onChange={(controllerGradient) =>
                                            handleBlockDefault({
                                                controllerGradient,
                                            })
                                        }
                                    />
                                </PanelBody>
                            )}
                        </PanelBody>
                    )}

                    <PanelBody
                        title={__("Border Style", "essential-blocks")}
                        initialOpen={false}
                    >
                        <SelectControl
                            label={__("Border Style", "essential-blocks")}
                            value={borderStyle}
                            options={BORDER_STYLES}
                            onChange={(borderStyle) =>
                                handleBlockDefault({ borderStyle })
                            }
                        />

                        <ColorControl
                            label={__("Border Color", "essential-blocks")}
                            color={borderColor}
                            onChange={(borderColor) =>
                                handleBlockDefault({ borderColor })
                            }
                        />

                        <RangeControl
                            label={__("Border Width", "essential-blocks")}
                            value={borderWidth}
                            onChange={(borderWidth) =>
                                handleBlockDefault({ borderWidth })
                            }
                            min={0}
                            max={17}
                        />

                        {switchStyle === "text" && (
                            <RangeControl
                                label={__("Border Radius", "essential-blocks")}
                                value={borderRadius}
                                onChange={(borderRadius) =>
                                    handleBlockDefault({ borderRadius })
                                }
                                min={0}
                                max={100}
                            />
                        )}
                    </PanelBody>

                    {switchStyle !== "text" && (
                        <PanelBody
                            title={__("Shadow", "essential-blocks")}
                            initialOpen={false}
                        >
                            <ColorControl
                                label={__("Shadow Color", "essential-blocks")}
                                color={shadowColor}
                                onChange={(shadowColor) =>
                                    handleBlockDefault({ shadowColor })
                                }
                            />

                            <ResetControl
                                onReset={() =>
                                    handleBlockDefault({ hOffset: undefined })
                                }
                            >
                                <RangeControl
                                    label={__(
                                        "Horizontal Offset",
                                        "essential-blocks"
                                    )}
                                    value={hOffset}
                                    onChange={(hOffset) =>
                                        handleBlockDefault({ hOffset })
                                    }
                                    min={0}
                                    max={10}
                                />
                            </ResetControl>

                            <ResetControl
                                onReset={() =>
                                    handleBlockDefault({ vOffset: undefined })
                                }
                            >
                                <RangeControl
                                    label={__(
                                        "Vertical Offset",
                                        "essential-blocks"
                                    )}
                                    value={vOffset}
                                    onChange={(vOffset) =>
                                        handleBlockDefault({ vOffset })
                                    }
                                    min={0}
                                    max={10}
                                />
                            </ResetControl>

                            <ResetControl
                                onReset={() =>
                                    handleBlockDefault({ blur: undefined })
                                }
                            >
                                <RangeControl
                                    label={__("Blur", "essential-blocks")}
                                    value={blur}
                                    onChange={(blur) =>
                                        handleBlockDefault({ blur })
                                    }
                                    min={0}
                                    max={10}
                                />
                            </ResetControl>

                            <ResetControl
                                onReset={() =>
                                    handleBlockDefault({ spread: undefined })
                                }
                            >
                                <RangeControl
                                    label={__(" Spread", "essential-blocks")}
                                    value={spread}
                                    onChange={(spread) =>
                                        handleBlockDefault({ spread })
                                    }
                                    min={0}
                                    max={10}
                                />
                            </ResetControl>

                            <ToggleControl
                                label={__("Inset", "essential-blocks")}
                                checked={inset}
                                onChange={() =>
                                    handleBlockDefault({ inset: !inset })
                                }
                            />
                        </PanelBody>
                    )}
                    <PanelBody
                        title={__("Wrapper Margin & Padding")}
                        initialOpen={false}
                    >
                        <ResponsiveDimensionsControl
                            resRequiredProps={resRequiredProps}
                            controlName={tglWrapMarginConst}
                            baseLabel="Margin"
                        />
                        <ResponsiveDimensionsControl
                            resRequiredProps={resRequiredProps}
                            controlName={tglWrapPaddingConst}
                            baseLabel="Padding"
                        />
                    </PanelBody>

                    <PanelBody
                        title={__("Wrapper Background ", "essential-blocks")}
                        initialOpen={false}
                    >
                        <BackgroundControl
                            controlName={WrpBgConst}
                            resRequiredProps={resRequiredProps}
                        />
                    </PanelBody>

                    <PanelBody
                        title={__("Wrapper Border & Shadow")}
                        initialOpen={false}
                    >
                        <BorderShadowControl
                            controlName={WrpBdShadowConst}
                            resRequiredProps={resRequiredProps}
                        />
                    </PanelBody>
                </div>
            )}
        </>
    );
}

export default ToggleContent;
