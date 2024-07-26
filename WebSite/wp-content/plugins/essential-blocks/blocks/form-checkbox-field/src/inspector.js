/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { InspectorControls } from "@wordpress/block-editor";
import { useEffect, useState } from "@wordpress/element";
import {
    PanelBody,
    SelectControl,
    ToggleControl,
    TextControl,
    Button,
    RangeControl,
    BaseControl,
    ButtonGroup,
    TabPanel,
    PanelRow,
} from "@wordpress/components";

/**
 * Internal dependencies
 */
const {
    BackgroundControl,
    BorderShadowControl,
    ColorControl,
    ResponsiveRangeController,
    ResponsiveDimensionsControl,
    TypographyDropdown,
    AdvancedControls,
    SortableControl,
    DynamicInputControl,
    DynamicFormFieldControl,
    SortControl
} = EBControls;

import objAttributes from "./attributes";

import {
    WRAPPER_BG,
    WRAPPER_MARGIN,
    WRAPPER_PADDING,
    WRAPPER_BORDER_SHADOW,
    OPTIONS_TYPE,
    LABEL_MARGIN,
    CHECKBOX_SIZE,
    CHECKBOX_SPACING,
    NORMAL_CHECKED,
} from "./constants";
import {
    LABEL_TYPOGRAPHY,
    CHECKBOX_TEXT,
} from "./constants/typographyPrefixConstants";

function Inspector(props) {
    const { attributes, setAttributes, clientId } = props;

    const {
        blockId,
        resOption,
        showLabel,
        labelText,
        options,
        fieldName,
        defaultValue,
        placeholderText,
        isRequired,
        validationMessage,

        labelColor,
        requiredColor,

        checkboxType,
        checkboxColor,
        checkboxBgColor,
        checkboxBrColor,
        checkboxBrCheckedColor,
        checkboxBorder,
        dynamicValue,
        dynamicOptionType,
        dynamicValueLoader
    } = attributes;

    const [optionType, setOptionType] = useState("normal");

    const onOptionAdd = () => {
        if (!options || typeof options !== "object") {
            return;
        }

        const count = options.length + 1;
        const newOptions = [
            ...options,
            {
                name: `Option ${count}`,
                value: `option_${count}`,
            },
        ];

        setAttributes({ options: newOptions });
    };

    const getOtionsComponents = () => {
        const onValueChange = (key, value, position) => {
            const options = [...attributes.options]
            options[position] = { ...attributes.options[position], [key]: value }
            setAttributes({ options });
        };

        return attributes.options.map((each, i) => (
            <div key={i}>
                {optionType !== 'normal' && (
                    <>
                        <TextControl
                            label={__("Key", "essential-blocks")}
                            value={each.value}
                            onChange={(value) =>
                                onValueChange('value', value, i)
                            }
                        />
                    </>

                )}
                <TextControl
                    label={__("Value", "essential-blocks")}
                    value={each.name}
                    onChange={(name) =>
                        onValueChange('name', name, i)
                    }
                />
            </div>
        ))
    }

    const resRequiredProps = {
        setAttributes,
        resOption,
        attributes,
        objAttributes,
    };

    return (
        <InspectorControls key="controls">
            <div className="eb-panel-control">
                <TabPanel
                    className="eb-parent-tab-panel"
                    activeClass="active-tab"
                    tabs={[
                        {
                            name: "general",
                            title: "General",
                            className: "eb-tab general",
                        },
                        {
                            name: "styles",
                            title: "Style",
                            className: "eb-tab styles",
                        },
                        {
                            name: "advance",
                            title: "Advanced",
                            className: "eb-tab advance",
                        },
                    ]}
                >
                    {(tab) => (
                        <div className={"eb-tab-controls" + tab.name}>
                            {tab.name === "general" && (
                                <>
                                    <PanelBody
                                        title={__(
                                            "General",
                                            "essential-blocks"
                                        )}
                                        initialOpen={true}
                                    >
                                        <ToggleControl
                                            label={__(
                                                "Show Label?",
                                                "essential-blocks"
                                            )}
                                            checked={showLabel}
                                            onChange={() =>
                                                setAttributes({
                                                    showLabel: !showLabel,
                                                })
                                            }
                                        />

                                        {showLabel && (
                                            // <TextControl
                                            //     label={__(
                                            //         "Label Text",
                                            //         "essential-blocks"
                                            //     )}
                                            //     value={labelText}
                                            //     onChange={(text) =>
                                            //         setAttributes({
                                            //             labelText: text,
                                            //         })
                                            //     }
                                            // />
                                            <DynamicInputControl
                                                label={__(
                                                    "Label Text",
                                                    "essential-blocks"
                                                )}
                                                attrName="labelText"
                                                inputValue={labelText}
                                                setAttributes={setAttributes}
                                                onChange={(text) =>
                                                    setAttributes({
                                                        labelText: text,
                                                    })
                                                }
                                            />
                                        )}
                                        {/* <PanelRow>Manage Options</PanelRow> */}
                                        {/* <BaseControl
                                            label={__(
                                                "Manage Options",
                                                "essential-blocks"
                                            )}
                                            id="eb-advance-heading-alignment"
                                        >
                                            <ButtonGroup id="eb-advance-heading-alignment">
                                                {OPTIONS_TYPE.map(
                                                    (item, key) => (
                                                        <Button
                                                            key={key}
                                                            // isLarge
                                                            isPrimary={
                                                                optionType ===
                                                                item.value
                                                            }
                                                            isSecondary={
                                                                optionType !==
                                                                item.value
                                                            }
                                                            onClick={() => {
                                                                setOptionType(
                                                                    item.value
                                                                )
                                                                setAttributes({ options: [...options] })
                                                            }}
                                                        >
                                                            {item.label}
                                                        </Button>
                                                    )
                                                )}
                                            </ButtonGroup>
                                        </BaseControl>
                                        <SortControl
                                            items={attributes.options}
                                            labelKey={'name'}
                                            onSortEnd={options => setAttributes({ options })}
                                            onDeleteItem={index => {
                                                setAttributes({ options: attributes.options.filter((each, i) => i !== index) })
                                            }}
                                            hasSettings={true}
                                            settingsComponents={getOtionsComponents()}
                                            hasAddButton={true}
                                            onAddItem={onOptionAdd}
                                            addButtonText={__(
                                                "Add New Option",
                                                "essential-blocks"
                                            )}
                                            icon="plus-alt"
                                            onClick={onOptionAdd}
                                        >
                                            <span className="eb-add-options-button-label">
                                                {__(
                                                    "Add New Option",
                                                    "essential-blocks"
                                                )}
                                            </span>
                                        </Button> */}

                                        <DynamicFormFieldControl
                                            type="checkbox"
                                            options={options}
                                            dynamicValue={dynamicValue}
                                            dynamicOptionType={dynamicOptionType}
                                            dynamicValueLoader={dynamicValueLoader}
                                            setAttributes={setAttributes}
                                        />

                                        <ToggleControl
                                            label={__(
                                                "Required?",
                                                "essential-blocks"
                                            )}
                                            checked={isRequired}
                                            onChange={() =>
                                                setAttributes({
                                                    isRequired: !isRequired,
                                                })
                                            }
                                        />
                                    </PanelBody>

                                    <PanelBody
                                        title={__(
                                            "Advanced Settings",
                                            "essential-blocks"
                                        )}
                                        initialOpen={true}
                                    >
                                        <TextControl
                                            label={__(
                                                "Default Value",
                                                "essential-blocks"
                                            )}
                                            value={defaultValue}
                                            onChange={(text) =>
                                                setAttributes({
                                                    defaultValue: text,
                                                })
                                            }
                                            help={__("Leave empty if no default value.", "essential-blocks")}
                                        />
                                        <TextControl
                                            label={__(
                                                "Field Custom Name Attribute",
                                                "essential-blocks"
                                            )}
                                            value={fieldName}
                                            onChange={(text) =>
                                                setAttributes({
                                                    fieldName: text,
                                                })
                                            }
                                            help={__("This is for the name attributes which is used to submit form data, Name must be unique.", "essential-blocks")}
                                        />
                                        {isRequired && (
                                            <TextControl
                                                label={__(
                                                    "Custom Validation Message",
                                                    "essential-blocks"
                                                )}
                                                value={validationMessage}
                                                onChange={(text) =>
                                                    setAttributes({
                                                        validationMessage: text,
                                                    })
                                                }
                                            />
                                        )}
                                    </PanelBody>
                                </>
                            )}
                            {tab.name === "styles" && (
                                <>
                                    <PanelBody
                                        title={__("Label", "essential-blocks")}
                                        initialOpen={true}
                                    >
                                        <TypographyDropdown
                                            baseLabel={__(
                                                "Typography",
                                                "essential-blocks"
                                            )}
                                            typographyPrefixConstant={
                                                LABEL_TYPOGRAPHY
                                            }
                                            resRequiredProps={resRequiredProps}
                                        />
                                        <ColorControl
                                            label={__(
                                                "Color",
                                                "essential-blocks"
                                            )}
                                            color={labelColor}
                                            onChange={(labelColor) =>
                                                setAttributes({
                                                    labelColor,
                                                })
                                            }
                                        />
                                        <ColorControl
                                            label={__(
                                                "Requied Color",
                                                "essential-blocks"
                                            )}
                                            color={requiredColor}
                                            onChange={(requiredColor) =>
                                                setAttributes({
                                                    requiredColor,
                                                })
                                            }
                                        />
                                        <ResponsiveDimensionsControl
                                            resRequiredProps={resRequiredProps}
                                            controlName={LABEL_MARGIN}
                                            baseLabel={__(
                                                "Margin",
                                                "essential-blocks"
                                            )}
                                        />
                                    </PanelBody>

                                    <PanelBody
                                        title={__(
                                            "Checkbox",
                                            "essential-blocks"
                                        )}
                                        initialOpen={false}
                                    >
                                        <>
                                            <TypographyDropdown
                                                baseLabel={__(
                                                    "Typography",
                                                    "essential-blocks"
                                                )}
                                                typographyPrefixConstant={
                                                    CHECKBOX_TEXT
                                                }
                                                resRequiredProps={
                                                    resRequiredProps
                                                }
                                            />

                                            <ColorControl
                                                label={__(
                                                    "Color",
                                                    "essential-blocks"
                                                )}
                                                color={checkboxColor}
                                                onChange={(checkboxColor) =>
                                                    setAttributes({
                                                        checkboxColor,
                                                    })
                                                }
                                            />
                                            <ColorControl
                                                label={__(
                                                    "Background",
                                                    "essential-blocks"
                                                )}
                                                color={checkboxBgColor}
                                                onChange={(checkboxBgColor) =>
                                                    setAttributes({
                                                        checkboxBgColor,
                                                    })
                                                }
                                            />
                                            <ResponsiveRangeController
                                                baseLabel={__(
                                                    "Size (PX)",
                                                    "essential-blocks"
                                                )}
                                                controlName={CHECKBOX_SIZE}
                                                resRequiredProps={
                                                    resRequiredProps
                                                }
                                                min={1}
                                                max={100}
                                                step={1}
                                                noUnits
                                            />
                                            <RangeControl
                                                label={__(
                                                    "Border Width",
                                                    "essential-blocks"
                                                )}
                                                value={checkboxBorder}
                                                onChange={(checkboxBorder) =>
                                                    setAttributes({
                                                        checkboxBorder,
                                                    })
                                                }
                                                min={1}
                                                max={5}
                                                step={1}
                                                allowReset={true}
                                            />

                                            <ButtonGroup className="eb-inspector-btn-group">
                                                {NORMAL_CHECKED.map(
                                                    (item, index) => (
                                                        <Button
                                                            key={index}
                                                            isPrimary={
                                                                checkboxType ===
                                                                item.value
                                                            }
                                                            isSecondary={
                                                                checkboxType !==
                                                                item.value
                                                            }
                                                            onClick={() =>
                                                                setAttributes({
                                                                    checkboxType:
                                                                        item.value,
                                                                })
                                                            }
                                                        >
                                                            {item.label}
                                                        </Button>
                                                    )
                                                )}
                                            </ButtonGroup>

                                            {checkboxType === "normal" && (
                                                <>
                                                    <ColorControl
                                                        label={__(
                                                            "Border Color",
                                                            "essential-blocks"
                                                        )}
                                                        color={checkboxBrColor}
                                                        onChange={(
                                                            checkboxBrColor
                                                        ) =>
                                                            setAttributes({
                                                                checkboxBrColor,
                                                            })
                                                        }
                                                    />
                                                </>
                                            )}
                                            {checkboxType === "checked" && (
                                                <>
                                                    <ColorControl
                                                        label={__(
                                                            "Border Color",
                                                            "essential-blocks"
                                                        )}
                                                        color={
                                                            checkboxBrCheckedColor
                                                        }
                                                        onChange={(
                                                            checkboxBrCheckedColor
                                                        ) =>
                                                            setAttributes({
                                                                checkboxBrCheckedColor,
                                                            })
                                                        }
                                                    />
                                                </>
                                            )}

                                            <ResponsiveRangeController
                                                baseLabel={__(
                                                    "Spacing (PX)",
                                                    "essential-blocks"
                                                )}
                                                controlName={CHECKBOX_SPACING}
                                                resRequiredProps={
                                                    resRequiredProps
                                                }
                                                min={1}
                                                max={100}
                                                step={1}
                                                noUnits
                                            />
                                        </>
                                    </PanelBody>
                                </>
                            )}
                            {tab.name === "advance" && (
                                <>
                                    <PanelBody
                                        title={__(
                                            "Margin Padding",
                                            "essential-blocks"
                                        )}
                                    >
                                        <ResponsiveDimensionsControl
                                            resRequiredProps={resRequiredProps}
                                            controlName={WRAPPER_MARGIN}
                                            baseLabel={__("Margin", "essential-blocks")}
                                        />
                                        <ResponsiveDimensionsControl
                                            resRequiredProps={resRequiredProps}
                                            controlName={WRAPPER_PADDING}
                                            baseLabel={__("Padding", "essential-blocks")}
                                        />
                                    </PanelBody>

                                    <PanelBody
                                        title={__(
                                            "Background",
                                            "essential-blocks"
                                        )}
                                        initialOpen={false}
                                    >
                                        <BackgroundControl
                                            controlName={WRAPPER_BG}
                                            resRequiredProps={resRequiredProps}
                                        />
                                    </PanelBody>

                                    <PanelBody
                                        title={__("Border & Shadow", "essential-blocks")}
                                        initialOpen={false}
                                    >
                                        <BorderShadowControl
                                            controlName={WRAPPER_BORDER_SHADOW}
                                            resRequiredProps={resRequiredProps}
                                        />
                                    </PanelBody>

                                    <AdvancedControls
                                        attributes={attributes}
                                        setAttributes={setAttributes}
                                    />
                                </>
                            )}
                        </div>
                    )}
                </TabPanel>
            </div>
        </InspectorControls>
    );
}
export default Inspector;
