<?php
namespace CarouselSliderBlock\Blocks;

use CarouselSliderBlock\Admin\Settings_Utils;

class Carousel_Legacy {
    /**
     * Registers the legacy carousel and slide blocks.
     */
    public function register() {
        // Legacy Carousel block without block.json.
        wp_register_script(
            'cb-carousel-editor',
            plugins_url( '../build/carousel-legacy/index.js', __FILE__ ),
            [ 'react', 'wp-block-editor', 'wp-blocks', 'wp-components', 'wp-data', 'wp-element', 'wp-i18n' ],
            CB_VERSION,
            true
        );

        wp_register_style(
            'cb-carousel-editor-style',
            plugins_url( '../build/carousel-legacy/index.css', __FILE__ ),
            [ 'wp-edit-blocks' ],
            CB_VERSION
        );
        wp_register_style(
            'cb-carousel-style',
            plugins_url( '../build/carousel-legacy/style-index.css', __FILE__ ),
            [],
            CB_VERSION
        );

        register_block_type( 'cb/carousel', [
            'api_version'   => 3,
            'title'         => __( 'Carousel Slider', 'cb' ),
            'version'       => '1.0.0',
            'category'      => 'design',
            'description'   => __( 'Display a carousel with any blocks in the slides.', 'cb' ),
            'editor_script' => 'cb-carousel-editor',
            'editor_style'  => 'cb-carousel-editor-style',
            'style'         => 'cb-carousel-style',
            'supports'      => [
                'align'  => [ 'wide', 'full' ],
                'html'   => false,
                'anchor' => true,
            ],
            'attributes'    => [
                'slides' => [
                    'type' => 'number',
                ],
                'slidesToShow' => [
                    'type'    => 'number',
                    'default' => 3,
                ],
                'scrollGroup' => [
                    'type'    => 'boolean',
                    'default' => false,
                ],
                'slidesToScroll' => [
                    'type'    => 'number',
                    'default' => 1,
                ],
                'speed' => [
                    'type'    => 'number',
                    'default' => 300,
                ],
                'slidePadding' => [
                    'type' => 'boolean',
                ],
                'arrows' => [
                    'type'    => 'boolean',
                    'default' => true,
                ],
                'dots' => [
                    'type'    => 'boolean',
                    'default' => true,
                ],
                'autoplay' => [
                    'type'    => 'boolean',
                    'default' => false,
                ],
                'autoplaySpeed' => [
                    'type'    => 'number',
                    'default' => 3000,
                ],
                'infinite' => [
                    'type'    => 'boolean',
                    'default' => false,
                ],
                'rtl' => [
                    'type' => 'boolean',
                ],
                'responsiveWidth' => [
                    'type'    => 'number',
                    'default' => 768,
                ],
                'responsiveSlides' => [
                    'type'    => 'number',
                    'default' => 1,
                ],
                'responsiveSlidesToScroll' => [
                    'type'    => 'number',
                    'default' => 1,
                ],
            ],
            'render_callback' => [ $this, 'render' ],
        ] );

        // Legacy Slide block without block.json
        wp_register_script(
            'cb-slide-editor',
            plugins_url( '../build/slide-legacy/index.js', __FILE__ ),
            [ 'react', 'wp-block-editor', 'wp-blocks', 'wp-components', 'wp-data', 'wp-element', 'wp-i18n' ],
            CB_VERSION,
            true
        );

        register_block_type( 'cb/slide', [
            'api_version'   => 3,
            'title'         => __( 'Slide', 'cb' ),
            'description'   => __( 'A single slide within the carousel.', 'cb' ),
            'category'      => 'design',
            'icon'          => 'slides',
            'parent'        => [ 'cb/carousel' ],
            'supports'      => [ 'html' => false ],
            'version'       => '1.0.0',
            'editor_script' => 'cb-slide-editor',
        ] );

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

    /**
     * Enqueues the legacy warning script in the block editor.
     *
     * @return void
     */
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
