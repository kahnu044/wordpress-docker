/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useState, memo, useEffect, useRef } from "@wordpress/element";
import { Button } from "@wordpress/components";

/**
 * Internal dependencies
 */
import {
    BlockProps,
    withBlockContext,
    ImageComponent,
    EBDisplayIcon,
} from "@essential-blocks/controls";

import Inspector from "./inspector";
import Style from "./style";
import defaultAttributes from './attributes'
import {
    DEFAULT_HOTSPOT,
} from "./constants";
import { ReactComponent as ImageHotspotIcon } from "./icon.svg";
import { generateHotspotId, showTooltip as showTooltipHelper, hideTooltip as hideTooltipHelper, positionTooltip } from "./helper";

function Edit(props) {
    const {
        attributes,
        setAttributes,
        isSelected,
    } = props;

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
    } = attributes;

    const [selectedHotspot, setSelectedHotspot] = useState(null);
    const [isAddingHotspot, setIsAddingHotspot] = useState(false);
    const [activeTooltips, setActiveTooltips] = useState(new Set());
    const wrapperRef = useRef(null);

    // Tooltip interaction functions
    const showTooltip = (hotspotId) => {
        setActiveTooltips(prev => new Set([...prev, hotspotId]));

        // Use helper function for better tooltip display
        setTimeout(() => {
            const tooltipElement = document.querySelector(`[data-hotspot-id="${hotspotId}"] .eb-hotspot-tooltip`);
            if (tooltipElement) {
                showTooltipHelper(tooltipElement, globalTooltipAnimation);
            }
        }, 0);
    };

    const hideTooltip = (hotspotId) => {
        setActiveTooltips(prev => {
            const newSet = new Set(prev);
            newSet.delete(hotspotId);
            return newSet;
        });

        // Use helper function for better tooltip hiding
        const tooltipElement = document.querySelector(`[data-hotspot-id="${hotspotId}"] .eb-hotspot-tooltip`);
        if (tooltipElement) {
            hideTooltipHelper(tooltipElement, globalTooltipAnimation);
        }
    };

    const hideAllTooltips = () => {
        // Hide all tooltips using helper function
        activeTooltips.forEach(hotspotId => {
            const tooltipElement = document.querySelector(`[data-hotspot-id="${hotspotId}"] .eb-hotspot-tooltip`);
            if (tooltipElement) {
                hideTooltipHelper(tooltipElement);
            }
        });
        setActiveTooltips(new Set());
    };

    const handleTooltipClick = (hotspotId, trigger) => {
        // Disable trigger functionality when alwaysVisibleTooltip is true
        if (alwaysVisibleTooltip) return;

        if (trigger === 'click') {
            if (activeTooltips.has(hotspotId)) {
                hideTooltip(hotspotId);
            } else {
                hideAllTooltips(); // Hide other tooltips first
                showTooltip(hotspotId);
            }
        }
    };

    const handleTooltipHover = (hotspotId, trigger, isEntering) => {
        // Disable trigger functionality when alwaysVisibleTooltip is true
        if (alwaysVisibleTooltip) return;

        if (trigger === 'hover') {
            if (isEntering) {
                showTooltip(hotspotId);
            } else {
                hideTooltip(hotspotId);
            }
        }
    };

    // Close tooltips when clicking outside
    // TODO: Find an alternate solution, this code makes issue in Image Selection Popup
    // useEffect(() => {
    //     const handleClickOutside = (event) => {
    //         if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
    //             hideAllTooltips();
    //         }
    //     };

    //     document.addEventListener('click', handleClickOutside);
    //     return () => {
    //         document.removeEventListener('click', handleClickOutside);
    //     };
    // }, []);

    // Hide tooltips when entering add hotspot mode
    useEffect(() => {
        if (isAddingHotspot) {
            hideAllTooltips();
        }
    }, [isAddingHotspot]);

    // Handle window resize for tooltip repositioning
    useEffect(() => {
        const handleResize = () => {
            activeTooltips.forEach(hotspotId => {
                const tooltipElement = document.querySelector(`[data-hotspot-id="${hotspotId}"] .eb-hotspot-tooltip`);
                if (tooltipElement) {
                    positionTooltip(tooltipElement);
                }
            });
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [activeTooltips]);

    // you must declare this variable
    const enhancedProps = {
        ...props,
        blockPrefix: 'eb-image-hotspots',
        style: <Style {...props} />
    };

    // // Add new hotspot
    const addHotspot = (event) => {
        if (!isAddingHotspot || !imageUrl) return;

        const rect = event.currentTarget.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;

        const newHotspot = {
            ...DEFAULT_HOTSPOT,
            id: generateHotspotId(),
            x: Math.max(0, Math.min(100, x)),
            y: Math.max(0, Math.min(100, y)),
            number: hotspots.length + 1,
            text: `Hotspot ${hotspots.length + 1}`,
        };

        setAttributes({
            hotspots: [...hotspots, newHotspot],
        });
        setSelectedHotspot(newHotspot.id);
        setIsAddingHotspot(false);
    };

    // Delete hotspot
    const deleteHotspot = (hotspotId) => {
        const updatedHotspots = hotspots.filter(hotspot => hotspot.id !== hotspotId);
        setAttributes({ hotspots: updatedHotspots });
        if (selectedHotspot === hotspotId) {
            setSelectedHotspot(null);
        }
        // Hide tooltip when deleting hotspot
        hideTooltip(hotspotId);
    };

    // Render hotspot marker
    const renderHotspotMarker = (hotspot) => {
        const isSelected = selectedHotspot === hotspot.id;
        const tooltipTrigger = hotspot.tooltipTrigger || globalTooltipTrigger;
        const isTooltipActive = activeTooltips.has(hotspot.id);

        const markerStyle = {
            position: 'absolute',
            left: `${hotspot.x}%`,
            top: `${hotspot.y}%`,
            transform: 'translate(-50%, -50%)',
            cursor: 'pointer',
            zIndex: isSelected ? 10 : 5,
        };

        const markerClass = `eb-hotspot-marker eb-hotspot-${hotspot.markerType} eb-hotspot-${globalHotspotSize} eb-hotspot-animation-${globalAnimation} ${isSelected ? 'selected' : ''} ${isTooltipActive ? 'active' : ''}`;

        const tooltipClass = `eb-hotspot-tooltip eb-tooltip-${globalTooltipPosition} eb-tooltip-trigger-${tooltipTrigger} ${globalTooltipAnimation !== 'none' ? `eb-tooltip-${globalTooltipAnimation}` : ''}`;

        return (
            <div
                key={hotspot.id}
                className={markerClass}
                style={markerStyle}
                data-hotspot-id={hotspot.id}
                data-tooltip-trigger={tooltipTrigger}
                data-tooltip-position={hotspot.tooltipPosition || globalTooltipPosition}
                data-tooltip-animation={globalTooltipAnimation}
                onClick={(e) => {
                    e.stopPropagation();
                    setSelectedHotspot(hotspot.id);
                    // Only handle tooltip click if alwaysVisibleTooltip is false
                    if (!alwaysVisibleTooltip) {
                        handleTooltipClick(hotspot.id, tooltipTrigger);
                    }
                }}
                onMouseEnter={() => {
                    // Only handle tooltip hover if alwaysVisibleTooltip is false
                    if (!alwaysVisibleTooltip) {
                        handleTooltipHover(hotspot.id, tooltipTrigger, true);
                    }
                }}
                onMouseLeave={() => {
                    // Only handle tooltip hover if alwaysVisibleTooltip is false
                    if (!alwaysVisibleTooltip) {
                        handleTooltipHover(hotspot.id, tooltipTrigger, false);
                    }
                }}
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
                        className={`${tooltipClass} ${alwaysVisibleTooltip ? 'always-visible' : `${isTooltipActive ? 'active' : ''}`}`}
                        style={{
                            transition: 'all 0.3s ease'
                        }}
                    >
                        <div className={`eb-tooltip-inner ${!alwaysVisibleTooltip ? 'eb__animated' : ''} `}>
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

                {isSelected && (
                    <div className="eb-hotspot-controls">
                        <Button
                            size="small"
                            isDestructive
                            onClick={(e) => {
                                e.stopPropagation();
                                deleteHotspot(hotspot.id);
                            }}
                        >
                            ×
                        </Button>
                    </div>
                )}
            </div>
        );
    };

    return (
        <>
            {isSelected && imageUrl && (
                <Inspector
                    attributes={attributes}
                    setAttributes={setAttributes}
                    selectedHotspotId={selectedHotspot} // Pass the selected hotspot ID
                />
            )}

            <BlockProps.Edit {...enhancedProps}>
                <div className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`}>
                    <div
                        className={`eb-image-hotspots-wrapper ${blockId}`}
                        ref={wrapperRef}
                        data-always-visible-tooltip={alwaysVisibleTooltip}
                    >
                        {!imageUrl ? (
                            <>
                                <ImageComponent.Upload
                                    labels={{
                                        title: __("Image Hotspots", "essential-blocks"),
                                        instructions: __("Drag media file, upload or select image from your library.", "essential-blocks"),
                                    }}
                                    icon={ImageHotspotIcon}
                                />
                            </>
                        ) : (
                            <>
                                <div
                                    className={`eb-image-hotspots-image-wrapper ${isAddingHotspot ? 'adding-hotspot' : ''}`}
                                    onClick={addHotspot}
                                >
                                    <ImageComponent isSelected={isSelected} />

                                    <div className="eb-hotspots-container">
                                        {hotspots.map(renderHotspotMarker)}
                                    </div>

                                    {isAddingHotspot && (
                                        <div className="eb-hotspot-add-overlay">
                                            <p>{__('Click on the image to add a hotspot', 'essential-blocks')}</p>
                                        </div>
                                    )}
                                </div>

                                <div className="eb-image-hotspots-toolbar">
                                    <Button
                                        variant={isAddingHotspot ? 'secondary' : 'primary'}
                                        onClick={() => setIsAddingHotspot(!isAddingHotspot)}
                                    >
                                        {isAddingHotspot
                                            ? __('Cancel', 'essential-blocks')
                                            : __('Add Hotspot', 'essential-blocks')
                                        }
                                    </Button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </BlockProps.Edit>
        </>
    );
}

export default memo(withBlockContext(defaultAttributes)(Edit))
