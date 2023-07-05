import { render, createRef } from "@wordpress/element";
/**
 * External dependencies
 */
import Slider from "react-slick";

window.addEventListener("DOMContentLoaded", (event) => {
    const wrappers = document.getElementsByClassName(`eb-slider-wrapper`);

    for (let wrapper of wrappers) {
        let settings = JSON.parse(wrapper.getAttribute("data-settings"));
        let images = JSON.parse(wrapper.getAttribute("data-images"));
        let sliderContentType = wrapper.getAttribute("data-sliderContentType");
        let sliderType = wrapper.getAttribute("data-sliderType");
        let textAlign = wrapper.getAttribute("data-textAlign");

        const slider = createRef();
        render(
            <Slider
                ref={slider}
                {...settings}
                key={`${settings.autoplay}-${settings.adaptiveHeight}`}
                className={sliderType}
            >
                {images.map((image) => (
                    <div className={`eb-slider-item ${sliderContentType}`}>
                        {sliderType === "image" &&
                            image.buttonUrl &&
                            image.isValidUrl && (
                                <>
                                    <a
                                        href={
                                            image.buttonUrl && image.isValidUrl
                                                ? image.buttonUrl
                                                : "#"
                                        }
                                        target={
                                            image.openNewTab
                                                ? "_blank"
                                                : "_self"
                                        }
                                        rel="noopener"
                                    >
                                        <img
                                            className="eb-slider-image"
                                            src={image.url}
                                            alt={
                                                image.alt
                                                    ? image.alt
                                                    : image.title
                                            }
                                        />
                                    </a>
                                </>
                            )}
                        {sliderType === "image" &&
                            !image.buttonUrl &&
                            !image.isValidUrlf && (
                                <img
                                    className="eb-slider-image"
                                    src={image.url}
                                    alt={image.alt ? image.alt : image.title}
                                />
                            )}
                        {sliderType === "content" && (
                            <>
                                <img
                                    className="eb-slider-image"
                                    src={image.url}
                                    alt={image.alt ? image.alt : image.title}
                                />
                                <div
                                    className={`eb-slider-content align-${textAlign}`}
                                >
                                    {image.title && image.title.length > 0 && (
                                        <h2
                                            className="eb-slider-title"
                                            dangerouslySetInnerHTML={{
                                                __html: image.title,
                                            }}
                                        ></h2>
                                    )}
                                    {image.subtitle &&
                                        image.subtitle.length > 0 && (
                                            <p
                                                className="eb-slider-subtitle"
                                                dangerouslySetInnerHTML={{
                                                    __html: image.subtitle,
                                                }}
                                            ></p>
                                        )}
                                    {image.showButton &&
                                        image.buttonText &&
                                        image.buttonText.length > 0 && (
                                            <a
                                                href={
                                                    image.buttonUrl &&
                                                    image.isValidUrl
                                                        ? image.buttonUrl
                                                        : "#"
                                                }
                                                className="eb-slider-button"
                                                target={
                                                    image.openNewTab
                                                        ? "_blank"
                                                        : "_self"
                                                }
                                                rel="noopener"
                                                dangerouslySetInnerHTML={{
                                                    __html: image.buttonText,
                                                }}
                                            ></a>
                                        )}
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </Slider>,
            wrapper
        );
    }
});
