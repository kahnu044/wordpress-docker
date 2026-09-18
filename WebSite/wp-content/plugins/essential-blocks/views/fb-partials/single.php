<?php
/**
 * Facebook Feed — single post card.
 *
 * Variables:
 *   $post (object from Graph API), $target, $enableLink, $messageLimit,
 *   $showProfileImage, $showPageName, $showTimestamp, $showMessage,
 *   $showReactions, $showComments, $showShares,
 *   $page_number (1-based), $hidden_attr (' hidden' or ''), $helper.
 */

if ( ! isset( $page_number ) ) {
	$page_number = 1;
}
if ( ! isset( $hidden_attr ) ) {
	$hidden_attr = '';
}

$permalink = isset( $post->permalink_url ) ? $post->permalink_url : '';
$picture   = isset( $post->full_picture ) ? $post->full_picture : '';

// Page identity comes from the post's parent. Graph returns it via `from` only
// when scopes allow; we fall back to pageId / "Facebook Page" if absent.
$page_name = '';
if ( isset( $post->from ) && is_object( $post->from ) && isset( $post->from->name ) ) {
	$page_name = $post->from->name;
}

$avatar_url = '';
if ( isset( $post->from ) && is_object( $post->from ) && isset( $post->from->id ) ) {
	$avatar_url = 'https://graph.facebook.com/' . rawurlencode( $post->from->id ) . '/picture?type=square';
}

$message = isset( $post->message ) ? $post->message : '';

// A link whose only content is an <img> needs its own accessible name —
// the image alt falls back to "" for media-only posts, which would leave
// the link empty for screen readers (WCAG 2.4.4 / 4.1.2).
$media_link_label = $page_name
	? sprintf(
		/* translators: %s: Facebook page name */
		esc_attr__( 'View post by %s on Facebook', 'essential-blocks' ),
		$page_name
	)
	: esc_attr__( 'View post on Facebook', 'essential-blocks' );
?>
<div
	class="eb-fb-feed__col"
	data-page="<?php echo esc_attr( $page_number ); ?>"
	<?php echo $hidden_attr; // already a literal ' hidden' or '' ?>
>
	<article class="eb-fb-feed__post">
		<?php if ( $showProfileImage || $showPageName || $showTimestamp ) { ?>
			<?php
			$helper::views(
				'fb-partials/author',
				array(
					'showProfileImage' => $showProfileImage,
					'showPageName'     => $showPageName,
					'showTimestamp'    => $showTimestamp,
					'page_name'        => $page_name,
					'avatar_url'       => $avatar_url,
					'permalink'        => $permalink,
					'created_time'     => isset( $post->created_time ) ? $post->created_time : '',
					'enableLink'       => $enableLink,
					'target'           => $target,
				)
			);
			?>
		<?php } ?>

		<?php if ( $showMessage && ! empty( $message ) ) { ?>
			<?php
			$helper::views(
				'fb-partials/caption',
				array(
					'message'      => $message,
					'messageLimit' => $messageLimit,
				)
			);
			?>
		<?php } ?>

		<?php if ( ! empty( $picture ) ) { ?>
			<?php if ( $enableLink && ! empty( $permalink ) ) { ?>
				<a class="eb-fb-feed__media-link" href="<?php echo esc_url( $permalink ); ?>" target="<?php echo esc_attr( $target ); ?>" rel="noopener noreferrer" aria-label="<?php echo esc_attr( $media_link_label ); ?>">
			<?php } ?>
				<div class="eb-fb-feed__media">
					<img
						src="<?php echo esc_url( $picture ); ?>"
						alt="<?php echo esc_attr( wp_strip_all_tags( $message ) ); ?>"
						loading="lazy"
					/>
				</div>
			<?php if ( $enableLink && ! empty( $permalink ) ) { ?>
				</a>
			<?php } ?>
		<?php } ?>

		<?php if ( $showReactions || $showComments || $showShares ) { ?>
			<?php
			$helper::views(
				'fb-partials/actions',
				array(
					'post'          => $post,
					'showReactions' => $showReactions,
					'showComments'  => $showComments,
					'showShares'    => $showShares,
					'permalink'     => $permalink,
					'enableLink'    => $enableLink,
					'target'        => $target,
				)
			);
			?>
		<?php } ?>
	</article>
</div>
