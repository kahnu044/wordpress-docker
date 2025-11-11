<?php
namespace EssentialBlocks\Blocks;

use EssentialBlocks\Core\Block;

class Text extends Block
{

    /**
     * Unique name of the block.
     *
     * @return string
     */
    public function get_name()
    {
        return 'text';
    }

    protected static $default_attributes = [
        'source'       => 'custom',
        'tagName'      => 'p',
        'enableLink'   => false,
        'openInNewTab' => false,
        'excerptLength' => 20
     ];

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
     * Get post ID from context (Loop Builder) or current post
     *
     * @param array $context
     * @param bool $is_in_loop_builder
     * @return int
     */
    private function get_post_id( $context, $is_in_loop_builder )
    {
        if ( $is_in_loop_builder ) {
            // In Loop Builder context - use context post data
            return isset( $context[ 'essential-blocks/postId' ] ) ?
                $context[ 'essential-blocks/postId' ] :
                ( isset( $context[ 'postId' ] ) ? $context[ 'postId' ] : get_the_ID() );
        }

        // Normal context - use current post
        return get_the_ID();
    }

    /**
     * Truncate excerpt content based on word count
     *
     * @param string $excerpt
     * @param int $length
     * @return string
     */
    private function truncate_excerpt( $excerpt, $length )
    {
        if ( empty( $excerpt ) || $length <= 0 ) {
            return $excerpt;
        }

        // Strip HTML tags first
        $excerpt = wp_strip_all_tags( $excerpt );

        // Split into words
        $words = preg_split( '/\s+/', trim( $excerpt ) );

        // If excerpt is shorter than or equal to the limit, return as is
        if ( count( $words ) <= $length ) {
            return $excerpt;
        }

        // Truncate and add ellipsis
        $truncated_words = array_slice( $words, 0, $length );
        return implode( ' ', $truncated_words ) . '...';
    }

    /**
     * Block render callback.
     *
     * @param mixed $attributes
     * @param mixed $content
     * @param mixed $block
     * @return mixed
     */
    public function render_callback( $attributes, $content, $block = null )
    {
        if ( is_admin() ) {
            return;
        }

        $attributes = wp_parse_args( $attributes, self::$default_attributes );
        $className  = isset( $attributes[ "className" ] ) ? $attributes[ "className" ] : "";
        $classHook  = isset( $attributes[ 'classHook' ] ) ? $attributes[ 'classHook' ] : '';

        if ( $attributes[ 'source' ] === 'custom' ) {
            return $content;
        } else {
            // Check if we're in a Loop Builder context
            $context = isset( $block->context ) ? $block->context : [];
            $is_in_loop_builder = $this->is_in_loop_builder_context( $context );

            $tag_name = $attributes[ 'tagName' ];
            $content  = '';

            if ( $attributes[ 'source' ] === 'dynamic-content' && is_single() ) {
                $tag_name = 'div';
                $content  = get_the_content();
            } else if ( $attributes[ 'source' ] === 'dynamic-excerpt' ) {
                // Get post ID based on context (Loop Builder or current post)
                $post_id = $this->get_post_id( $context, $is_in_loop_builder );

                // Get excerpt content
                if ( $post_id ) {
                    $content = get_the_excerpt( $post_id );
                } else {
                    $content = get_the_excerpt();
                }

                // Apply excerpt length truncation if in Loop Builder context and excerptLength is set
                if ( $is_in_loop_builder && isset( $attributes['excerptLength'] ) && $attributes['excerptLength'] > 0 ) {
                    $content = $this->truncate_excerpt( $content, $attributes['excerptLength'] );
                }
            }

            if ( ! $content ) {
                return '';
            }

            $_parent_classes = [
                'eb-parent-wrapper',
                'eb-parent-' . $attributes[ 'blockId' ],
                $className,
                $classHook
             ];
            $_wrapper_classes = [
                'eb-text-wrapper',
                $attributes[ 'blockId' ]
             ];

            $parent_attributes  = get_block_wrapper_attributes( [ 'class' => implode( ' ', $_parent_classes ) ] );
            $wrapper_attributes = get_block_wrapper_attributes( [
                'class'   => implode( ' ', $_wrapper_classes ),
                'data-id' => $attributes[ 'blockId' ]
             ] );

            $wrapper = sprintf( '
            <div %1$s>
                <div %2$s>
                    <%3$s class="eb-text">%4$s</%3$s>
                </div>
            </div>',
                $parent_attributes,
                $wrapper_attributes,
                $tag_name,
                $content
            );

            return wp_kses_post( $wrapper );
        }
    }
}
