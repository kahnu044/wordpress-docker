<?php
/**
 * Plugin Name: Carousel Slider Block
 * Plugin URI: https://wordpress.org/plugins/carousel-block
 * Description: A responsive carousel slider block for Gutenberg. Add any blocks to slides.
 * Author URI: http://virgiliudiaconu.com/
 * Version: 1.0.14
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package carousel-block
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Directory path of this plugin
 *
 * @var string
 */
define( 'CB_PLUGIN_DIR', untrailingslashit( plugin_dir_path( __FILE__ ) ) );

class Carousel_Slider_Block {
    const VERSION = '1.0.14'; // Plugin version

    /**
     * Actions and filters.
     */
    public static function register() {
        add_action( 'init', ['Carousel_Slider_Block', 'register_blocks'] );
    }

    /**
     * Registers the blocks and their assets.
     */
    public static function register_blocks() {
        register_block_type( CB_PLUGIN_DIR . '/build/carousel', [
            'render_callback' => ['Carousel_Slider_Block', 'render_carousel']
        ]);
        register_block_type( CB_PLUGIN_DIR . '/build/slide' );
    }

    /**
     * The render callback to handle the block output.
     *
     * @param array $attributes Block attributes.
     * @param string $content Block save content.
     * @return string Rendered block content.
     */
    public static function render_carousel( $attributes, $content ) {
        if ( ! is_admin() ) {
			wp_enqueue_style(
                'carousel-block-slick-style',
                plugins_url( '/vendor/slick/slick.min.css', __FILE__ ),
                [],
                self::VERSION,
                false
            );
             wp_enqueue_script(
                'carousel-block-slick-script',
                plugins_url( '/vendor/slick/slick.min.js', __FILE__ ),
                ['jquery'],
                self::VERSION,
                true
            );
            wp_enqueue_script(
                'carousel-block-slick-init',
                plugins_url( '/vendor/slick/init.js', __FILE__ ),
                [ 'jquery', 'carousel-block-slick-script' ],
                self::VERSION,
                true
            );
        }
        return $content;
    }
}

// Register the plugin
Carousel_Slider_Block::register();

