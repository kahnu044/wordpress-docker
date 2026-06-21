/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
    BlockControls,
    MediaPlaceholder,
    MediaUpload,
} from "@wordpress/block-editor";
import {
    ToolbarGroup,
    ToolbarItem,
    ToolbarButton,
} from "@wordpress/components";
import { memo } from "@wordpress/element";
import defaultAttributes from "./attributes";

/**
 * Internal dependencies
 */
import Inspector from "./inspector";
import Style from "./style";

import {
    sanitizeURL,
    BlockProps,
    withBlockContext,
    ImageComponent,
    DynamicImageHandler,
} from "@essential-blocks/controls";
import { ImageComparison } from "./icon";
import { IMG_ATTR_PROPS } from "./constants";
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
        titleTag: TitleTag,
    } = attributes;

    if (!imageURL) {
        return (
            <ImageComponent.Upload
                imageAttrProps={IMG_ATTR_PROPS}
                labels={{
                    title: __("Interactive Promo", "essential-blocks"),
                    instructions: __(
                        "Drag media file, upload or select files from your library.",
                        "essential-blocks"
                    ),
                }}
                icon={ImageComparison}
            />
        );
    }

    // you must declare this variable
    const enhancedProps = {
        ...props,
        blockPrefix: "eb-interactive-promo",
        style: <Style {...props} />,
    };

    return (
        <>
            {isSelected && (
                <Inspector
                    attributes={attributes}
                    setAttributes={setAttributes}
                />
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
                                        label={__(
                                            "Edit Image",
                                            "essential-blocks",
                                        )}
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
                <div
                    className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`}
                >
                    <div className={`eb-interactive-promo-wrapper ${blockId}`}>
                        <div
                            className="eb-interactive-promo-container"
                            data-effect={effectName}
                        >
                            <div className="eb-interactive-promo hover-effect">
                                <figure className={`effect-${effectName}`}>
                                    <DynamicImageHandler src={imageURL} alt={imageAltTag} />
                                    <figcaption>
                                        <TitleTag className="eb-interactive-promo-header">
                                            {header}
                                        </TitleTag>
                                        <p className="eb-interactive-promo-content">
                                            {content}
                                        </p>
                                        {link && (
                                            <a
                                                href={sanitizeURL(link)}
                                                target={
                                                    newWindow
                                                        ? "_blank"
                                                        : "_self"
                                                }
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
export default memo(withBlockContext(defaultAttributes)(Edit));
