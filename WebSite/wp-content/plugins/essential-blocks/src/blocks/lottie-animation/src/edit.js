/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { memo, useEffect, useRef } from "@wordpress/element";
import { MediaPlaceholder } from "@wordpress/block-editor";
import lottie from 'lottie-web';
import { DotLottie } from '@lottiefiles/dotlottie-web';

/**
 * Internal depencencies
 */
import Inspector from "./inspector";
import Style from "./style";
import defaultAttributes from './attributes'
import {
    BlockProps,
    withBlockContext,
    DynamicInputValueHandler,
    EBMediaPlaceholder
} from "@essential-blocks/controls";
import { ReactComponent as Icon } from "./icon.svg";

function Edit(props) {
    const {
        attributes,
        setAttributes,
        isSelected,
    } = props;
    const {
        blockId,
        classHook,
        resOption,
        lottieSource,
        lottieURl,
        validationMessage,
        speed,
        loop,
        loopCount,
        playOn,
        enableTitle,
        lottieTitle,
        customLottieURL,
        lottieMediaTitle,
        lottieMediaCaption,
        captionType,
        reverse,
        delay,
        startSegment,
        endSegment,
        lottieJSON,
        version
    } = attributes;

    // you must declare this variable
    const enhancedProps = {
        ...props,
        blockPrefix: 'eb-lottie-animation',
        style: <Style {...props} />
    };

    const lottieAnimationRef = useRef(null);

    useEffect(() => {
        validationMessage !== '' ? setAttributes({ validationMessage: '' }) : null;
        if (!version) {
            setAttributes({ version: "v2" });
        }
    }, [])

    useEffect(() => {
        const container = lottieAnimationRef.current || document.querySelector(`.${blockId} .eb-lottie-animation`);
        if (!container || !lottieURl) return;

        // Determine if we should use DotLottie
        const isLottieFile = lottieURl.toLowerCase().endsWith('.lottie');
        let newAnimation = null;
        let canvasElement = null;

        // Create a temporary container for the new animation
        const tempContainer = document.createElement('div');
        tempContainer.style.position = 'absolute';
        tempContainer.style.top = '0';
        tempContainer.style.left = '0';
        tempContainer.style.width = '100%';
        tempContainer.style.height = '100%';
        tempContainer.style.opacity = '0';

        // Function to swap animations once new one is ready
        const swapAnimations = () => {
            // Clear the main container only when new animation is ready
            container.innerHTML = '';

            // Move content from temp container to main container
            while (tempContainer.firstChild) {
                container.appendChild(tempContainer.firstChild);
            }

            // Remove the temp container
            if (tempContainer.parentNode) {
                tempContainer.parentNode.removeChild(tempContainer);
            }
        };

        if (isLottieFile) {
            // Create a canvas element for DotLottie
            canvasElement = document.createElement('canvas');
            tempContainer.appendChild(canvasElement);

            // Initialize DotLottie
            newAnimation = new DotLottie({
                speed: speed || 1,
                mode: reverse ? 'reverse' : 'forward',
                autoplay: true, // Always autoplay in editor
                loop: loop && loopCount > 0 ? false : loop,
                canvas: canvasElement,
                src: lottieURl,
            });

            // Apply segments once the animation is loaded
            newAnimation.addEventListener("load", () => {
                const totalFrames = newAnimation.totalFrames - 1;
                const startFrame = Math.floor((startSegment / 100) * totalFrames);
                const endFrame = Math.floor((endSegment / 100) * totalFrames);

                // Set animation segment
                newAnimation.setSegment(startFrame, endFrame);

                // Swap animations when loaded
                swapAnimations();
            });

            // Set loop count
            if (loop && loopCount > 0) {
                let count = 0;
                newAnimation.addEventListener('complete', () => {
                    count += 1; // Increment loop count

                    if (count < loopCount) {
                        setTimeout(() => {
                            newAnimation.play();
                        }, 1000 * delay);

                    } else {
                        newAnimation.stop();
                    }
                });
            }

            // delay
            if (loop && delay > 0 && loopCount === 0) {
                newAnimation.addEventListener('complete', () => {
                    setTimeout(() => {
                        newAnimation.play();
                    }, 1000 * delay);
                });
            }

            // Add temp container to main container
            container.appendChild(tempContainer);
        } else {
            // For lottie-web, we need a different approach
            // Add temp container to main container first
            container.appendChild(tempContainer);

            // Basic lottie-web initialization
            newAnimation = lottie.loadAnimation({
                container: tempContainer,
                renderer: 'svg',
                loop: false, // We'll handle looping manually for better control
                autoplay: false, // We'll control playback manually
                path: lottieURl,
                rendererSettings: {
                    preserveAspectRatio: 'xMidYMid slice',
                }
            });

            // Apply segments and direction once the animation is loaded
            newAnimation.addEventListener("DOMLoaded", () => {
                const totalFrames = newAnimation.totalFrames - 1;
                const startFrame = Math.floor((startSegment / 100) * totalFrames);
                const endFrame = Math.floor((endSegment / 100) * totalFrames);

                // Set speed
                newAnimation.setSpeed(speed || 1);

                // Set direction based on reverse setting
                newAnimation.setDirection(reverse ? -1 : 1);

                // For reverse playback, we need to start from the end frame
                if (reverse) {
                    newAnimation.goToAndStop(endFrame, true);
                } else {
                    newAnimation.goToAndStop(startFrame, true);
                }

                // Define segment boundaries for future use
                newAnimation._ebSegmentStart = startFrame;
                newAnimation._ebSegmentEnd = endFrame;
                newAnimation._ebIsCustomSegment = (startFrame !== 0 || endFrame !== totalFrames);

                // Start playback for editor preview
                if (newAnimation._ebIsCustomSegment) {
                    if (reverse) {
                        newAnimation.playSegments([endFrame, startFrame], true);
                    } else {
                        newAnimation.playSegments([startFrame, endFrame], true);
                    }
                } else {
                    newAnimation.play();
                }

                // Swap animations when loaded
                swapAnimations();
            });

            // Handle loop count and delay
            newAnimation.addEventListener('complete', () => {
                // For reverse animations that just completed, the current frame should be at the start
                // For forward animations that just completed, the current frame should be at the end

                if (loop) {
                    if (loopCount > 0) {
                        // If we have a specific loop count
                        if (!newAnimation._ebLoopCount) {
                            newAnimation._ebLoopCount = 0;
                        }

                        newAnimation._ebLoopCount += 1;

                        if (newAnimation._ebLoopCount < loopCount) {
                            // Continue looping
                            setTimeout(() => {
                                if (reverse) {
                                    // For reverse, go back to end frame and play backwards
                                    if (newAnimation._ebIsCustomSegment) {
                                        newAnimation.goToAndStop(newAnimation._ebSegmentEnd, true);
                                        newAnimation.playSegments([newAnimation._ebSegmentEnd, newAnimation._ebSegmentStart], true);
                                    } else {
                                        newAnimation.goToAndStop(newAnimation.totalFrames - 1, true);
                                        newAnimation.play();
                                    }
                                } else {
                                    // For forward, go back to start frame and play forwards
                                    if (newAnimation._ebIsCustomSegment) {
                                        newAnimation.goToAndStop(newAnimation._ebSegmentStart, true);
                                        newAnimation.playSegments([newAnimation._ebSegmentStart, newAnimation._ebSegmentEnd], true);
                                    } else {
                                        newAnimation.goToAndStop(0, true);
                                        newAnimation.play();
                                    }
                                }
                            }, delay * 1000);
                        }
                    } else if (delay > 0) {
                        // Infinite loops with delay
                        setTimeout(() => {
                            if (reverse) {
                                // For reverse, go back to end frame and play backwards
                                if (newAnimation._ebIsCustomSegment) {
                                    newAnimation.goToAndStop(newAnimation._ebSegmentEnd, true);
                                    newAnimation.playSegments([newAnimation._ebSegmentEnd, newAnimation._ebSegmentStart], true);
                                } else {
                                    newAnimation.goToAndStop(newAnimation.totalFrames - 1, true);
                                    newAnimation.play();
                                }
                            } else {
                                // For forward, go back to start frame and play forwards
                                if (newAnimation._ebIsCustomSegment) {
                                    newAnimation.goToAndStop(newAnimation._ebSegmentStart, true);
                                    newAnimation.playSegments([newAnimation._ebSegmentStart, newAnimation._ebSegmentEnd], true);
                                } else {
                                    newAnimation.goToAndStop(0, true);
                                    newAnimation.play();
                                }
                            }
                        }, delay * 1000);
                    } else {
                        // Immediate loop without delay
                        if (reverse) {
                            // For reverse, go back to end frame and play backwards
                            if (newAnimation._ebIsCustomSegment) {
                                newAnimation.goToAndStop(newAnimation._ebSegmentEnd, true);
                                newAnimation.playSegments([newAnimation._ebSegmentEnd, newAnimation._ebSegmentStart], true);
                            } else {
                                newAnimation.goToAndStop(newAnimation.totalFrames - 1, true);
                                newAnimation.play();
                            }
                        } else {
                            // For forward, go back to start frame and play forwards
                            if (newAnimation._ebIsCustomSegment) {
                                newAnimation.goToAndStop(newAnimation._ebSegmentStart, true);
                                newAnimation.playSegments([newAnimation._ebSegmentStart, newAnimation._ebSegmentEnd], true);
                            } else {
                                newAnimation.goToAndStop(0, true);
                                newAnimation.play();
                            }
                        }
                    }
                }
            });
        }

        // Clean up
        return () => {
            if (newAnimation) {
                if (isLottieFile && typeof newAnimation.destroy === 'function') {
                    newAnimation.destroy();
                } else if (!isLottieFile && typeof newAnimation.destroy === 'function') {
                    newAnimation.destroy();
                }
            }

            // Remove temp container if it still exists
            if (tempContainer.parentNode) {
                tempContainer.parentNode.removeChild(tempContainer);
            }
        };
    }, [lottieURl, loop, speed, loopCount, reverse, blockId, delay, startSegment, endSegment, resOption]);

    useEffect(() => {
        lottieSource === 'url' ? setAttributes({
            lottieURl: customLottieURL ? customLottieURL : lottieURl,
            captionType: 'custom-caption'
        }) : setAttributes({
            lottieURl: lottieJSON?.url ? lottieJSON?.url : lottieURl,
        });
    }, [lottieSource])

    const selectLottieJSON = (media) => {
        if (!media || !media.url) {
            setAttributes({ lottieJSON: null });
            return;
        }

        setAttributes({
            lottieSource: 'library',
            lottieJSON: media,
            lottieURl: media.url,
            lottieMediaTitle: media.title,
            lottieMediaCaption: media.caption
        });
    };

    const selectLottieURL = (mediaURL) => {
        const lottieRegex = /^https?:\/\/lottie\.host\/[\w-]+\/[\w-]+\.(json|lottie)$/;

        if (lottieRegex.test(mediaURL)) {
            setAttributes({
                lottieURl: mediaURL, lottieSource: 'url', customLottieURL: mediaURL,
                validationMessage: ''
            });
        } else {
            setAttributes({
                validationMessage: 'Invalid Lottie'
            });
        }
    };

    const handleError = (err) => {
        setAttributes({
            validationMessage: err
        });
        console.log('Error!', err)
    }

    return (
        <>
            {isSelected && lottieURl && (
                <Inspector
                    attributes={attributes}
                    setAttributes={setAttributes}
                />
            )}

            <BlockProps.Edit {...enhancedProps}>
                {!lottieURl && (
                    <EBMediaPlaceholder
                        icon={Icon}
                        labels={{
                            title: __("Lottie Animation", "essential-blocks"),
                            instructions:
                                __("Drag media file, upload or select JSON/Lottie file from your library.", "essential-blocks"),
                        }}
                        allowedTypes={['application/json', 'application/zip']}
                        accept={['application/json', '.lottie']}
                        onSelect={selectLottieJSON}
                        onSelectURL={(value) => selectLottieURL(value)}
                        onError={handleError}
                        enableAI={false}
                    />
                )}
                {lottieURl && (
                    <div className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`} >
                        <div className={`eb-lottie-animation-wrapper ${blockId} ${version}`} data-id={blockId}>
                            <div ref={lottieAnimationRef} className="eb-lottie-animation"></div>

                            {enableTitle && (
                                <>
                                    {((captionType === 'file-caption' && lottieMediaCaption !== '') ||
                                        (captionType === 'file-title' && lottieMediaTitle !== '')) && (
                                            <p className="eb-lottie-animation-title">
                                                {captionType === 'file-caption' ? lottieMediaCaption : lottieMediaTitle}
                                            </p>
                                        )}

                                    {captionType === 'custom-caption' && (
                                        <DynamicInputValueHandler
                                            value={lottieTitle}
                                            tagName={'p'}
                                            className="eb-lottie-animation-title"
                                            placeholder="Add Caption Text Here ..."
                                            allowedFormats={[
                                                "core/bold",
                                                "core/italic",
                                                "core/link",
                                                "core/strikethrough",
                                                "core/underline",
                                                "core/text-color",
                                            ]}
                                            onChange={(lottieTitle) =>
                                                setAttributes({ lottieTitle })
                                            }
                                        />
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                )}

                {!lottieURl && validationMessage?.length > 0 && (
                    <div className="error-message" style={{ color: 'red' }}>
                        {validationMessage}
                    </div>
                )}
            </BlockProps.Edit>
        </>
    );
}
export default memo(withBlockContext(defaultAttributes)(Edit))
