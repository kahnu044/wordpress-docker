import {
    CONTAINER_CUSTOM_WIDTH,
    WRAPPER_BACKGROUND,
    WRAPPER_BORDER,
    WRAPPER_MARGIN,
    WRAPPER_PADDING,
    CONTENT_WIDTH,
    CONTENT_HEIGHT,
    FLEX_ROW_GAP,
    FLEX_COLUMN_GAP,
    FLEX_DIRECTION_CONTROL,
    JUSTIFY_CONTENT_CONTROL,
    ALIGN_ITEM_CONTROL,
    FLEX_WRAP_CONTROL,
} from "./constants";

import {
    softMinifyCssStrings,
    generateResponsiveRangeStyles,
    generateDimensionsControlStyles,
    generateBackgroundControlStyles,
    generateBorderShadowStyles,
    generateResponsiveAlignStyles,
    StyleComponent,
} from "@essential-blocks/controls";

export default function Style(props) {
    const {
        attributes,
        setAttributes,
        name,
    } = props;

    const {
        blockId,
        blockMeta,
        resOption,
        isContainerCustomWidth,
        contentWidth,
        justifyContent,
        TABjustifyContent,
        MOBjustifyContent,
        alignItems,
        TABalignItems,
        MOBalignItems,
        flexWrap,
        TABflexWrap,
        MOBflexWrap,
        overflow,
    } = attributes;

    // responsive range controller styles
    const {
        rangeStylesDesktop: contentWidthDesktop,
        rangeStylesTab: contentWidthTab,
        rangeStylesMobile: contentWidthMobile,
    } = generateResponsiveRangeStyles({
        controlName: CONTENT_WIDTH,
        property: "width",
        attributes,
    });

    const {
        rangeStylesDesktop: contentHeightDesktop,
        rangeStylesTab: contentHeightTab,
        rangeStylesMobile: contentHeightMobile,
    } = generateResponsiveRangeStyles({
        controlName: CONTENT_HEIGHT,
        property: "min-height",
        attributes,
    });

    const {
        rangeStylesDesktop: rowGapDesktop,
        rangeStylesTab: rowGapTab,
        rangeStylesMobile: rowGapMobile,
    } = generateResponsiveRangeStyles({
        controlName: FLEX_ROW_GAP,
        property: "row-gap",
        attributes,
    });

    const {
        rangeStylesDesktop: columnGapDesktop,
        rangeStylesTab: columnGapTab,
        rangeStylesMobile: columnGapMobile,
    } = generateResponsiveRangeStyles({
        controlName: FLEX_COLUMN_GAP,
        property: "column-gap",
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
    const {
        dimensionStylesDesktop: wrapperMarginDesktop,
        dimensionStylesTab: wrapperMarginTab,
        dimensionStylesMobile: wrapperMarginMobile,
    } = generateDimensionsControlStyles({
        controlName: WRAPPER_MARGIN,
        styleFor: "margin",
        attributes,
    });

    const {
        alignStylesDesktop: flexDirectionDesktop,
        alignStylesTab: flexDirectionTab,
        alignStylesMobile: flexDirectionMobile,
    } = generateResponsiveAlignStyles({
        controlName: FLEX_DIRECTION_CONTROL,
        property: "flex-direction",
        attributes,
    });

    const {
        alignStylesDesktop: justifyContentDesktop,
        alignStylesTab: justifyContentTab,
        alignStylesMobile: justifyContentMobile,
    } = generateResponsiveAlignStyles({
        controlName: JUSTIFY_CONTENT_CONTROL,
        property: "justify-content",
        attributes,
    });
    const {
        alignStylesDesktop: alignItemsDesktop,
        alignStylesTab: alignItemsTab,
        alignStylesMobile: alignItemsMobile,
    } = generateResponsiveAlignStyles({
        controlName: ALIGN_ITEM_CONTROL,
        property: "align-items",
        attributes,
    });
    const {
        alignStylesDesktop: flexWrapDesktop,
        alignStylesTab: flexWrapTab,
        alignStylesMobile: flexWrapMobile,
    } = generateResponsiveAlignStyles({
        controlName: FLEX_WRAP_CONTROL,
        property: "flex-wrap",
        attributes,
    });

    const {
        rangeStylesDesktop: containerCustomMaxWidthDesktop,
        rangeStylesTab: containerCustomMaxWidthTab,
        rangeStylesMobile: containerCustomMaxWidthMobile,
    } = generateResponsiveRangeStyles({
        controlName: CONTAINER_CUSTOM_WIDTH,
        property: "max-width",
        attributes,
    });
    const {
        rangeStylesDesktop: containerCustomWidthDesktop,
        rangeStylesTab: containerCustomWidthTab,
        rangeStylesMobile: containerCustomWidthMobile,
    } = generateResponsiveRangeStyles({
        controlName: CONTAINER_CUSTOM_WIDTH,
        property: "width",
        attributes,
    });

    // all css styles for large screen width (desktop/laptop) in strings ⬇
    const desktopStyles = `
        .block-editor-block-list__layout.is-root-container > .root-${blockId},
        .root-${blockId}.alignwide,
        .root-${blockId}.alignfull,
        .root-${blockId} {
            ${isContainerCustomWidth ?
            `
                ${containerCustomMaxWidthDesktop}
                ${containerCustomWidthDesktop}
                `
            : ""}
        }
        .eb-flex-container.${blockId} {
            ${wrapperMarginDesktop}
            ${wrapperPaddingDesktop}
            ${backgroundStylesDesktop}
            ${bdShadowStyesDesktop}
        }
        .eb-flex-container.${blockId}:hover {
            ${hoverBackgroundStylesDesktop}
            ${bdShadowStylesHoverDesktop}
        }
        .eb-flex-container.${blockId}:before {
            ${overlayStylesDesktop}
            transition: ${ovlTransitionStyle};
        }
        .eb-flex-container.${blockId}:hover:before {
            ${hoverOverlayStylesDesktop}
        }

        .eb-flex-container.${blockId}:not(.editor) >.eb-flex-container-inner{
            ${flexDirectionDesktop || "flex-direction: row;"}
            ${justifyContentDesktop || "justify-content: flex-start;"}
            ${alignItemsDesktop || "align-items: stretch;"}
            ${flexWrapDesktop || "flex-wrap: nowrap;"}
            ${rowGapDesktop}
            ${columnGapDesktop}
            overflow: ${overflow};
            ${contentHeightDesktop}
            ${contentWidth === "boxed" ? `${contentWidthDesktop}` : ""}
        }

        .eb-flex-container.${blockId} > .block-editor-inner-blocks > .block-editor-block-list__layout {
            ${flexDirectionDesktop || "flex-direction: row;"}
            ${justifyContentDesktop || "justify-content: flex-start;"}
            ${alignItemsDesktop || "align-items: stretch;"}
            ${flexWrapDesktop || "flex-wrap: nowrap;"}
            ${rowGapDesktop}
            ${columnGapDesktop}
            ${contentWidth === "boxed" ? `${contentWidthDesktop}` : ""}
            ${contentHeightDesktop}
            overflow: ${overflow};
            margin: 0 auto;
        }

    `;

    // all css styles for Tab in strings ⬇
    const tabStyles = `
        .block-editor-block-list__layout.is-root-container > .root-${blockId},
        .root-${blockId}.alignwide,
        .root-${blockId}.alignfull,
        .root-${blockId} {
            ${isContainerCustomWidth ? ` ${containerCustomMaxWidthTab} ${containerCustomWidthTab}` : ""}
        }
        .eb-flex-container.${blockId}{
            ${wrapperMarginTab}
            ${wrapperPaddingTab}
            ${backgroundStylesTab}
            ${bdShadowStyesTab}
        }
        .eb-flex-container.${blockId}:hover {
            ${hoverBackgroundStylesTab}
            ${bdShadowStylesHoverTab}
        }
        .eb-flex-container.${blockId}:before {
            ${overlayStylesTab}
        }
        .eb-flex-container.${blockId}:hover:before {
            ${hoverOverlayStylesTab}
        }

        .eb-flex-container.${blockId}:not(.editor) >.eb-flex-container-inner{
            ${flexDirectionTab || flexDirectionDesktop || "flex-direction: row;"}
            justify-content: ${TABjustifyContent || justifyContent || "flex-start"};
            align-items: ${TABalignItems || alignItems || "stretch"};
            flex-wrap: ${TABflexWrap || flexWrap || "nowrap"};
            ${contentWidth === "boxed" ? `${contentWidthTab}` : ""}
            ${contentHeightTab}
            ${rowGapTab}
            ${columnGapTab}
        }
        .eb-flex-container.${blockId} > .block-editor-inner-blocks > .block-editor-block-list__layout {
            ${flexDirectionTab || flexDirectionDesktop || "flex-direction: row;"}
            ${justifyContentTab || justifyContentDesktop || "justify-content: flex-start;"}
            ${alignItemsTab || alignItemsDesktop || "align-items: stretch;"}
            ${flexWrapTab || flexWrapDesktop || "flex-wrap: nowrap;"}
            ${rowGapTab}
            ${columnGapTab}
            ${contentWidth === "boxed" ? `${contentWidthTab}` : ""}
            ${contentHeightTab}
        }

    `;

    // all css styles for Mobile in strings ⬇
    const mobileStyles = `
        .block-editor-block-list__layout.is-root-container > .root-${blockId},
        .root-${blockId}.alignwide,
        .root-${blockId}.alignfull,
        .root-${blockId} {
            ${isContainerCustomWidth ? ` ${containerCustomMaxWidthMobile} ${containerCustomWidthMobile}` : ""}
        }
        .eb-flex-container.${blockId} {
            ${wrapperMarginMobile}
            ${wrapperPaddingMobile}
            ${backgroundStylesMobile}
            ${bdShadowStyesMobile}
        }
        .eb-flex-container.${blockId}:hover {
            ${hoverBackgroundStylesMobile}
            ${bdShadowStylesHoverMobile}
        }
        .eb-flex-container.${blockId}:before {
            ${overlayStylesMobile}
        }
        .eb-flex-container.${blockId}:hover:before {
            ${hoverOverlayStylesMobile}
        }

        .eb-flex-container.${blockId}:not(.editor) >.eb-flex-container-inner{
            ${flexDirectionMobile || flexDirectionTab || flexDirectionDesktop || "flex-direction: row;"}
            justify-content: ${MOBjustifyContent || TABjustifyContent || justifyContent || "flex-start"};
            align-items: ${MOBalignItems || TABalignItems || alignItems || "stretch"};
            flex-wrap: ${MOBflexWrap || TABflexWrap || flexWrap || "nowrap"};
            ${contentWidth === "boxed" ? `${contentWidthMobile}` : ""}
            ${contentHeightMobile}
            ${rowGapMobile}
            ${columnGapMobile}
        }
        .eb-flex-container.${blockId} > .block-editor-inner-blocks > .block-editor-block-list__layout {
            ${flexDirectionMobile || flexDirectionTab || flexDirectionDesktop || "flex-direction: row;"}
            ${justifyContentMobile || justifyContentTab || justifyContentDesktop || "justify-content: flex-start;"}
            ${alignItemsMobile || alignItemsTab || alignItemsDesktop || "align-items: stretch;"}
            ${flexWrapMobile || flexWrapTab || flexWrapDesktop || "flex-wrap: nowrap;"}
            ${rowGapMobile}
            ${columnGapMobile}
            ${contentWidth === "boxed" ? `${contentWidthMobile}` : ""}
            ${contentHeightMobile}
        }

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
