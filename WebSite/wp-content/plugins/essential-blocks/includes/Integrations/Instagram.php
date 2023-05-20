<?php

namespace EssentialBlocks\Integrations;

class Instagram extends ThirdPartyIntegration {
    public function __construct() {
        $this->add_ajax( [
            'get_instagram_access_token' => [
                'callback' => 'get_instagram_access_token_callback',
                'public'   => true
            ]
        ] );
    }

    /**
     * Get Google Map API
     */
    public function get_instagram_access_token_callback() {
        if ( ! wp_verify_nonce( $_POST['admin_nonce'], 'admin-nonce' ) ) {
            die( __( 'Nonce did not match', 'essential-blocks' ) );
        }

        $settings = get_option( 'eb_settings' );

        if ( is_array( $settings ) && isset( $settings['instagramToken'] ) ) {
            wp_send_json_success( $settings['instagramToken'] );
        } else {
            wp_send_json_error( "Couldn't found data" );
        }
        exit;
    }
}
