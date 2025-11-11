<?php
namespace EssentialBlocks\Utils;

use EssentialBlocks\Traits\HasSingletone;

defined('ABSPATH') || exit;

/**
 * Liquid Glass Effect Global SVG Renderer
 * Handles rendering SVG filters for all Essential Blocks (including dynamic blocks)
 * when liquid glass effect is enabled
 */
class LiquidGlassRenderer
{
    use HasSingletone;

    /**
     * Track if SVG has been rendered on current page to avoid duplicates
     */
    protected static $svg_rendered = false;

    /**
     * Constructor
     */
    public function __construct()
    {
        // Always add filter for liquid glass support
        add_filter('render_block', [$this, 'add_liquid_glass_svg'], 10, 2);
        add_action('wp_head', [__CLASS__, 'reset_svg_flag'], 1);
    }

    /**
     * Add liquid glass SVG filters to Essential Blocks when needed
     *
     * @param string $block_content The block content.
     * @param array  $block         The full block, including name and attributes.
     * @return string
     */
    public function add_liquid_glass_svg($block_content, $block)
    {
        // Only process Essential Blocks
        if (!isset($block['blockName']) || strpos($block['blockName'], 'essential-blocks/') !== 0) {
            return $block_content;
        }

        // Skip in admin or REST requests
        if (is_admin() || (defined('REST_REQUEST') && REST_REQUEST)) {
            return $block_content;
        }

        // Check if block has liquid glass attributes
        if (!isset($block['attrs']['liquidGlass'])) {
            return $block_content;
        }

        $liquid_glass = $block['attrs']['liquidGlass'];

        // Check if liquid glass is enabled
        if (!empty($liquid_glass['enable'])) {
            // Add CSS classes to block content if not already present
            $block_content = $this->add_liquid_glass_classes($block_content, $liquid_glass, $block['attrs']);

            // Allow pro plugin to inject SVG content for advanced effects
            $block_content = apply_filters(
                'eb_liquid_glass_inject_svg',
                $block_content,
                $liquid_glass,
                $block['attrs'],
                self::$svg_rendered
            );

            // Check if SVG was rendered by pro plugin
            $svg_was_rendered = apply_filters('eb_liquid_glass_svg_rendered', false, $liquid_glass);
            if ($svg_was_rendered) {
                self::$svg_rendered = true;
            }
        }

        return $block_content;
    }

    /**
     * Add liquid glass CSS classes to block content
     *
     * @param string $block_content The block content
     * @param array $liquid_glass Liquid glass attributes
     * @param array $attributes All block attributes
     * @return string Modified block content
     */
    private function add_liquid_glass_classes($block_content, $liquid_glass, $attributes)
    {
        // Generate liquid glass classes
        $classes = [];

        if (!empty($liquid_glass['effect'])) {
            $classes[] = 'eb_liquid_glass-' . $liquid_glass['effect'];
        }

        if (!empty($liquid_glass['shadowEffect'])) {
            $classes[] = 'eb_liquid_glass_shadow-' . $liquid_glass['shadowEffect'];
        }

        if (empty($classes)) {
            return $block_content;
        }

        $class_string = implode(' ', $classes);

        // Find the root wrapper div and add classes if not already present
        if (isset($attributes['blockId'])) {
            $block_id = $attributes['blockId'];
            $root_pattern = '/(<div[^>]*class="[^"]*root-' . preg_quote($block_id, '/') . '[^"]*"[^>]*>)/';

            if (preg_match($root_pattern, $block_content, $matches)) {
                $existing_div = $matches[1];

                // Check if liquid glass classes are already present
                if (strpos($existing_div, 'eb_liquid_glass-') === false) {
                    // Add the classes to the existing class attribute
                    $new_div = preg_replace(
                        '/class="([^"]*)"/',
                        'class="$1 ' . esc_attr($class_string) . '"',
                        $existing_div
                    );

                    $block_content = str_replace($existing_div, $new_div, $block_content);
                }
            }
        }

        return $block_content;
    }

    /**
     * Reset SVG rendered flag for new page loads
     * Called on wp_head to ensure fresh state for each page
     */
    public static function reset_svg_flag()
    {
        self::$svg_rendered = false;
    }
}
