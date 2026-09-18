<?php

namespace EssentialBlocks\Integrations;

use EssentialBlocks\Utils\HttpRequest;

/**
 * Facebook integration — provides the editor-side AJAX bridge for the
 * Facebook Feed block's Page Access Token, mirroring Instagram's two-tier
 * privilege pattern.
 *
 * Admins receive the real token from eb_settings; editors/authors receive
 * a dummy placeholder so they can preview block layout without exposing
 * the credential.
 *
 * Token is saved through the shared `save_eb_admin_options` AJAX cluster
 * (no dedicated save endpoint needed here).
 *
 * Also surfaces an admin warning before the Page Access Token expires
 * (Graph tokens are typically ~60-day). The check is throttled and
 * fail-safe — an inconclusive Graph response never produces a false alarm.
 *
 * @see .claude/docs/features/integrations/facebook-feed.md
 */
class Facebook extends ThirdPartyIntegration {
	/**
	 * Pinned Graph version — kept in sync with
	 * EssentialBlocks\Blocks\FacebookFeed::GRAPH_VERSION.
	 */
	const GRAPH_VERSION = 'v19.0';

	/**
	 * Where the throttled debug_token result is cached.
	 */
	const STATUS_OPTION = 'eb_facebook_token_status';

	/**
	 * Don't re-hit debug_token more than once per this window.
	 */
	const RECHECK_INTERVAL = 12 * HOUR_IN_SECONDS;

	/**
	 * Start warning this long before the token expires.
	 */
	const WARN_WINDOW = 5 * DAY_IN_SECONDS;

	public function __construct() {
		$this->add_ajax(
			array(
				'get_facebook_access_token' => array(
					'callback' => 'get_facebook_access_token_callback',
					'public'   => true,
				),
			)
		);

		if ( is_admin() ) {
			add_action( 'admin_init', array( $this, 'maybe_refresh_token_status' ) );
			add_action( 'admin_notices', array( $this, 'render_expiry_notice' ) );
		}
	}

	/**
	 * Throttled refresh of the cached token status. Hits Graph's
	 * debug_token at most once per RECHECK_INTERVAL, and immediately when
	 * the stored token changes. Inconclusive responses are treated as
	 * "fine" so a Graph outage never produces a false expiry warning.
	 */
	public function maybe_refresh_token_status() {
		$eb_settings = get_option( 'eb_settings', array() );
		$token       = is_array( $eb_settings ) && ! empty( $eb_settings['facebookToken'] )
			? $eb_settings['facebookToken']
			: '';

		// No token configured — clear any stale status so the notice goes away.
		if ( $token === '' ) {
			delete_option( self::STATUS_OPTION );
			return;
		}

		$token_hash = md5( $token );
		$status     = get_option( self::STATUS_OPTION, array() );

		$is_fresh = is_array( $status )
			&& isset( $status['token_hash'], $status['checked_at'] )
			&& $status['token_hash'] === $token_hash
			&& ( time() - (int) $status['checked_at'] ) < self::RECHECK_INTERVAL;

		if ( $is_fresh ) {
			return;
		}

		$url = sprintf(
			'https://graph.facebook.com/%s/debug_token?input_token=%s&access_token=%s',
			self::GRAPH_VERSION,
			rawurlencode( $token ),
			rawurlencode( $token )
		);

		$response = HttpRequest::get_instance()->get( $url );
		$data     = isset( $response->data ) && is_object( $response->data ) ? $response->data : null;

		if ( $data === null ) {
			// Inconclusive — keep any previously known facts, just bump the
			// timestamp so we throttle and never nag on uncertainty.
			$next = is_array( $status ) ? $status : array();
			$next['token_hash'] = $token_hash;
			$next['checked_at'] = time();
			if ( ! isset( $next['expires_at'] ) ) {
				$next['expires_at'] = 0;
			}
			if ( ! isset( $next['is_valid'] ) ) {
				$next['is_valid'] = true;
			}
			update_option( self::STATUS_OPTION, $next, false );
			return;
		}

		update_option(
			self::STATUS_OPTION,
			array(
				'token_hash' => $token_hash,
				'checked_at' => time(),
				'expires_at' => isset( $data->expires_at ) ? (int) $data->expires_at : 0,
				'is_valid'   => isset( $data->is_valid ) ? (bool) $data->is_valid : true,
			),
			false
		);
	}

	/**
	 * Render a dismissible admin warning when the Page Access Token is
	 * invalid, already expired, or expiring within WARN_WINDOW. Reappears
	 * on the next page load until the token is renewed — intentional for
	 * an expiring credential.
	 */
	public function render_expiry_notice() {
		if ( ! current_user_can( 'manage_options' ) ) {
			return;
		}

		$eb_settings = get_option( 'eb_settings', array() );
		$token       = is_array( $eb_settings ) && ! empty( $eb_settings['facebookToken'] )
			? $eb_settings['facebookToken']
			: '';
		if ( $token === '' ) {
			return;
		}

		$status = get_option( self::STATUS_OPTION, array() );
		if ( ! is_array( $status ) || ! isset( $status['token_hash'] ) ) {
			return;
		}
		// Token changed since the last check — wait for the next refresh
		// rather than show a stale verdict.
		if ( $status['token_hash'] !== md5( $token ) ) {
			return;
		}

		$now        = time();
		$expires_at = isset( $status['expires_at'] ) ? (int) $status['expires_at'] : 0;
		$is_valid   = isset( $status['is_valid'] ) ? (bool) $status['is_valid'] : true;

		$type    = '';
		$message = '';

		if ( ! $is_valid || ( $expires_at > 0 && $expires_at <= $now ) ) {
			$type    = 'error';
			$message = __( 'Your Facebook Page Access Token has expired or is no longer valid. The Facebook Feed block will stop showing posts until you reconnect.', 'essential-blocks' );
		} elseif ( $expires_at > 0 && ( $expires_at - $now ) <= self::WARN_WINDOW ) {
			$type    = 'warning';
			$message = sprintf(
				/* translators: %s: human-readable time difference, e.g. "3 days" */
				__( 'Your Facebook Page Access Token expires in %s. Renew it so the Facebook Feed block keeps showing posts.', 'essential-blocks' ),
				human_time_diff( $now, $expires_at )
			);
		}

		if ( $message === '' ) {
			return;
		}

		$settings_url = admin_url( 'admin.php?page=essential-blocks' );
		printf(
			'<div class="notice notice-%1$s is-dismissible"><p>%2$s <a href="%3$s">%4$s</a></p></div>',
			esc_attr( $type ),
			esc_html( $message ),
			esc_url( $settings_url ),
			esc_html__( 'Update Facebook settings', 'essential-blocks' )
		);
	}

	/**
	 * Get Facebook Page Access Token.
	 *
	 * Admins (manage_options) receive the real token from eb_settings.
	 * Editors / authors (edit_posts) receive a dummy placeholder for preview.
	 * Anyone below edit_posts is rejected.
	 */
	public function get_facebook_access_token_callback() {
		// Always respond with JSON — never a raw die() — so the editor's
		// JSON.parse never chokes on a non-JSON body and wrongly falls back to
		// the "add a token" placeholder. `wp_send_json_*` sets the JSON
		// content-type and exits.
		$nonce = isset( $_POST['admin_nonce'] ) ? sanitize_key( $_POST['admin_nonce'] ) : '';
		if ( ! wp_verify_nonce( $nonce, 'admin-nonce' ) ) {
			wp_send_json_error( array( 'reason' => 'nonce' ) );
		}

		// Check if user has at least edit_posts capability
		if ( ! current_user_can( 'edit_posts' ) ) {
			wp_send_json_error( array( 'reason' => 'unauthorized' ) );
		}

		// Only admins get the real token + Page ID (both live in eb_settings,
		// mirroring the Instagram "connect once globally" pattern — the block
		// no longer collects either credential).
		if ( current_user_can( 'manage_options' ) ) {
			$settings = get_option( 'eb_settings' );

			// `! empty` (not `isset`) so a blank saved token is treated as
			// "not configured" rather than returned as an empty string, which
			// otherwise left the editor stuck on the loading spinner.
			if ( is_array( $settings ) && ! empty( $settings['facebookToken'] ) ) {
				wp_send_json_success(
					array(
						'token'  => $settings['facebookToken'],
						'pageId' => isset( $settings['facebookPageId'] ) ? $settings['facebookPageId'] : '',
					)
				);
			} else {
				wp_send_json_error( array( 'reason' => 'no_token' ) );
			}
		} else {
			// Non-admin users with edit_posts capability get a dummy token for
			// editor preview (Page ID irrelevant — dummy data is rendered).
			wp_send_json_success(
				array(
					'token'  => 'dummy_token_for_editor_preview',
					'pageId' => '',
				)
			);
		}
	}
}
