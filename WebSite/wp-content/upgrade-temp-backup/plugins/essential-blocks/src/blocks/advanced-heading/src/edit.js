/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useEffect, memo, useState } from "@wordpress/element";
import {
    BlockControls,
    AlignmentToolbar
} from "@wordpress/block-editor";
import { useSelect } from '@wordpress/data'
import { useEntityProp } from '@wordpress/core-data';

/**
 * Internal depencencies
 */
import Inspector from "./inspector";

/**
 * External depencencies
 */
import {
    DynamicInputValueHandler,
    EBDisplayIcon,
    BlockProps,
    withBlockContext
} from '@essential-blocks/controls';

import Style from "./style";
import defaultAttributes from './attributes';

function Edit(props) {
    const {
        attributes,
        setAttributes,
        isSelected,
        context
    } = props;
    const {
        blockId,
        preset,
        effects,
        align,
        tagName,
        titleText,
        title2Text,
        title3Text,
        subtitleTagName,
        subtitleText,
        displaySubtitle,
        displaySeperator,
        seperatorPosition,
        seperatorType,
        separatorIcon,
        classHook,
        source,
        currentPostId,
        currentPostType,
        version
    } = attributes;

    // you must declare this variable
    const enhancedProps = {
        ...props,
        blockPrefix: 'eb-advance-heading',
        style: <Style {...props} />
    };

    useEffect(() => {
        if (source == undefined) {
            setAttributes({ source: 'custom' })
        }
        setAttributes({ version: '2' })
    }, [])

    useEffect(() => {
        if (context.postId && !currentPostId && !currentPostType) {
            setAttributes({
                currentPostId: context.postId,
                currentPostType: context.postType,
            });
        }
    }, [source]);

    const [rawTitle = '', setTitle, fullTitle] = useEntityProp('postType', currentPostType, 'title', currentPostId);

    const editorType = eb_conditional_localize?.editor_type || false
    let TagName = tagName;

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
                <div className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`}>
                    {source === 'dynamic-title' && currentPostId === 0 && (
                        <>
                            {editorType === 'edit-site' && (
                                <TagName className="eb-ah-title">Dynamic Title</TagName>
                            )}
                            {editorType !== 'edit-site' && (
                                <div className="eb-loading" >
                                    <img src={`${EssentialBlocksLocalize?.image_url}/ajax-loader.gif`} alt="Loading..." />
                                </div >
                            )}
                        </>
                    )}

                    {((source === 'dynamic-title' && currentPostId !== 0) || source === 'custom') && (
                        <>
                            <div
                                className={`eb-advance-heading-wrapper ${blockId} ${preset} ${effects}`}
                                data-id={blockId}
                            >
                                {displaySeperator && seperatorPosition === "top" && (
                                    <div className={"eb-ah-separator " + seperatorType}>
                                        {seperatorType === "icon" && (
                                            <EBDisplayIcon icon={separatorIcon} />
                                        )}
                                    </div>
                                )}

                                {source === 'dynamic-title' && (
                                    <>
                                        {currentPostId > 0 && (
                                            <DynamicInputValueHandler
                                                value={rawTitle}
                                                tagName={tagName}
                                                className="eb-ah-title"
                                                allowedFormats={[
                                                    "core/bold",
                                                    "core/italic",
                                                    "core/link",
                                                    "core/strikethrough",
                                                    "core/underline",
                                                    "core/text-color",
                                                ]}
                                                onChange={setTitle}
                                                readOnly={true}
                                            />
                                        )}

                                        {/* for FSE */}
                                        {typeof currentPostId == 'string' && (
                                            <TagName>
                                                {rawTitle ? rawTitle : __('Title')}
                                            </TagName>
                                        )}
                                    </>

                                )}

                                {source === 'custom' && (
                                    <TagName
                                        className={`eb-ah-title`}
                                    >
                                        <DynamicInputValueHandler
                                            value={titleText}
                                            tagName={'span'}
                                            className="first-title"
                                            allowedFormats={[
                                                "core/bold",
                                                "core/italic",
                                                "core/link",
                                                "core/strikethrough",
                                                "core/underline",
                                                "core/text-color",
                                            ]}
                                            onChange={(titleText) =>
                                                setAttributes({ titleText })
                                            }
                                            readOnly={true}
                                        />
                                        {title2Text && (
                                            <>
                                                &nbsp;<DynamicInputValueHandler
                                                    value={title2Text}
                                                    tagName={'span'}
                                                    className="second-title"
                                                    allowedFormats={[
                                                        "core/bold",
                                                        "core/italic",
                                                        "core/link",
                                                        "core/strikethrough",
                                                        "core/underline",
                                                        "core/text-color",
                                                    ]}
                                                    onChange={(title2Text) =>
                                                        setAttributes({ title2Text })
                                                    }
                                                    readOnly={true}
                                                />
                                            </>
                                        )}
                                        {title2Text && (
                                            <>
                                                &nbsp;
                                                <DynamicInputValueHandler
                                                    value={title3Text}
                                                    tagName={'span'}
                                                    className="third-title"
                                                    allowedFormats={[
                                                        "core/bold",
                                                        "core/italic",
                                                        "core/link",
                                                        "core/strikethrough",
                                                        "core/underline",
                                                        "core/text-color",
                                                    ]}
                                                    onChange={(title3Text) =>
                                                        setAttributes({ title3Text })
                                                    }
                                                    readOnly={true}
                                                />
                                            </>
                                        )}
                                    </TagName>
                                )}

                                {source === 'custom' && displaySubtitle && (
                                    <DynamicInputValueHandler
                                        tagName={subtitleTagName}
                                        className="eb-ah-subtitle"
                                        value={subtitleText}
                                        allowedFormats={[
                                            "core/bold",
                                            "core/italic",
                                            "core/link",
                                            "core/strikethrough",
                                            "core/underline",
                                            "core/text-color",
                                        ]}
                                        onChange={(subtitleText) =>
                                            setAttributes({ subtitleText })
                                        }
                                        readOnly={true}
                                    />
                                )}
                                {displaySeperator && seperatorPosition === "bottom" && (
                                    <div className={"eb-ah-separator " + seperatorType}>
                                        {seperatorType === "icon" && (
                                            // <i
                                            //     className={`${separatorIcon
                                            //         ? separatorIcon
                                            //         : "fas fa-arrow-circle-down"
                                            //         }`}
                                            // ></i>
                                            <EBDisplayIcon icon={separatorIcon} />
                                        )}
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </BlockProps.Edit>
        </>
    );
}
export default memo(withBlockContext(defaultAttributes)(Edit))
