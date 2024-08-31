/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useEffect } from "@wordpress/element";
import { applyFilters } from "@wordpress/hooks";
import {
    PanelBody,
    Button,
    ButtonGroup,
    BaseControl,
    SelectControl,
    ToggleControl,
    TextControl,
    __experimentalDivider as Divider,
} from "@wordpress/components";
/**
 * Internal dependencies
 */

import objAttributes from "./attributes";
import {
    typoPrefix_title,
    typoPrefix_price,
    typoPrefix_sale,
    typoPrefix_desc,
    typoPrefix_btn,
    EBWG_LOAD_MORE_TYPOGRAPHY,
} from "./constants/typographyConstants";
import {
    LAYOUT,
    RATING_ICON_SIZE,
    BTN_BORDER_SHADOW,
    SALE_BADGE_ALIGN,
    SALE_BADGE_BORDER,
    WRAPPER_MARGIN,
    WRAPPER_PADDING,
    WRAPPER_BG,
    WRAPPER_BORDER_SHADOW,
    CONTENT_ALIGNMENT,
    CONTENT_PADDING,
    IMAGE_PADDING,
    PRODUCTS_BORDER_SHADOW,
    GRID_SPACING,
    COLUMNS,
    TITLE_MARGIN,
    PRICE_MARGIN,
    RATING_MARGIN,
    BUTTON_MARGIN,
    DESC_MARGIN,
    IMG_GAP,
    IMG_WIDTH,
    IMG_HEIGHT,
    IMAGE_BORDER_SHADOW,
    NORMAL_HOVER,
    NORMAL_HOVER_ACTIVE,
    LOADMORE_PADDING,
    LOADMORE_MARGIN,
    LOADMORE_BORDER_SHADOW,
    RATING_STYLE,
} from "./constants";

import {
    ResponsiveDimensionsControl,
    ResponsiveRangeController,
    TypographyDropdown,
    ColorControl,
    BorderShadowControl,
    WoocommerceQuery,
    MorePosts,
    InspectorPanel,
    SortControl
 } from "@essential-blocks/controls";

const Inspector = ({ attributes, setAttributes, setQueryResults }) => {
    const {
        resOption,
        queryData,
        queryResults,
        layout,
        gridPreset,
        showRating,
        showPrice,
        showSaleBadge,
        listPreset,
        titleColor,
        titleHoverColor,
        priceColor,
        salePriceColor,
        ratingColor,
        btnColor,
        btnHoverColor,
        btnBackgroundColor,
        btnBackgroundHoverColor,
        saleBadgeAlign,
        saleText,
        saleTextColor,
        saleTextBackgroundColor,
        contentAlignment,
        contentBackgroundColor,
        imageBackgroundColor,
        descColor,
        autoHeight,
        backgroundOverlayColor,
        isCustomCartBtn,
        simpleCartText,
        variableCartText,
        groupedCartText,
        externalCartText,
        defaultCartText,
        imageOverlayColor,
        productDescLength,
        loadMoreOptions,
        loadMoreColorType,
        loadMoreColor,
        loadMoreBgColor,
        loadMoreHoverColor,
        loadMoreHoverBgColor,
        loadMoreActiveColor,
        loadMoreActiveBgColor,
        ratingStyle,
        enableContents,
    } = attributes;

    const changeLayout = (preset) => {
        setAttributes({ layout: preset });
        if (preset === "grid") {
            changeGridPreset(gridPreset);
        } else {
            changeListPreset(listPreset);
        }
    };
 
    const textToNumber = (value) => {
        if (value < 0) {
            setAttributes({ productDescLength: 0 });
        } else {
            setAttributes({ productDescLength: value });
        }
    };

    const makeEnableContent = (showItem, itemName) => {
        let newEnableContents = [...enableContents];
        if (showItem == true) {
            if (!newEnableContents.includes(itemName)) {
                newEnableContents.push(itemName);
            }
        } else {
            if (newEnableContents.includes(itemName)) {
                newEnableContents = newEnableContents.filter(
                    (item) => item !== itemName
                );
            }
        }
        setAttributes({
            enableContents: newEnableContents,
        });
    };

    // default loadmore options
    useEffect(() => {
        if (loadMoreOptions) {
            if (!loadMoreOptions.alignment) {
                loadMoreOptions.alignment = "center";
            }

            if (!loadMoreOptions.loadMoreType) {
                loadMoreOptions.loadMoreType = "1";
            }

            if (!loadMoreOptions.loadMoreButtonTxt) {
                loadMoreOptions.loadMoreButtonTxt = "Load More";
            }

            if (!loadMoreOptions.nextTxt) {
                loadMoreOptions.nextTxt = ">";
            }

            if (!loadMoreOptions.prevTxt) {
                loadMoreOptions.prevTxt = "<";
            }
        }
    }, [loadMoreOptions]);

    return (
        <>
            <InspectorPanel 
                advancedControlProps={{
                    marginPrefix: WRAPPER_MARGIN,
                    paddingPrefix: WRAPPER_PADDING,
                    borderPrefix: WRAPPER_BORDER_SHADOW,
                    backgroundPrefix: WRAPPER_BG,
                }}>
                <InspectorPanel.General>
                    <InspectorPanel.PanelBody initialOpen={true} title={__("Layout", "essential-blocks")}>
                        <BaseControl label={__("Layouts", "essential-blocks")}>
                            <ButtonGroup id="eb-woo-products-layout">
                                {LAYOUT.map((item, key) => (
                                    <Button
                                        key={key}
                                        isPrimary={layout === item.value}
                                        isSecondary={layout !== item.value}
                                        onClick={() => setAttributes(changeLayout(item.value))}
                                    >
                                        {item.label}
                                    </Button>
                                ))}
                            </ButtonGroup>
                        </BaseControl>
                        {layout === "grid" && (
                            <>
                                {/* <SelectControl
                                    label={__("Grid Preset", "essential-blocks")}
                                    value={gridPreset}
                                    options={[
                                        {
                                            label: __("Grid Preset 1"),
                                            value: "grid-preset-1",
                                        },
                                        {
                                            label: __("Grid Preset 2"),
                                            value: "grid-preset-2",
                                        },
                                        {
                                            label: __("Grid Preset 3"),
                                            value: "grid-preset-3",
                                        },
                                    ]}
                                    onChange={(newGridPreset) => changeGridPreset(newGridPreset)}
                                /> */}
                                <ResponsiveRangeController
                                    baseLabel={__("Columns", "essential-blocks")}
                                    controlName={COLUMNS}
                                    min={0}
                                    max={6}
                                    step={1}
                                    noUnits={true}
                                />
                            </>
                        )}
                        {layout === "list" && (
                            <>
                                {/* <SelectControl
                                    label={__("List Preset", "essential-blocks")}
                                    value={listPreset}
                                    options={[
                                        {
                                            label: __("List Preset 1"),
                                            value: "list-preset-1",
                                        },
                                    ]}
                                    onChange={(newListPreset) =>
                                        setAttributes(changeListPreset(newListPreset))
                                    }
                                /> */}
                            </>
                        )}
                        <ToggleControl
                            label={__("Show Rating", "essential-blocks")}
                            checked={showRating}
                            onChange={() => {
                                setAttributes({
                                    showRating: !showRating,
                                });
                                makeEnableContent(
                                    !showRating,
                                    "rating"
                                );
                            }}
                        />
                        {showRating && (
                            <SelectControl
                                label={__(
                                    "Rating Style",
                                    "essential-blocks"
                                )}
                                value={ratingStyle}
                                options={applyFilters(
                                    "eb_woo_product_grid_rating_style",
                                    RATING_STYLE
                                )}
                                onChange={(
                                    newRatingStyle
                                ) =>
                                    setAttributes({
                                        ratingStyle: newRatingStyle,
                                    })
                                }
                            />
                        )}
                        <ToggleControl
                            label={__("Show Price", "essential-blocks")}
                            checked={showPrice}
                            onChange={() => {
                                setAttributes({
                                    showPrice: !showPrice,
                                });
                                makeEnableContent(
                                    !showPrice,
                                    "price"
                                );
                            }}
                        />
                        <ToggleControl
                            label={__("Show Sale Badge", "essential-blocks")}
                            checked={showSaleBadge}
                            onChange={() =>
                                setAttributes({
                                    showSaleBadge: !showSaleBadge,
                                })
                            }
                        />
                        {applyFilters(
                            "eb_woo_product_grid_general_toggle",
                            "",
                            attributes,
                            setAttributes,
                            makeEnableContent
                        )}
                    </InspectorPanel.PanelBody>
                    <WoocommerceQuery
                        title={"Product Query"}
                        initialOpen={false}
                        queryData={queryData}
                        queryResults={queryResults}
                        setAttributes={setAttributes}
                        setQueryResults={setQueryResults}
                    />
                    <InspectorPanel.PanelBody title={__("Cart Text", "essential-blocks")} initialOpen={false}>
                        <ToggleControl
                            label={__("Use Custom Cart Button Text", "essential-blocks")}
                            checked={isCustomCartBtn}
                            onChange={() =>
                                setAttributes({
                                    isCustomCartBtn: !isCustomCartBtn,
                                })
                            }
                        />
                        {isCustomCartBtn && (
                            <>
                                <TextControl
                                    label={__("Simple Product", "essential-blocks")}
                                    value={simpleCartText}
                                    onChange={(text) =>
                                        setAttributes({
                                            simpleCartText: text,
                                        })
                                    }
                                />
                                <TextControl
                                    label={__("Variable Product", "essential-blocks")}
                                    value={variableCartText}
                                    onChange={(text) =>
                                        setAttributes({
                                            variableCartText: text,
                                        })
                                    }
                                />
                                <TextControl
                                    label={__("Grouped Product", "essential-blocks")}
                                    value={groupedCartText}
                                    onChange={(text) =>
                                        setAttributes({
                                            groupedCartText: text,
                                        })
                                    }
                                />
                                <TextControl
                                    label={__("External Product", "essential-blocks")}
                                    value={externalCartText}
                                    onChange={(text) =>
                                        setAttributes({
                                            externalCartText: text,
                                        })
                                    }
                                />
                                <TextControl
                                    label={__("Default Product", "essential-blocks")}
                                    value={defaultCartText}
                                    onChange={(text) =>
                                        setAttributes({
                                            defaultCartText: text,
                                        })
                                    }
                                />
                            </>
                        )}
                    </InspectorPanel.PanelBody>
                    <InspectorPanel.PanelBody title={__("Sale Badge", "essential-blocks")} initialOpen={false}>
                        <BaseControl
                            label={__("Alignment", "essential-blocks")}
                            id="eb-woo-products-alignment"
                        >
                            <ButtonGroup>
                                {SALE_BADGE_ALIGN.map((item, key) => (
                                    <Button
                                        key={key}
                                        isPrimary={saleBadgeAlign === item.value}
                                        isSecondary={saleBadgeAlign !== item.value}
                                        onClick={() =>
                                            setAttributes({
                                                saleBadgeAlign: item.value,
                                            })
                                        }
                                    >
                                        {item.label}
                                    </Button>
                                ))}
                            </ButtonGroup>
                        </BaseControl>
                        <TextControl
                            label={__("Sale Text", "essential-blocks")}
                            value={saleText}
                            onChange={(text) =>
                                setAttributes({
                                    saleText: text,
                                })
                            }
                        />
                    </InspectorPanel.PanelBody>
                    <MorePosts
                        loadMoreOptions={loadMoreOptions}
                        queryData={queryData}
                        setAttributes={setAttributes}
                        initialOpen={false}
                    />
                    <InspectorPanel.PanelBody
                        title={__(
                            "Sorting Content",
                            "essential-blocks-pro"
                        )}
                        initialOpen={false}
                    >
                        <SortControl
                            items={enableContents}
                            labelKey=""
                            onSortEnd={enableContents => setAttributes({ enableContents })}
                            hasSettings={false}
                            hasAddButton={false}
                            hasDelete={false}
                        ></SortControl>
                    </InspectorPanel.PanelBody>
                    {applyFilters(
                        "eb_woo_product_grid_general_tab",
                        "",
                        attributes,
                        setAttributes,
                    )}
                </InspectorPanel.General>
                <InspectorPanel.Style>
                    <InspectorPanel.PanelBody title={__("Products", "essential-blocks")} initialOpen={true}>
                        <>
                            <BaseControl
                                label={__("Content Alignment", "essential-blocks")}
                                id="eb-woo-products-content-alignment"
                            >
                                <ButtonGroup>
                                    {CONTENT_ALIGNMENT.map((item, key) => (
                                        <Button
                                            key={key}
                                            isPrimary={contentAlignment === item.value}
                                            isSecondary={contentAlignment !== item.value}
                                            onClick={() =>
                                                setAttributes({
                                                    contentAlignment: item.value,
                                                })
                                            }
                                        >
                                            {item.label}
                                        </Button>
                                    ))}
                                </ButtonGroup>
                            </BaseControl>
                            <ColorControl
                                label={__("Content Background Color", "essential-blocks")}
                                color={contentBackgroundColor}
                                attributeName={'contentBackgroundColor'}
                            />
                            {"grid" === layout && gridPreset === "grid-preset-3" && (
                                <ColorControl
                                    label={__("Background Overlay Color", "essential-blocks")}
                                    color={backgroundOverlayColor}
                                    attributeName={'backgroundOverlayColor'}
                                />
                            )}
                            <ResponsiveDimensionsControl
                                controlName={CONTENT_PADDING}
                                baseLabel={__("Padding", "essential-blocks")}
                            />
                            <ResponsiveRangeController
                                baseLabel={__("Spacing", "essential-blocks")}
                                controlName={GRID_SPACING}
                                min={0}
                                max={200}
                                step={1}
                                noUnits={true}
                            />
                            <InspectorPanel.PanelBody title={__("Border & Shadow")} initialOpen={false}>
                                <BorderShadowControl
                                    controlName={PRODUCTS_BORDER_SHADOW}
                                // noShadow
                                // noBorder
                                />
                            </InspectorPanel.PanelBody>
                        </>
                    </InspectorPanel.PanelBody>
                    <InspectorPanel.PanelBody title={__("Image", "essential-blocks")} initialOpen={false}>
                        <>
                            <ResponsiveRangeController
                                baseLabel={__("Width", "essential-blocks")}
                                controlName={IMG_WIDTH}
                                min={0}
                                max={1200}
                            />
                            {!autoHeight && (
                                <ResponsiveRangeController
                                    baseLabel={__("Height", "essential-blocks")}
                                    controlName={IMG_HEIGHT}
                                    min={0}
                                    max={1200}
                                />
                            )}
                            <ToggleControl
                                label={__("Auto Height", "essential-blocks")}
                                checked={autoHeight}
                                onChange={() =>
                                    setAttributes({
                                        autoHeight: !autoHeight,
                                    })
                                }
                            />
                            <Divider />
                            <ColorControl
                                label={__("Image Wrapper Background", "essential-blocks")}
                                color={imageBackgroundColor}
                                attributeName={'imageBackgroundColor'}
                            />
                            {layout === "list" && (
                                <>
                                    <ColorControl
                                        label={__("Image Overlay Color", "essential-blocks")}
                                        color={imageOverlayColor}
                                        attributeName={'imageOverlayColor'}
                                    />
                                    <ResponsiveRangeController
                                        baseLabel={__("Image Space", "essential-blocks")}
                                        controlName={IMG_GAP}
                                        min={0}
                                        max={500}
                                        step={1}
                                        noUnits={true}
                                    />
                                </>
                            )}
                            <ResponsiveDimensionsControl
                                controlName={IMAGE_PADDING}
                                baseLabel={__("Padding", "essential-blocks")}
                            />
                            <BorderShadowControl
                                controlName={IMAGE_BORDER_SHADOW}
                            />
                        </>
                    </InspectorPanel.PanelBody>
                    <InspectorPanel.PanelBody title={__("Product Title", "essential-blocks")} initialOpen={false}>
                        <>
                            <TypographyDropdown
                                baseLabel={__("Typography", "essential-blocks")}
                                typographyPrefixConstant={typoPrefix_title}
                            />
                            <ColorControl
                                label={__("Color", "essential-blocks")}
                                color={titleColor}
                                attributeName={'titleColor'}
                            />
                            <ColorControl
                                label={__("Hover Color", "essential-blocks")}
                                color={titleHoverColor}
                                attributeName={'titleHoverColor'}
                            />
                            <ResponsiveDimensionsControl
                                controlName={TITLE_MARGIN}
                                baseLabel={__("Space", "essential-blocks")}
                            />
                        </>
                    </InspectorPanel.PanelBody>
                    {layout === "list" && (
                        <InspectorPanel.PanelBody
                            title={__("Product Description", "essential-blocks")}
                            initialOpen={false}
                        >
                            <>
                                <TypographyDropdown
                                    baseLabel={__("Typography", "essential-blocks")}
                                    typographyPrefixConstant={typoPrefix_desc}
                                />
                                <ColorControl
                                    label={__("Color", "essential-blocks")}
                                    color={descColor}
                                    attributeName={'descColor'}
                                />
                                <TextControl
                                    label={__("Description length", "essential-blocks")}
                                    value={productDescLength}
                                    type="number"
                                    onChange={(value) => textToNumber(value)}
                                />
                                <ResponsiveDimensionsControl
                                    controlName={DESC_MARGIN}
                                    baseLabel={__("Space", "essential-blocks")}
                                />
                            </>
                        </InspectorPanel.PanelBody>
                    )}
                    <InspectorPanel.PanelBody title={__("Product Price", "essential-blocks")} initialOpen={false}>
                        <>
                            <TypographyDropdown
                                baseLabel={__("Typography", "essential-blocks")}
                                typographyPrefixConstant={typoPrefix_price}
                            />
                            <ColorControl
                                label={__("Price Color", "essential-blocks")}
                                color={priceColor}
                                attributeName={'priceColor'}
                            />
                            <ColorControl
                                label={__("Sale Price Color", "essential-blocks")}
                                color={salePriceColor}
                                attributeName={'salePriceColor'}
                            />
                            <ResponsiveDimensionsControl
                                controlName={PRICE_MARGIN}
                                baseLabel={__("Space", "essential-blocks")}
                            />
                        </>
                    </InspectorPanel.PanelBody>
                    {showRating && (
                        <InspectorPanel.PanelBody title={__("Product Rating", "essential-blocks")} initialOpen={false}>
                            <>
                                <ColorControl
                                    label={__("Rating Color", "essential-blocks")}
                                    color={ratingColor}
                                    attributeName={'ratingColor'}
                                />
                                <ResponsiveRangeController
                                    baseLabel={__("Icon Size", "essential-blocks")}
                                    controlName={RATING_ICON_SIZE}
                                    min={0}
                                    max={50}
                                    step={1}
                                />
                                <ResponsiveDimensionsControl
                                    controlName={RATING_MARGIN}
                                    baseLabel={__("Space", "essential-blocks")}
                                />
                            </>
                        </InspectorPanel.PanelBody>
                    )}
                    <InspectorPanel.PanelBody title={__("Button", "essential-blocks")} initialOpen={false}>
                        <>
                            <TypographyDropdown
                                baseLabel={__("Typography", "essential-blocks")}
                                typographyPrefixConstant={typoPrefix_btn}
                            />
                            <ColorControl
                                label={__("Text Color", "essential-blocks")}
                                color={btnColor}
                                attributeName={'btnColor'}
                            />
                            <ColorControl
                                label={__("Text Hover Color", "essential-blocks")}
                                color={btnHoverColor}
                                attributeName={'btnHoverColor'}
                            />
                            <ColorControl
                                label={__("Background Color", "essential-blocks")}
                                color={btnBackgroundColor}
                                attributeName={'btnBackgroundColor'}
                            />
                            <ColorControl
                                label={__("Background Hover Color", "essential-blocks")}
                                color={btnBackgroundHoverColor}
                                attributeName={'btnBackgroundHoverColor'}
                            />
                            <ResponsiveDimensionsControl
                                controlName={BUTTON_MARGIN}
                                baseLabel={__("Space", "essential-blocks")}
                            />
                            <BaseControl>
                                <h3 className="eb-control-title">{__("Border", "essential-blocks")}</h3>
                            </BaseControl>
                            <BorderShadowControl
                                controlName={BTN_BORDER_SHADOW}
                            />
                        </>
                    </InspectorPanel.PanelBody>
                    <InspectorPanel.PanelBody title={__("Sale Badge Style", "essential-blocks")} initialOpen={false}>
                        <TypographyDropdown
                            baseLabel={__("Typography", "essential-blocks")}
                            typographyPrefixConstant={typoPrefix_sale}
                        />
                        <ColorControl
                            label={__("Sale Text Color", "essential-blocks")}
                            color={saleTextColor}
                            attributeName={'saleTextColor'}
                        />
                        <ColorControl
                            label={__("Sale Text Background Color", "essential-blocks")}
                            color={saleTextBackgroundColor}
                            attributeName={'saleTextBackgroundColor'}
                        />
                        <BaseControl>
                            <h3 className="eb-control-title">{__("Border", "essential-blocks")}</h3>
                        </BaseControl>
                        <BorderShadowControl
                            controlName={SALE_BADGE_BORDER}
                            noShadow={true}
                            noBdrHover={true}
                        />
                    </InspectorPanel.PanelBody>
                    {loadMoreOptions?.enableMorePosts && (
                        <InspectorPanel.PanelBody title={__("Load More Styles")} initialOpen={false}>
                            {/* If load More type "Load More Button" */}
                            {loadMoreOptions?.loadMoreType === "1" && (
                                <ButtonGroup
                                    id="essential-blocks"
                                    className="eb-inspector-btn-group"
                                >
                                    {NORMAL_HOVER.map((item, index) => (
                                        <Button
                                            key={index}
                                            isPrimary={loadMoreColorType === item.value}
                                            isSecondary={loadMoreColorType !== item.value}
                                            onClick={() =>
                                                setAttributes({
                                                    loadMoreColorType: item.value,
                                                })
                                            }
                                        >
                                            {item.label}
                                        </Button>
                                    ))}
                                </ButtonGroup>
                            )}

                            {/* If load More type "Pagination" */}
                            {loadMoreOptions?.loadMoreType === "2" && (
                                <BaseControl
                                    label={__("", "essential-blocks")}
                                    id="eb-advance-heading-alignment"
                                >
                                    <ButtonGroup id="eb-advance-heading-alignment">
                                        {NORMAL_HOVER_ACTIVE.map((item, index) => (
                                            <Button
                                                key={index}
                                                isPrimary={loadMoreColorType === item.value}
                                                isSecondary={loadMoreColorType !== item.value}
                                                onClick={() =>
                                                    setAttributes({
                                                        loadMoreColorType: item.value,
                                                    })
                                                }
                                            >
                                                {item.label}
                                            </Button>
                                        ))}
                                    </ButtonGroup>
                                </BaseControl>
                            )}

                            {loadMoreColorType === "normal" && (
                                <>
                                    <ColorControl
                                        label={__("Color", "essential-blocks")}
                                        color={loadMoreColor}
                                        attributeName={'loadMoreColor'}
                                    />
                                    <ColorControl
                                        label={__("Background Color", "essential-blocks")}
                                        color={loadMoreBgColor}
                                        attributeName={'loadMoreBgColor'}
                                    />
                                </>
                            )}
                            {loadMoreColorType === "hover" && (
                                <>
                                    <ColorControl
                                        label={__("Color", "essential-blocks")}
                                        color={loadMoreHoverColor}
                                        attributeName={'loadMoreHoverColor'}
                                    />
                                    <ColorControl
                                        label={__("Background Color", "essential-blocks")}
                                        color={loadMoreHoverColor}
                                        attributeName={'loadMoreHoverColor'}
                                    />
                                </>
                            )}
                            {loadMoreColorType === "active" && (
                                <>
                                    <ColorControl
                                        label={__("Color", "essential-blocks")}
                                        color={loadMoreActiveColor}
                                        attributeName={'loadMoreActiveColor'}
                                    />
                                    <ColorControl
                                        label={__("Background Color", "essential-blocks")}
                                        color={loadMoreActiveBgColor}
                                        attributeName={'loadMoreActiveBgColor'}
                                    />
                                </>
                            )}

                            <TypographyDropdown
                                baseLabel={__("Typography", "essential-blocks")}
                                typographyPrefixConstant={EBWG_LOAD_MORE_TYPOGRAPHY}
                            />

                            <InspectorPanel.PanelBody>
                                <ResponsiveDimensionsControl
                                    controlName={LOADMORE_MARGIN}
                                    baseLabel="Margin"
                                />
                                <ResponsiveDimensionsControl
                                    controlName={LOADMORE_PADDING}
                                    baseLabel="Padding"
                                />
                            </InspectorPanel.PanelBody>
                            <InspectorPanel.PanelBody title={__("Border & Shadow")} initialOpen={false}>
                                <BorderShadowControl
                                    controlName={LOADMORE_BORDER_SHADOW}
                                    noShadow
                                // noBorder
                                />
                            </InspectorPanel.PanelBody>
                        </InspectorPanel.PanelBody>
                    )}
                    {applyFilters(
                        "eb_woo_product_grid_style_tab",
                        "",
                        attributes,
                        setAttributes,
                    )}
                </InspectorPanel.Style>
            </InspectorPanel>
        </>
    );
};

export default Inspector;
