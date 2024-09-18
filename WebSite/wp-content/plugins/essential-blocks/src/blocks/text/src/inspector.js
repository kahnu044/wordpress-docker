/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
    SelectControl,
    Button,
    ButtonGroup,
    BaseControl,
    PanelRow
} from "@wordpress/components";

/**
 * Internal depencencies
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
    COLUMNRULESTYLE
} from "./constants/constants";
import { TEXT_TYPOGRAPHY } from "./constants/typographyPrefixConstants";
import {
    ResponsiveDimensionsControl,
    ResponsiveRangeController,
    TypographyDropdown,
    DynamicInputControl,
    ColorControl,
    InspectorPanel
} from "@essential-blocks/controls";

import objAttributes from "./attributes";

function Inspector(props) {
    const { attributes, setAttributes } = props;
    const {
        resOption,
        align,
        tagName,
        text,
        color,
        hoverColor,
        source,
        columnRuleColor,
        columnRuleStyle
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
                <InspectorPanel.PanelBody
                    title={__("General", "essential-blocks")}
                    initialOpen={true}
                >
                    <SelectControl
                        label={__("Source", "essential-blocks")}
                        value={source}
                        options={SOURCE}
                        onChange={(source) => setAttributes({ source })}
                        help={source === 'dynamic-content' && 'Dynamic content will be displayed only within the Single Template.'}
                    />

                    <BaseControl
                        label={__("Alignment", "essential-blocks")}
                        id="eb-advance-heading-alignment"
                    >
                        <ButtonGroup id="eb-advance-heading-alignment">
                            {TEXT_ALIGN.map((item, key) => (
                                <Button
                                    key={key}
                                    // isLarge
                                    isPrimary={align === item.value}
                                    isSecondary={align !== item.value}
                                    onClick={() =>
                                        setAttributes({
                                            align: item.value,
                                        })
                                    }
                                >
                                    {item.label}
                                </Button>
                            ))}
                        </ButtonGroup>
                    </BaseControl>
                    {source !== 'dynamic-content' && (
                        <BaseControl
                            label={__("Tag", "essential-blocks")}
                            id="eb-advance-heading-alignment"
                        >
                            <ButtonGroup className="eb-advance-heading-alignment eb-html-tag-buttongroup">
                                {HEADING.map((item, key) => (
                                    <Button
                                        key={key}
                                        // isLarge
                                        isPrimary={tagName === item.value}
                                        isSecondary={tagName !== item.value}
                                        onClick={() => setAttributes({ tagName: item.value })}
                                    >
                                        {item.label}
                                    </Button>
                                ))}
                            </ButtonGroup>
                        </BaseControl>
                    )}

                    {source === 'custom' && (
                        <>
                            <DynamicInputControl
                                label="Title Text"
                                attrName="text"
                                inputValue={text}
                                setAttributes={setAttributes}
                                onChange={(text) => setAttributes({ text: text })}
                            />
                        </>
                    )}

                    {source !== 'dynamic-content' && (
                        <>
                            <ResponsiveRangeController
                                baseLabel={__("Column Count", "essential-blocks")}
                                controlName={COLUMNCOUNT}
                                min={0}
                                max={10}
                                step={1}
                                noUnits
                            />
                        </>
                    )}
                </InspectorPanel.PanelBody>
            </InspectorPanel.General>
            <InspectorPanel.Style>
                {source !== 'dynamic-content' && (
                    <>
                        <InspectorPanel.PanelBody title={__("Text Styles", "essential-blocks")} initialOpen={true}>
                            <TypographyDropdown
                                baseLabel={__("Typography", "essential-blocks")}
                                typographyPrefixConstant={TEXT_TYPOGRAPHY}
                            />

                            <ColorControl
                                label={__("Text Color", "essential-blocks")}
                                color={color}
                                attributeName={'color'}
                            />
                            <ColorControl
                                label={__("Text Hover Color", "essential-blocks")}
                                color={hoverColor}
                                attributeName={'hoverColor'}
                            />
                        </InspectorPanel.PanelBody>

                        <InspectorPanel.PanelBody title={__("Column Style", "essential-blocks")}>
                            <ResponsiveRangeController
                                baseLabel={__("Column Gap", "essential-blocks")}
                                controlName={COLUMNGAP}
                                min={0}
                                max={100}
                                step={1}
                            />
                            <ResponsiveRangeController
                                baseLabel={__("Column Min Width", "essential-blocks")}
                                controlName={COLUMNWIDTH}
                                min={0}
                                max={500}
                                step={1}
                            />
                            <SelectControl
                                label={__("Column Rule Style", "essential-blocks")}
                                value={columnRuleStyle}
                                options={COLUMNRULESTYLE}
                                onChange={(value) => setAttributes({ columnRuleStyle: value })}
                            />
                            {columnRuleStyle !== 'none' && (
                                <>
                                    <ColorControl
                                        label={__("Column Rule Color", "essential-blocks")}
                                        color={columnRuleColor}
                                        attributeName={'columnRuleColor'}
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
                        </InspectorPanel.PanelBody>
                    </>
                )}
                {source === 'dynamic-content' && (
                    <p style={{ padding: '10px 15px' }}>No style control available for <strong>Dynamic Content</strong></p>
                )}
            </InspectorPanel.Style>
        </InspectorPanel>
    );
}

export default Inspector;
