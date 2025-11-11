<?php

namespace EssentialBlocks\API;

use WP_REST_Server;
use EssentialBlocks\Traits\HasSingletone;

abstract class Base {
    use HasSingletone;

    /**
     * Register REST Routes
     *
     * @return void
     */
    abstract function register();

    public function register_endpoint( $endpoint, $args = [] ) {
        register_rest_route( 'essential-blocks/v1', $endpoint, $args );
    }

    public function get( $endpoint, $args = [] ) {
        $_args = wp_parse_args(
            $args,
            [
                'methods'             => WP_REST_Server::READABLE,
                'permission_callback' => '__return_true'
            ]
        );

        $this->register_endpoint( $endpoint, $_args );
    }

    public function post( $endpoint, $args = [] ) {
        $_args = wp_parse_args(
            $args,
            [
                'methods'             => WP_REST_Server::CREATABLE,
                'permission_callback' => [ $this, 'verify_post_permission' ]
            ]
        );

        $this->register_endpoint( $endpoint, $_args );
    }

    /**
     * Verify permission for POST requests
     *
     * @param WP_REST_Request $request
     * @return bool
     */
    public function verify_post_permission( $request ) {
        // For public endpoints, we can still allow access but with basic validation
        // You can add nonce verification here if needed
        return true;
    }
}
