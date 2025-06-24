/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { memo } from "@wordpress/element";

/**
 * Internal depencencies
 */

import Inspector from "./inspector";
import Style from "./style";
import defaultAttributes from './attributes';
import {
    PRODUCT_TABS
} from "./constants/constants";

/**
 * External depencencies
 */
import {
    BlockProps,
    withBlockContext,
} from "@essential-blocks/controls";

function Edit(props) {
    const {
        attributes,
        setAttributes,
        isSelected,
    } = props;
    const {
        blockId,
        classHook,
    } = attributes;


    // you must declare this variable
    const enhancedProps = {
        ...props,
        blockPrefix: 'eb-product-details',
        style: <Style {...props} />
    };

    return (
        <>
            {isSelected && (
                <Inspector
                    attributes={attributes}
                    setAttributes={setAttributes}
                />
            )}

            <BlockProps.Edit {...enhancedProps}>
                <div className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`} >
                    <div className={`eb-product-details-wrapper ${blockId}`} data-id={blockId}>
                        <div className='woocommerce-tabs wc-tabs-wrapper'>
                            <ul className="wc-tabs tabs eb-wc-tabs-editor" role="tablist">
                                {PRODUCT_TABS.map(({ id, title, active }) => (
                                    <li
                                        className={`${id}_tab ${active ? 'active' : ''}`}
                                        id={`tab-title-${id}`}
                                        role="tab"
                                        aria-controls={`tab-${id}`}
                                    >
                                        <a href={`#tab-${id}`}>{title}</a>
                                    </li>
                                )
                                )}
                            </ul>

                            {PRODUCT_TABS.map(({ id, content, active }) => (
                                <div
                                    className={`${id}_tab panel`}
                                    id={`tab-title-${id}`}
                                    role="tab"
                                    aria-controls={`tab-${id}`}
                                    style={{ display: active ? 'block' : 'none' }}
                                >
                                    {content}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </BlockProps.Edit >
        </>
    );
}
export default memo(withBlockContext(defaultAttributes)(Edit))
