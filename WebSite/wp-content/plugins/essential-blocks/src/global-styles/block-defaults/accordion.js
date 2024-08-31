/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useEffect, useState } from "@wordpress/element";
const { times } = lodash;
import {
    PanelBody,
    BaseControl,
    ButtonGroup,
    Button,
    ToggleControl,
    RangeControl,
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
                        <BaseControl
                            label={__("Accordion Types", "essential-blocks")}
                            id="eb-accordion-type"
                        >
                            <ButtonGroup id="eb-accordion-type-btgrp">
                                {ACCORDION_TYPES.map((item, key) => (
                                    <Button
                                        key={key}
                                        // isLarge
                                        isSecondary={
                                            accordionType !== item.value
                                        }
                                        isPrimary={accordionType === item.value}
                                        onClick={() =>
                                            handleBlockDefault({
                                                accordionType: item.value,
                                            })
                                        }
                                    >
                                        {item.label}
                                    </Button>
                                ))}
                            </ButtonGroup>
                        </BaseControl>
                        <BaseControl
                            label={__("Title Level", "essential-blocks")}
                            id="eb-accordion-heading-alignment"
                        >
                            <ButtonGroup className="eb-accordion-heading-alignment eb-html-tag-buttongroup">
                                {HEADING.map((item, key) => (
                                    <Button
                                        key={key}
                                        // isLarge
                                        isPrimary={tagName === item.value}
                                        isSecondary={tagName !== item.value}
                                        onClick={() =>
                                            handleBlockDefault({
                                                tagName: item.value,
                                            })
                                        }
                                    >
                                        {item.label}
                                    </Button>
                                ))}
                            </ButtonGroup>
                        </BaseControl>
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
                        <BaseControl
                            label={__("Title Align ", "essential-blocks")}
                            id="eb-accoridon-title-align"
                        >
                            <ButtonGroup>
                                {TITLE_ALIGNMENT.map((item, key) => (
                                    <Button
                                        key={key}
                                        isSecondary={
                                            titleAlignment !== item.value
                                        }
                                        isPrimary={
                                            titleAlignment === item.value
                                        }
                                        onClick={() =>
                                            handleBlockDefault({
                                                titleAlignment: item.value,
                                            })
                                        }
                                    >
                                        {item.label}
                                    </Button>
                                ))}
                            </ButtonGroup>
                        </BaseControl>

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
                        <BaseControl label={__("Align", "essential-blocks")}>
                            <ButtonGroup>
                                {CONTENT_ALIGN.map((item, key) => (
                                    <Button
                                        key={key}
                                        // isLarge
                                        isSecondary={
                                            contentAlign !== item.value
                                        }
                                        isPrimary={contentAlign === item.value}
                                        onClick={() =>
                                            handleBlockDefault({
                                                contentAlign: item.value,
                                            })
                                        }
                                    >
                                        {item.label}
                                    </Button>
                                ))}
                            </ButtonGroup>
                        </BaseControl>

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
