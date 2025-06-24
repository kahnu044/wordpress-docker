import { RichText } from "@wordpress/block-editor";
import {
    BlockProps
} from "@essential-blocks/controls";

const Save = ({ attributes }) => {
    const {
        classHook,
        blockId,
        lottieSource,
        lottieURl,
        lottieJSON,
        speed,
        loop,
        playOn,
        loopCount,
        lottieTitle,
        enableTitle,
        lottieMediaTitle,
        lottieMediaCaption,
        captionType,
        reverse,
        delay,
        startSegment,
        endSegment,
        scrollBottomPoint,
        scrollTopPoint,
        version,
    } = attributes;

    if (!lottieURl) {
        return null;
    }

    // Settings object for the AnimationController
    const settings = {
        lottieURl,
        speed,
        loop,
        playOn,
        loopCount,
        reverse,
        delay,
        startSegment,
        endSegment,
        scrollBottomPoint,
        scrollTopPoint,
    }

    return (
        <BlockProps.Save attributes={attributes}>
            <div className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`} >
                <div className={`eb-lottie-animation-wrapper ${blockId} ${version}`}
                    data-id={blockId}
                    data-settings={JSON.stringify(settings)}
                >
                    <div className="eb-lottie-animation"></div>

                    {enableTitle && (
                        <>
                            {((captionType === 'file-caption' && lottieMediaCaption !== '') ||
                                (captionType === 'file-title' && lottieMediaTitle !== '')) && (
                                    <p className="eb-lottie-animation-title">
                                        {captionType === 'file-caption' ? lottieMediaCaption : lottieMediaTitle}
                                    </p>
                                )}
                            {captionType === 'custom-caption' && lottieTitle?.length > 0 && (
                                <RichText.Content
                                    tagName={'p'}
                                    className="eb-lottie-animation-title"
                                    value={lottieTitle}
                                />
                            )}
                        </>
                    )}
                </div>
            </div>
        </BlockProps.Save>
    );
};

export default Save;
