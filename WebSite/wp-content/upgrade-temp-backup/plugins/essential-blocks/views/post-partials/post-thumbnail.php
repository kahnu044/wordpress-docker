<?php

$thumbnailHTML = '';

if ( $showThumbnail ) {
    $thumbnailSize = ! empty( $thumbnailSize ) ? $thumbnailSize : 'full';
    $thumbnail     = wp_get_attachment_image( get_post_thumbnail_id( $result->ID ), $thumbnailSize );
    if ( ! empty( $thumbnail ) ) {
        $thumbnailHTML .= sprintf(
            '<div class="ebpg-entry-media">
                <div class="ebpg-entry-thumbnail">
                    %1$s
                    %2$s
                </div>
            </div>',
            $wrapper_link_html,
            $thumbnail
        );
    } else {
        if ( $showFallbackImg && ! empty( $fallbackImgUrl ) ) {
            $thumbnailHTML .= '<div class="ebpg-entry-media">
                <div class="ebpg-entry-thumbnail">
                    <img src="' . $fallbackImgUrl . '" alt="' . ( ! empty( $fallbackImgAlt ) ? $fallbackImgAlt : 'No Thumbnail Found' ) . '">
                </div>
            </div>';
        } else {
            $thumbnailHTML .= '<div class="ebpg-entry-media">
            <div class="ebpg-entry-thumbnail">
                <img src="' . ESSENTIAL_BLOCKS_PLACEHOLDER_IMAGE . '" alt="No Thumbnail Found">
            </div>
        </div>';
        }
    }
}

return $thumbnailHTML;
