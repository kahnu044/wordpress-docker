<?php
namespace EssentialBlocks\Blocks;

use EssentialBlocks\Core\Block;
use EssentialBlocks\Utils\Helper;

class Taxonomy extends Block
{
    protected $frontend_styles = [ 'essential-blocks-frontend-style', 'essential-blocks-fontawesome' ];

    /**
     * Unique name of the block.
     *
     * @return string
     */
    public function get_name()
    {
        return 'taxonomy';
    }

    protected static $default_attributes = [
        'source' => 'current-post',
        'selectedTaxonomy' => '',
        'prefixType' => 'none',
        'prefixIcon' => 'fas fa-list',
        'prefixText' => 'Prefix Text',
        'suffixType' => 'none',
        'suffixIcon' => 'fas fa-list',
        'suffixText' => 'Suffix Text',
        'displayStyle' => 'display-inline',
        'showSeparator' => false,
        'separator' => "|",
        'taxonomyLimit' => 1,
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
        $prefixType  = isset( $attributes[ 'prefixType' ] ) ? $attributes[ 'prefixType' ] : '';
        $suffixType  = isset( $attributes[ 'suffixType' ] ) ? $attributes[ 'suffixType' ] : '';

        if($attributes['source'] === 'current-post') {
            $terms = get_the_terms(get_the_ID(), $attributes['selectedTaxonomy']);
            if(!empty( $terms ) && !empty($attributes['taxonomyLimit']) && $attributes['taxonomyLimit'] !== -1) {
                $terms = array_slice($terms, 0, $attributes['taxonomyLimit']);
            }
        }else{
            $args = [
                'taxonomy' => $attributes[ 'selectedTaxonomy' ],
                'hide_empty' => false,
            ];
            if($attributes['taxonomyLimit'] !== -1) {
                $args['number'] = $attributes['taxonomyLimit'];
            }

            $terms = get_terms($args);
        }

        $categories = '';
        if ( !empty( $terms) ) {
            $categories .= '<div class="eb-tax-wrap">';
            foreach ( $terms as $term ) {
                $categories .= sprintf(
                    '<span class="eb-tax-item"><a href="%1$s" title="%2$s">%2$s</a></span>',
                    esc_attr( esc_url( get_category_link( $term->term_id ) ) ),
                    esc_html( $term->name )
                );
                if($attributes[ 'showSeparator' ]){
                    $categories .= sprintf('<span class="eb-tax-separator">%1$s</span>', esc_html( $attributes[ 'separator' ] ) );
                }
            }
            $categories .= '</div>';
        } else {
            return;
        }

        if($prefixType !== 'none'){
            if($prefixType === 'icon'){
                $prefix_icon = sprintf(
                    '%1$s',
                    Helper::eb_render_icon( Helper::eb_get_icon_type( $attributes[ 'prefixIcon' ] ), 'eb-button-icon', $attributes[ 'prefixIcon' ] )
                );
                $prefix_markup = sprintf(
                    '<div class="prefix-wrap">%1$s</div>',
                    $prefix_icon
                );
            }
            if($prefixType === 'text'){
                $prefix_markup = sprintf(
                    '<div class="prefix-wrap"><span>%1$s</span></div>',
                    $attributes[ 'prefixText' ]
                );
            }

        }else {
            $prefix_markup = '';
        }

        if($suffixType !== 'none'){
            if($suffixType === 'icon'){
                $suffix_icon = sprintf(
                    '%1$s',
                    Helper::eb_render_icon( Helper::eb_get_icon_type( $attributes[ 'suffixIcon' ] ), 'eb-button-icon', $attributes[ 'suffixIcon' ] )
                );
                $suffix_markup = sprintf(
                    '<div class="suffix-wrap">%1$s</div>',
                    $suffix_icon
                );
            }
            if($suffixType === 'text'){
                $suffix_markup = sprintf(
                    '<div class="suffix-wrap"><span>%1$s</span></div>',
                    $attributes[ 'suffixText' ]
                );
            }
        } else {
            $suffix_markup = '';
        }

        ob_start();
        Helper::views( 'taxonomy', array_merge( $attributes, [
            'className'     => $className,
            'classHook'     => $classHook,
            'categories'     => $categories,
            'prefix_markup'     => $prefix_markup,
            'suffix_markup'     => $suffix_markup,
        ] ) );
        return ob_get_clean();
    }
}