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
    EBDisplayIcon,
    BlockProps,
    withBlockContext,
    EBButton
} from "@essential-blocks/controls";

import { 
    BUTTON_ONE_KEYS,
    BUTTON_TWO_KEYS
} from "./constants/constants";

function Edit(props) {
    const { attributes, isSelected } = props;
    const {
        blockId,
        preset,
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
                        <EBButton 
                            isSelected={isSelected}
                            className={'eb-button-one'}
                            buttonAttrProps={BUTTON_ONE_KEYS}
                            urlInput={false}
                        />

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
                        <EBButton 
                            isSelected={isSelected}
                            className={'eb-button-two'}
                            buttonAttrProps={BUTTON_TWO_KEYS}
                            urlInput={false}
                        />
                    </div>
                </div>
            </BlockProps.Edit>
        </>
    );
}
export default memo(withBlockContext(defaultAttributes)(Edit))
