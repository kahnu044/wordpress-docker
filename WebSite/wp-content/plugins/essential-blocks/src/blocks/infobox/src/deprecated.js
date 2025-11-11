/**
 * WordPress dependencies
 */
import { useBlockProps } from "@wordpress/block-editor";
import {
    sanitizeURL,
    BlockProps,
    generateDimensionsAttributes,
    generateBackgroundAttributes,
    generateBorderShadowAttributes,
} from "@essential-blocks/controls";
import { renderToString } from "@wordpress/element";

import { buttonPadding } from "./constants/dimensionsConstants";
import { infoBtnBg } from "./constants/backgroundsConstants";

import { btnBdShd } from "./constants/borderShadowConstants";

import InfoboxContainer from "./components/infobox-save-depricated";
import InfoboxContainer2 from "./components/infobox-save-depricated-2";
import InfoboxContainer3 from "./components/infobox-save-depricated-3";
import InfoboxContainer4 from "./components/infobox-save-depricated-4";
import InfoboxContainer5 from "./components/infobox-save-depricated-5";
import InfoboxContainer6 from "./components/infobox-save-depricated-6";
import InfoboxContainer7 from "./components/infobox-save-depricated-7";
import InfoboxContainer8 from "./components/infobox-save-depricated-8";
import InfoboxContainer9 from "./components/infobox-save-depricated-9";
import InfoboxContainer10 from "./components/infobox-save-depricated-10";
import { omit } from "lodash";

import attributes from "./attributes";

const deprecated = [
    {
        attributes: { ...attributes },
        supports: {
            align: ["wide", "full"],
        },
        save: ({ attributes }) => {
            const {
                blockId,
                selectedIcon,
                infoboxIcon,
                number = 0,
                media,
                imageUrl,
                imageAlt,
                enableSubTitle,
                enableDescription,
                infoboxLink,
                linkNewTab,
                enableButton,
                isInfoClick,
                buttonText,
                title,
                subTitle,
                description,
                titleTag,
                subTitleTag,
                btnEffect,
                classHook,
                showMedia,
                enableTitle,
                addBtnIcon,
                btnIconPosition,
                btnIcon,
            } = attributes;

            const requiredProps = {
                selectedIcon,
                infoboxIcon,
                blockId,
                number,
                media,
                imageUrl,
                imageAlt,
                enableSubTitle,
                enableDescription,
                infoboxLink,
                linkNewTab,
                enableButton,
                isInfoClick,
                buttonText,
                title,
                subTitle,
                description,
                titleTag,
                subTitleTag,
                btnEffect,
                classHook,
                showMedia,
                enableTitle,
                addBtnIcon,
                btnIconPosition,
                btnIcon,
            };

            return (
                <BlockProps.Save attributes={attributes}>
                    <InfoboxContainer10
                        requiredProps={requiredProps}
                        attributes={attributes}
                    />
                </BlockProps.Save>
            );
        },
    },
    // Deprecated v9: Changed from anchor wrapper to data attributes for clickable infobox
    {
        attributes: { ...attributes },

        migrate(attribute) {
            const { imageUrlOld, imageUrl } = attribute;

            const updatedAttributes = { ...attribute };

            // If we have imageUrlOld but imageUrl is empty/undefined, migrate it
            if (imageUrlOld && (!imageUrl || imageUrl === "")) {
                updatedAttributes.imageUrl = imageUrlOld;
            }
            return updatedAttributes;
        },
        isEligible: (attributes) => {
            return attributes.imageUrl !== undefined;
        },
        supports: {
            align: ["wide", "full"],
        },
        save: ({ attributes }) => {
            const {
                blockId,
                selectedIcon,
                infoboxIcon,
                number = 0,
                media,
                imageUrl,
                imageUrlOld,
                imageAlt,
                enableSubTitle,
                enableDescription,
                infoboxLink,
                linkNewTab,
                enableButton,
                isInfoClick,
                buttonText,
                title,
                subTitle,
                description,
                titleTag,
                subTitleTag,
                btnEffect,
                classHook,
                showMedia,
                enableTitle,
                addBtnIcon,
                btnIconPosition,
                btnIcon,
            } = attributes;

            const requiredProps = {
                selectedIcon,
                infoboxIcon,
                blockId,
                number,
                media,
                imageUrl: imageUrlOld || imageUrl, // Use imageUrlOld as fallback
                imageAlt, // Use imageAltOld as fallback
                enableSubTitle,
                enableDescription,
                infoboxLink,
                linkNewTab,
                enableButton,
                isInfoClick,
                buttonText,
                title,
                subTitle,
                description,
                titleTag,
                subTitleTag,
                btnEffect,
                classHook,
                showMedia,
                enableTitle,
                addBtnIcon,
                btnIconPosition,
                btnIcon,
            };

            const ReturnComponent = () => {
                return (
                    <BlockProps.Save attributes={attributes}>
                        <InfoboxContainer9
                            requiredProps={requiredProps}
                            attributes={attributes}
                        />
                    </BlockProps.Save>
                );
            };

            const html = renderToString(<ReturnComponent />);

            return <ReturnComponent />;
        },
    },
    {
        attributes: {
            ...attributes,
            imageUrl: {
                source: "attribute",
                selector: ".eb-infobox-image",
                attribute: "src",
                // default: "https://source.unsplash.com/user/cristofer",
            },
            imageAlt: {
                type: "string",
            },
            imageId: {
                type: "string",
            },
        },
        isEligible: (attributes) => {
            return attributes.imageUrl !== undefined;
        },
        supports: {
            align: ["wide", "full"],
        },
        save: ({ attributes }) => {
            const {
                blockId,
                selectedIcon,
                infoboxIcon,
                number = 0,
                media,
                imageUrl,
                imageAlt,
                enableSubTitle,
                enableDescription,
                infoboxLink,
                linkNewTab,
                enableButton,
                isInfoClick,
                buttonText,
                title,
                subTitle,
                description,
                titleTag,
                subTitleTag,
                btnEffect,
                classHook,
                showMedia,
                enableTitle,
                addBtnIcon,
                btnIconPosition,
                btnIcon,
            } = attributes;

            const requiredProps = {
                selectedIcon,
                infoboxIcon,
                blockId,
                number,
                media,
                imageUrl,
                imageAlt,
                enableSubTitle,
                enableDescription,
                infoboxLink,
                linkNewTab,
                enableButton,
                isInfoClick,
                buttonText,
                title,
                subTitle,
                description,
                titleTag,
                subTitleTag,
                btnEffect,
                classHook,
                showMedia,
                enableTitle,
                addBtnIcon,
                btnIconPosition,
                btnIcon,
            };

            return (
                <BlockProps.Save attributes={attributes}>
                    {isInfoClick ? (
                        <a
                            href={
                                infoboxLink == undefined
                                    ? ""
                                    : sanitizeURL(infoboxLink)
                            }
                            target={linkNewTab ? "_blank" : "_self"}
                            rel="noopener noreferrer"
                            className="info-click-link info-wrap-link"
                        >
                            <InfoboxContainer8 requiredProps={requiredProps} />
                        </a>
                    ) : (
                        <InfoboxContainer8
                            requiredProps={requiredProps}
                            attributes={attributes}
                        />
                    )}
                </BlockProps.Save>
            );
        },
    },
    {
        attributes: omit(
            {
                ...attributes,
                btnEffect: {
                    type: "string",
                },
                buttonText: {
                    type: "string",
                    default: "Learn More",
                },
                buttonTextColor: {
                    type: "string",
                    default: "var(--eb-global-button-text-color)",
                },
                buttonHvrTextColor: {
                    type: "string",
                    default: "var(--eb-global-button-text-color)",
                },
                infoboxLink: {
                    type: "string",
                },
                linkNewTab: {
                    type: "boolean",
                    default: false,
                },

                ...generateDimensionsAttributes(buttonPadding, {
                    top: 15,
                    bottom: 15,
                    right: 30,
                    left: 30,
                    isLinked: false,
                }),
                ...generateBorderShadowAttributes(btnBdShd, {
                    // bdrDefaults: {
                    // 	top: 10,
                    // 	bottom: 10,
                    // 	right: 10,
                    // 	left: 10,
                    // },
                    rdsDefaults: {
                        top: 10,
                        bottom: 10,
                        right: 10,
                        left: 10,
                    },
                    // noShadow: true,
                    // noBorder: true,
                }),
                ...generateBackgroundAttributes(infoBtnBg, {
                    defaultFillColor:
                        "var(--eb-global-button-background-color)",
                    // defaultHovFillColor: "var(--eb-global-secondary-color)",
                    defaultBgGradient: "var(--eb-gradient-background-color)",
                    forButton: true,
                }),
            },
            ["enableTitle", "showMedia", "iconView", "iconShape"],
        ),
        supports: {
            align: ["wide", "full"],
        },
        save: ({ attributes }) => {
            const {
                blockId,
                selectedIcon,
                infoboxIcon,
                number = 0,
                media,
                imageUrl,
                imageAlt,
                enableSubTitle,
                enableDescription,
                infoboxLink,
                linkNewTab,
                enableButton,
                isInfoClick,
                buttonText,
                title,
                subTitle,
                description,
                titleTag,
                subTitleTag,
                btnEffect,
                classHook,
                showMedia,
                enableTitle,
                addBtnIcon,
                btnIconPosition,
                btnIcon,
            } = attributes;

            const requiredProps = {
                selectedIcon,
                infoboxIcon,
                blockId,
                number,
                media,
                imageUrl,
                imageAlt,
                enableSubTitle,
                enableDescription,
                infoboxLink,
                linkNewTab,
                enableButton,
                isInfoClick,
                buttonText,
                title,
                subTitle,
                description,
                titleTag,
                subTitleTag,
                btnEffect,
                classHook,
            };

            return (
                <BlockProps.Save attributes={attributes}>
                    {isInfoClick ? (
                        <a
                            href={
                                infoboxLink == undefined
                                    ? ""
                                    : sanitizeURL(infoboxLink)
                            }
                            target={linkNewTab ? "_blank" : "_self"}
                            rel="noopener noreferrer"
                            className="info-click-link info-wrap-link"
                        >
                            <InfoboxContainer7 requiredProps={requiredProps} />
                        </a>
                    ) : (
                        <InfoboxContainer7 requiredProps={requiredProps} />
                    )}
                </BlockProps.Save>
            );
        },
    },
    {
        attributes: { ...attributes },
        supports: {
            align: ["wide", "full"],
        },
        save: ({ attributes }) => {
            const {
                blockId,
                selectedIcon,
                infoboxIcon,
                number = 0,
                media,
                imageUrl,
                imageAlt,
                enableSubTitle,
                enableDescription,
                infoboxLink,
                linkNewTab,
                enableButton,
                isInfoClick,
                buttonText,
                title,
                subTitle,
                description,
                titleTag,
                subTitleTag,
                btnEffect,
                classHook,
            } = attributes;

            const requiredProps = {
                selectedIcon,
                infoboxIcon,
                blockId,
                number,
                media,
                imageUrl,
                imageAlt,
                enableSubTitle,
                enableDescription,
                infoboxLink,
                linkNewTab,
                enableButton,
                isInfoClick,
                buttonText,
                title,
                subTitle,
                description,
                titleTag,
                subTitleTag,
                btnEffect,
                classHook,
            };

            return (
                <div {...useBlockProps.save()}>
                    {isInfoClick ? (
                        <a
                            href={infoboxLink == undefined ? "" : infoboxLink}
                            target={linkNewTab ? "_blank" : "_self"}
                            rel="noopener noreferrer"
                            className="info-click-link info-wrap-link"
                        >
                            <InfoboxContainer6 requiredProps={requiredProps} />
                        </a>
                    ) : (
                        <InfoboxContainer6 requiredProps={requiredProps} />
                    )}
                </div>
            );
        },
    },
    {
        attributes: { ...attributes },
        supports: {
            align: ["wide", "full"],
        },
        save: ({ attributes }) => {
            const {
                blockId,
                selectedIcon,
                infoboxIcon,
                number = 0,
                media,
                imageUrl,
                imageAlt,
                enableSubTitle,
                enableDescription,
                infoboxLink,
                linkNewTab,
                enableButton,
                isInfoClick,
                buttonText,
                title,
                subTitle,
                description,
                titleTag,
                subTitleTag,
                btnEffect,
                classHook,
            } = attributes;

            const requiredProps = {
                selectedIcon,
                infoboxIcon,
                blockId,
                number,
                media,
                imageUrl,
                imageAlt,
                enableSubTitle,
                enableDescription,
                infoboxLink,
                linkNewTab,
                enableButton,
                isInfoClick,
                buttonText,
                title,
                subTitle,
                description,
                titleTag,
                subTitleTag,
                btnEffect,
                classHook,
            };

            return (
                <div {...useBlockProps.save()}>
                    {isInfoClick ? (
                        <a
                            href={sanitizeURL(infoboxLink)}
                            target={linkNewTab ? "_blank" : "_self"}
                            rel="noopener noreferrer"
                            className="info-click-link info-wrap-link"
                        >
                            <InfoboxContainer5 requiredProps={requiredProps} />
                        </a>
                    ) : (
                        <InfoboxContainer5 requiredProps={requiredProps} />
                    )}
                </div>
            );
        },
    },
    {
        attributes: omit({ ...attributes }, ["infoboxIcon"]),
        migrate(attributes) {
            const { selectedIcon } = attributes;
            const newAttributes = { ...attributes };
            delete newAttributes.selectedIcon;

            return {
                ...newAttributes,
                infoboxIcon: selectedIcon,
            };
        },
        supports: {
            align: ["wide", "full"],
        },
        save: ({ attributes }) => {
            const {
                blockId,
                selectedIcon,
                infoboxIcon,
                number = 0,
                media,
                imageUrl,
                imageAlt,
                enableSubTitle,
                enableDescription,
                infoboxLink,
                linkNewTab,
                enableButton,
                isInfoClick,
                buttonText,
                title,
                subTitle,
                description,
                titleTag,
                subTitleTag,
                btnEffect,
                classHook,
            } = attributes;

            const requiredProps = {
                selectedIcon,
                infoboxIcon,
                blockId,
                number,
                media,
                imageUrl,
                imageAlt,
                enableSubTitle,
                enableDescription,
                infoboxLink,
                linkNewTab,
                enableButton,
                isInfoClick,
                buttonText,
                title,
                subTitle,
                description,
                titleTag,
                subTitleTag,
                btnEffect,
                classHook,
            };

            return (
                <div {...useBlockProps.save()}>
                    {isInfoClick ? (
                        <a
                            href={sanitizeURL(infoboxLink)}
                            target={linkNewTab ? "_blank" : "_self"}
                            rel="noopener noreferrer"
                            className="info-click-link info-wrap-link"
                        >
                            <InfoboxContainer4 requiredProps={requiredProps} />
                        </a>
                    ) : (
                        <InfoboxContainer4 requiredProps={requiredProps} />
                    )}
                </div>
            );
        },
    },
    {
        attributes: omit({ ...attributes }, ["imageAlt"]),
        supports: {
            align: ["wide", "full"],
        },
        save: ({ attributes }) => {
            const {
                blockId,
                selectedIcon,
                number = 0,
                media,
                imageUrl,
                enableSubTitle,
                enableDescription,
                infoboxLink,
                linkNewTab,
                enableButton,
                isInfoClick,
                buttonText,
                title,
                subTitle,
                description,
                titleTag,
                subTitleTag,
                btnEffect,
                classHook,
            } = attributes;

            const requiredProps = {
                selectedIcon,
                blockId,
                number,
                media,
                imageUrl,
                enableSubTitle,
                enableDescription,
                infoboxLink,
                linkNewTab,
                enableButton,
                isInfoClick,
                buttonText,
                title,
                subTitle,
                description,
                titleTag,
                subTitleTag,
                btnEffect,
                classHook,
            };

            return (
                <div {...useBlockProps.save()}>
                    {isInfoClick ? (
                        <a
                            href={sanitizeURL(infoboxLink)}
                            rel="noopener noreferrer"
                            className="info-click-link info-wrap-link"
                        >
                            <InfoboxContainer3 requiredProps={requiredProps} />
                        </a>
                    ) : (
                        <InfoboxContainer3 requiredProps={requiredProps} />
                    )}
                </div>
            );
        },
    },
    {
        attributes: omit({ ...attributes }, ["linkNewTab"]),
        supports: {
            align: ["wide", "full"],
        },
        save: ({ attributes }) => {
            const {
                blockId,
                selectedIcon,
                number = 0,
                media,
                imageUrl,
                enableSubTitle,
                enableDescription,
                infoboxLink,
                linkNewTab,
                enableButton,
                isInfoClick,
                buttonText,
                title,
                subTitle,
                description,
                titleTag,
                subTitleTag,
                btnEffect,
                classHook,
            } = attributes;

            const requiredProps = {
                selectedIcon,
                blockId,
                number,
                media,
                imageUrl,
                enableSubTitle,
                enableDescription,
                infoboxLink,
                linkNewTab,
                enableButton,
                isInfoClick,
                buttonText,
                title,
                subTitle,
                description,
                titleTag,
                subTitleTag,
                btnEffect,
                classHook,
            };

            return (
                <div {...useBlockProps.save()}>
                    {isInfoClick ? (
                        <a
                            href={sanitizeURL(infoboxLink)}
                            rel="noopener noreferrer"
                            className="info-click-link info-wrap-link"
                        >
                            <InfoboxContainer2 requiredProps={requiredProps} />
                        </a>
                    ) : (
                        <InfoboxContainer2 requiredProps={requiredProps} />
                    )}
                </div>
            );
        },
    },
    {
        attributes: { ...attributes },
        supports: {
            align: ["wide", "full"],
        },
        save: ({ attributes }) => {
            const {
                blockId,
                selectedIcon,
                number = 0,
                media,
                imageUrl,
                enableSubTitle,
                enableDescription,
                infoboxLink,
                enableButton,
                isInfoClick,
                buttonText,
                title,
                subTitle,
                description,
                titleTag,
                subTitleTag,
                btnEffect,
            } = attributes;

            const requiredProps = {
                selectedIcon,
                blockId,
                number,
                media,
                imageUrl,
                enableSubTitle,
                enableDescription,
                infoboxLink,
                enableButton,
                isInfoClick,
                buttonText,
                title,
                subTitle,
                description,
                titleTag,
                subTitleTag,
                btnEffect,
            };

            return (
                <div {...useBlockProps.save()}>
                    {isInfoClick ? (
                        <a
                            href={sanitizeURL(infoboxLink)}
                            rel="noopener noreferrer"
                            className="info-click-link info-wrap-link"
                        >
                            <InfoboxContainer requiredProps={requiredProps} />
                        </a>
                    ) : (
                        <InfoboxContainer requiredProps={requiredProps} />
                    )}
                </div>
            );
        },
    },
];

export default deprecated;
