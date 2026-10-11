<?php
namespace EssentialBlocks\Utils;

use Plugin_Upgrader;
use WP_Filesystem_Base;
use WP_Ajax_Upgrader_Skin;
use EssentialBlocks\Traits\HasSingletone;

class Installer {
	use HasSingletone;

	/**
	 * Some process take long time to execute
	 * for that need to raise the limit.
	 */
	public static function raise_limits() {
		wp_raise_memory_limit( 'admin' );
		if ( wp_is_ini_value_changeable( 'max_execution_time' ) ) {
			@ini_set( 'max_execution_time', 0 );
		}
		@set_time_limit( 0 );
	}

	public function install( $plugin ) {
		require_once ABSPATH . 'wp-admin/includes/plugin.php';
		require_once ABSPATH . 'wp-admin/includes/file.php';
		require_once ABSPATH . 'wp-admin/includes/class-wp-upgrader.php';
		include_once ABSPATH . 'wp-admin/includes/plugin-install.php';

		self::raise_limits();

		$response = array( 'success' => false );

		$_plugins     = Helper::get_plugins();
		$is_installed = isset( $_plugins[ $plugin['plugin_file'] ] );

		// Match by plugin folder too, so a plugin installed under another main file isn't downloaded again.
		if ( ! $is_installed && ! empty( $plugin['slug'] ) ) {
			$installed_file = $this->find_plugin_file( $_plugins, $plugin['slug'] );
			if ( $installed_file ) {
				$plugin['plugin_file'] = $installed_file;
				$is_installed          = true;
			}
		}

		if ( isset( $plugin['is_pro'] ) && $plugin['is_pro'] == true ) {
			if ( ! $is_installed ) {
				$status['code']    = 'pro_plugin';
				$status['message'] = 'Pro Plugin';
			}
		}

		if ( ! $is_installed ) {
			if ( ! current_user_can( 'install_plugins' ) ) {
				$response['code']    = 'no_install_permission';
				$response['message'] = __( 'You do not have permission to install plugins on this site.', 'essential-blocks' );
				return $response;
			}

			/**
			 * @var array|object $api
			 */
			$api = plugins_api(
				'plugin_information',
				array(
					'slug'   => sanitize_key( wp_unslash( $plugin['slug'] ) ),
					'fields' => array(
						'sections' => false,
					),
				)
			);

			if ( is_wp_error( $api ) ) {
				$response['message'] = $api->get_error_message();
				return $response;
			}

			$response['name'] = $api->name;

			$skin     = new WP_Ajax_Upgrader_Skin();
			$upgrader = new Plugin_Upgrader( $skin );
			$result   = $upgrader->install( $api->download_link );

			if ( is_wp_error( $result ) ) {
				$response['code']    = $result->get_error_code();
				$response['message'] = $result->get_error_message();
				return $response;
			} elseif ( is_wp_error( $skin->result ) ) {
				$response['code']    = $skin->result->get_error_code();
				$response['message'] = $skin->result->get_error_message();

				return $response;
			} elseif ( $skin->get_errors()->has_errors() ) {
				$response['message'] = $skin->get_error_messages();

				return $response;
			} elseif ( is_null( $result ) ) {
				global $wp_filesystem;
				$response['code']    = 'unable_to_connect_to_filesystem';
				$response['message'] = __( 'Unable to connect to the filesystem. Please confirm your credentials.', 'essential-blocks' );

				if ( $wp_filesystem instanceof WP_Filesystem_Base && is_wp_error( $wp_filesystem->errors ) && $wp_filesystem->errors->has_errors() ) {
					$response['message'] = esc_html( $wp_filesystem->errors->get_error_message() );
				}
				return $response;
			}

			$install_status        = install_plugin_install_status( $api );
			$plugin['plugin_file'] = $install_status['file'];
		}

		$response['slug'] = $plugin['slug'];

		if ( is_plugin_active( $plugin['plugin_file'] ) ) {
			$response['success'] = true;
			$response['code']    = 'already_active';
			return $response;
		}

		$activate_status = $this->activate_plugin( $plugin['plugin_file'] );
		if ( is_wp_error( $activate_status ) ) {
			$response['code']    = $activate_status->get_error_code();
			$response['message'] = $activate_status->get_error_message();
		} elseif ( $activate_status ) {
			$response['success'] = true;
		} else {
			$response['code']    = 'no_activate_permission';
			$response['message'] = __( 'You do not have permission to activate this plugin.', 'essential-blocks' );
		}

		return $response;
	}

	/**
	 * Find an installed plugin's main file by its folder name.
	 *
	 * @param array  $plugins Installed plugins from get_plugins().
	 * @param string $slug    Plugin folder slug.
	 * @return string Plugin file, or empty string when not installed.
	 */
	private function find_plugin_file( $plugins, $slug ) {
		$prefix = sanitize_key( $slug ) . '/';

		foreach ( array_keys( (array) $plugins ) as $file ) {
			if ( 0 === strpos( $file, $prefix ) ) {
				return $file;
			}
		}

		return '';
	}

	private function activate_plugin( $file ) {
		if ( current_user_can( 'activate_plugin', $file ) && is_plugin_inactive( $file ) ) {
			$result = activate_plugin( $file, false, false );
			if ( is_wp_error( $result ) ) {
				return $result;
			} else {
				return true;
			}
		}

		return false;
	}
}
