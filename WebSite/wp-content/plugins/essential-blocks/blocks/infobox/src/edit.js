/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
/**
 * Internal dependencies
 */
const {
    BlockProps
} = window.EBControls;

import InfoboxContainer from "./components/infobox-edit";
import Inspector from "./inspector";
import Style from "./style";

const Edit = (props) => {
    const {
        attributes,
        setAttributes,
        isSelected,
    } = props;

    // you must declare this variable
    const enhancedProps = {
        ...props,
        blockPrefix: 'eb-infobox',
        style: <Style {...props} />
    };

    return (
        <>
            {isSelected && (
                <Inspector
                    attributes={attributes}
                    setAttributes={setAttributes}
                />
            )}
            <BlockProps.Edit {...enhancedProps}>

                <InfoboxContainer
                    setAttributes={setAttributes}
                    attributes={attributes}
                />
            </BlockProps.Edit>
        </>
    );
};

export default Edit;

