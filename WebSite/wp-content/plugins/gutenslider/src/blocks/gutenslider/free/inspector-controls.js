const { __ } = wp.i18n;
const { InspectorControls } = wp.blockEditor;
const {
	Button,
	PanelBody,
	RangeControl,
	ToggleControl,
	SelectControl,
	ButtonGroup,
	ColorIndicator,
	BaseControl,
	Icon,
	Disabled,
} = wp.components;
const { ColorPalette } = wp.blockEditor;

import Select from "react-select";
import * as FeatherIcon from "react-feather";
import { filter, findIndex } from "lodash";

import UnitButton from "../../../components/unit-button";
import { ResponsiveTabs } from "../../../components/reusable/responsive-tabs/ResponsiveTabs";
import SliderHeightControls from "../slider-height-controls";
import icons from "../../icons";

const DIVIDER_OPTIONS = eedeeGutenslider.gutensliderDividers;

export default (props) => {
	const { attributes, setAttributes, deviceType } = props;
	const {
		contentMode,
		animation,
		dots,
		dotsMd,
		dotsSm,
		dotSize,
		dotSizeMd,
		dotSizeSm,
		dotColor,
		dotPosition,
		dotYOffset,
		dotYOffsetMd,
		dotYOffsetSm,
		arrows,
		arrowsMd,
		arrowsSm,
		arrowSize,
		arrowSizeMd,
		arrowSizeSm,
		arrowColor,
		arrowBgColor,
		arrowHoverColor,
		arrowBgHoverColor,
		arrowStyle,
		arrowPosition,
		arrowXOffset,
		arrowXOffsetMd,
		arrowXOffsetSm,
		arrowYOffset,
		arrowYOffsetMd,
		arrowYOffsetSm,
		arrowXSpacing,
		arrowMixBlendMode,
		slidesToShow,
		slidesToShowMd,
		slidesToShowSm,
		slidesToScroll,
		slidesToScrollMd,
		slidesToScrollSm,
		sliderHeight,
		sliderHeightSm,
		sliderHeightMd,
		paddingX,
		paddingXMd,
		paddingXSm,
		paddingY,
		paddingYMd,
		paddingYSm,
		marginX,
		marginXMd,
		marginXSm,
		marginY,
		isFullScreen,
		pauseOnHover,
		pauseOnDotsHover,
		parallaxDirection,
		parallaxAmount,
		autoplay,
		contentOpacity,
		loop,
		adaptiveHeight,
		adaptiveHeightMd,
		adaptiveHeightSm,
		zoom,
		centeredSlides,
		hasLg,
		dotType,
		dividers,
		lgThumbnails,
		keyboardNavigation,
		wrapAutoHeight,
	} = attributes;

	const innerSlides = filter(props.innerBlocks, {
		name: "eedee/block-gutenslide",
	});

	const dividerStyles = {
		container: (provided) => {
			return { ...provided, marginBottom: 14, marginTop: 4 };
		},
		valueContainer: (provided) => {
			return { ...provided, height: 58 };
		},
		option: (provided, state) => {
			const height = state.data.value === "none" ? null : "50px";

			return { ...provided, height, width: "100%" };
		},
		singleValue: (provided, state) => {
			const height = state.data.value === "none" ? null : "50px";

			return { ...provided, height, width: "100%" };
		},
	};

	const dividerControls = (
		<>
			<BaseControl.VisualLabel>
				{__("Top Divider", "gutenslider")}
			</BaseControl.VisualLabel>
			<Select
				className="eedee-divider-select"
				defaultValue={DIVIDER_OPTIONS[0]}
				label={__("Select a top divider", "gutenslider")}
				options={Object.values(DIVIDER_OPTIONS)}
				value={DIVIDER_OPTIONS[dividers.top.value]}
				styles={dividerStyles}
				formatOptionLabel={(data) => {
					if (data.svg) {
						if (dividers.top.inverted && data["svg-inverted"]) {
							return (
								<span
									className="gutenslider-divider-top"
									dangerouslySetInnerHTML={{ __html: data["svg-inverted"] }}
								/>
							);
						}
						return (
							<span
								className="gutenslider-divider-top"
								dangerouslySetInnerHTML={{ __html: data.svg }}
							/>
						);
					}
					return <span>{data.label}</span>;
				}}
				onChange={({ value }) =>
					setAttributes({
						dividers: { ...dividers, top: { ...dividers.top, value } },
					})
				}
				isSearchable={false}
			/>
			<ColorPalette
				label={__("Background Color", "gutenslider")}
				value={dividers.top.color}
				onChange={(value) =>
					setAttributes({
						dividers: { ...dividers, top: { ...dividers.top, color: value } },
					})
				}
				disableCustomColors={false}
				disableAlpha={false}
				clearable={false}
			/>
			<ToggleControl
				label={__("Flip Vertical", "gutenslider")}
				checked={dividers.top.flipY}
				onChange={(flipY) =>
					setAttributes({
						dividers: { ...dividers, top: { ...dividers.top, flipY } },
					})
				}
			/>
			<BaseControl.VisualLabel>
				{__("Bottom Divider", "gutenslider")}
			</BaseControl.VisualLabel>
			<Select
				className="eedee-divider-select"
				defaultValue={DIVIDER_OPTIONS[0]}
				label={__("Select a bottom divider", "gutenslider")}
				options={Object.values(DIVIDER_OPTIONS)}
				value={DIVIDER_OPTIONS[dividers.bottom.value]}
				styles={dividerStyles}
				formatOptionLabel={(data) => {
					if (data.svg) {
						if (dividers.bottom.inverted && data["svg-inverted"]) {
							return (
								<span
									className="gutenslider-divider-bottom"
									dangerouslySetInnerHTML={{ __html: data["svg-inverted"] }}
								/>
							);
						}
						return (
							<span
								className="gutenslider-divider-bottom"
								dangerouslySetInnerHTML={{ __html: data.svg }}
							/>
						);
					}
					return <span>{data.label}</span>;
				}}
				onChange={({ value }) =>
					setAttributes({
						dividers: { ...dividers, bottom: { ...dividers.bottom, value } },
					})
				}
				isSearchable={false}
			/>
			<ColorPalette
				label={__("Background Color", "gutenslider")}
				value={dividers.bottom.color}
				onChange={(value) =>
					setAttributes({
						dividers: {
							...dividers,
							bottom: { ...dividers.bottom, color: value },
						},
					})
				}
				disableCustomColors={false}
				disableAlpha={false}
				clearable={false}
			/>
			<ToggleControl
				label={__("Flip Vertical", "gutenslider")}
				checked={dividers.bottom.flipY}
				onChange={(flipY) =>
					setAttributes({
						dividers: { ...dividers, bottom: { ...dividers.bottom, flipY } },
					})
				}
			/>
		</>
	);

	const responsiveSliderHeightBreakpoints = [
		{
			name: "Desktop",
			componentProps: {
				sliderHeightResponsive: sliderHeight,
				adaptiveHeightResponsive: adaptiveHeight,
				slidesToShowResponsive: slidesToShow,
				isFullScreen: isFullScreen,
				label: (
					<span>
						{" "}
						{__("Minimum Slider Height", "gutenslider")}{" "}
						<small>({__("Desktop", "gutenslider")})</small>
					</span>
				),
				onChangeSliderHeight: (val) => setAttributes({ sliderHeight: val }),
				onChangeAdaptiveHeight: (val) => setAttributes({ adaptiveHeight: val }),
			},
		},
		{
			name: "Tablet",
			componentProps: {
				sliderHeightResponsive: sliderHeightMd,
				adaptiveHeightResponsive: adaptiveHeightMd,
				slidesToShowResponsive: slidesToShowMd,
				isFullScreen: isFullScreen,
				label: (
					<span>
						{" "}
						{__("Minimum Slider Height", "gutenslider")}{" "}
						<small>({__("Tablet", "gutenslider")})</small>
					</span>
				),
				onChangeSliderHeight: (val) => setAttributes({ sliderHeightMd: val }),
				onChangeAdaptiveHeight: (val) =>
					setAttributes({ adaptiveHeightMd: val }),
			},
		},
		{
			name: "Mobile",
			componentProps: {
				sliderHeightResponsive: sliderHeightSm,
				adaptiveHeightResponsive: adaptiveHeightSm,
				slidesToShowResponsive: slidesToShowSm,
				isFullScreen: isFullScreen,
				label: (
					<span>
						{" "}
						{__("Minimum Slider Height", "gutenslider")}{" "}
						<small>({__("Mobile", "gutenslider")})</small>
					</span>
				),
				onChangeSliderHeight: (val) => setAttributes({ sliderHeightSm: val }),
				onChangeAdaptiveHeight: (val) =>
					setAttributes({ adaptiveHeightSm: val }),
			},
		},
	];

	const arrowPanelTitle = (
		<span className="editor-panel-color-settings__panel-title block-editor-panel-color-settings__panel-title">
			{__("Arrows", "gutenslider")}
			<ColorIndicator
				aria-label="(border color: #000)"
				colorValue={arrowColor}
			/>
		</span>
	);

	const dotPanelTitle = (
		<span className="editor-panel-color-settings__panel-title block-editor-panel-color-settings__panel-title">
			{__("Progress", "gutenslider")}
			<ColorIndicator aria-label="(border color: #000)" colorValue={dotColor} />
		</span>
	);

	return (
		<InspectorControls>
			<PanelBody
				title={__("General", "gutenslider")}
				className="gutenslider-controls gutenslider-controls-general eedee-icon-panel"
				icon={<FeatherIcon.Settings color={"#000"} size={18} />}
			>
				<BaseControl
					help={__("Choose the transition between slides", "gutenslider")}
				>
					<BaseControl.VisualLabel>
						{__("Animation", "gutenslider")}
					</BaseControl.VisualLabel>
					<ButtonGroup
						aria-label={__("Fade Mode", "gutenslider")}
						className="gutenslider-toggle-fade-mode"
					>
						<Button
							isSecondary={animation !== "slide"}
							isPrimary={animation === "slide"}
							aria-pressed={animation === "slide"}
							onClick={() => {
								setAttributes({ animation: "slide" });
							}}
						>
							{__("slide", "gutenslider")}
						</Button>
						<Button
							isSecondary={animation !== "fade"}
							isPrimary={animation === "fade"}
							aria-pressed={animation === "fade"}
							onClick={() => {
								setAttributes({ animation: "fade" });
							}}
						>
							{__("fade", "gutenslider")}
						</Button>
						<Button
							isSecondary={animation !== "flip"}
							isPrimary={animation === "flip"}
							aria-pressed={animation === "flip"}
							onClick={() => {
								setAttributes({ animation: "flip" });
							}}
						>
							{__("flip", "gutenslider")}
						</Button>
					</ButtonGroup>
				</BaseControl>
				<BaseControl
					help={__(
						"Can each slide have its own content or are child blocks fixed on top of all slides?",
						"gutenslider"
					)}
				>
					<BaseControl.VisualLabel>
						{__("Slide Mode", "gutenslider")}
					</BaseControl.VisualLabel>
					<ButtonGroup
						aria-label={__("Slide Mode", "gutenslider")}
						className="gutenslider-toggle-content-mode"
					>
						<Button
							isSecondary={contentMode !== "fixed"}
							isPrimary={contentMode === "fixed"}
							aria-pressed={contentMode === "fixed"}
							onClick={() => {
								setAttributes({ contentMode: "fixed" });
							}}
						>
							{__("fixed", "gutenslider")}
						</Button>
						<Button
							isSecondary={contentMode === "fixed"}
							isPrimary={contentMode === "change"}
							aria-pressed={contentMode === "change"}
							onClick={() => {
								setAttributes({ contentMode: "change" });
							}}
						>
							{__("changing", "gutenslider")}
						</Button>
					</ButtonGroup>
				</BaseControl>
				<ResponsiveTabs
					breakpoints={responsiveSliderHeightBreakpoints}
					selected={deviceType}
				>
					<SliderHeightControls
						animation={animation}
						isVertical={false}
						onChangeAllAdaptiveHeight={(val) =>
							setAttributes({
								adaptiveHeight: val,
								adaptiveHeightMd: val,
								adaptiveHeightSm: val,
							})
						}
						onChangeAllSliderHeight={(val) =>
							setAttributes({
								sliderHeight: val,
								sliderHeightMd: val,
								sliderHeightSm: val,
							})
						}
						wrapAutoHeight={wrapAutoHeight}
						setAttributes={setAttributes}
					/>
				</ResponsiveTabs>
				{(animation === "slide" || animation === "coverflow") && (
					<RangeControl
						label={<span> {__("Slides to Show", "gutenslider")} </span>}
						value={slidesToShow}
						onChange={(val) =>
							setAttributes({
								slidesToShow: val,
								slidesToShowMd: val,
								slidesToShowSm: val,
								adaptiveHeight: val === 0 ? false : adaptiveHeight,
							})
						}
						help={
							slidesToShow === 0
								? __(
										'Auto Slides per view will set the slider to the height you set in the "Min Slider Height" setting, and disable automatic height recognition. So check yourself that the content does not overflow the slides.',
										"gutenslider"
								  )
								: null
						}
						min={0}
						max={1}
						step={1}
						marks={[
							{
								value: 0,
								label: __("auto", "gutenslider"),
							},
							{
								value: 1,
								label: "1",
							},
						]}
					/>
				)}
				<ToggleControl
					label={__("Autoplay", "gutenslider")}
					checked={autoplay}
					onChange={(val) => setAttributes({ autoplay: val })}
				/>
				<ToggleControl
					checked={arrows}
					label={__("Show Arrows", "gutenslider")}
					onChange={(val) =>
						setAttributes({ arrows: val, arrowsMd: val, arrowsSm: val })
					}
				/>
				<ToggleControl
					checked={dots}
					label={__("Show Dots", "gutenslider")}
					onChange={(val) =>
						setAttributes({ dots: val, dotsMd: val, dotsSm: val })
					}
				/>
				<ToggleControl
					checked={keyboardNavigation}
					label={__("Keyboard Navigation", "gutenslider")}
					onChange={(val) => setAttributes({ keyboardNavigation: val })}
				/>
				<ToggleControl
					label={__("Loop", "gutenslider")}
					checked={loop}
					help={
						loop
							? __(
									"Loop preview is disabled in the editor. See the frontend for the looped slider."
							  )
							: null
					}
					onChange={(val) => setAttributes({ loop: val })}
				/>
				{(animation === "coverflow" || animation === "slide") &&
					slidesToShow !== 1 && (
						<ToggleControl
							label={__("Centered Slides", "gutenslider")}
							checked={centeredSlides}
							onChange={(val) => setAttributes({ centeredSlides: val })}
						/>
					)}
				{false && (
					<ToggleControl
						label={__("Zoom", "gutenslider")}
						checked={zoom}
						onChange={(val) => setAttributes({ zoom: val })}
					/>
				)}
				<ToggleControl
					label={__("Fullscreen Background Slider", "gutenslider")}
					checked={isFullScreen}
					help={
						isFullScreen
							? __(
									"Full Screen Background Slider preview is not available in the editor, check the live site to see it in action.",
									"gutenslider"
							  )
							: null
					}
					onChange={(val) => setAttributes({ isFullScreen: val })}
				/>
			</PanelBody>
			{autoplay && (
				<PanelBody
					title={__("Autoplay", "gutenslider")}
					className="gutenslider-controls gutenslider-controls-autoplay eedee-icon-panel"
					initialOpen={false}
					icon={
						<svg
							className="dashicon"
							width="20"
							height="20"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							role="img"
							aria-hidden="true"
							focusable="false"
						>
							<path fill="none" d="M0 0h24v24H0V0z"></path>
							<path
								fill="#000"
								d="M13.05 9.79L10 7.5v9l3.05-2.29L16 12l-2.95-2.21zm0 0L10 7.5v9l3.05-2.29L16 12l-2.95-2.21zm0 0L10 7.5v9l3.05-2.29L16 12l-2.95-2.21zM11 4.07V2.05c-2.01.2-3.84 1-5.32 2.21L7.1 5.69c1.11-.86 2.44-1.44 3.9-1.62zM5.69 7.1L4.26 5.68C3.05 7.16 2.25 8.99 2.05 11h2.02c.18-1.46.76-2.79 1.62-3.9zM4.07 13H2.05c.2 2.01 1 3.84 2.21 5.32l1.43-1.43c-.86-1.1-1.44-2.43-1.62-3.89zm1.61 6.74C7.16 20.95 9 21.75 11 21.95v-2.02c-1.46-.18-2.79-.76-3.9-1.62l-1.42 1.43zM22 12c0 5.16-3.92 9.42-8.95 9.95v-2.02C16.97 19.41 20 16.05 20 12s-3.03-7.41-6.95-7.93V2.05C18.08 2.58 22 6.84 22 12z"
							></path>
						</svg>
					}
				>
					<ToggleControl
						label={__("Pause on Hover", "gutenslider")}
						checked={pauseOnHover}
						onChange={(val) => setAttributes({ pauseOnHover: val })}
					/>
				</PanelBody>
			)}
			{(arrows || arrowsMd || arrowsSm) && (
				<PanelBody
					title={arrowPanelTitle}
					className="gutenslider-controls gutenslider-controls-arrows eedee-icon-panel"
					initialOpen={false}
					icon={<FeatherIcon.ArrowRightCircle color={"#000"} size={18} />}
				>
					<Select
						className="eedee-divider-select"
						defaultValue={eedeeGutenslider.arrows[0]}
						label={__("Select Arrow Style", "gutenslider")}
						options={[
							eedeeGutenslider.arrows[0],
							eedeeGutenslider.arrows[1],
							eedeeGutenslider.arrows[9],
						]}
						value={
							eedeeGutenslider.arrows[
								findIndex(eedeeGutenslider.arrows, { value: arrowStyle })
							]
						}
						styles={dividerStyles}
						formatOptionLabel={(data) => {
							if (data.next && data.prev) {
								return (
									<div className="gutenslider-arrow-style-select">
										<span
											className="gutenslider-arrow-style-prev"
											dangerouslySetInnerHTML={{ __html: data["prev"] }}
										/>
										<span
											className="gutenslider-arrow-style-next"
											dangerouslySetInnerHTML={{ __html: data["next"] }}
										/>
									</div>
								);
							}
							return <span>{data.label}</span>;
						}}
						onChange={({ value }) => setAttributes({ arrowStyle: value })}
						isSearchable={false}
					/>
					<RangeControl
						min={15}
						max={200}
						step={1}
						value={arrowSize}
						label={<span>{__("Arrow Size", "gutenslider")}</span>}
						onChange={(val) =>
							setAttributes({
								arrowSize: val,
								arrowSizeMd: val,
								arrowSizeSm: val,
							})
						}
					/>
					<BaseControl>
						<BaseControl.VisualLabel>
							{__("Arrow Color", "gutenslider")}
						</BaseControl.VisualLabel>
						<ColorPalette
							value={arrowColor}
							colors={[
								{ name: "black", color: "#000000" },
								{ name: "white", color: "#ffffff" },
								{ name: "blue", color: "#007cba" },
							]}
							onChange={(color) => {
								props.setAttributes({
									arrowColor: color,
									arrowHoverColor: `${color}bb`,
									arrowBgColor: "transparent",
									arrowBgHoverColor: "transparent",
								});
							}}
							disableCustomColors={true}
							clearable={false}
						/>
					</BaseControl>
				</PanelBody>
			)}
			{(dots || dotsMd || dotsSm) && (
				<PanelBody
					title={dotPanelTitle}
					className="gutenslider-controls gutenslider-controls-dots eedee-icon-panel"
					initialOpen={false}
					icon={<Icon icon={icons.progress} />}
				>
					<RangeControl
						value={dotSize}
						label={<span> {__("Progress Size", "gutenslider")}</span>}
						onChange={(val) =>
							setAttributes({ dotSize: val, dotSizeMd: val, dotSizeSm: val })
						}
						min={5}
						max={60}
						step={1}
					/>
					<ColorPalette
						label={__("Dot Color", "gutenslider")}
						colors={[
							{ name: "black", color: "#000000" },
							{ name: "white", color: "#ffffff" },
							{ name: "blue", color: "#007cba" },
						]}
						value={dotColor}
						onChange={(color) => setAttributes({ dotColor: color })}
						disableCustomColors={true}
						clearable={false}
					/>
					<RangeControl
						value={dotYOffset}
						label={<span> {__("Progress Offset", "gutenslider")} </span>}
						onChange={(val) =>
							setAttributes({
								dotYOffset: val,
								dotYOffsetMd: val,
								dotYOffsetSm: val,
							})
						}
						min={-200}
						max={200}
						step={1}
					/>
				</PanelBody>
			)}
			<PanelBody
				title={__("Lightgallery", "eedee-gutenslider")}
				initialOpen={false}
				className="gutenslider-controls gutenslider-controls-lightgallery eedee-icon-panel"
				icon={<FeatherIcon.ZoomIn size={18} color={"#000"} />}
			>
				<ToggleControl
					label={__(
						"Enable Lightgallery on image and video slides",
						"eedee-gutenslider"
					)}
					checked={hasLg}
					onChange={(val) => setAttributes({ hasLg: val })}
					help={__("Lightgallery is only visible in frontend")}
				/>
				{hasLg && (
					<>
						<ToggleControl
							label={__("Thumbnails", "eedee-gutenslider")}
							checked={lgThumbnails}
							onChange={(val) => setAttributes({ lgThumbnails: val })}
							help={__(
								"Show thumbnails below lightgallery slider",
								"eedee-gutenslider"
							)}
						/>
					</>
				)}
			</PanelBody>
			<PanelBody
				title={__("Dividers", "gutenslider")}
				initialOpen={false}
				className="gutenslider-controls gutenslider-controls-dividers eedee-icon-panel"
				icon={icons.divider}
			>
				{animation === "flip" && (
					<Disabled>
						<p>
							{__(
								"Dividers are disabled if animation is set to flip.",
								"gutenslider"
							)}
						</p>
						{dividerControls}
					</Disabled>
				)}
				{animation === "cube" && (
					<Disabled>
						<p>
							{__(
								"Dividers are disabled if animation is set to cube.",
								"gutenslider"
							)}
						</p>
						{dividerControls}
					</Disabled>
				)}
				{animation !== "flip" && animation !== "cube" && dividerControls}
			</PanelBody>
		</InspectorControls>
	);
};
