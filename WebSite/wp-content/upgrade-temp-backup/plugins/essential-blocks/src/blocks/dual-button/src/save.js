import {
    EBDisplayIcon,
    BlockProps,
    EBButton
} from "@essential-blocks/controls";
import {
    BUTTON_ONE_KEYS,
    BUTTON_TWO_KEYS
} from "./constants/constants"

const Save = ({ attributes }) => {
    const {
        blockId,
        preset,
        innerButtonText,
        innerButtonIcon,
        showConnector,
        connectorType,
        classHook,
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
                    <EBButton.Content 
                        attributes={attributes}
                        className="eb-button-one"
                        buttonAttrProps={BUTTON_ONE_KEYS}
                        attrPrefix="btn1"
                        tagName={"div"}
                    />

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

                    <EBButton.Content 
                        attributes={attributes}
                        className="eb-button-two"
                        buttonAttrProps={BUTTON_TWO_KEYS}
                        attrPrefix="btn2"
                        tagName="div"
                    />
                </div>
            </div>
        </BlockProps.Save>
    );
};

export default Save;
