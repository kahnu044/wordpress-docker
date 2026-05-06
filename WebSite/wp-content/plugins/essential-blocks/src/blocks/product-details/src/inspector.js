/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
    ToggleControl,
    __experimentalToggleGroupControl as ToggleGroupControl,
    __experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from "@wordpress/components";

/**
 * Internal depencencies
 */
import {
    WRAPPER_BG,
    WRAPPER_MARGIN,
    WRAPPER_PADDING,
    WRAPPER_BORDER_SHADOW,
    NORMAL_HOVER,
    tabTitlePadding,
    tabTitleMargin,
    tabTitleBdShadow,
    tabContentMargin,
    tabContentPadding,
    tabContentBdShadow
} from "./constants/constants";
import {
    typoTabTitle,
    typoTabContent
} from "./constants/typographyPrefixConstants";
import {
    ResponsiveDimensionsControl,
    TypographyDropdown,
    BorderShadowControl,
    ColorControl,
    InspectorPanel,
} from "@essential-blocks/controls";

import objAttributes from "./attributes";

function Inspector(props) {
    const { attributes, setAttributes } = props;
    const {
        resOption,
        showDescriptionTab,
        showAdditionalTab,
        showReviewsTab,
        tabTitleType,
        tabTitleColor,
        tabTitleBGColor,
        tabTitleHvColor,
        tabTitleHvBGColor,
        tabTitleActiveColor,
        tabTitleActiveBGColor,
        tabTitleActiveHvColor,
        tabTitleActiveHvBGColor,
        tabContentColor
    } = attributes;

    return (
        <InspectorPanel advancedControlProps={{
            marginPrefix: WRAPPER_MARGIN,
            paddingPrefix: WRAPPER_PADDING,
            backgroundPrefix: WRAPPER_BG,
            borderPrefix: WRAPPER_BORDER_SHADOW,
            hasMargin: true
        }}>
            <InspectorPanel.General>
                <InspectorPanel.PanelBody title={__("Settings", "essential-blocks")} initialOpen={true}>
                    <ToggleControl
                        label={__("Show Description Tab")}
                        checked={showDescriptionTab}
                        onChange={() => {
                            setAttributes({
                                showDescriptionTab: !showDescriptionTab,
                            });
                        }}
                        __nextHasNoMarginBottom
                    />
                    <ToggleControl
                        label={__("Show Additional Info Tab")}
                        checked={showAdditionalTab}
                        onChange={() => {
                            setAttributes({
                                showAdditionalTab: !showAdditionalTab,
                            });
                        }}
                        __nextHasNoMarginBottom
                    />
                    <ToggleControl
                        label={__("Show Reviews Tab")}
                        checked={showReviewsTab}
                        onChange={() => {
                            setAttributes({
                                showReviewsTab: !showReviewsTab,
                            });
                        }}
                        __nextHasNoMarginBottom
                    />
                </InspectorPanel.PanelBody>
            </InspectorPanel.General>
            <InspectorPanel.Style>
                <InspectorPanel.PanelBody
                    title={__(
                        "Tab Title",
                        "essential-blocks"
                    )}
                    initialOpen={true}
                >
                    <TypographyDropdown
                        baseLabel="Typography"
                        typographyPrefixConstant={
                            typoTabTitle
                        }
                    />
                    <ToggleGroupControl

                        value={tabTitleType}
                        onChange={(value) =>
                            setAttributes({
                                tabTitleType: value,
                            })
                        }
                        isBlock
__next40pxDefaultSize
__nextHasNoMarginBottom
                    >
                        {NORMAL_HOVER.map(
                            (
                                { label, value },
                                index
                            ) => (
                                <ToggleGroupControlOption
                                    key={index}
                                    value={value}
                                    label={label}
                                />
                            )
                        )}
                    </ToggleGroupControl>

                    {tabTitleType === "normal" && (
                        <>
                            <ColorControl
                                label={__(
                                    "Text",
                                    "essential-blocks"
                                )}
                                color={tabTitleColor}
                                attributeName={'tabTitleColor'}
                            />
                            <ColorControl
                                label={__(
                                    "Background",
                                    "essential-blocks"
                                )}
                                color={tabTitleBGColor}
                                attributeName={'tabTitleBGColor'}
                            />
                            <ColorControl
                                label={__(
                                    "Active Tab Text",
                                    "essential-blocks"
                                )}
                                color={tabTitleActiveColor}
                                attributeName={'tabTitleActiveColor'}
                            />
                            <ColorControl
                                label={__(
                                    "Active Tab Background",
                                    "essential-blocks"
                                )}
                                color={tabTitleActiveBGColor}
                                attributeName={'tabTitleActiveBGColor'}
                            />
                        </>
                    )}

                    {tabTitleType === "hover" && (
                        <>
                            <ColorControl
                                label={__(
                                    "Text",
                                    "essential-blocks"
                                )}
                                color={tabTitleHvColor}
                                attributeName={'tabTitleHvColor'}
                            />
                            <ColorControl
                                label={__(
                                    "Background",
                                    "essential-blocks"
                                )}
                                color={tabTitleHvBGColor}
                                attributeName={'tabTitleHvBGColor'}
                            />
                            <ColorControl
                                label={__(
                                    "Ative Tab Text",
                                    "essential-blocks"
                                )}
                                color={tabTitleActiveHvColor}
                                attributeName={'tabTitleActiveHvColor'}
                            />
                            <ColorControl
                                label={__(
                                    "Ative Tab Background",
                                    "essential-blocks"
                                )}
                                color={tabTitleActiveHvBGColor}
                                attributeName={'tabTitleActiveHvBGColor'}
                            />
                        </>
                    )}

                    <InspectorPanel.PanelBody
                        title={__("Border & Shadow")}
                        initialOpen={false}
                    >
                        <BorderShadowControl
                            controlName={
                                tabTitleBdShadow
                            }
                        // noShadow
                        // noBorder
                        />
                    </InspectorPanel.PanelBody>

                    <ResponsiveDimensionsControl
                        controlName={tabTitlePadding}
                        baseLabel="Padding"
                    />

                    <ResponsiveDimensionsControl
                        controlName={tabTitleMargin}
                        baseLabel="Margin"
                    />
                </InspectorPanel.PanelBody>

                <InspectorPanel.PanelBody
                    title={__("Content")}
                    initialOpen={false}
                >
                    <TypographyDropdown
                        baseLabel="Typography"
                        typographyPrefixConstant={
                            typoTabContent
                        }
                    />
                    <ColorControl
                        label={__(
                            "Color",
                            "essential-blocks"
                        )}
                        color={tabContentColor}
                        attributeName={'tabContentColor'}
                    />

                    <InspectorPanel.PanelBody
                        title={__(
                            "Margin Padding",
                            "essential-blocks"
                        )}
                    >
                        <ResponsiveDimensionsControl
                            controlName={
                                tabContentMargin
                            }
                            baseLabel="Margin"
                        />
                        <ResponsiveDimensionsControl
                            controlName={
                                tabContentPadding
                            }
                            baseLabel="Padding"
                        />
                    </InspectorPanel.PanelBody>

                    <InspectorPanel.PanelBody
                        title={__("Border & Shadow")}
                        initialOpen={false}
                    >
                        <BorderShadowControl
                            controlName={
                                tabContentBdShadow
                            }
                        />
                    </InspectorPanel.PanelBody>
                </InspectorPanel.PanelBody>
            </InspectorPanel.Style>
        </InspectorPanel>
    );
}

export default Inspector;
