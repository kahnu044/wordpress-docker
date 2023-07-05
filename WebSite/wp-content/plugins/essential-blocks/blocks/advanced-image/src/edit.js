/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
	MediaUpload,
	MediaPlaceholder,
	RichText,
	BlockControls,
	useBlockProps,
	BlockAlignmentToolbar,
} from "@wordpress/block-editor";
import {
	ToolbarGroup,
	ToolbarItem,
	ToolbarButton,
} from "@wordpress/components";
import { edit } from "@wordpress/icons";
import { Fragment, useEffect } from "@wordpress/element";
import { select } from "@wordpress/data";

/**
 * Internal depencencies
 */
import classnames from "classnames";

import Inspector from "./inspector";
import {
	WRAPPER_BG,
	WRAPPER_MARGIN,
	WRAPPER_PADDING,
	WRAPPER_BORDER_SHADOW,
	IMAGE_WIDTH,
	IMAGE_HEIGHT,
	IMAGE_BORDER_SHADOW,
	CAPTION_MARGIN,
	CAPTION_PADDING,
	CAPTION_TYPOGRAPHY,
	CAPTION_WIDTH,
} from "./constants";

const {
	softMinifyCssStrings,
	generateTypographyStyles,
	generateDimensionsControlStyles,
	generateBorderShadowStyles,
	generateResponsiveRangeStyles,
	generateBackgroundControlStyles,
	// mimmikCssForPreviewBtnClick,
	duplicateBlockIdFix,
} = window.EBControls;

export default function Edit(props) {
	const { attributes, setAttributes, className, clientId, isSelected } = props;
	const {
		resOption,
		blockId,
		blockMeta,
		image,
		imageCaption,
		displayCaption,
		captionColor,
		captionBGColor,
		horizontalAlign,
		verticalAlign,
		verticalAlignCap2,
		textAlign,
		stylePreset,
		captionStyle,
		hoverEffect,
		imageAlign,
		complexStyle,
		autoFit,
		classHook,
	} = attributes;

	// this useEffect is for creating a unique id for each block's unique className by a random unique number
	useEffect(() => {
		const BLOCK_PREFIX = "eb-advanced-image";
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

	const setimageAlign = (newAlign) => {
		switch (newAlign) {
			case "left":
				setAttributes({ imageAlign: "0" });
				break;
			case "right":
				setAttributes({ imageAlign: "0 0 0 auto" });
				break;
			default:
				setAttributes({ imageAlign: "0 auto" });
		}
	};

	/**
	 * CSS/styling Codes Starts from Here
	 */

	// Caption Typography
	const {
		typoStylesDesktop: captionTypographyDesktop,
		typoStylesTab: captionTypographyTab,
		typoStylesMobile: captionTypographyMobile,
	} = generateTypographyStyles({
		attributes,
		prefixConstant: CAPTION_TYPOGRAPHY,
		defaultFontSize: 13,
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

	/* Caption Margin */
	const {
		dimensionStylesDesktop: captionMarginDesktop,
		dimensionStylesTab: captionMarginTab,
		dimensionStylesMobile: captionMarginMobile,
	} = generateDimensionsControlStyles({
		controlName: CAPTION_MARGIN,
		styleFor: "margin",
		attributes,
	});

	/* Caption Padding */
	const {
		dimensionStylesDesktop: captionPaddingDesktop,
		dimensionStylesTab: captionPaddingTab,
		dimensionStylesMobile: captionPaddingMobile,
	} = generateDimensionsControlStyles({
		controlName: CAPTION_PADDING,
		styleFor: "padding",
		attributes,
	});

	// range controller Separator Line Width
	const {
		rangeStylesDesktop: imageWidthDesktop,
		rangeStylesTab: imageWidthTab,
		rangeStylesMobile: imageWidthMobile,
	} = generateResponsiveRangeStyles({
		controlName: IMAGE_WIDTH,
		property: "",
		attributes,
	});

	// range controller Separator Line Width
	const {
		rangeStylesDesktop: imageHeightDesktop,
		rangeStylesTab: imageHeightTab,
		rangeStylesMobile: imageHeightMobile,
	} = generateResponsiveRangeStyles({
		controlName: IMAGE_HEIGHT,
		property: "",
		attributes,
	});

	// range controller Separator Line Grid Column Margin Bottom
	const {
		rangeStylesDesktop: captionWidthDesktop,
		rangeStylesTab: captionWidthTab,
		rangeStylesMobile: captionWidthMobile,
	} = generateResponsiveRangeStyles({
		controlName: CAPTION_WIDTH,
		property: "width",
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
		bgTransitionStyle: wrapperBgTransitionStyle,
	} = generateBackgroundControlStyles({
		attributes,
		controlName: WRAPPER_BG,
		noOverlay: true,
	});

	// generateBorderShadowStyles for Wrapper ⬇
	const {
		styesDesktop: wrapperBDShadowDesktop,
		styesTab: wrapperBDShadowTab,
		styesMobile: wrapperBDShadowMobile,
		stylesHoverDesktop: wrapperBDShadowHoverDesktop,
		stylesHoverTab: wrapperBDShadowHoverTab,
		stylesHoverMobile: wrapperBDShadowHoverMobile,
		transitionStyle: wrapperBDShadowTransitionStyle,
	} = generateBorderShadowStyles({
		controlName: WRAPPER_BORDER_SHADOW,
		attributes,
		// noShadow: true,
		// noBorder: true,
	});

	// generateBorderShadowStyles for Images ⬇
	const {
		styesDesktop: imageBDShadowDesktop,
		styesTab: imageBDShadowTab,
		styesMobile: imageBDShadowMobile,
		stylesHoverDesktop: imageBDShadowHoverDesktop,
		stylesHoverTab: imageBDShadowHoverTab,
		stylesHoverMobile: imageBDShadowHoverMobile,
		transitionStyle: imageBDShadowTransitionStyle,
	} = generateBorderShadowStyles({
		controlName: IMAGE_BORDER_SHADOW,
		attributes,
		// noShadow: true,
		// noBorder: true,
	});

	// wrapper styles css in strings ⬇
	const wrapperStylesDesktop = `
		.eb-advanced-image-wrapper.${blockId}{
			${wrapperMarginDesktop}
			${wrapperPaddingDesktop}
			${wrapperBDShadowDesktop}
			${wrapperBackgroundStylesDesktop}
			transition:${wrapperBgTransitionStyle}, ${wrapperBDShadowTransitionStyle};
		}
		.eb-advanced-image-wrapper.${blockId}:hover {
			${wrapperBDShadowHoverDesktop}
			${wrapperHoverBackgroundStylesDesktop}
		}
	`;
	const wrapperStylesTab = `
		.eb-advanced-image-wrapper.${blockId}{
			${wrapperMarginTab}
			${wrapperPaddingTab}
			${wrapperBDShadowTab}
			${wrapperBackgroundStylesTab}
		}
		.eb-advanced-image-wrapper.${blockId}:hover {
			${wrapperBDShadowHoverTab}
			${wrapperHoverBackgroundStylesTab}
		}
	`;
	const wrapperStylesMobile = `
		.eb-advanced-image-wrapper.${blockId}{
			${wrapperMarginMobile}
			${wrapperPaddingMobile}
			${wrapperBDShadowMobile}
			${wrapperBackgroundStylesMobile}
		}
		.eb-advanced-image-wrapper.${blockId}:hover {
			${wrapperBDShadowHoverMobile}
			${wrapperHoverBackgroundStylesMobile}
		}
	`;

	const imageStylesDesktop = `
		.eb-advanced-image-wrapper.${blockId} .image-wrapper{
			width${imageWidthDesktop || ": auto"};
			height${imageHeightDesktop || ": auto"};
			${!complexStyle ? imageBDShadowDesktop : ""}
			transition: transform 0.5s, ${imageBDShadowTransitionStyle};
			margin: ${imageAlign};
		}

		.eb-advanced-image-wrapper.${blockId} .image-wrapper img{
			transition: transform 0.5s, ${imageBDShadowTransitionStyle};
			${autoFit ? "object-fit: cover;" : ""}
		}

		.eb-advanced-image-wrapper.${blockId} figcaption{
			color: ${captionColor};
			text-align: ${textAlign};
			${captionMarginDesktop}
			${captionPaddingDesktop}
			${captionTypographyDesktop}
			${captionWidthDesktop}
		}
		.eb-advanced-image-wrapper.${blockId}.caption-style-1 figcaption {
			background-color: ${captionBGColor};
		}
		.eb-advanced-image-wrapper.${blockId} .image-wrapper:hover {
			${!complexStyle ? imageBDShadowHoverDesktop : ""}
		}
		${
			!displayCaption
				? ` .eb-advanced-image-wrapper.${blockId} figcaption {display:none;} `
				: ""
		}
	`;

	const imageStylesTab = `
		.eb-advanced-image-wrapper.${blockId} .image-wrapper{
			width${imageWidthTab || ": auto"};
			height${imageHeightTab || ": auto"};
		}
		.eb-advanced-image-wrapper.${blockId} .image-wrapper:hover {
			${!complexStyle ? imageBDShadowHoverTab : ""}
		}
		.eb-advanced-image-wrapper.${blockId} figcaption {
			${captionMarginTab}
			${captionPaddingTab}
			${captionTypographyTab}
			${captionWidthTab}
		}
	`;

	const imageStylesMobile = `
		.eb-advanced-image-wrapper.${blockId} .image-wrapper img{
			${!complexStyle ? imageBDShadowMobile : ""}
		}
		.eb-advanced-image-wrapper.${blockId} .image-wrapper:hover {
			${!complexStyle ? imageBDShadowHoverMobile : ""}
		}
		.eb-advanced-image-wrapper.${blockId} .image-wrapper figcaption {
			${captionMarginMobile}
			${captionPaddingMobile}
			${captionTypographyMobile}
			${captionWidthMobile}
		}
		.eb-advanced-image-wrapper.${blockId} .image-wrapper{
			width${imageWidthMobile || ": auto"};
			height${imageHeightMobile || ": auto"};
		}
	`;

	// all css styles for large screen width (desktop/laptop) in strings ⬇
	const desktopAllStyles = softMinifyCssStrings(`
		${wrapperStylesDesktop}
		${imageStylesDesktop}
	`);

	// all css styles for Tab in strings ⬇
	const tabAllStyles = softMinifyCssStrings(`
		${wrapperStylesTab}
		${imageStylesTab}
	`);

	// all css styles for Mobile in strings ⬇
	const mobileAllStyles = softMinifyCssStrings(`
		${wrapperStylesMobile}
		${imageStylesMobile}
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

	// Get only urls for Lightbox
	let urls = image.url;

	return (
		<>
			{isSelected && urls && (
				<Inspector attributes={attributes} setAttributes={setAttributes} />
			)}
			<BlockControls>
				<BlockAlignmentToolbar
					value={imageAlign}
					onChange={(newAlign) => setimageAlign(newAlign)}
					controls={["left", "center", "right"]}
				/>
			</BlockControls>
			<Fragment>
				{image.url === "" && (
					<MediaPlaceholder
						onSelect={(media) => {
							setAttributes({
								image: {
									id: media.id,
									url: media.url,
									alt: media.alt,
								},
								imageCaption: media.caption,
							});
						}}
						accept="image/*"
						allowedTypes={["image"]}
						// multiple
						labels={{
							title: "Upload Image",
							instructions:
								"Drag media file, upload or select image from your library.",
						}}
					/>
				)}
			</Fragment>
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
				{urls && (
					<Fragment>
						<BlockControls>
							<ToolbarGroup>
								<ToolbarItem>
									{() => (
										<MediaUpload
											value={image.id}
											onSelect={(media) => {
												setAttributes({
													image: {
														id: media.id,
														url: media.url,
														alt: media.alt,
													},
												});
											}}
											accept="image/*"
											allowedTypes={["image"]}
											render={({ open }) => (
												<ToolbarButton
													className="components-toolbar__control"
													label={__("Replace Image", "essential-blocks")}
													icon={edit}
													onClick={open}
												/>
											)}
										/>
									)}
								</ToolbarItem>
							</ToolbarGroup>
						</BlockControls>

						<div
							className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`}
						>
							<figure
								className={`eb-advanced-image-wrapper ${blockId} img-style-${stylePreset} ${captionStyle} caption-horizontal-${horizontalAlign} caption-vertical-${verticalAlign} ${verticalAlignCap2} ${hoverEffect}`}
								data-id={blockId}
							>
								<div className="image-wrapper">
									<img src={urls} alt={image.alt} />

									{(!RichText.isEmpty(imageCaption) || isSelected) &&
										displayCaption &&
										captionStyle != "caption-style-2" && (
											<RichText
												// ref={captionRef}
												tagName="figcaption"
												aria-label={__("Image Caption Text")}
												placeholder={__("Add Caption")}
												value={imageCaption}
												onChange={(value) =>
													setAttributes({ imageCaption: value })
												}
												inlineToolbar
												__unstableOnSplitAtEnd={() =>
													insertBlocksAfter(createBlock("core/paragraph"))
												}
											/>
										)}
								</div>

								{(!RichText.isEmpty(imageCaption) || isSelected) &&
									displayCaption &&
									captionStyle == "caption-style-2" && (
										<RichText
											// ref={captionRef}
											tagName="figcaption"
											aria-label={__("Image Caption Text")}
											placeholder={__("Add Caption")}
											value={imageCaption}
											onChange={(value) =>
												setAttributes({ imageCaption: value })
											}
											inlineToolbar
											__unstableOnSplitAtEnd={() =>
												insertBlocksAfter(createBlock("core/paragraph"))
											}
										/>
									)}
							</figure>
						</div>
					</Fragment>
				)}
			</div>
		</>
	);
}
