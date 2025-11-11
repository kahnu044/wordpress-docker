<?php

namespace EssentialBlocks;

use EssentialBlocks\API\Server;
use EssentialBlocks\Admin\Admin;
use EssentialBlocks\Core\Blocks;
use EssentialBlocks\Core\Scripts;
use EssentialBlocks\Core\PostMeta;
use EssentialBlocks\Utils\Enqueue;
use EssentialBlocks\Utils\Settings;
use EssentialBlocks\Core\FontLoader;
use EssentialBlocks\Core\Maintenance;
use EssentialBlocks\Integrations\NFT;
use EssentialBlocks\Core\ModifyWPCore;
use EssentialBlocks\Integrations\Data;
use EssentialBlocks\Integrations\Form;
use EssentialBlocks\Core\PageTemplates;
use EssentialBlocks\Core\BlocksPatterns;
use EssentialBlocks\Modules\StyleHandler;
use EssentialBlocks\Traits\HasSingletone;
use EssentialBlocks\Integrations\GoogleMap;
use EssentialBlocks\Integrations\Instagram;
use EssentialBlocks\Integrations\OpenVerse;
use EssentialBlocks\Integrations\Pagination;
use EssentialBlocks\Integrations\GlobalStyles;
use EssentialBlocks\Integrations\AssetGeneration;
use EssentialBlocks\Integrations\PluginInstaller;
use EssentialBlocks\Integrations\AI\AI;
use EssentialBlocks\Utils\SvgSanitizer;
use EssentialBlocks\Admin\QuickSetup;
use EssentialBlocks\Integrations\BlockUsage;
use EssentialBlocks\Utils\LiquidGlassRenderer;

final class Plugin
{
    use HasSingletone;
                                                                        public $version = '5.7.4';

    public $admin;
    /**
     * Enqueue class responsible for assets
     * @var Enqueue
     */
    public $assets;

    /**
     * Settings
     * @var null|Settings
     */
    public static $settings = null;
    /**
     * Blocks
     * @var Blocks
     */
    public static $blocks;

    /**
     * Plugin constructor.
     * Initializing Templately plugin.
     *
     * @access private
     */
    public function __construct()
    {
        $this->define_constants();
        $this->set_locale();

        $this->load_admin_dependencies();

        Maintenance::get_instance();

        QuickSetup::get_instance();

        $this->assets   = Enqueue::get_instance( ESSENTIAL_BLOCKS_URL, ESSENTIAL_BLOCKS_DIR_PATH, $this->version );
        self::$settings = Settings::get_instance();
        $this->admin    = Admin::get_instance();

        /**
         * Style Handler For Parsing and Saving Styles as file.
         */
        StyleHandler::init();

        Scripts::get_instance();

        FontLoader::get_instance( 'essential-blocks' );

        // Liquid Glass Effect Global SVG Renderer
        LiquidGlassRenderer::get_instance();

        // Templates
        PageTemplates::get_instance();

        //NFT Ajax
        NFT::get_instance();

        //Form Ajax
        Form::get_instance();

        //Ajax for Get/Set Core Data
        Data::get_instance();

        //Openverse Ajax
        OpenVerse::get_instance();

        //Google Map Ajax
        GoogleMap::get_instance();

        // Load REST API's
        Server::get_instance();

        // Patterns
        BlocksPatterns::get_instance();

        //PluginInstaller
        PluginInstaller::get_instance();

        //Asset Generation
        AssetGeneration::get_instance();

        // Instagram Access Token AJAX
        Instagram::get_instance();

        //Global Style Ajax for Store
        GlobalStyles::get_instance();

        // pagination
        Pagination::get_instance();

        // BlockUsage
        BlockUsage::get_instance();

        // Fetch Enabled Blocks if not than Default Block List
        self::$blocks = Blocks::get_instance( self::$settings );

        // SVG Sanitizer
        SvgSanitizer::get_instance();

        // Initialize AI Integration
        AI::get_instance();

        add_action( 'init', function () {
            /**
             * Register a meta `_eb_attr`
             */
            PostMeta::get_instance()->register_meta();

            /**
             * Register all blocks dynamically
             */
            self::$blocks->register_blocks( $this->assets );
        } );

        add_action( 'plugins_loaded', [ $this, 'plugins_loaded' ] );

        add_action( 'wp_loaded', [ $this, 'wp_loaded' ] );

        add_filter( 'upload_mimes', [ $this, 'eb_custom_mines_uploads' ], 20 );
        add_filter( 'wp_check_filetype_and_ext', [ $this, 'eb_handle_filetypes' ], 10, 5 );
        add_filter( "wp_handle_upload_prefilter", [ $this, 'eb_handle_sanitize_svg' ] );

        // Filter to prevent pro blocks from rendering in frontend when pro plugin is not active
        add_filter( 'render_block', [ $this, 'filter_pro_blocks_frontend' ], 10, 2 );

        /**
         * Initialize.
         */
        do_action( 'essential_blocks::init' );
    }

    /**
     * Cloning is forbidden.
     *
     * @since 2.0
     */
    public function __clone()
    {
        _doing_it_wrong( __FUNCTION__, esc_html__( 'Cloning is forbidden.', 'essential-blocks' ), '2.0' );
    }

    /**
     * Unserializing instances of this class is forbidden.
     *
     * @since 2.0
     */
    public function __wakeup()
    {
        _doing_it_wrong( __FUNCTION__, esc_html__( 'Unserializing instances of this class is forbidden.', 'essential-blocks' ), '2.0' );
    }

    /**
     * Initializing Things on Plugins Loaded
     * @return void
     */
    public function plugins_loaded()
    {
        /**
         * Migrator for Templately
         */
        // Migrator::get_instance();
    }

    /**
     * Initializing Things on WP Loaded
     * @return void
     */
    public function wp_loaded()
    {

        ModifyWPCore::get_instance();
    }

    /**
     * Define CONSTANTS
     *
     * @since 2.0.0
     * @return void
     */
    public function define_constants()
    {
        $this->define( 'ESSENTIAL_BLOCKS_WP_VERSION', (float) get_bloginfo( 'version' ) );
        $this->define( 'ESSENTIAL_BLOCKS_WHATSNEW_REDIRECT', 'none' );
        $this->define( 'ESSENTIAL_BLOCKS_NAME', 'essential-blocks' );
        $this->define( 'ESSENTIAL_BLOCKS_DIR_PATH', plugin_dir_path( ESSENTIAL_BLOCKS_FILE ) );
        $this->define( 'ESSENTIAL_BLOCKS_BLOCK_DIR', ESSENTIAL_BLOCKS_DIR_PATH . '/assets/blocks/' );
        $this->define( 'ESSENTIAL_BLOCKS_URL', plugin_dir_url( ESSENTIAL_BLOCKS_FILE ) );
        $this->define( 'ESSENTIAL_BLOCKS_ADMIN_URL', plugin_dir_url( ESSENTIAL_BLOCKS_FILE ) );
        $this->define( 'ESSENTIAL_BLOCKS_PLUGIN_BASENAME', plugin_basename( ESSENTIAL_BLOCKS_FILE ) );
        $this->define( 'ESSENTIAL_BLOCKS_VERSION', $this->version );
        $this->define( 'ESSENTIAL_BLOCKS_IS_PRO_ACTIVE', class_exists( 'EssentialBlocks\Pro\Plugin' ) ? true : false );
        $this->define( 'ESSENTIAL_BLOCKS_SITE_URL', 'https://essential-blocks.com/' );
        $this->define( 'ESSENTIAL_BLOCKS_UPGRADE_PRO_URL', 'https://essential-blocks.com/upgrade' );
        $this->define( 'ESSENTIAL_BLOCKS_PLACEHOLDER_IMAGE', ESSENTIAL_BLOCKS_URL . 'assets/images/placeholder.png' );
        $this->define( 'ESSENTIAL_BLOCKS_ICON', ESSENTIAL_BLOCKS_URL . 'assets/images/eb-logo.svg' );
        $this->define( 'EB_PATTERN', true );

        //Those flags needs to update if notice
        $this->define( 'EB_PROMOTION_FLAG', 13 );
        $this->define( 'EB_ADMIN_MENU_FLAG', 13 );
        $this->define( 'EB_SHOW_WHATS_NEW_NOTICE', 1 );

        //Table Name constants
        global $wpdb;
        $this->define( 'ESSENTIAL_BLOCKS_FORM_SETTINGS_TABLE', $wpdb->prefix . 'eb_form_settings' );

        //Settings Key Constants
        $this->define( 'ESSENTIAL_BLOCKS_HIDE_PATTERN_LIBRARY', 'eb_hide_pattern_library' );
    }

    /**
     * Define constant if not already set.
     *
     * @param string      $name  Constant name.
     * @param mixed $value Constant value.
     *
     * @return void
     */
    private function define( $name, $value )
    {
        if ( ! defined( $name ) ) {
            define( $name, $value );
        }
    }

    /**
     * Setting the locale for translation availability
     * @since 1.0.0
     * @return void
     */
    public function set_locale()
    {
        add_action( 'init', [ $this, 'load_textdomain' ] );
    }

    /**
     * Loading Text Domain on init HOOK
     * @since 1.0.0
     *
     * @return void
     */
    public function load_textdomain()
    {
        load_plugin_textdomain( 'essential-blocks', false, dirname( ESSENTIAL_BLOCKS_PLUGIN_BASENAME ) . '/languages' );
    }

    private function load_admin_dependencies()
    {
        //Admin dependency codes here
    }

    /**
     * Add .json files suppor.
     */
    public function eb_custom_mines_uploads( $mimes )
    {
        $eb_settings          = get_option( 'eb_settings', [  ] );
        $enableUnfilteredFile = ! empty( $eb_settings[ 'unfilteredFile' ] ) ? $eb_settings[ 'unfilteredFile' ] : 'false';
        if ( $enableUnfilteredFile === 'true' ) {
            $mimes[ 'svg' ] = 'image/svg+xml';
        }
        $mimes[ 'txt' ]    = 'text/plain';
        $mimes[ 'json' ]   = 'application/json';
        $mimes[ 'lottie' ] = 'application/zip';

        return $mimes;
    }

    public function eb_handle_filetypes( $data, $file, $filename, $mimes, $real_mime )
    {
        if ( ! empty( $data[ 'ext' ] ) && ! empty( $data[ 'type' ] ) ) {
            return $data;
        }

        $wp_file_type = wp_check_filetype( $filename, $mimes );

        if ( 'json' === $wp_file_type[ 'ext' ] ) {
            $data[ 'ext' ]  = 'json';
            $data[ 'type' ] = 'application/json';
        } elseif ( 'txt' === $wp_file_type[ 'ext' ] ) {
            $data[ 'ext' ]  = 'txt';
            $data[ 'type' ] = 'text/plain';
        }

        return $data;
    }

    /**
     * Filter pro blocks from rendering in frontend when pro plugin is not active
     *
     * @param string $block_content The block content.
     * @param array  $block         The full block, including name and attributes.
     * @return string
     */
    public function filter_pro_blocks_frontend( $block_content, $block )
    {
        // Only filter in frontend, not in admin or REST requests
        if ( is_admin() || ( defined( 'REST_REQUEST' ) && REST_REQUEST ) ) {
            return $block_content;
        }

        // Only filter if pro plugin is not active
        if ( defined( 'ESSENTIAL_BLOCKS_IS_PRO_ACTIVE' ) && ESSENTIAL_BLOCKS_IS_PRO_ACTIVE ) {
            return $block_content;
        }

        // Check if this is a pro block
        if ( isset( $block[ 'blockName' ] ) && $this->is_pro_block( $block[ 'blockName' ] ) ) {
            // Return empty content to hide the block in frontend
            return '';
        }

        return $block_content;
    }

    /**
     * Check if a block is a pro block
     *
     * @param string $block_name The block name.
     * @return bool
     */
    private function is_pro_block( $block_name )
    {
        // Check if block name contains 'essential-blocks/pro-'
        if ( strpos( $block_name, 'essential-blocks/pro-' ) === 0 ) {
            return true;
        }

        // Also check against the list of pro blocks from blocks.php
        $all_blocks = self::$blocks ? self::$blocks->defaults( false, false ) : [  ];

        foreach ( $all_blocks as $block_data ) {
            if ( isset( $block_data[ 'is_pro' ] ) && $block_data[ 'is_pro' ] && isset( $block_data[ 'name' ] ) ) {
                $pro_block_name = 'essential-blocks/' . $block_data[ 'name' ];
                if ( $block_name === $pro_block_name ) {
                    return true;
                }
            }
        }

        return false;
    }

    /**
     * Sanitize SVG files before upload
     *
     * @param array $file The file being uploaded.
     * @return array
     */
    public function eb_handle_sanitize_svg( $file )
    {

        // Check if the file type is SVG (case-insensitive)
        if ( strtolower( $file[ 'type' ] ) === 'image/svg+xml' ) {
            // Verify file extension is .svg (case-insensitive)
            $path_parts = pathinfo( $file[ 'name' ] );
            $extension  = isset( $path_parts[ 'extension' ] ) ? strtolower( $path_parts[ 'extension' ] ) : '';

            if ( $extension !== 'svg' ) {
                $file[ 'error' ] = __( 'File has incorrect extension for SVG type', 'essential-blocks' );
                return $file;
            }

            // Get file contents
            $contents = file_get_contents( $file[ 'tmp_name' ] );

            // Check if content actually contains SVG structure
            if ( stripos( $contents, '<svg' ) === false || stripos( $contents, '</svg>' ) === false ) {
                $file[ 'error' ] = __( 'File is not a valid SVG document', 'essential-blocks' );
                return $file;
            }

            // Use the sanitizer to clean and validate the SVG
            $sanitizer = new SvgSanitizer();
            $sanitized = $sanitizer->sanitize( $contents );

            if ( ! $sanitized ) {
                $file[ 'error' ] = __( 'Invalid or unsafe SVG file', 'essential-blocks' );
            } else {
                file_put_contents( $file[ 'tmp_name' ], $sanitized );
            }
        }

        return $file;
    }
}
