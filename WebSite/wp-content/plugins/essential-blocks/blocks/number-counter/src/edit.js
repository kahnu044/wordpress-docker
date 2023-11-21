/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useEffect, useRef } from "@wordpress/element";
import { useBlockProps, RichText, MediaUpload } from "@wordpress/block-editor";
import { Button } from "@wordpress/components";
import { select } from "@wordpress/data";

/**
 * Internal dependencies
 */
import classnames from "classnames";

import Inspector from "./inspector";
import {
    typoPrefix_title,
    typoPrefix_number,
    typoPrefix_numPrefix,
    typoPrefix_numSuffix,
} from "./constants/typographyPrefixConstants";
import {
    wrapperPadding,
    wrapperMargin,
    mediaBgPadding,
    mediaBgMargin,
    mediaBgRadius,
} from "./constants/dimensionsConstants";

import { WrapBg } from "./constants/backgroundsConstants";
import { wrpBdShadow } from "./constants/borderShadowConstants";

import {
    rgNumTitle,
    rgNumPrefix,
    rgNumSuffix,

    //
    mediaIconSize,
    mediaImageWidth,
    mediaImageHeight,
    mediaContentGap,
} from "./constants/rangeNames";

const {
    //
    textInsideForEdit,
    softMinifyCssStrings,
    generateDimensionsControlStyles,
    generateTypographyStyles,
    generateBackgroundControlStyles,
    generateBorderShadowStyles,
    generateResponsiveRangeStyles,
    // mimmikCssForPreviewBtnClick,
    duplicateBlockIdFix,
} = window.EBControls;

const Edit = (props) => {
    const {
        isSelected,
        attributes,
        setAttributes,
        className,
        clientId,
    } = props;

    const {
        // responsive control attributes ⬇
        resOption,

        // blockId attribute for making unique className and other uniqueness ⬇
        blockId,

        // blockMeta is for keeping all the styles ⬇
        blockMeta,
        classHook,

        // counter settings attributes ⬇
        target,
        duration,
        counterTitle,
        counterSuffix,
        counterPrefix,
        startValue,
        isShowSeparator,
        separator,
        wrapperFlexDirection,

        // counter color attributes ⬇
        titleColor = "#fff",
        numberColor = "#fff",
        numPrefixColor,
        numSuffixColor,

        //
        [`${mediaImageWidth}Unit`]: mediaImgWidthUnit,
        [`TAB${mediaImageWidth}Unit`]: TABmediaImgWidthUnit,
        [`MOB${mediaImageWidth}Unit`]: MOBmediaImgWidthUnit,

        //
        rootFlexDirection,
        contentAlignment,
        mediaAlignSelf,
        contentsAlignSelf,

        //
        media,
        selectedIcon,
        useIconBg,
        iconBgType,
        imageUrl,
        imageId,

        //
        iconColor,
        iconBgColor,
        iconBgGradient,
        isMediaImgHeightAuto,

        //
        mIconZUnit,
        mIconZRange,
        TABmIconZUnit,
        TABmIconZRange,
        MOBmIconZUnit,
        MOBmIconZRange,
        counterTitleLevel,
        titleLevel,
    } = attributes;

    const counterRef = useRef(null);

    const CounterAnimation = () => {
        const time =
            duration && Math.floor(Math.abs(duration)) > 499
                ? Math.floor(Math.abs(duration)) - 200
                : 300;
        const endTarget = target ? Math.floor(Math.abs(target)) : 0;
        let cleanStartValue =
            startValue && Math.floor(Math.abs(startValue)) < endTarget
                ? Math.floor(Math.abs(startValue))
                : 0;
        const increaseBy = ((endTarget - cleanStartValue) / time) * 53;
        let timeoutIdInside;
        const timeoutId = setTimeout(() => {
            function updateCount() {
                cleanStartValue += increaseBy;
                counterRef.current.innerText = textInsideForEdit(
                    Math.floor(cleanStartValue),
                    isShowSeparator,
                    separator
                );
                if (cleanStartValue < endTarget) {
                    timeoutIdInside = setTimeout(() => {
                        updateCount();
                    }, 53);
                } else {
                    counterRef.current.innerText = textInsideForEdit(
                        endTarget,
                        isShowSeparator,
                        separator
                    );
                }
            }
            updateCount();
        }, 200);
        return () => {
            clearTimeout(timeoutId);
            clearTimeout(timeoutIdInside);
        };
    };

    useEffect(() => CounterAnimation(), [
        target,
        duration,
        startValue,
        separator,
        isShowSeparator,
        counterTitleLevel,
    ]);

    // this useEffect is for creating a unique blockId for each block's unique className
    useEffect(() => {
        const BLOCK_PREFIX = "eb-counter";
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

    //
    // CSS/styling Codes Starts from Here
    //

    // styles for generateTypographyStyles starts ⬇
    const {
        typoStylesDesktop: titleTypoStylesDesktop,
        typoStylesTab: titleTypoStylesTab,
        typoStylesMobile: titleTypoStylesMobile,
    } = generateTypographyStyles({
        attributes,
        prefixConstant: typoPrefix_title,
        defaultFontSize: 40,
    });

    const {
        typoStylesDesktop: numberTypoStylesDesktop,
        typoStylesTab: numberTypoStylesTab,
        typoStylesMobile: numberTypoStylesMobile,
    } = generateTypographyStyles({
        attributes,
        prefixConstant: typoPrefix_number,
        defaultFontSize: 40,
    });

    const {
        typoStylesDesktop: numPrefixTypoStylesDesktop,
        typoStylesTab: numPrefixTypoStylesTab,
        typoStylesMobile: numPrefixTypoStylesMobile,
    } = generateTypographyStyles({
        attributes,
        prefixConstant: typoPrefix_numPrefix,
    });

    const {
        typoStylesDesktop: numSuffixTypoStylesDesktop,
        typoStylesTab: numSuffixTypoStylesTab,
        typoStylesMobile: numSuffixTypoStylesMobile,
    } = generateTypographyStyles({
        attributes,
        prefixConstant: typoPrefix_numSuffix,
    });

    // styles for generateTypographyStyles end
    // styles for generateDimensionsControlStyles starts ⬇

    const {
        dimensionStylesDesktop: wrapperMarginStylesDesktop,
        dimensionStylesTab: wrapperMarginStylesTab,
        dimensionStylesMobile: wrapperMarginStylesMobile,
    } = generateDimensionsControlStyles({
        attributes,
        controlName: wrapperMargin,
        styleFor: "margin",
    });

    const {
        dimensionStylesDesktop: wrapperPaddingStylesDesktop,
        dimensionStylesTab: wrapperPaddingStylesTab,
        dimensionStylesMobile: wrapperPaddingStylesMobile,
    } = generateDimensionsControlStyles({
        attributes,
        controlName: wrapperPadding,
        styleFor: "padding",
    });

    const {
        dimensionStylesDesktop: mediaBgPaddingDesktop,
        dimensionStylesTab: mediaBgPaddingTab,
        dimensionStylesMobile: mediaBgPaddingMobile,
    } = generateDimensionsControlStyles({
        attributes,
        controlName: mediaBgPadding,
        styleFor: "padding",
    });

    const {
        dimensionStylesDesktop: mediaRadiusStylesDesktop,
        dimensionStylesTab: mediaRadiusStylesTab,
        dimensionStylesMobile: mediaRadiusStylesMobile,
    } = generateDimensionsControlStyles({
        attributes,
        controlName: mediaBgRadius,
        styleFor: "border-radius",
    });

    const {
        dimensionStylesDesktop: mediaBgMarginStylesDesktop,
        dimensionStylesTab: mediaBgMarginStylesTab,
        dimensionStylesMobile: mediaBgMarginStylesMobile,
    } = generateDimensionsControlStyles({
        attributes,
        controlName: mediaBgMargin,
        styleFor: "margin",
    });

    // styles for generateDimensionsControlStyles end
    // styles for generateBackgroundControlStyles starts ⬇

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
        controlName: WrapBg,
    });

    // styles for generateBackgroundControlStyles end
    // styles for generateBorderShadowStyles starts ⬇

    const {
        styesDesktop: bdShadowStyesDesktop,
        styesTab: bdShadowStyesTab,
        styesMobile: bdShadowStyesMobile,
        stylesHoverDesktop: bdShadowStylesHoverDesktop,
        stylesHoverTab: bdShadowStylesHoverTab,
        stylesHoverMobile: bdShadowStylesHoverMobile,
        transitionStyle: bdShadowTransitionStyle,
    } = generateBorderShadowStyles({
        controlName: wrpBdShadow,
        attributes,
    });

    // styles for generateBorderShadowStyles end
    // styles for generateResponsiveRangeStyles starts ⬇

    const {
        rangeStylesDesktop: iconSizeDesktop,
        rangeStylesTab: iconSizeTab,
        rangeStylesMobile: iconSizeMobile,
    } = generateResponsiveRangeStyles({
        controlName: mediaIconSize,
        customUnit: "px",
        property: "font-size",
        attributes,
    });

    const {
        rangeStylesDesktop: contentMediaGapDesktop,
        rangeStylesTab: contentMediaGapTab,
        rangeStylesMobile: contentMediaGapMobile,
    } = generateResponsiveRangeStyles({
        controlName: mediaContentGap,
        customUnit: "px",
        property: "gap",
        attributes,
    });

    const {
        rangeStylesDesktop: mediaImgHeightDesktop,
        rangeStylesTab: mediaImgHeightTab,
        rangeStylesMobile: mediaImgHeightMobile,
    } = generateResponsiveRangeStyles({
        controlName: mediaImageHeight,
        property: "height",
        attributes,
    });

    const {
        rangeStylesDesktop: mediaImgWidthDesktop,
        rangeStylesTab: mediaImgWidthTab,
        rangeStylesMobile: mediaImgWidthMobile,
    } = generateResponsiveRangeStyles({
        controlName: mediaImageWidth,
        property: "width",
        attributes,
    });

    const {
        rangeStylesDesktop: numTitleGapDesktop,
        rangeStylesTab: numTitleGapTab,
        rangeStylesMobile: numTitleGapMobile,
    } = generateResponsiveRangeStyles({
        controlName: rgNumTitle,
        property: "gap",
        attributes,
    });

    const {
        rangeStylesDesktop: numPrefixGapDesktop,
        rangeStylesTab: numPrefixGapTab,
        rangeStylesMobile: numPrefixGapMobile,
    } = generateResponsiveRangeStyles({
        controlName: rgNumPrefix,
        property: "padding-left",
        attributes,
    });

    const {
        rangeStylesDesktop: numSuffixGapDesktop,
        rangeStylesTab: numSuffixGapTab,
        rangeStylesMobile: numSuffixGapMobile,
    } = generateResponsiveRangeStyles({
        controlName: rgNumSuffix,
        property: "padding-right",
        attributes,
    });

    // styles for generateResponsiveRangeStyles end

    const wrapperStylesDesktop = `

	.eb-counter-wrapper.${blockId} .eb-counter-title,
	.eb-counter-wrapper.${blockId} .eb-counter-number {
		margin: 0;
		padding: 0;
	}

	.eb-counter-wrapper.${blockId} > * {
		position: relative;
	}

	.eb-counter-wrapper.${blockId}{
		overflow:hidden;
		display: flex;
		flex-direction:${rootFlexDirection};
		${media !== "none" ? `${contentMediaGapDesktop}` : ""}
		${wrapperMarginStylesDesktop}
		${wrapperPaddingStylesDesktop}
		${backgroundStylesDesktop}
		${bdShadowStyesDesktop}
		transition:${bgTransitionStyle}, ${bdShadowTransitionStyle};
	}

	.eb-counter-wrapper.${blockId} .counter-contents-wrapper{
		display:flex;
		flex:1;
		text-align: ${contentAlignment || "center"};
		${
            contentsAlignSelf && media !== "none"
                ? `justify-content:${contentsAlignSelf};`
                : ""
        }
		${wrapperFlexDirection ? `flex-direction: ${wrapperFlexDirection};` : " "}
		${numTitleGapDesktop}
	}

	.eb-counter-wrapper.${blockId}:hover{
		${hoverBackgroundStylesDesktop}
		${bdShadowStylesHoverDesktop}
	}

	.eb-counter-wrapper.${blockId}:before{
		${overlayStylesDesktop}
		transition:${ovlTransitionStyle};
	}

	.eb-counter-wrapper.${blockId}:hover:before{
		${hoverOverlayStylesDesktop}
	}

	.eb-counter-wrapper.${blockId} .eb-counter-number{
		${numberTypoStylesDesktop}
		${numberColor ? ` color : ${numberColor};` : " "}
		${numPrefixGapDesktop}
		${numSuffixGapDesktop}
	}

	.eb-counter-wrapper.${blockId} .eb-counter-title{
		${titleTypoStylesDesktop}
		${titleColor ? `color : ${titleColor};` : " "}
	}

	.eb-counter-wrapper.${blockId} .eb-counter-prefix{
		${numPrefixTypoStylesDesktop}
		${numPrefixColor ? `color : ${numPrefixColor};` : " "}
	}

	.eb-counter-wrapper.${blockId} .eb-counter-suffix{
		${numSuffixTypoStylesDesktop}
		${numSuffixColor ? `color : ${numSuffixColor};` : " "}
	}



	${
        media !== "none"
            ? `
			.eb-counter-wrapper.${blockId} .icon-img-wrapper {
				align-self: ${mediaAlignSelf};
				${mediaBgMarginStylesDesktop}
			}

			${
                media === "image"
                    ? `

					.eb-counter-wrapper.${blockId} .icon-img-wrapper{
						${mediaImgWidthUnit === "%" ? mediaImgWidthDesktop : " "}
					}

					.eb-counter-wrapper.${blockId} .icon-img-wrapper img {

						${imageUrl ? mediaRadiusStylesDesktop : " "}

						${mediaImgWidthUnit === "%" ? `width: 100%;` : mediaImgWidthDesktop}
						${isMediaImgHeightAuto ? `height:auto;` : mediaImgHeightDesktop}

					}

					.eb-counter-wrapper.${blockId} .eb-counter-image-wrapper{
						${imageUrl ? " " : mediaRadiusStylesDesktop}
					}
					`
                    : " "
            }

			${
                media === "icon"
                    ? `
				.eb-counter-wrapper.${blockId} .eb-icon {

					${mediaBgPaddingDesktop}
					${mediaRadiusStylesDesktop}

					${
                        useIconBg
                            ? `${
                                  iconBgType === "fill"
                                      ? `background-color: ${iconBgColor};`
                                      : iconBgType === "gradient"
                                      ? `background-image: ${iconBgGradient};`
                                      : " "
                              }`
                            : " "
                    }

				}

				.eb-counter-wrapper.${blockId} .eb-icon > span{
					color: ${iconColor || "#fff"};
				}

				.eb-counter-wrapper.${blockId} .icon-img-wrapper .eb-counter-icon-data-selector {
					${iconSizeDesktop}
					height:${mIconZRange}${mIconZUnit};
					width:${mIconZRange}${mIconZUnit};
					display:flex;
					justify-content:center;
					align-items:center;
				}

				`
                    : ""
            }
			`
            : " "
    }
	`;

    const wrapperStylesTab = `
	.eb-counter-wrapper.${blockId}{
		${media !== "none" ? `${contentMediaGapTab}` : ""}
		${wrapperMarginStylesTab}
		${wrapperPaddingStylesTab}
		${backgroundStylesTab}
		${bdShadowStyesTab}
	}

	.eb-counter-wrapper.${blockId}:hover{
		${hoverBackgroundStylesTab}
		${bdShadowStylesHoverTab}
	}

	.eb-counter-wrapper.${blockId}:before{
		${overlayStylesTab}
	}

	.eb-counter-wrapper.${blockId}:hover:before{
		${hoverOverlayStylesTab}
	}

	.eb-counter-wrapper.${blockId} .counter-contents-wrapper{
		${numTitleGapTab}
	}

	.eb-counter-wrapper.${blockId} .eb-counter-number{
		${numberTypoStylesTab}
		${numPrefixGapTab}
		${numSuffixGapTab}
	}

	.eb-counter-wrapper.${blockId} .eb-counter-title{
		${titleTypoStylesTab}
	}

	.eb-counter-wrapper.${blockId} .eb-counter-prefix{
		${numPrefixTypoStylesTab}
	}

	.eb-counter-wrapper.${blockId} .eb-counter-suffix{
		${numSuffixTypoStylesTab}
	}


	${
        media !== "none"
            ? `

			.eb-counter-wrapper.${blockId} .icon-img-wrapper {
				${mediaBgMarginStylesTab}
			}

			${
                media === "icon"
                    ? `

					.eb-counter-wrapper.${blockId} .eb-icon {
						${mediaRadiusStylesTab}
						${mediaBgPaddingTab}
					}

					.eb-counter-wrapper.${blockId} .icon-img-wrapper .eb-counter-icon-data-selector {
						${iconSizeTab}
						${TABmIconZRange ? `height:${TABmIconZRange}${TABmIconZUnit};` : ""}
						${TABmIconZRange ? `width:${TABmIconZRange}${TABmIconZUnit};` : ""}
					}

				`
                    : " "
            }


			${
                media === "image"
                    ? `

				.eb-counter-wrapper.${blockId} .icon-img-wrapper{
					${
                        TABmediaImgWidthUnit === "%"
                            ? mediaImgWidthTab
                            : mediaImgWidthUnit === "%"
                            ? `width: auto;`
                            : " "
                    }
				}

				.eb-counter-wrapper.${blockId} .icon-img-wrapper img {

					${
                        TABmediaImgWidthUnit === "%"
                            ? mediaImgWidthUnit === "%"
                                ? " "
                                : `width: 100%;`
                            : mediaImgWidthTab
                    }

					${isMediaImgHeightAuto ? "" : mediaImgHeightTab}

				}

				.eb-counter-wrapper.${blockId} .eb-counter-image-wrapper{
					${mediaRadiusStylesTab}

				}

				`
                    : " "
            }
		`
            : " "
    }

	`;

    const wrapperStylesMobile = `
	.eb-counter-wrapper.${blockId}{
		${media !== "none" ? `${contentMediaGapMobile}` : ""}
		${wrapperMarginStylesMobile}
		${wrapperPaddingStylesMobile}
		${backgroundStylesMobile}
		${bdShadowStyesMobile}
	}

	.eb-counter-wrapper.${blockId}:hover{
		${hoverBackgroundStylesMobile}
		${bdShadowStylesHoverMobile}
	}

	.eb-counter-wrapper.${blockId}:before{
		${overlayStylesMobile}
	}

	.eb-counter-wrapper.${blockId}:hover:before{
		${hoverOverlayStylesMobile}
	}

	.eb-counter-wrapper.${blockId} .counter-contents-wrapper{
		${numTitleGapMobile}
	}

	.eb-counter-wrapper.${blockId} .eb-counter-number{
		${numberTypoStylesMobile}
		${numPrefixGapMobile}
		${numSuffixGapMobile}
	}

	.eb-counter-wrapper.${blockId} .eb-counter-title{
		${titleTypoStylesMobile}
	}

	.eb-counter-wrapper.${blockId} .eb-counter-prefix{
		${numPrefixTypoStylesMobile}
	}

	.eb-counter-wrapper.${blockId} .eb-counter-suffix{
		${numSuffixTypoStylesMobile}
	}



	${
        media !== "none"
            ? `

			.eb-counter-wrapper.${blockId} .icon-img-wrapper {
				${mediaBgMarginStylesMobile}
			}

			${
                media === "icon"
                    ? `

					.eb-counter-wrapper.${blockId} .eb-icon {
						${mediaRadiusStylesMobile}
						${mediaBgPaddingMobile}
					}

					.eb-counter-wrapper.${blockId} .icon-img-wrapper .eb-counter-icon-data-selector {
						${iconSizeMobile}
						${MOBmIconZRange ? `height:${MOBmIconZRange}${MOBmIconZUnit};` : ""}
						${MOBmIconZRange ? `width:${MOBmIconZRange}${MOBmIconZUnit};` : ""}
					}

				`
                    : " "
            }


			${
                media === "image"
                    ? `

				.eb-counter-wrapper.${blockId} .icon-img-wrapper{
					${
                        MOBmediaImgWidthUnit === "%"
                            ? mediaImgWidthMobile
                            : mediaImgWidthUnit === "%"
                            ? `width: auto;`
                            : " "
                    }
				}

				.eb-counter-wrapper.${blockId} .icon-img-wrapper img {

					${
                        MOBmediaImgWidthUnit === "%"
                            ? mediaImgWidthUnit === "%"
                                ? " "
                                : `width: 100%;`
                            : mediaImgWidthMobile
                    }

					${isMediaImgHeightAuto ? "" : mediaImgHeightMobile}

				}

				.eb-counter-wrapper.${blockId} .eb-counter-image-wrapper{
					${mediaRadiusStylesMobile}

				}

				`
                    : " "
            }
		`
            : " "
    }



	`;

    const desktopAllStyles = softMinifyCssStrings(`
		${wrapperStylesDesktop}
	`);

    const tabAllStyles = softMinifyCssStrings(`
		${wrapperStylesTab}
	`);

    const mobileAllStyles = softMinifyCssStrings(`
		${wrapperStylesMobile}
	`);

    //
    // CSS/styling Codes Ends Here
    //

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
                <Inspector
                    attributes={attributes}
                    setAttributes={setAttributes}
                />
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
                    <div className={`${blockId} eb-counter-wrapper`}>
                        {media === "icon" ? (
                            <div className="icon-img-wrapper">
                                <div className="eb-icon ">
                                    <span
                                        data-icon={selectedIcon}
                                        className={`eb-counter-icon-data-selector  ${selectedIcon}`}
                                    ></span>
                                </div>
                            </div>
                        ) : null}

                        {media === "image" ? (
                            <div className="icon-img-wrapper">
                                <div className="eb-counter-image-wrapper">
                                    <MediaUpload
                                        onSelect={({ id, url }) =>
                                            setAttributes({
                                                imageUrl: url,
                                                imageId: id,
                                            })
                                        }
                                        type="image"
                                        value={imageId}
                                        render={({ open }) => {
                                            if (!imageUrl) {
                                                return (
                                                    <Button
                                                        className="eb-infobox-img-btn components-button"
                                                        label={__(
                                                            "Upload Image",
                                                            "essential-blocks"
                                                        )}
                                                        icon="format-image"
                                                        onClick={open}
                                                    />
                                                );
                                            } else {
                                                return (
                                                    <img
                                                        className="eb-counter-image"
                                                        src={imageUrl}
                                                    />
                                                );
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                        ) : null}

                        <div className="counter-contents-wrapper">
                            <attributes.counterTitleLevel className="eb-counter-number">
                                <span className="eb-counter-prefix">
                                    {counterPrefix}
                                </span>
                                <span
                                    ref={counterRef}
                                    className="eb-counter eb-counter-number"
                                >
                                    0
                                </span>
                                <span className="eb-counter-suffix">
                                    {counterSuffix}
                                </span>
                            </attributes.counterTitleLevel>
                            <RichText
                                tagName={titleLevel}
                                className="eb-counter-title"
                                value={counterTitle}
                                allowedFormats={[
                                    "core/bold",
                                    "core/italic",
                                    "core/link",
                                    "core/strikethrough",
                                    "core/underline",
                                    "core/text-color",
                                ]}
                                onChange={(counterTitle) =>
                                    setAttributes({ counterTitle })
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Edit;
