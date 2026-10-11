<?php
namespace EssentialBlocks\Blocks;

use EssentialBlocks\Core\Block;

class AdvancedVideo extends Block
{
    /**
     * Self-hosted file URLs react-player plays with a plain <video>.
     * Mirrors react-player's VIDEO_EXTENSIONS and src/.../media-source.js.
     */
    const DIRECT_MEDIA_RE = '/\.(mp4|og[gv]|webm|mov|m4v)(#t=[,\d+]+)?($|\?)/i';

    /**
     * Streaming adapters react-player needs as a global, keyed by the handle
     * suffix. Mirrors react-player's HLS/DASH/FLV_EXTENSIONS: when the global is
     * missing react-player fetches the library from a CDN instead, so loading
     * exactly what the URL needs keeps playback identical.
     */
    const STREAMING_ADAPTERS = [
        'hls'  => '/\.(m3u8)($|\?)/i',
        'dash' => '/\.(mpd)($|\?)/i',
        'flv'  => '/\.(flv)($|\?)/i'
     ];

    protected $editor_scripts = [
        'essential-blocks-hls',
        'essential-blocks-flv',
        'essential-blocks-dash'
     ];

    /**
     * Chosen per block instance in render_callback(): a native <video> player
     * needs only the small native.js runtime; everything else gets react-player
     * plus just the streaming adapter its URL needs. Until 6.4.7 every instance
     * loaded react-player, react-dom, the vendor bundle and all three adapters.
     */
    protected $frontend_scripts = [  ];
    protected $frontend_styles  = [ 'essential-blocks-fontawesome' ];

    /**
     * Unique name of the block.
     *
     * @return string
     */
    public function get_name()
    {
        return 'advanced-video';
    }

    /**
     * Register all other scripts
     *
     * @return void
     */
    public function register_scripts()
    {
        // Adapters are no longer hard dependencies — enqueue_react_player()
        // adds the one a URL needs.
        $this->assets_manager->register(
            'advanced-video-frontend',
            $this->path() . '/frontend.js',
            [
                'essential-blocks-controls-frontend',
                'essential-blocks-vendor-bundle'
             ]
        );

        $this->assets_manager->register(
            'advanced-video-native',
            $this->path() . '/native.js'
        );
    }

    /**
     * Render callback.
     *
     * The saved markup is an empty `.eb-player-option` placeholder whose
     * data-attributes describe the player. For self-hosted files this fills it
     * with a native <video> at render time, so the browser discovers and starts
     * the video from the HTML instead of waiting for react-player to download
     * and mount. Saved markup is untouched, so existing posts benefit without
     * a re-save and nothing needs a deprecation. Anything this doesn't
     * recognise with certainty keeps the React path unchanged.
     *
     * @param array  $attributes Block attributes.
     * @param string $content    Saved block markup.
     * @return string
     */
    public function render_callback( $attributes, $content )
    {
        if ( is_admin() || empty( $content ) ) {
            return $content;
        }

        $needs_icon_runtime = false;
        $native             = $this->render_native_player( $content, $needs_icon_runtime );

        if ( null !== $native ) {
            if ( $needs_icon_runtime ) {
                // EBRenderIconWithSVG / loadSvgIcons for a custom icon-library play icon.
                wp_enqueue_script( 'essential-blocks-controls-frontend' );
            }
            wp_enqueue_script( 'essential-blocks-advanced-video-native' );
            return $native;
        }

        $this->enqueue_react_player( $content );
        return $content;
    }

    /**
     * Fill the placeholder with a native player, or return null to keep the
     * React path.
     *
     * Reproduces the DOM react-player mounts — `.eb-react-player` (16:9 inline
     * styles) > `<video>`, and react-player's `.react-player__preview` for Image
     * Overlay — so the block's CSS and per-block generated CSS apply unchanged.
     *
     * @param string $content            Saved block markup.
     * @param bool   $needs_icon_runtime Set to true when a custom icon-library play icon is used.
     * @return string|null
     */
    private function render_native_player( $content, &$needs_icon_runtime )
    {
        if ( ! class_exists( 'WP_HTML_Tag_Processor' ) ) {
            return null; // WordPress < 6.2.
        }

        // The Pro overlay's play/mute buttons are driven by frontend.js.
        if ( false !== strpos( $content, 'eb-av-overlay' ) ) {
            return null;
        }

        // Exactly one empty placeholder: the default / sticky save markup.
        // Lightbox markup, other saved variants and anything unexpected keep React.
        if ( 1 !== preg_match_all( '/<div\b[^>]*\beb-player-option\b[^>]*>\s*<\/div>/', $content, $matches, PREG_OFFSET_CAPTURE ) ) {
            return null;
        }
        $placeholder = $matches[ 0 ][ 0 ][ 0 ];
        $offset      = $matches[ 0 ][ 0 ][ 1 ];
        $open_tag    = substr( $placeholder, 0, strpos( $placeholder, '>' ) + 1 );

        $tag = new \WP_HTML_Tag_Processor( $open_tag );
        if ( ! $tag->next_tag( 'div' ) ) {
            return null;
        }

        $url  = $tag->get_attribute( 'data-url' );
        $mode = $tag->get_attribute( 'data-option' );
        if ( ! is_string( $url ) || '' === $url || 'lightbox' === $mode ) {
            return null;
        }

        $is_true = function ( $name ) use ( $tag ) {
            return 'true' === $tag->get_attribute( $name );
        };

        $youtube = self::parse_youtube_url( $url );
        if ( $youtube ) {
            $inner = $this->youtube_player( $tag, $youtube, $is_true, $needs_icon_runtime );
            return substr_replace( $content, $tag->get_updated_html() . $inner . '</div>', $offset, strlen( $placeholder ) );
        }

        if ( ! preg_match( self::DIRECT_MEDIA_RE, $url ) ) {
            return null;
        }

        $autoplay = $is_true( 'data-playing' );
        $light    = $tag->get_attribute( 'data-light' );
        // react-player's `light` mode needs both the toggle and an image.
        $overlay = $is_true( 'data-overlay' ) && is_string( $light ) && '' !== $light && 'false' !== $light;

        $video = [
            'src'                => esc_url( $url ),
            'style'              => 'width: 100%; height: auto;',
            'playsinline'        => true,
            'webkit-playsinline' => 'true'
         ];
        if ( $is_true( 'data-muted' ) ) {
            $video[ 'muted' ] = true;
        }
        if ( $is_true( 'data-loop' ) ) {
            $video[ 'loop' ] = true;
        }
        if ( $is_true( 'data-controls' ) ) {
            $video[ 'controls' ] = true;
        }
        if ( 'false' === $tag->get_attribute( 'data-download' ) ) {
            $video[ 'controlslist' ] = 'nodownload';
        }

        // Reserve the file's real shape so the player never changes size when
        // the video loads. react-player sized it only after loading, from a
        // 16:9 box.
        $media = self::video_media( $url );
        $ratio = '16 / 9';
        if ( $media ) {
            $video[ 'width' ]  = $media[ 'width' ];
            $video[ 'height' ] = $media[ 'height' ];
            $ratio             = $media[ 'width' ] . ' / ' . $media[ 'height' ];
        }

        // Nothing downloads during page load when the size is already known:
        // video bytes fetched before `load` compete with the page's own assets
        // (on essential-blocks.com they pushed mobile LCP past 15s), and
        // `preload="metadata"` is only a hint, so Chrome requests an open-ended
        // range and keeps receiving until it cancels (~40MB of MP4 there).
        // When the size is NOT known (a file outside the media library that no
        // lookup or filter could resolve), keep `preload="metadata"`: it is
        // the only way to learn the real size before the player is shown, and
        // without it the 16:9 box jumps to the real shape when the video
        // arrives and shifts everything below it.
        $preload = $media ? 'none' : 'metadata';

        $lazy_autoplay = false;
        if ( $overlay ) {
            // Nothing loads until the preview is clicked, as in react-player's light mode.
            $video[ 'preload' ] = 'none';
            $video[ 'style' ] .= ' display: none;';
        } elseif ( $autoplay ) {
            // native.js starts players on or near the screen once the page has loaded.
            $video[ 'preload' ] = $preload;
            $lazy_autoplay      = true;
        } else {
            // Click-to-play. With preload="none" there is no first frame to
            // show, so use the attachment's featured image as the poster.
            $video[ 'preload' ] = $preload;
            if ( $media && '' !== $media[ 'poster' ] ) {
                $video[ 'poster' ] = esc_url( $media[ 'poster' ] );
            }
        }

        $inner = '<div class="eb-react-player" style="aspect-ratio: ' . esc_attr( $ratio ) . '; width: 100%; height: auto;">'
            . ( $overlay ? $this->native_preview( $tag, $light, $needs_icon_runtime ) : '' )
            . '<video' . self::html_attributes( $video ) . '></video>'
            . '</div>';

        $tag->set_attribute( 'data-eb-native', '1' );
        if ( $lazy_autoplay ) {
            $tag->set_attribute( 'data-eb-lazy-autoplay', 'true' );
        }

        return substr_replace( $content, $tag->get_updated_html() . $inner . '</div>', $offset, strlen( $placeholder ) );
    }

    /**
     * Video id, start time and playlist of a YouTube URL, or null.
     *
     * Covers the URL shapes react-player's YouTube player accepts: watch?v=,
     * youtu.be/, embed/, shorts/ and live/, with `t=` / `start=` (seconds or
     * 1h2m3s) and `list=`. `nocookie` records a youtube-nocookie.com URL, so
     * the embed keeps that privacy-enhanced host as react-player does.
     *
     * @param string $url Video URL.
     * @return array|null { id, start, list, nocookie }
     */
    private static function parse_youtube_url( $url )
    {
        $url = html_entity_decode( $url, ENT_QUOTES );
        if ( ! preg_match( '~^(?:https?:)?//(?:www\.|m\.)?(?:youtube(?:-nocookie)?\.com/(?:watch\?(?:.*&)?v=|embed/|shorts/|live/|v/)|youtu\.be/)([A-Za-z0-9_-]{11})~', $url, $m ) ) {
            return null;
        }

        $query = [];
        $qs    = wp_parse_url( $url, PHP_URL_QUERY );
        if ( is_string( $qs ) ) {
            parse_str( $qs, $query );
        }

        $start = 0;
        $t     = isset( $query[ 't' ] ) ? $query[ 't' ] : ( isset( $query[ 'start' ] ) ? $query[ 'start' ] : '' );
        if ( is_string( $t ) && '' !== $t ) {
            if ( ctype_digit( $t ) ) {
                $start = (int) $t;
            } elseif ( preg_match( '/^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/', $t, $tm ) ) {
                $start = ( isset( $tm[ 1 ] ) ? (int) $tm[ 1 ] * 3600 : 0 ) + ( isset( $tm[ 2 ] ) ? (int) $tm[ 2 ] * 60 : 0 ) + ( isset( $tm[ 3 ] ) ? (int) $tm[ 3 ] : 0 );
            }
        }

        $list = isset( $query[ 'list' ] ) && is_string( $query[ 'list' ] ) && preg_match( '/^[A-Za-z0-9_-]+$/', $query[ 'list' ] ) ? $query[ 'list' ] : '';

        $host = (string) wp_parse_url( ( 0 === strpos( $url, '//' ) ? 'https:' : '' ) . $url, PHP_URL_HOST );

        return [
            'id'       => $m[ 1 ],
            'start'    => $start,
            'list'     => $list,
            'nocookie' => false !== strpos( strtolower( $host ), 'youtube-nocookie.com' )
         ];
    }

    /**
     * Lightweight YouTube player: a thumbnail with a play button in the same
     * `.eb-react-player` 16:9 box react-player uses. native.js swaps in the
     * real iframe on click, or once the page has loaded and the player is near
     * the screen for autoplaying blocks. Until 6.4.7 every YouTube block loaded
     * react-player, React, ReactDOM and the vendor bundle (~1 MB of JS) to show
     * the same iframe.
     *
     * @param \WP_HTML_Tag_Processor $tag                Placeholder open tag.
     * @param array                  $yt                 parse_youtube_url() result.
     * @param callable               $is_true            Attribute flag reader.
     * @param bool                   $needs_icon_runtime Set for an icon-library play icon.
     * @return string
     */
    private function youtube_player( $tag, $yt, $is_true, &$needs_icon_runtime )
    {
        $autoplay = $is_true( 'data-playing' );
        $muted    = $is_true( 'data-muted' );
        $light    = $tag->get_attribute( 'data-light' );
        $overlay  = $is_true( 'data-overlay' ) && is_string( $light ) && '' !== $light && 'false' !== $light;

        // Parameters react-player passes (playerVars: playsinline, modestbranding,
        // origin) plus the block's own settings.
        $params = [
            'autoplay'       => 1,
            'mute'           => $muted ? 1 : 0,
            'controls'       => $is_true( 'data-controls' ) ? 1 : 0,
            'playsinline'    => 1,
            'modestbranding' => 1
         ];
        if ( $is_true( 'data-loop' ) ) {
            $params[ 'loop' ]     = 1;
            $params[ 'playlist' ] = $yt[ 'id' ];
        }
        if ( $yt[ 'start' ] > 0 ) {
            $params[ 'start' ] = $yt[ 'start' ];
        }
        if ( '' !== $yt[ 'list' ] ) {
            $params[ 'list' ] = $yt[ 'list' ];
        }
        // Embed from the privacy-enhanced host, so YouTube sets no cookies
        // until the visitor plays the video. A saved youtube-nocookie.com URL
        // always keeps it; for any other URL a site can opt out with the
        // filter (return false) to get the www.youtube.com player back.
        $nocookie = ! empty( $yt[ 'nocookie' ] ) || (bool) apply_filters( 'eb_advanced_video_youtube_nocookie', true, $yt[ 'id' ] );
        $host     = $nocookie ? 'https://www.youtube-nocookie.com' : 'https://www.youtube.com';
        $embed = add_query_arg( $params, $host . '/embed/' . $yt[ 'id' ] );

        $tag->set_attribute( 'data-eb-native', '1' );
        $tag->set_attribute( 'data-eb-provider', 'youtube' );
        $tag->set_attribute( 'data-eb-embed', esc_url_raw( $embed ) );
        // An image overlay is a click-to-play preview in react-player (`light`),
        // whatever the autoplay setting; without one an autoplaying player
        // starts on its own once near the screen.
        if ( $autoplay && ! $overlay ) {
            $tag->set_attribute( 'data-eb-lazy-autoplay', 'true' );
        }

        $thumb = $overlay ? $light : 'https://i.ytimg.com/vi/' . $yt[ 'id' ] . '/hqdefault.jpg';

        $icon = '';
        if ( $overlay && 'true' === $tag->get_attribute( 'data-customPlayIcon' ) ) {
            $type = $tag->get_attribute( 'data-customPlayIconType' );
            if ( 'image' === $type ) {
                $src  = $tag->get_attribute( 'data-playicon' );
                $icon = is_string( $src ) && '' !== $src ? '<img src="' . esc_url( $src ) . '" alt="" />' : '';
            } elseif ( 'icon' === $type ) {
                $lib                = $tag->get_attribute( 'data-customPlayIconLib' );
                $icon               = '<span data-eb-play-icon="' . esc_attr( is_string( $lib ) ? $lib : '' ) . '"></span>';
                $needs_icon_runtime = true;
            }
        }
        if ( '' === $icon ) {
            // YouTube-style play button.
            $icon = '<svg width="68" height="48" viewBox="0 0 68 48" aria-hidden="true" focusable="false"><path d="M66.5 7.7c-.8-2.9-3-5.2-5.9-6C55.3.3 34 .3 34 .3s-21.3 0-26.6 1.4c-2.9.8-5.1 3.1-5.9 6C.1 13 .1 24 .1 24s0 11 1.4 16.3c.8 2.9 3 5.2 5.9 6C12.7 47.7 34 47.7 34 47.7s21.3 0 26.6-1.4c2.9-.8 5.1-3.1 5.9-6C67.9 35 67.9 24 67.9 24s0-11-1.4-16.3z" fill="#f00"/><path d="M45 24 27 14v20z" fill="#fff"/></svg>';
        }

        return '<div class="eb-react-player" style="aspect-ratio: 16 / 9; width: 100%; height: auto; position: relative; background: #000;">'
            . '<button type="button" class="eb-av-yt-facade" aria-label="' . esc_attr__( 'Play video', 'essential-blocks' ) . '" style="all: unset; position: absolute; inset: 0; cursor: pointer; display: flex; align-items: center; justify-content: center;">'
            . '<img src="' . esc_url( $thumb ) . '" alt="" loading="lazy" decoding="async" style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover;" />'
            . '<span class="eb-av-yt-play" style="position: relative; display: flex;">' . $icon . '</span>'
            . '</button>'
            . '</div>';
    }

    /**
     * react-player's light-mode preview (Preview.js), inline styles included.
     *
     * @param \WP_HTML_Tag_Processor $tag                The placeholder's open tag.
     * @param string                 $image              Preview image URL.
     * @param bool                   $needs_icon_runtime Set to true for an icon-library play icon.
     * @return string
     */
    private function native_preview( $tag, $image, &$needs_icon_runtime )
    {
        $icon = '';
        if ( 'true' === $tag->get_attribute( 'data-customPlayIcon' ) ) {
            $type = $tag->get_attribute( 'data-customPlayIconType' );
            if ( 'image' === $type ) {
                $src  = $tag->get_attribute( 'data-playicon' );
                $icon = is_string( $src ) && '' !== $src ? '<img src="' . esc_url( $src ) . '" />' : '<img />';
            } elseif ( 'icon' === $type ) {
                $lib                = $tag->get_attribute( 'data-customPlayIconLib' );
                $icon               = '<span data-eb-play-icon="' . esc_attr( is_string( $lib ) ? $lib : '' ) . '"></span>';
                $needs_icon_runtime = true;
            }
        }

        if ( '' === $icon ) {
            // react-player's default icon (ICON_SIZE 64px).
            $icon = '<div class="react-player__shadow" style="background: radial-gradient(rgb(0, 0, 0, 0.3), rgba(0, 0, 0, 0) 60%); border-radius: 64px; width: 64px; height: 64px; display: flex; align-items: center; justify-content: center;">'
                . '<div class="react-player__play-icon" style="border-style: solid; border-width: 16px 0px 16px 26px; border-color: transparent transparent transparent white; margin-left: 7px;"></div>'
                . '</div>';
        }

        $style = 'width: 100%; height: 100%; background-image: url(' . esc_url( $image ) . '); background-size: cover; background-position: center; cursor: pointer; display: flex; align-items: center; justify-content: center;';

        return '<div class="react-player__preview" tabindex="0" style="' . esc_attr( $style ) . '">' . $icon . '</div>';
    }

    /**
     * React path: react-player plus only the streaming adapter the URL needs.
     *
     * @param string $content Saved block markup.
     * @return void
     */
    private function enqueue_react_player( $content )
    {
        if ( preg_match( '/\bdata-url="([^"]*)"/', $content, $match ) ) {
            $url = html_entity_decode( $match[ 1 ], ENT_QUOTES );
            foreach ( self::STREAMING_ADAPTERS as $handle => $pattern ) {
                if ( preg_match( $pattern, $url ) ) {
                    wp_enqueue_script( 'essential-blocks-' . $handle );
                }
            }
        }
        wp_enqueue_script( 'essential-blocks-advanced-video-frontend' );
    }

    /**
     * Size (and poster) of a media-library video.
     *
     * Looked up by URL, and also by the path under `uploads/` so a file served
     * from a CDN or offload host (same key, different domain) still resolves.
     * The `eb_advanced_video_dimensions` filter can supply a size for anything
     * else.
     *
     * @param string $url Video URL.
     * @return array|null [ 'width' => int, 'height' => int, 'poster' => string ], or null when the size is unknown.
     */
    private static function video_media( $url )
    {
        $url = strtok( $url, '?#' );
        $key = 'eb_av_media_' . md5( $url );
        $hit = wp_cache_get( $key, 'essential-blocks' );
        if ( false === $hit ) {
            $hit = '';
            $id  = self::video_attachment_id( $url );
            if ( $id ) {
                $meta = wp_get_attachment_metadata( $id );
                if ( ! empty( $meta[ 'width' ] ) && ! empty( $meta[ 'height' ] ) ) {
                    $thumb = get_post_thumbnail_id( $id );
                    $hit   = [
                        'width'  => (int) $meta[ 'width' ],
                        'height' => (int) $meta[ 'height' ],
                        'poster' => $thumb ? (string) wp_get_attachment_image_url( $thumb, 'large' ) : ''
                     ];
                }
            }
            wp_cache_set( $key, $hit, 'essential-blocks', HOUR_IN_SECONDS );
        }

        /**
         * Filters the size of a self-hosted Advanced Video file.
         *
         * Return [ 'width' => int, 'height' => int, 'poster' => string ] to
         * reserve the real shape for a file the media-library lookup can't
         * resolve, or null to leave it unknown.
         *
         * @param array|null $media Resolved size, or null.
         * @param string     $url   Video URL without query string or fragment.
         */
        $media = apply_filters( 'eb_advanced_video_dimensions', is_array( $hit ) ? $hit : null, $url );

        if ( ! is_array( $media ) || empty( $media[ 'width' ] ) || empty( $media[ 'height' ] ) ) {
            return null;
        }
        return [
            'width'  => (int) $media[ 'width' ],
            'height' => (int) $media[ 'height' ],
            'poster' => isset( $media[ 'poster' ] ) ? (string) $media[ 'poster' ] : ''
         ];
    }

    /**
     * Attachment ID for a video URL, or 0.
     *
     * attachment_url_to_postid() only matches this site's uploads URL. For a
     * URL on another host (CDN, S3 / offload plugins), match the part after
     * `/uploads/` against `_wp_attached_file` instead.
     *
     * @param string $url Video URL without query string or fragment.
     * @return int
     */
    private static function video_attachment_id( $url )
    {
        $id = attachment_url_to_postid( $url );
        if ( $id ) {
            return (int) $id;
        }

        $path = (string) wp_parse_url( $url, PHP_URL_PATH );
        $pos  = strpos( $path, '/uploads/' );
        if ( false === $pos ) {
            return 0;
        }
        $file = ltrim( substr( $path, $pos + strlen( '/uploads/' ) ), '/' );
        if ( '' === $file ) {
            return 0;
        }

        global $wpdb;
        return (int) $wpdb->get_var( $wpdb->prepare(
            "SELECT post_id FROM {$wpdb->postmeta} WHERE meta_key = '_wp_attached_file' AND meta_value = %s LIMIT 1",
            rawurldecode( $file )
        ) );
    }

    /**
     * Build an escaped attribute string; `true` renders a boolean attribute.
     *
     * @param array $attributes Name => value.
     * @return string
     */
    private static function html_attributes( $attributes )
    {
        $html = '';
        foreach ( $attributes as $name => $value ) {
            $html .= true === $value
                ? ' ' . esc_attr( $name )
                : sprintf( ' %s="%s"', esc_attr( $name ), esc_attr( $value ) );
        }
        return $html;
    }
}
