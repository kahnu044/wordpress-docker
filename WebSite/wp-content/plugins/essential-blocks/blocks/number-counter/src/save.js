/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { RichText, useBlockProps } from "@wordpress/block-editor";

/**
 * Internal dependencies
 */

const Save = ({ attributes }) => {
	const {
		// blockId attribute for making unique className and other uniqueness ⬇
		blockId,

		// counter settings attributes ⬇
		target,
		duration,
		counterTitle,
		counterSuffix,
		counterPrefix,
		startValue,
		isShowSeparator,
		separator,

		//
		media,
		selectedIcon,
		imageUrl,
		classHook,
	} = attributes;

	return (
		<div {...useBlockProps.save()}>
			<div className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`}>
				<div className={`${blockId} eb-counter-wrapper`}>
					{media === "icon" ? (
						<div className="icon-img-wrapper">
							<div className="eb-icon ">
								<span
									data-icon={selectedIcon}
									className={`eb-counter-icon-data-selector  ${selectedIcon}`}
								></span>
							</div>
						</div>
					) : null}

					{media === "image" ? (
						<div className="icon-img-wrapper">
							<div className="eb-counter-image-wrapper">
								<img className="eb-counter-image" src={imageUrl} />
							</div>
						</div>
					) : null}

					<div className="counter-contents-wrapper">
						<h4 className="eb-counter-number">
							<span className="eb-counter-prefix">{counterPrefix}</span>
							<span
								className="eb-counter eb-counter-number"
								data-duration={duration ? Math.floor(Math.abs(duration)) : 0}
								data-startValue={
									startValue ? Math.floor(Math.abs(startValue)) : 0
								}
								data-target={target ? Math.floor(Math.abs(target)) : 0}
								data-separator={separator}
								data-isShowSeparator={isShowSeparator}
							>
								0
							</span>
							<span className="eb-counter-suffix">{counterSuffix}</span>
						</h4>

						<RichText.Content
							tagName="h3"
							className="eb-counter-title"
							value={counterTitle}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Save;
