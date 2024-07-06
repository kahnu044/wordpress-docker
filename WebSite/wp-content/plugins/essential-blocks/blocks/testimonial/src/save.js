/**
 * WordPress dependencies
 */
import { RichText } from "@wordpress/block-editor";
import QuoteSVG from "./quoteIconSVG";
const { BlockProps } = window.EBControls;

const Save = ({ attributes }) => {
    const {
        blockId,
        avatarInline,
        userName,
        companyName,
        description,
        enableQuote,
        classHook,
        layoutPreset,
        showRating,
        rating,
        ratingIndivisual,
        imageUrl,
        showBlockContent
    } = attributes;

    if (!showBlockContent) {
        return
    }

    const replaceString = (str, find, replace) => {
        if (!str) {
            return "";
        }
        return str.replace(new RegExp(find, "g"), replace);
    };
    attributes.className = replaceString(attributes.className, "eb-testimonial-wrapper " + blockId, "").trim();

    return (
        <BlockProps.Save attributes={attributes}>
            <div className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`}>
                <div className={`eb-testimonial-wrapper ${blockId} ${layoutPreset}`} data-id={blockId}>
                    <div className="eb-testimonial-container">
                        <div className={`eb-avatar-container ${avatarInline ? "avatar-inline" : "avatar-basic"} `}>
                            {imageUrl && (
                                <div className="image-container">
                                    <div className="eb-avatar-style" />
                                </div>
                            )}

                            {layoutPreset !== "layout-preset-3" && (
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

                                    {showRating && !ratingIndivisual && rating != 0 && (
                                        <div className={`eb-testimonial-rating rating-${rating}`}>
                                            <i className="fa fa-star" aria-hidden="true"></i>
                                            <i className="fa fa-star" aria-hidden="true"></i>
                                            <i className="fa fa-star" aria-hidden="true"></i>
                                            <i className="fa fa-star" aria-hidden="true"></i>
                                            <i className="fa fa-star" aria-hidden="true"></i>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="eb-description-container">
                            {enableQuote && (
                                <div className="eb-testimonial-quote-style">
                                    <QuoteSVG />
                                </div>
                            )}
                            <RichText.Content tagName="p" className="eb-testimonial-description" value={description} />
                            {showRating && ratingIndivisual && rating != 0 && (
                                <div className={`eb-testimonial-rating rating-${rating}`}>
                                    <i className="fa fa-star" aria-hidden="true"></i>
                                    <i className="fa fa-star" aria-hidden="true"></i>
                                    <i className="fa fa-star" aria-hidden="true"></i>
                                    <i className="fa fa-star" aria-hidden="true"></i>
                                    <i className="fa fa-star" aria-hidden="true"></i>
                                </div>
                            )}
                        </div>

                        {layoutPreset == "layout-preset-3" && (
                            <div className="eb-userinfo-container">
                                <RichText.Content tagName="p" className="eb-testimonial-username" value={userName} />

                                <RichText.Content tagName="p" className="eb-testimonial-company" value={companyName} />

                                {showRating && !ratingIndivisual && rating != 0 && (
                                    <div className={`eb-testimonial-rating rating-${rating}`}>
                                        <i className="fa fa-star" aria-hidden="true"></i>
                                        <i className="fa fa-star" aria-hidden="true"></i>
                                        <i className="fa fa-star" aria-hidden="true"></i>
                                        <i className="fa fa-star" aria-hidden="true"></i>
                                        <i className="fa fa-star" aria-hidden="true"></i>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </BlockProps.Save>
    );
};

export default Save;
