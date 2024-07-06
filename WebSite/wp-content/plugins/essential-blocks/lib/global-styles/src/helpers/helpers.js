import {
    select as wpSelect
} from '@wordpress/data';
const { loadGoogleFontEditor } = window.EBControls;

export const getGlobalSettings = (select = wpSelect) => {
    return {
        getGlobalColors: select('essential-blocks').getGlobalColors(),
        getCustomColors: select('essential-blocks').getCustomColors(),
        getGradientColors: select('essential-blocks').getGradientColors(),
        getCustomGradientColors: select('essential-blocks').getCustomGradientColors(),
        getGlobalTypography: select('essential-blocks').getGlobalTypography()
    }
}

export const generateTypographyCSS = (styles) => {
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
            cssString += generateCustomTypographyCSS(styles[element])
        }
        else {
            if (element === 'allHeadings') {
                customCssString += `.editor-styles-wrapper .eb-parent-wrapper ${selector} { `;
                customCssString += generateCSSStyles(styles[element])
                customCssString += `}\n`; // Close the style block
            }
            else {
                cssString += `.editor-styles-wrapper .eb-parent-wrapper ${selector} { `;
                cssString += generateCSSStyles(styles[element])
                cssString += `}\n`; // Close the style block
            }
        }
    }

    return customCssString + cssString;
}

const generateCustomTypographyCSS = (styles) => {

    if (typeof styles === 'object' && Object.keys(styles).length === 0) {
        return ''
    }
    let css = 'body {' // Start body tag for css var
    for (const element in styles) {
        css += generateCSSStyles(styles[element], element)
    }
    css += `}\n`; // Close the style block
    return css;
}

const generateCSSStyles = (styles, varPrefix = '') => {
    if (typeof styles === 'object' && Object.keys(styles).length === 0) {
        return ''
    }
    if (varPrefix.length > 0) {
        varPrefix = `--${varPrefix}-`
    }
    let css = ''
    for (const style in styles) {
        // Convert camelCase to kebab-case for CSS properties
        const cssProperty = style.replace(/([A-Z])/g, "-$1").toLowerCase();
        const cssValue = styles[style];
        if (style === 'fontFamily') {
            css += `${varPrefix}font-family: ${cssValue}; `;
        }
        else if (style === 'fontSize') {
            css += `${varPrefix}font-size: ${cssValue}${styles?.fontSizeUnit || 'px'}; `;
        }
        else if (style === 'fontWeight') {
            css += `${varPrefix}font-weight: ${cssValue}; `;
        }
        else if (style === 'letterSpacing') {
            css += `${varPrefix}letter-spacing: ${cssValue}${styles?.letterSpacingUnit || 'px'}; `;
        }
        else if (style === 'lineHeight') {
            css += `${varPrefix}line-height: ${cssValue}${styles?.lineHeightUnit || 'px'}; `;
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
    return css;
}

export const applyTypographyCSS = (cssString) => {
    const styleTag = document.createElement('style');
    styleTag.type = 'text/css';
    styleTag.innerHTML = cssString;
    document.head.appendChild(styleTag);
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
