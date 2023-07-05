/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { RichText, useBlockProps } from "@wordpress/block-editor";
import { useEffect } from "@wordpress/element";
import { select } from "@wordpress/data";

/**
 * Internal depencencies
 */
import classnames from "classnames";

import Inspector from "./inspector";
import {
	BUTTON_ONE_BACKGROUND,
	BUTTON_TWO_BACKGROUND,
	BUTTON_ONE_BORDER_SHADOW,
	BUTTON_TWO_BORDER_SHADOW,
	WRAPPER_MARGIN,
	BUTTONS_PADDING,
	BUTTONS_WIDTH,
	BUTTONS_GAP,
	BUTTONS_CONNECTOR_SIZE,
	BUTTONS_CONNECTOR_ICON_SIZE,
} from "./constants/constants";
import {
	BUTTONS_TYPOGRAPHY,
	BUTTONS_CONNECTOR_TYPOGRAPHY,
} from "./constants/typographyPrefixConstants";

const {
	softMinifyCssStrings,
	generateTypographyStyles,
	generateDimensionsControlStyles,
	generateBorderShadowStyles,
	generateResponsiveRangeStyles,
	generateBackgroundControlStyles,
	// mimmikCssForPreviewBtnClick,
	duplicateBlockIdFix,
    DynamicInputValueHandler
} = window.EBControls;

export default function Edit(props) {
	const { attributes, setAttributes, className, clientId, isSelected } = props;
	const {
		blockId,
		blockMeta,
		// responsive control attribute ⬇
		resOption,
		preset,
		contentPosition,
		buttonTextOne,
		buttonTextTwo,
		buttonOneColor,
		hoverButtonOneColor,
		textOneColor,
		hoverTextOneColor,
		buttonTwoColor,
		hoverButtonTwoColor,
		textTwoColor,
		hoverTextTwoColor,
		innerButtonText,
		innerButtonColor,
		innerButtonTextColor,
		innerButtonIcon,
		showConnector,
		connectorType,
		buttonTextAlign,
		classHook,
		buttonsWidthType,
	} = attributes;

	// this useEffect is for creating a unique id for each block's unique className by a random unique number
	useEffect(() => {
		const BLOCK_PREFIX = "eb-button-group";
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
		typoStylesDesktop: buttonsTypoStylesDesktop,
		typoStylesTab: buttonsTypoStylesTab,
		typoStylesMobile: buttonsTypoStylesMobile,
	} = generateTypographyStyles({
		attributes,
		prefixConstant: BUTTONS_TYPOGRAPHY,
		defaultFontSize: 16,
	});

	const {
		typoStylesDesktop: connectorTypoStylesDesktop,
		typoStylesTab: connectorTypoStylesTab,
		typoStylesMobile: connectorTypoStylesMobile,
	} = generateTypographyStyles({
		attributes,
		prefixConstant: BUTTONS_CONNECTOR_TYPOGRAPHY,
		defaultFontSize: 14,
	});

	const {
		dimensionStylesDesktop: wrapperMarginStylesDesktop,
		dimensionStylesTab: wrapperMarginStylesTab,
		dimensionStylesMobile: wrapperMarginStylesMobile,
	} = generateDimensionsControlStyles({
		controlName: WRAPPER_MARGIN,
		styleFor: "margin",
		attributes,
	});

	const {
		dimensionStylesDesktop: buttonsPaddingStylesDesktop,
		dimensionStylesTab: buttonsPaddingStylesTab,
		dimensionStylesMobile: buttonsPaddingStylesMobile,
	} = generateDimensionsControlStyles({
		controlName: BUTTONS_PADDING,
		styleFor: "padding",
		attributes,
	});

	const {
		styesDesktop: buttonOneBDShadowDesktop,
		styesTab: buttonOneBDShadowTab,
		styesMobile: buttonOneBDShadowMobile,
		stylesHoverDesktop: buttonOneBDShadowHoverDesktop,
		stylesHoverTab: buttonOneBDShadowHoverTab,
		stylesHoverMobile: buttonOneBDShadowHoverMobile,
		transitionStyle: buttonOneBDShadowtransitionStyle,
	} = generateBorderShadowStyles({
		controlName: BUTTON_ONE_BORDER_SHADOW,
		attributes,
		noShadow: true,
	});

	const {
		styesDesktop: buttonTwoBDShadowDesktop,
		styesTab: buttonTwoBDShadowTab,
		styesMobile: buttonTwoBDShadowMobile,
		stylesHoverDesktop: buttonTwoBDShadowHoverDesktop,
		stylesHoverTab: buttonTwoBDShadowHoverTab,
		stylesHoverMobile: buttonTwoBDShadowHoverMobile,
		transitionStyle: buttonTwoBDShadowtransitionStyle,
	} = generateBorderShadowStyles({
		controlName: BUTTON_TWO_BORDER_SHADOW,
		attributes,
		noShadow: true,
	});

	// responsive range controller
	const {
		rangeStylesDesktop: buttonWidthStyleDesktop,
		rangeStylesTab: buttonWidthStyleTab,
		rangeStylesMobile: buttonWidthStyleMobile,
	} = generateResponsiveRangeStyles({
		controlName: BUTTONS_WIDTH,
		property: "width",
		attributes,
	});

	const {
		rangeStylesDesktop: buttonGapDesktop,
		rangeStylesTab: buttonGapTab,
		rangeStylesMobile: buttonGapMobile,
	} = generateResponsiveRangeStyles({
		controlName: BUTTONS_GAP,
		property: "margin",
		attributes,
	});

	const {
		rangeStylesDesktop: buttonConnectorHeightDesktop,
		rangeStylesTab: buttonConnectorHeightTab,
		rangeStylesMobile: buttonConnectorHeightMobile,
	} = generateResponsiveRangeStyles({
		controlName: BUTTONS_CONNECTOR_SIZE,
		property: "height",
		attributes,
	});

	const {
		rangeStylesDesktop: buttonConnectorWidthDesktop,
		rangeStylesTab: buttonConnectorWidthTab,
		rangeStylesMobile: buttonConnectorWidthMobile,
	} = generateResponsiveRangeStyles({
		controlName: BUTTONS_CONNECTOR_SIZE,
		property: "width",
		attributes,
	});

	const {
		rangeStylesDesktop: buttonConnectorLineHeightDesktop,
		rangeStylesTab: buttonConnectorLineHeightTab,
		rangeStylesMobile: buttonConnectorLineHeightMobile,
	} = generateResponsiveRangeStyles({
		controlName: BUTTONS_CONNECTOR_SIZE,
		property: "line-height",
		attributes,
	});

	const {
		rangeStylesDesktop: buttonConnectorIconSizeDesktop,
		rangeStylesTab: buttonConnectorIconSizeTab,
		rangeStylesMobile: buttonConnectorIconSizeMobile,
	} = generateResponsiveRangeStyles({
		controlName: BUTTONS_CONNECTOR_ICON_SIZE,
		property: "font-size",
		attributes,
	});

	// button background styles
	const {
		backgroundStylesDesktop: btnOneBg,
		hoverBackgroundStylesDesktop: btnOneHoverBg,
		bgTransitionStyle: btnOneBgTransition,
	} = generateBackgroundControlStyles({
		attributes,
		controlName: BUTTON_ONE_BACKGROUND,
	});
	const {
		backgroundStylesDesktop: btnTwoBg,
		hoverBackgroundStylesDesktop: btnTwoHoverBg,
		bgTransitionStyle: btnTwoBgTransition,
	} = generateBackgroundControlStyles({
		attributes,
		controlName: BUTTON_TWO_BACKGROUND,
	});

	// wrapper styles css in strings ⬇
	const wrapperStylesDesktop = `
		.eb-button-group-wrapper.${blockId}{
			display: flex;
			flex-direction: row;
			align-items: ${contentPosition};
			justify-content: ${contentPosition};
			position: relative;
			${wrapperMarginStylesDesktop}
		}
	`;
	const wrapperStylesTab = `
		.eb-button-group-wrapper.${blockId}{
			${wrapperMarginStylesTab}

		}
	`;
	const wrapperStylesMobile = `
		.eb-button-group-wrapper.${blockId}{
			${wrapperMarginStylesMobile}

		}
	`;

	// Buttons Common styles css in strings ⬇
	const buttonsCommonStyleDesktop = `
		.eb-button-group-wrapper.${blockId} .eb-button-parent {
			${buttonsPaddingStylesDesktop}
			${buttonsWidthType === "custom" ? buttonWidthStyleDesktop : "width: auto;"}
			${buttonGapDesktop}
			text-align: ${buttonTextAlign};
			cursor: pointer;
		}
		.eb-button-group-wrapper.${blockId} .eb-button-parent .eb-button-text {
			${buttonsTypoStylesDesktop}
		}

		.eb-button-group-wrapper.${blockId}.preset-4 {
			width: fit-content;
			margin: ${
				contentPosition === "center"
					? "0 auto;"
					: contentPosition === "flex-end"
					? "0 0 0 auto;"
					: "auto 0;"
			}
		}
	`;

	const buttonsCommonStyleTab = `
		.eb-button-group-wrapper.${blockId} .eb-button-parent {
			${buttonsPaddingStylesTab}
			${buttonsWidthType === "custom" ? buttonWidthStyleTab : "width: auto;"}
			${buttonGapTab}
		}
		.eb-button-group-wrapper.${blockId} .eb-button-parent .eb-button-text {
			${buttonsTypoStylesTab}
		}
	`;

	const buttonsCommonStyleMobile = `
		.eb-button-group-wrapper.${blockId} .eb-button-parent {
			${buttonsPaddingStylesMobile}
			${buttonsWidthType === "custom" ? buttonWidthStyleMobile : "width: auto;"}
			${buttonGapMobile}
		}
		.eb-button-group-wrapper.${blockId} .eb-button-parent .eb-button-text {
			${buttonsTypoStylesMobile}
		}
	`;

	// Buttons One styles css in strings ⬇
	const buttonOneStyleDesktop = `
		.eb-button-group-wrapper.${blockId} .eb-button-parent.eb-button-one {
			${buttonOneBDShadowDesktop}
			background-color: ${buttonOneColor};
			transition:${buttonOneBDShadowtransitionStyle};
			${btnOneBg}
			transition: ${btnOneBgTransition.replace(/[^0-9.]/g, "")}s;
		}
		.eb-button-group-wrapper.${blockId} .eb-button-parent.eb-button-one:hover,
		.eb-button-group-wrapper.${blockId} .eb-button-parent.eb-button-one:focus {
			${buttonOneBDShadowHoverDesktop}
			background-color: ${hoverButtonOneColor};
			${btnOneHoverBg}
		}
		.eb-button-group-wrapper.${blockId} .eb-button-parent.eb-button-one .eb-button-one-text {
			color: ${textOneColor};
		}
		.eb-button-group-wrapper.${blockId} .eb-button-parent.eb-button-one:hover .eb-button-one-text {
			color: ${hoverTextOneColor};
		}
	`;
	const buttonOneStyleTab = `
		.eb-button-group-wrapper.${blockId} .eb-button-parent.eb-button-one {
			${buttonOneBDShadowTab}
		}
		.eb-button-group-wrapper.${blockId} .eb-button-parent.eb-button-one:hover {
			${buttonOneBDShadowHoverTab}
		}
		.eb-button-group-wrapper.${blockId} .eb-button-parent.eb-button-one .eb-button-one-text {

		}
	`;
	const buttonOneStyleMobile = `
		.eb-button-group-wrapper.${blockId} .eb-button-parent.eb-button-one {
			${buttonOneBDShadowMobile}
		}
		.eb-button-group-wrapper.${blockId} .eb-button-parent.eb-button-one:hover {
			${buttonOneBDShadowHoverMobile}
		}
		.eb-button-group-wrapper.${blockId} .eb-button-parent.eb-button-one .eb-button-one-text {

		}
	`;

	// Buttons Two styles css in strings ⬇
	const buttonTwoStyleDesktop = `
		.eb-button-group-wrapper.${blockId} .eb-button-parent.eb-button-two {
			${buttonTwoBDShadowDesktop}
			${buttonGapDesktop}
			background-color: ${buttonTwoColor};
			transition:${buttonTwoBDShadowtransitionStyle};
			${btnTwoBg}
			transition: ${btnOneBgTransition.replace(/[^0-9.]/g, "")}s;
		}
		.eb-button-group-wrapper.${blockId} .eb-button-parent.eb-button-two:hover,
		.eb-button-group-wrapper.${blockId} .eb-button-parent.eb-button-two:focus {
			${buttonTwoBDShadowHoverDesktop}
			background-color: ${hoverButtonTwoColor};
			${btnTwoHoverBg}
		}
		.eb-button-group-wrapper.${blockId} .eb-button-parent.eb-button-two .eb-button-two-text {
			color: ${textTwoColor};
		}
		.eb-button-group-wrapper.${blockId} .eb-button-parent.eb-button-two:hover .eb-button-two-text {
			color: ${hoverTextTwoColor};
		}
	`;
	const buttonTwoStyleTab = `
		.eb-button-group-wrapper.${blockId} .eb-button-parent.eb-button-two {
			${buttonTwoBDShadowTab}
			${buttonGapTab}
		}
		.eb-button-group-wrapper.${blockId} .eb-button-parent.eb-button-two:hover {
			${buttonTwoBDShadowHoverTab}
		}
		.eb-button-group-wrapper.${blockId} .eb-button-parent.eb-button-two .eb-button-two-text {

		}
	`;
	const buttonTwoStyleMobile = `
		.eb-button-group-wrapper.${blockId} .eb-button-parent.eb-button-two {
			${buttonTwoBDShadowMobile}
			${buttonGapMobile}
		}
		.eb-button-group-wrapper.${blockId} .eb-button-parent.eb-button-two:hover {
			${buttonTwoBDShadowHoverMobile}
		}
		.eb-button-group-wrapper.${blockId} .eb-button-parent.eb-button-two .eb-button-two-text {

		}
	`;

	// Connector styles css in strings ⬇
	const connectorStylesDesktop = `
		.eb-button-group-wrapper.${blockId} .eb-button-group__midldeInner span {
			${
				connectorType === "text"
					? connectorTypoStylesDesktop
					: buttonConnectorIconSizeDesktop
			}
			${buttonConnectorHeightDesktop}
			${buttonConnectorWidthDesktop}
			${buttonConnectorLineHeightDesktop}
			${
				connectorType === "icon"
					? 'font-family: "Font Awesome 5 Brands" !important'
					: " "
			};
			background: ${innerButtonColor};
			color: ${innerButtonTextColor};
		}
	`;

	const connectorStylesTab = `
		.eb-button-group-wrapper.${blockId} .eb-button-group__midldeInner span {
			${
				connectorType === "text"
					? connectorTypoStylesTab
					: buttonConnectorIconSizeTab
			}
			${buttonConnectorHeightTab}
			${buttonConnectorWidthTab}
			${buttonConnectorLineHeightTab}
		}
	`;

	const connectorStylesMobile = `
		.eb-button-group-wrapper.${blockId} .eb-button-group__midldeInner span {
			${
				connectorType === "text"
					? connectorTypoStylesMobile
					: buttonConnectorIconSizeMobile
			}
			${buttonConnectorHeightMobile}
			${buttonConnectorWidthMobile}
			${buttonConnectorLineHeightMobile}
		}
	`;

	// all css styles for large screen width (desktop/laptop) in strings ⬇
	const desktopAllStyles = softMinifyCssStrings(`
			${wrapperStylesDesktop}
			${buttonsCommonStyleDesktop}
			${buttonOneStyleDesktop}
			${buttonTwoStyleDesktop}
			${connectorStylesDesktop}
		`);

	// all css styles for Tab in strings ⬇
	const tabAllStyles = softMinifyCssStrings(`
			${wrapperStylesTab}
			${buttonsCommonStyleTab}
			${buttonOneStyleTab}
			${buttonTwoStyleTab}
			${connectorStylesTab}
		`);

	// all css styles for Mobile in strings ⬇
	const mobileAllStyles = softMinifyCssStrings(`
			${wrapperStylesMobile}
			${buttonsCommonStyleMobile}
			${buttonOneStyleMobile}
			${buttonTwoStyleMobile}
			${connectorStylesMobile}
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
					<div
						className={`eb-button-group-wrapper ${blockId} ${preset}`}
						data-id={blockId}
					>
						{/* Button One */}
						<a
							className={"eb-button-parent eb-button-one"}
							// style={buttonStyleOne}
							onMouseEnter={() => setAttributes({ isHoverOne: true })}
							onMouseLeave={() => setAttributes({ isHoverOne: false })}
						>
							<DynamicInputValueHandler
								// style={textStylesOne}
								className={"eb-button-text eb-button-one-text"}
								placeholder="Add Text.."
								value={buttonTextOne}
								onChange={(newText) =>
									setAttributes({ buttonTextOne: newText })
								}
                                allowedFormats={[
                                    "core/bold",
                                    "core/italic",
                                    "core/link",
                                    "core/strikethrough",
                                    "core/underline",
                                    "core/text-color",
                                ]}
							/>
						</a>

						{/* Connector */}

						{showConnector && (
							<div
								className="eb-button-group__midldeInner"
								// style={buttonMiddleInnerStyles}
							>
								{connectorType === "icon" && (
									<span>
										<i
											className={`${
												innerButtonIcon
													? innerButtonIcon
													: "fas fa-arrows-alt-h"
											}`}
										></i>
									</span>
								)}

								{connectorType === "text" && <span>{innerButtonText}</span>}
							</div>
						)}

						{/* Button Two */}
						<a
							className={"eb-button-parent eb-button-two"}
							// style={buttonStyleTwo}
							onMouseEnter={() => setAttributes({ isHoverTwo: true })}
							onMouseLeave={() => setAttributes({ isHoverTwo: false })}
						>
							<DynamicInputValueHandler
								// style={textStylesTwo}
								className={"eb-button-text eb-button-two-text"}
								placeholder="Add Text.."
								value={buttonTextTwo}
								onChange={(newText) =>
									setAttributes({ buttonTextTwo: newText })
								}
                                allowedFormats={[
                                    "core/bold",
                                    "core/italic",
                                    "core/link",
                                    "core/strikethrough",
                                    "core/underline",
                                    "core/text-color",
                                ]}
							/>
						</a>
					</div>
				</div>
			</div>
		</>
	);
}
