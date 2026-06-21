<?php

namespace EssentialBlocks\Blocks;

use EssentialBlocks\Core\Block;

class Testimonial extends Block
{
    protected $frontend_scripts = [  ];
    protected $frontend_styles  = [ 'essential-blocks-fontawesome' ];

    protected function __construct()
    {
        add_filter( 'render_block_essential-blocks/testimonial', [ $this, 'resolve_inline_dynamic_tags' ], 10, 2 );
    }

    /**
     * Unique name of the block.
     *
     * @return string
     */
    public function get_name()
    {
        return 'testimonial';
    }

    /**
     * Resolve eb-dynamic-tags strings used as the avatar imageUrl.
     *
     * Why: The avatar is painted as a CSS background-image inside the block's
     * generated stylesheet (blockMeta), not as an <img>. The dynamic-tag string
     * therefore lands in the global CSS as `background-image: url(eb-dynamic-tags/…)`
     * which the browser cannot resolve. We inject an inline <style> after the
     * block markup that overrides the avatar background with the resolved URL
     * via specificity + !important. No-op when pro is inactive.
     */
    public function resolve_inline_dynamic_tags( $block_content, $block )
    {
        $attrs    = isset( $block[ 'attrs' ] ) && is_array( $block[ 'attrs' ] ) ? $block[ 'attrs' ] : [  ];
        $imageUrl = isset( $attrs[ 'imageUrl' ] ) ? $attrs[ 'imageUrl' ] : '';
        $blockId  = isset( $attrs[ 'blockId' ] ) ? $attrs[ 'blockId' ] : '';

        if ( ! $imageUrl || ! $blockId || strpos( $imageUrl, 'eb-dynamic-tags/' ) === false ) {
            return $block_content;
        }

        $resolved = apply_filters( 'eb_dynamic_tag_value', $imageUrl, $imageUrl, true );
        if ( ! is_string( $resolved ) || $resolved === $imageUrl || $resolved === '' ) {
            return $block_content;
        }

        $css = sprintf(
            '<style>.eb-testimonial-wrapper.%1$s .eb-avatar-style,.eb-testimonial-wrapper.%1$s.layout-preset-2 .image-container .eb-avatar-style{background-image:url(%2$s) !important;display:block !important;}</style>',
            esc_attr( $blockId ),
            esc_url( $resolved )
        );

        return $block_content . $css;
    }
}
