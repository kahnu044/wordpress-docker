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
} from "@wordpress/components";
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
    HEADING,
    SEPERATOR_STYLES,
    SEPARATOR_TYPE,
    SOURCE
} from "./constants/constants";
import { TITLE_TYPOGRAPHY, SUBTITLE_TYPOGRAPHY } from "./constants/typographyPrefixConstants";
import {
    ResponsiveDimensionsControl,
    TypographyDropdown,
    ResponsiveRangeController,
    DynamicInputControl,
    ColorControl,
    EBIconPicker,
    InspectorPanel
} from '@essential-blocks/controls';

import objAttributes from "./attributes";

function Inspector(props) {
    const { attributes, setAttributes } = props;
    const {
        resOption,
        preset,
        align,
        tagName,
        titleText,
        subtitleTagName,
        subtitleText,
        displaySubtitle,
        displaySeperator,
        titleColor,
        titleHoverColor,
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

                    <BaseControl
                        label={__("Alignment", "essential-blocks")}
                        id="eb-advance-heading-alignment"
                    >
                        <ButtonGroup id="eb-advance-heading-alignment">
                            {TEXT_ALIGN.map((item, key) => (
                                <Button
                                    key={key}
                                    // isLarge
                                    isPrimary={align === item.value}
                                    isSecondary={align !== item.value}
                                    onClick={() =>
                                        setAttributes({
                                            align: item.value,
                                        })
                                    }
                                >
                                    {item.label}
                                </Button>
                            ))}
                        </ButtonGroup>
                    </BaseControl>
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
                                label="Title Text"
                                attrName="titleText"
                                inputValue={titleText}
                                setAttributes={setAttributes}
                                onChange={(text) => setAttributes({ titleText: text })}
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
                        label={__("Enable Link?", "essential-blocks")}
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
                            />
                        </>
                    )}
                    {enableLink && (
                        <ToggleControl
                            label={__("Open in New Tab", "essential-blocks")}
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
                    <TypographyDropdown
                        baseLabel={__("Typography", "essential-blocks")}
                        typographyPrefixConstant={TITLE_TYPOGRAPHY}
                    />

                    <ColorControl
                        label={__("Title Color", "essential-blocks")}
                        color={titleColor}
                        attributeName={'titleColor'}
                    />
                    <ColorControl
                        label={__("Title Hover Color", "essential-blocks")}
                        color={titleHoverColor}
                        attributeName={'titleHoverColor'}
                    />
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
                        />
                        <ColorControl
                            label={__("Separator Hover Color", "essential-blocks")}
                            color={separatorHoverColor}
                            attributeName={'separatorHoverColor'}
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
