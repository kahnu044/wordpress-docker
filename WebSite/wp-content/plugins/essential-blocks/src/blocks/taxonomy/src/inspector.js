/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
    SelectControl,
    RangeControl,
    ToggleControl,
    PanelRow,
    TextControl,
    __experimentalDivider as Divider,
    __experimentalToggleGroupControl as ToggleGroupControl,
    __experimentalToggleGroupControlOption as ToggleGroupControlOption,
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
    VERTICAL_ALIGN
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
    const { attributes, setAttributes, taxonomies, context } = props;
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
        suffixVerticalAlign,
        prefixVerticalAlign
    } = attributes;

    // Check if block is inside Loop Builder context
    const isInLoopBuilder = Boolean(
        context &&
        // Primary check: explicit isLoopBuilder flag
        (context["essential-blocks/isLoopBuilder"] === true ||
            // Secondary check: presence of loop context values (even if null initially)
            (context.hasOwnProperty("essential-blocks/postId") &&
                context.hasOwnProperty("essential-blocks/postType"))),
    );

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
                    {!isInLoopBuilder && (
                        <SelectControl
                            label={__("Source", "essential-blocks")}
                            value={source}
                            options={SOURCES}
                            onChange={(value) => {
                                setAttributes({
                                    source: value
                                })
                            }}
                            __next40pxDefaultSize
                            __nextHasNoMarginBottom
                        />
                    )}
                    {taxonomies !== null && (
                        <>
                            <SelectControl
                                label="Taxonomy"
                                value={selectedTaxonomy}
                                options={taxOptions}
                                onChange={value => {
                                    setAttributes({ selectedTaxonomy: value })
                                }}
                                __next40pxDefaultSize
                                __nextHasNoMarginBottom
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
                                    __nextHasNoMarginBottom
                                    __next40pxDefaultSize
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
                    <ToggleGroupControl
                        label={__("Prefix", "essential-blocks")}

                        value={prefixType}
                        onChange={(value) =>
                            setAttributes({
                                prefixType: value,
                            })
                        }
                        isBlock
                        __next40pxDefaultSize
                        __nextHasNoMarginBottom
                    >
                        {PREFIX_TYPES.map(
                            (
                                { label, value },
                                index
                            ) => (
                                <ToggleGroupControlOption
                                    key={index}
                                    value={value}
                                    label={label}
                                />
                            )
                        )}
                    </ToggleGroupControl>

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

                            {displayStyle == 'display-inline' && (
                                <ToggleGroupControl
                                    label={__("Vertical Align", "essential-blocks")}

                                    value={prefixVerticalAlign}
                                    onChange={(value) =>
                                        setAttributes({
                                            prefixVerticalAlign: value,
                                        })
                                    }
                                    isBlock
                                    __next40pxDefaultSize
                                    __nextHasNoMarginBottom
                                >
                                    {VERTICAL_ALIGN.map(
                                        (
                                            { label, value },
                                            index
                                        ) => (
                                            <ToggleGroupControlOption
                                                key={index}
                                                value={value}
                                                label={label}
                                            />
                                        )
                                    )}
                                </ToggleGroupControl>
                            )}
                        </>
                    )}

                    <ToggleGroupControl
                        label={__("Sufix", "essential-blocks")}

                        value={suffixType}
                        onChange={(value) =>
                            setAttributes({
                                suffixType: value,
                            })
                        }
                        isBlock
                        __next40pxDefaultSize
                        __nextHasNoMarginBottom
                    >
                        {PREFIX_TYPES.map(
                            (
                                { label, value },
                                index
                            ) => (
                                <ToggleGroupControlOption
                                    key={index}
                                    value={value}
                                    label={label}
                                />
                            )
                        )}
                    </ToggleGroupControl>

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

                            {displayStyle == 'display-inline' && (
                                <ToggleGroupControl
                                    label={__("Vertical Align", "essential-blocks")}

                                    value={suffixVerticalAlign}
                                    onChange={(value) =>
                                        setAttributes({
                                            suffixVerticalAlign: value,
                                        })
                                    }
                                    isBlock
                                    __next40pxDefaultSize
                                    __nextHasNoMarginBottom
                                >
                                    {VERTICAL_ALIGN.map(
                                        (
                                            { label, value },
                                            index
                                        ) => (
                                            <ToggleGroupControlOption
                                                key={index}
                                                value={value}
                                                label={label}
                                            />
                                        )
                                    )}
                                </ToggleGroupControl>
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
                        __nextHasNoMarginBottom
                    />

                    {showSeparator && (
                        <TextControl
                            label={__('Separator', "essential-blocks")}
                            value={separator || ''}
                            onChange={(nextValue) => {
                                setAttributes({ separator: nextValue });
                            }}
                            help={__('Enter character(s) used to separate terms.', "essential-blocks")}
                            __next40pxDefaultSize
                            __nextHasNoMarginBottom
                        />
                    )}
                </InspectorPanel.PanelBody>
            </InspectorPanel.General>
            <InspectorPanel.Style>
                <InspectorPanel.PanelBody title={__("Taxonomy Style", "essential-blocks")} initialOpen={true}>
                    <ToggleGroupControl
                        label={__("Display", "essential-blocks")}
                        className="eb-inspector-btn-group newtogglegroupcontrol"
                        value={displayStyle}
                        onChange={(value) =>
                            setAttributes({
                                displayStyle: value,
                            })
                        }
                        isBlock
                        __next40pxDefaultSize
                        __nextHasNoMarginBottom
                    >
                        {DISPLAY_STYLE.map((item, index) => (
                            <ToggleGroupControlOption
                                key={index}
                                value={item.value}
                                label={item.label}
                            />
                        ))}
                    </ToggleGroupControl>

                    <Divider />
                    <ToggleGroupControl
                        label={__("Alignment", "essential-blocks")}

                        value={align}
                        onChange={(value) =>
                            setAttributes({
                                align: value,
                            })
                        }
                        isBlock
                        __next40pxDefaultSize
                        __nextHasNoMarginBottom
                    >
                        {ALIGNMENT.map((item, key) => (
                            <ToggleGroupControlOption
                                key={key}
                                value={item.value}
                                label={item.label}
                            />
                        ))}
                    </ToggleGroupControl>
                    <TypographyDropdown
                        baseLabel={__("Typography", "essential-blocks")}
                        typographyPrefixConstant={TAXONOMIES_TYPOGRAPHY}
                    />

                    <ToggleGroupControl
                        className="eb-inspector-btn-group newtogglegroupcontrol"
                        value={taxonomiesStyle}
                        onChange={(value) =>
                            setAttributes({
                                taxonomiesStyle: value,
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
