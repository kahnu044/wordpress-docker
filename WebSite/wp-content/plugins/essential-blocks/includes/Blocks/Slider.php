<?php

namespace EssentialBlocks\Blocks;

use EssentialBlocks\Core\Block;

class Slider extends Block
{
    protected $frontend_scripts = [
        'essential-blocks-slider-frontend',
        'essential-blocks-slickjs',
        'essential-blocks-slick-lightbox-js',
        'essential-blocks-vendor-bundle'
     ];
    protected $frontend_styles = [ 'essential-blocks-fontawesome', 'essential-blocks-slick-style', 'essential-blocks-common-style', 'essential-blocks-slick-lightbox-style' ];

    /**
     * Unique name of the block.
     *
     * @return string
     */
    public function get_name()
    {
        return 'slider';
    }

    /**
     * Register all other scripts
     *
     * @return void
     */
    public function register_scripts()
    {
        $this->assets_manager->register(
            'slider-frontend',
            $this->path() . '/frontend.js',
            [ 'jquery', 'essential-blocks-controls-frontend', 'essential-blocks-slick-lightbox-js' ]
        );
    }
}
