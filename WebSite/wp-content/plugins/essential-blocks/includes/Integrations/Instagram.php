<?php

namespace EssentialBlocks\Integrations;

class Instagram extends ThirdPartyIntegration {
	public function __construct() {
		$this->add_ajax(
			array(
				'get_instagram_access_token' => array(
					'callback' => 'get_instagram_access_token_callback',
					'public'   => true,
				),
			)
		);
	}

	/**
	 * Get Instagram Access Token
	 * Only admins get real token, editors get dummy data for preview
	 */
	public function get_instagram_access_token_callback() {
		if ( ! wp_verify_nonce( sanitize_key( $_POST['admin_nonce'] ), 'admin-nonce' ) ) {
			die( esc_html__( 'Nonce did not match', 'essential-blocks' ) );
		}

		// Check if user has at least edit_posts capability
		if ( ! current_user_can( 'edit_posts' ) ) {
			wp_send_json_error( esc_html__( 'You are not authorized!', 'essential-blocks' ) );
		}

		// Only admins get the real token
		if ( current_user_can( 'manage_options' ) ) {
			$settings = get_option( 'eb_settings' );

			if ( is_array( $settings ) && isset( $settings['instagramToken'] ) ) {
				wp_send_json_success( $settings['instagramToken'] );
			} else {
				wp_send_json_error( "Couldn't found data" );
			}
		} else {
			// Non-admin users with edit_posts capability get dummy token for editor preview
			wp_send_json_success( 'dummy_token_for_editor_preview' );
		}
		exit;
	}


}
