/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { memo } from "@wordpress/element";
import {
    BlockControls,
    BlockAlignmentToolbar,
} from "@wordpress/block-editor";

/**
 * Internal dependencies
 */

import Inspector from "./inspector";

import {
    BlockProps,
    withBlockContext,
    EBButton
} from "@essential-blocks/controls";
import Style from "./style";
import defaultAttributes from './attributes';

function Edit(props) {
    const { attributes, setAttributes, isSelected } = props;
    const {
        blockId,
        buttonAlign,
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
                    <div className={`eb-button-wrapper eb-button-editor ${blockId}`}>
                        <div className={`eb-button eb-button-${type}`}>
                            <EBButton 
                                isSelected={isSelected} 
                                urlInput={true}
                            />
                        </div>
                    </div>
                </div>
            </BlockProps.Edit>
        </>
    );
}
export default memo(withBlockContext(defaultAttributes)(Edit))
