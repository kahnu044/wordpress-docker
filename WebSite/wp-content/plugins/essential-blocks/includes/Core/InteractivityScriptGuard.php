<?php
namespace EssentialBlocks\Core;

use EssentialBlocks\Traits\HasSingletone;

/**
 * Keeps JS optimization tools away from WordPress core's Interactivity API tags.
 *
 * The Advanced Navigation block wraps core/navigation, whose hamburger is driven by
 * the `@wordpress/block-library/navigation/view` script module and the
 * `@wordpress/interactivity` runtime it imports. The browser can only resolve that
 * import while `<script type="importmap" id="wp-importmap">` exists and precedes the
 * `<script type="module">` tags. Caching/optimization layers that combine, move,
 * defer or delay those tags cause `Failed to resolve module specifier
 * "@wordpress/interactivity"` and a dead hamburger on live sites, while the same
 * page works locally without them.
 *
 * Core prints the import map and module tags through wp_print_inline_script_tag()
 * and wp_print_script_tag(), so they only pass through `wp_inline_script_attributes`
 * and `wp_script_attributes`. `script_loader_tag` never sees them; it is used here
 * only for the classic `wp-interactivity` handle of WordPress < 6.5.
 *
 * Limitation: these attributes are hints. "Combine JS" or aggressive "Delay JS"
 * modes that ignore them still need manual exclusions in the optimization plugin.
 */
class InteractivityScriptGuard
{
    use HasSingletone;

    /**
     * Set once an Advanced Navigation block renders on the current request.
     *
     * @var bool
     */
    private $has_advanced_navigation = false;

    /**
     * Opt-out attributes, in output order. Prepended to the tag's own attributes
     * because Rocket Loader only honours `data-cfasync` when it comes before `src`.
     *
     * @var array
     */
    private $opt_out_attributes = [
        'data-cfasync'     => 'false', // Cloudflare Rocket Loader.
        'data-no-optimize' => '1', // LiteSpeed Cache: skip combine/minify/defer/delay.
        'data-no-defer'    => '1', // LiteSpeed Cache: skip defer.
        'data-no-minify'   => '1', // WP Rocket: skip minify/combine.
        'nowprocket'       => true, // WP Rocket: skip "Delay JavaScript execution".
    ];

    public function __construct()
    {
        if ( is_admin() ) {
            return;
        }

        // Fired from every EB block's render_callback (Core\Block::register()), so it
        // also catches navs in template parts, widgets and synced patterns that
        // has_block() on the post content would miss. Blocks render before the import
        // map prints (wp_head in block themes, wp_footer in classic themes).
        add_action( 'eb_detect_block_on_page', [ $this, 'detect_advanced_navigation' ] );

        add_filter( 'wp_inline_script_attributes', [ $this, 'filter_import_map_attributes' ] );
        add_filter( 'wp_script_attributes', [ $this, 'filter_script_module_attributes' ] );
        add_filter( 'script_loader_tag', [ $this, 'filter_classic_interactivity_tag' ], 10, 2 );
    }

    /**
     * @param string $block_name EB block name without the `essential-blocks/` prefix.
     *
     * @return void
     */
    public function detect_advanced_navigation( $block_name )
    {
        if ( 'advanced-navigation' === $block_name ) {
            $this->has_advanced_navigation = true;
        }
    }

    /**
     * Import map: `<script type="importmap" id="wp-importmap">` (WordPress 6.5+).
     *
     * @param array $attributes
     *
     * @return array
     */
    public function filter_import_map_attributes( $attributes )
    {
        if ( ! $this->has_advanced_navigation || ! is_array( $attributes ) ) {
            return $attributes;
        }

        if ( isset( $attributes[ 'id' ] ) && 'wp-importmap' === $attributes[ 'id' ] ) {
            return array_merge( $this->opt_out_attributes, $attributes );
        }

        return $attributes;
    }

    /**
     * Core `<script type="module">` tags (WordPress 6.5+). Matched by the core
     * script-modules directory, or by `@wordpress/` module ID so the same modules
     * served from the Gutenberg plugin are covered too.
     *
     * @param array $attributes
     *
     * @return array
     */
    public function filter_script_module_attributes( $attributes )
    {
        if ( ! $this->has_advanced_navigation || ! is_array( $attributes ) ) {
            return $attributes;
        }

        if ( ! isset( $attributes[ 'type' ] ) || 'module' !== $attributes[ 'type' ] ) {
            return $attributes;
        }

        $src = isset( $attributes[ 'src' ] ) ? (string) $attributes[ 'src' ] : '';
        $id  = isset( $attributes[ 'id' ] ) ? (string) $attributes[ 'id' ] : '';

        if ( false !== strpos( $src, '/wp-includes/js/dist/script-modules/' ) || 0 === strpos( $id, '@wordpress/' ) ) {
            return array_merge( $this->opt_out_attributes, $attributes );
        }

        return $attributes;
    }

    /**
     * Classic `wp-interactivity` script (WordPress < 6.5).
     *
     * @param string $tag
     * @param string $handle
     *
     * @return string
     */
    public function filter_classic_interactivity_tag( $tag, $handle )
    {
        if ( ! $this->has_advanced_navigation || 'wp-interactivity' !== $handle ) {
            return $tag;
        }

        // Built by hand: wp_sanitize_script_attributes() is deprecated since WP 7.0.
        $attributes = '';
        foreach ( $this->opt_out_attributes as $name => $value ) {
            $attributes .= true === $value
                ? ' ' . esc_attr( $name )
                : sprintf( ' %s="%s"', esc_attr( $name ), esc_attr( $value ) );
        }

        return str_replace( '<script ', '<script' . $attributes . ' ', $tag );
    }
}
