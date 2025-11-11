/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { memo } from "@wordpress/element";
/**
 * Internal dependencies
 */
import {
    BlockProps,
    withBlockContext
} from "@essential-blocks/controls";

import InfoboxContainer from "./components/infobox-edit";
import Inspector from "./inspector";
import Style from "./style";
import defaultAttributes from './attributes';
import { useEffect } from "react";

function Edit(props) {
    const {
        attributes,
        setAttributes,
        isSelected,
    } = props;

    const {
        enableTitle,
        showMedia,
        iconView,
        iconShape,
        layoutPreset,
        flexDirection,
        contentAlignment,
        mediaAlignSelf,
        contentsAlignment,
        mediaAlignment,
        btnAlign,
        version,
        imageUrl,
        imageUrlOld,
        imageAlt,
        imageAltOld
    } = attributes;

    // Handle imageUrlOld fallback logic
    const finalImageUrl = imageUrlOld || imageUrl;
    const finalImageAlt = imageAltOld || imageAlt;

    // Create updated attributes object with fallback values
    const updatedAttributes = {
        ...attributes,
        imageUrl: finalImageUrl,
        imageAlt: finalImageAlt,
    };

    // you must declare this variable
    const enhancedProps = {
        ...props,
        blockPrefix: 'eb-infobox',
        style: <Style {...props} />
    };

    useEffect(() => {
        if (enableTitle === undefined) {
            setAttributes({ enableTitle: true });
        }
        if (showMedia === undefined) {
            setAttributes({ showMedia: true });
        }
        if (iconView === undefined) {
            setAttributes({ iconView: 'default' });
        }
        if (iconShape === undefined) {
            setAttributes({ iconShape: 'circle' });
        }
        if (flexDirection === undefined) {
            setAttributes({ flexDirection: 'column' });
        }
        if (contentAlignment === undefined) {
            setAttributes({ contentAlignment: 'center' });
        }
        if (mediaAlignSelf === undefined) {
            setAttributes({ mediaAlignSelf: 'center' });
        }
        if (contentsAlignment === undefined) {
            setAttributes({ contentsAlignment: 'center' });
        }
        if (mediaAlignment === undefined) {
            setAttributes({ mediaAlignment: 'center' });
        }
        if (btnAlign === undefined) {
            setAttributes({ btnAlign: 'center' });
        }

        if (!version || version == "1") {
            setAttributes({ version: "2" });
        }

        // Handle imageUrlOld migration
        if (imageUrlOld && (!imageUrl || imageUrl === '')) {
            setAttributes({ imageUrl: imageUrlOld });
        }

    }, [])

    return (
        <>
            {isSelected && (
                <Inspector
                    attributes={updatedAttributes}
                    setAttributes={setAttributes}
                />
            )}
            <BlockProps.Edit {...enhancedProps}>
                <InfoboxContainer
                    setAttributes={setAttributes}
                    attributes={updatedAttributes}
                />
            </BlockProps.Edit>
        </>
    );
}
export default memo(withBlockContext(defaultAttributes)(Edit))

