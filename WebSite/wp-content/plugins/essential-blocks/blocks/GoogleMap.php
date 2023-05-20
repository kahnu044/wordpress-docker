<?php

/**
 * Functions to register client-side assets (scripts and stylesheets) for the
 * Gutenberg block.
 *
 * @package essential-blocks
 */

/**
 * Registers all block assets so that they can be enqueued through Gutenberg in
 * the corresponding context.
 *
 * @see https://wordpress.org/gutenberg/handbook/designers-developers/developers/tutorials/block-tutorial/applying-styles-with-stylesheets/
 */

namespace EssentialBlocks\blocks;

use EssentialBlocks\Core\Block;

class GoogleMap extends Block {
    protected $frontend_scripts = ['essential-blocks-google-map-frontend', 'essential-blocks-google-map-script'];
    protected $editor_scripts   = 'essential-blocks-google-map-script-editor';


    protected $frontend_styles = ['essential-blocks-frontend-style'];

    /**
     * Unique name of the block.
     * @return string
     */
    public function get_name() {
        return 'google-map';
    }

    /**
     * Register all other scripts
     * @return void
     */
    public function register_scripts() {
        $this->assets_manager->register(
            'google-map-frontend',
            $this->path() . '/frontend/index.js'
        );
        $map_api  = "AIzaSyB-sVrt6W1jsEkrxSRYWh_ABpkIZLVpLIs";
        $settings = get_option( 'eb_settings', [] );

        if ( isset( $_POST['googleMapApi'] ) ) {
            $map_api = $_POST['googleMapApi'];
        } elseif ( is_array( $settings ) && ! empty( $settings['googleMapApi'] ) ) {
            $map_api = $settings['googleMapApi'];
        }

        if ( $map_api ) {
            //Only for editor
            $this->assets_manager->register(
                'google-map-script-editor',
                'https://maps.googleapis.com/maps/api/js?key=' . $map_api . '&callback=Function.prototype&libraries=places&cache=' . rand( 10, 1000 ),
                ['essential-blocks-editor-script'],
                [
                    'is_js' => true
                ]
            );
            //For frontend
            $this->assets_manager->register(
                'google-map-script',
                'https://maps.googleapis.com/maps/api/js?key=' . $map_api . '&callback=Function.prototype&libraries=places&cache=' . rand( 10, 1000 ),
                [],
                [
                    'is_js' => true
                ]
            );
        }
    }
}
