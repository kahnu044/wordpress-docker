import { render } from "@wordpress/element";
import ReactCompareImage from "react-compare-image";

window.addEventListener("DOMContentLoaded", () => {
	const wrappers = document.getElementsByClassName(
		"eb-image-comparison-wrapper"
	);

	for (let wrapper of wrappers) {
		const leftImage = wrapper.getAttribute("data-left-image");
		const rightImage = wrapper.getAttribute("data-right-image");
		const verticalMode = wrapper.getAttribute("data-vertical-mode");
		const hoverAttr = wrapper.getAttribute("data-hover");
		const showLabels = wrapper.getAttribute("data-show-label");
		const beforeLabel = wrapper.getAttribute("data-left-label");
		const afterLabel = wrapper.getAttribute("data-right-label");
		const sliderPosition = wrapper.getAttribute("data-slider-position");
		const sliderLineWidth = wrapper.getAttribute("data-line-width");
		const sliderLineColor = wrapper.getAttribute("data-line-color");
		const noHandle = wrapper.getAttribute("data-handle");

		// Keep vertical mode on mobile; we'll manage scroll via CSS touch-action
		const verticalProp = verticalMode === "true";
		const hoverProp = hoverAttr === "true";
		const sliderLineWidthNum = sliderLineWidth ? parseInt(sliderLineWidth, 10) : 0;
		const sliderPositionPct = sliderPosition ? Number(sliderPosition) / 100 : 0.5;

		render(
			<ReactCompareImage
				leftImage={leftImage}
				rightImage={rightImage}
				{...(verticalProp ? { vertical: true } : {})}
				{...(hoverProp ? { hover: true } : {})}
				{...(showLabels === "true" ? { leftImageLabel: beforeLabel } : {})}
				{...(showLabels === "true" ? { rightImageLabel: afterLabel } : {})}
				{...(noHandle === "true" ? { handle: <React.Fragment /> } : {})}
				sliderPositionPercentage={sliderPositionPct}
				sliderLineWidth={sliderLineWidthNum}
				sliderLineColor={sliderLineColor || "#ffffff"}
			/>,
			wrapper
		);
	}
});
