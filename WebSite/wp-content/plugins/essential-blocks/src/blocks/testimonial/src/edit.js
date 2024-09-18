/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { memo } from "@wordpress/element";
import { RichText, MediaUpload } from "@wordpress/block-editor";
import { Button } from "@wordpress/components";
/**
 * Internal dependencies
 */
import Inspector from "./inspector";
import { ReactComponent as Icon } from "./icon.svg";
import { Templates } from './templates/templates';
import defaultAttributes from './attributes';

import {
    BlockProps,
    BrowseTemplate,
    withBlockContext
} from "@essential-blocks/controls";

import Style from "./style";
import QuoteSVG from "./quoteIconSVG";

const Edit = (props) => {
    const { attributes, setAttributes, className, clientId, isSelected, name } = props;
    const {
        resOption,
        blockId,
        blockMeta,
        imageId,
        imageUrl,
        userName,
        companyName,
        description,
        enableQuote,
        classHook,
        layoutPreset,
        showRating,
        rating,
        ratingIndivisual,
        showBlockContent
    } = attributes;

    const replaceString = (str, find, replace) => {
        if (str === undefined) {
            return "";
        }
        return str.replace(new RegExp(find, "g"), replace);
    };
    attributes.className = replaceString(attributes.className, "eb-testimonial-wrapper", "");
    attributes.className = replaceString(attributes.className, blockId, "");

    // you must declare this variable
    const enhancedProps = {
        ...props,
        blockPrefix: 'eb-testimonial',
        style: <Style {...props} />
    };

    return(
        <>
            {isSelected && showBlockContent && <Inspector attributes={attributes} setAttributes={setAttributes} />}
            <BlockProps.Edit {...enhancedProps}>
                <BrowseTemplate
                    {...props}
                    Icon={Icon}
                    title={"Testimonial"}
                    description={"Choose a template for the Testimonial or start blank."}
                    patterns={Templates}
                />
                {showBlockContent && (
                    <>
                        <div className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`}>
                            <div className={`eb-testimonial-wrapper ${blockId} ${layoutPreset}`} data-id={blockId}>
                                <div className="eb-testimonial-container">
                                    <div className="eb-avatar-container">
                                        <div className="image-container">
                                            <div className="eb-avatar-style" />
                                            <MediaUpload
                                                onSelect={(media) =>
                                                    setAttributes({
                                                        imageUrl: media.url,
                                                        imageId: media.id,
                                                    })
                                                }
                                                type="image"
                                                value={imageId}
                                                render={({ open }) =>
                                                    !imageUrl && (
                                                        <Button
                                                            className="eb-testimonial-image components-button"
                                                            label={__("Upload Image", "essential-blocks")}
                                                            icon="format-image"
                                                            onClick={open}
                                                        />
                                                    )
                                                }
                                            />
                                        </div>

                                        {layoutPreset !== "layout-preset-3" && (
                                            <div className="eb-userinfo-container">
                                                <RichText
                                                    tagName="p"
                                                    className="eb-testimonial-username"
                                                    value={userName}
                                                    onChange={(newName) =>
                                                        setAttributes({
                                                            userName: newName,
                                                        })
                                                    }
                                                />

                                                <RichText
                                                    tagName="p"
                                                    className="eb-testimonial-company"
                                                    value={companyName}
                                                    onChange={(newName) =>
                                                        setAttributes({
                                                            companyName: newName,
                                                        })
                                                    }
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

                                        <RichText
                                            tagName="p"
                                            className="eb-testimonial-description"
                                            value={description}
                                            onChange={(newText) => setAttributes({ description: newText })}
                                        />
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
                                            <RichText
                                                tagName="p"
                                                className="eb-testimonial-username"
                                                value={userName}
                                                onChange={(newName) => setAttributes({ userName: newName })}
                                            />

                                            <RichText
                                                tagName="p"
                                                className="eb-testimonial-company"
                                                value={companyName}
                                                onChange={(newName) =>
                                                    setAttributes({
                                                        companyName: newName,
                                                    })
                                                }
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
                            </div>
                        </div>
                    </>
                )}
            </BlockProps.Edit>
        </>
    );
}
export default memo(withBlockContext(defaultAttributes)(Edit))
