<?php
    namespace EssentialBlocks\Utils;

    // Exit if accessed directly.
    if ( ! defined( 'ABSPATH' ) ) {
        exit;
    }
    class TemplateHelpers {

        /**
         * EB Template: Header Area
         *
         * On block themes the header template part is rendered before
         * wp_head(), the way core's template-canvas.php renders the whole
         * template first. Blocks enqueue their styles while they render, so
         * the header's block styles (Navigation, Site Logo, …) are printed in
         * <head>. Rendered after wp_head() they were printed near the footer
         * instead, and the header painted unstyled first: on
         * essential-blocks.com the menu showed as a 920px list before
         * collapsing, a layout shift of ~0.97.
         */
        public static function eb_template_header() {
            if ( function_exists( 'wp_is_block_theme' ) && wp_is_block_theme() ) {
                ob_start();
                block_header_area();
                $header_html = ob_get_clean();
            ?>
			<!doctype html>
			<html <?php language_attributes();?>>

			<head>
				<meta charset="<?php bloginfo( 'charset' );?>">
				<?php wp_head();?>
			</head>

			<body <?php body_class();?>>
			<?php
                wp_body_open();

                echo $header_html; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- rendered block markup, as block_header_area() outputs it.
                        } else {
                            get_header();
                        }
                    }

                    /**
                     * EB Template: Footer Area
                     */
                    public static function eb_template_footer() {
                        if ( function_exists( 'wp_is_block_theme' ) && wp_is_block_theme() ) {
                            block_footer_area();

                            wp_footer();

                            echo '</body></html>';
                        } else {
                            get_footer();
                        }
                    }

                    /**
                     * Make request header
                     *
                     * @param array $headers
                     * @return array
                     */
                    public static function makeRequestHeader( $headers = [] ) {
                        return [
                            'headers' => $headers
                        ];
                    }
            }
