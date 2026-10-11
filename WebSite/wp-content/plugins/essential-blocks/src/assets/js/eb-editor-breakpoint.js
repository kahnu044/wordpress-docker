
//set breakpoint css variable to root (both parent document and editor iframe)
const breakpoints = EssentialBlocksLocalize.responsiveBreakpoints;

/**
 * Apply breakpoint CSS variables to a given root element.
 * @param {HTMLElement} root - The documentElement to set properties on.
 */
const applyBreakpointVars = (root) => {
    if (!root) return;
    Object.keys(breakpoints).forEach((item) => {
        root.style.setProperty(`--eb-${item}-breakpoint`, `${breakpoints[item]}px`);
    });
};

// Set on parent document
if (Object.keys(breakpoints).length > 0) {
    applyBreakpointVars(document.documentElement);
}

// Also set inside the editor iframe when it becomes available
const applyToIframe = () => {
    const iframe = document.querySelector('iframe[name^="editor-canvas"]');
    if (iframe?.contentDocument?.documentElement) {
        applyBreakpointVars(iframe.contentDocument.documentElement);
    }
};

// Observe for iframe appearance and re-apply
if (Object.keys(breakpoints).length > 0) {
    // Try immediately
    applyToIframe();

    // Watch for iframe to appear or reload
    const observer = new MutationObserver(() => {
        applyToIframe();
    });
    observer.observe(document.body, { childList: true, subtree: true });
}
