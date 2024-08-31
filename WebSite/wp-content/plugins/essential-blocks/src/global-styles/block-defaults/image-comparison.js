/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
    PanelBody,
    BaseControl,
    ToggleControl,
    RangeControl,
    ButtonGroup,
    Button,
} from "@wordpress/components";

/**
 * External depencencies
 */

import {
    ImageAvatar,
    ResetControl,
    ColorControl,
    ResponsiveRangeController,
    ResponsiveDimensionsControl,
    TypographyDropdown,
    useBlockDefaults,
    withBlockContext
} from "@essential-blocks/controls";

/**
 * Internal depencencies
 */
import {
    CONTENT_POSITION,
    IMAGE_WIDTH,
    WRAPPER_PADDING,
    WRAPPER_MARGIN,
    LABEL_PADDING,
    HORIZONTAL_LABEL_POSITION,
    VERTICAL_LABEL_POSITION,
} from "@essential-blocks/blocks/image-comparison/src/constants";

import { typoPrefix_label } from "@essential-blocks/blocks/image-comparison/src/constants/typographyConstants";

import objAttributes from "@essential-blocks/blocks/image-comparison/src/attributes";

function ImageComparison(props) {
    const { blockDefaults, setBlockDefaults, name, deviceType, handleBlockDefault } = props;

    const {
        leftImageURL,
        rightImageURL,
        hover,
        verticalMode,
        showLabels,
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
    } = blockDefaults;

    const contentAttributes = ['leftImageURL', 'rightImageURL']
    const isDefaultSet = useBlockDefaults(name, blockDefaults, setBlockDefaults, objAttributes, contentAttributes)

    const onImageSwap = () => {
        let { leftImageURL, rightImageURL, swap } = blockDefaults;
        swap = !swap;
        [leftImageURL, rightImageURL] = [rightImageURL, leftImageURL];

        setDefaultValues({ swap, leftImageURL, rightImageURL });
    };

    return (
        <>
            {isDefaultSet && (
                <div className="eb-panel-control">
                    <PanelBody
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
                                            handleBlockDefault({
                                                leftImageURL: null,
                                            })
                                        }
                                    />
                                </BaseControl>
                            )}

                            {rightImageURL && (
                                <BaseControl
                                    label={__(
                                        "Right Image",
                                        "essential-blocks"
                                    )}
                                >
                                    <ImageAvatar
                                        imageUrl={rightImageURL}
                                        onDeleteImage={() =>
                                            handleBlockDefault({
                                                rightImageURL: null,
                                            })
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
                                        isPrimary={
                                            contentPosition === item.value
                                        }
                                        isSecondary={
                                            contentPosition !== item.value
                                        }
                                        onClick={() =>
                                            handleBlockDefault({
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
                            onChange={() =>
                                handleBlockDefault({ fullWidth: !fullWidth })
                            }
                        />
                        {!fullWidth && (
                            <>
                                <ResponsiveRangeController
                                    baseLabel={__(
                                        "Image Width",
                                        "essential-blocks"
                                    )}
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
                            onChange={() =>
                                handleBlockDefault({ hover: !hover })
                            }
                        />
                        <ToggleControl
                            label={__("Vertical Mode", "essential-blocks")}
                            checked={verticalMode}
                            onChange={() =>
                                handleBlockDefault({
                                    verticalMode: !verticalMode,
                                })
                            }
                        />
                        <ToggleControl
                            label={__("Show Labels", "essential-blocks")}
                            checked={showLabels}
                            onChange={() =>
                                handleBlockDefault({ showLabels: !showLabels })
                            }
                        />
                        {showLabels && (
                            <>
                                {verticalMode && (
                                    <BaseControl
                                        label={__(
                                            "Label Position",
                                            "essential-blocks"
                                        )}
                                    >
                                        <ButtonGroup>
                                            {VERTICAL_LABEL_POSITION.map(
                                                (item, index) => (
                                                    <Button
                                                        key={index}
                                                        isPrimary={
                                                            verticalLabelPosition ===
                                                            item.value
                                                        }
                                                        isSecondary={
                                                            verticalLabelPosition !==
                                                            item.value
                                                        }
                                                        onClick={() =>
                                                            handleBlockDefault({
                                                                verticalLabelPosition:
                                                                    item.value,
                                                            })
                                                        }
                                                    >
                                                        {item.label}
                                                    </Button>
                                                )
                                            )}
                                        </ButtonGroup>
                                    </BaseControl>
                                )}
                                {!verticalMode && (
                                    <BaseControl
                                        label={__(
                                            "Label Position",
                                            "essential-blocks"
                                        )}
                                    >
                                        <ButtonGroup>
                                            {HORIZONTAL_LABEL_POSITION.map(
                                                (item, index) => (
                                                    <Button
                                                        key={index}
                                                        isPrimary={
                                                            horizontalLabelPosition ===
                                                            item.value
                                                        }
                                                        isSecondary={
                                                            horizontalLabelPosition !==
                                                            item.value
                                                        }
                                                        onClick={() =>
                                                            handleBlockDefault({
                                                                horizontalLabelPosition:
                                                                    item.value,
                                                            })
                                                        }
                                                    >
                                                        {item.label}
                                                    </Button>
                                                )
                                            )}
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
                            onChange={() =>
                                handleBlockDefault({ noHandle: !noHandle })
                            }
                        />
                        <ResetControl
                            onReset={() =>
                                handleBlockDefault({
                                    position: objAttributes.position.default,
                                })
                            }
                        >
                            <RangeControl
                                label={__(
                                    "Slider Position",
                                    "essential-blocks"
                                )}
                                value={position}
                                onChange={(position) =>
                                    handleBlockDefault({ position })
                                }
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
                                handleBlockDefault({
                                    lineWidth: objAttributes.lineWidth.default,
                                })
                            }
                        >
                            <RangeControl
                                label={__(
                                    "Slider Line Width",
                                    "essential-blocks"
                                )}
                                value={lineWidth}
                                onChange={(lineWidth) =>
                                    handleBlockDefault({ lineWidth })
                                }
                                min={0}
                                max={10}
                            />
                        </ResetControl>
                    </PanelBody>

                    {/* Styles */}
                    <PanelBody
                        title={__("General Styles", "essential-blocks")}
                        initialOpen={false}
                    >
                        <ColorControl
                            label={__("Line Color", "essential-blocks")}
                            color={lineColor}
                            onChange={(lineColor) =>
                                handleBlockDefault({ lineColor })
                            }
                        />
                    </PanelBody>
                    {showLabels && (
                        <PanelBody
                            title={__("Labels", "essential-blocks")}
                            initialOpen={false}
                        >
                            <TypographyDropdown
                                baseLabel={__("Typography", "essential-blocks")}
                                typographyPrefixConstant={typoPrefix_label}
                            />
                            <ColorControl
                                label={__("Color", "essential-blocks")}
                                color={labelColor}
                                onChange={(labelColor) =>
                                    handleBlockDefault({ labelColor })
                                }
                            />
                            <ColorControl
                                label={__(
                                    "Background Color",
                                    "essential-blocks"
                                )}
                                color={labelBackgroundColor}
                                onChange={(labelBackgroundColor) =>
                                    handleBlockDefault({ labelBackgroundColor })
                                }
                            />
                            <ResponsiveDimensionsControl
                                controlName={LABEL_PADDING}
                                baseLabel={__("Padding", "essential-blocks")}
                            />
                        </PanelBody>
                    )}
                    {/* Advanced */}
                    <PanelBody
                        title={__(
                            "Wrapper Margin & Padding",
                            "essential-blocks"
                        )}
                        initialOpen={false}
                    >
                        <ResponsiveDimensionsControl
                            controlName={WRAPPER_MARGIN}
                            baseLabel={__("Margin", "essential-blocks")}
                            disableLeftRight={true}
                        />
                        <ResponsiveDimensionsControl
                            controlName={WRAPPER_PADDING}
                            baseLabel={__("Padding", "essential-blocks")}
                        />
                    </PanelBody>
                </div>
            )}
        </>
    );
}

export default withBlockContext(objAttributes)(ImageComparison);
