/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { Dashicon } from "@wordpress/components";
import { memo } from "@wordpress/element";
import {
    URLInput,
    BlockControls,
    BlockAlignmentToolbar,
} from "@wordpress/block-editor";

/**
 * Internal dependencies
 */

import Inspector from "./inspector";

import {
    DynamicInputValueHandler,
    EBDisplayIcon,
    BlockProps,
    withBlockContext
} from "@essential-blocks/controls";
import Style from "./style";
import defaultAttributes from './attributes';

function Edit(props) {
    const { attributes, setAttributes, isSelected, clientId, className, name } = props;
    const {
        blockMeta,
        blockId,
        resOption,
        addIcon,
        icon,
        iconPosition,
        buttonText,
        buttonURL,
        buttonAlign,
        hoverEffect,
        classHook,
        type,
    } = attributes;

    // you must declare this variable
    const enhancedProps = {
        ...props,
        blockPrefix: 'eb-button',
        style: <Style {...props} />
    };

    const setButtonAlign = (newAlign) => {
        switch (newAlign) {
            case "left":
                setAttributes({ buttonAlign: "flex-start" });
                break;

            case "center":
                setAttributes({ buttonAlign: "center" });
                break;

            case "right":
                setAttributes({ buttonAlign: "flex-end" });
                break;
        }
    };

    return (
        <>
            {isSelected && <Inspector {...props} />}
            <BlockControls>
                <BlockAlignmentToolbar
                    value={buttonAlign}
                    onChange={(newAlign) => setButtonAlign(newAlign)}
                    controls={["left", "center", "right"]}
                />
            </BlockControls>
            <BlockProps.Edit {...enhancedProps}>
                <div className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`}>

                    <div className={`eb-button-wrapper eb-button-alignment ${blockId}`}>
                        <div className={`eb-button eb-button-${type}`}>
                            <a
                                className={`eb-button-anchor${hoverEffect ? ` ${hoverEffect}` : ""
                                    }`}
                            >
                                {addIcon && iconPosition === "left" ? (
                                    <EBDisplayIcon
                                        icon={icon}
                                        className={`eb-button-icon eb-button-icon-left hvr-icon`}
                                    />
                                ) : (
                                    ""
                                )}
                                <DynamicInputValueHandler
                                    placeholder={__("Add Text..", "essential-blocks")}
                                    className="eb-button-text"
                                    value={buttonText}
                                    onChange={(newText) => setAttributes({ buttonText: newText })}
                                    allowedFormats={[
                                        "core/bold",
                                        "core/italic",
                                        "core/strikethrough",
                                    ]}
                                />
                                {addIcon && iconPosition === "right" ? (
                                    <EBDisplayIcon
                                        icon={icon}
                                        className={`eb-button-icon eb-button-icon-left hvr-icon`}
                                    />
                                ) : (
                                    ""
                                )}
                            </a>
                        </div>
                        {isSelected && (
                            <div className="eb-button-link">
                                <Dashicon icon="admin-links" />
                                <URLInput
                                    value={buttonURL}
                                    onChange={(newURL) => setAttributes({ buttonURL: newURL })}
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
