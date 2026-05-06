<?php
namespace EssentialBlocks\Blocks;

use EssentialBlocks\Core\Block;

class Timeline extends Block
{
    protected $frontend_scripts = [ 'essential-blocks-timeline-frontend' ];
    protected $frontend_styles  = ['essential-blocks-fontawesome'];

    /**
     * Unique name of the block.
     *
     * @return string
     */
    public function get_name()
    {
        return 'timeline';
    }

    /**
     * Register all other scripts
     *
     * @return void
     */
    public function register_scripts()
    {
        $this->assets_manager->register(
            'timeline-frontend',
            $this->path() . '/frontend.js'
        );
    }
}
