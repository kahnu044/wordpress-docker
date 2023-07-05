/*
 * WordPress Dependencies
 */
import { __ } from "@wordpress/i18n";
import { useEffect, useRef } from "@wordpress/element";
import {
    InnerBlocks,
    useBlockProps,
    BlockControls,
    AlignmentToolbar,
} from "@wordpress/block-editor";
import { select } from "@wordpress/data";

/**
 * External depencencies
 */

/*
 * Internal  Dependencies
 *
 */
import classnames from "classnames";

import Inspector from "./inspector";
import {
    WRAPPER_WIDTH,
    WRAPPER_BACKGROUND,
    WRAPPER_BORDER,
    WRAPPER_MARGIN,
    WRAPPER_PADDING,
    SHAPE_DIVIDER_TOP,
    SHAPE_DIVIDER_BOTTOM,
} from "./constants";

const {
    // mimmikCssForPreviewBtnClick,
    duplicateBlockIdFix,
    softMinifyCssStrings,
    generateResponsiveRangeStyles,
    generateDimensionsControlStyles,
    generateBackgroundControlStyles,
    generateBorderShadowStyles,
    ShapeDividerContent,
    generateShapeDividerStyles,
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
        blockId,
        blockMeta,
        // responsive control attribute ⬇
        resOption,
        wrapperAlign,
        isWrapperWidth,
        classHook,
        wrpShapeTopInvert,
        wrpShapeBottomInvert,
        wrpShapeTopStyle,
        wrpShapeBottomStyle,
    } = attributes;

    // wrapper margin
    const {
        dimensionStylesDesktop: wrapperMarginDesktop,
        dimensionStylesTab: wrapperMarginTab,
        dimensionStylesMobile: wrapperMarginMobile,
    } = generateDimensionsControlStyles({
        controlName: WRAPPER_MARGIN,
        styleFor: "margin",
        attributes,
    });

    // wrapper padding
    const {
        dimensionStylesDesktop: wrapperPaddingDesktop,
        dimensionStylesTab: wrapperPaddingTab,
        dimensionStylesMobile: wrapperPaddingMobile,
    } = generateDimensionsControlStyles({
        controlName: WRAPPER_PADDING,
        styleFor: "padding",
        attributes,
    });

    // wrapper background
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
        controlName: WRAPPER_BACKGROUND,
    });

    // wrapper border
    const {
        styesDesktop: bdShadowStyesDesktop,
        styesTab: bdShadowStyesTab,
        styesMobile: bdShadowStyesMobile,
        stylesHoverDesktop: bdShadowStylesHoverDesktop,
        stylesHoverTab: bdShadowStylesHoverTab,
        stylesHoverMobile: bdShadowStylesHoverMobile,
        transitionStyle: bdShadowTransitionStyle,
    } = generateBorderShadowStyles({
        controlName: WRAPPER_BORDER,
        attributes,
    });

    // wrapper max-width
    const {
        rangeStylesDesktop: wrapperWidthDesktop,
        rangeStylesTab: wrapperWidthTab,
        rangeStylesMobile: wrapperWidthMobile,
    } = generateResponsiveRangeStyles({
        controlName: WRAPPER_WIDTH,
        property: "width",
        attributes,
    });

    // shape divider top styles
    const {
        desktopShapeStyle: shapeDividerTopDesktop,
        tabShapeStyle: shapeDividerTopTab,
        mobShapeStyle: shapeDividerTopMobile,
    } = generateShapeDividerStyles({
        controlName: SHAPE_DIVIDER_TOP,
        position: "top",
        attributes,
    });

    // shape divider styles
    const {
        desktopShapeStyle: shapeDividerBottomDesktop,
        tabShapeStyle: shapeDividerBottomTab,
        mobShapeStyle: shapeDividerBottomMobile,
    } = generateShapeDividerStyles({
        controlName: SHAPE_DIVIDER_BOTTOM,
        position: "bottom",
        attributes,
    });

    const desktopStyles = `
        .eb-parent-${blockId} {
            position: relative;
        }
		.eb-wrapper-align-center {
			margin-right: auto !important;
			margin-left: auto !important;
		}

		.eb-wrapper-align-right {
			margin-left: auto !important;
		}

		.eb-wrapper-outer.${blockId} {
			${wrapperMarginDesktop}
			${wrapperPaddingDesktop}
			${backgroundStylesDesktop}
			${bdShadowStyesDesktop}
			${isWrapperWidth ? wrapperWidthDesktop : ""}
			max-width: 100%;
			transition: ${bgTransitionStyle}, ${bdShadowTransitionStyle};
		}

		.eb-wrapper-outer.${blockId} > .eb-wrapper-inner > .eb-wrapper-inner-blocks {
			${!isWrapperWidth ? wrapperWidthDesktop : ""}
			max-width: 100%;
			position: relative;
		}

		.eb-wrapper-outer.${blockId}:hover{
			${hoverBackgroundStylesDesktop}
			${bdShadowStylesHoverDesktop}
		}

		.eb-wrapper-outer.${blockId}:before{
			${overlayStylesDesktop}
			transition: ${ovlTransitionStyle};
		}

		.eb-wrapper-outer.${blockId}:hover:before{
			${hoverOverlayStylesDesktop}
		}
        ${shapeDividerTopDesktop}
        ${shapeDividerBottomDesktop}
	`;

    const tabStyles = `
		.eb-wrapper-outer.${blockId} {
			${wrapperMarginTab}
			${wrapperPaddingTab}
			${backgroundStylesTab}
			${bdShadowStyesTab}
		}

		.eb-wrapper-outer.${blockId} > .eb-wrapper-inner > .eb-wrapper-inner-blocks {
			${!isWrapperWidth ? wrapperWidthTab : ""}
		}

		.eb-wrapper-outer.${blockId}:hover{
			${hoverBackgroundStylesTab}
			${bdShadowStylesHoverTab}
		}

		.eb-wrapper-outer.${blockId}:before{
			${overlayStylesTab}
		}

		.eb-wrapper-outer.${blockId}:hover:before{
			${hoverOverlayStylesTab}
		}
         ${shapeDividerTopTab}
         ${shapeDividerBottomTab}
	`;

    const mobileStyles = `
		.eb-wrapper-outer.${blockId} {
			${wrapperMarginMobile}
			${wrapperPaddingMobile}
			${backgroundStylesMobile}
			${bdShadowStyesMobile}
		}

		.eb-wrapper-outer.${blockId} > .eb-wrapper-inner > .eb-wrapper-inner-blocks {
			${!isWrapperWidth ? wrapperWidthMobile : ""}
		}

		.eb-wrapper-outer.${blockId}:hover{
			${hoverBackgroundStylesMobile}
			${bdShadowStylesHoverMobile}
		}

		.eb-wrapper-outer.${blockId}:before{
			${overlayStylesMobile}
		}

		.eb-wrapper-outer.${blockId}:hover:before{
			${hoverOverlayStylesMobile}
		}
         ${shapeDividerTopMobile}
         ${shapeDividerBottomMobile}
	`;

    // all css styles for large screen width (desktop/laptop) in strings ⬇
    const desktopAllStyles = softMinifyCssStrings(`
		${desktopStyles}
	`);

    // all css styles for Tab in strings ⬇
    const tabAllStyles = softMinifyCssStrings(`
		${tabStyles}
	`);

    // all css styles for Mobile in strings ⬇
    const mobileAllStyles = softMinifyCssStrings(`
		${mobileStyles}
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

    // this useEffect is for creating an unique id for each block's unique className by a random unique number
    useEffect(() => {
        const BLOCK_PREFIX = "eb-wrapper";
        duplicateBlockIdFix({
            BLOCK_PREFIX,
            blockId,
            setAttributes,
            select,
            clientId,
        });
    }, []);

    const isMount = useRef(null);
    useEffect(() => {
        // set isMount value
        isMount.current = true;
        return () => {
            isMount.current = false;
        };
    }, []);

    useEffect(() => {
        if (!isMount.current) {
            setAttributes({ wrpShapeTopInvert: false });
            setAttributes({ wrpShapeTopInvert: false });
        }
        isMount.current = false;
    }, [
        attributes[`${SHAPE_DIVIDER_TOP}Type`],
        attributes[`${SHAPE_DIVIDER_BOTTOM}Type`],
    ]);

    const blockProps = useBlockProps({
        className: classnames(className, `eb-guten-block-main-parent-wrapper`),
    });

    const alignmentClass =
        wrapperAlign === "center"
            ? "eb-wrapper-align-center"
            : wrapperAlign === "right"
            ? "eb-wrapper-align-right"
            : "";

    return (
        <>
            {isSelected && <Inspector {...props} />}
            <BlockControls>
                <AlignmentToolbar
                    value={wrapperAlign}
                    onChange={(wrapperAlign) => setAttributes({ wrapperAlign })}
                />
            </BlockControls>
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
                        className={`eb-wrapper-outer ${blockId}${
                            isWrapperWidth ? ` ${alignmentClass}` : ""
                        }`}
                    >
                        {attributes[`${SHAPE_DIVIDER_TOP}Type`] != "" && (
                            <ShapeDividerContent
                                position="top"
                                style={attributes[`${SHAPE_DIVIDER_TOP}Type`]}
                                negative={wrpShapeTopInvert}
                            />
                        )}
                        {attributes[`${SHAPE_DIVIDER_BOTTOM}Type`] != "" && (
                            <ShapeDividerContent
                                position="bottom"
                                style={
                                    attributes[`${SHAPE_DIVIDER_BOTTOM}Type`]
                                }
                                negative={wrpShapeBottomInvert}
                            />
                        )}
                        <div className="eb-wrapper-inner">
                            <div
                                className={`eb-wrapper-inner-blocks${
                                    !isWrapperWidth ? ` ${alignmentClass}` : ""
                                }`}
                            >
                                <InnerBlocks
                                    renderAppender={
                                        select(
                                            "core/block-editor"
                                        ).getBlockOrder(clientId).length > 0
                                            ? undefined
                                            : InnerBlocks.ButtonBlockAppender
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Edit;
