<?php
namespace EssentialBlocks\Blocks;

use EssentialBlocks\Core\Block;
use EssentialBlocks\Utils\Helper;

class Breadcrumbs extends Block
{
    protected $frontend_styles = [ 'essential-blocks-frontend-style', 'essential-blocks-fontawesome' ];

    private $attributesList = [  ];
    /**
     * Unique name of the block.
     *
     * @return string
     */
    public function get_name()
    {
        return 'breadcrumbs';
    }

    protected static $default_attributes = [
        'showPrefix'    => false,
        'showHomePage'  => true,
        'homePageLabel' => 'Home',
        'prefixType'    => 'text',
        'prefixIcon'    => 'fas fa-house-chimney-window',
        'prefixText'    => 'Browse:',
        'separatorType' => 'text',
        'separatorText' => '/',
        'separatorIcon' => 'fas fa-angle-right'
     ];

    public function eb_breadcrumb_separator()
    {
        $attributes = $this->attributesList;

        if ( $attributes[ 'separatorType' ] == 'icon' && $attributes[ 'separatorIcon' ] ) {
            $separator_icon = sprintf(
                '%1$s',
                Helper::eb_render_icon( Helper::eb_get_icon_type( $attributes[ 'separatorIcon' ] ), 'eb-button-icon', $attributes[ 'separatorIcon' ] )
            );
            return sprintf(
                '<span class="eb-breadcrumb-separator">%1$s</span>',
                $separator_icon
            );
        } else {
            return sprintf(
                '<span class="eb-breadcrumb-separator">%1$s</span>',
                $attributes[ 'separatorText' ]
            );
        }
    }

    public function eb_wc_breadcrumb_defaults()
    {
        $attributes = $this->attributesList;

        $showHomePage = $attributes[ 'showHomePage' ];
        $homeLabel    = ( $showHomePage && ! empty( $attributes[ 'homePageLabel' ] ) ) ? $attributes[ 'homePageLabel' ] : '';

        return [
            'delimiter'   => $this->eb_breadcrumb_separator(),
            'wrap_before' => '<nav class="eb-breadcrumb woocommerce-breadcrumb" itemprop="breadcrumb">',
            'wrap_after'  => '</nav>',
            'before'      => '<span class="eb-breadcrumb-item">',
            'after'       => '</span>',
            'home'        => $homeLabel
         ];
    }

    public function eb_breadcrumb_markup()
    {

        $attributes = $this->attributesList;

        $showHomePage = $attributes[ 'showHomePage' ];
        $homeLabel    = $attributes[ 'homePageLabel' ];

        $delimiter   = $this->eb_breadcrumb_separator(); // delimiter between crumbs
        $showCurrent = 1; // 1 - show current post/page title in breadcrumbs, 0 - don't show
        $before      = '<span class="eb-breadcrumb-item current">'; // tag before the current crumb
        $after       = '</span>'; // tag after the current crumb

        global $post;
        $homeLink = get_bloginfo( 'url' );
        $output   = ''; // Initialize an empty string to store the output

        if ( is_home() || is_front_page() ) {
            if ( $showHomePage == true && ! empty( $homeLabel ) ) {
                $output .= '<div class="eb-breadcrumb"><span class="eb-breadcrumb-item"><a href="' . $homeLink . '">' . $homeLabel . '</a></span></div>';
            }
        } else {
            if ( $showHomePage == true && ! empty( $homeLabel ) ) {
                $output .= '<div class="eb-breadcrumb"><span class="eb-breadcrumb-item"><a href="' . $homeLink . '">' . $homeLabel . '</a></span>' . $delimiter;
            }

            if ( is_category() ) {
                $thisCat = get_category( get_query_var( 'cat' ), false );
                if ( $thisCat->parent != 0 ) {
                    $output .= get_category_parents( $thisCat->parent, true, ' ' . $delimiter . ' ' );
                }
                $output .= $before . 'Archive by category "' . single_cat_title( '', false ) . '"' . $after;
            } elseif ( is_search() ) {
                $output .= $before . 'Search results for "' . get_search_query() . '"' . $after;
            } elseif ( is_day() ) {
                $output .= '<span class="eb-breadcrumb-item"><a href="' . get_year_link( get_the_time( 'Y' ) ) . '">' . get_the_time( 'Y' ) . '</a></span>' . $delimiter;
                $output .= '<span class="eb-breadcrumb-item"><a href="' . get_month_link( get_the_time( 'Y' ), get_the_time( 'm' ) ) . '">' . get_the_time( 'F' ) . '</a></span>' . $delimiter;
                $output .= $before . get_the_time( 'd' ) . $after;
            } elseif ( is_month() ) {
                $output .= '<span class="eb-breadcrumb-item"><a href="' . get_year_link( get_the_time( 'Y' ) ) . '">' . get_the_time( 'Y' ) . '</a></span>' . $delimiter;
                $output .= $before . get_the_time( 'F' ) . $after;
            } elseif ( is_year() ) {
                $output .= $before . get_the_time( 'Y' ) . $after;
            } elseif ( is_single() && ! is_attachment() ) {
                if ( get_post_type() != 'post' ) {
                    $post_type = get_post_type_object( get_post_type() );
                    $slug      = $post_type->rewrite;
                    $output .= '<span class="eb-breadcrumb-item"><a href="' . $homeLink . '/' . $slug[ 'slug' ] . '/">' . $post_type->labels->singular_name . '</a></span>';
                    if ( $showCurrent == 1 ) {
                        $output .= ' ' . $delimiter . ' ' . $before . get_the_title() . $after;
                    }
                } else {
                    $cat  = get_the_category();
                    $cat  = $cat[ 0 ];
                    $cats = get_category_parents( $cat, true, ' ' . $delimiter . ' ' );
                    if ( $showCurrent == 0 ) {
                        $cats = preg_replace( "#^(.+)\s$delimiter\s$#", "$1", $cats );
                    }
                    $output .= $cats;
                    if ( $showCurrent == 1 ) {
                        $output .= $before . get_the_title() . $after;
                    }
                }
            } elseif ( ! is_single() && ! is_page() && get_post_type() != 'post' && ! is_404() ) {
                $post_type = get_post_type_object( get_post_type() );
                $output .= $before . $post_type->labels->singular_name . $after;
            } elseif ( is_attachment() ) {
                $parent = get_post( $post->post_parent );
                $cat    = get_the_category( $parent->ID );
                $cat    = $cat[ 0 ];
                $output .= get_category_parents( $cat, true, ' ' . $delimiter . ' ' );
                $output .= '<span class="eb-breadcrumb-item"><a href="' . get_permalink( $parent ) . '">' . $parent->post_title . '</a></span>';
                if ( $showCurrent == 1 ) {
                    $output .= ' ' . $delimiter . ' ' . $before . get_the_title() . $after;
                }
            } elseif ( is_page() && ! $post->post_parent ) {
                if ( $showCurrent == 1 ) {
                    $output .= $before . get_the_title() . $after;
                }
            } elseif ( is_page() && $post->post_parent ) {
                $parent_id   = $post->post_parent;
                $breadcrumbs = [  ];
                while ( $parent_id ) {
                    $page            = get_page( $parent_id );
                    $breadcrumbs[  ] = '<span class="eb-breadcrumb-item"><a href="' . get_permalink( $page->ID ) . '">' . get_the_title( $page->ID ) . '</a></span>';
                    $parent_id       = $page->post_parent;
                }
                $breadcrumbs = array_reverse( $breadcrumbs );
                for ( $i = 0; $i < count( $breadcrumbs ); $i++ ) {
                    $output .= $breadcrumbs[ $i ];
                    if ( $i != count( $breadcrumbs ) - 1 ) {
                        $output .= ' ' . $delimiter . ' ';
                    }
                }
                if ( $showCurrent == 1 ) {
                    $output .= ' ' . $delimiter . ' ' . $before . get_the_title() . $after;
                }
            } elseif ( is_tag() ) {
                $output .= $before . 'Posts tagged "' . single_tag_title( '', false ) . '"' . $after;
            } elseif ( is_author() ) {
                global $author;
                $userdata = get_userdata( $author );
                $output .= $before . 'Articles posted by ' . $userdata->display_name . $after;
            } elseif ( is_404() ) {
                $output .= $before . 'Error 404' . $after;
            }

            if ( get_query_var( 'paged' ) ) {
                if ( is_category() || is_day() || is_month() || is_year() || is_search() || is_tag() || is_author() ) {
                    $output .= ' (';
                }
                $output .= __( 'Page' ) . ' ' . get_query_var( 'paged' );
                if ( is_category() || is_day() || is_month() || is_year() || is_search() || is_tag() || is_author() ) {
                    $output .= ')';
                }
            }
            $output .= '</div>';
        }

        return $output;
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

        $attributes           = wp_parse_args( $attributes, self::$default_attributes );
        $this->attributesList = $attributes;

        $classHook  = isset( $attributes[ 'classHook' ] ) ? $attributes[ 'classHook' ] : '';
        $showPrefix = isset( $attributes[ 'showPrefix' ] ) ? $attributes[ 'showPrefix' ] : false;
        $prefixType = isset( $attributes[ 'prefixType' ] ) ? $attributes[ 'prefixType' ] : '';

        if ( $showPrefix === true && $prefixType === 'icon' ) {
            $prefix_icon = sprintf(
                '%1$s',
                Helper::eb_render_icon( Helper::eb_get_icon_type( $attributes[ 'prefixIcon' ] ), 'eb-button-icon', $attributes[ 'prefixIcon' ] )
            );
            $prefix_markup = sprintf(
                '<div class="prefix-wrap">%1$s</div>',
                $prefix_icon
            );
        } elseif ( $showPrefix === true && $prefixType === 'text' ) {
            $prefix_markup = sprintf(
                '<div class="prefix-wrap"><span>%1$s</span></div>',
                $attributes[ 'prefixText' ]
            );
        } else {
            $prefix_markup = '';
        }

        $_parent_classes = [
            'eb-parent-wrapper',
            'eb-parent-' . $attributes[ 'blockId' ],
            'root-' . $attributes[ 'blockId' ],
            $classHook
         ];

        $parent_attributes = get_block_wrapper_attributes( [ 'class' => implode( ' ', $_parent_classes ) ] );

        $breadcrumb_markup = '';
        $product           = false;

        if ( class_exists( 'WooCommerce' ) ) {
            $product = wc_get_product( get_the_ID() );
        }

        if ( ! $product ) {
            $breadcrumb_markup = $this->eb_breadcrumb_markup();
        } else {

            add_filter( 'woocommerce_breadcrumb_defaults', [ $this, 'eb_wc_breadcrumb_defaults' ] );
            ob_start();
            woocommerce_breadcrumb();
            $breadcrumb_markup = ob_get_clean();
        }

        $wrapper = sprintf( '
        <div %1$s>
            <div aria-label="Breadcrumb" class="eb-breadcrumb-wrapper %2$s" data-id="%2$s">
                %3$s
                %4$s
            </div>
        </div>',
            $parent_attributes,
            $attributes[ 'blockId' ],
            $prefix_markup,
            $breadcrumb_markup,
        );

        return wp_kses_post( $wrapper );
    }
}
