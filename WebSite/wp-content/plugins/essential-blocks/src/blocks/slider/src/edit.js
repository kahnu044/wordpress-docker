/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useEffect, createRef, memo } from "@wordpress/element";
import {
    MediaUpload,
    BlockControls,
    RichText,
} from "@wordpress/block-editor";
import {
    ToolbarGroup,
    ToolbarItem,
    ToolbarButton,
} from "@wordpress/components";
import { select } from "@wordpress/data";

/**
 * Internal dependencies
 */
import Inspector from "./inspector";
import Style from "./style";
import defaultAttributes from "./attributes";

import {
    handleTitle,
    handleSubtitle,
    handleButtonText,
    handleSecondButtonText,
    sanitizeHtml,
} from "./helpers";

import {
    EBDisplayIcon,
    sanitizeURL,
    BlockProps,
    withBlockContext,
    EBMediaPlaceholder,
    sanitizeIconValue
} from "@essential-blocks/controls";
/**
 * External dependencies
 */
import Slider from "react-slick";
import { SliderIcon } from "./icon";

const Edit = (props) => {
    const { attributes, setAttributes, className, clientId, isSelected, name } =
        props;
    const {
        resOption,
        blockId,
        blockMeta,
        sliderType,
        sliderContentType,
        images,
        arrows,
        adaptiveHeight,
        autoplay,
        autoplaySpeed,
        dots,
        fade,
        infinite,
        vertical,
        pauseOnHover,
        speed,
        initialSlide,
        textAlign,
        classHook,
        arrowNextIcon,
        arrowPrevIcon,
        isRTLEnable,
        titleTag,
        contentTag,
        version,
        slideToShowRange,
        MOBslideToShowRange,
        TABslideToShowRange,
    } = attributes;

    // this useEffect is for creating a unique id for each block's unique className by a random unique number
    useEffect(() => {
        if (
            eb_conditional_localize &&
            eb_conditional_localize.editor_type == "edit-site"
        ) {
            const { isRTL } = select("core/edit-site").getSettings();
            setAttributes({ isRTLEnable: isRTL });
        } else {
            const { isRTL } = select("core/editor").getEditorSettings();
            setAttributes({ isRTLEnable: isRTL });
        }

        // Default value for old version
        if (titleTag == undefined) {
            setAttributes({ titleTag: "h2" });
        }
        if (contentTag == undefined) {
            setAttributes({ contentTag: "p" });
        }

        if (!version || version == "v2") {
            setAttributes({ version: "v3" });
        }
        if (version === "v3") {
            setAttributes({ version: "v4" });
        }

        const isBlockJustInserted =
            select("core/block-editor").wasBlockJustInserted(clientId);

        if (isBlockJustInserted && slideToShowRange == 1) {
            setAttributes({ adaptiveHeight: true });
        }
    }, []);

    useEffect(() => {
        vertical ? setAttributes({ fade: false }) : null;
    }, [vertical]);

    // you must declare this variable
    const enhancedProps = {
        ...props,
        blockPrefix: "eb-slider",
        style: <Style {...props} />,
    };

    function SampleNextArrow(props) {
        const { className, style, onClick, arrowNextIcon } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: "block" }}
                onClick={onClick}
            >
                <EBDisplayIcon icon={sanitizeIconValue(arrowNextIcon)} />
            </div>
        );
    }

    function SamplePrevArrow(props) {
        const { className, style, onClick, arrowPrevIcon } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: "block" }}
                onClick={onClick}
            >
                <EBDisplayIcon icon={sanitizeIconValue(arrowPrevIcon)} />
            </div>
        );
    }

    //Slider Settings
    const settings = {
        arrows,
        adaptiveHeight,
        autoplay,
        autoplaySpeed,
        dots,
        fade,
        infinite,
        pauseOnHover,
        nextArrow: <SampleNextArrow arrowNextIcon={arrowNextIcon} />,
        prevArrow: <SamplePrevArrow arrowPrevIcon={arrowPrevIcon} />,
        slidesToShow: slideToShowRange,
        speed,
        initialSlide,
        vertical,
        currentSlide: 0,
        rtl: isRTLEnable,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: TABslideToShowRange
                        ? TABslideToShowRange
                        : slideToShowRange,
                },
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: MOBslideToShowRange
                        ? MOBslideToShowRange
                        : slideToShowRange,
                },
            },
        ],
    };

    const slider = createRef();
    const hasImages = !!images.length;

    useEffect(() => {
        if (images.length > 0) {
            slider.current.slickGoTo(initialSlide);
        }
    }, [initialSlide]);

    function onImageSelect(selectedImages, images) {
        let updatedImages = [];
        selectedImages.map((selectedImage, selectedIndex) => {
            let item = {
                url: selectedImage.url,
                alt: selectedImage.alt,
                id: selectedIndex,
                imageId: selectedImage.id,
                caption: selectedImage.caption,
            };

            if (images.length > 0) {
                const thisImage = images.filter(
                    (data, index) => data.imageId === selectedImage.id,
                );

                if (thisImage.length > 0) {
                    item.title = thisImage[0].title
                        ? thisImage[0].title
                        : `Slider ${selectedIndex + 1}`;
                    item.subtitle = thisImage[0].subtitle
                        ? thisImage[0].subtitle
                        : "Essential Blocks Slider Subtitle";
                    item.showButton = thisImage[0].showButton ?? true;
                    item.buttonText = thisImage[0].buttonText
                        ? thisImage[0].buttonText
                        : "See More";
                    item.buttonUrl = thisImage[0].buttonUrl;
                    item.openNewTab = thisImage[0].openNewTab ?? false;
                    item.isValidUrl = thisImage[0].isValidUrl;

                    item.showSecondButton =
                        thisImage[0].showSecondButton ?? false;
                    item.secondButtonText = thisImage[0].secondButtonText
                        ? thisImage[0].secondButtonText
                        : "See More";
                    item.secondButtonUrl = thisImage[0].secondButtonUrl;
                    item.secondButtonOpenNewTab =
                        thisImage[0].secondButtonOpenNewTab ?? false;

                    item.enableContentLink = thisImage[0].enableContentLink ?? false;
                    item.contentLink = thisImage[0].contentLink;
                    item.contentOpenNewTab = thisImage[0].contentOpenNewTab ?? false;
                    item.isValidContentUrl = thisImage[0].isValidContentUrl;
                } else {
                    item.title = selectedImage.caption
                        ? selectedImage.caption
                        : `Slider ${selectedIndex + 1}`;
                    item.subtitle = "Essential Blocks Slider Subtitle";
                    item.showButton = true;
                    item.buttonText = "See More";
                    item.buttonUrl = "";
                    item.openNewTab = false;
                    item.isValidUrl = true;

                    item.showSecondButton = false;
                    item.secondButtonText = "See More";
                    item.secondButtonUrl = "";
                    item.secondButtonOpenNewTab = false;

                    item.enableContentLink = false;
                    item.contentLink = "";
                    item.contentOpenNewTab = false;
                    item.isValidContentUrl = true;
                }
            } else {
                item.title = selectedImage.caption
                    ? selectedImage.caption
                    : `Slider ${selectedIndex + 1}`;
                item.subtitle = "Essential Blocks Slider Subtitle";
                item.showButton = true;
                item.buttonText = "See More";
                item.buttonUrl = "";
                item.openNewTab = false;
                item.isValidUrl = true;

                item.showSecondButton = false;
                item.secondButtonText = "See More";
                item.secondButtonUrl = "";
                item.secondButtonOpenNewTab = false;

                item.enableContentLink = false;
                item.contentLink = "";
                item.contentOpenNewTab = false;
                item.isValidContentUrl = true;
            }
            updatedImages.push(item);
        });
        setAttributes({ images: updatedImages });
    }

    // Show image placeholder if there is no image
    if (!hasImages) {
        return (
            <EBMediaPlaceholder
                addToGallery={hasImages}
                isAppender={hasImages}
                dropZoneUIOnly={hasImages && !isSelected}
                labels={{
                    title: !hasImages && __("Images", "essential-blocks"),
                    instructions:
                        !hasImages &&
                        __(
                            "Drag images, upload new ones or select files from your library.",
                        ),
                }}
                onSelect={(selectedImages) =>
                    onImageSelect(selectedImages, images)
                }
                accept="image/*"
                allowedTypes={["image"]}
                multiple
                value={hasImages ? images : undefined}
                icon={SliderIcon}
                enableAI={false}
            />
        );
    }
    // Add Second Button Properties
    if (images.length > 0) {
        images.map((image) => {
            if (!image.hasOwnProperty("showSecondButton")) {
                image.showSecondButton = false;
                image.secondButtonText = "See More";
                image.secondButtonUrl = "";
                image.secondButtonOpenNewTab = false;
            }
            if (!image.hasOwnProperty("enableContentLink")) {
                image.enableContentLink = false;
                image.contentLink = "";
                image.contentOpenNewTab = false;
                image.isValidContentUrl = true;
            }
            return images;
        });
    }

    const sliderTypeClass =
        sliderType === "content"
            ? "eb-slider-type-content"
            : "eb-slider-type-image";

    return (
        <>
            {isSelected && (
                <Inspector
                    attributes={attributes}
                    setAttributes={setAttributes}
                    slider={slider}
                />
            )}
            <BlockControls>
                <ToolbarGroup>
                    <ToolbarItem>
                        {() => (
                            <MediaUpload
                                onSelect={(selectedImages) =>
                                    onImageSelect(selectedImages, images)
                                }
                                allowedTypes={["image"]}
                                multiple
                                gallery
                                value={images.map((img) => img.imageId)}
                                render={({ open }) => (
                                    <ToolbarButton
                                        className="components-toolbar__control"
                                        label={__(
                                            "Edit gallery",
                                            "essential-blocks",
                                        )}
                                        icon="edit"
                                        onClick={open}
                                    />
                                )}
                            />
                        )}
                    </ToolbarItem>
                </ToolbarGroup>
            </BlockControls>
            <BlockProps.Edit {...enhancedProps}>
                <div
                    className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`}
                >
                    <div className={`eb-slider-wrapper ${blockId}`}>
                        <Slider
                            ref={slider}
                            {...settings}
                            key={`${autoplay}-${adaptiveHeight}`}
                            className={sliderTypeClass}
                        >
                            {images.map((image, index) => (
                                <div
                                    className={`eb-slider-item ${sliderContentType}`}
                                    key={index}
                                >
                                    <div>
                                        <img
                                            className="eb-slider-image"
                                            src={image.url}
                                        />
                                    </div>
                                    {sliderType === "content" && (
                                        <div
                                            className={`eb-slider-content align-${textAlign}`}
                                        >
                                            {image.title &&
                                                image.title.length > 0 && (
                                                    <>
                                                        <RichText
                                                            tagName={titleTag}
                                                            className="eb-slider-title"
                                                            value={sanitizeHtml(
                                                                image.title,
                                                            )}
                                                            // value={image.title}
                                                            allowedFormats={[
                                                                "core/bold",
                                                                "core/italic",
                                                                "core/text-color",
                                                                "core/underline",
                                                                "core/link",
                                                            ]}
                                                            onChange={(text) =>
                                                                handleTitle(
                                                                    text,
                                                                    index,
                                                                    images,
                                                                    setAttributes,
                                                                )
                                                            }
                                                        />
                                                    </>
                                                )}
                                            {image.subtitle &&
                                                image.subtitle.length > 0 && (
                                                    <>
                                                        <RichText
                                                            tagName={contentTag}
                                                            className="eb-slider-subtitle"
                                                            value={sanitizeHtml(
                                                                image.subtitle,
                                                            )}
                                                            allowedFormats={[
                                                                "core/bold",
                                                                "core/italic",
                                                                "core/text-color",
                                                                "core/underline",
                                                                "core/link",
                                                            ]}
                                                            onChange={(text) =>
                                                                handleSubtitle(
                                                                    text,
                                                                    index,
                                                                    images,
                                                                    setAttributes,
                                                                )
                                                            }
                                                        />
                                                    </>
                                                )}

                                            <div className="eb-slider-button-wrapper">
                                                {image.showButton &&
                                                    image.buttonText &&
                                                    image.buttonText.length >
                                                    0 && (
                                                        <>
                                                            <a
                                                                href={
                                                                    image.buttonUrl &&
                                                                        image.isValidUrl
                                                                        ? sanitizeURL(
                                                                            image.buttonUrl,
                                                                        )
                                                                        : "#"
                                                                }
                                                                className="eb-slider-button"
                                                                target={
                                                                    image.openNewTab
                                                                        ? "_blank"
                                                                        : "_self"
                                                                }
                                                                rel="noopener"
                                                            >
                                                                <RichText
                                                                    value={sanitizeHtml(
                                                                        image.buttonText,
                                                                    )}
                                                                    allowedFormats={[
                                                                        "core/bold",
                                                                        "core/italic",
                                                                        "core/text-color",
                                                                        "core/underline",
                                                                    ]}
                                                                    onChange={(
                                                                        text,
                                                                    ) =>
                                                                        handleButtonText(
                                                                            text,
                                                                            index,
                                                                            images,
                                                                            setAttributes,
                                                                        )
                                                                    }
                                                                />
                                                            </a>
                                                        </>
                                                    )}
                                                {image.showSecondButton &&
                                                    image.secondButtonText &&
                                                    image.secondButtonText
                                                        .length > 0 && (
                                                        <>
                                                            <a
                                                                href={
                                                                    image.secondButtonUrl &&
                                                                        image.isValidUrl
                                                                        ? sanitizeURL(
                                                                            image.secondButtonUrl,
                                                                        )
                                                                        : "#"
                                                                }
                                                                className="eb-slider-second-button"
                                                                target={
                                                                    image.secondButtonopenNewTab
                                                                        ? "_blank"
                                                                        : "_self"
                                                                }
                                                                rel="noopener"
                                                            >
                                                                <RichText
                                                                    value={sanitizeHtml(
                                                                        image.secondButtonText,
                                                                    )}
                                                                    allowedFormats={[
                                                                        "core/bold",
                                                                        "core/italic",
                                                                        "core/text-color",
                                                                        "core/underline",
                                                                    ]}
                                                                    onChange={(
                                                                        text,
                                                                    ) =>
                                                                        handleSecondButtonText(
                                                                            text,
                                                                            index,
                                                                            images,
                                                                            setAttributes,
                                                                        )
                                                                    }
                                                                />
                                                            </a>
                                                        </>
                                                    )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            </BlockProps.Edit >
        </>
    );
};

export default memo(withBlockContext(defaultAttributes)(Edit));
