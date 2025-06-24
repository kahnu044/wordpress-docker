<?php

namespace PriyoMukul\WPNotice\Utils;

use PriyoMukul\WPNotice\Notices;

#[\AllowDynamicProperties]
class CacheBank {
	use Helper;

	private static $instance;

	private static $accounts = [];

	private static $notices = [];

	private $priority_key = 'wpnotice_priority_time_expired';

	public static function get_instance() {
		if ( self::$instance === null ) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	public function __construct() {
		add_action( 'admin_notices', [ $this, 'notices' ] );
		add_action( 'admin_footer', [ $this, 'scripts' ] );
	}


	public function create_account( $app ) {
		$priority = isset( $app->options['priority'] ) ? $app->priority : count( self::$accounts );

		if ( isset( $app->args['version'] ) && $app->args['version'] === '1.0.0' ) {
			$priority = 999 + count( self::$accounts );
		}

		if ( isset( self::$accounts[ $priority ] ) ) {
			return;
		}

		self::$accounts[ $priority ] = $app;

		ksort( self::$accounts );
	}

	public function calculate_deposits( $app ) {
		if ( ! $app instanceof Notices ) {
			return;
		}

		foreach ( $app->notices as $id => $notice ) {
			$this->deposit( $app->id, $id, $notice );
		}
	}

	public function deposit( $account, $id, $value ) {
		self::$notices[ $account ][ $id ] = $value;
	}

	private function get_current_account() {
		if ( ! empty( self::$accounts ) ) {
			/**
			 * @var Notices $account
			 */
			foreach ( self::$accounts as $account ) {
				$notices = $this->eligible_notices( $account->notices, $account->queue );

				$notices = array_filter( $notices, function ( $notice_key ) use ( $account ) {
					$notice = self::$notices[ $account->id ][ $notice_key ];

					return $notice->show();
				} );

				if ( ! empty( $notices ) ) {
					return $account;
				}
			}
		}

		return false;
	}

	/**
	 * @return Notices
	 */
	public function get() {
		/**
		 * @var Notices $current_notice ;
		 */
		return $this->get_current_account();
	}

	public function notices() {
		$notice = $this->get();

		if( $notice && ! $notice->dev_mode ) {
			if ( get_transient( $this->priority_key ) ) {
				return;
			}
		}

		if ( $notice instanceof Notices ) {
			$notice->notices();
		}
	}

	/**
	 * @return void
	 */
	public function scripts() {
		$notice = $this->get();

		if( $notice && ! $notice->dev_mode ) {
			if ( get_transient( $this->priority_key ) ) {
				return;
			}
		}

		if ( $notice instanceof Notices ) {
			$notice->scripts();
		}
	}

	/**
	 * This is a fallback method of Notices::eligible_notices.
	 * Please make sure changes are done in both classes.
	 *
	 * @param $notices
	 * @param $queue
	 *
	 * @return array
	 */
	private function eligible_notices( $notices = [], $queue = [] ) {
		return $this->get_sorted_queue($notices, $queue);
	}

	public function clear_notices_in_( $screens, $app, $re_initiate = false ) {
		add_action( 'in_admin_header', function() use( $screens, $app, $re_initiate ) {
			$this->clear( $screens, $app, $re_initiate );
		} );
	}

	public function clear( $screens, $app, $re_initiate = false ) {
		$current_screen = get_current_screen();

		if( in_array( $current_screen->id, $screens, true ) ) {
			remove_all_actions( 'admin_notices' );

			if( $re_initiate ) {
				self::$accounts = [];
				self::$instance = new self();
				self::$instance->create_account( $app );
				self::$instance->calculate_deposits( $app );
			}
		}
	}
}