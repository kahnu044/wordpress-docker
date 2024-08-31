/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { PanelBody, ToggleControl } from "@wordpress/components";
/**
 * Internal dependencies
 */
import {
    WRAPPER_WIDTH,
    WRAPPER_BACKGROUND,
    WRAPPER_BORDER,
    WRAPPER_MARGIN,
    WRAPPER_PADDING,
} from "@essential-blocks/blocks/wrapper/src/constants";
import objAttributes from "@essential-blocks/blocks/wrapper/src/attributes";

import {
    ResponsiveRangeController,
    BackgroundControl,
    BorderShadowControl,
    ResponsiveDimensionsControl,
    useBlockDefaults,
    withBlockContext
} from "@essential-blocks/controls";

function Wrapper(props) {
    const { blockDefaults, setBlockDefaults, name, deviceType, handleBlockDefault } = props;

    const { isWrapperWidth } = blockDefaults;
    const isDefaultSet = useBlockDefaults(name, blockDefaults, setBlockDefaults, objAttributes)

    return (
        <>
            {isDefaultSet && (
                <div className="eb-panel-control">
                    <PanelBody
                        title={__("General", "essential-blocks")}
                        initialOpen={true}
                    >
                        <ResponsiveRangeController
                            baseLabel={__("Content Width", "essential-blocks")}
                            controlName={WRAPPER_WIDTH}
                            min={0}
                            max={2560}
                            step={1}
                            noUnits
                        />
                        <ToggleControl
                            label={__(
                                "Use Width In Wrapper",
                                "essential-blocks"
                            )}
                            checked={isWrapperWidth}
                            onChange={() => {
                                handleBlockDefault({
                                    isWrapperWidth: !isWrapperWidth,
                                });
                            }}
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
                            controlName={WRAPPER_BACKGROUND}
                        />
                    </PanelBody>
                    <PanelBody
                        title={__("Border & Shadow", "essential-blocks")}
                        initialOpen={false}
                    >
                        <BorderShadowControl
                            controlName={WRAPPER_BORDER}
                        />
                    </PanelBody>
                </div>
            )}
        </>
    );
}

export default withBlockContext(objAttributes)(Wrapper);
