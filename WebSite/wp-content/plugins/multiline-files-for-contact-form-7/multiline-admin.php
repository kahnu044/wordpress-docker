<?php

// enqueue admin style
function mfcf7_enqueue_plugin_style() {
        wp_register_style( 'mfcf7_admin_css', plugin_dir_url( __FILE__ ) . '/css/admin-style.css' );
        wp_enqueue_style( 'mfcf7_admin_css' );
}
add_action( 'admin_enqueue_scripts', 'mfcf7_enqueue_plugin_style' );

//this code is used to add "zl-multine-admin-files.js" file in script and localise ajax

add_action('admin_enqueue_scripts', 'mfcf7_zl_multiline_admin_files_enqueue_script');

function mfcf7_zl_multiline_admin_files_enqueue_script(){

    // Enqueue jQuery

    wp_enqueue_script('jquery');

    // Get the current time as version

    $version = time();

    // Enqueue your custom JavaScript file with dynamic version

    wp_enqueue_script('mfcf7_zl_multiline_files_script', plugin_dir_url(__FILE__) . 'js/zl-multine-admin-files.js', array('jquery'), $version, true);

    $ajax_url = admin_url('admin-ajax.php');

    wp_localize_script('mfcf7_zl_multiline_files_script', 'custom_plugin_ajax_object', array(

        'ajax_url' => $ajax_url,

    ));

}

/* Tag generator */
add_action( 'wpcf7_admin_init', 'mfcf7_zl_add_tag_for_multilinefile', 50 );
function mfcf7_zl_add_tag_for_multilinefile() {

	$tag_generator = WPCF7_TagGenerator::get_instance();

	$tag_generator->add( 'multilinefile', __( 'multilinefile', 'zl-mfcf7' ), 'mfcf7_zl_tag_multilinefile' );

}


function mfcf7_zl_tag_multilinefile( $contact_form, $args = '' ) {

	$args = wp_parse_args( $args, array() );
	$type = 'multilinefile';
	$description = __( "Generate a form-tag for a multiple file uploading field. For more details, see %s.", 'zl-mfcf7' );
	$desc_link = wpcf7_link( __( 'http://contactform7.com/file-uploading-and-attachment/', 'zl-mfcf7' ), __( 'File Uploading and Attachment', 'zl-mfcf7' ), array('target' => '_blank') );
?>

<div class="control-box">
<fieldset>
<legend><?php echo sprintf( esc_html( $description ), $desc_link ); ?></legend>
<table class="form-table">
<tbody>
	<tr>
		<th scope="row"><?php echo esc_html( __( 'Field type', 'zl-mfcf7' ) ); ?></th>
		<td>
			<fieldset>
			<legend class="screen-reader-text"><?php echo esc_html( __( 'Field type', 'zl-mfcf7' ) ); ?></legend>
			<label><input type="checkbox" name="required" /> <?php echo esc_html( __( 'Required field', 'zl-mfcf7' ) ); ?></label>
			</fieldset>
		</td>
	</tr>
	<tr>
		<th scope="row"><label for="<?php echo esc_attr( $args['content'] . '-name' ); ?>"><?php echo esc_html( __( 'Name', 'zl-mfcf7' ) ); ?></label></th>
		<td><input type="text" name="name" class="tg-name oneline" id="<?php echo esc_attr( $args['content'] . '-name' ); ?>" /></td>
	</tr>
	<tr>
		<th scope="row"><label for="<?php echo esc_attr( $args['content'] . '-values' ); ?>"><?php echo esc_html( __( 'Button Label', 'zl-mfcf7' ) ); ?></label></th>
		<td><input type="text" name="values" class="oneline" id="<?php echo esc_attr( $args['content'] . '-values' ); ?>" /></td>
	</tr>
	<tr>
		<th scope="row"><label for="<?php echo esc_attr( $args['content'] . '-limit' ); ?>"><?php echo esc_html( __( "File size limit (bytes)", 'zl-mfcf7' ) ); ?></label></th>
		<td><input type="text" name="limit" placeholder="For Ex:1048576, 1024kb, 1mb" class="filesize oneline option" id="<?php echo esc_attr( $args['content'] . '-limit' ); ?>" /></td>
	</tr>
	<tr>
		<th scope="row"><label for="<?php echo esc_attr( $args['content'] . '-filetypes' ); ?>"><?php echo esc_html( __( 'Allowed file types', 'zl-mfcf7' ) ); ?></label></th>
		<td>
			<input type="text" name="filetypes" placeholder="For Ex:gif|png|jpg|jpeg" class="filetype oneline option" id="<?php echo esc_attr( $args['content'] . '-filetypes' ); ?>" />
		</td>
	</tr>
	<tr>
		<th scope="row"><label for="<?php echo esc_attr( $args['content'] . '-accept' ); ?>"><?php echo esc_html( __( 'Add input attribute', 'zl-mfcf7' ) ); ?></label></th>
		<td><input type="text" name="accept" class="filetype oneline option" id="<?php echo esc_attr( $args['content'] . '-accept' ); ?>" /></td>
	</tr>
	<tr>
		<th scope="row"><label for="<?php echo esc_attr( $args['content'] . '-accept_wildcard' ); ?>"><?php echo esc_html( __( 'Add  accept wildcard', 'zl-mfcf7' ) ); ?></label></th>
		<td>
			<fieldset>
				<input type="text" name="accept_wildcard" class="filetype oneline option" id="<?php echo esc_attr( $args['content'] . '-accept_wildcard' ); ?>" /><small><?php echo __('Type "yes" to add wildcard'); ?></small>
			</fieldset>
		</td>
	</tr>
	<tr>
		<th scope="row"><label for="<?php echo esc_attr( $args['content'] . '-id' ); ?>"><?php echo esc_html( __( 'Id attribute', 'zl-mfcf7' ) ); ?></label></th>
		<td><input type="text" name="id" class="idvalue oneline option" id="<?php echo esc_attr( $args['content'] . '-id' ); ?>" /></td>
	</tr>
	<tr>
		<th scope="row"><label for="<?php echo esc_attr( $args['content'] . '-class' ); ?>"><?php echo esc_html( __( 'Class attribute', 'zl-mfcf7' ) ); ?></label></th>
		<td><input type="text" name="class" class="classvalue oneline option" id="<?php echo esc_attr( $args['content'] . '-class' ); ?>" /></td>
	</tr>
</tbody>
</table>
</fieldset>
</div>
<div class="insert-box">
	<input type="text" name="<?php echo $type; ?>" class="tag code" readonly="readonly" onfocus="this.select()" />
	<div class="submitbox">
		<input type="button" class="button button-primary insert-tag" value="<?php echo esc_attr( __( 'Insert Tag', 'zl-mfcf7' ) ); ?>" />
	</div>
	<br class="clear" />
	<p class="description mail-tag"><label for="<?php echo esc_attr( $args['content'] . '-mailtag' ); ?>"><?php echo sprintf( esc_html( __( "To attach the file uploaded through this field to mail, you need to insert the corresponding mail-tag (%s) into the File Attachments field on the Mail tab.", 'zl-mfcf7' ) ), '<strong><span class="mail-tag"></span></strong>' ); ?><input type="text" class="mail-tag code hidden" readonly="readonly" id="<?php echo esc_attr( $args['content'] . '-mailtag' ); ?>" /></label></p>
</div>

<?php
}

/* Warning message */
add_action( 'wpcf7_admin_notices', 'mfcf7_zl_multilinefile_display_warning_message' );
function mfcf7_zl_multilinefile_display_warning_message() {

	if ( ! $contact_form = wpcf7_get_current_contact_form() ) {
		return;
	}

	$has_tags = (bool) $contact_form->scan_form_tags( array( 'type' => array( 'multilinefile', 'multilinefile*' ) ));
	if ( ! $has_tags ) {
		return;
	}

	$file_upload_dir = wpcf7_upload_tmp_dir();
	wpcf7_init_uploads();

	if ( !wp_is_writable( $file_upload_dir ) || !is_dir( $file_upload_dir )) {
		$message = sprintf( __( 'This contact form contains file uploading fields, but the temporary folder for the files (%s) does not exist or is not writable by wordpress. You can create the folder or change its permission manually.', 'zl-mfcf7' ), $file_upload_dir );
		echo '<div class="notice notice-error is-dismissible"><p>' . esc_html( $message ) . '</p></div>';
	}
}

/* Add review and premium plugin notice */
// remove admin notice for 7 days
add_action('admin_init', 'mfcf7_zl_notice_ignor_temp');
function mfcf7_zl_notice_ignor_temp(){
	if(get_transient('mfcf7-zl-admin-do-not-show-pro-tip')) {
		update_option('mfcf7-zl-admin-do-not-show-pro-tip', strtotime('+1 year'));
		delete_transient('mfcf7-zl-admin-do-not-show-pro-tip');
	}
	if(get_transient('mfcf7-zl-admin-do-not-show-rating-tip')) {
		update_option('mfcf7-zl-admin-do-not-show-rating-tip', strtotime('+1 year'));
		delete_transient('mfcf7-zl-admin-do-not-show-rating-tip');
	}

	if ( isset($_GET['mfcf7_zl_pro_ver_notice_ignor']) && 0 == intval($_GET['mfcf7_zl_pro_ver_notice_ignor']) ) {
		update_option('mfcf7-zl-admin-do-not-show-pro-tip', strtotime('+1 year'));
	}

	if ( isset($_GET['mfcf7_zl_rating_notice_ignor']) && 0 == intval($_GET['mfcf7_zl_rating_notice_ignor']) ) {
		update_option('mfcf7-zl-admin-do-not-show-rating-tip', strtotime('+5 years'));
	}

	if ( isset($_GET['mfcf7_zl_rating_notice_ignor']) && 7 == intval($_GET['mfcf7_zl_rating_notice_ignor']) ) {
		update_option('mfcf7-zl-admin-do-not-show-rating-tip', strtotime('+7 days'));
	}
}


// Add pro version notice
add_action( 'admin_notices', 'mfcf7_zl_admin_premium_ver_notice' );
function mfcf7_zl_admin_premium_ver_notice(){
	$pro_tip_option = get_option('mfcf7-zl-admin-do-not-show-pro-tip');
  if( !$pro_tip_option || ($pro_tip_option && time() > get_option('mfcf7-zl-admin-do-not-show-pro-tip')) ){
      ?>
			<div class="notice notice-info">
				<p><?php _e('Thank you for choosing', 'zl-mfcf7');?> <strong><a href="https://wordpress.org/plugins/multiline-files-for-contact-form-7/" target="_blank"><?php _e('Multiline files upload for contact form 7', 'zl-mfcf7');?></a></strong> <?php _e('plugin.','zl-mfcf7'); ?></p>
			  <p><?php _e('For more advanced feature, please try our premium plugin.', 'zl-mfcf7');?></p><span class="mfcf7-notice-image"><a href="https://wordpress.org/plugins/multiline-files-for-contact-form-7/" target="_blank"><img src="<?php echo plugin_dir_url( __FILE__ ); ?>images/multiline_file_plugin_icon.png"></a></span>
			  <p><?php _e('Premium plugin includes:', 'zl-mfcf7');?></p>
  			<ul class="mfcf7-premium-notice-features-list">
  				<li><?php _e('Remove files one by one even if selected together', 'zl-mfcf7');?></li>
  				<li><?php _e('Change placement of selected files list', 'zl-mfcf7');?></li>
          <li><?php _e('Ability to add more than one upload button in same form or page', 'zl-mfcf7');?></li>
  				<li><?php _e('Priority Support', 'zl-mfcf7');?></li>
  			</ul>
        <?php
          $current_url = get_admin_url();
          if (strpos($current_url,'?') !== false) {
              $query_string = $current_url.'&';
          } else {
              $query_string = $current_url.'?';
          }
        ?>
			<p class="mfcf7-premium-notice-btn"><a href="https://1.envato.market/9W6qL4" target="_blank"><?php _e('Get Pro version', 'zl-mfcf7');?></a>&nbsp;<a href="<?php echo $query_string; ?>mfcf7_zl_pro_ver_notice_ignor=0"><?php _e('No Thanks', 'zl-mfcf7');?></a></p>
      </div>
      <?php
    }
}

// Add review admin notice
add_action( 'admin_notices', 'mfcf7_zl_admin_rating_notice' );
function mfcf7_zl_admin_rating_notice(){
	$rating_tip_option = get_option('mfcf7-zl-admin-do-not-show-rating-tip');
if(!$rating_tip_option || ($rating_tip_option && time() > $rating_tip_option)){
	?>
  <div class="notice notice-info 1">
		<p><?php _e('Love using <strong>Multiline files upload for contact form 7</strong> plugin, why don’t appreciate us?', 'zl-mfcf7');?></p>
    	<p><?php _e('We love and care about you. Our team is putting our maximum efforts to provide you the best functionalities.<br> We would really appreciate if you could spend a couple of seconds to give a Nice Review to the plugin for motivating us!','zl-mfcf7');?></p>
		<p><?php _e('We also offer WordPress Website Development and Customization services:', 'zl-mfcf7');?> <a href="https://zluck.com/contact-us/?utm_source=MFCF7%20Pro%20Plugin&utm_medium=MFCF7%20Pro&utm_campaign=Contact&utm_content=Contact-for%20-development" target="_blank"><?php _e('Request a Quote', 'zl-mfcf7');?></a></p>
		<p style="margin: 15px 0px;">
			<span class="mfcf7-premium-notice-btn">
				<a href="https://wordpress.org/plugins/multiline-files-for-contact-form-7/#reviews" target="_blank"><?php _e('Rate it Now', 'zl-mfcf7');?></a>
			</span>
      <?php
        $current_url = get_admin_url();
        if (strpos($current_url,'?') !== false) {
            $query_string = $current_url.'&';
        } else {
            $query_string = $current_url.'?';
        }
      ?>
			<span class="mfcf7-premium-notice-btn"><a href="<?php echo $query_string; ?>mfcf7_zl_rating_notice_ignor=7"><?php _e('Maybe Later','zl-mfcf7');?></a></span>
			 <span class="mfcf7-premium-notice-btn"><a href="<?php echo $query_string; ?>mfcf7_zl_rating_notice_ignor=0"><?php _e('Already Rated','zl-mfcf7');?></a></span>
		</p>
	</div>
<?php
	}
}

// Admin notive, if ZipArchive extension not available on server
if( !class_exists('ZipArchive') ) {
  add_action( 'admin_notices', 'mfcf7_zl_ziparchive_notice' );
  function mfcf7_zl_ziparchive_notice(){

    echo '<div class="notice notice-warning">
      <p>'. __('It seems ZIPArchived extension is not installed or not enabled. We need ZIPArchive extension available for multline file upload plugin to work.','zl-mfcf7').' <a href="https://documentation.cpanel.net/display/EA/PHP+Module%3A+Zip" target="_blank">'.__('How to install/enable ZIPArchive?','zl-mfcf7').'</a></p>
    </div>';

 }
}

// The HTML for the feedback popup is stored in the footer.

function mfcf7_zl_deactivation_popup(){

	echo get_option('mfcf7_zl_plugin_deactivate_request');

	?>

	<div class="admin_click">click here</div>

    <!-- Popup HTML Structure -->

    <div class="admin-popup-container" style="display:none;">

        <div class="admin-popup-content">

            <span class="admin-popup-close button-close"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 15 15"><path fill="currentColor" d="M3.64 2.27L7.5 6.13l3.84-3.84A.92.92 0 0 1 12 2a1 1 0 0 1 1 1a.9.9 0 0 1-.27.66L8.84 7.5l3.89 3.89A.9.9 0 0 1 13 12a1 1 0 0 1-1 1a.92.92 0 0 1-.69-.27L7.5 8.87l-3.85 3.85A.92.92 0 0 1 3 13a1 1 0 0 1-1-1a.9.9 0 0 1 .27-.66L6.16 7.5L2.27 3.61A.9.9 0 0 1 2 3a1 1 0 0 1 1-1c.24.003.47.1.64.27"/></svg></span>

			<div id="custom-plugin-modal-overlay"></div>

				<div id="custom-plugin-modal">

					<div id="custom-plugin-modal-content">

						<div class="mfcf7-modal-header">

							<h2>MFCF7 Feedback</h2>

						</div>

						<form id="custom-plugin-deactivate-form">

							<div class="mfcf7-modal-body">

								<h3><strong>If you have a moment, please let us know why you are deactivating:</strong></h3>

								<ul id="cf7-any-api-list">

								<li class="reason">

									<label>

										<input type="radio" name="selected-reason" value="I found a better plugin.">

										<span for="rad">I found a better plugin</span>

									</label>

									</li>

								<li class="reason">

									<label>

										<input type="radio" name="selected-reason" value="This plugin does not work on my site">

										<span for="rad">This plugin does not work on my site</span>

									</label>

									</li>

								<li class="reason">

									<label>

										<input type="radio" name="selected-reason" value="Design is outdated, difficult to navigate">

										<span for="rad">Design is outdated, difficult to navigate</span>

									</label>

									</li>

									<li class="reason">

									<label>

										<input type="radio" name="selected-reason" value="It's just temporary. I will be back soon.">

										<span for="rad">It's just temporary. I will be back soon</span>

									</label>

									</li>

									<li class="reason">

									<label>

										<input type="radio" name="selected-reason" value="It is not what I am looking for.">

										<span for="rad">It is not what I am looking for</span>

									</label>

									</li>

									<li class="reason">

									<label>

										<input type="radio" name="selected-reason" value=" I am finding it difficult to configure it as per my needs">

										<span for="rad"> I am finding it difficult to configure it as per my needs</span>

									</label>

									</li>

									<li class="reason">

									<label>

										<input type="radio" name="selected-reason" value="Other">

										<span for="rad">Other</span>

										<textarea name="other_reason" placeholder="Enter your reason(please specify)"></textarea>

									</label>

									</li>

								</ul>

							</div>

						<input type="hidden" name="_wpnonce" value="<?php echo esc_attr(wp_create_nonce('custom_plugin_deactivate_nonce')); ?>">

						<div class="mfcf7-modal-footer">

							<div id="loader" style="display:none;">

								<div class="loader-circle"></div>

							</div>

							<input type="submit" class="button button-secondary zl_mfcf_btn " id="deactivate-custom-post-type-filter" value="Submit &amp; Deactivate">

							<input type="button" class="button button-secondary zl_mfcf_btn cancel-deactivate-button" value="Cancel &amp; Deactivate">

						</div>

					</form>

				</div>

			</div>

        </div>

    </div>

	<?php

}

add_action( 'admin_footer', 'mfcf7_zl_deactivation_popup' );

// Created a callback function for the ‘on submit’ feedback popup to send details to a Google Form.

// function is used when user select reason

function mfcf7_zl_custom_handle_deactivation_plugin_form_submission(){

    // Log the start of the function



    if (isset($_POST['reason'])) {

        // Get the selected reason

        $reason = sanitize_text_field($_POST['reason']);

        $otherReason = isset($_POST['other_reason']) ? sanitize_text_field($_POST['other_reason']) : '';

        // Log the form data

        update_option('mfcf7_zl_plugin_deactivate_request', true);



        // Get current site URL

        $site_url = get_site_url();

        // Get current user's email

        $current_user = wp_get_current_user();

        $user_email = $current_user->user_email;

         // Prepare data to send to Google Form

        $form_data = array(

            'entry.1315009358' => $site_url,

            'entry.144564863' => $user_email,

            'entry.1682553995' => $reason === 'Other' ? $otherReason : $reason

        );

        // Send data to Google Form endpoint via AJAX

        $response = wp_remote_post('https://docs.google.com/forms/u/0/d/e/1FAIpQLSeKd-6b__62G4gZ1UNkY90q4Ws0SbSUiDVuRSPkLNaIYK43nQ/formResponse', array(

            'body' => $form_data

        ));

        // Attempt to deactivate the plugin

        wp_send_json_success(array('message' => 'Plugin deactivation requested successfully.'));

    }



}

add_action('wp_ajax_custom_plugin_deactivate', 'mfcf7_zl_custom_handle_deactivation_plugin_form_submission');



// callback function when user select deactived without reason

function mfcf7_zl_handle_deactivation_plugin_without_feedback(){

	update_option('mfcf7_zl_plugin_deactivate_request', true);

	wp_send_json_success(array('message' => 'Plugin deactivation requested successfully.'));

}

add_action('wp_ajax_deactive_plugin_without_feedback', 'mfcf7_zl_handle_deactivation_plugin_without_feedback');