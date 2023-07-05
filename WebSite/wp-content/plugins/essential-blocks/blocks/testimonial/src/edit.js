/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useEffect } from "@wordpress/element";
import { useBlockProps, RichText, MediaUpload } from "@wordpress/block-editor";
import { Button } from "@wordpress/components";
import { select } from "@wordpress/data";

/**
 * Internal dependencies
 */
import classnames from "classnames";

import Inspector from "./inspector";

const {
	//
	softMinifyCssStrings,
	generateBackgroundControlStyles,
	generateDimensionsControlStyles,
	generateTypographyStyles,
	generateResponsiveRangeStyles,
	generateBorderShadowStyles,
	// mimmikCssForPreviewBtnClick,
	duplicateBlockIdFix,
} = window.EBControls;

import { WrpBdShadow, TestimonialWrapBg, QUOTE_SIZE } from "./constants";

import QuoteSVG from "./quoteIconSVG";

const Edit = (props) => {
	const { attributes, setAttributes, className, clientId, isSelected } = props;
	const {
		resOption,
		blockId,
		blockMeta,
		avaterContainerFontSize,
		displayAvatar,
		avatarInline,
		avatarPosition,
		avatarAlign,
		borderRadius,
		avatarOrder,
		imageId,
		imageUrl,
		userName,
		companyName,
		description,
		descTextAlign,
		userInfoAlign,
		textAlign,
		userInfoPos,
		imagePosition,
		userNameColor,
		descriptionColor,
		enableQuote,
		quoteColor,
		quoteSize,
		quoteSizeUnit,
		companyColor,
		quoteHorizontalPosition,
		quoteVerticalPosition,
		classHook,
	} = attributes;

	// this useEffect is for creating a unique id for each block's unique className by a random unique number
	useEffect(() => {
		const BLOCK_PREFIX = "eb-testimonial";
		duplicateBlockIdFix({
			BLOCK_PREFIX,
			blockId,
			setAttributes,
			select,
			clientId,
		});
	}, []);

	//Generate Author Typography
	const {
		typoStylesDesktop: usernameTypoStylesDesktop,
		typoStylesTab: usernameTypoStylesTab,
		typoStylesMobile: usernameTypoStylesMobile,
	} = generateTypographyStyles({
		attributes,
		prefixConstant: "username",
	});

	//Generate Comapny Typography
	const {
		typoStylesDesktop: companyTypoStylesDesktop,
		typoStylesTab: companyTypoStylesTab,
		typoStylesMobile: companyTypoStylesMobile,
	} = generateTypographyStyles({
		attributes,
		prefixConstant: "company",
	});

	//Generate Description Typography
	const {
		typoStylesDesktop: descriptionTypoStylesDesktop,
		typoStylesTab: descriptionTypoStylesTab,
		typoStylesMobile: descriptionTypoStylesMobile,
	} = generateTypographyStyles({
		attributes,
		prefixConstant: "description",
	});

	//Generate Margin
	const {
		dimensionStylesDesktop: wrapperMarginStylesDesktop,
		dimensionStylesTab: wrapperMarginStylesTab,
		dimensionStylesMobile: wrapperMarginStylesMobile,
	} = generateDimensionsControlStyles({
		controlName: "margin",
		styleFor: "margin",
		attributes,
	});

	//Generate Padding
	const {
		dimensionStylesDesktop: wrapperPaddingStylesDesktop,
		dimensionStylesTab: wrapperPaddingStylesTab,
		dimensionStylesMobile: wrapperPaddingStylesMobile,
	} = generateDimensionsControlStyles({
		controlName: "padding",
		styleFor: "padding",
		attributes,
	});

	//Generate Border Shadow
	const {
		styesDesktop: bdShadowStyesDesktop,
		styesTab: bdShadowStyesTab,
		styesMobile: bdShadowStyesMobile,
		stylesHoverDesktop: bdShadowStylesHoverDesktop,
		stylesHoverTab: bdShadowStylesHoverTab,
		stylesHoverMobile: bdShadowStylesHoverMobile,
		transitionStyle: bdShadowTransitionStyle,
	} = generateBorderShadowStyles({
		controlName: WrpBdShadow,
		attributes,
		// noShadow: true,
		// noBorder: true,
	});

	// responsive range controller
	const {
		rangeStylesDesktop: quoteHeightStylesDesktop,
		rangeStylesTab: quoteHeightStylesTab,
		rangeStylesMobile: quoteHeightStylesMobile,
	} = generateResponsiveRangeStyles({
		controlName: QUOTE_SIZE,
		property: "height",
		attributes,
	});
	const {
		rangeStylesDesktop: quoteWidthStylesDesktop,
		rangeStylesTab: quoteWidthStylesTab,
		rangeStylesMobile: quoteWidthStylesMobile,
	} = generateResponsiveRangeStyles({
		controlName: QUOTE_SIZE,
		property: "width",
		attributes,
	});

	//Generate Background
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
		controlName: TestimonialWrapBg,
	});

	/**
	 * Assign CSS in variable for use in Markup
	 */
	const containerStyle = `
		.eb-testimonial-wrapper.${blockId} {
			${backgroundStylesDesktop}
			${wrapperMarginStylesDesktop}
			${wrapperPaddingStylesDesktop}
			${bdShadowStyesDesktop}
			transition:${bgTransitionStyle}, ${bdShadowTransitionStyle};
		}

		.eb-testimonial-wrapper.${blockId}:hover{		
			${hoverBackgroundStylesDesktop}
			${bdShadowStylesHoverDesktop}
		}
		
		.eb-testimonial-wrapper.${blockId}:before{
			${overlayStylesDesktop}
			transition:${ovlTransitionStyle};
		}
		
		.eb-testimonial-wrapper.${blockId}:hover:before{
			${hoverOverlayStylesDesktop}
		}
	`;

	const tabContainerStyle = `
		.eb-testimonial-wrapper.${blockId} {
			${wrapperMarginStylesTab}
			${wrapperPaddingStylesTab}
			${bdShadowStyesTab}
			${backgroundStylesTab}
		}
		
		.eb-testimonial-wrapper.${blockId}:hover{		
			${hoverBackgroundStylesTab}
			${bdShadowStylesHoverTab}
		}
		
		.eb-testimonial-wrapper.${blockId}:before{
			${overlayStylesTab}
		}
		
		.eb-testimonial-wrapper.${blockId}:hover:before{
			${hoverOverlayStylesTab}
		}
	`;

	const mobContainerStyle = `
		.eb-testimonial-wrapper.${blockId} {
			${wrapperMarginStylesMobile}
			${wrapperPaddingStylesMobile}
			${bdShadowStyesMobile}
			${backgroundStylesMobile}
		}

		.eb-testimonial-wrapper.${blockId}:hover{		
			${hoverBackgroundStylesMobile}
			${bdShadowStylesHoverMobile}
		}
		
		.eb-testimonial-wrapper.${blockId}:before{
			${overlayStylesMobile}
		}
		
		.eb-testimonial-wrapper.${blockId}:hover:before{
			${hoverOverlayStylesMobile}
		}
	`;

	const avatarContainerStyle = `
		.${blockId} .eb-avatar-container {
			order: ${avatarOrder};
			justify-content: ${avatarPosition};
			align-items: ${avatarAlign};
			font-size: ${avaterContainerFontSize}px;
			flex-direction: ${avatarInline ? "row" : "column"};
		}
	`;

	const imageContainerStyle = `
		.${blockId} .image-container {
			order: ${imagePosition};
			display: ${displayAvatar ? "block" : "none"};
		}
		.${blockId} .eb-avatar-style {
			background-image: url(${imageUrl});
			border-radius: ${borderRadius}%;
			display: ${imageUrl ? "block" : "none"};
		}
	`;

	const userInfoStyle = `
		.${blockId} .eb-userinfo-container {
			text-align: ${textAlign};
			justify-content: ${userInfoPos};
			align-self: ${userInfoAlign};
			margin-left: 15px;
		}
	`;

	const userNameStyle = `
		.${blockId} .eb-testimonial-username {
			${usernameTypoStylesDesktop}
			color: ${userNameColor};
		}
	`;

	const userNameStyleTab = `
		.${blockId} .eb-testimonial-username {
			${usernameTypoStylesTab}
		}
	`;

	const userNameStyleMobile = `
		.${blockId} .eb-testimonial-username {
			${usernameTypoStylesMobile}
		}
	`;

	const companyNameStyle = `
		.${blockId} .eb-testimonial-company { 
			${companyTypoStylesDesktop}
			color: ${companyColor};
		}
	`;
	const companyNameStyleTab = `
		.${blockId} .eb-testimonial-company { 
			${companyTypoStylesTab}
		}
	`;
	const companyNameStyleMobile = `
		.${blockId} .eb-testimonial-company { 
			${companyTypoStylesMobile}
		}
	`;

	const descriptionStyle = `
		.${blockId} .eb-description-container p {
			${descriptionTypoStylesDesktop}
			text-align: ${descTextAlign};
			color: ${descriptionColor};
			padding-right: 20px;
			word-break: break-word;
		}
		${quoteHorizontalPosition === "flex-end"
			? `.${blockId} .eb-description-container {
				flex-direction: row-reverse;
			}
			.${blockId} .eb-description-container .eb-testimonial-quote-style {
				transform: rotateY(180deg);
			}`
			: quoteHorizontalPosition === "center"
				? quoteVerticalPosition == 1
					? `.${blockId} .eb-description-container {
						flex-direction: column;
					}`
					: `.${blockId} .eb-description-container {
						flex-direction: column-reverse;
					}`
				: `.${blockId} .eb-description-container {
					flex-direction: row;
				}`
		}
	`;
	const descriptionStyleTab = `
		.${blockId} .eb-description-container p { 
			${descriptionTypoStylesTab}
		}
	`;
	const descriptionStyleMobile = `
		.${blockId} .eb-description-container p { 
			${descriptionTypoStylesMobile}
		}
	`;

	const quoteStyle = `
		.${blockId} .eb-testimonial-quote-style:before {
			content: none;
		}
		.${blockId} .eb-testimonial-quote-style svg {
			fill: ${quoteColor};
			${quoteHeightStylesDesktop}
			${quoteWidthStylesDesktop}
		}
	`;

	const quoteStyleTab = `
		.${blockId} .eb-testimonial-quote-style svg {
			${quoteHeightStylesTab}
			${quoteWidthStylesTab}
		}
	`;

	const quoteStyleMobile = `
		.${blockId} .eb-testimonial-quote-style svg {
			${quoteHeightStylesMobile}
			${quoteWidthStylesMobile}
		}
	`;

	const desktopAllStyles = softMinifyCssStrings(`
		${containerStyle}
		${avatarContainerStyle}
		${imageContainerStyle}
		${userInfoStyle}
		${userNameStyle}
		${companyNameStyle}
		${descriptionStyle}
		${quoteStyle}
	`);

	const tabAllStyles = softMinifyCssStrings(`
		${tabContainerStyle}
		${userNameStyleTab}
		${companyNameStyleTab}
		${descriptionStyleTab}
		${quoteStyleTab}
	`);

	const mobileAllStyles = softMinifyCssStrings(`
		${mobContainerStyle}
		${userNameStyleMobile}
		${companyNameStyleMobile}
		${descriptionStyleMobile}
		${quoteStyleMobile}
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

	const blockProps = useBlockProps({
		className: classnames(className, `eb-guten-block-main-parent-wrapper`),
	});

	const replaceString = (str, find, replace) => {
		return str.replace(new RegExp(find, "g"), replace);
	}

	blockProps.className = replaceString(blockProps.className, "eb-testimonial-wrapper", "");
	blockProps.className = replaceString(blockProps.className, blockId, "");

	return (
		<>
			{isSelected && (
				<Inspector attributes={attributes} setAttributes={setAttributes} />
			)}
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
					<div className={`eb-testimonial-wrapper ${blockId}`} data-id={blockId}>
						<div className="eb-testimonial-container">
							<div className="eb-avatar-container">
								<div className="image-container">
									<div className="eb-avatar-style" />
									<MediaUpload
										onSelect={(media) =>
											setAttributes({
												imageUrl: media.url,
												imageId: media.id,
											})
										}
										type="image"
										value={imageId}
										render={({ open }) =>
											!imageUrl && (
												<Button
													className="eb-testimonial-image components-button"
													label={__("Upload Image", "essential-blocks")}
													icon="format-image"
													onClick={open}
												/>
											)
										}
									/>
								</div>

								<div className="eb-userinfo-container">
									<RichText
										tagName="p"
										className="eb-testimonial-username"
										value={userName}
										onChange={(newName) => setAttributes({ userName: newName })}
									/>

									<RichText
										tagName="p"
										className="eb-testimonial-company"
										value={companyName}
										onChange={(newName) =>
											setAttributes({ companyName: newName })
										}
									/>
								</div>
							</div>

							<div className="eb-description-container">
								{enableQuote && (
									<div className="eb-testimonial-quote-style">
										<QuoteSVG />
									</div>
								)}

								<RichText
									tagName="p"
									className="eb-testimonial-description"
									value={description}
									onChange={(newText) => setAttributes({ description: newText })}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Edit;
