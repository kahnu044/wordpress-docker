/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";

/**
 * Internal dependencies
 */
import { BlockProps, EBDisplayIconSave, sanitizeURL } from '@essential-blocks/controls';

const Save = ({ attributes }) => {
    const {
        blockId,
        timelineLayout,
        timelineLineStyle,
        showTitle,
        showContent,
        showDate,
        showSubheading,
        enableMeta,
        timelines,
        titleTag,
        readmoreText,
        classHook,
        contentSource,
        timelineIcon,
        enableLabels,
        timelineLabels,
        timelineCompleteIcon,
        connectorColor,
        progressLineColor,
        connectorWidth,
        timelineVerticalPreset
    } = attributes;

    const renderTimelineItem = (timeline, index) => {
        const {
            icon,
            title,
            content,
            richContent,
            date,
            subheading,
            link,
            linkOpenNewTab,
            timelineImage,
            timelineImageAlt,
            timelineImageTitle,
            selectedLabels,
            itemMediaType,
            showReadMore
        } = timeline;

        const TitleTag = titleTag || 'h3';

        return (
            <div key={index} className="eb-timeline-item" data-index={index}>
                {/* Date Section - Left Side */}
                {enableMeta && (
                    <div className="eb-timeline-date-section">
                        {showDate && date && (
                            <div className="eb-timeline-date">{date}</div>
                        )}
                        {showSubheading && subheading && (
                            <div className="eb-timeline-subheading">{subheading}</div>
                        )}
                    </div>
                )}

                {/* Timeline Dot */}
                <div className="eb-timeline-dot">
                    <div className="eb-timeline-dot-inner">
                        {timelineIcon && (
                            <>
                                {(timelineLineStyle !== "four" && timelineLineStyle !== "three") && (
                                    <EBDisplayIconSave icon={timelineIcon} className="eb-timeline-dot-icon" />

                                )}
                                {(timelineLineStyle === "four" || timelineLineStyle === "three") && (
                                    <span className="eb-timeline-dot-icon">{index + 1}</span>
                                )}
                                {(timelineLineStyle === "four" || timelineLineStyle === "three") && (
                                    <EBDisplayIconSave icon={timelineCompleteIcon} className="eb-timeline-dot-icon eb-timeline-complete-icon" />
                                )}
                            </>
                        )}
                    </div>
                </div>

                {/* Content Section - Right Side */}
                <div className="eb-timeline-item-content">
                    <div className="eb-timeline-content">
                        {timelineVerticalPreset === "preset-2" && (
                            <div className="eb-timeline-dot">
                                <div className="eb-timeline-dot-inner">
                                    {timelineIcon && (
                                        <>
                                            <EBDisplayIconSave icon={timelineIcon} className="eb-timeline-dot-icon" />
                                        </>
                                    )}
                                </div>
                            </div>
                        )}

                        {enableMeta && (
                            <div className="eb-timeline-date-section">
                                {showDate && date && (
                                    <div className="eb-timeline-date">{date}</div>
                                )}
                                {showSubheading && subheading && (
                                    <div className="eb-timeline-subheading">{subheading}</div>
                                )}
                            </div>
                        )}
                        {/* Image */}
                        {(itemMediaType || "none") === "image" && timelineImage && (
                            <div className="eb-timeline-image">
                                <img
                                    src={timelineImage}
                                    alt={timelineImageAlt || timelineImageTitle || title}
                                />
                            </div>
                        )}

                        {/* Icon */}
                        {(itemMediaType || "none") === "icon" && icon && (
                            <div className="eb-timeline-icon">
                                <EBDisplayIconSave icon={icon} />
                            </div>
                        )}

                        {/* Title */}
                        {showTitle && title && (
                            <TitleTag className="eb-timeline-title">{title}</TitleTag>
                        )}

                        {/* Labels */}
                        {enableLabels && selectedLabels && selectedLabels.length > 0 && (
                            <div className="eb-timeline-labels">
                                {selectedLabels.map((labelId) => {
                                    const label = timelineLabels.find(l => l.value === labelId);
                                    if (!label) return null;
                                    return (
                                        <span
                                            key={labelId}
                                            className="eb-timeline-label"
                                            data-label-id={labelId}
                                            style={{
                                                color: label.textColor,
                                                backgroundColor: label.backgroundColor,
                                                borderColor: label.borderColor,
                                            }}
                                        >
                                            {label.label}
                                        </span>
                                    );
                                })}
                            </div>
                        )}

                        {/* Content */}
                        {showContent && richContent && (
                            <div
                                className="eb-timeline-excerpt"
                                dangerouslySetInnerHTML={{ __html: richContent }}
                            />
                        )}

                        {/* Read More Link */}
                        {showReadMore && readmoreText && (
                            <a
                                href={sanitizeURL(link)}
                                className="eb-timeline-read-more"
                                target={linkOpenNewTab ? "_blank" : "_self"}
                                rel={linkOpenNewTab ? "noopener noreferrer" : ""}
                            >
                                {readmoreText}
                            </a>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <BlockProps.Save attributes={attributes}>
            <div className={`eb-parent-wrapper eb-parent-${blockId} ${classHook || ''}`}>
                {timelines && timelines.length > 0 && (
                    <div
                        className={`eb-timeline-wrapper ${blockId} ${timelineLayout || 'alternating-layout'} layout-${timelineVerticalPreset} eb-timeline-line-style-${timelineLineStyle} ${enableMeta ? '' : 'no-meta'}`}
                        data-id={blockId}
                        data-connector-color={connectorColor}
                        data-progress-color={progressLineColor}
                        data-connector-width={connectorWidth}
                    >
                        {/* Progress Line */}
                        <div className="eb-timeline-progress-line">
                            <div className="eb-timeline-progress-fill"></div>
                        </div>

                        {timelineLineStyle !== "one" && (
                            <div></div>
                        )}

                        {timelines.map((timeline, index) => renderTimelineItem(timeline, index))}
                    </div>
                )}
            </div>
        </BlockProps.Save>
    );
};

export default Save;
