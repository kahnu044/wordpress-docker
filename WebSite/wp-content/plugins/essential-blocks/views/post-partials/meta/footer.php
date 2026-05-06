<?php

$footerMetaHtml = '';

// Ensure $is_featured is defined (may not be set in carousel or other contexts)
$is_featured = isset( $is_featured ) ? $is_featured : false;

// Determine if meta should be shown based on whether this is a featured post or regular post
$show_footer = false;
if ( $is_featured ) {
	$_showFeaturedPostMeta = isset( $showFeaturedPostMeta ) ? $showFeaturedPostMeta : true;
	$_showFeaturedFooterMeta = isset( $showFeaturedFooterMeta ) ? $showFeaturedFooterMeta : true;
	if ( $_showFeaturedPostMeta && $_showFeaturedFooterMeta ) {
		$show_footer = true;
	}
} else {
	if ( isset( $showMeta ) && $showMeta ) {
		$show_footer = true;
	}
}

if ( $show_footer ) {
	// Parse featuredMetaItems for filtering individual meta items in featured post
	$featured_meta_items_obj = [];
	if ( $is_featured && isset( $featuredMetaItems ) && ! empty( $featuredMetaItems ) ) {
		$featured_meta_items_obj = json_decode( $featuredMetaItems, true );
		if ( ! is_array( $featured_meta_items_obj ) ) {
			$featured_meta_items_obj = [];
		}
	}

	// Filter footer meta items based on featuredMetaItems toggle states
	$filtered_footer_meta = $footerMeta;
	if ( $is_featured && ! empty( $featured_meta_items_obj ) ) {
		$filtered_footer_meta = array_filter( $footerMeta, function ( $meta ) use ( $featured_meta_items_obj ) {
			return isset( $featured_meta_items_obj[ $meta ] ) ? $featured_meta_items_obj[ $meta ] : true;
		} );
	}

	if ( in_array( 'avatar', $filtered_footer_meta ) ) {
		$footerMetaHtml .= $_meta_html['avatar'];
	}
	$footerMetaHtml .= '<div class="ebpg-entry-meta-items">';
	foreach ( $filtered_footer_meta as $meta ) {
		if ( $meta === 'avatar' ) {
			continue;
		}

		if ( is_array( $_meta_html ) && array_key_exists( $meta, $_meta_html ) ) {
			$footerMetaHtml .= $_meta_html[ $meta ];
		}
	}
	$footerMetaHtml .= '</div>';
}

if ( ! empty( $footerMetaHtml ) ) {
	$footerMetaHtml = sprintf(
		'<div class="ebpg-entry-meta ebpg-footer-meta">%1$s</div>',
		$footerMetaHtml
	);
}

return $footerMetaHtml;
