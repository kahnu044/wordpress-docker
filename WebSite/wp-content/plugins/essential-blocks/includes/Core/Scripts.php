<?php

namespace EssentialBlocks\Core;

use EssentialBlocks\blocks\WPForms;
use EssentialBlocks\blocks\FluentForms;
use EssentialBlocks\Traits\HasSingletone;

class Scripts {
    use HasSingletone;

    private $is_gutenberg_editor = false;

    public $plugin = null;

    public function __construct() {
        add_action( 'init', function () {
            $this->plugin = wpdev_essential_blocks();
        }, 1 );

        add_action( 'enqueue_block_editor_assets', [$this, 'block_editor_assets'] );
        add_action( 'enqueue_block_editor_assets', [$this, 'frontend_backend_assets'] );
        add_action( 'wp_enqueue_scripts', [$this, 'frontend_backend_assets'] );
        add_action( 'init', [$this, 'localize_enqueue_scripts'] );
    }

    public function block_editor_assets() {
        $this->is_gutenberg_editor = true;

        wpdev_essential_blocks()->assets->register( 'twenty-move', 'js/jquery.event.move.js' );
        wpdev_essential_blocks()->assets->register( 'image-loaded', 'js/images-loaded.min.js' );
        wpdev_essential_blocks()->assets->register( 'isotope', 'js/isotope.pkgd.min.js' );
        wpdev_essential_blocks()->assets->register( 'twenty-twenty', 'js/jquery.twentytwenty.js' );
        wpdev_essential_blocks()->assets->register( 'fslightbox-js', 'js/fslightbox.min.js' );
        wpdev_essential_blocks()->assets->register( 'masonry', 'js/masonry.min.js' );
        wpdev_essential_blocks()->assets->register( 'slickjs', 'js/slick.min.js' );
        wpdev_essential_blocks()->assets->register( 'patterns', 'js/eb-patterns.js' );
        wpdev_essential_blocks()->assets->register( 'controls-util', '../dist/controls.js', [
            'essential-blocks-blocks-localize'
        ] );
        wpdev_essential_blocks()->assets->register( 'editor-script', '../dist/index.js', [
            'essential-blocks-vendor-bundle',
            'essential-blocks-controls-util',
            'essential-blocks-twenty-move',
            'essential-blocks-image-loaded',
            'essential-blocks-isotope',
            'essential-blocks-twenty-twenty',
            'essential-blocks-fslightbox-js',
            'essential-blocks-masonry',
            'essential-blocks-typedjs',
            'essential-blocks-slickjs',
            'essential-blocks-patterns'
        ] );
        wpdev_essential_blocks()->assets->enqueue( 'enable-disable', '../lib/enable-disable-blocks/index.js', [
            'essential-blocks-editor-script',
            'essential-blocks-blocks-localize'
        ] );
        //If vendor files has css and extists
        if ( file_exists( ESSENTIAL_BLOCKS_DIR_PATH . 'vendor-bundle/style.css' ) ) {
            wpdev_essential_blocks()->assets->register( 'admin-vendor-style', '../vendor-bundle/style.css' );
        }

        // register styles
        wpdev_essential_blocks()->assets->register( 'editor-css', '../dist/controls.css', [
            'essential-blocks-slick-style',
            'essential-blocks-fslightbox-style',
            'essential-blocks-twenty-twenty-style-image-comparison',
            'essential-blocks-hover-effects-style',
            'essential-blocks-hover-css',
            'essential-blocks-fontpicker-material-theme',
            'essential-blocks-fontpicker-default-theme',
            'essential-blocks-fontawesome',
            'essential-blocks-frontend-style'
        ] );
    }

    /**
     * enqueue/register assets files in frontend/backend
     * @return void
     */
    public function frontend_backend_assets() {
        wpdev_essential_blocks()->assets->register( 'eb-animation', 'js/eb-animation-load.js' );
        wpdev_essential_blocks()->assets->register( 'eb-clipboard', 'js/clipboard.min.js' );
        wpdev_essential_blocks()->assets->register( 'animation', 'css/animate.min.css' );

        wpdev_essential_blocks()->assets->register( 'vendor-bundle', '../vendor-bundle/index.js' );
        wpdev_essential_blocks()->assets->register( 'frontend-style', '../dist/style.css' );
        wpdev_essential_blocks()->assets->register( 'fontawesome', 'css/font-awesome5.css' );
        wpdev_essential_blocks()->assets->register( 'fontpicker-default-theme', 'css/fonticonpicker.base-theme.react.css' );
        wpdev_essential_blocks()->assets->register( 'fontpicker-material-theme', 'css/fonticonpicker.material-theme.react.css' );
        wpdev_essential_blocks()->assets->register( 'hover-css', 'css/hover-min.css' );
        wpdev_essential_blocks()->assets->register( 'hover-effects-style', 'css/hover-effects.css' );
        wpdev_essential_blocks()->assets->register( 'twenty-twenty-style-image-comparison', 'css/twentytwenty.css' );
        wpdev_essential_blocks()->assets->register( 'fslightbox-style', 'css/fslightbox.min.css' );
        wpdev_essential_blocks()->assets->register( 'slick-style', 'css/slick.css' );
        wpdev_essential_blocks()->assets->register( 'typedjs', 'js/typed.min.js' );
    }

    /**
     * enqueue localize scripts
     * @return void
     */
    public function localize_enqueue_scripts() {
        wpdev_essential_blocks()->assets->enqueue( 'blocks-localize', 'js/eb-blocks-localize.js' );

        global $pagenow;

        if ( $pagenow == 'post-new.php' || $pagenow == 'post.php' ) {
            wpdev_essential_blocks()->assets->localize( 'blocks-localize', 'eb_conditional_localize', [
                'editor_type' => 'edit-post'
            ] );
        } elseif ( $pagenow == 'site-editor.php' || ( $pagenow == 'themes.php' && isset( $_GET['page'] ) && $_GET['page'] == 'gutenberg-edit-site' ) ) {
            wpdev_essential_blocks()->assets->localize( 'blocks-localize', 'eb_conditional_localize', [
                'editor_type' => 'edit-site'
            ] );
        }

        $eb_settings = get_option( 'eb_settings', [] );
        $googleFont  = ! empty( $eb_settings['googleFont'] ) ? $eb_settings['googleFont'] : 'true';
        $fontAwesome = ! empty( $eb_settings['fontAwesome'] ) ? $eb_settings['fontAwesome'] : 'true';

        $plugin = $this->plugin;

        $localize_array = [
            'eb_plugins_url' => ESSENTIAL_BLOCKS_URL,
            'eb_wp_version'  => ESSENTIAL_BLOCKS_WP_VERSION,
            'eb_version'     => ESSENTIAL_BLOCKS_VERSION,
            'eb_admin_url'   => get_admin_url(),
            'rest_rootURL'   => get_rest_url(),
            'ajax_url'       => admin_url( 'admin-ajax.php' ),
            'nft_nonce'      => wp_create_nonce( 'eb-nft-nonce' )
        ];
        if ( is_admin() ) {
            $admin_localize_array = [
                'admin_nonce'        => wp_create_nonce( 'admin-nonce' ),
                'fluent_form_lists'  => json_encode( FluentForms::form_list() ),
                'wpforms_lists'      => json_encode( WPForms::form_list() ),
                'all_blocks'         => $plugin::$blocks->all(),
                'all_blocks_default' => $plugin::$blocks->defaults( true, false ),
                'get_plugins'        => \EBHelpers::get_plugins(),
                'googleFont'         => $googleFont,
                'fontAwesome'        => $fontAwesome
            ];

            $localize_array = array_merge( $localize_array, $admin_localize_array );
        }

        wpdev_essential_blocks()->assets->localize( 'blocks-localize', 'EssentialBlocksLocalize', $localize_array );
    }
}
