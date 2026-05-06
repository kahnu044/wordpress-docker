import { __ } from "@wordpress/i18n";
import { EBDisplayIconEdit, sanitizeURL } from '@essential-blocks/controls';

export default function TimelineContent(props) {
    const { attributes } = props;

    const {
        showTitle,
        titleTag,
        showContent,
        timelines,
        showSubheading,
        showDate,
        enableMeta,
        timelineIcon,
        enableLabels,
        timelineLabels,
        timelineCompleteIcon,
        timelineLineStyle,
        timelineVerticalPreset
    } = attributes;

    return (
        <>
            {timelines.map(
                (
                    {
                        itemMediaType,
                        title,
                        timelineImage,
                        timelineImageAlt,
                        timelineImageTitle,
                        icon,
                        content,
                        richContent,
                        link,
                        linkOpenNewTab,
                        subheading,
                        date,
                        selectedLabels,
                        showReadMore,
                        readmoreText
                    },
                    index
                ) => {
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
                                                <EBDisplayIconEdit icon={timelineIcon} className="eb-timeline-dot-icon" />
                                            )}
                                            {(timelineLineStyle === "four" || timelineLineStyle === "three") && (
                                                <span className="eb-timeline-dot-icon">{index + 1}</span>
                                            )}
                                            {(timelineLineStyle === "four" || timelineLineStyle === "three") && (
                                                <EBDisplayIconEdit icon={timelineCompleteIcon} className="eb-timeline-dot-icon eb-timeline-complete-icon" />
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Content Section - Right Side */}
                            <div className="eb-timeline-item-content">
                                <div className="eb-timeline-content">

                                    {timelineVerticalPreset === "preset-2" && (
                                        <>
                                            <div className="eb-timeline-dot">
                                                <div className="eb-timeline-dot-inner">
                                                    {timelineIcon && (
                                                        <>
                                                            <EBDisplayIconEdit icon={timelineIcon} className="eb-timeline-dot-icon" />
                                                        </>
                                                    )}
                                                </div>
                                            </div>

                                        </>
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
                                            <EBDisplayIconEdit icon={icon} />
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
                                        >
                                            {readmoreText}
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                }
            )}
        </>
    );
}
