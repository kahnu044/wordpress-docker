<?php
namespace CarouselSliderBlock\Blocks;

use CarouselSliderBlock\Admin\Settings_Utils;

class Carousel_Legacy {
    /**
     * Registers the legacy carousel and slide blocks.
     */
    public function register() {
        register_block_type( CB_PLUGIN_DIR . '/build/carousel-legacy', [
            'render_callback' => [ $this, 'render' ],
        ]);
        register_block_type( CB_PLUGIN_DIR . '/build/slide-legacy' );

        add_action( 'enqueue_block_editor_assets', [ $this, 'enqueue_editor_warning' ] );
    }

    /**
     * Render callback for the legacy block using Slick.
     *
     * @param array  $attributes Block attributes.
     * @param string $content    Block save content.
     *
     * @return string Rendered block content.
     */
    public function render( $attributes, $content ) {
        if ( ! is_admin() ) {
            wp_enqueue_style(
                'carousel-block-slick-style',
                plugins_url( '/vendor/slick/slick.min.css', __FILE__ ),
                [],
                CB_VERSION
            );
            wp_enqueue_script(
                'carousel-block-slick-script',
                plugins_url( '/vendor/slick/slick.min.js', __FILE__ ),
                [ 'jquery' ],
                CB_VERSION,
                true
            );
            wp_enqueue_script(
                'carousel-block-slick-init',
                plugins_url( '/vendor/slick/init.js', __FILE__ ),
                [ 'jquery', 'carousel-block-slick-script' ],
                CB_VERSION,
                true
            );
        }
        return $content;
    }

    public function enqueue_editor_warning() {
        $asset_file = plugin_dir_path( __FILE__ ) . '../build/components/legacy-warning.asset.php';
        $script_url = plugins_url( '../build/components/legacy-warning.js', __FILE__ );
    
        $asset_data = file_exists( $asset_file )
            ? require $asset_file
            : [ 'dependencies' => [], 'version' => '1.0.0' ];
    
        wp_enqueue_script(
            'cb-legacy-warning',
            $script_url,
            $asset_data['dependencies'],
            $asset_data['version'],
            true
        );
    
        // Pass plugin settings to JS.
        $options = get_option( 'cb_carousel_settings', [] );
    
        wp_localize_script( 'cb-legacy-warning', 'cbLegacySettings', [
            'hideLegacyNotice' => (bool) Settings_Utils::get_setting( 'hide_legacy_notice', false ),
        ] );
    }   
}
