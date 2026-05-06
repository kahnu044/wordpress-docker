/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
    PanelBody,
    BaseControl,
    ToggleControl,
    SelectControl,
    RangeControl,
    __experimentalDivider as Divider,
    __experimentalToggleGroupControl as ToggleGroupControl,
    __experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from "@wordpress/components";

import {
    ColorControl,
    ResponsiveRangeController,
    ResponsiveDimensionsControl,
    TypographyDropdown,
    BackgroundControl,
    BorderShadowControl,
    EBIconPicker,
    useBlockDefaults,
    withBlockContext
} from "@essential-blocks/controls";

/**
 * Internal depencencies
 */
import {
    CONTENT_POSITION,
    BUTTON_WIDTH,
    FIXED_WIDTH,
    BUTTON_PADDING,
    ICON_POSITION,
    ICON_SIZE,
    ICON_SPACE,
    BUTTON_BACKGROUND,
    BUTTON_BORDER,
    HOVER_EFFECT,
    WRAPPER_MARGIN,
    LAYOUT_TYPES,
} from "@essential-blocks/blocks/button/src/components/constants";

import { typoPrefix_text } from "@essential-blocks/blocks/button/src/components/typographyContants";

import objAttributes from "@essential-blocks/blocks/button/src/components/attributes";

function EBButton(props) {
    const { blockDefaults, setBlockDefaults, name, deviceType, handleBlockDefault } = props;

    const {
        buttonAlign,
        buttonWidth,
        addIcon,
        icon,
        iconPosition,
        textColor,
        hoverTextColor,
        hoverEffect,
        hoverTransition,
        type,
    } = blockDefaults;

    const isDefaultSet = useBlockDefaults(name, blockDefaults, setBlockDefaults, objAttributes)

    return (
        <>
            {isDefaultSet && (
                <div className="eb-panel-control">
                    <PanelBody title={__("General", "essential-blocks")}>
                        <ToggleGroupControl
                            label={__("Alignment", "essential-blocks")}

                            value={buttonAlign}
                            onChange={(value) =>
                                handleBlockDefault({
                                    buttonAlign: value,
                                })
                            }
                            isBlock
                            __next40pxDefaultSize
                            __nextHasNoMarginBottom
                        >
                            {CONTENT_POSITION.map((item, index) => (
                                <ToggleGroupControlOption
                                    key={index}
                                    value={item.value}
                                    label={item.label}
                                />
                            ))}
                        </ToggleGroupControl>
                        <ToggleGroupControl
                            label={__("Width", "essential-blocks")}

                            value={buttonWidth}
                            onChange={(value) =>
                                handleBlockDefault({
                                    buttonWidth: value,
                                })
                            }
                            isBlock
                            __next40pxDefaultSize
                            __nextHasNoMarginBottom
                        >
                            {BUTTON_WIDTH.map((item, index) => (
                                <ToggleGroupControlOption
                                    key={index}
                                    value={item.value}
                                    label={item.label}
                                />
                            ))}
                        </ToggleGroupControl>
                        {buttonWidth === "fixed" && (
                            <ResponsiveRangeController
                                baseLabel={__("Fixed Width", "essential-blocks")}
                                controlName={FIXED_WIDTH}
                                min={100}
                                max={900}
                                step={1}
                            />
                        )}
                    </PanelBody>
                    <PanelBody title={__("Icon", "essential-blocks")} initialOpen={false}>
                        <ToggleControl
                            label={__("Add icon", "essential-blocks")}
                            checked={addIcon}
                            onChange={() => handleBlockDefault({ addIcon: !addIcon })}
                            __nextHasNoMarginBottom
                        />
                        {addIcon && (
                            <>
                                <EBIconPicker
                                    value={icon}
                                    onChange={(icon) => handleBlockDefault({ icon })}
                                />
                                <ToggleGroupControl
                                    label={__("Icon Postion", "essential-blocks")}

                                    value={iconPosition}
                                    onChange={(value) =>
                                        handleBlockDefault({
                                            iconPosition: value,
                                        })
                                    }
                                    isBlock
                                    __next40pxDefaultSize
                                    __nextHasNoMarginBottom
                                >
                                    {ICON_POSITION.map((item, index) => (
                                        <ToggleGroupControlOption
                                            key={index}
                                            value={item.value}
                                            label={item.label}
                                        />
                                    ))}
                                </ToggleGroupControl>
                                <ResponsiveRangeController
                                    baseLabel={__("Size", "essential-blocks")}
                                    controlName={ICON_SIZE}

                                    noUnits={true}
                                />
                                <ResponsiveRangeController
                                    baseLabel={__("Gap", "essential-blocks")}
                                    controlName={ICON_SPACE}

                                    noUnits={true}
                                />
                            </>
                        )}
                    </PanelBody>
                    <PanelBody title={__("Styles", "essential-blocks")} initialOpen={true}>
                        <>
                            <TypographyDropdown
                                baseLabel={__("Typography", "essential-blocks")}
                                typographyPrefixConstant={typoPrefix_text}
                            />
                            <ColorControl
                                label={__("Text Color", "essential-blocks")}
                                color={textColor}
                                onChange={(newTextColor) =>
                                    handleBlockDefault({
                                        textColor: newTextColor,
                                    })
                                }
                            />
                            <ColorControl
                                label={__("Text Hover Color", "essential-blocks")}
                                color={hoverTextColor}
                                onChange={(newHoverTextColor) =>
                                    handleBlockDefault({
                                        hoverTextColor: newHoverTextColor,
                                    })
                                }
                            />
                            <Divider />
                            <BaseControl __nextHasNoMarginBottom>
                                <h3 className="eb-control-title">{__("Background", "essential-blocks")}</h3>
                            </BaseControl>
                            <BackgroundControl
                                controlName={BUTTON_BACKGROUND}
                                noOverlay={true}
                                noMainBgi={true}
                            />
                            <Divider />
                            <BaseControl __nextHasNoMarginBottom>
                                <h3 className="eb-control-title">{__("Border", "essential-blocks")}</h3>
                            </BaseControl>
                            <BorderShadowControl controlName={BUTTON_BORDER} />
                            <ResponsiveDimensionsControl
                                controlName={BUTTON_PADDING}
                                baseLabel={__("Padding", "essential-blocks")}
                            />
                        </>
                    </PanelBody>
                    {/* Advanced */}
                    <PanelBody
                        title={__("Wrapper Margin", "essential-blocks")}
                    // initialOpen={true}
                    >
                        <ResponsiveDimensionsControl

                            controlName={WRAPPER_MARGIN}
                            baseLabel={__("Margin", "essential-blocks")}
                        />

                        <SelectControl
                            label={__("Hover Effect", "essential-blocks")}
                            value={hoverEffect}
                            options={HOVER_EFFECT}
                            onChange={(newHoverEffect) =>
                                handleBlockDefault({
                                    hoverEffect: newHoverEffect,
                                })
                            }
                            __next40pxDefaultSize
                            __nextHasNoMarginBottom
                        />
                        {hoverEffect && (
                            <RangeControl
                                label={__("Hover Transition", "essential-blocks")}
                                value={hoverTransition}
                                onChange={(hoverTransition) => handleBlockDefault({ hoverTransition })}
                                step={0.01}
                                min={0}
                                max={5}
                                __nextHasNoMarginBottom
                                __next40pxDefaultSize
                            />
                        )}
                    </PanelBody>
                </div>
            )}
        </>
    );
}

export default withBlockContext(objAttributes)(EBButton);
