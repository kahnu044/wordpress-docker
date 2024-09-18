/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useEffect, useState, memo } from "@wordpress/element";
import ReactPlayer from "react-player";

/**
 * Internal depencencies
 */

import Inspector from "./inspector";

import {
    EBDisplayIcon,
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
    } = attributes;

    const [preview, setPreview] = useState(false);
    const [videoPlayIcon, setVideoPlayIcon] = useState(null);

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
                                    <ReactPlayer
                                        url={videoURL}
                                        loop={videoConfig.loop}
                                        muted={videoConfig.muted}
                                        playing={videoConfig.autoplay}
                                        controls={showBar}
                                        light={preview}
                                        playIcon={videoPlayIcon}
                                        onClickPreview={() => {
                                            setAttributes({
                                                videoConfig: {
                                                    ...videoConfig,
                                                    autoplay: true,
                                                },
                                            });
                                        }}
                                        className="eb-react-player"
                                        width="100%"
                                        height="100%"
                                    />
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
                                            {lightboxPlayIconType === "icon" && <EBDisplayIcon icon={lightboxPlayIconlib} />}
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
