/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { PanelBody, ToggleControl, RangeControl, BaseControl, __experimentalToggleGroupControl as ToggleGroupControl, __experimentalToggleGroupControlOption as ToggleGroupControlOption } from "@wordpress/components";
/**
 * Internal dependencies
 */
import {
    DESC_POSITIONS,
    TEXT_ALIGN,
    ALIGN_ITEMS,
    ALIGN_ITEMS_VERTICAL,
    IMG_POSITIONS,
    WrpBdShadow,
    TestimonialWrapBg,
    QUOTE_SIZE,
    UNIT_TYPES,
} from "@essential-blocks/blocks/testimonial/src/constants";
import objAttributes from "@essential-blocks/blocks/testimonial/src/attributes";

import {
    ColorControl,
    ImageAvatar,
    ResponsiveDimensionsControl,
    TypographyDropdown,
    ToggleButton,
    BorderShadowControl,
    BackgroundControl,
    ResponsiveRangeController,
    AdvancedControls,
    useBlockDefaults,
    withBlockContext
} from "@essential-blocks/controls";

function Testimonial(props) {
    const { blockDefaults, setBlockDefaults, name, deviceType, handleBlockDefault } = props;



    const {
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
    } = blockDefaults;
    const isDefaultSet = useBlockDefaults(name, blockDefaults, setBlockDefaults, objAttributes)

    return (
        <>
            {isDefaultSet && (
                <div className="eb-panel-control">
                    <PanelBody title={__("Layout Settings", "essential-blocks")} initialOpen={true}>
                        {avatarInline && (
                            <ToggleGroupControl
                                label={__("User Info Position", "essential-blocks")}

                                value={avatarPosition}
                                onChange={(value) => handleBlockDefault({ avatarPosition: value })}
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
                                onChange={(value) => handleBlockDefault({ avatarAlign: value })}
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
                            onChange={(value) => handleBlockDefault({ avatarOrder: value })}
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
                            onChange={(value) => handleBlockDefault({ descTextAlign: value })}
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
                            onChange={(value) => handleBlockDefault({ textAlign: value })}
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
                            onChange={(value) => handleBlockDefault({ userInfoAlign: value })}
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
                                handleBlockDefault({
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
                                    onChange={(value) => handleBlockDefault({ quoteHorizontalPosition: value })}
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
                                        onChange={(value) => handleBlockDefault({ quoteVerticalPosition: value })}
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
                    </PanelBody>

                    <PanelBody title={__("Avatar", "essential-blocks")} initialOpen={false}>
                        <ToggleControl
                            label="Display Avatar"
                            checked={displayAvatar}
                            onChange={() =>
                                handleBlockDefault({
                                    displayAvatar: !displayAvatar,
                                })
                            }
                            __nextHasNoMarginBottom
                        />

                        {displayAvatar && (
                            <ToggleControl
                                label={__("Avatar Inline", "essential-blocks")}
                                checked={avatarInline}
                                onChange={() =>
                                    handleBlockDefault({
                                        avatarInline: !avatarInline,
                                    })
                                }
                                __nextHasNoMarginBottom
                            />
                        )}

                        {displayAvatar && (
                            <BaseControl id="eb-testimonial-image-pos" label={__("Image Position", "essential-blocks")} __nextHasNoMarginBottom>
                                <ToggleButton
                                    options={IMG_POSITIONS}
                                    onChange={(value) =>
                                        handleBlockDefault({
                                            imagePosition: value,
                                        })
                                    }
                                />
                            </BaseControl>
                        )}

                        {displayAvatar && imageUrl && (
                            <PanelBody title={__("Image Setting", "essential-blocks")}>
                                {imageUrl && (
                                    <ImageAvatar
                                        imageUrl={imageUrl}
                                        onDeleteImage={() =>
                                            handleBlockDefault({
                                                imageUrl: null,
                                            })
                                        }
                                    />
                                )}

                                <ToggleControl
                                    label={__("Round Avatar", "essential-blocks")}
                                    checked={borderRadius === 50}
                                    onChange={() =>
                                        handleBlockDefault({
                                            borderRadius: borderRadius === 50 ? 0 : 50,
                                        })
                                    }
                                    __nextHasNoMarginBottom
                                />

                                <RangeControl
                                    label={__("Border Radius", "essential-blocks")}
                                    value={borderRadius}
                                    onChange={(newValue) =>
                                        handleBlockDefault({
                                            borderRadius: newValue,
                                        })
                                    }
                                    min={0}
                                    max={50}
                                    __nextHasNoMarginBottom
                                    __next40pxDefaultSize
                                />
                            </PanelBody>
                        )}
                    </PanelBody>
                    <PanelBody title={__("Colors", "essential-blocks")} initialOpen={false}>
                        <ColorControl
                            label={__("Username", "essential-blocks")}
                            color={userNameColor}
                            onChange={(userNameColor) => handleBlockDefault({ userNameColor })}
                        />
                        <ColorControl
                            label={__("Company", "essential-blocks")}
                            color={companyColor}
                            onChange={(companyColor) => handleBlockDefault({ companyColor })}
                        />
                        <ColorControl
                            label={__("Description", "essential-blocks")}
                            color={descriptionColor}
                            onChange={(descriptionColor) => handleBlockDefault({ descriptionColor })}
                        />
                        <ColorControl
                            label={__("Quote", "essential-blocks")}
                            color={quoteColor}
                            onChange={(quoteColor) => handleBlockDefault({ quoteColor })}
                        />
                    </PanelBody>
                    <PanelBody title={__("Typography", "essential-blocks")} initialOpen={false}>
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
                    </PanelBody>
                    <PanelBody title={__("Wrapper Margin & Padding")} initialOpen={false}>
                        <ResponsiveDimensionsControl
                            controlName={"margin"}
                            baseLabel="Margin"
                        />
                        <ResponsiveDimensionsControl
                            controlName={"padding"}
                            baseLabel="Padding"
                        />
                    </PanelBody>

                    <PanelBody title={__("Wrapper Background ", "essential-blocks")} initialOpen={false}>
                        <BackgroundControl controlName={TestimonialWrapBg} />
                    </PanelBody>

                    <PanelBody title={__("Wrapper Border & Shadow")} initialOpen={false}>
                        <BorderShadowControl controlName={WrpBdShadow} />
                    </PanelBody>
                </div>
            )}
        </>
    );
}

export default withBlockContext(objAttributes)(Testimonial);
