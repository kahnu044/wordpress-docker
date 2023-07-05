/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useEffect, useState } from "@wordpress/element";
import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";
import { Button } from "@wordpress/components";
import { select, dispatch } from "@wordpress/data";
import { createBlock } from "@wordpress/blocks";

const ALLOWED_BLOCKS = ["essential-blocks/accordion-item"];

const {
    softMinifyCssStrings,
    generateBackgroundControlStyles,
    generateDimensionsControlStyles,
    generateTypographyStyles,
    generateBorderShadowStyles,
    generateResponsiveRangeStyles,
    // mimmikCssForPreviewBtnClick,
    duplicateBlockIdFix,
} = window.EBControls;

import {
    typoPrefix_title,
    typoPrefix_content,
} from "./constants/typographyPrefixConstants";

import { rangeIconSize, accGapRange } from "./constants/rangeNames";

import {
    wrapMarginConst,
    wrapPaddingConst,
    iconMarginConst,
    iconPaddingConst,
    tabMarginConst,
    tabPaddingConst,
    conMarginConst,
    conPaddingConst,
} from "./constants/dimensionsConstants";

import {
    WrpBgConst,
    iconBgConst,
    tabBgConst,
    conBgConst,
} from "./constants/backgroundsConstants";

import {
    WrpBdShadowConst,
    iconBdShadowConst,
    tabBdShadowConst,
    conBdShadowConst,
} from "./constants/borderShadowConstants";

/**
 * Internal dependencies
 */
import classnames from "classnames";
import Inspector from "./inspector";
import { times } from "lodash";

const Edit = (props) => {
    const {
        attributes,
        setAttributes,
        className,
        isSelected,
        clientId,
    } = props;
    const {
        resOption,
        blockId,
        blockMeta,
        classHook,

        //
        accordionType,
        displayIcon,
        transitionDuration,
        tabIcon,
        expandedIcon,
        titleColor = "#fff",
        contentColor = "#555",
        contentAlign = "left",
        iconColor = "#4a5059",
        iconPosition,
        titleAlignment,
        hoverTitleColor,
        activeBgColor,
        activeTitleColor,
        tagName,
        faqSchema,

        //
        icnZ_Range,
        TABicnZ_Range,
        MOBicnZ_Range,
        accordionChildCount,
    } = attributes;

    // this useEffect is for creating a unique blockId for each block's unique className
    useEffect(() => {
        const BLOCK_PREFIX = "eb-accordion";
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

    const addAccordion = () => {
        const innerBlocks = [
            ...select("core/block-editor").getBlocks(clientId),
        ];
        let count = innerBlocks ? innerBlocks.length : 3;

        const newBlock = createBlock("essential-blocks/accordion-item", {
            itemId: count + 1,
            inheritedAccordionType: accordionType,
            inheritedTagName: tagName,
            inheritedDisplayIcon: displayIcon,
            inheritedTabIcon: tabIcon,
            inheritedExpandedIcon: expandedIcon,
            parentBlockId: blockId,
        });
        innerBlocks.splice(innerBlocks.length, 0, newBlock);
        dispatch("core/block-editor")
            .replaceInnerBlocks(clientId, innerBlocks)
            .then(() => {
                setAttributes({ accordionChildCount: count + 1 });
            });
    };

    useEffect(() => {
        if (!tabIcon) {
            setAttributes({ tabIcon: "fas fa-angle-right" });
        }
        if (!expandedIcon) {
            setAttributes({ expandedIcon: "fas fa-angle-down" });
        }
        const parentBlocks = select("core/block-editor").getBlocksByClientId(
            clientId
        )[0];

        const innerBlocks = parentBlocks?.innerBlocks;

        const { updateBlockAttributes } = dispatch("core/block-editor");

        if (innerBlocks) {
            times(innerBlocks.length, (n) => {
                updateBlockAttributes(innerBlocks[n].clientId, {
                    itemId: n + 1,
                    inheritedAccordionType: accordionType,
                    inheritedDisplayIcon: displayIcon,
                    inheritedTabIcon: tabIcon,
                    inheritedExpandedIcon: expandedIcon,
                    inheritedTagName: tagName,
                    faqSchema: faqSchema,
                    parentBlockId: parentBlocks.attributes.blockId,
                });
            });
        }
    }, []);

    const insertAccodionItem = (accordionChildCount) => {
        return times(accordionChildCount, (n) => [
            "essential-blocks/accordion-item",
            {
                itemId: n + 1,
                inheritedAccordionType: accordionType,
                inheritedDisplayIcon: displayIcon,
                inheritedTabIcon: "fas fa-angle-right",
                inheritedExpandedIcon: "fas fa-angle-down",
                inheritedTagName: tagName,
                faqSchema: faqSchema,
            },
        ]);
    };

    // styles related to generateTypographyStyles start ⬇
    const {
        typoStylesDesktop: titleTypoStylesDesktop,
        typoStylesTab: titleTypoStylesTab,
        typoStylesMobile: titleTypoStylesMobile,
    } = generateTypographyStyles({
        attributes,
        prefixConstant: typoPrefix_title,
        defaultFontSize: 18,
    });

    const {
        typoStylesDesktop: contentTypoStylesDesktop,
        typoStylesTab: contentTypoStylesTab,
        typoStylesMobile: contentTypoStylesMobile,
    } = generateTypographyStyles({
        attributes,
        prefixConstant: typoPrefix_content,
        defaultFontSize: 14,
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
        controlName: WrpBgConst,
        // noOverlay: true,
        // noMainBgi: true,
        // noOverlayBgi: true, // if 'noOverlay : true' is given then there's no need to give 'noOverlayBgi : true'
    });

    const {
        backgroundStylesDesktop: iconBackgroundStylesDesktop,
        hoverBackgroundStylesDesktop: iconHoverBackgroundStylesDesktop,
        bgTransitionStyle: iconBgTransitionStyle,
    } = generateBackgroundControlStyles({
        attributes,
        controlName: iconBgConst,
        noOverlay: true,
        noMainBgi: true,
        // noOverlayBgi: true, // if 'noOverlay : true' is given then there's no need to give 'noOverlayBgi : true'
    });

    const {
        backgroundStylesDesktop: tabBackgroundStylesDesktop,
        hoverBackgroundStylesDesktop: tabHoverBackgroundStylesDesktop,
        bgTransitionStyle: tabBgTransitionStyle,
    } = generateBackgroundControlStyles({
        attributes,
        controlName: tabBgConst,
        noOverlay: true,
        noMainBgi: true,
        // noOverlayBgi: true, // if 'noOverlay : true' is given then there's no need to give 'noOverlayBgi : true'
    });

    const {
        backgroundStylesDesktop: conBackgroundStylesDesktop,
        hoverBackgroundStylesDesktop: conHoverBackgroundStylesDesktop,
        bgTransitionStyle: conBgTransitionStyle,
    } = generateBackgroundControlStyles({
        attributes,
        controlName: conBgConst,
        noOverlay: true,
        noMainBgi: true,
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
        controlName: wrapMarginConst,
        styleFor: "margin",
    });

    const {
        dimensionStylesDesktop: wrpPaddingDesktop,
        dimensionStylesTab: wrpPaddingTab,
        dimensionStylesMobile: wrpPaddingMobile,
    } = generateDimensionsControlStyles({
        attributes,
        controlName: wrapPaddingConst,
        styleFor: "padding",
    });

    const {
        dimensionStylesDesktop: iconMarginDesktop,
        dimensionStylesTab: iconMarginTab,
        dimensionStylesMobile: iconMarginMobile,
    } = generateDimensionsControlStyles({
        attributes,
        controlName: iconMarginConst,
        styleFor: "margin",
    });

    const {
        dimensionStylesDesktop: iconPaddingDesktop,
        dimensionStylesTab: iconPaddingTab,
        dimensionStylesMobile: iconPaddingMobile,
    } = generateDimensionsControlStyles({
        attributes,
        controlName: iconPaddingConst,
        styleFor: "padding",
    });

    const {
        dimensionStylesDesktop: tabMarginDesktop,
        dimensionStylesTab: tabMarginTab,
        dimensionStylesMobile: tabMarginMobile,
    } = generateDimensionsControlStyles({
        attributes,
        controlName: tabMarginConst,
        styleFor: "margin",
    });

    const {
        dimensionStylesDesktop: tabPaddingDesktop,
        dimensionStylesTab: tabPaddingTab,
        dimensionStylesMobile: tabPaddingMobile,
    } = generateDimensionsControlStyles({
        attributes,
        controlName: tabPaddingConst,
        styleFor: "padding",
    });

    const {
        dimensionStylesDesktop: conMarginDesktop,
        dimensionStylesTab: conMarginTab,
        dimensionStylesMobile: conMarginMobile,
    } = generateDimensionsControlStyles({
        attributes,
        controlName: conMarginConst,
        styleFor: "margin",
    });

    const {
        dimensionStylesDesktop: conPaddingDesktop,
        dimensionStylesTab: conPaddingTab,
        dimensionStylesMobile: conPaddingMobile,
    } = generateDimensionsControlStyles({
        attributes,
        controlName: conPaddingConst,
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
        controlName: WrpBdShadowConst,
        attributes,
        // noShadow: true,
        // noBorder: true,
    });

    const {
        styesDesktop: iconBdShdStyesDesktop,
        styesTab: iconBdShdStyesTab,
        styesMobile: iconBdShdStyesMobile,
        stylesHoverDesktop: iconBdShdStylesHoverDesktop,
        stylesHoverTab: iconBdShdStylesHoverTab,
        stylesHoverMobile: iconBdShdStylesHoverMobile,
        transitionStyle: iconBdShdTransitionStyle,
    } = generateBorderShadowStyles({
        controlName: iconBdShadowConst,
        attributes,
        // noShadow: true,
        // noBorder: true,
    });

    const {
        styesDesktop: tabBdShdStyesDesktop,
        styesTab: tabBdShdStyesTab,
        styesMobile: tabBdShdStyesMobile,
        stylesHoverDesktop: tabBdShdStylesHoverDesktop,
        stylesHoverTab: tabBdShdStylesHoverTab,
        stylesHoverMobile: tabBdShdStylesHoverMobile,
        transitionStyle: tabBdShdTransitionStyle,
    } = generateBorderShadowStyles({
        controlName: tabBdShadowConst,
        attributes,
        // noShadow: true,
        // noBorder: true,
    });

    const {
        styesDesktop: conBdShdStyesDesktop,
        styesTab: conBdShdStyesTab,
        styesMobile: conBdShdStyesMobile,
        stylesHoverDesktop: conBdShdStylesHoverDesktop,
        stylesHoverTab: conBdShdStylesHoverTab,
        stylesHoverMobile: conBdShdStylesHoverMobile,
        transitionStyle: conBdShdTransitionStyle,
    } = generateBorderShadowStyles({
        controlName: conBdShadowConst,
        attributes,
        // noShadow: true,
        // noBorder: true,
    });
    // styles related to generateBorderShadowStyles end

    const {
        rangeStylesDesktop: iconSizeDesktop,
        rangeStylesTab: iconSizeTab,
        rangeStylesMobile: iconSizeMobile,
    } = generateResponsiveRangeStyles({
        controlName: rangeIconSize,
        customUnit: "px",
        property: "font-size",
        attributes,
    });

    const {
        rangeStylesDesktop: accGapDesktop,
        rangeStylesTab: accGapTab,
        rangeStylesMobile: accGapMobile,
    } = generateResponsiveRangeStyles({
        controlName: accGapRange,
        customUnit: "px",
        property: "padding-top",
        attributes,
    });
    // styles related to generateResponsiveRangeStyles end

    const wrapperStylesDesktop = `

	.eb-accordion-item.is-selected .eb-accordion-content-wrapper {
		height:auto;
		opacity: 0;
		overflow: visible;
	}

	.eb-accordion-container.eb_accdn_loaded .eb-accordion-wrapper:not(.for_edit_page) .eb-accordion-content-wrapper{
		visibility:visible;
		position:static;
	}

	.eb-accordion-container .eb-accordion-wrapper:not(.for_edit_page) .eb-accordion-content-wrapper{
		visibility:hidden;
		position:absolute;
	}

	.${blockId}.eb-accordion-container .eb-accordion-inner{
		position:relative;
	}

	.${blockId}.eb-accordion-container .eb-accordion-wrapper h1,
	.${blockId}.eb-accordion-container .eb-accordion-wrapper h2,
	.${blockId}.eb-accordion-container .eb-accordion-wrapper h3,
	.${blockId}.eb-accordion-container .eb-accordion-wrapper h4,
	.${blockId}.eb-accordion-container .eb-accordion-wrapper h5,
	.${blockId}.eb-accordion-container .eb-accordion-wrapper h6,
	.${blockId}.eb-accordion-container .eb-accordion-wrapper p{
		margin:0;
		padding:0;
	}


	.${blockId}.eb-accordion-container .eb-accordion-wrapper + .eb-accordion-wrapper{
		${accGapDesktop}
	}


	.${blockId}.eb-accordion-container{
		${wrpMarginDesktop}
		${wrpPaddingDesktop}
		${wrpBackgroundStylesDesktop}
		${wrpBdShdStyesDesktop}
		transition:${wrpBgTransitionStyle}, ${wrpBdShdTransitionStyle};
		overflow:hidden;
	}

	.${blockId}.eb-accordion-container:hover{
		${wrpHoverBackgroundStylesDesktop}
		${wrpBdShdStylesHoverDesktop}
	}

	.${blockId}.eb-accordion-container:before{
		${wrpOverlayStylesDesktop}
		transition:${wrpOvlTransitionStyle};
	}

	.${blockId}.eb-accordion-container:hover:before{
		${wrpHoverOverlayStylesDesktop}
	}


${
    displayIcon
        ? `
		.${blockId}.eb-accordion-container .eb-accordion-icon-wrapper{
			display: flex;
			justify-content: center;
			align-items: center;
			${iconMarginDesktop}
			${iconPaddingDesktop}
			${iconBackgroundStylesDesktop}
			${iconBdShdStyesDesktop}
			transition:${iconBgTransitionStyle}, ${iconBdShdTransitionStyle};
		}


		.${blockId}.eb-accordion-container .eb-accordion-icon-wrapper:hover{
			${iconHoverBackgroundStylesDesktop}
			${iconBdShdStylesHoverDesktop}
		}

		.${blockId}.eb-accordion-container .eb-accordion-icon{
			text-align:center;
			color: ${iconColor};
			${iconSizeDesktop}
			${icnZ_Range ? `width:${icnZ_Range}px;` : ""}
		}

		`
        : ""
}

	.${blockId}.eb-accordion-container .eb-accordion-title-wrapper {
		cursor: pointer;
		display: flex;
		align-items: center;
		flex-direction: ${
            iconPosition === "right" && displayIcon ? "row-reverse" : "row"
        };
		${tabBackgroundStylesDesktop}
		${tabMarginDesktop}
		${tabPaddingDesktop}
		${tabBdShdStyesDesktop}
		transition:${tabBgTransitionStyle}, ${tabBdShdTransitionStyle};
	}


	.${blockId}.eb-accordion-container .eb-accordion-title-wrapper:hover{
		${tabHoverBackgroundStylesDesktop}
		${tabBdShdStylesHoverDesktop}
	}


	.${blockId}.eb-accordion-container .eb-accordion-title{
		text-align:${titleAlignment || "left"};
		flex:1;
		color:${titleColor};
		${titleTypoStylesDesktop}
	}

${
    activeTitleColor
        ? `
	.${blockId}.eb-accordion-container .eb-accordion-wrapper:not(.eb-accordion-hidden,.for_edit_page) h3.eb-accordion-title,
	.${blockId}.eb-accordion-container .eb-accordion-wrapper.expanded_tab h3.eb-accordion-title{
		${activeTitleColor ? `color: ${activeTitleColor} !important;` : ""}
	}
	`
        : ""
}

${
    activeBgColor
        ? `
	.${blockId}.eb-accordion-container .eb-accordion-wrapper:not(.eb-accordion-hidden,.for_edit_page) .eb-accordion-title-wrapper,
	.${blockId}.eb-accordion-container .eb-accordion-wrapper.expanded_tab .eb-accordion-title-wrapper{
		${
            activeBgColor
                ? `background-color: ${activeBgColor} !important; background-image: unset`
                : ""
        }
	}
	`
        : ""
}

	${
        hoverTitleColor
            ? `
			.${blockId}.eb-accordion-container .eb-accordion-title-wrapper:hover .eb-accordion-title{
				color:${hoverTitleColor};
			}
			`
            : ""
    }

	.${blockId}.eb-accordion-container .eb-accordion-content-wrapper{
		overflow: hidden !important;
		transition: height ${transitionDuration || 0}s ease-out;
	}

	.${blockId}.eb-accordion-container .eb-accordion-content-wrapper .eb-accordion-content{
		color:${contentColor};
		text-align:${contentAlign};
		${conBackgroundStylesDesktop}
		${contentTypoStylesDesktop}
		${conMarginDesktop}
		${conPaddingDesktop}
		${conBdShdStyesDesktop}
		transition:${conBdShdTransitionStyle}, ${conBgTransitionStyle};
	}

	.${blockId}.eb-accordion-container .eb-accordion-content-wrapper:hover .eb-accordion-content{
		${conHoverBackgroundStylesDesktop}
		${conBdShdStylesHoverDesktop}
	}

	`;

    const wrapperStylesTab = `

	.${blockId}.eb-accordion-container .eb-accordion-wrapper + .eb-accordion-wrapper{
		${accGapTab}
	}


	.${blockId}.eb-accordion-container{
		${wrpMarginTab}
		${wrpPaddingTab}
		${wrpBackgroundStylesTab}
		${wrpBdShdStyesTab}
	}

	.${blockId}.eb-accordion-container:hover{
		${wrpHoverBackgroundStylesTab}
		${wrpBdShdStylesHoverTab}
	}

	.${blockId}.eb-accordion-container:before{
		${wrpOverlayStylesTab}
	}

	.${blockId}.eb-accordion-container:hover:before{
		${wrpHoverOverlayStylesTab}
	}



${
    displayIcon
        ? `
		.${blockId}.eb-accordion-container .eb-accordion-icon-wrapper{
			${iconMarginTab}
			${iconPaddingTab}
			${iconBdShdStyesTab}
		}


		.${blockId}.eb-accordion-container .eb-accordion-icon-wrapper:hover{
			${iconBdShdStylesHoverTab}
		}

		.${blockId}.eb-accordion-container .eb-accordion-icon{
			${iconSizeTab}
			${TABicnZ_Range ? `width:${TABicnZ_Range}px;` : ""}
		}

		`
        : ""
}



	.${blockId}.eb-accordion-container .eb-accordion-title-wrapper {
		${tabMarginTab}
		${tabPaddingTab}
		${tabBdShdStyesTab}
	}


	.${blockId}.eb-accordion-container .eb-accordion-title-wrapper:hover{
		${tabBdShdStylesHoverTab}
	}

	.${blockId}.eb-accordion-container .eb-accordion-title{
		${titleTypoStylesTab}
	}



	.${blockId}.eb-accordion-container .eb-accordion-content-wrapper .eb-accordion-content{
		${contentTypoStylesTab}
		${conMarginTab}
		${conPaddingTab}
		${conBdShdStyesTab}
	}

	.${blockId}.eb-accordion-container .eb-accordion-content-wrapper:hover .eb-accordion-content{
		${conBdShdStylesHoverTab}
	}



	`;

    const wrapperStylesMobile = `

	.${blockId}.eb-accordion-container .eb-accordion-wrapper + .eb-accordion-wrapper{
		${accGapMobile}
	}

	.${blockId}.eb-accordion-container{
		${wrpMarginMobile}
		${wrpPaddingMobile}
		${wrpBackgroundStylesMobile}
		${wrpBdShdStyesMobile}
	}

	.${blockId}.eb-accordion-container:hover{
		${wrpHoverBackgroundStylesMobile}
		${wrpBdShdStylesHoverMobile}
	}

	.${blockId}.eb-accordion-container:before{
		${wrpOverlayStylesMobile}
	}

	.${blockId}.eb-accordion-container:hover:before{
		${wrpHoverOverlayStylesMobile}
	}



	${
        displayIcon
            ? `
			.${blockId}.eb-accordion-container .eb-accordion-icon-wrapper{
				${iconMarginMobile}
				${iconPaddingMobile}
				${iconBdShdStyesMobile}
			}

			.${blockId}.eb-accordion-container .eb-accordion-icon-wrapper:hover{
				${iconBdShdStylesHoverMobile}
			}

			.${blockId}.eb-accordion-container .eb-accordion-icon{
				${iconSizeMobile}
				${MOBicnZ_Range ? `width:${MOBicnZ_Range}px;` : ""}
			}

			`
            : ""
    }


	.${blockId}.eb-accordion-container .eb-accordion-title-wrapper {
		${tabMarginMobile}
		${tabPaddingMobile}
		${tabBdShdStyesMobile}
	}


	.${blockId}.eb-accordion-container .eb-accordion-title-wrapper:hover{
		${tabBdShdStylesHoverMobile}
	}

	.${blockId}.eb-accordion-container .eb-accordion-title{
		${titleTypoStylesMobile}
	}

	.${blockId}.eb-accordion-container .eb-accordion-content-wrapper .eb-accordion-content{
		${contentTypoStylesMobile}
		${conMarginMobile}
		${conPaddingMobile}
		${conBdShdStyesMobile}
	}

	.${blockId}.eb-accordion-container .eb-accordion-content-wrapper:hover .eb-accordion-content{
		${conBdShdStylesHoverMobile}
	}
	`;

    // all css styles for large screen width (desktop/laptop) in strings ⬇
    const desktopAllStyles = softMinifyCssStrings(`
		${wrapperStylesDesktop}
	`);

    // all css styles for Tab in strings ⬇
    const tabAllStyles = softMinifyCssStrings(`
		${wrapperStylesTab}
	`);

    // all css styles for Mobile in strings ⬇
    const mobileAllStyles = softMinifyCssStrings(`
		${wrapperStylesMobile}
	`);

    //
    // styling codes End here
    //

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

    return (
        <>
            {isSelected && <Inspector {...props} addAccordion={addAccordion} />}
            <div {...blockProps}>
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

                <div
                    className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`}
                >
                    <div className={`${blockId} eb-accordion-container`}>
                        <div className="eb-accordion-inner">
                            <InnerBlocks
                                template={insertAccodionItem(
                                    accordionChildCount
                                )}
                                templateLock={false}
                                allowedBlocks={ALLOWED_BLOCKS}
                            />
                        </div>
                    </div>
                    <div className="eb-accordion-add-button">
                        <Button
                            className="is-default"
                            label={__("Add Accordion Item", "essential-blocks")}
                            icon="plus-alt"
                            onClick={addAccordion}
                        >
                            <span className="eb-accordion-add-button-label">
                                {__("Add Accordion Item", "essential-blocks")}
                            </span>
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Edit;
