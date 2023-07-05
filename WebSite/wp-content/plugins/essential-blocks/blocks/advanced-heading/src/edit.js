/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useEffect } from "@wordpress/element";
import {
    BlockControls,
    AlignmentToolbar,
    RichText,
    useBlockProps,
} from "@wordpress/block-editor";
import { select } from "@wordpress/data";

/**
 * Internal depencencies
 */
import classnames from "classnames";

import Inspector from "./inspector";
import {
    WRAPPER_BG,
    WRAPPER_MARGIN,
    WRAPPER_PADDING,
    WRAPPER_BORDER_SHADOW,
    TITLE_MARGIN,
    SUBTITLE_MARGIN,
    SEPARATOR_MARGIN,
    SEPARATOR_LINE_SIZE,
    SEPARATOR_ICON_SIZE,
    SEPARATOR_WIDTH,
} from "./constants/constants";
import {
    TITLE_TYPOGRAPHY,
    SUBTITLE_TYPOGRAPHY,
} from "./constants/typographyPrefixConstants";

/**
 * External depencencies
 */
const {
    // classnames,
    softMinifyCssStrings,
    generateTypographyStyles,
    generateDimensionsControlStyles,
    generateBorderShadowStyles,
    generateResponsiveRangeStyles,
    generateBackgroundControlStyles,
    // mimmikCssForPreviewBtnClick,
    duplicateBlockIdFix,
    DynamicInputValueHandler,
} = window.EBControls;

export default function Edit(props) {
    const {
        attributes,
        setAttributes,
        className,
        clientId,
        isSelected,
    } = props;
    const {
        resOption,
        blockId,
        blockMeta,
        preset,
        align,
        tagName,
        titleText,
        subtitleTagName,
        subtitleText,
        displaySubtitle,
        displaySeperator,
        titleColor,
        titleHoverColor,
        subtitleColor,
        subtitleHoverColor,
        separatorColor,
        separatorHoverColor,
        seperatorPosition,
        seperatorType,
        seperatorStyle,
        separatorIcon,
        classHook,

        blockRoot,
    } = attributes;

    // this useEffect is for creating a unique id for each block's unique className by a random unique number
    useEffect(() => {
        const BLOCK_PREFIX = "eb-advance-heading";
        duplicateBlockIdFix({
            BLOCK_PREFIX,
            blockId,
            setAttributes,
            select,
            clientId,
        });
    }, []);

    const blockProps = useBlockProps({
        className: classnames(className, `eb-guten-block-main-parent-wrapper`),
    });

    // CSS/styling Codes Starts from Here
    const {
        typoStylesDesktop: titleTypographyDesktop,
        typoStylesTab: titleTypographyTab,
        typoStylesMobile: titleTypographyMobile,
    } = generateTypographyStyles({
        attributes,
        prefixConstant: TITLE_TYPOGRAPHY,
    });

    const {
        typoStylesDesktop: subtitleTypographyDesktop,
        typoStylesTab: subtitleTypographyTab,
        typoStylesMobile: subtitleTypographyMobile,
    } = generateTypographyStyles({
        attributes,
        prefixConstant: SUBTITLE_TYPOGRAPHY,
    });

    /* Wrapper Margin */
    const {
        dimensionStylesDesktop: wrapperMarginDesktop,
        dimensionStylesTab: wrapperMarginTab,
        dimensionStylesMobile: wrapperMarginMobile,
    } = generateDimensionsControlStyles({
        controlName: WRAPPER_MARGIN,
        styleFor: "margin",
        attributes,
    });

    /* Wrapper Padding */
    const {
        dimensionStylesDesktop: wrapperPaddingDesktop,
        dimensionStylesTab: wrapperPaddingTab,
        dimensionStylesMobile: wrapperPaddingMobile,
    } = generateDimensionsControlStyles({
        controlName: WRAPPER_PADDING,
        styleFor: "padding",
        attributes,
    });

    /* Title Margin */
    const {
        dimensionStylesDesktop: titleMarginDesktop,
        dimensionStylesTab: titleMarginTab,
        dimensionStylesMobile: titleMarginMobile,
    } = generateDimensionsControlStyles({
        controlName: TITLE_MARGIN,
        styleFor: "margin",
        attributes,
    });

    /* Subtitle Margin */
    const {
        dimensionStylesDesktop: subtitleMarginDesktop,
        dimensionStylesTab: subtitleMarginTab,
        dimensionStylesMobile: subtitleMarginMobile,
    } = generateDimensionsControlStyles({
        controlName: SUBTITLE_MARGIN,
        styleFor: "margin",
        attributes,
    });

    /* Separator Margin */
    const {
        dimensionStylesDesktop: separatorMarginDesktop,
        dimensionStylesTab: separatorMarginTab,
        dimensionStylesMobile: separatorMarginMobile,
    } = generateDimensionsControlStyles({
        controlName: SEPARATOR_MARGIN,
        styleFor: "margin",
        attributes,
    });

    const {
        styesDesktop: wrapperBDShadowDesktop,
        styesTab: wrapperBDShadowTab,
        styesMobile: wrapperBDShadowMobile,
        stylesHoverDesktop: wrapperBDShadowHoverDesktop,
        stylesHoverTab: wrapperBDShadowHoverTab,
        stylesHoverMobile: wrapperBDShadowHoverMobile,
        transitionStyle: wrapperBDShadowTransition,
    } = generateBorderShadowStyles({
        controlName: WRAPPER_BORDER_SHADOW,
        attributes,
    });

    // responsive range controller Separator Line Border Size
    const {
        rangeStylesDesktop: separatorLineSizeDesktop,
        rangeStylesTab: separatorLineSizeTab,
        rangeStylesMobile: separatorLineSizeMobile,
    } = generateResponsiveRangeStyles({
        controlName: SEPARATOR_LINE_SIZE,
        property: "border-width",
        attributes,
    });

    // responsive range controller Separator Icon Size
    const {
        rangeStylesDesktop: separatorIconSizeDesktop,
        rangeStylesTab: separatorIconSizeTab,
        rangeStylesMobile: separatorIconSizeMobile,
    } = generateResponsiveRangeStyles({
        controlName: SEPARATOR_ICON_SIZE,
        property: "font-size",
        attributes,
    });

    // responsive range controller Separator Width
    const {
        rangeStylesDesktop: separatorLineWidthDesktop,
        rangeStylesTab: separatorLineWidthTab,
        rangeStylesMobile: separatorLineWidthMobile,
    } = generateResponsiveRangeStyles({
        controlName: SEPARATOR_WIDTH,
        property: "width",
        attributes,
    });

    //Generate Background
    const {
        backgroundStylesDesktop: wrapperBackgroundStylesDesktop,
        hoverBackgroundStylesDesktop: wrapperHoverBackgroundStylesDesktop,
        backgroundStylesTab: wrapperBackgroundStylesTab,
        hoverBackgroundStylesTab: wrapperHoverBackgroundStylesTab,
        backgroundStylesMobile: wrapperBackgroundStylesMobile,
        hoverBackgroundStylesMobile: wrapperHoverBackgroundStylesMobile,
        overlayStylesDesktop: wrapperOverlayStylesDesktop,
        hoverOverlayStylesDesktop: wrapperHoverOverlayStylesDesktop,
        overlayStylesTab: wrapperOverlayStylesTab,
        hoverOverlayStylesTab: wrapperHoverOverlayStylesTab,
        overlayStylesMobile: wrapperOverlayStylesMobile,
        hoverOverlayStylesMobile: wrapperHoverOverlayStylesMobile,
        bgTransitionStyle: wrapperBgTransitionStyle,
        ovlTransitionStyle: wrapperOvlTransitionStyle,
    } = generateBackgroundControlStyles({
        attributes,
        controlName: WRAPPER_BG,
    });

    // wrapper styles css in strings ⬇
    const wrapperStylesDesktop = `
		.eb-advance-heading-wrapper.${blockId}{
			position: relative;
			text-align: ${align};
			${wrapperMarginDesktop}
			${wrapperPaddingDesktop}
			${wrapperBDShadowDesktop}
			${wrapperBackgroundStylesDesktop}
			transition:${wrapperBgTransitionStyle}, ${wrapperBDShadowTransition};
		}

		.eb-advance-heading-wrapper.${blockId}:hover {
			${wrapperBDShadowHoverDesktop}
			${wrapperHoverBackgroundStylesDesktop}
		}

		.eb-advance-heading-wrapper.${blockId}:before{
			${wrapperOverlayStylesDesktop}
			transition:${wrapperOvlTransitionStyle};
		}

		.eb-advance-heading-wrapper.${blockId}:hover:before{
			${wrapperHoverOverlayStylesDesktop}
		}
	`;
    const wrapperStylesTab = `
		.eb-advance-heading-wrapper.${blockId}{
			${wrapperMarginTab}
			${wrapperPaddingTab}
			${wrapperBDShadowTab}
			${wrapperBackgroundStylesTab}
		}
		.eb-advance-heading-wrapper.${blockId}:hover {
			${wrapperBDShadowHoverTab}
			${wrapperHoverBackgroundStylesTab}
		}

		.eb-advance-heading-wrapper.${blockId}:before{
			${wrapperOverlayStylesTab}
		}

		.eb-advance-heading-wrapper.${blockId}:hover:before{
			${wrapperHoverOverlayStylesTab}
		}
	`;
    const wrapperStylesMobile = `
		.eb-advance-heading-wrapper.${blockId}{
			${wrapperMarginMobile}
			${wrapperPaddingMobile}
			${wrapperBDShadowMobile}
			${wrapperBackgroundStylesMobile}
		}
		.eb-advance-heading-wrapper.${blockId}:hover {
			${wrapperBDShadowHoverMobile}
			${wrapperHoverBackgroundStylesMobile}
		}

		.eb-advance-heading-wrapper.${blockId}:before{
			${wrapperOverlayStylesMobile}
		}

		.eb-advance-heading-wrapper.${blockId}:hover:before{
			${wrapperHoverOverlayStylesMobile}
		}
	`;

    // Title styles css in strings ⬇
    const titleStylesDesktop = `
		.eb-advance-heading-wrapper.${blockId} .eb-ah-title {
			text-align: ${align};
			color: ${titleColor};
			${titleTypographyDesktop}
			${titleMarginDesktop}
		}
		.eb-advance-heading-wrapper.${blockId}:hover .eb-ah-title {
			color: ${titleHoverColor};
		}
	`;

    const titleStylesTab = `
		.eb-advance-heading-wrapper.${blockId} .eb-ah-title {
			${titleTypographyTab}
			${titleMarginTab}
		}
	`;

    const titleStylesMobile = `
		.eb-advance-heading-wrapper.${blockId} .eb-ah-title {
			${titleTypographyMobile}
			${titleMarginMobile}
		}
	`;

    // Sub Title styles css in strings ⬇
    const subtitleStylesDesktop = `
		.eb-advance-heading-wrapper.${blockId} .eb-ah-subtitle {
			text-align: ${align};
			color: ${subtitleColor};
			${subtitleTypographyDesktop}
			${subtitleMarginDesktop}
		}
		.eb-advance-heading-wrapper.${blockId}:hover .eb-ah-subtitle {
			color: ${subtitleHoverColor};
		}
	`;

    const subtitleStylesTab = `
		.eb-advance-heading-wrapper.${blockId} .eb-ah-subtitle {
			${subtitleTypographyTab}
			${subtitleMarginTab}
		}
	`;

    const subtitleStylesMobile = `
		.eb-advance-heading-wrapper.${blockId} .eb-ah-subtitle {
			${subtitleTypographyMobile}
			${subtitleMarginMobile}
		}
	`;

    // Separator styles css in strings ⬇
    const separatorStylesDesktop = `
		.eb-advance-heading-wrapper.${blockId} .eb-ah-separator {
			color: ${subtitleColor};
			${separatorMarginDesktop}
		}
		.eb-advance-heading-wrapper.${blockId} .eb-ah-separator.line {
			border-style: none none ${seperatorStyle};
			border-color: ${separatorColor};
			${separatorLineSizeDesktop}
			${separatorLineWidthDesktop}
			${align === "center" ? "margin-left: auto; margin-right: auto" : ""}
			${align === "right" ? "margin-left: auto; margin-right: 0" : ""}
		}
		.eb-advance-heading-wrapper.${blockId}:hover .eb-ah-separator.line {
			border-color: ${separatorHoverColor};
		}
		.eb-advance-heading-wrapper.${blockId} .eb-ah-separator.icon {
			text-align: ${align};
			color: ${separatorColor};
			${separatorIconSizeDesktop}
		}
		.eb-advance-heading-wrapper.${blockId}:hover .eb-ah-separator.icon {
			color: ${separatorHoverColor};
		}
	`;

    const separatorStylesTab = `
		.eb-advance-heading-wrapper.${blockId} .eb-ah-separator {
			${separatorMarginTab}
		}
		.eb-advance-heading-wrapper.${blockId} .eb-ah-separator.line {
			${separatorLineSizeTab}
			${separatorLineWidthTab}
		}
		.eb-advance-heading-wrapper.${blockId} .eb-ah-separator.icon {
			${separatorIconSizeTab}
		}
	`;

    const separatorStylesMobile = `
	.eb-advance-heading-wrapper.${blockId} .eb-ah-separator {
			${separatorMarginMobile}
		}
		.eb-advance-heading-wrapper.${blockId} .eb-ah-separator.line {
			${separatorLineSizeMobile}
			${separatorLineWidthMobile}
		}
		.eb-advance-heading-wrapper.${blockId} .eb-ah-separator.icon {
			${separatorIconSizeMobile}
		}
	`;

    // all css styles for large screen width (desktop/laptop) in strings ⬇
    const desktopAllStyles = softMinifyCssStrings(`
			${wrapperStylesDesktop}
			${titleStylesDesktop}
			${subtitleStylesDesktop}
			${separatorStylesDesktop}
		`);

    // all css styles for Tab in strings ⬇
    const tabAllStyles = softMinifyCssStrings(`
			${wrapperStylesTab}
			${titleStylesTab}
			${subtitleStylesTab}
			${separatorStylesTab}
		`);

    // all css styles for Mobile in strings ⬇
    const mobileAllStyles = softMinifyCssStrings(`
			${wrapperStylesMobile}
			${titleStylesMobile}
			${subtitleStylesMobile}
			${separatorStylesMobile}
		`);

    // Set All Style in "blockMeta" Attribute
    useEffect(() => {
        const styleObject = {
            desktop: desktopAllStyles,
            tab: tabAllStyles,
            mobile: mobileAllStyles,
        };
        if (JSON.stringify(blockMeta) != JSON.stringify(styleObject)) {
            setAttributes({ blockMeta: styleObject });
        }
    }, [attributes]);

    return (
        <>
            {isSelected && (
                <>
                    <BlockControls>
                        <AlignmentToolbar
                            value={align}
                            onChange={(align) => setAttributes({ align })}
                            controls={["left", "center", "right"]}
                        />
                    </BlockControls>
                    <Inspector
                        attributes={attributes}
                        setAttributes={setAttributes}
                    />
                </>
            )}

            <div {...blockProps}>
                <style>
                    {`
				${desktopAllStyles}

				/* mimmikcssStart */

				${resOption === "Tablet" ? tabAllStyles : " "}
				${resOption === "Mobile" ? tabAllStyles + mobileAllStyles : " "}

				/* mimmikcssEnd */

				@media all and (max-width: 1024px) {

					/* tabcssStart */
					${softMinifyCssStrings(tabAllStyles)}
					/* tabcssEnd */

				}

				@media all and (max-width: 767px) {

					/* mobcssStart */
					${softMinifyCssStrings(mobileAllStyles)}
					/* mobcssEnd */

				}
				`}
                </style>
                <div
                    className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`}
                >
                    <div
                        className={`eb-advance-heading-wrapper ${blockId} ${preset}`}
                        data-id={blockId}
                    >
                        {displaySeperator && seperatorPosition === "top" && (
                            <div className={"eb-ah-separator " + seperatorType}>
                                {seperatorType === "icon" && (
                                    <i
                                        className={`${separatorIcon
                                            ? separatorIcon
                                            : "fas fa-arrow-circle-down"
                                            }`}
                                    ></i>
                                )}
                            </div>
                        )}

                        <DynamicInputValueHandler
                            value={titleText}
                            tagName={tagName}
                            className="eb-ah-title"
                            allowedFormats={[
                                "core/bold",
                                "core/italic",
                                "core/link",
                                "core/strikethrough",
                                "core/underline",
                                "core/text-color",
                            ]}
                            onChange={(titleText) =>
                                setAttributes({ titleText })
                            }
                            readOnly={true}
                        />

                        {displaySubtitle && (
                            <DynamicInputValueHandler
                                tagName={subtitleTagName}
                                className="eb-ah-subtitle"
                                value={subtitleText}
                                allowedFormats={[
                                    "core/bold",
                                    "core/italic",
                                    "core/link",
                                    "core/strikethrough",
                                    "core/underline",
                                    "core/text-color",
                                ]}
                                onChange={(subtitleText) =>
                                    setAttributes({ subtitleText })
                                }
                                readOnly={true}
                            />
                        )}
                        {displaySeperator && seperatorPosition === "bottom" && (
                            <div className={"eb-ah-separator " + seperatorType}>
                                {seperatorType === "icon" && (
                                    <i
                                        className={`${separatorIcon
                                            ? separatorIcon
                                            : "fas fa-arrow-circle-down"
                                            }`}
                                    ></i>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
