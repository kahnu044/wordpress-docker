<?php

/**
 * Plugin Name: MultiLine files for Contact Form 7
 * Description: Upload unlimited files one by one to contact form 7
 * Plugin URI: https://wordpress.org/plugins/multiline-files-for-contact-form-7/
 * Version: 2.9.1
 * Author: Zluck Solutions
 * Author URI: https://profiles.wordpress.org/zluck
 * Text Domain: zl-mfcf7
 * Domain Path: /languages
 */
/**
 ** base class for [multilinefile] and [multilinefile*]
 **/

// Prevent direct access to the file
if (!defined('ABSPATH')) {
    exit;
}

// Include the deactivation handler
require_once plugin_dir_path(__FILE__) . 'multiline-admin.php';

if (!function_exists('is_plugin_active')) {
	include_once(ABSPATH . 'wp-admin/includes/plugin.php');
}

//check contact form installation 
if (is_plugin_active('contact-form-7/wp-contact-form-7.php')) {
	$latest_contact_form_7new = false;
	if ((float)WPCF7_VERSION >= 5.6) {
		$latest_contact_form_7new  = true;
	}
} else {
	add_action('admin_notices', 'mfcf7_zl_warning_if_cf7_deactivated');
	$latest_contact_form_7new = true;
}

// This code display warning when user active plugin without contact form 7
function mfcf7_zl_warning_if_cf7_deactivated(){
	echo '<div class="notice notice-error">
		  		<p>Important: Mfcf7 plugin only compatible with contact form 7. Please install or activate contact form 7 plugin first. </p>
		  </div>';
	deactivate_plugins(plugin_basename(__FILE__));
	//print_r($_GET);
	if (isset($_GET['activate'])) {
		unset($_GET['activate']);
	}
}

$latest_contact_form_7 = false;
if (function_exists('wpcf7_add_form_tag')) {
	$latest_contact_form_7 = true;
}
$mfcf7_btn_tag_name = 'zl-mfcf7-upld-btn';
/* Register activation hook. */
register_activation_hook(__FILE__, 'mfcf7_zl_admin_notice_activation_hook');


//function responsible for deactive plugin 
// Check for the deactivation request on the next page load
add_action('admin_init', 'mfcf7_zl_plugin_check_deactivation_request');
function mfcf7_zl_plugin_check_deactivation_request() {

    if (get_option('mfcf7_zl_plugin_deactivate_request', false)) {

        // Perform the actual deactivation

        deactivate_plugins(plugin_basename(__FILE__));

        // Display the admin notice

        add_action('admin_notices', 'mfcf7_zl_plugin_deactivation_notice');

        update_option('mfcf7_zl_plugin_deactivate_request', false);
    }
}

// Display notice after deavtivate
function mfcf7_zl_plugin_deactivation_notice() {
    ?>
    <div class="notice notice-success is-dismissible">
        <p><?php echo esc_html__('Plugin deactivated successfully.', 'zl-mfcf7'); ?></p>
    </div>
    <?php
}

// display notices after 1,3,5 days
function mfcf7_zl_admin_notice_activation_hook()
{
	if (get_transient('mfcf7-zl-admin-do-not-show-pro-tip')) {
		update_option('mfcf7-zl-admin-do-not-show-pro-tip', strtotime('+1 year'));
		delete_transient('mfcf7-zl-admin-do-not-show-pro-tip');
	} else {
		update_option('mfcf7-zl-admin-do-not-show-pro-tip', strtotime('+3 days'));	//show after 3 days
	}
	if (get_transient('mfcf7-zl-admin-do-not-show-rating-tip')) {
		update_option('mfcf7-zl-admin-do-not-show-rating-tip', strtotime('+1 year'));
		delete_transient('mfcf7-zl-admin-do-not-show-rating-tip');
	} else {
		update_option('mfcf7-zl-admin-do-not-show-rating-tip', strtotime('+5 days')); //show after 5 days
	}
}
/* Enqueue required javascript */
add_action('wp_enqueue_scripts', 'mfcf7_zl_multiline_files_enqueue_script');
function mfcf7_zl_multiline_files_enqueue_script()
{
	wp_enqueue_script('mfcf7_zl_multiline_files_script', plugin_dir_url(__FILE__) . 'js/zl-multine-files.js', array('jquery'));
}
add_action('wp_enqueue_scripts', 'mfcf7_zl_plugin_button_style');
function mfcf7_zl_plugin_button_style()
{
	wp_enqueue_style('mfcf7_zl_button_style', plugin_dir_url(__FILE__) . 'css/style.css?12');
}
/* Define Shortcode handler */
add_action('wpcf7_init', 'mfcf7_zl_add_shortcode_multilinefile');
function mfcf7_zl_add_shortcode_multilinefile()
{
	// global $latest_contact_form_7;
	// if ($latest_contact_form_7)
	wpcf7_add_form_tag(array('multilinefile', 'multilinefile*'), 'mfcf7_zl_multilinefile_shortcode_handler', array(
		'name-attr' => true,
		'file-uploading' => true,
	));
	// else
	// 	wpcf7_add_shortcode(array('multilinefile', 'multilinefile*'), 'mfcf7_zl_multilinefile_shortcode_handler', array(
	// 		'name-attr' => true,
	// 		'file-uploading' => true,
	// 	));
}
function mfcf7_zl_multilinefile_shortcode_handler($tag)
{
	$html = '';
	// global $latest_contact_form_7;
	// if ($latest_contact_form_7)
	$tag = new WPCF7_FormTag($tag);
	// else
	// 	$tag = new WPCF7_Shortcode($tag);
	if (empty($tag->name)) {
		return '';
	}

	$error_in_validation = wpcf7_get_validation_error($tag->name);
	$class = wpcf7_form_controls_class($tag->type);
	if ($error_in_validation) {
		$class .= ' wpcf7-not-valid';
	}
	$atts = array();
	$atts['size'] = $tag->get_size_option('40');
	$atts['class'] = $tag->get_class_option($class);
	$atts['id'] = $tag->get_id_option();
	$atts['tabindex'] = $tag->get_option('tabindex', 'int', true);
	$atts['accept'] = $tag->get_option('accept', null, true);
	$atts['multiple'] = 'multiple';
	$values = isset($tag->values[0]) ? $tag->values[0] : '';
	if (empty($values)) {
		$values = __('Upload', 'zl-mfcf7');
	}
	$upload_label = $atts['value'] = $values;
	$accept_wildcard = '';
	$accept_wildcard = $tag->get_option('accept_wildcard');

	if ($tag->is_required()) {
		$atts['aria-required'] = 'true';
	}
	if (!empty($accept_wildcard)) {
		$atts['accept'] = $atts['accept'] . '/*';
	}
	$atts['aria-invalid'] = $error_in_validation ? 'true' : 'false';
	$atts['type'] = 'file';
	$atts['name'] = $tag->name . '[]';
	$atts = apply_filters('cf7_multilinefile_atts', $atts);
	$atts = wpcf7_format_atts($atts);
	$html .= sprintf(
		apply_filters('cf7_multilinefile_input', '<span class="mfcf7-zl-multiline-sample" style="display:none"><p class="wpcf7-form-control-wrap %1$s"><input %2$s />%3$s <span class="mfcf7-zl-multifile-name"></span><a href="javascript:void(0);" class="mfcf7_zl_delete_file"><span class="delete-file" aria-hidden="true">&#x274C;</span></a></p></span>', $atts),
		sanitize_html_class($tag->name),
		$atts,
		$error_in_validation
	);
	// $a = sprintf(
	// 	apply_filters('cf7_multilinefile_input', '<p class="wpcf7-form-control-wrap %1$s"><input %2$s />%3$s <span class="mfcf7-zl-multifile-name"></span></p>', $atts),
	// 	sanitize_html_class($tag->name),
	// 	$atts,
	// 	$error_in_validation
	// );
	// $html = $a.'<div id="mfcf7_zl_multifilecontainer">' . $html . '</div>';
	$html = '<div id="mfcf7_zl_multifilecontainer">' . $html . '</div>';
	//old 
	// $html .= '<span class="wpcf7-form-control-wrap ' . $tag->name . '"></span>';
	//new	
	$html .= sprintf(
		// apply_filters('cf7_multilinefile_input', '<p class="wpcf7-form-control-wrap zl-form-control-wrap %1$s"><input %2$s />%3$s <span class="mfcf7-zl-multifile-name"></span></p>', $atts),
		//old // apply_filters('cf7_multilinefile_input', '<p class="wpcf7-form-control-wrap zl-form-control-wrap %1$s"><input %2$s />%3$s <span class="mfcf7-zl-multifile-name"></span><a href="javascript:void(0);" class="mfcf7_zl_delete_file"><span class="delete-file" aria-hidden="true">&#x274C;</span></a></p>', $atts),
		apply_filters('cf7_multilinefile_input', '<span class="wpcf7-form-control-wrap zl-form-control-wrap %1$s"><input %2$s />%3$s <span class="mfcf7-zl-multifile-name"></span><a href="javascript:void(0);" class="mfcf7_zl_delete_file"><span class="delete-file" aria-hidden="true">&#x274C;</span></a></span>', $atts),
		sanitize_html_class($tag->name),
		$atts,
		$error_in_validation
	);
	global $mfcf7_btn_tag_name;
	$btntagname = $tag->name . '-' . $mfcf7_btn_tag_name;
	// $html .= '<a href="javascript:void(0);" id="mfcf7_zl_add_file">'.$upload_label.'</a>';
	$html .= '<p><label><span class="wpcf7-form-control-wrap" data-name="' . $btntagname . '"><input type="button" name="' . $btntagname . '" class="button button-primary qbutton" id="mfcf7_zl_add_file" value="' . $upload_label . '"></span></label></p>';
	return $html;
}

/* Enctype filter */
add_filter('wpcf7_form_enctype', 'mfcf7_zl_multilinefile_form_enctype_filter');
function mfcf7_zl_multilinefile_form_enctype_filter($enctype)
{

	// global $latest_contact_form_7;
	// if ($latest_contact_form_7)
	$multipart = (bool) wpcf7_scan_form_tags(array('type' => array('multilinefile', 'multilinefile*')));
	// else
	// $multipart = (bool) wpcf7_scan_shortcode(array('type' => array('multilinefile', 'multilinefile*')));
	if ($multipart) {
		$enctype = 'multipart/form-data';
	}
	return $enctype;
}

global $latest_contact_form_7new;
if ($latest_contact_form_7new) {
	add_action('wpcf7_before_send_mail', 'mfcf7_zlchange_attachments', 10, 3);
}
function mfcf7_zlchange_attachments($cf7, &$abort, $object)
{

	$properties = $cf7->get_properties();

	$submission = WPCF7_Submission::get_instance();

	wpcf7_init_uploads();
	$uploads_dir = wpcf7_upload_tmp_dir();
	$uploads_dir = wpcf7_maybe_add_random_dir($uploads_dir);
	$zip_link_upload_dir   = wp_upload_dir();
	$attachments = '';
	$single_img = '';

	if ($submission) {

		$multitags = empty($submission->get_contact_form()->scan_form_tags(array('type' => 'multilinefile'))) ? $submission->get_contact_form()->scan_form_tags(array('type' => 'multilinefile*')) : $submission->get_contact_form()->scan_form_tags(array('type' => 'multilinefile'));
		
		if(!empty($submission->get_contact_form()->scan_form_tags(array('type' => 'file'))) && !empty($submission->get_contact_form()->scan_form_tags(array('type' => 'file*')))){
			$filenotrequired = $submission->get_contact_form()->scan_form_tags(array('type' => 'file'));
			$filerequired    = $submission->get_contact_form()->scan_form_tags(array('type' => 'file*'));
			$cf7_file        = array_merge($filerequired, $filenotrequired);
		}else{
			$cf7_file = empty($submission->get_contact_form()->scan_form_tags(array('type' => 'file'))) ? $submission->get_contact_form()->scan_form_tags(array('type' => 'file*')) : $submission->get_contact_form()->scan_form_tags(array('type' => 'file'));
		}
		
		if(is_array($cf7_file) && !empty($cf7_file)){
			$multitags = array_merge($cf7_file, $multitags);
		}
		
		$getuploadfiles = $submission->uploaded_files();

		foreach ($multitags as $m_key => $multitag) {

			$uniqid = uniqid();

			$zipped_files = trailingslashit($uploads_dir) . $uniqid . '.zip';

			if (!empty($getuploadfiles[$multitag['name']]) && count($getuploadfiles[$multitag['name']]) >= 2) {

				$zipping = mfcf7_zl_multilinefile_create_zip($getuploadfiles[$multitag['name']], $zipped_files);

				@chmod($zipped_files, 0440);

				$attachments = ($attachments != '') ? $attachments . PHP_EOL . $zipped_files : $zipped_files;

				if ($zipping === false) {

					$abort = true;

					$properties['messages']['mail_sent_ng'] = wpcf7_get_message('zipping_failed');
				}
			} elseif (!empty($getuploadfiles[$multitag['name']]) && count($getuploadfiles[$multitag['name']]) < 2) {

				$single_img = ($single_img != '') ? $single_img . PHP_EOL . $getuploadfiles[$multitag['name']][0] : $getuploadfiles[$multitag['name']][0];
			}
		}
	}
		
	if ($single_img != '' && $attachments != '') {

		$properties['mail']['attachments'] = $attachments.PHP_EOL.$single_img;

	} else if ($attachments != '') {
		$properties['mail']['attachments'] = $attachments;
	} else {
		$properties['mail']['attachments'] = $single_img;
	}
	
	$cf7->set_properties($properties);
}

/* Validation + upload handling filter */
if ($latest_contact_form_7new) {
	add_filter('wpcf7_validate_multilinefile', 'mfcf7_zl_multilinefile_validation_filter', 10, 3);
	add_filter('wpcf7_validate_multilinefile*', 'mfcf7_zl_multilinefile_validation_filter', 10, 3);
} else {
	add_filter('wpcf7_validate_multilinefile', 'mfcf7_zl_multilinefile_validation_filtero', 10, 2);
	add_filter('wpcf7_validate_multilinefile*', 'mfcf7_zl_multilinefile_validation_filtero', 10, 2);
}

function mfcf7_zl_multilinefile_validation_filter($result, $tag, $args)
{
	$args = wp_parse_args($args, array());
	// $smID = WPCF7_Submission::get_instance()->get_contact_form()->id();
	// if (isset($args['uploaded_files'])) {	
	// 	$maybe_error = $args['uploaded_files'];			
	// 	if (is_wp_error($maybe_error)) {
	// 		$result->invalidate($tag, $maybe_error->get_error_message());
	// 	}

	// 	$file_count = count($args['uploaded_files']);
	// 	$min_file_allow = $tag->get_option('minfile');
	// 	$max_file_allow = $tag->get_option('maxfile');
	// 	if (!empty($min_file_allow) || !empty($max_file_allow)) {
	// 		if (!empty($min_file_allow) && $file_count < $min_file_allow[0]) {
	// 			$message = wpcf7_get_message('zl_min_file_count_validation_msg');
	// 			$message = str_replace('__min_file_limit__', $min_file_allow[0], $message);
	// 			$result->invalidate($tag, $message);
	// 			return $result;
	// 		} else if (!empty($max_file_allow) && $file_count > $max_file_allow[0]) {
	// 			$message = wpcf7_get_message('zl_max_file_count_validation_msg');
	// 			$message = str_replace('__max_file_limit__', $max_file_allow[0], $message);
	// 			$result->invalidate($tag, $message);
	// 			return $result;
	// 		}
	// 	}
	// }
	// return $result;
	// die();

	global $latest_contact_form_7;
	if ($latest_contact_form_7)
		$tag = new WPCF7_FormTag($tag);
	else
		$tag = new WPCF7_Shortcode($tag);

	$name = $tag->name;
	$id = $tag->get_id_option();
	$uniqid = uniqid();
	$original_files_array = isset($_FILES[$name]) ? $_FILES[$name] : null;
	if ($original_files_array === null) {
		$original_files_array['tmp_name'] = array();
	}
	if (isset($_FILES[$name]) && isset($_FILES[$name]['name']))
		$total = count($_FILES[$name]['name']);
	else
		$total = 0;
	$files = array();
	$new_files = array();
	for ($i = 0; $i < $total; $i++) {
		if (empty($original_files_array['tmp_name'][$i]))
			continue;
		$files[] = array(
			'name'      => $original_files_array['name'][$i],
			'type'      => $original_files_array['type'][$i],
			'tmp_name'  => $original_files_array['tmp_name'][$i],
			'error'     => $original_files_array['error'][$i],
			'size'      => $original_files_array['size'][$i]
		);
	}

	global $mfcf7_btn_tag_name;
	$btntagname = $tag->name . '-' . $mfcf7_btn_tag_name;
	$tag->name = $btntagname;
	// Min/Max file count validation
	$file_count = count($files);
	$min_file_allow = $tag->get_option('minfile');
	if (!empty($min_file_allow) && $file_count < $min_file_allow[0]) {
		$message = wpcf7_get_message('zl_min_file_count_validation_msg');
		$message = str_replace('__min_file_limit__', $min_file_allow[0], $message);
		$result->invalidate($tag, $message);
		return $result;
	}
	$max_file_allow = $tag->get_option('maxfile');
	if (!empty($max_file_allow) && $file_count > $max_file_allow[0]) {
		$message = wpcf7_get_message('zl_max_file_count_validation_msg');
		$message = str_replace('__max_file_limit__', $max_file_allow[0], $message);
		$result->invalidate($tag, $message);
		return $result;
	}

	// file loop start
	foreach ($files as $file) {
		if ($file['error'] && UPLOAD_ERR_NO_FILE != $file['error']) {
			$result->invalidate($tag, wpcf7_get_message('upload_failed_php_error'));
			mfcf7_zl_multilinefile_remove($new_files);
			return $result;
		}

		// if (!is_uploaded_file($file['tmp_name'])) {
		// 	$result->invalidate($tag, wpcf7_get_message('upload_failed_php_error'));
		// 	return $result;
		// }

		$allowed_file_types = array();

		if ($file_types_a = $tag->get_option('filetypes')) {
			foreach ($file_types_a as $file_types) {
				$file_types = explode('|', $file_types);

				foreach ($file_types as $file_type) {
					$file_type = trim($file_type, '.');
					$file_type = str_replace(
						array('.', '+', '*', '?'),
						array('\.', '\+', '\*', '\?'),
						$file_type
					);
					$allowed_file_types[] = $file_type;
				}
			}
		}

		$allowed_file_types = array_unique($allowed_file_types);
		$file_type_pattern = implode('|', $allowed_file_types);

		$allowed_size = apply_filters('cf7_multilinefile_max_size', 10048576); // default size 1 MB

		if ($file_size_a = $tag->get_option('limit')) {
			$limit_pattern = '/^([1-9][0-9]*)([kKmM]?[bB])?$/';

			foreach ($file_size_a as $file_size) {
				if (preg_match($limit_pattern, $file_size, $matches)) {
					$allowed_size = (int) $matches[1];

					if (!empty($matches[2])) {
						$kbmb = strtolower($matches[2]);

						if ('kb' == $kbmb)
							$allowed_size *= 1024;
						elseif ('mb' == $kbmb)
							$allowed_size *= 1024 * 1024;
					}

					break;
				}
			}
		}

		/* File type validation */

		// Default file-type restriction
		if ('' == $file_type_pattern)
			$file_type_pattern = 'jpg|jpeg|png|gif|pdf|doc|docx|ppt|pptx|odt|avi|ogg|m4a|mov|mp3|mp4|mpg|wav|wmv|txt';
		$file_type_pattern = trim($file_type_pattern, '|');
		$file_type_pattern = '(' . $file_type_pattern . ')';
		$file_type_pattern = '/\.' . $file_type_pattern . '$/i';
		if (!preg_match($file_type_pattern, $file['name'])) {
			$result->invalidate($tag, wpcf7_get_message('upload_file_type_invalid'));
			mfcf7_zl_multilinefile_remove($new_files);
			return $result;
		}

		/* File size validation */

		if ($file['size'] > $allowed_size) {
			$result->invalidate($tag, wpcf7_get_message('upload_file_too_large'));
			mfcf7_zl_multilinefile_remove($new_files);
			return $result;
		}
		continue;

		wpcf7_init_uploads(); // Confirm upload dir
		$uploads_dir = wpcf7_upload_tmp_dir();
		$uploads_dir = wpcf7_maybe_add_random_dir($uploads_dir);
		$filename = $file['name'];
		$filename = wpcf7_canonicalize($filename);
		$filename = sanitize_file_name($filename);
		$filename = wpcf7_antiscript_file_name($filename);
		$filename = wp_unique_filename($uploads_dir, $filename);
		$new_file = trailingslashit($uploads_dir) . $filename;

		if (false === @move_uploaded_file($file['tmp_name'], $new_file)) {
			$result->invalidate($tag, wpcf7_get_message('upload_failed'));
			mfcf7_zl_multilinefile_remove($new_files);
			return $result;
		}
		$new_files[] = $new_file;
		// Make sure the uploaded file is only readable for the owner process
		@chmod($new_file, 0400);
	}
	//return $result;
	if (count($files) == 0) {
		if ($tag->is_required()) {
			$result->invalidate($tag, wpcf7_get_message('invalid_required'));
		}
		return $result;
	}
	return $result;
	// file loop end
	if ($new_files  && count($new_files) !== 1) {
		$zipped_files = trailingslashit($uploads_dir) . $uniqid . '.zip';
		$zipping = mfcf7_zl_multilinefile_create_zip($new_files, $zipped_files);
		@chmod($zipped_files, 0440);
	} else {
		// when only 1 file is uploaded, don't zip it
		$zipped_files = $new_files[0];
		$zipping = 0;
	}
	if ($zipping === false) {
		$result->invalidate($tag, wpcf7_get_message('zipping_failed'));
		mfcf7_zl_multilinefile_remove($new_files);
		return $result;
	}
	if ($new_files  && count($new_files) !== 1) {
		mfcf7_zl_multilinefile_remove($new_files);
	}
	if ($submission = WPCF7_Submission::get_instance()) {
		$submission->add_uploaded_file($name, $zipped_files);
	}
	return $result;
}
function mfcf7_zl_multilinefile_validation_filtero($result, $tag)
{
	global $latest_contact_form_7;
	if ($latest_contact_form_7)
		$tag = new WPCF7_FormTag($tag);
	else
		$tag = new WPCF7_Shortcode($tag);
	$uniqid = uniqid();

	/* old */
	$name = $tag->name;
	$id = $tag->get_id_option();
	// $uniqid = uniqid();
	$original_files_array = isset($_FILES[$name]) ? $_FILES[$name] : null;
	if ($original_files_array === null) {
		$original_files_array['tmp_name'] = array();
	}
	if (isset($_FILES[$name]) && isset($_FILES[$name]['name'])) {
		$total = count($_FILES[$name]['name']);
	} else {
		$total = 0;
	}
	$files = array();
	$new_files = array();
	for ($i = 0; $i < $total; $i++) {
		if (empty($original_files_array['tmp_name'][$i]))
			continue;
		$files[] = array(
			'name'      => $original_files_array['name'][$i],
			'type'      => $original_files_array['type'][$i],
			'tmp_name'  => $original_files_array['tmp_name'][$i],
			'error'     => $original_files_array['error'][$i],
			'size'      => $original_files_array['size'][$i]
		);
	}

	global $mfcf7_btn_tag_name;
	$btntagname = $tag->name . '-' . $mfcf7_btn_tag_name;
	$tag->name = $btntagname;
	// file loop start
	foreach ($files as $file) {
		if ($file['error'] && UPLOAD_ERR_NO_FILE != $file['error']) {
			$result->invalidate($tag, wpcf7_get_message('upload_failed_php_error'));
			mfcf7_zl_multilinefile_remove($new_files);
			return $result;
		}
		// if (!is_uploaded_file($file['tmp_name'])) {
		// 	$result->invalidate($tag, wpcf7_get_message('upload_failed_php_error'));
		// 	return $result;
		// }
		$allowed_file_types = array();
		if ($file_types_a = $tag->get_option('filetypes')) {
			foreach ($file_types_a as $file_types) {
				$file_types = explode('|', $file_types);
				foreach ($file_types as $file_type) {
					$file_type = trim($file_type, '.');
					$file_type = str_replace(
						array('.', '+', '*', '?'),
						array('\.', '\+', '\*', '\?'),
						$file_type
					);
					$allowed_file_types[] = $file_type;
				}
			}
		}
		$allowed_file_types = array_unique($allowed_file_types);
		$file_type_pattern = implode('|', $allowed_file_types);
		$allowed_size = apply_filters('cf7_multilinefile_max_size', 10048576); // default size 1 MB
		if ($file_size_a = $tag->get_option('limit')) {
			$limit_pattern = '/^([1-9][0-9]*)([kKmM]?[bB])?$/';
			foreach ($file_size_a as $file_size) {
				if (preg_match($limit_pattern, $file_size, $matches)) {
					$allowed_size = (int) $matches[1];
					if (!empty($matches[2])) {
						$kbmb = strtolower($matches[2]);
						if ('kb' == $kbmb)
							$allowed_size *= 1024;
						elseif ('mb' == $kbmb)
							$allowed_size *= 1024 * 1024;
					}
					break;
				}
			}
		}
		/* File type validation */
		// Default file-type restriction
		if ('' == $file_type_pattern) {
			$file_type_pattern = 'jpg|jpeg|png|gif|pdf|doc|docx|ppt|pptx|odt|avi|ogg|m4a|mov|mp3|mp4|mpg|wav|wmv|txt';
		}
		$file_type_pattern = trim($file_type_pattern, '|');
		$file_type_pattern = '(' . $file_type_pattern . ')';
		$file_type_pattern = '/\.' . $file_type_pattern . '$/i';
		if (!preg_match($file_type_pattern, $file['name'])) {
			$result->invalidate($tag, wpcf7_get_message('upload_file_type_invalid'));
			mfcf7_zl_multilinefile_remove($new_files);
			return $result;
		}

		/* File size validation */
		if ($file['size'] > $allowed_size) {
			$result->invalidate($tag, wpcf7_get_message('upload_file_too_large'));
			mfcf7_zl_multilinefile_remove($new_files);
			return $result;
		}
		continue;
		wpcf7_init_uploads(); // Confirm upload dir
		$uploads_dir = wpcf7_upload_tmp_dir();
		$uploads_dir = wpcf7_maybe_add_random_dir($uploads_dir);
		$filename = $file['name'];
		$filename = wpcf7_canonicalize($filename);
		$filename = sanitize_file_name($filename);
		$filename = wpcf7_antiscript_file_name($filename);
		$filename = wp_unique_filename($uploads_dir, $filename);
		$new_file = trailingslashit($uploads_dir) . $filename;
		if (false === @move_uploaded_file($file['tmp_name'], $new_file)) {
			$result->invalidate($tag, wpcf7_get_message('upload_failed'));
			mfcf7_zl_multilinefile_remove($new_files);
			return $result;
		}
		$new_files[] = $new_file;
		// Make sure the uploaded file is only readable for the owner process
		@chmod($new_file, 0400);
	}
	//return $result;
	if (count($files) == 0) {
		if ($tag->is_required()) {
			$result->invalidate($tag, wpcf7_get_message('invalid_required'));
		}
		return $result;
	}
	return $result;
	// file loop end
	if ($new_files && count($new_files) !== 1) {
		$zipped_files = trailingslashit($uploads_dir) . $uniqid . '.zip';
		$zipping = mfcf7_zl_multilinefile_create_zip($new_files, $zipped_files);
		@chmod($zipped_files, 0440);
	} else {
		//when only 1 file is uploaded, don't zip it
		$zipped_files = $new_files[0];
		$zipping = 0;
	}
	if ($zipping === false) {
		$result->invalidate($tag, wpcf7_get_message('zipping_failed'));
		mfcf7_zl_multilinefile_remove($new_files);
		return $result;
	}
	if ($new_files && count($new_files) !== 1) {
		mfcf7_zl_multilinefile_remove($new_files);
	}
	if ($submission = WPCF7_Submission::get_instance()) {
		$submission->add_uploaded_file($name, $zipped_files);
	}
	return $result;
}


/* Messages */
add_filter('wpcf7_messages', 'mfcf7_zl_multilinefile_messages', 10, 1);
function mfcf7_zl_multilinefile_messages($messages)
{
	return array_merge($messages, array(
		'upload_failed' => array(
			'description' => __("Uploading a file fails for any reason", 'zl-mfcf7'),
			'default' => __("There was an error uploading the file to the server.", 'zl-mfcf7')
		),
		'zipping_failed' => array(
			'description' => __("Zipping files fails for any reason", 'zl-mfcf7'),
			'default' => __("There was an error in zippng the files.", 'zl-mfcf7')
		),
		'upload_file_type_invalid' => array(
			'description' => __("Uploaded file is not allowed for file type", 'zl-mfcf7'),
			'default' => __("You are not allowed to upload files of this type.", 'zl-mfcf7')
		),
		'upload_file_too_large' => array(
			'description' => __("Uploaded file is too large", 'zl-mfcf7'),
			'default' => __("Uploaded file is too big.", 'zl-mfcf7')
		),
		'upload_failed_php_error' => array(
			'description' => __("Uploading a file fails for PHP error", 'zl-mfcf7'),
			'default' => __("There was an error uploading the file.", 'zl-mfcf7')
		),
		'zl_min_file_count_validation_msg' => array(
			'description' => __("You need to upload atleast __min_file_limit__ files.", 'zl-mfcf7'),
			'default' => __("You need to upload atleast __min_file_limit__ files.", 'zl-mfcf7')
		),
		'zl_max_file_count_validation_msg' => array(
			'description' => __("You can not upload more than __max_file_limit__ files per request", 'zl-mfcf7'),
			'default' => __("You can not upload more than __max_file_limit__ files per request.", 'zl-mfcf7')
		)
	));
}

/* creates a compressed zip file */
function mfcf7_zl_multilinefile_create_zip($files = array(), $destination = '', $overwrite = false)
{
	//if the zip file already exists and overwrite is false, return false
	if (file_exists($destination) && !$overwrite) {
		return false;
	}
	$valid_files = array();
	//if files are attached
	if (is_array($files)) {
		//check each file one by one
		foreach ($files as $file) {
			//make sure file exists
			if (file_exists($file)) {
				$valid_files[] = $file;
			}
		}
	}
	//if we have valid files.
	if (count($valid_files)) {
		//create the archive
		$zipped_file = new ZipArchive();
		if ($zipped_file->open($destination, $overwrite ? ZIPARCHIVE::OVERWRITE : ZIPARCHIVE::CREATE) !== true) {
			return false;
		}
		//add files one by one
		foreach ($valid_files as $file) {
			$zipped_file->addFile($file, basename($file));
		}
		//debug
		//echo 'The zip file has ',$zipped_file->numFiles,' files, status : ',$zipped_file->status;
		//close the zip!
		$zipped_file->close();
		//make sure file exists
		return file_exists($destination);
	} else {
		return false;
	}
}
function mfcf7_zl_multilinefile_remove($new_files)
{
	if (!empty($new_files)) {
		foreach ($new_files as $to_delete) {
			@unlink($to_delete);
			@rmdir(dirname($to_delete)); // remove parent dir if it's removable (empty).
		}
	}
}
// Add Plugin row meta Upgrade link
function mfcf7_plugin_meta_links($links, $file)
{
	if (plugin_basename(__FILE__) == $file) {
		$links[] = '<a href="https://1.envato.market/9W6qL4" target="_blank" title="' . __('Upgrade multiline file upload plugin into pro version') . '"><strong>' . __('Upgrade to Pro') . '</strong></a>';
	}
	return $links;
}
add_filter('plugin_row_meta', 'mfcf7_plugin_meta_links', 10, 2);
// Load languages file 
add_action('plugins_loaded', 'mfcf7_plugin_init');
function mfcf7_plugin_init()
{
	load_plugin_textdomain('zl-mfcf7', false, dirname(plugin_basename(__FILE__)) . '/languages/');
}
