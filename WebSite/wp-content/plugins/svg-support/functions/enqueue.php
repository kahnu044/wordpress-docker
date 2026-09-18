<?php
/**
 * Enqueue scripts and styles
 * This file is to enqueue the scripts and styles both admin and front end
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

/**
 * Enqueue the admin CSS using screen check functions
 */
function bodhi_svgs_admin_css() {

	// Check if user is on SVG Support settings page or media library page
	if ( bodhi_svgs_specific_pages_settings() || bodhi_svgs_specific_pages_media_library() ) {
		wp_enqueue_style( 'bodhi-svgs-admin', BODHI_SVGS_PLUGIN_URL . 'css/svgs-admin.css', array(), BODHI_SVGS_VERSION );
	}

	// Check if user is on SVG Support settings page and not in "Advanced Mode"
	// (no-JS fallback — with JS active the settings screen toggles visibility live)
	if ( bodhi_svgs_specific_pages_settings() && ! bodhi_svgs_advanced_mode() ) {
		wp_enqueue_style( 'bodhi-svgs-admin-simple-mode', BODHI_SVGS_PLUGIN_URL . 'css/svgs-admin-simple-mode.css', array(), BODHI_SVGS_VERSION );
	}

	// Check if user is on an edit post page
	if ( bodhi_svgs_is_edit_page() ) {
		wp_enqueue_style( 'bodhi-svgs-admin-edit-post', BODHI_SVGS_PLUGIN_URL . 'css/svgs-admin-edit-post.css', array(), BODHI_SVGS_VERSION );
	}
}
add_action( 'admin_enqueue_scripts', 'bodhi_svgs_admin_css' );

/**
 * Enqueue the settings screen assets (design system styles + auto-save JS)
 */
function bodhi_svgs_admin_settings_assets() {

	if ( ! bodhi_svgs_specific_pages_settings() ) {
		return;
	}

	wp_enqueue_style( 'bodhi-svgs-settings', BODHI_SVGS_PLUGIN_URL . 'css/svgs-settings.css', array(), BODHI_SVGS_VERSION );
	wp_enqueue_script( 'bodhi-svgs-settings', BODHI_SVGS_PLUGIN_URL . 'js/svgs-settings.js', array(), BODHI_SVGS_VERSION, true );

	wp_add_inline_script(
		'bodhi-svgs-settings',
		'var SvgsSettings = ' . wp_json_encode(
			array(
				'ajaxUrl'  => admin_url( 'admin-ajax.php' ),
				'nonce'    => wp_create_nonce( 'bodhi_svgs_autosave' ),
				'iconsUrl' => plugins_url( 'admin/img/icons.svg', BODHI_SVGS_PLUGIN_FILE ),
				'i18n'     => array(
					'idle'      => __( 'All changes saved', 'svg-support' ),
					'saving'    => __( 'Saving…', 'svg-support' ),
					'saved'     => __( 'Changes saved', 'svg-support' ),
					'error'     => __( 'Couldn\'t save — retrying on next change', 'svg-support' ),
					'btnIdle'   => __( 'Save changes', 'svg-support' ),
					'btnSaving' => __( 'Saving…', 'svg-support' ),
					'btnSaved'  => __( 'Saved', 'svg-support' ),
				),
			)
		) . ';',
		'before'
	);
}
add_action( 'admin_enqueue_scripts', 'bodhi_svgs_admin_settings_assets' );

/**
 * Enqueue Block editor JS
 */
function bodhi_svgs_block_editor() {

	if ( bodhi_svgs_advanced_mode() ) {
		wp_enqueue_script( 'bodhi-svgs-gutenberg-filters', BODHI_SVGS_PLUGIN_URL . '/js/min/gutenberg-filters-min.js', ['wp-edit-post'], BODHI_SVGS_VERSION, true );
	}
}
add_action( 'enqueue_block_editor_assets', 'bodhi_svgs_block_editor' );

/**
 * Enqueue frontend CSS
 */
function bodhi_svgs_frontend_css() {
	global $bodhi_svgs_options;

	if ( ! empty( $bodhi_svgs_options['frontend_css'] ) ) {
		wp_enqueue_style( 'bodhi-svgs-attachment', BODHI_SVGS_PLUGIN_URL . 'css/svgs-attachment.css', array(), BODHI_SVGS_VERSION );
	}
}
add_action( 'wp_enqueue_scripts', 'bodhi_svgs_frontend_css' );

/**
 * Enqueue frontend JS
 */
function bodhi_svgs_frontend_js() {
	global $bodhi_svgs_options;

	if ( ! empty( $bodhi_svgs_options['sanitize_svg_front_end'] ) && $bodhi_svgs_options['sanitize_svg_front_end'] === 'on' && bodhi_svgs_advanced_mode() === true ) {
		$bodhi_svgs_js_footer = ! empty( $bodhi_svgs_options['js_foot_choice'] );
		wp_enqueue_script( 'bodhi-dompurify-library', BODHI_SVGS_PLUGIN_URL . 'vendor/DOMPurify/DOMPurify.min.js', array(), '2.5.9', $bodhi_svgs_js_footer );
	}
}
add_action( 'wp_enqueue_scripts', 'bodhi_svgs_frontend_js', 9 );

/**
 * Enqueue and localize JS for IMG tag replacement
 */
function bodhi_svgs_inline() {
	global $bodhi_svgs_options;

	if ( bodhi_svgs_advanced_mode() ) {
		$force_inline_svg_active = ! empty( $bodhi_svgs_options['force_inline_svg'] ) ? 'true' : 'false';

		if ( ! empty( $bodhi_svgs_options['css_target'] ) ) {
			$css_target_array = array(
				'Bodhi' => 'img.' . esc_attr( $bodhi_svgs_options['css_target'] ),
				'ForceInlineSVG' => esc_attr( $bodhi_svgs_options['css_target'] )
			);
		} else {
			$css_target_array = array(
				'Bodhi' => 'img.style-svg',
				'ForceInlineSVG' => 'style-svg'
			);
		}

		if ( ! empty( $bodhi_svgs_options['use_expanded_js'] ) ) {
			$bodhi_svgs_js_folder = '';
			$bodhi_svgs_js_file = '';
		} else {
			$bodhi_svgs_js_folder = 'min/';
			$bodhi_svgs_js_file = '-min';
		}

		$bodhi_svgs_js_footer = ! empty( $bodhi_svgs_options['js_foot_choice'] );
		$bodhi_svgs_js_vanilla = ! empty( $bodhi_svgs_options['use_vanilla_js'] ) ? '-vanilla' : '';

		$bodhi_svgs_js_path = 'js/' . $bodhi_svgs_js_folder . 'svgs-inline' . $bodhi_svgs_js_vanilla . $bodhi_svgs_js_file . '.js';

		// Only change: Make jQuery dependency conditional on vanilla JS setting
		$bodhi_svgs_dependencies = ! empty( $bodhi_svgs_options['use_vanilla_js'] ) ? array() : array( 'jquery' );

		wp_register_script( 'bodhi_svg_inline', BODHI_SVGS_PLUGIN_URL . $bodhi_svgs_js_path, $bodhi_svgs_dependencies, BODHI_SVGS_VERSION, $bodhi_svgs_js_footer );
		wp_enqueue_script( 'bodhi_svg_inline' );

		wp_localize_script('bodhi_svg_inline', 'svgSettings', array(
			'skipNested' => !empty($bodhi_svgs_options['skip_nested_svg'])
		));

		wp_add_inline_script(
			'bodhi_svg_inline',
			sprintf(
				'cssTarget=%s;ForceInlineSVGActive=%s;frontSanitizationEnabled=%s;',
				wp_json_encode( $css_target_array ),
				wp_json_encode( $force_inline_svg_active ),
				wp_json_encode( $bodhi_svgs_options['sanitize_svg_front_end'] )
			)
		);
	}
}
add_action( 'wp_enqueue_scripts', 'bodhi_svgs_inline' );