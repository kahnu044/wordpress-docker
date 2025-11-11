<?php
namespace EssentialBlocks\Blocks;

use EssentialBlocks\Core\Block;

class Button extends Block
{
    protected $frontend_styles = [ 'essential-blocks-fontawesome', 'essential-blocks-hover-css' ];

    /**
     * Unique name of the block.
     *
     * @return string
     */
    public function get_name()
    {
        return 'button';
    }

    /**
     * Check if we're in a Loop Builder/Post Template context
     *
     * @param array $context
     * @return bool
     */
    private function is_in_loop_builder_context( $context )
    {
        return isset( $context['essential-blocks/isLoopBuilder'] ) && $context['essential-blocks/isLoopBuilder'] === true;
    }

    /**
     * Block render callback.
     * If the button is inside the Post Template (Loop Builder) context, update the link
     * to the current post permalink and force the button text to "Read More".
     *
     * @param array    $attributes
     * @param string   $content
     * @param \WP_Block|null $block
     * @return string
     */
    public function render_callback( $attributes, $content, $block = null )
    {
        if ( is_admin() ) {
            return;
        }

        // Only modify when we have content and block context is available
        if ( empty( $content ) || ! $block ) {
            return $content;
        }

        $context            = isset( $block->context ) ? $block->context : [];
        $is_in_loop_builder = $this->is_in_loop_builder_context( $context );

        if ( ! $is_in_loop_builder ) {
            // Not in Loop Builder, keep original content
            return $content;
        }

        // Determine the post ID from context (fallback to global)
        $post_id = isset( $context['essential-blocks/postId'] ) ? intval( $context['essential-blocks/postId'] ) : 0;
        if ( $post_id <= 0 ) {
            $post_id = get_the_ID();
        }

        if ( ! $post_id ) {
            return $content;
        }

        $permalink  = get_the_permalink( $post_id );
        $read_more  = esc_html__( 'Read More', 'essential-blocks' );

        // Safely update the anchor href and button text using DOMDocument
        $html = '<!DOCTYPE html><html><head><meta charset="' . esc_attr( get_bloginfo( 'charset' ) ) . '"></head><body>' . $content . '</body></html>';
        $dom  = new \DOMDocument();
        libxml_use_internal_errors( true );
        if ( ! $dom->loadHTML( $html ) ) {
            libxml_clear_errors();
            return $content;
        }
        libxml_clear_errors();

        $xpath = new \DOMXPath( $dom );
        // Find the anchor element rendered by the Button block
        $anchorNodes = $xpath->query( "//a[contains(concat(' ', normalize-space(@class), ' '), ' eb-button-anchor ')]" );
        if ( $anchorNodes && $anchorNodes->length > 0 ) {
            /** @var \DOMElement $anchor */
            $anchor = $anchorNodes->item( 0 );
            $anchor->setAttribute( 'href', esc_url( $permalink ) );

            // Update the text node inside .eb-button-text if present
            $textNodes = $xpath->query( ".//*[contains(concat(' ', normalize-space(@class), ' '), ' eb-button-text ')]", $anchor );
            if ( $textNodes && $textNodes->length > 0 ) {
                /** @var \DOMElement $textEl */
                $textEl = $textNodes->item( 0 );
                // Remove all children and set text content
                while ( $textEl->firstChild ) {
                    $textEl->removeChild( $textEl->firstChild );
                }
                $textEl->appendChild( $dom->createTextNode( $read_more ) );
            }
        }

        // Extract body innerHTML back
        $body    = $dom->getElementsByTagName( 'body' )->item( 0 );
        $updated = '';
        foreach ( $body->childNodes as $child ) {
            $updated .= $dom->saveHTML( $child );
        }

        return $updated ?: $content;
    }
}
