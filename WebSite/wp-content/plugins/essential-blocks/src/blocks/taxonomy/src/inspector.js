/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
    Button,
    ButtonGroup,
    BaseControl,
    SelectControl,
    RangeControl,
    ToggleControl,
    PanelRow,
    TextControl,
    __experimentalDivider as Divider,
} from "@wordpress/components";

/**
 * Internal depencencies
 */
import {
    WRAPPER_BG,
    WRAPPER_MARGIN,
    WRAPPER_PADDING,
    WRAPPER_BORDER_SHADOW,
    NORMAL_HOVER,
    SOURCES,
    UNIT_TYPES,
    TAXONOMIES_BORDER_SHADOW,
    TAXONOMIES_GAP,
    TAXONOMIES_MARGIN,
    TAXONOMIES_PADDING,
    PREFIX_TYPES,
    PREFIX_ICON_SIZE,
    SUFFIX_ICON_SIZE,
    DISPLAY_STYLE,
    ALIGNMENT,
} from "./constants/constants";
import {
    TAXONOMIES_TYPOGRAPHY,
    PREFIX_TYPO,
    SUFFIX_TYPO,
} from "./constants/typographyPrefixConstants";
import {
    ResponsiveDimensionsControl,
    ResponsiveRangeController,
    TypographyDropdown,
    DynamicInputControl,
    ColorControl,
    InspectorPanel,
    BorderShadowControl,
    EBIconPicker,
} from "@essential-blocks/controls";

function Inspector(props) {
    const { attributes, setAttributes, taxonomies } = props;
    const {
        resOption,
        prefixType,
        prefixIcon,
        prefixText,
        prefixColor,
        suffixType,
        suffixIcon,
        suffixText,
        suffixColor,
        source,
        selectedTaxonomy,
        taxonomiesStyle,
        taxonomiesBgColor,
        taxonomiesTextColor,
        taxonomiesHoverBgColor,
        taxonomiesHoverTextColor,
        displayStyle,
        align,
        showSeparator,
        separator,
        separatorColor,
        taxonomyLimit,
    } = attributes;

    const taxOptions = taxonomies?.map(taxonomy => taxonomy.visibility.public ? {
        label: `${taxonomy.name}`,
        value: taxonomy.slug
    } : null).filter(Boolean);


    return (
        <InspectorPanel advancedControlProps={{
            marginPrefix: WRAPPER_MARGIN,
            paddingPrefix: WRAPPER_PADDING,
            backgroundPrefix: WRAPPER_BG,
            borderPrefix: WRAPPER_BORDER_SHADOW,
            hasMargin: true
        }}>
            <InspectorPanel.General>
                <InspectorPanel.PanelBody
                    title={__("General", "essential-blocks")}
                    initialOpen={true}
                >
                    <SelectControl
                        label={__("Source", "essential-blocks")}
                        value={source}
                        options={SOURCES}
                        onChange={(value) => {
                            setAttributes({
                                source: value
                            })
                        }}
                    />
                    {taxonomies !== null && (
                        <>
                            <SelectControl
                                label="Taxonomy"
                                value={selectedTaxonomy}
                                options={taxOptions}
                                onChange={value => {
                                    setAttributes({ selectedTaxonomy: value })
                                }}
                            />

                            {selectedTaxonomy && (
                                <RangeControl
                                    label={__(
                                        "Limit",
                                        "essential-blocks"
                                    )}
                                    value={taxonomyLimit}
                                    onChange={(taxonomyLimit) =>
                                        setAttributes({
                                            taxonomyLimit,
                                        })
                                    }
                                    min={0}
                                    max={50}
                                    step={1}
                                    allowReset={true}
                                    help={__('Select 0 to show all terms.', "essential-blocks")}
                                />
                            )}
                        </>
                    )}

                    {taxonomies == null && (
                        <><PanelRow>No Taxonomies</PanelRow></>
                    )}

                </InspectorPanel.PanelBody>
                <InspectorPanel.PanelBody
                    title={__("Additional", "essential-blocks")}
                    initialOpen={false}
                >
                    <BaseControl label={__("Prefix", "essential-blocks")}>
                        <ButtonGroup id="eb-accordion-image-icon">
                            {PREFIX_TYPES.map(
                                (
                                    { label, value },
                                    index
                                ) => (
                                    <Button
                                        key={index}
                                        isSecondary={
                                            prefixType !== value
                                        }
                                        isPrimary={
                                            prefixType === value
                                        }
                                        onClick={() =>
                                            setAttributes({
                                                prefixType: value,
                                            })
                                        }
                                    >
                                        {label}
                                    </Button>
                                )
                            )}
                        </ButtonGroup>
                    </BaseControl>

                    {prefixType !== "none" && (
                        <>
                            {prefixType === "icon" && (
                                <EBIconPicker
                                    value={prefixIcon}
                                    attributeName={'prefixIcon'}
                                />
                            )}
                            {prefixType === "text" && (
                                <>
                                    <DynamicInputControl
                                        label="Prefix Text"
                                        attrName="prefixText"
                                        inputValue={prefixText}
                                        setAttributes={setAttributes}
                                        onChange={(text) =>
                                            setAttributes({
                                                prefixText: text,
                                            })
                                        }
                                    />
                                </>
                            )}
                        </>
                    )}

                    <BaseControl label={__("Sufix", "essential-blocks")} >
                        <ButtonGroup id="eb-accordion-image-icon">
                            {PREFIX_TYPES.map(
                                (
                                    { label, value },
                                    index
                                ) => (
                                    <Button
                                        key={index}
                                        isSecondary={
                                            suffixType !== value
                                        }
                                        isPrimary={
                                            suffixType === value
                                        }
                                        onClick={() =>
                                            setAttributes({
                                                suffixType: value,
                                            })
                                        }
                                    >
                                        {label}
                                    </Button>
                                )
                            )}
                        </ButtonGroup>
                    </BaseControl>

                    {suffixType !== "none" && (
                        <>
                            {suffixType === "icon" && (
                                <EBIconPicker
                                    value={suffixIcon}
                                    attributeName={'suffixIcon'}
                                />
                            )}
                            {suffixType === "text" && (
                                <>
                                    <DynamicInputControl
                                        label="Suffix Text"
                                        attrName="suffixText"
                                        inputValue={suffixText}
                                        setAttributes={setAttributes}
                                        onChange={(text) =>
                                            setAttributes({
                                                suffixText: text,
                                            })
                                        }
                                    />
                                </>
                            )}
                        </>
                    )}

                    <ToggleControl
                        label={__(
                            "Show Separator",
                            "essential-blocks"
                        )}
                        checked={showSeparator}
                        onChange={() =>
                            setAttributes({
                                showSeparator: !showSeparator,
                            })
                        }
                    />

                    {showSeparator && (
                        <TextControl
                            label={__('Separator', "essential-blocks")}
                            value={separator || ''}
                            onChange={(nextValue) => {
                                setAttributes({ separator: nextValue });
                            }}
                            help={__('Enter character(s) used to separate terms.', "essential-blocks")}
                        />
                    )}
                </InspectorPanel.PanelBody>
            </InspectorPanel.General>
            <InspectorPanel.Style>
                <InspectorPanel.PanelBody title={__("Taxonomy Style", "essential-blocks")} initialOpen={true}>
                    <BaseControl
                        label={__("Display", "essential-blocks")}
                    >
                        <ButtonGroup className="eb-inspector-btn-group">
                            {DISPLAY_STYLE.map((item, index) => (
                                <Button
                                    key={index}
                                    // isLarge
                                    isPrimary={displayStyle === item.value}
                                    isSecondary={displayStyle !== item.value}
                                    onClick={() =>
                                        setAttributes({
                                            displayStyle: item.value,
                                        })
                                    }
                                >
                                    {item.label}
                                </Button>
                            ))}
                        </ButtonGroup>
                    </BaseControl>

                    <Divider />
                    <BaseControl
                        label={__("Alignment", "essential-blocks")}
                        id="eb-advance-heading-alignment"
                    >
                        <ButtonGroup id="eb-advance-heading-alignment">
                            {ALIGNMENT.map((item, key) => (
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
                    <TypographyDropdown
                        baseLabel={__("Typography", "essential-blocks")}
                        typographyPrefixConstant={TAXONOMIES_TYPOGRAPHY}
                    />

                    <ButtonGroup className="eb-inspector-btn-group">
                        {NORMAL_HOVER.map((item, index) => (
                            <Button
                                key={index}
                                // isLarge
                                isPrimary={taxonomiesStyle === item.value}
                                isSecondary={taxonomiesStyle !== item.value}
                                onClick={() =>
                                    setAttributes({
                                        taxonomiesStyle: item.value,
                                    })
                                }
                            >
                                {item.label}
                            </Button>
                        ))}
                    </ButtonGroup>
                    {taxonomiesStyle ===
                        "normal" && (
                            <>
                                <ColorControl
                                    label={__(
                                        "Background Color",
                                        "essential-blocks"
                                    )}
                                    color={
                                        taxonomiesBgColor
                                    }
                                    attributeName={'taxonomiesBgColor'}
                                />
                                <ColorControl
                                    label={__(
                                        "Text Color",
                                        "essential-blocks"
                                    )}
                                    color={
                                        taxonomiesTextColor
                                    }
                                    attributeName={'taxonomiesTextColor'}
                                />
                                {showSeparator && (
                                    <ColorControl
                                        label={__(
                                            "Separator Color",
                                            "essential-blocks"
                                        )}
                                        color={
                                            separatorColor
                                        }
                                        attributeName={'separatorColor'}
                                    />
                                )}

                            </>
                        )}
                    {taxonomiesStyle ===
                        "hover" && (
                            <>
                                <ColorControl
                                    label={__(
                                        "Hover Background Color",
                                        "essential-blocks"
                                    )}
                                    color={
                                        taxonomiesHoverBgColor
                                    }
                                    attributeName={'taxonomiesHoverBgColor'}
                                />
                                <ColorControl
                                    label={__(
                                        "Hover Text Color",
                                        "essential-blocks"
                                    )}
                                    color={
                                        taxonomiesHoverTextColor
                                    }
                                    attributeName={'taxonomiesHoverTextColor'}
                                />
                            </>
                        )}
                    <ResponsiveRangeController
                        baseLabel={__("Gap", "essential-blocks")}
                        controlName={TAXONOMIES_GAP}
                        units={UNIT_TYPES}
                        min={1}
                        max={100}
                        step={1}
                    />
                    <ResponsiveDimensionsControl
                        controlName={TAXONOMIES_PADDING}
                        baseLabel="Padding"
                    />
                    <ResponsiveDimensionsControl
                        controlName={TAXONOMIES_MARGIN}
                        baseLabel="Margin"
                    />
                    <InspectorPanel.PanelBody title={__("Border")} initialOpen={false}>
                        <BorderShadowControl
                            controlName={TAXONOMIES_BORDER_SHADOW}
                        // noShadow
                        // noBorder
                        />
                    </InspectorPanel.PanelBody>


                    {prefixType !== "none" && (
                        <InspectorPanel.PanelBody title={__("Prefix")} initialOpen={false}>
                            <ColorControl
                                label={__(
                                    "Color",
                                    "essential-blocks"
                                )}
                                color={prefixColor}
                                attributeName={'prefixColor'}
                            />
                            {prefixType === "icon" &&
                                prefixIcon && (
                                    <ResponsiveRangeController
                                        baseLabel={__(
                                            "Icon Size",
                                            "essential-blocks"
                                        )}
                                        controlName={
                                            PREFIX_ICON_SIZE
                                        }
                                        min={8}
                                        max={200}
                                        step={1}
                                    />
                                )
                            }

                            {prefixType === "text" && (
                                <TypographyDropdown
                                    baseLabel="Typography"
                                    typographyPrefixConstant={
                                        PREFIX_TYPO
                                    }
                                />
                            )}
                        </InspectorPanel.PanelBody>
                    )}

                    {suffixType !== "none" && (
                        <InspectorPanel.PanelBody title={__("Suffix")} initialOpen={false}>
                            <ColorControl
                                label={__(
                                    "Color",
                                    "essential-blocks"
                                )}
                                color={suffixColor}
                                attributeName={'suffixColor'}
                            />
                            {suffixType === "icon" &&
                                suffixIcon && (
                                    <ResponsiveRangeController
                                        baseLabel={__(
                                            "Icon Size",
                                            "essential-blocks"
                                        )}
                                        controlName={
                                            SUFFIX_ICON_SIZE
                                        }
                                        min={8}
                                        max={200}
                                        step={1}
                                    />
                                )
                            }

                            {suffixType === "text" && (
                                <TypographyDropdown
                                    baseLabel="Typography"
                                    typographyPrefixConstant={
                                        SUFFIX_TYPO
                                    }
                                />
                            )}
                        </InspectorPanel.PanelBody>
                    )}
                </InspectorPanel.PanelBody>
            </InspectorPanel.Style>
        </InspectorPanel>
    );
}

export default Inspector;
