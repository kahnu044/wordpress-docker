/**
 * WordPress dependencies
 */
import { useEffect } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { useBlockProps } from "@wordpress/block-editor";
import { select } from "@wordpress/data";

const {
    softMinifyCssStrings,
    generateTypographyStyles,
    generateResponsiveRangeStyles,
    generateDimensionsControlStyles,
    generateBorderShadowStyles,
    generateBackgroundControlStyles,
    duplicateBlockIdFix,
    WoocommerceQuery,
} = window.EBControls;

/**
 * Internal dependencies
 */
import classnames from "classnames";

import Inspector from "./inspector";

import {
    typoPrefix_title,
    typoPrefix_price,
    typoPrefix_sale,
    typoPrefix_desc,
    typoPrefix_btn,
    EBWG_LOAD_MORE_TYPOGRAPHY,
} from "./constants/typographyConstants";
import {
    RATING_ICON_SIZE,
    BTN_BORDER_SHADOW,
    SALE_BADGE_BORDER,
    WRAPPER_MARGIN,
    WRAPPER_PADDING,
    WRAPPER_BG,
    WRAPPER_BORDER_SHADOW,
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
    IMG_HEIGHT,
    IMG_WIDTH,
    IMAGE_BORDER_SHADOW,
    LOADMORE_PADDING,
    LOADMORE_MARGIN,
    LOADMORE_BORDER_SHADOW,
} from "./constants";

export default function Edit(props) {
    const { attributes, setAttributes, className, clientId, isSelected } = props;
    const {
        resOption,
        blockId,
        blockMeta,
        queryData,
        queryResults,
        layout,
        gridPreset,
        gridColumns,
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
        showRating,
        showPrice,
        contentAlignment,
        contentBackgroundColor,
        imageBackgroundColor,
        imageOverlayColor,
        descColor,
        showSaleBadge,
        autoHeight,
        backgroundOverlayColor,
        isCustomCartBtn,
        simpleCartText,
        variableCartText,
        groupedCartText,
        externalCartText,
        defaultCartText,
        productDescLength,
        loadMoreOptions,
        classHook,
        loadMoreColor,
        loadMoreBgColor,
        loadMoreHoverColor,
        loadMoreHoverBgColor,
        loadMoreActiveColor,
        loadMoreActiveBgColor,
        cover,
    } = attributes;

    const is_woocommerce_active = EssentialBlocksLocalize?.get_plugins["woocommerce/woocommerce.php"]?.active;

    // this useEffect is for creating an unique id for each block's unique className by a random unique number
    useEffect(() => {
        const BLOCK_PREFIX = "eb-woo-product";
        duplicateBlockIdFix({
            BLOCK_PREFIX,
            blockId,
            setAttributes,
            select,
            clientId,
        });
    }, []);

    const blockProps = useBlockProps({
        className: classnames(className, `eb-guten-block-main-parent-wrapper`),
    });

    const customCartButtonText = (productType) => {
        switch (productType) {
            case "external":
                return externalCartText;
            case "grouped":
                return groupedCartText;
            case "simple":
                return simpleCartText;
            case "variable":
                return variableCartText;
            default:
                return defaultCartText;
        }
    };

    const contentAlignmentClass =
        contentAlignment === "left" ? "flex-start" : contentAlignment === "right" ? "flex-end" : "center";

    // title typography
    const {
        typoStylesDesktop: titleTypoStylesDesktop,
        typoStylesTab: titleTypoStylesTab,
        typoStylesMobile: titleTypoStylesMobile,
    } = generateTypographyStyles({
        attributes,
        prefixConstant: typoPrefix_title,
    });

    /* TITLE SPACE/MARGIN */
    const {
        dimensionStylesDesktop: titleMarginDesktop,
        dimensionStylesTab: titleMarginTab,
        dimensionStylesMobile: titleMarginMobile,
    } = generateDimensionsControlStyles({
        controlName: TITLE_MARGIN,
        styleFor: "margin",
        attributes,
    });

    // price typography
    const {
        typoStylesDesktop: priceTypoStylesDesktop,
        typoStylesTab: priceTypoStylesTab,
        typoStylesMobile: priceTypoStylesMobile,
    } = generateTypographyStyles({
        attributes,
        prefixConstant: typoPrefix_price,
    });

    /* PRICE SPACE/MARGIN */
    const {
        dimensionStylesDesktop: priceMarginDesktop,
        dimensionStylesTab: priceMarginTab,
        dimensionStylesMobile: priceMarginMobile,
    } = generateDimensionsControlStyles({
        controlName: PRICE_MARGIN,
        styleFor: "margin",
        attributes,
    });

    // rating icon size
    const {
        rangeStylesDesktop: ratingIconSizeDesktop,
        rangeStylesTab: ratingIconSizeTab,
        rangeStylesMobile: ratingIconSizeMobile,
    } = generateResponsiveRangeStyles({
        controlName: RATING_ICON_SIZE,
        property: "font-size",
        attributes,
    });

    /* RATING SPACE/MARGIN */
    const {
        dimensionStylesDesktop: ratingMarginDesktop,
        dimensionStylesTab: ratingMarginTab,
        dimensionStylesMobile: ratingMarginMobile,
    } = generateDimensionsControlStyles({
        controlName: RATING_MARGIN,
        styleFor: "margin",
        attributes,
    });

    // btn border shadow
    const {
        styesDesktop: btnShadowStyesDesktop,
        styesTab: btnShadowStyesTab,
        styesMobile: btnShadowStyesMobile,
        stylesHoverDesktop: btnShadowStylesHoverDesktop,
        stylesHoverTab: btnShadowStylesHoverTab,
        stylesHoverMobile: btnShadowStylesHoverMobile,
        transitionStyle: btnShadowTransitionStyle,
    } = generateBorderShadowStyles({
        controlName: BTN_BORDER_SHADOW,
        attributes,
    });

    /* BUTTON SPACE/MARGIN */
    const {
        dimensionStylesDesktop: buttonMarginDesktop,
        dimensionStylesTab: buttonMarginTab,
        dimensionStylesMobile: buttonMarginMobile,
    } = generateDimensionsControlStyles({
        controlName: BUTTON_MARGIN,
        styleFor: "margin",
        attributes,
    });

    // sale typography
    const {
        typoStylesDesktop: saleTypoStylesDesktop,
        typoStylesTab: saleTypoStylesTab,
        typoStylesMobile: saleTypoStylesMobile,
    } = generateTypographyStyles({
        attributes,
        prefixConstant: typoPrefix_sale,
    });

    // sale badge border
    const {
        styesDesktop: saleShadowStyesDesktop,
        styesTab: saleShadowStyesTab,
        styesMobile: saleShadowStyesMobile,
    } = generateBorderShadowStyles({
        controlName: SALE_BADGE_BORDER,
        attributes,
    });

    /* Wrapper Margin */
    const {
        dimensionStylesDesktop: wrapperMarginDesktop,
        dimensionStylesTab: wrapperMarginTab,
        dimensionStylesMobile: wrapperMarginMobile,
    } = generateDimensionsControlStyles({
        controlName: WRAPPER_MARGIN,
        styleFor: "margin",
        attributes,
    });

    /* Wrapper Padding */
    const {
        dimensionStylesDesktop: wrapperPaddingDesktop,
        dimensionStylesTab: wrapperPaddingTab,
        dimensionStylesMobile: wrapperPaddingMobile,
    } = generateDimensionsControlStyles({
        controlName: WRAPPER_PADDING,
        styleFor: "padding",
        attributes,
    });

    const {
        styesDesktop: wrapperBDShadowDesktop,
        styesTab: wrapperBDShadowTab,
        styesMobile: wrapperBDShadowMobile,
        stylesHoverDesktop: wrapperBDShadowHoverDesktop,
        stylesHoverTab: wrapperBDShadowHoverTab,
        stylesHoverMobile: wrapperBDShadowHoverMobile,
        transitionStyle: wrapperBDShadowTransition,
    } = generateBorderShadowStyles({
        controlName: WRAPPER_BORDER_SHADOW,
        attributes,
    });

    //Generate Background
    const {
        backgroundStylesDesktop: wrapperBackgroundStylesDesktop,
        hoverBackgroundStylesDesktop: wrapperHoverBackgroundStylesDesktop,
        backgroundStylesTab: wrapperBackgroundStylesTab,
        hoverBackgroundStylesTab: wrapperHoverBackgroundStylesTab,
        backgroundStylesMobile: wrapperBackgroundStylesMobile,
        hoverBackgroundStylesMobile: wrapperHoverBackgroundStylesMobile,
        overlayStylesDesktop: wrapperOverlayStylesDesktop,
        hoverOverlayStylesDesktop: wrapperHoverOverlayStylesDesktop,
        overlayStylesTab: wrapperOverlayStylesTab,
        hoverOverlayStylesTab: wrapperHoverOverlayStylesTab,
        overlayStylesMobile: wrapperOverlayStylesMobile,
        hoverOverlayStylesMobile: wrapperHoverOverlayStylesMobile,
        bgTransitionStyle: wrapperBgTransitionStyle,
        ovlTransitionStyle: wrapperOvlTransitionStyle,
    } = generateBackgroundControlStyles({
        attributes,
        controlName: WRAPPER_BG,
    });

    /* content Padding */
    const {
        dimensionStylesDesktop: contentPaddingDesktop,
        dimensionStylesTab: contentPaddingTab,
        dimensionStylesMobile: contentPaddingMobile,
    } = generateDimensionsControlStyles({
        controlName: CONTENT_PADDING,
        styleFor: "padding",
        attributes,
    });

    /* image Padding */
    const {
        dimensionStylesDesktop: imagePaddingDesktop,
        dimensionStylesTab: imagePaddingTab,
        dimensionStylesMobile: imagePaddingMobile,
    } = generateDimensionsControlStyles({
        controlName: IMAGE_PADDING,
        styleFor: "padding",
        attributes,
    });

    const {
        styesDesktop: productBDShadowDesktop,
        styesTab: productBDShadowTab,
        styesMobile: productBDShadowMobile,
        stylesHoverDesktop: productBDShadowHoverDesktop,
        stylesHoverTab: productBDShadowHoverTab,
        stylesHoverMobile: productBDShadowHoverMobile,
        transitionStyle: productBDShadowTransition,
    } = generateBorderShadowStyles({
        controlName: PRODUCTS_BORDER_SHADOW,
        attributes,
    });

    // grid spacing
    const {
        rangeStylesDesktop: gridSpaceingDesktop,
        rangeStylesTab: gridSpaceingTab,
        rangeStylesMobile: gridSpaceingMobile,
    } = generateResponsiveRangeStyles({
        controlName: GRID_SPACING,
        property: "",
        attributes,
    });

    // colomns
    const {
        rangeStylesDesktop: columnNumberDesktop,
        rangeStylesTab: columnNumberTab,
        rangeStylesMobile: columnNumberMobile,
    } = generateResponsiveRangeStyles({
        controlName: COLUMNS,
        property: "",
        attributes,
    });

    // sale typography
    const {
        typoStylesDesktop: descTypoStylesDesktop,
        typoStylesTab: descTypoStylesTab,
        typoStylesMobile: descTypoStylesMobile,
    } = generateTypographyStyles({
        attributes,
        prefixConstant: typoPrefix_desc,
    });

    /* DESC SPACE/MARGIN */
    const {
        dimensionStylesDesktop: descMarginDesktop,
        dimensionStylesTab: descMarginTab,
        dimensionStylesMobile: descMarginMobile,
    } = generateDimensionsControlStyles({
        controlName: DESC_MARGIN,
        styleFor: "margin",
        attributes,
    });

    // image gap
    const {
        rangeStylesDesktop: listImgSpaceDesktop,
        rangeStylesTab: listImgSpaceTab,
        rangeStylesMobile: listImgSpaceMobile,
    } = generateResponsiveRangeStyles({
        controlName: IMG_GAP,
        property: "margin-right",
        attributes,
    });

    // image height
    const {
        rangeStylesDesktop: imageHeightDesktop,
        rangeStylesTab: imageHeightTab,
        rangeStylesMobile: imageHeightMobile,
    } = generateResponsiveRangeStyles({
        controlName: IMG_HEIGHT,
        property: "height",
        attributes,
    });

    // image width
    const {
        rangeStylesDesktop: imageWidthDesktop,
        rangeStylesTab: imageWidthTab,
        rangeStylesMobile: imageWidthMobile,
    } = generateResponsiveRangeStyles({
        controlName: IMG_WIDTH,
        property: "width",
        attributes,
    });

    // button typography
    const {
        typoStylesDesktop: btnTypoStylesDesktop,
        typoStylesTab: btnTypoStylesTab,
        typoStylesMobile: btnTypoStylesMobile,
    } = generateTypographyStyles({
        attributes,
        prefixConstant: typoPrefix_btn,
    });

    //image border & shadow
    const {
        styesDesktop: imgBDShadowDesktop,
        styesTab: imgBDShadowTab,
        styesMobile: imgBDShadowMobile,
        stylesHoverDesktop: imgBDShadowHoverDesktop,
        stylesHoverTab: imgBDShadowHoverTab,
        stylesHoverMobile: imgBDShadowHoverMobile,
        transitionStyle: imgBDShadowTransition,
    } = generateBorderShadowStyles({
        controlName: IMAGE_BORDER_SHADOW,
        attributes,
    });

    //Load More Controls
    const {
        dimensionStylesDesktop: loadMorePaddingDesktop,
        dimensionStylesTab: loadMorePaddingTab,
        dimensionStylesMobile: loadMorePaddingMobile,
    } = generateDimensionsControlStyles({
        controlName: LOADMORE_PADDING,
        styleFor: "padding",
        attributes,
    });

    const {
        dimensionStylesDesktop: loadMoreMarginDesktop,
        dimensionStylesTab: loadMoreMarginTab,
        dimensionStylesMobile: loadMoreMarginMobile,
    } = generateDimensionsControlStyles({
        controlName: LOADMORE_MARGIN,
        styleFor: "margin",
        attributes,
    });

    const {
        typoStylesDesktop: loadmoreTypoStylesDesktop,
        typoStylesTab: loadmoreTypoStylesTab,
        typoStylesMobile: loadmoreTypoStylesMobile,
    } = generateTypographyStyles({
        attributes,
        prefixConstant: EBWG_LOAD_MORE_TYPOGRAPHY,
        defaultFontSize: 14,
    });

    const {
        styesDesktop: loadMoreBDShadowDesktop,
        styesTab: loadMoreBDShadowTab,
        styesMobile: loadMoreBDShadowMobile,
        stylesHoverDesktop: loadMoreBDShadowHoverDesktop,
        stylesHoverTab: loadMoreBDShadowHoverTab,
        stylesHoverMobile: loadMoreBDShadowHoverMobile,
        transitionStyle: loadMoreBDShadowTransition,
    } = generateBorderShadowStyles({
        controlName: LOADMORE_BORDER_SHADOW,
        attributes,
        noShadow: true,
    });

    const desktopStyles = `
		.eb-woo-products-wrapper.${blockId} {
			${wrapperMarginDesktop}
			${wrapperPaddingDesktop}
			${wrapperBDShadowDesktop}
			${wrapperBackgroundStylesDesktop}
			${wrapperBDShadowDesktop.trim().length > 0 ? `overflow: hidden;` : ""}
			transition: ${wrapperBDShadowTransition}, ${wrapperBgTransitionStyle};
		}

		.eb-woo-products-wrapper.${blockId}:hover {
			${wrapperBDShadowHoverDesktop}
			${wrapperHoverBackgroundStylesDesktop}
		}

		.eb-woo-products-wrapper.${blockId}:before{
			${wrapperOverlayStylesDesktop}
			transition:${wrapperOvlTransitionStyle};
		}

		.eb-woo-products-wrapper.${blockId}:hover:before{
			${wrapperHoverOverlayStylesDesktop}
		}

		.eb-woo-products-wrapper.${blockId} .eb-woo-products-gallery .eb-woo-product .eb-woo-product-content-wrapper .eb-woo-product-content {
			${contentPaddingDesktop}
			align-items: ${contentAlignmentClass};
			text-align: ${contentAlignment};
		}

		.eb-woo-products-wrapper.${blockId} .eb-woo-products-gallery.grid-preset-1 .eb-woo-products-col,
		.eb-woo-products-wrapper.${blockId} .eb-woo-products-gallery.grid-preset-2 .eb-woo-products-col,
		.eb-woo-products-wrapper.${blockId} .eb-woo-products-gallery.grid-preset-3 .eb-woo-products-col {
			flex: 0 0 ${100 / columnNumberDesktop.replace(/\D/g, "")}%;
			max-width: ${100 / columnNumberDesktop.replace(/\D/g, "")}%;
		}

		.eb-woo-products-wrapper.${blockId} .eb-woo-products-gallery .eb-woo-product-content .eb-woo-product-title,
		.eb-woo-products-wrapper.${blockId} .eb-woo-products-gallery .eb-woo-product-content .eb-woo-product-title a {
			${titleTypoStylesDesktop}
			${titleMarginDesktop}
			${titleColor ? `color: ${titleColor};` : ""}
		}

		.eb-woo-products-wrapper.${blockId} .eb-woo-products-gallery .eb-woo-product-content .eb-woo-product-title:hover,
		.eb-woo-products-wrapper.${blockId} .eb-woo-products-gallery .eb-woo-product-content .eb-woo-product-title:hover a {
			${titleHoverColor ? `color: ${titleHoverColor};` : ""}
		}

		.eb-woo-products-wrapper.${blockId} .eb-woo-products-gallery .eb-woo-product-content-wrapper .eb-woo-product-content .eb-woo-product-price {
			${priceTypoStylesDesktop}
			${priceMarginDesktop}
			${priceColor ? `color: ${priceColor};` : ""}
		}

		.eb-woo-products-wrapper.${blockId} .eb-woo-products-gallery .eb-woo-product-content .eb-woo-product-price ins {
			${salePriceColor ? `color: ${salePriceColor};` : ""}
		}

		.eb-woo-products-wrapper.${blockId} .eb-woo-products-gallery .eb-woo-product-content-wrapper .eb-woo-product-content .eb-woo-product-rating-wrapper {
			${ratingMarginDesktop}
		}

		.eb-woo-products-wrapper.${blockId} .eb-woo-products-gallery .eb-woo-product-content-wrapper .eb-woo-product-content .eb-woo-product-rating-wrapper .eb-woo-product-rating {
			${ratingIconSizeDesktop}
			${ratingColor ? `color: ${ratingColor};` : ""}
		}

		.eb-woo-products-wrapper.${blockId} .eb-woo-products-gallery .eb-woo-product .eb-woo-product-overlay .eb-woo-product-button-list a.button,.eb-woo-products-wrapper.${blockId} .eb-woo-products-gallery .eb-woo-product .eb-woo-product-overlay .eb-woo-product-button-list a.added_to_cart, .eb-woo-products-wrapper.${blockId} .eb-woo-products-gallery .eb-woo-product .eb-woo-product-button-list a.button, .eb-woo-products-wrapper.${blockId} .eb-woo-products-gallery .eb-woo-product .eb-woo-product-button-list a.added_to_cart {
			${btnShadowStyesDesktop}
			${buttonMarginDesktop}
			${btnTypoStylesDesktop}
			${btnColor ? `color: ${btnColor};` : ""}
			${btnBackgroundColor ? `background: ${btnBackgroundColor};` : ""}
			transition: all 0.3s, ${btnShadowTransitionStyle};
		}
		${
            gridPreset !== "grid-preset-3"
                ? `.eb-woo-products-wrapper.${blockId} .eb-woo-products-gallery .eb-woo-product .eb-woo-product-overlay .eb-woo-product-button-list a.button:hover,.eb-woo-products-wrapper.${blockId} .eb-woo-products-gallery .eb-woo-product .eb-woo-product-overlay .eb-woo-product-button-list a.added_to_cart:hover, .eb-woo-products-wrapper.${blockId} .eb-woo-products-gallery .eb-woo-product  .eb-woo-product-button-list a.button:hover,.eb-woo-products-wrapper.${blockId} .eb-woo-products-gallery .eb-woo-product  .eb-woo-product-button-list a.added_to_cart:hover {
			${btnShadowStylesHoverDesktop}
			${btnHoverColor ? `color: ${btnHoverColor};` : ""}
			${btnBackgroundHoverColor ? `background: ${btnBackgroundHoverColor};` : ""}
		}`
                : ""
        }


		.eb-woo-products-wrapper.${blockId} .eb-woo-products-gallery.grid-preset-3 .eb-woo-product .eb-woo-product-overlay .eb-woo-product-button-list a.button:hover, .eb-woo-products-wrapper.${blockId} .eb-woo-products-gallery.grid-preset-3 .eb-woo-product .eb-woo-product-overlay .eb-woo-product-button-list a.added_to_cart:hover {
			${btnShadowStylesHoverDesktop}
			${btnHoverColor ? `color: ${btnHoverColor};` : ""}
			${btnBackgroundHoverColor ? `background: ${btnBackgroundHoverColor};` : ""}
		}

		.eb-woo-products-wrapper.${blockId} .eb-woo-products-gallery .eb-woo-product .eb-woo-product-image .eb-woo-product-ribbon {
			${saleTypoStylesDesktop}
			${saleShadowStyesDesktop}
			${saleTextColor ? `color: ${saleTextColor};` : ""}
			${saleTextBackgroundColor ? `background: ${saleTextBackgroundColor};` : ""}
		}

		.eb-woo-products-wrapper.${blockId} .eb-woo-products-gallery .eb-woo-product .eb-woo-product-content-wrapper,
		.eb-woo-products-wrapper.${blockId} .eb-woo-products-gallery.list-preset-1 .eb-woo-product .eb-woo-product-content-wrapper {
			${contentBackgroundColor ? `background: ${contentBackgroundColor};` : ""}
		}

		${
            backgroundOverlayColor
                ? `
		.eb-woo-products-wrapper.${blockId} .eb-woo-products-gallery.grid-preset-3 .eb-woo-product .eb-woo-product-content-wrapper {
			background: ${backgroundOverlayColor};
		}`
                : ""
        }

		.eb-woo-products-wrapper.${blockId} .eb-woo-products-gallery .eb-woo-product .eb-woo-product-image-wrapper .eb-woo-product-image {
			${imageBackgroundColor ? `background-color: ${imageBackgroundColor};` : ""}
			${imagePaddingDesktop}
			${"grid-preset-3" !== gridPreset ? imgBDShadowDesktop : ""}
			transition: ${imgBDShadowTransition};
			overflow: hidden;
		}

		.eb-woo-products-wrapper.${blockId} .eb-woo-products-gallery .eb-woo-product .eb-woo-product-image-wrapper .eb-woo-product-image:hover {
			${"grid-preset-3" !== gridPreset ? imgBDShadowHoverDesktop : ""}
		}

		${
            "grid" === layout &&
            "grid-preset-3" === gridPreset &&
            `.eb-woo-products-wrapper.${blockId} .eb-woo-products-gallery.grid-preset-3 .eb-woo-product {
			${imgBDShadowDesktop}
			transition: ${imgBDShadowTransition};
			overflow: hidden;
		}
		.eb-woo-products-wrapper.${blockId} .eb-woo-products-gallery.grid-preset-3 .eb-woo-product:hover {
			${imgBDShadowHoverDesktop}
		}`
        }

		.eb-woo-products-wrapper.${blockId} .eb-woo-products-gallery .eb-woo-product .eb-woo-product-image-wrapper .eb-woo-product-image a:after {
			background: ${imageOverlayColor}
		}

		.eb-woo-products-wrapper.${blockId} .eb-woo-products-gallery .eb-woo-product .eb-woo-product-image-wrapper .eb-woo-product-image {
			${imageWidthDesktop}
			${autoHeight ? `height: auto;` : imageHeightDesktop}
		}

		.eb-woo-products-wrapper.${blockId} .eb-woo-products-gallery.list-preset-1 .eb-woo-product .eb-woo-product-image-wrapper .eb-woo-product-image {
			${imageWidthDesktop}
			${autoHeight || imageHeightDesktop === "" ? `height: 100%;` : imageHeightDesktop}
		}

		.eb-woo-products-wrapper.${blockId} .eb-woo-products-gallery .eb-woo-product {
			${productBDShadowDesktop}
			${productBDShadowDesktop.trim().length > 0 ? `overflow: hidden;` : ""}
			transition: ${productBDShadowTransition};
		}

		.eb-woo-products-wrapper.${blockId} .eb-woo-products-gallery .eb-woo-product:hover {
			${productBDShadowHoverDesktop}
		}

		.eb-woo-products-wrapper.${blockId} .eb-woo-products-gallery {
			margin-left: -${gridSpaceingDesktop.replace(/\D/g, "") / 2}px;
			margin-right: -${gridSpaceingDesktop.replace(/\D/g, "") / 2}px;
			margin-bottom: -${gridSpaceingDesktop.replace(/\D/g, "")}px;
		}

		.eb-woo-products-wrapper.${blockId} .eb-woo-products-gallery.grid-preset-1 .eb-woo-products-col, .eb-woo-products-wrapper.${blockId} .eb-woo-products-gallery.grid-preset-2 .eb-woo-products-col,
		.eb-woo-products-wrapper.${blockId} .eb-woo-products-gallery.grid-preset-3 .eb-woo-products-col {
			padding-left: ${gridSpaceingDesktop.replace(/\D/g, "") / 2}px;
			padding-right: ${gridSpaceingDesktop.replace(/\D/g, "") / 2}px;
			margin-bottom: ${gridSpaceingDesktop.replace(/\D/g, "")}px;
		}

		.eb-woo-products-wrapper.${blockId} .eb-woo-products-gallery.list-preset-1 .eb-woo-products-col {
			margin-bottom: ${gridSpaceingDesktop.replace(/\D/g, "")}px;
		}

		.eb-woo-products-wrapper.${blockId} .eb-woo-products-gallery.list-preset-1 .eb-woo-product .eb-woo-product-content-wrapper .eb-woo-product-content .eb-woo-product-details {
			${descTypoStylesDesktop}
			${descMarginDesktop}
			${descColor ? `color: ${descColor};` : ""}
		}

		.eb-woo-products-wrapper.${blockId} .eb-woo-products-gallery.list-preset-1 .eb-woo-product-image-wrapper {
			${listImgSpaceDesktop}
		}

		.eb-woo-products-wrapper.${blockId} .ebpg-pagination {
			text-align: ${loadMoreOptions ? loadMoreOptions.alignment : "center"};
		}
		.eb-woo-products-wrapper.${blockId} .ebpg-pagination button {
			color: ${loadMoreColor};
			background-color: ${loadMoreBgColor};
			${loadMorePaddingDesktop}
			${loadMoreMarginDesktop}
			${loadmoreTypoStylesDesktop}
			${loadMoreBDShadowDesktop}
			transition: ${loadMoreBDShadowTransition};
		}
		.eb-woo-products-wrapper.${blockId} .ebpg-pagination button:hover {
			color: ${loadMoreHoverColor};
			background-color: ${loadMoreHoverBgColor};
			${loadMoreBDShadowHoverDesktop}
		}
		.eb-woo-products-wrapper.${blockId} .ebpg-pagination button.ebpg-pagination-item.active {
			color: ${loadMoreActiveColor};
			background-color: ${loadMoreActiveBgColor};
		}
	`;

    const tabStyles = `
		.eb-woo-products-wrapper.${blockId} {
			${wrapperMarginTab}
			${wrapperPaddingTab}
			${wrapperBDShadowTab}
			${wrapperBackgroundStylesTab}
		}

		.eb-woo-products-wrapper.${blockId}:hover {
			${wrapperBDShadowHoverTab}
			${wrapperHoverBackgroundStylesTab}
		}

		.eb-woo-products-wrapper.${blockId}:before{
			${wrapperOverlayStylesTab}
		}

		.eb-woo-products-wrapper.${blockId}:hover:before{
			${wrapperHoverOverlayStylesTab}
		}

		.eb-woo-products-wrapper.${blockId} .ebpg-pagination button {
			${loadMorePaddingTab}
			${loadMoreMarginTab}
			${loadmoreTypoStylesTab}
			${loadMoreBDShadowTab}
		}

		.eb-woo-products-wrapper.${blockId} .ebpg-pagination button:hover {
			${loadMoreBDShadowHoverTab}
		}

		.eb-woo-products-wrapper.${blockId} .eb-woo-products-gallery {
			margin-left: -${gridSpaceingTab.replace(/\D/g, "") / 2}px;
			margin-right: -${gridSpaceingTab.replace(/\D/g, "") / 2}px;
			margin-bottom: -${gridSpaceingTab.replace(/\D/g, "")}px;
		}

		.eb-woo-products-wrapper.${blockId} .eb-woo-products-gallery.grid-preset-1 .eb-woo-products-col,
		.eb-woo-products-wrapper.${blockId} .eb-woo-products-gallery.grid-preset-2 .eb-woo-products-col,
		.eb-woo-products-wrapper.${blockId} .eb-woo-products-gallery.grid-preset-3 .eb-woo-products-col {
			flex: 0 0 ${100 / columnNumberTab.replace(/\D/g, "")}%;
			max-width: ${100 / columnNumberTab.replace(/\D/g, "")}%;
		}

		.eb-woo-products-wrapper.${blockId} .eb-woo-products-gallery .eb-woo-product-content .eb-woo-product-title,
		.eb-woo-products-wrapper.${blockId} .eb-woo-products-gallery .eb-woo-product-content .eb-woo-product-title a {
			${titleTypoStylesTab}
			${titleMarginTab}
		}

		.eb-woo-products-wrapper.${blockId} .eb-woo-products-gallery .eb-woo-product-content .eb-woo-product-price {
			${priceTypoStylesTab}
			${priceMarginTab}
		}

		.eb-woo-products-wrapper.${blockId} .eb-woo-products-gallery .eb-woo-product-content .eb-woo-product-rating-wrapper {
			${ratingMarginTab}
		}

		.eb-woo-products-wrapper.${blockId} .eb-woo-products-gallery .eb-woo-product-content .eb-woo-product-rating-wrapper .eb-woo-product-rating {
			${ratingIconSizeTab}
		}

		.eb-woo-products-wrapper.${blockId} .eb-woo-products-gallery .eb-woo-product .eb-woo-product-content-wrapper .eb-woo-product-content {
			${contentPaddingTab}
		}

		.eb-woo-products-wrapper.${blockId} .eb-woo-products-gallery .eb-woo-product-overlay .eb-woo-product-button-list a.button, .eb-woo-products-wrapper.${blockId} .eb-woo-products-gallery .eb-woo-product-button-list a.button {
			${btnShadowStyesTab}
			${buttonMarginTab}
			${btnTypoStylesTab}
		}

		.eb-woo-products-wrapper.${blockId} .eb-woo-products-gallery .eb-woo-product-overlay .eb-woo-product-button-list a.button:hover, .eb-woo-products-wrapper.${blockId} .eb-woo-products-gallery  .eb-woo-product-button-list a.button:hover {
			${btnShadowStylesHoverTab}
		}

		.eb-woo-products-wrapper.${blockId} .eb-woo-products-gallery .eb-woo-product .eb-woo-product-image .eb-woo-product-ribbon {
			${saleShadowStyesTab}
			${saleTypoStylesTab}
		}

		.eb-woo-products-wrapper.${blockId} .eb-woo-products-gallery .eb-woo-product {
			${productBDShadowTab}
		}

		.eb-woo-products-wrapper.${blockId} .eb-woo-products-gallery .eb-woo-product:hover {
			${productBDShadowHoverTab}
		}

		.eb-woo-products-wrapper.${blockId} .eb-woo-products-gallery .eb-woo-product .eb-woo-product-image-wrapper .eb-woo-product-image {
			${imagePaddingTab}
			${"grid-preset-3" !== gridPreset ? imgBDShadowTab : ""}
		}

		.eb-woo-products-wrapper.${blockId} .eb-woo-products-gallery .eb-woo-product .eb-woo-product-image-wrapper .eb-woo-product-image:hover {
			${"grid-preset-3" !== gridPreset ? imgBDShadowHoverTab : ""}
		}

		${
            "grid" === layout &&
            "grid-preset-3" === gridPreset &&
            `.eb-woo-products-wrapper.${blockId} .eb-woo-products-gallery.grid-preset-3 .eb-woo-product {
			${imgBDShadowTab}
		}
		.eb-woo-products-wrapper.${blockId} .eb-woo-products-gallery.grid-preset-3 .eb-woo-product:hover {
			${imgBDShadowHoverTab}
		}`
        }

		.eb-woo-products-wrapper.${blockId} .eb-woo-products-gallery .eb-woo-product .eb-woo-product-image-wrapper .eb-woo-product-image img {
			${imageWidthTab}
			${imageHeightTab}
		}

		.eb-woo-products-wrapper.${blockId} .eb-woo-products-gallery {
			margin-left: -${gridSpaceingTab.replace(/\D/g, "") / 2}px;
			margin-right: -${gridSpaceingTab.replace(/\D/g, "") / 2}px;
		}

		.eb-woo-products-wrapper.${blockId} .eb-woo-products-gallery.grid-preset-1 .eb-woo-products-col, .eb-woo-products-wrapper.${blockId} .eb-woo-products-gallery.grid-preset-2 .eb-woo-products-col,
		.eb-woo-products-wrapper.${blockId} .eb-woo-products-gallery.grid-preset-3 .eb-woo-products-col {
			padding-left: ${gridSpaceingTab.replace(/\D/g, "") / 2}px;
			padding-right: ${gridSpaceingTab.replace(/\D/g, "") / 2}px;
			margin-bottom: ${gridSpaceingTab.replace(/\D/g, "")}px;
		}

		.eb-woo-products-wrapper.${blockId} .eb-woo-products-gallery.list-preset-1 .eb-woo-products-col {
			margin-bottom: ${gridSpaceingTab.replace(/\D/g, "")}px;
		}

		.eb-woo-products-wrapper.${blockId} .eb-woo-products-gallery.list-preset-1 .eb-woo-product .eb-woo-product-content-wrapper .eb-woo-product-content .eb-woo-product-details {
			${descTypoStylesTab}
			${descMarginTab}
		}

		.eb-woo-products-wrapper.${blockId} .eb-woo-products-gallery.list-preset-1 .eb-woo-product-image-wrapper {
			${listImgSpaceTab}
		}
	`;

    const mobileStyles = `
		.eb-woo-products-wrapper.${blockId} {
			${wrapperMarginMobile}
			${wrapperPaddingMobile}
			${wrapperBDShadowMobile}
			${wrapperBackgroundStylesMobile}
		}

		.eb-woo-products-wrapper.${blockId}:hover {
			${wrapperBDShadowHoverMobile}
			${wrapperHoverBackgroundStylesMobile}
		}

		.eb-woo-products-wrapper.${blockId}:before{
			${wrapperOverlayStylesMobile}
		}

		.eb-woo-products-wrapper.${blockId}:hover:before{
			${wrapperHoverOverlayStylesMobile}
		}

		.eb-woo-products-wrapper.${blockId} .ebpg-pagination button {
			${loadMorePaddingMobile}
			${loadMoreMarginMobile}
			${loadmoreTypoStylesMobile}
			${loadMoreBDShadowMobile}
		}

		.eb-woo-products-wrapper.${blockId} .ebpg-pagination button:hover {
			${loadMoreBDShadowHoverMobile}
		}

		.eb-woo-products-wrapper.${blockId} .eb-woo-products-gallery {
			margin-left: -${gridSpaceingMobile.replace(/\D/g, "") / 2}px;
			margin-right: -${gridSpaceingMobile.replace(/\D/g, "") / 2}px;
			margin-bottom: -${gridSpaceingMobile.replace(/\D/g, "")}px;
		}

		.eb-woo-products-wrapper.${blockId} .eb-woo-products-gallery.grid-preset-1 .eb-woo-products-col,
		.eb-woo-products-wrapper.${blockId} .eb-woo-products-gallery.grid-preset-2 .eb-woo-products-col,
		.eb-woo-products-wrapper.${blockId} .eb-woo-products-gallery.grid-preset-3 .eb-woo-products-col {
			flex: 0 0 ${100 / columnNumberMobile.replace(/\D/g, "")}%;
			max-width: ${100 / columnNumberMobile.replace(/\D/g, "")}%;
		}

		.eb-woo-products-wrapper.${blockId} .eb-woo-products-gallery .eb-woo-product-content .eb-woo-product-title,
		.eb-woo-products-wrapper.${blockId} .eb-woo-products-gallery .eb-woo-product-content .eb-woo-product-title a {
			${titleTypoStylesMobile}
			${titleMarginMobile}
		}

		.eb-woo-products-wrapper.${blockId} .eb-woo-products-gallery .eb-woo-product-content .eb-woo-product-price {
			${priceTypoStylesMobile}
			${priceMarginMobile}
		}

		.eb-woo-products-wrapper.${blockId} .eb-woo-products-gallery .eb-woo-product-content .eb-woo-product-rating-wrapper {
			${ratingMarginMobile}
		}

		.eb-woo-products-wrapper.${blockId} .eb-woo-products-gallery .eb-woo-product-content .eb-woo-product-rating-wrapper .eb-woo-product-rating {
			${ratingIconSizeMobile}
		}

		.eb-woo-products-wrapper.${blockId} .eb-woo-products-gallery .eb-woo-product .eb-woo-product-content-wrapper .eb-woo-product-content {
			${contentPaddingMobile}
		}

		.eb-woo-products-wrapper.${blockId} .eb-woo-products-gallery .eb-woo-product-overlay .eb-woo-product-button-list a.button, .eb-woo-products-wrapper.${blockId} .eb-woo-products-gallery .eb-woo-product-button-list a.button {
			${btnShadowStyesMobile}
			${buttonMarginMobile}
			${btnTypoStylesMobile}
		}

		.eb-woo-products-wrapper.${blockId} .eb-woo-products-gallery .eb-woo-product-overlay .eb-woo-product-button-list a.button:hover, .eb-woo-products-wrapper.${blockId} .eb-woo-products-gallery  .eb-woo-product-button-list a.button:hover {
			${btnShadowStylesHoverMobile}
		}

		.eb-woo-products-wrapper.${blockId} .eb-woo-products-gallery .eb-woo-product .eb-woo-product-image .eb-woo-product-ribbon {
			${saleShadowStyesMobile}
			${saleTypoStylesMobile}
		}

		.eb-woo-products-wrapper.${blockId} .eb-woo-products-gallery .eb-woo-product {
			${productBDShadowMobile}
		}

		.eb-woo-products-wrapper.${blockId} .eb-woo-products-gallery .eb-woo-product:hover {
			${productBDShadowHoverMobile}
		}

		.eb-woo-products-wrapper.${blockId} .eb-woo-products-gallery .eb-woo-product .eb-woo-product-image-wrapper .eb-woo-product-image {
			${imagePaddingMobile}
			${"grid-preset-3" !== gridPreset ? imgBDShadowMobile : ""}
		}

		.eb-woo-products-wrapper.${blockId} .eb-woo-products-gallery .eb-woo-product .eb-woo-product-image-wrapper .eb-woo-product-image:hover {
			${"grid-preset-3" !== gridPreset ? imgBDShadowHoverMobile : ""}
		}

		${
            "grid" === layout &&
            "grid-preset-3" === gridPreset &&
            `.eb-woo-products-wrapper.${blockId} .eb-woo-products-gallery.grid-preset-3 .eb-woo-product {
			${imgBDShadowMobile}
		}
		.eb-woo-products-wrapper.${blockId} .eb-woo-products-gallery.grid-preset-3 .eb-woo-product:hover {
			${imgBDShadowHoverMobile}
		}`
        }

		.eb-woo-products-wrapper.${blockId} .eb-woo-products-gallery .eb-woo-product .eb-woo-product-image-wrapper .eb-woo-product-image img {
			${imageWidthMobile}
			${imageHeightMobile}
		}

		.eb-woo-products-wrapper.${blockId} .eb-woo-products-gallery.grid-preset-1 .eb-woo-products-col, .eb-woo-products-wrapper.${blockId} .eb-woo-products-gallery.grid-preset-2 .eb-woo-products-col {
			padding-left: ${gridSpaceingMobile.replace(/\D/g, "") / 2}px;
			padding-right: ${gridSpaceingMobile.replace(/\D/g, "") / 2}px;
			margin-bottom: ${gridSpaceingMobile.replace(/\D/g, "")}px;
		}

		.eb-woo-products-wrapper.${blockId} .eb-woo-products-gallery.list-preset-1 .eb-woo-products-col {
			margin-bottom: ${gridSpaceingMobile.replace(/\D/g, "")}px;
		}

		.eb-woo-products-wrapper.${blockId} .eb-woo-products-gallery.list-preset-1 .eb-woo-product .eb-woo-product-content-wrapper .eb-woo-product-content .eb-woo-product-details {
			${descTypoStylesMobile}
			${descMarginMobile}
		}

		.eb-woo-products-wrapper.${blockId} .eb-woo-products-gallery.list-preset-1 .eb-woo-product-image-wrapper {
			${listImgSpaceMobile}
		}
	`;

    // all css styles for large screen width (desktop/laptop) in strings ⬇
    const desktopAllStyles = softMinifyCssStrings(`${desktopStyles}`);

    // all css styles for Tab in strings ⬇
    const tabAllStyles = softMinifyCssStrings(`${tabStyles}`);

    // all css styles for Mobile in strings ⬇
    const mobileAllStyles = softMinifyCssStrings(`${mobileStyles}`);
    // Set All Style in "blockMeta" Attribute
    useEffect(() => {
        const styleObject = {
            desktop: desktopAllStyles,
            tab: tabAllStyles,
            mobile: mobileAllStyles,
        };
        if (JSON.stringify(blockMeta) != JSON.stringify(styleObject)) {
            setAttributes({ blockMeta: styleObject });
        }
    }, [attributes]);

    const ratingHtml = (rating) => {
        let html = "";
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                html += `<span class="eb-woo-product-rating filled"><i class="fas fa-star"></i></span>`;
            } else {
                html += `<span class="eb-woo-product-rating"><i class="far fa-star"></i></span>`;
            }
        }
        return html;
    };

    const paginationLinks = (options, perPage) => {
        const totalPages = Math.floor(options.totalPosts / perPage);
        let html = "";
        html += `<button class="ebpg-pagination-item-previous">${options.prevTxt}</button>`;
        for (let i = 1; i <= totalPages; i++) {
            if (i === 1) {
                html += `<button class="ebpg-pagination-item active">${i}</button>`;
            } else if (i <= 3) {
                html += `<button class="ebpg-pagination-item">${i}</button>`;
            } else if (i === totalPages) {
                html += '<button class="ebpg-pagination-item-separator">...</button>';
                html += `<button class="ebpg-pagination-item">${i}</button>`;
            } else {
                html += "";
            }
        }
        html += `<button class="ebpg-pagination-item-next">${options.nextTxt}</button>`;
        return html;
    };

    const presetClass = "grid" === layout ? gridPreset : listPreset;

    return cover.length ? (
        <div>
            <img src={cover} alt="woo product grid" style={{ maxWidth: "100%" }} />
        </div>
    ) : (
        <>
            {isSelected && <Inspector attributes={attributes} setAttributes={setAttributes} />}

            <WoocommerceQuery
                isEdit={true}
                title={"Product Query"}
                initialOpen={false}
                queryData={queryData}
                queryResults={queryResults}
                setAttributes={setAttributes}
            />
            <div {...blockProps}>
                {!is_woocommerce_active && (
                    <div>
                        <strong>WooCommerce</strong> is not installed/activated on your site. Please install and
                        activate{" "}
                        <a
                            href={
                                EssentialBlocksLocalize.eb_admin_url +
                                `plugin-install.php?s=woocommerce&tab=search&type=term`
                            }
                            target="_blank"
                        >
                            WooCommerce
                        </a>{" "}
                        first.
                    </div>
                )}
                {is_woocommerce_active && (
                    <>
                        <style>
                            {`
				   ${desktopAllStyles}

				   /* mimmikcssStart */

				   ${resOption === "Tablet" ? tabAllStyles : " "}
				   ${resOption === "Mobile" ? tabAllStyles + mobileAllStyles : " "}

				   /* mimmikcssEnd */

				   @media all and (max-width: 1024px) {

					   /* tabcssStart */
					   ${softMinifyCssStrings(tabAllStyles)}
					   /* tabcssEnd */

				   }

				   @media all and (max-width: 767px) {

					   /* mobcssStart */
					   ${softMinifyCssStrings(mobileAllStyles)}
					   /* mobcssEnd */

				   }
				   `}
                        </style>
                        <div className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`}>
                            <div className={`eb-woo-products-wrapper ${blockId}`} data-id={blockId}>
                                <div className={`eb-woo-products-gallery ${presetClass}`}>
                                    {typeof queryResults === "object" &&
                                        queryResults.length > 0 &&
                                        queryResults.map((item, index) => (
                                            <div className="eb-woo-products-col" key={index}>
                                                <div className="eb-woo-product">
                                                    <div className="eb-woo-product-image-wrapper">
                                                        <div className="eb-woo-product-image">
                                                            {item.image ? (
                                                                <a href="#">
                                                                    <img src={item.image["large"]} />
                                                                </a>
                                                            ) : (
                                                                <a href="#">
                                                                    <img
                                                                        src={EssentialBlocksLocalize?.placeholder_image}
                                                                        alt="No preview available"
                                                                    />
                                                                </a>
                                                            )}
                                                            {showSaleBadge && item.sale && (
                                                                <span
                                                                    className={`eb-woo-product-ribbon ${saleBadgeAlign}`}
                                                                >
                                                                    {saleText}
                                                                </span>
                                                            )}
                                                        </div>
                                                        {layout === "grid" && (
                                                            <div className="eb-woo-product-overlay">
                                                                <div className="eb-woo-product-button-list">
                                                                    <a className="eb-woo-product-button button">
                                                                        {isCustomCartBtn
                                                                            ? customCartButtonText(item.type)
                                                                            : item.add_to_cart_text}
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                    {layout === "grid" && (
                                                        <div
                                                            className="eb-woo-product-content-wrapper"
                                                            data-rating={Math.round(item.rating_average)}
                                                        >
                                                            <div className="eb-woo-product-content">
                                                                {showRating && item.rating_average && (
                                                                    <div
                                                                        className="eb-woo-product-rating-wrapper"
                                                                        dangerouslySetInnerHTML={{
                                                                            __html: ratingHtml(
                                                                                parseInt(item.rating_average)
                                                                            ),
                                                                        }}
                                                                    ></div>
                                                                )}

                                                                <h3
                                                                    className="eb-woo-product-title"
                                                                    dangerouslySetInnerHTML={{
                                                                        __html: item.title,
                                                                    }}
                                                                ></h3>
                                                                {showPrice && (
                                                                    <p
                                                                        className="eb-woo-product-price"
                                                                        dangerouslySetInnerHTML={{
                                                                            __html: item.price_html,
                                                                        }}
                                                                    ></p>
                                                                )}
                                                            </div>
                                                        </div>
                                                    )}

                                                    {layout === "list" && (
                                                        <div
                                                            className="eb-woo-product-content-wrapper"
                                                            data-rating={Math.round(item.rating_average)}
                                                        >
                                                            <div className="eb-woo-product-content">
                                                                <h3
                                                                    className="eb-woo-product-title"
                                                                    dangerouslySetInnerHTML={{
                                                                        __html: item.title,
                                                                    }}
                                                                ></h3>
                                                                {showPrice && (
                                                                    <p
                                                                        className="eb-woo-product-price"
                                                                        dangerouslySetInnerHTML={{
                                                                            __html: item.price_html,
                                                                        }}
                                                                    ></p>
                                                                )}
                                                                {showRating && item.rating_average && (
                                                                    <div
                                                                        className="eb-woo-product-rating-wrapper"
                                                                        dangerouslySetInnerHTML={{
                                                                            __html: ratingHtml(
                                                                                parseInt(item.rating_average)
                                                                            ),
                                                                        }}
                                                                    ></div>
                                                                )}
                                                                <p className="eb-woo-product-details">
                                                                    {/* {item.excerpt.substring(0, 65)} */}
                                                                    {item.excerpt
                                                                        .split(" ")
                                                                        .slice(0, Math.abs(parseInt(productDescLength)))
                                                                        .join(" ")}
                                                                </p>
                                                                <div className="eb-woo-product-button-list">
                                                                    <a className="eb-woo-product-button button">
                                                                        {isCustomCartBtn
                                                                            ? customCartButtonText(item.type)
                                                                            : item.add_to_cart_text}
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    {typeof queryResults === "object" && queryResults.length <= 0 && (
                                        <>
                                            <p>{__("No product found", "essential-blocks")}</p>
                                        </>
                                    )}
                                </div>
                                {/* Pagination */}
                                {typeof queryResults != "undefined" &&
                                    queryResults.length > 0 &&
                                    typeof loadMoreOptions != "undefined" &&
                                    loadMoreOptions.enableMorePosts && (
                                        <div
                                            className={`ebpg-pagination ${
                                                loadMoreOptions.loadMoreType === "3" ? "prev-next-btn" : ""
                                            }`}
                                        >
                                            {loadMoreOptions.loadMoreType === "1" && (
                                                <button className="btn ebpg-pagination-button">
                                                    {loadMoreOptions.loadMoreButtonTxt}
                                                </button>
                                            )}
                                            {(loadMoreOptions.loadMoreType === "2" ||
                                                loadMoreOptions.loadMoreType === "3") && (
                                                <div
                                                    className="btn ebpg-pagination-page"
                                                    dangerouslySetInnerHTML={{
                                                        __html: paginationLinks(loadMoreOptions, queryData.per_page),
                                                    }}
                                                ></div>
                                            )}
                                        </div>
                                    )}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
