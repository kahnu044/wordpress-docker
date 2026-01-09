/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
    PanelBody,
    ToggleControl,
    BaseControl,
    ButtonGroup,
    Button,
    RangeControl,
} from "@wordpress/components";

/**
 * Internal dependencies
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
} from "@essential-blocks/blocks/post-meta/src/constants/constants";

import {
    META_LABEL,
    META_VALUE,
} from "@essential-blocks/blocks/post-meta/src/constants/typographyPrefixConstants";

import objAttributes from "@essential-blocks/blocks/post-meta/src/attributes";

import {
    ResponsiveDimensionsControl,
    ResponsiveRangeController,
    ResponsiveAlignControl,
    TypographyDropdown,
    ColorControl,
    BackgroundControl,
    BorderShadowControl,
    EBIconPicker,
    EBTextControl,
    useBlockDefaults,
    withBlockContext
} from "@essential-blocks/controls";

function PostMeta(props) {
    const { blockDefaults, setBlockDefaults, name, deviceType, handleBlockDefault } = props;

    const {
        metaDisplay,
        showAuthor,
        showDate,
        showProductSku,
        authorLabel,
        dateLabel,
        productSkuLabel,
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
        enableContents,
    } = blockDefaults;

    const toggleContent = (value, isChecked) => {
        let list = [...(enableContents || [])];
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
        handleBlockDefault({ enableContents: list });
    };

    const isDefaultSet = useBlockDefaults(name, blockDefaults, setBlockDefaults, objAttributes)

    return (
        <>
            {isDefaultSet && (
                <div className="eb-panel-control">
                    <PanelBody
                        title={__("General", "essential-blocks")}
                        initialOpen={true}
                    >
                        <ResponsiveAlignControl
                            baseLabel={__("Alignment", "essential-blocks")}
                            controlName={META_ALIGNMENT}
                            options={TEXT_ALIGN}
                        />
                        <BaseControl label={__("Display", "essential-blocks")}>
                            <ButtonGroup>
                                {META_DISPLAY.map((item, index) => (
                                    <Button
                                        key={index}
                                        isPrimary={metaDisplay === item.value}
                                        isSecondary={metaDisplay !== item.value}
                                        onClick={() =>
                                            handleBlockDefault({
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
                            label={__("Show Meta Icon", "essential-blocks")}
                            checked={showMetaIcon}
                            onChange={(showMetaIcon) =>
                                handleBlockDefault({ showMetaIcon })
                            }
                        />
                        {showMetaIcon && (
                            <>
                                <ColorControl
                                    label={__("Icon Color", "essential-blocks")}
                                    color={metaIconColor}
                                    onChange={(metaIconColor) =>
                                        handleBlockDefault({ metaIconColor })
                                    }
                                />
                                <RangeControl
                                    label={__("Icon Size", "essential-blocks")}
                                    value={metaIconSize}
                                    onChange={(metaIconSize) =>
                                        handleBlockDefault({ metaIconSize })
                                    }
                                    min={8}
                                    max={100}
                                    step={1}
                                    allowReset={true}
                                />
                            </>
                        )}
                    </PanelBody>
                    <PanelBody
                        title={__("Content Settings", "essential-blocks")}
                        initialOpen={false}
                    >
                        <ToggleControl
                            label={__("Show Author", "essential-blocks")}
                            checked={enableContents?.includes("author")}
                            onChange={(isChecked) => toggleContent("author", isChecked)}
                        />
                        {enableContents?.includes("author") && (
                            <>
                                <EBTextControl
                                    label={__("Author Label", "essential-blocks")}
                                    value={authorLabel}
                                    onChange={(authorLabel) =>
                                        handleBlockDefault({ authorLabel })
                                    }
                                />
                                {showMetaIcon && (
                                    <EBIconPicker
                                        value={authorIcon}
                                        onChange={(authorIcon) =>
                                            handleBlockDefault({ authorIcon })
                                        }
                                        title={__("Select Author Icon", "essential-blocks")}
                                    />
                                )}
                                <ToggleControl
                                    label={__("Show Author Picture", "essential-blocks")}
                                    checked={showAuthorPicture}
                                    onChange={(showAuthorPicture) =>
                                        handleBlockDefault({ showAuthorPicture })
                                    }
                                />
                                {showAuthorPicture && (
                                    <>
                                        <ToggleControl
                                            label={__("Author Picture Link", "essential-blocks")}
                                            checked={authorPictureLink}
                                            onChange={(authorPictureLink) =>
                                                handleBlockDefault({ authorPictureLink })
                                            }
                                        />
                                        <RangeControl
                                            label={__("Border Radius", "essential-blocks")}
                                            value={authorPictureBorderRadius}
                                            onChange={(authorPictureBorderRadius) =>
                                                handleBlockDefault({ authorPictureBorderRadius })
                                            }
                                            min={0}
                                            max={100}
                                            step={1}
                                            allowReset={true}
                                        />
                                    </>
                                )}
                            </>
                        )}
                        <ToggleControl
                            label={__("Show Date", "essential-blocks")}
                            checked={enableContents?.includes("date")}
                            onChange={(isChecked) => toggleContent("date", isChecked)}
                        />
                        {enableContents?.includes("date") && (
                            <>
                                <EBTextControl
                                    label={__("Date Label", "essential-blocks")}
                                    value={dateLabel}
                                    onChange={(dateLabel) =>
                                        handleBlockDefault({ dateLabel })
                                    }
                                />
                                {showMetaIcon && (
                                    <EBIconPicker
                                        value={dateIcon}
                                        onChange={(dateIcon) =>
                                            handleBlockDefault({ dateIcon })
                                        }
                                        title={__("Select Date Icon", "essential-blocks")}
                                    />
                                )}
                            </>
                        )}
                        <ToggleControl
                            label={__("Show Product SKU", "essential-blocks")}
                            checked={enableContents?.includes("product_sku")}
                            onChange={(isChecked) => toggleContent("product_sku", isChecked)}
                        />
                        {enableContents?.includes("product_sku") && (
                            <>
                                <EBTextControl
                                    label={__("Product SKU Label", "essential-blocks")}
                                    value={productSkuLabel}
                                    onChange={(productSkuLabel) =>
                                        handleBlockDefault({ productSkuLabel })
                                    }
                                />
                                {showMetaIcon && (
                                    <EBIconPicker
                                        value={skuIcon}
                                        onChange={(skuIcon) =>
                                            handleBlockDefault({ skuIcon })
                                        }
                                        title={__("Select SKU Icon", "essential-blocks")}
                                    />
                                )}
                            </>
                        )}
                    </PanelBody>
                    <PanelBody
                        title={__("General Styles", "essential-blocks")}
                        initialOpen={false}
                    >
                        <ResponsiveRangeController
                            baseLabel={__("Label Gap", "essential-blocks")}
                            controlName={METAGAP}
                            min={0}
                            max={100}
                            step={1}
                        />
                    </PanelBody>
                    <PanelBody
                        title={__("Meta Label", "essential-blocks")}
                        initialOpen={false}
                    >
                        <TypographyDropdown
                            baseLabel={__("Typography", "essential-blocks")}
                            typographyPrefixConstant={META_LABEL}
                        />
                        <ColorControl
                            label={__("Color", "essential-blocks")}
                            color={metaLabelColor}
                            onChange={(metaLabelColor) =>
                                handleBlockDefault({ metaLabelColor })
                            }
                        />
                    </PanelBody>
                    <PanelBody
                        title={__("Meta Value", "essential-blocks")}
                        initialOpen={false}
                    >
                        <TypographyDropdown
                            baseLabel={__("Typography", "essential-blocks")}
                            typographyPrefixConstant={META_VALUE}
                        />
                        <ColorControl
                            label={__("Color", "essential-blocks")}
                            color={metaValueColor}
                            onChange={(metaValueColor) =>
                                handleBlockDefault({ metaValueColor })
                            }
                        />
                    </PanelBody>
                    {showAuthorPicture && (
                        <PanelBody
                            title={__("Author Picture", "essential-blocks")}
                            initialOpen={false}
                        >
                            <ResponsiveRangeController
                                baseLabel={__("Size", "essential-blocks")}
                                controlName={AUTHOR_PICTURE_SIZE}
                                min={20}
                                max={200}
                                step={1}
                            />
                            <BorderShadowControl
                                controlName={AUTHOR_PICTURE_BORDER}
                            />
                        </PanelBody>
                    )}
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
                            controlName={WRAPPER_BG}
                        />
                    </PanelBody>
                    <PanelBody
                        title={__("Border & Shadow", "essential-blocks")}
                        initialOpen={false}
                    >
                        <BorderShadowControl
                            controlName={WRAPPER_BORDER_SHADOW}
                        />
                    </PanelBody>
                </div>
            )}
        </>
    );
}

export default withBlockContext(objAttributes)(PostMeta);
