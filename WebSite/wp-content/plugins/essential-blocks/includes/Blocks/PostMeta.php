<?php
namespace EssentialBlocks\blocks;

use EssentialBlocks\Utils\Helper;
use EssentialBlocks\Core\Block;

class PostMeta extends Block
{
    protected $frontend_styles = [ 'essential-blocks-frontend-style' ];

     /**
     * Default attributes
     *
     * @var array
     */
    protected $default_attributes;

    public function __construct()
    {
        $this->default_attributes = [
            'metaDisplay'       => 'inline',
            'showAuthor'        => true,
            'authorLabel'       => __('Author: ','essential-blocks'),
            'showDate'          => true,
            'dateLabel'         => __("Published Date: ",'essential-blocks'),
            'showProductSku'    => true,
            'productSkuLabel'   => __("SKU: ",'essential-blocks'),
            'type'              => 'post',
            'enableContents'    => ["author", "date", "product_sku"]
        ];
    }

    /**
     * Unique name of the block.
     * @return string
     */
    public function get_name()
    {
        return 'post-meta';
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

        $className = isset( $attributes[ "className" ] ) ? $attributes[ "className" ] : "";
        $classHook = isset( $attributes[ 'classHook' ] ) ? $attributes[ 'classHook' ] : '';

        $current_post = get_queried_object();
        // author name
        $author_name = get_the_author_meta('display_name', $current_post->post_author);
        // published date
        $date_format = get_option( 'date_format' );
        $publish_date = date($date_format, strtotime($current_post->post_date));
        // product sku
        $product_sku = '';
        if($current_post->post_type === 'product') {
            $product = wc_get_product( get_the_ID() );
            $product_sku = $product->get_sku();
        }


        $data = [
            'author'        => $author_name,
            'date'          => $publish_date,
            'product_sku'   => $product_sku
        ];

        ob_start();
        Helper::views( 'post-meta', array_merge( $attributes, [
            'className'     => $className,
            'classHook'     => $classHook,
            'meta_data'     => $data,
            'block_object'  => $this
         ] ) );

        return ob_get_clean();
    }
}