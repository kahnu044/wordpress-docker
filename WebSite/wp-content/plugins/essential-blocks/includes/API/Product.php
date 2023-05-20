<?php

namespace EssentialBlocks\API;

use WP_Error;
use WP_Query;
use EssentialBlocks\Utils\Helper;

class Product extends Base {
    /**
     * Register REST Routes
     * @return void
     */
    public function register() {
        $this->get( 'products', [
            'args'     => [
                'order_by'   => [],
                "order"      => [],
                "per_page"   => [],
                "offset"     => [],
                "categories" => [],
                "tags"       => []
            ],
            'callback' => [$this, 'get_products']
        ] );
    }

    public static function __callStatic( $name, $arguments = [] ) {
        if ( method_exists( __CLASS__, $name ) ) {
            return static::get_instance()->$name( $arguments );
        }
    }

    /**
     * Get a list of WooCommerce products
     * @param mixed $request
     * @param mixed $local
     * @return array<array>
     *
     * @suppress PHP0417
     */
    public function get_products( $request, $local = false ) {
        $data       = [];
        $query_data = maybe_unserialize( $request->get_param( 'query_data' ) );
        $query_data = is_array( $query_data ) ? $query_data : [];
        $pageNumber = (int) $request['pageNumber'] - 1;

        $_is_frontend = true;

        if ( ! rest_sanitize_boolean( $request->get_param( 'is_frontend' ) ) ) {
            $_is_frontend = false;
            $query_data   = $request->get_params();
        }

        if ( isset( $query_data['per_page'] ) && isset( $query_data['offset'] ) ) {
            $query_data['offset'] = (int) $query_data['offset'] + ( (int) $query_data['per_page'] * (int) $pageNumber );
        }

        $loop = new WP_Query( $this->query_builder( $query_data ) );

        $attributes = $_is_frontend ? maybe_unserialize( $request->get_param( 'attributes' ) ) : [];
        $attributes = ! empty( $attributes ) ? $attributes : [];
        if ( $loop->have_posts() ) {
            if ( $_is_frontend ) {
                ob_start();
            }
            while ( $loop->have_posts() ) {
                $loop->the_post();

                $products = [];
                $post_id  = get_the_ID();
                $product  = wc_get_product( $post_id );

                $products['id']               = $post_id;
                $products['title']            = get_the_title();
                $products['permalink']        = get_permalink();
                $products['excerpt']          = strip_tags( get_the_content() );
                $products['excerpt_full']     = strip_tags( get_the_excerpt() );
                $products['time']             = get_the_date();
                $products['price']            = $product->get_price();
                $products['price_sale']       = $product->get_sale_price();
                $products['price_regular']    = $product->get_regular_price();
                $products['discount']         = ( $products['price_sale'] && $products['price_regular'] ) ? round(  ( $products['price_regular'] - $products['price_sale'] ) / $products['price_regular'] * 100 ) . '%' : '';
                $products['sale']             = $product->is_on_sale();
                $products['price_html']       = $product->get_price_html();
                $products['stock']            = $product->get_stock_status();
                $products['featured']         = $product->is_featured();
                $products['rating_count']     = $product->get_rating_count();
                $products['rating_average']   = $product->get_average_rating();
                $products['add_to_cart_url']  = $product->add_to_cart_url();
                $products['add_to_cart_text'] = $product->add_to_cart_text();
                $products['type']             = $product->get_type();

                // image
                if ( has_post_thumbnail() ) {
                    $thumb_id    = get_post_thumbnail_id( $post_id );
                    $image_sizes = get_intermediate_image_sizes();
                    $image_src   = [];
                    foreach ( $image_sizes as $key => $value ) {
                        $image_src[$value] = wp_get_attachment_image_src( $thumb_id, $value, false )[0];
                    }
                    $products['image'] = $image_src;
                }

                // tag
                $tag = get_the_terms( $post_id, ( isset( $request['tag'] ) ? esc_attr( $request['tag'] ) : 'product_tag' ) );
                if ( ! empty( $tag ) ) {
                    $all_tag = [];
                    foreach ( $tag as $val ) {
                        $all_tag[] = ['term_id' => $val->term_id, 'slug' => $val->slug, 'name' => $val->name, 'url' => get_term_link( $val->term_id )];
                    }
                    $products['tag'] = $all_tag;
                }

                // cat
                $cat = get_the_terms( $post_id, ( isset( $request['cat'] ) ? esc_attr( $request['cat'] ) : 'product_cat' ) );
                if ( ! empty( $cat ) ) {
                    $all_cats = [];
                    foreach ( $cat as $val ) {
                        $all_cats[] = ['term_id' => $val->term_id, 'slug' => $val->slug, 'name' => $val->name, 'url' => get_term_link( $val->term_id )];
                    }
                    $products['category'] = $all_cats;
                }
                $data[] = $products;

                if ( $_is_frontend ) {
                    $_params = array_merge(
                        $attributes,
                        ['product' => wc_get_product( (int) $products['id'] )]
                    );

                    Helper::views( 'woocommerce/single-product', $_params );
                }
            }
            // wp_reset_query();
            wp_reset_postdata();

            return $_is_frontend ? ob_get_clean() : $data;
        }

        return new WP_Error( __( 'Nothing found.' ) );
    }

    /**
     * API Query Builder
     */
    public static function query_builder( $attr ) {

        $query_args = [
            'post_status'    => 'publish',
            'post_type'      => 'product',
            'posts_per_page' => isset( $attr['per_page'] ) ? $attr['per_page'] : 10,
            'orderby'        => isset( $attr['orderby'] ) ? $attr['orderby'] : 'date',
            'order'          => isset( $attr['order'] ) ? $attr['order'] : 'desc',
            'offset'         => isset( $attr['offset'] ) ? $attr['offset'] : 0
        ];

        if ( isset( $attr['orderby'] ) ) {
            switch ( $attr['orderby'] ) {
            case 'price':
                $query_args['meta_key'] = '_price';
                $query_args['orderby']  = 'meta_value_num';
                break;
            case 'popular':
                $query_args['meta_key'] = 'total_sales';
                $query_args['orderby']  = 'meta_value_num';
                $query_args['order']    = 'desc';
                break;
            case 'rating';
                $query_args['meta_key'] = '_wc_average_rating';
                $query_args['orderby']  = 'meta_value_num';
                break;
            default:
                $query_args['orderby'] = $attr['orderby'];
                break;
            }
        }

        if ( ! empty( $attr['tag'] ) ) {
            $query_args['tax_query']   = ['relation' => 'OR'];
            $query_args['tax_query'][] = [
                [
                    'taxonomy' => 'product_tag',
                    'field'    => 'term_id',
                    'terms'    => explode( ',', $attr['tag'] )
                ]
            ];
        }

        if ( ! empty( $attr['category'] ) ) {
            $query_args['tax_query'][] = [
                [
                    'taxonomy' => 'product_cat',
                    'field'    => 'term_id',
                    'terms'    => explode( ',', $attr['category'] )
                ]
            ];
        }

        return $query_args;
    }
}
