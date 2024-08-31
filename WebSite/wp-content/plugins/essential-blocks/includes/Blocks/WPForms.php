<?php

namespace EssentialBlocks\Blocks;

use EssentialBlocks\Core\Block;
use EssentialBlocks\Utils\Helper;

class WPForms extends Block
{
    protected $attributes = [
        'blockId' => [
            'type' => 'string'
         ],
        'formId'  => [
            'type' => 'string'
         ]
     ];
    protected $frontend_styles = [
        'essential-blocks-frontend-style'
     ];

    /**
     * Unique name of the block.
     *
     * @return string
     */
    public function get_name()
    {
        return 'wpforms';
    }

    public function can_enable()
    {
        $active_plugins = Helper::get_active_plugin_list();
        if ( in_array( 'wpforms-lite/wpforms.php', $active_plugins ) || in_array( 'wpforms/wpforms.php', $active_plugins ) ) {
            return true;
        }
        return false;
    }

    /**
     * Get WPForms List
     *
     * @return array
     */
    public static function form_list()
    {
        $options = [  ];

        if ( class_exists( '\WPForms\WPForms' ) ) {
            $args = [
                'post_type'      => 'wpforms',
                'posts_per_page' => -1
             ];

            $contact_forms = get_posts( $args );

            if ( ! empty( $contact_forms ) && ! is_wp_error( $contact_forms ) ) {
                $options[ 0 ][ 'value' ] = '';
                $options[ 0 ][ 'label' ] = esc_html__( 'Select a WPForm', 'essential-blocks' );
                foreach ( $contact_forms as $key => $post ) {
                    $options[ $key + 1 ][ 'value' ] = $post->ID;
                    $options[ $key + 1 ][ 'label' ] = $post->post_title;
                }
            }
        } else {
            $options[ 0 ] = esc_html__( 'Create a Form First', 'essential-blocks' );
        }

        return $options;
    }

    /**
     * Block render callback.
     *
     * @param mixed $attributes
     * @param mixed $content
     * @return mixed
     */
    public function render_callback( $attributes, $content )
    {
        if ( ! class_exists( '\WPForms\WPForms' ) || is_admin() ) {
            return;
        }

        ob_start();
        Helper::views(
            'forms/wpforms',
            wp_parse_args(
                $attributes,
                [
                    'classHook'           => '',
                    'formId'              => '',
                    'customCheckboxStyle' => false,
                    'showLabels'          => true,
                    'showPlaceholder'     => true,
                    'showErrorMessage'    => true,
                    'formAlignment'       => 'none',
                    'wrapperClasses'      => [ 'eb-wpforms-wrapper' ],
                    'alignment'           => [
                        'left'   => 'eb-wpforms-alignment-left',
                        'center' => 'eb-wpforms-alignment-center',
                        'right'  => 'eb-wpforms-alignment-right'
                     ],
                    'block_object'        => $this
                 ]
            )
        );
        return ob_get_clean();
    }
}
