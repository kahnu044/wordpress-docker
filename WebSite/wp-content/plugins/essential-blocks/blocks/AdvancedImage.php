<?php
namespace EssentialBlocks\blocks;

use EssentialBlocks\Core\Block;

use EssentialBlocks\Utils\Helper;

class AdvancedImage extends Block {
	protected $frontend_styles = array( 'essential-blocks-frontend-style', 'essential-blocks-fontawesome' );

	/**
	 * Unique name of the block.
	 *
	 * @return string
	 */
	public function get_name() {
		return 'advanced-image';
	}

    protected static $default_attributes = [
        'imgSource' => 'custom',
        'stylePreset' => 'rounded',
        'hoverEffect' => 'no-effect',
        'enableLink'  => false,
        'openInNewTab'=> false,
        'width'     => 120,
        'imagePostId' => 0,
        'imageSize' => '',
        'rel' => '',
    ];

    /**
     * Block render callback.
     *
     * @param mixed $attributes
     * @param mixed $content
     * @return mixed
     */
    public function render_callback( $attributes, $content ) {
        if ( is_admin()) {
            return;
        }
        $attributes = wp_parse_args( $attributes, self::$default_attributes );
        $className = isset( $attributes["className"] ) ? $attributes["className"] : "";
        $classHook = isset( $attributes['classHook'] ) ? $attributes['classHook'] : '';

        if ( $attributes['imgSource'] === 'custom') {
            return $content;
        } elseif($attributes['imgSource'] == 'site-logo') {
            ob_start();
            Helper::views( 'advanced-image/site-logo', array_merge( $attributes, [
                'className'     => $className,
                'classHook'     => $classHook,
            ] ) );
            return ob_get_clean();
        } elseif ($attributes['imgSource'] == 'featured-img') {
            ob_start();
            Helper::views( 'advanced-image/featured-image', array_merge( $attributes, [
                'className'     => $className,
                'classHook'     => $classHook,
            ] ) );
            return ob_get_clean();
        }

    }
}
