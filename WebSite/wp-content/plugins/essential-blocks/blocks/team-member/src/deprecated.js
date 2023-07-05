/**
 * WordPress dependencies
 */
import { useBlockProps, RichText } from "@wordpress/block-editor";

import attributes from "./attributes";
import SocialLinksDeprecated1 from "./components/deprecated-social-links-1";
import SocialLinksDeprecated2 from "./components/deprecated-social-links-2";
import SocialLinks from "./components/social-links";
const { omit } = lodash;

const deprecated = [
    {
        attributes: {
            ...omit({ ...attributes }, ["imageAlt", "showLinkNewTab"]),
        },
        supports: {
            align: ["wide", "full"],
        },
        save: ({ attributes }) => {
            const {
                blockId,
                name,
                jobTitle,
                description,
                showDescs,
                showSocials,
                showCSeparator,
                showSSeparator,
                imageUrl,
                profilesOnly,
                socialInImage,
                icnEffect,
                classHook,
                avatarURL,
                newWindow,
            } = attributes;

            return (
                <div {...useBlockProps.save()}>
                    <div
                        className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`}
                    >
                        <div className={`${blockId} eb-team-wrapper`}>
                            <div className="eb-team-inner">
                                <div className="image">
                                    {avatarURL && (
                                        <a
                                            // className={`eb-button-anchor`}
                                            href={avatarURL ? avatarURL : ""}
                                            {...(newWindow && {
                                                target: "_blank",
                                            })}
                                            rel="noopener"
                                        >
                                            <img
                                                className="avatar"
                                                src={imageUrl}
                                                alt="member"
                                            />
                                        </a>
                                    )}

                                    {!avatarURL && (
                                        <img
                                            className="avatar"
                                            src={imageUrl}
                                            alt="member"
                                        />
                                    )}

                                    {socialInImage && showSocials && (
                                        <SocialLinksDeprecated2
                                            socialDetails={profilesOnly}
                                            icnEffect={icnEffect}
                                        />
                                    )}
                                </div>
                                <div className="contents">
                                    <div className="texts">
                                        {name && (
                                            <RichText.Content
                                                tagName="h3"
                                                className="name"
                                                value={name}
                                            />
                                        )}
                                        {jobTitle && (
                                            <RichText.Content
                                                tagName="h4"
                                                className="job_title"
                                                value={jobTitle}
                                            />
                                        )}

                                        {showCSeparator && (
                                            <hr className="content_separator" />
                                        )}

                                        {showDescs && description && (
                                            <RichText.Content
                                                tagName="p"
                                                className="description"
                                                value={description}
                                            />
                                        )}
                                    </div>
                                    {!socialInImage && showSocials && (
                                        <>
                                            {showSSeparator && (
                                                <hr className="social_separator" />
                                            )}
                                            <SocialLinksDeprecated2
                                                socialDetails={profilesOnly}
                                                icnEffect={icnEffect}
                                            />
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
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
                name,
                jobTitle,
                description,
                showDescs,
                showSocials,
                showCSeparator,
                showSSeparator,
                imageUrl,
                profilesOnly,
                socialInImage,
                icnEffect,
                classHook,
            } = attributes;

            return (
                <div {...useBlockProps.save()}>
                    <div
                        className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`}
                    >
                        <div className={`${blockId} eb-team-wrapper`}>
                            <div className="eb-team-inner">
                                <div className="image">
                                    <img
                                        className="avatar"
                                        src={imageUrl}
                                        alt="member"
                                    />
                                    {socialInImage && showSocials && (
                                        <SocialLinks
                                            socialDetails={profilesOnly}
                                            icnEffect={icnEffect}
                                        />
                                    )}
                                </div>
                                <div className="contents">
                                    <div className="texts">
                                        <RichText.Content
                                            tagName="h3"
                                            className="name"
                                            value={name}
                                        />
                                        <RichText.Content
                                            tagName="h4"
                                            className="job_title"
                                            value={jobTitle}
                                        />

                                        {showCSeparator && (
                                            <hr className="content_separator" />
                                        )}

                                        {showDescs && (
                                            <RichText.Content
                                                tagName="p"
                                                className="description"
                                                value={description}
                                            />
                                        )}
                                    </div>
                                    {!socialInImage && showSocials && (
                                        <>
                                            {showSSeparator && (
                                                <hr className="social_separator" />
                                            )}
                                            <SocialLinksDeprecated1
                                                socialDetails={profilesOnly}
                                                icnEffect={icnEffect}
                                            />
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
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
                name,
                jobTitle,
                description,
                showDescs,
                showSocials,
                showCSeparator,
                showSSeparator,
                imageUrl,
                profilesOnly,
                socialInImage,
                icnEffect,
            } = attributes;

            return (
                <div {...useBlockProps.save()}>
                    <div className={`${blockId} eb-team-wrapper`}>
                        <div className="eb-team-inner">
                            <div className="image">
                                <img
                                    className="avatar"
                                    src={imageUrl}
                                    alt="member"
                                />
                                {socialInImage && showSocials && (
                                    <SocialLinks
                                        socialDetails={profilesOnly}
                                        icnEffect={icnEffect}
                                    />
                                )}
                            </div>
                            <div className="contents">
                                <div className="texts">
                                    <RichText.Content
                                        tagName="h3"
                                        className="name"
                                        value={name}
                                    />
                                    <RichText.Content
                                        tagName="h4"
                                        className="job_title"
                                        value={jobTitle}
                                    />

                                    {showCSeparator && (
                                        <hr className="content_separator" />
                                    )}

                                    {showDescs && (
                                        <RichText.Content
                                            tagName="p"
                                            className="description"
                                            value={description}
                                        />
                                    )}
                                </div>
                                {!socialInImage && showSocials && (
                                    <>
                                        {showSSeparator && (
                                            <hr className="social_separator" />
                                        )}
                                        <SocialLinks
                                            socialDetails={profilesOnly}
                                            icnEffect={icnEffect}
                                        />
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            );
        },
    },
];

export default deprecated;
