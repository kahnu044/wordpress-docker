/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
    PanelBody,
    ToggleControl,
    SelectControl,
    BaseControl,
    TextControl,
    __experimentalDivider as Divider,
    __experimentalToggleGroupControl as ToggleGroupControl,
    __experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from "@wordpress/components";

/**
 * Internal dependencies
 */
import {
    TITLE_TAG,
    CONNECTOR_STYLE,
    CONNECTOR_TYPE,
    ICON_SHAPE,
    SHAPE_VIEW,
    ICON_POSITION,
    FEATURE_ITEM_POSITION,
    BADGE_POSITION,
    connectorWidth,
    listSpace,
    rowSpace,
    iconBackgroundType,
    iconBackgroundSize,
    iconSize,
    iconPadding,
    iconSpace,
    titleSpace,
    iconBorder,
    wrapperMargin,
    wrapperPadding,
    boxPadding,
    boxBackgroundType,
    boxBorder,
    wrapperBackgroundType,
    wrapperBorder,
    MEDIA_TYPES,
    listBackgroundType,
    listBorderShadow,
    listPadding,
    badgePadding,
    badgeBorder,
    iconLiquidGlassShadowEffectBorder,
} from "./constants";

import {
    typoPrefix_title,
    typoPrefix_content,
    typoPrefix_badge,
} from "./constants/typographyPrefixConstants";

import {
    ColorControl,
    ResponsiveRangeController,
    ResponsiveDimensionsControl,
    TypographyDropdown,
    BackgroundControl,
    BorderShadowControl,
    InspectorPanel,
    SortControl,
    ImageComponent,
    EBIconPicker,
    LiquidGlassEffectControl,
    EBTextControl,
} from "@essential-blocks/controls";
import { RangeControl } from "@wordpress/components";

const Inspector = ({ attributes, setAttributes }) => {
    const {
        resOption,
        titleTag,
        iconShape,
        shapeView,
        iconPosition,
        iconGlobalColor,
        titleTextColor,
        descTextColor,
        showContentVertical,
        showConnector,
        connectorStyle,
        connectorType,
        connectorColor,
        titleTextHoverColor,
        useInlineDesign,
        featureListAlign,
        iconLiquidGlass,
        designItemBox,
        badgeTextColor,
        badgeBackgroundColor,
        badgeGap
    } = attributes;

    const onFeatureAdd = () => {
        const count = attributes.features.length + 1;
        const features = [
            ...attributes.features,
            {
                iconType: "icon",
                featuresImage: "",
                featuresImageId: "",
                icon: "fas fa-check",
                title: `Feature Item ${count}`,
                content:
                    "Lorem ipsum dolor sit amet, consectetur adipisi cing elit, sed do eiusmod tempor incididunt ut abore et dolore magna",
                iconColor: "",
                iconBackgroundColor: "",
                link: "",
                linkOpenNewTab: "false",
                showBadge: 'false',
                badgeText: "New",
                badgeTextColor: "",
                badgeBackgroundColor: "",
            },
        ];

        setAttributes({ features });
    };

    const getFeaturesComponents = () => {
        const onFeatureChange = (key, value, position) => {
            const newFeature = { ...attributes.features[position] };
            const newFeatureList = [...attributes.features];
            newFeatureList[position] = newFeature;

            if (Array.isArray(key)) {
                key.map((item, index) => {
                    newFeatureList[position][item] = value[index];
                });
            } else {
                newFeatureList[position][key] = value;
            }

            setAttributes({ features: newFeatureList });
        };

        return attributes.features.map((each, i) => (
            <div key={i}>
                <EBTextControl
                    onChange={(value) => onFeatureChange("title", value, i)}
                    label={__("Text", "essential-blocks")}
                    value={each.title}
                    enableAi={true}
                />

                {!useInlineDesign && (
                    <EBTextControl
                        label={__("Content", "essential-blocks")}
                        value={each.content}
                        onChange={(value) =>
                            onFeatureChange("content", value, i)
                        }
                        enableAi={true}
                        isTextarea={true}
                    />
                )}
                <ToggleGroupControl
                    label={__("Icon Type", "essential-blocks")}
                    className="newtogglegroupcontrol eb-featurelist-icon-type"
                    value={each.iconType}
                    onChange={(value) =>
                        onFeatureChange("iconType", value, i)
                    }
                    isBlock
                    __next40pxDefaultSize
                    __nextHasNoMarginBottom
                >
                    {MEDIA_TYPES.map((item, index) => (
                        <ToggleGroupControlOption
                            key={index}
                            value={item.value}
                            label={item.label}
                        />
                    ))}
                </ToggleGroupControl>
                {each.iconType !== "none" && (
                    <>
                        {each.iconType === "icon" && (
                            <EBIconPicker
                                value={each.icon}
                                onChange={(value) =>
                                    onFeatureChange("icon", value, i)
                                }
                            />
                        )}
                        {each.iconType === "image" && (
                            <ImageComponent.GeneralTab
                                onSelect={({ id, url, alt, title }) => {
                                    onFeatureChange(
                                        [
                                            "featureImageId",
                                            "featureImage",
                                            "featureImageAlt",
                                            "featureImageTitle",
                                        ],
                                        [id, url, alt, title],
                                        i,
                                    );
                                }}
                                value={each.featureImage}
                                hasTag={false}
                                hasCaption={false}
                                hasStyle={false}
                                hasLink={false}
                                showInPanel={false}
                            />
                        )}
                        {each.iconType === "icon" && each.icon && (
                            <ColorControl
                                label={__("Icon Color", "essential-blocks")}
                                color={each.iconColor}
                                onChange={(value) =>
                                    onFeatureChange("iconColor", value, i)
                                }
                            />
                        )}
                        <ColorControl
                            label={__("Background Color", "essential-blocks")}
                            color={each.iconBackgroundColor}
                            onChange={(value) =>
                                onFeatureChange("iconBackgroundColor", value, i)
                            }
                        />
                    </>
                )}
                <EBTextControl
                    label={__("Link", "essential-blocks")}
                    fieldType="url"
                    value={each.link}
                    onChange={(value) => onFeatureChange("link", value, i)}
                    placeholder="https://example.com"
                    help={__(
                        "Enter a valid URL.",
                        "essential-blocks"
                    )}
                    showValidation={true}
                    enableSecurity={true}
                />
                <ToggleControl
                    label={__("Open in New Tab", "essential-blocks")}
                    checked={each.linkOpenNewTab == "false" ? false : true}
                    onChange={(value) =>
                        onFeatureChange("linkOpenNewTab", value.toString(), i)
                    }
                    __nextHasNoMarginBottom
                />
            </div>
        ));
    };

    return (
        <InspectorPanel
            advancedControlProps={{
                marginPrefix: wrapperMargin,
                paddingPrefix: wrapperPadding,
                backgroundPrefix: wrapperBackgroundType,
                borderPrefix: wrapperBorder,
                hasMargin: true,
            }}
        >
            <InspectorPanel.General>
                <InspectorPanel.PanelBody
                    title={__("Content Settings", "essential-blocks")}
                    initialOpen={true}
                >
                    <SortControl
                        items={attributes.features}
                        labelKey={"title"}
                        onSortEnd={(features) => setAttributes({ features })}
                        onDeleteItem={(index) => {
                            setAttributes({
                                features: attributes.features.filter(
                                    (_, i) => i !== index,
                                ),
                            });
                        }}
                        hasSettings={true}
                        settingsComponents={getFeaturesComponents()}
                        hasAddButton={true}
                        onAddItem={onFeatureAdd}
                        addButtonText={__("Add Feature", "essential-blocks")}
                    ></SortControl>
                    <Divider />
                    <SelectControl
                        label={__("Title HTML Tag", "essential-blocks")}
                        value={titleTag}
                        options={TITLE_TAG}
                        onChange={(newTitleTag) =>
                            setAttributes({
                                titleTag: newTitleTag,
                            })
                        }
                        __next40pxDefaultSize
                        __nextHasNoMarginBottom
                    />
                    <SelectControl
                        label={__("Icon Shape", "essential-blocks")}
                        value={iconShape}
                        options={ICON_SHAPE}
                        onChange={(newIconShape) =>
                            setAttributes({
                                iconShape: newIconShape,
                            })
                        }
                        __next40pxDefaultSize
                        __nextHasNoMarginBottom
                    />
                    {iconShape !== "none" && (
                        <SelectControl
                            label={__("Shape View", "essential-blocks")}
                            value={shapeView}
                            options={SHAPE_VIEW}
                            onChange={(newShapeView) =>
                                setAttributes({
                                    shapeView: newShapeView,
                                })
                            }
                            __next40pxDefaultSize
                            __nextHasNoMarginBottom
                        />
                    )}
                    <ToggleGroupControl
                        label={__("Feature Item Position", "essential-blocks")}
                        className="newtogglegroupcontrol eb-featurelist-item-align"
                        value={featureListAlign}
                        onChange={(value) =>
                            setAttributes({
                                featureListAlign: value,
                            })
                        }
                        isBlock
                        __next40pxDefaultSize
                        __nextHasNoMarginBottom
                    >
                        {FEATURE_ITEM_POSITION.map((item, index) => (
                            <ToggleGroupControlOption
                                key={index}
                                value={item.value}
                                label={item.label}
                            />
                        ))}
                    </ToggleGroupControl>
                    <ToggleGroupControl
                        label={__("Icon Position", "essential-blocks")}
                        className="newtogglegroupcontrol eb-featurelist-icon-align"
                        value={iconPosition}
                        onChange={(value) =>
                            setAttributes({
                                iconPosition: value,
                            })
                        }
                        isBlock
                        __next40pxDefaultSize
                        __nextHasNoMarginBottom
                    >
                        {ICON_POSITION.map((item, index) => (
                            <ToggleGroupControlOption
                                key={index}
                                value={item.value}
                                label={item.label}
                            />
                        ))}
                    </ToggleGroupControl>
                    <ToggleControl
                        label={__(
                            "Content Vertically Center",
                            "essentail-blocks",
                        )}
                        checked={showContentVertical}
                        onChange={() => {
                            setAttributes({
                                showContentVertical: !showContentVertical,
                            });
                        }}
                        __nextHasNoMarginBottom
                    />
                    {!useInlineDesign && iconPosition != "top" && (
                        <ToggleControl
                            label={__("Show Connector", "essentail-blocks")}
                            checked={showConnector}
                            onChange={() => {
                                setAttributes({
                                    showConnector: !showConnector,
                                });
                            }}
                            __nextHasNoMarginBottom
                        />
                    )}
                    <ToggleControl
                        label={__(
                            "Use Inline Feature Lists",
                            "essentail-blocks",
                        )}
                        checked={useInlineDesign}
                        onChange={() => {
                            setAttributes({
                                useInlineDesign: !useInlineDesign,
                            });
                        }}
                        __nextHasNoMarginBottom
                    />

                    {!showConnector && (
                        <ToggleControl
                            label={__("Design Item Box", "essentail-blocks")}
                            checked={designItemBox}
                            onChange={() => {
                                setAttributes({
                                    designItemBox: !designItemBox,
                                });
                            }}
                            __nextHasNoMarginBottom
                        />
                    )}

                    <ToggleControl
                        label={__("Icon Liquid Glass Effect", "essentail-blocks")}
                        checked={iconLiquidGlass.enable}
                        onChange={() => {
                            setAttributes({
                                iconLiquidGlass: {
                                    ...iconLiquidGlass,
                                    enable: !iconLiquidGlass.enable
                                }
                            });
                        }}
                        __nextHasNoMarginBottom
                    />
                </InspectorPanel.PanelBody >
            </InspectorPanel.General >
            <InspectorPanel.Style>
                <InspectorPanel.PanelBody
                    title={__("List", "essential-blocks")}
                    initialOpen={true}
                >
                    <ResponsiveRangeController
                        baseLabel={__("Space Between (PX)", "essential-blocks")}
                        controlName={listSpace}
                        min={0}
                        max={300}
                        step={1}
                        noUnits
                    />
                    {useInlineDesign && (
                        <ResponsiveRangeController
                            baseLabel={__("Row Space(PX)", "essential-blocks")}
                            controlName={rowSpace}
                            min={0}
                            max={300}
                            step={1}
                            noUnits
                        />
                    )}

                    {designItemBox && !showConnector && (
                        <>
                            <Divider />
                            <ResponsiveDimensionsControl
                                controlName={listPadding}
                                baseLabel={__("Padding", "essential-blocks")}
                            />
                            <PanelBody title="Background">
                                <BackgroundControl
                                    controlName={listBackgroundType}
                                    noOverlay={true}
                                    noMainBgi={true}
                                />
                            </PanelBody>
                            <PanelBody title="Border">
                                <BorderShadowControl
                                    controlName={listBorderShadow}
                                    noShadow={true}
                                />
                            </PanelBody>
                        </>
                    )}
                </InspectorPanel.PanelBody>
                <InspectorPanel.PanelBody
                    title={__("Icon", "essential-blocks")}
                    initialOpen={false}
                >
                    {iconShape !== "none" && (
                        <>
                            <BaseControl __nextHasNoMarginBottom>
                                <h3 className="eb-control-title">
                                    {__("Background", "essential-blocks")}
                                </h3>
                            </BaseControl>
                            <BackgroundControl
                                controlName={iconBackgroundType}
                                noOverlay={true}
                                noMainBgi={true}
                            />
                            <Divider />
                        </>
                    )}
                    <ColorControl
                        label={__("Color", "essential-blocks")}
                        color={iconGlobalColor}
                        attributeName={"iconGlobalColor"}
                    />
                    {iconShape !== "none" && (
                        <ResponsiveRangeController
                            baseLabel={__("Size", "essential-blocks")}
                            controlName={iconBackgroundSize}
                            min={0}
                            max={300}
                            step={1}
                            noUnits
                        />
                    )}
                    <ResponsiveRangeController
                        baseLabel={__("Icon Size", "essential-blocks")}
                        controlName={iconSize}
                        min={6}
                        max={150}
                        step={1}
                        noUnits
                    />
                    <ResponsiveDimensionsControl
                        controlName={iconPadding}
                        baseLabel={__("Padding", "essential-blocks")}
                    />
                    <ResponsiveRangeController
                        baseLabel={__("Spacing", "essential-blocks")}
                        controlName={iconSpace}
                        min={0}
                        max={100}
                        step={1}
                        noUnits
                    />
                    {iconShape !== "none" && shapeView === "framed" && (
                        <BorderShadowControl
                            controlName={iconBorder}
                            noShadow={true}
                        />
                    )}
                </InspectorPanel.PanelBody>
                {iconLiquidGlass.enable && (
                    <InspectorPanel.PanelBody
                        title={__("Icon Liquid Glass", "essential-blocks")}
                        initialOpen={false}
                    >
                        <LiquidGlassEffectControl attributeName="iconLiquidGlass" shadowAttributeName="iconLiquidGlassShadowEffectBorder" />
                    </InspectorPanel.PanelBody>
                )}
                <InspectorPanel.PanelBody
                    title={__("Content", "essential-blocks")}
                    initialOpen={false}
                >
                    <BaseControl __nextHasNoMarginBottom>
                        <h3 className="eb-control-title">
                            {__("Title", "essential-blocks")}
                        </h3>
                    </BaseControl>
                    <ResponsiveRangeController
                        baseLabel={__("Title Bottom Space", "essential-blocks")}
                        controlName={titleSpace}
                        min={0}
                        max={100}
                        step={1}
                        noUnits
                    />
                    <ColorControl
                        label={__("Color", "essential-blocks")}
                        color={titleTextColor}
                        attributeName={"titleTextColor"}
                    />
                    <ColorControl
                        label={__("Hover Color", "essential-blocks")}
                        color={titleTextHoverColor}
                        attributeName={"titleTextHoverColor"}
                    />
                    <TypographyDropdown
                        baseLabel={__("Typography", "essential-blocks")}
                        typographyPrefixConstant={typoPrefix_title}
                        defaultFontSize={32}
                    />

                    {!useInlineDesign && (
                        <>
                            <Divider />
                            <BaseControl __nextHasNoMarginBottom>
                                <h3 className="eb-control-title">
                                    {__("Description", "essential-blocks")}
                                </h3>
                            </BaseControl>
                            <ColorControl
                                label={__("Color", "essential-blocks")}
                                color={descTextColor}
                                attributeName={"descTextColor"}
                            />
                            <TypographyDropdown
                                baseLabel={__("Typography", "essential-blocks")}
                                typographyPrefixConstant={typoPrefix_content}
                            />
                            <Divider />
                            <BaseControl __nextHasNoMarginBottom>
                                <h3 className="eb-control-title">
                                    {__("Content Box", "essential-blocks")}
                                </h3>
                            </BaseControl>
                            <ResponsiveDimensionsControl
                                controlName={boxPadding}
                                baseLabel={__(
                                    "Box Padding",
                                    "essential-blocks",
                                )}
                            />
                            <PanelBody title="Background">
                                <BackgroundControl
                                    controlName={boxBackgroundType}
                                    noOverlay={true}
                                    noMainBgi={true}
                                />
                            </PanelBody>
                            <PanelBody title="Border">
                                <BorderShadowControl
                                    controlName={boxBorder}
                                />
                            </PanelBody>
                        </>
                    )}

                    <InspectorPanel.PanelBody title={__("Badge", "essential-blocks")} initialOpen={false}>
                        <TypographyDropdown
                            baseLabel={__("Typography", "essential-blocks")}
                            typographyPrefixConstant={typoPrefix_badge}
                        />
                        <ColorControl
                            label={__("Text Color", "essential-blocks")}
                            color={badgeTextColor}
                            attributeName={"badgeTextColor"}
                        />
                        <ColorControl
                            label={__("Background Color", "essential-blocks")}
                            color={badgeBackgroundColor}
                            attributeName={"badgeBackgroundColor"}
                        />
                        <ResponsiveDimensionsControl
                            controlName={badgePadding}
                            baseLabel={__("Padding", "essential-blocks")}
                        />
                        <RangeControl
                            label={__("Gap from Title", "essential-blocks")}
                            value={badgeGap}
                            onChange={(badgeGap) => setAttributes({ badgeGap })}
                            min={0}
                            max={100}
                            step={1}
                            __nextHasNoMarginBottom
                            __next40pxDefaultSize
                        />
                        <BaseControl __nextHasNoMarginBottom>
                            <h3 className="eb-control-title">
                                {__("Border & Shadow", "essential-blocks")}
                            </h3>
                        </BaseControl>
                        <BorderShadowControl
                            controlName={badgeBorder}
                        />
                    </InspectorPanel.PanelBody>
                </InspectorPanel.PanelBody>
                {!useInlineDesign && showConnector && iconPosition != "top" && (
                    <>
                        <InspectorPanel.PanelBody
                            title={__("Connector Style", "essential-blocks")}
                            initialOpen={false}
                        >
                            <SelectControl
                                label={__(
                                    "Connector Style",
                                    "essential-blocks",
                                )}
                                value={connectorStyle}
                                options={CONNECTOR_STYLE}
                                onChange={(val) =>
                                    setAttributes({
                                        connectorStyle: val,
                                    })
                                }
                                __next40pxDefaultSize
                                __nextHasNoMarginBottom
                            />
                            <SelectControl
                                label={__("Connector Type", "essential-blocks")}
                                value={connectorType}
                                options={CONNECTOR_TYPE}
                                onChange={(val) =>
                                    setAttributes({
                                        connectorType: val,
                                    })
                                }
                                __next40pxDefaultSize
                                __nextHasNoMarginBottom
                            />
                            <ColorControl
                                label={__("Color", "essential-blocks")}
                                color={connectorColor}
                                attributeName={"connectorColor"}
                            />
                            <ResponsiveRangeController
                                baseLabel={__(
                                    "Connector Width (PX)",
                                    "essential-blocks",
                                )}
                                controlName={connectorWidth}
                                min={0}
                                max={20}
                                step={1}
                                noUnits
                            />
                        </InspectorPanel.PanelBody>
                    </>
                )}
            </InspectorPanel.Style>
        </InspectorPanel >
    );
};

export default Inspector;
