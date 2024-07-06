/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useEffect } from "@wordpress/element";
import { useBlockProps } from "@wordpress/block-editor";
import { select } from "@wordpress/data";

/**
 * Internal dependencies
 */

import SocialLinks from "./components/social-links";

const {
    duplicateBlockIdFix,
    BlockProps
} = window.EBControls;

import classnames from "classnames";
import Inspector from "./inspector";
import Style from "./style";

export default function Edit(props) {
    const {
        attributes,
        setAttributes,
        className,
        clientId,
        isSelected,
        name
    } = props;
    const {
        resOption,
        blockId,
        blockMeta,
        socialDetails,
        profilesOnly = [],
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
                icon: "fab fa-facebook-f",
                link: "#",
                linkOpenNewTab: false,
                isExpanded: false,
            },
            {
                icon: "fab fa-x-twitter",
                link: "#",
                linkOpenNewTab: false,
                isExpanded: false,
            },
            {
                icon: "fab fa-instagram",
                link: "#",
                linkOpenNewTab: false,
                isExpanded: false,
            },
            {
                icon: "fab fa-youtube",
                link: "#",
                linkOpenNewTab: false,
                isExpanded: false,
            },
            {
                icon: "fab fa-linkedin-in",
                link: "#",
                linkOpenNewTab: false,
                isExpanded: false,
            },
        ];

        setAttributes({ socialDetails: newSclDtails });
    }, []);

    //
    useEffect(() => {
        const profilesOnly = socialDetails.map(
            ({ icon, link, linkOpenNewTab }) => ({
                icon,
                link,
                linkOpenNewTab,
            })
        );

        setAttributes({ profilesOnly });
    }, [socialDetails]);

    // you must declare this variable
    const enhancedProps = {
        ...props,
        blockPrefix: 'eb-social-links',
        style: <Style {...props} />
    };

    return (
        <>
            {isSelected && (
                <Inspector
                    attributes={attributes}
                    setAttributes={setAttributes}
                />
            )}
            <BlockProps.Edit {...enhancedProps}>
                <div
                    className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`}
                >
                    <div className={`${blockId} eb-social-links-wrapper`}>
                        <SocialLinks
                            profilesOnly={profilesOnly}
                            icnEffect={icnEffect}
                        />
                    </div>
                </div>
            </BlockProps.Edit>
        </>
    );
}
