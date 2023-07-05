/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
    MediaUpload,
    MediaPlaceholder,
    RichText,
    BlockControls,
    useBlockProps,
    BlockAlignmentToolbar,
} from "@wordpress/block-editor";
import {
    ToolbarGroup,
    ToolbarItem,
    ToolbarButton,
    Button,
} from "@wordpress/components";
import {
    Fragment,
    useEffect,
    useState,
    useRef,
    createRef,
} from "@wordpress/element";
import { select } from "@wordpress/data";
import ReactPlayer from "react-player";

/**
 * Internal depencencies
 */
import classnames from "classnames";

import Inspector from "./inspector";
import {
    WRAPPER_BG,
    WRAPPER_MARGIN,
    WRAPPER_PADDING,
    WRAPPER_BORDER_SHADOW,
    VIDEO_WIDTH,
    VIDEO_BORDER_SHADOW,
    PLAY_ICON_WIDTH,
    LIGHTBOX_WIDTH,
    LIGHTBOX_HEIGHT,
    LIGHTBOX_BORDER_SHADOW,
    CLOSE_ICON_WIDTH,
    STICKY_VIDEO_HEIGHT,
    STICKY_VIDEO_WIDTH,
    PLACEHOLDER_IMAGE_WIDTH,
    PLACEHOLDER_IMAGE_HEIGHT,
    PLACEHOLDER_PLAY_ICON_WIDTH,
} from "./constants";
import { isEmpty } from "lodash";

const {
    softMinifyCssStrings,
    generateTypographyStyles,
    generateDimensionsControlStyles,
    generateBorderShadowStyles,
    generateResponsiveRangeStyles,
    generateBackgroundControlStyles,
    // mimmikCssForPreviewBtnClick,
    duplicateBlockIdFix,
} = window.EBControls;

export default function Edit(props) {
    const {
        attributes,
        setAttributes,
        className,
        clientId,
        isSelected,
    } = props;
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
        customPlayIconId,
        customPlayIconURL,
        videoOptions,
        placeholderImage,
        placeholderPlayIconURL,
        lightboxBGColor,
        closeIconColor,
        closeIconWidthRange,
        stickyPosition,
        classHook,
        closeIconBgColor,
        lightboxPlayIcon,
        videoAlignment,
        placeholderCustomPlayIconType,
        customPlayIconlib,
        customPlayIconlibColor,
        lightboxPlayIconType,
        lightboxPlayIconlib,
        lightboxPlayIconlibColor,
    } = attributes;

    // this useEffect is for creating a unique id for each block's unique className by a random unique number
    useEffect(() => {
        const BLOCK_PREFIX = "eb-advanced-video";
        duplicateBlockIdFix({
            BLOCK_PREFIX,
            blockId,
            setAttributes,
            select,
            clientId,
        });
    }, []);

    const blockProps = useBlockProps({
        className: classnames(className, `eb-guten-block-main-parent-wrapper`),
    });

    /**
     * CSS/styling Codes Starts from Here
     */

    /* Wrapper Margin */
    const {
        dimensionStylesDesktop: wrapperMarginDesktop,
        dimensionStylesTab: wrapperMarginTab,
        dimensionStylesMobile: wrapperMarginMobile,
    } = generateDimensionsControlStyles({
        controlName: WRAPPER_MARGIN,
        styleFor: "margin",
        attributes,
    });

    /* Wrapper Padding */
    const {
        dimensionStylesDesktop: wrapperPaddingDesktop,
        dimensionStylesTab: wrapperPaddingTab,
        dimensionStylesMobile: wrapperPaddingMobile,
    } = generateDimensionsControlStyles({
        controlName: WRAPPER_PADDING,
        styleFor: "padding",
        attributes,
    });

    // range controller Separator Line Width
    const {
        rangeStylesDesktop: videoWidthDesktop,
        rangeStylesTab: videoWidthTab,
        rangeStylesMobile: videoWidthMobile,
    } = generateResponsiveRangeStyles({
        controlName: VIDEO_WIDTH,
        property: "",
        attributes,
    });

    // range controller Separator Line Width
    const {
        rangeStylesDesktop: playIconWidthDesktop,
        rangeStylesTab: playIconWidthTab,
        rangeStylesMobile: playIconWidthMobile,
    } = generateResponsiveRangeStyles({
        controlName: PLAY_ICON_WIDTH,
        property: "",
        attributes,
    });

    // range controller Separator Line Grid Column Margin Bottom
    const {
        rangeStylesDesktop: stickyVideoWidthDesktop,
        rangeStylesTab: stickyVideoWidthTab,
        rangeStylesMobile: stickyVideoWidthMobile,
    } = generateResponsiveRangeStyles({
        controlName: STICKY_VIDEO_WIDTH,
        property: "",
        attributes,
    });

    // range controller Separator Line Grid Column Margin Bottom
    const {
        rangeStylesDesktop: stickyVideoHeightDesktop,
        rangeStylesTab: stickyVideoHeightTab,
        rangeStylesMobile: stickyVideoHeightMobile,
    } = generateResponsiveRangeStyles({
        controlName: STICKY_VIDEO_HEIGHT,
        property: "",
        attributes,
    });

    // range controller Separator Line Grid Column Margin Bottom
    const {
        rangeStylesDesktop: placeholderWidthDesktop,
        rangeStylesTab: placeholderWidthTab,
        rangeStylesMobile: placeholderWidthMobile,
    } = generateResponsiveRangeStyles({
        controlName: PLACEHOLDER_IMAGE_WIDTH,
        property: "",
        attributes,
    });
    // range controller Separator Line Grid Column Margin Bottom
    const {
        rangeStylesDesktop: placeholderHeightDesktop,
        rangeStylesTab: placeholderHeightTab,
        rangeStylesMobile: placeholderHeightMobile,
    } = generateResponsiveRangeStyles({
        controlName: PLACEHOLDER_IMAGE_HEIGHT,
        property: "",
        attributes,
    });

    // range controller Separator Line Grid Column Margin Bottom
    const {
        rangeStylesDesktop: placeholderPlayIconWidthDesktop,
        rangeStylesTab: placeholderPlayIconWidthTab,
        rangeStylesMobile: placeholderPlayIconWidthMobile,
    } = generateResponsiveRangeStyles({
        controlName: PLACEHOLDER_PLAY_ICON_WIDTH,
        property: "",
        attributes,
    });

    // range controller Separator Line Grid Column Margin Bottom
    const {
        rangeStylesDesktop: lightboxWidthDesktop,
        rangeStylesTab: lightboxWidthTab,
        rangeStylesMobile: lightboxWidthMobile,
    } = generateResponsiveRangeStyles({
        controlName: LIGHTBOX_WIDTH,
        property: "",
        attributes,
    });
    // range controller Separator Line Grid Column Margin Bottom
    const {
        rangeStylesDesktop: lightboxHeightDesktop,
        rangeStylesTab: lightboxHeightTab,
        rangeStylesMobile: lightboxHeightMobile,
    } = generateResponsiveRangeStyles({
        controlName: LIGHTBOX_HEIGHT,
        property: "",
        attributes,
    });

    // generateBorderShadowStyles for Lightbox ⬇
    const {
        styesDesktop: lightboxBDShadowDesktop,
        styesTab: lightboxBDShadowTab,
        styesMobile: lightboxBDShadowMobile,
        stylesHoverDesktop: lightboxBDShadowHoverDesktop,
        stylesHoverTab: lightboxBDShadowHoverTab,
        stylesHoverMobile: lightboxBDShadowHoverMobile,
        transitionStyle: lightboxBDShadowTransitionStyle,
    } = generateBorderShadowStyles({
        controlName: LIGHTBOX_BORDER_SHADOW,
        attributes,
        // noShadow: true,
        // noBorder: true,
    });

    // range controller Separator Line Grid Column Margin Bottom
    const {
        rangeStylesDesktop: closeIconWidthDesktop,
        rangeStylesTab: closeIconWidthTab,
        rangeStylesMobile: closeIconWidthMobile,
    } = generateResponsiveRangeStyles({
        controlName: CLOSE_ICON_WIDTH,
        property: "",
        attributes,
    });

    //Generate Background
    const {
        backgroundStylesDesktop: wrapperBackgroundStylesDesktop,
        hoverBackgroundStylesDesktop: wrapperHoverBackgroundStylesDesktop,
        backgroundStylesTab: wrapperBackgroundStylesTab,
        hoverBackgroundStylesTab: wrapperHoverBackgroundStylesTab,
        backgroundStylesMobile: wrapperBackgroundStylesMobile,
        hoverBackgroundStylesMobile: wrapperHoverBackgroundStylesMobile,
        bgTransitionStyle: wrapperBgTransitionStyle,
    } = generateBackgroundControlStyles({
        attributes,
        controlName: WRAPPER_BG,
        noOverlay: true,
    });

    // generateBorderShadowStyles for Wrapper ⬇
    const {
        styesDesktop: wrapperBDShadowDesktop,
        styesTab: wrapperBDShadowTab,
        styesMobile: wrapperBDShadowMobile,
        stylesHoverDesktop: wrapperBDShadowHoverDesktop,
        stylesHoverTab: wrapperBDShadowHoverTab,
        stylesHoverMobile: wrapperBDShadowHoverMobile,
        transitionStyle: wrapperBDShadowTransitionStyle,
    } = generateBorderShadowStyles({
        controlName: WRAPPER_BORDER_SHADOW,
        attributes,
        // noShadow: true,
        // noBorder: true,
    });

    // generateBorderShadowStyles for Images ⬇
    const {
        styesDesktop: videoBDShadowDesktop,
        styesTab: videoBDShadowTab,
        styesMobile: videoBDShadowMobile,
        stylesHoverDesktop: videoBDShadowHoverDesktop,
        stylesHoverTab: videoBDShadowHoverTab,
        stylesHoverMobile: videoBDShadowHoverMobile,
        transitionStyle: videoBDShadowTransitionStyle,
    } = generateBorderShadowStyles({
        controlName: VIDEO_BORDER_SHADOW,
        attributes,
        // noShadow: true,
        // noBorder: true,
    });

    let closePosition = closeIconWidthRange + 25;

    // wrapper styles css in strings ⬇
    const wrapperStylesDesktop = `
		.eb-advanced-video-wrapper.${blockId}{
			${wrapperMarginDesktop}
			${wrapperPaddingDesktop}
			${wrapperBDShadowDesktop}
			${wrapperBackgroundStylesDesktop}
			transition:${wrapperBgTransitionStyle}, ${wrapperBDShadowTransitionStyle};
		}
		.eb-advanced-video-wrapper.${blockId}:hover {
			${wrapperBDShadowHoverDesktop}
			${wrapperHoverBackgroundStylesDesktop}
		}
        .eb-advanced-video-wrapper.${blockId} .eb-player-wrapper {
            ${"left" == videoAlignment ? `margin: 0 auto 0 0;` : ""}
            ${"center" == videoAlignment ? `margin: 0 auto;` : ""}
            ${"right" == videoAlignment ? `margin: 0 0 0 auto;` : ""}
        }
	`;
    const wrapperStylesTab = `
		.eb-advanced-video-wrapper.${blockId}{
			${wrapperMarginTab}
			${wrapperPaddingTab}
			${wrapperBDShadowTab}
			${wrapperBackgroundStylesTab}
		}
		.eb-advanced-video-wrapper.${blockId}:hover {
			${wrapperBDShadowHoverTab}
			${wrapperHoverBackgroundStylesTab}
		}
	`;
    const wrapperStylesMobile = `
		.eb-advanced-video-wrapper.${blockId}{
			${wrapperMarginMobile}
			${wrapperPaddingMobile}
			${wrapperBDShadowMobile}
			${wrapperBackgroundStylesMobile}
		}
		.eb-advanced-video-wrapper.${blockId}:hover {
			${wrapperBDShadowHoverMobile}
			${wrapperHoverBackgroundStylesMobile}
		}
	`;

    const videoStylesDesktop = `
		.eb-advanced-video-wrapper.${blockId} .eb-player-wrapper{
			width${videoWidthDesktop || ": auto"};
			transition: transform 0.5s, ${videoBDShadowTransitionStyle};
		}

		.eb-advanced-video-wrapper.${blockId} .eb-react-player iframe {
			${videoBDShadowDesktop}
		}

		.eb-advanced-video-wrapper.${blockId} .eb-react-player iframe:hover {
			${videoBDShadowHoverDesktop}
		}

		.eb-advanced-video-wrapper.${blockId} .react-player__preview {
			${videoBDShadowDesktop}
		}

		.eb-advanced-video-wrapper.${blockId} .eb-react-player .react-player__preview:hover {
			${videoBDShadowHoverDesktop}
		}

		.eb-advanced-video-wrapper.${blockId} .eb-react-player .react-player__preview img {
			width${playIconWidthDesktop || ": auto"};
		}
		.eb-advanced-video-wrapper.${blockId} .eb-react-player .react-player__preview i {
			font-size${playIconWidthDesktop || ": 60px"};
            color: ${customPlayIconlibColor}
		}

		.eb-advanced-video-wrapper.${blockId} .eb-player-option.sticky.stuck {
			width${stickyVideoWidthDesktop};
			height${stickyVideoHeightDesktop};
		}

		.eb-advanced-video-wrapper.${blockId} .player-placeholder{
			width${placeholderWidthDesktop};
			height${placeholderHeightDesktop};
			${videoBDShadowDesktop}
		}
		.eb-advanced-video-wrapper.${blockId} .player-placeholder:hover {
			${videoBDShadowHoverDesktop}
		}
		.eb-advanced-video-wrapper.${blockId} .player-placeholder img{
			width${placeholderPlayIconWidthDesktop};
		}
		.eb-advanced-video-wrapper.${blockId} .player-placeholder i{
			font-size${placeholderPlayIconWidthDesktop};
            color: ${lightboxPlayIconlibColor}
		}

		.eb-advanced-video-wrapper.${blockId}.lightbox .eb-player-wrapper {
			width${lightboxWidthDesktop};

		}
		.eb-advanced-video-wrapper.${blockId} .eb-player-option.lightbox {
			width: 100%;
			height${lightboxHeightDesktop};
			${lightboxBDShadowDesktop}
		}
		.eb-advanced-video-wrapper.${blockId} .eb-modal-player {
			background-color: ${lightboxBGColor};
		}
		.eb-advanced-video-wrapper.${blockId} .eb-modal-player .eb-modal-close {
			font-size${closeIconWidthDesktop};
			line-height${closeIconWidthDesktop};
			width${closeIconWidthDesktop};
			height${closeIconWidthDesktop};
			color: ${closeIconColor};
			background-color: ${closeIconBgColor};
		}
	`;

    const videoStylesTab = `
		.eb-advanced-video-wrapper.${blockId} .eb-player-wrapper{
			width${videoWidthTab || ": auto"};
		}

		.eb-advanced-video-wrapper.${blockId} .eb-react-player iframe {
			${videoBDShadowTab}
		}

		.eb-advanced-video-wrapper.${blockId} .eb-react-player iframe:hover {
			${videoBDShadowHoverTab}
		}
		.eb-advanced-video-wrapper.${blockId} .react-player__preview {
			${videoBDShadowTab}
		}

		.eb-advanced-video-wrapper.${blockId} .eb-react-player .react-player__preview:hover {
			${videoBDShadowHoverTab}
		}

		.eb-advanced-video-wrapper.${blockId} .eb-react-player .react-player__preview img {
			width${playIconWidthTab || playIconWidthDesktop};
		}
        .eb-advanced-video-wrapper.${blockId} .eb-react-player .react-player__preview i {
			font-size${playIconWidthTab || playIconWidthDesktop};
		}

		.eb-advanced-video-wrapper.${blockId} .eb-player-option.sticky.stuck {
			width${stickyVideoWidthTab};
			height${stickyVideoHeightTab};
		}

		.eb-advanced-video-wrapper.${blockId} .player-placeholder{
			width${placeholderWidthTab};
			height${placeholderHeightTab};
			${videoBDShadowTab}
		}
		.eb-advanced-video-wrapper.${blockId} .player-placeholder:hover {
			${videoBDShadowHoverTab}
		}
		.eb-advanced-video-wrapper.${blockId} .player-placeholder img{
			width${placeholderPlayIconWidthTab};
		}
        .eb-advanced-video-wrapper.${blockId} .player-placeholder i{
			font-size${placeholderPlayIconWidthTab};
		}

		.eb-advanced-video-wrapper.${blockId}.lightbox .eb-player-wrapper {
			width${lightboxWidthTab};

		}
		.eb-advanced-video-wrapper.${blockId} .eb-player-option.lightbox {
			height${lightboxHeightTab};
			${lightboxBDShadowTab}
		}
		.eb-advanced-video-wrapper.${blockId} .eb-modal-player .eb-modal-close {
			font-size${closeIconWidthTab};
			line-height${closeIconWidthTab};
			width${closeIconWidthTab};
			height${closeIconWidthTab};
		}

	`;

    const videoStylesMobile = `
		.eb-advanced-video-wrapper.${blockId} .eb-player-wrapper{
			width${videoWidthMobile || ": auto"};
		}

		.eb-advanced-video-wrapper.${blockId} .eb-react-player iframe {
			${videoBDShadowMobile}
		}

		.eb-advanced-video-wrapper.${blockId} .eb-react-player iframe:hover {
			${videoBDShadowHoverMobile}
		}
		.eb-advanced-video-wrapper.${blockId} .react-player__preview {
			${videoBDShadowMobile}
		}

		.eb-advanced-video-wrapper.${blockId} .eb-react-player .react-player__preview:hover {
			${videoBDShadowHoverMobile}
		}

		.eb-advanced-video-wrapper.${blockId} .eb-react-player .react-player__preview img {
			width${playIconWidthMobile || playIconWidthTab};
		}
        .eb-advanced-video-wrapper.${blockId} .eb-react-player .react-player__preview i {
			font-size${playIconWidthMobile || playIconWidthMobile};
		}

		.eb-advanced-video-wrapper.${blockId} .eb-player-option.sticky.stuck {
			width${stickyVideoWidthMobile};
			height${stickyVideoHeightMobile};
		}

		.eb-advanced-video-wrapper.${blockId} .player-placeholder{
			width${placeholderWidthMobile};
			height${placeholderHeightMobile};
			${videoBDShadowMobile}
		}
		.eb-advanced-video-wrapper.${blockId} .player-placeholder:hover {
			${videoBDShadowHoverMobile}
		}
		.eb-advanced-video-wrapper.${blockId} .player-placeholder img{
			width${placeholderPlayIconWidthMobile};
		}
        .eb-advanced-video-wrapper.${blockId} .player-placeholder i{
			font-size${placeholderPlayIconWidthMobile};
		}

		.eb-advanced-video-wrapper.${blockId}.lightbox .eb-player-wrapper {
			width${lightboxWidthMobile};

		}
		.eb-advanced-video-wrapper.${blockId} .eb-player-option.lightbox {
			height${lightboxHeightMobile};
			${lightboxBDShadowMobile}
		}
		.eb-advanced-video-wrapper.${blockId} .eb-modal-player .eb-modal-close {
			font-size${closeIconWidthMobile};
			line-height${closeIconWidthMobile};
			width${closeIconWidthMobile};
			height${closeIconWidthMobile};
		}
	`;

    // all css styles for large screen width (desktop/laptop) in strings ⬇
    const desktopAllStyles = softMinifyCssStrings(`
		${wrapperStylesDesktop}
		${videoStylesDesktop}
	`);

    // all css styles for Tab in strings ⬇
    const tabAllStyles = softMinifyCssStrings(`
		${wrapperStylesTab}
		${videoStylesTab}
	`);

    // all css styles for Mobile in strings ⬇
    const mobileAllStyles = softMinifyCssStrings(`
		${wrapperStylesMobile}
		${videoStylesMobile}
	`);

    // Set All Style in "blockMeta" Attribute
    useEffect(() => {
        const styleObject = {
            desktop: desktopAllStyles,
            tab: tabAllStyles,
            mobile: mobileAllStyles,
        };
        if (JSON.stringify(blockMeta) != JSON.stringify(styleObject)) {
            setAttributes({ blockMeta: styleObject });
        }
    }, [attributes]);

    // show controls
    useEffect(() => {
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
        }, 10);
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
                setVideoPlayIcon(<i className={customPlayIconlib}></i>);
            }
        } else {
            setVideoPlayIcon(null);
        }
    }, [
        customPlayIcon,
        customPlayIconURL,
        placeholderCustomPlayIconType,
        customPlayIconlib,
    ]);

    useEffect(() => {
        var element = document.querySelector(
            `#block-${clientId} .eb-selector-overlay`
        );
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
            {isSelected && (
                <Inspector
                    attributes={attributes}
                    setAttributes={setAttributes}
                />
            )}
            <div {...blockProps}>
                <div className="eb-selector-overlay"></div>{" "}
                {/* Only for Editor */}
                <style>
                    {`
					/* Only for This Editor */
					.eb-selector-overlay {
						position: absolute;
						left: 0;
						top: 0;
						width: 100%;
						height: 100%;
						z-index: 9999;
					}
					.eb-selector-overlay.selected {
						display: none;
					}
				${desktopAllStyles}

				/* mimmikcssStart */

				${resOption === "Tablet" ? tabAllStyles : " "}
				${resOption === "Mobile" ? tabAllStyles + mobileAllStyles : " "}

				/* mimmikcssEnd */

				@media all and (max-width: 1024px) {

					/* tabcssStart */
					${softMinifyCssStrings(tabAllStyles)}
					/* tabcssEnd */

				}

				@media all and (max-width: 767px) {

					/* mobcssStart */
					${softMinifyCssStrings(mobileAllStyles)}
					/* mobcssEnd */

				}
				`}
                </style>
                <div
                    className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`}
                >
                    <div
                        className={`eb-advanced-video-wrapper ${blockId} ${videoOptions}`}
                        data-id={blockId}
                    >
                        {videoOptions != "lightbox" && (
                            <div className="eb-player-wrapper">
                                <div
                                    className={`eb-player-option ${videoOptions} ${stickyPosition}`}
                                >
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
                                        // playIcon="<img href='http://localhost:10033/wp-content/uploads/2022/04/scroll-demo-icon.svg' />"
                                        className="eb-react-player"
                                        // playing
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
                                        backgroundImage:
                                            "url( " + placeholderImage + ")",
                                    }}
                                >
                                    {lightboxPlayIcon && (
                                        <>
                                            {lightboxPlayIconType == "icon" && (
                                                <i
                                                    className={
                                                        lightboxPlayIconlib
                                                    }
                                                />
                                            )}
                                            {lightboxPlayIconType == "image" &&
                                                placeholderPlayIconURL && (
                                                    <img
                                                        src={
                                                            placeholderPlayIconURL
                                                        }
                                                        alt=""
                                                    />
                                                )}
                                        </>
                                    )}
                                </div>

                                <div id="eb-modal" className="eb-modal-player">
                                    <span className="eb-modal-close">
                                        &times;
                                    </span>
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
            </div>
        </>
    );
}
