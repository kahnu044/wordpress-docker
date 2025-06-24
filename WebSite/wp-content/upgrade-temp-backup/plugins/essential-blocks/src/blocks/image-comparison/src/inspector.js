/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
    BaseControl,
    ToggleControl,
    RangeControl,
    TextControl,
    ButtonGroup,
    Button,
} from "@wordpress/components";

/**
 * Internal dependencies
 */
import objAttributes from "./attributes";

import {
    ImageAvatar,
    ResetControl,
    ColorControl,
    ResponsiveRangeController,
    ResponsiveDimensionsControl,
    TypographyDropdown,
    InspectorPanel
} from "@essential-blocks/controls";

import {
    CONTENT_POSITION,
    IMAGE_WIDTH,
    WRAPPER_PADDING,
    WRAPPER_MARGIN,
    LABEL_PADDING,
    HORIZONTAL_LABEL_POSITION,
    VERTICAL_LABEL_POSITION,
} from "./constants";
import { typoPrefix_label } from "./constants/typographyConstants";

const Inspector = ({ attributes, setAttributes, onImageSwap }) => {
    const {
        resOption,
        leftImageURL,
        rightImageURL,
        hover,
        verticalMode,
        showLabels,
        beforeLabel,
        afterLabel,
        fullWidth,
        position,
        swap,
        lineWidth,
        lineColor,
        contentPosition,
        horizontalLabelPosition,
        verticalLabelPosition,
        noHandle,
        labelColor,
        labelBackgroundColor,
    } = attributes;

    return (
        <InspectorPanel advancedControlProps={{
            marginPrefix: WRAPPER_MARGIN,
            paddingPrefix: WRAPPER_PADDING,
            hasMargin: true,
            hasPadding: true,
            hasBackground: false,
            hasBorder: false
        }}>
            <InspectorPanel.General>
                <InspectorPanel.PanelBody
                    title={__("General Settings", "essential-blocks")}
                    initialOpen={true}
                >
                    <>
                        {leftImageURL && (
                            <BaseControl
                                label={__("Left Image", "essential-blocks")}
                            >
                                <ImageAvatar
                                    imageUrl={leftImageURL}
                                    onDeleteImage={() =>
                                        setAttributes({ leftImageURL: null })
                                    }
                                />
                            </BaseControl>
                        )}

                        {rightImageURL && (
                            <BaseControl
                                label={__("Right Image", "essential-blocks")}
                            >
                                <ImageAvatar
                                    imageUrl={rightImageURL}
                                    onDeleteImage={() =>
                                        setAttributes({ rightImageURL: null })
                                    }
                                />
                            </BaseControl>
                        )}
                    </>
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
                    <ToggleControl
                        label={__("Full Width", "essential-blocks")}
                        checked={fullWidth}
                        onChange={() => setAttributes({ fullWidth: !fullWidth })}
                    />
                    {!fullWidth && (
                        <>
                            <ResponsiveRangeController
                                baseLabel={__("Image Width", "essential-blocks")}
                                controlName={IMAGE_WIDTH}
                                min={0}
                                max={1000}
                                step={1}
                                noUnits
                            />
                        </>
                    )}
                    <ToggleControl
                        label={__("Move on Hover", "essential-blocks")}
                        checked={hover}
                        onChange={() => setAttributes({ hover: !hover })}
                    />
                    <ToggleControl
                        label={__("Vertical Mode", "essential-blocks")}
                        checked={verticalMode}
                        onChange={() =>
                            setAttributes({ verticalMode: !verticalMode })
                        }
                    />
                    <ToggleControl
                        label={__("Show Labels", "essential-blocks")}
                        checked={showLabels}
                        onChange={() =>
                            setAttributes({ showLabels: !showLabels })
                        }
                    />
                    {showLabels && (
                        <>
                            <TextControl
                                label={__("Before Label", "essential-blocks")}
                                value={beforeLabel}
                                onChange={(beforeLabel) =>
                                    setAttributes({ beforeLabel })
                                }
                            />
                            <TextControl
                                label={__("After Label", "essential-blocks")}
                                value={afterLabel}
                                onChange={(afterLabel) =>
                                    setAttributes({ afterLabel })
                                }
                            />
                            {verticalMode && (
                                <BaseControl
                                    label={__("Label Position", "essential-blocks")}
                                >
                                    <ButtonGroup>
                                        {VERTICAL_LABEL_POSITION.map((item, index) => (
                                            <Button
                                                key={index}
                                                isPrimary={
                                                    verticalLabelPosition === item.value
                                                }
                                                isSecondary={
                                                    verticalLabelPosition !== item.value
                                                }
                                                onClick={() =>
                                                    setAttributes({
                                                        verticalLabelPosition: item.value,
                                                    })
                                                }
                                            >
                                                {item.label}
                                            </Button>
                                        ))}
                                    </ButtonGroup>
                                </BaseControl>
                            )}
                            {!verticalMode && (
                                <BaseControl
                                    label={__("Label Position", "essential-blocks")}
                                >
                                    <ButtonGroup>
                                        {HORIZONTAL_LABEL_POSITION.map((item, index) => (
                                            <Button
                                                key={index}
                                                isPrimary={
                                                    horizontalLabelPosition === item.value
                                                }
                                                isSecondary={
                                                    horizontalLabelPosition !== item.value
                                                }
                                                onClick={() =>
                                                    setAttributes({
                                                        horizontalLabelPosition: item.value,
                                                    })
                                                }
                                            >
                                                {item.label}
                                            </Button>
                                        ))}
                                    </ButtonGroup>
                                </BaseControl>
                            )}
                        </>
                    )}
                    <ToggleControl
                        label={__("Swap Images", "essential-blocks")}
                        checked={swap}
                        onChange={() => onImageSwap()}
                    />
                    <ToggleControl
                        label={__("No Handle", "essential-blocks")}
                        checked={noHandle}
                        onChange={() => setAttributes({ noHandle: !noHandle })}
                    />
                    <ResetControl
                        onReset={() =>
                            setAttributes({
                                position: objAttributes.position.default,
                            })
                        }
                    >
                        <RangeControl
                            label={__("Slider Position", "essential-blocks")}
                            value={position}
                            onChange={(position) => setAttributes({ position })}
                            min={0}
                            max={100}
                            help={__(
                                "Update & reload to see effect in backend",
                                "image-comparison"
                            )}
                        />
                    </ResetControl>
                    <ResetControl
                        onReset={() =>
                            setAttributes({
                                lineWidth: objAttributes.lineWidth.default,
                            })
                        }
                    >
                        <RangeControl
                            label={__("Slider Line Width", "essential-blocks")}
                            value={lineWidth}
                            onChange={(lineWidth) => setAttributes({ lineWidth })}
                            min={0}
                            max={10}
                        />
                    </ResetControl>
                </InspectorPanel.PanelBody>
            </InspectorPanel.General>
            <InspectorPanel.Style>
                <>
                    <InspectorPanel.PanelBody initialOpen={true}>
                        <ColorControl
                            label={__("Line Color", "essential-blocks")}
                            color={lineColor}
                            attributeName={'lineColor'}
                        />
                    </InspectorPanel.PanelBody>
                    {showLabels && (
                        <InspectorPanel.PanelBody title={__("Labels", "essential-blocks")}>
                            <TypographyDropdown
                                baseLabel={__("Typography", "essential-blocks")}
                                typographyPrefixConstant={typoPrefix_label}
                            />
                            <ColorControl
                                label={__("Color", "essential-blocks")}
                                color={labelColor}
                                attributeName={'labelColor'}
                            />
                            <ColorControl
                                label={__("Background Color", "essential-blocks")}
                                color={labelBackgroundColor}
                                attributeName={'labelBackgroundColor'}
                            />
                            <ResponsiveDimensionsControl
                                controlName={LABEL_PADDING}
                                baseLabel={__("Padding", "essential-blocks")}
                            />
                        </InspectorPanel.PanelBody>
                    )}
                </>
            </InspectorPanel.Style>
        </InspectorPanel>
    );
};

export default Inspector;
