/**
 * WordPress dependencies
 */
import { RichText, useBlockProps } from "@wordpress/block-editor";

import attributes from "./attributes";
import QuoteSVG from "./quoteIconSVG";
const { omit } = lodash;

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

            const blockProps = { ...useBlockProps.save() };
            const { className } = blockProps;
            const updatedClassName = replaceString(className, "eb-testimonial-wrapper " + blockId, "").trim();
            const finalProps = { ...useBlockProps.save(), className: updatedClassName };

            return (
                <div {...finalProps}>
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
                </div>
            );
        },
    },
    {
        attributes: {
            ...omit({ ...attributes }, [
                "layoutPreset",
                "imageOverlayColor",
                "showRating",
                "rating",
                "ratingIndivisual",
            ]),
        },
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
                classHook,
            } = attributes;

            const replaceString = (str, find, replace) => {
                if (!str) {
                    return "";
                }
                return str.replace(new RegExp(find, "g"), replace);
            };

            const blockProps = { ...useBlockProps.save() };

            const { className } = blockProps;

            const updatedClassName = replaceString(
                className,
                "eb-testimonial-wrapper " + blockId,
                ""
            ).trim();

            const finalProps = {
                ...useBlockProps.save(),
                className: updatedClassName,
            };

            return (
                <div {...finalProps}>
                    <div
                        className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`}
                    >
                        <div
                            className={`eb-testimonial-wrapper ${blockId}`}
                            data-id={blockId}
                        >
                            <div className="eb-testimonial-container">
                                <div
                                    className={`eb-avatar-container ${avatarInline
                                        ? "avatar-inline"
                                        : "avatar-basic"
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
                avatarInline,
                userName,
                companyName,
                description,
                enableQuote,
            } = attributes;

            return (
                <div
                    className={`eb-testimonial-wrapper ${blockId}`}
                    data-id={blockId}
                >
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
