/**
 * WordPress dependencies
 */

import { __ } from "@wordpress/i18n";
import {
    ToggleControl,
    RangeControl,
    SelectControl,
    BaseControl,
    __experimentalToggleGroupControl as ToggleGroupControl,
    __experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from "@wordpress/components";

/**
 * Internal dependencies
 */

import {
    WRAPPER_MARGIN,
    WRAPPER_PADDING,
    DESC_POSITIONS,
    TEXT_ALIGN,
    ALIGN_ITEMS,
    ALIGN_ITEMS_VERTICAL,
    IMG_POSITIONS,
    WrpBdShadow,
    TestimonialWrapBg,
    QUOTE_SIZE,
    UNIT_TYPES,
    LAYOUT_PRESETS,
    ImgBdShadow,
    IMG_WIDTH,
    RATING_SIZE,
    RATING_POSITION,
    IMG_GAP,
} from "./constants";

import {
    ImageAvatar,
    TypographyDropdown,
    ToggleButton,
    BorderShadowControl,
    ResponsiveRangeController,
    ColorControl,
    InspectorPanel,
    ImageComponent
} from "@essential-blocks/controls";

function Inspector(props) {
    const { attributes, setAttributes } = props;
    const {
        resOption,
        displayAvatar,
        avatarInline,
        avatarPosition,
        avatarAlign,
        borderRadius,
        avatarOrder,
        imageUrl,
        userInfoAlign,
        textAlign,
        userNameColor,
        descriptionColor,
        enableQuote,
        quoteColor,
        companyColor,
        quoteHorizontalPosition,
        quoteVerticalPosition,
        descTextAlign,
        layoutPreset,
        imageOverlayColor,
        showRating,
        rating,
        ratingColor,
        ratingIndivisual,
        ratingPosition,
    } = attributes;

    const handlePresetChange = (preset) => {
        switch (preset) {
            case "layout-preset-1":
                setAttributes({
                    avatarAlign: "left",
                    avatarPosition: "flex-start",
                    avatarOrder: 1,
                    textAlign: "center",
                    descTextAlign: "center",
                    enableQuote: true,

                    imgWidth_Range: "",
                    imagePosition: 0,

                    img_borderStyle: "none",
                    img_borderColor: "",
                    img_Bdr_Bottom: "0",
                    img_Bdr_Left: "0",
                    img_Bdr_Right: "0",
                    img_Bdr_Top: "0",
                    img_Bdr_Unit: "px",
                    img_Bdr_isLinked: true,

                    img_blur: 33,
                    img_shadowColor: "",
                    img_shadowTransition: 0.5,
                    img_shadowType: "normal",
                    img_spread: 7,
                    img_vOffset: 0,

                    paddingBottom: "10",
                    paddingLeft: "10",
                    paddingRight: "10",
                    paddingTop: "10",
                    paddingUnit: "px",
                    paddingisLinked: true,

                    MOBpaddingBottom: "10",
                    MOBpaddingLeft: "10",
                    MOBpaddingRight: "10",
                    MOBpaddingTop: "10",
                    MOBpaddingUnit: "px",
                    MOBpaddingisLinked: true,

                    wrp_Bdr_Bottom: "1",
                    wrp_Bdr_Left: "1",
                    wrp_Bdr_Right: "1",
                    wrp_Bdr_Top: "1",
                    wrp_Bdr_Unit: "px",
                    wrp_Bdr_isLinked: true,
                    wrp_BorderType: "normal",
                    wrp_borderColor: "#000",
                    wrp_borderStyle: "none",

                    wrp_Rds_Bottom: "0",
                    wrp_Rds_Left: "0",
                    wrp_Rds_Right: "0",
                    wrp_Rds_Top: "0",
                    wrp_Rds_Unit: "px",
                    wrp_bg_hoverType: "normal",
                    wrp_backgroundType: "classic",
                    wrp_backgroundColor: "#fff",
                });
                break;

            case "layout-preset-2":
                setAttributes({
                    avatarAlign: "left",
                    avatarPosition: "flex-start",
                    avatarOrder: 0,
                    textAlign: "left",
                    descTextAlign: "left",
                    enableQuote: false,

                    imgWidth_Range: 60,
                    imagePosition: 0,
                    img_borderStyle: "solid",
                    img_borderColor: "#fff",
                    img_Bdr_Bottom: "3",
                    img_Bdr_Left: "3",
                    img_Bdr_Right: "3",
                    img_Bdr_Top: "3",
                    img_Bdr_Unit: "px",
                    img_Bdr_isLinked: true,

                    img_blur: 81,
                    img_shadowColor: "",
                    img_shadowTransition: 0.5,
                    img_shadowType: "normal",
                    img_spread: 33,
                    img_vOffset: 0,

                    paddingBottom: "6",
                    paddingLeft: "20",
                    paddingRight: "20",
                    paddingTop: "6",
                    paddingUnit: "%",
                    paddingisLinked: false,

                    MOBpaddingBottom: "20",
                    MOBpaddingLeft: "20",
                    MOBpaddingRight: "20",
                    MOBpaddingTop: "20",
                    MOBpaddingUnit: "px",
                    MOBpaddingisLinked: true,

                    wrp_Bdr_Bottom: "1",
                    wrp_Bdr_Left: "1",
                    wrp_Bdr_Right: "1",
                    wrp_Bdr_Top: "1",
                    wrp_Bdr_Unit: "px",
                    wrp_Bdr_isLinked: true,
                    wrp_BorderType: "normal",
                    wrp_borderColor: "#000",
                    wrp_borderStyle: "solid",

                    wrp_Rds_Bottom: "25",
                    wrp_Rds_Left: "25",
                    wrp_Rds_Right: "25",
                    wrp_Rds_Top: "25",
                    wrp_Rds_Unit: "px",
                    wrp_bg_hoverType: "normal",
                    wrp_backgroundType: "classic",
                    wrp_backgroundColor: "#fff",
                });
                break;
            case "layout-preset-3":
                setAttributes({
                    avatarAlign: "center",
                    avatarPosition: "center",
                    avatarInline: true,
                    avatarOrder: 0,
                    textAlign: "center",
                    descTextAlign: "center",
                    enableQuote: false,

                    imgWidth_Range: 90,
                    img_blur: 81,
                    img_shadowColor: "#9B9B9B38",
                    img_shadowTransition: 0.5,
                    img_shadowType: "normal",
                    img_spread: 33,
                    img_vOffset: 0,

                    img_borderStyle: "solid",
                    img_borderColor: "#fff",
                    img_Bdr_Bottom: "3",
                    img_Bdr_Left: "3",
                    img_Bdr_Right: "3",
                    img_Bdr_Top: "3",
                    img_Bdr_Unit: "px",
                    img_Bdr_isLinked: true,

                    paddingBottom: "6",
                    paddingLeft: "20",
                    paddingRight: "20",
                    paddingTop: "6",
                    paddingUnit: "%",
                    paddingisLinked: false,

                    MOBpaddingBottom: "20",
                    MOBpaddingLeft: "20",
                    MOBpaddingRight: "20",
                    MOBpaddingTop: "20",
                    MOBpaddingUnit: "px",
                    MOBpaddingisLinked: true,

                    wrp_Bdr_Bottom: "1",
                    wrp_Bdr_Left: "1",
                    wrp_Bdr_Right: "1",
                    wrp_Bdr_Top: "1",
                    wrp_Bdr_Unit: "px",
                    wrp_Bdr_isLinked: true,
                    wrp_BorderType: "normal",
                    wrp_borderColor: "#000",
                    wrp_borderStyle: "none",

                    wrp_Rds_Bottom: "25",
                    wrp_Rds_Left: "25",
                    wrp_Rds_Right: "25",
                    wrp_Rds_Top: "25",
                    wrp_Rds_Unit: "px",
                    wrp_bg_hoverType: "normal",
                    wrp_backgroundType: "classic",
                    wrp_backgroundColor: "#FAEFDB",
                });
                break;
        }

        setAttributes({ layoutPreset: preset });
    };

    const handleRating = (ratingIndivisual) => {
        if (ratingIndivisual) {
            setAttributes({
                quoteHorizontalPosition: "center",
            });
        } else {
            setAttributes({
                quoteHorizontalPosition: "flex-start",
            });
        }

        setAttributes({
            ratingIndivisual: ratingIndivisual,
        });
    };

    return (
        <InspectorPanel advancedControlProps={{
            marginPrefix: WRAPPER_MARGIN,
            paddingPrefix: WRAPPER_PADDING,
            backgroundPrefix: TestimonialWrapBg,
            borderPrefix: WrpBdShadow,
            hasMargin: true
        }}>
            <InspectorPanel.General>
                <>
                    <InspectorPanel.PanelBody title={__("Layout Settings", "essential-blocks")} initialOpen={true}>
                        <SelectControl
                            label={__("Preset", "essential-blocks")}
                            value={layoutPreset}
                            options={LAYOUT_PRESETS}
                            onChange={(layoutPreset) => handlePresetChange(layoutPreset)}
                            __next40pxDefaultSize
                            __nextHasNoMarginBottom
                        />
                        {avatarInline && (
                            <ToggleGroupControl
                                label={__("User Info Position", "essential-blocks")}

                                value={avatarPosition}
                                onChange={(value) =>
                                    setAttributes({
                                        avatarPosition: value,
                                    })
                                }
                                isBlock
                                __next40pxDefaultSize
                                __nextHasNoMarginBottom
                            >
                                {ALIGN_ITEMS.map((item, index) => (
                                    <ToggleGroupControlOption
                                        key={index}
                                        value={item.value}
                                        label={item.label}
                                    />
                                ))}
                            </ToggleGroupControl>
                        )}

                        {!avatarInline && displayAvatar && (
                            <ToggleGroupControl
                                label={
                                    avatarInline
                                        ? __("User Info Align", "essential-blocks")
                                        : __("Image Align", "essential-blocks")
                                }

                                value={avatarAlign}
                                onChange={(value) =>
                                    setAttributes({
                                        avatarAlign: value,
                                    })
                                }
                                isBlock
                                __next40pxDefaultSize
                                __nextHasNoMarginBottom
                            >
                                {ALIGN_ITEMS.map((item, index) => (
                                    <ToggleGroupControlOption
                                        key={index}
                                        value={item.value}
                                        label={item.label}
                                    />
                                ))}
                            </ToggleGroupControl>
                        )}

                        <ToggleGroupControl
                            label={__("Description Position", "essential-blocks")}

                            value={avatarOrder}
                            onChange={(value) =>
                                setAttributes({
                                    avatarOrder: value,
                                })
                            }
                            isBlock
                            __next40pxDefaultSize
                            __nextHasNoMarginBottom
                        >
                            {DESC_POSITIONS.map((item, index) => (
                                <ToggleGroupControlOption
                                    key={index}
                                    value={item.value}
                                    label={item.label}
                                />
                            ))}
                        </ToggleGroupControl>

                        <ToggleGroupControl
                            label={__("Description Align", "essential-blocks")}

                            value={descTextAlign}
                            onChange={(value) =>
                                setAttributes({
                                    descTextAlign: value,
                                })
                            }
                            isBlock
                            __next40pxDefaultSize
                            __nextHasNoMarginBottom
                        >
                            {TEXT_ALIGN.map((option, index) => (
                                <ToggleGroupControlOption
                                    key={index}
                                    value={option.value}
                                    label={option.label}
                                />
                            ))}
                        </ToggleGroupControl>

                        <ToggleGroupControl
                            label={__("User Name Align", "essential-blocks")}

                            value={textAlign}
                            onChange={(value) =>
                                setAttributes({
                                    textAlign: value,
                                })
                            }
                            isBlock
                            __next40pxDefaultSize
                            __nextHasNoMarginBottom
                        >
                            {TEXT_ALIGN.map((option, index) => (
                                <ToggleGroupControlOption
                                    key={index}
                                    value={option.value}
                                    label={option.label}
                                />
                            ))}
                        </ToggleGroupControl>

                        <ToggleGroupControl
                            label={__("User Info Align", "essential-blocks")}

                            value={userInfoAlign}
                            onChange={(value) =>
                                setAttributes({
                                    userInfoAlign: value,
                                })
                            }
                            isBlock
                            __next40pxDefaultSize
                            __nextHasNoMarginBottom
                        >
                            {ALIGN_ITEMS_VERTICAL.map((item, index) => (
                                <ToggleGroupControlOption
                                    key={index}
                                    value={item.value}
                                    label={item.label}
                                />
                            ))}
                        </ToggleGroupControl>

                        <ToggleControl
                            label="Enable Quote"
                            checked={enableQuote}
                            onChange={() =>
                                setAttributes({
                                    enableQuote: !enableQuote,
                                })
                            }
                            __nextHasNoMarginBottom
                        />

                        {enableQuote && (
                            <>
                                <ToggleGroupControl
                                    label={__("Quote Horizontal Align", "essential-blocks")}

                                    value={quoteHorizontalPosition}
                                    onChange={(value) =>
                                        setAttributes({
                                            quoteHorizontalPosition: value,
                                        })
                                    }
                                    isBlock
                                    __next40pxDefaultSize
                                    __nextHasNoMarginBottom
                                >
                                    {ALIGN_ITEMS.map((item, index) => (
                                        <ToggleGroupControlOption
                                            key={index}
                                            value={item.value}
                                            label={item.label}
                                        />
                                    ))}
                                </ToggleGroupControl>

                                {quoteHorizontalPosition === "center" && (
                                    <ToggleGroupControl
                                        label={__("Quote Vertical Position", "essential-blocks")}

                                        value={quoteVerticalPosition}
                                        onChange={(value) =>
                                            setAttributes({
                                                quoteVerticalPosition: value,
                                            })
                                        }
                                        isBlock
                                        __next40pxDefaultSize
                                        __nextHasNoMarginBottom
                                    >
                                        {DESC_POSITIONS.map((item, index) => (
                                            <ToggleGroupControlOption
                                                key={index}
                                                value={item.value}
                                                label={item.label}
                                            />
                                        ))}
                                    </ToggleGroupControl>
                                )}
                            </>
                        )}

                        <ToggleControl
                            label="Show Rating"
                            checked={showRating}
                            onChange={() =>
                                setAttributes({
                                    showRating: !showRating,
                                })
                            }
                            __nextHasNoMarginBottom
                        />

                        {showRating && (
                            <>
                                <RangeControl
                                    label={__("Rating", "essential-blocks-pro")}
                                    value={rating}
                                    onChange={(newValue) =>
                                        setAttributes({
                                            rating: newValue,
                                        })
                                    }
                                    min={0}
                                    max={5}
                                    step={1}
                                    allowReset={true}
                                    __nextHasNoMarginBottom
                                    __next40pxDefaultSize
                                />

                                <ToggleControl
                                    label="Rating With Description"
                                    checked={ratingIndivisual}
                                    onChange={(ratingIndivisual) => handleRating(ratingIndivisual)}
                                    __nextHasNoMarginBottom
                                />
                                {ratingIndivisual && (
                                    <>
                                        <ToggleGroupControl
                                            label={__("Rating Position", "essential-blocks")}

                                            value={ratingPosition}
                                            onChange={(value) =>
                                                setAttributes({
                                                    ratingPosition: value,
                                                })
                                            }
                                            isBlock
                                            __next40pxDefaultSize
                                            __nextHasNoMarginBottom
                                        >
                                            {RATING_POSITION.map((item, index) => (
                                                <ToggleGroupControlOption
                                                    key={index}
                                                    value={item.value}
                                                    label={item.label}
                                                />
                                            ))}
                                        </ToggleGroupControl>
                                    </>
                                )}
                            </>
                        )}
                    </InspectorPanel.PanelBody>

                    <InspectorPanel.PanelBody title={__("Avatar", "essential-blocks")} initialOpen={false}>
                        <ToggleControl
                            label="Display Avatar"
                            checked={displayAvatar}
                            onChange={() =>
                                setAttributes({
                                    displayAvatar: !displayAvatar,
                                })
                            }
                            __nextHasNoMarginBottom
                        />
                        {displayAvatar && (
                            <ImageComponent.GeneralTab
                                onSelect={(media) =>
                                    setAttributes({
                                        imageUrl: media.url,
                                        imageId: media.id,
                                    })
                                }
                                value={imageUrl}
                                hasTag={false}
                                hasCaption={false}
                                hasStyle={false}
                                hasLink={false}
                                showInPanel={false}
                            />
                        )}

                        {layoutPreset == "layout-preset-1" && (
                            <>
                                {displayAvatar && (
                                    <ToggleControl
                                        label={__("Avatar Inline", "essential-blocks")}
                                        checked={avatarInline}
                                        onChange={() =>
                                            setAttributes({
                                                avatarInline: !avatarInline,
                                            })
                                        }
                                        __nextHasNoMarginBottom
                                    />
                                )}

                                {displayAvatar && (
                                    <BaseControl
                                        id="eb-testimonial-image-pos"
                                        label={__("Image Position", "essential-blocks")}
                                        __nextHasNoMarginBottom
                                    >
                                        <ToggleButton
                                            options={IMG_POSITIONS}
                                            onChange={(value) =>
                                                setAttributes({
                                                    imagePosition: value,
                                                })
                                            }
                                        />
                                    </BaseControl>
                                )}
                            </>
                        )}

                        {displayAvatar && imageUrl && (
                            <InspectorPanel.PanelBody title={__("Image Setting", "essential-blocks")}>
                                {imageUrl && (
                                    <ImageAvatar
                                        imageUrl={imageUrl}
                                        onDeleteImage={() =>
                                            setAttributes({
                                                imageUrl: null,
                                            })
                                        }
                                    />
                                )}

                                <ToggleControl
                                    label={__("Round Avatar", "essential-blocks")}
                                    checked={borderRadius === 50}
                                    onChange={() =>
                                        setAttributes({
                                            borderRadius: borderRadius === 50 ? 0 : 50,
                                        })
                                    }
                                    __nextHasNoMarginBottom
                                />

                                <RangeControl
                                    label={__("Border Radius", "essential-blocks")}
                                    value={borderRadius}
                                    onChange={(newValue) =>
                                        setAttributes({
                                            borderRadius: newValue,
                                        })
                                    }
                                    min={0}
                                    max={50}
                                    __nextHasNoMarginBottom
                                    __next40pxDefaultSize
                                />
                            </InspectorPanel.PanelBody>
                        )}
                    </InspectorPanel.PanelBody>
                </>
            </InspectorPanel.General>
            <InspectorPanel.Style>
                <>
                    <InspectorPanel.PanelBody title={__("Color", "essential-blocks")} initialOpen={true}>
                        <ColorControl
                            label={__("Username Color", "essential-blocks")}
                            color={userNameColor}
                            attributeName={'userNameColor'}
                        />
                        <ColorControl
                            label={__("Company Color", "essential-blocks")}
                            color={companyColor}
                            attributeName={'companyColor'}
                        />
                        <ColorControl
                            label={__("Description Color", "essential-blocks")}
                            color={descriptionColor}
                            attributeName={'descriptionColor'}
                        />
                        <ColorControl
                            label={__("Quote Color", "essential-blocks")}
                            color={quoteColor}
                            attributeName={'quoteColor'}
                        />
                        <ColorControl
                            label={__("Rating Color", "essential-blocks")}
                            color={ratingColor}
                            attributeName={'ratingColor'}
                        />
                    </InspectorPanel.PanelBody>

                    <InspectorPanel.PanelBody title={__("Typography", "essential-blocks")} initialOpen={false}>
                        <TypographyDropdown
                            baseLabel="Username"
                            typographyPrefixConstant={"username"}
                        />
                        <TypographyDropdown
                            baseLabel="Company"
                            typographyPrefixConstant={"company"}
                        />
                        <TypographyDropdown
                            baseLabel="Description"
                            typographyPrefixConstant={"description"}
                        />
                        {enableQuote && (
                            <ResponsiveRangeController
                                baseLabel={__("Quote Size", "essential-blocks")}
                                controlName={QUOTE_SIZE}
                                units={UNIT_TYPES}
                                min={1}
                                max={200}
                                step={1}
                            />
                        )}
                        {showRating && (
                            <ResponsiveRangeController
                                baseLabel={__("Rating Size", "essential-blocks")}
                                controlName={RATING_SIZE}
                                units={UNIT_TYPES}
                                min={1}
                                max={100}
                                step={1}
                            />
                        )}
                    </InspectorPanel.PanelBody>

                    <InspectorPanel.PanelBody title={__("Image", "essential-blocks")} initialOpen={false}>
                        {layoutPreset == "layout-preset-2" && (
                            <ColorControl
                                label={__("Overlay Color", "essential-blocks")}
                                color={imageOverlayColor}
                                attributeName={'imageOverlayColor'}
                            />

                        )}
                        <ResponsiveRangeController
                            baseLabel={__("Width", "essential-blocks")}
                            controlName={IMG_WIDTH}
                            units={UNIT_TYPES}
                            min={1}
                            max={200}
                            step={1}
                        />
                        <ResponsiveRangeController
                            baseLabel={__("Gap", "essential-blocks")}
                            controlName={IMG_GAP}
                            units={UNIT_TYPES}
                            min={1}
                            max={200}
                            step={1}
                        />
                        <InspectorPanel.PanelBody title={__("Border & Shadow")} initialOpen={true}>
                            <BorderShadowControl
                                controlName={ImgBdShadow}
                                // noShadow
                                // noBorder
                                noBorderRadius
                                noBorderRadiusHover
                            />
                        </InspectorPanel.PanelBody>
                    </InspectorPanel.PanelBody>
                </>
            </InspectorPanel.Style>
        </InspectorPanel>
    );
}

export default Inspector;
