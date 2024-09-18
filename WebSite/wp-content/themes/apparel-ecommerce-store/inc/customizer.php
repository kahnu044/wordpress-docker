<?php
/**
 * Apparel Ecommerce Store: Customizer
 *
 * @package Apparel Ecommerce Store
 * @subpackage apparel_ecommerce_store
 */

/**
 * Singleton class for handling the theme's customizer integration.
 *
 * @since  1.0.0
 * @access public
 */
final class Apparel_Ecommerce_Store_Customize {

	/**
	 * Returns the instance.
	 *
	 * @since  1.0.0
	 * @access public
	 * @return object
	 */
	public static function get_instance() {

		static $instance = null;

		if ( is_null( $instance ) ) {
			$instance = new self;
			$instance->setup_actions();
		}

		return $instance;
	}

	/**
	 * Constructor method.
	 *
	 * @since  1.0.0
	 * @access private
	 * @return void
	 */
	private function __construct() {}

	/**
	 * Sets up initial actions.
	 *
	 * @since  1.0.0
	 * @access private
	 * @return void
	 */
	private function setup_actions() {

		// Register panels, sections, settings, controls, and partials.
		add_action( 'customize_register', array( $this, 'sections' ) );

		// Register scripts and styles for the controls.
		add_action( 'customize_controls_enqueue_scripts', array( $this, 'enqueue_control_scripts' ), 0 );
	}

	/**
	 * Sets up the customizer sections.
	 *
	 * @since  1.0.0
	 * @access public
	 * @param  object  $manager
	 * @return void
	 */
	public function sections( $manager ) {

		// Load custom sections.
		load_template( trailingslashit( get_template_directory() ) . '/inc/section-pro.php' );

		// Register custom section types.
		$manager->register_section_type( 'Apparel_Ecommerce_Store_Customize_Section_Pro' );

		// Register sections.
		$manager->add_section(
			new Apparel_Ecommerce_Store_Customize_Section_Pro(
				$manager,
				'apparel_ecommerce_store_section_pro',
				array(
					'priority'   => 9,
					'title'    => esc_html__( 'Apparel Ecommerce Store Pro', 'apparel-ecommerce-store' ),
					'pro_text' => esc_html__( 'GET PRO', 'apparel-ecommerce-store' ),
					'pro_url'  => esc_url( 'https://www.cretathemes.com/products/apparel-wordpress-theme', 'apparel-ecommerce-store' ),
				)
			)
		);

	}

	/**
	 * Loads theme customizer CSS.
	 *
	 * @since  1.0.0
	 * @access public
	 * @return void
	 */
	public function enqueue_control_scripts() {

		wp_enqueue_script( 'apparel-ecommerce-store-customize-controls', trailingslashit( esc_url( get_template_directory_uri() ) ) . '/assets/customize-controls.js', array( 'customize-controls' ) );

		wp_enqueue_style( 'apparel-ecommerce-store-customize-controls', trailingslashit( esc_url( get_template_directory_uri() ) ) . '/assets/customize-controls.css' );
	}
}

// Doing this customizer thang!
Apparel_Ecommerce_Store_Customize::get_instance();