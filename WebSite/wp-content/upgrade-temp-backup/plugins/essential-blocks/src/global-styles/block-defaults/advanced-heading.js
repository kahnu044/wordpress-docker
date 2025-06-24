/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
    PanelBody,
    SelectControl,
    ToggleControl,
    TextControl,
    TextareaControl,
    Button,
    ButtonGroup,
    BaseControl,
    TabPanel,
    ColorPicker,
} from "@wordpress/components";

import {
    ResponsiveDimensionsControl,
    TypographyDropdown,
    BorderShadowControl,
    ResponsiveRangeController,
    BackgroundControl,
    ColorControl,
    EBIconPicker,
    useBlockDefaults,
    withBlockContext
} from "@essential-blocks/controls";

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
    NORMAL_HOVER,
    UNIT_TYPES,
    SEPARATOR_UNIT_TYPES,
    PRESETS,
    TEXT_ALIGN,
    HEADING,
    SEPERATOR_STYLES,
    SEPARATOR_TYPE,
} from "@essential-blocks/blocks/advanced-heading/src/constants/constants";

import {
    TITLE_TYPOGRAPHY,
    SUBTITLE_TYPOGRAPHY,
} from "@essential-blocks/blocks/advanced-heading/src/constants/typographyPrefixConstants";

import objAttributes from "@essential-blocks/blocks/advanced-heading/src/attributes";

function AdvancedHeading(props) {
    const { blockDefaults, setBlockDefaults, name, deviceType, handleBlockDefault } = props;

    const {
        tagName,
        subtitleTagName,
        titleColor,
        titleHoverColor,
        subtitleColor,
        subtitleHoverColor,
        separatorColor,
        separatorHoverColor,
        align,
        displaySubtitle,
        displaySeperator,
        seperatorPosition,
        seperatorType,
        seperatorStyle,
        separatorIcon,
    } = blockDefaults;

    const isDefaultSet = useBlockDefaults(name, blockDefaults, setBlockDefaults, objAttributes)

    return (
        <>
            {isDefaultSet && (
                <div className="eb-panel-control">
                    <PanelBody title={__("General", "essential-blocks")} initialOpen={true}>
                        <BaseControl label={__("Alignment", "essential-blocks")} id="eb-advance-heading-alignment">
                            <ButtonGroup id="eb-advance-heading-alignment">
                                {TEXT_ALIGN.map((item, key) => (
                                    <Button
                                        key={key}
                                        // isLarge
                                        isPrimary={align === item.value}
                                        isSecondary={align !== item.value}
                                        onClick={() =>
                                            handleBlockDefault({
                                                align: item.value,
                                            })
                                        }
                                    >
                                        {item.label}
                                    </Button>
                                ))}
                            </ButtonGroup>
                        </BaseControl>
                        <BaseControl label={__("Title Level", "essential-blocks")} id="eb-advance-heading-alignment">
                            <ButtonGroup className="eb-advance-heading-alignment eb-html-tag-buttongroup">
                                {HEADING.map((item, key) => (
                                    <Button
                                        key={key}
                                        // isLarge
                                        isPrimary={tagName === item.value}
                                        isSecondary={tagName !== item.value}
                                        onClick={() =>
                                            handleBlockDefault({
                                                tagName: item.value,
                                            })
                                        }
                                    >
                                        {item.label}
                                    </Button>
                                ))}
                            </ButtonGroup>
                        </BaseControl>
                        <ToggleControl
                            label={__("Display Subtitle", "essential-blocks")}
                            checked={displaySubtitle}
                            onChange={() =>
                                handleBlockDefault({
                                    displaySubtitle: !displaySubtitle,
                                })
                            }
                        />
                        {displaySubtitle && (
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
                                                    handleBlockDefault({
                                                        subtitleTagName: item.value,
                                                    })
                                                }
                                            >
                                                {item.label}
                                            </Button>
                                        ))}
                                    </ButtonGroup>
                                </BaseControl>
                            </>
                        )}
                        <ToggleControl
                            label={__("Display Separator", "essential-blocks")}
                            checked={displaySeperator}
                            onChange={() =>
                                handleBlockDefault({
                                    displaySeperator: !displaySeperator,
                                })
                            }
                        />
                    </PanelBody>
                    <PanelBody title={__("Title Styles", "essential-blocks")} initialOpen={true}>
                        <TypographyDropdown
                            baseLabel={__("Title Typography", "essential-blocks")}
                            typographyPrefixConstant={TITLE_TYPOGRAPHY}
                        />
                        <ColorControl
                            label={"Title Color"}
                            color={titleColor}
                            onChange={(value) => handleBlockDefault({ titleColor: value })}
                            defaultValue={titleColor}
                        />
                        <ColorControl
                            label={"Title Hover Color"}
                            color={titleHoverColor}
                            onChange={(value) => handleBlockDefault({ titleHoverColor: value })}
                            defaultValue={titleHoverColor}
                        />
                        <ResponsiveDimensionsControl
                            controlName={TITLE_MARGIN}
                            baseLabel="Title Margin"
                        />
                    </PanelBody>

                    {displaySubtitle && (
                        <PanelBody title={__("Subtitle Styles", "essential-blocks")} initialOpen={true}>
                            <TypographyDropdown
                                baseLabel={__("Subtitle Typography", "essential-blocks")}
                                typographyPrefixConstant={SUBTITLE_TYPOGRAPHY}
                            />
                            <ColorControl
                                label={"Subtitle Color"}
                                color={subtitleColor}
                                onChange={(value) => handleBlockDefault({ subtitleColor: value })}
                                defaultValue={subtitleColor}
                            />
                            <ColorControl
                                label={"Subtitle Hover Color"}
                                color={subtitleHoverColor}
                                onChange={(value) =>
                                    handleBlockDefault({
                                        subtitleHoverColor: value,
                                    })
                                }
                                defaultValue={subtitleHoverColor}
                            />
                            <ResponsiveDimensionsControl
                                controlName={SUBTITLE_MARGIN}
                                baseLabel="Subtitle Margin"
                            />
                        </PanelBody>
                    )}

                    {displaySeperator && (
                        <PanelBody title={__("Separator", "essential-blocks")} initialOpen={false}>
                            <SelectControl
                                label={__("Separator Position", "essential-blocks")}
                                value={seperatorPosition}
                                options={SEPARATOR_POSITION}
                                onChange={(seperatorPosition) => handleBlockDefault({ seperatorPosition })}
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
                                                handleBlockDefault({
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
                                        onChange={(seperatorStyle) =>
                                            handleBlockDefault({
                                                seperatorStyle,
                                            })
                                        }
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
                                        onChange={(icon) =>
                                            handleBlockDefault({
                                                separatorIcon: icon,
                                            })
                                        }
                                        title={__(
                                            "Select Icon",
                                            "essential-blocks-pro"
                                        )}
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
                                label={"Separator Color"}
                                color={separatorColor}
                                onChange={(value) =>
                                    handleBlockDefault({
                                        separatorColor: value,
                                    })
                                }
                                defaultValue={separatorColor}
                            />
                            <ColorControl
                                label={"Separator Hover Color"}
                                color={separatorHoverColor}
                                onChange={(value) =>
                                    handleBlockDefault({
                                        separatorHoverColor: value,
                                    })
                                }
                                defaultValue={separatorHoverColor}
                            />

                            <ResponsiveDimensionsControl
                                controlName={SEPARATOR_MARGIN}
                                baseLabel="Separator Margin"
                            />
                        </PanelBody>
                    )}
                    <PanelBody title={__("Advanced", "essential-blocks")} initialOpen={true}>
                        <PanelBody>
                            <ResponsiveDimensionsControl
                                controlName={WRAPPER_MARGIN}
                                baseLabel="Wrapper Margin"
                            />
                            <ResponsiveDimensionsControl
                                controlName={WRAPPER_PADDING}
                                baseLabel="Wrapper Padding"
                            />
                        </PanelBody>
                        <PanelBody title={__("Wrapper Background", "essential-blocks")} initialOpen={false}>
                            <BackgroundControl controlName={WRAPPER_BG} />
                        </PanelBody>
                        <PanelBody title={__("Wrapper Border & Shadow")} initialOpen={false}>
                            <BorderShadowControl
                                controlName={WRAPPER_BORDER_SHADOW}
                            // noShadow
                            // noBorder
                            />
                        </PanelBody>
                    </PanelBody>
                </div>
            )}
        </>
    );
}

export default withBlockContext(objAttributes)(AdvancedHeading);
