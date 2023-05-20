<?php

namespace EssentialBlocks\Utils;

class Settings {

    private static $instance;

    public static function get_instance() {
        if ( null === static::$instance ) {
            static::$instance = new static;
        }
        return static::$instance;
    }

    public function __construct() {
        // $_settings = get_option( 'eb_settings', [] );
    }

    public function get( $key, $default = false ) {
        return get_option( $key, $default );
    }

    public function save( $key, $value = '' ) {
        $settings = get_option( 'eb_settings', [] );
        if ( empty( $value ) ) {
            unset( $settings[$key] );
        } else {
            $settings[$key] = $value;
        }

        return update_option( 'eb_settings', $settings );
    }

    public function set_transient( $key, $value, $expiration = null ) {
        if ( $expiration === null ) {
            $expiration = HOUR_IN_SECONDS * 6;
        }
        return set_transient( $key, $value, $expiration );
    }
    public function get_transient( $key ) {
        return get_transient( $key );
    }

    /**
     * Summary of save_integration
     * @param mixed $type
     * @param mixed $data
     * @return bool
     */
    public function save_integration( $type, $data = null ){
        return false;
    }

    /**
     * Summary of save_blocks_option
     * @param mixed $data
     * @return bool
     */
    public function save_blocks_option( $data = [] ){
        /**
         * Sanitize Data
         */
        return update_option('essential_all_blocks', $data );
    }
}