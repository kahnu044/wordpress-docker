/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useEffect, useState, memo } from "@wordpress/element";
import { SandBox, Spinner } from "@wordpress/components";
import { useSelect } from "@wordpress/data";
import { store as coreStore } from "@wordpress/core-data";

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
        customPlayIconlib
    } = attributes;

    const [preview, setPreview] = useState(imageOverlay && previewImage ? previewImage : false);
    const [videoPlayIcon, setVideoPlayIcon] = useState(customPlayIcon && customPlayIconURL ? <img src={customPlayIconURL} alt="" /> : (customPlayIcon ? <EBDisplayIconEdit icon={customPlayIconlib} /> : null));
    const [overlayClicked, setOverlayClicked] = useState(false);

    // Use WordPress oEmbed API to get embed HTML (same approach as core embed block)
    const { embedPreview, isFetching } = useSelect(
        (select) => {
            if (!videoURL) {
                return { embedPreview: undefined, isFetching: false };
            }
            const { getEmbedPreview, isRequestingEmbedPreview } = select(coreStore);
            return {
                embedPreview: getEmbedPreview(videoURL),
                isFetching: isRequestingEmbedPreview(videoURL),
            };
        },
        [videoURL]
    );

    // Modify embed HTML to respect block settings (showBar, autoplay, loop, muted)
    const embedHtml = (() => {
        let html = embedPreview?.html;
        if (!html) return html;

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
            if (videoConfig.autoplay || overlayClicked) {
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

            // Muted
            if (videoConfig.muted || overlayClicked) {
                url.searchParams.set('mute', '1');
                url.searchParams.set('muted', '1');
            } else {
                url.searchParams.delete('mute');
                url.searchParams.delete('muted');
            }

            return before + url.toString() + after;
        });

        return html;
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
                                        {embedHtml && !preview && (
                                            <SandBox
                                                html={embedHtml}
                                                title={__('Video Preview', 'essential-blocks')}
                                                type={`embed eb-sandbox-video ${blockId} wp-embed-aspect-16-9 wp-has-aspect-ratio`}
                                            />
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
                                        {!embedHtml && !isFetching && !preview && (
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
                                                <p>{__('Enter a valid video URL', 'essential-blocks')}</p>
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
                    </div>
                </div>
            </BlockProps.Edit >
        </>
    );
};

export default memo(withBlockContext(defaultAttributes)(Edit))
