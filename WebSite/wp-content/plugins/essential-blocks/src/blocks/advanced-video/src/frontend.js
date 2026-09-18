import { createRoot } from "@wordpress/element";
import ReactPlayer from "react-player";

/*
 * Not branched on here — react-player classifies the URL itself at mount, so
 * the frontend needs no test of its own. Imported so that any future branch on
 * this file takes the same definition the editor and the Inspector use; the
 * bug this module exists to fix was three surfaces each deciding for
 * themselves. The patterns in ./media-source mirror react-player's, so a check
 * added here will agree with what the player actually does.
 */
// eslint-disable-next-line no-unused-vars
import { isDirectMediaUrl, isStreamingUrl } from "./media-source";

/**
 * Is the Pro overlay cropping YouTube's chrome on this player?
 *
 * `avOverlayEnabled` is never serialised into a data-attribute, so the overlay's
 * own markup is the signal. Must stay in step with the identical condition in
 * Pro's overlay/styles.js — if the two disagree, the embed parameters set here
 * and the crop apply to different players.
 */
const cropsYouTubeChromeFor = (playerOption) => {
    const wrapperEl = playerOption.closest(".eb-advanced-video-wrapper");

    return (
        !!(wrapperEl && wrapperEl.querySelector(".eb-av-overlay")) &&
        /youtube\.com|youtu\.be/i.test(playerOption.getAttribute("data-url") || "") &&
        playerOption.getAttribute("data-controls") !== "true"
    );
};

/**
 * Resolve any SVG icon placeholders a render just produced. Same delay the
 * existing call sites use — the markup has to be in the DOM first.
 */
const queueSvgIcons = (playerOption) => {
    if (!loadSvgIcons) {
        return;
    }
    setTimeout(() => loadSvgIcons(playerOption), 100);
};

/**
 * Bind the Pro overlay's media buttons.
 *
 * Pro emits the markup and the CSS; it ships no frontend JavaScript, so the
 * behaviour lives here, on the side that owns react-player. Returns null when
 * the overlay is absent or the author left the controls off, which is the same
 * markup-as-signal approach `cropsYouTubeChromeFor` uses.
 *
 * State is held in this closure rather than React state: every other prop
 * change in this file already flows through an external `root.render(...)`, and
 * adding component state would strand the props those call sites pass.
 */
const createMediaControls = (playerOption, onCommand) => {
    const wrapperEl = playerOption.closest(".eb-advanced-video-wrapper");
    const host = wrapperEl && wrapperEl.querySelector(".eb-av-overlay-media");
    if (!host) {
        return null;
    }

    const playBtn = host.querySelector(".is-playpause");
    const muteBtn = host.querySelector(".is-mute");

    const state = {
        playing: playerOption.getAttribute("data-playing") === "true",
        muted: playerOption.getAttribute("data-muted") === "true",
    };

    const paint = () => {
        host.classList.toggle("is-playing", state.playing);
        host.classList.toggle("is-sound-muted", state.muted);
    };

    const controls = {
        state,

        /**
         * Playback changed on its own — via native controls, a loop restarting,
         * or the video ending. Repaint, do not re-render.
         */
        report(next) {
            Object.assign(state, next);
            paint();
        },
    };

    if (playBtn) {
        playBtn.addEventListener("click", () => {
            state.playing = !state.playing;
            paint();
            onCommand(state);
        });
    }

    if (muteBtn) {
        muteBtn.addEventListener("click", () => {
            state.muted = !state.muted;
            paint();
            onCommand(state);
        });
    }

    paint();

    return controls;
};

/**
 * Get SVG functions from global eb_frontend
 */
const {
    EBRenderIconWithSVG,
    loadSvgIcons
} = window.eb_frontend || {};

const AdvancedVideo = (props) => {
    const {
        wrapper,
        _autoplay,
        _muted,
        mediaControls,
        _ctlPlaying,
        _ctlMuted,
    } = props;

    let url = wrapper.getAttribute("data-url");
    let controls = wrapper.getAttribute("data-controls") === "true" ? true : false;
    let loop = wrapper.getAttribute("data-loop") === "true" ? true : false;
    let muted = _muted ? _muted : wrapper.getAttribute("data-muted") === "true" ? true : false;
    let autoplay = _autoplay ? _autoplay : wrapper.getAttribute("data-playing") === "true" ? true : false;

    // The media buttons need to be able to set a value to `false`, which the
    // fallbacks above cannot express — `_muted={false}` falls straight through
    // to the data attribute. These are checked for presence instead, so they
    // win outright, and the older props keep their existing meaning.
    if (typeof _ctlPlaying !== "undefined") {
        autoplay = _ctlPlaying;
    }
    if (typeof _ctlMuted !== "undefined") {
        muted = _ctlMuted;
    }

    let imageOverlay = wrapper.getAttribute("data-overlay") === "true" ? true : false;
    let previewImage = wrapper.getAttribute("data-light");
    let customPlayIcon = wrapper.getAttribute("data-customPlayIcon") === "true" ? true : false;
    let customPlayIconURL = wrapper.getAttribute("data-playicon");
    let customPlayIconType = wrapper.getAttribute("data-customPlayIconType");
    let customPlayIconLib = wrapper.getAttribute("data-customPlayIconLib");
    let download = wrapper.getAttribute("data-download");

    let preview;
    if (imageOverlay === true && previewImage) {
        preview = previewImage;
    } else {
        preview = false;
    }

    let videoPlayIcon;
    if (imageOverlay == true && customPlayIcon == true && customPlayIconType == "image") {
        videoPlayIcon = <img src={customPlayIconURL} />;
    } else if (imageOverlay == true && customPlayIcon == true && customPlayIconType == "icon") {
        // Use EBRenderIconWithSVG for all icon types (FontAwesome, Dashicons, SVG URLs, inline SVG)
        if (EBRenderIconWithSVG) {
            const iconHtml = EBRenderIconWithSVG(customPlayIconLib, "eb-video-play-icon");
            videoPlayIcon = <span dangerouslySetInnerHTML={{ __html: iconHtml }} />;
        } else {
            // Fallback to basic icon rendering if SVG functions not available
            videoPlayIcon = <i className={customPlayIconLib}></i>;
        }
    } else {
        videoPlayIcon = null;
    }

    // Check if video is in lightbox mode
    const isLightbox = wrapper.closest('.lightbox') !== null;

    const cropsYouTubeChrome = cropsYouTubeChromeFor(wrapper);

    // Player configuration for different video providers
    const playerConfig = {
        file: {
            attributes: {
                controlsList: download === "false" ? "nodownload" : "",
                playsInline: !isLightbox,
                webkitPlaysinline: !isLightbox ? "true" : undefined,
                playsinline: !isLightbox ? "true" : undefined,
            },
        },
        youtube: {
            playerVars: {
                playsinline: !isLightbox ? 1 : 0,
                modestbranding: 1,
                origin: window.location.origin,
                // Suppresses what the crop cannot: the related-video grid and
                // annotations render inside the video area, and keyboard
                // control of a `pointer-events: none` player is misleading.
                ...(cropsYouTubeChrome
                    ? { rel: 0, iv_load_policy: 3, disablekb: 1 }
                    : {}),
            },
        },
        vimeo: {
            playerOptions: {
                playsinline: !isLightbox,
                dnt: true,
            },
        },
    };

    return (
        <>
            <ReactPlayer
                // react-player only reads `controls` on the initial mount — its
                // componentDidUpdate has no live-update branch for it (unlike
                // muted/loop). Tie the element key to `controls` so React mounts
                // a fresh player whenever the value differs, which is how the
                // saved data-controls value gets reflected on the frontend.
                // `controls` is stable within a page load, so the existing
                // autoplay/lightbox/sticky re-renders keep the same key and do
                // not remount (playback state is preserved).
                key={`eb-rp-controls-${controls}`}
                className="eb-react-player"
                width="100%"
                height={isLightbox ? "100%" : "auto"}
                url={url}
                controls={controls}
                loop={loop}
                muted={muted}
                playing={autoplay}
                light={preview}
                playIcon={videoPlayIcon}
                volume={0.5}
                config={playerConfig}
                playsinline={!isLightbox}
                // `onPlay` fires on every play, including the first — react-player
                // calls it unconditionally in handlePlay — so `onStart` would be
                // a strict subset and is not wired.
                //
                // Icons only — never a re-render. A re-render here would feed
                // the same value back through `playing` and could bounce against
                // react-player's own isPlaying guard.
                onPlay={() => {
                    if (mediaControls) {
                        mediaControls.report({ playing: true });
                    }
                }}
                onPause={() =>
                    mediaControls && mediaControls.report({ playing: false })
                }
                onEnded={() =>
                    mediaControls &&
                    mediaControls.report({ playing: loop ? true : false })
                }
                style={{
                    aspectRatio: isLightbox ? 'unset' : '16/9',
                }}
            />
        </>
    );
};

document.addEventListener("DOMContentLoaded", () => {
    const advVideoWrappers = document.getElementsByClassName(`eb-advanced-video-wrapper`);
    for (let advVideoWrapper of advVideoWrappers) {

        let playerOptions = advVideoWrapper.getElementsByClassName("eb-player-option");
        let playerOption = playerOptions[0];
        // Skip when the player shell is missing — e.g. block is behind Protected
        // Content, so the wrapper renders but its inner DOM is the password card.
        if (!playerOption) {
            continue;
        }
        let imageOverlay = playerOption.getAttribute("data-overlay") === "true" ? true : false;

        // sticky
        let option = playerOption.getAttribute("data-option");

        // Create root once and store it
        const root = createRoot(playerOption);

        // Declared before the controls so the click handler can reach it, and
        // assigned straight after — the two are mutually referential.
        let mediaControls = null;

        // Tracks whether Image Overlay's poster is still up. While it is,
        // react-player renders a preview instead of a player, so `playing` and
        // `muted` reach nothing; the first Play click has to mount the real
        // player the same way clicking the poster does.
        let posterDismissed = !imageOverlay;

        const renderPlayer = (extra = {}) =>
            root.render(
                <AdvancedVideo
                    wrapper={playerOption}
                    mediaControls={mediaControls}
                    {...extra}
                />
            );

        mediaControls = createMediaControls(playerOption, (state) => {
            if (!posterDismissed && state.playing) {
                // Same path as a poster click: drop `light`, mount the provider,
                // start unmuted unless the button says otherwise.
                posterDismissed = true;
                renderPlayer({
                    _autoplay: true,
                    _muted: state.muted,
                    _ctlPlaying: true,
                    _ctlMuted: state.muted,
                });
                queueSvgIcons(playerOption);
                return;
            }

            renderPlayer({
                _ctlPlaying: state.playing,
                _ctlMuted: state.muted,
            });
        });

        renderPlayer();

        if (imageOverlay) {
            playerOption.addEventListener("click", () => {
                posterDismissed = true;
                if (mediaControls) {
                    mediaControls.report({ playing: true, muted: false });
                }

                renderPlayer({ _autoplay: true, _muted: false });

                // Load SVG icons after render (for SVG URLs)
                if (loadSvgIcons) {
                    setTimeout(() => {
                        loadSvgIcons(playerOption);
                    }, 100);
                }
            });
        }

        // Load SVG icons after render (for SVG URLs)
        if (loadSvgIcons) {
            setTimeout(() => {
                loadSvgIcons(playerOption);
            }, 100);
        }

        if (option === "eb-sticky") {
            var $video = document.querySelector(".eb-player-option.eb-sticky");

            // Wait for React component to render before getting height
            setTimeout(() => {
                var reactPlayer = document.querySelector(".eb-react-player");
                if (!reactPlayer) {
                    console.warn("React player element not found");
                    return;
                }
                var height = reactPlayer.offsetHeight;
                var parent = playerOption.closest(".eb-sticky").closest(".wp-block-essential-blocks-advanced-video")
                    .offsetTop;

                // close button
                var closeBtnEl = playerOption.querySelector(".eb-sticky-video-close");
                var closeSpan = document.createElement("span");
                closeSpan.innerHTML = "&times;";
                closeSpan.setAttribute("class", "eb-sticky-video-close");

                let lastScroll = 0;
                // let isSticky = false;
                let stickyState = 'none'; // 'none', 'stuck', 'stuck-out'

                const stickyVisibility = playerOption.getAttribute("data-stickyVisibility");
                const stickyVisibilityTAB = playerOption.getAttribute("data-stickyVisibilityTAB");
                const stickyVisibilityMOB = playerOption.getAttribute("data-stickyVisibilityMOB");

                // Determine which device we're on and if sticky should be enabled
                let shouldEnableSticky = false;
                if (window.matchMedia("(min-width: 1025px)").matches && stickyVisibility != "hidden") {
                    shouldEnableSticky = true;
                } else if (window.matchMedia("(min-width: 768px) and (max-width: 1024px)").matches && stickyVisibilityTAB != "hidden") {
                    shouldEnableSticky = true;
                } else if (window.matchMedia("(max-width: 767px)").matches && stickyVisibilityMOB != "hidden") {
                    shouldEnableSticky = true;
                }

                if (shouldEnableSticky) {
                    // Single scroll event listener with unified logic
                    const handleScroll = function () {
                        const videoThreshold = height + parent + 320;
                        const currentScroll = window.pageYOffset;

                        // Reset sticky state when scrolled back to top
                        if (currentScroll < height + parent + 200) {

                            if (stickyState !== 'none') {
                                $video.classList.remove("stuck", "stuck-out");
                                stickyState = 'none';
                                // isSticky = false;
                                closeSpan.style.display = "none";
                            }

                            return;
                        }

                        // Make video sticky when scrolled past threshold
                        if (currentScroll > videoThreshold && stickyState !== 'stuck') {
                            $video.classList.remove("stuck-out");
                            $video.classList.add("stuck");
                            stickyState = 'stuck';
                            // isSticky = true;

                            if (closeBtnEl == null) {
                                $video.prepend(closeSpan);
                            }
                            closeSpan.style.display = "inline";

                            // Add close button click handler once
                            if (!closeSpan.hasAttribute('data-listener-added')) {
                                closeSpan.addEventListener("click", function () {
                                    $video.classList.remove("eb-sticky");
                                    stickyState = 'none';
                                    // isSticky = false;
                                });
                                closeSpan.setAttribute('data-listener-added', 'true');
                            }
                        }

                        lastScroll = currentScroll;
                    };

                    document.addEventListener("scroll", handleScroll);
                }
            }, 100); // Close setTimeout with 100ms delay
        }

        if (advVideoWrapper.classList.contains("lightbox")) {
            const lightbox = advVideoWrapper.getAttribute("data-id");
            const lightboxWrapper = document.querySelector(`[data-id="${lightbox}"]`);

            let btnId = "#myBtn-" + lightbox;

            // Get the button that opens the modal
            var btn = lightboxWrapper.querySelector(btnId);

            // Get the <span> element that closes the modal
            var span = lightboxWrapper.getElementsByClassName("eb-modal-close")[0];

            // When the user clicks the button, open the modal
            btn.onclick = function () {
                const btnId = this.id;
                const wrapperId = btnId.substring(6);
                const wrapperModalId = "#eb-modal-" + wrapperId;
                const wrapperModal = document.querySelector(wrapperModalId);
                const modalLightbox = wrapperModal.getElementsByClassName("lightbox")[0];
                const modalAutoplay = modalLightbox.getAttribute("data-autoplay");

                wrapperModal.style.display = "block";

                if (modalAutoplay === "true") {
                    renderPlayer({ _autoplay: true, _muted: false });

                    // Load SVG icons after render (for SVG URLs)
                    if (loadSvgIcons) {
                        setTimeout(() => {
                            loadSvgIcons(playerOption);
                        }, 100);
                    }
                }
            };

            // When the user clicks on <span> (x), close the modal
            span.onclick = function () {
                const spanId = this.id;
                const wrapperId = spanId.substring(6);
                const wrapperModalId = "#eb-modal-" + wrapperId;

                var wrapperModal = document.querySelector(wrapperModalId);

                wrapperModal.style.display = "none";
                renderPlayer({ _autoplay: false });

                // Load SVG icons after render (for SVG URLs)
                if (loadSvgIcons) {
                    setTimeout(() => {
                        loadSvgIcons(playerOption);
                    }, 100);
                }
            };

            // When the user clicks anywhere outside of the modal, close it
            window.onclick = function (event) {
                if (event.target.classList.contains("eb-modal-player")) {
                    var wrapperModal = document.getElementById(event.target.id);
                    wrapperModal.style.display = "none";
                    renderPlayer({ _autoplay: false });

                    // Load SVG icons after render (for SVG URLs)
                    if (loadSvgIcons) {
                        setTimeout(() => {
                            loadSvgIcons(playerOption);
                        }, 100);
                    }
                }
            };
        }
    }
});
