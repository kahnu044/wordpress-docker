import { InnerBlocks, RichText } from "@wordpress/block-editor";
const { BlockProps } = window.EBControls;
export default function save({ attributes }) {
    const {
        blockId,
        tabTitles,
        layout,
        isMediaOn,
        classHook,
        tagName,
        closeAllTabs,
        isMinHeightAsTitle
    } = attributes;

    const dataAttributes = {
        'data-min-height': isMinHeightAsTitle,
        ...(closeAllTabs && { 'data-close-all-tabs': closeAllTabs })
    };

    return (
        <BlockProps.Save attributes={attributes}>
            <div
                className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`}
            >
                <div
                    className={`${blockId} eb-advanced-tabs-wrapper ${layout}`}
                    {...dataAttributes}
                >
                    <div className="eb-tabs-nav">
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
                                        closeAllTabs !== true && item.isDefault ? "active" : "inactive"
                                    }
                                >
                                    {isMediaOn && (
                                        <>
                                            {item.media === "icon" &&
                                                item.icon && (
                                                    <span
                                                        className={`tabIcon ${item.icon}`}
                                                    />
                                                )}
                                            {item.media === "image" &&
                                                item.imgUrl && (
                                                    <img src={item.imgUrl} />
                                                )}
                                        </>
                                    )}
                                    <RichText.Content
                                        tagName={tagName}
                                        className="tab-title-text"
                                        value={item.text}
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="eb-tabs-contents">
                        <InnerBlocks.Content />
                    </div>
                </div>
            </div>
        </BlockProps.Save >
    );
}
