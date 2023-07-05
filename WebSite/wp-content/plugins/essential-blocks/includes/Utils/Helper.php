<?php
    namespace EssentialBlocks\Utils;

    class Helper {
        /**
         * Get installed WordPress Plugin List
         * @return array
         */
        public static function get_plugins() {
            if ( ! function_exists( 'get_plugins' ) ) {
                require_once ABSPATH . 'wp-admin/includes/plugin.php';
            }
            return get_plugins();
        }

        public static function calculate_read_time( $text ) {
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
         * Remove HTML Tags with Inner Contents
         * @param string $content
         * @param mixed $tags
         * @return string
         */
        public static function removeHtmlTagWithInnerContents($contant, $tags) {
            if (is_array($tags)) {
                foreach($tags as $tag) {
                    $contant = preg_replace(
                        sprintf(
                            '/<%1$s\b[^>]*>(.*?)<\/%1$s>/is',
                            $tag
                        ),
                        '',
                        $contant
                    );
                }
            }
            else {
                $contant = preg_replace('/<figure\b[^>]*>(.*?)<\/figure>/is', '', $contant);
            }

            return $contant;
        }

        public static function is_isset( $value, $default = '' ) {
            return isset( $_POST[$value] ) ? $_POST[$value] : $default;
        }

        public static function build_url( $url, $params = [] ) {
            $url_components = parse_url( $url );
            $_build_query   = http_build_query( $params );

            $_build_query .= ! empty( $url_components['query'] ) ? '&' . $url_components['query'] : '';
            $_build_query .= ! empty( $url_components['fragment'] ) ? '#' . $url_components['fragment'] : '';

            return $url_components['scheme'] . '://' . $url_components['host'] . '/' . trim( $url_components['path'], '/' ) . '?' . $_build_query;
        }

        protected static function get_views_path( $name ) {
            $file = ESSENTIAL_BLOCKS_DIR_PATH . 'views/' . $name . '.php';

            if ( file_exists( $file ) ) {
                return $file;
            }

            return false;
        }

        /**
         * Get views for front-end display
         *
         * @param string $name  it will be file name only from the view's folder.
         * @param array $data
         * @return void
         */
        public static function views( $name, $data = [] ) {
            $__file = static::get_views_path( $name );
            $helper = static::class;

            extract( $data );
            if ( is_readable( $__file ) ) {
                include $__file;
            }
        }

        /**
         * Convert Recursive Array to String
         * @param array $array
         * @param string $seperator
         * @param boolean $valueOnly | optional
         * @return string
         */
        public static function recursive_implode( $array, $seperator, $valueOnly = false ) {
            $result = "";
            if ( isset( $array["value"] ) && $valueOnly ) {
                $array = $array["value"];
            }
            if ( is_array( $array ) ) {
                foreach ( $array as $key => $value ) {
                    if ( is_array( $value ) ) {
                        $result .= self::recursive_implode( $value, $seperator, true ) . $seperator;
                    } else {
                        $result .= $value . $seperator;
                    }
                }
            } else if ( is_string( $array ) ) {
                $result .= $array . $seperator;
            }
            $result = substr( $result, 0, 0 - strlen( $seperator ) );

            return $result;
        }

        public static function recursive_implode_acf( $array, $seperator ) {
            $result = "";
            if ( is_array( $array ) ) {
                foreach ( $array as $key => $value ) {
                    if ( is_array( $value ) || is_object($value) ) {
                        $result .= self::recursive_implode_acf( (array)$value, $seperator );
                    } else {
                        $value = $value ? $value : "Null";
                        $index = is_numeric($key) ? "" : $key . ": ";
                        $result .= $index . $value . $seperator;
                    }
                }
            } else if ( is_string( $array ) ) {
                $result .= $array . $seperator;
            }

            return $result;
        }

        /**
         * Version Update warning
         * @param mixed $current_version
         * @param mixed $new_version
         * @return void
         */
        public static function version_update_warning( $current_version, $new_version, $upgrade_notice ) {
            $current_version_minor_part = explode( '.', $current_version )[1];
            $new_version_minor_part     = explode( '.', $new_version )[1];

            $notice = "";

            if ( $current_version_minor_part === $new_version_minor_part ) {
                if ( ! $upgrade_notice ) {
                    return;
                }
            }

            if ( $current_version_minor_part !== $new_version_minor_part ) {
                $notice .= "We highly recommend you to backup your site before upgrading to the new version.";
            }

        ?>
        <style>
            hr.eb-update-warning__separator {
                margin: 15px -13px;
                border-color: #dba618;
            }
            .eb-update-warning .dashicons {
                display: inline-block;
                color: #F49B07;
            }
            .eb-update-warning .eb-update-warning__title {
                display: inline-block;
                font-size: 1.05em;
                color: #444;
                font-weight: 500;
                margin-bottom: 10px;
            }
            .eb-update-warning__message {
                margin-bottom: 15px;
            }
            .update-message.notice-warning p:empty {
                display: none;
            }
        </style>
		<hr class="eb-update-warning__separator" />
		<div class="eb-update-warning">
			<div>
                <span class="dashicons dashicons-info"></span>
				<div class="eb-update-warning__title">
					<?php echo esc_html__( 'Heads up!', 'essential-blocks' ); ?>
				</div>
				<div class="eb-update-warning__message">
					<?php
                        printf( esc_html__( '%1$s', 'essential-blocks' ), $notice );
                            ?>
				</div>

                <?php
                    if ( $upgrade_notice !== false ) {
                            ?>
                    <hr class="eb-update-warning__separator" />
                    <div class="eb-update-warning__message">
                        <span class="dashicons dashicons-info"></span>
                        <div class="eb-update-warning__title">
                            <?php echo esc_html__( 'What\'s new?', 'essential-blocks' ); ?>
                        </div>
                        <div class="eb-update-warning__message">
                            <?php printf( esc_html( '%1$s' ), wp_strip_all_tags( $upgrade_notice ) );?>
                        </div>
                    </div>
                <?php }?>
			</div>
		</div>
        <?php
            }
        }
