<?php

namespace EssentialBlocks\Core;

use EssentialBlocks\Core\BlocksPatterns;
use EssentialBlocks\Modules\StyleHandler;
use EssentialBlocks\Traits\HasSingletone;

class Maintenance
{
    use HasSingletone;

    public function __construct()
    {
        add_action( 'admin_init', [ $this, 'update_actions' ], 5 );

        $this->init( ESSENTIAL_BLOCKS_PLUGIN_BASENAME );
    }

    public function update_actions()
    {
        $_version        = get_option( 'essential_blocks_version' );
        $_code_version   = ESSENTIAL_BLOCKS_VERSION;
        $requires_update = version_compare( $_version, $_code_version, '<' );

        if ( ! $_version ) {
            update_option( 'essential_blocks_user_type', 'new' );
        }
        if ( $requires_update ) {
            // Version Updated in DB.
            $this->update_version();
            BlocksPatterns::get_instance()->update_cache();

            if ( get_option( 'essential_blocks_user_type' ) !== 'new' ) {
                update_option( 'essential_blocks_user_type', 'old' );
            }

            $checkPro = class_exists( 'EssentialBlocks\Pro\Plugin' ) ? 1 : 0;

            //Redirect to quick setup page
            $is_quick_setup_shown = get_option( 'essential_blocks_quick_setup_shown' );
            if ( ! $is_quick_setup_shown && $checkPro === 0 ) {
                // Do not redirect AJAX requests
                if ( defined( 'DOING_AJAX' ) && DOING_AJAX ) {
                    //Nothing to do
                } else {
                    wp_safe_redirect( admin_url( 'admin.php?page=eb-quick-setup' ) );
                    exit;
                }
            }

            // Update Related Works
            if ( ESSENTIAL_BLOCKS_WHATSNEW_REDIRECT !== 'none' ) {
                set_transient( 'essential_block_maybe_whatsnew_redirect', true, MINUTE_IN_SECONDS * 10 );
            } else if ( EB_SHOW_WHATS_NEW_NOTICE !== 'none' ) {
                set_transient( 'essential_block_whats_new_notice', true, MINUTE_IN_SECONDS * 10 );
            }

            //Create Table on Plugin Update
            self::db_create_tables();

            //update all blocks in db
            update_option( 'essential_all_blocks', Blocks::all() );
            update_option( 'essential_quick_toolbar_allowed_blocks', Blocks::quick_toolbar_blocks() );

            //Regenerate Assets
            StyleHandler::init()->remove_frontend_assets();
        }
    }

    /**
     * Update WC version to current.
     */
    private function update_version()
    {
        update_option( 'essential_blocks_version', ESSENTIAL_BLOCKS_VERSION );
    }

    /**
     * Init Maintenance
     *
     * @since 2.0.1
     * @return void
     */
    public function init( $plguin_basename )
    {
        register_activation_hook( $plguin_basename, [ __CLASS__, 'activation' ] );
        register_uninstall_hook( $plguin_basename, [ __CLASS__, 'uninstall' ] );
    }

    /**
     * Runs on activation
     *
     * @since 2.0.1
     * @return void
     */
    public static function activation()
    {
        update_option( 'essential_all_blocks', Blocks::all() );
        update_option( 'essential_quick_toolbar_allowed_blocks', Blocks::quick_toolbar_blocks() );

        self::db_create_tables();
    }

    /**
     * Runs on uninstallation.
     *
     * @since 2.0.1
     * @return void
     */
    public static function uninstall()
    {
    }

    private static function db_create_tables()
    {
        require_once ABSPATH . 'wp-admin/includes/upgrade.php';
        global $wpdb;
        $charset_collate = $wpdb->get_charset_collate();

        //Create Table "eb_form_settings"
        $sql = 'CREATE TABLE ' . ESSENTIAL_BLOCKS_FORM_SETTINGS_TABLE . ' (
                    id INT AUTO_INCREMENT,
                    block_id VARCHAR(24) NOT NULL,
                    title TEXT NOT NULL,
                    fields TEXT NOT NULL,
                    form_options TEXT NOT NULL,
                    settings TEXT NOT NULL,
                    created_by INT NOT NULL,
                    updated_at DATETIME NOT NULL,
                    PRIMARY KEY (id),
                    UNIQUE (block_id)
                )' . $charset_collate;
        // dbDelta( $sql );
        $create = maybe_create_table( ESSENTIAL_BLOCKS_FORM_SETTINGS_TABLE, $sql );
        if ( ! $create ) {
            error_log( 'Table "' . ESSENTIAL_BLOCKS_FORM_SETTINGS_TABLE . '" couldn\'t be created for Essential Blocks. Please contact with plugin author.' );
        }
    }
}
