<?php
namespace EssentialBlocks\Blocks;

use EssentialBlocks\Core\Block;

class ParallaxSlider extends Block
{
    protected $frontend_scripts = [ 'essential-blocks-parallax-slider-frontend' ];
    /**
     * Unique name of the block.
     *
     * @return string
     */
    public function get_name()
    {
        return 'parallax-slider';
    }

    /**
     * Register all other scripts
     *
     * @return void
     */
    public function register_scripts()
    {
        $this->assets_manager->register(
            'parallax-slider-frontend',
            $this->path() . '/frontend.js',
            [ 'essential-blocks-babel-bundle' ]
        );
    }
}
