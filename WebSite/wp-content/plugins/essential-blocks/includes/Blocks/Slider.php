<?php

namespace EssentialBlocks\Blocks;

use EssentialBlocks\Core\Block;

class Slider extends Block
{
    protected $frontend_scripts = [
        'essential-blocks-slickjs',
        'essential-blocks-slick-lightbox-js',
        'essential-blocks-babel-bundle',
        'essential-blocks-vendor-bundle',
        'essential-blocks-slider-frontend'
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
            [ 'essential-blocks-controls-frontend', 'essential-blocks-slick-lightbox-js' ]
        );

        $this->assets_manager->register( 'slickjs', 'js/slick.min.js', [ 'jquery' ] );
    }
}
