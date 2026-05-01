<?php
/**
 * Plugin Name: Carousel Slider Block
 * Plugin URI: https://wordpress.org/plugins/carousel-block
 * Description: A responsive carousel slider for the Gutenberg block editor. Add any type of block to your slides.
 * Author: Virgiliu Diaconu
 * Author URI: http://virgiliudiaconu.com/
 * Version: 2.1.3
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package carousel-block
 */

namespace CarouselSliderBlock;

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

/**
 * Plugin version
 *
 * @var string
 */
define( 'CB_VERSION', '2.1.3' );

/**
 * Directory path of this plugin without trailing slash.
 *
 * @var string
 */
define( 'CB_PLUGIN_DIR', untrailingslashit( plugin_dir_path( __FILE__ ) ) );

/**
 * Base URL of this plugin without trailing slash.
 *
 * @var string
 */
define( 'CB_PLUGIN_URL', untrailingslashit( plugin_dir_url( __FILE__ ) ) );

// Load blocks.
require_once CB_PLUGIN_DIR . '/blocks/class-carousel-legacy.php';
require_once CB_PLUGIN_DIR . '/blocks/class-carousel.php';

// Load admin settings.
require_once CB_PLUGIN_DIR . '/admin/class-settings-page.php';

// Block filters.
require_once CB_PLUGIN_DIR . '/admin/class-block-filters.php';

// Load settings utils.
require_once CB_PLUGIN_DIR . '/admin/class-settings-utils.php';

// Load block patterns.
require_once CB_PLUGIN_DIR . '/patterns/class-patterns.php';

use CarouselSliderBlock\Blocks\Carousel_Legacy;
use CarouselSliderBlock\Blocks\Carousel;
use CarouselSliderBlock\Admin\Settings_Page;
use CarouselSliderBlock\Admin\Block_Filters;
use CarouselSliderBlock\Patterns\Patterns;

/**
 * Main plugin initializer class.
 */
class Main {
    /**
     * Initialize the plugin.
     */
    public static function init() {
        add_action( 'init', [ self::class, 'register_blocks' ] );
        Patterns::init();
        Settings_Page::init();
        Block_Filters::init();
    }

    /**
     * Register blocks.
     */
    public static function register_blocks() {
        ( new Carousel_Legacy() )->register();
        ( new Carousel() )->register();
    }
}

// Initialize the plugin.
Main::init();
