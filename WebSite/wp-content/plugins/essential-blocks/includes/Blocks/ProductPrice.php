<?php
namespace EssentialBlocks\Blocks;

use EssentialBlocks\Core\Block;
use EssentialBlocks\Utils\Helper;

class ProductPrice extends Block
{
    protected $frontend_styles = [ 'essential-blocks-frontend-style', 'essential-blocks-fontawesome' ];

    /**
     * Unique name of the block.
     *
     * @return string
     */
    public function get_name()
    {
        return 'product-price';
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
        'showPrefix'     => false,
        'showSuffix'     => false,
        'prefixType'     => 'text',
        'prefixIcon'     => 'far fa-check-circle',
        'prefixText'     => 'Limited Time Offer',
        'suffixType'     => 'text',
        'suffixIcon'     => 'far fa-check-circle',
        'suffixText'     => 'Sales Ongoing',
        'pricePlacement' => 'left'
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
        $prefixType = isset( $attributes[ 'prefixType' ] ) ? $attributes[ 'prefixType' ] : '';
        $suffixType = isset( $attributes[ 'suffixType' ] ) ? $attributes[ 'suffixType' ] : '';
        $showPrefix = isset( $attributes[ 'showPrefix' ] ) ? $attributes[ 'showPrefix' ] : false;
        $showSuffix = isset( $attributes[ 'showSuffix' ] ) ? $attributes[ 'showSuffix' ] : false;

        $product = wc_get_product( get_the_ID() );
        if ( ! $product ) {
            return;
        }

        if ( $showPrefix === true && $prefixType === 'icon' ) {
            $prefix_icon = sprintf(
                '%1$s',
                Helper::eb_render_icon( Helper::eb_get_icon_type( $attributes[ 'prefixIcon' ] ), 'eb-button-icon', $attributes[ 'prefixIcon' ] )
            );
            $prefix_markup = sprintf(
                '<div class="prefix-wrap">%1$s</div>',
                $prefix_icon
            );
        } elseif ( $showPrefix === true && $prefixType === 'text' ) {
            $prefix_markup = sprintf(
                '<div class="prefix-wrap"><span>%1$s</span></div>',
                $attributes[ 'prefixText' ]
            );
        } else {
            $prefix_markup = '';
        }

        if ( $showSuffix === true && $suffixType === 'icon' ) {
            $suffix_icon = sprintf(
                '%1$s',
                Helper::eb_render_icon( Helper::eb_get_icon_type( $attributes[ 'suffixIcon' ] ), 'eb-button-icon', $attributes[ 'suffixIcon' ] )
            );
            $suffix_markup = sprintf(
                '<div class="suffix-wrap">%1$s</div>',
                $suffix_icon
            );
        } elseif ( $showSuffix === true && $suffixType === 'text' ) {
            $suffix_markup = sprintf(
                '<div class="suffix-wrap"><span>%1$s</span></div>',
                $attributes[ 'suffixText' ]
            );
        } else {
            $suffix_markup = '';
        }

        $_parent_classes = [
            'eb-parent-wrapper',
            'eb-parent-' . $attributes[ 'blockId' ],
            'root-' . $attributes[ 'blockId' ],
            $className,
            $classHook
         ];
        $_wrapper_classes = [
            'eb-product-price-wrapper',
            $attributes[ 'blockId' ],
            $attributes[ 'pricePlacement' ]
         ];

        $parent_attributes  = get_block_wrapper_attributes( [ 'class' => implode( ' ', $_parent_classes ) ] );
        $wrapper_attributes = get_block_wrapper_attributes( [
            'class'   => implode( ' ', $_wrapper_classes ),
            'data-id' => $attributes[ 'blockId' ]
         ] );

        ob_start();
        Helper::views( 'woocommerce/price', array_merge( $attributes, [
            'className' => $className,
            'classHook' => $classHook,
            'product'   => $product
         ] ) );
        $rating_markup = ob_get_clean();

        $wrapper = sprintf( '
        <div %1$s>
            <div %2$s>
                %3$s
                %4$s
                %5$s
            </div>
        </div>',
            $parent_attributes,
            $wrapper_attributes,
            $prefix_markup,
            $rating_markup,
            $suffix_markup
        );

        return wp_kses_post( $wrapper );
    }
}
