/**
 * WordPress dependencies
 */
import { RichText, useBlockProps } from "@wordpress/block-editor";

import QuoteSVG from "./quoteIconSVG";

const Save = ({ attributes }) => {
	const {
		blockId,
		avatarInline,
		userName,
		companyName,
		description,
		enableQuote,
		classHook,
	} = attributes;
	
	const replaceString = (str, find, replace) => {
		return str.replace(new RegExp(find, "g"), replace);
	}

	const blockProps = {...useBlockProps.save()};

	const {
		className,
	} = blockProps;

	const updatedClassName = replaceString(className, "eb-testimonial-wrapper " + blockId, "").trim();

	const finalProps = {...useBlockProps.save(), className: updatedClassName};

	return (
		<div {...finalProps}>
			<div className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`}>
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
			</div>
		</div>
	);
};

export default Save;
