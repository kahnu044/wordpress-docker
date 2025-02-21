/**
 * WordPress dependencies
 */
import domReady from '@wordpress/dom-ready';

// Animates the progress
const animate = function ({ duration, draw, timing }) {
    let start = performance.now();

    requestAnimationFrame(function animate(time) {
        let timeFraction = (time - start) / duration;
        if (timeFraction > 1) timeFraction = 1;

        let progress = timing(timeFraction);

        draw(progress);

        if (timeFraction < 1) {
            requestAnimationFrame(animate);
        }
    });
};

// Initialize after DOM is ready
domReady(function () {
    var progressbars = document.querySelectorAll(".eb-progressbar");
    if (!progressbars) return;

    // Function to start animation when in view
    function startProgressbarAnimation(progressbar) {
        var layout = progressbar.getAttribute("data-layout");
        var count = progressbar.getAttribute("data-count");
        var duration = progressbar.getAttribute("data-duration");

        animate({
            duration: duration,
            timing: function (timeFraction) {
                return timeFraction;
            },
            draw: function (progress) {
                var counter = Math.floor(progress * 100);

                if (counter <= count) {
                    if (layout === "line" || layout === "line_rainbow") {
                        progressbar.querySelector(
                            ".eb-progressbar-line-fill"
                        ).style.width = counter + "%";
                    } else if (layout === "circle" || layout === "circle_fill") {
                        var rotate = counter * 3.6;
                        progressbar.querySelector(
                            ".eb-progressbar-circle-half-left"
                        ).style.transform = "rotate(" + rotate + "deg)";
                        if (rotate > 180) {
                            progressbar.querySelector(
                                ".eb-progressbar-circle-pie"
                            ).style.clipPath = "inset(0)";
                            progressbar.querySelector(
                                ".eb-progressbar-circle-half-right"
                            ).style.visibility = "visible";
                        }
                    } else if (
                        layout === "half_circle" ||
                        layout === "half_circle_fill"
                    ) {
                        var rotate = counter * 1.8;
                        progressbar.querySelector(
                            ".eb-progressbar-circle-half"
                        ).style.transform = "rotate(" + rotate + "deg)";
                    } else if (layout === "box") {
                        progressbar.querySelector(
                            ".eb-progressbar-box-fill"
                        ).style.height = counter + "%";
                    }
                }
            },
        });
    }
    // Function to start animation when in view
    function startProgressbarAnimationCount(progressbar) {
        const duration = progressbar.getAttribute("data-duration");
        const absoluteValue = progressbar.getAttribute("data-absolute");
        const count = progressbar.getAttribute("data-count");
        const dataType = progressbar.getAttribute("data-type");
        const newCount = dataType === 'absolute' ? absoluteValue : count;

        animate({
            duration: duration,
            timing: function (timeFraction) {
                return timeFraction;
            },
            draw: function (progress) {
                var counter2 = Math.floor(progress * newCount);

                if (counter2 <= newCount) {
                    const range = progressbar.querySelector(".eb-progressbar-count");
                    if (range) {
                        range.innerText = counter2;
                    }
                }
            },
        });
    }

    // IntersectionObserver setup
    const observerOptions = {
        threshold: 0.25,
    };

    const observer = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                // Start progress bar animation when the element is in view
                startProgressbarAnimation(entry.target);
                startProgressbarAnimationCount(entry.target);
                // Unobserve after animation to avoid re-triggering
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe each progress bar element
    progressbars.forEach(function (progressbar) {
        observer.observe(progressbar);
    });
});
