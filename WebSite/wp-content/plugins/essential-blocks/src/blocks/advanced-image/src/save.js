import { RichText } from "@wordpress/block-editor";
import {
    sanitizeURL,
    BlockProps
} from "@essential-blocks/controls";

const save = ({ attributes }) => {
    const {
        blockId,
        image,
        imageCaption,
        horizontalAlign,
        verticalAlign,
        verticalAlignCap2,
        stylePreset,
        captionStyle,
        hoverEffect,
        openInNewTab,
        imageLink,
        enableLink,
        classHook,
        imgSource
    } = attributes;

    if (imgSource !== 'custom') {
        return null;
    }

    let imageURL = image.url;

    const linkTarget = openInNewTab ? "_blank" : undefined;

    if (imageURL === "") return null;

    return (
        <BlockProps.Save attributes={attributes}>
            <div className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`}>
                <figure
                    className={`eb-advanced-image-wrapper ${blockId} img-style-${stylePreset} ${captionStyle} caption-horizontal-${horizontalAlign} caption-vertical-${verticalAlign} ${verticalAlignCap2} ${hoverEffect}`}
                    data-id={blockId}
                >
                    <div className="image-wrapper">
                        {enableLink && (
                            <a
                                className={"eb-advimg-link"}
                                href={sanitizeURL(imageLink)}
                                target={linkTarget}
                                rel={linkTarget === "_blank" ? "noopener" : undefined}
                            >
                            </a>
                        )}
                        <img src={imageURL} alt={image.alt} />
                        {!RichText.isEmpty(imageCaption) &&
                            captionStyle != "caption-style-2" && (
                                <RichText.Content tagName="figcaption" value={imageCaption} />
                            )}
                    </div>

                    {!RichText.isEmpty(imageCaption) &&
                        captionStyle == "caption-style-2" && (
                            <RichText.Content tagName="figcaption" value={imageCaption} />
                        )}
                </figure>
            </div>
        </BlockProps.Save>
    );
};

export default save;
