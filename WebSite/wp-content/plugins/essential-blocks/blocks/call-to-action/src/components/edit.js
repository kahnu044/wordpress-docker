/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useEffect } from "@wordpress/element";
import {
	AlignmentToolbar,
	BlockControls,
	RichText,
	useBlockProps,
} from "@wordpress/block-editor";
import { select } from "@wordpress/data";

/**
 * Internal dependencies
 */

import classnames from "classnames";

import Inspector from "./inspector";

const {
	softMinifyCssStrings,
	// mimmikCssForPreviewBtnClick,
	duplicateBlockIdFix,
	generateDimensionsControlStyles,
	generateTypographyStyles,
	generateResponsiveRangeStyles,
	generateBackgroundControlStyles,
	generateBorderShadowStyles,
} = window.EBControls;

import {
	WRAPPER_MARGIN,
	WRAPPER_PADDING,
	WRAPPER_BACK,
	WRAPPER_BORDER,
	TITLE_MARGIN,
	SUBTITLE_MARGIN,
	BUTTON_BORDER,
	BUTTON_PADDING,
	ICON_PADDING,
	ICON_SIZE,
	DESC_PADDING,
} from "./constants";
import {
	typoPrefix_title,
	typoPrefix_subtitle,
	typoPrefix_desc,
	typoPrefix_btn,
} from "./typographyPrefixConstants";

const edit = (props) => {
	const { isSelected, attributes, setAttributes, clientId, className } = props;
	const {
		blockMeta,
		blockId,
		resOption,
		contentStyle,
		contentAlign,
		showIcon,
		icon,
		iconColor,
		title,
		titleTag,
		titleColor,
		showSubtitle,
		subtitle,
		subtitleColor,
		sortableLists,
		description,
		descriptionColor,
		showButton,
		buttonText,
		buttonBackgroundColor,
		buttonTextColor,
		buttonSize,
		buttonHoverTextColor,
		buttonHoverBackgroundColor,
		buttonPosition,
		btnHoverEffect,
		classHook,
	} = attributes;

	const buttonSizeCss = (buttonSize) => {
		switch (buttonSize) {
			case "small":
				return `.eb-cia-wrapper.${blockId} .eb-cia-button.is-small {
					padding: 5px 10px;
					font-size: 14px;
				}`;
			case "medium":
				return `.eb-cia-wrapper.${blockId} .eb-cia-button.is-medium {
					padding: 8px 15px;
					font-size: 16px;
				}`;
			case "large":
				return `.eb-cia-wrapper.${blockId} .eb-cia-button.is-large {
					padding: 13px 20px;
					font-size: 18px;
				}`;
			case "extra-large":
				return `.eb-cia-wrapper.${blockId} .eb-cia-button.is-extra-large {
					padding: 15px 30px;
					font-size: 20px;
				}`;
			default:
				return "";
		}
	};

	// this useEffect is for creating an unique id for each block's unique className by a random unique number
	useEffect(() => {
		const BLOCK_PREFIX = "eb-call-to-action";
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

	// wrapper background
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
		controlName: WRAPPER_BACK,
	});

	// wrapper border & shadow settings
	const {
		styesDesktop: bdShadowStyesDesktop,
		styesTab: bdShadowStyesTab,
		styesMobile: bdShadowStyesMobile,
		stylesHoverDesktop: bdShadowStylesHoverDesktop,
		stylesHoverTab: bdShadowStylesHoverTab,
		stylesHoverMobile: bdShadowStylesHoverMobile,
		transitionStyle: bdShadowTransitionStyle,
	} = generateBorderShadowStyles({
		controlName: WRAPPER_BORDER,
		attributes,
	});

	// wrapper margin
	const {
		dimensionStylesDesktop: wrapperMarginStylesDesktop,
		dimensionStylesTab: wrapperMarginStylesTab,
		dimensionStylesMobile: wrapperMarginStylesMobile,
	} = generateDimensionsControlStyles({
		controlName: WRAPPER_MARGIN,
		styleFor: "margin",
		attributes,
	});

	// wrapper padding
	const {
		dimensionStylesDesktop: wrapperPaddingStylesDesktop,
		dimensionStylesTab: wrapperPaddingStylesTab,
		dimensionStylesMobile: wrapperPaddingStylesMobile,
	} = generateDimensionsControlStyles({
		controlName: WRAPPER_PADDING,
		styleFor: "padding",
		attributes,
	});

	// title typography
	const {
		typoStylesDesktop: titleTypoStylesDesktop,
		typoStylesTab: titleTypoStylesTab,
		typoStylesMobile: titleTypoStylesMobile,
	} = generateTypographyStyles({
		attributes,
		prefixConstant: typoPrefix_title,
	});

	// title margin
	const {
		dimensionStylesDesktop: titleMarginStylesDesktop,
		dimensionStylesTab: titleMarginStylesTab,
		dimensionStylesMobile: titleMarginStylesMobile,
	} = generateDimensionsControlStyles({
		controlName: TITLE_MARGIN,
		styleFor: "margin",
		attributes,
	});

	// subtitle typography
	const {
		typoStylesDesktop: subtitleTypoStylesDesktop,
		typoStylesTab: subtitleTypoStylesTab,
		typoStylesMobile: subtitleTypoStylesMobile,
	} = generateTypographyStyles({
		attributes,
		prefixConstant: typoPrefix_subtitle,
	});

	// subtitle margin
	const {
		dimensionStylesDesktop: subtitleMarginStylesDesktop,
		dimensionStylesTab: subtitleMarginStylesTab,
		dimensionStylesMobile: subtitleMarginStylesMobile,
	} = generateDimensionsControlStyles({
		controlName: SUBTITLE_MARGIN,
		styleFor: "margin",
		attributes,
	});

	// description typography
	const {
		typoStylesDesktop: descTypoStylesDesktop,
		typoStylesTab: descTypoStylesTab,
		typoStylesMobile: descTypoStylesMobile,
	} = generateTypographyStyles({
		attributes,
		prefixConstant: typoPrefix_desc,
	});

	// description padding
	const {
		dimensionStylesDesktop: descPaddingStylesDesktop,
		dimensionStylesTab: descPaddingStylesTab,
		dimensionStylesMobile: descPaddingStylesMobile,
	} = generateDimensionsControlStyles({
		controlName: DESC_PADDING,
		styleFor: "padding",
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

	// button padding
	const {
		dimensionStylesDesktop: btnPaddingStylesDesktop,
		dimensionStylesTab: btnPaddingStylesTab,
		dimensionStylesMobile: btnPaddingStylesMobile,
	} = generateDimensionsControlStyles({
		controlName: BUTTON_PADDING,
		styleFor: "padding",
		attributes,
	});

	// btn border & shadow settings
	const {
		styesDesktop: btnBdShadowStyesDesktop,
		styesTab: btnBdShadowStyesTab,
		styesMobile: btnBdShadowStyesMobile,
		stylesHoverDesktop: btnBdShadowStylesHoverDesktop,
		stylesHoverTab: btnBdShadowStylesHoverTab,
		stylesHoverMobile: btnBdShadowStylesHoverMobile,
		transitionStyle: btnBdShadowTransitionStyle,
	} = generateBorderShadowStyles({
		controlName: BUTTON_BORDER,
		attributes,
	});

	// icon size
	const {
		rangeStylesDesktop: iconSizeStylesDesktop,
		rangeStylesTab: iconSizeStylesTab,
		rangeStylesMobile: iconSizeStylesMobile,
	} = generateResponsiveRangeStyles({
		controlName: ICON_SIZE,
		property: "font-size",
		attributes,
		customUnit: "px",
	});

	// icon padding
	const {
		dimensionStylesDesktop: iconPaddingStylesDesktop,
		dimensionStylesTab: iconPaddingStylesTab,
		dimensionStylesMobile: iconPaddingStylesMobile,
	} = generateDimensionsControlStyles({
		controlName: ICON_PADDING,
		styleFor: "padding",
		attributes,
	});

	const desktopStyles = `
		.eb-cia-wrapper.${blockId} {
			${wrapperMarginStylesDesktop}
			${wrapperPaddingStylesDesktop}
			${wrapperBackgroundStylesDesktop}
			${bdShadowStyesDesktop}
			flex-direction: ${contentStyle === "basic" ? "column" : "row"};
			transition: ${wrapperBgTransitionStyle}, ${bdShadowTransitionStyle};
		}

		.eb-cia-wrapper.${blockId}:before {
			${wrapperOverlayStylesDesktop}
			transition: ${wrapperOvlTransitionStyle};
		}

		.eb-cia-wrapper.${blockId}:hover {
			${wrapperHoverBackgroundStylesDesktop}
			${bdShadowStylesHoverDesktop}
		}

		.eb-cia-wrapper.${blockId}:hover:before {
			${wrapperHoverOverlayStylesDesktop}
		}

		${contentAlign
			? `.eb-cia-wrapper.${blockId} .eb-cia-text-wrapper {
			text-align: ${contentAlign};
		}`
			: ""
		}
		
		.eb-cia-wrapper.${blockId} .eb-cia-title {
			${titleTypoStylesDesktop}
			${titleMarginStylesDesktop}
			${titleColor ? `color: ${titleColor}` : ""};
		}

		.eb-cia-wrapper.${blockId} .eb-cia-subtitle {
			${subtitleTypoStylesDesktop}
			${subtitleMarginStylesDesktop}
			${subtitleColor ? `color: ${subtitleColor}` : ""}
		}

		.eb-cia-wrapper.${blockId} .eb-cia-description {
			${descTypoStylesDesktop}
			${descPaddingStylesDesktop}
			${descriptionColor ? `color: ${descriptionColor}` : ""}
		}

		.eb-cia-wrapper.${blockId} .eb-cia-icon {
			${iconSizeStylesDesktop}
			${iconPaddingStylesDesktop}
			${iconColor ? `color: ${iconColor}` : ""}
		}

		${buttonSizeCss(buttonSize)}

		${buttonSize === "custom"
			? `
				.eb-cia-wrapper.${blockId} .eb-cia-button.is-custom {
					${btnPaddingStylesDesktop}
				}
			`
			: ""
		}

		.eb-cia-wrapper.${blockId} .eb-cia-button-wrapper {
			justify-content: ${buttonPosition};
		}

		.eb-cia-wrapper.${blockId} .eb-cia-button {
			${btnTypoStylesDesktop}
			${btnBdShadowStyesDesktop}
			${buttonTextColor ? `color: ${buttonTextColor}` : ""};
			${buttonBackgroundColor ? `background-color: ${buttonBackgroundColor}` : ""};
			transition: background 0.5s, ${btnBdShadowTransitionStyle};
		}

		.eb-cia-wrapper.${blockId} .eb-cia-button:hover {
			${btnBdShadowStylesHoverDesktop}
			${buttonHoverTextColor ? `color: ${buttonHoverTextColor}` : ""};
			${buttonHoverBackgroundColor
			? `background-color: ${buttonHoverBackgroundColor}`
			: ""
		};
		}

		${btnHoverEffect && buttonBackgroundColor
			? `.eb-cia-wrapper.${blockId} .eb-cia-button:before {
					background-color: ${buttonBackgroundColor};
			}
			`
			: ""
		}
	`;

	const tabStyles = `
		.eb-cia-wrapper.${blockId} {
			${wrapperMarginStylesTab}
			${wrapperPaddingStylesTab}
			${wrapperBackgroundStylesTab}
			${bdShadowStyesTab}
			flex-direction: column;
		}

		.eb-cia-wrapper.${blockId}:before {
			${wrapperOverlayStylesTab}
		}

		.eb-cia-wrapper.${blockId}:hover {
			${wrapperHoverBackgroundStylesTab}
			${bdShadowStylesHoverTab}
		}

		.eb-cia-wrapper.${blockId}:before:hover {
			${wrapperHoverOverlayStylesTab}
		}

		.eb-cia-wrapper.${blockId} .eb-cia-title {
			${titleTypoStylesTab}
			${titleMarginStylesTab}
		}

		.eb-cia-wrapper.${blockId} .eb-cia-subtitle {
			${subtitleTypoStylesTab}
			${subtitleMarginStylesTab}
		}

		.eb-cia-wrapper.${blockId} .eb-cia-description {
			${descTypoStylesTab}
			${descPaddingStylesTab}
		}

		${buttonSize === "custom"
			? `
				.eb-cia-wrapper.${blockId} .eb-cia-button.is-custom {
					${btnPaddingStylesTab}
				}
			`
			: ""
		}

		.eb-cia-wrapper.${blockId} .eb-cia-button {
			${btnTypoStylesTab}
			${btnBdShadowStyesTab}
		}

		.eb-cia-wrapper.${blockId} .eb-cia-button:hover {
			${btnBdShadowStylesHoverTab}
		}

		.eb-cia-wrapper.${blockId} .eb-cia-icon {
			${iconSizeStylesTab}
			${iconPaddingStylesTab}
		}
	`;

	const mobileStyles = `
		.eb-cia-wrapper.${blockId} {
			${wrapperMarginStylesMobile}
			${wrapperPaddingStylesMobile}
			${wrapperBackgroundStylesMobile}
			${bdShadowStyesMobile}
		}

		.eb-cia-wrapper.${blockId}:before {
			${wrapperOverlayStylesMobile}
		}
		
		.eb-cia-wrapper.${blockId}:hover {
			${wrapperHoverBackgroundStylesMobile}
			${bdShadowStylesHoverMobile}
		}

		.eb-cia-wrapper.${blockId}:before:hover {
			${wrapperHoverOverlayStylesMobile}
		}

		.eb-cia-wrapper.${blockId} .eb-cia-title {
			${titleTypoStylesMobile}
			${titleMarginStylesMobile}
		}

		.eb-cia-wrapper.${blockId} .eb-cia-subtitle {
			${subtitleTypoStylesMobile}
			${subtitleMarginStylesMobile}
		}

		.eb-cia-wrapper.${blockId} .eb-cia-description {
			${descTypoStylesMobile}
			${descPaddingStylesMobile}
		}

		${buttonSize === "custom"
			? `
				.eb-cia-wrapper.${blockId} .eb-cia-button.is-custom {
					${btnPaddingStylesMobile}
				}
			`
			: ""
		}

		.eb-cia-wrapper.${blockId} .eb-cia-button {
			${btnTypoStylesMobile}
			${btnBdShadowStyesMobile}
		}

		.eb-cia-wrapper.${blockId} .eb-cia-button:hover {
			${btnBdShadowStylesHoverMobile}
		}

		.eb-cia-wrapper.${blockId} .eb-cia-icon {
			${iconSizeStylesMobile}
			${iconPaddingStylesMobile}
		}
	`;

	// all css styles for large screen width (desktop/laptop) in strings ⬇
	const desktopAllStyles = softMinifyCssStrings(`
		${desktopStyles}
	`);

	// all css styles for Tab in strings ⬇
	const tabAllStyles = softMinifyCssStrings(`
		${tabStyles}
	`);

	// all css styles for Mobile in strings ⬇
	const mobileAllStyles = softMinifyCssStrings(`
		${mobileStyles}
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
			<BlockControls>
				<AlignmentToolbar
					value={contentAlign}
					onChange={(contentAlign) => setAttributes({ contentAlign })}
				/>
			</BlockControls>
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
					<div className={`eb-cia-wrapper ${blockId}`}>
						<div className="eb-cia-text-wrapper">
							{sortableLists.map(({ label, value }, index) => {
								if (value === "title") {
									return (
										<RichText
											key={index}
											tagName={titleTag}
											className="eb-cia-title"
											placeholder={__("Add title...", "essential-blocks")}
											value={title}
											onChange={(newTitle) => setAttributes({ title: newTitle })}
										/>
									);
								} else if (value === "subtitle") {
									return (
										showSubtitle && (
											<RichText
												key={index}
												tagName="h4"
												className="eb-cia-subtitle"
												placeholder={__("Add subtitle...")}
												value={subtitle}
												onChange={(newSubtitle) =>
													setAttributes({ subtitle: newSubtitle })
												}
											/>
										)
									);
								} else if (value === "icon") {
									return (
										showIcon && (
											<div key={index} className={`eb-cia-icon ${icon}`} />
										)
									);
								} else if (value === "description") {
									return (
										<RichText
											key={index}
											tagName="p"
											className="eb-cia-description"
											placeholder={__("Add Description...", "essential-blocks")}
											value={description}
											onChange={(newText) =>
												setAttributes({ description: newText })
											}
										/>
									);
								}
							})}
						</div>
						{showButton && (
							<div className="eb-cia-button-wrapper">
								<RichText
									className={`eb-cia-button is-${buttonSize}${btnHoverEffect ? ` ${btnHoverEffect}` : ""
										}`}
									placeholder={__("Add Text", "essential-blocks")}
									value={buttonText}
									onChange={(newText) => setAttributes({ buttonText: newText })}
								/>
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default edit;
