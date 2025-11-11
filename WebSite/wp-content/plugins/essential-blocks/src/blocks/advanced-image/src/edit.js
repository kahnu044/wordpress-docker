/**
 * WordPress dependencies
 */
import { __, sprintf } from "@wordpress/i18n";
import { MediaPlaceholder, BlockControls } from "@wordpress/block-editor";
import { Placeholder, Button } from "@wordpress/components";
import { memo, useEffect, useRef } from "@wordpress/element";
import { useSelect, useDispatch } from "@wordpress/data";
import { useEntityProp, store as coreStore } from "@wordpress/core-data";
import { upload } from "@wordpress/icons";
import { store as noticesStore } from "@wordpress/notices";
import classnames from "classnames";

/**
 * Internal depencencies
 */
import Inspector from "./inspector";
import defaultAttributes from "./attributes";
import Style from "./style";

import {
    BlockProps,
    NoticeComponent,
    withBlockContext,
    ImageComponent,
    EBMediaPlaceholder,
} from "@essential-blocks/controls";

import {
    SiteLogo,
    SiteLogoReplaceFlow,
    getMediaSourceUrlBySizeSlug,
    disabledClickProps,
    ebLoader,
} from "./helpers";

import {
    CustomIcon,
    SiteLogoIcon,
    FeaturedImgIcon,
    AdvancedImageIcon,
} from "./helper/icons";

const Edit = (props) => {
    const { attributes, setAttributes, isSelected, context } = props;
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
        imgSource,
        shouldSyncIcon,
        enableLink,
        imageUrl,
    } = attributes;

    const enhancedProps = {
        ...props,
        blockPrefix: "eb-advanced-image",
        style: <Style {...props} />,
    };

    let urls = image.url;

    // this useEffect is for creating a unique id for each block's unique className by a random unique number
    useEffect(() => {
        // for old version support
        if (imgSource === undefined && image.url.length > 0) {
            setAttributes({ imgSource: "custom" });
        }
        if (imageUrl === undefined && image.url.length > 0) {
            setAttributes({ imageUrl: image.url });
        }
    }, []);

    // Get post data from Loop Builder context
    const loopPostId = context?.["essential-blocks/postId"];
    const loopPostType = context?.["essential-blocks/postType"];

    // Check if block is inside Loop Builder context
    const isInLoopBuilder = Boolean(
        context &&
        // Primary check: explicit isLoopBuilder flag
        (context["essential-blocks/isLoopBuilder"] === true ||
            // Secondary check: presence of loop context values (even if null initially)
            (context.hasOwnProperty("essential-blocks/postId") &&
                context.hasOwnProperty("essential-blocks/postType"))),
    );

    // Effect to handle Loop Builder context initialization
    useEffect(() => {
        if (isInLoopBuilder) {
            // Set source to featured-img and enable link
            setAttributes({
                imgSource: "featured-img",
                displayCaption: false,
                enableLink: true,
                hoverEffect: "no-effect",
            });
        }
    }, [isInLoopBuilder, loopPostId, loopPostType]);

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
        const _canUserEdit = canUser("update", "settings");
        const siteSettings = _canUserEdit
            ? getEditedEntityRecord("root", "site")
            : undefined;
        const siteData = getEntityRecord("root", "__unstableBase");
        const _siteLogoId = _canUserEdit
            ? siteSettings?.site_logo
            : siteData?.site_logo;
        const _siteIconId = siteSettings?.site_icon;
        const mediaItem =
            _siteLogoId &&
            select(coreStore).getMedia(_siteLogoId, {
                context: "view",
            });
        const _isRequestingMediaItem =
            _siteLogoId &&
            !select(coreStore).hasFinishedResolution("getMedia", [
                _siteLogoId,
                { context: "view" },
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

        editEntityRecord("root", "site", undefined, {
            site_logo: newValue,
        });
    };

    const setIcon = (newValue) =>
        // The new value needs to be `null` to reset the Site Icon.
        editEntityRecord("root", "site", undefined, {
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
        createErrorNotice(message, { type: "snackbar" });
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

    // Use loop context values when in Loop Builder, otherwise use regular context
    const effectivePostId = isInLoopBuilder
        ? loopPostId || context["postID"]
        : context["postID"];
    const effectivePostType = isInLoopBuilder
        ? loopPostType || context["postType"]
        : context["postType"];

    const [storedFeaturedImage, setFeaturedImage] = useEntityProp(
        "postType",
        effectivePostType,
        "featured_media",
        effectivePostId,
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
                        context: "view",
                    }),
                postType: effectivePostType && getPostType(effectivePostType),
                postPermalink: getEditedEntityRecord(
                    "postType",
                    effectivePostType,
                    effectivePostId,
                )?.link,
            };
        },
        [featuredImage, effectivePostType, effectivePostId],
    );

    const mediaUrl = getMediaSourceUrlBySizeSlug(media, imageSize);

    const featuredPlaceholder = (content) => {
        return (
            <Placeholder
                className={classnames("block-editor-media-placeholder")}
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
                src={mediaUrl}
                alt={
                    media?.alt_text
                        ? sprintf(
                            // translators: %s: The image's alt text.
                            __("Featured image: %s"),
                            media?.alt_text,
                        )
                        : __("Featured image")
                }
            // style={imageStyles}
            />
        );
    };

    let postFeaturedImage;

    if (!featuredImage) {
        postFeaturedImage = __(
            "Seems like you haven't added a Featured Image for this post. Please make sure to add a Featured Image and try again.",
            "essential-blocks",
        );
    } else {
        // We have a Featured image so show a Placeholder if is loading.
        postFeaturedImage = !media
            ? featuredPlaceholder()
            : featuredImageHtml(mediaUrl, media);
    }

    if (
        imgSource === "featured-img" &&
        !media &&
        postFeaturedImage.length == 0
    ) {
        return (
            <div className="eb-loading">
                <img
                    src={`${EssentialBlocksLocalize?.image_url}/ajax-loader.gif`}
                    alt="Loading..."
                />
            </div>
        );
    }

    const classes = `img-style-${stylePreset}
    ${captionStyle}
    caption-horizontal-${horizontalAlign}
    caption-vertical-${verticalAlign}
    ${verticalAlignCap2}
    ${hoverEffect}`.replace(/\s+/g, " ").trim();

    return (
        <>
            {isSelected && imgSource && (
                <Inspector
                    attributes={attributes}
                    setAttributes={setAttributes}
                    media={media}
                    prevImageSize={prevImageSize}
                    oldImageData={oldImageData}
                    context={context}
                />
            )}

            <BlockProps.Edit {...enhancedProps}>
                {!imgSource && !isInLoopBuilder && (
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
                                        hoverEffect: "no-effect",
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
                                        hoverEffect: "no-effect",
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
                        {imgSource === "custom" &&
                            (!imageUrl || imageUrl === "") && (
                                <>
                                    <ImageComponent.Upload
                                        labels={{
                                            title: __(
                                                "Advanced Image",
                                                "essential-blocks",
                                            ),
                                            instructions: __(
                                                "Drag media file, upload or select image from your library.",
                                                "essential-blocks",
                                            ),
                                        }}
                                        icon={AdvancedImageIcon}
                                    />
                                </>
                            )}

                        {imgSource === "site-logo" && (
                            <>
                                {controls}

                                {!!logoUrl && logoImage}

                                {!logoUrl && !!isLoading && (
                                    <Placeholder className="eb-adv-img-site-logo-placeholder">
                                        {ebLoader()}
                                    </Placeholder>
                                )}

                                {!logoUrl && !isLoading && (
                                    <>
                                        <EBMediaPlaceholder
                                            icon={AdvancedImageIcon}
                                            onSelect={onInitialSelectLogo}
                                            accept="image/*"
                                            allowedTypes={["image"]}
                                            labels={{
                                                title: __("Site Logo", "essential-blocks"),
                                                instructions: __(
                                                    "Drag media file, upload or select image from your library.",
                                                    "essential-blocks"
                                                ),
                                            }}
                                        />
                                    </>
                                )}
                            </>
                        )}

                        {((imgSource === "custom" &&
                            imageUrl &&
                            typeof imageUrl !== "undefined" &&
                            imageUrl !== "") ||
                            (imgSource === "featured-img" &&
                                featuredImage != 0)) && (
                                <>
                                    <div
                                        className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`}
                                    >
                                        <figure
                                            className={`eb-advanced-image-wrapper ${blockId}${imgSource !== "custom"
                                                ? " " + classes
                                                : ""
                                                } ${imgSource === "custom" ? hoverEffect : ''}`}
                                            data-id={blockId}
                                        >
                                            {imgSource === "custom" && (
                                                <ImageComponent />
                                            )}
                                            {imgSource === "featured-img" &&
                                                eb_conditional_localize.editor_type !==
                                                "edit-site" && (
                                                    <>
                                                        <div className="image-wrapper">
                                                            <>
                                                                {!!enableLink ? (
                                                                    <a
                                                                        href={
                                                                            postPermalink
                                                                        }
                                                                        {...disabledClickProps}
                                                                    >
                                                                        {
                                                                            postFeaturedImage
                                                                        }
                                                                    </a>
                                                                ) : (
                                                                    postFeaturedImage
                                                                )}
                                                            </>
                                                        </div>
                                                    </>
                                                )}
                                        </figure>
                                    </div>
                                </>
                            )}

                        {imgSource === "featured-img" &&
                            eb_conditional_localize.editor_type ===
                            "edit-post" &&
                            !featuredImage && (
                                <>
                                    {isInLoopBuilder && EssentialBlocksLocalize?.placeholder_image ? (
                                        <div className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`}>
                                            <figure className={`eb-advanced-image-wrapper ${blockId}`}>
                                                <div className="image-wrapper">
                                                    <img
                                                        src={EssentialBlocksLocalize.placeholder_image}
                                                        alt={__("Placeholder image for Loop Builder", "essential-blocks")}
                                                    />
                                                </div>
                                            </figure>
                                        </div>
                                    ) : (
                                        <NoticeComponent
                                            Icon={AdvancedImageIcon}
                                            title={"Advanced Image"}
                                            description={postFeaturedImage}
                                        />
                                    )}
                                </>
                            )}
                        {imgSource === "featured-img" &&
                            eb_conditional_localize.editor_type ===
                            "edit-site" && (
                                <div className="feature-image-placeholder">
                                    <img
                                        src={
                                            EssentialBlocksLocalize?.eb_plugins_url +
                                            "assets/images/user.jpg"
                                        }
                                        alt="featured image"
                                    />
                                </div>
                            )}
                    </>
                )}
            </BlockProps.Edit>
        </>
    );
};
export default memo(withBlockContext(defaultAttributes)(Edit));
