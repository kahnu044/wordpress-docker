<?php

namespace EssentialBlocks\Integrations\AI;

use EssentialBlocks\Traits\HasSingletone;

/**
 * Job Manager for handling asynchronous AI generation tasks
 *
 * This class manages background jobs for AI content and image generation
 * to prevent AJAX timeout issues when OpenAI API responses take too long.
 */
class JobManager
{
    use HasSingletone;

    /**
     * Option prefix for storing jobs in WordPress options table
     */
    const JOB_OPTION_PREFIX = 'eb_ai_job_';

    /**
     * Maximum job lifetime in seconds (5 minutes)
     */
    const MAX_JOB_LIFETIME = 300;

    /**
     * Job statuses
     */
    const STATUS_PENDING    = 'pending';
    const STATUS_PROCESSING = 'processing';
    const STATUS_COMPLETED  = 'completed';
    const STATUS_FAILED     = 'failed';
    const STATUS_EXPIRED    = 'expired';

    /**
     * Generate a unique job ID
     *
     * @return string Unique job identifier
     */
    public static function generate_job_id()
    {
        return 'job_' . wp_generate_uuid4();
    }

    /**
     * Create a new job
     *
     * @param string $type Job type ('content' or 'image')
     * @param array $params Job parameters
     * @return string Job ID
     */
    public static function create_job( $type, $params = [  ] )
    {
        $job_id = self::generate_job_id();

        $job_data = [
            'id'         => $job_id,
            'type'       => $type,
            'status'     => self::STATUS_PENDING,
            'params'     => $params,
            'created_at' => current_time( 'timestamp' ),
            'updated_at' => current_time( 'timestamp' ),
            'result'     => null,
            'error'      => null
         ];

        update_option( self::JOB_OPTION_PREFIX . $job_id, $job_data );

        return $job_id;
    }

    /**
     * Get job data by ID
     *
     * @param string $job_id Job identifier
     * @return array|false Job data or false if not found
     */
    public static function get_job( $job_id )
    {
        $job_data = get_option( self::JOB_OPTION_PREFIX . $job_id, false );

        if ( $job_data && self::is_job_expired( $job_data ) ) {
            self::update_job_status( $job_id, self::STATUS_EXPIRED );
            $job_data[ 'status' ] = self::STATUS_EXPIRED;
        }

        return $job_data;
    }

    /**
     * Update job status
     *
     * @param string $job_id Job identifier
     * @param string $status New status
     * @param array $additional_data Additional data to update
     * @return bool Success status
     */
    public static function update_job_status( $job_id, $status, $additional_data = [  ] )
    {
        $job_data = get_option( self::JOB_OPTION_PREFIX . $job_id, false );

        if ( ! $job_data ) {
            return false;
        }

        $job_data[ 'status' ]     = $status;
        $job_data[ 'updated_at' ] = current_time( 'timestamp' );

        // Merge additional data
        foreach ( $additional_data as $key => $value ) {
            $job_data[ $key ] = $value;
        }

        return update_option( self::JOB_OPTION_PREFIX . $job_id, $job_data );
    }

    /**
     * Complete a job with result data
     *
     * @param string $job_id Job identifier
     * @param array $result Result data
     * @return bool Success status
     */
    public static function complete_job( $job_id, $result )
    {
        return self::update_job_status( $job_id, self::STATUS_COMPLETED, [
            'result' => $result
         ] );
    }

    /**
     * Fail a job with error message
     *
     * @param string $job_id Job identifier
     * @param string $error_message Error message
     * @return bool Success status
     */
    public static function fail_job( $job_id, $error_message )
    {
        return self::update_job_status( $job_id, self::STATUS_FAILED, [
            'error' => $error_message
         ] );
    }

    /**
     * Delete a job from storage
     *
     * @param string $job_id Job identifier
     * @return bool Success status
     */
    public static function delete_job( $job_id )
    {
        return delete_option( self::JOB_OPTION_PREFIX . $job_id );
    }

    /**
     * Check if a job has expired
     *
     * @param array $job_data Job data
     * @return bool True if expired
     */
    private static function is_job_expired( $job_data )
    {
        $current_time = current_time( 'timestamp' );
        $job_age      = $current_time - $job_data[ 'created_at' ];

        return $job_age > self::MAX_JOB_LIFETIME;
    }

    /**
     * Clean up expired jobs
     * This should be called periodically to prevent database bloat
     *
     * @return int Number of jobs cleaned up
     */
    public static function cleanup_expired_jobs()
    {
        global $wpdb;

        $current_time = current_time( 'timestamp' );
        $expiry_time  = $current_time - self::MAX_JOB_LIFETIME;

        // Get all job options
        $job_options = $wpdb->get_results(
            $wpdb->prepare(
                "SELECT option_name FROM {$wpdb->options} WHERE option_name LIKE %s",
                self::JOB_OPTION_PREFIX . '%'
            )
        );

        $cleaned_count = 0;

        foreach ( $job_options as $option ) {
            $job_data = get_option( $option->option_name, false );

            if ( $job_data && isset( $job_data[ 'created_at' ] ) && $job_data[ 'created_at' ] < $expiry_time ) {
                delete_option( $option->option_name );
                $cleaned_count++;
            }
        }

        return $cleaned_count;
    }

    /**
     * Get job status for frontend polling
     *
     * @param string $job_id Job identifier
     * @return array Status response
     */
    public static function get_job_status( $job_id )
    {
        $job_data = self::get_job( $job_id );

        if ( ! $job_data ) {
            return [
                'success' => false,
                'message' => __( 'Job not found', 'essential-blocks' )
             ];
        }

        $response = [
            'success'    => true,
            'status'     => $job_data[ 'status' ],
            'created_at' => $job_data[ 'created_at' ],
            'updated_at' => $job_data[ 'updated_at' ]
         ];

        // Include result or error based on status
        if ( $job_data[ 'status' ] === self::STATUS_COMPLETED && isset( $job_data[ 'result' ] ) ) {
            $response[ 'result' ] = $job_data[ 'result' ];
        } elseif ( $job_data[ 'status' ] === self::STATUS_FAILED && isset( $job_data[ 'error' ] ) ) {
            $response[ 'error' ] = $job_data[ 'error' ];
        }

        return $response;
    }

    /**
     * Process a job in the background
     *
     * @param string $job_id Job identifier
     * @return void
     */
    public static function process_job( $job_id )
    {
        $job_data = self::get_job( $job_id );

        if ( ! $job_data || $job_data[ 'status' ] !== self::STATUS_PENDING ) {
            return;
        }

        // Update status to processing
        self::update_job_status( $job_id, self::STATUS_PROCESSING );

        try {
            // Include the OpenAI class
            if ( ! class_exists( 'EssentialBlocks\Integrations\AI\OpenAI' ) ) {
                require_once plugin_dir_path( __FILE__ ) . 'OpenAI.php';
            }
            $openai = new OpenAI();

            $result = null;

            if ( $job_data[ 'type' ] === 'content' ) {
                $result = $openai->generate_content(
                    $job_data[ 'params' ][ 'prompt' ],
                    $job_data[ 'params' ][ 'content_for' ] ?? 'writePageContent'
                );
            } elseif ( $job_data[ 'type' ] === 'image' ) {
                $params = $job_data[ 'params' ];
                $result = $openai->generate_image(
                    $params[ 'prompt' ],
                    $params[ 'model' ] ?? 'gpt-image-1',
                    $params[ 'size' ] ?? '1024x1024',
                    $params[ 'quality' ] ?? 'standard',
                    $params[ 'style' ] ?? 'vivid',
                    $params[ 'content_for' ] ?? 'writePageContent',
                    $params[ 'background' ] ?? '',
                    $params[ 'output_format' ] ?? 'png',
                    $params[ 'output_compression' ] ?? 'standard',
                    $params[ 'image_count' ] ?? 2,
                    $params[ 'reference_image_url' ] ?? '',
                    $params[ 'editing_mode' ] ?? 'false',
                    $params[ 'edit_type' ] ?? 'edit'
                );
            }

            if ( $result && $result[ 'success' ] ) {
                self::complete_job( $job_id, $result );
            } else {
                $error_message = $result[ 'message' ] ?? __( 'Unknown error occurred', 'essential-blocks' );
                self::fail_job( $job_id, $error_message );
            }
        } catch ( \Exception $e ) {
            self::fail_job( $job_id, $e->getMessage() );
        }
    }

    /**
     * Schedule a job for background processing
     * This uses WordPress's wp_schedule_single_event for immediate execution
     *
     * @param string $job_id Job identifier
     * @return void
     */
    public static function schedule_job_processing( $job_id )
    {
        // Schedule immediate execution
        wp_schedule_single_event( time(), 'eb_process_ai_job', [ $job_id ] );
    }

    /**
     * Initialize job processing hooks
     * This should be called during plugin initialization
     *
     * @return void
     */
    public static function init_hooks()
    {
        // Register the cron action
        add_action( 'eb_process_ai_job', [ self::class, 'process_job' ] );

        // Schedule cleanup of expired jobs daily
        if ( ! wp_next_scheduled( 'eb_cleanup_ai_jobs' ) ) {
            wp_schedule_event( time(), 'daily', 'eb_cleanup_ai_jobs' );
        }

        // Schedule cleanup of stuck jobs every hour
        if ( ! wp_next_scheduled( 'eb_cleanup_stuck_ai_jobs' ) ) {
            wp_schedule_event( time(), 'hourly', 'eb_cleanup_stuck_ai_jobs' );
        }

        add_action( 'eb_cleanup_ai_jobs', [ self::class, 'cleanup_expired_jobs' ] );
        add_action( 'eb_cleanup_stuck_ai_jobs', [ self::class, 'cleanup_stuck_jobs' ] );
    }

    /**
     * Clean up scheduled events on plugin deactivation
     *
     * @return void
     */
    public static function cleanup_hooks()
    {
        wp_clear_scheduled_hook( 'eb_cleanup_ai_jobs' );
        wp_clear_scheduled_hook( 'eb_cleanup_stuck_ai_jobs' );
        wp_clear_scheduled_hook( 'eb_process_ai_job' );
    }

    /**
     * Handle job timeout and mark as expired
     *
     * @param string $job_id Job identifier
     * @return void
     */
    public static function handle_job_timeout( $job_id )
    {
        $job_data = self::get_job( $job_id );

        if ( $job_data && in_array( $job_data[ 'status' ], [ self::STATUS_PENDING, self::STATUS_PROCESSING ] ) ) {
            self::update_job_status( $job_id, self::STATUS_EXPIRED, [
                'error' => __( 'Job timed out after maximum execution time', 'essential-blocks' )
             ] );

            error_log( "Essential Blocks AI Job {$job_id} timed out" );
        }
    }

    /**
     * Get all jobs with a specific status
     *
     * @param string $status Job status to filter by
     * @return array Array of job data
     */
    public static function get_jobs_by_status( $status )
    {
        global $wpdb;

        $job_options = $wpdb->get_results(
            $wpdb->prepare(
                "SELECT option_name, option_value FROM {$wpdb->options} WHERE option_name LIKE %s",
                self::JOB_OPTION_PREFIX . '%'
            )
        );

        $jobs = [  ];

        foreach ( $job_options as $option ) {
            $job_data = maybe_unserialize( $option->option_value );

            if ( $job_data && isset( $job_data[ 'status' ] ) && $job_data[ 'status' ] === $status ) {
                $jobs[  ] = $job_data;
            }
        }

        return $jobs;
    }

    /**
     * Clean up jobs that have been processing for too long
     * This should be called periodically to handle stuck jobs
     *
     * @return int Number of jobs cleaned up
     */
    public static function cleanup_stuck_jobs()
    {
        $current_time    = current_time( 'timestamp' );
        $stuck_threshold = $current_time - ( self::MAX_JOB_LIFETIME / 2 ); // Half the max lifetime

        $processing_jobs = self::get_jobs_by_status( self::STATUS_PROCESSING );
        $cleaned_count   = 0;

        foreach ( $processing_jobs as $job ) {
            if ( isset( $job[ 'updated_at' ] ) && $job[ 'updated_at' ] < $stuck_threshold ) {
                self::handle_job_timeout( $job[ 'id' ] );
                $cleaned_count++;
            }
        }

        return $cleaned_count;
    }
}
