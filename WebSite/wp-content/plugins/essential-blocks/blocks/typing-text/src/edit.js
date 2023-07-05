/**
 * WordPress dependencies
 */
import { useEffect, useRef, useState } from "@wordpress/element";
import {
    BlockControls,
    AlignmentToolbar,
    useBlockProps,
} from "@wordpress/block-editor";
import { select } from "@wordpress/data";

import {
    dimensionsMargin,
    dimensionsPadding,
} from "./constants/dimensionsNames";
import {
    typoPrefix_prefixText,
    typoPrefix_suffixText,
    typoPrefix_typedText,
} from "./constants/typographyPrefixConstants";
import { WrpBdShadow } from "./constants/borderShadowConstants";
import { backgroundWrapper } from "./constants/backgroundsConstants";

const {
    softMinifyCssStrings,
    generateTypographyStyles,
    generateDimensionsControlStyles,
    generateBorderShadowStyles,
    generateBackgroundControlStyles,
    // mimmikCssForPreviewBtnClick,
    duplicateBlockIdFix
} = window.EBControls;

/**
 * External dependencies
 */
import Typed from "typed.js";

/**
 * Internal dependencies
 */
import classnames from "classnames";

import Inspector from "./inspector";

export default function Edit(props) {
    const { attributes, setAttributes, className, clientId, isSelected } = props;
    const {
        blockId,
        blockMeta,
        // responsive control attribute ⬇
        resOption,
        prefix,
        typedText,
        typeSpeed,
        startDelay,
        smartBackspace,
        backSpeed,
        backDelay,
        fadeOut,
        fadeOutDelay,
        loop,
        showCursor,
        suffix,
        prefixColor,
        typedTextColor,
        suffixTextColor,
        textAlign,
        classHook,
    } = attributes;
    const block = useRef(null);
    const [typed, setTyped] = useState(null);

    const generateOptions = () => {
        // Generate options for Typed instance
        const {
            typedText,
            typeSpeed,
            startDelay,
            smartBackspace,
            backSpeed,
            backDelay,
            fadeOut,
            fadeOutDelay,
            loop,
            showCursor,
        } = attributes;
        let strings = getStrings(typedText);

        return {
            strings,
            typeSpeed,
            startDelay,
            smartBackspace,
            backSpeed,
            backDelay,
            fadeOut,
            fadeOutDelay,
            loop,
            showCursor,
        };
    };

    const getStrings = (typedText) => {
        let strings = [];
        typedText.map((item) => strings.push(item.text));
        return strings;
    };

    useEffect(() => {
        const options = generateOptions();
        const new_typed = new Typed(block.current, options);
        setTyped(new_typed);
        return () => {
            // Destroy Typed instance
            if (typed) {
                typed.destroy();
            }
        };
    }, []);

    useEffect(() => {
        if (typed) {
            typed.destroy();
            setTyped(new Typed(block.current, generateOptions()));
        }
    }, [
        typedText,
        typeSpeed,
        startDelay,
        smartBackspace,
        backSpeed,
        backDelay,
        fadeOut,
        fadeOutDelay,
        loop,
        showCursor,
    ]);

    useEffect(() => {
        if (typedText.length > 0) return;

        const defaultTypedText = [
            {
                text: "first string",
            },
            {
                text: "second string",
            },
        ];

        setAttributes({ typedText: defaultTypedText });
        setAttributes({ prefix: "This is the " });
        setAttributes({ suffix: "of the sentence." });
    }, []);

    // this useEffect is for creating an unique id for each block's unique className by a random unique number
    useEffect(() => {
        const BLOCK_PREFIX = "eb-typing-text";
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

    // Return if there is no typed text
    if (!typedText) return <div />;
    const {
        dimensionStylesDesktop: wrapperMarginStylesDesktop,
        dimensionStylesTab: wrapperMarginStylesTab,
        dimensionStylesMobile: wrapperMarginStylesMobile,
    } = generateDimensionsControlStyles({
        controlName: dimensionsMargin,
        styleFor: "margin",
        attributes,
    });

    const {
        dimensionStylesDesktop: wrapperPaddingStylesDesktop,
        dimensionStylesTab: wrapperPaddingStylesTab,
        dimensionStylesMobile: wrapperPaddingStylesMobile,
    } = generateDimensionsControlStyles({
        controlName: dimensionsPadding,
        styleFor: "padding",
        attributes,
    });

    // Prefix typography
    const {
        typoStylesDesktop: prefixTextTypoStylesDesktop,
        typoStylesTab: prefixTextTypoStylesTab,
        typoStylesMobile: prefixTextTypoStylesMobile,
    } = generateTypographyStyles({
        attributes,
        defaultFontSize: 22,
        prefixConstant: typoPrefix_prefixText,
    });

    // suffix typoghraphy
    const {
        typoStylesDesktop: suffixTextTypoStylesDesktop,
        typoStylesTab: suffixTextTypoStylesTab,
        typoStylesMobile: suffixTextTypoStylesMobile,
    } = generateTypographyStyles({
        attributes,
        defaultFontSize: 22,
        prefixConstant: typoPrefix_suffixText,
    });

    // typed text typoghrapy
    const {
        typoStylesDesktop: typedTextTypoStylesDesktop,
        typoStylesTab: typedTextTypoStylesTab,
        typoStylesMobile: typedTextTypoStylesMobile,
    } = generateTypographyStyles({
        attributes,
        defaultFontSize: 22,
        prefixConstant: typoPrefix_typedText,
    });

    // wrapper border & shadow settings
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
    });

    // wrapper background controller
    const {
        backgroundStylesDesktop: wrpBackgroundStylesDesktop,
        hoverBackgroundStylesDesktop: wrpHoverBackgroundStylesDesktop,
        bgTransitionStyle: wrpBgTransitionStyle,
    } = generateBackgroundControlStyles({
        attributes,
        controlName: backgroundWrapper,
        noOverlay: true,
        noMainBgi: true,
    });

    // wrapper styles css in strings ⬇
    const wrapperStylesDesktop = `

	 .eb-typed-wrapper.${blockId} {
		 ${wrapperMarginStylesDesktop}
		 ${wrapperPaddingStylesDesktop}
		 ${bdShadowStyesDesktop}
		 ${wrpBackgroundStylesDesktop}
		 text-align: ${textAlign};
		 transition: ${wrpBgTransitionStyle}, ${bdShadowTransitionStyle};
	 }

	 .eb-typed-wrapper.${blockId}:hover {
		 ${wrpHoverBackgroundStylesDesktop}
		 ${bdShadowStylesHoverDesktop}
	 }

	 .eb-typed-wrapper.${blockId}:before {
		 z-index: -11;
	 }
	 `;

    const wrapperStylesTab = `
	 .eb-typed-wrapper.${blockId}{
		 ${wrapperMarginStylesTab}
		 ${wrapperPaddingStylesTab}
		 ${bdShadowStyesTab}
	 }

	 .eb-typed-wrapper.${blockId}:hover {
		 ${bdShadowStylesHoverTab}
	 }
	 `;

    const wrapperStylesMobile = `
	 .eb-typed-wrapper.${blockId}{
		 ${wrapperMarginStylesMobile}
		 ${wrapperPaddingStylesMobile}
		 ${bdShadowStyesMobile}
	 }

	 .eb-typed-wrapper.${blockId}:hover {
		 ${bdShadowStylesHoverMobile}
	 }
	 `;

    // prefix text styles css in strings ⬇
    const prefixTypoStylesDesktop = `
	 .${blockId} .eb-typed-prefix{
		 ${prefixTextTypoStylesDesktop}
		 color: ${prefixColor || "#fff"};
	 }
	 `;

    const prefixTypoStylesTab = `
	 .${blockId} .eb-typed-prefix{
		 ${prefixTextTypoStylesTab}
	 }
	 `;

    const prefixTypoStylesMobile = `
	 .${blockId} .eb-typed-prefix{
		 ${prefixTextTypoStylesMobile}
	 }
	 `;

    // suffix text styles css in strings ⬇
    const suffixTypoStylesDesktop = `
	 .${blockId} .eb-typed-suffix{
		 ${suffixTextTypoStylesDesktop}
		 color: ${suffixTextColor || "#fff"};
	 }
	 `;

    const suffixTypoStylesTab = `
	 .${blockId} .eb-typed-suffix{
		 ${suffixTextTypoStylesTab}
	 }
	 `;

    const suffixTypoStylesMobile = `
	 .${blockId} .eb-typed-suffix{
		 ${suffixTextTypoStylesMobile}
	 }
	 `;

    // typed text styles css in strings ⬇
    const typedTypoStylesDesktop = `
	 .${blockId} .eb-typed-text,.${blockId} .eb-typed-view,.${blockId} .typed-cursor{
		 ${typedTextTypoStylesDesktop}
		 color: ${typedTextColor || "#fff"};
	 }
	 `;

    const typedTypoStylesTab = `
	 .${blockId} .eb-typed-text,.${blockId} .eb-typed-view, .${blockId} .typed-cursor{
		 ${typedTextTypoStylesTab}
	 }
	 `;

    const typedTypoStylesMobile = `
	 .${blockId} .eb-typed-text,.${blockId} .eb-typed-view, .${blockId} .typed-cursor{
		 ${typedTextTypoStylesMobile}
	 }
	 `;

    // all css styles for large screen width (desktop/laptop) in strings ⬇
    const desktopAllStyles = softMinifyCssStrings(`
		 ${wrapperStylesDesktop}
		 ${prefixTypoStylesDesktop}
		 ${suffixTypoStylesDesktop}
		 ${typedTypoStylesDesktop}
	 `);

    // all css styles for Tab in strings ⬇
    const tabAllStyles = softMinifyCssStrings(`
		 ${wrapperStylesTab}
		 ${prefixTypoStylesTab}
		 ${suffixTypoStylesTab}
		 ${typedTypoStylesTab}
	 `);

    // all css styles for Mobile in strings ⬇
    const mobileAllStyles = softMinifyCssStrings(`
		 ${wrapperStylesMobile}
		 ${prefixTypoStylesMobile}
		 ${suffixTypoStylesMobile}
		 ${typedTypoStylesMobile}
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
            <BlockControls>
                <AlignmentToolbar
                    value={textAlign}
                    onChange={(textAlign) => setAttributes({ textAlign })}
                />
            </BlockControls>
            {isSelected && (
                <Inspector attributes={attributes} setAttributes={setAttributes} />
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
                <div className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`}>
                    <div className={`eb-typed-wrapper ${blockId}`} data-id={blockId}>
                        <span className="eb-typed-prefix">{prefix}</span>
                        <span className="eb-typed-text" ref={block} />
                        <span className="eb-typed-suffix">{suffix}</span>
                    </div>
                </div>
            </div>
        </>
    );
}
