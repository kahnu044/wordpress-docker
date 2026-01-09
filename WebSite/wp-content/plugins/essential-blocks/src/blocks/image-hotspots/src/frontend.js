/**
 * Image Hotspots Frontend Script
 */
const getTooltipTransform = (tooltip) => {
    const position = tooltip.classList.contains('eb-tooltip-top') ? 'translateX(-50%)' :
        tooltip.classList.contains('eb-tooltip-bottom') ? 'translateX(-50%)' :
            tooltip.classList.contains('eb-tooltip-left') ? 'translateY(-50%)' :
                tooltip.classList.contains('eb-tooltip-right') ? 'translateY(-50%)' :
                    tooltip.classList.contains('eb-tooltip-top-left') ? 'translateX(0)' :
                        tooltip.classList.contains('eb-tooltip-top-right') ? 'translateX(0)' :
                            tooltip.classList.contains('eb-tooltip-bottom-left') ? 'translateX(0)' :
                                tooltip.classList.contains('eb-tooltip-bottom-right') ? 'translateX(0)' :
                                    'translateX(-50%)';

    return position;
}

const showTooltip = (tooltip) => {
    // Check if already visible to prevent unnecessary operations
    if (tooltip._isVisible && !tooltip._isHiding) {
        return;
    }

    // Clear any existing hide timeout
    if (tooltip._hideTimeout) {
        clearTimeout(tooltip._hideTimeout);
        tooltip._hideTimeout = null;
    }

    const tooltipInner = tooltip.querySelector('.eb-tooltip-inner');

    tooltip._isVisible = true;
    tooltip._isHiding = false;
    tooltipInner.style.opacity = '1';
    tooltipInner.style.visibility = 'visible';
    tooltip.style.opacity = '1';
    tooltip.style.visibility = 'visible';
    tooltip.style.transform = getTooltipTransform(tooltip);

    // Position tooltip to stay within viewport
    positionTooltip(tooltip);
}

const hideTooltip = (tooltip) => {
    // Check if already hidden or being hidden to prevent unnecessary operations
    if (!tooltip._isVisible || tooltip._isHiding) {
        return;
    }

    // Mark as hiding but keep visible during transition
    tooltip._isHiding = true;

    const tooltipInner = tooltip.querySelector('.eb-tooltip-inner');

    // Apply CSS transition styles immediately
    tooltipInner.style.opacity = '0';
    tooltipInner.style.visibility = 'hidden';
    tooltip.style.opacity = '0';
    tooltip.style.transform = getTooltipTransform(tooltip);

    // Hide completely after CSS transition completes (300ms default)
    tooltip._hideTimeout = setTimeout(() => {
        tooltip.style.visibility = 'hidden';
        tooltip._isVisible = false;
        tooltip._isHiding = false;
        tooltip._hideTimeout = null;
    }, 300);
}

const positionTooltip = (tooltip) => {
    const rect = tooltip.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    if (rect.left < 0) {
        // console.log('left');
        tooltip.classList.remove('eb-tooltip-left');
        tooltip.classList.add('eb-tooltip-right');
    } else if (rect.right > viewportWidth) {
        // console.log('right');
        tooltip.classList.remove('eb-tooltip-right');
        tooltip.classList.add('eb-tooltip-left');
    }

    if (rect.top < 0) {
        // console.log('top');
        // change class
        tooltip.classList.remove('eb-tooltip-top');
        tooltip.classList.add('eb-tooltip-bottom');
    } else if (rect.bottom > viewportHeight) {
        // console.log('bottom');
        tooltip.classList.remove('eb-tooltip-bottom');
        tooltip.classList.add('eb-tooltip-top');
    }
}

document.addEventListener('DOMContentLoaded', function () {
    // Initialize all image hotspot blocks
    const hotspotBlocks = document.querySelectorAll('.eb-image-hotspots-wrapper');

    hotspotBlocks.forEach(function (block) {
        initializeHotspots(block);
    });

    function initializeHotspots(block) {
        const hotspotMarkers = block.querySelectorAll('.eb-hotspot-marker');

        hotspotMarkers.forEach(function (marker) {
            const tooltip = marker.querySelector('.eb-hotspot-tooltip');
            const trigger = marker.getAttribute('data-tooltip-trigger') || 'hover';
            const animtion = marker.getAttribute('data-tooltip-animation') || 'none';

            if (!tooltip) return;

            // Initialize tooltip state flags
            tooltip._isVisible = false;
            tooltip._isAnimating = false;
            tooltip._isHiding = false;
            tooltip._hideTimeout = null;

            if (trigger === 'hover') {
                // Hover trigger with improved tooltip interaction
                let hideTimeout;

                const showTooltipHandler = function () {
                    clearTimeout(hideTimeout);
                    // Use pro animation function if available, otherwise use basic function
                    if (animtion !== 'none' && tooltip._showTooltipWithAnimation) {
                        // console.log('with animation');

                        tooltip._showTooltipWithAnimation(tooltip);
                    } else {
                        // console.log('no animation');

                        showTooltip(tooltip);
                    }
                };

                const hideTooltipHandler = function (delay = 500) {
                    // hideTimeout = setTimeout(function () {
                    // Use pro animation function if available, otherwise use basic function
                    if (animtion !== 'none' && tooltip._hideTooltipWithAnimation) {
                        tooltip._hideTooltipWithAnimation(tooltip);
                    } else {
                        hideTooltip(tooltip);
                    }
                    // }, delay); // Configurable delay
                };

                // Marker hover events
                marker.addEventListener('mouseenter', function () {
                    showTooltipHandler();
                });
                marker.addEventListener('mouseleave', function () {
                    hideTooltipHandler(500); // Slightly longer delay when leaving marker
                });

                // Tooltip hover events to keep it visible when interacting with content
                tooltip.addEventListener('mouseenter', function () {
                    clearTimeout(hideTimeout);
                    // Only show if not already visible to prevent animation conflicts
                    if (animtion !== 'none' && tooltip._showTooltipWithAnimation) {
                        // Pro function handles state checking internally
                        tooltip._showTooltipWithAnimation(tooltip);
                    } else if (tooltip.style.opacity !== '1') {
                        showTooltip(tooltip);
                    }
                });

                tooltip.addEventListener('mouseleave', function () {
                    // Use pro animation function if available, otherwise use basic function
                    if (animtion !== 'none' && tooltip._hideTooltipWithAnimation) {
                        tooltip._hideTooltipWithAnimation(tooltip);
                    } else {
                        hideTooltip(tooltip);
                    }
                });
            } else if (trigger === 'click') {
                // Click trigger
                marker.addEventListener('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();

                    // Hide all other tooltips in this block
                    const allTooltips = block.querySelectorAll('.eb-hotspot-tooltip');
                    allTooltips.forEach(function (otherTooltip) {
                        if (otherTooltip !== tooltip) {
                            // Use pro animation function if available, otherwise use basic function
                            if (animtion !== 'none' && otherTooltip._hideTooltipWithAnimation) {
                                otherTooltip._hideTooltipWithAnimation(otherTooltip);
                            } else {
                                hideTooltip(otherTooltip);
                            }
                            otherTooltip.closest('.eb-hotspot-marker').classList.remove('active');
                        }
                    });

                    // Toggle current tooltip
                    if (marker.classList.contains('active')) {
                        // Use pro animation function if available, otherwise use basic function
                        if (animtion !== 'none' && tooltip._hideTooltipWithAnimation) {
                            tooltip._hideTooltipWithAnimation(tooltip);
                        } else {
                            hideTooltip(tooltip);
                        }
                        marker.classList.remove('active');
                    } else {
                        // Use pro animation function if available, otherwise use basic function
                        if (animtion !== 'none' && tooltip._showTooltipWithAnimation) {
                            tooltip._showTooltipWithAnimation(tooltip);
                        } else {
                            showTooltip(tooltip);
                        }
                        marker.classList.add('active');
                    }
                });
            }
        });

        // Close tooltips when clicking outside (for click trigger)
        document.addEventListener('click', function (e) {
            // Check if click is outside the block or not on a marker/tooltip
            if (!block.contains(e.target)) {
                const activeMarkers = block.querySelectorAll('.eb-hotspot-marker.active');
                activeMarkers.forEach(function (marker) {
                    const tooltip = marker.querySelector('.eb-hotspot-tooltip');
                    if (tooltip) {
                        // Use pro animation function if available, otherwise use basic function
                        if (animtion !== 'none' && tooltip._hideTooltipWithAnimation) {
                            tooltip._hideTooltipWithAnimation(tooltip);
                        } else {
                            hideTooltip(tooltip);
                        }
                        marker.classList.remove('active');
                    }
                });
            } else {
                // If clicking inside the block but not on a marker or tooltip, close tooltips
                const clickedMarker = e.target.closest('.eb-hotspot-marker');
                const clickedTooltip = e.target.closest('.eb-hotspot-tooltip');

                if (!clickedMarker && !clickedTooltip) {
                    const activeMarkers = block.querySelectorAll('.eb-hotspot-marker.active');
                    activeMarkers.forEach(function (marker) {
                        const tooltip = marker.querySelector('.eb-hotspot-tooltip');
                        if (tooltip) {
                            // Use pro animation function if available, otherwise use basic function
                            if (animtion !== 'none' && tooltip._hideTooltipWithAnimation) {
                                tooltip._hideTooltipWithAnimation(tooltip);
                            } else {
                                hideTooltip(tooltip);
                            }
                            marker.classList.remove('active');
                        }
                    });
                }
            }
        });
    }

    // Helper functions are now imported from helper.js

    // Handle responsive behavior
    function handleResize() {
        const activeTooltips = document.querySelectorAll('.eb-hotspot-tooltip[style*="opacity: 1"]');
        activeTooltips.forEach(function (tooltip) {
            positionTooltip(tooltip);
        });
    }

    // Debounce resize handler
    let resizeTimeout;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(handleResize, 100);
    });
});
