<?php
namespace EssentialBlocks\Core;

use EssentialBlocks\Traits\HasSingletone;
use EssentialBlocks\Utils\CSSParser;

/**
 * Preload the background image of a page's first Essential Blocks section.
 *
 * A hero Wrapper/Row/Container background is set in the per-page generated
 * CSS, so the browser only discovers it after every render-blocking
 * stylesheet has arrived — and it is usually the page's LCP element. On
 * essential-blocks.com that put 3.4–5.4 s of "load delay" in front of the
 * LCP on most pages. Emitting a preload from the saved block attributes lets
 * the image download alongside the CSS instead of after it.
 */
class HeroPreload
{
    use HasSingletone;

    /**
     * Upper bound on block openers inspected, in document order. The hero is
     * the first top-level Essential Blocks section and the search never leaves
     * it; the cap only bounds the work on an unusually deep hero.
     */
    const MAX_BLOCKS = 40;

    /**
     * Leading top-level blocks from other plugins or core (spacers, notices,
     * shortcodes) skipped before the hero.
     */
    const MAX_LEADING_BLOCKS = 3;

    /**
     * Leading non-EB blocks that are a hero themselves. When one comes first,
     * the Essential Blocks section after it is below the fold, so nothing is
     * preloaded (its image would compete with the real LCP).
     */
    const LEADING_MEDIA_BLOCKS = [ 'core/cover', 'core/image', 'core/gallery', 'core/media-text', 'core/video', 'core/embed', 'core/post-featured-image' ];

    public function __construct()
    {
        add_action( 'wp_head', [ $this, 'print_preload' ], 2 );
    }

    public function print_preload()
    {
        if ( is_admin() || ! is_singular() ) {
            return;
        }

        $post = get_queried_object();
        if ( ! $post instanceof \WP_Post || post_password_required( $post ) ) {
            return;
        }

        /**
         * Filter the hero background preloads for a post.
         *
         * @param array[]  $images [ [ 'url' => string, 'media' => string ], … ]; return [] to disable.
         * @param \WP_Post $post   Post being displayed.
         */
        $images = apply_filters( 'eb_hero_background_preloads', self::hero_images( (string) $post->post_content ), $post );

        foreach ( (array) $images as $image ) {
            if ( empty( $image[ 'url' ] ) ) {
                continue;
            }
            printf(
                '<link rel="preload" as="image" href="%s" fetchpriority="high"%s />' . "\n",
                esc_url( $image[ 'url' ] ),
                empty( $image[ 'media' ] ) ? '' : ' media="' . esc_attr( $image[ 'media' ] ) . '"'
            );
        }
    }

    /**
     * Background image(s) of the hero: the first top-level Essential Blocks
     * block, searched through all of its nested blocks in document order.
     *
     * The image is often on a nested block rather than the outer section,
     * e.g. Wrapper > Row > Column > Wrapper with the decorative background on
     * the right-hand column. Blocks after the hero are never considered, so a
     * below-the-fold background is not preloaded.
     *
     * Reads block comment delimiters only (no parse_blocks() over the whole
     * post). Only "classic" (image) backgrounds count — gradients have no
     * image, and hover/overlay images are not what paints first.
     *
     * @param string $content Post content.
     * @return array[] [ [ 'url' => string, 'media' => string ], … ]
     */
    public static function hero_images( $content )
    {
        if ( '' === $content || false === strpos( $content, 'bgImageURL' ) ) {
            return [];
        }

        $offset    = 0;
        $depth     = 0;
        $in_hero   = false;
        $hero_base = 0; // Depth the hero block itself was opened at.
        $leading   = 0;
        for ( $i = 0; $i < self::MAX_BLOCKS; ) {
            // Block attribute JSON never contains "-->" (the serializer escapes "--").
            // Core blocks are serialized without a namespace (`wp:paragraph`),
            // so the namespace is optional; otherwise they would be invisible
            // here and a core hero (Cover, Group, …) would let the EB section
            // below it be taken for the hero.
            if ( ! preg_match( '/<!--\s+(\/)?wp:((?:[a-z0-9-]+\/)?[a-z0-9-]+)(\s+(\{.*?\}))?\s+(\/)?-->/s', $content, $m, PREG_OFFSET_CAPTURE, $offset ) ) {
                break;
            }
            $offset = $m[ 0 ][ 1 ] + strlen( $m[ 0 ][ 0 ] );

            $name           = false === strpos( $m[ 2 ][ 0 ], '/' ) ? 'core/' . $m[ 2 ][ 0 ] : $m[ 2 ][ 0 ];
            $is_closer      = ! empty( $m[ 1 ][ 0 ] );
            $is_self_closed = isset( $m[ 5 ] ) && '/' === $m[ 5 ][ 0 ];
            $is_eb          = 0 === strpos( $name, 'essential-blocks/' );

            if ( $is_closer ) {
                $depth--;
                if ( $in_hero && $depth === $hero_base ) {
                    break; // The hero section closed.
                }
                continue;
            }

            $i++;
            if ( ! $in_hero ) {
                if ( $is_eb ) {
                    // First EB block: at the top level, or as the first child
                    // of a leading wrapper (a theme or user Group around the
                    // content) — either way this is the hero.
                    $in_hero   = true;
                    $hero_base = $depth;
                } elseif ( 0 === $depth ) {
                    // A leading non-EB top-level block. Small ones (spacer,
                    // notice, shortcode) are skipped; a media block is a hero
                    // itself, so the EB section after it is below the fold.
                    if ( ++$leading > self::MAX_LEADING_BLOCKS || in_array( $name, self::LEADING_MEDIA_BLOCKS, true ) ) {
                        break;
                    }
                    if ( ! $is_self_closed ) {
                        $depth++;
                    }
                    continue;
                } else {
                    // A leading block whose first child is not an EB block
                    // (heading, paragraph, cover…) is a section of its own.
                    break;
                }
            }

            if ( ! $is_self_closed ) {
                $depth++;
            }

            if ( $is_eb && ! empty( $m[ 4 ][ 0 ] ) ) {
                $attrs = json_decode( $m[ 4 ][ 0 ], true );
                if ( is_array( $attrs ) ) {
                    $images = self::images_from_attributes( $attrs );
                    if ( $images ) {
                        return $images;
                    }
                }
            }

            if ( $is_self_closed && $depth === $hero_base ) {
                break; // A self-closing hero without a background.
            }
        }

        return [];
    }

    /**
     * @param array $attrs Block attributes.
     * @return array[]
     */
    private static function images_from_attributes( array $attrs )
    {
        foreach ( $attrs as $key => $url ) {
            // `{control}bgImageURL` only (control names may contain `_`, e.g.
            // Row's `wrpBg_`): not hover (`hov_…`), overlay
            // (`…ovl_bgImageURL`) or the responsive variants handled below.
            if ( ! is_string( $url ) || '' === $url || ! preg_match( '/^(?!hov_|TAB|MOB)([A-Za-z][A-Za-z_]*?)bgImageURL$/', $key, $km ) || false !== strpos( $key, 'ovl_' ) ) {
                continue;
            }
            $control = $km[ 1 ];
            $type    = isset( $attrs[ $control . 'backgroundType' ] ) ? $attrs[ $control . 'backgroundType' ] : 'classic';
            if ( 'classic' !== $type ) {
                continue;
            }

            $tab = isset( $attrs[ 'TAB' . $control . 'bgImageURL' ] ) && is_string( $attrs[ 'TAB' . $control . 'bgImageURL' ] ) ? $attrs[ 'TAB' . $control . 'bgImageURL' ] : '';
            $mob = isset( $attrs[ 'MOB' . $control . 'bgImageURL' ] ) && is_string( $attrs[ 'MOB' . $control . 'bgImageURL' ] ) ? $attrs[ 'MOB' . $control . 'bgImageURL' ] : '';

            if ( '' === $tab && '' === $mob ) {
                return [ [ 'url' => $url, 'media' => '' ] ];
            }

            // Responsive images inherit upward, like the generated CSS:
            // mobile falls back to tablet, tablet to desktop.
            $tablet_bp = (int) CSSParser::get_responsive_breakpoints( 'tablet' );
            $mobile_bp = (int) CSSParser::get_responsive_breakpoints( 'mobile' );
            $tab       = '' !== $tab ? $tab : $url;
            $mob       = '' !== $mob ? $mob : $tab;

            return [
                [ 'url' => $url, 'media' => sprintf( '(min-width: %dpx)', $tablet_bp + 1 ) ],
                [ 'url' => $tab, 'media' => sprintf( '(min-width: %dpx) and (max-width: %dpx)', $mobile_bp + 1, $tablet_bp ) ],
                [ 'url' => $mob, 'media' => sprintf( '(max-width: %dpx)', $mobile_bp ) ]
             ];
        }

        return [];
    }
}
