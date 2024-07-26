<?php

namespace EssentialBlocks\Integrations;

class GlobalStyles extends ThirdPartyIntegration
{

    private static $global_style_options_key;
    private static $block_defaults_options_key;

    public function __construct()
    {

        self::$global_style_options_key   = 'eb_global_styles';
        self::$block_defaults_options_key = 'eb_block_defaults';

        $this->add_ajax(
            [
                'global_styles_get'     => [
                    'callback' => 'global_styles_get_callback',
                    'public'   => true
                 ],
                'global_styles_update'  => [
                    'callback' => 'global_styles_update_callback',
                    'public'   => true
                 ],
                'block_defaults_get'    => [
                    'callback' => 'block_defaults_get_callback',
                    'public'   => true
                 ],
                'block_defaults_update' => [
                    'callback' => 'block_defaults_update_callback',
                    'public'   => true
                 ]
             ]
        );
    }

    /**
     * Ajax Call to Get Global Styles from Options Table
     */
    public function global_styles_get_callback()
    {
        if ( ! wp_verify_nonce( sanitize_key( $_POST[ 'admin_nonce' ] ), 'admin-nonce' ) ) {
            wp_send_json_error( __( 'Nonce did not match!', 'essential-blocks' ) );
            wp_die();
        }

        $settings = wp_unslash( get_option( self::$global_style_options_key ) );

        if ( is_array( $settings ) && count( $settings ) > 0 ) {
            wp_send_json_success( $settings );
        } else {
            wp_send_json_error( "Couldn't found global style" );
        }
        exit;
    }

    /**
     * Ajax Call to Update Global Styles from Options Table
     */
    public function global_styles_update_callback()
    {
        if ( ! wp_verify_nonce( sanitize_key( $_POST[ 'admin_nonce' ] ), 'admin-nonce' ) ) {
            wp_send_json_error( __( 'Nonce did not match!', 'essential-blocks' ) );
            wp_die();
        }
        if ( ! current_user_can( 'activate_plugins' ) ) {
            wp_send_json_error( __( 'You are not authorized!', 'essential-blocks' ) );
        }

        if ( isset( $_POST[ 'eb_global_style_key' ] ) && isset( $_POST[ 'eb_global_style_value' ] ) ) {
            $style = sanitize_text_field( $_POST[ 'eb_global_style_value' ] );
            $key   = sanitize_text_field( $_POST[ 'eb_global_style_key' ] );

            $settings = is_array( get_option( self::$global_style_options_key ) ) ? get_option( self::$global_style_options_key ) : [  ];

            if ( $key === 'all' ) {
                $style = json_decode( wp_unslash( $style ), true );

                // Convert each top-level array back to a JSON string and store it under the same key
                foreach ( $style as $key => $value ) {
                    if ( count( $value ) > 0 ) {
                        $settings[ $key ] = json_encode( $value );
                    } else {
                        unset( $settings[ $key ] );
                    }
                }
            } else {
                if ( strlen( $style ) === 0 ) {
                    unset( $settings[ $key ] );
                } else {
                    $settings[ $key ] = $style;
                }
            }

            if ( is_array( $settings ) > 0 ) {
                $output = update_option( self::$global_style_options_key, $settings );
                wp_send_json_success( $output );
            } else {
                wp_send_json_error( "Couldn't save data" );
            }
        } else {
            wp_send_json_error( 'Invalid data' );
        }

        exit;
    }

    /**
     * Ajax Call to Get Block Defaults from Options Table
     */
    public function block_defaults_get_callback()
    {
        if ( ! wp_verify_nonce( sanitize_key( $_POST[ 'admin_nonce' ] ), 'admin-nonce' ) ) {
            wp_send_json_error( __( 'Nonce did not match!', 'essential-blocks' ) );
            wp_die();
        }

        $settings = wp_unslash( get_option( self::$block_defaults_options_key ) );

        if ( strlen( $settings ) > 0 ) {
            wp_send_json_success( $settings );
        } else {
            wp_send_json_error( "Couldn't found global style" );
        }
        exit;
    }

    /**
     * Ajax Call to Update Block Defaults from Options Table
     */
    public function block_defaults_update_callback()
    {
        if ( ! wp_verify_nonce( sanitize_key( $_POST[ 'admin_nonce' ] ), 'admin-nonce' ) ) {
            wp_send_json_error( __( 'Nonce did not match!', 'essential-blocks' ) );
            wp_die();
        }
        if ( ! current_user_can( 'activate_plugins' ) ) {
            wp_send_json_error( __( 'You are not authorized!', 'essential-blocks' ) );
        }

        if ( isset( $_POST[ 'eb_block_defaults_value' ] ) ) {
            $style = sanitize_text_field( $_POST[ 'eb_block_defaults_value' ] );

            if ( strlen( $style ) > 0 ) {
                $output = update_option( self::$block_defaults_options_key, $style );
                wp_send_json_success( $output );
            } else {
                wp_send_json_error( "Couldn't save data" );
            }
        } else {
            wp_send_json_error( 'Invalid data' );
        }

        exit;
    }
}
