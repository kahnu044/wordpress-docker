<?php
$hero_architecture_url = CB_PLUGIN_URL . '/assets/patterns/hero-arch.png';
$hero_coast_url        = CB_PLUGIN_URL . '/assets/patterns/hero-coast.png';
$hero_forest_url       = CB_PLUGIN_URL . '/assets/patterns/hero-forest.png';
?>
<!-- wp:cb/carousel-v2 {"align":"full","className":"cb-hero-slider","slidesPerView":1,"slidesPerGroup":1,"spaceBetween":0,"speed":600,"navigation":true,"pagination":true,"autoplay":true,"autoplaySpeed":5000,"pauseOnMouseEnter":true,"loop":true,"breakpoints":[{"width":768,"slidesPerView":1,"slidesPerGroup":1}]} -->
<div class="wp-block-cb-carousel-v2 alignfull cb-hero-slider cb-carousel-block cb-single-slide" data-cb-slides-per-view="1" data-cb-slides-per-group="1" data-cb-space-between="0" data-cb-speed="600" data-cb-navigation="true" data-cb-pagination="true" data-cb-loop="true" data-cb-autoplay="true" data-cb-autoplay-speed="5000" data-cb-pause-on-mouse-enter="true" data-cb-breakpoints="{&quot;768&quot;:{&quot;slidesPerView&quot;:1,&quot;slidesPerGroup&quot;:1}}">
	<div class="swiper">
		<div class="cb-wrapper swiper-wrapper">
			<!-- wp:cb/slide-v2 -->
			<div class="wp-block-cb-slide-v2 cb-slide swiper-slide">
				<!-- wp:cover {"url":"<?php echo esc_url( $hero_architecture_url ); ?>","dimRatio":50,"overlayColor":"black","isDark":true,"align":"full","style":{"spacing":{"padding":{"top":"6rem","bottom":"6rem"}}},"layout":{"type":"constrained","contentSize":"760px"}} -->
				<div class="wp-block-cover alignfull is-dark" style="padding-top:6rem;padding-bottom:6rem"><span aria-hidden="true" class="wp-block-cover__background has-black-background-color has-background-dim"></span><img class="wp-block-cover__image-background" alt="" src="<?php echo esc_url( $hero_architecture_url ); ?>" data-object-fit="cover"/><div class="wp-block-cover__inner-container">
						<!-- wp:paragraph {"style":{"typography":{"textTransform":"uppercase","letterSpacing":"0.12em"}},"fontSize":"small"} -->
						<p class="has-small-font-size" style="letter-spacing:0.12em;text-transform:uppercase"><?php esc_html_e( 'New collection', 'cb' ); ?></p>
						<!-- /wp:paragraph -->

						<!-- wp:heading {"level":2,"fontSize":"xx-large"} -->
						<h2 class="wp-block-heading has-xx-large-font-size"><?php esc_html_e( 'Build a modern hero slider that converts and drives engagement.', 'cb' ); ?></h2>
						<!-- /wp:heading -->

						<!-- wp:paragraph {"fontSize":"medium"} -->
						<p class="has-medium-font-size"><?php esc_html_e( 'Combine rich cover images, concise copy, and clear calls to action inside each slide for a stronger first impression.', 'cb' ); ?></p>
						<!-- /wp:paragraph -->

						<!-- wp:buttons -->
						<div class="wp-block-buttons">
							<!-- wp:button -->
							<div class="wp-block-button"><a class="wp-block-button__link wp-element-button"><?php esc_html_e( 'Shop now', 'cb' ); ?></a></div>
							<!-- /wp:button -->

							<!-- wp:button {"className":"is-style-outline"} -->
							<div class="wp-block-button is-style-outline"><a class="wp-block-button__link wp-element-button"><?php esc_html_e( 'Learn more', 'cb' ); ?></a></div>
							<!-- /wp:button -->
						</div>
						<!-- /wp:buttons -->
				</div></div>
				<!-- /wp:cover -->
			</div>
			<!-- /wp:cb/slide-v2 -->

			<!-- wp:cb/slide-v2 -->
			<div class="wp-block-cb-slide-v2 cb-slide swiper-slide">
				<!-- wp:cover {"url":"<?php echo esc_url( $hero_coast_url ); ?>","dimRatio":40,"overlayColor":"black","isDark":true,"align":"full","style":{"spacing":{"padding":{"top":"6rem","bottom":"6rem"}}},"layout":{"type":"constrained","contentSize":"760px"}} -->
				<div class="wp-block-cover alignfull is-dark" style="padding-top:6rem;padding-bottom:6rem"><span aria-hidden="true" class="wp-block-cover__background has-black-background-color has-background-dim-40 has-background-dim"></span><img class="wp-block-cover__image-background" alt="" src="<?php echo esc_url( $hero_coast_url ); ?>" data-object-fit="cover"/><div class="wp-block-cover__inner-container">
						<!-- wp:paragraph {"style":{"typography":{"textTransform":"uppercase","letterSpacing":"0.12em"}},"fontSize":"small"} -->
						<p class="has-small-font-size" style="letter-spacing:0.12em;text-transform:uppercase"><?php esc_html_e( 'Feature launch', 'cb' ); ?></p>
						<!-- /wp:paragraph -->

						<!-- wp:heading {"level":2,"fontSize":"xx-large"} -->
						<h2 class="wp-block-heading has-xx-large-font-size"><?php esc_html_e( 'Tell a story across slides without leaving the editor.', 'cb' ); ?></h2>
						<!-- /wp:heading -->

						<!-- wp:paragraph {"fontSize":"medium"} -->
						<p class="has-medium-font-size"><?php esc_html_e( 'Use any nested blocks you need, from text and buttons to media, lists, and layout blocks for richer storytelling.', 'cb' ); ?></p>
						<!-- /wp:paragraph -->

						<!-- wp:buttons -->
						<div class="wp-block-buttons">
							<!-- wp:button -->
							<div class="wp-block-button"><a class="wp-block-button__link wp-element-button"><?php esc_html_e( 'Start building', 'cb' ); ?></a></div>
							<!-- /wp:button -->
						</div>
						<!-- /wp:buttons -->
				</div></div>
				<!-- /wp:cover -->
			</div>
			<!-- /wp:cb/slide-v2 -->

			<!-- wp:cb/slide-v2 -->
			<div class="wp-block-cb-slide-v2 cb-slide swiper-slide">
				<!-- wp:cover {"url":"<?php echo esc_url( $hero_forest_url ); ?>","dimRatio":45,"overlayColor":"black","isDark":true,"align":"full","style":{"spacing":{"padding":{"top":"6rem","bottom":"6rem"}}},"layout":{"type":"constrained","contentSize":"760px"}} -->
				<div class="wp-block-cover alignfull is-dark" style="padding-top:6rem;padding-bottom:6rem"><span aria-hidden="true" class="wp-block-cover__background has-black-background-color has-background-dim-40 has-background-dim"></span><img class="wp-block-cover__image-background" alt="" src="<?php echo esc_url( $hero_forest_url ); ?>" data-object-fit="cover"/><div class="wp-block-cover__inner-container">
						<!-- wp:paragraph {"style":{"typography":{"textTransform":"uppercase","letterSpacing":"0.12em"}},"fontSize":"small"} -->
						<p class="has-small-font-size" style="letter-spacing:0.12em;text-transform:uppercase"><?php esc_html_e( 'Seasonal campaign', 'cb' ); ?></p>
						<!-- /wp:paragraph -->

						<!-- wp:heading {"level":2,"fontSize":"xx-large"} -->
						<h2 class="wp-block-heading has-xx-large-font-size"><?php esc_html_e( 'Highlight offers, launches, or stories in one reusable slider.', 'cb' ); ?></h2>
						<!-- /wp:heading -->

						<!-- wp:paragraph {"fontSize":"medium"} -->
						<p class="has-medium-font-size"><?php esc_html_e( 'Start with a solid structure, then tailor each slide with blocks your team already knows how to use.', 'cb' ); ?></p>
						<!-- /wp:paragraph -->

						<!-- wp:buttons -->
						<div class="wp-block-buttons">
							<!-- wp:button -->
							<div class="wp-block-button"><a class="wp-block-button__link wp-element-button"><?php esc_html_e( 'View campaign', 'cb' ); ?></a></div>
							<!-- /wp:button -->
						</div>
						<!-- /wp:buttons -->
				</div></div>
				<!-- /wp:cover -->
			</div>
			<!-- /wp:cb/slide-v2 -->
		</div>
	</div>
	<div class="cb-pagination swiper-pagination"></div>
	<div class="cb-button-prev swiper-button-prev"></div>
	<div class="cb-button-next swiper-button-next"></div>
</div>
<!-- /wp:cb/carousel-v2 -->
