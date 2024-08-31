/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useEffect, memo, useCallback } from "@wordpress/element";

/**
 * Internal dependencies
 */

import SocialLinks from "./components/social-links";

import {
    BlockProps,
    withBlockContext
} from "@essential-blocks/controls";

import Inspector from "./inspector";
import Style from "./style";
import defaultAttributes from './attributes';

function Edit(props) {
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

    //Run onMount Function inside BlockProps.Edit component useEffect
    enhancedProps.onMount = () => {
        if (socialDetails.length === 0) {
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

            setAttributes({ socialDetails: [...newSclDtails] });
        }
        else {
            const newProfiles = socialDetails.map((profile) => ({
                ...profile,
                isExpanded: false,
            }));

            setAttributes({ socialDetails: newProfiles });
        }
    }

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
export default memo(withBlockContext(defaultAttributes)(Edit))
