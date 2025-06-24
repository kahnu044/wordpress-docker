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

/**
 * External depencencies
 */
import {
    DynamicInputValueHandler,
    BlockProps,
    withBlockContext,
    EBDisplayIcon
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
        prefixType,
        prefixText,
        prefixIcon,
        pricePlacement,
        showPrefix,
        separatorType,
        separatorIcon,
        separatorText,
        showHomePage,
        homePageLabel
    } = attributes;

    // you must declare this variable
    const enhancedProps = {
        ...props,
        blockPrefix: 'eb-breadcrumb',
        style: <Style {...props} />
    };

    let separator;

    if (separatorType == 'icon') {
        separator = <EBDisplayIcon icon={separatorIcon} className={`eb-taxonomy-prefix-icon`} />;
    } else {
        separator = <DynamicInputValueHandler
            value={separatorText}
            tagName='span'
            className="eb-taxonomy-prefix-text"
            readOnly={true}
        />
    }

    return (
        <>
            {isSelected && (
                <Inspector
                    attributes={attributes}
                    setAttributes={setAttributes}
                />
            )}

            <BlockProps.Edit {...enhancedProps}>
                <div className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`}>
                    <div aria-label="Breadcrumb" className={`eb-breadcrumb-wrapper ${blockId} ${pricePlacement}`} data-id={blockId}>
                        {showPrefix === true && (
                            <div className="prefix-wrap">
                                {prefixType === 'text' && prefixText && (
                                    <DynamicInputValueHandler
                                        value={prefixText}
                                        tagName='span'
                                        className="eb-taxonomy-prefix-text"
                                        onChange={(prefixText) =>
                                            setAttributes({ prefixText })
                                        }
                                        readOnly={true}
                                    />
                                )}

                                {prefixType === 'icon' && prefixIcon && (
                                    <EBDisplayIcon icon={prefixIcon} className={`eb-taxonomy-prefix-icon`} />
                                )}
                            </div>
                        )}

                        <nav className="eb-breadcrumb">
                            {showHomePage && homePageLabel && (
                                <>
                                    <span className="eb-breadcrumb-item">{homePageLabel}</span>
                                    <span className="eb-breadcrumb-separator">{separator}</span>
                                </>
                            )}
                            <span className="eb-breadcrumb-item">{__('Dummy Parent', 'essential-blocks')}</span>
                            <span className="eb-breadcrumb-separator">{separator}</span>
                            <span className="eb-breadcrumb-item current">{__('Dummy Title', 'essential-blocks')}</span>
                        </nav>
                    </div>
                </div>
            </BlockProps.Edit >
        </>
    );
}
export default memo(withBlockContext(defaultAttributes)(Edit))
