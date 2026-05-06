/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useEffect, useState } from "@wordpress/element";
const { times } = lodash;
import {
    PanelBody,
    ToggleControl,
    RangeControl,
    __experimentalToggleGroupControl as ToggleGroupControl,
    __experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from "@wordpress/components";

/**
 * External dependencies
 */
// import FontIconPicker from "@fonticonpicker/react-fonticonpicker";

/**
 * Internal dependencies
 */
import {
    ACCORDION_TYPES,
    ICON_POSITIONS,
    TITLE_ALIGNMENT,
    CONTENT_ALIGN,
    HEADING,
} from "@essential-blocks/blocks/accordion/src/constants";

import {
    ColorControl,
    TypographyDropdown,
    ResponsiveDimensionsControl,
    ResponsiveRangeController,
    BorderShadowControl,
    BackgroundControl,
    useBlockDefaults,
    withBlockContext
} from "@essential-blocks/controls";

import objAttributes from "@essential-blocks/blocks/accordion/src/attributes";

import {
    typoPrefix_title,
    typoPrefix_content,
} from "@essential-blocks/blocks/accordion/src/constants/typographyPrefixConstants";

import {
    rangeIconSize,
    accGapRange,
} from "@essential-blocks/blocks/accordion/src/constants/rangeNames";

import {
    wrapMarginConst,
    wrapPaddingConst,
    iconMarginConst,
    iconPaddingConst,
    tabMarginConst,
    tabPaddingConst,
    conMarginConst,
    conPaddingConst,
} from "@essential-blocks/blocks/accordion/src/constants/dimensionsConstants";

import {
    WrpBgConst,
    iconBgConst,
    tabBgConst,
    conBgConst,
} from "@essential-blocks/blocks/accordion/src/constants/backgroundsConstants";

import {
    WrpBdShadowConst,
    iconBdShadowConst,
    tabBdShadowConst,
    conBdShadowConst,
} from "@essential-blocks/blocks/accordion/src/constants/borderShadowConstants";

function Accordion(props) {
    const { blockDefaults, setBlockDefaults, name, deviceType, handleBlockDefault } = props;

    const {
        resOption,
        accordionType,
        displayIcon,
        transitionDuration,
        tabIcon,
        expandedIcon,
        titleColor,
        contentAlign,
        contentColor,
        iconColor,
        iconPosition,
        titleAlignment,
        hoverTitleColor,
        activeBgColor,
        activeTitleColor,
        tagName,
        faqSchema,
    } = blockDefaults;

    const isDefaultSet = useBlockDefaults(name, blockDefaults, setBlockDefaults, objAttributes)

    return (
        <>
            {isDefaultSet && (
                <div className="eb-panel-control">
                    <PanelBody
                        title={__("General", "essential-blocks")}
                        initialOpen={true}
                    >
                        <ToggleGroupControl
                            label={__("Accordion Types", "essential-blocks")}

                            value={accordionType}
                            onChange={(value) =>
                                handleBlockDefault({
                                    accordionType: value,
                                })
                            }
                            isBlock
                            __next40pxDefaultSize
                            __nextHasNoMarginBottom
                        >
                            {ACCORDION_TYPES.map((item, key) => (
                                <ToggleGroupControlOption
                                    key={key}
                                    value={item.value}
                                    label={item.label}
                                />
                            ))}
                        </ToggleGroupControl>
                        <ToggleGroupControl
                            label={__("Title Level", "essential-blocks")}
                            className="eb-accordion-heading-alignment eb-html-tag-buttongroup newtogglegroupcontrol"
                            value={tagName}
                            onChange={(value) =>
                                handleBlockDefault({
                                    tagName: value,
                                })
                            }
                            isBlock
                            __next40pxDefaultSize
                            __nextHasNoMarginBottom
                        >
                            {HEADING.map((item, key) => (
                                <ToggleGroupControlOption
                                    key={key}
                                    value={item.value}
                                    label={item.label}
                                />
                            ))}
                        </ToggleGroupControl>
                        <RangeControl
                            label={__("Toggle Speed", "essential-blocks")}
                            value={transitionDuration}
                            onChange={(transitionDuration) =>
                                handleBlockDefault({ transitionDuration })
                            }
                            min={0}
                            max={5}
                            step={0.1}
                            allowReset={true}
                            __nextHasNoMarginBottom
                            __next40pxDefaultSize
                        />
                        <ResponsiveRangeController
                            noUnits
                            baseLabel={__("Accordions Gap", "essential-blocks")}
                            controlName={accGapRange}
                            min={1}
                            max={100}
                            step={1}
                        />
                    </PanelBody>
                    <PanelBody
                        title={__("Tab Style", "essential-blocks")}
                        initialOpen={false}
                    >
                        <ToggleGroupControl
                            label={__("Title Align ", "essential-blocks")}

                            value={titleAlignment}
                            onChange={(value) =>
                                handleBlockDefault({
                                    titleAlignment: value,
                                })
                            }
                            isBlock
                            __next40pxDefaultSize
                            __nextHasNoMarginBottom
                        >
                            {TITLE_ALIGNMENT.map((item, key) => (
                                <ToggleGroupControlOption
                                    key={key}
                                    value={item.value}
                                    label={item.label}
                                />
                            ))}
                        </ToggleGroupControl>

                        <TypographyDropdown
                            baseLabel="Title Typography"
                            typographyPrefixConstant={typoPrefix_title}
                        />

                        <ColorControl
                            label={__("Title Color", "essential-blocks")}
                            color={titleColor}
                            onChange={(titleColor) =>
                                handleBlockDefault({ titleColor })
                            }
                        />

                        <ColorControl
                            label={__("Title hover Color", "essential-blocks")}
                            color={hoverTitleColor}
                            onChange={(hoverTitleColor) =>
                                handleBlockDefault({ hoverTitleColor })
                            }
                        />

                        <PanelBody
                            title={__("Margin & Padding")}
                        // initialOpen={true}
                        >
                            <ResponsiveDimensionsControl
                                controlName={tabMarginConst}
                                baseLabel="Margin"
                            />
                            <ResponsiveDimensionsControl
                                controlName={tabPaddingConst}
                                baseLabel="Padding"
                            />
                        </PanelBody>

                        <PanelBody
                            title={__("Background ", "essential-blocks")}
                        // initialOpen={false}
                        >
                            <BackgroundControl
                                controlName={tabBgConst}
                                noMainBgi
                                noOverlay
                            />
                        </PanelBody>

                        <PanelBody
                            title={__(
                                "Expanded Tab Colors",
                                "essential-blocks"
                            )}
                        // initialOpen={false}
                        >
                            <ColorControl
                                label={__(
                                    "Background Color",
                                    "essential-blocks"
                                )}
                                color={activeBgColor}
                                onChange={(activeBgColor) =>
                                    handleBlockDefault({ activeBgColor })
                                }
                            />

                            <ColorControl
                                label={__("Title Color", "essential-blocks")}
                                color={activeTitleColor}
                                onChange={(activeTitleColor) =>
                                    handleBlockDefault({ activeTitleColor })
                                }
                            />
                        </PanelBody>

                        <PanelBody
                            title={__("Border & Shadow")}
                        // initialOpen={false}
                        >
                            <BorderShadowControl
                                controlName={tabBdShadowConst}
                            // noShadow
                            // noBorder
                            />
                        </PanelBody>
                    </PanelBody>
                    <PanelBody
                        title={__("Content Style", "essential-blocks")}
                        initialOpen={false}
                    >
                        <ToggleGroupControl
                            label={__("Align", "essential-blocks")}

                            value={contentAlign}
                            onChange={(value) =>
                                handleBlockDefault({
                                    contentAlign: value,
                                })
                            }
                            isBlock
                            __next40pxDefaultSize
                            __nextHasNoMarginBottom
                        >
                            {CONTENT_ALIGN.map((item, key) => (
                                <ToggleGroupControlOption
                                    key={key}
                                    value={item.value}
                                    label={item.label}
                                />
                            ))}
                        </ToggleGroupControl>

                        <TypographyDropdown
                            baseLabel="Content Typography"
                            typographyPrefixConstant={typoPrefix_content}
                        />

                        <ColorControl
                            label={__("Content Color", "essential-blocks")}
                            color={contentColor}
                            onChange={(contentColor) =>
                                handleBlockDefault({ contentColor })
                            }
                        />

                        <PanelBody
                            title={__("Margin & Padding")}
                        // initialOpen={true}
                        >
                            <ResponsiveDimensionsControl
                                controlName={conMarginConst}
                                baseLabel="Margin"
                            />
                            <ResponsiveDimensionsControl
                                controlName={conPaddingConst}
                                baseLabel="Padding"
                            />
                        </PanelBody>

                        <PanelBody
                            title={__("Background ", "essential-blocks")}
                        // initialOpen={false}
                        >
                            <BackgroundControl
                                controlName={conBgConst}
                                noOverlay
                                noMainBgi
                            />
                        </PanelBody>

                        <PanelBody
                            title={__("Border & Shadow")}
                        // initialOpen={false}
                        >
                            <BorderShadowControl
                                controlName={conBdShadowConst}
                            // noShadow
                            // noBorder
                            />
                        </PanelBody>
                    </PanelBody>
                    <PanelBody
                        title={__(
                            "Wrapper Margin & Padding",
                            "essential-blocks"
                        )}
                        initialOpen={false}
                    >
                        <ResponsiveDimensionsControl
                            controlName={wrapMarginConst}
                            baseLabel="Margin"
                        />
                        <ResponsiveDimensionsControl
                            controlName={wrapPaddingConst}
                            baseLabel="Padding"
                        />
                    </PanelBody>
                    <PanelBody
                        title={__("Wrapper Background ", "essential-blocks")}
                        initialOpen={false}
                    >
                        <BackgroundControl
                            controlName={WrpBgConst}
                        />
                    </PanelBody>
                    <PanelBody
                        title={__("Wrapper Border & Shadow")}
                        initialOpen={false}
                    >
                        <BorderShadowControl
                            controlName={WrpBdShadowConst}
                        // noShadow
                        // noBorder
                        />
                    </PanelBody>
                </div>
            )}
        </>
    );
}

export default withBlockContext(objAttributes)(Accordion);
