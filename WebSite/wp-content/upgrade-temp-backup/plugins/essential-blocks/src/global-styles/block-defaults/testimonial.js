/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { PanelBody, ToggleControl, RangeControl, Button, BaseControl, ButtonGroup } from "@wordpress/components";
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
                            <BaseControl label={__("User Info Position", "essential-blocks")}>
                                <ButtonGroup>
                                    {ALIGN_ITEMS.map((item, index) => (
                                        <Button
                                            key={index}
                                            isSecondary={avatarPosition !== item.value}
                                            isPrimary={avatarPosition === item.value}
                                            onClick={() =>
                                                handleBlockDefault({
                                                    avatarPosition: item.value,
                                                })
                                            }
                                        >
                                            {item.label}
                                        </Button>
                                    ))}
                                </ButtonGroup>
                            </BaseControl>
                        )}

                        {!avatarInline && displayAvatar && (
                            <BaseControl
                                label={
                                    avatarInline
                                        ? __("User Info Align", "essential-blocks")
                                        : __("Image Align", "essential-blocks")
                                }
                            >
                                <ButtonGroup>
                                    {ALIGN_ITEMS.map((item, index) => (
                                        <Button
                                            key={index}
                                            isSecondary={avatarAlign !== item.value}
                                            isPrimary={avatarAlign === item.value}
                                            onClick={() =>
                                                handleBlockDefault({
                                                    avatarAlign: item.value,
                                                })
                                            }
                                        >
                                            {item.label}
                                        </Button>
                                    ))}
                                </ButtonGroup>
                            </BaseControl>
                        )}

                        <BaseControl label={__("Description Position", "essential-blocks")}>
                            <ButtonGroup>
                                {DESC_POSITIONS.map((item, index) => (
                                    <Button
                                        key={index}
                                        isSecondary={avatarOrder !== item.value}
                                        isPrimary={avatarOrder === item.value}
                                        onClick={() =>
                                            handleBlockDefault({
                                                avatarOrder: item.value,
                                            })
                                        }
                                    >
                                        {item.label}
                                    </Button>
                                ))}
                            </ButtonGroup>
                        </BaseControl>

                        <BaseControl label={__("Description Align", "essential-blocks")}>
                            <ButtonGroup>
                                {TEXT_ALIGN.map((option, index) => (
                                    <Button
                                        key={index}
                                        isSecondary={descTextAlign !== option.value}
                                        isPrimary={descTextAlign === option.value}
                                        onClick={() =>
                                            handleBlockDefault({
                                                descTextAlign: option.value,
                                            })
                                        }
                                    >
                                        {option.label}
                                    </Button>
                                ))}
                            </ButtonGroup>
                        </BaseControl>

                        <BaseControl label={__("User Name Align", "essential-blocks")}>
                            <ButtonGroup>
                                {TEXT_ALIGN.map((option, index) => (
                                    <Button
                                        key={index}
                                        isSecondary={textAlign !== option.value}
                                        isPrimary={textAlign === option.value}
                                        onClick={() =>
                                            handleBlockDefault({
                                                textAlign: option.value,
                                            })
                                        }
                                    >
                                        {option.label}
                                    </Button>
                                ))}
                            </ButtonGroup>
                        </BaseControl>

                        <BaseControl label={__("User Info Align", "essential-blocks")}>
                            <ButtonGroup>
                                {ALIGN_ITEMS_VERTICAL.map((item, index) => (
                                    <Button
                                        key={index}
                                        isSecondary={userInfoAlign !== item.value}
                                        isPrimary={userInfoAlign === item.value}
                                        onClick={() =>
                                            handleBlockDefault({
                                                userInfoAlign: item.value,
                                            })
                                        }
                                    >
                                        {item.label}
                                    </Button>
                                ))}
                            </ButtonGroup>
                        </BaseControl>

                        <ToggleControl
                            label="Enable Quote"
                            checked={enableQuote}
                            onChange={() =>
                                handleBlockDefault({
                                    enableQuote: !enableQuote,
                                })
                            }
                        />

                        {enableQuote && (
                            <>
                                <BaseControl label={__("Quote Horizontal Align", "essential-blocks")}>
                                    <ButtonGroup>
                                        {ALIGN_ITEMS.map((item, index) => (
                                            <Button
                                                key={index}
                                                isSecondary={quoteHorizontalPosition !== item.value}
                                                isPrimary={quoteHorizontalPosition === item.value}
                                                onClick={() =>
                                                    handleBlockDefault({
                                                        quoteHorizontalPosition: item.value,
                                                    })
                                                }
                                            >
                                                {item.label}
                                            </Button>
                                        ))}
                                    </ButtonGroup>
                                </BaseControl>

                                {quoteHorizontalPosition === "center" && (
                                    <BaseControl label={__("Quote Vertical Position", "essential-blocks")}>
                                        <ButtonGroup>
                                            {DESC_POSITIONS.map((item, index) => (
                                                <Button
                                                    key={index}
                                                    isSecondary={quoteVerticalPosition !== item.value}
                                                    isPrimary={quoteVerticalPosition === item.value}
                                                    onClick={() =>
                                                        handleBlockDefault({
                                                            quoteVerticalPosition: item.value,
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
                            />
                        )}

                        {displayAvatar && (
                            <BaseControl id="eb-testimonial-image-pos" label={__("Image Position", "essential-blocks")}>
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
