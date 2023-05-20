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
use EssentialBlocks\Core\PageTemplates;
use EssentialBlocks\Core\BlocksPatterns;
use EssentialBlocks\Traits\HasSingletone;
use EssentialBlocks\Integrations\GoogleMap;
use EssentialBlocks\Integrations\Instagram;
use EssentialBlocks\Integrations\OpenVerse;
use EssentialBlocks\Integrations\GlobalStyles;
use EssentialBlocks\Integrations\AssetGeneration;
use EssentialBlocks\Integrations\PluginInstaller;

final class Plugin {
    use HasSingletone;

    public $version = '4.0.8';

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
    public function __construct() {
        $this->define_constants();
        $this->set_locale();

        $this->load_admin_dependencies();
        Maintenance::get_instance();

        $this->assets = Enqueue::get_instance( ESSENTIAL_BLOCKS_URL, ESSENTIAL_BLOCKS_DIR_PATH, $this->version );

        self::$settings = Settings::get_instance();

        $this->admin = Admin::get_instance();

        Scripts::get_instance();

        // Fetch Enabled Blocks if not than Default Block List
        self::$blocks = Blocks::get_instance( self::$settings );

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

        FontLoader::get_instance( 'essential-blocks' );

        // Templates
        PageTemplates::get_instance();

        //NFT Ajax
        NFT::get_instance();

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

        add_action( 'plugins_loaded', [$this, 'plugins_loaded'] );
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
    public function __clone() {
        _doing_it_wrong( __FUNCTION__, __( 'Cloning is forbidden.', 'essential-blocks' ), '2.0' );
    }

    /**
     * Unserializing instances of this class is forbidden.
     *
     * @since 2.0
     */
    public function __wakeup() {
        _doing_it_wrong( __FUNCTION__, __( 'Unserializing instances of this class is forbidden.', 'essential-blocks' ), '2.0' );
    }

    /**
     * Initializing Things on Plugins Loaded
     * @return void
     */
    public function plugins_loaded() {
        /**
         * Migrator for Templately
         */
        // Migrator::get_instance();
    }

    /**
     * Define CONSTANTS
     *
     * @since 2.0.0
     * @return void
     */
    public function define_constants() {
        $this->define( 'ESSENTIAL_BLOCKS_WP_VERSION', (float) get_bloginfo( 'version' ) );
        $this->define( 'ESSENTIAL_BLOCKS_WHATSNEW_REDIRECT', 'none' );
        $this->define( 'ESSENTIAL_BLOCKS_NAME', 'essential-blocks' );
        $this->define( 'ESSENTIAL_BLOCKS_DIR_PATH', plugin_dir_path( ESSENTIAL_BLOCKS_FILE ) );
        $this->define( 'ESSENTIAL_BLOCKS_BLOCK_DIR', ESSENTIAL_BLOCKS_DIR_PATH . '/blocks/' );
        $this->define( 'ESSENTIAL_BLOCKS_URL', plugin_dir_url( ESSENTIAL_BLOCKS_FILE ) );
        $this->define( 'ESSENTIAL_BLOCKS_ADMIN_URL', plugin_dir_url( ESSENTIAL_BLOCKS_FILE ) );
        $this->define( 'ESSENTIAL_BLOCKS_PLUGIN_BASENAME', plugin_basename( ESSENTIAL_BLOCKS_FILE ) );
        $this->define( 'ESSENTIAL_BLOCKS_VERSION', $this->version );
        $this->define( 'ESSENTIAL_BLOCKS_SITE_URL', 'https://essential-blocks.com/' );
    }

    /**
     * Define constant if not already set.
     *
     * @param string      $name  Constant name.
     * @param mixed $value Constant value.
     *
     * @return void
     */
    private function define( $name, $value ) {
        if ( ! defined( $name ) ) {
            define( $name, $value );
        }
    }

    /**
     * Setting the locale for translation availability
     * @since 1.0.0
     * @return void
     */
    public function set_locale() {
        add_action( 'init', [$this, 'load_textdomain'] );
    }

    /**
     * Loading Text Domain on init HOOK
     * @since 1.0.0
     *
     * @return void
     */
    public function load_textdomain() {
        load_plugin_textdomain( 'essential-blocks', false, dirname( ESSENTIAL_BLOCKS_PLUGIN_BASENAME ) . '/languages' );
    }

    private function load_admin_dependencies() {
        require_once ESSENTIAL_BLOCKS_DIR_PATH . '/includes/class-helpers.php';

        //Include NFT AJAX Class
        // require_once ESSENTIAL_BLOCKS_DIR_PATH . '/includes/class-nft-ajax.php';
    }
}
