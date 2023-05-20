<?php

// enqueue admin style
function mfcf7_enqueue_plugin_style() {
        wp_register_style( 'mfcf7_admin_css', plugin_dir_url( __FILE__ ) . '/css/admin-style.css' );
        wp_enqueue_style( 'mfcf7_admin_css' );
}
add_action( 'admin_enqueue_scripts', 'mfcf7_enqueue_plugin_style' );

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