/**
 * WordPress dependencies
 */
import { useBlockProps } from "@wordpress/block-editor";

import InfoboxContainer from "./components/infobox-save-depricated";
import InfoboxContainer2 from "./components/infobox-save-depricated-2";
import InfoboxContainer3 from "./components/infobox-save-depricated-3";
import { omit } from "lodash";

import attributes from "./attributes";

const deprecated = [
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
                            href={infoboxLink}
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
                            href={infoboxLink}
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
                            href={infoboxLink}
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
