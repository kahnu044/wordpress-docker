/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
    ToggleControl,
    TextControl,
    Button,
    ButtonGroup,
    BaseControl,
    RangeControl,
} from "@wordpress/components";

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
    const { attributes, setAttributes } = props;
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
    } = attributes;

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

                    <BaseControl label={__("Meta Display", "essential-blocks")}>
                        <ButtonGroup>
                            {META_DISPLAY.map((item, index) => (
                                <Button
                                    key={index}
                                    // isLarge
                                    isPrimary={metaDisplay === item.value}
                                    isSecondary={metaDisplay !== item.value}
                                    onClick={() =>
                                        setAttributes({
                                            metaDisplay: item.value,
                                        })
                                    }
                                >
                                    {item.label}
                                </Button>
                            ))}
                        </ButtonGroup>
                    </BaseControl>
                    <ToggleControl
                        label={__("Author", "essential-blocks")}
                        checked={showAuthor}
                        onChange={() => {
                            setAttributes({
                                showAuthor: !showAuthor,
                            });
                            toggleContent("author", !showAuthor);
                        }}
                    />
                    <ToggleControl
                        label={__("Published Date", "essential-blocks")}
                        checked={showDate}
                        onChange={() => {
                            setAttributes({
                                showDate: !showDate,
                            });
                            toggleContent("date", !showDate);
                        }}
                    />

                    {"product" === type && (
                        <ToggleControl
                            label={__("Product SKU", "essential-blocks")}
                            checked={showProductSku}
                            onChange={() => {
                                setAttributes({
                                    showProductSku: !showProductSku,
                                });
                                toggleContent("product_sku", !showProductSku);
                            }}
                        />
                    )}
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
                    />
                    {showAuthor && (
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
                                />
                            )}
                        </>
                    )}

                    {showDate && (
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
                    {"product" === type && showProductSku && (
                        <>
                            <TextControl
                                label={__("Product SKU Label")}
                                value={productSkuLabel}
                                onChange={(value) =>
                                    setAttributes({ productSkuLabel: value })
                                }
                            />
                            {showMetaIcon == true && (
                                <EBIconPicker
                                    value={skuIcon}
                                    attributeName={"skuIcon"}
                                />
                            )}
                        </>
                    )}
                </InspectorPanel.PanelBody>
                <InspectorPanel.PanelBody
                    title={__("Sortable Content", "essential-blocks-pro")}
                    initialOpen={false}
                >
                    <SortControl
                        items={enableContents}
                        labelKey=""
                        onSortEnd={(enableContents) =>
                            setAttributes({ enableContents })
                        }
                        hasSettings={false}
                        hasAddButton={false}
                        hasDelete={false}
                    ></SortControl>
                </InspectorPanel.PanelBody>
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
