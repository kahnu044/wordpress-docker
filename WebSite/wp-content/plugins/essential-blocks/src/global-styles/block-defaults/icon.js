/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
    PanelBody,
    SelectControl,
    RangeControl,
    Button,
    ButtonGroup,
    BaseControl,
} from "@wordpress/components";

/**
 * Internal dependencies
 */
import {
    WRAPPER_BG,
    WRAPPER_MARGIN,
    WRAPPER_PADDING,
    WRAPPER_BORDER_SHADOW,
    ICON_SIZE,
    ICON_ALIGN,
    ICON_SHAPE,
    SHAPE_VIEW,
    NORMAL_HOVER,
    BORDER,
    BORDER_WIDTH,
} from "@essential-blocks/blocks/icon/src/constants";

import objAttributes from "@essential-blocks/blocks/icon/src/attributes";

import {
    ResponsiveDimensionsControl,
    ResponsiveRangeController,
    ColorControl,
    EBIconPicker,
    BackgroundControl,
    BorderShadowControl,
    useBlockDefaults,
    withBlockContext
} from "@essential-blocks/controls";

function Icon(props) {
    const { blockDefaults, setBlockDefaults, name, deviceType, handleBlockDefault } = props;

    const {
        iconAlign,
        icon,
        iconView,
        iconShape,
        iconPrimaryColor,
        iconPrimaryHoverColor,
        iconSecondaryColor,
        iconSecondaryHoverColor,
        iconColorType,
        iconPadding,
    } = blockDefaults;

    const isDefaultSet = useBlockDefaults(name, blockDefaults, setBlockDefaults, objAttributes)

    return (
        <>
            {isDefaultSet && (
                <div className="eb-panel-control">
                    <PanelBody
                        title={__("Icon Settings", "essential-blocks")}
                        initialOpen={true}
                    >
                        <EBIconPicker
                            value={icon}
                            onChange={(icon) => handleBlockDefault({ icon })}
                        />
                        <BaseControl label={__("Alignment", "essential-blocks")}>
                            <ButtonGroup>
                                {ICON_ALIGN.map((item, index) => (
                                    <Button
                                        key={index}
                                        isPrimary={iconAlign === item.value}
                                        isSecondary={iconAlign !== item.value}
                                        onClick={() =>
                                            handleBlockDefault({
                                                iconAlign: item.value,
                                            })
                                        }
                                    >
                                        {item.label}
                                    </Button>
                                ))}
                            </ButtonGroup>
                        </BaseControl>
                        <SelectControl
                            label={__("Icon View", "essential-blocks")}
                            value={iconView}
                            options={SHAPE_VIEW}
                            onChange={(iconView) =>
                                handleBlockDefault({
                                    iconView,
                                })
                            }
                        />
                        {iconView !== "default" && (
                            <SelectControl
                                label={__("Icon Shape", "essential-blocks")}
                                value={iconShape}
                                options={ICON_SHAPE}
                                onChange={(iconShape) =>
                                    handleBlockDefault({
                                        iconShape,
                                    })
                                }
                            />
                        )}
                    </PanelBody>
                    <PanelBody
                        title={__("Icon Style", "essential-blocks")}
                        initialOpen={false}
                    >
                        <BaseControl>
                            <ButtonGroup>
                                {NORMAL_HOVER.map((item, index) => (
                                    <Button
                                        key={index}
                                        isPrimary={iconColorType === item.value}
                                        isSecondary={iconColorType !== item.value}
                                        onClick={() =>
                                            handleBlockDefault({
                                                iconColorType: item.value,
                                            })
                                        }
                                    >
                                        {item.label}
                                    </Button>
                                ))}
                            </ButtonGroup>
                        </BaseControl>
                        {iconColorType === "normal" && (
                            <ColorControl
                                label={__("Primary Color", "essential-blocks")}
                                color={iconPrimaryColor}
                                onChange={(iconPrimaryColor) =>
                                    handleBlockDefault({
                                        iconPrimaryColor,
                                    })
                                }
                            />
                        )}
                        {iconColorType === "hover" && (
                            <ColorControl
                                label={__("Primary Hover Color", "essential-blocks")}
                                color={iconPrimaryHoverColor}
                                onChange={(iconPrimaryHoverColor) =>
                                    handleBlockDefault({
                                        iconPrimaryHoverColor,
                                    })
                                }
                            />
                        )}
                        {iconView !== "default" && iconColorType === "normal" && (
                            <ColorControl
                                label={__("Secondary Color", "essential-blocks")}
                                color={iconSecondaryColor}
                                onChange={(iconSecondaryColor) =>
                                    handleBlockDefault({
                                        iconSecondaryColor,
                                    })
                                }
                            />
                        )}
                        {iconView !== "default" && iconColorType === "hover" && (
                            <ColorControl
                                label={__("Secondary Hover Color", "essential-blocks")}
                                color={iconSecondaryHoverColor}
                                onChange={(iconSecondaryHoverColor) =>
                                    handleBlockDefault({
                                        iconSecondaryHoverColor,
                                    })
                                }
                            />
                        )}
                        <ResponsiveRangeController
                            baseLabel={__("Icon Size", "essential-blocks")}
                            controlName={ICON_SIZE}
                            min={10}
                            max={400}
                            step={1}
                        />
                        <RangeControl
                            label={__("Padding", "essential-blocks")}
                            value={iconPadding}
                            onChange={(iconPadding) =>
                                handleBlockDefault({
                                    iconPadding,
                                })
                            }
                            min={0}
                            max={100}
                            step={1}
                            allowReset={true}
                        />
                        {iconView === "framed" && (
                            <ResponsiveDimensionsControl
                                controlName={BORDER_WIDTH}
                                baseLabel={__("Border Width", "essential-blocks")}
                            />
                        )}
                        <ResponsiveDimensionsControl
                            forBorderRadius
                            controlName={BORDER}
                            baseLabel={__("Border Radius", "essential-blocks")}
                        />
                    </PanelBody>
                    <PanelBody
                        title={__("Margin & Padding", "essential-blocks")}
                        initialOpen={false}
                    >
                        <ResponsiveDimensionsControl
                            controlName={WRAPPER_MARGIN}
                            baseLabel={__("Margin", "essential-blocks")}
                        />
                        <ResponsiveDimensionsControl
                            controlName={WRAPPER_PADDING}
                            baseLabel={__("Padding", "essential-blocks")}
                        />
                    </PanelBody>
                    <PanelBody
                        title={__("Background", "essential-blocks")}
                        initialOpen={false}
                    >
                        <BackgroundControl
                            controlName={WRAPPER_BG}
                        />
                    </PanelBody>
                    <PanelBody
                        title={__("Border & Shadow", "essential-blocks")}
                        initialOpen={false}
                    >
                        <BorderShadowControl
                            controlName={WRAPPER_BORDER_SHADOW}
                        />
                    </PanelBody>
                </div>
            )}
        </>
    );
}

export default withBlockContext(objAttributes)(Icon);
