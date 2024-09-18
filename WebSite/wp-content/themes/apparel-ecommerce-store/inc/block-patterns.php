<?php
/**
 * Block Patterns
 *
 * @package apparel_ecommerce_store
 * @since 1.0
 */

function apparel_ecommerce_store_register_block_patterns() {
	$block_pattern_categories = array(
		'apparel-ecommerce-store' => array( 'label' => esc_html__( 'Apparel Ecommerce Store', 'apparel-ecommerce-store' ) ),
		'pages' => array( 'label' => esc_html__( 'Pages', 'apparel-ecommerce-store' ) ),
	);

	$block_pattern_categories = apply_filters( 'apparel_ecommerce_store_block_pattern_categories', $block_pattern_categories );

	foreach ( $block_pattern_categories as $name => $properties ) {
		if ( ! WP_Block_Pattern_Categories_Registry::get_instance()->is_registered( $name ) ) {
			register_block_pattern_category( $name, $properties );
		}
	}
}
add_action( 'init', 'apparel_ecommerce_store_register_block_patterns', 9 );