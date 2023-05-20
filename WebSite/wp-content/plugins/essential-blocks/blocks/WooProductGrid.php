<?php

namespace EssentialBlocks\blocks;

use WP_Query;
use EssentialBlocks\Core\Block;
use EssentialBlocks\API\Product;
use EssentialBlocks\Utils\Helper;

class WooProductGrid extends Block {
    protected $frontend_scripts = ['essential-blocks-woo-product-grid-frontend'];
    protected $frontend_styles  = ['essential-blocks-fontawesome', 'essential-blocks-frontend-style'];

    /**
     * Unique name of the block.
     * @return string
     */
    public function get_name() {
        return 'woo-product-grid';
    }

    /**
     * Register all other scripts
     * @return void
     */
    public function register_scripts() {
        $this->assets_manager->register(
            'woo-product-grid-frontend',
            $this->path() . '/frontend/index.js'
        );
    }

    public function get_array_column( $data, $handle ) {
        $_no_error = true;
        if ( ! is_array( $data ) ) {
            $data      = json_decode( $data, true );
            $_no_error = json_last_error() === JSON_ERROR_NONE;
        }

        return $_no_error ? array_column( $data, $handle ) : $data;
    }

    /**
     * Render Callback
     *
     * @param mixed $attributes
     * @param mixed $content
     * @return void|string
     */
    public function render_callback( $attributes, $content ) {
        if ( ! function_exists( '\WC' ) || is_admin() ) {
            return;
        }

        $_essential_attributes = [
            'layout'            => 'grid',
            'gridPreset'        => 'grid-preset-1',
            'listPreset'        => 'list-preset-1',
            'saleBadgeAlign'    => 'align-left',
            'saleText'          => 'sale',
            'showRating'        => true,
            'showPrice'         => true,
            'showSaleBadge'     => true,
            'productDescLength' => 5,
            'isCustomCartBtn'   => false,
            'simpleCartText'    => 'Buy Now',
            'variableCartText'  => 'Select Options',
            'groupedCartText'   => 'View Products',
            'externalCartText'  => 'Buy Now',
            'defaultCartText'   => 'Read More'
        ];

        foreach ( $_essential_attributes as $key => $value ) {
            if ( isset( $attributes[$key] ) && is_bool( $attributes[$key] ) ) {
                $_essential_attributes[$key] = $attributes[$key];
            } elseif ( ! empty( $attributes[$key] ) ) {
                $_essential_attributes[$key] = $attributes[$key];
            } else {
                $_essential_attributes[$key] = $value;
            }
        }

        $args = isset( $attributes['queryData'] ) ? $attributes['queryData'] : [];

        $_normalize = [
            'orderby'  => 'date',
            'order'    => 'desc',
            'category' => [],
            'tag'      => []
        ];

        foreach ( $_normalize as $key => $value ) {
            $args[$key] = ! empty( $args[$key] ) ? implode( ',', $this->get_array_column( $args[$key], 'value' ) ) : $value;
        }

        $args = wp_parse_args( $args, [
            'per_page' => 10,
            'offset'   => 0
        ] );

        $query = new WP_Query( Product::query_builder( $args ) );

        $blockId   = isset( $attributes["blockId"] ) ? $attributes["blockId"] : "";
        $classHook = isset( $attributes["classHook"] ) ? $attributes["classHook"] : "";

        ob_start();

        Helper::views( 'product-grid', array_merge( $_essential_attributes, [
            'blockId'         => $blockId,
            'classHook'       => $classHook,
            'query'           => $query,
            'essentialAttr'   => $_essential_attributes,
            'loadMoreOptions' => isset( $attributes["loadMoreOptions"] ) ? $attributes["loadMoreOptions"] : [],
            'queryData'       => $args
        ] ) );

        return ob_get_clean();
    }
}
