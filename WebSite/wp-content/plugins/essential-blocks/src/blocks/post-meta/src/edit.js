/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useEffect, memo } from "@wordpress/element";
import { select, withSelect } from "@wordpress/data";
import { compose } from "@wordpress/compose";

/**
 * Internal depencencies
 */
import Inspector from "./inspector";
import Style from "./style";
import defaultAttributes from './attributes'
import { 
    BlockProps,
    withBlockContext
} from "@essential-blocks/controls";

function Edit(props) {
    const { attributes, setAttributes, isSelected, selectPostType } = props;
    const {
        blockId,
        type,
        enableContents,
        authorLabel,
        dateLabel,
        productSkuLabel,
        metaDisplay,
        classHook,
    } = attributes;

    const postType = select("core/editor").getCurrentPostType();
    const isContentEnabled = (contentName) => enableContents.includes(contentName);

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

        if( type !== null && type !== 'product') {
            let list = [...enableContents];
            const index = list.indexOf('product_sku');
            if (index !== -1) {
                list.splice(index, 1);
            }
            setAttributes({enableContents: list})
        }

    },[])


    // you must declare this variable
    const enhancedProps = {
        ...props,
        blockPrefix: 'eb-post-meta',
        style: <Style {...props} isContentEnabled={isContentEnabled} />
    };

    const getCurrentDate = () => {

        const currentDate = new Date();

        
        const year = currentDate.getFullYear();
        const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
        const day = ('0' + currentDate.getDate()).slice(-2);

        
        return `${year}-${month}-${day}`;
    }


    return (
        <>
            {isSelected && <Inspector {...props} />}
            <BlockProps.Edit {...enhancedProps}>
                <div className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`}>
                    <div className={`eb-post-meta-wrapper ${blockId}`} data-id={blockId}>
                        <div className={`eb-post-metadata eb-post-meta-${metaDisplay}`}>
                            {isContentEnabled("author") && (
                                <div className="eb-post-metadata-item eb-post-metadata-author">
                                    <span className="eb-post-metadata-label">{authorLabel} </span>
                                    <span className="eb-post-metadata-value">Author</span>
                                </div>
                            )}
                            {isContentEnabled("date") && (
                                <div className="eb-post-metadata-item eb-post-metadata-date">
                                    <span className="eb-post-metadata-label">{dateLabel} </span>
                                    <span className="eb-post-metadata-value">{getCurrentDate()}</span>
                                </div>
                            )}
                            {isContentEnabled("product_sku") && type === 'product' && (
                                <div className="eb-post-metadata-item eb-post-metadata-product_sku">
                                    <span className="eb-post-metadata-label">{productSkuLabel} </span>
                                    <span className="eb-post-metadata-value">{__("Product SKU","essential-blocks")}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </BlockProps.Edit>
        </>
    );
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
