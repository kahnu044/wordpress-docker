/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
    ToggleControl,
    TextControl,
    Button,
    ButtonGroup,
    BaseControl,
    SelectControl,
} from "@wordpress/components";

/**
 * Internal depencencies
 */
import {
    WRAPPER_MARGIN,
    WRAPPER_PADDING,
    WRAPPER_BORDER_SHADOW,
    WRAPPER_BG,
    GALLERY_COLUMNS,
    GALLERY_COLUMN_GAP,
    GALLERY_COLUMN_SPACE,
    GALLERY_POSITON,
    GALLERY_ICON_SIZE,
    LARGE_IMAGE_HEIGHT,
    LARGE_IMAGE_BORDER
} from "./constants/constants";
import {
    ColorControl,
    TypographyDropdown,
    ResponsiveAlignControl,
    SortControl,
    InspectorPanel,
    ResponsiveRangeController,
    ButtonGroupControl,
    BorderShadowControl
}  from "@essential-blocks/controls";

export default function Inspector(props) {
    const { attributes, setAttributes } = props;
    const {
        resOption,
        galleryPosition,
        largeImgScale,
        useAdaptiveHeight,
        galleryArrowColor,
        galleryArrowHoverColor,
        galleryArrowBackgroundColor,
        galleryArrowBackgroundHoverColor,
    } = attributes;

    return (
        <InspectorPanel advancedControlProps={{
            marginPrefix: WRAPPER_MARGIN,
            paddingPrefix: WRAPPER_PADDING,
            backgroundPrefix: WRAPPER_BG,
            borderPrefix: WRAPPER_BORDER_SHADOW,
        }}>
            <InspectorPanel.General>
                <InspectorPanel.PanelBody
                    title={__("Gallery", "essential-blocks")}
                    initialOpen={true}
                >
                    <ButtonGroupControl
                        label={__("Gallery Position", "essential-blocks")}
                        attrName="galleryPosition"
                        options={GALLERY_POSITON}
                        currentValue={galleryPosition}
                    />
                    {/* <ResponsiveRangeController
                        baseLabel={__("Columns", "essential-blocks")}
                        controlName={GALLERY_COLUMNS}
                        noUnits={true}
                        min={1}
                        max={5}
                        step={1}
                    /> */}
                    <ResponsiveRangeController
                        baseLabel={__("Column Gap", "essential-blocks")}
                        controlName={GALLERY_COLUMN_GAP}
                        min={1}
                        max={200}
                        step={1}
                    />
                    <ResponsiveRangeController
                        baseLabel={__("Space Between", "essential-blocks")}
                        controlName={GALLERY_COLUMN_SPACE}
                        min={1}
                        max={200}
                        step={1}
                    />
                </InspectorPanel.PanelBody>
            </InspectorPanel.General>
            <InspectorPanel.Style>
                <InspectorPanel.PanelBody title={__("Large Image","essential-blocks")} initialOpen={true}>
                    <ToggleControl
                        label={__(
                            "Use Adaptive Height?",
                            "essential-blocks"
                        )}
                        checked={useAdaptiveHeight}
                        onChange={() =>
                            setAttributes({
                                useAdaptiveHeight: !useAdaptiveHeight,
                            })
                        }
                    />
                    {!useAdaptiveHeight && (
                        <>
                            <ResponsiveRangeController
                                baseLabel={__(
                                    "Height",
                                    "essential-blocks"
                                )}
                                controlName={LARGE_IMAGE_HEIGHT}
                                min={100}
                                max={2000}
                                step={1}
                            />
                            <SelectControl
                                label={ __( 'Image Scale','essential-blocks' ) }
                                value={ largeImgScale }
                                onChange={ (value) => {
                                    setAttributes({largeImgScale: value})
                                }}
                                options={ [
                                    { value: 'none', label: 'None' },
                                    { value: 'cover', label: 'Cover' },
                                    { value: 'contain', label: 'Contain' },
                                    { value: 'fill', label: 'Fill' },
                                    { value: 'scale-down', label: 'Scale Down' },
                                ] }
                                __nextHasNoMarginBottom
                            />
                        </>
                    )}
                    <BaseControl>
                        <h3 className="eb-control-title">
                            {__("Border", "essential-blocks")}
                        </h3>
                    </BaseControl>
                    <BorderShadowControl
                        label={__("Border","essential-blocks")}
                        controlName={
                            LARGE_IMAGE_BORDER
                        }
                    />
                </InspectorPanel.PanelBody>
                <InspectorPanel.PanelBody title={__("Gallery Arrow","essential-blocks")}>
                    <ResponsiveRangeController
                        baseLabel={__("Icon Size", "essential-blocks")}
                        controlName={GALLERY_ICON_SIZE}
                        min={1}
                        max={50}
                        step={1}
                    />
                    <ColorControl
                        label={__(
                            "Arrow Color",
                            "essential-blocks"
                        )}
                        color={galleryArrowColor}
                        onChange={(newGalleryArrowColor) =>
                            setAttributes({
                                galleryArrowColor: newGalleryArrowColor,
                            })
                        }
                    />
                    <ColorControl
                        label={__(
                            "Arrow Hover Color",
                            "essential-blocks"
                        )}
                        color={galleryArrowHoverColor}
                        onChange={(newGalleryArrowHoverColor) =>
                            setAttributes({
                                galleryArrowHoverColor: newGalleryArrowHoverColor,
                            })
                        }
                    />
                    <ColorControl
                        label={__(
                            "Arrow Background Color",
                            "essential-blocks"
                        )}
                        color={galleryArrowBackgroundColor}
                        onChange={(newGalleryArrowBackgroundColor) =>
                            setAttributes({
                                galleryArrowBackgroundColor: newGalleryArrowBackgroundColor,
                            })
                        }
                    />
                    <ColorControl
                        label={__(
                            "Arrow Background Hover Color",
                            "essential-blocks"
                        )}
                        color={galleryArrowBackgroundHoverColor}
                        onChange={(newGalleryArrowBackgroundHoverColor) =>
                            setAttributes({
                                galleryArrowBackgroundHoverColor: newGalleryArrowBackgroundHoverColor,
                            })
                        }
                    />
                </InspectorPanel.PanelBody>
            </InspectorPanel.Style>
        </InspectorPanel>
    );
}

