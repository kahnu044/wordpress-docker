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

class Admin {

    use HasSingletone;

    /**
     * Plugin Usage Insight
     *
     * @var Insights|null
     */
    private $insights = null;
    private static $cache_bank;

    public function __construct() {
        $this->plugin_usage_insights();

        require_once ESSENTIAL_BLOCKS_DIR_PATH . 'includes/Dependencies/wpnotice.php';

        self::$cache_bank = CacheBank::get_instance();
        try {
            $this->notices();
        } catch ( \Exception $e ) {
            unset( $e );
        }

        // Remove OLD notice from 1.0.0 (if other WPDeveloper plugin has notice)
        NoticeRemover::get_instance( '1.0.0' );

        add_action( 'admin_init', [$this, 'notices'] );

        add_action( 'admin_menu', [$this, 'admin_menu'] );

        // Update message for showing notice for new release
        add_action( 'in_plugin_update_message-essential-blocks/essential-blocks.php', [$this, 'plugin_update'], 10, 2 );

        add_filter( 'block_categories_all', [$this, 'register_category'], 99, 2 );

        add_action( 'admin_enqueue_scripts', [$this, 'enqueue_styles'] );
        add_action( 'admin_enqueue_scripts', [$this, 'enqueue_scripts'] );

        add_action( 'wp_ajax_save_eb_admin_options', [$this, 'save'] );
        add_action( 'wp_ajax_get_eb_admin_options', [$this, 'get'] );
        add_action( 'wp_ajax_get_eb_admin_templates', [$this, 'templates'] );
        add_action( 'wp_ajax_get_eb_admin_template_count', [$this, 'template_count'] );
        add_action( 'plugin_action_links', [$this, 'eb_menu_action_links'], 10, 2 );

        // Redirect after Plugin is updated
        add_action( 'admin_init', [$this, 'maybe_redirect'] );
    }

    public function maybe_redirect() {
        if ( wp_doing_ajax() ) {
            return;
        }

        if ( get_transient( 'essential_block_maybe_whatsnew_redirect' ) == true ) {
            delete_transient( 'essential_block_maybe_whatsnew_redirect' );

            if ( ! is_multisite() ) {
                wp_safe_redirect( add_query_arg( ['page' => 'welcome-essential-blocks'], admin_url( 'admin.php' ) ) );
            }
        }
    }

    public function admin_menu() {
        add_menu_page(
            __( 'Essential Blocks', 'essential-blocks' ),
            __( 'Essential Blocks', 'essential-blocks' ),
            'activate_plugins',
            'essential-blocks',
            [$this, 'admin_page'],
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
            [$this, 'welcome_page']
        );
    }

    public function admin_page() {
        Helper::views( 'admin', [] );
    }

    public function welcome_page() {
        Helper::views( 'welcome', [] );
    }

    /**
     * Menu Action Links
     *
     * @since 4.1.0
     */
    public function eb_menu_action_links( $links, $file ) {
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

    public function register_category( $categories, $post ) {
        array_unshift( $categories, [
            'slug'  => 'essential-blocks',
            'title' => __( 'Essential Blocks', 'essential-blocks' )
        ] );

        return $categories;
    }

    /**
     * Update message for showing notice for new release
     */
    public function plugin_update( $plugin_data, $new_data ) {
        require_once ABSPATH . 'wp-admin/includes/plugin-install.php';
        $upgrade_notice = false;
        if ( isset( $new_data->upgrade_notice ) ) {
            $upgrade_notice = $new_data->upgrade_notice;
        }

        Helper::version_update_warning( $plugin_data['Version'], $plugin_data['new_version'], $upgrade_notice );
    }

    /**
     * WP Insights Integration
     */
    public function plugin_usage_insights() {
        $this->insights = Insights::get_instance(
            ESSENTIAL_BLOCKS_FILE,
            [
                'opt_in'       => true,
                'goodbye_form' => true,
                'item_id'      => 'fa45e4a52a650579e98c'
            ]
        );
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
        $this->insights->init();
    }

    /**
     * Admin notices for Review and others.
     *
     * @return void
     */
    public function notices() {
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
                        'target'       => '_blank',
                        'class'        => 'btn',
                        'data-dismiss' => false
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

        /**
         * EB Pro Launching Campaign Notice
         */
        $b_message = '<p class="pro_launching_campaign_content" style="margin-top: 0; margin-bottom: 10px;">Black Friday Sale: Grab LIFETIME access to <strong>50+ premium Gutenberg blocks</strong> & design stunning website 🔥</p>
        <a class="button button-primary" href="https://essential-blocks.com/upgrade-to-eb-pro" target="_blank">Upgrade to pro</a>
        <a class="button button-secondary" href="https://essential-blocks.com/get-lifetime-access" target="_blank">Give Me LIFETIME Access</a>
        <button data-dismiss="true" class="dismiss-btn button button-link">I Don\'t Want To Save Money</button>';
        $_black_friday_notice = [
            'thumbnail' => ESSENTIAL_BLOCKS_URL . 'assets/images/eb-logo-full.svg',
            'html'      => $b_message
        ];

        //Black Fridy Notice Add
        $notices->add(
            'pro_launching_campaign',
            // $pro_launching_campaign,
            $_black_friday_notice,
            [
                'start'       => $notices->time(),
                // 'start'       => $notices->strtotime( '+2 days' ),
                'classes'     => 'updated put-dismiss-notice',
                'dismissible' => true,
                'refresh'     => ESSENTIAL_BLOCKS_VERSION,
                'do_action'   => 'eb_pro_launching_campaign',
                'display_if'  => ! ESSENTIAL_BLOCKS_IS_PRO_ACTIVE
            ]
        );

        // Review Notice Add
        $notices->add(
            'review',
            $_review_notice,
            [
                'start'       => $notices->strtotime( '+10 days' ),
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
                [$this->insights, 'notice'],
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

    public function enqueue_styles( $hook ) {
        wpdev_essential_blocks()->assets->enqueue( 'menu', 'css/eb-menu.css' );

        if ( $hook !== 'toplevel_page_essential-blocks' ) {
            return;
        }

        wpdev_essential_blocks()->assets->enqueue( 'admin', 'css/admin.css' );
        wpdev_essential_blocks()->assets->enqueue( 'admin-custom', ESSENTIAL_BLOCKS_URL . 'admin/style.css' );
    }

    public function enqueue_scripts( $hook ) {
        if ( $hook !== 'toplevel_page_essential-blocks' ) {
            return;
        }

        wpdev_essential_blocks()->assets->register( 'admin-controls-util', '../dist/controls.js', [
            'essential-blocks-blocks-localize'
        ] );
        wpdev_essential_blocks()->assets->register( 'vendor-bundle', '../../vendor-bundle/index.js' );
        wpdev_essential_blocks()->assets->register( 'flv', 'js/react-player/flv.min.js' );
        wpdev_essential_blocks()->assets->register( 'dash', 'js/react-player/dash.all.min.js' );
        wpdev_essential_blocks()->assets->register( 'hls', 'js/react-player/hls.min.js' );
        wpdev_essential_blocks()->assets->enqueue(
            'admin',
            '../admin/index.js',
            [
                'lodash',
                'essential-blocks-vendor-bundle',
                'essential-blocks-admin-controls-util',
                'essential-blocks-hls',
                'essential-blocks-flv',
                'essential-blocks-dash'
            ]
        );

        wpdev_essential_blocks()->assets->enqueue( 'category-icon', '../lib/update-category-icon/index.js' );
    }

    /**
     * AJAX Save function
     */
    public function save() {
        if ( ! isset( $_POST['admin_nonce'] ) || ! wp_verify_nonce( sanitize_key( $_POST['admin_nonce'] ), 'admin-nonce' ) ) {
            wp_send_json_error( __( 'Nonce Error', 'essential-blocks' ) );
        }
        if ( ! current_user_can( 'activate_plugins' ) ) {
            wp_send_json_error( __( 'You are not authorized to save this!', 'essential-blocks' ) );
        }

        if ( isset( $_POST['type'] ) ) {
            $type  = trim( sanitize_text_field( $_POST['type'] ) );
            $key   = isset( $_POST['key'] ) ? trim( sanitize_text_field( $_POST['key'] ) ) : '';
            $value = isset( $_POST['value'] ) ? trim( sanitize_text_field( $_POST['value'] ) ) : '';

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
                default:
                    wp_send_json_error( __( 'Something went wrong regarding saving options data.', 'essential-blocks' ) );
            }
        } else {
            wp_send_json_error( __( 'Something went wrong regarding saving options data.', 'essential-blocks' ) );
        }
    }

    /**
     * AJAX Get function
     */
    public function get() {
        if ( ! isset( $_POST['admin_nonce'] ) || ! wp_verify_nonce( sanitize_key( $_POST['admin_nonce'] ), 'admin-nonce' ) ) {
            wp_send_json_error( __( 'Nonce Error', 'essential-blocks' ) );
        }
        if ( ! current_user_can( 'edit_posts' ) ) {
            wp_send_json_error( __( 'You are not authorized to save this!', 'essential-blocks' ) );
        }

        if ( isset( $_POST['key'] ) ) {
            $key      = trim( sanitize_text_field( $_POST['key'] ) );
            $settings = Settings::get_instance();
            $data     = $settings->get( $key );

            if ( $data ) {
                wp_send_json_success( wp_unslash( $data ) );
            } else {
                wp_send_json_error( __( 'Invalid Key', 'essential-blocks' ) );
            }
        } else {
            wp_send_json_error( __( 'Something went wrong regarding getting options data.', 'essential-blocks' ) );
        }
    }

    /**
     * AJAX Get Templately Templates
     */
    public function templates() {
        if ( ! isset( $_POST['admin_nonce'] ) || ! wp_verify_nonce( sanitize_key( $_POST['admin_nonce'] ), 'admin-nonce' ) ) {
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
    public function template_count() {
        if ( ! isset( $_POST['admin_nonce'] ) || ! wp_verify_nonce( sanitize_key( $_POST['admin_nonce'] ), 'admin-nonce' ) ) {
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
}