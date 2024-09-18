/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useEffect, memo } from "@wordpress/element";
/**
 * Internal dependencies
 */

import {
    BlockProps,
    BrowseTemplate,
    DynamicInputValueHandler,
    ImgPlaceholder,
    withBlockContext
} from "@essential-blocks/controls";

import Inspector from "./inspector";
import SocialLinks from "./components/social-links";
import Style from "./style";
import { ReactComponent as Icon } from "./icon.svg";
import { Templates } from './templates/templates';
import defaultAttributes from './attributes';

function Edit(props) {
    const {
        attributes,
        setAttributes,
        isSelected,
    } = props;

    const {
        resOption,
        blockId,
        blockMeta,
        name,
        jobTitle,
        description,
        showDescs,
        imageUrl,
        imageNewClassUrl,
        imageNewUrl,
        imageId,
        showSocials,
        socialDetails,
        socialInImage,
        showCSeparator,
        showSSeparator,
        icnEffect,
        classHook,
        hoverPreset,
        showDesignation,
        isContentOverlay,
        preset,
        showBlockContent
    } = attributes;

    //
    // useEffect(() => {
    //     if (socialDetails.length === 0) {
    //         const newSclDtails = [
    //             {
    //                 title: "Facebook",
    //                 icon: "fab fa-facebook-f",
    //                 color: "#fff",
    //                 bgColor: "#A0A8BD",
    //                 link: "",
    //                 linkOpenNewTab: false,
    //                 isExpanded: false,
    //             },
    //             {
    //                 title: "Twitter",
    //                 icon: "fab fa-x-twitter",
    //                 color: "#fff",
    //                 bgColor: "#A0A8BD",
    //                 link: "",
    //                 linkOpenNewTab: false,
    //                 isExpanded: false,
    //             },
    //             {
    //                 title: "LinkedIn",
    //                 icon: "fab fa-linkedin-in",
    //                 color: "#fff",
    //                 bgColor: "#A0A8BD",
    //                 link: "",
    //                 linkOpenNewTab: false,
    //                 isExpanded: false,
    //             },
    //             {
    //                 title: "YouTube",
    //                 icon: "fab fa-youtube",
    //                 color: "#fff",
    //                 bgColor: "#A0A8BD",
    //                 link: "",
    //                 linkOpenNewTab: false,
    //                 isExpanded: false,
    //             },
    //         ];

    //         setAttributes({ socialDetails: newSclDtails });
    //     }
    //     else {
    //         const newProfiles = socialDetails.map((profile) => ({
    //             ...profile,
    //             isExpanded: false,
    //         }));
    //         setAttributes({ socialDetails: newProfiles });
    //     }

    //     //Hanlde Deprecation for ImageURL
    //     const imageUrlFromSource = imageUrl || imageNewClassUrl || ImgPlaceholder
    //     if (!imageNewUrl) {
    //         setAttributes({ imageNewUrl: imageUrlFromSource })
    //     }
    // }, []);

    // you must declare this variable
    const enhancedProps = {
        ...props,
        blockPrefix: 'eb-team-member',
        style: <Style {...props} />
    };

    return (
        <>
            {isSelected && showBlockContent && (
                <Inspector
                    attributes={attributes}
                    setAttributes={setAttributes}
                />
            )}
            <BlockProps.Edit {...enhancedProps}>

                <BrowseTemplate
                    {...props}
                    Icon={Icon}
                    title={"Team Members"}
                    description={"Choose a template for the Team Members or start blank."}
                    patterns={Templates}
                />

                {showBlockContent && (
                    <>
                        <div
                            className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`}
                        >
                            <div className={`${blockId} eb-team-wrapper ${preset} ${preset === 'new-preset3' ? hoverPreset : ''} ${preset === 'preset3' && isContentOverlay ? 'content-overlay' : ''}  `}>
                                <div className="eb-team-inner">
                                    <div className="eb-team-member-image">
                                        <img
                                            className="eb-team-member-avatar"
                                            alt="member"
                                            src={imageNewUrl === '' ? ImgPlaceholder : imageNewUrl}
                                        />

                                        {socialInImage && showSocials && (
                                            <SocialLinks
                                                socialDetails={socialDetails}
                                                icnEffect={icnEffect}
                                                preset={preset}
                                            />
                                        )}

                                        {preset === 'new-preset1' && showDesignation && (
                                            <DynamicInputValueHandler
                                                value={jobTitle}
                                                tagName="h4"
                                                className="eb-team-member-job-title"
                                                onChange={(jobTitle) =>
                                                    setAttributes({
                                                        jobTitle,
                                                    })
                                                }
                                                readOnly={true}
                                            />
                                        )}
                                    </div>
                                    <div className="eb-team-member-contents">
                                        {(preset === 'new-preset1' || preset === 'new-preset2' || preset === 'new-preset3') && (
                                            <div className="eb-team-member-contents-inner">
                                                <div className="eb-team-member-texts">
                                                    <DynamicInputValueHandler
                                                        value={name}
                                                        tagName="h3"
                                                        className="eb-team-member-name"
                                                        onChange={(name) =>
                                                            setAttributes({
                                                                name,
                                                            })
                                                        }
                                                        readOnly={true}
                                                    />
                                                    {preset != 'new-preset1' && showDesignation && (
                                                        <DynamicInputValueHandler
                                                            value={jobTitle}
                                                            tagName="h4"
                                                            className="eb-team-member-job-title"
                                                            onChange={(jobTitle) =>
                                                                setAttributes({
                                                                    jobTitle,
                                                                })
                                                            }
                                                            readOnly={true}
                                                        />
                                                    )}
                                                    {showCSeparator && (
                                                        <hr className="eb-team-member-content-separator" />
                                                    )}
                                                    {showDescs && (
                                                        <DynamicInputValueHandler
                                                            value={description}
                                                            tagName="p"
                                                            className="eb-team-member-description"
                                                            onChange={(description) =>
                                                                setAttributes({
                                                                    description,
                                                                })
                                                            }
                                                            readOnly={true}
                                                        />
                                                    )}
                                                </div>
                                                {!socialInImage && showSocials && (
                                                    <>
                                                        {showSSeparator && (
                                                            <hr className="eb-team-member-social-separator" />
                                                        )}
                                                        <SocialLinks
                                                            socialDetails={socialDetails}
                                                            icnEffect={icnEffect}
                                                            preset={preset}
                                                        />
                                                    </>
                                                )}
                                            </div>
                                        )}

                                        {(preset != 'new-preset1' && preset != 'new-preset2' && preset != 'new-preset3') && (
                                            <>
                                                <div className="eb-team-member-texts">
                                                    <DynamicInputValueHandler
                                                        value={name}
                                                        tagName="h3"
                                                        className="eb-team-member-name"
                                                        onChange={(name) =>
                                                            setAttributes({
                                                                name,
                                                            })
                                                        }
                                                        readOnly={true}
                                                    />
                                                    {preset != 'new-preset1' && showDesignation && (
                                                        <DynamicInputValueHandler
                                                            value={jobTitle}
                                                            tagName="h4"
                                                            className="eb-team-member-job-title"
                                                            onChange={(jobTitle) =>
                                                                setAttributes({
                                                                    jobTitle,
                                                                })
                                                            }
                                                            readOnly={true}
                                                        />
                                                    )}

                                                    {showCSeparator && (
                                                        <hr className="eb-team-member-content-separator" />
                                                    )}

                                                    {showDescs && (
                                                        <DynamicInputValueHandler
                                                            value={description}
                                                            tagName="p"
                                                            className="eb-team-member-description"
                                                            onChange={(description) =>
                                                                setAttributes({
                                                                    description,
                                                                })
                                                            }
                                                            readOnly={true}
                                                        />
                                                    )}
                                                </div>
                                                {!socialInImage && showSocials && (
                                                    <>
                                                        {showSSeparator && (
                                                            <hr className="eb-team-member-social-separator" />
                                                        )}
                                                        <SocialLinks
                                                            socialDetails={socialDetails}
                                                            icnEffect={icnEffect}
                                                            preset={preset}
                                                        />
                                                    </>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </BlockProps.Edit>
        </>
    );
}
export default memo(withBlockContext(defaultAttributes)(Edit))
