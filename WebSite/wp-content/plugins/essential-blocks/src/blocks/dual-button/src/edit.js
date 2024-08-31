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
    DynamicInputValueHandler,
    EBDisplayIcon,
    BlockProps,
    withBlockContext
} from "@essential-blocks/controls";

function Edit(props) {
    const { attributes, setAttributes, isSelected } = props;
    const {
        blockId,
        preset,
        buttonTextOne,
        buttonTextTwo,
        innerButtonText,
        innerButtonIcon,
        showConnector,
        connectorType,
        classHook,
    } = attributes;

    // you must declare this variable
    const enhancedProps = {
        ...props,
        blockPrefix: 'eb-button-group',
        style: <Style {...props} />
    };

    return (
        <>
            {isSelected && <Inspector {...props} />}
            <BlockProps.Edit {...enhancedProps}>

                <div className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`}>
                    <div
                        className={`eb-button-group-wrapper ${blockId} ${preset}`}
                        data-id={blockId}
                    >
                        {/* Button One */}
                        <a
                            className={"eb-button-parent eb-button-one"}
                            // style={buttonStyleOne}
                            onMouseEnter={() => setAttributes({ isHoverOne: true })}
                            onMouseLeave={() => setAttributes({ isHoverOne: false })}
                        >
                            <DynamicInputValueHandler
                                className={"eb-button-text eb-button-one-text"}
                                placeholder="Add Text.."
                                value={buttonTextOne}
                                onChange={(newText) =>
                                    setAttributes({ buttonTextOne: newText })
                                }
                                allowedFormats={[
                                    "core/bold",
                                    "core/italic",
                                    "core/link",
                                    "core/strikethrough",
                                    "core/underline",
                                    "core/text-color",
                                ]}
                            />
                        </a>

                        {/* Connector */}

                        {showConnector && (
                            <div
                                className="eb-button-group__midldeInner"
                            >
                                {connectorType === "icon" && (
                                    <span>
                                        <EBDisplayIcon icon={innerButtonIcon} />
                                    </span>
                                )}
                                {connectorType === "text" && <span>{innerButtonText}</span>}
                            </div>
                        )}

                        {/* Button Two */}
                        <a
                            className={"eb-button-parent eb-button-two"}
                            // style={buttonStyleTwo}
                            onMouseEnter={() => setAttributes({ isHoverTwo: true })}
                            onMouseLeave={() => setAttributes({ isHoverTwo: false })}
                        >
                            <DynamicInputValueHandler
                                className={"eb-button-text eb-button-two-text"}
                                placeholder="Add Text.."
                                value={buttonTextTwo}
                                onChange={(newText) =>
                                    setAttributes({ buttonTextTwo: newText })
                                }
                                allowedFormats={[
                                    "core/bold",
                                    "core/italic",
                                    "core/link",
                                    "core/strikethrough",
                                    "core/underline",
                                    "core/text-color",
                                ]}
                            />
                        </a>
                    </div>
                </div>
            </BlockProps.Edit>
        </>
    );
}
export default memo(withBlockContext(defaultAttributes)(Edit))
