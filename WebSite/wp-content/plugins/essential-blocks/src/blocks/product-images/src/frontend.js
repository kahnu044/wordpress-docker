import domReady from '@wordpress/dom-ready';

domReady( function () {
    const wrappers = document.querySelectorAll(`.eb-product-images-wrapper`);

    if( ! wrappers) {
        return;
    }

    for (let wrapper of wrappers) {
        // get images
        const wrapperId             = wrapper.getAttribute("data-id");
        const gallery               = wrapper.querySelector(".eb-product-image_slider");
        const galleryImages         = gallery.querySelectorAll('.eb-product-image_slider-body-item');
        const sliderBody            = gallery.querySelector(".eb-product-image_slider-body");
        const sliderFooter          = gallery.querySelector(".eb-product-image_slider-footer");
        const largeImageSettings    = JSON.parse(wrapper.getAttribute('data-settings'));
        const navSettings           = JSON.parse(wrapper.getAttribute('data-nav-settings'));
        
        (function ($) {
            $(sliderBody).slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                fade: true,
                asNavFor: `.${wrapperId} .eb-product-image_slider-footer`,
                adaptiveHeight: largeImageSettings?.adaptiveHeight
            });
        })(jQuery);

        (function ($) {
            $(sliderFooter).slick({
                slidesToShow: 4,
                slidesToScroll: 1,
                asNavFor: `.${wrapperId} .eb-product-image_slider-body`,
                dots: false,
                arrows: !navSettings?.disableNavArrow,
                focusOnSelect: true,
                vertical: (navSettings?.galleryPosition == 'left' || navSettings?.galleryPosition == 'right') ? true : false,
                centerMode: true,
                centerPadding: (navSettings?.galleryPosition == 'top' || navSettings?.galleryPosition == 'bottom') ? "60px" : "",
                prevArrow: '<button type="button" class="slick-prev"><i class="fa-solid fa-chevron-left"></i></button>',
                nextArrow: '<button type="button" class="slick-next"><i class="fa-solid fa-chevron-right"></i></button>'
            });
        })(jQuery);

        

        if(galleryImages.length > 0) {
            initImageGallery(gallery, galleryImages);
            let images = getImages(galleryImages);
            sliderBody.insertAdjacentHTML('afterBegin','<a href="#" class="eb-product-gallery__trigger" id="'+wrapperId+'-trigger">🔍</a>');
            const lightboxTrigger = document.getElementById(wrapperId+"-trigger");
            lightboxTrigger.addEventListener('click', function() {
                openLightbox(images);
            });
        }
    }   
} );

const initImageGallery = (target, zoomTargets) => {
    var galleryWidth = target.clientWidth;

    zoomTargets.forEach((zoomTarget,index) => {
    
        const image = zoomTarget.querySelector( 'img' );

			if ( image.getAttribute( 'data-large_image_width' ) > galleryWidth ) {
				(function ($) {
                    $(zoomTarget).zoom();
                })(jQuery);
			}
    });
}

const getImages = (galleryImages) => {
    const images = [];
    galleryImages.forEach(function(element) {
        var image = element.querySelector('img');
        if (image) {
            images.push(image.src);
        }
    });
    return images;
}

const openLightbox = (selectedImages) => {
    var lightbox = new FsLightbox();
    lightbox.props.sources = selectedImages;
    lightbox.open();
}