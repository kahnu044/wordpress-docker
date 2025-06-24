import { DotLottie } from '@lottiefiles/dotlottie-web';

window.addEventListener("DOMContentLoaded", (event) => {
    const lottieElements = document.querySelectorAll(`.eb-lottie-animation-wrapper`);

    for (let lottieElement of lottieElements) {
        const container = lottieElement.querySelector(`.eb-lottie-animation`);
        let settings = JSON.parse(lottieElement.getAttribute("data-settings"));

        // Initialize the Lottie animation
        const animation = new DotLottie({
            speed: settings.speed,
            mode: settings.reverse ? 'reverse' : 'forward',
            autoplay: (settings.playOn === 'none' || settings.playOn === 'viewport') ? true : false,
            loop: settings.loop && (settings.loopCount > 0 || settings.delay > 0) ? false : settings.loop,
            canvas: container,
            src: settings.lottieURl,
        });

        animation.addEventListener("load", (event) => {
            const totalFrames = animation.totalFrames - 1;
            const startFrame = Math.floor((settings.startSegment / 100) * totalFrames);
            const endFrame = Math.floor((settings.endSegment / 100) * totalFrames);
            animation.setSegment(startFrame, endFrame);
        });

        if (settings.playOn !== 'scroll') {
            // loop count
            if (settings.loop && settings.loopCount > 0) {
                var loopCount = 0;
                animation.addEventListener('complete', () => {
                    loopCount += 1; // Increment loop count

                    if (loopCount < settings.loopCount) {
                        setTimeout(() => {
                            animation.play();
                        }, settings.delay * 1000);
                    } else {
                        animation.stop();
                    }
                });
            }

            if (settings.loop && settings.delay > 0 && settings.loopCount === 0) {
                animation.addEventListener('complete', () => {
                    setTimeout(() => {
                        animation.play();
                    }, settings.delay * 1000); // Add intermission between infinite loops
                });
            }
        }

        if (settings.playOn === 'none') {
            animation.setRenderConfig({ ...animation.renderConfig, freezeOnOffscreen: false })
        }

        // Play on hover
        if (settings.playOn === 'hover') {
            animation.setRenderConfig({ ...animation.renderConfig, freezeOnOffscreen: false })

            container.addEventListener('mouseenter', () => {
                animation.play();
            });
            container.addEventListener('mouseleave', () => {
                animation.stop();
                loopCount = 0;
            });
        }

        // Play on click
        if (settings.playOn === 'click') {
            animation.setRenderConfig({ ...animation.renderConfig, freezeOnOffscreen: false })
            container.addEventListener('click', () => {
                loopCount = 0;
                animation.play();
            });
        }

        // Play on scroll
        if (settings.playOn === 'scroll') {
            // Convert percentages to decimal values
            const scrollTopThreshold = settings.scrollTopPoint / 100;
            const scrollBottomThreshold = settings.scrollBottomPoint / 100;

            // Function to sync animation with scroll position
            const playOnScroll = () => {
                const rect = container.getBoundingClientRect();
                const windowHeight = window.innerHeight;

                let scrollProgress;

                // Define start and end scroll points
                const startPoint = windowHeight * scrollTopThreshold; // 10% from top
                const endPoint = windowHeight * (1 - scrollBottomThreshold); // 80% from top

                // Calculate visibility and scroll progress
                const elementTop = rect.top;
                const elementBottom = rect.bottom;

                if (settings.scrollTopPoint > 0 || settings.scrollBottomPoint > 0) {
                    if (elementBottom > startPoint && elementTop < endPoint) {
                        scrollProgress = (endPoint - elementTop) / (endPoint - startPoint);
                        scrollProgress = Math.min(Math.max(scrollProgress, 0), 1); // Clamp between 0 and 1

                        // Convert progress to animation frame
                        const frame = Math.floor(scrollProgress * animation.totalFrames);
                        animation.setFrame(frame);
                    } else {
                        // If not in view yet, reset animation to the beginning
                        animation.setFrame(0);
                    }
                } else {
                    scrollProgress = Math.min(Math.max((windowHeight - rect.top) / (rect.height + windowHeight), 0), 1);
                    // Sync the animation frame with the scroll progress
                    const frame = Math.floor(scrollProgress * animation.totalFrames);

                    animation.setFrame(frame);
                }


            };
            // Attach the scroll event listener
            window.addEventListener('scroll', playOnScroll);

            // Optional: Clean up the scroll listener on component unmount
            const cleanUpScrollListener = () => {
                window.removeEventListener('scroll', playOnScroll);
            };

        }

        // Play on viewport
        if (settings.playOn === 'viewport') {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            animation.setRenderConfig({ ...animation.renderConfig, freezeOnOffscreen: false })
                            loopCount = 0;
                            animation.unfreeze();
                            animation.play();
                        } else {
                            animation.freeze();
                        }
                    });
                },
                { threshold: 0.2 } // Play when 50% of the element is visible
            );
            observer.observe(lottieElement);
        }
    }
});
