/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { memo } from "@wordpress/element";
import {
    AlignmentToolbar,
    BlockControls,
} from "@wordpress/block-editor";

/**
 * Internal dependencies
 */

import Inspector from "./inspector";
import Style from "./style";
import defaultAttributes from './attributes';

import {
    EBDisplayIcon,
    DynamicInputValueHandler,
    BlockProps,
    withBlockContext
} from "@essential-blocks/controls";

function Edit(props) {
    const { isSelected, attributes, setAttributes } = props;
    const {
        blockId,
        contentAlign,
        showIcon,
        icon,
        title,
        titleTag,
        showSubtitle,
        subtitle,
        sortableLists,
        description,
        showButton,
        buttonText,
        buttonSize,
        btnHoverEffect,
        classHook,
    } = attributes;

    const enhancedProps = {
        ...props,
        blockPrefix: 'eb-call-to-action',
        style: <Style {...props} />
    };

    return (
        <>
            {isSelected && <Inspector {...props} />}
            <BlockControls>
                <AlignmentToolbar
                    value={contentAlign}
                    onChange={(contentAlign) => setAttributes({ contentAlign })}
                />
            </BlockControls>
            <BlockProps.Edit {...enhancedProps}>
                <Style {...props} />
                <div className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`}>
                    <div className={`eb-cia-wrapper ${blockId}`}>
                        <div className="eb-cia-text-wrapper">
                            {sortableLists.map(({ label, value }, index) => {
                                if (value === "title") {
                                    return (
                                        <DynamicInputValueHandler
                                            key={index}
                                            value={title}
                                            tagName={titleTag}
                                            className="eb-cia-title"
                                            placeholder={__("Add title...", "essential-blocks")}
                                            onChange={(newTitle) => setAttributes({ title: newTitle })}
                                            readOnly={true}
                                        />
                                    );
                                } else if (value === "subtitle") {
                                    return (
                                        showSubtitle && (
                                            <DynamicInputValueHandler
                                                key={index}
                                                tagName="h4"
                                                className="eb-cia-subtitle"
                                                placeholder={__("Add subtitle...")}
                                                value={subtitle}
                                                onChange={(newSubtitle) =>
                                                    setAttributes({ subtitle: newSubtitle })
                                                }
                                                readOnly={true}
                                            />
                                        )
                                    );
                                } else if (value === "icon") {
                                    return (
                                        showIcon && (
                                            <EBDisplayIcon className="eb-cia-icon" icon={icon} />
                                        )
                                    );
                                } else if (value === "description") {
                                    return (
                                        <DynamicInputValueHandler
                                            key={index}
                                            tagName="p"
                                            value={description}
                                            placeholder={__("Add Description...", "essential-blocks")}
                                            className="eb-cia-description"
                                            onChange={(newText) => setAttributes({ description: newText })}
                                            readOnly={true}
                                        />
                                    );
                                }
                            })}
                        </div>
                        {showButton && (
                            <div className="eb-cia-button-wrapper">
                                <DynamicInputValueHandler
                                    value={buttonText}
                                    className={`eb-cia-button is-${buttonSize}${btnHoverEffect ? ` ${btnHoverEffect}` : ""
                                        }`}
                                    placeholder={__("Add Text", "essential-blocks")}
                                    onChange={(newText) => setAttributes({ buttonText: newText })}
                                    readOnly={true}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </BlockProps.Edit>
        </>
    );
}
export default memo(withBlockContext(defaultAttributes)(Edit))
