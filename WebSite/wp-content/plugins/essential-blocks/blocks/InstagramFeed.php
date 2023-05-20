<?php
namespace EssentialBlocks\blocks;

use EssentialBlocks\Core\Block;
use EssentialBlocks\Utils\Helper;
use EssentialBlocks\Utils\Settings;
use EssentialBlocks\Utils\HttpRequest;

class InstagramFeed extends Block {
    protected $attributes = [
        'blockId'         => [
            'type' => "string"
        ],
        'layout'          => [
            'type'    => "string",
            'default' => "overlay"
        ],
        'overlayStyle'    => [
            'type'    => "string",
            'default' => "overlay__simple"
        ],
        'cardStyle'       => [
            'type'    => "string",
            'default' => "content__outter"
        ],
        'token'           => [
            'type'    => 'string',
            'default' => ''
        ],
        'columns'         => [
            'type'    => 'number',
            'default' => "4"
        ],
        'numberOfImages'  => [
            'type'    => 'number',
            'default' => 6
        ],
        'thumbs'          => [
            'type'    => 'array',
            'default' => []
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
            'type'    => "string",
            'default' => "most_recent"
        ]
    ];

    protected $frontend_scripts = [
        'essential-blocks-isotope',
        'essential-blocks-image-loaded',
        'essential-blocks-instagram-feed-block-script'
    ];
    protected $frontend_styles = [
        'essential-blocks-frontend-style'
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

    /**
     * Settings
     * @var Settings
     */
    private $settings;

    public function __construct() {
        $this->settings = Settings::get_instance();
    }

    public function get_default_attributes() {
        self::$default_attributes['profileImg'] = $this->assets_manager->icon( 'user.png' );
        return self::$default_attributes;
    }

    /**
     * Unique name of the block.
     * @return string
     */
    public function get_name() {
        return 'instagram-feed';
    }

    /**
     * Register all other scripts
     * @return void
     */
    public function register_scripts() {
        $this->assets_manager->register( 'isotope', 'js/isotope.pkgd.min.js' );
        $this->assets_manager->register( 'image-loaded', 'js/images-loaded.min.js' );
        $this->assets_manager->register(
            'instagram-feed-block-script',
            $this->path() . '/frontend/index.js',
            [
                'essential-blocks-isotope',
                'essential-blocks-image-loaded'
            ]
        );
    }

    public function render_callback( $attributes, $content ) {
        $attributes = wp_parse_args(
            $attributes,
            $this->get_default_attributes()
        );

        $eb_settings = get_option( 'eb_settings', [] );

        $token = '';
        if ( ! empty( $eb_settings['instagramToken'] ) ) {
            $token = $eb_settings['instagramToken'];
        } else if ( ! empty( $attributes['token'] ) ) {
            $token = $attributes['token'];
        }

        $numberOfImages = $attributes['numberOfImages'];
        $sortBy         = $attributes['sortBy'];

        $url = "https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,username&limit=500&access_token={$token}";

        $key = 'eb-main-instagram-api_' . $token . '_' . $numberOfImages;

        $results = $this->settings->get_transient( $key );

        if ( ! $results ) {
            $results = HttpRequest::get_instance()->get( $url );
            $this->settings->set_transient( $key, $results );
        }

        $images = isset( $results->data ) ? $results->data : [];

        switch ( $sortBy ) {
        case 'most_recent':
            usort( $images, function ( $a, $b ) {
                return (int) ( strtotime( $a->timestamp ) < strtotime( $b->timestamp ) );
            } );
            break;
        case 'least_recent':
            usort( $images, function ( $a, $b ) {
                return (int) ( strtotime( $a->timestamp ) > strtotime( $b->timestamp ) );
            } );
            break;
        }

        ob_start();
        Helper::views( 'instagram-feed', wp_parse_args(
            $attributes, [
                'block_object' => $this,
                'classHook'    => '',
                'profileImg'   => '',
                'profileName'  => '',
                'images'       => $images
            ] ) );
        return ob_get_clean();
    }
}
