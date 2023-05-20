<?php

namespace EssentialBlocks\blocks;

use EssentialBlocks\Core\Block;

class Wrapper extends Block {
    protected $frontend_styles  = [];

	/**
     * Unique name of the block.
	 * @return string
	 */
    public function get_name(){
        return 'wrapper';
    }
}