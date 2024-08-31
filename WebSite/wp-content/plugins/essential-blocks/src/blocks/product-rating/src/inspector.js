/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
    ToggleControl,
    BaseControl,
    ButtonGroup,
    Button,
    SelectControl,
    PanelRow,
} from "@wordpress/components";

/**
 * Internal depencencies
 */
import {
    WRAPPER_BG,
    WRAPPER_MARGIN,
    WRAPPER_PADDING,
    WRAPPER_BORDER_SHADOW,
    RATING_SIZE,
    RATING_GAP,
    COUNT_GAP,
    DISPLAY_TYPES,
    ALIGNMENT,
    STAR_TYPES,
    STARS_VARIATION
} from "./constants/constants";
import {
    typoRating,
} from "./constants/typographyPrefixConstants";
import {
    ResponsiveRangeController,
    TypographyDropdown,
    ColorControl,
    InspectorPanel,
    DynamicInputControl
} from "@essential-blocks/controls";

import objAttributes from "./attributes";

function Inspector(props) {
    const { attributes, setAttributes } = props;
    const {
        resOption,
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
        starsVariation
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
                        label={__("Show Empty Rating")}
                        checked={showEmptyRating}
                        onChange={() => {
                            setAttributes({
                                showEmptyRating: !showEmptyRating,
                            });
                        }}
                    />
                    <ToggleControl
                        label={__("Show Review Count")}
                        checked={showReviewCount}
                        onChange={() => {
                            setAttributes({
                                showReviewCount: !showReviewCount,
                            });
                        }}
                    />
                    <ToggleControl
                        label={__("Edit Link")}
                        checked={editLink}
                        onChange={() => {
                            setAttributes({
                                editLink: !editLink,
                            });
                        }}
                    />
                    {editLink && (
                        <>
                            {/* <DynamicInputControl
                                label="URL"
                                attrName="ratingURL"
                                inputValue={ratingURL}
                                setAttributes={setAttributes}
                                onChange={(text) => setAttributes({ ratingURL: text })}
                            /> */}
                            <DynamicInputControl
                                label="Singluar Caption"
                                attrName="singluarCaption"
                                inputValue={singluarCaption}
                                setAttributes={setAttributes}
                                onChange={(text) => setAttributes({ singluarCaption: text })}
                            />
                            <DynamicInputControl
                                label="Plural Caption"
                                attrName="pluralCaption"
                                inputValue={pluralCaption}
                                setAttributes={setAttributes}
                                onChange={(text) => setAttributes({ pluralCaption: text })}
                            />
                            <DynamicInputControl
                                label="Before Caption"
                                attrName="beforeCaption"
                                inputValue={beforeCaption}
                                setAttributes={setAttributes}
                                onChange={(text) => setAttributes({ beforeCaption: text })}
                            />
                            <DynamicInputControl
                                label="After Caption"
                                attrName="afterCaption"
                                inputValue={afterCaption}
                                setAttributes={setAttributes}
                                onChange={(text) => setAttributes({ afterCaption: text })}
                            />

                            {showEmptyRating && (
                                <DynamicInputControl
                                    label="Empty Caption"
                                    attrName="emptyCaption"
                                    inputValue={emptyCaption}
                                    setAttributes={setAttributes}
                                    onChange={(text) => setAttributes({ emptyCaption: text })}
                                />
                            )}
                        </>
                    )}
                </InspectorPanel.PanelBody>
            </InspectorPanel.General>
            <InspectorPanel.Style>
                <InspectorPanel.PanelBody title={__("Styles", "essential-blocks")} initialOpen={true}>
                    <SelectControl
                        label={__("Stars Type", "essential-blocks")}
                        value={starsVariation}
                        options={STARS_VARIATION}
                        onChange={(starsVariation) => setAttributes({ starsVariation })}
                    />
                    <SelectControl
                        label={__("Display Type", "essential-blocks")}
                        value={displayType}
                        options={DISPLAY_TYPES}
                        onChange={(displayType) => setAttributes({ displayType })}
                    />
                    <BaseControl>
                        <h3 className="eb-control-title">{__("Alignment", "essential-blocks")}</h3>
                        <ButtonGroup>
                            {ALIGNMENT.map((item, index) => (
                                <Button
                                    key={index}
                                    isPrimary={alignment === item.value}
                                    isSecondary={alignment !== item.value}
                                    onClick={() =>
                                        setAttributes({
                                            alignment: item.value,
                                        })
                                    }
                                >
                                    {item.label}
                                </Button>
                            ))}
                        </ButtonGroup>
                    </BaseControl>

                    {showReviewCount && (
                        <>
                            <PanelRow>{__("Reviews Link", "essential-blocks")}</PanelRow>

                            <ColorControl
                                label={__("Text Color", "essential-blocks")}
                                color={ratingTextColor}
                                attributeName={'ratingTextColor'}
                            />
                            <TypographyDropdown
                                baseLabel={__("Typography", "essential-blocks")}
                                typographyPrefixConstant={typoRating}
                            />
                            <ResponsiveRangeController
                                baseLabel={__(
                                    "Count Gap",
                                    "essential-blocks"
                                )}
                                controlName={
                                    COUNT_GAP
                                }
                                min={1}
                                max={100}
                                step={1}
                            />
                        </>
                    )}

                    <PanelRow>{__("Stars", "essential-blocks")}</PanelRow>

                    <BaseControl>
                        <ButtonGroup>
                            {STAR_TYPES.map(
                                (
                                    { label, value },
                                    index
                                ) => (
                                    <Button
                                        key={index}
                                        isSecondary={
                                            starsType !== value
                                        }
                                        isPrimary={
                                            starsType === value
                                        }
                                        onClick={() =>
                                            setAttributes({
                                                starsType: value,
                                            })
                                        }
                                    >
                                        {label}
                                    </Button>
                                )
                            )}
                        </ButtonGroup>
                    </BaseControl>

                    {starsType === 'all' && (
                        <ColorControl
                            label={__("Stars Color", "essential-blocks")}
                            color={ratingColor}
                            attributeName={'ratingColor'}
                        />
                    )}
                    {starsType === 'rated' && (
                        <ColorControl
                            label={__("Stars Color", "essential-blocks")}
                            color={ratedRatingColor}
                            attributeName={'ratedRatingColor'}
                        />
                    )}

                    <ResponsiveRangeController
                        baseLabel={__(
                            "Stars Size",
                            "essential-blocks"
                        )}
                        controlName={
                            RATING_SIZE
                        }
                        min={5}
                        max={200}
                        step={1}
                    />
                    <ResponsiveRangeController
                        baseLabel={__(
                            "Stars Gap",
                            "essential-blocks"
                        )}
                        controlName={
                            RATING_GAP
                        }
                        min={0}
                        max={100}
                        step={1}
                    />

                </InspectorPanel.PanelBody>
            </InspectorPanel.Style>
        </InspectorPanel>
    );
}

export default Inspector;
