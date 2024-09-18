/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { MediaUpload } from "@wordpress/block-editor";
import {
    ToggleControl,
    Button,
    BaseControl,
    ButtonGroup,
} from "@wordpress/components";
import {
    ColorControl,
    DynamicInputControl,
    EBIconPicker,
    ImageAvatar,
    InspectorPanel
} from "@essential-blocks/controls";

import {
    MEDIA_TYPES,
} from "./constants";

const Inspector = ({ attributes, setAttributes }) => {
    const { clickable, accordionColor,
        titleColor, iconColor,
        title,
        titlePrefixType,
        titlePrefixIcon,
        titlePrefixText,
        titlePrefixColor,
        titlePrefixImgUrl,
        titlePrefixImgId,
        titlePrefixImgAlt,

        titleSuffixType,
        titleSuffixIcon,
        titleSuffixText,
        titleSuffixIconColor,
        titleSuffixImgUrl,
        titleSuffixImgId,
        titleSuffixImgAlt
    } = attributes;

    return (
        <InspectorPanel>
            <InspectorPanel.General>
                <>
                    <InspectorPanel.PanelBody title={__("General", "essential-blocks")} initialOpen={true}>
                        <ToggleControl
                            label={__("Default Open?", "essential-blocks")}
                            checked={clickable}
                            onChange={() => setAttributes({ clickable: !clickable })}
                        />
                        <DynamicInputControl
                            label="Title Text"
                            attrName="titleText"
                            inputValue={title}
                            setAttributes={setAttributes}
                            onChange={(text) => setAttributes({ title: text })}
                        />
                    </InspectorPanel.PanelBody>

                    <InspectorPanel.PanelBody title={__("Title", "essential-blocks")} initialOpen={false}>
                        <InspectorPanel.PanelBody title={__("Title Prefix", "essential-blocks")}>
                            <BaseControl id="eb-accordion-image-icon">
                                <ButtonGroup id="eb-accordion-image-icon">
                                    {MEDIA_TYPES.map(
                                        (
                                            { label, value },
                                            index
                                        ) => (
                                            <Button
                                                key={index}
                                                isSecondary={
                                                    titlePrefixType !== value
                                                }
                                                isPrimary={
                                                    titlePrefixType === value
                                                }
                                                onClick={() =>
                                                    setAttributes({
                                                        titlePrefixType: value,
                                                    })
                                                }
                                            >
                                                {label}
                                            </Button>
                                        )
                                    )}
                                </ButtonGroup>
                            </BaseControl>

                            {titlePrefixType !== "none" && (
                                <>
                                    {titlePrefixType === "icon" && (
                                        <EBIconPicker
                                            value={titlePrefixIcon}
                                            attributeName={'titlePrefixIcon'}
                                        />
                                    )}

                                    {titlePrefixType === "text" && (
                                        <>
                                            <DynamicInputControl
                                                label="Prefix Text"
                                                attrName="titlePrefixText"
                                                inputValue={titlePrefixText}
                                                setAttributes={setAttributes}
                                                onChange={(text) =>
                                                    setAttributes({
                                                        titlePrefixText: text,
                                                    })
                                                }
                                            />
                                        </>
                                    )}

                                    {(titlePrefixType === "text" ||
                                        titlePrefixType === "icon") && (
                                            <>
                                                <ColorControl
                                                    label={__(
                                                        "Color",
                                                        "essential-blocks"
                                                    )}
                                                    color={titlePrefixColor}
                                                    attributeName={'titlePrefixColor'}
                                                />
                                            </>
                                        )}

                                    {titlePrefixType === "image" &&
                                        !titlePrefixImgUrl && (
                                            <MediaUpload
                                                onSelect={({
                                                    id,
                                                    url,
                                                    alt,
                                                }) =>
                                                    setAttributes({
                                                        titlePrefixImgUrl: url,
                                                        titlePrefixImgId: id,
                                                        titlePrefixImgAlt: alt,
                                                    })
                                                }
                                                type="image"
                                                value={titlePrefixImgId}
                                                render={({
                                                    open,
                                                }) => {
                                                    return (
                                                        <Button
                                                            className="eb-background-control-inspector-panel-img-btn components-button"
                                                            label={__(
                                                                "Upload Image",
                                                                "essential-blocks"
                                                            )}
                                                            icon="format-image"
                                                            onClick={
                                                                open
                                                            }
                                                        />
                                                    );
                                                }}
                                            />
                                        )}

                                    {titlePrefixType === "image" && titlePrefixImgUrl && (
                                        <>
                                            <ImageAvatar
                                                imageUrl={titlePrefixImgUrl}
                                                onDeleteImage={() =>
                                                    setAttributes({
                                                        titlePrefixImgUrl: null,
                                                    })
                                                }
                                            />
                                        </>
                                    )}
                                </>
                            )}
                        </InspectorPanel.PanelBody>

                        <InspectorPanel.PanelBody title={__("Title Suffix", "essential-blocks")}>
                            <BaseControl id="eb-accordion-image-icon">
                                <ButtonGroup id="eb-accordion-image-icon">
                                    {MEDIA_TYPES.map(
                                        (
                                            { label, value },
                                            index
                                        ) => (
                                            <Button
                                                key={index}
                                                isSecondary={
                                                    titleSuffixType !== value
                                                }
                                                isPrimary={
                                                    titleSuffixType === value
                                                }
                                                onClick={() =>
                                                    setAttributes({
                                                        titleSuffixType: value,
                                                    })
                                                }
                                            >
                                                {label}
                                            </Button>
                                        )
                                    )}
                                </ButtonGroup>
                            </BaseControl>

                            {titleSuffixType !== "none" && (
                                <>


                                    {titleSuffixType === "icon" && (
                                        <EBIconPicker
                                            value={titleSuffixIcon}
                                            attributeName={'titleSuffixIcon'}
                                        />
                                    )}

                                    {titleSuffixType === "text" && (
                                        <>
                                            <DynamicInputControl
                                                label="Suffix Text"
                                                attrName="titleSuffixText"
                                                inputValue={titleSuffixText}
                                                setAttributes={setAttributes}
                                                onChange={(text) =>
                                                    setAttributes({
                                                        titleSuffixText: text,
                                                    })
                                                }
                                            />

                                            {/* <TypographyDropdown
                                                                baseLabel="Text Typography"
                                                                typographyPrefixConstant={
                                                                    typoPrefix_number
                                                                }
                                                                resRequiredProps={
                                                                    resRequiredProps
                                                                }
                                                            /> */}
                                        </>
                                    )}

                                    {(titleSuffixType === "text" ||
                                        titleSuffixType === "icon") && (
                                            <>
                                                <ColorControl
                                                    label={__(
                                                        "Color",
                                                        "essential-blocks"
                                                    )}
                                                    color={titleSuffixIconColor}
                                                    attributeName={'titleSuffixIconColor'}
                                                />
                                            </>
                                        )}

                                    {titleSuffixType === "image" &&
                                        !titleSuffixImgUrl && (
                                            <MediaUpload
                                                onSelect={({
                                                    id,
                                                    url,
                                                    alt,
                                                }) =>
                                                    setAttributes({
                                                        titleSuffixImgUrl: url,
                                                        titleSuffixImgId: id,
                                                        titleSuffixImgAlt: alt,
                                                    })
                                                }
                                                type="image"
                                                value={titleSuffixImgId}
                                                render={({
                                                    open,
                                                }) => {
                                                    return (
                                                        <Button
                                                            className="eb-background-control-inspector-panel-img-btn components-button"
                                                            label={__(
                                                                "Upload Image",
                                                                "essential-blocks"
                                                            )}
                                                            icon="format-image"
                                                            onClick={
                                                                open
                                                            }
                                                        />
                                                    );
                                                }}
                                            />
                                        )}

                                    {titleSuffixType === "image" && titleSuffixImgUrl && (
                                        <>
                                            <ImageAvatar
                                                imageUrl={titleSuffixImgUrl}
                                                onDeleteImage={() =>
                                                    setAttributes({
                                                        titleSuffixImgUrl: null,
                                                    })
                                                }
                                            />
                                        </>
                                    )}
                                </>
                            )}
                        </InspectorPanel.PanelBody>

                    </InspectorPanel.PanelBody>
                </>
            </InspectorPanel.General>
            <InspectorPanel.Style>
                <>
                    <InspectorPanel.PanelBody initialOpen={true}>
                        <ColorControl
                            label={__(
                                "Accordion Background Color",
                                "essential-blocks"
                            )}
                            color={accordionColor}
                            attributeName={'accordionColor'}
                        />
                        <ColorControl
                            label={__("Accordion Title Color", "essential-blocks")}
                            color={titleColor}
                            attributeName={'titleColor'}
                        />
                        <ColorControl
                            label={__("Accordion Icon Color", "essential-blocks")}
                            color={iconColor}
                            attributeName={'iconColor'}
                        />
                    </InspectorPanel.PanelBody>
                </>
            </InspectorPanel.Style>
        </InspectorPanel>
    );
};

export default Inspector;
