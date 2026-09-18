<?php
/**
 * Facebook Feed — author / page header partial.
 *
 * Variables:
 *   $showProfileImage, $showPageName, $showTimestamp,
 *   $page_name, $avatar_url, $permalink, $created_time, $enableLink, $target, $helper.
 */
?>
<div class="eb-fb-feed__head">
	<?php if ( $showProfileImage && ! empty( $avatar_url ) ) { ?>
		<img
			class="eb-fb-feed__avatar"
			src="<?php echo esc_url( $avatar_url ); ?>"
			alt="<?php echo esc_attr( $page_name ); ?>"
			loading="lazy"
		/>
	<?php } ?>

	<div class="eb-fb-feed__head-meta">
		<?php if ( $showPageName && ! empty( $page_name ) ) { ?>
			<h4 class="eb-fb-feed__name">
				<?php if ( $enableLink && ! empty( $permalink ) ) { ?>
					<a href="<?php echo esc_url( $permalink ); ?>" target="<?php echo esc_attr( $target ); ?>" rel="noopener noreferrer">
						<?php echo esc_html( $page_name ); ?>
					</a>
				<?php } else { ?>
					<?php echo esc_html( $page_name ); ?>
				<?php } ?>
			</h4>
		<?php } ?>

		<?php
		if ( $showTimestamp && ! empty( $created_time ) ) {
			$helper::views(
				'fb-partials/meta',
				array(
					'created_time' => $created_time,
				)
			);
		}
		?>
	</div>
</div>
