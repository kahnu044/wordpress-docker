<?php
/**
 * Plugin Name: Carousel Slider Block for Gutenberg
 * Plugin URI: https://wordpress.org/plugins/carousel-block
 * Description: A responsive carousel slider block for Gutenberg. Add any blocks to slides.
 * Author URI: http://virgiliudiaconu.com/
 * Version: 1.0.10
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package carousel-block
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Directory path of this plugin
 *
 * @var string
 */
define( 'CB_PLUGIN_DIR', untrailingslashit( plugin_dir_path( __FILE__ ) ) );

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'init.php';

/**
 * Blocks
 */
require_once plugin_dir_path( __FILE__ ) . 'blocks/carousel/index.php';
require_once plugin_dir_path( __FILE__ ) . 'blocks/slide/index.php';
