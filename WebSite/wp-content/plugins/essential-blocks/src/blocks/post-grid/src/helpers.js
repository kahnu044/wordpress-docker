/**
 * Parse a JSON list attribute (headerMeta, footerMeta, selectedTaxonomyItems) into an array.
 *
 * Saved values aren't always lists: an empty string, invalid JSON or "false" (written by the old
 * Source-switch handler) all become [], so callers can always .map()/.filter().
 *
 * @param {string} value JSON string, e.g. '[{"value":"date","label":"Published Date"}]'.
 * @return {Array}
 */
export const parseJsonList = (value) => {
    if (typeof value !== "string" || value === "") {
        return [];
    }

    try {
        const parsed = JSON.parse(value);
        return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
        return [];
    }
};

/**
 * Parse a JSON object attribute (selectedTaxonomy: '{"value":"category","label":"Category"}').
 *
 * @param {string} value
 * @return {Object|null} null when the value is empty, invalid JSON or not an object.
 */
export const parseJsonObject = (value) => {
    if (typeof value !== "string" || value === "") {
        return null;
    }

    try {
        const parsed = JSON.parse(value);
        return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : null;
    } catch (error) {
        return null;
    }
};

/**
 * Keep the first `limit` words of a title or excerpt. A limit below 1 (-1, 0 or empty) keeps the
 * whole text, the same as the title/excerpt partials in views/post-partials on the frontend.
 *
 * @param {string}        text
 * @param {number|string} limit Title Words / Excerpt Words.
 * @return {string}
 */
export const limitWords = (text, limit) => {
    if (typeof text !== "string") {
        return "";
    }

    const maxWords = parseInt(limit, 10);
    return maxWords > 0 ? text.trim().split(" ", maxWords).join(" ") : text;
};

/**
 * Query source for comparisons: blocks saved before v6 store "posts" for "post".
 *
 * @param {string} source queryData.source
 * @return {string}
 */
export const normalizeSource = (source) => (source === "posts" ? "post" : source);
