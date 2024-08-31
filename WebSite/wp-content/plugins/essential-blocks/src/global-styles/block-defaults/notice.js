/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { PanelBody, ToggleControl } from "@wordpress/components";

import {
    ResponsiveDimensionsControl,
    TypographyDropdown,
    BorderShadowControl,
    ColorControl,
    BackgroundControl,
    useBlockDefaults,
    withBlockContext
} from "@essential-blocks/controls";

import {
    typoPrefix_text,
    typoPrefix_title,
} from "@essential-blocks/blocks/notice/src/constants/typographyPrefixConstants";

import {
    dimensionsMargin,
    dimensionsPadding,
} from "@essential-blocks/blocks/notice/src/constants/dimensionsNames";

import { wrapBg } from "@essential-blocks/blocks/notice/src/constants/backgroundsConstants";
import { wrpBdShadow } from "@essential-blocks/blocks/notice/src/constants/borderShadowConstants";

import objAttributes from "@essential-blocks/blocks/notice/src/attributes";

function Notice(props) {
    const { blockDefaults, setBlockDefaults, name, deviceType, handleBlockDefault } = props;
    const {
        dismissible,
        titleColor,
        textColor,
        showAfterDismiss,
    } = blockDefaults;
    const isDefaultSet = useBlockDefaults(name, blockDefaults, setBlockDefaults, objAttributes)

    return (
        <>
            {isDefaultSet && (
                <div className="eb-panel-control">
                    <PanelBody
                        title={__("Notice Settings", "essential-blocks")}
                    >
                        <ToggleControl
                            label={__("Dismissible", "essential-blocks")}
                            checked={dismissible}
                            onChange={() =>
                                handleBlockDefault({
                                    dismissible: !dismissible,
                                })
                            }
                        />

                        <ToggleControl
                            label={__("Show After Dismiss", "essential-blocks")}
                            checked={showAfterDismiss}
                            onChange={() =>
                                handleBlockDefault({
                                    showAfterDismiss: !showAfterDismiss,
                                })
                            }
                        />
                    </PanelBody>
                    {/* Style */}
                    <PanelBody
                        title={__("Title Style", "essential-blocks")}
                        initialOpen={false}
                    >
                        <TypographyDropdown
                            baseLabel="Typography"
                            typographyPrefixConstant={typoPrefix_title}
                        />

                        <ColorControl
                            label={__("Color", "essential-blocks")}
                            color={titleColor}
                            onChange={(titleColor) =>
                                handleBlockDefault({ titleColor })
                            }
                        />
                    </PanelBody>
                    <PanelBody
                        title={__("Text Style", "essential-blocks")}
                        initialOpen={false}
                    >
                        <TypographyDropdown
                            baseLabel="Typography"
                            typographyPrefixConstant={typoPrefix_text}
                        />

                        <ColorControl
                            label={__("Color", "essential-blocks")}
                            color={textColor}
                            onChange={(textColor) =>
                                handleBlockDefault({ textColor })
                            }
                        />
                    </PanelBody>
                    {/* Advance */}
                    <PanelBody
                        title={__(
                            "Wrapper Margin & Padding",
                            "essential-blocks"
                        )}
                        initialOpen={false}
                    >
                        <ResponsiveDimensionsControl
                            controlName={dimensionsMargin}
                            baseLabel="Margin"
                        />
                        <ResponsiveDimensionsControl
                            controlName={dimensionsPadding}
                            baseLabel="Padding"
                        />
                    </PanelBody>
                    <PanelBody
                        title={__("Wrapper Background ", "essential-blocks")}
                        initialOpen={false}
                    >
                        <BackgroundControl
                            controlName={wrapBg}
                        />
                    </PanelBody>
                    <PanelBody
                        title={__("Wrapper Border & Shadow")}
                        initialOpen={false}
                    >
                        <BorderShadowControl
                            controlName={wrpBdShadow}
                        />
                    </PanelBody>
                </div>
            )}
        </>
    );
}

export default withBlockContext(objAttributes)(Notice);
