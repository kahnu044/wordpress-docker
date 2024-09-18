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
    LARGE_IMAGE_WIDTH,
    LARGE_IMAGE_BORDER,
    FEATURE_ALIGNMENT,
    FEATURE_IMG_MARGIN,
    THUMBNAILS_IMAGE_BORDER,
    ACTIVE_THUMBNAILS_IMAGE_BORDER
} from "./constants/constants";
import {
    ColorControl,
    TypographyDropdown,
    ResponsiveAlignControl,
    SortControl,
    InspectorPanel,
    ResponsiveRangeController,
    ResponsiveDimensionsControl,
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
        featureImgAlignment,
        disableNavArrow
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
                    title={__("Settings", "essential-blocks")}
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
                        baseLabel={__("Thumbnails Space", "essential-blocks")}
                        controlName={GALLERY_COLUMN_SPACE}
                        min={1}
                        max={200}
                        step={1}
                    />
                    <ToggleControl
                        label={__(
                            "Disable Thumbnail Navigation Icon",
                            "essential-blocks"
                        )}
                        checked={disableNavArrow}
                        onChange={() =>
                            setAttributes({
                                disableNavArrow: !disableNavArrow,
                            })
                        }
                    />
                </InspectorPanel.PanelBody>
            </InspectorPanel.General>
            <InspectorPanel.Style>
                <InspectorPanel.PanelBody title={__("Featured Image","essential-blocks")} initialOpen={true}>
                    <ToggleControl
                        label={__(
                            "Enable Adaptive Height",
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
                                label={ __( 'Display Size','essential-blocks' ) }
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
                    <ResponsiveRangeController
                        baseLabel={__(
                            "Width",
                            "essential-blocks"
                        )}
                        controlName={LARGE_IMAGE_WIDTH}
                        min={100}
                        max={2000}
                        step={1}
                    />
                    <ButtonGroupControl
                        label={__("Alignment", "essential-blocks")}
                        attrName="featureImgAlignment"
                        options={FEATURE_ALIGNMENT}
                        currentValue={featureImgAlignment}
                    />
                    <ResponsiveDimensionsControl
                        controlName={FEATURE_IMG_MARGIN}
                        baseLabel="Margin"
                    />
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
                <InspectorPanel.PanelBody title={__("Thumbnails","essential-blocks")}>
                    <BaseControl>
                        <h3 className="eb-control-title">
                            {__("Thumbnails Border", "essential-blocks")}
                        </h3>
                    </BaseControl>
                    <BorderShadowControl
                        label={__("Thumbnails Border","essential-blocks")}
                        controlName={
                            THUMBNAILS_IMAGE_BORDER
                        }
                    />
                    <BaseControl>
                        <h3 className="eb-control-title">
                            {__("Active Thumbnails Border", "essential-blocks")}
                        </h3>
                    </BaseControl>
                    <BorderShadowControl
                        label={__("Active Thumbnails Border","essential-blocks")}
                        controlName={
                            ACTIVE_THUMBNAILS_IMAGE_BORDER
                        }
                    />
                </InspectorPanel.PanelBody>
                <InspectorPanel.PanelBody title={__("Navigations","essential-blocks")}>
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

