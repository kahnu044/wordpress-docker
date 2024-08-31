<?php

namespace EssentialBlocks\Blocks;

use EssentialBlocks\Core\Block;

class Testimonial extends Block {
    protected $frontend_scripts = [];
    protected $frontend_styles  = [ 'essential-blocks-frontend-style', 'essential-blocks-fontawesome' ];

    /**
     * Unique name of the block.
     *
     * @return string
     */
    public function get_name() {
        return 'testimonial';
    }
}
