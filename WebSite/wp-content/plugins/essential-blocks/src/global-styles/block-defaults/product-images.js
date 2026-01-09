/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
    PanelBody,
    SelectControl,
    ToggleControl,
    BaseControl,
    ButtonGroup,
    Button,
} from "@wordpress/components";

/**
 * Internal dependencies
 */
import {
    WRAPPER_MARGIN,
    WRAPPER_PADDING,
    WRAPPER_BORDER_SHADOW,
    WRAPPER_BG,
    GALLERY_COLUMNS,
    GALLERY_COLUMN_GAP,
    GALLERY_COLUMN_SPACE,
    GALLERY_ICON_SIZE,
    LARGE_IMAGE_HEIGHT,
    LARGE_IMAGE_WIDTH,
    LARGE_IMAGE_BORDER,
    FEATURE_IMG_MARGIN,
    THUMBNAILS_IMAGE_BORDER,
    ACTIVE_THUMBNAILS_IMAGE_BORDER,
} from "@essential-blocks/blocks/product-images/src/constants/constants";

import objAttributes from "@essential-blocks/blocks/product-images/src/attributes";

import {
    ResponsiveDimensionsControl,
    ResponsiveRangeController,
    BorderShadowControl,
    ColorControl,
    BackgroundControl,
    useBlockDefaults,
    withBlockContext
} from "@essential-blocks/controls";

const GALLERY_POSITIONS = [
    { label: __("Bottom", "essential-blocks"), value: "bottom" },
    { label: __("Right", "essential-blocks"), value: "right" },
    { label: __("Left", "essential-blocks"), value: "left" },
];

const SCALE_OPTIONS = [
    { label: __("Cover", "essential-blocks"), value: "cover" },
    { label: __("Contain", "essential-blocks"), value: "contain" },
    { label: __("Fill", "essential-blocks"), value: "fill" },
];

const ALIGNMENT_OPTIONS = [
    { label: __("Left", "essential-blocks"), value: "flex-start" },
    { label: __("Center", "essential-blocks"), value: "center" },
    { label: __("Right", "essential-blocks"), value: "flex-end" },
];

function ProductImages(props) {
    const { blockDefaults, setBlockDefaults, name, deviceType, handleBlockDefault } = props;

    const {
        galleryPosition,
        largeImgScale,
        useAdaptiveHeight,
        galleryArrowColor,
        galleryArrowHoverColor,
        galleryArrowBackgroundColor,
        galleryArrowBackgroundHoverColor,
        featureImgAlignment,
        disableNavArrow,
        enableZoom,
    } = blockDefaults;

    const isDefaultSet = useBlockDefaults(name, blockDefaults, setBlockDefaults, objAttributes)

    return (
        <>
            {isDefaultSet && (
                <div className="eb-panel-control">
                    <PanelBody
                        title={__("Settings", "essential-blocks")}
                        initialOpen={true}
                    >
                        <SelectControl
                            label={__("Gallery Position", "essential-blocks")}
                            value={galleryPosition}
                            options={GALLERY_POSITIONS}
                            onChange={(galleryPosition) =>
                                handleBlockDefault({ galleryPosition })
                            }
                        />
                        <SelectControl
                            label={__("Large Image Scale", "essential-blocks")}
                            value={largeImgScale}
                            options={SCALE_OPTIONS}
                            onChange={(largeImgScale) =>
                                handleBlockDefault({ largeImgScale })
                            }
                        />
                        <BaseControl label={__("Feature Image Alignment", "essential-blocks")}>
                            <ButtonGroup>
                                {ALIGNMENT_OPTIONS.map((item, index) => (
                                    <Button
                                        key={index}
                                        isPrimary={featureImgAlignment === item.value}
                                        isSecondary={featureImgAlignment !== item.value}
                                        onClick={() =>
                                            handleBlockDefault({
                                                featureImgAlignment: item.value,
                                            })
                                        }
                                    >
                                        {item.label}
                                    </Button>
                                ))}
                            </ButtonGroup>
                        </BaseControl>
                        <ToggleControl
                            label={__("Use Adaptive Height", "essential-blocks")}
                            checked={useAdaptiveHeight}
                            onChange={(useAdaptiveHeight) =>
                                handleBlockDefault({ useAdaptiveHeight })
                            }
                        />
                        <ToggleControl
                            label={__("Disable Navigation Arrow", "essential-blocks")}
                            checked={disableNavArrow}
                            onChange={(disableNavArrow) =>
                                handleBlockDefault({ disableNavArrow })
                            }
                        />
                        <ToggleControl
                            label={__("Enable Zoom", "essential-blocks")}
                            checked={enableZoom}
                            onChange={(enableZoom) =>
                                handleBlockDefault({ enableZoom })
                            }
                        />
                    </PanelBody>
                    <PanelBody
                        title={__("Gallery Settings", "essential-blocks")}
                        initialOpen={false}
                    >
                        <ResponsiveRangeController
                            baseLabel={__("Columns", "essential-blocks")}
                            controlName={GALLERY_COLUMNS}
                            min={1}
                            max={8}
                            step={1}
                        />
                        <ResponsiveRangeController
                            baseLabel={__("Column Gap", "essential-blocks")}
                            controlName={GALLERY_COLUMN_GAP}
                            min={0}
                            max={100}
                            step={1}
                        />
                        <ResponsiveRangeController
                            baseLabel={__("Column Space", "essential-blocks")}
                            controlName={GALLERY_COLUMN_SPACE}
                            min={0}
                            max={100}
                            step={1}
                        />
                        <ResponsiveRangeController
                            baseLabel={__("Icon Size", "essential-blocks")}
                            controlName={GALLERY_ICON_SIZE}
                            min={8}
                            max={100}
                            step={1}
                        />
                    </PanelBody>
                    <PanelBody
                        title={__("Gallery Arrow Styles", "essential-blocks")}
                        initialOpen={false}
                    >
                        <ColorControl
                            label={__("Arrow Color", "essential-blocks")}
                            color={galleryArrowColor}
                            onChange={(galleryArrowColor) =>
                                handleBlockDefault({ galleryArrowColor })
                            }
                        />
                        <ColorControl
                            label={__("Arrow Hover Color", "essential-blocks")}
                            color={galleryArrowHoverColor}
                            onChange={(galleryArrowHoverColor) =>
                                handleBlockDefault({ galleryArrowHoverColor })
                            }
                        />
                        <ColorControl
                            label={__("Arrow Background Color", "essential-blocks")}
                            color={galleryArrowBackgroundColor}
                            onChange={(galleryArrowBackgroundColor) =>
                                handleBlockDefault({ galleryArrowBackgroundColor })
                            }
                        />
                        <ColorControl
                            label={__("Arrow Background Hover Color", "essential-blocks")}
                            color={galleryArrowBackgroundHoverColor}
                            onChange={(galleryArrowBackgroundHoverColor) =>
                                handleBlockDefault({ galleryArrowBackgroundHoverColor })
                            }
                        />
                    </PanelBody>
                    <PanelBody
                        title={__("Large Image Settings", "essential-blocks")}
                        initialOpen={false}
                    >
                        <ResponsiveRangeController
                            baseLabel={__("Height", "essential-blocks")}
                            controlName={LARGE_IMAGE_HEIGHT}
                            min={100}
                            max={1000}
                            step={1}
                        />
                        <ResponsiveRangeController
                            baseLabel={__("Width", "essential-blocks")}
                            controlName={LARGE_IMAGE_WIDTH}
                            min={100}
                            max={1000}
                            step={1}
                        />
                        <BorderShadowControl
                            controlName={LARGE_IMAGE_BORDER}
                        />
                    </PanelBody>
                    <PanelBody
                        title={__("Feature Image Margin", "essential-blocks")}
                        initialOpen={false}
                    >
                        <ResponsiveDimensionsControl
                            controlName={FEATURE_IMG_MARGIN}
                            baseLabel={__("Margin", "essential-blocks")}
                        />
                    </PanelBody>
                    <PanelBody
                        title={__("Thumbnails Border", "essential-blocks")}
                        initialOpen={false}
                    >
                        <BorderShadowControl
                            controlName={THUMBNAILS_IMAGE_BORDER}
                        />
                    </PanelBody>
                    <PanelBody
                        title={__("Active Thumbnail Border", "essential-blocks")}
                        initialOpen={false}
                    >
                        <BorderShadowControl
                            controlName={ACTIVE_THUMBNAILS_IMAGE_BORDER}
                        />
                    </PanelBody>
                    <PanelBody
                        title={__("Margin & Padding", "essential-blocks")}
                        initialOpen={false}
                    >
                        <ResponsiveDimensionsControl
                            controlName={WRAPPER_MARGIN}
                            baseLabel={__("Margin", "essential-blocks")}
                        />
                        <ResponsiveDimensionsControl
                            controlName={WRAPPER_PADDING}
                            baseLabel={__("Padding", "essential-blocks")}
                        />
                    </PanelBody>
                    <PanelBody
                        title={__("Background", "essential-blocks")}
                        initialOpen={false}
                    >
                        <BackgroundControl
                            controlName={WRAPPER_BG}
                        />
                    </PanelBody>
                    <PanelBody
                        title={__("Border & Shadow", "essential-blocks")}
                        initialOpen={false}
                    >
                        <BorderShadowControl
                            controlName={WRAPPER_BORDER_SHADOW}
                        />
                    </PanelBody>
                </div>
            )}
        </>
    );
}

export default withBlockContext(objAttributes)(ProductImages);
