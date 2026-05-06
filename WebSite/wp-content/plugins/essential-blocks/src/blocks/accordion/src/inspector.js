/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useCallback, useEffect, useState } from "@wordpress/element";
import { select, dispatch, useSelect } from "@wordpress/data";
const { times } = lodash;
import {
    PanelBody,
    BaseControl,
    ToggleControl,
    RangeControl,
    PanelRow,
    SelectControl,
    __experimentalToggleGroupControl as ToggleGroupControl,
    __experimentalToggleGroupControlOption as ToggleGroupControlOption,
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
    MEDIA_TYPES,
    TITLE_ORIENTATION,
} from "./constants";

import {
    ColorControl,
    TypographyDropdown,
    ResponsiveDimensionsControl,
    ResponsiveRangeController,
    BorderShadowControl,
    BackgroundControl,
    EBIconPicker,
    InspectorPanel,
    SortControl,
    DynamicInputControl,
    ImageAvatar,
    ImageComponent
} from "@essential-blocks/controls";
import { deleteAccordion } from "./helpers";

import {
    typoPrefix_title,
    typoPrefix_content,
    titlePrefixText,
    titleSuffixText,
} from "./constants/typographyPrefixConstants";

import {
    rangeIconSize,
    accGapRange,
    titlePrefixIconSize,
    titlePrefixGap,
    titlePrefixImgWidth,
    titleSuffixIconSize,
    titleSuffixImgWidth,
    imageWidth,
    imageHeight,
    horizontalHeight,
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
    imgContainerPadding,
    imgContainerMargin,
    accordionMargin,
    accordionPadding,
    titlePrefixPadding,
    titleSuffixPadding,
    titlePrefixMargin,
    titleSuffixMargin,
} from "./constants/dimensionsConstants";

import {
    WrpBgConst,
    iconBgConst,
    tabBgConst,
    conBgConst,
    accordionBackground,
    accordionExpandedBackground,
    titlePrefixBG,
    titleSuffixBG,
} from "./constants/backgroundsConstants";

import {
    WrpBdShadowConst,
    iconBdShadowConst,
    tabBdShadowConst,
    conBdShadowConst,
    accordionBorder,
    accordionExpandedBorder,
    titlePrefixBorder,
    titleSuffixBorder,
} from "./constants/borderShadowConstants";

const Inspector = ({ attributes, setAttributes, clientId, addAccordion }) => {
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
        activeIconColor,
        tagName,
        faqSchema,
        titlePrefixColor,
        titleSuffixColor,
        accordionLists,
        imageContainerWidth,
        titleOrientation,
        activeAccordionIndex,
    } = attributes;

    // Add this state at the top with other states
    const [activeSettingsId, setActiveSettingsId] = useState(null);

    // Convert activeAccordionIndex (itemId) to SortControl position-based ID
    useEffect(() => {
        if (activeAccordionIndex && accordionLists.length > 0) {
            // Find the position of the item with the given itemId
            const itemIndex = accordionLists.findIndex(item => item.id === activeAccordionIndex);
            if (itemIndex !== -1) {
                // SortControl uses 1-based indexing
                setActiveSettingsId(itemIndex + 1);
            } else {
                // If the item doesn't exist, clear the active settings
                setActiveSettingsId(null);
            }
        } else {
            setActiveSettingsId(null);
        }
    }, [activeAccordionIndex, accordionLists]);

    const addNewTab = () => {
        addAccordion();
        // The addAccordion function in edit.js will set the activeAccordionIndex
        // to the new item's ID, so we don't need to do anything here
    };

    const getAccordionsComponents = () => {
        const onAccordionChange = (key, value, position) => {
            const newAccordion = { ...attributes.accordionLists[position] };
            const newAccordionList = [...attributes.accordionLists];
            newAccordionList[position] = newAccordion;

            if (Array.isArray(key)) {
                key.map((item, index) => {
                    newAccordionList[position][item] = value[index];
                });
            } else {
                newAccordionList[position][key] = value;
            }

            setAttributes({ accordionLists: newAccordionList });
        };

        const handleDefaultActive = (id) => {
            const newAccordionLists = accordionLists?.map((item) => {
                if (item.id === id) {
                    item.clickable = !item.clickable;
                } else {
                    item.clickable = false;
                }
                return item;
            });

            setAttributes({ accordionLists: newAccordionLists });
        };

        return attributes.accordionLists?.map((each, i) => (
            <>
                <div key={i}>
                    <ToggleControl
                        label={__(
                            "Keep it Open by Default",
                            "essential-blocks",
                        )}
                        checked={each.clickable}
                        onChange={() => {
                            handleDefaultActive(each.id);
                        }}
                        __nextHasNoMarginBottom
                    />
                    <DynamicInputControl
                        label={__("Title Text", "essential-blocks")}
                        attrName="title"
                        inputValue={each.title}
                        setAttributes={setAttributes}
                        onChange={(text) => onAccordionChange("title", text, i)}
                        keyName="accordionLists"
                        index={i}
                        isObject={true}
                    />

                    <PanelRow>
                        {__("Title Prefix", "essential-blocks")}
                    </PanelRow>
                    <ToggleGroupControl
                        label={__("Title Prefix", "essential-blocks")}

                        value={each.titlePrefixType}
                        onChange={(value) =>
                            onAccordionChange(
                                "titlePrefixType",
                                value,
                                i,
                            )
                        }
                        isBlock
                        __next40pxDefaultSize
                        __nextHasNoMarginBottom
                    >
                        {MEDIA_TYPES.map(({ label, value }, index) => (
                            <ToggleGroupControlOption
                                key={index}
                                value={value}
                                label={label}
                            />
                        ))}
                    </ToggleGroupControl>
                    {each.titlePrefixType !== "none" && (
                        <>
                            {each.titlePrefixType === "icon" && (
                                <EBIconPicker
                                    value={each.titlePrefixIcon}
                                    onChange={(value) =>
                                        onAccordionChange(
                                            "titlePrefixIcon",
                                            value,
                                            i,
                                        )
                                    }
                                    title={""}
                                />
                            )}

                            {each.titlePrefixType === "text" && (
                                <>
                                    <DynamicInputControl
                                        label={__(
                                            "Prefix Text",
                                            "essential-blocks",
                                        )}
                                        attrName="titlePrefixText"
                                        inputValue={each.titlePrefixText}
                                        setAttributes={setAttributes}
                                        onChange={(text) =>
                                            onAccordionChange(
                                                "titlePrefixText",
                                                text,
                                                i,
                                            )
                                        }
                                        keyName="accordionLists"
                                        index={i}
                                        isObject={true}
                                    />
                                </>
                            )}

                            {(each.titlePrefixType === "text" ||
                                each.titlePrefixType === "icon") && (
                                    <>
                                        <ColorControl
                                            label={__("Prefix Color", "essential-blocks")}
                                            color={each.titlePrefixColor}
                                            onChange={(value) =>
                                                onAccordionChange(
                                                    "titlePrefixColor",
                                                    value,
                                                    i,
                                                )
                                            }
                                        />
                                        <ColorControl
                                            label={__(
                                                "Prefix Background Color",
                                                "essential-blocks",
                                            )}
                                            color={each.titlePrefixBGColor}
                                            onChange={(value) =>
                                                onAccordionChange(
                                                    "titlePrefixBGColor",
                                                    value,
                                                    i,
                                                )
                                            }
                                            isGradient={true}
                                        />
                                    </>
                                )}

                            {each.titlePrefixType === "image" && (
                                <ImageComponent.GeneralTab
                                    onSelect={({ id, url, alt }) => {
                                        onAccordionChange(
                                            [
                                                "titlePrefixImgUrl",
                                                "titlePrefixImgId",
                                                "titlePrefixImgAlt",
                                            ],
                                            [url, id, alt],
                                            i,
                                        );
                                    }}
                                    value={each.titlePrefixImgUrl}
                                    hasTag={false}
                                    hasCaption={false}
                                    hasStyle={false}
                                    hasLink={false}
                                    showInPanel={false}
                                />
                            )}
                        </>
                    )}
                    <hr />
                    <PanelRow>
                        {__("Title Suffix", "essential-blocks")}
                    </PanelRow>
                    <ToggleGroupControl
                        label={__("Title Suffix", "essential-blocks")}

                        value={each.titleSuffixType}
                        onChange={(value) =>
                            onAccordionChange(
                                "titleSuffixType",
                                value,
                                i,
                            )
                        }
                        isBlock
                        __next40pxDefaultSize
                        __nextHasNoMarginBottom
                    >
                        {MEDIA_TYPES.map(({ label, value }, index) => (
                            <ToggleGroupControlOption
                                key={index}
                                value={value}
                                label={label}
                            />
                        ))}
                    </ToggleGroupControl>

                    {each.titleSuffixType !== "none" && (
                        <>
                            {each.titleSuffixType === "icon" && (
                                <EBIconPicker
                                    value={each.titleSuffixIcon}
                                    onChange={(value) =>
                                        onAccordionChange(
                                            "titleSuffixIcon",
                                            value,
                                            i,
                                        )
                                    }
                                    title={""}
                                />
                            )}

                            {each.titleSuffixType === "text" && (
                                <>
                                    <DynamicInputControl
                                        label={__(
                                            "Suffix Text",
                                            "essential-blocks",
                                        )}
                                        attrName="titleSuffixText"
                                        inputValue={each.titleSuffixText}
                                        setAttributes={setAttributes}
                                        onChange={(text) =>
                                            onAccordionChange(
                                                "titleSuffixText",
                                                text,
                                                i,
                                            )
                                        }
                                        keyName="accordionLists"
                                        index={i}
                                        isObject={true}
                                    />
                                </>
                            )}

                            {(each.titleSuffixType === "text" ||
                                each.titleSuffixType === "icon") && (
                                    <>
                                        <ColorControl
                                            label={__("Suffix Color", "essential-blocks")}
                                            color={each.titleSuffixIconColor}
                                            onChange={(value) =>
                                                onAccordionChange(
                                                    "titleSuffixIconColor",
                                                    value,
                                                    i,
                                                )
                                            }
                                        />
                                        <ColorControl
                                            label={__(
                                                "Suffix Background Color",
                                                "essential-blocks",
                                            )}
                                            color={each.titleSuffixBGColor}
                                            onChange={(value) =>
                                                onAccordionChange(
                                                    "titleSuffixBGColor",
                                                    value,
                                                    i,
                                                )
                                            }
                                            isGradient={true}
                                        />
                                    </>
                                )}

                            {each.titleSuffixType === "image" && (
                                <ImageComponent.GeneralTab
                                    onSelect={({ id, url, alt }) => {
                                        onAccordionChange(
                                            [
                                                "titleSuffixImgUrl",
                                                "titleSuffixImgId",
                                                "titleSuffixImgAlt",
                                            ],
                                            [url, id, alt],
                                            i,
                                        );
                                    }}
                                    value={each.titleSuffixImgUrl}
                                    hasTag={false}
                                    hasCaption={false}
                                    hasStyle={false}
                                    hasLink={false}
                                    showInPanel={false}
                                />
                            )}
                        </>
                    )}
                    {accordionType === "image" && (
                        <>
                            <PanelRow>
                                {__("Accordion Image", "essential-blocks")}
                            </PanelRow>
                            <ImageComponent.GeneralTab
                                onSelect={({ id, url, alt }) => {
                                    onAccordionChange(
                                        [
                                            "imageUrl",
                                            "imageId",
                                            "imageAlt",
                                        ],
                                        [url, id, alt],
                                        i,
                                    );
                                }}
                                value={each.imageUrl}
                                hasTag={false}
                                hasCaption={false}
                                hasStyle={false}
                                hasLink={false}
                                showInPanel={false}
                            />
                        </>
                    )}

                    <hr />
                    <ColorControl
                        label={__("Title Background Color", "essential-blocks")}
                        color={each.accordionColor}
                        onChange={(value) =>
                            onAccordionChange("accordionColor", value, i)
                        }
                        isGradient={true}
                    />
                    <ColorControl
                        label={__("Title Color", "essential-blocks")}
                        color={each.titleColor}
                        onChange={(value) =>
                            onAccordionChange("titleColor", value, i)
                        }
                    />
                    <ColorControl
                        label={__("Icon Color", "essential-blocks")}
                        color={each.iconColor}
                        onChange={(value) =>
                            onAccordionChange("iconColor", value, i)
                        }
                    />
                </div>
            </>
        ));
    };
    const { innerBlocks } = useSelect(
        (select) =>
            select("core/block-editor").getBlocksByClientId(clientId)[0],
    );
    const { replaceInnerBlocks } = dispatch("core/block-editor");

    // replace inner blocks after sorting items
    const afterSort = useCallback(
        (lists) => {
            const idMap = lists.map((item) => item.id.toString());

            const sortedInnerBlocks = innerBlocks.sort((a, b) => {
                return (
                    idMap.indexOf(a.attributes.itemId.toString()) -
                    idMap.indexOf(b.attributes.itemId.toString())
                );
            });

            replaceInnerBlocks(clientId, sortedInnerBlocks);
            setAttributes({ accordionLists: lists });
        },
        [innerBlocks, replaceInnerBlocks],
    );

    const onDeleteAccordion = (index) => {
        deleteAccordion(clientId, setAttributes, accordionLists, index);
        // After deletion, set active to the first remaining item or null
        const remainingItems = accordionLists.filter((_, i) => i !== index);
        setAttributes({
            activeAccordionIndex: remainingItems.length > 0 ? remainingItems[0]?.id : null
        });
    };
    return (
        <InspectorPanel
            advancedControlProps={{
                marginPrefix: wrapMarginConst,
                paddingPrefix: wrapPaddingConst,
                backgroundPrefix: WrpBgConst,
                borderPrefix: WrpBdShadowConst,
                hasMargin: true,
            }}
        >
            <InspectorPanel.General>
                <>
                    <InspectorPanel.PanelBody
                        title={__("Settings", "essential-blocks")}
                        initialOpen={true}
                    >
                        <SelectControl
                            label={__("Accordion Types", "essential-blocks")}
                            value={accordionType}
                            options={ACCORDION_TYPES}
                            onChange={(selected) =>
                                setAttributes({ accordionType: selected })
                            }
                            __next40pxDefaultSize
                            __nextHasNoMarginBottom
                        />
                        <ToggleGroupControl
                            label={__("Title HTML Tag", "essential-blocks")}
                            className="newtogglegroupcontrol eb-accordion-heading-alignment eb-html-tag-buttongroup"
                            value={tagName}
                            onChange={(value) =>
                                setAttributes({
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
                        {accordionType === "horizontal" && (
                            <>
                                <ResponsiveRangeController
                                    baseLabel={__(
                                        "Horizontal Height",
                                        "essential-blocks",
                                    )}
                                    controlName={horizontalHeight}
                                    min={0}
                                    max={2000}
                                    step={1}
                                />
                                <SelectControl
                                    label={__(
                                        "Title Orientation",
                                        "essential-blocks",
                                    )}
                                    value={titleOrientation}
                                    options={TITLE_ORIENTATION}
                                    onChange={(selected) =>
                                        setAttributes({
                                            titleOrientation: selected,
                                        })
                                    }
                                    __next40pxDefaultSize
                                    __nextHasNoMarginBottom
                                />
                            </>
                        )}
                        <ToggleControl
                            label={__("Enable FAQ Schema", "essential-blocks")}
                            checked={faqSchema}
                            onChange={() =>
                                setAttributes({
                                    faqSchema: !faqSchema,
                                })
                            }
                            __nextHasNoMarginBottom
                        />
                        {faqSchema && (
                            <PanelRow>
                                <div className="eb-instruction">
                                    {__(
                                        "Let Google know that this section contains an FAQ. Make sure to only use it only once per page.",
                                        "essential-blocks",
                                    )}
                                </div>
                            </PanelRow>
                        )}
                    </InspectorPanel.PanelBody>
                    {accordionType === "image" && (
                        <InspectorPanel.PanelBody
                            title={__("Image Container", "essential-blocks")}
                            initialOpen={true}
                        >
                            <RangeControl
                                label={__(
                                    "Container Width(%)",
                                    "essential-blocks",
                                )}
                                value={imageContainerWidth}
                                onChange={(imageContainerWidth) =>
                                    setAttributes({
                                        imageContainerWidth,
                                    })
                                }
                                min={0}
                                max={100}
                                step={1}
                                allowReset={true}
                                __nextHasNoMarginBottom
                                __next40pxDefaultSize
                            />
                        </InspectorPanel.PanelBody>
                    )}
                    <InspectorPanel.PanelBody
                        title={__(
                            "Individual Accordion Item",
                            "essential-blocks",
                        )}
                        initialOpen={false}
                    >
                        <SortControl
                            items={attributes.accordionLists}
                            labelKey="title"
                            onSortEnd={(accordionLists) =>
                                afterSort(accordionLists)
                            }
                            onDeleteItem={(index) => onDeleteAccordion(index)}
                            hasSettings={true}
                            settingsComponents={getAccordionsComponents()}
                            hasAddButton={true}
                            onAddItem={addNewTab}
                            defaultShowItemId={activeSettingsId} // Add this line
                            addButtonText={__(
                                "Add a New Accordion Item",
                                "essential-blocks",
                            )}
                        ></SortControl>
                    </InspectorPanel.PanelBody>
                </>
            </InspectorPanel.General>
            <InspectorPanel.Style>
                <>
                    <InspectorPanel.PanelBody
                        title={__("Settings", "essential-blocks")}
                        initialOpen={true}
                    >
                        <RangeControl
                            label={__("Toggle Speed", "essential-blocks")}
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
                            __nextHasNoMarginBottom
                            __next40pxDefaultSize
                        />
                        <ResponsiveRangeController
                            noUnits
                            baseLabel={__("Accordions Gap", "essential-blocks")}
                            controlName={accGapRange}
                            min={0}
                            max={100}
                            step={1}
                        />
                    </InspectorPanel.PanelBody>
                    <InspectorPanel.PanelBody
                        title={__("Icon", "essential-blocks")}
                        initialOpen={false}
                    >
                        <ToggleControl
                            label={__("Display Icon", "essential-blocks")}
                            checked={displayIcon}
                            onChange={() =>
                                setAttributes({
                                    displayIcon: !displayIcon,
                                })
                            }
                            __nextHasNoMarginBottom
                        />
                        {displayIcon && (
                            <>
                                <EBIconPicker
                                    title={__("Tab Icon", "essential-blocks")}
                                    value={tabIcon}
                                    attributeName={"tabIcon"}
                                />
                                <EBIconPicker
                                    title={__(
                                        "Expanded Icon",
                                        "essential-blocks",
                                    )}
                                    value={expandedIcon}
                                    attributeName={"expandedIcon"}
                                />
                                <ToggleGroupControl
                                    label={__(
                                        "Icon Position",
                                        "essential-blocks",
                                    )}

                                    value={iconPosition}
                                    onChange={(value) =>
                                        setAttributes({
                                            iconPosition: value,
                                        })
                                    }
                                    isBlock
                                    __next40pxDefaultSize
                                    __nextHasNoMarginBottom
                                >
                                    {ICON_POSITIONS.map((item, key) => (
                                        <ToggleGroupControlOption
                                            key={key}
                                            value={item.value}
                                            label={item.label}
                                        />
                                    ))}
                                </ToggleGroupControl>

                                <ResponsiveRangeController
                                    noUnits
                                    baseLabel={__(
                                        "Icon Size",
                                        "essential-blocks",
                                    )}
                                    controlName={rangeIconSize}
                                    min={0}
                                    max={200}
                                    step={1}
                                />

                                <ColorControl
                                    label={__("Icon Color", "essential-blocks")}
                                    color={iconColor}
                                    attributeName={"iconColor"}
                                />

                                <InspectorPanel.PanelBody
                                    title={__("Margin & Padding")}
                                // initialOpen={true}
                                >
                                    <ResponsiveDimensionsControl
                                        controlName={iconMarginConst}
                                        baseLabel="Margin"
                                    />
                                    <ResponsiveDimensionsControl
                                        controlName={iconPaddingConst}
                                        baseLabel="Padding"
                                    />
                                </InspectorPanel.PanelBody>

                                <InspectorPanel.PanelBody
                                    title={__(
                                        "Background ",
                                        "essential-blocks",
                                    )}
                                // initialOpen={false}
                                >
                                    <BackgroundControl
                                        controlName={iconBgConst}
                                        noOverlay
                                        noMainBgi
                                    />
                                </InspectorPanel.PanelBody>

                                <InspectorPanel.PanelBody
                                    title={__("Border & Shadow")}
                                // initialOpen={false}
                                >
                                    <BorderShadowControl
                                        controlName={iconBdShadowConst}
                                        defaultBdrColor={"#aaaaaa"}
                                        defaultBdrStyle={"solid"}
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
                        <ToggleGroupControl
                            label={__("Title Align ", "essential-blocks")}

                            value={titleAlignment}
                            onChange={(value) =>
                                setAttributes({
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
                            baseLabel={__(
                                "Title Typography",
                                "essential-blocks",
                            )}
                            typographyPrefixConstant={typoPrefix_title}
                        />

                        <ColorControl
                            label={__("Title Color", "essential-blocks")}
                            color={titleColor}
                            attributeName={"titleColor"}
                        />

                        <ColorControl
                            label={__("Title hover Color", "essential-blocks")}
                            color={hoverTitleColor}
                            attributeName={"hoverTitleColor"}
                        />
                        <ResponsiveRangeController
                            baseLabel={__(
                                "Prefix Suffix Spacing",
                                "essential-blocks",
                            )}
                            controlName={titlePrefixGap}
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
                                baseLabel={__("Icon Size", "essential-blocks")}
                                controlName={titlePrefixIconSize}
                                min={8}
                                max={200}
                                step={1}
                            />

                            <TypographyDropdown
                                baseLabel={__(
                                    "Text Typography",
                                    "essential-blocks",
                                )}
                                typographyPrefixConstant={titlePrefixText}
                            />

                            <ColorControl
                                label={__(
                                    "Text / Icon Color",
                                    "essential-blocks",
                                )}
                                color={titlePrefixColor}
                                attributeName={"titlePrefixColor"}
                            />
                            <ResponsiveRangeController
                                baseLabel={__(
                                    "Image Width",
                                    "essential-blocks",
                                )}
                                controlName={titlePrefixImgWidth}
                                units={sizeUnitTypes}
                                min={0}
                                max={500}
                                step={1}
                            />
                            <InspectorPanel.PanelBody
                                title={__("Background ", "essential-blocks")}
                                initialOpen={false}
                            >
                                <BackgroundControl
                                    controlName={titlePrefixBG}
                                    noOverlay
                                    noMainBgi
                                />
                            </InspectorPanel.PanelBody>
                            <InspectorPanel.PanelBody
                                title={__(
                                    "Margin & Padding",
                                    "essential-blocks",
                                )}
                            >
                                <ResponsiveDimensionsControl
                                    controlName={titlePrefixMargin}
                                    baseLabel={__("Margin", "essential-blocks")}
                                />
                                <ResponsiveDimensionsControl
                                    controlName={titlePrefixPadding}
                                    baseLabel={__(
                                        "Padding",
                                        "essential-blocks",
                                    )}
                                />
                            </InspectorPanel.PanelBody>
                            <InspectorPanel.PanelBody
                                title={__(
                                    "Border & Shadow",
                                    "essential-blocks",
                                )}
                                initialOpen={false}
                            >
                                <BorderShadowControl
                                    controlName={titlePrefixBorder}
                                // noShadow
                                // noBorder
                                />
                            </InspectorPanel.PanelBody>
                        </InspectorPanel.PanelBody>
                        <InspectorPanel.PanelBody
                            title={__("Title Suffix", "essential-blocks")}
                            initialOpen={false}
                        >
                            <ResponsiveRangeController
                                baseLabel={__("Icon Size", "essential-blocks")}
                                controlName={titleSuffixIconSize}
                                min={8}
                                max={200}
                                step={1}
                            />

                            <TypographyDropdown
                                baseLabel={__(
                                    "Text Typography",
                                    "essential-blocks",
                                )}
                                typographyPrefixConstant={titleSuffixText}
                            />
                            <ColorControl
                                label={__(
                                    "Text / Icon Color",
                                    "essential-blocks",
                                )}
                                color={titleSuffixColor}
                                attributeName={"titleSuffixColor"}
                            />
                            <ResponsiveRangeController
                                baseLabel={__(
                                    "Image Width",
                                    "essential-blocks",
                                )}
                                controlName={titleSuffixImgWidth}
                                units={sizeUnitTypes}
                                min={0}
                                max={500}
                                step={1}
                            />
                            <InspectorPanel.PanelBody
                                title={__("Background ", "essential-blocks")}
                                initialOpen={false}
                            >
                                <BackgroundControl
                                    controlName={titleSuffixBG}
                                    noOverlay
                                    noMainBgi
                                />
                            </InspectorPanel.PanelBody>
                            <InspectorPanel.PanelBody
                                title={__(
                                    "Margin & Padding",
                                    "essential-blocks",
                                )}
                            >
                                <ResponsiveDimensionsControl
                                    controlName={titleSuffixMargin}
                                    baseLabel={__("Margin", "essential-blocks")}
                                />
                                <ResponsiveDimensionsControl
                                    controlName={titleSuffixPadding}
                                    baseLabel={__(
                                        "Padding",
                                        "essential-blocks",
                                    )}
                                />
                            </InspectorPanel.PanelBody>
                            <InspectorPanel.PanelBody
                                title={__(
                                    "Border & Shadow",
                                    "essential-blocks",
                                )}
                                initialOpen={false}
                            >
                                <BorderShadowControl
                                    controlName={titleSuffixBorder}
                                // noShadow
                                // noBorder
                                />
                            </InspectorPanel.PanelBody>
                        </InspectorPanel.PanelBody>

                        <InspectorPanel.PanelBody
                            title={__("Margin & Padding", "essential-blocks")}
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
                            title={__("Background ", "essential-blocks")}
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
                                "essential-blocks",
                            )}
                        >
                            <ColorControl
                                label={__(
                                    "Background Color",
                                    "essential-blocks",
                                )}
                                color={activeBgColor}
                                attributeName={"activeBgColor"}
                            />
                            <ColorControl
                                label={__("Title Color", "essential-blocks")}
                                color={activeTitleColor}
                                attributeName={"activeTitleColor"}
                            />
                            <ColorControl
                                label={__("Icon Color", "essential-blocks")}
                                color={activeIconColor}
                                attributeName={"activeIconColor"}
                            />
                            <span>
                                <i>
                                    {__(
                                        "To see the changes, go to frontend page",
                                        "essential-blocks",
                                    )}
                                </i>
                            </span>
                        </InspectorPanel.PanelBody>
                        <InspectorPanel.PanelBody
                            title={__("Border & Shadow", "essential-blocks")}
                        >
                            <BorderShadowControl
                                controlName={tabBdShadowConst}
                            />
                        </InspectorPanel.PanelBody>
                    </InspectorPanel.PanelBody>
                    <InspectorPanel.PanelBody
                        title={__("Content ", "essential-blocks")}
                        initialOpen={false}
                    >
                        <ToggleGroupControl
                            label={__("Alignment", "essential-blocks")}

                            value={contentAlign}
                            onChange={(value) =>
                                setAttributes({
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
                            baseLabel={__(
                                "Content Typography",
                                "essential-blocks",
                            )}
                            typographyPrefixConstant={typoPrefix_content}
                        />
                        <ColorControl
                            label={__("Content Color", "essential-blocks")}
                            color={contentColor}
                            attributeName={"contentColor"}
                        />
                        <InspectorPanel.PanelBody
                            title={__("Margin & Padding", "essential-blocks")}
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
                            title={__("Background ", "essential-blocks")}
                        // initialOpen={false}
                        >
                            <BackgroundControl
                                controlName={conBgConst}
                                noOverlay
                                noMainBgi
                            />
                        </InspectorPanel.PanelBody>

                        <InspectorPanel.PanelBody
                            title={__("Border & Shadow", "essential-blocks")}
                        // initialOpen={false}
                        >
                            <BorderShadowControl
                                controlName={conBdShadowConst}
                            // noShadow
                            // noBorder
                            />
                        </InspectorPanel.PanelBody>
                    </InspectorPanel.PanelBody>
                    {accordionType === "image" && (
                        <InspectorPanel.PanelBody
                            title={__("Image Container", "essential-blocks")}
                            initialOpen={false}
                        >
                            <ResponsiveRangeController
                                baseLabel={__(
                                    "Image Width",
                                    "essential-blocks",
                                )}
                                controlName={imageWidth}
                                min={0}
                                max={2000}
                                step={1}
                            />
                            <ResponsiveRangeController
                                baseLabel={__(
                                    "Image Height",
                                    "essential-blocks",
                                )}
                                controlName={imageHeight}
                                min={0}
                                max={2000}
                                step={1}
                            />
                            <ResponsiveDimensionsControl
                                controlName={imgContainerMargin}
                                baseLabel="Margin"
                            />
                            <ResponsiveDimensionsControl
                                controlName={imgContainerPadding}
                                baseLabel="Padding"
                            />
                        </InspectorPanel.PanelBody>
                    )}
                    <InspectorPanel.PanelBody
                        title={__(
                            "Individual Accordion Item",
                            "essential-blocks",
                        )}
                        initialOpen={false}
                    >
                        <InspectorPanel.PanelBody
                            title={__("Margin & Padding", "essential-blocks")}
                        >
                            <ResponsiveDimensionsControl
                                controlName={accordionMargin}
                                baseLabel="Margin"
                            />
                            <ResponsiveDimensionsControl
                                controlName={accordionPadding}
                                baseLabel="Padding"
                            />
                        </InspectorPanel.PanelBody>
                        <InspectorPanel.PanelBody
                            title={__("Background ", "essential-blocks")}
                            initialOpen={false}
                        >
                            <BackgroundControl
                                controlName={accordionBackground}
                                noOverlay
                                noMainBgi
                            />
                        </InspectorPanel.PanelBody>

                        <InspectorPanel.PanelBody
                            title={__("Border & Shadow", "essential-blocks")}
                            initialOpen={false}
                        >
                            <BorderShadowControl
                                controlName={accordionBorder}
                            // noShadow
                            // noBorder
                            />
                        </InspectorPanel.PanelBody>
                        <PanelRow>
                            {__("Expanded Accordion", "essential-blocks")}
                        </PanelRow>
                        <InspectorPanel.PanelBody
                            title={__("Background ", "essential-blocks")}
                            initialOpen={false}
                        >
                            <BackgroundControl
                                controlName={accordionExpandedBackground}
                                noOverlay
                                noMainBgi
                            />
                        </InspectorPanel.PanelBody>
                        <InspectorPanel.PanelBody
                            title={__("Border & Shadow", "essential-blocks")}
                            initialOpen={false}
                        >
                            <BorderShadowControl
                                controlName={accordionExpandedBorder}
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
