/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useEffect, useState, useRef, memo } from "@wordpress/element";
import { select, withSelect } from "@wordpress/data";
import { compose } from "@wordpress/compose";
import Slider from "react-slick";

/**
 * Internal depencencies
 */
import Inspector from "./inspector";
import Style from "./style";
import defaultAttributes from './attributes'
import { 
    BlockProps,
    withBlockContext,
    NoticeComponent,
} from "@essential-blocks/controls";
import { ReactComponent as Icon } from "./icon.svg";

function Edit(props) {
    const { attributes, setAttributes, isSelected, selectPostType } = props;
    const {
        blockId,
        enableContents,
        classHook,
        galleryPosition,
        type,
        disableNavArrow
    } = attributes;

    const postType = select("core/editor").getCurrentPostType();
    const isContentEnabled = (contentName) => enableContents.includes(contentName);

    const [nav1, setNav1] = useState(null);
    const [nav2, setNav2] = useState(null);
    let sliderRef1 = useRef(null);
    let sliderRef2 = useRef(null);

    useEffect(() => {
        setNav1(sliderRef1);
        setNav2(sliderRef2);
    }, []);

    useEffect(()=> {

        if (postType === "templately_library") {
            let type = 'post';
            const templateType = select('core/editor').getEditedPostAttribute('templately_type');
            if (templateType) {
                if (['product_archive', 'product_single'].includes(templateType)) {
                    type = 'product'
                }
                if (['course_archive', 'course_single'].includes(templateType)) {
                    type = 'sfwd-courses'
                }
            }
            setAttributes({ type: type })
        } else if (postType === 'wp_template') {
            const slugArray = select('core/editor').getEditedPostAttribute('slug').split('-');
            let type = 'post';
            if (slugArray.length > 1) {
                type = slugArray[1];
            }
            if (slugArray.length === 1 && slugArray[0] === 'page') {
                type = 'page';
            }
            setAttributes({ type: type })
        } else {
            setAttributes({ type: selectPostType })
        }

    },[])

    // you must declare this variable
    const enhancedProps = {
        ...props,
        blockPrefix: 'eb-product-images',
        style: <Style {...props} isContentEnabled={isContentEnabled} />
    };

    return type !== 'product' ? <NoticeComponent
        Icon={Icon}
        title={__("Product Images","essential-blocks")}
        description={__("This block is supported in single product template","essential-blocks")}
    /> : <>
    {isSelected && <Inspector {...props} />}
    <BlockProps.Edit {...enhancedProps}>
        <div className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`}>
            <div className={`eb-product-images-wrapper ${blockId}`} data-id={blockId}>
                <div class={`eb-product-images`}>
                    <div class={`eb-product-image_slider eb-product-gallery-${galleryPosition} eb-product-image-editor`}>
                        <div class="eb-product-image_slider-body">
                            <Slider 
                                asNavFor={nav2} 
                                ref={slider => setNav1(slider)}
                                arrows={false}
                            >
                                <div className="eb-product-image_slider-body-item"><img src={`${EssentialBlocksLocalize?.image_url}/image-placeholder.jpg`} className="eb-product-gallery-image" /></div>
                                <div className="eb-product-image_slider-body-item"><img src={`${EssentialBlocksLocalize?.image_url}/image-placeholder.jpg`} className="eb-product-gallery-image" /></div>
                                <div className="eb-product-image_slider-body-item"><img src={`${EssentialBlocksLocalize?.image_url}/image-placeholder.jpg`} className="eb-product-gallery-image" /></div>
                                <div className="eb-product-image_slider-body-item"><img src={`${EssentialBlocksLocalize?.image_url}/image-placeholder.jpg`} className="eb-product-gallery-image" /></div>
                                <div className="eb-product-image_slider-body-item"><img src={`${EssentialBlocksLocalize?.image_url}/image-placeholder.jpg`} className="eb-product-gallery-image" /></div>
                            </Slider>
                        </div>
                            <Slider
                                asNavFor={nav1}
                                ref={slider => setNav2(slider)}
                                slidesToShow={3}
                                swipeToSlide={true}
                                focusOnSelect={true}
                                vertical={(galleryPosition == 'left' || galleryPosition == 'right') ? true : false}
                                arrows={disableNavArrow ? false : true}
                                className="eb-product-image_slider-footer"
                            >
                                <div class="eb-product-image_slider-footer-item"><img src={`${EssentialBlocksLocalize?.image_url}/image-placeholder.jpg`} /></div>
                                <div class="eb-product-image_slider-footer-item"><img src={`${EssentialBlocksLocalize?.image_url}/image-placeholder.jpg`} />
                                </div>
                                <div class="eb-product-image_slider-footer-item"><img src={`${EssentialBlocksLocalize?.image_url}/image-placeholder.jpg`} />
                                </div>
                                <div class="eb-product-image_slider-footer-item"><img src={`${EssentialBlocksLocalize?.image_url}/image-placeholder.jpg`} />
                                </div>
                                <div class="eb-product-image_slider-footer-item"><img src={`${EssentialBlocksLocalize?.image_url}/image-placeholder.jpg`} />
                                </div>
                                <div class="eb-product-image_slider-footer-item"><img src={`${EssentialBlocksLocalize?.image_url}/image-placeholder.jpg`} />
                                </div>
                            </Slider>
                    </div>
                </div>
            </div>
        </div>
    </BlockProps.Edit>
</>
}

export default memo(
    compose([
        withSelect((select, ownProps) => {
            const selectPostType = select("core/editor") ? select("core/editor").getCurrentPostType() : "";
            return {
                selectPostType: selectPostType,
            };
        }),
        withBlockContext(defaultAttributes)
    ])(Edit)
)
