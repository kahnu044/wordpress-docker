/**
 * WordPress dependencies
 */
import { RichText, useBlockProps } from "@wordpress/block-editor";

import attributes from "./attributes";

const deprecated = [
    {
        attributes: {
            ...attributes
        },
        supports: {
            anchor: true,
        },
        save: (props) => {
            const { attributes } = props
            const {
                blockId,
                videoConfig,
                showBar,
                videoURL,
                videoOptions,
                placeholderImage,
                placeholderPlayIconURL,
                stickyPosition,
                imageOverlay,
                previewImage,
                lightboxPlayIcon,
                customPlayIcon,
                customPlayIconURL,
                classHook,
            } = attributes;

            return (
                <div {...useBlockProps.save()}>
                    <div className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`}>
                        <div
                            className={`eb-advanced-video-wrapper ${blockId} ${videoOptions}`}
                            data-id={blockId}
                        >
                            {videoOptions != "lightbox" && (
                                <div className={`eb-player-wrapper ${blockId}`}>
                                    <div
                                        className={`eb-player-option ${videoOptions} ${stickyPosition}`}
                                        data-id={blockId}
                                        data-url={videoURL}
                                        data-option={videoOptions}
                                        data-controls={showBar}
                                        data-loop={videoConfig.loop}
                                        data-muted={videoConfig.muted}
                                        data-playing={videoConfig.autoplay}
                                        data-overlay={imageOverlay}
                                        data-light={
                                            previewImage && previewImage.length > 0 ? previewImage : false
                                        }
                                        data-customPlayIcon={customPlayIcon}
                                        data-playicon={
                                            customPlayIconURL && customPlayIconURL.length > 0
                                                ? customPlayIconURL
                                                : null
                                        }
                                    ></div>
                                </div>
                            )}

                            {videoOptions === "lightbox" && (
                                <>
                                    <div
                                        id={`myBtn-${blockId}`}
                                        className="player-placeholder"
                                        style={{
                                            backgroundImage: "url( " + placeholderImage + ")",
                                        }}
                                    >
                                        {lightboxPlayIcon && placeholderPlayIconURL && (
                                            <img alt="" />
                                        )}
                                    </div>

                                    <div id={`eb-modal-${blockId}`} className="eb-modal-player">
                                        <div className="eb-player-wrapper">
                                            <span id={`close-${blockId}`} class="eb-modal-close">
                                                &times;
                                            </span>
                                            <div
                                                className={`eb-player-option ${videoOptions}`}
                                                data-id={blockId}
                                                data-url={videoURL}
                                                data-option={videoOptions}
                                                data-loop={videoConfig.loop}
                                                data-muted={videoConfig.muted}
                                                data-playing={false}
                                                data-overlay={imageOverlay}
                                                data-controls={showBar}
                                                data-autoplay="true"
                                            ></div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            );
        }
    }
];

export default deprecated;
