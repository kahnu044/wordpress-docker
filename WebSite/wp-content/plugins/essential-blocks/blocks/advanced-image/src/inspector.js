/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { InspectorControls, PanelColorSettings } from "@wordpress/block-editor";
import {
	PanelBody,
	SelectControl,
	ToggleControl,
	Button,
	ButtonGroup,
	BaseControl,
	TabPanel,
	TextControl,
	PanelRow,
} from "@wordpress/components";
import { useEffect } from "@wordpress/element";
import { select } from "@wordpress/data";

/**
 * Internal depencencies
 */

import objAttributes from "./attributes";

import {
	WRAPPER_BG,
	WRAPPER_MARGIN,
	WRAPPER_PADDING,
	WRAPPER_BORDER_SHADOW,
	IMAGE_WIDTH,
	IMAGE_HEIGHT,
	SIZE_UNIT_TYPES,
	IMAGE_BORDER_SHADOW,
	CAPTION_MARGIN,
	CAPTION_PADDING,
	CAPTION_TYPOGRAPHY,
	CAPTION_WIDTH,
	STYLES,
	TEXT_ALIGN,
	HORIZONTAL_ALIGN,
	VERTICAL_ALIGN,
	UNIT_TYPES,
	CAPTION_STYLES,
	VERTICAL_ALIGN_CAP_2,
	HOVER_EFFECT,
} from "./constants";

const {
	ResponsiveDimensionsControl,
	TypographyDropdown,
	BorderShadowControl,
	ResponsiveRangeController,
	BackgroundControl,
	ColorControl,
	AdvancedControls,
} = window.EBControls;

function Inspector(props) {
	const { attributes, setAttributes } = props;
	const {
		resOption,
		displayCaption,
		captionColor,
		captionBGColor,
		horizontalAlign,
		verticalAlign,
		verticalAlignCap2,
		textAlign,
		stylePreset,
		enableLink,
		openInNewTab,
		imageLink,
		captionStyle,
		hoverEffect,
		complexStyle,
		autoFit,
	} = attributes;

	const changeStyle = (selected) => {
		setAttributes({ stylePreset: selected });
		const complexLayouts = ["octagon", "rhombus", "triangle"];
		if (complexLayouts.includes(selected)) {
			setAttributes({
				complexStyle: true,
			});
		} else {
			setAttributes({
				complexStyle: false,
			});
		}

		//
		switch (selected) {
			case "rounded":
				setAttributes({
					imgBorderShadowRds_Bottom: "15",
					imgBorderShadowRds_Top: "15",
					imgBorderShadowRds_Left: "15",
					imgBorderShadowRds_Right: "15",
					imgBorderShadowRds_Unit: "px",
				});
				break;
			case "square":
				setAttributes({
					imgBorderShadowRds_Bottom: "0",
					imgBorderShadowRds_Top: "0",
					imgBorderShadowRds_Left: "0",
					imgBorderShadowRds_Right: "0",
					imgBorderShadowRds_Unit: "px",
				});
				break;
			case "circle":
				setAttributes({
					imgBorderShadowRds_Bottom: "50",
					imgBorderShadowRds_Top: "50",
					imgBorderShadowRds_Left: "50",
					imgBorderShadowRds_Right: "50",
					imgBorderShadowRds_Unit: "%",
				});
				break;
			default:
				return false
		}
	};

	const changCaptionStyle = (selected) => {
		switch (selected) {
			case "caption-style-1":
				setAttributes({
					captionStyle: selected,
					captionColor: "#ffffff",
				});
				break;
			case "caption-style-2":
				setAttributes({
					captionStyle: selected,
					captionColor: "#000000",
				});
				break;
			default:
				setAttributes({
					captionStyle: selected,
				});
		}
	};

	const resRequiredProps = {
		setAttributes,
		resOption,
		attributes,
		objAttributes,
	};

	return (
		<InspectorControls key="controls">
			<div className="eb-panel-control">
				<TabPanel
					className="eb-parent-tab-panel"
					activeClass="active-tab"
					// onSelect={onSelect}
					tabs={[
						{
							name: "general",
							title: "General",
							className: "eb-tab general",
						},
						{
							name: "styles",
							title: "Style",
							className: "eb-tab styles",
						},
						{
							name: "advance",
							title: "Advanced",
							className: "eb-tab advance",
						},
					]}
				>
					{(tab) => (
						<div className={"eb-tab-controls" + tab.name}>
							{tab.name === "general" && (
								<>
									<PanelBody
										title={__("General", "essential-blocks")}
										initialOpen={true}
									>
										<SelectControl
											label={__("Styles", "essential-blocks")}
											description={__("Border won't work", "essential-blocks")}
											value={stylePreset}
											options={STYLES}
											onChange={(stylePreset) => changeStyle(stylePreset)}
										/>
										{stylePreset === "circle" && (
											<PanelRow>
												<em>
													Please use equal "Height" &#38; "Width" for perfect
													Circle shape.
												</em>
											</PanelRow>
										)}

										<ToggleControl
											label={__("Display Caption", "essential-blocks")}
											checked={displayCaption}
											onChange={() =>
												setAttributes({ displayCaption: !displayCaption })
											}
										/>

										{displayCaption && (
											<SelectControl
												label={__("Caption Styles", "essential-blocks")}
												value={captionStyle}
												options={CAPTION_STYLES}
												onChange={(captionStyle) =>
													changCaptionStyle(captionStyle)
												}
											/>
										)}

										<ResponsiveRangeController
											baseLabel={__("Width", "essential-blocks")}
											controlName={IMAGE_WIDTH}
											resRequiredProps={resRequiredProps}
											min={1}
											max={1000}
											step={1}
											units={SIZE_UNIT_TYPES}
										/>

										<ResponsiveRangeController
											baseLabel={__("Height", "essential-blocks")}
											controlName={IMAGE_HEIGHT}
											resRequiredProps={resRequiredProps}
											min={0}
											max={1000}
											step={1}
											units={SIZE_UNIT_TYPES}
										/>

										<ToggleControl
											label={__("Auto Fit Image?", "essential-blocks")}
											checked={autoFit}
											onChange={(autoFit) => setAttributes({ autoFit })}
										/>

										<ToggleControl
											label={__("Enable Link?", "essential-blocks")}
											checked={enableLink}
											onChange={(enableLink) => setAttributes({ enableLink })}
										/>

										{enableLink && (
											<TextControl
												label={__("Link", "essential-blocks")}
												value={imageLink}
												onChange={(link) => setAttributes({ imageLink: link })}
											/>
										)}
										{enableLink && (
											<ToggleControl
												label={__("Open in New Tab", "essential-blocks")}
												checked={openInNewTab}
												onChange={(openInNewTab) =>
													setAttributes({ openInNewTab })
												}
											/>
										)}

										<SelectControl
											label={__("Hover Effect", "essential-blocks")}
											value={hoverEffect}
											options={HOVER_EFFECT}
											onChange={(hoverEffect) => setAttributes({ hoverEffect })}
										/>
									</PanelBody>
								</>
							)}

							{tab.name === "styles" && (
								<>
									<PanelBody title={__("Image Settings", "essential-blocks")}>
										{!complexStyle && (
											<>
												<BaseControl>
													<h3 className="eb-control-title">
														{__("Border", "essential-blocks")}
													</h3>
												</BaseControl>
												<BorderShadowControl
													controlName={IMAGE_BORDER_SHADOW}
													resRequiredProps={resRequiredProps}
												// noShadow
												// noBorder
												/>
											</>
										)}
										{complexStyle && (
											<PanelRow>
												<em>
													Border Style doesn't support for "{stylePreset} style".
												</em>
											</PanelRow>
										)}
									</PanelBody>

									{displayCaption && (
										<PanelBody title={__("Caption Styles", "essential-blocks")}>
											<PanelColorSettings
												title={__("Color Controls", "essential-blocks")}
												className={"eb-subpanel"}
												initialOpen={true}
												disableAlpha={false}
												colorSettings={[
													{
														value: captionColor,
														onChange: (newColor) =>
															setAttributes({ captionColor: newColor }),
														label: __("Text Color", "essential-blocks"),
													},
												]}
											/>

											{displayCaption && captionStyle != "caption-style-2" && (
												<ColorControl
													label={__("Background Color", "essential-blocks")}
													color={captionBGColor}
													onChange={(backgroundColor) =>
														setAttributes({ captionBGColor: backgroundColor })
													}
												/>
											)}

											<TypographyDropdown
												baseLabel={__("Typography", "essential-blocks")}
												typographyPrefixConstant={CAPTION_TYPOGRAPHY}
												resRequiredProps={resRequiredProps}
											/>

											<ResponsiveRangeController
												baseLabel={__("Width", "essential-blocks")}
												controlName={CAPTION_WIDTH}
												resRequiredProps={resRequiredProps}
												units={UNIT_TYPES}
												min={0}
												max={300}
												step={1}
											/>

											{displayCaption && (
												<>
													<BaseControl
														label={__("Text Align", "essential-blocks")}
													>
														<ButtonGroup>
															{TEXT_ALIGN.map((item) => (
																<Button
																	// isLarge
																	isPrimary={textAlign === item.value}
																	isSecondary={textAlign !== item.value}
																	onClick={() =>
																		setAttributes({ textAlign: item.value })
																	}
																>
																	{item.label}
																</Button>
															))}
														</ButtonGroup>
													</BaseControl>

													{captionStyle === "caption-style-1" && (
														<>
															<BaseControl
																label={__(
																	"Horizontal Align",
																	"essential-blocks"
																)}
															>
																<ButtonGroup>
																	{HORIZONTAL_ALIGN.map((item) => (
																		<Button
																			// isLarge
																			isPrimary={horizontalAlign === item.value}
																			isSecondary={
																				horizontalAlign !== item.value
																			}
																			onClick={() =>
																				setAttributes({
																					horizontalAlign: item.value,
																				})
																			}
																		>
																			{item.label}
																		</Button>
																	))}
																</ButtonGroup>
															</BaseControl>

															<BaseControl
																label={__("Vertical Align", "essential-blocks")}
															>
																<ButtonGroup>
																	{VERTICAL_ALIGN.map((item) => (
																		<Button
																			// isLarge
																			isPrimary={verticalAlign === item.value}
																			isSecondary={verticalAlign !== item.value}
																			onClick={() =>
																				setAttributes({
																					verticalAlign: item.value,
																				})
																			}
																		>
																			{item.label}
																		</Button>
																	))}
																</ButtonGroup>
															</BaseControl>
														</>
													)}

													{captionStyle === "caption-style-2" && (
														<BaseControl
															label={__("Vertical Align", "essential-blocks")}
														>
															<ButtonGroup>
																{VERTICAL_ALIGN_CAP_2.map((item) => (
																	<Button
																		// isLarge
																		isPrimary={verticalAlignCap2 === item.value}
																		isSecondary={
																			verticalAlignCap2 !== item.value
																		}
																		onClick={() =>
																			setAttributes({
																				verticalAlignCap2: item.value,
																			})
																		}
																	>
																		{item.label}
																	</Button>
																))}
															</ButtonGroup>
														</BaseControl>
													)}

													<ResponsiveDimensionsControl
														resRequiredProps={resRequiredProps}
														controlName={CAPTION_MARGIN}
														baseLabel="Margin"
													/>

													<ResponsiveDimensionsControl
														resRequiredProps={resRequiredProps}
														controlName={CAPTION_PADDING}
														baseLabel="Padding"
													/>
												</>
											)}
										</PanelBody>
									)}
								</>
							)}

							{tab.name === "advance" && (
								<>
									<PanelBody>
										<ResponsiveDimensionsControl
											resRequiredProps={resRequiredProps}
											controlName={WRAPPER_MARGIN}
											baseLabel="Margin"
										/>
										<ResponsiveDimensionsControl
											resRequiredProps={resRequiredProps}
											controlName={WRAPPER_PADDING}
											baseLabel="Padding"
										/>
									</PanelBody>
									<PanelBody
										title={__("Background", "essential-blocks")}
										initialOpen={false}
									>
										<BackgroundControl
											controlName={WRAPPER_BG}
											resRequiredProps={resRequiredProps}
											noOverlay
										/>
									</PanelBody>
									<PanelBody title={__("Border & Shadow")} initialOpen={false}>
										<BorderShadowControl
											controlName={WRAPPER_BORDER_SHADOW}
											resRequiredProps={resRequiredProps}
										// noShadow
										// noBorder
										/>
									</PanelBody>

									<AdvancedControls attributes={attributes} setAttributes={setAttributes} />
								</>
							)}
						</div>
					)}
				</TabPanel>
			</div>
		</InspectorControls>
	);
}

export default Inspector;
