<?php
namespace EssentialBlocks\Integrations;

use EssentialBlocks\Utils\Installer;
use EssentialBlocks\Utils\XSpeedOffer;

class PluginInstaller extends ThirdPartyIntegration {

	/**
	 * Plugins that read an "installed by" claim, as slug => option name.
	 *
	 * The claim is a one-shot trigger, not a record: activation is what reads it, and
	 * activation spends it. Written immediately before install/activate, never
	 * speculatively, so the plugin knows Essential Blocks installed it (xSpeed then
	 * comes up with every feature off, page caching on, and skips its own wizard).
	 */
	const HOST_CLAIM_OPTIONS = array(
		'xspeed' => 'xspeed_installed_by',
	);

	public function __construct() {
		$this->add_ajax(
			array(
				'plugin_installer' => array(
					'callback' => 'plugin_install',
					'public'   => false,
				),
				'plugin_deactivater' => array(
					'callback' => 'plugin_deactivate',
					'public'   => false,
				),
				'eb_xspeed_offer_record' => array(
					'callback' => 'xspeed_offer_record',
					'public'   => false,
				),
			)
		);
	}

	/**
	 * Openverse plugin_install
	 */
	public function plugin_install() {
		if ( ! isset( $_POST['admin_nonce'] ) || ! wp_verify_nonce( sanitize_key( $_POST['admin_nonce'] ), 'admin-nonce' ) ) {
			wp_send_json_error( __( 'Could not install the plugin.', 'essential-blocks' ) );
			die( esc_html__( 'Nonce did not match', 'essential-blocks' ) );
		}
		if ( ! current_user_can( 'activate_plugins' ) ) {
			wp_send_json_error( __( 'You are not authorized!', 'essential-blocks' ) );
		}

		if ( isset( $_POST['slug'] ) && isset( $_POST['plugin_file'] ) ) {
			require_once ABSPATH . 'wp-admin/includes/plugin.php';

			$plugin                = array();
			$plugin['slug']        = sanitize_text_field( $_POST['slug'] );
			$plugin['plugin_file'] = sanitize_text_field( $_POST['plugin_file'] );
			$claim_option          = $this->set_host_claim( $plugin );
			$installer             = Installer::get_instance();
			$response              = $installer->install( $plugin );

			// Activation consumes the claim; remove any leftover so a later manual install isn't attributed to us.
			if ( $claim_option ) {
				delete_option( $claim_option );
			}

			$response = $this->after_install( $plugin, $response );

			wp_send_json_success( $response );
		} else {
			wp_send_json_error( __( 'Could not install the plugin.', 'essential-blocks' ) );
		}
		wp_die();
	}

	/**
	 * Write the "installed by" claim for plugins that support one.
	 *
	 * @param array $plugin Plugin slug and file.
	 * @return string Claim option name, or empty string when nothing was written.
	 */
	private function set_host_claim( $plugin ) {
		$slug = sanitize_key( $plugin['slug'] );

		if ( ! isset( self::HOST_CLAIM_OPTIONS[ $slug ] ) || is_plugin_active( $plugin['plugin_file'] ) ) {
			return '';
		}

		update_option( self::HOST_CLAIM_OPTIONS[ $slug ], XSpeedOffer::HOST_SLUG, false );

		return self::HOST_CLAIM_OPTIONS[ $slug ];
	}

	/**
	 * Record the answer and report how the plugin came up.
	 *
	 * `accepted` is written here, server-side, and only once the files are on disk:
	 * `accepted` with no plugin there is how every sibling reads "the user removed it",
	 * so a download that 404s would otherwise leave the site permanently unaskable by
	 * all of them, having never been asked.
	 *
	 * @param array $plugin   Plugin slug and file.
	 * @param array $response Installer result.
	 * @return array
	 */
	private function after_install( $plugin, $response ) {
		if ( 'xspeed' !== sanitize_key( $plugin['slug'] ) ) {
			return $response;
		}

		if ( ! empty( $response['success'] ) && XSpeedOffer::is_on_disk() ) {
			XSpeedOffer::mark_accepted();
		}

		$status = XSpeedOffer::host_status();
		if ( ! empty( $status ) ) {
			$response['xspeed'] = $status;
		}

		return $response;
	}

	/**
	 * Record an answer about xSpeed in the record every WPDeveloper plugin shares.
	 *
	 * Only `offered` and `declined` are accepted from the client. `accepted` is written
	 * by {@see self::after_install()} once the files are actually on disk.
	 */
	public function xspeed_offer_record() {
		if ( ! isset( $_POST['admin_nonce'] ) || ! wp_verify_nonce( sanitize_key( $_POST['admin_nonce'] ), 'admin-nonce' ) ) {
			wp_send_json_error( __( 'Nonce did not match', 'essential-blocks' ) );
		}
		if ( ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error( __( 'You are not authorized!', 'essential-blocks' ) );
		}

		$outcome = isset( $_POST['outcome'] ) ? sanitize_key( $_POST['outcome'] ) : '';

		switch ( $outcome ) {
			case XSpeedOffer::OUTCOME_OFFERED:
				XSpeedOffer::mark_offered();
				break;
			case XSpeedOffer::OUTCOME_DECLINED:
				XSpeedOffer::mark_declined();
				break;
			default:
				wp_send_json_error( __( 'Unknown outcome.', 'essential-blocks' ) );
		}

		wp_send_json_success(
			array(
				'outcome' => XSpeedOffer::outcome(),
				'may_ask' => XSpeedOffer::may_ask(),
			)
		);
	}

	public function plugin_deactivate() {
		if ( ! isset( $_POST['admin_nonce'] ) || ! wp_verify_nonce( sanitize_key( $_POST['admin_nonce'] ), 'admin-nonce' ) ) {
			wp_send_json_error( __( 'Could not deactivate the plugin.', 'essential-blocks' ) );
			die( esc_html__( 'Nonce did not match', 'essential-blocks' ) );
		}
		if ( ! current_user_can( 'deactivate_plugins' ) ) {
			wp_send_json_error( __( 'You are not authorized!', 'essential-blocks' ) );
		}

		if ( isset( $_POST['plugin_file'] ) ) {
            $plugin_file = sanitize_text_field( $_POST['plugin_file'] );

            if ( is_plugin_active( $plugin_file ) ) {
                deactivate_plugins( $plugin_file);

                if ( is_plugin_active( $plugin_file ) ) {
                    wp_send_json_error( __( 'Plugin deactivation failed.', 'essential-blocks' ) );
                } else {
                    wp_send_json_success( __( 'Plugin deactivated successfully.', 'essential-blocks' ) );
                }
            } else {
                wp_send_json_error( __( 'Plugin is already inactive.', 'essential-blocks' ) );
            }
        } else {
            wp_send_json_error( __( 'Plugin file not specified.', 'essential-blocks' ) );
        }

        wp_die();
	}

}
