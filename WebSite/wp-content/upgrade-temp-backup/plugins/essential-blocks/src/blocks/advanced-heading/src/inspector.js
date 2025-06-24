/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
    PanelBody,
    SelectControl,
    ToggleControl,
    Button,
    ButtonGroup,
    BaseControl,
    RangeControl
} from "@wordpress/components";
import { useState, useEffect } from "@wordpress/element";
import { applyFilters } from "@wordpress/hooks";

/**
 * Internal depencencies
 */
import {
    WRAPPER_BG,
    WRAPPER_MARGIN,
    WRAPPER_PADDING,
    WRAPPER_BORDER_SHADOW,
    TITLE_MARGIN,
    TITLE1_PADDING,
    TITLE1_BORDER_SHADOW,
    TITLE2_PADDING,
    TITLE2_BORDER_SHADOW,
    TITLE3_PADDING,
    TITLE3_BORDER_SHADOW,
    SUBTITLE_MARGIN,
    SEPARATOR_MARGIN,
    SEPARATOR_LINE_SIZE,
    SEPARATOR_ICON_SIZE,
    SEPARATOR_WIDTH,
    SEPARATOR_POSITION,
    UNIT_TYPES,
    SEPARATOR_UNIT_TYPES,
    PRESETS,
    TEXT_ALIGN,
    ALIGNMENT,
    HEADING,
    SEPERATOR_STYLES,
    SEPARATOR_TYPE,
    SOURCE,
    EFFECTS
} from "./constants/constants";
import { TITLE_TYPOGRAPHY, TITLE2_TYPOGRAPHY, TITLE3_TYPOGRAPHY, SUBTITLE_TYPOGRAPHY } from "./constants/typographyPrefixConstants";
import {
    ResponsiveDimensionsControl,
    TypographyDropdown,
    BorderShadowControl,
    ResponsiveRangeController,
    ResponsiveAlignControl,
    DynamicInputControl,
    ColorControl,
    EBIconPicker,
    InspectorPanel,
    isGradientColor,
    sanitizeURL
} from '@essential-blocks/controls';
import { PanelRow } from "@wordpress/components";

function Inspector(props) {
    const { attributes, setAttributes } = props;
    const {
        resOption,
        preset,
        effects,
        marqueeSpeed,
        marqueePauseOnHover,
        tagName,
        titleText,
        title2Text,
        title3Text,
        subtitleTagName,
        subtitleText,
        displaySubtitle,
        displaySeperator,
        titleColor,
        titleHoverColor,
        titleBgColor,
        titleHoverBgColor,
        title2Color,
        title2HoverColor,
        title2BgColor,
        title2HoverBgColor,
        title3Color,
        title3HoverColor,
        title3BgColor,
        title3HoverBgColor,
        subtitleColor,
        subtitleHoverColor,
        separatorColor,
        separatorHoverColor,
        seperatorPosition,
        seperatorType,
        seperatorStyle,
        separatorIcon,
        source,
        enableLink,
        titleLink,
        openInNewTab
    } = attributes;

    const [ urlError, setUrlError ] = useState("");

    const changePreset = (selected) => {
        switch (selected) {
            case "preset-0":
                setAttributes({
                    preset: selected,
                    displaySubtitle: false,
                    displaySeperator: false,
                    align: "left",
                    titleColor: "#551ef7",
                    subtitleColor: "#555555",
                    separatorColor: "#551ef7",
                    seperatorType: "line",
                    wrpPaddingisLinked: true,
                    wrpPaddingUnit: "px",
                    wrpPaddingTop: "0",
                    wrpPaddingBottom: "0",
                    wrpPaddingLeft: "0",
                    wrpPaddingRight: "0",
                    wrprBgbackgroundColor: "rgba(255,255,255,1)",
                    wrprBgbackgroundType: "classic",
                });
                break;
            case "preset-1":
                setAttributes({
                    preset: selected,
                    displaySubtitle: true,
                    displaySeperator: true,
                    align: "left",
                    titleColor: "#551ef7",
                    subtitleColor: "#555555",
                    separatorColor: "#551ef7",
                    seperatorType: "line",
                    wrpPaddingisLinked: false,
                    wrpPaddingUnit: "px",
                    wrpPaddingTop: "0",
                    wrpPaddingBottom: "0",
                    wrpPaddingLeft: "0",
                    wrpPaddingRight: "0",
                    wrprBgbackgroundColor: "rgba(255,255,255,1)",
                    wrprBgbackgroundType: "classic",
                });
                break;
            case "preset-2":
                setAttributes({
                    preset: selected,
                    displaySubtitle: true,
                    displaySeperator: true,
                    align: "center",
                    titleColor: "#551ef7",
                    subtitleColor: "#555555",
                    separatorColor: "#551ef7",
                    seperatorType: "icon",
                    separatorIcon: "fas fa-bullhorn",
                    wrpPaddingisLinked: false,
                    wrpPaddingUnit: "px",
                    wrpPaddingTop: "0",
                    wrpPaddingBottom: "0",
                    wrpPaddingLeft: "0",
                    wrpPaddingRight: "0",
                    wrprBgbackgroundColor: "rgba(255,255,255,1)",
                    wrprBgbackgroundType: "classic",
                });
                break;
            case "preset-3":
                setAttributes({
                    preset: selected,
                    displaySubtitle: true,
                    displaySeperator: true,
                    align: "center",
                    titleColor: "#551ef7",
                    subtitleColor: "#9b51e0",
                    separatorColor: "#551ef7",
                    seperatorType: "icon",
                    separatorIcon: "fas fa-exchange-alt",
                    wrpPaddingisLinked: false,
                    wrpPaddingUnit: "px",
                    wrpPaddingTop: "30",
                    wrpPaddingBottom: "30",
                    wrpPaddingLeft: "15",
                    wrpPaddingRight: "15",
                    wrprBgbackgroundColor: "rgba(206,190,255,1)",
                    wrprBgbackgroundType: "classic",
                });
                break;
            default:
                return false;
        }
    };

    const changeSource = (selected) => {
        switch (selected) {
            case "custom":
                setAttributes({
                    source: selected,
                    displaySubtitle: false,

                });
                break;
            case "dynamic-title":
                setAttributes({
                    source: selected,
                    displaySubtitle: false,
                });
                break;
            default:
                return false;
        }
    };

    const onUrlBlur = (link) => {
        if (link === "" || sanitizeURL(link) !== "#") {
            setUrlError("");
        } else {
            setUrlError(
                __(
                    "Invalid URL. Please include http:// or https://",
                    "essential-blocks",
                ),
            );
        }
    };

    return (
        <InspectorPanel advancedControlProps={{
            marginPrefix: WRAPPER_MARGIN,
            paddingPrefix: WRAPPER_PADDING,
            backgroundPrefix: WRAPPER_BG,
            borderPrefix: WRAPPER_BORDER_SHADOW,
            hasMargin: true
        }}>
            <InspectorPanel.General>
                <PanelBody title={__("General", "essential-blocks")} initialOpen={true}>
                    <SelectControl
                        label={__("Source", "essential-blocks")}
                        value={source}
                        options={SOURCE}
                        onChange={(selected) => changeSource(selected)}
                    />
                    <SelectControl
                        label={__("Preset Designs", "essential-blocks")}
                        value={preset}
                        options={applyFilters("eb_advanced_heading_preset", PRESETS)}
                        onChange={(selected) => changePreset(selected)}
                    />
                    <SelectControl
                        label={__("Effects", "essential-blocks")}
                        value={effects}
                        options={applyFilters("eb_advanced_heading_effects", EFFECTS)}
                        onChange={(selected) => setAttributes({ effects: selected })}
                    />

                    {effects === 'marquee' && (
                        <>
                            <RangeControl
                                initialPosition={50}
                                label="Marquee Speed"
                                value={marqueeSpeed}
                                max={100}
                                min={0}
                                step={1}
                                onChange={(value) => setAttributes({ marqueeSpeed: value })}
                            />

                            <ToggleControl
                                label={__("Marquee Pause on Hover", "essential-blocks")}
                                checked={marqueePauseOnHover}
                                onChange={() => setAttributes({ marqueePauseOnHover: !marqueePauseOnHover })}
                            />
                        </>
                    )}

                    <ResponsiveAlignControl
                        baseLabel={__("Alignment", "essential-blocks")}
                        controlName={ALIGNMENT}
                        options={TEXT_ALIGN}
                        resOption={resOption}
                    />

                    <BaseControl
                        label={__("Title Level", "essential-blocks")}
                        id="eb-advance-heading-alignment"
                    >
                        <ButtonGroup className="eb-advance-heading-alignment eb-html-tag-buttongroup">
                            {HEADING.map((item, key) => (
                                <Button
                                    key={key}
                                    // isLarge
                                    isPrimary={tagName === item.value}
                                    isSecondary={tagName !== item.value}
                                    onClick={() => setAttributes({ tagName: item.value })}
                                >
                                    {item.label}
                                </Button>
                            ))}
                        </ButtonGroup>
                    </BaseControl>

                    {source == 'custom' && (
                        <>
                            <DynamicInputControl
                                label="Title Text (First)"
                                attrName="titleText"
                                inputValue={titleText}
                                setAttributes={setAttributes}
                                onChange={(text) => setAttributes({ titleText: text })}
                            />

                            <DynamicInputControl
                                label="Title Text (Second)"
                                attrName="title2Text"
                                inputValue={title2Text}
                                setAttributes={setAttributes}
                                onChange={(text) => setAttributes({ title2Text: text })}
                            />


                            <DynamicInputControl
                                label="Title Text (Third)"
                                attrName="title3Text"
                                inputValue={title3Text}
                                setAttributes={setAttributes}
                                onChange={(text) => setAttributes({ title3Text: text })}
                            />

                            <ToggleControl
                                label={__("Display Subtilte", "essential-blocks")}
                                checked={displaySubtitle}
                                onChange={() => setAttributes({ displaySubtitle: !displaySubtitle })}
                            />
                        </>
                    )}

                    {source == 'custom' && displaySubtitle && (
                        <>
                            <BaseControl
                                label={__("Subtitle Level", "essential-blocks")}
                                id="eb-advance-heading-alignment"
                            >
                                <ButtonGroup className="eb-advance-heading-alignment eb-html-tag-buttongroup">
                                    {HEADING.map((item, key) => (
                                        <Button
                                            key={key}
                                            // isLarge
                                            isPrimary={subtitleTagName === item.value}
                                            isSecondary={subtitleTagName !== item.value}
                                            onClick={() =>
                                                setAttributes({ subtitleTagName: item.value })
                                            }
                                        >
                                            {item.label}
                                        </Button>
                                    ))}
                                </ButtonGroup>
                            </BaseControl>
                            <DynamicInputControl
                                label="Subtitle Text"
                                attrName="subtitleText"
                                inputValue={subtitleText}
                                setAttributes={setAttributes}
                                onChange={(text) => setAttributes({ subtitleText: text })}
                            />
                        </>
                    )}
                    <ToggleControl
                        label={__("Display Separator", "essential-blocks")}
                        checked={displaySeperator}
                        onChange={() => setAttributes({ displaySeperator: !displaySeperator })}
                    />

                    <ToggleControl
                        label={__("Enable Link for Heading?", "essential-blocks")}
                        checked={enableLink}
                        onChange={(enableLink) => setAttributes({ enableLink })}
                    />

                    {source === 'custom' && enableLink && (
                        <>
                            <DynamicInputControl
                                label={__(
                                    "Link",
                                    "essential-blocks"
                                )}
                                attrName="titleLink"
                                inputValue={titleLink}
                                setAttributes={
                                    setAttributes
                                }
                                onChange={(link) =>
                                    setAttributes({
                                        titleLink: link,
                                    })
                                }
                                onBlur={(link) => onUrlBlur(link)}
                                help={__("Use http:// or https://", "essential-blocks")}
                            />
                            {urlError && <span className="eb-alert-error">{urlError}</span>}
                        </>
                    )}
                    {enableLink && (
                        <ToggleControl
                            label={__("Link open in New Tab", "essential-blocks")}
                            checked={openInNewTab}
                            onChange={(openInNewTab) =>
                                setAttributes({
                                    openInNewTab,
                                })
                            }
                        />
                    )}
                </PanelBody>
            </InspectorPanel.General>
            <InspectorPanel.Style>
                <PanelBody title={__("Title", "essential-blocks")} initialOpen={true}>
                    <PanelRow className="separator">First Heading</PanelRow>
                    <TypographyDropdown
                        baseLabel={__("Typography", "essential-blocks")}
                        typographyPrefixConstant={TITLE_TYPOGRAPHY}
                    />
                    <ColorControl
                        label={__("Text Color", "essential-blocks")}
                        color={titleColor}
                        attributeName={'titleColor'}
                        isGradient={true}
                    />
                    <ColorControl
                        label={__("Hover Text Color", "essential-blocks")}
                        color={titleHoverColor}
                        attributeName={'titleHoverColor'}
                        isGradient={true}
                    />

                    {!isGradientColor(titleColor) && (
                        <ColorControl
                            label={__("Background Color", "essential-blocks")}
                            color={titleBgColor}
                            attributeName={'titleBgColor'}
                            isGradient={true}
                        />
                    )}

                    {!isGradientColor(titleHoverColor) && (
                        <ColorControl
                            label={__("Hover Background Color", "essential-blocks")}
                            color={titleHoverBgColor}
                            attributeName={'titleHoverBgColor'}
                            isGradient={true}
                        />
                    )}

                    < ResponsiveDimensionsControl
                        controlName={TITLE1_PADDING}
                        baseLabel="Padding"
                    />
                    <BorderShadowControl
                        controlName={TITLE1_BORDER_SHADOW}
                    />
                    {title2Text && title2Text.length > 0 && (
                        <>
                            <PanelRow className="separator">Second Heading</PanelRow>
                            <TypographyDropdown
                                baseLabel={__("Typography", "essential-blocks")}
                                typographyPrefixConstant={TITLE2_TYPOGRAPHY}
                            />
                            <ColorControl
                                label={__("Text Color", "essential-blocks")}
                                color={title2Color}
                                attributeName={'title2Color'}
                                isGradient={true}
                            />
                            <ColorControl
                                label={__("Hover Text Color", "essential-blocks")}
                                color={title2HoverColor}
                                attributeName={'title2HoverColor'}
                                isGradient={true}
                            />

                            {!isGradientColor(title2Color) && (
                                <ColorControl
                                    label={__("Background Color", "essential-blocks")}
                                    color={title2BgColor}
                                    attributeName={'title2BgColor'}
                                    isGradient={true}
                                />
                            )}
                            {!isGradientColor(title2HoverColor) && (
                                <ColorControl
                                    label={__("Hover Background Color", "essential-blocks")}
                                    color={title2HoverBgColor}
                                    attributeName={'title2HoverBgColor'}
                                    isGradient={true}
                                />
                            )}

                            <ResponsiveDimensionsControl
                                controlName={TITLE2_PADDING}
                                baseLabel="Padding"
                            />
                            <BorderShadowControl
                                controlName={TITLE2_BORDER_SHADOW}
                            />
                        </>
                    )}
                    {title3Text && title3Text.length > 0 && (
                        <>
                            <PanelRow className="separator">Third Heading</PanelRow>
                            <TypographyDropdown
                                baseLabel={__("Typography", "essential-blocks")}
                                typographyPrefixConstant={TITLE3_TYPOGRAPHY}
                            />
                            <ColorControl
                                label={__("Text Color", "essential-blocks")}
                                color={title3Color}
                                attributeName={'title3Color'}
                                isGradient={true}
                            />
                            <ColorControl
                                label={__("Hover Text Color", "essential-blocks")}
                                color={title3HoverColor}
                                attributeName={'title3HoverColor'}
                                isGradient={true}
                            />

                            {!isGradientColor(title3Color) && (
                                <ColorControl
                                    label={__("Background Color", "essential-blocks")}
                                    color={title3BgColor}
                                    attributeName={'title3BgColor'}
                                    isGradient={true}
                                />
                            )}
                            {!isGradientColor(title3HoverColor) && (
                                <ColorControl
                                    label={__("Hover Background Color", "essential-blocks")}
                                    color={title3HoverBgColor}
                                    attributeName={'title3HoverBgColor'}
                                    isGradient={true}
                                />
                            )}
                            <ResponsiveDimensionsControl
                                controlName={TITLE3_PADDING}
                                baseLabel="Padding"
                            />
                            <BorderShadowControl
                                controlName={TITLE3_BORDER_SHADOW}
                            />
                        </>
                    )}

                    <ResponsiveDimensionsControl
                        controlName={TITLE_MARGIN}
                        baseLabel="Margin"
                    />
                </PanelBody>
                {source == 'custom' && displaySubtitle && (
                    <PanelBody title={__("Subtitle", "essential-blocks")} initialOpen={false}>
                        <TypographyDropdown
                            baseLabel={__("Typography", "essential-blocks")}
                            typographyPrefixConstant={SUBTITLE_TYPOGRAPHY}
                        />

                        <ColorControl
                            label={__("Subtitle Color", "essential-blocks")}
                            color={subtitleColor}
                            attributeName={'subtitleColor'}
                        />
                        <ColorControl
                            label={__("Subtitle Hover Color", "essential-blocks")}
                            color={subtitleHoverColor}
                            attributeName={'subtitleHoverColor'}
                        />

                        <ResponsiveDimensionsControl
                            controlName={SUBTITLE_MARGIN}
                            baseLabel="Margin"
                        />
                    </PanelBody>
                )}
                {displaySeperator && (
                    <PanelBody title={__("Separator", "essential-blocks")} initialOpen={false}>
                        <SelectControl
                            label={__("Separator Position", "essential-blocks")}
                            value={seperatorPosition}
                            options={SEPARATOR_POSITION}
                            onChange={(seperatorPosition) => setAttributes({ seperatorPosition })}
                        />
                        <BaseControl
                            label={__("Separator Type", "essential-blocks")}
                            id="eb-advance-heading-alignment"
                        >
                            <ButtonGroup id="eb-advance-heading-alignment">
                                {SEPARATOR_TYPE.map((item, key) => (
                                    <Button
                                        key={key}
                                        // isLarge
                                        isPrimary={seperatorType === item.value}
                                        isSecondary={seperatorType !== item.value}
                                        onClick={() =>
                                            setAttributes({
                                                seperatorType: item.value,
                                            })
                                        }
                                    >
                                        {item.label}
                                    </Button>
                                ))}
                            </ButtonGroup>
                        </BaseControl>

                        {seperatorType === "line" && (
                            <>
                                <SelectControl
                                    label={__("Separator Style", "essential-blocks")}
                                    value={seperatorStyle}
                                    options={SEPERATOR_STYLES}
                                    onChange={(seperatorStyle) => setAttributes({ seperatorStyle })}
                                />
                                <ResponsiveRangeController
                                    baseLabel={__("Separator Height", "essential-blocks")}
                                    controlName={SEPARATOR_LINE_SIZE}
                                    units={UNIT_TYPES}
                                    min={0}
                                    max={100}
                                    step={1}
                                />
                            </>
                        )}

                        {seperatorType === "icon" && (
                            <>
                                <EBIconPicker
                                    value={separatorIcon}
                                    attributeName={'separatorIcon'}
                                />
                                <ResponsiveRangeController
                                    baseLabel={__("Icon Size", "essential-blocks")}
                                    controlName={SEPARATOR_ICON_SIZE}
                                    units={UNIT_TYPES}
                                    min={0}
                                    max={100}
                                    step={1}
                                />
                            </>
                        )}
                        <ResponsiveRangeController
                            baseLabel={__("Separator Width", "essential-blocks")}
                            controlName={SEPARATOR_WIDTH}
                            units={SEPARATOR_UNIT_TYPES}
                            min={0}
                            max={300}
                            step={1}
                        />

                        <ColorControl
                            label={__("Separator Color", "essential-blocks")}
                            color={separatorColor}
                            attributeName={'separatorColor'}
                            isGradient={true}
                        />
                        <ColorControl
                            label={__("Separator Hover Color", "essential-blocks")}
                            color={separatorHoverColor}
                            attributeName={'separatorHoverColor'}
                            isGradient={true}
                        />

                        <ResponsiveDimensionsControl
                            controlName={SEPARATOR_MARGIN}
                            baseLabel="Margin"
                        />
                    </PanelBody>
                )}
            </InspectorPanel.Style>
        </InspectorPanel>
    );
}

export default Inspector;
