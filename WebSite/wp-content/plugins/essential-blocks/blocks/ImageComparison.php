<?php
namespace EssentialBlocks\blocks;

use EssentialBlocks\Core\Block;

class ImageComparison extends Block {
    protected $frontend_scripts = ['essential-blocks-image-comparison-frontend'];
    protected $frontend_styles = [];
	/**
     * Unique name of the block.
	 * @return string
	 */
    public function get_name(){
        return 'image-comparison';
    }

    /**
     * Register all other scripts
     * @return void
     */
    public function register_scripts(){
        $this->assets_manager->register(
            'image-comparison-frontend',
            $this->path() . '/frontend/index.js',
            ['essential-blocks-vendor-bundle']
        );
    }
}
