/**
 * Marker title/content are plain text. Older editor code stored them through
 * escapeAttribute(), so saved values may contain entities such as "&amp;".
 * Decode those entities without letting any markup through: every "<" is
 * escaped first, so the inert DOMParser document can only ever contain text.
 */
const decodeLegacyEscapedText = (value) => {
    if (value === undefined || value === null) {
        return "";
    }

    const text = String(value);
    if (text.indexOf("&") === -1) {
        return text;
    }

    const doc = new window.DOMParser().parseFromString(
        text.replace(/</g, "&lt;"),
        "text/html"
    );

    return doc.body ? doc.body.textContent : text;
};

/**
 * Build the InfoWindow content as a DOM node. Marker values are assigned via
 * textContent only, so they can never be interpreted as HTML.
 */
export const buildInfoWindowContent = (marker) => {
    const wrapper = document.createElement("div");
    wrapper.className = "eb-google-map-overview";

    const title = document.createElement("h6");
    title.className = "eb-google-map-overview-title";
    title.textContent = decodeLegacyEscapedText(marker.title);

    const content = document.createElement("div");
    content.className = "eb-google-map-overview-content";

    if (marker.content) {
        const paragraph = document.createElement("p");
        paragraph.textContent = decodeLegacyEscapedText(marker.content);
        content.appendChild(paragraph);
    }

    wrapper.appendChild(title);
    wrapper.appendChild(content);

    return wrapper;
};
