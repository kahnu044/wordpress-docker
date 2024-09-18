<?php
/**
 * Block Styles
 *
 * @package apparel_ecommerce_store
 * @since 1.0
 */

if ( function_exists( 'register_block_style' ) ) {
	function apparel_ecommerce_store_register_block_styles() {

		//Wp Block Padding Zero
		register_block_style(
			'core/group',
			array(
				'name'  => 'apparel-ecommerce-store-padding-0',
				'label' => esc_html__( 'No Padding', 'apparel-ecommerce-store' ),
			)
		);

		//Wp Block Post Author Style
		register_block_style(
			'core/post-author',
			array(
				'name'  => 'apparel-ecommerce-store-post-author-card',
				'label' => esc_html__( 'Theme Style', 'apparel-ecommerce-store' ),
			)
		);

		//Wp Block Button Style
		register_block_style(
			'core/button',
			array(
				'name'         => 'apparel-ecommerce-store-button',
				'label'        => esc_html__( 'Plain', 'apparel-ecommerce-store' ),
			)
		);

		//Post Comments Style
		register_block_style(
			'core/post-comments',
			array(
				'name'         => 'apparel-ecommerce-store-post-comments',
				'label'        => esc_html__( 'Theme Style', 'apparel-ecommerce-store' ),
			)
		);

		//Latest Comments Style
		register_block_style(
			'core/latest-comments',
			array(
				'name'         => 'apparel-ecommerce-store-latest-comments',
				'label'        => esc_html__( 'Theme Style', 'apparel-ecommerce-store' ),
			)
		);


		//Wp Block Table Style
		register_block_style(
			'core/table',
			array(
				'name'         => 'apparel-ecommerce-store-wp-table',
				'label'        => esc_html__( 'Theme Style', 'apparel-ecommerce-store' ),
			)
		);


		//Wp Block Pre Style
		register_block_style(
			'core/preformatted',
			array(
				'name'         => 'apparel-ecommerce-store-wp-preformatted',
				'label'        => esc_html__( 'Theme Style', 'apparel-ecommerce-store' ),
			)
		);

		//Wp Block Verse Style
		register_block_style(
			'core/verse',
			array(
				'name'         => 'apparel-ecommerce-store-wp-verse',
				'label'        => esc_html__( 'Theme Style', 'apparel-ecommerce-store' ),
			)
		);
	}
	add_action( 'init', 'apparel_ecommerce_store_register_block_styles' );
}
