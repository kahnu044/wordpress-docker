/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { memo } from "@wordpress/element";
/**
 * Internal dependencies
 */
import {
    BlockProps,
    withBlockContext
} from "@essential-blocks/controls";

import InfoboxContainer from "./components/infobox-edit";
import Inspector from "./inspector";
import Style from "./style";
import defaultAttributes from './attributes';

function Edit(props) {
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
}
export default memo(withBlockContext(defaultAttributes)(Edit))

