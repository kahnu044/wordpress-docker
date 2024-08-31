<?php
namespace EssentialBlocks\Blocks;

use EssentialBlocks\Core\Block;

class FormTextField extends Block {
	/**
     * Unique name of the block.
	 * @return string
	 */
    public function get_name(){
        return 'form-text-field';
    }
}
