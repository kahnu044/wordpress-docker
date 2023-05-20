<?php

$thumbnailHTML = '';

if ( $showThumbnail ) {
    $thumbnail = get_the_post_thumbnail($result->ID, $thumbnailSize);
    if (!empty($thumbnail)) {
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
        $thumbnailHTML .= '<div class="ebpg-entry-media">
            <div class="ebpg-entry-thumbnail">
                <img src="https://via.placeholder.com/250x250.png" alt="No Thumbnail Found">
            </div>
        </div>';
    }
}

return $thumbnailHTML;
