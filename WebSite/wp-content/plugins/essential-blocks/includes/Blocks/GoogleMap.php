<?php

/**
 * Functions to register client-side assets (scripts and stylesheets) for the
 * Gutenberg block.
 *
 * @package essential-blocks
 */

/**
 * Registers all block assets so that they can be enqueued through Gutenberg in
 * the corresponding context.
 *
 * @see https://wordpress.org/gutenberg/handbook/designers-developers/developers/tutorials/block-tutorial/applying-styles-with-stylesheets/
 */

namespace EssentialBlocks\Blocks;

use EssentialBlocks\Core\Block;

class GoogleMap extends Block
{
    protected $frontend_scripts = [ 'essential-blocks-google-map-frontend', 'essential-blocks-google-map-script' ];

    /**
     * Unique name of the block.
     *
     * @return string
     */
    public function get_name()
    {
        return 'google-map';
    }

    private $api_key = '';

    public function __construct()
    {
        $settings = get_option( 'eb_settings', [  ] );

        if ( is_array( $settings ) && ! empty( $settings[ 'googleMapApi' ] ) ) {
            $this->api_key = $settings[ 'googleMapApi' ];
        }
    }

    /**
     * Register all other scripts
     *
     * @return void
     */
    public function register_scripts()
    {
        $this->assets_manager->register(
            'google-map-frontend',
            $this->path() . '/frontend.js',
        );

        if ( ! empty( $this->api_key ) ) {
            // Only for editor
            if ( is_admin() ) {
                $this->assets_manager->enqueue(
                    'google-map-script-editor',
                    'https://maps.googleapis.com/maps/api/js?key=' . $this->api_key . '&callback=Function.prototype&libraries=places,marker&cache=' . wp_rand( 10, 1000 ),
                    [  ],
                    [
                        'is_js' => true
                     ]
                );
            }
            // For frontend
            $this->assets_manager->register(
                'google-map-script',
                'https://maps.googleapis.com/maps/api/js?key=' . $this->api_key . '&callback=Function.prototype&libraries=places,marker&cache=' . wp_rand( 10, 1000 ),
                [  ],
                [
                    'is_js' => true
                 ]
            );
        }
    }

    public function render_callback( $attributes, $content )
    {
        if ( empty( $this->api_key ) ) {
            if ( get_current_user_id() ) {
                $html = __( 'Please add your Google Map API to display Google Maps Block', 'essential-blocks' );

                return $html;
            } else {
                return;
            }
        }

        // Re-encode marker data into the rendered HTML. WPML translates marker
        // titles/content in the block comment JSON, but the saved HTML still
        // contains the old base64-encoded marker data, so prefer the attributes.
        // When the attribute is missing, normalize whatever the saved HTML holds:
        // a crafted data-marker must never reach the frontend unsanitized.
        $attribute_markers = ! empty( $attributes['marker'] ) && is_array( $attributes['marker'] )
            ? $attributes['marker']
            : null;

        return preg_replace_callback(
            '/(\sdata-marker)\s*=\s*(?:"([^"]*)"|\'([^\']*)\'|([^\s"\'=<>`]+))/i',
            function ( $matches ) use ( $attribute_markers ) {
                if ( null !== $attribute_markers ) {
                    $markers = $attribute_markers;
                } else {
                    $raw     = isset( $matches[4] ) ? $matches[4] : ( isset( $matches[3] ) && '' !== $matches[3] ? $matches[3] : $matches[2] );
                    $markers = $this->decode_markers( html_entity_decode( $raw, ENT_QUOTES, 'UTF-8' ) );
                }

                $markers = $this->sanitize_markers( $markers );

                // An empty data-marker makes the frontend skip the map instead of crashing.
                $encoded = empty( $markers ) ? '' : base64_encode( wp_json_encode( $markers ) );

                return $matches[1] . '="' . esc_attr( $encoded ) . '"';
            },
            $content
        );
    }

    /**
     * Decode a saved data-marker value, mirroring frontend.js: plain JSON
     * (deprecated saves) first, then base64-encoded JSON.
     *
     * @param string $value
     * @return array|null
     */
    private function decode_markers( $value )
    {
        $markers = json_decode( $value, true );
        if ( is_array( $markers ) && wp_is_numeric_array( $markers ) ) {
            return $markers;
        }

        $decoded = base64_decode( $value, true );
        if ( false === $decoded ) {
            return null;
        }

        $markers = json_decode( $decoded, true );

        return is_array( $markers ) ? $markers : null;
    }

    /**
     * Normalize marker data while keeping its structure. Title/content are plain
     * text, so they are stored HTML-encoded; the frontend decodes entities and
     * renders them via textContent.
     *
     * @param mixed $markers
     * @return array
     */
    private function sanitize_markers( $markers )
    {
        if ( ! is_array( $markers ) ) {
            return [  ];
        }

        $sanitized = [  ];
        foreach ( $markers as $marker ) {
            if ( ! is_array( $marker ) ) {
                continue;
            }

            $clean = [  ];
            foreach ( $marker as $key => $value ) {
                if ( ! is_string( $key ) || ! preg_match( '/^[A-Za-z0-9_-]+$/', $key ) || ! is_scalar( $value ) ) {
                    continue;
                }

                switch ( $key ) {
                    case 'latitude':
                    case 'longitude':
                        $clean[ $key ] = is_numeric( $value ) ? $value : '';
                        break;
                    case 'imageUrl':
                    case 'icon':
                        $clean[ $key ] = esc_url_raw( (string) $value );
                        break;
                    case 'showCustomIcon':
                        $clean[ $key ] = is_bool( $value ) ? $value : ( 'true' === $value ? 'true' : 'false' );
                        break;
                    default:
                        $clean[ $key ] = esc_html( (string) $value );
                }
            }

            $sanitized[  ] = $clean;
        }

        return $sanitized;
    }
}
