/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useBlockProps, RichText, InnerBlocks } from "@wordpress/block-editor";
import { useEffect, useState, useRef } from "@wordpress/element";
import { select, dispatch, useSelect } from "@wordpress/data";

const { times } = lodash;

/**
 * Internal dependencies
 */

const {
    softMinifyCssStrings,
    generateBackgroundControlStyles,
    generateDimensionsControlStyles,
    generateTypographyStyles,
    generateBorderShadowStyles,
    generateResponsiveRangeStyles,
    duplicateBlockIdFix,
} = EBControls;

import classnames from "classnames";

import Inspector from "./inspector";

import { typoPrefixTabTitle } from "./constants/typographyPrefixConstants";

import {
    prefixWrapBg,
    prefixTitleBg,
    prefixActTitleBg,
    prefixContentBg,
    prefixTtlWrpBg,
} from "./constants/backgroundsConstants";

import {
    prefixWrapBdShadow,
    prefixTitleBdShadow,
    prefixActTitleBdShadow,
    prefixContentBdShadow,
    prefixTtlWrpBdShadow,
} from "./constants/borderShadowConstants";

import {
    prefixWrapperMargin,
    prefixWrapperPadding,
    prefixTitlePadding,
    prefixTitleMargin,
    prefixContentMargin,
    prefixContentPadding,
    prefixTtlWrpMargin,
    prefixTtlWrpPadding,
} from "./constants/dimensionsConstants";

import {
    prefixTitleMinWidth,
    prefixIconSize,
    prefixIconGap,
} from "./constants/rangeNames";

const Edit = ({
    attributes,
    setAttributes,
    isSelected,
    clientId,
    className,
}) => {
    const {
        resOption,
        blockMeta,
        blockId,
        tabChildCount,
        tabTitles,
        isMediaOn,
        layout,
        mediaPositon,
        mediaAlign,
        iconColor,
        hvIconColor,
        textColor,
        hvTextColor,
        actIconColor,
        actHvIconColor,
        actTextColor,
        actHvTextColor,
        colorTransition,
        actColorTransition,
        showCaret,
        caretColor,
        carZ_Range,
        TABcarZ_Range,
        MOBcarZ_Range,
        isFillTitle,
        classHook,
        tagName,
    } = attributes;

    const tabWrapRef = useRef(null);

    const [activeTabId, setActiveTabId] = useState(false);

    const activeDefaultTabId = (
        tabTitles.find((item) => item.isDefault) || { id: "1" }
    ).id;

    const [isClickTab, setIsClickTab] = useState(false);

    const handleTabTitleClick = (id) => {
        setIsClickTab(true);

        const tabsParentEl = (tabWrapRef || { current: false }).current;

        if (!tabsParentEl) return false;

        const allTabChildWraps = tabsParentEl.querySelectorAll(
            `.eb-tab-wrapper[data-tab-parent-id="${blockId}"]`
        );

        if (allTabChildWraps.length === 0) return false;

        for (const tabWrapDiv of allTabChildWraps) {
            const tabId = tabWrapDiv.dataset.tabId;

            if (tabId === id) {
                tabWrapDiv.style.display = "block";
                tabWrapDiv.style.animation = "fadeIn 0.3s";
            } else {
                tabWrapDiv.style.display = "none";
            }
        }

        setActiveTabId(`${id}`);
    };

    const onTabTitleChange = (text, index) => {
        const newTabTitles = tabTitles.map((item, i) => {
            if (i === index) {
                item.text = text;
            }

            return item;
        });

        setAttributes({ tabTitles: newTabTitles });
    };

    useEffect(() => {
        // this is for creating a unique blockId for each block's unique className
        const BLOCK_PREFIX = "eb-advanced-tabs";
        duplicateBlockIdFix({
            BLOCK_PREFIX,
            blockId,
            setAttributes,
            select,
            clientId,
        });

        if (tabTitles.length === 0) {
            setAttributes({
                tabTitles: [
                    {
                        text: "Tab Title 1",
                        id: "1",
                        media: "icon",
                        icon: "fas fa-home",
                        image: "",
                        isExpanded: true,
                        isDefault: true,
                        customId: "",
                    },
                    {
                        text: "Tab Title 2",
                        id: "2",
                        media: "icon",
                        icon: "fas fa-home",
                        image: "",
                        isExpanded: false,
                        isDefault: false,
                        customId: "",
                    },
                    {
                        text: "Tab Title 3",
                        id: "3",
                        media: "icon",
                        icon: "fas fa-home",
                        image: "",
                        isExpanded: false,
                        isDefault: false,
                        customId: "",
                    },
                ],
            });
        }
    }, []);

    const { innerBlocks } = useSelect(
        (select) => select("core/block-editor").getBlocksByClientId(clientId)[0]
    );
    //
    useEffect(() => {
        const { updateBlockAttributes } = dispatch("core/block-editor");

        times(innerBlocks.length, (n) => {
            updateBlockAttributes(innerBlocks[n].clientId, {
                tabParentId: `${blockId}`,
            });
        });
    }, [blockId, innerBlocks]);

    const blockProps = useBlockProps({
        className: classnames(className, `eb-guten-block-main-parent-wrapper`),
    });

    //
    // styles related to generateTypographyStyles start ⬇
    const {
        typoStylesDesktop: titleTypoStylesDesktop,
        typoStylesTab: titleTypoStylesTab,
        typoStylesMobile: titleTypoStylesMobile,
    } = generateTypographyStyles({
        attributes,
        prefixConstant: typoPrefixTabTitle,
        defaultFontSize: 16,
    });
    // styles related to generateTypographyStyles end

    // styles related to generateResponsiveRangeStyles start ⬇
    const {
        rangeStylesDesktop: titleMinWidthDesktop,
        rangeStylesTab: titleMinWidthTab,
        rangeStylesMobile: titleMinWidthMobile,
    } = generateResponsiveRangeStyles({
        controlName: prefixTitleMinWidth,
        property: "min-width",
        attributes,
    });

    const {
        rangeStylesDesktop: iconSizeDesktop,
        rangeStylesTab: iconSizeTab,
        rangeStylesMobile: iconSizeMobile,
    } = generateResponsiveRangeStyles({
        controlName: prefixIconSize,
        property: "font-size",
        attributes,
        customUnit: "px",
    });

    const {
        rangeStylesDesktop: iconWidthDesktop,
        rangeStylesTab: iconWidthTab,
        rangeStylesMobile: iconWidthMobile,
    } = generateResponsiveRangeStyles({
        controlName: prefixIconSize,
        property: "width",
        attributes,
        customUnit: "px",
    });

    const {
        rangeStylesDesktop: iconHeightDesktop,
        rangeStylesTab: iconHeightTab,
        rangeStylesMobile: iconHeightMobile,
    } = generateResponsiveRangeStyles({
        controlName: prefixIconSize,
        property: "height",
        attributes,
        customUnit: "px",
    });

    const {
        rangeStylesDesktop: imageWidthDesktop,
        rangeStylesTab: imageWidthTab,
        rangeStylesMobile: imageWidthMobile,
    } = generateResponsiveRangeStyles({
        controlName: prefixIconSize,
        property: "width",
        attributes,
        customUnit: "px",
    });

    const {
        rangeStylesDesktop: iconGapDesktop,
        rangeStylesTab: iconGapTab,
        rangeStylesMobile: iconGapMobile,
    } = generateResponsiveRangeStyles({
        controlName: prefixIconGap,
        property: "gap",
        attributes,
        customUnit: "px",
    });

    const {
        backgroundStylesDesktop: wrpBackgroundStylesDesktop,
        hoverBackgroundStylesDesktop: wrpHoverBackgroundStylesDesktop,
        backgroundStylesTab: wrpBackgroundStylesTab,
        hoverBackgroundStylesTab: wrpHoverBackgroundStylesTab,
        backgroundStylesMobile: wrpBackgroundStylesMobile,
        hoverBackgroundStylesMobile: wrpHoverBackgroundStylesMobile,
        overlayStylesDesktop: wrpOverlayStylesDesktop,
        hoverOverlayStylesDesktop: wrpHoverOverlayStylesDesktop,
        overlayStylesTab: wrpOverlayStylesTab,
        hoverOverlayStylesTab: wrpHoverOverlayStylesTab,
        overlayStylesMobile: wrpOverlayStylesMobile,
        hoverOverlayStylesMobile: wrpHoverOverlayStylesMobile,
        bgTransitionStyle: wrpBgTransitionStyle,
        ovlTransitionStyle: wrpOvlTransitionStyle,
    } = generateBackgroundControlStyles({
        attributes,
        controlName: prefixWrapBg,
    });

    const {
        backgroundStylesDesktop: ttlBackgroundStylesDesktop,
        hoverBackgroundStylesDesktop: ttlHoverBackgroundStylesDesktop,
        backgroundStylesTab: ttlBackgroundStylesTab,
        hoverBackgroundStylesTab: ttlHoverBackgroundStylesTab,
        backgroundStylesMobile: ttlBackgroundStylesMobile,
        hoverBackgroundStylesMobile: ttlHoverBackgroundStylesMobile,
        bgTransitionStyle: ttlBgTransitionStyle,
    } = generateBackgroundControlStyles({
        attributes,
        controlName: prefixTitleBg,
        noOverlay: true,
    });

    const {
        backgroundStylesDesktop: actTlBackgroundStylesDesktop,
        hoverBackgroundStylesDesktop: actTlHoverBackgroundStylesDesktop,
        backgroundStylesTab: actTlBackgroundStylesTab,
        hoverBackgroundStylesTab: actTlHoverBackgroundStylesTab,
        backgroundStylesMobile: actTlBackgroundStylesMobile,
        hoverBackgroundStylesMobile: actTlHoverBackgroundStylesMobile,
        bgTransitionStyle: actTlBgTransitionStyle,
    } = generateBackgroundControlStyles({
        attributes,
        controlName: prefixActTitleBg,
        noOverlay: true,
    });

    const {
        backgroundStylesDesktop: contentBackgroundStylesDesktop,
        hoverBackgroundStylesDesktop: contentHoverBackgroundStylesDesktop,
        backgroundStylesTab: contentBackgroundStylesTab,
        hoverBackgroundStylesTab: contentHoverBackgroundStylesTab,
        backgroundStylesMobile: contentBackgroundStylesMobile,
        hoverBackgroundStylesMobile: contentHoverBackgroundStylesMobile,
        bgTransitionStyle: contentBgTransitionStyle,
    } = generateBackgroundControlStyles({
        attributes,
        controlName: prefixContentBg,
        noOverlay: true,
    });

    const {
        backgroundStylesDesktop: titleWrapBackgroundStylesDesktop,
        hoverBackgroundStylesDesktop: titleWrapHoverBackgroundStylesDesktop,
        backgroundStylesTab: titleWrapBackgroundStylesTab,
        hoverBackgroundStylesTab: titleWrapHoverBackgroundStylesTab,
        backgroundStylesMobile: titleWrapBackgroundStylesMobile,
        hoverBackgroundStylesMobile: titleWrapHoverBackgroundStylesMobile,
        bgTransitionStyle: titleWrapBgTransitionStyle,
    } = generateBackgroundControlStyles({
        attributes,
        controlName: prefixTtlWrpBg,
        noOverlay: true,
    });

    // styles related to generateBackgroundControlStyles end

    // styles related to generateDimensionsControlStyles start ⬇
    const {
        dimensionStylesDesktop: wrpMarginDesktop,
        dimensionStylesTab: wrpMarginTab,
        dimensionStylesMobile: wrpMarginMobile,
    } = generateDimensionsControlStyles({
        attributes,
        controlName: prefixWrapperMargin,
        styleFor: "margin",
    });

    const {
        dimensionStylesDesktop: wrpPaddingDesktop,
        dimensionStylesTab: wrpPaddingTab,
        dimensionStylesMobile: wrpPaddingMobile,
    } = generateDimensionsControlStyles({
        attributes,
        controlName: prefixWrapperPadding,
        styleFor: "padding",
    });

    const {
        dimensionStylesDesktop: titleMarginDesktop,
        dimensionStylesTab: titleMarginTab,
        dimensionStylesMobile: titleMarginMobile,
    } = generateDimensionsControlStyles({
        attributes,
        controlName: prefixTitleMargin,
        styleFor: "margin",
    });

    const {
        dimensionStylesDesktop: titlePaddingDesktop,
        dimensionStylesTab: titlePaddingTab,
        dimensionStylesMobile: titlePaddingMobile,
    } = generateDimensionsControlStyles({
        attributes,
        controlName: prefixTitlePadding,
        styleFor: "padding",
    });

    const {
        dimensionStylesDesktop: contentMarginDesktop,
        dimensionStylesTab: contentMarginTab,
        dimensionStylesMobile: contentMarginMobile,
    } = generateDimensionsControlStyles({
        attributes,
        controlName: prefixContentMargin,
        styleFor: "margin",
    });

    const {
        dimensionStylesDesktop: contentPaddingDesktop,
        dimensionStylesTab: contentPaddingTab,
        dimensionStylesMobile: contentPaddingMobile,
    } = generateDimensionsControlStyles({
        attributes,
        controlName: prefixContentPadding,
        styleFor: "padding",
    });

    const {
        dimensionStylesDesktop: titleWrapMarginDesktop,
        dimensionStylesTab: titleWrapMarginTab,
        dimensionStylesMobile: titleWrapMarginMobile,
    } = generateDimensionsControlStyles({
        attributes,
        controlName: prefixTtlWrpMargin,
        styleFor: "margin",
    });

    const {
        dimensionStylesDesktop: titleWrapPaddingDesktop,
        dimensionStylesTab: titleWrapPaddingTab,
        dimensionStylesMobile: titleWrapPaddingMobile,
    } = generateDimensionsControlStyles({
        attributes,
        controlName: prefixTtlWrpPadding,
        styleFor: "padding",
    });
    // styles related to generateDimensionsControlStyles end

    // styles related to generateBorderShadowStyles start ⬇
    const {
        styesDesktop: wrpBdShdStyesDesktop,
        styesTab: wrpBdShdStyesTab,
        styesMobile: wrpBdShdStyesMobile,
        stylesHoverDesktop: wrpBdShdStylesHoverDesktop,
        stylesHoverTab: wrpBdShdStylesHoverTab,
        stylesHoverMobile: wrpBdShdStylesHoverMobile,
        transitionStyle: wrpBdShdTransitionStyle,
    } = generateBorderShadowStyles({
        controlName: prefixWrapBdShadow,
        attributes,
        // noShadow: true,
        // noBorder: true,
    });

    const {
        styesDesktop: ttlBdShdStyesDesktop,
        styesTab: ttlBdShdStyesTab,
        styesMobile: ttlBdShdStyesMobile,
        stylesHoverDesktop: ttlBdShdStylesHoverDesktop,
        stylesHoverTab: ttlBdShdStylesHoverTab,
        stylesHoverMobile: ttlBdShdStylesHoverMobile,
        transitionStyle: ttlBdShdTransitionStyle,
    } = generateBorderShadowStyles({
        controlName: prefixTitleBdShadow,
        attributes,
        // noShadow: true,
        // noBorder: true,
    });

    const {
        styesDesktop: actTlBdShdStyesDesktop,
        styesTab: actTlBdShdStyesTab,
        styesMobile: actTlBdShdStyesMobile,
        stylesHoverDesktop: actTlBdShdStylesHoverDesktop,
        stylesHoverTab: actTlBdShdStylesHoverTab,
        stylesHoverMobile: actTlBdShdStylesHoverMobile,
        transitionStyle: actTlBdShdTransitionStyle,
    } = generateBorderShadowStyles({
        controlName: prefixActTitleBdShadow,
        attributes,
        // noShadow: true,
        // noBorder: true,
    });

    const {
        styesDesktop: contentBdShdStyesDesktop,
        styesTab: contentBdShdStyesTab,
        styesMobile: contentBdShdStyesMobile,
        stylesHoverDesktop: contentBdShdStylesHoverDesktop,
        stylesHoverTab: contentBdShdStylesHoverTab,
        stylesHoverMobile: contentBdShdStylesHoverMobile,
        transitionStyle: contentBdShdTransitionStyle,
    } = generateBorderShadowStyles({
        controlName: prefixContentBdShadow,
        attributes,
        // noShadow: true,
        // noBorder: true,
    });

    const {
        styesDesktop: titleWrapBdShdStyesDesktop,
        styesTab: titleWrapBdShdStyesTab,
        styesMobile: titleWrapBdShdStyesMobile,
        stylesHoverDesktop: titleWrapBdShdStylesHoverDesktop,
        stylesHoverTab: titleWrapBdShdStylesHoverTab,
        stylesHoverMobile: titleWrapBdShdStylesHoverMobile,
        transitionStyle: titleWrapBdShdTransitionStyle,
    } = generateBorderShadowStyles({
        controlName: prefixTtlWrpBdShadow,
        attributes,
        // noShadow: true,
        // noBorder: true,
    });

    // styles related to generateBorderShadowStyles end

    // all common (editor&frontEnd) css styles for large screen width (desktop/laptop) in strings ⬇
    const desktopAllStylesCommon = softMinifyCssStrings(`

		.${blockId}.eb-advanced-tabs-wrapper > *{
			position:relative;
		}

		.${blockId}.eb-advanced-tabs-wrapper{
			display:flex;
			flex-direction:${layout === "horizontal" ? "column" : "row"};
			${wrpMarginDesktop}
			${wrpPaddingDesktop}
			${wrpBackgroundStylesDesktop}
			${wrpBdShdStyesDesktop}
			transition: all .5s, ${wrpBgTransitionStyle}, ${wrpBdShdTransitionStyle};
		}

		.${blockId}.eb-advanced-tabs-wrapper:hover{
			${wrpHoverBackgroundStylesDesktop}
			${wrpBdShdStylesHoverDesktop}
		}

		.${blockId}.eb-advanced-tabs-wrapper:before{
			${wrpOverlayStylesDesktop}
			transition: all .5s, ${wrpOvlTransitionStyle};
		}

		.${blockId}.eb-advanced-tabs-wrapper:hover:before{
			${wrpHoverOverlayStylesDesktop}
		}
		.${blockId}.eb-advanced-tabs-wrapper{
			flex-direction:${layout === "horizontal" ? "column" : "row"};
			${wrpMarginDesktop}
			${wrpPaddingDesktop}
			${wrpBackgroundStylesDesktop}
			${wrpBdShdStyesDesktop}
		}

		.${blockId}.eb-advanced-tabs-wrapper:hover{
			${wrpHoverBackgroundStylesDesktop}
			${wrpBdShdStylesHoverDesktop}
		}

		.${blockId}.eb-advanced-tabs-wrapper:before{
			${wrpOverlayStylesDesktop}
			transition: all .5s, ${wrpOvlTransitionStyle};
		}

		.${blockId}.eb-advanced-tabs-wrapper:hover:before{
			${wrpHoverOverlayStylesDesktop}
		}

		.${blockId}.eb-advanced-tabs-wrapper .eb-tabs-nav ul.tabTitles[data-tabs-ul-id="${blockId}"]{
			display: flex;
			list-style-type: none;
			flex-wrap:wrap;
			margin: 0;
			padding: 0;
			flex-direction:${layout === "horizontal" ? "row" : "column"};
			${titleWrapMarginDesktop}
			${titleWrapPaddingDesktop}
			${titleWrapBdShdStyesDesktop}
			${titleWrapBackgroundStylesDesktop}

			transition: ${titleWrapBdShdTransitionStyle}, ${titleWrapBgTransitionStyle};
		}

		.${blockId}.eb-advanced-tabs-wrapper .eb-tabs-nav ul.tabTitles[data-tabs-ul-id="${blockId}"]:hover{
			${titleWrapHoverBackgroundStylesDesktop}
			${titleWrapBdShdStylesHoverDesktop}
		}

		.${blockId}.eb-advanced-tabs-wrapper .eb-tabs-nav ul.tabTitles[data-tabs-ul-id="${blockId}"] li{
			display: flex;
			justify-content: center;
			align-items: center;
			cursor:pointer;
			text-align: center;
			position:relative;
			${isFillTitle ? `flex: 1;` : ""}
			${
                mediaPositon === "inline"
                    ? mediaAlign === "left"
                        ? "flex-direction: row;"
                        : "flex-direction: row-reverse;"
                    : "flex-direction: column;"
            }
			${titleMarginDesktop}
			${titlePaddingDesktop}
			${titleMinWidthDesktop}
			${iconGapDesktop}
			${ttlBackgroundStylesDesktop}
			${ttlBdShdStyesDesktop}
			transition: all .5s, ${ttlBgTransitionStyle}, ${ttlBdShdTransitionStyle};
		}

		.${blockId}.eb-advanced-tabs-wrapper .eb-tabs-nav ul.tabTitles[data-tabs-ul-id="${blockId}"] li:hover{
			${ttlHoverBackgroundStylesDesktop}
			${ttlBdShdStylesHoverDesktop}
		}

		.${blockId}.eb-advanced-tabs-wrapper .eb-tabs-nav ul.tabTitles[data-tabs-ul-id="${blockId}"] li span.tabIcon {
			display:flex;
			justify-content:center;
			align-items:center;
			${iconWidthDesktop}
			${iconHeightDesktop}
			${iconSizeDesktop}
			${iconColor ? `color:${iconColor};` : ""}
			${colorTransition ? `transition:color ${colorTransition}s;` : ""}
		}

		.${blockId}.eb-advanced-tabs-wrapper .eb-tabs-nav ul.tabTitles[data-tabs-ul-id="${blockId}"] li:hover span{
			${hvIconColor ? `color:${hvIconColor};` : ""}
		}

		.${blockId}.eb-advanced-tabs-wrapper .eb-tabs-nav ul.tabTitles[data-tabs-ul-id="${blockId}"] li img{
			height:auto;
			${imageWidthDesktop}
		}

		.${blockId}.eb-advanced-tabs-wrapper .eb-tabs-nav ul.tabTitles[data-tabs-ul-id="${blockId}"] li .tab-title-text{
			font-size: inherit;
			margin: 0;
			padding: 0;
			${textColor ? `color:${textColor};` : ""}
			${titleTypoStylesDesktop}
			${colorTransition ? `transition:color ${colorTransition}s;` : ""}
		}

		.${blockId}.eb-advanced-tabs-wrapper .eb-tabs-nav ul.tabTitles[data-tabs-ul-id="${blockId}"] li:hover .tab-title-text{
			${hvTextColor ? `color:${hvTextColor};` : ""}
		}

		.${blockId}.eb-advanced-tabs-wrapper .eb-tabs-nav ul.tabTitles[data-tabs-ul-id=${blockId}] li.active{
			${actTlBdShdStyesDesktop}
			${actTlBackgroundStylesDesktop}
			transition:${actTlBdShdTransitionStyle}, ${actTlBgTransitionStyle};
		}

		.${blockId}.eb-advanced-tabs-wrapper .eb-tabs-nav ul.tabTitles[data-tabs-ul-id=${blockId}] li.active:hover{
			${actTlBdShdStylesHoverDesktop}
			${actTlHoverBackgroundStylesDesktop}
		}

	${
        showCaret
            ? `
		.${blockId}.eb-advanced-tabs-wrapper .eb-tabs-nav ul.tabTitles[data-tabs-ul-id="${blockId}"] li.active:after{
			content: "";
			position: absolute;
			width: 0px;
			height: 0px;
			z-index: 1;
			border: ${carZ_Range}px solid transparent;
			${
                layout === "horizontal"
                    ? `
					bottom: -${carZ_Range}px;
					border-top-color: ${caretColor};
					border-top-style: solid;
					border-bottom: 0px;
					left: 50%;
					transform: translateX(-50%);
				`
                    : `
					right: -${carZ_Range}px;
					border-left-color: ${caretColor};
					border-left-style: solid;
					border-right: 0px;
					top: 50%;
					transform: translateY(-50%);
				`
            }

		}

		`
            : ""
    }


		.${blockId}.eb-advanced-tabs-wrapper .eb-tabs-nav ul.tabTitles[data-tabs-ul-id=${blockId}] li.active span{
			${actIconColor ? `color:${actIconColor};` : ""}
			${actColorTransition ? `transition:color ${actColorTransition}s;` : ""}
		}

		.${blockId}.eb-advanced-tabs-wrapper .eb-tabs-nav ul.tabTitles[data-tabs-ul-id=${blockId}] li.active:hover span{
			${actHvIconColor ? `color:${actHvIconColor};` : ""}
		}

		.${blockId}.eb-advanced-tabs-wrapper .eb-tabs-nav ul.tabTitles[data-tabs-ul-id=${blockId}] li.active .tab-title-text{
			${actTextColor ? `color:${actTextColor};` : ""}
			${actColorTransition ? `transition:color ${actColorTransition}s;` : ""}
		}

		.${blockId}.eb-advanced-tabs-wrapper .eb-tabs-nav ul.tabTitles[data-tabs-ul-id=${blockId}] li.active:hover .tab-title-text{
			${actHvTextColor ? `color:${actHvTextColor};` : ""}
		}


		.${blockId}.eb-advanced-tabs-wrapper .eb-tabs-contents{
			flex:1;
		}

		.${blockId}.eb-advanced-tabs-wrapper .eb-tabs-contents .eb-tab-wrapper[data-tab-parent-id="${blockId}"]{
			${contentMarginDesktop}
			${contentPaddingDesktop}
			${contentBackgroundStylesDesktop}
			${contentBdShdStyesDesktop}
			transition:all 0.5s, ${contentBgTransitionStyle}, ${contentBdShdTransitionStyle};
		}

		.${blockId}.eb-advanced-tabs-wrapper .eb-tabs-contents .eb-tab-wrapper[data-tab-parent-id="${blockId}"]:hover{
			${contentHoverBackgroundStylesDesktop}
			${contentBdShdStylesHoverDesktop}
		}

	`);

    // all common (editor&frontEnd) css styles for Tab in strings ⬇
    const tabAllStylesCommon = softMinifyCssStrings(`
		.${blockId}.eb-advanced-tabs-wrapper{
			${wrpMarginTab}
			${wrpPaddingTab}
			${wrpBackgroundStylesTab}
			${wrpBdShdStyesTab}
		}

		.${blockId}.eb-advanced-tabs-wrapper:hover{
			${wrpHoverBackgroundStylesTab}
			${wrpBdShdStylesHoverTab}
		}

		.${blockId}.eb-advanced-tabs-wrapper:before{
			${wrpOverlayStylesTab}
		}

		.${blockId}.eb-advanced-tabs-wrapper:hover:before{
			${wrpHoverOverlayStylesTab}
		}

		.${blockId}.eb-advanced-tabs-wrapper .eb-tabs-nav ul.tabTitles[data-tabs-ul-id="${blockId}"]{
			${titleWrapMarginTab}
			${titleWrapPaddingTab}
			${titleWrapBdShdStyesTab}
			${titleWrapBackgroundStylesTab}

		}

		.${blockId}.eb-advanced-tabs-wrapper .eb-tabs-nav ul.tabTitles[data-tabs-ul-id="${blockId}"]:hover{
			${titleWrapHoverBackgroundStylesTab}
			${titleWrapBdShdStylesHoverTab}
		}

		.${blockId}.eb-advanced-tabs-wrapper .eb-tabs-nav ul.tabTitles[data-tabs-ul-id="${blockId}"] li{
			${titleMarginTab}
			${titlePaddingTab}
			${titleMinWidthTab}
			${iconGapTab}
			${ttlBackgroundStylesTab}
			${ttlBdShdStyesTab}
		}

		.${blockId}.eb-advanced-tabs-wrapper .eb-tabs-nav ul.tabTitles[data-tabs-ul-id="${blockId}"] li:hover{
			${ttlHoverBackgroundStylesTab}
			${ttlBdShdStylesHoverTab}
		}

		.${blockId}.eb-advanced-tabs-wrapper ul.tabTitles[data-tabs-ul-id=${blockId}] li.active{
			${actTlBdShdStyesTab}
			${actTlBackgroundStylesTab}
		}

		.${blockId}.eb-advanced-tabs-wrapper ul.tabTitles[data-tabs-ul-id=${blockId}] li.active:hover{
			${actTlBdShdStylesHoverTab}
			${actTlHoverBackgroundStylesTab}
		}

		${
            showCaret && TABcarZ_Range
                ? `
			.${blockId}.eb-advanced-tabs-wrapper ul.tabTitles[data-tabs-ul-id="${blockId}"] li.active:after{
				border: ${TABcarZ_Range}px solid transparent;
				${
                    layout === "horizontal"
                        ? `
						bottom: -${TABcarZ_Range}px;
					`
                        : `
						right: -${TABcarZ_Range}px;
					`
                }

			}

			`
                : ""
        }

		.${blockId}.eb-advanced-tabs-wrapper .eb-tabs-nav ul.tabTitles[data-tabs-ul-id="${blockId}"] li span.tabIcon {
			${iconSizeTab}
			${iconWidthTab}
			${iconHeightTab}
		}

		.${blockId}.eb-advanced-tabs-wrapper .eb-tabs-nav ul.tabTitles[data-tabs-ul-id="${blockId}"] li img{
			${imageWidthTab}
		}

		.${blockId}.eb-advanced-tabs-wrapper .eb-tabs-nav ul.tabTitles[data-tabs-ul-id="${blockId}"] li .tab-title-text{
			${titleTypoStylesTab}
		}

		.${blockId}.eb-advanced-tabs-wrapper .eb-tabs-contents .eb-tab-wrapper[data-tab-parent-id="${blockId}"]{
			${contentMarginTab}
			${contentPaddingTab}
			${contentBackgroundStylesTab}
			${contentBdShdStyesTab}
		}

		.${blockId}.eb-advanced-tabs-wrapper .eb-tabs-contents .eb-tab-wrapper[data-tab-parent-id="${blockId}"]:hover{
			${contentHoverBackgroundStylesTab}
			${contentBdShdStylesHoverTab}
		}

	`);

    // all common (editor&frontEnd) css styles for Mobile in strings ⬇
    const mobileAllStylesCommon = softMinifyCssStrings(`
		.${blockId}.eb-advanced-tabs-wrapper{
			${wrpMarginMobile}
			${wrpPaddingMobile}
			${wrpBackgroundStylesMobile}
			${wrpBdShdStyesMobile}
		}

		.${blockId}.eb-advanced-tabs-wrapper:hover{
			${wrpHoverBackgroundStylesMobile}
			${wrpBdShdStylesHoverMobile}
		}

		.${blockId}.eb-advanced-tabs-wrapper:before{
			${wrpOverlayStylesMobile}
		}

		.${blockId}.eb-advanced-tabs-wrapper:hover:before{
			${wrpHoverOverlayStylesMobile}
		}

		.${blockId}.eb-advanced-tabs-wrapper .eb-tabs-nav ul.tabTitles[data-tabs-ul-id="${blockId}"]{
			${titleWrapMarginMobile}
			${titleWrapPaddingMobile}
			${titleWrapBdShdStyesMobile}
			${titleWrapBackgroundStylesMobile}

		}

		.${blockId}.eb-advanced-tabs-wrapper .eb-tabs-nav ul.tabTitles[data-tabs-ul-id="${blockId}"]:hover{
			${titleWrapHoverBackgroundStylesMobile}
			${titleWrapBdShdStylesHoverMobile}
		}

		.${blockId}.eb-advanced-tabs-wrapper .eb-tabs-nav ul.tabTitles[data-tabs-ul-id="${blockId}"] li{
			${titleMarginMobile}
			${titlePaddingMobile}
			${titleMinWidthMobile}
			${iconGapMobile}
			${ttlBackgroundStylesMobile}
			${ttlBdShdStyesMobile}
		}

		.${blockId}.eb-advanced-tabs-wrapper .eb-tabs-nav ul.tabTitles[data-tabs-ul-id="${blockId}"] li:hover{
			${ttlHoverBackgroundStylesMobile}
			${ttlBdShdStylesHoverMobile}
		}

		.${blockId}.eb-advanced-tabs-wrapper ul.tabTitles[data-tabs-ul-id=${blockId}] li.active{
			${actTlBdShdStyesMobile}
			${actTlBackgroundStylesMobile}
		}

		.${blockId}.eb-advanced-tabs-wrapper ul.tabTitles[data-tabs-ul-id=${blockId}] li.active:hover{
			${actTlBdShdStylesHoverMobile}
			${actTlHoverBackgroundStylesMobile}
		}

		${
            showCaret && MOBcarZ_Range
                ? `
			.${blockId}.eb-advanced-tabs-wrapper ul.tabTitles[data-tabs-ul-id="${blockId}"] li.active:after{
				border: ${MOBcarZ_Range}px solid transparent;
				${
                    layout === "horizontal"
                        ? `
						bottom: -${MOBcarZ_Range}px;
					`
                        : `
						right: -${MOBcarZ_Range}px;
					`
                }

			}

			`
                : ""
        }

		.${blockId}.eb-advanced-tabs-wrapper .eb-tabs-nav ul.tabTitles[data-tabs-ul-id="${blockId}"] li span.tabIcon {
			${iconSizeMobile}
			${iconWidthMobile}
			${iconHeightMobile}
		}

		.${blockId}.eb-advanced-tabs-wrapper .eb-tabs-nav ul.tabTitles[data-tabs-ul-id="${blockId}"] li img{
			${imageWidthMobile}
		}

		.${blockId}.eb-advanced-tabs-wrapper .eb-tabs-nav ul.tabTitles[data-tabs-ul-id="${blockId}"] li .tab-title-text{
			${titleTypoStylesMobile}
		}

		.${blockId}.eb-advanced-tabs-wrapper .eb-tabs-contents .eb-tab-wrapper[data-tab-parent-id="${blockId}"]{
			${contentMarginMobile}
			${contentPaddingMobile}
			${contentBackgroundStylesMobile}
			${contentBdShdStyesMobile}
		}

		.${blockId}.eb-advanced-tabs-wrapper .eb-tabs-contents .eb-tab-wrapper[data-tab-parent-id="${blockId}"]:hover{
			${contentHoverBackgroundStylesMobile}
			${contentBdShdStylesHoverMobile}
		}

	`);

    //
    const desktopAllStylesEditor = softMinifyCssStrings(`
		${desktopAllStylesCommon}

		.eb-tabs-contents .eb-tab-wrapper > .eb-tab-inner > .block-editor-inner-blocks > .block-editor-block-list__layout > .wp-block,
		.eb-tabs-contents > .block-editor-inner-blocks > .block-editor-block-list__layout > .wp-block > .eb-tab-editor-wrap,
		.eb-tabs-contents > .block-editor-inner-blocks > .block-editor-block-list__layout > .wp-block,
		.eb-tabs-contents > .block-editor-inner-blocks > .block-editor-block-list__layout,
		.eb-tabs-contents > .block-editor-inner-blocks
		{
			margin: 0;
			padding: 0;
		}

		.eb-tabs-contents .block-editor-inner-blocks .eb-tab-wrapper .eb-tab-inner .block-editor-button-block-appender{
			height: 100px;
		}

	`);

    const tabAllStylesEditor = softMinifyCssStrings(`
		${tabAllStylesCommon}

	`);

    const mobileAllStylesEditor = softMinifyCssStrings(`
		${mobileAllStylesCommon}

	`);

    // all css styles for large screen width (desktop/laptop) in strings ⬇
    const desktopAllStylesFrontEnd = softMinifyCssStrings(`
		${desktopAllStylesCommon}

	`);

    // all css styles for Tab in strings ⬇
    const tabAllStylesFrontEnd = softMinifyCssStrings(`
		${tabAllStylesCommon}

	`);

    // all css styles for Mobile in strings ⬇
    const mobileAllStylesFrontEnd = softMinifyCssStrings(`
		${mobileAllStylesCommon}

	`);

    // Set All Style in "blockMeta" Attribute
    useEffect(() => {
        const styleObject = {
            desktop: desktopAllStylesFrontEnd,
            tab: tabAllStylesFrontEnd,
            mobile: mobileAllStylesFrontEnd,
        };
        if (JSON.stringify(blockMeta) != JSON.stringify(styleObject)) {
            setAttributes({ blockMeta: styleObject });
        }
    }, [attributes]);

    return (
        <>
            {isSelected && (
                <Inspector
                    clientId={clientId}
                    attributes={attributes}
                    setAttributes={setAttributes}
                    handleTabTitleClick={handleTabTitleClick}
                />
            )}
            <div {...blockProps}>
                <style>
                    {!isClickTab &&
                        `
							.${blockId}.eb-advanced-tabs-wrapper .wp-block-essential-blocks-tab:not(:first-child) .eb-tab-wrapper,
							.${blockId}.eb-advanced-tabs-wrapper .wp-block:not(:first-child) .eb-tab-wrapper {
								display: none;
							}
						`}

                    {`

				a.info-click-link{
					pointer-events: none;
				}


				${desktopAllStylesEditor}

				/* mimmikcssStart */

				${resOption === "Tablet" ? tabAllStylesEditor : " "}
				${resOption === "Mobile" ? tabAllStylesEditor + mobileAllStylesEditor : " "}

				/* mimmikcssEnd */

				@media all and (max-width: 1024px) {

					/* tabcssStart */
					${tabAllStylesEditor}
					/* tabcssEnd */

				}

				@media all and (max-width: 767px) {

					/* mobcssStart */
					${mobileAllStylesEditor}
					/* mobcssEnd */

				}
				`}
                </style>

                <div
                    className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`}
                >
                    <div
                        className={`${blockId} eb-advanced-tabs-wrapper ${layout}`}
                        ref={tabWrapRef}
                    >
                        <div className="eb-tabs-nav">
                            <ul
                                className="tabTitles"
                                data-tabs-ul-id={`${blockId}`}
                            >
                                {tabTitles.map((item, index) => {
                                    const itemId = item.id;

                                    return (
                                        <li
                                            key={index}
                                            data-title-tab-id={item.id}
                                            onClick={(e) => {
                                                handleTabTitleClick(item.id);
                                            }}
                                            className={
                                                (activeTabId ||
                                                    activeDefaultTabId) ===
                                                item.id
                                                    ? "active"
                                                    : "inactive"
                                            }
                                        >
                                            {isMediaOn && (
                                                <>
                                                    {item.media === "icon" &&
                                                        item.icon && (
                                                            <span
                                                                className={`tabIcon ${item.icon}`}
                                                            />
                                                        )}
                                                    {item.media === "image" &&
                                                        item.imgUrl && (
                                                            <img
                                                                src={
                                                                    item.imgUrl
                                                                }
                                                            />
                                                        )}
                                                </>
                                            )}
                                            <RichText
                                                tagName={tagName}
                                                className="tab-title-text"
                                                placeholder="Tab Title"
                                                value={item.text}
                                                onChange={(text) =>
                                                    onTabTitleChange(
                                                        text,
                                                        index
                                                    )
                                                }
                                            />
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                        <div className={`eb-tabs-contents`}>
                            <InnerBlocks
                                templateLock="all"
                                template={times(tabChildCount, (n) => [
                                    "essential-blocks/tab",
                                    {
                                        tabId: `${n + 1}`,
                                        tabParentId: blockId,
                                    },
                                ])}
                                allowedBlocks={["essential-blocks/tab"]}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Edit;
