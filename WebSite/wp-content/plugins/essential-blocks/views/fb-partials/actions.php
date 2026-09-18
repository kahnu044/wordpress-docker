<?php
/**
 * Facebook Feed — reactions / comments / shares row.
 *
 * Variables:
 *   $post (Graph API object), $showReactions, $showComments, $showShares,
 *   $permalink, $enableLink, $target.
 */

$reactions = 0;
if ( isset( $post->reactions ) && isset( $post->reactions->summary ) && isset( $post->reactions->summary->total_count ) ) {
	$reactions = (int) $post->reactions->summary->total_count;
}

$comments = 0;
if ( isset( $post->comments ) && isset( $post->comments->summary ) && isset( $post->comments->summary->total_count ) ) {
	$comments = (int) $post->comments->summary->total_count;
}

$shares = 0;
if ( isset( $post->shares ) && isset( $post->shares->count ) ) {
	$shares = (int) $post->shares->count;
}
?>
<?php
// Counts are conveyed with a visually-hidden phrase (pluralised + i18n)
// because aria-label on a non-interactive <span> is not reliably exposed
// by assistive tech. The visible icon + number are aria-hidden so the
// screen reader hears only the full phrase, e.g. "128 reactions"
// (WCAG 1.1.1 / 1.3.1). The shares link gets an aria-label so it has a
// descriptive accessible name (WCAG 2.4.4).
$reactions_sr = sprintf(
	/* translators: %s: number of reactions */
	_n( '%s reaction', '%s reactions', $reactions, 'essential-blocks' ),
	number_format_i18n( $reactions )
);
$comments_sr = sprintf(
	/* translators: %s: number of comments */
	_n( '%s comment', '%s comments', $comments, 'essential-blocks' ),
	number_format_i18n( $comments )
);
$shares_sr = sprintf(
	/* translators: %s: number of shares */
	_n( '%s share', '%s shares', $shares, 'essential-blocks' ),
	number_format_i18n( $shares )
);

// Action icons are Font Awesome. Enqueue at point of use (mirrors the
// readtime / rating partials) — FA ships enabled by default.
wp_enqueue_style( 'essential-blocks-fontawesome' );
?>
<div class="eb-fb-feed__actions">
	<?php if ( $showReactions ) { ?>
		<span class="eb-fb-feed__action eb-fb-feed__action--reactions">
			<span class="eb-fb-feed__icon" aria-hidden="true"><i class="far fa-thumbs-up"></i></span>
			<span class="eb-fb-feed__count" aria-hidden="true"><?php echo esc_html( number_format_i18n( $reactions ) ); ?></span>
			<span class="eb-fb-feed__sr-only"><?php echo esc_html( $reactions_sr ); ?></span>
		</span>
	<?php } ?>

	<?php if ( $showComments ) { ?>
		<span class="eb-fb-feed__action eb-fb-feed__action--comments">
			<span class="eb-fb-feed__icon" aria-hidden="true"><i class="far fa-comments"></i></span>
			<span class="eb-fb-feed__count" aria-hidden="true"><?php echo esc_html( number_format_i18n( $comments ) ); ?></span>
			<span class="eb-fb-feed__sr-only"><?php echo esc_html( $comments_sr ); ?></span>
		</span>
	<?php } ?>

	<?php if ( $showShares ) { ?>
		<?php if ( $enableLink && ! empty( $permalink ) ) { ?>
			<a class="eb-fb-feed__action eb-fb-feed__action--shares" href="<?php echo esc_url( $permalink ); ?>" target="<?php echo esc_attr( $target ); ?>" rel="noopener noreferrer" aria-label="<?php echo esc_attr( $shares_sr ); ?>">
				<span class="eb-fb-feed__icon" aria-hidden="true"><i class="fas fa-share"></i></span>
				<span class="eb-fb-feed__count" aria-hidden="true"><?php echo esc_html( number_format_i18n( $shares ) ); ?></span>
			</a>
		<?php } else { ?>
			<span class="eb-fb-feed__action eb-fb-feed__action--shares">
				<span class="eb-fb-feed__icon" aria-hidden="true"><i class="fas fa-share"></i></span>
				<span class="eb-fb-feed__count" aria-hidden="true"><?php echo esc_html( number_format_i18n( $shares ) ); ?></span>
				<span class="eb-fb-feed__sr-only"><?php echo esc_html( $shares_sr ); ?></span>
			</span>
		<?php } ?>
	<?php } ?>
</div>
<?php
/**
 * Fires immediately after the reactions/comments/shares row.
 *
 * Pro listens here to append the per-emoji reaction breakdown row
 * (gated on the showReactionBreakdown attribute). Free emits nothing.
 *
 * @param object $post The Graph API post object for this card.
 */
if ( isset( $post ) ) {
	do_action( 'essential_blocks/facebook_feed/after_actions', $post );
}
?>
