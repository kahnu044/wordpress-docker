/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
    PanelBody,
    SelectControl,
    ToggleControl,
    BaseControl,
    PanelRow,
} from "@wordpress/components";
import { useEffect, useState } from "@wordpress/element";
/**
 * Internal depencencies
 */

import objAttributes from "./attributes";

import {
    WRAPPER_BG,
    WRAPPER_MARGIN,
    WRAPPER_PADDING,
    WRAPPER_BORDER_SHADOW,
    IMAGE_WIDTH,
    IMAGE_HEIGHT,
    SIZE_UNIT_TYPES,
    IMAGE_BORDER_SHADOW,
    STYLES,
    HOVER_EFFECT,
    FIT_STYLES,
    IMAGE_ALIGN,
    IMAGE_ALIGNMENT,
    SOURCE,
} from "./constants";

import {
    BorderShadowControl,
    ResponsiveRangeController,
    EbImageSizeSelector,
    ResponsiveAlignControl,
    InspectorPanel,
    ImageComponent,
    sanitizeURL,
} from "@essential-blocks/controls";

function Inspector(props) {
    const { attributes, setAttributes, media, prevImageSize, oldImageData, context } =
        props;
    const {
        image,
        resOption,
        displayCaption,
        captionColor,
        stylePreset,
        enableLink,
        captionStyle,
        hoverEffect,
        complexStyle,
        autoFit,
        imageSize,
        fitStyles,
        autoHeight,
        imgSource,
        widthRange,
        heightRange,
        openInNewTab
    } = attributes;

    // Check if block is inside Loop Builder context
    const isInLoopBuilder = Boolean(
        context &&
        // Primary check: explicit isLoopBuilder flag
        (context["essential-blocks/isLoopBuilder"] === true ||
            // Secondary check: presence of loop context values (even if null initially)
            (context.hasOwnProperty("essential-blocks/postId") &&
                context.hasOwnProperty("essential-blocks/postType"))),
    );

    const [urlError, setUrlError] = useState("");

    const changImgSource = (selected) => {
        switch (selected) {
            case "site-logo":
                setAttributes({
                    imgSource: selected,
                    displayCaption: false,
                    enableLink: true,
                    widthRange: 120,
                    widthUnit: "px",
                    imgBorderShadowborderStyle: "none",
                    imgBorderShadowRds_Bottom: "0",
                    imgBorderShadowRds_Left: "0",
                    imgBorderShadowRds_Right: "0",
                    imgBorderShadowRds_Top: "0",
                    hoverEffect: "no-effect",
                });
                break;
            case "featured-img":
                setAttributes({
                    imgSource: selected,
                    displayCaption: false,
                    enableLink: true,
                    widthRange: "",
                    imgBorderShadowborderStyle: "solid",
                    imgBorderShadowRds_Bottom: "15",
                    imgBorderShadowRds_Left: "15",
                    imgBorderShadowRds_Right: "15",
                    imgBorderShadowRds_Top: "15",
                    hoverEffect: "no-effect",
                });
                break;
            case "custom":
                setAttributes({
                    imgSource: selected,
                    displayCaption: true,
                    enableLink: false,
                    widthRange: "",
                    imgBorderShadowborderStyle: "solid",
                    imgBorderShadowRds_Bottom: "15",
                    imgBorderShadowRds_Left: "15",
                    imgBorderShadowRds_Right: "15",
                    imgBorderShadowRds_Top: "15",
                    hoverEffect: "zoom-in",
                });
                break;
            default:
                return false;
        }
    };

    const changeStyle = (selected) => {
        setAttributes({ stylePreset: selected });
        const complexLayouts = ["octagon", "rhombus", "triangle"];
        if (complexLayouts.includes(selected)) {
            setAttributes({
                complexStyle: true,
            });
        } else {
            setAttributes({
                complexStyle: false,
            });
        }

        //
        switch (selected) {
            case "rounded":
                setAttributes({
                    imgBorderShadowRds_Bottom: "15",
                    imgBorderShadowRds_Top: "15",
                    imgBorderShadowRds_Left: "15",
                    imgBorderShadowRds_Right: "15",
                    imgBorderShadowRds_Unit: "px",

                    imgBorderShadowHRds_Bottom: "15",
                    imgBorderShadowHRds_Top: "15",
                    imgBorderShadowHRds_Left: "15",
                    imgBorderShadowHRds_Right: "15",
                    imgBorderShadowHRds_Unit: "px",
                });
                break;
            case "square":
                setAttributes({
                    imgBorderShadowRds_Bottom: "0",
                    imgBorderShadowRds_Top: "0",
                    imgBorderShadowRds_Left: "0",
                    imgBorderShadowRds_Right: "0",
                    imgBorderShadowRds_Unit: "px",

                    imgBorderShadowHRds_Bottom: "0",
                    imgBorderShadowHRds_Top: "0",
                    imgBorderShadowHRds_Left: "0",
                    imgBorderShadowHRds_Right: "0",
                    imgBorderShadowHRds_Unit: "px",
                });
                break;
            case "circle":
                setAttributes({
                    imgBorderShadowRds_Bottom: "50",
                    imgBorderShadowRds_Top: "50",
                    imgBorderShadowRds_Left: "50",
                    imgBorderShadowRds_Right: "50",
                    imgBorderShadowRds_Unit: "%",

                    imgBorderShadowHRds_Bottom: "50",
                    imgBorderShadowHRds_Top: "50",
                    imgBorderShadowHRds_Left: "50",
                    imgBorderShadowHRds_Right: "50",
                    imgBorderShadowHRds_Unit: "%",
                });
                break;
            default:
                return false;
        }
    };

    // image size change
    useEffect(() => {
        // Only run this effect when imageSize actually changes, not on initial render
        if (prevImageSize.current === imageSize) {
            return;
        }

        // custom
        if (imgSource === "custom") {
            if (image.sizes && imageSize && imageSize.length > 0) {
                let newWidth;
                let newHeight;
                if (image.sizes[imageSize]) {
                    image.url = image.sizes[imageSize]
                        ? image.sizes[imageSize].url
                        : image.url;

                    newWidth = image.sizes[imageSize].width
                        ? image.sizes[imageSize].width
                        : image.width;
                    newHeight = image.sizes[imageSize].height
                        ? image.sizes[imageSize].height
                        : image.height;
                } else {
                    image.url = image.sizes.full.url;
                    newWidth = image.width;
                    newHeight = image.height;
                }

                image["url"] = image.url;

                setAttributes({
                    image,
                    widthRange:
                        prevImageSize.current === imageSize && widthRange
                            ? widthRange : newWidth
                                ? newWidth : "",
                    widthUnit:
                        prevImageSize.current === imageSize &&
                            attributes["widthUnit"]
                            ? attributes["widthUnit"]
                            : "px",

                    heightRange:
                        prevImageSize.current === imageSize && heightRange
                            ? heightRange : newHeight
                                ? newHeight : "",
                    heightUnit:
                        prevImageSize.current === imageSize && attributes["heightUnit"]
                            ? attributes["heightUnit"] : "px",
                });
            } else {
                let newWidth = "";
                let newHeight = "";
                if (image && !imageSize) {
                    newWidth = widthRange
                        ? widthRange
                        : image?.width
                            ? image.width
                            : "";
                    newHeight =
                        !autoHeight && image?.height ? image.height : "";
                } else if (oldImageData?.media_details?.sizes) {
                    if (oldImageData.media_details.sizes?.[imageSize]) {
                        image.url = oldImageData.media_details.sizes?.[
                            imageSize
                        ]?.source_url
                            ? oldImageData.media_details.sizes?.[imageSize]
                                ?.source_url
                            : oldImageData.source_url;
                    } else {
                        image.url = oldImageData.source_url;
                    }
                    image["url"] = image.url;

                    newWidth = oldImageData.media_details.sizes?.[imageSize]
                        ?.width
                        ? oldImageData.media_details.sizes?.[imageSize]?.width
                        : oldImageData.width;
                    newHeight = oldImageData.media_details.sizes?.[imageSize]
                        ?.height
                        ? oldImageData.media_details.sizes?.[imageSize]?.height
                        : oldImageData.height;
                }

                setAttributes({
                    image,
                    widthRange: newWidth ? newWidth : "",
                    widthUnit: attributes["widthUnit"] ? attributes["widthUnit"] : "px",
                    // Only update heightRange if autoHeight is false and we don't have a custom value
                    heightRange: !autoHeight && !heightRange ? (newHeight ? newHeight : "") : heightRange,
                    heightUnit: attributes["heightUnit"] ? attributes["heightUnit"] : "px",
                });
            }
        }
        else if (imgSource === "featured-img" && media?.media_details?.sizes) {
            let featuredImgWidth = media.media_details.sizes?.[imageSize]?.width
                ? media.media_details.sizes?.[imageSize]?.width
                : media.width;
            let featuredImgHeight = media.media_details.sizes?.[imageSize]
                ?.height
                ? media.media_details.sizes?.[imageSize]?.height
                : media.height;

            setAttributes({
                widthRange: featuredImgWidth ? featuredImgWidth : "",
                widthUnit: attributes["widthUnit"] ? attributes["widthUnit"] : "px",
                // Only update heightRange if autoHeight is false and we don't have a custom value
                heightRange: !autoHeight && !heightRange ? (featuredImgHeight ? featuredImgHeight : "") : heightRange,
                heightUnit: attributes["heightUnit"] ? attributes["heightUnit"] : "px",
            });
        }
        prevImageSize.current = imageSize;
    }, [imageSize]);

    const onUrlBlur = (link) => {
        if (link === "" || sanitizeURL(link) !== "#") {
            setUrlError("");
        } else {
            setUrlError(
                __(
                    "Invalid URL. Please include http:// or https://",
                    "essential-blocks",
                ),
            );
        }
    };

    return (
        <InspectorPanel
            advancedControlProps={{
                marginPrefix: WRAPPER_MARGIN,
                paddingPrefix: WRAPPER_PADDING,
                backgroundPrefix: WRAPPER_BG,
                borderPrefix: WRAPPER_BORDER_SHADOW,
                hasMargin: true,
            }}
        >
            <InspectorPanel.General>
                <PanelBody
                    title={__("General", "essential-blocks")}
                    initialOpen={true}
                >
                    {!isInLoopBuilder && (
                        <SelectControl
                            label={__("Source", "essential-blocks")}
                            value={imgSource}
                            options={SOURCE}
                            onChange={(imgSource) => changImgSource(imgSource)}
                        />
                    )}

                    {imgSource !== "custom" && (
                        <>
                            {imgSource === "featured-img" && (
                                <SelectControl
                                    label={__("Styles", "essential-blocks")}
                                    description={__(
                                        "Border won't work",
                                        "essential-blocks",
                                    )}
                                    value={stylePreset}
                                    options={STYLES}
                                    onChange={(stylePreset) =>
                                        changeStyle(stylePreset)
                                    }
                                />
                            )}

                            {stylePreset === "circle" && (
                                <PanelRow>
                                    <em>
                                        Please use equal "Height" &#38; "Width"
                                        for perfect Circle shape.
                                    </em>
                                </PanelRow>
                            )}

                            {imgSource === "feature-img" && (
                                <EbImageSizeSelector
                                    attrName={"imageSize"}
                                    label={"Image Size"} //Optional
                                />
                            )}

                            <ResponsiveRangeController
                                baseLabel={__("Width", "essential-blocks")}
                                controlName={IMAGE_WIDTH}
                                defaultAttributes={objAttributes}
                                min={1}
                                max={2000}
                                step={1}
                                units={SIZE_UNIT_TYPES}
                            />

                            <ToggleControl
                                label={__("Auto Height", "essential-blocks")}
                                checked={autoHeight}
                                onChange={(autoHeight) =>
                                    setAttributes({ autoHeight })
                                }
                            />
                            {!autoHeight && (
                                <ResponsiveRangeController
                                    baseLabel={__("Height", "essential-blocks")}
                                    controlName={IMAGE_HEIGHT}
                                    defaultAttributes={objAttributes}
                                    min={0}
                                    max={1000}
                                    step={1}
                                    units={SIZE_UNIT_TYPES}
                                />
                            )}

                            <ToggleControl
                                label={__(
                                    "Auto Fit Image?",
                                    "essential-blocks",
                                )}
                                checked={autoFit}
                                onChange={(autoFit) =>
                                    setAttributes({ autoFit })
                                }
                            />

                            {imgSource !== "site-logo" && autoFit && (
                                <SelectControl
                                    label={__(
                                        "Image Fit Options",
                                        "essential-blocks",
                                    )}
                                    value={fitStyles}
                                    options={FIT_STYLES}
                                    onChange={(fitStyles) =>
                                        setAttributes({ fitStyles })
                                    }
                                />
                            )}

                            <ToggleControl
                                label={__("Enable Link?", "essential-blocks")}
                                checked={enableLink}
                                onChange={(enableLink) =>
                                    setAttributes({ enableLink })
                                }
                            />
                            {enableLink && (
                                <ToggleControl
                                    label={__(
                                        "Open in New Tab",
                                        "essential-blocks",
                                    )}
                                    checked={openInNewTab}
                                    onChange={(openInNewTab) =>
                                        setAttributes({
                                            openInNewTab,
                                        })
                                    }
                                />
                            )}
                        </>
                    )}

                    {imgSource === "custom" && (
                        <ImageComponent.GeneralTab
                            hasTag={false}
                            useImageAlign={true}
                        />
                    )}

                    <SelectControl
                        label={__("Hover Effect", "essential-blocks")}
                        value={hoverEffect}
                        options={HOVER_EFFECT}
                        onChange={(hoverEffect) =>
                            setAttributes({ hoverEffect })
                        }
                    />
                </PanelBody>
            </InspectorPanel.General>
            <InspectorPanel.Style>
                {imgSource !== "custom" && (
                    <>
                        <PanelBody
                            title={__("Image Settings", "essential-blocks")}
                        >
                            <ResponsiveAlignControl
                                baseLabel={__(
                                    "Image Align",
                                    "essential-blocks",
                                )}
                                controlName={IMAGE_ALIGNMENT}
                                options={IMAGE_ALIGN}
                                resOption={resOption}
                            />

                            {!complexStyle && (
                                <>
                                    <BaseControl>
                                        <h3 className="eb-control-title">
                                            {__("Border", "essential-blocks")}
                                        </h3>
                                    </BaseControl>
                                    <BorderShadowControl
                                        controlName={IMAGE_BORDER_SHADOW}
                                    // noShadow
                                    // noBorder
                                    />
                                </>
                            )}
                            {complexStyle && (
                                <PanelRow>
                                    <em>
                                        Border Style doesn't support for "
                                        {stylePreset} style".
                                    </em>
                                </PanelRow>
                            )}
                        </PanelBody>
                    </>
                )}
                {imgSource === "custom" && (
                    <>
                        <ImageComponent.StyleTab
                            border={IMAGE_BORDER_SHADOW}
                            hasFilter={false}
                            hasRadius={true}
                            hasWidth={true}
                            width={IMAGE_WIDTH}
                            hasHeight={true}
                            height={IMAGE_HEIGHT}
                            hasAutoHeight={true}
                        />
                    </>
                )}
            </InspectorPanel.Style>
        </InspectorPanel>
    );
}

export default Inspector;
