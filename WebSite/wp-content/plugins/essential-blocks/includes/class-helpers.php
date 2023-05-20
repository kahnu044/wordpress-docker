<?php
    // Exit if accessed directly.
    if ( ! defined( 'ABSPATH' ) ) {
        exit;
    }

    use EssentialBlocks\Utils\Helper;

    class EBHelpers {
        /**
         * Filter Blocks
         */
        public static function filter_blocks( $block ) {
            return isset( $block['visibility'] ) ? $block['visibility'] : false;
        }

        /**
         * Disable Nonce
         */
        public static function disabling_nonce() {
            return wp_create_nonce( 'essential_disabling_nonce' );
        }

        /**
         * Get FluentForms List
         *
         * @return array
         */
        public static function get_fluent_forms_list() {

            $options = [];

            if ( defined( 'FLUENTFORM' ) ) {
                global $wpdb;
                $options[0]['value'] = '';
                $options[0]['label'] = __( 'Select a form', 'essential-blocks' );
                $result              = $wpdb->get_results( "SELECT * FROM {$wpdb->prefix}fluentform_forms" );
                if ( $result ) {
                    foreach ( $result as $key => $form ) {
                        $options[$key + 1]['value'] = $form->id;
                        $options[$key + 1]['label'] = $form->title;
                        $options[$key + 1]['attr']  = self::get_form_attr( $form->id );
                    }
                }
            }
            return $options;
        }

        /**
         * Get Form Attribute
         */
        public static function get_form_attr( $form_id ) {
            return \FluentForm\App\Helpers\Helper::getFormMeta( $form_id, 'template_name' );
        }

        /**
         * API Query Builder
         */
        public static function woo_products_query_builder( $attr ) {

            $query_args = [
                'post_status'    => 'publish',
                'post_type'      => 'product',
                'posts_per_page' => isset( $attr['per_page'] ) ? $attr['per_page'] : 10,
                'orderby'        => isset( $attr['orderby'] ) ? $attr['orderby'] : 'date',
                'order'          => isset( $attr['order'] ) ? $attr['order'] : 'desc',
                'offset'         => isset( $attr['offset'] ) ? $attr['offset'] : 0
            ];

            if ( isset( $attr['orderby'] ) ) {
                switch ( $attr['orderby'] ) {
                case 'price':
                    $query_args['meta_key'] = '_price';
                    $query_args['orderby']  = 'meta_value_num';
                    break;
                case 'popular':
                    $query_args['meta_key'] = 'total_sales';
                    $query_args['orderby']  = 'meta_value_num';
                    $query_args['order']    = 'desc';
                    break;
                case 'rating';
                    $query_args['meta_key'] = '_wc_average_rating';
                    $query_args['orderby']  = 'meta_value_num';
                    break;
                default:
                    $query_args['orderby'] = $attr['orderby'];
                    break;
                }
            }

            if ( isset( $attr['tag'] ) && ! empty( $attr['tag'] ) ) {
                $query_args['tax_query']   = ['relation' => 'OR'];
                $query_args['tax_query'][] = [
                    [
                        'taxonomy' => 'product_tag',
                        'field'    => 'term_id',
                        'terms'    => explode( ',', $attr['tag'] )
                    ]
                ];
            }

            if ( isset( $attr['category'] ) && ! empty( $attr['category'] ) ) {
                $query_args['tax_query'][] = [
                    [
                        'taxonomy' => 'product_cat',
                        'field'    => 'term_id',
                        'terms'    => explode( ',', $attr['category'] )
                    ]
                ];
            }

            return $query_args;
        }

        /**
         * array of object to string
         */
        public static function array_column_from_json( $arr, $handle, $json = true ) {
            $arr = $json ? json_decode( $arr, true ) : $arr;
            $arr = array_column( $arr, $handle );

            return $arr;
        }

        /**
         * check isset & not empty and return data
         */
        public static function get_data( $arr, $key, $default = null ) {
            return isset( $arr[$key] ) && ! empty( $arr[$key] ) ? $arr[$key] : $default;
        }

        /**
         * Is Gutenberg Editor
         */
        public static function eb_is_gutenberg_editor( $pagenow, $param ) {
            if ( $pagenow == 'post-new.php' || $pagenow == 'post.php' || $pagenow == 'site-editor.php' ) {
                return true;
            }

            if ( $pagenow == 'themes.php' && ! empty( $param ) && str_contains( $param, 'gutenberg-edit-site' ) ) {
                return true;
            }

            return false;
        }

        /**
         * Calculate Post Read Time
         */
        public static function eb_calc_read_time( $text ) {
            if ( empty( $text ) ) {
                return 0;
            }

            $text = preg_replace( "/<([a-z][a-z0-9]*)[^>]*?(\/?)>/si", '<$1$2>', $text );
            $text = strip_tags( $text );

            $wpm   = 200;
            $words = str_word_count( trim( $text ) );
            $time  = ceil( $words / $wpm );
            return $time;
        }

        /**
         * EB Template: Header Area
         */
        public static function eb_template_header() {
        if ( function_exists( 'wp_is_block_theme' ) && wp_is_block_theme() ) {?>
            <!doctype html>
            <html                                                                                                                                                          <?php language_attributes();?>>

            <head>
                <meta charset="<?php bloginfo( 'charset' );?>">
                <?php wp_head();?>
            </head>

            <body                                                                                                                                                          <?php body_class();?>>
    <?php
        wp_body_open();

                    block_header_area();
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

                    echo "</body></html>";
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

            /**
             * Get Social Shareable link
             *
             * @param int $id current post/page id
             * @param string $icon_text icon text to find the icon name
             */
            public static function eb_social_share_name_link( $id, $icon_text ) {
                if ( empty( $icon_text ) ) {
                    return;
                }

                $post_title = get_the_title( $id );
                $post_link  = get_the_permalink( $id );

                if ( preg_match( '/facebook/', $icon_text ) ) {
                    return esc_url( 'https://www.facebook.com/sharer/sharer.php?u=' . $post_link );
                } elseif ( preg_match( '/linkedin/', $icon_text ) ) {
                    return esc_url( 'https://www.linkedin.com/shareArticle?title=' . $post_title . "&url=" . $post_link . '&mini=true' );
                } elseif ( preg_match( '/twitter/', $icon_text ) ) {
                    return esc_url( "https://twitter.com/share?text=" . $post_title . "&url=" . $post_link );
                } elseif ( preg_match( '/pinterest/', $icon_text ) ) {
                    return esc_url( 'https://pinterest.com/pin/create/button/?url=' . $post_link );
                } elseif ( preg_match( '/reddit/', $icon_text ) ) {
                    return esc_url( 'https://www.reddit.com/submit?url=' . $post_link . "&title=" . $post_title );
                } elseif ( preg_match( '/tumblr/', $icon_text ) ) {
                    return esc_url( 'https://www.tumblr.com/widgets/share/tool?canonicalUrl=' . $post_link );
                } elseif ( preg_match( '/whatsapp/', $icon_text ) ) {
                    return esc_url( 'https://api.whatsapp.com/send?text=' . $post_title . " " . $post_link );
                } elseif ( preg_match( '/telegram/', $icon_text ) ) {
                    return esc_url( 'https://telegram.me/share/url?url=' . $post_link . '&text=' . $post_title );
                } elseif ( preg_match( '/pocket/', $icon_text ) ) {
                    return esc_url( 'https://getpocket.com/edit?url=' . $post_link );
                } elseif ( preg_match( '/envelope/', $icon_text ) ) {
                    return esc_url( 'mailto:?subject=' . $post_title . '&body=' . $post_link );
                } elseif ( preg_match( '/xing/', $icon_text ) ) {
                    return esc_url( 'https://www.xing.com/spi/shares/new?url=' . $post_link );
                } elseif ( preg_match( '/vk/', $icon_text ) ) {
                    return esc_url( 'https://vk.com/share.php?url=' . $post_link );
                }
            }
            /**
             * API Query Builder
             */
            public static function get_plugins() {
                $all_plugins = Helper::get_plugins();

                $active_plugins = get_option( 'active_plugins' );

                if ( is_array( $all_plugins ) ) {
                    foreach ( $all_plugins as $key => $plugin ) {
                        $data               = [];
                        $data['TextDomain'] = $plugin['TextDomain'];
                        if ( is_array( $active_plugins ) && in_array( $key, $active_plugins ) ) {
                            $data["active"] = true;
                        } else {
                            $data["active"] = false;
                        }

                        //Assign
                        $all_plugins[$key] = $data;
                    }
                }

                return $all_plugins;
            }

            public static function get_gfont_family( $attributes ) {
                $keys             = preg_grep( '/^(\w+)FontFamily/i', array_keys( $attributes ), 0 );
                $googleFontFamily = [];
                foreach ( $keys as $key ) {
                    $googleFontFamily[] = $attributes[$key];
                }
                return $googleFontFamily;
            }
    }
