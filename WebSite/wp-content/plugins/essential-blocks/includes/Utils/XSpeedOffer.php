<?php
namespace EssentialBlocks\Utils;

/**
 * The shared xSpeed offer record.
 *
 * EmbedPress, Essential Addons and Templately all offer xSpeed, and all three read
 * and write the same `wpdeveloper_xspeed_offer` row. Each plugin keeping its own
 * answer would mean a user who says no three times has said no once, as far as any
 * of them can tell. Read this before putting an offer in front of anyone; write it
 * when the answer changes.
 *
 * Deliberately outside the `xspeed_` namespace: xSpeed's uninstaller deletes what
 * xSpeed owns, and an answer about xSpeed is not xSpeed's to delete. The prefix
 * follows `wpdeveloper_plugins_data`, which the sibling plugins already share.
 *
 * `get_option`, not `get_site_option`: the answer is per site, like the promo that
 * asked. On multisite each subsite answers for itself.
 */
class XSpeedOffer {
	/**
	 * The shared record.
	 */
	const OPTION = 'wpdeveloper_xspeed_offer';

	/**
	 * Us, as written into the record and into the install claim.
	 */
	const HOST_SLUG = 'essential-blocks';

	/**
	 * Free and Pro. Presence of either beats any record: they have it.
	 */
	const PLUGIN_FILES = array(
		'xspeed/xspeed.php',
		'xspeed-pro/xspeed-pro.php',
	);

	const OUTCOME_OFFERED  = 'offered';
	const OUTCOME_ACCEPTED = 'accepted';
	const OUTCOME_DECLINED = 'declined';

	/**
	 * Terminal outcomes. Nothing takes these back to `offered`.
	 */
	const TERMINAL_OUTCOMES = array( self::OUTCOME_ACCEPTED, self::OUTCOME_DECLINED );

	/**
	 * Is xSpeed on disk, Free or Pro, active or not.
	 *
	 * @return bool
	 */
	public static function is_on_disk() {
		foreach ( self::PLUGIN_FILES as $file ) {
			if ( file_exists( WP_PLUGIN_DIR . '/' . $file ) ) {
				return true;
			}
		}

		return false;
	}

	/**
	 * The raw record, normalised to an array.
	 *
	 * @return array
	 */
	public static function get_record() {
		$record = get_option( self::OPTION, array() );

		return is_array( $record ) ? $record : array();
	}

	/**
	 * The recorded outcome. A corrupt or missing row reads as no answer at all.
	 *
	 * @return string
	 */
	public static function outcome() {
		$record = self::get_record();

		return ( isset( $record['outcome'] ) && is_scalar( $record['outcome'] ) )
			? (string) $record['outcome']
			: '';
	}

	/**
	 * May we put an xSpeed offer in front of this user.
	 *
	 * Withhold the offer unless nobody has answered:
	 *
	 * | Record says                     | On disk | Meaning                  | Offer? |
	 * | anything                        | yes     | they have it             | no     |
	 * | accepted                        | no      | they removed it          | no     |
	 * | declined                        | either  | they said no             | no     |
	 * | offered / absent / unreadable   | no      | nobody has answered      | yes    |
	 *
	 * `removed` is a state, not a stored value: `accepted` with the plugin gone. Derived
	 * rather than written so a deletion from the Plugins screen still counts.
	 *
	 * Our own pacing still belongs to us; this answers "has this site decided", not
	 * "how often may we ask".
	 *
	 * @return bool
	 */
	public static function may_ask() {
		if ( self::is_on_disk() ) {
			return false;
		}

		return ! in_array( self::outcome(), self::TERMINAL_OUTCOMES, true );
	}

	/**
	 * Record that an offer went up, only when there is no record at all.
	 *
	 * `add_option` rather than `update_option` gets this right for free: it fails when
	 * the row exists, so two promos racing on one page load cannot clobber each other
	 * and a stale read cannot bury a sibling's `declined`.
	 *
	 * @return bool Whether this call created the record.
	 */
	public static function mark_offered() {
		$now = time();

		return add_option(
			self::OPTION,
			array(
				'offered_by' => self::HOST_SLUG,
				'offered_at' => $now,
				'outcome'    => self::OUTCOME_OFFERED,
				'outcome_at' => $now,
			),
			'',
			false
		);
	}

	/**
	 * Record that the user took xSpeed. Only once the files are on disk.
	 *
	 * An explicit user action always proceeds, so this wins over a sibling's `declined`
	 * — without that there is no way back from a decline, since xSpeed does not write
	 * this record and a user cannot reach it.
	 *
	 * @return bool
	 */
	public static function mark_accepted() {
		return self::write_outcome( self::OUTCOME_ACCEPTED );
	}

	/**
	 * Record a no that is meant to stick.
	 *
	 * Never over an `accepted`: that row already withholds the offer, either because
	 * they have xSpeed or because they removed it, and it is the truer record of what
	 * happened.
	 *
	 * @return bool
	 */
	public static function mark_declined() {
		if ( self::OUTCOME_ACCEPTED === self::outcome() ) {
			return false;
		}

		return self::write_outcome( self::OUTCOME_DECLINED );
	}

	/**
	 * xSpeed's own report on how it came up, or an empty array when it cannot answer.
	 *
	 * Guarded twice over: `XSpeed\Host` exists only once xSpeed is active, and only
	 * from the release that introduced it.
	 *
	 * @return array
	 */
	public static function host_status() {
		if ( ! class_exists( '\XSpeed\Host' ) || ! method_exists( '\XSpeed\Host', 'status' ) ) {
			return array();
		}

		$status = \XSpeed\Host::status();

		if ( ! is_array( $status ) ) {
			return array();
		}

		return $status;
	}

	/**
	 * Write a terminal outcome, keeping `offered_at` — that is when the site was first
	 * asked, not when it answered, and a sibling pacing itself off it needs it to age.
	 *
	 * Always `autoload = false`; nothing reads this on a front-end request.
	 *
	 * @param string $outcome
	 * @return bool
	 */
	private static function write_outcome( $outcome ) {
		if ( ! in_array( $outcome, self::TERMINAL_OUTCOMES, true ) ) {
			return false;
		}

		$now    = time();
		$record = self::get_record();

		$offered_at = ( isset( $record['offered_at'] ) && is_numeric( $record['offered_at'] ) )
			? (int) $record['offered_at']
			: $now;

		$offered_by = ( isset( $record['offered_by'] ) && is_scalar( $record['offered_by'] ) && '' !== $record['offered_by'] )
			? (string) $record['offered_by']
			: self::HOST_SLUG;

		// Merge so a key a sibling release adds is not dropped on our write.
		$record = array_merge(
			$record,
			array(
				'offered_by' => $offered_by,
				'offered_at' => $offered_at,
				'outcome'    => $outcome,
				'outcome_at' => $now,
			)
		);

		return update_option( self::OPTION, $record, false );
	}
}
