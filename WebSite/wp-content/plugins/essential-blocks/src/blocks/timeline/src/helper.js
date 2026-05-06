/**
 * Timeline Helper Functions for Editor
 * Handles progress line animation and scroll-based progress calculation in the editor
 */
import { getEditorDocument, getEditorDocumentElement } from "@essential-blocks/controls";

/**
 * Convert CSS color value to usable format for SVG
 * Handles CSS variables, rgba, gradients, etc.
 * @param {string} color - CSS color value
 * @returns {Object|string} - Returns gradient info object for gradients, or color string for solid colors
 */
function resolveColorForSVG(color) {
    if (!color) return '#3b82f6';

    // Handle CSS variables like var(--eb-global-heading-color)
    if (color.startsWith('var(')) {
        const varName = color.match(/var\(([^)]+)\)/)?.[1];
        if (varName) {
            const resolvedColor = getComputedStyle(getEditorDocumentElement()).getPropertyValue(varName).trim();
            if (resolvedColor) {
                return resolveColorForSVG(resolvedColor);
            }
        }
        return '#3b82f6'; // fallback
    }

    // Handle gradient - extract all colors with their positions
    if (color.includes('gradient')) {
        const stops = [];

        // Match all color definitions with percentages
        // Matches: rgb(252,185,0) 0%, rgba(216,98,98,1) 16%, #ff6900 100%
        const colorMatches = color.matchAll(/(rgba?\([^)]+\)|#[0-9A-Fa-f]{6}|#[0-9A-Fa-f]{3})\s*(\d+)%/g);

        for (const match of colorMatches) {
            stops.push({
                color: match[1],
                offset: parseInt(match[2]) / 100
            });
        }

        // If we found gradient stops, return gradient info
        if (stops.length > 0) {
            return { isGradient: true, stops };
        }

        // Fallback: just extract first color if no percentages found
        const rgbMatch = color.match(/rgba?\([^)]+\)/);
        if (rgbMatch) {
            return rgbMatch[0];
        }
        const hexMatch = color.match(/#[0-9A-Fa-f]{6}|#[0-9A-Fa-f]{3}/);
        if (hexMatch) {
            return hexMatch[0];
        }
        return '#3b82f6'; // fallback
    }

    // Return as-is for hex, rgb, rgba, named colors
    return color;
}

/**
 * Initialize timeline progress animation in editor
 * @param {HTMLElement} wrapper - Timeline wrapper element
 */
export function initTimelineProgressEditor(wrapper) {
    const progressLine = wrapper.querySelector('.eb-timeline-progress-fill');
    const timelineItems = wrapper.querySelectorAll('.eb-timeline-item');

    if (!progressLine || timelineItems.length === 0) {
        return null;
    }

    // Set up scroll-based progress for vertical timeline
    return setupScrollProgressEditor(wrapper, progressLine, timelineItems);
}

/**
 * Setup scroll-based progress animation for editor
 * @param {HTMLElement} wrapper - Timeline wrapper element
 * @param {HTMLElement} progressLine - Progress line fill element
 * @param {NodeList} timelineItems - Timeline item elements
 * @returns {Function} Cleanup function
 */
export function setupScrollProgressEditor(wrapper, progressLine, timelineItems) {
    let ticking = false;

    // Find all possible scrollable containers
    const scrollContainers = findAllScrollableParents(wrapper);

    function updateProgress() {
        const wrapperRect = wrapper.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const wrapperTop = wrapperRect.top;
        const wrapperHeight = wrapperRect.height;

        // Calculate progress based on scroll position for vertical timeline
        let progressPercentage = 20;

        // Vertical timeline progress based on vertical scroll
        if (wrapperTop <= viewportHeight * 0.8) {
            // Start progress when timeline is 80% visible
            const scrolledPast = Math.max(0, (viewportHeight * 0.8) - wrapperTop);
            const totalScrollableHeight = wrapperHeight + (viewportHeight * 0.2);
            progressPercentage = Math.min(100, (scrolledPast / totalScrollableHeight) * 100);

            // Ensure minimum progress when timeline is visible
            if (progressPercentage < 5 && wrapperTop < viewportHeight) {
                progressPercentage = 5;
            }
        }

        // Update progress line height
        progressLine.style.height = `${progressPercentage}%`;
        progressLine.style.width = '100%';

        // Update timeline item states based on their position
        updateTimelineItemStatesEditor(timelineItems);

        ticking = false;
    }

    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(updateProgress);
            ticking = true;
        }
    }

    // Initial calculation
    updateProgress();

    // Listen for scroll events on all possible scroll containers
    scrollContainers.forEach((container, index) => {
        container.addEventListener('scroll', onScroll, { passive: true });
    });

    // Also add to document for good measure
    const editorDoc = getEditorDocument();
    editorDoc.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    // Return cleanup function
    return () => {
        scrollContainers.forEach(container => {
            container.removeEventListener('scroll', onScroll);
        });
        editorDoc.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onScroll);
    };
}

/**
 * Find all scrollable parent elements
 * @param {HTMLElement} element - Starting element
 * @returns {Array} Array of scrollable parents
 */
function findAllScrollableParents(element) {
    const scrollables = [];
    let parent = element.parentElement;

    while (parent) {
        const overflow = window.getComputedStyle(parent).overflow;
        const overflowY = window.getComputedStyle(parent).overflowY;

        // Check for scrollable overflow
        if (overflow === 'auto' || overflow === 'scroll' || overflowY === 'auto' || overflowY === 'scroll') {
            scrollables.push(parent);
        }

        // Check for WordPress editor canvas or interface elements
        if (parent.classList.contains('editor-styles-wrapper') ||
            parent.classList.contains('edit-post-visual-editor') ||
            parent.classList.contains('block-editor-block-list__layout') ||
            parent.classList.contains('interface-interface-skeleton__content') ||
            parent.classList.contains('edit-site-visual-editor__editor-canvas') ||
            parent.classList.contains('editor-canvas-container')) {
            scrollables.push(parent);
        }

        parent = parent.parentElement;
    }

    // Always include window
    scrollables.push(window);

    return scrollables;
}

/**
 * Update timeline item states based on scroll position in editor
 * @param {NodeList} timelineItems - Timeline item elements
 */
export function updateTimelineItemStatesEditor(timelineItems) {
    const viewportHeight = window.innerHeight;
    const viewportCenter = viewportHeight / 2;

    timelineItems.forEach((item) => {
        const itemRect = item.getBoundingClientRect();
        const itemCenter = itemRect.top + (itemRect.height / 2);

        // Check if item is in the center of viewport
        const isInView = itemCenter <= viewportCenter + 100 && itemCenter >= viewportCenter - 100;
        const isAboveCenter = itemCenter < viewportCenter;

        // Update classes based on scroll position
        item.classList.toggle('completed', isAboveCenter);
        item.classList.toggle('active', isInView && !isAboveCenter);

        // Update dot color based on progress
        const dot = item.querySelector('.eb-timeline-dot');
        if (dot) {
            if (isAboveCenter || isInView) {
                dot.classList.add('completed');
            } else {
                dot.classList.remove('completed');
            }
        }
    });
}

/**
 * Add smooth scroll navigation to timeline items in editor
 * @param {HTMLElement} wrapper - Timeline wrapper element
 */
export function addTimelineNavigationEditor(wrapper) {
    const timelineItems = wrapper.querySelectorAll('.eb-timeline-item');

    timelineItems.forEach((item) => {
        const dot = item.querySelector('.eb-timeline-dot');
        if (dot) {
            dot.style.cursor = 'pointer';
            dot.addEventListener('click', () => {
                item.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            });
        }
    });
}

/**
 * Initialize SVG Zigzag Timeline (Clerk-style) in editor
 * Creates an SVG path with zigzag pattern and gradient
 * @param {HTMLElement} wrapper - Timeline wrapper element
 * @param {Object} attributes - Block attributes including connectorColor and progressLineColor
 */
export function initSVGZigzagTimelineEditor(wrapper, attributes = {}) {
    const timelineItems = wrapper.querySelectorAll('.eb-timeline-item');
    if (timelineItems.length === 0) return null;

    // Remove any existing SVG to prevent duplicates
    const existingSVG = wrapper.querySelector('.eb-timeline-svg-zigzag');
    if (existingSVG) {
        existingSVG.remove();
    }

    // Create SVG container
    const svgContainer = createSVGZigzagPathEditor(wrapper, timelineItems, attributes);

    // Insert SVG before the first timeline item
    const firstItem = timelineItems[0];
    firstItem.parentNode.insertBefore(svgContainer, firstItem);

    // Set up scroll-based SVG animation
    const cleanupScrollAnimation = setupSVGScrollAnimationEditor(wrapper, svgContainer);

    // Return cleanup function that removes SVG and cleans up event listeners
    return () => {
        if (cleanupScrollAnimation) {
            cleanupScrollAnimation();
        }
        if (svgContainer && svgContainer.parentNode) {
            svgContainer.remove();
        }
    };
}

/**
 * Create SVG with zigzag path based on timeline items for editor
 * @param {HTMLElement} wrapper - Timeline wrapper element
 * @param {NodeList} timelineItems - Timeline item elements
 * @param {Object} attributes - Block attributes including connectorColor and progressLineColor
 * @returns {SVGElement} SVG container element
 */
export function createSVGZigzagPathEditor(wrapper, timelineItems, attributes = {}) {
    const { connectorColor = '#DCDCDC', progressLineColor = '#3b82f6', connectorWidth = 1 } = attributes;

    // Resolve colors to formats compatible with SVG
    const resolvedConnectorColor = resolveColorForSVG(connectorColor);
    const resolvedProgressColor = resolveColorForSVG(progressLineColor);

    const svgNS = "http://www.w3.org/2000/svg";

    // Calculate dimensions
    const wrapperHeight = wrapper.offsetHeight;
    const svgWidth = 17;
    let totalHeight = 0;
    let pathData = "M 0.5 0.5";

    // Get actual item dimensions for better alignment
    const itemDimensions = [];

    timelineItems.forEach((item) => {
        const itemSpacing = parseInt(getComputedStyle(item).marginBottom);
        const itemHeight = item.offsetHeight;

        itemDimensions.push({
            height: itemHeight,
            spacing: itemSpacing,
            totalSpace: itemHeight + itemSpacing
        });
    });

    // Calculate path based on timeline items positions
    timelineItems.forEach((_, index) => {
        const dimensions = itemDimensions[index];
        const isLastItem = index === timelineItems.length - 1;

        // Fixed wave pattern height from the design
        const waveHeight = 118.897;

        // Create wave pattern for this item starting at current totalHeight
        // First curve to right
        pathData += ` C 0.5 ${totalHeight + 2.221} 1.11623 ${totalHeight + 4.398} 2.2801 ${totalHeight + 6.29}`;

        // Line to right
        pathData += ` L 14.7199 ${totalHeight + 26.504}`;

        // Second curve
        pathData += ` C 15.8838 ${totalHeight + 28.396} 16.5 ${totalHeight + 30.573} 16.5 ${totalHeight + 32.794}`;

        // Vertical on right
        pathData += ` V ${totalHeight + 74.001}`;

        // Third curve back
        pathData += ` C 16.5 ${totalHeight + 76.221} 15.8838 ${totalHeight + 78.398} 14.7199 ${totalHeight + 80.29}`;

        // Line back to left
        pathData += ` L 2.2801 ${totalHeight + 100.504}`;

        // Final curve to left
        pathData += ` C 1.11623 ${totalHeight + 102.396} 0.5 ${totalHeight + 104.573} 0.5 ${totalHeight + 106.793}`;

        // Move totalHeight forward by the wave pattern height
        totalHeight += waveHeight;

        // Calculate space to next item based on actual item dimensions
        if (!isLastItem) {
            // Add remaining space to reach next item
            const spaceToNextItem = dimensions.totalSpace - waveHeight;

            if (spaceToNextItem > 0) {
                pathData += ` V ${totalHeight + spaceToNextItem}`;
                totalHeight += spaceToNextItem;
            }
        }
    });

    // Add final segment
    totalHeight += 120;
    pathData += `V ${wrapperHeight}`;

    // Create SVG element
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("viewBox", `0 0 ${svgWidth} ${wrapperHeight}`);
    svg.setAttribute("width", svgWidth);
    svg.setAttribute("height", wrapperHeight);
    svg.setAttribute("class", "eb-timeline-svg-zigzag");
    svg.setAttribute("aria-hidden", "true");

    // Create defs for gradient
    const defs = document.createElementNS(svgNS, "defs");
    const gradient = document.createElementNS(svgNS, "linearGradient");
    const gradientId = `eb-timeline-gradient-${wrapper.dataset.id || 'default'}`;
    gradient.setAttribute("id", gradientId);
    gradient.setAttribute("gradientUnits", "userSpaceOnUse");
    gradient.setAttribute("x1", "0");
    gradient.setAttribute("x2", "0");
    gradient.setAttribute("y1", "0");
    gradient.setAttribute("y2", wrapperHeight);

    // Gradient stops - use resolved progress color
    let stops;

    if (resolvedProgressColor.isGradient) {
        // Use gradient colors from the CSS gradient
        stops = resolvedProgressColor.stops.map(stop => ({
            offset: stop.offset.toString(),
            color: stop.color,
            opacity: "1"
        }));

        // Add fade at start and end
        if (stops.length > 0) {
            // Fade in at start
            stops.unshift({
                offset: "0",
                color: stops[0].color,
                opacity: "0"
            });
            // Fade out at end
            stops.push({
                offset: "1",
                color: stops[stops.length - 1].color,
                opacity: "0"
            });
        }
    } else {
        // Single solid color - no gradient
        stops = [
            { offset: "0", color: resolvedProgressColor, opacity: "1" }
        ];
    }

    stops.forEach(stop => {
        const stopElement = document.createElementNS(svgNS, "stop");
        stopElement.setAttribute("offset", stop.offset);
        stopElement.setAttribute("stop-color", stop.color);
        stopElement.setAttribute("stop-opacity", stop.opacity);
        gradient.appendChild(stopElement);
    });

    // Calculate progress line width (slightly thicker than connector)
    const progressLineWidth = connectorWidth + 0.25;

    defs.appendChild(gradient);
    svg.appendChild(defs);

    // Create background path (static)
    const backgroundPath = document.createElementNS(svgNS, "path");
    backgroundPath.setAttribute("d", pathData);
    backgroundPath.setAttribute("fill", "none");
    backgroundPath.setAttribute("stroke", resolvedConnectorColor);
    backgroundPath.setAttribute("stroke-linecap", "round");
    backgroundPath.setAttribute("stroke-width", connectorWidth);
    svg.appendChild(backgroundPath);

    // Create animated path (gradient)
    const animatedPath = document.createElementNS(svgNS, "path");
    animatedPath.setAttribute("d", pathData);
    animatedPath.setAttribute("fill", "none");
    animatedPath.setAttribute("stroke", `url(#${gradientId})`);
    animatedPath.setAttribute("stroke-width", progressLineWidth);
    animatedPath.setAttribute("stroke-linecap", "round");
    animatedPath.setAttribute("class", "eb-timeline-animated-path");

    // Use actual path length instead of wrapper height for accurate animation
    const pathLength = animatedPath.getTotalLength();
    animatedPath.style.strokeDasharray = pathLength;
    animatedPath.style.strokeDashoffset = pathLength;
    animatedPath.style.transition = "stroke-dashoffset 0.3s ease-in-out";
    svg.appendChild(animatedPath);

    return svg;
}

/**
 * Setup scroll-based SVG animation for editor
 * @param {HTMLElement} wrapper - Timeline wrapper element
 * @param {SVGElement} svgContainer - SVG container element
 * @returns {Function} Cleanup function
 */
export function setupSVGScrollAnimationEditor(wrapper, svgContainer) {
    const animatedPath = svgContainer.querySelector('.eb-timeline-animated-path');
    if (!animatedPath) return null;

    // Get the actual path length for accurate animation
    const totalLength = animatedPath.getTotalLength();
    let ticking = false;

    // Find all scrollable containers
    const scrollContainers = findAllScrollableParents(wrapper);

    function updateSVGProgress() {
        const wrapperRect = wrapper.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const wrapperTop = wrapperRect.top;
        const wrapperHeight = wrapperRect.height;

        let progressPercentage = 0;

        if (wrapperTop <= viewportHeight * 0.8) {
            const scrolledPast = Math.max(0, (viewportHeight * 0.8) - wrapperTop);
            const totalScrollableHeight = wrapperHeight + (viewportHeight * 0.2);
            progressPercentage = Math.min(100, (scrolledPast / totalScrollableHeight) * 100);

            if (progressPercentage < 5 && wrapperTop < viewportHeight) {
                progressPercentage = 5;
            }
        }

        // Update SVG path animation
        const offset = totalLength - (totalLength * progressPercentage / 100);
        animatedPath.style.strokeDashoffset = offset;

        ticking = false;
    }

    function onSVGScroll() {
        if (!ticking) {
            requestAnimationFrame(updateSVGProgress);
            ticking = true;
        }
    }

    // Initial calculation
    updateSVGProgress();

    // Listen for scroll events on all possible scroll containers
    scrollContainers.forEach(container => {
        container.addEventListener('scroll', onSVGScroll, { passive: true });
    });

    document.addEventListener('scroll', onSVGScroll, { passive: true });
    const svgEditorDoc = getEditorDocument();
    svgEditorDoc.addEventListener('scroll', onSVGScroll, { passive: true });
    window.addEventListener('resize', onSVGScroll, { passive: true });

    // Return cleanup function
    return () => {
        scrollContainers.forEach(container => {
            container.removeEventListener('scroll', onSVGScroll);
        });
        document.removeEventListener('scroll', onSVGScroll);
        svgEditorDoc.removeEventListener('scroll', onSVGScroll);
        window.removeEventListener('resize', onSVGScroll);
    };
}
