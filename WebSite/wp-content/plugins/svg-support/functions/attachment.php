<?php
/**
 * Display SVG in attachment modal
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

function bodhi_svgs_response_for_svg( $response, $attachment, $meta ) {

	if ( $response['mime'] == 'image/svg+xml' && empty( $response['sizes'] ) ) {

		$svg_path = get_attached_file( $attachment->ID );

		if ( ! file_exists( $svg_path ) ) {
			// If SVG is external, use the URL instead of the path
			$svg_path = $response['url'];
		}

		$dimensions = bodhi_svgs_get_dimensions( $svg_path );

		$response['sizes'] = array(
			'full' => array(
				'url' => $response['url'],
				'width' => $dimensions->width,
				'height' => $dimensions->height,
				'orientation' => $dimensions->width > $dimensions->height ? 'landscape' : 'portrait'
			)
		);

	}

	return $response;

}
add_filter( 'wp_prepare_attachment_for_js', 'bodhi_svgs_response_for_svg', 10, 3 );

function bodhi_svgs_get_dimensions( $svg ) {

	$svg = simplexml_load_file( $svg );

	if ( $svg === FALSE ) {

		$width = '0';
		$height = '0';

	} else {

		$attributes = $svg->attributes();
		$width = (string) $attributes->width;
		$height = (string) $attributes->height;

	}

	return (object) array( 'width' => $width, 'height' => $height );

}

/**
 * Generate attachment metadata (Thanks @surml)
 * Fixes Illegal String Offset Warning for Height & Width
 */
function bodhi_svgs_generate_svg_attachment_metadata( $metadata, $attachment_id ) {

	$mime = get_post_mime_type( $attachment_id );

	if ( $mime == 'image/svg+xml' ) {

		$svg_path = get_attached_file( $attachment_id );
		$upload_dir = wp_upload_dir();
		// get the path relative to /uploads/ - found no better way:
		$relative_path = str_replace($upload_dir['basedir'], '', $svg_path);
		$filename = basename( $svg_path );

		$dimensions = bodhi_svgs_get_dimensions( $svg_path );

		$metadata = array(
			'width'		=> intval($dimensions->width),
			'height'	=> intval($dimensions->height),
			'file'		=> $filename
		);

		$height = intval($dimensions->height);
		$width = intval($dimensions->width);

		// Might come in handy to create the sizes array too - But it's not needed for this workaround! Always links to original svg-file => Hey, it's a vector graphic! ;)
		$sizes = array();
		foreach ( get_intermediate_image_sizes() as $s ) {

			$sizes[$s] = array( 'width' => '', 'height' => '', 'crop' => false );

			// for svg with width and height set, we need to adjust the thumbnails accordingly
			if ( $width !== 0 && $height !== 0 ) {

				// follow width of request size e.g. 150, 300 etc..
				if ( isset( $_wp_additional_image_sizes[$s]['width'] ) ) {
					$width_current_size = intval( $_wp_additional_image_sizes[$s]['width'] );
				} else {
					$width_current_size = get_option( "{$s}_size_w" );
				}

				// we have dimensions available. Use them
				if ( $width > $height ) {
					$ratio = round($width / $height,2);
					$new_height = round($width_current_size / $ratio);
				} else {
					$ratio = round($height / $width,2);
					$new_height = round($width_current_size * $ratio);
				}

				$sizes[$s]['width'] = $width_current_size;
				$sizes[$s]['height'] = $new_height;

				// svgs can't be cropped by WP
				$sizes[$s]['crop'] = false;

			} else {

				// no change is needed
				if ( isset( $_wp_additional_image_sizes[$s]['width'] ) ) {
					$sizes[$s]['width'] = intval( $_wp_additional_image_sizes[$s]['width'] ); // For theme-added sizes
				} else {
					$sizes[$s]['width'] = get_option( "{$s}_size_w" ); // For default sizes set in options
				}

				if ( isset( $_wp_additional_image_sizes[$s]['height'] ) ) {
					$sizes[$s]['height'] = intval( $_wp_additional_image_sizes[$s]['height'] ); // For theme-added sizes
				} else {
					$sizes[$s]['height'] = get_option( "{$s}_size_h" ); // For default sizes set in options
				}

				if ( isset( $_wp_additional_image_sizes[$s]['crop'] ) ) {
					$sizes[$s]['crop'] = intval( $_wp_additional_image_sizes[$s]['crop'] ); // For theme-added sizes
				} else {
					$sizes[$s]['crop'] = get_option( "{$s}_crop" ); // For default sizes set in options
				}

			}

			$sizes[$s]['file'] =  $filename;
			$sizes[$s]['mime-type'] =  'image/svg+xml';

		}

		$metadata['sizes'] = $sizes;

	}

	return $metadata;

}
add_filter( 'wp_generate_attachment_metadata', 'bodhi_svgs_generate_svg_attachment_metadata', 10, 3 );

/*
 * SVG Sanitization
 * Only triggers when its enabled by admin
 */
function bodhi_svgs_sanitize( $file ){

	global $sanitizer;

	$sanitizer->setAllowedTags( new bodhi_svg_tags() );
	$sanitizer->setAllowedAttrs( new bodhi_svg_attributes() );

	$dirty = file_get_contents( $file );

	// try to decode if gzipped is enabled
	if ( $is_zipped = bodhi_svgs_is_gzipped( $dirty ) ) {

		$dirty = gzdecode( $dirty );

		// return on failure, since we can't read file
		if ( $dirty === false ) {
			return false;
		}

	}

	// remove remote references since they are dangerous and lead to injection
	$sanitizer->removeRemoteReferences(true);

	// enable minify in library if its enabled in admin panel
	bodhi_svgs_minify();

	$clean = $sanitizer->sanitize( $dirty );

	if ( $clean === false ) {
		return false;
	}

	// if we were gzipped, we need to re-zip
	if ( $is_zipped ) {
		$clean = gzencode( $clean );
	}

	file_put_contents( $file, $clean );

	return true;

}

function bodhi_svgs_minify() {

	global $bodhi_svgs_options;
	global $sanitizer;

	if ( !empty($bodhi_svgs_options['minify_svg']) && $bodhi_svgs_options['minify_svg'] === 'on' ) {
		$sanitizer->minify(true);
	}

}

function bodhi_svgs_is_gzipped( $contents ) {

	if ( function_exists( 'mb_strpos' ) ) {
		return 0 === mb_strpos( $contents, "\x1f" . "\x8b" . "\x08" );
	} else {
		return 0 === strpos( $contents, "\x1f" . "\x8b" . "\x08" );
	}

}

function bodhi_svgs_sanitize_svg($file) {
    global $bodhi_svgs_options;

    // Check if the sanitization option is enabled and if the file is an SVG
    if (!empty($bodhi_svgs_options['sanitize_svg']) && $bodhi_svgs_options['sanitize_svg'] === 'on' && $file['type'] === 'image/svg+xml') {

        // Get the roles that do not require SVG sanitization
        $sanitize_on_upload_roles_array = (array) $bodhi_svgs_options['sanitize_on_upload_roles'];
        $user = wp_get_current_user();
        $current_user_roles = (array) $user->roles;

        // Check if the current user's roles intersect with the roles that do not need sanitization
        $no_sanitize_needed = array_intersect($sanitize_on_upload_roles_array, $current_user_roles);

        // Check if the user has the capability to upload SVGs
        $can_upload_files = current_user_can('upload_files');

        // If the user is in the roles that do not require sanitization and has the capability, just upload without sanitization
        if ($can_upload_files && !empty($no_sanitize_needed)) {
            return $file;
        }
        
        // If the user has the capability to upload SVGs but is not in the no-sanitize roles, sanitize the SVG
        if ($can_upload_files) {
            if (!bodhi_svgs_sanitize($file['tmp_name'])) {
                $file['error'] = __("Sorry, this file couldn't be sanitized for security reasons and wasn't uploaded.", 'safe-svg');
            }
            return $file;
        }

        // If the user doesn't have the capability and is not in the no-sanitize roles, return an error
        if (!$can_upload_files) {
            $file['error'] = __("Sorry, you are not allowed to upload SVG files.", 'safe-svg');
            return $file;
        }
    }

    return $file;
}

// Add filter to handle upload pre-filtering for sanitization
add_filter('wp_handle_upload_prefilter', 'bodhi_svgs_sanitize_svg');

// Fix image widget PHP warnings
function bodhi_svgs_get_attachment_metadata( $data ) {

	$res = $data;

	if ( !isset( $data['width'] ) || !isset( $data['height'] ) ) {
		$res = false;
	}

	return $res;

}
// add_filter( 'wp_get_attachment_metadata' , 'bodhi_svgs_get_attachment_metadata' );
// Commented this out 20200307 because it was stripping metadata from other attachments as well. Need to make this target only SVG attachments.

// remove srcset for svg images
function bodhi_svgs_disable_srcset( $sources ) {

	$first_element = reset($sources);
	if ( isset($first_element) && !empty($first_element['url']) ) {

		$ext = pathinfo(reset($sources)['url'], PATHINFO_EXTENSION);

		if ( $ext == 'svg' ) {

			// return empty array
			$sources = array();

			return $sources;

		} else {

			return $sources;

		}

	} else {

		return $sources;

	}

}
add_filter( 'wp_calculate_image_srcset', 'bodhi_svgs_disable_srcset' );

// fix for division by zero error for SVGs
// proposed by starsis
// https://github.com/WordPress/gutenberg/issues/36603

function bodhi_svgs_dimension_fallback( $image, $attachment_id, $size, $icon ) {

	// only manipulate for svgs
	if ( get_post_mime_type($attachment_id) == 'image/svg+xml' ) {

		if ( isset($image[1]) && $image[1] === 0 ) {
			$image[1] = 1;
		}
		if ( isset($image[2]) && $image[2] === 0 ) {
			$image[2] = 1;
		}

	}

	return $image;

}
add_filter( 'wp_get_attachment_image_src', 'bodhi_svgs_dimension_fallback', 10, 4 );
