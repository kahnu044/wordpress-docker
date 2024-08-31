/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
    PanelBody,
    BaseControl,
    ButtonGroup,
    Button,
    TextControl,
    SelectControl,
    ToggleControl,
    TabPanel,
    __experimentalDivider as Divider,
} from "@wordpress/components";

/**
 * Internal dependencies
 */
import {
    POPUP_WIDTH,
    POPUP_HEIGHT,
    ICON_POSITIONS,
    BUTTON_ALIGNMENT,
    BUTTON_BACKGROUND,
    BUTTON_BORDER,
    BUTTON_PADDING,
    POPUP_MARGIN,
    POPUP_PADDING,
    POPUP_BACKGROUND,
    POPUP_BORDER,
    CLOSE_PADDING,
    CLOSE_BORDER,
    CLOSE_BTN_LEFT,
    CLOSE_BTN_RIGHT,
    CLOSE_BTN_TOP,
    CONTAINER_PADDING,
    wrapMarginConst,
    wrapPaddingConst,
    HEIGHT_UNITS
} from "./constants";

import {
    ColorControl,
    TypographyDropdown,
    ResponsiveDimensionsControl,
    ResponsiveRangeController,
    BorderShadowControl,
    BackgroundControl,
    DynamicInputControl,
    EBIconPicker,
    InspectorPanel
} from "@essential-blocks/controls";

import {
    typoPrefix_text,
    typoPrefix_close,
} from "./constants/typographyPrefixConstants";

const Inspector = ({ attributes, setAttributes }) => {
    const {
        resOption,
        trigger,
        btnType,
        btnText,
        btnIcon,
        btnAlignment,
        triggerIcon,
        displayCloseIcon,
        escToExit,
        clickToExit,
        autoExit,
        autoExitTime,
        autoHeight,
        position,
        pageLoadDelay,
        eleIdentifier,
        btnTextColor,
        btnHoverTextColor,
        popupFullWidth,
        iconPosition,
        useCloseIcon,
        closeBtnText,
        closeBtnColor,
        closeBtnHoverColor,
        closeBtnBackColor,
        closeBtnBackHoverColor,
        overlayColor,
        useCookies,
        cookieExpireTime,
    } = attributes;

    return (
        <>
            <InspectorPanel advancedControlProps={{
                marginPrefix: wrapMarginConst,
                paddingPrefix: wrapPaddingConst,
                hasBackground: false,
                hasBorder: false,
                hasMargin: true
            }}>
                <InspectorPanel.General>
                    <InspectorPanel.PanelBody
                        title={__(
                            "Settings",
                            "essential-blocks"
                        )}
                        initialOpen={true}
                    >
                        <SelectControl
                            label={__(
                                "Trigger",
                                "essential-blocks"
                            )}
                            value={trigger}
                            options={[
                                {
                                    label: __(
                                        "Button Click",
                                        "essential-blocks"
                                    ),
                                    value: "btn_click",
                                },
                                {
                                    label: __(
                                        "Page Load",
                                        "essential-blocks"
                                    ),
                                    value: "page_load",
                                },
                                {
                                    label: __(
                                        "External Element",
                                        "essential-blocks"
                                    ),
                                    value: "external",
                                },
                                {
                                    label: __(
                                        "Exit Intent",
                                        "essential-blocks"
                                    ),
                                    value: "exit_intent",
                                }
                            ]}
                            onChange={(newTrigger) =>
                                setAttributes({
                                    trigger: newTrigger,
                                })
                            }
                        />
                        {"btn_click" === trigger && (
                            <>
                                <BaseControl
                                    label={__(
                                        "Button Settings",
                                        "essential-blocks"
                                    )}
                                >
                                    <SelectControl
                                        label={__(
                                            "Type",
                                            "essential-blocks"
                                        )}
                                        value={btnType}
                                        options={[
                                            {
                                                label: __(
                                                    "Button",
                                                    "essential-blocks"
                                                ),
                                                value: "button",
                                            },
                                            {
                                                label: __(
                                                    "Icon",
                                                    "essential-blocks"
                                                ),
                                                value: "icon",
                                            },
                                        ]}
                                        onChange={(
                                            newBtnType
                                        ) =>
                                            setAttributes({
                                                btnType: newBtnType,
                                            })
                                        }
                                    />
                                </BaseControl>
                                {"button" === btnType && (
                                    <>
                                        <DynamicInputControl
                                            label={__(
                                                "Button Text",
                                                "essential-blocks"
                                            )}
                                            attrName="btnText"
                                            inputValue={btnText}
                                            setAttributes={
                                                setAttributes
                                            }
                                            onChange={(
                                                newBtnText
                                            ) =>
                                                setAttributes({
                                                    btnText: newBtnText,
                                                })
                                            }
                                        />
                                        <EBIconPicker
                                            value={btnIcon}
                                            onChange={(icon) =>
                                                setAttributes({
                                                    btnIcon: icon,
                                                })
                                            }
                                            title={__("Button Icon", "essential-blocks")}
                                        />
                                        <BaseControl
                                            label={__(
                                                "Icon Position",
                                                "essential-blocks"
                                            )}
                                            id="eb-button-icon-position"
                                        >
                                            <ButtonGroup id="eb-icon-position-btgrp">
                                                {ICON_POSITIONS.map(
                                                    (
                                                        item,
                                                        key
                                                    ) => (
                                                        <Button
                                                            key={
                                                                key
                                                            }
                                                            isSecondary={
                                                                iconPosition !==
                                                                item.value
                                                            }
                                                            isPrimary={
                                                                iconPosition ===
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
                                                            {
                                                                item.label
                                                            }
                                                        </Button>
                                                    )
                                                )}
                                            </ButtonGroup>
                                        </BaseControl>
                                    </>
                                )}
                                {"icon" === btnType && (
                                    <>
                                        <EBIconPicker
                                            value={triggerIcon}
                                            onChange={(icon) =>
                                                setAttributes({
                                                    triggerIcon: icon,
                                                })
                                            }
                                            title={__("Trigger Icon", "essential-blocks")}
                                        />
                                    </>
                                )}
                                <BaseControl
                                    label={__(
                                        "Alignment ",
                                        "essential-blocks"
                                    )}
                                    id="eb-popup-button-alignment"
                                >
                                    <ButtonGroup>
                                        {BUTTON_ALIGNMENT.map(
                                            (item, key) => (
                                                <Button
                                                    key={key}
                                                    isSecondary={
                                                        btnAlignment !==
                                                        item.value
                                                    }
                                                    isPrimary={
                                                        btnAlignment ===
                                                        item.value
                                                    }
                                                    onClick={() =>
                                                        setAttributes(
                                                            {
                                                                btnAlignment:
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
                            </>
                        )}
                        {"page_load" === trigger && (
                            <>
                                <BaseControl>
                                    <h3>
                                        {__(
                                            "Page Load Settings",
                                            "essential-blocks"
                                        )}
                                    </h3>
                                </BaseControl>
                                <TextControl
                                    label={__(
                                        "Delay(Seconds)",
                                        "essential-blocks"
                                    )}
                                    value={pageLoadDelay}
                                    onChange={(
                                        newPageLoadDelay
                                    ) =>
                                        setAttributes({
                                            pageLoadDelay: newPageLoadDelay,
                                        })
                                    }
                                />
                                <ToggleControl
                                    label={__(
                                        "Use Cookies",
                                        "essential-blocks"
                                    )}
                                    checked={useCookies}
                                    onChange={() =>
                                        setAttributes({
                                            useCookies: !useCookies,
                                        })
                                    }
                                />
                                {useCookies && (
                                    <TextControl
                                        label={__(
                                            "Cookie Expire(In days)",
                                            "essential-blocks"
                                        )}
                                        value={cookieExpireTime}
                                        onChange={(
                                            newCookieExpireTime
                                        ) =>
                                            setAttributes({
                                                cookieExpireTime: newCookieExpireTime,
                                            })
                                        }
                                        help={__(
                                            "Leave blank if you want to delete cookie after browser closed.",
                                            "essential-blocks"
                                        )}
                                    />
                                )}
                            </>
                        )}
                        {"external" === trigger && (
                            <>
                                <TextControl
                                    label={__(
                                        "Identifier",
                                        "essential-blocks"
                                    )}
                                    value={eleIdentifier}
                                    onChange={(
                                        newEleIdentifier
                                    ) =>
                                        setAttributes({
                                            eleIdentifier: newEleIdentifier,
                                        })
                                    }
                                    help={__(
                                        "You can also use class identifier such as .open-popup",
                                        "essential-blocks"
                                    )}
                                />
                            </>
                        )}
                        {"exit_intent" === trigger && (
                            <>
                                <BaseControl>
                                    <h3>
                                        {__(
                                            "Exit Intent Settings",
                                            "essential-blocks"
                                        )}
                                    </h3>
                                </BaseControl>
                                <ToggleControl
                                    label={__(
                                        "Use Cookies",
                                        "essential-blocks"
                                    )}
                                    checked={useCookies}
                                    onChange={() =>
                                        setAttributes({
                                            useCookies: !useCookies,
                                        })
                                    }
                                />
                                {useCookies && (
                                    <TextControl
                                        label={__(
                                            "Cookie Expire(In days)",
                                            "essential-blocks"
                                        )}
                                        value={cookieExpireTime}
                                        onChange={(
                                            newCookieExpireTime
                                        ) =>
                                            setAttributes({
                                                cookieExpireTime: newCookieExpireTime,
                                            })
                                        }
                                        help={__(
                                            "Leave blank if you want to delete cookie after browser closed.",
                                            "essential-blocks"
                                        )}
                                    />
                                )}
                            </>
                        )}
                        <Divider />
                        <BaseControl>
                            <h3>
                                {__(
                                    "Exit Settings",
                                    "essential-blocks"
                                )}
                            </h3>
                        </BaseControl>
                        <ToggleControl
                            label={__(
                                "Show Close Button",
                                "essential-blocks"
                            )}
                            checked={displayCloseIcon}
                            onChange={() =>
                                setAttributes({
                                    displayCloseIcon: !displayCloseIcon,
                                })
                            }
                        />
                        <ToggleControl
                            label={__(
                                "Esc to Exit",
                                "essential-blocks"
                            )}
                            checked={escToExit}
                            onChange={() =>
                                setAttributes({
                                    escToExit: !escToExit,
                                })
                            }
                            help={__(
                                "Close the modal box by pressing the Esc key",
                                "essential-blocks"
                            )}
                        />
                        <ToggleControl
                            label={__(
                                "Click to Exit",
                                "essential-blocks"
                            )}
                            checked={clickToExit}
                            onChange={() =>
                                setAttributes({
                                    clickToExit: !clickToExit,
                                })
                            }
                            help={__(
                                "Close the modal box by clicking anywhere outside the modal window",
                                "essential-blocks"
                            )}
                        />
                        <ToggleControl
                            label={__(
                                "Auto Exit",
                                "essential-blocks"
                            )}
                            checked={autoExit}
                            onChange={() =>
                                setAttributes({
                                    autoExit: !autoExit,
                                })
                            }
                        />
                        {autoExit && (
                            <TextControl
                                label={__(
                                    "Auto Exit Delay (Seconds)",
                                    "essential-blocks"
                                )}
                                value={autoExitTime}
                                onChange={(newAutoExitTime) =>
                                    setAttributes({
                                        autoExitTime: newAutoExitTime,
                                    })
                                }
                            />
                        )}
                    </InspectorPanel.PanelBody>
                    <InspectorPanel.PanelBody
                        title={__(
                            "Size & Position",
                            "essential-blocks"
                        )}
                        initialOpen={false}
                    >
                        <ToggleControl
                            label={__(
                                "Full Width",
                                "essential-blocks"
                            )}
                            checked={popupFullWidth}
                            onChange={() =>
                                setAttributes({
                                    popupFullWidth: !popupFullWidth,
                                })
                            }
                        />
                        {!popupFullWidth && (
                            <>
                                <ResponsiveRangeController
                                    baseLabel={__(
                                        "Width",
                                        "essential-blocks"
                                    )}
                                    controlName={POPUP_WIDTH}
                                    min={0}
                                    max={1920}
                                    step={1}
                                />
                            </>
                        )}

                        <ToggleControl
                            label={__(
                                "Auto Height",
                                "essential-blocks"
                            )}
                            checked={autoHeight}
                            onChange={() =>
                                setAttributes({
                                    autoHeight: !autoHeight,
                                })
                            }
                        />
                        {!autoHeight && (
                            <>
                                <ResponsiveRangeController
                                    baseLabel={__(
                                        "Height",
                                        "essential-blocks"
                                    )}
                                    controlName={POPUP_HEIGHT}
                                    min={0}
                                    max={1000}
                                    step={1}
                                    units={HEIGHT_UNITS}
                                />
                            </>
                        )}
                        <SelectControl
                            label={__(
                                "Position",
                                "essential-blocks"
                            )}
                            value={position}
                            options={[
                                {
                                    label: __(
                                        "Top Left",
                                        "essential-blocks"
                                    ),
                                    value: "top_left",
                                },
                                {
                                    label: __(
                                        "Top Center",
                                        "essential-blocks"
                                    ),
                                    value: "top_center",
                                },
                                {
                                    label: __(
                                        "Top Right",
                                        "essential-blocks"
                                    ),
                                    value: "top_right",
                                },
                                {
                                    label: __(
                                        "Middle Left",
                                        "essential-blocks"
                                    ),
                                    value: "middle_left",
                                },
                                {
                                    label: __(
                                        "Middle Center",
                                        "essential-blocks"
                                    ),
                                    value: "middle_center",
                                },
                                {
                                    label: __(
                                        "Middle Right",
                                        "essential-blocks"
                                    ),
                                    value: "middle_right",
                                },
                                {
                                    label: __(
                                        "Bottom Left",
                                        "essential-blocks"
                                    ),
                                    value: "bottom_left",
                                },
                                {
                                    label: __(
                                        "Bottom Center",
                                        "essential-blocks"
                                    ),
                                    value: "bottom_center",
                                },
                                {
                                    label: __(
                                        "Bottom Right",
                                        "essential-blocks"
                                    ),
                                    value: "bottom_right",
                                },
                            ]}
                            onChange={(newPosition) =>
                                setAttributes({
                                    position: newPosition,
                                })
                            }
                        />
                    </InspectorPanel.PanelBody>
                    <InspectorPanel.PanelBody
                        title={__(
                            "Close Button",
                            "essential-blocks"
                        )}
                        initialOpen={false}
                    >
                        <>
                            <ToggleControl
                                label={__(
                                    "Use close Icon",
                                    "essential-blocks"
                                )}
                                checked={useCloseIcon}
                                onChange={() =>
                                    setAttributes({
                                        useCloseIcon: !useCloseIcon,
                                    })
                                }
                            />
                            {!useCloseIcon && (
                                <TextControl
                                    label={__(
                                        "Text",
                                        "essential-blocks"
                                    )}
                                    value={closeBtnText}
                                    onChange={(
                                        newCloseBtnText
                                    ) =>
                                        setAttributes({
                                            closeBtnText: newCloseBtnText,
                                        })
                                    }
                                />
                            )}
                            <Divider />
                            <BaseControl>
                                <h3>
                                    {__(
                                        "Icon Position",
                                        "essential-blocks"
                                    )}
                                </h3>
                            </BaseControl>
                            <ResponsiveRangeController
                                baseLabel={__(
                                    "Top",
                                    "essential-blocks"
                                )}
                                controlName={CLOSE_BTN_TOP}
                                min={-500}
                                max={500}
                                step={1}
                            />
                            <ResponsiveRangeController
                                baseLabel={__(
                                    "Right",
                                    "essential-blocks"
                                )}
                                controlName={CLOSE_BTN_RIGHT}
                                min={-500}
                                max={500}
                                step={1}
                            />
                            <ResponsiveRangeController
                                baseLabel={__(
                                    "Left",
                                    "essential-blocks"
                                )}
                                controlName={CLOSE_BTN_LEFT}
                                min={-500}
                                max={500}
                                step={1}
                            />
                        </>
                    </InspectorPanel.PanelBody>
                </InspectorPanel.General>
                <InspectorPanel.Style>
                    {"btn_click" == trigger && (
                        <InspectorPanel.PanelBody
                            title={__(
                                "Button/Icon Styles",
                                "essential-blocks"
                            )}
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
                                        "Color",
                                        "essential-blocks"
                                    )}
                                    color={btnTextColor}
                                    attributeName={'btnTextColor'}
                                />
                                <ColorControl
                                    label={__(
                                        "Hover Color",
                                        "essential-blocks"
                                    )}
                                    color={btnHoverTextColor}
                                    attributeName={'btnHoverTextColor'}
                                />
                                <Divider />
                                <ResponsiveDimensionsControl
                                    controlName={BUTTON_PADDING}
                                    baseLabel={__(
                                        "Padding",
                                        "essential-blocks"
                                    )}
                                />
                                <InspectorPanel.PanelBody
                                    title={__(
                                        "Background",
                                        "essential-blocks"
                                    )}
                                    initialOpen={false}
                                >
                                    <BackgroundControl
                                        controlName={
                                            BUTTON_BACKGROUND
                                        }
                                        noOverlay={true}
                                        noMainBgi={true}
                                    />
                                </InspectorPanel.PanelBody>
                                <InspectorPanel.PanelBody
                                    title={__(
                                        "Border",
                                        "essential-blocks"
                                    )}
                                    initialOpen={false}
                                >
                                    <BorderShadowControl
                                        controlName={
                                            BUTTON_BORDER
                                        }
                                    />
                                </InspectorPanel.PanelBody>
                            </>
                        </InspectorPanel.PanelBody>
                    )}
                    <InspectorPanel.PanelBody
                        title={__(
                            "Popup Design",
                            "essential-blocks"
                        )}
                        initialOpen={false}
                    >
                        <ColorControl
                            label={__(
                                "Overlay Color",
                                "essential-blocks"
                            )}
                            color={overlayColor}
                            attributeName={'overlayColor'}
                        />
                        <InspectorPanel.PanelBody
                            title={__(
                                "Margin & Padding",
                                "essential-blocks"
                            )}
                            initialOpen={false}
                        >
                            <ResponsiveDimensionsControl
                                controlName={POPUP_MARGIN}
                                baseLabel="Margin"
                            />
                            <ResponsiveDimensionsControl
                                controlName={POPUP_PADDING}
                                baseLabel="Padding"
                            />
                        </InspectorPanel.PanelBody>
                        <InspectorPanel.PanelBody
                            title={__(
                                "Background ",
                                "essential-blocks"
                            )}
                            initialOpen={false}
                        >
                            <BackgroundControl
                                controlName={POPUP_BACKGROUND}
                            />
                        </InspectorPanel.PanelBody>
                        <InspectorPanel.PanelBody
                            title={__(
                                "Border & Shadow",
                                "essential-blocks"
                            )}
                            initialOpen={false}
                        >
                            <BorderShadowControl
                                controlName={POPUP_BORDER}
                            />
                        </InspectorPanel.PanelBody>
                        <InspectorPanel.PanelBody
                            title={__(
                                "Container Padding",
                                "essential-blocks"
                            )}
                            initialOpen={false}
                        >
                            <ResponsiveDimensionsControl
                                controlName={CONTAINER_PADDING}
                                baseLabel="Padding"
                            />
                        </InspectorPanel.PanelBody>
                    </InspectorPanel.PanelBody>
                    {displayCloseIcon && (
                        <InspectorPanel.PanelBody
                            title={__(
                                "Close Button",
                                "essential-blocks"
                            )}
                            initialOpen={false}
                        >
                            <>
                                {!useCloseIcon && (
                                    <TypographyDropdown
                                        baseLabel={__(
                                            "Typography",
                                            "essential-blocks"
                                        )}
                                        typographyPrefixConstant={
                                            typoPrefix_close
                                        }
                                    />
                                )}
                                <ColorControl
                                    label={__(
                                        "Color",
                                        "essential-blocks"
                                    )}
                                    color={closeBtnColor}
                                    attributeName={'closeBtnColor'}
                                />
                                <ColorControl
                                    label={__(
                                        "Hover Color",
                                        "essential-blocks"
                                    )}
                                    color={closeBtnHoverColor}
                                    attributeName={'closeBtnHoverColor'}
                                />
                                <ColorControl
                                    label={__(
                                        "Background Color",
                                        "essential-blocks"
                                    )}
                                    color={closeBtnBackColor}
                                    attributeName={'closeBtnBackColor'}
                                />
                                <ColorControl
                                    label={__(
                                        "Background Hover Color",
                                        "essential-blocks"
                                    )}
                                    color={
                                        closeBtnBackHoverColor
                                    }
                                    attributeName={'closeBtnBackHoverColor'}
                                />
                                <ResponsiveDimensionsControl
                                    controlName={CLOSE_PADDING}
                                    baseLabel={__(
                                        "Padding",
                                        "essential-blocks"
                                    )}
                                />
                                <InspectorPanel.PanelBody
                                    title={__(
                                        "Border",
                                        "essential-blocks"
                                    )}
                                    initialOpen={false}
                                >
                                    <BorderShadowControl
                                        controlName={
                                            CLOSE_BORDER
                                        }
                                        noShadow={true}
                                    />
                                </InspectorPanel.PanelBody>
                            </>
                        </InspectorPanel.PanelBody>
                    )}
                </InspectorPanel.Style>
            </InspectorPanel>
        </>
    );
};

export default Inspector;
