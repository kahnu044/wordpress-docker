<?php

/**
 * Plugin Name: Essential Blocks
 * Plugin URI: https://essential-blocks.com
 * Description: The Ultimate Blocks Library for WordPress Gutenberg editor.
 * Author: WPDeveloper
 * Author URI: https://wpdeveloper.com
 * Version: 4.0.8
 * License: GPL3+
 * License URI: http://www.gnu.org/licenses/gpl-3.0.txt
 * Text Domain: essential-blocks
 *
 * @package Essential_Blocks
 */
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

// Define things
define( 'ESSENTIAL_BLOCKS_FILE', __FILE__ );

require_once __DIR__ . '/autoload.php';

/**
 * Dependencies (Made by WPDeveloper)
 */
require_once __DIR__ . '/lib/style-handler/style-handler.php';

function wpdev_essential_blocks() {
    return EssentialBlocks\Plugin::get_instance();
}

wpdev_essential_blocks();
