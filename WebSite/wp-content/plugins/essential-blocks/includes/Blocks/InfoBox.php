<?php
namespace EssentialBlocks\Blocks;

use EssentialBlocks\Core\Block;

class InfoBox extends Block
{
    protected $frontend_styles = [
        'essential-blocks-fontawesome',
        'essential-blocks-hover-css'
    ];

    protected $frontend_scripts = [
        'essential-blocks-infobox-frontend'
    ];

    /**
     * Unique name of the block.
     *
     * @return string
     */
    public function get_name()
    {
        return 'infobox';
    }

    /**
     * Register scripts for the block.
     */
    public function register_scripts()
    {
        $this->assets_manager->register(
            'infobox-frontend',
            'blocks/infobox/frontend.js',
            ['wp-dom-ready', 'essential-blocks-controls-frontend']
        );
    }
}
