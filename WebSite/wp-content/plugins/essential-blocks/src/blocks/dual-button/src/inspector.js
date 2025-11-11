/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
    SelectControl,
    ToggleControl,
    Button,
    ButtonGroup,
    BaseControl,
} from "@wordpress/components";

/**
 * Internal depencencies
 */
import {
    BUTTON_ONE_BACKGROUND,
    BUTTON_TWO_BACKGROUND,
    BUTTON_ONE_BORDER_SHADOW,
    BUTTON_TWO_BORDER_SHADOW,
    WRAPPER_MARGIN,
    BUTTONS_PADDING,
    BUTTONS_WIDTH,
    BUTTONS_GAP,
    CONNECTOR_TYPE,
    PRESETS,
    BUTTONS_CONNECTOR_SIZE,
    TEXT_ALIGN,
    CONTENT_POSITION,
    BUTTONS_CONNECTOR_ICON_SIZE,
    BUTTON_WIDTH_TYPE,
    BUTTON_ONE_KEYS,
    BUTTON_TWO_KEYS,
    UNIT_TYPES
} from "./constants/constants";

import {
    BUTTONS_TYPOGRAPHY,
    BUTTONS_CONNECTOR_TYPOGRAPHY
} from "./constants/typographyPrefixConstants";

import {
    ColorControl,
    ResponsiveDimensionsControl,
    TypographyDropdown,
    ResponsiveRangeController,
    EBIconPicker,
    InspectorPanel,
    EBButton,
    EBTextControl
} from "@essential-blocks/controls";

function Inspector(props) {
    const { attributes, setAttributes } = props;
    const {
        preset,
        contentPosition,
        innerButtonText,
        innerButtonColor,
        innerButtonTextColor,
        innerButtonIcon,
        showConnector,
        connectorType,
        buttonTextAlign,
        buttonsWidthType,
    } = attributes;

    const changePreset = (selected) => {
        switch (selected) {
            case "preset-1":
                setAttributes({
                    preset: selected,
                    showConnector: true,
                    buttonOneBorderShadowRds_Top: "20",
                    buttonOneBorderShadowRds_Bottom: "0",
                    buttonOneBorderShadowRds_Left: "20",
                    buttonOneBorderShadowRds_Right: "0",
                    buttonTwoBorderShadowRds_Top: "0",
                    buttonTwoBorderShadowRds_Bottom: "20",
                    buttonTwoBorderShadowRds_Left: "0",
                    buttonTwoBorderShadowRds_Right: "20",
                    buttonsGapRange: 0,

                    buttonOneBorderShadowHRds_Bottom: "0",
                    buttonOneBorderShadowHRds_Left: "20",
                    buttonOneBorderShadowHRds_Right: "0",
                    buttonOneBorderShadowHRds_Top: "20",
                    buttonTwoBorderShadowHRds_Bottom: "20",
                    buttonTwoBorderShadowHRds_Left: "0",
                    buttonTwoBorderShadowHRds_Right: "20",
                    buttonTwoBorderShadowHRds_Top: "0",
                });
                break;
            case "preset-2":
                setAttributes({
                    preset: selected,
                    showConnector: false,
                    buttonOneBorderShadowRds_Top: "30",
                    buttonOneBorderShadowRds_Bottom: "30",
                    buttonOneBorderShadowRds_Left: "30",
                    buttonOneBorderShadowRds_Right: "30",
                    buttonTwoBorderShadowRds_Top: "30",
                    buttonTwoBorderShadowRds_Bottom: "30",
                    buttonTwoBorderShadowRds_Left: "30",
                    buttonTwoBorderShadowRds_Right: "30",
                    buttonsGapRange: 20,

                    buttonOneBorderShadowHRds_Bottom: "30",
                    buttonOneBorderShadowHRds_Left: "30",
                    buttonOneBorderShadowHRds_Right: "30",
                    buttonOneBorderShadowHRds_Top: "30",
                    buttonTwoBorderShadowHRds_Bottom: "30",
                    buttonTwoBorderShadowHRds_Left: "30",
                    buttonTwoBorderShadowHRds_Right: "30",
                    buttonTwoBorderShadowHRds_Top: "30",
                });
                break;
            case "preset-3":
                setAttributes({
                    preset: selected,
                    showConnector: false,
                    buttonOneBorderShadowRds_Top: "0",
                    buttonOneBorderShadowRds_Bottom: "0",
                    buttonOneBorderShadowRds_Left: "15",
                    buttonOneBorderShadowRds_Right: "15",
                    buttonTwoBorderShadowRds_Top: "15",
                    buttonTwoBorderShadowRds_Bottom: "15",
                    buttonTwoBorderShadowRds_Left: "0",
                    buttonTwoBorderShadowRds_Right: "0",
                    buttonsGapRange: 20,

                    buttonOneBorderShadowHRds_Bottom: "0",
                    buttonOneBorderShadowHRds_Left: "15",
                    buttonOneBorderShadowHRds_Right: "15",
                    buttonOneBorderShadowHRds_Top: "0",
                    buttonTwoBorderShadowHRds_Bottom: "15",
                    buttonTwoBorderShadowHRds_Left: "0",
                    buttonTwoBorderShadowHRds_Right: "0",
                    buttonTwoBorderShadowHRds_Top: "15",
                });
                break;
            case "preset-4":
                setAttributes({
                    preset: selected,
                    showConnector: false,
                    buttonOneBorderShadowRds_Top: "30",
                    buttonOneBorderShadowRds_Bottom: "30",
                    buttonOneBorderShadowRds_Left: "30",
                    buttonOneBorderShadowRds_Right: "30",
                    buttonTwoBorderShadowRds_Top: "30",
                    buttonTwoBorderShadowRds_Bottom: "30",
                    buttonTwoBorderShadowRds_Left: "30",
                    buttonTwoBorderShadowRds_Right: "30",
                    buttonsGapRange: 10,

                    buttonOneBorderShadowHRds_Bottom: "30",
                    buttonOneBorderShadowHRds_Left: "30",
                    buttonOneBorderShadowHRds_Right: "30",
                    buttonOneBorderShadowHRds_Top: "30",
                    buttonTwoBorderShadowHRds_Bottom: "30",
                    buttonTwoBorderShadowHRds_Left: "30",
                    buttonTwoBorderShadowHRds_Right: "30",
                    buttonTwoBorderShadowHRds_Top: "30",
                });
                break;
            default:
                return false;
        }
    };

    return (
        <InspectorPanel advancedControlProps={{
            marginPrefix: WRAPPER_MARGIN,
            hasMargin: true,
            hasPadding: false,
            hasBackground: false,
            hasBorder: false
        }}>
            <InspectorPanel.General>
                <>
                    <InspectorPanel.PanelBody title={__("General", "essential-blocks")} initialOpen={true}>
                        <SelectControl
                            label={__("Preset Designs", "essential-blocks")}
                            value={preset}
                            options={PRESETS}
                            onChange={(selected) => changePreset(selected)}
                        />

                        <BaseControl
                            label={__("Alignment", "essential-blocks")}
                            id="eb-button-group-alignment"
                        >
                            <ButtonGroup id="eb-button-group-alignment">
                                {CONTENT_POSITION.map((item, index) => (
                                    <Button
                                        key={index}
                                        isPrimary={contentPosition === item.value}
                                        isSecondary={contentPosition !== item.value}
                                        onClick={() =>
                                            setAttributes({
                                                contentPosition: item.value,
                                            })
                                        }
                                    >
                                        {item.label}
                                    </Button>
                                ))}
                            </ButtonGroup>
                        </BaseControl>
                    </InspectorPanel.PanelBody>
                    <InspectorPanel.PanelBody title={__("Buttons", "essential-blocks")} initialOpen={true}>
                        <BaseControl label={__("Button Width Type", "essential-blocks")}>
                            <SelectControl
                                value={buttonsWidthType}
                                options={BUTTON_WIDTH_TYPE}
                                onChange={(value) => {
                                    setAttributes({ buttonsWidthType: value });
                                }}
                            />
                        </BaseControl>
                        {buttonsWidthType === "custom" && (
                            <ResponsiveRangeController
                                baseLabel={__("Buttons Width", "essential-blocks")}
                                controlName={BUTTONS_WIDTH}
                                units={UNIT_TYPES}
                                min={0}
                                max={500}
                                step={1}
                            />
                        )}

                        <ResponsiveRangeController
                            baseLabel={__("Buttons Gap", "essential-blocks")}
                            controlName={BUTTONS_GAP}
                            units={UNIT_TYPES}
                            min={0}
                            max={100}
                            step={1}
                        />

                        <BaseControl
                            label={__("Text Align", "essential-blocks")}
                            id="eb-button-group-text-align"
                        >
                            <ButtonGroup id="eb-button-group-text-align">
                                {TEXT_ALIGN.map((item, index) => (
                                    <Button
                                        key={index}
                                        isPrimary={buttonTextAlign === item.value}
                                        isSecondary={buttonTextAlign !== item.value}
                                        onClick={() =>
                                            setAttributes({
                                                buttonTextAlign: item.value,
                                            })
                                        }
                                    >
                                        {item.label}
                                    </Button>
                                ))}
                            </ButtonGroup>
                        </BaseControl>
                    </InspectorPanel.PanelBody>
                    <InspectorPanel.PanelBody title={__("Connector", "essential-blocks")} initialOpen={true}>
                        <ToggleControl
                            label={__("Show Connector?", "essential-blocks")}
                            checked={showConnector}
                            onChange={() => {
                                setAttributes({ showConnector: !showConnector });
                            }}
                        />
                        {showConnector && (
                            <>
                                <BaseControl label={__("Connector Type", "essential-blocks")}>
                                    <ButtonGroup id="eb-button-group-connector-type">
                                        {CONNECTOR_TYPE.map((item, index) => (
                                            <Button
                                                key={index}
                                                isPrimary={connectorType === item.value}
                                                isSecondary={connectorType !== item.value}
                                                onClick={() =>
                                                    setAttributes({
                                                        connectorType: item.value,
                                                    })
                                                }
                                            >
                                                {item.label}
                                            </Button>
                                        ))}
                                    </ButtonGroup>
                                </BaseControl>

                                {connectorType === "icon" && (
                                    <InspectorPanel.PanelBody
                                        title={__("Icon Settings", "essential-blocks")}
                                        initialOpen={true}
                                    >
                                        <EBIconPicker
                                            value={innerButtonIcon}
                                            title={__("Icon", "essential-blocks")}
                                            attributeName={'innerButtonIcon'}
                                        />
                                        <ResponsiveRangeController
                                            baseLabel={__("Icon Size", "essential-blocks")}
                                            controlName={BUTTONS_CONNECTOR_ICON_SIZE}
                                            units={UNIT_TYPES}
                                            min={0}
                                            max={100}
                                            step={1}
                                        />
                                    </InspectorPanel.PanelBody>
                                )}

                                {connectorType === "text" && (
                                    <EBTextControl
                                        label={__("Text", "essential-blocks")}
                                        value={innerButtonText}
                                        onChange={(text) => setAttributes({ innerButtonText: text })}
                                        enableAi={true}
                                    />
                                )}

                                <ResponsiveRangeController
                                    baseLabel={__("Connector Size", "essential-blocks")}
                                    controlName={BUTTONS_CONNECTOR_SIZE}
                                    units={UNIT_TYPES}
                                    min={0}
                                    max={100}
                                    step={1}
                                />
                            </>
                        )}
                    </InspectorPanel.PanelBody>
                    <EBButton.GeneralTab
                        label={__("Button One", "essential-blocks")}
                        buttonAttrProps={BUTTON_ONE_KEYS}
                        attrPrefix="btn1"
                        hasIcon={false}
                        hasAlignment={false}
                        hasWidth={false}
                    />
                    <EBButton.GeneralTab
                        label={__("Button Two", "essential-blocks")}
                        buttonAttrProps={BUTTON_TWO_KEYS}
                        attrPrefix="btn2"
                        hasIcon={false}
                        hasAlignment={false}
                        hasWidth={false}
                    />
                </>
            </InspectorPanel.General>
            <InspectorPanel.Style>
                <>
                    <InspectorPanel.PanelBody title={__("Buttons", "essential-blocks")} initialOpen={true}>
                        <TypographyDropdown
                            baseLabel={__("Typography", "essential-blocks")}
                            typographyPrefixConstant={BUTTONS_TYPOGRAPHY}
                        />
                        <EBButton.StyleTab
                            label={__("Button One", "essential-blocks")}
                            buttonAttrProps={BUTTON_ONE_KEYS}
                            attrPrefix="btn1"
                            hasTypography={false}
                            background={BUTTON_ONE_BACKGROUND}
                            border={BUTTON_ONE_BORDER_SHADOW}
                            hasPadding={false}
                            hasHoverEffect={false}
                        />
                        <EBButton.StyleTab
                            label={__("Button Two", "essential-blocks")}
                            buttonAttrProps={BUTTON_TWO_KEYS}
                            attrPrefix="btn2"
                            hasTypography={false}
                            typography={BUTTONS_TYPOGRAPHY}
                            background={BUTTON_TWO_BACKGROUND}
                            border={BUTTON_TWO_BORDER_SHADOW}
                            hasPadding={false}
                            padding={BUTTONS_PADDING}
                            hasHoverEffect={false}
                        />
                        <ResponsiveDimensionsControl
                            controlName={BUTTONS_PADDING}
                            baseLabel={__("Padding", "essential-blocks")}
                        />
                    </InspectorPanel.PanelBody>
                    <InspectorPanel.PanelBody title={__("Connector", "essential-blocks")} initialOpen={false}>
                        <TypographyDropdown
                            baseLabel={__("Typography", "essential-blocks")}
                            typographyPrefixConstant={BUTTONS_CONNECTOR_TYPOGRAPHY}
                        />

                        <ColorControl
                            label={__("Background Color", "essential-blocks")}
                            color={innerButtonColor}
                            attributeName={'innerButtonColor'}
                        />

                        <ColorControl
                            label={__("Text/ Icon Color", "essential-blocks")}
                            color={innerButtonTextColor}
                            attributeName={'innerButtonTextColor'}
                        />
                    </InspectorPanel.PanelBody>
                </>
            </InspectorPanel.Style>
        </InspectorPanel>
    );
}

export default Inspector;
