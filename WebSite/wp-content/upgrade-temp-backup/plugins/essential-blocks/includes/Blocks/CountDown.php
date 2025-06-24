<?php
namespace EssentialBlocks\Blocks;

use EssentialBlocks\Core\Block;

class CountDown extends Block
{
    protected $frontend_scripts = [ 'essential-blocks-countdown-block-frontend' ];

    /**
     * Unique name of the block.
     *
     * @return string
     */
    public function get_name()
    {
        return 'countdown';
    }

    /**
     * Register all other scripts
     *
     * @return void
     */
    public function register_scripts()
    {
        $this->assets_manager->register(
            'countdown-block-frontend',
            $this->path() . '/frontend.js'
        );
    }
}
