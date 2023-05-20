<?php
// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Returns the content of the block.
 *
 * @param array $attributes Block attributes.
 *
 * @param string $content Block save content.
 */
function render_block_cb_carousel( $attributes, $content ) {
	if ( ! is_admin() ) {
		wp_enqueue_script(
			'carousel-block-slick',
			plugins_url( 'dist/assets/vendor/slick/slick.min.js', dirname( __DIR__ ) ),
			[ 'jquery' ],
			filemtime( CB_PLUGIN_DIR . '/dist/assets/vendor/slick/slick.min.js' ),
			true
		);

		wp_enqueue_script(
			'carousel-block-view',
			plugins_url( 'carousel/view.js', dirname( __FILE__ ) ),
			[ 'jquery', 'carousel-block-slick' ],
			filemtime( plugin_dir_path( __DIR__ ) . 'carousel/view.js' ),
			true
		);
	}

	return $content;
}

/**
 * Register the block.
 */
function register_block_cb_carousel() {
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	register_block_type( __DIR__,
		array(
	  	'render_callback' => 'render_block_cb_carousel'
	  )
	);
}

add_action( 'init', 'register_block_cb_carousel' );
