/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useEffect, useState } from "@wordpress/element";
import { select } from "@wordpress/data";
import { applyFilters } from "@wordpress/hooks";
import {
    ToggleControl,
    TextControl,
    RangeControl,
    PanelRow,
    __experimentalToggleGroupControl as ToggleGroupControl,
    __experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from "@wordpress/components";

/**
 * External Dependencies
 */
import Select2 from "react-select";

/**
 * Internal depencencies
 */
import {
    WRAPPER_MARGIN,
    WRAPPER_PADDING,
    WRAPPER_BORDER_SHADOW,
    WRAPPER_BG,
    META_ALIGNMENT,
    TEXT_ALIGN,
    META_DISPLAY,
    METAGAP,
    AUTHOR_PICTURE_BORDER,
    AUTHOR_PICTURE_SIZE,
} from "./constants/constants";
import { META_LABEL, META_VALUE } from "./constants/typographyPrefixConstants";

import {
    ColorControl,
    TypographyDropdown,
    ResponsiveAlignControl,
    SortControl,
    InspectorPanel,
    ResponsiveRangeController,
    EBIconPicker,
    BorderShadowControl,
    EBTextControl
} from "@essential-blocks/controls";

export default function Inspector(props) {
    const { attributes, setAttributes, context } = props;
    const {
        resOption,
        enableContents,
        metaDisplay,
        showAuthor,
        showDate,
        showProductSku,
        authorLabel,
        dateLabel,
        productSkuLabel,
        type,
        metaLabelColor,
        metaValueColor,
        authorIcon,
        dateIcon,
        skuIcon,
        showMetaIcon,
        metaIconColor,
        metaIconSize,
        showAuthorPicture,
        authorPictureLink,
        authorPictureBorderRadius,
        customFields,
        metaItems,
    } = attributes;

    const [metaOptions, setMetaOptions] = useState([]);

    useEffect(() => {
        const loopPostType = context?.["essential-blocks/postType"];
        const currentPostType = select("core/editor")?.getCurrentPostType?.();
        const postType = loopPostType || type || currentPostType || "post";

        const updatedMeta = applyFilters(
            "essential_blocks_post_grid_meta",
            [],
            postType,
        );

        if (updatedMeta && updatedMeta.then) {
            updatedMeta.then((resp) => {
                const modifiedArray = (resp || []).map((item) => ({
                    ...item,
                    options: (item.options || []).map((option) => {
                        if (typeof option.label === "object") {
                            const proLocalize = typeof window !== "undefined" ? window.EssentialBlocksProLocalize : undefined;
                            const prefix = proLocalize?.eb_dynamic_tags
                                ? `${proLocalize.eb_dynamic_tags}/`
                                : "";
                            return {
                                ...option.label,
                                value: `${prefix}${option.label.value}/settings=[]`,
                            };
                        }
                        return { ...option };
                    }),
                }));
                setMetaOptions(modifiedArray);
            });
        } else if (Array.isArray(updatedMeta)) {
            setMetaOptions(updatedMeta);
        }
    }, [context?.["essential-blocks/postType"], type]);

    const parsedCustomFields = (() => {
        try {
            const parsed = customFields ? JSON.parse(customFields) : [];
            return Array.isArray(parsed) ? parsed : [];
        } catch (e) {
            return [];
        }
    })();

    const builtinLabels = {
        author: __("Author Name", "essential-blocks"),
        date: __("Published Date", "essential-blocks"),
        product_sku: __("Product SKU", "essential-blocks"),
    };

    const parsedMetaItems = (() => {
        try {
            const parsed = metaItems ? JSON.parse(metaItems) : null;
            return Array.isArray(parsed) ? parsed : null;
        } catch (e) {
            return null;
        }
    })();

    // Effective selection: once `metaItems` has been touched (even cleared to
    // []), treat it as canonical so the user can intentionally show zero items.
    // Only fall through to the legacy show* flags + enableContents + customFields
    // when `metaItems` was never set ("" → parsedMetaItems === null).
    const effectiveItems = (() => {
        if (parsedMetaItems !== null) {
            return parsedMetaItems;
        }
        const legacy = [];
        (enableContents || []).forEach((key) => {
            if (key === "author" && showAuthor) {
                legacy.push({ value: "author", label: builtinLabels.author });
            } else if (key === "date" && showDate) {
                legacy.push({ value: "date", label: builtinLabels.date });
            } else if (
                key === "product_sku" &&
                showProductSku &&
                type === "product"
            ) {
                legacy.push({
                    value: "product_sku",
                    label: builtinLabels.product_sku,
                });
            }
        });
        parsedCustomFields.forEach((field) => legacy.push(field));
        return legacy;
    })();

    const hasItem = (key) =>
        effectiveItems.some((item) => item && item.value === key);

    const builtinOptions = [
        { value: "author", label: builtinLabels.author },
        { value: "date", label: builtinLabels.date },
        ...(type === "product"
            ? [{ value: "product_sku", label: builtinLabels.product_sku }]
            : []),
    ];

    const groupedOptions = [
        {
            label: __("General", "essential-blocks"),
            options: builtinOptions,
        },
        ...(metaOptions || []).filter((g) => g && (g.options || []).length > 0),
    ];

    const DEFAULT_CUSTOM_ICON = "fas fa-tag";

    const handleMetaItemsChange = (selected) => {
        const selectedList = Array.isArray(selected) ? selected : [];
        // Preserve any per-item customLabel / icon values that were already
        // set on items that remain in the new selection.
        const previousByValue = {};
        effectiveItems.forEach((item) => {
            if (item && item.value) previousByValue[item.value] = item;
        });
        const next = selectedList.map(({ value, label }) => {
            const prev = previousByValue[value];
            const isBuiltin =
                value === "author" ||
                value === "date" ||
                value === "product_sku";

            if (prev) {
                return {
                    value,
                    label,
                    ...(prev.customLabel
                        ? { customLabel: prev.customLabel }
                        : {}),
                    ...(prev.icon ? { icon: prev.icon } : {}),
                };
            }

            // Newly-added non-builtin item: seed sensible defaults so the user
            // sees something on the frontend without having to type a label
            // and pick an icon manually.
            if (!isBuiltin) {
                const cleanLabel = (label || "").replace(/^ACF:\s*/i, "");
                return {
                    value,
                    label,
                    customLabel: cleanLabel ? `${cleanLabel}: ` : "",
                    icon: DEFAULT_CUSTOM_ICON,
                };
            }
            return { value, label };
        });
        setAttributes({ metaItems: JSON.stringify(next) });
    };

    const updateMetaItem = (targetValue, partial) => {
        const next = effectiveItems.map((item) => {
            if (!item || item.value !== targetValue) return item;
            const merged = { ...item, ...partial };
            // Drop empty optional fields to keep the JSON tidy.
            if (merged.customLabel === "") delete merged.customLabel;
            if (merged.icon === "") delete merged.icon;
            return merged;
        });
        setAttributes({ metaItems: JSON.stringify(next) });
    };

    const customMetaItems = effectiveItems.filter(
        (item) =>
            item &&
            item.value &&
            item.value !== "author" &&
            item.value !== "date" &&
            item.value !== "product_sku",
    );

    const toggleContent = (value, isChecked) => {
        let list = [...enableContents];
        if (isChecked) {
            // Add the value if it doesn't exist
            if (!list.includes(value)) {
                list.push(value);
            }
        } else {
            // Remove the value if it exists
            const index = list.indexOf(value);
            if (index !== -1) {
                list.splice(index, 1);
            }
        }
        setAttributes({ enableContents: list });
    };

    return (
        <InspectorPanel
            advancedControlProps={{
                marginPrefix: WRAPPER_MARGIN,
                paddingPrefix: WRAPPER_PADDING,
                backgroundPrefix: WRAPPER_BG,
                borderPrefix: WRAPPER_BORDER_SHADOW,
                hasMargin: true,
            }}
        >
            <InspectorPanel.General>
                <InspectorPanel.PanelBody
                    title={__("General", "essential-blocks")}
                    initialOpen={true}
                >
                    <ResponsiveAlignControl
                        baseLabel={__("Alignment", "essential-blocks")}
                        controlName={META_ALIGNMENT}
                        options={TEXT_ALIGN}
                        resOption={resOption}
                    />

                    <ToggleGroupControl
                        label={__("Meta Display", "essential-blocks")}
                        value={metaDisplay}
                        onChange={(value) => setAttributes({ metaDisplay: value })}
                        isBlock
                        __next40pxDefaultSize
                        __nextHasNoMarginBottom
                    >
                        {META_DISPLAY.map((item, index) => (
                            <ToggleGroupControlOption key={index} value={item.value} label={item.label} />
                        ))}
                    </ToggleGroupControl>
                    <div className="eb-control-item-wrapper">
                        <PanelRow>
                            {__("Meta Items", "essential-blocks")}
                        </PanelRow>
                        <Select2
                            name="select-meta-items"
                            value={effectiveItems}
                            onChange={handleMetaItemsChange}
                            options={groupedOptions}
                            isMulti={true}
                            placeholder={__(
                                "Select meta items…",
                                "essential-blocks",
                            )}
                            getOptionValue={(option) => option.value}
                        />
                    </div>
                </InspectorPanel.PanelBody>
                <InspectorPanel.PanelBody
                    title={__("Meta Content", "essential-blocks")}
                    initialOpen={false}
                >
                    <ToggleControl
                        label={__("Show Meta Icon", "essential-blocks")}
                        checked={showMetaIcon}
                        onChange={() => {
                            setAttributes({
                                showMetaIcon: !showMetaIcon,
                            });
                        }}
                        __nextHasNoMarginBottom
                    />
                    {hasItem("author") && (
                        <>
                            <EBTextControl
                                label={__("Author Label")}
                                value={authorLabel}
                                onChange={(value) =>
                                    setAttributes({ authorLabel: value })
                                }
                            />

                            {showMetaIcon == true && (
                                <EBIconPicker
                                    value={authorIcon}
                                    attributeName={"authorIcon"}
                                />
                            )}

                            <ToggleControl
                                label={__("Show Author Picture", "essential-blocks")}
                                checked={showAuthorPicture}
                                onChange={() => {
                                    setAttributes({
                                        showAuthorPicture: !showAuthorPicture,
                                    });
                                }}
                                __nextHasNoMarginBottom
                            />

                            {showAuthorPicture && (
                                <ToggleControl
                                    label={__("Link Author Picture", "essential-blocks")}
                                    checked={authorPictureLink}
                                    onChange={() => {
                                        setAttributes({
                                            authorPictureLink: !authorPictureLink,
                                        });
                                    }}
                                    __nextHasNoMarginBottom
                                />
                            )}
                        </>
                    )}

                    {hasItem("date") && (
                        <>
                            <EBTextControl
                                label={__("Date Label")}
                                value={dateLabel}
                                onChange={(value) =>
                                    setAttributes({ dateLabel: value })
                                }
                            />
                            {showMetaIcon == true && (
                                <EBIconPicker
                                    value={dateIcon}
                                    attributeName={"dateIcon"}
                                />
                            )}
                        </>
                    )}
                    {"product" === type && hasItem("product_sku") && (
                        <>
                            <TextControl
                                label={__("Product SKU Label")}
                                value={productSkuLabel}
                                onChange={(value) =>
                                    setAttributes({ productSkuLabel: value })
                                }
                                __next40pxDefaultSize
                                __nextHasNoMarginBottom
                            />
                            {showMetaIcon == true && (
                                <EBIconPicker
                                    value={skuIcon}
                                    attributeName={"skuIcon"}
                                />
                            )}
                        </>
                    )}
                    {customMetaItems.map((item) => (
                        <div
                            key={`custom-meta-${item.value}`}
                            className="eb-control-item-wrapper"
                        >
                            <PanelRow>
                                <strong>
                                    {item.label || item.value}
                                </strong>
                            </PanelRow>
                            <EBTextControl
                                label={__("Label", "essential-blocks")}
                                value={item.customLabel || ""}
                                onChange={(value) =>
                                    updateMetaItem(item.value, {
                                        customLabel: value,
                                    })
                                }
                            />
                            {showMetaIcon == true && (
                                <EBIconPicker
                                    value={item.icon || ""}
                                    onChange={(value) =>
                                        updateMetaItem(item.value, {
                                            icon: value,
                                        })
                                    }
                                />
                            )}
                        </div>
                    ))}
                </InspectorPanel.PanelBody>
                {effectiveItems.length > 0 && (
                    <InspectorPanel.PanelBody
                        title={__("Sortable Content", "essential-blocks-pro")}
                        initialOpen={false}
                    >
                        <SortControl
                            items={effectiveItems}
                            labelKey="label"
                            onSortEnd={(reordered) =>
                                setAttributes({
                                    metaItems: JSON.stringify(reordered),
                                })
                            }
                            hasSettings={false}
                            hasAddButton={false}
                            hasDelete={false}
                        ></SortControl>
                    </InspectorPanel.PanelBody>
                )}
            </InspectorPanel.General>
            <InspectorPanel.Style>
                <InspectorPanel.PanelBody
                    title={__("General", "essential-blocks")}
                    initialOpen={true}
                >
                    <ResponsiveRangeController
                        noUnits
                        baseLabel={__("Label Gap", "essential-blocks")}
                        controlName={METAGAP}
                        min={0}
                        max={100}
                        step={1}
                    />
                </InspectorPanel.PanelBody>
                <InspectorPanel.PanelBody
                    title={__("Meta Label", "essential-blocks")}
                    initialOpen={true}
                >
                    <TypographyDropdown
                        baseLabel={__("Typography", "essential-blocks")}
                        typographyPrefixConstant={META_LABEL}
                    />
                    <ColorControl
                        label={__("Color", "essential-blocks")}
                        color={metaLabelColor}
                        attributeName={"metaLabelColor"}
                    />

                    {showMetaIcon == true && (
                        <>
                            <ColorControl
                                label={__("Icon Color", "essential-blocks")}
                                color={metaIconColor}
                                attributeName={"metaIconColor"}
                            />
                            <RangeControl
                                label={__("Icon Size", "essential-blocks")}
                                value={metaIconSize}
                                onChange={(metaIconSize) =>
                                    setAttributes({
                                        metaIconSize,
                                    })
                                }
                                min={0}
                                max={300}
                                step={1}
                                allowReset={true}
                                __nextHasNoMarginBottom
                                __next40pxDefaultSize
                            />
                        </>
                    )}
                </InspectorPanel.PanelBody>
                <InspectorPanel.PanelBody
                    title={__("Meta Value", "essential-blocks")}
                    initialOpen={true}
                >
                    <TypographyDropdown
                        baseLabel={__("Typography", "essential-blocks")}
                        typographyPrefixConstant={META_VALUE}
                    />
                    <ColorControl
                        label={__("Color", "essential-blocks")}
                        color={metaValueColor}
                        attributeName={"metaValueColor"}
                    />
                </InspectorPanel.PanelBody>
                {showAuthorPicture && (
                    <InspectorPanel.PanelBody
                        title={__("Author Picture", "essential-blocks")}
                        initialOpen={false}
                    >
                        <ResponsiveRangeController
                            noUnits
                            baseLabel={__("Size", "essential-blocks")}
                            controlName={AUTHOR_PICTURE_SIZE}
                            min={20}
                            max={200}
                            step={1}
                        />
                        <RangeControl
                            label={__("Border Radius", "essential-blocks")}
                            value={authorPictureBorderRadius}
                            onChange={(authorPictureBorderRadius) =>
                                setAttributes({
                                    authorPictureBorderRadius,
                                })
                            }
                            min={0}
                            max={100}
                            step={1}
                            allowReset={true}
                            __nextHasNoMarginBottom
                            __next40pxDefaultSize
                        />
                        <BorderShadowControl
                            controlName={AUTHOR_PICTURE_BORDER}
                            noShadow={true}
                        />
                    </InspectorPanel.PanelBody>
                )}
            </InspectorPanel.Style>
        </InspectorPanel>
    );
}
