import { InnerBlocks, RichText } from "@wordpress/block-editor";
import { BlockProps, EBDisplayIconSave } from "@essential-blocks/controls";
import { applyFilters } from "@wordpress/hooks";
export default function save({ attributes }) {
    const {
        blockId,
        tabTitles,
        layout,
        isMediaOn,
        classHook,
        tagName,
        closeAllTabs,
        isMinHeightAsTitle,
        addCaretIcon,
        caretIcon,
        tabStyle,
    } = attributes;

    const dataAttributes = {
        "data-min-height": isMinHeightAsTitle,
        ...(closeAllTabs && { "data-close-all-tabs": closeAllTabs }),
    };

    return (
        <BlockProps.Save attributes={attributes}>
            <div
                className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`}
            >
                <div
                    className={`${blockId} eb-advanced-tabs-wrapper ${layout} ${tabStyle === 'liquid-glass' ? 'eb-tabs-wrapper-glassed' : ''}`}
                    {...dataAttributes}
                >
                    <div className={`eb-tabs-nav ${tabStyle === 'liquid-glass' ? 'eb-tabs-glassed' : ''}`} >
                        <ul
                            className="tabTitles"
                            data-tabs-ul-id={`${blockId}`}
                        >
                            {tabTitles.map((item, index) => (
                                <li
                                    key={index}
                                    data-title-tab-id={item.id}
                                    data-title-custom-id={item.customId}
                                    {...(item.customId
                                        ? { id: item.customId }
                                        : {})}
                                    className={
                                        closeAllTabs !== true && item.isDefault
                                            ? "active"
                                            : "inactive"
                                    }
                                >
                                    {isMediaOn && (
                                        <>
                                            {item.media === "icon" &&
                                                item.icon && (
                                                    <EBDisplayIconSave
                                                        icon={item.icon}
                                                        className={"tabIcon"}
                                                    />
                                                )}
                                            {item.media === "image" &&
                                                item.imgUrl && (
                                                    <img src={item.imgUrl} />
                                                )}
                                        </>
                                    )}
                                    <div className="tab-title-wrap">
                                        <RichText.Content
                                            tagName={tagName}
                                            className="tab-title-text"
                                            value={item.text}
                                        />
                                        {item.enableSubtitle && item.subtitle && (
                                            <p className="tab-subtitle-text">
                                                {item.subtitle}
                                            </p>
                                        )}
                                    </div>
                                    {addCaretIcon && caretIcon && (
                                        <EBDisplayIconSave
                                            icon={caretIcon}
                                            className="tab-caret-icon"
                                        />
                                    )}
                                </li>
                            ))}

                            {applyFilters(
                                "eb_advanced_tabs_pro_liquid_glass_effect_editor_html",
                                "",
                                attributes,
                            )}
                        </ul>
                    </div>

                    <div className="eb-tabs-contents">
                        <InnerBlocks.Content />
                    </div>
                </div>
            </div>
        </BlockProps.Save>
    );
}
