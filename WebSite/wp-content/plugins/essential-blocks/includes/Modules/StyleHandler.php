<?php

namespace EssentialBlocks\Modules;

use EssentialBlocks\Integrations\AssetGeneration;
use EssentialBlocks\Utils\CSSParser;

final class StyleHandler {
    private static $instance;

    private $prefix = 'eb-style';
    private $style_dir;
    private $style_url;
    private $frontend_prefix = 'frontend';
    private $frontend_style_dir;
    private $frontend_style_url;
    private $fse_prefix = 'full-site-editor';
    private $fse_style_dir;
    private $fse_style_url;
    private $widget_style_filename;
    private $fse_template_ids = array();
    private $fse_page_template_id;
    private $block_names             = array();
    private $fse_block_names         = array();
    private $widget_block_names      = array();
    private $templately_template_ids = array();
    /**
     * Enqueue the frontend scripts, ensures we only do it once.
     *
     * @var boolean
     */
    public $is_main_script_loaded = false;

    /**
     * Holds block styles array
     *
     * @var array
     */
    public static $_block_styles = array();

    /**
     * store generatepress elements id
     */
    private $gp_ids = array();

    /**
     * store astra addon advanced hooks id
     */
    private $astra_hook_ids = array();

    public static function init() {
        if (null === self::$instance) {
            self::$instance = new self();
        }

        return self::$instance;
    }

    public function __construct() {
        $upload_dir = wp_upload_dir();

        $this->style_dir = $upload_dir['basedir'] . DIRECTORY_SEPARATOR . $this->prefix . DIRECTORY_SEPARATOR;
        $this->style_url = set_url_scheme($upload_dir['baseurl']) . '/' . $this->prefix . '/';

        $this->frontend_style_dir = $this->style_dir . $this->frontend_prefix . DIRECTORY_SEPARATOR;
        $this->frontend_style_url = $this->style_url . $this->frontend_prefix . '/';

        $this->fse_style_dir = $this->style_dir . $this->fse_prefix . DIRECTORY_SEPARATOR;
        $this->fse_style_url = $this->style_url . $this->fse_prefix . '/';

        add_filter('dynamic_sidebar_params', array($this, 'eb_widget_dynamic_sidebar_params'));

        add_action('save_post', array($this, 'on_save_post'), 10, 3);
        add_action('wp', array($this, 'generate_post_content'));

        add_action('eb_after_save_responsiveBreakpoints_settings', array($this, 'remove_frontend_assets'), 10, 1);
        add_action('eb_after_reset_responsiveBreakpoints_settings', array($this, 'remove_frontend_assets'), 10);
        add_filter('generate_element_post_id', array($this, 'get_generatepress_element'), 99);
        add_action('wp_footer', array($this, 'eb_add_widget_css_footer'));

        //Enqueue Styles based on Block theme or not
        add_action('wp_enqueue_scripts', array($this, 'enqueue_frontend_assets'));
        if (! is_admin()) {
            add_filter('render_block', array($this, 'load_frontend_scripts_conditionally'), 10, 2);
            // add_action('template_redirect', array($this, 'load_frontend_scripts_conditionally_head'));
        }

        //For Templately templates
        add_action('templately_printed_location', array($this, 'templately_templates'), 10, 3);

        // Hook into Astra Addon advanced hooks processing
        add_action('wp_enqueue_scripts', array($this, 'astra_advanced_hooks_css_generation'), 15);

        // Hook into Blocksy Theme content blocks processing
        add_action('blocksy:pro:content-blocks:pre-output', array($this, 'add_active_blocksy_block'));
    }

    /**
     * Capture active Blocksy content block IDs and generate/enqueue their CSS.
     * @param int $id
     */
    public function add_active_blocksy_block($id) {
        $id = absint($id);
        
        $element = get_post($id);
        if (!$element || 'ct_content_block' !== $element->post_type || empty($element->post_content)) {
            return;
        }

        $deps = apply_filters('eb_generated_css_frontend_deps', array());

        $parsed_content = parse_blocks($element->post_content);
        $blocksy_block_names = array();
        $eb_blocks = array();
        
        // Populate Blocksy block names
        CSSParser::eb_block_style_recursive($parsed_content, $eb_blocks, $blocksy_block_names);

        // 1. Generate & Enqueue Frontend (Static) CSS
        if (!empty($blocksy_block_names)) {
            $handle = $this->load_frontend_css_file($id, 'essential-blocks-frontend-style-blocksy-' . $id, $blocksy_block_names);
            if (! empty($handle)) {
                $deps[] = $handle;
            }
        }

        // 2. Generate & Enqueue Instance CSS
        $css_filepath = $this->style_dir . $this->get_eb_filename($id);
        if ($this->needs_regeneration($css_filepath)) {
            $this->write_css_from_content($parsed_content, $id, $element->post_type);
        }

        if (file_exists($css_filepath)) {
            wp_enqueue_style(
                'eb-block-style-' . $id,
                $this->style_url . $this->get_eb_filename($id),
                $deps,
                $this->file_version($css_filepath)
            );
        }
    }

    /**
     * Enqueue frontend css for post if have one
     * @return void
     * @since 1.0.2
     */
    public function enqueue_frontend_assets() {
        global $post;

        $deps = apply_filters('eb_generated_css_frontend_deps', array());

        //FSE Template Predefined Style Enqueue
        if (! empty($this->fse_page_template_id && is_int($this->fse_page_template_id))) {
            $this->load_frontend_css_file($this->fse_page_template_id, 'essential-blocks-fse-frontend-style', $this->fse_block_names);
        }

        //Page/Post Predefined Style Enqueue
        if (! empty($post) && ! empty($post->ID)) {
            $handle = $this->load_frontend_css_file($post->ID, 'essential-blocks-frontend-style', $this->block_names);
            if (! empty($handle)) {
                $deps[] = $handle;
            }

            //Page/Post Generated Style Enqueue
            if (file_exists($this->style_dir . $this->prefix . '-' . $post->ID . '.min.css')) {
                wp_enqueue_style('eb-block-style-' . $post->ID, $this->style_url . $this->prefix . '-' . $post->ID . '.min.css', $deps, $this->file_version($this->style_dir . $this->prefix . '-' . $post->ID . '.min.css'));
            }

            // Reusable block Style Enqueues
            $reusableIds         = get_post_meta($post->ID, '_eb_reusable_block_ids', true);
            $reusableIds         = ! empty($reusableIds) ? $reusableIds : array();
            $templateReusableIds = get_option('_eb_reusable_block_ids', array());
            $reusableIds         = array_unique(array_merge($reusableIds, $templateReusableIds));
            if (! empty($reusableIds)) {
                foreach ($reusableIds as $reusableId) {
                    if (file_exists($this->style_dir . 'reusable-blocks/eb-reusable-' . $reusableId . '.min.css')) {
                        wp_enqueue_style('eb-reusable-block-style-' . $reusableId, $this->style_url . 'reusable-blocks/eb-reusable-' . $reusableId . '.min.css', $deps, $this->file_version($this->style_dir . 'reusable-blocks/eb-reusable-' . $reusableId . '.min.css'));
                    }
                }
            }
        } else {
            if (! empty($this->block_names) && ! empty($this->templately_template_ids)) {
                foreach ($this->templately_template_ids as $template) {
                    $handle = $this->load_frontend_css_file($template, 'essential-blocks-frontend-style-' . $template, $this->block_names);
                    if (! empty($handle)) {
                        $deps[] = $handle;
                    }
                }
            }
        }

        // generatepress elements
        if (in_array('gp-premium/gp-premium.php', apply_filters('active_plugins', get_option('active_plugins')))) {
            $gp_elements = get_posts(array('post_type' => 'gp_elements'));
            if (is_array($gp_elements) && ! empty($gp_elements)) {
                foreach ($gp_elements as $element) {
                    if (file_exists($this->style_dir . $this->get_eb_filename($element->ID))) {
                        wp_enqueue_style('eb-block-style-' . $element->ID, $this->style_url . $this->get_eb_filename($element->ID), $deps, $this->file_version($this->style_dir . $this->get_eb_filename($element->ID)));
                    }
                }
            }
        }


        //Template Templates
        if (is_array($this->templately_template_ids) && count($this->templately_template_ids) > 0) {
            foreach ($this->templately_template_ids as $template) {
                if (file_exists($this->style_dir . $this->get_eb_filename($template))) {
                    wp_enqueue_style(
                        'eb-block-style-' . $template,
                        $this->style_url . $this->get_eb_filename($template),
                        $deps,
                        $this->file_version($this->style_dir . $this->get_eb_filename($template))
                    );
                }
            }
        }

        // NotificationX Post Type Support
        if (in_array('notificationx/notificationx.php', apply_filters('active_plugins', get_option('active_plugins')))) {
            $gutenberg_ids = $this->get_gutenberg_id_from_nx();
            if (is_array($gutenberg_ids) && ! empty($gutenberg_ids)) {
                foreach ($gutenberg_ids as $element) {
                    if (file_exists($this->frontend_style_dir . $this->get_frontend_filename($element))) {
                        wp_enqueue_style(
                            'frontend' . $element,
                            $this->frontend_style_url . $this->get_frontend_filename($element),
                            $deps,
                            $this->file_version($this->frontend_style_dir . $this->get_frontend_filename($element))
                        );
                    }
                }
            }
        }

        // Astra Addon Advanced Hooks CSS files are now handled by astra_advanced_hooks_css_generation() method
        if (in_array('astra-addon/astra-addon.php', apply_filters('active_plugins', get_option('active_plugins'))) && defined('ASTRA_ADVANCED_HOOKS_POST_TYPE')) {
            foreach ($this->astra_hook_ids as $element_id) {
                if (file_exists($this->style_dir . $this->get_eb_filename($element_id))) {
                    wp_enqueue_style('eb-block-style-' . $element_id, $this->style_url . $this->get_eb_filename($element_id), $deps, $this->file_version($this->style_dir . $this->get_eb_filename($element_id)));
                }
            }
        }

        //Widget Style Enqueue
        $this->enqueue_widget_styles();

        //FSE Style Enqueue
        if (function_exists('wp_is_block_theme') && wp_is_block_theme()) {
            $templates = array_unique($this->fse_template_ids);
            foreach ($templates as $template) {
                if (is_integer($template) && file_exists($this->fse_style_dir . $this->get_fse_filename($template))) {
                    wp_enqueue_style('eb-fse-style-' . $template, $this->fse_style_url . $this->get_fse_filename($template), array(), $this->file_version($this->fse_style_dir . $this->get_fse_filename($template)));
                }
            }
        }

        /**
         * Hooks assets for enqueue in frontend
         *
         * @param $path string
         * @param $url string
         *
         * @since 3.0.0
         */
        do_action('eb_frontend_assets', $this->style_dir, $this->style_url);
    }

    public function load_frontend_scripts_conditionally($block_content, $block) {
        if (null === $block_content) {
            $block_content = "";
        }

        // Load our main frontend scripts if there's a Essential block
        // loaded in the frontend.
        if (! $this->is_main_script_loaded && ! is_admin()) {
            if (strpos($block_content, '<!-- wp:essential-blocks/') !== false) {
                $this->enqueue_frontend_assets();
                $this->is_main_script_loaded = true;
            }
        }

        // Only do this for Essential blocks.
        if (! isset($block['blockName']) || strpos($block['blockName'], 'essential-blocks/') === false) {
            return $block_content;
        }

        return $block_content;
    }

    public function load_frontend_css_file($post_id, $handle_name, $block_names) {
        $css_file = $this->frontend_style_dir . $this->get_frontend_filename($post_id);
        $css_url  = $this->frontend_style_url . $this->get_frontend_filename($post_id);

        if (! $this->needs_regeneration($css_file)) {
            wp_enqueue_style($handle_name, $css_url, array(), filemtime($css_file));
        } else {
            $handle_name = $this->generate_frontend_css_file($block_names, $handle_name, $css_file, $css_url);
        }
        return $handle_name;
    }

    /**
     * Generate Frontend CSS file
     * @param array $block_names
     * @return string
     */
    public function generate_frontend_css_file($block_names, $handle, $filename, $fileurl) {
        $all_blocks = array_unique($block_names);

        $css = '';
        if (count($all_blocks) > 0) {
            foreach ($all_blocks as $block) {
                $blockname = '';
                $dir       = '';
                $base_url  = '';
                if (defined('ESSENTIAL_BLOCKS_PRO_DIR_PATH') && str_starts_with($block, 'essential-blocks/pro-')) {
                    $split_name = explode('/', $block);
                    $blockname  = str_replace('pro-', '', $split_name[1]);
                    $dir        = ESSENTIAL_BLOCKS_PRO_DIR_PATH . 'assets' . DIRECTORY_SEPARATOR . 'blocks' . DIRECTORY_SEPARATOR . $blockname . DIRECTORY_SEPARATOR . 'style.css';
                    $base_url   = ESSENTIAL_BLOCKS_PRO_URL . 'assets/blocks/' . $blockname . '/';
                } elseif (str_starts_with($block, 'essential-blocks/')) {
                    $split_name = explode('/', $block);
                    $blockname  = $split_name[1];
                    $dir        = ESSENTIAL_BLOCKS_DIR_PATH . 'assets' . DIRECTORY_SEPARATOR . 'blocks' . DIRECTORY_SEPARATOR . $split_name[1] . DIRECTORY_SEPARATOR . 'style.css';
                    $base_url   = ESSENTIAL_BLOCKS_URL . 'assets/blocks/' . $split_name[1] . '/';
                } else {
                    continue;
                }
                if (file_exists($dir) && strlen($blockname) > 0) {
                    // The combined file lives in uploads/eb-style/frontend/, so a
                    // relative url() in a block stylesheet must be made absolute
                    // against the block's own asset folder first.
                    $block_css = self::rebase_relative_urls(file_get_contents($dir), $base_url);
                    $css      .= apply_filters("eb_fixed_frontend_styles/{$blockname}", $block_css, $blockname,);
                }
            }
        }

        //Write CSS File and Enqueue
        if (strlen(trim($css)) > 0) {
            if (! file_exists($this->frontend_style_dir)) {
                mkdir($this->frontend_style_dir, 0755, true);
            }

            //Replace Breakpoints
            $breakpoints = array(
                'tablet' => CSSParser::get_responsive_breakpoints('tablet'),
                'mobile' => CSSParser::get_responsive_breakpoints('mobile')
            );

            $all_breakpoints = array(
                '1024' => $breakpoints['tablet'],
                '1023' => $breakpoints['tablet'] - 1,
                '1025' => $breakpoints['tablet'] + 1,
                '767' => $breakpoints['mobile'],
                '768' => $breakpoints['mobile'] + 1
            );

            foreach ($all_breakpoints as $old => $new) {
                $css = preg_replace("/(@media[^{]+)width:\s*" . preg_quote($old) . "px/", "$1width:" . $new . "px", $css, -1, $count);
            }
            file_put_contents($filename, $css);
            clearstatcache(true, $filename);
            //Enqueue
            wp_enqueue_style($handle, $fileurl, array(), filemtime($filename));
            return $handle;
        }
        // Nothing to write: drop a stale file left from before a regeneration
        // so it is neither served nor regenerated on every request.
        AssetGeneration::remove_file($filename);
        return '';
    }

    /**
     * Make relative url() references in a stylesheet absolute.
     *
     * Block stylesheets are concatenated into a per-page file under
     * uploads/eb-style/frontend/, where a path such as
     * `url(../../images/ajax-loader.gif)` would resolve against the uploads
     * directory instead of the plugin. Absolute URLs, root-relative paths,
     * protocol-relative URLs, data URIs and fragment references are left as-is.
     *
     * @param string $css      Stylesheet contents.
     * @param string $base_url URL of the folder the stylesheet was built into, with a trailing slash.
     * @return string
     */
    public static function rebase_relative_urls($css, $base_url) {
        if ('' === $base_url || false === strpos($css, 'url(')) {
            return $css;
        }

        return preg_replace_callback(
            '/url\(\s*([\'"]?)([^\'")]+)\1\s*\)/i',
            function ($matches) use ($base_url) {
                $path = trim($matches[2]);
                if (preg_match('#^([a-z][a-z0-9+.-]*:|/|\#|%23)#i', $path)) {
                    return $matches[0];
                }

                $url      = $base_url . $path;
                $parts    = wp_parse_url($url);
                $segments = [];
                foreach (explode('/', isset($parts['path']) ? $parts['path'] : '') as $segment) {
                    if ('..' === $segment) {
                        array_pop($segments);
                    } elseif ('.' !== $segment) {
                        $segments[] = $segment;
                    }
                }
                $origin = isset($parts['host']) ? (isset($parts['scheme']) ? $parts['scheme'] . ':' : '') . '//' . $parts['host'] . (isset($parts['port']) ? ':' . $parts['port'] : '') : '';
                $url    = $origin . implode('/', $segments) . (isset($parts['query']) ? '?' . $parts['query'] : '') . (isset($parts['fragment']) ? '#' . $parts['fragment'] : '');

                return 'url(' . $matches[1] . $url . $matches[1] . ')';
            },
            $css
        );
    }

    /**
     * Generate FSE Assets
     */
    public function fse_assets_generation($template, $type, $templates) {
        $block_template = resolve_block_template($type, $templates, $template);
        if (! empty($block_template)) {
            if (isset($block_template->content)) {
                $parsed_content = parse_blocks($block_template->content);

                if (is_array($parsed_content) && ! empty($parsed_content)) {
                    if (isset($block_template->wp_id) && isset($block_template->type)) {
                        $this->fse_page_template_id = $block_template->wp_id;
                        $this->fse_template_ids[] = $block_template->wp_id;
                        $this->write_css_from_content($parsed_content, $block_template->wp_id, $block_template->type);
                    }

                    foreach ($parsed_content as $content) {
                        $this->fse_template_parts_recursive($content);
                    }
                }
            }
        }

        return $template;
    }

    public function fse_template_parts_recursive($content) {
        if (isset($content['blockName']) && isset($content['attrs']['theme']) && isset($content['attrs']['slug'])) {
            $id       = $content['attrs']['theme'] . '//' . $content['attrs']['slug'];
            $template = '';
            if (('core/template-part' === $content['blockName'])) {
                $template = get_block_template($id, 'wp_template_part');
            } elseif (('core/template' === $content['blockName'])) {
                $template = get_block_template($id, 'wp_template');
            }

            if (isset($template->content) && isset($template->wp_id) && isset($template->type)) {
                $this->write_css_from_content(parse_blocks($template->content), $template->wp_id, $template->type);

                if (empty($this->fse_page_template_id)) {
                    $this->fse_page_template_id = $template->wp_id;
                }
            }
        } elseif (isset($content['innerBlocks']) && count($content['innerBlocks']) > 0) {
            if (count($content['innerBlocks']) > 0) {
                foreach ($content['innerBlocks'] as $block) {
                    self::fse_template_parts_recursive($block);
                }
            }
        }
    }

    /**
     * Write CSS for EB Blocks
     * @param array $parsed_content
     * @param integer $post_id
     * @return void
     */
    public function write_css_from_content($parsed_content, $post_id = false, $type = '') {
        if (count($parsed_content) === 0) {
            return;
        }

        $filename  = $this->style_dir . $this->get_eb_filename($post_id);
        $eb_blocks = array();
        if ('wp_template' === $type || 'wp_template_part' === $type) {
            $recursive_response         = CSSParser::eb_block_style_recursive($parsed_content, $eb_blocks, $this->fse_block_names);
            $filename                   = $this->fse_style_dir . $this->get_fse_filename($post_id);
            $this->fse_template_ids[] = $post_id;
        } else {
            $recursive_response = CSSParser::eb_block_style_recursive($parsed_content, $eb_blocks, $this->block_names);
        }

        //Return if the file exists and is not stale
        if (! $this->needs_regeneration($filename)) {
            return;
        }

        $reusable_Blocks = ! empty($recursive_response['reusableBlocks']) ? $recursive_response['reusableBlocks'] : array();
        // remove empty reusable blocks
        $reusable_Blocks = array_filter($reusable_Blocks, function ($v) {
            return ! empty($v);
        });
        unset($recursive_response["reusableBlocks"]);
        $style = CSSParser::blocks_to_style_array($recursive_response);

        if (false !== $post_id) {
            $this->write_block_css($style, $post_id, $type); //Write CSS file for this page
        }

        $reusableIds = $reusable_Blocks ? array_keys($reusable_Blocks) : array();

        // The site-wide option exists for content that has no post context on
        // the frontend — FSE templates / template parts and printed Templately
        // templates — whose reusable-block CSS must be enqueued on every page
        // that renders them. enqueue_frontend_assets() merges it into EVERY
        // post's enqueue, so it must only ever hold template-level IDs.
        //
        // Until 6.4.7 it was overwritten by whichever post generated CSS last,
        // regardless of type: a synced pattern used on one page had its
        // stylesheet enqueued site-wide until the next generation replaced it.
        // Template-level IDs are now merged in (a header part and a footer
        // part each contribute), and ordinary posts only touch their own meta.
        if (! empty($reusableIds) && self::is_template_level_type($type)) {
            $existing = get_option('_eb_reusable_block_ids', array());
            $existing = is_array($existing) ? $existing : array();
            update_option('_eb_reusable_block_ids', array_values(array_unique(array_merge($existing, $reusableIds))));
        }
        update_post_meta($post_id, '_eb_reusable_block_ids', $reusableIds);

        if (! empty($reusable_Blocks)) {
            foreach ($reusable_Blocks as $blockId => $block) {
                $style = CSSParser::blocks_to_style_array($block);
                $this->write_reusable_block_css($style, $blockId);
            }
        }
    }


    /**
     * Post types whose reusable-block IDs belong in the site-wide
     * `_eb_reusable_block_ids` option rather than a single post's meta.
     *
     * @param string $type Post type passed to write_css_from_content().
     * @return bool
     */
    private static function is_template_level_type($type) {
        // Everything StyleHandler renders site-wide rather than as a single
        // post: block-theme templates/parts, printed Templately templates, and
        // the header/footer/hook containers of the builder integrations below.
        // Leaving any of them out means a synced pattern inside it loses its
        // CSS on every page, because the enqueue path only reads the CURRENT
        // post's meta plus this option.
        $types = array('wp_template', 'wp_template_part', 'templately_library', 'ct_content_block', 'gp_elements');
        if (defined('ASTRA_ADVANCED_HOOKS_POST_TYPE')) {
            $types[] = ASTRA_ADVANCED_HOOKS_POST_TYPE;
        }
        $types = apply_filters('eb_reusable_block_template_types', $types);
        return in_array($type, (array) $types, true);
    }
    /**
     * Write block css in upload directory
     * @retun void
     * @since 1.0.2
     */
    private function write_block_css($block_styles, $post_id, $post_type) {
        $is_fse   = 'wp_template' === $post_type || 'wp_template_part' === $post_type;
        $dir      = $is_fse ? $this->fse_style_dir : $this->style_dir;
        $filepath = $dir . ($is_fse ? $this->get_fse_filename($post_id) : $this->get_eb_filename($post_id));

        // Write CSS for Page/Posts
        if (! empty($css = CSSParser::build_css($block_styles))) {
            if (! file_exists($dir)) {
                mkdir($dir, 0755, true);
            }
            file_put_contents($filepath, $css);
            clearstatcache(true, $filepath);
        } else {
            // Nothing to write: drop a stale file left from before a
            // regeneration so it is not enqueued with outdated CSS.
            AssetGeneration::remove_file($filepath);
        }
    }

    /**
     * Write css for Reusable block
     * @retun void
     * @since 3.4.0
     */
    private function write_reusable_block_css($block_styles, $id) {
        if (isset($block_styles) && is_array($block_styles)) {
            if (! empty($css = CSSParser::build_css($block_styles))) {
                $upload_dir = $this->style_dir . 'reusable-blocks/';
                if (! file_exists($upload_dir)) {
                    mkdir($upload_dir, 0755, true);
                }
                file_put_contents($upload_dir . DIRECTORY_SEPARATOR . 'eb-reusable-' . abs($id) . '.min.css', $css);
                clearstatcache(true, $upload_dir . DIRECTORY_SEPARATOR . 'eb-reusable-' . abs($id) . '.min.css');
            }
        }
    }

    /**
     * Single file css generator
     * @retun void
     * @since 3.5.3
     */
    private function single_file_css_generator($block_styles, $upload_dir, $filename) {
        $editSiteCssPath = $upload_dir . $filename;
        if (file_exists($editSiteCssPath)) {
            $existingCss = file_get_contents($editSiteCssPath);
            $pattern     = "~\/\*(.*?)\*\/~";
            preg_match_all($pattern, $existingCss, $result, PREG_PATTERN_ORDER);
            $allComments  = $result[0];
            $seperatedIds = array();
            foreach ($allComments as $comment) {
                $id = preg_replace('/[^A-Za-z0-9\-]|Ends|Starts/', '', $comment);

                if (strpos($comment, "Starts")) {
                    $seperatedIds[$id]['start'] = $comment;
                } elseif (strpos($comment, "Ends")) {
                    $seperatedIds[$id]['end'] = $comment;
                }
            }

            $seperateStyles = array();
            foreach ($seperatedIds as $key => $ids) {
                $seperateStyles[][$key] = isset($block_styles[$key]) ? $block_styles[$key] : array();
            }

            self::$_block_styles = array_merge(self::$_block_styles, $block_styles);

            if (! empty($css = CSSParser::build_css(self::$_block_styles))) {
                if (! file_exists($upload_dir)) {
                    mkdir($upload_dir);
                }

                file_put_contents($editSiteCssPath, $css);
            }
        } else {
            self::$_block_styles = $block_styles;
            if (! empty($css = CSSParser::build_css($block_styles))) {
                if (! file_exists($this->style_dir)) {
                    mkdir($this->style_dir);
                }
                file_put_contents($editSiteCssPath, $css);
            }
        }
    }

    /**
     * Save Widget CSS when Widget is saved
     * @return void
     * @since 3.5.3
     */
    public function after_save_widget($id, $sidebar_id, $request, $creating) {
        $parsed_content = isset($request['instance']['raw']['content']) ? parse_blocks($request['instance']['raw']['content']) : array();
        if (is_array($parsed_content) && ! empty($parsed_content)) {
            $eb_blocks          = array();
            $recursive_response = CSSParser::eb_block_style_recursive($parsed_content, $eb_blocks, $this->widget_block_names);
            unset($recursive_response["reusableBlocks"]);
            $style = CSSParser::blocks_to_style_array($recursive_response);
            //Write CSS file for Widget
            $this->single_file_css_generator($style, $this->style_dir, $this->prefix . '-widget.min.css');
        }
    }

    /**
     * Load Dependencies
     */
    private function load_style_handler_dependencies() {
        require_once plugin_dir_path(__FILE__) . 'includes/class-parse-css.php';
    }

    /**
     * Get post content when page is saved
     */
    public function on_save_post($post_id, $post, $update) {
        $post_type = get_post_type($post_id);

        //If This page is draft, return
        if (isset($post->post_status) && 'auto-draft' == $post->post_status) {
            return;
        }

        // Autosave, do nothing
        if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
            return;
        }

        // Return if it's a post revision
        if (false !== wp_is_post_revision($post_id)) {
            return;
        }

        //Remove frontend assets on save post/FSE
        $clean_frontend = false;
        if ('templately_library' === $post_type) {
            $clean_frontend = true;
        }
        $this->remove_frontend_assets($post_id, $post_type, $clean_frontend);

        // $parsed_content = $this->get_parsed_content( $post_id, $post, $post_type );

        // if ( is_array( $parsed_content ) && ! empty( $parsed_content ) ) {
        //     $this->write_css_from_content( $parsed_content, $post_id, $post_type );
        // }
    }

    private function get_parsed_content($post_id, $post, $post_type) {
        if ('wp_template_part' === $post_type || 'wp_template' === $post_type) {
            $post = get_post($post_id);
        }

        $parsed_content = parse_blocks($post->post_content);

        if (empty($parsed_content)) {
            delete_post_meta($post_id, '_eb_reusable_block_ids');
        }

        return $parsed_content;
    }

    /**
     * Get post content when page is load in frontend
     */
    public function generate_post_content() {
        // FSE assets generation
        if (function_exists('wp_is_block_theme') && wp_is_block_theme()) {
            add_filter("404_template", array($this, 'fse_assets_generation'), 99, 3);
            add_filter("archive_template", array($this, 'fse_assets_generation'), 99, 3);
            add_filter("category_template", array($this, 'fse_assets_generation'), 99, 3);
            add_filter("frontpage_template", array($this, 'fse_assets_generation'), 99, 3);
            add_filter("home_template", array($this, 'fse_assets_generation'), 99, 3);
            add_filter("index_template", array($this, 'fse_assets_generation'), 99, 3);
            add_filter("page_template", array($this, 'fse_assets_generation'), 99, 3);
            add_filter("search_template", array($this, 'fse_assets_generation'), 99, 3);
            add_filter("single_template", array($this, 'fse_assets_generation'), 99, 3);
            add_filter("singular_template", array($this, 'fse_assets_generation'), 99, 3);
            add_filter("tag_template", array($this, 'fse_assets_generation'), 99, 3);
            add_filter("taxonomy_template", array($this, 'fse_assets_generation'), 99, 3);
        }

        //Write CSS from content if css file not exists for specific post by id
        $post_id = get_the_ID();
        if ($post_id) {
            $css_filepath          = $this->style_dir . $this->prefix . '-' . $post_id . '.min.css';
            $frontend_css_filepath = $this->frontend_style_dir . $this->frontend_prefix . '-' . $post_id . '.min.css';
            if ($this->needs_regeneration($css_filepath) || $this->needs_regeneration($frontend_css_filepath)) {
                $post_type = get_post_type($post_id);
                $post      = get_post($post_id);
                //If This page is draft, return
                if (isset($post->post_status) && 'auto-draft' == $post->post_status) {
                    return;
                }

                // Return if it's a post revision
                if (false !== wp_is_post_revision($post_id)) {
                    return null;
                }
                $parsed_content = $this->get_parsed_content($post_id, $post, $post_type);

                if (is_array($parsed_content) && ! empty($parsed_content)) {
                    $this->write_css_from_content($parsed_content, $post_id, $post_type);
                }
            }
        }
    }

    /**
     * Get post id by post_name for FSE template
     */
    public static function eb_get_post_content_by_post_name($post_name) {
        global $wpdb;
        $sql = $wpdb->prepare("SELECT ID FROM {$wpdb->prefix}posts WHERE post_name = %s", $post_name);

        return $wpdb->get_results($sql, ARRAY_A);
    }

    /**
     * Mark every generated stylesheet stale and reset the derived
     * reusable-block state, so each file is rewritten with the current code
     * the next time its content renders.
     *
     * Files are NOT deleted. A full-page cache (host cache, Varnish, CDN, or
     * a cache plugin that does not purge on plugin update) keeps serving HTML
     * that links the old files; deleting them would 404 that CSS until the
     * cache is purged, because nothing regenerates a file without a PHP
     * render. Instead the generation paths compare each file's mtime against
     * this timestamp (needs_regeneration()) and overwrite stale files in
     * place. Cached HTML keeps loading the old CSS, and fresh HTML gets the
     * new file with a new mtime-based ?ver=.
     *
     * The `_eb_reusable_block_ids` option is reset in the same step: its
     * template-level entries are re-merged as the (now stale) templates
     * regenerate, and page-level IDs leaked by older versions are dropped.
     *
     * @since 6.4.7
     * @return void
     */
    public function regenerate_all_assets() {
        update_option('eb_assets_regenerate_since', time());
        delete_option('_eb_reusable_block_ids');
    }

    /**
     * Whether a generated file must be (re)written: it is missing, or it was
     * written at or before the last regenerate_all_assets() call.
     *
     * @param string $path Absolute path to the generated file.
     * @return bool
     */
    private function needs_regeneration($path) {
        if (! file_exists($path)) {
            return true;
        }
        $since = (int) get_option('eb_assets_regenerate_since', 0);
        return $since > 0 && filemtime($path) <= $since;
    }

    /**
     * Remove frontend assets file or folder to regenerate assets
     * If $post_id is false or $post_type is FSE templates, remove directory otherwise remove file by post_id
     * @param integer $post_id
     * @param string $post_type
     * @return void
     */
    public function remove_frontend_assets($post_id = false, $post_type = false, $clean_frontend = false) {
        if (false === $post_type || ('wp_template' === $post_type || 'wp_template_part' === $post_type)) {
            AssetGeneration::remove_file($this->fse_style_dir . $this->get_fse_filename($post_id));
        } elseif ($post_id) {
            AssetGeneration::remove_file($this->style_dir . $this->get_eb_filename($post_id));
        }

        if (true === $clean_frontend) {
            AssetGeneration::remove_directory_files($this->frontend_style_dir);
        } else {
            AssetGeneration::remove_file($this->frontend_style_dir . $this->get_frontend_filename($post_id));
        }
    }

    /**
     * Write css for widget
     */
    public function eb_widget_dynamic_sidebar_params($params) {
        global $wp_registered_widgets;

        $widget_id      = $params[0]['widget_id'];
        $widget_obj     = $wp_registered_widgets[$widget_id];
        $widget_options = get_option($widget_obj['callback'][0]->option_name);

        // Find the specific instance for this widget ID
        $widget_number = $widget_obj['params'][0]['number'];
        $instance      = $widget_options[$widget_number];

        $parsed_content = isset($instance['content']) ? parse_blocks($instance['content']) : array();
        if (is_array($parsed_content) && ! empty($parsed_content)) {
            $eb_blocks          = array();
            $recursive_response = CSSParser::eb_block_style_recursive($parsed_content, $eb_blocks, $this->widget_block_names);
            unset($recursive_response["reusableBlocks"]);
            $style = CSSParser::blocks_to_style_array($recursive_response);

            //Write CSS file for Widget
            $this->single_file_css_generator($style, $this->style_dir, $this->prefix . '-widget.min.css');
        }

        return $params;
    }

    /**
     * generate_element_post_id
     *
     * @param $post_id int
     *
     * @return int
     */
    public function get_generatepress_element($post_id) {
        if (empty($post_id)) {
            return $post_id;
        }

        $display_conditions = get_post_meta($post_id, '_generate_element_display_conditions', true);
        $display_conditions = $display_conditions ? $display_conditions : array();
        $exclude_conditions = get_post_meta($post_id, '_generate_element_exclude_conditions', true);
        $exclude_conditions = $exclude_conditions ? $exclude_conditions : array();
        $user_conditions    = get_post_meta($post_id, '_generate_element_user_conditions', true);
        $user_conditions    = $user_conditions ? $user_conditions : array();

        $display = \GeneratePress_Conditions::show_data(
            $display_conditions,
            $exclude_conditions,
            $user_conditions
        );

        if ($display) {
            $this->gp_ids[] = $post_id;
            $post             = get_post($post_id);
            $parsed_content   = parse_blocks($post->post_content);
            $this->write_css_from_content($parsed_content, $post_id, $post->post_type);
        }

        return $post_id;
    }

    /**
     * Generate CSS for Astra Addon Advanced Hooks
     *
     * @since 5.0.8
     */
    public function astra_advanced_hooks_css_generation() {
        // Check if Astra Addon is active and advanced hooks are available
        if (
            ! in_array('astra-addon/astra-addon.php', apply_filters('active_plugins', get_option('active_plugins'))) ||
            ! defined('ASTRA_ADVANCED_HOOKS_POST_TYPE') ||
            ! class_exists('Astra_Target_Rules_Fields')
        ) {
            return;
        }

        // Use the same logic as Astra Addon to get active advanced hooks
        $option = array(
            'location' => 'ast-advanced-hook-location',
            'exclusion' => 'ast-advanced-hook-exclusion',
            'users' => 'ast-advanced-hook-users'
        );

        $result = \Astra_Target_Rules_Fields::get_instance()->get_posts_by_conditions(ASTRA_ADVANCED_HOOKS_POST_TYPE, $option);

        foreach ($result as $post_id => $post_data) {
            if (! empty($post_id)) {
                $this->astra_hook_ids[] = $post_id;
                $post                     = get_post($post_id);
                if ($post && ! empty($post->post_content)) {
                    $parsed_content = parse_blocks($post->post_content);
                    $this->write_css_from_content($parsed_content, $post_id, $post->post_type);
                }
            }
        }
    }

    /**
     * Function for generate Styles for Templately Theme Builder Templates
     * @since 5.0.8
     * @param integer $template_id
     * @param string $location
     * @param object $template
     * @return void
     */
    public function templately_templates($template_id, $location, $template) {
        if (! is_int($template_id)) {
            return;
        }
        $this->templately_template_ids[] = $template_id;
        $css_filepath                      = $this->style_dir . $this->get_eb_filename($template_id);
        // If check file_exists, it creates issue for frontend asset load. We will fix this later
        // if ( ! file_exists( $css_filepath ) ) {

        // }
        $post = get_post($template_id);
        if (is_object($post) && property_exists($post, 'post_content')) {
            $content        = $post->post_content;
            $parsed_content = parse_blocks($content);
            $this->write_css_from_content($parsed_content, $template_id, $post->post_type);
        }
    }

    /**
     * Enqueue widget css in footer
     * @return void
     */
    public function eb_add_widget_css_footer() {
        $this->enqueue_widget_styles();
    }

    public function enqueue_widget_styles() {
        global $post;
        if (! empty($post) && ! empty($post->ID)) {
            $css_file = $this->frontend_style_dir . $this->get_widget_frontend_filename($post->ID);
            $css_url  = $this->frontend_style_url . $this->get_widget_frontend_filename($post->ID);

            $frontend_handle = 'essential-blocks-widgte-frontend-style';
            if (! $this->needs_regeneration($css_file)) {
                wp_enqueue_style($frontend_handle, $css_url, array(), filemtime($css_file));
                $deps[] = $frontend_handle;
            } else {
                $deps[] = $this->generate_frontend_css_file($this->widget_block_names, $frontend_handle, $css_file, $css_url);
            }

            if (file_exists($this->style_dir . $this->prefix . '-widget.min.css')) {
                wp_enqueue_style('eb-widget-style', $this->style_url . $this->prefix . '-widget.min.css', $deps, $this->file_version($this->style_dir . $this->prefix . '-widget.min.css'), 'all');
            }
        }
    }

    /**
     * Version string for a generated stylesheet: the file's mtime.
     *
     * These files used to be versioned with a random 10-char hash on EVERY
     * request (`substr(md5(microtime(true)), 0, 10)`). That defeated the
     * browser cache (a new query string on each pageview), made every cached
     * copy of a page reference a different URL, and stopped optimisation
     * plugins from fingerprinting the file at all. It also never actually
     * solved stale-CSS-after-edit: a page-cached HTML document carries whatever
     * random version it was rendered with, so it is no fresher than mtime.
     *
     * mtime changes exactly when the file is rewritten (save_post wipes it;
     * the next visit regenerates it), which is the real invalidation event.
     * The static-CSS path (load_frontend_css_file) already versions this way.
     *
     * @param string $path Absolute path to the generated file.
     * @return string
     */
    private function file_version($path) {
        $mtime = file_exists($path) ? filemtime($path) : false;
        return false !== $mtime ? (string) $mtime : ESSENTIAL_BLOCKS_VERSION;
    }

    public function get_fse_filename($post_id) {
        return $this->fse_prefix . '-' . trim($post_id) . '.min.css';
    }

    public function get_eb_filename($post_id) {
        return $this->prefix . '-' . trim($post_id) . '.min.css';
    }

    public function get_frontend_filename($post_id) {
        return $this->frontend_prefix . '-' . trim($post_id) . '.min.css';
    }

    public function get_widget_frontend_filename($post_id) {
        return $this->frontend_prefix . '-widget-' . trim($post_id) . '.min.css';
    }

    /**
     * Get gutenberg_id from nx press bar
     */
    public function get_gutenberg_id_from_nx() {
        $nx_posts = \NotificationX\Core\Database::get_instance()->query()
            ->from('nx_posts')
            ->where('enabled', true)
            ->where('source', 'press_bar')
            ->get();
        $gutenberg_ids = array();
        if (! empty($nx_posts)) {
            foreach ($nx_posts as $nx_post) {
                $data = maybe_unserialize($nx_post->data);
                if (! empty($data['gutenberg_id'])) {
                    $gutenberg_ids[] = $data['gutenberg_id'];
                }
            }
        }
        return $gutenberg_ids;
    }
}
