/**
 * WordPress dependencies
 */
import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";
import { useEffect, useRef, useState } from "@wordpress/element";
import { select, useSelect, dispatch } from "@wordpress/data";

/**
 * Internal depenencies
 */
import classnames from "classnames";

import Inspector from "./inspector";

//
const {
    //
    softMinifyCssStrings,
    generateDimensionsControlStyles,
    generateBackgroundControlStyles,
    generateResponsiveRangeStyles,
    generateBorderShadowStyles,
    // mimmikCssForPreviewBtnClick,
    duplicateBlockIdFix,

    generateResponsiveSelectControlStyles,
} = window.EBControls;

import {
    wrapperWidth,
    columnOrderPrefix,
} from "./constants/rangeNames";

import {
    cWrapMarginConst,
    cWrapPaddingConst,
} from "./constants/dimensionsNames";
import { WrpBgConst } from "./constants/backgroundsConstants";
import { WrpBdShadowConst } from "./constants/borderShadowConstants";
import { rowOverflowPrefix } from "./constants/selectControlPrefixs";

export default function Edit(props) {
    const { attributes, setAttributes, className, clientId, isSelected } = props;
    const {
        blockId,
        blockMeta,
        // responsive control attribute ⬇
        resOption,
        [`${wrapperWidth}Range`]: desktopRange,
        [`TAB${wrapperWidth}Range`]: tabWidthRange,
        [`MOB${wrapperWidth}Range`]: mobileWidthRange,
        [`${columnOrderPrefix}Range`]: columnOrderDesktop,
        [`TAB${columnOrderPrefix}Range`]: columnOrderTab,
        [`MOB${columnOrderPrefix}Range`]: columnOrderMobile,
        colAli,
        rowOverFlow,
        classHook,
    } = attributes;

    //
    const [showWidthTooltip, setShowWidthTooltip] = useState(false);
    const [nextColWDhByUseState, setNextColWDhByUseState] = useState(0);

    const [
        initBlockInsertionPointIndex,
        setInitBlockInsertionPointIndex,
    ] = useState(0);
    const [initColWidth, setInitColWidth] = useState(0);
    const [initNextColWidth, setInitNextColWidth] = useState(0);
    const [initPrevColWidth, setInitPrevColWidth] = useState(0);
    const [nextBlockClientId, setNextBlockClientId] = useState(false);
    const [prevBlockClientId, setPrevBlockClientId] = useState(false);

    //
    const colWrap = useRef(null);
    const draggerRef = useRef(null);

    //
    useEffect(() => {
        const nextColClientId =
            select("core/block-editor").getAdjacentBlockClientId(clientId) || false;

        const nextColumnDesktopWidth = nextColClientId
            ? select("core/block-editor").getBlockAttributes(nextColClientId).cw_Range
            : 0;

        //
        const prevColClientId =
            select("core/block-editor").getPreviousBlockClientId(clientId) || false;

        const prevColumnDesktopWidth = prevColClientId
            ? select("core/block-editor").getBlockAttributes(prevColClientId).cw_Range
            : 0;

        //
        const blockInsertionPoint = select(
            "core/block-editor"
        ).getBlockInsertionPoint(clientId);

        const insertionIndex = blockInsertionPoint.index;

        setNextColWDhByUseState(nextColumnDesktopWidth);
        setInitBlockInsertionPointIndex(insertionIndex);
        setInitColWidth(desktopRange);
        setNextBlockClientId(nextColClientId);
        setPrevBlockClientId(prevColClientId);
        setInitNextColWidth(nextColumnDesktopWidth);
        setInitPrevColWidth(prevColumnDesktopWidth);
    }, [initBlockInsertionPointIndex]);

    const blockInsertionIndex = select(
        "core/block-editor"
    ).getBlockInsertionPoint(clientId).index;

    if (blockInsertionIndex !== initBlockInsertionPointIndex) {
        setInitBlockInsertionPointIndex(blockInsertionIndex);
    }

    const [isColumnOrder_Custom_Desktop, setIsParentColumnOrderDesktop] = useState(false);
    const [isColumnOrder_Custom_Tab, setIsParentColumnOrderTab] = useState(false);
    const [isColumnOrder_Custom_Mobile, setIsParentColumnOrderMobile] = useState(false);

    const [columnGap, setColumnGap] = useState({
        desktop: 0,
        tab: 0,
        mobile: 0,
    });

    const [columnNumber, setColumnNumber] = useState({
        desktop: 1,
        tab: 1,
        mobile: 1,
    });

    //Get Parent Block "Column Order" Settings
    const parentBlocks = select("core/block-editor").getBlockParents(clientId);
    const parentBlockData = useSelect((select) => select("core/block-editor").getBlock(parentBlocks[parentBlocks.length - 1]));

    useEffect(() => {
        if (!parentBlockData || !parentBlockData.attributes) {
            return false;
        }
        const {
            colOrder_Option,
            TABcolOrder_Option,
            MOBcolOrder_Option,
            clGp_Range,
            TABclGp_Range,
            MOBclGp_Range,
            clNum_Range,
            TABclNum_Range,
            MOBclNum_Range,
        } = parentBlockData.attributes;

        setIsParentColumnOrderDesktop(colOrder_Option === 'custom' ? true : false);
        setIsParentColumnOrderTab(TABcolOrder_Option === 'custom' ? true : false);
        setIsParentColumnOrderMobile(MOBcolOrder_Option === 'custom' ? true : false);

        //Get Parent Block "Column Gap" Settings
        setColumnGap({
            desktop: clGp_Range,
            tab: TABclGp_Range,
            mobile: MOBclGp_Range,
        });

        //Get Parent Block "Column Number" Settings
        setColumnNumber({
            desktop: clNum_Range,
            tab: TABclNum_Range || 2,
            mobile: MOBclNum_Range || 1,
        });
    }, [parentBlockData]);

    // this useEffect is for creating a unique id for each block's unique className by a random unique number
    useEffect(() => {
        const BLOCK_PREFIX = "eb-column";
        duplicateBlockIdFix({
            BLOCK_PREFIX,
            blockId,
            setAttributes,
            select,
            clientId,
        });
    }, []);

    const blockProps = useBlockProps({
        className: classnames(
            className,
            `eb-guten-block-main-parent-wrapper eb-column-editor-wrap eb-column-editor-wrap-${blockId}`
        ),
    });

    //Calculate Gap for Responsiveness
    const calculateGap = (gap = columnGap.desktop, columnNumber) => {

        let columnGap = columnNumber;
        if (columnGap > 1) {
            columnGap = columnNumber - 1;
        }
        return (gap * columnGap) / columnNumber;
    }

    //
    useEffect(() => {
        const elColWrap = colWrap.current;
        const elDragger = draggerRef.current;
        if (elDragger && elColWrap) {
            let colWidthInPx = 0;
            let pcent_px_ratio = 0;

            elDragger.addEventListener("mousedown", handleMouseDown);

            function handleMouseDown(e) {
                //
                const nearestRow = select("core/block-editor").getBlock(
                    select("core/block-editor").getBlockParents(clientId).slice(-1)[0]
                );

                const allSiblingsCol = nearestRow.innerBlocks;

                const totalWidth = allSiblingsCol.reduce(
                    (total, curr) => {
                        return {
                            attributes: {
                                cw_Range: total.attributes.cw_Range + curr.attributes.cw_Range,
                            },
                        };
                    },
                    { attributes: { cw_Range: 0 } }
                ).attributes.cw_Range;

                let nextColumnDesktopWidth = nextBlockClientId
                    ? select("core/block-editor").getBlockAttributes(nextBlockClientId)
                        .cw_Range
                    : 0;

                let desktopColW = desktopRange;
                let widestColClientId = "";

                if (totalWidth !== 100) {
                    const widestCol = {
                        ...allSiblingsCol.reduce(
                            (total, curr) => {
                                if (total.attributes.cw_Range < curr.attributes.cw_Range) {
                                    return curr;
                                } else {
                                    return total;
                                }
                            },
                            { attributes: { cw_Range: 0 } }
                        ),
                    };

                    widestColClientId = widestCol.clientId;

                    const updatedWidth = widestCol.attributes.cw_Range + 100 - totalWidth;

                    if (widestColClientId === clientId) {
                        setAttributes({ cw_Range: updatedWidth });
                        setInitColWidth(updatedWidth);
                        desktopColW = updatedWidth;
                    } else {
                        dispatch("core/block-editor").updateBlockAttributes(
                            widestColClientId,
                            {
                                cw_Range: updatedWidth,
                            }
                        );
                        if (widestColClientId === nextBlockClientId) {
                            nextColumnDesktopWidth = updatedWidth;
                            setInitNextColWidth(updatedWidth);
                        } else if (widestColClientId === prevBlockClientId) {
                            setInitPrevColWidth(updatedWidth);
                        }
                    }
                }

                setShowWidthTooltip(true);

                if (select("core/block-editor").getSelectedBlockCount() > 1)
                    return false;

                setNextColWDhByUseState(nextColumnDesktopWidth);

                const allDimensions = elColWrap.parentElement.getBoundingClientRect();
                colWidthInPx = allDimensions.width;
                pcent_px_ratio = desktopRange / colWidthInPx;

                if (eb_conditional_localize && eb_conditional_localize.editor_type === "edit-site") {
                    let iframe = document.querySelector('iframe.edit-site-visual-editor__editor-canvas');
                    let iframeDocument = iframe.contentWindow.document.body;
                    iframeDocument.addEventListener("mousemove", handleMouseMove);
                    iframeDocument.addEventListener("mouseup", handleMouseUp);
                }
                else {
                    window.addEventListener("mousemove", handleMouseMove);
                    window.addEventListener("mouseup", handleMouseUp);
                }

                let prevX = e.clientX;
                let newX = 0;
                let finalThisBlockWidth = 0;
                let finalNextBlockWidth = 0;

                function handleMouseUp(e) {
                    setShowWidthTooltip(false);

                    if (eb_conditional_localize && eb_conditional_localize.editor_type === "edit-site") {
                        let iframe = document.querySelector('iframe.edit-site-visual-editor__editor-canvas');
                        let iframeDocument = iframe.contentWindow.document.body;
                        iframeDocument.removeEventListener("mousemove", handleMouseMove);
                        iframeDocument.removeEventListener("mouseup", handleMouseUp);
                    }
                    else {
                        window.removeEventListener("mousemove", handleMouseMove);
                        window.removeEventListener("mouseup", handleMouseUp);
                    }
                }

                function handleMouseMove(e) {

                    newX = prevX - e.clientX;

                    const roundedX100ThisWitdh = Math.round(
                        (desktopColW - newX * pcent_px_ratio) * 100
                    );
                    const roundedX100NextWitdh = Math.round(
                        (nextColumnDesktopWidth + newX * pcent_px_ratio) * 100
                    );

                    let thisBlockWidth = roundedX100ThisWitdh / 100;
                    let diffForRounding = 0;

                    if (roundedX100ThisWitdh % 500 > 460) {
                        const newWidth = Math.ceil(thisBlockWidth);
                        diffForRounding = newWidth - thisBlockWidth;
                        thisBlockWidth = newWidth;
                    } else if (roundedX100ThisWitdh % 500 < 70) {
                        const newWidth = Math.floor(thisBlockWidth);
                        diffForRounding = newWidth - thisBlockWidth;
                        thisBlockWidth = newWidth;
                    }

                    // const newDIffForRounding = Math.round(diffForRounding * 100) / 100;
                    // const newDIffRounded = Math.round(diffForRounding * 100);

                    const nextBlockWidth =
                        (roundedX100NextWitdh - Math.round(diffForRounding * 100)) / 100;

                    if (nextBlockWidth < 4 || thisBlockWidth < 4) {
                        return false;
                    }

                    finalThisBlockWidth = thisBlockWidth;
                    finalNextBlockWidth = nextBlockWidth;

                    dispatch("core/block-editor").updateBlockAttributes(
                        nextBlockClientId,
                        {
                            cw_Range: finalNextBlockWidth,
                        }
                    );

                    setNextColWDhByUseState(finalNextBlockWidth);

                    setAttributes({
                        cw_Range: finalThisBlockWidth,
                    });
                }
            }

            return () => {
                elDragger.removeEventListener("mousedown", handleMouseDown);
            };
        }
    }, [
        draggerRef,
        desktopRange,
        colWrap,
        nextBlockClientId,
        prevBlockClientId,
        showWidthTooltip,
    ]);

    // CSS/styling Codes Starts from Here

    // styles related to generateResponsiveSelectControlStyles start ⬇
    const {
        selectStylesDesktop: rOverflowStylesDesktop,
        selectStylesTab: rOverflowStylesTab,
        selectStylesMobile: rOverflowStylesMobile,
    } = generateResponsiveSelectControlStyles({
        controlName: rowOverflowPrefix,
        property: "overflow",
        attributes,
    });

    // styles related to generateResponsiveSelectControlStyles end

    // styles related to generateResponsiveRangeStyles start ⬇
    const {
        rangeStylesDesktop: wrapWidthDesktop,
        rangeStylesTab: wrapWidthTab,
        rangeStylesMobile: wrapWidthMobile,
    } = generateResponsiveRangeStyles({
        controlName: wrapperWidth,
        customUnit: "%",
        property: "width",
        attributes,
    });

    // styles related to generateResponsiveRangeStyles end

    // styles related to generateDimensionsControlStyles start ⬇
    const {
        dimensionStylesDesktop: wrpMarginDesktop,
        dimensionStylesTab: wrpMarginTab,
        dimensionStylesMobile: wrpMarginMobile,
    } = generateDimensionsControlStyles({
        attributes,
        controlName: cWrapMarginConst,
        styleFor: "margin",
    });

    const {
        dimensionStylesDesktop: wrpPaddingDesktop,
        dimensionStylesTab: wrpPaddingTab,
        dimensionStylesMobile: wrpPaddingMobile,
    } = generateDimensionsControlStyles({
        attributes,
        controlName: cWrapPaddingConst,
        styleFor: "padding",
    });

    // styles related to generateDimensionsControlStyles End

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

    // styles related to generateBackgroundControlStyles End

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

    // styles related to generateBorderShadowStyles End

    //
    // CSS/styling Codes Starts from Here

    // all common (editor&frontEnd) css styles for large screen width (desktop/laptop) in strings ⬇
    const desktopAllStylesCommon = softMinifyCssStrings(`
		.${blockId}.eb-column-wrapper > .eb-column-inner > *{
			position:relative;
		}

		.${blockId}.eb-column-wrapper > .eb-column-inner:before{
			${wrpOverlayStylesDesktop}
			transition: all .5s, ${wrpOvlTransitionStyle};
		}

		.${blockId}.eb-column-wrapper > .eb-column-inner:hover:before{
			${wrpHoverOverlayStylesDesktop}
		}
	`);

    // all common (editor&frontEnd) css styles for Tab in strings ⬇
    const tabAllStylesCommon = softMinifyCssStrings(`
		.${blockId}.eb-column-wrapper > .eb-column-inner:before{
			${wrpOverlayStylesTab}
		}

		.${blockId}.eb-column-wrapper > .eb-column-inner:hover:before{
			${wrpHoverOverlayStylesTab}
		}
	`);

    // all common (editor&frontEnd) css styles for Mobile in strings ⬇
    const mobileAllStylesCommon = softMinifyCssStrings(`
		.${blockId}.eb-column-wrapper > .eb-column-inner:before{
			${wrpOverlayStylesMobile}
		}

		.${blockId}.eb-column-wrapper > .eb-column-inner:hover:before{
			${wrpHoverOverlayStylesMobile}
		}
	`);

    //
    const desktopAllStylesEditor = `
		${desktopAllStylesCommon}
		.eb-row-wrapper .eb-guten-block-main-parent-wrapper.eb-column-editor-wrap.eb-column-editor-wrap-${blockId}{
			${colAli ? `align-self:${colAli} !important;` : ""}
			${wrapWidthDesktop}
			${!isColumnOrder_Custom_Desktop || columnOrderDesktop === undefined ? "order: unset;" : `order: ${columnOrderDesktop};`}
			${rOverflowStylesDesktop}

			${wrpMarginDesktop}
			${wrpPaddingDesktop}
			${wrpBackgroundStylesDesktop}
			${wrpBdShdStyesDesktop}
			transition: all .5s, ${wrpBgTransitionStyle}, ${wrpBdShdTransitionStyle};
		}
		.eb-row-wrapper .eb-guten-block-main-parent-wrapper.eb-column-editor-wrap.eb-column-editor-wrap-${blockId}:hover{
			${wrpHoverBackgroundStylesDesktop}
			${wrpBdShdStylesHoverDesktop}
		}
	`;

    const tabAllStylesEditor = `
		${tabAllStylesCommon}
		.eb-row-wrapper .eb-guten-block-main-parent-wrapper.eb-column-editor-wrap.eb-column-editor-wrap-${blockId}{
			width: calc(${tabWidthRange ? tabWidthRange : (desktopRange !== 100 ? 50 : 100)}% - ${calculateGap(columnGap.tab, columnNumber.tab)}px);

			${!isColumnOrder_Custom_Tab || columnOrderTab === undefined ? "order: unset;" : `order: ${columnOrderTab};`}
			${rOverflowStylesTab}

			${wrpMarginTab}
			${wrpPaddingTab}
			${wrpBackgroundStylesTab}
			${wrpBdShdStyesTab}
		}
		.eb-row-wrapper .eb-guten-block-main-parent-wrapper.eb-column-editor-wrap.eb-column-editor-wrap-${blockId}:hover{
			${wrpHoverBackgroundStylesTab}
			${wrpBdShdStylesHoverTab}
		}
	`;

    const mobileAllStylesEditor = `
		${mobileAllStylesCommon}
		.eb-row-wrapper .eb-guten-block-main-parent-wrapper.eb-column-editor-wrap.eb-column-editor-wrap-${blockId}{
			width: calc(${mobileWidthRange ? mobileWidthRange : 100}% - ${calculateGap(columnGap.mobile, columnNumber.mobile)}px);

			${!isColumnOrder_Custom_Mobile || columnOrderMobile === undefined ? "order: unset;" : `order: ${columnOrderMobile};`}
			${rOverflowStylesMobile}

			${wrpMarginMobile}
			${wrpPaddingMobile}
			${wrpBackgroundStylesMobile}
			${wrpBdShdStyesMobile}
		}
		.eb-row-wrapper .eb-guten-block-main-parent-wrapper.eb-column-editor-wrap.eb-column-editor-wrap-${blockId}:hover{
			${wrpHoverBackgroundStylesMobile}
			${wrpBdShdStylesHoverMobile}
		}
	`;

    // all css styles for large screen width (desktop/laptop) in strings ⬇
    const desktopAllStylesFrontEnd = softMinifyCssStrings(`
		${desktopAllStylesCommon}

		.eb-parent-${blockId}{
			${colAli ? `align-self:${colAli} !important;` : ""}
			${wrapWidthDesktop}

			${!isColumnOrder_Custom_Desktop || columnOrderDesktop === undefined ? "order: unset;" : `order: ${columnOrderDesktop};`}
			${rOverflowStylesDesktop}

			${wrpMarginDesktop}
			${wrpPaddingDesktop}
			${wrpBackgroundStylesDesktop}
			${wrpBdShdStyesDesktop}
			transition: all .5s, ${wrpBgTransitionStyle}, ${wrpBdShdTransitionStyle};
		}
		.eb-parent-${blockId}:hover{
			${wrpHoverBackgroundStylesDesktop}
			${wrpBdShdStylesHoverDesktop}
		}
	`);

    // all css styles for Tab in strings ⬇
    const tabAllStylesFrontEnd = softMinifyCssStrings(`
		${tabAllStylesCommon}

		.eb-parent-${blockId}{
			width: calc(${tabWidthRange ? tabWidthRange : (desktopRange !== 100 ? 50 : 100)}% - ${calculateGap(columnGap.tab, columnNumber.tab)}px);

			${!isColumnOrder_Custom_Tab || columnOrderTab === undefined ? "order: unset;" : `order: ${columnOrderTab};`}
			${rOverflowStylesTab}

			${wrpMarginTab}
			${wrpPaddingTab}
			${wrpBackgroundStylesTab}
			${wrpBdShdStyesTab}
		}
		.eb-parent-${blockId}:hover{
			${wrpHoverBackgroundStylesTab}
			${wrpBdShdStylesHoverTab}
		}
	`);

    // all css styles for Mobile in strings ⬇
    const mobileAllStylesFrontEnd = softMinifyCssStrings(`
		${mobileAllStylesCommon}

		.eb-parent-${blockId}{
			width: calc(${mobileWidthRange ? mobileWidthRange : 100}% - ${calculateGap(columnGap.mobile, columnNumber.mobile)}px);

			${!isColumnOrder_Custom_Mobile || columnOrderMobile === undefined ? "order: unset;" : `order: ${columnOrderMobile};`}
			${rOverflowStylesMobile}

			${wrpMarginMobile}
			${wrpPaddingMobile}
			${wrpBackgroundStylesMobile}
			${wrpBdShdStyesMobile}
		}
		.eb-parent-${blockId}:hover{
			${wrpHoverBackgroundStylesMobile}
			${wrpBdShdStylesHoverMobile}
		}
	`);

    // Set All common (editor&frontEnd) & frontend Styles in "blockMeta" Attribute
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
                    {...props}
                    colWrap={colWrap}
                    initColWidth={initColWidth}
                    initNextColWidth={initNextColWidth}
                    initPrevColWidth={initPrevColWidth}
                    nextBlockClientId={nextBlockClientId}
                    prevBlockClientId={prevBlockClientId}
                    setInitColWidth={setInitColWidth}
                    setInitNextColWidth={setInitNextColWidth}
                    setInitPrevColWidth={setInitPrevColWidth}
                />
            )}

            <div {...blockProps}>
                <style>
                    {`

				${desktopAllStylesEditor}

				/* mimmikcssStart */

				${resOption === "Tablet" ? tabAllStylesEditor : " "}
				${resOption === "Mobile" ? tabAllStylesEditor + mobileAllStylesEditor : " "}

				/* mimmikcssEnd */

				`}
                </style>

                {nextBlockClientId && (
                    <div className="width-dragger-change" ref={draggerRef}>
                        <div className="dragger-inner">
                            {/* <div className="circle"></div> */}

                            {showWidthTooltip ? (
                                // true ? (
                                <div className="cols-width-tooltip">
                                    {/* <span>{Math.round(desktopRange * 100) / 100}</span>/
								<span>{Math.round(nextColWDhByUseState * 100) / 100}</span> */}
                                    <span>{Math.round(desktopRange * 100) / 100}</span>
                                    <span className="dashicons dashicons-leftright"></span>
                                    <span>{Math.round(nextColWDhByUseState * 100) / 100}</span>
                                    {/* <i className="ovl_circle1 ovl_shapes"></i>
								<i className="ovl_circle2 ovl_shapes"></i> */}
                                </div>
                            ) : (
                                <span className="dashicons dashicons-leftright"></span>
                            )}
                        </div>
                    </div>
                )}

                <div className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`}>
                    <div className={`eb-column-wrapper ${blockId}`} ref={colWrap}>
                        <div className="eb-column-inner">
                            <InnerBlocks
                                orientation={
                                    // direction && direction[ 0 ] ? direction[ 0 ] :
                                    "vertical"
                                }
                                templateLock={
                                    // templateLock ? templateLock :
                                    false
                                }
                                renderAppender={
                                    select("core/block-editor").getBlockOrder(clientId).length > 0
                                        ? undefined
                                        : InnerBlocks.ButtonBlockAppender
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
