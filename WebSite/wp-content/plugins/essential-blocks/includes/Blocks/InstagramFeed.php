<?php
namespace EssentialBlocks\Blocks;

use EssentialBlocks\Core\Block;
use EssentialBlocks\Utils\Helper;
use EssentialBlocks\Utils\Settings;
use EssentialBlocks\Utils\HttpRequest;

class InstagramFeed extends Block
{
    /**
     * API request timeout, in seconds.
     *
     * HttpRequest defaults to 45s, which is far too long to block a
     * front-of-site render on. Instagram normally answers in well under a
     * second. Mirrors FacebookFeed::REQUEST_TIMEOUT.
     */
    const REQUEST_TIMEOUT = 10;

    /**
     * Negative-cache TTL, in seconds. Bounds how often a broken token or a
     * throttled endpoint can trigger a fresh blocking request.
     */
    const FAILURE_CACHE_TTL = 5 * MINUTE_IN_SECONDS;

    /**
     * Sentinel marking a cached failure — `get_transient()` returns `false`
     * for "not cached", which is otherwise indistinguishable from a cached
     * falsy response.
     */
    const FAILURE_SENTINEL = '__eb_ig_feed_failed__';

    /**
     * API `limit`. Mirrors MEDIA_LIMIT in
     * src/blocks/instagram-feed/src/helper.js so the editor preview and the
     * frontend request the same window of media.
     */
    const MEDIA_LIMIT = 500;

    protected $frontend_styles = [
        'essential-blocks-fontawesome'
    ];
    protected $attributes = [
        'blockId'         => [
            'type' => 'string'
         ],
        'layout'          => [
            'type'    => 'string',
            'default' => 'overlay'
         ],
        'overlayStyle'    => [
            'type'    => 'string',
            'default' => 'overlay__simple'
         ],
        'cardStyle'       => [
            'type'    => 'string',
            'default' => 'content__outter'
         ],
        'token'           => [
            'type'    => 'string',
            'default' => ''
         ],
        'columns'         => [
            'type'    => 'number',
            'default' => '4'
         ],
        'numberOfImages'  => [
            'type'    => 'number',
            'default' => 6
         ],
        'hasEqualImages'  => [
            'type'    => 'boolean',
            'default' => true
         ],
        'showCaptions'    => [
            'type'    => 'boolean',
            'default' => true
         ],
        'showProfileName' => [
            'type'    => 'boolean',
            'default' => true
         ],
        'showProfileImg'  => [
            'type'    => 'boolean',
            'default' => true
         ],
        'profileImg'      => [
            'type' => 'string'
         ],
        'profileName'     => [
            'type' => 'string'
         ],
        'showMeta'        => [
            'type'    => 'boolean',
            'default' => true
         ],
        'enableLink'      => [
            'type'    => 'boolean',
            'default' => false
         ],
        'openInNewTab'    => [
            'type'    => 'boolean',
            'default' => false
         ],
        'sortBy'          => [
            'type'    => 'string',
            'default' => 'most_recent'
         ]
     ];

    protected $frontend_scripts = [
        'essential-blocks-isotope',
        'essential-blocks-image-loaded',
        'essential-blocks-instagram-feed-frontend'
     ];

    protected static $default_attributes = [
        'blockId'         => '',
        'token'           => '',
        'layout'          => 'overlay',
        'cardStyle'       => 'content__outter',
        'overlayStyle'    => 'overlay__simple',
        'hasEqualImages'  => true,
        'numberOfImages'  => 6,
        'sortBy'          => 'most_recent',
        'showCaptions'    => true,
        'showProfileName' => true,
        'showProfileImg'  => true,
        'showMeta'        => true,
        'enableLink'      => false,
        'openInNewTab'    => false,
        'profileName'     => '',
        'align'           => ''
     ];

    private $settings;

    public function __construct()
    {
        $this->settings = Settings::get_instance();
    }

    public function get_default_attributes()
    {
        self::$default_attributes[ 'profileImg' ] = $this->assets_manager->icon( 'user.png' );
        return self::$default_attributes;
    }

    /**
     * Unique name of the block.
     *
     * @return string
     */
    public function get_name()
    {
        return 'instagram-feed';
    }

    /**
     * Register all other scripts
     *
     * @return void
     */
    public function register_scripts()
    {
        $this->assets_manager->register(
            'instagram-feed-frontend',
            $this->path() . '/frontend.js',
            [
                'essential-blocks-isotope',
                'essential-blocks-image-loaded'
             ]
        );
    }

    public function render_callback( $attributes, $content )
    {
        $attributes = wp_parse_args(
            $attributes,
            $this->get_default_attributes()
        );

        $eb_settings = get_option( 'eb_settings', [  ] );

        $token = '';
        if ( ! empty( $eb_settings[ 'instagramToken' ] ) ) {
            $token = $eb_settings[ 'instagramToken' ];
        } elseif ( ! empty( $attributes[ 'token' ] ) ) {
            $token = $attributes[ 'token' ];
        }

        $sortBy = $attributes[ 'sortBy' ];

        $url = 'https://graph.instagram.com/me/media'
            . '?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,username'
            . '&limit=' . self::MEDIA_LIMIT
            . '&access_token=' . $token;

        // Hash the token into the key rather than embedding it raw. `option_name`
        // is VARCHAR(191); a long-lived Instagram token runs ~200 characters, so
        // "_transient_eb-main-instagram-api_{token}_{count}" overflowed the column.
        // The stored row was truncated and could never be read back under the
        // full key, so `get_transient()` always missed and EVERY page view made a
        // blocking API request. Matches the Facebook Feed key shape.
        //
        // numberOfImages is deliberately absent: the request always asks for
        // MEDIA_LIMIT and the view slices client-side, so two blocks differing
        // only in that count share one payload instead of fetching it twice.
        $key = 'eb-main-instagram-api_' . md5( $token . '|' . self::MEDIA_LIMIT );

        $results = $this->settings->get_transient( $key );

        if ( false === $results ) {
            $response = HttpRequest::get_instance()->get(
                $url,
                [ 'timeout' => self::REQUEST_TIMEOUT ]
            );

            if ( self::is_successful_response( $response ) ) {
                $results = $response;
                $this->settings->set_transient( $key, $results );
            } else {
                // Cache the failure too, on a much shorter clock — otherwise an
                // expired token or a throttled endpoint means a blocking API
                // request on every single page view.
                $results = self::FAILURE_SENTINEL;
                $this->settings->set_transient( $key, $results, self::FAILURE_CACHE_TTL );
            }
        }

        if ( self::FAILURE_SENTINEL === $results ) {
            $results = null;
        }

        $images = isset( $results->data ) && is_array( $results->data ) ? $results->data : [  ];

        // Spaceship comparator. The previous version returned `(int) ( a < b )`,
        // i.e. only ever 0 or 1 and never a negative — an invalid comparator that
        // left the feed in an arbitrary order rather than the requested one.
        switch ( $sortBy ) {
            case 'most_recent':
                usort(
                    $images,
                    function ( $a, $b ) {
                        return strtotime( $b->timestamp ) <=> strtotime( $a->timestamp );
                    }
                );
                break;
            case 'least_recent':
                usort(
                    $images,
                    function ( $a, $b ) {
                        return strtotime( $a->timestamp ) <=> strtotime( $b->timestamp );
                    }
                );
                break;
        }

        ob_start();
        Helper::views(
            'instagram-feed',
            wp_parse_args(
                $attributes,
                [
                    'block_object' => $this,
                    'classHook'    => '',
                    'profileImg'   => '',
                    'profileName'  => '',
                    'images'       => $images
                 ]
            )
        );
        return ob_get_clean();
    }

    /**
     * Is an API response worth caching for the full TTL?
     *
     * Recognises the three shapes a failure arrives in:
     *   - `null` / empty — body was missing or failed to decode;
     *   - `['status' => 'error', ...]` — HttpRequest's WP_Error wrapper
     *     (DNS failure, connection refused, timeout);
     *   - an object carrying `->error` — Instagram's own error envelope
     *     (expired token, rate limit, permissions).
     *
     * @param  mixed $response Decoded response from HttpRequest.
     * @return bool
     */
    private static function is_successful_response( $response )
    {
        if ( empty( $response ) ) {
            return false;
        }

        if ( is_array( $response ) && isset( $response[ 'status' ] ) && 'error' === $response[ 'status' ] ) {
            return false;
        }

        if ( is_object( $response ) && isset( $response->error ) ) {
            return false;
        }

        return true;
    }
}
