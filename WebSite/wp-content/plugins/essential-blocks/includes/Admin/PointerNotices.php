<?php

namespace EssentialBlocks\Admin;

use EssentialBlocks\Traits\HasSingletone;

/**
 * PointerNotices Class
 *
 * Handles WordPress admin pointer notices for Essential Blocks
 *
 * @package EssentialBlocks\Admin
 * @since 5.8.0
 */
class PointerNotices {

    use HasSingletone;

    /**
     * Registered pointers
     *
     * @var array
     */
    private static $pointers = [];

    /**
     * Constructor
     *
     * Initialize hooks and actions
     */
    public function __construct() {
        add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_scripts' ) );
        add_action( 'wp_ajax_eb_dismiss_pointer', array( $this, 'dismiss_pointer' ) );

        // Initialize pointer priority option
        add_action( 'init', array( $this, 'init_pointer_priority_option' ) );
    }

    /**
     * Register a pointer notice
     *
     * @param string $id Unique pointer ID
     * @param array $args Pointer configuration arguments
     * @return void
     */
    public static function register( $id, $args ) {
        self::$pointers[ $id ] = $args;
    }

    /**
     * Enqueue pointer scripts and styles
     *
     * @param string $hook Current admin page hook
     * @return void
     */
    public function enqueue_scripts( $hook ) {
        // Note: Pro active condition is now handled per-pointer in get_enabled_pointers()

        // Load WP pointer scripts and styles
        wp_enqueue_style( 'wp-pointer' );
        wp_enqueue_script( 'wp-pointer' );

        // Get enabled pointers for current context
        $enabled_pointers = $this->get_enabled_pointers( $hook );

        if ( empty( $enabled_pointers ) ) {
            return;
        }

        // Register and enqueue pointer script
        wpdev_essential_blocks()->assets->register(
            'pointer-notices',
            'admin/pointer-notices/pointer-notices.js',
            array( 'wp-pointer', 'jquery' )
        );

        // Localize script with pointer data
        wpdev_essential_blocks()->assets->localize(
            'pointer-notices',
            'EBPointerNoticesData',
            array(
                'pointers' => $enabled_pointers,
                'ajaxurl'  => admin_url( 'admin-ajax.php' ),
                'nonce'    => wp_create_nonce( 'eb_pointer_nonce' )
            )
        );

        wpdev_essential_blocks()->assets->enqueue( 'pointer-notices', 'admin/pointer-notices/pointer-notices.js' );
    }

    /**
     * Initialize pointer priority option
     *
     * @return void
     */
    public function init_pointer_priority_option() {
        // Initialize the option with null if it doesn't exist
        if ( get_option( '_wpdeveloper_plugin_pointer_priority' ) === false ) {
            add_option( '_wpdeveloper_plugin_pointer_priority', null );
        }
    }

    /**
     * Check if Essential Blocks Pro is active
     *
     * @return bool True if pro is active, false otherwise
     */
    private function is_pro_active() {
        return defined( 'ESSENTIAL_BLOCKS_IS_PRO_ACTIVE' ) && \ESSENTIAL_BLOCKS_IS_PRO_ACTIVE;
    }

    /**
     * Check if debug mode is enabled for pointer notices
     *
     * @return bool True if debug mode is enabled, false otherwise
     */
    private function is_debug_mode() {
        // Enable debug mode with URL parameter: ?eb_pointer_debug=1
        return isset( $_GET['eb_pointer_debug'] ) && $_GET['eb_pointer_debug'] == '1';
    }

    /**
     * Get enabled pointers for current context
     *
     * @param string $hook Current admin page hook
     * @return array Enabled pointers
     */
    private function get_enabled_pointers( $hook ) {
        $enabled = array();

        foreach ( self::$pointers as $id => $args ) {
            // Skip if user dismissed
            if ( $this->is_pointer_dismissed( $id ) ) {
                continue;
            }

            // Skip if expired
            if ( $this->is_pointer_expired( $args ) ) {
                continue;
            }

            // Skip if wrong admin page
            if ( $this->is_wrong_screen( $args, $hook ) ) {
                continue;
            }

            // Skip if user doesn't have required capability
            if ( ! $this->user_has_capability( $args ) ) {
                continue;
            }

            // Skip if pro is active and pointer has hide_when_pro_active set to true
            if ( $this->is_pro_active() && isset( $args['hide_when_pro_active'] ) && $args['hide_when_pro_active'] ) {
                continue;
            }

            // Check pointer priority
            if ( ! $this->should_show_pointer_by_priority( $args ) ) {
                continue;
            }

            $enabled[ $id ] = $args;
        }

        return $enabled;
    }

    /**
     * Check if pointer is dismissed by user
     *
     * @param string $id Pointer ID
     * @return bool True if dismissed
     */
    private function is_pointer_dismissed( $id ) {
        return (bool) get_user_meta(
            get_current_user_id(),
            '_eb_pointer_' . $id . '_dismissed',
            true
        );
    }

    /**
     * Check if pointer is expired
     *
     * @param array $args Pointer arguments
     * @return bool True if expired
     */
    private function is_pointer_expired( $args ) {
        if ( ! isset( $args['expires'] ) || empty( $args['expires'] ) ) {
            return false;
        }

        $expires_date = $args['expires'];

        // Support multiple date formats
        $supported_formats = array(
            'Y-m-d',           // 2024-12-31
            'Y-m-d H:i:s',     // 2024-12-31 23:59:59
            'Y/m/d',           // 2024/12/31
            'd-m-Y',           // 31-12-2024
            'd/m/Y',           // 31/12/2024
            'm/d/Y',           // 12/31/2024
        );

        $expires_timestamp = false;

        // Try to parse the date with different formats
        foreach ( $supported_formats as $format ) {
            $date_obj = \DateTime::createFromFormat( $format, $expires_date );
            if ( $date_obj !== false ) {
                $expires_timestamp = $date_obj->getTimestamp();
                break;
            }
        }

        // If no format worked, try strtotime as fallback
        if ( $expires_timestamp === false ) {
            $expires_timestamp = strtotime( $expires_date );
        }

        // If still couldn't parse, consider it invalid (not expired)
        if ( $expires_timestamp === false ) {
            return false;
        }

        $current_timestamp = current_time( 'timestamp' );

        return $current_timestamp > $expires_timestamp;
    }

    /**
     * Check if current screen doesn't match pointer screen
     *
     * @param array $args Pointer arguments
     * @param string $hook Current admin page hook
     * @return bool True if wrong screen
     */
    private function is_wrong_screen( $args, $hook ) {
        if ( ! isset( $args['screen'] ) ) {
            return false;
        }

        $screen = $args['screen'];
        $current_screen = get_current_screen();

        // Handle array of screens
        if ( is_array( $screen ) ) {
            foreach ( $screen as $allowed_screen ) {
                if ( $allowed_screen === $hook || $allowed_screen === $current_screen->id ) {
                    return false; // Found a match, screen is correct
                }
            }
            return true; // No match found, wrong screen
        }

        // Handle single screen (backward compatibility)
        if ( $screen === $hook || $screen === $current_screen->id ) {
            return false;
        }

        return true;
    }

    /**
     * Check if user has required capability
     *
     * @param array $args Pointer arguments
     * @return bool True if user has capability
     */
    private function user_has_capability( $args ) {
        $capability = isset( $args['capability'] ) ? $args['capability'] : 'activate_plugins';
        return current_user_can( $capability );
    }

    /**
     * Check if pointer should be shown based on priority system
     *
     * @param array $args Pointer arguments
     * @return bool True if pointer should be shown
     */
    private function should_show_pointer_by_priority( $args ) {
        // Get pointer priority from args (default to 3 for Essential Blocks)
        $pointer_priority = isset( $args['priority'] ) ? (int) $args['priority'] : 3;
        // Get current global priority
        $current_priority = get_option( '_wpdeveloper_plugin_pointer_priority' );

        // If current priority is null or less than our priority, update it
        if ( empty($current_priority) || is_null( $current_priority ) || (int) $pointer_priority < (int) $current_priority ) {
            update_option( '_wpdeveloper_plugin_pointer_priority', $pointer_priority );
            return true;
        }

        // If current priority equals our priority, show the pointer
        if ( (int) $current_priority == (int) $pointer_priority ) {
            return true;
        }

        // Otherwise, don't show the pointer
        return false;
    }

    /**
     * AJAX handler for dismissing pointers
     *
     * @return void
     */
    public function dismiss_pointer() {
        // Verify nonce
        if ( ! isset( $_POST['nonce'] ) || ! wp_verify_nonce( sanitize_key( $_POST['nonce'] ), 'eb_pointer_nonce' ) ) {
            wp_send_json_error( __( 'Nonce verification failed', 'essential-blocks' ) );
        }

        // Check user capability
        if ( ! current_user_can( 'activate_plugins' ) ) {
            wp_send_json_error( __( 'You are not authorized to perform this action', 'essential-blocks' ) );
        }

        // Get and validate pointer ID
        if ( ! isset( $_POST['pointer_id'] ) ) {
            wp_send_json_error( __( 'Pointer ID is required', 'essential-blocks' ) );
        }

        $pointer_id = sanitize_text_field( $_POST['pointer_id'] );

        // Update user meta to mark pointer as dismissed
        $updated = update_user_meta(
            get_current_user_id(),
            '_eb_pointer_' . $pointer_id . '_dismissed',
            1
        );

        // Reset pointer priority to null when dismissed
        update_option( '_wpdeveloper_plugin_pointer_priority', null );

        if ( $updated ) {
            wp_send_json_success( __( 'Pointer dismissed successfully', 'essential-blocks' ) );
        } else {
            wp_send_json_error( __( 'Failed to dismiss pointer', 'essential-blocks' ) );
        }
    }

    /**
     * Reset all dismissed pointers for current user
     *
     * @return void
     */
    public function reset_dismissed_pointers() {
        global $wpdb;

        $user_id = get_current_user_id();

        $wpdb->delete(
            $wpdb->usermeta,
            array(
                'user_id' => $user_id,
                'meta_key' => array( 'LIKE', '_eb_pointer_%_dismissed' )
            ),
            array( '%d', '%s' )
        );
    }

    /**
     * Get all registered pointers
     *
     * @return array Registered pointers
     */
    public static function get_pointers() {
        return self::$pointers;
    }

    /**
     * Remove a registered pointer
     *
     * @param string $id Pointer ID to remove
     * @return bool True if removed, false if not found
     */
    public static function remove_pointer( $id ) {
        if ( isset( self::$pointers[ $id ] ) ) {
            unset( self::$pointers[ $id ] );
            return true;
        }
        return false;
    }

    /**
     * Get current pointer priority from options
     *
     * @return mixed Current priority value (null by default)
     */
    public function get_pointer_priority() {
        return get_option( '_wpdeveloper_plugin_pointer_priority' );
    }

    /**
     * Set pointer priority in options
     *
     * @param mixed $priority Priority value to set
     * @return bool True on success, false on failure
     */
    public function set_pointer_priority( $priority ) {
        return update_option( '_wpdeveloper_plugin_pointer_priority', $priority );
    }

    /**
     * Reset pointer priority to null
     *
     * @return bool True on success, false on failure
     */
    public function reset_pointer_priority() {
        return update_option( '_wpdeveloper_plugin_pointer_priority', null );
    }
}
