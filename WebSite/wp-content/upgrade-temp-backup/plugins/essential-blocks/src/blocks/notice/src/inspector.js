/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
    ToggleControl,
    SelectControl,
} from "@wordpress/components";
/**
 * Internal dependencies
 */
import { NOTICE_TYPES, NOTICE_ALIGNMENT, TEXT_ALIGN } from "./constants";

import {
    TypographyDropdown,
    ColorControl,
    ResponsiveAlignControl,
    InspectorPanel,
} from "@essential-blocks/controls";

import {
    dimensionsMargin,
    dimensionsPadding,
} from "./constants/dimensionsNames";
import {
    typoPrefix_text,
    typoPrefix_title,
} from "./constants/typographyPrefixConstants";
import { wrapBg } from "./constants/backgroundsConstants";
import { wrpBdShadow } from "./constants/borderShadowConstants";

function Inspector(props) {
    const { attributes, setAttributes } = props;
    const {
        resOption,
        dismissible,
        noticeType,
        titleColor,
        textColor,
        showAfterDismiss,
    } = attributes;

    const onTypeChange = (type) => {
        switch (type) {
            case "success":
                setAttributes({
                    noticeType: type,
                    [`${wrapBg}backgroundColor`]: "#4caf50",
                    titleColor: "#ffffff",
                    textColor: "#ffffff",
                });
                break;

            case "info":
                setAttributes({
                    noticeType: type,
                    [`${wrapBg}backgroundColor`]: "#d3d3d3",
                    titleColor: "#000000",
                    textColor: "#000000",
                });
                break;

            case "danger":
                setAttributes({
                    noticeType: type,
                    [`${wrapBg}backgroundColor`]: "#f44336",
                    titleColor: "#ffffff",
                    textColor: "#ffffff",
                });
                break;

            case "warning":
                setAttributes({
                    noticeType: type,
                    [`${wrapBg}backgroundColor`]: "#ffeb3b",
                    titleColor: "#000000",
                    textColor: "#000000",
                });
                break;

            case "default":
                setAttributes({
                    noticeType: type,
                    [`${wrapBg}backgroundColor`]: "#2196f3",
                    titleColor: "#ffffff",
                    textColor: "#ffffff",
                });
                break;
        }
    };

    return (
        <>
            <InspectorPanel advancedControlProps={{
                marginPrefix: dimensionsMargin,
                paddingPrefix: dimensionsPadding,
                backgroundPrefix: wrapBg,
                borderPrefix: wrpBdShadow,
            }}>
                <InspectorPanel.General>
                    <InspectorPanel.PanelBody
                        title={__(
                            "Notice Settings",
                            "essential-blocks"
                        )}
                        initialOpen={true}
                    >
                        <ToggleControl
                            label={__(
                                "Dismissible",
                                "essential-blocks"
                            )}
                            checked={dismissible}
                            onChange={() =>
                                setAttributes({
                                    dismissible: !dismissible,
                                })
                            }
                        />

                        <ToggleControl
                            label={__(
                                "Show After Dismiss",
                                "essential-blocks"
                            )}
                            checked={showAfterDismiss}
                            onChange={() =>
                                setAttributes({
                                    showAfterDismiss: !showAfterDismiss,
                                })
                            }
                        />

                        <SelectControl
                            label={__(
                                "Type",
                                "essential-blocks"
                            )}
                            value={noticeType}
                            options={NOTICE_TYPES}
                            onChange={(type) =>
                                onTypeChange(type)
                            }
                        />
                    </InspectorPanel.PanelBody>
                </InspectorPanel.General>
                <InspectorPanel.Style>
                    <InspectorPanel.PanelBody
                        title={__("Notice", "essential-blocks")}
                    >
                        <ResponsiveAlignControl
                            baseLabel={__(
                                "Text Align",
                                "essential-blocks"
                            )}
                            controlName={NOTICE_ALIGNMENT}
                            options={TEXT_ALIGN}
                            resOption={resOption}
                        />
                    </InspectorPanel.PanelBody>
                    <InspectorPanel.PanelBody
                        title={__("Title", "essential-blocks")}
                    >
                        <TypographyDropdown
                            baseLabel="Typography"
                            typographyPrefixConstant={
                                typoPrefix_title
                            }
                        />

                        <ColorControl
                            label={__(
                                "Color",
                                "essential-blocks"
                            )}
                            color={titleColor}
                            attributeName={'titleColor'}
                        />
                    </InspectorPanel.PanelBody>
                    <InspectorPanel.PanelBody
                        title={__("text", "essential-blocks")}
                    >
                        <TypographyDropdown
                            baseLabel="Typography"
                            typographyPrefixConstant={
                                typoPrefix_text
                            }
                        />

                        <ColorControl
                            label={__(
                                "Color",
                                "essential-blocks"
                            )}
                            color={textColor}
                            attributeName={'textColor'}
                        />
                    </InspectorPanel.PanelBody>
                </InspectorPanel.Style>
            </InspectorPanel>
        </>
    );
}

export default Inspector;
