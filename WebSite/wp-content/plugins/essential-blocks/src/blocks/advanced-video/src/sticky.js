/**
 * Sticky ("eb-sticky") player behaviour.
 *
 * Shared by the React runtime (frontend.js) and the native <video> runtime
 * (native.js), which both render the same `.eb-react-player` DOM inside the
 * `.eb-player-option` placeholder.
 *
 * Moved verbatim from frontend.js, with one change: the player and the
 * `.eb-react-player` element are now looked up inside THIS placeholder. The
 * original used `document.querySelector(...)`, which picked the first sticky
 * player / first player on the whole page, so a sticky video that wasn't the
 * first video measured the wrong element.
 *
 * Written without object spread, for...of or async so Babel emits no
 * @babel/runtime helpers — those are split into a vendors chunk the
 * block-level enqueue pipeline doesn't ship to native.js.
 *
 * @param {HTMLElement} playerOption The `.eb-player-option.eb-sticky` element.
 */
export function initStickyPlayer(playerOption) {
    var $video = playerOption;

    // Wait for the player to render before getting its height.
    setTimeout(function () {
        var reactPlayer = playerOption.querySelector(".eb-react-player");
        if (!reactPlayer) {
            console.warn("React player element not found");
            return;
        }
        var height = reactPlayer.offsetHeight;
        var parent = playerOption
            .closest(".eb-sticky")
            .closest(".wp-block-essential-blocks-advanced-video").offsetTop;

        // close button
        var closeBtnEl = playerOption.querySelector(".eb-sticky-video-close");
        var closeSpan = document.createElement("span");
        closeSpan.innerHTML = "&times;";
        closeSpan.setAttribute("class", "eb-sticky-video-close");

        var stickyState = "none"; // 'none', 'stuck', 'stuck-out'

        var stickyVisibility = playerOption.getAttribute("data-stickyVisibility");
        var stickyVisibilityTAB = playerOption.getAttribute("data-stickyVisibilityTAB");
        var stickyVisibilityMOB = playerOption.getAttribute("data-stickyVisibilityMOB");

        // Determine which device we're on and if sticky should be enabled
        var shouldEnableSticky = false;
        if (window.matchMedia("(min-width: 1025px)").matches && stickyVisibility != "hidden") {
            shouldEnableSticky = true;
        } else if (
            window.matchMedia("(min-width: 768px) and (max-width: 1024px)").matches &&
            stickyVisibilityTAB != "hidden"
        ) {
            shouldEnableSticky = true;
        } else if (window.matchMedia("(max-width: 767px)").matches && stickyVisibilityMOB != "hidden") {
            shouldEnableSticky = true;
        }

        if (!shouldEnableSticky) {
            return;
        }

        // Single scroll event listener with unified logic
        var handleScroll = function () {
            var videoThreshold = height + parent + 320;
            var currentScroll = window.pageYOffset;

            // Reset sticky state when scrolled back to top
            if (currentScroll < height + parent + 200) {
                if (stickyState !== "none") {
                    $video.classList.remove("stuck", "stuck-out");
                    stickyState = "none";
                    closeSpan.style.display = "none";
                }
                return;
            }

            // Make video sticky when scrolled past threshold
            if (currentScroll > videoThreshold && stickyState !== "stuck") {
                $video.classList.remove("stuck-out");
                $video.classList.add("stuck");
                stickyState = "stuck";

                if (closeBtnEl == null) {
                    $video.prepend(closeSpan);
                }
                closeSpan.style.display = "inline";

                // Add close button click handler once
                if (!closeSpan.hasAttribute("data-listener-added")) {
                    closeSpan.addEventListener("click", function () {
                        $video.classList.remove("eb-sticky");
                        stickyState = "none";
                    });
                    closeSpan.setAttribute("data-listener-added", "true");
                }
            }
        };

        document.addEventListener("scroll", handleScroll);
    }, 100);
}
