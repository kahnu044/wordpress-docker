/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
    ToggleControl,
    ButtonGroup,
    Button,
    TextControl,
    RangeControl,
    SelectControl,
    __experimentalDivider as Divider,
} from "@wordpress/components";

import {
    MediaUpload,
} from "@wordpress/block-editor";

/**
 * Internal depencencies
 */
import {
    WRAPPER_BG,
    WRAPPER_MARGIN,
    WRAPPER_PADDING,
    WRAPPER_BORDER_SHADOW,
    sizeUnitTypes,
    CAPTION_TYPES,

    ALIGNMENT,
    PLAY_ON,
    SOURCE,
    lottieWidth,
    lottieHeight,
} from "./constants/constants";
import { TITLE_TYPOGRAPHY } from "./constants/typographyPrefixConstants";

import {
    ResponsiveRangeController,
    InspectorPanel,
    ButtonGroupControl,
    DynamicInputControl,
    TypographyDropdown,
    ColorControl,
    EBTextControl
} from "@essential-blocks/controls";

import { ReactComponent as Icon } from "./icon.svg";

function Inspector(props) {
    const { attributes, setAttributes } = props;
    const {
        resOption,
        loop,
        speed,
        alignment,
        playOn,
        lottieSource,
        lottieURl,
        validationMessage,
        loopCount,
        enableTitle,
        lottieTitle,
        titleColor,
        titleBGColor,
        customLottieURL,
        captionType,
        lottieMediaCaption,
        lottieMediaTitle,
        lottieJSON,
        reverse,
        delay,
        startSegment,
        endSegment,
        scrollTopPoint,
        scrollBottomPoint,
    } = attributes;

    const validateLottie = (url) => {
        setAttributes({ customLottieURL: url });

        // Regex to match valid Lottie file URLs
        const lottieRegex = /^https?:\/\/lottie\.host\/[\w-]+\/[\w-]+\.(json|lottie)$/;

        if (lottieRegex.test(url)) {
            setAttributes({
                lottieURl: url,
                validationMessage: ''
            });
        } else {
            setAttributes({
                validationMessage: 'Invalid Lottie'
            });
        }
    }

    const selectLottieJSON = (media) => {
        if (!media || !media.url) {
            setAttributes({ lottieJSON: null });
            return;
        }

        setAttributes({
            lottieSource: 'library',
            lottieJSON: media,
            lottieURl: media.url,
            lottieMediaTitle: media.title,
            lottieMediaCaption: media.caption
        });
    };

    const handleError = (err) => {
        setAttributes({
            validationMessage: err
        });
        console.log('Error!', err)
    }

    return (
        <InspectorPanel advancedControlProps={{
            marginPrefix: WRAPPER_MARGIN,
            paddingPrefix: WRAPPER_PADDING,
            backgroundPrefix: WRAPPER_BG,
            borderPrefix: WRAPPER_BORDER_SHADOW,
            hasMargin: true
        }}>
            <InspectorPanel.General>
                <InspectorPanel.PanelBody title={__("Source File", "essential-blocks")} initialOpen={true}>
                    <ButtonGroupControl
                        label={__("File Source", "essential-blocks")}
                        attrName={'lottieSource'}
                        options={SOURCE}
                        currentValue={lottieSource}
                    />
                    {lottieSource === 'library' && (
                        <MediaUpload
                            type="application/json"
                            allowedTypes={['application/json', 'application/zip']}
                            accept={['application/json', '.lottie']}
                            value={lottieJSON?.id}
                            onSelect={selectLottieJSON}
                            onError={handleError}
                            render={({ open }) => (
                                <Button
                                    className="eb-upload-json"
                                    label={__(
                                        "Lottie Animation",
                                        "essential-blocks"
                                    )}
                                    onClick={open}
                                >
                                    <Icon />
                                    <span>{__("Change Lottie Animation", "essential-blocks")}</span>
                                </Button>
                            )}
                        />
                    )}

                    {lottieSource === 'url' && (
                        <>
                            <EBTextControl
                                label={__("Lottie Animation URL", "essential-blocks")}
                                fieldType="url"
                                value={customLottieURL}
                                onChange={(url) => {
                                    if (url.trim() === "") {
                                        setAttributes({
                                            customLottieURL: "",
                                            validationMessage: ""
                                        });
                                    } else {
                                        validateLottie(url);
                                    }
                                }}
                                placeholder="https://lottie.host/example/animation.json"
                                help={__(
                                    "Enter a valid Lottie animation URL with security filtering.",
                                    "essential-blocks"
                                )}
                                showValidation={true}
                                enableSecurity={true}
                            />

                            {validationMessage?.length > 0 && (
                                <div className="error-message" style={{ color: 'red' }}>
                                    {validationMessage}
                                </div>
                            )}
                        </>
                    )}
                    <Divider />

                    <ToggleControl
                        label={__("Show Caption", "essential-blocks")}
                        checked={enableTitle}
                        onChange={() => {
                            setAttributes({
                                enableTitle: !enableTitle,
                            });
                        }}
                    />
                    {enableTitle && (
                        <>
                            {lottieSource === 'library' && (
                                <>
                                    <SelectControl
                                        label={__("Caption Types", "essential-blocks")}
                                        value={captionType}
                                        options={CAPTION_TYPES}
                                        onChange={(selected) =>
                                            setAttributes({ captionType: selected })
                                        }
                                    />
                                    {((captionType === 'file-caption' && lottieMediaCaption === '') ||
                                        (captionType === 'title-caption' && lottieMediaTitle === ''))
                                        && (
                                            <div className="error-message" style={{ color: 'red' }}>
                                                {__("Empty Caption", "essential-blocks")}
                                            </div>
                                        )}
                                </>
                            )}

                            {captionType === 'custom-caption' && (
                                <DynamicInputControl
                                    label="Caption"
                                    attrName="lottieTitle"
                                    inputValue={lottieTitle}
                                    setAttributes={setAttributes}
                                    onChange={(text) => setAttributes({ lottieTitle: text })}
                                />
                            )}
                        </>
                    )}
                    <ButtonGroupControl
                        label={__("Alignment", "essential-blocks")}
                        attrName={'alignment'}
                        options={ALIGNMENT}
                        currentValue={alignment}
                    />
                </InspectorPanel.PanelBody>
                <InspectorPanel.PanelBody title={__("Settings", "essential-blocks")} initialOpen={true}>
                    <ToggleControl
                        label={__("Reverse", "essential-blocks")}
                        checked={reverse}
                        onChange={() => {
                            setAttributes({
                                reverse: !reverse,
                            });
                        }}
                    />
                    {playOn !== 'scroll' && (
                        <RangeControl
                            label={__(
                                "Animation Speed",
                                "essential-blocks",
                            )}
                            value={speed}
                            onChange={(speed) =>
                                setAttributes({
                                    speed,
                                })
                            }
                            min={0}
                            max={5}
                            step={.5}
                            allowReset
                            resetFallbackValue={1}
                        />
                    )}
                    <RangeControl
                        label={__(
                            "Animation Start Point",
                            "essential-blocks",
                        )}
                        value={startSegment}
                        onChange={(startSegment) =>
                            setAttributes({
                                startSegment,
                            })
                        }
                        min={0}
                        max={100}
                        step={1}
                        allowReset
                        resetFallbackValue={0}
                    />
                    <RangeControl
                        label={__(
                            "Animation End Point",
                            "essential-blocks",
                        )}
                        value={endSegment}
                        onChange={(endSegment) =>
                            setAttributes({
                                endSegment,
                            })
                        }
                        min={0}
                        max={100}
                        step={1}
                        allowReset
                        resetFallbackValue={100}
                    />

                    <SelectControl
                        label={__("Trigger", "essential-blocks")}
                        value={playOn}
                        options={PLAY_ON}
                        onChange={(selected) =>
                            setAttributes({
                                playOn: selected,
                                loop: selected === 'scroll' ? false : true,
                            })
                        }
                        help={__("Animation trigger will only work in the live preview", "essential-blocks")}
                    />

                    {playOn === 'scroll' && (
                        <>
                            <RangeControl
                                label={__(
                                    "Viewport Top Point",
                                    "essential-blocks",
                                )}
                                value={scrollTopPoint}
                                onChange={(scrollTopPoint) =>
                                    setAttributes({
                                        scrollTopPoint,
                                    })
                                }
                                min={0}
                                max={100}
                                step={1}
                                allowReset
                                resetFallbackValue={0}
                            />
                            <RangeControl
                                label={__(
                                    "Viewport Bottom Point",
                                    "essential-blocks",
                                )}
                                value={scrollBottomPoint}
                                onChange={(scrollBottomPoint) =>
                                    setAttributes({
                                        scrollBottomPoint,
                                    })
                                }
                                min={0}
                                max={100}
                                step={1}
                                allowReset
                                resetFallbackValue={0}
                            />
                        </>
                    )}

                    {playOn !== 'scroll' && (
                        <>
                            <ToggleControl
                                label={__("Loop", "essential-blocks")}
                                checked={loop}
                                onChange={() => {
                                    setAttributes({
                                        loop: !loop,
                                    });
                                }}
                            />
                            {loop && (
                                <>
                                    <RangeControl
                                        label={__(
                                            "Number of Loop",
                                            "essential-blocks",
                                        )}
                                        value={loopCount}
                                        onChange={(loopCount) =>
                                            setAttributes({
                                                loopCount,
                                            })
                                        }
                                        min={0}
                                        max={1000}
                                        step={1}
                                        allowReset
                                        resetFallbackValue={0}
                                    />

                                    <RangeControl
                                        label={__(
                                            "Delay between loop (seconds)",
                                            "essential-blocks",
                                        )}
                                        value={delay}
                                        onChange={(delay) =>
                                            setAttributes({
                                                delay,
                                            })
                                        }
                                        min={0}
                                        max={60}
                                        step={.1}
                                        allowReset
                                        resetFallbackValue={0}
                                        help={__("Delay will only work in the live preview", "essential-blocks")}
                                    />
                                </>
                            )}
                        </>
                    )}
                </InspectorPanel.PanelBody>
            </InspectorPanel.General>
            <InspectorPanel.Style>
                <InspectorPanel.PanelBody title={__("Styles", "essential-blocks")} initialOpen={true}>
                    <ResponsiveRangeController
                        baseLabel={__(
                            "Width",
                            "essential-blocks"
                        )}
                        controlName={lottieWidth}
                        units={sizeUnitTypes}
                        min={0}
                        max={1000}
                        step={1}
                    />
                    <ResponsiveRangeController
                        baseLabel={__(
                            "Height",
                            "essential-blocks"
                        )}
                        controlName={lottieHeight}
                        units={sizeUnitTypes}
                        min={0}
                        max={1000}
                        step={1}
                        allowAuto={true} // Enable auto option
                    />

                    {enableTitle && lottieTitle?.length > 0 && (
                        <>
                            <TypographyDropdown
                                baseLabel={__("Typography", "essential-blocks")}
                                typographyPrefixConstant={TITLE_TYPOGRAPHY}
                            />
                            <ColorControl
                                label={__("Color", "essential-blocks")}
                                color={titleColor}
                                attributeName={'titleColor'}
                            />
                            <ColorControl
                                label={__("Background Color", "essential-blocks")}
                                color={titleBGColor}
                                attributeName={'titleBGColor'}
                                isGradient={true}
                            />
                        </>
                    )}
                </InspectorPanel.PanelBody>
            </InspectorPanel.Style>
        </InspectorPanel >
    );
}

export default Inspector;
