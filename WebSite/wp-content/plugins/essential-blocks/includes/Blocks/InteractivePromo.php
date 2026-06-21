<?php
namespace EssentialBlocks\Blocks;

use EssentialBlocks\Core\Block;

class InteractivePromo extends Block {
	protected $frontend_styles = array( 'essential-blocks-hover-effects-style' );

	protected function __construct() {
		add_filter( 'render_block_essential-blocks/interactive-promo', array( $this, 'resolve_inline_dynamic_tags' ), 10, 2 );
	}

	/**
	 * Unique name of the block.
	 *
	 * @return string
	 */
	public function get_name() {
		return 'interactive-promo';
	}

	/**
	 * Resolve eb-dynamic-tags strings stored inside the saved markup.
	 *
	 * Why: Promo's imageURL attribute is bound to <img src="…"> via
	 * source:"attribute", so the value is parsed from HTML by the editor and
	 * never written into the block's JSON comment-attrs. The global resolver
	 * in pro's HandleTagsResult only walks $block['attrs'], so it misses any
	 * dynamic tag stored only in HTML. This filter scans the rendered block
	 * and resolves embedded tags via the existing eb_dynamic_tag_value
	 * filter (registered by pro). No-op when pro is inactive.
	 */
	public function resolve_inline_dynamic_tags( $block_content, $block ) {
		if ( strpos( $block_content, 'eb-dynamic-tags/' ) === false ) {
			return $block_content;
		}
		if ( ! preg_match_all( '/eb-dynamic-tags\/[\w\/\-_]+\/settings=[^"\'<>\s]+/', $block_content, $matches ) ) {
			return $block_content;
		}
		foreach ( array_unique( $matches[ 0 ] ) as $tag ) {
			$decoded  = html_entity_decode( $tag, ENT_QUOTES | ENT_HTML5 );
			$resolved = apply_filters( 'eb_dynamic_tag_value', $decoded, $decoded, true );
			if ( is_string( $resolved ) && $resolved !== $decoded ) {
				$block_content = str_replace( $tag, esc_attr( $resolved ), $block_content );
			}
		}
		return $block_content;
	}
}
