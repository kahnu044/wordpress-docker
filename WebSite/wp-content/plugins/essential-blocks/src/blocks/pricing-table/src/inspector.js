/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
    ToggleControl,
    SelectControl,
    TextControl,
    Button,
    ButtonGroup,
    BaseControl,
    __experimentalDivider as Divider,
} from "@wordpress/components";

/**
 * Internal dependencies
 */
import {
    TWOUNITS,
    ALIGNMENT,
    buttonIconSpacing,
    buttonIconSize,
    buttonPadding,
    buttonMargin,
    wrapperPadding,
    wrapperMargin,
    titlePadding,
    titleMargin,
    priceCurrencyMargin,
    buttonBorderShadow,
    buttonBackgroundControl,
    priceTableBackground,
    wrapperBorderShadow,
    iconBorderShadow,
    ribbonBorderShadow,
    headerIconSize,
    headerIconWidth,
    headerIconHeight,
    salepriceCurrencyMargin,
    featuresIconSize,
    RIBBON_ALIGNMENT_HORIZONTAL,
    RIBBON_ALIGNMENT_VERTICAL,
} from "./constants";

import {
    typoPrefix_button,
    typoPrefix_title,
    typoPrefix_subtitle,
    typoPrefix_saleprice_currency,
    typoPrefix_price_title,
    typoPrefix_price_currency,
    typoPrefix_saleprice,
    typoPrefix_pricing_period,
    typoPrefix_features_text,
    typoPrefix_ribbon,
} from "./constants/typographyPrefixConstants";

import objAttributes from "./attributes";

import {
    ColorControl,
    ResponsiveRangeController,
    ResponsiveDimensionsControl,
    TypographyDropdown,
    BackgroundControl,
    BorderShadowControl,
    DynamicInputControl,
    EBIconPicker,
    SortControl,
    InspectorPanel
 } from "@essential-blocks/controls";

const Inspector = ({ attributes, setAttributes }) => {
    const {
        resOption,
        pricingStyle,
        title,
        showSubtitle,
        subtitle,
        showHeaderIcon,
        headerIcon,
        showTitleLine,
        mainPrice,
        showOnSale,
        salePrice,
        priceCurrency,
        currencyPlacement,
        pricePeriod,
        periodSeparator,
        hideFeatures,
        showButton,
        buttonIcon,
        buttonIconPosition,
        buttonText,
        buttonURL,
        buttonTextColor,
        hoverTextColor,
        titleTextColor,
        titleLineColor,
        titleBackgroundColor,
        subtitleTextColor,
        showIconBackground,
        iconBackgroundColor,
        iconBackgroundHoverColor,
        iconColor,
        iconHoverColor,
        priceTextColor,
        priceCurrencyTextColor,
        salePriceTextColor,
        salepriceCurrencyTextColor,
        pricingPeriodTextColor,
        featuresTextColor,
        showRibbon,
        ribbonStyle,
        ribbonText,
        ribbonColor,
        ribbonBackgroundColor,
        featuresAlignment,
        buttonAlignment,
        headerAlignment,
        priceAlignment,
        iconAlignment,
        ribbonAlignHorizontal,
        ribbonAlignVertical,
        newWindow,
        showFeatureLine,
        pricingTopBgColor,
        showFeatureIcon,
        featureIcon
    } = attributes;

    const onFeatureAdd = () => {
        const count = attributes.features.length + 1;
        const features = [
            ...attributes.features,
            {
                icon: "fas fa-check",
                text: `Feature ${count}`,
                color: "var(--eb-global-primary-color)",
            },
        ];

        setAttributes({ features });
    };

    const getFeaturesComponents = () => {
        const onFeatureChange = (key, value, position) => {
            const newFeature = { ...attributes.features[position] };
            const newFeatureList = [...attributes.features];
            newFeatureList[position] = newFeature;
            newFeatureList[position][key] = value;
            setAttributes({ features: newFeatureList });
        };

        return attributes.features.map((each, i) => (
            <div key={i}>
                <TextControl
                    onChange={(value) => onFeatureChange("text", value, i)}
                    label={__(
                        "Text",
                        "essential-blocks"
                    )}
                    value={each.text}
                />
                <ToggleControl
                    label={__("Link", "essential-blocks")}
                    checked={each.clickable === "true"}
                    onChange={(value) =>
                        onFeatureChange("clickable", value.toString(), i)
                    }
                />
                {each.clickable === "true" && (
                    <TextControl
                        label={__("Link", "essential-blocks")}
                        value={each.link}
                        onChange={(value) => onFeatureChange("link", value, i)}
                    />
                )}
                {featureIcon && (
                    <>
                        <EBIconPicker
                            value={each.icon}
                            onChange={(value) => onFeatureChange("icon", value, i)}
                        />

                        {each.icon && (
                            <ColorControl
                                label={__("Icon Color", "essential-blocks")}
                                color={each.color}
                                onChange={(value) => onFeatureChange("color", value, i)}
                            />
                        )}
                    </>
                )}
            </div>
        ))
    }

    return (
        <>
            <InspectorPanel advancedControlProps={{
                marginPrefix: wrapperMargin,
                paddingPrefix: wrapperPadding,
                hasBorder: false,
                hasBackground: false,
            }}>
                <InspectorPanel.General>
                    <InspectorPanel.PanelBody
                        title={__(
                            "Settings",
                            "essential-blocks"
                        )}
                        initialOpen={true}
                    >
                        {/* <SelectControl
                            label={__(
                                "Pricing Preset",
                                "essential-blocks"
                            )}
                            value={pricingStyle}
                            options={[
                                {
                                    label: "Default",
                                    value: "style-1",
                                },
                                {
                                    label: "Style 2",
                                    value: "style-2",
                                },
                                {
                                    label: "Style 3",
                                    value: "style-3",
                                },
                                {
                                    label: "Style 4 (New)",
                                    value: "style-4",
                                },
                            ]}
                            onChange={(pricingStyle) =>
                                handlePricingStyle(pricingStyle)
                            }
                        /> */}

                        <TextControl
                            label={__(
                                "Title",
                                "essential-blocks"
                            )}
                            value={title}
                            onChange={(newTitle) =>
                                setAttributes({
                                    title: newTitle,
                                })
                            }
                        />
                        <ToggleControl
                            label={__("Show Subtitle?")}
                            checked={showSubtitle}
                            onChange={() => {
                                setAttributes({
                                    showSubtitle: !showSubtitle,
                                    defaultSubtitle: !showSubtitle,
                                });
                            }}
                        />

                        {showSubtitle && (
                            <TextControl
                                label={__(
                                    "Sub Title",
                                    "essential-blocks"
                                )}
                                value={subtitle}
                                onChange={(newSubtitle) =>
                                    setAttributes({
                                        subtitle: newSubtitle,
                                    })
                                }
                            />
                        )}

                        <ToggleControl
                            label={__("Show Icon?")}
                            checked={showHeaderIcon}
                            onChange={() => {
                                setAttributes({
                                    showHeaderIcon: !showHeaderIcon,
                                    defaultHeaderIcon: !showHeaderIcon,
                                });
                            }}
                        />

                        {showHeaderIcon && (
                            <EBIconPicker
                                value={headerIcon}
                                onChange={(icon) =>
                                    setAttributes({
                                        headerIcon: icon,
                                    })
                                }
                                title={__("Icon", "essential-blocks")}
                            />
                        )}

                        {pricingStyle !== "style-4" && (
                            <ToggleControl
                                label={__("Show title line?")}
                                checked={showTitleLine}
                                onChange={() => {
                                    setAttributes({
                                        showTitleLine: !showTitleLine,
                                        defaultTitleLine: !showTitleLine,
                                    });
                                }}
                            />
                        )}
                    </InspectorPanel.PanelBody>
                    <InspectorPanel.PanelBody
                        title={__("Price", "essential-blocks")}
                        initialOpen={false}
                    >
                        <TextControl
                            label={__(
                                "Price",
                                "essential-blocks"
                            )}
                            value={mainPrice}
                            onChange={(newPrice) =>
                                setAttributes({
                                    mainPrice: newPrice,
                                })
                            }
                        />
                        <ToggleControl
                            label={__("On Sale?")}
                            checked={showOnSale}
                            onChange={() => {
                                setAttributes({
                                    showOnSale: !showOnSale,
                                });
                            }}
                        />
                        {showOnSale && (
                            <TextControl
                                label={__(
                                    "Sale Price",
                                    "essential-blocks"
                                )}
                                value={salePrice}
                                onChange={(newsalePrice) =>
                                    setAttributes({
                                        salePrice: newsalePrice,
                                    })
                                }
                            />
                        )}
                        <TextControl
                            label={__(
                                "Price Currency",
                                "essential-blocks"
                            )}
                            value={priceCurrency}
                            onChange={(newPriceCurrency) =>
                                setAttributes({
                                    priceCurrency: newPriceCurrency,
                                })
                            }
                        />
                        <SelectControl
                            label={__(
                                "Currency Placement",
                                "essential-blocks"
                            )}
                            value={currencyPlacement}
                            options={[
                                {
                                    label: "Left",
                                    value: "left",
                                },
                                {
                                    label: "Right",
                                    value: "right",
                                },
                            ]}
                            onChange={(currencyPlacement) => {
                                setAttributes({
                                    currencyPlacement,
                                });
                            }}
                        />
                        <TextControl
                            label={__("Price Period (per)")}
                            value={pricePeriod}
                            onChange={(pricePeriod) =>
                                setAttributes({ pricePeriod })
                            }
                        />
                        <TextControl
                            label={__(
                                "Period Separator",
                                "essential-blocks"
                            )}
                            value={periodSeparator}
                            onChange={(periodSeparator) =>
                                setAttributes({
                                    periodSeparator,
                                })
                            }
                        />
                        <Divider />
                    </InspectorPanel.PanelBody>
                    <InspectorPanel.PanelBody
                        title={__(
                            "Features",
                            "essential-blocks"
                        )}
                        initialOpen={false}
                    >
                        <ToggleControl
                            label={__("Hide Features?")}
                            checked={hideFeatures}
                            onChange={() => {
                                setAttributes({
                                    hideFeatures: !hideFeatures,
                                });
                            }}
                        />
                        {hideFeatures !== true && (
                            <>
                                <ToggleControl
                                    label={__("Show line?")}
                                    checked={showFeatureLine}
                                    onChange={() => {
                                        setAttributes({
                                            showFeatureLine: !showFeatureLine,
                                        });
                                    }}
                                />
                                <ToggleControl
                                    label={__("Show Icon?")}
                                    checked={showFeatureIcon}
                                    onChange={() => {
                                        setAttributes({
                                            showFeatureIcon: !showFeatureIcon,
                                        });
                                    }}
                                />

                                {/*<SortableFeatures
                                    features={
                                        attributes.features
                                    }
                                    featureIcon={
                                        attributes.showFeatureIcon
                                    }
                                    setAttributes={
                                        setAttributes
                                    }
                                />*/}
                                {/*<Button
                                    className="eb-pricebox-feature-button"
                                    label={__(
                                        "Add feature",
                                        "essential-blocks"
                                    )}
                                    icon="plus-alt"
                                    onClick={onFeatureAdd}
                                >
                                    <span className="eb-pricebox-add-button-label">
                                        {__(
                                            "Add Feature",
                                            "essential-blocks"
                                        )}
                                    </span>
                                </Button>*/}

                                <SortControl
                                    items={attributes.features}
                                    labelKey={'text'}
                                    onSortEnd={features => setAttributes({ features })}
                                    onDeleteItem={index => {
                                        setAttributes({ features: attributes.features.filter((each, i) => i !== index) })
                                    }}
                                    hasSettings={true}
                                    settingsComponents={getFeaturesComponents()}
                                    hasAddButton={true}
                                    onAddItem={onFeatureAdd}
                                    addButtonText={__("Add Features", "essential-blocks")}
                                ></SortControl>
                            </>
                        )}
                    </InspectorPanel.PanelBody>
                    <InspectorPanel.PanelBody
                        title={__("Button", "essential-blocks")}
                        initialOpen={false}
                    >
                        <ToggleControl
                            label={__("Display Button?")}
                            checked={showButton}
                            onChange={() => {
                                setAttributes({
                                    showButton: !showButton,
                                });
                            }}
                        />
                        <EBIconPicker
                            value={buttonIcon}
                            onChange={(icon) =>
                                setAttributes({
                                    buttonIcon: icon,
                                })
                            }
                            title={__("Button Icon", "essential-blocks")}
                        />
                        <BaseControl
                            label={__(
                                "Icon Position",
                                "essential-blocks"
                            )}
                        >
                            <ButtonGroup>
                                {RIBBON_ALIGNMENT_HORIZONTAL.map(
                                    (item, index) => (
                                        <Button
                                            // isLarge
                                            key={index}
                                            isPrimary={
                                                buttonIconPosition ===
                                                item.value
                                            }
                                            isSecondary={
                                                buttonIconPosition !==
                                                item.value
                                            }
                                            onClick={() =>
                                                setAttributes({
                                                    buttonIconPosition:
                                                        item.value,
                                                })
                                            }
                                        >
                                            {item.label}
                                        </Button>
                                    )
                                )}
                            </ButtonGroup>
                        </BaseControl>
                        <ResponsiveRangeController
                            baseLabel={__(
                                "Icon Spacing",
                                "essential-blocks"
                            )}
                            controlName={buttonIconSpacing}
                            min={1}
                            max={60}
                            step={1}
                            noUnits
                        />
                        <DynamicInputControl
                            label={__(
                                "Button Text",
                                "essential-blocks"
                            )}
                            attrName="buttonText"
                            inputValue={buttonText}
                            setAttributes={setAttributes}
                            onChange={(text) =>
                                setAttributes({
                                    buttonText: text,
                                })
                            }
                        />
                        <DynamicInputControl
                            label={__(
                                "Button Link",
                                "essential-blocks"
                            )}
                            attrName="buttonURL"
                            inputValue={buttonURL}
                            setAttributes={setAttributes}
                            onChange={(link) =>
                                setAttributes({
                                    buttonURL: link,
                                })
                            }
                        />

                        {buttonURL && (
                            <ToggleControl
                                label={__(
                                    "Open in New Tab",
                                    "essential-blocks"
                                )}
                                checked={newWindow}
                                onChange={() =>
                                    setAttributes({
                                        newWindow: !newWindow,
                                    })
                                }
                            />
                        )}
                    </InspectorPanel.PanelBody>
                    <InspectorPanel.PanelBody
                        title={__("Ribbon", "essential-blocks")}
                        initialOpen={false}
                    >
                        <ToggleControl
                            label={__(
                                "Featured",
                                "essential-blocks"
                            )}
                            checked={showRibbon}
                            onChange={() => {
                                setAttributes({
                                    showRibbon: !showRibbon,
                                });
                            }}
                        />
                        {showRibbon && (
                            <>
                                <SelectControl
                                    label={__(
                                        "Ribbon Style",
                                        "essential-blocks"
                                    )}
                                    value={ribbonStyle}
                                    options={[
                                        {
                                            label: "Style 1",
                                            value: "ribbon-1",
                                        },
                                        {
                                            label: "Style 2",
                                            value: "ribbon-2",
                                        },
                                        {
                                            label: "Style 3",
                                            value: "ribbon-3",
                                        },
                                        {
                                            label: "Style 4",
                                            value: "ribbon-4",
                                        },
                                    ]}
                                    onChange={(ribbonStyle) => {
                                        setAttributes({
                                            ribbonStyle,
                                        });
                                    }}
                                />
                                {ribbonStyle == "ribbon-1" && (
                                    <BaseControl
                                        label={__(
                                            "Align",
                                            "essential-blocks"
                                        )}
                                    >
                                        <ButtonGroup>
                                            {RIBBON_ALIGNMENT_VERTICAL.map(
                                                (
                                                    item,
                                                    index
                                                ) => (
                                                    <Button
                                                        // isLarge
                                                        key={
                                                            index
                                                        }
                                                        isPrimary={
                                                            ribbonAlignVertical ===
                                                            item.value
                                                        }
                                                        isSecondary={
                                                            ribbonAlignVertical !==
                                                            item.value
                                                        }
                                                        onClick={() =>
                                                            setAttributes(
                                                                {
                                                                    ribbonAlignVertical:
                                                                        item.value,
                                                                }
                                                            )
                                                        }
                                                    >
                                                        {
                                                            item.label
                                                        }
                                                    </Button>
                                                )
                                            )}
                                        </ButtonGroup>
                                    </BaseControl>
                                )}

                                {ribbonStyle !== "ribbon-1" && (
                                    <>
                                        <BaseControl
                                            label={__(
                                                "Align",
                                                "essential-blocks"
                                            )}
                                        >
                                            <ButtonGroup>
                                                {RIBBON_ALIGNMENT_HORIZONTAL.map(
                                                    (
                                                        item,
                                                        index
                                                    ) => (
                                                        <Button
                                                            // isLarge
                                                            key={
                                                                index
                                                            }
                                                            isPrimary={
                                                                ribbonAlignHorizontal ===
                                                                item.value
                                                            }
                                                            isSecondary={
                                                                ribbonAlignHorizontal !==
                                                                item.value
                                                            }
                                                            onClick={() =>
                                                                setAttributes(
                                                                    {
                                                                        ribbonAlignHorizontal:
                                                                            item.value,
                                                                    }
                                                                )
                                                            }
                                                        >
                                                            {
                                                                item.label
                                                            }
                                                        </Button>
                                                    )
                                                )}
                                            </ButtonGroup>
                                        </BaseControl>
                                        <TextControl
                                            label={__(
                                                "Featured Tag Text",
                                                "essential-blocks"
                                            )}
                                            value={ribbonText}
                                            onChange={(
                                                ribbonText
                                            ) =>
                                                setAttributes({
                                                    ribbonText,
                                                })
                                            }
                                        />
                                    </>
                                )}
                            </>
                        )}
                    </InspectorPanel.PanelBody>
                </InspectorPanel.General>
                <InspectorPanel.Style>
                    <InspectorPanel.PanelBody
                        title={__(
                            "Price Table Box",
                            "essential-blocks"
                        )}
                        initialOpen={false}
                    >
                        <BaseControl>
                            <h3 className="eb-control-title">
                                {__(
                                    "Background",
                                    "essential-blocks"
                                )}
                            </h3>
                        </BaseControl>
                        <BackgroundControl
                            controlName={priceTableBackground}
                        />
                        <BaseControl>
                            <h3 className="eb-control-title">
                                Border
                            </h3>
                        </BaseControl>

                        <BorderShadowControl
                            controlName={wrapperBorderShadow}
                        />

                        {pricingStyle == "style-4" && (
                            <ColorControl
                                label={__(
                                    "Pricing Top Color",
                                    "essential-blocks"
                                )}
                                color={pricingTopBgColor}
                                attributeName={'pricingTopBgColor'}
                            />
                        )}
                    </InspectorPanel.PanelBody>
                    <InspectorPanel.PanelBody
                        title={__("Header", "essential-blocks")}
                        initialOpen={false}
                    >
                        <BaseControl>
                            <h3 className="eb-control-title">
                                {__(
                                    "Alignment",
                                    "essential-blocks"
                                )}
                            </h3>
                            <ButtonGroup>
                                {ALIGNMENT.map(
                                    (item, index) => (
                                        <Button
                                            key={index}
                                            isPrimary={
                                                headerAlignment ===
                                                item.value
                                            }
                                            isSecondary={
                                                headerAlignment !==
                                                item.value
                                            }
                                            onClick={() =>
                                                setAttributes({
                                                    headerAlignment:
                                                        item.value,
                                                })
                                            }
                                        >
                                            {item.label}
                                        </Button>
                                    )
                                )}
                            </ButtonGroup>
                        </BaseControl>
                        <Divider />
                        <BaseControl>
                            <h3 className="eb-control-title">
                                {__(
                                    "Title Style",
                                    "essential-blocks"
                                )}
                            </h3>
                        </BaseControl>
                        <ColorControl
                            label={__(
                                "Color",
                                "essential-blocks"
                            )}
                            color={titleTextColor}
                            attributeName={'titleTextColor'}
                        />
                        {showTitleLine &&
                            pricingStyle !== "style-4" && (
                                <ColorControl
                                    label={__(
                                        "Line Color",
                                        "essential-blocks"
                                    )}
                                    color={titleLineColor}
                                    attributeName={'titleLineColor'}
                                />
                            )}

                        <ColorControl
                            label={__(
                                "Background Color",
                                "essential-blocks"
                            )}
                            color={titleBackgroundColor}
                            attributeName={'titleBackgroundColor'}
                        />
                        <TypographyDropdown
                            baseLabel={__(
                                "Typography",
                                "essential-blocks"
                            )}
                            typographyPrefixConstant={
                                typoPrefix_title
                            }
                        />
                        <Divider />
                        {showSubtitle && (
                            <>
                                <BaseControl>
                                    <h3 className="eb-control-title">
                                        {__(
                                            "Subtitle Style",
                                            "essential-blocks"
                                        )}
                                    </h3>
                                </BaseControl>
                                <ColorControl
                                    label={__(
                                        "Color",
                                        "essential-blocks"
                                    )}
                                    color={subtitleTextColor}
                                    attributeName={'subtitleTextColor'}
                                />
                                <TypographyDropdown
                                    baseLabel={__(
                                        "Typography",
                                        "essential-blocks"
                                    )}
                                    typographyPrefixConstant={
                                        typoPrefix_subtitle
                                    }
                                />
                                <Divider />
                            </>
                        )}
                        <BaseControl>
                            <h3 className="eb-control-title">
                                {__("Margin & Padding")}
                            </h3>
                        </BaseControl>
                        <ResponsiveDimensionsControl
                            controlName={titlePadding}
                            baseLabel={__(
                                "Padding",
                                "essential-blocks"
                            )}
                        />
                        <ResponsiveDimensionsControl
                            controlName={titleMargin}
                            baseLabel={__(
                                "Margin",
                                "essential-blocks"
                            )}
                        />
                    </InspectorPanel.PanelBody>
                    <InspectorPanel.PanelBody
                        title={__("Price", "essential-blocks")}
                        initialOpen={false}
                    >
                        <BaseControl>
                            <h3 className="eb-control-title">
                                {__(
                                    "Alignment",
                                    "essential-blocks"
                                )}
                            </h3>
                            <ButtonGroup>
                                {ALIGNMENT.map(
                                    (item, index) => (
                                        <Button
                                            key={index}
                                            isPrimary={
                                                priceAlignment ===
                                                item.value
                                            }
                                            isSecondary={
                                                priceAlignment !==
                                                item.value
                                            }
                                            onClick={() =>
                                                setAttributes({
                                                    priceAlignment:
                                                        item.value,
                                                })
                                            }
                                        >
                                            {item.label}
                                        </Button>
                                    )
                                )}
                            </ButtonGroup>
                        </BaseControl>
                        <Divider />
                        <BaseControl>
                            <h3 className="eb-control-title">
                                {__(
                                    "Original Price",
                                    "essential-blocks"
                                )}
                            </h3>
                        </BaseControl>
                        <ColorControl
                            label={__(
                                "Color",
                                "essential-blocks"
                            )}
                            color={priceTextColor}
                            attributeName={'priceTextColor'}
                        />
                        <TypographyDropdown
                            baseLabel={__(
                                "Typography",
                                "essential-blocks"
                            )}
                            typographyPrefixConstant={
                                typoPrefix_price_title
                            }
                        />
                        <Divider />
                        <BaseControl>
                            <h3 className="eb-control-title">
                                {__(
                                    "Original Price Currency",
                                    "essential-blocks"
                                )}
                            </h3>
                        </BaseControl>
                        <ColorControl
                            label={__(
                                "Color",
                                "essential-blocks"
                            )}
                            color={priceCurrencyTextColor}
                            attributeName={'priceCurrencyTextColor'}
                        />
                        <TypographyDropdown
                            baseLabel={__(
                                "Typography",
                                "essential-blocks"
                            )}
                            typographyPrefixConstant={
                                typoPrefix_price_currency
                            }
                        />
                        <ResponsiveDimensionsControl
                            controlName={priceCurrencyMargin}
                            baseLabel={__(
                                "Margin",
                                "essential-blocks"
                            )}
                        />
                        <Divider />
                        {showOnSale && (
                            <>
                                <BaseControl>
                                    <h3 className="eb-control-title">
                                        {__(
                                            "Sale Price",
                                            "essential-blocks"
                                        )}
                                    </h3>
                                </BaseControl>
                                <ColorControl
                                    label={__(
                                        "Color",
                                        "essential-blocks"
                                    )}
                                    color={salePriceTextColor}
                                    attributeName={'salePriceTextColor'}
                                />
                                <TypographyDropdown
                                    baseLabel={__(
                                        "Typography",
                                        "essential-blocks"
                                    )}
                                    typographyPrefixConstant={
                                        typoPrefix_saleprice
                                    }
                                />
                                <Divider />
                                <BaseControl>
                                    <h3 className="eb-control-title">
                                        {__(
                                            "Sale Price Currency",
                                            "essential-blocks"
                                        )}
                                    </h3>
                                </BaseControl>
                                <ColorControl
                                    label={__(
                                        "Color",
                                        "essential-blocks"
                                    )}
                                    color={
                                        salepriceCurrencyTextColor
                                    }
                                    attributeName={'salepriceCurrencyTextColor'}
                                />
                                <TypographyDropdown
                                    baseLabel={__(
                                        "Typography",
                                        "essential-blocks"
                                    )}
                                    typographyPrefixConstant={
                                        typoPrefix_saleprice_currency
                                    }
                                />
                                <ResponsiveDimensionsControl
                                    controlName={
                                        salepriceCurrencyMargin
                                    }
                                    baseLabel={__(
                                        "Margin",
                                        "essential-blocks"
                                    )}
                                />
                                <Divider />
                            </>
                        )}
                        <BaseControl>
                            <h3 className="eb-control-title">
                                {__(
                                    "Pricing Period",
                                    "essential-blocks"
                                )}
                            </h3>
                        </BaseControl>
                        <ColorControl
                            label={__(
                                "Color",
                                "essential-blocks"
                            )}
                            color={pricingPeriodTextColor}
                            attributeName={'pricingPeriodTextColor'}
                        />
                        <TypographyDropdown
                            baseLabel={__(
                                "Typography",
                                "essential-blocks"
                            )}
                            typographyPrefixConstant={
                                typoPrefix_pricing_period
                            }
                        />
                    </InspectorPanel.PanelBody>
                    <InspectorPanel.PanelBody
                        title={__(
                            "Features",
                            "essential-blocks"
                        )}
                        initialOpen={false}
                    >
                        <BaseControl>
                            <h3 className="eb-control-title">
                                Alignment
                            </h3>
                            <ButtonGroup>
                                {ALIGNMENT.map(
                                    (item, index) => (
                                        <Button
                                            key={index}
                                            isPrimary={
                                                featuresAlignment ===
                                                item.value
                                            }
                                            isSecondary={
                                                featuresAlignment !==
                                                item.value
                                            }
                                            onClick={() =>
                                                setAttributes({
                                                    featuresAlignment:
                                                        item.value,
                                                })
                                            }
                                        >
                                            {item.label}
                                        </Button>
                                    )
                                )}
                            </ButtonGroup>
                        </BaseControl>
                        <Divider />
                        <ColorControl
                            label={__(
                                "Color",
                                "essential-blocks"
                            )}
                            color={featuresTextColor}
                            attributeName={'featuresTextColor'}
                        />
                        {showFeatureIcon && (
                            <ResponsiveRangeController
                                baseLabel={__(
                                    "Icon Size",
                                    "essential-blocks"
                                )}
                                controlName={featuresIconSize}
                                min={0}
                                max={50}
                                step={1}
                                noUnits
                            />
                        )}

                        <TypographyDropdown
                            baseLabel={__(
                                "Typography",
                                "essential-blocks"
                            )}
                            typographyPrefixConstant={
                                typoPrefix_features_text
                            }
                        />
                    </InspectorPanel.PanelBody>
                    <InspectorPanel.PanelBody
                        title={__("Button", "essential-blocks")}
                        initialOpen={false}
                    >
                        <BaseControl>
                            <h3 className="eb-control-title">
                                Alignment
                            </h3>
                            <ButtonGroup>
                                {ALIGNMENT.map(
                                    (item, index) => (
                                        <Button
                                            key={index}
                                            isPrimary={
                                                buttonAlignment ===
                                                item.value
                                            }
                                            isSecondary={
                                                buttonAlignment !==
                                                item.value
                                            }
                                            onClick={() =>
                                                setAttributes({
                                                    buttonAlignment:
                                                        item.value,
                                                })
                                            }
                                        >
                                            {item.label}
                                        </Button>
                                    )
                                )}
                            </ButtonGroup>
                        </BaseControl>
                        <Divider />
                        <ResponsiveDimensionsControl
                            controlName={buttonPadding}
                            baseLabel={__(
                                "Padding",
                                "essential-blocks"
                            )}
                        />
                        <ResponsiveDimensionsControl
                            controlName={buttonMargin}
                            baseLabel={__(
                                "Margin",
                                "essential-blocks"
                            )}
                        />
                        <ResponsiveRangeController
                            baseLabel={__(
                                "Icon Size",
                                "essential-blocks"
                            )}
                            controlName={buttonIconSize}
                            min={0}
                            max={50}
                            step={1}
                            noUnits
                        />
                        <TypographyDropdown
                            baseLabel={__(
                                "Typography",
                                "essential-blocks"
                            )}
                            typographyPrefixConstant={
                                typoPrefix_button
                            }
                        />
                        <ColorControl
                            label={__(
                                "Text Color",
                                "essential-blocks"
                            )}
                            color={buttonTextColor}
                            attributeName={'buttonTextColor'}
                        />
                        <ColorControl
                            label={__(
                                "Text Hover Color",
                                "essential-blocks"
                            )}
                            color={hoverTextColor}
                            attributeName={'hoverTextColor'}
                        />
                        <BaseControl>
                            <h3 className="eb-control-title">
                                {__(
                                    "Button Background",
                                    "essential-blocks"
                                )}
                            </h3>
                        </BaseControl>
                        <BackgroundControl
                            controlName={
                                buttonBackgroundControl
                            }
                            noOverlay={true}
                            noMainBgi={true}
                        />
                        <BaseControl>
                            <h3 className="eb-control-title">
                                {__(
                                    "Button Border Style",
                                    "essential-blocks"
                                )}
                            </h3>
                        </BaseControl>
                        <BorderShadowControl
                            controlName={buttonBorderShadow}
                        />
                    </InspectorPanel.PanelBody>
                    {showHeaderIcon && (
                        <InspectorPanel.PanelBody
                            title={__(
                                "Icon Settings",
                                "essential-blocks"
                            )}
                            initialOpen={false}
                        >
                            <BaseControl>
                                <h3 className="eb-control-title">
                                    {__(
                                        "Alignment",
                                        "essential-blocks"
                                    )}
                                </h3>
                                <ButtonGroup>
                                    {ALIGNMENT.map(
                                        (item, index) => (
                                            <Button
                                                key={index}
                                                isPrimary={
                                                    iconAlignment ===
                                                    item.value
                                                }
                                                isSecondary={
                                                    iconAlignment !==
                                                    item.value
                                                }
                                                onClick={() =>
                                                    setAttributes(
                                                        {
                                                            iconAlignment:
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
                            <Divider />
                            <ToggleControl
                                label={__(
                                    "Show Background",
                                    "essential-blocks"
                                )}
                                checked={showIconBackground}
                                onChange={() => {
                                    setAttributes({
                                        showIconBackground: !showIconBackground,
                                    });
                                }}
                            />
                            {showIconBackground && (
                                <>
                                    <ColorControl
                                        label={__(
                                            "Background Color",
                                            "essential-blocks"
                                        )}
                                        color={
                                            iconBackgroundColor
                                        }
                                        attributeName={'iconBackgroundColor'}
                                    />
                                    <ColorControl
                                        label={__(
                                            "Background Hover Color",
                                            "essential-blocks"
                                        )}
                                        color={
                                            iconBackgroundHoverColor
                                        }
                                        attributeName={'iconBackgroundHoverColor'}
                                    />
                                    <Divider />
                                </>
                            )}
                            <ResponsiveRangeController
                                baseLabel={__(
                                    "Icon Size",
                                    "essential-blocks"
                                )}
                                controlName={headerIconSize}
                                min={0}
                                max={200}
                                step={1}
                            />
                            <ResponsiveRangeController
                                baseLabel={__(
                                    "Icon Area Width",
                                    "essential-blocks"
                                )}
                                controlName={headerIconWidth}
                                units={TWOUNITS}
                                min={0}
                                max={500}
                                step={1}
                            />
                            <ResponsiveRangeController
                                baseLabel={__(
                                    "Icon Area Height",
                                    "essential-blocks"
                                )}
                                controlName={headerIconHeight}
                                units={TWOUNITS}
                                min={0}
                                max={500}
                                step={1}
                            />
                            <ColorControl
                                label={__(
                                    "Icon Color",
                                    "essential-blocks"
                                )}
                                color={iconColor}
                                attributeName={'iconColor'}
                            />
                            <ColorControl
                                label={__(
                                    "Icon Hover Color",
                                    "essential-blocks"
                                )}
                                color={iconHoverColor}
                                attributeName={'iconHoverColor'}
                            />
                            <Divider />
                            <BaseControl>
                                <h3 className="eb-control-title">
                                    Border
                                </h3>
                            </BaseControl>
                            <BorderShadowControl
                                controlName={iconBorderShadow}
                                noShadow
                            />
                        </InspectorPanel.PanelBody>
                    )}
                    {showRibbon && (
                        <InspectorPanel.PanelBody
                            title={__(
                                "Ribbon",
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
                                    typoPrefix_ribbon
                                }
                            />
                            <ColorControl
                                label={__(
                                    "Color",
                                    "essential-blocks"
                                )}
                                color={ribbonColor}
                                attributeName={'ribbonColor'}
                            />
                            <ColorControl
                                label={__(
                                    "Background Color",
                                    "essential-blocks"
                                )}
                                color={ribbonBackgroundColor}
                                attributeName={'ribbonBackgroundColor'}
                            />
                            <BorderShadowControl
                                controlName={ribbonBorderShadow}
                                noBorder
                            />
                        </InspectorPanel.PanelBody>
                    )}
                </InspectorPanel.Style>
            </InspectorPanel>
                
        </>
        
    );
};

export default Inspector;
