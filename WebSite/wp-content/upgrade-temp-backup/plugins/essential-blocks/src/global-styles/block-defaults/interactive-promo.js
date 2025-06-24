/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { PanelBody, Button, ButtonGroup, BaseControl, ToggleControl } from "@wordpress/components";

/**
 * External depencencies
 */

import {
    ColorControl,
    ResponsiveRangeController,
    TypographyDropdown,
    ResponsiveDimensionsControl,
    BorderShadowControl,
    GradientColorControl,
    useBlockDefaults,
    withBlockContext
} from "@essential-blocks/controls";

/**
 * Internal depencencies
 */
import {
    ALIGNMENT,
    imageHeight,
    imageWidth,
    wrapperMargin,
    wrapperPadding,
    imageBorderShadow,
} from "@essential-blocks/blocks/interactive-promo/src/constants";

import {
    typoPrefix_header,
    typoPrefix_content,
} from "@essential-blocks/blocks/interactive-promo/src/constants/typographyPrefixConstants";

import objAttributes from "@essential-blocks/blocks/interactive-promo/src/attributes";

function InteractivePromo(props) {
    const { blockDefaults, setBlockDefaults, name, deviceType, handleBlockDefault } = props;
    const {
        headerColor,
        contentColor,
        imageAlignment,
        isBackgroundGradient,
        backgroundColor,
        backgroundGradient,
    } = blockDefaults;
    const isDefaultSet = useBlockDefaults(name, blockDefaults, setBlockDefaults, objAttributes)

    return (
        <>
            {isDefaultSet && (
                <div className="eb-panel-control">
                    <PanelBody title={__("General ", "essential-blocks")} initialOpen={true}>
                        <ResponsiveRangeController
                            baseLabel={__("Height", "essential-blocks")}
                            controlName={imageHeight}
                            min={200}
                            max={1000}
                            step={1}
                            noUnits
                        />
                        <ResponsiveRangeController
                            baseLabel={__("Width", "essential-blocks")}
                            controlName={imageWidth}
                            min={0}
                            max={1000}
                            step={1}
                            noUnits
                        />

                        <BaseControl>
                            <h3 className="eb-control-title">{__("Alignment", "essential-blocks")}</h3>
                            <ButtonGroup>
                                {ALIGNMENT.map((item, index) => (
                                    <Button
                                        key={index}
                                        isPrimary={imageAlignment === item.value}
                                        isSecondary={imageAlignment !== item.value}
                                        onClick={() =>
                                            handleBlockDefault({
                                                imageAlignment: item.value,
                                            })
                                        }
                                    >
                                        {item.label}
                                    </Button>
                                ))}
                            </ButtonGroup>
                        </BaseControl>
                    </PanelBody>
                    {/* Styles */}
                    <PanelBody title={__("General Styles", "essential-blocks")} initialOpen={false}>
                        <BaseControl>
                            <h3 className="eb-control-title">{__("Background Color", "essential-blocks")}</h3>
                        </BaseControl>
                        <ToggleControl
                            label={__("Show Gradient Color", "essential-blocks")}
                            checked={isBackgroundGradient}
                            onChange={() => {
                                handleBlockDefault({
                                    isBackgroundGradient: !isBackgroundGradient,
                                });
                            }}
                        />
                        {isBackgroundGradient || (
                            <ColorControl
                                label={__("Color", "essential-blocks")}
                                color={backgroundColor}
                                onChange={(backgroundColor) => handleBlockDefault({ backgroundColor })}
                            />
                        )}
                        {isBackgroundGradient && (
                            <>
                                <GradientColorControl
                                    label={__("Gradient Color", "essential-blocks")}
                                    gradientColor={backgroundGradient}
                                    onChange={(backgroundGradient) =>
                                        handleBlockDefault({
                                            backgroundGradient,
                                        })
                                    }
                                />
                            </>
                        )}
                    </PanelBody>
                    <PanelBody title={__("Header Styles", "essential-blocks")} initialOpen={false}>
                        <>
                            <TypographyDropdown
                                baseLabel={__("Typography", "essential-blocks")}
                                typographyPrefixConstant={typoPrefix_header}
                            />
                            <ColorControl
                                label={__("Color", "essential-blocks")}
                                color={headerColor}
                                onChange={(headerColor) => handleBlockDefault({ headerColor })}
                            />
                        </>
                    </PanelBody>
                    <PanelBody title={__("Content Styles", "essential-blocks")} initialOpen={false}>
                        <>
                            <TypographyDropdown
                                baseLabel={__("Typography", "essential-blocks")}
                                typographyPrefixConstant={typoPrefix_content}
                            />
                            <ColorControl
                                label={__("Color", "essential-blocks")}
                                color={contentColor}
                                onChange={(contentColor) => handleBlockDefault({ contentColor })}
                            />
                        </>
                    </PanelBody>
                    {/* Advanced */}

                    <PanelBody title={__("Wrapper Margin & Padding", "essential-blocks")} initialOpen={false}>
                        <ResponsiveDimensionsControl
                            controlName={wrapperMargin}
                            baseLabel={__("Margin", "essential-blocks")}
                        />
                        <ResponsiveDimensionsControl
                            controlName={wrapperPadding}
                            baseLabel={__("Padding", "essential-blocks")}
                        />
                    </PanelBody>
                    <PanelBody title={__("Wrapper Border & Shadow", "essential-blocks")} initialOpen={false}>
                        <BorderShadowControl controlName={imageBorderShadow} />
                    </PanelBody>
                </div>
            )}
        </>
    );
}

export default withBlockContext(objAttributes)(InteractivePromo);
