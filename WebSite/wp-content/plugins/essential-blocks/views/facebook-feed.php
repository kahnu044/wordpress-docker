<?php
/**
 * Facebook Feed — wrapper template.
 *
 * Variables provided by FacebookFeed::render_callback() via Helper::views():
 *   $blockId, $classHook, $align, $layout (grid|list), $numberOfPosts,
 *   $posts (array of Graph response objects),
 *   $showProfileImage, $showPageName, $showTimestamp, $showMessage, $messageLimit,
 *   $showReactions, $showComments, $showShares, $enableLink, $openInNewTab,
 *   $paginationType, $postsPerPage, $loadMoreText, $helper (Helper::class).
 */

$_parent_wrapper_classes = array(
	'eb-parent-' . $blockId,
	$classHook,
);

$_wrapper_classes = array(
	$blockId,
	! empty( $align ) ? 'align' . $align : '',
);

$supported_layouts = apply_filters(
	'essential_blocks/facebook_feed/supported_layouts',
	array( 'grid', 'list', 'masonry' )
);
$_layout_slug = in_array( $layout, $supported_layouts, true ) ? $layout : 'grid';
$_inner_class = 'eb-fb-feed--' . $_layout_slug;

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'class' => 'root-' . $blockId,
	)
);

$target = $enableLink && $openInNewTab ? '_blank' : '';

// 6.1.1: the legacy client-side "loadmore" reveal mode was removed in favour
// of the server-backed AJAX flavour. Coerce legacy attribute values so old
// saved posts keep paginating without an editor re-save.
if ( $paginationType === 'loadmore' ) {
	$paginationType = 'ajax';
}

$pagination_mode = ( ! empty( $enablePagination ) && in_array( $paginationType, array( 'numbered', 'ajax' ), true ) ) ? $paginationType : 'none';

// Carousel ignores pagination entirely — the layout already streams every
// post horizontally. Coerce server-side so stale `enablePagination=true`
// values from before a layout switch don't render a phantom button.
if ( $_layout_slug === 'carousel' ) {
	$pagination_mode = 'none';
}
$per_page        = max( 1, (int) $postsPerPage );
$total           = count( $posts );
$total_pages     = $pagination_mode === 'none' ? 1 : (int) ceil( $total / $per_page );

// Only AJAX mode shows the Load More button; numbered mode emits a page nav.
$has_load_more = $pagination_mode === 'ajax' && $total_pages > 1;

// Pro-extensible data-attributes (carousel autoplay/dots/etc., skin presets).
// Filter receives ['key' => 'value'] and emits as data-key="value".
$extra_wrapper_data = apply_filters( 'essential_blocks/facebook_feed/wrapper_data', array(), $attributes );
$extra_wrapper_attr = '';
if ( is_array( $extra_wrapper_data ) ) {
	foreach ( $extra_wrapper_data as $key => $value ) {
		$extra_wrapper_attr .= ' data-' . sanitize_key( $key ) . '="' . esc_attr( (string) $value ) . '"';
	}
}

// AJAX Load More wiring. Only the display attributes that affect rendering
// are sent to the client; the Page Access Token + Page ID stay server-side.
if ( $pagination_mode === 'ajax' ) {
	$ajax_payload = array(
		'sortBy'           => isset( $sortBy ) ? (string) $sortBy : 'most_recent',
		'numberOfPosts'    => isset( $numberOfPosts ) ? (int) $numberOfPosts : 6,
		'postsPerPage'     => $per_page,
		'messageLimit'     => isset( $messageLimit ) ? (int) $messageLimit : 25,
		'showProfileImage' => ! empty( $showProfileImage ),
		'showPageName'     => ! empty( $showPageName ),
		'showTimestamp'    => ! empty( $showTimestamp ),
		'showMessage'      => ! empty( $showMessage ),
		'showReactions'    => ! empty( $showReactions ),
		'showComments'     => ! empty( $showComments ),
		'showShares'       => ! empty( $showShares ),
		'enableLink'       => ! empty( $enableLink ),
		'openInNewTab'     => ! empty( $openInNewTab ),
	);
	$ajax_payload = apply_filters( 'essential_blocks/facebook_feed/ajax_payload', $ajax_payload, $attributes );

	$extra_wrapper_attr .= ' data-ajax="1"';
	$extra_wrapper_attr .= ' data-ajax-action="' . esc_attr( \EssentialBlocks\Blocks\FacebookFeed::AJAX_ACTION ) . '"';
	$extra_wrapper_attr .= ' data-ajax-nonce="' . esc_attr( wp_create_nonce( \EssentialBlocks\Blocks\FacebookFeed::AJAX_NONCE ) ) . '"';
	$extra_wrapper_attr .= ' data-ajax-url="' . esc_attr( admin_url( 'admin-ajax.php' ) ) . '"';
	$extra_wrapper_attr .= ' data-ajax-attrs="' . esc_attr( wp_json_encode( $ajax_payload ) ) . '"';
}

// In AJAX mode, total_pages can't be derived from the small first-page slice
// returned by the server render — there may be more posts available remotely.
// Always show the Load More button in AJAX mode so users can request more;
// the endpoint reports has_more=false to hide it when the feed is exhausted.
if ( $pagination_mode === 'ajax' ) {
	$has_load_more = true;
}
?>
<div <?php echo wp_kses_data( $wrapper_attributes ); ?>>
	<div class="eb-parent-wrapper <?php echo esc_attr( implode( ' ', $_parent_wrapper_classes ) ); ?>">
		<div class="<?php echo esc_attr( implode( ' ', $_wrapper_classes ) ); ?> eb-facebook-feed-wrapper">
			<div
				class="<?php echo esc_attr( $_inner_class ); ?>"
				data-layout="<?php echo esc_attr( $layout ); ?>"
				data-pagination="<?php echo esc_attr( $pagination_mode ); ?>"
				data-posts-per-page="<?php echo esc_attr( $per_page ); ?>"
				<?php echo $extra_wrapper_attr; // already escaped per-attr above ?>
			>
				<?php
				if ( empty( $posts ) ) {
					echo '<p class="eb-fb-feed__empty">' . esc_html__( 'No posts to display yet.', 'essential-blocks' ) . '</p>';
				} else {
					// In ajax mode we only paint the first page server-side; the
					// rest are fetched on demand by Pro's frontend.js. Other
					// modes render the full set and toggle visibility client-side.
					$posts_to_render = $pagination_mode === 'ajax'
						? array_slice( $posts, 0, $per_page )
						: $posts;

					foreach ( $posts_to_render as $index => $post ) {
						if ( ! is_object( $post ) ) {
							continue;
						}

						$page_number      = $pagination_mode === 'none' ? 1 : (int) floor( $index / $per_page ) + 1;
						$hidden_attribute = ( $pagination_mode === 'numbered' && $page_number > 1 ) ? ' hidden' : '';

						$helper::views(
							'fb-partials/single',
							array(
								'post'             => $post,
								'target'           => $target,
								'enableLink'       => $enableLink,
								'showProfileImage' => $showProfileImage,
								'showPageName'     => $showPageName,
								'showTimestamp'    => $showTimestamp,
								'showMessage'      => $showMessage,
								'messageLimit'     => $messageLimit,
								'showReactions'    => $showReactions,
								'showComments'     => $showComments,
								'showShares'       => $showShares,
								'page_number'      => $page_number,
								'hidden_attr'      => $hidden_attribute,
							)
						);
					}
				}
				?>
			</div>

			<?php if ( $has_load_more ) { ?>
				<button
					type="button"
					class="eb-fb-feed__load-more"
				>
					<?php echo esc_html( $loadMoreText ); ?>
				</button>
			<?php } elseif ( $pagination_mode === 'numbered' && $total_pages > 1 ) { ?>
				<nav class="eb-fb-feed__pagination" aria-label="<?php echo esc_attr__( 'Feed pagination', 'essential-blocks' ); ?>">
					<button
						type="button"
						class="eb-fb-feed__page-prev"
						aria-label="<?php echo esc_attr__( 'Previous page', 'essential-blocks' ); ?>"
						disabled
					>&lsaquo;</button>
					<?php for ( $page = 1; $page <= $total_pages; $page++ ) { ?>
						<a
							href="#"
							class="eb-fb-feed__page-link<?php echo $page === 1 ? ' is-current' : ''; ?>"
							data-page="<?php echo esc_attr( $page ); ?>"
							<?php echo $page === 1 ? ' aria-current="page"' : ''; ?>
						>
							<?php echo esc_html( $page ); ?>
						</a>
					<?php } ?>
					<button
						type="button"
						class="eb-fb-feed__page-next"
						aria-label="<?php echo esc_attr__( 'Next page', 'essential-blocks' ); ?>"
					>&rsaquo;</button>
				</nav>
			<?php } ?>
		</div>
	</div>
</div>
