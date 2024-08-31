/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
    BlockControls,
    MediaPlaceholder,
    MediaUpload,
} from "@wordpress/block-editor";
import { ToolbarGroup, ToolbarItem, ToolbarButton } from "@wordpress/components";
import { memo } from "@wordpress/element";
import defaultAttributes from './attributes';

/**
 * Internal dependencies
 */
import Inspector from "./inspector";
import Style from "./style";

import {
    sanitizeURL,
    BlockProps,
    withBlockContext
} from "@essential-blocks/controls";

function Edit(props) {
    const { isSelected, attributes, setAttributes } = props;
    const {
        blockMeta,
        blockId,
        resOption,
        header,
        content,
        effectName,
        imageURL,
        imageID,
        imageAltTag,
        newWindow,
        link,
        classHook,
    } = attributes;

    if (!imageURL) {
        return (
            <MediaPlaceholder
                onSelect={(media) =>
                    setAttributes({
                        imageURL: media.url,
                        imageID: media.id,
                    })
                }
                allowTypes={["image"]}
                labels={{
                    title: "Images",
                    instructions:
                        "Drag media file, upload or select files from your library.",
                }}
            />
        );
    }

    // you must declare this variable
    const enhancedProps = {
        ...props,
        blockPrefix: 'eb-interactive-promo',
        style: <Style {...props} />
    };

    return (
        <>
            {isSelected && (
                <Inspector attributes={attributes} setAttributes={setAttributes} />
            )}
            <BlockControls>
                <ToolbarGroup>
                    <ToolbarItem>
                        {() => (
                            <MediaUpload
                                onSelect={(media) =>
                                    setAttributes({
                                        imageURL: media.url,
                                        imageID: media.id,
                                    })
                                }
                                allowedTypes={["image"]}
                                value={imageID}
                                render={({ open }) => (
                                    <ToolbarButton
                                        className="components-toolbar__control"
                                        label={__("Edit Image", "essential-blocks")}
                                        icon="edit"
                                        onClick={open}
                                    />
                                )}
                            />
                        )}
                    </ToolbarItem>
                </ToolbarGroup>
            </BlockControls>
            <BlockProps.Edit {...enhancedProps}>
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
                                        <h2 className="eb-interactive-promo-header">{header}</h2>
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
            </BlockProps.Edit>
        </>
    );
}
export default memo(withBlockContext(defaultAttributes)(Edit))
