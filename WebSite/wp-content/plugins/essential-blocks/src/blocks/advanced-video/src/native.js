/**
 * Advanced Video — native <video> runtime.
 *
 * AdvancedVideo::render_callback() renders self-hosted files (mp4/webm/ogg/
 * mov/m4v) as a real <video> in the server HTML, reproducing the DOM
 * react-player would mount (`.eb-react-player` > `video`, and
 * `.react-player__preview` for Image Overlay) so existing CSS applies
 * unchanged. Players it rendered carry `data-eb-native="1"`; this script drives
 * only those, and loads instead of react-player, react-dom, the vendor bundle
 * and the HLS/DASH/FLV adapters.
 *
 * YouTube URLs get a thumbnail + play button (server-rendered); the real
 * iframe is mounted on click, or near the screen after load for autoplaying
 * blocks. Vimeo, lightbox and the Pro overlay keep react-player.
 *
 * Behaviour mirrored from frontend.js:
 * - Image Overlay: the preview is shown and nothing loads until it's clicked
 *   (react-player `light` mode ignores `playing`); the click starts playback
 *   with the saved mute setting.
 * - Sticky: the same ./sticky helper frontend.js uses.
 * - Autoplay: every autoplaying player is rendered with `data-eb-lazy-autoplay`
 *   (and `preload="none"` unless the server couldn't resolve its size). Once
 *   the page has loaded, players on screen start and the rest start about one
 *   screen before they scroll into view. No video bytes compete with the
 *   page's own assets, and ten autoplaying videos don't all download up front.
 *   The server reserves each file's real aspect ratio, so a player never
 *   changes size when its video arrives.
 *
 * Written without object spread, for...of, classes or async: those make Babel
 * import @babel/runtime helpers, which webpack splits into a vendors chunk the
 * block-level enqueue pipeline doesn't ship.
 */
import { initStickyPlayer } from "./sticky";

(function () {
    // One viewport ahead: large files need a head start to show a frame by
    // the time they are on screen.
    var LAZY_ROOT_MARGIN = "100% 0px";

    function safePlay(video) {
        var p = video.play();
        if (p && typeof p.catch === "function") {
            // Autoplay can be refused (e.g. unmuted without a user gesture) —
            // the same outcome react-player had; stay paused quietly.
            p.catch(function () {});
        }
    }

    /**
     * Start a player in a way that survives page optimisers.
     *
     * Video lazy-loaders (xSpeed, and others built the same way) watch for a
     * <video> that gains `preload="auto"` or `autoplay`, strip its `src`,
     * reload it later when it nears the viewport — which rejects any pending
     * play() — and restore `autoplay` only if the element carried the
     * attribute when they took it over. So set the `autoplay` attribute, not
     * `preload`, before calling play(): without an optimiser play() starts the
     * video; with one, `autoplay` survives the reload and starts it then.
     * Found on essential-blocks.com, where the below-the-fold videos otherwise
     * stayed paused.
     */
    function startPlayback(video) {
        video.autoplay = true;
        safePlay(video);
    }

    function whenVisible(el, start) {
        if (!("IntersectionObserver" in window)) {
            start();
            return;
        }
        var observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        observer.disconnect();
                        start();
                    }
                });
            },
            { rootMargin: LAZY_ROOT_MARGIN }
        );
        observer.observe(el);
    }

    function playWhenVisible(video) {
        whenVisible(video, function () {
            startPlayback(video);
        });
    }

    // Custom play icon from an icon library: rendered with the same helper
    // frontend.js uses (the server emits an empty slot for it).
    function renderIconSlot(scope, playerOption) {
        var iconSlot = scope.querySelector("[data-eb-play-icon]");
        if (!iconSlot) {
            return;
        }
        var lib = iconSlot.getAttribute("data-eb-play-icon");
        var fe = window.eb_frontend || {};
        if (fe.EBRenderIconWithSVG) {
            iconSlot.innerHTML = fe.EBRenderIconWithSVG(lib, "eb-video-play-icon");
        } else {
            var icon = document.createElement("i");
            icon.className = lib;
            iconSlot.appendChild(icon);
        }
        if (fe.loadSvgIcons) {
            setTimeout(function () {
                fe.loadSvgIcons(playerOption);
            }, 100);
        }
    }

    /**
     * YouTube: the server renders a thumbnail + play button; swap in the real
     * iframe (autoplay=1 is already in data-eb-embed) on click, or — for an
     * autoplaying block — once near the screen after load.
     */
    function mountYouTube(playerOption) {
        if (playerOption.getAttribute("data-eb-mounted") === "1") {
            return;
        }
        var box = playerOption.querySelector(".eb-react-player");
        var src = playerOption.getAttribute("data-eb-embed");
        if (!box || !src) {
            return;
        }
        playerOption.setAttribute("data-eb-mounted", "1");
        var iframe = document.createElement("iframe");
        iframe.src = src;
        iframe.title = "YouTube video player";
        iframe.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share");
        iframe.setAttribute("allowfullscreen", "");
        iframe.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
        iframe.style.cssText = "position: absolute; inset: 0; width: 100%; height: 100%; border: 0;";
        box.innerHTML = "";
        box.appendChild(iframe);
    }

    function initYouTube(playerOption) {
        var facade = playerOption.querySelector(".eb-av-yt-facade");
        if (!facade) {
            return;
        }
        renderIconSlot(facade, playerOption);
        facade.addEventListener("click", function () {
            mountYouTube(playerOption);
        });
    }

    function initOverlay(playerOption, video) {
        var preview = playerOption.querySelector(".react-player__preview");
        if (!preview) {
            return;
        }

        renderIconSlot(preview, playerOption);

        var started = false;
        var start = function () {
            if (started) {
                return;
            }
            started = true;
            if (preview.parentNode) {
                preview.parentNode.removeChild(preview);
            }
            video.style.display = "";
            // See startPlayback(): `autoplay` rather than `preload`, so an
            // optimiser reloading the element can't swallow the click.
            startPlayback(video);
        };

        preview.addEventListener("click", start);
        // react-player's preview starts on Enter as well.
        preview.addEventListener("keypress", function (e) {
            if (e.key === "Enter") {
                start();
            }
        });
    }

    function isYouTube(playerOption) {
        return playerOption.getAttribute("data-eb-provider") === "youtube";
    }

    // `video` is null for YouTube players.
    function eachPlayer(callback) {
        var players = document.querySelectorAll('.eb-player-option[data-eb-native="1"]');
        Array.prototype.forEach.call(players, function (playerOption) {
            var video = playerOption.querySelector("video");
            if (video || isYouTube(playerOption)) {
                callback(playerOption, video);
            }
        });
    }

    /**
     * Click-to-play players are rendered with `preload="none"` when their size
     * is known, so no bytes load with the page. Chrome only toggles playback on
     * a click on the video area once it has data, so with nothing loaded that
     * click did nothing (the controls' play button still worked). After the
     * browser has handled the click, start it if it is still paused with no
     * data. Browsers that already started it are left alone, so there is no
     * double toggle.
     */
    function initClickToPlay(playerOption, video) {
        // Only players with controls: without them a click never started
        // playback before either, and nothing could pause it again.
        if (
            !video.controls ||
            playerOption.getAttribute("data-eb-lazy-autoplay") === "true" ||
            playerOption.querySelector(".react-player__preview")
        ) {
            return;
        }
        video.addEventListener("click", function () {
            if (video.readyState !== 0) {
                return;
            }
            setTimeout(function () {
                if (video.paused && video.readyState === 0) {
                    startPlayback(video);
                }
            }, 0);
        });
    }

    function init() {
        eachPlayer(function (playerOption, video) {
            if (video) {
                initOverlay(playerOption, video);
                initClickToPlay(playerOption, video);
            } else {
                initYouTube(playerOption);
            }
            if (playerOption.getAttribute("data-option") === "eb-sticky") {
                initStickyPlayer(playerOption);
            }
        });
    }

    // Autoplay waits for `load`, so video downloads never delay the page.
    function initAutoplay() {
        eachPlayer(function (playerOption, video) {
            if (playerOption.getAttribute("data-eb-lazy-autoplay") !== "true") {
                return;
            }
            if (video) {
                playWhenVisible(video);
            } else {
                whenVisible(playerOption, function () {
                    mountYouTube(playerOption);
                });
            }
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
    if (document.readyState === "complete") {
        initAutoplay();
    } else {
        window.addEventListener("load", initAutoplay);
    }
})();
