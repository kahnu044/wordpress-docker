<?php

namespace CarouselSliderBlock\Admin;

class Block_Filters {

    /**
     * Initialize block filters.
     */
    public static function init() {
        add_filter( 'block_type_metadata_settings', [ self::class, 'filter_legacy_blocks_inserter' ], 10, 2 );
    }

    /**
     * Hide legacy blocks from inserter but keep them available.
     *
     * @param array $settings Block settings.
     * @param array $metadata Block metadata.
     * @return array Modified block settings.
     */
    public static function filter_legacy_blocks_inserter( $settings, $metadata ) {
        // Bail if show legacy blocks is enabled.
        if ( Settings_Utils::get_setting( 'show_legacy_blocks', false ) ) {
            return $settings;
        }

        // Target only the legacy blocks.
        if ( in_array( $metadata['name'], [ 'cb/carousel' ], true ) ) {
            $settings['supports']['inserter'] = false;
        }

        return $settings;
    }
}
