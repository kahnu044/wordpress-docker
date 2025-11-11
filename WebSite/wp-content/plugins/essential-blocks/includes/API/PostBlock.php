<?php

namespace EssentialBlocks\API;

use EssentialBlocks\Utils\Helper;
use EssentialBlocks\Blocks\PostGrid as PostGridBlock;
use EssentialBlocks\Blocks\PostCarousel as PostCarouselBlock;

class PostBlock extends Base
{
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
        $query_data = '';
        $attributes_data = '';
        $page_number = 0;
        $query_filter = '';
        $query_param_string = '';

        if ( $request->get_method() === 'POST' ) {
            // Handle POST request data
            $body = $request->get_body();
            $post_data = json_decode( $body, true );

            if ( ! $post_data ) {
                $post_data = $request->get_params();
            }

            $query_data = isset( $post_data['query_data'] ) ? sanitize_text_field( $post_data['query_data'] ) : '';
            $attributes_data = isset( $post_data['attributes'] ) ? sanitize_text_field( $post_data['attributes'] ) : '';
            $page_number = isset( $post_data['pageNumber'] ) ? (int) sanitize_text_field( $post_data['pageNumber'] ) - 1 : 0;
            $query_filter = isset( $post_data['query_filter'] ) ? sanitize_text_field( $post_data['query_filter'] ) : '';
            $query_param_string = isset( $post_data['query_param_string'] ) ? sanitize_text_field( $post_data['query_param_string'] ) : '';
        } else {
            // Handle GET request (backward compatibility)
            $query_data = sanitize_text_field( $request->get_param( 'query_data' ) );
            $attributes_data = sanitize_text_field( $request->get_param( 'attributes' ) );
            $page_number = isset( $request[ 'pageNumber' ] ) ? (int) sanitize_text_field( $request[ 'pageNumber' ] ) - 1 : 0;
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

        $query      = ( is_object( $query ) || is_array( $query ) ) ? (array) $query : [  ];
        $attributes = ( is_object( $attributes ) || is_array( $attributes ) ) ? (array) $attributes : [  ];
        $pageNumber = $page_number;
        //Check if param is empty
        if ( ! is_array( $query ) || ! is_array( $attributes ) ) {
            wp_send_json_error( "Invalid request param" );
        }

        if ( isset( $query[ 'per_page' ] ) && isset( $query[ 'offset' ] ) ) {
            $query[ 'offset' ] = (int) $query[ 'offset' ] + ( (int) $query[ 'per_page' ] * (int) $pageNumber );
        }

        $_template_name = 'carousel-markup';
        $block_object   = PostCarouselBlock::get_instance();
        if ( $block_type === 'post-grid' ) {
            // Handle taxonomy and category filtering for both GET and POST
            $taxonomy = '';
            $category = '';
            $query_type = '';
            $search_key = '';

            if ( $request->get_method() === 'POST' ) {
                // Parse query_param_string for POST requests
                if ( ! empty( $query_param_string ) ) {
                    parse_str( ltrim( $query_param_string, '&' ), $parsed_params );
                    $taxonomy = isset( $parsed_params['taxonomy'] ) ? sanitize_text_field( $parsed_params['taxonomy'] ) : '';
                    $category = isset( $parsed_params['category'] ) ? sanitize_text_field( $parsed_params['category'] ) : '';
                    $query_type = isset( $parsed_params['query_type'] ) ? sanitize_text_field( $parsed_params['query_type'] ) : '';
                    $search_key = isset( $parsed_params['s'] ) ? sanitize_text_field( $parsed_params['s'] ) : '';
                }
            } else {
                // Handle GET request parameters
                $taxonomy = $request->get_param( 'taxonomy' );
                $category = $request->get_param( 'category' );
                $query_type = $request->get_param( 'query_type' );
                $search_key = $request->get_param( 's' );
            }

            if ( ! empty( $taxonomy ) && ! empty( $category ) ) {
                $category_term  = get_term_by( 'slug', $category, $taxonomy );
                if ( $category_term ) {
                    $catString = wp_json_encode( [ [
                        "label" => $category_term->name,
                        "value" => $category_term->term_id
                     ] ] );
                    $filterQuery = [
                        $taxonomy => [
                            "name"  => $category,
                            "slug"  => $category,
                            "value" => $catString
                         ]
                     ];
                    $query[ "taxonomies" ] = array_merge( $query[ 'taxonomies' ] ?? [  ], $filterQuery );
                }
            }

            if ( $query_type === 'search' && ! empty( $search_key ) ) {
                $query[ "s" ] = $search_key;
            }

            $_template_name = 'grid-markup';
            $block_object   = PostGridBlock::get_instance();
            $attributes     = wp_parse_args( $attributes, $block_object->get_default_attributes() );
        }

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
            return false;
        }

        ob_start();
        Helper::views( 'post-partials/' . $_template_name, array_merge( $attributes, [
            'posts'        => $posts,
            'block_object' => $block_object,
            'source'       => isset( $query[ 'source' ] ) ? $query[ 'source' ] : 'post',
            'headerMeta'   => ! empty( $attributes[ 'headerMeta' ] ) ? json_decode( $attributes[ 'headerMeta' ] ) : [  ],
            'footerMeta'   => ! empty( $attributes[ 'footerMeta' ] ) ? json_decode( $attributes[ 'footerMeta' ] ) : [  ]
         ] ) );

        $response = rest_ensure_response( ob_get_clean() );
        $response->set_headers( [
            'x-wp-total' => $posts_count
         ] );

        return $response;
    }
}
