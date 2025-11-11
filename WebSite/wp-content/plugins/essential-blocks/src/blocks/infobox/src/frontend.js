/**
 * Frontend JavaScript for Essential Blocks Infobox
 * Handles clickable infobox functionality while preserving inline links
 * Includes comprehensive XSS prevention measures
 */
import domReady from "@wordpress/dom-ready";

const { getDataAttribute, sanitizeTarget, sanitize, sanitizeAttribute } = window.eb_frontend;

domReady(function () {
    // Handle clickable infobox functionality
    const clickableInfoboxes = document.querySelectorAll(
        '.eb-infobox-wrapper[data-clickable="true"]',
    );

    clickableInfoboxes.forEach(function (infobox) {
        // Safely get and sanitize all data attributes
        const href = getDataAttribute(infobox, "href", "url");
        const target = sanitizeTarget(getDataAttribute(infobox, "target"));

        // Add cursor pointer style
        infobox.style.cursor = "pointer";

        infobox.addEventListener("click", function (event) {
            // Check if the clicked element or its parent is a link
            const clickedElement = event.target;
            const isLinkOrInLink = clickedElement.closest("a");

            // If user clicked on a link (like title anchor), don't trigger infobox click
            if (isLinkOrInLink) {
                return; // Let the link handle its own click
            }

            // Prevent default behavior
            event.preventDefault();

            // Double-check URL sanitization before navigation for extra security
            const finalHref = sanitize(href, "url");
            const finalTarget = sanitizeTarget(target);

            // Handle infobox click with sanitized values
            if (finalTarget === "_blank") {
                window.open(finalHref, "_blank", "noopener,noreferrer");
            } else {
                window.location.href = finalHref;
            }
        });

        // Add keyboard accessibility with sanitized values
        infobox.setAttribute("tabindex", sanitizeAttribute("0"));
        infobox.setAttribute("role", sanitizeAttribute("button"));
        infobox.setAttribute(
            "aria-label",
            sanitizeAttribute("Clickable infobox"),
        );

        infobox.addEventListener("keydown", function (event) {
            // Handle Enter and Space key presses
            if (event.key === "Enter" || event.key === " ") {
                // Check if focus is on a link inside the infobox
                const focusedElement = document.activeElement;
                const isLinkOrInLink = focusedElement.closest("a");

                if (isLinkOrInLink) {
                    return; // Let the link handle its own keyboard event
                }

                event.preventDefault();

                // Double-check URL sanitization before navigation for extra security
                const finalHref = sanitize(href, "url");
                const finalTarget = sanitizeTarget(target);

                // Trigger infobox click with sanitized values
                if (finalTarget === "_blank") {
                    window.open(finalHref, "_blank", "noopener,noreferrer");
                } else {
                    window.location.href = finalHref;
                }
            }
        });
    });
});
