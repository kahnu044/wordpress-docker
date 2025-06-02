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