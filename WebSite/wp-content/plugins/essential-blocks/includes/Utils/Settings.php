<?php

namespace EssentialBlocks\Utils;

class Settings
{

    private static $instance;

    public static function get_instance()
    {
        if ( null === static::$instance ) {
            static::$instance = new static();
        }
        return static::$instance;
    }

    public static function get( $key, $default = false )
    {
        return get_option( $key, $default );
    }

    public static function save( $key, $value = '' )
    {
        return update_option( $key, $value );
    }

    public static function save_eb_settings( $key, $value = '' )
    {
        $settings   = get_option( 'eb_settings', [  ] );
        $prev_value = null;

        // If 'all' is passed as the key, replace the entire settings array
        if ( $key === 'all' && ! empty( $value ) && is_string( $value ) ) {
            $prev_value = $settings;
            $settings   = json_decode( wp_unslash( $value ), true );

            // Ensure 'unfilteredFile' is only enabled by admins (when saving all settings at once)
            if ( array_key_exists( 'unfilteredFile', $settings ) ) {
                $requested = $settings['unfilteredFile'];
                $truthy    = ( $requested === true || $requested === 'true' || $requested === 1 || $requested === '1' );
                if ( current_user_can( 'activate_plugins' ) && $truthy ) {
                    // Store as string 'true' for compatibility with consumers
                    $settings['unfilteredFile'] = 'true';
                } else {
                    // For non-admins or falsy values, do not allow enabling this flag
                    unset( $settings['unfilteredFile'] );
                }
            }


            // Fires after saving all settings
            do_action( "eb_after_save_all_settings", $settings, $prev_value );

            return update_option( 'eb_settings', $settings );
        }

        if ( isset( $settings[ $key ] ) ) {
            $prev_value = $settings[ $key ];
        }

	        // Enforce admin-only true for 'unfilteredFile' when saving a single key
	        if ( $key === 'unfilteredFile' ) {
	            $truthy = ( $value === true || $value === 'true' || $value === 1 || $value === '1' );
	            if ( current_user_can( 'activate_plugins' ) && $truthy ) {
	                // Store as string 'true' for compatibility with consumers
	                $value = 'true';
	            } else {
	                // Non-admins or falsy values should not enable this flag
	                $value = '';
	            }
	        }

        if ( empty( $value ) ) {
            unset( $settings[ $key ] );
        } else {
            $settings[ $key ] = $value;
        }
        /**
         * Fires after save a specific settings key
         *
         * @since 4.5.0
         * @param mixed $value current value of settings
         * @param mixed $prev_value previous value of settings
         */
        do_action( "eb_after_save_{$key}_settings", $value, $prev_value );



        return update_option( 'eb_settings', $settings );
    }
    /**
     * Get Essential Blocks settings in a way that mirrors save_eb_settings()
     *
     * - Reads the single 'eb_settings' option (array)
     * - When a $key is provided, returns that entry or $default if not set
     * - Normalizes critical flags like 'unfilteredFile' to match how we save them
     *   (string 'true' for enabled, '' for disabled)
     * - Provides a legacy fallback for previously stored single options
     *
     * @param string $key     Optional settings key to fetch
     * @param mixed  $default Default value when key not found
     * @return mixed          Array of all settings or the value for the provided key
     */
    public static function get_eb_settings( $key = '', $default = false )
    {
        $settings = get_option( 'eb_settings', [] );

        // If a specific key is requested
        if ( strlen( $key ) > 0 ) {
            if ( isset( $settings[ $key ] ) ) {
                $value = $settings[ $key ];

                return $value;
            }

            return $default;
        }

        // If no key was requested, normalize the full array for consumers
        if ( array_key_exists( 'unfilteredFile', $settings ) ) {
            $value = $settings['unfilteredFile'];
            $truthy = ( $value === true || $value === 'true' || $value === 1 || $value === '1' );
            $settings['unfilteredFile'] = $truthy ? 'true' : '';
        }

        return $settings;
    }


    public static function save_eb_write_with_ai( $value )
    {
        return update_option( 'eb_write_with_ai', $value );
    }

    public static function reset_eb_settings( $key )
    {
        $settings   = get_option( 'eb_settings', [  ] );
        $prev_value = null;
        if ( isset( $settings[ $key ] ) ) {
            $prev_value = $settings[ $key ];
            unset( $settings[ $key ] );
        }
        /**
         * Fires after reset a specific settings key
         *
         * @since 4.5.0
         * @param mixed $value current value of settings
         * @param mixed $prev_value previous value of settings
         */
        do_action( "eb_after_reset_{$key}_settings", $prev_value );
        return update_option( 'eb_settings', $settings );
    }

    public static function set_transient( $key, $value, $expiration = null )
    {
        if ( $expiration === null ) {
            $expiration = HOUR_IN_SECONDS * 6;
        }
        return set_transient( $key, $value, $expiration );
    }

    public static function get_transient( $key )
    {
        return get_transient( $key );
    }

    /**
     * Summary of save_integration
     * @param mixed $type
     * @param mixed $data
     * @return bool
     */
    public static function save_integration( $type, $data = null )
    {
        return false;
    }

    /**
     * Summary of save_blocks_option
     * @param mixed $data
     * @return bool
     */
    public static function save_blocks_option( $data = [  ] )
    {
        /**
         * Sanitize Data
         */
        return update_option( 'essential_all_blocks', $data );
    }
}
