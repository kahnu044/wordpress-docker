/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
    SelectControl,
    ToggleControl,
    TextControl,
    Button,
    ButtonGroup,
    BaseControl,
} from "@wordpress/components";

/**
 * Internal depencencies
 */

import objAttributes from "./attributes";

import {
    NORMAL_HOVER,
    UNIT_TYPES,
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
} from "./constants/constants";

import { BUTTONS_TYPOGRAPHY, BUTTONS_CONNECTOR_TYPOGRAPHY } from "./constants/typographyPrefixConstants";

import {
    ColorControl,
    ResponsiveDimensionsControl,
    TypographyDropdown,
    BorderShadowControl,
    ResponsiveRangeController,
    BackgroundControl,
    DynamicInputControl,
    EBIconPicker,
    InspectorPanel
} from "@essential-blocks/controls";

function Inspector(props) {
    const { attributes, setAttributes } = props;
    const {
        resOption,
        preset,
        contentPosition,
        textOneColor,
        hoverTextOneColor,
        textTwoColor,
        hoverTextTwoColor,
        buttonTextOne,
        buttonURLOne,
        buttonTextTwo,
        buttonURLTwo,
        innerButtonText,
        innerButtonColor,
        innerButtonTextColor,
        innerButtonIcon,
        showConnector,
        connectorType,
        buttonsColorType,
        buttonTextAlign,
        buttonsWidthType,
        buttonOneNewWindow,
        buttonTwoNewWindow,
    } = attributes;

    const changePreset = (selected) => {
        setAttributes({ preset: selected });
        switch (selected) {
            case "preset-1":
                setAttributes({
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
                });
                break;
            case "preset-2":
                setAttributes({
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
                });
                break;
            case "preset-3":
                setAttributes({
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
                });
                break;
            case "preset-4":
                setAttributes({
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

                        <DynamicInputControl
                            label={__("Button One Text","essential-blocks")}
                            attrName="buttonTextOne"
                            inputValue={buttonTextOne}
                            setAttributes={setAttributes}
                            onChange={(text) => setAttributes({ buttonTextOne: text })}
                        />
                        <DynamicInputControl
                            label={__("Button One Link","essential-blocks")}
                            attrName="buttonURLOne"
                            inputValue={buttonURLOne}
                            setAttributes={setAttributes}
                            onChange={(text) => setAttributes({ buttonURLOne: text })}
                        />

                        {buttonURLOne && (
                            <ToggleControl
                                label={__("Open in New Tab", "essential-blocks")}
                                checked={buttonOneNewWindow}
                                onChange={() =>
                                    setAttributes({
                                        buttonOneNewWindow: !buttonOneNewWindow,
                                    })
                                }
                            />
                        )}

                        <DynamicInputControl
                            label={__("Button Two Text","essential-blocks")}
                            attrName="buttonTextTwo"
                            inputValue={buttonTextTwo}
                            setAttributes={setAttributes}
                            onChange={(text) => setAttributes({ buttonTextTwo: text })}
                        />
                        <DynamicInputControl
                            label={__("Button Two Link","essential-blocks")}
                            attrName="buttonURLTwo"
                            inputValue={buttonURLTwo}
                            setAttributes={setAttributes}
                            onChange={(text) => setAttributes({ buttonURLTwo: text })}
                        />
                        {buttonURLTwo && (
                            <ToggleControl
                                label={__("Open in New Tab", "essential-blocks")}
                                checked={buttonTwoNewWindow}
                                onChange={() =>
                                    setAttributes({
                                        buttonTwoNewWindow: !buttonTwoNewWindow,
                                    })
                                }
                            />
                        )}
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
                            label={__("Show Connector?","essential-blocks")}
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
                                    <TextControl
                                        label={__("Text", "essential-blocks")}
                                        value={innerButtonText}
                                        onChange={(text) => setAttributes({ innerButtonText: text })}
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
                </>
            </InspectorPanel.General>
            <InspectorPanel.Style>
                <>
                    <InspectorPanel.PanelBody title={__("Buttons", "essential-blocks")} initialOpen={true}>
                        <TypographyDropdown
                            baseLabel={__("Typography", "essential-blocks")}
                            typographyPrefixConstant={BUTTONS_TYPOGRAPHY}
                        />

                        <BaseControl>
                            <h3 className="eb-control-title">
                                {__("Button One Background", "essential-blocks")}
                            </h3>
                        </BaseControl>
                        <BackgroundControl
                            controlName={BUTTON_ONE_BACKGROUND}
                            noOverlay={true}
                            noMainBgi={true}
                        />

                        <BaseControl>
                            <h3 className="eb-control-title">
                                {__("Button Two Background", "essential-blocks")}
                            </h3>
                        </BaseControl>
                        <BackgroundControl
                            controlName={BUTTON_TWO_BACKGROUND}
                            noOverlay={true}
                            noMainBgi={true}
                        />

                        <BaseControl>
                            <h3 className="eb-control-title">{__("Text Color", "essential-blocks")}</h3>
                        </BaseControl>

                        <ButtonGroup className="eb-inspector-btn-group">
                            {NORMAL_HOVER.map((item, index) => (
                                <Button
                                    key={index}
                                    isPrimary={buttonsColorType === item.value}
                                    isSecondary={buttonsColorType !== item.value}
                                    onClick={() => setAttributes({ buttonsColorType: item.value })}
                                >
                                    {item.label}
                                </Button>
                            ))}
                        </ButtonGroup>

                        {buttonsColorType === "normal" && (
                            <>
                                <ColorControl
                                    label={__("Button One", "essential-blocks")}
                                    color={textOneColor}
                                    attributeName={'textOneColor'}
                                />
                                <ColorControl
                                    label={__("Button Two", "essential-blocks")}
                                    color={textTwoColor}
                                    attributeName={'textTwoColor'}
                                />
                            </>
                        )}

                        {buttonsColorType === "hover" && (
                            <>
                                <ColorControl
                                    label={__("Button One Hover", "essential-blocks")}
                                    color={hoverTextOneColor}
                                    attributeName={'hoverTextOneColor'}
                                />
                                <ColorControl
                                    label={__("Button Two Hover", "essential-blocks")}
                                    color={hoverTextTwoColor}
                                    attributeName={'hoverTextTwoColor'}
                                />
                            </>
                        )}

                        <InspectorPanel.PanelBody
                            className={"eb-subpanel"}
                            title={__("Button One Border", "essential-blocks")}
                            initialOpen={true}
                        >
                            <BorderShadowControl
                                controlName={BUTTON_ONE_BORDER_SHADOW}
                                noShadow
                            />
                        </InspectorPanel.PanelBody>

                        <InspectorPanel.PanelBody
                            className={"eb-subpanel"}
                            title={__("Button Two Border", "essential-blocks")}
                            initialOpen={true}
                        >
                            <BorderShadowControl
                                controlName={BUTTON_TWO_BORDER_SHADOW}
                                noShadow
                            />
                        </InspectorPanel.PanelBody>

                        <ResponsiveDimensionsControl
                            controlName={BUTTONS_PADDING}
                            baseLabel={__("Padding","essential-blocks")}
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
                            label={__("Text/ Icon Color","essential-blocks")}
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
