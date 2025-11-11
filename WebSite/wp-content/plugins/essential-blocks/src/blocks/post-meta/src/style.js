import {
    WRAPPER_MARGIN,
    WRAPPER_PADDING,
    WRAPPER_BORDER_SHADOW,
    WRAPPER_BG,
    META_ALIGNMENT,
    METAGAP,
    AUTHOR_PICTURE_BORDER,
    AUTHOR_PICTURE_SIZE
} from "./constants/constants";
import {
    META_LABEL,
    META_VALUE
} from "./constants/typographyPrefixConstants";

import {
    softMinifyCssStrings,
    generateTypographyStyles,
    generateDimensionsControlStyles,
    generateBorderShadowStyles,
    generateResponsiveAlignStyles,
    generateBackgroundControlStyles,
    generateResponsiveRangeStyles,
    StyleComponent,
} from "@essential-blocks/controls";

export default function Style(props) {
    const { attributes, setAttributes, name, isContentEnabled } = props;

    const {
        blockId,
        metaLabelColor,
        metaValueColor,
        enableContents,
        metaIconColor,
        metaIconSize,
        showAuthorPicture,
        authorPictureBorderRadius
    } = attributes;

    // CSS/styling Codes Starts from Here
    const {
        dimensionStylesDesktop: wrapperMarginStylesDesktop,
        dimensionStylesTab: wrapperMarginStylesTab,
        dimensionStylesMobile: wrapperMarginStylesMobile,
    } = generateDimensionsControlStyles({
        controlName: WRAPPER_MARGIN,
        styleFor: "margin",
        attributes,
    });

    const {
        dimensionStylesDesktop: wrapperPaddingStylesDesktop,
        dimensionStylesTab: wrapperPaddingStylesTab,
        dimensionStylesMobile: wrapperPaddingStylesMobile,
    } = generateDimensionsControlStyles({
        controlName: WRAPPER_PADDING,
        styleFor: "padding",
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
        // noShadow: true,
    });

    //Generate Background
    const {
        backgroundStylesDesktop: wrapperBackgroundStylesDesktop,
        hoverBackgroundStylesDesktop: wrapperHoverBackgroundStylesDesktop,
        backgroundStylesTab: wrapperBackgroundStylesTab,
        hoverBackgroundStylesTab: wrapperHoverBackgroundStylesTab,
        backgroundStylesMobile: wrapperBackgroundStylesMobile,
        hoverBackgroundStylesMobile: wrapperHoverBackgroundStylesMobile,
        bgTransitionStyle: wrapperBgTransitionStyle,
    } = generateBackgroundControlStyles({
        attributes,
        controlName: WRAPPER_BG,
        noOverlay: true,
    });

    const {
        typoStylesDesktop: labelTypoStylesDesktop,
        typoStylesTab: labelTypoStylesTab,
        typoStylesMobile: labelTypoStylesMobile,
    } = generateTypographyStyles({
        attributes,
        prefixConstant: META_LABEL,
        defaultFontSize: 18,
    });

    const {
        typoStylesDesktop: valueTypoStylesDesktop,
        typoStylesTab: valueTypoStylesTab,
        typoStylesMobile: valueTypoStylesMobile,
    } = generateTypographyStyles({
        attributes,
        prefixConstant: META_VALUE,
        defaultFontSize: 18,
    });

    const {
        alignStylesDesktop: postMetaInlineAlignDesktop,
        alignStylesTab: postMetaInlineAlignTab,
        alignStylesMobile: postMetaInlineAlignMobile,
    } = generateResponsiveAlignStyles({
        controlName: META_ALIGNMENT,
        property: "justify-content",
        attributes,
    });

    const {
        alignStylesDesktop: postMetaStackedAlignDesktop,
        alignStylesTab: postMetaStackedAlignTab,
        alignStylesMobile: postMetaStackedAlignMobile,
    } = generateResponsiveAlignStyles({
        controlName: META_ALIGNMENT,
        property: "align-items",
        attributes,
    });

    const {
        rangeStylesDesktop: metaGapRightDesktop,
        rangeStylesTab: metaGapRightTab,
        rangeStylesMobile: metaGapRightMobile,
    } = generateResponsiveRangeStyles({
        controlName: METAGAP,
        property: "margin-right",
        attributes,
        noUnits: true
    });

    const {
        rangeStylesDesktop: metaGapBottomDesktop,
        rangeStylesTab: metaGapBottomTab,
        rangeStylesMobile: metaGapBottomMobile,
    } = generateResponsiveRangeStyles({
        controlName: METAGAP,
        property: "margin-bottom",
        attributes,
        noUnits: true
    });

    // Author picture border styles
    const {
        stylesDesktop: authorPictureBorderDesktop,
        stylesTab: authorPictureBorderTab,
        stylesMobile: authorPictureBorderMobile,
        stylesHoverDesktop: authorPictureBorderHoverDesktop,
        stylesHoverTab: authorPictureBorderHoverTab,
        stylesHoverMobile: authorPictureBorderHoverMobile,
        transitionStyle: authorPictureBorderTransition,
    } = generateBorderShadowStyles({
        controlName: AUTHOR_PICTURE_BORDER,
        attributes,
    });

    // Author picture size styles
    const {
        rangeStylesDesktop: authorPictureSizeDesktop,
        rangeStylesTab: authorPictureSizeTab,
        rangeStylesMobile: authorPictureSizeMobile,
    } = generateResponsiveRangeStyles({
        controlName: AUTHOR_PICTURE_SIZE,
        property: "width",
        attributes,
    });

    const {
        rangeStylesDesktop: authorPictureHeightDesktop,
        rangeStylesTab: authorPictureHeightTab,
        rangeStylesMobile: authorPictureHeightMobile,
    } = generateResponsiveRangeStyles({
        controlName: AUTHOR_PICTURE_SIZE,
        property: "height",
        attributes,
    });


    // wrapper styles css in strings ⬇
    const wrapperStylesDesktop = `
		.eb-post-meta-wrapper.${blockId}{
			${wrapperMarginStylesDesktop}
			${wrapperPaddingStylesDesktop}
			${wrapperBackgroundStylesDesktop}
			${wrapperBDShadowDesktop}
			transition: ${wrapperBgTransitionStyle}, ${wrapperBDShadowTransition};
		}
		.eb-post-meta-wrapper.${blockId}:hover {
			${wrapperHoverBackgroundStylesDesktop}
			${wrapperBDShadowHoverDesktop}
		}
	`;
    const wrapperStylesTab = `
		.eb-post-meta-wrapper.${blockId}{
			${wrapperMarginStylesTab}
			${wrapperPaddingStylesTab}
			${wrapperBackgroundStylesTab}
			${wrapperBDShadowTab}
		}
		.eb-post-meta-wrapper.${blockId}:hover {
			${wrapperHoverBackgroundStylesTab}
			${wrapperBDShadowHoverTab}
		}
	`;
    const wrapperStylesMobile = `
		.eb-post-meta-wrapper.${blockId} {
			${wrapperMarginStylesMobile}
			${wrapperPaddingStylesMobile}
			${wrapperBackgroundStylesMobile}
			${wrapperBDShadowMobile}
		}
		.eb-post-meta-wrapper.${blockId}:hover {
			${wrapperHoverBackgroundStylesMobile}
			${wrapperBDShadowHoverMobile}
		}
	`;

    const elementList = enableContents.map((item) => {
        return `.eb-post-meta-wrapper.${blockId} .eb-post-metadata-${item} {
            ${isContentEnabled(item) && `order: ${enableContents.indexOf(item) + 1}`};
        }`;
    });

    const metaLabelDesktop = `
        .eb-post-meta-wrapper.${blockId} .eb-post-metadata .eb-post-metadata-label {
            color: ${metaLabelColor};
            ${labelTypoStylesDesktop}
        }
        .eb-post-meta-wrapper.${blockId} .eb-post-metadata .eb-post-metadata-icon {
            color: ${metaIconColor};
            font-size: ${metaIconSize}px;
            margin-right: 5px;
        }
    `;

    const metaLabelTab = `
        .eb-post-meta-wrapper.${blockId} .eb-post-metadata .eb-post-metadata-label {
            ${labelTypoStylesTab}
        }
    `;

    const metaLabelMobile = `
        .eb-post-meta-wrapper.${blockId} .eb-post-metadata .eb-post-metadata-label {
            ${labelTypoStylesMobile}
        }
    `;

    const metaValueDesktop = `
        .eb-post-meta-wrapper.${blockId} .eb-post-metadata .eb-post-metadata-value {
            color: ${metaValueColor};
            ${valueTypoStylesDesktop}
        }
    `;

    const metaValueTab = `
        .eb-post-meta-wrapper.${blockId} .eb-post-metadata .eb-post-metadata-value {
            ${valueTypoStylesTab}
        }
    `;

    const metaValueMobile = `
        .eb-post-meta-wrapper.${blockId} .eb-post-metadata .eb-post-metadata-value {
            ${valueTypoStylesMobile}
        }
    `;

    const postMetaDesktop = `
        .eb-post-meta-wrapper.${blockId} .eb-post-metadata.eb-post-meta-inline {
            ${postMetaInlineAlignDesktop}
        }

        .eb-post-meta-wrapper.${blockId} .eb-post-metadata.eb-post-meta-stacked {
            ${postMetaStackedAlignDesktop}
        }

        .eb-post-meta-wrapper.${blockId} .eb-post-metadata.eb-post-meta-inline > div {
            ${metaGapRightDesktop.replace(/(\d+);/, "$1px;")}
        }

        .eb-post-meta-wrapper.${blockId} .eb-post-metadata.eb-post-meta-stacked > div {
            ${metaGapBottomDesktop.replace(/(\d+);/, "$1px;")}
        }
    `;

    // Author picture styles
    const authorPictureDesktop = showAuthorPicture ? `
        .eb-post-meta-wrapper.${blockId} .eb-author-avatar {
            ${authorPictureSizeDesktop.replace(/(\d+);/, "$1px;")}
            ${authorPictureHeightDesktop.replace(/(\d+);/, "$1px;")}
            border-radius: ${authorPictureBorderRadius}%;
            object-fit: cover;
            ${authorPictureBorderDesktop}
            transition: ${authorPictureBorderTransition};
        }

        .eb-post-meta-wrapper.${blockId} .eb-author-avatar:hover {
            ${authorPictureBorderHoverDesktop}
        }

        .eb-post-meta-wrapper.${blockId} .eb-author-stacked-layout {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .eb-post-meta-wrapper.${blockId} .eb-author-stacked-layout .eb-author-picture {
            flex-shrink: 0;
        }

        .eb-post-meta-wrapper.${blockId} .eb-author-stacked-layout .eb-author-meta-content {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 2px;
        }

        .eb-post-meta-wrapper.${blockId} .eb-author-stacked-layout .eb-author-info {
            display: flex;
            align-items: center;
            gap: 5px;
        }

        .eb-post-meta-wrapper.${blockId} .eb-author-inline-layout {
            display: flex;
            align-items: center;
            gap: 5px;
        }

        .eb-post-meta-wrapper.${blockId} .eb-author-inline-layout .eb-author-picture {
            display: inline-flex;
            align-items: center;
        }
    ` : '';

    const postMetaTab = `
        .eb-post-meta-wrapper.${blockId} .eb-post-metadata.eb-post-meta-inline {
            ${postMetaInlineAlignTab}
        }

        .eb-post-meta-wrapper.${blockId} .eb-post-metadata.eb-post-meta-stacked {
            ${postMetaStackedAlignTab}
        }

        .eb-post-meta-wrapper.${blockId} .eb-post-metadata.eb-post-meta-inline > div {
            ${metaGapRightTab.replace(/(\d+);/, "$1px;")}
        }

        .eb-post-meta-wrapper.${blockId} .eb-post-metadata.eb-post-meta-stacked > div {
            ${metaGapBottomTab.replace(/(\d+);/, "$1px;")}
        }
    `;

    const authorPictureTab = showAuthorPicture ? `
        .eb-post-meta-wrapper.${blockId} .eb-author-avatar {
            ${authorPictureSizeTab.replace(/(\d+);/, "$1px;")}
            ${authorPictureHeightTab.replace(/(\d+);/, "$1px;")}
            ${authorPictureBorderTab}
        }

        .eb-post-meta-wrapper.${blockId} .eb-author-avatar:hover {
            ${authorPictureBorderHoverTab}
        }
    ` : '';

    const postMetaMobile = `
        .eb-post-meta-wrapper.${blockId} .eb-post-metadata.eb-post-meta-inline {
            ${postMetaInlineAlignMobile}
        }

        .eb-post-meta-wrapper.${blockId} .eb-post-metadata.eb-post-meta-stacked {
            ${postMetaStackedAlignMobile}
        }

        .eb-post-meta-wrapper.${blockId} .eb-post-metadata.eb-post-meta-inline > div {
            ${metaGapRightMobile.replace(/(\d+);/, "$1px;")}
        }

        .eb-post-meta-wrapper.${blockId} .eb-post-metadata.eb-post-meta-stacked > div {
            ${metaGapBottomMobile.replace(/(\d+);/, "$1px;")}
        }
    `;

    const authorPictureMobile = showAuthorPicture ? `
        .eb-post-meta-wrapper.${blockId} .eb-author-avatar {
            ${authorPictureSizeMobile.replace(/(\d+);/, "$1px;")}
            ${authorPictureHeightMobile.replace(/(\d+);/, "$1px;")}
            ${authorPictureBorderMobile}
        }

        .eb-post-meta-wrapper.${blockId} .eb-author-avatar:hover {
            ${authorPictureBorderHoverMobile}
        }
    ` : '';


    // all css styles for large screen width (desktop/laptop) in strings ⬇
    const desktopAllStyles = softMinifyCssStrings(`
        ${elementList.join('\n')}
        ${wrapperStylesDesktop}
        ${metaLabelDesktop}
        ${metaValueDesktop}
        ${postMetaDesktop}
        ${authorPictureDesktop}
	`);

    // all css styles for Tab in strings ⬇
    const tabAllStyles = softMinifyCssStrings(`
		${wrapperStylesTab}
        ${metaLabelTab}
        ${metaValueTab}
        ${postMetaTab}
        ${authorPictureTab}
	`);

    // all css styles for Mobile in strings ⬇
    const mobileAllStyles = softMinifyCssStrings(`
		${wrapperStylesMobile}
        ${metaLabelMobile}
        ${metaValueMobile}
        ${postMetaMobile}
        ${authorPictureMobile}
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
