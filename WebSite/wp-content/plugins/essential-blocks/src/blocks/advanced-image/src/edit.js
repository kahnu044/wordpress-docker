/**
 * WordPress dependencies
 */
import { __, sprintf } from "@wordpress/i18n";
import {
    MediaUpload,
    MediaPlaceholder,
    RichText,
    BlockControls,
} from "@wordpress/block-editor";
import {
    ToolbarGroup,
    ToolbarItem,
    ToolbarButton,
    Placeholder,
    Button
} from "@wordpress/components";
import { edit } from "@wordpress/icons";
import { memo, useEffect, useRef } from "@wordpress/element";
import { select, useSelect, useDispatch } from "@wordpress/data";
import { useEntityProp, store as coreStore } from '@wordpress/core-data';
import { upload } from '@wordpress/icons';
import { store as noticesStore } from '@wordpress/notices';
import classnames from "classnames";

/**
 * Internal depencencies
 */
import Inspector from "./inspector";
import defaultAttributes from './attributes';
import Style from "./style";

import {
    BlockProps,
    NoticeComponent,
    withBlockContext
} from '@essential-blocks/controls';

import {
    SiteLogo,
    SiteLogoReplaceFlow,
    getMediaSourceUrlBySizeSlug,
    disabledClickProps,
    ebLoader
} from "./helpers";

import { CustomIcon, SiteLogoIcon, FeaturedImgIcon, AdvancedImageIcon } from './helper/icons';

const Edit = (props) => {
    const {
        attributes,
        setAttributes,
        isSelected,
        context
    } = props;
    const {
        resOption,
        blockId,
        blockMeta,
        image,
        imageCaption,
        displayCaption,
        horizontalAlign,
        verticalAlign,
        verticalAlignCap2,
        stylePreset,
        captionStyle,
        hoverEffect,
        classHook,
        imageSize,
        widthRange,
        heightRange,
        autoHeight,
        imgSource,
        shouldSyncIcon,
        imagePostId,
        enableLink,
    } = attributes;

    const enhancedProps = {
        ...props,
        blockPrefix: 'eb-advanced-image',
        style: <Style {...props} />
    };

    let urls = image.url;

    // this useEffect is for creating a unique id for each block's unique className by a random unique number
    useEffect(() => {
        // for old version support
        if (imgSource === undefined && image.url.length > 0) {
            setAttributes({ imgSource: 'custom' });
        }
    }, []);

    // Get only urls
    const oldImageData = wp.data.select("core").getMedia(image.id);
    const prevImageSize = useRef(imageSize);

    // site logo
    const ref = useRef();

    const {
        siteLogoId,
        canUserEdit,
        url,
        siteIconId,
        mediaItemData,
        isRequestingMediaItem,
    } = useSelect((select) => {
        const { canUser, getEntityRecord, getEditedEntityRecord } =
            select(coreStore);
        const _canUserEdit = canUser('update', 'settings');
        const siteSettings = _canUserEdit
            ? getEditedEntityRecord('root', 'site')
            : undefined;
        const siteData = getEntityRecord('root', '__unstableBase');
        const _siteLogoId = _canUserEdit
            ? siteSettings?.site_logo
            : siteData?.site_logo;
        const _siteIconId = siteSettings?.site_icon;
        const mediaItem =
            _siteLogoId &&
            select(coreStore).getMedia(_siteLogoId, {
                context: 'view',
            });
        const _isRequestingMediaItem =
            _siteLogoId &&
            !select(coreStore).hasFinishedResolution('getMedia', [
                _siteLogoId,
                { context: 'view' },
            ]);

        return {
            siteLogoId: _siteLogoId,
            canUserEdit: _canUserEdit,
            url: siteData?.home,
            mediaItemData: mediaItem,
            isRequestingMediaItem: _isRequestingMediaItem,
            siteIconId: _siteIconId,
        };
    }, []);

    const { editEntityRecord } = useDispatch(coreStore);

    const setLogo = (newValue, shouldForceSync = false) => {
        // `shouldForceSync` is used to force syncing when the attribute
        // may not have updated yet.
        if (shouldSyncIcon || shouldForceSync) {
            setIcon(newValue);
        }

        editEntityRecord('root', 'site', undefined, {
            site_logo: newValue,
        });
    };

    const setIcon = (newValue) =>
        // The new value needs to be `null` to reset the Site Icon.
        editEntityRecord('root', 'site', undefined, {
            site_icon: newValue ?? null,
        });

    const { alt_text: alt, source_url: logoUrl } = mediaItemData ?? {};

    const onInitialSelectLogo = (media) => {
        // Initialize the syncSiteIcon toggle. If we currently have no Site logo and no
        // site icon, automatically sync the logo to the icon.
        if (shouldSyncIcon === undefined) {
            const shouldForceSync = !siteIconId;
            setAttributes({ shouldSyncIcon: shouldForceSync });

            // Because we cannot rely on the `shouldSyncIcon` attribute to have updated by
            // the time `setLogo` is called, pass an argument to force the syncing.
            onSelectLogo(media, shouldForceSync);
            return;
        }

        onSelectLogo(media);
    };

    const onSelectLogo = (media, shouldForceSync = false) => {
        if (!media) {
            return;
        }

        if (!media.id && media.url) {
            // This is a temporary blob image.
            setLogo(undefined);
            return;
        }

        setLogo(media.id, shouldForceSync);
    };

    const onRemoveLogo = () => {
        setLogo(null);
        setAttributes({ width: undefined });
    };

    const { createErrorNotice } = useDispatch(noticesStore);
    const onUploadError = (message) => {
        createErrorNotice(message, { type: 'snackbar' });
    };

    const mediaReplaceFlowProps = {
        mediaURL: logoUrl,
        onSelect: onSelectLogo,
        onError: onUploadError,
        onRemoveLogo,
    };

    // site logo controls
    const controls = canUserEdit && logoUrl && (
        <BlockControls group="other">
            <SiteLogoReplaceFlow {...mediaReplaceFlowProps} />
        </BlockControls>
    );

    let logoImage;
    const isLoading = siteLogoId === undefined || isRequestingMediaItem;

    if (isLoading) {
        logoImage = ebLoader();
    }
    if (!!logoUrl) {
        logoImage = (
            <SiteLogo
                alt={alt}
                attributes={attributes}
                containerRef={ref}
                isSelected={isSelected}
                setAttributes={setAttributes}
                logoUrl={logoUrl}
                setLogo={setLogo}
                logoId={mediaItemData?.id || siteLogoId}
                siteUrl={url}
                setIcon={setIcon}
                iconId={siteIconId}
                canUserEdit={canUserEdit}
            />
        );
    }

    const postId = context['postID'],
        postTypeSlug = context['postType']

    const [storedFeaturedImage, setFeaturedImage] = useEntityProp(
        'postType',
        postTypeSlug,
        'featured_media',
        postId
    );

    let featuredImage = storedFeaturedImage;

    const { media, postType, postPermalink } = useSelect(
        (select) => {
            const { getMedia, getPostType, getEditedEntityRecord } =
                select(coreStore);

            return {
                media:
                    featuredImage &&
                    getMedia(featuredImage, {
                        context: 'view',
                    }),
                postType: postTypeSlug && getPostType(postTypeSlug),
                postPermalink: getEditedEntityRecord(
                    'postType',
                    postTypeSlug,
                    postId
                )?.link,
            };
        },
        [featuredImage, postTypeSlug, postId]
    );

    const mediaUrl = getMediaSourceUrlBySizeSlug(media, imageSize);

    const featuredPlaceholder = (content) => {
        return (
            <Placeholder
                className={classnames(
                    'block-editor-media-placeholder',
                    // borderProps.className
                )}
                withIllustration
            // style={{
            //     height: !!aspectRatio && '100%',
            //     width: !!aspectRatio && '100%',
            //     // ...borderProps.style,
            //     // ...shadowProps.style,
            // }}
            >
                {content}
            </Placeholder>
        );
    };
    const featuredImageHtml = (mediaUrl, media) => {
        return (
            <img
                // className={borderProps.className}
                src={mediaUrl}
                alt={
                    media?.alt_text
                        ? sprintf(
                            // translators: %s: The image's alt text.
                            __('Featured image: %s'),
                            media?.alt_text
                        )
                        : __('Featured image')
                }
            // style={imageStyles}
            />
        );
    };

    let postFeaturedImage;

    if (!featuredImage) {
        postFeaturedImage = __('Seems like you haven\'t added a Featured Image for this post. Please make sure to add a Featured Image and try again.');

    } else {
        // We have a Featured image so show a Placeholder if is loading.
        postFeaturedImage = !media ? (
            featuredPlaceholder()
        ) : (featuredImageHtml(mediaUrl, media)
        );
    }

    if (imgSource === 'featured-img' && !media && postFeaturedImage.length == 0) {
        return (
            <div className="eb-loading">
                <img src={`${EssentialBlocksLocalize?.image_url}/ajax-loader.gif`} alt="Loading..." />
            </div>
        )
    }
    return (
        <>
            {isSelected && imgSource && (
                <Inspector
                    attributes={attributes}
                    setAttributes={setAttributes}
                    media={media}
                    prevImageSize={prevImageSize}
                    oldImageData={oldImageData}
                />
            )}

            <BlockProps.Edit {...enhancedProps}>
                {!imgSource && (
                    <>
                        <div className="eb-adv-img-editor-source-select">
                            <h2>Please Select an Image Source</h2>
                            <div
                                className="eb-adv-img-editor-source-item"
                                onClick={() =>
                                    setAttributes({
                                        imgSource: "custom",
                                    })
                                }
                            >
                                <div className="eb-adv-img-editor-source-icon">
                                    <CustomIcon />
                                </div>
                                <span>Custom Image</span>
                            </div>
                            <div
                                className="eb-adv-img-editor-source-item"
                                onClick={() =>
                                    setAttributes({
                                        imgSource: "site-logo",
                                        displayCaption: false,
                                        enableLink: true,
                                        widthRange: 120,
                                        widthUnit: "px",
                                        imgBorderShadowborderStyle: "none",
                                        imgBorderShadowRds_Bottom: "0",
                                        imgBorderShadowRds_Left: "0",
                                        imgBorderShadowRds_Right: "0",
                                        imgBorderShadowRds_Top: "0",
                                        hoverEffect: 'no-effect',
                                    })
                                }
                            >
                                <div className="eb-adv-img-editor-source-icon">
                                    <SiteLogoIcon />
                                </div>
                                <span>Site Logo</span>
                            </div>
                            <div
                                className="eb-adv-img-editor-source-item"
                                onClick={() =>
                                    setAttributes({
                                        imgSource: "featured-img",
                                        displayCaption: false,
                                        enableLink: true,
                                        hoverEffect: 'no-effect',
                                    })
                                }
                            >
                                <div className="eb-adv-img-editor-source-icon">
                                    <FeaturedImgIcon />
                                </div>
                                <span>Featured Image</span>
                            </div>
                        </div>
                    </>
                )}

                {imgSource && (
                    <>
                        <>
                            {imgSource === 'custom' && urls.length == 0 && (
                                <>
                                    {image.url === "" && (
                                        <MediaPlaceholder
                                            onSelect={(image) => {
                                                setAttributes({
                                                    image,
                                                    imageCaption: image.caption,
                                                });
                                            }}
                                            accept="image/*"
                                            allowedTypes={["image"]}
                                            mediaLibraryButton={({ open }) => {
                                                return (
                                                    <Button
                                                        icon={upload}
                                                        variant="primary"
                                                        label={__('Add image from media')}
                                                        showTooltip
                                                        tooltipPosition="top center"
                                                        onClick={() => {
                                                            open();
                                                        }}
                                                    />
                                                );
                                            }}

                                            // multiple
                                            labels={{
                                                title: "Upload Image",
                                                instructions:
                                                    "Drag media file, upload or select image from your library.",
                                            }}
                                        />
                                    )}
                                </>
                            )}

                            {imgSource === 'site-logo' && (
                                <>
                                    {controls}

                                    {!!logoUrl && (
                                        logoImage
                                    )}

                                    {!logoUrl && !!isLoading && (
                                        <Placeholder className="eb-adv-img-site-logo-placeholder">
                                            {ebLoader()}
                                        </Placeholder>
                                    )}

                                    {!logoUrl && !isLoading && (
                                        <MediaPlaceholder
                                            onSelect={onInitialSelectLogo}
                                            accept="image/*"
                                            allowedTypes={["image"]}
                                            // onError={onUploadError}
                                            // placeholder={placeholder}
                                            mediaLibraryButton={({ open }) => {
                                                return (
                                                    <Button
                                                        icon={upload}
                                                        variant="primary"
                                                        label={__('Add a site logo')}
                                                        showTooltip
                                                        tooltipPosition="top center"
                                                        onClick={() => {
                                                            open();
                                                        }}
                                                    />
                                                );
                                            }}

                                            labels={{
                                                title: "Site Logo Upload",
                                                instructions:
                                                    "Drag media file, upload or select image from your library.",
                                            }}
                                        />
                                    )}
                                </>
                            )}
                        </>

                        {((imgSource === 'custom' && urls.length > 0) || (imgSource === 'featured-img' && featuredImage != 0)) && (
                            <>
                                <BlockControls>
                                    <ToolbarGroup>
                                        <ToolbarItem>
                                            {() => (
                                                <MediaUpload
                                                    value={image.id}
                                                    onSelect={(media) => {
                                                        setAttributes({
                                                            image: {
                                                                id: media.id,
                                                                url: media.url,
                                                                alt: media.alt,
                                                            },
                                                        });
                                                    }}
                                                    accept="image/*"
                                                    allowedTypes={["image"]}
                                                    render={({ open }) => (
                                                        <ToolbarButton
                                                            className="components-toolbar__control"
                                                            label={__(
                                                                "Replace Image",
                                                                "essential-blocks"
                                                            )}
                                                            icon={edit}
                                                            onClick={open}
                                                        />
                                                    )}
                                                />
                                            )}
                                        </ToolbarItem>
                                    </ToolbarGroup>
                                </BlockControls>

                                <div
                                    className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`}
                                >
                                    <figure
                                        className={`eb-advanced-image-wrapper ${blockId} img-style-${stylePreset} ${captionStyle} caption-horizontal-${horizontalAlign} caption-vertical-${verticalAlign} ${verticalAlignCap2} ${hoverEffect}`}
                                        data-id={blockId}
                                    >
                                        <div className="image-wrapper">
                                            {imgSource === 'custom' && (
                                                <>
                                                    <img src={urls} alt={image.alt} />

                                                    {(!RichText.isEmpty(imageCaption) ||
                                                        isSelected) &&
                                                        displayCaption &&
                                                        captionStyle != "caption-style-2" && (
                                                            <RichText
                                                                // ref={captionRef}
                                                                tagName="figcaption"
                                                                aria-label={__(
                                                                    "Image Caption Text"
                                                                )}
                                                                placeholder={__("Add Caption")}
                                                                value={imageCaption}
                                                                onChange={(value) =>
                                                                    setAttributes({
                                                                        imageCaption: value,
                                                                    })
                                                                }
                                                                inlineToolbar
                                                                __unstableOnSplitAtEnd={() =>
                                                                    insertBlocksAfter(
                                                                        createBlock(
                                                                            "core/paragraph"
                                                                        )
                                                                    )
                                                                }
                                                            />
                                                        )}
                                                </>)}


                                            {imgSource === 'featured-img' && (
                                                <>
                                                    {!!enableLink ? (
                                                        <a
                                                            href={postPermalink}
                                                            {...disabledClickProps}
                                                        >
                                                            {postFeaturedImage}
                                                        </a>

                                                    ) : (
                                                        postFeaturedImage
                                                    )}
                                                </>
                                            )}

                                        </div>

                                        {imgSource === 'custom' && (
                                            <>
                                                {(!RichText.isEmpty(imageCaption) ||
                                                    isSelected) &&
                                                    displayCaption &&
                                                    captionStyle == "caption-style-2" && (
                                                        <RichText
                                                            // ref={captionRef}
                                                            tagName="figcaption"
                                                            aria-label={__(
                                                                "Image Caption Text"
                                                            )}
                                                            placeholder={__("Add Caption")}
                                                            value={imageCaption}
                                                            onChange={(value) =>
                                                                setAttributes({
                                                                    imageCaption: value,
                                                                })
                                                            }
                                                            inlineToolbar
                                                            __unstableOnSplitAtEnd={() =>
                                                                insertBlocksAfter(
                                                                    createBlock(
                                                                        "core/paragraph"
                                                                    )
                                                                )
                                                            }
                                                        />
                                                    )}
                                            </>
                                        )}
                                    </figure>
                                </div>
                            </>
                        )}

                        {imgSource === 'featured-img' && eb_conditional_localize.editor_type === 'edit-post' && !featuredImage && (
                            <NoticeComponent
                                Icon={AdvancedImageIcon}
                                title={"Advanced Image"}
                                description={postFeaturedImage}
                            />
                        )}
                        {imgSource === 'featured-img' && eb_conditional_localize.editor_type === 'edit-site' && (
                            <div className="feature-image-placeholder">
                                <img src={EssentialBlocksLocalize?.eb_plugins_url + "assets/images/user.jpg"} alt='featured image' />
                            </div>
                        )}
                    </>
                )}
            </BlockProps.Edit>
        </>
    );
}
export default memo(withBlockContext(defaultAttributes)(Edit));
