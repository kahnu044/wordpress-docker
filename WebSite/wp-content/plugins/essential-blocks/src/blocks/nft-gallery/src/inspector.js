/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useEffect } from "@wordpress/element";
import {
    ToggleControl,
    SelectControl,
    TextControl,
    RangeControl,
    BaseControl,
    ButtonGroup,
    Button,
    Card,
    CardBody,
    ExternalLink,
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
} from "./constants/constants";

import {
    typoPrefix_title,
    typoPrefix_owner,
    typoPrefix_price,
    typoPrefix_button,
} from "./constants/typographyPrefixConstants";
import { useState } from "react";

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
        listVerticalAlignment,
    } = attributes;

    const [openseaApi, setOpenseaApi] = useState("");

    //Initial UseEffect
    useEffect(() => {
        if (!settings) {
            setAttributes({
                settings: {
                    opensea: {
                        apiKey: "",
                        type: "items",
                        filterBy: "",
                        itemLimit: 6,
                        collectionLimit: 6,
                        orderBy: "desc",
                    },
                },
            });
        }

        //Get Opensea API
        let data = new FormData();
        data.append("action", "opensea_api_key");
        data.append("admin_nonce", EssentialBlocksLocalize.admin_nonce);
        fetch(EssentialBlocksLocalize.ajax_url, {
            method: "POST",
            body: data,
        }) // wrapped
            .then((res) => res.text())
            .then((data) => {
                const response = JSON.parse(data);
                if (response.success && response.data) {
                    setOpenseaApi(response.data);
                    // setOpenseaDbApi(response.data);
                }
            })
            .catch((err) => console.log(err));
    }, []);

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
                                {!openseaApi && (
                                    <Card>
                                        <CardBody>
                                            <p>
                                                {__(
                                                    "Please add your own Opensea API ",
                                                    "essential-blocks"
                                                )}{" "}
                                                <ExternalLink
                                                    href={`${EssentialBlocksLocalize.eb_admin_url}admin.php?page=essential-blocks&tab=options`}
                                                >
                                                    {__("here.")}
                                                </ExternalLink>
                                            </p>
                                        </CardBody>
                                    </Card>
                                )}
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
                                />
                                {settings?.opensea?.type === "items" && (
                                    <>
                                        <SelectControl
                                            label={__("Filter By", "essential-blocks")}
                                            value={settings?.opensea?.filterBy}
                                            options={[
                                                {
                                                    label: __("None", "essential-blocks"),
                                                    value: "",
                                                },
                                                {
                                                    label: __(
                                                        "Collection Slug",
                                                        "essential-blocks"
                                                    ),
                                                    value: "slug",
                                                },
                                                {
                                                    label: __(
                                                        "Wallet Address",
                                                        "essential-blocks"
                                                    ),
                                                    value: "wallet",
                                                },
                                            ]}
                                            onChange={(value) =>
                                                updateSettings("opensea", "filterBy", value)
                                            }
                                        />
                                        {settings?.opensea?.filterBy === "slug" && (
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
                                            />
                                        )}
                                        {settings?.opensea?.filterBy === "wallet" && (
                                            <TextControl
                                                label={__("Wallet Address", "essential-blocks")}
                                                placeholder={__(
                                                    "0x1......",
                                                    "essential-blocks"
                                                )}
                                                value={settings?.opensea?.itemWalletId}
                                                onChange={(value) =>
                                                    updateSettings(
                                                        "opensea",
                                                        "itemWalletId",
                                                        value
                                                    )
                                                }
                                            />
                                        )}
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
                                        />
                                        <SelectControl
                                            label={__("Order By", "essential-blocks")}
                                            value={settings?.opensea?.orderBy}
                                            options={[
                                                {
                                                    label: __("DESC", "essential-blocks"),
                                                    value: "desc",
                                                },
                                                {
                                                    label: __("ASC", "essential-blocks"),
                                                    value: "asc",
                                                },
                                            ]}
                                            onChange={(value) =>
                                                updateSettings("opensea", "orderBy", value)
                                            }
                                        />
                                    </>
                                )}
                                {settings?.opensea?.type === "collections" && (
                                    <>
                                        <TextControl
                                            label={__("Wallet Address", "essential-blocks")}
                                            value={settings?.opensea?.collectionWalletId}
                                            onChange={(value) =>
                                                updateSettings(
                                                    "opensea",
                                                    "collectionWalletId",
                                                    value
                                                )
                                            }
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
                        />

                        {layout === "grid" && (
                            <SelectControl
                                label={__("Grid Preset", "essential-blocks")}
                                value={gridPreset}
                                options={GRID_PRESET}
                                onChange={(value) =>
                                    setAttributes({ gridPreset: value })
                                }
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
                        />
                        <ToggleControl
                            label={__("Show Title?", "essential-blocks")}
                            checked={displayTitle}
                            onChange={() =>
                                setAttributes({ displayTitle: !displayTitle })
                            }
                        />

                        {settings?.opensea?.type === "items" && (
                            <>
                                <ToggleControl
                                    label={__("Show Current Owner?", "essential-blocks")}
                                    checked={displayOwner}
                                    onChange={() =>
                                        setAttributes({ displayOwner: !displayOwner })
                                    }
                                />
                                <ToggleControl
                                    label={__("Show Creator?", "essential-blocks")}
                                    checked={displayCreator}
                                    onChange={() =>
                                        setAttributes({ displayCreator: !displayCreator })
                                    }
                                />
                                <ToggleControl
                                    label={__("Show Price?", "essential-blocks")}
                                    checked={displayPrice}
                                    onChange={() =>
                                        setAttributes({ displayPrice: !displayPrice })
                                    }
                                />
                                <ToggleControl
                                    label={__("Show Last Sale?", "essential-blocks")}
                                    checked={displayLastSale}
                                    onChange={() =>
                                        setAttributes({ displayLastSale: !displayLastSale })
                                    }
                                />
                                <ToggleControl
                                    label={__("Show Button?", "essential-blocks")}
                                    checked={displayButton}
                                    onChange={() =>
                                        setAttributes({ displayButton: !displayButton })
                                    }
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
                                <BaseControl
                                    label={__("Vertical Alignment", "essential-blocks")}
                                    id="eb-button-group-alignment"
                                >
                                    <ButtonGroup id="eb-button-group-alignment">
                                        {VERTICAL_ALIGNMENT.map((item, index) => (
                                            <Button
                                                key={index}
                                                isPrimary={listVerticalAlignment === item.value}
                                                isSecondary={
                                                    listVerticalAlignment !== item.value
                                                }
                                                onClick={() =>
                                                    setAttributes({
                                                        listVerticalAlignment: item.value,
                                                    })
                                                }
                                            >
                                                {item.label}
                                            </Button>
                                        ))}
                                    </ButtonGroup>
                                </BaseControl>
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
                        title={__("Creator/Owner", "essential-blocks")}
                        initialOpen={false}
                    >
                        <ToggleControl
                            label={__("Show Name?", "essential-blocks")}
                            checked={showOwnerText}
                            onChange={() =>
                                setAttributes({ showOwnerText: !showOwnerText })
                            }
                        />
                        <ToggleControl
                            label={__("Show Image?", "essential-blocks")}
                            checked={showOwnerImage}
                            onChange={() =>
                                setAttributes({ showOwnerImage: !showOwnerImage })
                            }
                        />
                        <TypographyDropdown
                            baseLabel={__("Typography", "essential-blocks")}
                            typographyPrefixConstant={typoPrefix_owner}
                        />
                        {displayCreator && (
                            <TextControl
                                label={__("Creator Label", "essential-blocks")}
                                value={creatorLabel}
                                onChange={(text) =>
                                    setAttributes({ creatorLabel: text })
                                }
                            />
                        )}
                        {displayOwner && (
                            <TextControl
                                label={__("Owner Label", "essential-blocks")}
                                value={ownerLabel}
                                onChange={(text) => setAttributes({ ownerLabel: text })}
                            />
                        )}
                        <ColorControl
                            label={__("Label Color", "essential-blocks")}
                            color={ownerTextColor}
                            attributeName={'ownerTextColor'}
                        />
                        <ColorControl
                            label={__("Link Color", "essential-blocks")}
                            color={ownerLinkColor}
                            attributeName={'ownerLinkColor'}
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
                            baseLabel={__("Image Border Radius", "essential-blocks")}
                        />
                        <ResponsiveDimensionsControl
                            controlName={creatorMargin}
                            baseLabel={__("Margin", "essential-blocks")}
                        />
                    </InspectorPanel.PanelBody>

                    <InspectorPanel.PanelBody
                        title={__("Price", "essential-blocks")}
                        initialOpen={false}
                    >
                        <TypographyDropdown
                            baseLabel={__("Typography", "essential-blocks")}
                            typographyPrefixConstant={typoPrefix_price}
                        />
                        <ColorControl
                            label={__("Color", "essential-blocks")}
                            color={priceColor}
                            attributeName={'priceColor'}
                        />
                        <ResponsiveDimensionsControl
                            controlName={priceMargin}
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
