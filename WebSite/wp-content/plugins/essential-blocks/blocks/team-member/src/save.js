import { useBlockProps, RichText } from "@wordpress/block-editor";
import SocialLinks from "./components/social-links";

export default function Save({ attributes }) {
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
        showLinkNewTab,
        imageAlt,
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
                                    {...(newWindow && { target: "_blank" })}
                                    rel="noopener"
                                >
                                    <img
                                        className="avatar"
                                        src={imageUrl}
                                        alt={imageAlt ? imageAlt : name}
                                    />
                                </a>
                            )}

                            {!avatarURL && (
                                <img
                                    className="avatar"
                                    src={imageUrl}
                                    alt={imageAlt ? imageAlt : name}
                                />
                            )}

                            {socialInImage && showSocials && (
                                <SocialLinks
                                    socialDetails={profilesOnly}
                                    icnEffect={icnEffect}
                                    linkNewTab={showLinkNewTab}
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
                                    <SocialLinks
                                        socialDetails={profilesOnly}
                                        icnEffect={icnEffect}
                                        linkNewTab={showLinkNewTab}
                                    />
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
