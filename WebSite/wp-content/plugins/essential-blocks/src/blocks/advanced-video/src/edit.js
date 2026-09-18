/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useEffect, useRef, useState, memo } from "@wordpress/element";
import { SandBox, Spinner } from "@wordpress/components";
import { useSelect } from "@wordpress/data";
import { store as coreStore } from "@wordpress/core-data";
import { applyFilters } from "@wordpress/hooks";

/**
 * Internal depencencies
 */

import Inspector from "./inspector";

import {
    EBDisplayIconEdit,
    BlockProps,
    withBlockContext,
    getEditorRoot
} from "@essential-blocks/controls";

import Style from "./style";
import defaultAttributes from './attributes';
import { resolveProvider } from "./overlay-controller/providers";
import { isDirectMediaUrl as isDirectMedia, isStreamingUrl } from "./media-source";

/**
 * Editor-only play affordance for self-hosted files.
 *
 * A `<video>` with `controls={false}` has no click-to-play of its own — unlike
 * an oEmbed provider, which keeps drawing its centre play button even with
 * `controls=0`. Without this the preview is a still frame nothing can start,
 * so the block reads as broken for self-hosted sources.
 *
 * Deliberately not part of `save()`: this is an authoring affordance, and the
 * frontend has its own (react-player's `light` preview, the Image Overlay
 * click handler, or the native control bar).
 */
const SelfHostedPlayGlyph = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path fill="#fff" d="M8 5.14v13.72a.5.5 0 0 0 .76.43l11.43-6.86a.5.5 0 0 0 0-.86L8.76 4.71A.5.5 0 0 0 8 5.14" />
    </svg>
);

const Edit = (props) => {
    const { attributes, setAttributes, className, clientId, isSelected, name } = props;
    const {
        blockId,
        videoConfig,
        showBar,
        videoURL,
        imageOverlay,
        customPlayIcon,
        customPlayIconURL,
        videoOptions,
        placeholderImage,
        placeholderPlayIconURL,
        stickyPosition,
        classHook,
        lightboxPlayIcon,
        lightboxPlayIconType,
        lightboxPlayIconlib,
        previewImage,
        customPlayIconlib,
        // Pro's Overlay extension merges its attributes into this block via
        // `blocks.registerBlockType`, so this is present only when Pro is
        // active and `undefined` otherwise — which reads as off / unset.
        avOverlayEnabled,
    } = attributes;

    const [preview, setPreview] = useState(imageOverlay && previewImage ? previewImage : false);
    const [videoPlayIcon, setVideoPlayIcon] = useState(customPlayIcon && customPlayIconURL ? <img src={customPlayIconURL} alt="" /> : (customPlayIcon ? <EBDisplayIconEdit icon={customPlayIconlib} /> : null));
    const [overlayClicked, setOverlayClicked] = useState(false);
    const [selfHostedPlaying, setSelfHostedPlaying] = useState(false);
    const playerBoxRef = useRef(null);
    const selfHostedRef = useRef(null);

    // Direct media file — playable in a native <video>. HLS/DASH/FLV manifests
    // need libs the editor does not load, so they get their own classification
    // and their own message rather than a player.
    //
    // Both resolved before the oEmbed lookup below because between them they
    // decide whether that lookup happens at all. The rules live in
    // ./media-source so the editor, the Inspector and the frontend cannot drift
    // apart the way they had.
    const isDirectMediaUrl = isDirectMedia(videoURL);
    const isStreamingMediaUrl = isStreamingUrl(videoURL);

    // Use WordPress oEmbed API to get embed HTML (same approach as core embed block)
    //
    // Every file source — direct media and streaming manifest alike — is
    // deliberately excluded. WordPress does not 404 them: when no oEmbed
    // provider matches, the REST proxy falls back to the classic embed handlers
    // (wp-includes/class-wp-oembed-controller.php), and core registers one for
    // every extension in wp_get_video_extensions() (wp-includes/embed.php).
    // That handler returns the literal shortcode `[video src="…" /]` as its
    // `html`, which is truthy — so the <SandBox> branch below would win and
    // print the shortcode as visible text while the native <video> branch never
    // ran. Skipping the request removes the shortcode at its source and drops a
    // pointless REST round-trip per block.
    //
    // Streaming manifests are excluded for the same reason: `.flv` is in core's
    // list, so asking about one produced exactly that shortcode, and `.m3u8` /
    // `.mpd` only ever cost a round-trip that resolves to nothing.
    const isFileSource = isDirectMediaUrl || isStreamingMediaUrl;

    const { embedPreview, isFetching } = useSelect(
        (select) => {
            if (!videoURL || isFileSource) {
                return { embedPreview: undefined, isFetching: false };
            }
            const { getEmbedPreview, isRequestingEmbedPreview } = select(coreStore);
            return {
                embedPreview: getEmbedPreview(videoURL),
                isFetching: isRequestingEmbedPreview(videoURL),
            };
        },
        [videoURL, isFileSource]
    );

    // Autoplay must be muted — browsers block autoplay-with-sound, so a player
    // started with autoplay but unmuted silently refuses to play.
    const shouldAutoplay = !!(videoConfig.autoplay || overlayClicked);

    // Only when nothing else can start the video: Show Controls gives a control
    // bar, Autoplay starts it unprompted, and playback in progress needs no
    // prompt at all.
    const showsSelfHostedPlay =
        isDirectMediaUrl && !showBar && !shouldAutoplay && !selfHostedPlaying;

    useEffect(() => {
        setSelfHostedPlaying(false);
    }, [videoURL]);

    // `muted` is a property, not an attribute, and React does not reliably apply
    // it on a media element's first mount. An autoplaying preview that is only
    // muted in the JSX can therefore be blocked outright by the browser, so the
    // property is set directly.
    useEffect(() => {
        if (selfHostedRef.current) {
            selfHostedRef.current.muted = videoConfig.muted || shouldAutoplay;
        }
    }, [videoURL, videoConfig.muted, shouldAutoplay, isDirectMediaUrl]);

    // Pro's overlay crops YouTube's chrome out of the iframe (see the Pro
    // extension's overlay/styles.js). Mirrored here so the editor applies the
    // same embed parameters the crop relies on, and so the preview matches the
    // page. Provider resolution is shared with the overlay controller rather
    // than re-derived.
    const provider = resolveProvider(videoURL);
    const cropsYouTubeChrome =
        !!avOverlayEnabled && provider?.id === "youtube" && !showBar;

    // Modify the oEmbed iframe URL to respect block settings (controls, autoplay,
    // loop, muted). `embedHtml` is the oEmbed markup with those params — and, for
    // YouTube, the origin/widget_referrer that avoids Error 153 — applied to the
    // iframe src. It is rendered through <SandBox> below (the shipped renderer).
    const { embedHtml } = (() => {
        let html = embedPreview?.html;

        // Only real markup may reach <SandBox>. WordPress's classic embed
        // handlers return shortcodes rather than HTML (core's video handler
        // returns `[video src="…" /]`), and a shortcode is truthy, so without
        // this it would be rendered as visible text. Skipping the direct-media
        // lookup above already prevents core's case; this covers any other
        // provider or filter that answers the same way.
        if (typeof html === "string" && html.trim().charAt(0) !== "<") {
            return { embedHtml: undefined, embedIframeSrc: '' };
        }

        if (!html) return { embedHtml: html, embedIframeSrc: '' };

        let iframeSrc = '';

        // Modify iframe src to apply video config
        html = html.replace(/(<iframe[^>]+src=["'])([^"']+)(["'])/i, (match, before, src, after) => {
            let url;
            try {
                url = new URL(src);
            } catch (e) {
                return match;
            }

            // Show Controls
            if (!showBar) {
                url.searchParams.set('controls', '0');
            } else {
                url.searchParams.delete('controls');
            }

            // Autoplay
            if (shouldAutoplay) {
                url.searchParams.set('autoplay', '1');
            } else {
                url.searchParams.delete('autoplay');
            }

            // Loop
            if (videoConfig.loop) {
                url.searchParams.set('loop', '1');
            } else {
                url.searchParams.delete('loop');
            }

            // Muted — forced on whenever autoplaying so the browser permits playback.
            if (videoConfig.muted || shouldAutoplay) {
                url.searchParams.set('mute', '1');
                url.searchParams.set('muted', '1');
            } else {
                url.searchParams.delete('mute');
                url.searchParams.delete('muted');
            }

            // YouTube Error 153 ("Video player configuration error") happens when
            // the player can't validate the embedding host. The block-editor canvas
            // is an iframed (srcdoc) document with no URL, so the browser sends an
            // empty Referer and YouTube refuses to configure the player. `origin`
            // alone only satisfies the JS-API handshake; YouTube's own IFrame API
            // additionally passes `widget_referrer` (the embedding page URL) so the
            // host can be verified without the Referer header. We replicate that.
            if (/(?:youtube\.com|youtube-nocookie\.com|youtu\.be)$/i.test(url.hostname)) {
                let origin = '';
                let referrer = '';
                try {
                    origin = window.location.origin && window.location.origin !== 'null'
                        ? window.location.origin
                        : (window.top?.location?.origin || '');
                    referrer = window.location.href && window.location.href.indexOf('about:') !== 0
                        ? window.location.href
                        : (window.top?.location?.href || origin);
                } catch (e) {
                    origin = origin || '';
                    referrer = referrer || origin;
                }
                if (origin) {
                    url.searchParams.set('enablejsapi', '1');
                    url.searchParams.set('origin', origin);
                }
                if (referrer) {
                    url.searchParams.set('widget_referrer', referrer);
                }

                // Behaviour the CSS crop cannot reach: the related-video grid
                // and annotations are drawn inside the video area, and keyboard
                // control of a player the visitor cannot click is misleading.
                // Only applied under the crop, so a normal embed is untouched.
                if (cropsYouTubeChrome) {
                    url.searchParams.set('modestbranding', '1');
                    url.searchParams.set('rel', '0');
                    url.searchParams.set('iv_load_policy', '3');
                    url.searchParams.set('disablekb', '1');
                }
            }

            iframeSrc = url.toString();
            return before + iframeSrc + after;
        });

        return { embedHtml: html, embedIframeSrc: iframeSrc };
    })();

    const enhancedProps = {
        ...props,
        blockPrefix: 'eb-advanced-video',
        style: <Style {...props} />
    };
    // todo
    useEffect(() => {
        const element = getEditorRoot().querySelector(`#block-${clientId} .eb-selector-overlay`);
        if (element) {
            if (isSelected) {
                element.classList.add("selected");
            } else {
                element.classList.remove("selected");
            }
        }
    }, [isSelected]);

    return (
        <>
            {isSelected &&
                <Inspector
                    attributes={attributes}
                    setAttributes={setAttributes}
                    preview={preview}
                    setPreview={setPreview}
                    setVideoPlayIcon={setVideoPlayIcon}
                />
            }
            <BlockProps.Edit {...enhancedProps}>
                <div className="eb-selector-overlay"></div> {/* Only for Editor */}
                <div className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`}>
                    <div className={`eb-advanced-video-wrapper ${blockId} ${videoOptions}`} data-id={blockId}>
                        {videoOptions !== "lightbox" && (
                            <div className="eb-player-wrapper">
                                <div className={`eb-player-option ${videoOptions} ${stickyPosition}`}>
                                    <div
                                        ref={playerBoxRef}
                                        className="eb-react-player eb-sandbox-video"
                                        style={{
                                            width: '100%',
                                            aspectRatio: '16/9',
                                            position: 'relative',
                                            overflow: 'hidden',
                                        }}
                                    >
                                        {isFetching && (
                                            <div
                                                style={{
                                                    position: 'absolute',
                                                    top: '50%',
                                                    left: '50%',
                                                    transform: 'translate(-50%, -50%)',
                                                    zIndex: 1,
                                                }}
                                            >
                                                <Spinner />
                                            </div>
                                        )}
                                        {/*
                                          * oEmbed providers (YouTube, Vimeo, …) — render through <SandBox>,
                                          * the same renderer the shipped release uses (and which works in the
                                          * editor canvas). `embedHtml` already has the block config plus, for
                                          * YouTube, the `origin`/`widget_referrer` params applied to the iframe
                                          * src (see the embedHtml builder above), so this keeps the Error-153
                                          * mitigation without the IFrame-API-in-canvas approach that failed.
                                          */}
                                        {embedHtml && !preview && (
                                            <SandBox
                                                html={embedHtml}
                                                title={__('Video Preview', 'essential-blocks')}
                                                type={`embed eb-sandbox-video ${blockId} wp-embed-aspect-16-9 wp-has-aspect-ratio`}
                                                allowSameOrigin
                                            />
                                        )}
                                        {/* Direct media file (mp4/webm/ogg) — native player so it previews + autoplays. */}
                                        {!embedHtml && !isFetching && !preview && isDirectMediaUrl && (
                                            <>
                                                <video
                                                    ref={selfHostedRef}
                                                    src={videoURL}
                                                    className={`eb-sandbox-video ${blockId}`}
                                                    autoPlay={shouldAutoplay}
                                                    muted={videoConfig.muted || shouldAutoplay}
                                                    loop={videoConfig.loop}
                                                    controls={showBar}
                                                    playsInline
                                                    // Enough to paint the first frame, so the
                                                    // box is never a blank rectangle before play.
                                                    preload="metadata"
                                                    onPlay={() => setSelfHostedPlaying(true)}
                                                    onPause={() => setSelfHostedPlaying(false)}
                                                    style={{
                                                        position: 'absolute',
                                                        inset: 0,
                                                        width: '100%',
                                                        height: '100%',
                                                        objectFit: 'cover',
                                                        border: 0,
                                                    }}
                                                />
                                                {showsSelfHostedPlay && (
                                                    <button
                                                        type="button"
                                                        aria-label={__('Play video', 'essential-blocks')}
                                                        onClick={() => {
                                                            setSelfHostedPlaying(true);
                                                            selfHostedRef.current?.play();
                                                        }}
                                                        style={{
                                                            position: 'absolute',
                                                            top: '50%',
                                                            left: '50%',
                                                            transform: 'translate(-50%, -50%)',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            width: '64px',
                                                            height: '64px',
                                                            padding: 0,
                                                            border: 0,
                                                            borderRadius: '50%',
                                                            // Reads on both light and dark footage.
                                                            background: 'rgba(0, 0, 0, 0.55)',
                                                            cursor: 'pointer',
                                                        }}
                                                    >
                                                        <SelfHostedPlayGlyph />
                                                    </button>
                                                )}
                                            </>
                                        )}
                                        {preview && (
                                            <div
                                                className="react-player__preview"
                                                style={{
                                                    position: 'absolute',
                                                    top: '50%',
                                                    left: '50%',
                                                    transform: 'translate(-50%, -50%)',
                                                    width: "100%",
                                                    height: "100%",
                                                    backgroundSize: "cover",
                                                    backgroundPosition: "center center",
                                                    cursor: "pointer",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    backgroundImage: `url(${preview})`,
                                                }}
                                                onClick={() => {
                                                    setOverlayClicked(true);
                                                    setPreview(false);
                                                }}
                                            >
                                                {videoPlayIcon && videoPlayIcon}
                                            </div>
                                        )}
                                        {/*
                                          * A streaming manifest is a valid source that this
                                          * canvas simply cannot play — hls.js / dash.js /
                                          * flv.js are frontend-only (see AdvancedVideo.php).
                                          * Saying so beats "Enter a valid video URL", which
                                          * told the author their working URL was broken.
                                          */}
                                        {!isDirectMediaUrl && !embedHtml && !isFetching && !preview && (
                                            <div
                                                style={{
                                                    position: 'absolute',
                                                    top: '50%',
                                                    left: '50%',
                                                    transform: 'translate(-50%, -50%)',
                                                    color: '#fff',
                                                    textAlign: 'center',
                                                }}
                                            >
                                                <p>
                                                    {isStreamingMediaUrl
                                                        ? __('Preview not available in the editor', 'essential-blocks')
                                                        : __('Enter a valid video URL', 'essential-blocks')}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {videoOptions === "lightbox" && (
                            <>
                                <div
                                    id="myBtn"
                                    className="player-placeholder"
                                    style={{
                                        backgroundImage: "url( " + placeholderImage + ")",
                                    }}
                                >
                                    {lightboxPlayIcon && (
                                        <>
                                            {lightboxPlayIconType === "icon" && <EBDisplayIconEdit icon={lightboxPlayIconlib} />}
                                            {lightboxPlayIconType === "image" && placeholderPlayIconURL && (
                                                <img src={placeholderPlayIconURL} alt="" />
                                            )}
                                        </>
                                    )}
                                </div>

                                <div id="eb-modal" className="eb-modal-player">
                                    <span className="eb-modal-close">&times;</span>
                                    <div className="eb-player-wrapper">
                                        <div
                                            className={`eb-player-option ${videoOptions}`}
                                            data-url={videoURL}
                                            data-option={videoOptions}
                                            data-loop={videoConfig.loop}
                                            data-muted={videoConfig.muted}
                                            data-playing={videoConfig.autoplay}
                                            data-overlay={imageOverlay}
                                            data-light={preview}
                                            data-customPlayIcon={customPlayIcon}
                                            data-playicon={customPlayIconURL}
                                        ></div>
                                    </div>
                                </div>
                            </>
                        )}
                        {applyFilters("eb_advanced_video_pro_overlay_content_edit", "", attributes, setAttributes)}
                    </div>
                </div>
            </BlockProps.Edit >
        </>
    );
};

export default memo(withBlockContext(defaultAttributes)(Edit))
