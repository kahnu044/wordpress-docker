/**
 * WordPress Dependencies
 */
import { __ } from "@wordpress/i18n";
import { useEffect, useRef } from "@wordpress/element";
import { useBlockProps, MediaUpload } from "@wordpress/block-editor";
import { Button } from "@wordpress/components";
import { select, dispatch } from "@wordpress/data";

/**
 * External depencencies
 */

/**
 * Internal Import
 */
import ReactCompareImage from "react-compare-image";
import classnames from "classnames";

import Inspector from "./inspector";

const {
	softMinifyCssStrings,
	// mimmikCssForPreviewBtnClick,
	duplicateBlockIdFix,
	generateDimensionsControlStyles,
	generateTypographyStyles,
	generateResponsiveRangeStyles,
} = window.EBControls;

import {
	IMAGE_WIDTH,
	WRAPPER_MARGIN,
	WRAPPER_PADDING,
	LABEL_PADDING,
} from "./constants";
import { typoPrefix_label } from "./constants/typographyConstants";

const edit = (props) => {
	const { attributes, setAttributes, className, clientId, isSelected } = props;
	const {
		blockId,
		blockMeta,
		// responsive control attribute ⬇
		resOption,
		leftImageURL,
		rightImageURL,
		hover,
		verticalMode,
		showLabels,
		beforeLabel,
		afterLabel,
		fullWidth,
		position,
		lineWidth,
		lineColor,
		contentPosition,
		horizontalLabelPosition,
		verticalLabelPosition,
		noHandle,
		labelColor,
		labelBackgroundColor,
		classHook,
	} = attributes;

	const hiddenImg = useRef(null);

	const {
		rangeStylesDesktop: imageWidthDesktop,
		rangeStylesTab: imageWidthTab,
		rangeStylesMobile: imageWidthMobile,
	} = generateResponsiveRangeStyles({
		controlName: IMAGE_WIDTH,
		property: "max-width",
		attributes,
		customUnit: "px",
	});

	// wrapper margin
	const {
		dimensionStylesDesktop: wrapperMarginDesktop,
		dimensionStylesTab: wrapperMarginTab,
		dimensionStylesMobile: wrapperMarginMobile,
	} = generateDimensionsControlStyles({
		controlName: WRAPPER_MARGIN,
		styleFor: "margin",
		disableLeftRight: true,
		attributes,
	});

	// wrapper padding
	const {
		dimensionStylesDesktop: wrapperPaddingDesktop,
		dimensionStylesTab: wrapperPaddingTab,
		dimensionStylesMobile: wrapperPaddingMobile,
	} = generateDimensionsControlStyles({
		controlName: WRAPPER_PADDING,
		styleFor: "padding",
		attributes,
	});

	// label typography
	const {
		typoStylesDesktop: labelTypoStylesDesktop,
		typoStylesTab: labelTypoStylesTab,
		typoStylesMobile: labelTypoStylesMobile,
	} = generateTypographyStyles({
		attributes,
		prefixConstant: typoPrefix_label,
	});

	// label padding
	let {
		dimensionStylesDesktop: labelPaddingDesktop,
		dimensionStylesTab: labelPaddingTab,
		dimensionStylesMobile: labelPaddingMobile,
	} = generateDimensionsControlStyles({
		controlName: LABEL_PADDING,
		styleFor: "padding",
		attributes,
	});

	labelPaddingDesktop = labelPaddingDesktop.split(";").join(" !important;");
	labelPaddingTab = labelPaddingTab.split(";").join(" !important;");
	labelPaddingMobile = labelPaddingMobile.split(";").join(" !important;");

	let labelPostionClass = verticalMode
		? ` eb-label-vertical-${verticalLabelPosition}`
		: ` eb-label-horizontal-${horizontalLabelPosition}`;

	const desktopStyles = `
		.eb-image-comparison-align-center {
			margin-right: auto !important;
			margin-left: auto !important;
		}
		.eb-image-comparison-align-right {
			margin-left: auto !important;
		}
		.eb-image-comparison-wrapper.${blockId} {
			${wrapperMarginDesktop}
			${wrapperPaddingDesktop}
			${!fullWidth ? imageWidthDesktop : ""}
		}

		${showLabels
			? `
			.eb-image-comparison-wrapper.${blockId} div[data-testid="container"] >div:nth-child(4) div,
			.eb-image-comparison-wrapper.${blockId} div[data-testid="container"] >div:nth-child(5) div {
				${labelPaddingDesktop}
				${labelTypoStylesDesktop}
				${labelColor ? `color: ${labelColor} !important;` : ""}
				${labelBackgroundColor
				? `background-color: ${labelBackgroundColor} !important;`
				: ""
			}
			}

			.eb-image-comparison-wrapper.${blockId}.eb-label-horizontal-top div[data-testid="container"] >div:nth-child(4) div,
			.eb-image-comparison-wrapper.${blockId}.eb-label-horizontal-top div[data-testid="container"] >div:nth-child(5) div {
				top: 5% !important;
				transform: none !important;
			}

			.eb-image-comparison-wrapper.${blockId}.eb-label-horizontal-bottom div[data-testid="container"] >div:nth-child(4) div,
			.eb-image-comparison-wrapper.${blockId}.eb-label-horizontal-bottom div[data-testid="container"] >div:nth-child(5) div {
				top: unset !important;
				bottom: 5% !important;
				transform: none !important;
			}

			.eb-image-comparison-wrapper.${blockId}.eb-label-vertical-left div[data-testid="container"] >div:nth-child(4) div,
			.eb-image-comparison-wrapper.${blockId}.eb-label-vertical-left div[data-testid="container"] >div:nth-child(5) div {
				left: 5% !important;
				transform: none !important;
			}

			.eb-image-comparison-wrapper.${blockId}.eb-label-vertical-right div[data-testid="container"] >div:nth-child(4) div,
			.eb-image-comparison-wrapper.${blockId}.eb-label-vertical-right div[data-testid="container"] >div:nth-child(5) div {
				left: unset !important;
				right: 5% !important;
				transform: none !important;
			}
			`
			: ""
		}
	`;

	const tabStyles = `
		.eb-image-comparison-wrapper.${blockId} {
			${wrapperMarginTab}
			${wrapperPaddingTab}
			${!fullWidth ? imageWidthTab : ""}
		}

		${showLabels
			? `
			.eb-image-comparison-wrapper.${blockId} div[data-testid="container"] >div:nth-child(4) div,
			.eb-image-comparison-wrapper.${blockId} div[data-testid="container"] >div:nth-child(5) div {
				${labelTypoStylesTab}
				${labelPaddingTab}
			}
			`
			: ""
		}
	`;

	const mobileStyles = `
		.eb-image-comparison-wrapper.${blockId} {
			${wrapperMarginMobile}
			${wrapperPaddingMobile}
			${!fullWidth ? imageWidthMobile : ""}
		}

		${showLabels
			? `
			.eb-image-comparison-wrapper.${blockId} div[data-testid="container"] >div:nth-child(4) div,
			.eb-image-comparison-wrapper.${blockId} div[data-testid="container"] >div:nth-child(5) div {
				${labelTypoStylesMobile}
				${labelPaddingMobile}
			}
			`
			: ""
		}
	`;

	// this useEffect is for creating an unique id for each block's unique className by a random unique number
	useEffect(() => {
		const BLOCK_PREFIX = "eb-image-comparison";
		duplicateBlockIdFix({
			BLOCK_PREFIX,
			blockId,
			setAttributes,
			select,
			clientId,
		});
	}, []);

	// // this useEffect is for mimmiking css when responsive options clicked from wordpress's 'preview' button
	// useEffect(() => {
	// 	mimmikCssForPreviewBtnClick({
	// 		domObj: document,
	// 		select,
	// 	});
	// }, []);

	const blockProps = useBlockProps({
		className: classnames(className, `eb-guten-block-main-parent-wrapper`),
	});

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

	const hasBothImages = leftImageURL && rightImageURL;
	const alignmentClass =
		contentPosition === "center"
			? " eb-image-comparison-align-center"
			: contentPosition === "right"
				? " eb-image-comparison-align-right"
				: "";
	const onImageSwap = () => {
		let { leftImageURL, rightImageURL, swap } = attributes;
		swap = !swap;
		[leftImageURL, rightImageURL] = [rightImageURL, leftImageURL];

		setAttributes({ swap, leftImageURL, rightImageURL });
	};

	if (hiddenImg.current) {
		hiddenImg.current.addEventListener("click", function () {
			dispatch("core/block-editor").selectBlock(clientId);
			dispatch("core/edit-post").openGeneralSidebar("edit-post/block");
		});
	}

	return (
		<>
			{isSelected && (
				<Inspector
					key="inspector"
					attributes={attributes}
					setAttributes={setAttributes}
					onImageSwap={onImageSwap}
				/>
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
					<div
						className={`eb-image-comparison-wrapper ${blockId}${alignmentClass}${labelPostionClass}`}
					>
						{hasBothImages ? (
							<>
								<div className="eb-image-comparison-hide" ref={hiddenImg}>
									<ReactCompareImage
										leftImage={leftImageURL}
										rightImage={rightImageURL}
										{...(verticalMode ? { vertical: "vertical" } : {})}
										{...(hover ? { hover: "hover" } : {})}
										{...(showLabels ? { leftImageLabel: beforeLabel } : {})}
										{...(showLabels ? { rightImageLabel: afterLabel } : {})}
										{...(noHandle ? { handle: <React.Fragment /> } : {})}
										sliderPositionPercentage={position / 100}
										sliderLineWidth={lineWidth ? lineWidth : 0}
										sliderLineColor={lineColor}
									/>
								</div>
							</>
						) : (
							<div className="eb-image-comparison-placeholder">
								<MediaUpload
									onSelect={(media) => setAttributes({ leftImageURL: media.url })}
									type="image"
									value={leftImageURL}
									render={({ open }) =>
										!leftImageURL ? (
											<Button
												className="eb-image-comparison-upload components-button"
												label={__("Upload Left Image", "essential-blocks")}
												icon="format-image"
												onClick={open}
											/>
										) : (
											<img
												className="eb-image-comparison-image"
												src={leftImageURL}
											/>
										)
									}
								/>
								<MediaUpload
									onSelect={(media) =>
										setAttributes({ rightImageURL: media.url })
									}
									type="image"
									value={rightImageURL}
									render={({ open }) =>
										!rightImageURL ? (
											<Button
												className="eb-image-comparison-upload components-button"
												label={__("Upload Right Image", "essential-blocks")}
												icon="format-image"
												onClick={open}
											/>
										) : (
											<img
												className="eb-image-comparison-image"
												src={rightImageURL}
											/>
										)
									}
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
