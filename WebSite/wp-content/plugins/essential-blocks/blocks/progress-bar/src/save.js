/**
 * WordPress dependencies
 */
import { useBlockProps } from "@wordpress/block-editor";

import { CONTAINER_CLASS, WRAPPER_CLASS, STRIPE_CLASS } from "./constants";

const save = ({ attributes }) => {
	const {
		blockId,
		layout,
		wrapperAlign,
		titleTag,
		progress,
		displayProgress,
		animationDuration,
		title,
		showStripe,
		stripeAnimation,
		prefix,
		suffix,
		classHook,
	} = attributes;

	const stripeClass = showStripe ? " " + STRIPE_CLASS[stripeAnimation] : "";

	return (
		<div {...useBlockProps.save()}>
			<div className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`}>
				<div className={`eb-progressbar-wrapper ${blockId}`}>
					<div
						className={`eb-progressbar-${CONTAINER_CLASS[layout]}-container ${wrapperAlign}`}
					>
						{(layout === "line" || layout === "line_rainbow") && title && (
							<attributes.titleTag class="eb-progressbar-title">
								{title}
							</attributes.titleTag>
						)}

						<div
							className={`eb-progressbar ${WRAPPER_CLASS[layout]}${stripeClass}`}
							data-layout={layout}
							data-count={progress}
							data-duration={animationDuration}
						>
							{(layout === "circle" || layout === "circle_fill") && (
								<>
									<div class="eb-progressbar-circle-pie">
										<div class="eb-progressbar-circle-half-left eb-progressbar-circle-half"></div>
										<div class="eb-progressbar-circle-half-right eb-progressbar-circle-half"></div>
									</div>
									<div class="eb-progressbar-circle-inner"></div>
									<div class="eb-progressbar-circle-inner-content">
										{title && (
											<attributes.titleTag class="eb-progressbar-title">
												{title}
											</attributes.titleTag>
										)}
										{displayProgress && (
											<span class="eb-progressbar-count-wrap">
												<span class="eb-progressbar-count">{progress}</span>
												<span class="postfix">%</span>
											</span>
										)}
									</div>
								</>
							)}

							{(layout === "half_circle" || layout === "half_circle_fill") && (
								<>
									<div class="eb-progressbar-circle">
										<div class="eb-progressbar-circle-pie">
											<div class="eb-progressbar-circle-half"></div>
										</div>
										<div class="eb-progressbar-circle-inner"></div>
									</div>
									<div class="eb-progressbar-circle-inner-content">
										<attributes.titleTag class="eb-progressbar-title">
											{title}
										</attributes.titleTag>
										{displayProgress && (
											<span class="eb-progressbar-count-wrap">
												<span class="eb-progressbar-count">{progress}</span>
												<span class="postfix">%</span>
											</span>
										)}
									</div>
								</>
							)}

							{(layout === "line" || layout === "line_rainbow") && (
								<>
									{displayProgress && (
										<span class="eb-progressbar-count-wrap">
											<span class="eb-progressbar-count">{progress}</span>
											<span class="postfix">%</span>
										</span>
									)}
									<span class="eb-progressbar-line-fill"></span>
								</>
							)}

							{layout === "box" && (
								<>
									<div class="eb-progressbar-box-inner-content">
										<attributes.titleTag class="eb-progressbar-title">
											{title}
										</attributes.titleTag>
										{displayProgress && (
											<span class="eb-progressbar-count-wrap">
												<span class="eb-progressbar-count">{progress}</span>
												<span class="postfix">%</span>
											</span>
										)}
									</div>
									<div class="eb-progressbar-box-fill"></div>
								</>
							)}
						</div>
						{(layout === "half_circle" || layout === "half_circle_fill") && (
							<>
								<div class="eb-progressbar-half-circle-after">
									<span class="eb-progressbar-prefix-label">{prefix}</span>
									<span class="eb-progressbar-postfix-label">{suffix}</span>
								</div>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default save;
