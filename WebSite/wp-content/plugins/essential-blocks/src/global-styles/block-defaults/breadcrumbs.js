/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
    PanelBody,
    SelectControl,
    ToggleControl,
    RangeControl,
    Button,
    ButtonGroup,
    BaseControl,
} from "@wordpress/components";

/**
 * Internal dependencies
 */
import {
    WRAPPER_BG,
    WRAPPER_MARGIN,
    WRAPPER_PADDING,
    WRAPPER_BORDER_SHADOW,
    ALIGNMENT,
    PREFIX_TYPES,
    BREADCRUMB_TYPES,
    BREADCRUMB_PADDING,
    BREADCRUMB_BORDER_SHADOW,
    PREFIX_ICON_SIZE,
    SEPARATOR_ICON_SIZE,
} from "@essential-blocks/blocks/breadcrumbs/src/constants/constants";

import {
    BREADCRUMB_TYPO,
    PREFIX_TYPO,
    SEPARATOR_TYPO
} from "@essential-blocks/blocks/breadcrumbs/src/constants/typographyPrefixConstants";

import objAttributes from "@essential-blocks/blocks/breadcrumbs/src/attributes";

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

function Breadcrumbs(props) {
    const { blockDefaults, setBlockDefaults, name, deviceType, handleBlockDefault } = props;

    const {
        breadcrumbAlign,
        breadcrumbType,
        breadcrumbColor,
        breadcrumbHvColor,
        breadcrumbCurrentColor,
        breadcrumbCurrentHvColor,
        showPrefix,
        showHomePage,
        homePageLabel,
        prefixType,
        prefixIcon,
        prefixText,
        prefixColor,
        prefixGap,
        separatorType,
        separatorText,
        separatorIcon,
        separatorColor,
        separatorGap,
    } = blockDefaults;

    const isDefaultSet = useBlockDefaults(name, blockDefaults, setBlockDefaults, objAttributes)

    return (
        <>
            {isDefaultSet && (
                <div className="eb-panel-control">
                    <PanelBody
                        title={__("General Settings", "essential-blocks")}
                        initialOpen={true}
                    >
                        <BaseControl label={__("Alignment", "essential-blocks")}>
                            <ButtonGroup>
                                {ALIGNMENT.map((item, index) => (
                                    <Button
                                        key={index}
                                        isPrimary={breadcrumbAlign === item.value}
                                        isSecondary={breadcrumbAlign !== item.value}
                                        onClick={() =>
                                            handleBlockDefault({
                                                breadcrumbAlign: item.value,
                                            })
                                        }
                                    >
                                        {item.label}
                                    </Button>
                                ))}
                            </ButtonGroup>
                        </BaseControl>
                        <ToggleControl
                            label={__("Show Home Page", "essential-blocks")}
                            checked={showHomePage}
                            onChange={(showHomePage) =>
                                handleBlockDefault({ showHomePage })
                            }
                        />
                        {showHomePage && (
                            <DynamicInputControl
                                label={__("Home Page Label", "essential-blocks")}
                                attrName="homePageLabel"
                                inputValue={homePageLabel}
                                setAttributes={handleBlockDefault}
                                onChange={(homePageLabel) =>
                                    handleBlockDefault({ homePageLabel })
                                }
                            />
                        )}
                        <ToggleControl
                            label={__("Show Prefix", "essential-blocks")}
                            checked={showPrefix}
                            onChange={(showPrefix) =>
                                handleBlockDefault({ showPrefix })
                            }
                        />
                        {showPrefix && (
                            <>
                                <SelectControl
                                    label={__("Prefix Type", "essential-blocks")}
                                    value={prefixType}
                                    options={PREFIX_TYPES}
                                    onChange={(prefixType) =>
                                        handleBlockDefault({ prefixType })
                                    }
                                />
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
                                <RangeControl
                                    label={__("Right Gap", "essential-blocks")}
                                    value={prefixGap}
                                    onChange={(prefixGap) =>
                                        handleBlockDefault({ prefixGap })
                                    }
                                    min={1}
                                    max={500}
                                    step={1}
                                    allowReset={true}
                                />
                            </>
                        )}
                    </PanelBody>
                    <PanelBody
                        title={__("Separator Settings", "essential-blocks")}
                        initialOpen={false}
                    >
                        <SelectControl
                            label={__("Separator Type", "essential-blocks")}
                            value={separatorType}
                            options={PREFIX_TYPES}
                            onChange={(separatorType) =>
                                handleBlockDefault({ separatorType })
                            }
                        />
                        {separatorType === "text" && (
                            <DynamicInputControl
                                label={__("Separator Text", "essential-blocks")}
                                attrName="separatorText"
                                inputValue={separatorText}
                                setAttributes={handleBlockDefault}
                                onChange={(separatorText) =>
                                    handleBlockDefault({ separatorText })
                                }
                            />
                        )}
                        {separatorType === "icon" && (
                            <EBIconPicker
                                value={separatorIcon}
                                onChange={(separatorIcon) =>
                                    handleBlockDefault({ separatorIcon })
                                }
                                title={__("Select Separator Icon", "essential-blocks")}
                            />
                        )}
                        <ColorControl
                            label={__("Separator Color", "essential-blocks")}
                            color={separatorColor}
                            onChange={(separatorColor) =>
                                handleBlockDefault({ separatorColor })
                            }
                        />
                        <RangeControl
                            label={__("Separator Gap", "essential-blocks")}
                            value={separatorGap}
                            onChange={(separatorGap) =>
                                handleBlockDefault({ separatorGap })
                            }
                            min={1}
                            max={500}
                            step={1}
                            allowReset={true}
                        />
                        {separatorType === "text" && (
                            <TypographyDropdown
                                baseLabel={__("Typography", "essential-blocks")}
                                typographyPrefixConstant={SEPARATOR_TYPO}
                            />
                        )}
                        {separatorType === "icon" && (
                            <ResponsiveRangeController
                                baseLabel={__("Icon Size", "essential-blocks")}
                                controlName={SEPARATOR_ICON_SIZE}
                                min={8}
                                max={200}
                                step={1}
                            />
                        )}
                    </PanelBody>
                    <PanelBody
                        title={__("Breadcrumb Styles", "essential-blocks")}
                        initialOpen={false}
                    >
                        <TypographyDropdown
                            baseLabel={__("Typography", "essential-blocks")}
                            typographyPrefixConstant={BREADCRUMB_TYPO}
                        />
                        <BaseControl>
                            <ButtonGroup>
                                {BREADCRUMB_TYPES.map(({ label, value }, index) => (
                                    <Button
                                        key={index}
                                        isSecondary={breadcrumbType !== value}
                                        isPrimary={breadcrumbType === value}
                                        onClick={() =>
                                            handleBlockDefault({
                                                breadcrumbType: value,
                                            })
                                        }
                                    >
                                        {label}
                                    </Button>
                                ))}
                            </ButtonGroup>
                        </BaseControl>
                        {breadcrumbType === 'normal' && (
                            <>
                                <ColorControl
                                    label={__("Color", "essential-blocks")}
                                    color={breadcrumbColor}
                                    onChange={(breadcrumbColor) =>
                                        handleBlockDefault({ breadcrumbColor })
                                    }
                                />
                                <ColorControl
                                    label={__("Current Item Color", "essential-blocks")}
                                    color={breadcrumbCurrentColor}
                                    onChange={(breadcrumbCurrentColor) =>
                                        handleBlockDefault({ breadcrumbCurrentColor })
                                    }
                                />
                            </>
                        )}
                        {breadcrumbType === 'hover' && (
                            <>
                                <ColorControl
                                    label={__("Color", "essential-blocks")}
                                    color={breadcrumbHvColor}
                                    onChange={(breadcrumbHvColor) =>
                                        handleBlockDefault({ breadcrumbHvColor })
                                    }
                                />
                                <ColorControl
                                    label={__("Current Item Color", "essential-blocks")}
                                    color={breadcrumbCurrentHvColor}
                                    onChange={(breadcrumbCurrentHvColor) =>
                                        handleBlockDefault({ breadcrumbCurrentHvColor })
                                    }
                                />
                            </>
                        )}
                        <ResponsiveDimensionsControl
                            controlName={BREADCRUMB_PADDING}
                            baseLabel={__("Padding", "essential-blocks")}
                        />
                        <BaseControl>
                            <h3 className="eb-control-title">{__("Border", "essential-blocks")}</h3>
                        </BaseControl>
                        <BorderShadowControl
                            controlName={BREADCRUMB_BORDER_SHADOW}
                        />
                    </PanelBody>
                    {showPrefix && (
                        <PanelBody
                            title={__("Prefix Styles", "essential-blocks")}
                            initialOpen={false}
                        >
                            <ColorControl
                                label={__("Color", "essential-blocks")}
                                color={prefixColor}
                                onChange={(prefixColor) =>
                                    handleBlockDefault({ prefixColor })
                                }
                            />
                            {prefixType === "text" && (
                                <TypographyDropdown
                                    baseLabel={__("Typography", "essential-blocks")}
                                    typographyPrefixConstant={PREFIX_TYPO}
                                />
                            )}
                            {prefixType === "icon" && prefixIcon && (
                                <ResponsiveRangeController
                                    baseLabel={__("Icon Size", "essential-blocks")}
                                    controlName={PREFIX_ICON_SIZE}
                                    min={8}
                                    max={200}
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

export default withBlockContext(objAttributes)(Breadcrumbs);
