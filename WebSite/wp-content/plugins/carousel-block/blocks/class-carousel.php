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
            $use_full_swiper_bundle = Settings_Utils::get_setting( 'use_full_swiper_bundle', false );
            $swiper_asset_base = $use_full_swiper_bundle
                ? CB_PLUGIN_URL . '/blocks/vendor/swiper/swiper-bundle.min'
                : CB_PLUGIN_URL . '/build/vendor/swiper-custom';

            wp_enqueue_style(
                'cb-slider-style',
                $swiper_asset_base . '.css',
                [],
                CB_VERSION
            );
            wp_enqueue_script(
                'cb-slider-script',
                $swiper_asset_base . '.js',
                [],
                CB_VERSION,
                true
            );
        }
        return $content;
    }
}
