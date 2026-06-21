/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
    BaseControl,
    ToggleControl,
    SelectControl,
    __experimentalToggleGroupControl as ToggleGroupControl,
    __experimentalToggleGroupControlOption as ToggleGroupControlOption,
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
    HEADER_TAGS,
    IMG_ATTR_PROPS,
} from "./constants";
import {
    typoPrefix_header,
    typoPrefix_content,
} from "./constants/typographyPrefixConstants";

import {
    ColorControl,
    ResponsiveRangeController,
    TypographyDropdown,
    GradientColorControl,
    InspectorPanel,
    EBTextControl,
    EBTextareaControl,
    ImageComponent,
} from "@essential-blocks/controls";

const Inspector = ({ attributes, setAttributes }) => {
    const {
        resOption,
        effectName,
        header,
        content,
        link,
        newWindow,
        headerColor,
        contentColor,
        imageAlignment,
        isBackgroundGradient,
        backgroundColor,
        backgroundGradient,
        titleTag
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
                    <BaseControl label={__("Background Image", "essential-blocks")} __nextHasNoMarginBottom>
                        <ImageComponent.GeneralTab
                            imageAttrProps={IMG_ATTR_PROPS}
                            showInPanel={false}
                            hasTag={false}
                            hasCaption={false}
                            hasStyle={false}
                            hasLink={false}
                            hasAltText={true}
                        />
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
                    <EBTextControl
                        label={__("Header", "essential-blocks")}
                        value={header}
                        onChange={(header) => setAttributes({ header })}
                    />
                    <ToggleGroupControl
                        label={__(
                            "Header Tag",
                            "essential-blocks"
                        )}

                        value={titleTag}
                        onChange={(value) =>
                            setAttributes({
                                titleTag: value,
                            })
                        }
                        isBlock
                        __next40pxDefaultSize
                        __nextHasNoMarginBottom
                    >
                        {HEADER_TAGS.map(
                            (header, index) => (
                                <ToggleGroupControlOption
                                    key={index}
                                    value={header.value}
                                    label={header.label}
                                />
                            )
                        )}
                    </ToggleGroupControl>
                    <EBTextareaControl
                        label={__("Content", "essential-blocks")}
                        value={content}
                        onChange={(content) => setAttributes({ content })}
                    />
                    <EBTextControl
                        label={__("Link", "essential-blocks")}
                        fieldType="url"
                        value={link}
                        onChange={(link) => setAttributes({ link })}
                        placeholder="https://example.com"
                        help={__(
                            "Enter a valid URL.",
                            "essential-blocks"
                        )}
                        showValidation={true}
                        enableSecurity={true}
                    />
                    <ToggleControl
                        label={__("Open in New Tab", "essential-blocks")}
                        checked={newWindow}
                        onChange={() => setAttributes({ newWindow: !newWindow })}
                        __nextHasNoMarginBottom
                    />
                    <ToggleGroupControl
                        label={__("Alignment", "essential-blocks")}

                        value={imageAlignment}
                        onChange={(value) =>
                            setAttributes({
                                imageAlignment: value,
                            })
                        }
                        isBlock
                        __next40pxDefaultSize
                        __nextHasNoMarginBottom
                    >
                        {ALIGNMENT.map((item, index) => (
                            <ToggleGroupControlOption
                                key={index}
                                value={item.value}
                                label={item.label}
                            />
                        ))}
                    </ToggleGroupControl>
                    <SelectControl
                        label={__("Promo Effect", "essential-blocks")}
                        value={effectName}
                        options={EFFECTS_LIST}
                        onChange={(newEffect) =>
                            setAttributes({ effectName: newEffect })
                        }
                        __next40pxDefaultSize
                        __nextHasNoMarginBottom
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
                            __nextHasNoMarginBottom
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
