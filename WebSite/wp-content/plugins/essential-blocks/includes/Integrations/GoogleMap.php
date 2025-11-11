<?php

namespace EssentialBlocks\Integrations;

use EssentialBlocks\Utils\Helper;
use EssentialBlocks\Utils\HttpRequest;

class GoogleMap extends ThirdPartyIntegration
{

    public function __construct()
    {
        $this->add_ajax(
            [
                'google_map_api_key'            => [
                    'callback' => 'google_map_api_key_callback',
                    'public'   => true
                 ],
                'google_map_api_key_save'       => [
                    'callback' => 'google_map_api_key_save_callback',
                    'public'   => false
                 ],
                'google_map_api_key_validation' => [
                    'callback' => 'google_map_api_key_validation',
                    'public'   => false
                 ]
             ]
        );
    }

    /**
     * Get Google Map API
     */
    public function google_map_api_key_callback()
    {
        if ( ! wp_verify_nonce( sanitize_key( $_POST[ 'admin_nonce' ] ), 'admin-nonce' ) ) {
            die( esc_html__( 'Nonce did not match', 'essential-blocks' ) );
        }

        if ( ! current_user_can( 'edit_posts' ) ) {
            wp_send_json_error( __( 'You are not authorized!', 'essential-blocks' ) );
        }

        $settings = get_option( 'eb_settings' );

        if ( is_array( $settings ) && isset( $settings[ 'googleMapApi' ] ) ) {
            wp_send_json_success( $settings[ 'googleMapApi' ] );
        } else {
            wp_send_json_error( "Couldn't found data" );
        }
        exit;
    }

    /**
     * Google Map API key save callback
     */
    public function google_map_api_key_save_callback()
    {
        if ( ! wp_verify_nonce( sanitize_key( $_POST[ 'admin_nonce' ] ), 'admin-nonce' ) ) {
            die( esc_html__( 'Nonce did not match', 'essential-blocks' ) );
        }
        if ( ! current_user_can( 'activate_plugins' ) ) {
            wp_send_json_error( __( 'You are not authorized!', 'essential-blocks' ) );
        }

        $api = '';
        if ( isset( $_POST[ 'googleMapApi' ] ) ) {
            $api = trim( sanitize_text_field( $_POST[ 'googleMapApi' ] ) );
        }

        $settings = is_array( get_option( 'eb_settings' ) ) ? get_option( 'eb_settings' ) : [  ];
        if ( strlen( $api ) === 0 ) {
            unset( $settings[ 'googleMapApi' ] );
        } else {
            $settings[ 'googleMapApi' ] = $api;
        }

        if ( is_array( $settings ) > 0 ) {
            $output = update_option( 'eb_settings', $settings );
            wp_send_json_success( $output );
        } else {
            wp_send_json_error( "Couldn't save data" );
        }

        exit;
    }

    public function google_map_api_key_validation()
    {
        if ( ! wp_verify_nonce( sanitize_key( $_POST[ 'admin_nonce' ] ), 'admin-nonce' ) ) {
            die( esc_html__( 'Nonce did not match', 'essential-blocks' ) );
        }
        if ( ! current_user_can( 'activate_plugins' ) ) {
            wp_send_json_error( __( 'You are not authorized!', 'essential-blocks' ) );
        }

        $ebGoogleMapUrl = sanitize_text_field( Helper::is_isset( 'ebGoogleMapUrl' ) );

        // Security: Validate URL to prevent SSRF attacks
        if ( ! $this->is_safe_google_maps_url( $ebGoogleMapUrl ) ) {
            wp_send_json_error( __( 'Invalid or unsafe URL provided.', 'essential-blocks' ) );
            return;
        }

        // Registration for client id and client secret
        $response = HttpRequest::get_instance()->get(
            $ebGoogleMapUrl,
        );

        wp_send_json( $response );
    }

    /**
     * Validate if the provided URL is safe for Google Maps API requests
     * Prevents SSRF attacks by only allowing Google Maps API endpoints
     *
     * @param string $url The URL to validate
     * @return bool True if URL is safe, false otherwise
     */
    public function is_safe_google_maps_url( $url )
    {
        if ( empty( $url ) ) {
            return false;
        }
        // Sanitize URL first
        $sanitized_url = filter_var( $url, FILTER_SANITIZE_URL );

        // Validate URL format
        if ( ! filter_var( $sanitized_url, FILTER_VALIDATE_URL ) ) {
            return false;
        }

        // Parse and check domain
        $host = parse_url( $sanitized_url, PHP_URL_HOST );
        return $host === 'maps.googleapis.com';
    }
}
