<?php

namespace PriyoMukul\WPNotice\Utils;

use Exception;

trait Helper {

	public function is_installed( $plugin ) {
		if ( ! function_exists( 'get_plugins' ) ) {
			require_once ABSPATH . 'wp-admin/includes/plugin.php';
		}
		$plugins = get_plugins();

		return isset( $plugins[ $plugin ] ) ? $plugins[ $plugin ] : false;
	}

	/**
	 * Get current timestamp
	 * @return integer
	 */
	public function time() {
		return intval( current_time( 'timestamp' ) );
	}

	/**
	 * Make timestamp for a number
	 *
	 * @param string $time
	 *
	 * @return int
	 */
	public function strtotime( $time = '+7 day' ) {
		return intval( strtotime( date( 'r', $this->time() ) . " $time" ) );
	}

	public function date( $time ) {
		return date( 'd-m-Y h:i:s', $time );
	}

	/**
	 * @throws Exception
	 */
	private function error( $message ) {
		throw new Exception( esc_html($message) );
	}

	public function get_sorted_queue( $notices = [], $queue = [] ) {
		$_sorted_queue = [];

		if ( ! empty ( $queue ) ) {
			array_walk( $queue, function ( $value, $key ) use ( &$_sorted_queue, $notices ) {
				$notice = isset( $notices[ $key ] ) ? $notices[ $key ] : null;
				if ( ! is_null( $notice ) ) {
					if ( ! $notice->dismiss->is_dismissed() && ! $notice->is_expired() ) {
						$_sorted_queue[ $notice->options( 'start' ) ] = $key;
					}
				}
			} );
		}

		ksort( $_sorted_queue );

		return $_sorted_queue;
	}
}