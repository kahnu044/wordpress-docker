/**
 * Internal dependencies
 */
import { RichText } from "@wordpress/block-editor";
import {
EBDisplayIcon, sanitizeURL, BlockProps, EBButton
} from "@essential-blocks/controls";

const save = ({ attributes }) => {
    const {
        blockId,
        buttonText,
        iconPosition,
        addIcon,
        icon,
        buttonURL,
        newWindow,
        addNofollow,
        hoverEffect,
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
                    className={`eb-button-wrapper eb-button-alignment ${blockId}`}
                >
                    <div className="eb-button">
                        <EBButton.Content 
                            attributes={attributes}
                        />
                    </div>
                </div>
            </div>
        </BlockProps.Save>
    );
};

export default save;
