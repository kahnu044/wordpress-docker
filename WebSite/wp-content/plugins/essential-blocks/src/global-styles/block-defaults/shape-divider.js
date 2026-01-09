/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { PanelBody, SelectControl } from "@wordpress/components";

/**
 * Internal dependencies
 */
import {
    WRAPPER_MARGIN,
    WRAPPER_PADDING,
    WRAPPER_BORDER_SHADOW,
    WRAPPER_BG,
    SHAPE_DIVIDER,
    POSITION,
} from "@essential-blocks/blocks/shape-divider/src/constants";

import objAttributes from "@essential-blocks/blocks/shape-divider/src/attributes";

import {
    ShapeDividerControl,
    ResponsiveDimensionsControl,
    BackgroundControl,
    BorderShadowControl,
    useBlockDefaults,
    withBlockContext
} from "@essential-blocks/controls";

function ShapeDivider(props) {
    const { blockDefaults, setBlockDefaults, name, deviceType, handleBlockDefault } = props;

    const { shapeDividerPosition } = blockDefaults;

    const isDefaultSet = useBlockDefaults(name, blockDefaults, setBlockDefaults, objAttributes)

    return (
        <>
            {isDefaultSet && (
                <div className="eb-panel-control">
                    <PanelBody
                        title={__("Shape Divider Settings", "essential-blocks")}
                        initialOpen={true}
                    >
                        <SelectControl
                            label={__("Position", "essential-blocks")}
                            value={shapeDividerPosition}
                            options={POSITION}
                            onChange={(selected) =>
                                handleBlockDefault({
                                    shapeDividerPosition: selected,
                                })
                            }
                        />
                        <ShapeDividerControl
                            controlName={SHAPE_DIVIDER}
                            position={shapeDividerPosition}
                        />
                    </PanelBody>
                    <PanelBody
                        title={__("Margin & Padding", "essential-blocks")}
                        initialOpen={false}
                    >
                        <ResponsiveDimensionsControl
                            controlName={WRAPPER_MARGIN}
                            baseLabel={__("Margin", "essential-blocks")}
                        />
                        <ResponsiveDimensionsControl
                            controlName={WRAPPER_PADDING}
                            baseLabel={__("Padding", "essential-blocks")}
                        />
                    </PanelBody>
                    <PanelBody
                        title={__("Background", "essential-blocks")}
                        initialOpen={false}
                    >
                        <BackgroundControl
                            controlName={WRAPPER_BG}
                            noOverlay={true}
                        />
                    </PanelBody>
                    <PanelBody
                        title={__("Border & Shadow", "essential-blocks")}
                        initialOpen={false}
                    >
                        <BorderShadowControl
                            controlName={WRAPPER_BORDER_SHADOW}
                        />
                    </PanelBody>
                </div>
            )}
        </>
    );
}

export default withBlockContext(objAttributes)(ShapeDivider);
