/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useEffect, useState } from "@wordpress/element";
import {
    PanelBody,
    SelectControl,
    ButtonGroup,
    Button,
    BaseControl,
    TextControl,
    ToggleControl,
} from "@wordpress/components";

import {
    ColorControl,
    ResponsiveDimensionsControl,
    TypographyDropdown,
    BackgroundControl,
    BorderShadowControl,
    ResponsiveRangeController,
    EBIconPicker,
    useBlockDefaults,
    withBlockContext
} from "@essential-blocks/controls";

/**
 * Internal depencencies
 */
import {
    HEADER_TAGS,
    BUTTON_SIZES,
    WRAPPER_MARGIN,
    WRAPPER_PADDING,
    TITLE_MARGIN,
    SUBTITLE_MARGIN,
    WRAPPER_BACK,
    WRAPPER_BORDER,
    BUTTON_BORDER,
    ICON_SIZE,
    BUTTON_PADDING,
    ICON_PADDING,
    DESC_PADDING,
    BUTTON_POSITION,
    HOVER_EFFECT,
} from "@essential-blocks/blocks/call-to-action/src/components/constants";

import {
    typoPrefix_title,
    typoPrefix_subtitle,
    typoPrefix_desc,
    typoPrefix_btn,
} from "@essential-blocks/blocks/call-to-action/src/components/typographyPrefixConstants";

import objAttributes from "@essential-blocks/blocks/call-to-action/src/components/attributes";

function CallToAction(props) {
    const { blockDefaults, setBlockDefaults, name, deviceType, handleBlockDefault } = props;

    const {
        showIcon,
        icon,
        iconColor,
        titleTag,
        titleColor,
        showSubtitle,
        subtitleColor,
        descriptionColor,
        showButton,
        buttonSize,
        buttonBackgroundColor,
        buttonTextColor,
        buttonHoverTextColor,
        buttonHoverBackgroundColor,
        buttonURL,
        linkNewTab,
        buttonPosition,
        btnHoverEffect,
    } = blockDefaults;

    const isDefaultSet = useBlockDefaults(name, blockDefaults, setBlockDefaults, objAttributes)

    return (
        <>
            {isDefaultSet && (
                <div className="eb-panel-control">
                    {showIcon && (
                        <PanelBody title={__("Icon Settings", "essential-blocks")} initialOpen={true}>
                            <EBIconPicker
                                value={icon}
                                onChange={(icon) => handleBlockDefault({ icon })}
                            />
                            <ResponsiveRangeController
                                baseLabel={__("Size", "essential-blocks")}
                                controlName={ICON_SIZE}
                                min={0}
                                max={100}
                                step={1}
                                noUnits
                            />
                        </PanelBody>
                    )}

                    <PanelBody title={__("Button Settings", "essential-blocks")} initialOpen={false}>
                        <BaseControl label={__("Alignment", "essential-blocks")} id="eb-button-group-alignment">
                            <ButtonGroup id="eb-button-group-alignment">
                                {BUTTON_POSITION.map((item, index) => (
                                    <Button
                                        key={index}
                                        isPrimary={buttonPosition === item.value}
                                        isSecondary={buttonPosition !== item.value}
                                        onClick={() =>
                                            handleBlockDefault({
                                                buttonPosition: item.value,
                                            })
                                        }
                                    >
                                        {item.label}
                                    </Button>
                                ))}
                            </ButtonGroup>
                        </BaseControl>
                        <SelectControl
                            label={__("Button Size", "essential-blocks")}
                            value={buttonSize}
                            options={BUTTON_SIZES}
                            onChange={(newButtonSize) =>
                                handleBlockDefault({
                                    buttonSize: newButtonSize,
                                })
                            }
                        />
                        {buttonSize === "custom" && (
                            <ResponsiveDimensionsControl
                                controlName={BUTTON_PADDING}
                                baseLabel={__("Padding", "essential-blocks")}
                            />
                        )}
                        <TextControl
                            label={__("Button Link", "essential-blocks")}
                            value={buttonURL}
                            help={__("Use https or http", "essential-blocks")}
                            onChange={(link) => handleBlockDefault({ buttonURL: link })}
                        />
                        {buttonURL && (
                            <ToggleControl
                                label={__("Open in New Tab", "essential-blocks")}
                                checked={linkNewTab}
                                onChange={() =>
                                    handleBlockDefault({
                                        linkNewTab: !linkNewTab,
                                    })
                                }
                            />
                        )}

                        <SelectControl
                            label={__("Hover Effect", "essential-blocks")}
                            value={btnHoverEffect}
                            options={HOVER_EFFECT}
                            onChange={(newHoverEffect) =>
                                handleBlockDefault({
                                    btnHoverEffect: newHoverEffect,
                                })
                            }
                        />
                    </PanelBody>
                    <PanelBody title={__("Title Style", "essential-blocks")} initialOpen={false}>
                        <BaseControl label={__("Title Tag", "essential-blocks")}>
                            <ButtonGroup>
                                {HEADER_TAGS.map((header, index) => (
                                    <Button
                                        key={index}
                                        isSecondary={titleTag !== header.value}
                                        isPrimary={titleTag === header.value}
                                        onClick={() =>
                                            handleBlockDefault({
                                                titleTag: header.value,
                                            })
                                        }
                                    >
                                        {header.label}
                                    </Button>
                                ))}
                            </ButtonGroup>
                        </BaseControl>
                        <TypographyDropdown
                            baseLabel={__("Typography", "essential-blocks")}
                            typographyPrefixConstant={typoPrefix_title}
                        />
                        <ColorControl
                            label={__("Color", "essential-blocks")}
                            color={titleColor}
                            onChange={(titleColor) => handleBlockDefault({ titleColor })}
                        />
                        <ResponsiveDimensionsControl
                            controlName={TITLE_MARGIN}
                            baseLabel={__("Space", "essential-blocks")}
                        />
                    </PanelBody>
                    {showSubtitle && (
                        <PanelBody title={__("Subtitle Style", "essential-blocks")} initialOpen={false}>
                            <TypographyDropdown
                                baseLabel={__("Typography", "essential-blocks")}
                                typographyPrefixConstant={typoPrefix_subtitle}
                            />
                            <ColorControl
                                label={__("Color", "essential-blocks")}
                                color={subtitleColor}
                                onChange={(subtitleColor) => handleBlockDefault({ subtitleColor })}
                            />
                            <ResponsiveDimensionsControl
                                controlName={SUBTITLE_MARGIN}
                                baseLabel={__("Space", "essential-blocks")}
                            />
                        </PanelBody>
                    )}
                    <PanelBody title={__("Description Style", "essential-blocks")} initialOpen={false}>
                        <TypographyDropdown
                            baseLabel={__("Typography", "essential-blocks")}
                            typographyPrefixConstant={typoPrefix_desc}
                        />
                        <ColorControl
                            label={__("Color", "essential-blocks")}
                            color={descriptionColor}
                            onChange={(descriptionColor) => handleBlockDefault({ descriptionColor })}
                        />
                        <ResponsiveDimensionsControl
                            controlName={DESC_PADDING}
                            baseLabel={__("Space", "essential-blocks")}
                        />
                    </PanelBody>
                    {showIcon && (
                        <PanelBody title={__("Icon Style", "essential-blocks")} initialOpen={false}>
                            <ColorControl
                                label={__("Icon Color", "essential-blocks")}
                                color={iconColor}
                                onChange={(iconColor) => handleBlockDefault({ iconColor })}
                            />
                            <ResponsiveDimensionsControl
                                controlName={ICON_PADDING}
                                baseLabel={__("Space", "essential-blocks")}
                            />
                        </PanelBody>
                    )}
                    {showButton && (
                        <PanelBody title={__("Button Style", "essential-blocks")} initialOpen={false}>
                            <TypographyDropdown
                                baseLabel={__("Typography", "essential-blocks")}
                                typographyPrefixConstant={typoPrefix_btn}
                            />
                            <ColorControl
                                label={__("Button Text Color", "essential-blocks")}
                                color={buttonTextColor}
                                onChange={(buttonTextColor) => handleBlockDefault({ buttonTextColor })}
                            />
                            <ColorControl
                                label={__("Button Hover Text Color", "essential-blocks")}
                                color={buttonHoverTextColor}
                                onChange={(buttonHoverTextColor) => handleBlockDefault({ buttonHoverTextColor })}
                            />
                            <ColorControl
                                label={__("Button Background", "essential-blocks")}
                                color={buttonBackgroundColor}
                                onChange={(buttonBackgroundColor) =>
                                    handleBlockDefault({
                                        buttonBackgroundColor,
                                    })
                                }
                            />
                            <ColorControl
                                label={__("Button Hover Background", "essential-blocks")}
                                color={buttonHoverBackgroundColor}
                                onChange={(buttonHoverBackgroundColor) =>
                                    handleBlockDefault({
                                        buttonHoverBackgroundColor,
                                    })
                                }
                            />
                            <BaseControl>
                                <h3 className="eb-control-title">{__("Border", "essential-blocks")}</h3>
                            </BaseControl>
                            <BorderShadowControl controlName={BUTTON_BORDER} />
                        </PanelBody>
                    )}

                    <PanelBody title={__("Advanced", "essential-blocks")} initialOpen={true}>
                        <PanelBody>
                            <ResponsiveDimensionsControl
                                controlName={WRAPPER_MARGIN}
                                baseLabel={__("Margin", "essential-blocks")}
                            />
                            <ResponsiveDimensionsControl
                                controlName={WRAPPER_PADDING}
                                baseLabel={__("Padding", "essential-blocks")}
                            />
                        </PanelBody>
                        <PanelBody title={__("Background", "essential-blocks")} initialOpen={false}>
                            <BackgroundControl controlName={WRAPPER_BACK}  />
                        </PanelBody>
                        <PanelBody title={__("Border", "essential-blocks")} initialOpen={false}>
                            <BorderShadowControl controlName={WRAPPER_BORDER}  />
                        </PanelBody>
                    </PanelBody>
                </div>
            )}
        </>
    );
}

export default withBlockContext(objAttributes)(CallToAction);
