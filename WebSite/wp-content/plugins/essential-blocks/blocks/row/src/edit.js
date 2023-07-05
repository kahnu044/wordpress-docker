/**
 * WordPress dependencies
 */
import {
	useBlockProps,
	InnerBlocks,
	store as blockEditorStore
} from "@wordpress/block-editor";
import {
	createBlock,
	createBlocksFromInnerBlocksTemplate,
	store as blocksStore,
} from '@wordpress/blocks';
import { useEffect, useState, useRef } from "@wordpress/element";
import { select, useSelect, useDispatch } from "@wordpress/data";
import { times, merge } from "lodash";

/**
 * Internal depenencies
 */

import classnames from "classnames";

import Inspector from "./inspector";

import {
	rWrapMarginConst,
	rWrapPaddingConst,
} from "./constants/dimensionsNames";

import { WrpBgConst } from "./constants/backgroundsConstants";
import { WrpBdShadowConst } from "./constants/borderShadowConstants";
import { rowOverflowPrefix, columnsOrderPrefix } from "./constants/selectControlPrefixs";

import {
	rMinHConst,
	rMaxWConst,
	rColsNumber,
} from "./constants/rangeNames";

const {
	//
	softMinifyCssStrings,
	generateDimensionsControlStyles,
	generateBackgroundControlStyles,
	generateBorderShadowStyles,
	// mimmikCssForPreviewBtnClick,
	duplicateBlockIdFix,
	generateResponsiveRangeStyles,

	generateResponsiveSelectControlStyles,

	Icon01z1x100,
	Icon02z2x50,
	Icon03z3x33_33,
	Icon04z4x25,
	Icon05z34y66,
	Icon06z66y34,
	Icon07z25y25y50,
	Icon08z50y25y25,
	Icon09z25y50y25,
	Icon10z5x20,
	Icon11z6x16_66,
	Icon12z16y66y16,
} = window.EBControls;

const getTemplates = (numCols, objs = {}) => {
	const { widthArr = [] } = objs;
	return times(numCols, (n) => {
		return ["essential-blocks/column", { cw_Range: widthArr[n] || 20 }];
	});
};

export default function Edit(props) {

	const { attributes, setAttributes, className, clientId, isSelected } = props;
	const [colTemplate, setColTemplate] = useState([]);
	const {
		blockId,
		blockMeta,
		// responsive control attribute ⬇
		resOption,
		isLayoutSelected,
		rowWidthName,
		rowHeightName,
		rowOverFlow,
		rowAli,
		clGp_Range,
		TABclGp_Range,
		MOBclGp_Range,
		[`${rColsNumber}Range`]: desktopColNumber,
		[`TAB${rColsNumber}Range`]: tabColNumber,
		[`MOB${rColsNumber}Range`]: mobileColNumber,
		[`${columnsOrderPrefix}Option`]: desktopColOrder,
		[`TAB${columnsOrderPrefix}Option`]: tabColOrder,
		[`MOB${columnsOrderPrefix}Option`]: mobileColOrder,
		classHook,
	} = attributes;

	/**
	 * Get innerBlocks number when store updated
	*/
	const thisBlock = useSelect((select) => select('core/block-editor').getBlocksByClientId(clientId)[0]);
	const rowChildInnerBlocks = thisBlock.innerBlocks ? thisBlock.innerBlocks : [];
	const rowChildBlockNumber = thisBlock.innerBlocks ? thisBlock.innerBlocks.length : 0;
	const rowChildBlockRef = useRef(rowChildBlockNumber);
	const [changeColNumberUseSelect, setChangeColNumberUseSelect] = useState(false);

	const { replaceInnerBlocks } = useDispatch(blockEditorStore);

	//Update rowChildBlockRef ref current when template is selected
	useEffect(() => {
		rowChildBlockRef.current = rowChildBlockNumber;
	}, [colTemplate])

	/**
	 * @function mappedColumnWidths
	 * @description set the column width attributes for given inner blocks
	 * @param {Array} blocks
	 * @param {number} width
	 * @returns {Array}
	 */
	const mappedColumnWidths = (blocks, width, widthTab, widthMobile, resize = false) => {
		return blocks.map((block) => {
			return merge({}, block, {
				attributes: {
					cw_Range: !resize && block.attributes.cw_Range ? block.attributes.cw_Range : parseFloat(`${width}`),
					TABcw_Range: !resize && block.attributes.TABcw_Range ? block.attributes.TABcw_Range : parseFloat(`${widthTab}`),
					MOBcw_Range: !resize && block.attributes.MOBcw_Range ? block.attributes.MOBcw_Range : parseFloat(`${widthMobile}`),
					resOption: resOption
				},
			})
		});
	}

	/**
	 * Add/Remove Columns based on Column Number Range Control
	*/
	const tabColNumRef = useRef(tabColNumber);
	const mobileColNumRef = useRef(mobileColNumber);
	useEffect(() => {
		if (typeof desktopColNumber != "number" || typeof rowChildBlockNumber != "number" || typeof rowChildBlockRef.current != "number") {
			return;
		}

		const createBlockNumber = desktopColNumber - rowChildBlockRef.current;
		rowChildBlockRef.current = desktopColNumber;

		let widthPerChild = (100 / desktopColNumber).toFixed(2);
		let widthPerChildTab = (50).toFixed(2);
		let widthPerChildMobile = (100).toFixed(2);

		const getBlock = select('core/block-editor').getBlocksByClientId(clientId)[0];
		const getBlockInnerBlocks = getBlock.innerBlocks ? getBlock.innerBlocks : [];
		let innerBlocks = [...getBlockInnerBlocks];

		// If total rows are more than 6, then remove the extra rows
		if (desktopColNumber > 6) {
			widthPerChild = (100 / 6).toFixed(2);
			innerBlocks = getBlockInnerBlocks.filter((block, index) => {
				if (index <= 5) {
					return block;
				}
			});
		}

		if (typeof tabColNumber === "number" && tabColNumber <= desktopColNumber) {
			widthPerChildTab = (100 / tabColNumber).toFixed(2);
		}

		if (typeof mobileColNumber === "number" && mobileColNumber <= desktopColNumber) {
			widthPerChildMobile = (100 / mobileColNumber).toFixed(2);
		}

		setChangeColNumberUseSelect(false);
		if (createBlockNumber > 0) {
			let innerBlocksWidthUpdated;
			if (changeColNumberUseSelect) {
				innerBlocksWidthUpdated = [
					...mappedColumnWidths(innerBlocks, widthPerChild, widthPerChildTab, widthPerChildMobile, true)
				];
			}
			else {
				innerBlocksWidthUpdated = [
					...mappedColumnWidths(innerBlocks, widthPerChild, widthPerChildTab, widthPerChildMobile, true),
					...times(createBlockNumber, () => {
						return createBlock('essential-blocks/column', {
							cw_Range: parseFloat(`${widthPerChild}`),
						})
					}),
				];
			}

			replaceInnerBlocks(clientId, innerBlocksWidthUpdated);
		}
		else if (createBlockNumber < 0) {
			const innerBlocksWidthUpdated = [
				...mappedColumnWidths(innerBlocks, widthPerChild, widthPerChildTab, widthPerChildMobile, true)
			];

			const innerBlocksAfterDelete = innerBlocksWidthUpdated.filter((block, index) => {
				const limit = desktopColNumber - Math.abs(createBlockNumber);
				if (index <= limit) {
					return block;
				}
			});

			replaceInnerBlocks(clientId, innerBlocksAfterDelete);
		}
		else {
			const resizeBlock = () => {
				if (resOption !== "Desktop") {
					if (tabColNumber != tabColNumRef.current) {
						tabColNumRef.current = tabColNumber;
						return true;
					}
					else if (mobileColNumber != mobileColNumRef.current) {
						mobileColNumRef.current = mobileColNumber;
						return true;
					}
					else {
						return false;
					}
				}
				return false;
			}
			// const resizeBlock = false;
			const innerBlocksWidthUpdated = [
				...mappedColumnWidths(innerBlocks, widthPerChild, widthPerChildTab, widthPerChildMobile, resizeBlock())
			];

			replaceInnerBlocks(clientId, innerBlocksWidthUpdated);
		}

	}, [desktopColNumber, tabColNumber, mobileColNumber, resOption]);

	/**
	 * Resize Columns when Duplicate/Delete Columns
	*/
	useEffect(() => {
		if (typeof rowChildBlockNumber != "number") {
			return;
		}

		if (rowChildBlockNumber != desktopColNumber) {
			rowChildBlockRef.current = desktopColNumber;
			setChangeColNumberUseSelect(true);

			setAttributes({
				[`${rColsNumber}Range`]: rowChildBlockNumber,
			});
		}
	}, [rowChildBlockNumber]);

	//
	const rowWrap = useRef(null);

	/**
	 * Create Unique ID for each row
	*/
	useEffect(() => {

		// this codes is for creating a unique id for each block's unique className by a random unique number
		const BLOCK_PREFIX = "eb-row";
		duplicateBlockIdFix({
			BLOCK_PREFIX,
			blockId,
			setAttributes,
			select,
			clientId,
		});

		//
		if (clGp_Range === undefined) {
			setAttributes({
				clGp_Range: 20,
			});
		}

		if ((mobileColNumber === undefined || mobileColNumber === 1) && (MOBclGp_Range === undefined)) {
			setAttributes({
				MOBclGp_Range: 0,
			});
		}

		if (desktopColOrder === undefined) {
			setAttributes({
				[`${columnsOrderPrefix}Option`]: "default",
			});
		}
	}, []);

	//
	useEffect(() => {
		const elRowWrap = rowWrap.current;
		if (elRowWrap) {
			const rowMainRoot = elRowWrap.closest(
				".wp-block:not(.eb-guten-block-main-parent-wrapper)"
			) || { classList: { add: () => { } } };
			rowMainRoot.classList.add("marginPaddingNaai");
		}
	}, [rowWrap]);

	//
	useEffect(() => {
		// the following codes (if/else) neede for row/columns blocks' dragger options
		if (resOption == "Desktop") {
			document.body.classList.add("eb-responsive-preview-option-Desktop");
		} else {
			document.body.classList.remove("eb-responsive-preview-option-Desktop");
		}
	}, [resOption]);

	const blockProps = useBlockProps({
		className: classnames(
			className,
			`eb-guten-block-main-parent-wrapper eb-row-editor-wrap eb-row-editor-wrap-${blockId}`
		),
	});

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

	//
	const handleLayoutClick = (id) => {
		switch (id) {
			case "01":
				setColTemplate(getTemplates(1, { widthArr: [100] }));
				setAttributes({ [`${rColsNumber}Range`]: 1 });
				break;

			case "02":
				setColTemplate(getTemplates(2, { widthArr: [50, 50] }));
				setAttributes({ [`${rColsNumber}Range`]: 2 });
				break;

			case "03":
				setColTemplate(getTemplates(3, { widthArr: [33.33, 33.33, 33.33] }));
				setAttributes({ [`${rColsNumber}Range`]: 3 });
				break;

			case "04":
				setColTemplate(getTemplates(4, { widthArr: [25, 25, 25, 25] }));
				setAttributes({ [`${rColsNumber}Range`]: 4 });
				break;

			case "05":
				setColTemplate(getTemplates(2, { widthArr: [34, 66] }));
				setAttributes({ [`${rColsNumber}Range`]: 2 });
				break;

			case "06":
				setColTemplate(getTemplates(2, { widthArr: [66, 34] }));
				setAttributes({ [`${rColsNumber}Range`]: 2 });
				break;

			case "07":
				setColTemplate(getTemplates(3, { widthArr: [25, 25, 50] }));
				setAttributes({ [`${rColsNumber}Range`]: 3 });
				break;

			case "08":
				setColTemplate(getTemplates(3, { widthArr: [50, 25, 25] }));
				setAttributes({ [`${rColsNumber}Range`]: 3 });
				break;

			case "09":
				setColTemplate(getTemplates(3, { widthArr: [25, 50, 25] }));
				setAttributes({ [`${rColsNumber}Range`]: 3 });
				break;

			case "10":
				setColTemplate(getTemplates(5, { widthArr: [20, 20, 20, 20, 20] }));
				setAttributes({ [`${rColsNumber}Range`]: 5 });
				break;

			case "11":
				setColTemplate(
					getTemplates(6, {
						widthArr: [16.666, 16.666, 16.666, 16.666, 16.666, 16.666],
					}),
				);
				setAttributes({ [`${rColsNumber}Range`]: 6 });
				break;

			case "12":
				setColTemplate(getTemplates(3, { widthArr: [17, 66, 17] }));
				setAttributes({ [`${rColsNumber}Range`]: 3 });
				break;
		}

		setAttributes({ isLayoutSelected: true });
	};



	//
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
		rangeStylesDesktop: wrapHeightDesktop,
		rangeStylesTab: wrapHeightTab,
		rangeStylesMobile: wrapHeightMobile,
	} = generateResponsiveRangeStyles({
		controlName: rMinHConst,
		property: "min-height",
		attributes,
	});

	const {
		rangeStylesDesktop: rowMaxWidthDesktop,
		rangeStylesTab: rowMaxWidthTab,
		rangeStylesMobile: rowMaxWidthMobile,
	} = generateResponsiveRangeStyles({
		controlName: rMaxWConst,
		property: "max-width",
		attributes,
		customUnit: "px",
	});
	// styles related to generateResponsiveRangeStyles end

	// styles related to generateDimensionsControlStyles start ⬇
	const {
		dimensionStylesDesktop: wrpMarginDesktop,
		dimensionStylesTab: wrpMarginTab,
		dimensionStylesMobile: wrpMarginMobile,
	} = generateDimensionsControlStyles({
		attributes,
		controlName: rWrapMarginConst,
		styleFor: "margin",
		disableLeftRight: true,
	});

	const {
		dimensionStylesDesktop: wrpPaddingDesktop,
		dimensionStylesTab: wrpPaddingTab,
		dimensionStylesMobile: wrpPaddingMobile,
	} = generateDimensionsControlStyles({
		attributes,
		controlName: rWrapPaddingConst,
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

	// all common (editor&frontEnd) css styles for large screen width (desktop/laptop) in strings ⬇
	const desktopAllStylesCommon = softMinifyCssStrings(`


		.${blockId}.eb-row-root-container > *{
			position:relative;
		}

		.${blockId}.eb-row-root-container{
			${rOverflowStylesDesktop}

			${wrpBackgroundStylesDesktop}
			${wrpMarginDesktop}
			${wrpPaddingDesktop}
			${wrpBdShdStyesDesktop}
			transition:all 0.5s, ${wrpBgTransitionStyle}, ${wrpBdShdTransitionStyle};
		}


		.${blockId}.eb-row-root-container:hover{
			${wrpHoverBackgroundStylesDesktop}
			${wrpBdShdStylesHoverDesktop}
		}

		.${blockId}.eb-row-root-container:before{
			${wrpOverlayStylesDesktop}
			transition:all 0.5s, ${wrpOvlTransitionStyle};

		}

		.${blockId}.eb-row-root-container:hover:before{
			${wrpHoverOverlayStylesDesktop}

		}

	`);

	// all common (editor&frontEnd) css styles for Tab in strings ⬇
	const tabAllStylesCommon = softMinifyCssStrings(`

		.${blockId}.eb-row-root-container{
			${rOverflowStylesTab}

			${wrpBackgroundStylesTab}
			${wrpMarginTab}
			${wrpPaddingTab}
			${wrpBdShdStyesTab}
		}

		.${blockId}.eb-row-root-container:hover{
			${wrpHoverBackgroundStylesTab}
			${wrpBdShdStylesHoverTab}
		}

		.${blockId}.eb-row-root-container:before{
			${wrpOverlayStylesTab}

		}

		.${blockId}.eb-row-root-container:hover:before{
			${wrpHoverOverlayStylesTab}

		}




	`);

	// all common (editor&frontEnd) css styles for Mobile in strings ⬇
	const mobileAllStylesCommon = softMinifyCssStrings(`
		.${blockId}.eb-row-root-container{
			${rOverflowStylesMobile}

			${wrpBackgroundStylesMobile}
			${wrpMarginMobile}
			${wrpPaddingMobile}
			${wrpBdShdStyesMobile}
		}

		.${blockId}.eb-row-root-container:hover{
			${wrpHoverBackgroundStylesMobile}
			${wrpBdShdStylesHoverMobile}
		}

		.${blockId}.eb-row-root-container:before{
			${wrpOverlayStylesMobile}

		}

		.${blockId}.eb-row-root-container:hover:before{
			${wrpHoverOverlayStylesMobile}

		}

	`);

	//
	const desktopAllStylesEditor = `
		${desktopAllStylesCommon}

		.${blockId}.eb-row-root-container > .eb-row-wrapper > .eb-row-inner > .block-editor-inner-blocks {
			${rowWidthName === "boxed" ? rowMaxWidthDesktop : ""}

		}

		.${blockId}.eb-row-root-container > .eb-row-wrapper > .eb-row-inner > .block-editor-inner-blocks > .block-editor-block-list__layout {
			${rowHeightName === "minH"
			? wrapHeightDesktop
			: rowHeightName === "fit"
				? `min-height:100vh;`
				: ""
		}
			${rowAli ? `align-items:${rowAli};` : ""}
			${clGp_Range ? `gap:${clGp_Range}px;` : ""}
			${desktopColOrder === 'row-reverse' ? `flex-flow: row-reverse;` : "flex-flow: row;"}
			${rowHeightName === "equalH" ? `align-items: unset;` : ""}
		}

		.${blockId}.eb-row-root-container > .eb-row-wrapper > .eb-row-inner > .block-editor-inner-blocks > .block-editor-block-list__layout > .eb-column-editor-wrap{
			box-sizing:border-box;
			${rowHeightName === "minH" ? wrapHeightDesktop : ""}
			${rowHeightName === "equalH" ? `
				display:flex;
				align-items: ${rowAli};
			` : ""}
		}
		.${blockId}.eb-row-root-container > .eb-row-wrapper > .eb-row-inner > .block-editor-inner-blocks > .block-editor-block-list__layout > .eb-column-editor-wrap > .eb-parent-wrapper {
			${rowHeightName === "equalH" ? `width: 100%;` : ""}
		}

	`;

	const tabAllStylesEditor = `
		${tabAllStylesCommon}

		.${blockId}.eb-row-root-container > .eb-row-wrapper > .eb-row-inner > .block-editor-inner-blocks {
			${rowWidthName === "boxed" ? rowMaxWidthTab : ""}
		}

		.${blockId}.eb-row-root-container > .eb-row-wrapper > .eb-row-inner > .block-editor-inner-blocks > .block-editor-block-list__layout{
			flex-wrap: wrap;
			${rowHeightName === "minH"
			? wrapHeightTab
			: rowHeightName === "fit"
				? `min-height:100vh`
				: ""
		}
			${`gap:${TABclGp_Range}px;`}
			${tabColOrder === 'row-reverse' ?
			`flex-flow: row-reverse; flex-wrap: wrap-reverse !important;` :
			`flex-flow: row; flex-wrap: wrap !important;`
		}
		}

		.${blockId}.eb-row-root-container > .eb-row-wrapper > .eb-row-inner > .block-editor-inner-blocks > .block-editor-block-list__layout > .eb-column-editor-wrap{
			${`gap:${TABclGp_Range}px;`}
			${rowHeightName === "minH" ? wrapHeightTab || wrapHeightDesktop : ""}
		}
	`;

	const mobileAllStylesEditor = `
		${mobileAllStylesCommon}

		.${blockId}.eb-row-root-container > .eb-row-wrapper > .eb-row-inner > .block-editor-inner-blocks {
			${rowWidthName === "boxed" ? rowMaxWidthMobile : ""}
		}

		.${blockId}.eb-row-root-container > .eb-row-wrapper > .eb-row-inner > .block-editor-inner-blocks > .block-editor-block-list__layout{
			${rowHeightName === "minH"
			? wrapHeightMobile
			: rowHeightName === "fit"
				? `min-height:100vh`
				: ""
		}
			${`gap:${MOBclGp_Range}px;`}
			${mobileColOrder === 'row-reverse' ?
			`flex-flow: row-reverse; flex-wrap: wrap-reverse !important;` :
			`flex-flow: row; flex-wrap: wrap !important;`
		}
		}

		.${blockId}.eb-row-root-container > .eb-row-wrapper > .eb-row-inner > .block-editor-inner-blocks > .block-editor-block-list__layout > .eb-column-editor-wrap{
			${`gap:${MOBclGp_Range}px;`}
			${rowHeightName === "minH" ? wrapHeightMobile || wrapHeightDesktop : ""}
		}

	`;

	// all css styles for large screen width (desktop/laptop) in strings ⬇
	const desktopAllStylesFrontEnd = softMinifyCssStrings(`
		${desktopAllStylesCommon}

		.${blockId}.eb-row-root-container > .eb-row-wrapper{
			${rowWidthName === "boxed" ? rowMaxWidthDesktop : ""}

		}

		.${blockId}.eb-row-root-container > .eb-row-wrapper > .eb-row-inner {
			${rowHeightName === "minH"
			? wrapHeightDesktop
			: rowHeightName === "fit"
				? `min-height:100vh;`
				: ""
		}

			${rowAli ? `align-items:${rowAli};` : ""}
			${`gap:${clGp_Range}px;`}
			${desktopColOrder === 'row-reverse' ? `flex-flow: row-reverse;` : "flex-flow: row;"}
			${rowHeightName === "equalH" ? `align-items: unset;` : ""}
		}

		.${blockId}.eb-row-root-container > .eb-row-wrapper > .eb-row-inner > .eb-parent-wrapper{
			${rowHeightName === "minH" ? wrapHeightDesktop : ""}
			${rowHeightName === "equalH" ? `
				display:flex;
				align-items: ${rowAli};
			` : ""}
		}
		.${blockId}.eb-row-root-container > .eb-row-wrapper > .eb-row-inner > .eb-parent-wrapper > * {
			${rowHeightName === "equalH" ? `width: 100%;` : ""}
		}

	`);

	// all css styles for Tab in strings ⬇
	const tabAllStylesFrontEnd = softMinifyCssStrings(`
		${tabAllStylesCommon}


		.${blockId}.eb-row-root-container > .eb-row-wrapper{
			${rowWidthName === "boxed" ? rowMaxWidthTab : ""}
		}

		.${blockId}.eb-row-root-container > .eb-row-wrapper > .eb-row-inner {
			${rowHeightName === "minH"
			? wrapHeightTab
			: rowHeightName === "fit"
				? `min-height:100vh`
				: ""
		}
			${`gap: ${TABclGp_Range}px;`}
			${tabColOrder === 'row-reverse' ?
			`flex-flow: row-reverse; flex-wrap: wrap-reverse !important;` :
			`flex-flow: row; flex-wrap: wrap !important;`
		}
		}

		.${blockId}.eb-row-root-container > .eb-row-wrapper > .eb-row-inner > .eb-parent-wrapper{
			${`gap: ${TABclGp_Range}px;`}
			${rowHeightName === "minH" ? wrapHeightTab || wrapHeightDesktop : ""}
		}

	`);

	// all css styles for Mobile in strings ⬇
	const mobileAllStylesFrontEnd = softMinifyCssStrings(`
		${mobileAllStylesCommon}

		.${blockId}.eb-row-root-container > .eb-row-wrapper{
			${rowWidthName === "boxed" ? rowMaxWidthMobile : ""}
		}

		.${blockId}.eb-row-root-container > .eb-row-wrapper > .eb-row-inner {
			${rowHeightName === "minH"
			? wrapHeightMobile
			: rowHeightName === "fit"
				? `min-height:100vh`
				: ""
		}
			${`gap: ${MOBclGp_Range}px;`}

			${mobileColOrder === 'row-reverse' ?
			`flex-flow: row-reverse; flex-wrap: wrap-reverse !important;` :
			`flex-flow: row; flex-wrap: wrap !important;`
		}
		}

		.${blockId}.eb-row-root-container > .eb-row-wrapper > .eb-row-inner > .eb-parent-wrapper{
			${`gap: ${MOBclGp_Range}px;`}
			${rowHeightName === "minH" ? wrapHeightMobile || wrapHeightDesktop : ""}
		}

	`);

	return (
		<>
			{isSelected && <Inspector {...props} />}

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

				<div className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`}>
					<div className={`eb-row-root-container ${blockId}`} ref={rowWrap}>
						<div className={`eb-row-wrapper for-editor-page`}>
							<div className="eb-row-inner">
								{isLayoutSelected ? (
									<>
										<InnerBlocks
											templateLock={false}
											template={
												colTemplate || [
													["essential-blocks/column", { cw_Range: 20 }],
													["essential-blocks/column", { cw_Range: 80 }],
												]
											}
											orientation="horizontal"
											allowedBlocks={["essential-blocks/column"]}
										// renderAppender={
										// 	colTemplate
										// }
										/>
									</>
								) : (
									<>
										<style>
											{`

					.${blockId}.eb-row-root-container .layoutPicker{
						padding: 30px 0px;
						background: #fff;
						border: 1px dashed #ccc;
						border-radius: 10px;
					}

					.${blockId}.eb-row-root-container .layoutPicker h3{
						text-align:center;
						text-transform:uppercase;
						font-size:30px;
						font-size: 18px;
						color: #666;
						font-weight: 500;
					}

					.${blockId}.eb-row-root-container .layoutPicker ul.layouts{
						display:flex;
						justify-content: center;
						flex-wrap:wrap;
						max-width:650px;
						padding:0;
						margin:auto;
					}

					.${blockId}.eb-row-root-container .layoutPicker ul.layouts > li{
						width: 20%;
						padding:5px 10px;
						list-style: none;
						box-sizing: border-box;
						cursor:pointer;
						position:relative;
					}

					.${blockId}.eb-row-root-container .layoutPicker ul.layouts > li > h6{
						font-size: 16px;
						font-family:sans-sarif;
						position: absolute;
						top:90%;
						left: 50px;
						display:none;
						margin: 0 !important;
						padding: 5px 10px !important;
						z-index: 222;
						text-transform: uppercase;
						background-color: #444;
						color: #fff;
					}

					.${blockId}.eb-row-root-container .layoutPicker ul.layouts > li:nth-child(3) > h6{
						left: 25px;
					}

					.${blockId}.eb-row-root-container .layoutPicker ul.layouts > li:nth-child(4) > h6{
						left: 0px;
					}

					.${blockId}.eb-row-root-container .layoutPicker ul.layouts > li:nth-child(7) > h6,
					.${blockId}.eb-row-root-container .layoutPicker ul.layouts > li:nth-child(8) > h6,
					.${blockId}.eb-row-root-container .layoutPicker ul.layouts > li:nth-child(9) > h6,
					.${blockId}.eb-row-root-container .layoutPicker ul.layouts > li:nth-child(12) > h6,
					.${blockId}.eb-row-root-container .layoutPicker ul.layouts > li:nth-child(10) > h6
					{
						left: -25px;
					}

					.${blockId}.eb-row-root-container .layoutPicker ul.layouts > li:nth-child(11) > h6{
						left: -60px;
					}


					.${blockId}.eb-row-root-container .layoutPicker ul.layouts > li .colLayouts__st0{
						fill:#e5ebf3;
					}

					.${blockId}.eb-row-root-container .layoutPicker ul.layouts > li:hover .colLayouts__st0{
						fill:#cdd6e3;
					}


					.${blockId}.eb-row-root-container .layoutPicker ul.layouts > li:hover > h6{
						display:block;
					}

							`}
										</style>
										<div className="layoutPicker">
											<h3>Select Column layout</h3>
											<ul className="layouts">
												<li
													onClick={() => {
														handleLayoutClick("01");
													}}
												>
													<h6>1</h6>
													<Icon01z1x100 />
												</li>
												<li
													onClick={() => {
														handleLayoutClick("02");
													}}
												>
													<h6>1/2 1/2</h6>
													<Icon02z2x50 />
												</li>
												<li
													onClick={() => {
														handleLayoutClick("03");
													}}
												>
													<h6>1/3 1/3 1/3</h6>
													<Icon03z3x33_33 />
												</li>
												<li
													onClick={() => {
														handleLayoutClick("04");
													}}
												>
													<h6>1/4 1/4 1/4 1/4</h6>
													<Icon04z4x25 />
												</li>
												<li
													onClick={() => {
														handleLayoutClick("05");
													}}
												>
													<h6>1/3 2/3</h6>
													<Icon05z34y66 />
												</li>
												<li
													onClick={() => {
														handleLayoutClick("06");
													}}
												>
													<h6>2/3 1/3</h6>
													<Icon06z66y34 />
												</li>
												<li
													onClick={() => {
														handleLayoutClick("07");
													}}
												>
													<h6>1/4 1/4 2/4</h6>
													<Icon07z25y25y50 />
												</li>
												<li
													onClick={() => {
														handleLayoutClick("08");
													}}
												>
													<h6>2/4 1/4 1/4</h6>
													<Icon08z50y25y25 />
												</li>
												<li
													onClick={() => {
														handleLayoutClick("09");
													}}
												>
													<h6>1/4 2/4 1/4</h6>
													<Icon09z25y50y25 />
												</li>
												<li
													onClick={() => {
														handleLayoutClick("10");
													}}
												>
													<h6>1/5 1/5 1/5 1/5 1/5</h6>
													<Icon10z5x20 />
												</li>
												<li
													onClick={() => {
														handleLayoutClick("11");
													}}
												>
													<h6>1/6 1/6 1/6 1/6 1/6 1/6</h6>
													<Icon11z6x16_66 />
												</li>
												<li
													onClick={() => {
														handleLayoutClick("12");
													}}
												>
													<h6>1/6 4/6 1/6</h6>
													<Icon12z16y66y16 />
												</li>
											</ul>
										</div>
									</>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
