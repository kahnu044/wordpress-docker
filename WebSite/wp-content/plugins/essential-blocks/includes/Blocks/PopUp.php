<?php
namespace EssentialBlocks\Blocks;

use EssentialBlocks\Core\Block;

class Popup extends Block
{
    protected $frontend_scripts = [ 'essential-blocks-popup-frontend' ];
    protected $frontend_styles  = [ 'essential-blocks-frontend-style' ];
    /**
     * Unique name of the block.
     *
     * @return string
     */
    public function get_name()
    {
        return 'popup';
    }

    /**
     * Register all other scripts
     *
     * @return void
     */
    public function register_scripts()
    {
        $this->assets_manager->register(
            'popup-frontend',
            $this->path() . '/frontend.js',
            [ 'essential-blocks-babel-bundle' ]
        );
    }
}
