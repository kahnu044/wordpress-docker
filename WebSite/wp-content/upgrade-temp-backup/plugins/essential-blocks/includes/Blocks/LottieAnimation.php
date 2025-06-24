<?php
namespace EssentialBlocks\Blocks;

use EssentialBlocks\Core\Block;
use EssentialBlocks\Utils\Helper;
class LottieAnimation extends Block
{
    protected $frontend_scripts = [ 'essential-blocks-lottie-animation' ];

    /**
     * Unique name of the block.
     *
     * @return string
     */
    public function get_name()
    {
        return 'lottie-animation';
    }

    public function register_scripts()
    {
        $this->assets_manager->register(
            'lottie-animation',
            $this->path() . '/frontend.js',
            [ 'essential-blocks-vendor-bundle' ]
        );
    }
}
