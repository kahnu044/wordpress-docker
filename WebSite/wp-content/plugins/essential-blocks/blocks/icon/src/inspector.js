/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { InspectorControls, PanelColorSettings } from "@wordpress/block-editor";
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
 * External depencencies
 */
import FontIconPicker from "@fonticonpicker/react-fonticonpicker";

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

const {
    faIcons,
    ResponsiveDimensionsControl,
    TypographyDropdown,
    BorderShadowControl,
    ResponsiveRangeController,
    BackgroundControl,
    ColorControl,
    AdvancedControls,
} = window.EBControls;

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

    const resRequiredProps = {
        setAttributes,
        resOption,
        attributes,
        objAttributes,
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
                                            "General",
                                            "essential-blocks"
                                        )}
                                        initialOpen={true}
                                    >
                                        <BaseControl
                                            label={__(
                                                "Icon",
                                                "essential-blocks"
                                            )}
                                        >
                                            <FontIconPicker
                                                icons={faIcons}
                                                value={icon}
                                                onChange={(value) =>
                                                    setAttributes({
                                                        icon: value,
                                                    })
                                                }
                                                appendTo="body"
                                            />
                                        </BaseControl>
                                        <SelectControl
                                            label={__(
                                                "Icon View",
                                                "essential-blocks"
                                            )}
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
                                                label={__(
                                                    "Icon Shape",
                                                    "essential-blocks"
                                                )}
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
                                            label={__(
                                                "Alignment",
                                                "essential-blocks"
                                            )}
                                            id="eb-advance-heading-alignment"
                                        >
                                            <ButtonGroup id="eb-advance-heading-alignment">
                                                {ICON_ALIGN.map((item, key) => (
                                                    <Button
                                                        key={key}
                                                        // isLarge
                                                        isPrimary={
                                                            iconAlign ===
                                                            item.value
                                                        }
                                                        isSecondary={
                                                            iconAlign !==
                                                            item.value
                                                        }
                                                        onClick={() =>
                                                            setAttributes({
                                                                iconAlign:
                                                                    item.value,
                                                            })
                                                        }
                                                    >
                                                        {item.label}
                                                    </Button>
                                                ))}
                                            </ButtonGroup>
                                        </BaseControl>
                                    </PanelBody>
                                </>
                            )}

                            {tab.name === "styles" && (
                                <>
                                    <PanelBody>
                                        <ButtonGroup className="eb-inspector-btn-group">
                                            {NORMAL_HOVER.map((item, key) => (
                                                <Button
                                                    key={key}
                                                    // isLarge
                                                    isPrimary={
                                                        iconColorType ===
                                                        item.value
                                                    }
                                                    isSecondary={
                                                        iconColorType !==
                                                        item.value
                                                    }
                                                    onClick={() =>
                                                        setAttributes({
                                                            iconColorType:
                                                                item.value,
                                                        })
                                                    }
                                                >
                                                    {item.label}
                                                </Button>
                                            ))}
                                        </ButtonGroup>
                                        {iconColorType === "normal" && (
                                            <>
                                                <PanelColorSettings
                                                    className={"eb-subpanel"}
                                                    title={__(
                                                        "Primary Color",
                                                        "essential-blocks"
                                                    )}
                                                    initialOpen={true}
                                                    colorSettings={[
                                                        {
                                                            value: iconPrimaryColor,
                                                            onChange: (
                                                                newColor
                                                            ) =>
                                                                setAttributes({
                                                                    iconPrimaryColor: newColor,
                                                                }),
                                                            label: __(
                                                                "Primary Color",
                                                                "essential-blocks"
                                                            ),
                                                        },
                                                    ]}
                                                />
                                                {iconView != "default" && (
                                                    <PanelColorSettings
                                                        className={
                                                            "eb-subpanel"
                                                        }
                                                        title={__(
                                                            "Secondary Color",
                                                            "essential-blocks"
                                                        )}
                                                        initialOpen={true}
                                                        colorSettings={[
                                                            {
                                                                value: iconSecondaryColor,
                                                                onChange: (
                                                                    newColor
                                                                ) =>
                                                                    setAttributes(
                                                                        {
                                                                            iconSecondaryColor: newColor,
                                                                        }
                                                                    ),
                                                                label: __(
                                                                    "Secondary Color",
                                                                    "essential-blocks"
                                                                ),
                                                            },
                                                        ]}
                                                    />
                                                )}
                                            </>
                                        )}
                                        {iconColorType === "hover" && (
                                            <>
                                                <PanelColorSettings
                                                    className={"eb-subpanel"}
                                                    title={__(
                                                        "Primary Color",
                                                        "essential-blocks"
                                                    )}
                                                    initialOpen={true}
                                                    colorSettings={[
                                                        {
                                                            value: iconPrimaryHoverColor,
                                                            onChange: (
                                                                newColor
                                                            ) =>
                                                                setAttributes({
                                                                    iconPrimaryHoverColor: newColor,
                                                                }),
                                                            label: __(
                                                                "Primary Color",
                                                                "essential-blocks"
                                                            ),
                                                        },
                                                    ]}
                                                />
                                                {iconView != "default" && (
                                                    <PanelColorSettings
                                                        className={
                                                            "eb-subpanel"
                                                        }
                                                        title={__(
                                                            "Secondary Color",
                                                            "essential-blocks"
                                                        )}
                                                        initialOpen={true}
                                                        colorSettings={[
                                                            {
                                                                value: iconSecondaryHoverColor,
                                                                onChange: (
                                                                    newColor
                                                                ) =>
                                                                    setAttributes(
                                                                        {
                                                                            iconSecondaryHoverColor: newColor,
                                                                        }
                                                                    ),
                                                                label: __(
                                                                    "Secondary Color",
                                                                    "essential-blocks"
                                                                ),
                                                            },
                                                        ]}
                                                    />
                                                )}
                                            </>
                                        )}
                                        <ResponsiveRangeController
                                            baseLabel={__(
                                                "Icon Size",
                                                "essential-blocks"
                                            )}
                                            controlName={ICON_SIZE}
                                            resRequiredProps={resRequiredProps}
                                            min={10}
                                            max={400}
                                            step={1}
                                        />
                                        <RangeControl
                                            label={__(
                                                "Padding",
                                                "essential-blocks"
                                            )}
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
                                                resRequiredProps={
                                                    resRequiredProps
                                                }
                                                controlName={BORDER_WIDTH}
                                                baseLabel="Border Width"
                                            />
                                        )}
                                        <ResponsiveDimensionsControl
                                            forBorderRadius
                                            resRequiredProps={resRequiredProps}
                                            controlName={BORDER}
                                            baseLabel="Border Radius"
                                        />
                                    </PanelBody>
                                </>
                            )}

                            {tab.name === "advance" && (
                                <>
                                    <PanelBody>
                                        <ResponsiveDimensionsControl
                                            resRequiredProps={resRequiredProps}
                                            controlName={WRAPPER_MARGIN}
                                            baseLabel="Margin"
                                        />
                                        <ResponsiveDimensionsControl
                                            resRequiredProps={resRequiredProps}
                                            controlName={WRAPPER_PADDING}
                                            baseLabel="Padding"
                                        />
                                    </PanelBody>
                                    <PanelBody
                                        title={__(
                                            "Background",
                                            "essential-blocks"
                                        )}
                                        initialOpen={false}
                                    >
                                        <BackgroundControl
                                            controlName={WRAPPER_BG}
                                            resRequiredProps={resRequiredProps}
                                        />
                                    </PanelBody>
                                    <PanelBody
                                        title={__("Border & Shadow")}
                                        initialOpen={false}
                                    >
                                        <BorderShadowControl
                                            controlName={WRAPPER_BORDER_SHADOW}
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
