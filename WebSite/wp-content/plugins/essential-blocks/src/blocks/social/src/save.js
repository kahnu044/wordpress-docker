import {
BlockProps
} from "@essential-blocks/controls";
import SocialLinks from "./components/social-links";

export default function Save({ attributes }) {
    const {
        blockId,
        profilesOnly = [],
        icnEffect,
        classHook,
    } = attributes;

    return (
        <BlockProps.Save attributes={attributes}>
            <div className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`}>
                <div className={`${blockId} eb-social-links-wrapper`}>
                    <SocialLinks profilesOnly={profilesOnly} icnEffect={icnEffect} />
                </div>
            </div>
        </BlockProps.Save>
    );
}
