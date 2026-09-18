/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
    PanelBody,
    SelectControl,
    ToggleControl,
    BaseControl,
    TextControl,
    PanelRow,
    __experimentalDivider as Divider,
    __experimentalToggleGroupControl as ToggleGroupControl,
    __experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from "@wordpress/components";
import { useEffect } from "@wordpress/element";
import { applyFilters } from "@wordpress/hooks";

/**
 * Hero Background Video — Pro upsell panel.
 *
 * Uses the standard `eb_ie` upgrade pattern shared across all upsells
 * (Transform Animation, Interactive Animation, Conditional Display, etc.) so
 * the look matches every other "Pro feature" notice the user has seen.
 *
 * When Pro IS active, its `addFilter("eb_advanced_video_pro_inspector_general",
 * …)` callback replaces this with the real Hero Overlay controls.
 */
const HeroBgCrown = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
        <path
            fill="#fff"
            d="M1.419 10.489.506 4.558a.495.495 0 0 1 .786-.471l2.843 2.132a.68.68 0 0 0 .973-.167l2.366-3.55a.632.632 0 0 1 1.052 0l2.366 3.55c.217.325.661.4.973.167l2.843-2.132a.495.495 0 0 1 .786.47l-.913 5.932zM13.894 13.78H2.104a.686.686 0 0 1-.686-.687v-1.507h13.163v1.507a.686.686 0 0 1-.687.687"
        />
    </svg>
);

const HeroBackgroundUpgradePro = () => {
    if (EssentialBlocksLocalize?.is_pro_active === "true") return null;

    return (
        <PanelBody
            title={__("Background Video", "essential-blocks")}
            initialOpen={false}
            className="eb-pro-feature-panel"
        >
            <div className="eb_ie">
                <h3>
                    <a
                        target="_blank"
                        href="https://essential-blocks.com/demo/advanced-video/"
                        rel="noopener noreferrer"
                    >
                        {__("Background Video", "essential-blocks")}
                        <span className="dashicons dashicons-external"></span>
                    </a>
                </h3>
                <p>
                    {__(
                        "Layer headlines, CTAs and a tinted overlay on top of a background video for a full marketing hero.",
                        "essential-blocks"
                    )}
                </p>
                <a
                    className="eb_upgrade_button"
                    target="_blank"
                    href={EssentialBlocksLocalize?.upgrade_pro_url}
                    rel="noopener noreferrer"
                >
                    <HeroBgCrown />
                    {__("Upgrade to PRO", "essential-blocks")}
                </a>
            </div>
        </PanelBody>
    );
};

/**
 * Internal depencencies
 */
import {
    WRAPPER_BG,
    WRAPPER_MARGIN,
    WRAPPER_PADDING,
    WRAPPER_BORDER_SHADOW,
    VIDEO_WIDTH,
    SIZE_UNIT_TYPES,
    VIDEO_BORDER_SHADOW,
    OPTIONS,
    PLAY_ICON_WIDTH,
    LIGHTBOX_WIDTH,
    LIGHTBOX_HEIGHT,
    LIGHTBOX_BORDER_SHADOW,
    CLOSE_ICON_WIDTH,
    STICKY_VIDEO_HEIGHT,
    STICKY_VIDEO_WIDTH,
    PLACEHOLDER_IMAGE_WIDTH,
    PLACEHOLDER_IMAGE_HEIGHT,
    PLACEHOLDER_PLAY_ICON_WIDTH,
    LIGHTBOX_UNIT_TYPES,
    STICKY_POSITION,
    ALIGNMENT,
    ICON_TYPE,
    stickyVisibility,
    STICKY_VISIBILITY,
    STICKY_BORDER_RADIUS,
} from "./constants";

import {
    BorderShadowControl,
    ImageComponent,
    ResponsiveRangeController,
    ColorControl,
    ResponsiveSelectController,
    EBIconPicker,
    InspectorPanel,
    EBDisplayIconEdit,
    EBTextControl,
} from "@essential-blocks/controls";

import { isDirectMediaUrl, isStreamingUrl } from "./media-source";

function Inspector(props) {
    const { attributes, setAttributes, preview, setPreview, setVideoPlayIcon } =
        props;
    const {
        resOption,
        showBar,
        videoConfig,
        videoOptions,
        imageOverlay,
        videoURL,
        previewImage,
        previewImageId,
        customPlayIcon,
        lightboxPlayIcon,
        customPlayIconId,
        customPlayIconURL,
        lightboxBGColor,
        closeIconColor,
        closeIconBgColor,
        placeholderImage,
        placeholderImageId,
        placeholderPlayIconURL,
        placeholderPlayIconId,
        stickyPosition,
        videoAlignment,
        customPlayIconlib,
        placeholderCustomPlayIconType,
        customPlayIconlibColor,
        lightboxPlayIconType,
        lightboxPlayIconlib,
        lightboxPlayIconlibColor,
        showDownload,
        stickyBGColor,
    } = attributes;

    useEffect(() => {
        if (videoOptions === "lightbox") {
            setAttributes({
                imageOverlay: false,
            });
        }
    }, [videoOptions]);

    useEffect(() => {
        if (imageOverlay && previewImage) {
            setPreview(previewImage);
        } else {
            setPreview(false);
        }
    }, [imageOverlay, previewImage]);

    useEffect(() => {
        if (customPlayIcon) {
            if (placeholderCustomPlayIconType === "image") {
                setVideoPlayIcon(<img src={customPlayIconURL} />);
            } else {
                setVideoPlayIcon(
                    <EBDisplayIconEdit icon={customPlayIconlib} />,
                );
            }
        } else {
            setVideoPlayIcon(null);
        }
    }, [
        customPlayIcon,
        customPlayIconURL,
        placeholderCustomPlayIconType,
        customPlayIconlib,
    ]);

    // Is the source a file rather than an embed? Only a file has a download
    // affordance to suppress, so this gates the Show Download toggle below.
    //
    // Previously read the extension as `videoURL.split(".").pop()` against a
    // three-entry list, which failed for every URL carrying a query string or a
    // fragment, for `.ogv` / `.mov`, and for any uppercase extension — the
    // toggle silently disappeared for URLs the player handled fine. The shared
    // classifier has none of those holes.
    const selfhostVideo = isDirectMediaUrl(videoURL) || isStreamingUrl(videoURL);

    return (
        <InspectorPanel
            advancedControlProps={{
                marginPrefix: WRAPPER_MARGIN,
                paddingPrefix: WRAPPER_PADDING,
                backgroundPrefix: WRAPPER_BG,
                borderPrefix: WRAPPER_BORDER_SHADOW,
                hasMargin: true,
            }}
        >
            <InspectorPanel.General>
                <>
                    <PanelBody
                        title={__("General", "essential-blocks")}
                        initialOpen={true}
                    >
                        <EBTextControl
                            label={__("URL", "essential-blocks")}
                            fieldType="url"
                            value={videoURL}
                            onChange={(videoURL) => setAttributes({ videoURL })}
                            placeholder="https://example.com/video.mp4"
                            help={__(
                                "Enter a valid video URL with security filtering and validation.",
                                "essential-blocks",
                            )}
                            showValidation={true}
                            enableSecurity={true}
                        />
                        <Divider />
                        <PanelRow>
                            {" "}
                            {__("Video Options", "essential-blocks")}{" "}
                        </PanelRow>

                        {videoOptions != "lightbox" && (
                            <>
                                <ToggleControl
                                    label={__("Autoplay", "essential-blocks")}
                                    checked={videoConfig.autoplay}
                                    onChange={(autoplay) => {
                                        const next = {
                                            videoConfig: {
                                                ...videoConfig,
                                                autoplay: autoplay,
                                                muted: autoplay && !preview,
                                            },
                                        };

                                        // Switching Autoplay off while the Pro
                                        // overlay is on leaves a video nobody
                                        // can start, so the overlay's media
                                        // controls come on with it. Only on this
                                        // transition — a later manual switch off
                                        // is never undone. `avOverlayEnabled` is
                                        // undefined without Pro, so this never
                                        // fires there. The Overlay toggle in
                                        // Pro's inspector carries the mirror.
                                        if (
                                            !autoplay &&
                                            attributes.avOverlayEnabled === true &&
                                            attributes.avOverlayShowMediaControls !== true
                                        ) {
                                            next.avOverlayShowMediaControls = true;
                                        }

                                        setAttributes(next);
                                    }}
                                    __nextHasNoMarginBottom
                                />
                                {videoConfig.autoplay && (
                                    <PanelRow>
                                        <em>
                                            Audio will be muted by default if
                                            autoplay is enabled.
                                        </em>
                                    </PanelRow>
                                )}

                                <ToggleControl
                                    label={__("Mute", "essential-blocks")}
                                    checked={videoConfig.muted}
                                    onChange={(muted) =>
                                        setAttributes({
                                            videoConfig: {
                                                ...videoConfig,
                                                muted: muted,
                                            },
                                        })
                                    }
                                    __nextHasNoMarginBottom
                                />
                            </>
                        )}

                        <ToggleControl
                            label={__("Loop", "essential-blocks")}
                            checked={videoConfig.loop}
                            onChange={(loop) =>
                                setAttributes({
                                    videoConfig: {
                                        ...videoConfig,
                                        loop: loop,
                                    },
                                })
                            }
                            __nextHasNoMarginBottom
                        />
                        <ToggleControl
                            label={__("Show Controls", "essential-blocks")}
                            checked={showBar}
                            onChange={(showBar) => {
                                const url = videoURL;
                                setAttributes({
                                    showBar,
                                    videoURL: "",
                                });
                                setTimeout(() => {
                                    setAttributes({
                                        videoURL: url,
                                    });
                                }, 100);
                            }}
                            __nextHasNoMarginBottom
                        />

                        {showBar && selfhostVideo && (
                            <ToggleControl
                                label={__("Show Download", "essential-blocks")}
                                checked={showDownload}
                                onChange={(showDownload) =>
                                    setAttributes({ showDownload })
                                }
                                __nextHasNoMarginBottom
                            />
                        )}

                        {videoOptions != "lightbox" && (
                            <>
                                <Divider />

                                <ToggleControl
                                    label={__(
                                        "Image Overlay",
                                        "essential-blocks",
                                    )}
                                    checked={imageOverlay}
                                    onChange={(imageOverlay) =>
                                        setAttributes({
                                            imageOverlay,
                                        })
                                    }
                                    __nextHasNoMarginBottom
                                />

                                {imageOverlay && (
                                    <>
                                        <ImageComponent.GeneralTab
                                            onSelect={({ id, url }) =>
                                                setAttributes({
                                                    previewImage: url,
                                                    previewImageId: id,
                                                })
                                            }
                                            onRemove={() =>
                                                setAttributes({
                                                    previewImage: "",
                                                    previewImageId: null,
                                                })
                                            }
                                            value={previewImage}
                                            hasTag={false}
                                            hasCaption={false}
                                            hasStyle={false}
                                            hasLink={false}
                                            showInPanel={false}
                                        />

                                        <ToggleControl
                                            label={__(
                                                "Custom Play Icon",
                                                "essential-blocks",
                                            )}
                                            checked={customPlayIcon}
                                            onChange={(customPlayIcon) =>
                                                setAttributes({
                                                    customPlayIcon,
                                                })
                                            }
                                            __nextHasNoMarginBottom
                                        />

                                        {customPlayIcon && (
                                            <>
                                                <ToggleGroupControl
                                                    label={__(
                                                        "Icon Type",
                                                        "essential-blocks",
                                                    )}

                                                    value={placeholderCustomPlayIconType}
                                                    onChange={(value) =>
                                                        setAttributes({
                                                            placeholderCustomPlayIconType: value,
                                                        })
                                                    }
                                                    isBlock
                                                    __next40pxDefaultSize
                                                    __nextHasNoMarginBottom
                                                >
                                                    {ICON_TYPE.map(
                                                        (item) => (
                                                            <ToggleGroupControlOption
                                                                key={item.value}
                                                                value={item.value}
                                                                label={item.label}
                                                            />
                                                        ),
                                                    )}
                                                </ToggleGroupControl>

                                                {placeholderCustomPlayIconType ===
                                                    "icon" && (
                                                        <BaseControl __nextHasNoMarginBottom>
                                                            <EBIconPicker
                                                                value={
                                                                    customPlayIconlib
                                                                }
                                                                attributeName={
                                                                    "customPlayIconlib"
                                                                }
                                                            />
                                                        </BaseControl>
                                                    )}
                                                {placeholderCustomPlayIconType ===
                                                    "image" && (
                                                        <ImageComponent.GeneralTab
                                                            onSelect={({
                                                                id,
                                                                url,
                                                            }) =>
                                                                setAttributes({
                                                                    customPlayIconURL:
                                                                        url,
                                                                    customPlayIconId:
                                                                        id,
                                                                })
                                                            }
                                                            onRemove={() =>
                                                                setAttributes({
                                                                    customPlayIconURL: "",
                                                                    customPlayIconId: null,
                                                                })
                                                            }
                                                            value={
                                                                customPlayIconURL
                                                            }
                                                            hasTag={false}
                                                            hasCaption={false}
                                                            hasStyle={false}
                                                            hasLink={false}
                                                            showInPanel={false}
                                                        />
                                                    )}
                                            </>
                                        )}
                                    </>
                                )}
                            </>
                        )}

                        <Divider />

                        <SelectControl
                            label={__("Additional Option", "essential-blocks")}
                            value={videoOptions}
                            options={OPTIONS}
                            onChange={(videoOptions) =>
                                setAttributes({ videoOptions })
                            }
                            __next40pxDefaultSize
                            __nextHasNoMarginBottom
                        />

                        {videoOptions == "eb-sticky" && (
                            <>
                                <ToggleGroupControl
                                    label={__(
                                        "Sticky Position",
                                        "essential-blocks",
                                    )}

                                    value={stickyPosition}
                                    onChange={(value) =>
                                        setAttributes({
                                            stickyPosition: value,
                                        })
                                    }
                                    isBlock
                                    __next40pxDefaultSize
                                    __nextHasNoMarginBottom
                                >
                                    {STICKY_POSITION.map((item) => (
                                        <ToggleGroupControlOption
                                            key={item.value}
                                            value={item.value}
                                            label={item.label}
                                        />
                                    ))}
                                </ToggleGroupControl>
                                <ResponsiveSelectController
                                    baseLabel={__(
                                        "Visibility",
                                        "essential-blocks",
                                    )}
                                    controlName={stickyVisibility}
                                    options={STICKY_VISIBILITY}
                                    resOption={resOption}
                                />
                            </>
                        )}

                        {videoOptions == "lightbox" && (
                            <>
                                <PanelRow>Placeholder Image</PanelRow>
                                <ImageComponent.GeneralTab
                                    onSelect={({ id, url }) =>
                                        setAttributes({
                                            placeholderImage: url,
                                            placeholderImageId: id,
                                        })
                                    }
                                    onRemove={() =>
                                        setAttributes({
                                            placeholderImage: "",
                                            placeholderImageId: null,
                                        })
                                    }
                                    value={placeholderImage}
                                    hasTag={false}
                                    hasCaption={false}
                                    hasStyle={false}
                                    hasLink={false}
                                    showInPanel={false}
                                />

                                <PanelRow>Play Icon</PanelRow>
                                <ToggleControl
                                    label={__(
                                        "Show Play Icon",
                                        "essential-blocks",
                                    )}
                                    checked={lightboxPlayIcon}
                                    onChange={(lightboxPlayIcon) =>
                                        setAttributes({
                                            lightboxPlayIcon,
                                        })
                                    }
                                    __nextHasNoMarginBottom
                                />

                                {lightboxPlayIcon && (
                                    <>
                                        <ToggleGroupControl
                                            label={__(
                                                "Icon Type",
                                                "essential-blocks",
                                            )}

                                            value={lightboxPlayIconType}
                                            onChange={(value) =>
                                                setAttributes({
                                                    lightboxPlayIconType: value,
                                                })
                                            }
                                            isBlock
                                            __next40pxDefaultSize
                                            __nextHasNoMarginBottom
                                        >
                                            {ICON_TYPE.map((item) => (
                                                <ToggleGroupControlOption
                                                    key={item.value}
                                                    value={item.value}
                                                    label={item.label}
                                                />
                                            ))}
                                        </ToggleGroupControl>

                                        {lightboxPlayIconType === "icon" && (
                                            <BaseControl __nextHasNoMarginBottom>
                                                <EBIconPicker
                                                    value={lightboxPlayIconlib}
                                                    attributeName={
                                                        "lightboxPlayIconlib"
                                                    }
                                                />
                                            </BaseControl>
                                        )}

                                        {lightboxPlayIconType === "image" && (
                                            <ImageComponent.GeneralTab
                                                onSelect={({ id, url }) =>
                                                    setAttributes({
                                                        placeholderPlayIconURL:
                                                            url,
                                                        placeholderPlayIconId:
                                                            id,
                                                    })
                                                }
                                                onRemove={() =>
                                                    setAttributes({
                                                        placeholderPlayIconURL: "",
                                                        placeholderPlayIconId: null,
                                                    })
                                                }
                                                value={placeholderPlayIconURL}
                                                hasTag={false}
                                                hasCaption={false}
                                                hasStyle={false}
                                                hasLink={false}
                                                showInPanel={false}
                                            />
                                        )}
                                    </>
                                )}
                            </>
                        )}
                    </PanelBody>
                    {applyFilters(
                        "eb_advanced_video_pro_inspector_general",
                        <HeroBackgroundUpgradePro />,
                        attributes,
                        setAttributes
                    )}
                </>
            </InspectorPanel.General>
            <InspectorPanel.Style>
                <>
                    <PanelBody title={__("Video Styles", "essential-blocks")}>
                        {videoOptions != "lightbox" && (
                            <>
                                <ResponsiveRangeController
                                    baseLabel={__("Width", "essential-blocks")}
                                    controlName={VIDEO_WIDTH}
                                    min={1}
                                    max={1000}
                                    step={1}
                                    units={SIZE_UNIT_TYPES}
                                />
                                <ToggleGroupControl
                                    label={__("Alignment", "essential-blocks")}

                                    value={videoAlignment}
                                    onChange={(value) =>
                                        setAttributes({
                                            videoAlignment: value,
                                        })
                                    }
                                    isBlock
                                    __next40pxDefaultSize
                                    __nextHasNoMarginBottom
                                >
                                    {ALIGNMENT.map((item) => (
                                        <ToggleGroupControlOption
                                            key={item.value}
                                            value={item.value}
                                            label={item.label}
                                        />
                                    ))}
                                </ToggleGroupControl>
                            </>
                        )}

                        {videoOptions == "lightbox" && (
                            <>
                                {lightboxPlayIcon && (
                                    <>
                                        <PanelRow>Play Icon</PanelRow>
                                        {lightboxPlayIconType == "icon" && (
                                            <>
                                                <ColorControl
                                                    label={__(
                                                        "Icon Color",
                                                        "essential-blocks",
                                                    )}
                                                    color={
                                                        lightboxPlayIconlibColor
                                                    }
                                                    attributeName={
                                                        "lightboxPlayIconlibColor"
                                                    }
                                                />
                                            </>
                                        )}
                                        <ResponsiveRangeController
                                            baseLabel={__(
                                                "Size",
                                                "essential-blocks",
                                            )}
                                            controlName={
                                                PLACEHOLDER_PLAY_ICON_WIDTH
                                            }
                                            min={1}
                                            max={400}
                                            step={1}
                                            units={SIZE_UNIT_TYPES}
                                        />
                                    </>
                                )}

                                <PanelRow>Placeholder Image</PanelRow>
                                <ResponsiveRangeController
                                    baseLabel={__("Width", "essential-blocks")}
                                    controlName={PLACEHOLDER_IMAGE_WIDTH}
                                    min={1}
                                    max={1000}
                                    step={1}
                                    units={SIZE_UNIT_TYPES}
                                />
                                <ResponsiveRangeController
                                    baseLabel={__("Height", "essential-blocks")}
                                    controlName={PLACEHOLDER_IMAGE_HEIGHT}
                                    min={1}
                                    max={1000}
                                    step={1}
                                    units={SIZE_UNIT_TYPES}
                                />

                                <Divider />
                            </>
                        )}

                        <BaseControl __nextHasNoMarginBottom>
                            <h3 className="eb-control-title">
                                {__("Border", "essential-blocks")}
                            </h3>
                        </BaseControl>
                        <BorderShadowControl
                            controlName={VIDEO_BORDER_SHADOW}
                        // noShadow
                        // noBorder
                        />
                    </PanelBody>

                    {imageOverlay && customPlayIcon && (
                        <PanelBody
                            title={__("Image Overlay", "essential-blocks")}
                            initialOpen={false}
                        >
                            <ResponsiveRangeController
                                baseLabel={__(
                                    "Play Icon Size",
                                    "essential-blocks",
                                )}
                                controlName={PLAY_ICON_WIDTH}
                                min={1}
                                max={400}
                                step={1}
                                units={SIZE_UNIT_TYPES}
                            />

                            {placeholderCustomPlayIconType == "icon" && (
                                <>
                                    <ColorControl
                                        label={__(
                                            "Icon Color",
                                            "essential-blocks",
                                        )}
                                        color={customPlayIconlibColor}
                                        attributeName={"customPlayIconlibColor"}
                                    />
                                </>
                            )}
                        </PanelBody>
                    )}
                    {videoOptions == "lightbox" && (
                        <PanelBody title={__("Lightbox", "essential-blocks")}>
                            <PanelRow>Lightbox</PanelRow>
                            <ColorControl
                                label={__("Overlay Color", "essential-blocks")}
                                color={lightboxBGColor}
                                attributeName={"lightboxBGColor"}
                            />

                            <ResponsiveRangeController
                                baseLabel={__(
                                    "Content Width",
                                    "essential-blocks",
                                )}
                                controlName={LIGHTBOX_WIDTH}
                                min={1}
                                max={1000}
                                step={1}
                                units={SIZE_UNIT_TYPES}
                            />
                            <ResponsiveRangeController
                                baseLabel={__(
                                    "Content Height",
                                    "essential-blocks",
                                )}
                                controlName={LIGHTBOX_HEIGHT}
                                min={1}
                                max={1000}
                                step={1}
                                units={LIGHTBOX_UNIT_TYPES}
                            />
                            <BorderShadowControl
                                controlName={LIGHTBOX_BORDER_SHADOW}
                                noShadow
                                noBdrHover
                            // noBorder
                            />

                            <PanelRow>Close Icon</PanelRow>
                            <ColorControl
                                label={__(
                                    "Background Color",
                                    "essential-blocks",
                                )}
                                color={closeIconBgColor}
                                attributeName={"closeIconBgColor"}
                            />
                            <ColorControl
                                label={__("Color", "essential-blocks")}
                                color={closeIconColor}
                                attributeName={"closeIconColor"}
                            />

                            <ResponsiveRangeController
                                baseLabel={__("Size (PX)", "essential-blocks")}
                                controlName={CLOSE_ICON_WIDTH}
                                min={1}
                                max={100}
                                step={1}
                                noUnits
                            />
                        </PanelBody>
                    )}
                    {videoOptions == "eb-sticky" && (
                        <PanelBody title={__("Sticky", "essential-blocks")} initialOpen={false}>
                            <ColorControl
                                label={__("Background Color", "essential-blocks")}
                                color={stickyBGColor}
                                attributeName={'stickyBGColor'}
                            />
                            <ResponsiveRangeController
                                baseLabel={__("Width", "essential-blocks")}
                                controlName={STICKY_VIDEO_WIDTH}
                                min={1}
                                max={1000}
                                step={1}
                                units={SIZE_UNIT_TYPES}
                            />
                            <ResponsiveRangeController
                                baseLabel={__("Height", "essential-blocks")}
                                controlName={STICKY_VIDEO_HEIGHT}
                                min={1}
                                max={1000}
                                step={1}
                                units={SIZE_UNIT_TYPES}
                            />
                            <ResponsiveRangeController
                                baseLabel={__("Border Radius", "essential-blocks")}
                                controlName={STICKY_BORDER_RADIUS}
                                min={0}
                                max={100}
                                step={1}
                                units={SIZE_UNIT_TYPES}
                            />

                            <PanelRow>Close Icon</PanelRow>
                            <ColorControl
                                label={__("Color", "essential-blocks")}
                                color={closeIconColor}
                                attributeName={"closeIconColor"}
                            />
                            <ResponsiveRangeController
                                baseLabel={__("Size", "essential-blocks")}
                                controlName={CLOSE_ICON_WIDTH}
                                min={1}
                                max={1000}
                                step={1}
                                units={SIZE_UNIT_TYPES}
                            />
                        </PanelBody>
                    )}
                    {applyFilters("eb_advanced_video_pro_inspector_style", "", attributes, setAttributes)}
                </>
            </InspectorPanel.Style>
        </InspectorPanel>
    );
}

export default Inspector;
