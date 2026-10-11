
// Tells the inline failsafe printed before this file (Core\Scripts) that
// the loader ran, so it leaves the animations to it.
window.ebAnimationLoaded = true;

// Animated blocks are saved as `visibility: hidden` until this script swaps
// their `eb___` classes, so anything that stops it (running after
// DOMContentLoaded, a missing global, an observer that never fires) would
// leave the block invisible for good.
var ebAnimationInit = function () {
    var keySelector = ".eb___animated";
    ebAnimationwaitForElement(keySelector).then((elm) => {
        // Use Intersection Observer (supported in all modern browsers since 2016)
        if (window.IntersectionObserver) {
            initializeAnimationObserver(keySelector);
        } else {
            // Fallback for very old browsers (IE, old Safari)
            initializeFallbackAnimation(keySelector);
        }
    });
};

// When dom is ready, RUN (also when an optimizer loads this after the event)
if (document.readyState === "loading") {
    window.addEventListener("DOMContentLoaded", ebAnimationInit);
} else {
    // Next tick, so the helpers defined below are assigned first.
    setTimeout(ebAnimationInit, 0);
}

/**
 * Frontend safety net: shortly after load, anything animated that is on
 * screen but still hidden means the observer didn't fire. Reveal it, and
 * switch the rest of the page to the scroll-based fallback.
 */
var ebAnimationSafetyNet = function () {
    if (isEbAnimationEditor()) {
        return;
    }
    var selector = ".eb___animated";
    var stuck = Array.prototype.filter.call(document.querySelectorAll(selector), function (elem) {
        var rect = elem.getBoundingClientRect();
        var windowHeight = window.innerHeight || document.documentElement.clientHeight;
        return rect.height > 0 && rect.bottom > 0 && rect.top < windowHeight;
    });
    if (stuck.length === 0) {
        return;
    }
    stuck.forEach(triggerAnimation);
    initializeFallbackAnimation(selector);
};

window.addEventListener("load", function () {
    setTimeout(ebAnimationSafetyNet, 1500);
});

/**
 * Whether this runs in the block editor. `eb_conditional_localize` may be
 * undefined on the frontend (e.g. an optimizer delays the localized data), and
 * reading an undeclared global throws even with optional chaining.
 */
var isEbAnimationEditor = function () {
    return typeof eb_conditional_localize !== "undefined" && !!eb_conditional_localize?.editor_type;
};

/**
 * Async function for load animation
 * @param {*} selector
 * @returns {Promise}
 */
var ebAnimationwaitForElement = function (selector) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const editorRoot = getEditorRoot()

            if (editorRoot?.querySelector(selector)) {
                return resolve(editorRoot.querySelector(selector));
            }

            const observer = new MutationObserver(() => {
                if (editorRoot && editorRoot.querySelector(selector)) {
                    resolve(editorRoot.querySelector(selector));
                    observer.disconnect();
                }
            });

            observer.observe(document.body, {
                childList: true,
                attributes: true,
                subtree: true,
            });
        }, 500)
    });
};

/**
 * Function for check if the element in the viewport
 * @param {*} elem
 * @param {number} threshold - Optional threshold (0-1) for how much of the element should be visible (default: 0.1)
 * @returns {boolean}
 */
var isInViewport = function (elem, threshold = 0.1) {
    var rect = elem.getBoundingClientRect();
    var windowHeight = window.innerHeight || document.documentElement.clientHeight;
    var windowWidth = window.innerWidth || document.documentElement.clientWidth;

    // Calculate element dimensions
    var elemHeight = rect.bottom - rect.top;
    var elemWidth = rect.right - rect.left;

    // Calculate how much of the element is visible
    var visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
    var visibleWidth = Math.min(rect.right, windowWidth) - Math.max(rect.left, 0);

    // Ensure visible dimensions are not negative
    visibleHeight = Math.max(0, visibleHeight);
    visibleWidth = Math.max(0, visibleWidth);

    // Calculate visibility ratios
    var heightRatio = elemHeight > 0 ? visibleHeight / elemHeight : 0;
    var widthRatio = elemWidth > 0 ? visibleWidth / elemWidth : 0;

    // Element is considered in viewport if the specified threshold of both dimensions is visible
    return heightRatio >= threshold && widthRatio >= threshold;
};

/**
 * Initialize Intersection Observer for animation detection
 * @param {string} selector
 */
var initializeAnimationObserver = function (selector) {
    // Create observer with optimized settings
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                triggerAnimation(entry.target);
                // Stop observing this element once animation is triggered
                observer.unobserve(entry.target);
            }
        });
    }, {
        // Trigger when 10% of element is visible
        threshold: 0.1,
        // Add some margin to trigger slightly before element enters viewport
        // This creates a smoother user experience
        rootMargin: '0px 0px -50px 0px',
        // Use the appropriate root for editor context
        root: getObserverRoot()
    });

    // Observe all current elements
    const elements = getEditorRoot().querySelectorAll(selector);
    elements.forEach((element) => {
        observer.observe(element);
    });

    // Watch for new elements being added dynamically
    setupDynamicElementObserver(observer, selector);
};

/**
 * Trigger animation on element
 * @param {Element} element
 */
var triggerAnimation = function (element) {
    let toRemoveClasses = [];
    let toAddClasses = [];
    element.classList.forEach((classname) => {
        if (classname.includes("eb___")) {
            toRemoveClasses.push(classname);
            toAddClasses.push(classname.replace("eb___", "eb__"));
        }
    });
    element.classList.add(...toAddClasses);
    element.classList.remove(...toRemoveClasses);
    // The rule that reveals the block (`.eb_animation.eb__animated`) only
    // matches after this runs, so "remove unused CSS" optimizers that read the
    // served HTML strip it, leaving the block hidden. Reveal it inline too; a
    // running entrance animation still overrides these.
    if (!isEbAnimationEditor()) {
        element.style.visibility = "visible";
        element.style.opacity = "1";
    }
};

/**
 * Setup observer for dynamically added elements
 * @param {IntersectionObserver} animationObserver
 * @param {string} selector
 */
var setupDynamicElementObserver = function (animationObserver, selector) {
    const mutationObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    // Check if the added node matches our selector
                    if (node.matches && node.matches(selector)) {
                        animationObserver.observe(node);
                    }
                    // Check for matching elements within the added node
                    const childElements = node.querySelectorAll && node.querySelectorAll(selector);
                    if (childElements) {
                        childElements.forEach((element) => {
                            animationObserver.observe(element);
                        });
                    }
                }
            });
        });
    });

    mutationObserver.observe(getEditorRoot(), {
        childList: true,
        subtree: true
    });
};

/**
 * Get the appropriate root for Intersection Observer
 * @returns {Element|null}
 */
var getObserverRoot = function () {
    if (!isEbAnimationEditor()) {
        return null; // Use viewport as root
    }

    const iframe = document.querySelector('iframe[name^="editor-canvas"]');
    if (iframe) {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
        return iframeDoc?.querySelector('.editor-styles-wrapper') || null;
    }
    return document.querySelector('.editor-styles-wrapper');
};

/**
 * Initialize fallback animation system for older browsers
 * @param {string} selector
 */
var initializeFallbackAnimation = function (selector) {
    const elements = getEditorRoot().querySelectorAll(selector);

    // Initial check
    replaceAnimationClasses(elements);

    // Throttled scroll listener for better performance
    let ticking = false;
    window.addEventListener("scroll", function () {
        if (!ticking) {
            requestAnimationFrame(function () {
                replaceAnimationClasses(elements);
                ticking = false;
            });
            ticking = true;
        }
    }, true);
};

/**
 * Function for replace animation classes (fallback for older browsers)
 * @param {NodeList} elements
 */
var replaceAnimationClasses = function (elements) {
    elements.forEach((element) => {
        if (isInViewport(element)) {
            triggerAnimation(element);
        }
    });
};

/**
 * get Editor Root selector (iframe-aware)
 *
 * @returns {element}
 */
var getEditorRoot = function () {
    if (!isEbAnimationEditor()) {
        return document
    }
    const iframe = document.querySelector('iframe[name^="editor-canvas"]');
    if (iframe) {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
        return iframeDoc?.querySelector('.editor-styles-wrapper') || document.querySelector('.editor-styles-wrapper');
    }
    return document.querySelector('.editor-styles-wrapper');
};
