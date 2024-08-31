/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useState, useEffect, memo } from "@wordpress/element";
import {
    BlockControls,
    AlignmentToolbar
} from "@wordpress/block-editor";

/**
 * Internal depencencies
 */

import Inspector from "./inspector";

/**
 * External depencencies
 */
import {
    DynamicInputValueHandler,
    BlockProps,
    withBlockContext
} from "@essential-blocks/controls";

import Style from "./style";
import defaultAttributes from './attributes'

function Edit(props) {
    const {
        attributes,
        setAttributes,
        isSelected,
    } = props;
    const {
        blockId,
        align,
        tagName,
        text,
        classHook,
        source
    } = attributes;


    // you must declare this variable
    const enhancedProps = {
        ...props,
        blockPrefix: 'eb-text',
        style: <Style {...props} />
    };

    const TagName = tagName

    return (
        <>
            {isSelected && (
                <>
                    <BlockControls>
                        <AlignmentToolbar
                            value={align}
                            onChange={(align) => setAttributes({ align })}
                            controls={["left", "center", "right"]}
                        />
                    </BlockControls>
                    <Inspector
                        attributes={attributes}
                        setAttributes={setAttributes}
                    />
                </>
            )}

            <BlockProps.Edit {...enhancedProps}>
                <div
                    className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`}
                >
                    <div
                        className={`eb-text-wrapper ${blockId}`}
                        data-id={blockId}
                    >
                        {source === 'custom' && (
                            <DynamicInputValueHandler
                                value={text}
                                tagName={tagName}
                                className="eb-text"
                                isSelected={true}
                                allowedFormats={[
                                    "core/bold",
                                    "core/italic",
                                    "core/link",
                                    "core/strikethrough",
                                    "core/underline",
                                    "core/text-color",
                                ]}
                                onChange={(text) =>
                                    setAttributes({ text })
                                }
                                placeholder={__('Type your text here')}
                                readOnly={true}
                            />
                        )}
                        {source && source !== 'custom' && (
                            <TagName className="eb-text">Please note that placeholder data is currently displayed in the editor. The actual data from "<strong>{source}</strong>" will be displayed on the front end.</TagName>
                        )}
                    </div>
                </div>
            </BlockProps.Edit>
        </>
    );
}
export default memo(withBlockContext(defaultAttributes)(Edit))
