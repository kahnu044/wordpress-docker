/**
 * WordPress dependencies
 */
import { RichText } from "@wordpress/block-editor";

import attributes from "./attributes";
import QuoteSVG from "./quoteIconSVG";

const Deprecated = [
	{
		attributes: { ...attributes },
		supports: {
			align: ["wide", "full"],
		},
		save: ({ attributes }) => {
			const {
				blockId,
				avatarInline,
				userName,
				companyName,
				description,
				enableQuote,
			} = attributes;

			return (
				<div className={`eb-testimonial-wrapper ${blockId}`} data-id={blockId}>
					<div className="eb-testimonial-container">
						<div
							className={`eb-avatar-container ${avatarInline ? "avatar-inline" : "avatar-basic"
								} `}
						>
							<div className="image-container">
								<div className="eb-avatar-style" />
							</div>
							<div className="eb-userinfo-container">
								<RichText.Content
									tagName="p"
									className="eb-testimonial-username"
									value={userName}
								/>

								<RichText.Content
									tagName="p"
									className="eb-testimonial-company"
									value={companyName}
								/>
							</div>
						</div>

						<div className="eb-description-container">
							{enableQuote && (
								<div className="eb-testimonial-quote-style">
									<QuoteSVG />
								</div>
							)}
							<RichText.Content
								tagName="p"
								className="eb-testimonial-description"
								value={description}
							/>
						</div>
					</div>
				</div>
			);
		},
	},
];

export default Deprecated;
