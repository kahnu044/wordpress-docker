<?php
add_action( 'admin_menu', 'apparel_ecommerce_store_getting_started' );
function apparel_ecommerce_store_getting_started() {
	add_theme_page( esc_html__('Get Started', 'apparel-ecommerce-store'), esc_html__('Get Started', 'apparel-ecommerce-store'), 'edit_theme_options', 'apparel-ecommerce-store-guide-page', 'apparel_ecommerce_store_test_guide');
}

// Add a Custom CSS file to WP Admin Area
function apparel_ecommerce_store_admin_theme_style() {
   wp_enqueue_style('custom-admin-style', esc_url(get_template_directory_uri()) . '/inc/get-started/get-started.css');
}
add_action('admin_enqueue_scripts', 'apparel_ecommerce_store_admin_theme_style');

//guidline for about theme
function apparel_ecommerce_store_test_guide() { 
	//custom function about theme customizer
	$return = add_query_arg( array()) ;
	$theme = wp_get_theme( 'apparel-ecommerce-store' );
?>
	<div class="wrapper-outer">
		<div class="intro">
			<h3><?php echo esc_html( $theme->Name ); ?></h3>
			<p><?php esc_html_e( 'Free Full Site Editing WordPress Theme', 'apparel-ecommerce-store' ); ?></p>
			<div class="banner-buttons">
				<a href="<?php echo esc_url( APPAREL_ECOMMERCE_STORE_THEME_DOC ); ?>" target="_blank"><?php esc_html_e('Theme Documentation', 'apparel-ecommerce-store'); ?></a>
			</div>
		</div>
		<div class="left-main-box">
			<div class="about-wrapper">
				<div class="col-left">
					<p><?php echo esc_html( $theme->get( 'Description' ) ); ?></p>
				</div>
				<div class="col-right">
					<img role="img" src="<?php echo esc_url(get_template_directory_uri()); ?>/inc/get-started/images/screenshot.png" alt="" />
				</div>
			</div>
			<div class="support-wrapper">
				<div class="review-box">
					<i class="dashicons dashicons-star-filled"></i>
					<h4><?php esc_html_e('Leave Us A Review', 'apparel-ecommerce-store'); ?></h4>
					<p><?php esc_html_e('Are you enjoying our theme? We would love to hear your feedback.', 'apparel-ecommerce-store'); ?></p>
					<div class="support-button">
						<a class="button button-primary" href="<?php echo esc_url( APPAREL_ECOMMERCE_STORE_REVIEW ); ?>" target="_blank"><?php esc_html_e('Rate Us', 'apparel-ecommerce-store'); ?></a>
					</div>
				</div>
				<div class="support-box">
					<i class="dashicons dashicons-microphone"></i>
					<h4><?php esc_html_e('Need Help?', 'apparel-ecommerce-store'); ?></h4>
					<p><?php esc_html_e('Go to our support forum to help you out in case of queries.', 'apparel-ecommerce-store'); ?></p>
					<div class="support-button">
						<a class="button button-primary" href="<?php echo esc_url( APPAREL_ECOMMERCE_STORE_SUPPORT ); ?>" target="_blank"><?php esc_html_e('Get Support', 'apparel-ecommerce-store'); ?></a>
					</div>
				</div>
				<div class="editor-box">
					<i class="dashicons dashicons-admin-appearance"></i>
					<h4><?php esc_html_e('Theme Customization', 'apparel-ecommerce-store'); ?></h4>
					<p><?php esc_html_e('Effortlessly modify and maintain your site using editor.', 'apparel-ecommerce-store'); ?></p>
					<div class="support-button">
					<a class="button button-primary" href="<?php echo esc_url( admin_url( 'site-editor.php' ) ); ?>" target="_blank"><?php esc_html_e('Site Editor', 'apparel-ecommerce-store'); ?></a>
					</div>
				</div>
			</div>
		</div>
		<div class="right-main-box">
			<div class="pro-box">
				<i class="dashicons dashicons-cover-image"></i>
				<h4><?php esc_html_e('Go For Premium', 'apparel-ecommerce-store'); ?></h4>
				<p><?php esc_html_e('Are you exited for our theme? Proceed for pro version of theme.', 'apparel-ecommerce-store'); ?></p>
				<div class="pro-buttons">
					<a class="button button-primary doc-btn" href="<?php echo esc_url( APPAREL_ECOMMERCE_STORE_PRO_THEME_DOC ); ?>" target="_blank"><?php esc_html_e('Pro Documentation', 'apparel-ecommerce-store'); ?></a>
					<a class="button button-primary buy-btn" href="<?php echo esc_url( APPAREL_ECOMMERCE_STORE_BUY_NOW ); ?>" target="_blank"><?php esc_html_e('Buy Pro', 'apparel-ecommerce-store'); ?></a>
					<a class="button button-primary demo-btn" href="<?php echo esc_url( APPAREL_ECOMMERCE_STORE_PRO_DEMO ); ?>" target="_blank"><?php esc_html_e('Pro Demo', 'apparel-ecommerce-store'); ?></a>
				</div>
				<ul class="pro-list">
					<li><?php esc_html_e('Responsive Design', 'apparel-ecommerce-store');?></li>
					<li><?php esc_html_e('Demo Content Import', 'apparel-ecommerce-store');?></li>
					<li><?php esc_html_e('Aditional plugins', 'apparel-ecommerce-store');?></li>
					<li><?php esc_html_e('Background sliders', 'apparel-ecommerce-store');?></li>
					<li><?php esc_html_e('Video popups', 'apparel-ecommerce-store');?></li>
					<li><?php esc_html_e('More Fonts and Colors', 'apparel-ecommerce-store');?></li>
					<li><?php esc_html_e('Multiple templates', 'apparel-ecommerce-store');?></li>
					<li><?php esc_html_e('Multiple front page sections', 'apparel-ecommerce-store');?></li>
					<li><?php esc_html_e('Woocommerce support', 'apparel-ecommerce-store');?></li>
					<li><?php esc_html_e('Premium support', 'apparel-ecommerce-store');?></li>
					<li><?php esc_html_e('SEO optimization', 'apparel-ecommerce-store');?></li>
					<li><?php esc_html_e('Speed optimization', 'apparel-ecommerce-store');?></li>
					<li><?php esc_html_e('Browser compatibility', 'apparel-ecommerce-store');?></li>
			</div>
		</div>
	</div>
<?php } ?>