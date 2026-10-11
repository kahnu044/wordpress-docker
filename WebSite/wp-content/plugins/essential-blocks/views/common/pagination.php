<?php
/**
 * Load-more / pagination markup for the post grid and product grid views.
 * Built by Helper::pagination_markup(), which the pagination AJAX handler uses too.
 *
 * $totalPosts is the server-side found_posts count here. Views pass $max_pages to cap the page
 * buttons at the pages their endpoint serves (0 = no cap).
 */
echo wp_kses(
    $helper::pagination_markup(
        isset( $totalPosts ) ? $totalPosts : null,
        isset( $per_page ) ? $per_page : 0,
        [
            'enableMorePosts'   => isset( $enableMorePosts ) ? $enableMorePosts : false,
            'loadMoreType'      => isset( $loadMoreType ) ? $loadMoreType : null,
            'loadMoreButtonTxt' => isset( $loadMoreButtonTxt ) ? $loadMoreButtonTxt : '',
            'prevTxt'           => isset( $prevTxt ) ? $prevTxt : null,
            'nextTxt'           => isset( $nextTxt ) ? $nextTxt : null,
            'parent_class'      => isset( $parent_class ) ? $parent_class : '',
            'max_pages'         => isset( $max_pages ) ? $max_pages : 0,
            'wrap'              => true
        ]
    ),
    'post'
);
