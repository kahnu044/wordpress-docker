/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { MediaUpload } from "@wordpress/block-editor";
import {
    Button,
    ButtonGroup,
    BaseControl,
    TextControl,
    TextareaControl,
    ToggleControl,
    SelectControl,
} from "@wordpress/components";

/**
 * Internal dependencies
 */
import {
    ALIGNMENT,
    EFFECTS_LIST,
    imageHeight,
    imageWidth,
    wrapperMargin,
    wrapperPadding,
    imageBorderShadow,
} from "./constants";
import {
    typoPrefix_header,
    typoPrefix_content,
} from "./constants/typographyPrefixConstants";

import {
    ImageAvatar,
    ColorControl,
    ResponsiveRangeController,
    TypographyDropdown,
    GradientColorControl,
    InspectorPanel
} from "@essential-blocks/controls";

const Inspector = ({ attributes, setAttributes }) => {
    const {
        resOption,
        effectName,
        header,
        content,
        link,
        imageURL,
        imageAltTag,
        newWindow,
        headerColor,
        contentColor,
        imageAlignment,
        isBackgroundGradient,
        backgroundColor,
        backgroundGradient,
    } = attributes;

    return (
        <InspectorPanel advancedControlProps={{
            marginPrefix: wrapperMargin,
            paddingPrefix: wrapperPadding,
            borderPrefix: imageBorderShadow,
            hasMargin: true,
            hasBackground: false,
        }}>
            <InspectorPanel.General>
                <InspectorPanel.PanelBody initialOpen={true}>
                    <BaseControl label={__("Background Image", "essential-blocks")}>
                        <MediaUpload
                            onSelect={(media) =>
                                setAttributes({
                                    imageURL: media.url,
                                })
                            }
                            type="image"
                            value={imageURL}
                            render={({ open }) =>
                                !imageURL && (
                                    <Button
                                        className="eb-cia-upload-button"
                                        label={__("Upload Image", "essential-blocks")}
                                        icon="format-image"
                                        onClick={open}
                                    />
                                )
                            }
                        />
                        {imageURL && (
                            <ImageAvatar
                                imageUrl={imageURL}
                                onDeleteImage={() =>
                                    setAttributes({ imageURL: null })
                                }
                            />
                        )}
                    </BaseControl>
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
                    <TextControl
                        label={__("Image alt tag", "essential-blocks")}
                        value={imageAltTag}
                        onChange={(newValue) =>
                            setAttributes({ imageAltTag: newValue })
                        }
                    />
                    <TextControl
                        label={__("Header", "essential-blocks")}
                        value={header}
                        onChange={(header) => setAttributes({ header })}
                    />
                    <TextareaControl
                        label={__("Content", "essential-blocks")}
                        value={content}
                        onChange={(content) => setAttributes({ content })}
                    />
                    <TextControl
                        label={__("Link", "essential-blocks")}
                        value={link}
                        onChange={(link) => setAttributes({ link })}
                    />
                    <ToggleControl
                        label={__("Open in New Tab", "essential-blocks")}
                        checked={newWindow}
                        onChange={() => setAttributes({ newWindow: !newWindow })}
                    />
                    <BaseControl>
                        <h3 className="eb-control-title">
                            {__("Alignment", "essential-blocks")}
                        </h3>
                        <ButtonGroup>
                            {ALIGNMENT.map((item, index) => (
                                <Button
                                    key={index}
                                    isPrimary={imageAlignment === item.value}
                                    isSecondary={imageAlignment !== item.value}
                                    onClick={() =>
                                        setAttributes({
                                            imageAlignment: item.value,
                                        })
                                    }
                                >
                                    {item.label}
                                </Button>
                            ))}
                        </ButtonGroup>
                    </BaseControl>
                    <SelectControl
                        label={__("Promo Effect", "essential-blocks")}
                        value={effectName}
                        options={EFFECTS_LIST}
                        onChange={(newEffect) =>
                            setAttributes({ effectName: newEffect })
                        }
                    />
                </InspectorPanel.PanelBody>
            </InspectorPanel.General>
            <InspectorPanel.Style>
                <>
                    <InspectorPanel.PanelBody
                        title={__("Background Color", "essential-blocks")}
                        initialOpen={true}
                    >
                        <ToggleControl
                            label={__("Show Gradient Color", "essential-blocks")}
                            checked={isBackgroundGradient}
                            onChange={() => {
                                setAttributes({
                                    isBackgroundGradient: !isBackgroundGradient,
                                });
                            }}
                        />
                        {isBackgroundGradient || (
                            <ColorControl
                                label={__("Color", "essential-blocks")}
                                color={backgroundColor}
                                attributeName={'backgroundColor'}
                            />
                        )}
                        {isBackgroundGradient && (
                            <>
                                <GradientColorControl
                                    label={__("Gradient Color", "essential-blocks")}
                                    gradientColor={
                                        backgroundGradient
                                    }
                                    onChange={(
                                        backgroundGradient
                                    ) =>
                                        setAttributes(
                                            {
                                                backgroundGradient,
                                            }
                                        )
                                    }

                                />
                            </>
                        )}
                    </InspectorPanel.PanelBody>
                    <InspectorPanel.PanelBody
                        title={__("Header", "essential-blocks")}
                        initialOpen={false}
                    >
                        <>
                            <TypographyDropdown
                                baseLabel={__("Typography", "essential-blocks")}
                                typographyPrefixConstant={typoPrefix_header}
                            />
                            <ColorControl
                                label={__("Color", "essential-blocks")}
                                color={headerColor}
                                attributeName={'headerColor'}
                            />
                        </>
                    </InspectorPanel.PanelBody>
                    <InspectorPanel.PanelBody
                        title={__("Content", "essential-blocks")}
                        initialOpen={false}
                    >
                        <>
                            <TypographyDropdown
                                baseLabel={__("Typography", "essential-blocks")}
                                typographyPrefixConstant={typoPrefix_content}
                            />
                            <ColorControl
                                label={__("Color", "essential-blocks")}
                                color={contentColor}
                                attributeName={'contentColor'}
                            />
                        </>
                    </InspectorPanel.PanelBody>
                </>
            </InspectorPanel.Style>
        </InspectorPanel>
    );
};

export default Inspector;
