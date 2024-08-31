/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
    PanelBody,
    ToggleControl,
    SelectControl,
    TabPanel,
    TextControl,
    RangeControl,
    BaseControl,
    ButtonGroup,
    Button,
} from "@wordpress/components";

/**
 * Internal dependencies
 */

import objAttributes from "@essential-blocks/blocks/nft-gallery/src/attributes";
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
    creatorMargin,
    creatorImageHeight,
    creatorImageWidth,
    creatorImageBorder,
    priceMargin,
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
} from "@essential-blocks/blocks/nft-gallery/src/constants/constants";

import {
    typoPrefix_title,
    typoPrefix_owner,
    typoPrefix_price,
    typoPrefix_button,
} from "@essential-blocks/blocks/nft-gallery/src/constants/typographyPrefixConstants";

import {
    ResponsiveDimensionsControl,
    TypographyDropdown,
    BorderShadowControl,
    ColorControl,
    BackgroundControl,
    AdvancedControls,
    ResponsiveRangeController,
    useBlockDefaults,
    withBlockContext
} from "@essential-blocks/controls";

function NftGallery(props) {
    const { blockDefaults, setBlockDefaults, name, deviceType, handleBlockDefault } = props;



    const {
        source,
        settings,
        layout,
        displayImage,
        displayTitle,
        displayCreator,
        displayOwner,
        displayPrice,
        displayLastSale,
        displayButton,
        titleColor,
        ownerTextColor,
        ownerLinkColor,
        showOwnerImage,
        showOwnerText,
        creatorLabel,
        ownerLabel,
        priceColor,
        buttonTextColor,
        buttonBgColor,
        buttonHoverTextColor,
        buttonHoverBgColor,
        buttonText,
        gridPreset,
        listPreset,
        gridOverlayBg,
        listHorizontalAlignment,
        listVerticalAlignment,
    } = blockDefaults;
    const isDefaultSet = useBlockDefaults(name, blockDefaults, setBlockDefaults, objAttributes)

    return (
        <>
            {isDefaultSet && (
                <div className="eb-panel-control">
                    <PanelBody
                        title={__("Layout", "essential-blocks")}
                        initialOpen={true}
                    >
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
                                handleBlockDefault({
                                    displayImage: !displayImage,
                                })
                            }
                        />
                        <ToggleControl
                            label={__("Show Title?", "essential-blocks")}
                            checked={displayTitle}
                            onChange={() =>
                                handleBlockDefault({
                                    displayTitle: !displayTitle,
                                })
                            }
                        />
                        <ToggleControl
                            label={__(
                                "Show Current Owner?",
                                "essential-blocks"
                            )}
                            checked={displayOwner}
                            onChange={() =>
                                handleBlockDefault({
                                    displayOwner: !displayOwner,
                                })
                            }
                        />
                        <ToggleControl
                            label={__("Show Creator?", "essential-blocks")}
                            checked={displayCreator}
                            onChange={() =>
                                handleBlockDefault({
                                    displayCreator: !displayCreator,
                                })
                            }
                        />
                        <ToggleControl
                            label={__("Show Price?", "essential-blocks")}
                            checked={displayPrice}
                            onChange={() =>
                                handleBlockDefault({
                                    displayPrice: !displayPrice,
                                })
                            }
                        />
                        <ToggleControl
                            label={__("Show Last Sale?", "essential-blocks")}
                            checked={displayLastSale}
                            onChange={() =>
                                handleBlockDefault({
                                    displayLastSale: !displayLastSale,
                                })
                            }
                        />
                        <ToggleControl
                            label={__("Show Button?", "essential-blocks")}
                            checked={displayButton}
                            onChange={() =>
                                handleBlockDefault({
                                    displayButton: !displayButton,
                                })
                            }
                        />
                    </PanelBody>
                    <PanelBody
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
                    </PanelBody>

                    <PanelBody
                        title={__("Item Box Styles", "essential-blocks")}
                        initialOpen={false}
                    >
                        {layout === "list" && (
                            <>
                                <BaseControl
                                    label={__(
                                        "Vertical Alignment",
                                        "essential-blocks"
                                    )}
                                    id="eb-button-group-alignment"
                                >
                                    <ButtonGroup id="eb-button-group-alignment">
                                        {VERTICAL_ALIGNMENT.map(
                                            (item, index) => (
                                                <Button
                                                    key={index}
                                                    isPrimary={
                                                        listVerticalAlignment ===
                                                        item.value
                                                    }
                                                    isSecondary={
                                                        listVerticalAlignment !==
                                                        item.value
                                                    }
                                                    onClick={() =>
                                                        handleBlockDefault({
                                                            listVerticalAlignment:
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
                            </>
                        )}
                        <PanelBody title={__("Background")} initialOpen={true}>
                            <BackgroundControl
                                controlName={itemBg}
                                noOverlay
                                noOverlayBgi
                            />
                        </PanelBody>
                        {layout === "grid" && gridPreset === "preset-3" && (
                            <>
                                <ColorControl
                                    label={__(
                                        "Overlay Color",
                                        "essential-blocks"
                                    )}
                                    color={gridOverlayBg}
                                    onChange={(color) =>
                                        handleBlockDefault({
                                            gridOverlayBg: color,
                                        })
                                    }
                                />
                            </>
                        )}
                        <PanelBody
                            title={__("Border & Shadow")}
                            initialOpen={true}
                        >
                            <BorderShadowControl
                                controlName={itemBdrSdw}
                            />
                        </PanelBody>
                        <ResponsiveDimensionsControl
                            controlName={itemPadding}
                            baseLabel="Padding"
                        />
                    </PanelBody>

                    {displayImage && (
                        <PanelBody
                            title={__("Image Style", "essential-blocks")}
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
                                baseLabel="Margin"
                            />
                            <ResponsiveDimensionsControl
                                controlName={imageRadius}
                                baseLabel="Border Radius"
                            />
                        </PanelBody>
                    )}

                    <PanelBody
                        title={__("Title Style", "essential-blocks")}
                        initialOpen={false}
                    >
                        <TypographyDropdown
                            baseLabel="Typography"
                            typographyPrefixConstant={typoPrefix_title}
                        />
                        <ColorControl
                            label={__("Color", "essential-blocks")}
                            color={titleColor}
                            onChange={(titleColor) =>
                                handleBlockDefault({ titleColor })
                            }
                        />
                        <ResponsiveDimensionsControl
                            controlName={titleMargin}
                            baseLabel="Margin"
                        />
                    </PanelBody>

                    <PanelBody
                        title={__("Creator/Owner Style", "essential-blocks")}
                        initialOpen={false}
                    >
                        <ToggleControl
                            label={__("Show Name?", "essential-blocks")}
                            checked={showOwnerText}
                            onChange={() =>
                                handleBlockDefault({
                                    showOwnerText: !showOwnerText,
                                })
                            }
                        />
                        <ToggleControl
                            label={__("Show Image?", "essential-blocks")}
                            checked={showOwnerImage}
                            onChange={() =>
                                handleBlockDefault({
                                    showOwnerImage: !showOwnerImage,
                                })
                            }
                        />
                        <TypographyDropdown
                            baseLabel="Typography"
                            typographyPrefixConstant={typoPrefix_owner}
                        />
                        {displayCreator && (
                            <TextControl
                                label={__("Creator Label", "essential-blocks")}
                                value={creatorLabel}
                                onChange={(text) =>
                                    handleBlockDefault({ creatorLabel: text })
                                }
                            />
                        )}
                        {displayOwner && (
                            <TextControl
                                label={__("Owner Label", "essential-blocks")}
                                value={ownerLabel}
                                onChange={(text) =>
                                    handleBlockDefault({ ownerLabel: text })
                                }
                            />
                        )}
                        <ColorControl
                            label={__("Label Color", "essential-blocks")}
                            color={ownerTextColor}
                            onChange={(color) =>
                                handleBlockDefault({ ownerTextColor: color })
                            }
                        />
                        <ColorControl
                            label={__("Link Color", "essential-blocks")}
                            color={ownerLinkColor}
                            onChange={(color) =>
                                handleBlockDefault({ ownerLinkColor: color })
                            }
                        />
                        <ResponsiveRangeController
                            baseLabel={__("Image Height", "essential-blocks")}
                            controlName={creatorImageHeight}
                            min={0}
                            max={500}
                            step={1}
                            units={GAP_UNIT}
                        />
                        <ResponsiveRangeController
                            baseLabel={__("Image Width", "essential-blocks")}
                            controlName={creatorImageWidth}
                            min={0}
                            max={500}
                            step={1}
                            units={GAP_UNIT}
                        />
                        <ResponsiveDimensionsControl
                            controlName={creatorImageBorder}
                            baseLabel="Image Border Radius"
                        />
                        <ResponsiveDimensionsControl
                            controlName={creatorMargin}
                            baseLabel="Margin"
                        />
                    </PanelBody>

                    <PanelBody
                        title={__("Price Style", "essential-blocks")}
                        initialOpen={false}
                    >
                        <TypographyDropdown
                            baseLabel="Typography"
                            typographyPrefixConstant={typoPrefix_price}
                        />
                        <ColorControl
                            label={__("Color", "essential-blocks")}
                            color={priceColor}
                            onChange={(color) =>
                                handleBlockDefault({ priceColor: color })
                            }
                        />
                        <ResponsiveDimensionsControl
                            controlName={priceMargin}
                            baseLabel="Margin"
                        />
                    </PanelBody>

                    <PanelBody
                        title={__("Button Style", "essential-blocks")}
                        initialOpen={false}
                    >
                        <TextControl
                            label={__("Button Text", "essential-blocks")}
                            value={buttonText}
                            onChange={(text) =>
                                handleBlockDefault({ buttonText: text })
                            }
                        />
                        <TypographyDropdown
                            baseLabel="Typography"
                            typographyPrefixConstant={typoPrefix_button}
                        />
                        <ColorControl
                            label={__("Text Color", "essential-blocks")}
                            color={buttonTextColor}
                            onChange={(color) =>
                                handleBlockDefault({ buttonTextColor: color })
                            }
                        />
                        <ColorControl
                            label={__("Background Color", "essential-blocks")}
                            color={buttonBgColor}
                            onChange={(color) =>
                                handleBlockDefault({ buttonBgColor: color })
                            }
                        />
                        <ColorControl
                            label={__("Hover Text Color", "essential-blocks")}
                            color={buttonHoverTextColor}
                            onChange={(color) =>
                                handleBlockDefault({
                                    buttonHoverTextColor: color,
                                })
                            }
                        />
                        <ColorControl
                            label={__(
                                "Hover Background Color",
                                "essential-blocks"
                            )}
                            color={buttonHoverBgColor}
                            onChange={(color) =>
                                handleBlockDefault({
                                    buttonHoverBgColor: color,
                                })
                            }
                        />
                        <ResponsiveDimensionsControl
                            controlName={buttonMargin}
                            baseLabel="Margin"
                        />
                        <ResponsiveDimensionsControl
                            controlName={buttonPadding}
                            baseLabel="Padding"
                        />
                        <PanelBody
                            title={__("Border & Shadow")}
                            initialOpen={true}
                        >
                            <BorderShadowControl
                                controlName={buttonBdrSdw}
                            />
                        </PanelBody>
                    </PanelBody>
                    <PanelBody
                        title={__("Wrapper Margin & Padding")}
                        initialOpen={false}
                    >
                        <ResponsiveDimensionsControl
                            controlName={dimensionsMargin}
                            baseLabel="Margin"
                        />
                        <ResponsiveDimensionsControl
                            controlName={dimensionsPadding}
                            baseLabel="Padding"
                        />
                    </PanelBody>

                    <PanelBody
                        title={__("Wrapper Background", "essential-blocks")}
                        initialOpen={false}
                    >
                        <BackgroundControl
                            controlName={wrapBg}
                            noOverlay
                            noOverlayBgi
                        />
                    </PanelBody>

                    <PanelBody
                        title={__("Wrapper Border & Shadow")}
                        initialOpen={false}
                    >
                        <BorderShadowControl
                            controlName={wrpBdShadow}
                        />
                    </PanelBody>
                </div>
            )}
        </>
    );
}

export default withBlockContext(objAttributes)(NftGallery);
