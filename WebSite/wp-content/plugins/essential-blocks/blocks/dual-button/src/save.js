const { EBDisplayIcon, sanitizeURL, BlockProps } = window.EBControls;

import { RichText } from "@wordpress/block-editor";
const Save = ({ attributes }) => {
    const {
        blockId,
        preset,
        buttonTextOne,
        buttonTextTwo,
        buttonURLOne,
        buttonURLTwo,
        innerButtonText,
        innerButtonIcon,
        showConnector,
        connectorType,
        classHook,
        buttonOneNewWindow,
        buttonTwoNewWindow,
    } = attributes;

    return (
        <BlockProps.Save
            attributes={attributes}
        >
            <div
                className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`}
            >
                <div
                    className={`eb-button-group-wrapper ${blockId} ${preset}`}
                    data-id={blockId}
                >
                    <a
                        className={"eb-button-parent eb-button-one"}
                        href={buttonURLOne === '#' ? '' : sanitizeURL(buttonURLOne)}
                        {...(buttonOneNewWindow && { target: "_blank" })}
                        rel="noopener"
                    >
                        <RichText.Content
                            tagName="div"
                            className="eb-button-text eb-button-one-text"
                            value={buttonTextOne}
                        />
                    </a>

                    {showConnector && (
                        <div className="eb-button-group__midldeInner">
                            {connectorType === "icon" && (
                                <span>
                                    <EBDisplayIcon icon={innerButtonIcon} />
                                </span>
                            )}

                            {connectorType === "text" && (
                                <span>{innerButtonText}</span>
                            )}
                        </div>
                    )}

                    <a
                        className={"eb-button-parent eb-button-two"}
                        href={buttonURLTwo === '#' ? '' : sanitizeURL(buttonURLTwo)}
                        {...(buttonTwoNewWindow && { target: "_blank" })}
                        rel="noopener"
                    >
                        <RichText.Content
                            tagName="div"
                            className="eb-button-text eb-button-two-text"
                            value={buttonTextTwo}
                        />
                    </a>
                </div>
            </div>
        </BlockProps.Save>
    );
};

export default Save;
