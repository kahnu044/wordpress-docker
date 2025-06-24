/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
    PanelBody,
    ToggleControl,
    SelectControl,
    Button,
    ButtonGroup,
    BaseControl,
    __experimentalDivider as Divider,
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
} from "@essential-blocks/blocks/feature-list/src/constants";

import {
    typoPrefix_title,
    typoPrefix_content,
} from "@essential-blocks/blocks/feature-list/src/constants/typographyPrefixConstants";

import objAttributes from "@essential-blocks/blocks/feature-list/src/attributes";

import {
    ColorControl,
    ResponsiveRangeController,
    ResponsiveDimensionsControl,
    TypographyDropdown,
    BackgroundControl,
    BorderShadowControl,
    useBlockDefaults,
    withBlockContext
} from "@essential-blocks/controls";

function FeatureList(props) {
    const { blockDefaults, setBlockDefaults, name, deviceType, handleBlockDefault } = props;

    const {
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
    } = blockDefaults;

    const contentAttributes = ['features']

    const isDefaultSet = useBlockDefaults(name, blockDefaults, setBlockDefaults, objAttributes, contentAttributes)

    return (
        <>
            {isDefaultSet && (
                <div className="eb-panel-control">
                    <PanelBody title={__("Content Settings", "essential-blocks")} initialOpen={true}>
                        <SelectControl
                            label={__("Title HTML Tag", "essential-blocks")}
                            value={titleTag}
                            options={TITLE_TAG}
                            onChange={(newTitleTag) => handleBlockDefault({ titleTag: newTitleTag })}
                        />
                        <SelectControl
                            label={__("Icon Shape", "essential-blocks")}
                            value={iconShape}
                            options={ICON_SHAPE}
                            onChange={(newIconShape) => handleBlockDefault({ iconShape: newIconShape })}
                        />
                        {iconShape !== "none" && (
                            <SelectControl
                                label={__("Shape View", "essential-blocks")}
                                value={shapeView}
                                options={SHAPE_VIEW}
                                onChange={(newShapeView) =>
                                    handleBlockDefault({
                                        shapeView: newShapeView,
                                    })
                                }
                            />
                        )}
                        <BaseControl label={__("Feature Item Position", "essential-blocks")}>
                            <ButtonGroup className="eb-featurelist-item-align">
                                {FEATURE_ITEM_POSITION.map((item, index) => (
                                    <Button
                                        key={index}
                                        isPrimary={featureListAlign === item.value}
                                        isSecondary={featureListAlign !== item.value}
                                        onClick={() =>
                                            handleBlockDefault({
                                                featureListAlign: item.value,
                                            })
                                        }
                                    >
                                        {item.label}
                                    </Button>
                                ))}
                            </ButtonGroup>
                        </BaseControl>
                        <BaseControl label={__("Icon Position", "essential-blocks")}>
                            <ButtonGroup className="eb-featurelist-icon-align">
                                {ICON_POSITION.map((item, index) => (
                                    <Button
                                        key={index}
                                        isPrimary={iconPosition === item.value}
                                        isSecondary={iconPosition !== item.value}
                                        onClick={() =>
                                            handleBlockDefault({
                                                iconPosition: item.value,
                                            })
                                        }
                                    >
                                        {item.label}
                                    </Button>
                                ))}
                            </ButtonGroup>
                        </BaseControl>
                        <ToggleControl
                            label={__("Content Vertically Center", "essentail-blocks")}
                            checked={showContentVertical}
                            onChange={() => {
                                handleBlockDefault({
                                    showContentVertical: !showContentVertical,
                                });
                            }}
                        />
                        {!useInlineDesign && iconPosition != "top" && (
                            <ToggleControl
                                label={__("Show Connector", "essentail-blocks")}
                                checked={showConnector}
                                onChange={() => {
                                    handleBlockDefault({
                                        showConnector: !showConnector,
                                    });
                                }}
                            />
                        )}
                        <ToggleControl
                            label={__("Use Inline Feature Lists", "essentail-blocks")}
                            checked={useInlineDesign}
                            onChange={() => {
                                handleBlockDefault({
                                    useInlineDesign: !useInlineDesign,
                                });
                            }}
                        />
                    </PanelBody>
                    <PanelBody title={__("List", "essential-blocks")} initialOpen={false}>
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
                    </PanelBody>
                    <PanelBody title={__("Icon", "essential-blocks")} initialOpen={false}>
                        {iconShape !== "none" && (
                            <>
                                <BaseControl>
                                    <h3 className="eb-control-title">{__("Background", "essential-blocks")}</h3>
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
                            onChange={(iconGlobalColor) => handleBlockDefault({ iconGlobalColor })}
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
                    </PanelBody>

                    <PanelBody title={__("Content", "essential-blocks")} initialOpen={false}>
                        <BaseControl>
                            <h3 className="eb-control-title">{__("Title", "essential-blocks")}</h3>
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
                            onChange={(titleTextColor) => handleBlockDefault({ titleTextColor })}
                        />
                        <ColorControl
                            label={__("Hover Color", "essential-blocks")}
                            color={titleTextHoverColor}
                            onChange={(titleTextHoverColor) => handleBlockDefault({ titleTextHoverColor })}
                        />
                        <TypographyDropdown
                            baseLabel={__("Typography", "essential-blocks")}
                            typographyPrefixConstant={typoPrefix_title}
                            defaultFontSize={32}
                        />

                        {!useInlineDesign && (
                            <>
                                <Divider />
                                <BaseControl>
                                    <h3 className="eb-control-title">{__("Description", "essential-blocks")}</h3>
                                </BaseControl>
                                <ColorControl
                                    label={__("Color", "essential-blocks")}
                                    color={descTextColor}
                                    onChange={(descTextColor) => handleBlockDefault({ descTextColor })}
                                />
                                <TypographyDropdown
                                    baseLabel={__("Typography", "essential-blocks")}
                                    typographyPrefixConstant={typoPrefix_content}
                                    
                                />
                                <Divider />
                                <BaseControl>
                                    <h3 className="eb-control-title">{__("Content Box", "essential-blocks")}</h3>
                                </BaseControl>
                                <ResponsiveDimensionsControl
                                    
                                    controlName={boxPadding}
                                    baseLabel={__("Box Padding", "essential-blocks")}
                                />
                                <PanelBody title="Background">
                                    <BackgroundControl
                                        controlName={boxBackgroundType}
                                        
                                        noOverlay={true}
                                        noMainBgi={true}
                                    />
                                </PanelBody>
                                <PanelBody title="Border">
                                    <BorderShadowControl controlName={boxBorder}  />
                                </PanelBody>
                            </>
                        )}
                    </PanelBody>
                    {!useInlineDesign && showConnector && iconPosition != "top" && (
                        <>
                            <PanelBody title={__("Connector Style", "essential-blocks")} initialOpen={false}>
                                <SelectControl
                                    label={__("Connector Style", "essential-blocks")}
                                    value={connectorStyle}
                                    options={CONNECTOR_STYLE}
                                    onChange={(val) =>
                                        handleBlockDefault({
                                            connectorStyle: val,
                                        })
                                    }
                                />
                                <SelectControl
                                    label={__("Connector Type", "essential-blocks")}
                                    value={connectorType}
                                    options={CONNECTOR_TYPE}
                                    onChange={(val) =>
                                        handleBlockDefault({
                                            connectorType: val,
                                        })
                                    }
                                />
                                <ColorControl
                                    label={__("Color", "essential-blocks")}
                                    color={connectorColor}
                                    onChange={(connectorColor) =>
                                        handleBlockDefault({
                                            connectorColor,
                                        })
                                    }
                                />
                                <ResponsiveRangeController
                                    baseLabel={__("Connector Width (PX)", "essential-blocks")}
                                    controlName={connectorWidth}
                                    
                                    min={0}
                                    max={20}
                                    step={1}
                                    noUnits
                                />
                            </PanelBody>
                        </>
                    )}
                    <PanelBody title={__("Margin & Padding", "essential-blocks")} initialOpen={false}>
                        <ResponsiveDimensionsControl
                            controlName={wrapperMargin}
                            baseLabel={__("Margin", "essential-blocks")}
                        />
                        <ResponsiveDimensionsControl
                            controlName={wrapperPadding}
                            baseLabel={__("Padding", "essential-blocks")}
                        />
                    </PanelBody>
                    <PanelBody title={__("Background", "essential-blocks")} initialOpen={false}>
                        <BackgroundControl controlName={wrapperBackgroundType}  />
                    </PanelBody>
                    <PanelBody title={__("Border", "essential-blocks")} initialOpen={false}>
                        <BorderShadowControl controlName={wrapperBorder}  />
                    </PanelBody>
                </div>
            )}
        </>
    );
}

export default withBlockContext(objAttributes)(FeatureList);
