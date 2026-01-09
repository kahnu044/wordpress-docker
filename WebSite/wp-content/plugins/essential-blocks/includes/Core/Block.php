<?php

namespace EssentialBlocks\Core;

use Error;
use EssentialBlocks\Traits\HasSingletone;

/**
 * Description
 *
 * @method string render_callback($attributes, $content)
 * @property-read mixed $attributes
 *
 * @since 1.0.0
 * @package PackageName
 */
abstract class Block
{
    use HasSingletone;

    /**
     * Enqueue
     *
     * @var \EssentialBlocks\Utils\Enqueue
     */
    protected $assets_manager = null;
    protected $dir            = '';
    protected $is_pro         = false;

    protected $editor_scripts   = [];
    protected $editor_styles    = [];
    protected $animation_script = 'essential-blocks-eb-animation';
    protected $animation_style  = 'essential-blocks-animation';
    protected $liquid_glass_style  = 'essential-blocks-liquid-glass';

    protected $frontend_styles  = [];
    protected $frontend_scripts = [];

    /**
     * unique name of block
     *
     * @return string
     */
    abstract public function get_name();

    /**
     * Block can be enabled or not.
     *
     * Override if needed.
     *
     * @return bool
     */
    public function can_enable()
    {
        return true;
    }

    public function get_block_path($name, $wp_version_check = false)
    {
        $path = ESSENTIAL_BLOCKS_BLOCK_DIR . $name;

        if ($wp_version_check && ESSENTIAL_BLOCKS_WP_VERSION < 5.8) {
            $path = 'essential-blocks/' . $name;
        }

        return apply_filters('essential_blocks_block_path', $path, $this->is_pro, $name, $wp_version_check);
    }

    public function path($name = '')
    {
        if (empty($name)) {
            $name = $this->get_name();
        }

        return $this->get_block_path($name);
    }

    public function register_block_type($name, ...$args)
    {
        if (empty($name)) {
            $name = $this->get_name();
        }

        return register_block_type($this->get_block_path($name, true), ...$args);
    }

    public function load_frontend_styles()
    {
        // Enqueue Animation
        wp_enqueue_style($this->animation_style);
        wp_enqueue_style($this->liquid_glass_style);

        $frontend_styles = $this->frontend_styles;

        if (empty($frontend_styles)) {
            return;
        }

        foreach ($frontend_styles as $handle) {
            wp_enqueue_style($handle);
        }
    }

    public function load_frontend_scripts()
    {
        wp_enqueue_script($this->animation_script);

        if (empty($this->frontend_scripts)) {
            return;
        }

        foreach ($this->frontend_scripts as $handle) {
            wp_enqueue_script($handle);
        }
    }

    public function load_scripts()
    {

        $this->frontend_styles  = apply_filters("eb_frontend_styles/{$this->get_name()}", $this->frontend_styles);
        $this->frontend_scripts = apply_filters("eb_frontend_scripts/{$this->get_name()}", $this->frontend_scripts);

        $this->load_frontend_styles();
        $this->load_frontend_scripts();
    }

    /**
     * Replace EBDisplayIconSave placeholders (eb-display-icon-svg) with sanitized inline SVG via regex.
     * This runs only on frontend (not in admin).
     */
    private function inline_svg_icons_via_regex($content)
    {
        if (is_admin() || empty($content)) {
            return $content;
        }
        if (strpos($content, 'eb-display-icon-svg') === false || strpos($content, 'data-svg-url') === false) {
            return $content;
        }

        $pattern = '~<span\b(?=[^>]*\bclass=(["\"]) (?:(?!\\1).)*?\beb-display-icon-svg\b (?:(?!\\1).)*?\\1)(?=[^>]*\bdata-svg-url=(["\"])(.*?)\\2)[^>]*\s*/?>\s*(?:</span>)?~xis';

        $content = preg_replace_callback($pattern, function ($m) {
            $url = isset($m[3]) ? esc_url_raw($m[3]) : '';
            if (empty($url)) {
                return $m[0];
            }
            $path = parse_url($url, PHP_URL_PATH);
            if (! $path || ! preg_match('/\.svg($|[?#])/i', $path)) {
                return $m[0];
            }

            $cache_key = 'eb_svg_' . md5($url);
            $svg = get_transient($cache_key);

            if ($svg === false) {
                $svg = '';
                $res = wp_remote_get($url, [
                    'timeout' => 5,
                    'redirection' => 3,
                    'headers' => [ 'Accept' => 'image/svg+xml,text/plain,*/*' ],
                    'reject_unsafe_urls' => true,
                ]);
                if (! is_wp_error($res) && (int) wp_remote_retrieve_response_code($res) === 200) {
                    $raw = (string) wp_remote_retrieve_body($res);
                    if (preg_match('/<svg[\s\S]*?<\/svg>/i', $raw, $mm)) {
                        $raw = $mm[0];
                    }
                    $sanitized = \EssentialBlocks\Utils\SvgSanitizer::get_instance()->sanitize($raw);
                    if (! empty($sanitized)) {
                        $svg = $sanitized;
                    }
                }
                set_transient($cache_key, $svg, HOUR_IN_SECONDS * 6);
            }

            // Extract optional data-class-name from the placeholder span and add it to the root <svg>
            if (! empty($svg)) {
                $classAttr = '';
                if (preg_match('/\bdata-class-name=(["\'])(.*?)\1/i', $m[0], $mc)) {
                    $classAttr = trim($mc[2]);
                }
                if ($classAttr !== '') {
                    $classes = preg_split('/\s+/', $classAttr);
                    $classes = array_filter(array_map('sanitize_html_class', (array) $classes));
                    if (! empty($classes)) {
                        $svg = preg_replace_callback('/<svg\b([^>]*)>/i', function ($m2) use ($classes) {
                            $before = $m2[1];
                            if (preg_match('/\sclass=(["\'])(.*?)\1/i', $before, $m3)) {
                                $final = implode(' ', $classes);
                                $new_before = preg_replace('/\sclass=(["\'])(.*?)\1/i', ' class=$1' . esc_attr($final) . '$1', $before, 1);
                                return '<svg' . $new_before . '>';
                            } else {
                                $final = implode(' ', $classes);
                                return '<svg' . $before . ' class="' . esc_attr($final) . '">';
                            }
                        }, $svg, 1);
                    }
                }
            }

            return $svg ?: $m[0];
        }, $content);

        return $content;
    }


    /**
     * Function to handle conditional display logic for the block.
     */
    private function should_display_block($attributes)
    {
        // Skip logic check in admin area
        if (is_admin()) {
            return true;
        }

        // Apply a filter to determine whether the block should be displayed or hidden.
        return apply_filters('eb_conditional_display_results', $attributes) !== false;
    }

    public function register($assets_manager)
    {
        $this->assets_manager = $assets_manager;

        $_args = [];

        if (method_exists($this, 'register_scripts')) {
            $this->register_scripts();
        }

        $_args['render_callback'] = function ($attributes, $content, $block = null) {
            if (!$this->should_display_block($attributes)) {
                return ''; // Stop execution and return empty content
            }

            // Fire action to notify Pro plugin about block detection
            do_action('eb_detect_block_on_page', $this->get_name(), $attributes, $block);

            // Inline SVG placeholders before returning content
            $content = $this->inline_svg_icons_via_regex($content);

            return $content;
        };

        if (method_exists($this, 'render_callback')) {
            $_args['render_callback'] = function ($attributes, $content, $block = null) {
                if (!is_admin()) {
                    $this->load_scripts();
                }
                if (!is_admin()) {

                    if (!$this->should_display_block($attributes)) {
                        return ''; // Stop execution and return empty content
                    }

                    $this->load_scripts();
                }

                // Fire action to notify Pro plugin about block detection
                do_action('eb_detect_block_on_page', $this->get_name(), $attributes, $block);

                // Inline SVG placeholders before returning content
                $content = $this->inline_svg_icons_via_regex($content);

                return $this->render_callback($attributes, $content, $block);
            };
        }

        if ((!empty($this->frontend_scripts) || !empty($this->frontend_styles)) && ! method_exists($this, 'render_callback')) {
            $_args['render_callback'] = function ($attributes, $content, $block = null) {
                if (!is_admin()) {


                    if (!$this->should_display_block($attributes)) {
                        return ''; // Stop execution and return empty content
                    }

                    $this->load_scripts();
                }

                // Fire action to notify Pro plugin about block detection
                do_action('eb_detect_block_on_page', $this->get_name(), $attributes, $block);

                // Inline SVG placeholders before returning content
                $content = $this->inline_svg_icons_via_regex($content);
                return $content;
            };
        }

        $_args['editor_script'] = array_merge(
            is_array($this->editor_scripts) ? $this->editor_scripts : [$this->editor_scripts],
            [$this->animation_script],
            ['essential-blocks-editor-script']
        );
        $_args['editor_style'] = array_merge(
            is_array($this->editor_styles) ? $this->editor_styles : [$this->editor_styles],
            [$this->animation_style],
            ['essential-blocks-editor-css']
        );

        if (property_exists($this, 'attributes')) {
            $_args['attributes'] = $this->attributes;
        }

        return $this->register_block_type($this->get_name(), $_args);
    }
}
