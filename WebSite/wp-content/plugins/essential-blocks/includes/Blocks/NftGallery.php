<?php
namespace EssentialBlocks\Blocks;

use EssentialBlocks\Core\Block;

class NftGallery extends Block {
	protected $frontend_scripts = array( 'essential-blocks-nft-gallery-frontend' );
	protected $frontend_styles  = array( 'essential-blocks-frontend-style' );
	/**
	 * Unique name of the block.
	 *
	 * @return string
	 */
	public function get_name() {
		return 'nft-gallery';
	}

	/**
	 * Register all other scripts
	 *
	 * @return void
	 */
	public function register_scripts() {
		$this->assets_manager->register(
			'nft-gallery-frontend',
			$this->path() . '/frontend.js',
            ['essential-blocks-vendor-bundle']
		);
	}
}