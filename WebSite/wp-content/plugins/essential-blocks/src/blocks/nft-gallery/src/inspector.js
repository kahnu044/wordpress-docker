/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
    ToggleControl,
    SelectControl,
    TextControl,
    RangeControl,
    __experimentalToggleGroupControl as ToggleGroupControl,
    __experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from "@wordpress/components";

/**
 * Internal dependencies
 */
import {
    dimensionsMargin,
    dimensionsPadding,
    wrapBg,
    wrpBdShadow,
    rowNumber,
    columnGap,
    rowGap,
    imageMargin,
    imageRadius,
    imageHeight,
    imageWidth,
    titleMargin,
    buttonMargin,
    buttonPadding,
    buttonBdrSdw,
    itemBg,
    itemBdrSdw,
    itemPadding,
    LAYOUT_TYPE,
    GAP_UNIT,
    GRID_PRESET,
    LIST_PRESET,
    HORIZONTAL_ALIGNMENT,
    VERTICAL_ALIGNMENT,
} from "./constants/constants";

import {
    typoPrefix_title,
    typoPrefix_button,
} from "./constants/typographyPrefixConstants";

import {
    ResponsiveDimensionsControl,
    TypographyDropdown,
    BorderShadowControl,
    ColorControl,
    BackgroundControl,
    ResponsiveRangeController,
    InspectorPanel
} from "@essential-blocks/controls";

function Inspector(props) {
    const { attributes, setAttributes, setLoading } = props;
    const {
        // responsive control attributes ⬇
        resOption,
        source,
        settings,
        layout,
        displayImage,
        displayTitle,
        displayButton,
        titleColor,
        buttonTextColor,
        buttonBgColor,
        buttonHoverTextColor,
        buttonHoverBgColor,
        buttonText,
        gridPreset,
        listPreset,
        gridOverlayBg,
        listVerticalAlignment,
    } = attributes;

    //Change Type
    const updateSettings = (source, field, value) => {
        let newSouceData = { ...settings[source] };
        newSouceData[field] = value;
        setAttributes({
            settings: {
                ...settings,
                [source]: newSouceData,
            },
        });
        setLoading(true);
    };

    const changeLayout = (selected) => {
        setAttributes({ layout: selected });
        switch (selected) {
            case "grid":
                setAttributes({
                    rowNumRange: 3,
                    imgMaxWidthRange: 100,
                    imgMaxWidthUnit: "%",
                    imgMarginBottom: 15,
                });
                break;
            case "list":
                setAttributes({
                    rowNumRange: 1,
                    imgMaxWidthRange: 250,
                    imgMaxWidthUnit: "px",
                    imgMarginBottom: 0,
                });
                break;
            default:
                return false;
        }
    };

    return (
        <InspectorPanel advancedControlProps={{
            marginPrefix: dimensionsMargin,
            paddingPrefix: dimensionsPadding,
            backgroundPrefix: wrapBg,
            borderPrefix: wrpBdShadow,
            hasMargin: true
        }}>
            <InspectorPanel.General>
                <>
                    <InspectorPanel.PanelBody
                        title={__("General", "essential-blocks")}
                        initialOpen={true}
                    >
                        {source === "opensea" && (
                            <>
                                <SelectControl
                                    label={__("Type", "essential-blocks")}
                                    value={settings?.opensea?.type}
                                    options={[
                                        {
                                            label: __("Items", "essential-blocks"),
                                            value: "items",
                                        },
                                        {
                                            label: __("Collections", "essential-blocks"),
                                            value: "collections",
                                        },
                                    ]}
                                    onChange={(value) =>
                                        updateSettings("opensea", "type", value)
                                    }
                                    __next40pxDefaultSize
                                    __nextHasNoMarginBottom
                                />
                                {settings?.opensea?.type === "items" && (
                                    <>
                                        <TextControl
                                            label={__(
                                                "Collection Slug",
                                                "essential-blocks"
                                            )}
                                            placeholder={__(
                                                "cryptopunks",
                                                "essential-blocks"
                                            )}
                                            value={settings?.opensea?.collectionSlug}
                                            onChange={(value) =>
                                                updateSettings(
                                                    "opensea",
                                                    "collectionSlug",
                                                    value
                                                )
                                            }
                                            __next40pxDefaultSize
                                            __nextHasNoMarginBottom
                                        />

                                        <RangeControl
                                            label="Limit"
                                            value={settings?.opensea?.itemLimit}
                                            onChange={(value) =>
                                                updateSettings("opensea", "itemLimit", value)
                                            }
                                            min={1}
                                            max={100}
                                            step={1}
                                            allowReset={true}
                                            __nextHasNoMarginBottom
                                            __next40pxDefaultSize
                                        />
                                    </>
                                )}
                                {settings?.opensea?.type === "collections" && (
                                    <>
                                        <TextControl
                                            label={__("Creator Username", "essential-blocks")}
                                            value={settings?.opensea?.collectionWalletId}
                                            onChange={(value) =>
                                                updateSettings(
                                                    "opensea",
                                                    "collectionWalletId",
                                                    value
                                                )
                                            }
                                            __next40pxDefaultSize
                                            __nextHasNoMarginBottom
                                        />
                                        <RangeControl
                                            label="Limit"
                                            value={settings?.opensea?.collectionLimit}
                                            onChange={(value) =>
                                                updateSettings(
                                                    "opensea",
                                                    "collectionLimit",
                                                    value
                                                )
                                            }
                                            min={1}
                                            max={100}
                                            step={1}
                                            allowReset={true}
                                            __nextHasNoMarginBottom
                                            __next40pxDefaultSize
                                        />
                                    </>
                                )}
                            </>
                        )}
                    </InspectorPanel.PanelBody>
                    <InspectorPanel.PanelBody
                        title={__("Layout", "essential-blocks")}
                        initialOpen={true}
                    >
                        <SelectControl
                            label={__("Layout Type", "essential-blocks")}
                            value={layout}
                            options={LAYOUT_TYPE}
                            onChange={(value) => changeLayout(value)}
                            __next40pxDefaultSize
                            __nextHasNoMarginBottom
                        />

                        {layout === "grid" && (
                            <SelectControl
                                label={__("Grid Preset", "essential-blocks")}
                                value={gridPreset}
                                options={GRID_PRESET}
                                onChange={(value) =>
                                    setAttributes({ gridPreset: value })
                                }
                                __next40pxDefaultSize
                                __nextHasNoMarginBottom
                            />
                        )}

                        {layout === "list" && (
                            <SelectControl
                                label={__("List Preset", "essential-blocks")}
                                value={listPreset}
                                options={LIST_PRESET}
                                onChange={(value) =>
                                    setAttributes({ listPreset: value })
                                }
                                __next40pxDefaultSize
                                __nextHasNoMarginBottom
                            />
                        )}
                        <ResponsiveRangeController
                            baseLabel={__("Items per row", "essential-blocks")}
                            controlName={rowNumber}
                            min={1}
                            max={10}
                            step={1}
                            noUnits
                        />
                        <ToggleControl
                            label={__("Show NFT Image?", "essential-blocks")}
                            checked={displayImage}
                            onChange={() =>
                                setAttributes({ displayImage: !displayImage })
                            }
                            __nextHasNoMarginBottom
                        />
                        <ToggleControl
                            label={__("Show Title?", "essential-blocks")}
                            checked={displayTitle}
                            onChange={() =>
                                setAttributes({ displayTitle: !displayTitle })
                            }
                            __nextHasNoMarginBottom
                        />

                        {settings?.opensea?.type === "items" && (
                            <>
                                <ToggleControl
                                    label={__("Show Button?", "essential-blocks")}
                                    checked={displayButton}
                                    onChange={() =>
                                        setAttributes({ displayButton: !displayButton })
                                    }
                                    __nextHasNoMarginBottom
                                />
                            </>
                        )}
                    </InspectorPanel.PanelBody>
                </>
            </InspectorPanel.General>
            <InspectorPanel.Style>
                <>
                    <InspectorPanel.PanelBody
                        title={__("Layout Styles", "essential-blocks")}
                        initialOpen={true}
                    >
                        <ResponsiveRangeController
                            baseLabel={__("Columns Gap", "essential-blocks")}
                            controlName={columnGap}
                            min={0}
                            max={100}
                            step={1}
                            units={GAP_UNIT}
                        />
                        <ResponsiveRangeController
                            baseLabel={__("Row Gap", "essential-blocks")}
                            controlName={rowGap}
                            min={0}
                            max={100}
                            step={1}
                            units={GAP_UNIT}
                        />
                    </InspectorPanel.PanelBody>

                    <InspectorPanel.PanelBody
                        title={__("Item Box Styles", "essential-blocks")}
                        initialOpen={false}
                    >
                        {layout === "list" && (
                            <>
                                <ToggleGroupControl
                                    label={__("Vertical Alignment", "essential-blocks")}

                                    value={listVerticalAlignment}
                                    onChange={(value) =>
                                        setAttributes({
                                            listVerticalAlignment: value,
                                        })
                                    }
                                    isBlock
                                    __next40pxDefaultSize
                                    __nextHasNoMarginBottom
                                >
                                    {VERTICAL_ALIGNMENT.map((item, index) => (
                                        <ToggleGroupControlOption
                                            key={index}
                                            value={item.value}
                                            label={item.label}
                                        />
                                    ))}
                                </ToggleGroupControl>
                            </>
                        )}
                        <InspectorPanel.PanelBody title={__("Background", "essential-blocks")} initialOpen={true}>
                            <BackgroundControl
                                controlName={itemBg}
                                noOverlay
                                noOverlayBgi
                            />
                        </InspectorPanel.PanelBody>
                        {layout === "grid" && gridPreset === "preset-3" && (
                            <>
                                <ColorControl
                                    label={__("Overlay Color", "essential-blocks")}
                                    color={gridOverlayBg}
                                    attributeName={'gridOverlayBg'}
                                />
                            </>
                        )}
                        <InspectorPanel.PanelBody title={__("Border & Shadow", "essential-blocks")} initialOpen={true}>
                            <BorderShadowControl
                                controlName={itemBdrSdw}
                            />
                        </InspectorPanel.PanelBody>
                        <ResponsiveDimensionsControl
                            controlName={itemPadding}
                            baseLabel={__("Padding", "essential-blocks")}
                        />
                    </InspectorPanel.PanelBody>

                    {displayImage && (
                        <InspectorPanel.PanelBody
                            title={__("Image", "essential-blocks")}
                            initialOpen={false}
                        >
                            <ResponsiveRangeController
                                baseLabel={__("Height", "essential-blocks")}
                                controlName={imageHeight}
                                min={0}
                                max={500}
                                step={1}
                                units={GAP_UNIT}
                            />
                            <ResponsiveRangeController
                                baseLabel={__("Width", "essential-blocks")}
                                controlName={imageWidth}
                                min={0}
                                max={500}
                                step={1}
                                units={GAP_UNIT}
                            />
                            <ResponsiveDimensionsControl
                                controlName={imageMargin}
                                baseLabel={__("Margin", "essential-blocks")}
                            />
                            <ResponsiveDimensionsControl
                                controlName={imageRadius}
                                baseLabel={__("Border Radius", "essential-blocks")}
                            />
                        </InspectorPanel.PanelBody>
                    )}

                    <InspectorPanel.PanelBody
                        title={__("Title", "essential-blocks")}
                        initialOpen={false}
                    >
                        <TypographyDropdown
                            baseLabel={__("Typography", "essential-blocks")}
                            typographyPrefixConstant={typoPrefix_title}
                        />
                        <ColorControl
                            label={__("Color", "essential-blocks")}
                            color={titleColor}
                            attributeName={'titleColor'}
                        />
                        <ResponsiveDimensionsControl
                            controlName={titleMargin}
                            baseLabel={__("Margin", "essential-blocks")}
                        />
                    </InspectorPanel.PanelBody>

                    <InspectorPanel.PanelBody
                        title={__("Button", "essential-blocks")}
                        initialOpen={false}
                    >
                        <TextControl
                            label={__("Button Text", "essential-blocks")}
                            value={buttonText}
                            onChange={(text) => setAttributes({ buttonText: text })}
                            __next40pxDefaultSize
                            __nextHasNoMarginBottom
                        />
                        <TypographyDropdown
                            baseLabel={__("Typography", "essential-blocks")}
                            typographyPrefixConstant={typoPrefix_button}
                        />
                        <ColorControl
                            label={__("Text Color", "essential-blocks")}
                            color={buttonTextColor}
                            attributeName={'buttonTextColor'}
                        />
                        <ColorControl
                            label={__("Background Color", "essential-blocks")}
                            color={buttonBgColor}
                            attributeName={'buttonBgColor'}
                        />
                        <ColorControl
                            label={__("Hover Text Color", "essential-blocks")}
                            color={buttonHoverTextColor}
                            attributeName={'buttonHoverTextColor'}
                        />
                        <ColorControl
                            label={__("Hover Background Color", "essential-blocks")}
                            color={buttonHoverBgColor}
                            attributeName={'buttonHoverBgColor'}
                        />
                        <ResponsiveDimensionsControl
                            controlName={buttonMargin}
                            baseLabel={__("Margin", "essential-blocks")}
                        />
                        <ResponsiveDimensionsControl
                            controlName={buttonPadding}
                            baseLabel={__("Padding", "essential-blocks")}
                        />
                        <InspectorPanel.PanelBody title={__("Border & Shadow", "essential-blocks")} initialOpen={true}>
                            <BorderShadowControl
                                controlName={buttonBdrSdw}
                            />
                        </InspectorPanel.PanelBody>
                    </InspectorPanel.PanelBody>
                </>
            </InspectorPanel.Style>
        </InspectorPanel>
    );
}

export default Inspector;
