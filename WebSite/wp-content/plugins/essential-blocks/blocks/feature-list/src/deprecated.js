/**
 * WordPress dependencies
 */
import { useBlockProps } from "@wordpress/block-editor";
import { omit } from "lodash";

import attributes from "./attributes";

const deprecated = [
	{
		attributes: {
			...omit({ ...attributes }, ["inlineDesignClass"]),
		},
		supports: {
			align: ["wide", "full"],
		},
		save: ({ attributes }) => {
			const {
				blockId,
				featureListAlign,
				features,
				iconPosition,
				iconShape,
				shapeView,
				classHook,
			} = attributes;

			const featureListAlignClass =
				featureListAlign === "center"
					? " eb-feature-list-center"
					: featureListAlign === "right"
					? " eb-feature-list-right"
					: " eb-feature-list-left";

			const featureListWrapperClass =
				iconShape !== "none" ? ` ${iconShape} ${shapeView}` : " none";
			let iconStyle = {};

			return (
				<div {...useBlockProps.save()}>
					<div
						className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`}
					>
						<div
							className={`${blockId} eb-feature-list-wrapper -icon-position-${iconPosition} -tablet-icon-position-${iconPosition} -mobile-icon-position-${iconPosition}${featureListAlignClass}`}
						>
							<ul className={`eb-feature-list-items${featureListWrapperClass}`}>
								{features.map(
									(
										{
											title,
											iconType,
											featureImage,
											featureImageId,
											icon,
											iconColor,
											iconBackgroundColor,
											content,
											link,
										},
										index
									) => {
										{
											iconStyle = {
												color: iconColor,
												backgroundColor: iconBackgroundColor,
											};
										}
										return (
											<li
												key={index}
												className="eb-feature-list-item"
												data-icon-type={iconType}
												data-image={featureImage}
												data-image-id={featureImageId}
												data-icon={icon}
												data-icon-color={iconColor}
												data-icon-background-color={iconBackgroundColor}
												data-link={link}
											>
												{iconType !== "none" && (
													<div className="eb-feature-list-icon-box">
														<div className="eb-feature-list-icon-inner">
															<span
																className="eb-feature-list-icon"
																style={iconStyle}
															>
																{iconType === "icon" && (
																	<i aria-hidden="true" className={icon}></i>
																)}
																{iconType === "image" && (
																	<img
																		className="eb-feature-list-img"
																		src={featureImage}
																	/>
																)}
															</span>
														</div>
													</div>
												)}
												<div className="eb-feature-list-content-box">
													{link ? (
														<attributes.titleTag className="eb-feature-list-title">
															<a href={link}>{title}</a>
														</attributes.titleTag>
													) : (
														<attributes.titleTag className="eb-feature-list-title">
															{title}
														</attributes.titleTag>
													)}
													<p className="eb-feature-list-content">{content}</p>
												</div>
											</li>
										);
									}
								)}
							</ul>
						</div>
					</div>
				</div>
				// edit view end
			);
		},
	},
	{
		attributes: { ...attributes },
		supports: {
			align: ["wide", "full"],
		},
		save: ({ attributes }) => {
			const {
				blockId,
				featureListAlign,
				features,
				iconPosition,
				iconShape,
				shapeView,
				classHook,
			} = attributes;

			const featureListAlignClass =
				featureListAlign === "center"
					? " eb-feature-list-center"
					: featureListAlign === "right"
					? " eb-feature-list-right"
					: " eb-feature-list-left";

			const featureListWrapperClass =
				iconShape !== "none" ? ` ${iconShape} ${shapeView}` : " none";
			let iconStyle = {};

			return (
				<div {...useBlockProps.save()}>
					<div
						className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`}
					>
						<div
							className={`${blockId} eb-feature-list-wrapper -icon-position-${iconPosition} -tablet-icon-position-${iconPosition} -mobile-icon-position-${iconPosition}${featureListAlignClass}`}
						>
							<ul className={`eb-feature-list-items${featureListWrapperClass}`}>
								{features.map(
									(
										{
											title,
											iconType,
											featureImage,
											featureImageId,
											icon,
											iconColor,
											iconBackgroundColor,
											content,
											link,
										},
										index
									) => {
										{
											iconStyle = {
												color: iconColor,
												backgroundColor: iconBackgroundColor,
											};
										}
										return (
											<li
												key={index}
												className="eb-feature-list-item"
												data-icon-type={iconType}
												data-image={featureImage}
												data-image-id={featureImageId}
												data-icon={icon}
												data-icon-color={iconColor}
												data-icon-background-color={iconBackgroundColor}
												data-link={link}
											>
												{iconType !== "none" && (
													<div className="eb-feature-list-icon-box">
														<div className="eb-feature-list-icon-inner">
															<span
																className="eb-feature-list-icon"
																style={iconStyle}
															>
																{iconType === "icon" && (
																	<i aria-hidden="true" className={icon}></i>
																)}
																{iconType === "image" && (
																	<img
																		className="eb-feature-list-img"
																		src={featureImage}
																	/>
																)}
															</span>
														</div>
													</div>
												)}
												<div className="eb-feature-list-content-box">
													{link ? (
														<attributes.titleTag className="eb-feature-list-title">
															<a href={link}>{title}</a>
														</attributes.titleTag>
													) : (
														<attributes.titleTag className="eb-feature-list-title">
															{title}
														</attributes.titleTag>
													)}
													<p className="eb-feature-list-content">{content}</p>
												</div>
											</li>
										);
									}
								)}
							</ul>
						</div>
					</div>
				</div>
				// edit view end
			);
		},
	},
	{
		attributes: { ...attributes },
		supports: {
			align: ["wide", "full"],
		},
		save: ({ attributes }) => {
			const {
				blockId,
				featureListAlign,
				features,
				iconPosition,
				iconShape,
				shapeView,
			} = attributes;

			const featureListAlignClass =
				featureListAlign === "center"
					? " eb-feature-list-center"
					: featureListAlign === "right"
					? " eb-feature-list-right"
					: " eb-feature-list-left";

			const featureListWrapperClass =
				iconShape !== "none" ? ` ${iconShape} ${shapeView}` : " none";
			let iconStyle = {};

			return (
				<div {...useBlockProps.save()}>
					<div
						className={`${blockId} eb-feature-list-wrapper -icon-position-${iconPosition} -tablet-icon-position-${iconPosition} -mobile-icon-position-${iconPosition}${featureListAlignClass}`}
					>
						<ul className={`eb-feature-list-items${featureListWrapperClass}`}>
							{features.map(
								(
									{
										title,
										iconType,
										featureImage,
										featureImageId,
										icon,
										iconColor,
										iconBackgroundColor,
										content,
										link,
									},
									index
								) => {
									{
										iconStyle = {
											color: iconColor,
											backgroundColor: iconBackgroundColor,
										};
									}
									return (
										<li
											key={index}
											className="eb-feature-list-item"
											data-icon-type={iconType}
											data-image={featureImage}
											data-image-id={featureImageId}
											data-icon={icon}
											data-icon-color={iconColor}
											data-icon-background-color={iconBackgroundColor}
											data-link={link}
										>
											{iconType !== "none" && (
												<div className="eb-feature-list-icon-box">
													<div className="eb-feature-list-icon-inner">
														<span
															className="eb-feature-list-icon"
															style={iconStyle}
														>
															{iconType === "icon" && (
																<i aria-hidden="true" className={icon}></i>
															)}
															{iconType === "image" && (
																<img
																	className="eb-feature-list-img"
																	src={featureImage}
																/>
															)}
														</span>
													</div>
												</div>
											)}
											<div className="eb-feature-list-content-box">
												{link ? (
													<attributes.titleTag className="eb-feature-list-title">
														<a href={link}>{title}</a>
													</attributes.titleTag>
												) : (
													<attributes.titleTag className="eb-feature-list-title">
														{title}
													</attributes.titleTag>
												)}
												<p className="eb-feature-list-content">{content}</p>
											</div>
										</li>
									);
								}
							)}
						</ul>
					</div>
				</div>
				// edit view end
			);
		},
	},
];

export default deprecated;
