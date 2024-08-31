/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { PanelBody, ToggleControl, RangeControl, TextControl } from "@wordpress/components";
/**
 * Internal dependencies
 */
import objAttributes from "@essential-blocks/blocks/typing-text/src/attributes";
import { dimensionsMargin, dimensionsPadding } from "@essential-blocks/blocks/typing-text/src/constants/dimensionsNames";
import {
    typoPrefix_prefixText,
    typoPrefix_suffixText,
    typoPrefix_typedText,
} from "@essential-blocks/blocks/typing-text/src/constants/typographyPrefixConstants";
import { WrpBdShadow } from "@essential-blocks/blocks/typing-text/src/constants/borderShadowConstants";
import { backgroundWrapper } from "@essential-blocks/blocks/typing-text/src/constants/backgroundsConstants";

import {
    ResponsiveDimensionsControl,
    TypographyDropdown,
    ColorControl,
    BorderShadowControl,
    BackgroundControl,
    AdvancedControls,
    useBlockDefaults,
    withBlockContext
} from "@essential-blocks/controls";

function TypingText(props) {
    const { blockDefaults, setBlockDefaults, name, deviceType, handleBlockDefault } = props;

    const {
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
    } = blockDefaults;
    const isDefaultSet = useBlockDefaults(name, blockDefaults, setBlockDefaults, objAttributes)

    return (
        <>
            {isDefaultSet && (
                <div className="eb-panel-control">
                    <PanelBody title={__("Content Settings", "essential-blocks")}>
                        <TextControl
                            label={__("Prefix Text", "essential-blocks")}
                            placeholder={__("Add prefix text", "essential-blocks")}
                            value={prefix}
                            onChange={(prefix) => handleBlockDefault({ prefix })}
                        />
                        <TextControl
                            label={__("Suffix Text", "essential-blocks")}
                            placeholder={__("Add suffix text", "essential-blocks")}
                            value={suffix}
                            onChange={(suffix) => handleBlockDefault({ suffix })}
                        />

                        <ToggleControl
                            label={__("Loop", "essential-blocks")}
                            checked={loop}
                            onChange={() => handleBlockDefault({ loop: !loop })}
                        />

                        {!fadeOut && (
                            <ToggleControl
                                label={__("Smart Backspace", "essential-blocks")}
                                checked={smartBackspace}
                                onChange={() =>
                                    handleBlockDefault({
                                        smartBackspace: !smartBackspace,
                                    })
                                }
                            />
                        )}

                        <ToggleControl
                            label={__("Show Cursor", "essential-blocks")}
                            checked={showCursor}
                            onChange={() => handleBlockDefault({ showCursor: !showCursor })}
                        />

                        <ToggleControl
                            label={__("Fade Out", "essential-blocks")}
                            checked={fadeOut}
                            onChange={() => handleBlockDefault({ fadeOut: !fadeOut })}
                        />

                        <RangeControl
                            label={__("Type Speed", "essential-blocks")}
                            value={typeSpeed}
                            onChange={(typeSpeed) => handleBlockDefault({ typeSpeed })}
                            min={0}
                            max={5000}
                        />

                        <RangeControl
                            label={__("Start Delay", "essential-blocks")}
                            value={startDelay}
                            onChange={(startDelay) => handleBlockDefault({ startDelay })}
                            min={0}
                            max={1000}
                        />

                        {!fadeOut && (
                            <RangeControl
                                label={__("Back Speed", "essential-blocks")}
                                value={backSpeed}
                                onChange={(backSpeed) => handleBlockDefault({ backSpeed })}
                                min={0}
                                max={5000}
                            />
                        )}

                        {!fadeOut && (
                            <RangeControl
                                label={__("Back Delay", "essential-blocks")}
                                value={backDelay}
                                onChange={(backDelay) => handleBlockDefault({ backDelay })}
                                min={0}
                                max={10000}
                            />
                        )}

                        {fadeOut && (
                            <RangeControl
                                label={__("Fade Delay", "essential-blocks")}
                                value={fadeOutDelay}
                                onChange={(fadeOutDelay) => handleBlockDefault({ fadeOutDelay })}
                                min={0}
                                max={5000}
                            />
                        )}
                    </PanelBody>
                    {prefix && (
                        <PanelBody title={__("Prefix Style", "essential-blocks")} initialOpen={false}>
                            <ColorControl
                                label={__("Prefix Color", "essential-blocks")}
                                color={prefixColor}
                                onChange={(prefixColor) => handleBlockDefault({ prefixColor })}
                            />

                            <TypographyDropdown
                                baseLabel={__("Typography", "essential-blocks")}
                                typographyPrefixConstant={typoPrefix_prefixText}
                            />
                        </PanelBody>
                    )}

                    {typedText.length > 0 && (
                        <PanelBody title={__("Typed Text Style", "essential-blocks")} initialOpen={false}>
                            <ColorControl
                                label={__("Typed Text Color", "essential-blocks")}
                                color={typedTextColor}
                                onChange={(typedTextColor) => handleBlockDefault({ typedTextColor })}
                            />

                            <TypographyDropdown
                                baseLabel={__("Typography", "essential-blocks")}
                                typographyPrefixConstant={typoPrefix_typedText}
                            />
                        </PanelBody>
                    )}

                    {suffix && (
                        <PanelBody title={__("Suffix Style", "essential-blocks")} initialOpen={false}>
                            <ColorControl
                                label={__("Suffix Color", "essential-blocks")}
                                color={suffixTextColor}
                                onChange={(suffixTextColor) => handleBlockDefault({ suffixTextColor })}
                            />

                            <TypographyDropdown
                                baseLabel={__("Typography", "essential-blocks")}
                                typographyPrefixConstant={typoPrefix_suffixText}
                            />
                        </PanelBody>
                    )}
                    <PanelBody title={__("Wrapper Margin & Padding", "essential-blocks")} initialOpen={false}>
                        <ResponsiveDimensionsControl
                            className="forWrapperMargin"
                            controlName={dimensionsMargin}
                            baseLabel="Margin"
                        />
                        <ResponsiveDimensionsControl
                            className="forWrapperPadding"
                            controlName={dimensionsPadding}
                            baseLabel="Padding"
                        />
                    </PanelBody>
                    <PanelBody title={__("Wrapper Border & Shadow", "essential-blocks")} initialOpen={false}>
                        <BorderShadowControl controlName={WrpBdShadow} />
                    </PanelBody>
                    <PanelBody title={__("Wrapper Background", "essential-blocks")} initialOpen={false}>
                        <BackgroundControl
                            controlName={backgroundWrapper}
                            noOverlay={true}
                            noMainBgi={true}
                        />
                    </PanelBody>
                </div>
            )}
        </>
    );
}

export default withBlockContext(objAttributes)(TypingText);
