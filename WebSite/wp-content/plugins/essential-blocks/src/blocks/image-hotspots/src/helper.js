import { applyFilters } from "@wordpress/hooks";

// Generate unique hotspot ID
export const generateHotspotId = () => {
    return `hotspot_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
};

export const getTooltipTransform = (tooltip) => {
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

export const showTooltip = (tooltip, globalTooltipAnimation) => {
    // add applyfilter
    const animation = globalTooltipAnimation || 'none';
    const tooltipInner = tooltip.querySelector('.eb-tooltip-inner');

    positionTooltip(tooltip);

    { animation !== 'none' && applyFilters("eb_image_hotspot_pro_show_tooltip", "", tooltip, animation, tooltipInner) }

    tooltipInner.style.opacity = '1';
    tooltipInner.style.visibility = 'visible';
    tooltip.style.opacity = '1';
    tooltip.style.visibility = 'visible';
    tooltip.style.transform = getTooltipTransform(tooltip);

    // Position tooltip to stay within viewport
    positionTooltip(tooltip);
}

export const hideTooltip = (tooltip, globalTooltipAnimation) => {
    const animation = globalTooltipAnimation || 'none';
    const tooltipInner = tooltip.querySelector('.eb-tooltip-inner');

    { animation !== 'none' && applyFilters("eb_image_hotspot_pro_hide_tooltip", "", tooltip, animation, tooltipInner) }

    // Wait for animation to complete before hiding
    setTimeout(() => {
        tooltipInner.style.opacity = '0';
        tooltipInner.style.visibility = 'hidden';
        tooltip.style.opacity = '0';
        tooltip.style.visibility = 'hidden';
        tooltip.style.transform = getTooltipTransform(tooltip);
    }, 500);
}

export const positionTooltip = (tooltip) => {
    // console.log('editor positionTooltip');

    const rect = tooltip.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Check if tooltip goes outside viewport and adjust
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
        tooltip.classList.remove('eb-tooltip-top');
        tooltip.classList.add('eb-tooltip-bottom');
    } else if (rect.bottom > viewportHeight) {
        // console.log('bottom');
        tooltip.classList.remove('eb-tooltip-bottom');
        tooltip.classList.add('eb-tooltip-top');
    }
}
