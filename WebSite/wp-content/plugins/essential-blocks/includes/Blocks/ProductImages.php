<?php
namespace EssentialBlocks\blocks;

use EssentialBlocks\Core\Block;
use EssentialBlocks\Utils\Helper;

class ProductImages extends Block
{
    protected $frontend_styles = [
        'essential-blocks-frontend-style',
        'essential-blocks-slick-style'
     ];

    protected $frontend_scripts = [
        'essential-blocks-product-images-frontend',
        'essential-blocks-slickjs',
        'essential-blocks-zoom',
        'essential-blocks-fslightbox-js',
        'essential-blocks-vendor-bundle'
     ];

    /**
     * Register all other scripts
     * @return void
     */
    public function register_scripts()
    {
        $this->assets_manager->register(
            'product-images-frontend',
            $this->path() . '/frontend.js',
        );
    }

    /**
     * Default attributes
     *
     * @var array
     */
    protected $default_attributes;

    public function __construct()
    {
        $this->default_attributes = [
            'useAdaptiveHeight'  => true,
            'galleryPosition' => 'bottom',
            'disableNavArrow' => false
         ];
    }

    /**
     * Unique name of the block.
     * @return string
     */
    public function get_name()
    {
        return 'product-images';
    }

    //Enable block only if woocommerce active
    public function can_enable()
    {
        $active_plugins = Helper::get_active_plugin_list();
        if ( in_array( 'woocommerce/woocommerce.php', $active_plugins ) ) {
            return true;
        }
        return false;
    }

    /**
     * Block render callback.
     *
     * @param mixed $attributes
     * @param mixed $content
     * @return mixed
     */
    public function render_callback( $attributes, $content )
    {
        if ( is_admin() ) {
            return;
        }

        $attributes = wp_parse_args( $attributes, $this->default_attributes );
        error_log(print_r($attributes,1));

        $className = isset( $attributes[ "className" ] ) ? $attributes[ "className" ] : "";
        $classHook = isset( $attributes[ 'classHook' ] ) ? $attributes[ 'classHook' ] : '';

        // large image slider settings
        $settings = [
            'adaptiveHeight' => isset( $attributes[ 'useAdaptiveHeight' ] ) ? $attributes[ 'useAdaptiveHeight' ] : true
         ];

        // nav settings
        $nav_settings = [
            'galleryPosition' => isset( $attributes[ 'galleryPosition' ] ) ? $attributes[ 'galleryPosition' ] : 'bottom',
            'disableNavArrow' => isset( $attributes['disableNavArrow'] ) ? $attributes['disableNavArrow'] : false
         ];

        ob_start();
        Helper::views( 'product-images', array_merge( $attributes, [
            'className'    => $className,
            'classHook'    => $classHook,
            'settings'     => $settings,
            'nav_settings' => $nav_settings,
            'block_object' => $this
         ] ) );

        return ob_get_clean();
    }
}
