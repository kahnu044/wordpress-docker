/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
    PanelBody,
    ToggleControl,
    TextareaControl,
    SelectControl,
    TextControl,
    RangeControl,
    BaseControl,
    Button,
    __experimentalDivider as Divider,
} from "@wordpress/components";

/**
 * External depencencies
 */

import {
    ColorControl,
    ImageAvatar,
    ResponsiveRangeController,
    ResponsiveDimensionsControl,
    BorderShadowControl,
    TypographyDropdown,
    useBlockDefaults,
    withBlockContext
} from "@essential-blocks/controls";

/**
 * Internal depencencies
 */
import {
    CARD_STYLE,
    LAYOUT,
    OVERLAY_STYLE,
    NUMBER_OF_COLUMNS,
    SORT_OPTIONS,
    GRID_GAP,
    IMAGE_BORDER,
    WRAPPER_MARGIN,
    WRAPPER_PADDING,
} from "@essential-blocks/blocks/instagram-feed/src/constants";

import {
    typoPrefix_caption,
    typoPrefix_meta,
    typoPrefix_header,
} from "@essential-blocks/blocks/instagram-feed/src/constants/typographyPrefixConstants";

import objAttributes from "@essential-blocks/blocks/instagram-feed/src/attributes";

function InstagramFeed(props) {
    const { blockDefaults, setBlockDefaults, name, deviceType, handleBlockDefault } = props;
    const {
        token,
        layout,
        overlayStyle,
        cardStyle,
        thumbs,
        numberOfImages,
        captionColor,
        metaColor,
        headerColor,
        overlayColor,
        hasEqualImages,
        showCaptions,
        enableLink,
        openInNewTab,
        showProfileImg,
        profileImg,
        imageID,
        showProfileName,
        profileName,
        sortBy,
        showMeta,
    } = blockDefaults;
    const isDefaultSet = useBlockDefaults(name, blockDefaults, setBlockDefaults, objAttributes)

    return (
        <>
            {isDefaultSet && (
                <div className="eb-panel-control">
                    {thumbs.length > 0 && (
                        <>
                            <PanelBody
                                title={__("Feed Settings", "essential-blocks")}
                                intialOpen={true}
                            >
                                <>
                                    <SelectControl
                                        label={__(
                                            "Sort By",
                                            "essential-blocks"
                                        )}
                                        value={sortBy}
                                        options={SORT_OPTIONS}
                                        onChange={(newSortBy) =>
                                            handleBlockDefault({
                                                sortBy: newSortBy,
                                            })
                                        }
                                    />
                                    <RangeControl
                                        label={__(
                                            "Number Of Images",
                                            "essential-blocks"
                                        )}
                                        value={numberOfImages}
                                        onChange={(numberOfImages) => {
                                            handleBlockDefault({
                                                numberOfImages,
                                            });
                                        }}
                                        min={1}
                                        max={100}
                                    />
                                    <ResponsiveRangeController
                                        baseLabel={__(
                                            "Columns",
                                            "essential-blocks"
                                        )}
                                        controlName={NUMBER_OF_COLUMNS}
                                        min={1}
                                        max={8}
                                        step={1}
                                        noUnits
                                    />
                                    <ToggleControl
                                        label={__(
                                            "Square thumbnail",
                                            "essential-blocks"
                                        )}
                                        checked={hasEqualImages}
                                        onChange={(hasEqualImages) =>
                                            handleBlockDefault({
                                                hasEqualImages,
                                            })
                                        }
                                    />
                                </>
                            </PanelBody>
                            <PanelBody
                                title={__(
                                    "General Settings",
                                    "essential-blocks"
                                )}
                                initialOpen={false}
                            >
                                <SelectControl
                                    label={__("Layout", "essential-blocks")}
                                    value={layout}
                                    options={LAYOUT}
                                    onChange={(newLayout) =>
                                        handleBlockDefault({
                                            layout: newLayout,
                                        })
                                    }
                                />
                                {layout === "overlay" && (
                                    <SelectControl
                                        label={__(
                                            "Overlay Style",
                                            "essential-blocks"
                                        )}
                                        value={overlayStyle}
                                        options={OVERLAY_STYLE}
                                        onChange={(newOverlayStyle) =>
                                            handleBlockDefault({
                                                overlayStyle: newOverlayStyle,
                                            })
                                        }
                                    />
                                )}
                                {layout === "card" && (
                                    <SelectControl
                                        label={__(
                                            "Card Style",
                                            "essential-blocks"
                                        )}
                                        value={cardStyle}
                                        options={CARD_STYLE}
                                        onChange={(newCardStyle) =>
                                            handleBlockDefault({
                                                cardStyle: newCardStyle,
                                            })
                                        }
                                    />
                                )}
                                {layout === "card" && (
                                    <>
                                        <Divider />
                                        <BaseControl>
                                            <h3 className="eb-control-title">
                                                {__(
                                                    "User info",
                                                    "essential-blocks"
                                                )}
                                            </h3>
                                        </BaseControl>
                                        <ToggleControl
                                            label={__(
                                                "Show profile image",
                                                "essential-blocks"
                                            )}
                                            checked={showProfileImg}
                                            onChange={(showProfileImg) =>
                                                handleBlockDefault({
                                                    showProfileImg,
                                                })
                                            }
                                        />
                                        {showProfileImg && !profileImg && (
                                            <MediaUpload
                                                onSelect={({ id, url }) =>
                                                    handleBlockDefault({
                                                        profileImg: url,
                                                        imageID: id,
                                                    })
                                                }
                                                type="image"
                                                value={imageID}
                                                render={({ open }) => {
                                                    return (
                                                        <Button
                                                            className="eb-background-control-inspector-panel-img-btn components-button"
                                                            label={__(
                                                                "Upload Image",
                                                                "essential-blocks"
                                                            )}
                                                            icon="format-image"
                                                            onClick={open}
                                                        />
                                                    );
                                                }}
                                            />
                                        )}
                                        {showProfileImg && profileImg && (
                                            <ImageAvatar
                                                imageUrl={profileImg}
                                                onDeleteImage={() =>
                                                    handleBlockDefault({
                                                        profileImg: null,
                                                    })
                                                }
                                            />
                                        )}
                                        <ToggleControl
                                            label={__(
                                                "Show profile name",
                                                "essential-blocks"
                                            )}
                                            checked={showProfileName}
                                            onChange={(showProfileName) =>
                                                handleBlockDefault({
                                                    showProfileName,
                                                })
                                            }
                                        />
                                        {showProfileName && (
                                            <TextControl
                                                label={__(
                                                    "Custom Name",
                                                    "essential-blocks"
                                                )}
                                                value={profileName}
                                                onChange={(newProfileName) =>
                                                    handleBlockDefault({
                                                        profileName: newProfileName,
                                                    })
                                                }
                                            />
                                        )}
                                    </>
                                )}
                                {overlayStyle !== "overlay__simple" && (
                                    <ToggleControl
                                        label={__(
                                            "Show captions",
                                            "essential-blocks"
                                        )}
                                        checked={showCaptions}
                                        onChange={(showCaptions) =>
                                            handleBlockDefault({ showCaptions })
                                        }
                                    />
                                )}
                                <ToggleControl
                                    label={__("Show Link?", "essential-blocks")}
                                    checked={enableLink}
                                    onChange={(enableLink) =>
                                        handleBlockDefault({ enableLink })
                                    }
                                />
                                {enableLink && (
                                    <ToggleControl
                                        label={__(
                                            "Open in new window?",
                                            "essential-blocks"
                                        )}
                                        checked={openInNewTab}
                                        onChange={(openInNewTab) =>
                                            handleBlockDefault({ openInNewTab })
                                        }
                                    />
                                )}
                                {overlayStyle !== "overlay__simple" && (
                                    <ToggleControl
                                        label={__(
                                            "Show Meta?",
                                            "instagram-block"
                                        )}
                                        checked={showMeta}
                                        onChange={(showMeta) =>
                                            handleBlockDefault({ showMeta })
                                        }
                                    />
                                )}
                            </PanelBody>
                        </>
                    )}
                    {/* Styles */}
                    <PanelBody
                        title={__("Feed Styles", "essential-blocks")}
                        initialOpen={true}
                    >
                        <>
                            <ResponsiveDimensionsControl
                                className=""
                                controlName={GRID_GAP}
                                baseLabel={__("Padding", "essential-blocks")}
                            />
                            {layout === "overlay" && (
                                <ColorControl
                                    label={__(
                                        "Overlay Color",
                                        "essential-blocks"
                                    )}
                                    color={overlayColor}
                                    onChange={(overlayColor) =>
                                        handleBlockDefault({ overlayColor })
                                    }
                                />
                            )}
                            <BaseControl>
                                <h3 className="eb-control-title">
                                    {__("Border", "essential-blocks")}
                                </h3>
                            </BaseControl>
                            <BorderShadowControl
                                controlName={IMAGE_BORDER}
                                noShadow
                            />
                        </>
                    </PanelBody>
                    <PanelBody
                        title={__("Caption Styles", "essential-blocks")}
                        initialOpen={false}
                    >
                        <>
                            <TypographyDropdown
                                baseLabel={__("Typography", "essential-blocks")}
                                typographyPrefixConstant={typoPrefix_caption}
                            />
                            <ColorControl
                                label={__("Color", "essential-blocks")}
                                color={captionColor}
                                onChange={(captionColor) =>
                                    handleBlockDefault({ captionColor })
                                }
                            />
                        </>
                    </PanelBody>
                    <PanelBody
                        title={__("Meta Styles", "essential-blocks")}
                        initialOpen={false}
                    >
                        <>
                            <TypographyDropdown
                                baseLabel={__("Typography", "essential-blocks")}
                                typographyPrefixConstant={typoPrefix_meta}
                            />
                            <ColorControl
                                label={__("Color", "essential-blocks")}
                                color={metaColor}
                                onChange={(metaColor) =>
                                    handleBlockDefault({ metaColor })
                                }
                            />
                        </>
                    </PanelBody>
                    {layout === "card" && (
                        <PanelBody
                            title={__("Header Styles", "essential-blocks")}
                            initialOpen={false}
                        >
                            <>
                                <TypographyDropdown
                                    baseLabel={__(
                                        "Typography",
                                        "essential-blocks"
                                    )}
                                    typographyPrefixConstant={typoPrefix_header}
                                />
                                <ColorControl
                                    label={__("Color", "essential-blocks")}
                                    color={headerColor}
                                    onChange={(headerColor) =>
                                        handleBlockDefault({ headerColor })
                                    }
                                />
                            </>
                        </PanelBody>
                    )}
                    {/* Advanced */}
                    <PanelBody
                        title={__(
                            "Wrapper Margin & Padding",
                            "essential-blocks"
                        )}
                        initialOpen={false}
                    >
                        <>
                            <ResponsiveDimensionsControl
                                controlName={WRAPPER_PADDING}
                                baseLabel={__("Padding", "essential-blocks")}
                            />
                            <ResponsiveDimensionsControl
                                controlName={WRAPPER_MARGIN}
                                baseLabel={__("Margin", "essential-blocks")}
                            />
                        </>
                    </PanelBody>
                </div>
            )}
        </>
    );
}

export default withBlockContext(objAttributes)(InstagramFeed);
