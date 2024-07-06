/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { Fragment, useEffect, useState, useRef, createRef } from "@wordpress/element";
import ReactPlayer from "react-player";

/**
 * Internal depencencies
 */

import Inspector from "./inspector";

const {
    EBDisplayIcon,
    BlockProps
} = window.EBControls;

import Style from "./style";

export default function Edit(props) {
    const { attributes, setAttributes, className, clientId, isSelected, name } = props;
    const {
        resOption,
        blockId,
        blockMeta,
        videoConfig,
        showBar,
        videoURL,
        previewImage,
        imageOverlay,
        customPlayIcon,
        customPlayIconURL,
        videoOptions,
        placeholderImage,
        placeholderPlayIconURL,
        stickyPosition,
        classHook,
        lightboxPlayIcon,
        placeholderCustomPlayIconType,
        customPlayIconlib,
        lightboxPlayIconType,
        lightboxPlayIconlib,
    } = attributes;

    const [didMount, setDidMount] = useState(false)

    const enhancedProps = {
        ...props,
        blockPrefix: 'eb-advanced-video',
        style: <Style {...props} />
    };

    // this useEffect is for creating a unique id for each block's unique className by a random unique number
    useEffect(() => {
        setDidMount(true)
    }, []);

    // show controls
    useEffect(() => {
        if (didMount) {
            const url = videoURL;
            setAttributes({
                videoURL: "",
                showBar: showBar,
            });
            setTimeout(() => {
                setAttributes({
                    videoURL: url,
                    // showBar: showBar,
                });
            }, 100);
        }
    }, [showBar]);

    const [preview, setPreview] = useState(false);
    useEffect(() => {
        if (imageOverlay && previewImage) {
            setPreview(previewImage);
        } else {
            setPreview(false);
        }
    }, [imageOverlay, previewImage]);

    const [videoPlayIcon, setVideoPlayIcon] = useState(null);
    useEffect(() => {
        if (customPlayIcon) {
            if (placeholderCustomPlayIconType == "image") {
                setVideoPlayIcon(<img src={customPlayIconURL} />);
            } else {
                setVideoPlayIcon(<EBDisplayIcon icon={customPlayIconlib} />);
            }
        } else {
            setVideoPlayIcon(null);
        }
    }, [customPlayIcon, customPlayIconURL, placeholderCustomPlayIconType, customPlayIconlib]);

    useEffect(() => {
        var element = document.querySelector(`#block-${clientId} .eb-selector-overlay`);
        if (element) {
            if (isSelected) {
                element.classList.add("selected");
            } else {
                element.classList.remove("selected");
            }
        }
    }, [isSelected]);

    useEffect(() => {
        if (videoConfig.autoplay && preview === false) {
            setAttributes({
                videoConfig: {
                    ...videoConfig,
                    muted: videoConfig.autoplay,
                },
            });
        }
    }, [videoConfig.autoplay]);

    return (
        <>
            {isSelected && <Inspector attributes={attributes} setAttributes={setAttributes} />}
            <BlockProps.Edit {...enhancedProps}>
                <div className="eb-selector-overlay"></div> {/* Only for Editor */}
                <div className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`}>
                    <div className={`eb-advanced-video-wrapper ${blockId} ${videoOptions}`} data-id={blockId}>
                        {videoOptions != "lightbox" && (
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
                                            {lightboxPlayIconType == "icon" && <EBDisplayIcon icon={lightboxPlayIconlib} />}
                                            {lightboxPlayIconType == "image" && placeholderPlayIconURL && (
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
}
