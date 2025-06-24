<?php
namespace EssentialBlocks\Integrations;

use EssentialBlocks\Utils\Helper;
use EssentialBlocks\Utils\HttpRequest;

class NFT extends ThirdPartyIntegration {
    /**
     * Base URL for Openverse API
     *
     * @var string
     */
    const URL = 'https://api.opensea.io/api/';

    public function __construct() {
        $this->add_ajax(
            [
                'opensea_nft_collections' => [
                    'callback' => 'collections',
                    'public'   => true
                ],
                'opensea_api_key'         => [
                    'callback' => 'get_api',
                    'public'   => true
                ],
                'opensea_api_key_save'    => [
                    'callback' => 'save_api',
                    'public'   => false
                ]
            ]
        );
    }

    /**
     * API Call to Get NFT Data
     */
    public function collections() {
        if ( ! wp_verify_nonce( sanitize_key( $_POST['nft_nonce'] ), 'eb-nft-nonce' ) ) {
            die( esc_html__( 'Nonce did not match', 'essential-blocks' ) );
        }

        $limit = 6;

        if ( isset( $_POST['nft_source'] ) && sanitize_text_field( $_POST['nft_source'] ) === 'opensea' ) {
            $opensea_api = '';
            $settings    = get_option( 'eb_settings' );

            if ( isset( $_POST['openseaApiKey'] ) ) {
                $opensea_api = sanitize_text_field( $_POST['openseaApiKey'] );
            } elseif ( is_array( $settings ) && isset( $settings['openseaApi'] ) ) {
                $opensea_api = sanitize_text_field( $settings['openseaApi'] );
            }

            $param = [];

            if ( isset( $_POST['openseaType'] ) ) {
                // To retrieve Collections
                if ( $_POST['openseaType'] === 'collections' ) {
                    $url    = $this->url( 'collections', 'v2/' );
                    $values = [
                        'creator_username' => Helper::is_isset( 'openseaCollectionmWalletId' ),
                        'offset'      => Helper::is_isset( 'offset', 0 ),
                        'limit'       => Helper::is_isset( 'openseaCollectionLimit', $limit )
                    ];
                    $param = array_merge( $param, $values );
                }
                // To retrieve Assets
                elseif ( $_POST['openseaType'] === 'items' ) {
                    $collection_slug = Helper::is_isset( 'openseaCollectionSlug' );
                    $url    = $this->url( 'collection/'.$collection_slug.'/nfts', 'v2/' );
                    $values = [
                        'limit' => Helper::is_isset( 'openseaItemLimit', $limit ),
                    ];

                    $param = array_merge( $param, $values );
                }
            }

            $response = HttpRequest::get_instance()->get(
                $url,
                [
                    'body'    => $param,
                    'headers' => [
                        'Content-Type' => 'application/json',
                        'X-API-KEY'    => $opensea_api
                    ],
                    'timeout' => 300,
                    'is_ajax' => true
                ]
            );

            wp_send_json_success( $response );
        }

        wp_send_json_error( __( 'Something went wrong.', 'essential-blocks' ) );
    }

    public function get_api() {
        if ( ! wp_verify_nonce( $_POST['admin_nonce'], 'admin-nonce' ) ) {
            die( esc_html__( 'Nonce did not match', 'essential-blocks' ) );
        }
        if ( ! current_user_can( 'edit_posts' ) ) {
            wp_send_json_error( __( 'You are not authorized!', 'essential-blocks' ) );
        }

        $settings = get_option( 'eb_settings' );

        if ( is_array( $settings ) && isset( $settings['openseaApi'] ) ) {
            wp_send_json_success( $settings['openseaApi'] );
        }

        wp_send_json_error( "Couldn't found data" );
    }
    public function save_api() {
        if ( ! wp_verify_nonce( $_POST['admin_nonce'], 'admin-nonce' ) ) {
            die( esc_html__( 'Nonce did not match', 'essential-blocks' ) );
        }
        if ( ! current_user_can( 'activate_plugins' ) ) {
            wp_send_json_error( __( 'You are not authorized!', 'essential-blocks' ) );
        }

        $api = '';
        if ( isset( $_POST['openseaApi'] ) ) {
            $api = trim( sanitize_text_field( $_POST['openseaApi'] ) );
        }

        $settings = is_array( get_option( 'eb_settings' ) ) ? get_option( 'eb_settings' ) : [];
        if ( strlen( $api ) === 0 ) {
            unset( $settings['openseaApi'] );
        } else {
            $settings['openseaApi'] = $api;
        }

        if ( is_array( $settings ) > 0 ) {
            $output = update_option( 'eb_settings', $settings );
            wp_send_json_success( $output );
        } else {
            wp_send_json_error( "Couldn't save data" );
        }

        exit;
    }
}