/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { SelectControl } from "@wordpress/components";

/**
 * Internal depencencies
 */
import {
    WRAPPER_MARGIN,
    WRAPPER_PADDING,
    WRAPPER_BORDER_SHADOW,
    WRAPPER_BG,
    SHAPE_DIVIDER,
    POSITION,
} from "./constants";

import {
    InspectorPanel,
    ShapeDividerControl,
 } from "@essential-blocks/controls";

function Inspector(props) {
    const { attributes, setAttributes } = props;
    const { resOption, shapeDividerPosition } = attributes;

    return (
        <>
            <InspectorPanel 
                advancedControlProps={{
                    marginPrefix: WRAPPER_MARGIN,
                    paddingPrefix: WRAPPER_PADDING,
                    borderPrefix: WRAPPER_BORDER_SHADOW,
                    backgroundPrefix: WRAPPER_BG,
                }}
            hideTabs={['styles']}>
                <InspectorPanel.General>
                    <InspectorPanel.PanelBody
                        title={__(
                            "Options",
                            "essential-blocks"
                        )}
                        initialOpen={true}
                    >
                        <SelectControl
                            label={__(
                                "Position",
                                "essential-blocks"
                            )}
                            value={shapeDividerPosition}
                            options={POSITION}
                            onChange={(selected) =>
                                setAttributes({
                                    shapeDividerPosition: selected,
                                })
                            }
                        />
                        <ShapeDividerControl
                            controlName={SHAPE_DIVIDER}
                            position={shapeDividerPosition}
                        />
                    </InspectorPanel.PanelBody>
                </InspectorPanel.General>
            </InspectorPanel>
        </>
        
    );
}
export default Inspector;
