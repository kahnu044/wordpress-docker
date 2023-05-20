<?php

$contentHTML = '';

$contentHTML .= $showContent || $showReadMore ? '<div class="ebpg-entry-content">' : '';

if ($showContent) {
    $_content = !empty($result->post_excerpt) ? $result->post_excerpt : $result->post_content;
    $content  = $block_object->truncate(wp_kses_post(strip_tags($_content)), $contentLength);

    $post_classes = $block_object->get_name() == 'post-grid' ? 'ebpg-grid-post-excerpt' : 'ebpg-carousel-post-excerpt';

    $contentHTML .= sprintf(
        '<div class="%3$s">
            <p>%1$s%2$s</p>
        </div>',
        $content,
        $expansionIndicator,
        $post_classes
    );
}

$contentHTML .= require __DIR__ . '/read-more.php';

$contentHTML .= $showContent || $showReadMore ? '</div>' : '';

return $contentHTML;
