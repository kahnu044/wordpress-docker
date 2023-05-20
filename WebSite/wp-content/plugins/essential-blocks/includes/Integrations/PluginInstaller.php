<?php
namespace EssentialBlocks\Integrations;

use EssentialBlocks\Utils\Installer;

class PluginInstaller extends ThirdPartyIntegration {

    public function __construct() {
        $this->add_ajax( [
            'plugin_installer' => [
                'callback' => 'plugin_install',
                'public'   => false
            ]
        ] );
    }

    /**
     * Openverse plugin_install
     */
    public function plugin_install() {
        if ( isset( $_POST['admin_nonce'] )
            && ! wp_verify_nonce( sanitize_key( $_POST['admin_nonce'] ), 'admin-nonce' ) ) {
            die( esc_html__( 'Nonce did not match', 'essential-blocks' ) );
        }

        if ( isset( $_POST['slug'] ) && isset( $_POST['plugin_file'] ) ) {
            $plugin                = [];
            $plugin['slug']        = sanitize_text_field( $_POST['slug'] );
            $plugin['plugin_file'] = sanitize_text_field( $_POST['plugin_file'] );
            $installer             = Installer::get_instance();
            $response              = $installer->install( $plugin );
            wp_send_json_success( $response );
        } else {
            wp_send_json_error( __( 'Could not install the plugin.' ) );
        }
    }
}
