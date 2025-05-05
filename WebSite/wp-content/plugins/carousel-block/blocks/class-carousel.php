<?php
namespace CarouselSliderBlock\Blocks;

use CarouselSliderBlock\Admin\Settings_Utils;

class Carousel {
    /**
     * Registers the carousel and slide blocks.
     */
    public function register() {
        \register_block_type( CB_PLUGIN_DIR . '/build/carousel', [
            'render_callback' => [ $this, 'render' ],
        ]);
        \register_block_type( CB_PLUGIN_DIR . '/build/slide' );
    }

    /**
     * Render callback for the block using Swiper.
     *
     * @param array  $attributes Block attributes.
     * @param string $content    Block save content.
     *
     * @return string Rendered block content.
     */
    public function render( $attributes, $content ) {
        if ( ! is_admin() ) {
            wp_enqueue_style(
                'cb-slider-style',
                plugins_url( '/vendor/swiper/swiper-bundle.min.css', __FILE__ ),
                [],
                CB_VERSION
            );
            wp_enqueue_script(
                'cb-slider-script',
                plugins_url( '/vendor/swiper/swiper-bundle.min.js', __FILE__ ),
                [],
                CB_VERSION,
                true
            );
        }
        return $content;
    }
}
