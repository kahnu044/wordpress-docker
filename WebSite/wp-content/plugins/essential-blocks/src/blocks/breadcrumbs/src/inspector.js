/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
    BaseControl,
    ToggleControl,
    RangeControl,
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
    ALIGNMENT,
    PREFIX_TYPES,
    BREADCRUMB_TYPES,
    BREADCRUMB_PADDING,
    BREADCRUMB_BORDER_SHADOW,
    PREFIX_ICON_SIZE,
    SEPARATOR_ICON_SIZE,
} from "./constants/constants";
import {
    BREADCRUMB_TYPO,
    PREFIX_TYPO,
    SEPARATOR_TYPO
} from "./constants/typographyPrefixConstants";
import {
    ResponsiveRangeController,
    ResponsiveDimensionsControl,
    TypographyDropdown,
    DynamicInputControl,
    ColorControl,
    InspectorPanel,
    EBIconPicker,
    BorderShadowControl,
} from "@essential-blocks/controls";

import objAttributes from "./attributes";

function Inspector(props) {
    const { attributes, setAttributes } = props;
    const {
        resOption,
        prefixType,
        prefixIcon,
        prefixText,
        prefixColor,
        breadcrumbAlign,
        breadcrumbType,
        showPrefix,
        showHomePage,
        homePageLabel,
        separatorType,
        separatorIcon,
        separatorText,
        separatorColor,
        breadcrumbGap,
        prefixGap,
        breadcrumbColor,
        breadcrumbHvColor,
        breadcrumbCurrentColor,
        breadcrumbCurrentHvColor,
    } = attributes;

    return (
        <InspectorPanel advancedControlProps={{
            marginPrefix: WRAPPER_MARGIN,
            paddingPrefix: WRAPPER_PADDING,
            backgroundPrefix: WRAPPER_BG,
            borderPrefix: WRAPPER_BORDER_SHADOW,
            hasMargin: true
        }}>
            <InspectorPanel.General>
                <InspectorPanel.PanelBody title={__("Settings", "essential-blocks")} initialOpen={true}>
                    <ToggleControl
                        label={__("Show Home Page", "essential-blocks")}
                        checked={showHomePage}
                        onChange={() => setAttributes({ showHomePage: !showHomePage })}
                        __nextHasNoMarginBottom
                    />
                    {showHomePage && (
                        <DynamicInputControl
                            label="Label for Home Page"
                            attrName="homePageLabel"
                            inputValue={homePageLabel}
                            setAttributes={setAttributes}
                            onChange={(text) =>
                                setAttributes({
                                    homePageLabel: text,
                                })
                            }
                        />
                    )}
                    <ToggleControl
                        label={__("Show Prefix", "essential-blocks")}
                        checked={showPrefix}
                        onChange={() => setAttributes({ showPrefix: !showPrefix })}
                        __nextHasNoMarginBottom
                    />
                    {showPrefix === true && (
                        <>
                            <ToggleGroupControl
                                label={__("Prefix Type", "essential-blocks")}

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

                            {prefixType === "icon" && (
                                <EBIconPicker
                                    value={prefixIcon}
                                    attributeName={'prefixIcon'}
                                    enableSvgUpload={false}
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

                    <ToggleGroupControl
                        label={__("Separator Type", "essential-blocks")}

                        value={separatorType}
                        onChange={(value) =>
                            setAttributes({
                                separatorType: value,
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

                    {separatorType === "icon" && (
                        <EBIconPicker
                            value={separatorIcon}
                            attributeName={'separatorIcon'}
                            enableSvgUpload={false}
                        />
                    )}
                    {separatorType === "text" && (
                        <>
                            <DynamicInputControl
                                label="Separator Text"
                                attrName="separatorText"
                                inputValue={separatorText}
                                setAttributes={setAttributes}
                                onChange={(text) =>
                                    setAttributes({
                                        separatorText: text,
                                    })
                                }
                            />
                        </>
                    )}
                </InspectorPanel.PanelBody>
            </InspectorPanel.General>
            <InspectorPanel.Style>
                <InspectorPanel.PanelBody
                    title={__("Styles", "essential-blocks")}
                    initialOpen={true}
                >
                    <ToggleGroupControl
                        label={__("Alignment", "essential-blocks")}

                        value={breadcrumbAlign}
                        onChange={(value) =>
                            setAttributes({
                                breadcrumbAlign: value,
                            })
                        }
                        isBlock
                        __next40pxDefaultSize
                        __nextHasNoMarginBottom
                    >
                        {ALIGNMENT.map((item, index) => (
                            <ToggleGroupControlOption
                                key={index}
                                value={item.value}
                                label={item.label}
                            />
                        ))}
                    </ToggleGroupControl>

                    <RangeControl
                        label={__(
                            "Gap",
                            "essential-blocks"
                        )}
                        value={breadcrumbGap}
                        onChange={(breadcrumbGap) =>
                            setAttributes({
                                breadcrumbGap,
                            })
                        }
                        min={1}
                        max={500}
                        step={1}
                        allowReset={true}
                        __nextHasNoMarginBottom
                        __next40pxDefaultSize
                    />
                    <TypographyDropdown
                        baseLabel={__("Typography", "essential-blocks")}
                        typographyPrefixConstant={BREADCRUMB_TYPO}
                    />
                    <ToggleGroupControl

                        value={breadcrumbType}
                        onChange={(value) =>
                            setAttributes({
                                breadcrumbType: value,
                            })
                        }
                        isBlock
__next40pxDefaultSize
__nextHasNoMarginBottom
                    >
                        {BREADCRUMB_TYPES.map(
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
                    {breadcrumbType === 'normal' && (
                        <>
                            <ColorControl
                                label={__("Color", "essential-blocks")}
                                color={breadcrumbColor}
                                attributeName={'breadcrumbColor'}
                            />
                            <ColorControl
                                label={__("Current Item Color", "essential-blocks")}
                                color={breadcrumbCurrentColor}
                                attributeName={'breadcrumbCurrentColor'}
                            />
                        </>
                    )}
                    {breadcrumbType === 'hover' && (
                        <>
                            <ColorControl
                                label={__("Color", "essential-blocks")}
                                color={breadcrumbHvColor}
                                attributeName={'breadcrumbHvColor'}
                            />
                            <ColorControl
                                label={__("Current Item Color", "essential-blocks")}
                                color={breadcrumbCurrentHvColor}
                                attributeName={'breadcrumbCurrentHvColor'}
                            />
                        </>
                    )}

                    <ResponsiveDimensionsControl
                        controlName={BREADCRUMB_PADDING}
                        baseLabel="Padding"
                    />
                    <BaseControl __nextHasNoMarginBottom>
                        <h3 className="eb-control-title">{__("Border", "essential-blocks")}</h3>
                    </BaseControl>
                    <BorderShadowControl
                        controlName={BREADCRUMB_BORDER_SHADOW}
                    // noShadow
                    // noBorder
                    />

                </InspectorPanel.PanelBody>

                <InspectorPanel.PanelBody
                    title={__("Separators", "essential-blocks")}
                    initialOpen={false}
                >
                    <ColorControl
                        label={__("Color", "essential-blocks")}
                        color={separatorColor}
                        attributeName={'separatorColor'}
                    />
                    {separatorType == 'text' && (
                        <TypographyDropdown
                            baseLabel={__("Typography", "essential-blocks")}
                            typographyPrefixConstant={SEPARATOR_TYPO}
                        />
                    )}

                    {separatorType === "icon" &&
                        separatorIcon && (
                            <ResponsiveRangeController
                                baseLabel={__(
                                    "Icon Size",
                                    "essential-blocks"
                                )}
                                controlName={
                                    SEPARATOR_ICON_SIZE
                                }
                                min={8}
                                max={200}
                                step={1}
                            />
                        )
                    }
                </InspectorPanel.PanelBody>

                {showPrefix && (
                    <InspectorPanel.PanelBody
                        title={__("Prefix", "essential-blocks")}
                        initialOpen={false}
                    >

                        <ColorControl
                            label={__("Color", "essential-blocks")}
                            color={prefixColor}
                            attributeName={'prefixColor'}
                        />

                        {prefixType === "text" && (
                            <TypographyDropdown
                                baseLabel={__("Typography", "essential-blocks")}
                                typographyPrefixConstant={PREFIX_TYPO}
                            />
                        )}

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

                        <RangeControl
                            label={__(
                                "Right Gap",
                                "essential-blocks"
                            )}
                            value={prefixGap}
                            onChange={(prefixGap) =>
                                setAttributes({
                                    prefixGap,
                                })
                            }
                            min={1}
                            max={500}
                            step={1}
                            allowReset={true}
                            __nextHasNoMarginBottom
                            __next40pxDefaultSize
                        />
                    </InspectorPanel.PanelBody>
                )}
            </InspectorPanel.Style>
        </InspectorPanel>
    );
}

export default Inspector;
