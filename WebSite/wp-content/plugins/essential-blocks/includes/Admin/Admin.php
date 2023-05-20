<?php

namespace EssentialBlocks\Admin;

use EssentialBlocks\Utils\Helper;
use EssentialBlocks\Utils\Settings;
use EssentialBlocks\Traits\HasSingletone;
use EssentialBlocks\Dependencies\Insights;
use EssentialBlocks\Dependencies\WPNotice\Notices;

class Admin {

    use HasSingletone;

    /**
     * Plugin Usage Insight
     * @var Insights|null
     */
    private $insights = null;

    public function __construct() {
        $this->plugin_usage_insights();
        add_action( 'admin_init', [$this, 'notices'] );

        add_action( 'admin_menu', [$this, 'admin_menu'] );

        //Update message for showing notice for new release
        add_action( 'in_plugin_update_message-essential-blocks/essential-blocks.php', [$this, 'plugin_update'], 10, 2 );

        $_blocks_category_hook = version_compare( get_bloginfo( 'version' ), '5.8', '>=' ) ? 'block_categories_all' : 'block_categories';
        add_filter( $_blocks_category_hook, [$this, 'register_category'], 10, 2 );

        add_action( 'admin_enqueue_scripts', [$this, 'enqueue_styles'] );
        add_action( 'admin_enqueue_scripts', [$this, 'enqueue_scripts'] );

        add_action( 'wp_ajax_save_eb_admin_options', [$this, 'save'] );
        add_action( 'wp_ajax_get_eb_admin_options', [$this, 'get'] );
        add_action( 'wp_ajax_get_eb_admin_templates', [$this, 'templates'] );
        add_action( 'wp_ajax_get_eb_admin_template_count', [$this, 'template_count'] );

        //Redirect after Plugin is updated
        add_action( 'admin_init', [$this, 'maybe_redirect'] );
    }

    public function maybe_redirect(){
        if ( wp_doing_ajax()) {
            return;
        }

        if( get_transient('essential_block_maybe_whatsnew_redirect') == true ) {
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

    public function register_category( $categories, $post ) {
        $eb_category = [
            'slug'  => 'essential-blocks',
            'title' => __( 'Essential Blocks', 'essential-blocks' )
        ];
        return array_merge( [$eb_category], $categories );
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
        $this->insights = Insights::get_instance( ESSENTIAL_BLOCKS_FILE, [
            'opt_in'       => true,
            'goodbye_form' => true,
            'item_id'      => 'fa45e4a52a650579e98c'
        ] );
        $this->insights->set_notice_options( [
            'notice'       => __( 'Congratulations, you’ve successfully installed <strong>Essential Blocks for Gutenberg</strong>. We got <strong style="color: #a022ff;">1000+ FREE Gutenberg ready Templates</strong> waiting for you <span class="gift-icon">&#127873;</span>', 'essential-blocks' ),
            'extra_notice' => __( 'We collect non-sensitive diagnostic data and plugin usage information.
			Your site URL, WordPress & PHP version, plugins & themes and email address to send you exciting deals. This data lets us make sure this plugin always stays compatible with the most
			popular plugins and themes.', 'essential-blocks' ),
            'yes'          => __( 'Send me FREE Templates', 'wpinsight' ),
            'no'           => __( 'I don\'t want FREE Templates', 'wpinsight' )
        ] );
        $this->insights->init();
    }

    /**
     * Admin notices for Review and others.
     *
     * @return void
     */
    public function notices() {
        $notices = new Notices( [
            'id'          => 'essential_blocks',
            'store'       => 'options',
            'storage_key' => 'notices',
            'version'     => '1.0.0',
            'lifetime'    => 3,
            'styles'      => ESSENTIAL_BLOCKS_URL . 'assets/css/notices.css'
        ] );

        /**
         * Review Notice
         * @var mixed $message
         */

        $message = __(
            'We hope you\'re enjoying Essential Block for Gutenberg! Could you please do us a BIG favor and give it a 5-star rating on WordPress to help us spread the word and boost our motivation?',
            'essential-blocks'
        );

        $_review_notice = [
            'thumbnail' => ESSENTIAL_BLOCKS_URL . 'assets/images/eb-logo.svg',
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
                    'start'       => $notices->time(),
                    'dismissible' => true,
                    'do_action'   => 'wpdeveloper_notice_clicked_for_essential-blocks'
                ]
            );
        }

        $notices->init();
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

        wpdev_essential_blocks()->assets->register( 'vendor-bundle', '../../vendor-bundle/index.js' ); //??
        wpdev_essential_blocks()->assets->enqueue(
            'admin-blocks',
            '../admin/index.js',
            ['essential-blocks-vendor-bundle']
        );

        wpdev_essential_blocks()->assets->enqueue( 'category-icon', '../lib/update-category-icon/index.js' );
    }

    /**
     * AJAX Save function
     */
    public function save() {
        if ( !isset( $_POST['admin_nonce'] ) || ! wp_verify_nonce( $_POST['admin_nonce'], 'admin-nonce' ) ) {
            wp_send_json_error( __( 'Nonce Error', 'essential-blocks' ) );
        }
        if (!current_user_can('activate_plugins')) {
            wp_send_json_error( __( 'You are not authorized to save this!', 'essential-blocks' ) );
        }

        if ( isset( $_POST['type'] ) ) {
            $type  = trim( $_POST['type'] );
            $key   = isset( $_POST['key'] ) ? trim( $_POST['key'] ) : '';
            $value = isset( $_POST['value'] ) ? trim( $_POST['value'] ) : '';

            $settings = Settings::get_instance();

            switch ( $type ) {
                case "settings":
                    /**
                     * Save blocks Settings options
                     */
                    $updated = $settings->save( $key, $value );
                    wp_send_json_success( $updated );
                    break;

                case "enable_disable":
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
        if ( !isset( $_POST['admin_nonce'] ) || ! wp_verify_nonce( $_POST['admin_nonce'], 'admin-nonce' ) ) {
            wp_send_json_error( __( 'Nonce Error', 'essential-blocks' ) );
        }

        if ( isset( $_POST['key'] ) ) {
            $key      = trim( $_POST['key'] );
            $settings = Settings::get_instance();
            $data     = $settings->get( $key );

            if ( $data ) {
                wp_send_json_success( $data );
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
        if ( !isset( $_POST['admin_nonce'] ) || ! wp_verify_nonce( $_POST['admin_nonce'], 'admin-nonce' ) ) {
            wp_send_json_error( __( 'Nonce Error', 'essential-blocks' ) );
        }
        $headers = [
            'Content-Type' => 'application/json'
        ];
        $query = "{
			packs(plan_type: 2, per_page: 6){
			  data{
				id
				name
				thumbnail,
				price,
                slug
			  }
			}
		  }";
        $response = wp_remote_post( 'https://app.templately.com/api/plugin', [
            'timeout' => 30,
            'headers' => $headers,
            'body'    => wp_json_encode( [
                'query' => $query
            ] )
        ] );
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
        if ( !isset( $_POST['admin_nonce'] ) || ! wp_verify_nonce( $_POST['admin_nonce'], 'admin-nonce' ) ) {
            wp_send_json_error( __( 'Nonce Error', 'essential-blocks' ) );
        }
        $headers = [
            'Content-Type' => 'application/json'
        ];
        $query = "{
			getCounts {
                key
                value
            }
		  }";
        $response = wp_remote_post( 'https://app.templately.com/api/plugin', [
            'timeout' => 30,
            'headers' => $headers,
            'body'    => wp_json_encode( [
                'query' => $query
            ] )
        ] );
        if ( $response ) {
            wp_send_json_success( $response );
        } else {
            wp_send_json_error( __( 'Something went wrong regarding getting data.', 'essential-blocks' ) );
        }
    }
}
