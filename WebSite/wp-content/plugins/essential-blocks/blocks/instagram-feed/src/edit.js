import { __ } from "@wordpress/i18n";
import { useState, useEffect } from "@wordpress/element";
import {
    useBlockProps,
    BlockControls,
    MediaUpload,
} from "@wordpress/block-editor";
import {
    Spinner,
    ToolbarGroup,
    ToolbarButton,
    ExternalLink,
} from "@wordpress/components";
import { select } from "@wordpress/data";
/**
 * Internal Import
 */
import classnames from "classnames";

import Inspector from "./inspector";

const {
    softMinifyCssStrings,
    mimmikCssForPreviewBtnClick,
    duplicateBlockIdFix,
    generateDimensionsControlStyles,
    generateBorderShadowStyles,
    generateTypographyStyles,
    generateResponsiveRangeStyles,
} = window.EBControls;

import {
    NUMBER_OF_COLUMNS,
    GRID_GAP,
    IMAGE_BORDER,
    WRAPPER_MARGIN,
    WRAPPER_PADDING,
} from "./constants";
import {
    typoPrefix_caption,
    typoPrefix_meta,
    typoPrefix_header,
} from "./constants/typographyPrefixConstants";

const edit = (props) => {
    const {
        attributes,
        setAttributes,
        className,
        clientId,
        isSelected,
    } = props;
    const {
        blockId,
        blockMeta,
        // responsive control attribute ⬇
        resOption,
        token,
        layout,
        overlayStyle,
        cardStyle,
        thumbs,
        numberOfImages,
        hasEqualImages,
        showCaptions,
        captionColor,
        metaColor,
        headerColor,
        overlayColor,
        showProfileImg,
        profileImg,
        imageID,
        showProfileName,
        profileName,
        sortBy,
        preview,
        showMeta,
        classHook,
    } = attributes;

    const [loading, setLoading] = useState(true);
    const [responseCode, setResponseCode] = useState(undefined);
    const [errorMessage, setErrorMessage] = useState("");

    // number of columns
    const {
        rangeStylesDesktop: numberOfColumnsDesktop,
        rangeStylesTab: numberOfColumnsTab,
        rangeStylesMobile: numberOfColumnsMobile,
    } = generateResponsiveRangeStyles({
        controlName: NUMBER_OF_COLUMNS,
        property: "",
        attributes,
        customUnit: "",
    });

    // padding between images
    const {
        dimensionStylesDesktop: gridGapDesktop,
        dimensionStylesTab: gridGapTab,
        dimensionStylesMobile: gridGapMobile,
    } = generateDimensionsControlStyles({
        controlName: GRID_GAP,
        styleFor: "padding",
        attributes,
    });

    // border & shadow
    const {
        styesDesktop: imageBdShadowStyesDesktop,
        styesTab: imageBdShadowStyesTab,
        styesMobile: imageBdShadowStyesMobile,
        stylesHoverDesktop: imageBdShadowStylesHoverDesktop,
        stylesHoverTab: imageBdShadowStylesHoverTab,
        stylesHoverMobile: imageBdShadowStylesHoverMobile,
        transitionStyle: imageBdShadowTransitionStyle,
    } = generateBorderShadowStyles({
        controlName: IMAGE_BORDER,
        attributes,
    });

    // caption typography
    const {
        typoStylesDesktop: captionTypoStylesDesktop,
        typoStylesTab: captionTypoStylesTab,
        typoStylesMobile: captionTypoStylesMobile,
    } = generateTypographyStyles({
        attributes,
        prefixConstant: typoPrefix_caption,
    });

    // meta typography
    const {
        typoStylesDesktop: metaTypoStylesDesktop,
        typoStylesTab: metaTypoStylesTab,
        typoStylesMobile: metaTypoStylesMobile,
    } = generateTypographyStyles({
        attributes,
        prefixConstant: typoPrefix_meta,
    });

    // header typography
    const {
        typoStylesDesktop: headerTypoStylesDesktop,
        typoStylesTab: headerTypoStylesTab,
        typoStylesMobile: headerTypoStylesMobile,
    } = generateTypographyStyles({
        attributes,
        prefixConstant: typoPrefix_header,
    });

    // wrapper margin
    const {
        dimensionStylesDesktop: wrapperMarginStylesDesktop,
        dimensionStylesTab: wrapperMarginStylesTab,
        dimensionStylesMobile: wrapperMarginStylesMobile,
    } = generateDimensionsControlStyles({
        controlName: WRAPPER_MARGIN,
        styleFor: "margin",
        attributes,
    });

    // wrapper padding
    const {
        dimensionStylesDesktop: wrapperPaddingStylesDesktop,
        dimensionStylesTab: wrapperPaddingStylesTab,
        dimensionStylesMobile: wrapperPaddingStylesMobile,
    } = generateDimensionsControlStyles({
        controlName: WRAPPER_PADDING,
        styleFor: "padding",
        attributes,
    });

    const desktopStyles = `
		.eb-instagram-wrapper.${blockId} {
			${wrapperMarginStylesDesktop}
			${wrapperPaddingStylesDesktop}
		}

		.eb-instagram-wrapper.${blockId} .instagram__gallery__col {
			${gridGapDesktop}
			width: calc((100% / ${numberOfColumnsDesktop.replace(/[^0-9]/g, "")}) - 20px );
		}

		.eb-instagram-wrapper.${blockId} .instagram__gallery__item {
			${imageBdShadowStyesDesktop}
			overflow: hidden;
			transition: ${imageBdShadowTransitionStyle};
		}

		.eb-instagram-wrapper.${blockId}:hover .instagram__gallery__item {
			${imageBdShadowStylesHoverDesktop}
		}

		.eb-instagram-wrapper.${blockId} .eb-instagram-caption p {
			${captionTypoStylesDesktop}
			${captionColor ? `color: ${captionColor};` : ""}
		}

		.eb-instagram-wrapper.${blockId} .eb-instagram-meta .eb-instagram-date {
			${metaTypoStylesDesktop}
		}

		${
            metaColor
                ? `.eb-instagram-wrapper.${blockId} .eb-instagram-meta span {
			color: ${metaColor};
		}`
                : ""
        }

		${
            overlayColor
                ? `.eb-instagram-wrapper.${blockId} .instagram__gallery__item.instagram__gallery__item--overlay__simple .instagram__gallery__thumb::before,
		.eb-instagram-wrapper.${blockId} .instagram__gallery__item.instagram__gallery__item--overlay__basic .instagram__gallery__thumb::before,
		.eb-instagram-wrapper.${blockId} .instagram__gallery__item.instagram__gallery__item--overlay__standard .instagram__gallery__thumb::before {
			background: ${overlayColor}
		}`
                : ""
        }


		.eb-instagram-wrapper.${blockId} .author__info .author__name,
		.eb-instagram-wrapper.${blockId} .author__info .author__name a  {
			${headerTypoStylesDesktop}
			${headerColor ? `color: ${headerColor};` : ""}
		}


		.eb-instagram-wrapper.${blockId} .hide {
			display: none;
		}
	`;

    const tabStyles = `
		.eb-instagram-wrapper.${blockId} {
			${wrapperMarginStylesTab}
			${wrapperPaddingStylesTab}
		}

		.eb-instagram-wrapper.${blockId} .instagram__gallery__col {
			${gridGapTab}
			${
                numberOfColumnsTab == ""
                    ? `width: calc((100% / 2) - 20px)`
                    : `width: calc((100% / ${numberOfColumnsTab.replace(
                          /[^0-9]/g,
                          ""
                      )}) - 20px);`
            }
		}

		.eb-instagram-wrapper.${blockId} .instagram__gallery__item {
			${imageBdShadowStyesTab}
		}

		.eb-instagram-wrapper.${blockId}:hover .instagram__gallery__item {
			${imageBdShadowStylesHoverTab}
		}

		.eb-instagram-wrapper.${blockId} .eb-instagram-caption p {
			${captionTypoStylesTab}
		}

		.eb-instagram-wrapper.${blockId} .eb-instagram-meta .eb-instagram-date {
			${metaTypoStylesTab}
		}

		.eb-instagram-wrapper.${blockId} .author__info .author__name,
		.eb-instagram-wrapper.${blockId} .author__info .author__name a  {
			${headerTypoStylesTab}
		}
	`;

    const mobileStyles = `
		.eb-instagram-wrapper.${blockId} {
			${wrapperMarginStylesMobile}
			${wrapperPaddingStylesMobile}
		}

		.eb-instagram-wrapper.${blockId} .instagram__gallery__col {
			${gridGapMobile}
			${
                numberOfColumnsMobile == ""
                    ? `width: calc((100% / 1) - 20px);`
                    : `width: calc((100% / ${numberOfColumnsMobile.replace(
                          /[^0-9]/g,
                          ""
                      )}) - 20px);`
            }
		}

		.eb-instagram-wrapper.${blockId} .instagram__gallery__item {
			${imageBdShadowStyesMobile}
		}

		.eb-instagram-wrapper.${blockId}:hover .instagram__gallery__item {
			${imageBdShadowStylesHoverMobile}
		}

		.eb-instagram-wrapper.${blockId} .eb-instagram-caption p {
			${captionTypoStylesMobile}
		}

		.eb-instagram-wrapper.${blockId} .eb-instagram-meta .eb-instagram-date {
			${metaTypoStylesMobile}
		}

		.eb-instagram-wrapper.${blockId} .author__info .author__name,
		.eb-instagram-wrapper.${blockId} .author__info .author__name a  {
			${headerTypoStylesMobile}
		}
	`;

    useEffect(() => {
        // this useEffect is for creating an unique id for each block's unique className by a random unique number
        const BLOCK_PREFIX = "eb-instagram-feed";
        duplicateBlockIdFix({
            BLOCK_PREFIX,
            blockId,
            setAttributes,
            select,
            clientId,
        });

        // get default profileImg
        if (!profileImg) {
            setAttributes({
                profileImg: `${EssentialBlocksLocalize.eb_plugins_url}assets/images/user.png`,
            });
        }
    }, []);

    const blockProps = useBlockProps({
        className: classnames(className, `eb-guten-block-main-parent-wrapper`),
    });

    // all css styles for large screen width (desktop/laptop) in strings ⬇
    const desktopAllStyles = softMinifyCssStrings(`
		${desktopStyles}
	`);

    // all css styles for Tab in strings ⬇
    const tabAllStyles = softMinifyCssStrings(`
		${tabStyles}
	`);

    // all css styles for Mobile in strings ⬇
    const mobileAllStyles = softMinifyCssStrings(`
		${mobileStyles}
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

    if (preview) {
        return (
            <img
                style={{ width: "100%" }}
                src={EssentialBlocksLocalize?.eb_plugins_url + "assets/images/gallery-images/instagram-preview.png"}
            />
        );
    }
    const [instagramToken, setInstagramToken] = useState(token ?? "");
    const fetchAccessToken = () => {
        //Get Instagram Access Token
        let data = new FormData();
        data.append("action", "get_instagram_access_token");
        data.append("admin_nonce", EssentialBlocksLocalize.admin_nonce);
        fetch(EssentialBlocksLocalize.ajax_url, {
            method: "POST",
            body: data,
        }) // wrapped
            .then((res) => res.text())
            .then((data) => {
                const response = JSON.parse(data);
                if (response.success && response.data) {
                    setInstagramToken(response.data);
                } else {
                    setInstagramToken("");
                    setLoading(false);
                }
            })
            .catch((err) => console.log(err));
    };

    let container = "";
    //Initial UseEffect
    useEffect(() => {
        if (loading && instagramToken.length == 0) {
            container = (
                <p>
                    <Spinner />
                    {__("Loading feed", "essential-blocks")}
                </p>
            );
        }
        // set instagram token if save in attributes
        if (token && token.length > 0) {
            setInstagramToken(token);
            let data = new FormData();
            data.append("action", "save_eb_admin_options");
            data.append("type", "settings");
            data.append("key", "instagramToken");
            data.append("value", token);
            data.append("admin_nonce", EssentialBlocksLocalize.admin_nonce);
            fetch(EssentialBlocksLocalize.ajax_url, {
                method: "POST",
                body: data,
            }) // wrapped
                .then((res) => res.text())
                .catch((err) => console.log(err));
            setAttributes({ token: "" });
        } else {
            fetchAccessToken();
        }
    }, []);

    useEffect(() => {
        // start isotop
        if (thumbs.length > 0 && instagramToken.length > 0) {
            fetchInstagramDom();
        }
    }, [thumbs]);

    const fetchInstagramDom = () => {
        const instagrams = document.querySelectorAll(
            `.${blockId} .eb-instagram__gallery`
        );
        setTimeout(() => {
            for (let instagram of instagrams) {
                var iso;

                imagesLoaded(instagram, function () {
                    iso = new Isotope(instagram, {
                        itemSelector: ".instagram__gallery__col",
                        percentPosition: true,
                        masonry: {
                            columnWidth: ".instagram__gallery__col",
                        },
                    });
                });
            }
            setLoading(false);
        }, 1000);
    };

    useEffect(() => {
        if (instagramToken.length > 0) {
            fetchPhotos();
        }
    }, [instagramToken]);

    useEffect(() => {
        if (thumbs.length > 0 && instagramToken.length > 0) {
            setLoading(true);
            fetchInstagramDom();
        }
    }, [
        layout,
        overlayStyle,
        cardStyle,
        sortBy,
        numberOfImages,
        hasEqualImages,
        showCaptions,
        showMeta,
        attributes.imgNumRange,
        attributes.TABimgNumRange,
        attributes.MOBimgNumRange,
        resOption,
    ]);

    const dateFormat = (date) => {
        const monthNames = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ];
        const dateObj = new Date(date);
        const month = monthNames[dateObj.getMonth()];
        const day = String(dateObj.getDate()).padStart(2, "0");
        const year = dateObj.getFullYear();

        return day + " " + month + " " + year;
    };

    const fetchPhotos = () => {
        if (!instagramToken) {
            return false;
        }

        return fetch(
            `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,username&limit=500&access_token=${instagramToken}`
        )
            .then((res) => res.json())
            .then((json) => {
                if (json.error) {
                    setErrorMessage(json.error.message);
                    setResponseCode(json.error.code);
                }
                if (json.data) {
                    setResponseCode(200);

                    if (json.data.length > 0) {
                        setAttributes({ thumbs: json.data });
                    } else {
                        setAttributes({ thumbs: [] });
                        setResponseCode(500);
                    }
                }

                setLoading(false);
            });
    };

    switch (sortBy) {
        case "most_recent":
            thumbs.sort((a, b) => {
                let da = new Date(a.timestamp),
                    db = new Date(b.timestamp);
                return db - da;
            });
            break;
        case "least_recent":
            thumbs.sort((a, b) => {
                let da = new Date(a.timestamp),
                    db = new Date(b.timestamp);
                return da - db;
            });
            break;
    }

    // let container;
    let equalImage = hasEqualImages ? " has__equal__height" : "";
    let layoutClass = layout === "card" ? cardStyle : overlayStyle;

    if (instagramToken.length == 0 && !loading) {
        container = (
            <div>
                <p>
                    To get started please add an Instagram Access Token{" "}
                    <ExternalLink
                        href={`${EssentialBlocksLocalize.eb_admin_url}admin.php?page=essential-blocks&tab=options`}
                    >
                        {__("here.", "essential-blocks")}
                    </ExternalLink>
                </p>
            </div>
        );
    } else if (instagramToken.length > 0 && responseCode === 200) {
        if (loading && thumbs.length === 0) {
            container = (
                <p>
                    <Spinner />
                    {__("Loading feed", "essential-blocks")}
                </p>
            );
        } else {
            container = (
                <>
                    {thumbs &&
                        thumbs.slice(0, numberOfImages).map((photo, index) => {
                            return (
                                <div
                                    className="instagram__gallery__col"
                                    key={index}
                                >
                                    <div
                                        className={`instagram__gallery__item instagram__gallery__item--${layoutClass}${equalImage}`}
                                    >
                                        {layout === "card" && (
                                            <>
                                                {(showProfileName ||
                                                    showProfileImg) && (
                                                    <div className="author__info">
                                                        {showProfileImg &&
                                                            profileImg && (
                                                                <div className="author__thumb">
                                                                    <img
                                                                        src={
                                                                            profileImg
                                                                        }
                                                                        alt={
                                                                            photo.username
                                                                        }
                                                                    />
                                                                </div>
                                                            )}
                                                        {showProfileName && (
                                                            <h5 className="author__name">
                                                                {profileName
                                                                    ? profileName
                                                                    : photo.username}
                                                            </h5>
                                                        )}
                                                    </div>
                                                )}
                                            </>
                                        )}
                                        <div className="instagram__gallery__thumb">
                                            <div className="thumb__wrap">
                                                <img
                                                    src={
                                                        photo.media_type ===
                                                        "VIDEO"
                                                            ? photo.thumbnail_url
                                                            : photo.media_url
                                                    }
                                                    alt={
                                                        photo.caption
                                                            ? photo.caption
                                                            : ""
                                                    }
                                                />
                                            </div>
                                            {showCaptions && photo.caption && (
                                                <div className="eb-instagram-caption">
                                                    <p>{photo.caption}</p>
                                                </div>
                                            )}
                                        </div>
                                        {showMeta && (
                                            <div className="eb-instagram-meta">
                                                <span className="dashicons dashicons-clock"></span>
                                                <span className="eb-instagram-date">
                                                    {dateFormat(
                                                        photo.timestamp
                                                    )}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                </>
            );
        }
    } else if (undefined == responseCode || responseCode !== 200) {
        container = (
            <div>
                <i>
                    <strong>{errorMessage}</strong>
                </i>
            </div>
        );
    }

    // let isNotLoading = instagramToken.length == 0 && !loading

    return (
        <>
            {isSelected && (
                <Inspector
                    key="inspector"
                    attributes={attributes}
                    setAttributes={setAttributes}
                />
            )}
            {layout === "card" && showProfileImg && (
                <BlockControls>
                    <>
                        <ToolbarGroup>
                            <MediaUpload
                                onSelect={(media) =>
                                    setAttributes({
                                        profileImg: media.url,
                                        imageID: media.id,
                                    })
                                }
                                allowedTypes={["image"]}
                                value={imageID}
                                render={({ open }) => (
                                    <ToolbarButton
                                        className="components-toolbar__control"
                                        label={__(
                                            "Edit Profile Image",
                                            "essential-blocks"
                                        )}
                                        icon="edit"
                                        onClick={open}
                                    />
                                )}
                            />
                        </ToolbarGroup>
                    </>
                </BlockControls>
            )}
            <div {...blockProps}>
                <style>
                    {`
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
                    <div className={`eb-instagram-wrapper ${blockId}`}>
                        <div
                            className={`eb-instagram__gallery${
                                loading ? " hide" : ""
                            }`}
                        >
                            {container}
                        </div>
                        {loading ? (
                            <>
                                <p>
                                    <Spinner />
                                    {__("Loading feed", "essential-blocks")}
                                </p>
                            </>
                        ) : (
                            ""
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};
export default edit;
