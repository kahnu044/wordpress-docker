import {
    WRAPPER_MARGIN,
    WRAPPER_PADDING,
    WRAPPER_BORDER_SHADOW,
    WRAPPER_BG,
    LARGE_IMAGE_HEIGHT,
    LARGE_IMAGE_BORDER,
    GALLERY_ICON_SIZE,
    GALLERY_COLUMN_SPACE,
    GALLERY_COLUMN_GAP,
    LARGE_IMAGE_WIDTH,
    FEATURE_IMG_MARGIN,
    THUMBNAILS_IMAGE_BORDER,
    ACTIVE_THUMBNAILS_IMAGE_BORDER
} from "./constants/constants";

import {
    softMinifyCssStrings,
    generateDimensionsControlStyles,
    generateBorderShadowStyles,
    generateResponsiveAlignStyles,
    generateBackgroundControlStyles,
    generateResponsiveRangeStyles,
    StyleComponent,
} from "@essential-blocks/controls";

export default function Style(props) {
    const { attributes, setAttributes, name, isContentEnabled } = props;

    const {
        blockId,
        largeImgScale,
        useAdaptiveHeight,
        galleryArrowColor,
        galleryArrowHoverColor,
        galleryArrowBackgroundColor,
        galleryArrowBackgroundHoverColor,
        featureImgAlignment
    } = attributes;

    // CSS/styling Codes Starts from Here
    const {
        dimensionStylesDesktop: wrapperMarginStylesDesktop,
        dimensionStylesTab: wrapperMarginStylesTab,
        dimensionStylesMobile: wrapperMarginStylesMobile,
    } = generateDimensionsControlStyles({
        controlName: WRAPPER_MARGIN,
        styleFor: "margin",
        attributes,
    });

    const {
        dimensionStylesDesktop: wrapperPaddingStylesDesktop,
        dimensionStylesTab: wrapperPaddingStylesTab,
        dimensionStylesMobile: wrapperPaddingStylesMobile,
    } = generateDimensionsControlStyles({
        controlName: WRAPPER_PADDING,
        styleFor: "padding",
        attributes,
    });

    const {
        styesDesktop: wrapperBDShadowDesktop,
        styesTab: wrapperBDShadowTab,
        styesMobile: wrapperBDShadowMobile,
        stylesHoverDesktop: wrapperBDShadowHoverDesktop,
        stylesHoverTab: wrapperBDShadowHoverTab,
        stylesHoverMobile: wrapperBDShadowHoverMobile,
        transitionStyle: wrapperBDShadowTransition,
    } = generateBorderShadowStyles({
        controlName: WRAPPER_BORDER_SHADOW,
        attributes,
        // noShadow: true,
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
    const {
        rangeStylesDesktop: largeImgHeightDesktop,
        rangeStylesTab: largeImgHeightTab,
        rangeStylesMobile: largeImgHeightMobile,
    } = generateResponsiveRangeStyles({
        controlName: LARGE_IMAGE_HEIGHT,
        property: "height",
        attributes,
    });

    const {
        styesDesktop: largeImageBDShadowDesktop,
        styesTab: largeImageBDShadowTab,
        styesMobile: largeImageBDShadowMobile,
        stylesHoverDesktop: largeImageBDShadowHoverDesktop,
        stylesHoverTab: largeImageBDShadowHoverTab,
        stylesHoverMobile: largeImageBDShadowHoverMobile,
        transitionStyle: largeImageBDShadowTransition,
    } = generateBorderShadowStyles({
        controlName: LARGE_IMAGE_BORDER,
        attributes,
    });

    const {
        rangeStylesDesktop: galleryIconSizeDesktop,
        rangeStylesTab: galleryIconSizeTab,
        rangeStylesMobile: galleryIconSizeMobile,
    } = generateResponsiveRangeStyles({
        controlName: GALLERY_ICON_SIZE,
        property: "font-size",
        attributes,
    });

    const {
        rangeStylesDesktop: sliderSpaceDesktop,
        rangeStylesTab: sliderSpaceTab,
        rangeStylesMobile: sliderSpaceMobile,
    } = generateResponsiveRangeStyles({
        controlName: GALLERY_COLUMN_SPACE,
        property: "gap",
        attributes,
    });

    const {
        rangeStylesDesktop: galleryColumnSpaceDesktop,
        rangeStylesTab: galleryColumnSpaceTab,
        rangeStylesMobile: galleryColumnSpaceMobile,
    } = generateResponsiveRangeStyles({
        controlName: GALLERY_COLUMN_GAP,
        property: null,
        attributes,
    });

    const {
        rangeStylesDesktop: featureImageWidthDesktop,
        rangeStylesTab: featureImageWidthTab,
        rangeStylesMobile: featureImageWidthMobile,
    } = generateResponsiveRangeStyles({
        controlName: LARGE_IMAGE_WIDTH,
        property: "width",
        attributes,
    });

    const {
        dimensionStylesDesktop: featureImgMarginStylesDesktop,
        dimensionStylesTab: featureImgMarginStylesTab,
        dimensionStylesMobile: featureImgMarginStylesMobile,
    } = generateDimensionsControlStyles({
        controlName: FEATURE_IMG_MARGIN,
        styleFor: "margin",
        attributes,
    });

    const {
        styesDesktop: thumbnailBDShadowDesktop,
        styesTab: thumbnailBDShadowTab,
        styesMobile: thumbnailBDShadowMobile,
        stylesHoverDesktop: thumbnailBDShadowHoverDesktop,
        stylesHoverTab: thumbnailBDShadowHoverTab,
        stylesHoverMobile: thumbnailBDShadowHoverMobile,
        transitionStyle: thumbnailBDShadowTransition,
    } = generateBorderShadowStyles({
        controlName: THUMBNAILS_IMAGE_BORDER,
        attributes,
        // noShadow: true,
    });

    const {
        styesDesktop: thumbnailActiveBDShadowDesktop,
        styesTab: thumbnailActiveBDShadowTab,
        styesMobile: thumbnailActiveBDShadowMobile,
        stylesHoverDesktop: thumbnailActiveBDShadowHoverDesktop,
        stylesHoverTab: thumbnailActiveBDShadowHoverTab,
        stylesHoverMobile: thumbnailActiveBDShadowHoverMobile,
        transitionStyle: thumbnailActiveBDShadowTransition,
    } = generateBorderShadowStyles({
        controlName: ACTIVE_THUMBNAILS_IMAGE_BORDER,
        attributes,
        // noShadow: true,
    });


    // wrapper styles css in strings ⬇
    const wrapperStylesDesktop = `
		.eb-product-images-wrapper.${blockId}{
			${wrapperMarginStylesDesktop}
			${wrapperPaddingStylesDesktop}
			${wrapperBackgroundStylesDesktop}
			${wrapperBDShadowDesktop}
			transition: ${wrapperBgTransitionStyle}, ${wrapperBDShadowTransition};
		}
		.eb-product-images-wrapper.${blockId}:hover {
			${wrapperHoverBackgroundStylesDesktop}
			${wrapperBDShadowHoverDesktop}
		}
	`;
    const wrapperStylesTab = `
		.eb-product-images-wrapper.${blockId}{
			${wrapperMarginStylesTab}
			${wrapperPaddingStylesTab}
			${wrapperBackgroundStylesTab}
			${wrapperBDShadowTab}
		}
		.eb-product-images-wrapper.${blockId}:hover {
			${wrapperHoverBackgroundStylesTab}
			${wrapperBDShadowHoverTab}
		}
	`;
    const wrapperStylesMobile = `
		.eb-product-images-wrapper.${blockId} {
			${wrapperMarginStylesMobile}
			${wrapperPaddingStylesMobile}
			${wrapperBackgroundStylesMobile}
			${wrapperBDShadowMobile}
		}
		.eb-product-images-wrapper.${blockId}:hover {
			${wrapperHoverBackgroundStylesMobile}
			${wrapperBDShadowHoverMobile}
		}
	`;
   const largeImageDesktop = `
        .eb-product-images-wrapper.${blockId} .eb-product-image_slider .slick-list {
            ${featureImgMarginStylesDesktop}
        }
   
        .eb-product-images-wrapper.${blockId} .eb-product-image_slider-body-item {
            justify-content: ${featureImgAlignment};
        }
        .eb-product-images-wrapper.${blockId} .eb-product-image_slider-body-item .eb-product-gallery-image {
            ${! useAdaptiveHeight ? `
                ${largeImgHeightDesktop}
                object-fit: ${largeImgScale};
            ` : ''}
            ${largeImageBDShadowDesktop}
            ${featureImageWidthDesktop}
        }

        .eb-product-images-wrapper.${blockId} .eb-product-image_slider-body-item .eb-product-gallery-image:hover {
            ${largeImageBDShadowHoverDesktop}
        }
   `;

   const largeImageTab = `
        .eb-product-images-wrapper.${blockId} .eb-product-image_slider .slick-list {
            ${featureImgMarginStylesTab}
        }
        .eb-product-images-wrapper.${blockId} .eb-product-image_slider-body-item .eb-product-gallery-image {
            ${! useAdaptiveHeight ? `
                ${largeImgHeightTab}
            ` : ''}
            ${largeImageBDShadowTab}
            ${featureImageWidthTab}
        }
        .eb-product-images-wrapper.${blockId} .eb-product-image_slider-body-item .eb-product-gallery-image:hover {
            ${largeImageBDShadowHoverTab}
        }
   `;

   const largeImageMobile = `
        .eb-product-images-wrapper.${blockId} .eb-product-image_slider .slick-list {
            ${featureImgMarginStylesMobile}
        }
        .eb-product-images-wrapper.${blockId} .eb-product-image_slider-body-item .eb-product-gallery-image {
            ${! useAdaptiveHeight ? `
                ${largeImgHeightMobile}
            ` : ''}
            ${largeImageBDShadowMobile}
            ${featureImageWidthMobile}
        }
        .eb-product-images-wrapper.${blockId} .eb-product-image_slider-body-item .eb-product-gallery-image:hover {
            ${largeImageBDShadowHoverMobile}
        }
   `;

   const galleryIconDesktop = `
        .eb-product-images-wrapper.${blockId} .eb-product-image_slider-footer .eb-product-image_slider-footer-item img {
            ${thumbnailBDShadowDesktop}
        }
        .eb-product-images-wrapper.${blockId} .eb-product-image_slider-footer .eb-product-image_slider-footer-item:hover img {
            ${thumbnailBDShadowHoverDesktop}
        }
        .eb-product-images-wrapper.${blockId} .eb-product-image_slider-footer .eb-product-image_slider-footer-item.slick-center img,
        .eb-product-images-wrapper.${blockId} .eb-product-image_slider-footer .eb-product-image_slider-footer-item.slick-current img {
            ${thumbnailActiveBDShadowDesktop}
            transition: ${thumbnailActiveBDShadowTransition};
        }
        .eb-product-images-wrapper.${blockId} .eb-product-image_slider-footer .eb-product-image_slider-footer-item.slick-center:hover img,
        .eb-product-images-wrapper.${blockId} .eb-product-image_slider-footer .eb-product-image_slider-footer-item.slick-current:hover img  {
            ${thumbnailActiveBDShadowHoverDesktop}
        }
        .eb-product-images-wrapper.${blockId} .eb-product-image_slider .eb-product-image_slider-footer button.slick-prev:before,
        .eb-product-images-wrapper.${blockId} .eb-product-image_slider .eb-product-image_slider-footer button.slick-next:before {
            ${galleryIconSizeDesktop}
            color: ${galleryArrowColor};
            transition: all 0.3s ease;
        }
        
        .eb-product-images-wrapper.${blockId} .eb-product-image_slider .eb-product-image_slider-footer button:hover:before {
            color: ${galleryArrowHoverColor};
        }

        .eb-product-images-wrapper.${blockId} .eb-product-image_slider .eb-product-image_slider-footer button {
            background-color: ${galleryArrowBackgroundColor};
            transition: all 0.3s ease;
        }

        .eb-product-images-wrapper.${blockId} .eb-product-image_slider .eb-product-image_slider-footer button:hover {
            background-color: ${galleryArrowBackgroundHoverColor};
        }

        .eb-product-images-wrapper.${blockId} .eb-product-image_slider.eb-product-gallery-bottom .eb-product-image_slider-footer .eb-product-image_slider-footer-item,
        .eb-product-images-wrapper.${blockId} .eb-product-image_slider.eb-product-gallery-top .eb-product-image_slider-footer .eb-product-image_slider-footer-item {
            padding: 0 ${galleryColumnSpaceDesktop};
        }
   `;

   const galleryIconTab = `
        .eb-product-images-wrapper.${blockId} .eb-product-image_slider-footer .eb-product-image_slider-footer-item img {
            ${thumbnailBDShadowTab}
            transition: ${thumbnailBDShadowTransition};
        }
        .eb-product-images-wrapper.${blockId} .eb-product-image_slider-footer .eb-product-image_slider-footer-item:hover img {
            ${thumbnailBDShadowHoverTab}
        }
        .eb-product-images-wrapper.${blockId} .eb-product-image_slider-footer .eb-product-image_slider-footer-item.slick-center img,
        .eb-product-images-wrapper.${blockId} .eb-product-image_slider-footer .eb-product-image_slider-footer-item.slick-current img  {
            ${thumbnailActiveBDShadowTab}
        }
        .eb-product-images-wrapper.${blockId} .eb-product-image_slider-footer .eb-product-image_slider-footer-item.slick-center:hover img,
        .eb-product-images-wrapper.${blockId} .eb-product-image_slider-footer .eb-product-image_slider-footer-item.slick-current:hover img {
            ${thumbnailActiveBDShadowHoverTab}
        }
        .eb-product-images-wrapper.${blockId} .eb-product-image_slider .eb-product-image_slider-footer button.slick-prev:before,
        .eb-product-images-wrapper.${blockId} .eb-product-image_slider .eb-product-image_slider-footer button.slick-next:before {
            ${galleryIconSizeTab}
        }
        
        .eb-product-images-wrapper.${blockId} .eb-product-image_slider.eb-product-gallery-bottom .eb-product-image_slider-footer .eb-product-image_slider-footer-item,
        .eb-product-images-wrapper.${blockId} .eb-product-image_slider.eb-product-gallery-top .eb-product-image_slider-footer .eb-product-image_slider-footer-item {
            padding: 0 ${galleryColumnSpaceTab};
        }
   `;

   const galleryIconMobile = `
        .eb-product-images-wrapper.${blockId} .eb-product-image_slider-footer .eb-product-image_slider-footer-item img {
            ${thumbnailBDShadowMobile}
        }
        .eb-product-images-wrapper.${blockId} .eb-product-image_slider-footer .eb-product-image_slider-footer-item:hover img {
            ${thumbnailBDShadowHoverMobile}
        }
        .eb-product-images-wrapper.${blockId} .eb-product-image_slider-footer .eb-product-image_slider-footer-item.slick-center img,
        .eb-product-images-wrapper.${blockId} .eb-product-image_slider-footer .eb-product-image_slider-footer-item.slick-current img {
            ${thumbnailActiveBDShadowMobile}
        }
        .eb-product-images-wrapper.${blockId} .eb-product-image_slider-footer .eb-product-image_slider-footer-item.slick-center:hover img,
        .eb-product-images-wrapper.${blockId} .eb-product-image_slider-footer .eb-product-image_slider-footer-item.slick-current:hover img {
            ${thumbnailActiveBDShadowHoverMobile}
        }
        .eb-product-images-wrapper.${blockId} .eb-product-image_slider .eb-product-image_slider-footer button.slick-prev:before,
        .eb-product-images-wrapper.${blockId} .eb-product-image_slider .eb-product-image_slider-footer button.slick-next:before {
            ${galleryIconSizeMobile}
        }

        .eb-product-images-wrapper.${blockId} .eb-product-image_slider.eb-product-gallery-bottom .eb-product-image_slider-footer .eb-product-image_slider-footer-item,
        .eb-product-images-wrapper.${blockId} .eb-product-image_slider.eb-product-gallery-top .eb-product-image_slider-footer .eb-product-image_slider-footer-item {
            padding: 0 ${galleryColumnSpaceMobile};
        }
   `;
   const sliderStyleDesktop = `
        .eb-product-images-wrapper.${blockId} .eb-product-image_slider {
            ${sliderSpaceDesktop}
        }
   `;
   const sliderStyleTab = `
        .eb-product-images-wrapper.${blockId} .eb-product-image_slider {
            ${sliderSpaceTab}
        }
   `;
   const sliderStyleMobile = `
        .eb-product-images-wrapper.${blockId} .eb-product-image_slider {
            ${sliderSpaceMobile}
        }
   `;

    
    


    // all css styles for large screen width (desktop/laptop) in strings ⬇
    const desktopAllStyles = softMinifyCssStrings(`
        ${wrapperStylesDesktop}
        ${largeImageDesktop}
        ${galleryIconDesktop}
        ${sliderStyleDesktop}
	`);

    // all css styles for Tab in strings ⬇
    const tabAllStyles = softMinifyCssStrings(`
		${wrapperStylesTab}
        ${largeImageTab}
        ${galleryIconTab}
        ${sliderStyleTab}
	`);

    // all css styles for Mobile in strings ⬇
    const mobileAllStyles = softMinifyCssStrings(`
		${wrapperStylesMobile}
        ${largeImageMobile}
        ${galleryIconMobile}
        ${sliderStyleMobile}
	`);

    return (
        <>
            <StyleComponent
                attributes={attributes}
                setAttributes={setAttributes}
                desktopAllStyles={desktopAllStyles}
                tabAllStyles={tabAllStyles}
                mobileAllStyles={mobileAllStyles}
                blockName={name}
            />
        </>
    );
}
