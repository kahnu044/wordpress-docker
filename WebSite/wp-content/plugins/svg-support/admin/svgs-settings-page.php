<?php
/**
 * Settings Page Markup
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

if ( ! function_exists( 'bodhi_svgs_icon' ) ) {
	/**
	 * Render a Lucide icon from the bundled sprite.
	 */
	function bodhi_svgs_icon( $name, $size = 16 ) {
		printf(
			'<svg class="svgs-icon" width="%1$d" height="%1$d" aria-hidden="true" focusable="false"><use href="%2$s#%3$s"></use></svg>',
			absint( $size ),
			esc_url( plugins_url( 'admin/img/icons.svg', BODHI_SVGS_PLUGIN_FILE ) ),
			esc_attr( $name )
		);
	}
}

if ( ! function_exists( 'bodhi_svgs_toggle_row' ) ) {
	/**
	 * Render one switch row. Field name/id and checked state are passed in so
	 * POST semantics stay identical to the classic checkboxes.
	 */
	function bodhi_svgs_toggle_row( $key, $label, $desc, $is_checked, $value = '' ) {
		$field = 'bodhi_svgs_settings[' . $key . ']';
		?>
		<div class="svgs-row">
			<label class="svgs-toggle-row" for="<?php echo esc_attr( $field ); ?>">
				<input id="<?php echo esc_attr( $field ); ?>" name="<?php echo esc_attr( $field ); ?>" type="checkbox" class="svgs-switch-input"<?php echo $value !== '' ? ' value="' . esc_attr( $value ) . '"' : ''; ?> <?php checked( $is_checked ); ?> />
				<span class="svgs-switch" aria-hidden="true"></span>
				<span class="svgs-toggle-text">
					<span class="svgs-toggle-label"><?php echo esc_html( $label ); ?></span>
					<span class="svgs-toggle-desc"><?php echo wp_kses( $desc, array( 'code' => array(), 'strong' => array(), 'em' => array() ) ); ?></span>
				</span>
			</label>
		</div>
		<?php
	}
}

if ( ! function_exists( 'bodhi_svgs_role_chips' ) ) {
	/**
	 * Render a role picker as accessible checkbox chips.
	 * Posts the same bodhi_svgs_settings[<key>][] array the old multiselect did.
	 */
	function bodhi_svgs_role_chips( $key, $selected_roles ) {
		global $wp_roles;
		$selected_roles = (array) $selected_roles;
		echo '<div class="svgs-chips">';
		foreach ( $wp_roles->roles as $role => $details ) {
			$slug = esc_attr( $role );
			$name = translate_user_role( $details['name'] );
			?>
			<label class="svgs-chip">
				<input type="checkbox" name="bodhi_svgs_settings[<?php echo esc_attr( $key ); ?>][]" value="<?php echo esc_attr( $slug ); ?>" <?php checked( in_array( $slug, $selected_roles, true ) ); ?> />
				<span class="svgs-chip-check"><?php bodhi_svgs_icon( 'check', 13 ); ?></span>
				<span><?php echo esc_html( $name ); ?></span>
			</label>
			<?php
		}
		echo '</div>';
	}
}

$bodhi_svgs_options = is_array( $bodhi_svgs_options ) ? $bodhi_svgs_options : array();
$bodhi_svgs_restrict_roles = isset( $bodhi_svgs_options['restrict'] ) ? (array) $bodhi_svgs_options['restrict'] : array();
$bodhi_svgs_bypass_roles   = isset( $bodhi_svgs_options['sanitize_on_upload_roles'] ) ? (array) $bodhi_svgs_options['sanitize_on_upload_roles'] : array();
?>

<div class="wrap svgs-ds">

	<div class="svgs-header">
		<img src="<?php echo esc_url( plugins_url( 'admin/img/logo.svg', BODHI_SVGS_PLUGIN_FILE ) ); ?>" width="30" height="30" alt="" />
		<h1><?php esc_html_e( 'SVG Support', 'svg-support' ); ?> <span class="svgs-version">v<?php echo esc_html( BODHI_SVGS_VERSION ); ?></span></h1>
		<span class="svgs-savestate" id="svgs-savestate" data-state="idle">
			<?php bodhi_svgs_icon( 'cloud', 16 ); ?>
			<span><?php esc_html_e( 'All changes saved', 'svg-support' ); ?></span>
		</span>
	</div>
	<hr class="wp-header-end">

	<div class="svgs-callout">
		<?php bodhi_svgs_icon( 'info', 18 ); ?>
		<div>
			<strong><?php esc_html_e( 'Style SVGs with CSS — easily.', 'svg-support' ); ?></strong>
			<p>
				<?php esc_html_e( 'Enable Advanced Mode to embed your full SVG inline via a simple', 'svg-support' ); ?>
				<code>style-svg</code>
				<?php esc_html_e( 'class, then target its internal elements with plain CSS. For help, check the Help tab (top right) or the tutorials at', 'svg-support' ); ?>
				<a href="https://svg.support/tutorials/" target="_blank">svg.support</a>.
			</p>
		</div>
	</div>

	<div class="svgs-layout">

		<div class="svgs-main">

			<form name="bodhi_svgs_settings_form" id="svgs-settings-form" method="post" action="options.php">

				<?php settings_fields( 'bodhi_svgs_settings_group' ); ?>

				<section class="svgs-panel">
					<header class="svgs-panel-head">
						<div>
							<h2><?php esc_html_e( 'General', 'svg-support' ); ?></h2>
							<p><?php esc_html_e( 'Uploads, sanitization and performance.', 'svg-support' ); ?></p>
						</div>
					</header>
					<div class="svgs-panel-body">

						<div class="svgs-row">
							<div class="svgs-field-label"><?php esc_html_e( 'Restrict SVG uploads to', 'svg-support' ); ?></div>
							<?php bodhi_svgs_role_chips( 'restrict', $bodhi_svgs_restrict_roles ); ?>
							<p class="svgs-hint"><?php esc_html_e( 'Select the user roles that are allowed to upload SVG files. Only give upload permission to roles you trust.', 'svg-support' ); ?></p>
						</div>

						<div class="svgs-row">
							<div class="svgs-field-label"><?php esc_html_e( 'Do not sanitize for these roles', 'svg-support' ); ?></div>
							<?php bodhi_svgs_role_chips( 'sanitize_on_upload_roles', $bodhi_svgs_bypass_roles ); ?>
							<p class="svgs-hint"><?php esc_html_e( 'Select the user roles that should bypass SVG sanitization on upload. Leave empty unless you fully trust a role\'s uploads.', 'svg-support' ); ?></p>
						</div>

						<?php
						bodhi_svgs_toggle_row(
							'sanitize_svg_front_end',
							__( 'Sanitize SVG on front-end', 'svg-support' ),
							__( 'Enhance security by sanitizing SVG images on the front-end. This helps prevent XSS and injection attacks.', 'svg-support' ),
							isset( $bodhi_svgs_options['sanitize_svg_front_end'] ) && 'on' === $bodhi_svgs_options['sanitize_svg_front_end']
						);

						bodhi_svgs_toggle_row(
							'minify_svg',
							__( 'Minify SVG', 'svg-support' ),
							__( 'Auto-minify all SVG uploads to keep file sizes small.', 'svg-support' ),
							isset( $bodhi_svgs_options['minify_svg'] )
						);

						bodhi_svgs_toggle_row(
							'frontend_css',
							__( 'Load front-end CSS', 'svg-support' ),
							__( 'A very small piece of CSS that helps with displaying SVGs on the front-end in some cases.', 'svg-support' ),
							isset( $bodhi_svgs_options['frontend_css'] )
						);
						?>

					</div>
				</section>

				<section class="svgs-panel" id="svgs-advanced-panel">
					<header class="svgs-panel-head">
						<div>
							<h2><?php esc_html_e( 'Advanced Mode', 'svg-support' ); ?></h2>
							<p><?php esc_html_e( 'Inline rendering, styling and animation. Adds a small JS file to your front-end.', 'svg-support' ); ?></p>
						</div>
						<div class="svgs-head-right">
							<label class="svgs-toggle-row" for="bodhi_svgs_settings[advanced_mode]">
								<input id="bodhi_svgs_settings[advanced_mode]" name="bodhi_svgs_settings[advanced_mode]" type="checkbox" class="svgs-switch-input" aria-label="<?php esc_attr_e( 'Enable Advanced Mode', 'svg-support' ); ?>" <?php checked( isset( $bodhi_svgs_options['advanced_mode'] ) ); ?> />
								<span class="svgs-switch" aria-hidden="true"></span>
							</label>
						</div>
					</header>
					<div class="svgs-panel-body">

						<div class="svgs-locked">
							<?php bodhi_svgs_icon( 'lock', 17 ); ?>
							<?php esc_html_e( 'Turn on Advanced Mode to unlock inline rendering, styling and animation options.', 'svg-support' ); ?>
						</div>

						<div class="svgs-advanced">

							<div class="svgs-row">
								<div class="svgs-field-label"><?php esc_html_e( 'CSS class to target', 'svg-support' ); ?></div>
								<input id="bodhi_svgs_settings[css_target]" class="svgs-input" name="bodhi_svgs_settings[css_target]" type="text" placeholder="style-svg" value="<?php echo isset( $bodhi_svgs_options['css_target'] ) ? esc_attr( $bodhi_svgs_options['css_target'] ) : ''; ?>" />
								<p class="svgs-hint">
									<?php esc_html_e( 'The default target class is', 'svg-support' ); ?>
									<code>style-svg</code>.
									<?php esc_html_e( 'Set your own class here, or leave blank to use the default. The plugin traverses any depth below an element carrying the class and replaces child IMG tags with SVG sources.', 'svg-support' ); ?>
								</p>
								<div class="svgs-code">
									<div class="svgs-code-bar">
										<span><?php esc_html_e( 'in your content', 'svg-support' ); ?></span>
										<span class="svgs-code-lang">html</span>
									</div>
									<pre>&lt;img class="<span class="svgs-tok">style-svg</span>" src="graphic.svg" /&gt;</pre>
								</div>
							</div>

							<?php
							bodhi_svgs_toggle_row(
								'skip_nested_svg',
								__( 'Skip nested SVGs', 'svg-support' ),
								__( 'Only inline the first SVG in a target container — useful for Gutenberg Cover blocks with nested SVG images.', 'svg-support' ),
								isset( $bodhi_svgs_options['skip_nested_svg'] ) && 1 == $bodhi_svgs_options['skip_nested_svg'],
								'1'
							);

							bodhi_svgs_toggle_row(
								'js_foot_choice',
								__( 'Output JS in footer', 'svg-support' ),
								__( 'Place the inline-rendering script before the closing body tag instead of in the head. Requires your theme to call wp_footer().', 'svg-support' ),
								isset( $bodhi_svgs_options['js_foot_choice'] )
							);

							bodhi_svgs_toggle_row(
								'use_vanilla_js',
								__( 'Use vanilla JS', 'svg-support' ),
								__( 'Load the dependency-free script instead of the jQuery version.', 'svg-support' ),
								isset( $bodhi_svgs_options['use_vanilla_js'] )
							);

							bodhi_svgs_toggle_row(
								'use_expanded_js',
								__( 'Use expanded JS', 'svg-support' ),
								__( 'Load the readable, non-minified script — useful if a caching plugin minifies your scripts externally.', 'svg-support' ),
								isset( $bodhi_svgs_options['use_expanded_js'] )
							);
							?>

							<p class="svgs-subhead"><?php esc_html_e( 'Legacy settings', 'svg-support' ); ?></p>

							<?php
							bodhi_svgs_toggle_row(
								'force_inline_svg',
								__( 'Force inline SVG', 'svg-support' ),
								__( '<strong>Use with caution!</strong> Automatically adds the target class to ALL image tags with SVG sources, rendering every SVG on your site inline. Useful when a page builder won\'t let you add a CSS class to an image.', 'svg-support' ),
								isset( $bodhi_svgs_options['force_inline_svg'] )
							);

							bodhi_svgs_toggle_row(
								'auto_insert_class',
								__( 'Automatically insert class', 'svg-support' ),
								__( '(Classic Editor only) Inserts the target class into IMG tags when you embed an SVG in a post, and strips the default WordPress classes. Only affects SVG files.', 'svg-support' ),
								isset( $bodhi_svgs_options['auto_insert_class'] )
							);
							?>

						</div>

					</div>
				</section>

				<section class="svgs-panel">
					<header class="svgs-panel-head">
						<div>
							<h2><?php esc_html_e( 'Danger zone', 'svg-support' ); ?></h2>
						</div>
					</header>
					<div class="svgs-panel-body">
						<div class="svgs-danger-row">
							<?php bodhi_svgs_icon( 'triangle-alert', 20 ); ?>
							<div class="svgs-danger-text">
								<span class="svgs-toggle-label"><?php esc_html_e( 'Delete plugin data on uninstall', 'svg-support' ); ?></span>
								<span class="svgs-toggle-desc"><?php esc_html_e( 'Removes all settings and metadata when the plugin is deleted. This cannot be undone.', 'svg-support' ); ?></span>
							</div>
							<label class="svgs-toggle-row" for="bodhi_svgs_settings[del_plugin_data]">
								<input id="bodhi_svgs_settings[del_plugin_data]" name="bodhi_svgs_settings[del_plugin_data]" type="checkbox" class="svgs-switch-input" aria-label="<?php esc_attr_e( 'Delete plugin data on uninstall', 'svg-support' ); ?>" <?php checked( isset( $bodhi_svgs_options['del_plugin_data'] ) ); ?> />
								<span class="svgs-switch" aria-hidden="true"></span>
							</label>
						</div>
					</div>
				</section>

				<p class="svgs-save-row">
					<input class="svgs-btn svgs-btn-primary" type="submit" name="bodhi_svgs_settings_submit" value="<?php esc_attr_e( 'Save changes', 'svg-support' ); ?>" />
				</p>

			</form>

		</div> <!-- .svgs-main -->

		<aside class="svgs-sidebar">

			<div class="svgs-card svgs-card-ink">
				<div class="svgs-stat">1,000,000+</div>
				<div class="svgs-stat-caption"><?php esc_html_e( 'active installs and counting', 'svg-support' ); ?></div>
				<p><?php esc_html_e( 'Maintained by one person since 2013.', 'svg-support' ); ?><br /><?php esc_html_e( 'If it\'s useful, a donation keeps it going.', 'svg-support' ); ?></p>
				<a class="svgs-btn svgs-btn-accent svgs-btn-sm svgs-btn-block" target="_blank" href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&amp;hosted_button_id=Z9R7JERS82EQQ&amp;source=url">
					<?php bodhi_svgs_icon( 'heart', 15 ); ?>
					<?php esc_html_e( 'Donate via PayPal', 'svg-support' ); ?>
				</a>
				<div class="svgs-crypto">
					<div class="svgs-crypto-item">
						<details class="svgs-qr">
							<summary title="<?php esc_attr_e( 'Show QR code', 'svg-support' ); ?>">
								<strong>BTC</strong>
								<?php bodhi_svgs_icon( 'qr-code', 14 ); ?>
							</summary>
							<span class="svgs-qr-box"><img src="<?php echo esc_url( plugins_url( 'admin/img/qr-btc.svg', BODHI_SVGS_PLUGIN_FILE ) ); ?>" width="124" height="124" alt="<?php esc_attr_e( 'Bitcoin donation address QR code', 'svg-support' ); ?>" /></span>
						</details>
						<span>1qF8r2HkTLifND7WLGfWmvxfXc9ze55DZ</span>
					</div>
					<div class="svgs-crypto-item">
						<details class="svgs-qr">
							<summary title="<?php esc_attr_e( 'Show QR code', 'svg-support' ); ?>">
								<strong>ETH</strong>
								<?php bodhi_svgs_icon( 'qr-code', 14 ); ?>
							</summary>
							<span class="svgs-qr-box"><img src="<?php echo esc_url( plugins_url( 'admin/img/qr-eth.svg', BODHI_SVGS_PLUGIN_FILE ) ); ?>" width="124" height="124" alt="<?php esc_attr_e( 'Ethereum donation address QR code', 'svg-support' ); ?>" /></span>
						</details>
						<span>0x599695Eb51aFe2e5a0DAD60aD9c89Bc8f10B54f4</span>
					</div>
				</div>
			</div>

			<div class="svgs-card">
				<h3><?php bodhi_svgs_icon( 'sparkles', 16 ); ?><?php esc_html_e( 'Tutorials & tools', 'svg-support' ); ?></h3>
				<p><?php esc_html_e( 'Guides for inline rendering, styling and animating SVGs — plus handy tools for animating and optimizing your files — all on the new site.', 'svg-support' ); ?></p>
				<a class="svgs-btn svgs-btn-secondary svgs-btn-sm svgs-btn-block" target="_blank" href="https://svg.support/tutorials/">
					<?php esc_html_e( 'Visit svg.support', 'svg-support' ); ?>
					<?php bodhi_svgs_icon( 'arrow-up-right', 14 ); ?>
				</a>
				<p class="svgs-card-links">
					<a target="_blank" href="https://wordpress.org/plugins/svg-support/"><?php esc_html_e( 'WordPress.org', 'svg-support' ); ?></a> · <a target="_blank" href="https://github.com/benbodhi/svg-support"><?php esc_html_e( 'GitHub', 'svg-support' ); ?></a> · <a target="_blank" href="https://twitter.com/svgsupport">@SVGSupport</a><br />
					&copy; <a target="_blank" href="https://benbodhi.com/">Benbodhi</a> · <a target="_blank" href="https://twitter.com/benbodhi">@benbodhi</a> · <a target="_blank" href="https://farcaster.xyz/benbodhi">Farcaster</a>
				</p>
			</div>

			<div class="svgs-card">
				<h3><?php bodhi_svgs_icon( 'life-buoy', 16 ); ?><?php esc_html_e( 'Support & reviews', 'svg-support' ); ?></h3>
				<p><?php esc_html_e( 'Need a hand? Support is handled personally through the WordPress.org forums. And if you\'re enjoying SVG Support, a quick five-star review means the world.', 'svg-support' ); ?></p>
				<div class="svgs-btn-stack">
					<a class="svgs-btn svgs-btn-secondary svgs-btn-sm svgs-btn-block" target="_blank" href="https://wordpress.org/support/plugin/svg-support/">
						<?php esc_html_e( 'Get support', 'svg-support' ); ?>
						<?php bodhi_svgs_icon( 'arrow-up-right', 14 ); ?>
					</a>
					<a class="svgs-btn svgs-btn-secondary svgs-btn-sm svgs-btn-block" target="_blank" href="https://wordpress.org/support/view/plugin-reviews/svg-support?filter=5#postform">
						<span class="svgs-btn-stars"><?php foreach ( range( 1, 5 ) as $bodhi_svgs_star ) { bodhi_svgs_icon( 'star-filled', 12 ); } ?></span>
						<?php esc_html_e( 'Leave a review', 'svg-support' ); ?>
					</a>
				</div>
			</div>

			<div class="svgs-card">
				<h3><?php esc_html_e( 'Optimize your images', 'svg-support' ); ?></h3>
				<?php
				printf(
					'<a target="_blank" class="svgs-partner-logo" href="https://shortpixel.com/h/af/OLKMLXE207471"><img src="%s" alt="%s" /></a>',
					esc_url( plugins_url( 'admin/img/shortpixel.png', BODHI_SVGS_PLUGIN_FILE ) ),
					esc_attr__( 'ShortPixel logo', 'svg-support' )
				);
				?>
				<p><?php esc_html_e( 'ShortPixel reduces the size of your JPG and PNG images with no visible quality loss — originals are kept in a backup folder. If you upgrade to a paid plan, I\'ll receive a small commission.', 'svg-support' ); ?></p>
				<a class="svgs-btn svgs-btn-secondary svgs-btn-sm svgs-btn-block" target="_blank" href="https://shortpixel.com/h/af/OLKMLXE207471">
					<?php esc_html_e( 'Try ShortPixel for free', 'svg-support' ); ?>
					<?php bodhi_svgs_icon( 'external-link', 14 ); ?>
				</a>
			</div>

		</aside>

	</div> <!-- .svgs-layout -->

</div> <!-- .wrap.svgs-ds -->
