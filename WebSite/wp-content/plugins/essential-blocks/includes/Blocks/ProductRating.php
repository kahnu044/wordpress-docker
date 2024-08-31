<?php
namespace EssentialBlocks\Blocks;

use EssentialBlocks\Core\Block;
use EssentialBlocks\Utils\Helper;

class ProductRating extends Block
{
    protected $frontend_styles = [ 'essential-blocks-frontend-style', 'essential-blocks-fontawesome' ];

    /**
     * Unique name of the block.
     *
     * @return string
     */
    public function get_name()
    {
        return 'product-rating';
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

    protected static $default_attributes = [
        'showReviewCount' => true,
        'showEmptyRating' => false,
        'singluarCaption' => ' Customer Rating',
        'pluralCaption'   => ' Customer Ratings',
        'emptyCaption'    => ' No Customer Ratings',
        'beforeCaption'   => '(',
        'afterCaption'    => ')',
        'starsVariation'  => 'far fa-star'
     ];

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

        $attributes = wp_parse_args( $attributes, self::$default_attributes );
        $className  = isset( $attributes[ "className" ] ) ? $attributes[ "className" ] : "";
        $classHook  = isset( $attributes[ 'classHook' ] ) ? $attributes[ 'classHook' ] : '';

        $product = wc_get_product( get_the_ID() );
        if ( ! $product ) {
            return;
        }

        $ratingCount = $product->get_rating_count();

        if ( $attributes[ 'showEmptyRating' ] === false && $ratingCount === 0 ) {
            return;
        }

        $_parent_classes = [
            'eb-parent-wrapper',
            'eb-parent-' . $attributes[ 'blockId' ],
            'root-' . $attributes[ 'blockId' ],
            $className,
            $classHook
         ];
        $_wrapper_classes = [
            'eb-product-rating-wrapper',
            $attributes[ 'blockId' ]
         ];

        $parent_attributes  = get_block_wrapper_attributes( [ 'class' => implode( ' ', $_parent_classes ) ] );
        $wrapper_attributes = get_block_wrapper_attributes( [
            'class'   => implode( ' ', $_wrapper_classes ),
            'data-id' => $attributes[ 'blockId' ]
         ] );

        ob_start();
        Helper::views( 'woocommerce/single-rating', array_merge( $attributes, [
            'className' => $className,
            'classHook' => $classHook,
            'product'   => $product
         ] ) );
        $rating_markup = ob_get_clean();

        $wrapper = sprintf( '
        <div %1$s>
            <div %2$s>
                %3$s
            </div>
        </div>',
            $parent_attributes,
            $wrapper_attributes,
            $rating_markup
        );

        return wp_kses_post( $wrapper );
    }
}
