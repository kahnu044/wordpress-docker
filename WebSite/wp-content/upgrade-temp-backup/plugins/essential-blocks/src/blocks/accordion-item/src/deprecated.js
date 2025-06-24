/**
 * WordPress dependencies
 */
import { InnerBlocks, RichText, useBlockProps } from "@wordpress/block-editor";
const { omit } = lodash;
import { getIconClass, EBDisplayIcon } from "@essential-blocks/controls";
import attributes from "./attributes";
const deprecated = [
    {
        attributes: { ...attributes },
        supports: {
            inserter: false,
            reusable: false,
            html: false,
            anchor: true,
            lock: false,
        },
        save: ({ attributes }) => {
            const {
                itemId,
                blockId,
                inheritedTagName,
                inheritedDisplayIcon,
                inheritedTabIcon,
                parentBlockId,
                accordionLists,
                inheritedAccordionType
            } = attributes;

            const blockProps = useBlockProps.save({
                className: `${blockId} eb-accordion-wrapper`,
            });

            const foundItem = accordionLists?.find((item) => item.id == itemId);

            const JsxContent = () => {
                return (
                    <div {...blockProps} data-clickable={foundItem?.clickable}>
                        <div
                            className={`eb-accordion-title-wrapper eb-accordion-title-wrapper-${parentBlockId}`}
                            tabIndex={0}
                            {...(inheritedAccordionType === "image" &&
                            foundItem?.imageUrl
                                ? { "data-image-url": foundItem?.imageUrl }
                                : {})}
                            {...(inheritedAccordionType === "image" &&
                            foundItem?.imageAlt
                                ? { "data-image-alt": foundItem?.imageAlt }
                                : {})}
                        >
                            {inheritedDisplayIcon && (
                                <span
                                    className={`eb-accordion-icon-wrapper eb-accordion-icon-wrapper-${parentBlockId}`}
                                >
                                    <span
                                        className={`${getIconClass(
                                            inheritedTabIcon,
                                        )} eb-accordion-icon`}
                                    ></span>
                                </span>
                            )}

                            <div
                                className={`eb-accordion-title-content-wrap title-content-${parentBlockId}`}
                            >
                                {foundItem?.titlePrefixType !== "none" && (
                                    <>
                                        {foundItem?.titlePrefixType ===
                                            "text" &&
                                            foundItem?.titlePrefixText && (
                                                <RichText.Content
                                                    className={
                                                        "eb-accordion-title-prefix-text"
                                                    }
                                                    tagName="span"
                                                    value={
                                                        foundItem?.titlePrefixText
                                                    }
                                                />
                                            )}

                                        {foundItem?.titlePrefixType ===
                                            "icon" &&
                                            foundItem?.titlePrefixIcon && (
                                                <EBDisplayIcon
                                                    icon={
                                                        foundItem?.titlePrefixIcon
                                                    }
                                                    className={`eb-accordion-title-prefix-icon`}
                                                />
                                            )}

                                        {foundItem?.titlePrefixType ===
                                            "image" &&
                                        foundItem?.titlePrefixImgUrl ? (
                                            <img
                                                className="eb-accordion-title-prefix-img"
                                                src={
                                                    foundItem?.titlePrefixImgUrl
                                                }
                                                alt={
                                                    foundItem?.titlePrefixImgAlt
                                                }
                                            />
                                        ) : null}
                                    </>
                                )}
                                <RichText.Content
                                    className={"eb-accordion-title"}
                                    tagName={inheritedTagName}
                                    value={foundItem?.title}
                                />

                                {foundItem?.titleSuffixType !== "none" && (
                                    <>
                                        {foundItem?.titleSuffixType ===
                                            "text" &&
                                            foundItem?.titleSuffixText && (
                                                <RichText.Content
                                                    className={
                                                        "eb-accordion-title-suffix-text"
                                                    }
                                                    tagName="span"
                                                    value={
                                                        foundItem?.titleSuffixText
                                                    }
                                                />
                                            )}

                                        {foundItem?.titleSuffixType ===
                                            "icon" &&
                                            foundItem?.titleSuffixIcon && (
                                                <EBDisplayIcon
                                                    icon={
                                                        foundItem?.titleSuffixIcon
                                                    }
                                                    className={`eb-accordion-title-suffix-icon`}
                                                />
                                            )}

                                        {foundItem?.titleSuffixType ===
                                            "image" &&
                                        foundItem?.titleSuffixImgUrl ? (
                                            <img
                                                className="eb-accordion-title-suffix-img"
                                                src={
                                                    foundItem?.titleSuffixImgUrl
                                                }
                                                alt={
                                                    foundItem?.titleSuffixImgAlt
                                                }
                                            />
                                        ) : null}
                                    </>
                                )}
                            </div>
                        </div>
                        <div
                            className={`eb-accordion-content-wrapper eb-accordion-content-wrapper-${parentBlockId}`}
                        >
                            <div className="eb-accordion-content">
                                <InnerBlocks.Content />
                                {inheritedAccordionType === "image" &&
                                    foundItem?.imageUrl && (
                                        <div className="eb-accordion-image-wrapper-mobile">
                                            <img
                                                src={foundItem?.imageUrl || ""}
                                                alt={foundItem?.imageAlt || ""}
                                            />
                                        </div>
                                    )}
                            </div>
                        </div>
                    </div>
                );
            };
            return (
                <>
                    <JsxContent />
                </>
            );
        },
    },
    {
        attributes: {
            ...omit({ ...attributes }, ["accordionLists", "accordionType"]),
            title: {
                type: "string",
            },
            titleColor: {
                type: "string",
            },
            clickable: {
                type: "boolean",
                default: false,
            },
            accordionColor: {
                type: "string",
            },
            iconColor: {
                type: "string",
            },
            titlePrefixType: {
                type: "string",
                default: "none",
            },

            titlePrefixColor: {
                type: "string",
            },

            titlePrefixImgUrl: {
                type: "string",
                default: "",
            },
            titlePrefixImgId: {
                type: "string",
            },

            titlePrefixImgAlt: {
                type: "string",
            },

            titleSuffixType: {
                type: "string",
                default: "none",
            },
            titleSuffixIconColor: {
                type: "string",
            },

            titleSuffixImgUrl: {
                type: "string",
                default: "",
            },
            titleSuffixImgId: {
                type: "string",
            },
            titleSuffixImgAlt: {
                type: "string",
            },
            titleSuffixText: {
                type: "string",
                default: "Suffix",
            },
            titlePrefixText: {
                type: "string",
                default: "Prefix",
            },
            titlePrefixIcon: {
                type: "string",
                default: "dashicon dashicons dashicons-admin-users",
            },
            titleSuffixIcon: {
                type: "string",
                default: "dashicon dashicons dashicons-admin-site",
            },
        },
        supports: {
            inserter: false,
            reusable: false,
            html: false,
            anchor: true,
            lock: false,
        },
        save: ({ attributes }) => {
            const {
                title,
                clickable,
                blockId,
                inheritedTagName,
                inheritedDisplayIcon,
                inheritedTabIcon,

                titlePrefixType,
                titlePrefixText,
                titlePrefixIcon,
                titlePrefixImgUrl,
                titlePrefixImgAlt,

                titleSuffixType,
                titleSuffixText,
                titleSuffixIcon,
                titleSuffixImgUrl,
                titleSuffixImgAlt,
                parentBlockId,
            } = attributes;

            const blockProps = useBlockProps.save({
                className: `${blockId} eb-accordion-wrapper`,
            });

            const JsxContent = () => {
                return (
                    <div {...blockProps} data-clickable={clickable}>
                        <div
                            className={`eb-accordion-title-wrapper eb-accordion-title-wrapper-${parentBlockId}`}
                            tabIndex={0}
                        >
                            {inheritedDisplayIcon && (
                                <span
                                    className={`eb-accordion-icon-wrapper eb-accordion-icon-wrapper-${parentBlockId}`}
                                >
                                    <span
                                        className={`${getIconClass(
                                            inheritedTabIcon,
                                        )} eb-accordion-icon`}
                                    ></span>
                                </span>
                            )}

                            <div
                                className={`eb-accordion-title-content-wrap title-content-${parentBlockId}`}
                            >
                                {titlePrefixType !== "none" && (
                                    <>
                                        {titlePrefixType === "text" &&
                                            titlePrefixText && (
                                                <RichText.Content
                                                    className={
                                                        "eb-accordion-title-prefix-text"
                                                    }
                                                    tagName="span"
                                                    value={titlePrefixText}
                                                />
                                            )}

                                        {titlePrefixType === "icon" &&
                                            titlePrefixIcon && (
                                                <EBDisplayIcon
                                                    icon={titlePrefixIcon}
                                                    className={`eb-accordion-title-prefix-icon`}
                                                />
                                            )}

                                        {titlePrefixType === "image" &&
                                        titlePrefixImgUrl ? (
                                            <img
                                                className="eb-accordion-title-prefix-img"
                                                src={titlePrefixImgUrl}
                                                alt={titlePrefixImgAlt}
                                            />
                                        ) : null}
                                    </>
                                )}
                                <RichText.Content
                                    className={"eb-accordion-title"}
                                    tagName={inheritedTagName}
                                    value={title}
                                />

                                {titleSuffixType !== "none" && (
                                    <>
                                        {titleSuffixType === "text" &&
                                            titleSuffixText && (
                                                <RichText.Content
                                                    className={
                                                        "eb-accordion-title-suffix-text"
                                                    }
                                                    tagName="span"
                                                    value={titleSuffixText}
                                                />
                                            )}

                                        {titleSuffixType === "icon" &&
                                            titleSuffixIcon && (
                                                <EBDisplayIcon
                                                    icon={titleSuffixIcon}
                                                    className={`eb-accordion-title-suffix-icon`}
                                                />
                                            )}

                                        {titleSuffixType === "image" &&
                                        titleSuffixImgUrl ? (
                                            <img
                                                className="eb-accordion-title-suffix-img"
                                                src={titleSuffixImgUrl}
                                                alt={titleSuffixImgAlt}
                                            />
                                        ) : null}
                                    </>
                                )}
                            </div>
                        </div>
                        <div
                            className={`eb-accordion-content-wrapper eb-accordion-content-wrapper-${parentBlockId}`}
                        >
                            <div className="eb-accordion-content">
                                <InnerBlocks.Content />
                            </div>
                        </div>
                    </div>
                );
            };
            return (
                <>
                    <JsxContent />
                </>
            );
        },
    },
    {
        attributes: { ...attributes },
        save: ({ attributes }) => {
            const {
                title,
                clickable,
                blockId,
                inheritedTagName,
                inheritedDisplayIcon,
                inheritedTabIcon,

                titlePrefixType,
                titlePrefixText,
                titlePrefixIcon,
                titlePrefixImgUrl,
                titlePrefixImgAlt,

                titleSuffixType,
                titleSuffixText,
                titleSuffixIcon,
                titleSuffixImgUrl,
                titleSuffixImgAlt,
            } = attributes;

            return (
                <>
                    <div
                        className={`${blockId} eb-accordion-wrapper`}
                        data-clickable={clickable}
                    >
                        <div
                            className={`eb-accordion-title-wrapper`}
                            tabIndex={0}
                        >
                            {inheritedDisplayIcon && (
                                <span className="eb-accordion-icon-wrapper">
                                    <span
                                        className={`${getIconClass(
                                            inheritedTabIcon,
                                        )} eb-accordion-icon`}
                                    ></span>
                                </span>
                            )}

                            <div className="eb-accordion-title-content-wrap">
                                {titlePrefixType !== "none" && (
                                    <>
                                        {titlePrefixType === "text" &&
                                            titlePrefixText && (
                                                <RichText.Content
                                                    className={
                                                        "eb-accordion-title-prefix-text"
                                                    }
                                                    tagName="span"
                                                    value={titlePrefixText}
                                                />
                                            )}

                                        {titlePrefixType === "icon" &&
                                            titlePrefixIcon && (
                                                <EBDisplayIcon
                                                    icon={titlePrefixIcon}
                                                    className={`eb-accordion-title-prefix-icon`}
                                                />
                                            )}

                                        {titlePrefixType === "image" &&
                                        titlePrefixImgUrl ? (
                                            <img
                                                className="eb-accordion-title-prefix-img"
                                                src={titlePrefixImgUrl}
                                                alt={titlePrefixImgAlt}
                                            />
                                        ) : null}
                                    </>
                                )}
                                <RichText.Content
                                    className={"eb-accordion-title"}
                                    tagName={inheritedTagName}
                                    value={title}
                                />

                                {titleSuffixType !== "none" && (
                                    <>
                                        {titleSuffixType === "text" &&
                                            titleSuffixText && (
                                                <RichText.Content
                                                    className={
                                                        "eb-accordion-title-suffix-text"
                                                    }
                                                    tagName="span"
                                                    value={titleSuffixText}
                                                />
                                            )}

                                        {titleSuffixType === "icon" &&
                                            titleSuffixIcon && (
                                                <EBDisplayIcon
                                                    icon={titleSuffixIcon}
                                                    className={`eb-accordion-title-suffix-icon`}
                                                />
                                            )}

                                        {titleSuffixType === "image" &&
                                        titleSuffixImgUrl ? (
                                            <img
                                                className="eb-accordion-title-suffix-img"
                                                src={titleSuffixImgUrl}
                                                alt={titleSuffixImgAlt}
                                            />
                                        ) : null}
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="eb-accordion-content-wrapper">
                            <div className="eb-accordion-content">
                                <InnerBlocks.Content />
                            </div>
                        </div>
                    </div>
                </>
            );
        },
    },
    {
        attributes: {
            ...omit({ ...attributes }, ["parentBlockId"]),
        },
        save: ({ attributes }) => {
            const {
                title,
                clickable,
                blockId,
                inheritedTagName,
                inheritedDisplayIcon,
                inheritedTabIcon,

                titlePrefixType,
                titlePrefixText,
                titlePrefixIcon,
                titlePrefixImgUrl,
                titlePrefixImgAlt,

                titleSuffixType,
                titleSuffixText,
                titleSuffixIcon,
                titleSuffixImgUrl,
                titleSuffixImgAlt,
            } = attributes;

            return (
                <>
                    <div
                        className={`${blockId} eb-accordion-wrapper`}
                        data-clickable={clickable}
                    >
                        <div
                            className={`eb-accordion-title-wrapper`}
                            tabIndex={0}
                        >
                            {inheritedDisplayIcon && (
                                <span className="eb-accordion-icon-wrapper">
                                    <span
                                        className={`${getIconClass(
                                            inheritedTabIcon,
                                        )} eb-accordion-icon`}
                                    ></span>
                                </span>
                            )}

                            <div className="eb-accordion-title-content-wrap">
                                {titlePrefixType !== "none" && (
                                    <>
                                        {titlePrefixType === "text" &&
                                            titlePrefixText && (
                                                <RichText.Content
                                                    className={
                                                        "eb-accordion-title-prefix-text"
                                                    }
                                                    tagName="span"
                                                    value={titlePrefixText}
                                                />
                                            )}

                                        {titlePrefixType === "icon" &&
                                            titlePrefixIcon && (
                                                <EBDisplayIcon
                                                    icon={titlePrefixIcon}
                                                    className={`eb-accordion-title-prefix-icon`}
                                                />
                                            )}

                                        {titlePrefixType === "image" &&
                                        titlePrefixImgUrl ? (
                                            <img
                                                className="eb-accordion-title-prefix-img"
                                                src={titlePrefixImgUrl}
                                                alt={titlePrefixImgAlt}
                                            />
                                        ) : null}
                                    </>
                                )}
                                <RichText.Content
                                    className={"eb-accordion-title"}
                                    tagName={inheritedTagName}
                                    value={title}
                                />

                                {titleSuffixType !== "none" && (
                                    <>
                                        {titleSuffixType === "text" &&
                                            titleSuffixText && (
                                                <RichText.Content
                                                    className={
                                                        "eb-accordion-title-suffix-text"
                                                    }
                                                    tagName="span"
                                                    value={titleSuffixText}
                                                />
                                            )}

                                        {titleSuffixType === "icon" &&
                                            titleSuffixIcon && (
                                                <EBDisplayIcon
                                                    icon={titleSuffixIcon}
                                                    className={`eb-accordion-title-suffix-icon`}
                                                />
                                            )}

                                        {titleSuffixType === "image" &&
                                        titleSuffixImgUrl ? (
                                            <img
                                                className="eb-accordion-title-suffix-img"
                                                src={titleSuffixImgUrl}
                                                alt={titleSuffixImgAlt}
                                            />
                                        ) : null}
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="eb-accordion-content-wrapper">
                            <div className="eb-accordion-content">
                                <InnerBlocks.Content />
                            </div>
                        </div>
                    </div>
                </>
            );
        },
    },
    {
        attributes: {
            ...omit({ ...attributes }, [
                "titlePrefixType",
                "titlePrefixText",
                "titlePrefixIcon",
                "titlePrefixImgUrl",
                "titlePrefixImgId",
                "titlePrefixImgAlt",
                "titleSuffixType",
                "titleSuffixText",
                "titleSuffixIcon",
                "titleSuffixImgUrl",
                "titleSuffixImgId",
                "titleSuffixImgAlt",
            ]),
        },
        save: ({ attributes }) => {
            const {
                title,
                clickable,
                blockId,
                inheritedTagName,
                inheritedDisplayIcon,
                inheritedTabIcon,
            } = attributes;

            return (
                <>
                    <div
                        className={`${blockId} eb-accordion-wrapper`}
                        data-clickable={clickable}
                    >
                        <div
                            className={`eb-accordion-title-wrapper`}
                            tabIndex={0}
                        >
                            {inheritedDisplayIcon && (
                                <span className="eb-accordion-icon-wrapper">
                                    <span
                                        className={`${getIconClass(
                                            inheritedTabIcon,
                                        )} eb-accordion-icon`}
                                    ></span>
                                </span>
                            )}
                            <RichText.Content
                                className={"eb-accordion-title"}
                                tagName={inheritedTagName}
                                value={title}
                            />
                        </div>
                        <div className="eb-accordion-content-wrapper">
                            <div className="eb-accordion-content">
                                <InnerBlocks.Content />
                            </div>
                        </div>
                    </div>
                </>
            );
        },
    },
    {
        attributes: { ...attributes },
        save: ({ attributes }) => {
            const {
                title,
                clickable,
                blockId,
                inheritedTagName,
                inheritedDisplayIcon,
                inheritedTabIcon,
            } = attributes;

            return (
                <>
                    <div
                        className={`${blockId} eb-accordion-wrapper`}
                        data-clickable={clickable}
                    >
                        <div className={`eb-accordion-title-wrapper`}>
                            {inheritedDisplayIcon && (
                                <span className="eb-accordion-icon-wrapper">
                                    <span
                                        className={`${inheritedTabIcon} eb-accordion-icon`}
                                    ></span>
                                </span>
                            )}
                            <RichText.Content
                                className={"eb-accordion-title"}
                                tagName={inheritedTagName}
                                value={title}
                            />
                        </div>
                        <div className="eb-accordion-content-wrapper">
                            <div className="eb-accordion-content">
                                <InnerBlocks.Content />
                            </div>
                        </div>
                    </div>
                </>
            );
        },
    },
    {
        attributes: {
            ...omit({ ...attributes }, [
                "resOption",
                "blockId",
                "blockRoot",
                "blockMeta",
                "titleColor",
                "accordionColor",
                "iconColor",
                "parentBlockId",
            ]),
        },
        save: ({ attributes }) => {
            const {
                title,
                clickable,
                inheritedTagName,
                inheritedDisplayIcon,
                inheritedTabIcon,
            } = attributes;

            return (
                <>
                    <div
                        className={`eb-accordion-wrapper`}
                        data-clickable={clickable}
                    >
                        <div className={`eb-accordion-title-wrapper`}>
                            {inheritedDisplayIcon && (
                                <span className="eb-accordion-icon-wrapper">
                                    <span
                                        className={`${inheritedTabIcon} eb-accordion-icon`}
                                    ></span>
                                </span>
                            )}
                            <RichText.Content
                                className={"eb-accordion-title"}
                                tagName={inheritedTagName}
                                value={title}
                            />
                        </div>
                        <div className="eb-accordion-content-wrapper">
                            <div className="eb-accordion-content">
                                <InnerBlocks.Content />
                            </div>
                        </div>
                    </div>
                </>
            );
        },
    },
];

export default deprecated;
