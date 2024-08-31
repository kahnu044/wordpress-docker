/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { InspectorControls } from "@wordpress/block-editor";
import {
    PanelBody,
    Button,
    ButtonGroup,
    BaseControl,
    TabPanel,
    SelectControl,
    RangeControl,
} from "@wordpress/components";

/**
 * Internal depencencies
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
} from "./constants";

import {
    ResponsiveDimensionsControl,
    ResponsiveRangeController,
    ColorControl,
    EBIconPicker,
    InspectorPanel
} from "@essential-blocks/controls";

import objAttributes from "./attributes";

function Inspector(props) {
    const { attributes, setAttributes } = props;
    const {
        resOption,
        icon,
        iconAlign,
        iconPrimaryColor,
        iconPrimaryHoverColor,
        iconSecondaryColor,
        iconSecondaryHoverColor,
        iconShape,
        iconView,
        iconPadding,
        iconColorType,
    } = attributes;

    return (
        <InspectorPanel advancedControlProps={{
            marginPrefix: WRAPPER_MARGIN,
            paddingPrefix: WRAPPER_PADDING,
            backgroundPrefix: WRAPPER_BG,
            borderPrefix: WRAPPER_BORDER_SHADOW,
            hasMargin: true
        }}>
            <InspectorPanel.General>
                <InspectorPanel.PanelBody title={__("General", "essential-blocks")} initialOpen={true}>
                    <EBIconPicker
                        value={icon}
                        attributeName={'icon'}
                    />
                    <SelectControl
                        label={__("Icon View", "essential-blocks")}
                        value={iconView}
                        options={SHAPE_VIEW}
                        onChange={(newIconView) =>
                            setAttributes({
                                iconView: newIconView,
                            })
                        }
                    />
                    {iconView !== "default" && (
                        <SelectControl
                            label={__("Icon Shape", "essential-blocks")}
                            value={iconShape}
                            options={ICON_SHAPE}
                            onChange={(newIconShape) =>
                                setAttributes({
                                    iconShape: newIconShape,
                                })
                            }
                        />
                    )}
                    <BaseControl
                        label={__("Alignment", "essential-blocks")}
                        id="eb-advance-heading-alignment"
                    >
                        <ButtonGroup id="eb-advance-heading-alignment">
                            {ICON_ALIGN.map((item, key) => (
                                <Button
                                    key={key}
                                    // isLarge
                                    isPrimary={iconAlign === item.value}
                                    isSecondary={iconAlign !== item.value}
                                    onClick={() =>
                                        setAttributes({
                                            iconAlign: item.value,
                                        })
                                    }
                                >
                                    {item.label}
                                </Button>
                            ))}
                        </ButtonGroup>
                    </BaseControl>
                </InspectorPanel.PanelBody>
            </InspectorPanel.General>
            <InspectorPanel.Style>
                <InspectorPanel.PanelBody initialOpen={true}>
                    <ButtonGroup className="eb-inspector-btn-group">
                        {NORMAL_HOVER.map((item, key) => (
                            <Button
                                key={key}
                                // isLarge
                                isPrimary={iconColorType === item.value}
                                isSecondary={iconColorType !== item.value}
                                onClick={() =>
                                    setAttributes({
                                        iconColorType: item.value,
                                    })
                                }
                            >
                                {item.label}
                            </Button>
                        ))}
                    </ButtonGroup>
                    {iconColorType === "normal" && (
                        <>
                            <ColorControl
                                label={__("Primary Color", "essential-blocks")}
                                color={iconPrimaryColor}
                                attributeName={'iconPrimaryColor'}
                            />

                            {iconView != "default" && (
                                <ColorControl
                                    label={__("Secondary Color", "essential-blocks")}
                                    color={iconSecondaryColor}
                                    attributeName={'iconSecondaryColor'}
                                />
                            )}
                        </>
                    )}
                    {iconColorType === "hover" && (
                        <>
                            <ColorControl
                                label={__("Primary Color", "essential-blocks")}
                                color={iconPrimaryHoverColor}
                                attributeName={'iconPrimaryHoverColor'}
                            />

                            {iconView != "default" && (
                                <ColorControl
                                    label={__("Secondary Color", "essential-blocks")}
                                    color={iconSecondaryHoverColor}
                                    attributeName={'iconSecondaryHoverColor'}
                                />
                            )}
                        </>
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
                            setAttributes({
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
                            baseLabel={__("Border Width","essential-blocks")}
                        />
                    )}
                    <ResponsiveDimensionsControl
                        forBorderRadius
                        controlName={BORDER}
                        baseLabel={__("Border Radius","essential-blocks")}
                    />
                </InspectorPanel.PanelBody>
            </InspectorPanel.Style>
        </InspectorPanel>
    );
}

export default Inspector;
