/**
 * Helper Functions
 */
const validTags = [
    // Document metadata
    'html', 'head', 'title', 'base', 'link', 'meta', 'style',

    // Sectioning root
    'body',

    // Content sectioning
    'header', 'nav', 'section', 'article', 'aside', 'footer', 'address', 'main',

    // Text content
    'p', 'hr', 'pre', 'blockquote', 'ol', 'ul', 'li', 'dl', 'dt', 'dd', 'figure', 'figcaption', 'div',

    // Inline text semantics
    'a', 'em', 'strong', 'small', 's', 'cite', 'q', 'dfn', 'abbr', 'ruby', 'rb', 'rt', 'rtc', 'rp',
    'data', 'time', 'code', 'var', 'samp', 'kbd', 'sub', 'sup', 'i', 'b', 'u', 'mark', 'bdi', 'bdo', 'span',
    'br', 'wbr',

    // Image and multimedia
    'img', 'map', 'area', 'audio', 'video', 'track', 'embed', 'object', 'param', 'source', 'iframe', 'picture',

    // Embedded content
    'canvas', 'noscript', 'script', 'del', 'ins',

    // Table content
    'table', 'caption', 'colgroup', 'col', 'tbody', 'thead', 'tfoot', 'tr', 'td', 'th',

    // Forms
    'form', 'fieldset', 'legend', 'label', 'input', 'button', 'select', 'datalist', 'optgroup', 'option',
    'textarea', 'output', 'progress', 'meter',

    // Interactive elements
    'details', 'summary', 'dialog', 'menu', 'menuitem',

    // Web components
    'slot', 'template',

    // Scripting
    'script', 'noscript', 'template',

    // Other HTML5 tags
    'article', 'aside', 'bdi', 'bdo', 'data', 'figcaption', 'figure', 'main', 'mark', 'nav', 'output',
    'progress', 'section', 'summary', 'time', 'template'
];

export const sanitizeHtml = (htmlString) => {
    // Parse the HTML string into a DOM object
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");

    // Get all elements in the document
    const allElements = doc.body.getElementsByTagName("*");

    // Convert HTMLCollection to an array and iterate through all elements
    Array.from(allElements).forEach((element) => {
        // If the tag is not in the whitelist, remove it
        if (!validTags.includes(element.tagName.toLowerCase())) {
            // Replace invalid tags with just their text content
            element.replaceWith(document.createTextNode(element.textContent));
        }
    });

    // Return the sanitized HTML string
    return doc.body.innerHTML;
};

export const handleTitle = (text, id, images, setAttributes) => {
    let updatedImageArray = images.map((item) => {
        if (item.id == id) {
            return { ...item, title: text };
        }
        return item;
    });

    setAttributes({ images: updatedImageArray });
};

export const handleSubtitle = (text, id, images, setAttributes) => {
    let updatedImageArray = images.map((item) => {
        if (item.id == id) {
            return { ...item, subtitle: text };
        }
        return item;
    });

    setAttributes({ images: updatedImageArray });
};

export const handleShowButton = (showButton, id, images, setAttributes) => {
    let updatedImageArray = images.map((item) => {
        if (item.id == id) {
            return { ...item, showButton: showButton };
        }
        return item;
    });

    setAttributes({ images: updatedImageArray });
};

export const handleButtonText = (buttonText, id, images, setAttributes) => {
    let updatedImageArray = images.map((item) => {
        if (item.id == id) {
            return { ...item, buttonText: buttonText };
        }
        return item;
    });

    setAttributes({ images: updatedImageArray });
};

const validURL = (str) => {
    var pattern = new RegExp(
        "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
        "i"
    ); // fragment locator
    return !!pattern.test(str);
};

export const handleButtonURL = (buttonUrl, id, images, setAttributes) => {
    const validUrl = buttonUrl.length > 0 && validURL(buttonUrl);
    let updatedImageArray = images.map((item) => {
        if (item.id == id) {
            return {
                ...item,
                buttonUrl: buttonUrl,
                isValidUrl: validUrl,
            };
        }
        return item;
    });

    setAttributes({ images: updatedImageArray });
};

export const handleOpenNewTab = (openNewTab, id, images, setAttributes) => {
    let updatedImageArray = images.map((item) => {
        if (item.id == id) {
            return { ...item, openNewTab: openNewTab === true ? true : false };
        }
        return item;
    });

    setAttributes({ images: updatedImageArray });
};

export const handleShowSecondButton = (
    showSecondButton,
    id,
    images,
    setAttributes
) => {
    let updatedImageArray = images.map((item) => {
        if (item.id == id) {
            return { ...item, showSecondButton: showSecondButton };
        }
        return item;
    });

    setAttributes({ images: updatedImageArray });
};
export const handleSecondButtonText = (
    secondButtonText,
    id,
    images,
    setAttributes
) => {
    let updatedImageArray = images.map((item) => {
        if (item.id == id) {
            return { ...item, secondButtonText: secondButtonText };
        }
        return item;
    });

    setAttributes({ images: updatedImageArray });
};

export const handleSecondButtonURL = (
    secondButtonUrl,
    id,
    images,
    setAttributes
) => {
    const validUrl = secondButtonUrl.length > 0 && validURL(secondButtonUrl);
    let updatedImageArray = images.map((item) => {
        if (item.id == id) {
            return {
                ...item,
                secondButtonUrl: secondButtonUrl,
                isValidUrl: validUrl,
            };
        }
        return item;
    });

    setAttributes({ images: updatedImageArray });
};

export const handleSecondButtonOpenNewTab = (
    secondButtonOpenNewTab,
    id,
    images,
    setAttributes
) => {
    let updatedImageArray = images.map((item) => {
        if (item.id == id) {
            return {
                ...item,
                secondButtonOpenNewTab:
                    secondButtonOpenNewTab === true ? true : false,
            };
        }
        return item;
    });

    setAttributes({ images: updatedImageArray });
};


export const handleImageData = (key, value, id, images, setAttributes) => {
    let updatedImageArray = images.map((item) => {
        if (item.id == id) {
            // Handle content link URL validation
            if (key === 'contentLink') {
                const validUrl = value.length > 0 && validURL(value);
                return {
                    ...item,
                    [key]: value,
                    isContentUrlValid: validUrl
                };
            }
            return { ...item, [key]: value };
        }
        return item;
    });

    setAttributes({ images: updatedImageArray });
};


export const handleImage = (value, position, images, setAttributes) => {
    const newImage = { ...images[position] };
    const newImages = [...images];
    newImages[position] = newImage;

    newImages[position].id = value.id;
    newImages[position].url = value.url;
    newImages[position].alt = value.alt;
    newImages[position].caption = value.caption;

    setAttributes({ images: newImages });
};

/**
 * SVG Icon Support Helper Functions
 */

/**
 * Check if a value is an SVG URL
 * @param {string} value - The value to check
 * @returns {boolean} - True if the value is an SVG URL
 */
export const isSvgIconValue = (value) => {
    if (!value || typeof value !== "string") return false;
    try {
        const hasSvgExt = /\.svg(\?|#|$)/i.test(value);
        return hasSvgExt;
    } catch (e) {
        return false;
    }
};

/**
 * Check if a string contains inline SVG markup
 * @param {string} value - The value to check
 * @returns {boolean} - True if the value contains inline SVG markup
 */
export const isInlineSvgMarkup = (value) => {
    return typeof value === "string" && /<svg[\s\S]*<\/svg>/i.test(value);
};

/**
 * Fetch SVG file and return sanitized inline SVG markup
 * @param {string} svgUrl - The SVG URL to fetch
 * @returns {Promise<string>} - The sanitized SVG markup
 */
export const fetchSvgAsHTML = async (svgUrl) => {
    if (!isSvgIconValue(svgUrl)) return "";
    try {
        const res = await fetch(svgUrl, { credentials: "omit" });
        if (!res.ok) return "";
        const raw = await res.text();
        // Ensure we only inline the <svg ...>...</svg> fragment
        const match = raw.match(/<svg[\s\S]*?<\/svg>/i);
        const svgOnly = match ? match[0] : raw;

        // Use the global sanitizeHTML function if available
        if (typeof window !== 'undefined' && window.eb_frontend && window.eb_frontend.sanitizeHTML) {
            return window.eb_frontend.sanitizeHTML(svgOnly);
        }
        return svgOnly;
    } catch (e) {
        return "";
    }
};

/**
 * Function to load SVG icons from URLs
 * @param {HTMLElement} container - The container element to search for SVG icons
 */
export const loadSvgIcons = async (container) => {
    const svgElements = container.querySelectorAll('.eb-svg-icon[data-svg-url]');

    for (const element of svgElements) {
        const svgUrl = element.getAttribute('data-svg-url');
        if (svgUrl) {
            try {
                const svgContent = await fetchSvgAsHTML(svgUrl);
                if (svgContent) {
                    element.innerHTML = svgContent;
                    element.removeAttribute('data-svg-url'); // Clean up
                }
            } catch (error) {
                console.warn('Failed to load SVG icon:', svgUrl, error);
            }
        }
    }
};

/**
 * Render icon based on type (FontAwesome, Dashicon, SVG URL, or inline SVG)
 * @param {string} iconValue - The icon value
 * @param {string} className - Additional CSS class name
 * @returns {JSX.Element|null} - The rendered icon element
 */
export const renderIcon = (iconValue, className = "") => {
    if (!iconValue) return null;

    // Get sanitization functions
    const sanitizeHTML = (typeof window !== 'undefined' && window.eb_frontend && window.eb_frontend.sanitizeHTML)
        ? window.eb_frontend.sanitizeHTML
        : (html) => html;
    const sanitizeIconValue = (typeof window !== 'undefined' && window.eb_frontend && window.eb_frontend.sanitizeIconValue)
        ? window.eb_frontend.sanitizeIconValue
        : (icon) => icon;

    // Handle inline SVG markup
    if (isInlineSvgMarkup(iconValue)) {
        return (
            <span
                className={className}
                dangerouslySetInnerHTML={{ __html: sanitizeHTML(iconValue) }}
            />
        );
    }

    // Handle SVG URLs - return a placeholder that will be replaced with actual SVG
    if (isSvgIconValue(iconValue)) {
        return (
            <span
                className={`eb-svg-icon ${className}`}
                data-svg-url={iconValue}
            />
        );
    }

    // Handle FontAwesome and Dashicon icons (existing behavior)
    return (
        <i
            aria-hidden="true"
            className={sanitizeIconValue(iconValue)}
        />
    );
};

/**
 * Generate arrow HTML with SVG support for different slider versions
 * @param {string} iconValue - The icon value
 * @param {string} direction - The arrow direction ('prev' or 'next')
 * @returns {string} - The generated HTML string
 */
export const generateArrowHTML = (iconValue, direction) => {
    // Get sanitization functions
    const sanitizeHTML = (typeof window !== 'undefined' && window.eb_frontend && window.eb_frontend.sanitizeHTML)
        ? window.eb_frontend.sanitizeHTML
        : (html) => html;
    const sanitizeIconValue = (typeof window !== 'undefined' && window.eb_frontend && window.eb_frontend.sanitizeIconValue)
        ? window.eb_frontend.sanitizeIconValue
        : (icon) => icon;

    if (isInlineSvgMarkup(iconValue)) {
        return `<div class="slick-${direction}"><span>${sanitizeHTML(iconValue)}</span></div>`;
    } else if (isSvgIconValue(iconValue)) {
        return `<div class="slick-${direction}"><span class="eb-svg-icon" data-svg-url="${iconValue}"></span></div>`;
    } else {
        return `<div class="slick-${direction}"><i aria-hidden="true" class="${sanitizeIconValue(iconValue)}"></i></div>`;
    }
};
