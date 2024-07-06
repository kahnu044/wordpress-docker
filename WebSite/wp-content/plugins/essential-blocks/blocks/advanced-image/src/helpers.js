/**
 * WordPress dependencies
 */
import { __, isRTL } from '@wordpress/i18n';
import {
    MenuItem,
    __experimentalItemGroup as ItemGroup,
    __experimentalHStack as HStack,
    __experimentalTruncate as Truncate,
} from '@wordpress/components';
import {
    MediaReplaceFlow,
    store as blockEditorStore,
    __experimentalImageEditor as ImageEditor,
} from "@wordpress/block-editor";
import { createInterpolateElement, useState, useEffect } from '@wordpress/element';
import { useViewportMatch } from '@wordpress/compose';
import { useSelect, useDispatch } from "@wordpress/data";
import { isBlobURL } from '@wordpress/blob';
import { store as coreStore } from '@wordpress/core-data';

import classnames from "classnames";

import {
    MIN_SIZE
} from "./constants";

export const SiteLogo = ({
    alt,
    attributes: {
        align, shouldSyncIcon, blockId,
        hoverEffect,
        classHook,
        enableLink
    },
    setAttributes,
    setLogo,
    logoUrl,
    siteUrl,
    logoId,
    iconId,
    setIcon,
    canUserEdit,
}) => {
    const clientWidth = 120;
    const isLargeViewport = useViewportMatch('medium');
    const isWideAligned = ['wide', 'full'].includes(align);
    const isResizable = !isWideAligned && isLargeViewport;
    const [{ naturalWidth, naturalHeight }, setNaturalSize] = useState({});
    const { toggleSelection } = useDispatch(blockEditorStore);
    const classes = classnames('custom-logo-link', {
        'is-transient': isBlobURL(logoUrl),
    });

    const { imageEditing, maxWidth, title } = useSelect((select) => {
        const settings = select(blockEditorStore).getSettings();
        const siteEntities = select(coreStore).getEntityRecord(
            'root',
            '__unstableBase'
        );

        return {
            title: siteEntities?.name,
            imageEditing: settings.imageEditing,
            maxWidth: settings.maxWidth,
        };
    }, []);

    useEffect(() => {
        // Turn the `Use as site icon` toggle off if it is on but the logo and icon have
        // fallen out of sync. This can happen if the toggle is saved in the `on` position,
        // but changes are later made to the site icon in the Customizer.
        if (shouldSyncIcon && logoId !== iconId) {
            setAttributes({ shouldSyncIcon: false });
        }
    }, []);

    const img = (
        <img
            className="custom-logo"
            src={logoUrl}
            alt={alt}
            onLoad={(event) => {
                setNaturalSize({
                    naturalWidth: event.target.naturalWidth,
                    naturalHeight: event.target.naturalHeight,
                });
            }}
        />
    );

    let imgWrapper = img;

    // Disable reason: Image itself is not meant to be interactive, but
    // should direct focus to block.
    if (enableLink) {
        imgWrapper = (
            /* eslint-disable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events */
            <a
                href={siteUrl}
                className={classes}
                rel="home"
                title={title}
                onClick={(event) => event.preventDefault()}
            >
                {img}
            </a>
            /* eslint-enable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events */
        );
    }

    let imageWidthWithinContainer;

    if (clientWidth && naturalWidth && naturalHeight) {
        const exceedMaxWidth = naturalWidth > clientWidth;
        imageWidthWithinContainer = exceedMaxWidth ? clientWidth : naturalWidth;
    }

    if (!isResizable || !imageWidthWithinContainer) {
        return <div className='test-wrap'>{imgWrapper}</div>;
    }

    const canEditImage =
        logoId && naturalWidth && naturalHeight && imageEditing;

    const imgEdit =
        <div className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`}>
            <figure
                className={`eb-advanced-image-wrapper ${blockId} ${hoverEffect}`}
                data-id={blockId}
            >
                <div className="image-wrapper">
                    {imgWrapper}
                </div>
            </figure>
        </div>
        ;


    // Support the previous location for the Site Icon settings. To be removed
    // when the required WP core version for Gutenberg is >= 6.5.0.
    const shouldUseNewUrl = !window?.__experimentalUseCustomizerSiteLogoUrl;

    const siteIconSettingsUrl = shouldUseNewUrl
        ? siteUrl + '/wp-admin/options-general.php'
        : siteUrl + '/wp-admin/customize.php?autofocus[section]=title_tagline';


    const syncSiteIconHelpText = createInterpolateElement(
        __(
            'Site Icons are what you see in browser tabs, bookmark bars, and within the WordPress mobile apps. To use a custom icon that is different from your site logo, use the <a>Site Icon settings</a>.'
        ),
        {
            a: (
                // eslint-disable-next-line jsx-a11y/anchor-has-content
                <a
                    href={siteIconSettingsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                />
            ),
        }
    );

    return (
        <>
            {imgEdit}
        </>
    );
};

// This is a light wrapper around MediaReplaceFlow because the block has two
// different MediaReplaceFlows, one for the inspector and one for the toolbar.
export function SiteLogoReplaceFlow({ onRemoveLogo, ...mediaReplaceProps }) {
    return (
        <MediaReplaceFlow
            {...mediaReplaceProps}
            accept="image/*"
            allowedTypes={["image"]}
        >
            <MenuItem onClick={onRemoveLogo}>{__('Reset')}</MenuItem>
        </MediaReplaceFlow>
    );
}

export function getMediaSourceUrlBySizeSlug(media, slug) {
    return (
        media?.media_details?.sizes?.[slug]?.source_url || media?.source_url
    );
}

export const disabledClickProps = {
    onClick: (event) => event.preventDefault(),
    'aria-disabled': true,
};

export function ebLoader() {
    return <div className="eb-loading" >
        <img src={`${EssentialBlocksLocalize?.image_url}/ajax-loader.gif`} alt="Loading..." />
    </div >
}
