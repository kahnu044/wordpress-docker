/**
 * WordPress Dependencies
 */
import { __, sprintf } from "@wordpress/i18n";
import { registerPlugin } from "@wordpress/plugins";
import { BlockSettingsMenuControls } from "@wordpress/block-editor";
import { MenuGroup, MenuItem } from "@wordpress/components";
import { useSelect, useDispatch } from "@wordpress/data";
import { getBlockType, getBlockTypes } from "@wordpress/blocks";

/**
 * Copy/Paste EB Styles.
 *
 * Adds "Copy EB Styles" / "Paste EB Styles" to the block options (kebab) menu
 * for every essential-blocks/* block. A rule-based classifier decides per
 * attribute whether it is STYLE (copied) or CONTENT/DATA/IDENTITY (skipped),
 * so pasting restyles a block without touching its text, media, links or
 * query settings. The bias is toward over-exclusion: an incomplete paste is
 * harmless, pasting content attributes would destroy user data.
 *
 * The payload is stored in localStorage rather than the async Clipboard API
 * so it works on non-https sites and across posts in the same browser. Paste
 * is restricted to the same block type. Style keys absent on the source are
 * explicitly reset so the target falls back to its registered defaults.
 */

const STORAGE_KEY = "ebCopiedStyles";
const EB_PREFIX = "essential-blocks/";

// Identity, data-binding, query, editor state — never style.
const EXCLUDE_EXACT = [
    "blockId",
    "blockRoot",
    "blockMeta",
    "blockClientId",
    "version",
    "cover",
    "resOption",
    "cssId",
    "anchor",
    "className",
    "lock",
    "metadata",
    "align",
    "source",
    "tagName",
    "inheritedTagName",
    "currentPostId",
    "currentPostType",
    "queryData",
    "queryResults",
    "postTerms",
    "expansionIndicator",
    "openInNewTab",
    "defaultFilter",
    "selectedTaxonomy",
    "selectedTaxonomyItems",
    "suffix",
    "timeFormat",
    "dateFormat",
    // Block-specific content/data attrs (see cross-block audit).
    "target",
    "startValue",
    "counterTitle",
    "mainPrice",
    "salePrice",
    "priceCurrency",
    "pricePeriod",
    "salePricePeriod",
    "defaultSubtitle",
    "endTimeStamp",
    "evergreenTimerHours",
    "evergreenTimerMinutes",
    "restartTime",
    "recurringCountdownEnd",
    "latitude",
    "longitude",
    "uniqueIdNumber",
    "mapType",
    "mapZoom",
    "number",
    "imageUrlOld",
    "numberOfPosts",
    "numberOfImages",
    "defaultValue",
    "dynamicValue",
    "dynamicValueLoader",
    // Form field identity: rendered into id/name/data-field-*. Copying it
    // duplicates the POST key and breaks label[for]; radio/checkbox groups
    // sharing a name fuse into one group.
    "fieldName",
    // Dual-button link targets: rendered into <a href>. The URL exclude pattern
    // is $-anchored, so the One/Two suffixes slip past it (cf. imageUrlOld).
    "buttonURLOne",
    "buttonURLTwo",
    // RichText content: job title, testimonial attribution. The naked-stem regex
    // only allows front|back|left|right|sub|main prefixes, so these slip past.
    "jobTitle",
    "userName",
    "companyName",
    // Bare text separators — the literal glyph between two values, not style
    // pickers. Distinct from separatorColor/separatorType/separatorIcon/
    // showSeparator, which are genuine style and stay classified as such.
    // "separator" is shared by number-counter (thousands), taxonomy, and
    // business-hours (time range, parsed back by frontend.js).
    "periodSeparator",
    "separator",
    // Bare divider glyph printed between value and total (5 / 10). Same family
    // as separator/periodSeparator above — name-only, there is no divider
    // pattern. Distinct from the fixed .value-divider CSS class.
    "valueDivider",
    // Display text the naked-stem regex misses: it only allows the
    // front|back|left|right|sub|main prefixes, so chart/menuItem/step/section
    // stems slip past. ("chartDesc" misses twice — "desc" is not a stem
    // either; the alternation has "description".) Style siblings such as
    // titleColor, sectionTitleColor and stepSubtitleTypo* keep their own
    // names and stay copyable under exact match.
    "chartTitle",
    "chartDesc",
    "menuItemTitle",
    "stepName",
    "stepSubtitle",
    "sectionTitle",
    // Media-library picks. The URL exclude pattern is $-anchored, so these
    // "...Image" endings slip past it (cf. imageUrlOld, buttonURLOne). Their
    // attachment-id partners previewImageId/placeholderImageId are already
    // excluded by the (Id|ID)$ pattern.
    "previewImage",
    "placeholderImage",
    // Chosen post-meta fields, stored as a JSON string. Because the type is
    // "string" and not array/object, the frequency fallback below never sees
    // it. Sibling footerMetaTextAlign/footerMetaMargin*/footerMetaSpace* are
    // genuine style and stay classified as such.
    "footerMeta",
];

// Style attrs that the exclude rules below would otherwise catch.
const KEEP_EXACT = ["contentLists", "enableContents", "loadMoreOptions", "floatingLabel"];
const KEEP_PATTERNS = [
    /bgImage(URL|ID)$/, // background generator image (style)
    /(ObjectPosition|MaskPosition)$/, // image styling positions
    /Icon$/i, // icon picks are decoration
    /Typography$/, // typography objects
    /LiquidGlass$/, // glass-effect style objects
];

// Content / data / identity name shapes.
const EXCLUDE_PATTERNS = [
    /Text(One|Two|Three)?$/, // button labels, headings, captions
    /(Url|URL|Link|Links)$/, // links, media urls, link toggles
    /(Id|ID)$/, // media/form/post/sheet ids
    /Alt$/, // image alt text
    /(Prefix|Suffix)$/, // text prefixes/suffixes
    /Tag$/i, // semantic tag choice (h2, figure…)
    /TagName$/i,
    /Data$/i, // queryData, sliderData, animationData…
    /(Label|Message|Heading|Caption|Placeholder)s?$/,
    /Length$/, // titleLength/contentLength trim counts
    /Address(es)?$/i, // map addresses
    /Token$/i, // API tokens
    // naked content stems: title, frontContent, description, name…
    /^(front|back|left|right|sub|main)?_?(title|content|description|label|name|caption|message|heading|placeholder|excerpt|quote|text)\d?$/i,
];

/**
 * Attribute-name frequency across all EB blocks. Generator-produced style
 * attrs recur in many blocks; block-specific arrays/objects are almost
 * always content collections (slides, features, testimonials, hotspots…).
 */
let keyFrequency = null;
const getKeyFrequency = () => {
    if (keyFrequency) {
        return keyFrequency;
    }
    keyFrequency = {};
    getBlockTypes().forEach((type) => {
        if (!type.name.startsWith(EB_PREFIX)) {
            return;
        }
        Object.keys(type.attributes || {}).forEach((key) => {
            keyFrequency[key] = (keyFrequency[key] || 0) + 1;
        });
    });
    return keyFrequency;
};

const isStyleAttribute = (key, schema) => {
    if (KEEP_EXACT.includes(key)) {
        return true;
    }
    if (KEEP_PATTERNS.some((pattern) => pattern.test(key))) {
        return true;
    }
    if (EXCLUDE_EXACT.includes(key)) {
        return false;
    }
    if (EXCLUDE_PATTERNS.some((pattern) => pattern.test(key))) {
        return false;
    }
    // Block-specific structures (appear in <5 block types) = content.
    const type = schema?.type;
    if ((type === "array" || type === "object") && (getKeyFrequency()[key] || 0) < 5) {
        return false;
    }
    return true;
};

const copyStyles = (block) => {
    const schema = getBlockType(block.name)?.attributes || {};
    const styles = {};
    Object.keys(block.attributes).forEach((key) => {
        if (isStyleAttribute(key, schema[key])) {
            styles[key] = block.attributes[key];
        }
    });
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ name: block.name, styles }));
    return Object.keys(styles).length;
};

const readCopiedStyles = () => {
    try {
        return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "null");
    } catch (e) {
        return null;
    }
};

const buildPasteAttributes = (block, copied) => {
    const schema = getBlockType(block.name)?.attributes || {};
    const next = {};
    Object.keys(schema).forEach((key) => {
        if (!isStyleAttribute(key, schema[key])) {
            return;
        }
        // Present on source: apply. Absent: reset to undefined so the
        // registered default takes over instead of the target's old value.
        next[key] = Object.prototype.hasOwnProperty.call(copied.styles, key)
            ? copied.styles[key]
            : undefined;
    });
    return next;
};

const EBCopyPasteStyles = () => {
    const block = useSelect((select) => {
        const blockEditor = select("core/block-editor");
        const clientIds = blockEditor.getSelectedBlockClientIds();
        return clientIds.length === 1 ? blockEditor.getBlock(clientIds[0]) : null;
    }, []);

    const { updateBlockAttributes } = useDispatch("core/block-editor");
    const { createNotice } = useDispatch("core/notices");

    if (!block || !block.name.startsWith(EB_PREFIX)) {
        return null;
    }

    const onCopy = (onClose) => {
        const count = copyStyles(block);
        createNotice(
            "info",
            sprintf(
                /* translators: %d: number of copied style settings */
                __("EB styles copied (%d settings).", "essential-blocks"),
                count
            ),
            { type: "snackbar", isDismissible: true }
        );
        onClose();
    };

    const onPaste = (onClose) => {
        const copied = readCopiedStyles();
        if (!copied || copied.name !== block.name) {
            createNotice(
                "warning",
                __("Nothing copied for this block type yet.", "essential-blocks"),
                { type: "snackbar", isDismissible: true }
            );
        } else {
            updateBlockAttributes(block.clientId, buildPasteAttributes(block, copied));
            createNotice("info", __("EB styles pasted.", "essential-blocks"), {
                type: "snackbar",
                isDismissible: true,
            });
        }
        onClose();
    };

    return (
        <BlockSettingsMenuControls>
            {({ onClose }) => (
                <MenuGroup label={__("Essential Blocks", "essential-blocks")}>
                    <MenuItem onClick={() => onCopy(onClose)}>
                        {__("Copy EB Styles", "essential-blocks")}
                    </MenuItem>
                    <MenuItem onClick={() => onPaste(onClose)}>
                        {__("Paste EB Styles", "essential-blocks")}
                    </MenuItem>
                </MenuGroup>
            )}
        </BlockSettingsMenuControls>
    );
};

registerPlugin("eb-copy-paste-styles", {
    render: EBCopyPasteStyles,
});
