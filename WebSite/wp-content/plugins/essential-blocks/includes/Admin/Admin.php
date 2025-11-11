<?php

namespace EssentialBlocks\Admin;

use PriyoMukul\WPNotice\Notices;
use EssentialBlocks\Utils\Helper;
use EssentialBlocks\Utils\Settings;
use PriyoMukul\WPNotice\Utils\CacheBank;
use EssentialBlocks\Traits\HasSingletone;
use EssentialBlocks\Dependencies\Insights;
use PriyoMukul\WPNotice\Utils\NoticeRemover;

// use EssentialBlocks\Dependencies\WPNotice\Notices;

class Admin
{

    use HasSingletone;

    /**
     * Plugin Usage Insight
     *
     * @var Insights|null
     */
    private $insights = null;
    private static $cache_bank;

    public function __construct()
    {
        $this->plugin_usage_insights();

        require_once ESSENTIAL_BLOCKS_DIR_PATH . 'includes/Dependencies/wpnotice.php';

        self::$cache_bank = CacheBank::get_instance();

        // Remove OLD notice from 1.0.0 (if other WPDeveloper plugin has notice)
        NoticeRemover::get_instance( '1.0.0' );

        add_action( 'init', [ $this, 'notices' ] );

        add_action( 'admin_menu', [ $this, 'admin_menu' ] );

        // Update message for showing notice for new release
        add_action( 'in_plugin_update_message-essential-blocks/essential-blocks.php', [ $this, 'plugin_update' ], 10, 2 );

        add_filter( 'block_categories_all', [ $this, 'register_category' ], 99, 2 );

        add_action( 'admin_enqueue_scripts', [ $this, 'enqueue_styles' ] );
        add_action( 'admin_enqueue_scripts', [ $this, 'enqueue_scripts' ] );

        add_action( 'wp_ajax_save_eb_admin_options', [ $this, 'save' ] );
        add_action( 'wp_ajax_get_eb_admin_options', [ $this, 'get' ] );
        add_action( 'wp_ajax_eb_save_quick_toolbar_blocks', [ $this, 'eb_save_quick_toolbar_blocks' ] );
        add_action( 'wp_ajax_hide_pattern_library', [ $this, 'hide_pattern_library' ] );
        add_action( 'wp_ajax_reset_eb_admin_options', [ $this, 'reset' ] );
        add_action( 'wp_ajax_get_eb_admin_templates', [ $this, 'templates' ] );
        add_action( 'wp_ajax_get_eb_admin_template_count', [ $this, 'template_count' ] );
        add_action( 'wp_ajax_eb_admin_promotion', [ $this, 'eb_admin_promotion' ] );
        add_action( 'plugin_action_links', [ $this, 'eb_menu_action_links' ], 10, 2 );
        add_action( 'eb_admin_page_setting', [ $this, 'eb_show_admin_menu_notice' ] );
        add_action( 'in_admin_header', [ $this, 'remove_admin_notice' ], 99 );

        // Redirect after Plugin is updated
        add_action( 'admin_init', [ $this, 'maybe_redirect' ] );
        add_action( 'admin_init', [ $this, 'enable_notices' ], 11 );
        add_action( 'admin_footer', [ $this, 'eb_whats_new_notice' ] );
    }

    public function enable_notices()
    {
        // called plugin insights
        // $this->plugin_usage_insights();

        try {
            $this->notices();
        } catch ( \Exception $e ) {
            unset( $e );
        }
    }

    public function maybe_redirect()
    {
        // Do not redirect AJAX requests
        if ( defined( 'DOING_AJAX' ) && DOING_AJAX ) {
            return;
        }

        if ( get_transient( 'essential_block_maybe_whatsnew_redirect' ) == true ) {
            delete_transient( 'essential_block_maybe_whatsnew_redirect' );

            if ( ! is_multisite() ) {
                wp_safe_redirect( add_query_arg( [ 'page' => 'welcome-essential-blocks' ], admin_url( 'admin.php' ) ) );
            }
        }
    }

    public function admin_menu()
    {
        $eb_version = get_option( 'essential_blocks_version' );

        $menu_notice = ( $this->menu_notice_should_show() ) ? '<span class="eb-menu-notice">1</span>' : '';
        add_menu_page(
            __( 'Essential Blocks', 'essential-blocks' ),
            /* translators: 1: notice number */
            sprintf( __( 'Essential Blocks %s', 'essential-blocks' ), $menu_notice ),
            'activate_plugins',
            'essential-blocks',
            [ $this, 'admin_page' ],
            ESSENTIAL_BLOCKS_ADMIN_URL . 'assets/images/eb-icon-21x21.svg',
            60
        );

        // Welcome Page
        add_submenu_page(
            '',
            'Welcome Page',
            'Welcome Page',
            'activate_plugins',
            'welcome-essential-blocks',
            [ $this, 'welcome_page' ]
        );
    }

    public function admin_page()
    {
        Helper::views( 'admin', [  ] );
    }

    public function welcome_page()
    {
        Helper::views( 'welcome', [  ] );
    }

    /**
     * Menu Action Links
     *
     * @since 4.1.0
     */
    public function eb_menu_action_links( $links, $file )
    {
        if ( $file === ESSENTIAL_BLOCKS_PLUGIN_BASENAME ) {
            $settings_links = sprintf(
                '<a href="%1$s">Settings</a>',
                admin_url( 'admin.php?page=essential-blocks' )
            );

            array_unshift( $links, $settings_links );

            if ( ! class_exists( 'EssentialBlocks\Pro\Plugin' ) ) {
                $go_pro_link = sprintf(
                    '<a target="_blank" href="%1$s"><strong style="color:#5e2eff;display: inline-block;">Go Pro</strong></a>',
                    ESSENTIAL_BLOCKS_UPGRADE_PRO_URL
                );
                array_push( $links, $go_pro_link );
            }
        }

        return $links;
    }

    /**
     * Register Block Category
     */
    public function register_category( $categories, $post )
    {
        // Add another category only if Essential Pro Block is not active
        if ( ! defined( 'ESSENTIAL_BLOCKS_IS_PRO_ACTIVE' ) || ! ESSENTIAL_BLOCKS_IS_PRO_ACTIVE ) {
            array_unshift( $categories, [
                'slug'  => 'essential-blocks-pro',
                'title' => __( 'Essential Blocks Pro', 'essential-blocks' ),
                'icon'  => ESSENTIAL_BLOCKS_ICON
             ] );
        }

        array_unshift( $categories, [
            'slug'  => 'essential-blocks',
            'title' => __( 'Essential Blocks', 'essential-blocks' ),
            'icon'  => ESSENTIAL_BLOCKS_ICON
         ] );

        return $categories;
    }

    /**
     * Update message for showing notice for new release
     */
    public function plugin_update( $plugin_data, $new_data )
    {
        require_once ABSPATH . 'wp-admin/includes/plugin-install.php';
        $upgrade_notice = false;
        if ( isset( $new_data->upgrade_notice ) ) {
            $upgrade_notice = $new_data->upgrade_notice;
        }

        Helper::version_update_warning( $plugin_data[ 'Version' ], $plugin_data[ 'new_version' ], $upgrade_notice );
    }

    /**
     * WP Insights Integration
     */
    public function plugin_usage_insights()
    {
        $this->insights = Insights::get_instance(
            ESSENTIAL_BLOCKS_FILE,
            [
                'opt_in'       => true,
                'goodbye_form' => true,
                'item_id'      => 'fa45e4a52a650579e98c'
             ]
        );

        add_action( 'admin_init', function () {
            $this->insights->set_notice_options(
                [
                    'notice'       => __( 'Congratulations, you’ve successfully installed <strong>Essential Blocks for Gutenberg</strong>. We got <strong>2500+ FREE Gutenberg ready Templates</strong> waiting for you <span class="gift-icon">&#127873;</span>', 'essential-blocks' ),
                    'extra_notice' => __(
                        'We collect non-sensitive diagnostic data and plugin usage information.
                Your site URL, WordPress & PHP version, plugins & themes and email address to send you exciting deals. This data lets us make sure this plugin always stays compatible with the most
                popular plugins and themes.',
                        'essential-blocks'
                    ),
                    'yes'          => __( 'Send me FREE Templates', 'wpinsight' ),
                    'no'           => __( 'I don\'t want FREE Templates', 'wpinsight' )
                 ]
            );
        } );

        $this->insights->init();
    }

    /**
     * Admin notices for Review and others.
     *
     * @return void
     */
    public function notices()
    {
        global $pagenow;
        if ( $pagenow === 'post.php' || $pagenow === 'post-new.php' || $pagenow === 'site-editor.php' ) {
            return;
        }
        $notices = new Notices(
            [
                'id'             => 'essential_blocks',
                'storage_key'    => 'notices',
                'lifetime'       => 3,
                'priority'       => 3,
                'stylesheet_url' => ESSENTIAL_BLOCKS_URL . 'assets/css/notices.css',
                'styles'         => ESSENTIAL_BLOCKS_URL . 'assets/css/notices.css'
                // 'dev_mode'       => true
             ]
        );

        /**
         * Milestone Sale
         * Current: 200K Milestone LTD Sale Notice
         */
        $milestone_sale_message = '<p class="eb_notice_content" style="margin-top: 0; margin-bottom: 10px;"><strong>Best Time to Grab Essential Blocks LTD: $100 Off!</strong> Join in celebrating new milestone of Essential Blocks; powering up <strong>200k+</strong> happy users 🎉</p>
        <a class="button button-primary" href="https://essential-blocks.com/EB200K-admin-notice" target="_blank"><svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.0688 9.24424L14.2136 7.82369C14.2908 7.06574 14.3418 6.56525 14.3018 6.24991L14.3158 6.25C14.9698 6.25 15.5 5.69036 15.5 5C15.5 4.30964 14.9698 3.75 14.3158 3.75C13.6618 3.75 13.1316 4.30964 13.1316 5C13.1316 5.31222 13.24 5.5977 13.4193 5.81677C13.1619 5.98447 12.8254 6.33832 12.3188 6.87093L12.3188 6.87096L12.3188 6.87096C11.9286 7.28129 11.7334 7.48645 11.5158 7.51822C11.3952 7.53583 11.2723 7.51773 11.1609 7.46596C10.9599 7.37254 10.8259 7.1189 10.5578 6.61163L9.14509 3.93783C8.97975 3.6249 8.84136 3.36298 8.71658 3.15221C9.22844 2.87656 9.57895 2.31482 9.57895 1.66667C9.57895 0.746192 8.87203 0 8 0C7.12797 0 6.42105 0.746192 6.42105 1.66667C6.42105 2.31482 6.77156 2.87656 7.28342 3.15221C7.15864 3.36299 7.02027 3.62487 6.85491 3.93783L5.44215 6.61163C5.17413 7.1189 5.04011 7.37254 4.83911 7.46596C4.72774 7.51773 4.60485 7.53583 4.48424 7.51822C4.26656 7.48645 4.07143 7.28129 3.68118 6.87096C3.17463 6.33834 2.83807 5.98447 2.58068 5.81677C2.75998 5.5977 2.86842 5.31222 2.86842 5C2.86842 4.30964 2.33823 3.75 1.68421 3.75C1.03019 3.75 0.5 4.30964 0.5 5C0.5 5.69036 1.03019 6.25 1.68421 6.25L1.69819 6.24991C1.65817 6.56525 1.70917 7.06574 1.7864 7.82368L1.93116 9.24424C2.01151 10.0328 2.07833 10.783 2.16016 11.4583H13.8398C13.9217 10.783 13.9885 10.0328 14.0688 9.24424Z" fill="white"/>
<path d="M7.1411 15H8.8589C11.0978 15 12.2172 15 12.9642 14.2943C13.2902 13.9863 13.4966 13.431 13.6456 12.7083H2.35444C2.50341 13.431 2.70984 13.9863 3.03585 14.2943C3.78276 15 4.90221 15 7.1411 15Z" fill="white"/>
</svg> Grab the Deal</a>
        <button data-dismiss="true" class="dismiss-btn button button-link">No, I\'ll Pay Full Price Later</button>';
        $milestone_sale_notice = [
            'thumbnail' => ESSENTIAL_BLOCKS_URL . 'assets/images/eb-logo-full.svg',
            'html'      => $milestone_sale_message
         ];

        //Milestone Sale Notice Add
        $notices->add(
            'milestone_sale',
            $milestone_sale_notice,
            [
                'start'       => $notices->time(),
                'expire'      => strtotime( '11:59:59pm 30th September, 2025' ),
                'classes'     => 'eb-notice put-dismiss-notice',
                'dismissible' => true,
                'refresh'     => ESSENTIAL_BLOCKS_VERSION,
                'do_action'   => 'eb_milestone_sale_campaign',
                'display_if'  => ! ESSENTIAL_BLOCKS_IS_PRO_ACTIVE
             ]
        );

        /**
         * Early bird specials
         */
        $early_bird_message = '<p class="eb_notice_content" style="margin-top: 0; margin-bottom: 10px;">🔥 Essential Blocks PRO: Get access to premium Gutenberg blocks, features & website templates</p>
        <a class="button button-primary" href="https://essential-blocks.com/eb-pro-upgrade" target="_blank">Upgrade to PRO Now</a>
        <button data-dismiss="true" class="dismiss-btn button button-secondary">I Don\'t Want To Save Money</button>';
        $early_bird_notice = [
            'thumbnail' => ESSENTIAL_BLOCKS_URL . 'assets/images/eb-logo-full.svg',
            'html'      => $early_bird_message
         ];

        //Early bird Notice Add
        $notices->add(
            'early_bird',
            $early_bird_notice,
            [
                'start'       => $notices->strtotime( '+1 days' ),
                'classes'     => 'eb-notice put-dismiss-notice',
                'dismissible' => true,
                'refresh'     => ESSENTIAL_BLOCKS_VERSION,
                'do_action'   => 'eb_early_bird_campaign',
                'display_if'  => ! ESSENTIAL_BLOCKS_IS_PRO_ACTIVE
             ]
        );

        /**
         * Review Notice
         *
         * @var mixed $message
         */

        $message = __(
            'We hope you\'re enjoying Essential Block for Gutenberg! Could you please do us a BIG favor and give it a 5-star rating on WordPress to help us spread the word and boost our motivation?',
            'essential-blocks'
        );

        $_review_notice = [
            'thumbnail' => ESSENTIAL_BLOCKS_URL . 'assets/images/eb-logo-full.svg',
            'html'      => '<p>' . $message . '</p>',
            'links'     => [
                'later'            => [
                    'link'       => 'https://wordpress.org/support/plugin/essential-blocks/reviews/#new-post',
                    'label'      => __( 'Sure, you deserve it!', 'essential-blocks' ),
                    'icon_class' => 'dashicons dashicons-external',
                    'attributes' => [
                        'target' => '_blank',
                        'class'  => 'btn'
                        // 'data-dismiss' => false
                     ]
                 ],
                'allready'         => [
                    'label'      => __( 'I already did', 'essential-blocks' ),
                    'icon_class' => 'dashicons dashicons-smiley',
                    'attributes' => [
                        'data-dismiss' => true
                     ]
                 ],
                'maybe_later'      => [
                    'label'      => __( 'Maybe Later', 'essential-blocks' ),
                    'icon_class' => 'dashicons dashicons-calendar-alt',
                    'attributes' => [
                        'data-later' => true,
                        'class'      => 'dismiss-btn'
                     ]
                 ],
                'support'          => [
                    'link'       => 'https://wpdeveloper.com/support',
                    'attributes' => [
                        'target' => '_blank'
                     ],
                    'label'      => __( 'I need help', 'essential-blocks' ),
                    'icon_class' => 'dashicons dashicons-sos'
                 ],
                'never_show_again' => [
                    'label'      => __( 'Never show again', 'essential-blocks' ),
                    'icon_class' => 'dashicons dashicons-dismiss',
                    'attributes' => [
                        'data-dismiss' => true
                     ]
                 ]
             ]
         ];

        // Review Notice Add
        $notices->add(
            'review',
            $_review_notice,
            [
                'start'       => $notices->strtotime( '+7 days' ),
                // 'start'       => $notices->time(),
                'recurrence'  => 15,
                'dismissible' => true,
                'refresh'     => ESSENTIAL_BLOCKS_VERSION,
                'screens'     => [
                    'dashboard',
                    'plugins',
                    'themes',
                    'edit-page',
                    'edit-post',
                    'users',
                    'tools',
                    'options-general',
                    'nav-menus'
                 ]
             ]
        );

        /**
         * Opt-In Notice
         */
        if ( $this->insights != null ) {
            $notices->add(
                'opt_in',
                [ $this->insights, 'notice' ],
                [
                    'classes'     => 'updated put-dismiss-notice',
                    'start'       => $notices->strtotime( '+2 days' ),
                    // 'start'       => $notices->time(),
                    'dismissible' => true,
                    'refresh'     => ESSENTIAL_BLOCKS_VERSION,
                    'do_action'   => 'wpdeveloper_notice_clicked_for_essential-blocks',
                    'display_if'  => ! ESSENTIAL_BLOCKS_IS_PRO_ACTIVE
                 ]
            );
        }

        self::$cache_bank->create_account( $notices );
        self::$cache_bank->calculate_deposits( $notices );
    }

    public function enqueue_styles( $hook )
    {
        wpdev_essential_blocks()->assets->enqueue( 'menu', 'css/eb-menu.css' );
        $this->eb_admin_inline_css();
        if ( $hook !== 'toplevel_page_essential-blocks' ) {
            return;
        }

        wpdev_essential_blocks()->assets->enqueue( 'admin', 'css/admin.css' );
        wpdev_essential_blocks()->assets->enqueue( 'admin-custom', 'admin/dashboard/admin.css' );
    }

    public function enqueue_scripts( $hook )
    {
        wp_enqueue_script( 'jquery' );

        wpdev_essential_blocks()->assets->register( 'admin-controls-util', 'admin/controls/controls.js', [
            'essential-blocks-blocks-localize'
         ] );

        wpdev_essential_blocks()->assets->register( 'babel-bundle', 'vendors/js/bundle.babel.js' );
        wpdev_essential_blocks()->assets->register( 'vendor-bundle', 'vendors/js/bundles.js', [ 'essential-blocks-babel-bundle' ] );
        wpdev_essential_blocks()->assets->register( 'flv', 'js/react-player/flv.min.js' );
        wpdev_essential_blocks()->assets->register( 'dash', 'js/react-player/dash.all.min.js' );
        wpdev_essential_blocks()->assets->register( 'hls', 'js/react-player/hls.min.js' );

        if ( $hook !== 'toplevel_page_essential-blocks' ) {
            return;
        }
        wpdev_essential_blocks()->assets->enqueue(
            'admin',
            'admin/dashboard/admin.js',
            [
                'lodash',
                'essential-blocks-vendor-bundle',
                'essential-blocks-admin-controls-util',
                'essential-blocks-hls',
                'essential-blocks-flv',
                'essential-blocks-dash',
                'regenerator-runtime'
             ]
        );

        wpdev_essential_blocks()->assets->enqueue( 'eb-admin', 'js/admin.js' );
    }

    /**
     * AJAX Save function
     */
    public function save()
    {
        if ( ! isset( $_POST[ 'admin_nonce' ] ) || ! wp_verify_nonce( sanitize_key( $_POST[ 'admin_nonce' ] ), 'admin-nonce' ) ) {
            wp_send_json_error( __( 'Nonce Error', 'essential-blocks' ) );
        }
        if ( ! current_user_can( 'activate_plugins' ) ) {
            wp_send_json_error( __( 'You are not authorized to save this!', 'essential-blocks' ) );
        }

        if ( isset( $_POST[ 'type' ] ) ) {
            $type  = trim( sanitize_text_field( $_POST[ 'type' ] ) );
            $key   = isset( $_POST[ 'key' ] ) ? trim( sanitize_text_field( $_POST[ 'key' ] ) ) : '';
            $value = isset( $_POST[ 'value' ] ) ? trim( sanitize_text_field( $_POST[ 'value' ] ) ) : '';

            $settings = Settings::get_instance();

            switch ( $type ) {
                case 'settings':
                    /**
                     * Save blocks Settings options
                     */
                    $updated = $settings->save_eb_settings( $key, $value );
                    wp_send_json_success( $updated );
                    break;

                case 'enable_disable':
                    /**
                     * Save Enable/disable blocks options
                     */
                    $value   = json_decode( wp_unslash( $value ), true );
                    $updated = $settings->save_blocks_option( $value );
                    wp_send_json_success( $updated );
                    break;
                case 'write_with_ai':
                    /**
                     * Save blocks write_with_ai options
                     */
                    $value = json_decode( wp_unslash( $value ) );

                    // Use AI integration class for validation and saving
                    if ( class_exists( 'EssentialBlocks\Integrations\AI\AI' ) ) {
                        $result = \EssentialBlocks\Integrations\AI\AI::validate_and_save_ai_settings( $value );

                        if ( ! $result[ 'success' ] ) {
                            wp_send_json_error( [
                                'message' => $result[ 'message' ],
                                'type'    => $result[ 'type' ]
                             ] );
                            return;
                        }

                        wp_send_json_success( $result[ 'data' ] );
                    } else {
                        // Fallback to direct save if AI class not available
                        $updated = $settings->save_eb_write_with_ai( $value );
                        wp_send_json_success( $updated );
                    }
                    break;
                default:
                    wp_send_json_error( __( 'Something went wrong regarding saving options data.', 'essential-blocks' ) );
            }
        } else {
            wp_send_json_error( __( 'Something went wrong regarding saving options data.', 'essential-blocks' ) );
        }
    }

    /**
     * AJAX Reset function
     */
    public function reset()
    {
        if ( ! isset( $_POST[ 'admin_nonce' ] ) || ! wp_verify_nonce( sanitize_key( $_POST[ 'admin_nonce' ] ), 'admin-nonce' ) ) {
            wp_send_json_error( __( 'Nonce Error', 'essential-blocks' ) );
        }
        if ( ! current_user_can( 'activate_plugins' ) ) {
            wp_send_json_error( __( 'You are not authorized to save this!', 'essential-blocks' ) );
        }

        if ( isset( $_POST[ 'type' ] ) ) {
            $type = trim( sanitize_text_field( $_POST[ 'type' ] ) );
            $key  = isset( $_POST[ 'key' ] ) ? trim( sanitize_text_field( $_POST[ 'key' ] ) ) : '';

            $settings = Settings::get_instance();

            switch ( $type ) {
                case 'settings':
                    /**
                     * Reset blocks Settings options
                     */
                    $updated = $settings->reset_eb_settings( $key );
                    wp_send_json_success( $updated );
                    break;

                case 'enable_disable':
                    /**
                     * Reset Enable/disable blocks options
                     */

                    break;
                default:
                    wp_send_json_error( __( 'Something went wrong regarding reset options data.', 'essential-blocks' ) );
            }
        } else {
            wp_send_json_error( __( 'Something went wrong regarding reset options data.', 'essential-blocks' ) );
        }
    }

    /**
     * AJAX Get function for get data from Options Table
     */
    public function get()
    {
        if ( ! isset( $_POST[ 'admin_nonce' ] ) || ! wp_verify_nonce( sanitize_key( $_POST[ 'admin_nonce' ] ), 'admin-nonce' ) ) {
            wp_send_json_error( __( 'Nonce Error', 'essential-blocks' ) );
        }
        if ( ! current_user_can( 'activate_plugins' ) ) {
            wp_send_json_error( __( 'You are not authorized to save this!', 'essential-blocks' ) );
        }

        if ( isset( $_POST[ 'key' ] ) ) {
            $key = trim( sanitize_text_field( $_POST[ 'key' ] ) );
            if ( str_contains( $key, 'eb_' ) ) {
                $settings = Settings::get_instance();
                $data     = $settings->get( $key );

                if ( $data ) {
                    wp_send_json_success( wp_unslash( $data ) );
                } else {
                    wp_send_json_error( __( 'Invalid Key', 'essential-blocks' ) );
                }
            } else {
                wp_send_json_error( __( 'Invalid Key', 'essential-blocks' ) );
            }
        } else {
            wp_send_json_error( __( 'Something went wrong regarding getting options data.', 'essential-blocks' ) );
        }
    }

    /**
     * AJAX Get function for set hide pattern library in editor
     */
    public function hide_pattern_library()
    {
        if ( ! isset( $_POST[ 'admin_nonce' ] ) || ! wp_verify_nonce( sanitize_key( $_POST[ 'admin_nonce' ] ), 'admin-nonce' ) ) {
            wp_send_json_error( __( 'Nonce Error', 'essential-blocks' ) );
        }
        if ( ! current_user_can( 'edit_posts' ) ) {
            wp_send_json_error( __( 'You are not authorized to save this!', 'essential-blocks' ) );
        }

        $save = update_option( ESSENTIAL_BLOCKS_HIDE_PATTERN_LIBRARY, true );
        if ( $save ) {
            wp_send_json_success( __( 'Settings Updated Successfully', 'essential-blocks' ) );
        } else {
            wp_send_json_error( __( 'Couldn\'t Save Settings Data', 'essential-blocks' ) );
        }
    }

    /**
     * AJAX Get Templately Templates
     */
    public function templates()
    {
        if ( ! isset( $_POST[ 'admin_nonce' ] ) || ! wp_verify_nonce( sanitize_key( $_POST[ 'admin_nonce' ] ), 'admin-nonce' ) ) {
            wp_send_json_error( __( 'Nonce Error', 'essential-blocks' ) );
        }

        if ( ! current_user_can( 'activate_plugins' ) ) {
            wp_send_json_error( __( 'You are not authorized!', 'essential-blocks' ) );
        }

        $headers = [
            'Content-Type' => 'application/json'
         ];
        $query = '{
			packs(plan_type: 0, per_page: 8){
			  data{
				id
				name
				thumbnail,
				price,
                slug,
                rating
                downloads
			  }
			}
		  }';
        $response = wp_remote_post(
            'https://app.templately.com/api/plugin',
            [
                'timeout' => 30,
                'headers' => $headers,
                'body'    => wp_json_encode(
                    [
                        'query' => $query
                     ]
                )
             ]
        );
        if ( $response ) {
            wp_send_json_success( $response );
        } else {
            wp_send_json_error( __( 'Something went wrong regarding getting data.', 'essential-blocks' ) );
        }
    }

    /**
     * AJAX Get Templately Templates
     */
    public function template_count()
    {
        if ( ! isset( $_POST[ 'admin_nonce' ] ) || ! wp_verify_nonce( sanitize_key( $_POST[ 'admin_nonce' ] ), 'admin-nonce' ) ) {
            wp_send_json_error( __( 'Nonce Error', 'essential-blocks' ) );
        }
        if ( ! current_user_can( 'activate_plugins' ) ) {
            wp_send_json_error( __( 'You are not authorized!', 'essential-blocks' ) );
        }

        $headers = [
            'Content-Type' => 'application/json'
         ];
        $query = '{
			getCounts {
                key
                value
            }
		  }';
        $response = wp_remote_post(
            'https://app.templately.com/api/plugin',
            [
                'timeout' => 30,
                'headers' => $headers,
                'body'    => wp_json_encode(
                    [
                        'query' => $query
                     ]
                )
             ]
        );
        if ( $response ) {
            wp_send_json_success( $response );
        } else {
            wp_send_json_error( __( 'Something went wrong regarding getting data.', 'essential-blocks' ) );
        }
    }

    /**
     * show menu notice
     *
     * @return boolean
     */
    public function menu_notice_should_show()
    {
        return ( get_option( 'eb_admin_menu_notice' ) < EB_ADMIN_MENU_FLAG && get_option( 'eb_admin_promotion' ) < EB_PROMOTION_FLAG );
    }

    public function eb_admin_inline_css()
    {
        $screen = get_current_screen();

        if ( ! empty( $screen->id ) && $screen->id == 'toplevel_page_essential-blocks' ) {
            $custom_css = "
                .notice:not(.wpdeveloper-licensing-notice) {
                    display: none !important;
                }";
            wp_add_inline_style( 'admin-bar', $custom_css );
        }

        if ( $this->menu_notice_should_show() ) {
            $custom_css = "
                #toplevel_page_essential-blocks .wp-submenu .wp-first-item .eb-menu-notice {
                    display: none !important;
                }
                #toplevel_page_essential-blocks > a ,
                #toplevel_page_essential-blocks > a:hover {
                    color:#f0f0f1 !important;
                    background: #5E2EFF !important;
                }
				#toplevel_page_essential-blocks .eb-menu-notice {
                    display:block !important;
                }";
            wp_add_inline_style( 'admin-bar', $custom_css );
        }
    }

    public function eb_admin_promotion()
    {
        if ( ! isset( $_POST[ 'admin_nonce' ] ) || ! wp_verify_nonce( sanitize_key( $_POST[ 'admin_nonce' ] ), 'admin-nonce' ) ) {
            wp_send_json_error( __( 'Nonce Error', 'essential-blocks' ) );
        }
        if ( ! current_user_can( 'activate_plugins' ) ) {
            wp_send_json_error( __( 'You are not authorized to save this!', 'essential-blocks' ) );
        }

        $update_promotion = update_option( 'eb_admin_promotion', EB_PROMOTION_FLAG );
        if ( $update_promotion ) {
            wp_send_json_success( [ 'success' => true ] );
        } else {
            wp_send_json_error( __( 'Something went wrong regarding getting data.', 'essential-blocks' ) );
        }
    }

    //eb_write_with_ai
    public function eb_write_with_ai()
    {
        if ( ! isset( $_POST[ 'admin_nonce' ] ) || ! wp_verify_nonce( sanitize_key( $_POST[ 'admin_nonce' ] ), 'admin-nonce' ) ) {
            wp_send_json_error( __( 'Nonce Error', 'essential-blocks' ) );
        }
        if ( ! current_user_can( 'edit_posts' ) ) {
            wp_send_json_error( __( 'You are not authorized to save this!', 'essential-blocks' ) );
        }

        if ( isset( $_POST[ 'prompt' ] ) ) {
            $prompt = sanitize_textarea_field( $_POST[ 'prompt' ] );

            $content_for = isset( $_POST[ 'content_for' ] ) ? $_POST[ 'content_for' ] : 'writePageContent';

            $overwrite = false;
            if ( isset( $_POST[ 'overwrite' ] ) ) {
                $overwrite = rest_sanitize_boolean( $_POST[ 'overwrite' ] );
            }

            // Include the OpenAI class
            require_once ESSENTIAL_BLOCKS_DIR_PATH . 'includes/Admin/OpenAI.php';

            // Initialize the OpenAI class
            $openai = new OpenAI();

            // Generate content using OpenAI with the complete prompt
            $response = $openai->generate_content( $prompt, $content_for );

            if ( $response[ 'success' ] ) {
                wp_send_json_success( [
                    'content'   => $response[ 'content' ],
                    'usage'     => $response[ 'usage' ],
                    'overwrite' => $overwrite
                 ] );
            } else {
                wp_send_json_error( [
                    'message'  => $response[ 'message' ],
                    'response' => isset( $response[ 'response' ] ) ? $response[ 'response' ] : null
                 ] );
            }
        } else {
            wp_send_json_error( __( 'Prompt is required', 'essential-blocks' ) );
        }
    }

    //eb_generate_image_with_ai
    public function eb_generate_image_with_ai()
    {
        if ( ! isset( $_POST[ 'admin_nonce' ] ) || ! wp_verify_nonce( sanitize_key( $_POST[ 'admin_nonce' ] ), 'admin-nonce' ) ) {
            wp_send_json_error( __( 'Nonce Error', 'essential-blocks' ) );
        }
        if ( ! current_user_can( 'upload_files' ) ) {
            wp_send_json_error( __( 'You do not have permission to upload files!', 'essential-blocks' ) );
        }

        if ( isset( $_POST[ 'prompt' ] ) ) {
            $prompt             = sanitize_textarea_field( $_POST[ 'prompt' ] );
            $model              = isset( $_POST[ 'model' ] ) ? sanitize_text_field( $_POST[ 'model' ] ) : 'dall-e-3';
            $size               = isset( $_POST[ 'size' ] ) ? sanitize_text_field( $_POST[ 'size' ] ) : '1024x1024';
            $quality            = isset( $_POST[ 'quality' ] ) ? sanitize_text_field( $_POST[ 'quality' ] ) : 'standard';
            $style              = isset( $_POST[ 'style' ] ) ? sanitize_text_field( $_POST[ 'style' ] ) : 'vivid';
            $background         = isset( $_POST[ 'background' ] ) ? sanitize_textarea_field( $_POST[ 'background' ] ) : '';
            $output_format      = isset( $_POST[ 'output_format' ] ) ? sanitize_text_field( $_POST[ 'output_format' ] ) : 'png';
            $output_compression = isset( $_POST[ 'output_compression' ] ) ? sanitize_text_field( $_POST[ 'output_compression' ] ) : 'standard';
            $image_count        = isset( $_POST[ 'image_count' ] ) ? intval( $_POST[ 'image_count' ] ) : 4; // New parameter for number of images

            // Include the OpenAI class
            require_once ESSENTIAL_BLOCKS_DIR_PATH . 'includes/Admin/OpenAI.php';

            // Initialize the OpenAI class
            $openai = new OpenAI();

            // Generate image using OpenAI
            $response = $openai->generate_image( $prompt, $model, $size, $quality, $style, 'writePageContent', $background, $output_format, $output_compression, $image_count );

            if ( $response[ 'success' ] ) {
                wp_send_json_success( [
                    'images' => $response[ 'images' ],
                    'usage'  => isset( $response[ 'usage' ] ) ? $response[ 'usage' ] : null
                 ] );
            } else {
                wp_send_json_error( [
                    'message'  => $response[ 'message' ],
                    'response' => isset( $response[ 'response' ] ) ? $response[ 'response' ] : null
                 ] );
            }
        } else {
            wp_send_json_error( __( 'Prompt is required', 'essential-blocks' ) );
        }
    }

    //eb_save_ai_generated_image
    public function eb_save_ai_generated_image()
    {
        if ( ! isset( $_POST[ 'admin_nonce' ] ) || ! wp_verify_nonce( sanitize_key( $_POST[ 'admin_nonce' ] ), 'admin-nonce' ) ) {
            wp_send_json_error( __( 'Nonce Error', 'essential-blocks' ) );
        }
        if ( ! current_user_can( 'upload_files' ) ) {
            wp_send_json_error( __( 'You are not authorized to upload files!', 'essential-blocks' ) );
        }

        // Check if we have either image_url or image_b64 along with prompt
        if ( ( isset( $_POST[ 'image_url' ] ) || isset( $_POST[ 'image_b64' ] ) ) && isset( $_POST[ 'prompt' ] ) ) {
            $image_url   = isset( $_POST[ 'image_url' ] ) ? esc_url_raw( $_POST[ 'image_url' ] ) : null;
            $image_b64   = isset( $_POST[ 'image_b64' ] ) ? sanitize_text_field( $_POST[ 'image_b64' ] ) : null;
            $prompt      = sanitize_textarea_field( $_POST[ 'prompt' ] );
            $title       = isset( $_POST[ 'title' ] ) ? sanitize_text_field( $_POST[ 'title' ] ) : $prompt;
            $alt_tag     = isset( $_POST[ 'alt_tag' ] ) ? sanitize_text_field( $_POST[ 'alt_tag' ] ) : $prompt;
            $caption     = isset( $_POST[ 'caption' ] ) ? sanitize_text_field( $_POST[ 'caption' ] ) : '';
            $description = isset( $_POST[ 'description' ] ) ? sanitize_text_field( $_POST[ 'description' ] ) : '';

            $image_body = '';

            // Handle URL format
            if ( $image_url ) {
                // Download the image from validated URL
                $image_data = wp_safe_remote_get( $image_url, [
                    'timeout'     => 30,
                    'redirection' => 3,
                    'user-agent'  => 'Essential Blocks/' . ESSENTIAL_BLOCKS_VERSION,
                    'headers'     => [
                        'Accept' => 'image/*'
                     ]
                 ] );

                if ( is_wp_error( $image_data ) ) {
                    wp_send_json_error( [
                        'message' => __( 'Failed to download image from URL.', 'essential-blocks' )
                     ] );
                    return;
                }

                // Validate response
                $response_code = wp_remote_retrieve_response_code( $image_data );
                if ( $response_code !== 200 ) {
                    wp_send_json_error( [
                        'message' => __( 'Invalid response from image URL.', 'essential-blocks' )
                     ] );
                    return;
                }

                $image_body = wp_remote_retrieve_body( $image_data );
            }
            // Handle base64 format
            elseif ( $image_b64 ) {
                // Decode base64 image data
                $image_body = base64_decode( $image_b64 );

                if ( $image_body === false ) {
                    wp_send_json_error( [
                        'message' => __( 'Failed to decode base64 image data.', 'essential-blocks' )
                     ] );
                    return;
                }
            }

            if ( empty( $image_body ) ) {
                wp_send_json_error( [
                    'message' => __( 'Image data is empty.', 'essential-blocks' )
                 ] );
                return;
            }

            // Security: Validate image content and size
            if ( ! $this->is_valid_image_content( $image_body ) ) {
                wp_send_json_error( [
                    'message' => __( 'Invalid image content provided.', 'essential-blocks' )
                 ] );
                return;
            }

            // Detect image format and set appropriate extension and MIME type
            $image_info = getimagesizefromstring( $image_body );
            if ( ! $image_info ) {
                wp_send_json_error( [
                    'message' => __( 'Unable to determine image format.', 'essential-blocks' )
                 ] );
                return;
            }

            $mime_type = $image_info[ 'mime' ];

            // Security: Only allow specific image MIME types
            $allowed_mime_types = [
                'image/jpeg',
                'image/png',
                'image/webp',
                'image/gif'
             ];

            if ( ! in_array( $mime_type, $allowed_mime_types, true ) ) {
                wp_send_json_error( [
                    'message' => __( 'Unsupported image format.', 'essential-blocks' )
                 ] );
                return;
            }

            // Determine file extension based on MIME type
            $extension = 'png'; // default
            switch ( $mime_type ) {
                case 'image/jpeg':
                    $extension = 'jpg';
                    break;
                case 'image/png':
                    $extension = 'png';
                    break;
                case 'image/webp':
                    $extension = 'webp';
                    break;
                case 'image/gif':
                    $extension = 'gif';
                    break;
            }

            // Generate filename with proper extension
            $filename = 'ai-generated-' . sanitize_title( substr( $title ?: $prompt, 0, 50 ) ) . '-' . time() . '.' . $extension;

            // Upload to WordPress media library
            $upload = wp_upload_bits( $filename, null, $image_body );

            if ( $upload[ 'error' ] ) {
                wp_send_json_error( [
                    'message' => $upload[ 'error' ]
                 ] );
                return;
            }

            // Create attachment
            $attachment = [
                'post_mime_type' => $mime_type,
                'post_title'     => $title,
                'post_content'   => $description,
                'post_excerpt'   => $caption,
                'post_status'    => 'inherit'
             ];

            $attachment_id = wp_insert_attachment( $attachment, $upload[ 'file' ] );

            if ( is_wp_error( $attachment_id ) ) {
                wp_send_json_error( [
                    'message' => __( 'Failed to create attachment.', 'essential-blocks' )
                 ] );
                return;
            }

            // Generate attachment metadata
            require_once ABSPATH . 'wp-admin/includes/image.php';
            $attachment_data = wp_generate_attachment_metadata( $attachment_id, $upload[ 'file' ] );
            wp_update_attachment_metadata( $attachment_id, $attachment_data );

            // Set alt text
            update_post_meta( $attachment_id, '_wp_attachment_image_alt', $alt_tag );

            // Get attachment URL
            $attachment_url = wp_get_attachment_url( $attachment_id );

            wp_send_json_success( [
                'attachment_id' => $attachment_id,
                'url'           => $attachment_url,
                'alt'           => $alt_tag,
                'title'         => $title,
                'caption'       => $caption,
                'description'   => $description
             ] );
        } else {
            wp_send_json_error( __( 'Image data (URL or base64) and prompt are required', 'essential-blocks' ) );
        }
    }

    /**
     * Validate image content for security
     *
     * @param string $image_data The image data to validate
     * @return bool True if valid, false otherwise
     */
    private function is_valid_image_content( $image_data )
    {
        if ( empty( $image_data ) ) {
            return false;
        }

        // Check file size (max 10MB)
        $max_size = 10 * 1024 * 1024; // 10MB
        if ( strlen( $image_data ) > $max_size ) {
            return false;
        }

        // Validate image using getimagesizefromstring
        $image_info = getimagesizefromstring( $image_data );
        if ( ! $image_info ) {
            return false;
        }

        // Check image dimensions (reasonable limits)
        $max_width  = 4096;
        $max_height = 4096;
        if ( $image_info[ 0 ] > $max_width || $image_info[ 1 ] > $max_height ) {
            return false;
        }

        // Additional security: Check for suspicious content patterns
        // Look for common file signatures that shouldn't be in images
        $suspicious_patterns = [
            '<?php', // PHP code
            '<script', // JavaScript
            'javascript:', // JavaScript protocol
            'data:text/', // Text data URLs
            '<html', // HTML content
            '#!/bin/' // Shell scripts
         ];

        $data_start = substr( $image_data, 0, 1024 ); // Check first 1KB
        foreach ( $suspicious_patterns as $pattern ) {
            if ( stripos( $data_start, $pattern ) !== false ) {
                return false;
            }
        }

        return true;
    }

    /**
     * update menu notice flag
     */
    public function eb_show_admin_menu_notice()
    {
        $get_option = get_option( 'eb_admin_menu_notice' );
        if ( get_option( 'eb_admin_menu_notice' ) < EB_ADMIN_MENU_FLAG ) {
            update_option( 'eb_admin_menu_notice', EB_ADMIN_MENU_FLAG, false );
        }
    }

    public function remove_admin_notice()
    {
        $current_screen = get_current_screen();
        if ( $current_screen->id == 'toplevel_page_essential-blocks' ) {
            // Added admin notice which is basically uses for display new promotion message
            if ( get_option( 'eb_admin_promotion' ) < EB_PROMOTION_FLAG ) {
                add_action( 'admin_notices', [ $this, 'promotion_message_on_admin_screen' ], 1 );
            }
        }
    }

    public function eb_save_quick_toolbar_blocks()
    {
        if ( ! isset( $_POST[ 'admin_nonce' ] ) || ! wp_verify_nonce( sanitize_key( $_POST[ 'admin_nonce' ] ), 'admin-nonce' ) ) {
            wp_send_json_error( __( 'Nonce Error', 'essential-blocks' ) );
        }
        if ( ! current_user_can( 'activate_plugins' ) ) {
            wp_send_json_error( __( 'You are not authorized to save this!', 'essential-blocks' ) );
        }

        if ( isset( $_POST[ 'value' ] ) ) {
            $value = isset( $_POST[ 'value' ] ) ? json_decode( stripslashes( $_POST[ 'value' ] ), true ) : '';

            $settings = Settings::get_instance();
            $updated  = $settings->save( 'eb_quick_toolbar_allowed_blocks', $value );
            wp_send_json_success( $updated );
        } else {
            wp_send_json_error( __( 'Something went wrong regarding saving options data.', 'essential-blocks' ) );
        }
    }

    /**
     * Show promotion message
     *
     * @return void
     */
    public function promotion_message_on_admin_screen()
    {
        $changelog_url = esc_url( 'https://essential-blocks.com/changelog/' );

        $message_template = __(
            "<p><i>📣</i> Introducing New Block - Business Hours in Essential Blocks Pro <strong>v2.6.0</strong> - Display your business hours with customizable styling and responsive design! For more details, check out this <strong><a target='_blank' href='%s'>changelog</a></strong>.</p>",
            "essential-blocks"
        );

        $message = sprintf( $message_template, $changelog_url );

        // Output HTML using heredoc for better formatting
        echo <<<HTML
        <div id="eb-admin-promotion-message" class="eb-admin-promotion-message">
            <span class="e-notice__dismiss eb-admin-promotion-close dashicons dashicons-no-alt"
                role="button" aria-label="Dismiss" tabindex="0"></span>
            $message
        </div>
        HTML;
    }

    public function eb_whats_new_notice()
    {
        if ( wp_doing_ajax() ) {
            return;
        }

        if ( get_transient( 'essential_block_whats_new_notice' ) === true ) {
            delete_transient( 'essential_block_whats_new_notice' );

            $view_path = ESSENTIAL_BLOCKS_DIR_PATH . 'includes/admin/whats-new-notice.php';

            if ( file_exists( $view_path ) ) {
                include $view_path;
            }
        }
    }
}
