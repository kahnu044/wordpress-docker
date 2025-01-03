
import {
    WRAPPER_BG,
    WRAPPER_MARGIN,
    WRAPPER_PADDING,
    WRAPPER_BORDER_SHADOW,
    TITLE_MARGIN,
    TITLE1_PADDING,
    TITLE1_BORDER_SHADOW,
    TITLE2_PADDING,
    TITLE2_BORDER_SHADOW,
    TITLE3_PADDING,
    TITLE3_BORDER_SHADOW,
    SUBTITLE_MARGIN,
    SEPARATOR_MARGIN,
    SEPARATOR_LINE_SIZE,
    SEPARATOR_ICON_SIZE,
    SEPARATOR_WIDTH,
    ALIGNMENT,
} from "./constants/constants";
import {
    TITLE_TYPOGRAPHY,
    TITLE2_TYPOGRAPHY,
    TITLE3_TYPOGRAPHY,
    SUBTITLE_TYPOGRAPHY,
} from "./constants/typographyPrefixConstants";

/**
 * External depencencies
 */
import {
    softMinifyCssStrings,
    generateTypographyStyles,
    generateDimensionsControlStyles,
    generateBorderShadowStyles,
    generateResponsiveRangeStyles,
    generateBackgroundControlStyles,
    generateResponsiveAlignStyles,
    StyleComponent,
    getTextColorCss,
    getBorderColorCss
} from "@essential-blocks/controls";

export default function Style(props) {
    const { attributes, setAttributes, name } = props;
    const {
        resOption,
        blockId,
        blockMeta,
        preset,
        effects,
        marqueeSpeed,
        marqueePauseOnHover,
        tagName,
        titleText,
        subtitleTagName,
        subtitleText,
        displaySubtitle,
        displaySeperator,
        titleColor,
        titleHoverColor,
        titleBgColor,
        titleHoverBgColor,
        title2Color,
        title2HoverColor,
        title2BgColor,
        title2HoverBgColor,
        title3Color,
        title3HoverColor,
        title3BgColor,
        title3HoverBgColor,
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
        typoStylesDesktop: title2TypographyDesktop,
        typoStylesTab: title2TypographyTab,
        typoStylesMobile: title2TypographyMobile,
    } = generateTypographyStyles({
        attributes,
        prefixConstant: TITLE2_TYPOGRAPHY,
    });
    const {
        typoStylesDesktop: title3TypographyDesktop,
        typoStylesTab: title3TypographyTab,
        typoStylesMobile: title3TypographyMobile,
    } = generateTypographyStyles({
        attributes,
        prefixConstant: TITLE3_TYPOGRAPHY,
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

    /* Title Margin & Padding */
    const {
        dimensionStylesDesktop: titleMarginDesktop,
        dimensionStylesTab: titleMarginTab,
        dimensionStylesMobile: titleMarginMobile,
    } = generateDimensionsControlStyles({
        controlName: TITLE_MARGIN,
        styleFor: "margin",
        attributes,
    });
    const {
        dimensionStylesDesktop: title1PaddingDesktop,
        dimensionStylesTab: title1PaddingTab,
        dimensionStylesMobile: title1PaddingMobile,
    } = generateDimensionsControlStyles({
        controlName: TITLE1_PADDING,
        styleFor: "padding",
        attributes,
    });
    const {
        dimensionStylesDesktop: title2PaddingDesktop,
        dimensionStylesTab: title2PaddingTab,
        dimensionStylesMobile: title2PaddingMobile,
    } = generateDimensionsControlStyles({
        controlName: TITLE2_PADDING,
        styleFor: "padding",
        attributes,
    });
    const {
        dimensionStylesDesktop: title3PaddingDesktop,
        dimensionStylesTab: title3PaddingTab,
        dimensionStylesMobile: title3PaddingMobile,
    } = generateDimensionsControlStyles({
        controlName: TITLE3_PADDING,
        styleFor: "padding",
        attributes,
    });

    // generateBorderShadowStyles for Titles ⬇
    const {
        styesDesktop: title1BDShadowDesktop,
        styesTab: title1BDShadowTab,
        styesMobile: title1BDShadowMobile,
        stylesHoverDesktop: title1BDShadowHoverDesktop,
        stylesHoverTab: title1BDShadowHoverTab,
        stylesHoverMobile: title1BDShadowHoverMobile,
        transitionStyle: title1BDShadowTransitionStyle,
    } = generateBorderShadowStyles({
        controlName: TITLE1_BORDER_SHADOW,
        attributes,
    });
    const {
        styesDesktop: title2BDShadowDesktop,
        styesTab: title2BDShadowTab,
        styesMobile: title2BDShadowMobile,
        stylesHoverDesktop: title2BDShadowHoverDesktop,
        stylesHoverTab: title2BDShadowHoverTab,
        stylesHoverMobile: title2BDShadowHoverMobile,
        transitionStyle: title2BDShadowTransitionStyle,
    } = generateBorderShadowStyles({
        controlName: TITLE2_BORDER_SHADOW,
        attributes,
    });
    const {
        styesDesktop: title3BDShadowDesktop,
        styesTab: title3BDShadowTab,
        styesMobile: title3BDShadowMobile,
        stylesHoverDesktop: title3BDShadowHoverDesktop,
        stylesHoverTab: title3BDShadowHoverTab,
        stylesHoverMobile: title3BDShadowHoverMobile,
        transitionStyle: title3BDShadowTransitionStyle,
    } = generateBorderShadowStyles({
        controlName: TITLE3_BORDER_SHADOW,
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

    const {
        alignStylesDesktop: alignDesktop,
        alignStylesTab: alignTab,
        alignStylesMobile: alignMobile,
    } = generateResponsiveAlignStyles({
        controlName: ALIGNMENT,
        property: "",
        attributes,
    });

    // wrapper styles css in strings ⬇
    const wrapperStylesDesktop = `
		.eb-advance-heading-wrapper.${blockId}{
			position: relative;
			text-align: ${alignDesktop};
			${wrapperMarginDesktop}
			${wrapperPaddingDesktop}
			${wrapperBackgroundStylesDesktop}
			${wrapperBDShadowDesktop}
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
			text-align: ${alignTab};
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
			text-align: ${alignMobile};
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

    const handleTitleLineHeight = () => {
        const css = `.eb-advance-heading-wrapper.${blockId} .eb-ah-title {line-height: 0}`
        if (typeof titleTypographyDesktop === 'string' && titleTypographyDesktop.trim().length > 0 && titleTypographyDesktop.includes('line-height')) {
            return css
        }
        else if (typeof title2TypographyDesktop === 'string' && title2TypographyDesktop.trim().length > 0 && title2TypographyDesktop.includes('line-height')) {
            return css
        }
        else if (typeof title3TypographyDesktop === 'string' && title3TypographyDesktop.trim().length > 0 && title3TypographyDesktop.includes('line-height')) {
            return css
        }
        return ''
    }

    // Title styles css in strings ⬇
    const titleStylesDesktop = `
        ${effects === 'marquee' ? (
            `.eb-advance-heading-wrapper.${blockId}.marquee .eb-ah-title {
                animation-duration: ${marqueeSpeed}s;
            }
            .eb-advance-heading-wrapper.${blockId}.marquee .eb-ah-title:hover {
                animation-play-state: ${marqueePauseOnHover === true ? 'pause' : 'running'};
            }`
        ) : ''}
		.eb-advance-heading-wrapper.${blockId} .eb-ah-title {
			text-align: ${alignDesktop};
			${titleMarginDesktop}
        }
        ${handleTitleLineHeight()}
        .eb-advance-heading-wrapper.${blockId} .eb-ah-title .first-title {
            background: ${titleBgColor};
            ${getTextColorCss(titleColor)}
			${titleTypographyDesktop}
			${title1PaddingDesktop}
			${title1BDShadowDesktop}
			transition:${title1BDShadowTransitionStyle};
        }
		.eb-advance-heading-wrapper.${blockId}:hover .eb-ah-title .first-title {
            background: ${titleHoverBgColor};
            ${getTextColorCss(titleHoverColor)}
			${title1BDShadowHoverDesktop}
		}
        .eb-advance-heading-wrapper.${blockId} .eb-ah-title .second-title {
            background: ${title2BgColor};
            ${getTextColorCss(title2Color)}
			${title2TypographyDesktop}
			${title2PaddingDesktop}
			${title2BDShadowDesktop}
			transition:${title2BDShadowTransitionStyle};
        }
		.eb-advance-heading-wrapper.${blockId}:hover .eb-ah-title .second-title {
            background: ${title2HoverBgColor};
            ${getTextColorCss(title2HoverColor)}
			${title2BDShadowHoverDesktop}
		}
        .eb-advance-heading-wrapper.${blockId} .eb-ah-title .third-title {
            background: ${title3BgColor};
            ${getTextColorCss(title3Color)}
			${title3TypographyDesktop}
			${title3PaddingDesktop}
			${title3BDShadowDesktop}
			transition:${title3BDShadowTransitionStyle};
        }
		.eb-advance-heading-wrapper.${blockId}:hover .eb-ah-title .third-title {
            background: ${title3HoverBgColor};
            ${getTextColorCss(title3HoverColor)}
			${title3BDShadowHoverDesktop}
		}
	`;

    const titleStylesTab = `
		.eb-advance-heading-wrapper.${blockId} .eb-ah-title {
			text-align: ${alignTab};
			${titleMarginTab}
        }
        .eb-advance-heading-wrapper.${blockId} .eb-ah-title .first-title {
			${titleTypographyTab}
			${title1PaddingTab}
			${title1BDShadowTab}
        }
		.eb-advance-heading-wrapper.${blockId}:hover .eb-ah-title .first-title {
			${title1BDShadowHoverTab}
		}
        .eb-advance-heading-wrapper.${blockId} .eb-ah-title .second-title {
			${title2TypographyTab}
			${title2PaddingTab}
			${title2BDShadowTab}
        }
		.eb-advance-heading-wrapper.${blockId}:hover .eb-ah-title .second-title {
			${title2BDShadowHoverTab}
		}
        .eb-advance-heading-wrapper.${blockId} .eb-ah-title .third-title {
			${title3TypographyTab}
			${title3PaddingTab}
			${title3BDShadowTab}
        }
		.eb-advance-heading-wrapper.${blockId}:hover .eb-ah-title .third-title {
			${title3BDShadowHoverTab}
		}
	`;

    const titleStylesMobile = `
		.eb-advance-heading-wrapper.${blockId} .eb-ah-title {
			text-align: ${alignMobile};
			${titleMarginMobile}
        }
        .eb-advance-heading-wrapper.${blockId} .eb-ah-title .first-title {
			${titleTypographyMobile}
			${title1PaddingMobile}
			${title1BDShadowMobile}
        }
		.eb-advance-heading-wrapper.${blockId}:hover .eb-ah-title .first-title {
			${title1BDShadowHoverMobile}
		}
        .eb-advance-heading-wrapper.${blockId} .eb-ah-title .second-title {
			${title2TypographyMobile}
			${title2PaddingMobile}
			${title2BDShadowMobile}
        }
		.eb-advance-heading-wrapper.${blockId}:hover .eb-ah-title .second-title {
			${title2BDShadowHoverMobile}
		}
        .eb-advance-heading-wrapper.${blockId} .eb-ah-title .third-title {
			${title3TypographyMobile}
			${title3PaddingMobile}
			${title3BDShadowMobile}
        }
		.eb-advance-heading-wrapper.${blockId}:hover .eb-ah-title .third-title {
			${title3BDShadowHoverMobile}
		}
	`;

    // Sub Title styles css in strings ⬇
    const subtitleStylesDesktop = `
		.eb-advance-heading-wrapper.${blockId} .eb-ah-subtitle {
			text-align: ${alignDesktop};
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
			text-align: ${alignTab};
			${subtitleTypographyTab}
			${subtitleMarginTab}
		}
	`;

    const subtitleStylesMobile = `
		.eb-advance-heading-wrapper.${blockId} .eb-ah-subtitle {
			text-align: ${alignMobile};
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
            ${getBorderColorCss(separatorColor)}
			${separatorLineSizeDesktop}
			${separatorLineWidthDesktop}
			${alignDesktop === "center" ? "margin-left: auto; margin-right: auto" : ""}
			${alignDesktop === "right" ? "margin-left: auto; margin-right: 0" : ""}
		}
		.eb-advance-heading-wrapper.${blockId}:hover .eb-ah-separator.line {
            ${getBorderColorCss(separatorHoverColor)}
		}
		.eb-advance-heading-wrapper.${blockId} .eb-ah-separator.icon {
			text-align: ${alignDesktop};
			${getTextColorCss(separatorColor)}
			${separatorIconSizeDesktop}
		}
		.eb-advance-heading-wrapper.${blockId}:hover .eb-ah-separator.icon {
            ${getTextColorCss(separatorHoverColor)}
		}
        .eb-advance-heading-wrapper.${blockId} .eb-ah-separator.icon > *{
			${getTextColorCss(separatorColor)}
		}
		.eb-advance-heading-wrapper.${blockId}:hover .eb-ah-separator.icon > *{
            ${getTextColorCss(separatorHoverColor)}
		}
	`;

    const separatorStylesTab = `
		.eb-advance-heading-wrapper.${blockId} .eb-ah-separator {
			${separatorMarginTab}
		}
		.eb-advance-heading-wrapper.${blockId} .eb-ah-separator.line {
			${separatorLineSizeTab}
			${separatorLineWidthTab}
            ${alignTab === "left" ? "margin-left: 0; margin-right: 0" : ""}
            ${alignTab === "center" ? "margin-left: auto; margin-right: auto" : ""}
			${alignTab === "right" ? "margin-left: auto; margin-right: 0" : ""}
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
            ${(alignMobile || alignTab) === "left" ? "margin-left: 0; margin-right: 0" : ""}
            ${(alignMobile || alignTab) === "center" ? "margin-left: auto; margin-right: auto" : ""}
			${(alignMobile || alignTab) === "right" ? "margin-left: auto; margin-right: 0" : ""}
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

    return (
        <>
            <StyleComponent
                attributes={attributes}
                setAttributes={setAttributes}
                desktopAllStyles={desktopAllStyles}
                tabAllStyles={tabAllStyles}
                mobileAllStyles={mobileAllStyles}
                blockName={name}
            />
        </>
    );
}
