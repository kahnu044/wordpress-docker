/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
    PanelBody,
    SelectControl,
    ToggleControl,
    BaseControl,
    ButtonGroup,
    Button,
    RangeControl,
} from "@wordpress/components";

/**
 * Internal dependencies
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
    VERTICAL_ALIGN,
} from "@essential-blocks/blocks/taxonomy/src/constants/constants";

import {
    TAXONOMIES_TYPOGRAPHY,
    PREFIX_TYPO,
    SUFFIX_TYPO,
} from "@essential-blocks/blocks/taxonomy/src/constants/typographyPrefixConstants";

import objAttributes from "@essential-blocks/blocks/taxonomy/src/attributes";

import {
    ResponsiveDimensionsControl,
    ResponsiveRangeController,
    TypographyDropdown,
    DynamicInputControl,
    ColorControl,
    BackgroundControl,
    BorderShadowControl,
    EBIconPicker,
    useBlockDefaults,
    withBlockContext
} from "@essential-blocks/controls";

function Taxonomy(props) {
    const { blockDefaults, setBlockDefaults, name, deviceType, handleBlockDefault } = props;

    const {
        prefixType,
        prefixIcon,
        prefixText,
        prefixColor,
        prefixVerticalAlign,
        suffixType,
        suffixIcon,
        suffixText,
        suffixColor,
        suffixVerticalAlign,
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
        displayAsDropdown,
        showHierarchy,
        showPostCounts,
        showEmpty,
    } = blockDefaults;

    const isDefaultSet = useBlockDefaults(name, blockDefaults, setBlockDefaults, objAttributes)

    return (
        <>
            {isDefaultSet && (
                <div className="eb-panel-control">
                    <PanelBody
                        title={__("General", "essential-blocks")}
                        initialOpen={true}
                    >
                        <SelectControl
                            label={__("Source", "essential-blocks")}
                            value={source}
                            options={SOURCES}
                            onChange={(source) =>
                                handleBlockDefault({ source })
                            }
                        />
                        <BaseControl label={__("Display Style", "essential-blocks")}>
                            <ButtonGroup>
                                {DISPLAY_STYLE.map((item, index) => (
                                    <Button
                                        key={index}
                                        isPrimary={displayStyle === item.value}
                                        isSecondary={displayStyle !== item.value}
                                        onClick={() =>
                                            handleBlockDefault({
                                                displayStyle: item.value,
                                            })
                                        }
                                    >
                                        {item.label}
                                    </Button>
                                ))}
                            </ButtonGroup>
                        </BaseControl>
                        <BaseControl label={__("Alignment", "essential-blocks")}>
                            <ButtonGroup>
                                {ALIGNMENT.map((item, index) => (
                                    <Button
                                        key={index}
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
                        <RangeControl
                            label={__("Taxonomy Limit", "essential-blocks")}
                            value={taxonomyLimit}
                            onChange={(taxonomyLimit) =>
                                handleBlockDefault({ taxonomyLimit })
                            }
                            min={1}
                            max={50}
                            step={1}
                            allowReset={true}
                        />
                        <ToggleControl
                            label={__("Display as Dropdown", "essential-blocks")}
                            checked={displayAsDropdown}
                            onChange={(displayAsDropdown) =>
                                handleBlockDefault({ displayAsDropdown })
                            }
                        />
                        <ToggleControl
                            label={__("Show Hierarchy", "essential-blocks")}
                            checked={showHierarchy}
                            onChange={(showHierarchy) =>
                                handleBlockDefault({ showHierarchy })
                            }
                        />
                        <ToggleControl
                            label={__("Show Post Counts", "essential-blocks")}
                            checked={showPostCounts}
                            onChange={(showPostCounts) =>
                                handleBlockDefault({ showPostCounts })
                            }
                        />
                        <ToggleControl
                            label={__("Show Empty", "essential-blocks")}
                            checked={showEmpty}
                            onChange={(showEmpty) =>
                                handleBlockDefault({ showEmpty })
                            }
                        />
                        <ToggleControl
                            label={__("Show Separator", "essential-blocks")}
                            checked={showSeparator}
                            onChange={(showSeparator) =>
                                handleBlockDefault({ showSeparator })
                            }
                        />
                        {showSeparator && (
                            <>
                                <DynamicInputControl
                                    label={__("Separator", "essential-blocks")}
                                    attrName="separator"
                                    inputValue={separator}
                                    setAttributes={handleBlockDefault}
                                    onChange={(separator) =>
                                        handleBlockDefault({ separator })
                                    }
                                />
                                <ColorControl
                                    label={__("Separator Color", "essential-blocks")}
                                    color={separatorColor}
                                    onChange={(separatorColor) =>
                                        handleBlockDefault({ separatorColor })
                                    }
                                />
                            </>
                        )}
                    </PanelBody>
                    <PanelBody
                        title={__("Prefix Settings", "essential-blocks")}
                        initialOpen={false}
                    >
                        <SelectControl
                            label={__("Prefix Type", "essential-blocks")}
                            value={prefixType}
                            options={PREFIX_TYPES}
                            onChange={(prefixType) =>
                                handleBlockDefault({ prefixType })
                            }
                        />
                        {prefixType !== "none" && (
                            <>
                                <BaseControl label={__("Vertical Alignment", "essential-blocks")}>
                                    <ButtonGroup>
                                        {VERTICAL_ALIGN.map((item, index) => (
                                            <Button
                                                key={index}
                                                isPrimary={prefixVerticalAlign === item.value}
                                                isSecondary={prefixVerticalAlign !== item.value}
                                                onClick={() =>
                                                    handleBlockDefault({
                                                        prefixVerticalAlign: item.value,
                                                    })
                                                }
                                            >
                                                {item.label}
                                            </Button>
                                        ))}
                                    </ButtonGroup>
                                </BaseControl>
                                {prefixType === "text" && (
                                    <DynamicInputControl
                                        label={__("Prefix Text", "essential-blocks")}
                                        attrName="prefixText"
                                        inputValue={prefixText}
                                        setAttributes={handleBlockDefault}
                                        onChange={(prefixText) =>
                                            handleBlockDefault({ prefixText })
                                        }
                                    />
                                )}
                                {prefixType === "icon" && (
                                    <EBIconPicker
                                        value={prefixIcon}
                                        onChange={(prefixIcon) =>
                                            handleBlockDefault({ prefixIcon })
                                        }
                                        title={__("Select Prefix Icon", "essential-blocks")}
                                    />
                                )}
                                <ColorControl
                                    label={__("Prefix Color", "essential-blocks")}
                                    color={prefixColor}
                                    onChange={(prefixColor) =>
                                        handleBlockDefault({ prefixColor })
                                    }
                                />
                            </>
                        )}
                    </PanelBody>
                    <PanelBody
                        title={__("Suffix Settings", "essential-blocks")}
                        initialOpen={false}
                    >
                        <SelectControl
                            label={__("Suffix Type", "essential-blocks")}
                            value={suffixType}
                            options={PREFIX_TYPES}
                            onChange={(suffixType) =>
                                handleBlockDefault({ suffixType })
                            }
                        />
                        {suffixType !== "none" && (
                            <>
                                <BaseControl label={__("Vertical Alignment", "essential-blocks")}>
                                    <ButtonGroup>
                                        {VERTICAL_ALIGN.map((item, index) => (
                                            <Button
                                                key={index}
                                                isPrimary={suffixVerticalAlign === item.value}
                                                isSecondary={suffixVerticalAlign !== item.value}
                                                onClick={() =>
                                                    handleBlockDefault({
                                                        suffixVerticalAlign: item.value,
                                                    })
                                                }
                                            >
                                                {item.label}
                                            </Button>
                                        ))}
                                    </ButtonGroup>
                                </BaseControl>
                                {suffixType === "text" && (
                                    <DynamicInputControl
                                        label={__("Suffix Text", "essential-blocks")}
                                        attrName="suffixText"
                                        inputValue={suffixText}
                                        setAttributes={handleBlockDefault}
                                        onChange={(suffixText) =>
                                            handleBlockDefault({ suffixText })
                                        }
                                    />
                                )}
                                {suffixType === "icon" && (
                                    <EBIconPicker
                                        value={suffixIcon}
                                        onChange={(suffixIcon) =>
                                            handleBlockDefault({ suffixIcon })
                                        }
                                        title={__("Select Suffix Icon", "essential-blocks")}
                                    />
                                )}
                                <ColorControl
                                    label={__("Suffix Color", "essential-blocks")}
                                    color={suffixColor}
                                    onChange={(suffixColor) =>
                                        handleBlockDefault({ suffixColor })
                                    }
                                />
                            </>
                        )}
                    </PanelBody>
                    <PanelBody
                        title={__("Taxonomy Styles", "essential-blocks")}
                        initialOpen={false}
                    >
                        <TypographyDropdown
                            baseLabel={__("Typography", "essential-blocks")}
                            typographyPrefixConstant={TAXONOMIES_TYPOGRAPHY}
                        />
                        <BaseControl label={__("Color", "essential-blocks")}>
                            <ButtonGroup>
                                {NORMAL_HOVER.map((item, index) => (
                                    <Button
                                        key={index}
                                        isPrimary={taxonomiesStyle === item.value}
                                        isSecondary={taxonomiesStyle !== item.value}
                                        onClick={() =>
                                            handleBlockDefault({
                                                taxonomiesStyle: item.value,
                                            })
                                        }
                                    >
                                        {item.label}
                                    </Button>
                                ))}
                            </ButtonGroup>
                        </BaseControl>
                        {taxonomiesStyle === "normal" && (
                            <>
                                <ColorControl
                                    label={__("Text Color", "essential-blocks")}
                                    color={taxonomiesTextColor}
                                    onChange={(taxonomiesTextColor) =>
                                        handleBlockDefault({ taxonomiesTextColor })
                                    }
                                />
                                <ColorControl
                                    label={__("Background Color", "essential-blocks")}
                                    color={taxonomiesBgColor}
                                    onChange={(taxonomiesBgColor) =>
                                        handleBlockDefault({ taxonomiesBgColor })
                                    }
                                />
                            </>
                        )}
                        {taxonomiesStyle === "hover" && (
                            <>
                                <ColorControl
                                    label={__("Hover Text Color", "essential-blocks")}
                                    color={taxonomiesHoverTextColor}
                                    onChange={(taxonomiesHoverTextColor) =>
                                        handleBlockDefault({ taxonomiesHoverTextColor })
                                    }
                                />
                                <ColorControl
                                    label={__("Hover Background Color", "essential-blocks")}
                                    color={taxonomiesHoverBgColor}
                                    onChange={(taxonomiesHoverBgColor) =>
                                        handleBlockDefault({ taxonomiesHoverBgColor })
                                    }
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
                            baseLabel={__("Padding", "essential-blocks")}
                        />
                        <ResponsiveDimensionsControl
                            controlName={TAXONOMIES_MARGIN}
                            baseLabel={__("Margin", "essential-blocks")}
                        />
                        <BorderShadowControl
                            controlName={TAXONOMIES_BORDER_SHADOW}
                        />
                    </PanelBody>
                    {prefixType !== "none" && (
                        <PanelBody
                            title={__("Prefix Styles", "essential-blocks")}
                            initialOpen={false}
                        >
                            {prefixType === "text" && (
                                <TypographyDropdown
                                    baseLabel={__("Typography", "essential-blocks")}
                                    typographyPrefixConstant={PREFIX_TYPO}
                                />
                            )}
                            {prefixType === "icon" && (
                                <ResponsiveRangeController
                                    baseLabel={__("Icon Size", "essential-blocks")}
                                    controlName={PREFIX_ICON_SIZE}
                                    min={8}
                                    max={100}
                                    step={1}
                                />
                            )}
                        </PanelBody>
                    )}
                    {suffixType !== "none" && (
                        <PanelBody
                            title={__("Suffix Styles", "essential-blocks")}
                            initialOpen={false}
                        >
                            {suffixType === "text" && (
                                <TypographyDropdown
                                    baseLabel={__("Typography", "essential-blocks")}
                                    typographyPrefixConstant={SUFFIX_TYPO}
                                />
                            )}
                            {suffixType === "icon" && (
                                <ResponsiveRangeController
                                    baseLabel={__("Icon Size", "essential-blocks")}
                                    controlName={SUFFIX_ICON_SIZE}
                                    min={8}
                                    max={100}
                                    step={1}
                                />
                            )}
                        </PanelBody>
                    )}
                    <PanelBody
                        title={__("Margin & Padding", "essential-blocks")}
                        initialOpen={false}
                    >
                        <ResponsiveDimensionsControl
                            controlName={WRAPPER_MARGIN}
                            baseLabel={__("Margin", "essential-blocks")}
                        />
                        <ResponsiveDimensionsControl
                            controlName={WRAPPER_PADDING}
                            baseLabel={__("Padding", "essential-blocks")}
                        />
                    </PanelBody>
                    <PanelBody
                        title={__("Background", "essential-blocks")}
                        initialOpen={false}
                    >
                        <BackgroundControl
                            controlName={WRAPPER_BG}
                        />
                    </PanelBody>
                    <PanelBody
                        title={__("Border & Shadow", "essential-blocks")}
                        initialOpen={false}
                    >
                        <BorderShadowControl
                            controlName={WRAPPER_BORDER_SHADOW}
                        />
                    </PanelBody>
                </div>
            )}
        </>
    );
}

export default withBlockContext(objAttributes)(Taxonomy);
