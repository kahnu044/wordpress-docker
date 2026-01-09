<?php

namespace EssentialBlocks\Admin;

use EssentialBlocks\Traits\HasSingletone;
use EssentialBlocks\Utils\Helper;
use EssentialBlocks\Utils\Settings;
use EssentialBlocks\Dependencies\Insights;

class QuickSetup {
    use HasSingletone;
    public function __construct() {
        add_action( 'admin_menu', array( $this, 'admin_menu' ) );
        add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_styles' ) );
        add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_scripts' ) );
        add_action( 'wp_ajax_eb_quick_setup_save_tracking', array( $this, 'eb_quick_setup_save_tracking' ) );
        add_action( 'wp_ajax_eb_save_quick_setup', array( $this, 'eb_save_quick_setup' ) );

        add_action( 'in_admin_header', array( $this, 'remove_admin_notice' ), 1000 );
    }

    public function remove_admin_notice() {
        if ( isset( $_GET[ 'page' ] ) && 'eb-quick-setup' == $_GET[ 'page' ] ) {
            remove_all_actions( 'admin_notices' );
            remove_all_actions( 'all_admin_notices' );
        }
    }

    public function admin_menu() {
        $checkPro = class_exists( 'EssentialBlocks\Pro\Plugin' ) ? 1 : 0;
        if ( 1 === $checkPro ) {
            return;
        }
        if ( get_option( 'essential_blocks_quick_setup_shown' ) ) {
            return;
        }
        add_submenu_page(
            'admin.php',
            'Quick Setup Page',
            'Quick Setup',
            'manage_options',
            'eb-quick-setup',
            array( $this, 'quick_setup_page' )
        );
    }

    public function quick_setup_page() {
        if ( get_option( 'essential_blocks_quick_setup_shown' ) ) {
            // wp_safe_redirect( admin_url( 'admin.php?page=essential-blocks' ) );
            return;
        }
        // update_option( 'essential_blocks_quick_setup_shown', true ); //Update option meta as quick setup option shown

        Helper::views( 'quick-setup', array() );
    }

    public function enqueue_styles( $hook ) {
        if ( 'admin_page_eb-quick-setup' !== $hook || get_option( 'essential_blocks_quick_setup_shown' ) ) { // ✅ Ensure Correct Hook
            return;
        }

        wpdev_essential_blocks()->assets->enqueue( 'menu', 'css/eb-menu.css' );
        wpdev_essential_blocks()->assets->enqueue( 'quick-setup-style', 'admin/quick-setup/index.css' );
    }

    public function enqueue_scripts( $hook ) {
        if ( 'admin_page_eb-quick-setup' !== $hook ) {
            return;
        }

        wp_enqueue_script( 'jquery' );

        wpdev_essential_blocks()->assets->register( 'admin-controls-util', 'admin/controls/controls.js', array(
            'essential-blocks-blocks-localize'
        ) );

        wpdev_essential_blocks()->assets->register( 'babel-bundle', 'vendors/js/bundle.babel.js' );
        wpdev_essential_blocks()->assets->register( 'vendor-bundle', 'vendors/js/bundles.js', array( 'essential-blocks-babel-bundle' ) );

        wpdev_essential_blocks()->assets->enqueue(
            'quick-setup',
            'admin/quick-setup/index.js',
            array(
                'lodash',
                'regenerator-runtime',
                'essential-blocks-vendor-bundle',
                'essential-blocks-admin-controls-util'
            )
        );
    }

    public function eb_quick_setup_save_tracking() {
        if ( ! isset( $_POST[ 'admin_nonce' ] ) || ! wp_verify_nonce( sanitize_key( $_POST[ 'admin_nonce' ] ), 'admin-nonce' ) ) {
            wp_send_json_error( __( 'Nonce Error', 'essential-blocks' ) );
        }
        if ( ! current_user_can( 'activate_plugins' ) ) {
            wp_send_json_error( __( 'You are not authorized to save this!', 'essential-blocks' ) );
        }

        if ( isset( $_POST[ 'is_tracking' ] ) && 'true' === $_POST[ 'is_tracking' ] ) {
            $tracker = Insights::get_instance(
                ESSENTIAL_BLOCKS_FILE,
                array(
                    'opt_in' => true,
                    'goodbye_form' => true,
                    'item_id' => 'fa45e4a52a650579e98c'
                )
            );

            $tracker->schedule_tracking();
            $tracker->set_is_tracking_allowed( true );
            $tracker->do_tracking( true );

            wp_send_json_success( __( 'Saved data.', 'essential-blocks' ) );
        } else {
            wp_send_json_error( __( 'Something went wrong regarding saving options data.', 'essential-blocks' ) );
        }
    }

    public function eb_save_quick_setup() {
        if ( ! isset( $_POST[ 'admin_nonce' ] ) || ! wp_verify_nonce( sanitize_key( $_POST[ 'admin_nonce' ] ), 'admin-nonce' ) ) {
            wp_send_json_error( __( 'Nonce Error', 'essential-blocks' ) );
        }
        if ( ! current_user_can( 'activate_plugins' ) ) {
            wp_send_json_error( __( 'You are not authorized to save this!', 'essential-blocks' ) );
        }

        if ( isset( $_POST[ 'setup_shown' ] ) && 'true' === $_POST[ 'setup_shown' ] ) {
            update_option( 'essential_blocks_quick_setup_shown', true );
            update_option( 'essential_blocks_user_type', 'old' );

            wp_send_json_success( array( 'redirect_url' => esc_url( admin_url( 'admin.php?page=essential-blocks' ) ) ) );
        } else {
            wp_send_json_error( __( 'Something went wrong regarding saving options data.', 'essential-blocks' ) );
        }
    }
}
