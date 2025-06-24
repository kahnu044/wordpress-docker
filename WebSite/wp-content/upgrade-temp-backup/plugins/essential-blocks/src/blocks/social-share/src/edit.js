/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useEffect, memo } from "@wordpress/element";
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
        isSelected,
    } = props;
    const {
        resOption,
        blockId,
        blockMeta,
        socialDetails,
        profilesOnly = [],
        icnEffect,
        classHook,
        showTitle,
        iconShape,
        isFloating,
        cover
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
                iconText: __("Facebook", "essential-blocks"),
                isExpanded: false,
            },
            {
                icon: "fab fa-x-twitter",
                iconText: __("Twitter", "essential-blocks"),
                isExpanded: false,
            },
            {
                icon: "fab fa-linkedin-in",
                iconText: __("Linkedin", "essential-blocks"),
                isExpanded: false,
            },
            {
                icon: "fab fa-whatsapp",
                iconText: __("WhatsApp", "essential-blocks"),
                isExpanded: false,
            },
        ];

        setAttributes({ socialDetails: newSclDtails });
    }, []);

    //
    useEffect(() => {
        const profilesOnly = socialDetails.map(({ icon, link, iconText }) => ({
            icon,
            link,
            iconText,
        }));

        setAttributes({ profilesOnly });
    }, [socialDetails]);

    // you must declare this variable
    const enhancedProps = {
        ...props,
        blockPrefix: 'eb-social-share',
        style: <Style {...props} />
    };

    return cover.length ? (
        <div>
            <img src={cover} alt={__("Social Share", "essential-blocks")} style={{ maxWidth: "100%" }} />
        </div>
    ) : (
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
                    <div
                        className={`${blockId} eb-social-share-wrapper${isFloating ? " eb-social-share-floating" : ""
                            }${isFloating && "circular" == iconShape
                                ? " eb-social-share-circular"
                                : ""
                            }`}
                    >
                        <SocialLinks
                            profilesOnly={profilesOnly}
                            icnEffect={icnEffect}
                            showTitle={showTitle}
                        />
                    </div>
                </div>
            </BlockProps.Edit>
        </>
    );
}
export default memo(withBlockContext(defaultAttributes)(Edit))
