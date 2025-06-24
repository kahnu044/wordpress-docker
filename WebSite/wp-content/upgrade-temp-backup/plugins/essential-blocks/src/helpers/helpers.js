import {
    loadGoogleFontEditor,
    softMinifyCssStrings
} from "@essential-blocks/controls";

export const getGlobalSettings = (select) => {
    return {
        getGlobalColors: select('essential-blocks').getGlobalColors(),
        getCustomColors: select('essential-blocks').getCustomColors(),
        getGradientColors: select('essential-blocks').getGradientColors(),
        getCustomGradientColors: select('essential-blocks').getCustomGradientColors(),
        getGlobalTypography: select('essential-blocks').getGlobalTypography()
    }
}

export const generateTypographyCSS = (styles, deviceType) => {
    let cssString = '';
    let customCssString = '';

    // Iterate over each element and its styles
    for (const element in styles) {
        let selector = element
        if (element === 'body') {
            selector = 'p'
        }
        else if (element === 'link') {
            selector = 'a'
        }
        else if (element === 'allHeadings') {
            selector = ':is(h1, h2, h3, h4, h5, h6)'
        }

        //
        if (element === 'custom') {
            cssString += generateCustomTypographyCSS(styles[element], deviceType)
        }
        else {
            const selectorParam = `.editor-styles-wrapper .eb-parent-wrapper ${selector} { `;
            if (element === 'allHeadings') {
                customCssString += generateCSSStyles(selectorParam, styles[element], deviceType)
            }
            else {
                cssString += generateCSSStyles(selectorParam, styles[element], deviceType)
            }
        }
    }

    return customCssString + cssString;
}

const generateCustomTypographyCSS = (styles, deviceType) => {

    if (typeof styles === 'object' && Object.keys(styles).length === 0) {
        return ''
    }
    let css = ''
    const selector = 'body {'
    for (const element in styles) {
        css += generateCSSStyles(selector, styles[element], deviceType, element)
    }
    return css;
}

const generateCSSStyles = (selector, styles, deviceType = 'Desktop', varPrefix = '') => {
    if (typeof styles === 'object' && Object.keys(styles).length === 0) {
        return ''
    }
    if (varPrefix.length > 0) {
        varPrefix = `--${varPrefix}-`
    }
    let css = selector
    let tablet_css = selector
    let mobile_css = selector
    for (const style in styles) {
        const cssValue = styles[style];

        //Generate CSS for each Property
        if (style === 'fontFamily') {
            css += `${varPrefix}font-family: ${cssValue}; `;
        }
        else if (style === 'fontSize') {
            css += `${varPrefix}font-size: ${cssValue}${styles?.fontSizeUnit || 'px'}; `;
        }
        else if (style === 'TABfontSize') {
            tablet_css += `${varPrefix}font-size: ${cssValue}${styles?.TABfontSizeUnit || styles?.fontSizeUnit || 'px'}; `;
        }
        else if (style === 'MOBfontSize') {
            mobile_css += `${varPrefix}font-size: ${cssValue}${styles?.MOBfontSizeUnit || styles?.fontSizeUnit || 'px'}; `;
        }
        else if (style === 'fontWeight') {
            css += `${varPrefix}font-weight: ${cssValue}; `;
        }
        else if (style === 'letterSpacing') {
            css += `${varPrefix}letter-spacing: ${cssValue}${styles?.letterSpacingUnit || 'px'}; `;
        }
        else if (style === 'TABletterSpacing') {
            tablet_css += `${varPrefix}letter-spacing: ${cssValue}${styles?.TABletterSpacingUnit || styles?.letterSpacingUnit || 'px'}; `;
        }
        else if (style === 'MOBletterSpacing') {
            mobile_css += `${varPrefix}letter-spacing: ${cssValue}${styles?.MOBletterSpacingUnit || styles?.letterSpacingUnit || 'px'}; `;
        }
        else if (style === 'lineHeight') {
            css += `${varPrefix}line-height: ${cssValue}${styles?.lineHeightUnit || 'px'}; `;
        }
        else if (style === 'TABlineHeight') {
            tablet_css += `${varPrefix}line-height: ${cssValue}${styles?.TABlineHeightUnit || styles?.lineHeightUnit || 'px'}; `;
        }
        else if (style === 'MOBlineHeight') {
            mobile_css += `${varPrefix}line-height: ${cssValue}${styles?.MOBlineHeightUnit || styles?.lineHeightUnit || 'px'}; `;
        }
        else if (style === 'fontStyle') {
            css += `${varPrefix}font-style: ${cssValue}; `;
        }
        else if (style === 'textDecoration') {
            css += `${varPrefix}text-decoration: ${cssValue}; `;
        }
        else if (style === 'textTransform') {
            css += `${varPrefix}text-transform: ${cssValue}; `;
        }
    }
    css += `}\n`
    tablet_css += `}\n`
    mobile_css += `}\n`

    if (deviceType === 'Desktop') {
        return softMinifyCssStrings(css)
    }
    else if (deviceType === 'Tablet') {
        return softMinifyCssStrings(tablet_css)
    }
    else if (deviceType === 'Mobile') {
        return softMinifyCssStrings(mobile_css)
    }
}

export const applyTypographyCSS = (cssString) => {
    setTimeout(() => {
        let rootDocument = document
        const iframe = document.querySelector('[name="editor-canvas"]');
        if (iframe) {
            rootDocument = iframe.contentDocument || iframe.contentWindow.document;
        }

        const styleTag = rootDocument.createElement('style');
        styleTag.type = 'text/css';
        styleTag.innerHTML = cssString;
        rootDocument.head.appendChild(styleTag);
    }, 100)
}

export const loadGoogleFonts = (fontObj) => {
    const googleFontFamily = getGoogleFonts(fontObj);
    loadGoogleFontEditor(googleFontFamily)
}

export const getGoogleFonts = (fontObj) => {
    const fontFamilyList = [];

    function traverseStyles(styleObject) {
        for (const key in styleObject) {
            if (styleObject.hasOwnProperty(key)) {
                const value = styleObject[key];

                // Check if the current property is an object
                if (typeof value === 'object') {
                    // Recurse deeper
                    traverseStyles(value);
                }

                // Check for fontFamily and add to list
                if (key === 'fontFamily') {
                    fontFamilyList.push(`${value}:100,100italic,200,200italic,300,300italic,400,400italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic`);
                }
            }
        }
    }

    traverseStyles(fontObj);
    return fontFamilyList;
}
