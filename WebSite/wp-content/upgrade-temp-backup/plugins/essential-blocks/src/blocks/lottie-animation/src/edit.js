/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { memo, useEffect, useRef } from "@wordpress/element";
import {
    MediaPlaceholder,
} from "@wordpress/block-editor";

/**
 * Internal depencencies
 */

import Inspector from "./inspector";
import Style from "./style";
import defaultAttributes from './attributes'

/**
 * External depencencies
 */
import {
    BlockProps,
    withBlockContext,
    DynamicInputValueHandler
} from "@essential-blocks/controls";
import { ReactComponent as Icon } from "./icon.svg";
import { DotLottie } from '@lottiefiles/dotlottie-web';


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
    }, [])

    useEffect(() => {
        const container = lottieAnimationRef.current || document.querySelector(`.${blockId} .eb-lottie-animation`);
        if (!container) return;

        // Initialize DotLottie with the canvas element
        const animation = new DotLottie({
            speed: speed,
            mode: reverse ? 'reverse' : 'forward',
            autoplay: true,
            loop: loop && loopCount > 0 ? false : loop,
            canvas: container, // Pass the canvas element
            src: lottieURl, // Provide the .lottie or .json file URL
        });

        // Apply segments once the animation is loaded
        animation.addEventListener("load", () => {
            const totalFrames = animation.totalFrames - 1;
            const startFrame = Math.floor((startSegment / 100) * totalFrames);
            const endFrame = Math.floor((endSegment / 100) * totalFrames);

            // Set animation segment
            animation.setSegment(startFrame, endFrame);
        });

        // Set loop count
        if (loop && loopCount > 0) {
            let count = 0;
            animation.addEventListener('complete', () => {
                count += 1; // Increment loop count

                if (count < loopCount) {
                    setTimeout(() => {
                        animation.play();
                    }, 1000 * delay);

                } else {
                    animation.stop();
                }
            });
        }

        // delay
        if (loop && delay > 0 && loopCount === 0) {
            animation.addEventListener('complete', () => {
                setTimeout(() => {
                    animation.play();
                }, 1000 * delay);
            });
        }

        return () => {
            animation.destroy(); // Properly destroy the DotLottie instance
        };
    }, [lottieURl, loop, speed, loopCount, reverse, blockId, delay, startSegment, endSegment, resOption])

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
                    <MediaPlaceholder
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
                    />
                )}
                {lottieURl && (
                    <div className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`} >
                        <div className={`eb-lottie-animation-wrapper ${blockId}`} data-id={blockId}>
                            <canvas ref={lottieAnimationRef} className="eb-lottie-animation"></canvas>

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
