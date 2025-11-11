<?php
namespace EssentialBlocks\Blocks;

use EssentialBlocks\Utils\Helper;
use EssentialBlocks\Core\Block;

class PostMeta extends Block
{
    protected $frontend_styles = [ 'essential-blocks-fontawesome' ];

    /**
     * Default attributes
     *
     * @var array
     */
    protected $default_attributes;

    public function __construct()
    {
        $this->default_attributes = [
            'metaDisplay'     => 'inline',
            'showAuthor'      => true,
            'authorLabel'     => __( 'Author: ', 'essential-blocks' ),
            'showDate'        => true,
            'dateLabel'       => __( "Published Date: ", 'essential-blocks' ),
            'showProductSku'  => true,
            'productSkuLabel' => __( "SKU: ", 'essential-blocks' ),
            'type'            => 'post',
            'enableContents'  => [ "author", "date", "product_sku" ],
            'showMetaIcon'    => true,
            'authorIcon'      => 'far fa-circle-user',
            'dateIcon'        => 'far fa-calendar-days',
            'skuIcon'         => 'fas fa-barcode',
            'showAuthorPicture' => false,
            'authorPictureLink' => true,
            'authorPictureBorderRadius' => 50
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
     * Get post data based on context (Loop Builder or normal)
     *
     * @param array $context
     * @param bool $is_in_loop_builder
     * @return array
     */
    private function get_post_data( $context, $is_in_loop_builder )
    {
        if ( $is_in_loop_builder ) {
            // In Loop Builder context - use context post data
            $post_id = isset( $context[ 'essential-blocks/postId' ] ) ?
            $context[ 'essential-blocks/postId' ] :
            ( isset( $context[ 'postId' ] ) ? $context[ 'postId' ] : get_the_ID() );

            $post_type = isset( $context[ 'essential-blocks/postType' ] ) ?
            $context[ 'essential-blocks/postType' ] :
            ( isset( $context[ 'postType' ] ) ? $context[ 'postType' ] : get_post_type() );

            // Ensure we have a valid post ID before trying to get the post
            $current_post = ( $post_id && $post_id > 0 ) ? get_post( $post_id ) : null;
        } else {
            // Normal context - use current queried object
            $current_post = get_queried_object();

            // Fallback to global $post if queried object is not a post
            if ( ! $current_post || ! isset( $current_post->ID ) ) {
                global $post;
                $current_post = $post;
            }

            $post_id      = $current_post ? $current_post->ID : get_the_ID();
            $post_type    = $current_post ? $current_post->post_type : get_post_type();
        }

        return [
            'post'      => $current_post,
            'post_id'   => $post_id,
            'post_type' => $post_type
         ];
    }

    /**
     * Block render callback.
     *
     * Handles both normal post meta display and Loop Builder context.
     * When in Loop Builder context, uses the post data from the loop iteration
     * instead of the current queried object.
     *
     * @param mixed $attributes Block attributes
     * @param mixed $content Block content (unused but required by WP)
     * @param mixed $block Block object containing context
     * @return mixed Rendered HTML
     */
    public function render_callback( $attributes, $content, $block = null )
    {
        if ( is_admin() ) {
            return;
        }

        $attributes = wp_parse_args( $attributes, $this->default_attributes );

        $className = isset( $attributes[ "className" ] ) ? $attributes[ "className" ] : "";
        $classHook = isset( $attributes[ 'classHook' ] ) ? $attributes[ 'classHook' ] : '';

        // Check if we're in a Loop Builder context
        $context            = isset( $block->context ) ? $block->context : [  ];
        $is_in_loop_builder = $this->is_in_loop_builder_context( $context );

        // Get the appropriate post data based on context
        $post_data = $this->get_post_data( $context, $is_in_loop_builder );

        // Extract post data
        $current_post = $post_data[ 'post' ];
        $post_id      = $post_data[ 'post_id' ];
        $post_type    = $post_data[ 'post_type' ];

        // Check if we have a valid post object
        if ( ! $current_post || ! isset( $current_post->post_author ) ) {
            // Return empty data if no valid post is available
            return '';
        }

        // Get author name
        $author_name = get_the_author_meta( 'display_name', $current_post->post_author );

        // Get author avatar URL
        $author_avatar_url = get_avatar_url( $current_post->post_author, array( 'size' => 96 ) );

        // Get author URL
        $author_url = get_author_posts_url( $current_post->post_author );

        // Get published date with WordPress date format
        $date_format  = get_option( 'date_format' );
        $publish_date = isset( $current_post->post_date ) ? date( $date_format, strtotime( $current_post->post_date ) ) : '';

        // Get product SKU if applicable
        $product_sku = '';
        if ( $post_type === 'product' && function_exists( 'wc_get_product' ) ) {
            $product = wc_get_product( $post_id );
            if ( $product ) {
                $product_sku = $product->get_sku();
            }
        }

        $author_icon = sprintf(
            '%1$s',
            Helper::eb_render_icon( Helper::eb_get_icon_type( $attributes[ 'authorIcon' ] ), 'eb-post-metadata-icon', $attributes[ 'authorIcon' ] )
        );
        $date_icon = sprintf(
            '%1$s',
            Helper::eb_render_icon( Helper::eb_get_icon_type( $attributes[ 'dateIcon' ] ), 'eb-post-metadata-icon', $attributes[ 'dateIcon' ] )
        );
        $sku_icon = sprintf(
            '%1$s',
            Helper::eb_render_icon( Helper::eb_get_icon_type( $attributes[ 'skuIcon' ] ), 'eb-post-metadata-icon', $attributes[ 'skuIcon' ] )
        );

        $data = [
            'author'             => $author_name,
            'author_avatar_url'  => $author_avatar_url,
            'author_url'         => $author_url,
            'date'               => $publish_date,
            'product_sku'        => $product_sku,
            'show_meta_icon'     => $attributes[ 'showMetaIcon' ],
            'author_icon'        => $author_icon,
            'date_icon'          => $date_icon,
            'sku_icon'           => $sku_icon,
            'is_in_loop_builder' => $is_in_loop_builder,
            'post_id'            => $post_id,
            'post_type'          => $post_type
         ];

        ob_start();
        Helper::views( 'post-meta', array_merge( $attributes, [
            'className'    => $className,
            'classHook'    => $classHook,
            'meta_data'    => $data,
            'block_object' => $this
         ] ) );

        return ob_get_clean();
    }
}
