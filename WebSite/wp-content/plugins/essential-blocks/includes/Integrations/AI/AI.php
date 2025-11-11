<?php

namespace EssentialBlocks\Integrations\AI;

use EssentialBlocks\Integrations\ThirdPartyIntegration;
use EssentialBlocks\Utils\Settings;

/**
 * AI Integration for Essential Blocks
 *
 * This class handles all AI-related functionality including content generation,
 * image generation, and job management for OpenAI API integration.
 */
class AI extends ThirdPartyIntegration
{

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->add_ajax(
            [
                'start_ai_job'            => [
                    'callback' => 'start_ai_job',
                    'public'   => false
                 ],
                'check_ai_job_status'     => [
                    'callback' => 'check_ai_job_status',
                    'public'   => false
                 ],
                'save_ai_generated_image' => [
                    'callback' => 'save_ai_generated_image',
                    'public'   => false
                 ]
             ]
        );

        // Initialize JobManager hooks
        if ( class_exists( 'EssentialBlocks\Integrations\AI\JobManager' ) ) {
            JobManager::init_hooks();
        }
    }

    /**
     * Start an AI job (async version of AI generation)
     */
    public function start_ai_job()
    {
        if ( ! isset( $_POST[ 'admin_nonce' ] ) || ! wp_verify_nonce( sanitize_key( $_POST[ 'admin_nonce' ] ), 'admin-nonce' ) ) {
            wp_send_json_error( __( 'Nonce Error', 'essential-blocks' ) );
        }

        $job_type = isset( $_POST[ 'job_type' ] ) ? sanitize_text_field( $_POST[ 'job_type' ] ) : '';

        if ( ! in_array( $job_type, [ 'content', 'image' ] ) ) {
            wp_send_json_error( __( 'Invalid job type', 'essential-blocks' ) );
        }

        // Check permissions based on job type
        if ( $job_type === 'content' && ! current_user_can( 'edit_posts' ) ) {
            wp_send_json_error( __( 'You are not authorized to generate content!', 'essential-blocks' ) );
        }

        if ( $job_type === 'image' && ! current_user_can( 'upload_files' ) ) {
            wp_send_json_error( __( 'You do not have permission to generate images!', 'essential-blocks' ) );
        }

        $params = [  ];

        if ( $job_type === 'content' ) {
            if ( ! isset( $_POST[ 'prompt' ] ) ) {
                wp_send_json_error( __( 'Prompt is required', 'essential-blocks' ) );
            }

            $params = [
                'prompt'      => sanitize_textarea_field( $_POST[ 'prompt' ] ),
                'content_for' => isset( $_POST[ 'content_for' ] ) ? $_POST[ 'content_for' ] : 'writePageContent'
             ];
        } elseif ( $job_type === 'image' ) {
            if ( ! isset( $_POST[ 'prompt' ] ) ) {
                wp_send_json_error( __( 'Prompt is required', 'essential-blocks' ) );
            }

            $params = [
                'prompt'              => sanitize_textarea_field( $_POST[ 'prompt' ] ),
                'model'               => isset( $_POST[ 'model' ] ) ? sanitize_text_field( $_POST[ 'model' ] ) : 'gpt-image-1',
                'size'                => isset( $_POST[ 'size' ] ) ? sanitize_text_field( $_POST[ 'size' ] ) : '1024x1024',
                'quality'             => isset( $_POST[ 'quality' ] ) ? sanitize_text_field( $_POST[ 'quality' ] ) : 'standard',
                'style'               => isset( $_POST[ 'style' ] ) ? sanitize_text_field( $_POST[ 'style' ] ) : 'vivid',
                'background'          => isset( $_POST[ 'background' ] ) ? sanitize_text_field( $_POST[ 'background' ] ) : '',
                'output_format'       => isset( $_POST[ 'output_format' ] ) ? sanitize_text_field( $_POST[ 'output_format' ] ) : 'png',
                'output_compression'  => isset( $_POST[ 'output_compression' ] ) ? sanitize_text_field( $_POST[ 'output_compression' ] ) : 'standard',
                'image_count'         => isset( $_POST[ 'image_count' ] ) ? intval( $_POST[ 'image_count' ] ) : 4,
                'content_for'         => 'writePageContent',
                'reference_image_url' => isset( $_POST[ 'reference_image_url' ] ) ? esc_url_raw( $_POST[ 'reference_image_url' ] ) : '',
                'editing_mode'        => isset( $_POST[ 'editing_mode' ] ) ? sanitize_text_field( $_POST[ 'editing_mode' ] ) : 'false',
                'edit_type'           => isset( $_POST[ 'edit_type' ] ) ? sanitize_text_field( $_POST[ 'edit_type' ] ) : 'edit'
             ];
        }

        // Create the job
        $job_id = JobManager::create_job( $job_type, $params );

        // Schedule the job for immediate processing
        JobManager::schedule_job_processing( $job_id );

        wp_send_json_success( [
            'job_id'  => $job_id,
            'message' => __( 'Job started successfully', 'essential-blocks' )
         ] );
    }

    /**
     * Check AI job status
     */
    public function check_ai_job_status()
    {
        if ( ! isset( $_POST[ 'admin_nonce' ] ) || ! wp_verify_nonce( sanitize_key( $_POST[ 'admin_nonce' ] ), 'admin-nonce' ) ) {
            wp_send_json_error( __( 'Nonce Error', 'essential-blocks' ) );
        }

        if ( ! isset( $_POST[ 'job_id' ] ) ) {
            wp_send_json_error( __( 'Job ID is required', 'essential-blocks' ) );
        }

        $job_id = sanitize_text_field( $_POST[ 'job_id' ] );

        $status_response = JobManager::get_job_status( $job_id );

        if ( $status_response[ 'success' ] ) {
            // If job is completed, clean up the job data after returning the result
            if ( $status_response[ 'status' ] === JobManager::STATUS_COMPLETED ) {
                // Schedule cleanup after response is sent
                wp_schedule_single_event( time() + 5, 'eb_cleanup_completed_job', [ $job_id ] );
            }

            wp_send_json_success( $status_response );
        } else {
            wp_send_json_error( $status_response );
        }
    }

    /**
     * Save AI generated image to WordPress media library
     */
    public function save_ai_generated_image()
    {
        if ( ! isset( $_POST[ 'admin_nonce' ] ) || ! wp_verify_nonce( sanitize_key( $_POST[ 'admin_nonce' ] ), 'admin-nonce' ) ) {
            wp_send_json_error( __( 'Nonce Error', 'essential-blocks' ) );
        }
        if ( ! current_user_can( 'upload_files' ) ) {
            wp_send_json_error( __( 'You are not authorized to upload files!', 'essential-blocks' ) );
        }

        // Check if we have either image_url or image_b64 along with prompt
        if ( ( isset( $_POST[ 'image_url' ] ) || isset( $_POST[ 'image_b64' ] ) ) && isset( $_POST[ 'prompt' ] ) ) {
            $image_url   = isset( $_POST[ 'image_url' ] ) ? esc_url_raw( $_POST[ 'image_url' ] ) : null;
            $image_b64   = isset( $_POST[ 'image_b64' ] ) ? sanitize_text_field( $_POST[ 'image_b64' ] ) : null;
            $prompt      = sanitize_textarea_field( $_POST[ 'prompt' ] );
            $title       = isset( $_POST[ 'title' ] ) ? sanitize_text_field( $_POST[ 'title' ] ) : $prompt;
            $alt_tag     = isset( $_POST[ 'alt_tag' ] ) ? sanitize_text_field( $_POST[ 'alt_tag' ] ) : $prompt;
            $caption     = isset( $_POST[ 'caption' ] ) ? sanitize_text_field( $_POST[ 'caption' ] ) : '';
            $description = isset( $_POST[ 'description' ] ) ? sanitize_text_field( $_POST[ 'description' ] ) : '';

            $image_body = '';

            // Handle URL format
            if ( $image_url ) {
                // Download the image from OpenAI URL
                $image_data = wp_remote_get( $image_url, [
                    'timeout' => 60
                 ] );

                if ( is_wp_error( $image_data ) ) {
                    wp_send_json_error( [
                        'message' => __( 'Failed to download image from OpenAI.', 'essential-blocks' )
                     ] );
                    return;
                }

                $image_body = wp_remote_retrieve_body( $image_data );
            }
            // Handle base64 format
            elseif ( $image_b64 ) {
                // Decode base64 image data
                $image_body = base64_decode( $image_b64 );

                if ( $image_body === false ) {
                    wp_send_json_error( [
                        'message' => __( 'Failed to decode base64 image data.', 'essential-blocks' )
                     ] );
                    return;
                }
            }

            if ( empty( $image_body ) ) {
                wp_send_json_error( [
                    'message' => __( 'Image data is empty.', 'essential-blocks' )
                 ] );
                return;
            }

            // Detect image format and set appropriate extension and MIME type
            $image_info = getimagesizefromstring( $image_body );
            $mime_type  = $image_info ? $image_info[ 'mime' ] : 'image/png';

            // Determine file extension based on MIME type
            $extension = 'png'; // default
            switch ( $mime_type ) {
                case 'image/jpeg':
                    $extension = 'jpg';
                    break;
                case 'image/png':
                    $extension = 'png';
                    break;
                case 'image/webp':
                    $extension = 'webp';
                    break;
                case 'image/gif':
                    $extension = 'gif';
                    break;
            }

            // Generate filename with proper extension
            $filename = 'ai-generated-' . sanitize_title( substr( $title ?: $prompt, 0, 50 ) ) . '-' . time() . '.' . $extension;

            // Upload to WordPress media library
            $upload = wp_upload_bits( $filename, null, $image_body );

            if ( $upload[ 'error' ] ) {
                wp_send_json_error( [
                    'message' => $upload[ 'error' ]
                 ] );
                return;
            }

            // Create attachment
            $attachment = [
                'post_mime_type' => $mime_type,
                'post_title'     => $title,
                'post_content'   => $description,
                'post_excerpt'   => $caption,
                'post_status'    => 'inherit'
             ];

            $attachment_id = wp_insert_attachment( $attachment, $upload[ 'file' ] );

            if ( is_wp_error( $attachment_id ) ) {
                wp_send_json_error( [
                    'message' => __( 'Failed to create attachment.', 'essential-blocks' )
                 ] );
                return;
            }

            // Generate attachment metadata
            require_once ABSPATH . 'wp-admin/includes/image.php';
            $attachment_data = wp_generate_attachment_metadata( $attachment_id, $upload[ 'file' ] );
            wp_update_attachment_metadata( $attachment_id, $attachment_data );

            // Set alt text
            update_post_meta( $attachment_id, '_wp_attachment_image_alt', $alt_tag );

            // Get attachment URL
            $attachment_url = wp_get_attachment_url( $attachment_id );

            wp_send_json_success( [
                'attachment_id' => $attachment_id,
                'url'           => $attachment_url,
                'alt'           => $alt_tag,
                'title'         => $title,
                'caption'       => $caption,
                'description'   => $description
             ] );
        } else {
            wp_send_json_error( __( 'Image data (URL or base64) and prompt are required', 'essential-blocks' ) );
        }
    }

    /**
     * Validate and save AI settings
     *
     * @param mixed $value The settings value to validate and save
     * @return bool|array Returns validation result
     */
    public static function validate_and_save_ai_settings( $value )
    {
        // Validate API key if provided
        if ( isset( $value->apiKey ) && ! empty( $value->apiKey ) ) {
            // Initialize the OpenAI class
            $openai = new OpenAI();

            // Validate the API key
            $validation = $openai->validate_api_key( $value->apiKey );

            if ( ! $validation[ 'success' ] ) {
                return [
                    'success' => false,
                    'message' => $validation[ 'message' ],
                    'type'    => 'api_key_error'
                 ];
            }
        }

        // Save the settings
        $updated = Settings::save_eb_write_with_ai( $value );
        return [
            'success' => true,
            'data'    => $updated
         ];
    }
}
