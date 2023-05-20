<?php
namespace EssentialBlocks\blocks;

use EssentialBlocks\Core\Block;

class Row extends Block {
    protected $frontend_styles = ['essential-blocks-frontend-style'];
	/**
     * Unique name of the block.
	 * @return string
	 */
    public function get_name(){
        return 'row';
    }

    /**
     * Initialize the InnerBlocks for Accordion
     * @return array<Block>
     */
    public function inner_blocks(){
        return [
            Column::get_instance(),
        ];
    }
}
