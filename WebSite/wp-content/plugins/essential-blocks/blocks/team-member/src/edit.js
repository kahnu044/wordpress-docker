/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useEffect } from "@wordpress/element";
import { useBlockProps, MediaUpload, RichText } from "@wordpress/block-editor";
import { Button } from "@wordpress/components";
import { select } from "@wordpress/data";
/**
 * Internal dependencies
 */

const {
    //
    softMinifyCssStrings,
    generateBackgroundControlStyles,
    generateDimensionsControlStyles,
    generateTypographyStyles,
    generateBorderShadowStyles,
    generateResponsiveRangeStyles,
    // mimmikCssForPreviewBtnClick,
    duplicateBlockIdFix,
} = window.EBControls;

import classnames from "classnames";

import Inspector from "./inspector";
import SocialLinks from "./components/social-links";
import Style from "./style";

export default function Edit(props) {
    const {
        attributes,
        setAttributes,
        className,
        clientId,
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
        imageId,
        isImgHeightAuto,
        descsColor = "#9f9f9f",
        jobColor = "#4b4b4b",
        nameColor = "#4b4b4b",
        showSocials,
        socialDetails,
        profilesOnly,
        iconsJustify,
        iconsVAlign,
        contentsAlign,
        imageAlign,
        cSepAlign,
        sSepAlign,
        preset,
        socialInImage,
        imgBeforeEl,
        showCSeparator,
        showSSeparator,
        cSepType = "solid",
        sSepType = "solid",
        cSepColor = "#84AFFF",
        sSepColor = "#CACACA",
        isIconsDevider,
        icnsDevideColor = "#cacaca",
        icnSepW = 1,
        icnSepH = 30,
        hvIcnColor,
        hvIcnBgc,
        conVtAlign,
        isConBgGradient,
        conBgGradient,
        conBgColor = "rgba(0,0,0,.4)",
        imgCnVtAlign,
        isP9reverse,
        icnEffect,
        classHook,
    } = attributes;

    //
    useEffect(() => {
        const newProfiles = socialDetails.map((profile) => ({
            ...profile,
            isExpanded: false,
        }));

        setAttributes({ socialDetails: newProfiles });

        if (socialDetails.length > 0) return;

        const newSclDtails = [
            {
                title: "",
                icon: "fab fa-facebook-f",
                color: "#fff",
                bgColor: "#3b5998",
                link: "",
                linkOpenNewTab: false,
                isExpanded: false,
            },
            {
                title: "",
                icon: "fab fa-twitter",
                color: "#fff",
                bgColor: "#1da1f2",
                link: "",
                linkOpenNewTab: false,
                isExpanded: false,
            },
            {
                title: "",
                icon: "fab fa-linkedin-in",
                color: "#fff",
                bgColor: "#0077b5",
                link: "",
                linkOpenNewTab: false,
                isExpanded: false,
            },
            {
                title: "",
                icon: "fab fa-youtube",
                color: "#fff",
                bgColor: "#cd201f",
                link: "",
                linkOpenNewTab: false,
                isExpanded: false,
            },
        ];

        setAttributes({ socialDetails: newSclDtails });
    }, []);

    //
    useEffect(() => {
        const profilesOnly = socialDetails.map(
            ({ title, icon, link, linkOpenNewTab }) => ({
                title,
                icon,
                link,
                linkOpenNewTab,
            })
        );

        setAttributes({ profilesOnly });
    }, [socialDetails]);

    useEffect(() => {
        // this codes is for creating a unique blockId for each block's unique className
        const BLOCK_PREFIX = "eb-team-member";
        duplicateBlockIdFix({
            BLOCK_PREFIX,
            blockId,
            setAttributes,
            select,
            clientId,
        });

        //
        if (/essential\-blocks.assets\/images\/user\.jpg/gi.test(imageUrl || " ")
        ) {
            setAttributes({
                imageUrl: `${EssentialBlocksLocalize.eb_plugins_url}assets/images/user.jpg`,
            });
        }
    }, []);

    const blockProps = useBlockProps({
        className: classnames(className, `eb-guten-block-main-parent-wrapper`),
    });

    return (
        <>
            {isSelected && (
                <Inspector
                    attributes={attributes}
                    setAttributes={setAttributes}
                />
            )}
            <div {...blockProps}>
                <Style {...props} />
                <div
                    className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`}
                >
                    <div className={`${blockId} eb-team-wrapper`}>
                        <div className="eb-team-inner">
                            <div className="image">
                                <MediaUpload
                                    onSelect={({ id, url }) =>
                                        setAttributes({
                                            imageUrl: url,
                                            imageId: id,
                                        })
                                    }
                                    type="image"
                                    value={imageId}
                                    render={({ open }) => {
                                        if (!imageUrl) {
                                            return (
                                                <Button
                                                    className="eb-infobox-img-btn components-button"
                                                    label={__(
                                                        "Upload Image",
                                                        "essential-blocks"
                                                    )}
                                                    icon="format-image"
                                                    onClick={open}
                                                />
                                            );
                                        } else {
                                            return (
                                                <img
                                                    className="avatar"
                                                    alt="member"
                                                    src={imageUrl}
                                                />
                                            );
                                        }
                                    }}
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
                                    <RichText
                                        tagName="h3"
                                        className="name"
                                        value={name}
                                        onChange={(name) =>
                                            setAttributes({ name })
                                        }
                                        placeholder={__(
                                            "Add name here",
                                            "team-member-block"
                                        )}
                                    />
                                    <RichText
                                        tagName="h4"
                                        className="job_title"
                                        value={jobTitle}
                                        onChange={(jobTitle) =>
                                            setAttributes({ jobTitle })
                                        }
                                        placeholder={__(
                                            "Add job title",
                                            "team-member-block"
                                        )}
                                    />
                                    {showCSeparator && (
                                        <hr className="content_separator" />
                                    )}

                                    {showDescs && (
                                        <RichText
                                            tagName="p"
                                            className="description"
                                            value={description}
                                            onChange={(description) =>
                                                setAttributes({ description })
                                            }
                                            placeholder={__(
                                                "Add description",
                                                "team-member-block"
                                            )}
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
            </div>
        </>
    );
}
