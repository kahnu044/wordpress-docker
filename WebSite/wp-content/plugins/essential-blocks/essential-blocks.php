<?php

/**
 * Plugin Name: Essential Blocks
 * Plugin URI: https://essential-blocks.com
 * Description: The Ultimate Gutenberg blocks library to create WordPress sites in the Gutenberg Block Editor with 60+ essential blocks, patterns, templates for WooCommerce, posts, & more.
 * Author: WPDeveloper
 * Author URI: https://wpdeveloper.com
 * Version: 5.0.0
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

function wpdev_essential_blocks()
{
    return EssentialBlocks\Plugin::get_instance();
}

wpdev_essential_blocks();
