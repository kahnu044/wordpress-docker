<?php
namespace EssentialBlocks\blocks;

use EssentialBlocks\Core\Block;

class AdvancedTabs extends Block {
    protected $frontend_scripts = ['essential-blocks-advanced-tabs-frontend'];
    protected $frontend_styles  = ['essential-blocks-frontend-style', 'essential-blocks-fontawesome'];

	/**
     * Unique name of the block.
	 * @return string
	 */
    public function get_name(){
        return 'advanced-tabs';
    }

    /**
     * Initialize the InnerBlocks for Accordion
     * @return array<Block>
     */
    public function inner_blocks(){
        return [
            Tab::get_instance(),
        ];
    }

    /**
     * Register all other scripts
     * @return void
     */
    public function register_scripts(){
        $this->assets_manager->register(
            'advanced-tabs-frontend',
            $this->path() . '/frontend/index.js'
        );
    }
}
