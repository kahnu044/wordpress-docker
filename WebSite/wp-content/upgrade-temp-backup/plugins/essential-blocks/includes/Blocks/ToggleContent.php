<?php

namespace EssentialBlocks\Blocks;

use EssentialBlocks\Core\Block;

class ToggleContent extends Block
{
    protected $frontend_scripts = [ 'essential-blocks-toggle-content-frontend' ];

    /**
     * Unique name of the block.
     *
     * @return string
     */
    public function get_name()
    {
        return 'toggle-content';
    }

    /**
     * Register all other scripts
     *
     * @return void
     */
    public function register_scripts()
    {
        $this->assets_manager->register(
            'toggle-content-frontend',
            $this->path() . '/frontend.js'
        );
    }
}
