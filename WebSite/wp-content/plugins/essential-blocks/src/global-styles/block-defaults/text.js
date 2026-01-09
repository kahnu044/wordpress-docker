/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
    PanelBody,
    SelectControl,
    Button,
    ButtonGroup,
    BaseControl,
    RangeControl,
} from "@wordpress/components";

/**
 * Internal dependencies
 */
import {
    WRAPPER_BG,
    WRAPPER_MARGIN,
    WRAPPER_PADDING,
    WRAPPER_BORDER_SHADOW,
    TEXT_ALIGN,
    HEADING,
    SOURCE,
    COLUMNCOUNT,
    COLUMNGAP,
    COLUMNWIDTH,
    COLUMNRULEWIDTH,
    COLUMNRULESTYLE,
    TEXT_MARGIN,
    TEXT_PADDING,
} from "@essential-blocks/blocks/text/src/constants/constants";

import { TEXT_TYPOGRAPHY } from "@essential-blocks/blocks/text/src/constants/typographyPrefixConstants";

import objAttributes from "@essential-blocks/blocks/text/src/attributes";

import {
    ResponsiveDimensionsControl,
    ResponsiveRangeController,
    TypographyDropdown,
    ColorControl,
    BackgroundControl,
    BorderShadowControl,
    useBlockDefaults,
    withBlockContext
} from "@essential-blocks/controls";

function Text(props) {
    const { blockDefaults, setBlockDefaults, name, deviceType, handleBlockDefault } = props;

    const {
        tagName,
        color,
        hoverColor,
        align,
        source,
        excerptLength,
        columnRuleColor,
        columnRuleStyle,
    } = blockDefaults;

    const isDefaultSet = useBlockDefaults(name, blockDefaults, setBlockDefaults, objAttributes)

    return (
        <>
            {isDefaultSet && (
                <div className="eb-panel-control">
                    <PanelBody
                        title={__("Text Settings", "essential-blocks")}
                        initialOpen={true}
                    >
                        <SelectControl
                            label={__("Source", "essential-blocks")}
                            value={source}
                            options={SOURCE}
                            onChange={(source) => handleBlockDefault({ source })}
                        />
                        <SelectControl
                            label={__("HTML Tag", "essential-blocks")}
                            value={tagName}
                            options={HEADING}
                            onChange={(tagName) => handleBlockDefault({ tagName })}
                        />
                        <BaseControl label={__("Text Alignment", "essential-blocks")}>
                            <ButtonGroup>
                                {TEXT_ALIGN.map((item, index) => (
                                    <Button
                                        key={index}
                                        isPrimary={align === item.value}
                                        isSecondary={align !== item.value}
                                        onClick={() =>
                                            handleBlockDefault({
                                                align: item.value,
                                            })
                                        }
                                    >
                                        {item.label}
                                    </Button>
                                ))}
                            </ButtonGroup>
                        </BaseControl>
                        {source === "dynamic-excerpt" && (
                            <RangeControl
                                label={__("Excerpt Length", "essential-blocks")}
                                value={excerptLength}
                                onChange={(excerptLength) =>
                                    handleBlockDefault({ excerptLength })
                                }
                                min={1}
                                max={100}
                                step={1}
                            />
                        )}
                    </PanelBody>
                    <PanelBody
                        title={__("Text Styles", "essential-blocks")}
                        initialOpen={false}
                    >
                        <TypographyDropdown
                            baseLabel={__("Typography", "essential-blocks")}
                            typographyPrefixConstant={TEXT_TYPOGRAPHY}
                        />
                        <ColorControl
                            label={__("Text Color", "essential-blocks")}
                            color={color}
                            onChange={(color) => handleBlockDefault({ color })}
                        />
                        <ColorControl
                            label={__("Text Hover Color", "essential-blocks")}
                            color={hoverColor}
                            onChange={(hoverColor) => handleBlockDefault({ hoverColor })}
                        />
                    </PanelBody>
                    <PanelBody
                        title={__("Column Settings", "essential-blocks")}
                        initialOpen={false}
                    >
                        <ResponsiveRangeController
                            baseLabel={__("Column Count", "essential-blocks")}
                            controlName={COLUMNCOUNT}
                            min={1}
                            max={6}
                            step={1}
                        />
                        <ResponsiveRangeController
                            baseLabel={__("Column Gap", "essential-blocks")}
                            controlName={COLUMNGAP}
                            min={0}
                            max={100}
                            step={1}
                        />
                        <ResponsiveRangeController
                            baseLabel={__("Column Width", "essential-blocks")}
                            controlName={COLUMNWIDTH}
                            min={0}
                            max={500}
                            step={1}
                        />
                        <SelectControl
                            label={__("Column Rule Style", "essential-blocks")}
                            value={columnRuleStyle}
                            options={COLUMNRULESTYLE}
                            onChange={(columnRuleStyle) =>
                                handleBlockDefault({ columnRuleStyle })
                            }
                        />
                        {columnRuleStyle !== "none" && (
                            <>
                                <ColorControl
                                    label={__("Column Rule Color", "essential-blocks")}
                                    color={columnRuleColor}
                                    onChange={(columnRuleColor) =>
                                        handleBlockDefault({ columnRuleColor })
                                    }
                                />
                                <ResponsiveRangeController
                                    baseLabel={__("Column Rule Width", "essential-blocks")}
                                    controlName={COLUMNRULEWIDTH}
                                    min={0}
                                    max={100}
                                    step={1}
                                />
                            </>
                        )}
                    </PanelBody>
                    <PanelBody
                        title={__("Text Margin & Padding", "essential-blocks")}
                        initialOpen={false}
                    >
                        <ResponsiveDimensionsControl
                            controlName={TEXT_MARGIN}
                            baseLabel={__("Margin", "essential-blocks")}
                        />
                        <ResponsiveDimensionsControl
                            controlName={TEXT_PADDING}
                            baseLabel={__("Padding", "essential-blocks")}
                        />
                    </PanelBody>
                    <PanelBody
                        title={__("Wrapper Margin & Padding", "essential-blocks")}
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

export default withBlockContext(objAttributes)(Text);
