<?php

namespace EssentialBlocks\Modules;

use EssentialBlocks\Integrations\AssetGeneration;
use EssentialBlocks\Utils\CSSParser;

final class StyleHandler
{
    private static $instance;

    private $prefix = 'eb-style';
    private $eb_style_dir;
    private $eb_style_url;
    private $fixed_prefix = 'frontend';
    private $eb_fixed_style_dir;
    private $eb_fixed_style_url;

    private $block_names             = [  ];
    private $templately_template_ids = [  ];

    /**
     * Holds block styles array
     *
     * @var array
     */
    public static $_block_styles = [  ];

    /**
     * store generatepress elements id
     */
    private $gp_ids = [  ];

    public static function init()
    {
        if ( null === self::$instance ) {
            self::$instance = new self;
        }

        return self::$instance;
    }

    public function __construct()
    {
        $upload_dir = wp_upload_dir();

        $this->eb_style_dir = $upload_dir[ 'basedir' ] . DIRECTORY_SEPARATOR . $this->prefix . DIRECTORY_SEPARATOR;
        $this->eb_style_url = set_url_scheme( $upload_dir[ 'baseurl' ] ) . '/' . $this->prefix . '/';

        $this->eb_fixed_style_dir = $this->eb_style_dir . $this->fixed_prefix . DIRECTORY_SEPARATOR;
        $this->eb_fixed_style_url = $this->eb_style_url . $this->fixed_prefix . '/';

        add_filter( 'dynamic_sidebar_params', [ $this, 'eb_widget_dynamic_sidebar_params' ] );
        add_action( 'save_post', [ $this, 'on_save_post' ], 10, 3 );
        add_action( 'wp', [ $this, 'generate_post_content' ] );

        add_action( 'eb_after_save_responsiveBreakpoints_settings', [ $this, 'generate_style_for_breakpoint_change' ], 10, 1 );
        add_action( 'eb_after_reset_responsiveBreakpoints_settings', [ $this, 'reset_breakpoint' ], 10 );
        add_filter( 'generate_element_post_id', [ $this, 'get_generatepress_element' ], 99 );
        // FSE assets generation
        add_action( 'init', function () {
            if ( function_exists( 'wp_is_block_theme' ) && wp_is_block_theme() ) {
                add_filter( "404_template", [ $this, 'fse_assets_generation' ], 99, 3 );
                add_filter( "archive_template", [ $this, 'fse_assets_generation' ], 99, 3 );
                add_filter( "category_template", [ $this, 'fse_assets_generation' ], 99, 3 );
                add_filter( "frontpage_template", [ $this, 'fse_assets_generation' ], 99, 3 );
                add_filter( "home_template", [ $this, 'fse_assets_generation' ], 99, 3 );
                add_filter( "index_template", [ $this, 'fse_assets_generation' ], 99, 3 );
                add_filter( "page_template", [ $this, 'fse_assets_generation' ], 99, 3 );
                add_filter( "search_template", [ $this, 'fse_assets_generation' ], 99, 3 );
                add_filter( "single_template", [ $this, 'fse_assets_generation' ], 99, 3 );
                add_filter( "singular_template", [ $this, 'fse_assets_generation' ], 99, 3 );
                add_filter( "tag_template", [ $this, 'fse_assets_generation' ], 99, 3 );
                add_filter( "taxonomy_template", [ $this, 'fse_assets_generation' ], 99, 3 );
            }
        }, 999 );
        add_action( 'wp_footer', [ $this, 'eb_add_widget_css_footer' ] );

        //Enqueue Styles based on Block theme or not
        add_action( 'wp_enqueue_scripts', [ $this, 'enqueue_frontend_assets' ] );

        //For Templately templates
        add_action( 'templately_printed_location', [ $this, 'templately_templates' ], 10, 3 );
    }

    public function templately_templates( $template_id, $location, $template )
    {
        $post = get_post( $template_id );
        if ( is_object( $post ) && property_exists( $post, 'post_content' ) ) {
            $content        = $post->post_content;
            $parsed_content = parse_blocks( $content );
            $this->write_css_from_content( $post, $template_id, $parsed_content );
            $this->templately_template_ids[  ] = $template_id;
        }
    }

    public function eb_add_widget_css_footer()
    {
        if ( file_exists( $this->eb_style_dir . $this->prefix . '-widget.min.css' ) ) {
            wp_enqueue_style( 'eb-widget-style', $this->eb_style_url . $this->prefix . '-widget.min.css', [  ], substr( md5( microtime( true ) ), 0, 10 ), 'all' );
        }
    }

    /**
     * Write css for widget
     */
    public function eb_widget_dynamic_sidebar_params( $params )
    {
        global $wp_registered_widgets;

        $widget_id      = $params[ 0 ][ 'widget_id' ];
        $widget_obj     = $wp_registered_widgets[ $widget_id ];
        $widget_options = get_option( $widget_obj[ 'callback' ][ 0 ]->option_name );

        // Find the specific instance for this widget ID
        $widget_number = $widget_obj[ 'params' ][ 0 ][ 'number' ];
        $instance      = $widget_options[ $widget_number ];

        $parsed_content = isset( $instance[ 'content' ] ) ? parse_blocks( $instance[ 'content' ] ) : [  ];
        if ( is_array( $parsed_content ) && ! empty( $parsed_content ) ) {
            $eb_blocks          = [  ];
            $recursive_response = CSSParser::eb_block_style_recursive( $parsed_content, $eb_blocks, $this->block_names );
            unset( $recursive_response[ "reusableBlocks" ] );
            $style = CSSParser::blocks_to_style_array( $recursive_response );

            //Write CSS file for Widget
            $this->single_file_css_generator( $style, $this->eb_style_dir, $this->prefix . '-widget.min.css' );
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
    public function get_generatepress_element( $post_id )
    {
        if ( empty( $post_id ) ) {
            return;
        }

        $display_conditions = get_post_meta( $post_id, '_generate_element_display_conditions', true );
        $display_conditions = $display_conditions ? $display_conditions : [  ];
        $exclude_conditions = get_post_meta( $post_id, '_generate_element_exclude_conditions', true );
        $exclude_conditions = $exclude_conditions ? $exclude_conditions : [  ];
        $user_conditions    = get_post_meta( $post_id, '_generate_element_user_conditions', true );
        $user_conditions    = $user_conditions ? $user_conditions : [  ];

        $display = \GeneratePress_Conditions::show_data(
            $display_conditions,
            $exclude_conditions,
            $user_conditions
        );

        if ( $display ) {
            $this->gp_ids[  ] = $post_id;
            $post             = get_post( $post_id );
            $parsed_content   = parse_blocks( $post->post_content );
            $this->write_css_from_content( $post, $post_id, $parsed_content );
        }

        return $post_id;
    }

    /**
     * Generate FSE Assets
     */
    public function fse_assets_generation( $template, $type, $templates )
    {
        $block_template = resolve_block_template( $type, $templates, $template );
        if ( ! empty( $block_template ) ) {
            $parsed_content = parse_blocks( $block_template->content );
            if ( is_array( $parsed_content ) && ! empty( $parsed_content ) ) {
                foreach ( $parsed_content as $content ) {
                    if ( ( 'core/template-part' == $content[ 'blockName' ] ) || ( 'core/template' == $content[ 'blockName' ] ) ) {
                        $post_ids = isset( $content[ 'attrs' ][ 'slug' ] ) ? self::eb_get_post_content_by_post_name( $content[ 'attrs' ][ 'slug' ] ) : [  ];

                        if ( ! empty( $post_ids ) ) {
                            foreach ( $post_ids as $id ) {
                                $post_id        = (int) $id[ 'ID' ];
                                $post           = get_post( $post_id );
                                $parsed_content = parse_blocks( $post->post_content );
                                $this->write_css_from_content( $post, $post_id, $parsed_content );
                            }
                        }
                    } else {
                        $post_ids = self::eb_get_post_content_by_post_name( $block_template->slug );
                        if ( ! empty( $post_ids ) ) {
                            foreach ( $post_ids as $id ) {
                                $post_id        = (int) $id[ 'ID' ];
                                $post           = get_post( $post_id );
                                $parsed_content = parse_blocks( $post->post_content );
                                $this->write_css_from_content( $post, $post_id, $parsed_content );
                            }
                        }
                    }
                }
            }
        }

        return $template;
    }

    /**
     * Write CSS
     */
    public function write_css_from_content( $post, $post_id, $parsed_content )
    {
        $eb_blocks          = [  ];
        $recursive_response = CSSParser::eb_block_style_recursive( $parsed_content, $eb_blocks, $this->block_names );
        $reusable_Blocks    = ! empty( $recursive_response[ 'reusableBlocks' ] ) ? $recursive_response[ 'reusableBlocks' ] : [  ];
        // remove empty reusable blocks
        $reusable_Blocks = array_filter( $reusable_Blocks, function ( $v ) {
            return ! empty( $v );
        } );
        unset( $recursive_response[ "reusableBlocks" ] );
        $style       = CSSParser::blocks_to_style_array( $recursive_response );
        $reusableIds = $reusable_Blocks ? array_keys( $reusable_Blocks ) : [  ];
        if ( ! empty( $reusableIds ) ) {
            update_option( '_eb_reusable_block_ids', $reusableIds );
        }
        update_post_meta( $post_id, '_eb_reusable_block_ids', $reusableIds );
        $this->write_block_css( $style, $post ); //Write CSS file for this page

        if ( ! empty( $reusable_Blocks ) ) {
            foreach ( $reusable_Blocks as $blockId => $block ) {
                $style = CSSParser::blocks_to_style_array( $block );
                $this->write_reusable_block_css( $style, $blockId );
            }
        }
    }

    /**
     * Save Widget CSS when Widget is saved
     * @return void
     * @since 3.5.3
     */
    public function after_save_widget( $id, $sidebar_id, $request, $creating )
    {
        $parsed_content = isset( $request[ 'instance' ][ 'raw' ][ 'content' ] ) ? parse_blocks( $request[ 'instance' ][ 'raw' ][ 'content' ] ) : [  ];
        if ( is_array( $parsed_content ) && ! empty( $parsed_content ) ) {
            $eb_blocks          = [  ];
            $recursive_response = CSSParser::eb_block_style_recursive( $parsed_content, $eb_blocks, $this->block_names );
            unset( $recursive_response[ "reusableBlocks" ] );
            $style = CSSParser::blocks_to_style_array( $recursive_response );
            //Write CSS file for Widget
            $this->single_file_css_generator( $style, $this->eb_style_dir, $this->prefix . '-widget.min.css' );
        }
    }

    /**
     * Load Dependencies
     */
    private function load_style_handler_dependencies()
    {
        require_once plugin_dir_path( __FILE__ ) . 'includes/class-parse-css.php';
    }

    /**
     * Enqueue frontend css for post if have one
     * @return void
     * @since 1.0.2
     */
    public function enqueue_frontend_assets()
    {
        global $post;

        $deps = apply_filters( 'eb_generated_css_frontend_deps', [  ] );

        if ( ! empty( $post ) && ! empty( $post->ID ) ) {
            //Page/Post Predefined Style Enqueue
            $css_file = $this->eb_fixed_style_dir . $this->fixed_prefix . '-' . $post->ID . '.min.css';
            $css_url  = $this->eb_fixed_style_url . $this->fixed_prefix . '-' . $post->ID . '.min.css';

            if ( file_exists( $css_file ) ) {
                wp_enqueue_style( 'essential-blocks-frontend-style', $css_url, [  ], filemtime( $css_file ) );
                $deps[  ] = 'essential-blocks-frontend-style';
            } else {
                $all_blocks = array_unique( $this->block_names );

                $css = '';
                if ( count( $all_blocks ) > 0 ) {
                    foreach ( $all_blocks as $block ) {
                        $blockname = '';
                        $dir       = '';
                        if ( defined( 'ESSENTIAL_BLOCKS_PRO_DIR_PATH' ) && str_starts_with( $block, 'essential-blocks/pro-' ) ) {
                            $split_name = explode( '/', $block );
                            $blockname  = str_replace( 'pro-', '', $split_name[ 1 ] );
                            $dir        = ESSENTIAL_BLOCKS_PRO_DIR_PATH . 'assets' . DIRECTORY_SEPARATOR . 'blocks' . DIRECTORY_SEPARATOR . $blockname . DIRECTORY_SEPARATOR . 'style.css';
                        } else if ( str_starts_with( $block, 'essential-blocks/' ) ) {
                            $split_name = explode( '/', $block );
                            $blockname  = $split_name[ 1 ];
                            $dir        = ESSENTIAL_BLOCKS_DIR_PATH . 'assets' . DIRECTORY_SEPARATOR . 'blocks' . DIRECTORY_SEPARATOR . $split_name[ 1 ] . DIRECTORY_SEPARATOR . 'style.css';
                        } else {
                            continue;
                        }
                        if ( file_exists( $dir ) && strlen( $blockname ) > 0 ) {
                            $css .= apply_filters( "eb_fixed_frontend_styles/{$blockname}", file_get_contents( $dir ), $blockname, );
                        }
                    }
                }

                //Write CSS File and Enqueue
                if ( strlen( trim( $css ) ) > 0 ) {
                    if ( ! file_exists( $this->eb_fixed_style_dir ) ) {
                        mkdir( $this->eb_fixed_style_dir );
                    }

                    //Replace Breakpoints
                    $breakpoints = [
                        'tablet' => CSSParser::get_responsive_breakpoints( 'tablet' ),
                        'mobile' => CSSParser::get_responsive_breakpoints( 'mobile' )
                     ];

                    $all_breakpoints = [
                        '1024' => $breakpoints[ 'tablet' ],
                        '1023' => $breakpoints[ 'tablet' ] - 1,
                        '1025' => $breakpoints[ 'tablet' ] + 1,
                        '767'  => $breakpoints[ 'mobile' ],
                        '768'  => $breakpoints[ 'mobile' ] + 1
                     ];

                    foreach ( $all_breakpoints as $old => $new ) {
                        $css = preg_replace( "/(@media[^{]+)width:\s*" . preg_quote( $old ) . "px/", "$1width:" . $new . "px", $css, -1, $count );
                    }
                    file_put_contents( $css_file, $css );
                    //Enqueue
                    wp_enqueue_style( 'essential-blocks-frontend-style', $css_url, [  ], filemtime( $css_file ) );
                    $deps[  ] = 'essential-blocks-frontend-style';
                }
            }

            //Page/Post Generated Style Enqueue
            if ( file_exists( $this->eb_style_dir . $this->prefix . '-' . $post->ID . '.min.css' ) ) {
                wp_enqueue_style( 'eb-block-style-' . $post->ID, $this->eb_style_url . $this->prefix . '-' . $post->ID . '.min.css', $deps, substr( md5( microtime( true ) ), 0, 10 ) );
            }

            // Reusable block Style Enqueues
            $reusableIds         = get_post_meta( $post->ID, '_eb_reusable_block_ids', true );
            $reusableIds         = ! empty( $reusableIds ) ? $reusableIds : [  ];
            $templateReusableIds = get_option( '_eb_reusable_block_ids', [  ] );
            $reusableIds         = array_unique( array_merge( $reusableIds, $templateReusableIds ) );
            if ( ! empty( $reusableIds ) ) {
                foreach ( $reusableIds as $reusableId ) {
                    if ( file_exists( $this->eb_style_dir . 'reusable-blocks/eb-reusable-' . $reusableId . '.min.css' ) ) {
                        wp_enqueue_style( 'eb-reusable-block-style-' . $reusableId, $this->eb_style_url . 'reusable-blocks/eb-reusable-' . $reusableId . '.min.css', $deps, substr( md5( microtime( true ) ), 0, 10 ) );
                    }
                }
            }
        }

        // generatepress elements
        if ( in_array( 'gp-premium/gp-premium.php', apply_filters( 'active_plugins', get_option( 'active_plugins' ) ) ) ) {
            $gp_elements = get_posts( [ 'post_type' => 'gp_elements' ] );
            if ( is_array( $gp_elements ) && ! empty( $gp_elements ) ) {
                foreach ( $gp_elements as $element ) {
                    if ( file_exists( $this->eb_style_dir . $this->prefix . '-' . $element->ID . '.min.css' ) ) {
                        wp_enqueue_style( 'eb-block-style-' . $element->ID, $this->eb_style_url . $this->prefix . '-' . $element->ID . '.min.css', $deps, substr( md5( microtime( true ) ), 0, 10 ) );
                    }
                }
            }
        }

        //Blocksy theme support
        if ( in_array( 'blocksy-companion-pro/blocksy-companion.php', apply_filters( 'active_plugins', get_option( 'active_plugins' ) ) ) ) {
            $ct_elements = get_posts( [ 'post_type' => 'ct_content_block' ] );
            if ( is_array( $ct_elements ) && ! empty( $ct_elements ) ) {
                foreach ( $ct_elements as $element ) {
                    if ( file_exists( $this->eb_style_dir . $this->prefix . '-' . $element->ID . '.min.css' ) ) {
                        wp_enqueue_style(
                            'eb-block-style-' . $element->ID,
                            $this->eb_style_url . $this->prefix . '-' . $element->ID . '.min.css',
                            $deps,
                            substr( md5( microtime( true ) ), 0, 10 )
                        );
                    }
                }
            }
        }

        //Template Templates
        if ( is_array( $this->templately_template_ids ) && count( $this->templately_template_ids ) > 0 ) {
            foreach ( $this->templately_template_ids as $template ) {
                if ( file_exists( $this->eb_style_dir . $this->prefix . '-' . $template . '.min.css' ) ) {
                    wp_enqueue_style(
                        'eb-block-style-' . $template,
                        $this->eb_style_url . $this->prefix . '-' . $template . '.min.css',
                        $deps,
                        substr( md5( microtime( true ) ), 0, 10 )
                    );
                }
            }
        }

        //Widget Style Enqueue
        if ( file_exists( $this->eb_style_dir . $this->prefix . '-widget.min.css' ) ) {
            wp_enqueue_style( 'eb-widget-style', $this->eb_style_url . $this->prefix . '-widget.min.css', $deps, substr( md5( microtime( true ) ), 0, 10 ) );
        }

        //FSE Style Enqueue
        if ( function_exists( 'wp_is_block_theme' ) && wp_is_block_theme() && file_exists( $this->eb_style_dir . $this->prefix . '-edit-site.min.css' ) ) {
            wp_enqueue_style( 'eb-fullsite-style', $this->eb_style_url . $this->prefix . '-edit-site.min.css', $deps, substr( md5( microtime( true ) ), 0, 10 ) );
        }

        /**
         * Hooks assets for enqueue in frontend
         *
         * @param $path string
         * @param $url string
         *
         * @since 3.0.0
         */
        do_action( 'eb_frontend_assets', $this->eb_style_dir, $this->eb_style_url );
    }

    /**
     * Get post content when page is saved
     */
    public function on_save_post( $post_id, $post, $update )
    {
        $post_type = get_post_type( $post_id );

        //If This page is draft, return
        if ( isset( $post->post_status ) && 'auto-draft' == $post->post_status ) {
            return;
        }

        // Autosave, do nothing
        if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
            return;
        }

        // Return if it's a post revision
        if ( false !== wp_is_post_revision( $post_id ) ) {
            return;
        }

        $parsed_content = $this->get_parsed_content( $post_id, $post, $post_type );

        if ( is_array( $parsed_content ) && ! empty( $parsed_content ) ) {
            $this->write_css_from_content( $post, $post_id, $parsed_content );
        }

        //Remove frontend assets on save post/FSE
        $this->remove_frontend_assets( $post_id, $post_type );
    }

    private function get_parsed_content( $post_id, $post, $post_type )
    {
        if ( $post_type === 'wp_template_part' || $post_type === 'wp_template' ) {
            $post = get_post( $post_id );
        }

        $parsed_content = parse_blocks( $post->post_content );

        if ( empty( $parsed_content ) ) {
            delete_post_meta( $post_id, '_eb_reusable_block_ids' );
        }

        return $parsed_content;
    }

    /**
     * Get post content when page is load in frontend
     */
    public function generate_post_content()
    {
        $post_id = get_the_ID();
        if ( $post_id ) {
            $post_type = get_post_type( $post_id );
            $post      = get_post( $post_id );
            //If This page is draft, return
            if ( isset( $post->post_status ) && 'auto-draft' == $post->post_status ) {
                return;
            }

            // Return if it's a post revision
            if ( false !== wp_is_post_revision( $post_id ) ) {
                return null;
            }

            $parsed_content = $this->get_parsed_content( $post_id, $post, $post_type );

            if ( is_array( $parsed_content ) && ! empty( $parsed_content ) ) {
                $this->write_css_from_content( $post, $post_id, $parsed_content );
            }
        }
    }

    /**
     * Ajax callback to write css in upload directory
     * @retun void
     * @since 1.0.2
     */
    private function write_block_css( $block_styles, $post )
    {
        //Write CSS for FSE
        if ( isset( $post->post_type ) && ( $post->post_type === "wp_template_part" || $post->post_type === "wp_template" && ! empty( $block_styles ) ) ) {
            $this->single_file_css_generator( $block_styles, $this->eb_style_dir, $this->prefix . '-edit-site.min.css' );
        } // Write CSS for Page/Posts
        else {
            if ( ! empty( $css = CSSParser::build_css( $block_styles ) ) ) {
                if ( ! file_exists( $this->eb_style_dir ) ) {
                    mkdir( $this->eb_style_dir );
                }
                file_put_contents( $this->eb_style_dir . $this->prefix . '-' . abs( $post->ID ) . '.min.css', $css );
            }
        }
    }

    /**
     * Write css for Reusable block
     * @retun void
     * @since 3.4.0
     */
    private function write_reusable_block_css( $block_styles, $id )
    {
        if ( isset( $block_styles ) && is_array( $block_styles ) ) {
            if ( ! empty( $css = CSSParser::build_css( $block_styles ) ) ) {
                $upload_dir = $this->eb_style_dir . 'reusable-blocks/';
                if ( ! file_exists( $upload_dir ) ) {
                    mkdir( $upload_dir, 0777, true );
                }
                file_put_contents( $upload_dir . DIRECTORY_SEPARATOR . 'eb-reusable-' . abs( $id ) . '.min.css', $css );
            }
        }
    }

    /**
     * Single file css generator
     * @retun void
     * @since 3.5.3
     */
    private function single_file_css_generator( $block_styles, $upload_dir, $filename )
    {
        $editSiteCssPath = $upload_dir . $filename;
        if ( file_exists( $editSiteCssPath ) ) {
            $existingCss = file_get_contents( $editSiteCssPath );
            $pattern     = "~\/\*(.*?)\*\/~";
            preg_match_all( $pattern, $existingCss, $result, PREG_PATTERN_ORDER );
            $allComments  = $result[ 0 ];
            $seperatedIds = [  ];
            foreach ( $allComments as $comment ) {
                $id = preg_replace( '/[^A-Za-z0-9\-]|Ends|Starts/', '', $comment );

                if ( strpos( $comment, "Starts" ) ) {
                    $seperatedIds[ $id ][ 'start' ] = $comment;
                } else if ( strpos( $comment, "Ends" ) ) {
                    $seperatedIds[ $id ][ 'end' ] = $comment;
                }
            }

            $seperateStyles = [  ];
            foreach ( $seperatedIds as $key => $ids ) {
                $seperateStyles[  ][ $key ] = isset( $block_styles[ $key ] ) ? $block_styles[ $key ] : [  ];
            }

            self::$_block_styles = array_merge( self::$_block_styles, $block_styles );

            if ( ! empty( $css = CSSParser::build_css( self::$_block_styles ) ) ) {
                if ( ! file_exists( $upload_dir ) ) {
                    mkdir( $upload_dir );
                }

                file_put_contents( $editSiteCssPath, $css );
            }
        } else {
            if ( ! empty( $css = CSSParser::build_css( $block_styles ) ) ) {
                if ( ! file_exists( $this->eb_style_dir ) ) {
                    mkdir( $this->eb_style_dir );
                }

                file_put_contents( $editSiteCssPath, $css );
            }
        }
    }

    /**
     * Get post id by post_name for template
     */
    public static function eb_get_post_content_by_post_name( $post_name )
    {
        global $wpdb;
        $sql = $wpdb->prepare( "SELECT ID FROM {$wpdb->prefix}posts WHERE post_name = %s", $post_name );

        return $wpdb->get_results( $sql, ARRAY_A );
    }

    /**
     * Generate all assets after custom breakpoint change
     *
     * @param string $breakpoints
     *
     * @return void
     * @since 4.5.0
     */
    public function generate_style_for_breakpoint_change()
    {
        $this->remove_frontend_assets();
    }

    public function reset_breakpoint()
    {
        $this->remove_frontend_assets();
    }

    public function remove_frontend_assets( $post_id = false, $post_type = false )
    {
        if ( $post_type === false || ( $post_type === 'wp_template' || $post_type === 'wp_template_part' ) ) {
            AssetGeneration::remove_directory_files( $this->eb_fixed_style_dir );
        } else if ( $post_id ) {
            AssetGeneration::remove_file( $this->eb_fixed_style_dir . $this->fixed_prefix . '-' . $post_id . '.min.css' );
        }
    }
}
