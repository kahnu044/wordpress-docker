<?php
namespace EssentialBlocks\blocks;

use EssentialBlocks\Core\Block;

class AdvancedHeading extends Block {
    protected $frontend_styles = ['essential-blocks-frontend-style', 'essential-blocks-fontawesome'];

    /**
     * Unique name of the block.
     * @return string
     */
    public function get_name() {
        return 'advanced-heading';
    }
}
