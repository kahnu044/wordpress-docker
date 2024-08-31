/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
    SelectControl,
    ButtonGroup,
    Button,
    BaseControl,
    ToggleControl,
} from "@wordpress/components";

/**
 * Internal Dependencies
 */
import {
    CONTENT_STYLES,
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
} from "./constants";
import {
    typoPrefix_title,
    typoPrefix_subtitle,
    typoPrefix_desc,
    typoPrefix_btn,
} from "./typographyPrefixConstants";

import objAttributes from "./attributes";

import {
    ColorControl,
    ResponsiveDimensionsControl,
    TypographyDropdown,
    BorderShadowControl,
    ResponsiveRangeController,
    EBIconPicker,
    DynamicInputControl,
    SortControl,
    InspectorPanel
} from "@essential-blocks/controls";

const Inspector = ({ attributes, setAttributes }) => {
    const {
        resOption,
        contentStyle,
        showIcon,
        icon,
        iconColor,
        title,
        titleTag,
        titleColor,
        showSubtitle,
        subtitle,
        subtitleColor,
        sortableLists,
        description,
        descriptionColor,
        showButton,
        buttonSize,
        buttonBackgroundColor,
        buttonTextColor,
        buttonHoverTextColor,
        buttonHoverBackgroundColor,
        buttonText,
        buttonURL,
        linkNewTab,
        buttonPosition,
        btnHoverEffect,
    } = attributes;

    return (
        <InspectorPanel advancedControlProps={{
            marginPrefix: WRAPPER_MARGIN,
            paddingPrefix: WRAPPER_PADDING,
            backgroundPrefix: WRAPPER_BACK,
            borderPrefix: WRAPPER_BORDER,
            hasMargin: true
        }}>
            <InspectorPanel.General>
                <>
                    <InspectorPanel.PanelBody
                        title={__(
                            "Content Settings",
                            "essential-blocks"
                        )}
                        initialOpen={true}
                    >
                        <SelectControl
                            label={__(
                                "Content Style",
                                "essential-blocks"
                            )}
                            value={contentStyle}
                            options={CONTENT_STYLES}
                            onChange={(newStyle) =>
                                setAttributes({
                                    contentStyle: newStyle,
                                })
                            }
                        />
                        <ToggleControl
                            label={__(
                                "Show Subtitle",
                                "essential-blocks"
                            )}
                            checked={showSubtitle}
                            onChange={() =>
                                setAttributes({
                                    showSubtitle: !showSubtitle,
                                })
                            }
                        />
                        <ToggleControl
                            label={__(
                                "Show Icon",
                                "essential-blocks"
                            )}
                            checked={showIcon}
                            onChange={() =>
                                setAttributes({
                                    showIcon: !showIcon,
                                })
                            }
                        />
                        <ToggleControl
                            label={__(
                                "Show Button",
                                "essential-blocks"
                            )}
                            checked={showButton}
                            onChange={() =>
                                setAttributes({
                                    showButton: !showButton,
                                })
                            }
                        />
                        <DynamicInputControl
                            label={__("Title", "essential-blocks")}
                            attrName="title"
                            inputValue={title}
                            setAttributes={setAttributes}
                            onChange={(text) => setAttributes({ title: text })}
                        />
                        {showSubtitle && (
                            <>
                                <DynamicInputControl
                                    label={__("Subtitle", "essential-blocks")}
                                    attrName="subtitle"
                                    inputValue={subtitle}
                                    setAttributes={setAttributes}
                                    onChange={(text) => setAttributes({ subtitle: text })}
                                />
                            </>
                        )}
                        <DynamicInputControl
                            label={__("Description", "essential-blocks")}
                            attrName="description"
                            inputValue={description}
                            setAttributes={setAttributes}
                            onChange={(text) => setAttributes({ description: text })}
                            isTextarea={true}
                        />
                        <BaseControl>
                            <h3 className="eb-control-title">
                                {__(
                                    "Sorting",
                                    "essential-blocks"
                                )}
                            </h3>
                        </BaseControl>

                        <SortControl
                            items={sortableLists}
                            labelKey={'label'}
                            onSortEnd={sortableLists => setAttributes({ sortableLists })}
                            hasSettings={false}
                            hasAddButton={false}
                            hasDelete={false}
                        ></SortControl>

                    </InspectorPanel.PanelBody>
                    {showIcon && (
                        <InspectorPanel.PanelBody
                            title={__(
                                "Icon Settings",
                                "essential-blocks"
                            )}
                            initialOpen={false}
                        >
                            <BaseControl>
                                <EBIconPicker
                                    value={icon}
                                    attributeName={'icon'}
                                />
                            </BaseControl>
                            <ResponsiveRangeController
                                baseLabel={__(
                                    "Size",
                                    "essential-blocks"
                                )}
                                controlName={ICON_SIZE}
                                min={0}
                                max={100}
                                step={1}
                                noUnits
                            />
                        </InspectorPanel.PanelBody>
                    )}

                    {showButton && (
                        <InspectorPanel.PanelBody
                            title={__(
                                "Button Settings",
                                "essential-blocks"
                            )}
                            initialOpen={false}
                        >
                            <BaseControl
                                label={__(
                                    "Alignment",
                                    "essential-blocks"
                                )}
                                id="eb-button-group-alignment"
                            >
                                <ButtonGroup id="eb-button-group-alignment">
                                    {BUTTON_POSITION.map(
                                        (item, index) => (
                                            <Button
                                                key={index}
                                                isPrimary={
                                                    buttonPosition ===
                                                    item.value
                                                }
                                                isSecondary={
                                                    buttonPosition !==
                                                    item.value
                                                }
                                                onClick={() =>
                                                    setAttributes(
                                                        {
                                                            buttonPosition:
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
                            <SelectControl
                                label={__(
                                    "Button Size",
                                    "essential-blocks"
                                )}
                                value={buttonSize}
                                options={BUTTON_SIZES}
                                onChange={(newButtonSize) =>
                                    setAttributes({
                                        buttonSize: newButtonSize,
                                    })
                                }
                            />
                            {buttonSize === "custom" && (
                                <ResponsiveDimensionsControl
                                    controlName={BUTTON_PADDING}
                                    baseLabel={__(
                                        "Padding",
                                        "essential-blocks"
                                    )}
                                />
                            )}
                            <DynamicInputControl
                                label={__("Button Text", "essential-blocks")}
                                attrName="buttonText"
                                inputValue={buttonText}
                                setAttributes={setAttributes}
                                onChange={(text) => setAttributes({ buttonText: text })}
                            />
                            <DynamicInputControl
                                label={__("Button Link", "essential-blocks")}
                                attrName="buttonURL"
                                inputValue={buttonURL}
                                setAttributes={setAttributes}
                                onChange={(text) => setAttributes({ buttonURL: text })}
                                help={__(
                                    "Use https or http",
                                    "essential-blocks"
                                )}
                            />
                            {buttonURL && (
                                <ToggleControl
                                    label={__(
                                        "Open in New Tab",
                                        "essential-blocks"
                                    )}
                                    checked={linkNewTab}
                                    onChange={() =>
                                        setAttributes({
                                            linkNewTab: !linkNewTab,
                                        })
                                    }
                                />
                            )}

                            <SelectControl
                                label={__(
                                    "Hover Effect",
                                    "essential-blocks"
                                )}
                                value={btnHoverEffect}
                                options={HOVER_EFFECT}
                                onChange={(newHoverEffect) =>
                                    setAttributes({
                                        btnHoverEffect: newHoverEffect,
                                    })
                                }
                            />
                        </InspectorPanel.PanelBody>
                    )}
                </>
            </InspectorPanel.General>
            <InspectorPanel.Style>
                <>
                    <InspectorPanel.PanelBody
                        title={__("Title", "essential-blocks")}
                        initialOpen={true}
                    >
                        <BaseControl
                            label={__(
                                "Title Tag",
                                "essential-blocks"
                            )}
                        >
                            <ButtonGroup>
                                {HEADER_TAGS.map(
                                    (header, index) => (
                                        <Button
                                            key={index}
                                            isSecondary={
                                                titleTag !==
                                                header.value
                                            }
                                            isPrimary={
                                                titleTag ===
                                                header.value
                                            }
                                            onClick={() =>
                                                setAttributes({
                                                    titleTag:
                                                        header.value,
                                                })
                                            }
                                        >
                                            {header.label}
                                        </Button>
                                    )
                                )}
                            </ButtonGroup>
                        </BaseControl>
                        <TypographyDropdown
                            baseLabel={__(
                                "Typography",
                                "essential-blocks"
                            )}
                            typographyPrefixConstant={
                                typoPrefix_title
                            }
                        />
                        <ColorControl
                            label={__(
                                "Color",
                                "essential-blocks"
                            )}
                            color={titleColor}
                            attributeName={'titleColor'}
                        />
                        <ResponsiveDimensionsControl
                            controlName={TITLE_MARGIN}
                            baseLabel={__(
                                "Space",
                                "essential-blocks"
                            )}
                        />
                    </InspectorPanel.PanelBody>
                    {showSubtitle && (
                        <InspectorPanel.PanelBody
                            title={__(
                                "Subtitle",
                                "essential-blocks"
                            )}
                            initialOpen={false}
                        >
                            <TypographyDropdown
                                baseLabel={__(
                                    "Typography",
                                    "essential-blocks"
                                )}
                                typographyPrefixConstant={
                                    typoPrefix_subtitle
                                }
                            />
                            <ColorControl
                                label={__(
                                    "Color",
                                    "essential-blocks"
                                )}
                                color={subtitleColor}
                                attributeName={'subtitleColor'}
                            />
                            <ResponsiveDimensionsControl
                                controlName={SUBTITLE_MARGIN}
                                baseLabel={__(
                                    "Space",
                                    "essential-blocks"
                                )}
                            />
                        </InspectorPanel.PanelBody>
                    )}
                    <InspectorPanel.PanelBody
                        title={__(
                            "Description",
                            "essential-blocks"
                        )}
                        initialOpen={false}
                    >
                        <TypographyDropdown
                            baseLabel={__(
                                "Typography",
                                "essential-blocks"
                            )}
                            typographyPrefixConstant={
                                typoPrefix_desc
                            }
                        />
                        <ColorControl
                            label={__(
                                "Color",
                                "essential-blocks"
                            )}
                            color={descriptionColor}
                            attributeName={'descriptionColor'}
                        />
                        <ResponsiveDimensionsControl
                            controlName={DESC_PADDING}
                            baseLabel={__(
                                "Space",
                                "essential-blocks"
                            )}
                        />
                    </InspectorPanel.PanelBody>
                    {showIcon && (
                        <InspectorPanel.PanelBody
                            title={__(
                                "Icon",
                                "essential-blocks"
                            )}
                            initialOpen={false}
                        >
                            <ColorControl
                                label={__(
                                    "Icon Color",
                                    "essential-blocks"
                                )}
                                color={iconColor}
                                attributeName={'iconColor'}
                            />
                            <ResponsiveDimensionsControl
                                controlName={ICON_PADDING}
                                baseLabel={__(
                                    "Space",
                                    "essential-blocks"
                                )}
                            />
                        </InspectorPanel.PanelBody>
                    )}
                    {showButton && (
                        <InspectorPanel.PanelBody
                            title={__(
                                "Button",
                                "essential-blocks"
                            )}
                            initialOpen={false}
                        >
                            <TypographyDropdown
                                baseLabel={__(
                                    "Typography",
                                    "essential-blocks"
                                )}
                                typographyPrefixConstant={
                                    typoPrefix_btn
                                }
                            />
                            <ColorControl
                                label={__(
                                    "Button Text Color",
                                    "essential-blocks"
                                )}
                                color={buttonTextColor}
                                attributeName={'buttonTextColor'}
                            />
                            <ColorControl
                                label={__(
                                    "Button Hover Text Color",
                                    "essential-blocks"
                                )}
                                color={buttonHoverTextColor}
                                attributeName={'buttonHoverTextColor'}
                            />
                            <ColorControl
                                label={__(
                                    "Button Background",
                                    "essential-blocks"
                                )}
                                color={buttonBackgroundColor}
                                attributeName={'buttonBackgroundColor'}
                            />
                            <ColorControl
                                label={__(
                                    "Button Hover Background",
                                    "essential-blocks"
                                )}
                                color={
                                    buttonHoverBackgroundColor
                                }
                                attributeName={'buttonHoverBackgroundColor'}
                            />
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
                        </InspectorPanel.PanelBody>
                    )}
                </>
            </InspectorPanel.Style>
        </InspectorPanel>
    );
};

export default Inspector;
