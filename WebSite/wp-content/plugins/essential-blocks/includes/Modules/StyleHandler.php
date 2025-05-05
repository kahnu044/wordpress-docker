<?php

namespace EssentialBlocks\Modules;

use EssentialBlocks\Integrations\AssetGeneration;
use EssentialBlocks\Utils\CSSParser;

final class StyleHandler
{
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
    private $fse_template_ids = [];
    private $fse_page_template_id;
    private $block_names             = [];
    private $fse_block_names         = [];
    private $widget_block_names      = [];
    private $templately_template_ids = [];

    /**
     * Holds block styles array
     *
     * @var array
     */
    public static $_block_styles = [];

    /**
     * store generatepress elements id
     */
    private $gp_ids = [];

    public static function init()
    {
        if (null === self::$instance) {
            self::$instance = new self;
        }

        return self::$instance;
    }

    public function __construct()
    {
        $upload_dir = wp_upload_dir();

        $this->style_dir = $upload_dir['basedir'] . DIRECTORY_SEPARATOR . $this->prefix . DIRECTORY_SEPARATOR;
        $this->style_url = set_url_scheme($upload_dir['baseurl']) . '/' . $this->prefix . '/';

        $this->frontend_style_dir = $this->style_dir . $this->frontend_prefix . DIRECTORY_SEPARATOR;
        $this->frontend_style_url = $this->style_url . $this->frontend_prefix . '/';

        $this->fse_style_dir = $this->style_dir . $this->fse_prefix . DIRECTORY_SEPARATOR;
        $this->fse_style_url = $this->style_url . $this->fse_prefix . '/';

        add_filter('dynamic_sidebar_params', [$this, 'eb_widget_dynamic_sidebar_params']);

        add_action('save_post', [$this, 'on_save_post'], 10, 3);
        add_action('wp', [$this, 'generate_post_content']);

        add_action('eb_after_save_responsiveBreakpoints_settings', [$this, 'remove_frontend_assets'], 10, 1);
        add_action('eb_after_reset_responsiveBreakpoints_settings', [$this, 'remove_frontend_assets'], 10);
        add_filter('generate_element_post_id', [$this, 'get_generatepress_element'], 99);
        add_action('wp_footer', [$this, 'eb_add_widget_css_footer']);

        //Enqueue Styles based on Block theme or not
        add_action('wp_enqueue_scripts', [$this, 'enqueue_frontend_assets']);

        //For Templately templates
        add_action('templately_printed_location', [$this, 'templately_templates'], 10, 3);
    }

    /**
     * Enqueue frontend css for post if have one
     * @return void
     * @since 1.0.2
     */
    public function enqueue_frontend_assets()
    {
        global $post;

        $deps = apply_filters('eb_generated_css_frontend_deps', []);

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
                wp_enqueue_style('eb-block-style-' . $post->ID, $this->style_url . $this->prefix . '-' . $post->ID . '.min.css', $deps, substr(md5(microtime(true)), 0, 10));
            }

            // Reusable block Style Enqueues
            $reusableIds         = get_post_meta($post->ID, '_eb_reusable_block_ids', true);
            $reusableIds         = ! empty($reusableIds) ? $reusableIds : [];
            $templateReusableIds = get_option('_eb_reusable_block_ids', []);
            $reusableIds         = array_unique(array_merge($reusableIds, $templateReusableIds));
            if (! empty($reusableIds)) {
                foreach ($reusableIds as $reusableId) {
                    if (file_exists($this->style_dir . 'reusable-blocks/eb-reusable-' . $reusableId . '.min.css')) {
                        wp_enqueue_style('eb-reusable-block-style-' . $reusableId, $this->style_url . 'reusable-blocks/eb-reusable-' . $reusableId . '.min.css', $deps, substr(md5(microtime(true)), 0, 10));
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
            $gp_elements = get_posts(['post_type' => 'gp_elements']);
            if (is_array($gp_elements) && ! empty($gp_elements)) {
                foreach ($gp_elements as $element) {
                    if (file_exists($this->style_dir . $this->get_eb_filename($element->ID))) {
                        wp_enqueue_style('eb-block-style-' . $element->ID, $this->style_url . $this->get_eb_filename($element->ID), $deps, substr(md5(microtime(true)), 0, 10));
                    }
                }
            }
        }

        //Blocksy theme support
        if (in_array('blocksy-companion-pro/blocksy-companion.php', apply_filters('active_plugins', get_option('active_plugins')))) {
            $ct_elements = get_posts(['post_type' => 'ct_content_block']);
            if (is_array($ct_elements) && ! empty($ct_elements)) {
                foreach ($ct_elements as $element) {
                    if (file_exists($this->style_dir . $this->get_eb_filename($element->ID))) {
                        wp_enqueue_style(
                            'eb-block-style-' . $element->ID,
                            $this->style_url . $this->get_eb_filename($element->ID),
                            $deps,
                            substr(md5(microtime(true)), 0, 10)
                        );
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
                        substr(md5(microtime(true)), 0, 10)
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
                            substr(md5(microtime(true)), 0, 10)
                        );
                    }
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
                    wp_enqueue_style('eb-fse-style-' . $template, $this->fse_style_url . $this->get_fse_filename($template), [], substr(md5(microtime(true)), 0, 10));
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

    public function load_frontend_css_file($post_id, $handle_name, $block_names)
    {
        $css_file = $this->frontend_style_dir . $this->get_frontend_filename($post_id);
        $css_url  = $this->frontend_style_url . $this->get_frontend_filename($post_id);

        if (file_exists($css_file)) {
            wp_enqueue_style($handle_name, $css_url, [], filemtime($css_file));
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
    public function generate_frontend_css_file($block_names, $handle, $filename, $fileurl)
    {
        $all_blocks = array_unique($block_names);

        $css = '';
        if (count($all_blocks) > 0) {
            foreach ($all_blocks as $block) {
                $blockname = '';
                $dir       = '';
                if (defined('ESSENTIAL_BLOCKS_PRO_DIR_PATH') && str_starts_with($block, 'essential-blocks/pro-')) {
                    $split_name = explode('/', $block);
                    $blockname  = str_replace('pro-', '', $split_name[1]);
                    $dir        = ESSENTIAL_BLOCKS_PRO_DIR_PATH . 'assets' . DIRECTORY_SEPARATOR . 'blocks' . DIRECTORY_SEPARATOR . $blockname . DIRECTORY_SEPARATOR . 'style.css';
                } else if (str_starts_with($block, 'essential-blocks/')) {
                    $split_name = explode('/', $block);
                    $blockname  = $split_name[1];
                    $dir        = ESSENTIAL_BLOCKS_DIR_PATH . 'assets' . DIRECTORY_SEPARATOR . 'blocks' . DIRECTORY_SEPARATOR . $split_name[1] . DIRECTORY_SEPARATOR . 'style.css';
                } else {
                    continue;
                }
                if (file_exists($dir) && strlen($blockname) > 0) {
                    $css .= apply_filters("eb_fixed_frontend_styles/{$blockname}", file_get_contents($dir), $blockname,);
                }
            }
        }

        //Write CSS File and Enqueue
        if (strlen(trim($css)) > 0) {
            if (! file_exists($this->frontend_style_dir)) {
                mkdir($this->frontend_style_dir, 0777, true);
            }

            //Replace Breakpoints
            $breakpoints = [
                'tablet' => CSSParser::get_responsive_breakpoints('tablet'),
                'mobile' => CSSParser::get_responsive_breakpoints('mobile')
            ];

            $all_breakpoints = [
                '1024' => $breakpoints['tablet'],
                '1023' => $breakpoints['tablet'] - 1,
                '1025' => $breakpoints['tablet'] + 1,
                '767'  => $breakpoints['mobile'],
                '768'  => $breakpoints['mobile'] + 1
            ];

            foreach ($all_breakpoints as $old => $new) {
                $css = preg_replace("/(@media[^{]+)width:\s*" . preg_quote($old) . "px/", "$1width:" . $new . "px", $css, -1, $count);
            }
            file_put_contents($filename, $css);
            //Enqueue
            wp_enqueue_style($handle, $fileurl, [], filemtime($filename));
            return $handle;
        }
        return '';
    }

    /**
     * Generate FSE Assets
     */
    public function fse_assets_generation($template, $type, $templates)
    {
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

    public function fse_template_parts_recursive($content)
    {
        if (isset($content['blockName']) && isset($content['attrs']['theme']) && isset($content['attrs']['slug'])) {
            $id       = $content['attrs']['theme'] . '//' . $content['attrs']['slug'];
            $template = '';
            if (('core/template-part' === $content['blockName'])) {
                $template = get_block_template($id, 'wp_template_part');
            } else if (('core/template' === $content['blockName'])) {
                $template = get_block_template($id, 'wp_template');
            }

            if (isset($template->content) && isset($template->wp_id) && isset($template->type)) {
                $this->write_css_from_content(parse_blocks($template->content), $template->wp_id, $template->type);

                if (empty($this->fse_page_template_id)) {
                    $this->fse_page_template_id = $template->wp_id;
                }
            }
        } else if (isset($content['innerBlocks']) && count($content['innerBlocks']) > 0) {
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
    public function write_css_from_content($parsed_content, $post_id = false, $type = '')
    {
        if (count($parsed_content) === 0) {
            return;
        }

        $filename  = $this->style_dir . $this->get_eb_filename($post_id);
        $eb_blocks = [];
        if ($type === 'wp_template' || $type === 'wp_template_part') {
            $recursive_response         = CSSParser::eb_block_style_recursive($parsed_content, $eb_blocks, $this->fse_block_names);
            $filename                   = $this->fse_style_dir . $this->get_fse_filename($post_id);
            $this->fse_template_ids[] = $post_id;
        } else {
            $recursive_response = CSSParser::eb_block_style_recursive($parsed_content, $eb_blocks, $this->block_names);
        }

        //Check if file exists, return
        if (file_exists($filename)) {
            return;
        }

        $reusable_Blocks = ! empty($recursive_response['reusableBlocks']) ? $recursive_response['reusableBlocks'] : [];
        // remove empty reusable blocks
        $reusable_Blocks = array_filter($reusable_Blocks, function ($v) {
            return ! empty($v);
        });
        unset($recursive_response["reusableBlocks"]);
        $style = CSSParser::blocks_to_style_array($recursive_response);

        if ($post_id !== false) {
            $this->write_block_css($style, $post_id, $type); //Write CSS file for this page
        }

        $reusableIds = $reusable_Blocks ? array_keys($reusable_Blocks) : [];
        if (! empty($reusableIds)) {
            update_option('_eb_reusable_block_ids', $reusableIds);
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
     * Write block css in upload directory
     * @retun void
     * @since 1.0.2
     */
    private function write_block_css($block_styles, $post_id, $post_type)
    {
        // Write CSS for Page/Posts
        if (! empty($css = CSSParser::build_css($block_styles))) {
            if ($post_type === 'wp_template' || $post_type === 'wp_template_part') {
                if (! file_exists($this->fse_style_dir)) {
                    mkdir($this->fse_style_dir, 0777, true);
                }
                file_put_contents($this->fse_style_dir . $this->get_fse_filename($post_id), $css);
            } else {
                if (! file_exists($this->style_dir)) {
                    mkdir($this->style_dir, 0777, true);
                }
                file_put_contents($this->style_dir . $this->get_eb_filename($post_id), $css);
            }
        }
    }

    /**
     * Write css for Reusable block
     * @retun void
     * @since 3.4.0
     */
    private function write_reusable_block_css($block_styles, $id)
    {
        if (isset($block_styles) && is_array($block_styles)) {
            if (! empty($css = CSSParser::build_css($block_styles))) {
                $upload_dir = $this->style_dir . 'reusable-blocks/';
                if (! file_exists($upload_dir)) {
                    mkdir($upload_dir, 0777, true);
                }
                file_put_contents($upload_dir . DIRECTORY_SEPARATOR . 'eb-reusable-' . abs($id) . '.min.css', $css);
            }
        }
    }

    /**
     * Single file css generator
     * @retun void
     * @since 3.5.3
     */
    private function single_file_css_generator($block_styles, $upload_dir, $filename)
    {
        $editSiteCssPath = $upload_dir . $filename;
        if (file_exists($editSiteCssPath)) {
            $existingCss = file_get_contents($editSiteCssPath);
            $pattern     = "~\/\*(.*?)\*\/~";
            preg_match_all($pattern, $existingCss, $result, PREG_PATTERN_ORDER);
            $allComments  = $result[0];
            $seperatedIds = [];
            foreach ($allComments as $comment) {
                $id = preg_replace('/[^A-Za-z0-9\-]|Ends|Starts/', '', $comment);

                if (strpos($comment, "Starts")) {
                    $seperatedIds[$id]['start'] = $comment;
                } else if (strpos($comment, "Ends")) {
                    $seperatedIds[$id]['end'] = $comment;
                }
            }

            $seperateStyles = [];
            foreach ($seperatedIds as $key => $ids) {
                $seperateStyles[][$key] = isset($block_styles[$key]) ? $block_styles[$key] : [];
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
    public function after_save_widget($id, $sidebar_id, $request, $creating)
    {
        $parsed_content = isset($request['instance']['raw']['content']) ? parse_blocks($request['instance']['raw']['content']) : [];
        if (is_array($parsed_content) && ! empty($parsed_content)) {
            $eb_blocks          = [];
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
    private function load_style_handler_dependencies()
    {
        require_once plugin_dir_path(__FILE__) . 'includes/class-parse-css.php';
    }

    /**
     * Get post content when page is saved
     */
    public function on_save_post($post_id, $post, $update)
    {
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
        if ($post_type === 'templately_library') {
            $clean_frontend = true;
        }
        $this->remove_frontend_assets($post_id, $post_type, $clean_frontend);

        // $parsed_content = $this->get_parsed_content( $post_id, $post, $post_type );

        // if ( is_array( $parsed_content ) && ! empty( $parsed_content ) ) {
        //     $this->write_css_from_content( $parsed_content, $post_id, $post_type );
        // }
    }

    private function get_parsed_content($post_id, $post, $post_type)
    {
        if ($post_type === 'wp_template_part' || $post_type === 'wp_template') {
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
    public function generate_post_content()
    {
        // FSE assets generation
        if (function_exists('wp_is_block_theme') && wp_is_block_theme()) {
            add_filter("404_template", [$this, 'fse_assets_generation'], 99, 3);
            add_filter("archive_template", [$this, 'fse_assets_generation'], 99, 3);
            add_filter("category_template", [$this, 'fse_assets_generation'], 99, 3);
            add_filter("frontpage_template", [$this, 'fse_assets_generation'], 99, 3);
            add_filter("home_template", [$this, 'fse_assets_generation'], 99, 3);
            add_filter("index_template", [$this, 'fse_assets_generation'], 99, 3);
            add_filter("page_template", [$this, 'fse_assets_generation'], 99, 3);
            add_filter("search_template", [$this, 'fse_assets_generation'], 99, 3);
            add_filter("single_template", [$this, 'fse_assets_generation'], 99, 3);
            add_filter("singular_template", [$this, 'fse_assets_generation'], 99, 3);
            add_filter("tag_template", [$this, 'fse_assets_generation'], 99, 3);
            add_filter("taxonomy_template", [$this, 'fse_assets_generation'], 99, 3);
        }

        //Write CSS from content if css file not exists for specific post by id
        $post_id = get_the_ID();
        if ($post_id) {
            $css_filepath          = $this->style_dir . $this->prefix . '-' . $post_id . '.min.css';
            $frontend_css_filepath = $this->frontend_style_dir . $this->frontend_prefix . '-' . $post_id . '.min.css';
            if (! file_exists($css_filepath) || ! file_exists($frontend_css_filepath)) {
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
    public static function eb_get_post_content_by_post_name($post_name)
    {
        global $wpdb;
        $sql = $wpdb->prepare("SELECT ID FROM {$wpdb->prefix}posts WHERE post_name = %s", $post_name);

        return $wpdb->get_results($sql, ARRAY_A);
    }

    /**
     * Remove frontend assets file or folder to regenerate assets
     * If $post_id is false or $post_type is FSE templates, remove directory otherwise remove file by post_id
     * @param integer $post_id
     * @param string $post_type
     * @return void
     */
    public function remove_frontend_assets($post_id = false, $post_type = false, $clean_frontend = false)
    {
        if ($post_type === false || ($post_type === 'wp_template' || $post_type === 'wp_template_part')) {
            AssetGeneration::remove_file($this->fse_style_dir . $this->get_fse_filename($post_id));
        } else if ($post_id) {
            AssetGeneration::remove_file($this->style_dir . $this->get_eb_filename($post_id));
        }

        if ($clean_frontend === true) {
            AssetGeneration::remove_directory_files($this->frontend_style_dir);
        } else {
            AssetGeneration::remove_file($this->frontend_style_dir . $this->get_frontend_filename($post_id));
        }
    }

    /**
     * Write css for widget
     */
    public function eb_widget_dynamic_sidebar_params($params)
    {
        global $wp_registered_widgets;

        $widget_id      = $params[0]['widget_id'];
        $widget_obj     = $wp_registered_widgets[$widget_id];
        $widget_options = get_option($widget_obj['callback'][0]->option_name);

        // Find the specific instance for this widget ID
        $widget_number = $widget_obj['params'][0]['number'];
        $instance      = $widget_options[$widget_number];

        $parsed_content = isset($instance['content']) ? parse_blocks($instance['content']) : [];
        if (is_array($parsed_content) && ! empty($parsed_content)) {
            $eb_blocks          = [];
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
    public function get_generatepress_element($post_id)
    {
        if (empty($post_id)) {
            return $post_id;
        }

        $display_conditions = get_post_meta($post_id, '_generate_element_display_conditions', true);
        $display_conditions = $display_conditions ? $display_conditions : [];
        $exclude_conditions = get_post_meta($post_id, '_generate_element_exclude_conditions', true);
        $exclude_conditions = $exclude_conditions ? $exclude_conditions : [];
        $user_conditions    = get_post_meta($post_id, '_generate_element_user_conditions', true);
        $user_conditions    = $user_conditions ? $user_conditions : [];

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
     * Function for generate Styles for Templately Theme Builder Templates
     * @since 5.0.8
     * @param integer $template_id
     * @param string $location
     * @param object $template
     * @return void
     */
    public function templately_templates($template_id, $location, $template)
    {
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
    public function eb_add_widget_css_footer()
    {
        $this->enqueue_widget_styles();
    }

    public function enqueue_widget_styles()
    {
        global $post;
        if (! empty($post) && ! empty($post->ID)) {
            $css_file = $this->frontend_style_dir . $this->get_widget_frontend_filename($post->ID);
            $css_url  = $this->frontend_style_url . $this->get_widget_frontend_filename($post->ID);

            $frontend_handle = 'essential-blocks-widgte-frontend-style';
            if (file_exists($css_file)) {
                wp_enqueue_style($frontend_handle, $css_url, [], filemtime($css_file));
                $deps[] = $frontend_handle;
            } else {
                $deps[] = $this->generate_frontend_css_file($this->widget_block_names, $frontend_handle, $css_file, $css_url);
            }

            if (file_exists($this->style_dir . $this->prefix . '-widget.min.css')) {
                wp_enqueue_style('eb-widget-style', $this->style_url . $this->prefix . '-widget.min.css', $deps, substr(md5(microtime(true)), 0, 10), 'all');
            }
        }
    }

    public function get_fse_filename($post_id)
    {
        return $this->fse_prefix . '-' . trim($post_id) . '.min.css';
    }

    public function get_eb_filename($post_id)
    {
        return $this->prefix . '-' . trim($post_id) . '.min.css';
    }

    public function get_frontend_filename($post_id)
    {
        return $this->frontend_prefix . '-' . trim($post_id) . '.min.css';
    }

    public function get_widget_frontend_filename($post_id)
    {
        return $this->frontend_prefix . '-widget-' . trim($post_id) . '.min.css';
    }

    /**
     * Get gutenberg_id from nx press bar
     */
    public function get_gutenberg_id_from_nx()
    {
        $nx_posts = \NotificationX\Core\Database::get_instance()->query()
            ->from('nx_posts')
            ->where('enabled', true)
            ->where('source', 'press_bar')
            ->get();
        $gutenberg_ids = [];
        if (!empty($nx_posts)) {
            foreach ($nx_posts as $nx_post) {
                $data = maybe_unserialize($nx_post->data);
                if (!empty($data['gutenberg_id'])) {
                    $gutenberg_ids[] = $data['gutenberg_id'];
                }
            }
        }
        return $gutenberg_ids;
    }
}
