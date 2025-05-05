<?php

namespace CarouselSliderBlock\Admin;

if ( ! \defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Class Settings_Page
 *
 * Handles the admin settings page for the Carousel Block plugin.
 */
class Settings_Page {

    /**
     * Initialize settings page.
     */
    public static function init() {
        add_action( 'admin_menu', [ self::class, 'add_settings_menu' ] );
        add_action( 'admin_init', [ self::class, 'initialize_settings' ] );
    }

    /**
     * Add settings menu to the WordPress admin.
     */
    public static function add_settings_menu() {
        if ( ! \current_user_can( 'manage_options' ) ) {
            return;
        }

        \add_options_page(
            \__( 'Carousel Slider Block Settings', 'cb' ),
            \__( 'Carousel Slider', 'cb' ),
            'manage_options',
            'cb-carousel-settings',
            [ self::class, 'render_settings_page' ]
        );
    }

    /**
     * Register settings and fields.
     */
    public static function initialize_settings() {
        \register_setting( 'cbCarouselPage', 'cb_carousel_settings', [ self::class, 'sanitize' ] );
    
        \add_settings_section(
            'cb_carousel_settings_section',
            '',
            '__return_null',
            'cbCarouselPage'
        );

        $options = \get_option( 'cb_carousel_settings' );
        self::add_settings_field( 'show_legacy_blocks', \__( 'Show Old Carousel Blocks', 'cb' ), $options );
        self::add_settings_field( 'hide_legacy_notice', __( 'Hide Legacy Warning Notice', 'cb' ), $options );
    }

    /**
     * Sanitize settings input.
     *
     * @param array $input Raw input.
     * @return array Sanitized input.
     */
    public static function sanitize( $input ) {
        $sanitized_input = [];

        $sanitized_input['show_legacy_blocks'] = isset( $input['show_legacy_blocks'] )
            ? \filter_var( $input['show_legacy_blocks'], \FILTER_VALIDATE_BOOLEAN )
            : false;

        $sanitized_input['hide_legacy_notice'] = isset( $input['hide_legacy_notice'] )
            ? \filter_var( $input['hide_legacy_notice'], \FILTER_VALIDATE_BOOLEAN )
            : false;

        return $sanitized_input;
    }

    /**
     * Add a settings field.
     *
     * @param string $id Field ID.
     * @param string $title Field title.
     * @param array $options Existing options.
     */
    private static function add_settings_field( $id, $title, $options ) {
        \add_settings_field(
            $id,
            $title,
            [ self::class, 'render_settings_field' ],
            'cbCarouselPage',
            'cb_carousel_settings_section',
            [
                'id'      => $id,
                'options' => $options,
            ]
        );
    }

    /**
     * Render settings field markup.
     *
     * @param array $args Field arguments.
     */
    public static function render_settings_field( $args ) {
        $options = $args['options'];
        $setting_id = $args['id'];

        // Get original saved value
        $saved_value = isset( $options[ $setting_id ] ) ? $options[ $setting_id ] : false;

        // Build filter name
        $filter_name = 'cb_carousel_block_setting_' . $setting_id;

        // Get filtered value
        $filtered_value = apply_filters( $filter_name, $saved_value, $setting_id );

        // Detect if a filter is attached
        $forced_by_filter = has_filter( $filter_name );

        // Use filtered value for checkbox
        $value = $filtered_value ? 1 : 0;

        echo '<fieldset>';
        echo '<legend class="screen-reader-text"><span>' . esc_html( $args['id'] ) . '</span></legend>';
        echo '<label for="' . esc_attr( $setting_id ) . '">';
        echo '<input type="checkbox" id="' . esc_attr( $setting_id ) . '" name="cb_carousel_settings[' . esc_attr( $setting_id ) . ']" value="1"' . checked( 1, $value, false ) . '>';
        
        if ( $setting_id === 'show_legacy_blocks' ) {
            echo __( 'Show legacy (non-Swiper) Carousel Slider blocks in the editor inserter.', 'cb' );
        }

        if ( $setting_id === 'hide_legacy_notice' ) {
            echo __( 'Hide the notice about legacy Carousel Slider blocks in the editor.', 'cb' );
        }

        echo '</label>';

        if ( $forced_by_filter ) {
            echo '<p style="margin: 4px 0 0; font-style: italic; color: #888;">' . __( 'This setting is overridden by a filter.', 'cb' ) . '</p>';
        }

        echo '</fieldset>';
    }

    /**
     * Render the full settings page markup.
     */
    public static function render_settings_page() {
        ?>
        <div class="wrap cb-settings-page">
            <div class="notice notice-info">
                <p><strong>New in Version 2:</strong> We've introduced a modern Swiper-based carousel block.</p>
                <p>Legacy blocks will continue to work, but are no longer recommended.</p>
                <ul style="list-style: disc; padding-left: 20px;">
                    <li>To insert new carousels, use the <strong>Carousel Slider v2</strong> block.</li>
                    <li>To upgrade a legacy block, select it in the editor, then click the block icon (the first button in the toolbar) and choose <strong>"Transform to Carousel Slider v2."</strong></li>
                    <li><strong>Note:</strong> When transforming a legacy block to Carousel Slider v2, the carousel settings will remain unchanged, but the design and markup will be updated.</li>
                </ul>
                <p>You can optionally re-enable legacy blocks below.</p>
            </div>

            <form action="options.php" method="post">
                <h1><?php echo \__( 'Carousel Slider Block Settings', 'cb' ); ?></h1>
                <?php
                \settings_fields( 'cbCarouselPage' );
                \do_settings_sections( 'cbCarouselPage' );
                \submit_button();
                ?>
            </form>
        </div>
        <?php
    }
}
