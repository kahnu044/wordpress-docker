
import { EBDisplayIcon, sanitizeURL, BlockProps } from "@essential-blocks/controls";
import { applyFilters } from "@wordpress/hooks";

const Save = ({ attributes }) => {
    const {
        blockId,
        featureListAlign,
        features,
        iconPosition,
        iconShape,
        shapeView,
        showConnector,
        connectorStyle,
        classHook,
        useInlineDesign,
        iconLiquidGlass,
    } = attributes;

    const featureListAlignClass =
        featureListAlign === "center"
            ? " eb-feature-list-center"
            : featureListAlign === "right"
                ? " eb-feature-list-right"
                : " eb-feature-list-left";

    const featureListWrapperClass =
        iconShape !== "none" ? ` ${iconShape} ${shapeView}` : " none";
    const inlineDesignClass = useInlineDesign ? " eb-inline-feature-list" : "";
    let iconStyle = {};
    let badgeStyle = {};

    return (
        <BlockProps.Save attributes={attributes}>
            <div className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`}>
                <div
                    className={`${blockId} eb-feature-list-wrapper eb-icon-position-${iconPosition} eb-tablet-icon-position-${iconPosition} eb-mobile-icon-position-${iconPosition}${featureListAlignClass}${showConnector ? " connector-" + connectorStyle : ""
                        }`}
                >
                    <ul
                        className={`eb-feature-list-items${featureListWrapperClass}${inlineDesignClass}`}
                    >
                        {features.map(
                            (
                                {
                                    title,
                                    iconType,
                                    featureImage,
                                    featureImageId,
                                    featureImageAlt,
                                    featureImageTitle,
                                    icon,
                                    iconColor,
                                    iconBackgroundColor,
                                    content,
                                    link,
                                    linkOpenNewTab,
                                    showBadge,
                                    badgeText,
                                    badgeTextColor,
                                    badgeBackgroundColor,
                                },
                                index
                            ) => {
                                {
                                    iconStyle = {
                                        color: iconColor,
                                        backgroundColor: iconBackgroundColor,
                                    };
                                    badgeStyle = {
                                        color: badgeTextColor,
                                        backgroundColor: badgeBackgroundColor,
                                    };
                                }
                                return (
                                    <li
                                        key={index}
                                        className="eb-feature-list-item"
                                        data-new-tab={
                                            linkOpenNewTab ? linkOpenNewTab.toString() : "false"
                                        }
                                        data-icon-type={iconType}
                                        data-image={featureImage}
                                        data-image-id={featureImageId}
                                        data-icon={icon}
                                        data-icon-color={iconColor}
                                        data-icon-background-color={iconBackgroundColor}
                                        data-link={link}
                                        data-alt={featureImageAlt}
                                        data-title={featureImageTitle}
                                        data-show-badge={showBadge ? showBadge.toString() : "false"}
                                        data-badge-text={badgeText}
                                        data-badge-text-color={badgeTextColor}
                                        data-badge-background-color={badgeBackgroundColor}
                                    >
                                        {iconType !== "none" && (
                                            <div className="eb-feature-list-icon-box">
                                                <div className={`eb-feature-list-icon-inner ${iconLiquidGlass.enable ? 'eb_liquid_glass-' + iconLiquidGlass.effect + ' ' + 'eb_liquid_glass_shadow-' + iconLiquidGlass.shadowEffect : ''}`}>
                                                    {applyFilters("eb_liquid_glass_effect_pro_content", "", attributes, "iconLiquidGlass")}
                                                    <span
                                                        className="eb-feature-list-icon"
                                                        style={iconStyle}
                                                    >
                                                        {iconType === "icon" && <EBDisplayIcon icon={icon} />}
                                                        {iconType === "image" && (
                                                            <img
                                                                className="eb-feature-list-img"
                                                                src={featureImage}
                                                                alt={
                                                                    featureImageAlt
                                                                        ? featureImageAlt
                                                                        : featureImageTitle
                                                                }
                                                            />
                                                        )}
                                                    </span>
                                                </div>
                                            </div>
                                        )}
                                        <div className="eb-feature-list-content-box">
                                            <div className="eb-feature-list-title-wrapper">
                                                {link ? (
                                                    <attributes.titleTag className="eb-feature-list-title">
                                                        <a
                                                            href={sanitizeURL(link)}
                                                            target={
                                                                linkOpenNewTab == "true" ? "_blank" : "_self"
                                                            }
                                                            rel="noopener"
                                                        >
                                                            {title}
                                                        </a>
                                                    </attributes.titleTag>
                                                ) : (
                                                    <attributes.titleTag className="eb-feature-list-title">
                                                        {title}
                                                    </attributes.titleTag>
                                                )}
                                                {showBadge == "true" && badgeText && (
                                                    <span className="eb-feature-list-badge" style={badgeStyle}>
                                                        {badgeText}
                                                    </span>
                                                )}
                                            </div>
                                            {!useInlineDesign && (
                                                <p className="eb-feature-list-content">{content}</p>
                                            )}
                                        </div>
                                    </li>
                                );
                            }
                        )}
                    </ul>
                </div>
            </div>
        </BlockProps.Save>
        // edit view end
    );
};
export default Save;
