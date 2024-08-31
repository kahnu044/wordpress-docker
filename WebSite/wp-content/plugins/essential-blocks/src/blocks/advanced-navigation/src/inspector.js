/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useState } from "@wordpress/element";
import {
    SelectControl,
    ToggleControl,
    Button,
    RangeControl,
    BaseControl,
    ButtonGroup,
    PanelRow,
    __experimentalDivider as Divider,
} from "@wordpress/components";

/**
 * Internal dependencies
 */

import {
    BorderShadowControl,
    ColorControl,
    ResponsiveRangeController,
    ResponsiveDimensionsControl,
    TypographyDropdown,
    InspectorPanel
} from "@essential-blocks/controls";

import { prefixWrapBg } from "./constants/backgroundsConstants";

import {
    prefixWrapBdShadow,
    prefixNavBdShadow,
    prefixNavDropdownBdShadow,
    prefixDropdownItemBdShadow,
    prefixHamburgerItemBdShadow,
} from "./constants/borderShadowConstants";

import {
    prefixWrapperMargin,
    prefixWrapperPadding,
    prefixNavPadding,
    prefixNavMargin,
    prefixNavDropdownPadding,
    prefixDropdownItemPadding,
    prefixNavHamburgerPadding,
    prefixHamburgerItemPadding,
    prefixHamburgerBtnPadding,
} from "./constants/dimensionsConstants";

import {
    prefixCaretSize,
    prefixDropdownWidth,
    prefixHamburerBtnSize,
} from "./constants/rangeNames";

import objAttributes from "./attributes";

import {
    //
    typoPrefixNav,
    typoPrefixNavDropdown,
    typoPrefixNavHamburger,
    typoPrefixHamburgerBtn,
} from "./constants/typographyPrefixConstants";

import {
    PRESET,
    NAV_POSITION,
    NAV_V_POSITION,
    NAV_RESPONSIVE_BTN,
    HAMBURGER_SCREEN,
    VERTICAL_PRESET,
    CLOSE_ICON_ALIGN,
} from "./constants";

function Inspector(props) {
    const { attributes, setAttributes } = props;

    const {
        layout,
        navTextColor,
        hvNavTextColor,
        actNavTextColor,
        actHvNavTextColor,
        colorTransition,
        actColorTransition,
        caretColor,
        preset,
        navAlign,
        hvNavBgColor,
        actNavBgColor,
        actHvNavBgColor,
        navDropdownTextColor,
        hvNavDropdownTextColor,
        actNavDropdownTextColor,
        actHvNavDropdownTextColor,
        navDropdownBgColor,
        dropdownOpenOnClick,
        showDropdownIcon,
        navBtnType,
        dropdownItemBgColor,
        hvDropdownItemBgColor,
        actDropdownItemBgColor,
        actHvDropdownItemBgColor,
        hvCaretColor,
        verticalPreset,
        navHamburgerBgColor,
        navHamburgerTextColor,
        hamburgerItemBgColor,
        hvNavHamburgerTextColor,
        hvHamburgerItemBgColor,
        hamburgerCloseIconColor,
        navDividerColor,
        navDropdownDividerColor,
        flexWrap,
        navVerticalAlign,
        hamburgerMenu,
        navHamburgerBtnColor,
        hamburgerCloseIconAlign,
        verticalNavDividerColor,
    } = attributes;

    //
    const [colorSwitcher, setColorSwitcher] = useState("normal");
    const [activeColorSwitcher, setActiveColorSwitcher] = useState("normal");

    const changeLayout = (preset) => {
        setAttributes({ layout: preset });
        if (preset === "is-horizontal") {
            changePreset(preset);
        } else {
            changeVerticalPreset(verticalPreset);
        }
    };

    const changePreset = (selected) => {
        setAttributes({ preset: selected });
        switch (selected) {
            case "preset-1":
                setAttributes({
                    wrpBg_backgroundColor: "#ffffff",
                    navTextColor: "#6A72A5",
                    hvNavTextColor: "#2673FF",
                    caretColor: "#6A72A5",
                    hvCaretColor: "#2673FF",
                    navHamburgerBtnColor: "#2673FF",

                    actNavTextColor: "#2673FF",
                    actHvNavTextColor: "#2673FF",
                    hvNavDropdownTextColor: "#2673FF",

                    hvNavBgColor: "#ffffff",
                    actNavBgColor: "#ffffff",
                    actHvNavBgColor: "#ffffff",

                    navDropdownBgColor: "#ffffff",
                    navDropdownTextColor: "#6A72A5",
                    hvNavDropdownTextColor: "#2673FF",
                    dropdownItemBgColor: "#ffffff",
                    hvDropdownItemBgColor: "#ffffff",

                    dropdownP_Bottom: "10",
                    dropdownP_Left: "10",
                    dropdownP_Right: "10",
                    dropdownP_Top: "10",
                    dropdownP_Unit: "px",
                    dropdownP_isLinked: true,
                    dropdownItemP_Bottom: "10",
                    dropdownItemP_Left: "10",
                    dropdownItemP_Right: "10",
                    dropdownItemP_Top: "10",
                    dropdownItemP_Unit: "px",
                    dropdownItemP_isLinked: true,

                    wrpBds_Rds_Bottom: "5",
                    wrpBds_Rds_Left: "5",
                    wrpBds_Rds_Right: "5",
                    wrpBds_Rds_Top: "5",

                    navDropdownBds_Rds_Bottom: "5",
                    navDropdownBds_Rds_Left: "5",
                    navDropdownBds_Rds_Right: "5",
                    navDropdownBds_Rds_Top: "5",

                    wrpBds_BorderType: "normal",
                    wrpBds_borderStyle: "none",
                    wrpBds_borderColor: "#2673FF",
                    wrpBds_Bdr_Bottom: "1",
                    wrpBds_Bdr_Left: "1",
                    wrpBds_Bdr_Right: "1",
                    wrpBds_Bdr_Top: "1",
                    wrpBds_Bdr_Unit: "px",
                    wrpBds_Bdr_isLinked: true,

                    navDropdownBds_BorderType: "normal",
                    navDropdownBds_borderStyle: "none",
                    navDropdownBds_borderColor: "#6C63FF",
                    navDropdownBds_Bdr_Bottom: "1",
                    navDropdownBds_Bdr_Left: "1",
                    navDropdownBds_Bdr_Right: "1",
                    navDropdownBds_Bdr_Top: "1",
                    navDropdownBds_Bdr_Unit: "px",
                    navDropdownBds_Bdr_isLinked: true,
                });
                break;
            case "preset-2":
                setAttributes({
                    wrpBg_backgroundColor: "#6C63FF",
                    navTextColor: "#ffffff",
                    hvNavTextColor: "#6C63FF",
                    navHamburgerBtnColor: "#ffffff",
                    caretColor: "#ffffff",
                    hvCaretColor: "#6C63FF",
                    actNavTextColor: "#6C63FF",
                    actHvNavTextColor: "#6C63FF",
                    hvNavBgColor: "#ffffff",
                    actNavBgColor: "#ffffff",
                    actHvNavBgColor: "#ffffff",

                    navDropdownBgColor: "#6C63FF",
                    navDropdownTextColor: "#ffffff",
                    hvNavDropdownTextColor: "#6C63FF",
                    dropdownItemBgColor: "#6C63FF",
                    hvDropdownItemBgColor: "#ffffff",

                    dropdownP_Bottom: "0",
                    dropdownP_Left: "0",
                    dropdownP_Right: "0",
                    dropdownP_Top: "0",
                    dropdownP_Unit: "px",
                    dropdownP_isLinked: true,

                    wrpBds_Rds_Bottom: "0",
                    wrpBds_Rds_Left: "0",
                    wrpBds_Rds_Right: "0",
                    wrpBds_Rds_Top: "0",

                    navDropdownBds_Rds_Bottom: "0",
                    navDropdownBds_Rds_Left: "0",
                    navDropdownBds_Rds_Right: "0",
                    navDropdownBds_Rds_Top: "0",

                    wrpBds_BorderType: "normal",
                    wrpBds_borderStyle: "none",
                    wrpBds_borderColor: "#6C63FF",
                    wrpBds_Bdr_Bottom: "1",
                    wrpBds_Bdr_Left: "1",
                    wrpBds_Bdr_Right: "1",
                    wrpBds_Bdr_Top: "1",
                    wrpBds_Bdr_Unit: "px",
                    wrpBds_Bdr_isLinked: true,

                    navDropdownBds_BorderType: "normal",
                    navDropdownBds_borderStyle: "none",
                    navDropdownBds_borderColor: "#6C63FF",
                    navDropdownBds_Bdr_Bottom: "1",
                    navDropdownBds_Bdr_Left: "1",
                    navDropdownBds_Bdr_Right: "1",
                    navDropdownBds_Bdr_Top: "1",
                    navDropdownBds_Bdr_Unit: "px",
                    navDropdownBds_Bdr_isLinked: true,
                });
                break;
            case "preset-3":
                setAttributes({
                    wrpBg_backgroundColor: "#2673FF",
                    navTextColor: "#ffffff",
                    hvNavTextColor: "#ffffff",
                    caretColor: "#ffffff",
                    hvCaretColor: "#ffffff",
                    navHamburgerBtnColor: "#ffffff",

                    actNavTextColor: "#ffffff",
                    actHvNavTextColor: "#ffffff",
                    hvNavBgColor: "#0059FC",

                    actNavBgColor: "#0059FC",
                    actHvNavBgColor: "#0059FC",

                    navDropdownBgColor: "#2673FF",
                    navDropdownTextColor: "#ffffff",
                    hvNavDropdownTextColor: "#ffffff",
                    dropdownItemBgColor: "#2673FF",
                    hvDropdownItemBgColor: "#0059FC",

                    dropdownP_Bottom: "10",
                    dropdownP_Left: "10",
                    dropdownP_Right: "10",
                    dropdownP_Top: "10",
                    dropdownP_Unit: "px",
                    dropdownP_isLinked: true,
                    hvCaretColor: "#ffffff",

                    dropdownItemBds_Rds_Bottom: "0",
                    dropdownItemBds_Rds_Left: "0",
                    dropdownItemBds_Rds_Right: "0",
                    dropdownItemBds_Rds_Top: "0",

                    wrpBds_Rds_Bottom: "0",
                    wrpBds_Rds_Left: "0",
                    wrpBds_Rds_Right: "0",
                    wrpBds_Rds_Top: "0",

                    navDropdownBds_Rds_Bottom: "0",
                    navDropdownBds_Rds_Left: "0",
                    navDropdownBds_Rds_Right: "0",
                    navDropdownBds_Rds_Top: "0",

                    wrpBds_BorderType: "normal",
                    wrpBds_borderStyle: "none",
                    wrpBds_borderColor: "#6C63FF",
                    wrpBds_Bdr_Bottom: "1",
                    wrpBds_Bdr_Left: "1",
                    wrpBds_Bdr_Right: "1",
                    wrpBds_Bdr_Top: "1",
                    wrpBds_Bdr_Unit: "px",
                    wrpBds_Bdr_isLinked: true,

                    navDropdownBds_BorderType: "normal",
                    navDropdownBds_borderStyle: "none",
                    navDropdownBds_borderColor: "#6C63FF",
                    navDropdownBds_Bdr_Bottom: "1",
                    navDropdownBds_Bdr_Left: "1",
                    navDropdownBds_Bdr_Right: "1",
                    navDropdownBds_Bdr_Top: "1",
                    navDropdownBds_Bdr_Unit: "px",
                    navDropdownBds_Bdr_isLinked: true,
                });
                break;

            case "preset-4":
                setAttributes({
                    wrpBg_backgroundColor: "#ffffff",
                    navTextColor: "#6A72A5",
                    hvNavTextColor: "#2673FF",
                    caretColor: "#6A72A5",
                    hvCaretColor: "#2673FF",
                    navHamburgerBtnColor: "#2673FF",

                    actNavTextColor: "#2673FF",
                    actHvNavTextColor: "#2673FF",

                    navDropdownBgColor: "#ffffff",
                    navDropdownTextColor: "#6A72A5",
                    hvNavDropdownTextColor: "#2673FF",
                    dropdownP_Bottom: "0",
                    dropdownP_Left: "0",
                    dropdownP_Right: "0",
                    dropdownP_Top: "0",
                    dropdownP_Unit: "px",
                    dropdownP_isLinked: true,

                    wrpBds_Rds_Bottom: "5",
                    wrpBds_Rds_Left: "5",
                    wrpBds_Rds_Right: "5",
                    wrpBds_Rds_Top: "5",

                    navDropdownBds_Rds_Bottom: "5",
                    navDropdownBds_Rds_Left: "5",
                    navDropdownBds_Rds_Right: "5",
                    navDropdownBds_Rds_Top: "5",

                    wrpBds_BorderType: "normal",
                    wrpBds_borderStyle: "solid",
                    wrpBds_borderColor: "#2673FF",
                    wrpBds_Bdr_Bottom: "1",
                    wrpBds_Bdr_Left: "1",
                    wrpBds_Bdr_Right: "1",
                    wrpBds_Bdr_Top: "1",
                    wrpBds_Bdr_Unit: "px",
                    wrpBds_Bdr_isLinked: true,

                    navDropdownBds_BorderType: "normal",
                    navDropdownBds_borderStyle: "solid",
                    navDropdownBds_borderColor: "#2673FF",
                    navDropdownBds_Bdr_Bottom: "1",
                    navDropdownBds_Bdr_Left: "1",
                    navDropdownBds_Bdr_Right: "1",
                    navDropdownBds_Bdr_Top: "1",
                    navDropdownBds_Bdr_Unit: "px",
                    navDropdownBds_Bdr_isLinked: true,
                });
                break;

            default:
                return false;
        }
    };

    const changeVerticalPreset = (selected) => {
        setAttributes({ verticalPreset: selected });
        switch (selected) {
            case "vertical-preset-1":
                setAttributes({
                    wrpBg_backgroundColor: "#ffffff",
                    navTextColor: "#6A72A5",
                    hvNavTextColor: "#2673FF",
                    caretColor: "#6A72A5",
                    hvCaretColor: "#2673FF",

                    navHamburgerBtnColor: "#2673FF",

                    actNavTextColor: "#2673FF",
                    actHvNavTextColor: "#2673FF",

                    navDropdownBgColor: "#ffffff",
                    navDropdownTextColor: "#6A72A5",
                    hvNavDropdownTextColor: "#2673FF",

                    dropdownP_Bottom: "0",
                    dropdownP_Left: "0",
                    dropdownP_Right: "0",
                    dropdownP_Top: "0",
                    dropdownP_Unit: "px",
                    dropdownP_isLinked: true,

                    dropdownItemP_Bottom: "10",
                    dropdownItemP_Left: "10",
                    dropdownItemP_Right: "10",
                    dropdownItemP_Top: "10",
                    dropdownItemP_Unit: "px",
                    dropdownItemP_isLinked: true,
                    actNavTextColor: "#2673FF",
                    hvNavTextColor: "#2673FF",
                    hvCaretColor: "#2673FF",

                    wrpBds_Rds_Bottom: "5",
                    wrpBds_Rds_Left: "5",
                    wrpBds_Rds_Right: "5",
                    wrpBds_Rds_Top: "5",

                    navDropdownBds_Rds_Bottom: "5",
                    navDropdownBds_Rds_Left: "5",
                    navDropdownBds_Rds_Right: "5",
                    navDropdownBds_Rds_Top: "5",

                    wrpBds_BorderType: "normal",
                    wrpBds_borderStyle: "none",
                    wrpBds_borderColor: "#ffffff",
                    wrpBds_Bdr_Bottom: "0",
                    wrpBds_Bdr_Left: "0",
                    wrpBds_Bdr_Right: "0",
                    wrpBds_Bdr_Top: "0",
                    wrpBds_Bdr_Unit: "px",
                    wrpBds_Bdr_isLinked: true,

                    navDropdownBds_BorderType: "normal",
                    navDropdownBds_borderStyle: "none",
                    navDropdownBds_borderColor: "#ffffff",
                    navDropdownBds_Bdr_Bottom: "0",
                    navDropdownBds_Bdr_Left: "0",
                    navDropdownBds_Bdr_Right: "0",
                    navDropdownBds_Bdr_Top: "0",
                    navDropdownBds_Bdr_Unit: "px",
                    navDropdownBds_Bdr_isLinked: true,
                });
                break;
            case "vertical-preset-2":
                setAttributes({
                    wrpBg_backgroundColor: "#2673FF",
                    navTextColor: "#ffffff",
                    hvNavTextColor: "#ffffff",
                    caretColor: "#ffffff",
                    hvCaretColor: "#ffffff",
                    navHamburgerBtnColor: "#ffffff",

                    actNavTextColor: "#ffffff",
                    actHvNavTextColor: "#ffffff",
                    hvNavBgColor: "#0059FC",

                    actNavBgColor: "#0053EB",
                    actHvNavBgColor: "#0053EB",

                    navDropdownBgColor: "#0059FC",
                    // navDropdownTextColor: "#ffffff",
                    // hvNavDropdownTextColor: "#ffffff",
                    // dropdownItemBgColor: "#2673FF",
                    // hvDropdownItemBgColor: "#0059FC",

                    navDropdownTextColor: "#ffffff",
                    hvNavDropdownTextColor: "#ffffff",
                    dropdownItemBgColor: "#0059FC",
                    hvDropdownItemBgColor: "#0053EB",

                    dropdownP_Bottom: "0",
                    dropdownP_Left: "0",
                    dropdownP_Right: "0",
                    dropdownP_Top: "0",
                    dropdownP_Unit: "px",
                    dropdownP_isLinked: true,

                    wrpBds_Rds_Bottom: "5",
                    wrpBds_Rds_Left: "5",
                    wrpBds_Rds_Right: "5",
                    wrpBds_Rds_Top: "5",

                    navDropdownBds_Rds_Bottom: "5",
                    navDropdownBds_Rds_Left: "5",
                    navDropdownBds_Rds_Right: "5",
                    navDropdownBds_Rds_Top: "5",

                    wrpBds_BorderType: "normal",
                    wrpBds_borderStyle: "solid",
                    wrpBds_borderColor: "#2673FF",
                    wrpBds_Bdr_Bottom: "1",
                    wrpBds_Bdr_Left: "1",
                    wrpBds_Bdr_Right: "1",
                    wrpBds_Bdr_Top: "1",
                    wrpBds_Bdr_Unit: "px",
                    wrpBds_Bdr_isLinked: true,

                    navDropdownBds_BorderType: "normal",
                    navDropdownBds_borderStyle: "none",
                    navDropdownBds_borderColor: "#2673FF",
                    navDropdownBds_Bdr_Bottom: "1",
                    navDropdownBds_Bdr_Left: "1",
                    navDropdownBds_Bdr_Right: "1",
                    navDropdownBds_Bdr_Top: "1",
                    navDropdownBds_Bdr_Unit: "px",
                    navDropdownBds_Bdr_isLinked: true,
                });
                break;

            default:
                return false;
        }
    };

    return (
        <InspectorPanel advancedControlProps={{
            marginPrefix: prefixWrapperMargin,
            paddingPrefix: prefixWrapperPadding,
            backgroundPrefix: prefixWrapBg,
            borderPrefix: prefixWrapBdShadow,
            hasMargin: true
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
                        <PanelRow>
                            {__("Layout", "essential-blocks")}
                        </PanelRow>
                        <SelectControl
                            label={__(
                                "Orientation",
                                "essential-blocks"
                            )}
                            value={layout}
                            options={[
                                {
                                    label: __(
                                        "Horizontal",
                                        "essential-blocks"
                                    ),
                                    value: "is-horizontal",
                                },
                                {
                                    label: __(
                                        "Vertical",
                                        "essential-blocks"
                                    ),
                                    value: "is-vertical",
                                },
                            ]}
                            onChange={(selected) =>
                                changeLayout(selected)
                            }
                        />

                        {layout == "is-horizontal" && (
                            <>
                                <SelectControl
                                    label={__(
                                        "Preset",
                                        "essential-blocks"
                                    )}
                                    value={preset}
                                    options={PRESET}
                                    onChange={(selected) =>
                                        changePreset(selected)
                                    }
                                />

                                <ToggleControl
                                    label={__(
                                        "Allow to wrap to multiple lines",
                                        "essential-blocks"
                                    )}
                                    checked={flexWrap}
                                    onChange={(flexWrap) =>
                                        setAttributes({
                                            flexWrap,
                                        })
                                    }
                                />

                                <BaseControl
                                    label={__(
                                        "Alignment",
                                        "essential-blocks"
                                    )}
                                >
                                    <ButtonGroup id="eb-button-group-alignment">
                                        {NAV_POSITION.map(
                                            (item, index) => (
                                                <Button
                                                    key={index}
                                                    isPrimary={
                                                        navAlign ===
                                                        item.value
                                                    }
                                                    isSecondary={
                                                        navAlign !==
                                                        item.value
                                                    }
                                                    onClick={() =>
                                                        setAttributes(
                                                            {
                                                                navAlign:
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

                        {layout == "is-vertical" && (
                            <>
                                <SelectControl
                                    label={__(
                                        "Preset",
                                        "essential-blocks"
                                    )}
                                    value={verticalPreset}
                                    options={VERTICAL_PRESET}
                                    onChange={(selected) =>
                                        changeVerticalPreset(
                                            selected
                                        )
                                    }
                                />

                                <BaseControl
                                    label={__(
                                        "Alignment",
                                        "essential-blocks"
                                    )}
                                >
                                    <ButtonGroup id="eb-button-group-alignment">
                                        {NAV_V_POSITION.map(
                                            (item, index) => (
                                                <Button
                                                    key={index}
                                                    isPrimary={
                                                        navVerticalAlign ===
                                                        item.value
                                                    }
                                                    isSecondary={
                                                        navVerticalAlign !==
                                                        item.value
                                                    }
                                                    onClick={() =>
                                                        setAttributes(
                                                            {
                                                                navVerticalAlign:
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

                        <Divider />

                        <PanelRow>
                            {__(
                                "Dropdown Menus",
                                "essential-blocks"
                            )}
                        </PanelRow>
                        <ToggleControl
                            label={__(
                                "Open on Click",
                                "essential-blocks"
                            )}
                            checked={dropdownOpenOnClick}
                            onChange={(dropdownOpenOnClick) =>
                                setAttributes({
                                    dropdownOpenOnClick,
                                })
                            }
                        />
                        <ToggleControl
                            label={__(
                                "Show Dropdown Menu Icon?",
                                "essential-blocks"
                            )}
                            checked={showDropdownIcon}
                            onChange={(showDropdownIcon) =>
                                setAttributes({
                                    showDropdownIcon,
                                })
                            }
                        />
                    </InspectorPanel.PanelBody>
                    <InspectorPanel.PanelBody
                        title={__(
                            "Hamburger Menu",
                            "essential-blocks"
                        )}
                        initialOpen={true}
                    >
                        <BaseControl
                            label={__(
                                "Button Type",
                                "essential-blocks"
                            )}
                        >
                            <ButtonGroup id="eb-button-group-alignment">
                                {NAV_RESPONSIVE_BTN.map(
                                    (item, index) => (
                                        <Button
                                            key={index}
                                            isPrimary={
                                                navBtnType ===
                                                item.value
                                            }
                                            isSecondary={
                                                navBtnType !==
                                                item.value
                                            }
                                            onClick={() =>
                                                setAttributes({
                                                    navBtnType:
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
                                "Display Hamburger Menu",
                                "essential-blocks"
                            )}
                        >
                            <ButtonGroup id="eb-button-group-alignment">
                                {HAMBURGER_SCREEN.map(
                                    (item, index) => (
                                        <Button
                                            key={index}
                                            isPrimary={
                                                hamburgerMenu ===
                                                item.value
                                            }
                                            isSecondary={
                                                hamburgerMenu !==
                                                item.value
                                            }
                                            onClick={() =>
                                                setAttributes({
                                                    hamburgerMenu:
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
                    </InspectorPanel.PanelBody>
                </>
            </InspectorPanel.General>
            <InspectorPanel.Style>
                <>
                    <InspectorPanel.PanelBody
                        title={__(
                            "Navigation",
                            "essential-blocks"
                        )}
                        initialOpen={true}
                    >
                        <TypographyDropdown
                            baseLabel={__("Typography", "essential-blocks")}
                            typographyPrefixConstant={
                                typoPrefixNav
                            }
                        />

                        <ResponsiveDimensionsControl
                            controlName={prefixNavPadding}
                            baseLabel={__("Padding", "essential-blocks")}
                        />

                        <ResponsiveDimensionsControl
                            controlName={prefixNavMargin}
                            baseLabel={__("Margin", "essential-blocks")}
                        />

                        {layout == "is-horizontal" &&
                            preset == "preset-4" && (
                                <ColorControl
                                    label={__(
                                        "Divider Color",
                                        "essential-blocks"
                                    )}
                                    defaultColor={
                                        objAttributes
                                            .navDividerColor
                                            .default
                                    }
                                    color={navDividerColor}
                                    attributeName={'navDividerColor'}
                                />
                            )}

                        {layout == "is-vertical" &&
                            preset == "preset-1" && (
                                <ColorControl
                                    label={__(
                                        "Divider Color",
                                        "essential-blocks"
                                    )}
                                    defaultColor={
                                        objAttributes
                                            .verticalNavDividerColor
                                            .default
                                    }
                                    color={
                                        verticalNavDividerColor
                                    }
                                    attributeName={'verticalNavDividerColor'}
                                />
                            )}

                        <InspectorPanel.PanelBody
                            title={__(
                                "Colors",
                                "essential-blocks"
                            )}
                            initialOpen={false}
                        >
                            <BaseControl>
                                <ButtonGroup>
                                    {[
                                        {
                                            label: __(
                                                "Normal",
                                                "essential-blocks"
                                            ),
                                            value: "normal",
                                        },
                                        {
                                            label: __(
                                                "Hover",
                                                "essential-blocks"
                                            ),
                                            value: "hover",
                                        },
                                    ].map(
                                        (
                                            { value, label },
                                            index
                                        ) => (
                                            <Button
                                                key={index}
                                                // isLarge
                                                isPrimary={
                                                    colorSwitcher ===
                                                    value
                                                }
                                                isSecondary={
                                                    colorSwitcher !==
                                                    value
                                                }
                                                onClick={() =>
                                                    setColorSwitcher(
                                                        value
                                                    )
                                                }
                                            >
                                                {label}
                                            </Button>
                                        )
                                    )}
                                </ButtonGroup>
                            </BaseControl>

                            {colorSwitcher === "normal" && (
                                <>
                                    <ColorControl
                                        label={__(
                                            "Text",
                                            "essential-blocks"
                                        )}
                                        defaultColor={
                                            objAttributes
                                                .navTextColor
                                                .default
                                        }
                                        color={navTextColor}
                                        attributeName={'navTextColor'}
                                    />
                                </>
                            )}

                            {colorSwitcher === "hover" && (
                                <>
                                    <ColorControl
                                        label={__(
                                            "Text",
                                            "essential-blocks"
                                        )}
                                        defaultColor={
                                            objAttributes
                                                .hvNavTextColor
                                                .default
                                        }
                                        color={hvNavTextColor}
                                        attributeName={'hvNavTextColor'}
                                    />
                                    {layout ==
                                        "is-horizontal" &&
                                        (preset == "preset-2" ||
                                            preset ==
                                            "preset-3") && (
                                            <ColorControl
                                                label={__(
                                                    "Background",
                                                    "essential-blocks"
                                                )}
                                                defaultColor={
                                                    objAttributes
                                                        .hvNavBgColor
                                                        .default
                                                }
                                                color={hvNavBgColor}
                                                attributeName={'hvNavBgColor'}
                                            />
                                        )}

                                    {layout == "is-vertical" &&
                                        verticalPreset ==
                                        "vertical-preset-2" && (
                                            <ColorControl
                                                label={__(
                                                    "Background",
                                                    "essential-blocks"
                                                )}
                                                defaultColor={
                                                    objAttributes
                                                        .hvNavBgColor
                                                        .default
                                                }
                                                color={
                                                    hvNavBgColor
                                                }
                                                attributeName={'hvNavBgColor'}
                                            />
                                        )}
                                </>
                            )}
                        </InspectorPanel.PanelBody>

                        <InspectorPanel.PanelBody
                            title={__(
                                "Active Colors",
                                "essential-blocks"
                            )}
                            initialOpen={false}
                        >
                            <BaseControl>
                                <ButtonGroup>
                                    {[
                                        {
                                            label: __(
                                                "Normal",
                                                "essential-blocks"
                                            ),
                                            value: "normal",
                                        },
                                        {
                                            label: __(
                                                "Hover",
                                                "essential-blocks"
                                            ),
                                            value: "hover",
                                        },
                                    ].map(
                                        (
                                            { value, label },
                                            index
                                        ) => (
                                            <Button
                                                key={index}
                                                isPrimary={
                                                    activeColorSwitcher ===
                                                    value
                                                }
                                                isSecondary={
                                                    activeColorSwitcher !==
                                                    value
                                                }
                                                onClick={() =>
                                                    setActiveColorSwitcher(
                                                        value
                                                    )
                                                }
                                            >
                                                {label}
                                            </Button>
                                        )
                                    )}
                                </ButtonGroup>
                            </BaseControl>

                            {activeColorSwitcher ===
                                "normal" && (
                                    <>
                                        <ColorControl
                                            label={__(
                                                "Text",
                                                "essential-blocks"
                                            )}
                                            defaultColor={
                                                objAttributes
                                                    .actNavTextColor
                                                    .default
                                            }
                                            color={actNavTextColor}
                                            attributeName={'actNavTextColor'}
                                        />

                                        {layout ==
                                            "is-horizontal" &&
                                            (preset == "preset-2" ||
                                                preset ==
                                                "preset-3") && (
                                                <ColorControl
                                                    label={__(
                                                        "Background",
                                                        "essential-blocks"
                                                    )}
                                                    defaultColor={
                                                        objAttributes
                                                            .actNavBgColor
                                                            .default
                                                    }
                                                    color={
                                                        actNavBgColor
                                                    }
                                                    attributeName={'actNavBgColor'}
                                                />
                                            )}

                                        {layout == "is-vertical" &&
                                            verticalPreset ==
                                            "vertical-preset-2" && (
                                                <ColorControl
                                                    label={__(
                                                        "Background",
                                                        "essential-blocks"
                                                    )}
                                                    defaultColor={
                                                        objAttributes
                                                            .actNavBgColor
                                                            .default
                                                    }
                                                    color={
                                                        actNavBgColor
                                                    }
                                                    attributeName={'actNavBgColor'}
                                                />
                                            )}
                                    </>
                                )}

                            {activeColorSwitcher ===
                                "hover" && (
                                    <>
                                        <ColorControl
                                            label={__(
                                                "Text",
                                                "essential-blocks"
                                            )}
                                            defaultColor={
                                                objAttributes
                                                    .actHvNavTextColor
                                                    .default
                                            }
                                            color={
                                                actHvNavTextColor
                                            }
                                            attributeName={'actHvNavTextColor'}
                                        />

                                        {layout ==
                                            "is-horizontal" &&
                                            (preset == "preset-2" ||
                                                preset ==
                                                "preset-3") && (
                                                <ColorControl
                                                    label={__(
                                                        "Backgound",
                                                        "essential-blocks"
                                                    )}
                                                    defaultColor={
                                                        objAttributes
                                                            .actHvNavBgColor
                                                            .default
                                                    }
                                                    color={
                                                        actHvNavBgColor
                                                    }
                                                    attributeName={'actHvNavBgColor'}
                                                />
                                            )}

                                        {layout == "is-vertical" &&
                                            verticalPreset ==
                                            "vertical-preset-2" && (
                                                <ColorControl
                                                    label={__(
                                                        "Backgound",
                                                        "essential-blocks"
                                                    )}
                                                    defaultColor={
                                                        objAttributes
                                                            .actHvNavBgColor
                                                            .default
                                                    }
                                                    color={
                                                        actHvNavBgColor
                                                    }
                                                    attributeName={'actHvNavBgColor'}
                                                />
                                            )}

                                        <BaseControl
                                            label={__(
                                                "Transition",
                                                "essential-blocks"
                                            )}
                                        >
                                            <RangeControl
                                                value={
                                                    actColorTransition
                                                }
                                                onChange={(
                                                    actColorTransition
                                                ) =>
                                                    setAttributes({
                                                        actColorTransition,
                                                    })
                                                }
                                                step={0.1}
                                                min={0}
                                                max={5}
                                            />
                                        </BaseControl>
                                    </>
                                )}
                        </InspectorPanel.PanelBody>

                        {preset === "preset-3" && (
                            <InspectorPanel.PanelBody
                                title={__(
                                    "Active & Hover Border"
                                )}
                                initialOpen={false}
                            >
                                <BorderShadowControl
                                    controlName={
                                        prefixNavBdShadow
                                    }
                                    noShadow
                                    noBdrHover
                                // noBorder
                                />
                            </InspectorPanel.PanelBody>
                        )}
                    </InspectorPanel.PanelBody>

                    <InspectorPanel.PanelBody
                        title={__(
                            "Dropdown Menu",
                            "essential-blocks"
                        )}
                        initialOpen={false}
                    >
                        <PanelRow>
                            {__(
                                "Container",
                                "essential-blocks"
                            )}
                        </PanelRow>
                        <ResponsiveRangeController
                            baseLabel={__(
                                "Min Width (PX)",
                                "essential-blocks"
                            )}
                            controlName={prefixDropdownWidth}
                            min={100}
                            max={500}
                            step={1}
                            noUnits
                        />
                        <ColorControl
                            label={__(
                                "Background",
                                "essential-blocks"
                            )}
                            defaultColor={
                                objAttributes.navDropdownBgColor
                                    .default
                            }
                            color={navDropdownBgColor}
                            attributeName={'navDropdownBgColor'}
                        />
                        <ResponsiveDimensionsControl
                            controlName={
                                prefixNavDropdownPadding
                            }
                            baseLabel={__("Padding", "essential-blocks")}
                        />

                        <InspectorPanel.PanelBody
                            title={__("Border & Shadow", "essential-blocks")}
                            initialOpen={false}
                        >
                            <BorderShadowControl
                                controlName={
                                    prefixNavDropdownBdShadow
                                }
                                noBdrHover
                            />
                        </InspectorPanel.PanelBody>

                        <Divider />
                        <PanelRow>
                            {__("Items", "essential-blocks")}
                        </PanelRow>
                        <TypographyDropdown
                            baseLabel={__("Typography", "essential-blocks")}
                            typographyPrefixConstant={
                                typoPrefixNavDropdown
                            }
                        />
                        <ResponsiveDimensionsControl
                            controlName={
                                prefixDropdownItemPadding
                            }
                            baseLabel={__("Padding", "essential-blocks")}
                        />
                        {preset == "preset-4" && (
                            <ColorControl
                                label={__(
                                    "Divider Color",
                                    "essential-blocks"
                                )}
                                defaultColor={
                                    objAttributes
                                        .navDropdownDividerColor
                                        .default
                                }
                                color={navDropdownDividerColor}
                                attributeName={'navDropdownDividerColor'}
                            />
                        )}
                        <InspectorPanel.PanelBody
                            title={__(
                                "Colors",
                                "essential-blocks"
                            )}
                            initialOpen={false}
                        >
                            <BaseControl>
                                <ButtonGroup>
                                    {[
                                        {
                                            label: __(
                                                "Normal",
                                                "essential-blocks"
                                            ),
                                            value: "normal",
                                        },
                                        {
                                            label: __(
                                                "Hover",
                                                "essential-blocks"
                                            ),
                                            value: "hover",
                                        },
                                    ].map(
                                        (
                                            { value, label },
                                            index
                                        ) => (
                                            <Button
                                                key={index}
                                                // isLarge
                                                isPrimary={
                                                    colorSwitcher ===
                                                    value
                                                }
                                                isSecondary={
                                                    colorSwitcher !==
                                                    value
                                                }
                                                onClick={() =>
                                                    setColorSwitcher(
                                                        value
                                                    )
                                                }
                                            >
                                                {label}
                                            </Button>
                                        )
                                    )}
                                </ButtonGroup>
                            </BaseControl>

                            {colorSwitcher === "normal" && (
                                <>
                                    <ColorControl
                                        label={__(
                                            "Text",
                                            "essential-blocks"
                                        )}
                                        defaultColor={
                                            objAttributes
                                                .navDropdownTextColor
                                                .default
                                        }
                                        color={
                                            navDropdownTextColor
                                        }
                                        attributeName={'navDropdownTextColor'}
                                    />

                                    {(preset == "preset-2" ||
                                        preset ==
                                        "preset-3") && (
                                            <ColorControl
                                                label={__(
                                                    "Background",
                                                    "essential-blocks"
                                                )}
                                                defaultColor={
                                                    objAttributes
                                                        .dropdownItemBgColor
                                                        .default
                                                }
                                                color={
                                                    dropdownItemBgColor
                                                }
                                                attributeName={'dropdownItemBgColor'}
                                            />
                                        )}
                                </>
                            )}

                            {colorSwitcher === "hover" && (
                                <>
                                    <ColorControl
                                        label={__(
                                            "Text",
                                            "essential-blocks"
                                        )}
                                        defaultColor={
                                            objAttributes
                                                .hvNavDropdownTextColor
                                                .default
                                        }
                                        color={
                                            hvNavDropdownTextColor
                                        }
                                        attributeName={'hvNavDropdownTextColor'}
                                    />

                                    {layout ==
                                        "is-horizontal" &&
                                        (preset == "preset-2" ||
                                            preset ==
                                            "preset-3") && (
                                            <ColorControl
                                                label={__(
                                                    "Background",
                                                    "essential-blocks"
                                                )}
                                                defaultColor={
                                                    objAttributes
                                                        .hvDropdownItemBgColor
                                                        .default
                                                }
                                                color={
                                                    hvDropdownItemBgColor
                                                }
                                                attributeName={'hvDropdownItemBgColor'}
                                            />
                                        )}

                                    {layout == "is-vertical" &&
                                        verticalPreset ==
                                        "vertical-preset-2" && (
                                            <ColorControl
                                                label={__(
                                                    "Background",
                                                    "essential-blocks"
                                                )}
                                                defaultColor={
                                                    objAttributes
                                                        .hvDropdownItemBgColor
                                                        .default
                                                }
                                                color={
                                                    hvDropdownItemBgColor
                                                }
                                                attributeName={'hvDropdownItemBgColor'}
                                            />
                                        )}

                                    <RangeControl
                                        label={__(
                                            "Transition",
                                            "essential-blocks"
                                        )}
                                        value={colorTransition}
                                        onChange={(
                                            colorTransition
                                        ) =>
                                            setAttributes({
                                                colorTransition,
                                            })
                                        }
                                        step={0.1}
                                        min={0}
                                        max={5}
                                    />
                                </>
                            )}
                        </InspectorPanel.PanelBody>

                        <InspectorPanel.PanelBody
                            title={__(
                                "Active Colors",
                                "essential-blocks"
                            )}
                            initialOpen={false}
                        >
                            <BaseControl>
                                <ButtonGroup>
                                    {[
                                        {
                                            label: __(
                                                "Normal",
                                                "essential-blocks"
                                            ),
                                            value: "normal",
                                        },
                                        {
                                            label: __(
                                                "Hover",
                                                "essential-blocks"
                                            ),
                                            value: "hover",
                                        },
                                    ].map(
                                        (
                                            { value, label },
                                            index
                                        ) => (
                                            <Button
                                                key={index}
                                                isPrimary={
                                                    activeColorSwitcher ===
                                                    value
                                                }
                                                isSecondary={
                                                    activeColorSwitcher !==
                                                    value
                                                }
                                                onClick={() =>
                                                    setActiveColorSwitcher(
                                                        value
                                                    )
                                                }
                                            >
                                                {label}
                                            </Button>
                                        )
                                    )}
                                </ButtonGroup>
                            </BaseControl>

                            {activeColorSwitcher ===
                                "normal" && (
                                    <>
                                        <ColorControl
                                            label={__(
                                                "Text",
                                                "essential-blocks"
                                            )}
                                            defaultColor={
                                                objAttributes
                                                    .actNavDropdownTextColor
                                                    .default
                                            }
                                            color={
                                                actNavDropdownTextColor
                                            }
                                            attributeName={'actNavDropdownTextColor'}
                                        />

                                        {(preset == "preset-2" ||
                                            preset ==
                                            "preset-3") && (
                                                <ColorControl
                                                    label={__(
                                                        "Background",
                                                        "essential-blocks"
                                                    )}
                                                    defaultColor={
                                                        objAttributes
                                                            .actDropdownItemBgColor
                                                            .default
                                                    }
                                                    color={
                                                        actDropdownItemBgColor
                                                    }
                                                    attributeName={'actDropdownItemBgColor'}
                                                />
                                            )}
                                    </>
                                )}

                            {activeColorSwitcher ===
                                "hover" && (
                                    <>
                                        <ColorControl
                                            label={__(
                                                "Text",
                                                "essential-blocks"
                                            )}
                                            defaultColor={
                                                objAttributes
                                                    .actHvNavDropdownTextColor
                                                    .default
                                            }
                                            color={
                                                actHvNavDropdownTextColor
                                            }
                                            attributeName={'actHvNavDropdownTextColor'}
                                        />

                                        {(preset == "preset-2" ||
                                            preset ==
                                            "preset-3") && (
                                                <ColorControl
                                                    label={__(
                                                        "Background",
                                                        "essential-blocks"
                                                    )}
                                                    defaultColor={
                                                        objAttributes
                                                            .actHvDropdownItemBgColor
                                                            .default
                                                    }
                                                    color={
                                                        actHvDropdownItemBgColor
                                                    }
                                                    attributeName={'actHvDropdownItemBgColor'}
                                                />
                                            )}
                                    </>
                                )}
                        </InspectorPanel.PanelBody>

                        {preset == "preset-3" && (
                            <InspectorPanel.PanelBody
                                title={__("Border & Shadow", "essential-blocks")}
                                initialOpen={false}
                            >
                                <BorderShadowControl
                                    controlName={
                                        prefixDropdownItemBdShadow
                                    }
                                    noShadow
                                // noBorder
                                />
                            </InspectorPanel.PanelBody>
                        )}
                    </InspectorPanel.PanelBody>

                    {showDropdownIcon && (
                        <InspectorPanel.PanelBody
                            title={__(
                                "Caret",
                                "essential-blocks"
                            )}
                            initialOpen={false}
                        >
                            <ResponsiveRangeController
                                baseLabel={__(
                                    "Caret Size",
                                    "essential-blocks"
                                )}
                                controlName={prefixCaretSize}
                                min={0}
                                max={100}
                                step={1}
                                noUnits
                            />

                            <ColorControl
                                label={__(
                                    "Caret Color",
                                    "essential-blocks"
                                )}
                                defaultColor={
                                    objAttributes.caretColor
                                        .default
                                }
                                color={caretColor}
                                attributeName={'caretColor'}
                            />
                            <ColorControl
                                label={__(
                                    "Hover Caret Color",
                                    "essential-blocks"
                                )}
                                defaultColor={
                                    objAttributes.hvCaretColor
                                        .default
                                }
                                color={hvCaretColor}
                                attributeName={'hvCaretColor'}
                            />
                        </InspectorPanel.PanelBody>
                    )}

                    <InspectorPanel.PanelBody
                        title={__(
                            "Hamburger Menu",
                            "essential-blocks"
                        )}
                        initialOpen={false}
                    >
                        <PanelRow>
                            {__("Button", "essential-blocks")}
                        </PanelRow>

                        {navBtnType && (
                            <ResponsiveRangeController
                                baseLabel={__(
                                    "Icon Size(PX)",
                                    "essential-blocks"
                                )}
                                controlName={
                                    prefixHamburerBtnSize
                                }
                                min={0}
                                max={100}
                                step={1}
                                noUnits
                            />
                        )}

                        {!navBtnType && (
                            <TypographyDropdown
                                baseLabel={__("Typography", "essential-blocks")}
                                typographyPrefixConstant={
                                    typoPrefixHamburgerBtn
                                }
                            />
                        )}

                        <ColorControl
                            label={__(
                                "Color",
                                "essential-blocks"
                            )}
                            defaultColor={
                                objAttributes
                                    .navHamburgerBtnColor
                                    .default
                            }
                            color={navHamburgerBtnColor}
                            attributeName={'navHamburgerBtnColor'}
                        />
                        <ResponsiveDimensionsControl
                            controlName={
                                prefixHamburgerBtnPadding
                            }
                            baseLabel={__("Padding", "essential-blocks")}
                        />

                        <PanelRow>
                            {__(
                                "Container",
                                "essential-blocks"
                            )}
                        </PanelRow>

                        <ColorControl
                            label={__(
                                "Background",
                                "essential-blocks"
                            )}
                            defaultColor={
                                objAttributes
                                    .navHamburgerBgColor.default
                            }
                            color={navHamburgerBgColor}
                            attributeName={'navHamburgerBgColor'}
                        />
                        <ResponsiveDimensionsControl
                            controlName={
                                prefixNavHamburgerPadding
                            }
                            baseLabel={__("Padding", "essential-blocks")}
                        />

                        <Divider />

                        <PanelRow>
                            {__("Items", "essential-blocks")}
                        </PanelRow>
                        <TypographyDropdown
                            baseLabel={__("Typography", "essential-blocks")}
                            typographyPrefixConstant={
                                typoPrefixNavHamburger
                            }
                        />
                        <ResponsiveDimensionsControl
                            controlName={
                                prefixHamburgerItemPadding
                            }
                            baseLabel={__("Padding", "essential-blocks")}
                        />
                        <InspectorPanel.PanelBody
                            title={__(
                                "Colors",
                                "essential-blocks"
                            )}
                            initialOpen={false}
                        >
                            <BaseControl>
                                <ButtonGroup>
                                    {[
                                        {
                                            label: __(
                                                "Normal",
                                                "essential-blocks"
                                            ),
                                            value: "normal",
                                        },
                                        {
                                            label: __(
                                                "Hover",
                                                "essential-blocks"
                                            ),
                                            value: "hover",
                                        },
                                    ].map(
                                        (
                                            { value, label },
                                            index
                                        ) => (
                                            <Button
                                                key={index}
                                                // isLarge
                                                isPrimary={
                                                    colorSwitcher ===
                                                    value
                                                }
                                                isSecondary={
                                                    colorSwitcher !==
                                                    value
                                                }
                                                onClick={() =>
                                                    setColorSwitcher(
                                                        value
                                                    )
                                                }
                                            >
                                                {label}
                                            </Button>
                                        )
                                    )}
                                </ButtonGroup>
                            </BaseControl>

                            {colorSwitcher === "normal" && (
                                <>
                                    <ColorControl
                                        label={__(
                                            "Text",
                                            "essential-blocks"
                                        )}
                                        defaultColor={
                                            objAttributes
                                                .navHamburgerTextColor
                                                .default
                                        }
                                        color={
                                            navHamburgerTextColor
                                        }
                                        attributeName={'navHamburgerTextColor'}
                                    />

                                    <ColorControl
                                        label={__(
                                            "Background",
                                            "essential-blocks"
                                        )}
                                        defaultColor={
                                            objAttributes
                                                .hamburgerItemBgColor
                                                .default
                                        }
                                        color={
                                            hamburgerItemBgColor
                                        }
                                        attributeName={'hamburgerItemBgColor'}
                                    />
                                </>
                            )}

                            {colorSwitcher === "hover" && (
                                <>
                                    <ColorControl
                                        label={__(
                                            "Text",
                                            "essential-blocks"
                                        )}
                                        defaultColor={
                                            objAttributes
                                                .hvNavHamburgerTextColor
                                                .default
                                        }
                                        color={
                                            hvNavHamburgerTextColor
                                        }
                                        attributeName={'hvNavHamburgerTextColor'}
                                    />

                                    <ColorControl
                                        label={__(
                                            "Background",
                                            "essential-blocks"
                                        )}
                                        defaultColor={
                                            objAttributes
                                                .hvHamburgerItemBgColor
                                                .default
                                        }
                                        color={
                                            hvHamburgerItemBgColor
                                        }
                                        attributeName={'hvHamburgerItemBgColor'}
                                    />
                                </>
                            )}
                        </InspectorPanel.PanelBody>

                        <InspectorPanel.PanelBody
                            title={__("Border", "essential-blocks")}
                            initialOpen={false}
                        >
                            <BorderShadowControl
                                controlName={
                                    prefixHamburgerItemBdShadow
                                }
                                noShadow
                                noBdrHover
                            // noBorder
                            />
                        </InspectorPanel.PanelBody>

                        <Divider />

                        <PanelRow>
                            {__(
                                "Close Icon",
                                "essential-blocks"
                            )}
                        </PanelRow>
                        <ColorControl
                            label={__(
                                "Color",
                                "essential-blocks"
                            )}
                            defaultColor={
                                objAttributes
                                    .hamburgerCloseIconColor
                                    .default
                            }
                            color={hamburgerCloseIconColor}
                            attributeName={'hamburgerCloseIconColor'}
                        />
                        <BaseControl
                            label={__(
                                "Alignment",
                                "essential-blocks"
                            )}
                        >
                            <ButtonGroup id="eb-button-group-alignment">
                                {CLOSE_ICON_ALIGN.map(
                                    (item, index) => (
                                        <Button
                                            key={index}
                                            isPrimary={
                                                hamburgerCloseIconAlign ===
                                                item.value
                                            }
                                            isSecondary={
                                                hamburgerCloseIconAlign !==
                                                item.value
                                            }
                                            onClick={() =>
                                                setAttributes({
                                                    hamburgerCloseIconAlign:
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
                    </InspectorPanel.PanelBody>
                </>
            </InspectorPanel.Style>
        </InspectorPanel>
    );
}
export default Inspector;
