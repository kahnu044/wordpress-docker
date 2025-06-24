/**
 * Internal dependencies
 */
import {
    sanitizeURL, BlockProps
} from "@essential-blocks/controls";

const Save = ({ attributes }) => {
    const {
        blockId,
        header,
        content,
        effectName,
        imageURL,
        imageAltTag,
        newWindow,
        link,
        classHook,
        titleTag: TitleTag
    } = attributes;

    return (
        <BlockProps.Save attributes={attributes}>
            <div className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`}>
                <div className={`eb-interactive-promo-wrapper ${blockId}`}>
                    <div
                        className="eb-interactive-promo-container"
                        data-effect={effectName}
                    >
                        <div className="eb-interactive-promo hover-effect">
                            <figure className={`effect-${effectName}`}>
                                <img src={imageURL} alt={imageAltTag} />
                                <figcaption>
                                    <TitleTag className="eb-interactive-promo-header">{header}</TitleTag>
                                    <p className="eb-interactive-promo-content">{content}</p>
                                    {link && (
                                        <a
                                            href={sanitizeURL(link)}
                                            target={newWindow ? "_blank" : "_self"}
                                            rel="noopener noreferrer"
                                        />
                                    )}
                                </figcaption>
                            </figure>
                        </div>
                    </div>
                </div>
            </div>
        </BlockProps.Save>
    );
};

export default Save;
