/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useEffect } from "@wordpress/element";
import { select, dispatch } from "@wordpress/data";
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
 * Internal dependencies
 */
import {
    ACCORDION_TYPES,
    ICON_POSITIONS,
    TITLE_ALIGNMENT,
    CONTENT_ALIGN,
    HEADING,
    sizeUnitTypes,
} from "./constants";

import {
    ColorControl,
    TypographyDropdown,
    ResponsiveDimensionsControl,
    ResponsiveRangeController,
    BorderShadowControl,
    BackgroundControl,
    EBIconPicker,
    InspectorPanel
} from '@essential-blocks/controls';

import objAttributes from "./attributes";

import {
    typoPrefix_title,
    typoPrefix_content,
    titlePrefixText,
    titleSuffixText
} from "./constants/typographyPrefixConstants";

import {
    rangeIconSize, accGapRange, titlePrefixIconSize, titlePrefixGap, titlePrefixImgWidth,
    titleSuffixIconSize, titleSuffixImgWidth
} from "./constants/rangeNames";

import {
    wrapMarginConst,
    wrapPaddingConst,
    iconMarginConst,
    iconPaddingConst,
    tabMarginConst,
    tabPaddingConst,
    conMarginConst,
    conPaddingConst,
} from "./constants/dimensionsConstants";

import {
    WrpBgConst,
    iconBgConst,
    tabBgConst,
    conBgConst,
} from "./constants/backgroundsConstants";

import {
    WrpBdShadowConst,
    iconBdShadowConst,
    tabBdShadowConst,
    conBdShadowConst,
} from "./constants/borderShadowConstants";

const Inspector = ({ attributes, setAttributes, clientId}) => {
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
        titlePrefixColor,
        titleSuffixColor
    } = attributes;

    useEffect(() => {
        const parentBlocks = select("core/block-editor").getBlocksByClientId(
            clientId
        )[0];

        const innerBlocks = parentBlocks?.innerBlocks;

        const { updateBlockAttributes } = dispatch("core/block-editor");

        if (innerBlocks) {
            times(innerBlocks.length, (n) => {
                updateBlockAttributes(innerBlocks[n].clientId, {
                    inheritedAccordionType: accordionType,
                    inheritedDisplayIcon: displayIcon,
                    inheritedTabIcon: tabIcon,
                    inheritedExpandedIcon: expandedIcon,
                    inheritedTagName: tagName,
                    faqSchema: faqSchema,
                });
            });
        }
    }, [accordionType, displayIcon, tabIcon, expandedIcon, tagName, faqSchema]);

    return (
        <InspectorPanel advancedControlProps={{
            marginPrefix: wrapMarginConst,
            paddingPrefix: wrapPaddingConst,
            backgroundPrefix: WrpBgConst,
            borderPrefix: WrpBdShadowConst,
            hasMargin: true
        }}>
            <InspectorPanel.General>
                <>
                    <InspectorPanel.PanelBody initialOpen={true}>
                        <BaseControl
                            label={__(
                                "Accordion Types",
                                "essential-blocks"
                            )}
                            id="eb-accordion-type"
                        >
                            <ButtonGroup id="eb-accordion-type-btgrp">
                                {ACCORDION_TYPES.map(
                                    (item, key) => (
                                        <Button
                                            key={key}
                                            // isLarge
                                            isSecondary={
                                                accordionType !==
                                                item.value
                                            }
                                            isPrimary={
                                                accordionType ===
                                                item.value
                                            }
                                            onClick={() =>
                                                setAttributes({
                                                    accordionType:
                                                        item.value,
                                                })
                                            }
                                        >
                                            {item.label}
                                        </Button>
                                    )
                                )}
                            </ButtonGroup>
                        </BaseControl>
                        <BaseControl
                            label={__(
                                "Title Level",
                                "essential-blocks"
                            )}
                            id="eb-accordion-heading-alignment"
                        >
                            <ButtonGroup className="eb-accordion-heading-alignment eb-html-tag-buttongroup">
                                {HEADING.map((item, key) => (
                                    <Button
                                        key={key}
                                        // isLarge
                                        isPrimary={
                                            tagName ===
                                            item.value
                                        }
                                        isSecondary={
                                            tagName !==
                                            item.value
                                        }
                                        onClick={() =>
                                            setAttributes({
                                                tagName:
                                                    item.value,
                                            })
                                        }
                                    >
                                        {item.label}
                                    </Button>
                                ))}
                            </ButtonGroup>
                        </BaseControl>
                        <RangeControl
                            label={__(
                                "Toggle Speed",
                                "essential-blocks"
                            )}
                            value={transitionDuration}
                            onChange={(transitionDuration) =>
                                setAttributes({
                                    transitionDuration,
                                })
                            }
                            min={0}
                            max={5}
                            step={0.1}
                            allowReset={true}
                        />
                        <ResponsiveRangeController
                            noUnits
                            baseLabel={__(
                                "Accordions Gap",
                                "essential-blocks"
                            )}
                            controlName={accGapRange}
                            min={1}
                            max={100}
                            step={1}
                        />
                        <ToggleControl
                            label={__(
                                "Enable FAQ Schema",
                                "essential-blocks"
                            )}
                            checked={faqSchema}
                            onChange={() =>
                                setAttributes({
                                    faqSchema: !faqSchema,
                                })
                            }
                        />
                    </InspectorPanel.PanelBody>
                </>
            </InspectorPanel.General>
            <InspectorPanel.Style>
                <>
                    <InspectorPanel.PanelBody
                        title={__("Icon", "essential-blocks")}
                        initialOpen={true}
                    >
                        <ToggleControl
                            label={__(
                                "Display Icon",
                                "essential-blocks"
                            )}
                            checked={displayIcon}
                            onChange={() =>
                                setAttributes({
                                    displayIcon: !displayIcon,
                                })
                            }
                        />
                        {displayIcon && (
                            <>
                                <EBIconPicker
                                    title={__(
                                        "Tab Icon",
                                        "essential-blocks"
                                    )}
                                    value={tabIcon}
                                    attributeName={'tabIcon'}
                                />
                                <EBIconPicker
                                    title={__(
                                        "Expanded Icon",
                                        "essential-blocks"
                                    )}
                                    value={expandedIcon}
                                    attributeName={'expandedIcon'}
                                />
                                <BaseControl
                                    label={__(
                                        "Icon Position",
                                        "essential-blocks"
                                    )}
                                >
                                    <ButtonGroup id="eb-icon-pos-btgrp">
                                        {ICON_POSITIONS.map(
                                            (item, key) => (
                                                <Button
                                                    key={key}
                                                    // isLarge
                                                    isSecondary={
                                                        iconPosition !==
                                                        item.value
                                                    }
                                                    isPrimary={
                                                        iconPosition ===
                                                        item.value
                                                    }
                                                    onClick={() =>
                                                        setAttributes(
                                                            {
                                                                iconPosition:
                                                                    item.value,
                                                            }
                                                        )
                                                    }
                                                >
                                                    {item.label}
                                                </Button>
                                            )
                                        )}
                                    </ButtonGroup>
                                </BaseControl>

                                <ResponsiveRangeController
                                    noUnits
                                    baseLabel={__(
                                        "Icon Size",
                                        "essential-blocks"
                                    )}
                                    controlName={rangeIconSize}
                                    min={1}
                                    max={200}
                                    step={1}
                                />

                                <ColorControl
                                    label={__(
                                        "Icon Color",
                                        "essential-blocks"
                                    )}
                                    color={iconColor}
                                    attributeName={'iconColor'}
                                />

                                <InspectorPanel.PanelBody
                                    title={__(
                                        "Margin & Padding"
                                    )}
                                // initialOpen={true}
                                >
                                    <ResponsiveDimensionsControl
                                        controlName={
                                            iconMarginConst
                                        }
                                        baseLabel="Margin"
                                    />
                                    <ResponsiveDimensionsControl
                                        controlName={
                                            iconPaddingConst
                                        }
                                        baseLabel="Padding"
                                    />
                                </InspectorPanel.PanelBody>

                                <InspectorPanel.PanelBody
                                    title={__(
                                        "Background ",
                                        "essential-blocks"
                                    )}
                                // initialOpen={false}
                                >
                                    <BackgroundControl
                                        controlName={
                                            iconBgConst
                                        }
                                        noOverlay
                                        noMainBgi
                                    />
                                </InspectorPanel.PanelBody>

                                <InspectorPanel.PanelBody
                                    title={__(
                                        "Border & Shadow"
                                    )}
                                // initialOpen={false}
                                >
                                    <BorderShadowControl
                                        controlName={
                                            iconBdShadowConst
                                        }
                                        defaultBdrColor={
                                            "#aaaaaa"
                                        }
                                        defaultBdrStyle={
                                            "solid"
                                        }
                                    // noShadow
                                    // noBorder
                                    />
                                </InspectorPanel.PanelBody>
                            </>
                        )}
                    </InspectorPanel.PanelBody>

                    <InspectorPanel.PanelBody
                        title={__("Tab", "essential-blocks")}
                        initialOpen={false}
                    >
                        <BaseControl
                            label={__(
                                "Title Align ",
                                "essential-blocks"
                            )}
                            id="eb-accoridon-title-align"
                        >
                            <ButtonGroup>
                                {TITLE_ALIGNMENT.map(
                                    (item, key) => (
                                        <Button
                                            key={key}
                                            isSecondary={
                                                titleAlignment !==
                                                item.value
                                            }
                                            isPrimary={
                                                titleAlignment ===
                                                item.value
                                            }
                                            onClick={() =>
                                                setAttributes({
                                                    titleAlignment:
                                                        item.value,
                                                })
                                            }
                                        >
                                            {item.label}
                                        </Button>
                                    )
                                )}
                            </ButtonGroup>
                        </BaseControl>

                        <TypographyDropdown
                            baseLabel={__("Title Typography","essential-blocks")}
                            typographyPrefixConstant={
                                typoPrefix_title
                            }
                        />

                        <ColorControl
                            label={__(
                                "Title Color",
                                "essential-blocks"
                            )}
                            color={titleColor}
                            attributeName={'titleColor'}
                        />

                        <ColorControl
                            label={__(
                                "Title hover Color",
                                "essential-blocks"
                            )}
                            color={hoverTitleColor}
                            attributeName={'hoverTitleColor'}
                        />
                        <ResponsiveRangeController
                            baseLabel={__(
                                "Prefix Suffix Spacing", "essential-blocks"
                            )}
                            controlName={
                                titlePrefixGap
                            }
                            min={0}
                            max={500}
                            step={1}
                            noUnits
                        />
                        <InspectorPanel.PanelBody
                            title={__("Title Prefix", "essential-blocks")}
                            initialOpen={false}
                        >
                            <ResponsiveRangeController
                                baseLabel={__(
                                    "Icon Size",
                                    "essential-blocks"
                                )}
                                controlName={
                                    titlePrefixIconSize
                                }
                                min={8}
                                max={200}
                                step={1}
                            />

                            <TypographyDropdown
                                baseLabel={__("Text Typography","essential-blocks")}
                                typographyPrefixConstant={
                                    titlePrefixText
                                }
                            />

                            <ColorControl
                                label={__(
                                    "Text / Icon Color",
                                    "essential-blocks"
                                )}
                                color={titlePrefixColor}
                                attributeName={'titlePrefixColor'}
                            />
                            <ResponsiveRangeController
                                baseLabel={__(
                                    "Image Width",
                                    "essential-blocks"
                                )}
                                controlName={
                                    titlePrefixImgWidth
                                }
                                units={
                                    sizeUnitTypes
                                }
                                min={0}
                                max={500}
                                step={1}
                            />
                        </InspectorPanel.PanelBody>
                        <InspectorPanel.PanelBody
                            title={__("Title Suffix", "essential-blocks")}
                            initialOpen={false}
                        >
                            <ResponsiveRangeController
                                baseLabel={__(
                                    "Icon Size",
                                    "essential-blocks"
                                )}
                                controlName={
                                    titleSuffixIconSize
                                }
                                min={8}
                                max={200}
                                step={1}
                            />

                            <TypographyDropdown
                                baseLabel={__("Text Typography","essential-blocks")}
                                typographyPrefixConstant={
                                    titleSuffixText
                                }
                            />
                            <ColorControl
                                label={__(
                                    "Text / Icon Color",
                                    "essential-blocks"
                                )}
                                color={titleSuffixColor}
                                attributeName={'titleSuffixColor'}
                            />
                            <ResponsiveRangeController
                                baseLabel={__(
                                    "Image Width",
                                    "essential-blocks"
                                )}
                                controlName={
                                    titleSuffixImgWidth
                                }
                                units={
                                    sizeUnitTypes
                                }
                                min={0}
                                max={500}
                                step={1}
                            />
                        </InspectorPanel.PanelBody>

                        <InspectorPanel.PanelBody
                            title={__("Margin & Padding","essential-blocks")}
                            initialOpen={false}
                        >
                            <ResponsiveDimensionsControl
                                controlName={tabMarginConst}
                                baseLabel="Margin"
                            />
                            <ResponsiveDimensionsControl
                                controlName={tabPaddingConst}
                                baseLabel="Padding"
                            />
                        </InspectorPanel.PanelBody>

                        <InspectorPanel.PanelBody
                            title={__(
                                "Background ",
                                "essential-blocks"
                            )}
                        // initialOpen={false}
                        >
                            <BackgroundControl
                                controlName={tabBgConst}
                                noMainBgi
                                noOverlay
                            />
                        </InspectorPanel.PanelBody>

                        <InspectorPanel.PanelBody
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
                                attributeName={'activeBgColor'}
                            />

                            <ColorControl
                                label={__(
                                    "Title Color",
                                    "essential-blocks"
                                )}
                                color={activeTitleColor}
                                attributeName={'activeTitleColor'}
                            />
                            <span>
                                <i>
                                    {__(
                                        "To see the changes, go to frontend page",
                                        "essential-blocks"
                                    )}
                                </i>
                            </span>
                        </InspectorPanel.PanelBody>

                        <InspectorPanel.PanelBody
                            title={__("Border & Shadow","essential-blocks")}
                        // initialOpen={false}
                        >
                            <BorderShadowControl
                                controlName={tabBdShadowConst}
                            // noShadow
                            // noBorder
                            />
                        </InspectorPanel.PanelBody>
                    </InspectorPanel.PanelBody>

                    <InspectorPanel.PanelBody
                        title={__(
                            "Content ",
                            "essential-blocks"
                        )}
                        initialOpen={false}
                    >
                        <BaseControl
                            label={__(
                                "Align",
                                "essential-blocks"
                            )}
                        >
                            <ButtonGroup>
                                {CONTENT_ALIGN.map(
                                    (item, key) => (
                                        <Button
                                            key={key}
                                            // isLarge
                                            isSecondary={
                                                contentAlign !==
                                                item.value
                                            }
                                            isPrimary={
                                                contentAlign ===
                                                item.value
                                            }
                                            onClick={() =>
                                                setAttributes({
                                                    contentAlign:
                                                        item.value,
                                                })
                                            }
                                        >
                                            {item.label}
                                        </Button>
                                    )
                                )}
                            </ButtonGroup>
                        </BaseControl>

                        <TypographyDropdown
                            baseLabel={__("Content Typography","essential-blocks")}
                            typographyPrefixConstant={
                                typoPrefix_content
                            }
                        />

                        <ColorControl
                            label={__(
                                "Content Color",
                                "essential-blocks"
                            )}
                            color={contentColor}
                            attributeName={'contentColor'}
                        />

                        <InspectorPanel.PanelBody
                            title={__("Margin & Padding","essential-blocks")}
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
                        </InspectorPanel.PanelBody>

                        <InspectorPanel.PanelBody
                            title={__(
                                "Background ",
                                "essential-blocks"
                            )}
                        // initialOpen={false}
                        >
                            <BackgroundControl
                                controlName={conBgConst}
                                noOverlay
                                noMainBgi
                            />
                        </InspectorPanel.PanelBody>

                        <InspectorPanel.PanelBody
                            title={__("Border & Shadow","essential-blocks")}
                        // initialOpen={false}
                        >
                            <BorderShadowControl
                                controlName={conBdShadowConst}
                            // noShadow
                            // noBorder
                            />
                        </InspectorPanel.PanelBody>
                    </InspectorPanel.PanelBody>
                </>
            </InspectorPanel.Style>
        </InspectorPanel>
    );
};

export default Inspector;
