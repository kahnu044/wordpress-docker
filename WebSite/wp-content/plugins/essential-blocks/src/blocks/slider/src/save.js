import { RichText } from "@wordpress/block-editor";
import {
sanitizeURL, BlockProps
} from "@essential-blocks/controls";
const Save = ({ attributes }) => {
    const {
        blockId,
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
        dotPreset,
        isRTLEnable,
        titleTag,
        contentTag,
        version
    } = attributes;

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
        slidesToShow: attributes.slideToShowRange,
        speed,
        vertical,
        currentSlide: 0,
        rtl: isRTLEnable,
        responsive: [
            {
                breakpoint: 1025,
                settings: {
                    slidesToShow:
                        attributes.TABslideToShowRange ||
                        attributes.slideToShowRange,
                },
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow:
                        attributes.MOBslideToShowRange ||
                        attributes.slideToShowRange,
                },
            },
        ],
    };

    const sliderTypeClass = sliderType === 'content' ? 'eb-slider-type-content' : 'eb-slider-type-image';

    return (
        <BlockProps.Save attributes={attributes}>
            <div
                className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`}
            >
                {
                    blockId && (
                        <script dangerouslySetInnerHTML={{
                            __html:
                                `var ${blockId.replaceAll('-', '_')} = ${JSON.stringify(settings)};`
                        }}></script>
                    )
                }
                <div
                    className={`eb-slider-wrapper ${blockId}`}
                    data-blockid={blockId}
                    data-version={version}
                    data-arrowNextIcon={arrowNextIcon}
                    data-arrowPrevIcon={arrowPrevIcon}
                >
                    <div className={`eb-slider-init ${sliderTypeClass}`}>
                        {images.map((image, index) => (
                            <div
                                className={`eb-slider-item ${sliderContentType}`}
                                key={index}
                            >
                                {image.buttonUrl && image.isValidUrl ? 
                                    <div><a 
                                        href={sanitizeURL(image.buttonUrl)}
                                        target={
                                            image.openNewTab
                                                ? "_blank"
                                                : "_self"
                                        }
                                        rel="noopener">
                                        <img
                                            className="eb-slider-image"
                                            src={image.url}
                                        />
                                    </a></div>
                                 : <div><img
                                        className="eb-slider-image"
                                        src={image.url}
                                    /></div>
                                }
                                {sliderType === "content" && (
                                    <div
                                        className={`eb-slider-content align-${textAlign}`}
                                    >
                                        {image.title &&
                                            image.title.length > 0 && (
                                                <RichText.Content
                                                    tagName={titleTag}
                                                    className="eb-slider-title"
                                                    value={image.title}
                                                />
                                            )}
                                        {image.subtitle &&
                                            image.subtitle.length > 0 && (
                                                <RichText.Content
                                                    tagName={contentTag}
                                                    className="eb-slider-subtitle"
                                                    value={image.subtitle}
                                                />
                                            )}

                                        <div className="eb-slider-button-wrapper">
                                            {image.showButton &&
                                                image.buttonText &&
                                                image.buttonText.length > 0 && (
                                                    <a
                                                        href={
                                                            image.buttonUrl &&
                                                                image.isValidUrl
                                                                ? sanitizeURL(image.buttonUrl)
                                                                : ""
                                                        }
                                                        className="eb-slider-button"
                                                        target={
                                                            image.openNewTab
                                                                ? "_blank"
                                                                : "_self"
                                                        }
                                                        rel="noopener"
                                                    >
                                                        <RichText.Content
                                                            value={
                                                                image.buttonText
                                                            }
                                                        />
                                                    </a>
                                                )}

                                            {image.showSecondButton &&
                                                image.secondButtonText &&
                                                image.secondButtonText.length >
                                                0 && (
                                                    <a
                                                        href={
                                                            image.secondButtonUrl &&
                                                                image.isValidUrl
                                                                ? sanitizeURL(image.secondButtonUrl)
                                                                : ""
                                                        }
                                                        className="eb-slider-second-button"
                                                        target={
                                                            image.secondButtonOpenNewTab
                                                                ? "_blank"
                                                                : "_self"
                                                        }
                                                        rel="noopener"
                                                    >
                                                        <RichText.Content
                                                            value={
                                                                image.secondButtonText
                                                            }
                                                        />
                                                    </a>
                                                )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </BlockProps.Save>
    );
};

export default Save;
