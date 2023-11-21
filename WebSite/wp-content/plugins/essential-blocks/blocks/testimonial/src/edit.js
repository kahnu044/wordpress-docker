/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useEffect } from "@wordpress/element";
import { useBlockProps, RichText, MediaUpload } from "@wordpress/block-editor";
import { Button } from "@wordpress/components";
import { select } from "@wordpress/data";

/**
 * Internal dependencies
 */
import classnames from "classnames";

import Inspector from "./inspector";

const {
    //
    softMinifyCssStrings,
    generateBackgroundControlStyles,
    generateDimensionsControlStyles,
    generateTypographyStyles,
    generateResponsiveRangeStyles,
    generateBorderShadowStyles,
    // mimmikCssForPreviewBtnClick,
    duplicateBlockIdFix,
} = window.EBControls;

import { WrpBdShadow, TestimonialWrapBg, QUOTE_SIZE, IMG_WIDTH, ImgBdShadow, RATING_SIZE, IMG_GAP } from "./constants";

import QuoteSVG from "./quoteIconSVG";

const Edit = (props) => {
    const { attributes, setAttributes, className, clientId, isSelected } = props;
    const {
        resOption,
        blockId,
        blockMeta,
        avaterContainerFontSize,
        displayAvatar,
        avatarInline,
        avatarPosition,
        avatarAlign,
        borderRadius,
        avatarOrder,
        imageId,
        imageUrl,
        userName,
        companyName,
        description,
        descTextAlign,
        userInfoAlign,
        textAlign,
        userInfoPos,
        imagePosition,
        userNameColor,
        descriptionColor,
        enableQuote,
        quoteColor,
        quoteSize,
        quoteSizeUnit,
        companyColor,
        quoteHorizontalPosition,
        quoteVerticalPosition,
        classHook,
        layoutPreset,
        imgWidth_Range,
        img_Bdr_Bottom,
        img_Bdr_Top,
        img_Bdr_Left,
        img_Bdr_Right,
        img_Bdr_Unit,
        imgWidth_Unit,

        TABimgWidth_Range,
        TABimg_Bdr_Bottom,
        TABimg_Bdr_Top,
        TABimg_Bdr_Left,
        TABimg_Bdr_Right,
        TABimg_Bdr_Unit,
        TABimgWidth_Unit,

        MOBimgWidth_Range,
        MOBimg_Bdr_Bottom,
        MOBimg_Bdr_Top,
        MOBimg_Bdr_Left,
        MOBimg_Bdr_Right,
        MOBimg_Bdr_Unit,
        MOBimgWidth_Unit,
        showRating,
        rating,
        ratingColor,
        ratingIndivisual,
        ratingPosition,
        imageOverlayColor,
    } = attributes;

    // this useEffect is for creating a unique id for each block's unique className by a random unique number
    useEffect(() => {
        const BLOCK_PREFIX = "eb-testimonial";
        duplicateBlockIdFix({
            BLOCK_PREFIX,
            blockId,
            setAttributes,
            select,
            clientId,
        });
    }, []);

    //Generate Author Typography
    const {
        typoStylesDesktop: usernameTypoStylesDesktop,
        typoStylesTab: usernameTypoStylesTab,
        typoStylesMobile: usernameTypoStylesMobile,
    } = generateTypographyStyles({
        attributes,
        prefixConstant: "username",
    });

    //Generate Comapny Typography
    const {
        typoStylesDesktop: companyTypoStylesDesktop,
        typoStylesTab: companyTypoStylesTab,
        typoStylesMobile: companyTypoStylesMobile,
    } = generateTypographyStyles({
        attributes,
        prefixConstant: "company",
    });

    //Generate Description Typography
    const {
        typoStylesDesktop: descriptionTypoStylesDesktop,
        typoStylesTab: descriptionTypoStylesTab,
        typoStylesMobile: descriptionTypoStylesMobile,
    } = generateTypographyStyles({
        attributes,
        prefixConstant: "description",
    });

    //Generate Margin
    const {
        dimensionStylesDesktop: wrapperMarginStylesDesktop,
        dimensionStylesTab: wrapperMarginStylesTab,
        dimensionStylesMobile: wrapperMarginStylesMobile,
    } = generateDimensionsControlStyles({
        controlName: "margin",
        styleFor: "margin",
        attributes,
    });

    //Generate Padding
    const {
        dimensionStylesDesktop: wrapperPaddingStylesDesktop,
        dimensionStylesTab: wrapperPaddingStylesTab,
        dimensionStylesMobile: wrapperPaddingStylesMobile,
    } = generateDimensionsControlStyles({
        controlName: "padding",
        styleFor: "padding",
        attributes,
    });

    //Generate Border Shadow
    const {
        styesDesktop: bdShadowStyesDesktop,
        styesTab: bdShadowStyesTab,
        styesMobile: bdShadowStyesMobile,
        stylesHoverDesktop: bdShadowStylesHoverDesktop,
        stylesHoverTab: bdShadowStylesHoverTab,
        stylesHoverMobile: bdShadowStylesHoverMobile,
        transitionStyle: bdShadowTransitionStyle,
    } = generateBorderShadowStyles({
        controlName: WrpBdShadow,
        attributes,
        // noShadow: true,
        // noBorder: true,
    });

    const {
        styesDesktop: imgShadowStyesDesktop,
        styesTab: imgShadowStyesTab,
        styesMobile: imgShadowStyesMobile,
        stylesHoverDesktop: imgShadowStylesHoverDesktop,
        stylesHoverTab: imgShadowStylesHoverTab,
        stylesHoverMobile: imgShadowStylesHoverMobile,
        transitionStyle: imgShadowTransitionStyle,
    } = generateBorderShadowStyles({
        controlName: ImgBdShadow,
        attributes,
        // noShadow: true,
        // noBorder: true,
    });

    // responsive range controller
    const {
        rangeStylesDesktop: ratingSizeStylesDesktop,
        rangeStylesTab: ratingSizeStylesTab,
        rangeStylesMobile: ratingSizeStylesMobile,
    } = generateResponsiveRangeStyles({
        controlName: RATING_SIZE,
        property: "font-size",
        attributes,
    });
    const {
        rangeStylesDesktop: quoteHeightStylesDesktop,
        rangeStylesTab: quoteHeightStylesTab,
        rangeStylesMobile: quoteHeightStylesMobile,
    } = generateResponsiveRangeStyles({
        controlName: QUOTE_SIZE,
        property: "height",
        attributes,
    });
    const {
        rangeStylesDesktop: quoteWidthStylesDesktop,
        rangeStylesTab: quoteWidthStylesTab,
        rangeStylesMobile: quoteWidthStylesMobile,
    } = generateResponsiveRangeStyles({
        controlName: QUOTE_SIZE,
        property: "width",
        attributes,
    });
    const {
        rangeStylesDesktop: imgWidthStylesDesktop,
        rangeStylesTab: imgWidthStylesTab,
        rangeStylesMobile: imgWidthStylesMobile,
    } = generateResponsiveRangeStyles({
        controlName: IMG_WIDTH,
        property: "width",
        attributes,
    });
    const {
        rangeStylesDesktop: imgGapStylesDesktop,
        rangeStylesTab: imgGapStylesTab,
        rangeStylesMobile: imgGapStylesMobile,
    } = generateResponsiveRangeStyles({
        controlName: IMG_GAP,
        property: "gap",
        attributes,
    });
    const {
        rangeStylesDesktop: imgHeightStylesDesktop,
        rangeStylesTab: imgHeightStylesTab,
        rangeStylesMobile: imgHeightStylesMobile,
    } = generateResponsiveRangeStyles({
        controlName: IMG_WIDTH,
        property: "height",
        attributes,
    });

    //Generate Background
    const {
        backgroundStylesDesktop,
        hoverBackgroundStylesDesktop,
        backgroundStylesTab,
        hoverBackgroundStylesTab,
        backgroundStylesMobile,
        hoverBackgroundStylesMobile,
        overlayStylesDesktop,
        hoverOverlayStylesDesktop,
        overlayStylesTab,
        hoverOverlayStylesTab,
        overlayStylesMobile,
        hoverOverlayStylesMobile,
        bgTransitionStyle,
        ovlTransitionStyle,
    } = generateBackgroundControlStyles({
        attributes,
        controlName: TestimonialWrapBg,
    });

    /**
     * Assign CSS in variable for use in Markup
     */
    const containerStyle = `
		.eb-testimonial-wrapper.${blockId} {
			${backgroundStylesDesktop}
			${wrapperMarginStylesDesktop}
			${wrapperPaddingStylesDesktop}
			${bdShadowStyesDesktop}
			transition:${bgTransitionStyle}, ${bdShadowTransitionStyle};
		}

		.eb-testimonial-wrapper.${blockId}:hover{
			${hoverBackgroundStylesDesktop}
			${bdShadowStylesHoverDesktop}
		}

		.eb-testimonial-wrapper.${blockId}:before{
			${overlayStylesDesktop}
			transition:${ovlTransitionStyle};
		}

		.eb-testimonial-wrapper.${blockId}:hover:before{
			${hoverOverlayStylesDesktop}
		}
	`;

    const tabContainerStyle = `
		.eb-testimonial-wrapper.${blockId} {
			${wrapperMarginStylesTab}
			${wrapperPaddingStylesTab}
			${bdShadowStyesTab}
			${backgroundStylesTab}
		}

		.eb-testimonial-wrapper.${blockId}:hover{
			${hoverBackgroundStylesTab}
			${bdShadowStylesHoverTab}
		}

		.eb-testimonial-wrapper.${blockId}:before{
			${overlayStylesTab}
		}

		.eb-testimonial-wrapper.${blockId}:hover:before{
			${hoverOverlayStylesTab}
		}
	`;

    const mobContainerStyle = `
		.eb-testimonial-wrapper.${blockId} {
			${wrapperMarginStylesMobile}
			${wrapperPaddingStylesMobile}
			${bdShadowStyesMobile}
			${backgroundStylesMobile}
		}

		.eb-testimonial-wrapper.${blockId}:hover{
			${hoverBackgroundStylesMobile}
			${bdShadowStylesHoverMobile}
		}

		.eb-testimonial-wrapper.${blockId}:before{
			${overlayStylesMobile}
		}

		.eb-testimonial-wrapper.${blockId}:hover:before{
			${hoverOverlayStylesMobile}
		}
	`;

    const avatarContainerStyle = `
		.${blockId} .eb-avatar-container {
			order: ${avatarOrder};
			justify-content: ${avatarPosition};
			align-items: ${avatarAlign};
			font-size: ${avaterContainerFontSize}px;
			flex-direction: ${avatarInline ? "row" : "column"};
		}
	`;
    const imageContainerStyle = `
        .${blockId} .eb-avatar-container {
            ${imgGapStylesDesktop}
        }
		.${blockId} .image-container {
			order: ${imagePosition};
			display: ${displayAvatar ? "block" : "none"};
		}
		.${blockId} .eb-avatar-style,
        .eb-testimonial-wrapper.${blockId}.layout-preset-2 .image-container .eb-avatar-style {
			background-image: url(${imageUrl});
			border-radius: ${borderRadius}%;
			display: ${imageUrl ? "block" : "none"};
            ${imgWidthStylesDesktop}
            ${imgHeightStylesDesktop}
            ${imgShadowStyesDesktop}
		}

        .${blockId}.layout-preset-2 .image-container::before,
        .${blockId}.layout-preset-2 .image-container .eb-avatar-style {
            ${imgWidthStylesDesktop}
            ${imgHeightStylesDesktop}
        }

        .${blockId}.layout-preset-2 .image-container::before {
            width: calc(${imgWidth_Range}${imgWidth_Unit} - (${img_Bdr_Left}${img_Bdr_Unit} + ${img_Bdr_Right}${img_Bdr_Unit}));
            height: calc(${imgWidth_Range}${imgWidth_Unit} - (${img_Bdr_Top}${img_Bdr_Unit} + ${img_Bdr_Bottom}${img_Bdr_Unit}));
            background-color: ${imageOverlayColor};
        }

	`;
    const imageContainerStyleTab = `
        .${blockId} .eb-avatar-container {
            ${imgGapStylesTab}
        }
		.${blockId} .eb-avatar-style,
        .eb-testimonial-wrapper.${blockId}.layout-preset-2 .image-container .eb-avatar-style {
            ${imgWidthStylesTab}
            ${imgHeightStylesTab}
            ${imgShadowStyesTab}
		}

        .${blockId}.layout-preset-2 .image-container::before {
            width: calc(${TABimgWidth_Range ? TABimgWidth_Range : imgWidth_Range}${TABimgWidth_Unit} - (${
        TABimg_Bdr_Left ? TABimg_Bdr_Left : img_Bdr_Left
    }${TABimg_Bdr_Unit} + ${TABimg_Bdr_Right ? TABimg_Bdr_Right : img_Bdr_Right}${TABimg_Bdr_Unit}));
            height: calc(${TABimgWidth_Range ? TABimgWidth_Range : imgWidth_Range}${TABimgWidth_Unit} - (${
        TABimg_Bdr_Top ? TABimg_Bdr_Top : img_Bdr_Top
    }${TABimg_Bdr_Unit} + ${TABimg_Bdr_Bottom ? TABimg_Bdr_Bottom : img_Bdr_Bottom}${TABimg_Bdr_Unit}));
        }

	`;
    const imageContainerStyleMobile = `
        .${blockId} .eb-avatar-container {
            ${imgGapStylesMobile}
        }
		.${blockId} .eb-avatar-style,
        .eb-testimonial-wrapper.${blockId}.layout-preset-2 .image-container .eb-avatar-style {
            ${imgWidthStylesMobile}
            ${imgHeightStylesMobile}
            ${imgShadowStyesMobile}
		}
        .${blockId}.layout-preset-2 .image-container::before {
            width: calc(${MOBimgWidth_Range ? MOBimgWidth_Range : imgWidth_Range}${MOBimgWidth_Unit} - (${
        MOBimg_Bdr_Left ? MOBimg_Bdr_Left : img_Bdr_Left
    }${MOBimg_Bdr_Unit} + ${MOBimg_Bdr_Right ? MOBimg_Bdr_Right : img_Bdr_Right}${MOBimg_Bdr_Unit}));
            height: calc(${MOBimgWidth_Range ? MOBimgWidth_Range : imgWidth_Range}${MOBimgWidth_Unit} - (${
        MOBimg_Bdr_Top ? MOBimg_Bdr_Top : img_Bdr_Top
    }${MOBimg_Bdr_Unit} + ${MOBimg_Bdr_Bottom ? MOBimg_Bdr_Bottom : img_Bdr_Bottom}${MOBimg_Bdr_Unit}));
        }

	`;

    const userInfoStyle = `
		.${blockId} .eb-userinfo-container {
			text-align: ${textAlign};
			justify-content: ${userInfoPos};
			align-self: ${userInfoAlign};
		}
	`;

    const userNameStyle = `
		.${blockId} .eb-testimonial-username {
			${usernameTypoStylesDesktop}
			color: ${userNameColor};
		}
	`;

    const userNameStyleTab = `
		.${blockId} .eb-testimonial-username {
			${usernameTypoStylesTab}
		}
	`;

    const userNameStyleMobile = `
		.${blockId} .eb-testimonial-username {
			${usernameTypoStylesMobile}
		}
	`;

    const ratingStyleDesktop = `
        .${blockId} .eb-testimonial-rating {
            text-align: ${descTextAlign};
        }

        ${
            ratingPosition === 2
                ? `.${blockId} .eb-testimonial-rating {
                    order: 2;
                }
                .${blockId} .eb-testimonial-description {
                    order: 3;
                }`
                : ``
        }
        ${
            ratingPosition === 3
                ? `.${blockId} .eb-testimonial-rating {
                    order: ${ratingPosition};
                }
                .${blockId} .eb-testimonial-description {
                    order: 2;
                }`
                : ``
        }


        .${blockId} .eb-testimonial-rating i {
            ${ratingSizeStylesDesktop}
        }
        .${blockId} .eb-testimonial-rating.rating-1 i:nth-child(-n+1),
		.${blockId} .eb-testimonial-rating.rating-2 i:nth-child(-n+2),
		.${blockId} .eb-testimonial-rating.rating-3 i:nth-child(-n+3),
		.${blockId} .eb-testimonial-rating.rating-4 i:nth-child(-n+4),
		.${blockId} .eb-testimonial-rating.rating-5 i:nth-child(-n+5) {
			color: ${ratingColor};
		}
	`;
    const ratingStyleTab = `
        .${blockId} .eb-testimonial-rating i {
            ${ratingSizeStylesTab}
        }
	`;
    const ratingStyleMobile = `
        .${blockId} .eb-testimonial-rating i {
            ${ratingSizeStylesMobile}
        }
	`;
    const companyNameStyle = `
		.${blockId} .eb-testimonial-company {
			${companyTypoStylesDesktop}
			color: ${companyColor};
		}
	`;
    const companyNameStyleTab = `
		.${blockId} .eb-testimonial-company {
			${companyTypoStylesTab}
		}
	`;
    const companyNameStyleMobile = `
		.${blockId} .eb-testimonial-company {
			${companyTypoStylesMobile}
		}
	`;

    const descriptionStyle = `
		.${blockId} .eb-description-container p {
			${descriptionTypoStylesDesktop}
			text-align: ${descTextAlign};
			color: ${descriptionColor};
			padding-right: 20px;
			word-break: break-word;
		}
		${
            quoteHorizontalPosition === "flex-end"
                ? `.${blockId} .eb-description-container {
				flex-direction: row-reverse;
			}
			.${blockId} .eb-description-container .eb-testimonial-quote-style {
				transform: rotateY(180deg);
			}`
                : quoteHorizontalPosition === "center"
                ? quoteVerticalPosition == 1
                    ? `.${blockId} .eb-description-container {
						flex-direction: column;
					}`
                    : `.${blockId} .eb-description-container {
						flex-direction: column-reverse;
					}`
                : `.${blockId} .eb-description-container {
					flex-direction: row;
				}`
        }
	`;
    const descriptionStyleTab = `
		.${blockId} .eb-description-container p {
			${descriptionTypoStylesTab}
		}
	`;
    const descriptionStyleMobile = `
		.${blockId} .eb-description-container p {
			${descriptionTypoStylesMobile}
		}
	`;

    const quoteStyle = `
		.${blockId} .eb-testimonial-quote-style:before {
			content: none;
		}
		.${blockId} .eb-testimonial-quote-style svg {
			fill: ${quoteColor};
			${quoteHeightStylesDesktop}
			${quoteWidthStylesDesktop}
		}
	`;

    const quoteStyleTab = `
		.${blockId} .eb-testimonial-quote-style svg {
			${quoteHeightStylesTab}
			${quoteWidthStylesTab}
		}
	`;

    const quoteStyleMobile = `
		.${blockId} .eb-testimonial-quote-style svg {
			${quoteHeightStylesMobile}
			${quoteWidthStylesMobile}
		}
	`;

    const desktopAllStyles = softMinifyCssStrings(`
		${containerStyle}
		${avatarContainerStyle}
		${imageContainerStyle}
		${userInfoStyle}
		${userNameStyle}
		${companyNameStyle}
		${descriptionStyle}
		${quoteStyle}
		${ratingStyleDesktop}
	`);

    const tabAllStyles = softMinifyCssStrings(`
		${tabContainerStyle}
		${userNameStyleTab}
		${companyNameStyleTab}
		${descriptionStyleTab}
		${quoteStyleTab}
        ${imageContainerStyleTab}
        ${ratingStyleTab}
	`);

    const mobileAllStyles = softMinifyCssStrings(`
		${mobContainerStyle}
		${userNameStyleMobile}
		${companyNameStyleMobile}
		${descriptionStyleMobile}
		${quoteStyleMobile}
        ${imageContainerStyleMobile}
        ${ratingStyleMobile}
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

    const blockProps = useBlockProps({
        className: classnames(className, `eb-guten-block-main-parent-wrapper`),
    });

    const replaceString = (str, find, replace) => {
        return str.replace(new RegExp(find, "g"), replace);
    };

    blockProps.className = replaceString(blockProps.className, "eb-testimonial-wrapper", "");
    blockProps.className = replaceString(blockProps.className, blockId, "");

    return (
        <>
            {isSelected && <Inspector attributes={attributes} setAttributes={setAttributes} />}
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
                <div className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`}>
                    <div className={`eb-testimonial-wrapper ${blockId} ${layoutPreset}`} data-id={blockId}>
                        <div className="eb-testimonial-container">
                            <div className="eb-avatar-container">
                                <div className="image-container">
                                    <div className="eb-avatar-style" />
                                    <MediaUpload
                                        onSelect={(media) =>
                                            setAttributes({
                                                imageUrl: media.url,
                                                imageId: media.id,
                                            })
                                        }
                                        type="image"
                                        value={imageId}
                                        render={({ open }) =>
                                            !imageUrl && (
                                                <Button
                                                    className="eb-testimonial-image components-button"
                                                    label={__("Upload Image", "essential-blocks")}
                                                    icon="format-image"
                                                    onClick={open}
                                                />
                                            )
                                        }
                                    />
                                </div>

                                {layoutPreset !== "layout-preset-3" && (
                                    <div className="eb-userinfo-container">
                                        <RichText
                                            tagName="p"
                                            className="eb-testimonial-username"
                                            value={userName}
                                            onChange={(newName) =>
                                                setAttributes({
                                                    userName: newName,
                                                })
                                            }
                                        />

                                        <RichText
                                            tagName="p"
                                            className="eb-testimonial-company"
                                            value={companyName}
                                            onChange={(newName) =>
                                                setAttributes({
                                                    companyName: newName,
                                                })
                                            }
                                        />

                                        {showRating && !ratingIndivisual && rating != 0 && (
                                            <div className={`eb-testimonial-rating rating-${rating}`}>
                                                <i className="fa fa-star" aria-hidden="true"></i>
                                                <i className="fa fa-star" aria-hidden="true"></i>
                                                <i className="fa fa-star" aria-hidden="true"></i>
                                                <i className="fa fa-star" aria-hidden="true"></i>
                                                <i className="fa fa-star" aria-hidden="true"></i>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className="eb-description-container">
                                {enableQuote && (
                                    <div className="eb-testimonial-quote-style">
                                        <QuoteSVG />
                                    </div>
                                )}

                                <RichText
                                    tagName="p"
                                    className="eb-testimonial-description"
                                    value={description}
                                    onChange={(newText) => setAttributes({ description: newText })}
                                />
                                {showRating && ratingIndivisual && rating != 0 && (
                                    <div className={`eb-testimonial-rating rating-${rating}`}>
                                        <i className="fa fa-star" aria-hidden="true"></i>
                                        <i className="fa fa-star" aria-hidden="true"></i>
                                        <i className="fa fa-star" aria-hidden="true"></i>
                                        <i className="fa fa-star" aria-hidden="true"></i>
                                        <i className="fa fa-star" aria-hidden="true"></i>
                                    </div>
                                )}
                            </div>

                            {layoutPreset == "layout-preset-3" && (
                                <div className="eb-userinfo-container">
                                    <RichText
                                        tagName="p"
                                        className="eb-testimonial-username"
                                        value={userName}
                                        onChange={(newName) => setAttributes({ userName: newName })}
                                    />

                                    <RichText
                                        tagName="p"
                                        className="eb-testimonial-company"
                                        value={companyName}
                                        onChange={(newName) =>
                                            setAttributes({
                                                companyName: newName,
                                            })
                                        }
                                    />

                                    {showRating && !ratingIndivisual && rating != 0 && (
                                        <div className={`eb-testimonial-rating rating-${rating}`}>
                                            <i className="fa fa-star" aria-hidden="true"></i>
                                            <i className="fa fa-star" aria-hidden="true"></i>
                                            <i className="fa fa-star" aria-hidden="true"></i>
                                            <i className="fa fa-star" aria-hidden="true"></i>
                                            <i className="fa fa-star" aria-hidden="true"></i>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Edit;
