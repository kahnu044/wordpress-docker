<?php
namespace EssentialBlocks\Blocks;

use EssentialBlocks\Core\Block;
use EssentialBlocks\Utils\Helper;
class AddToCart extends Block
{
    protected $frontend_styles = [ 'essential-blocks-frontend-style','essential-blocks-fontawesome' ];
    private $attributesList = [];
    /**
     * Unique name of the block.
     *
     * @return string
     */
    public function get_name()
    {
        return 'add-to-cart';
    }

    protected static $default_attributes = [
        'cartBtnText' => 'Add to cart',
        'showQuantity' => true,
     ];

    public function eb_single_add_to_cart_text() {
        $attributes = $this->attributesList;

        return $attributes['cartBtnText'];

     }

     public function eb_remove_quantity_fields( $return, $product ) {
        return true;
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

        $attributes = wp_parse_args( $attributes, self::$default_attributes );

        $this->attributesList = $attributes;


        $className  = isset( $attributes[ "className" ] ) ? $attributes[ "className" ] : "";
        $classHook  = isset( $attributes[ 'classHook' ] ) ? $attributes[ 'classHook' ] : '';

        $product = wc_get_product( get_the_ID() );
        if (!$product) return;

        $root_attributes = get_block_wrapper_attributes(
            [
                'class' => 'root-' . $attributes[ 'blockId' ]
             ]
        );

        $_parent_classes = [
            'eb-parent-wrapper',
            'eb-parent-' . $attributes[ 'blockId' ],
            $className,
            $classHook
         ];
        $_wrapper_classes = [
            'eb-add-to-cart-wrapper',
            $attributes[ 'blockId' ]
         ];


        if ( ! $attributes['showQuantity'] ) {
        add_filter( 'woocommerce_is_sold_individually', [ $this, 'eb_remove_quantity_fields'], 10, 2 );
        }
        add_filter( 'woocommerce_product_single_add_to_cart_text', [$this, 'eb_single_add_to_cart_text'] );

        ob_start();
        woocommerce_template_single_add_to_cart();
        $add_to_cart_markup = ob_get_clean();

        remove_filter( 'woocommerce_product_single_add_to_cart_text', [$this, 'eb_single_add_to_cart_text'] );

        $wrapper = sprintf( '
        <div %1$s>
            <div class="%2$s">
                <div class="%3$s" data-id="%4$s">
                    %5$s
                </div>
            </div>
        </div>',
            $root_attributes,
            implode( ' ', $_parent_classes ),
            implode( ' ', $_wrapper_classes),
            $attributes[ 'blockId' ],
            $add_to_cart_markup,
        );

        return $wrapper;
    }
}