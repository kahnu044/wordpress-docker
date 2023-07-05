/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useEffect, createRef } from "@wordpress/element";
import {
    MediaUpload,
    MediaPlaceholder,
    BlockControls,
    useBlockProps,
    RichText
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
import {
    WRAPPER_BG,
    WRAPPER_MARGIN,
    WRAPPER_PADDING,
    WRAPPER_BORDER_SHADOW,
    TITLE_MARGIN,
    SUBTITLE_MARGIN,
    BUTTON_MARGIN,
    BUTTON_PADDING,
    BUTTON_BORDER_SHADOW,
    SLIDE_TO_SHOW,
    CUSTOM_HEIGHT,
    DOTS_GAP,
    ARROW_POSITION,
    DOTS_POSITION,
    ARROW_SIZE,
    DOTS_SIZE,
    SLIDES_GAP,
} from "./constants/constants";
import {
    TITLE_TYPOGRAPHY,
    SUBTITLE_TYPOGRAPHY,
    BUTTON_TYPOGRAPHY,
} from "./constants/typography-constant";

import {
    handleTitle,
    handleSubtitle,
    handleShowButton,
    handleButtonText,
    handleButtonURL,
    handleOpenNewTab
} from "./helpers"

const {
    softMinifyCssStrings,
    generateTypographyStyles,
    generateDimensionsControlStyles,
    generateBorderShadowStyles,
    generateResponsiveRangeStyles,
    generateBackgroundControlStyles,
    // mimmikCssForPreviewBtnClick,
    duplicateBlockIdFix,
    isValidHtml
} = window.EBControls;

/**
 * External dependencies
 */
import classnames from "classnames";
import Slider from "react-slick";

export default function Edit(props) {
    const { attributes, setAttributes, className, clientId, isSelected } = props;
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
        isCustomHeight,
        speed,
        initialSlide,
        titleColor,
        subtitleColor,
        buttonColor,
        buttonHoverColor,
        buttonBGColor,
        buttonHoverBGColor,
        overlayColor,
        arrowColor,
        arrowHoverColor,
        dotsColor,
        dotsActiveColor,
        textAlign,
        verticalAlign,
        classHook,
    } = attributes;

    // this useEffect is for creating a unique id for each block's unique className by a random unique number
    useEffect(() => {
        const BLOCK_PREFIX = "eb-slider";
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

    // Title Typography
    const {
        typoStylesDesktop: titleTypographyDesktop,
        typoStylesTab: titleTypographyTab,
        typoStylesMobile: titleTypographyMobile,
    } = generateTypographyStyles({
        attributes,
        prefixConstant: TITLE_TYPOGRAPHY,
        defaultFontSize: 24,
    });

    // Sub Title Typography
    const {
        typoStylesDesktop: subtitleTypographyDesktop,
        typoStylesTab: subtitleTypographyTab,
        typoStylesMobile: subtitleTypographyMobile,
    } = generateTypographyStyles({
        attributes,
        prefixConstant: SUBTITLE_TYPOGRAPHY,
        defaultFontSize: 16,
    });

    // Button Typography
    const {
        typoStylesDesktop: buttonTypographyDesktop,
        typoStylesTab: buttonTypographyTab,
        typoStylesMobile: buttonTypographyMobile,
    } = generateTypographyStyles({
        attributes,
        prefixConstant: BUTTON_TYPOGRAPHY,
        defaultFontSize: 14,
    });

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

    /* Title Margin */
    const {
        dimensionStylesDesktop: titleMarginDesktop,
        dimensionStylesTab: titleMarginTab,
        dimensionStylesMobile: titleMarginMobile,
    } = generateDimensionsControlStyles({
        controlName: TITLE_MARGIN,
        styleFor: "margin",
        attributes,
    });

    /* Subtitle Margin */
    const {
        dimensionStylesDesktop: subtitleMarginDesktop,
        dimensionStylesTab: subtitleMarginTab,
        dimensionStylesMobile: subtitleMarginMobile,
    } = generateDimensionsControlStyles({
        controlName: SUBTITLE_MARGIN,
        styleFor: "margin",
        attributes,
    });

    /* Button Margin */
    const {
        dimensionStylesDesktop: buttonMarginDesktop,
        dimensionStylesTab: buttonMarginTab,
        dimensionStylesMobile: buttonMarginMobile,
    } = generateDimensionsControlStyles({
        controlName: BUTTON_MARGIN,
        styleFor: "margin",
        attributes,
    });

    /* Button Padding */
    const {
        dimensionStylesDesktop: buttonPaddingDesktop,
        dimensionStylesTab: buttonPaddingTab,
        dimensionStylesMobile: buttonPaddingMobile,
    } = generateDimensionsControlStyles({
        controlName: BUTTON_PADDING,
        styleFor: "padding",
        attributes,
    });

    // range controller Slider Height
    const {
        rangeStylesDesktop: sliderHeightDesktop,
        rangeStylesTab: sliderHeightTab,
        rangeStylesMobile: sliderHeightMobile,
    } = generateResponsiveRangeStyles({
        controlName: CUSTOM_HEIGHT,
        property: "height",
        attributes,
    });

    // range controller Slides to Show
    const {
        rangeStylesDesktop: slideToShowDesktop,
        rangeStylesTab: slideToShowTab,
        rangeStylesMobile: slideToShowMobile,
    } = generateResponsiveRangeStyles({
        controlName: SLIDE_TO_SHOW,
        property: "",
        attributes,
    });

    // range controller Slider Dots Gap
    const {
        rangeStylesDesktop: dotsGapDesktop,
        rangeStylesTab: dotsGapTab,
        rangeStylesMobile: dotsGapMobile,
    } = generateResponsiveRangeStyles({
        controlName: DOTS_GAP,
        property: "margin-right",
        attributes,
    });

    // range controller Slider Left Arrow Position
    const {
        rangeStylesDesktop: leftArrowPositionDesktop,
        rangeStylesTab: leftArrowPositionTab,
        rangeStylesMobile: leftArrowPositionMobile,
    } = generateResponsiveRangeStyles({
        controlName: ARROW_POSITION,
        property: "left",
        attributes,
    });

    // range controller Slider Left Arrow Position
    const {
        rangeStylesDesktop: rightArrowPositionDesktop,
        rangeStylesTab: rightArrowPositionTab,
        rangeStylesMobile: rightArrowPositionMobile,
    } = generateResponsiveRangeStyles({
        controlName: ARROW_POSITION,
        property: "right",
        attributes,
    });

    // range controller Slider Arrow Size
    const {
        rangeStylesDesktop: arrowSizeDesktop,
        rangeStylesTab: arrowSizeTab,
        rangeStylesMobile: arrowSizeMobile,
    } = generateResponsiveRangeStyles({
        controlName: ARROW_SIZE,
        property: "font-size",
        attributes,
    });

    // range controller Slider Arrow Size
    const {
        rangeStylesDesktop: dotsSizeDesktop,
        rangeStylesTab: dotsSizeTab,
        rangeStylesMobile: dotsSizeMobile,
    } = generateResponsiveRangeStyles({
        controlName: DOTS_SIZE,
        property: "font-size",
        attributes,
    });

    // range controller Slider Slides Gap
    const {
        rangeStylesDesktop: slidesGapDesktop,
        rangeStylesTab: slidesGapTab,
        rangeStylesMobile: slidesGapMobile,
    } = generateResponsiveRangeStyles({
        controlName: SLIDES_GAP,
        property: "padding",
        attributes,
    });

    // range controller Slider Dots Position
    const {
        rangeStylesDesktop: dotsPositionDesktop,
        rangeStylesTab: dotsPositionTab,
        rangeStylesMobile: dotsPositionMobile,
    } = generateResponsiveRangeStyles({
        controlName: DOTS_POSITION,
        property: "bottom",
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

    // generateBorderShadowStyles for Button ⬇
    const {
        styesDesktop: buttonBDShadowDesktop,
        styesTab: buttonBDShadowTab,
        styesMobile: buttonBDShadowMobile,
        stylesHoverDesktop: buttonBDShadowHoverDesktop,
        stylesHoverTab: buttonBDShadowHoverTab,
        stylesHoverMobile: buttonBDShadowHoverMobile,
        transitionStyle: buttonBDShadowTransitionStyle,
    } = generateBorderShadowStyles({
        controlName: BUTTON_BORDER_SHADOW,
        attributes,
        // noShadow: true,
        // noBorder: true,
    });

    // wrapper styles css in strings ⬇
    const wrapperStylesDesktop = `
		.eb-slider-wrapper.${blockId}{
			${wrapperMarginDesktop}
			${wrapperPaddingDesktop}
			${wrapperBDShadowDesktop}
			transition: ${wrapperBDShadowTransitionStyle}, ${wrapperBgTransitionStyle};
			${wrapperBackgroundStylesDesktop}
		}
		.eb-slider-wrapper.${blockId}:hover {
			${wrapperBDShadowHoverDesktop}
		}
	`;
    const wrapperStylesTab = `
		.eb-slider-wrapper.${blockId}{
			${wrapperMarginTab}
			${wrapperPaddingTab}
			${wrapperBDShadowTab}
			${wrapperBackgroundStylesTab}
		}
		.eb-slider-wrapper.${blockId}:hover {
			${wrapperBDShadowHoverTab}
		}
	`;
    const wrapperStylesMobile = `
		.eb-slider-wrapper.${blockId}{
			${wrapperMarginMobile}
			${wrapperPaddingMobile}
			${wrapperBDShadowMobile}
			${wrapperBackgroundStylesMobile}
		}
		.eb-slider-wrapper.${blockId}:hover {
			${wrapperBDShadowHoverMobile}
		}
	`;

    const sliderStylesDesktop = `
		.eb-slider-wrapper.${blockId} .slick-slide > * {
			${slidesGapDesktop}
		}
		.eb-slider-wrapper.${blockId} .content .eb-slider-item {
			text-align: ${textAlign};
			align-items: ${verticalAlign};
		}
		.eb-slider-wrapper.${blockId} .slick-slider .eb-slider-item img {
			${isCustomHeight ? sliderHeightDesktop : ""}
		}
		.eb-slider-wrapper.${blockId} .content .eb-slider-item.content-1 .eb-slider-content {
			background-color: ${overlayColor};
			justify-content: ${verticalAlign};
		}
		.eb-slider-wrapper.${blockId} .content .eb-slider-item .eb-slider-content .eb-slider-title {
			color: ${titleColor};
			${titleMarginDesktop}
			${titleTypographyDesktop}
		}
		.eb-slider-wrapper.${blockId} .content .eb-slider-item .eb-slider-content .eb-slider-subtitle {
			color: ${subtitleColor};
			${subtitleMarginDesktop}
			${subtitleTypographyDesktop}
		}
		.eb-slider-wrapper.${blockId} .content .eb-slider-item .eb-slider-content .eb-slider-button {
			color: ${buttonColor};
			background-color: ${buttonBGColor};
			${buttonMarginDesktop}
			${buttonPaddingDesktop}
			${buttonTypographyDesktop}
			${buttonBDShadowDesktop}
			transition: ${buttonBDShadowTransitionStyle};
		}
		.eb-slider-wrapper.${blockId} .content .eb-slider-item .eb-slider-content .eb-slider-button:hover {
			color: ${buttonHoverColor};
			background-color: ${buttonHoverBGColor};
			${buttonTypographyDesktop}
			${buttonBDShadowHoverDesktop}
		}
	`;
    const sliderStylesTab = `
		.eb-slider-wrapper.${blockId} .slick-slide > * {
			${slidesGapTab}
		}
		.eb-slider-wrapper.${blockId} .slick-slider .eb-slider-item img {
			${isCustomHeight &&
            (sliderType === "image" ||
                (sliderType === "content" && sliderContentType === "content-1"))
            ? sliderHeightTab
            : ""
        }
		}
		.eb-slider-wrapper.${blockId} .content .eb-slider-item .eb-slider-content .eb-slider-title {
			${titleMarginTab}
			${titleTypographyTab}
		}
		.eb-slider-wrapper.${blockId} .content .eb-slider-item .eb-slider-content .eb-slider-subtitle {
			${subtitleMarginTab}
			${subtitleTypographyTab}
		}
		.eb-slider-wrapper.${blockId} .content .eb-slider-item .eb-slider-content .eb-slider-button {
			${buttonMarginTab}
			${buttonPaddingTab}
			${buttonTypographyTab}
			${buttonBDShadowTab}
		}
		.eb-slider-wrapper.${blockId} .content .eb-slider-item .eb-slider-content .eb-slider-button:hover {
			${buttonTypographyTab}
			${buttonBDShadowHoverTab}
		}
	`;
    const sliderStylesMobile = `
		.eb-slider-wrapper.${blockId} .slick-slide > * {
			${slidesGapMobile}
		}
		.eb-slider-wrapper.${blockId} .slick-slider .eb-slider-item img {
			${isCustomHeight &&
            (sliderType === "image" ||
                (sliderType === "content" && sliderContentType === "content-1"))
            ? sliderHeightMobile
            : ""
        }
		}
		.eb-slider-wrapper.${blockId} .content .eb-slider-item .eb-slider-content .eb-slider-title {
			${titleMarginMobile}
			${titleTypographyMobile}
		}
		.eb-slider-wrapper.${blockId} .content .eb-slider-item .eb-slider-content .eb-slider-subtitle {
			${subtitleMarginMobile}
			${subtitleTypographyMobile}
		}
		.eb-slider-wrapper.${blockId} .content .eb-slider-item .eb-slider-content .eb-slider-button {
			${buttonMarginMobile}
			${buttonPaddingMobile}
			${buttonTypographyMobile}
			${buttonBDShadowMobile}
		}
		.eb-slider-wrapper.${blockId} .content .eb-slider-item .eb-slider-content .eb-slider-button:hover {
			${buttonTypographyMobile}
			${buttonBDShadowHoverMobile}
		}
	`;
    const sliderControlsStylesDesktop = `
		.eb-slider-wrapper.${blockId} .slick-prev {
			${leftArrowPositionDesktop}
		}
		.eb-slider-wrapper.${blockId} .slick-next {
			${rightArrowPositionDesktop}
		}
		.eb-slider-wrapper.${blockId} .slick-prev:before,
		.eb-slider-wrapper.${blockId} .slick-next:before {
			color: ${arrowColor} !important;
			${arrowSizeDesktop}
		}
		.eb-slider-wrapper.${blockId} .slick-prev:hover:before,
		.eb-slider-wrapper.${blockId} .slick-next:hover:before {
			color: ${arrowHoverColor} !important;
		}
		.eb-slider-wrapper.${blockId} .slick-dots {
			${dotsPositionDesktop}
		}
		.eb-slider-wrapper.${blockId} .slick-dots li {
			${dotsGapDesktop}
		}
		.eb-slider-wrapper.${blockId} .slick-dots li button:before {
			color: ${dotsColor} !important;
			${dotsSizeDesktop}
		}
		.eb-slider-wrapper.${blockId} .slick-dots li.slick-active button:before {
			color: ${dotsActiveColor} !important;
		}
	`;
    const sliderControlsStylesTab = `
		.eb-slider-wrapper.${blockId} .slick-prev {
			${leftArrowPositionTab}
		}
		.eb-slider-wrapper.${blockId} .slick-next {
			${rightArrowPositionTab}
		}
		.eb-slider-wrapper.${blockId} .slick-prev:before,
		.eb-slider-wrapper.${blockId} .slick-next:before {
			${arrowSizeTab}
		}
		.eb-slider-wrapper.${blockId} .slick-dots {
			${dotsPositionTab}
		}
		.eb-slider-wrapper.${blockId} .slick-dots li {
			${dotsGapTab}
		}
		.eb-slider-wrapper.${blockId} .slick-dots li button:before {
			${dotsSizeTab}
		}
	`;
    const sliderControlsStylesMobile = `
		.eb-slider-wrapper.${blockId} .slick-prev {
			${leftArrowPositionMobile}
		}
		.eb-slider-wrapper.${blockId} .slick-next {
			${rightArrowPositionMobile}
		}
		.eb-slider-wrapper.${blockId} .slick-prev:before,
		.eb-slider-wrapper.${blockId} .slick-next:before {
			${arrowSizeMobile}
		}
		.eb-slider-wrapper.${blockId} .slick-dots {
			${dotsPositionMobile}
		}
		.eb-slider-wrapper.${blockId} .slick-dots li {
			${dotsGapMobile}
		}
		.eb-slider-wrapper.${blockId} .slick-dots li button:before {
			${dotsSizeMobile}
		}
	`;

    // all css styles for large screen width (desktop/laptop) in strings ⬇
    const desktopAllStyles = softMinifyCssStrings(`
		${wrapperStylesDesktop}
		${sliderStylesDesktop}
		${sliderControlsStylesDesktop}
	`);

    // all css styles for Tab in strings ⬇
    const tabAllStyles = softMinifyCssStrings(`
		${wrapperStylesTab}
		${sliderStylesTab}
		${sliderControlsStylesTab}
	`);

    // all css styles for Mobile in strings ⬇
    const mobileAllStyles = softMinifyCssStrings(`
		${wrapperStylesMobile}
		${sliderStylesMobile}
		${sliderControlsStylesMobile}
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
        slidesToShow: parseInt(slideToShowDesktop.replace(/[^0-9]/g, "")),
        speed,
        initialSlide,
        vertical,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: slideToShowTab
                        ? parseInt(slideToShowTab.replace(/[^0-9]/g, ""))
                        : parseInt(slideToShowDesktop.replace(/[^0-9]/g, "")),
                },
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: slideToShowMobile
                        ? parseInt(slideToShowMobile.replace(/[^0-9]/g, ""))
                        : parseInt(slideToShowDesktop.replace(/[^0-9]/g, "")),
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
                const thisImage = images.filter((data, index) => data.imageId === selectedImage.id);

                if (thisImage.length > 0) {
                    item.title = thisImage[0].title
                        ? thisImage[0].title
                        : `Slider ${selectedIndex + 1}`;
                    item.subtitle = thisImage[0].subtitle
                        ? thisImage[0].subtitle
                        : "Essential Blocks Slider Subtitle";
                    item.showButton = thisImage[0].showButton ? thisImage[0].showButton : true;
                    item.buttonText = thisImage[0].buttonText ? thisImage[0].buttonText : "See More";
                    item.buttonUrl = thisImage[0].buttonUrl;
                    item.openNewTab = thisImage[0].openNewTab ? thisImage[0].openNewTab : false;
                    item.isValidUrl = thisImage[0].isValidUrl;
                }
                else {
                    item.title = selectedImage.caption
                        ? selectedImage.caption
                        : `Slider ${selectedIndex + 1}`;
                    item.subtitle = "Essential Blocks Slider Subtitle";
                    item.showButton = true;
                    item.buttonText = "See More";
                    item.buttonUrl = "";
                    item.openNewTab = false;
                    item.isValidUrl = true;
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
            }
            updatedImages.push(item);
        });
        setAttributes({ images: updatedImages });
    }

    // Show image placeholder if there is no image
    if (!hasImages) {
        return (
            <MediaPlaceholder
                addToGallery={hasImages}
                isAppender={hasImages}
                dropZoneUIOnly={hasImages && !isSelected}
                labels={{
                    title: !hasImages && __("Images", "essential-blocks"),
                    instructions:
                        !hasImages &&
                        __(
                            "Drag images, upload new ones or select files from your library."
                        ),
                }}
                onSelect={(selectedImages) => onImageSelect(selectedImages, images)}
                accept="image/*"
                allowedTypes={["image"]}
                multiple
                value={hasImages ? images : undefined}
            />
        );
    }

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
                                        label={__("Edit gallery", "essential-blocks")}
                                        icon="edit"
                                        onClick={open}
                                    />
                                )}
                            />
                        )}
                    </ToolbarItem>
                </ToolbarGroup>
            </BlockControls>
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

                <div className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`}>
                    <div className={`eb-slider-wrapper ${blockId}`}>
                        <Slider
                            ref={slider}
                            {...settings}
                            key={`${autoplay}-${adaptiveHeight}`}
                            className={sliderType}
                        >
                            {images.map((image, index) => (
                                <div
                                    className={`eb-slider-item ${sliderContentType}`}
                                    key={index}
                                >
                                    <img className="eb-slider-image" src={image.url} />
                                    {sliderType === "content" && (
                                        <div className={`eb-slider-content align-${textAlign}`}>
                                            {image.title && image.title.length > 0 && (
                                                <>
                                                    <RichText
                                                        tagName={'h2'}
                                                        className="eb-slider-title"
                                                        value={isValidHtml(image.title) ? image.title : 'Invalid HTML Tag'}
                                                        allowedFormats={[
                                                            'core/bold',
                                                            'core/italic',
                                                            'core/text-color',
                                                            'core/underline',
                                                            'core/link'
                                                        ]}
                                                        onChange={(text) => handleTitle(text, index, images, setAttributes)}
                                                    />
                                                </>
                                            )}
                                            {image.subtitle && image.subtitle.length > 0 && (
                                                <>
                                                    <RichText
                                                        tagName={'p'}
                                                        className="eb-slider-subtitle"
                                                        value={isValidHtml(image.subtitle) ? image.subtitle : 'Invalid HTML Tag'}
                                                        allowedFormats={[
                                                            'core/bold',
                                                            'core/italic',
                                                            'core/text-color',
                                                            'core/underline',
                                                            'core/link'
                                                        ]}
                                                        onChange={(text) => handleSubtitle(text, index, images, setAttributes)}
                                                    />
                                                </>
                                            )}
                                            {image.showButton &&
                                                image.buttonText &&
                                                image.buttonText.length > 0 && (
                                                    <>
                                                        <a
                                                            href={
                                                                image.buttonUrl && image.isValidUrl
                                                                    ? image.buttonUrl
                                                                    : "#"
                                                            }
                                                            className="eb-slider-button"
                                                            target={image.openNewTab ? "_blank" : "_self"}
                                                            rel="noopener"
                                                        >
                                                            <RichText
                                                                value={isValidHtml(image.buttonText) ? image.buttonText : 'Invalid HTML Tag'}
                                                                allowedFormats={[
                                                                    'core/bold',
                                                                    'core/italic',
                                                                    'core/text-color',
                                                                    'core/underline'
                                                                ]}
                                                                onChange={(text) => handleButtonText(text, index, images, setAttributes)}
                                                            />
                                                        </a>
                                                    </>
                                                )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            </div>
        </>
    );
}
