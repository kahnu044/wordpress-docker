<?php
// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Register the block.
 */
function register_block_cb_slide() {
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	register_block_type( __DIR__ );
}

add_action( 'init', 'register_block_cb_slide' );
