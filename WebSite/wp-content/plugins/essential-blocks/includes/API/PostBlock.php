<?php

namespace EssentialBlocks\API;

use EssentialBlocks\Utils\Helper;
use EssentialBlocks\Utils\QueryHelper;
use EssentialBlocks\Blocks\PostGrid as PostGridBlock;
use EssentialBlocks\Blocks\PostCarousel as PostCarouselBlock;

class PostBlock extends Base
{
    /**
     * Template variables read by the post partials that aren't block defaults.
     */
    const EXTRA_TEMPLATE_ATTRIBUTES = [ 'fallbackImgAlt' => '' ];

    /**
     * Register REST Routes
     * Supports both GET (backward compatibility) and POST (firewall-friendly) methods
     * @return void
     */
    public function register()
    {
        // GET method for backward compatibility
        $this->get( 'queries', [
            'callback' => [ $this, 'get_posts' ]
         ] );

        // POST method for better firewall compatibility (7G/8G)
        $this->post( 'queries', [
            'callback' => [ $this, 'get_posts' ]
         ] );
    }

    /**
     * Handle post queries for both GET and POST requests
     * POST method helps avoid 7G/8G firewall 403 errors
     *
     * @param WP_REST_Request $request
     * @return WP_REST_Response|WP_Error
     */
    public function get_posts( $request )
    {
        $block_type = $request->has_param( 'block_type' ) ? $request->get_param( 'block_type' ) : 'post-grid';

        // Handle both GET and POST requests
        $query_data         = '';
        $attributes_data    = '';
        $page_number        = 0;
        $query_param_string = '';

        if ( $request->get_method() === 'POST' ) {
            // Handle POST request data
            $body = $request->get_body();
            $post_data = json_decode( $body, true );

            if ( ! is_array( $post_data ) ) {
                $post_data = $request->get_params();
            }

            $query_data         = isset( $post_data['query_data'] ) ? sanitize_text_field( $post_data['query_data'] ) : '';
            $attributes_data    = isset( $post_data['attributes'] ) ? sanitize_text_field( $post_data['attributes'] ) : '';
            $page_number        = isset( $post_data['pageNumber'] ) ? (int) sanitize_text_field( $post_data['pageNumber'] ) - 1 : 0;
            $query_param_string = isset( $post_data['query_param_string'] ) ? sanitize_text_field( $post_data['query_param_string'] ) : '';
        } else {
            // Handle GET request (backward compatibility)
            $query_data      = sanitize_text_field( $request->get_param( 'query_data' ) );
            $attributes_data = sanitize_text_field( $request->get_param( 'attributes' ) );
            $page_number     = isset( $request[ 'pageNumber' ] ) ? (int) sanitize_text_field( $request[ 'pageNumber' ] ) - 1 : 0;
        }

        if ( empty( $query_data ) || empty( $attributes_data ) ) {
            return new \WP_Error( 'invalid_request', 'Invalid request parameters', array( 'status' => 400 ) );
        }

        // Validate JSON data
        $query = json_decode( $query_data, true );
        $attributes = json_decode( $attributes_data, true );

        if ( json_last_error() !== JSON_ERROR_NONE ) {
            return new \WP_Error( 'invalid_json', 'Invalid JSON data provided', array( 'status' => 400 ) );
        }

        // Request input: every value is type-checked and the request bounds apply.
        $query      = QueryHelper::normalize_query_data( $query, true );
        $attributes = is_array( $attributes ) ? $attributes : [  ];
        $pageNumber = max( 0, min( $page_number, QueryHelper::max_pages() - 1 ) );

        // Same page size WP_Query uses, so page N starts where page N-1 ended.
        $page_size = QueryHelper::effective_per_page( $query[ 'per_page' ] );
        // per_page -1 (only when eb_query_allow_unbounded_per_page allows it) has no page size, so the saved offset is kept.
        if ( $page_size > 0 ) {
            $query[ 'offset' ] = min( $query[ 'offset' ] + ( $page_size * $pageNumber ), QueryHelper::max_offset() );
        }

        $_template_name = 'carousel-markup';
        $block_object   = PostCarouselBlock::get_instance();
        if ( $block_type === 'post-grid' ) {
            // Handle taxonomy and category filtering for both GET and POST
            $taxonomy   = '';
            $category   = '';
            $query_type = '';
            $search_key = '';

            if ( $request->get_method() === 'POST' ) {
                // Parse query_param_string for POST requests
                if ( ! empty( $query_param_string ) ) {
                    parse_str( ltrim( $query_param_string, '&' ), $parsed_params );
                    $taxonomy   = self::string_param( $parsed_params, 'taxonomy' );
                    $category   = self::string_param( $parsed_params, 'category' );
                    $query_type = self::string_param( $parsed_params, 'query_type' );
                    $search_key = self::string_param( $parsed_params, 's' );
                }
            } else {
                // Handle GET request parameters
                $get_params = $request->get_params();
                $taxonomy   = self::string_param( $get_params, 'taxonomy' );
                $category   = self::string_param( $get_params, 'category' );
                $query_type = self::string_param( $get_params, 'query_type' );
                $search_key = self::string_param( $get_params, 's' );
            }

            if ( '' !== $taxonomy && '' !== $category ) {
                $category_term = get_term_by( 'slug', $category, $taxonomy );
                if ( $category_term instanceof \WP_Term ) {
                    $query = QueryHelper::merge_taxonomy_filter( $query, $taxonomy, $category_term->term_id );
                }
            }

            if ( $query_type === 'search' && '' !== $search_key ) {
                $query[ "s" ] = $search_key;
            }

            $_template_name = 'grid-markup';
            $block_object   = PostGridBlock::get_instance();
        }

        // Request attributes become template variables, so only known keys are
        // passed on (with their block defaults as fallback), each type-checked.
        $attributes = self::normalize_template_attributes( $attributes, $block_object->get_default_attributes() );

        $result = $block_object->get_posts( $query, true );
        $posts  = [  ];
        if ( isset( $result->posts ) && is_array( $result->posts ) && count( $result->posts ) > 0 ) {
            $posts = $result->posts;
        }
        $posts_count = 0;
        if ( isset( $result->found_posts ) ) {
            $posts_count = $result->found_posts;
        }

        if ( empty( $posts ) ) {
            // A REST response with a `false` body: the post grid frontends read it as "no (more)
            // posts" for load more, filter and search.
            return rest_ensure_response( false );
        }

        ob_start();
        Helper::views( 'post-partials/' . $_template_name, array_merge( $attributes, [
            'posts'        => $posts,
            'block_object' => $block_object,
            'source'       => $query[ 'source' ],
            'headerMeta'   => self::decode_meta_list( $attributes[ 'headerMeta' ] ),
            'footerMeta'   => self::decode_meta_list( $attributes[ 'footerMeta' ] )
         ] ) );

        $response = rest_ensure_response( ob_get_clean() );
        $response->set_headers( [
            'x-wp-total' => $posts_count
         ] );

        return $response;
    }

    /**
     * Keep only the attributes the post partials read, each coerced to the type
     * of its default. Mirrors API\Product::normalize_frontend_attributes().
     *
     * @param array $attributes Raw json_decode'd client input.
     * @param array $defaults   Block default attributes.
     * @return array
     */
    private static function normalize_template_attributes( $attributes, $defaults )
    {
        $defaults   = array_merge( self::EXTRA_TEMPLATE_ATTRIBUTES, $defaults );
        $normalized = [  ];

        foreach ( $defaults as $key => $default ) {
            if ( ! array_key_exists( $key, $attributes ) ) {
                $normalized[ $key ] = $default;
                continue;
            }

            $value = $attributes[ $key ];

            if ( is_bool( $default ) ) {
                $normalized[ $key ] = is_scalar( $value ) ? rest_sanitize_boolean( $value ) : $default;
            } elseif ( is_int( $default ) ) {
                $normalized[ $key ] = is_scalar( $value ) && is_numeric( $value ) ? (int) $value : $default;
            } elseif ( is_string( $default ) ) {
                // Numbers are kept as-is: e.g. titleLength defaults to '' but is saved as a number.
                $normalized[ $key ] = is_scalar( $value ) && ! is_bool( $value ) ? $value : $default;
            } else {
                // loadMoreOptions (default false); the partials don't read it.
                $normalized[ $key ] = is_array( $value ) ? $value : $default;
            }
        }

        return $normalized;
    }

    /**
     * @param array  $params
     * @param string $key
     * @return string
     */
    private static function string_param( $params, $key )
    {
        return is_array( $params ) && isset( $params[ $key ] ) && is_string( $params[ $key ] ) ? sanitize_text_field( $params[ $key ] ) : '';
    }

    /**
     * @param mixed $meta JSON string of `[{value,label}]`.
     * @return mixed Decoded list; the partials cast it to an array.
     */
    private static function decode_meta_list( $meta )
    {
        return is_string( $meta ) && '' !== $meta ? json_decode( $meta ) : [  ];
    }
}
