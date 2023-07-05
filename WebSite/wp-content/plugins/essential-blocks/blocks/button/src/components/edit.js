/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useEffect } from "@wordpress/element";
import { select } from "@wordpress/data";
import { Dashicon } from "@wordpress/components";
import {
	useBlockProps,
	RichText,
	URLInput,
	BlockControls,
	BlockAlignmentToolbar,
} from "@wordpress/block-editor";

/**
 * Internal dependencies
 */

import classnames from "classnames";

import Inspector from "./inspector";
import {
	BUTTON_PADDING,
	FIXED_WIDTH,
	ICON_SIZE,
	ICON_SPACE,
	BUTTON_BACKGROUND,
	BUTTON_BORDER,
	WRAPPER_MARGIN,
} from "./constants";

import { typoPrefix_text } from "./typographyContants";

const {
	softMinifyCssStrings,
	// mimmikCssForPreviewBtnClick,
	duplicateBlockIdFix,
	generateDimensionsControlStyles,
	generateBorderShadowStyles,
	generateTypographyStyles,
	generateBackgroundControlStyles,
	generateResponsiveRangeStyles,
    DynamicInputValueHandler
} = window.EBControls;

const edit = (props) => {
	const { attributes, setAttributes, isSelected, clientId, className } = props;
	const {
		blockMeta,
		blockId,
		resOption,
		buttonWidth,
		addIcon,
		icon,
		iconPosition,
		buttonText,
		hoverTextColor,
		textColor,
		buttonURL,
		buttonAlign,
		hoverEffect,
		hoverTransition,
		classHook,
		type,
	} = attributes;

	// this useEffect is for creating an unique id for each block's unique className by a random unique number
	useEffect(() => {
		const BLOCK_PREFIX = "eb-button";
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

	const setButtonAlign = (newAlign) => {
		switch (newAlign) {
			case "left":
				setAttributes({ buttonAlign: "flex-start" });
				break;

			case "center":
				setAttributes({ buttonAlign: "center" });
				break;

			case "right":
				setAttributes({ buttonAlign: "flex-end" });
				break;
		}
	};

	// button custom padding
	const {
		dimensionStylesDesktop: buttonPaddingDesktop,
		dimensionStylesTab: buttonPaddingTab,
		dimensionStylesMobile: buttonPaddingMobile,
	} = generateDimensionsControlStyles({
		controlName: BUTTON_PADDING,
		styleFor: "padding",
		attributes,
	});

	// button custom width
	const {
		rangeStylesDesktop: buttonWidthDesktop,
		rangeStylesTab: buttonWidthTab,
		rangeStylesMobile: buttonWidthMobile,
	} = generateResponsiveRangeStyles({
		controlName: FIXED_WIDTH,
		property: "width",
		attributes,
	});

	// button icon size
	const {
		rangeStylesDesktop: iconSizeDesktop,
		rangeStylesTab: iconSizeTab,
		rangeStylesMobile: iconSizeMobile,
	} = generateResponsiveRangeStyles({
		controlName: ICON_SIZE,
		property: "font-size",
		attributes,
		customUnit: "px",
	});

	// button gap left
	const {
		rangeStylesDesktop: iconGapLeftDesktop,
		rangeStylesTab: iconGapLeftTab,
		rangeStylesMobile: iconGapLeftMobile,
	} = generateResponsiveRangeStyles({
		controlName: ICON_SPACE,
		property: "margin-left",
		attributes,
		customUnit: "px",
	});

	// button gap right
	const {
		rangeStylesDesktop: iconGapRightDesktop,
		rangeStylesTab: iconGapRightTab,
		rangeStylesMobile: iconGapRightMobile,
	} = generateResponsiveRangeStyles({
		controlName: ICON_SPACE,
		property: "margin-right",
		attributes,
		customUnit: "px",
	});

	// button background styles
	const {
		backgroundStylesDesktop: btnBackgroundStylesDesktop,
		hoverBackgroundStylesDesktop: btnHoverBackgroundStylesDesktop,
		bgTransitionStyle: btnBgTransitionStyle,
	} = generateBackgroundControlStyles({
		attributes,
		controlName: BUTTON_BACKGROUND,
	});

	// border
	const {
		styesDesktop: bdShadowStyesDesktop,
		styesTab: bdShadowStyesTab,
		styesMobile: bdShadowStyesMobile,
		stylesHoverDesktop: bdShadowStylesHoverDesktop,
		stylesHoverTab: bdShadowStylesHoverTab,
		stylesHoverMobile: bdShadowStylesHoverMobile,
		transitionStyle: bdShadowTransitionStyle,
	} = generateBorderShadowStyles({
		controlName: BUTTON_BORDER,
		attributes,
	});

	// typography
	const {
		typoStylesDesktop: textTypoStylesDesktop,
		typoStylesTab: textTypoStylesTab,
		typoStylesMobile: textTypoStylesMobile,
	} = generateTypographyStyles({
		attributes,
		prefixConstant: typoPrefix_text,
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

	const desktopStyles = `
		.eb-button-wrapper.${blockId} {
			${wrapperMarginStylesDesktop}
		}

		.eb-button-wrapper.${blockId}.eb-button-alignment {
			align-items: ${buttonAlign};
		}

		.eb-button-wrapper.${blockId} .eb-button {
			justify-content: ${buttonAlign};
		}

		.eb-button-wrapper.${blockId} .eb-button-anchor {
			${btnBackgroundStylesDesktop}
			${bdShadowStyesDesktop}
			${textTypoStylesDesktop}
			${buttonPaddingDesktop}
			${textColor ? `color: ${textColor};` : ""}
			transition: ${hoverTransition ? `all ${hoverTransition}s,` : ""
		} ${btnBgTransitionStyle}, ${bdShadowTransitionStyle};
		}

		${hoverEffect
			? `.eb-button-wrapper.${blockId} .eb-button-anchor:before {
				${btnBackgroundStylesDesktop}
			}
			`
			: ""
		}

		.eb-button-wrapper.${blockId} .eb-button-anchor:hover {
			${btnHoverBackgroundStylesDesktop}
			${bdShadowStylesHoverDesktop}
			${hoverTextColor ? `color: ${hoverTextColor};` : ""}
		}

		${buttonWidth !== "auto"
			? buttonWidth === "full"
				? `
					.eb-button-wrapper.${blockId} .eb-button-anchor {
						width: 100%;
					}`
				: `.eb-button-wrapper.${blockId} .eb-button-anchor {
							${buttonWidthDesktop}
						}`
			: ""
		}

		${addIcon
			? `.eb-button-wrapper.${blockId} .eb-button-icon {
					${iconSizeDesktop}
					${iconPosition === "left" ? iconGapRightDesktop : iconGapLeftDesktop}
				}`
			: ""
		}
	`;

	const tabStyles = `
		.eb-button-wrapper.${blockId} {
			${wrapperMarginStylesTab}
		}

		.eb-button-wrapper.${blockId} .eb-button-anchor {
			${bdShadowStyesTab}
			${textTypoStylesTab}
			${buttonPaddingTab}
		}

		.eb-button-wrapper.${blockId} .eb-button-anchor:hover {
			${bdShadowStylesHoverTab}
		}

		${buttonWidth === "fixed"
			? `.eb-button-wrapper.${blockId} .eb-button-anchor {
					${buttonWidthTab}
				}`
			: ""
		}

		${addIcon
			? `.eb-button-wrapper.${blockId} .eb-button-icon {
					${iconSizeTab}
					${iconPosition === "left" ? iconGapRightTab : iconGapLeftTab}
				}`
			: ""
		}
	`;

	const mobileStyles = `
		.eb-button-wrapper.${blockId} {
			${wrapperMarginStylesMobile}
		}

		.eb-button-wrapper.${blockId} .eb-button-anchor {
			${bdShadowStyesMobile}
			${textTypoStylesMobile}
			${buttonPaddingMobile}
		}

		.eb-button-wrapper.${blockId} .eb-button-anchor:hover {
			${bdShadowStylesHoverMobile}
		}

		${buttonWidth === "fixed"
			? `.eb-button-wrapper.${blockId} .eb-button-anchor {
					${buttonWidthMobile}
				}`
			: ""
		}

		${addIcon
			? `.eb-button-wrapper.${blockId} .eb-button-icon {
					${iconSizeMobile}
					${iconPosition === "left" ? iconGapRightMobile : iconGapLeftMobile}
				}`
			: ""
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
				<BlockAlignmentToolbar
					value={buttonAlign}
					onChange={(newAlign) => setButtonAlign(newAlign)}
					controls={["left", "center", "right"]}
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

					<div className={`eb-button-wrapper eb-button-alignment ${blockId}`}>
						<div className={`eb-button eb-button-${type}`}>
							<a
								className={`eb-button-anchor${hoverEffect ? ` ${hoverEffect}` : ""
									}`}
							>
								{addIcon && iconPosition === "left" ? (
									<i
										className={`${icon} eb-button-icon eb-button-icon-left hvr-icon`}
									></i>
								) : (
									""
								)}
								<DynamicInputValueHandler
									placeholder={__("Add Text..", "essential-blocks")}
									keepPlaceholderOnFocus
									className="eb-button-text"
									value={buttonText}
									onChange={(newText) => setAttributes({ buttonText: newText })}
									allowedFormats={[
										"core/bold",
										"core/italic",
										"core/strikethrough",
									]}
								/>
								{addIcon && iconPosition === "right" ? (
									<i
										className={`${icon} eb-button-icon eb-button-icon-right hvr-icon`}
									></i>
								) : (
									""
								)}
							</a>
						</div>
						{isSelected && (
							<div className="eb-button-link">
								<Dashicon icon="admin-links" />
								<URLInput
									value={buttonURL}
									onChange={(newURL) => setAttributes({ buttonURL: newURL })}
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
