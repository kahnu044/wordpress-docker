<?php
/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @package carousel-block
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enqueue block editor JavaScript and CSS.
 */
function carousel_block_editor_assets() {
	$dependencies = [ 'wp-i18n', 'wp-element', 'wp-blocks', 'wp-components' ];

	// Conditionally enqueue 'wp-editor' to avoid conflicts on the widgets and customizer screens
	if ( function_exists( 'get_current_screen' ) ) {
		$screen = get_current_screen();
		if ( $screen && $screen->base !== 'widgets' && $screen->base !== 'customize' ) {
			$dependencies[] = 'wp-editor';
		}
	}

	// Register block editor script for backend.
	wp_enqueue_script(
		'carousel-block-editor',
		plugins_url( '/dist/blocks.build.js', __FILE__ ),
		$dependencies,
		filemtime( CB_PLUGIN_DIR . '/dist/blocks.build.js' ),
		true
	);

	// Register block editor styles for backend.
	wp_enqueue_style(
		'carousel-block-editor',
		plugins_url( '/dist/blocks.editor.build.css', __FILE__ ),
		[ 'wp-edit-blocks' ],
		filemtime( CB_PLUGIN_DIR . '/dist/blocks.editor.build.css' )
	);
}

add_action( 'enqueue_block_editor_assets', 'carousel_block_editor_assets' );

/**
 * Enqueue block styles for frontend and editor.
 */
function carousel_block_assets() {
	if ( ! is_admin() ) {
		wp_enqueue_style(
			'carousel-block-slick',
			plugins_url( '/dist/assets/vendor/slick/slick.min.css', __FILE__ ),
			[],
			filemtime( CB_PLUGIN_DIR . '/dist/assets/vendor/slick/slick.min.css' ),
			false
		);
	}

	wp_enqueue_style(
		'carousel-block',
		plugins_url( '/dist/blocks.style.build.css', __FILE__ ),
		[],
		filemtime( CB_PLUGIN_DIR . '/dist/blocks.style.build.css' )
	);
}

add_action( 'enqueue_block_assets', 'carousel_block_assets' );
