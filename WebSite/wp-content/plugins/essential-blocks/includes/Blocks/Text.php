<?php
namespace EssentialBlocks\Blocks;

use EssentialBlocks\Core\Block;

class Text extends Block
{
    protected $frontend_styles = [ 'essential-blocks-frontend-style' ];

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
        'openInNewTab' => false
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

        if ( $attributes[ 'source' ] === 'custom' ) {
            return $content;
        } else {
            $tag_name = $attributes[ 'tagName' ];
            $content  = '';
            if ( $attributes[ 'source' ] === 'dynamic-content' && is_single() ) {
                $tag_name = 'div';
                $content  = get_the_content();
            } else if ( $attributes[ 'source' ] === 'dynamic-excerpt' ) {
                $content = get_the_excerpt();
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
