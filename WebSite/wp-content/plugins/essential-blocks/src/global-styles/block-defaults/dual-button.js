/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useEffect, useState } from "@wordpress/element";
import {
    PanelBody,
    SelectControl,
    ToggleControl,
    TextControl,
    BaseControl,
    __experimentalToggleGroupControl as ToggleGroupControl,
    __experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from "@wordpress/components";

import {
    ColorControl,
    ResponsiveDimensionsControl,
    TypographyDropdown,
    BorderShadowControl,
    ResponsiveRangeController,
    BackgroundControl,
    EBIconPicker,
    useBlockDefaults,
    withBlockContext
} from "@essential-blocks/controls";

/**
 * Internal depencencies
 */
import {
    NORMAL_HOVER,
    UNIT_TYPES,
    BUTTON_ONE_BACKGROUND,
    BUTTON_TWO_BACKGROUND,
    BUTTON_ONE_BORDER_SHADOW,
    BUTTON_TWO_BORDER_SHADOW,
    WRAPPER_MARGIN,
    BUTTONS_PADDING,
    BUTTONS_WIDTH,
    BUTTONS_GAP,
    CONNECTOR_TYPE,
    BUTTONS_CONNECTOR_SIZE,
    TEXT_ALIGN,
    CONTENT_POSITION,
    BUTTONS_CONNECTOR_ICON_SIZE,
    BUTTON_WIDTH_TYPE,
    BUTTONS_MARGIN,
} from "@essential-blocks/blocks/dual-button/src/constants/constants";

import {
    BUTTONS_TYPOGRAPHY,
    BUTTONS_CONNECTOR_TYPOGRAPHY,
} from "@essential-blocks/blocks/dual-button/src/constants/typographyPrefixConstants";

import objAttributes from "@essential-blocks/blocks/dual-button/src/attributes";

function DualButton(props) {
    const { blockDefaults, setBlockDefaults, name, deviceType, handleBlockDefault } = props;

    const {
        contentPosition,
        textOneColor,
        hoverTextOneColor,
        textTwoColor,
        hoverTextTwoColor,
        buttonTextOne,
        buttonURLOne,
        buttonTextTwo,
        buttonURLTwo,
        innerButtonText,
        innerButtonColor,
        innerButtonTextColor,
        innerButtonIcon,
        showConnector,
        connectorType,
        buttonsColorType,
        buttonTextAlign,
        buttonsWidthType,
        buttonOneNewWindow,
        buttonTwoNewWindow,
    } = blockDefaults;
    const isDefaultSet = useBlockDefaults(name, blockDefaults, setBlockDefaults, objAttributes)

    return (
        <>
            {isDefaultSet && (
                <div className="eb-panel-control">
                    {/*  General */}
                    <PanelBody title={__("General", "essential-blocks")} initialOpen={true}>
                        <ToggleGroupControl
                            label={__("Alignment", "essential-blocks")}

                            value={contentPosition}
                            onChange={(value) =>
                                handleBlockDefault({
                                    contentPosition: value,
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
                        <TextControl
                            label={__("Button One Text", "essential-blocks")}
                            value={buttonTextOne}
                            onChange={(text) => handleBlockDefault({ buttonTextOne: text })}
                            __next40pxDefaultSize
                            __nextHasNoMarginBottom
                        />

                        {buttonURLOne && (
                            <ToggleControl
                                label={__("Open in New Tab", "essential-blocks")}
                                checked={buttonOneNewWindow}
                                onChange={() =>
                                    handleBlockDefault({
                                        buttonOneNewWindow: !buttonOneNewWindow,
                                    })
                                }
                                __nextHasNoMarginBottom
                            />
                        )}

                        <TextControl
                            label={__("Button Two Text", "essential-blocks")}
                            value={buttonTextTwo}
                            onChange={(text) => handleBlockDefault({ buttonTextTwo: text })}
                            __next40pxDefaultSize
                            __nextHasNoMarginBottom
                        />

                        {buttonURLTwo && (
                            <ToggleControl
                                label={__("Open in New Tab", "essential-blocks")}
                                checked={buttonTwoNewWindow}
                                onChange={() =>
                                    handleBlockDefault({
                                        buttonTwoNewWindow: !buttonTwoNewWindow,
                                    })
                                }
                                __nextHasNoMarginBottom
                            />
                        )}
                    </PanelBody>
                    <PanelBody title={__("Buttons Settings", "essential-blocks")} initialOpen={true}>
                        <BaseControl label={__("Button Width Type", "essential-blocks")} __nextHasNoMarginBottom>
                            <SelectControl
                                value={buttonsWidthType}
                                options={BUTTON_WIDTH_TYPE}
                                onChange={(value) => {
                                    handleBlockDefault({
                                        buttonsWidthType: value,
                                    });
                                }}
                                __next40pxDefaultSize
                                __nextHasNoMarginBottom
                            />
                        </BaseControl>
                        {buttonsWidthType === "custom" && (
                            <ResponsiveRangeController
                                baseLabel={__("Buttons Width", "essential-blocks")}
                                controlName={BUTTONS_WIDTH}
                                units={UNIT_TYPES}
                                min={0}
                                max={500}
                                step={1}
                            />
                        )}

                        <ResponsiveRangeController
                            baseLabel={__("Buttons Gap", "essential-blocks")}
                            controlName={BUTTONS_GAP}
                            units={UNIT_TYPES}
                            min={0}
                            max={100}
                            step={1}
                        />

                        <ToggleGroupControl
                            label={__("Text Align", "essential-blocks")}

                            value={buttonTextAlign}
                            onChange={(value) =>
                                handleBlockDefault({
                                    buttonTextAlign: value,
                                })
                            }
                            isBlock
                            __next40pxDefaultSize
                            __nextHasNoMarginBottom
                        >
                            {TEXT_ALIGN.map((item, index) => (
                                <ToggleGroupControlOption
                                    key={index}
                                    value={item.value}
                                    label={item.label}
                                />
                            ))}
                        </ToggleGroupControl>
                    </PanelBody>
                    <PanelBody title={__("Connector Settings", "essential-blocks")} initialOpen={true}>
                        <ToggleControl
                            label={__("Show Connector?")}
                            checked={showConnector}
                            onChange={() => {
                                handleBlockDefault({
                                    showConnector: !showConnector,
                                });
                            }}
                            __nextHasNoMarginBottom
                        />
                        {showConnector && (
                            <>
                                <ToggleGroupControl
                                    label={__("Connector Type", "essential-blocks")}

                                    value={connectorType}
                                    onChange={(value) =>
                                        handleBlockDefault({
                                            connectorType: value,
                                        })
                                    }
                                    isBlock
                                    __next40pxDefaultSize
                                    __nextHasNoMarginBottom
                                >
                                    {CONNECTOR_TYPE.map((item, index) => (
                                        <ToggleGroupControlOption
                                            key={index}
                                            value={item.value}
                                            label={item.label}
                                        />
                                    ))}
                                </ToggleGroupControl>

                                {connectorType === "icon" && (
                                    <PanelBody title={__("Icon Settings", "essential-blocks")} initialOpen={true}>
                                        <EBIconPicker
                                            value={innerButtonIcon}
                                            onChange={(icon) =>
                                                handleBlockDefault({
                                                    innerButtonIcon: icon,
                                                })
                                            }
                                            title={__("Icon", "essential-blocks")}
                                        />
                                        <ResponsiveRangeController
                                            baseLabel={__("Icon Size", "essential-blocks")}
                                            controlName={BUTTONS_CONNECTOR_ICON_SIZE}
                                            units={UNIT_TYPES}
                                            min={0}
                                            max={100}
                                            step={1}
                                        />
                                    </PanelBody>
                                )}

                                {connectorType === "text" && (
                                    <TextControl
                                        label={__("Text", "essential-blocks")}
                                        value={innerButtonText}
                                        onChange={(text) =>
                                            handleBlockDefault({
                                                innerButtonText: text,
                                            })
                                        }
                                        __next40pxDefaultSize
                                        __nextHasNoMarginBottom
                                    />
                                )}

                                <ResponsiveRangeController
                                    baseLabel={__("Connector Size", "essential-blocks")}
                                    controlName={BUTTONS_CONNECTOR_SIZE}
                                    units={UNIT_TYPES}
                                    min={0}
                                    max={100}
                                    step={1}
                                />
                            </>
                        )}
                    </PanelBody>
                    {/*  styles */}
                    <PanelBody title={__("Buttons Styles", "essential-blocks")} initialOpen={true}>
                        <TypographyDropdown
                            baseLabel={__("Typography", "essential-blocks")}
                            typographyPrefixConstant={BUTTONS_TYPOGRAPHY}
                        />

                        <BaseControl __nextHasNoMarginBottom>
                            <h3 className="eb-control-title">{__("Button One Background", "essential-blocks")}</h3>
                        </BaseControl>
                        <BackgroundControl
                            controlName={BUTTON_ONE_BACKGROUND}
                            noOverlay={true}
                            noMainBgi={true}
                        />

                        <BaseControl __nextHasNoMarginBottom>
                            <h3 className="eb-control-title">{__("Button Two Background", "essential-blocks")}</h3>
                        </BaseControl>
                        <BackgroundControl
                            controlName={BUTTON_TWO_BACKGROUND}
                            noOverlay={true}
                            noMainBgi={true}
                        />

                        <ToggleGroupControl
                            label={__("Text Color", "essential-blocks")}
                            className="eb-inspector-btn-group newtogglegroupcontrol"
                            value={buttonsColorType}
                            onChange={(value) =>
                                handleBlockDefault({
                                    buttonsColorType: value,
                                })
                            }
                            isBlock
                            __next40pxDefaultSize
                            __nextHasNoMarginBottom
                        >
                            {NORMAL_HOVER.map((item, index) => (
                                <ToggleGroupControlOption
                                    key={index}
                                    value={item.value}
                                    label={item.label}
                                />
                            ))}
                        </ToggleGroupControl>

                        {buttonsColorType === "normal" && (
                            <>
                                <ColorControl
                                    label={__("Button One", "essential-blocks")}
                                    color={textOneColor}
                                    onChange={(newColor) =>
                                        handleBlockDefault({
                                            textOneColor: newColor,
                                        })
                                    }
                                />
                                <ColorControl
                                    label={__("Button Two", "essential-blocks")}
                                    color={textTwoColor}
                                    onChange={(newColor) =>
                                        handleBlockDefault({
                                            textTwoColor: newColor,
                                        })
                                    }
                                />
                            </>
                        )}

                        {buttonsColorType === "hover" && (
                            <>
                                <ColorControl
                                    label={__("Button One Hover", "essential-blocks")}
                                    color={hoverTextOneColor}
                                    onChange={(newColor) =>
                                        handleBlockDefault({
                                            hoverTextOneColor: newColor,
                                        })
                                    }
                                />
                                <ColorControl
                                    label={__("Button Two Hover", "essential-blocks")}
                                    color={hoverTextTwoColor}
                                    onChange={(newColor) =>
                                        handleBlockDefault({
                                            hoverTextTwoColor: newColor,
                                        })
                                    }
                                />
                            </>
                        )}

                        <PanelBody
                            className={"eb-subpanel"}
                            title={__("Button One Border", "essential-blocks")}
                            initialOpen={true}
                        >
                            <BorderShadowControl
                                controlName={BUTTON_ONE_BORDER_SHADOW}
                                noShadow
                            />
                        </PanelBody>

                        <PanelBody
                            className={"eb-subpanel"}
                            title={__("Button Two Border", "essential-blocks")}
                            initialOpen={true}
                        >
                            <BorderShadowControl
                                controlName={BUTTON_TWO_BORDER_SHADOW}
                                noShadow
                            />
                        </PanelBody>

                        <ResponsiveDimensionsControl
                            controlName={BUTTONS_PADDING}
                            baseLabel="Padding"
                        />
                    </PanelBody>
                    <PanelBody title={__("Connector Styles", "essential-blocks")} initialOpen={false}>
                        <TypographyDropdown
                            baseLabel={__("Typography", "essential-blocks")}
                            typographyPrefixConstant={BUTTONS_CONNECTOR_TYPOGRAPHY}
                        />

                        <ColorControl
                            label={__("Background Color", "essential-blocks")}
                            color={innerButtonColor}
                            onChange={(innerButtonColor) => handleBlockDefault({ innerButtonColor })}
                        />

                        <ColorControl
                            label={__("Text/ Icon Color")}
                            color={innerButtonTextColor}
                            onChange={(innerButtonTextColor) => handleBlockDefault({ innerButtonTextColor })}
                        />
                    </PanelBody>
                    {/*  advance */}
                    <PanelBody title={__("Wrapper Margin", "essential-blocks")} initialOpen={true}>
                        <ResponsiveDimensionsControl
                            controlName={WRAPPER_MARGIN}
                            baseLabel="Margin"
                        />
                    </PanelBody>
                </div>
            )}
        </>
    );
}

export default withBlockContext(objAttributes)(DualButton);
