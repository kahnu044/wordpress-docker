/**
 * Internal dependencies
 */
import { useBlockProps } from "@wordpress/block-editor";
import { omit } from "lodash";

/**
 * WordPress dependencies
 */
import attributes from "./attributes";

const deprecated = [
	{
		attributes: omit({ ...attributes }, [
			"filterItems",
			"enableFilter",
			"enableFilterAll",
			"filterAllTitle",
		]),
		supports: {
			align: ["wide", "full"],
		},
		save: ({ attributes }) => {
			const {
				blockId,
				layouts,
				sources,
				displayCaption,
				captionOnHover,
				styleNumber,
				overlayStyle,
				horizontalAlign,
				verticalAlign,
				disableLightBox,
				classHook,
			} = attributes;

			if (sources.length === 0) return null;

			let lightBoxHtml = {
				class: "eb-gallery-img-content",
			};
			if (!disableLightBox) {
				lightBoxHtml = {
					...lightBoxHtml,
					["data-fslightbox"]: "gallery",
					["data-type"]: "image",
				};
			}

			return (
				<div {...useBlockProps.save()}>
					<div
						className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`}
					>
						<div
							className={`eb-gallery-img-wrapper ${blockId} ${layouts} ${overlayStyle} caption-style-${styleNumber} ${
								captionOnHover ? "caption-on-hover" : ""
							}`}
							data-id={blockId}
						>
							{sources.map((source, index) => (
								<a
									key={index}
									href={!disableLightBox ? source.url : "javascript:void(0)"}
									{...lightBoxHtml}
								>
									<span className="eb-gallery-link-wrapper">
										<img
											className="eb-gallery-img"
											src={source.url}
											image-index={index}
										/>
										{displayCaption &&
											source.caption &&
											source.caption.length > 0 && (
												<span
													className={`eb-gallery-img-caption ${horizontalAlign} ${verticalAlign}`}
												>
													{source.caption}
												</span>
											)}
									</span>
								</a>
							))}
						</div>
					</div>
				</div>
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
				layouts,
				sources,
				displayCaption,
				captionOnHover,
				styleNumber,
				overlayStyle,
				horizontalAlign,
				verticalAlign,
				disableLightBox,
				classHook,
			} = attributes;

			if (sources.length === 0) return null;

			return (
				<div {...useBlockProps.save()}>
					<div
						className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`}
					>
						<div
							className={`eb-gallery-img-wrapper ${blockId} ${layouts} ${overlayStyle} caption-style-${styleNumber} ${
								captionOnHover ? "caption-on-hover" : ""
							}`}
							data-id={blockId}
						>
							{sources.map((source, index) => (
								<a
									key={index}
									data-fslightbox="gallery"
									href={!disableLightBox ? source.url : "javascript:void(0)"}
									className={`eb-gallery-img-content`}
								>
									<span className="eb-gallery-link-wrapper">
										<img
											className="eb-gallery-img"
											src={source.url}
											image-index={index}
										/>
										{displayCaption &&
											source.caption &&
											source.caption.length > 0 && (
												<span
													className={`eb-gallery-img-caption ${horizontalAlign} ${verticalAlign}`}
												>
													{source.caption}
												</span>
											)}
									</span>
								</a>
							))}
						</div>
					</div>
				</div>
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
				layouts,
				sources,
				displayCaption,
				captionOnHover,
				styleNumber,
				overlayStyle,
				horizontalAlign,
				verticalAlign,
				disableLightBox,
			} = attributes;

			if (sources.length === 0) return null;

			return (
				<div {...useBlockProps.save()}>
					<div
						className={`eb-gallery-img-wrapper ${blockId} ${layouts} ${overlayStyle} caption-style-${styleNumber} ${
							captionOnHover ? "caption-on-hover" : ""
						}`}
						data-id={blockId}
					>
						{sources.map((source, index) => (
							<a
								key={index}
								data-fslightbox="gallery"
								href={!disableLightBox ? source.url : "javascript:void(0)"}
								className={`eb-gallery-img-content`}
							>
								<span className="eb-gallery-link-wrapper">
									<img
										className="eb-gallery-img"
										src={source.url}
										image-index={index}
									/>
									{displayCaption &&
										source.caption &&
										source.caption.length > 0 && (
											<span
												className={`eb-gallery-img-caption ${horizontalAlign} ${verticalAlign}`}
											>
												{source.caption}
											</span>
										)}
								</span>
							</a>
						))}
					</div>
				</div>
			);
		},
	},
	{
		attributes: { ...attributes },

		save: ({ attributes }) => {
			const {
				blockId,
				layouts,
				sources,
				displayCaption,
				captionOnHover,
				styleNumber,
				overlayStyle,
				horizontalAlign,
				verticalAlign,
			} = attributes;

			if (sources.length === 0) return null;

			return (
				<div
					className={`eb-gallery-img-wrapper ${blockId} ${layouts} ${overlayStyle} caption-style-${styleNumber} ${
						captionOnHover ? "caption-on-hover" : ""
					}`}
					data-id={blockId}
				>
					{sources.map((source, index) => (
						<a className={`eb-gallery-img-content`}>
							<span className="eb-gallery-link-wrapper">
								<img
									className="eb-gallery-img"
									src={source.url}
									image-index={index}
								/>
								{displayCaption &&
									source.caption &&
									source.caption.length > 0 && (
										<span
											className={`eb-gallery-img-caption ${horizontalAlign} ${verticalAlign}`}
										>
											{source.caption}
										</span>
									)}
							</span>
						</a>
					))}
				</div>
			);
		},
	},
];

export default deprecated;
