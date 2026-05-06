<?php

$headerMetaHtml = '';

// Ensure $is_featured is defined (may not be set in carousel or other contexts)
$is_featured = isset( $is_featured ) ? $is_featured : false;

// Determine if meta should be shown based on whether this is a featured post or regular post
$show_header = false;
if ( $is_featured ) {
	$_showFeaturedPostMeta = isset( $showFeaturedPostMeta ) ? $showFeaturedPostMeta : true;
	$_showFeaturedHeaderMeta = isset( $showFeaturedHeaderMeta ) ? $showFeaturedHeaderMeta : true;
	if ( $_showFeaturedPostMeta && $_showFeaturedHeaderMeta ) {
		$show_header = true;
	}
} else {
	if ( isset( $showMeta ) && $showMeta ) {
		$show_header = true;
	}
}

if ( $show_header ) {
	// Parse featuredMetaItems for filtering individual meta items in featured post
	$featured_meta_items_obj = [];
	if ( $is_featured && isset( $featuredMetaItems ) && ! empty( $featuredMetaItems ) ) {
		$featured_meta_items_obj = json_decode( $featuredMetaItems, true );
		if ( ! is_array( $featured_meta_items_obj ) ) {
			$featured_meta_items_obj = [];
		}
	}

	// Filter header meta items based on featuredMetaItems toggle states
	$filtered_header_meta = $headerMeta;
	if ( $is_featured && ! empty( $featured_meta_items_obj ) ) {
		$filtered_header_meta = array_filter( $headerMeta, function ( $meta ) use ( $featured_meta_items_obj ) {
			return isset( $featured_meta_items_obj[ $meta ] ) ? $featured_meta_items_obj[ $meta ] : true;
		} );
	}

	if ( in_array( 'avatar', $filtered_header_meta ) ) {
		$headerMetaHtml .= $_meta_html['avatar'];
	}

	$headerMetaHtml .= '<div class="ebpg-entry-meta-items">';
	foreach ( $filtered_header_meta as $meta ) {
		if ( $meta === 'avatar' ) {
			continue;
		}

		if ( is_array( $_meta_html ) && array_key_exists( $meta, $_meta_html ) ) {
			$headerMetaHtml .= $_meta_html[ $meta ];
		}
	}
	$headerMetaHtml .= '</div>';
}

if ( ! empty( $headerMetaHtml ) ) {
	$headerMetaHtml = sprintf(
		'<div class="ebpg-entry-meta ebpg-header-meta">%1$s</div>',
		$headerMetaHtml
	);
}

return $headerMetaHtml;