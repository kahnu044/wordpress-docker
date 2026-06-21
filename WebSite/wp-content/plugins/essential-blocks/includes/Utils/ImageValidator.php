<?php

namespace EssentialBlocks\Utils;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Image content validator.
 *
 * Shared helper used by AI image-save flows to reject oversized images,
 * unreasonable dimensions, and payloads that look like embedded scripts
 * or markup rather than image bytes.
 */
class ImageValidator
{
    /**
     * Maximum allowed image byte length (10 MB).
     */
    const MAX_SIZE = 10485760;

    /**
     * Maximum allowed pixel width.
     */
    const MAX_WIDTH = 4096;

    /**
     * Maximum allowed pixel height.
     */
    const MAX_HEIGHT = 4096;

    /**
     * Validate that a binary string looks like a safe image.
     *
     * @param string $image_data Raw image bytes.
     * @return bool
     */
    public static function is_valid( $image_data )
    {
        if ( empty( $image_data ) ) {
            return false;
        }

        if ( strlen( $image_data ) > self::MAX_SIZE ) {
            return false;
        }

        $image_info = getimagesizefromstring( $image_data );
        if ( ! $image_info ) {
            return false;
        }

        if ( $image_info[ 0 ] > self::MAX_WIDTH || $image_info[ 1 ] > self::MAX_HEIGHT ) {
            return false;
        }

        $suspicious_patterns = [
            '<?php',
            '<script',
            'javascript:',
            'data:text/',
            '<html',
            '#!/bin/'
         ];

        $data_start = substr( $image_data, 0, 1024 );
        foreach ( $suspicious_patterns as $pattern ) {
            if ( stripos( $data_start, $pattern ) !== false ) {
                return false;
            }
        }

        return true;
    }
}
