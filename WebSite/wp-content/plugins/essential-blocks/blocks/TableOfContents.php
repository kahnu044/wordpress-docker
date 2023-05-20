<?php

namespace EssentialBlocks\blocks;

use EssentialBlocks\Core\Block;

class TableOfContents extends Block {
    protected $frontend_scripts = ['essential-blocks-table-of-contents-block-frontend'];

    /**
     * Unique name of the block.
     * @return string
     */
    public function get_name() {
        return 'table-of-contents';
    }

    /**
     * Register all other scripts
     * @return void
     */
    public function register_scripts() {
        $this->assets_manager->register(
            'table-of-contents-block-frontend',
            $this->path() . '/frontend/index.js',
            ['essential-blocks-eb-clipboard']
        );
    }
}
