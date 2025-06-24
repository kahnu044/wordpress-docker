// Import lottie-web directly to avoid dynamic import issues
import lottie from 'lottie-web';
import { DotLottie } from '@lottiefiles/dotlottie-web';

// Simple implementation for Lottie animations
window.addEventListener("DOMContentLoaded", (event) => {
    const lottieElements = document.querySelectorAll(`.eb-lottie-animation-wrapper`);

    for (let lottieElement of lottieElements) {
        let containerWrap = lottieElement.querySelector(`.eb-lottie-animation`);

        // Check if containerWrap is a canvas element and replace it with a div if needed
        if (containerWrap && containerWrap.tagName.toLowerCase() === 'canvas') {
            // Create a new div element to replace the canvas
            const newContainer = document.createElement('div');

            // Copy all attributes from the canvas to the new div
            Array.from(containerWrap.attributes).forEach(attr => {
                newContainer.setAttribute(attr.name, attr.value);
            });

            // Copy the inline styles
            newContainer.style.cssText = containerWrap.style.cssText;

            // Copy the class list
            newContainer.className = containerWrap.className;

            // Replace the canvas with the div in the DOM
            containerWrap.parentNode.insertBefore(newContainer, containerWrap);

            // Clone event listeners (using a data attribute to track them)
            if (containerWrap._eventListeners) {
                for (const [type, listeners] of Object.entries(containerWrap._eventListeners)) {
                    listeners.forEach(listener => {
                        newContainer.addEventListener(type, listener);
                    });
                }
                newContainer._eventListeners = containerWrap._eventListeners;
            }

            // Remove the old canvas element
            containerWrap.parentNode.removeChild(containerWrap);

            // Update the containerWrap reference to the new div
            containerWrap = newContainer;
        }

        let settings = JSON.parse(lottieElement.getAttribute("data-settings"));

        // Determine if we should use DotLottie based on file extension
        const isLottieFile = settings.lottieURl.toLowerCase().endsWith('.lottie');

        // Clear the container first
        containerWrap.innerHTML = '';

        if (isLottieFile) {
            // Create a canvas element for DotLottie
            const container = document.createElement('canvas');
            containerWrap.appendChild(container);

            // Initialize DotLottie
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
                    if (animation && typeof animation.play === 'function') {
                        animation.play();
                    }
                });
                container.addEventListener('mouseleave', () => {
                    if (animation && typeof animation.stop === 'function') {
                        animation.stop();
                    }
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

        } else {
            // Basic lottie-web initialization
            const animation = lottie.loadAnimation({
                container: containerWrap,
                renderer: 'svg',
                loop: settings.loop && settings.loopCount === 0 && settings.delay === 0 && !isCustomSegment, // Enable native loop only for infinite loops without delay and without custom segments
                autoplay: false, // We'll control playback manually
                path: settings.lottieURl,
                rendererSettings: {
                    preserveAspectRatio: 'xMidYMid slice',
                }
            });

            // Set speed
            if (animation && typeof animation.setSpeed === 'function') {
                animation.setSpeed(settings.speed || 1);
            }

            // Set direction
            animation.setDirection(settings.reverse ? -1 : 1);

            // Calculate segment frames once
            let startFrame = 0;
            let endFrame = 1;
            let totalFrames = 0;
            let isCustomSegment = false;

            // Apply segments once the animation is loaded
            animation.addEventListener("DOMLoaded", () => {
                totalFrames = animation.totalFrames - 1;
                startFrame = Math.floor((settings.startSegment / 100) * totalFrames);
                endFrame = Math.floor((settings.endSegment / 100) * totalFrames);
                isCustomSegment = (startFrame !== 0 || endFrame !== totalFrames);

                // Update loop setting based on custom segments
                if (isCustomSegment) {
                    animation.setLoop(false); // Disable native looping for custom segments
                } else if (settings.loop && settings.loopCount === 0 && settings.delay === 0) {
                    animation.setLoop(true); // Enable native looping for infinite loops without delay
                }

                // For reverse playback, we need to start from the end frame
                if (settings.reverse) {
                    animation.goToAndStop(endFrame, true);
                } else {
                    animation.goToAndStop(startFrame, true);
                }

                // Only start playing if playOn is 'none' (autoplay)
                if (settings.playOn === 'none') {
                    if (isCustomSegment) {
                        if (settings.reverse) {
                            animation.playSegments([endFrame, startFrame], true);
                        } else {
                            animation.playSegments([startFrame, endFrame], true);
                        }
                    } else {
                        animation.play();
                    }
                }

                if (settings.playOn !== 'scroll') {
                    // Handle loop count
                    if (settings.loop && settings.loopCount > 0) {
                        var loopCount = 0;
                        animation.addEventListener('complete', () => {
                            loopCount += 1; // Increment loop count

                            if (loopCount < settings.loopCount) {
                                setTimeout(() => {
                                    if (settings.reverse) {
                                        // For reverse, go back to end frame and play backwards
                                        if (isCustomSegment) {
                                            animation.goToAndStop(endFrame, true);
                                            animation.playSegments([endFrame, startFrame], true);
                                        } else {
                                            animation.goToAndStop(totalFrames, true);
                                            animation.play();
                                        }
                                    } else {
                                        // For forward, go back to start frame and play forwards
                                        if (isCustomSegment) {
                                            animation.goToAndStop(startFrame, true);
                                            animation.playSegments([startFrame, endFrame], true);
                                        } else {
                                            animation.goToAndPlay(0, true);
                                        }
                                    }
                                }, 1000 * settings.delay);
                            } else {
                                animation.stop();
                            }
                        });
                    }

                    // Handle infinite loops with delay
                    if (settings.loop && settings.delay > 0 && settings.loopCount === 0) {
                        animation.addEventListener('complete', () => {
                            setTimeout(() => {
                                if (settings.reverse) {
                                    // For reverse, go back to end frame and play backwards
                                    if (isCustomSegment) {
                                        animation.goToAndStop(endFrame, true);
                                        animation.playSegments([endFrame, startFrame], true);
                                    } else {
                                        animation.goToAndStop(totalFrames, true);
                                        animation.play();
                                    }
                                } else {
                                    // For forward, go back to start frame and play forwards
                                    if (isCustomSegment) {
                                        animation.goToAndStop(startFrame, true);
                                        animation.playSegments([startFrame, endFrame], true);
                                    } else {
                                        animation.goToAndStop(0, true);
                                        animation.play();
                                    }
                                }
                            }, 1000 * settings.delay);
                        });
                    }

                    // Handle infinite loops with custom segments but no delay
                    if (settings.loop && settings.delay === 0 && settings.loopCount === 0 && isCustomSegment) {
                        animation.addEventListener('complete', () => {
                            if (settings.reverse) {
                                animation.goToAndStop(endFrame, true);
                                animation.playSegments([endFrame, startFrame], true);
                            } else {
                                animation.goToAndStop(startFrame, true);
                                animation.playSegments([startFrame, endFrame], true);
                            }
                        });
                    }
                }

                // Handle basic playback options for standard Lottie
                if (settings.playOn === 'hover') {
                    containerWrap.addEventListener('mouseenter', () => {
                        // Play the segment on hover
                        if (isCustomSegment) {
                            if (settings.reverse) {
                                animation.goToAndStop(endFrame, true);
                                animation.playSegments([endFrame, startFrame], true);
                            } else {
                                animation.goToAndStop(startFrame, true);
                                animation.playSegments([startFrame, endFrame], true);
                            }
                        } else {
                            if (settings.reverse) {
                                animation.goToAndStop(totalFrames, true);
                            } else {
                                animation.goToAndStop(0, true);
                            }
                            animation.play();
                        }
                    });

                    containerWrap.addEventListener('mouseleave', () => {
                        animation.pause();
                        // Reset to appropriate frame based on direction
                        if (settings.reverse) {
                            animation.goToAndStop(isCustomSegment ? endFrame : totalFrames, true);
                        } else {
                            animation.goToAndStop(isCustomSegment ? startFrame : 0, true);
                        }
                    });
                } else if (settings.playOn === 'click') {
                    let isPlaying = false;

                    containerWrap.addEventListener('click', () => {
                        if (isPlaying) {
                            // If playing, pause the animation
                            animation.pause();
                            // Reset to appropriate frame based on direction
                            if (settings.reverse) {
                                animation.goToAndStop(isCustomSegment ? endFrame : totalFrames, true);
                            } else {
                                animation.goToAndStop(isCustomSegment ? startFrame : 0, true);
                            }
                            isPlaying = false;
                        } else {
                            // Reset loop count on click
                            loopCount = 0;

                            // Play the segment on click
                            if (isCustomSegment) {
                                if (settings.reverse) {
                                    animation.goToAndStop(endFrame, true);
                                    animation.playSegments([endFrame, startFrame], true);
                                } else {
                                    animation.goToAndStop(startFrame, true);
                                    animation.playSegments([startFrame, endFrame], true);
                                }
                            } else {
                                if (settings.reverse) {
                                    animation.goToAndStop(totalFrames, true);
                                } else {
                                    animation.goToAndStop(0, true);
                                }
                                animation.play();
                            }

                            isPlaying = true;
                        }
                    });
                } else if (settings.playOn === 'scroll') {
                    // Improved scroll handler to match DotLottie implementation
                    const scrollHandler = () => {
                        const rect = containerWrap.getBoundingClientRect();
                        const windowHeight = window.innerHeight;

                        // Convert percentages to decimal values
                        const scrollTopThreshold = settings.scrollTopPoint / 100;
                        const scrollBottomThreshold = settings.scrollBottomPoint / 100;

                        // Define start and end scroll points
                        const startPoint = windowHeight * scrollTopThreshold;
                        const endPoint = windowHeight * (1 - scrollBottomThreshold);

                        // Calculate visibility and scroll progress
                        const elementTop = rect.top;
                        const elementBottom = rect.bottom;
                        const segmentRange = endFrame - startFrame;

                        let scrollProgress;

                        if (settings.scrollTopPoint > 0 || settings.scrollBottomPoint > 0) {
                            if (elementBottom > startPoint && elementTop < endPoint) {
                                scrollProgress = (endPoint - elementTop) / (endPoint - startPoint);
                                scrollProgress = Math.min(Math.max(scrollProgress, 0), 1); // Clamp between 0 and 1

                                // For reverse animation, invert the progress
                                if (settings.reverse) {
                                    scrollProgress = 1 - scrollProgress;
                                }

                                // Map scroll progress to the segment range
                                const frame = startFrame + Math.floor(scrollProgress * segmentRange);
                                animation.goToAndStop(frame, true);
                            } else {
                                // If not in view yet, set to appropriate boundary frame
                                if (settings.reverse) {
                                    // For reverse, use the opposite boundary
                                    animation.goToAndStop(elementTop >= endPoint ? endFrame : startFrame, true);
                                } else {
                                    animation.goToAndStop(elementTop >= endPoint ? startFrame : endFrame, true);
                                }
                            }
                        } else {
                            scrollProgress = Math.min(Math.max((windowHeight - rect.top) / (rect.height + windowHeight), 0), 1);

                            // For reverse animation, invert the progress
                            if (settings.reverse) {
                                scrollProgress = 1 - scrollProgress;
                            }

                            // Map scroll progress to the segment range
                            const frame = startFrame + Math.floor(scrollProgress * segmentRange);
                            animation.goToAndStop(frame, true);
                        }
                    };

                    window.addEventListener('scroll', scrollHandler);
                    // Initial check
                    scrollHandler();
                } else if (settings.playOn === 'viewport') {
                    // Add viewport functionality to match DotLottie implementation
                    var loopCount = 0;

                    const observer = new IntersectionObserver(
                        (entries) => {
                            entries.forEach((entry) => {
                                if (entry.isIntersecting) {
                                    loopCount = 0; // Reset loop count when entering viewport

                                    // Play the segment in the appropriate direction
                                    if (isCustomSegment) {
                                        if (settings.reverse) {
                                            animation.goToAndStop(endFrame, true);
                                            animation.playSegments([endFrame, startFrame], true);
                                        } else {
                                            animation.goToAndStop(startFrame, true);
                                            animation.playSegments([startFrame, endFrame], true);
                                        }
                                    } else {
                                        if (settings.reverse) {
                                            animation.goToAndStop(totalFrames, true);
                                        } else {
                                            animation.goToAndStop(0, true);
                                        }
                                        animation.play();
                                    }
                                } else {
                                    animation.pause();
                                    // Reset to appropriate frame when out of viewport
                                    if (settings.reverse) {
                                        animation.goToAndStop(isCustomSegment ? endFrame : totalFrames, true);
                                    } else {
                                        animation.goToAndStop(isCustomSegment ? startFrame : 0, true);
                                    }
                                }
                            });
                        },
                        { threshold: 0.2 } // Play when 20% of the element is visible
                    );
                    observer.observe(lottieElement);
                }

            });
        }
    };

});
