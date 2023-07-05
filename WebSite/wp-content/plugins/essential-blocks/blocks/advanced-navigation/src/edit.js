/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
    InspectorControls,
    useBlockProps,
    InnerBlocks,
} from "@wordpress/block-editor";
import { useEffect, Fragment } from "@wordpress/element";
import { select, dispatch, subscribe } from "@wordpress/data";
import { PanelBody } from "@wordpress/components";

const { times } = lodash;

import { createHigherOrderComponent } from "@wordpress/compose";

/**
 * Internal dependencies
 */

const {
    //
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

import {
    //
    typoPrefixNav,
    typoPrefixNavDropdown,
    typoPrefixNavHamburger,
    typoPrefixHamburgerBtn,
} from "./constants/typographyPrefixConstants";

import { prefixWrapBg } from "./constants/backgroundsConstants";

import {
    prefixWrapBdShadow,
    prefixNavBdShadow,
    prefixNavDropdownBdShadow,
    prefixDropdownItemBdShadow,
    prefixHamburgerItemBdShadow,
} from "./constants/borderShadowConstants";

import {
    prefixWrapperMargin,
    prefixWrapperPadding,
    prefixNavPadding,
    prefixNavMargin,
    prefixNavDropdownPadding,
    prefixDropdownItemPadding,
    prefixNavHamburgerPadding,
    prefixHamburgerItemPadding,
    prefixHamburgerBtnPadding,
} from "./constants/dimensionsConstants";

import {
    prefixCaretSize,
    prefixDropdownWidth,
    prefixHamburerBtnSize,
} from "./constants/rangeNames";

const withInspectorControls = createHigherOrderComponent((BlockEdit) => {
    return (props) => {
        const { attributes, name, clientId, isSelected, setAttributes } = props;

        if (name && name != "core/navigation") {
            return <BlockEdit {...props} />;
        }

        const parentBlock = select("core/block-editor").getBlockParents(
            clientId
        );
        let isParentBlockNavigation = false;
        let parentAttributes = {};
        parentBlock.map((block) => {
            const thisProps = select("core/block-editor").getBlock(block);
            if (
                thisProps &&
                thisProps.name == "essential-blocks/advanced-navigation"
            ) {
                isParentBlockNavigation = true;
                parentAttributes = { ...thisProps.attributes };
            }
        });

        let inspector;
        if (isParentBlockNavigation && isSelected) {
            setTimeout(() => {
                inspector = document.querySelector(
                    ".block-editor-block-inspector"
                );

                if (inspector) {
                    let tabButtons = inspector
                        .querySelector(".block-editor-block-inspector__tabs")
                        .querySelectorAll(
                            '[aria-label="Settings"], [aria-label="Styles"]'
                        );

                    tabButtons.forEach((element) => {
                        element.style.display = "none";
                    });
                }
            }, 200);

            if (inspector) {
                setTimeout(() => {
                    // inspector.querySelector(
                    //     ".block-editor-block-card"
                    // ).style.display = "none";

                    let nodes = inspector.children;

                    let tabButtons = inspector
                        .querySelector(".block-editor-block-inspector__tabs")
                        .querySelectorAll(
                            '[aria-label="Settings"], [aria-label="Styles"]'
                        );

                    tabButtons.forEach((element) => {
                        element.style.display = "none";
                    });

                    for (let i = 0; i <= nodes.length - 1; i++) {
                        let card = nodes[i].classList.contains(
                            "block-editor-block-card"
                        );
                        let tab = nodes[i].classList.contains(
                            "block-editor-block-inspector__tabs"
                        );

                        let childen = nodes[i].children;

                        if (!card && !tab) {
                            for (let x = 0; x <= childen.length - 1; x++) {
                                const hasNavigation = childen[x].querySelector(
                                    ".wp-block-navigation__navigation-selector"
                                );

                                if (!hasNavigation) {
                                    childen[x].style.display = "none";
                                }
                            }
                        }
                    }
                }, 200);

                return (
                    <Fragment>
                        <BlockEdit {...props} />
                    </Fragment>
                );
            } else {
                return <BlockEdit {...props} />;
            }
        } else {
            inspector = document.querySelector(".block-editor-block-inspector");

            if (inspector) {
                setTimeout(() => {
                    inspector.querySelector(
                        ".block-editor-block-card"
                    ).style.display = "block";

                    let nodes = inspector.children;
                    for (let i = 0; i <= nodes.length - 1; i++) {
                        let childen = nodes[i].children;

                        for (let x = 0; x <= childen.length - 1; x++) {
                            childen[x].style.display = "block";
                        }
                    }
                }, 200);
            }
            return <BlockEdit {...props} />;
        }
    };
}, "withInspectorControl");

wp.hooks.addFilter(
    "editor.BlockEdit",
    "essential-blocks/advanced-navigation",
    withInspectorControls
);

const Edit = ({
    attributes,
    setAttributes,
    isSelected,
    clientId,
    className,
}) => {
    const {
        // responsive control attributes ⬇
        resOption,

        // blockMeta is for keeping all the styles
        blockMeta,

        // blockId attribute for making unique className and other uniqueness
        blockId,

        //
        layout,

        //
        navTextColor,
        hvNavTextColor,

        //
        actNavTextColor,
        actHvNavTextColor,

        //
        colorTransition,
        actColorTransition,

        //
        caretColor,
        carZ_Range,
        TABcarZ_Range,
        MOBcarZ_Range,

        //
        navAlign,
        hvNavBgColor,
        actNavBgColor,
        actHvNavBgColor,
        navDropdownTextColor,
        hvNavDropdownTextColor,
        actNavDropdownTextColor,
        actHvNavDropdownTextColor,
        navDropdownBgColor,
        hvNavDropdownBgColor,
        actNavDropdownBgColor,
        actHvNavDropdownBgColor,
        preset,
        dropdownItemBgColor,
        hvDropdownItemBgColor,
        actDropdownItemBgColor,
        actHvDropdownItemBgColor,
        dropdownW_Range,
        TABdropdownW_Range,
        MOBdropdownW_Range,
        hvCaretColor,
        verticalPreset,
        dropdownOpenOnClick,
        navBtnType,
        showDropdownIcon,

        navHamburgerBgColor,
        navHamburgerTextColor,
        hamburgerItemBgColor,
        hvNavHamburgerTextColor,
        hvHamburgerItemBgColor,
        actNavHamburgerTextColor,
        actHamburgerItemBgColor,
        actHvNavHamburgerTextColor,
        actHvHamburgerItemBgColor,
        hamburgerCloseIconColor,
        navDividerColor,
        navDropdownDividerColor,
        flexWrap,
        navVerticalAlign,
        hamburgerMenu,
        navHamburgerBtnColor,
        hamburgerBtnZ_Range,
        TABhamburgerBtnZ_Range,
        MOBhamburgerBtnZ_Range,
        hamburgerCloseIconAlign,
        verticalNavDividerColor,
        classHook,
    } = attributes;

    useEffect(() => {
        // this is for creating a unique blockId for each block's unique className
        const BLOCK_PREFIX = "eb-advanced-navigation";
        duplicateBlockIdFix({
            BLOCK_PREFIX,
            blockId,
            setAttributes,
            select,
            clientId,
        });
    }, []);

    //
    useEffect(() => {
        const parentBlocks = select("core/block-editor").getBlocksByClientId(
            clientId
        )[0];

        const innerBlocks = parentBlocks?.innerBlocks;

        const { replaceInnerBlocks, updateBlockAttributes } = dispatch(
            "core/block-editor"
        );

        if (innerBlocks) {
            times(innerBlocks.length, (n) => {
                updateBlockAttributes(innerBlocks[n].clientId, {
                    className: `${layout} ${
                        layout == "is-horizontal" ? navAlign : navVerticalAlign
                    } ${flexWrap === true ? "no-wrap" : ""}`,
                });
            });
        }
    }, [layout, navAlign, flexWrap, navVerticalAlign]);

    // Open on click
    useEffect(() => {
        const parentBlocks = select("core/block-editor").getBlocksByClientId(
            clientId
        )[0];

        const innerBlocks = parentBlocks?.innerBlocks;

        const { replaceInnerBlocks, updateBlockAttributes } = dispatch(
            "core/block-editor"
        );

        if (innerBlocks) {
            times(innerBlocks.length, (n) => {
                updateBlockAttributes(innerBlocks[n].clientId, {
                    openSubmenusOnClick: dropdownOpenOnClick,
                });
            });
        }
    }, [dropdownOpenOnClick]);

    // show submenu Icon
    useEffect(() => {
        const parentBlocks = select("core/block-editor").getBlocksByClientId(
            clientId
        )[0];
        const innerBlocks = parentBlocks?.innerBlocks;

        const { replaceInnerBlocks, updateBlockAttributes } = dispatch(
            "core/block-editor"
        );

        if (innerBlocks) {
            times(innerBlocks.length, (n) => {
                updateBlockAttributes(innerBlocks[n].clientId, {
                    showSubmenuIcon: showDropdownIcon,
                });
            });
        }
    }, [showDropdownIcon]);

    // icon
    useEffect(() => {
        const parentBlocks = select("core/block-editor").getBlocksByClientId(
            clientId
        )[0];
        const innerBlocks = parentBlocks?.innerBlocks;

        const { replaceInnerBlocks, updateBlockAttributes } = dispatch(
            "core/block-editor"
        );

        if (innerBlocks) {
            times(innerBlocks.length, (n) => {
                updateBlockAttributes(innerBlocks[n].clientId, {
                    hasIcon: navBtnType,
                });
            });
        }
    }, [navBtnType]);

    // hamburger screen
    useEffect(() => {
        const parentBlocks = select("core/block-editor").getBlocksByClientId(
            clientId
        )[0];
        const innerBlocks = parentBlocks?.innerBlocks;

        const { replaceInnerBlocks, updateBlockAttributes } = dispatch(
            "core/block-editor"
        );

        if (innerBlocks) {
            times(innerBlocks.length, (n) => {
                updateBlockAttributes(innerBlocks[n].clientId, {
                    overlayMenu: hamburgerMenu,
                });
            });
        }
    }, [hamburgerMenu]);

    const blockProps = useBlockProps({
        className: classnames(className, `eb-guten-block-main-parent-wrapper`),
    });

    //
    // styles related to generateTypographyStyles start ⬇
    const {
        typoStylesDesktop: navTypoStylesDesktop,
        typoStylesTab: navTypoStylesTab,
        typoStylesMobile: navTypoStylesMobile,
    } = generateTypographyStyles({
        attributes,
        prefixConstant: typoPrefixNav,
        defaultFontSize: 16,
    });

    const {
        typoStylesDesktop: navDropdownTypoStylesDesktop,
        typoStylesTab: navDropdownTypoStylesTab,
        typoStylesMobile: navDropdownTypoStylesMobile,
    } = generateTypographyStyles({
        attributes,
        prefixConstant: typoPrefixNavDropdown,
        defaultFontSize: 16,
    });

    const {
        typoStylesDesktop: navHamburgerTypoStylesDesktop,
        typoStylesTab: navHamburgerTypoStylesTab,
        typoStylesMobile: navHamburgerTypoStylesMobile,
    } = generateTypographyStyles({
        attributes,
        prefixConstant: typoPrefixNavHamburger,
        defaultFontSize: 16,
    });

    const {
        typoStylesDesktop: hamburgerBtnTypoStylesDesktop,
        typoStylesTab: hamburgerBtnTypoStylesTab,
        typoStylesMobile: hamburgerBtnTypoStylesMobile,
    } = generateTypographyStyles({
        attributes,
        prefixConstant: typoPrefixHamburgerBtn,
        defaultFontSize: 16,
    });
    // styles related to generateTypographyStyles end

    // styles related to generateBackgroundControlStyles start ⬇

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
        // noOverlay: true,
        // noMainBgi: true,
        // noOverlayBgi: true, // if 'noOverlay : true' is given then there's no need to give 'noOverlayBgi : true'
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
        dimensionStylesDesktop: navMarginDesktop,
        dimensionStylesTab: navMarginTab,
        dimensionStylesMobile: navMarginMobile,
    } = generateDimensionsControlStyles({
        attributes,
        controlName: prefixNavMargin,
        styleFor: "margin",
    });

    const {
        dimensionStylesDesktop: navPaddingDesktop,
        dimensionStylesTab: navPaddingTab,
        dimensionStylesMobile: navPaddingMobile,
    } = generateDimensionsControlStyles({
        attributes,
        controlName: prefixNavPadding,
        styleFor: "padding",
    });

    const {
        dimensionStylesDesktop: navDropdownPaddingDesktop,
        dimensionStylesTab: navDropdownPaddingTab,
        dimensionStylesMobile: navDropdownPaddingMobile,
    } = generateDimensionsControlStyles({
        attributes,
        controlName: prefixNavDropdownPadding,
        styleFor: "padding",
    });

    const {
        dimensionStylesDesktop: dropdownItemPaddingDesktop,
        dimensionStylesTab: dropdownItemPaddingTab,
        dimensionStylesMobile: dropdownItemPaddingMobile,
    } = generateDimensionsControlStyles({
        attributes,
        controlName: prefixDropdownItemPadding,
        styleFor: "padding",
    });

    const {
        dimensionStylesDesktop: hamburgerPaddingDesktop,
        dimensionStylesTab: hamburgerPaddingTab,
        dimensionStylesMobile: hamburgerPaddingMobile,
    } = generateDimensionsControlStyles({
        attributes,
        controlName: prefixNavHamburgerPadding,
        styleFor: "padding",
    });

    const {
        dimensionStylesDesktop: hamburgerItemPaddingDesktop,
        dimensionStylesTab: hamburgerItemPaddingTab,
        dimensionStylesMobile: hamburgerItemPaddingMobile,
    } = generateDimensionsControlStyles({
        attributes,
        controlName: prefixHamburgerItemPadding,
        styleFor: "padding",
    });

    const {
        dimensionStylesDesktop: hamburgerBtnPaddingDesktop,
        dimensionStylesTab: hamburgerBtnPaddingTab,
        dimensionStylesMobile: hamburgerBtnPaddingMobile,
    } = generateDimensionsControlStyles({
        attributes,
        controlName: prefixHamburgerBtnPadding,
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
        styesDesktop: navBdShdStyesDesktop,
        styesTab: navBdShdStyesTab,
        styesMobile: navBdShdStyesMobile,
        transitionStyle: navBdShdTransitionStyle,
    } = generateBorderShadowStyles({
        controlName: prefixNavBdShadow,
        attributes,
        // noShadow: true,
        // noBorder: true,
    });

    const {
        styesDesktop: navDropdownBdShdStyesDesktop,
        styesTab: navDropdownBdShdStyesTab,
        styesMobile: navDropdownBdShdStyesMobile,
    } = generateBorderShadowStyles({
        controlName: prefixNavDropdownBdShadow,
        attributes,
        // noShadow: true,
        // noBorder: true,
    });

    const {
        styesDesktop: navHamburgerItemBdShdStyesDesktop,
        styesTab: navHamburgerItemBdShdStyesTab,
        styesMobile: navHamburgerItemBdShdStyesMobile,
    } = generateBorderShadowStyles({
        controlName: prefixHamburgerItemBdShadow,
        attributes,
        // noShadow: true,
        // noBorder: true,
    });

    const {
        styesDesktop: dropdownItemBdShdStyesDesktop,
        styesTab: dropdownItemBdShdStyesTab,
        styesMobile: dropdownItemBdShdStyesMobile,
        stylesHoverDesktop: dropdownItemBdShdStylesHoverDesktop,
        stylesHoverTab: dropdownItemBdShdStylesHoverTab,
        stylesHoverMobile: dropdownItemBdShdStylesHoverMobile,
        transitionStyle: dropdownItemBdShdTransitionStyle,
    } = generateBorderShadowStyles({
        controlName: prefixDropdownItemBdShadow,
        attributes,
        // noShadow: true,
        // noBorder: true,
    });

    // styles related to generateBorderShadowStyles end

    // all common (editor&frontEnd) css styles for large screen width (desktop/laptop) in strings ⬇
    const desktopAllStylesCommon = softMinifyCssStrings(`

		.${blockId}.eb-advanced-navigation-wrapper .wp-block-navigation{
			${wrpMarginDesktop}
			${wrpPaddingDesktop}
			${wrpBackgroundStylesDesktop}
			${wrpBdShdStyesDesktop}
			transition: all .5s, ${wrpBgTransitionStyle}, ${wrpBdShdTransitionStyle};
		}

		.${blockId}.eb-advanced-navigation-wrapper .wp-block-navigation:hover{
			${wrpHoverBackgroundStylesDesktop}
			${wrpBdShdStylesHoverDesktop}
		}

		.${blockId}.eb-advanced-navigation-wrapper .wp-block-navigation:before{
			${wrpOverlayStylesDesktop}
			transition: all .5s, ${wrpOvlTransitionStyle};
		}

		.${blockId}.eb-advanced-navigation-wrapper .wp-block-navigation:hover:before{
			${wrpHoverOverlayStylesDesktop}
		}



		.${blockId}.eb-advanced-navigation-wrapper .wp-block-navigation-item{
			${navMarginDesktop}
			${navPaddingDesktop}
			transition: all .5s, ${navBdShdTransitionStyle};
		}

		.${blockId}.eb-advanced-navigation-wrapper .wp-block-navigation-item__content {
			${navTextColor ? `color:${navTextColor};` : ""}
			${navTypoStylesDesktop}

		}
		.${blockId}.eb-advanced-navigation-wrapper .wp-block-navigation-item:hover >.wp-block-navigation-item__content {
			${hvNavTextColor ? `color:${hvNavTextColor};` : ""}
		}

		.${blockId}.eb-advanced-navigation-wrapper .current-menu-item .wp-block-navigation-item__content {
			${actNavTextColor ? `color:${actNavTextColor};` : ""}
		}
		.${blockId}.eb-advanced-navigation-wrapper .current-menu-item:hover >.wp-block-navigation-item__content {
			${
                actHvNavTextColor
                    ? `color:${actHvNavTextColor};`
                    : `color:${hvNavTextColor};`
            }
		}

		${
            preset === "preset-2" && layout == "is-horizontal"
                ? `
				.${blockId}.eb-advanced-navigation-wrapper .wp-block-navigation-item:hover {
					${hvNavBgColor ? `background-color:${hvNavBgColor};` : ""}
				}

				.${blockId}.eb-advanced-navigation-wrapper .current-menu-item {
					${actNavBgColor ? `background-color:${actNavBgColor};` : ""}
				}
				.${blockId}.eb-advanced-navigation-wrapper .current-menu-item:hover {
					${actHvNavBgColor ? `background-color:${actHvNavBgColor};` : ""}
				}

				.${blockId}.eb-advanced-navigation-wrapper .wp-block-navigation__submenu-container .wp-block-navigation-item__content {
					${dropdownItemBgColor ? `background-color:${dropdownItemBgColor};` : ""}

				}

				.${blockId}.eb-advanced-navigation-wrapper .wp-block-navigation__submenu-container .wp-block-navigation-item:hover > .wp-block-navigation-item__content,
				.${blockId}.eb-advanced-navigation-wrapper .wp-block-navigation__submenu-container .wp-block-navigation__submenu-container .wp-block-navigation-item:hover > .wp-block-navigation-item__content {
					${hvDropdownItemBgColor ? `background-color:${hvDropdownItemBgColor};` : ""}
				}

				`
                : ""
        }

		${
            preset === "preset-3" && layout == "is-horizontal"
                ? `
				// .${blockId}.eb-advanced-navigation-wrapper .wp-block-navigation-item__content{

				// 	border-color: transparent;
				// }
				// .${blockId}.eb-advanced-navigation-wrapper.preset-3 .current-menu-item .wp-block-navigation-item__content,
				// .${blockId}.eb-advanced-navigation-wrapper.preset-3 .wp-block-navigation-item:hover .wp-block-navigation-item__content {
				// 	${navBdShdStyesDesktop}
				// }


				.${blockId}.eb-advanced-navigation-wrapper .wp-block-navigation__container > .wp-block-navigation-item.current-menu-item::before {
					${actNavBgColor ? `background-color:${actNavBgColor};` : ""}
					${navBdShdStyesDesktop}
				}
				.${blockId}.eb-advanced-navigation-wrapper .wp-block-navigation__container > .wp-block-navigation-item:hover::before {
					${hvNavBgColor ? `background-color:${hvNavBgColor};` : ""}
					${navBdShdStyesDesktop}
				}


				.${blockId}.eb-advanced-navigation-wrapper .wp-block-navigation-item:hover::before {
					${hvNavBgColor ? `background-color:${hvNavBgColor};` : ""}
					${navBdShdStyesDesktop}
				}

				.${blockId}.eb-advanced-navigation-wrapper .wp-block-navigation-item.current-menu-item::before {
					${actNavBgColor ? `background-color:${actNavBgColor};` : ""}
					${navBdShdStyesDesktop}

				}
				.${blockId}.eb-advanced-navigation-wrapper .wp-block-navigation-item.current-menu-item:hover::before  {
					${actHvNavBgColor ? `background-color:${actHvNavBgColor};` : ""}
				}

				.${blockId}.eb-advanced-navigation-wrapper .wp-block-navigation__submenu-container .wp-block-navigation-item__content {
					${dropdownItemBgColor ? `background-color:${dropdownItemBgColor};` : ""}

				}

				.${blockId}.eb-advanced-navigation-wrapper .wp-block-navigation__submenu-container .wp-block-navigation-item:hover > .wp-block-navigation-item__content,
				.${blockId}.eb-advanced-navigation-wrapper .wp-block-navigation__submenu-container .wp-block-navigation__submenu-container .wp-block-navigation-item:hover > .wp-block-navigation-item__content {
					${hvDropdownItemBgColor ? `background-color:${hvDropdownItemBgColor};` : ""}
				}

				`
                : ""
        }


		${
            preset === "preset-4" && layout == "is-horizontal"
                ? `
				.${blockId}.eb-advanced-navigation-wrapper .wp-block-navigation__responsive-container:not(.is-menu-open) .wp-block-navigation__container > .wp-block-navigation-item:not(:last-child)::after {
					${navDividerColor ? `background-color:${navDividerColor};` : ""}
				}

				.${blockId}.eb-advanced-navigation-wrapper .wp-block-navigation__submenu-container .wp-block-navigation-item {
					${navDropdownDividerColor ? `border-color:${navDropdownDividerColor};` : ""}
				}

				`
                : ""
        }

		${
            layout == "is-vertical" && verticalPreset === "vertical-preset-1"
                ? `
				.${blockId}.eb-advanced-navigation-wrapper.is-vertical.vertical-preset-1 .wp-block-navigation__responsive-container:not(.is-menu-open) .wp-block-navigation-item:not(:last-child) {
					border-bottom: 1px solid ${verticalNavDividerColor};

				}

			`
                : ""
        }

		${
            layout == "is-vertical" && verticalPreset === "vertical-preset-2"
                ? `
				.${blockId}.eb-advanced-navigation-wrapper .wp-block-navigation-item:hover {
					${hvNavBgColor ? `background-color:${hvNavBgColor};` : ""}
				}

				.${blockId}.eb-advanced-navigation-wrapper .current-menu-item {
					${actNavBgColor ? `background-color:${actNavBgColor};` : ""}
				}
				.${blockId}.eb-advanced-navigation-wrapper .current-menu-item:hover {
					${actHvNavBgColor ? `background-color:${actHvNavBgColor};` : ""}
				}

				.${blockId}.eb-advanced-navigation-wrapper .wp-block-navigation__submenu-container > .wp-block-navigation-item:hover,
				.${blockId}.eb-advanced-navigation-wrapper .wp-block-navigation__submenu-container .wp-block-navigation__submenu-container >.wp-block-navigation-item:hover {
					${hvDropdownItemBgColor ? `background-color:${hvDropdownItemBgColor};` : ""}
				}

			`
                : ""
        }


		.${blockId}.eb-advanced-navigation-wrapper .wp-block-navigation__submenu-container {
			${navDropdownPaddingDesktop}
			${navDropdownBgColor ? `background-color:${navDropdownBgColor};` : ""}
			${navDropdownBdShdStyesDesktop}
			min-width: ${dropdownW_Range}px !important;
			width: max-content!important;
			max-width: max-content!important;
		}

		.${blockId}.eb-advanced-navigation-wrapper .wp-block-navigation__submenu-container .wp-block-navigation-item {
			padding: 0;
		}

		.${blockId}.eb-advanced-navigation-wrapper .wp-block-navigation__submenu-container .wp-block-navigation-item__content {
			${navDropdownTypoStylesDesktop}
			${navDropdownTextColor ? `color:${navDropdownTextColor};` : ""}
			${dropdownItemPaddingDesktop}
			${dropdownItemBdShdStyesDesktop}

		}

		.${blockId}.eb-advanced-navigation-wrapper .wp-block-navigation__submenu-container .wp-block-navigation-item:hover > .wp-block-navigation-item__content,
		.${blockId}.eb-advanced-navigation-wrapper .wp-block-navigation__submenu-container .wp-block-navigation__submenu-container .wp-block-navigation-item:hover >.wp-block-navigation-item__content {
			${hvNavDropdownTextColor ? `color:${hvNavDropdownTextColor};` : ""}
		}


		.${blockId}.eb-advanced-navigation-wrapper .wp-block-navigation__submenu-icon {
			width: ${carZ_Range}px;
			height: ${carZ_Range}px;
			${caretColor ? `color:${caretColor};` : `color:${navTextColor};`}
		}

		.${blockId}.eb-advanced-navigation-wrapper .wp-block-navigation-item:hover .wp-block-navigation__submenu-icon {
			${hvCaretColor ? `color:${hvCaretColor};` : `color:${hvNavTextColor};`}
		}


		.${blockId}.eb-advanced-navigation-wrapper .wp-block-navigation__responsive-container-open {
			${navHamburgerBtnColor ? `color:${navHamburgerBtnColor};` : ""}
			${hamburgerBtnPaddingDesktop}
			${navBtnType ? "" : hamburgerBtnTypoStylesDesktop}
		}

		${
            navBtnType
                ? `
				.${blockId}.eb-advanced-navigation-wrapper .wp-block-navigation__responsive-container-open svg{
					width: ${hamburgerBtnZ_Range}px;
					height: ${hamburgerBtnZ_Range}px;
				}

			`
                : ""
        }


		.${blockId}.eb-advanced-navigation-wrapper .wp-block-navigation__responsive-container.is-menu-open {
			background-color: ${navHamburgerBgColor};
			${hamburgerPaddingDesktop}
		}

		.${blockId}.eb-advanced-navigation-wrapper .wp-block-navigation__responsive-container.is-menu-open .wp-block-navigation-item {
			width: 100%;
		}


		.${blockId}.eb-advanced-navigation-wrapper .wp-block-navigation__responsive-container.is-menu-open .wp-block-navigation-item__content{
			color: ${navHamburgerTextColor};
			background-color: transparent;
			${hamburgerItemPaddingDesktop}
			${navHamburgerTypoStylesDesktop}
			${navHamburgerItemBdShdStyesDesktop}
		}

		.${blockId}.eb-advanced-navigation-wrapper .wp-block-navigation__responsive-container.is-menu-open .wp-block-navigation-item:hover > .wp-block-navigation-item__content,
		.${blockId}.eb-advanced-navigation-wrapper .wp-block-navigation__responsive-container.is-menu-open .wp-block-navigation-item:hover .wp-block-navigation__submenu-container .wp-block-navigation-item:hover .wp-block-navigation-item__content  {
			color: ${hvNavHamburgerTextColor};

		}


		.${blockId}.eb-advanced-navigation-wrapper .wp-block-navigation__responsive-container.is-menu-open .wp-block-navigation-item:hover {
			background-color: ${hvHamburgerItemBgColor} !important;
		}

		.${blockId}.eb-advanced-navigation-wrapper .is-menu-open .wp-block-navigation-item.wp-block-navigation-submenu {
			background-color: ${hamburgerItemBgColor} !important;
		}

		.${blockId}.eb-advanced-navigation-wrapper .is-menu-open  .wp-block-navigation-item.wp-block-navigation-submenu .wp-block-navigation-item:hover {
			background-color: ${hvHamburgerItemBgColor} !important;
		}
		.${blockId}.eb-advanced-navigation-wrapper .is-menu-open .wp-block-navigation-item.wp-block-navigation-submenu .wp-block-navigation-item:hover .wp-block-navigation-item__content {
			background-color: transparent;
		}

		.${blockId}.eb-advanced-navigation-wrapper .is-menu-open .wp-block-navigation__responsive-container.is-menu-open .wp-block-navigation__submenu-container {
			width: auto !Important;
		}



		.${blockId}.eb-advanced-navigation-wrapper .is-menu-open .wp-block-navigation__responsive-container-close {
			color: ${hamburgerCloseIconColor};
		}


	`);

    // all common (editor&frontEnd) css styles for Tab in strings ⬇
    const tabAllStylesCommon = softMinifyCssStrings(`

		.${blockId}.eb-advanced-navigation-wrapper .wp-block-navigation{
			${wrpMarginTab}
			${wrpPaddingTab}
			${wrpBackgroundStylesTab}
			${wrpBdShdStyesTab}
		}

		.${blockId}.eb-advanced-navigation-wrapper .wp-block-navigation:hover{
			${wrpHoverBackgroundStylesTab}
			${wrpBdShdStylesHoverTab}
		}

		.${blockId}.eb-advanced-navigation-wrapper .wp-block-navigation:before{
			${wrpOverlayStylesTab}
		}

		.${blockId}.eb-advanced-navigation-wrapper .wp-block-navigation:hover:before{
			${wrpHoverOverlayStylesTab}
		}



		.${blockId}.eb-advanced-navigation-wrapper .wp-block-navigation-item{
			${navMarginTab}
			${navPaddingTab}
		}

		.${blockId}.eb-advanced-navigation-wrapper .wp-block-navigation-item__content {
			${navTypoStylesTab}

		}


		${
            preset === "preset-3" && layout == "is-horizontal"
                ? `


				.${blockId}.eb-advanced-navigation-wrapper .wp-block-navigation__container > .wp-block-navigation-item.current-menu-item::before {
					${navBdShdStyesTab}
				}
				.${blockId}.eb-advanced-navigation-wrapper .wp-block-navigation__container > .wp-block-navigation-item:hover::before {
					${navBdShdStyesTab}
				}


				.${blockId}.eb-advanced-navigation-wrapper .wp-block-navigation-item:hover::before {
					${navBdShdStyesTab}
				}

				.${blockId}.eb-advanced-navigation-wrapper .current-menu-item::before {
					${navBdShdStyesTab}

				}


				`
                : ""
        }

		.${blockId}.eb-advanced-navigation-wrapper .wp-block-navigation__submenu-container {
			${navDropdownPaddingTab}
			${navDropdownBdShdStyesTab}
			min-width: ${TABdropdownW_Range}px !important;
		}
		.${blockId}.eb-advanced-navigation-wrapper .wp-block-navigation__submenu-container .wp-block-navigation-item__content {
			${navDropdownTypoStylesTab}
			${dropdownItemPaddingTab}
			${dropdownItemBdShdStyesTab}

		}

		.${blockId}.eb-advanced-navigation-wrapper .wp-block-navigation__responsive-container-open {
			${hamburgerBtnPaddingTab}
			${navBtnType ? "" : hamburgerBtnTypoStylesTab}
		}

		.${blockId}.eb-advanced-navigation-wrapper .wp-block-navigation__submenu-icon {
			width: ${TABcarZ_Range}px;
			height: ${TABcarZ_Range}px;
		}

		.${blockId}.eb-advanced-navigation-wrapper .wp-block-navigation__responsive-container.is-menu-open .wp-block-navigation-item__content{
			${hamburgerItemPaddingTab}
			${navHamburgerTypoStylesTab}
			${navHamburgerItemBdShdStyesTab}
		}

		${
            navBtnType
                ? `
				.${blockId}.eb-advanced-navigation-wrapper .wp-block-navigation__responsive-container-open svg{
					width: ${TABhamburgerBtnZ_Range}px;
					height: ${TABhamburgerBtnZ_Range}px;
				}

			`
                : ""
        }

		.${blockId}.eb-advanced-navigation-wrapper .wp-block-navigation__responsive-container.is-menu-open {
			background-color: ${navHamburgerBgColor};
			${hamburgerPaddingTab}
		}

	`);

    // all common (editor&frontEnd) css styles for Mobile in strings ⬇
    const mobileAllStylesCommon = softMinifyCssStrings(`
	.${blockId}.eb-advanced-navigation-wrapper .wp-block-navigation{
		${wrpMarginMobile}
		${wrpPaddingMobile}
		${wrpBackgroundStylesMobile}
		${wrpBdShdStyesMobile}
	}

	.${blockId}.eb-advanced-navigation-wrapper .wp-block-navigation:hover{
		${wrpHoverBackgroundStylesMobile}
		${wrpBdShdStylesHoverMobile}
	}

	.${blockId}.eb-advanced-navigation-wrapper .wp-block-navigation:before{
		${wrpOverlayStylesMobile}
	}

	.${blockId}.eb-advanced-navigation-wrapper .wp-block-navigation:hover:before{
		${wrpHoverOverlayStylesMobile}
	}



	.${blockId}.eb-advanced-navigation-wrapper .wp-block-navigation-item{
		${navMarginMobile}
		${navPaddingMobile}
	}

	.${blockId}.eb-advanced-navigation-wrapper .wp-block-navigation-item__content {
		${navTypoStylesMobile}

	}


	${
        preset === "preset-3" && layout == "is-horizontal"
            ? `


			.${blockId}.eb-advanced-navigation-wrapper .wp-block-navigation__container > .wp-block-navigation-item.current-menu-item::before {
				${navBdShdStyesMobile}
			}
			.${blockId}.eb-advanced-navigation-wrapper .wp-block-navigation__container > .wp-block-navigation-item:hover::before {
				${navBdShdStyesMobile}
			}


			.${blockId}.eb-advanced-navigation-wrapper .wp-block-navigation-item:hover::before {
				${navBdShdStyesMobile}
			}

			.${blockId}.eb-advanced-navigation-wrapper .current-menu-item::before {
				${navBdShdStyesMobile}

			}

			`
            : ""
    }

	.${blockId}.eb-advanced-navigation-wrapper .wp-block-navigation__submenu-container {
		${navDropdownPaddingMobile}
		${navDropdownBdShdStyesMobile}
		min-width: ${MOBdropdownW_Range}px !important;
	}
	.${blockId}.eb-advanced-navigation-wrapper .wp-block-navigation__submenu-container .wp-block-navigation-item__content {
		${navDropdownTypoStylesMobile}
		${dropdownItemPaddingMobile}
		${dropdownItemBdShdStyesMobile}

	}

	.${blockId}.eb-advanced-navigation-wrapper .wp-block-navigation__responsive-container-open {
		${hamburgerBtnPaddingMobile}
		${navBtnType ? "" : hamburgerBtnTypoStylesMobile}
	}
	.${blockId}.eb-advanced-navigation-wrapper .wp-block-navigation__submenu-icon {
		width: ${MOBcarZ_Range}px;
		height: ${MOBcarZ_Range}px;
	}

	.${blockId}.eb-advanced-navigation-wrapper .wp-block-navigation__responsive-container.is-menu-open .wp-block-navigation-item__content{
		${hamburgerItemPaddingMobile}
		${navHamburgerTypoStylesMobile}
		${navHamburgerItemBdShdStyesMobile}
	}

	${
        navBtnType
            ? `
			.${blockId}.eb-advanced-navigation-wrapper .wp-block-navigation__responsive-container-open svg{
				width: ${MOBhamburgerBtnZ_Range}px;
				height: ${MOBhamburgerBtnZ_Range}px;
			}

		`
            : ""
    }

	.${blockId}.eb-advanced-navigation-wrapper .wp-block-navigation__responsive-container.is-menu-open {
		background-color: ${navHamburgerBgColor};
		${hamburgerPaddingMobile}
	}

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

    if (layout == "is-horizontal") {
        var layoutPreset = preset;
    } else {
        var layoutPreset = verticalPreset;
    }

    return (
        <>
            {isSelected && (
                <Inspector
                    clientId={clientId}
                    attributes={attributes}
                    setAttributes={setAttributes}
                />
            )}
            <div {...blockProps}>
                <style>
                    {`

				a.info-click-link{
					pointer-events: none;
				}


				${desktopAllStylesCommon}

				/* mimmikcssStart */

				${resOption === "Tablet" ? tabAllStylesCommon : " "}
				${resOption === "Mobile" ? tabAllStylesCommon + mobileAllStylesCommon : " "}

				/* mimmikcssEnd */

				@media all and (max-width: 1024px) {

					/* tabcssStart */
					${tabAllStylesCommon}
					/* tabcssEnd */

				}

				@media all and (max-width: 767px) {

					/* mobcssStart */
					${mobileAllStylesCommon}
					/* mobcssEnd */

				}
				`}
                </style>

                <div
                    className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`}
                >
                    <div
                        className={`${blockId} eb-advanced-navigation-wrapper ${layout} ${layoutPreset} ${
                            layout == "is-horizontal"
                                ? navAlign
                                : navVerticalAlign
                        } ${showDropdownIcon ? "" : "remove-dropdown-icon"} ${
                            navBtnType === true
                                ? "responsive-icon"
                                : "responsive-text"
                        } ${hamburgerCloseIconAlign}`}
                    >
                        <div className={`eb-nav-contents`}>
                            <InnerBlocks
                                templateLock={false}
                                template={[
                                    [
                                        "core/navigation",
                                        { className: `${layout} ${navAlign}` },
                                    ],
                                ]}
                                allowedBlocks={["core/navigation"]}
                                renderAppender={
                                    select("core/block-editor").getBlock(
                                        clientId
                                    )?.innerBlocks.length < 1
                                        ? InnerBlocks.ButtonBlockAppender
                                        : false
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Edit;
