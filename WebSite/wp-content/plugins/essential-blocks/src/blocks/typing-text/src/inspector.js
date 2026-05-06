/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
    Button,
    BaseControl,
    ToggleControl,
    RangeControl,
} from "@wordpress/components";

/**
 * Internal dependencies
 */
import SortableText from "./sortable-text";
import objAttributes from "./attributes";

import {
    TypographyDropdown,
    ColorControl,
    InspectorPanel,
    EBTextControl,
    ButtonGroupControl
} from "@essential-blocks/controls";

import {
    dimensionsMargin,
    dimensionsPadding,
} from "./constants/dimensionsNames";
import {
    typoPrefix_prefixText,
    typoPrefix_suffixText,
    typoPrefix_typedText,
} from "./constants/typographyPrefixConstants";
import { WrpBdShadow } from "./constants/borderShadowConstants";
import { backgroundWrapper } from "./constants/backgroundsConstants";
import { HEADING } from "./constants";

const Inspector = ({ attributes, setAttributes }) => {
    const {
        // responsive control attributes ⬇
        resOption,
        prefix,
        typedText,
        suffix,
        prefixColor,
        typedTextColor,
        suffixTextColor,
        typeSpeed,
        startDelay,
        smartBackspace,
        backSpeed,
        backDelay,
        fadeOut,
        fadeOutDelay,
        loop,
        showCursor,
        tagName
    } = attributes;

    return (
        <InspectorPanel advancedControlProps={{
            marginPrefix: dimensionsMargin,
            paddingPrefix: dimensionsPadding,
            backgroundPrefix: backgroundWrapper,
            borderPrefix: WrpBdShadow,
            hasMargin: true
        }}>
            <InspectorPanel.General>
                <InspectorPanel.PanelBody title={__("Content Settings", "essential-blocks")} initialOpen={true}>
                    <EBTextControl
                        label={__("Prefix Text", "essential-blocks")}
                        placeholder={__("Add prefix text", "essential-blocks")}
                        value={prefix}
                        onChange={(prefix) => setAttributes({ prefix })}
                        enableAi={true}
                    />

                    <BaseControl label={__("Typed Text", "essential-blocks")} __nextHasNoMarginBottom>
                        {typedText.length !== 0 && (
                            <SortableText
                                typedText={typedText}
                                setAttributes={setAttributes}
                            />
                        )}
                        <Button
                            className="is-default eb-typed-add-wrapper"
                            label={__("Add Typed Item", "essential-blocks")}
                            icon="plus-alt"
                            onClick={() => {
                                let updatedText = [
                                    ...typedText,
                                    {
                                        text: `Typed text ${typedText.length + 1}`,
                                    },
                                ];

                                setAttributes({ typedText: updatedText });
                            }}
                        >
                            <span className="eb-typed-add-button">
                                Add Typed Text
                            </span>
                        </Button>
                    </BaseControl>

                    <EBTextControl
                        label={__("Suffix Text", "essential-blocks")}
                        placeholder={__("Add suffix text", "essential-blocks")}
                        value={suffix}
                        onChange={(suffix) => setAttributes({ suffix })}
                        enableAi={true}
                    />

                    <BaseControl label={__("Tag", "essential-blocks")}
                        className="eb-advanced-heading-tag-group eb-html-tag-buttongroup"
                        __nextHasNoMarginBottom
                    >
                        <ButtonGroupControl
                            attrName={'tagName'}
                            options={HEADING}
                            currentValue={tagName}
                            onChange={(value) => setAttributes({ tagName: value })}
                        />
                    </BaseControl>

                    <ToggleControl
                        label={__("Loop", "essential-blocks")}
                        checked={loop}
                        onChange={() => setAttributes({ loop: !loop })}
                        __nextHasNoMarginBottom
                    />

                    {!fadeOut && (
                        <ToggleControl
                            label={__("Smart Backspace", "essential-blocks")}
                            checked={smartBackspace}
                            onChange={() =>
                                setAttributes({ smartBackspace: !smartBackspace })
                            }
                            __nextHasNoMarginBottom
                        />
                    )}

                    <ToggleControl
                        label={__("Show Cursor", "essential-blocks")}
                        checked={showCursor}
                        onChange={() =>
                            setAttributes({ showCursor: !showCursor })
                        }
                        __nextHasNoMarginBottom
                    />

                    <ToggleControl
                        label={__("Fade Out", "essential-blocks")}
                        checked={fadeOut}
                        onChange={() => setAttributes({ fadeOut: !fadeOut })}
                        __nextHasNoMarginBottom
                    />

                    <RangeControl
                        label={__("Type Speed", "essential-blocks")}
                        value={typeSpeed}
                        onChange={(typeSpeed) => setAttributes({ typeSpeed })}
                        min={0}
                        max={5000}
                        __nextHasNoMarginBottom
                        __next40pxDefaultSize
                    />

                    <RangeControl
                        label={__("Start Delay", "essential-blocks")}
                        value={startDelay}
                        onChange={(startDelay) => setAttributes({ startDelay })}
                        min={0}
                        max={1000}
                        __nextHasNoMarginBottom
                        __next40pxDefaultSize
                    />

                    {!fadeOut && (
                        <RangeControl
                            label={__("Back Speed", "essential-blocks")}
                            value={backSpeed}
                            onChange={(backSpeed) => setAttributes({ backSpeed })}
                            min={0}
                            max={5000}
                            __nextHasNoMarginBottom
                            __next40pxDefaultSize
                        />
                    )}

                    {!fadeOut && (
                        <RangeControl
                            label={__("Back Delay", "essential-blocks")}
                            value={backDelay}
                            onChange={(backDelay) => setAttributes({ backDelay })}
                            min={0}
                            max={10000}
                            __nextHasNoMarginBottom
                            __next40pxDefaultSize
                        />
                    )}

                    {fadeOut && (
                        <RangeControl
                            label={__("Fade Delay", "essential-blocks")}
                            value={fadeOutDelay}
                            onChange={(fadeOutDelay) =>
                                setAttributes({ fadeOutDelay })
                            }
                            min={0}
                            max={5000}
                            __nextHasNoMarginBottom
                            __next40pxDefaultSize
                        />
                    )}
                </InspectorPanel.PanelBody>
            </InspectorPanel.General>
            <InspectorPanel.Style>
                <>
                    {prefix && (
                        <InspectorPanel.PanelBody
                            title={__("Prefix", "essential-blocks")}
                            initialOpen={true}
                        >
                            <ColorControl
                                label={__("Prefix Color", "essential-blocks")}
                                color={prefixColor}
                                attributeName={'prefixColor'}
                            />

                            <TypographyDropdown
                                baseLabel={__("Typography", "essential-blocks")}
                                typographyPrefixConstant={typoPrefix_prefixText}
                            />
                        </InspectorPanel.PanelBody>
                    )}

                    {typedText.length > 0 && (
                        <InspectorPanel.PanelBody
                            title={__("Typed Text", "essential-blocks")}
                            initialOpen={true}
                        >
                            <ColorControl
                                label={__("Typed Text Color", "essential-blocks")}
                                color={typedTextColor}
                                attributeName={'typedTextColor'}
                            />

                            <TypographyDropdown
                                baseLabel={__("Typography", "essential-blocks")}
                                typographyPrefixConstant={typoPrefix_typedText}
                            />
                        </InspectorPanel.PanelBody>
                    )}

                    {suffix && (
                        <InspectorPanel.PanelBody
                            title={__("Suffix", "essential-blocks")}
                            initialOpen={false}
                        >
                            <ColorControl
                                label={__("Suffix Color", "essential-blocks")}
                                color={suffixTextColor}
                                attributeName={'suffixTextColor'}
                            />

                            <TypographyDropdown
                                baseLabel={__("Typography", "essential-blocks")}
                                typographyPrefixConstant={typoPrefix_suffixText}
                            />
                        </InspectorPanel.PanelBody>
                    )}
                </>
            </InspectorPanel.Style>
        </InspectorPanel>
    );
};

export default Inspector;
