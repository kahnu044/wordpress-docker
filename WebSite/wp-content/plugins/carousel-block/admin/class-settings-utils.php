<?php

namespace CarouselSliderBlock\Admin;

/**
 * Class Settings_Utils
 *
 * Utility functions for working with plugin settings.
 */
class Settings_Utils {

    /**
     * Get a specific setting value with filters applied.
     *
     * @param string $key Setting key.
     * @param mixed $default Default value if not set.
     * @return mixed Filtered setting value.
     */
    public static function get_setting( $key, $default = false ) {
        $options = get_option( 'cb_carousel_settings', [] );
        $value = isset( $options[ $key ] ) ? $options[ $key ] : $default;

        /**
         * Filter the Carousel Block setting value.
         *
         * @param mixed  $value The setting value.
         * @param string $key   The setting key.
         */
        return apply_filters( 'cb_carousel_block_setting_' . $key, $value, $key );
    }
}
