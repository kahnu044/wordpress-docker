<?php
namespace EssentialBlocks\Blocks;

use EssentialBlocks\Core\Block;

class Notice extends Block {
    protected $frontend_scripts = [ 'essential-blocks-notice-frontend' ];
    /**
     * Unique name of the block.
     *
     * @return string
     */
    public function get_name() {
        return 'notice';
    }

    /**
     * Register all other scripts
     *
     * @return void
     */
    public function register_scripts() {
        $this->assets_manager->register(
            'notice-frontend',
            $this->path() . '/frontend.js'
        );
    }
}
