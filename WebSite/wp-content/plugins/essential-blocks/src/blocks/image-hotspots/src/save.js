/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";

/**
 * Internal dependencies
 */
import { BlockProps, ImageComponent, EBDisplayIcon } from "@essential-blocks/controls";

export default function save({ attributes }) {
    const {
        blockId,
        imageUrl,
        hotspots,
        globalHotspotSize,
        globalAnimation,
        globalTooltipTrigger,
        globalTooltipPosition,
        globalTooltipAnimation,
        tooltipShowArrow,
        alwaysVisibleTooltip,
        classHook,
        animationDuration,
        animationDelay,
    } = attributes;

    // Don't render if no image
    if (!imageUrl) {
        return null;
    }

    // Render hotspot marker
    const renderHotspotMarker = (hotspot) => {
        const markerStyle = {
            position: 'absolute',
            left: `${hotspot.x}%`,
            top: `${hotspot.y}%`,
            transform: 'translate(-50%, -50%)',
        };

        const markerClass = `eb-hotspot-marker eb-hotspot-${hotspot.markerType} eb-hotspot-${globalHotspotSize} eb-hotspot-animation-${globalAnimation}`;

        const tooltipClass = `eb-hotspot-tooltip eb-tooltip-${globalTooltipPosition} ${globalTooltipAnimation !== 'none' ? `eb-tooltip-${globalTooltipAnimation}` : ''} ${alwaysVisibleTooltip ? '' : `eb-tooltip-trigger-${globalTooltipTrigger}`} `;

        const markerContent = (
            <div
                key={hotspot.id}
                className={markerClass}
                style={markerStyle}
                data-hotspot-id={hotspot.id}
                data-tooltip-trigger={alwaysVisibleTooltip ? 'none' : globalTooltipTrigger}
                data-tooltip-position={globalTooltipPosition}
                data-tooltip-animation={globalTooltipAnimation}
            >
                <div className="eb-hotspot-marker-inner">
                    {hotspot.markerType === 'icon' && (
                        <EBDisplayIcon icon={hotspot.icon || 'fas fa-plus'} />
                    )}
                    {hotspot.markerType === 'text' && (
                        <span className="eb-hotspot-text">{hotspot.text || 'Text'}</span>
                    )}
                    {hotspot.markerType === 'number' && (
                        <span className="eb-hotspot-number">{hotspot.number}</span>
                    )}
                    {hotspot.markerType === 'dot' && (
                        <span className="eb-hotspot-dot"></span>
                    )}
                </div>

                {hotspot.enableTooltip && (
                    <div
                        className={`${tooltipClass} ${alwaysVisibleTooltip ? 'active always-visible' : ''}`}
                        style={alwaysVisibleTooltip ? {
                            opacity: '1',
                            visibility: 'visible'
                        } : undefined}
                    >
                        <div className="eb-tooltip-inner eb__animated"
                            style={alwaysVisibleTooltip ? {
                                opacity: '1',
                                visibility: 'visible'
                            } : undefined}>
                            {hotspot.mediaType !== 'none' && (
                                <div className="eb-tooltip-media">
                                    {hotspot.mediaType === 'icon' && (
                                        <EBDisplayIcon icon={hotspot.tooltipContentIcon} />
                                    )}
                                    {hotspot.mediaType === 'image' && (
                                        <img src={hotspot.tooltipContentImage} alt={hotspot.tooltipContentImageAlt} />
                                    )}
                                </div>
                            )}

                            {hotspot.tooltipTitle && (
                                <div className="eb-tooltip-title">
                                    {hotspot.tooltipTitle}
                                </div>
                            )}
                            {hotspot.tooltipContent && (
                                <div className="eb-tooltip-content">
                                    {hotspot.tooltipContent}
                                </div>
                            )}
                            {tooltipShowArrow && <div className="eb-tooltip-arrow"></div>}
                        </div>
                    </div>
                )}
            </div>
        );

        // Wrap with link if provided
        if (hotspot.link) {
            return (
                <a
                    key={hotspot.id}
                    href={hotspot.link}
                    target={hotspot.linkNewTab ? '_blank' : '_self'}
                    rel={hotspot.addNofollow ? 'nofollow noopener' : 'noopener'}
                    className="eb-hotspot-link"
                >
                    {markerContent}
                </a>
            );
        }

        return markerContent;
    };

    return (
        <BlockProps.Save attributes={attributes}>
            <div className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`}>
                <div
                    className={`eb-image-hotspots-wrapper ${blockId}`}
                    data-tooltip-animation={globalTooltipAnimation}
                    data-animation-duration={animationDuration}
                    data-animation-delay={animationDelay}
                    data-always-visible-tooltip={alwaysVisibleTooltip}
                >
                    <div className="eb-image-hotspots-image-wrapper">
                        <ImageComponent.Content
                            attributes={attributes}
                        />
                    </div>

                    <div className="eb-hotspots-container">
                        {hotspots.map(renderHotspotMarker)}
                    </div>
                </div>
            </div>
        </BlockProps.Save>
    );
}
