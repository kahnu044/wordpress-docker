/**
 * Internal dependencies
 */
import { BlockProps, EBButton } from "@essential-blocks/controls";

const save = ({ attributes }) => {
    const {
        blockId,
        classHook,
    } = attributes;

    return (
        <BlockProps.Save attributes={attributes}>
            <div
                className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`}
            >
                <div
                    className={`eb-button-wrapper eb-button-alignment ${blockId}`}
                >
                    <div className="eb-button">
                        <EBButton.Content attributes={attributes} />
                    </div>
                </div>
            </div>
        </BlockProps.Save>
    );
};

export default save;
