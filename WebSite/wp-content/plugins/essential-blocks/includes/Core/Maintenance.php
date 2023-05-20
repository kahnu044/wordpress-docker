<?php

namespace EssentialBlocks\Core;

use EssentialBlocks\Traits\HasSingletone;

class Maintenance {
    use HasSingletone;

    public function __construct(){
        add_action('admin_init', [$this, 'check_version'], 5);

        $this->init( ESSENTIAL_BLOCKS_PLUGIN_BASENAME );
    }

    public function check_version(){
        $_version = get_option('essential_blocks_version');
        $_code_version = ESSENTIAL_BLOCKS_VERSION;
        $requires_update         = version_compare( $_version, $_code_version, '<' );

        if( $requires_update ) {
            // Update Related Works
            if( ESSENTIAL_BLOCKS_WHATSNEW_REDIRECT != 'none' ) {
                set_transient( 'essential_block_maybe_whatsnew_redirect', true, MINUTE_IN_SECONDS * 10 );
            }

            // Version Updated in DB.
            $this->update_version();
        }
    }

    /**
     * Update WC version to current.
     */
    private function update_version() {
        update_option( 'essential_blocks_version', ESSENTIAL_BLOCKS_VERSION );
    }

    /**
     * Init Maintenance
     *
     * @since 2.0.1
     * @return void
     */
    public function init( $plguin_basename ) {
        register_activation_hook( $plguin_basename, [__CLASS__, 'activation'] );
        register_uninstall_hook( $plguin_basename, [__CLASS__, 'uninstall'] );
    }

    /**
     * Runs on activation
     *
     * @since 2.0.1
     * @return void
     */
    public static function activation() {
        update_option( 'essential_all_blocks', Blocks::defaults() );
    }

    /**
     * Runs on uninstallation.
     *
     * @since 2.0.1
     * @return void
     */
    public static function uninstall() {

    }
}
