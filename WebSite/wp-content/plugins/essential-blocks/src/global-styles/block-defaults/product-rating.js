/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
    PanelBody,
    SelectControl,
    ToggleControl,
    BaseControl,
    ButtonGroup,
    Button,
} from "@wordpress/components";

/**
 * Internal dependencies
 */
import {
    WRAPPER_BG,
    WRAPPER_MARGIN,
    WRAPPER_PADDING,
    WRAPPER_BORDER_SHADOW,
    RATING_SIZE,
    RATING_GAP,
    COUNT_GAP,
    STAR_TYPES,
} from "@essential-blocks/blocks/product-rating/src/constants/constants";

import {
    typoRating,
} from "@essential-blocks/blocks/product-rating/src/constants/typographyPrefixConstants";

import objAttributes from "@essential-blocks/blocks/product-rating/src/attributes";

import {
    ResponsiveDimensionsControl,
    ResponsiveRangeController,
    TypographyDropdown,
    DynamicInputControl,
    ColorControl,
    BackgroundControl,
    BorderShadowControl,
    useBlockDefaults,
    withBlockContext
} from "@essential-blocks/controls";

const DISPLAY_TYPES = [
    { label: __("Inline", "essential-blocks"), value: "inline" },
    { label: __("Block", "essential-blocks"), value: "block" },
];

const ALIGNMENT_OPTIONS = [
    { label: __("Left", "essential-blocks"), value: "flex-start" },
    { label: __("Center", "essential-blocks"), value: "center" },
    { label: __("Right", "essential-blocks"), value: "flex-end" },
];

const STARS_VARIATION = [
    { label: __("Outline", "essential-blocks"), value: "outline" },
    { label: __("Filled", "essential-blocks"), value: "filled" },
];

function ProductRating(props) {
    const { blockDefaults, setBlockDefaults, name, deviceType, handleBlockDefault } = props;

    const {
        ratingTextColor,
        ratingColor,
        ratedRatingColor,
        showReviewCount,
        showEmptyRating,
        editLink,
        ratingURL,
        singluarCaption,
        pluralCaption,
        emptyCaption,
        beforeCaption,
        afterCaption,
        displayType,
        alignment,
        starsType,
        starsVariation,
    } = blockDefaults;

    const isDefaultSet = useBlockDefaults(name, blockDefaults, setBlockDefaults, objAttributes)

    return (
        <>
            {isDefaultSet && (
                <div className="eb-panel-control">
                    <PanelBody
                        title={__("Settings", "essential-blocks")}
                        initialOpen={true}
                    >
                        <ToggleControl
                            label={__("Show Empty Rating", "essential-blocks")}
                            checked={showEmptyRating}
                            onChange={(showEmptyRating) =>
                                handleBlockDefault({ showEmptyRating })
                            }
                        />
                        <ToggleControl
                            label={__("Show Review Count", "essential-blocks")}
                            checked={showReviewCount}
                            onChange={(showReviewCount) =>
                                handleBlockDefault({ showReviewCount })
                            }
                        />
                        <ToggleControl
                            label={__("Edit Link", "essential-blocks")}
                            checked={editLink}
                            onChange={(editLink) =>
                                handleBlockDefault({ editLink })
                            }
                        />
                        {editLink && (
                            <DynamicInputControl
                                label={__("Rating URL", "essential-blocks")}
                                attrName="ratingURL"
                                inputValue={ratingURL}
                                setAttributes={handleBlockDefault}
                                onChange={(ratingURL) =>
                                    handleBlockDefault({ ratingURL })
                                }
                            />
                        )}
                        <SelectControl
                            label={__("Display Type", "essential-blocks")}
                            value={displayType}
                            options={DISPLAY_TYPES}
                            onChange={(displayType) =>
                                handleBlockDefault({ displayType })
                            }
                        />
                        <BaseControl label={__("Alignment", "essential-blocks")}>
                            <ButtonGroup>
                                {ALIGNMENT_OPTIONS.map((item, index) => (
                                    <Button
                                        key={index}
                                        isPrimary={alignment === item.value}
                                        isSecondary={alignment !== item.value}
                                        onClick={() =>
                                            handleBlockDefault({
                                                alignment: item.value,
                                            })
                                        }
                                    >
                                        {item.label}
                                    </Button>
                                ))}
                            </ButtonGroup>
                        </BaseControl>
                        <SelectControl
                            label={__("Stars Type", "essential-blocks")}
                            value={starsType}
                            options={STAR_TYPES}
                            onChange={(starsType) =>
                                handleBlockDefault({ starsType })
                            }
                        />
                        <SelectControl
                            label={__("Stars Variation", "essential-blocks")}
                            value={starsVariation}
                            options={STARS_VARIATION}
                            onChange={(starsVariation) =>
                                handleBlockDefault({ starsVariation })
                            }
                        />
                    </PanelBody>
                    <PanelBody
                        title={__("Caption Settings", "essential-blocks")}
                        initialOpen={false}
                    >
                        <DynamicInputControl
                            label={__("Singular Caption", "essential-blocks")}
                            attrName="singluarCaption"
                            inputValue={singluarCaption}
                            setAttributes={handleBlockDefault}
                            onChange={(singluarCaption) =>
                                handleBlockDefault({ singluarCaption })
                            }
                        />
                        <DynamicInputControl
                            label={__("Plural Caption", "essential-blocks")}
                            attrName="pluralCaption"
                            inputValue={pluralCaption}
                            setAttributes={handleBlockDefault}
                            onChange={(pluralCaption) =>
                                handleBlockDefault({ pluralCaption })
                            }
                        />
                        <DynamicInputControl
                            label={__("Empty Caption", "essential-blocks")}
                            attrName="emptyCaption"
                            inputValue={emptyCaption}
                            setAttributes={handleBlockDefault}
                            onChange={(emptyCaption) =>
                                handleBlockDefault({ emptyCaption })
                            }
                        />
                        <DynamicInputControl
                            label={__("Before Caption", "essential-blocks")}
                            attrName="beforeCaption"
                            inputValue={beforeCaption}
                            setAttributes={handleBlockDefault}
                            onChange={(beforeCaption) =>
                                handleBlockDefault({ beforeCaption })
                            }
                        />
                        <DynamicInputControl
                            label={__("After Caption", "essential-blocks")}
                            attrName="afterCaption"
                            inputValue={afterCaption}
                            setAttributes={handleBlockDefault}
                            onChange={(afterCaption) =>
                                handleBlockDefault({ afterCaption })
                            }
                        />
                    </PanelBody>
                    <PanelBody
                        title={__("Rating Styles", "essential-blocks")}
                        initialOpen={false}
                    >
                        <TypographyDropdown
                            baseLabel={__("Typography", "essential-blocks")}
                            typographyPrefixConstant={typoRating}
                        />
                        <ColorControl
                            label={__("Text Color", "essential-blocks")}
                            color={ratingTextColor}
                            onChange={(ratingTextColor) =>
                                handleBlockDefault({ ratingTextColor })
                            }
                        />
                        <ColorControl
                            label={__("Rating Color", "essential-blocks")}
                            color={ratingColor}
                            onChange={(ratingColor) =>
                                handleBlockDefault({ ratingColor })
                            }
                        />
                        <ColorControl
                            label={__("Rated Rating Color", "essential-blocks")}
                            color={ratedRatingColor}
                            onChange={(ratedRatingColor) =>
                                handleBlockDefault({ ratedRatingColor })
                            }
                        />
                        <ResponsiveRangeController
                            baseLabel={__("Rating Size", "essential-blocks")}
                            controlName={RATING_SIZE}
                            min={8}
                            max={100}
                            step={1}
                        />
                        <ResponsiveRangeController
                            baseLabel={__("Rating Gap", "essential-blocks")}
                            controlName={RATING_GAP}
                            min={0}
                            max={50}
                            step={1}
                        />
                        <ResponsiveRangeController
                            baseLabel={__("Count Gap", "essential-blocks")}
                            controlName={COUNT_GAP}
                            min={0}
                            max={50}
                            step={1}
                        />
                    </PanelBody>
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

export default withBlockContext(objAttributes)(ProductRating);
