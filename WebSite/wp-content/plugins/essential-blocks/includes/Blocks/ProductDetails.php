<?php
namespace EssentialBlocks\Blocks;

use EssentialBlocks\Core\Block;
use EssentialBlocks\Utils\Helper;

class ProductDetails extends Block
{
    protected $frontend_styles = [ 'essential-blocks-frontend-style', 'essential-blocks-frontend-style' ];
    private $attributesList    = [  ];
    /**
     * Unique name of the block.
     *
     * @return string
     */
    public function get_name()
    {
        return 'product-details';
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
        'showDescriptionTab' => true,
        'showAdditionalTab'  => true,
        'showReviewsTab'     => true,
        'align'              => 'wide'
     ];

    public function eb_woo_remove_product_tabs( $tabs )
    {
        $attributes = $this->attributesList;

        if ( ! $attributes[ 'showDescriptionTab' ] ) {
            unset( $tabs[ 'description' ] );
        }

        if ( ! $attributes[ 'showAdditionalTab' ] ) {
            unset( $tabs[ 'additional_information' ] );
        }

        if ( ! $attributes[ 'showReviewsTab' ] ) {
            unset( $tabs[ 'reviews' ] );
        }

        return $tabs;
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

        $className = isset( $attributes[ "className" ] ) ? $attributes[ "className" ] : "";
        $classHook = isset( $attributes[ 'classHook' ] ) ? $attributes[ 'classHook' ] : '';

        $product = wc_get_product( get_the_ID() );
        if ( ! $product ) {
            return;
        }

        $_parent_classes = [
            'eb-parent-wrapper',
            'eb-parent-' . $attributes[ 'blockId' ],
            'root-' . $attributes[ 'blockId' ],
            'align' . $attributes[ 'align' ],
            $className,
            $classHook
         ];
        $_wrapper_classes = [
            'eb-product-details-wrapper',
            $attributes[ 'blockId' ]
         ];

        $parent_attributes  = get_block_wrapper_attributes( [ 'class' => implode( ' ', $_parent_classes ) ] );
        $wrapper_attributes = get_block_wrapper_attributes( [
            'class'   => implode( ' ', $_wrapper_classes ),
            'data-id' => $attributes[ 'blockId' ]
         ] );

        add_filter( 'woocommerce_product_tabs', [ $this, 'eb_woo_remove_product_tabs' ] );
        add_filter( 'woocommerce_product_additional_information_heading', '__return_null' );
        add_filter( 'woocommerce_product_description_heading', '__return_null' );

        ob_start();
        woocommerce_output_product_data_tabs();
        $productTab_markup = ob_get_clean();

        remove_filter( 'woocommerce_product_tabs', [ $this, 'eb_woo_remove_product_tabs' ] );
        remove_filter( 'woocommerce_product_additional_information_heading', '__return_null' );
        remove_filter( 'woocommerce_product_description_heading', '__return_null' );

        $wrapper = sprintf( '
        <div %1$s>
            <div %2$s>
                %3$s
            </div>
        </div>',
            $parent_attributes,
            $wrapper_attributes,
            $productTab_markup
        );

        return $wrapper;
    }
}
