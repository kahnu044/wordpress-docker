import { RichText } from "@wordpress/block-editor";

export default function InfoboxContainer2({ requiredProps }) {
	const {
		blockId,
		selectedIcon,
		media,
		number,
		imageUrl,
		infoboxLink,
		enableSubTitle,
		enableDescription,
		enableButton,
		isInfoClick,
		buttonText,
		title,
		subTitle,
		description,
		titleTag,
		subTitleTag,
		btnEffect,
		classHook,
	} = requiredProps;

	return (
		<div className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`}>
			<div className={`${blockId} eb-infobox-wrapper`}>
				<div className="infobox-wrapper-inner">
					{media === "icon" ? (
						<div className="icon-img-wrapper">
							<div className="eb-icon number-or-icon">
								<span
									data-icon={selectedIcon}
									className={`eb-infobox-icon-data-selector  ${selectedIcon}`}
								></span>
							</div>
						</div>
					) : null}

					{media === "number" ? (
						<div className="icon-img-wrapper">
							<div className="eb-infobox-num-wrapper number-or-icon">
								<span className="eb-infobox-number">{number}</span>
							</div>
						</div>
					) : null}

					{media === "image" ? (
						<div className="icon-img-wrapper">
							<div className="eb-infobox-image-wrapper">
								<img
									className="eb-infobox-image"
									src={imageUrl}
									alt="macbook"
								/>
							</div>
						</div>
					) : null}

					<div className="contents-wrapper">
						<RichText.Content
							tagName={titleTag}
							className="title"
							value={title}
						/>

						{enableSubTitle ? (
							<RichText.Content
								tagName={subTitleTag}
								className="subtitle"
								value={subTitle}
							/>
						) : null}

						{enableDescription ? (
							<RichText.Content
								tagName="p"
								className="description"
								value={description}
							/>
						) : null}

						{enableButton && !isInfoClick ? (
							<div className="eb-infobox-btn-wrapper">
								<a
									href={infoboxLink}
									className={`infobox-btn  ${btnEffect || " "}`}
								>
									{buttonText}
								</a>
							</div>
						) : null}
					</div>
				</div>
			</div>
		</div>
	);
}
