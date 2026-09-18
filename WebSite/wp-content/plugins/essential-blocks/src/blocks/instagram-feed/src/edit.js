import { __ } from "@wordpress/i18n";
import { useState, useEffect, memo } from "@wordpress/element";
import {
    BlockControls,
    MediaUpload,
} from "@wordpress/block-editor";
import {
    Spinner,
    ToolbarGroup,
    ToolbarButton,
    ExternalLink,
} from "@wordpress/components";
/**
 * Internal Import
 */
import Style from "./style";
import Inspector from "./inspector";
import defaultAttributes from './attributes';
import {
    DUMMY_TOKEN,
    MEDIA_LIMIT,
    fetchInstagramToken,
    fetchInstagramMedia,
    sortByTimestamp,
} from "./helper";

import {
    BlockProps,
    withBlockContext
} from "@essential-blocks/controls";

function Edit(props) {
    const {
        attributes,
        setAttributes,
        className,
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
        numberOfImages,
        hasEqualImages,
        showCaptions,
        showProfileImg,
        profileImg,
        imageID,
        showProfileName,
        profileName,
        sortBy,
        preview,
        showMeta,
        classHook,
        cover
    } = attributes;

    const [loading, setLoading] = useState(true);
    const [responseCode, setResponseCode] = useState(undefined);
    const [errorMessage, setErrorMessage] = useState("");
    const [isShowingDummyData, setIsShowingDummyData] = useState(false);

    // Fetched feed — editor-preview state ONLY, deliberately not a block
    // attribute. It used to be persisted via `setAttributes({ thumbs })`,
    // which serialized the entire Instagram response (the request asks for
    // limit=500) into post_content on every editor load. The server render
    // never reads it — InstagramFeed::render_callback() re-fetches from the
    // API — so it was pure weight: it dirtied the post on mount (prompting
    // phantom "unsaved changes"), re-serialized on every edit, and multiplied
    // by the number of feeds on the page.
    const [thumbs, setThumbs] = useState([]);

    // you must declare this variable
    const enhancedProps = {
        ...props,
        blockPrefix: 'eb-instagram-feed',
        style: <Style {...props} />
    };

    if (preview) {
        return (
            <img
                style={{ width: "100%" }}
                src={`${EssentialBlocksLocalize?.image_url}/block-preview/instagram-preview.jpeg`}
            />
        );
    }
    const [instagramToken, setInstagramToken] = useState(token ?? "");
    // Resolve the token through the shared module-level promise in helper.js,
    // so N feed blocks on one page share ONE AJAX call instead of N.
    const fetchAccessToken = () => {
        fetchInstagramToken().then((resolvedToken) => {
            if (resolvedToken) {
                setInstagramToken(resolvedToken);
            } else {
                setInstagramToken("");
                setIsShowingDummyData(false);
                setLoading(false);
            }
        });
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

        // Cleanup function to destroy isotope instances
        return () => {
            const instagrams = document.querySelectorAll(
                `.${blockId} .eb-instagram__gallery`
            );
            for (let instagram of instagrams) {
                if (instagram.isotope) {
                    instagram.isotope.destroy();
                    instagram.isotope = null;
                }
            }
        };
    }, [thumbs, hasEqualImages]);

    const fetchInstagramDom = () => {
        const instagrams = document.querySelectorAll(
            `.${blockId} .eb-instagram__gallery`
        );
        setTimeout(() => {
            for (let instagram of instagrams) {
                imagesLoaded(instagram, function () {
                    // Destroy existing isotope instance first
                    if (instagram.isotope) {
                        instagram.isotope.destroy();
                        instagram.isotope = null;
                    }

                    // Only apply masonry layout when hasEqualImages is false
                    if (!hasEqualImages) {
                        instagram.isotope = new Isotope(instagram, {
                            itemSelector: ".instagram__gallery__col",
                            percentPosition: true,
                            masonry: {
                                columnWidth: ".instagram__gallery__col",
                            },
                        });
                    }
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

        // Check if this is a dummy token for non-admin users
        if (instagramToken === DUMMY_TOKEN) {
            // Provide dummy data for editor preview
            const dummyData = [
                {
                    id: 'dummy_1',
                    caption: 'Sample Instagram post caption for preview',
                    media_type: 'IMAGE',
                    media_url: `${EssentialBlocksLocalize?.image_url}/image-placeholder.jpg`,
                    permalink: '#',
                    thumbnail_url: `${EssentialBlocksLocalize?.image_url}/image-placeholder.jpg`,
                    timestamp: new Date().toISOString(),
                    username: 'sample_user'
                },
                {
                    id: 'dummy_2',
                    caption: 'Another sample post for Instagram feed preview',
                    media_type: 'IMAGE',
                    media_url: `${EssentialBlocksLocalize?.image_url}/image-placeholder.jpg`,
                    permalink: '#',
                    thumbnail_url: `${EssentialBlocksLocalize?.image_url}/image-placeholder.jpg`,
                    timestamp: new Date().toISOString(),
                    username: 'sample_user'
                },
                {
                    id: 'dummy_3',
                    caption: 'Third sample Instagram post for editor preview',
                    media_type: 'IMAGE',
                    media_url: `${EssentialBlocksLocalize?.image_url}/image-placeholder.jpg`,
                    permalink: '#',
                    thumbnail_url: `${EssentialBlocksLocalize?.image_url}/image-placeholder.jpg`,
                    timestamp: new Date().toISOString(),
                    username: 'sample_user'
                },
                {
                    id: 'dummy_4',
                    caption: 'Fourth sample Instagram post for editor preview',
                    media_type: 'IMAGE',
                    media_url: `${EssentialBlocksLocalize?.image_url}/image-placeholder.jpg`,
                    permalink: '#',
                    thumbnail_url: `${EssentialBlocksLocalize?.image_url}/image-placeholder.jpg`,
                    timestamp: new Date().toISOString(),
                    username: 'sample_user'
                },
                {
                    id: 'dummy_5',
                    caption: 'Fifth sample Instagram post for editor preview',
                    media_type: 'IMAGE',
                    media_url: `${EssentialBlocksLocalize?.image_url}/image-placeholder.jpg`,
                    permalink: '#',
                    thumbnail_url: `${EssentialBlocksLocalize?.image_url}/image-placeholder.jpg`,
                    timestamp: new Date().toISOString(),
                    username: 'sample_user'
                },
                {
                    id: 'dummy_6',
                    caption: 'Sixth sample Instagram post for editor preview',
                    media_type: 'IMAGE',
                    media_url: `${EssentialBlocksLocalize?.image_url}/image-placeholder.jpg`,
                    permalink: '#',
                    thumbnail_url: `${EssentialBlocksLocalize?.image_url}/image-placeholder.jpg`,
                    timestamp: new Date().toISOString(),
                    username: 'sample_user'
                }
            ];

            setResponseCode(200);
            setThumbs(dummyData);
            setIsShowingDummyData(true);
            setLoading(false);
            return Promise.resolve();
        }

        // Deduped across blocks by `token|limit` — identically configured
        // feeds resolve from one shared request instead of one per block.
        return fetchInstagramMedia(instagramToken, MEDIA_LIMIT).then(
            ({ media, error, code }) => {
                if (error) {
                    setErrorMessage(error);
                }
                setResponseCode(code);
                setThumbs(media);
                setIsShowingDummyData(false);
                setLoading(false);
            }
        );
    };

    // Non-mutating — the previous `thumbs.sort()` reordered the block's
    // attribute array in place during render.
    const sortedThumbs = sortByTimestamp(thumbs, sortBy);

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
                    {sortedThumbs &&
                        sortedThumbs.slice(0, numberOfImages).map((photo, index) => {
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

    return cover.length ? (
        <div>
            <img src={cover} alt="instagram feed" style={{ maxWidth: "100%" }} />
        </div>
    ) : (
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
            <BlockProps.Edit {...enhancedProps}>

                <div
                    className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`}
                >
                    <div className={`eb-instagram-wrapper ${blockId}`}>
                        {isShowingDummyData && !loading && (
                            <div style={{
                                background: '#fff3cd',
                                border: '1px solid #ffeaa7',
                                borderRadius: '4px',
                                padding: '12px',
                                marginBottom: '16px',
                                fontSize: '14px',
                                color: '#856404'
                            }}>
                                <strong>{__("Preview Mode:", "essential-blocks")}</strong> {__("You're seeing placeholder content because you don't have administrator permissions. The actual Instagram feed will display on the frontend if properly configured by an administrator.", "essential-blocks")}
                            </div>
                        )}
                        <div
                            className={`eb-instagram__gallery${loading ? " hide" : ""
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
            </BlockProps.Edit>
        </>
    );
}
export default memo(withBlockContext(defaultAttributes)(Edit))
