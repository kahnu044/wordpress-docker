/**
 * WordPress dependencies
 */
import { useBlockProps, RichText } from "@wordpress/block-editor";
import { useEffect } from "@wordpress/element";
import { select } from "@wordpress/data";

/**
 * Internal depenencies
 */
import classnames from "classnames";

import Inspector from "./inspector";

import {
	typoPrefix_text,
	typoPrefix_title,
} from "./constants/typographyPrefixConstants";

import {
	dimensionsMargin,
	dimensionsPadding,
} from "./constants/dimensionsNames";

import { wrapBg } from "./constants/backgroundsConstants";
import { wrpBdShadow } from "./constants/borderShadowConstants";

const {
	//
	softMinifyCssStrings,
	generateTypographyStyles,
	generateDimensionsControlStyles,
	generateBackgroundControlStyles,
	generateBorderShadowStyles,
	// mimmikCssForPreviewBtnClick,
	duplicateBlockIdFix,
} = window.EBControls;

export default function Edit(props) {
	const { attributes, setAttributes, className, clientId, isSelected } = props;
	const {
		blockId,
		blockMeta,
		// responsive control attribute ⬇
		resOption,

		dismissible,
		title,
		text,
		titleColor,
		textColor,
		classHook,
	} = attributes;

	// this useEffect is for creating a unique id for each block's unique className by a random unique number
	useEffect(() => {
		// const current_block_id = attributes.blockId;

		const BLOCK_PREFIX = "eb-notice";
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

	//
	// CSS/styling Codes Starts from Here

	const {
		typoStylesDesktop: titleTypoStylesDesktop,
		typoStylesTab: titleTypoStylesTab,
		typoStylesMobile: titleTypoStylesMobile,
	} = generateTypographyStyles({
		attributes,
		prefixConstant: typoPrefix_title,
		defaultFontSize: 32,
	});

	const {
		typoStylesDesktop: textTypoStylesDesktop,
		typoStylesTab: textTypoStylesTab,
		typoStylesMobile: textTypoStylesMobile,
	} = generateTypographyStyles({
		attributes,
		prefixConstant: typoPrefix_text,
		defaultFontSize: 18,
	});

	const {
		dimensionStylesDesktop: wrapperMarginStylesDesktop,
		dimensionStylesTab: wrapperMarginStylesTab,
		dimensionStylesMobile: wrapperMarginStylesMobile,
	} = generateDimensionsControlStyles({
		controlName: dimensionsMargin,
		styleFor: "margin",
		attributes,
	});

	const {
		dimensionStylesDesktop: wrapperPaddingStylesDesktop,
		dimensionStylesTab: wrapperPaddingStylesTab,
		dimensionStylesMobile: wrapperPaddingStylesMobile,
	} = generateDimensionsControlStyles({
		controlName: dimensionsPadding,
		styleFor: "padding",
		attributes,
	});

	const {
		backgroundStylesDesktop,
		hoverBackgroundStylesDesktop,
		backgroundStylesTab,
		hoverBackgroundStylesTab,
		backgroundStylesMobile,
		hoverBackgroundStylesMobile,
		overlayStylesDesktop,
		hoverOverlayStylesDesktop,
		overlayStylesTab,
		hoverOverlayStylesTab,
		overlayStylesMobile,
		hoverOverlayStylesMobile,
		bgTransitionStyle,
		ovlTransitionStyle,
	} = generateBackgroundControlStyles({
		attributes,
		controlName: wrapBg,
	});

	const {
		styesDesktop: bdShadowStyesDesktop,
		styesTab: bdShadowStyesTab,
		styesMobile: bdShadowStyesMobile,
		stylesHoverDesktop: bdShadowStylesHoverDesktop,
		stylesHoverTab: bdShadowStylesHoverTab,
		stylesHoverMobile: bdShadowStylesHoverMobile,
		transitionStyle: bdShadowTransitionStyle,
	} = generateBorderShadowStyles({
		controlName: wrpBdShadow,
		attributes,
		// noShadow: true,
		// noBorder: true,
	});

	// wrapper styles css in strings ⬇
	const wrapperStylesDesktop = `

	.eb-notice-wrapper.${blockId} > * {
		position: relative;
	}	

	.eb-notice-wrapper.${blockId}{
		${wrapperMarginStylesDesktop}
		${wrapperPaddingStylesDesktop}
		${backgroundStylesDesktop}
		${bdShadowStyesDesktop}
		transition:${bgTransitionStyle}, ${bdShadowTransitionStyle};
		overflow: hidden;
		position: relative;
		
	}
	
	.eb-notice-wrapper.${blockId}:hover{
		${hoverBackgroundStylesDesktop}
		${bdShadowStylesHoverDesktop}
	}
	
	.eb-notice-wrapper.${blockId}:before{
		${overlayStylesDesktop}
		transition:${ovlTransitionStyle};
	}

	.eb-notice-wrapper.${blockId}:hover:before{
		${hoverOverlayStylesDesktop}
	}

	`;

	const wrapperStylesTab = `
	.eb-notice-wrapper.${blockId}{
		${wrapperMarginStylesTab}
		${wrapperPaddingStylesTab}
		${backgroundStylesTab}
		${bdShadowStyesTab}		
	}

	.eb-notice-wrapper.${blockId}:hover{
		${hoverBackgroundStylesTab}
		${bdShadowStylesHoverTab}
	}

	.eb-notice-wrapper.${blockId}:before{
		${overlayStylesTab}
	}

	.eb-notice-wrapper.${blockId}:hover:before{
		${hoverOverlayStylesTab}
	}

	`;

	const wrapperStylesMobile = `
	.eb-notice-wrapper.${blockId}{
		${wrapperMarginStylesMobile}
		${wrapperPaddingStylesMobile}
		${backgroundStylesMobile}
		${bdShadowStyesMobile}
	}

	.eb-notice-wrapper.${blockId}:hover{
		${hoverBackgroundStylesMobile}
		${bdShadowStylesHoverMobile}
	}

	.eb-notice-wrapper.${blockId}:before{
		${overlayStylesMobile}
	}

	.eb-notice-wrapper.${blockId}:hover:before{
		${hoverOverlayStylesMobile}
	}
	`;

	//
	// titleWrapper styles css in strings ⬇
	const titleWrapperStylesDesktop = `
	.eb-notice-wrapper.${blockId} .eb-notice-title-wrapper{
		display: flex;
		justify-content: space-between;
	}	
	`;

	// title styles css in strings ⬇
	const titleStylesDesktop = `
	.eb-notice-wrapper.${blockId} .eb-notice-title{
		${titleTypoStylesDesktop}		
		color: ${titleColor || "#fff"};
	}
	`;

	const titleStylesTab = `
	.eb-notice-wrapper.${blockId} .eb-notice-title{
		${titleTypoStylesTab}
	}
	`;

	const titleStylesMobile = `
	.eb-notice-wrapper.${blockId} .eb-notice-title{
		${titleTypoStylesMobile}
	}
	`;

	// text styles css in strings ⬇
	const textStylesDesktop = `
	.eb-notice-wrapper.${blockId} .eb-notice-text{
		${textTypoStylesDesktop}
		color: ${textColor || "#edf1f7"};
	}
	`;

	const textStylesTab = `
	.eb-notice-wrapper.${blockId} .eb-notice-text{
		${textTypoStylesTab}
	}
	`;

	const textStylesMobile = `
	.eb-notice-wrapper.${blockId} .eb-notice-text{
		${textTypoStylesMobile}
	}
	`;

	// dismiss styles css in strings ⬇
	const dismissStylesDesktop = `
	.eb-notice-wrapper.${blockId} .eb-notice-dismiss{
		color: ${textColor || "#edf1f7"};
		display: ${dismissible ? "flex" : "none"};

		top: 0px;
		right: 0px;
		width: 24px;
		height: 24px;
		position: absolute;
		justify-content: center;
	}

	.eb-notice-wrapper.${blockId} .eb-notice-dismiss:after{
		content: "\\00d7";
	}

	.entry-content
	> *:not(.alignwide):not(.alignfull):not(.alignleft):not(.alignright):not(.wp-block-separator):not(.woocommerce) {
		margin-left: auto;
		margin-right: auto;
	}

	`;

	// all css styles for large screen width (desktop/laptop) in strings ⬇
	const desktopAllStyles = softMinifyCssStrings(`
		${wrapperStylesDesktop}
		${titleWrapperStylesDesktop}
		${dismissStylesDesktop}
		${titleStylesDesktop}
		${textStylesDesktop}
	`);

	// all css styles for Tab in strings ⬇
	const tabAllStyles = softMinifyCssStrings(`
		${wrapperStylesTab}
		${titleStylesTab}
		${textStylesTab}
	`);

	// all css styles for Mobile in strings ⬇
	const mobileAllStyles = softMinifyCssStrings(`
		${wrapperStylesMobile}
		${titleStylesMobile}
		${textStylesMobile}
	`);

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
			{isSelected && <Inspector {...props} />}
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

				<div className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`}>
					<div className={`eb-notice-wrapper ${blockId}`} data-id={blockId}>
						<div className="eb-notice-title-wrapper">
							<RichText
								className="eb-notice-title"
								value={title}
								onChange={(newTitle) => setAttributes({ title: newTitle })}
								placeholder="Add Title..."
								keepPlaceholderOnFocus
							/>
						</div>
						<span className="eb-notice-dismiss" />
						<div>
							<RichText
								className="eb-notice-text"
								value={text}
								onChange={(newText) => setAttributes({ text: newText })}
								placeholder="Add Text..."
								keepPlaceholderOnFocus
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
