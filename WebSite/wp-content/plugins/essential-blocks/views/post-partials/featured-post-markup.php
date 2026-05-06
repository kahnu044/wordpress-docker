<?php

$headerMeta = ! is_array( $headerMeta ) ? (array) $headerMeta : $headerMeta;
$footerMeta = ! is_array( $footerMeta ) ? (array) $footerMeta : $footerMeta;

$headerMeta = array_map(
    function ( $item ) {
        return isset( $item->value ) ? $item->value : '';
    },
    $headerMeta
);

$footerMeta = array_map(
    function ( $item ) {
        return isset( $item->value ) ? $item->value : '';
    },
    $footerMeta
);

$thumbnailSize = ! empty( $thumbnailSize ) ? $thumbnailSize : 'full';

$thumbnail_inside_content_wpr = false;
if ( $enableThumbnailSort && in_array( $preset, [ 'style-1', 'style-2', 'style-3' ] ) ) {
    $thumbnail_inside_content_wpr = true;
}

/**
 * @var string $source
 */
$taxonomies = get_object_taxonomies( $source );

$allMeta  = array_merge( $headerMeta, $footerMeta );
$tax_meta = array_intersect( $allMeta, $taxonomies );
$html     = '';

// Check if this is a featured post rendering
$is_featured = isset( $_is_featured ) && $_is_featured === true;

// Override variables with featured post specific settings if this is a featured post
if ( $is_featured ) {
    $showTitle      = isset( $showFeaturedPostTitle ) ? $showFeaturedPostTitle : true;
    $showContent    = isset( $showFeaturedPostContent ) ? $showFeaturedPostContent : false;
    $showMeta       = isset( $showFeaturedPostMeta ) ? $showFeaturedPostMeta : true;
    $contentLength  = isset( $featuredExcerptLength ) ? $featuredExcerptLength : 10;
}

foreach ( $posts as $result ) {
    $tax_meta_html = require __DIR__ . '/meta/tax.php';
    $author        = require __DIR__ . '/meta/author.php';
    $avatar        = require __DIR__ . '/meta/avatar.php';
    $date          = require __DIR__ . '/meta/date.php';
    $categories    = require __DIR__ . '/meta/categories.php';
    $tags          = require __DIR__ . '/meta/tags.php';
    $readtime      = require __DIR__ . '/meta/readtime.php';

    $_meta_html = apply_filters(
        'eb_post_grid_meta_markup',
        array_merge(
            $tax_meta_html,
            [
                'avatar'     => $avatar,
                'author'     => $author,
                'date'       => $date,
                'categories' => $categories,
                'tags'       => $tags,
                'readtime'   => $readtime,
             ]
        ),
        $result->ID,
        $allMeta
    );

    /**
     * Article Markup
     */
    $article_classes = 'ebpg-grid-post ebpg-post-grid-column';
    if ( $is_featured ) {
        $article_classes = 'ebpg-featured-post';
    }
    $html .= sprintf( '<article class="%1$s" data-id="%2$s">', esc_attr( $article_classes ), $result->ID );
    $html .= '<div class="ebpg-grid-post-holder">';
    $wrapper_link_html = sprintf( '<a class="ebpg-post-link-wrapper eb-sr-only" href="%1$s">%2$s</a>', get_permalink( $result->ID ), wp_kses( $result->post_title, 'post' ) );
    if ( ! $thumbnail_inside_content_wpr ) {
        $html .= require __DIR__ . '/post-thumbnail.php';
    }
    $html .= '<div class="ebpg-entry-wrapper">';
    if ( $thumbnail_inside_content_wpr ) {
        $html .= require __DIR__ . '/post-thumbnail.php';
    }
    $html .= '<div class="featured-post-content-wrapper">';
    if ( $showMeta  ) {
    $html .= require __DIR__ . '/meta/header.php';
    }
    if ( $showTitle ) {
    $html .= require __DIR__ . '/title.php';
    }
    if ( $showContent ) {
    $html .= require __DIR__ . '/post-content.php';
    }
    $html .= '</div>'; // End of class "featured-post-content-wrapper"
    $html .= '</div>'; // End of class "ebpg-entry-wrapper"
    $html .= '</div>'; // End of class "ebpg-grid-post-holder"
    $html .= '</article>';
}

echo wp_kses( $html, 'post' );
