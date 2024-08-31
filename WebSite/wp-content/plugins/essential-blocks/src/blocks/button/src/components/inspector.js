/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
    Button,
    ButtonGroup,
    BaseControl,
    ToggleControl,
    SelectControl,
    RangeControl,
    __experimentalDivider as Divider,
} from "@wordpress/components";

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
} from "./constants";
import { typoPrefix_text } from "./typographyContants";

import objAttributes from "./attributes";

import {
    ColorControl,
    ResponsiveRangeController,
    ResponsiveDimensionsControl,
    TypographyDropdown,
    BackgroundControl,
    BorderShadowControl,
    DynamicInputControl,
    EBIconPicker,
    InspectorPanel
} from "@essential-blocks/controls";

const Inspector = ({ attributes, setAttributes }) => {
    const {
        resOption,
        buttonText,
        buttonURL,
        newWindow,
        addNofollow,
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
    } = attributes;

    const changeType = (type) => {
        setAttributes({ type });
        switch (type) {
            case "default":
                setAttributes({
                    textColor: "#ffffff",
                    hoverTextColor: "#ffffff",
                    btnBackbackgroundColor: "rgba(121, 103, 255,1)",
                    hov_btnBackbackgroundColor: "rgba(81, 63, 212,1)",
                });
                break;
            case "info":
                setAttributes({
                    textColor: "#000000",
                    hoverTextColor: "#000000",
                    btnBackbackgroundColor: "rgba(13, 202, 240,1)",
                    hov_btnBackbackgroundColor: "rgba(13, 180, 214,1)",
                });
                break;
            case "success":
                setAttributes({
                    textColor: "#ffffff",
                    hoverTextColor: "#ffffff",
                    btnBackbackgroundColor: "rgba(25, 135, 84,1)",
                    hov_btnBackbackgroundColor: "rgba(20, 108, 67,1)",
                });
                break;
            case "warning":
                setAttributes({
                    textColor: "#000000",
                    hoverTextColor: "#000000",
                    btnBackbackgroundColor: "rgba(255, 193, 7,1)",
                    hov_btnBackbackgroundColor: "rgba(224, 170, 10,1)",
                });
                break;
            case "danger":
                setAttributes({
                    textColor: "#ffffff",
                    hoverTextColor: "#ffffff",
                    btnBackbackgroundColor: "rgba(220, 53, 69,1)",
                    hov_btnBackbackgroundColor: "rgba(176, 42, 55,1)",
                });
                break;
            default:
                return false;
        }
    };

    return (
        <InspectorPanel advancedControlProps={{
            marginPrefix: WRAPPER_MARGIN,
            hasMargin: true,
            hasPadding: false,
            hasBackground: false,
            hasBorder: false
        }}>
            <InspectorPanel.General>
                <>
                    <InspectorPanel.PanelBody
                        title={__(
                            "General",
                            "essential-blocks"
                        )}
                        initialOpen={true}
                    >
                        <SelectControl
                            label={__(
                                "Type",
                                "essential-blocks"
                            )}
                            value={type}
                            options={LAYOUT_TYPES}
                            onChange={(type) =>
                                changeType(type)
                            }
                        />
                        <DynamicInputControl
                            label={__("Button Text", "essential-blocks")}
                            attrName="buttonText"
                            inputValue={buttonText}
                            setAttributes={setAttributes}
                            onChange={(text) => setAttributes({ buttonText: text })}
                        />
                        <DynamicInputControl
                            label={__("URL", "essential-blocks")}
                            attrName="buttonURL"
                            inputValue={buttonURL}
                            setAttributes={setAttributes}
                            onChange={(text) => setAttributes({ buttonURL: text })}
                        />
                        {buttonURL && (
                            <>
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
                                <ToggleControl
                                    label={__(
                                        "Add nofollow",
                                        "essential-blocks"
                                    )}
                                    checked={addNofollow}
                                    onChange={() =>
                                        setAttributes({
                                            addNofollow: !addNofollow,
                                        })
                                    }
                                />
                            </>
                        )}
                        <BaseControl
                            label={__(
                                "Alignment",
                                "essential-blocks"
                            )}
                        >
                            <ButtonGroup id="eb-button-group-alignment">
                                {CONTENT_POSITION.map(
                                    (item, index) => (
                                        <Button
                                            key={index}
                                            isPrimary={
                                                buttonAlign ===
                                                item.value
                                            }
                                            isSecondary={
                                                buttonAlign !==
                                                item.value
                                            }
                                            onClick={() =>
                                                setAttributes({
                                                    buttonAlign:
                                                        item.value,
                                                })
                                            }
                                        >
                                            {item.label}
                                        </Button>
                                    )
                                )}
                            </ButtonGroup>
                        </BaseControl>
                        <BaseControl
                            label={__(
                                "Width",
                                "essential-blocks"
                            )}
                        >
                            <ButtonGroup id="eb-button-group-alignment">
                                {BUTTON_WIDTH.map(
                                    (item, index) => (
                                        <Button
                                            key={index}
                                            isPrimary={
                                                buttonWidth ===
                                                item.value
                                            }
                                            isSecondary={
                                                buttonWidth !==
                                                item.value
                                            }
                                            onClick={() =>
                                                setAttributes({
                                                    buttonWidth:
                                                        item.value,
                                                })
                                            }
                                        >
                                            {item.label}
                                        </Button>
                                    )
                                )}
                            </ButtonGroup>
                        </BaseControl>
                        {buttonWidth === "fixed" && (
                            <ResponsiveRangeController
                                baseLabel={__(
                                    "Fixed Width",
                                    "essential-blocks"
                                )}
                                controlName={FIXED_WIDTH}
                                min={100}
                                max={900}
                                step={1}
                            />
                        )}
                    </InspectorPanel.PanelBody>
                    <InspectorPanel.PanelBody
                        title={__("Icon", "essential-blocks")}
                        initialOpen={false}
                    >
                        <ToggleControl
                            label={__(
                                "Add icon",
                                "essential-blocks"
                            )}
                            checked={addIcon}
                            onChange={() =>
                                setAttributes({
                                    addIcon: !addIcon,
                                })
                            }
                        />
                        {addIcon && (
                            <>
                                <EBIconPicker
                                    value={icon}
                                    attributeName={'icon'}
                                />
                                <BaseControl
                                    label={__(
                                        "Icon Postion",
                                        "essential-blocks"
                                    )}
                                >
                                    <ButtonGroup id="eb-button-group-alignment">
                                        {ICON_POSITION.map(
                                            (item, index) => (
                                                <Button
                                                    key={index}
                                                    isPrimary={
                                                        iconPosition ===
                                                        item.value
                                                    }
                                                    isSecondary={
                                                        iconPosition !==
                                                        item.value
                                                    }
                                                    onClick={() =>
                                                        setAttributes(
                                                            {
                                                                iconPosition:
                                                                    item.value,
                                                            }
                                                        )
                                                    }
                                                >
                                                    {item.label}
                                                </Button>
                                            )
                                        )}
                                    </ButtonGroup>
                                </BaseControl>
                                <ResponsiveRangeController
                                    baseLabel={__(
                                        "Size",
                                        "essential-blocks"
                                    )}
                                    controlName={ICON_SIZE}
                                    noUnits={true}
                                />
                                <ResponsiveRangeController
                                    baseLabel={__(
                                        "Gap",
                                        "essential-blocks"
                                    )}
                                    controlName={ICON_SPACE}
                                    noUnits={true}
                                />
                            </>
                        )}
                    </InspectorPanel.PanelBody>
                </>
            </InspectorPanel.General>
            <InspectorPanel.Style>
                <InspectorPanel.PanelBody
                    title={__("Styles", "essential-blocks")}
                    initialOpen={true}
                >
                    <>
                        <TypographyDropdown
                            baseLabel={__(
                                "Typography",
                                "essential-blocks"
                            )}
                            typographyPrefixConstant={
                                typoPrefix_text
                            }
                        />
                        <ColorControl
                            label={__(
                                "Text Color",
                                "essential-blocks"
                            )}
                            color={textColor}
                            attributeName={'textColor'}
                        />
                        <ColorControl
                            label={__(
                                "Text Hover Color",
                                "essential-blocks"
                            )}
                            color={hoverTextColor}
                            attributeName={'hoverTextColor'}
                        />
                        <Divider />
                        <BaseControl>
                            <h3 className="eb-control-title">
                                {__(
                                    "Background",
                                    "essential-blocks"
                                )}
                            </h3>
                        </BaseControl>
                        <BackgroundControl
                            controlName={BUTTON_BACKGROUND}
                            noOverlay={true}
                            noMainBgi={true}
                        />
                        <Divider />
                        <BaseControl>
                            <h3 className="eb-control-title">
                                {__(
                                    "Border",
                                    "essential-blocks"
                                )}
                            </h3>
                        </BaseControl>
                        <BorderShadowControl
                            controlName={BUTTON_BORDER}
                        />
                        <ResponsiveDimensionsControl
                            controlName={BUTTON_PADDING}
                            baseLabel={__(
                                "Padding",
                                "essential-blocks"
                            )}
                        />

                        <InspectorPanel.PanelBody
                            title={__("Hover Effect", "essential-blocks")}
                            initialOpen={true}
                        >
                            <SelectControl
                                label={__(
                                    "Hover Effect",
                                    "essential-blocks"
                                )}
                                value={hoverEffect}
                                options={HOVER_EFFECT}
                                onChange={(newHoverEffect) =>
                                    setAttributes({
                                        hoverEffect: newHoverEffect,
                                    })
                                }
                            />
                            {hoverEffect && (
                                <RangeControl
                                    label={__(
                                        "Hover Transition",
                                        "essential-blocks"
                                    )}
                                    value={hoverTransition}
                                    onChange={(hoverTransition) =>
                                        setAttributes({
                                            hoverTransition,
                                        })
                                    }
                                    step={0.01}
                                    min={0}
                                    max={5}
                                />
                            )}
                        </InspectorPanel.PanelBody>
                    </>
                </InspectorPanel.PanelBody>
            </InspectorPanel.Style>
        </InspectorPanel>
    );
};

export default Inspector;
