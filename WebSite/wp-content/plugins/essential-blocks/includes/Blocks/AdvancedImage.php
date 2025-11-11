<?php
namespace EssentialBlocks\Blocks;

use EssentialBlocks\Core\Block;

use EssentialBlocks\Utils\Helper;

class AdvancedImage extends Block
{
    protected $frontend_styles = [ 'essential-blocks-fontawesome' ];

    /**
     * Unique name of the block.
     *
     * @return string
     */
    public function get_name()
    {
        return 'advanced-image';
    }

    protected static $default_attributes = [
        'imgSource'    => 'custom',
        'stylePreset'  => 'rounded',
        'hoverEffect'  => 'no-effect',
        'enableLink'   => false,
        'openInNewTab' => false,
        'width'        => 120,
        'imagePostId'  => 0,
        'imageSize'    => '',
        'rel'          => ''
     ];

    /**
     * Check if we're in a Loop Builder context
     *
     * @param array $context
     * @return bool
     */
    private function is_in_loop_builder_context( $context )
    {
        return isset( $context[ 'essential-blocks/isLoopBuilder' ] ) &&
            $context[ 'essential-blocks/isLoopBuilder' ] === true;
    }

    /**
     * Block render callback.
     *
     * @param mixed $attributes
     * @param mixed $content
     * @param mixed $block Block object containing context
     * @return mixed
     */
    public function render_callback( $attributes, $content, $block = null )
    {
        if ( is_admin() ) {
            return;
        }
        $attributes = wp_parse_args( $attributes, self::$default_attributes );
        $className  = isset( $attributes[ "className" ] ) ? $attributes[ "className" ] : "";
        $classHook  = isset( $attributes[ 'classHook' ] ) ? $attributes[ 'classHook' ] : '';

        // Check if we're in a Loop Builder context
        $context            = isset( $block->context ) ? $block->context : [];
        $is_in_loop_builder = $this->is_in_loop_builder_context( $context );

        if ( $attributes[ 'imgSource' ] === 'custom' ) {
            return $content;
        } elseif ( $attributes[ 'imgSource' ] == 'site-logo' ) {
            ob_start();
            Helper::views( 'advanced-image/site-logo', array_merge( $attributes, [
                'className' => $className,
                'classHook' => $classHook
             ] ) );
            return ob_get_clean();
        } elseif ( $attributes[ 'imgSource' ] == 'featured-img' ) {
            ob_start();
            Helper::views( 'advanced-image/featured-image', array_merge( $attributes, [
                'className' => $className,
                'classHook' => $classHook,
                'isInLoopBuilder' => $is_in_loop_builder,
                'placeholderImageUrl' => defined('ESSENTIAL_BLOCKS_PLACEHOLDER_IMAGE') ? \ESSENTIAL_BLOCKS_PLACEHOLDER_IMAGE : \ESSENTIAL_BLOCKS_URL . 'assets/images/placeholder.png'
             ] ) );
            return ob_get_clean();
        }
    }
}
