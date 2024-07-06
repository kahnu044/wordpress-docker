/**
 * WordPress dependencies
 */
import { __, sprintf } from "@wordpress/i18n";
import {
    MediaUpload,
    MediaPlaceholder,
    RichText,
    BlockControls,
    useBlockProps,
} from "@wordpress/block-editor";
import {
    ToolbarGroup,
    ToolbarItem,
    ToolbarButton,
    Placeholder,
    Button
} from "@wordpress/components";
import { edit } from "@wordpress/icons";
import { Fragment, useEffect, useRef } from "@wordpress/element";
import { select, useSelect, useDispatch } from "@wordpress/data";
import { useEntityProp, store as coreStore } from '@wordpress/core-data';
import { crop, upload } from '@wordpress/icons';
import { store as noticesStore } from '@wordpress/notices';
import classnames from "classnames";

/**
 * Internal depencencies
 */
import Inspector from "./inspector";

const {
    BlockProps,
    NoticeComponent
} = window.EBControls;

import Style from "./style";

import { AdvancedImageIcon } from "./icon";

import { SiteLogo, SiteLogoReplaceFlow, getMediaSourceUrlBySizeSlug, disabledClickProps, ebLoader } from "./helpers";

import { CustomIcon, SiteLogoIcon, FeaturedImgIcon } from './helper/icons';

export default function Edit(props) {
    const {
        attributes,
        setAttributes,
        isSelected,
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
        fitStyles,
        autoHeight,
        imgSource,
        shouldSyncIcon,
        rel,
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

    // featured image
    const postId = select("core/editor").getCurrentPostId();
    const postTypeSlug = select("core/editor").getCurrentPostType();

    useEffect(() => {
        setAttributes({ imagePostId: postId });
    }, [postId]);

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

    // image size change
    useEffect(() => {
        // custom
        if (imgSource === 'custom') {
            if (image.sizes && imageSize && imageSize.length > 0) {
                let newWidth;
                let newHeight;
                if (image.sizes[imageSize]) {
                    image.url = image.sizes[imageSize]
                        ? image.sizes[imageSize].url
                        : image.url;

                    newWidth = image.sizes[imageSize].width
                        ? image.sizes[imageSize].width
                        : image.width;
                    newHeight = image.sizes[imageSize].height
                        ? image.sizes[imageSize].height
                        : image.height;
                } else {
                    image.url = image.sizes.full.url;
                    newWidth = image.width;
                    newHeight = image.height;
                }

                image["url"] = image.url;

                setAttributes({
                    image,
                    widthRange:
                        prevImageSize.current === imageSize && widthRange
                            ? widthRange
                            : newWidth
                                ? newWidth
                                : "",
                    widthUnit:
                        prevImageSize.current === imageSize &&
                            attributes["widthUnit"]
                            ? attributes["widthUnit"]
                            : "px",
                    heightRange:
                        prevImageSize.current === imageSize && heightRange
                            ? heightRange
                            : newHeight
                                ? newHeight
                                : "",
                    heightUnit:
                        prevImageSize.current === imageSize &&
                            attributes["heightUnit"]
                            ? attributes["heightUnit"]
                            : "px",
                });
            } else {
                let newWidth = "";
                let newHeight = "";
                if (image && !imageSize) {
                    newWidth = widthRange
                        ? widthRange
                        : image?.width
                            ? image.width
                            : "";
                    newHeight = !autoHeight && image?.height ? image.height : "";
                } else if (oldImageData?.media_details?.sizes) {
                    if (oldImageData.media_details.sizes?.[imageSize]) {
                        image.url = oldImageData.media_details.sizes?.[imageSize]
                            ?.source_url
                            ? oldImageData.media_details.sizes?.[imageSize]
                                ?.source_url
                            : oldImageData.source_url;
                    } else {
                        image.url = oldImageData.source_url;
                    }
                    image["url"] = image.url;

                    newWidth = oldImageData.media_details.sizes?.[imageSize]?.width
                        ? oldImageData.media_details.sizes?.[imageSize]?.width
                        : oldImageData.width;
                    newHeight = oldImageData.media_details.sizes?.[imageSize]
                        ?.height
                        ? oldImageData.media_details.sizes?.[imageSize]?.height
                        : oldImageData.height;
                }
                setAttributes({
                    image,
                    widthRange: newWidth ? newWidth : "",
                    // widthUnit: "px",
                    widthUnit: attributes["widthUnit"]
                        ? attributes["widthUnit"]
                        : "px",
                    heightRange: newHeight ? newHeight : "",
                    // heightUnit: "px",
                    heightUnit: attributes["heightUnit"]
                        ? attributes["heightUnit"]
                        : "px",
                });
            }
        }

        if (imgSource === 'featured-img' && media?.media_details?.sizes) {
            let featuredImgWidth = media.media_details.sizes?.[imageSize]?.width
                ? media.media_details.sizes?.[imageSize]?.width
                : media.width;
            let featuredImgHeight = media.media_details.sizes?.[imageSize]
                ?.height
                ? media.media_details.sizes?.[imageSize]?.height
                : media.height;

            setAttributes({
                widthRange: featuredImgWidth ? featuredImgWidth : "",
                // widthUnit: "px",
                widthUnit: attributes["widthUnit"]
                    ? attributes["widthUnit"]
                    : "px",
                heightRange: featuredImgHeight ? featuredImgHeight : "",
                // heightUnit: "px",
                heightUnit: attributes["heightUnit"]
                    ? attributes["heightUnit"]
                    : "px",
            });

        }

        prevImageSize.current = imageSize;
    }, [imageSize]);

    if (imgSource === 'featured-img' && !media && postFeaturedImage.length == 0) {
        return (
            <div className="eb-loading">
                <img src={`${EssentialBlocksLocalize?.image_url}/ajax-loader.gif`} alt="Loading..." />
            </div>
        )
    };

    return (
        <>
            {isSelected && imgSource && (
                <Inspector
                    attributes={attributes}
                    setAttributes={setAttributes}
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

                        {((imgSource === 'custom' && urls.length > 0) || (imgSource === 'featured-img' && typeof imagePostId == 'number' && featuredImage != 0)) && (
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

                        {imgSource === 'featured-img' && typeof imagePostId == 'number' && !featuredImage && (
                            <NoticeComponent
                                Icon={AdvancedImageIcon}
                                title={"Advanced Image"}
                                description={postFeaturedImage}
                            />
                        )}
                        {imgSource === 'featured-img' && typeof imagePostId == 'string' && (
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
