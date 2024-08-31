<?php
namespace EssentialBlocks\Blocks;

use EssentialBlocks\Core\Block;
use EssentialBlocks\Utils\Helper;

class AdvancedHeading extends Block
{
    protected $frontend_styles = [ 'essential-blocks-frontend-style', 'essential-blocks-fontawesome' ];

    /**
     * Unique name of the block.
     *
     * @return string
     */
    public function get_name()
    {
        return 'advanced-heading';
    }

    protected static $default_attributes = [
        'preset'            => 'button-1',
        'currentPostId'     => 0,
        'source'            => 'custom',
        'tagName'           => 'h2',
        'displaySeperator'  => false,
        'seperatorPosition' => 'bottom',
        'seperatorType'     => 'line',
        'separatorIcon'     => 'fas fa-arrow-circle-down',
        'enableLink'        => false,
        'openInNewTab'      => false
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
            $title = get_the_title();

            if ( ! $title ) {
                return '';
            }

            $tag_name = $attributes[ 'tagName' ];

            $linkTarget = $attributes[ 'openInNewTab' ] ? '_blank' : '';

            if ( isset( $attributes[ 'enableLink' ] ) && $attributes[ 'enableLink' ] ) {
                $rel   = $linkTarget === "_blank" ? 'rel="noopener"' : '';
                $title = sprintf( '<a href="%1$s" target="%2$s" %3$s>%4$s</a>', esc_url( get_the_permalink( $attributes[ 'currentPostId' ] ) ), esc_attr( $linkTarget ), $rel, $title );
            }

            if ( $attributes[ 'seperatorType' ] === 'icon' ) {
                $seperator_icon = sprintf(
                    '%1$s',
                    Helper::eb_render_icon( Helper::eb_get_icon_type( $attributes[ 'separatorIcon' ] ), 'eb-button-icon', $attributes[ 'separatorIcon' ] )
                );
            } else {
                $seperator_icon = '';
            }

            if ( $attributes[ 'displaySeperator' ] && $attributes[ 'seperatorPosition' ] === 'top' ) {
                $seperator_top = sprintf(
                    '<div class="eb-ah-separator %1$s">%2$s</div>',
                    esc_attr( $attributes[ 'seperatorType' ] ),
                    $seperator_icon
                );
            } else {
                $seperator_top = '';
            }

            if ( $attributes[ 'displaySeperator' ] && $attributes[ 'seperatorPosition' ] === 'bottom' ) {
                $seperator_bottom = sprintf(
                    '<div class="eb-ah-separator %1$s">%2$s</div>',
                    esc_attr( $attributes[ 'seperatorType' ] ),
                    $seperator_icon
                );
            } else {
                $seperator_bottom = '';
            }

            $_parent_classes = [
                'eb-parent-wrapper',
                'eb-parent-' . $attributes[ 'blockId' ],
                $classHook
             ];
            $_wrapper_classes = [
                'eb-advance-heading-wrapper',
                $attributes[ 'blockId' ],
                $attributes[ 'preset' ]
             ];

            $parent_attributes  = get_block_wrapper_attributes( [ 'class' => implode( ' ', $_parent_classes ) ] );
            $wrapper_attributes = get_block_wrapper_attributes( [
                'class'   => implode( ' ', $_wrapper_classes ),
                'data-id' => $attributes[ 'blockId' ]
             ] );

            $wrapper = sprintf( '
            <div %1$s>
                <div %2$s>
                    %5$s
                    <%3$s class="eb-ah-title">%4$s</%3$s>
                    %6$s
                </div>
            </div>',
                $parent_attributes,
                $wrapper_attributes,
                $tag_name,
                $title,
                $seperator_top,
                $seperator_bottom
            );

            return wp_kses_post( $wrapper );
        }
    }
}
