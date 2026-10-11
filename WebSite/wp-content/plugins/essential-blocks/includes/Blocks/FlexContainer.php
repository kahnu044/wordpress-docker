<?php

namespace EssentialBlocks\Blocks;

use EssentialBlocks\Core\Block;
use EssentialBlocks\Utils\Helper;

class FlexContainer extends Block {
	protected $editor_styles   = 'essential-blocks-block-common';
	protected $frontend_styles = array( 'essential-blocks-block-common' );

	protected function __construct() {
		add_filter( 'render_block_essential-blocks/flex-container', array( $this, 'apply_responsive_hide' ), 10, 2 );
	}

	/**
	 * Unique name of the block.
	 *
	 * @return string
	 */
	public function get_name() {
		return 'flex-container';
	}

	/**
	 * Enforce Advanced → Responsive Control "Hide on Desktop/Tablet/Mobile".
	 *
	 * Why: style.scss forces `display: inline !important` on the
	 * `.eb-parent-flex-container` wrapper (needed for the inner container's
	 * height:100% / equal-height layout). That wrapper is also the
	 * `.eb-parent-{blockId}` target of the generated `display: none` hide rule,
	 * which has no !important and therefore always loses. We re-emit the hide
	 * rules at render time with higher specificity + !important, mirroring the
	 * generator's desktop → tablet → mobile cascade and breakpoints. Built from
	 * block attributes, so existing pages work without re-saving.
	 */
	public function apply_responsive_hide( $block_content, $block ) {
		$attrs   = isset( $block['attrs'] ) && is_array( $block['attrs'] ) ? $block['attrs'] : array();
		$blockId = isset( $attrs['blockId'] ) ? sanitize_html_class( $attrs['blockId'] ) : '';

		$hideOnDesktop = ! empty( $attrs['hideOnDesktop'] );
		$hideOnTab     = ! empty( $attrs['hideOnTab'] );
		$hideOnMobile  = ! empty( $attrs['hideOnMobile'] );

		if ( is_admin() || '' === $block_content || ! $blockId || ! ( $hideOnDesktop || $hideOnTab || $hideOnMobile ) ) {
			return $block_content;
		}

		$breakpoints = (array) Helper::get_responsive_breakpoints();
		$tablet      = isset( $breakpoints['tablet'] ) ? absint( $breakpoints['tablet'] ) : 1024;
		$mobile      = isset( $breakpoints['mobile'] ) ? absint( $breakpoints['mobile'] ) : 767;

		$selector = '.wp-block-essential-blocks-flex-container .eb-parent-wrapper.eb-parent-flex-container.eb-parent-' . $blockId;

		$css = '';
		if ( $hideOnDesktop ) {
			$css .= sprintf( '%s{display:none !important;}', $selector );
		}
		$css .= sprintf( '@media all and (max-width: %dpx){%s{display:%s !important;}}', $tablet, $selector, $hideOnTab ? 'none' : 'inline' );
		$css .= sprintf( '@media all and (max-width: %dpx){%s{display:%s !important;}}', $mobile, $selector, $hideOnMobile ? 'none' : 'inline' );

		return $block_content . '<style>' . $css . '</style>';
	}
}
